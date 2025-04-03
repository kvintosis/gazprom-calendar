<template>
  <div class="week-slider">
    <button 
      @click="onPrevWeek" 
      :disabled="currentWeekIndex === 0"
      class="nav-button"
    >
      ‹
    </button>

    <div class="week-items">
      <div
        v-for="(week, index) in visibleWeeks"
        :key="week.id"
        :class="{ 'active-week': index + startIndex === currentWeekIndex }"
        @click="onChangeWeek(index + startIndex)"
        class="week-item"
      >
        {{ week.label }}
      </div>
    </div>

    <button 
      @click="onNextWeek" 
      :disabled="currentWeekIndex === weeks.length - 1"
      class="nav-button"
    >
      ›
    </button>
  </div>
</template>

<script>
export default {
  props: {
    weeks: {
      type: Array,
      required: true,
    },
    currentWeekIndex: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      visibleCount: 3, // Сколько недель показывать в слайдере
    };
  },
  computed: {
    // Индекс первой отображаемой недели
    startIndex() {
      return Math.max(
        0,
        Math.min(
          this.currentWeekIndex - Math.floor(this.visibleCount / 2),
          this.weeks.length - this.visibleCount
        )
      );
    },
    // Недели для отображения
    visibleWeeks() {
      return this.weeks.slice(
        this.startIndex,
        this.startIndex + this.visibleCount
      );
    },
  },
  emits: ["change-week"],
  methods: {
    onPrevWeek() {
      if (this.currentWeekIndex > 0) {
        this.$emit("change-week", this.currentWeekIndex - 1);
      }
    },
    onNextWeek() {
      if (this.currentWeekIndex < this.weeks.length - 1) {
        this.$emit("change-week", this.currentWeekIndex + 1);
      }
    },
    onChangeWeek(index) {
      this.$emit("change-week", index);
    },
  },
};
</script>

<style scoped>
.week-slider {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 16px;
  padding: 16px 0;
  margin-bottom: 20px;
}

.week-items {
  display: flex;
  gap: 12px;
}

.week-item {
  padding: 10px 16px;
  border: 1px solid #ddd;
  border-radius: 6px;
  cursor: pointer;
  white-space: pre-line;
  text-align: center;
  line-height: 1.3;
  font-size: 0.95em;
  transition: all 0.2s;
}

.week-item:hover {
  background-color: #f5f5f5;
}

.active-week {
  background-color: #4285f4;
  color: white;
  border-color: #4285f4;
}

.active-week:hover {
  color: rgb(255, 255, 255);
  background-color: #71a5f9;
  border-color: #71a5f9;
}

.nav-button {
  padding: 8px 16px;
  border: none;
  border-radius: 6px;
  background-color: #f5f5f5;
  cursor: pointer;
  font-size: 1.2em;
  transition: background-color 0.2s;
}

.nav-button:hover:not(:disabled) {
  background-color: #e0e0e0;
}

.nav-button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
</style>