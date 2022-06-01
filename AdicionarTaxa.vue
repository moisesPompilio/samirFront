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
            v-on:click="limpa(), id_elemento()"
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
            @click="tipo_execuçao()"
          >
            {{ tipos.text }}
          </option>
        </select>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" sm="6" md="3">
        <v-btn @click="id_elemento()"> Adicionar </v-btn>
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
        item-key="codigo"
        class="elevation-1"
      >
      </v-data-table>
      {{ id_taxa }}
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
      ],
      taxas_exibir: [],
      todos_taxas:[],
      id_taxa: null,

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
      preguica: [1,2,3],
      tipo: "tipo 1, taxade 1023189dwjq,knSSds",
      informacao_taxa: [],
      int: 0,
    };
  },
  methods: {
    limpa(){
      this.taxas_exibir = [];
      this.id_taxa = null;
      this.informacao_taxa = [];
      this.todos_taxas = [];
      this.int = 0;

    },
    seletarTipoTaxa() {
      this.informacao_taxa.reverse;
      this.int = 0;
      this.informacao_taxa.forEach((value) => {
        if (this.int <=6) {
          const objeto = {
            data: value.data,
            taxaAcumulada: value.taxaAcumulada,
          };
          this.taxas_exibir.push(objeto);
          console.log(objeto);
        }
        else{
          console.logo('nada')
        }
      });
      console.log(this.taxas_exibir);
    },
    tipo_execuçao() {
      const url = `${baseApiUrl}/${this.taxa_modelo}/procurarPorTipo/${this.tipo}`
    /*  axios
        .get(url)
        .then((response) => (this.informacao_taxa = response.data));*/
         axios(url)
        .then((res) => {
          this.todas_taxas = res.data.map((obj) => {
            if (obj) {
              let data = obj.data.split("T");
              let dataReajuste = data.splice(0, 1);

              obj.data = dataReajuste.toString().split("-").reverse().join("/");

              this.informacao_taxa.push(obj);
              this.seletarTipoTaxa();
            }
          });
        })
        
    },
    id_elemento(){
      let url = `${baseApiUrl}/${this.taxa_modelo}/listar`
      /* axios
        .get(url)
        .then((response) => (this.todos_taxas = response.data));
         this.id_taxa = this.todos_taxas.length;*/
         axios(url)
        .then((res) => {
          this.todas_taxas = res.data.map((obj) => {
            if (obj) {
              let data = obj.data.split("T");
              let dataReajuste = data.splice(0, 1);

              obj.data = dataReajuste.toString().split("-").reverse().join("/");

              this.todos_taxas.push(obj);
              this.id_taxa = this.todos_taxas.length + 1;
            }
          });
        })
         
    },
  },
};
</script>

<style>
.select-valer {
  background-color: brown;
}
</style>