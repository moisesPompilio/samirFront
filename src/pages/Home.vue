<template>
  <v-container fluid>
    <div class="title pl-5 py-3">
      <h1>Samir</h1>
    </div>
    <v-card>
      <v-tabs>
        <v-tabs-slider color="green"></v-tabs-slider>
        <v-tab @click="add_taxa = false">Cálculo</v-tab>
        <v-tab @click="add_taxa = true">Adicionar Taxa</v-tab>
      </v-tabs>
    </v-card>
    <v-card class="pa-3 my-3" v-if="add_taxa == false">
      <v-row>
        <v-col cols="12" sm="6" md="3">
          <label for="data-inicial" class="labels pb-3">Data Inicial</label>
          <v-text-field
            v-model="dtInicial"
            id="data-inicial"
            dense
            type="date"
            outlined
          ></v-text-field>
        </v-col>
        <v-col cols="12" sm="6" md="3">
          <label for="data_final" class="labels pb-3">Data Final</label>
          <v-text-field
            v-model="dtFinal"
            id="data-final"
            dense
            type="date"
            outlined
          ></v-text-field>
        </v-col>
        <v-col cols="12" sm="6" md="3">
          <label for="valor-devido" class="labels pb-3">Valor Devido</label>
          <v-text-field
            v-model="salarioInicial"
            id="valor-devido"
            dense
            placeholder="R$ - "
            outlined
          ></v-text-field>
        </v-col>
      </v-row>

      <!-- CHECKBOX  -->

      <b-row class="row-one my-3 align-items-center">
        <b-col sm="2">
          <input
            class="form-check-input"
            style="margin-right: 5px"
            type="checkbox"
            :value="beneficio"
            v-model="beneficio"
            id="flexCheckDefault"
          />
          <label class="form-check-label labels" for="flexCheckDefault">
            Recebeu Benefício
          </label>
        </b-col>
        <b-col sm="3" v-if="beneficio === true">
          <label for="beneficio" class="labels">Qual Benefício?</label>
          <b-form-input
            id="beneficio"
            type="text"
            size="sm"
            placeholder="Ex: Auxílio Desemprego"
          ></b-form-input>
        </b-col>
        <b-col sm="3" v-if="beneficio === true">
          <label for="beneficio_inicial" class="labels"
            >Início do Benefício</label
          >
          <b-form-input
            id="beneficio_inicial"
            type="date"
            size="sm"
          ></b-form-input>
        </b-col>
        <b-col sm="3" v-if="beneficio === true">
          <label for="beneficio_final" class="labels">Fim do Benefício</label>
          <b-form-input
            id="beneficio_final"
            type="date"
            size="sm"
          ></b-form-input>
        </b-col>
      </b-row>

      <!-- BOTÕES -->

      <v-row class="my-3">
        <v-col cols="1" class="mr-6">
          <v-btn
            depressed
            color="primary"
            @click="(mode = 'table'), informacoesCalculo()"
            >Calcular</v-btn
          >
        </v-col>
        <v-col cols="1">
          <v-btn
            depressed
            color="secondary"
            @click="(mode = ''), redirectToCalculo()"
            >cancelar</v-btn
          >
        </v-col>
      </v-row>
    </v-card>

    <adicionar-taxa v-if="add_taxa == true" />
    <!-- TABELA PRNCIPAL -->

    <v-data-table
      v-if="mode === 'table'"
      :headers="headers"
      :items="calc_total"
      item-key="name"
      class="elevation-1"
    ></v-data-table>

    <div v-show="mode === 'table'">
      <b-button variant="primary" @click="printDiv()"
        ><i class="fa fa-file"></i
      ></b-button>
    </div>
  </v-container>
</template>

<script>
// import TabelaDib from "../features/TabelaDib.vue";
import { calculaReajuste } from "../features/calculoReajuste";
import { baseApiUrl } from "../global";
import axios from "axios";
import AdicionarTaxa from "./AdicionarTaxa.vue";

