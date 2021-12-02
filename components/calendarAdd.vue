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
                                    <v-form>
                                        <v-col class="d-flex justify-space-around pt-4">
                                            <p>開始日時 : </p>
                                            <input type="date" v-model="startDay" />
                                            <input type="time" v-model="startTime" />
                                        </v-col>
                                        <v-col class="d-flex justify-space-around pt-4">
                                            <p>終了日時 : </p>
                                            <input type="date" v-model="endDay" />
                                            <input type="time" v-model="endTime" />
                                        </v-col>
                                        <v-text-field label="タイトル" v-model="title"  />
                                        <v-text-field label="内容" v-model="details"  />
                                        <v-select label="カラー" v-model="color" :items="colors" item-text="name" item-value="value" />
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
                                    <v-form>
                                        <v-col class="d-flex justify-space-around pt-4">
                                            <p>開始日時 : </p>
                                            <input type="date" v-model="startDay" />
                                            <input type="time" v-model="startTime" />
                                        </v-col>
                                        <v-col class="d-flex justify-space-around pt-4">
                                            <p>終了日時 : </p>
                                            <input type="date" v-model="endDay" />
                                            <input type="time" v-model="endTime" />
                                        </v-col>
                                        <v-text-field label="タイトル" v-model="title"  />
                                        <v-text-field label="内容" v-model="details"  />
                                        <v-select label="カラー" v-model="color" :items="colors" item-text="name" item-value="value" />
                                        <v-select label="グループ" v-model="group" :items="groups" item-text="name" item-value="id" />
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
                </v-flex>
            </v-layout>
        </v-container>
    </v-dialog>
</template>

<script>
import timeTable3 from '/components/timeTable3.json'
export default {
    data: () => ({
        dialog: false,
        tab:"プライベート",
        startDay:'',
        startTime:'',
        endDay:'',
        endTime:'',
        title:'',
        details:'',
        group:'',
        color:'',
        groups:[
                {
                    id:"1",
                    name:"aaa"
                },
                {
                    id:"2",
                    name:"iii"
                },
                {
                    id:"3",
                    name:"uuu"
                }
            ],
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
        addGroupSchedule(){
            const Add = {
                title:this.title,
                start:this.startDay + 'T' + this.startTime,
                end:this.endDay + 'T' + this.endTime,
                color:this.color,
                group:this.group,
                details:this.details,
                category:"グループ"
            }
            console.log(Add)
            this.title=''
            this.startDay=''
            this.startTime=''
            this.endDay=''
            this.endTime=''
            this.color=''
            this.group=''
            this.details=''
            this.dialog = false
        },
        addPrivateSchedule(){
            const Add = {
                title:this.title,
                start:this.startDay + 'T' + this.startTime,
                end:this.endDay + 'T' + this.endTime,
                color:this.color,
                details:this.details,
                category:"プライベート"
            }
            console.log(Add)
            this.title=''
            this.startDay=''
            this.startTime=''
            this.endDay=''
            this.endTime=''
            this.color=''
            this.group=''
            this.details=''
            this.dialog = false
        }
    }
}
</script>
