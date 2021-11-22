<template>
<v-card color="accent">
    <v-card-title>
      <v-icon
        size="1.5em">
        mdi-message-text
      </v-icon>
      掲示板
      <v-dialog
        v-model="sinsei"
        max-width="500px"
      >
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            color="primary"
            dark
            fab
            absolute
            right
            v-bind="attrs"
            v-on="on"
          >
            <v-icon>mdi-plus</v-icon>
          </v-btn>
        </template>
        <v-card>
          <v-card-title>
            <span class="text-h5">掲示板の追加申請</span>
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
            <v-spacer></v-spacer>
            <v-btn
              color="red darken-2"
              text
              @click="sclose"
            >
              キャンセル
            </v-btn>
            <v-btn
              color="blue darken-1"
              text
              @click="save"
            >
              申請
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-card-title>
    <div
      v-for="item in items"
      :key="item.id"
      router
      exact>
      <v-col>
      <BBSCard :item="item"/>
    </v-col>
     </div>   
</v-card>
</template>
<script>
import items from '/components/threadList.json'
import BBSCard from '/components/BBSCard'
export default {
    data:() => ({
        sinsei:false,
        touketu:false,
        kaijo:false,
        items:items,
        desserts:[],
        editedIndex: -1,
        editedItem:{
          title:'',
          comment:'',
        },
        defaultItem:{
          title:'',
          comment:'',
        },
    }),
    components: {
        BBSCard
    }
}
</script>