// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  components: [{ path: '~/shared/icons', prefix: 'Icon' }, '~/components'],
  alias: {
    css: "/<srcDir>/assets/css"
  },
  app: {
    baseURL: process.env.BASE_URL
  },
  css: ["~/assets/css/main.css"],
})
