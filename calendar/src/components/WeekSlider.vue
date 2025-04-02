<template>
    <div class="week-slider">
      <button @click="onPrevWeek" :disabled="currentWeekIndex === 0"><</button>
  
      <div class="week-items">
        <div
          v-for="(week, index) in weeks"
          :key="week.id"
          :class="{ 'active': index === currentWeekIndex }"
          @click="onChangeWeek(index)"
        >
          {{ week.label }}
        </div>
      </div>
  
      <button @click=" onNextWeek" :disabled="currentWeekIndex === weeks.length - 1">></button>
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
    gap: 16px;
  }
  
  .week-items {
    display: flex;
    gap: 8px;
  }
  
  .week-items div {
    padding: 8px 16px;
    border: 1px solid #ccc;
    border-radius: 4px;
    cursor: pointer;
  }
  
  .week-items div.active {
    background-color: #007bff;
    color: white;
  }
  
  button {
    padding: 8px 16px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    background-color: #007bff;
    color: white;
  }
  
  button:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
  </style>