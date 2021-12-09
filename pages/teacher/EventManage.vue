<template>
  <v-data-table
    :headers="headers"
    :items="events"
    sort-by="groupadmin"
    class="elevation-1 ma-12"
    disable-sort
  >
    <template v-slot:top>
      <v-toolbar
        flat
      >
        <v-toolbar-title><h2>イベント管理</h2></v-toolbar-title>
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
                      v-model="editedItem.eventname"
                      label="イベント名"
                    ></v-text-field>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                    <v-text-field
                      v-model="editedItem.eventdetails"
                      label="イベント詳細"
                    ></v-text-field>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                    <v-text-field
                      v-model="editedItem.end"
                      label="締め切り日時"
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
            <v-card-title class="text-h5">本当に削除しますか？</v-card-title>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="red darken-2" text @click="closeDelete">キャンセル</v-btn>
              <v-btn color="blue darken-1" text @click="deleteItemConfirm">削除</v-btn>
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
        icon
      >
      <v-icon
        @click="deleteItem(item)"
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
      url:'http://localhost:8000/sukusuku/',
      addurl:'',
      del:'',
      dialog: false,
      dialogDelete: false,
      headers: [
        {
          text: 'イベント名',
          align: 'start',
          sortable: false,
          value: 'title',
          align: "center",
          class:"accent"
        },
        { text: 'イベント詳細', value: 'details', align: "center",class:"accent"},
        { text: '締め切り日時', value: 'end', align: "center",class:"accent"},
        { text: '削除', value: 'actions', sortable: false,class:"accent" }
      ],
      events: [],
      editedIndex: -1,
      editedItem: {
        eventname: '',
        eventdetails: '',
        end: '',
      },
      defaultItem: {
        eventname: '',
        eventdetails: '',
        end: '',
      },
    }),

    computed: {
      formTitle () {
        return this.editedIndex === -1 ? '新規イベントを作成します' : 'イベント更新'
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
      fetch(this.url + 'evsel/?classid=' + localStorage.getItem('class'),{
        method:"GET",
        mode:"cors",
        credentials: 'include'
      }).then((res)=>res.json())
      .then(obj=>this.events=obj)
    },

    methods: {
      editItem (item) {
        this.editedIndex = this.events.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialog = true
      },

      deleteItem (item) {
        this.editedIndex = this.events.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialogDelete = true
      },

      deleteItemConfirm () {
        this.events.splice(this.editedIndex, 1)
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
        this.addurl = this.url + 'evadd/?eventname=' + this.editedItem.eventname + '&eventdetails=' + this.editedItem.eventdetails + '&end=' + this.editedItem.end
        console.log(this.addurl)
        fetch(this.addurl,{
          method:"GET",
          mode:"cors",
          credentials: 'include'
        })
        .then((res)=>res.json())
        .then(obj=>this.events=obj)
        this.close()
      },
    },
  }
</script>
