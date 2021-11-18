<template>
  <div>
    <v-card color="accent">
      <div
        v-for="(title, i) in threads"
        :key="i"
        exact>
            <template v-if="title.id == thread">
              <!--ここ増やす-->
              <template v-if="title.flag == 0">
                <v-card-title>
                  <v-icon
                    size="1.5em">
                    mdi-message-text
                  </v-icon>
                  掲示板-未承認
                </v-card-title>
              </template>
              <template v-else-if="title.flag == 1">
                <v-card-title>
                  <v-icon
                    size="1.5em">
                    mdi-message-text
                  </v-icon>
                  掲示板
                </v-card-title>
              </template>
              <template v-else-if="title.flag == 2">
                <v-card-title>
                  <v-icon
                    size="1.5em">
                    mdi-message-text
                  </v-icon>
                  掲示板-凍結中
                </v-card-title>
              </template>
              <template v-else-if="title.flag == 3">
                <v-card-title>
                  <v-icon
                    size="1.5em">
                    mdi-message-text
                  </v-icon>
                  掲示板-削除済み
                </v-card-title>
              </template>

            </template>
            
      </div>
    </v-card>
    <v-list>
      <div
        v-for="(post, i) in items"
        :key="i"
        exact>
        <template v-if="post.thread == thread">
            <template v-if="post.flag == true">
              <p class="thread">{{index += 1}}:{{post.name}}</p>
                <template v-if="post.user == 'st00000001'">
                  <!--ログイン中ユーザなら削除ボタンの表示-->
                  <v-btn
                    absolute
                    right>
                    削除
                  </v-btn>
                </template>
              <p class="comment">{{post.comment}}</p>
            </template>
            <template v-else-if="post.user == 'st00000001'">
              <!--削除コメントがログイン中ユーザなら(削除済)込みで表示-->
              <p class="thread">{{index += 1}}:{{post.name}} (削除済)</p>
              <p class="comment">{{post.comment}}</p>
            </template>
        </template>
      </div>
    </v-list>

    <v-divider class="divide"></v-divider>

    <v-text-field
      v-model="newComment"
      @click:append="addPost"
      @keyup.enter="addPost"
      outlined
      label="発言を入力"
      hide-details
      clearable
      append-icon="mdi-chat"
    >
    </v-text-field>
  </div>
</template>

<script>
  import items from '/components/thcontent.json'
  import threads from '/components/threadList.json'
  export default {
    data() {
      return {
        newComment: '',
        num:4,
        index:0,
        thread:Number(this.$route.query.id),
        items:items,
        threads:threads
      }
    },
    methods: {
      addPost(){
        if (this.newComment == "" || /^\s+$/.test(this.newComment)) {
          alert("文章が入力されていません")
        }else{
          let newPost = [
            {
              id: this.index += 1,
              thread:this.thread,
              user:"st00000001",
              name:"新規",
              comment: this.newComment,
              flag:true
            }
          ]
          this.items.push(newPost)
          this.newComment = ''
        }
      }
    },
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
</style>