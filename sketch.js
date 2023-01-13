var bgImg , bg ;
var player, shooterImg , shootingImg;
var bullet , bulletGroup;
var explosion;
var zombie , zombieImg , zombieGroup;
var gameState = "fight";
var score = 0 ;


function preload(){

    bgImg = loadImage("assets/bg.jpeg");
    shooterImg = loadImage("assets/shooter_2.png");
    shootingImg = loadImage("assets/shooter_3.png");
    zombieImg = loadImage("assets/zombie.png")
    
    explosion = loadSound("assets/explosion.mp3");
    lose = loadSound("assets/lose.mp3");
    win = loadSound("assets/win.mp3");

}

function setup(){
    createCanvas(windowWidth,windowHeight);
    bg = createSprite(displayWidth/2-20,displayHeight/2-40);
    bg.addImage(bgImg);
    bg.scale = 1.1;

    player = createSprite(displayWidth-1300,displayHeight-300);
    player.addImage(shooterImg);
    player.scale = 0.5;
    player.debug = true;
    player.setCollider("rectangle",0,0,200,300)

    bulletGroup= new Group();
    zombieGroup = new Group();
}

function draw(){
    background(0);
    
    if(gameState==="fight"){
        if(keyDown(UP_ARROW)){
            player.y = player.y-30;
            
        }
    
        if(keyDown(DOWN_ARROW)){
            player.y = player.y+30;
            
        }
    
        if(keyWentDown("space")){
            bullet = createSprite(displayWidth-1300,player.y-30,20,10);
            bullet.velocityX = 20;
    
            bulletGroup.add(bullet);
    
            player.addImage(shootingImg);
            
            explosion.play();
        }
    
        if(keyWentUp("space")){
            player.addImage(shooterImg)
        }
         
        if(zombieGroup.isTouching(bulletGroup)){
    
            for(var i = 0; i < zombieGroup.length ; i++){
                if(zombieGroup[i].isTouching(bulletGroup)){
                    zombieGroup[i].destroy();
                    bulletGroup.destroyEach();
                    score+=2;

                }
            }
        }
    
        
        if(zombieGroup.isTouching(player)){
            for(var i = 0; i<zombieGroup.length ; i++){
                if(zombieGroup[i].isTouching(player)){
                    zombieGroup[i].destroy();
                    lose.play();
                    gameState="over"
                }
            }
           
        }
        
        spawnZombie();
    
    }
    drawSprites();

    textSize(100);
    fill("blue");
    text("score="+score,displayWidth-300,displayHeight/2-320);

    if(gameState==="over"){
        textSize(100);
        fill("blue");
        text("Sorry, try again",400,400);
        zombieGroup.destroyEach();
        player.destroy();
        bulletGroup.destroyEach();
    }
}

function spawnZombie(){
    if(frameCount%60 === 0){
        zombie = createSprite(random(600,1100),(random(100,500)));
        zombie.addImage(zombieImg);
        zombie.velocityX = -3 ;
        zombie.scale = 0.2;

        zombie.debug = true ;
        zombie.setCollider("rectangle",0,0,300,300);
        zombie.lifetime = 400;

        zombieGroup.add(zombie)

        

    }
}


