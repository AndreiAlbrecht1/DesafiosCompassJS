let stringTestada = "A base do teto desaba"

const stringFiltrada = stringTestada.toLowerCase().replace(/\s+/g,'')
const stringFiltradaInvertida = stringFiltrada.split('').reverse().join('')

console.log((stringFiltrada == stringFiltradaInvertida));


