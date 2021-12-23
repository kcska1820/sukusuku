<template>
  <v-row class="fill-height"
  color="primary">
    <v-col cols="12" sm="8">
      <CompCalendar />
    </v-col>
    <v-col cols="12" sm="4">
      <v-col>
        <v-card>
          <CompEventCD />
        </v-card>
      </v-col>
      <v-col>
        <CompToDo />
      </v-col>
    </v-col>
  </v-row>
</template>

<script>
  export default {
  /* 未ログイン時index.vueに遷移 */
  /* middleware:"authenicated" */
}
</script>
