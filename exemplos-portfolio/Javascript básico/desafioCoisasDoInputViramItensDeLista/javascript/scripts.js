function adicionarItemNaLista(event)
{
    var inputIncluirCoisasNaLista = document.querySelector("#inputIncluirCoisasNaLista");
    var textoNovoItem = inputIncluirCoisasNaLista.value;
    if(textoNovoItem != "" && event.keyCode == 13)
    {
        //usuario apertou enter e o textfield nao estava vazio
        var listaDeItens = document.querySelector("#listaDeItens");
        var novoItem = document.createElement("li");
        novoItem.textContent = textoNovoItem;
        listaDeItens.appendChild(novoItem);
        novoItem.addEventListener("click",removerItemDaLista);
        inputIncluirCoisasNaLista.value = "";   
    }
    else if(event.keyCode == 13)
    {
        alert("campo nao pode estar vazio!");
    }
}

function removerItemDaLista(event)
{
    event.target.remove();
}

var inputIncluirCoisasNaLista = document.querySelector("#inputIncluirCoisasNaLista");
inputIncluirCoisasNaLista.addEventListener("keyup",adicionarItemNaLista);

var itensDaLista = document.querySelectorAll("#listaDeItens li");
for(var i = 0; i < itensDaLista.length; i++)
{
    itensDaLista[i].addEventListener("click",removerItemDaLista);
}