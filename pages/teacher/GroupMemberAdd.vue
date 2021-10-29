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
    <br>
    <v-row
    justify="end"
    >
    <v-bottom-sheet
      v-model="sheet"
      inset
    >
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          color="light-green darken-1"
          dark
          v-bind="attrs"
          v-on="on"
          x-large
        >
          追加する
        </v-btn>
      </template>
      <v-sheet
        class="text-center"
        height="150px"
      >
              <v-btn
          class="mt-6"
          text
          @click="sheet = !sheet"
        >
          追加
        </v-btn>

        <v-btn
          class="mt-6"
          text
          color="error"
          @click="sheet = !sheet"
        >
          キャンセル
        </v-btn>
        <div class="my-3">
          メンバーを追加します。よろしいでしょうか？
        </div>
      </v-sheet>
    </v-bottom-sheet>
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
        sheet: false,
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