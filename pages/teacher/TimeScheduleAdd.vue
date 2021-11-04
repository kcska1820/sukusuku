<template>
  <v-card
    class="mx-auto"
    width="1000"
  >


      <v-list-group
        :value="true"
        prepend-icon="mdi-account-circle"
      >
        <template v-slot:activator>
          <v-list-item-title>1限</v-list-item-title>
        </template>

        <v-list-group
          :value="true"
          no-action
          sub-group
        >
          <template v-slot:activator>
            <v-list-item-content>
              <v-list-item-title>科目</v-list-item-title>
            </v-list-item-content>
          </template>
          <v-list-item
            v-for="([title, icon], i) in subject"
            :key="i"
            link
          >
            <v-list-item-title v-text="title"></v-list-item-title>

            <v-list-item-icon>
              <v-icon v-text="icon"></v-icon>
            </v-list-item-icon>
          </v-list-item>
        </v-list-group>

        <v-list-group
          no-action
          sub-group
        >
          <template v-slot:activator>
            <v-list-item-content>
              <v-list-item-title>担当教師</v-list-item-title>
            </v-list-item-content>
          </template>

          <v-list-item
            v-for="([title, icon], i) in teacher"
            :key="i"
            link
          >
            <v-list-item-title v-text="title"></v-list-item-title>

            <v-list-item-icon>
              <v-icon v-text="icon"></v-icon>
            </v-list-item-icon>
          </v-list-item>
        </v-list-group>

        <v-list-group
          no-action
          sub-group
        >
          <template v-slot:activator>
            <v-list-item-content>
              <v-list-item-title>教室</v-list-item-title>
            </v-list-item-content>
          </template>


          <v-list-group
          no-action
          sub-group
        >
          <template v-slot:activator>
            <v-list-item-content>
              <v-list-item-title>1F</v-list-item-title>
            </v-list-item-content>
          </template>
          <v-list-item
            v-for="([title, icon], i) in first"
            :key="i"
            link
          >
            <v-list-item-title v-text="title"></v-list-item-title>
            <v-list-item-icon>
              <v-icon v-text="icon"></v-icon>
            </v-list-item-icon>
          </v-list-item>
        </v-list-group>



        <v-list-group
          no-action
          sub-group
        >
          <template v-slot:activator>
            <v-list-item-content>
              <v-list-item-title>2F</v-list-item-title>
            </v-list-item-content>
          </template>
          <v-list-item
            v-for="([title, icon], i) in second"
            :key="i"
            link
          >
            <v-list-item-title v-text="title"></v-list-item-title>
            <v-list-item-icon>
              <v-icon v-text="icon"></v-icon>
            </v-list-item-icon>
          </v-list-item>
        </v-list-group>


        <v-list-group
          no-action
          sub-group
        >
          <template v-slot:activator>
            <v-list-item-content>
              <v-list-item-title>3F</v-list-item-title>
            </v-list-item-content>
          </template>
          <v-list-item
            v-for="([title, icon], i) in third"
            :key="i"
            link
          >
            <v-list-item-title v-text="title"></v-list-item-title>
            <v-list-item-icon>
              <v-icon v-text="icon"></v-icon>
            </v-list-item-icon>
          </v-list-item>
        </v-list-group>


        <v-list-group
          no-action
          sub-group
        >
          <template v-slot:activator>
            <v-list-item-content>
              <v-list-item-title>4F</v-list-item-title>
            </v-list-item-content>
          </template>
          <v-list-item
            v-for="([title, icon], i) in fourth"
            :key="i"
            link
          >
            <v-list-item-title v-text="title"></v-list-item-title>
            <v-list-item-icon>
              <v-icon v-text="icon"></v-icon>
            </v-list-item-icon>
          </v-list-item>
        </v-list-group>
        </v-list-group>
      </v-list-group>


      <v-list-group
        :value="true"
        prepend-icon="mdi-account-circle"
      >
        <template v-slot:activator>
          <v-list-item-title>1限</v-list-item-title>
        </template>

        <v-list-group
          :value="true"
          no-action
          sub-group
        >
          <template v-slot:activator>
            <v-list-item-content>
              <v-list-item-title>科目</v-list-item-title>
            </v-list-item-content>
          </template>
          <v-list-item
            v-for="([title, icon], i) in subject"
            :key="i"
            link
          >
            <v-list-item-title v-text="title"></v-list-item-title>

            <v-list-item-icon>
              <v-icon v-text="icon"></v-icon>
            </v-list-item-icon>
          </v-list-item>
        </v-list-group>

        <v-list-group
          no-action
          sub-group
        >
          <template v-slot:activator>
            <v-list-item-content>
              <v-list-item-title>担当教師</v-list-item-title>
            </v-list-item-content>
          </template>

          <v-list-item
            v-for="([title, icon], i) in teacher"
            :key="i"
            link
          >
            <v-list-item-title v-text="title"></v-list-item-title>

            <v-list-item-icon>
              <v-icon v-text="icon"></v-icon>
            </v-list-item-icon>
          </v-list-item>
        </v-list-group>

        <v-list-group
          no-action
          sub-group
        >
          <template v-slot:activator>
            <v-list-item-content>
              <v-list-item-title>教室</v-list-item-title>
            </v-list-item-content>
          </template>


          <v-list-group
          no-action
          sub-group
        >
          <template v-slot:activator>
            <v-list-item-content>
              <v-list-item-title>1F</v-list-item-title>
            </v-list-item-content>
          </template>
          <v-list-item
            v-for="([title, icon], i) in first"
            :key="i"
            link
          >
            <v-list-item-title v-text="title"></v-list-item-title>
            <v-list-item-icon>
              <v-icon v-text="icon"></v-icon>
            </v-list-item-icon>
          </v-list-item>
        </v-list-group>



        <v-list-group
          no-action
          sub-group
        >
          <template v-slot:activator>
            <v-list-item-content>
              <v-list-item-title>2F</v-list-item-title>
            </v-list-item-content>
          </template>
          <v-list-item
            v-for="([title, icon], i) in second"
            :key="i"
            link
          >
            <v-list-item-title v-text="title"></v-list-item-title>
            <v-list-item-icon>
              <v-icon v-text="icon"></v-icon>
            </v-list-item-icon>
          </v-list-item>
        </v-list-group>


        <v-list-group
          no-action
          sub-group
        >
          <template v-slot:activator>
            <v-list-item-content>
              <v-list-item-title>3F</v-list-item-title>
            </v-list-item-content>
          </template>
          <v-list-item
            v-for="([title, icon], i) in third"
            :key="i"
            link
          >
            <v-list-item-title v-text="title"></v-list-item-title>
            <v-list-item-icon>
              <v-icon v-text="icon"></v-icon>
            </v-list-item-icon>
          </v-list-item>
        </v-list-group>


        <v-list-group
          no-action
          sub-group
        >
          <template v-slot:activator>
            <v-list-item-content>
              <v-list-item-title>4F</v-list-item-title>
            </v-list-item-content>
          </template>
          <v-list-item
            v-for="([title, icon], i) in fourth"
            :key="i"
            link
          >
            <v-list-item-title v-text="title"></v-list-item-title>
            <v-list-item-icon>
              <v-icon v-text="icon"></v-icon>
            </v-list-item-icon>
          </v-list-item>
        </v-list-group>
        </v-list-group>
      </v-list-group>

      
      <v-list-group
        :value="true"
        prepend-icon="mdi-account-circle"
      >
        <template v-slot:activator>
          <v-list-item-title>1限</v-list-item-title>
        </template>

        <v-list-group
          :value="true"
          no-action
          sub-group
        >
          <template v-slot:activator>
            <v-list-item-content>
              <v-list-item-title>科目</v-list-item-title>
            </v-list-item-content>
          </template>
          <v-list-item
            v-for="([title, icon], i) in subject"
            :key="i"
            link
          >
            <v-list-item-title v-text="title"></v-list-item-title>

            <v-list-item-icon>
              <v-icon v-text="icon"></v-icon>
            </v-list-item-icon>
          </v-list-item>
        </v-list-group>

        <v-list-group
          no-action
          sub-group
        >
          <template v-slot:activator>
            <v-list-item-content>
              <v-list-item-title>担当教師</v-list-item-title>
            </v-list-item-content>
          </template>

          <v-list-item
            v-for="([title, icon], i) in teacher"
            :key="i"
            link
          >
            <v-list-item-title v-text="title"></v-list-item-title>

            <v-list-item-icon>
              <v-icon v-text="icon"></v-icon>
            </v-list-item-icon>
          </v-list-item>
        </v-list-group>

        <v-list-group
          no-action
          sub-group
        >
          <template v-slot:activator>
            <v-list-item-content>
              <v-list-item-title>教室</v-list-item-title>
            </v-list-item-content>
          </template>


          <v-list-group
          no-action
          sub-group
        >
          <template v-slot:activator>
            <v-list-item-content>
              <v-list-item-title>1F</v-list-item-title>
            </v-list-item-content>
          </template>
          <v-list-item
            v-for="([title, icon], i) in first"
            :key="i"
            link
          >
            <v-list-item-title v-text="title"></v-list-item-title>
            <v-list-item-icon>
              <v-icon v-text="icon"></v-icon>
            </v-list-item-icon>
          </v-list-item>
        </v-list-group>



        <v-list-group
          no-action
          sub-group
        >
          <template v-slot:activator>
            <v-list-item-content>
              <v-list-item-title>2F</v-list-item-title>
            </v-list-item-content>
          </template>
          <v-list-item
            v-for="([title, icon], i) in second"
            :key="i"
            link
          >
            <v-list-item-title v-text="title"></v-list-item-title>
            <v-list-item-icon>
              <v-icon v-text="icon"></v-icon>
            </v-list-item-icon>
          </v-list-item>
        </v-list-group>


        <v-list-group
          no-action
          sub-group
        >
          <template v-slot:activator>
            <v-list-item-content>
              <v-list-item-title>3F</v-list-item-title>
            </v-list-item-content>
          </template>
          <v-list-item
            v-for="([title, icon], i) in third"
            :key="i"
            link
          >
            <v-list-item-title v-text="title"></v-list-item-title>
            <v-list-item-icon>
              <v-icon v-text="icon"></v-icon>
            </v-list-item-icon>
          </v-list-item>
        </v-list-group>


        <v-list-group
          no-action
          sub-group
        >
          <template v-slot:activator>
            <v-list-item-content>
              <v-list-item-title>4F</v-list-item-title>
            </v-list-item-content>
          </template>
          <v-list-item
            v-for="([title, icon], i) in fourth"
            :key="i"
            link
          >
            <v-list-item-title v-text="title"></v-list-item-title>
            <v-list-item-icon>
              <v-icon v-text="icon"></v-icon>
            </v-list-item-icon>
          </v-list-item>
        </v-list-group>
        </v-list-group>
      </v-list-group>
      
      <v-list-group
        :value="true"
        prepend-icon="mdi-account-circle"
      >
        <template v-slot:activator>
          <v-list-item-title>4限</v-list-item-title>
        </template>

        <v-list-group
          :value="true"
          no-action
          sub-group
        >
          <template v-slot:activator>
            <v-list-item-content>
              <v-list-item-title>Admin</v-list-item-title>
            </v-list-item-content>
          </template>

          <v-list-item
            v-for="([title, icon], i) in admins"
            :key="i"
            link
          >
            <v-list-item-title v-text="title"></v-list-item-title>

            <v-list-item-icon>
              <v-icon v-text="icon"></v-icon>
            </v-list-item-icon>
          </v-list-item>
        </v-list-group>

        <v-list-group
          no-action
          sub-group
        >
          <template v-slot:activator>
            <v-list-item-content>
              <v-list-item-title>Actions</v-list-item-title>
            </v-list-item-content>
          </template>

          <v-list-item
            v-for="([title, icon], i) in cruds"
            :key="i"
            link
          >
            <v-list-item-title v-text="title"></v-list-item-title>

            <v-list-item-icon>
              <v-icon v-text="icon"></v-icon>
            </v-list-item-icon>
          </v-list-item>
        </v-list-group>
      </v-list-group>
  </v-card>
