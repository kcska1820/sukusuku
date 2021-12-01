<template>
  <v-menu
    bottom
    min-width="300px"
    rounded
    offset-y
  >
    <template v-slot:activator="{ on }">
      <v-btn icon v-on="on">
        <v-badge
          :content="messages"
          :value="messages"
          color="red"
          overlap
        >
          <v-icon large color="white">
            mdi-bell-outline
          </v-icon>
        </v-badge>
      </v-btn>
    </template>
      <v-card>
        <v-list-item-content class="justify-center">
          <div class="mx-auto text-center">
            <div class="pa-2 mb-2">
              <h3>通知</h3>
            </div>
            <v-divider />
          </div>
        </v-list-item-content>
      </v-card>
  </v-menu>
</template>

<script>
export default {
    data () {
        return {
            messages: 3,
        }
    }
}
</script>
