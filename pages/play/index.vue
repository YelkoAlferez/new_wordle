<template>
  <div class="flex justify-center min-h-screen bg-gradient-to-r from-blue-500 to-indigo-600 text-white">
    <div class="text-center p-8">
      <h1 class="text-5xl font-bold mb-6 text-white">¡WORDLE IBC!</h1>
      <div class="absolute top-5 left-5 p-4 flex gap-4 items-center">
        <button @click="auth.logout"
          class="px-6 py-2 bg-red-500 text-white font-semibold rounded-md hover:bg-red-600 transition">
          Logout
        </button>
        <button @click="showInfo"
          class="px-6 py-2 bg-green-500 text-white font-semibold rounded-md hover:bg-green-600 transition">
          Ajuda
        </button>
      </div>
      <div class="absolute top-5 right-5 p-4 flex gap-4 items-center">
        <div class="text-lg mb-2">Intents: {{ usedAttempts }}</div>
        <button @click="restartGame" class="px-4 py-2 bg-gray-700 text-white rounded-lg text-lg hover:bg-gray-600">
          Reiniciar
        </button>
        <button @click="showStats" class="px-4 py-2 bg-green-700 text-white rounded-lg text-lg hover:bg-green-600">
          Veure estadístiques
        </button>
      </div>
      <div id="wordle-grid" class="flex flex-col items-center gap-2">
        <div v-for="(row, rowIndex) in grid" :key="'row-' + (rowIndex + 1)" class="flex gap-2">
          <input v-for="(colIndex, index) in 5" :key="'row-' + (rowIndex + 1) + '-col-' + index"
            v-model="grid[rowIndex].letters[index]" :class="[
              'w-16 h-16 text-white rounded-lg border-2 border-white flex items-center justify-center text-2xl font-bold text-center',
              letterColors[rowIndex][index],
            ]" :readonly="rowIndex < currentRowIndex" />
        </div>
      </div>

      <div class="mt-6">
        <input v-model="currentWord" readonly type="text" maxlength="5" placeholder="Introduce tu palabra"
          class="w-64 h-12 text-center text-2xl font-bold bg-gray-800 text-white border-2 border-white rounded-lg"
          :disabled="isWordSubmitted ||
            currentWord.length === 5 ||
            currentRowIndex >= grid.length
            " />
      </div>

      <div id="keyboard" class="flex flex-wrap justify-center gap-2 mt-6">
        <!-- Render each row dynamically -->
        <div v-for="(slice, rowIndex) in letterSlices" :key="'row-' + rowIndex"
          class="flex justify-center gap-1 mt-4 w-full">
          <button v-for="(letter, index) in alphabet.slice(slice[0], slice[1])" :key="index" :id="'letter-' + letter"
            @click="addLetter(letter)"
            class="w-12 h-12 rounded-lg text-xl hover:bg-gray-600 flex items-center justify-center font-bold"
            :class="[keyColors[letter] || 'bg-gray-700 text-white']">
            {{ letter }}
          </button>
        </div>

        <!-- Special action buttons row -->
        <div class="flex justify-center gap-4 mt-4 w-full">
          <button @click="deleteLetter" class="w-16 h-12 bg-gray-700 text-white rounded-lg text-xl hover:bg-gray-600">
            DEL
          </button>
          <button @click="submitRow" class="w-16 h-12 bg-gray-700 text-white rounded-lg text-xl hover:bg-gray-600">
            ENTER
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";
import Swal from "sweetalert2";
import { dic } from "~/assets/diccionari.js";

const keyColors = ref<Record<string, string>>({});
const keyDataValues = ref<Record<string, number>>({});

const letterSlices = [
  [0, 10],
  [10, 20],
  [20, 26],
];

const grid = ref([
  { letters: ["", "", "", "", ""], colors: ["", "", "", "", ""] },
  { letters: ["", "", "", "", ""], colors: ["", "", "", "", ""] },
  { letters: ["", "", "", "", ""], colors: ["", "", "", "", ""] },
  { letters: ["", "", "", "", ""], colors: ["", "", "", "", ""] },
  { letters: ["", "", "", "", ""], colors: ["", "", "", "", ""] },
  { letters: ["", "", "", "", ""], colors: ["", "", "", "", ""] },
]);

const letterColors = ref([
  ["", "", "", "", ""],
  ["", "", "", "", ""],
  ["", "", "", "", ""],
  ["", "", "", "", ""],
  ["", "", "", "", ""],
  ["", "", "", "", ""],
]);

const alphabet = ref(['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P', 'A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', 'Ç', 'Z', 'X', 'C', 'V', 'B', 'N', 'M']);
const currentWord = ref("");
const wordToGuess = ref("");
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

