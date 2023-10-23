<template>
  <div class="main">
    <div class="standBy_main_opponent_profile-block bigEntrance">
      <div class="main_opponent_profile-block-header">
        <img class="opponent_profile-avatar" src="../assets/img/avatar.png" />
        <h1 class="opponent_profile-name text-style">{{ login }}</h1>
      </div>
      <div class="opponent_profile_statistics-block">
        <h2 class="statistics-header text-style">Ваша статистика</h2>
        <div class="statistic-items">
          <h3 class="win text-style">Побед:{{ victories }}</h3>
          <h3 class="loose text-style">Поражений:{{ defeats }}</h3>
        </div>
      </div>
    </div>
    <div class="undercard">
      <h1 class="undercard_text text-style">
        Ожидаем подключение соперника...
      </h1>
      <div class="standBy_lds-hourglass"></div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      login: this.$store.state.userData.login,
      victories: this.$store.state.userData.victories,
      defeats: this.$store.state.userData.defeats,
    };
  },
  mounted() {
    const checkOpponentConnection = async () => {
      await this.$store.dispatch("fetchGameStatus");
    };

    this.intervalId = setInterval(checkOpponentConnection, 1800);
  },
  beforeUnmount() {
    clearInterval(this.intervalId);
  },
  computed: {
    gameStatus() {
      return this.$store.state.userData.gameStatus; 
    },
  },
  watch: {
    gameStatus(newStatus) {
      if (newStatus === "waiting-for-your-move") {
        this.$router.push("/game"); 
      }
    },
  },
};
</script>

<style scoped>
@media (max-width: 767px) {
  .main_opponent_profile-block-header {
    text-align: center; 
  }

  .statistics-header {
    font-size: 1.5em; 
  }

  .statistic-items {
    display: flex; 
    flex-direction: row; 
    justify-content: space-around; 
  }

  .win, .loose {
    font-size: 1.2em; 
  }
  .standBy_main_opponent_profile-block {
    margin: 70px 10px 20px 10px;
    width: 90%;
    border: 2px solid;
    border-radius: 15px;
    background: antiquewhite;
}
}

</style>