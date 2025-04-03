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
                    <li v-for="employee in filteredEmployees" :key="employee.id">
                        {{ employee.name }} - {{ employee.position }} - {{ employee.department }}
                    </li>
                </ul>
            </div>
        </div>
  </div>  
</template>

<script>
export default {
    data() {
        return {
            searchQuery: '',
            selectedPositions: [],
            selectedDepartment: [],
            employees: [
                { id: 1, name: "Иван Иванов", position: "Инженер", department: "Отдел охраны" },
                { id: 2, name: "Петр Петров", position: "Оператор", department: "Диспетчерская" },
            ]
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
            employee.name.toLowerCase().includes(searchTerm) ||
            employee.position.toLowerCase().includes(searchTerm) ||
            employee.department.toLowerCase().includes(searchTerm)
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
            fetch('http://localhost:5173/employees', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(filters)
            })
            .then(response => {
                if(!response.ok) {
                    throw new Error('Не удалось ответить на запрос');
                }
                return response.json();
            })
            .then(data => {
                this.employees = data; // Обновление списка сотрудников
            })
        }
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