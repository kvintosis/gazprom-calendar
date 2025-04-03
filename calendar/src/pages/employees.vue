<template>
    <div class="cont">
        <div class="vertical-line"></div>
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
                            <input class="form-check-input" type="checkbox" value="Оператор" id="operator">
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
</template>

<script>
export default {
    data() {
        return {
            searchQuery: '',
            selectedPositions: [],
            selectedDepartment: [],
            employees: []
        };
    },
    methods: {
        fetchEmployees() {
            const filters = {
                positions: this.selectedPositions,
                department: this.selectedDepartment,
                search: this.searchQuery
            };


        }
    }    
}
</script>


<style scoped>
.filters {
    margin-left: 50px;
    font-family: "helioscond";
}
.filters-header {
    margin-top: 100px;
    margin-left: 45px;
    font-family: "helioscond";
}
ul {
    list-style: none;
}

.vertical-line {
    position: absolute;
    top: 80px;
    bottom: 0;
    left: 33%;
    width: 1px;
    background-color: black;
    z-index: 1000;
}

.search-container {
    position: fixed;
    font-family: "helioscond";
    top: 100px;
    left: 450px;
}

summary {
    margin-top: 15px;
    font-size: 22px;
}

.search-input {
    width: 300px;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 4px; 
    margin-bottom: 20px; 
}

details[open] .closed-filter {
    display: none;
}

details[open] .opened-filter {
    display: block;
}



</style>