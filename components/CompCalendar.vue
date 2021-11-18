<template>
  <v-row class="fill-height"
  color="primary">
    <v-col cols="12">
      <v-sheet height="65">
        <v-toolbar
          color="accent lighten-1"
          flat
        >
          <v-btn
            class="mr-4"
            color="green"
            @click="setToday"
          >
            Today
          </v-btn>
          <v-btn
            fab
            text
            small
            color="grey darken-2"
            @click="prev"
          >
            <v-icon small>
              mdi-chevron-left
            </v-icon>
          </v-btn>
          <v-btn
            fab
            text
            small
            color="grey darken-2"
            @click="next"
          >
            <v-icon small>
              mdi-chevron-right
            </v-icon>
          </v-btn>
          <v-toolbar-title v-if="$refs.calendar">
            {{ $refs.calendar.title }}
          </v-toolbar-title>
          <v-spacer></v-spacer>
          <calendarAdd />
          <v-menu
            bottom
            right
          >
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                color="green"
                v-bind="attrs"
                v-on="on"
              >
                <span>{{ typeToLabel[type] }}</span>
                <v-icon right>
                  mdi-menu-down
                </v-icon>
              </v-btn>
            </template>
            <v-list>
              <v-list-item @click="type = 'day'">
                <v-list-item-title>Day</v-list-item-title>
              </v-list-item>
              <v-list-item @click="type = 'week'">
                <v-list-item-title>Week</v-list-item-title>
              </v-list-item>
              <v-list-item @click="type = 'month'">
                <v-list-item-title>Month</v-list-item-title>
              </v-list-item>
              <v-list-item @click="type = 'category'">
                <v-list-item-title>Category</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
        </v-toolbar>
      </v-sheet>
      <v-sheet height="550">
        <v-calendar
          ref="calendar"
          v-model="focus"
          color="primary"
          category-show-all
          :events="events"
          :event-color="getEventColor"
          :type="type"
          :categories="category"
          @click:event="showEvent"
          @click:more="viewDay"
          @click:date="viewDay"
          @change="updateRange"
        ></v-calendar>
        <v-menu
          v-model="selectedOpen"
          :close-on-content-click="false"
          :activator="selectedElement"
          offset-y
        >
          <v-card
            color="grey lighten-4"
            min-width="350px"
            flat
          >
            <v-toolbar
              :color="selectedEvent.color"
              dark
            >
              <v-btn icon>
                <v-icon>mdi-pencil</v-icon>
              </v-btn>
              <v-toolbar-title v-html="selectedEvent.name"></v-toolbar-title>
              <v-spacer></v-spacer>
              <v-btn icon>
                <v-icon>mdi-delete</v-icon>
              </v-btn>
            </v-toolbar>
            <v-card-text>
              <span v-html="selectedEvent.details"></span>
            </v-card-text>
            <v-card-actions>
              <v-btn
                text
                color="secondary"
                @click="selectedOpen = false"
              >
                Cancel
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-menu>
      </v-sheet>
    </v-col>
  </v-row>
</template>

<script>
  import items from '/components/timeTable.json'
  import items2 from '/components/timeTable2.json'
  import items3 from '/components/timeTable3.json'
  import calendarAdd from '/components/calendarAdd.vue'
  export default {
    data: () => ({
    focus: '',
    type: 'day',
    typeToLabel: {
      month: 'Month',
      week: 'Week',
      day: 'Day',
      category:'Category'
    },
    selectedEvent: {},
    selectedElement: null,
    selectedOpen: false,
    CreateOpen:false,
    events: [],
    items:items,
    items2:items2,
    items3:items3,
    dialog: false,
    category:["private","timetable","group"]
  }),
  mounted () {
    this.$refs.calendar.checkChange()
  },
  methods: {
    viewDay ({ date }) {
      this.focus = date
      this.type = 'day'
    },
    getEventColor (event) {
      return event.color
    },
    setToday () {
      this.focus = ''
    },
    prev () {
      this.$refs.calendar.prev()
    },
    next () {
      this.$refs.calendar.next()
    },
    showEvent ({ nativeEvent, event }) {
      const open = () => {
        this.selectedEvent = event
        this.selectedElement = nativeEvent.target
        requestAnimationFrame(() => requestAnimationFrame(() => this.selectedOpen = true))
      }

      if (this.selectedOpen) {
        this.selectedOpen = false
        requestAnimationFrame(() => requestAnimationFrame(() => open()))
      } else {
        open()
      }

      nativeEvent.stopPropagation()
    },
    updateRange () {
      const events = []
      for (let i = 0; i < this.items.length; i++) {
        events.push({
          name: items[i].title,
          start: items[i].start,
          end: items[i].end,
          color: items[i].color,
          details: items[i].details,
          category:items[i].category
        })
      }
      for (let i = 0; i < items2.length; i++) {
        events.push({
          name: items2[i].title,
          start: items2[i].start,
          end: items2[i].end,
          color: items2[i].color,
          timed: items2[i].timed,
          details: items2[i].details,
          category:items2[i].category
        })
      }
      for (let i = 0; i < items3.length; i++) {
        events.push({
          name: items3[i].title,
          start: items3[i].start,
          end: items3[i].end,
          color: items3[i].color,
          timed: items3[i].timed,
          details: items3[i].details,
          category:items3[i].category
        })
      }
      this.events = events
    },
  },
  /* 未ログイン時index.vueに遷移 */
  /* middleware:"authenicated" */
}
</script>