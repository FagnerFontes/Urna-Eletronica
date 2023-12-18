let seuVotoPara = document.querySelector('.d-1-1 span')//Exibe o título "seu voto para
let cargo = document.querySelector('.d-1-2 span')//Exibe o cargo em que o voto sendo dado (Vereador, Prefeito, etc)
let descricao = document.querySelector('.d-1-4')//Exibe informações sobre o candidado ou aviso de voto nulo 
let aviso = document.querySelector('.d-2')//Exibe mensagens de aviso durante o processo de votação 
let lateral = document.querySelector('.d-1-right')//Exibe as imagens dos candidatos 
let numeros = document.querySelector('.d-1-3')//Exibe os números para para o usuário digitar


//Variáveis de controle
let etapaAtual = 0; //Controla a etapa atual da votação 
let numero = ""; //Armazena os números digitados pelo usuário
let votoBranco =false;//Indica se o voto é em branco
let votos = []; //Armazena os votos confirmados durante a votação 


//Função para iniciar uma nova etapa da votação 
function comecarEtapa(){
    let etapa = etapas[etapaAtual];//Obtém a etapa atual a partir do array "etapas" usando a variável "etapaAtual" como índice e armazena na variável  "etapa"
    let numeroHtml = "" //Inicia a variável "numeroHtml" como uma string vazia. Essa variável será usada para gerar elementos HTML  para os números que o usuário deve digitar. 
    numero="";
    votoBranco=false;

    for(let i=0 ;  i<etapa.numeros; i++ ){//Inicia um loop que percorre a quantidade de números definidos para a etapa atual. 
        if(i === 0){//Adiciona elementos HTML para os números no formato de `div`. Se `i` for igual a 0, adiciona uma classe `pisca` para destacar o primeiro número. 
            numeroHtml += '<div class="numero pisca"></div>'
        }else{
        numeroHtml += '<div class="numero"></div>';
        }
    }

    //Atualiza a interface escondendo o elemento "seu votoPara", definindo o título do cargo, limpando a descrição, escondendo o aviso, limpando a lateral e atualizando a seção de números com o HTML gerado. 
    seuVotoPara.style.display = "none";
    cargo.innerHTML = etapa.titulo; 
    descricao.innerHTML="";
    aviso.style.display = "none"; 
    lateral.innerHTML = ""; 
    numeros.innerHTML= numeroHtml


}

function atualizaInterface(){//AtualizaInterface
    let etapa = etapas[etapaAtual];//Obtém a etapa etual a partir do array "etapas" usando a variável "etapaAtual" como índice e armazena na variável "etapa". 

    let candidato = etapa.candidatos.filter((item)=>{//Filtra os candidatos da etapa etual,buscando aquele número corresponde ao número digitado pelo usuário 
        if(item.numero === numero){
            return true
        }else{
            return false
        }
    });

    //console.log("Candidato", candidato);
    if(candidato.length > 0){//Filtra os candidatos da etapa atual, buscando aquele cujo número corresponde ao número digitado pelo número. 
        candidato = candidato[0] //Se houver candidato(s), seleciona o primeiro candidato 
        seuVotoPara.style.display = 'block'; 
        aviso.style.display = 'block'; 
        descricao.innerHTML = `Nome: ${candidato.name}<br/>Partido:${candidato.partido} `
         let fotosHtml = ""; 
         
        for(let i in candidato.fotos){
            fotosHtml += `<div class="d-1-image"> <img src="./img/${candidato.fotos[i].url}" alt=""> ${candidato.fotos[i].legenda}</div>`;
        }
        lateral.innerHTML = fotosHtml;
    }else{
        seuVotoPara.style.display="block"
        aviso.style.display="block"
        descricao.innerHTML='<div class="aviso--grande pisca">VOTO NULO</div>';

    }
}



function clicou(n){
    let elNumero = document.querySelector(".numero.pisca")
    if(numero !== null){
        elNumero.innerHTML = n;
        numero = `${numero}${n}`
        elNumero.classList.remove("pisca")
        if( elNumero.nextElementSibling !== null){
        elNumero.nextElementSibling.classList.add('pisca')
            }else{
                atualizaInterface();
            }

        // console.log(elNumero.nextElementSibling);

    }
}

function BRANCO(){
    numero = '';
    votoBranco = true;
    seuVotoPara.style.display = 'block'; 
    aviso.style.display = 'block'; 
    numeros.innerHTML=''
    descricao.innerHTML=descricao.innerHTML='<div class="aviso--grande pisca">VOTO EM BRANCO</div>';
    lateral.innerHTML=''
}

function CORRIGE(){
    comecarEtapa();
}

function CONFIRMA() {

    let etapa = etapas[etapaAtual];

    let votoConfirmado=false; 

    if(votoBranco === true){
        votoConfirmado = true
        votos.push({
            etapa: etapas[etapaAtual].titulo, 
            voto: 'branco'
        })
    }else if(numero.length === etapa.numeros){
        votoConfirmado=true;
        votos.push({
            etapa: etapas[etapaAtual].titulo, 
            voto: numero
        })
    }

    if (votoConfirmado) {
        etapaAtual++; 
        if(etapas[etapaAtual] !== undefined){
            comecarEtapa()
        }else{
            document.querySelector(".tela").innerHTML = '<div class="aviso--gigante pisca">FIM</div>';
            console.log(votos);
        }
    }
}

comecarEtapa();