
var monkey , monkey_running
var banana ,bananaImage, bananaGroup, obstacle, obstacleImage, obstaclesGroup
var FoodGroup
var score
var ground
var score = 0;

var PLAY = 1;
var END = 2;
var gameState = PLAY;


function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
  
 
}



function setup() {
  createCanvas(400, 260)
  
  monkey=createSprite(100 ,200, 20, 20)
  monkey.addAnimation("moving", monkey_running);
  monkey.scale = 0.15;
  
  ground = createSprite(0, 250, 1000, 20);
  
  ground.velocityX = -5;
  
  obstaclesGroup = new Group();
  
  bananaGroup = new Group()
  
}


function draw() {
  background("white")
  
  text("Score: " + score, 300, 20);

  
  if(ground.x < 0){
    
    ground.x = ground.width/2;
    
    
  }
  
  if(gameState === PLAY){
    
    spawnObstacles()
    bananaSpawn()
    score = score + Math.round(getFrameRate()/60);
    
  }
  
  if(obstaclesGroup.isTouching(monkey)){
    
    console.log("hi")
    gameState = END;
    
  }
  
  if(gameState === END){
    
    //obstaclesGroup.destroyEach()
    ground.velocityX = 0;
    obstaclesGroup.setVelocityXEach(0);
    obstaclesGroup.setLifetimeEach(-1);
    bananaGroup.setVelocityXEach(0)
    bananaGroup.setLifetimeEach(-1);
    
   }
  
  
  if(keyDown("space")){
    monkey.velocityY = -10;
  }
  
  monkey.velocityY = monkey.velocityY + 0.3
  
  monkey.collide(ground);
  
    monkey.setCollider("circle",0,20, 250);
  monkey.debug = true;
  
  drawSprites()
}
function spawnObstacles(){
 if (frameCount % 80 == 0){
   var obstacle = createSprite(300,200,10,40);
   obstacle.velocityX = -5;
   
    obstacle.addImage(obstacleImage);
   
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.2;
    obstacle.lifetime = 300;
   
   //add each obstacle to the group
    obstaclesGroup.add(obstacle);
 }
}

function bananaSpawn(){
if (frameCount % 80 == 0){
  
  var randy = (Math.round(random(10, 120)));
  var banana = createSprite(300, randy, 10, 10)
  banana.velocityX = -5;
  
  
  banana.addImage(bananaImage);
  
  banana.scale = 0.1;
  banana.lifetime = 300;
  
  bananaGroup.add(banana);
  
}
}






