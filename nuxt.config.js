import colors from 'vuetify/es5/util/colors'

export default {
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
    '~/plugins/firebase.js'
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
  ],

  // Vuetify module configuration: https://go.nuxtjs.dev/config-vuetify
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    theme: {
      dark: false,
      themes: {
        light: {
          primary: colors.brown.darken2,
          secondary: colors.brown.darken1,
          accent: colors.lightGreen.lighten1,
          error: colors.red.accent3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          success: colors.green.accent3
        },
        dark: {
          primary: colors.indigo.darken1,
          secondary: colors.indigo.lighten1,
          accent: colors.blueGrey.darken1,
          error: colors.red.accent3,
          info: colors.teal.lighten1,
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
