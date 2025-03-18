function verificarNumeroPrimo(numero) {
    let divisores = 0
    if (typeof(numero) !== 'number'){
        return 'Valor inválido detectado'
    }
    
    for (let i = 1; i <= numero; i++) {
        if (numero % i == 0) {
            divisores++
        }
    }
    const ehPrimo = divisores == 2
    return ehPrimo
}

console.log(verificarNumeroPrimo(7))
console.log(verificarNumeroPrimo(10))
console.log(verificarNumeroPrimo("xpto"))
