<template>
  <div>
      <v-row>
          <v-col>
    <v-btn></v-btn>
    <v-progress-linear
      v-model="power"
      color="amber"
      height="25"
    ></v-progress-linear>
          </v-col>
      </v-row>

    <br>

    <v-progress-linear
      v-model="skill"
      color="blue-grey"
      height="25"
    >
      <template v-slot:default="{ value }">
        <strong>{{ Math.ceil(value) }}%</strong>
      </template>
    </v-progress-linear>

    <br>

    <v-progress-linear
      v-model="knowledge"
      height="25"
    >
      <strong>{{ Math.ceil(knowledge) }}%</strong>
    </v-progress-linear>
  </div>
</template>
<script>
  export default {
    data: () => ({
      skill: 0,
      knowledge: 0,
      power: 0,
    }),
  }
</script>