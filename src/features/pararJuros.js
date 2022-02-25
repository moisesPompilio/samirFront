export  function pararJurosTeste(
    info_calculo,
    calc_total
){
    const dataAjuizamentoRequerida =  info_calculo.dataAjuizamento.split("-").reverse().join("/");
    console.log(dataAjuizamentoRequerida.split("/")[0] + "/" + dataAjuizamentoRequerida.split("/")[1] + "/" + dataAjuizamentoRequerida.split("/")[2])
    console.log(calc_total[0]);
    let dataForn = calc_total[0].data.split("-").reverse().join("/");
    console.log(dataForn.split("/")[0] + "/" + dataForn.split("/")[1] + "/" + dataForn.split("/")[2]);
    console.log(dataForn.split("/")[0] + "/" + dataAjuizamentoRequerida.split("/")[1] + "/" + dataAjuizamentoRequerida.split("/")[2])
    try {
      var i = 0;
     for( const value of calc_total){
       console.log(value);
     var dataFornecida = calc_total[i].data.split("-").reverse().join("/");
     var dataDeJuizamento = dataFornecida.split("/")[0] + "/" + dataAjuizamentoRequerida.split("/")[1] + "/" + dataAjuizamentoRequerida.split("/")[2];
     var dateTabela = dataFornecida.split("/")[0] + "/" + dataFornecida.split("/")[1] + "/" + dataFornecida.split("/")[2];
     console.log(dataDeJuizamento)
     console.log(dateTabela)
      if( dateTabela == dataDeJuizamento){
        const juros = calc_total[i].juros;
        for(let x = 0; x <= i; x++){
         calc_total[x].salarioTotal = (calc_total[x].salarioTotal - calc_total[x].salarioJuros) + (calc_total[x].salarioCorrigido * juros);
          calc_total[x].juros = juros;
          calc_total[x].salarioJuros = calc_total[x].salarioCorrigido * juros;
          console.log(juros);
        }
        i = calc_total.lengt;
      }
      i++;
    } 
    } catch (error) {
      console.log(error);
    }
    return calc_total;
  }