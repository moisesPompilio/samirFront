<template>
  <div class="tabela-dib">
    <b-row class="mt-3">
      <b-col sm="6">
        <b-table
          class="mb-0"
          :current-page="currentPage"
          :per-page="perPage"
          striped
          bordered
          hover
          :head-variant="head"
          table-variant="light"
          :items="tabela_dib"
          :fields="fields"
        >
          <template #thead-top="data">
            <b-tr>
              <b-th variant="secondary" v-model="data.type"></b-th>
              <b-th variant="primary" colspan="12" style="text-align: center"
                >Dib 2009</b-th
              >
            </b-tr>
          </template>
        </b-table>
        <b-pagination
          class="page"
          size="md"
          v-model="currentPage"
          :total-rows="totalRows"
          :per-page="perPage"
        />
      </b-col>
    </b-row>
  </div>
</template>
<script>
export default {
  name: "TabelaDib",
  data: function () {
    return {
      head: "dark",
      totalRows: 0,
      currentPage: 1,
      anoInicial: 2008,
      anoFinal: 2010,
      perPage: 0,
      tabela_dib: [],
      fields: [
        { key: "jan", label: "Jan" },
        { key: "fev", label: "Fev" },
        { key: "mar", label: "Mar" },
        { key: "abr", label: "Abr" },
        { key: "mai", label: "Mai" },
        { key: "jun", label: "Jun" },
        { key: "jul", label: "Jul" },
        { key: "ago", label: "Ago" },
        { key: "set", label: "Set" },
        { key: "out", label: "Out" },
        { key: "nov", label: "Nov" },
        { key: "dez", label: "Dez" },
      ],
    };
  },
  methods: {
    loadDibs() {
      // this.tabela_dib = [
      //   {
      //     jan: 5.45,
      //     fev: 4.32,
      //     mar: 4.02,
      //     abr: 5.74,
      //     mai: 0.33,
      //     jun: 2.09,
      //     jul: 0.16,
      //     ago: 1.12,
      //     set: 2.88,
      //     out: 2.97,
      //     nov: 4.32,
      //     dez: 0.17,
      //   },
      //   {
      //     jan: 3.45,
      //     fev: 4.01,
      //     mar: 7.72,
      //     abr: 1.74,
      //     mai: 0.88,
      //     jun: 6.59,
      //     jul: 4.16,
      //     ago: 4.32,
      //     set: 4.88,
      //     out: 0.97,
      //     nov: 0,
      //     dez: 0.13,
      //   },
      //   {
      //     jan: 1.45,
      //     fev: 2.32,
      //     mar: 3.02,
      //     abr: 4.74,
      //     mai: 5.33,
      //     jun: 6.09,
      //     jul: 7.16,
      //     ago: 6.12,
      //     set: 5.88,
      //     out: 3.97,
      //     nov: 0.32,
      //     dez: 0.17,
      //   },
      //   {
      //     jan: 5.45,
      //     fev: 4.32,
      //     mar: 4.02,
      //     abr: 5.74,
      //     mai: 0.33,
      //     jun: 2.09,
      //     jul: 0.16,
      //     ago: 1.12,
      //     set: 2.88,
      //     out: 2.97,
      //     nov: 4.32,
      //     dez: 0.17,
      //   },
      // ];

       const taxas = {
        data: [
          3.43, 3.2, 3.01, 2.94, 7.72, 2.28, 0.84, 0.59, 0.59, 0.29, 0, 0.14,
        ],
        2009: [
          4.48, 4.11, 3.55, 2.76, 2.14, 1.99, 1.98, 1.88, 1.76, 1.81, 6.47,
          1.22,
        ],
        2010: [
          5.45, 5.25, 5.07, 6.08, 5.12, 5.39, 5.07, 4.61, 4.23, 3.34, 2.42,
          1.46,
        ],
      };

        console.log({taxas: taxas.data})

      this.currentPage = 1;
      this.totalRows = this.tabela_dib.length;
      this.perPage = 1;
    },
  },
  mounted() {
    this.loadDibs();
  },
};
</script>
<style>
</style>