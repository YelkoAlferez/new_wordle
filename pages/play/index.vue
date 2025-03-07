<template>
    <div class="flex justify-center min-h-screen bg-gradient-to-r from-blue-500 to-indigo-600 text-white">
      <div class="text-center p-8">
        <h1 class="text-5xl font-bold mb-6 text-white">¡WORDLE IBC!</h1>
        <div class="absolute top-5 left-5 p-4 flex gap-4 items-center">
          <button
              @click="auth.logout"
              class="px-6 py-2 bg-red-500 text-white font-semibold rounded-md hover:bg-red-600 transition m-2"
              >
              Logout
            </button>
        </div>
        <div class="absolute top-5 right-5 p-4 flex gap-4 items-center">
        <div class="text-lg mb-2">Intentos: {{ usedAttempts }}</div>
        <button
          @click="restartGame"
          class="px-4 py-2 bg-gray-700 text-white rounded-lg text-lg hover:bg-gray-600"
        >
          Reiniciar
        </button>
        <button
          @click="showStats"
          class="px-4 py-2 bg-green-700 text-white rounded-lg text-lg hover:bg-green-600"
        >
          Ver Estadísticas
        </button>
      </div>
        <div id="wordle-grid" class="flex flex-col items-center gap-2">
          <div v-for="(row, rowIndex) in grid" :key="'row-' + (rowIndex + 1)" class="flex gap-2">
            <input
              v-for="(colIndex, index) in 5"
              :key="'row-' + (rowIndex + 1) + '-col-' + index"
              v-model="grid[rowIndex].letters[index]"
              :class="['w-16 h-16 text-white rounded-lg border-2 border-white flex items-center justify-center text-2xl font-bold text-center', letterColors[rowIndex][index]]"
              :readonly="rowIndex < currentRowIndex"
            />
          </div>
        </div>
  
        <div class="mt-6">
          <input
            v-model="currentWord"
            readonly
            type="text"
            maxlength="5"
            placeholder="Introduce tu palabra"
            class="w-64 h-12 text-center text-2xl font-bold bg-gray-800 text-white border-2 border-white rounded-lg"
            :disabled="isWordSubmitted || currentWord.length === 5 || currentRowIndex >= grid.length"
          />
        </div>
  
        <div id="keyboard" class="flex flex-wrap justify-center gap-2 mt-6">
            <div class="flex justify-center gap-1 mt-4 w-full">
                <button
                    v-for="(letter, index) in alphabet.slice(0, 10)"
                    :key="index"
                    @click="addLetter(letter)"
                    class="w-12 h-12 bg-gray-700 text-white rounded-lg text-xl hover:bg-gray-600"
                    >
                    {{ letter }}
                </button>
            </div>
            <div class="flex justify-center gap-1 mt-4 w-full">
                <button
                    v-for="(letter, index) in alphabet.slice(10, 19)"
                    :key="index"
                    @click="addLetter(letter)"
                    class="w-12 h-12 bg-gray-700 text-white rounded-lg text-xl hover:bg-gray-600"
                    >
                    {{ letter }}
                </button>
            </div>
            <div class="flex justify-center gap-1 mt-4 w-full">
                <button
                    v-for="(letter, index) in alphabet.slice(19)"
                    :key="index"
                    @click="addLetter(letter)"
                    class="w-12 h-12 bg-gray-700 text-white rounded-lg text-xl hover:bg-gray-600"
                    >
                    {{ letter }}
                </button>
            </div>
            <div class="flex justify-center gap-4 mt-4 w-full">
            <button
              @click="deleteLetter"
              class="w-16 h-12 bg-gray-700 text-white rounded-lg text-xl hover:bg-gray-600"
            >
              DEL
            </button>
            <button
              @click="submitRow"
              class="w-16 h-12 bg-gray-700 text-white rounded-lg text-xl hover:bg-gray-600"
            >
              ENTER
            </button>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, onMounted, onUnmounted } from 'vue';
  import Swal from 'sweetalert2';
  import { dic } from '~/assets/diccionari.js';
  
  const grid = ref([
    { letters: ['', '', '', '', ''], colors: ['', '', '', '', ''] },
    { letters: ['', '', '', '', ''], colors: ['', '', '', '', ''] },
    { letters: ['', '', '', '', ''], colors: ['', '', '', '', ''] },
    { letters: ['', '', '', '', ''], colors: ['', '', '', '', ''] },
    { letters: ['', '', '', '', ''], colors: ['', '', '', '', ''] },
    { letters: ['', '', '', '', ''], colors: ['', '', '', '', ''] },
  ]);
  const letterColors = ref([['', '', '', '', ''], ['', '', '', '', ''], ['', '', '', '', ''], ['', '', '', '', ''], ['', '', '', '', ''], ['', '', '', '', '']]);
  const alphabet = ref(['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P', 'A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', 'Z', 'X', 'C', 'V', 'B', 'N', 'M']);
  const currentWord = ref('');
  const wordToGuess = ref('');
  const currentRowIndex = ref(0);
  const isWordSubmitted = ref(false);
  const gameOver = ref(false);
  const completionTime = ref(0);
  const usedAttempts = ref(0);
  const maxCorrectLetters = ref(0);
  const timer = ref<null | number>(null);
  const auth = useAuthStore();
  const usedWords = new Set<string>();

  const startTimer = () => {
    timer.value = setInterval(() => {
      completionTime.value++;
    }, 1000) as unknown as number;
  };
  
  const stopTimer = () => {
    if (timer.value) {
      clearInterval(timer.value);
      timer.value = null;
    }
  };
  
  const showStats = async () => {
    const stats = await auth.getStats();
  
    if (stats.totalStats > 0) {
      Swal.fire({
        title: '¡Estadísticas!',
        html: `<ul>
            <li>Total Stats: ${stats.totalStats}</li>
            <li>Completados: ${stats.completedCount}</li>
            <li>No Completados: ${stats.notCompletedCount}</li>
            <li>Tiempo más rápido: ${stats.fastestCompletionTime} segundos</li>
            <li>Tiempo promedio: ${stats.averageCompletionTime} segundos</li>
            <li>Mejor partida: ${stats.minUsedAttempts == 1 ? stats.minUsedAttempts + ' intento' :  stats.minUsedAttempts + 'intentos'}</li>
        </ul>`,
        icon: 'info',
        confirmButtonText: 'OK',
    });
    } else {
      Swal.fire({
        title: '¡Estadísticas!',
        text: 'Todavía no tienes estadísticas',
        icon: 'info',
        confirmButtonText: 'OK',
      });
    }
  };
  
  const addLetter = (letter: string) => {
    if (currentWord.value.length < 5 && !gameOver.value) {
      currentWord.value += letter;
    }
  };
  
  const getRandomWord = () => {
    const randomIndex = Math.floor(Math.random() * dic.length);
    wordToGuess.value = dic[randomIndex].toLocaleUpperCase();
    console.log(wordToGuess.value);
  };
  
  const deleteLetter = () => {
    if (!gameOver.value) {
      currentWord.value = currentWord.value.slice(0, -1);
    }
  };
  
  const submitRow = () => {
  const word = currentWord.value.toUpperCase();

  if (word.length !== 5 || gameOver.value) return;

  if (!dic.includes(word.toLocaleLowerCase())) {
    setTimeout(async () => {
    Swal.fire({
      title: 'Palabra no válida',
      text: 'La palabra no existe en el diccionario.',
      icon: 'error',
      confirmButtonText: 'OK',
      });
      currentWord.value = '';
    }, 500);
    return;
  }

  if (usedWords.has(word)) {
    setTimeout(async () => {
      Swal.fire({
        title: 'Palabra repetida',
        text: 'Ya has introducido esta palabra antes.',
        icon: 'warning',
        confirmButtonText: 'OK',
      });
      currentWord.value = '';
    }, 500);
    return;
  }

  usedWords.add(word); 
  grid.value[currentRowIndex.value].letters = word.split('');
  currentRowIndex.value++;
  checkWord();
  currentWord.value = '';
  usedAttempts.value++;
};
  
  const checkWord = () => {
    const current = grid.value[currentRowIndex.value - 1];
    const word = current.letters.join('');
    let correct = 0;
  
    word.split('').forEach((letter, index) => {
      if (letter === wordToGuess.value[index]) {
        letterColors.value[currentRowIndex.value - 1][index] = 'bg-green-500';
        correct++;
      } else if (wordToGuess.value.includes(letter)) {
        letterColors.value[currentRowIndex.value - 1][index] = 'bg-yellow-500';
      } else {
        letterColors.value[currentRowIndex.value - 1][index] = 'bg-red-500';
      }
    });
  
    if (correct === 5) {
      gameOver.value = true;
      stopTimer();
      maxCorrectLetters.value = correct;
      setTimeout(async () => {
        Swal.fire({
          title: '¡Has ganado!',
          text: `¡Felicidades, adivinaste la palabra en ${completionTime.value} segundos!`,
          icon: 'success',
          confirmButtonText: 'OK',
        });
        await auth.setStats({
          completion_time: completionTime.value,
          used_attempts: usedAttempts.value,
          word: wordToGuess.value,
          completed: true,
        });
      }, 500);
    } else if (currentRowIndex.value === 6) {
      gameOver.value = true;
      stopTimer();
      setTimeout(async () => {
        Swal.fire({
          title: '¡Has perdido!',
          text: `La palabra era: ${wordToGuess.value}. Tiempo total: ${completionTime.value} segundos`,
          icon: 'error',
          confirmButtonText: 'OK',
        });
  
        await auth.setStats({
          completion_time: completionTime.value,
          used_attempts: usedAttempts.value,
          word: wordToGuess.value,
          completed: false,
        });
      }, 500);
    }
  };
  
  const restartGame = () => {
    window.location.reload();
  };
  
  onMounted(() => {
    window.addEventListener('keydown', handleKeydown);
    getRandomWord();
    startTimer();
  });
  
  onUnmounted(() => {
    window.removeEventListener('keydown', handleKeydown);
    stopTimer();
  });
  
  const handleKeydown = (event: KeyboardEvent) => {
    const letter = event.key.toUpperCase();
    if (alphabet.value.includes(letter) && currentWord.value.length < 5 && !gameOver.value) {
      currentWord.value += letter;
    } else if (event.key === 'Backspace' && !gameOver.value) {
      deleteLetter();
    } else if (event.key === 'Enter' && currentWord.value.length === 5 && !gameOver.value) {
      submitRow();
    }
  };
  </script>
  