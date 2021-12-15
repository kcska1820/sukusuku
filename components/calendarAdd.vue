<template>
    <v-dialog
        v-model="dialog"
        max-width="600px"
    >
        <template v-slot:activator="{ on, attrs }">
            <v-btn
                color="green"
                v-bind="attrs"
                v-on="on"
                icon
            >
                <v-icon>
                    mdi-plus
                </v-icon>
            </v-btn>
        </template>
        <v-container fluid fill-height>
            <v-layout xs12 sm8 md4>
                <v-flex>
                    <v-form ref="addform">
                    <v-card>
                        <v-toolbar color="accent">
                            <v-toolbar-title>
                                予定追加
                            </v-toolbar-title>
                        </v-toolbar>
                        <v-tabs v-model="tab" grow>
                            <v-tab>プライベート</v-tab>
                            <v-tab>グループ</v-tab>
                        </v-tabs>
                        <v-tabs-items v-model="tab">
                            <v-tab-item>
                                <v-card-text>
                                    <v-form  :rules="[rules.required]">
                                        <v-col class="d-flex justify-space-around pt-4">
                                            <p>開始日時 : </p>
                                            <input type="date" v-model="startDay" />
                                            <input type="time" v-model="startTime" />
                                        </v-col>
                                        <v-col class="d-flex justify-space-around pt-4" >
                                            <p>終了日時 : </p>
                                            <input type="date" v-model="endDay" />
                                            <input type="time" v-model="endTime" />
                                        </v-col>
                                        <v-text-field label="タイトル" v-model="title" :rules="[rules.required]" />
                                        <v-text-field label="内容" v-model="details" :rules="[rules.required]" />
                                        <v-select label="カラー" v-model="color" :items="colors" item-text="name" item-value="value" :rules="[rules.required]" />
                                    </v-form>
                                </v-card-text>
                                <v-card-actions>
                                    <v-col cols="6">
                                        <v-btn
                                            color="red darken-2 white--text"
                                            block
                                            @click="dialog = false"
                                        >
                                            閉じる
                                        </v-btn>
                                    </v-col>
                                    <v-col cols="6">
                                        <v-btn
                                            color="blue darken-1 white--text"
                                            block
                                            @click="addPrivateSchedule"
                                        >
                                            追加
                                        </v-btn>
                                    </v-col>
                                </v-card-actions>
                            </v-tab-item>
                            <v-tab-item>
                                <v-card-text>
                                    <v-form  :rules="[rules.required]">
                                        <v-col class="d-flex justify-space-around pt-4">
                                            <p>開始日時 : </p>
                                            <input type="date" v-model="startDay" />
                                            <input type="time" v-model="startTime" />
                                        </v-col>
                                        <v-col class="d-flex justify-space-around pt-4">
                                            <p>終了日時 : </p>
                                            <input type="date" v-model="endDay" :rules="[rules.required]" />
                                            <input type="time" v-model="endTime" :rules="[rules.required]" />
                                        </v-col>
                                        <v-text-field label="タイトル" v-model="title" :rules="[rules.required]" />
                                        <v-text-field label="内容" v-model="details" :rules="[rules.required]" />
                                        <v-select label="カラー" v-model="color" :items="colors" item-text="name" item-value="value" :rules="[rules.required]" />
                                        <v-select label="グループ" v-model="group" :items="groups" item-text="name" item-value="id" :rules="[rules.required]" />
                                    </v-form>
                                </v-card-text>
                                <v-card-actions>
                                    <v-col cols="6">
                                        <v-btn
                                            color="red darken-2 white--text"
                                            block
                                            @click="dialog = false"
                                        >
                                            閉じる
                                        </v-btn>
                                    </v-col>
                                    <v-col cols="6">
                                        <v-btn
                                            color="blue darken-1 white--text"
                                            block
                                            @click="addGroupSchedule"
                                        >
                                            追加
                                        </v-btn>
                                    </v-col>
                                </v-card-actions>
                            </v-tab-item>
                        </v-tabs-items>
                    </v-card>
                    </v-form>
                </v-flex>
            </v-layout>
        </v-container>
    </v-dialog>
