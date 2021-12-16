<template>
  <v-data-table
    :headers="headers"
    :items="desserts"
    sort-by="groupadmin"
    class="elevation-1 ma-12"
    disable-sort
  >
    <template v-slot:top>
      <v-toolbar
        flat
      >
        <v-toolbar-title><h2>メンバー管理</h2></v-toolbar-title>
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
          <v-form ref="addform">
          <v-card>
            <v-card-title>
              <span class="text-h5">{{ formTitle }}</span>
            </v-card-title>

            <v-card-text>
              <v-container>
                <v-text-field
                  v-model="editedItem.id"
                  label="ユーザーID(学籍番号)"
                  :rules="[rules.required,rules.max]"
                ></v-text-field>
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
                追加
              </v-btn>
            </v-card-actions>
          </v-card>
          </v-form>
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
      @click="deleteItem(item)"
    >
      <v-icon
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
      rules: {
        required: value => !!value || 'こちらは必須項目です',
        max: value => (value && value.length == 10) || '10文字で入力して下さい',
      },
      dialog: false,
      dialogDelete: false,
      headers: [
        { text: 'ユーザーID',align: 'start',sortable: false,value: 'id',align: "center",width: '200',class: "accent"},
        { text: 'ユーザー名', value: 'name', align: "center", width: '400',class: "accent"},
        { text: '', value: 'actions', sortable: false, align: "center", width: '300',class: "accent"},
      ],
      desserts: [],
      editedIndex: -1,
      editedItem: {
        id: '',
        name: '',
      },
      defaultItem: {
        id: '',
        name: '',
      },
    }),

    computed: {
      formTitle () {
        return this.editedIndex === -1 ? '新規メンバーを追加' : 'Edit Item'
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
            id: 'st20184115',
            name: '鶴薗正樹',
          },
          {
            id: 'st20184108',
            name: '西尾郁哉',
          },
          {
            id: 'st201844112',
            name: '濱田悠斗',
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
        if(this.$refs.addform.validate()){
        if (this.editedIndex > -1) {
          Object.assign(this.desserts[this.editedIndex], this.editedItem)
        } else {
          this.desserts.push(this.editedItem)
          console.log("a")
        }
        this.close()
        }
      },
    },
  }
</script>
