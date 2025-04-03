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

    <div class="calendar-note">
      Если вы планируете посетить мероприятие, отметьте его галочкой
    </div>

  </div>
</template>

<script>
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
    }
  },
};
</script>

<style scoped>
.week-view {
  font-family: Arial, sans-serif;
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