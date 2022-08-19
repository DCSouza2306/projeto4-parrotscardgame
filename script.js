function selecionaCarta(cartaSelecionada){
    let elementoSelecionado = document.querySelector('.escondido')

    if(elementoSelecionado !== null){
        elementoSelecionado.classList.remove('escondido')
    }


    const imagemEscondida = document.querySelector('.carta img')
    imagemEscondida.classList.add('escondido');
}