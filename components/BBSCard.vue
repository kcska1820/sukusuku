<template>
  <div>
    <v-dialog
      v-model="enter"
      max-width="500px"
    >
      <v-card>
        <v-card-title>
          <span
          class="text-h5"
          >
            このスレッドに入室しますか？
          </span>
        </v-card-title>

        <v-card-text>
          <span
          class="text-h5"
          >
            {{ item.title }}
          </span>
          <br />
          <span>
            {{ item.note }}
          </span>
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn
            color="red darken-2"
            text
            @click="enter = false"
          >
            キャンセル
            </v-btn>
            <v-btn
            color="blue darken-1"
            text
            :to="{
                path: '/BBScon',
                query: {
                id: item.threadid,
                },
            }"
            >
            入室
            </v-btn>
        </v-card-actions>
        </v-card>
    </v-dialog>
    <v-dialog
      v-model="suspender"
      max-width="500px"
    >
      <v-card>
        <v-card-title>
          <span
          class="text-h5"
          >
          このスレッドを凍結しますか？
          </span>
        </v-card-title>

        <v-card-text>
          <span
          class="text-h5"
          >
          {{ item.title }}
          </span>
          <br />
          <span>
            {{ item.note }}
          </span>
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn
            color="blue darken-1"
            text
            @click="suspender = false"
          >
            キャンセル
          </v-btn>
          <v-btn
            color="red darken-2"
            text
            @click="suspend"
          >
            凍結
          </v-btn>
        </v-card-actions>
        </v-card>
    </v-dialog>
    <v-dialog
      v-model="unlocker"
      max-width="500px"
    >
      <v-card>
        <v-card-title>
          <span
            class="text-h5"
          >
            このスレッドの凍結を解除しますか？
          </span>
        </v-card-title>

        <v-card-text>
          <span
            class="text-h5"
          >
            {{ item.title }}
          </span>
          <br />
          <span>
            {{ item.note }}
          </span>
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn
            color="blue darken-1"
            text
            @click="unlocker = false"
          >
            キャンセル
          </v-btn>
          <v-btn
            color="red darken-2"
            text
            @click="unsuspend"
          >
            凍結解除
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <template
      v-if="item.master_id === user"
    >
      <v-card
        color="info"
      >
        <v-row
          :justify="'space-around'"
        >
          <v-col
            cols="10"
            class="col"
          >
            <v-btn
              text
              x-large
              block
              @click="enter = true"
            >
              {{ item.title }}
              <template v-if="$vuetify.breakpoint.xs">
                <!--更新時間の表示-->
                <font color=red v-if="item.latest == 'new'">
                ({{ item.latest }})
                </font>
                <template v-else>
                    ({{ item.latest }})
                </template>
                <!--コメント件数の表示-->
                <template v-if="cmdata.length >= 1">
                [コメント件数:{{ cmdata.length }}]
                </template>
                <template
                  v-if="item.flag == 3"
                >
                  (非表示)
                </template>
              </template>
            </v-btn>
          </v-col>
          <v-col
            cols="2"
            class="but">
            <template v-if="item.flag != 3">
              <v-menu>
                <template
                  v-slot:activator="{ on, attrs }"
                >
                  <v-btn
                    icon
                    x-large
                    v-bind="attrs"
                    v-on="on"
                  >
                    <v-icon
                    size="1em"
                    >
                      mdi-dots-horizontal
                    </v-icon>
                  </v-btn>
                </template>
                <template
                  v-if="item.flag == 1"
                >
                  <v-list
                    class="list"
                  >
                    <v-btn
                      x-large
                      @click="suspender = true"
                    >
                      <v-list-item>
                        凍結
                      </v-list-item>
                    </v-btn>
                  </v-list>
                </template>
                <template
                  v-else-if="item.flag == 2"
                >
                  <v-list
                    class="list"
                  >
                    <v-btn
                      x-large
                      @click="unlocker = true"
                    >
                      <v-list-item>
                        凍結解除
                      </v-list-item>
                    </v-btn>
                  </v-list>
                </template>
              </v-menu>
            </template>
          </v-col>
        </v-row>
        <v-divider />
      </v-card>
    </template>
    <template
      v-else
    >
      <v-card
        color="info"
      >
        <v-row>
          <v-col
            cols="12"
            class="sup"
          >
            <v-btn
              text
              x-large
              block
              @click="enter = true"
            >
              {{ item.title }}
              <template v-if="!$vuetify.breakpoint.xs">
                <!--更新時間の表示-->
                <font color=red v-if="item.latest == 'new'">
                ({{ item.latest }})
                </font>
                <template v-else>
                    ({{ item.latest }})
                </template>
                <!--コメント件数の表示-->
                <template v-if="cmdata.length >= 1">
                [コメント件数:{{ cmdata.length }}]
                </template>
                <template
                  v-if="item.flag == 3"
                >
                  (非表示)
                </template>
              </template>
            </v-btn>
          </v-col>
        </v-row>
        <v-divider />
      </v-card>
    </template>
  </div>
</template>
<script>
export default {
    data: () => ({
        url: "https://sukusukuserver.7colordays.net/sukusuku/",
        susurl: "",
        cmdata: [],
        suspender: false,
        unlocker: false,
        enter: false,
        touketu: false,
        btns: null,
    }),

    props: {
        item: Object,
        user: String,
    },

    created() {
      this.init()
    },

    methods: {
        suspendConfirm() {
        this.suspender = true;
        this.enter = false;
        },

        init(){
          fetch(this.url + "cmsel/?threadid=" + this.item.threadid, {
          method: "GET",
          mode: "cors",
          credentials: "include",
          })
          .then((res) => res.json())
          .then((obj) => (this.cmdata = obj));
        },

        suspend() {
        this.susurl =
            this.url +
            "thdel/?threadid=" +
            this.item.threadid +
            "&title=" +
            this.item.title +
            "&flag=2&note=" +
            this.item.note +
            "&master=" +
            this.item.master_id +
            "&latest=" +
            this.item.latest +
            "&details=を凍結しました"
        fetch(this.susurl, {
            method: "GET",
            mode: "cors",
            credentials: "include",
        })
            .then((res) => res.json())
            .then((obj) => {
              this.thdata = obj
              this.init()
            });
        this.suspender = false;
        this.$emit("reflesh");
        },

        unsuspend() {
        this.susurl =
            this.url +
            "thdel/?threadid=" +
            this.item.threadid +
            "&title=" +
            this.item.title +
            "&flag=1&note=" +
            this.item.note +
            "&master=" +
            this.item.master_id +
            "&latest=" +
            this.item.latest +
            "&details=の凍結を解除しました"
        fetch(this.susurl, {
            method: "GET",
            mode: "cors",
            credentials: "include",
        })
            .then((res) => res.json())
            .then((obj) => {
              this.thdata = obj
              this.init()
            });
        this.unlocker = false;
        this.$emit("reflesh");
        },
    },
};
</script>
<style scoped>
.col {
padding-top: 0;
padding-bottom: 12;
}

.but {
padding-top: 0;
padding-bottom: 12;
padding-right: 7;
}

.sup {
padding-top: 0;
padding-bottom: 12;
}

.list {
padding: 0;
}
</style>