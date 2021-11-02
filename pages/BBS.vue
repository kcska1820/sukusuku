<template>
  <v-card color="accent">
    <v-card-title>
      <v-icon
        size="1.5em">
        mdi-message-text
      </v-icon>
      掲示板(開発中)
    </v-card-title>
    <div
      v-for="(item, i) in items"
      :key="i"
      :to="item.to"
      router
      exact>
      <v-col>
        <v-card>
          <v-card-title>{{item.title}}</v-card-title>
          <v-row cols="5" class="thread">
            <v-btn class="button"
              v-for="(thread, i) in item.thread"
              :key="i"
              :to="item.to"
              router
              exact>
              <!--topiclist.json内のtoに遷移先が記載されている
              まだリンク先がトピック毎で固定してるから、ボタンごとに遷移先を変える機能が欲しい
              BBSconの内容をDB情報によって動的に変えられるようにしたい-->
              {{thread.li}}
            </v-btn>
          </v-row>
        </v-card>
      </v-col>
    <v-divider></v-divider>
    </div>
  </v-card>
</template>

<script>
  import items from '/components/topicList.json'
  export default {
    data: () => (
        {items:items}
    ),
    /* 未ログイン時index.vueに遷移 */
  /* middleware:"authenicated" */
  }
</script>

<style scoped>
  .thread {
    padding:18px;
  }
  .button{
    margin-right:10px;
  }
</style>