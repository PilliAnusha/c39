class Game {
  constructor(){}
  
  getState(){
    var gameStateRef  = database.ref('gameState');
    gameStateRef.on("value",function(data){
       gameState = data.val();
    })
   
  }

  update(state){
    database.ref('/').update({
      gameState: state
    });
  }

  async start(){
    if(gameState === 0){
      player = new Player();
      var playerCountRef=await database.ref('playerCount').once("value");
      if(playerCountRef.exists()){
        playerCount=playerCountRef.val();
        player.getCount();
      }
      form = new Form()
      form.display();
    }
    car1=createSprite(200,200);
    car1.addImage(c1img);
    car2=createSprite(400,200);
    car2.addImage(c2img);
    car3=createSprite(600,200);
    car3.addImage(c3img);
    car4=createSprite(800,200);
    car4.addImage(c4img);
    cars=[car1,car2,car3,car4];
  }
  play(){
    form.hide();
    //textSize(30);
   // text("Game Start",120,100);
    Player.getPlayerInfo();
    player.getCarsAtEnd();

    if(allPlayers !==undefined){
      background ("blue");
      image(track,-130,-displayHeight*4,displayWidth,displayHeight*5);
     // var display_position=130;
     var index=0;
     var x=0;
     var y;

      for(var plr in allPlayers){
        
        x+=200;
        y=displayHeight-allPlayers[plr].distance;
        index+=1;
        cars[index-1].x=x;
        cars[index-1].y=y;
       
        if(index===player.index){
          stroke (10);
          fill ("red");
          ellipse (x,y,60,60);
          cars[index-1].shapeColor="yellow";
          camera.position.x=displayWidth/2;
          camera.position.y=cars[index-1].y;
        }



        /*if(plr==="player"+player.index)
        fill ("red")
        else
        fill ("black");
       
display_position+=20;
textSize(15)
text(allPlayers[plr].name + ":" +allPlayers[plr].distance,120,display_position);*/



      }
    }
    if(keyIsDown(UP_ARROW)&& player.index !==null){
      player.distance+=10;
      player.update();
    }
    if(player.distance>3560){
      gameState=2;
      player.rank+=1;
      Player.updateCarsAtEnd(player.rank);
    }
    drawSprites();
  }
  end(){
    console.log("Game Ended");
    console.log(player.rank);
  }
}
