<template>
    <div
      class="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 to-indigo-600 text-white"
    >
      <div
        class="text-center p-8 bg-white rounded-lg shadow-md max-w-md w-full text-gray-800"
      >
        <h1 class="text-4xl font-bold mb-4">¡Benvingut a WORDLE IBC!</h1>
        <p class="text-lg mb-6">
          Ens alegra veure't aqui, {{ name }}
          Que vols fer?
        </p>
        <div>
          <button
            @click="auth.logout"
            class="px-6 py-2 bg-red-500 text-white font-semibold rounded-md hover:bg-red-600 transition m-2"
            >
            Logout
          </button>
          <button
            @click="play"
            class="px-6 py-2 bg-green-500 text-white font-semibold rounded-md hover:bg-green-600 transition m-2"
            >
            Jugar
          </button>
        </div>
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
      const auth = useAuthStore()

      const play = () => {
        navigateTo('/play')
      }

      return {
        name,
        auth,
        play
      }
    },
  })
</script>
  