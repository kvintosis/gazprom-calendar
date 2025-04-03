<template>
    <div class="popUp_overlay" v-if="!isAuthentiaced">
        <div class="popUp__content">
            <img class ="popUp__logo" src="@/assets/loginicon.png">
            <h2 class = "popUp__text">Вход</h2>

            <form @submit.prevent="handleLogin" novalidate>
                <div class = "form-group">
                    <label class = "form-group__text" for ="email">Email:</label>
                    <input
                    class = "form-group__input"
                    type="email"
                    id="email"
                    v-model="email"
                    placeholder="Введите ваш email"
                    />
                    <span v-if="showEmailError" class="error-message visible">Введите корректный email</span>

                </div>

                <div class="form-group">
                    <label class = "form-group__text" for="password">Пароль:</label>
                    <div class="password-input-wrapper">
                        <input
                            class="form-group__input"
                            :type="passwordFieldType"
                            id="password"
                            v-model="password"
                            placeholder="Введите ваш пароль"
                            required
                        />
                        <button
                            type="button"
                            class="password-toggle-button"
                            @click="togglePasswordVisibility"
                        >
                            <img :src="eyeIcon" :alt="eyeAltText" width="24" height="24" />
                        </button>
                    </div>
                    <span v-if="showPasswordError" class="error-message visible">Введите пароль</span>
                </div>

                <button type="submit" class="popUp__btn-login btn" :disabled="loading">
                    {{ loading ? 'Загрузка...' : 'Войти' }}
                </button>
        
                <div v-if="loginError" class="error-message server-error visible">
                    {{ loginError }}
                </div>
            </form>
        </div>
    </div>
</template>

<script>
import eyeOpenPng from "@/assets/eye-open.png"; 
import eyeClosedPng from "@/assets/eye-closed.png";
//import axios from 'axios';
import { useAuthStore } from '@/stores/authStore'
export default {
    data(){
        return{
            email: "",
            password: "",
            showEmailError: false,
            showPasswordError: false,
            loginError: "",
            loading: false,
            passwordVisible: false
        };
    },

    setup() {
        const authStore = useAuthStore()
        return { authStore }
    },
    computed: {
    //     isAuthentiaced() {
    //         return this.$store.getters.isAuthentiaced;
    //     }
        
        passwordFieldType() {
            return this.passwordVisible ? "text" : "password";
        },

        eyeIcon() {
            return this.passwordVisible ? eyeOpenPng : eyeClosedPng;
        },

        eyeAltText() {
            return this.passwordVisible ? "Скрыть пароль" : "Показать пароль";
        },
    },
    methods: {
        togglePasswordVisibility() {
        this.passwordVisible = !this.passwordVisible;
        },

        validateEmail(){
            const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return re.test(this.email);
        },
        
        handleLogin() {
            this.showEmailError = false;
            this.showPasswordError = false;
            this.loginError = "";

            if (!this.validateEmail()) {
                this.showEmailError = true;
                return;
            }
            if (!this.password){
                this.showPasswordError = true;
                return;
            }

            this.loading = true;

            // try {
            // const response = await axios.post('/api/auth/login', {
            // email: this.email,
            // password: this.password
            // });
            setTimeout(() => {
                if(this.email === "test@example.com" && this.password === "123"){
                    this.isAuthentiaced =true;
                    this.$emit("close");
                    this.$router.push("/");
                } else{
                    this.loginError = "Неверный email или пароль";
                }
                this.loading = false;
            }, 1000);
            // if (response.data.success) {
            // this.$store.commit('SET_USER', response.data.user);
            // this.$store.commit('SET_TOKEN', response.data.token);
            
            // this.$emit('close');
            
            // this.$router.push('/');
            // } else {
            // this.loginError = response.data.message || "Ошибка входа";
            // }
        }
    //     } catch (error) {
    //     if (error.response) {
    //       switch (error.response.status) {
    //         case 401:
    //           this.loginError = "Неверный email или пароль";
    //           break;
    //         case 404:
    //           this.loginError = "Пользователь не найден";
    //           break;
    //         default:
    //           this.loginError = "Ошибка сервера. Попробуйте позже";
    //       }
    //     } else {
    //       this.loginError = "Ошибка сети. Проверьте соединение";
    //     }
    //   } finally {
    //     this.loading = false;
    //   }
    }
}
</script>

