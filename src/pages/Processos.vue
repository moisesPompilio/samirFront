<template>
  <v-container>
    <v-card>
      <v-card-title>Processos vindos do Beremir</v-card-title>
      <v-card-subtitle
        >Aqui você encontra uma tabela de processos que passaram pela triagem do
        Beremir.</v-card-subtitle
      >
    </v-card>
    <v-card class="mt-5">
      <v-card-title>Tabela de Processos</v-card-title>
      <v-data-table
        :headers="headers"
        :items="infos"
        item-key="name"
        class="elevation-1"
      >
        <template v-slot:item="{ item }">
          <tr>
            <td class="py-3" style="color: rgb(107, 107, 218)">
              {{ item.nup }}
            </td>
            <td>{{ item.interessados }}</td>
            <td>
              <v-btn icon @click="redirectToCalculo">
                <v-icon color="success">mdi-file-eye-outline</v-icon>
              </v-btn>
            </td>
          </tr>
        </template>
      </v-data-table>
    </v-card>
  </v-container>
</template>

<script>
export default {
  name: "Processos",
  data: function () {
    return {
      headers: [
        { value: "nup", text: "NUP" },
        { value: "interessados", text: "Interessados " },
        { value: "actions" },
      ],
      infos: [
        {
          nup: "00457.02334/2021-18(ARQU/ER-SEAS-PRF1)1005832.2021.4.01.3900(TRF1_1)",
          interessados:
            "*AFONSO ROGRIGUES COSTA*INSTITUTO NACIONAL DO SEGURO SOCIAL[GERENCIA EXECUTIVA JUNDIAI]",
        },
        {
          nup: "00457.02334/2021-18(ARQU/ER-SEAS-PRF1)1005832.2021.4.01.3900(TRF1_1)",
          interessados:
            "*AFONSO ROGRIGUES COSTA*INSTITUTO NACIONAL DO SEGURO SOCIAL[GERENCIA EXECUTIVA JUNDIAI]",
        },
        {
          nup: "00457.02334/2021-18(ARQU/ER-SEAS-PRF1)1005832.2021.4.01.3900(TRF1_1)",
          interessados:
            "*AFONSO ROGRIGUES COSTA*INSTITUTO NACIONAL DO SEGURO SOCIAL[GERENCIA EXECUTIVA JUNDIAI]",
        },
        {
          nup: "00457.02334/2021-18(ARQU/ER-SEAS-PRF1)1005832.2021.4.01.3900(TRF1_1)",
          interessados:
            "*AFONSO ROGRIGUES COSTA*INSTITUTO NACIONAL DO SEGURO SOCIAL[GERENCIA EXECUTIVA JUNDIAI]",
        },
        {
          nup: "00457.02334/2021-18(ARQU/ER-SEAS-PRF1)1005832.2021.4.01.3900(TRF1_1)",
          interessados:
            "*AFONSO ROGRIGUES COSTA*INSTITUTO NACIONAL DO SEGURO SOCIAL[GERENCIA EXECUTIVA JUNDIAI]",
        },
        {
          nup: "00457.02334/2021-18(ARQU/ER-SEAS-PRF1)1005832.2021.4.01.3900(TRF1_1)",
          interessados:
            "*AFONSO ROGRIGUES COSTA*INSTITUTO NACIONAL DO SEGURO SOCIAL[GERENCIA EXECUTIVA JUNDIAI]",
        },
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
.colr {
  color: rgb(107, 107, 218);
}
</style>