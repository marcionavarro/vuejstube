// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: false },
  alias: {
    css: "/<rootDir>/assets/css"
  },
  css: ["~/assets/css/main.css"],
  modules: [
    '@pinia/nuxt',
    'pinia-plugin-persistedstate/nuxt',
    '@nuxtjs/i18n',
    '@nuxt/ui'
  ],
  i18n: {
    vueI18n: './i18n'
  },
  pinia: {
    storesDirs: ['./stores/**'],
  }
})