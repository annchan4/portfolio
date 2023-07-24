function auxiliarOrdenar(a,b)
{
    if(a > b)
    {
        return 1;
    }
    else
    {
        return -1;
    }
}

//retorna elementos de um array que nao tem no outro
function diferencaSimetrica(m,n)
{
    var resultado = [];
    m = m.sort(auxiliarOrdenar);
    n = n.sort(auxiliarOrdenar);

    for(var i = 0; i < m.length; i++)
    {
        if(n.includes(m[i]) == false)
        {
            resultado.push(m[i]);
        }
    }
    for(var j = 0; j < n.length; j++)
    {
        if(m.includes(n[j]) == false)
        {
            resultado.push(n[j]);
        }
    }

    resultado = resultado.sort(auxiliarOrdenar);
    return resultado;
}

var M = [2,4,5,9];
var N = [2,4,11,12];
console.log(diferencaSimetrica(M,N));