export default {
  name: "Home",
  components: { AdicionarTaxa },
  data: function () {
    return {
      mode: "",
      add_taxa: false,
      beneficio: false,
      pesquisa: {},
      loading: true,
      infos: [],
      dtInicial: "",
      dtFinal: "",
      salarioInicial: null,
      headers: [
        { value: "data", text: "Data" },
        { value: "reajusteAcumulado", text: "Reajuste" },
        { value: "salario", text: "Salário" },
        { value: "correcao", text: "Correção Salarial" },
        { value: "salarioCorrigido", text: "Salário Corrigido" },
        { value: "juros", text: "Juros" },
        { value: "salarioJuros", text: "Salário Juros" },
        { value: "salarioTotal", text: "Total" },
      ],
      logo: require("../assets/logo.png"),
      todas_taxas: [],
      all_info: [],
      calc_total: [],
    };
  },
  methods: {
    printDiv() {
      var divToPrint = document.getElementById("areaToPrint");

      var style = "<style>";
      style =
        style +
        ` 
        
        * {box-sizing: border-box; margin: 0; padding: 0}
        div {margin-bottom: 3px;} label {font-weight: bold;}
        .titulo, h1, h2 {text-align: center;}
        
        

        body {height: auto; width: 100vw;padding: 15px; font-size: 1.3rem;}
        .content{ padding: 15px;}
        .center {
          margin: auto;
          width: 60%;
          padding: 10px;
          text-align: center

          background-image: url(../assets/logo.png);
          background-position: top left;
          background-repeat: no-repeat;
          /* background-size: cover; */
          position: relative;
        }

        .agu {text-align: center; font-size: 1.3rem; font-weight: bold;}
        h1, h2, h3 {font-size: 1.2rem; font-weight: bold;}
        
        `;
      style = style + "</style>";

      var newWin = window.open("");

      newWin.document.write("<html><head>");
      newWin.document.write(
        `<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css" integrity="sha384-JcKb8q3iqJ61gNV9KGb8thSsNjpSL0n8PARn9HuZOnIxN0hoP+VmmDGMN5t9UJ0Z" crossorigin="anonymous">`
      ); // <title> CABEÇALHO DO PDF.
      newWin.document.write(style); // INCLUI UM ESTILO NA TAB HEAD
      newWin.document.write("</head>");
      newWin.document.write("<body>");
      // newWin.document.write(`<img class="logo" src="${this.logo}">`);
      newWin.document.write(`
      <div class="center">
        <h1 class="agu">AGU</h1> 
        <h2>PROCURADORIA GERAL FEDERAL</h2>
        <h3>EQUIPE REGIONAL DE CÁLCULOS E PAGAMENTOS PREVIDENCIÁRIOS 1ª REGIÃO</h3>
      </div>`);

      newWin.document.write(divToPrint.outerHTML);
      newWin.document.write("</body></html>");

      newWin.print();
      newWin.close();
    },
    informacoesCalculo() {
      var arr_todasTaxas = [];
      var taxas = [];

      const dtInicial = this.dtInicial.split("-").reverse().join("/");
      const dtFinal = this.dtFinal.split("-").reverse().join("/");
      var salarioInicial = +this.salarioInicial;

      const mesInicial = parseInt(dtInicial.split("/")[1]) - 1;
      const mesFinal = parseInt(dtFinal.split("/")[1]) - 1;

      let anoInicial = parseInt(dtInicial.split("/")[2]),
        anoFinal = parseInt(dtFinal.split("/")[2]);

      const url = `${baseApiUrl}/taxas/todasTaxas/1/1`;
      axios(url)
        .then((res) => {
          this.todas_taxas = res.data.map((obj) => {
            if (obj) {
              const data = obj.data.split("T");
              const dataReajuste = data.splice(0, 1);

              obj.data = dataReajuste.toString().split("-").reverse().join("/");

              arr_todasTaxas.push(obj);
            }
          });
          // console.log(arr_todasTaxas);
          taxas = this.taxasPorAno(arr_todasTaxas);
          // console.log(taxas);

          this.infos = [];

          const compute = (anoInicial, salarioInicial, mesInicial, taxa) => {
            const [reajustado, taxaReajuste] = calculaReajuste(
              taxas[anoInicial.toString()],
              salarioInicial,
              mesInicial,
              anoInicial,
              taxa,
              anoFinal,
              mesFinal,
              this.infos
            );

            if (+anoInicial < +anoFinal)
              return compute(+anoInicial + 1, reajustado, 0, taxaReajuste);
          };
          compute(anoInicial, salarioInicial, mesInicial, 0);

          // console.log("REAJUSTE ", this.infos);
          // console.log("CORREÇÃO", arr_todasTaxas);

          this.all_info = this.infos.map((obj) => {
            const temp = {};

            arr_todasTaxas
              .filter((item) => item.data === obj.data)
              .forEach(
                (i) => (
                  (temp.correcao = i.correcaoAcumulado),
                  (temp.juros = i.jurosAcumulado)
                )
              );

            return { ...obj, ...temp };
          });

          this.calc_total = this.all_info.map((obj) => {
            const temp = {
              salarioCorrigido:
                Math.floor(obj.salario * obj.correcao * 100) / 100,
              salarioJuros:
                Math.floor(obj.salario * obj.correcao * obj.juros * 100) / 100,
              salarioTotal:
                Math.floor(
                  (obj.salario * obj.correcao * obj.juros +
                    obj.salario * obj.correcao) *
                    100
                ) / 100,
            };

            return { ...obj, ...temp };
          });
          // console.log("FINAAALLL", this.calc_total);
        })
        .catch((error) => {
          alert(error.response.data.msg);
        });
    },
    taxasPorAno(response = []) {
      const taxas = {};

      response.forEach((dado) => {
        const anoVigente = dado.data.split("/")[2];

        if (taxas[anoVigente.toString()]) {
          taxas[anoVigente.toString()].push(dado.reajuste);
        } else {
          taxas[anoVigente.toString()] = [];
          taxas[anoVigente.toString()].push(dado.reajuste);
        }
      });

      return taxas;
    },
    redirectToCalculo() {
      this.$router.push("/processos").catch(() => {});
    },
    test() {
      var arr_reajuste = [];
      var taxas = [];

      const dtInicial = this.dtInicial.split("-").reverse().join("/");
      const dtFinal = this.dtFinal.split("-").reverse().join("/");
      var salarioInicial = +this.salarioInicial;

      const mesInicial = parseInt(dtInicial.split("/")[1]) - 1;
      const mesFinal = parseInt(dtFinal.split("/")[1]) - 1;

      let anoInicial = parseInt(dtInicial.split("/")[2]),
        anoFinal = parseInt(dtFinal.split("/")[2]);

      const url = `${baseApiUrl}/taxas/todasTaxas/1/1`;
      axios(url)
        .then((res) => {
          this.reajuste = res.data.map((obj) => {
            if (obj) {
              // const dataInicial = new Date(this.dtInicial);
              // const dataFinal = new Date(this.dtFinal);
              const data = obj.data.split("T");
              const dataReajuste = data.splice(0, 1);
              // const dataObjeto = new Date(dataReajuste);

              obj.data = dataReajuste.toString().split("-").reverse().join("/");

              // const maiorQueDataInicial =
              //   dataObjeto.valueOf() >= dataInicial.valueOf();
              // const menorQueDataFinal =
              //   dataObjeto.valueOf() <= dataFinal.valueOf();

              // if (maiorQueDataInicial && menorQueDataFinal) {
              // }
              arr_reajuste.push(obj);
            }
          });
          console.log(arr_reajuste);
          taxas = this.taxasPorAno(arr_reajuste);
          console.log(taxas);

          this.infos = [];

          const compute = (anoInicial, salarioInicial, mesInicial, taxa) => {
            const [reajustado, taxaReajuste] = calculaReajuste(
              taxas[anoInicial.toString()],
              salarioInicial,
              mesInicial,
              anoInicial,
              taxa,
              anoFinal,
              mesFinal,
              this.infos
            );

            if (+anoInicial < +anoFinal)
              return compute(+anoInicial + 1, reajustado, 0, taxaReajuste);
          };
          compute(anoInicial, salarioInicial, mesInicial, 0);

          console.log("REAJUSTE ", this.infos);
          // console.log("CORREÇÃO", arr_reajuste);

          this.all_info = this.infos.map((obj) => {
            const temp = {};

            arr_reajuste
              .filter((item) => item.data === obj.data)
              .forEach(
                (i) => (
                  (temp.correcao = i.correcaoAcumulado),
                  (temp.juros = i.jurosAcumulado)
                )
              );

            return { ...obj, ...temp };
          });
          console.log("FINAAALLL", this.all_info);
        })
        .catch((error) => {
          alert(error.response.data.msg);
        });
    },
  },
  mounted() {
    // this.maitoGai();
  },
};
</script>
<style>
.home {
  height: auto;
  min-height: 100vh;
  padding: 20px;
  background-color: rgb(194, 216, 235);

  background-image: url(../assets/logo.png);
  /* background-color: #cccccc; */
  /* height: 100%; */
  width: 100%;

  background-position: right;
  background-repeat: no-repeat;
  /* background-size: cover; */
  position: absolute;
}

.logo {
  display: flex;
  justify-content: flex-end;
}

.title h1 {
  font-family: "Lato", sans-serif;
  font-weight: lighter;
  font-size: 40px;
  letter-spacing: -2px;
}

.labels {
  font-weight: 500;
}

/* .row-buttons {
  justify-content: flex-end;
} */

.page {
  padding-top: 3px;
}
</style>