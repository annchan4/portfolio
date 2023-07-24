function adicionarTextoAtravesDePrompt()
{
    var textoDoPrompt = prompt("Escreva um texto");
    if(textoDoPrompt != "")
    {
        console.log(textoDoPrompt);
       var textInput =  document.querySelector("#textInput");
       textInput.value = textoDoPrompt;
    }
}

function obterFocoTextInput()
{
    var textInput =  document.querySelector("#textInput");
    textInput.focus();
}
function obterFocoTextInput2()
{
    var textInput =  document.querySelector("#textInput2");
    textInput.focus();
}

function desabilitarOuReabilitar()
{
    var textInput =  document.querySelector("#textInput");
    textInput.disabled = !textInput.disabled;   
}

function mudarValorCheckbox()
{
    var myCheckbox = document.querySelector("#myCheckbox");
    myCheckbox.checked = !myCheckbox.checked;
}

function marcarProximoRadio()
{
    var radio1 = document.querySelector("#radio1");
    var radio2 = document.querySelector("#radio2");
    var radio3 = document.querySelector("#radio3");
    if(radio1.checked == true)
    {
        radio2.checked = true;
        radio1.checked = false;
        radio3.checked = false;
    }
    else if(radio2.checked == true)
    {
        radio3.checked = true;
        radio2.checked = false;
        radio1.checked = false;
    }
    else
    {
        radio1.checked = true;
        radio2.checked = false;
        radio3.checked = false;
    }
}

function marcarOpcaoDoSelect()
{
    var mySelect = document.querySelector("#mySelect");
    var inputOpcaoDoSelect = document.querySelector("#inputOpcaoDoSelect");
    var numSelecionado = inputOpcaoDoSelect.value;
    if(numSelecionado == "0" || numSelecionado == "1" || numSelecionado == "2")
    {
        var numSelecionadoNum = Number(numSelecionadoNum);
        mySelect.selectedIndex = numSelecionado;
    }
}



