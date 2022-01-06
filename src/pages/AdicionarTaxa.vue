<template>
  <v-card class="pa-3 my-3">
    <v-row>
      <v-col cols="12" sm="6" md="3">
        <label for="data-inicial" class="labels pb-3">Data da taxa</label>
        <v-text-field
          v-model="data"
          id="data-inicial"
          dense
          type="date"
          outlined
        ></v-text-field>
      </v-col>
      <v-col cols="12" sm="6" md="3">
        <label for="valor-taxa" class="labels pb-3">Valor da Taxa</label>
        <v-text-field
          v-model="salarioInicial"
          id="valor-taxa"
          dense
          placeholder="Ex: 3.084"
          outlined
        ></v-text-field>
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
export default {
  name: "AdicionarTaxa",
};
</script>

<style>
</style>