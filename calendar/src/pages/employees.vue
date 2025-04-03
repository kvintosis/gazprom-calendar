<template>
    <div class="cont">
        <div class="vertical-line"></div>
        <h2 class="filters-header">Фильтры</h2>
        <div class="filters">
            <h3>— Должность</h3>
            <ul>
                <li>
                    <div class="form-check">
                        <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault">
                        <label class="form-check-label" for="flexCheckDefault">
                            Инженер
                        </label>
                    </div>
                </li>
                <li>
                    <div class="form-check">
                        <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault">
                        <label class="form-check-label" for="flexCheckDefault">
                            Оператор
                        </label>
                    </div>
                </li>
                <li>
                    <div class="form-check">
                        <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault">
                        <label class="form-check-label" for="flexCheckDefault">
                            Сварщик
                        </label>
                    </div>
                </li>
            </ul>
            
            <h3>— Отдел</h3>
            <ul>
                <li>
                    <div class="form-check">
                        <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault">
                        <label class="form-check-label" for="flexCheckDefault">
                            Отдел охраны
                        </label>
                    </div>
                </li>
                <li>
                    <div class="form-check">
                        <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault">
                        <label class="form-check-label" for="flexCheckDefault">
                            Диспетчерская
                        </label>
                    </div>
                </li>
                <li>
                    <div class="form-check">
                        <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault">
                        <label class="form-check-label" for="flexCheckDefault">
                            Отдел капитального строительства
                        </label>
                    </div>
                </li>
            </ul>
        </div>
        <div class="search-container">
            <input type="text" v-model="searchQuery" placeholder="Поиск сотрудников" class="search-input">
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
    font-family: "helioscond";
    margin-left: 450px; 
    margin-top: -300px; 
}

.search-input {
    width: 300px;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 4px; 
    margin-bottom: 20px; 
}
</style>