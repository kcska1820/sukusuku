<template>
  <v-data-table
    :headers="headers"
    :items="events"
    :search="search"
    sort-by="groupadmin"
    class="elevation-1 ma-12"
    disable-sort
  >
    <template v-slot:top>
      <v-toolbar
        flat
      >
        <v-toolbar-title><h2>イベント管理</h2></v-toolbar-title>
        <v-divider
          class="mx-4"
          inset
          vertical
        ></v-divider>
        <v-spacer></v-spacer>
        <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          label="検索"
          single-line
          hide-details
        ></v-text-field>
        <v-dialog
          v-model="dialog"
          max-width="500px"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              color="accent"
              dark
              fab
              small
              elevation="1"
              class="mx-2"
              v-bind="attrs"
              v-on="on"
            >
          <v-icon dark>
            mdi-plus
          </v-icon>
            </v-btn>
          </template>
          <v-form ref="Eventform">
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
                    md="6"
                  >
                    <v-text-field
                      v-model="editedItem.eventname"
                      label="イベント名"
                      :rules="[rules.required,rules.limit_length_100]"
                      counter="100"
                    ></v-text-field>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="6"
                    md="6"
                  >
                    <v-text-field
                      v-model="editedItem.eventdetails"
                      label="イベント詳細"
                      :rules="[rules.limit_length_100]"
                      counter="100"
                    ></v-text-field>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col
                    cols="12"
                    sm="6"
                    md="6"
                  >
                    <p> 締め切り日時 : </p>
                    <input
                      type="date"
                      v-model="editedItem.end"
                      label="締め切り日"
                      :rules="[rules.required]"
                    />
                  </v-col>
                  <v-col
                    cols="12"
                    sm="6"
                    md="6"
                  >
                    <v-select label="クラス"
                      v-model="editedItem.clas"
                      :items="classs"
                      item-text="name"
                      item-value="id"
                      :rules="[rules.required]"
                    />
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
            <v-card-title class="text-h5">本当に削除しますか？</v-card-title>
            <h3 class="text-center">{{editedItem.title}}<v-spacer></v-spacer>{{editedItem.classid__classname}}</h3>
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
        limit_length_100: value => value.length <= 100 || "100文字以内で入力してください",
      },
      url:'https://sukusukuserver.7colordays.net/sukusuku/',
      addurl:'',
      del:'',
      dialog: false,
      dialogDelete: false,
      search:'',
      headers: [
        {
          text: 'イベント名',
          align: 'start',
          sortable: false,
          value: 'title',
          align: "center",
          class:"accent"
        },
        { text: 'イベント詳細', value: 'details', align: "center",class:"accent"},
        { text: '締め切り日', value: 'end', align: "center",class:"accent"},
        { text: 'クラス', value: 'classid__classname', align: "center",class:"accent"},
        { text: '削除', value: 'actions', sortable: false,class:"accent" }
      ],
      events: [],
      classs: [],
      editedIndex: -1,
      editedItem: {
        eventname: '',
        eventdetails: '',
        end: '',
        clas:'',
      },
      defaultItem: {
        eventname: '',
        eventdetails: '',
        end: '',
        clas:'',
      },
    }),

    computed: {
      formTitle () {
        return this.editedIndex === -1 ? '新規イベントを作成します' : 'イベント更新'
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
      fetch(this.url + 'evall/',{
        method:"GET",
        mode:"cors",
        credentials: 'include'
      }).then((res)=>res.json())
      .then(obj=>this.events=obj)

      fetch(this.url + 'clall/',{
        method:"GET",
        mode:"cors",
        credentials: 'include'
      }).then((res)=>res.json())
      .then(obj=>{   
        const classtemp = obj
        for(let i = 0; i < classtemp.length; i++) {
          this.classs.push({
            id:classtemp[i].classid,
            name:classtemp[i].classname,
          })
        }
      })
    },

    methods: {

      deleteItem (item) {
        this.editedItem = Object.assign({}, item);
        this.delurl = this.url + 'evdel/?id=' +  item.id
        this.dialogDelete = true
      },

      deleteItemConfirm () {
         fetch(this.delurl,{
          method:"GET",
          mode:"cors",
          credentials: 'include'
        })
        .then((res)=>res.json())
        .then(obj=>this.events=obj)
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
        if(this.$refs.Eventform.validate()){
          this.addurl = this.url + 'evadd/?classid='+ this.editedItem.clas + '&eventname=' + this.editedItem.eventname + '&eventdetails=' + this.editedItem.eventdetails + '&end=' + this.editedItem.end
          console.log(this.addurl)
          fetch(this.addurl,{
            method:"GET",
            mode:"cors",
            credentials: 'include'
          })
          .then((res)=>res.json())
          .then(obj=>this.events=obj)
          this.close()
        }
      },
    },
    /* 未ログイン時index.vueに遷移 */
    middleware:"authenicated"
  }
</script>
