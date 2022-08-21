const todasCartas = [
    "/imagens/naruto.jpg", "/imagens/naruto.jpg",
    "/imagens/sasuke.jpg", "/imagens/sasuke.jpg",
    "/imagens/sakura.jpg", "/imagens/sakura.jpg",
    "/imagens/kakashi.jpg", "/imagens/kakashi.jpg",
    "/imagens/jiraya.jpg", "/imagens/jiraya.jpg",
    "/imagens/guy.jpg", "/imagens/guy.jpg",
    "/imagens/tsunade.jpg", "/imagens/tsunade.jpg"
]
let carta1 = null;
let carta2 = null;
let jogadas = 0;
let numeroDeParesTotal = 0;
let numeroDeParesAtuais = 0;
let painel = document.querySelector('.transparente')

criarCartas();
//função para virar as cartas
function viraCarta(cartaSelecionada) {
    const imagemFrente = cartaSelecionada.querySelector('.imagem-frente');
    const imagemTras = cartaSelecionada.querySelector('.imagem-tras');

    cartaSelecionada.classList.add('carta-virada');
    imagemFrente.classList.add('oculta');
    imagemTras.classList.remove('oculta');
    imagemTras.classList.add('visivel');

    jogadas++;
    console.log(numeroDeParesTotal)

    if (carta1 === null && carta2 === null) {
        carta1 = cartaSelecionada;
    } else {
        carta2 = cartaSelecionada;
        painel.classList.remove('oculta');
        setTimeout(verificaCartas, 1000)
    }

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

        console.log(jogadas)
        console.log(numeroDeParesAtuais);

        if(numeroDeParesAtuais === numeroDeParesTotal){
            alert(`Você ganhou em ${jogadas} jogadas`)
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

    console.log(elementoSelecionado[0]);

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


//função para perguntar o número de cartas, embaralhar e gerar as cartas
function criarCartas() {
    let qtdCartas = Number(prompt('Selecione a quantidade de cartas (escolha um número entre 4 e 14)'));

    if (qtdCartas < 4 || qtdCartas > 14){
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

    numeroDeParesTotal = qtdCartas/2;
    // preciso criar um outro array pra inserir a quantidade de imagens igual a quantidade de cartas escolhida

    const cartasSelecionadas = [];

    for (let i = 0; i < qtdCartas; i++) {
        cartasSelecionadas[i] = todasCartas[i];
    }

    cartasSelecionadas.sort(comparador);

    console.log(cartasSelecionadas);
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
