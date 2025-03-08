<template>
    <section>
      <div class="flex flex-row items-center justify-center mx-auto md:h-screen lg:py-0">
        <div class="bg-[#d8dce0] rounded-e-xl w-3/5 h-full">
          <div class="h-full bg-[url('/images/wordle_big_animation2.gif')] bg-cover bg-center bg-no-repeat" />
        </div>
        <div class="w-3/6">
          <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
            <div class="mb-6 w-full sm:max-w-md rounded-xl text-2xl font-semibold text-gray-900 dark:text-white">
              <img src="/images/images.png" alt="Innpark logo" class="w-100 m-auto" />
            </div>
            <div class="w-full dark:md:mt-0 sm:max-w-md xl:p-0">
              <div class="space-y-4 md:space-y-6">
                <div>
                  <h1 class="text-2xl leading-9 tracking-tight text-font-50 md:text-2xl text-gray-500 dark:text-white">
                    Benvingut/da
                  </h1>
                  <p class="text-sm font-light text-gray-500 pt-2 dark:text-gray-400">
                    Registra't per poder accedir a la pàgina
                  </p>
                </div>
                <form class="space-y-4 md:space-y-6" @submit.prevent="register">
                  <div class="flex gap-2">
                    <div class="w-1/2">
                    <label for="name" class="block mb-2 text-sm text-font-50 dark:text-white">Nom</label>
                    <input
                      id="name"
                      v-model="name"
                      type="text"
                      name="name"
                      class="bg-gray-50 border border-gray-300 placeholder-gray-400 text-gray-900 sm:text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="Introdueix el teu nom"
                      required
                    />
                    </div>
                    <div class="w-1/2">
                      <label for="surname" class="block mb-2 text-sm text-font-50 dark:text-white">Cognom</label>
                      <input
                        id="surname"
                        v-model="surname"
                        type="text"
                        name="surname"
                        class="bg-gray-50 border border-gray-300 placeholder-gray-400 text-gray-900 sm:text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Introduceix el teu cognom"
                        required
                      />
                    </div>
                  </div>
                  <div class="flex gap-2">
                    <div class="w-1/2">
                      <label for="email" class="block mb-2 text-sm text-font-50 dark:text-white">Correu electrónic</label>
                      <input
                        id="email"
                        v-model="email"
                        type="email"
                        name="email"
                        class="bg-gray-50 border border-gray-300 placeholder-gray-400 text-gray-900 sm:text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="example@gmail.com"
                        required
                      />
                    </div>
                    <div class="w-1/2">
                      <label for="phone" class="block mb-2 text-sm text-font-50 dark:text-white">Teléfon</label>
                      <input
                      id="phone"
                      v-model="phone"
                      type="text"
                      name="phone"
                      class="bg-gray-50 border border-gray-300 placeholder-gray-400 text-gray-900 sm:text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="612123123"
                      required
                      />  
                    </div>
                  </div>
                  <div>
                    <label for="username" class="block mb-2 text-sm text-font-50 dark:text-white">Nom d'usuari</label>
                    <input
                      id="username"
                      v-model="username"
                      type="text"
                      name="username"
                      class="bg-gray-50 border border-gray-300 placeholder-gray-400 text-gray-900 sm:text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="Introdueix un nom d'usuari"
                      required
                    />
                  </div>
                  <div class="flex gap-2">
                    <div class="w-1/2">
                      <label for="password" class="block mb-2 text-sm text-font-50 dark:text-white">Contrasenya</label>
                      <input
                        id="password"
                        v-model="password"
                        type="password"
                        name="password"
                        class="bg-gray-50 border border-gray-300 placeholder-gray-400 text-gray-900 sm:text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="••••••••"
                        required
                      />
                    </div>
                    <div class="w-1/2">
                      <label for="repeatPassword" class="block mb-2 text-sm text-font-50 dark:text-white">Repetir contrasenya</label>
                      <input
                        id="repeatPassword"
                        v-model="repeatPassword"
                        type="password"
                        name="repeatPassword"
                        placeholder="••••••••"
                        class="bg-gray-50 border border-gray-300 placeholder-gray-400 text-gray-900 sm:text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        required
                      />
                    </div>
                  </div>
                  <p v-if="errorMessage" v-html="errorMessage" class="text-red-500"></p>
                  <button
                    type="submit"
                    class="w-full text-white bg-green-500 hover:bg-green-700 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-green-500 dark:hover:bg-green-700 dark:focus:ring-green-500"
                  >
                    Iniciar sessió
                  </button>
                  <div class="flex items-start">
                    <div class="ml-3 text-sm">
                      <label for="remember" class="text-font-50 dark:text-font-50">
                        ¿Tens compte?
                        <nuxt-link to="/" class="text-sm mb-2 text-green-500 hover:underline dark:text-green-500">
                          Inicia sessió
                        </nuxt-link>
                      </label>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </template>
<script setup lang="ts">
import { ref } from 'vue'
import Swal from 'sweetalert2'
import { useRouter } from 'vue-router'
import { useUser } from '@/stores/user'

const name = ref('')
const surname = ref('')
const email = ref('')
const phone = ref('')
const username = ref('')
const password = ref('')
const repeatPassword = ref('')
const router = useRouter()
const user = useUser()
const errorMessage = ref('')
const endpoint = 'http://new_wordle.test/api/register'


async function register() {
  errorMessage.value = '';

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const phoneRegex = /^[0-9]{9,12}$/;

  if (!name.value || !surname.value || !email.value || !phone.value || !username.value || !password.value || !repeatPassword.value) {
    errorMessage.value = 'Falta algun camp per omplir.';
    return;
  }

  if (!emailRegex.test(email.value)) {
    errorMessage.value = 'L\'email no és vàlid.';
    return;
  }

  if (!phoneRegex.test(phone.value)) {
    errorMessage.value = 'El telèfon no és vàlid.';
    return;
  }

  if (password.value !== repeatPassword.value) {
    errorMessage.value = 'Les contrasenyes no coincideixen.';
    return;
  }

  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      body: JSON.stringify({
        name: name.value,
        surname: surname.value,
        email: email.value,
        phone: phone.value,
        username: username.value,
        password: password.value,
      }),
      headers: { 'Content-Type': 'application/json' },
    });

    const data = await response.json();

    if (data.retCode === 200) {
      Swal.fire({
        title: 'Registre completat',
        icon: 'success',
        text: "T'has registrat correctament.",
      });
      router.push('/');
    } else {
        let errorMessages = Object.values(data.errors).flat().join('<br>');
        errorMessage.value = errorMessages;
    }
  } catch (error) {
    errorMessage.value = 'Error de connexió. Torna-ho a provar més tard.';
    console.error(error);
  }
}

</script>

  