<template>
    <div
      class="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 to-indigo-600 text-white"
    >
      <div
        class="text-center p-8 bg-white rounded-lg shadow-md max-w-md w-full text-gray-800"
      >
        <h1 class="text-4xl font-bold mb-4">¡Bienvenido a WORDLE IBC!</h1>
        <p class="text-lg mb-6">
          Nos alegra verte aquí, {{ name }}. Explora y disfruta de los divertidos
          modos de juego.
        </p>
        <button
          @click="logout"
          class="px-6 py-2 bg-red-500 text-white font-semibold rounded-md hover:bg-red-600 transition"
        >
          Logout
        </button>
      </div>
    </div>
  </template>
  
  <script lang="ts">
  import { useUser } from '@/stores/user'
  import { defineComponent, ref } from 'vue'

  export default defineComponent({
    setup() {
      const user = useUser()
      const name = ref(user.getName)
  
      function logout() {
        localStorage.removeItem('authToken') 
        window.location.href = '/'
      }
  
      return {
        name,
        logout,
      }
    },
  })
  </script>
  