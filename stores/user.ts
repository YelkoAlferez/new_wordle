import { defineStore } from 'pinia'

export const useUser = defineStore('user', {
  state: () => ({
    id: '',
    name: '',
    email: '',
  }),
  actions: {
    setUser(id: string, name: string, email: string) {
      this.id = id
      this.name = name
      this.email = email
    },
  },
  getters: {
    getId: state => {
      return state.id
    },
    getName: state => {
      return state.name
    },
    getEmail: state => {
      return state.email
    },
  },
})
