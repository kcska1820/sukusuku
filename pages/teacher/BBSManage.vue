<template>
  <v-data-table
    :headers="headers"
    :items="thdata"
    sort-by="groupadmin"
    class="elevation-1 ma-12"
    disable-sort
  >
    <template 
      v-slot:top
    >
      <v-toolbar 
        flat
      >
        <v-toolbar-title>
          <h2>
            承認済みスレッド管理
          </h2>
        </v-toolbar-title>
        <v-divider 
          class="mx-4" 
          inset vertical
        >
        </v-divider>
        <v-spacer></v-spacer>
        <v-dialog 
          v-model="dialog" 
          max-width="500px"
        >
          <template 
            v-slot:activator="{ on, attrs }"
          >
            <v-btn
              color="accent"
              dark
              fab
              small
              elevation="1"
              v-bind="attrs"
              v-on="on"
            >
              <v-icon 
                dark
              > 
              mdi-plus 
              </v-icon>
            </v-btn>
          </template>
          <v-form 
            ref="BBSaddform" 
            v-model="valid" 
            lazy-validation
          >
            <v-card>
              <v-card-title>
                <span 
                  class="text-h5"
                >
                {{ formTitle }}
                </span>
              </v-card-title>

              <!--ここから変更-->
              <v-card-text>
                <v-container>
                  <v-row>
                    <v-text-field
                      v-model="editedItem.title"
                      label="スレッドタイトル"
                      :rules="[rules.required]"
                    ></v-text-field> 
                    </v-row>
                    <v-row>
                    <v-textarea 
                      v-model="editedItem.note" 
                      label="備考" 
                      outlined
                    >
                    </v-textarea>
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
        <v-dialog 
          v-model="dialogDelete" 
          max-width="500px"
        >
          <v-card>
            <v-card-title 
              class="text-h5"
            >
            スレッドを本当に非表示にしますか？
            </v-card-title>
            <h3 
              class="text-center"
            >
            {{ editedItem.title }}
            </h3>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn 
                color="red darken-2" 
                text 
                @click="closeDelete"
              >
              キャンセル
              </v-btn>
              <v-btn 
                color="blue darken-1" 
                text 
                @click="blindItemConfirm"
              >
              非表示
              </v-btn>
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <v-dialog 
          v-model="dialogUnblind" 
          max-width="500px"
        >
          <v-card>
            <v-card-title 
              class="text-h5"
            >
            このスレッドを再表示しますか？
            </v-card-title>
            <h3 
              class="text-center"
            >
            {{ editedItem.title }}
            </h3>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn 
                color="red darken-2" 
                text 
                @click="closeUnblind"
              >
              キャンセル
              </v-btn>
              <v-btn 
                color="blue darken-1" 
                text 
                @click="unblindItemConfirm"
              >
              再表示
              </v-btn>
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar>
    </template>
    <template 
      v-slot:[`item.flag`]="flag"
    >
      <template 
        v-if="flag.item.flag == '1'"
      > 
      通常 
      </template>
      <template 
        v-else-if="flag.item.flag == '2'"
      > 凍結中 
      </template>
      <template 
        v-else-if="flag.item.flag == '3'"
      > 
      非表示 
      </template>
    </template>
    <template 
      v-slot:[`item.actions`]="{ item }"
    >
      <v-btn
        fab
        small
        v-if="item.flag == '1' || item.flag == '2'"
        color="primary"
      >
        <v-icon 
          @click="blindItem(item)" 
          size="2em"
        > 
        mdi-eye-outline 
        </v-icon>
      </v-btn>
      <v-btn 
        fab 
        small 
        v-if="item.flag == '3'" 
        color="gray"
      >
        <v-icon 
          @click="unblindItem(item)" 
          size="2em"
        >
        mdi-eye-off-outline
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
      },
      url:'https://sukusukuserver.7colordays.net/sukusuku/',
      delurl:'',
      valid:true,
      dialog: false,
      dialogDelete: false,
      dialogUnblind: false,
      user:[],
      userid:'',
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
        { text: 'スレッドタイトル', value: 'title', align: "center", width: '150',class:"accent"},
        { text: '備考', value: 'note', align: "center", width: '200',class:"accent"},
        { text: '申請者', value: 'master_id', align: "center", width: '200',class:"accent"},
        { text: '状態', value: 'flag', align: "center", width: '100',class:"accent",filter: value => {
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
        master_id: '',
        flag: ''
      },
      defaultItem: {
        id: '',
        title: '',
        note: '',
        master_id: '',
        flag: ''
      },
    }),

    computed: {
      formTitle () {
        return this.editedIndex === -1 ? 'スレッドを作成します' : 'Edit Item'
      },
    },

    watch: {
      dialog (val) {
        val || this.close()
      },
      dialogDelete (val) {
        val || this.closeDelete()
      },
      dialigUnblind (val) {
        val || this.closeUnblind()
      }
    },

    created () {
      this.initialize()
    },

    methods: {
      initialize () {
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

      blindItem (item) {
        this.editedIndex = this.desserts.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialogDelete = true
      },

      unblindItem (item) {
        this.editedIndex = this.desserts.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialogUnblind = true
      },

      /* 非表示 */
      blindItemConfirm () {
        this.delurl = this.url + 'thdel/?threadid=' + this.editedItem.threadid + '&title=' + this.editedItem.title + '&flag=3' + '&note=' + this.editedItem.note + '&master=' + this.editedItem.master_id + '&latest=' + this.editedItem.latest + '&details=が非表示にされました'
        fetch(this.delurl,{
          method:"GET",
          mode:"cors",
          credentials: 'include'
        }).then((res)=>res.json())
        .then(obj=>this.thdata=obj)
        this.closeDelete()
      },

      /* 表示 */
      unblindItemConfirm () {
        this.delurl = this.url + 'thdel/?threadid=' + this.editedItem.threadid + '&title=' + this.editedItem.title + '&flag=1' + '&note=' + this.editedItem.note + '&master=' + this.editedItem.master_id + '&latest=' + this.editedItem.latest + '&details=が表示されました'
        fetch(this.delurl,{
          method:"GET",
          mode:"cors",
          credentials: 'include'
        }).then((res)=>res.json())
        .then(obj=>this.thdata=obj)
        this.closeUnblind()
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

      closeUnblind () {
        this.dialogUnblind = false
        this.$nextTick(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        })
      },

      save () {
        if(this.$refs.BBSaddform.validate()){
        this.user = JSON.parse(localStorage.getItem('user'))
        this.userid = this.user[0].userid
        this.addurl = this.url + 'thadd/?title=' + this.editedItem.title + '&flag=1' + '&note=' + this.editedItem.note + '&master=' + this.userid +'&details=が作成されました'
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
  middleware:"authenicated"
  }
</script>
