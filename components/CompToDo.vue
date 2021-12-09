<template>
    <v-card color="accent2">
        <h1 class="mt-06"><v-icon size="1em">mdi-notebook-check-outline</v-icon>&emsp;Todoリスト</h1>
        <v-divider></v-divider>
        <v-form ref='Todo'>
            <v-text-field
            v-model="newTaskTitle"
            @click:append="addTask"
            class="pa-3"
            outlined
            label="Todoを作成"
            append-icon="mdi-plus"
            clearable
            :rules="[rules.required]"
          ></v-text-field>
          </v-form>
        <v-virtual-scroll
          :items="items"
          :item-height="49"
          height="150"
        >
          <template v-slot:default="{ item }">
            <v-list-item>
            <v-list-item-action>
              <v-checkbox
                :input-value="item.done"
                @click="doneTask(item.id)"
                color="primary"
              ></v-checkbox>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title
              :class="{ 'text-decoration-line-through' : item.done }"
              >
                  {{ item.title }}
                </v-list-item-title>
            </v-list-item-content>
            <v-list-item-action>
              <v-btn
                @click.stop="deleteTask(item.id)"
                icon>
                <v-icon  color="primary">mdi-delete-circle</v-icon>
              </v-btn>
            </v-list-item-action>
            </v-list-item>
          </template>
        </v-virtual-scroll>
    </v-card>
</template>
<script>
import items from '/components/TaskList.json'
export default {
    name: 'Todo',
    data() {
        return {
            newTaskTitle: '',
            rules: {
            required: value => !!value || 'こちらは必須項目です',
        },
            items:items
        }
    },
    methods: {
        addTask(){
            if(this.$refs.Todo.validate()) {
                let newTask = {
                id: Date.now(),
                title: this.newTaskTitle,
                done: false
            }
            this.items.push(newTask)
            this.newTaskTitle = ''
            }
        },
        doneTask(id) {
            let item = this.items.filter(item => item.id === id) [0]
            item.done = !item.done
        },
        deleteTask(id) {
            this.items = this.items.filter(item => item.id !== id)
        }
    },
}
</script>