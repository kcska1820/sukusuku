<template>
  <v-menu bottom min-width="300px" rounded offset-y>
    <template v-slot:activator="{ on }">
      <v-btn icon v-on="on" @click="messages = 0">
        <v-badge :content="messages" :value="messages" color="red" overlap>
          <v-icon large color="white"> mdi-bell-outline </v-icon>
        </v-badge>
      </v-btn>
    </template>
    <v-card color="accent">
      <v-list-item-content class="justify-center">
        <div class="mx-auto text-center">
          <v-toolbar
            color="accent"
            elevation="0"
            class="d-flex justify-center align-center pa-2 mb-2"
          >
            <v-toolbar-title dense><h2>通知</h2></v-toolbar-title>
          </v-toolbar>
          <v-divider />
          <!-- 通知表示 -->
          <v-virtual-scroll :items="items" :item-height="100" height="250">
            <template v-slot:default="{ item }">
              <v-list-item>
                <v-flex>
                  <v-card color="info">
                    <v-card-title>
                      {{ item.title }}
                    </v-card-title>
                    <v-card-subtitle>
                      {{ item.note }}
                    </v-card-subtitle>
                  </v-card>
                </v-flex>
              </v-list-item>
            </template>
          </v-virtual-scroll>
        </div>
      </v-list-item-content>
    </v-card>
  </v-menu>
</template>

<script>
import items from "/components/noticeList.json";
export default {
  data() {
    return {
      items: items,
      messages: "!",
    };
  },
};
</script>
