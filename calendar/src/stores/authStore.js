import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    isAuth: false,
    isAdmin: false, 
    showLoginPopUp: true
  }),
  getters: {
    isAuthenticated: (state) => state.isAuth
  },
  actions: {
    openLoginPopUp() {
      if (!this.isAuth) this.showLoginPopUp = true
    },
    closeLoginPopUp() {
      this.showLoginPopUp = false
    },
    setAuth(isAuth, isAdmin = false) {
      this.isAuth = isAuth;
      this.isAdmin = isAdmin;
    },
  }
  
})