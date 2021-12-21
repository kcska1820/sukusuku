<template>
  <v-row class="fill-height"
  color="primary">
    <v-col cols="12">
      <!-- カレンダーツールバー -->
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
          <v-btn @click="updateRange" icon><v-icon color="green">mdi-restore</v-icon></v-btn>
          <calendarAdd v-if="role == 'student'"/>
          <TeachercalendarAdd v-else-if="role == 'teacher'"/>
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
              <v-list-item @click="type = 'category'">
                <v-list-item-title>Day</v-list-item-title>
              </v-list-item>
              <v-list-item @click="type = 'week'">
                <v-list-item-title>Week</v-list-item-title>
              </v-list-item>
              <v-list-item @click="type = 'month'">
                <v-list-item-title>Month</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
        </v-toolbar>
      </v-sheet>
      <!-- 削除確認 -->
      <v-dialog v-model="DeleteDialog" max-width="500px">
        <v-card>
          <v-card-title class="text-h5">本当に削除しますか？</v-card-title>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="red darken-2" text @click="close">キャンセル</v-btn>
            <v-btn color="blue darken-1" text @click="deleteSchedule">削除</v-btn>
            <v-spacer></v-spacer>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <v-dialog v-model="TTDialog" max-width="500px">
        <v-card>
            <v-card-title class="text-h5 justify-center">時間割は編集できません</v-card-title>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="red darken-2" text @click="close">キャンセル</v-btn>
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
      </v-dialog>
      <!-- スケジュール更新 -->
      <v-dialog v-model="EditDialog" max-width="600px">
        <v-container fluid fill-height>
            <v-layout xs12 sm8 md4>
                <v-flex>
                    <v-card>
                        <v-toolbar color="accent">
                          <v-toolbar-title>
                            予定更新
                          </v-toolbar-title>
                        </v-toolbar>
                        <v-card-text>
                          <v-form v-if="categorys == 'プライベート'">
                            <v-col class="d-flex justify-space-around pt-4">
                              <p>開始日時 : </p>
                              <input type="date" v-model="startDay" />
                              <input type="time" v-model="startTime" />
                            </v-col>
                            <v-col class="d-flex justify-space-around pt-4">
                              <p>終了日時 : </p>
                              <input type="date" v-model="endDay" />
                              <input type="time" v-model="endTime" />
                            </v-col>
                              <v-text-field label="タイトル" v-model="title"  />
                              <v-text-field label="内容" v-model="details"  />
                              <v-select label="カラー" v-model="color" :items="colors" item-text="name" item-value="value" />
                          </v-form>
                          <v-form v-if="categorys == 'グループ'">
                            <v-col class="d-flex justify-space-around pt-4">
                              <p>開始日時 : </p>
                              <input type="date" v-model="startDay" />
                              <input type="time" v-model="startTime" />
                            </v-col>
                            <v-col class="d-flex justify-space-around pt-4">
                              <p>終了日時 : </p>
                              <input type="date" v-model="endDay" />
                              <input type="time" v-model="endTime" />
                            </v-col>
                              <v-text-field label="タイトル" v-model="title"  />
                              <v-text-field label="内容" v-model="details"  />
                              <v-select label="カラー" v-model="color" :items="colors" item-text="name" item-value="value" />
                              <v-select label="グループ" v-model="gs" :items="gss" item-text="name" item-value="id" />
                          </v-form>
                          <v-form v-if="categorys == '時間割'">
                            <v-col class="d-flex justify-space-around pt-4">
                              <p>開始日時 : </p>
                              <input type="date" v-model="startDay" />
                              <input type="time" v-model="startTime" />
                            </v-col>
                            <v-col class="d-flex justify-space-around pt-4">
                              <p>終了日時 : </p>
                              <input type="date" v-model="endDay" />
                              <input type="time" v-model="endTime" />
                            </v-col>
                              <v-text-field label="タイトル" v-model="title"  />
                              <v-text-field label="内容" v-model="details"  />
                              <v-select label="カラー" v-model="color" :items="colors" item-text="name" item-value="value" />
                              <v-select label="クラス" v-model="clas" :items="cs" item-text="name" item-value="id" />
                          </v-form>
                      </v-card-text>
                      <v-card-actions>
                          <v-col cols="6">
                              <v-btn
                                  color="red darken-2 white--text"
                                  block
                                  @click="close"
                              >
                                  閉じる
                              </v-btn>
                          </v-col>
                          <v-col cols="6">
                              <v-btn
                                  color="blue darken-1 white--text"
                                  block
                                  @click="updSchedule"
                              >
                                  更新
                              </v-btn>
                          </v-col>
                      </v-card-actions>
                    </v-card>
                </v-flex>
            </v-layout>
        </v-container>
      </v-dialog>
      <!-- カレンダー本体 -->
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
              <v-btn icon @click="openEdit">
                <v-icon>mdi-pencil</v-icon>
              </v-btn>
              <v-toolbar-title v-html="selectedEvent.name"></v-toolbar-title>
              <v-spacer></v-spacer>
              <v-btn icon @click="DeleteDialog = true">
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
  import calendarAdd from '/components/calendarAdd.vue'
  import TeachercalendarAdd from '/components/TeachercalendarAdd.vue'
  export default {
    data: () => ({
    focus: '',
    type: 'category',
    typeToLabel: {
      month: 'Month',
      week: 'Week',
      category:'Day'
    },
    colors:[
      {
          name:"赤",
          value:'red'
      },
      {
          name:"青",
          value:'blue'
      },
      {
          name:"黄",
          value:'yellow'
      },
      {
          name:"緑",
          value:'green'
      }
    ],
    selectedEvent: {
    },
    selectedElement: null,
    selectedOpen: false,
    CreateOpen:false,
    url:'http://localhost:8000/sukusuku/',
    psselurl:'',
    gdselurl:'',
    gsselurl:'',
    ttselurl:'',
    groupurl:'',
    delurl:'',
    updurl:'',
    class:'',
    start:'',
    startDay:'',
    startTime:'',
    end:'',
    endDay:'',
    endTime:'',
    title:'',
    details:'',
    group:'',
    color:'',
    events: [],
    user:[],
    role:'',
    userid:'',
    categorys:'',
    groups1:[],
    gs:'',
    gss:[],
    clas:'',
    cs:[],
    dialog: false,
    DeleteDialog: false,
    EditDialog: false,
    TTDialog: false,
    category:["プライベート","時間割","グループ"]
  }),
  mounted () {
    this.$refs.calendar.checkChange()
  },
  methods: {
    viewDay ({ date }) {
      this.focus = date
      this.type = 'category'
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
    openEdit (){
      //時間分割
      const startday = this.selectedEvent.start
      const endday = this.selectedEvent.end
      const editstartday = startday.substr(0,10)
      const editstarttime = startday.substr(11,15)
      this.startDay = editstartday
      this.startTime = editstarttime
      const editendday = endday.substr(0,10)
      const editendtime = endday.substr(11,15)
      this.endDay = editendday
      this.endTime = editendtime
      //スケジュール内容
      this.title = this.selectedEvent.name
      this.details = this.selectedEvent.details
      this.color = this.selectedEvent.color
      this.categorys = this.selectedEvent.category
      if(this.categorys == 'グループ'){
        this.gs = this.selectedEvent.groupid
      }
      if(this.categorys == '時間割'){
        this.clas = this.selectedEvent.classid
      }
      this.EditDialog = true
    },
    close (){
      this.selectedOpen = false
      this.DeleteDialog = false
      this.TTDialog = false
      this.EditDialog = false
    },
    updSchedule (){
      this.start = this.startDay + 'T' + this.startTime
      this.end = this.endDay + 'T' + this.endTime
      if(this.selectedEvent.category == "プライベート"){
        this.user = JSON.parse(localStorage.getItem('user'))
        this.userid = this.user[0].userid
        this.updurl = this.url + 'psupd/?id=' + this.selectedEvent.id + '&userid=' + this.userid+'&title='+this.title+'&start='+this.start+'&end='+this.end+'&details='+this.details+'&color='+this.color
        fetch(this.updurl,{
          method:"GET",
          mode:"cors",
          credentials: 'include'
        })
        .then((res)=>this.updateRange())
        this.close()
      }else if(this.selectedEvent.category == "グループ"){
        this.updurl = this.url + 'gsupd/?id=' + this.selectedEvent.id + '&groupid=' + this.selectedEvent.groupid+'&title='+this.title+'&start='+this.start+'&end='+this.end+'&details='+this.details+'&color='+this.color
        fetch(this.updurl,{
          method:"GET",
          mode:"cors",
          credentials: 'include'
        })
        .then((res)=>this.updateRange())
        this.close()
      }else if(this.selectedEvent.category == "時間割"){
        if(this.user[0].roleid_id == 'student'){
          this.TTDialog = true
        }else if(this.user[0].roleid_id == 'teacher'){
          this.updurl = this.url + 'ttupd/?id=' + this.selectedEvent.id + '&classid=' +this.selectedEvent.classid+'&title='+this.title+'&start='+this.start+'&end='+this.end+'&details='+this.details+'&color='+this.color
          fetch(this.updurl,{
          method:"GET",
          mode:"cors",
          credentials: 'include'
          })
          .then((res)=>this.updateRange())
          this.close()
        }
      }
    },
    deleteSchedule () {
      if(this.selectedEvent.category == "プライベート"){
        this.delurl = this.url + 'psdel/?id=' + this.selectedEvent.id + '&userid=' + this.userid
        fetch(this.delurl,{
          method:"GET",
          mode:"cors",
          credentials: 'include'
        })
        .then((res)=>this.updateRange())
        this.close()
      }else if(this.selectedEvent.category == "グループ"){
        this.delurl = this.url + 'gsdel/?id=' + this.selectedEvent.id + '&groupid=' + this.selectedEvent.groupid
        fetch(this.delurl,{
          method:"GET",
          mode:"cors",
          credentials: 'include'
        })
        .then((res)=>this.updateRange())
        this.close()
      }
    },
    updateRange () {
      this.user = JSON.parse(localStorage.getItem('user'))
      this.class = localStorage.getItem('class')
      this.userid = this.user[0].userid
      this.psselurl = this.url + 'pssel/?userid=' + this.userid
      this.gdselurl = this.url + 'gdsel/?userid=' + this.userid
      this.ttselurl = this.url + 'ttsel/?classid=' + this.class
      const event = []
      fetch(this.psselurl,{
      method:"GET",
      mode:"cors",
      credentials: 'include'
      })
      .then((res)=>res.json())
      .then(obj=>{
        for (let i = 0; i < obj.length; i++) {
          event.push({
            id:obj[i].id,
            name: obj[i].title,
            start: obj[i].start,
            end: obj[i].end,
            color: obj[i].color,
            details: obj[i].details,
            category: "プライベート"
          })
        }
      })
      fetch(this.gdselurl,{
      method:"GET",
      mode:"cors",
      credentials: 'include'
      })
      .then((res)=>res.json())
      .then(obj=>{
        for (let j = 0; j < obj.length; j++) {
          this.gsselurl = this.url + 'gssel/?groupid=' + obj[j].groupid_id
          fetch(this.gsselurl,{
          method:"GET",
          mode:"cors",
          credentials: 'include'
          })
          .then((res)=>res.json())
          .then(obj=>{
            for (let i = 0; i < obj.length; i++) {
              event.push({
                id:obj[i].id,
                groupid:obj[i].groupid_id,
                name: obj[i].title,
                start: obj[i].start,
                end: obj[i].end,
                color: obj[i].color,
                details: obj[i].details,
                category: "グループ"
              })
            }
          })
        }
      })
      fetch(this.ttselurl,{
      method:"GET",
      mode:"cors",
      credentials: 'include'
      })
      .then((res)=>res.json())
      .then(obj=>{
        for (let i = 0; i < obj.length; i++) {
          event.push({
            id:obj[i].id,
            classid:obj[i].classid_id,
            name: obj[i].title,
            start: obj[i].start,
            end: obj[i].end,
            color: obj[i].color,
            details: obj[i].details,
            category: "時間割"
          })
        }
      })
      this.events=event
    },
    getRole(){
      this.user = JSON.parse(localStorage.getItem('user'))
      this.role = this.user[0].roleid_id
    },
    getGroup(){
      if(localStorage.getItem('group') != null){
        this.groups1 = JSON.parse(localStorage.getItem('group'))
        for (let i = 0; i < this.groups1.length; i++) {
          this.groupurl = this.url + 'glsel/?groupid='+this.groups1[i].groupid_id
          fetch(this.groupurl,{
          method:"GET",
          mode:"cors",
          credentials: 'include'
          })
          .then((res)=>res.json())
          .then(obj=>{
            this.gss.push({
            id:this.groups1[i].groupid_id,
            name:obj[0].groupname,
            })
          })
        }
      }
      this.groupurl = this.url +'clall/'
      fetch(this.groupurl,{
        method:"GET",
        mode:"cors",
        credentials: 'include'
      })
      .then((res)=>res.json())
      .then(obj=>{
        for(let j=0; j<obj.length; j++){
          this.cs.push({
          id:obj[j].classid,
          name:obj[j].classname,
          })
        }
      })
    }
  },
  created(){
    this.getRole()
    this.getGroup()
  }
}
</script>