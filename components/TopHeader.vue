<template>
  <header>
    <v-app-bar :clipped-left="clipped" fixed color="accent" app>
      <v-btn text fab height="46px" width="46px" to="/student/home">
        <sukusukuLogoS />
      </v-btn>
      <v-spacer />
      <login />
    </v-app-bar>
  </header>
</template>

<script>
export default {
  data() {
    return {
      clipped: true,
      title: "スクスク",
    };
  },
};
</script>