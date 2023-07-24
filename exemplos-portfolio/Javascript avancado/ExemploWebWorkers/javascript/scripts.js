var valorContador = document.querySelector("#valorContador");
var contador = 0;
var valorContadorWebWorker = document.querySelector("#valorContadorWebWorker");

var webWorker1;

function incrementarContadorEAlterarTextoContador()
{
    contador = contador + 1;
    valorContador.innerText = contador;
}
function incrementarContadorACada1Seg()
{
    setInterval(incrementarContadorEAlterarTextoContador,1000);
}

function incrementarContadorWebWorkerEAlterarTextoContador()
{
    contadorWebWorker = contadorWebWorker + 1;
    valorContadorWebWorker.innerText = contadorWebWorker;
}
function incrementarContadorWebWorkerACada1Seg()
{
    webWorker1 = new Worker('javascript/myWorker.js'); //esse endereco tem de ser partindo da root! do index.html
    webWorker1.onmessage = function(event){
        //funcao eh executada quando o web worker faz postMessage(algo);
        var i = event.data;
        valorContadorWebWorker.innerText = i;
    }
}

function terminarWebWorker()
{
    webWorker1.terminate();
}