const showInfo = () => {
  Swal.fire({
  title: "Normes del Wordle",
  html: `
    <p><strong>🎯 Objectiu del joc:</strong> Endevina la paraula oculta de 5 lletres en un màxim de 6 intents.</p>
    <p><strong>📝 Com jugar:</strong></p>
    <ul style="text-align: left;">
      <li>Introdueix una paraula vàlida de 5 lletres.</li>
      <li>Després de cada intent, rebràs pistes:</li>
      <ul>
        <li>🟩 Verd: La lletra és correcta i està ben col·locada.</li>
        <li>🟨 Groc: La lletra està a la paraula, però en una posició diferent.</li>
        <li>⬜ Gris: La lletra no està a la paraula.</li>
      </ul>
    </ul>
    <p><strong>⚠️ Regles:</strong></p>
    <ul style="text-align: left;">
      <li>Només s'accepten paraules reals de 5 lletres.</li>
      <li>No es permeten noms propis ni abreviatures.</li>
      <li>Has d'encertar la paraula abans d'esgotar els intents!</li>
    </ul>
  `,
  icon: "info",
  confirmButtonText: "D'acord"
});

}

const showStats = async () => {
  const stats = await auth.getStats();

  if (stats.totalStats > 0) {
    Swal.fire({
      title: "¡Estadísticas!",
      html: `<ul>
            <li>Total Stats: ${stats.totalStats}</li>
            <li>Completats: ${stats.completedCount}</li>
            <li>No Completats: ${stats.notCompletedCount}</li>
            <li>Temps més ràpid: ${stats.fastestCompletionTime != null ? stats.fastestCompletionTime + ' segons' : 'No hi ha registres'}</li>
            <li>Mitjana de temps: ${stats.averageCompletionTime} segons</li>
            <li>Millor partida: ${stats.minUsedAttempts == 1
          ? stats.minUsedAttempts + " intent"
          : stats.minUsedAttempts + " intents"
        }</li>
        </ul>`,
      icon: "info",
      confirmButtonText: "OK",
    });
  } else {
    Swal.fire({
      title: "¡Estadístiques!",
      text: "Encara no tens estadístiques",
      icon: "info",
      confirmButtonText: "OK",
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
        title: "Paraula no vàlida",
        text: "La paraula no existeix al diccionari.",
        icon: "error",
        confirmButtonText: "OK",
      });
      currentWord.value = "";
    }, 500);
    return;
  }

  if (usedWords.has(word)) {
    setTimeout(async () => {
      Swal.fire({
        title: "Paraula repetida",
        text: "Ja has introduit aquesta paraula abans.",
        icon: "warning",
        confirmButtonText: "OK",
      });
      currentWord.value = "";
    }, 500);
    return;
  }

  usedWords.add(word);
  grid.value[currentRowIndex.value].letters = word.split("");
  currentRowIndex.value++;
  checkWord();
  currentWord.value = "";
  usedAttempts.value++;
};

const checkWord = () => {
  const current = grid.value[currentRowIndex.value - 1];
  const word = current.letters.join("");
  let correct = 0;

  word.split("").forEach((letter, index) => {
    if (keyDataValues.value[letter] === undefined) {
      keyDataValues.value[letter] = 0;
    }

    if (letter === wordToGuess.value[index]) {
      letterColors.value[currentRowIndex.value - 1][index] = "bg-green-500";

      if (keyDataValues.value[letter] < 3) {
        keyColors.value[letter] = "bg-green-500";
        keyDataValues.value[letter] = 3;
      }
      correct++;
    } else if (wordToGuess.value.includes(letter)) {
      letterColors.value[currentRowIndex.value - 1][index] = "bg-yellow-500";

      if (keyDataValues.value[letter] < 2) {
        keyColors.value[letter] = "bg-yellow-500";
        keyDataValues.value[letter] = 2;
      }
    } else {
      letterColors.value[currentRowIndex.value - 1][index] = "bg-gray-500";
      if (keyDataValues.value[letter] < 1) {
        keyColors.value[letter] = "bg-gray-500";
        keyDataValues.value[letter] = 1;
      }
    }
  });

  if (correct === 5) {
    gameOver.value = true;
    stopTimer();
    maxCorrectLetters.value = correct;
    setTimeout(async () => {
      Swal.fire({
        title: "¡Has guanyat!",
        text: `¡Felicitats, has endivinat la paraula en ${completionTime.value} segons!`,
        icon: "success",
        confirmButtonText: "OK",
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
        title: "¡Has perdut!",
        text: `La paraula era: ${wordToGuess.value}. Temps total: ${completionTime.value} segons`,
        icon: "error",
        confirmButtonText: "OK",
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
  window.addEventListener("keydown", handleKeydown);
  getRandomWord();
  startTimer();
});

onUnmounted(() => {
  window.removeEventListener("keydown", handleKeydown);
  stopTimer();
});

const handleKeydown = (event: KeyboardEvent) => {
  const letter = event.key.toUpperCase();
  if (
    alphabet.value.includes(letter) &&
    currentWord.value.length < 5 &&
    !gameOver.value
  ) {
    currentWord.value += letter;
  } else if (event.key === "Backspace" && !gameOver.value) {
    deleteLetter();
  } else if (
    event.key === "Enter" &&
    currentWord.value.length === 5 &&
    !gameOver.value
  ) {
    submitRow();
  }
};
</script>
