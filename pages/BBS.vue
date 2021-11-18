<template>
  <v-card color="accent">
    <v-card-title>
      <v-icon
        size="1.5em">
        mdi-message-text
      </v-icon>
      掲示板
      <v-dialog
        v-model="sinsei"
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
              @click="sclose"
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
    <!--threadList表示-->
    <div
      v-for="(item, i) in items"
      :key="i"
      :to="item.to"
      router
      exact>
      <template v-if="item.flag == 1">
        <v-col>
          <v-card>
            <v-btn
              text
              large
              :to="{
                path:'/BBScon',
                query:{
                  id:item.id
                }
                }">
              {{item.title}}
            </v-btn>
            <template v-if="item.master == 'st00000001'">
              <!--ログイン中ユーザなら削除ボタンの表示-->
              <v-dialog
                v-model="touketu"
                max-width="500px"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-btn
                    absolute
                    right
                    large
                    v-bind="attrs"
                    v-on="on"
                  >
                    凍結
                  </v-btn>
                </template>
                <v-card>
                  <v-card-title>
                    <span class="text-h5">掲示板を凍結し、非表示にします。<br>よろしいですか？</span>
                  </v-card-title>

                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn
                      color="red darken-2"
                      text
                      @click="tclose"
                    >
                      キャンセル
                    </v-btn>
                    <v-btn
                      color="blue darken-1"
                      text
                      @click="save"
                    >
                      凍結
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
            </template>
          </v-card>
        </v-col>
      </template>
      <template v-else-if="item.flag == 2">
        <v-col>
          <v-card>
            <v-btn
              text
              large
              :to="{
                path:'/BBScon',
                query:{
                  id:item.id
                }
                }">
              {{item.title}}:<font color="red">凍結中</font>
            </v-btn>
            <template v-if="item.master == 'st00000001'">
              <!--ログイン中ユーザなら解除ボタンの表示-->
              <v-dialog
                v-model="kaijo"
                max-width="500px"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-btn
                    absolute
                    right
                    large
                    v-bind="attrs"
                    v-on="on"
                  >
                    凍結解除
                  </v-btn>
                </template>
                <v-card>
                  <v-card-title>
                    <span class="text-h5">掲示板の凍結を解除しますか？</span>
                  </v-card-title>

                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn
                      color="red darken-2"
                      text
                      @click="kclose"
                    >
                      キャンセル
                    </v-btn>
                    <v-btn
                      color="blue darken-1"
                      text
                      @click="save"
                    >
                      解除
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
            </template>
          </v-card>
        </v-col>
      </template>
    </div>
  </v-card>
</template>


<script>
  import items from '/components/threadList.json'
  export default {
    data:() => ({
        sinsei:false,
        touketu:false,
        kaijo:false,
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
      sinsei (val) {
        val || this.sclose()
      },
      touketu (val) {
        val || this.tclose()
      },
      sakujo (val) {
        val || this.kclose()
      },
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
      sclose () {
        this.sinsei = false
        this.$nextTick(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        })
      },

      tclose () {
        this.touketu = false
      },

      kclose () {
        this.kaijo = false
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
        this.sclose()
      },
    }
  }
</script>

<style scoped>
</style>