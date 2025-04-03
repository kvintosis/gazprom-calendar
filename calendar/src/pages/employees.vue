<template>
    <div class="employees-container container">
        <!-- Фильтры -->
        <div class="filters-container">
            <h2 class="filters-header">Фильтры</h2>
            <div class="filters">
                <details>
                    <summary>Должность</summary>
                    <ul>
                        <li>
                            <div class="form-check">
                                <input class="form-check-input" type="checkbox" value="Инженер" id="engineer" v-model="selectedPositions">
                                <label class="form-check-label" for="engineer">
                                    Инженер
                                </label>
                            </div>
                        </li>
                        <li>
                            <div class="form-check">
                                <input class="form-check-input" type="checkbox" value="Оператор" id="operator" v-model="selectedPositions">
                                <label class="form-check-label" for="operator">
                                    Оператор
                                </label>
                            </div>
                        </li>
                        <li>
                            <div class="form-check">
                                <input class="form-check-input" type="checkbox" value="Сварщик" id="welder" v-model="selectedPositions">
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
                                <input class="form-check-input" type="checkbox" value="Отдел охраны" id="security" v-model="selectedDepartments">
                                <label class="form-check-label" for="security">
                                    Отдел охраны
                                </label>
                            </div>
                        </li>
                        <li>
                            <div class="form-check">
                                <input class="form-check-input" type="checkbox" value="Диспетчерская" id="dispatcher" v-model="selectedDepartments">
                                <label class="form-check-label" for="dispatcher">
                                    Диспетчерская
                                </label>
                            </div>
                        </li>
                        <li>
                            <div class="form-check">
                                <input class="form-check-input" type="checkbox" value="Отдел капитального строительства" id="construction" v-model="selectedDepartments">
                                <label class="form-check-label" for="construction">
                                    Отдел капитального строительства
                                </label>
                            </div>
                        </li>
                    </ul>
                </details>
            </div>
        </div>

        <!-- Основной контент -->
        <div class="main-content">
            
                        <!-- Список сотрудников -->
                        <div class="employees-list">
                            <div class="text"> 
                        <h2>Список сотрудников</h2>
                    </div>

                            <!-- Строка поиска -->
            <div class="search-container">
                <input type="text" v-model="searchQuery" placeholder="Поиск сотрудников" class="search-input">
            </div>

                <ul>
                    <li v-for="employee in filteredEmployees" :key="employee.id">
                        {{ employee.name }} - {{ employee.position }} - {{ employee.department }}
                        <button @click="deleteEmployee(employee.id)">Удалить</button>
                    </li>
                </ul>
            </div>
        </div>

        <!-- Админ-панель -->
        <div class="admin-panel" v-if="isAdmin">
            <button class="add-employee-btn" @click="isOpen = true">
                <span>+</span>
            </button>
            <div v-if="isOpen" class="modal">
                <div class="modal-content">
                    <h3>Добавить сотрудника</h3>
                    <div class="form-group">
                        <label>Имя</label>
                        <input v-model="newEmployee.name" type="text" required />
                    </div>
                    <div class="form-group">
                        <label>Должность</label>
                        <input v-model="newEmployee.position" type="text" required />
                    </div>
                    <div class="form-group">
                        <label>Отдел</label>
                        <input v-model="newEmployee.department" type="text" required />
                    </div>
                    <div class="actions">
                        <button @click="addEmployee">Сохранить</button>
                        <button @click="isOpen = false">Отмена</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { ref } from "vue";
import { useAuthStore } from "@/stores/authStore";

