<template>
  <v-data-table
    :headers="headers"
    :items="thdata"
    sort-by="groupadmin"
    class="elevation-1 ma-12"
    disable-sort
  >
    <template v-slot:top>
      <v-toolbar
        flat
      >
        <v-toolbar-title><h2>承認済みトピック管理</h2></v-toolbar-title>
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
          <v-form
            ref="BBSaddform"
            v-model="valid"
            lazy-validation>
            <v-card>
              <v-card-title>
                <span class="text-h5">{{ formTitle }}</span>
              </v-card-title>

              <!--ここから変更-->
              <v-card-text>
                <v-container>
                  <v-row>
                    <v-text-field
                      v-model="editedItem.title"
                      label="掲示板タイトル"
                      :rules="[rules.required]"/>
                  </v-row><v-row>
                    <v-textarea
                      v-model="editedItem.note"
                      label="備考"
                      outlined/>
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
                  :disabled="!valid"
                  color="blue darken-1"
                  text
                  @click="save">
                  作成
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
    >
      <v-icon
        @click="deleteItem(item)"
        size="2em"
      >
        mdi-delete
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
      rules: {
        required: value => !!value || 'こちらは必須項目です',
      },
      url:'http://localhost:8000/sukusuku/',
      delurl:'',
      valid:true,
      dialog: false,
      dialogDelete: false,
      headers: [
        {
          text: 'ID',
          align: 'start',
          sortable: false,
          value: 'threadid',
          align: "center",
          width: '30',
          class:"accent"
        },
        { text: '話題', value: 'title', align: "center", width: '150',class:"accent"},
        { text: '備考', value: 'note', align: "center", width: '200',class:"accent"},
        { text: '申請者', value: 'master_id', align: "center", width: '200',class:"accent"},
        { text: '状態', value: 'flag', align: "center", width: '50',class:"accent",filter: value => {
          return value != "0"
        }},
        { text: '', value: 'actions', sortable: false, align: "center", width: '100',class:"accent"},
      ],
      desserts: [],
      thdata: [],
      editedIndex: -1,
      editedItem: {
        id: '',
        title: '',
        note: '',
        master: '',
        flag: ''
      },
      defaultItem: {
        id: '',
        title: '',
        note: '',
        master: '',
        flag: ''
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
        console.log(this.url + 'thsel')
        fetch(this.url + 'thsel/',{
          method:"GET",
          mode:"cors",
          credentials: 'include'
        }).then((res)=>res.json())
        .then(obj=>this.thdata=obj)
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
        this.delurl = this.url + 'thdel/?threadid=' + this.editedItem.threadid + '&title=' + this.editedItem.title + '&flag=3' + '&note=' + this.editedItem.note + '&master=st00000001'
          console.log(this.delurl)
          fetch(this.delurl,{
            method:"GET",
            mode:"cors",
            credentials: 'include'
          }).then((res)=>res.json())
          .then(obj=>this.thdata=obj)
        this.closeDelete()
        this.$router.go({path: this.$router.currentRoute.path, force:true})
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
        if(this.$refs.BBSaddform.validate()){
        this.addurl = this.url + 'thadd/?title=' + this.editedItem.title + '&flag=1' + '&note=' + this.editedItem.note + '&master=st00000001'
        console.log(this.addurl)
        fetch(this.addurl,{
          method:"GET",
          mode:"cors",
          credentials: 'include'
        })
        .then((res)=>res.json())
        .then(obj=>this.thdata=obj)
        if (this.editedIndex > -1) {
          Object.assign(this.desserts[this.editedIndex], this.editedItem)
        } else {
          this.desserts.push(this.editedItem)
        }
        this.close()
        }
      },
    },
  }
</script>
