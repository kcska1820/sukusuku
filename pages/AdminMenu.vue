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
    <v-container
    class="d-flex align-center"
    >
    <v-row>
        <v-col
            v-for="(menu,i) in menus"
            :key="i"
            cols="12" sm="6"
        >
            <v-btn
                color="accent"
                :to="menu.to"
                x-large
                block
            >
                <h2>{{menu.title}}</h2>
            </v-btn>
        </v-col>
    </v-row>
    </v-container>
</div>
</template>
<script>
export default {
    data: () => ({
      menus:[
          {
              to:"/teacher/RoomSchedule",
              title:"教室スケジュール管理"
          },
          {
              to:"/teacher/StudentGroupMember",
              title:"学生管理"
          },
          {
              to:"/teacher/TimeSchedule",
              title:"時間割管理"
          },
          {
              to:"/teacher/EventManage",
              title:"イベント管理"
          },
          {
              to:"/teacher/GroupAdmin",
              title:"グループ管理"
          }
      ]
    }),
}
</script>
