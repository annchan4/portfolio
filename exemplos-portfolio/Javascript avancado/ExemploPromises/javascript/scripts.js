class ComecoDeConversa
{
    constructor(name)
    {
        this.name = name;
    }

    introduzirApos2Segundos(introducao,resolve)
    {
        setTimeout(this.introduzir.bind(this),2000,introducao,resolve);
    }
    introduzir(introducao,resolve)
    {
        console.log(introducao + " " + this.name);
        var numAleatorio1A3 = Math.trunc((Math.random() * 3) + 1);
        if(numAleatorio1A3 == 1)
        {
            resolve("Qual o seu nome?");
        }
        else if(numAleatorio1A3 == 2)
        {
            resolve("O que gosta de fazer?");
        }
        else
        {
            resolve("Trabalha ou estuda?");
        }
    }

    perguntarAlgoApos2Segundos(algoAPerguntar,resolve)
    {
        setTimeout(this.perguntarAlgo,2000,algoAPerguntar,resolve);
    }
    perguntarAlgo(algoAPerguntar,resolve)
    {
        console.log(algoAPerguntar);

        if(algoAPerguntar == "Qual o seu nome?")
        {
            resolve("Gostei do seu nome");
        }
        else if(algoAPerguntar == "O que gosta de fazer?")
        {
            resolve("Eu gosto de ver desenhos animados");
        }
        else
        {
            resolve("Eu trabalho e estudo");
        }
    }

    darRespostaApos2Segundos(resposta)
    {
        setTimeout(this.darResposta,2000, resposta);
    }
    darResposta(resposta)
    {
        console.log(resposta);
    }

    seIntroduzirEm2segsEAoTerminarPerguntarNome(introducao)
    {
        var myPromise = new Promise((resolve,reject)=>
        {
            this.introduzirApos2Segundos(introducao,resolve);
        });

        myPromise.then(algo => 
            {
                var myPromise2 = new Promise((resolve,reject)=>
                {
                    this.perguntarAlgoApos2Segundos.bind(this)(algo,resolve);
                });
                return myPromise2;
            }
        ).then(resposta=>
            {
                this.darRespostaApos2Segundos.bind(this)(resposta);
            }
        );
    }
}

var comeco = new ComecoDeConversa("Annie");
comeco.seIntroduzirEm2segsEAoTerminarPerguntarNome("Oi, sou");
