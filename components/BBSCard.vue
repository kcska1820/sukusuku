<template>
    <v-card>
        <v-dialog v-model="enter"  max-width="500px">
            <template v-slot:activator="{ on, attrs }">
            <v-btn
                elevation="6"
                text
                x-large
                block
                v-bind="attrs"
                v-on="on">
                {{item.title}}
            </v-btn>
            </template>
            <v-card>
                <v-card-title>
                    <span class="text-h5">この掲示板に入室しますか？</span>
                </v-card-title>

                <v-card-text>
            <v-container>
              <v-row>
                <v-text-field
                  v-model="editedItem.title"
                  label="掲示板タイトル"
                ></v-text-field>
              </v-row><v-row>
                <v-textarea
                  v-model="editedItem.comment"
                  label="備考"
                  outlined
                ></v-textarea>
              </v-row>
            </v-container>
          </v-card-text>

                <v-card-actions>
                    <v-spacer/>
                    <v-btn
                        color="red darken-2"
                        text
                        @click="enter=false">
                        キャンセル
                    </v-btn>
                    <v-btn
                        color="blue darken-1"
                        text
                        :to="{
                        path:'/BBScon',
                        query:{
                        id:item.id
                        }}">
                        入室
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
          </v-card>
</template>
<script>
export default {
    data:()=>({
        enter:false,
        touketu:false,
        editedItem:{
          title:'',
          comment:'',
        },
    }),
    props:{
        item:Object    
    }
}
</script>