<template>
    <v-footer
    color="primary"
    padless
    >
    <v-row
      justify="center"
      no-gutters
    >
      <v-btn
        v-for="(link,i) in links"
        :key="i"
        :href="link.href"
        color="white"
        text
        rounded
        class="my-2"
      >
        {{ link.title }}
      </v-btn>
      <v-col
        class="secondary py-4 text-center white--text"
        cols="12"
      >
        <strong>スクスク～suku-suku～</strong>
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
        {
          title: '無限大キャンパス',
          href:'https://z3.mugendai.do-johodai.ac.jp/portal/'
        },
        {
          title:'PINE NET',
          href:'https://pine-net.jp'
        },
        {
          title:'PINE Cloud',
          href:'https://kcska.pine-cloud.jp'
        }
      ]
    }
  }
}
</script>
