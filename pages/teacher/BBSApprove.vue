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
        <v-toolbar-title><h2>承認待ち一覧</h2></v-toolbar-title>
        <v-divider
          class="mx-4"
          inset
          vertical
        ></v-divider>
        <v-spacer></v-spacer>
        
        <v-dialog v-model="dialogApprove" max-width="500px">
          <v-card>
            <v-card-title class="text-h5">このテーマを掲示板に追加しますか？</v-card-title>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="red darken-2" text @click="closeApprove">キャンセル</v-btn>
              <v-btn color="blue darken-1" text @click="approveItemConfirm">追加</v-btn>
              <v-spacer></v-spacer>
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
      dark
      color="blue"
    >
      <v-icon
        @click="approveItem(item)"
        size="2em"
      >
        mdi-checkbox-marked-circle-outline
      </v-icon>
    </v-btn>
    <v-btn
      fab
      small
      dark
      color="red"
    >
      <v-icon
        @click="deleteItem(item)"
        size="2em"
      >
        mdi-close
      </v-icon>
    </v-btn>
    </template>
    <template v-slot:no-data>
      <v-btn
        color="primary"
        @click="initialize"
      >
        Reset
      </v-btn>
    </template>
  </v-data-table>
</template>
<script>
  export default {
    data: () => ({
      dialog: false,
      dialogApprove: false,
      dialogDelete: false,
      headers: [
        {
          text: '掲示板タイトル',
          align: 'start',
          sortable: false,
          value: 'title',
          align: "center",
          width: '200',
          class:"accent"
        },
        { text: '備考', value: 'comment', align: "center", width: '200',class:"accent"},
        { text: '', value: 'actions', sortable: false, align: "center", width: '200',class:"accent"},
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
        return this.editedIndex === -1 ? 'トピックを作成します' : 'Edit Item'
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
            title: '応用情報対対策',
            comment: 'tp0001',
          },
          {
            title: '卒業研究',
            comment: 'tp0002',
          },
          {
            title: '映画',
            comment: 'tp0003',
          },
          {
            title: 'ゲーム',
            comment: 'tp0004',
          }
        ]
      },

      editItem (item) {
        this.editedIndex = this.desserts.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialog = true
      },

      approveItem (item) {
        this.editedIndex = this.desserts.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialogApprove = true
      },

      deleteItem (item) {
        this.editedIndex = this.desserts.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialogDelete = true
      },

      approveItemConfirm () {
        this.desserts.splice(this.editedIndex, 1)
        this.closeApprove()
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

      closeApprove () {
        this.dialogApprove = false
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
