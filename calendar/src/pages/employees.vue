<template>
    <div class="employees-container container">
        <div class="filters-container">
            <h2 class="filters-header">Фильтры</h2>
            <div class="filters">
                <details>
                    <summary>Должность</summary>
                    <ul>
                        <li>
                            <div class="form-check">
                                <input class="form-check-input" type="checkbox" value="Инженер" id="engineer" v-model="selectedPositions" @change="fetchEmployees">
                                <label class="form-check-label" for="engineer">
                                    Инженер
                                </label>
                            </div>
                        </li>
                        <li>
                            <div class="form-check">
                                <input class="form-check-input" type="checkbox" value="Оператор" id="operator" v-model="selectedPositions" @change="fetchEmployees">
                                <label class="form-check-label" for="operator">
                                    Оператор
                                </label>
                            </div>
                        </li>
                        <li>
                            <div class="form-check">
                                <input class="form-check-input" type="checkbox" value="Сварщик" id="welder" v-model="selectedPositions" @change="fetchEmployees">
                                <label class="form-check-label" for="welder">
                                    Сварщик
                                </label>
                            </div>
                        </li>
                    </ul>
                </details>

                <details>
                    <summary>Отдел</summary>
                    <ul>
                        <li>
                            <div class="form-check">
                                <input class="form-check-input" type="checkbox" value="Отдел охраны" id="security" v-model="selectedDepartment" @change="fetchEmployees">
                                <label class="form-check-label" for="security">
                                    Отдел охраны
                                </label>
                            </div>
                        </li>
                        <li>
                            <div class="form-check">
                                <input class="form-check-input" type="checkbox" value="Диспетчерская" id="dispatcher" v-model="selectedDepartment" @change="fetchEmployees">
                                <label class="form-check-label" for="dispatcher">
                                    Диспетчерская
                                </label>
                            </div>
                        </li>
                        <li>
                            <div class="form-check">
                                <input class="form-check-input" type="checkbox" value="Отдел капитального строительства" id="construction" v-model="selectedDepartment" @change="fetchEmployees">
                                <label class="form-check-label" for="construction">
                                    Отдел капитального строительства
                                </label>
                            </div>
                        </li>
                    </ul>
                </details>
            </div>
            
            <div class="search-container">
                <input type="text" v-model="searchQuery" placeholder="Поиск сотрудников" class="search-input" @input="fetchEmployees">
                <ul class="employee-list">
                    <li v-for="employee in filteredEmployees" :key="employee.email" class="employee-item">
                        <div class="employee-photo">
                            <img :src="avatar" alt="Фото сотрудника">
                        </div>
                        <div class="employee-info">
                            <strong>{{ employee.first_name }} {{ employee.last_name }}</strong><br>
                            <span>Должность: {{ employee.position }}</span><br>
                            <span>Отдел: {{ employee.department }}</span><br>
                            <span>Email: {{ employee.email }}</span><br>
                            <span>Навыки: {{ employee.skills }}</span><br>
                            <span>Интересы: {{ employee.interests }}</span>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    </div>  

    <!-- Используем showLoginPopUp для управления видимостью -->
    <div class="popUp_overlay" v-if="authStore.showLoginPopUp">
        <div class="popUp__content">
            <form @submit.prevent="handleLogin" novalidate>
                <!-- Поля формы -->
            </form>
        </div>
    </div>
</template>

<script>
import avatar from "@/assets/avatar.png"; 
import { computed } from 'vue';
import { useAuthStore } from '@/stores/authStore';
import api from '@/services/api';

