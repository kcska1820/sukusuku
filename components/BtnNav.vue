<template>
  <v-bottom-navigation
    color="teal"
    grow
    bottom
    fixed
    v-if="$vuetify.breakpoint.xs"
  >
    <v-btn
    v-for="(item, i) in items"
    :key="i"
    :to="item.to"
    color="info"
    router
    exact
    >
      <span>{{item.title}}</span>
      <v-icon>{{item.icon}}</v-icon>
    </v-btn>
  </v-bottom-navigation>
</template>

<script>
  import items from '/components/pagesList.json'
  export default {
    data: () => (
        {items:items}
    ),
  }
</script>
