<template>
  <v-data-table
    :headers="headers"
    :items="classs"
    :search="search"
    sort-by="classadmin"
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
            クラス管理
          </h2>
        </v-toolbar-title>
        <v-divider 
          class="mx-4" 
          inset vertical
        >
        </v-divider>
        <v-spacer></v-spacer>
        <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          label="クラスを検索"
          single-line
          hide-details
        >
        </v-text-field>
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
              class="mx-2"
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
            ref="classaddform"
          >
            <v-card>
              <v-card-title>
                <span 
                  class="text-h5"
                >
                {{ formTitle }}
                </span>
              </v-card-title>

              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col 
                      cols="12" 
                      sm="6" 
                      md="6"
                    >
                      <v-text-field
                        v-model="editedItem.id"
                        label="クラスID"
                        counter="10"
                        :rules="[rules.required, rules.max]"
                      >
                      </v-text-field>
                    </v-col>
                    <v-col 
                      cols="12" 
                      sm="6" 
                      md="6"
                    >
                      <v-text-field
                        v-model="editedItem.name"
                        label="クラス名"
                        counter="100"
                        :rules="[rules.required, rules.limit_length_100]"
                      >
                      </v-text-field>
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
            本当に削除しますか？
            </v-card-title>
            <h3 
              class="text-center"
            >
              {{ editedItem.classid }}
            <v-spacer></v-spacer>
              {{ editedItem.classname }}
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
                @click="deleteItemConfirm"
              >
              削除
              </v-btn>
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar>
    </template>
    <template 
      v-slot:[`item.actions`]="{ item }"
    >
      <v-btn 
        color="accent" 
        elevation="2" 
        class="mr-2" 
        @click="selclassid(item)"
      >
      メンバー管理
      </v-btn>
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
      url:'https://sukusukuserver.7colordays.net/sukusuku/',
      addurl:'',
      delurl:'',
         rules: {
          required: value => !!value || 'こちらは必須項目です',
          max: value => (value && value.length <= 10) || '10文字以下で入力してください',
          limit_length_100: value => value.length <= 100 || "100文字以内で入力してください",
      },
      dialog: false,
      dialogDelete: false,
      search: "",
      headers: [
        {
          text: 'クラスID',
          align: 'start',
          sortable: false,
          value: 'classid',
          align: "center",
          width: '200',
          class: "accent"        
        },
        { text: 'クラス名', value: 'classname', align: "center", width: '400',class: "accent"},
        { text: '', value: 'actions', sortable: false, align: "center", width: '300',class: "accent"},
      ],
      classs: [],
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
        return this.editedIndex === -1 ? '新規クラスを作成します' : 'Edit Item'
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
      fetch(this.url + 'clall/',{
          method:"GET",
          mode:"cors",
          credentials: 'include'
        }).then((res)=>res.json())
        .then(obj=>this.classs=obj)
    },

    methods: {
      selclassid(item){
        localStorage.setItem('selclassid',item.classid)
        this.$router.push({path: "/teacher/ClassMemberManage"})
      },

      deleteItem (item) {
        this.editedItem = Object.assign({}, item);
        this.delurl = this.url + 'cldel/?classid=' +  item.classid
        this.dialogDelete = true 
      },

      deleteItemConfirm () {
        fetch(this.delurl,{
          method:"GET",
          mode:"cors",
          credentials: 'include'
        })
        .then((res)=>res.json())
        .then(obj=>this.classs=obj)
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
        if(this.$refs.classaddform.validate()){
          this.addurl = this.url + 'cladd/?classid=' + this.editedItem.id + '&classname=' + this.editedItem.name
          console.log(this.addurl)
          fetch(this.addurl,{
            method:"GET",
            mode:"cors",
            credentials: 'include'
          })
          .then((res)=>res.json())
          .then(obj=>this.classs=obj)
          this.close()
        }
      },
    },
    /* 未ログイン時index.vueに遷移 */
    middleware:"authenicated"
  }
</script>
