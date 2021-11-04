<template>

  <v-card
    max-width="800"
    class="mx-auto"
  >
  <h1 class="pt-8">
    <v-icon
    size="1.5em"
    color="blue-grey darken-3">
      mdi-cog
    </v-icon>
    &emsp;設定</h1><br>
    <v-divider></v-divider><br><br>
  <h2>
    <v-toolbar
    elevation="1"
    >
    <v-icon
    size="1.5em">
      mdi-account-edit
    </v-icon>
    &emsp;アカウント設定
    <v-spacer></v-spacer>
    <PasswordReset />
    </v-toolbar>
    </h2>

    <v-list
      two-line
    >

      <v-list-item>
        <v-list-item-content>
          <v-list-item-title>ユーザーID</v-list-item-title>
          <v-list-item-subtitle>st20184115</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>

      <v-list-item>
        <v-list-item-content>
          <v-list-item-title>メールアドレス</v-list-item-title>
          <v-list-item-subtitle>kcska_1811@kcska.onmicrisoft.com</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>

      <v-list-item>
        <v-list-item-content>
          <v-list-item-title>ロール</v-list-item-title>
          <v-list-item-subtitle>student</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
    </v-list>

    <v-divider></v-divider>

    <v-list
      two-line
      flat
    >

    <h2>
    <v-toolbar
    elevation="1"
    >
    <v-icon
    size="1.5em">
      mdi-wrench
    </v-icon>
    &emsp;アプリ設定
    </v-toolbar>
    </h2>
    </v-list>
    <v-list>
      <v-list-title>
      &emsp;テーマ変更
      </v-list-title>
      <v-switch
          v-model="theme"
          :prepend-icon="themeIcon"
        ></v-switch>
    </v-list>
  </v-card>
</template>
<script>
import PasswordReset from '../components/PasswordReset.vue'
  export default {
  components: { PasswordReset },
    data: () => ({
      settings: [],
      users:{
        email:'',
      }
    }),
    data () {
    return {
      theme:this.$vuetify.theme.dark,
    }
  },
  computed:{
    themeIcon(){
      return this.theme ? 'mdi-weather-night' : 'mdi-weather-sunny'
    }
  },
  watch:{
    theme() {
      this.$vuetify.theme.dark = this.theme
    }
  },
  /* 未ログイン時index.vueに遷移 */
  /* middleware:"authenicated" */
  }
</script>