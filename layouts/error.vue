<template>
  <v-app dark>
    <h1 v-if="error.statusCode === 403">
      {{ Forbidden }}
    </h1>
    <h1 v-if="error.statusCode === 404">
      {{ pageNotFound }}
    </h1>
    <h1 v-if="error.statusCode === 500">
      {{ InternalServerError }}
    </h1>
    <h1 v-if="error.statusCode === 502">
      {{ BadGateway }}
    </h1>
    <h1 v-if="error.statusCode === 503">
      {{ ServiceUnavailable }}
    </h1>
    <h1 v-if="error.statusCode === 504">
      {{ GatewayTimeout }}
    </h1>
    <h1 v-else>
      {{ otherError }}
    </h1>
    <NuxtLink to="/">
      Home page
    </NuxtLink>
  </v-app>
</template>

<script>
export default {
  layout: 'empty',
  props: {
    error: {
      type: Object,
      default: null
    }
  },
  data () {
    return {
      Forbidden:'403 Forbidden',
      pageNotFound: '404 Not Found',
      InternalServerError:'500 Internal Server Error',
      BadGateway:'502 Bad Gateway',
      ServiceUnavailable:'503 Service Unavailable',
      GatewayTimeout:'504 Gateway Timeout',
      otherError: 'An error occurred'
    }
  },
  head () {
    const title =
      this.error.statusCode === 404 ? this.pageNotFound : this.otherError
    return {
      title
    }
  }
}
</script>

<style scoped>
h1 {
  font-size: 20px;
}
</style>
