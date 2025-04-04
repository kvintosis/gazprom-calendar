import axios from "axios";
import { useAuthStore } from "@/stores/authStore";

const api = axios.create({
  baseURL: "http://127.0.0.1:8000",
  withCredentials: true,
});

api.interceptors.response.use(
  (response) => response, 
  (error) => {
    const authStore = useAuthStore();

    if (error.response) {
      const status = error.response.status;
      if (status === 401) {
        authStore.showLoginPopUp();
        window.location.reload();
      }

      if (status === 307) {
        const redirectUrl = error.response.headers?.location;
        if (redirectUrl && redirectUrl === "/need-auth") {
            window.location.href = "/";
            authStore.showLoginPopUp();
            window.location.reload();
        }
      }
    } else {
      console.error("Ошибка сети или сервера:", error.message);
    }

    return Promise.reject(error);
  }
);

export default api;
