import { defineStore } from 'pinia'

export const useCalendarStore = defineStore('calendar', {
  state: () => ({
    events: []
  }),
  actions: {
    addEvent(event) {
      this.events.push(event)
    },
    removeEvent(eventId) {
      this.events = this.events.filter(e => e.id !== eventId)
    }
  }
})