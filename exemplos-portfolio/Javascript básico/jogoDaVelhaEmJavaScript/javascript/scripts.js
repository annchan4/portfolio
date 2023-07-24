function realizarUmTurno(event)
{
    var clickedTd = event.target;
    if(clickedTd.textContent == "")
    {
        //pegar jogador atual
        var labelJogadorAtual = document.querySelector("#labelJogadorAtual");
        var labelJogadorAtualArray = labelJogadorAtual.textContent.split(" ");
        var jogadorAtual = labelJogadorAtualArray[labelJogadorAtualArray.length - 1];

        clickedTd.textContent = jogadorAtual;

        //mudar jogador atual
        if(jogadorAtual == "X")
        {
            jogadorAtual = "O";
        }
        else
        {
            jogadorAtual = "X";
        }
        labelJogadorAtual.textContent =
                labelJogadorAtualArray[0] + " " + labelJogadorAtualArray[1] + " " + jogadorAtual;
        
        verificarSeAlguemGanhou();
    }
    else
    {
        alert("escolha uma posição vazia, por favor");
    }
}

function reiniciarJogo()
{
    var celulas = document.querySelectorAll("td");
    for(var i = 0; i < celulas.length; i++)
    {
        celulas[i].textContent = "";
    } 

    definirAleatoriamenteJogadorInicial();
}

function definirAleatoriamenteJogadorInicial()
{
    var numAleatorio = Math.trunc((Math.random() * 10) + 1); //um num de 1 a 10 inteiro
    var jogadorInicial = "";
    if(numAleatorio % 2 == 0)
    {
        jogadorInicial = "X";
    }
    else
    {
        jogadorInicial = "O";
    }

    //pegar jogador atual e mudar
    var labelJogadorAtual = document.querySelector("#labelJogadorAtual");
    var labelJogadorAtualArray = labelJogadorAtual.textContent.split(" ");
    labelJogadorAtual.textContent =
                labelJogadorAtualArray[0] + " " + labelJogadorAtualArray[1] +
                 " " + jogadorInicial;
}

function verificarSeAlguemGanhou()
{
    var matriz3Por3 = [["","",""],["","",""],["","",""]]; //vou ter cada item preenchido com X ou O ou ""
    var celulas = document.querySelectorAll("td");
    for(var i = 0; i < 3; i++)
    {
        for(var j = 0; j < 3; j++)
        {
            if(celulas[(i*3)+j].textContent != "")
            {
                matriz3Por3[i][j] = celulas[(i*3)+j].textContent;
            }
        }
    }

    var alguemGanhou = verificarSeAlguemGanhouNasLinhas(matriz3Por3);
    if(alguemGanhou != "")
    {
        alert(alguemGanhou + " ganhou!");
        reiniciarJogo();
    }
    alguemGanhou = verificarSeAlguemGanhouNasColunas(matriz3Por3);
    if(alguemGanhou != "")
    {
        alert(alguemGanhou + " ganhou!");
        reiniciarJogo();
    }
    alguemGanhou = verificarSeAlguemGanhouNasDiagonais(matriz3Por3);
    if(alguemGanhou != "")
    {
        alert(alguemGanhou + " ganhou!");
        reiniciarJogo();
    }
}

function verificarSeAlguemGanhouNasLinhas(matriz3Por3)
{
    var respostaEncontradaNestaLinha = ""; //se X vencer, era p ser XXX
    for(var i = 0; i < 3; i++)
    {
        respostaEncontradaNestaLinha = "";
        for(var j = 0; j < 3; j++)
        {
            respostaEncontradaNestaLinha = respostaEncontradaNestaLinha + matriz3Por3[i][j];
        }
        if(respostaEncontradaNestaLinha == "XXX")
        {
            return "X";
        }
        else if(respostaEncontradaNestaLinha == "OOO")
        {
            return "O";
        }
    }
    return ""; //caso contrario, ninguem ganhou
}
function verificarSeAlguemGanhouNasColunas(matriz3Por3)
{
    var respostaEncontradaNestaLinha = ""; //se X vencer, era p ser XXX
    for(var i = 0; i < 3; i++)
    {
        respostaEncontradaNestaLinha = "";
        for(var j = 0; j < 3; j++)
        {
            respostaEncontradaNestaLinha = respostaEncontradaNestaLinha + matriz3Por3[j][i];
        }
        if(respostaEncontradaNestaLinha == "XXX")
        {
            return "X";
        }
        else if(respostaEncontradaNestaLinha == "OOO")
        {
            return "O";
        }
    }
    return ""; //caso contrario, ninguem ganhou
}
function verificarSeAlguemGanhouNasDiagonais(matriz3Por3)
{
    if(matriz3Por3[0][0] == matriz3Por3[1][1] && matriz3Por3[1][1] == matriz3Por3[2][2])
    {
        return matriz3Por3[0][0];
    }
    else if(matriz3Por3[0][2] == matriz3Por3[1][1] && matriz3Por3[1][1] == matriz3Por3[2][0])
    {
        return matriz3Por3[0][2];
    }
    return ""; //caso contrario, ninguem ganhou
}

definirAleatoriamenteJogadorInicial();

var celulas = document.querySelectorAll("td");
for(var i = 0; i < celulas.length; i++)
{
    celulas[i].addEventListener("click",realizarUmTurno);
}

var botaoReiniciar = document.querySelector("#botaoReiniciar");
botaoReiniciar.addEventListener("click",reiniciarJogo);