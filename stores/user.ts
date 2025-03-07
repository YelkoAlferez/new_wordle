import { defineStore } from 'pinia'

export const useUser = defineStore('user', {
  state: () => ({
    id: '',
    name: '',
  }),
  actions: {
    setUser(id: string, name: string) {
      this.id = id
      this.name = name
    },
  },
  getters: {
    getId: state => {
      return state.id
    },
    getName: state => {
      return state.name
    }
  },
})
