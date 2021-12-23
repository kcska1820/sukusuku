<template>
  <v-card color="accent2">
    <h1 class="mt-06"><v-icon size="1em">mdi-notebook-check-outline</v-icon>&emsp;Todoリスト</h1>
    <v-divider></v-divider>
    <v-form ref='Todo' @submit.prevent>
      <v-text-field
      v-model="newTaskTitle"
      @click:append="addTask"
      @keyup.enter="addTask"
      class="pa-0"
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
export default {
    name: 'Todo',
    data() {
        return {
            newTaskTitle: '',
            rules: {
            required: value => !!value || 'こちらは必須項目です',
        },
            items:[],
            item:[],
            user:[],
            url:''
        }
    },
  methods: {
    addTask(){
      if(this.$refs.Todo.validate()) {
        this.url='http://localhost:8000/sukusuku/tdadd/?userid='+this.user[0].userid+'&title='+this.newTaskTitle+'&done=False'
        fetch(this.url,{
        method:"GET",
        mode:"cors",
        credentials: 'include'
        })
        .then((res)=>res.json())
        .then(obj=>{
        this.createTask()
        })
      this.newTaskTitle = ''
      }
    },
    doneTask(id) {
      this.item = this.items.filter(item => item.id === id) [0]
      this.item.done = !this.item.done
      if(this.item.done == true){
        this.url='http://localhost:8000/sukusuku/tddone/?id='+this.item.id +'&userid='+this.user[0].userid+'&title='+this.item.title+'&done=True'
      }else{
        this.url='http://localhost:8000/sukusuku/tddone/?id='+this.item.id +'&userid='+this.user[0].userid+'&title='+this.item.title+'&done=False'
      }
      fetch(this.url,{
        method:"GET",
        mode:"cors",
        credentials: 'include'
      })
      .then((res)=>this.createTask())
    },
    deleteTask(id) {
      this.item = this.items.filter(item => item.id === id) [0]
      this.url='http://localhost:8000/sukusuku/tddel/?tdid='+this.item.id+'&userid='+this.user[0].userid
      fetch(this.url,{
        method:"GET",
        mode:"cors",
        credentials: 'include'
      })
      .then((res)=>res.json())
      .then((obj)=>{
        this.createTask()
      })
    },
    createTask(){
      this.user = JSON.parse(localStorage.getItem('user'))
      this.url = 'http://localhost:8000/sukusuku/tdsel/?userid='+this.user[0].userid
      fetch(this.url,{
        method:"GET",
        mode:"cors",
        credentials: 'include'
      })
      .then((res)=>res.json())
      .then(obj=>{
        this.items=[]
        for(let j=0; j<obj.length; j++){
          this.items.push({
          id:obj[j].id,
          title:obj[j].title,
          done:obj[j].done,
          })
        }
      })
    }
  },
  mounted(){
    this.createTask()
  }
}
</script>