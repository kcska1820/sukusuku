<template>
<v-card color="accent">
    <v-card-title>
      <v-icon
        size="2em">
        mdi-message-text
      </v-icon>
      <h2>
      掲示板
      </h2>
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
            >
              キャンセル
            </v-btn>
            <v-btn
              color="blue darken-1"
              text
            >
              申請
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-card-title>
    <v-row class="d-flex justify-end">
    <v-col cols="12" sm="5" class="px-6">
    <v-toolbar floating>
    <v-row>
      <v-col cols="3" class="pr-0">
        <v-select></v-select>
      </v-col>
      <v-col cols="9" class="pr-7">
        <v-text-field
          clearable
          append-icon="mdi-magnify"
        ></v-text-field>
      </v-col>
    </v-row>
    </v-toolbar>
    </v-col>
    </v-row>
    <v-divider />
    <br>
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