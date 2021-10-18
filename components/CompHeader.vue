<template>
    <header>
        <v-navigation-drawer
        v-model="drawer"
        :mini-variant="miniVariant"
        :clipped="clipped"
        color="accent"
        fixed
        app
        v-if="!$vuetify.breakpoint.xs"
        >
        <v-list>
            <v-list-item
            v-for="(item, i) in items"
            :key="i"
            :to="item.to"
            router
            exact
            >
            <v-list-item-action>
                <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-action>
            <v-list-item-content>
                <v-list-item-title 
                v-text="item.title"
                class="white--text"
                />
            </v-list-item-content>
            </v-list-item>
        </v-list>
        </v-navigation-drawer>
        <v-app-bar
        :clipped-left="clipped"
        fixed
        color="accent"
        app
        >
        <v-app-bar-nav-icon 
        @click.stop="drawer = !drawer" 
        v-if="!$vuetify.breakpoint.xs"
        />
        <h1><a href="/" id="titlebtn">{{title}}</a></h1>
        <v-spacer/>
        <v-switch
          v-model="theme"
          :prepend-icon="themeIcon"
        ></v-switch>
        <Acount />
      </v-app-bar>
    </header>
</template>

<script>
import items from '/components/pagesList.json'
export default {
  data () {
    return {
      items:items,
      clipped: true,
      drawer: false,
      fixed: true,
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: "スクスク",
      theme:true,
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
<style scoped lang="css">
  #titlebtn {
    font-weight: bold;
    
  }
</style>