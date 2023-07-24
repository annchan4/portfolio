function salvarFormulario()
{
    var nome = document.querySelector("#nome");
    var textoNome = nome.value;
    if(textoNome.indexOf(";") == -1)
    {
        //colocar ; poderia comprometer o arquivo de texto salvo
        var dia = document.querySelector("#dia");
        var textoDia = dia.value;
        var receberNotificacoes = document.querySelector("#receberNotificacoes");
        var estadoReceberNotificacoes = receberNotificacoes.checked;
        var estadoReceberNotificacoesString = estadoReceberNotificacoes.toString();
        var textoDoMeuArquivoExterno = "nome=" + textoNome + ";" +
                                        "dia=" + textoDia + ";" +
                                        "receberNotificacoes=" + estadoReceberNotificacoesString;
        var textoEndoded = encodeURIComponent(textoDoMeuArquivoExterno);
        var a = document.createElement("a");
        a.setAttribute("href",'data:plain/text;charset=utf-8,' + textoEndoded);
        a.setAttribute("download","formulario.txt");
        a.click();
    }
    else
    {
        alert("insira um nome sem ;");
    }
}

//a entrada eh uma funcao, que vai ser executada dentro da minha funcao
function carregarFormulario()
{
    var input = document.createElement("input");
    input.setAttribute("type","file");
    input.onchange = function()
    {
        var reader = new FileReader();
        reader.onload = function()
        {
            var content = reader.result; //retorna uma string com todo o texto do arquivo
            if(content.indexOf(";") != -1)
            {
                var stringDividida = content.split(";");
                if(stringDividida.length == 3)
                {
                    var nome_value = stringDividida[0].split("=")[1];
                    var dia_value = stringDividida[1].split("=")[1];
                    var receberNotificacoes_value = stringDividida[2].split("=")[1];
                    var nome = document.querySelector("#nome");
                    nome.value = nome_value;
                    var dia = document.querySelector("#dia");
                    dia.value = dia_value;
                    var receberNotificacoes = document.querySelector("#receberNotificacoes");
                    if(receberNotificacoes_value == "true")
                    {
                        receberNotificacoes.checked = true;
                    }
                    else
                    {
                        receberNotificacoes.checked = false;
                    }
                }
            }

        }
        var arquivoSelecionado = input.files[0]; 
        reader.readAsText(arquivoSelecionado);
    }
    input.click();
}



//MINHAS TENTATIVAS ANTIGAS
function readForm()
{
    var form = document.querySelector("#myForm");
    console.log()
    var nome = document.querySelector("#nome");
    var text = nome.value;
    var dia = document.querySelector("#dia");
    var select = dia.value;
    var receberNotificacoes = document.querySelector("#receberNotificacoes");
    var checkbox = receberNotificacoes.checked;
    return {text,select,checkbox}; //objeto com esses 3 valores
}

function writeForm(obj)
{
    var form = document.querySelector("#myForm");
    console.log(form);
    var nome = document.querySelector("#nome");
    nome.value = obj.text; //text, select e checkbox, mesmos nomes do retorno da funcao readForm
    var dia = document.querySelector("#dia");
    dia.value = obj.select;
    var receberNotificacoes = document.querySelector("#receberNotificacoes");
    receberNotificacoes.checked = obj.checkbox;
}

//o parametro vai ser meu objeto {text,select,checkbox}, mas em formato string
function writeFile(content)
{
    var element = document.createElement("a");
    var contentEncodedToUri = encodeURIComponent(content);//precisa encodar para URI antes de salvar arquivo


    element.setAttribute('href','data:plain/text;charset=utf-8,' + contentEncodedToUri);
    element.setAttribute("download","meuForm.txt");
    element.click();
}

//callback eh uma funcao que eu vou executar dentro dessa minha funcao
function readFile(callback)
{
    //nao temos um input do tipo file mas vamos criar
    var element = document.createElement("input");
    element.setAttribute('type','file');
    element.onchange = function()
    {
        var reader = new FileReader();
        reader.onload = function()
        {
            var content = reader.result; //retorna uma string com todo o texto do arquivo
            callback(content);
        }
        var arquivoSelecionado = element.files[0]; 
        reader.readAsText(arquivoSelecionado);
    }
    element.click();
}

function save()
{
    var objetoRetornado = readForm(); //aquele obj com os 3:{text,select,checkbox}; //objeto com esses 3 valores
    var objetoRetornadoEmString = JSON.stringify(objetoRetornado);
    writeFile(objetoRetornadoEmString);
}

function load()
{
    readFile(function(content){
        var objetoSemSerString = JSON.parse(content); //transforma em objeto novamente, sem ser string
        writeForm(objetoSemSerString);
    });
}




