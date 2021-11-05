<template>
  <v-card
    class="mx-auto"
  >
      <v-list-group
        :value="true"
      >
        <template v-slot:activator>
          <v-list-item-title>1限</v-list-item-title>
        </template>
        <v-col cols="12">
        <v-select
          :items="subject"
          clearable
          filled
          label="科目"
        >
        </v-select>
        <v-select
          :items="teacher"
          clearable
          filled
          label="担当教諭"
        >
        </v-select>
        <v-row>
          <v-col cols="1">
            <v-checkbox
              v-model="enabled1"
              hide-details
            ></v-checkbox>
          </v-col>
          <v-col cols="11">
            <v-select
              item-text="room"
              :items="floor1"
              clearable
              filled
              :disabled="!enabled1"
              label="1階教室"
            >
            </v-select>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="1">
            <v-checkbox
              v-model="enabled2"
              hide-details
            ></v-checkbox>
          </v-col>
          <v-col cols="11">
            <v-select
              item-text="room"
              :items="floor2"
              clearable
              filled
              :disabled="!enabled2"
              label="2階教室"
            >
            </v-select>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="1">
            <v-checkbox
              v-model="enabled3"
              hide-details
            ></v-checkbox>
          </v-col>
          <v-col cols="11">
            <v-select
              item-text="room"
              :items="floor3"
              clearable
              filled
              :disabled="!enabled3"
              label="3階教室"
            >
            </v-select>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="1">
            <v-checkbox
              v-model="enabled4"
              hide-details
            ></v-checkbox>
          </v-col>
          <v-col cols="11">
            <v-select
              item-text="room"
              :items="floor4"
              clearable
              filled
              :disabled="!enabled4"
              label="4階教室"
            >
            </v-select>
          </v-col>
        </v-row>
        </v-col>
      </v-list-group>
  </v-card>
</template>

<script>
  export default {
    data: () => ({
      subject: [
        ['アプリケーション開発技術'],
        ['卒業研究'],
      ],
      
      teacher: [
        ['切口先生'],
        ['坂中先生'],
        ['福留先生'],
        ['永谷先生'],
      ],
      floor1:[
        {
          room:'101',
        },
        {
          room:'102',
        },
        {
          room:'104',
        }
      ],
      floor2:[
        {
          room:'201'
        },
        {
          room:'202'
        },
        {
          room:'203'
        },
        {
          room:'進路相談室'
        },
        {
          room:'図書室'
        },
      ],
      floor3:[
        {
          room:'301'
        },
        {
          room:'302'
        },
        {
          room:'303'
        },
        {
          room:'304'
        },
        {
          room:'305'
        },
      ],
      floor4:[
        {
          room:'401'
        },
        {
          room:'402'
        },
        {
          room:'403'
        },
        {
          room:'404'
        },
      ],
      enabled1: false,
      enabled2: false,
      enabled3: false,
      enabled4: false,
    }),
  }
</script>