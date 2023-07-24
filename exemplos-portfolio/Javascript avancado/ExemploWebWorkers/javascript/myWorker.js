var i = 0;
function incrementarContadorEAlterarTextoContador()
{
    i = i + 1;
    postMessage(i);//vai trigger o evento que defini no .onmessage do worker que defini em scripts.js
}

(function incrementarContadorACada1Seg()
{
    setInterval(incrementarContadorEAlterarTextoContador,1000);
})();//funcao autoexecutavel