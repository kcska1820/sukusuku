<template>
  <v-app
    class="v-application"
  >
    <CompHeader />
    <v-main>
      <v-container>
        <Nuxt />
      </v-container>
      <Backbtn />
    </v-main>
    <CompFooter />
    <BtnNav />
  </v-app>
</template>

<script>
export default {
}
</script>

<style scoped>
.theme--dark.v-application {
  background-color: #424242;
}
.theme--light.v-application {
  background-color: #F5F5F5;
}
</style>

