import {getInternationalizedLabelName} from './language.js';

var listOfGithubRepositories = document.querySelector("#listOfGithubRepositories");
var searchInput = document.querySelector("#searchInput");

//listItems vai englobar os itens que vou receber no servidor, 
//por isso eh uma lista de objetos
var listItems = getListItemsFromSessionStorage();

function getListItemsFromSessionStorage()
{
    var listItemsEmString = sessionStorage.getItem("listItems");
    if(listItemsEmString != null)
    {
        return JSON.parse(listItemsEmString);
    }
    else
    {
        var defaultList = [];
        /*
        isso aqui eh apenas para dar um exemplo de como ficaria
        var defaultList = [
            {
                full_name:'Javascript',
                created_at: '2020-07-25T20:10:50Z',
                forks:1530
            },
            {
                full_name:'Javascript 2',
                created_at: '2020-07-25T20:10:50Z',
                forks:1530
            },
            {
                full_name:'Javascript 3',
                created_at: '2020-07-25T20:10:50Z',
                forks:1530
            },
        ];*/

        return defaultList;
    }
}

function setListItemsAndRender(newValue)
{
    listItems = newValue;
    //vou armazenar a lista de items para uma futura sessao. Soh vai desaparecer se o usuario fechar a pag
    //soh que como listItems eh um objeto complexo, tenho de stringify primeiro!
    var listItemsEmString = JSON.stringify(listItems);
    sessionStorage.setItem("listItems",listItemsEmString);
    render();
}

function render()
{
    var languageTagSelect = document.querySelector("#languageTagSelect");
    var languageTag = languageTagSelect.value;
    
    var numberFormatter = new Intl.NumberFormat(languageTag);
    var dateFormatter = new Intl.DateTimeFormat(languageTag,
        {week:'long',year:'numeric',month:'long',day:'numeric'});
    var nameLabel = getInternationalizedLabelName("Name");
    var createdAtLabel = getInternationalizedLabelName("Created at");
    var html = '';
    for(var item of listItems)
    {
        var internationalizedForks = numberFormatter.format(item.forks);
        var dateCreatedAt = new Date(item.created_at);//item.created_at eh string
        var internationalizedCreatedAt = dateFormatter.format(dateCreatedAt);
        html = html +
        `<li>
        <div>
            <b>${nameLabel}:</b> ${item.full_name}
        </div>
        <div>
            <b>${createdAtLabel}:</b> ${internationalizedCreatedAt}
        </div>
        <div>
            <b>Forks:</b> ${internationalizedForks}
        </div>
    </li>`;
    }
    listOfGithubRepositories.innerHTML = html;
}

//funcao que vai ser chamada ao clicar no botao pesquisar
async function search()
{
    var searchQuery = searchInput.value;
    var response = await fetch('https://api.github.com/search/repositories?q=' + searchQuery); //vou acessar uma api do github para pegar repositorios com o nome passado
                    //visto que fetch retorna uma Promise e o retorno da Promise vai ser jogado em response, eu devo colocar await
    var myData = await response.json(); //converto para json o resultado. Tive de usar await pq response.json tb eh uma operacao assincrona
    var responseItemsArray = myData.items; //obtenho um array com os dados
    setListItemsAndRender(responseItemsArray);
}

var buttonSearch = document.querySelector("#searchButton");
buttonSearch.addEventListener("click",search);

render();//porque eu devo executar isso logo de inicio? Eh mais porque caso tenha um listItems da sessionStorage, eu ja iria display ele

export{render};//vai ser usado por language.js


