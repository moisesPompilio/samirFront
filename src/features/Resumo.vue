<template>
  <div class="jumbo">
    <h1>Revisão de Benefícios</h1>
    <div class="linha">
      <p><strong>Processo: </strong>0042-40.7745.7748</p>
      <p><strong>Ajuizamento: </strong>Paulo Victor</p>
    </div>
    <div class="linha">
      <p><strong>Autor: </strong>Paulo Victor</p>
      <p><strong>Início dos Juros: </strong>06/2011</p>
    </div>
    <div class="linha">
      <p><strong>Objeto: </strong>46-Aposentadoria Especial</p>
      <p><strong>Calculado em: </strong>02/2021</p>
    </div>
    <p><strong>Vara: </strong>Previdência</p>
    <p><strong>Honorário: </strong>10% com parcelas até 08/2012</p>
  </div>
</template>
<script>
export default {
  name: "Resumo",
};
</script>
<style>
.jumbo {
  /* width: 50%; */
  background-color: rgb(255, 255, 255);
  padding: 10px;
  border: 2px solid rgb(140, 140, 141);
  border-radius: 5px;
}

.jumbo h1 {
  font-size: 2rem;
}

.linha {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
</style>

