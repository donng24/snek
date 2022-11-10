
// first "state" = moving head with 1-2 tails and a random fruit on board
// states after this depends on number of fruit eaten and then how many tails
//
//ctx stands for 'context', used in pairing with canvas to mean whatever
//constants
// const up = {x: 0, y: -1}
// const down = {x: 0, y: 1 }
// const left = {x: 1, y: 0 }
// const right = {x: -1, y: 0 }

//the board
const canvas=document.getElementById('gameboard'); 
const ctx=canvas.getContext('2d')

function drawGame(){
    clearScreen();
}
function clearScreen(){
    ctx.fillStyle='black'
    ctx.fillRect(0,0,canvas.clientWidth, canvas.clientHeight)
}

//drawGame();

//refresh
function drawGame(){
    let speed = 7;
    setTimeout(drawGame, 1000/speed);
}

//the snake
let tileCount=20;
let tileSize=18;
let headX=10;
let headY=10;

function drawSnake(){
    ctx.fillStyle="green";
  ctx.fillRect(headX* tileCount,headY* tileCount, tileSize,tileSize)

}

//
let xvelocity=0;
let yvelocity=0;

function changePosition(){
    headX=headX + xvelocity;
    headY=headY + yvelocity;
}


 //snake direction w/ arrow keys
 document.body.addEventListener('downArrow', keyDown);

 function keyDown(event)

 //up
 {
     if(event.keyCode==38){
         yvelocity=-1; //move one tile up
         xvelocity=0;
 
     }
     //down
     if(event.keyCode==40){
         yvelocity=1;//move one tile down
         xvelocity=0;
     }
 
 //left
     if(event.keyCode==37){
         yvelocity=0;
         xvelocity=-1;//move one tile left
     }
     //right
     if(event.keyCode==39){
         yvelocity=0;
         xvelocity=1;//move one tile right
     }
 }

//  function keyDown(event)
//  //up
//  {
//      if(event.keyCode==38){
 
//          if(yvelocity==1)
//          return; //prevent snake from moving in opposite direction
//          yvelocity=-1;
//          xvelocity=0;
 
//      }
//      //down
//      if(event.keyCode==40){
//          if(yvelocity==-1)
//          return;//prevent snake from moving in opposite direction
//          yvelocity=1;
//          xvelocity=0;
//      }
 
//  //left
//      if(event.keyCode==37){
//          if(xvelocity==1)
//          return;//prevent snake from moving in opposite direction
//          yvelocity=0;
//          xvelocity=-1;
//      }
//      //right
//      if(event.keyCode==48){
//          if(xvelocity==-1)
//          return;//prevent snake from moving in opposite direcction
//          yvelocity=0;
//          xvelocity=1;
//      }
//  }

 function changeSnakePosition(){
    headX=headX + xvelocity;
    headY=headY+ yvelocity;

}


//food 
let appleX = 5;
let appleY = 5;

function apple(){
    ctx.fillStyle = "red";
    ctx.fillRect(100, 100, 18, 18)
}


//when snake head collides with apple
const snakeTail=[];
let tailLength = 2;

function headCollision(){
    if(appleX==headX && appleY==headY){
        appleX=Math.floor(math.random()*tileCount);
        appleY=Math.floor(Math.random()*tileCount);
        tailLength++;
    }
}

class snakePart{
    constructor(x, y){
        this.x=x;
        this.y=y;
    }
}

function drawSnake(){
    ctx.fillStyle="green";
    for (let i=0; i<snakeTail.length; i++){
        let part = snakeTail[i]
        ctx.fillRect(part.x*tileCount, part.y*tileCount, tileSize, tileSize)

    }
    snakeTail.push(new snakePart(headX, headY));
}







function drawGame(){
    clearScreen();
   drawSnake();
   changePosition();
   apple();
   headCollision();
}
 
drawGame();


//states
// let state = {
//     fruit: [6, 9],
//     snake: snake
// }

// //snake
// let snake = {
//     body: 
//     nextDirection [1, 0]
// }

// // define my states and variables

// // fruit- make random appearance on board and disappear when "eaten"

// // snake- how long and what direction to start off

// // homepage- start button and score, goes up everytime head eats fruit