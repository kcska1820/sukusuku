<template>
    <v-card color="accent">
        <v-card-title>掲示板(開発中)</v-card-title>
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
                <div
                v-for="(thread, i) in item.thread"
                :key="i"
                :to="thread.to"
                router
                exact>
                  <v-btn class="button">
                    {{thread.li}}
                  </v-btn>
                </div>
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