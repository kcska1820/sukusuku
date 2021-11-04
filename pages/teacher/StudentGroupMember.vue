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
        <v-toolbar-title>学生管理</v-toolbar-title>
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
                      v-model="editedItem.userid"
                      label="ユーザーID"
                    ></v-text-field>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="6"
                    md="8"
                  >
                    <v-text-field
                      v-model="editedItem.mail"
                      label="メールアドレス"
                    ></v-text-field>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                    <v-select
                        v-model="editedItem.rollid"
                        :items="items"
                        label="ロールID"
                    ></v-select>
                    </v-col>
                  <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                    <v-text-field
                      v-model="editedItem.username"
                      label="ユーザー名"
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
              <v-btn color="red darken-2" text @click="closeDelete">いいえ</v-btn>
              <v-btn color="blue darken-1" text @click="deleteItemConfirm">はい</v-btn>
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
        size="2em"
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
      items: ['student', 'teacher', 'master'],
      headers: [
        {
          text: 'ユーザーID',
          align: 'start',
          sortable: false,
          value: 'userid',
        },
        { text: 'メールアドレス', value: 'mail' ,align: "center", width: '300'},
        { text: 'ロールID', value: 'rollid',align: "center", width: '250'},
        { text: 'ユーザー名', value: 'username',align: "center", width: '250'},
        { text: '編集', value: 'actions', sortable: false },
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
        return this.editedIndex === -1 ? '学生追加' : '編集'
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
            userid: 'st20180001',
            mail: 'Kcska_20180001@kcs.com',
            rollid: 'student',
            username: 'kcs_oki',
          },
          {
            userid: 'st20180002',
            mail: 'Kcska_20180002@kcs.com',
            rollid: 'student',
            username: 'kcs_maruno',
          },
          {
            userid: 'st20180003',
            mail: 'Kcska_20180003@kcs.com',
            rollid: 'student',
            username: 'kcs_hamada',
          },
          {
            userid: 'st20180004',
            mail: 'Kcska_20180004@kcs.com',
            rollid: 'student',
            username: 'kcs_nino',
          },
          {
            userid: 'st20180005',
            mail: 'Kcska_20180005@kcs.com',
            rollid: 'student',
            username: 'kcs_turuzon',
          
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