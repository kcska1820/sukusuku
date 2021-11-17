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
        <v-btn
          text
          fab
          height=46px
          width=46px
          to="/"
        >
          <sukusukuLogoS />
        </v-btn>
        <v-spacer/>
        <notice />
        <Logout />
      </v-app-bar>
    </header>
</template>

<script>
import items from '/components/pagesList.json'
import firebase from "~/plugins/firebase"
import { getAuth, signOut } from "firebase/auth"
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
    }
  }
}
</script>