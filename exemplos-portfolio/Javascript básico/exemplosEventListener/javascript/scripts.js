function fazerBordaVermelha()
{
    var umInputText = document.querySelector("#myInput");

    umInputText.setAttribute("style",""); 
    umInputText.style.outline= "none"; //se eu mantiver o outline, minha borda mal vai aparecer
    umInputText.style.border = "2px solid red";
}
function fazerBordaVoltarAoNormal()
{
    var myInput = document.querySelector("#myInput");
    myInput.style.border = "1px solid black";
}

var myInput = document.querySelector("#myInput");
myInput.addEventListener("mouseenter",fazerBordaVermelha);
myInput.addEventListener("mouseleave",fazerBordaVoltarAoNormal);

function minhaFuncao(event)
{
    event.preventDefault();
    var clickButton = document.querySelector("#clickButton");
    clickButton.textContent = "Esse texto mudou!";
}

document.querySelector("button").addEventListener("contextmenu",minhaFuncao);

function mudarBackgroundDeTextfield(event)
{
    var myInput = document.querySelector("#myInput");
    if(event.keyCode == 13)
    {
        //usuario apertou a tecla enter
        if(myInput.value == "")
        {
            myInput.style.backgroundColor = "red";
        }
        else
        {
            myInput.style.backgroundColor = "green";
        }

    }
}

var myInput = document.querySelector("#myInput");
myInput.addEventListener("keyup",mudarBackgroundDeTextfield); //qd soltar tecla, algo vai acontecer

function escreverAlgoApos3Segs()
{
    var textoFicaAtualizandoACada3Segs = document.querySelector("#textoFicaAtualizandoACada3Segs");
    var texto = textoFicaAtualizandoACada3Segs.textContent;
    var segundos = Number(texto.split(":")[1]);
    segundos = segundos + 3;
    textoFicaAtualizandoACada3Segs.textContent = texto.split(":")[0] + ":" + segundos;
}

var myInterval = setInterval(escreverAlgoApos3Segs,3000);

//debouncing
var myTimeout; //vou usar essa variavel na funcao abaixo
function escreverTextoDoInputNoDiv()
{
    clearTimeout(myTimeout); //enquanto eu continuar a digitar algo, o texto nunca vai aparecer acima
    var inputFazTextoAparecerAcima = document.querySelector("#inputFazTextoAparecerAcima");
    var texto = inputFazTextoAparecerAcima.value;
    setTimeout(continuarAEscreverTextoDoInputNoDiv,2000,texto); 
    //espera 2 segundos...se o timeout ainda existir, vai realizar a funcao
}

function continuarAEscreverTextoDoInputNoDiv(texto)
{
    var areaTextoDoInput = document.querySelector("#areaTextoDoInput");
    areaTextoDoInput.textContent = texto; 
}

var inputFazTextoAparecerAcima = document.querySelector("#inputFazTextoAparecerAcima");
inputFazTextoAparecerAcima.addEventListener("keydown",escreverTextoDoInputNoDiv);//ao apertar tecla