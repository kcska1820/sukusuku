<template>
  <v-card color="accent">
    <v-card-title>
      <v-icon
        size="1.5em">
        mdi-message-text
      </v-icon>
      掲示板(開発中)
    </v-card-title>
    <div>
      {{ this.$route.query.id }}
    </div>
      <v-col>
        <v-card>
        </v-card>
      </v-col>
      <v-divider></v-divider>
  </v-card>
</template>