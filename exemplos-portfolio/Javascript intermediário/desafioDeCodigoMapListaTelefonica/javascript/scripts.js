var linhasComBarraN = 
"3\nuncle sam\n99912222\ntom\n11122222\nharry\n12299933\n3\nuncle sam\nuncle tom\nharry";
var linhas = linhasComBarraN.split("\n");

let i = 0;
var n = parseInt(linhas[i++]);
var lista = new Map();

var quantosContatosAdicionados = 0;
var novaChave = "none";
var novoValor = 0;
while(quantosContatosAdicionados < n)
{
    if(novaChave == "none")
    {
        novaChave = linhas[i];
    }
    else if(novoValor == 0)
    {
        novoValor = linhas[i];
    }

    if(novaChave != "none" && novoValor != 0)
    {
        lista.set(novaChave,novoValor);
        quantosContatosAdicionados = quantosContatosAdicionados + 1;
        novaChave = "none";
        novoValor = 0;
        
    }
    i = i + 1;
}

var quantosContatosFaltaChecar = parseInt(linhas[i]);
while(quantosContatosFaltaChecar > 0)
{
    i = i + 1;
    var contatoChecar = linhas[i];
    if(lista.has(contatoChecar) == true)
    {
        console.log(contatoChecar + "=" + lista.get(contatoChecar));
    }
    else
    {
        console.log("Não encontrado");
    }
    quantosContatosFaltaChecar = quantosContatosFaltaChecar - 1;
}