</template>

<script>
  export default {
    data: () => ({
      subject: [
        ['アプリケーション開発技術', 'mdi-account-multiple-outline'],
        ['卒業研究', 'mdi-cog-outline'],
      ],
      teacher: [
        ['切口先生', 'mdi-plus-outline'],
        ['坂中先生', 'mdi-file-outline'],
        ['福留先生', 'mdi-update'],
        ['永谷先生', 'mdi-delete'],
      ],
        first: [
        ['101', 'mdi-plus-outline'],
        ['102', 'mdi-file-outline'],
        ['104', 'mdi-update'],
      ],
        second: [
        ['201', 'mdi-plus-outline'],
        ['202', 'mdi-file-outline'],
        ['203', 'mdi-update'],
        ['進路指導室', 'mdi-update'],
        ['図書室', 'mdi-update'],
      ],
        third: [
        ['301', 'mdi-plus-outline'],
        ['302', 'mdi-file-outline'],
        ['303', 'mdi-update'],
        ['304', 'mdi-update'],
        ['305', 'mdi-update'],
      ],
        fourth: [
        ['401', 'mdi-plus-outline'],
        ['402', 'mdi-file-outline'],
        ['403', 'mdi-update'],
        ['404', 'mdi-update'],
      ],
    }),
  }
</script>