</template>

<script>
export default {
    data: () => ({
        rules: {
            required: value => !!value || 'こちらは必須項目です',
        },
        dialog: false,
        tab:"プライベート",
        url:'http://localhost:8000/sukusuku/',
        addurl:'',
        groupurl:'',
        startDay:'',
        startTime:'',
        endDay:'',
        endTime:'',
        title:'',
        details:'',
        group:'',
        color:'',
        userid:'',
        user:[],
        privateschedule:[],
        groupschedule:[],
        groups:[],
        group1:[],
        colors:[
            {
                name:"赤",
                value:'red'
            },
            {
                name:"青",
                value:'blue'
            },
            {
                name:"黄",
                value:'yellow'
            },
            {
                name:"緑",
                value:'green'
            }
        ],
    }),
    methods:{
        getGroup(){
            if(localStorage.getItem('group') != null){
                this.group1 = JSON.parse(localStorage.getItem('group'))
                for (let i = 0; i < this.group1.length; i++) {
                    this.groupurl = this.url + 'glsel/?groupid='+this.group1[i].groupid_id
                    fetch(this.groupurl,{
                    method:"GET",
                    mode:"cors",
                    credentials: 'include'
                    })
                    .then((res)=>res.json())
                    .then(obj=>{
                        this.groups.push({
                        id:this.group1[i].groupid_id,
                        name:obj[0].groupname,
                        })
                    })
                }
            }
        },
        addGroupSchedule(){
            if(this.$refs.addform.validate()){
            this.start = this.startDay + 'T' + this.startTime
            this.end = this.endDay + 'T' + this.endTime
            this.addurl = this.url + 'gsadd/?title=' + this.title + '&start='+ this.start + '&end=' + this.end +'&color=' + this.color +'&details='+this.details + '&groupid='+this.group
            console.log(this.addurl)
            fetch(this.addurl,{
            method:"GET",
            mode:"cors",
            credentials: 'include'
            })
            .then((res)=>res.json())
            .then(obj=>this.groupschedule=obj)
            this.close()
            }
        },
        addPrivateSchedule(){
            if(this.$refs.addform.validate()){
                if(this.startDay >= this.endDay){
                    this.user = JSON.parse(localStorage.getItem('user'))
                    this.userid = this.user[0].userid
                    this.start = this.startDay + 'T' + this.startTime
                    this.end = this.endDay + 'T' + this.endTime
                    this.addurl = this.url + 'psadd/?userid=' + this.userid + '&title=' + this.title + '&start='+ this.start + '&end=' + this.end +'&color=' + this.color +'&details='+this.details
                    console.log(this.addurl)

                    /* fetch(this.addurl,{
                    method:"GET",
                    mode:"cors",
                    credentials: 'include'
                    })
                    .then((res)=>res.json())
                    .then(obj=>this.privateschedule=obj)
                    .catch()
                    this.close() */
                }
            }
        },
        close(){
            this.title=''
            this.startDay=''
            this.startTime=''
            this.start=''
            this.endDay=''
            this.endTime=''
            this.end=''
            this.color=''
            this.group=''
            this.details=''
            this.dialog = false
        },
        Set(){
            const newDay= new Date()
            const getmonth = parseInt(newDay.getMonth()) + 1
            this.startDay = newDay.getFullYear() + '-' + getmonth + '-' + newDay.getDate()
            this.startTime = newDay.getHours() + ':' + newDay.getMinutes()
            this.endDay = newDay.getFullYear() + '-' + getmonth + '-' + newDay.getDate()
            this.endTime = newDay.getHours() + ':' + newDay.getMinutes()
        },
    },
    created(){
        this.Set()
        this.getGroup()
    }
}
</script>
