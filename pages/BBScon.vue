<template>
  <div>
    <div
      v-for="(title, i) in threads"
      :key="i"
      exact>
      <template v-if="title.id == thread">
        <v-card>
          <!--ここ増やす-->
          <template v-if="title.flag == '0'">
            <h1>
              <v-icon
                size="1.5em">
                mdi-message-text
              </v-icon>
              掲示板-未承認
            </h1>
          </template>
          <template v-else-if="title.flag == '1'">
            <h1>
              <v-icon
                size="1.5em">
                mdi-message-text
              </v-icon>
              掲示板
            </h1>
          </template>
          <template v-else-if="title.flag == '2'">
            <h1>
              <v-icon
                size="1.5em">
                mdi-message-text
              </v-icon>
              掲示板-凍結中
            </h1>
          </template>
          <template v-else-if="title.flag == '3'">
            <h1>
              <v-icon
                size="1.5em">
                mdi-message-text
              </v-icon>
              掲示板-削除済み
            </h1>
          </template>
          <v-card color="accent">
            <v-toolbar
              color="accent"
              elevation="0">
              <v-toolbar-title>
                {{title.title}}
              </v-toolbar-title>
            </v-toolbar>
          </v-card>

          <v-list>
            <!--展開中のidに適合するコメントだけ回収したい-->
            <div
              v-for="(post, i) in items"
              :key="i"
              exact>
              <template v-if="post.thread === thread">
                <BBSCom :post="post"
                  :no="i + 1"/>
              </template>
            </div>
          </v-list>

        </v-card>
      </template>
    </div>

    <v-divider class="divide"/>

    <div class="chat">
      <v-text-field
        v-model="newComment"
        @click:append="addPost"
        @keyup.enter="addPost"
        outlined
        filled
        label="発言を入力"
        hide-details
        clearable
        append-icon="mdi-chat">
      </v-text-field>
    </div>
  </div>
</template>

<script>
  import items from '/components/thcontent.json'
  import threads from '/components/threadList.json'
  import BBSCom from '/components/BBSComment'
  export default {
    data() {
      return {
        url:'http://localhost:8000/sukusuku/',
        addurl:'',
        newComment: '',
        index:0,
        num:4,
        cmdata:[],
        thread:this.$route.query.id,
        items:items,
        threads:threads
      }
    },

    created () {
      if (this.thread.match(/^\d+$/)) {
        //stselをコメント一覧取得に変える
        //select時に掲示板IDを指定したい
        console.log(this.url + 'cmsel/')
        /*fetch(this.url + 'stsel/',{
          method:"GET",
          mode:"cors",
          credentials: 'include'
        }).then((res)=>res.json())
        .then(obj=>this.cmdata=obj)*/
      }else{
        this.$router.push('/BBS')
      }

    },
    
    methods: {
      addPost(){
        if (this.newComment == "" || /^\s+$/.test(this.newComment)) {
          alert("文章が入力されていません")
        }else{
          //IDは自動付与される筈
          this.addurl = this.url + 'cmadd/?thread=' + this.thread + '&user=st00000001&name=seito&comment=' + this.newComment + '&flag=true'
          console.log(this.addurl)
          /*fetch(this.addurl,{
            method:"GET",
            mode:"cors",
            credentials: 'include'
          }).then((res)=>res.json())
          .then(obj=>this.cmdata=obj)*/
          this.$router.go({path: this.$router.currentRoute.path, force:true})
        }
      },
    },
    components:{
      BBSCom
    }
  }
</script>

<style scoped>
  .thread {
    padding:10px 1em 0 0.5em;
  }
  .comment {
    padding:0 1em 0 1em;
  }
  .divide {
    margin:8px;
  }
  .chat {
    position:sticky;
    bottom:60px;
    background-color: #FFF;
  }
</style>