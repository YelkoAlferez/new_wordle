// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  runtimeConfig: {
    public: {
      apiBase: "http://new_wordle.test/api",
    },
  },
  modules: ['@pinia/nuxt', '@nuxtjs/tailwindcss'],
})
