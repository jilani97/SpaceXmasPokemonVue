export default defineNuxtConfig({
  modules: ["@nuxtjs/tailwindcss"],
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
        { rel: "stylesheet", href: "/css/global.css" },
      ],
      meta: [{ name: "description", content: "My SpaceXmas Pokemon Project." }],
    },
  },
  tailwindcss: {
    cssPath: "~/assets/style/variables.scss",
  },
});
