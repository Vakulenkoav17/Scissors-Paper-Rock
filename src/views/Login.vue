<template>
  <header class="header_login"></header>
  <div class="container">
    <div class="main">
      <h1 class="title">
        <span class="rock-text"> Камень </span>
        <span class="scissors-text"> Ножницы </span>
        <span class="paper-text"> Бумага </span>
      </h1>
      <figure class="title-image">
        <div class="rock-image"></div>
        <div class="scissors-image"></div>
        <div class="paper-image"></div>
      </figure>
      <figure class="login">
        <input
          type="text"
          class="login login-input"
          placeholder="Введите имя"
          v-model="loginValue"
        />
        <button class="login login-button" @click="login">Войти</button>
      </figure>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
export default {
  data() {
    return {
      loginValue: "",
    };
  },
  methods: {
    ...mapActions(['fetchUserToken']),

    async login() {
  if (this.loginValue && this.loginValue.length <= 10) { 
    await this.fetchUserToken(this.loginValue);
    await this.$router.push("/lobby");
  } else {
    alert("Имя должно быть не более 10 символов.");
  }
}

  },
};
</script>

<style scoped>

@media (max-width: 480px) {
  .title {
    font-size: 30px;
  }

  .rock-image,
  .scissors-image,
  .paper-image {
    width: 120px;
    height: 120px;
  }
}

@media (max-width: 480px) and (orientation: landscape) {
  .title {
    font-size: 40px;
  }
}

@media (max-width: 480px) and (orientation: portrait) {
  .title {
    font-size: 40px;
    display: flex;
    flex-direction: column;
  }
}

</style>