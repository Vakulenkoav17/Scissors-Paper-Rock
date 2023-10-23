import { createStore } from "vuex";

export default createStore({
  state: {
    apiUrl: "https://skypro-rock-scissors-paper.herokuapp.com",

    userData: {
      login: "",
      victories: 0,
      defeats: 1,
      token: null,
      gameId: null,
      status: "",
      gameStatus: "",
    },
    enemyData: {
      login: "",
      wins: 0,
      loses: 0,
      rocks: 0,
      scissors: 0,
      papers: 0,
    },
  },
  getters: {
    isLoggedIn: (state) => {
      return !!state.userData.token;
    },
  },
  mutations: {
    setUserData(state) {
      state.userData.token = localStorage.getItem("userToken").replace(/"/);
      state.userData.login = localStorage.getItem("userLogin").replace(/"/);
    },
    setUserStatistics(state, player) {
      state.userData.victories = player.wins;
      state.userData.defeats = player.loses;
    },
    setEnemyData(state, enemy) {
      state.enemyData.login = enemy.login;

      state.enemyData.victories = enemy.wins;
      state.userData.defeats = enemy.loses;
    },
    setGameStatus(state, data) {
      state.userData.gameStatus = data;
    },
    setGame(state, data) {
      state.userData.gameId = data["player-status"]["game"].id;
      state.userData.status = data["player-status"].status;
    },
    clearGameData(state) {
      state.userData.gameStatus = null;
      state.userData.gameId = null;
      state.userData.status = "lobby";
    },
    clearUserData(state) {
      state.userData = {
        login: "",
        victories: 0,
        defeats: 0,
        token: null,
        gameId: null,
        status: "",
        gameStatus: "",
      };
      localStorage.setItem("userLogin", "");
      localStorage.setItem("userToken", "");
    },
  },
  actions: {
    async fetchUserToken(context, loginValue) {
      const url = `${context.state.apiUrl}/login?login=${loginValue}`;

      try {
        const response = await fetch(url);
        if (response.ok) {
          const data = await response.json();
          localStorage.setItem("userToken", data.token);
          localStorage.setItem("userLogin", loginValue);
          context.commit("setUserData");

          return data;
        }
      } catch (error) {
        console.error("Ошибка при отправке запроса:", error);
      }
    },
    async fetchUserStatistics(context) {
      context.commit("setUserData");
      const url = `${context.state.apiUrl}/player-list?token=${context.state.userData.token}`;
      try {
        const response = await fetch(url);
        if (response.ok) {
          const data = await response.json();
          const player = data.list.find((p) => p.you);
          if (player) {
            context.commit("setUserStatistics", player);
          }
          return data;
        }
      } catch (error) {
        console.error("Ошибка при отправке запроса:", error);
      }
    },
    async fetchGameStatus(context) {
      const url = `${context.state.apiUrl}/game-status?token=${context.state.userData.token}&id=${context.state.userData.gameId}`;
      try {
        const response = await fetch(url);
        if (response.status === 200) {
          const data = await response.json();
          const gameStatus = data["game-status"];

          if (gameStatus) {
            context.commit("setGameStatus", gameStatus.status);
            if (gameStatus.enemy) {
              context.commit("setEnemyData", gameStatus.enemy);
            }
          } else {
            await context.dispatch("logout");
          }
        }
      } catch (error) {
        throw await context.dispatch("logout");
      }
    },

    async gameStart(context) {
      const url = `${context.state.apiUrl}/start?token=${context.state.userData.token}`;
      try {
        const response = await fetch(url);
        if (response.ok) {
          const data = await response.json();
          if (data) {
            context.commit("setGame", data);
          }
        }
      } catch (error) {
        await context.dispatch("logout");
        console.error("Ошибка при отправке запроса:", error);
      }
    },

    async sendMove(context, move) {
      const url = `${context.state.apiUrl}/play?token=${context.state.userData.token}&id=${context.state.userData.gameId}&move=${move}`;
      try {
        const response = await fetch(url);

        if (response.ok) {
          let data = await response.json();

          context.commit("setGameStatus", data["game-status"].status);
        }
      } catch (error) {
        console.error("Ошибка при отправке запроса:", error);
      }
    },
    async logout(context) {
      const url = `${context.state.apiUrl}/logout?token=${context.state.userData.token}`;
      try {
        const response = await fetch(url);
        if (response.status === 200) {
          context.commit("clearUserData");
        }
      } catch (error) {
        console.error("Ошибка при выходе:", error);
      }
    },
  },
});
