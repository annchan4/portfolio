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

    perguntarAlgoApos2Segundos(algoAPerguntar)
    {
        setTimeout(this.perguntarAlgo,2000,algoAPerguntar);
    }
    perguntarAlgo(algoAPerguntar)
    {
        console.log(algoAPerguntar);
    }

    geraPromiseSeIntroduzirEm2segsEAoTerminarPerguntarNome(introducao)
    {
        var myPromise = new Promise((resolve,reject)=>
        {
            this.introduzirApos2Segundos(introducao,resolve);
        });

        return myPromise; //vou retornar uma promise
    }

    async seIntroduzirEm2segsEAoTerminarPerguntarNome(introducao)
    {
        var result = await this.geraPromiseSeIntroduzirEm2segsEAoTerminarPerguntarNome(introducao);
        //o await vai fazer meu metodo esperar ateh que o resolve seja gerado. Quando for, vou continuar a execucao do metodo
        //meu result vai ser o que eu coloquei dentro do resolve()
        this.perguntarAlgoApos2Segundos.bind(this)(result);
    }
}

var comeco = new ComecoDeConversa("Annie");
comeco.seIntroduzirEm2segsEAoTerminarPerguntarNome("Oi, sou");
