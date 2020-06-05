var player;
var backgroundImg;
var playerImg,player2;
var bullet;
var edge1,edge2,edge3,edge4;
var bulletImg;
var lifeBar;
var shootSound;
var zombie , zombieImg;
var zombieGroup;
var bulletGroup;
var life = 200;
var gameState = "INSTRUCTIONS";
var bg2;
var index=1;
var zombieCount = 0;
var heliImg , helicopter;
var kills = 0;
var ammo = 50;
var armor1,armor2,armorImg;
var ammoBox , ammoImg;
var bossZombie,bossImg;
var zombieHealth = 500;
var win;
var timer = 120;
var zombieSound;
function preload(){
backgroundImg = loadImage("images/background.jpg");
playerImg = loadImage("images/Player.png");
player2 = loadImage("images/Player2.png");
shootSound = loadSound('Gun.mp3.mp3');
zombieSound = loadSound('zombie.mp3');
bulletImg = loadImage("images/bullet.png");
zombieImg = loadImage("images/zombie.png");
bg2 = loadImage("images/bg2.png");
heliImg = loadImage("images/helicopter.png");
armorImg = loadImage("images/armor.png"); 
ammoImg = loadImage("images/ammo.png");
bossImg = loadImage("images/Boss.png");
 win = loadImage("images/win.jpg");
}

function setup() {
  var canvas = createCanvas(displayWidth+1000, 700);

  player = createSprite(150,550,20,20);
  player.scale = 0.3;
  player.setCollider("rectangle",-50,0,300,250)
  player.addImage(playerImg);

  helicopter = createSprite(2450,425,20,20);
  helicopter.addImage(heliImg);
  helicopter.visible = false;

  bossZombie = createSprite(helicopter.x-100 , player.y-150 , 20,20 );
  bossZombie.addImage(bossImg);
  bossZombie.scale = 0.5;
  bossZombie.visible = false;

  edge1 = createSprite(0,350,15,1000);
  edge1.visible = false;

  edge2 = createSprite(2480,350,15,1000);
  edge2.visible = false;

  edge3 = createSprite(displayWidth/2,630,displayWidth*2+1250,10);
  edge3.visible = false;

  armor1 = createSprite(displayWidth/2+500 , 550 , 20,20);
  armor1.scale = 0.3
  armor1.addImage(armorImg);

  ammoBox = createSprite(displayWidth/2+1500 , 515,20,20);
  ammoBox.addImage(ammoImg);
  ammoBox.scale = 0.2;

  zombieGroup = createGroup();
  bulletGroup = createGroup();
}

