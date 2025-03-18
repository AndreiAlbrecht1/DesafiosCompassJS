function verificarPalindromo(string) {
    const stringFiltrada = string.toLowerCase().replace(/\s+/g,'')
    const stringFiltradaInvertida = stringFiltrada.split('').reverse().join('')
    
    return((stringFiltrada == stringFiltradaInvertida));
}

console.log(verificarPalindromo("arara"))
console.log(verificarPalindromo("A base do teto desaba"))
console.log(verificarPalindromo("xpto"))



