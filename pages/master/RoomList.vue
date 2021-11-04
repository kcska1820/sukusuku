<template>
  <v-data-table
    :headers="headers"
    :items="desserts"
    sort-by="calories"
    class="elevation-1"
    disable-sort
  >
    <template v-slot:top>
      <v-toolbar
        flat
      >
        <v-toolbar-title>教室管理</v-toolbar-title>
        <v-divider
          class="mx-4"
          inset
          vertical
        ></v-divider>
        <v-spacer></v-spacer>
        <v-dialog
          v-model="dialog"
          max-width="500px"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              color="accent"
              dark
              fab
              class="mb-2"
              v-bind="attrs"
              v-on="on"
            >
               <v-icon dark>
            mdi-plus
          </v-icon>
            </v-btn>
          </template>
          <v-card>
            <v-card-title>
              <span class="text-h5">{{ formTitle }}</span>
            </v-card-title>

            <v-card-text>
              <v-container>
                <v-row>
                  <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                    <v-text-field
                      v-model="editedItem.roomid"
                      label="教室ID"
                    ></v-text-field>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                    <v-text-field
                      v-model="editedItem.roomname"
                      label="教室名"
                    ></v-text-field>
                  </v-col>
                 
                  <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                    <v-text-field
                      v-model="editedItem.note"
                      label="備考"
                    ></v-text-field>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                color="red darken-2"
                text
                @click="close"
              >
                キャンセル
              </v-btn>
              <v-btn
                color="blue darken-1"
                text
                @click="save"
              >
                作成
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <v-dialog v-model="dialogDelete" max-width="500px">
          <v-card>
            <v-card-title class="text-h5">本当に削除してもよろしいですか？</v-card-title>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="closeDelete">いいえ</v-btn>
              <v-btn color="red darken-1" text @click="deleteItemConfirm">はい</v-btn>
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar>
    </template>
    <template v-slot:[`item.actions`]="{ item }">
       <v-btn
      fab
      small
      color="primary"
    >
      <v-icon
        small
        class="mr-2"
        @click="editItem(item)"
      >
        mdi-pencil
      </v-icon>
      </v-btn>
      <v-btn
      fab
      small
      color="primary"
    >
      <v-icon
        @click="deleteItem(item)"
        size="2em"
      >
        mdi-delete
        </v-icon>
      </v-btn>
    </template>
  </v-data-table>
</template>

<script>
  export default {
    data: () => ({
      dialog: false,
      dialogDelete: false,
      items: ['student', 'teacher', 'orner'],
      headers: [
        {
          text: '教室ID',
          align: 'start',
          sortable: false,
          value: 'roomid',
          align: "center", 
          width: '300'
        },
        { text: '教室名', value: 'roomname', align: "center", width: '300'},
        { text: '備考', value: 'note', align: "center", width: '300' },
        { text: '編集', value: 'actions', sortable: false, align: "center", width: '250' },
      ],
      desserts: [],
      editedIndex: -1,
      editedItem: {
        name: '',
        calories: '',
        fat: '',
        carbs: '',
        },
      defaultItem: {
        name: '',
        calories: '',
        fat: '',
        carbs: '',
        },
    }),

    computed: {
      formTitle () {
        return this.editedIndex === -1 ? '教室追加' : '編集'
      },
    },

    watch: {
      dialog (val) {
        val || this.close()
      },
      dialogDelete (val) {
        val || this.closeDelete()
      },
    },

    created () {
      this.initialize()
    },

    methods: {
      initialize () {
        this.desserts = [
          {
            roomid: 'room101',
            roomname: '101教室',
            note: 'マシン室',
          },
          {
            roomid: 'room101',
            roomname: '101教室',
            note: 'マシン室',
          },
          {
            roomid: 'room101',
            roomname: '101教室',
            note: 'マシン室',
          },
          {
            roomid: 'room101',
            roomname: '101教室',
            note: 'マシン室',
          },
          {
            roomid: 'room101',
            roomname: '101教室',
            note: 'マシン室',
          },
          
        ]
      },

      editItem (item) {
        this.editedIndex = this.desserts.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialog = true
      },

      deleteItem (item) {
        this.editedIndex = this.desserts.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialogDelete = true
      },

      deleteItemConfirm () {
        this.desserts.splice(this.editedIndex, 1)
        this.closeDelete()
      },

      close () {
        this.dialog = false
        this.$nextTick(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        })
      },

      closeDelete () {
        this.dialogDelete = false
        this.$nextTick(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        })
      },

      save () {
        if (this.editedIndex > -1) {
          Object.assign(this.desserts[this.editedIndex], this.editedItem)
        } else {
          this.desserts.push(this.editedItem)
        }
        this.close()
      },
    },
  }
</script>