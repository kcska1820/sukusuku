<template>
<v-card>
  <v-card-title>
      theme
  </v-card-title>
    <v-list>
      <v-switch
          v-model="theme"
          :prepend-icon="themeIcon"
        ></v-switch>
    </v-list>
    <v-list>
      <v-switch
          v-model="theme"
          :prepend-icon="themeIcon"
        ></v-switch>
    </v-list>
    <v-list>
      <v-switch
          v-model="theme"
          :prepend-icon="themeIcon"
        ></v-switch>
    </v-list>
</v-card>
</template>

<script>
export default {
  data () {
    return {
      theme:this.$vuetify.theme.dark,
    }
  },
  computed:{
    themeIcon(){
      return this.theme ? 'mdi-weather-night' : 'mdi-weather-sunny'
    }
  },
  watch:{
    theme() {
      this.$vuetify.theme.dark = this.theme
    }
  }
}
</script>