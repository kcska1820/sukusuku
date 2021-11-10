<template>
  <div>
    <v-card color="accent">
      <v-card-title>
        <v-icon
          size="1.5em">
          mdi-message-text
        </v-icon>
        掲示板-スレ{{ this.$route.query.id }}
      </v-card-title>
    </v-card>
    <v-list>
      <div
        v-for="(posts, i) in items"
        :key="i"
        exact>
        <div
          v-for="(post, i) in posts"
          :key="i"
          exact>
          <p class="thread">{{post.id}}:{{post.user}}</p>
          <p class="comment">{{post.comment}}</p>
        </div>
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
      append-outer-icon="mdi-chat"
    >
    </v-text-field>
  </div>
</template>

<script>
  import jsonf from '/components/thcontent.json'
  export default {
    data() {
      return {
        newComment: '',
        items:jsonf
      }
    },
    methods: {
      addPost(){
        let newPost = [
          {
          id:Date.now(),
          user:"新規",
          comment: this.newComment,
          }
        ]
        this.items.push(newPost)
        this.newComment = ''
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