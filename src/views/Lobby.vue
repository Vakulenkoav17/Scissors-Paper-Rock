<template>
  <div class="container">
    <header>
      <h1>Добро пожаловать в лобби</h1>
    </header>

    <section class="lobby-section">
      <div class="lobby-column">
        <div class="columnHeader">
          <h2>Ваш профиль</h2>
        </div>
        <div class="main_yourself_profile-block">
          <div class="main_yourself_profile-block-header">
            <img
              class="yourself_profile-avatar"
              src="../assets/img/avatar.png"
              alt="Аватар игрока"
            />
            <h2 class="yourself_profile-name">{{ login }}</h2>
          </div>
          <div class="yourself_profile_statistics-block">
            <h3 class="statistics-header">Статистика</h3>
            <div class="statistic-items">
              <p class="win">Победы: {{ victories }}</p>
              <p class="loose">Поражения: {{ defeats }}</p>
            </div>
          </div>
        </div>
      </div>
      <div class="lobby-column">
        <div class="columnHeader">
          <h2>Возможные соперники</h2>
        </div>
        <div class="opponents-scroll-container" v-if="opponents.length">
          <div
            class="main_opponent_profile-block"
            v-for="opponent in opponents"
            :key="opponent.id"
          >
            <div class="main_opponent_profile-block-header">
              <h3 class="opponent_profile-name">
                {{ opponent.login }}
              </h3>
            </div>
            <div class="opponent_profile_statistics-block">
              <h3 class="statistics-header">Статистика противника</h3>
              <div class="statistic-items">
                <span class="win">Победы : {{ opponent.wins }}</span>
                <span class="loose">Поражения : {{ opponent.loses }}</span>
              </div>
            </div>
          </div>
        </div>
        <div v-else class="standBy_lds-hourglass"></div>
      </div>
    </section>      <button class="play-button" @click="play">Играть</button>

  </div>
</template>

<script>
export default {
  data() {
    return {
      login: ``,
      victories: 0,
      defeats: 0,
      opponents: [],
    };
  },
  beforeMount() {
    this.$store.dispatch("fetchUserStatistics").then((data) => {
      this.login = this.$store.state.userData.login;
      this.victories = this.$store.state.userData.victories;
      this.defeats = this.$store.state.userData.defeats;
      const opponentKeys = Object.keys(data.list);
      opponentKeys.forEach((key) => {
        const opponent = data.list[key];
        this.opponents.push(opponent);
      });

      this.opponents = this.opponents.filter((opponent) => !opponent.you);
    });
  },
  computed: {},
  methods: {
    play() {
      this.$store.dispatch("gameStart");

      this.$router.push("/waiting");
    },
  },
};
</script>

<style scoped>
.lobby-section {
  display: flex;
  justify-content: space-around;
  padding: 20px;
}

.lobby-column {
  display: flex;
  padding: 40px;
  flex-direction: column;
  align-items: center;
}

.play-button {
  display: block;
  margin: 0px auto;
  padding: 10px 20px;
  background-color: #ffa500;
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 30px;
  cursor: pointer;
}
.opponents-scroll-container {
  height: 330px;
  overflow-y: hidden;
}

@media (max-width: 768px) {
  header {
display: none;  }
  h2 {
    font-size: 25px;
    margin-bottom: 10px;
  }

  .lobby-section {
    height: 81%;
    padding-top: 40px;
    display: block;


  }

  .lobby-column {
    padding: 10px;
  }

  .main_yourself_profile-block {
    width: 350px;
    border: 2px solid;
    border-radius: 15px;
    background: antiquewhite;
    margin-top: 20px;
  }
  .statistics-header {
    display: none;
  }
  .yourself_profile-avatar {
    max-height: 40px;
  }
  .opponents-scroll-container {
    height: 260px;
    overflow-y: auto;

  }
  .opponent_profile_statistics-block {
    margin-bottom: 20px;
    margin-top: 0;
  }
  .main_opponent_profile-block-header {
    margin-top: 5px
  }
}
</style>
