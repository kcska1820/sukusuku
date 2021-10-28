<template>
  <v-card>
    <v-card-title class="text-center justify-center py-6">
      <h2 class="display-1 font-weight-bold">
        Tab型UIをVuetifyで使ってみるサンプル 
      </h2>
    </v-card-title>
    <v-tabs grow>
      <v-tab
        v-for="title in titles"
        :key="title.id"
      >
        {{ title.name }}
      </v-tab>
      <v-tab-item>
        <v-card>
          <v-card-text>
            タブ1の内容をここに記述します。もちろんこれは、あらかじめ Vue.js の data で定義しておいて、それを呼び出す形でも良いです。配列で格納しておいて、v-for で順番に取り出したりしても良さそうですね。
          </v-card-text>
        </v-card>
      </v-tab-item>
      <v-tab-item>
        <v-card>
          <v-card-text>
            タブ2の内容をここに記述します。
          </v-card-text>
        </v-card>
      </v-tab-item>
      <v-tab-item>
        <v-card>
          <v-card-text>
            タブ3の内容をここに記述します。
          </v-card-text>
        </v-card>
      </v-tab-item>
      <v-tab-item>
        <v-card>
          <v-card-text>
            タブ4の内容をここに記述します。
          </v-card-text>
        </v-card>
      </v-tab-item>
    </v-tabs>
  </v-card>
</template>
<script>
  new Vue({
    el: '#app',
    vuetify: new Vuetify(),
    titles: [
      {id: 01, name: 'WordPress'},
      {id: 02, name: 'Vuetify'},
      {id: 03, name: 'Gatsby.js'},
      {id: 04, name: 'Vue.js'}
    ],
  })
</script>