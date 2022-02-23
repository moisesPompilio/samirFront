<template>
  <v-container class="processos">
    <v-card>
      <v-card-title>Processos vindos do Beremir</v-card-title>
      <v-card-subtitle
        >Aqui você encontra uma tabela de processos que passaram pela triagem do
        Beremir.</v-card-subtitle
      >
    </v-card>
    <v-card class="mt-5">
      <v-card>
        <bloco-informacoes></bloco-informacoes>
    </v-card>
     
    </v-card>
  </v-container>
</template>

<script>
import BlocoDeInformacoes from "../components/BlocoDeInformacoes.vue";
export default {
  components: {
    "bloco-informacoes": BlocoDeInformacoes,
  },


  name: "Processos",
  data: function () {
    return {
      numeroDoProcesso: "",
      nome: "",
      dataAjuizamento: "",
      cpf: "",
      dibInicial: "",
      dibFinal: "",
      rmi: "",
      beneficio: "",
      nb: "",
      dip: "",
      aps: "",
      headers: [
        { value: "nup", text: "NUP" },
        { value: "interessados", text: "Interessados " },
        { value: "actions" },
      ],
    };
  },
  methods: {
    redirectToCalculo() {
      this.$router.push(`/home`).catch(() => {});
    },
  },
};
</script>

<style>
.processos {
  height: auto;
  min-height: 120vh;
}
</style>
