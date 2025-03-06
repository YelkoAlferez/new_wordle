// middleware/auth.ts

import { useAuthStore } from "~/stores/authStore";

export default defineNuxtRouteMiddleware((to, from) => {
  const auth = useAuthStore(); 

  auth.checkAuth(); 

  if ((to.path !== '/login' && to.path !== '/register') && !auth.isAuthenticated) {
    return navigateTo('/login');
  }

  if (to.path === '/login' && auth.isAuthenticated) {
    return navigateTo('/home');
  }
});
