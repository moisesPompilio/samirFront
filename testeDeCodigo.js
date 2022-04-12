function nossoForEach(arr, funcao) {
    for(let i = 0; i < arr.length; i = i + 1) {
        funcao(arr[i], i);
    }
}

nossoForEach([{nome:'nome',value:"iiiii"},{nome:'nome',value:"iiiii"}], function(nome, indice) {
    console.log(nome.nome, indice)
})