<template>
<div>
<h1 class="pt-4">
    <v-icon
    size="1.5em"
    color="blue-grey darken-3">
      mdi-account-key
    </v-icon>
    &emsp;管理者メニュー</h1>
    <v-divider></v-divider>
<v-row
    style="height: 520px"
    justify="center"
    align-content="center"
    
>
<v-col
    cols="3">
<v-card
 elevation="0"
>
    <v-btn
        color="green lighten-1"
        elevation="12"
        width="550"
        height="120"
><h2>教室スケジュール管理</h2></v-btn>
<v-driver></v-driver>
</v-card>
<br>
<v-card
 elevation="0"
>
    <v-btn
        color="green lighten-1"
        elevation="12"
        width="550"
        height="120"
><h2>時間割管理</h2></v-btn>
</v-card>
<br>
<v-card
 elevation="0"
>
    <v-btn
        color="green lighten-1"
        elevation="12"
        width="550"
        height="120"
><h2>グループ管理</h2></v-btn>
</v-card>
</v-col>
<v-spacer></v-spacer>
<v-col
    cols="4.5">
<v-card
 elevation="0"
>
    <v-btn
        color="green lighten-1"
        elevation="12"
        width="550"
        height="120"
><h2>学生管理</h2></v-btn>
</v-card>
<br>
<v-card
 elevation="0"
>
    <v-btn
        color="green lighten-1"
        elevation="12"
        width="550"
        height="120"
><h2>イベント管理</h2></v-btn>
</v-card>
<br>
<v-card
 elevation="0"
>
    <v-btn
        color="green lighten-1"
        elevation="12"
        width="550"
        height="120"
></v-btn>
</v-card>
</v-col>
</v-row>

</div>
</template>
<script>
export default {
    data: () => ({
      menus:[
          {
              to:"/teacher/ManagerGroupMember",
              title:"管理者管理"
          },
          {
              to:"/teacher/StudentGroupMember",
              title:"学生管理"
          },
          {
              to:"/teacher/TimeScheduleAdd2",
              title:"時間割登録"
          },
          {
              to:"/teacher/EventManage",
              title:"イベント管理"
          },
          {
              to:"/teacher/GroupAdmin",
              title:"クラス管理"
          },
          {
              to:"/teacher/BBSApprove",
              title:"掲示板申請処理"
          }
      ]
    }),
}
</script>
