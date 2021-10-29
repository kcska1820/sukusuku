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
    <v-spacer />
    <v-btn color="light-green lighten-1">パスワード変更</v-btn>
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

      <v-list-item-group
        v-model="settings"
        multiple
      >
        <v-list-item>
          <template v-slot:default="{ active, }">
            <v-list-item-action>
              <v-checkbox
                :input-value="active"
                color="primary"
              ></v-checkbox>
            </v-list-item-action>

            <v-list-item-content>
              <v-list-item-title>Notifications</v-list-item-title>
              <v-list-item-subtitle>Allow notifications</v-list-item-subtitle>
            </v-list-item-content>
          </template>
        </v-list-item>

        <v-list-item>
          <template v-slot:default="{ active }">
            <v-list-item-action>
              <v-checkbox
                :input-value="active"
                color="primary"
              ></v-checkbox>
            </v-list-item-action>

            <v-list-item-content>
              <v-list-item-title>Sound</v-list-item-title>
              <v-list-item-subtitle>Hangouts message</v-list-item-subtitle>
            </v-list-item-content>
          </template>
        </v-list-item>

        <v-list-item>
          <template v-slot:default="{ active }">
            <v-list-item-action>
              <v-checkbox
                :input-value="active"
                color="primary"
              ></v-checkbox>
            </v-list-item-action>

            <v-list-item-content>
              <v-list-item-title>Video sounds</v-list-item-title>
              <v-list-item-subtitle>Hangouts video call</v-list-item-subtitle>
            </v-list-item-content>
          </template>
        </v-list-item>

        <v-list-item>
          <template v-slot:default="{ active }">
            <v-list-item-action>
              <v-checkbox
                :input-value="active"
                color="primary"
              ></v-checkbox>
            </v-list-item-action>

            <v-list-item-content>
              <v-list-item-title>Invites</v-list-item-title>
              <v-list-item-subtitle>Notify when receiving invites</v-list-item-subtitle>
            </v-list-item-content>
          </template>
        </v-list-item>
      </v-list-item-group>
    </v-list>
  </v-card>
</template>
<script>
  export default {
    data: () => ({
      settings: [],
    }),
  }
</script>