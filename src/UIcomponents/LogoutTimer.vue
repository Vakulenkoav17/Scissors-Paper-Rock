<template>
    <div>
      <p v-if="showTimer">Осталось времени: {{ localTimeLeft }} сек</p>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      timeLeft: Number,
    },
    data() {
      return {
        localTimeLeft: this.timeLeft,
        timer: null,
        showTimer: false, 
      };
    },
    watch: {
      timeLeft(newValue) {
        if (newValue > 0) {
          this.showTimer = true;
        } else {
          this.showTimer = false;
          this.localTimeLeft = newValue; 
          clearInterval(this.timer); 
        }
      },
    },
    mounted() {
      
      if (this.timeLeft > 0) {
        this.startTimer();
        this.showTimer = true;
      }
    },
    methods: {
      startTimer() {
        this.timer = setInterval(() => {
          if (this.localTimeLeft > 0) {
            this.localTimeLeft--;
          } else {
            clearInterval(this.timer);
          }
        }, 1000);
      },
    },
  };
  </script>
  