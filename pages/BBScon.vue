<template>
  <div>
    <v-card color="accent">
      <v-card-title>
        <v-icon
          size="1.5em">
          mdi-message-text
        </v-icon>
        掲示板(開発中)-スレ{{ this.$route.query.id }}
      </v-card-title>
    </v-card>
    <v-list>
      <div
        v-for="(item, i) in items"
        :key="i"
        exact>
        <div
          v-for="(post, i) in item.post"
          :key="i"
          exact>
          <p class="thread">{{post.no}}:{{post.user}}</p>
          <p class="comment">{{post.comment}}</p>
        </div>
      </div>
    </v-list>
    <v-divider class="divide"></v-divider>
    <v-textarea
      outlined
      label="発言を入力"
      hide-details
      clearable
      append-outer-icon="mdi-chat"
    >
    </v-textarea>
  </div>
</template>

<script>
  import items from '/components/thcontent.json'
  export default {
    data: () => (
        {items:items}
    ),
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