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
    <v-card>
      <bloco-informacoes
        v-if="!add_taxa"
        @calculo="(info_calculo = $event), atualizarTodosDados()"
      ></bloco-informacoes>
    </v-card>
    <v-card class="pa-3 my-3" v-if="add_taxa == false">
      <v-row>
        <v-col cols="12" sm="6" md="3">
          <label for="data-inicial" class="labels pb-3">Data Inicial</label>
          <v-text-field
            v-model="dtInicial"
            id="data-inicial"
            dense
            outlined
          ></v-text-field>
        </v-col>
        <v-col cols="12" sm="6" md="3">
          <label for="data_final" class="labels pb-3">Data Final</label>
          <v-text-field
            v-model="dtFinal"
            id="data-final"
            dense
            outlined
          ></v-text-field>
        </v-col>
        <v-col cols="12" sm="6" md="3">
          <label for="valor-devido" class="labels pb-3">Valor Devido</label>
          <v-text-field
            v-model="salarioInicial"
            id="valor-devido"
            dense
            placeholder="nada"
            outlined
          ></v-text-field>
          <label for="valor-devido" class="labels pb-3">
            {{ info_calculo.nome }}</label
          >
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
        <v-col cols="1">
          <v-btn depressed color="secondary" @click="pararJuros()"
            >Atualizar</v-btn
          >
        </v-col>
      </v-row>
    </v-card>

    <adicionar-taxa v-if="add_taxa == true" />
    <!-- TABELA PRNCIPAL -->
      <h1 class="titulo">PREENCHA OS DADOS</h1>
        <h4 class="center">REVISÃO DE BENEFÍCIOS</h4>
        <div class="rowInputs">
          <div class="column">
            <label class="camposInput"> Processo: <input v-model="info_calculo.numeroDoProcesso" placeholder="XXXX-XX.XXXX.XXX.XXXX"></label>
            <label
              class="inputToPrint"
              id="processoForm"
            />
            <br />
            <label class="camposInput"> Autor: <input v-model="info_calculo.nome" placeholder="Jennifer Walters"></label>
            <label
              class="inputToPrint"
              id="autorForm"
            />
            <br />
            <label class="camposInput">Objeto: <input v-model="objetoDoCalculo" placeholder="Ex.: CÁLCULO DE BENEFÍCIO PREVIDENCIÁRIO"></label
            ><label
              class="inputToPrint"
              id="objetoForm"
            />
            <br />
            <label class="camposInput">Vara: <input v-model="varaPrevidenciaria" placeholder="Ex.: Previdenciária"></label
            ><label
              class="inputToPrint"
              id="varaForm"
            />
            <br />
            <label class="camposInput">Juros: <input placeholder="Ex.: 12% a.a. até 06/09 + ..."></label
            ><label
              class="inputToPrint"
              id="jurosForm"
            />
            <br />
          </div>
          <div class="column">
            <label class="camposInput">Ajuizamento: <input v-model="info_calculo.dataAjuizamento" placeholder="XX/XX/XXXX"></label
            ><label
              class="inputToPrint"
              id="ajuizamentoForm"
            />
            <br />
            <label class="camposInput">Início do Juros: <input v-model="info_calculo.dataAjuizamento" placeholder="XX/XXXX"></label
            ><label
              class="inputToPrint"
              id="inicioJurosForm"
            />
            <br />
            <!-- Criar Função -->
            <label class="camposInput">Calculado em: <input placeholder="XX/XXXX"></label
            ><label
              class="inputToPrint"
              id="calculadoEmForm"
            />
            <br />
            <label class="camposInput">Honorário: <input placeholder="Ex.:"></label
            ><label
              class="inputToPrint"
              id="honorarioForm"
            />
            <br />
          </div>
        </div>
      <h4 class="center">RESUMO DO PROCESSO</h4>
      <div>
        <div class="resumoProcesso">
            <div class="columnResumoProcesso">
                <h6>N.B.</h6>
                <input v-model="info_calculo.nb" placeholder="XXX.XXX.XXX-X">
                <label class="inputToPrintResumo"
                  id="resumoNB"
                />
            </div>
            <div class="columnResumoProcessoParte">
                <h6>Parte</h6>
                <input v-model="info_calculo.nome" placeholder="Ex.: Matthew M. Murdock">
                <label class="inputToPrintResumoParte"
                  id="resumoParte"
                />
            </div>
            <div class="columnResumoProcesso">
                <h6>Principal</h6>
                <input v-model="valor_corrigido" placeholder="XX.XXX,XX">
                <label class="inputToPrintResumo"
                  id="resumoPrincipal"
                />
            </div>
            <div class="columnResumoProcesso">
                <h6>Juros</h6>
                <input v-model="valor_juros" placeholder="X.XXX,XX">
                <label class="inputToPrintResumo"
                  id="resumoJuros"
                />
            </div>
            <div class="columnResumoProcesso">
                <h6>Total</h6>
                <input v-model="valor_total" placeholder="XX.XXX,XX">
                <label class="inputToPrintResumo"
                  id="resumoTotal"
                />
            </div>
        </div>
      </div>
      <br />
      <div class="rowCalculo">
        <div class="columnRight">
          <label class="camposInput">Soma do Principal: </label>
            <br />
          <label class="camposInput">Soma do Juros: </label>
            <br />
          <label class="camposInput">Devido ao(s) Reclamante(s): </label>
            <br />
            <br />
          <label class="camposInput">12 Parcelas Vincendas: </label>
            <br />
          <label class="camposInput">Honorários Advocatícios: </label>
            <br />
            <br />
          <label class="camposInput">Total do Processo: </label>
            <br />            
            <br />
            <br />
        </div>
        <div class="column">  
          <input v-model="valor_corrigido" placeholder="XX.XXX,XX">
          <label
            class="inputCalculo"
            id="somaPrincipal"
          />
            <br />
          <input v-model="valor_juros" placeholder="XX.XXX,XX">
          <label
            class="inputCalculo"
            id="somaJuros"
          />    
            <br />         
          <input v-model="valor_total" placeholder="XX.XXX,XX">   
          <label
            class="inputCalculo"
            id="somaTotal"
          />
            <br /> 
            <br />        
          <input placeholder="XX.XXX,XX">  
          <label
            class="inputCalculo"
            id="parcelasVincendas"
          />
            <br />
          <input placeholder="XX.XXX,XX">
          <label
            class="inputCalculo"
            id="honorariosAdvocativos"
          />
            <br />
            <br />
          <input v-model="valor_total" placeholder="XX.XXX,XX">
          <label
            class="inputCalculo"
            id="totalProcesso"
          />
            <br />
        </div>
      </div>
      <!-- Gerar pdf -->

    <h1 class="titulo">GERADOR DE PDF</h1>

    <v-card
    v-if="!add_taxa"
     id="areaToPrint">


    <div>
        <h2 class="centerAGU">AGU</h2>
        <h3 class="center">PROCURADORIA GERAL FEDERAL</h3>
        <h3 class="center">
          EQUIPE REGIONAL DE CÁLCULOS E PAGAMENTOS PREVIDENCIÁRIOS 1ª REGIÃO
        </h3>
        <h4 class="center">REVISÃO DE BENEFÍCIOS</h4>
        <div class="rowInputs">
          <div class="column">
            <label class="camposInput"> Processo: </label>
            <label
              class="inputToPrint"
              id="processoForm"
            /> 
            {{info_calculo.numeroDoProcesso}}
            <br />
            <label class="camposInput"> Autor: </label>
            <label
              class="inputToPrint"
              id="autorForm"
            />
            {{info_calculo.nome}}
            <br />
            <label class="camposInput">Objeto:</label
            ><label
              class="inputToPrint"
              id="objetoForm"
            />
            {{objetoDoCalculo}}
            <br />
            <label class="camposInput">Vara:</label
            ><label
              class="inputToPrint"
              id="varaForm"
            />
            {{varaPrevidenciaria}}
            <br />
            <label class="camposInput">Juros:</label
            ><label
              class="inputToPrint"
              id="jurosForm"
            />
            <br />
          </div>
          <div class="column">
            <label class="camposInput">Ajuizamento:</label
            ><label
              class="inputToPrint"
              id="ajuizamentoForm"
            />
            {{info_calculo.dataAjuizamento}}
            <br />
            <label class="camposInput">Início do Juros:</label
            ><label
              class="inputToPrint"
              id="inicioJurosForm"
            />
            {{info_calculo.dataAjuizamento}}
            <br />
            <label class="camposInput">Calculado em:</label
            ><label
              class="inputToPrint"
              id="calculadoEmForm"
            />
            <!--Função-->
            <br />
            <label class="camposInput">Honorário:</label
            ><label
              class="inputToPrint"
              id="honorarioForm"
            />
            <br />
          </div>
        </div>
      </div>
      <h4 class="center">RESUMO DO PROCESSO</h4>
      <div>
        <div class="resumoProcesso">
            <div class="columnResumoProcesso">
                <h6>N.B.</h6>
                <label class="inputToPrintResumo"
                  id="resumoNB"
                />
                {{info_calculo.nb}}
            </div>
            <div class="columnResumoProcessoParte">
                <h6>Parte</h6>
                <label class="inputToPrintResumoParte"
                  id="resumoParte"
                />
                {{info_calculo.nome}}
            </div>
            <div class="columnResumoProcesso">
                <h6>Principal</h6>
                <label class="inputToPrintResumo"
                  id="resumoPrincipal"
                />
                {{valor_corrigido}}
            </div>
            <div class="columnResumoProcesso">
                <h6>Juros</h6>
                <label class="inputToPrintResumo"
                  id="resumoJuros"
                />
                {{valor_juros}}
            </div>
            <div class="columnResumoProcesso">
                <h6>Total</h6>
                <label class="inputToPrintResumo"
                  id="resumoTotal"
                />
                {{valor_total}}
            </div>
        </div>
      </div>
      <br />
      <div class="rowCalculo">
        <div class="columnRight">
          <label class="camposInput">Soma do Principal: </label>
            <br />
          <label class="camposInput">Soma do Juros: </label>
            <br />
          <label class="camposInput">Devido ao(s) Reclamante(s): </label>
            <br />
            <br />
          <label class="camposInput">12 Parcelas Vincendas: </label>
            <br />
          <label class="camposInput">Honorários Advocatícios: </label>
            <br />
            <br />
          <label class="camposInput">Total do Processo: </label>
            <br />            
        </div>
        <div class="column">  
          <label
            class="inputCalculo"
            id="somaPrincipal"
          />
          {{valor_corrigido}}
            <br />
          <label
            class="inputCalculo"
            id="somaJuros"
          />
          {{valor_juros}}    
            <br />            
          <label
            class="inputCalculo"
            id="somaTotal"
          />
          {{valor_total}}
            <br /> 
            <br />          
          <label
            class="inputCalculo"
            id="parcelasVincendas"
          />
            <br />
          <label
            class="inputCalculo"
            id="honorariosAdvocativos"
          />
            <br />
            <br />
          <label
            class="inputCalculo"
            id="totalProcesso"
          />
          {{valor_total}}
        </div>
      </div>


      <img src="" alt="" />
      <v-data-table
        id="areaToPrint"
        v-if="mode === 'table'"
        :headers="headers"
        :items="calc_total"
        item-key="name"
        class="elevation-1"
      >
      </v-data-table>
    </v-card>

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
//import { pararJurosTeste } from "../features/pararJuros";
import { baseApiUrl } from "../global";
import axios from "axios";
import AdicionarTaxa from "./AdicionarTaxa.vue";
import BlocoDeInformacoes from "../components/BlocoDeInformacoes.vue";
export default {
  name: "Home",
  components: {
    AdicionarTaxa,
    "bloco-informacoes": BlocoDeInformacoes,
  },
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
      salarioInicial: "",
      objetoDoCalculo: "CÁLCULO DE BENEFÍCIO PREVIDENCIÁRIO",
      varaPrevidenciaria: "Previdenciária",
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
      info_calculo: {},
      valor_total: 0,
      valor_juros: 0,
      valor_corrigido: 0,
    };
  },
  methods: {
    iniciarCalculo() {
      const dtInicial = this.dtInicial.split("-").reverse().join("/");
      const dtFinal = this.dtFinal.split("-").reverse().join("/");
      let dinicial = parseInt(dtInicial.split("/")[0]);
      let dfinal = parseInt(dtFinal.split("/")[0]);
      let inical_calculo = (dinicial - 30) * -1;
      this.calc_total[0].salario =
        Math.floor((this.calc_total[0].salario / 30) * inical_calculo * 100) /
        100;
      this.calc_total[0].salarioCorrigido =
        Math.floor(
          (this.calc_total[0].salarioCorrigido / 30) * inical_calculo * 100
        ) / 100;
      this.calc_total[0].salarioTotal =
        Math.floor(
          (this.calc_total[0].salarioTotal / 30) * inical_calculo * 100
        ) / 100;
      this.calc_total[0].data = dtInicial;

      let x = this.calc_total.length - 1;
      this.calc_total[x].salario =
        Math.floor((this.calc_total[x].salario / 30) * dfinal * 100) / 100;
      this.calc_total[x].salarioCorrigido =
        Math.floor((this.calc_total[x].salarioCorrigido / 30) * dfinal * 100) /
        100;
      this.calc_total[x].salarioTotal =
        Math.floor((this.calc_total[x].salarioTotal / 30) * dfinal * 100) / 100;
      this.calc_total[x].data = dtFinal;
      console.log(this.calc_total[0]);
      console.log(this.calc_total[x]);
      this.pararJuros();
    },
    pararJuros() {
      const dataAjuizamentoRequerida = this.info_calculo.dataAjuizamento
        .split("-")
        .reverse()
        .join("/");
      try {
        var i = 0;
        for (const value of this.calc_total) {
          console.log(value);
          var dataFornecida = this.calc_total[i].data
            .split("-")
            .reverse()
            .join("/");
          var dataDeJuizamento =
            dataFornecida.split("/")[0] +
            "/" +
            dataAjuizamentoRequerida.split("/")[1] +
            "/" +
            dataAjuizamentoRequerida.split("/")[2];
          var dateTabela =
            dataFornecida.split("/")[0] +
            "/" +
            dataFornecida.split("/")[1] +
            "/" +
            dataFornecida.split("/")[2];
          console.log(dataDeJuizamento);
          console.log(dateTabela);
          if (dateTabela == dataDeJuizamento) {
            const juros = this.calc_total[i].juros;
            for (let x = 0; x <= i; x++) {
              this.calc_total[x].salarioTotal =
                Math.floor(
                  (this.calc_total[x].salarioTotal -
                    this.calc_total[x].salarioJuros +
                    this.calc_total[x].salarioCorrigido * juros) *
                    100
                ) / 100;
              this.calc_total[x].juros = juros;
              this.calc_total[x].salarioJuros =
                Math.floor(this.calc_total[x].salarioCorrigido * juros * 100) /
                100;
            }
          }
          i++;
          this.totaisSalario();
        }
      } catch (error) {
        console.log(error);
      }
    },
    totaisSalario(){
      this.valor_total = 0;
      this.valor_juros = 0;
      this.valor_corrigido = 0;
      for (const value of this.calc_total){
        this.valor_total += value.salarioTotal;
          this.valor_juros += value.salarioJuros;
          this.valor_corrigido += value.salarioCorrigido;
          //corta as cassais decimais
      }
      this.valor_total = Math.floor(this.valor_total * 100) /100;
        this.valor_juros = Math.floor(this.valor_juros * 100) /100;
        this.valor_corrigido = Math.floor(this.valor_corrigido * 100) /100;
    },
    atualizarTodosDados() {
      this.salarioInicial = this.info_calculo.rmi.replace(".", "");
      this.salarioInicial = this.salarioInicial.replace(",", ".");
      this.salarioInicial = parseFloat(this.salarioInicial);
      this.dtInicial = this.info_calculo.dibInicial;
      this.dtFinal = this.info_calculo.dip;
      this.calc_total = [];
      this.valor_total = 0;
      this.valor_juros = 0;
      this.valor_corrigido = 0;
      this.info_calculo.numeroDoProcesso
      
    },
    atualizarCalculadora(){
    },
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
          this.iniciarCalculo();
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

.titulo {
  text-align: center;
}

.camposInput {
  text-align: left;
  margin-left: 3%;
}

.center {
  text-align: center;
}

.centerAGU {
  text-align: center;
  padding-top: 10px;
}

.column {
  float: left;
  width: 50%;
}

.columnRight {
  float: left;
  text-align: right;
  width: 50%;
}


.rowInputs:after {
  content: "";
  display: table;
  clear: both;
}

.resumoProcesso:after {
  content: "";
  display: table;
  clear: both;
}

.columnResumoProcesso {
  float: left;
  width: 14%;
  margin-left: 1%;
}

.columnResumoProcessoParte {
  float: left;
  width: 39%;
  margin-left: 1%;
}

.centerMargin {
  text-align: center;
  padding-left: 15px;
  padding-right: 15px;
}

.inputToPrint {
  margin-left: 10px;
}

.inputToPrintResumo {
  margin-left: 0px;
}

.inputToPrintResumoParte {
  float: left;
  width: 500px;
}

.inputCalculo {
  text-align: left;
  margin-left: 1%;
}

.rowCalculo:after {
  content: "";
  display: table;
  clear: both;
}

.page {
  padding-top: 3px;
}
</style>