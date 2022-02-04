<template>
  <v-card
    max-width="800"
    class="mx-auto"
  >
    <h1
      class="py-6 pl-3 mb-3 accent"
    >
      <v-icon
        size="1.5em"
        class="mr-5"
        color="icon"
      >
        mdi-cog
      </v-icon>
      設定
    </h1>
    <h2>
      <v-toolbar
        elevation="1"
        color="info"
      >
        <v-icon
          size="1.5em"
          class="mr-5"
          color="icon"
        >
          mdi-account-edit
        </v-icon>
        アカウント設定
        <v-spacer>
        </v-spacer>
      </v-toolbar>
    </h2>

    <v-list
      two-line
    >
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title>
            学籍番号
          </v-list-item-title>
          <v-list-item-subtitle
            class="ml-2"
          >
            {{ userid }}
          </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>

      <v-list-item>
        <v-list-item-content>
          <v-list-item-title>
            メールアドレス
          </v-list-item-title>
          <v-list-item-subtitle
          class="ml-2"
          >
            {{ email }}
          </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>

      <v-list-item>
        <v-list-item-content>
          <v-list-item-title>
            区分
          </v-list-item-title>
          <v-list-item-subtitle
            class="ml-2"
          >
            {{ role }}
          </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
    </v-list>
    <v-divider>
    </v-divider>
    <v-list
      two-line
      flat
    >
      <h2>
        <v-toolbar
          color="info"
          elevation="1"
        >
          <v-icon
            size="1.5em"
            color="icon"
            class="mr-5"
          >
            mdi-wrench
          </v-icon>
          アプリ設定
        </v-toolbar>
      </h2>
    </v-list>
    <v-list>
      <v-list-item-title
        class="ml-3"
      >
        テーマ変更
      </v-list-item-title>
      <v-switch
        class="ml-6"
        v-model="theme"
        color="icon"
        :prepend-icon="themeIcon"
      ></v-switch>
      <v-btn
      class="px-16 ml-6"
      v-if="role=='teacher'"
      color="accent"
      to="/AdminMenu"
      >
        管理者メニュー
      </v-btn>
    </v-list>
  </v-card>
</template>
<script>
  export default {
  data () {
    return {
      settings: [],
      user: [],
      userid:'',
      email:'',
      role:'',
      theme:this.$vuetify.theme.dark,
    }
  },
  methods:{
    getUser(){
      this.user = JSON.parse(localStorage.getItem('user'))
      this.userid = this.user[0].userid
      this.email = this.user[0].mail
      this.role = this.user[0].roleid_id
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
  mounted(){
    this.getUser()
  },
  /* 未ログイン時index.vueに遷移 */
  middleware:"authenicated"
  }
</script>