export default {
    setup() {
        const authStore = useAuthStore();
        const isAdmin = ref(authStore.isAdmin); // Проверяем статус администратора
        const isOpen = ref(false); // Управление состоянием модального окна
        const employees = ref([]); // Список сотрудников
        const newEmployee = ref({
            name: "",
            position: "",
            department: "",
        });

        // Загрузка сотрудников из localStorage
        const loadEmployees = () => {
            const storedEmployees = localStorage.getItem("employees");
            if (storedEmployees) {
                employees.value = JSON.parse(storedEmployees);
            }
        };

        // Сохранение сотрудников в localStorage
        const saveEmployees = () => {
            localStorage.setItem("employees", JSON.stringify(employees.value));
        };

        // Добавление нового сотрудника
        const addEmployee = () => {
            if (!newEmployee.value.name || !newEmployee.value.position || !newEmployee.value.department) {
                alert("Пожалуйста, заполните все поля.");
                return;
            }
            const employee = {
                id: Date.now(), // Уникальный ID
                ...newEmployee.value,
            };
            employees.value.push(employee);
            saveEmployees(); // Сохранение в localStorage
            newEmployee.value = { name: "", position: "", department: "" }; // Сброс формы
            isOpen.value = false; // Закрытие модального окна
        };

        // Удаление сотрудника
        const deleteEmployee = (id) => {
            employees.value = employees.value.filter((employee) => employee.id !== id);
            saveEmployees(); // Сохранение изменений в localStorage
        };

        // Загрузка сотрудников при монтировании
        loadEmployees();

        return {
            isAdmin,
            isOpen,
            employees,
            newEmployee,
            addEmployee,
            deleteEmployee,
            searchQuery: ref(""),
            selectedPositions: ref([]),
            selectedDepartments: ref([]),
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

            if (this.selectedDepartments.length > 0) {
                filtered = filtered.filter((employee) =>
                    this.selectedDepartments.includes(employee.department)
                );
            }

            if (this.searchQuery) {
                const searchTerm = this.searchQuery.toLowerCase();
                filtered = filtered.filter(
                    (employee) =>
                        employee.name.toLowerCase().includes(searchTerm) ||
                        employee.position.toLowerCase().includes(searchTerm) ||
                        employee.department.toLowerCase().includes(searchTerm)
                );
            }

            return filtered;
        },
    },
};
</script>

<style scoped>
/* Общий контейнер */
.employees-container {
    display: flex;
    max-width: 1200px;
    margin: 0 auto;
    padding: 20px;
    padding-top: 100px; /* Отступ под шапку */
}

.text{
    margin-bottom: 40px;
}

/* Фильтры */
.filters-container {
    padding-left: 20px;
    width: 250px;
    flex-shrink: 0;
    padding-right: 20px;
    border-right: 1px solid #ccc;
}

.filters-header {
    margin-bottom: 10px;
}

.filters details {
    margin-bottom: 15px;
}

.filters ul {
    list-style: none;
    padding: 0;
}

.filters li {
    margin-bottom: 5px;
}

/* Основной контент */
.main-content {
    flex-grow: 1;
    padding-left: 20px;
}

/* Строка поиска */
.search-container {
    margin-bottom: 20px;
    display: flex;
    justify-content: center;
}

.search-input {
    width: 100%;
    max-width: 400px;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
    box-sizing: border-box;
}

/* Список сотрудников */
.employees-list ul {
    list-style: none;
    padding: 0;
}

.employees-list li {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 8px;
    border-bottom: 1px solid #eee;
}

.employees-list li button {
    background-color: #0079C2;
    color: white;
    border: none;
    border-radius: 4px;
    padding: 5px 10px;
    cursor: pointer;
}

.employees-list li button:hover {
    background-color: #C0C0C0;
}

/* Кнопка администратора */
.add-employee-btn {
    position: fixed;
    bottom: 30px;
    right: 30px;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background: #0079C2;
    color: white;
    border: none;
    font-size: 24px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
    z-index: 100;
}

.add-employee-btn:hover {
    background: #0079C2;
}

/* Модальное окно */
.modal {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
}

.modal-content {
    background: white;
    padding: 20px;
    border-radius: 8px;
    width: 90%;
    max-width: 400px;
}

.form-group {
    margin-bottom: 15px;
}

.form-group label {
    display: block;
    margin-bottom: 5px;
}

.form-group input {
    width: 100%;
    padding: 8px;
    border: 1px solid #ddd;
    border-radius: 4px;
}

.actions {
    display: flex;
    justify-content: flex-end;
    gap: 10px;
}

.actions button {
    padding: 8px 15px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
}

.actions button:first-child {
    background: #0079C2;
    color: white;
}

.actions button:last-child {
    background: #f44336;
    color: white;
}

.actions button:hover:first-child {
    background: #006fb4;
}

.actions button:hover:last-child {
    background: #d32f2f;
}
</style>