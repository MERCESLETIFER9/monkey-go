 var count = 0;

 var PLAY = 1;
 var END = 0;
 var gameState=PLAY;

 var monkey , monkey_running;
 var bananaImage , obstacleImage;
 var FoodGroup , obstacleGroup;
 var ground;

 var score = 0;

function preload(){
  
  
monkey_running =           loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png"  ,"sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
  backImage = loadImage("jungle.jpg");
 
}



function setup() {
  createCanvas(500,500);
  
  monkey = createSprite(150,417);
  monkey.addAnimation("moving",monkey_running);
  monkey.scale = 0.1;
  
  ground = createSprite(400,450,900,10);
  ground.velocityX = -4;
  ground.x = ground.width/2;
  ground.velocityX = -(6 + 3*score/100);

  
  bananaGroup = new Group();
  obstacleGroup = new Group();
  
  score = 0;

}


function draw() {
  background(255);
  
  monkey.debug = false;

  stroke("black"); 
  textSize(20);
  fill("black");
  text("Score :" + score,380,50);
  
  if(gameState === PLAY){
    
    bananaGroup.x = obstacleGroup.x;
    
    
    if(ground.x<450){
       ground.x = 400;
    }
    
    if(keyDown("space") && monkey.y >=412){
    monkey.velocityY = -12; 
    }
    
    if(monkey.isTouching(obstacleGroup) && count>=1){
      gameState = END;
    }else{
      count++;
    }
    
    monkey.velocityY = monkey.velocityY + 0.4;
    
    
    
    if(monkey.isTouching(bananaGroup)){
      bananaGroup.destroyEach();
      score = score + 10;
    }

    
    increseScore();
    spawnFood();
    spawnObstacle();
    
  }else if(gameState === END){
    ground.velocityX = 0;
    monkey.velocityY = 0;
    
    stroke("black"); 
    textSize(20);
    fill("black");
    text("Game Over !",200,240);
    
    bananaGroup.setVelocityXEach(0);
    obstacleGroup.setVelocityXEach(0);
    
    obstacleGroup.setLifetimeEach(-1);
    bananaGroup.setLifetimeEach(-1);
    
    if(keyDown("r")){
      reset();
    }
  }
  
  
  monkey.collide(ground); 
  
  drawSprites();
}

function spawnFood() {
  if(frameCount%80 === 0){
    var banana = createSprite(290,350,10,10);
    banana.addImage(bananaImage);
    banana.velocityX = -2;
    banana.scale = 0.2/3;
    banana.lifetime = -10;
    
    bananaGroup.add(banana);
  }
}

function spawnObstacle(){
  if(frameCount%80 === 0){
    var obstacle = createSprite(290,430,10,10);
    obstacle.addImage(obstacleImage);
    obstacle.x = Math.round(random(260,480))
    obstacle.velocityX = -3;
    obstacle.scale = 0.1;
    obstacle.lifetime = -10;
    obstacle.debug = true;
    
    obstacleGroup.add(obstacle);
  }
}

function increseScore(){
  switch(score){
    case 100:monkey.scale = 0.1; 
    break;
    case 200:monkey.scale= 0.2;
    break;
    case 300 :monkey.scale = 0.3;
    break;
    default: break;
  }
} 

function reset(){
  gameState = PLAY;
  
  bananaGroup.destroyEach();
  obstacleGroup.destroyEach();
  
  monkey.scale = 0.1;
  
  score = 0;
}




