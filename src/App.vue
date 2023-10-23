<template>
  <component :is = 'layout'>
    <router-view />
  </component>
</template>

<script>
import mainLayout from "@/layouts/mainLayout.vue"
import gameInLayout from "@/layouts/gameInLayout.vue"

export default {
  computed: {
    layout() {
      return this.$route.meta.layout || 'mainLayout'
    },
  },
  components:{mainLayout, gameInLayout}
};
</script>

<style>
  @import '../styles.css';
</style>