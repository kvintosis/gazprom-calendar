<template> 
  <div class="calendar-container">
    <WeekSlider 
      :weeks="weeks" 
      :currentWeekIndex="currentWeekIndex" 
      @change-week="onChangeWeek" 
    />

    <WeekView 
      :week="currentWeek" 
      :events="filteredEvents" 
    />
  </div>
</template>

<script>
import WeekSlider from "@/components/WeekSlider.vue";
import WeekView from "@/components/WeekView.vue";
import { generateWeeks } from "@/utilts/weekGenerator";

export default {
  components: {
    WeekSlider,
    WeekView,
  },
  data() {
    // Начинаем с 17 марта 2025 года как в примере
    const startDate = new Date(2025, 2, 17); // Месяцы в JS: 0-11
    return {
      weeks: generateWeeks(startDate, 6), // Генерируем 6 недель
      currentWeekIndex: 3, // Начинаем с 5 недели (7 апреля)
      events: [
        {
          date: new Date(2025, 3, 7), // 7 апреля
          time: "10:00 - 12:00",
          team: "Команда 1",
        },
        {
          date: new Date(2025, 3, 7), // 7 апреля
          time: "11:00 - 12:00",
          team: "Команда 2",
        },
        {
          date: new Date(2025, 3, 9), // 9 апреля
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
    // Фильтруем события для текущей недели
    filteredEvents() {
      return this.events.filter(event => {
        const eventDate = new Date(event.date);
        return eventDate >= this.currentWeek.startDate && 
               eventDate < this.currentWeek.endDate;
      });
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
.calendar-container {
  max-width: 1200px;
  margin-top: 100px;
  margin-left: auto;
  margin-right: auto;
  padding: 20px;
}
</style>