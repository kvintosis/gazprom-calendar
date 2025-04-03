import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    isAuth: false,
    isAdmin: true, 
    showLoginPopUp: false
  }),
  getters: {
    isAuthentificated: (state) => state.isAuth || state.isAdmin
  },
  actions: {
    openLoginPopUp() {
      if (!this.isAdmin) this.showLoginPopUp = true
    },
    closeLoginPopUp() {
      this.showLoginPopUp = false
    }
  }
})