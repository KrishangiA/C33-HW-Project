const Engine = Matter.Engine;
const Render = Matter.Render;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
const Body = Matter.Body;
const Composites = Matter.Composites;
const Composite = Matter.Composite;


let engine;
let world;
var plank;
var ground;
var higherground;
var con;
var con2;
var rope;
var bubble,bubble_img;
var star;
var star_img;

function preload()
{
  bg_img = loadImage('background.png');
  food = loadImage('melon.png');
  rabbit = loadImage('Rabbit-01.png');
  star_img = loadImage('star.png');

  bk_song = loadSound('sound1.mp3)');
  sad_sound = loadSound('sad.wav');
  cut_sound = loadSound('rope_cut.mp3');
  eating_sound = loadSound('eating_sound.mp3');
  air_sound = loadSound('air.wav');


  blink = loadAnimation("blink_1.png","blink_2.png","blink_3.png");
  eat = loadAnimation("eat_0.png" , "eat_1.png","eat_2.png","eat_3.png","eat_4.png");
  sad = loadAnimation("sad_1.png","sad_2.png","sad_3.png");

  empty_star = loadAnimation("empty.png");
  one_star = loadAnimation("one_star.png");
  two_star = loadAnimation("stars.png");

  
  blink.playing = true;
  eat.playing = true;
  sad.playing = true;
  sad.looping= false;
  eat.looping = false; 
}

function setup() {
  createCanvas(500,800);
  frameRate(80);
  engine = Engine.create();
  world = engine.world;

   var fruit_options = {
    restitution: 0.8
  }
  
  ground =new Ground(250,height-10,width,20);
  fruit = Bodies.circle(100,400,15,fruit_options);
  World.add(world,fruit);
  
  bubble = createSprite(290,460,20,20);
  bubble.addImage(bubble_img);
  bubble.scale = 0.1;
  
  //bunny sprite
  blink.frameDelay = 20;
  eat.frameDelay = 20;
  bunny = createSprite(270,100,100,100);
  bunny.addImage(rabbit);
  bunny.scale = 0.2;
  higherground =new Ground(300,170,100,10);

  bunny.addAnimation('blinking',blink);
  bunny.addAnimation('eating',eat);
  bunny.addAnimation('crying',sad);
  bunny.changeAnimation('blinking');

  star_display = createSprite(50,20,30,30);
  star_display.scale = 0.2;
  star_display.addAnimation('empty', empty_star);
  star_display.addAnimation('two', two_star);
  star_display.changeAnimation('empty');

  //star sprite
  star = createSprite(320,50,20,20);
  star.addImage(star_img);
  star.scale = 0.2;

  star2 = createSprite(50,330,20,20);
  star2.addImage(star_img);
  star2.scale = 0.02;

  blower = createSprite('balloon2.png');
  blower.position(260,379);
  blower.size(120,120);
  blower.mouseClicked(airblow);

  con = new Link(rope,fruit);
  con2 = new Link(rope2,fruit);

  //btn 1
  button = createImg('cut_btn.png');
  button.position(200,320);
  button.size(50,50);

  //btn 2
  button2 = createImg('cut_btn.png');
  button2.position(30,420);
  button2.size(50,50);

  rope = new Rope(4,{x:230,y:330});
  rope2 = new Rope(4,{x:50,y:450});

  mute_btn = createImg('mute.png');
  mute_btn.position(450,90);
  mute_btn.size(50,50);


  //button2.Clicked(drop);
  
  //button2.mousePress(drop);
  
  //button2.mouseClick(drop);

  button2.mouseClicked(drop);

  ellipseMode(RADIUS);
}

function draw() 
{
  background(51);
  image(bg_img,0,0,width,height);
  
  push();
  imageMode(CENTER);
  if(fruit!=null){
    image(food,fruit.position.x,fruit.position.y,70,70);
  }
  pop();

  rope.show();
  rope2.show();

  Engine.update(engine);
  ground.show();

  drawSprites();

  if(collide(fruit,bunny,80)==true)
  {
   World.remove(engine.world,fruit);
   fruit = null;
   bunny.changeAnimation('eating');
   eating_sound.play();
  }

  if(fruit!=null && fruit.position.y>=650)
  {
    bunny.changeAnimation('crying');
    bk_song.stop();
    sad_song.play();
    fruit=null;
  }
  
  if(collide(fruit,star,20) == true)
    {
     star.visible=false;
     star_display.changeAnimation('one');
    }

    if(collide(fruit,star2,40)==true)
    {
      star2.visible=false;
      star_display.changeAnimation('two');
    }

}

function drop()
{
 cut_sound.play();
 rope.break();
 fruit_con.detach();
 fruit_con = null;
}

function drop2()
{
 cut_sound.play();
 rope2.break();
 fruit_con_2.detach();
 fruit_con_2 = null;
}

function collide(body,sprite,x)
{
  if(body!=null)
        {
         var d = dist(body.position.x,body.position.y,sprite.position.x,sprite.position.y);
          if(d<=x)
            {
              
               return true; 
            }
            else{
              return false;
            }
         }
}

function mute()
{
  if(bk_song.isPlaying())
  {
    bk_song.stop();
  }
  else{
    bk_song.play();
  }
}

function airblow()
{
  Matter.Body.applyForce(fruit, {x:0,y:0}, {x:0,y:-0.03});
  airblow.play();
}

