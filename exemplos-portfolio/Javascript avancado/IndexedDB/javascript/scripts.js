var db; //onde vamos armazenar a instancia do banco

//abaixo temos um objeto onde vou armazenar todas as funcoes das operacoes que vamos fazer com o BD
var DB = {
    start()
    {
        return new Promise(resolve =>
            {
                //variavel request vai armazenar a requisicao que faremos ao banco
                var request = indexedDB.open('Login',1); //parametros: nomeDoBanco,numero da versao do BD (se eu mudasse a estrutura do bd, iria alterar para um num maior)
                //quando a requisicao tiver um sucesso, vai executar o onsucess
                request.onsuccess = (event) => {
                    db = request.result;
                    resolve(this); //finalizar a promise
                }

                //quando alteramos algo no banco, eh preciso avisar ao banco que ele precisa atualizar algo, e para isso usamos request.onupgradeneeded
                request.onupgradeneeded = (event) => {
                    db = event.target.result;
                    //criaremos uma store, que eh onde o nosso dado vai ser armazenado dentro do banco
                    db.createObjectStore('Users',{keyPath: 'username'}); //store precisam de um identificador, informado no keypath. Vai ser usado quando queremos buscar um item
                }
            })
    },
    find(username)
    {
        //metodo para buscar um dado no banco
        return new Promise(resolve => {
            var objectStore = getObjectStore();
            var request = objectStore.get(username);
            request.onsuccess = () =>
            {
                resolve(request.result); //o resultado da busca vai estar dentro do atributo result 
            }
        });
    },
    findAll()
    {
        //retorna todos os dados do banco
        return new Promise(resolve => {
            var objectStore = getObjectStore();
            var request = objectStore.getAll();
            request.onsuccess = () =>
            {
                resolve(request.result); //o resultado da busca vai estar dentro do atributo result 
            }
        });
    },
    insert(item)
    {
        return new Promise(resolve => {
            var objectStore = getObjectStore();
            var request = objectStore.add(item);
            request.onsuccess = () =>
            {
                resolve(item); //terminei a promise
            }
        });
    },
    update(item)
    {
        //obs: o identificador do objectStore, no exemplo, username, nao pode ser modificado! Se fizer isso, um novo item vai ser adiconado no BD
        return new Promise(resolve => {
            var objectStore = getObjectStore();
            var request = objectStore.put(item);
            request.onsuccess = () =>
            {
                resolve(item);
            }
        });
    },
    remove(username)
    {
        return new Promise(resolve => {
            var objectStore = getObjectStore();
            var request = objectStore.delete(username);
            request.onsuccess = () =>
            {
                resolve(username); //na verdade, nao precisava retornar nada
            }
        });
    }
}

//funcao necessaria para obter o objectStore, que eh necessario para fazer find(),findall() e tudo que queriamos fazer com o BD
function getObjectStore()
{
    return db.transaction(['Users'],'readwrite').objectStore('Users'); //parametros de transaction: (i) o nome do objectstore(criado em start()),(ii) que tipo de operacao queremos fazer
}

function inserirNoBDEImprimirNoConsoleLog(usuario,senha)
{
    var novoItem = {
        username:usuario,
        password:senha
    };
    DB.insert(novoItem).then(result => console.log(result));
}
function inserirUsuario()
{
    var usuario_inserir = document.querySelector("#usuario_inserir");
    var usuario = usuario_inserir.value;
    var senha_inserir = document.querySelector("#senha_inserir");
    var senha = senha_inserir.value;
    inserirNoBDEImprimirNoConsoleLog(usuario,senha);
}