function draw() {
  background(backgroundImg);

  player.collide(edge1);
  player.collide(edge2);

  
  
   

  textSize(27);
  fill("RED");
  stroke("black");

  text ("KILLS : "+ kills , player.x , player.y - 400);

  text("Life : "+ life , player.x , player.y-150);

  text("AMMO : " + ammo , player.x , player.y - 200);

  if(gameState === "INSTRUCTIONS"){
    text("Kill 50 Zombies to lure the boss zombie.You have 50 bullets to do so." , displayWidth/2,25);
    text("Once you find the boss zombie , kill it and escape with the helicopter in the given time", displayWidth/2,75);
    text("Press UP ARROW to start" , displayWidth/2,135);
    text("TIP : Aim at Zombies' head. " , displayWidth/2,110)
    if(keyIsDown(UP_ARROW)){
      gameState = "PLAY";
    }
  }
  if(gameState === "PLAY"){
    if(zombieCount<=60){
    spawnZombies();
    }
    if(player.isTouching(armor1)&& life<200){
      armor1.destroy();
      life = 200;
    }
  
    if(player.collide(ammoBox)){
      ammoBox.destroy();
      ammo+= 20;
    }
    if(bulletGroup.isTouching(zombieGroup)){
      zombieGroup.get(0).destroy();
       kills++;
       bulletGroup.get(0).lifetime = 0;
     }
    if(zombieGroup.isTouching(player)){
      zombieGroup.get(0).velocityX = 0;
      life--;
     }

  if(keyIsDown(RIGHT_ARROW)){
    changePosition(10,0);
    player.addImage(playerImg);
  }
  if(keyIsDown(LEFT_ARROW)){
    
    changePosition(-10,0);

  }
  if(keyIsDown(UP_ARROW)&& player.y>470){
    changePosition(0,-1);
    player.scale -=0.001;
  }
  if(keyIsDown(DOWN_ARROW)&& player.y<600){
    changePosition(0,1);
    player.scale +=0.001;
  }
  if(life === 0 || ammo === 0){
    gameState = "END";
    life = 0;
  }
  if(player.collide(edge2) && kills >= 1){
    bulletGroup.destroyEach();
    zombieGroup.destroyEach();
    
    player.x = 150;
    gameState = "EXTEND";
  }
}
if(gameState === "EXTEND"){
  fill("RED");
  stroke("BLACK");
  strokeWeight(7);
  textSize(12);
  text("KILL THE BOSS ZOMBIE & REACH THE HELICOPTER TO WIN",displayWidth/2 , 100);
  text("TIME LEFT : " + timer , player.x , player.y + 100);
  helicopter.visible = true;
  bossZombie.visible = true;
  bossZombie.velocityX = -0.5;
  if(zombieGroup.isTouching(player)){
    
    life--;
   }
  //player.collide(helicopter);
  
  if(player.isTouching(armor1)&& life<200){
    armor1.destroy();
    life = 200;
  }

  if(player.collide(ammoBox)){
    ammoBox.destroy();
    ammo+= 20;
  }
  if(bulletGroup.isTouching(zombieGroup)){
    zombieGroup.get(0).destroy();
     kills++;
     bulletGroup.get(0).lifetime = 0;
   }
  text("ZOMBIE HEALTH : "+ zombieHealth , bossZombie.x-50 , bossZombie.y - 170);
  if(World.frameCount%25 === 0){
   timer = timer - 1;
  }
  if(World.frameCount%1 === 0){
    zombieGroup.setVelocityXEach(-7);
    spawnZombies();
  }
  if(bulletGroup.isTouching(bossZombie)){
    zombieHealth-=5;
    bulletGroup.get(0).destroy();
  }
 
  if(zombieHealth === 0){
    zombieHealth = 0;
    bossZombie.destroy();
  }
  if(player.isTouching(helicopter)){
     
     gameState = "WIN";
  }
 if(keyIsDown(RIGHT_ARROW)){
   changePosition(10,0);
   player.addImage(playerImg);
 }
 if(keyIsDown(LEFT_ARROW)){
   
   changePosition(-10,0);

 }
 if(keyIsDown(UP_ARROW)&& player.y>470){
   changePosition(0,-1);
   player.scale -=0.001;
 }
 if(keyIsDown(DOWN_ARROW)&& player.y<600){
   changePosition(0,1);
   player.scale +=0.001;
 }
 if(player.isTouching(bossZombie)){
   gameState = "END";
 }

 if(life === 0 || ammo === 0 || timer ===0){
   gameState = "END";
   life = 0;
}
}
if(gameState === "WIN"){
   player.destroy();
    zombieGroup.destroyEach();
    helicopter.destroy();
    armor1.destroy();
    ammoBox.destroy();
    bulletGroup.destroyEach();
    bulletGroup.setLifetimeEach(0);
    shootSound.stop();
    zombieSound.stop();
    bossZombie.destroy();
   background(win);
}
if(gameState === "END"){
  background(bg2);
  player.destroy();
  armor1.destroy();
  ammoBox.destroy(); 
  bossZombie.destroy();
  helicopter.destroy();
  shootSound.stop();
  zombieSound.stop();
  zombieGroup.destroyEach();
}
  drawSprites();
}
function changePosition(x,y){
  player.x = player.x+x;
  player.y  = player.y+y
  
}
function keyPressed(){
  if(keyCode === 32 && gameState !== "INSTRUCTIONS" && gameState !== "END" ){
    shoot();
    
    ammo = ammo -0.5;
  }
}
function spawnZombies(){
  if(World.frameCount%85===0){
    zombie = createSprite(2470,random(480,615),20,20);
    zombie.lifetime = 280;
    zombieCount++;
    zombie.setCollider("rectangle",0,-100,70,135)
    zombie.addImage(zombieImg);
    zombie.velocityX = -10;
    zombie.scale = random(0.35,0.4);
    zombieSound.play(); 
    zombieGroup.add(zombie);

  }
}
function shoot(){
  bullet = createSprite(player.x+35 , player.y-45 , 20,20);
  bullet.addImage(bulletImg);
  bullet.setCollider("rectangle",50,0,200,50);
  bullet.velocityX = 20;
  bullet.lifetime = 100;
  bullet.scale = 0.2;
  bulletGroup.add(bullet);
  shootSound.play();
}
