// stores/authStore.ts

import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    isAuthenticated: false,
    token: localStorage.getItem('authToken') || null, 
  }),

  actions: {
    login(token: any) {
      this.isAuthenticated = true
      this.token = token
      localStorage.setItem('authToken', token) 
    },

    logout() {
      this.isAuthenticated = false
      this.token = null
      localStorage.removeItem('authToken')
    },

    checkAuth() {
      if (this.token) {
        this.isAuthenticated = true
      } else {
        this.isAuthenticated = false
      }
    },
  },
})
