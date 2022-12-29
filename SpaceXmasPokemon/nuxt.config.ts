export default defineNuxtConfig({
  ssr: false,
  modules: ["@nuxtjs/tailwindcss"],
  css: ["@/assets/css/variables.scss"],
  app: {
    pageTransition: { name: "page", mode: "in-out" },
    head: {
      charset: "utf-16",
      viewport: "width=device-width, initial-scale=1",
      title: "SpaceXmasPokemon",
      link: [
        {
          rel: "stylesheet",
          href: "https://design.swedbankpay.com/v/10.5.0/styles/swedbankpay.css",
        },
      ],
      meta: [{ name: "description", content: "My SpaceXmas Pokemon Project." }],
    },
  },
});
