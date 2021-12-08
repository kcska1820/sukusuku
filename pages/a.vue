<template>
  <v-form>
    <v-container>
      <v-row>
        <v-col
          cols="12"
          sm="6"
        >
          <v-text-field
            v-model="email"
            :rules="[rules.required]"
            label="E-mail"
          ></v-text-field>
        </v-col>
      </v-row>
    </v-container>
  </v-form>
</template>
<script>
  export default {
    data () {
      return {
        email: '',
        rules: {
          required: value => !!value || 'ｄｄｄｄｄｄ',
        },
      }
    },
  }
</script>