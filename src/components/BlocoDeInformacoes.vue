<template>
  <div>
    <v-row>
      <button @click="dadosActive()">
        Prencher dados Manualmente <v-icon>mdi-menu-up</v-icon>
      </button>
    </v-row>
    <v-row v-if="exibir.tudo" class="mx-3">
      <v-col cols="12" sm="6" md="3">
        <label for="numeroProcesso" class="labels pb-3"
          >Número do Processo</label
        >
        <v-text-field
          v-model="numeroDoProcesso"
          id="numeroProcesso"
          dense
          plyaaceholder="Número Processo"
          outlined
        ></v-text-field>
      </v-col>
      <v-col cols="12" sm="6" md="6">
        <label for="nome" class="labels pb-3">Nome</label>
        <v-text-field
          v-model="nome"
          id="nome"
          dense
          placeholder="Nome"
          outlined
        ></v-text-field>
      </v-col>
      <v-col cols="12" sm="6" md="3">
        <label for="dataAjuizamento" class="labels pb-3"
          >Data Ajuizamento</label
        >
        <v-text-field
          v-model="dataAjuizamento"
          id="dataAjuizamento"
          dense
          type="text"
          outlined
        ></v-text-field>
      </v-col>
    </v-row>
    <v-row class="mx-3" v-if="exibir.tudo">
      <v-col cols="12" sm="6" md="3">
        <label for="cpf" class="labels pb-3">CPF</label>
        <v-text-field
          v-model="cpf"
          id="cpf"
          dense
          placeholder="cpf"
          outlined
        ></v-text-field>
      </v-col>
      <v-col cols="12" sm="6" md="3">
        <label for="dtDibInicial" class="labels pb-3">Termo Inicial</label>
        <v-text-field
          v-model="dibInicial"
          id="dtDibInicial"
          dense
          type="text"
          outlined
        ></v-text-field>
      </v-col>
      <v-col cols="12" sm="6" md="3">
        <label for="dtDibFinal" class="labels pb-3">Termo Final</label>
        <v-text-field
          v-model="dibFinal"
          id="dtDibFinal"
          dense
          type="text"
          outlined
        ></v-text-field>
      </v-col>
      <v-col cols="12" sm="6" md="3">
        <label for="rmi" class="labels pb-3">RMI</label>
        <v-text-field
          v-model="rmi"
          id="rmi"
          dense
          placeholder="R$ - "
          @input="rmi = formataçao(rmi)"
          outlined
        ></v-text-field>
      </v-col>
    </v-row>
    <v-row class="mx-3" v-if="exibir.tudo">
      <v-col cols="12" sm="6" md="3">
        <label for="beneficio" class="labels pb-3">Benefício</label>
        <v-text-field
          v-model="beneficio"
          id="beneficio"
          dense
          placeholder="Beneficio"
          outlined
        ></v-text-field>
      </v-col>
      <v-col cols="12" sm="6" md="3">
        <label for="nb" class="labels pb-3">Número do benefíco</label>
        <v-text-field
          v-model="nb"
          id="nb"
          dense
          placeholder="Número do benefício"
          outlined
        ></v-text-field>
      </v-col>
      <v-col cols="12" sm="6" md="3">
        <label for="dip" class="labels pb-3">Data Início de Pagamento</label>
        <v-text-field
          v-model="dip"
          id="dip"
          dense
          type="text"
          outlined
        ></v-text-field>
      </v-col>
      <v-col cols="12" sm="6" md="3">
        <label for="dip" class="labels pb-3">Citação</label>
        <v-text-field
          v-model="citacao"
          id="citacao"
          dense
          type="text"
          outlined
        ></v-text-field>
      </v-col>
    </v-row>
    <v-row class="mx-3" v-if="exibir.tudo">
      <v-col cols="12" sm="6" md="6">
        <label for="aps" class="labels pb-3">APS</label>
        <v-text-field
          v-model="aps"
          id="aps"
          dense
          placeholder="Aps"
          outlined
        ></v-text-field>
      </v-col>
      <v-col cols="12" sm="6" md="6">
        <label for="urlProcesso" class="labels pb-3">URL do processo</label>
        <v-text-field
          v-model="urlProcesso"
          id="urlProcesso"
          dense
          placeholder="Exp: https://sapiens.agu.gov.br"
          outlined
        ></v-text-field>
      </v-col>
      <v-row class="mx-3" v-if="exibir.tudo">
        <v-col cols="12" sm="6" md="2">
          <label for="beneficioAcumulado.beneficio" class="labels pb-3"
            >Beneficio Acumulado?</label
          >
          <v-text-field
            v-model="beneficioAcumulado.beneficio"
            id="beneficioAcumulado_beneficio"
            dense
            placeholder=""
            outlined
          ></v-text-field>
        </v-col>
        <v-col cols="12" sm="6" md="2">
          <label for="beneficioAcumulado.dib" class="labels pb-3">DIB </label>
          <v-text-field
            v-model="beneficioAcumulado.dib"
            id="beneficioAcumulado_dib"
            dense
            placeholder=""
            outlined
          ></v-text-field>
        </v-col>
        <v-col cols="12" sm="6" md="2">
          <label for="beneficioAcumulado.dif" class="labels pb-3">DCB</label>
          <v-text-field
            v-model="beneficioAcumulado.dif"
            id="beneficioAcumulado_dif"
            dense
            placeholder=""
            outlined
          ></v-text-field>
        </v-col>
        <v-col cols="12" sm="6" md="2">
          <label for="beneficioAcumulado.rmi" class="labels pb-3">RMI</label>
          <v-text-field
            v-model="beneficioAcumulado.rmi"
            id="beneficioAcumulado_rmi"
            dense
            placeholder=""
            outlined
          ></v-text-field>
        </v-col>
        <v-col cols="12" sm="6" md="2">
          <v-btn color="primary" @click="pushBeneficio()" id="beneficioBtn"
            >Adicinar Beneficio</v-btn
          >
        </v-col>
      </v-row>
      <v-btn color="primary" @click="pushInfos(infos)" id="adicionarButton"
        >Adicionar</v-btn
      >
    </v-row>
    <v-card-title class="mt-5">
      <button @click="exibirActive(), redirectToCalculo()">
        Tabela de Processos <v-icon>mdi-menu-up</v-icon>
      </button></v-card-title
    >
    <v-data-table
      v-if="exibir.processos"
      :headers="headers"
      :items="infos"
      item-key="name"
      class="elevation-1"
    >
      <template v-slot:item="{ item }">
        <tr>
          <td
            class="py-3"
            style="color: rgb(107, 107, 218); cursor: pointer"
            @click="tranferir(item.id)"
          >
            {{ item.numeroDoProcesso }}
          </td>
          <td>{{ item.nome }}</td>
          <td>{{ item.id }}</td>
          <td>
            <v-btn icon @click="tranferir(item.id)">
              <v-icon color="success">mdi-file-eye-outline</v-icon>
            </v-btn>
          </td>
        </tr>
      </template>
    </v-data-table>
  </div>
