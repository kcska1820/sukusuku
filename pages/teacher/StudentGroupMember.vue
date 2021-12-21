<template>
  <v-data-table
    :headers="headers"
    :items="userdata"
    :search="search"
    sort-by="calories"
    class="elevation-1"
    disable-sort
  >
    <template v-slot:top>
      <v-toolbar flat>
        <v-icon size="1.5em" color="blue-grey darken-3">
          mdi-account-details
        </v-icon>

        <v-toolbar-title><h2>学生管理</h2></v-toolbar-title>
        <v-divider class="mx-4" inset vertical></v-divider>
        <v-spacer></v-spacer>
        <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          label="IDでメンバーを検索"
          single-line
          hide-details
        ></v-text-field>
        <v-dialog v-model="dialog" max-width="500px">
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              color="accent"
              dark
              fab
              class="mb-2"
              v-bind="attrs"
              v-on="on"
            >
              <v-icon dark> mdi-plus </v-icon>
            </v-btn>
          </template>
          <v-form ref="addform">
            <v-card v-model="sheet">
              <v-toolbar color="accent">
                <v-toolbar-title>
                  <span class="text-h5">学生{{ formTitle }}</span>
                </v-toolbar-title>
              </v-toolbar>
              <v-tabs v-model="tab" grow>
                <v-tab>一人{{ formTitle }}</v-tab>
                <v-tab>一括{{ formTitle }}</v-tab>
              </v-tabs>
              <v-tabs-items v-model="tab">
                <v-tab-item>
                  <v-card-text>
                    <v-container>
                      <v-row>
                        <v-col cols="12" sm="6" md="4">
                          <v-text-field
                            v-model="editedItem.userid"
                            label="ユーザーID(学籍番号)"
                            :rules="[rules.required, rules.max]"
                            :disabled="textdisabled"
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6" md="8">
                          <v-text-field
                            v-model="editedItem.mail"
                            label="メールアドレス"
                            :rules="[rules.required, rules.email]"
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6" md="4">
                          <v-select
                            v-model="editedItem.roleid_id"
                            :items="items"
                            label="ロールID"
                            :rules="[rules.required]"
                          ></v-select>
                        </v-col>
                        <v-col cols="12" sm="6" md="4">
                          <v-text-field
                            v-model="editedItem.username"
                            label="ユーザー名"
                            :rules="[rules.required]"
                          ></v-text-field>
                        </v-col>
                      </v-row>
                    </v-container>
                  </v-card-text>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="red darken-2" text @click="close">
                      キャンセル
                    </v-btn>
                    <v-btn color="blue darken-1" text @click="save">
                      保存
                    </v-btn>
                  </v-card-actions>
                </v-tab-item>
                <v-tab-item>
                  <v-card-text>
                    <v-container>
                      <v-file-input
                        class="mt-12"
                        v-model="file"
                        accept=".xlsx"
                        label="EXCEL File input"
                        truncate-length="15"
                        @change="onChange($event)"
                      ></v-file-input>
                      <v-btn color="blue darken-1" text @click="upload">
                        保存
                      </v-btn>
                    </v-container>
                  </v-card-text>
                </v-tab-item>
              </v-tabs-items>
            </v-card>
          </v-form>
        </v-dialog>
        <v-dialog v-model="dialogDelete" max-width="500px">
          <v-card>
            <v-card-title class="text-h5">本当に削除してもよろしいですか？</v-card-title>
            <h3 class="text-center">{{editedItem.username}}</h3>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="red darken-2" text @click="closeDelete"
                >いいえ</v-btn
              >
              <v-btn color="blue darken-1" text @click="deleteItemConfirm"
                >はい</v-btn
              >
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar>
    </template>

    <template v-slot:[`item.actions`]="{ item }">
      <v-btn fab small color="primary" icon>
        <v-icon class="mr-2" @click="editItem(item)"> mdi-pencil </v-icon>
      </v-btn>
      <v-btn fab small color="primary" icon>
        <v-icon @click="deleteItem(item)"> mdi-delete </v-icon>
      </v-btn>
    </template>
  </v-data-table>
</template>

<script>
import Cookies from "js-cookie";
export default {
  data: () => ({
    file: null,
    sheet: false,
    csrftoken: "",
    tab: "",
    rules: {
      required: (value) => !!value || "こちらは必須項目です",
      max: (value) => (value && value.length == 10) || "10文字で入力して下さい",
      email: (value) => {
        const pattern =
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return pattern.test(value) || "メールアドレスの形式が正しくありません";
      },
    },
    url: "http://localhost:8000/sukusuku/",
    addurl: "",
    del: "",
    dialog: false,
    dialogDelete: false,
    items: ["student"],
    search: "",
    headers: [
      {
        text: "ユーザーID",
        align: "start",
        sortable: false,
        value: "userid",
        class: "accent",
      },
      {
        text: "メールアドレス",
        value: "mail",
        align: "center",
        width: "300",
        class: "accent",
      },
      {
        text: "ロールID",
        value: "roleid_id",
        align: "center",
        width: "250",
        class: "accent",
      },
      {
        text: "ユーザー名",
        value: "username",
        align: "center",
        width: "250",
        class: "accent",
      },
      { text: "編集", value: "actions", sortable: false, class: "accent" },
    ],
    userdata: [],
    editedIndex: -1,
    editedItem: {
      userid: "",
      mail: "",
      roleid_id: "",
      username: "",
    },
    defaultItem: {
      userid: "",
      mail: "",
      roleid_id: "",
      username: "",
    },
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "追加" : "編集";
    },
    textdisabled(){
      return this.editedIndex === -1 ? false : true;
    }
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
    fetch(this.url + "stsel/", {
      method: "GET",
      mode: "cors",
      credentials: "include",
    })
      .then((res) => res.json())
      .then((obj) => (this.userdata = obj));
  },

  methods: {
    editItem(item) {
      this.editedIndex = this.userdata.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    //削除
    deleteItem(item) {
      this.editedItem = Object.assign({}, item);
      this.delurl = this.url + "stdel/?userid=" + item.userid;
      this.dialogDelete = true;
    },

    deleteItemConfirm() {
      fetch(this.delurl, {
        method: "GET",
        mode: "cors",
        credentials: "include",
      })
        .then((res) => res.json())
        .then((obj) => (this.userdata = obj));
      this.closeDelete();
    },

    close() {
      this.dialog = false;
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
      if (this.$refs.addform.validate()) {
        this.addurl =
          this.url +
          "stadd/?userid=" +
          this.editedItem.userid +
          "&mail=" +
          this.editedItem.mail +
          "&roleid_id=" +
          this.editedItem.roleid_id +
          "&username=" +
          this.editedItem.username;
        console.log(this.addurl);
        fetch(this.addurl, {
          method: "GET",
          mode: "cors",
          credentials: "include",
        })
          .then((res) => res.json())
          .then((obj) => (this.userdata = obj));
        this.close();
      }
    },

    //一括登録処理
    onChange(event) {
      this.file = event;
    },
    async upload() {
      this.csrftoken = Cookies.get("csrftoken");

      fetch("http://localhost:8000/sukusuku/usadd/", {
        method: "POST",
        headers: {
          "content-type":
            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
          "X-CSRFToken": this.csrftoken,
        },
        body: this.file,
        mode: "cors",
        credentials: "include",
      })
        .then((res) => res.json())
        .then((obj) => (this.userdata = obj))
        .catch((error) => {
          console.log(error);
          return error.response;
        });
      this.sheet = !this.sheet;
    },
  },
};
</script>