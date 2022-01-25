<template>
    <div>
        <template v-if="post.flag">
            <template v-if="post.user == user">
                <!--ログイン中ユーザなら削除ボタンの表示-->
                <!--v-menu-->
                <v-menu
                    v-model="dmenu"
                    absolute
                    offset-y
                    style="max-width: 300px">
                    <template v-slot:activator="{ on, attrs }">
                        <v-btn
                            icon
                            absolute
                            right
                            v-bind="attrs"
                            v-on="on">
                            <v-icon>mdi-dots-horizontal</v-icon>
                        </v-btn>
                    </template>
                    <v-list>
                        <v-list-item>
                            <v-dialog v-model="sakujo"  max-width="500px">
                                <template v-slot:activator="{ on, attrs }">
                                    <v-list-item-title
                                        v-bind="attrs"
                                        v-on="on">
                                        削除
                                    </v-list-item-title>
                                </template>
                                <v-card>
                                    <v-card-title>
                                        <span class="text-h5">このコメントを削除しますか？</span>
                                    </v-card-title>

                                    <v-card-text>
                                        <span class="text-h5">{{post.comment}}</span>
                                    </v-card-text>

                                    <v-card-actions>
                                        <v-spacer/>
                                        <v-btn
                                            color="red darken-2"
                                            text
                                            @click="sakujo=false">
                                            キャンセル
                                        </v-btn>
                                        <v-btn
                                            color="blue darken-1"
                                            text
                                            @click="delComment(post.id, post.thread_id)">
                                            削除
                                        </v-btn>
                                    </v-card-actions>
                                </v-card>
                            </v-dialog>
                        </v-list-item>
                    </v-list>
                </v-menu>
            </template>
            <p class="thread">{{no}}:{{post.user__username}}</p>
            <p class="comment">{{post.comment}}</p>
        </template>
    </div>
</template>

<script>
export default {
    data() {
    return {
        url:'https://sukusukuserver.7colordays.net/sukusuku/',
        delurl:'',
        sakujo:false,
        dmenu:false,
        cmdata:[],
        thread:this.$route.query.id,
    }
    },

    props:{
        post:Object,
        no:Number,
        user:String
    },

    methods:{
        delComment(comid,threadid){
            this.delurl = this.url + 'cmdel/?id=' + comid + '&thread=' + threadid
            console.log(this.delurl)
            fetch(this.delurl,{
                method:"GET",
                mode:"cors",
                credentials: 'include'
            }).then((res)=>res.json())
            .then(obj=>this.cmdata=obj)
            this.dmenu = false
            this.sakujo = false
            this.$emit("delete")
        }
    }
}
</script>

<style scoped>
.thread {
    padding:10px 1em 0 0.5em;
}
.comment {
    padding:0 1em 0 1em;
}
.divide {
    margin:8px;
}
.dbtn {
    max-width: 900px;
}
</style>