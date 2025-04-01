<template>
  <div class="app">
    <PageHeader />
    <RouterView v-slot="{ Component }">
      <transition name="fade" mode="out-in">
        <component :is="Component" />
      </transition>
    </RouterView>
  </div>
</template>

<script>
import PageHeader from "@/components/PageHeader.vue";

export default {
  name: 'App',
  components: {
    PageHeader,
  },
}
</script>

<style>
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.6s; 
}

.fade-enter {
  opacity: 0;
}

.fade-leave-to {
  opacity: 0;
}
</style>
