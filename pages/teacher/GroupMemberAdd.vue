<template>
<div>
  <v-card>
    <v-card-title>
      追加するメンバーを選択してください
      <v-spacer></v-spacer>
      <v-text-field
        v-model="search"
        append-icon="mdi-magnify"
        label="Search"
        single-line
        hide-details
      ></v-text-field>
    </v-card-title>
    <v-data-table
    v-model="selected"
      :headers="headers"
      :items="desserts"
      :search="search"
      :single-select="singleSelect"
    item-key="name"
    show-select
    class="elevation-1"
    ></v-data-table>
    </v-card>
    <v-row >
        <v-col >
            <v-btn color="primary" elevation="2" justify-end></v-btn>
        </v-col>
    </v-row>
  
</div>
</template>
<script>
  export default {
    data () {
      return {
        search: '',
        headers: [
          {
            text: 'ユーザーID',
            align: 'start',
            sortable: false,
            value: 'id',
          },
          { text: 'ユーザー名', value: 'name' },
        ],
        desserts: [
          {
            id: 'st20187723',
            name: '福田要',
          },
          {
            id: 'st20189838',
            name: 'いっせいおおき',
          },
          {
            id: 'st20183209',
            name: '二宮大和',
          },
          {
            id: 'st20184988',
            name: '丸野くん',
          },
          {
            id: 'st20183498',
            name: '海田健',
          },
          {
            id: 'st20182894',
            name: '海田剛',
          },
        ],
      }
    },
  }
</script>