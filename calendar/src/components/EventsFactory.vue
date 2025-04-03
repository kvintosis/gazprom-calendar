<template>
    <div class="event-creation-form">
        <h2>Создание мероприятия</h2>

        <form @submit.prevent="handleSubmit">
            <div class="form-group">
                <label for="name">Название:</label>
                <input type="text" id="name" v-model="name" required />
            </div>

            <div class="form-group">
                <label for="rank">Ранг/Приоритет:</label>
                <select id="rank" v-model="rank">
                    <option value="lowest">4 - пара человек</option>
                    <option value="low">3 - должна быть команда</option>
                    <option value="medium">2 - должен быть отдел</option>
                    <option value="high">1 - должны быть все</option>
                </select>
            </div>

            <div class="form-group">
                <label for="time">Время:</label>
                <input type="datetime-local" id="time" v-model="time" required />
            </div>

            <div class="form-group">
                <label for="type">Тип:</label>
                <input type="text" id="type" v-model="type" />
            </div>

            <div class="button-group">
                <button type="submit">
                    <span role="img" aria-label="галочка">✔️</span>
                </button>
                <button type="button" @click="handleCancel">
                    <span role="img" aria-label="крестик">❌</span>
                </button>
            </div>
        </form>
    </div>
</template>

<script>
export default {
    data() {
        return {
            name: "",
            rank: "medium",
            time: "",
            type: "",
        };
    },
    methods: {
        handleSubmit() {
            // Здесь будет логика отправки данных
            console.log("Форма отправлена:", {
            name: this.name,
            rank: this.rank,
            time: this.time,
            type: this.type,
            });
            // Очищаем форму после отправки
            this.name = "";
            this.rank = "medium";
            this.time = "";
            this.type = "";
        },
        handleCancel() {
            // Здесь будет логика отмены
            console.log("Форма отменена");
            // Очищаем форму
            this.name = "";
            this.rank = "medium";
            this.time = "";
            this.type = "";
        },
    },
};
</script>

<style scoped>
.event-creation-form {
    font-family: sans-serif;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 5px;
    max-width: 500px;
    margin: 20px auto;
}

.form-group {
    margin-bottom: 15px;
}

label {
    display: block;
    font-weight: bold;
    margin-bottom: 5px;
}

input[type="text"],
input[type="datetime-local"],
select {
    width: 100%;
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 4px;
    box-sizing: border-box;
}

.button-group {
    text-align: right;
}

button {
    padding: 10px 20px;
    margin-left: 10px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 1em;
}

button[type="submit"] {
    background-color: #4caf50;
    color: white;
}

button[type="button"] {
    background-color: #f44336;
    color: white;
}
</style>