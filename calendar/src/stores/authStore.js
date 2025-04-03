import { defineStore } from 'pinia';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    isAuth: false,
    isAdmin: false,
    showLoginPopUp: true,
  }),
  getters: {
    isAuthenticated: (state) => state.isAuth,
  },
  actions: {
    setAuth(isAuth, isAdmin = false) {
      console.log("setAuth called with:", isAuth, isAdmin);
      this.isAuth = isAuth;
      this.isAdmin = isAdmin;

      // Сохраняем состояние в localStorage
      localStorage.setItem('isAuth', JSON.stringify(isAuth));
      localStorage.setItem('isAdmin', JSON.stringify(isAdmin));
    },
    loadAuthState() {
      // Загружаем состояние из localStorage
      const isAuth = JSON.parse(localStorage.getItem('isAuth'));
      const isAdmin = JSON.parse(localStorage.getItem('isAdmin'));

      if (isAuth !== null) {
        this.isAuth = isAuth;
        this.isAdmin = isAdmin || false;
      }
    },
    openLoginPopUp() {
      if (!this.isAuth) this.showLoginPopUp = true;
    },
    closeLoginPopUp() {
      this.showLoginPopUp = false;
    },
  },
});