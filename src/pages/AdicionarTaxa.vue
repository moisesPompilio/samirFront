<template>
  <v-card class="pa-3 my-3">
    <v-row>
      <v-col cols="12" sm="6" md="3">
        <label for="data-inicial" class="labels pb-3">Data da taxa</label>
        <v-text-field
          v-model="data_da_taxa"
          id="data-inicial"
          dense
          type="date"
          outlined
        ></v-text-field>
      </v-col>
      <v-col cols="12" sm="6" md="3">
        <label for="valor-taxa" class="labels pb-3">Valor da Taxa</label>
        <v-text-field
          v-model="taxa_inserida"
          id="valor-taxa"
          dense
          placeholder="Ex: 3.084"
          outlined
        ></v-text-field>
      </v-col>
      <v-col cols="12" sm="6" md="3">
        <label for="taxa-modelo" class="labels pb-3"
          >Qual modelo de taxa a ser inserida</label
        >
        <select v-model="taxa_modelo" class="select-valer">
          <option
            v-for="option in options"
            v-bind:value="option.value"
            v-bind:key="option.value"
            v-on:click="seletarTipoTaxa()"
          >
            {{ option.text }}
          </option>
        </select>
      </v-col>
      <v-col cols="12" sm="6" md="3">
        <label for="taxa-tipo" class="labels pb-3"
          >Qual Tipo de taxa a ser inserida</label
        >
        <select v-model="tipo" class="select-valer">
          <option
            v-for="tipos of tipo_taxa"
            v-bind:value="tipos.value"
            v-bind:key="tipos.value"
            dense
            @click="tipo_execuçao(tipo)"
          >
            {{ tipos.text }}
          </option>
        </select>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" sm="6" md="3">
        <v-btn @click="tipo_execuçao(true)"> Adicionar </v-btn>
      </v-col>
      <v-col cols="12" sm="6" md="3">
        <v-btn @click="seletarTipoTaxa()"> Excluir </v-btn>
      </v-col>
      <v-col cols="12" sm="6" md="3"> </v-col>
    </v-row>
    <v-row>
      <v-data-table
        :headers="headers"
        :items="taxas_exibir"
        item-key="name"
        class="elevation-1"
      >
      </v-data-table>
      {{ informacao_taxa }}
    </v-row>
  </v-card>
</template>

<script>
import axios from "axios";
import { baseApiUrl } from "../global";
export default {
  //name: "AdicionarTaxa",
  data: function () {
    return {
      taxa_inserida: 0,
      data_da_taxa: null,
      taxa_modelo: "correcao",
      headers: [
        { value: "data", text: "Data" },
        { value: "taxaAcumulada", text: "Taxa acumulada" },
        { value: "percentual", text: "Percentual" },
      ],
      taxas_exibir: [],

      options: [
        { text: "Correção", value: "correcao" },
        { text: "Reajuste", value: "reajuste" },
        { text: "Juros", value: "juros" },
      ],
      tipo_taxa: [
        { text: "tipo 1", value: "1" },
        { text: "Tipo 2", value: "2" },
        { text: "Tipo 3", value: "3" },
      ],
      tipo: "tipo 1, taxade 1023189dwjq,knSSds",
      informacao_taxa: [],
      int: 0,
    };
  },
  methods: {
    seletarTipoTaxa() {
      console.log("sleetar " + this.int);
      this.int += 1;
      this.informacao_taxa.forEach((value, index) => {
        if (index >= this.informacao_taxa.length - 6) {
          const objeto = {
            data: value.data,
            taxaAcumulada: value.taxaAcumulada,
            percentual: value.percentual,
          };
          this.taxas_exibir.push(objeto);
          console.log(this.taxas_exibir);
        }
      });
      console.log(this.taxas_exibir);
    },
    mounted() {
      axios
        .get("https://api.coindesk.com/v1/bpi/currentprice.json")
        .then((response) => (this.informacao_taxa = response));
    },
    tipo_execuçao(varia) {
      console.log(varia);
      axios
        .get(`${baseApiUrl}/${this.taxa_modelo}/procurarPorTipo/${this.tipo}`)
        .then((response) => (this.informacao_taxa = response));
      this.informacao_taxa.forEach((value, index) => {
        if (index >= this.informacao_taxa.length - 6) {
          const objeto = {
            data: this.informacao_taxa[index].data,
            taxaAcumulada: this.informacao_taxa[index].taxaAcumulada,
            percentual: this.informacao_taxa[index].percentual
          };
          this.taxas_exibir.push(objeto);
          console.log(index);
        }
      });
      console.log(this.taxas_exibir);
    },
  },
};
</script>

<style>
.select-valer {
  background-color: brown;
}
</style>