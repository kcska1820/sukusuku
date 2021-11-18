<template>
    <v-card color="accent3">
        <v-card-title>
          <h3><v-icon size="1.3em">mdi-archive-clock-outline</v-icon>&emsp;イベントカウントダウン</h3>
        </v-card-title>
        <div>
        <v-divider></v-divider>
        <v-virtual-scroll
          :items="items"
          :item-height="90"
          height="250"
        >
          <template v-slot:default="{ item }">
            <v-list-item>
              <v-flex>
                <v-card>
                  <v-card-title>
                  {{item.title}}
                  </v-card-title>
                  <v-card-subtitle>
                  {{item.limit}}
                  </v-card-subtitle>
                </v-card>
              </v-flex>
            </v-list-item>
          </template>
        </v-virtual-scroll>
        </div>
    </v-card>
</template>

<script>
  import items from '/components/eventList.json'
  export default {
    data: () => (
        {items:items}
    ),
  }
</script>