<template>
  <v-data-table
    :headers="headers"
    :items="desserts"
    sort-by="groupmember"
    class="elevation-1"
  >
    <template v-slot:top>
      <v-toolbar
        flat
      >
        <v-toolbar-title>メンバー管理</v-toolbar-title>
        <v-divider
          class="mx-4"
          inset
          vertical
        ></v-divider>
        <v-spacer></v-spacer>
            <v-btn
              color="primary"
            >
              メンバー追加
            </v-btn>
        <v-dialog v-model="dialogDelete" max-width="500px">
          <v-card>
            <v-card-title class="text-h5">本当に削除しますか？</v-card-title>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="closeDelete">キャンセル</v-btn>
              <v-btn color="blue darken-1" text @click="deleteItemConfirm">削除</v-btn>
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar>
    </template>
    <template v-slot:[`item.actions`]="{ item }">
      <v-icon
        small
        @click="deleteItem(item)"
      >
        mdi-delete
      </v-icon>
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
      dialogDelete: false,
      headers: [
        {
          text: 'ユーザーID',
          align: 'start',
          sortable: false,
          value: 'id',
        },
        { text: 'ユーザー名', value: 'name' },
        { text: 'Actions', value: 'actions', sortable: false },
      ],
      desserts: [],
      editedIndex: -1,
    }),

    computed: {
      formTitle () {
        return this.editedIndex === -1 ? 'New Item' : 'Edit Item'
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
            id: 'st20184112',
            name: '濱田悠斗',
          },
          {
            id: 'st20184108',
            name: '西尾郁哉',
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
