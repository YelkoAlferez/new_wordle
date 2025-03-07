// middleware/auth.ts

import { useAuthStore } from "~/stores/authStore";

export default defineNuxtRouteMiddleware(async (to, from) => {
  const auth = useAuthStore(); 

  await auth.checkAuth(); 

  console.log(auth.isAuthenticated)
  if ((to.path !== '/' && to.path !== '/register') && !auth.isAuthenticated) {
    return navigateTo('/');
  }

  if ((to.path === '/' || to.path === '/register') && auth.isAuthenticated) {
    return navigateTo('/home');
  }

  if (!to.matched.length) {
    return auth.isAuthenticated ? navigateTo('/home', { replace: true }) : navigateTo('/', { replace: true })
  }
});
