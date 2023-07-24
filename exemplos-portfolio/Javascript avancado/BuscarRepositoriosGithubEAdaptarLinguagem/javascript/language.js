import {render} from './scripts.js';

//tudo sobre internacionalizacao da pag estah nesse javascript

var languageTagSelect = document.querySelector("#languageTagSelect");
var languageTag; 
//ja vou inicializar essa variavel. Aproveitando, vou carregar algum valor armazenado em localStorage, se existir 
getLanguageTagFromLocalStorageAndRender();

languageTagSelect.addEventListener('change',changeCurrentLanguageTag);

function getLanguageTagFromLocalStorageAndRender()
{
    var lang = localStorage.getItem("lang");
    if(lang != null)
    {
        languageTag = lang;
        languageTagSelect.value = languageTag;
    }
    else
    {
        languageTag = languageTagSelect.value;
    }
}

function changeCurrentLanguageTag()
{
    var newLanguageTag = languageTagSelect.value;
    languageTag = newLanguageTag;
    //vou armazenar essa lingua para futuros acessos ao site no localstorage
    localStorage.setItem("lang",languageTag);
    console.log("changeCurrentLanguageTag para " + newLanguageTag);
    render();
}

function getInternationalizedLabelName(label)
{
    if(languageTag == "pt-BR")
    {
        if(label == 'Name')
        {
            return 'Nome';
        }
        else if(label == 'Created at')
        {
            return 'Criado em';
        }
    }
    else if(languageTag == "ja")
    {
        if(label == 'Name')
        {
            return '名前';
        }
        else if(label == 'Created at')
        {
            return '作成';
        }
    }
    else
    {
        if(label == 'Name')
        {
            return 'Name';
        }
        else if(label == 'Created at')
        {
            return 'Created at';
        }
    }
}

export{getInternationalizedLabelName}; //vai ser usado por scripts.js