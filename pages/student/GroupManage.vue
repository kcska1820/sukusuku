<template>
  <v-data-table
    :headers="headers"
    :items="desserts"
    sort-by="groupadmin"
    class="elevation-1 ma-6"
    disable-sort
  >
    <template v-slot:top>
      <v-toolbar
        flat
      >
        <v-toolbar-title><h2>所属グループ</h2></v-toolbar-title>
        <v-divider
          class="mx-4"
          inset
          vertical
        ></v-divider>
        <v-spacer></v-spacer>
        <v-btn
          color="accent"
          small
          dark
          fab
          class="mb-1 mr-2"
          @click="getGroup"
        >
          <v-icon>mdi-restore</v-icon>
        </v-btn>
        <v-dialog
          v-model="dialog"
          max-width="500px"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              color="accent"
              small
              dark
              fab
              class="mb-1"
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
                <v-row>
                  <v-col
                    cols="12"
                  >
                    <v-text-field
                      v-model="editedItem.name"
                      label="グループ名"
                      :rules="[rules.required]"
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
          </v-form>
        </v-dialog>
        <v-dialog v-model="dialogDelete" max-width="500px">
          <v-card>
            <v-card-title class="text-h5">本当にグループから退出しますか？</v-card-title>
            <h3 class="text-center">{{editedItem.name}}</h3>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="red darken-2" text @click="closeDelete">キャンセル</v-btn>
              <v-btn color="blue darken-1" text @click="deleteItemConfirm">退出</v-btn>
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar>
    </template>
    <template v-slot:[`item.actions`]="{ item }">
    <v-btn
      color="accent"
      elevation="2"
      class="mr-6"
      @click="MemberManagebtn(item)"
    >メンバー管理</v-btn>
    <v-btn
      fab
      small
      class="ml-6"
      color="primary"
      @click="deleteItem(item)"
    >
      <v-icon
        size="2em"
      >
      mdi-logout
      </v-icon>
    </v-btn>
    </template>
    <template v-slot:no-data>
      <v-btn
        color="primary"
        @click="dialog = true"
      >
        追加
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
      dialog: false,
      dialogDelete: false,
      headers: [
        { text: 'グループ名', value: 'name', align: "center", width: '400',class: "accent"},
        { text: '', value: 'actions', sortable: false, align: "center", width: '300',class: "accent"},
      ],
      desserts: [],
      setGroup:[],
      groupurl : '',
      deleteurl:'',
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
        return this.editedIndex === -1 ? '新規グループを作成します' : 'Edit Item'
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
        if(localStorage.getItem('group') != null){
          this.setGroup = JSON.parse(localStorage.getItem('group'))
          for (let i = 0; i < this.setGroup.length; i++) {
            this.groupurl = 'https://sukusukuserver.7colordays.net/sukusuku/glsel/?groupid='+this.setGroup[i].groupid_id
            fetch(this.groupurl,{
            method:"GET",
            mode:"cors",
            credentials: 'include'
            })
            .then((res)=>res.json())
            .then(obj=>{
              this.desserts.push({
                id:this.setGroup[i].groupid_id,
                name:obj[0].groupname,
              })
            })
          }
        }
        
      },
      MemberManagebtn(item){
        localStorage.setItem('selgroupid',item.id)
        this.$router.push({path: "/student/GroupMemberManage"})
      },
      editItem (item) {
        this.editedIndex = this.desserts.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialog = true
      },

      deleteItem (item) {
        this.editedItem = Object.assign({}, item)
        const user = JSON.parse(localStorage.getItem('user'))
        this.deleteurl = 'https://sukusukuserver.7colordays.net/sukusuku/gddel/?groupid='+item.id+'&userid='+user[0].userid
        console.log(this.deleteurl)
        this.dialogDelete = true
      },

      deleteItemConfirm () {
        fetch(this.deleteurl,{
        method:"GET",
        mode:"cors",
        credentials: 'include'
        })
        .then((res)=>{
          res.json()
          this.getGroup()
        })
        .catch((reason)=>{
          console.log(reason)
        })
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

      getGroup(){
        const user = JSON.parse(localStorage.getItem('user'))
        fetch('https://sukusukuserver.7colordays.net/sukusuku/gdsel/?userid=' + user[0].userid,{
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
          this.desserts = []
          this.initialize ()
        })
      },

      save () {
        this.groupurl = 'https://sukusukuserver.7colordays.net/sukusuku/gladd/?groupname='+this.editedItem.name
        if(this.$refs.addform.validate()){
        fetch(this.groupurl,{
        method:"GET",
        mode:"cors",
        credentials: 'include'
        })
        .then((res)=>res.json())
        .then((obj)=>{
          const user = JSON.parse(localStorage.getItem('user'))
          this.groupurl='https://sukusukuserver.7colordays.net/sukusuku/gdadd/?groupid='+obj[0].groupid+'&userid='+user[0].userid
          fetch(this.groupurl,{
          method:"GET",
          mode:"cors",
          credentials: 'include'
          })
          .then((res)=>{
            res.json()
            this.getGroup()
          })
          .catch((reason)=>{
            console.log(reason)
          })
        })
        .catch((reason)=>{
          console.log(reason)
        })
        this.close()
        }
      },
    },
    /* 未ログイン時index.vueに遷移 */
    middleware:"authenicated"
  }
</script>
