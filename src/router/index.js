import { createRouter, createWebHistory } from "vue-router";
import store from '../store' 
const routes = [
  {
    path: "/",
    name: "login",
    meta: {layout:'mainLayout'},
    component: ()=>import('../views/Login.vue')
  },
 
  {
    path: "/lobby",
    name: "lobby",
    meta: { layout: 'mainLayout', requiresAuth: true },
    
    component: ()=>import('../views/Lobby.vue'),
  },
  {
    path: "/waiting",
    name: "standByScreen",
    meta: { layout: 'mainLayout', requiresAuth: true },
    component: ()=>import('../views/WaitScreen.vue'),
  },
  {
    path: "/game",
    name: "game",
    meta: { layout: 'mainLayout', requiresAuth: true },
    component: ()=>import('../views/InGame.vue'),
  },

];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!store.getters.isLoggedIn) {
      next({ name: 'login' });
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;
