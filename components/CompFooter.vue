<template>
    <v-footer
    color="primary lighten-1"
    padless
    >
    <v-row
      justify="center"
      no-gutters
    >
      <v-btn
        v-for="(link,i) in links"
        :key="i"
        :to="link.to"
        color="white"
        text
        rounded
        class="my-2"
      >
        {{ link.title }}
      </v-btn>
      <v-col
        class="primary lighten-2 py-4 text-center white--text"
        cols="12"
      >
        {{ new Date().getFullYear() }} — <strong>Vuetify</strong>
      </v-col>
    </v-row>
  </v-footer>
</template>

<script>
export default {
  data () {
    return {
      fixed: true,
      links: [
        /*現在内部リンク　外部リンクに変更の必要あり(toじゃできない) */
        {
          title: 'home',
          to: '/'
        },
        {
          title:'inspire',
          to:'/inspire'
        }
      ]
    }
  }
}
</script>