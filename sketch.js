const Engine = Matter.Engine;
const World= Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
var ground,playerAnimation,player,over;
var gameState=1
var obstacle,obstacle2;
var obstaclesGroup;
var cloudsGroup;
var score=0
function preload()
{
    c2=loadImage("c2.png");
    c3=loadAnimation("c3.png");
    c4=loadAnimation("c4.png");
    c5=loadImage("c5.png");
    o=loadImage("o.png");
    o2=loadImage("o2.png");
    playerAnimation=loadAnimation("1.png","2.png","3.png","4.png","5.png");
}

function setup()
{
    var canvas = createCanvas(1200,800);
    engine = Engine.create();
    world = engine.world;
    ground=createSprite(600,800,1250,20);
    imageMode(CENTER);
    player=createSprite(150,600,5,5);
    if(gameState===1)
    {
        player.addAnimation("running",playerAnimation);
    }
    else if(gameState===0)
    {
        player.changeAnimation("over",over)
    }   
    obstaclesGroup=new Group();
    cloudsGroup=new Group();    
}
function draw()
{
    background("cyan");   
    if(gameState===1)
    {   
        camera.x=player.x+450
        ground.x=camera.x
        player.velocityX=10;
        score=score+Math.round(getFrameRate()/60)
        
        if(camera.x%1000===0)
        {
            spawnClouds();
        }
        if(keyDown("space")&&player.y>599)
        {
            player.y=player.y-400
        }
        player.collide(ground)
        console.log(player.y)
        player.y=player.y+5
        if(camera.x%2000===0)
        {
            spawnObstacle();
        }
        if(camera.x%7000===0)
        {
            spawnO2();
        }
    }
    else if(gameState===0)
    {
        player.velocityX=0;
        text("Press Enter To Restart",camera.x,400);
        if(keyDown("enter"))
        {
            gameState=1;
            player.x=150;
            score=0;
            cloudsGroup.destroyEach();
            obstaclesGroup.destroyEach();
        }
    }
    if(player.isTouching(obstaclesGroup))
    {
        gameState=0;
    } 
    text("Score:"+score,camera.x-600,100);     
    console.log(gameState)
    drawSprites();
}
function spawnClouds()
{
   cloud=createSprite(camera.x+800,random(100,300));
   cloud.addImage(c5);
   cloudsGroup.add(cloud);
}
function spawnObstacle()
{
    obstacle=createSprite(camera.x+800,750);
    obstacle.addImage(o);
    obstaclesGroup.add(obstacle)
}
function spawnO2()
{
    obstacle2=createSprite(camera.x+800,740);
    obstacle2.addImage(o2);
    obstaclesGroup.add(obstacle2);
}
