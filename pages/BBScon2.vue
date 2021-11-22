<template>
  <div>
    <h1>
        <v-icon size="1em">mdi-message-text</v-icon>
        掲示板
    </h1>
    <v-card>
        <div
            v-for="(title, i) in threads"
            :key="i"
            exact
        >
            <div v-if="title.id == thread">
                <v-toolbar
                    color="accent"
                    elevation="0"
                >
                    <v-toolbar-title>
                        {{title.title}}
                    </v-toolbar-title>
                </v-toolbar>
            </div>
        </div>
        <v-list>
            <div
                v-for="(post, i) in items"
                :key="i"
                exact
            >
                <div v-if="post.thread == thread">
                    <div v-if="post.flag == true">
                        <v-list-item-title class="thread">{{index += 1}}:{{post.name}}</v-list-item-title>
                        <div v-if="post.user == 'st00000001'">
                            <!-- <v-btn
                                icon
                            >
                                <v-icon>mdi-dots-horizontal</v-icon>
                            </v-btn> -->
                        </div>
                        <v-list-item-text class="comment">{{post.comment}}</v-list-item-text>
                    </div>
                    <div v-else-if="post.user == 'st00000001'">
                        <v-list-item-title class="thread">{{index += 1}}:{{post.name}}(削除済)</v-list-item-title>
                        <v-list-item-text class="comment">{{post.comment}}</v-list-item-text>
                    </div>
                </div>
            </div>
        </v-list>
        <v-divider class="divide" />
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
    </v-card>
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