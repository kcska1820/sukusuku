
<template>
<div>
    <h1 class="mt-10"><v-icon size="1em">mdi-clock-plus-outline</v-icon>&emsp;時間割を登録する</h1>
    <v-divider></v-divider>
    <br>
    <br>
    <v-file-input
    class="mt-12"
    accept=".xlsx"
    small-chips
    truncate-length="15"
    label="excel File input"
  ></v-file-input>
  <br>
  <br>
  <br>
<v-col cols="12">
    <v-row
    justify="center"
    max-width="100"
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
          width="200"
        >
          登録する
        </v-btn>
      </template>
      <v-sheet
        class="text-center"
        height="150px"
      >

        <v-btn
          class="mt-6"
          text
          color="error"
          @click="sheet = !sheet"
        >
          キャンセル
        </v-btn>
          <v-btn
          class="mt-6"
          text
          @click="sheet = !sheet"
        >
          登録
        </v-btn>
        <div class="my-3">
          時間割を登録します。よろしいでしょうか？
        </div>
      </v-sheet>
    </v-bottom-sheet>
    </v-row>
    </v-col>
</div>
</template>

<script>
export default {
    data () {
        return {
            sheet: false
        }
    }
}
</script>
