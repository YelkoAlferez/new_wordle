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
                    Bienvenido/a
                  </h1>
                  <p class="text-sm font-light text-gray-500 pt-2 dark:text-gray-400">
                    Inicia sesión para acceder a tu cuenta
                  </p>
                </div>
                <form class="space-y-4 md:space-y-6" @submit.prevent="register">
                  <div>
                    <label for="name" class="block mb-2 text-sm text-font-50 dark:text-white">Nombre</label>
                    <input
                      id="name"
                      v-model="name"
                      type="text"
                      name="name"
                      class="bg-gray-50 border border-gray-300 placeholder-gray-400 text-gray-900 sm:text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="Introduce tu nombre"
                      required
                    />
                  </div>
                  <div>
                    <label for="email" class="block mb-2 text-sm text-font-50 dark:text-white">Correo electrónico</label>
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
                  <div>
                    <label for="username" class="block mb-2 text-sm text-font-50 dark:text-white">Nombre de usuario</label>
                    <input
                      id="username"
                      v-model="username"
                      type="text"
                      name="username"
                      class="bg-gray-50 border border-gray-300 placeholder-gray-400 text-gray-900 sm:text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="Introduce un nombre de usuario"
                      required
                    />
                  </div>
                  <div class="flex gap-2">
                    <div class="w-1/2">
                      <label for="password" class="block mb-2 text-sm text-font-50 dark:text-white">Contraseña</label>
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
                      <label for="repeatPassword" class="block mb-2 text-sm text-font-50 dark:text-white">Repetir contraseña</label>
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
                  <div><p class="error text-red-500 hidden">Las contraseñas no coinciden</p></div>
                  <button
                    type="submit"
                    class="w-full text-white bg-green-500 hover:bg-green-700 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-green-500 dark:hover:bg-green-700 dark:focus:ring-green-500"
                  >
                    Iniciar sesión
                  </button>
                  <div class="flex items-start">
                    <div class="ml-3 text-sm">
                      <label for="remember" class="text-font-50 dark:text-font-50">
                        ¿No tienes cuenta?
                        <nuxt-link to="/" class="text-sm mb-2 text-green-500 hover:underline dark:text-green-500">
                          Regístrate
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
const email = ref('')
const username = ref('')
const password = ref('')
const repeatPassword = ref('')
const router = useRouter()
const user = useUser()
const endpoint = 'http://new_wordle.test/api/register'


async function register() {
  try {

    if(password.value !== repeatPassword.value){
      $('.error').show()
      return;
    }else{
      $('.error').hide()
    }

    const resp = await fetch(endpoint, {
      method: 'POST',
      body: JSON.stringify({
        name: name.value,
        email: email.value,
        username: username.value,
        password: password.value,
        repeatPassword: repeatPassword.value,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    })

    const json = await resp.json()

    if (json.retCode == 200) {
      Swal.fire({
        title: 'Registrado con éxito',
        icon: 'success',
        text: 'El registro se ha completado con éxito',
      })
      router.push('/')
    } else {
      Swal.fire({
        title: 'Error en el registro',
        icon: 'error',
        text: 'Ha habido un error al registrarse, inténtalo de nuevo',
      })
      email.value = ''
      username.value = ''
      password.value = ''
      repeatPassword.value = ''
    }
  } catch (error) {
    console.log(error)
  }
}
</script>

  