<template>
  <v-container fluid id="app">
    <v-alert prominent id="alerta" type="error" v-if="verificadoInformacao">
      <v-row align="center">
        <v-col class="grow">
          {{ alertTexto }}
        </v-col>
        <v-col class="shrink">
          <v-btn @click="verificadoInformacao = false">Fechar</v-btn>
        </v-col>
      </v-row>
    </v-alert>
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
      >
      </bloco-informacoes>
    </v-card>
    <v-card class="pa-3 my-3" v-if="add_taxa == false">
      <v-row>
        <v-col cols="12" sm="6" md="3">
          <label for="data-inicial" class="labels pb-3"
            >Data Inicial <b class="item-obrigatorio">*</b></label
          >

          <v-text-field
            v-model="dtInicial"
            id="data-inicial"
            dense
            outlined
            required
          ></v-text-field>
        </v-col>
        <v-col cols="12" sm="6" md="3">
          <label for="data_final" class="labels pb-3"
            >Data Final <b class="item-obrigatorio">*</b></label
          >
          <v-text-field
            v-model="dtFinal"
            id="data-final"
            dense
            outlined
            required
          ></v-text-field>
        </v-col>
        <v-col cols="12" sm="6" md="3">
          <label for="valor-devido R$" class="labels pb-3"
            >Valor Devido <b class="item-obrigatorio">*</b></label
          >
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
          <label for="inicio_Juros" class="labels pb-3"
            >Início do juros <b class="item-obrigatorio">*</b></label
          >
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
            >Honorários Advocatício Data</label
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
            >Honorários Advocatício Porcentagem %</label
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
              <label for="salario13" class="labels pb-2">13° Salário</label>
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
              <label for="alcadaBoolean" class="labels pb-2">Alçada</label>
            </v-col>
          </v-row>
        </v-col>
        <v-col cols="12" sm="6" md="2">
          <label class="labels pb-3"
            >Juros <b class="item-obrigatorio">*</b></label
          >
          <v-select
            outlined
            placeholder="Escolha uma opção"
            :items="optionsJuros"
            v-model="tipoJuros"
          ></v-select>
        </v-col>
        <v-col cols="12" sm="6" md="2">
          <label class="labels pb-3"
            >Correção <b class="item-obrigatorio">*</b></label
          >
          <v-select
            outlined
            placeholder="Escolha uma opção"
            :items="optionsCorrecao"
            v-model="tipoCorrecao"
          ></v-select>
        </v-col>
        <v-col cols="12" sm="6" md="2">
          <label for="atualizacao" class="labels pb-2"
            >Atualização <b class="item-obrigatorio">*</b></label
          >
          <v-text-field
            v-model="atulizacao"
            id="atualizacao"
            placeholder="Ex: 06/2022"
            dense
            outlined
            required
          >
          </v-text-field>
        </v-col>
        <v-col cols="12" sm="6" md="2">
          <label for="dibAnterior" class="labels pb-2">DIB-Anterior</label>
          <v-text-field
            v-model="dibAnterior"
            id="dibAnterior"
            placeholder="Ex: 17/06/2022"
            dense
            outlined
          >
          </v-text-field>
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
                >Salário Mínimo</label
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
                >Limite Minimo e Máximo</label
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
            >Adicionar Beneficio
          </b-button>
        </b-col>
      </b-row>

      <b-card
        v-for="obj_beneficioAcumulado of arrayBenficios"
        :key="obj_beneficioAcumulado"
      >
        <b-row class="row-one my-3 align-items-center">
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
            >
            </b-form-input>
          </b-col>
          <b-col sm="3" v-if="beneficio === true">
            <label for="beneficio_final" class="labels">Fim do Benefício</label>
            <b-form-input
              v-model="obj_beneficioAcumulado.dif"
              id="beneficio_final"
              type="text"
              size="sm"
            >
            </b-form-input>
          </b-col>
          <b-col sm="3" v-if="beneficio === true">
            <label for="beneficio" class="labels">RMI</label>
            <b-form-input
              v-model="obj_beneficioAcumulado.rmi"
              id="beneficio"
              type="text"
              size="sm"
              placeholder="Ex:1000"
            >
            </b-form-input>
          </b-col>
        </b-row>
        <b-row>
          <b-col sm="3" v-if="beneficio === true">
            <label for="beneficio" class="labels"
              >Limite de Minimo e Maximo</label
            >
            <input
              v-model="obj_beneficioAcumulado.limiteMinimoMaximo"
              :value="obj_beneficioAcumulado.limiteMinimoMaximo"
              class="form-check-input"
              style="margin-left: 5px"
              type="checkbox"
              id="beneficio"
              size="sm"
            />
          </b-col>
          <b-col sm="3" v-if="beneficio === true">
            <label for="beneficio" class="labels">13 Salario</label>
            <input
              v-model="obj_beneficioAcumulado.salario13"
              :value="obj_beneficioAcumulado.salario13"
              class="form-check-input"
              style="margin-left: 5px"
              type="checkbox"
              id="beneficio"
              size="sm"
            />
          </b-col>
          <b-col sm="3" v-if="beneficio === true">
            <label for="beneficio" class="labels">Salario Minimo</label>
            <input
              v-model="obj_beneficioAcumulado.salarioMinimo"
              :value="obj_beneficioAcumulado.salarioMinimo"
              class="form-check-input"
              style="margin-left: 5px"
              type="checkbox"
              id="beneficio"
              size="sm"
            />
          </b-col>
        </b-row>
      </b-card>

      <!-- BOTÕES -->

      <v-row>
        <v-col>
          <label for="valor-devido" class="labels pensaoPOrMorte">
            {{ pensaoPorMorte }}
          </label>
        </v-col>
      </v-row>
      <v-row class="my-3">
        <v-col cols="1" class="mr-6">
          <v-btn
            depressed
            color="primary"
            @click="zeraDadosDocalculo(), (mode = 'table'), calculo()"
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
            style="margin-left: 25px"
            :href="info_calculo.urlProcesso"
            target="_blank"
          >
            Consultar Processo</v-btn
          >
        </v-col>

        <v-col cols="3">
          <v-btn
            depressed
            color="primary"
            style="margin-left: 145px"
            @click="adicionarLote()"
            target="_blank"
            >Adicionar ao Lote</v-btn
          >
        </v-col>
        <v-col cols="3">
          <v-btn
            depressed
            color="primary"
            style="margin-left: 145px"
            target="_blank"
            >Deletar lote</v-btn
          >
        </v-col>
        <v-col cols="2">
          <v-btn
            depressed
            color="primary"
            @click="mode = 'table'"
            target="_blank"
            >Calcular Lote</v-btn
          >
        </v-col>
      </v-row>
    </v-card>
    <h3 class="mt-5">Beneficios para calculo em lote</h3>
    <template>
      <v-data-table
        :headers="headersCalculoLote"
        :items="calculoLote"
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
            <td>
              <v-icon
                v-if="item.nomeBeneficioBeneficioAcumulado[0]"
                color="red"
              >
                mdi-check-outline
              </v-icon>
            </td>
            <td>
              <v-btn icon @click="atulizarInfosLote(item)">
                <v-icon color="success">mdi-file-eye-outline</v-icon>
              </v-btn>
              <v-btn icon @click="removerItemLote(item)">
                <v-icon color="success">mdi-delete</v-icon>
              </v-btn>
            </td>
          </tr>
        </template>
      </v-data-table>
    </template>

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
            @input="atulizarvalor()"
            placeholder="XXXX-XX.XXXX.XXX.XXXX"
        /></label>
        <label class="inputToPrint" id="processoForm" />
        <br />
        <label class="camposInput">
          Autor:
          <input
            v-model="info_calculo.nome"
            @input="atulizarvalor()"
            placeholder="Jennifer Walters"
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
            @input="atulizarvalor()"
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
          >Valido até:
          <input placeholder="XX/XXXX" v-model="atulizacao" /></label
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
          <input
            v-model="info_calculo.nb"
            @input="atulizarvalor()"
            placeholder="XXX.XXX.XXX-X"
          />
          <label class="inputToPrintResumo" id="resumoNB" />
        </div>
        <div class="columnResumoProcessoParte">
          <h6>Parte</h6>
          <input
            v-model="info_calculo.nome"
            @input="atulizarvalor()"
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
        <label class="camposInput">12 Parcelas Vincendas: R$</label>
        <br />
        <br />
        <label class="camposInput">Devido ao(s) Reclamante(s): R$</label>
        <br />
        <label class="camposInput">Honorários Advocatícios: R$</label>
        <br />
        <label
          class="camposInput"
          v-if="procntagem_acordo != 0 && procntagem_acordo != null"
          >Acordo: %</label
        >
        <br />
        <br />
        <label class="camposInput">Total do Processo: R$</label>
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
        <input placeholder="XX.XXX,XX" v-model="pacelasVencidas" />
        <label class="inputCalculo" id="parcelasVincendas" />
        <br />
        
          {{
            parseFloat(valor_corrigido) +
            parseFloat(valor_juros) -
            parseFloat(pacelasVencidas)
          }}
        <br />
        <input v-model="valorHonorarios" placeholder="XX.XXX,XX" />
        <label class="inputCalculo" id="honorariosAdvocativos" />
        <br />
        <input
          v-if="procntagem_acordo != 0 && procntagem_acordo != null"
          v-model="procntagem_acordo"
          placeholder="XX.XXX,XX"
        />
        <label class="inputCalculo" id="honorariosAdvocativos" />
        <br />
        <br />

          {{
            procntagem_acordo != 0 && procntagem_acordo != null
              ? ((parseFloat(valor_corrigido) +
                  parseFloat(valor_juros) -
                  parseFloat(pacelasVencidas) +
                  parseFloat(valorHonorarios)) *
                  parseFloat(procntagem_acordo)) /
                100
              : parseFloat(valor_corrigido) +
                parseFloat(valor_juros) -
                parseFloat(pacelasVencidas) +
                parseFloat(valorHonorarios)
          }}
        
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

    <!-- TETO DE ALÇADA -->
    <div v-if="alcadaBoolean == true">
      <h3 class="center">TETO DE ALÇADA</h3>
      <h5 class="center">{{ textoPeriodoAlcada }}</h5>
      <div class="columnRightAlcada">
        <label class="camposInputAlcada"
          >a) Total a ser considerado (Até 12 parcelas vincendas após
          ajuizamento): R$</label
        >
        <br />
        <label class="camposInputAlcada"
          >b) 60 salários mínimos no ajuizamente: R$</label
        >
        <br />
        <label class="camposInputAlcada"
          >c) Eventual renúncia do total: R$</label
        >
        <br />
        <br />
      </div>
      <div class="column">
        <input
          @input="parcelasDevida()"
          class="inputTetoAlcada"
          v-model="alcadaValor"
          placeholder="X,XX"
        /><label class="inputCalculo" id="c" />
        <br />
        <input
          @input="parcelasDevida()"
          class="inputTetoAlcada"
          v-model="salariominimosAlcada"
          placeholder="X,XX"
        /><label class="inputCalculo" id="d" />
        <br />
        <p>
          {{alcadaTotal}}
        </p><label class="inputCalculo" id="e" />
        <br />
        <br />
      </div>
      <h5 class="center">d) Valores renunciados no ajuizamento atualizados:</h5>
      <div class="columnRightAlcada">
        <label class="camposInputAlcada"
          >d.1) Valor de eventual renúncia: R$</label
        >
        <br />
        <label class="camposInputAlcada"
          >d.2) Coeficiente de atualização:</label
        >
        <br />
        <label class="camposInputAlcada"
          >d.3) Valor atualizado da renúncia: R$</label
        >
        <br />
        <label class="camposInputAlcada">d.4) Taxa de juros de mora:</label>
        <br />
        <label class="camposInputAlcada">d.5) Juros de mora: R$</label>
        <br />
        <label class="camposInputAlcada">d.6) Total: R$</label>
        <br />
        <br />
      </div>
      <div class="column">
        
          {{alcadaTotal}}
        <label class="inputCalculo" id="i" />
        <br />
        <input
          @input="parcelasDevida()"
          class="inputTetoAlcada"
          v-model="alcadaCorrecaoPorcetagem"
          placeholder="X,XX"
        /><label class="inputCalculo" id="j" />
        <br />
          {{ Math.floor(alcadaTotal * alcadaCorrecaoPorcetagem * 100) / 100 }}

        <label class="inputCalculo" id="k" />
        <br />
        <input
          @input="parcelasDevida()"
          class="inputTetoAlcada"
          v-model="alcadaJurosPorcentagem"
          placeholder="X,XX"
        /><label class="inputCalculo" id="l" />
        <br />
          {{ Math.floor(alcadaTotal * alcadaJurosPorcentagem * 100) / 100 }}

        <label class="inputCalculo" id="m" />
        <br />
        <p>
          {{
            Math.floor(
              (Math.floor(alcadaTotal * alcadaCorrecaoPorcetagem * 100) / 100 +
                Math.floor(alcadaTotal * alcadaJurosPorcentagem * 100) / 100) *
                100
            ) / 100
          }}
        </p>
        <label class="inputCalculo" id="n" />
        <br />
        <br />
      </div>

      <h4 class="center">PLANILHA DE CÁLCULO</h4>
      <div class="rowInputs">
        <div class="column">
          <label class="camposInputAlcada">
            Parte:
            <input
              v-model="info_calculo.nome"
              @input="atulizarvalor()"
              placeholder="Nome + (CPF 000.000.000-00)"
          /></label>
          <label class="inputToPrint" id="partePlanilha" />
          <br />
          <label class="camposInputAlcada">
            Espécie:
            <input
              v-model="info_calculo.beneficio"
              @input="atulizarvalor()"
              placeholder="XX(XXXXXXXXXX)"
          /></label>
          <label class="inputToPrintAlcada" id="autorPlanilha" />
          <br />
          <label class="camposInputAlcada"
            >DIB Jud:
            <input v-model="dtInicial" placeholder="00/00/0000" /></label
          ><label class="inputToPrint" id="dibJudPlanilha" />
          <br />
          <label class="camposInputAlcada"
            >DIB Anterior:
            <input
              v-model="info_calculo.dibAnterior"
              @input="atulizarvalor()"
              placeholder="00/00/0000" /></label
          ><label class="inputToPrint" id="dibAnteriorPlanilha" />
          <br />
          <label class="camposInputAlcada"
            >RMI Jud.:
            <input v-model="salarioInicial" placeholder="00/00" /></label
          ><label class="inputToPrint" id="rmiJudPlanilha" />
          <br />
        </div>
        <div class="column">
          <label class="camposInputAlcada"
            >%RMI: <input placeholder="000,00" /></label
          ><label class="inputToPrint" id="porCententagemRmiPlanilha" />
          <br />
          <label class="camposInputAlcada"
            >Período (Data de Início):
            <input v-model="dtInicial" placeholder="XX/XX/XXXX" /></label
          ><label class="inputToPrint" id="dataInicialPlanilha" />
          <br />
          <!-- Criar Função -->
          <label class="camposInputAlcada"
            >Período (Data de Fim):
            <input placeholder="XX/XX/XXXX" v-model="dtFinal" /></label
          ><label class="inputToPrint" id="dataFinalPlanilha" />
          <br />
          <label for="13salario" class="labels pb-2" style="margin-left: 18px"
            >13º Salário
          </label>
          <input
            class="form-check-input"
            type="checkbox"
            style="margin-left: 5px"
            v-model="salario13"
            :value="salario13"
          />
          <br />
        </div>
      </div>
      <br />
    </div>

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
            <label class="camposInput">Valido até: {{ atulizacao }}</label
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
          <label class="camposInput">12 Parcelas Vincendas: R$</label>
          <br />
          <label class="camposInput">Honorários Advocatícios: R$</label>
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

      <!-- TETO DE ALÇADA -->
      <div v-if="alcadaBoolean == true">
        <h3 class="center">TETO DE ALÇADA</h3>
        <h5 class="center">{{ textoPeriodoAlcada }}</h5>
        <div class="columnAlcadaPrint">
          <label class="camposInputAlcada"
            >a) Total a ser considerado (Até 12 parcelas vincendas após
            ajuizamento): R$ {{ alcadaValor }}</label
          >
          <br />
          <label class="camposInputAlcada"
            >b) 60 salários mínimos no ajuizamente: R${{
              salariominimosAlcada
            }}</label
          >
          <br />
          <label class="camposInputAlcada"
            >c) Eventual renúncia do total: R${{ alcadaTotal }}</label
          >
          <br />
          <br />
        </div>
        <h5 class="center">
          d) Valores renunciados no ajuizamento atualizados:
        </h5>
        <div class="columnAlcadaPrint">
          <label class="camposInputAlcada"
            >d.1) Valor de eventual renúncia: R${{ alcadaTotal }}</label
          >
          <br />
          <label class="camposInputAlcada"
            >d.2) Coeficiente de atualização:
            {{ alcadaCorrecaoPorcetagem }}</label
          >
          <br />
          <label class="camposInputAlcada"
            >d.3) Valor atualizado da renúncia: R${{ alcadaCorrecao }}</label
          >
          <br />
          <label class="camposInputAlcada"
            >d.4) Taxa de juros de mora: {{ alcadaJurosPorcentagem }}</label
          >
          <br />
          <label class="camposInputAlcada"
            >d.5) Juros de mora: R${{ alcadaJuros }}</label
          >
          <br />
          <label class="camposInputAlcada"
            >d.6) Total: R${{ pacelasVencidas }}</label
          >
          <br />
          <br />
        </div>

        <h4 class="center">PLANILHA DE CÁLCULO</h4>
        <div class="rowInputs">
          <div class="column">
            <label class="camposInputAlcada">
              Parte:
              {{ info_calculo.nome }} (CPF {{ info_calculo.cpf }})</label
            >
            <label class="inputToPrint" id="partePlanilha" />
            <br />
            <label class="camposInputAlcada">
              Espécie:
              {{ info_calculo.beneficio }}
            </label>
            <label class="inputToPrintAlcada" id="autorPlanilha" />
            <br />
            <label class="camposInputAlcada">DIB Jud: {{ dtInicial }} </label
            ><label class="inputToPrint" id="dibJudPlanilha" />
            <br />
            <label class="camposInputAlcada"
              >DIB Anterior: {{ info_calculo.dibAnterior }} </label
            ><label class="inputToPrint" id="dibAnteriorPlanilha" />
            <br />
            <label class="camposInputAlcada"
              >RMI Jud.: R${{ salarioInicial }} </label
            ><label class="inputToPrint" id="rmiJudPlanilha" />
            <br />
          </div>
          <div class="column">
            <label class="camposInputAlcada" id="porCententagemRmiPlanilha"
              >%RMI:
            </label>
            <br />
            <label class="camposInputAlcada"
              >Período (Data de Início): {{ dtInicial }} </label
            ><label class="inputToPrint" id="dataInicialPlanilha" />
            <br />
            <!-- Criar Função -->
            <label class="camposInputAlcada"
              >Período (Data de Fim): {{ dtFinal }} </label
            ><label class="inputToPrint" id="dataFinalPlanilha" />
            <br />
            <label for="13salario" class="labels pb-2" style="margin-left: 18px"
              >13º Salário
            </label>
            <input
              class="form-check-input"
              type="checkbox"
              style="margin-left: 5px"
              v-model="salario13"
              :value="salario13"
            />
            <br />
          </div>
        </div>
        <br />
      </div>

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
//import { pararJurosTeste } from "../features/pararJuros";
import { baseApiUrl } from "../global";
import jsPDF from "jspdf";
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
      porcentagemHonorarios: null,
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
      //   limiteMinimoMaximo: true,
      //   salarioMinimo: false,
      //   salario13: true,
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
      headersCalculoLote: [
        { value: "numeroDoProcesso", text: "Numero Do Processo" },
        { value: "nome", text: "Autor" },
        { value: "beneficio", text: "Recebeu Benefício" },
        { value: "actions", text: "" },
      ],
      calculoLote: [],
      usuario_id: 1,
      verificadoInformacao: false,
      alertTexto: "",
      alcadaJurosPorcentagem: 0,
      alcadaValor: 0,
      salariominimosAlcada: 0,
      alcadaJuros: 0,
      alcadaCorrecao: 0,
      alcadaTotal: 0,
      textoPeriodoAlcada: "",
      alcadaCorrecaoPorcetagem: 0,
    };
  },

  methods: {
    //FUNCAO SEM SENTIDO MAS EVITA BUG DE ATUALIZAO ENTAO NAO MEXA!!!!
    atulizarvalor() {
      this.valor_corrigido++;
      this.valor_corrigido--;
      console.log(this.info_calculo);
      return this.info_calculo;
    },
    parcelasDevida() {
      this.alcadaTotal = (this.alcadaValor - this.salariominimosAlcada) < 0 ? 0 : (this.alcadaValor - this.salariominimosAlcada);
      this.pacelasVencidas =
        Math.floor(
          (Math.floor(this.alcadaTotal * this.alcadaCorrecaoPorcetagem * 100) /
            100 +
            Math.floor(this.alcadaTotal * this.alcadaJurosPorcentagem * 100) /
              100) *
            100
        ) / 100;
    },
    verificadoInformacoes() {
      if (
        this.dtInicial == "" ||
        this.dtFinal == "" ||
        this.atulizacao == "" ||
        this.inicio_juros == "" ||
        this.salarioInicial == "" ||
        this.tipoJuros == "" ||
        this.tipoCorrecao == ""
      ) {
        this.verificadoInformacao = true;
        this.alertTexto =
          "Verifique se os campos com * estão preenchido corretamente.";
        return false;
      } else {
        this.verificadoInformacao = false;
        return true;
      }
    },
    calculo() {
      if (this.verificadoInformacoes()) {
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
        let timer = 0;
        axios
          .post(`${baseApiUrl}/calculo/calcular`, body)
          .then(async (response) => {
            this.calc_total = await response.data;
          })
          .then(() => {
            this.iniciarCalculo();
          })
          .then(() => {
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
                  timer = 500;
                  console.log(timer);
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
          })
          .then(() => {
            this.beneficioAcumuladoCalculo();
          })
          .then(() => {
            if (!this.porcentagemHonorarios && !this.DataHonorarios) {
              this.textoHonorarios = null;
            } else {
              this.honorarios(
                this.DataHonorarios.split("/")[1],
                this.DataHonorarios.split("/")[2]
              );
              this.textoHonorarios =
                this.porcentagemHonorarios +
                "% com parcelas até " +
                this.DataHonorarios;
            }
          })
          // .then(() => {
          //   this.honorarios(
          //     this.DataHonorarios.split("/")[1],
          //     this.DataHonorarios.split("/")[2]
          //   );
          // })
          .then(() => {
            if (this.alcadaBoolean) {
              this.calculoDeOssada();
            }
          })
          .then(() => {
            this.totaisSalario();
          })
          // .then(() => {
          //   const print = () => {
          //     return new Promise((resolve) => {
          //       setTimeout(() => {
          //         resolve("The request is successful. " + this.printDiv());
          //       });
          //     }, timer);
          //   };
          //   const sleep = async () => {
          //     let second_response = await print();
          //     console.log(second_response);
          //   };

          //   sleep();
          // })
          .catch((error) => {
            console.log(error);
            console.log("error");
          });
      }
    },
    verificarCalculo() {
      if (this.calc_total[0]) {
        return true;
      } else {
        this.verificadoInformacao = true;
        this.alertTexto = "Obrigatório gerar e examinar a tabela de cálculo.";
        return false;
      }
    },
    adicionarLote() {
      if (this.verificadoInformacoes() && this.verificarCalculo()) {
        let nomeBeneficioBeneficioAcumulado = [];
        let dataDeInicioBeneficioAcumulado = [];
        let dataFinalBeneficioAcumulado = [];
        let rmilBeneficioAcumulado = [];
        this.beneficioInacumulavel.forEach((value) => {
          nomeBeneficioBeneficioAcumulado.push(value.beneficio);
          dataDeInicioBeneficioAcumulado.push(value.dib);
          dataFinalBeneficioAcumulado.push(value.dif);
          rmilBeneficioAcumulado.push(value.rmi);
        });
        const calculoData = [];
        const calculo_reajusteAcumulado = [];
        const calculo_devido = [];
        const calculo_reajusteRecebido = [];
        const calculo_recebido = [];
        const calculo_salario = [];
        const calculo_correcao = [];
        const calculo_salarioCorrigido = [];
        const calculo_juros = [];
        const calculo_salarioJuros = [];
        const calculo_salarioTotal = [];

        this.calc_total.forEach((value) => {
          calculoData.push(value.data);
          calculo_reajusteAcumulado.push(value.reajusteAcumulado);
          calculo_devido.push(value.devido);
          calculo_reajusteRecebido.push(value.reajusteRecebido);
          calculo_recebido.push(value.recebido);
          calculo_salario.push(value.salario);
          calculo_correcao.push(value.correcao);
          calculo_salarioCorrigido.push(value.salarioCorrigido);
          calculo_juros.push(value.juros);
          calculo_salarioJuros.push(value.salarioJuros);
          calculo_salarioTotal.push(value.salarioTotal);
        });
        let body = {
          numeroDoProcesso: this.info_calculo.numeroDoProcesso,
          nome: this.info_calculo.nome,
          dataDeAjuizamento: this.info_calculo.dataAjuizamento,
          inicioJuros:
            this.inicio_juros == "" || this.inicio_juros == null
              ? this.info_calculo.citacao
              : this.inicio_juros,
          numeroDoBeneficio: this.info_calculo.nb,
          rmi: this.salarioInicial,
          recebeuBeneficio: this.beneficio,
          termoInicial: this.dtInicial,
          termoFinal: this.dtFinal,
          beneficio: this.info_calculo.beneficio,
          cpf: this.info_calculo.cpf,
          honorarioAdvocativosData: this.DataHonorarios,
          honorariosAdvocativos: this.porcentagemHonorarios,
          dataDePagamento: this.info_calculo.dip,
          citacao: this.info_calculo.citacao,
          nomeBeneficioBeneficioAcumulado,
          dataDeInicioBeneficioAcumulado,
          dataFinalBeneficioAcumulado,
          rmilBeneficioAcumulado,
          acordo: this.procntagem_acordo,
          tipoJuros: this.tipoJuros,
          tipoCorrecao: this.tipoCorrecao,
          dibAnterior: this.dibAnterior,
          atualizacao: this.atulizacao,
          possuiDecimoTerceiro: this.salario13,
          possuiJuros: this.boolJuros,
          alcada: this.alcadaBoolean,
          limiteMinimoMaximo: this.limiteMinimoMaximo,
          salarioMinimo: this.salarioMinimo,
          aps: this.info_calculo.aps,
          usuario: this.usuario_id,
          total_processos: this.total_processos,
          valor_total: this.valor_total,
          valor_juros: this.valor_juros,
          valor_corrigido: this.valor_corrigido,
          valorHonorarios: this.valorHonorarios,
          pacelasVencidas: this.pacelasVencidas,
          data: calculoData,
          reajusteAcumulado: calculo_reajusteAcumulado,
          devido: calculo_devido,
          reajusteRecebido: calculo_reajusteRecebido,
          recebido: calculo_recebido,
          salario: calculo_salario,
          correcao: calculo_correcao,
          salarioCorrigido: calculo_salarioCorrigido,
          juros: calculo_juros,
          salarioJuros: calculo_salarioJuros,
          salarioTotal: calculo_salarioTotal,
          alcadaJurosPorcentagem: this.alcadaJurosPorcentagem,
          alcadaValor: this.alcadaValor,
          salariominimosAlcada: this.salariominimosAlcada,
          alcadaJuros: this.alcadaJuros,
          alcadaCorrecao: this.alcadaCorrecao,
          alcadaTotal: this.alcadaTotal,
          textoPeriodoAlcada: this.textoPeriodoAlcada,
          alcadaCorrecaoPorcetagem: this.alcadaCorrecaoPorcetagem,
          url: this.info_calculo.urlProcesso,
          textoHonorarios: this.textoHonorarios,
        };
        axios
          .post(`${baseApiUrl}/calculoEmLote/salvar`, body)
          .then((response) => {
            console.log(response.data);
            axios
              .get(
                `${baseApiUrl}calculoEmLote/procurarPorUsuario/${this.usuario_id}`
              )
              .then((response) => {
                this.calculoLote = response.data;
                console.log(this.calculoLote);
              })
              .catch((error) => {
                console.log(error);
                console.log("error 2");
              });
          })
          .catch((error) => {
            console.log(error);
            console.log("error 1");
          });
      }

      // this.calculoLote.push({
      //   numeroDoProcesso: this.info_calculo.numeroDoProcesso,
      //   nome: this.info_calculo.nome,
      //   dataDeAjuizamento: this.info_calculo.dataAjuizamento,
      //   inicio_juros: this.info_calculo.citacao,
      //   numeroDoBeneficio: this.info_calculo.nb,
      //   rmi: this.salarioInicial,
      //   recebeuBeneficio: this.beneficio,
      //   termoInicial: this.dtInicial,
      //   termoFinal: this.dtFinal,
      //   beneficio: this.info_calculo.beneficio,
      //   cpf: this.info_calculo.cpf,
      //   honorarioAdvocativosData: this.DataHonorarios,
      //   honorariosAdvocativos: this.porcentagemHonorarios,
      //   dataDePagamento: this.info_calculo.dip,
      //   citacao: this.info_calculo.citacao,
      //   nomeBeneficioBeneficioAcumulado,
      //   dataDeInicioBeneficioAcumulado,
      //   dataFinalBeneficioAcumulado,
      //   rmilBeneficioAcumulado,
      //   acordo: this.procntagem_acordo,
      //   tipoJuros: this.tipoJuros,
      //   tipoCorrecao: this.tipoCorrecao,
      //   dibAnterior: this.dibAnterior,
      //   atualizacao: this.atulizacao,
      //   possuiDecimoTerceiro: this.salario13,
      //   possuiJuros: this.boolJuros,
      //   alcada: this.alcadaBoolean,
      //   limiteMinimoMaximo: this.limiteMinimoMaximo,
      //   salarioMinimo: this.salarioMinimo,
      //   aps: this.info_calculo.aps,
      //   usuario: 1
      // })
      console.log(this.calculoLote[this.calculoLote.length - 1]);
    },
    removerItemLote(dado) {
      this.calculoLote = this.calculoLote.filter((item) => item !== dado);
    },
    deletarLote() {
      axios
        .delete(
          `${baseApiUrl}/calculoEmLote/deletarAllUsuario/${this.usuario_id}`,
          this.calculoLote
        )
        .then((dados) => {
          console.log(dados);
          axios
            .get(
              `${baseApiUrl}/calculoEmLote/procurarPorUsuario/${this.usuario_id}`
            )
            .then((response) => {
              this.calculoLote = response.data;
              console.log(this.calculoLote);
            })
            .catch((error) => {
              console.log(error);
              console.log("error lote");
            });
        })
        .catch((error) => {
          console.log(error);
          console.log("error deletar");
        });
    },
    atulizarInfosLote(dado) {
      this.zeraDadosDocalculo();
      let beneficioAcumuladoLote = [];
      if (dado.recebeuBeneficio) {
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
        dado.nomeBeneficioBeneficioAcumulado.forEach((value, index) => {
          beneficioAcumuladoLote.push({
            beneficio: value,
            dib: dado.dataDeInicioBeneficioAcumulado[index],
            dif: dado.dataFinalBeneficioAcumulado[index],
            rmi: dado.rmilBeneficioAcumulado[index],
          });
        });
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
      let calcul = [];
      dado.data.forEach((value, index) => {
        calcul.push({
          data: value,
          reajusteAcumulado: dado.reajusteAcumulado[index],
          devido: dado.devido[index],
          reajusteRecebido:
            dado.reajusteRecebido[index] == null
              ? 0
              : dado.reajusteRecebido[index],
          recebido: dado.recebido[index] == null ? 0 : dado.recebido[index],
          salario: dado.salario[index],
          correcao: dado.correcao[index],
          salarioCorrigido: dado.salarioCorrigido[index],
          juros: dado.juros[index],
          salarioJuros: dado.salarioJuros[index],
          salarioTotal: dado.salarioTotal[index],
        });
      });
      console.log(dado.url);
      this.info_calculo.urlProcesso = dado.url;
      this.info_calculo.dip = dado.dataDePagamento;
      this.calc_total = calcul;
      this.total_processos = dado.total_processos;
      this.valor_total = dado.valor_total;
      this.valor_juros = dado.valor_juros;
      this.valor_corrigido = dado.valor_corrigido;
      this.valorHonorarios = dado.valorHonorarios;
      this.pacelasVencidas = dado.pacelasVencidas;
      this.dtInicial = dado.termoInicial;
      this.dtFinal = dado.termoFinal;
      this.salarioInicial = dado.rmi;
      this.inicio_juros = dado.inicioJuros;
      this.DataHonorarios = dado.honorarioAdvocativosData;
      this.porcentagemHonorarios = dado.honorariosAdvocativos;
      this.procntagem_acordo = dado.acordo;
      this.salario13 = dado.possuiDecimoTerceiro;
      this.boolJuros = dado.possuiJuros;
      this.alcadaBoolean = dado.alcada;
      this.tipoJuros = dado.tipoJuros;
      this.tipoCorrecao = dado.tipoCorrecao;
      this.atulizacao = dado.atualizacao;
      this.dibAnterior = dado.dibAnterior;
      this.salarioMinimo = dado.salarioMinimo;
      this.limiteMinimoMaximo = dado.limiteMinimoMaximo;
      this.beneficio = dado.recebeuBeneficio;
      this.arrayBenficios = beneficioAcumuladoLote;
      this.info_calculo.numeroDoProcesso = dado.numeroDoProcesso;
      this.info_calculo.nome = dado.nome;
      this.info_calculo.dataAjuizamento = dado.dataDeAjuizamento;
      this.info_calculo.nb = dado.numeroDoBeneficio;
      this.info_calculo.beneficio = dado.beneficio;
      this.beneficioInacumulavel = beneficioAcumuladoLote;
      this.procntagem_acordo = dado.acordo;
      this.dibAnterior = dado.dibAnterior;
      this.textoHonorarios = dado.textoHonorarios;
      this.info_calculo.cpf = dado.cpf;
      this.alcadaJurosPorcentagem = dado.alcadaJurosPorcentagem;
      this.alcadaValor = dado.alcadaValor;
      this.salariominimosAlcada = dado.salariominimosAlcada;
      this.alcadaJuros = dado.alcadaJuros;
      this.alcadaCorrecao = dado.alcadaCorrecao;
      this.alcadaTotal = dado.alcadaTotal;
      this.textoPeriodoAlcada = dado.textoPeriodoAlcada;
      this.alcadaCorrecaoPorcetagem = dado.alcadaCorrecaoPorcetagem;
    },
    calcularLote() {
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
      let timer = 0;
      axios
        .post(`${baseApiUrl}/calculo/calcular`, body)
        .then(async (response) => {
          this.calc_total = await response.data;
        })
        .then(() => {
          this.iniciarCalculo();
        })
        .then(() => {
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
                timer = 500;
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
            //this.beneficioAcumuladoCalculo();
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
        })
        .then(() => {
          this.beneficioAcumuladoCalculo();
        })
        .then(() => {
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
        })
        .then(() => {
          if (this.alcadaBoolean) {
            this.calculoDeOssada();
          }
        })
        .then(() => {
          this.totaisSalario();
        })
        .then(() => {
          const print = () => {
            return new Promise((resolve) => {
              setTimeout(() => {
                resolve("The request is successful. " + this.printDiv());
              });
            }, timer);
          };
          const sleep = async () => {
            let second_response = await print();
            console.log(second_response);
          };

          sleep();
        })
        .catch((error) => {
          console.log(error);
          console.log("error");
        });
    },
    async calcularEmLote() {
      //this.atulizarInfosLote(this.calculoLote[0])
      // const executar = async () =>{
      //     let fazer = await this.atulizarInfosLote(this.calculoLote[0]);
      //     console.log(fazer);
      //     this.imprimirPdf(this.calculoLote[0])
      //   }
      //   console.log(executar());
      this.calculoLote.forEach(async (dado /*index*/) => {
        // const print = () => {
        //     return new Promise((resolve) => {
        //       setTimeout(() => {
        //         resolve("The request is successful. " + this.atulizarInfosLote(dado));
        //       });
        //     },);
        //   };
        //   const sleep = async () => {
        //     let second_response = await print();
        //     console.log(second_response);
        //   };

        //   sleep().then(() => {
        //   this.printDiv()
        //  });

        // var caular = await this.calculo()
        // caular
        const print = () => {
          return new Promise((resolve) => {
            setTimeout(() => {
              resolve(
                "The request is successful. " + this.atulizarInfosLote(dado)
              );
            });
          });
        };
        const executar = async () => {
          await print();
          //await this.imprimirPdf(dado);
          this.printDiv();
        };
        console.log(executar());
        // const promiseAtulizar =  new Promise(() => this.atulizarInfosLote(dado));
        // promiseAtulizar.then(() => this.imprimirPdf());
        // this.atulizarInfosLote(dado);
        // this.imprimirPdf();
        console.log("dado: " + dado);
        console.log(dado);
        //this.printDiv()
        //await this.calcularLote();
      });
    },
    imprimirPdf(dado) {
      // eslint-disable-next-line no-undef
      var doc = new jsPDF("portrait", "pt", "a4"),
        data = new Date();
      let margins = {
        top: 40,
        bottom: 60,
        left: 40,
        width: 1000,
      };
      var divToPrint = document.getElementById("areaToPrint");
      doc.fromHTML(
        divToPrint,
        margins.left, // x coord
        margins.top,
        { pagesplit: true },
        function () {
          doc.save(
            "Relatorio - " +
              dado.nome +
              " " +
              data.getDate() +
              "/" +
              data.getMonth() +
              "/" +
              data.getFullYear() +
              ".pdf"
          );
        }
      );
    },
    calculoDeOssada() {
      this.pacelasVencidas = 0;
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
        let bodytaxaUnica = {
          dib: this.info_calculo.dataAjuizamento,
          tipoJuros: this.tipoJuros,
          tipoCorrecao: this.tipoCorrecao,
          atulizacao: this.atulizacao,
        };
        axios
          .post(`${baseApiUrl}/calculo/taxaUnica`, bodytaxaUnica)
          .then((taxaUnica) => {
            console.log(taxaUnica.data);
            let taxaUnicaData = taxaUnica.data;
            console.log("taxa unica: " + taxaUnicaData);
            correcao = taxaUnicaData.correcao;
            juros = taxaUnicaData.juros;
          })
          .catch((error) => {
            console.log(error);
            console.log("error taxaUnica");
          });
        await obj.forEach((value) => {
          console.log("valor: " + value.data.split("T")[0].split("-")[1]);
          if (value.data.split("T")[0].split("-")[1] <= ajuizamento[1]) {
            this.textoPeriodoAlcada = `SITUAÇÃO NO AJUIZAMENTO (${this.info_calculo.dataAjuizamento}) - Valor do salário mínimo: R$ ${value.valor}`;
            this.salarioMinimoOssada = 60 * value.valor;
            console.log("Salario minimo: " + this.salarioMinimoOssada);
          }
        });

        axios
          .post(`${baseApiUrl}/calculo/alcada`, body)
          .then((response) => {
            console.log(response.data);
            let alcada = response.data;
            console.log(alcada);
            this.calc_total.forEach((value) => {
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
                    salarioTotal:
                      Math.floor(dado.correcao * value.salario * 100) / 100,
                  });
                  this.pacelasVencidas +=
                    Math.floor(dado.correcao * value.salario * 100) / 100;
                }
              });
            });
            console.log("Parcelas vencidas: " + this.pacelasVencidas);
            this.alcadaValor = this.pacelasVencidas;
            this.salariominimosAlcada = this.salarioMinimoOssada;
            ossada =
              Math.floor(
                (this.pacelasVencidas - this.salarioMinimoOssada) * 100
              ) / 100;
            console.log("Parcelas vencidas: " + ossada);
            this.alcadaValue = Math.floor(this.pacelasVencidas * 100) / 100;
            if (ossada < 0) {
              ossada = 0;
              this.pacelasVencidas = ossada;
            } else {
              this.pacelasVencidas =
                Math.floor(ossada * correcao * (juros + 1) * 100) / 100;
            }
            this.alcadaJurosPorcentagem = Math.floor(juros * 1000000) / 1000000;
            this.alcadaCorrecaoPorcetagem =
              Math.floor(correcao * 1000000) / 1000000;
            this.alcadaJuros =
              Math.floor(ossada * juros * correcao * 100) / 100;
            this.alcadaCorrecao = Math.floor(ossada * correcao * 100) / 100;
            this.alcadaTotal = Math.floor(ossada * 100) / 100;
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

      this.valor_total = 0;
      this.valor_juros = 0;
      this.valor_corrigido = 0;
      this.valorSalario13 = 0;
      this.arr_Salario13 = 0;
      this.juros13Valor = 0;
      this.corrigido13Valor = 0;
      //this.pacelasVencidas = 0;
      this.salarioMinimoOssada = 0;
      this.alcadaValue = 0;
      this.alcadaArray = [];
      return this.alcadaArray;
    },
    iniciarCalculo() {
      this.beneficioInacumulavel = [];
      if (this.total_processos > 0) {
        this.zeraDadosDocalculo();
      }
      const dtInicial = this.dtInicial.split("-").reverse().join("/");
      var dtFinal = this.dtFinal.split("-").reverse().join("/");
      let dinicial = parseInt(dtInicial.split("/")[0]);
      var dfinal =
        dtFinal.split("/")[1] == 2 &&
        (dtFinal.split("/")[0] == 28 || dtFinal.split("/")[0] == 29)
          ? 30
          : parseInt(dtFinal.split("/")[0]);
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
    },
    beneficioAcumuladoCalculo() {
      let beneficioAcumulado13 = 0;
      function decontar(value, dado, dtInicial, dtFinal) {
        let dinicial = dtInicial.split("/");
        let recebido = value.salario;
        if (value.data.split("/")[0] != "13Salario") {
          if (
            value.data.split("/")[1] == dinicial[1] &&
            value.data.split("/")[2] == dinicial[2]
          ) {
            beneficioAcumulado13 =
              dinicial[0] >= 15 ? beneficioAcumulado13++ : beneficioAcumulado13;
          } else {
            beneficioAcumulado13++;
          }
        } else {
          recebido = (recebido / 12) * beneficioAcumulado13;
          beneficioAcumulado13 = 1;
        }
        console.log(dtFinal);
        if (
          value.data.split("/")[1] == dinicial[1] &&
          value.data.split("/")[2] == dinicial[2]
        ) {
          let dias = dinicial[0] >= 30 ? 1 : 30 - dinicial[0] + 1;
          recebido = (recebido / 30) * dias;
        } else if (
          value.data.split("/")[1] == dtFinal.split("/")[1] &&
          value.data.split("/")[2] == dtFinal.split("/")[2]
        ) {
          let dias = dtFinal.split("/")[0] >= 30 ? 30 : dtFinal.split("/")[0];
          recebido = (recebido / 30) * dias;
        }
        console.log(recebido);
        console.log(value.salario);
        return {
          data: dado.data,
          reajusteAcumulado: dado.reajusteAcumulado,
          devido: dado.devido > 0 ? dado.devido : dado.salario,
          reajusteRecebido: dado.reajusteAcumulado,
          recebido:
            dado.recebido > 0
              ? dado.recebido + recebido
              : Math.floor(recebido * 100) / 100,
          salario: Math.floor((dado.salario - recebido) * 100) / 100,

          correcao: dado.correcao,
          salarioCorrigido:
            Math.floor((dado.salario - recebido) * dado.correcao * 100) / 100,
          juros: dado.juros,
          salarioJuros:
            Math.floor(
              (dado.salario - recebido) * dado.juros * dado.correcao * 100
            ) / 100,
          salarioTotal:
            Math.floor(
              (dado.salario - recebido) * (dado.juros + 1) * dado.correcao * 100
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
      this.beneficioInacumulavel.forEach((info, index) => {
        let dataDib = info.dib.split("/");
        let dataDif = info.dif.split("/");
        let dataincial = this.dtInicial.split("/");
        let dataFinal = this.dtFinal.split("/");
        //fazerb um confirmado de periodo;
        if (
          this.beneficiosInacumulveilVerificadorPeriodo(
            dataDib,
            dataDif,
            dataincial,
            dataFinal
          )
        ) {
          //console.log("Benefico inacumulado");
          if (index == 0) {
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
          }
          const body = {
            dib: info.dib,
            dip: info.dif,
            rmi: info.rmi,
            salario13: info.salario13,
            limiteMinimoMaximo: info.limiteMinimoMaximo,
            salarioMinimo: info.salarioMinimo,
          };

          axios
            .post(`${baseApiUrl}/calculo/beneficioAcumulado`, body)
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
                  console.log(
                    "sizeCalTotal : " +
                      dataFinal[0] +
                      " index: " +
                      dataCalculo[0] +
                      " comparacao: " +
                      (dataFinal[0] == dataCalculo[0])
                  );
                  if (
                    (dataBeneficioAcumulado[0] == dataCalculo[0] ||
                      dataincial[0] == dataCalculo[0] ||
                      dataFinal[0] == dataCalculo[0]) &&
                    dataBeneficioAcumulado[1] == dataCalculo[1] &&
                    dataBeneficioAcumulado[2] == dataCalculo[2]
                  ) {
                    //console.log(decontar(value, dado));
                    newArrayCalculo.push(
                      decontar(value, dado, this.dtInicial, this.dtFinal)
                    );
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
              this.totaisSalario();
            })
            .catch((erro) => {
              console.log(erro);
              console.log("erro beneficioa Acumulado");
            });
        }
        if (!this.beneficioInacumulavel[0].rmi) {
          this.beneficio = false;
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
    beneficiosInacumulveilVerificadorPeriodo(
      dataDib,
      dataDif,
      dataincial,
      dataFinal
    ) {
      if (dataDib[2] <= dataFinal[2] && dataDif[2] >= dataincial[2]) {
        if (dataDif[2] == dataincial[2]) {
          if (dataDif[1] == dataincial[1]) {
            if (dataDif[0] >= dataincial[0]) {
              return true;
            } else {
              return false;
            }
          } else if (dataDif[1] > dataincial[1]) {
            return true;
          } else {
            return false;
          }
        } else {
          return true;
        }
      } else {
        return false;
      }
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
      this.valor_total = Math.floor(this.valor_total * 100) / 100;
      this.valor_juros = Math.floor(this.valor_juros * 100) / 100;
      this.valor_corrigido =
        Math.floor((this.valor_total - this.valor_juros) * 100) / 100;
      this.total_processos =
        Math.floor(
          (this.valor_corrigido +
            this.valor_juros +
            this.valorHonorarios -
            this.pacelasVencidas) *
            100
        ) / 100;
      this.formatacao();
    },
    honorarios(mesHonorarios, anoHonorarios) {
      let i = 0;
      this.valorHonorarios = 0;
      console.log(this.calc_total[0]);
      console.log("this.calc_total[0]");
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
          if (datafinal[1] <= 10) {
            this.dtFinal =
              datafinal[1] == 3
                ? "28/0" + (datafinal[1] - 1) + "/" + datafinal[2]
                : "30/0" + (datafinal[1] - 1) + "/" + datafinal[2];
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
        this.pensaoPorMorte = "PENSÃO POR MORTE - REVISAR TERMO INICIAL";
      }
      if (this.info_calculo.beneficiosAcumulados.length != 0) {
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
          if (value.beneficio && dado) {
            if (
              parseInt(dado.split("-")[0]) ==
              parseInt(value.beneficio.split("-")[0])
            ) {
              let push_beneficioAcumulado = {
                beneficio: value.beneficio,
                dib: value.dib,
                dif: value.dif,
                rmi: value.rmi,
                limiteMinimoMaximo: true,
                salarioMinimo: false,
                salario13: true,
              };
              this.beneficioInacumulavel.push(push_beneficioAcumulado);
            }
          }
        });
      });
      this.arrayBenficios = this.beneficioInacumulavel;
      console.log("size: " + this.beneficioInacumulavel.length);
      this.inicio_juros = null;
      this.inicio_juros = this.info_calculo.citacao;
      this.DataHonorarios = null;
      this.porcentagemHonorarios = null;
      this.valorHonorarios = 0;
      this.textoHonorarios = null;
      this.valorSalario13 = 0;
      this.arr_Salario13 = 0;
      this.dibAnterior = this.info_calculo.dibAnterior;
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
        salario13: true,
        limiteMinimoMaximo: true,
        salarioMinimo: false,
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
          border: 4px solid #FFFFFF;
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

        
        .columnResumoPagamentosAdministrativos {
          float: left;
          width: 11%;
          margin-left: 1%;
        }

        .columnRightAlcada {
          float: left;
          margin-left: 0%;
          text-align: left;
          width: 50%;
        }

        .columnAlcadaPrint {
          float: center;
          text-align: left;
          width: 60%;
          margin-left: 20%;
          margin-right: 20%;
        }

        .inputPagamentosAdministrativos {
          max-width: 100%;
        }

        .inputTetoAlcada {
          max-width: 15%;
          font-size: 12px;
        }

        .camposInputAlcada {
          text-align: left;
          margin-left: 3%;
          font-size: 16px;
          width: 30%;
        }
        
        `;
      style = style + "</style>";

      var id = new Date().getTime();
      var newWin = window.open(
        window.location.href + "?printerFriendly=true",
        id,
        "toolbar=1,scrollbars=1,location=0,statusbar=0,menubar=1,resizable=1,width=800,height=600,left = 240,top = 212"
      );

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
  },

  mounted() {
    axios
      .get(`${baseApiUrl}/calculoEmLote/procurarPorUsuario/${this.usuario_id}`)
      .then((response) => {
        this.calculoLote = response.data;
        console.log(this.calculoLote);
      })
      .catch((error) => {
        console.log(error);
        console.log("error calculo lote");
      });
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
#app {
  z-index: 1;
}

v-card {
  z-index: 1;
}

#alerta {
  position: fixed;
  right: 0;
  top: 15%;
  width: 100%;
  margin-top: -2.5em;
  z-index: 2;
}

.item-obrigatorio {
  margin: 0;

  color: red;
}

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

.columnResumoPagamentosAdministrativos {
  float: left;
  width: 11%;
  margin-left: 1%;
}

.columnRightAlcada {
  float: left;
  margin-left: 8%;
  text-align: left;
  width: 42%;
}

.columnAlcadaPrint {
  float: center;
  text-align: left;
  width: 60%;
  margin-left: 25%;
  margin-right: 15%;
}

.inputPagamentosAdministrativos {
  max-width: 100%;
}

.inputTetoAlcada {
  max-width: 10%;
}
</style>
