<template>
<div>
    <template v-if="post.thread == thread">
        <template v-if="post.flag == true">
            <p class="thread">{{i}}:{{post.name}}</p>
            <template v-if="post.user == 'st00000001'">
                <!--ログイン中ユーザなら削除ボタンの表示-->
                <v-dialog v-model="sakujo"  max-width="500px">
                    <template v-slot:activator="{ on, attrs }">
                        <v-btn
                            absolute
                            right
                            v-bind="attrs"
                            v-on="on">
                            削除
                        </v-btn>
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
                                @click="sakujo=false">
                                削除
                            </v-btn>
                        </v-card-actions>
                    </v-card>
                </v-dialog>
            </template>
            <p class="comment">{{post.comment}}</p>
        </template>
        <template v-else-if="post.user == 'st00000001'">
            <!--削除コメントがログイン中ユーザなら(削除済)込みで表示-->
            <p class="thread">{{i}}:{{post.name}} (削除済)</p>
            <p class="comment">{{post.comment}}</p>
        </template>
    </template>
</div>
</template>

<script>
export default {
    data() {
    return {
        sakujo:false,
        thread:Number(this.$route.query.id),
    }
    },
    props:{
        post:Object,
        i:Number
    },
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
</style>