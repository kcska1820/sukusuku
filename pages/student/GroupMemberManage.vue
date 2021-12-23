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
        <v-toolbar-title><h2>{{groupname}}&emsp;メンバー管理</h2></v-toolbar-title>
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
          <v-form ref="addform" @submit.prevent>
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
                  @keyup.enter="save"
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
                @keyup.enter="enter"
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
            <h3 class="text-center">{{editedItem.name}}</h3>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="red darken-2" text @click="closeDelete">キャンセル</v-btn>
              <v-btn color="blue darken-1" text @click="deleteItemConfirm">削除</v-btn>
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <v-dialog v-model="dialogMatch" max-width="500px">
          <v-card>
            <v-card-title class="text-h5 justify-center">既に登録されています</v-card-title>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="red darken-2" text @click="closeDelete">閉じる</v-btn>
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
      dialogMatch: false,
      headers: [
        { text: 'ユーザーID',align: 'start',sortable: false,value: 'id',align: "center",width: '200',class: "accent"},
        { text: 'ユーザー名', value: 'name', align: "center", width: '400',class: "accent"},
        { text: '', value: 'actions', sortable: false, align: "center", width: '300',class: "accent"},
      ],
      desserts: [],
      user:[],
      match: '',
      groupname:'',
      selectgroupid:'',
      editedIndex: -1,
      editedItem: {
        id: '',
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

    mounted () {
      this.initialize()
    },

    methods: {
      initialize () {
        this.desserts = []
        this.user = []
        this.selectgroupid = localStorage.getItem('selgroupid')
        const url = 'http://localhost:8000/sukusuku/glsel/?groupid=' + this.selectgroupid
        fetch(url,{
        method:"GET",
        mode:"cors",
        credentials: 'include'
        })
        .then((res)=>res.json())
        .then(obj=>{
          this.groupname = obj[0].groupname
        })
        const selurl = 'http://localhost:8000/sukusuku/gdall/?groupid=' + this.selectgroupid
        fetch(selurl,{
        method:"GET",
        mode:"cors",
        credentials: 'include'
        })
        .then((res)=>res.json())
        .then(obj=>{
          for(let i = 0; i < obj.length; i++){
            const selurl = 'http://localhost:8000/sukusuku/stsel2/?userid=' + obj[i].userid_id
            fetch(selurl,{
            method:"GET",
            mode:"cors",
            credentials: 'include'
            })
            .then((res)=>res.json())
            .then((obj)=>{
              this.desserts.push({
                id:obj[0].userid,
                name:obj[0].username
              })
            })
          }
        })
      },

      editItem (item) {
        this.editedIndex = this.desserts.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialog = true
      },

      deleteItem (item) {
        this.editedItem = Object.assign({}, item)
        this.dialogDelete = true
      },

      deleteItemConfirm () {
        const url = 'http://localhost:8000/sukusuku/gddel/?groupid=' + this.selectgroupid +'&userid=' + this.editedItem.id
        console.log(url)
        fetch(url,{
        method:"GET",
        mode:"cors",
        credentials: 'include'
        })
        .then((res)=>{
          res.json()
          const user = JSON.parse(localStorage.getItem('user'))
          if(user[0].userid == this.editedItem.id){
            this.getGroup()
            this.$router.push("/student/GroupManage")
          }else{
            this.initialize()
          }
        })
        this.closeDelete()
      },

      getGroup(){
        const user = JSON.parse(localStorage.getItem('user'))
        fetch('http://localhost:8000/sukusuku/gdsel/?userid=' + user[0].userid,{
          method:"GET",
          mode:"cors",
          credentials: 'include'
        })
        .then(response => {
        if (response.ok) {
            return response.json();
        }       // 404 や 500 ステータスならここに到達する
        throw new Error('Network response was not ok.');
        })
        .then(resJson => {
          localStorage.setItem('group',JSON.stringify(resJson))
        })
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
        this.dialogMatch = false
      },

      save () {
        this.match = false
        for(let i=0; i<this.desserts.length;i++){
          if(this.editedItem.id == this.desserts[i].id){
            this.match = true
          }
        }
        if(this.match == false){
          if(this.$refs.addform.validate()){
          const url = 'http://localhost:8000/sukusuku/gdadd/?groupid=' + this.selectgroupid +'&userid=' + this.editedItem.id
          fetch(url,{
          method:"GET",
          mode:"cors",
          credentials: 'include'
          })
          .then((res)=>{
            res.json()
            this.initialize()
          })
          .catch((error)=>{
            console.log(error)
          })
          this.close()
          }
        }else{
          this.dialogMatch = true
        }
      },
      enter(event){
        if(event.keycode !== 13){
          retrun
        }else{
          this.save()
        }

      }
    },
  }
</script>
