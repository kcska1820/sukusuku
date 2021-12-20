<template>
  <v-card class="mt-12">
    <v-card-title>
      <h2>メンバー管理</h2>
      <v-spacer></v-spacer>
      <v-text-field
        v-model="search"
        append-icon="mdi-magnify"
        label="IDでメンバーを検索"
        single-line
        hide-details
      ></v-text-field>
    </v-card-title>
  <v-data-table
    :headers="headers"
    :items="users"
    :search="search"
    sort-by="classmember"
    class="elevation-1"
    disable-sort
  >
    <template v-slot:top>
      <v-toolbar
        flat
      >
        <v-divider
          class="mx-4"
          inset
          vertical
        ></v-divider>
        <h1>{{classname}}</h1>
        <v-spacer></v-spacer>
        <v-btn
          class="mx-2"
          fab
          dark
          color="accent"
          to="/teacher/ClassMemberAdd"
        >
          <v-icon dark>
            mdi-plus
          </v-icon>
    </v-btn>
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
      color="primary"
      small
      >
      <v-icon
        size="2em"
        @click="deleteItem(item)"
      >
        mdi-delete
      </v-icon>
      </v-btn>
    </template>
    <template v-slot:no-data>
      <v-btn
        color="primary"
      >
        Reset
      </v-btn>
    </template>
  </v-data-table>
  </v-card>
</template>

<script>
  export default {
    data: () => ({
      url:'http://localhost:8000/sukusuku/',
      addurl:'',
      del:'',
      dialog: false,
      dialogDelete: false,
      search: '',
      classname:'aaa',
      headers: [
        {
          text: 'ユーザーID',
          align: 'start',
          sortable: false,
          value: 'userid',
        },
        { text: 'ユーザー名', value: 'userid__username' },
        { text: '', value: 'actions', sortable: false },
      ],
      users: [],
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
      this.classname = localStorage.getItem('selclassid')
      fetch(this.url + 'cdselc/?classid=' +  this.classname,{
          method:"GET",
          mode:"cors",
          credentials: 'include'
        }).then((res)=>res.json())
        .then(obj=>this.users=obj)
    },

    methods: {
      deleteItem (item) {
        this.delurl = this.url + 'cddel/?id=' +  item.id
        this.dialogDelete = true
      },

      deleteItemConfirm () {
        fetch(this.delurl,{
          method:"GET",
          mode:"cors",
          credentials: 'include'
        })
        .then((res)=>res.json())
        .then(obj=>this.users=obj)
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
    },
  }
</script>
