<template>
    <div class="week-view">
      <div class="week-header">
        <div v-for="day in daysOfWeek" :key="day.date" class="day-header">
          {{ day.dayName }}<br />
          {{ day.date.toLocaleDateString("ru-RU", { day: "numeric", month: "long" }) }}
          <span v-if="day.isHoliday" class="holiday-icon">🎂</span>
        </div>
      </div>
  
      <div class="week-body">
        <div v-for="day in daysOfWeek" :key="day.date" class="day-column">
          <div v-for="event in getEventsForDay(day.date)" :key="event.time" class="event">
            {{ event.time }}<br />
            {{ event.team }}
            <div class="controls">
              <input type="checkbox" /> ✗
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import { format } from 'date-fns'; // Импортируем форматирование дат
  
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
      daysOfWeek() {
        const start = this.week.startDate;
        const end = this.week.endDate;
        const days = [];
        let currentDate = new Date(start);
  
        while (currentDate <= end) {
          days.push({
            date: new Date(currentDate),
            dayName: this.getDayName(currentDate),
            isHoliday: this.isHoliday(currentDate), // Логика определения праздников
          });
          currentDate.setDate(currentDate.getDate() + 1);
        }
  
        return days;
      },
    },
    methods: {
      getEventsForDay(date) {
        return this.events.filter((event) => event.date.toDateString() === date.toDateString());
      },
      getDayName(date) {
        const days = ["Вс", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб"];
        return days[date.getDay()];
      },
      isHoliday(date) {
        // Здесь можно добавить логику определения праздников
        return false; // По умолчанию нет праздников
      },
    },
  };
  </script>
  
  <style scoped>
  .week-view {
    display: flex;
    flex-direction: column;
    gap: 16px;
  }
  
  .week-header {
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    gap: 8px;
  }
  
  .day-header {
    text-align: center;
    font-weight: bold;
  }
  
  .holiday-icon {
    color: orange;
  }
  
  .week-body {
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    gap: 8px;
  }
  
  .day-column {
    border: 1px solid #ccc;
    padding: 8px;
  }
  
  .event {
    padding: 8px;
    margin-bottom: 8px;
    background-color: #e0e0ff;
    border-radius: 4px;
  }
  
  .controls {
    display: flex;
    justify-content: flex-end;
  }
  </style>