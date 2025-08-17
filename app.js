//let titulo = document.querySelector('h1');
//titulo.innerHTML = 'Jogo do número secreto';

//let paragrafo = document.querySelector('p');
//paragrafo.innerHTML = 'Escolha um número entre 1 e 10';
let numeroLimite = 10;
let numerosSorteados = [];
let numeroSecreto = geradorNumeroSecreto();
let tentativas = 1;

function exibirTextoNaTela(tag, texto){
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
    if ('speechSynthesis' in window){
         let utterance = new SpeechSynthesisUtterance(texto);
         utterance.lang = 'pt-BR';
         utterance.rate = 1.2;
         window.speechSynthesis.speak(utterance);
    }else {
        console.log('Web Speach API não suportada neste navegador.');
    }
}

function exibirMensagemInicial() {
    exibirTextoNaTela('h1', 'Jogo do número secreto' );
    exibirTextoNaTela('p', 'Escolha um número entre 1 e 50');
}

exibirMensagemInicial()

function verificarChute(){
    let chute = document.querySelector('input').value;
    if (chute == numeroSecreto){
        exibirTextoNaTela('h1', 'Parabéns!');
        let palavraTentativa = tentativas > 1 ? 'tentativas' : 'tentativa';
        let menssagemTentativa = `Você acertou o número secreto com ${tentativas} ${palavraTentativa}!`;
        exibirTextoNaTela('p', menssagemTentativa);
        document.getElementById('reiniciar').removeAttribute('disabled');
    }else{
        if (chute > numeroSecreto){
            exibirTextoNaTela('p', 'O número secreto é menor que o chute!');
        }else{
            exibirTextoNaTela('p','O número secreto é maior que o chute!');
        }
        tentativas++;
        limparCampo();
    }
    
}

function geradorNumeroSecreto() {
    let numeroSecretoGerado = parseInt(Math.random() * numeroLimite + 1);
    let quantidadeNumerosSorteados = numerosSorteados.length;

    if (quantidadeNumerosSorteados == numeroLimite){
        numerosSorteados = [];
    }

    if (numerosSorteados.includes(numeroSecretoGerado)){
        return geradorNumeroSecreto();
    }else{
        numerosSorteados.push(numeroSecretoGerado);
        console.log(numerosSorteados)
        return numeroSecretoGerado;
        
    }

    
}


function limparCampo() {
    chute = document.querySelector('input');
    chute.value  =  '';
}

function reiniciarJogo() {
    numeroSecreto = geradorNumeroSecreto();
    limparCampo();
    tentativas = 1;
    exibirMensagemInicial();
    document.getElementById('reiniciar').setAttribute('disabled',true);
}