<style lang="less" scoped>
.popUp_overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.7);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
    padding: 20px;
    box-sizing: border-box;
    opacity: 0;
    animation: fadeIn 0.3s forwards;

    @keyframes fadeIn {
        to { opacity: 1; }
    }
}

    .popUp__content {
    position: relative;
    background: @white;
    border-radius: 12px;
    width: 100%;
    max-width: 440px;
    padding: 40px;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
    transform: translateY(20px);
    animation: slideUp 0.4s cubic-bezier(0.36, 0.66, 0.04, 1) forwards;
    font-family: @font1;

    @keyframes slideUp {
        to { transform: translateY(0); }
    }
}

.popUp__logo {
    display: block;
    margin: 0 auto 24px;
    width: 150px;
    height: auto;
}

.popUp__text {
    font-family: @font2;
    font-size: 24px;
    line-height: 1.3;
    color: @blue;
    text-align: center;
    margin-bottom: 32px;
    text-transform: uppercase;
}

.form-group {
    margin-bottom: 20px;

    &__text {
        display: block;
        font-family: @font2;
        font-size: 14px;
        color: darken(@silver, 30%);
        margin-bottom: 8px;
        text-transform: uppercase;
        letter-spacing: 0.5px;
    }

    &__input {
        width: 100%;
        padding: 14px 16px;
        border: 1px solid lighten(@silver, 10%);
        border-radius: 6px;
        font-family: @font1;
        font-size: 16px;
        color: #333;
        transition: @transition-fast;

        &:focus {
            border-color: @blue;
            outline: none;
            box-shadow: 0 0 0 2px fade(@blue, 20%);
        }

        &::placeholder {
            color: lighten(@silver, 5%);
        }
    }
}

.error-message {
    font-family: @font1;
    font-size: 13px;
    color: @error-red;
    margin-top: 6px;
    display: block;
    opacity: 0;
    transform: translateY(-5px);
    transition: @transition-medium;

    &.visible {
        opacity: 1;
        transform: translateY(0);
    }

    &.server-error {
        background: lighten(@error-red, 40%);
        padding: 12px;
        border-radius: 6px;
        margin-top: 20px;
        text-align: center;
        border-left: 3px solid @error-red;
        border-right: 3px solid @error-red;
    }
}

.popUp__btn-login {
    width: 100%;
    padding: 16px;
    background: @blue;
    color: @white;
    border: none;
    border-radius: 6px;
    font-family: @font2;
    font-size: 16px;
    text-transform: uppercase;
    letter-spacing: 1px;
    cursor: pointer;
    transition: @transition-medium;
    margin-top: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 8px;

    &:hover {
        background: darken(@blue, 8%);
        transform: translateY(-2px);
        box-shadow: 0 4px 12px fade(@blue, 25%);
    }

    &:active {
        transform: translateY(0);
        box-shadow: none;
    }

    &:disabled {
        background: lighten(@silver, 10%);
        cursor: not-allowed;
        transform: none !important;
        box-shadow: none !important;
    }
}

@media (max-width: 480px) {
    .popUp__content {
        padding: 32px 24px;
        border-radius: 8px;
    }

    .popUp__text {
        font-size: 20px;
        margin-bottom: 24px;
    }

    .form-group {
        margin-bottom: 16px;

        &__input {
            padding: 12px 14px;
        }
    }
}

.password-input-wrapper {
    position: relative;
    display: flex;
    align-items: center;
}

.password-toggle-button {
    position: absolute;
    right: 10px;
    top: 50%;
    transform: translateY(-50%);
    background: none;
    border: none;
    cursor: pointer;
    padding: 0;
    outline: none;

    &:hover {
        opacity: 0.7;
    }
}
</style>