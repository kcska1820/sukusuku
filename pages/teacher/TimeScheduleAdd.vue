<template>
<div>
  <h1 class="mt-08">時間割を追加します</h1>
  <v-card
    class="mt-12"
  >
    <v-row
      v-for="(time, i) in 4"
      :key="i"
    >
      <v-col cols="12">
        <v-divider />
        <v-list-group
          :value="true"
        >
          <template v-slot:activator>
            <v-list-item-title>{{i+1}}限</v-list-item-title>
          </template>
          <v-col cols="12">
            <v-select
              :items="subject"
              clearable
              filled
              label="科目"
              item-color="indigo accent-3"
            >
            </v-select>

            <v-text-field
              label="人数"
              clearable
              suffix="人"
              filled
              type="number"
            ></v-text-field>

            <v-select
              :items="teacher"
              clearable
              filled
              label="担当教諭"
              item-color="indigo accent-3"
            >
            </v-select>
            <v-autocomplete
              item-text="room"
              :items="classroom"
              clearable
              filled
              label="教室"
              item-color="indigo accent-3"
            >
            </v-autocomplete>
          </v-col>
        </v-list-group>
      </v-col>
    </v-row>
  </v-card>
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
          追加
        </v-btn>
        <div class="my-3">
          メンバーを追加します。よろしいでしょうか？
        </div>
      </v-sheet>
    </v-bottom-sheet>
    </v-row>
    </v-col>
</div>
</template>

<script>
  export default {
    data: () => ({
      subject: [
        ['アプリケーション開発技術'],
        ['卒業研究'],
      ],
      sheet: false,
      
      teacher: [
        ['切口先生'],
        ['坂中先生'],
        ['福留先生'],
        ['永谷先生'],
      ],
      classroom:[
        {
          room:'101',
          floor:'1',
          limit:'10'
        },
        {
          room:'102',
          floor:'1',
          limit:'10'
        },
        {
          room:'104',
          floor:'1',
          limit:'10'
        },
        {
          room:'201',
          floor:'2',
          limit:'10'
        },
        {
          room:'202',
          floor:'2',
          limit:'10'
        },
        {
          room:'203',
          floor:'2',
          limit:'10'
        },
        {
          room:'進路相談室',
          floor:'2',
          limit:'10'
        },
        {
          room:'図書室',
          floor:'2',
          limit:'10'
        },
        {
          room:'301',
          floor:'3',
          limit:'10'
        },
        {
          room:'302',
          floor:'3',
          limit:'10'
        },
        {
          room:'303',
          floor:'3',
          limit:'10'
        },
        {
          room:'304',
          floor:'3',
          limit:'10'
        },
        {
          room:'305',
          floor:'3',
          limit:'10'
        },
        {
          room:'401',
          floor:'4',
          limit:'10'
        },
        {
          room:'402',
          floor:'4',
          limit:'10'
        },
        {
          room:'403',
          floor:'4',
          limit:'10'
        },
        {
          room:'404',
          floor:'4',
          limit:'10'
        }
      ]
    }),
  }
</script>