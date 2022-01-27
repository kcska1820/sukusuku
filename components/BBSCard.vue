<template>
    <div>
        <v-dialog v-model="enter"  max-width="500px">
            <v-card>
                <v-card-title>
                    <span class="text-h5">このスレッドに入室しますか？</span>
                </v-card-title>

                <v-card-text>
                    <span class="text-h5">{{item.title}}</span><br>
                    <span>{{item.note}}</span>
                </v-card-text>

                <v-card-actions>
                    <v-spacer/>
                    <v-btn
                        color="red darken-2"
                        text
                        @click="enter=false">
                        キャンセル
                    </v-btn>
                    <v-btn
                        color="blue darken-1"
                        text
                        :to="{
                        path:'/BBScon',
                        query:{
                        id:item.threadid
                        }}">
                        入室
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
        <v-dialog v-model="suspender" max-width="500px">
            <v-card>
                <v-card-title>
                    <span class="text-h5">このスレッドを凍結しますか？</span>
                </v-card-title>

                <v-card-text>
                    <span class="text-h5">{{item.title}}</span><br>
                    <span>{{item.note}}</span>
                </v-card-text>

                <v-card-actions>
                    <v-spacer/>
                    <v-btn
                        color="blue darken-1"
                        text
                        @click="suspender=false">
                        キャンセル
                    </v-btn>
                    <v-btn
                        color="red darken-2"
                        text
                        @click="suspend">
                        凍結
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
        <template v-if="item.master_id === user">
        <v-card color="info">
            <v-row>
                <v-col cols="12" sm="10" class="col">
                    <v-btn
                        text
                        x-large
                        block
                        @click="enter=true">
                        {{item.title}}
                    </v-btn>
                </v-col>
                <v-col cols="2" class="col">
                    <v-menu>
                    <template v-slot:activator="{ on, attrs }">
                        <v-btn
                            icon
                            x-large
                            v-bind="attrs"
                            v-on="on">
                            <v-icon
                                size="1em">
                                mdi-dots-horizontal
                            </v-icon>
                        </v-btn>
                    </template>
                    <v-list
                        class="list">
                        <v-btn
                            x-large
                            @click="suspender=true">
                            <v-list-item>
                                凍結
                            </v-list-item>
                        </v-btn>
                    </v-list>
                    </v-menu>
                </v-col>
            </v-row>
            <v-divider/>
        </v-card>
        </template>
        <template v-else>
        <v-card color="info">
            <v-row>
                <v-col cols="12" class="sup">
                    <v-btn
                        text
                        x-large
                        block
                        @click="enter=true">
                        {{item.title}}
                    </v-btn>
                </v-col>
            </v-row>
            <v-divider/>
        </v-card>
        </template>
    </div>
</template>
<script>
export default {
    data:()=>({
        url:'https://sukusukuserver.7colordays.net/sukusuku/',
        susurl:'',
        suspender:false,
        enter:false,
        touketu:false,
        btns:null,
        editedItem:{
            threadid:'',
            master_id:'',
            title:'',
            note:'',
            flag:'',
        },
    }),
    props:{
        item:Object,
        user:String
    },
    methods: {
        suspendConfirm (){
            this.suspender = true
            this.enter = false
        },

        suspend (){
            this.susurl = this.url + 'thdel/?threadid=' + this.item.threadid + '&title=' + this.item.title + '&flag=2&note=' + this.item.note + '&master=' + this.item.master_id
            fetch(this.susurl,{
                method:"GET",
                mode:"cors",
                credentials: 'include'
            })
            .then((res)=>res.json())
            .then(obj=>this.thdata=obj)
            this.suspender = false
        }
    }
}
</script>
<style scoped>
    .col{
        padding-top:0;
        padding-bottom:12;
    }

    .sup{
        padding-top:0;
        padding-bottom:12;
    }

    .list{
        padding:0
    }
</style>