function buscarUmItemNoBD()
{
    var usuario_buscar = document.querySelector("#usuario_buscar");
    var usuario_buscar_value = usuario_buscar.value;
    DB.find(usuario_buscar_value).then(result =>
        {
            var innerHTMLDoDiv = "<ul>";
            if(result == undefined)
            {
                innerHTMLDoDiv = innerHTMLDoDiv + "<li style=margin:0>Não existe uma entrada no banco com esse usuário</li>";
            }
            else
            {
                var usuario = result.username;
                var senha = result.password;
                innerHTMLDoDiv = innerHTMLDoDiv + "<li style=margin:0>" + "usuário:" + usuario + "; senha:" + senha + "</li>";
            }

            innerHTMLDoDiv = innerHTMLDoDiv + "</ul>";
            var itemAchado = document.querySelector("#itemAchado");
            itemAchado.innerHTML = innerHTMLDoDiv;
        });
}

function atualizarUmItemNoBD()
{
    var usuario_atualizar = document.querySelector("#usuario_atualizar").value;
    var itemAchado = undefined; 
    DB.find(usuario_atualizar).then(result =>
    {
           itemAchado = result;

            if(itemAchado == undefined)
            {
                innerHTMLDoDiv = innerHTMLDoDiv + "<li style=margin:0>Não existe esse usuário no BD</li></ul>";
                var itemAtualizado = document.querySelector("#itemAtualizado");
                itemAtualizado.innerHTML = innerHTMLDoDiv;
            }
            else
            {
                var senha_atualizar = document.querySelector("#senha_atualizar").value;
                if(senha_atualizar != "")
                {
                    itemAchado.password = senha_atualizar;
                }

                DB.update(itemAchado).then(result =>
                {
                    //isso aqui eh opcional, mas eu queria fazer um find logo depois de update, para mostrar na tela o resultado
                    DB.find(usuario_atualizar).then(result =>
                    {
                        var innerHTMLDoDiv = "<ul>";
                        if(result == undefined)
                        {
                            innerHTMLDoDiv = innerHTMLDoDiv + "<li style=margin:0>Não existe uma entrada no banco com esse usuário</li>";
                        }
                        else
                        {
                            var usuario = result.username;
                            var senha = result.password;
                            innerHTMLDoDiv = innerHTMLDoDiv + "<li style=margin:0>" + "usuário:" + usuario + "; senha:" + senha + "</li>";
                        }
            
                        innerHTMLDoDiv = innerHTMLDoDiv + "</ul>";
                        var itemAtualizado = document.querySelector("#itemAtualizado");
                        itemAtualizado.innerHTML = innerHTMLDoDiv;
                    });
                });
            }
    });
    var innerHTMLDoDiv = "<ul>";
}

function removerUmItemDoBD()
{
    var usuario_remover = document.querySelector("#usuario_remover");
    var usuario_remover_value = usuario_remover.value;
    DB.remove(usuario_remover_value).then(result =>
        {
            var innerHTMLDoDiv = "<ul>";
            if(result == undefined)
            {
                innerHTMLDoDiv = innerHTMLDoDiv + "<li style=margin:0>Não existe uma entrada no banco com esse usuário</li>";
            }
            else
            {
                var usuario = result;
                innerHTMLDoDiv = innerHTMLDoDiv + "usuário " + usuario + " removido com sucesso</li>";
            }

            innerHTMLDoDiv = innerHTMLDoDiv + "</ul>";
            var itemRemovido = document.querySelector("#itemRemovido");
            itemRemovido.innerHTML = innerHTMLDoDiv;
        });
}

function pegarTodosOsItensDoBD()
{
    DB.findAll().then(result =>
        {
            var arrayComItens = result;
            var innerHTMLDoDiv = "<ul>";
            for(var i = 0; i < arrayComItens.length; i++)
            {
                var umItem = arrayComItens[i];
                var usuario = umItem.username;
                var senha = umItem.password;
                innerHTMLDoDiv = innerHTMLDoDiv + "<li style=margin:0>" + "usuário:" + usuario + "; senha:" + senha + "</li>";
            }

            innerHTMLDoDiv = innerHTMLDoDiv + "</ul>";
            var listaDeTodosOsItensDoBD = document.querySelector("#listaDeTodosOsItensDoBD");
            listaDeTodosOsItensDoBD.innerHTML = innerHTMLDoDiv;
        });
}



DB.start();


