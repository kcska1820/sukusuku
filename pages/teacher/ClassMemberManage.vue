<template>
  <v-card class="mt-12">
    <v-card-title>
      <v-icon size="1.5em" color="blue-grey darken-3">
        mdi-account-details
      </v-icon>
      <h2>クラスメンバー管理</h2>
      <v-spacer></v-spacer>
      <v-text-field
        v-model="search"
        append-icon="mdi-magnify"
        label="IDでメンバーを検索"
        single-line
        hide-details
      ></v-text-field>
    </v-card-title>
    <v-data-table
      :headers="headers"
      :items="users"
      :search="search"
      sort-by="calories"
      class="elevation-1"
      disable-sort
    >
      <template v-slot:top>
        <v-toolbar flat>
          <h1>{{ classname }}</h1>
          <v-divider class="mx-4" inset vertical></v-divider>
          <v-spacer></v-spacer>
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
            <v-form ref="addform" @submit.prevent>
              <v-card v-model="sheet">
                <v-toolbar color="accent">
                  <v-toolbar-title>
                    <span class="text-h5">クラスメンバー追加</span>
                  </v-toolbar-title>
                </v-toolbar>
                <v-tabs v-model="tab" grow>
                  <v-tab>一人追加</v-tab>
                  <v-tab>一括追加</v-tab>
                </v-tabs>
                <v-tabs-items v-model="tab">
                  <v-tab-item>
                    <v-card-text>
                      <v-container>
                        <v-row>
                          <v-col cols="12">
                            <v-text-field
                              v-model="editedItem.userid"
                              label="ユーザーID(学籍番号)"
                              :rules="[rules.required, rules.max]"
                              @keyup.enter="save"
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
                    <v-file-input
                      v-model="file"
                      accept=".xlsx"
                      label="EXCEL File input"
                      truncate-length="15"
                      @change="onChange($event)"
                    ></v-file-input>
                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn color="red darken-2" text @click="close">
                        キャンセル
                      </v-btn>
                      <v-btn color="blue darken-1" text @click="upload">
                        保存
                      </v-btn>
                    </v-card-actions>
                  </v-tab-item>
                </v-tabs-items>
              </v-card>
            </v-form>
          </v-dialog>
          <v-dialog v-model="dialogDelete" max-width="500px">
            <v-card>
              <v-card-title class="text-h5">本当に削除してもよろしいですか？</v-card-title>
              <h3 class="text-center">{{classname}}<v-spacer></v-spacer>{{editedItem.userid__username}}</h3>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="red darken-2" text @click="closeDelete"
                  >キャンセル</v-btn
                >
                <v-btn color="blue darken-1" text @click="deleteItemConfirm"
                  >削除</v-btn
                >
                <v-spacer></v-spacer>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-toolbar>
      </template>

      <template v-slot:[`item.actions`]="{ item }">
        <v-btn fab color="primary" small>
          <v-icon size="2em" @click="deleteItem(item)"> mdi-delete </v-icon>
        </v-btn>
      </template>
    </v-data-table>
  </v-card>
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
    },
    url: "http://localhost:8000/sukusuku/",
    addurl: "",
    del: "",
    dialog: false,
    dialogDelete: false,
    search: "",
    classname: "",
    headers: [
      {
        text: "ユーザーID",
        align: "start",
        sortable: false,
        value: "userid",
      },
      { text: "ユーザー名", value: "userid__username" },
      { text: "削除", value: "actions", sortable: false },
    ],
    users: [],
    editedIndex: -1,
    editedItem: {
        userid: '',
        userid__username:'',
        },
      defaultItem: {
        userid: '',
        userid__username:'',
        },
  }),

  watch: {
    dialog(val) {
      val || this.close();
    },
    dialogDelete(val) {
      val || this.closeDelete();
    },
  },

  created() {
    this.classname = localStorage.getItem("selclassid");
    fetch(this.url + "cdselc/?classid=" + this.classname, {
      method: "GET",
      mode: "cors",
      credentials: "include",
    })
      .then((res) => res.json())
      .then((obj) => (this.users = obj));
  },

  methods: {
    deleteItem(item) {
      this.editedItem = Object.assign({}, item);
      this.delurl = this.url + "cddel/?id=" + item.id + "&classid=" + this.classname;
      this.dialogDelete = true;
    },

    deleteItemConfirm() {
      fetch(this.delurl, {
        method: "GET",
        mode: "cors",
        credentials: "include",
      })
        .then((res) => res.json())
        .then((obj) => (this.users = obj));
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
          "cdadd1/?userid=" +
          this.editedItem.userid +
          "&classid=" +
          this.classname
        console.log(this.addurl);
        fetch(this.addurl, {
          method: "GET",
          mode: "cors",
          credentials: "include",
        })
          .then((res) => res.json())
          .then((obj) => (this.users = obj));
        this.close();
      }
    },

    //一括登録処理
    onChange(event) {
      this.file = event;
    },
    async upload() {
      this.csrftoken = Cookies.get('csrftoken')
      
      fetch('http://localhost:8000/sukusuku/cdadd/',{
        method:"POST",
        headers: {
          'content-type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
          'X-CSRFToken':this.csrftoken
        },
        body:this.file,
        mode:"cors",
        credentials: 'include'
      }).then((res)=>res.json())
      .then(obj=>this.users=obj)
      .catch(error => {
        return error.response;
      })
      this.sheet = !this.sheet
    },
  },
  /* 未ログイン時index.vueに遷移 */
  middleware:"authenicated"
}
</script>