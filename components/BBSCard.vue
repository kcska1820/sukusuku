<template>
    <v-card>
        <v-dialog v-model="enter"  max-width="500px">
            <template v-slot:activator="{ on, attrs }">
            <v-btn
                text
                large
                v-bind="attrs"
                v-on="on">
                {{item.title}}
            </v-btn>
            </template>
            <v-card>
                <v-card-title>
                    <span class="text-h5">この掲示板に入室しますか？</span>
                </v-card-title>

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
                        id:item.id
                        }}">
                        入室
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
        <template v-if="item.master == 'st00000001'">
        <!--ログイン中ユーザなら削除ボタンの表示-->
        <v-dialog
            v-model="touketu"
            max-width="500px"
        >
            <template v-slot:activator="{ on, attrs }">
                <v-btn
                absolute
                    right
                    large
                    v-bind="attrs"
                    v-on="on"
                >
                凍結
                </v-btn>
            </template>
            <v-card>
                <v-card-title>
                    <span class="text-h5">掲示板を凍結し、非表示にします。<br>よろしいですか？</span>
                </v-card-title>

                <v-card-actions>
                    <v-spacer/>
                    <v-btn
                      color="red darken-2"
                      text
                      @click="touketu=false"
                    >
                      キャンセル
                    </v-btn>
                    <v-btn
                      color="blue darken-1"
                      text
                      @click="save"
                    >
                      凍結
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
            </template>
          </v-card>
</template>
<script>
export default {
    data:()=>({
        enter:false,
        touketu:false,
    }),
    props:{
        item:Object    
    }
}
</script>