</template>

<script>
export default {
  name: "Processos",
  props: ["exibir"],
  data: function () {
    return {
      id: 0,
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
      citacao: "",
      aps: "",
      urlProcesso: "",
      headers: [
        { value: "numeroDoProcesso", text: "Número do Processo" },
        { value: "nome", text: "Nome " },
        { value: "id", text: "ID" },
        { value: "actions", text: "" },
      ],
      infos: [],
      calculo: {},
      beneficioAcumulado: { beneficio: null, dib: null, dif: null, rmi: null },
      array_beneficioAcumulado: [],
      //exibir: {tudo: true, processos: false },
    };
  },
  methods: {
    //teste
    redirectToCalculo() {
      this.$router.push(`/home`).catch(() => {});
    },
    dadosActive() {
      let dados = !this.exibir.tudo;
      this.$emit("dados", dados);
    },
    exibirActive() {
      let processos = !this.exibir.processos;
      this.$emit("processos", processos);
    },
    pushInfos() {
      if (!this.numeroDoProcesso) {
        return;
      }
      this.infos.push({
        id: this.infos.length,
        numeroDoProcesso: this.numeroDoProcesso,
        nome: this.nome,
        dataAjuizamento: this.dataAjuizamento,
        cpf: this.cpf,
        dibInicial: this.dibInicial,
        dibFinal: this.dibFinal,
        rmi: this.rmi,
        beneficio: this.beneficio,
        nb: this.nb,
        dip: this.dip,
        aps: this.aps,
        citacao: this.citacao,
        beneficiosAcumulados: this.array_beneficioAcumulado,
        urlProcesso: this.urlProcesso,
      });
      this.cleanFields();
      this.saveInfos();
    },
    removeCat(x) {
      this.infos.splice(x, 1);
      this.saveInfos();
    },
    saveInfos() {
      const parsed = JSON.stringify(this.infos);
      localStorage.setItem("infos", parsed);
    },
    cleanFields() {
      this.numeroDoProcesso = "";
      this.nome = "";
      this.dataAjuizamento = "";
      this.cpf = "";
      this.dibInicial = "";
      this.dibFinal = "";
      this.rmi = "";
      this.beneficio = "";
      this.nb = "";
      this.dip = "";
      this.aps = "";
      this.citacao = "";
      this.array_beneficioAcumulado = [];
      this.urlProcesso = "";
    },
    formataçao(valor) {
      return valor;
    },
    preencherFields(y) {
      this.numeroDoProcesso = this.infos[y].numeroDoProcesso;
      this.nome = this.infos[y].nome;
      this.dataAjuizamento = this.infos[y].dataAjuizamento;
      this.cpf = this.infos[y].cpf;
      this.dibInicial = this.infos[y].dibInicial;
      this.dibFinal = this.infos[y].dibFinal;
      this.rmi = this.infos[y].rmi;
      this.beneficio = this.infos[y].beneficio;
      this.nb = this.infos[y].nb;
      this.dip = this.infos[y].dip;
      this.aps = this.infos[y].aps;
      this.citacao = this.infos[y].citacao;
      this.urlProcesso = this.infos[y].urlProcesso;
    },
    pushBeneficio() {
      this.array_beneficioAcumulado.push(this.beneficioAcumulado);
      this.cleanBeneficio();
    },
    cleanBeneficio() {
      this.beneficioAcumulado = {
        beneficio: null,
        dib: null,
        dif: null,
        rmi: null,
      };
    },
    tranferir(y) {
      this.redirectToCalculo();
      this.preencherFields(y);
      this.calculo = this.infos[y];
      this.$emit("calculo", this.calculo);
    },
  },
  mounted() {
    if (localStorage.getItem("infos")) {
      try {
        this.infos = JSON.parse(localStorage.getItem("infos"));
      } catch (e) {
        localStorage.removeItem("infos");
      }
    }
  },
};
</script>

<style >
</style>
