const readline = require("readline")

function jogar() {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    })

    rl.question("Escolha: pedra, papel ou tesoura? ", (input) => {
        const opcoes = ["pedra", "papel", "tesoura"];
        if (!opcoes.includes(input)) {
            console.log("Valor invalido. Escolha entre pedra, papel ou tesoura.")
            rl.close()
            return
        }

        const escolhaCpu = opcoes[Math.floor(Math.random() * 3)]
        console.log(`Escolha da CPU: ${escolhaCpu}`)

        switch (input) {
            case escolhaCpu:
                avisar("empatou")
                break;
            case opcoes[0]:
                escolhaCpu == opcoes[1] ? avisar("perdeu") : avisar("ganhou")
                break;
            case opcoes[1]:
                escolhaCpu == opcoes[2] ? avisar("perdeu") : avisar("ganhou")
                break;
            case opcoes[2]:
                escolhaCpu == opcoes[0] ? avisar("perdeu") : avisar("ganhou")
                break;
            default:
                console.log("Input inválido");
        }

        rl.close();
    });

    function avisar(texto) {
        console.log("Você " + texto + "!")
    }
}

jogar()
