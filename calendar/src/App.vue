<template>
  <div class="app">
    <PageHeader />
    <RouterView v-slot="{ Component }">
      <transition name="fade" mode="out-in">
        <component :is="Component" />
      </transition>
    </RouterView>

    <!-- <LoginPopup v-if="!isAuthencated"/> -->
  </div>
</template>

<script>
import PageHeader from "@/components/PageHeader.vue";
import LoginPopup from "@/components/LoginPopUp.vue";
import { mapGetters } from 'vuex';

export default {
  name: 'App',
  components: {
    PageHeader,
    LoginPopup
  },

  computed: {
 ...mapGetters(['isAuthenticated']) 
  }
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
