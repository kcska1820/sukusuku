<template>
  <v-card color="accent">
    <v-card-title>
      <v-icon
        size="1.5em">
        mdi-message-text
      </v-icon>
      掲示板
      <v-dialog
        v-model="dialog"
        max-width="500px"
      >
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            color="primary"
            dark
            fab
            absolute
            right
            v-bind="attrs"
            v-on="on"
          >
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
                  outlined
                ></v-textarea>
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
              申請
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-card-title>
    <div
      v-for="(item, i) in items"
      :key="i"
      :to="item.to"
      router
      exact>
      <template v-if="item.flag == 0">
        <v-col>
          <v-card>
            <v-btn
              text
              block
              large>
                {{item.title}}:<font color="red">申請許可済</font>
            </v-btn>
              <!--ここにダイアログを追加する-->
          </v-card>
        </v-col>
      </template>
      <template v-else-if="item.flag == 1">
        <v-col>
          <v-card>
            <v-btn
              text
              block
              large
              :to="{
                path:'/BBScon',
                query:{
                  id:item.id
                }
                }">
              {{item.title}}
            </v-btn>
          </v-card>
        </v-col>
      </template>
      <template v-else-if="item.flag == 2">
        <v-col>
          <v-card>
            <v-btn
              text
              block
              large
              :to="{
                path:'/BBScon',
                query:{
                  id:item.id
                }
                }">
              {{item.title}}:<font>凍結中</font>
            </v-btn>
          </v-card>
        </v-col>
      </template>
      <template v-else-if="item.flag == 3">
        <v-col>
          <v-card>
            <v-btn
              text
              block
              large
              :to="{
                path:'/BBScon',
                query:{
                  id:item.id
                }
                }">
              {{item.title}}<font>削除済</font>
            </v-btn>
          </v-card>
        </v-col>
      </template>
    <v-divider></v-divider>
    </div>
  </v-card>
</template>

<script>
  import items from '/components/threadList.json'
  export default {
    data:() => ({
        dialog:false,
        items:items,
        desserts:[],
        editedIndex: -1,
        editedItem:{
          title:'',
          comment:'',
        },
        defaultItem:{
          title:'',
          comment:'',
        },
      }),

    watch: {
      dialog (val) {
        val || this.close()
      }
    },

    created () {
      fetch(this.url,{
          method:"GET",
          mode:"cors",
          credentials: 'include'
        }).then((res)=>res.json())
        .then(obj=>this.desserts=obj)
    },

    methods: {
      close () {
        this.dialog = false
        this.$nextTick(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        })
      },

      save () {
        this.addurl = this.url + 'stadd/?title=' + this.editedItem.title + '&comment=' + this.editedItem.comment
        console.log(this.addurl)
        fetch(this.addurl,{
          method:"GET",
          mode:"cors",
          credentials: 'include'
        })
        .then((res)=>res.json())
        .then(obj=>this.desserts=obj)
        this.close()
      },
    }
  }
</script>

<style scoped>
</style>