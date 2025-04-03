<template>
  <div class="app">
    <PageHeader />
    <RouterView v-slot="{ Component }">
      <transition name="fade" mode="out-in">
        <component :is="Component" />
      </transition>
    </RouterView>

    <LoginPopUp v-if="authStore.showLoginPopUp && !authStore.isAdmin"/>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useAuthStore } from '@/stores/authStore'
import PageHeader from "@/components/PageHeader.vue"
import LoginPopUp from "@/components/LoginPopUp.vue"

const authStore = useAuthStore()

// Для совместимости с Options API (если нужно)
defineExpose({
  authStore
})
</script>

<style lang="less">
.app {
  position: relative;
  min-height: 100vh;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.6s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}

// Стили для админ-индикатора (если нужно)
.admin-indicator {
  position: fixed;
  bottom: 10px;
  left: 10px;
  background: #42b983;
  color: white;
  padding: 5px 10px;
  border-radius: 4px;
  font-size: 12px;
  z-index: 1000;
}
</style>