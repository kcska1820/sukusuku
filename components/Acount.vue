<template>
    <v-menu
        bottom
        min-width="200px"
        rounded
        offset-y
      >
        <template v-slot:activator="{ on }">
          <v-btn
            icon
            x-large
            v-on="on"
          >
            <v-avatar
              color="brown"
              size="48"
            >
              <img v-bind:src="users.photoURL">
            </v-avatar>
          </v-btn>
        </template>
        <v-card>
          <v-list-item-content class="justify-center">
            <div class="mx-auto text-center">
              <v-avatar
                color="brown"
              >
                <img v-bind:src="users.photoURL">
              </v-avatar>
              <h3>{{users.displayName}}</h3>
              <p class="text-caption mt-1">
                {{users.email}}
              </p>
              <v-divider class="my-3"></v-divider>
              <v-btn
                depressed
                rounded
                text
                @click="logout"
              >
                Logout
              </v-btn>
            </div>
          </v-list-item-content>
        </v-card>
      </v-menu>
</template>

<script>
import firebase from "~/plugins/firebase"
import { getAuth, signOut } from "firebase/auth"
export default {
  data () {
    return {
      users:{
        displayName:'',
        email:'',
        photoURL:''
      },
    }
  },
  methods:{
    logout(){
      const auth = getAuth();
      signOut(auth).then(() => {
        // Sign-out successful.
        console.log("logout")
        this.$router.push("/")
      }).catch((error) => {
        // An error happened.
      });
    },
    get(){
      const auth = getAuth();
      const user = auth.currentUser;
      if (user !== null) {
        // The user object has basic properties such as display name, email, etc.
        this.users.displayName = user.displayName;
        this.users.email = user.email;
        this.users.photoURL = user.photoURL;

        // The user's ID, unique to the Firebase project. Do NOT use
        // this value to authenticate with your backend server, if
        // you have one. Use User.getToken() instead.
        const uid = user.uid;
      }
    }
  },
  created(){
    this.get()
  }
}
</script>
      