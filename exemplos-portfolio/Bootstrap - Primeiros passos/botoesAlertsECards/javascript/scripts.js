function inserirAlerta()
{
    var areaDosAlertas = document.querySelector("#areaDosAlerts");
    var alertaNovo = document.createElement("div");
    alertaNovo.textContent = "Esse é o meu alerta";
    alertaNovo.classList.add('alert');
    alertaNovo.classList.add('alert-primary');
    alertaNovo.innerHTML = '<i class="bi bi-exclamation-circle-fill me-3 fs-4"></i>' + alertaNovo.innerHTML;
    
    areaDosAlertas.appendChild(alertaNovo);
}

function adaptarAreaDosCardsDeAcordoComTelaDoUsuario()
{
    var widthMinhaTela = Math.max(window. innerWidth);
    if(widthMinhaTela < 770)
    {
        //telas de celular
        var meuCards = document.getElementsByClassName("meuCard");
        for(var meuCard of meuCards)
        {
            meuCard.classList.remove("w-25");
            meuCard.classList.add("w-75");

            meuCard.classList.remove("ms-5");
            meuCard.classList.add("ms-3");
            
        } 
    }
}

adaptarAreaDosCardsDeAcordoComTelaDoUsuario();


