<template>
    <v-card color="accent">
        <v-card-title>イベントスケジュール</v-card-title>
        <div
        v-for="(item, i) in items"
        :key="i"
        :to="item.to"
        router
        exact>
        <v-col>
        <v-card>
          <v-card-subtitle>{{item.title}}</v-card-subtitle>
          <v-card-text>あと{{item.limit}}</v-card-text>
        </v-card>
        </v-col>
        <v-divider></v-divider>
        </div>
    </v-card>
</template>

<script>
  import items from '/components/eventList.json'
  export default {
    data: () => (
        {items:items}
    ),
    /* 未ログイン時index.vueに遷移 */
    /* middleware:"authenicated" */
  }
</script>
