<template>
  <div class="round-result-field">
    <div class="round-result-wrapper bigEntrance">
      <div class="round-result-window">
        <div class="result-declaration">
          <h1 class="title">
            <span class="match-result">{{
              getResult(matchResult, playerMove)
            }}</span>
          </h1>
          <p class="comment">{{ getComment(matchResult, playerMove) }}</p>
          <div></div>
          <p class="offer">Играем еще?</p>
        </div>
        <div></div>
        <div class="btns-block">
          <button @click="toWaitScreen" class="button ok-button">Ok</button
          ><button @click="toLobby" class="button no-button">No!!!</button>
        </div>
      </div>
      <div class="round-result-frame"></div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    matchResult: "",
    playerMove: String,
  },
  data() {
    return {
      matchResults: {
        win: "Победа",
        lose: "Фиаско",
      },
      loseMessages: {
        rock: "Противник завернул ваш камушек в бумагу!",
        paper: "Ножницы разрезают ваш лист бумаги! Не повезло!",
        scissors: "Вы извлекли ножницы, но противник заготовил камень! Увы!",
      },
      winMessages: {
        rock: "Камнем по ножницам! Это был удачный ход!",
        paper:
          "Что может камень противника против вашего бумажного листа?! Ничего!",
        scissors: "Ножницами вы орудуете умело! Лист противника разрезан!",
      },
    };
  },

  methods: {
    getComment(matchResult, playerMove) {
      if (matchResult === "win") {
        return this.winMessages[playerMove];
      } else if (matchResult === "lose") {
        return this.loseMessages[playerMove];
      }
    },
    getResult(matchResult, playerMove) {
      if (matchResult === "win") {
        return this.matchResults[matchResult];
      } else if (matchResult === "lose") {
        return this.matchResults[matchResult];
      }
    },
    async toLobby() {
      await this.$store.commit("clearGameData");
      this.$router.push("/lobby");
    },
    async toWaitScreen() {
      await this.$store.commit("clearGameData");
      this.$store.dispatch("gameStart");
      this.$router.push("/waiting");
    },
  },
};
</script>

<style scoped>
@media  (max-width: 767px){
  .round-result-frame {
    width: 370px;
    height: 277px;
  }
}
</style>