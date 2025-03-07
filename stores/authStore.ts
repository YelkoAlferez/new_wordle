import { defineStore } from 'pinia'
import Swal from 'sweetalert2'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    isAuthenticated: false,
    token: localStorage.getItem('authToken') || null, 
  }),

  actions: {
    login(json: any) {
      const user = useUser()

      this.isAuthenticated = true
      this.token = json.token
      
      user.setUser(json.id, json.name)
      localStorage.setItem('authToken', json.token) 
    },

    logout() {
      this.isAuthenticated = false
      this.token = null
      localStorage.removeItem('authToken')
      navigateTo('/')
    },

    async getStats(){
      const runtime = useRuntimeConfig().public.apiBase
      const endpoint = runtime + '/stats'

      try{
        const resp = await fetch(endpoint, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${this.token}`
          },
        })
        const json = await resp.json()
        
        if (json.stats) {
          return json.stats;
        }
        
      }catch(error){
        Swal.fire({
          title: '¡No se han podido generar estadísticas!',
          text: 'Todavía no tienes estadísticas',
          icon: 'error',
          confirmButtonText: 'OK',
        });
      }
    },

    async setStats(stats: any){
      const runtime = useRuntimeConfig().public.apiBase
      const endpoint = runtime + '/stats_create'

      try{
        const resp = await fetch(endpoint, {
          method: 'POST',
          body: JSON.stringify({
            completion_time:stats.completion_time,
            used_attempts:	stats.used_attempts,
            word:	stats.word,
            completed: stats.completed
          }),
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${this.token}`
          },
        })
        
      }catch(error){
        Swal.fire({
          title: '¡No se han podido generar estadísticas!',
          text: 'Ha habido un error en el sistema',
          icon: 'error',
          confirmButtonText: 'OK',
        });
      }
    },

    async checkAuth() {
      if (this.token) {
        const user = useUser()
        
        const runtime = useRuntimeConfig().public.apiBase
        const endpoint = runtime + '/user'
        
        try{
          const resp = await fetch(endpoint, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${this.token}`
            },
          })
          const json = await resp.json()
          
          if (json.retCode == 200) {
            user.setUser(json.id, json.name)
          }
          
          this.isAuthenticated = true
        }catch(error){
          this.isAuthenticated = false
          this.token = null
          localStorage.removeItem('authToken')
          navigateTo('/')
        }
      } else {
        this.isAuthenticated = false
      }
    },
  },
})
