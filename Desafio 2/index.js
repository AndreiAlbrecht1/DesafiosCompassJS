const numero = 2
let divisores = 0

if (typeof(numero) !== 'number'){
    console.log('Valor invalido detectado');
    return
}

for (let i = 1; i <= numero; i++) {
    if (numero % i == 0) {
        divisores++
    }
}

console.log((divisores == 2));
