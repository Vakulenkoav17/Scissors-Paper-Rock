<template>
  <button class="logout-button" @click="logout">
   <span class="text">Выход</span> 
    <span class="icon">
      <img src="../assets/img/logout.svg" alt="Выход" />
    </span>
      </button>
</template>

<script>
import { useStore } from "vuex";
import { useRouter } from "vue-router";

export default {
 
  setup() {
    const store = useStore();
    const router = useRouter();

    const logout = () => {
      store
        .dispatch("logout")
        .then(() => {
          router.push("/");
        })
        .catch((error) => {
          console.error("Ошибка при logout:", error);
        });
    };

    return {
      logout,
    };
  },
};
</script>

<style scoped>
.logout-button {
  position: fixed;
  top: 20px;
  right: 20px;
  display: flex;
  align-items: center;
  background-color: #ff5733;
  color: white;
  border: none;
  border-radius: 25px;
  padding: 10px 20px;
  cursor: pointer;
  transition: background-color 0.3s ease-in-out;
}

.logout-button:hover {
  background-color: #ff6d4a;
}

.text{
  padding-right: 10px;
}
.icon img {
  width: 24px; 
  height: 24px; 
}
@media (max-width: 768px) {
.text{display: none;}
.logout-button{
  padding: 10px;
  top: 7px;
    right: 3px
;
}
}
</style>
