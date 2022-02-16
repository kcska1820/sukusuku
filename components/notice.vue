<template>
  <v-menu
    bottom
    min-width="375px"
    rounded
    :close-on-content-click="false"
    offset-y
  >
    <template
      v-slot:activator="{ on }"
    >
      <v-btn
        icon
        v-on="on"
        @click="messages = 0"
      >
        <v-badge
          :content="messages"
          :value="messages"
          color="red"
          overlap
        >
          <v-icon
            large
            color="white"
          >
            mdi-bell-outline
          </v-icon>
        </v-badge>
      </v-btn>
    </template>
    <!-- tabs -->
    <v-card
      color="accent"
    >
      <v-list-item-content
        class="justify-center"
      >
        <div
          class="mx-auto text-center"
        >
          <v-toolbar
            color="accent"
            elevation="0"
            class="d-flex justify-end align-center pa-2 mb-2"
          >
            <v-toolbar-title
            dense
            >
              <h2 class="mr-12">
                通知
              </h2>
            </v-toolbar-title>
            <v-btn fab small @click="restore" elevation="1" class="ml-12">
              <!-- 再読み込みボタン -->
              <v-icon>mdi-restore</v-icon>
            </v-btn>
          </v-toolbar>
        <v-tabs
          v-model="tab"
          grow
        >
          <v-tab>
            時間割
          </v-tab>
          <v-tab>
            その他
          </v-tab>
        </v-tabs>
        <v-tabs-items
          v-model="tab"
        >
        <!-- 時間割通知 -->
          <v-tab-item>
            <v-card color="accent" class="pt-1">
            <v-virtual-scroll
              :items="items"
              :item-height="100"
              height="300"
            >
              <template
                v-slot:default="{ item }"
              >
                <v-list-item>
                  <v-flex>
                    <v-card
                      color="info"
                      width="340"
                    >
                      <v-card-title>
                        {{ item.details }}
                      </v-card-title>
                    </v-card>
                  </v-flex>
                </v-list-item>
              </template>
            </v-virtual-scroll>
            </v-card>
          </v-tab-item>
          <!-- 掲示板通知 -->
          <v-tab-item>
            <v-card color="accent" class="pt-1">
            <v-virtual-scroll
              :items="items2"
              :item-height="68"
              height="300"
            >
              <template
                v-slot:default="{ item }"
              >
                <v-list-item>
                  <v-flex>
                    <v-card
                      color="info"
                      width="340"
                    >
                      <v-tooltip
                        bottom
                      >
                        <template
                          v-slot:activator="{ on, attrs }"
                        >
                          <v-card-title
                          v-bind="attrs"
                          v-on="on"
                          >
                            {{ item.details.slice(0, 14) }}
                          </v-card-title>
                        </template>
                        <span>
                          {{ item.details }}
                        </span>
                      </v-tooltip>
                    </v-card>
                  </v-flex>
                </v-list-item>
              </template>
            </v-virtual-scroll>
            </v-card>
          </v-tab-item>
        </v-tabs-items>
        </div>
      </v-list-item-content>
    </v-card>
  </v-menu>
</template>

<script>
export default {
  data () {
    return {
      items:'',
      items2:'',
      messages: '!',
      tab:"時間割",
      user:[]
    }
  },
  methods:{
    selectnotice(){
      const classid = localStorage.getItem('class')

      fetch('https://sukusukuserver.7colordays.net/sukusuku/noticesel/?classid=' + classid,{
          method:"GET",
          mode:"cors",
          credentials: 'include'
      })
      .then((res)=>res.json())
      .then(obj=>{
        this.items=[]
        for(let j=0; j<obj.length; j++){
          this.items.push({
          uptime:obj[j].uptime,
          classid:obj[j].classid_id,
          details:obj[j].details
          })
        }
      })
    },
    selectBBSnotice(){
      this.user = JSON.parse(localStorage.getItem('user'))

      fetch('https://sukusukuserver.7colordays.net/sukusuku/threadnoticesel/?userid=' + this.user[0].userid,{
          method:"GET",
          mode:"cors",
          credentials: 'include'
      })
      .then((res)=>res.json())
      .then(obj=>{
        this.items2=[]
        for(let j=0; j<obj.length; j++){
          this.items2.push({
          userid:obj[j].userid_id,
          details:obj[j].details
          })
        }
      })
    },
    restore(){
      this.selectnotice()
      this.selectBBSnotice()
    }
  },
  mounted(){
    this.selectnotice()
    this.selectBBSnotice()
  }
}
</script>
