<template>
  <div class="week-view">
    <!-- Заголовок с днями недели -->
    <div class="week-header">
      <div v-for="day in daysOfWeek" :key="day.date" class="day-header">
        <div class="day-name">{{ day.dayName }},</div>
        <div class="day-date">{{ formatRussianDate(day.date) }}</div>
      </div>
    </div>

    <!-- Тело календаря с событиями -->
    <div class="week-body">
      <div v-for="day in daysOfWeek" :key="day.date" class="day-column">
        <div 
          v-for="event in getEventsForDay(day.date)" 
          :key="`${event.time}-${event.team}`" 
          class="event"
        >
          <div class="event-time">{{ event.time }}</div>
          <div class="event-team">{{ event.team }}</div>
          <div class="controls">
            <input 
              type="checkbox" 
              v-model="event.checked" 
              @change="saveCheckboxState(event)"
              class="event-checkbox"
            />
          </div>
        </div>
      </div>
    </div>

    <!-- Админ панель (форма) -->
    <div class="admin_panel" v-if="isAdmin">
      Админ-панель
      <div class="admin-event-creator">
        <button class="add-event-btn" @click="isOpen = true">
          <span>+</span>
        </button>
        <div v-if="isOpen" class="modal">
          <div class="modal-content">
            <h3>Добавить событие</h3>
            
            <div class="form-group">
              <label>Название</label>
              <input v-model="newEvent.title" type="text">
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
              <label>Дата</label>
              <input v-model="newEvent.date" type="date">
            </div>
            
            <div class="form-group">
              <label>Время начала мероприятия</label>
              <input v-model="newEvent.start_time" type="time" id="start_time">
            </div>

            <div class="form-group">
              <label>Время окончания мероприятия</label>
              <input v-model="newEvent.end_time" type="time" id="end_time">
            </div>
            
            <div class="form-group">
              <label>Описание</label>
              <textarea v-model="newEvent.description"></textarea>
            </div>
            
            <div class="actions">
              <button @click="saveEvent">Сохранить</button>
              <button @click="isOpen = false">Отмена</button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="calendar-note">
      Если вы планируете посетить мероприятие, отметьте его галочкой
    </div>

    
  </div>
</template>

<script>
import { useAuthStore } from '@/stores/authStore';
import { ref } from 'vue';

export default {
  props: {
    week: {
      type: Object,
      required: true,
    },
    events: {
      type: Array,
      required: true,
    },
  },
  computed: {
    // Получаем дни недели (пн-пт)
    daysOfWeek() {
      const start = this.week.startDate;
      const days = [];
      let currentDate = new Date(start);

      // Только рабочие дни (понедельник-пятница)
      for (let i = 0; i < 5; i++) {
        days.push({
          date: new Date(currentDate),
          dayName: this.getRussianDayName(currentDate),
        });
        currentDate.setDate(currentDate.getDate() + 1);
      }

      return days;
    },
  },
  setup() {
    const authStore = useAuthStore();
    const isOpen = ref(false);
    const newEvent = ref({
      title: '',
      date: '',
      start_time: '',
      end_time: '',
      description: '',
      rank: 'lowest' // Устанавливаем значение по умолчанию для ранга
    });
    return {
      authStore,
      isAdmin: authStore.isAdmin,
      isOpen,
      newEvent,
    }
  },
  methods: {
    // События для конкретного дня
    getEventsForDay(date) {
      return this.events.filter(event => 
        event.date.toDateString() === date.toDateString()
      ).sort((a, b) => a.time.localeCompare(b.time));
    },
    
    // Название дня недели на русском
    getRussianDayName(date) {
      const days = ["вс", "пн", "вт", "ср", "чт", "пт", "сб"];
      return days[date.getDay()];
    },
    
    // Форматирование даты на русском
    formatRussianDate(date) {
      return date.toLocaleDateString("ru-RU", { 
        day: "numeric", 
        month: "long" 
      });
    },


    // Форматирование времени в 24-часовом формате
    formatTime(time) {
      return time; 
    },

    saveEvent() {
      // Проверка на ввод данных
      if (!this.newEvent.title || !this.newEvent.date || !this.newEvent.start_time || !this.newEvent.end_time) {
        alert("Пожалуйста, заполните все обязательные поля.");
        return;
      }

      // Добавление нового события в массив events
      this.events.push({
        title: this.newEvent.title,
        date: new Date(this.newEvent.date), // Преобразуем строку даты в объект Date
        start_time: this.newEvent.start_time,
        end_time: this.newEvent.end_time,
        description: this.newEvent.description,
        rank: this.newEvent.rank,
      });
      
      this.isOpen = false;

      // Сброс формы
      this.newEvent = {
        title: '',
        date: '',
        start_time: '',
        end_time: '',
        description: '',
        rank: '',
      }; 
    }
  },
};
</script>

<style scoped>
.week-view {
  max-width: 100%;
}

.week-header {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 8px;
  margin-bottom: 10px;
}

.day-header {
  text-align: center;
  padding: 8px;
  border-bottom: 2px solid #eee;
}

.day-name {
  font-weight: bold;
  text-transform: lowercase;
}

.day-date {
  font-size: 0.9em;
  color: #555;
}

.week-body {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 8px;
}

.day-column {
  min-height: 150px;
  border: 1px solid #e0e0e0;
  border-radius: 4px;
  padding: 8px;
}

.event {
  background-color: #f8f9fa;
  border-left: 3px solid #4285f4;
  border-radius: 4px;
  padding: 8px;
  margin-bottom: 8px;
  font-size: 0.9em;
}

.event-time {
  font-weight: bold;
  color: #333;
  margin-bottom: 4px;
}

.event-team {
  color: #555;
  margin-bottom: 6px;
}

.event-controls {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 8px;
}

.event-checkbox {
  cursor: pointer;
}

.event-delete {
  cursor: pointer;
  color: #f44336;
  font-weight: bold;
}

.calendar-note {
  margin-top: 20px;
  text-align: center;
  font-style: italic;
  color: #666;
  font-size: 0.9em;
}

</style>

<style lang="less">
  @primary-color: #42b983;
  @modal-bg: rgba(0,0,0,0.5);
  
  .admin-event-creator {
    .add-event-btn {
      position: fixed;
      bottom: 30px;
      right: 30px;
      width: 50px;
      height: 50px;
      border-radius: 50%;
      background: @primary-color;
      color: white;
      border: none;
      font-size: 24px;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: 0 2px 10px rgba(0,0,0,0.2);
      z-index: 100;
    }
  
    .modal {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: @modal-bg;
      display: flex;
      justify-content: center;
      align-items: center;
      z-index: 1000;
  
      .modal-content {
        background: white;
        padding: 20px;
        border-radius: 8px;
        width: 90%;
        max-width: 500px;
  
        .form-group {
          margin-bottom: 15px;
  
          label {
            display: block;
            margin-bottom: 5px;
          }

          select {
            width: 100%;
            padding: 8px;
            display: block;
            border-radius: 4px;
          }
  
          input,
          textarea {
            width: 100%;
            padding: 8px;
            border: 1px solid #ddd;
            border-radius: 4px;
          }
        }
  
        .actions {
          display: flex;
          justify-content: flex-end;
          gap: 10px;
          margin-top: 20px;
  
          button {
            padding: 8px 15px;
            border: none;
            border-radius: 4px;
            cursor: pointer;
  
            &:first-child {
              background: @primary-color;
              color: white;
            }
          }
        }
      }
    }
  }
  </style>