<template>
  <div>
    <section
      class="main-waitscreen__choicescreen-title"
      :class="{ 'slide-up-fade-out': canPlay === false }"
      v-show="canPlay === true"
    >
      <h2>Твой ход</h2>

      <div class="main-waitscreen__choicescreen-container">
        <button
          class="main-waitscreen__choicescreen-paper choice-button"
          @click="selectMove('paper')"
        >
          <img
            src="../assets/img/paper.jpg"
            alt="paper fighter"
            class="choice-image"
          />
        </button>
        <button
          class="main-waitscreen__choicescreen-rock choice-button"
          @click="selectMove('rock')"
        >
          <img
            src="../assets/img/rock.jpg"
            alt="rock fighter"
            class="choice-image"
          />
        </button>
        <button
          class="main-waitscreen__choicescreen-scissors choice-button"
          @click="selectMove('scissors')"
        >
          <img
            src="../assets/img/scissors.jpg"
            alt="scissors fighter"
            class="choice-image"
          />
        </button>
      </div>
    </section>
    <section class="section-waitsceen">
      <div class="waitscreen_header">
        <h2 class="main-waitscreen__title">Идет великая битва</h2>
      </div>

      <div class="main-waitscreen__gameprocess-container">
        <div class="main-waitscreen__gameprocess-playerzone">
          <p class="main-waitscreen__gameprocess-username">
            {{ $store.state.userData.login }}
          </p>

          <div class="lds-hourglass your-side-spinner" v-if="!move"></div>
          <div v-else :class="[move, 'slideRight1']"></div>
        </div>
        <img
          v-if="!matchResult"
          class="main-waitscreen__versus-image"
          src="../assets/img/versus.png"
          alt="vsimage"
        />
        <PopUp v-else :matchResult="matchResult" :playerMove="move" />
        <div class="main-waitscreen__gameprocess-playerzone">
          <p class="main-waitscreen__gameprocess-username">
            {{ $store.state.enemyData.login }}
          </p>

          <div v-if="!enemyMoved" class="lds-hourglass your-side-spinner"></div>
          <div v-else :class="[calculatedClass, 'slideLeft1']"></div>
          <div class="main-waitscreen__gameprocess-userinfo">
            <div></div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { ref, watch, computed, onUnmounted } from "vue";
import { useStore } from "vuex";
import PopUp from "@/UIcomponents/PopUp.vue";

export default {
  components: {
    PopUp,
  },

  setup() {
    const move = ref("");
    let matchResult = ref("");
    const enemyMoved = ref(false);
    const canPlay = ref(true);
    let calculatedClass = ref("");
    const fetchGameStatusInterval = ref(null);
    let computedGameStatus = computed(() => store.state.userData.gameStatus);

    const store = useStore();
    const selectMove = (selectedMove) => {
      move.value = selectedMove;
    };
    const fetchGameStatus = () => {
      fetchGameStatusInterval.value = setInterval(() => {
        store.dispatch("fetchGameStatus");
      }, 1000);
    };

    let calculateEnemyMove = () => {
      if (store.state.userData.gameStatus === "win") {
        if (move.value === "rock") {
          return "scissors";
        } else if (move.value === "scissors") {
          return "paper";
        } else if (move.value === "paper") {
          return "rock";
        }
      } else if (store.state.userData.gameStatus === "lose") {
        if (move.value === "rock") {
          return "paper";
        } else if (move.value === "scissors") {
          return "rock";
        } else if (move.value === "paper") {
          return "scissors";
        }
      }
    };

    watch(move, (newMove) => {
      if (newMove && canPlay.value === true) {
        store.state.userData.gameStatus = "waiting-for-enemy-move";
        store.dispatch("sendMove", newMove);
        canPlay.value = false;
        fetchGameStatus();

        watch(computedGameStatus, async (newStatus, oldStatus) => {
          if (
            oldStatus === "waiting-for-enemy-move" &&
            newStatus === "waiting-for-your-move"
          ) {
            if (fetchGameStatusInterval.value) {
              clearInterval(fetchGameStatusInterval.value);
            }
            calculatedClass.value = newMove;
            enemyMoved.value = true;

            setTimeout(() => {
              enemyMoved.value = false;
              canPlay.value = true;
              move.value = null;
            }, 3000);
          } else if (newStatus === "win" || newStatus === "lose") {
            setTimeout(() => {
              matchResult.value = newStatus;
            }, 3000);
            if (fetchGameStatusInterval.value) {
              clearInterval(fetchGameStatusInterval.value);
            }
            calculatedClass.value = calculateEnemyMove();
            enemyMoved.value = true;
          }
        });
      }
    });
    onUnmounted(() => {
      if (fetchGameStatusInterval.value) {
        clearInterval(fetchGameStatusInterval.value);
      }
    });

    return {
      move,
      matchResult,
      selectMove,
      enemyMoved,
      canPlay,
      calculatedClass,
    };
  },
};
</script>

<style scoped>
@media (max-width: 767px) {
  .choice-image {
    border-radius: 30%;
    width: 90%;
    height: 100%;

    animation: bouncing 1s cubic-bezier(0.1, 0.25, 0.1, 1) 0s infinite alternate
      both;
  }
  .main-waitscreen__choicescreen-container {
    display: flex;
    justify-content: space-between;
    max-width: 100%;
    margin: 20px auto;
  }
  .main-waitscreen__title {
    margin-top: 8%;
    font-size: 30px;
  }
  .main-waitscreen__versus-image {
    height: 70px;
  }
  .lds-hourglass:after {
    content: " ";
    display: block;
    border-radius: 50%;
    width: 100px;
    height: 100px;
    margin: 50px;
    box-sizing: border-box;
    border: 15px solid #fff;
    border-color: #fff transparent #fff transparent;
    animation: standBy_lds-hourglass 1.8s infinite;
  }
  .main-waitscreen__choicescreen-title {
    margin-top: 3em;
  }
  .main-waitscreen__gameprocess-username,
  .main-waitscreen__gameprocess-statistic {
    font-size: 40px;
    padding-bottom: 14px;
  }
  .your-side-spinner {
    display: none;
  }
  .scissors,
  .paper,
  .rock {
    width: 170px;
    height: 165px;
    padding: 15px;
  }
  .section-waitscreen {
    margin-top: 165px;
  }
  .main-waitscreen__gameprocess-container {
    display: flex;
    align-items: center;
    flex-direction: column;
    flex-wrap: wrap;
    align-content: center;
  }
  h2{
    margin-bottom: 0;
  }
}
</style>
