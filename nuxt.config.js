import colors from 'vuetify/es5/util/colors'

export default {
  mode: "universal",
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    titleTemplate: '%s - sukusuku',
    title: 'sukusuku',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    { src: '~/plugins/firebase.js', mode: 'client' }
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/vuetify
    '@nuxtjs/vuetify',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/pwa'
  ],
  axios: {},

  manifest: {
    name: 'スクスク',
    lang: 'ja',
    short_name: 'スクスク',
    title: 'sukusuku',
    'og:title': 'スクスク',
  },

  // Vuetify module configuration: https://go.nuxtjs.dev/config-vuetify
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    theme: {
      dark: false,
      themes: {
        light: {
          primary: colors.brown.darken1,
          secondary: colors.brown.darken2,
          accent: colors.lightGreen.lighten1,
          info: colors.grey.lighten4,
          button: colors.brown.darken1,
          icon: colors.blueGrey.darken3,
          back: colors.blueGrey.lighten4
        },
        dark: {
          primary: colors.grey.darken1,
          secondary: colors.blueGrey.darken3,
          accent: colors.blueGrey.darken3,
          error: colors.red.accent3,
          info: colors.blueGrey.darken4,
          button: colors.grey.lighten5,
          icon: colors.blueGrey.lighten4,
          warning: colors.amber.base,
          success: colors.green.accent3
        }
      }
    }
  },

  options: {
    customProperties: true
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
  }
}
