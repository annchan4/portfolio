function mostrarAlert()
{
    alert('este é um alert');
}

function mostrarConfirm()
{
    var booleanoRetorno = confirm("deseja prosseguir?");
    if(booleanoRetorno == true)
    {
        alert('prossiga vendo esse site');
    }
}

function mostrarPrompt()
{
    var oQueFoiDigitado = prompt("digite seu nome");
    alert("oi," + oQueFoiDigitado);
}

var myWindow;
var siteParaAbrir = document.querySelector("#siteParaAbrir");

function abrirSiteEmPopup()
{
    var linkSite = siteParaAbrir.value;
    if(linkSite.includes("https://") == false)
    {
        linkSite = "https://" + linkSite;
    }

    if(myWindow != undefined && !myWindow.closed)
    {
        myWindow.location.href = linkSite;
    }
    else
    {
        console.log("mywindow is undefined");
        //abriremos nova janelinha
        myWindow = window.open(linkSite, "_blank",
        "top=200,left=200,width=500,height=500");
        //_blank -> abre em nova janela(popup)
       
    }
}





