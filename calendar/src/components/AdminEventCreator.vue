<template>
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
            <label>Дата</label>
            <input v-model="newEvent.date" type="date">
          </div>
          
          <div class="form-group">
            <label>Время</label>
            <input v-model="newEvent.time" type="time">
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
  </template>
  
  <script setup>
  import { ref } from 'vue'
  import { useCalendarStore } from '@/stores/calendarStore'
  
  const calendarStore = useCalendarStore()
  const isOpen = ref(false)
  
  const newEvent = ref({
    title: '',
    date: new Date().toISOString().split('T')[0],
    time: '12:00',
    description: ''
  })
  
  const saveEvent = () => {
    const eventToAdd = {
      ...newEvent.value,
      id: Date.now(),
      dateTime: `${newEvent.value.date}T${newEvent.value.time}`
    }
    
    calendarStore.addEvent(eventToAdd)
    isOpen.value = false
    resetForm()
  }
  
  const resetForm = () => {
    newEvent.value = {
      title: '',
      date: new Date().toISOString().split('T')[0],
      time: '12:00',
      description: ''
    }
  }
  </script>
  
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