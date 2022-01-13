function calculaValorReajuste(salarioBase, taxaReajuste) {
  return salarioBase * (taxaReajuste - 1)
}
function maiorTaxaAno(taxas = []) {
  let maiorTaxa = 1

  taxas.forEach((taxaAtual) => {
    if (taxaAtual > maiorTaxa) maiorTaxa = taxaAtual
  })

  return maiorTaxa
}

//   function diferenca(salario, diaInicio) {
//     const diaria = salario / 30;

//     if (+diaInicio === 1) {
//       return salario;
//     }

//     return (31 - +diaInicio) * diaria;
//   }

export function calculaReajuste(
  taxas = [],
  salario,
  mesInicio = 0,
  anoInicio = 0,
  taxaAnoAnterior,
  anoFim,
  mesFim,
  infos = []
) {
  // extrai as taxas de acordo com mes de inicio e
  // mes de fim do ano referente
  // "taxas.slice(0, mesFim)" pega desde janeiro até o "mesFim" do ano
  const taxas_validas =
    anoFim === anoInicio ? taxas.slice(0, mesFim) : taxas.slice(mesInicio)

  const taxaReajuste = maiorTaxaAno(taxas_validas)
  const valorReajuste = calculaValorReajuste(salario, taxaReajuste)

  // const recebido = 0

  // se o fim for 01 de agosto de 2020, o loop vai até o 7 (8 meses),
  // se não, vai até o 11
  const qtdMeses = anoInicio === anoFim ? mesFim : 11

  // loop de acordo com a quantidade de meses que deve pecorrer com base
  // no calculo de "qtdMeses"
  while (+mesInicio <= qtdMeses) {
    infos.push({
      data:
        mesInicio < 9
          ? `01/0${mesInicio + 1}/${anoInicio}`
          : `01/${mesInicio + 1}/${anoInicio}`,
      salario: salario,
      reajusteAcumulado: mesInicio === 0 ? taxaAnoAnterior : 1
      // correcao: correcao
      // diferenca: salario - recebido
    })

    mesInicio++
  }

  const result = Math.floor((valorReajuste + +salario) * 100) / 100
  return [result, taxaReajuste]
}