export default {
    data() {
        return {
            searchQuery: '',
            selectedPositions: [],
            selectedDepartment: [],
            employees: [],
            email: "",
            password: "",
            showEmailError: false,
            showPasswordError: false,
            loginError: "",
            loading: false,
            passwordVisible: false,
        };
    },
    setup() {
        const authStore = useAuthStore();

        return { 
            authStore, // Делаем authStore доступным в шаблоне
        };
    },
    computed: {
        filteredEmployees() {
            let filtered = this.employees;

            if (this.selectedPositions.length > 0) {
                filtered = filtered.filter((employee) =>
                    this.selectedPositions.includes(employee.position)
                );
            }

            if (this.selectedDepartment.length > 0) {
                filtered = filtered.filter((employee) =>
                    this.selectedDepartment.includes(employee.department)
                );
            }

            if (this.searchQuery) {
                const searchTerm = this.searchQuery.toLowerCase();
                filtered = filtered.filter(
                    (employee) =>
                        employee.first_name.toLowerCase().includes(searchTerm) ||
                        employee.last_name.toLowerCase().includes(searchTerm) ||
                        employee.position.toLowerCase().includes(searchTerm) ||
                        employee.department.toLowerCase().includes(searchTerm) ||
                        employee.skills.toLowerCase().includes(searchTerm) ||
                        employee.interests.toLowerCase().includes(searchTerm)
                );
            }

            return filtered;
        },
    },
    methods: {
        fetchEmployees() {
            const filters = {
                positions: this.selectedPositions,
                department: this.selectedDepartment,
                search: this.searchQuery
            };
            api.get('employees')
                .then(response => {
                    this.employees = response.data;
                })
        },
        async handleLogin() {
            this.showEmailError = false;
            this.showPasswordError = false;
            this.loginError = "";

            if (!this.validateEmail()) {
                this.showEmailError = true;
                return;
            }
            if (!this.password) {
                this.showPasswordError = true;
                return;
            }

            this.loading = true;

            try {
                const response = await api.login(this.email, this.password);
                const { access_token } = response.data;

                // Установка авторизации
                this.authStore.setAuth(true);
                document.cookie = `access_token=${access_token}; path=/;`;

                // Закрытие popup
                this.authStore.closeLoginPopUp();
            } catch (error) {
                if (error.response && error.response.status === 401) {
                    this.loginError = "Неверный email или пароль";
                } else {
                    this.loginError = "Ошибка сервера. Попробуйте позже";
                }
            } finally {
                this.loading = false;
            }
        },

        validateEmail() {
            const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return re.test(this.email);
        },

        togglePasswordVisibility() {
            this.passwordVisible = !this.passwordVisible;
        },
    },
    mounted() {
        this.fetchEmployees(); // Загрузка данных при монтировании
    }
}
</script>


<style scoped>
.employees-container {
    display: flex;
    max-width: 1200px;
    margin: 0 auto;
    padding: 20px;
    align-items: flex-start;
    position: relative; 
}

.filters-container {
    width: 200px;
    flex-shrink: 0;
    padding-right: 0px;
    border-right: 1px solid #ccc;
}

.filters-header {
    margin-top: 100px;
}

ul {
    list-style: none;
    padding: 0;
}

li {
    margin-bottom: 5px;
}

.search-container {
    position: fixed;
    top: 100px;
    margin-left: 220px;
}

summary {
    margin-top: 15px;
    font-size: 22px;
    cursor: pointer;
}

.search-input {
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
    margin-bottom: 20px;
    box-sizing: border-box;
}

details[open] .closed-filter {
    display: none;
}

details[open] .opened-filter {
    display: block;
}

.employee-list {
    list-style: none;
    padding: 0;
}

.employee-list li {
    padding: 8px;
    border-bottom: 1px solid #eee;
}

.employee-item {
    display: flex;
    align-items: center;
}

.employee-photo img {
    width: 100px;
    height: 100px;
    border-radius: 50%;
    margin-right: 15px;
}

.employee-info {
    flex: 1;
}

/* Адаптивные стили */
@media (max-width: 768px) {
    .employees-container {
        flex-direction: column;
        align-items: stretch;
    }

    .filters-container {
        width: 100%;
        border-right: none;
        padding-right: 0;
        margin-bottom: 20px;
    }

    .search-container {
        width: 100%;
        padding-left: 0;
    }

    .search-input {
        width: 100%;
    }
}
</style>