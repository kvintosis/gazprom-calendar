<template>
    <div>
      <div v-if="events.length > 0" class="container">
        <div class="row event-header">
          <div class="col-3 name">Название</div>
          <div class="col-5 description">Описание</div>
          <div class="col-2 date">Дата</div>
          <div class="col-2 location">Место</div>
        </div>
        <div v-for="event in events" :key="event.id" class="row event-item">
          <div class="col-3 project-name">{{ event.name }}</div>
          <div class="col-5 project-description">{{ event.description }}</div>
          <div class="col-2 project-date">{{ event.date }}</div>
          <div class="col-2 project-location">{{ event.location }}</div>
        </div>
      </div>
      <p v-else>Нет доступных мероприятий.</p>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        events: [],
      };
    },
    mounted() {
      this.loadEvents();
    },
    methods: {
      async loadEvents() {
        setTimeout(() => {
          this.events = [
            { id: 1, name: 'Тут название', description: 'Тут описание', date: '29.05.2024', location: 'Ленина 46' },
            { id: 2, name: 'Тут название', description: 'Тут описание', date: '24.05.2024', location: 'Ленина 40' },
          ];
        }, 200);
      },
    },
  };
  </script>
  
  <style scoped>
  .event-header {
    border-top: 1px solid #ccc;
    border-bottom: 1px solid #ccc;
    align-items: center;
  }
  
  .event-item {
    align-items: center;
    margin-top: 5px;
    margin-bottom: 5px;
  }
  </style>