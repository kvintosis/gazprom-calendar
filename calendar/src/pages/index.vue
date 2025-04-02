<template>
    <div class="calendar">
      <WeekSlider :weeks="weeks" :currentWeekIndex="currentWeekIndex" @change-week="onChangeWeek" />
  
      <WeekView :week="currentWeek" :events="events" />
    </div>
  </template>
  
  <script>
  import WeekSlider from "@/components/WeekSlider.vue";
  import WeekView from "@/components/WeekView.vue";
  import { generateWeeks } from "@/utilts/weekGenerator"; // Импортируем функцию для генерации недель
  
  export default {
    components: {
      WeekSlider,
      WeekView,
    },
    data() {
      return {
        weeks: generateWeeks(new Date(), 52), // Генерируем 52 недели от текущей даты
        currentWeekIndex: 0, // Начальная неделя
        events: [
          {
            date: new Date("2025-04-08"), // Среда, 9 апреля
            time: "10:00 - 12:00",
            team: "Команда 1",
          },
          {
            date: new Date("2025-04-08"), // Среда, 9 апреля
            time: "11:00 - 12:00",
            team: "Команда 2",
          },
          {
            date: new Date("2025-04-10"), // Четверг, 10 апреля
            time: "9:00 - 11:00",
            team: "Команда 2",
          },
        ],
      };
    },
    computed: {
      currentWeek() {
        return this.weeks[this.currentWeekIndex];
      },
    },
    methods: {
      onChangeWeek(index) {
        this.currentWeekIndex = index;
      },
    },
  };
  </script>
  
  <style scoped>
  .calendar {
    display: flex;
    flex-direction: column;
    gap: 16px;
  }
  </style>