<template>
    <div class="home">
        <h1 class="mt-06"><v-icon size="1em">mdi-notebook-check-outline</v-icon>&emsp;Todoリスト</h1>
        <v-divider></v-divider>
            <v-text-field
            v-model="newTaskTitle"
            @click:append="addTask"
            @keyup.enter="addTask"
            class="pa-3"
            outlined
            label="Todoを作成"
            append-icon="mdi-plus"
            hide-details
            clearable
          ></v-text-field>
        <v-list
        class="pt-0"
      flat
    >
    <div
        v-for="task in tasks"
        :key="task.id"
    >
        <v-list-item
            :class="{ 'blue-grey lighten-4': task.done }"
        >
          <template v-slot:default>
            <v-list-item-action>
              <v-checkbox
                :input-value="task.done"
                @click="doneTask(task.id)"
                color="accent"
              ></v-checkbox>
            </v-list-item-action>

            <v-list-item-content>
              <v-list-item-title
              :class="{ 'text-decoration-line-through' : task.done }"
              >
                  {{ task.title }}
                </v-list-item-title>
            </v-list-item-content>
            <v-list-item-action>
          <v-btn
            @click.stop="deleteTask(task.id)"
             icon>
            <v-icon  color="primary">mdi-delete-circle</v-icon>
          </v-btn>
        </v-list-item-action>
          </template>
        </v-list-item>
        <v-divider></v-divider>
    </div>
    </v-list>
    </div>
</template>
<script>
export default {
    name: 'Todo',
    data() {
        return {
            newTaskTitle: '',
            tasks: [
                {
                    id: 1,
                    title: '宿題提出する',
                    done: false
                },
                {
                    id: 2,
                    title: '参考書買う',
                    done: false
                },
                {
                    id: 3,
                    title: 'ハガキ出す',
                    done: false
                },
            ]
        }
    },
    methods: {
        addTask(){
            let newTask = {
                id: Date.now(),
                title: this.newTaskTitle,
                done: false
            }
            this.tasks.push(newTask)
            this.newTaskTitle = ''
        },
        doneTask(id) {
            let task = this.tasks.filter(task => task.id === id) [0]
            task.done = !task.done
        },
        deleteTask(id) {
            this.tasks = this.tasks.filter(task => task.id !== id)
        }
    },
    /* 未ログイン時index.vueに遷移 */
  /* middleware:"authenicated" */
}
</script>