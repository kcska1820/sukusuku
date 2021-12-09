<template>
  <v-card color="accent">
    <v-card-title>
      <v-icon
        size="2em">
        mdi-message-text
      </v-icon>
      <h2>
        掲示板
      </h2>
      <v-dialog
        v-model="sinsei"
        max-width="500px">
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            color="primary"
            dark
            fab
            absolute
            right
            v-bind="attrs"
            v-on="on">
            <v-icon>mdi-plus</v-icon>
          </v-btn>
        </template>
        <v-card>
          <v-card-title>
            <span class="text-h5">掲示板の追加申請</span>
          </v-card-title>

          <v-card-text>
            <v-container>
              <v-row>
                <v-text-field
                  v-model="editedItem.title"
                  label="掲示板タイトル"
                ></v-text-field>
              </v-row><v-row>
                <v-textarea
                  v-model="editedItem.comment"
                  label="備考"
                  outlined>
                </v-textarea>
              </v-row>
            </v-container>
          </v-card-text>
          <v-card-actions>
            <v-spacer/>
            <v-btn
              color="red darken-2"
              text>
              キャンセル
            </v-btn>
            <v-btn
              color="blue darken-1"
              text
              @click="save">
              申請
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-card-title>
    <v-row class="d-flex justify-end">
      <v-col cols="12" sm="5" class="px-6">
        <v-toolbar floating>
          <v-row>
            <!--検索欄-->
            <v-col cols="12" class="pr-7">
              <v-text-field
                v-model="searchtxt"
                @keyup.enter="search"
                clearable
                append-icon="mdi-magnify">
              </v-text-field>
            </v-col>
          </v-row>
        </v-toolbar>
      </v-col>
    </v-row>
    <v-divider/>
    <br>
    <!--itemsをthdataにする-->
    <div
      v-for="item in items"
      :key="item.id"
      router
      exact>
      <v-col>
        <BBSCard :item="item"/>
      </v-col>
    </div>
  </v-card>
</template>
<script>
import items from '/components/threadList.json'
import BBSCard from '/components/BBSCard'
import searchsup from '/components/searchSup'
export default {
  data:() => ({
    url:'http://localhost:8000/sukusuku/',
    addurl:'',
    srcurl:'',
    sinsei:false,
    touketu:false,
    kaijo:false,
    searchtxt:'',
    sql:'',
    items:items,
    thdata:[],
    editedIndex: -1,
    editedItem:{
      title:'',
      note:'',
    },
    defaultItem:{
      title:'',
      note:'',
    },
  }),

  components: {
      BBSCard
  },

  watch: {
    sinsei (val) {
      val || this.sclose()
    },
    touketu (val) {
      val || this.tclose()
    },
    kaijo (val) {
      val || this.kclose()
    },
  },
  
  created () {
    //stselを掲示板一覧取得に変える
    console.log(this.url + 'thsel')
    /*fetch(this.url + 'thsel/',{
      method:"GET",
      mode:"cors",
      credentials: 'include'
    }).then((res)=>res.json())
    .then(obj=>this.thdata=obj)*/
  },

  methods: {
    search (){
      this.sql = searchsup(this.searchtxt, 'title')
      this.srcurl = this.url + 'thsrc' + this.sql.sql
      console.log(this.srcurl)
      /*fetch(this.srcurl ,{
        method:"GET",
        mode:"cors",
        credentials: 'include'
      }).then((res)=>res.json())
      .then(obj=>this.thdata=obj)*/
    },

    save () {
      this.addurl = this.url + 'thadd/?title=' + this.editedItem.title + '&flag=0' + '&note=' + this.editedItem.note + '&master=st00000001'
      console.log(this.addurl)
      /*fetch(this.addurl,{
        method:"GET",
        mode:"cors",
        credentials: 'include'
      })
      .then((res)=>res.json())
      .then(obj=>this.thdata=obj)*/
      this.sclose()
    },

    sclose (){
      this.sinsei = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },

    tclose (){
      this.touketu = false
      this.$nextTick(() => {
      this.editedItem = Object.assign({}, this.defaultItem)
      this.editedIndex = -1
      })
    },

    kclose (){
      this.kaijo = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },
  }
}
</script>