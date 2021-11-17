<template>
<v-row>
    <v-dialog
      v-model="dialog"
      persistent
      max-width="600px"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          color="light-green lighten-1"
          v-bind="attrs"
          v-on="on"
        >
          パスワード変更
        </v-btn>
      </template>
        <v-container fluid fill-height>
            <v-layout xs12 sm8 md4>
                <v-flex>
                    <v-card>
                        <v-toolbar color="accent">
                            <v-toolbar-title>
                                パスワードリセット
                            </v-toolbar-title>
                        </v-toolbar>
                        <v-card-text>
                            <v-form>
                                <v-text-field
                                    v-model="email"
                                    :counter="50"
                                    label="email"
                                />
                            </v-form>
                        </v-card-text>
                        <v-card-actions>
                            <v-btn
                                color="red darken-2"
                                text
                                @click="dialog = false"
                            >
                                閉じる
                            </v-btn>
                            <v-spacer />
                            <v-btn color="blue darken-1" text @click="Reset">
                                メールを送信
                            </v-btn>
                        </v-card-actions>
                    </v-card>
                </v-flex>
            </v-layout>
        </v-container>
    </v-dialog>
</v-row>
</template>

<script>
import firebase from '~/plugins/firebase'
import { getAuth , sendPasswordResetEmail } from 'firebase/auth'
export default {
    data(){
        return{
            email:'',
            dialog: false,
        }
    },
    methods:{
      Reset(){
        firebase.auth().sendPasswordResetEmail(this.email).then(user=>{
          dialog = false
        }).catch((error)=>{
          console.log("error")
        })
      },
      GetAuth(){
        const auth = getAuth();
        const user = auth.currentUser;
        if (user !== null) {
            // The user object has basic properties such as email
            this.email = user.email
        }else{
            this.email = 'none';
        }
      }
    },
    created(){
        this.GetAuth()
    }
}
</script>
