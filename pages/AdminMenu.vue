<template>
  <div>
    <h1 
      class="pt-4"
    >
      <v-icon 
        size="1.5em" 
        color="icon"
      > 
      mdi-account-key 
      </v-icon>
      &emsp;管理者メニュー
    </h1>
    <v-divider></v-divider>
    <v-container 
      class="d-flex align-center" 
      style="height: 480px"
    >
      <v-row>
        <v-col 
          v-for="(menu, i) in menus" 
          :key="i" 
          cols="12" 
          sm="6"
        >
          <v-btn 
            color="accent" 
            :to="menu.to" 
            x-large 
            block>
            <h2>
              {{ menu.title }}
            </h2>
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
            to:"/teacher/ManagerGroupMember",
            title:"管理者管理"
        },
        {
            to:"/teacher/StudentGroupMember",
            title:"学生管理"
        },
        {
            to:"/teacher/Timetable",
            title:"時間割登録"
        },
        {
            to:"/teacher/EventManage",
            title:"イベント管理"
        },
        {
            to:"/teacher/ClassAdmin",
            title:"クラス管理"
        },
        {
            to:"/teacher/BBSApprove",
            title:"掲示板申請処理"
        }
      ]
    }),
    /* 未ログイン時index.vueに遷移 */
    middleware:"authenicated"
}
</script>
