<template>
  <div>
    <!--https://qiita.com/d-yosh/items/9299389b32c496a9b64c-->
    <v-data-table
      :headers="headers"
      :items="thdata"
      sort-by="groupadmin"
      class="elevation-1 ma-12"
      disable-sort
    >
      <template 
        v-slot:top
      >
        <v-toolbar 
          flat
        >
          <v-toolbar-title>
            <h2>
              承認待ちスレッド一覧
            </h2>
          </v-toolbar-title>
          <v-divider 
            class="mx-4" 
            inset 
            vertical
          ></v-divider>
          <v-spacer></v-spacer>

          <v-dialog 
            v-model="dialogApprove" 
            max-width="500px"
          >
            <v-card>
              <v-card-title 
                class="text-h5"
              >
              このスレッドを承認しますか？
              </v-card-title>
              <v-container>
                <v-row>
                  <v-col 
                    cols="12"
                  >
                    <v-text-field 
                      v-model="editTitle" 
                      label="タイトル" 
                    />
                  </v-col>
                  <v-col 
                    cols="12"
                  >
                    <v-text-field 
                      v-model="editNote" 
                      label="備考" 
                    />
                  </v-col>
                </v-row>
              </v-container>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn 
                  color="red darken-2" 
                  text 
                  @click="closeApprove"
                >
                キャンセル
                </v-btn>
                <v-btn 
                  color="blue darken-1" 
                  text 
                  @click="approveItemConfirm"
                >
                承認
                </v-btn>
                <v-spacer></v-spacer>
              </v-card-actions>
            </v-card>
          </v-dialog>
          <v-dialog 
            v-model="dialogDelete" 
            max-width="500px"
          >
            <v-card>
              <v-card-title 
                class="text-h5"
              >
              本当にこのスレッドを却下しますか？
              </v-card-title>
              <h3 
                class="text-center"
              >
              {{ editedItem.title }}
              </h3>
              <v-card-actions>
                <v-spacer />
                <v-btn 
                  color="red darken-2" 
                  text 
                  @click="closeDelete"
                >
                キャンセル
                </v-btn>
                <v-btn 
                  color="blue darken-1" 
                  text 
                  @click="deleteItemConfirm"
                >
                却下
                </v-btn>
                <v-spacer />
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-toolbar>
      </template>
      <template 
        v-slot:[`item.flag`]
      > 
      承認待ち 
      </template>
      <template 
        v-slot:[`item.actions`]="{ item }"
      >
        <v-btn 
          fab 
          small 
          dark 
          color="blue" 
          class="mr-1"
        >
          <v-icon 
            @click="approveItem(item)" 
            size="2em"
          >
            mdi-checkbox-marked-circle-outline
          </v-icon>
        </v-btn>
        <v-btn 
          fab 
          small 
          dark 
          color="red" 
          class="ml-1"
        >
          <v-icon 
            @click="deleteItem(item)" 
            size="2em"
          > 
          mdi-close 
          </v-icon>
        </v-btn>
      </template>
      <!-- ここを消す -->
      <template 
        v-slot:no-data
      >
        <v-btn 
          color="primary" 
          @click="initialize"
        > 
        Reset 
        </v-btn>
      </template>
    </v-data-table>
    <div 
      class="d-flex justify-center"
    >
      <v-btn 
        color="accent" 
        elevation="2" 
        to="/teacher/BBSManage" 
        x-large
      >
      承認済みスレッドはこちら
      </v-btn>
    </div>
  </div>
</template>
<script>
//import threads from '/components/threadList.json'
export default {
  data: () => ({
    url: "https://sukusukuserver.7colordays.net/sukusuku/",
    appurl: "",
    delurl: "",
    flag: "",
    search: "0",
    dialog: false,
    dialogApprove: false,
    dialogDelete: false,
    headers: [
      {
        text: "スレッドタイトル",
        align: "start",
        sortable: false,
        value: "title",
        align: "center",
        width: "200",
        class: "accent",
      },
      {
        text: "備考",
        value: "note",
        align: "center",
        width: "200",
        class: "accent",
      },
      {
        text: "申請者",
        value: "master_id",
        align: "center",
        width: "200",
        class: "accent",
      },
      {
        text: "状態",
        value: "flag",
        align: "center",
        width: "200",
        class: "accent",
        filter: (value) => {
          return value == "0";
        },
      },
      {
        text: "",
        value: "actions",
        sortable: false,
        align: "center",
        width: "200",
        class: "accent",
      },
    ],
    desserts: [],
    thdata: [],
    thread: "",
    editedIndex: "-1",
    editedItem: {
      id: "",
      title: "",
      note: "",
      flag: "",
      master_id: "",
      latest: "",
    },
    defaultItem: {
      id: "",
      title: "",
      note: "",
      flag: "",
      master_id: "",
      latest: "",
    },
    editTitle: "",
    editNote: "",
  }),

  computed: {
    formTitle() {
      return this.editedIndex === "-1" ? "トピックを作成します" : "Edit Item";
    },

    flFilter(val, search, item) {
      return item == "0";
    },
  },

  watch: {
    dialog(val) {
      val || this.close();
    },
    dialogDelete(val) {
      val || this.closeDelete();
    },
  },

  created() {
    this.initialize();
  },

  methods: {
    initialize() {
      fetch(this.url + "thsel/", {
        method: "GET",
        mode: "cors",
        credentials: "include",
      })
        .then((res) => res.json())
        .then((obj) => (this.thdata = obj));
    },

    approveItem(item) {
      this.editedIndex = this.desserts.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.editTitle = this.editedItem.title;
      this.editNote = this.editedItem.note;
      this.dialogApprove = true;
    },

    deleteItem(item) {
      this.editedIndex = this.desserts.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialogDelete = true;
    },

    approveItemConfirm() {
      this.appurl =
        this.url +
        "thapp/?threadid=" +
        this.editedItem.threadid +
        "&title=" +
        this.editTitle +
        "&flag=1" +
        "&note=" +
        this.editNote +
        "&master=" +
        this.editedItem.master_id +
        "&latest=new";
      fetch(this.appurl, {
        method: "GET",
        mode: "cors",
        credentials: "include",
      })
        .then((res) => res.json())
        .then((obj) => (this.thdata = obj));
      this.desserts.splice(this.editedIndex, 1);
      this.closeApprove();
    },

    deleteItemConfirm() {
      this.delurl = this.url + "threj/?threadid=" + this.editedItem.threadid;
      fetch(this.delurl, {
        method: "GET",
        mode: "cors",
        credentials: "include",
      })
        .then((res) => res.json())
        .then((obj) => (this.thdata = obj));
      this.desserts.splice(this.editedIndex, 1);
      this.closeDelete();
    },

    close() {
      this.dialog = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    closeApprove() {
      this.dialogApprove = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    closeDelete() {
      this.dialogDelete = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    save() {
      if (this.editedIndex > -1) {
        Object.assign(this.desserts[this.editedIndex], this.editedItem);
      } else {
        this.desserts.push(this.editedItem);
      }
      this.close();
    },
  },
  middleware: "authenicated",
};
</script>
