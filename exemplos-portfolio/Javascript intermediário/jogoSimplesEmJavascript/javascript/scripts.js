class Field
{
    constructor(cols,rows,tableID)
    {
        this.cols = cols;
        this.rows = rows;
        this.container = document.querySelector(tableID);
        this.field; //will initialize it on createField function

        this.createField();
    }

    //creates the matrix with @ or "" to be displayed
    createField()
    {
        var field = []; //in the end, this will be a matrix
        for(var i = 0; i < this.rows; i++)
        {
            field[i] = []; //new line of my matrix
            for(var j = 0; j < this.cols; j++)
            {
                var obstacleOrEmpty = this.createObstacleOrEmpty();
                field[i].push(obstacleOrEmpty);
            }
        }
        this.field = field;
    }

    createObstacleOrEmpty()
    {
        var zeroToFourNumber = Math.trunc((Math.random() * 4) + 0);
        if(zeroToFourNumber == 1)
        {
            return "@";
        }
        else
        {
            return "";
        }
    }

    //draws the matrix on table
    drawfield()
    {
        this.container.innerHTML = ""; //if table had any previous children, remove them (avoids redrawing table)
        for(var i = 0; i < this.rows; i++)
        {
            var newRow = document.createElement('tr');
            for(var j = 0; j < this.cols; j++)
            {
                var newCell = document.createElement('td');
                newCell.textContent = this.field[i][j]; 
                newRow.appendChild(newCell);
            }

            this.container.appendChild(newRow);
        }
    }
}

//generic character class, which movies around the field. 
class Character
{
    constructor(field,initX,initY,face)
    {
        this.charactersField = field;
        this.x = initX;
        this.y = initY;
        this.face = face;
        
        var setPositionCouldBeExecuted = this.setPosition(this.x,this.y);
        if(setPositionCouldBeExecuted == false)
        {
            throw new Error("erro ocorreu ao inicializar " + this.face + " na linha " + this.x + " e coluna " + this.y + ", por isso reiniciamos a arena");
        }
    }

    //returns true if position could be set,false if it cannot(useful to detect errors)
    setPosition(x,y)
    {
        //remember: field is a matrix of lines and on each line there's an array of cols
        if(this.charactersField.field[y][x] == '')
        {
            //there's no obstacle here
            //erase current position
            var currentX = this.x;
            var currentY = this.y;
            this.charactersField.field[currentY][currentX] = "";

            //set new position
            this.x = x;
            this.y = y;
            this.charactersField.field[this.y][this.x] = this.face;

            //draws on table that is on page
            this.charactersField.drawfield();
            return true;
        }
        else
        {
            //there's an obstacle here, so setposition cannot be executed
            return false;
        }
    }

    up()
    {
        if(this.y > 0)
        {
            this.setPosition(this.x, this.y - 1);
        }
    }
    down()
    {
        if(this.y+1 < this.charactersField.rows)
        {
            this.setPosition(this.x, this.y + 1);
        }
    }
    left()
    {
        if(this.x > 0)
        {
            this.setPosition(this.x - 1, this.y);
        }
    }
    right()
    {
        if(this.x + 1 < this.charactersField.cols)
        {
            this.setPosition(this.x + 1, this.y);
        }
    }
}

//creates an extension of character class, which gives character a behavior
class Player extends Character
{
    constructor(field)
    {
        super(field,0,0,"0.0"); //my player is a character which always start at specific position and has specific face
    }
}

class NPC extends Character
{
    constructor(field)
    {
        var x = Math.trunc((Math.random()*field.cols) + 0) //num de 0 ate num de colunas
        var y = Math.trunc((Math.random() * field.rows) + 0);
        super(field,x,y,"-_-");
        setInterval(this.walk.bind(this),800); //from 5 to5 secs, the npc will move
        //i had to use the .bind(this) because inside setInterval the this. would be another scope
    }

    walk()
    {
        var direction = Math.trunc((Math.random() * 4)+1); //num aleatorio de 1-4
        if(direction == 1)
        {
            //top
            super.up();
        }
        else if(direction == 2)
        {
            //down
            super.down();
        }
        else if(direction == 2)
        {
            //left
            super.left();
        }
        else
        {
            //right
            super.right();
        }
    }
}

var player; //will start player right here so user can move it on console
function startEverything()
{
    var arenaStarterForm = document.querySelector("#arenaStarterForm");
    arenaStarterForm.style.display = "block"; //reativar o menu de criar arena, caso ela tenha desaparecido em um dos loops
    var arenaSizeRows = document.querySelector("#arenaSizeRows");
    var arenaSizeCols = document.querySelector("#arenaSizeCols");
    var rowsInNumber = parseInt(arenaSizeRows.value);
    var colsInNumber = parseInt(arenaSizeCols.value);

    if(rowsInNumber <= 1 && colsInNumber <= 1)
    {
        alert("informe uma arena que tenha pelo menos 2 espaços");
    }
    else
    {
        //vou esconder os campos para iniciar arena
        arenaStarterForm.style.display = "none";

        var newField = new Field(rowsInNumber,colsInNumber,'#myTable');
        try
        {
            player = new Player(newField);
            var npc = new NPC(newField);
        }
        catch(error)
        {
            //could not setPosition of a character, so we'll log something on the screen and try again
            var erroSetPositionCharacter = document.querySelector("#erroSetPositionCharacter");
            var erroSetPositionCharacter_p = document.createElement("p");
            erroSetPositionCharacter_p.style.color = "red";
            erroSetPositionCharacter_p.textContent = error.message;
            erroSetPositionCharacter.appendChild(erroSetPositionCharacter_p);

            startEverything();
        }
    }
}

//adicionando suporte ao teclado...
function movePlayer(event)
{
    if(event.keyCode == 37) //seta esquerda teclado
    {
        player.left();
    }
    else if(event.keyCode == 38) //seta cima do teclado
    {
        player.up();
    }
    else if(event.keyCode == 39) //seta direita do teclado
    {
        player.right();
    }
    else if(event.keyCode == 40) //seta baixo do teclado
    {
        player.down();
    }
}
window.addEventListener("keyup",movePlayer);





