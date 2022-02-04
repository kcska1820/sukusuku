<template>
  <v-fab-transition v-if="!$vuetify.breakpoint.xs">
    <v-btn fab bottom right fixed @click="back"> 戻る </v-btn>
  </v-fab-transition>
</template>
<script>
export default {
  methods: {
    back() {
      window.history.length > 1 ? this.$router.go(-1) : this.$router.push("/");
    },
  },
};
</script>