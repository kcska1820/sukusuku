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
      <div>
        <p class="thread">1:ユーザ名</p>
        <p class="comment">あいうえお</p>
      </div>
      <div>
        <p class="thread">2:ユーザ名</p>
        <p class="comment">かきくけこ</p>
      </div>
      <div>
        <p class="thread">3:ユーザ名</p>
        <p class="comment">さしすせそ</p>
      </div>
    </v-list>
    <v-text-field
      outlined
      label="発言を入力"
      hide-details
      clearable
    >
    </v-text-field>
  </div>
</template>

<script>
  export default {
    
  }
</script>

<style scoped>
  .thread {
    padding:10px 1em 0 0.5em;
  }
  .comment {
    padding:0 1em 0 1em;
  }
</style>