<template>
    <v-card color="accent">
        <v-card-title>
          <v-icon
          size="1.5em">
            mdi-message-text
          </v-icon>
          掲示板(開発中)
        </v-card-title>
        <div
        v-for="(item, i) in items"
        :key="i"
        :to="item.to"
        router
        exact>
          <v-col>
            <v-card>
            </v-card>
          </v-col>
          <v-divider></v-divider>
        </div>
    </v-card>
</template>