function handleFileSelect()
{
    var myFileInput = document.querySelector("#myFileInput");
    var files = myFileInput.files; //retorna um objeto, cujo elemento na posicao 0 eh o meu arquivo
    var firstFile = files[0];
    var reader = new FileReader(); //vai ler meu arquivo

    reader.onload = function()
    {
        var content = reader.result; //retorna uma string com todo o texto do arquivo
        var fileContent = document.querySelector("#fileContent");
        fileContent.value = content;
    }

    reader.readAsText(firstFile); //le arquivo como texto
}

function saveNewTextFileFromTextArea()
{
    var fileContent = document.querySelector("#fileContent");
    var fileContentText = fileContent.value;
    var fileEncodedToUri = encodeURIComponent(fileContentText);//precisa encodar para URI antes de salvar arquivo
    var element = document.createElement('a'); //necessario ter um link na pagina para salvar arquivos
    element.setAttribute('href','data:plain/text;charset=utf-8,' + fileEncodedToUri);
    //plain/text eh pq eu quero que o arquivo seja de texto
    //charset=utf-8 eh a codificacao
    element.setAttribute('download','meuArquivo.txt'); //posso estabelecer um nome padrao para o arquivo, mas eh opcional
    element.click(); //clica no link. Basicamente ativa o <a> que criamos

}