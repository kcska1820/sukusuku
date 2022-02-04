<template>
  <v-menu
    bottom
    min-width="150px"
    rounded
    offset-y
  >
    <template
      v-slot:activator="{ on }"
    >
      <v-btn
        v-on="on"
        fab
        elevation="0"
        color="accent"
        height="46px"
        width="46px"
      >
        <v-icon
          size="2.5em"
        >
          mdi-logout
        </v-icon>
      </v-btn>
    </template>
    <v-card>
      <v-list-item-content
        class="justify-center"
      >
        <div
          class="mx-auto text-center"
        >
          <div
            class="pa-2 mb-2"
          >
            <h3>
              LOGOUT
            </h3>
          </div>
          <v-divider />
          <div
            class="pa-1 mt-2"
          >
            <v-btn
              depressed
              rounded
              text
              @click="logout"
            >
              ログアウト
            </v-btn>
          </div>
          <div
            class="pa-1"
          >
            <v-btn
              depressed
              rounded
              text
              color="red darken-2"
            >
              キャンセル
            </v-btn>
          </div>
        </div>
      </v-list-item-content>
    </v-card>
  </v-menu>
</template>

<script>
import firebase from "~/plugins/firebase";
import { getAuth, signOut } from "firebase/auth";
export default {
  methods: {
    logout() {
      const auth = getAuth();
      signOut(auth)
        .then(() => {
          // Sign-out successful.
          localStorage.clear();
          this.$router.push("/");
        })
        .catch((error) => {
          // An error happened.
        });
    },
  },
};
</script>
      