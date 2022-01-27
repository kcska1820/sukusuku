<template>
  <div>
    <!--ここの表示方法変える必要がある-->
    <div
      v-for="(title, i) in thdata"
      :key="i"
      exact>
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
          <v-btn
            :loading="refbtn"
            :disabled="refbtn"
            class="ref"
            color="primary"
            size="0.5em"
            fab
            fixed
            right
            top
            @click="loader = 'refbtn'">
            <v-icon>mdi-reload</v-icon>
          </v-btn>
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
            v-for="(post, i) in cmdata"
            :key="i"
            exact>
            <template v-if="post.thread_id == thread">
              <BBSCom :post="post"
                :no="i + 1"
                :user="userid"
                @delete="reflesh"/>
            </template>
          </div>
        </v-list>
      </v-card>
    </div>

    <v-divider class="divide"/>

    <div class="chat">
      <v-text-field
        v-model="newComment"
        @click:append="addPost"
        @keyup.enter="addPost"
        outlined
        solo
        label="発言を入力"
        hide-details
        clearable
        append-icon="mdi-chat">
      </v-text-field>
    </div>
  </div>
</template>

<script>
  import BBSCom from '/components/BBSComment'
  export default {
    data() {
      return {
        url:'https://sukusukuserver.7colordays.net/sukusuku/',
        addurl:'',
        newComment: '',
        index:0,
        num:4,
        user:[],
        userid:'',
        loader:null,
        refbtn:false,
        thdata:[],
        cmdata:[],
        thread:this.$route.query.id,
      }
    },

    created () {
      if (this.thread.match(/^\d+$/)) {
        fetch(this.url + 'thsel/?threadid=' + this.thread,{
          method:"GET",
          mode:"cors",
          credentials: 'include'
        }).then((res)=>res.json())
        .then(obj=>this.thdata=obj)

        fetch(this.url + 'cmsel/?threadid=' + this.thread,{
          method:"GET",
          mode:"cors",
          credentials: 'include'
        }).then((res)=>res.json())
        .then(obj=>this.cmdata=obj)
      }else{
        this.$router.push('/BBS')
      }
    },

    mounted () {
    this.user = JSON.parse(localStorage.getItem('user'))
    this.userid = this.user[0].userid
    },

    watch: {
      loader() {
        if (this.loader != null){
          const l = this.loader
          this[l] = !this[l]

          setTimeout(() => (this[l] = false), 3000)
          this.reflesh()

          this.loader = null
        }
      },
    },
    
    methods: {
      addPost(){
        if (this.newComment == "" || /^\s+$/.test(this.newComment)) {
          alert("文章が入力されていません")
        }else if (this.thdata[0].flag != 1){
          alert("この掲示板は現在書き込みできません")
        }else{
          //IDは自動付与される筈
          this.addurl = this.url + 'cmadd/?thread=' + this.thread + '&user=' + this.userid + '&comment=' + this.newComment + '&flag=True'
          fetch(this.addurl,{
            method:"GET",
            mode:"cors",
            credentials: 'include'
          }).then((res)=>res.json())
          .then(obj=>this.cmdata=obj)
          this.newComment = ''
        }
      },

      reflesh(){
        fetch(this.url + 'cmsel/?threadid=' + this.thread,{
          method:"GET",
          mode:"cors",
          credentials: 'include'
        }).then((res)=>res.json())
        .then(obj=>this.cmdata=obj)
      },
    },
    components:{
      BBSCom
    },
    middleware:"authenicated"
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
  .ref {
    margin-top:60px;
  }
  .custom-loader {
    animation: loader 1s infinite;
    display: flex;
  }
  @-moz-keyframes loader {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }
  @-webkit-keyframes loader {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }
  @-o-keyframes loader {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }
  @keyframes loader {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }
</style>