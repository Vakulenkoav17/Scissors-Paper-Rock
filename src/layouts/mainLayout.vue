<template>
  <div class="main-layout">
    <LogoutButton v-if="this.$route.path !== '/'" />

    <router-view></router-view>
  </div>
</template>

<script>
import LogoutButton from "@/UIcomponents/LogoutButton.vue";
import LogoutTimer from "@/UIcomponents/LogoutTimer.vue";

export default {
  components: {
    LogoutButton,
    LogoutTimer,
  },
};
</script>

<style>
.main-layout {
  width: 100%;
  height: 100vh;
  background: linear-gradient(to right, #1d1d1dd1, #ffffff);
  overflow-y: hidden;
}
@media (max-width: 767px) {
  

}
</style>
