<template>
  <v-card
    color="accent"
  >
    <h1
      class="mt-06"
    >
      <v-icon
      size="1em"
      >
        mdi-notebook-check-outline
      </v-icon>
      &emsp;Todoリスト
    </h1>
    <v-divider>
    </v-divider>
    <v-form
      ref="Todo"
      @submit.prevent
    >
      <v-text-field
        v-model="newTaskTitle"
        @click:append="addTask"
        @keyup.enter="addTask"
        class="pa-0 mx-2"
        solo
        label="Todoを作成"
        append-icon="mdi-plus"
        clearable
        counter="100"
        :rules="[rules.required]"
      ></v-text-field>
    </v-form>
    <v-virtual-scroll
      :items="items"
      :item-height="49"
      height="150"
    >
      <template
        v-slot:default="{ item }"
      >
        <v-card
          max-height="45"
          class="d-flex align-center mx-2"
          color="info"
        >
          <v-list-item>
            <v-list-item-action>
              <v-checkbox
                :input-value="item.done"
                @click="doneTask(item.id)"
                color="button"
              ></v-checkbox>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title
                :class="{ 'text-decoration-line-through': item.done }"
              >
                <v-tooltip
                  bottom
                >
                  <template
                    v-slot:activator="{ on, attrs }"
                  >
                    <span
                      v-bind="attrs"
                      v-on="on"
                    >
                      {{ item.title }}
                    </span>
                  </template>
                  <span>
                    {{ item.date }}:{{ item.title }}
                  </span>
                </v-tooltip>
              </v-list-item-title>
            </v-list-item-content>
            <v-list-item-action>
              <v-btn
                @click.stop="deleteTask(item.id)"
                icon
              >
                <v-icon
                  color="button"
                >
                  mdi-delete-circle
                </v-icon>
              </v-btn>
            </v-list-item-action>
          </v-list-item>
        </v-card>
      </template>
    </v-virtual-scroll>
  </v-card>
</template>
<script>
export default {
  name: "Todo",
  data() {
    return {
      newTaskTitle: "",
      rules: {
        required: (value) => !!value || "こちらは必須項目です",
      },
      items: [],
      item: [],
      user: [],
      url: "",
      date: "",
    };
  },
  methods: {
    addTask() {
      const newDay = new Date();
      const getmonth = parseInt(newDay.getMonth()) + 1;
      this.date =
        newDay.getFullYear() +
        "/" +
        ("00" + getmonth).slice(-2) +
        "/" +
        ("00" + newDay.getDate()).slice(-2);
      if (this.$refs.Todo.validate()) {
        this.url =
          "https://sukusukuserver.7colordays.net/sukusuku/tdadd/?userid=" +
          this.user[0].userid +
          "&title=" +
          this.newTaskTitle +
          "&done=False" +
          "&date=" +
          this.date;
        fetch(this.url, {
          method: "GET",
          mode: "cors",
          credentials: "include",
        })
          .then((res) => res.json())
          .then((obj) => {
            this.createTask();
          });
        this.newTaskTitle = "";
      }
    },
    doneTask(id) {
      this.item = this.items.filter((item) => item.id === id)[0];
      this.item.done = !this.item.done;
      if (this.item.done == true) {
        this.url =
          "https://sukusukuserver.7colordays.net/sukusuku/tddone/?id=" +
          this.item.id +
          "&userid=" +
          this.user[0].userid +
          "&title=" +
          this.item.title +
          "&done=True" +
          "&date=" +
          this.item.date;
      } else {
        this.url =
          "https://sukusukuserver.7colordays.net/sukusuku/tddone/?id=" +
          this.item.id +
          "&userid=" +
          this.user[0].userid +
          "&title=" +
          this.item.title +
          "&done=False" +
          "&date=" +
          this.item.date;
      }
      fetch(this.url, {
        method: "GET",
        mode: "cors",
        credentials: "include",
      }).then((res) => this.createTask());
    },
    deleteTask(id) {
      this.item = this.items.filter((item) => item.id === id)[0];
      this.url =
        "https://sukusukuserver.7colordays.net/sukusuku/tddel/?tdid=" +
        this.item.id +
        "&userid=" +
        this.user[0].userid;
      fetch(this.url, {
        method: "GET",
        mode: "cors",
        credentials: "include",
      })
        .then((res) => res.json())
        .then((obj) => {
          this.createTask();
        });
    },
    createTask() {
      this.user = JSON.parse(localStorage.getItem("user"));
      this.url =
        "https://sukusukuserver.7colordays.net/sukusuku/tdsel/?userid=" +
        this.user[0].userid;
      fetch(this.url, {
        method: "GET",
        mode: "cors",
        credentials: "include",
      })
        .then((res) => res.json())
        .then((obj) => {
          this.items = [];
          for (let j = 0; j < obj.length; j++) {
            this.items.push({
              id: obj[j].id,
              title: obj[j].title,
              done: obj[j].done,
              date: obj[j].date,
            });
          }
        });
    },
  },
  mounted() {
    this.createTask();
  },
};
</script>
