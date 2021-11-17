<template>
<div>
    <h1>
    教室スケジュール画面
    </h1>
    <v-divider></v-divider>
        <br>
  <v-row justify="center">
    <v-col
      cols="12"
      sm="10"
      md="8"
      lg="10"
    >
<<<<<<< HEAD
      <v-card ref="form">
=======
    <br>
    <h1>
    教室スケジュール
    </h1>
    <v-divider></v-divider>
    <br>
      <v-card ref="form" style="width:1200px">
>>>>>>> f35bf698dd670eec2550e882d357041fa98b75bc
        <v-card-text>
          <v-autocomplete
            ref="country"
            v-model="country"
            :rules="[() => !!country || 'This field is required']"
            :items="countries1"
            label="1階を選択してください"
            placeholder="Select..."
            required
          ></v-autocomplete>

          <v-autocomplete
            ref="country"
            v-model="country"
            :rules="[() => !!country || 'This field is required']"
            :items="countries2"
            label="2階を選択してください"
            placeholder="Select..."
            required
          ></v-autocomplete>
          
          <v-autocomplete
            ref="country"
            v-model="country"
            :rules="[() => !!country || 'This field is required']"
            :items="countries3"
            label="3階を選択してください"
            placeholder="Select..."
            required
          ></v-autocomplete>

          <v-autocomplete
            ref="country"
            v-model="country"
            :rules="[() => !!country || 'This field is required']"
            :items="countries4"
            label="4階を選択してください"
            placeholder="Select..."
            required
          ></v-autocomplete>

        </v-card-text>
        <v-divider class="mt-12"></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-slide-x-reverse-transition>
            <v-tooltip
              v-if="formHasErrors"
              left
            >
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  icon
                  class="my-0"
                  v-bind="attrs"
                  @click="resetForm"
                  v-on="on"
                >
                  <v-icon>mdi-refresh</v-icon>
                </v-btn>
              </template>
              <span>Refresh form</span>
            </v-tooltip>
          </v-slide-x-reverse-transition>
          <v-btn
            color="primary"
            text
            @click="submit"
            to="/teacher/RoomScheduleDetail"
          >
            詳細を表示
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
  </div>
</template>

<script>
  export default {
    data: () => ({
      countries1: ['101','102'],
      countries2: ['201','202','203'],
      countries3: ['301','302','303','304','305'],
      countries4: ['401','402','403','404'],
      errorMessages: '',
      country: null,
      formHasErrors: false,
    }),

    computed: {
      form () {
        return {
          country: this.country,
        }
      },
    },

    watch: {
      name () {
        this.errorMessages = ''
      },
    },

    methods: {
      addressCheck () {
        this.errorMessages = this.address && !this.name
          ? `Hey! I'm required`
          : ''

        return true
      },
      resetForm () {
        this.errorMessages = []
        this.formHasErrors = false

        Object.keys(this.form).forEach(f => {
          this.$refs[f].reset()
        })
      },
      submit () {
        this.formHasErrors = false

        Object.keys(this.form).forEach(f => {
          if (!this.form[f]) this.formHasErrors = true

          this.$refs[f].validate(true)
        })
      },
    },
  }
</script>