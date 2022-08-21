const todasCartas = [
    "/imagens/naruto.jpg", "/imagens/naruto.jpg",
    "/imagens/sasuke.jpg", "/imagens/sasuke.jpg",
    "/imagens/sakura.jpg", "/imagens/sakura.jpg",
    "/imagens/kakashi.jpg", "/imagens/kakashi.jpg",
    "/imagens/jiraya.jpg", "/imagens/jiraya.jpg",
    "/imagens/guy.jpg", "/imagens/guy.jpg",
    "/imagens/tsunade.jpg", "/imagens/tsunade.jpg"
]
let carta1;
let carta2;
let jogadas;
let numeroDeParesTotal;
let numeroDeParesAtuais;
let painel = document.querySelector('.transparente');
let contador;
let id;

criarCartas();
//função para perguntar o número de cartas, embaralhar e gerar as cartas
function criarCartas() {
    let qtdCartas = Number(prompt('Selecione a quantidade de cartas (escolha um número entre 4 e 14)'));

    if (qtdCartas < 4 || qtdCartas > 14) {
        do {
            alert("Você escolheu uma quantidade inválida, digite um número entre 4 e 14");
            qtdCartas = Number(prompt('Selecione a quantidade de cartas (escolha um número entre 4 e 14)'));
        } while (qtdCartas < 4 || qtdCartas > 14)
    }

    if (qtdCartas % 2 !== 0) {
        do {
            alert('Digite um número par');
            qtdCartas = Number(prompt('Selecione a quantidade de cartas (escolha um número entre 4 e 14)'));
        } while (qtdCartas % 2 != 0)
    }
    carta1 = null;
    carta2 = null;
    contador = 0;
    jogadas = 0;
    numeroDeParesAtuais = 0;
    id = null;
    numeroDeParesTotal = qtdCartas / 2;

    const cartasSelecionadas = [];

    for (let i = 0; i < qtdCartas; i++) {
        cartasSelecionadas[i] = todasCartas[i];
    }

    cartasSelecionadas.sort(comparador);
    const listaCartas = document.querySelector('ul');
    listaCartas.innerHTML = '';

    for (let i = 0; i < qtdCartas; i++) {
        let item = `
        <li class="carta" onclick="viraCarta(this)">
            <img src="/imagens/front 1.png" alt="figura de um papagaio" class="imagem-frente">
            <img src=${cartasSelecionadas[i]} alt="figura anime" class="imagem-tras oculta">
        </li>
        `;
        listaCartas.innerHTML = listaCartas.innerHTML + item;
    }
}


//função para virar as cartas
function viraCarta(cartaSelecionada) {
    const imagemFrente = cartaSelecionada.querySelector('.imagem-frente');
    const imagemTras = cartaSelecionada.querySelector('.imagem-tras');

    cartaSelecionada.classList.add('carta-virada');
    imagemFrente.classList.add('oculta');
    imagemTras.classList.remove('oculta');
    imagemTras.classList.add('visivel');

    jogadas++;

    if (jogadas === 1) {
        id = setInterval(adicionaTempo, 100)
    }

    if (carta1 === null && carta2 === null) {
        carta1 = cartaSelecionada;
    } else {
        carta2 = cartaSelecionada;
        painel.classList.remove('oculta');
        setTimeout(verificaCartas, 1000)
    }
}


function adicionaTempo() {
    contador = contador + 0.1;
    let segundos = document.querySelector(".contador");
    segundos.innerHTML = contador.toFixed(2);

}

function verificaCartas() {
    if (carta1.innerHTML === carta2.innerHTML) {
        carta1.classList.remove('carta-virada')
        carta2.classList.remove('carta-virada');
        carta1.classList.add('carta-selecionada')
        carta2.classList.add('carta-selecionada');
        carta1.removeAttribute("onclick")
        carta2.removeAttribute("onclick")

        numeroDeParesAtuais++;
        carta1 = null;
        carta2 = null;

        painel.classList.add('oculta');

        if (numeroDeParesAtuais === numeroDeParesTotal) {
            clearInterval(id);
            const segundos = document.querySelector('.contador');
            segundos.innerHTML = 0;
            alert(`Você ganhou em ${contador.toFixed(2)} segundos e com ${jogadas} jogadas`)
            const reiniciaPartida = prompt("Deseja reiniciar a partida? (sim / não)");
            if (reiniciaPartida === 'sim') {
                criarCartas();
            } else {
                alert("Fim da partida");
            }
        }
    } else {
        desviraCarta();
    }
}

//funcação para desvirar as cartas selecionadas
function desviraCarta() {
    const elementoSelecionado = document.querySelectorAll('.carta-virada');
    const imagemFrente = document.querySelectorAll('.carta-virada .oculta');
    const imagemTras = document.querySelectorAll('.carta-virada .visivel')

    elementoSelecionado[0].classList.remove('carta-virada');
    elementoSelecionado[1].classList.remove('carta-virada');

    imagemFrente[0].classList.remove('oculta');
    imagemFrente[1].classList.remove('oculta');

    imagemTras[0].classList.add('oculta');
    imagemTras[1].classList.add('oculta');

    imagemTras[0].classList.remove('visivel');
    imagemTras[1].classList.remove('visivel');

    carta1 = null;
    carta2 = null;

    painel.classList.add('oculta');
}


//função de comparação para embaralhar as cartas
function comparador() {
    return Math.random() - 0.5;
}


