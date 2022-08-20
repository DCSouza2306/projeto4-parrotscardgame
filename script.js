const todasCartas = [
    "/imagens/naruto.jpg", "/imagens/naruto.jpg",
    "/imagens/sasuke.jpg", "/imagens/sasuke.jpg",
    "/imagens/sakura.jpg", "/imagens/sakura.jpg",
    "/imagens/kakashi.jpg", "/imagens/kakashi.jpg",
    "/imagens/jiraya.jpg", "/imagens/jiraya.jpg",
    "/imagens/guy.jpg", "/imagens/guy.jpg",
    "/imagens/tsunade.jpg", "/imagens/tsunade.jpg"
]

criarCartas();

function selecionaCarta(cartaSelecionada) {
    const imagemFrente = cartaSelecionada.querySelector('.imagem-frente');
    const imagemTras = cartaSelecionada.querySelector('.imagem-tras');

    cartaSelecionada.classList.add('carta-virada');
    imagemFrente.classList.add('oculta');
    imagemTras.classList.remove('oculta');

    setTimeout(desviraCarta, 5000)
}

function desviraCarta() {
    const elementoSelecionado = document.querySelector('.carta-virada');


    const imagemFrente = elementoSelecionado.querySelector('.imagem-frente');
    const imagemTras = elementoSelecionado.querySelector('.imagem-tras');



    imagemFrente.classList.remove('oculta');
    imagemTras.classList.add('oculta');
    elementoSelecionado.classList.remove('carta-virada');
}

function comparador(){
    return Math.random() - 0.5;
}

function criarCartas() {
    const qtdCartas = Number(prompt('Selecione a quantidade de cartas (escolha um número entre 4 e 14)'));

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
        <li class="carta" onclick="selecionaCarta(this)">
            <img src="/imagens/front 1.png" alt="figura de um papagaio" class="imagem-frente">
            <img src=${cartasSelecionadas[i]} alt="figura anime" class="imagem-tras oculta">
        </li>
        `;
        listaCartas.innerHTML = listaCartas.innerHTML + item;
    }
}