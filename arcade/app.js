
// first "state" = moving head with 1-2 tails and a random fruit on board
// states after this depends on number of fruit eaten and then how many tails
//
//ctx stands for 'context', used in pairing with canvas to mean whatever


//the board
const canvas=document.getElementById('gameboard'); 
const ctx=canvas.getContext('2d')

class snakePart{
    constructor(x, y){
        this.x=x;
        this.y=y; //create new object and set value for existing objects, aka making sure the tail parts are in the right place
    }
}

// constants
let speed = 7;
let score = 0;


let appleX = 5;
let appleY = 5;

const snakeTail=[];
let tailLength = 2;

//refresh
function clearScreen(){
    ctx.fillStyle='black'
    ctx.fillRect(0,0,canvas.clientWidth, canvas.clientHeight)
}

//the snake
let tileCount=20;
let tileSize=18;
let headX=10;
let headY=10;

function drawSnake(){
    ctx.fillStyle="green";
  ctx.fillRect(headX*tileCount,headY*tileCount, tileSize,tileSize);

  for (let i=0; i<snakeTail.length; i++){
    let part = snakeTail[i]
    ctx.fillRect(part.x*tileCount, part.y*tileCount, tileSize, tileSize)
  }
  snakeTail.push(new snakePart(headX, headY));
    if(snakeTail.length>tailLength){
        snakeTail.shift();
 }
}

//snake direction w/arrow keys
let xvelocity=0;
let yvelocity=0;

document.body.addEventListener('keydown', keyDown);

function changePosition(){
    headX=headX + xvelocity;
    headY=headY + yvelocity;
}

 function keyDown(event)
 //up
 {
     if(event.keyCode==38){
         if(yvelocity==1) //keycode corresponds to the arrow keys, whenver pressed it will change direction of snake
         return;
         yvelocity=-1;
         xvelocity=0;
 
     }
     //down
     if(event.keyCode==40){
         if(yvelocity==-1)
         return;
         yvelocity=1;
         xvelocity=0;
     }
 
     //left
     if(event.keyCode==37){
         if(xvelocity==1)
         return;
         yvelocity=0;
         xvelocity=-1;
     }
    console.log(event.keyCode)
     //right 
     if(event.keyCode==39){console.log('hello')
         if(xvelocity==-1)
         return;
         yvelocity=0;
         xvelocity=1;
     }
 }
 

//food 
function apple(){
    ctx.fillStyle = "red";
    ctx.fillRect(appleX*tileCount, appleY*tileCount, tileSize, tileSize)
}


//when snake head collides with apple
function keepScore(){ //score stuff
    ctx.fillStyle="white"
    ctx.font="20px verdena"
    ctx.fillText("Score: " +score, canvas.clientWidth-100,15);
}

function headCollision(){
    if(appleX==headX && appleY==headY){ //if apple and head of snake is same location, add to tail and add to score
        appleX=Math.floor(Math.random()*tileCount); 
        appleY=Math.floor(Math.random()*tileCount);

        tailLength++;
        score++;
    }
}

//game over function if hits wall
function gameOver(){
    let checkgameOver=false;
    if(yvelocity===0 && xvelocity===0){
        return false;
    }
    if(headX<0){ //game over if snake hits left wall
        checkgameOver=true;
    }
    else if(headX===tileCount){ //game over if snake hits right wall
        checkgameOver=true;
    }
    else if(headY<0){// game over if snake hits top wall
        checkgameOver=true;
    }
    else if (headY===tileCount){ //game over if snake hits bottom wall
        checkgameOver=true;
    }

    //game over function if hits itself
    for(let i=0; i<snakeTail.length; i++){
    let part = snakeTail[i]
    if(part.x === headX && part.y === headY){ // if any part of the snake is occupying same space, if so then game over
        checkgameOver = true;
        break; //break out of for loop
    }
    }

    if(checkgameOver){
        ctx.fillStyle = "white";
        ctx. font = "20px verdana";
        ctx.fillText ("Game Over! Your score was:" + score, canvas.clientWidth/7.5, canvas.clientHeight/2); //position of game over text
    }
    return checkgameOver;
    }

// reset the game
function restart(){
    document.location.reload(false);
}


///////////////////////////////////////////////////////////////////////
//function where the whole game is called
function drawGame(){
    clearScreen();
   drawSnake();
   changePosition();

   let result = gameOver();
   if(result){
    return;
   }

   apple();
   headCollision();
   keepScore();
   setTimeout(drawGame, 1000/speed);
}

drawGame();