
function calculo(a,b,n)
{
    var resposta = "";
    for (var i = 0; i < n; i++)
    {
        var somaDosDoisElevadoAAlgo = 0;
        for (var j = 0; j <= i; j++)
        {
            somaDosDoisElevadoAAlgo = somaDosDoisElevadoAAlgo + (2**j) * b;
        }

       
        var maisUm = a + somaDosDoisElevadoAAlgo;
        resposta = resposta + maisUm + " ";
    }

    return resposta;
}

var linha="5 3 5";
var [a, b, c] = linha.trim().split(' ');
var a = parseInt(a);
var b = parseInt(b);
var c = parseInt(c);
console.log("a=" + a + ";b=" + b + ";c=" + c + ";");
console.log(calculo(a,b,c));



