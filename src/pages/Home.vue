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
        :exibir="{
          tudo: BlocoDeInformacoes_tudo,
          processos: BlocoDeInformacoes_processos,
        }"
        @dados="BlocoDeInformacoes_tudo = $event"
        @processos="BlocoDeInformacoes_processos = $event"
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
            required
          ></v-text-field>
        </v-col>
        <v-col cols="12" sm="6" md="3">
          <label for="data_final" class="labels pb-3">Data Final</label>
          <v-text-field
            v-model="dtFinal"
            id="data-final"
            dense
            outlined
            required
          ></v-text-field>
        </v-col>
        <v-col cols="12" sm="6" md="3">
          <label for="valor-devido R$" class="labels pb-3">Valor Devido</label>
          <v-text-field
            v-model="salarioInicial"
            id="valor-devido"
            dense
            placeholder="nada"
            @input="salarioInicial = formataçao(salarioInicial)"
            outlined
            required
          ></v-text-field>
        </v-col>
        <v-col cols="12" sm="6" md="3">
          <label for="inicio_Juros" class="labels pb-3">Inicio do juros</label>
          <v-text-field
            v-model="inicio_juros"
            id="data-final"
            dense
            outlined
            required
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" sm="6" md="3">
          <label for="honorarios_Advocativos" class="labels pb-3"
            >Honorarios Advocativos Data</label
          >
          <v-text-field
            v-model="DataHonorarios"
            id="data-final"
            dense
            outlined
          ></v-text-field>
        </v-col>
        <v-col cols="12" sm="6" md="3">
          <label for="honorarios_Advocativos" class="labels pb-3"
            >Honorarios Advocativos porcentagem %</label
          >
          <v-text-field
            v-model="porcentagemHonorarios"
            id="data-final"
            dense
            outlined
          ></v-text-field>
        </v-col>
        <v-col cols="12" sm="6" md="3">
          <label for="honorarios_Advocativos" class="labels pb-3"
            >Acordo %</label
          >
          <v-text-field
            v-model="procntagem_acordo"
            id="data-final"
            dense
            outlined
          ></v-text-field>
        </v-col>
        <v-col cols="12" sm="6" md="3">
          <v-row>
            <v-col cols="12" sm="6" md="1">
              <input
                class="form-check-input"
                type="checkbox"
                style="margin-right: 5px"
                v-model="salario13"
                :value="salario13"
              />
            </v-col>
            <v-col cols="12" sm="6" md="2">
              <label for="salario13" class="labels pb-2">13Salario</label>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" sm="6" md="1">
              <input
                class="form-check-input"
                type="checkbox"
                style="margin-right: 5px"
                v-model="boolJuros"
                :value="boolJuros"
              />
            </v-col>
            <v-col cols="12" sm="6" md="2">
              <label for="boolJuros" class="labels pb-2">Juros</label>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" sm="6" md="1">
              <input
                type="checkbox"
                class="form-check-input"
                style="margin-right: 5px"
                :value="alcadaBoolean"
                v-model="alcadaBoolean"
                id="flexCheckDefault"
              />
            </v-col>
            <v-col cols="12" sm="6" md="2">
              <label for="alcadaBoolean" class="labels pb-2">Alcada</label>
            </v-col>
          </v-row>
        </v-col>
        <v-col cols="12" sm="6" md="2">
          <label class="labels pb-3">Juros</label>
          <v-select
            outlined
            placeholder="Escolha uma opção"
            :items="optionsJuros"
            v-model="tipoJuros"
          ></v-select>
        </v-col>
        <v-col cols="12" sm="6" md="2">
          <label class="labels pb-3">Correção</label>
          <v-select
            outlined
            placeholder="Escolha uma opção"
            :items="optionsCorrecao"
            v-model="tipoCorrecao"
          ></v-select>
        </v-col>
        <v-col cols="12" sm="6" md="2">
          <label for="atualizacao" class="labels pb-2">Atualizacao</label>
          <v-text-field
            v-model="atulizacao"
            id="atualizacao"
            placeholder="Ex: 06/2022"
            dense
            outlined
            required
          ></v-text-field>
        </v-col>
        <v-col cols="12" sm="6" md="2">
          <label for="dibAnterior" class="labels pb-2">dib-anterior</label>
          <v-text-field
            v-model="dibAnterior"
            id="dibAnterior"
            placeholder="Ex: 17/06/2022"
            dense
            outlined
          ></v-text-field>
        </v-col>
        <v-col cols="12" sm="6" md="3">
          <v-row>
            <v-col cols="12" sm="6" md="1">
              <input
                class="form-check-input"
                type="checkbox"
                style="margin-right: 5px"
                v-model="salarioMinimo"
                :value="salarioMinimo"
              />
            </v-col>
            <v-col cols="12" sm="6" md="2">
              <label for="salarioMinimo" class="labels pb-2"
                >salario Minimo</label
              >
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" sm="6" md="1">
              <input
                class="form-check-input"
                type="checkbox"
                style="margin-right: 5px"
                v-model="limiteMinimoMaximo"
                :value="limiteMinimoMaximo"
              />
            </v-col>
            <v-col cols="12" sm="6" md="2">
              <label for="limiteMinimoMaximo" class="labels pb-2"
                >Limite minimo e maximo</label
              >
            </v-col>
          </v-row>
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
        <b-col sm="2" v-if="beneficio === true">
          <b-button
            id="button-beneficio"
            color="primary"
            @click="pushBeneficiosAcumulados()"
            >Adicionar Beneficio</b-button
          >
        </b-col>
      </b-row>
      <b-row
        class="row-one my-3 align-items-center"
        v-for="obj_beneficioAcumulado of arrayBenficios"
        :key="obj_beneficioAcumulado.dib"
      >
        <b-col sm="3" v-if="beneficio === true">
          <label for="beneficio" class="labels">Qual Benefício?</label>
          <b-form-input
            id="beneficio"
            v-model="obj_beneficioAcumulado.beneficio"
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
            v-model="obj_beneficioAcumulado.dib"
            type="text"
            size="sm"
          ></b-form-input>
        </b-col>
        <b-col sm="2" v-if="beneficio === true">
          <label for="beneficio_final" class="labels">Fim do Benefício</label>
          <b-form-input
            v-model="obj_beneficioAcumulado.dif"
            id="beneficio_final"
            type="text"
            size="sm"
          ></b-form-input>
        </b-col>
        <b-col sm="3" v-if="beneficio === true">
          <label for="beneficio" class="labels">RMI</label>
          <b-form-input
            v-model="obj_beneficioAcumulado.rmi"
            id="beneficio"
            type="text"
            size="sm"
            placeholder="Ex:1000"
          ></b-form-input>
        </b-col>
      </b-row>

      <!-- BOTÕES -->

      <v-row>
        <v-col>
          <label for="valor-devido" class="labels pensaoPOrMorte">
            {{ pensaoPorMorte }}
          </label></v-col
        >
      </v-row>
      <v-row class="my-3">
        <v-col cols="1" class="mr-6">
          <v-btn
            depressed
            color="primary"
            @click="
              zeraDadosDocalculo(), (mode = 'table'), informacoesCalculo()
            "
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
          <v-btn
            depressed
            color="primary"
            style="margin-left: 20px"
            :href="info_calculo.urlProcesso"
            target="_blank"
            >Consultar Processo</v-btn
          >
        </v-col>
        <v-col cols="1" class="mr-6">
          <v-btn
            depressed
            color="primary"
            style="margin-left: 20px"
            @click="zeraDadosDocalculo(), (mode = 'table'), calculo()"
            >Calcular</v-btn
          >
        </v-col>
      </v-row>
    </v-card>

    <adicionar-taxa v-if="add_taxa == true" />
    <!-- TABELA PRNCIPAL -->
    <h1 v-if="add_taxa == false" class="titulo">PREENCHA OS DADOS</h1>
    <h4 v-if="add_taxa == false" class="center">REVISÃO DE BENEFÍCIOS</h4>
    <div v-if="add_taxa == false" class="rowInputs">
      <div v-if="add_taxa == false" class="column">
        <label class="camposInput">
          Processo:
          <input
            v-model="info_calculo.numeroDoProcesso"
            placeholder="XXXX-XX.XXXX.XXX.XXXX"
        /></label>
        <label class="inputToPrint" id="processoForm" />
        <br />
        <label class="camposInput">
          Autor:
          <input v-model="info_calculo.nome" placeholder="Jennifer Walters"
        /></label>
        <label class="inputToPrint" id="autorForm" />
        <br />
        <label class="camposInput"
          >Objeto:
          <input
            v-model="objetoDoCalculo"
            placeholder="Ex.: CÁLCULO DE BENEFÍCIO PREVIDENCIÁRIO" /></label
        ><label class="inputToPrint" id="objetoForm" />
        <br />
        <label class="camposInput"
          >Vara:
          <input
            v-model="varaPrevidenciaria"
            placeholder="Ex.: Previdenciária" /></label
        ><label class="inputToPrint" id="varaForm" />
        <br />
        <label class="camposInput"
          >Juros: <input placeholder="Ex.: 12% a.a. até 06/09 + ..." /></label
        ><label class="inputToPrint" id="jurosForm" />
        <br />
      </div>
      <div class="column">
        <label class="camposInput"
          >Ajuizamento:
          <input
            v-model="info_calculo.dataAjuizamento"
            placeholder="XX/XX/XXXX" /></label
        ><label class="inputToPrint" id="ajuizamentoForm" />
        <br />
        <label class="camposInput"
          >Início do Juros:
          <input v-model="inicio_juros" placeholder="XX/XXXX" /></label
        ><label class="inputToPrint" id="inicioJurosForm" />
        <br />
        <!-- Criar Função -->
        <label class="camposInput"
          >Calculado em: <input placeholder="XX/XXXX" /></label
        ><label class="inputToPrint" id="calculadoEmForm" />
        <br />
        <label class="camposInput"
          >Honorário:
          <input placeholder="Ex.:" v-model="textoHonorarios" /></label
        ><label class="inputToPrint" id="honorarioForm" />
        <br />
      </div>
    </div>
    <h4 class="center" v-if="add_taxa == false">RESUMO DO PROCESSO</h4>
    <div v-if="add_taxa == false">
      <div class="resumoProcesso">
        <div class="columnResumoProcesso">
          <h6>N.B.</h6>
          <input v-model="info_calculo.nb" placeholder="XXX.XXX.XXX-X" />
          <label class="inputToPrintResumo" id="resumoNB" />
        </div>
        <div class="columnResumoProcessoParte">
          <h6>Parte</h6>
          <input
            v-model="info_calculo.nome"
            placeholder="Ex.: Matthew M. Murdock"
          />
          <label class="inputToPrintResumoParte" id="resumoParte" />
        </div>
        <div class="columnResumoProcesso">
          <h6>Principal R$</h6>
          <input v-model="valor_corrigido" placeholder="XX.XXX,XX" />
          <label class="inputToPrintResumo" id="resumoPrincipal" />
        </div>
        <div class="columnResumoProcesso">
          <h6>Juros R$</h6>
          <input v-model="valor_juros" placeholder="X.XXX,XX" />
          <label class="inputToPrintResumo" id="resumoJuros" />
        </div>
        <div class="columnResumoProcesso">
          <h6>Total R$</h6>
          <input v-model="valor_total" placeholder="XX.XXX,XX" />
          <label class="inputToPrintResumo" id="resumoTotal" />
        </div>
      </div>
    </div>
    <br />
    <div class="rowCalculo" v-if="add_taxa == false">
      <div class="columnRight">
        <label class="camposInput">Soma do Principal: R$</label>
        <br />
        <label class="camposInput">Soma do Juros: R$</label>
        <br />
        <label class="camposInput">Devido ao(s) Reclamante(s): R$</label>
        <br />
        <br />
        <label class="camposInput">12 Parcelas Vincendas: </label>
        <br />
        <label class="camposInput">Honorários Advocatícios: </label>
        <br />
        <br />
        <label class="camposInput">Total do Processo: R$</label>
        <br />
        <br />
        <br />
      </div>
      <div class="column">
        <input v-model="valor_corrigido" placeholder="XX.XXX,XX" />
        <label class="inputCalculo" id="somaPrincipal" />
        <br />
        <input v-model="valor_juros" placeholder="XX.XXX,XX" />
        <label class="inputCalculo" id="somaJuros" />
        <br />
        <input v-model="valor_total" placeholder="XX.XXX,XX" />
        <label class="inputCalculo" id="somaTotal" />
        <br />
        <br />
        <input placeholder="XX.XXX,XX" v-model="pacelasVencidas" />
        <label class="inputCalculo" id="parcelasVincendas" />
        <br />
        <input v-model="valorHonorarios" placeholder="XX.XXX,XX" />
        <label class="inputCalculo" id="honorariosAdvocativos" />
        <br />
        <br />
        <input v-model="total_processos" placeholder="XX.XXX,XX" />
        <label class="inputCalculo" id="totalProcesso" />
        <br />
      </div>
    </div>
    <v-row
      class="mx-3"
      v-for="beneficio of beneficioInacumulavel"
      :key="beneficio.dib"
    >
      <v-col cols="12" sm="6" md="3">
        <p>Beneficio recebido: {{ beneficio.beneficio }}</p>
      </v-col>
      <v-col cols="12" sm="6" md="3">
        <p>DIB: {{ beneficio.dib }}</p>
      </v-col>
      <v-col cols="12" sm="6" md="3">
        <p>DIF: {{ beneficio.dif }}</p>
      </v-col>
      <v-col cols="12" sm="6" md="3">
        <p>RMI: {{ beneficio.rmi }}</p>
      </v-col>
    </v-row>
    <!-- Gerar pdf -->

    <h1 v-if="add_taxa == false" class="titulo">GERADOR DE PDF</h1>

    <v-card v-if="!add_taxa" id="areaToPrint">
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
            <label class="inputToPrint" id="processoForm" />
            {{ info_calculo.numeroDoProcesso }}
            <br />
            <label class="camposInput"> Autor: </label>
            <label class="inputToPrint" id="autorForm" />
            {{ info_calculo.nome }}
            <br />
            <label class="camposInput">Objeto:</label
            ><label class="inputToPrint" id="objetoForm" />
            {{ objetoDoCalculo }}
            <br />
            <label class="camposInput">Vara:</label
            ><label class="inputToPrint" id="varaForm" />
            {{ varaPrevidenciaria }}
            <br />
            <label class="camposInput">Juros:</label
            ><label class="inputToPrint" id="jurosForm" />
            <br />
          </div>
          <div class="column">
            <label class="camposInput">Ajuizamento:</label
            ><label class="inputToPrint" id="ajuizamentoForm" />
            {{ info_calculo.dataAjuizamento }}
            <br />
            <label class="camposInput">Início do Juros:</label
            ><label class="inputToPrint" id="inicioJurosForm" />
            {{ inicio_juros }}
            <br />
            <label class="camposInput">Calculado em:</label
            ><label class="inputToPrint" id="calculadoEmForm" />
            <!--Função-->
            <br />
            <label class="camposInput">Honorário:</label
            ><label class="inputToPrint" id="honorarioForm" />
            {{ textoHonorarios }}
            <br />
          </div>
        </div>
      </div>
      <h4 class="center">RESUMO DO PROCESSO</h4>
      <div>
        <div class="resumoProcesso">
          <div class="columnResumoProcesso">
            <h6>N.B.</h6>
            <label class="inputToPrintResumo" id="resumoNB" />
            {{ info_calculo.nb }}
          </div>
          <div class="columnResumoProcessoParte">
            <h6>Parte</h6>
            <label class="inputToPrintResumoParte" id="resumoParte" />
            {{ info_calculo.nome }}
          </div>
          <div class="columnResumoProcesso">
            <h6>Principal R$</h6>
            <label class="inputToPrintResumo" id="resumoPrincipal" />
            {{ valor_corrigido }}
          </div>
          <div class="columnResumoProcesso">
            <h6>Juros R$</h6>
            <label class="inputToPrintResumo" id="resumoJuros" />
            {{ valor_juros }}
          </div>
          <div class="columnResumoProcesso">
            <h6>Total R$</h6>
            <label class="inputToPrintResumo" id="resumoTotal" />
            {{ valor_total }}
          </div>
        </div>
      </div>
      <br />
      <div class="rowCalculo">
        <div class="columnRight">
          <label class="camposInput">Soma do Principal: R$</label>
          <br />
          <label class="camposInput">Soma do Juros: R$</label>
          <br />
          <label class="camposInput">Devido ao(s) Reclamante(s): R$</label>
          <br />
          <br />
          <label class="camposInput">12 Parcelas Vincendas: </label>
          <br />
          <label class="camposInput">Honorários Advocatícios: </label>
          <br />
          <br />
          <label class="camposInput">Total do Processo: R$</label>
          <br />
        </div>
        <div class="column">
          <label class="inputCalculo" id="somaPrincipal" />
          {{ valor_corrigido }}
          <br />
          <label class="inputCalculo" id="somaJuros" />
          {{ valor_juros }}
          <br />
          <label class="inputCalculo" id="somaTotal" />
          {{ valor_total }}
          <br />
          <br />
          <label class="inputCalculo" id="parcelasVincendas" />
          {{ pacelasVencidas }}
          <br />
          <label class="inputCalculo" id="honorariosAdvocativos" />
          {{ valorHonorarios }}
          <br />
          <br />
          <label class="inputCalculo" id="totalProcesso" />
          {{ total_processos }}
        </div>
      </div>
      <v-row v-for="beneficio of beneficioInacumulavel" :key="beneficio">
        <v-col cols="12" sm="6" md="3">
          <p>Beneficio recebido: {{ beneficio.beneficio }}</p>
        </v-col>
        <v-col cols="12" sm="6" md="3">
          <p>DIB: {{ beneficio.dib }}</p>
        </v-col>
        <v-col cols="12" sm="6" md="3">
          <p>DIF: {{ beneficio.dif }}</p>
        </v-col>
        <v-col cols="12" sm="6" md="3">
          <p>RMI: {{ beneficio.rmi }}</p>
        </v-col>
      </v-row>
      <img src="" alt="" />
      <v-data-table
        id="areaToPrint"
        dense
        v-if="mode === 'table'"
        :headers="headers"
        :items="calc_total"
        :items-per-page="calc_total.length"
        item-key="name"
        class="elevation-1"
        hide-default-footer
      >
      </v-data-table>
    </v-card>

  <v-label v-if="alcadaArray[0]">Tabela de Alcada</v-label>

      <v-data-table
        id="areaToPrint"
        dense
        v-if="alcadaArray[0]"
        :headers="headersAlcada"
        :items="alcadaArray"
        :items-per-page="alcadaArray.length"
        item-key="data"
        class="elevation-1"
        hide-default-footer
      >
      </v-data-table>
    <div v-if="add_taxa == false" v-show="mode === 'table'">
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
        { value: "salario", text: "Salário R$" },
        { value: "correcao", text: "Correção Salarial" },
        { value: "salarioCorrigido", text: "Salário Corrigido R$" },
        { value: "juros", text: "Juros" },
        { value: "salarioJuros", text: "Salário Juros R$" },
        { value: "salarioTotal", text: "Total" },
      ],
      headersAlcada: [
        { value: "data", text: "Data" },
        { value: "reajusteAcumulado", text: "Reajuste" },
        { value: "salario", text: "Salário R$" },
        { value: "correcao", text: "Correção Salarial" },
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
      pensaoPorMorte: "",
      dataDoJuros: null,
      valorDoJuros: 0,
      array_juros: [],
      inicio_juros: null,
      DataHonorarios: null,
      porcentagemHonorarios: 0,
      valorHonorarios: 0,
      textoHonorarios: null,
      salario13: true,
      valorSalario13: 0,
      juros13Valor: 0,
      corrigido13Valor: 0,
      arr_Salario13: [],
      total_processos: 0,
      procntagem_acordo: null,
      boolJuros: true,

      optionsJuros: [],
      tipoJuros: 0,
      optionsCorrecao: [],
      tipoCorrecao: 0,
      BlocoDeInformacoes_tudo: false,
      BlocoDeInformacoes_processos: true,
      arrayReajusteRencete: [],
      arrayJurosRencete: [],
      arrayCorrecaoRencete: [],
      tipoJurosRecente: null,
      tipoCorrecaoRecente: null,
      // obj_beneficioAcumulado: {
      //   tipo: null,
      //   dataInicio: null,
      //   dataFinal: null,
      //   valor: null,
      // },
      arrayBenficios: [],
      arrayTeste: [],
      beneficiosInacumulveisBanco: [],
      beneficioInacumulavel: [],
      pacelasVencidas: 0,
      salarioMinimoOssada: 0,
      alcadaBoolean: true,
      alcadaArray: [],
      alcadaValue: 0,
      dibAnterior: "",
      limiteMinimoMaximo: true,
      salarioMinimo: false,
      atulizacao: "",
    };
  },

  methods: {
    calculo() {
      const body = {
        dib: this.dtInicial,
        dip: this.dtFinal,
        atulizacao: this.atulizacao,
        incioJuros: this.inicio_juros,
        rmi: this.salarioInicial,
        juros: this.boolJuros,
        tipoJuros: this.tipoJuros,
        tipoCorrecao: this.tipoCorrecao,
        salarioMinimo: this.salarioMinimo,
        limiteMinimoMaximo: this.limiteMinimoMaximo,
        salario13: this.salario13,
        dibAnterior: this.dibAnterior == "" ? null : this.dibAnterior,
      };
      axios
        .post("http://localhost:8888/calculo/calcular", body)
        .then(async (response) => {
          this.calc_total = await response.data;
          await this.iniciarCalculo();
          if (!this.porcentagemHonorarios && !this.DataHonorarios) {
            this.textoHonorarios = null;
          } else {
            this.textoHonorarios =
              this.porcentagemHonorarios +
              "% com parcelas até " +
              this.DataHonorarios;
            this.honorarios(
              this.DataHonorarios.split("/")[1],
              this.DataHonorarios.split("/")[2]
            );
          }
          console.log(this.alcadaBoolean);
          if (this.alcadaBoolean) {
            this.calculoDeOssada();
          }

          await this.totaisSalario();
        })
        .catch((error) => {
          console.log(error);
          console.log("error");
        });
    },
    fatorador() {
      let reajuste_cumulado = this.salarioInicial;
      this.calc_total.forEach((value, index) => {
        if (value.reajusteAcumulado != 0) {
          reajuste_cumulado *= value.reajusteAcumulado;
        }

        let salario = Math.floor(reajuste_cumulado * 100) / 100;
        this.calc_total[index].salario = salario;
        this.calc_total[index].salarioCorrigido =
          this.calc_total[index].correcao * salario;
        let salarioJuros =
          value.juros * this.calc_total[index].correcao * salario;
        this.calc_total[index].salarioJuros = salarioJuros;

        this.calc_total[index].salarioTotal =
          Math.floor(
            (value.juros + 1) * this.calc_total[index].correcao * salario * 100
          ) / 100;
      });
      this.iniciarCalculo();
      if (this.boolJuros) {
        this.pararJuros();
      } else {
        this.ZerarOJuros();
      }
    },
    calculoDeOssada() {
      let ossada = 0;
      let date = this.info_calculo.dataAjuizamento.split("/");
      let correcao = 1;
      let juros = 0;
      let valueMes = 12;
      let mesOssada = parseInt(date[1]) + valueMes;
      let anoOssada;
      if (mesOssada > 12) {
        if (mesOssada > 24) {
          mesOssada -= 24;
          anoOssada = parseInt(date[2]) + 2;
        } else {
          mesOssada -= 12;
          anoOssada = parseInt(date[2]) + 1;
        }
      }
      const body = {
        dib: this.dtInicial,
        dip: `01/${mesOssada}/${anoOssada}`,
        salario13: this.salario13,
        tipoCorrecao: this.tipoCorrecao,
        atulizacao: `${date[1]}/${date[2]}`,
      };
      const ossadaUrl = `${baseApiUrl}/salarioMinimo/procuraPorAno/${
        this.info_calculo.dataAjuizamento.split("/")[2]
      }`;
      axios(ossadaUrl).then(async (res) => {
        const obj = await res.data;
        const ajuizamento = this.info_calculo.dataAjuizamento.split("/");
        await obj.forEach((value) => {
          console.log("valor: " + value.data.split("T")[0].split("-")[1]);
          if (value.data.split("T")[0].split("-")[1] <= ajuizamento[1]) {
            this.salarioMinimoOssada = 60 * value.valor;
            console.log("Salario minimo: " + this.salarioMinimoOssada);
          }
        });
        axios
          .post("http://localhost:8888/calculo/alcada", body)
          .then((response) => {
            console.log(response.data);
            let alcada = response.data;
            console.log(alcada);
            this.calc_total.forEach((value) => {
              if (
                value.data.split("/")[2] == date[2] &&
                value.data.split("/")[1] == date[1]
              ) {
                correcao = value.correcao;
                juros = value.juros;
              }
              alcada.forEach((dado) => {
                if (
                  value.data.split("/")[2] == dado.data.split("/")[2] &&
                  value.data.split("/")[1] == dado.data.split("/")[1]
                ) {
                  this.alcadaArray.push({
                    data: value.data,
                    reajusteAcumulado: value.reajusteAcumulado,
                    salario: value.salario,
                    correcao: dado.correcao,
                    salarioTotal: Math.floor(dado.correcao * value.salario * 100) /100,
                  });
                  this.pacelasVencidas += Math.floor(dado.correcao * value.salario * 100) /100;
                }
              });
            });
            console.log("Parcelas vencidas: " + this.pacelasVencidas);
            ossada = Math.floor(((this.pacelasVencidas * correcao * (juros + 1)) - this.salarioMinimoOssada) * 100) / 100;
            console.log("Parcelas vencidas: " + ossada);
            this.alcadaValue = Math.floor((this.pacelasVencidas * correcao * (juros + 1)) * 100) /100;
            if (ossada < 0) {
              ossada = 0
              this.pacelasVencidas = ossada;
            } else {
              this.pacelasVencidas =
                Math.floor(ossada * correcao * (juros + 1) * 100) / 100;
              this.total_processos =
                this.total_processos - this.pacelasVencidas;
            }
          })
          .catch((erro) => {
            console.log(erro);
            console.log("erro beneficioa Acumulado");
          });
      });

      //})
    },
    ajusteData(data) {
      let array1 = data.split("T");
      let arry2 = array1[0].split("-").reverse().join("/");
      return arry2;
    },
    zeraDadosDocalculo() {
      this.total_processos = 0;
      this.valorHonorarios = 0;
      this.valor_total = 0;
      this.valor_juros = 0;
      this.valor_corrigido = 0;
      this.valorSalario13 = 0;
      this.arr_Salario13 = 0;
      this.juros13Valor = 0;
      this.corrigido13Valor = 0;
      this.pacelasVencidas = 0;
      this.salarioMinimoOssada = 0;
      this.alcadaValue = 0;
      this.alcadaArray = [];
    },
    iniciarCalculo() {
      this.beneficioInacumulavel = [];
      if (this.total_processos > 0) {
        this.zeraDadosDocalculo();
      }
      const dtInicial = this.dtInicial.split("-").reverse().join("/");
      var dtFinal = this.dtFinal.split("-").reverse().join("/");
      let dinicial = parseInt(dtInicial.split("/")[0]);
      var dfinal = parseInt(dtFinal.split("/")[0]);
      let inical_calculo;
      this.inical_calculo = 1;
      if (dinicial >= 30) {
        inical_calculo = 1;
        this.formatçao_do_inicio(inical_calculo, dtInicial);
      } else {
        inical_calculo = 30 - dinicial + 1;
        this.formatçao_do_inicio(inical_calculo, dtInicial);
      }

      let x = this.calc_total.length - 1;

      if (this.calc_total[x].data.split("/")[0] == "13Salario") {
        x--;
      }

      if (dfinal == 31) {
        dfinal = 30;
        this.calc_total[x].salario =
          Math.floor((this.calc_total[x].salario / 30) * dfinal * 100) / 100;
        this.calc_total[x].salarioCorrigido =
          Math.floor(
            (this.calc_total[x].salarioCorrigido / 30) * dfinal * 100
          ) / 100;
        this.calc_total[x].salarioJuros =
          Math.floor((this.calc_total[x].salarioJuros / 30) * dfinal * 100) /
          100;
        this.calc_total[x].salarioTotal =
          Math.floor((this.calc_total[x].salarioTotal / 30) * dfinal * 100) /
          100;
        this.calc_total[x].data = dtFinal;
      } else {
        this.calc_total[x].salario =
          Math.floor((this.calc_total[x].salario / 30) * dfinal * 100) / 100;
        this.calc_total[x].salarioCorrigido =
          Math.floor(
            (this.calc_total[x].salarioCorrigido / 30) * dfinal * 100
          ) / 100;
        this.calc_total[x].salarioJuros =
          Math.floor((this.calc_total[x].salarioJuros / 30) * dfinal * 100) /
          100;
        this.calc_total[x].salarioTotal =
          Math.floor((this.calc_total[x].salarioTotal / 30) * dfinal * 100) /
          100;
        this.calc_total[x].data = dtFinal;
      }
      if (this.beneficio == true) {
        let beneficioProvisorio;
        this.beneficiosInacumulveisBanco.forEach((value) => {
          if (
            parseInt(value.name.split("-")[0]) ==
            parseInt(this.info_calculo.beneficio.split("-")[0])
          ) {
            console.log("Beneficio provisorio: " + value.name);
            beneficioProvisorio = value;
          }
        });
        this.arrayBenficios.forEach((value) => {
          beneficioProvisorio.inacumulavel.forEach((dado) => {
            if (
              parseInt(dado.split("-")[0]) ==
              parseInt(value.beneficio.split("-")[0])
            ) {
              this.beneficioInacumulavel.push(value);
            }
          });
        });
        console.log("size: " + this.beneficioInacumulavel.length);
        this.headers = [
          { value: "data", text: "Data" },
          { value: "reajusteAcumulado", text: "Reajuste" },
          { value: "devido", text: "Devido R$" },
          { value: "reajusteRecebido", text: "Reajute" },
          { value: "recebido", text: "Recebido R$" },
          { value: "salario", text: "Salário R$" },
          { value: "correcao", text: "Correção Salarial" },
          { value: "salarioCorrigido", text: "Salário Corrigido R$" },
          { value: "juros", text: "Juros" },
          { value: "salarioJuros", text: "Salário Juros R$" },
          { value: "salarioTotal", text: "Total R$" },
        ];
        this.beneficioAcumuladoCalculo();
      } else {
        this.headers = [
          { value: "data", text: "Data" },
          { value: "reajusteAcumulado", text: "Reajuste" },
          { value: "salario", text: "Salário R$" },
          { value: "correcao", text: "Correção Salarial" },
          { value: "salarioCorrigido", text: "Salário Corrigido R$" },
          { value: "juros", text: "Juros" },
          { value: "salarioJuros", text: "Salário Juros R$" },
          { value: "salarioTotal", text: "Total" },
        ];
      }
    },
    beneficioAcumuladoCalculo() {
      function decontar(value, dado) {
        return {
          data: dado.data,
          reajusteAcumulado: dado.reajusteAcumulado,
          devido: dado.devido > 0 ? dado.devido : dado.salario,
          reajusteRecebido: dado.reajusteAcumulado,
          recebido:
            dado.recebido > 0
              ? dado.recebido + value.salario
              : Math.floor(value.salario * 100) / 100,
          salario: Math.floor((dado.salario - value.salario) * 100) / 100,
          correcao: dado.correcao,
          salarioCorrigido:
            Math.floor((dado.salario - value.salario) * dado.correcao * 100) /
            100,
          juros: dado.juros,
          salarioJuros:
            Math.floor(
              (dado.salario - value.salario) * dado.juros * dado.correcao * 100
            ) / 100,
          salarioTotal:
            Math.floor(
              (dado.salario - value.salario) *
                (dado.juros + 1) *
                dado.correcao *
                100
            ) / 100,
        };
        // }
      }
      function manter(dado) {
        // console.log("slario juros: " + dado.salarioJuros);
        return {
          data: dado.data,
          reajusteAcumulado: dado.reajusteAcumulado,
          devido: dado.devido > 0 ? dado.devido : dado.salario,
          reajusteRecebido:
            dado.reajusteRecebido > 0 ? dado.reajusteRecebido : 0,
          recebido: dado.recebido > 0 ? dado.recebido : 0,
          salario: dado.salario,
          correcao: dado.correcao,
          salarioCorrigido: dado.salarioCorrigido,
          juros: dado.juros,
          salarioJuros: dado.salarioJuros,
          salarioTotal: dado.salarioTotal,
        };
      }
      this.beneficioInacumulavel.forEach((info) => {
        let dataDib = info.dib.split("/");
        let dataincial = this.dtInicial.split("/");
        let dataFinal = this.dtFinal.split("/");
        if (dataDib[2] >= dataincial[2] || dataDib[2] <= dataFinal[2]) {
          //console.log("Benefico inacumulado");
          const body = {
            dib: info.dib,
            dip: info.dif,
            rmi: info.rmi,
            salario13: this.salario13,
            limiteMinimoMaximo: this.limiteMinimoMaximo,
          };
          axios
            .post("http://localhost:8888/calculo/beneficioAcumulado", body)
            .then((response) => {
              let newArrayCalculo = [];
              let alteracaoConfimada = false;
              // console.log(response.data);
              let beneficioAcumulado = response.data;
              this.calc_total.forEach((dado) => {
                let dataCalculo = dado.data.split("/");
                alteracaoConfimada = false;
                beneficioAcumulado.forEach((value) => {
                  let dataBeneficioAcumulado = value.data.split("/");
                  if (
                    (dataBeneficioAcumulado[0] == dataCalculo[0] ||
                      dataincial[0] == dataCalculo[0] ||
                      dataFinal == dataCalculo[0]) &&
                    dataBeneficioAcumulado[1] == dataCalculo[1] &&
                    dataBeneficioAcumulado[2] == dataCalculo[2]
                  ) {
                    //console.log(decontar(value, dado));
                    newArrayCalculo.push(decontar(value, dado));
                    alteracaoConfimada = true;
                  }
                });
                if (!alteracaoConfimada) {
                  // console.log(manter(dado));
                  newArrayCalculo.push(manter(dado));
                }
              });
              this.calc_total = newArrayCalculo;
              newArrayCalculo = [];
              this.totaisSalario();
            })
            .catch((erro) => {
              console.log(erro);
              console.log("erro beneficioa Acumulado");
            });
        }
        if (!this.beneficioInacumulavel[0].rmi) {
          this.headers = [
            { value: "data", text: "Data" },
            { value: "reajusteAcumulado", text: "Reajuste" },
            { value: "salario", text: "Salário R$" },
            { value: "correcao", text: "Correção Salarial" },
            { value: "salarioCorrigido", text: "Salário Corrigido R$" },
            { value: "juros", text: "Juros" },
            { value: "salarioJuros", text: "Salário Juros R$" },
            { value: "salarioTotal", text: "Total" },
          ];
        }
      });
    },
    formatçao_do_inicio(inical_calculo, dtInicial) {
      this.calc_total[0].salario =
        Math.floor((this.calc_total[0].salario / 30) * inical_calculo * 100) /
        100;
      this.calc_total[0].salarioCorrigido =
        Math.floor(
          (this.calc_total[0].salarioCorrigido / 30) * inical_calculo * 100
        ) / 100;
      this.calc_total[0].salarioJuros =
        Math.floor(
          (this.calc_total[0].salarioJuros / 30) * inical_calculo * 100
        ) / 100;
      this.calc_total[0].salarioTotal =
        Math.floor(
          (this.calc_total[0].salarioTotal / 30) * inical_calculo * 100
        ) / 100;
      this.calc_total[0].data = dtInicial;
    },
    //Math.floor( * 100) / 100
    formatacao() {
      this.valor_total = Math.floor(this.valor_total * 100) / 100;
      this.valor_juros = Math.floor(this.valor_juros * 100) / 100;
      this.valor_corrigido = Math.floor(this.valor_corrigido * 100) / 100;
      this.total_processos = Math.floor(this.total_processos * 100) / 100;
      this.valorHonorarios = Math.floor(this.valorHonorarios * 100) / 100;
      let index = 0;
      for (const value of this.calc_total) {
        this.calc_total[index].salarioCorrigido =
          Math.floor(value.salarioCorrigido * 100) / 100;
        this.calc_total[index].salarioTotal =
          Math.floor(value.salarioTotal * 100) / 100;
        this.calc_total[index].salario = Math.floor(value.salario * 100) / 100;
        this.calc_total[index].salarioJuros =
          Math.floor(value.salarioJuros * 100) / 100;
        this.calc_total[index].juros = Math.floor(value.juros * 10000) / 10000;
        this.calc_total[index].correcao =
          Math.floor(value.correcao * 10000) / 10000;
        index++;
      }
    },
    totaisSalario() {
      this.zeraDadosDocalculo();
      this.formatacao();
      this.total_processos = 0;
      this.valor_total = 0;
      this.valor_juros = 0;

      for (const value of this.calc_total) {
        this.valor_total += Math.floor(value.salarioTotal * 100) / 100;
        //console.log(this.valor_total);
        this.valor_juros += Math.floor(value.salarioJuros * 100) / 100;
        this.valor_corrigido += Math.floor(value.salarioCorrigido * 100) / 100;
        //corta as cassais decimais
      }
      if (this.procntagem_acordo) {
        this.valor_total =
          Math.floor(this.valor_total * this.procntagem_acordo) / 100;
        this.valor_juros =
          Math.floor(this.valor_juros * this.procntagem_acordo) / 100;
        this.valor_corrigido =
          Math.floor((this.valor_total - this.valor_juros) * 100) / 100;
        this.total_processos =
          Math.floor(
            (this.valor_corrigido +
              this.valor_juros +
              (this.valorHonorarios * this.procntagem_acordo) / 100) *
              100
          ) / 100;
      } else {
        this.valor_total = Math.floor(this.valor_total * 100) / 100;
        this.valor_juros = Math.floor(this.valor_juros * 100) / 100;
        this.valor_corrigido =
          Math.floor((this.valor_total - this.valor_juros) * 100) / 100;
        this.total_processos =
          Math.floor(
            (this.valor_corrigido + this.valor_juros + this.valorHonorarios) *
              100
          ) / 100;
      }
      this.formatacao();
    },
    honorarios(mesHonorarios, anoHonorarios) {
      let i = 0;
      for (const value of this.calc_total) {
        var dateTable = value.data;
        var mesDoTable = dateTable.split("/")[1];
        var anoDoTable = dateTable.split("/")[2];
        if (anoDoTable == anoHonorarios) {
          if (mesDoTable <= mesHonorarios) {
            this.valorHonorarios += this.calc_total[i].salarioTotal;
          }
        } else if (anoDoTable < anoHonorarios) {
          this.valorHonorarios += this.calc_total[i].salarioTotal;
        }
        i++;
      }
      this.valorHonorarios =
        (this.valorHonorarios * this.porcentagemHonorarios) / 100;
    },
    atualizarTodosDados() {
      this.alcadaArray = [];
      this.headers = [
        { value: "data", text: "Data" },
        { value: "reajusteAcumulado", text: "Reajuste" },
        { value: "salario", text: "Salário R$" },
        { value: "correcao", text: "Correção Salarial" },
        { value: "salarioCorrigido", text: "Salário Corrigido R$" },
        { value: "juros", text: "Juros" },
        { value: "salarioJuros", text: "Salário Juros R$" },
        { value: "salarioTotal", text: "Total" },
      ];
      this.salarioInicial = this.info_calculo.rmi.replace(".", "");
      this.salarioInicial = this.salarioInicial.replace(",", ".");
      this.salarioInicial = parseFloat(this.salarioInicial);
      this.dtInicial = this.info_calculo.dibInicial;
      let datafinal = this.info_calculo.dip.split("/");
      if (datafinal[0] == 1) {
        if (datafinal[1] == 1) {
          this.dtFinal = "31/12/" + (datafinal[2] - 1);
        } else {
          if (datafinal[1] < 10) {
            this.dtFinal = "30/0" + (datafinal[1] - 1) + "/" + datafinal[2];
          } else {
            this.dtFinal = "30/" + (datafinal[1] - 1) + "/" + datafinal[2];
          }
        }
      } else {
        if (datafinal[0] <= 10) {
          this.dtFinal =
            "0" + (datafinal[0] - 1) + "/" + datafinal[1] + "/" + datafinal[2];
        } else {
          this.dtFinal =
            +(datafinal[0] - 1) + "/" + datafinal[1] + "/" + datafinal[2];
        }
      }
      //this.dtFinal = this.info_calculo.dip;
      this.pacelasVencidas = 0;
      this.pensaoPorMorte = "";
      this.calc_total = [];
      this.valor_total = 0;
      this.valor_juros = 0;
      this.valor_corrigido = 0;
      this.info_calculo.numeroDoProcesso;
      this.dataDoJuros = "";
      this.valorDoJuros = 0;
      this.beneficioInacumulavel = [];
      this.arrayBenficios = [];
      if (
        this.info_calculo.beneficio == "21 - PENSAO POR MORTE PREVIDENCIARIA"
      ) {
        this.pensaoPorMorte = "PENSÃO POR MORTE - RIVISAR TERMO INICIAL";
      }
      if (this.info_calculo.beneficiosAcumulados[0].rmi) {
        this.beneficio = true;
        this.arrayBenficios = this.info_calculo.beneficiosAcumulados;
        this.arrayBenficios.forEach((value, index) => {
          if (value.rmi.includes(",")) {
            this.arrayBenficios[index].rmi = value.rmi.replace(".", "");
            this.arrayBenficios[index].rmi = value.rmi.replace(",", ".");
          }
        });
      } else {
        this.beneficio = false;
        this.arrayBenficios = [];
        this.pushBeneficiosAcumulados();
      }
      let beneficioProvisorio;
      this.beneficiosInacumulveisBanco.forEach((value) => {
        if (
          parseInt(value.name.split("-")[0]) ==
          parseInt(this.info_calculo.beneficio.split("-")[0])
        ) {
          console.log("Beneficio provisorio: " + value.name);
          beneficioProvisorio = value;
          this.salario13 = beneficioProvisorio.salario13;
          if (beneficioProvisorio.dif) {
            this.pensaoPorMorte = "Beneficio com DIF";
          }
        }
      });
      this.arrayBenficios.forEach((value) => {
        beneficioProvisorio.inacumulavel.forEach((dado) => {
          if (
            parseInt(dado.split("-")[0]) ==
            parseInt(value.beneficio.split("-")[0])
          ) {
            this.beneficioInacumulavel.push(value);
          }
        });
      });
      this.arrayBenficios = this.beneficioInacumulavel;
      console.log("size: " + this.beneficioInacumulavel.length);
      this.inicio_juros = null;
      this.inicio_juros = this.info_calculo.citacao;
      this.DataHonorarios = null;
      this.porcentagemHonorarios = 0;
      this.valorHonorarios = 0;
      this.textoHonorarios = null;
      this.valorSalario13 = 0;
      this.arr_Salario13 = 0;
      this.total_processos = 0;
      this.procntagem_acordo = null;
      this.alcadaValue = 0;
    },
    pushBeneficiosAcumulados() {
      let obj_beneficioAcumulado = {
        beneficio: null,
        dib: null,
        dif: null,
        rmi: null,
      };
      this.arrayBenficios.push(obj_beneficioAcumulado);
    },
    atualizarCalculadora() {},
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

        table th{
          border: 20px solid #FFFFFF;
          text-align: center;
        }
        table tr > td {
          border: 20px solid #FFFFFF;
        }

        table tr < td {
          border-up: 5px solid #FFFFFF;
        }
        
        table td{
          text-align: center;
        }

        .agu {text-align: center; font-size: 1.3rem; font-weight: bold;}
        h1, h2, h3 {font-size: 1.2rem; font-weight: bold;}

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
      //let salaraioMinimo;
      const ossadaUrl = `${baseApiUrl}/salarioMinimo/procuraPorAno/${
        this.info_calculo.dataAjuizamento.split("/")[2]
      }`;
      axios(ossadaUrl).then(async (res) => {
        const obj = await res.data;
        const ajuizamento = this.info_calculo.dataAjuizamento.split("/");
        await obj.forEach((value) => {
          console.log("valor: " + value.data.split("T")[0].split("-")[1]);
          if (value.data.split("T")[0].split("-")[1] <= ajuizamento[1]) {
            this.salarioMinimoOssada = value.valor;
            console.log("Salario minimo: " + this.salarioMinimoOssada);
          }
        });
      });
      var arr_todasTaxas = [];
      var taxas = [];

      const dtInicial = this.dtInicial.split("-").reverse().join("/");
      const dtFinal = this.dtFinal.split("-").reverse().join("/");
      var salarioInicial = +this.salarioInicial;

      const mesInicial = parseInt(dtInicial.split("/")[1]) - 1;
      const mesFinal = parseInt(dtFinal.split("/")[1]) - 1;

      let anoInicial = parseInt(dtInicial.split("/")[2]),
        anoFinal = parseInt(dtFinal.split("/")[2]);

      const url = `${baseApiUrl}/taxas/todasTaxas/${this.tipoJuros}/${this.tipoCorrecao}`;
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
            // console.log("taxa de rejuste; " + taxaReajuste);
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
                Math.floor(obj.salario * obj.correcao * (obj.juros + 1) * 100) /
                100,
            };

            return { ...obj, ...temp };
          });
          this.fatorador();
          /*if (this.boolJuros) {
            this.pararJuros();
          } else {
            this.ZerarOJuros();
          }*/
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
          //console.log(arr_reajuste);
          taxas = this.taxasPorAno(arr_reajuste);
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
          //console.log("FINAAALLL", this.all_info);
        })
        .catch((error) => {
          alert(error.response.data.msg);
        });
    },
  },

  mounted() {
    let contJuros = [];
    let jurosUnicos = [];
    let contCorrecao = [];
    let correcaoUnicos = [];
    axios.get(baseApiUrl + "/juros/listar").then((response) => {
      jurosUnicos[0] = response.data[0];
      contJuros[0] = response.data[0].tipo;
      for (let i of response.data) {
        if (contJuros.indexOf(i.tipo) == -1) {
          jurosUnicos.push(i);
          contJuros.push(i.tipo);
        }
      }
      this.optionsJuros = jurosUnicos.map((obj) => ({
        text: `Tipo: ${obj.tipo}. Descrição : ${obj.descricao}`,
        value: obj.tipo,
      }));
    });

    axios.get(baseApiUrl + "/correcao/listar").then((response2) => {
      correcaoUnicos[0] = response2.data[0];
      contCorrecao[0] = response2.data[0].tipo;
      for (let i of response2.data) {
        if (contCorrecao.indexOf(i.tipo) == -1) {
          correcaoUnicos.push(i);
          contCorrecao.push(i.tipo);
        }
      }
      this.optionsCorrecao = correcaoUnicos.map((obj) => ({
        text: `Tipo: ${obj.tipo}. Descrição : ${obj.descricao}`,
        value: obj.tipo,
      }));
    });
    axios.get(baseApiUrl + "/beneficio/listar").then((res) => {
      this.beneficiosInacumulveisBanco = res.data;
    });
  },
};
</script>
<style >
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
.pensaoPOrMorte {
  background: firebrick;
  color: white;
  font-size: 25px;
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