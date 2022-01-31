<template>
    <v-card color="accent">
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
                  <v-card height="85" class="headline" min-width="240" color="info">
                    <v-card-title>
                      <v-tooltip bottom>
                        <template v-slot:activator="{ on, attrs }">
                          <span
                            v-bind="attrs"
                            v-on="on"
                            :style=item.color
                          >{{item.title.slice(0,10)}}</span>
                        </template>
                        <span>
                          {{item.title}}<br>
                          {{item.details}}
                        </span>
                      </v-tooltip>
                    </v-card-title>
                    <v-card-subtitle>
                    あと{{item.end}}日({{item.date.slice(0,10)}})
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
  export default {
    data: () => ({
      url: "https://sukusukuserver.7colordays.net/sukusuku/",
      items: [],
    }),

    mounted() {
      fetch(this.url + "evsel/?classid=" + localStorage.getItem('class'), {
        method: "GET",
        mode: "cors",
        credentials: "include",
      }).then((res) => res.json())
      .then((obj) => {
        this.items = obj
        for(let i = this.items.length-1;i >= 0 ; i= i-1){
          this.items[i].date = this.items[i].end.replaceAll('-', '/')
          this.items[i].end = Date.parse(new Date) - Date.parse(this.items[i].end.replaceAll('-', '/'))
          this.items[i].end = Math.floor(this.items[i].end / 86400000)
          if(this.items[i].end <= 0){
            this.items[i].end =  this.items[i].end* -1
            if(this.items[i].end <= 5){
              this.items[i].color =  "color:#FF6E40"
            }
          }else{
            this.items.splice(i,1)
          }
          this.items.sort((a,b) => a.end - b.end)
        }
      })
    },

  }
</script>

<style>
  .headline{
    white-space: nowrap
  }
</style>
