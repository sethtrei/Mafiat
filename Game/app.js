// JavaScript File
var backRed = 0;
var backGreen = 255;
var backBlue = 255;
var scene = 0;
var gameCode = prompt("What do you want the game tag to be?");
var gameStage = -1;
var displayText = "";
var townName;
var funTextState = 0;
var realText;
var myFirebaseRef = new Firebase("https://xgamedatax.firebaseio.com/");

var story = [personKilled + "was netflix and chillin with their imaginary bae. The movie paused and some laughing was heard. ‘I guess you guys are gonna be netflix and DEAD!’", personKilled+" was out seeing Star Wars Epsiode 3.14: The Force Goes to Sleep. Out of no where the movie went off. The movie was replaced with static like on an old tv. "+personKilled+" tried to get up but all the doors were locked! The static went off and all the lights in the theater went into strobe mode. *FLASH* "+personKilled+" sees the mafia, 20 feet away! *FLASH* 10 Feet AWAY! *FLASH* 2 FEET AWAY!!!!! ", personKilled+" was at his schools computer science club programming a game called aifam, when the club leader, Daniel Bogman came over and whispered to "+personKilled, "Dude", ""];

var save = ["  luckily the angel yelled ‘watch out’ and "+personKilled+" escaped with bae","Just as the mafia was about to kill "+personKilled+", the Star Wars theme started to play! And like a majestical unicorn the angel flew in with a lightsaber in hand screaming 'IT'S A TRAP'! The angel drew their lightsaber and sliced the mafia's left arm off! The mafia then dissapeared. The angel said 'may the force be with you to "+personKilled+" and left. ", "  another save"];

var dead = [ "And just like that "+personKilled+" and Bae, were dead.","The mafia was one foot away and said '"+personKilled+", I am your Mother'! 'NOOOOOOOOOOOO' "+personKilled+" said as their head was decappitated.","some other death"];

function setup(){
  createCanvas(displayWidth, displayHeight);
  back();
  myFirebaseRef.set({
    mafia:{
      gameCode:gameCode,
      players:{
        player0:0
      }
    }
  });
}


function draw(){
    switch(scene){
      case 0:
        titleScreen();
        break;
      case 1:
        drawGame();
        break;
    }
}

function windowResized() {
  resizeCanvas(displayWidth, displayHeight);
  background(0,255,255);
}

function back(){
  background(backRed,backBlue,backGreen);
}

function titleScreen(){
  fill(255,0,0);
  var displayText = "Ma Fiat.  I mean Mafia...";
  var textS = 36;
  textSize(textS);
  text(displayText,centerText(textS,displayText),textS);
  displayText="This Game Tag is: "+gameCode;
  text(displayText,centerText(textS,displayText),(displayHeight/2)-textS);
  displayText = "Press Enter to continue";
  text(displayText,centerText(textS,displayText),(displayHeight-(textS*5)));
}

function drawGame(){
  back();
  if(funTextState===0){
    realText="";
    funTextState = 0;
    funText();
  }
  fill(255,0,0);
  textSize(36);
  text(realText,0,(displayHeight/4),displayWidth,(displayHeight/4)*3);
}

function centerText(textS, displayText){
  return((windowWidth/2)-((displayText.length/2)*(textS/2.7)));
}

function keyPressed(){
  if(keyCode===ENTER||keyCode===RETURN){
    switch(scene){
      case 0:
        runGame();
        scene=1;
        break;
      case 1:
        break;
    }
  }
}

function runGame(){
  gameStage++;
  gameStages();  
}

function gameStages(){
  switch(gameStage){
    case 0:
      villageName();
      displayText = "Let us begin our story in "+townName+", where the citizens are about to lay their heads to rest.  They looked at their cellular devices with glee to see if they held a special role in the game... Keep your role a secret... Whatever it is...";
      break;
    case 1:
      break;
  }
}

function villageName(){
  var one = Math.floor((Math.random() * 26) + 65);
  var two = Math.floor((Math.random() * 26) + 65);
  var three = Math.floor((Math.random() * 26) + 65);
  var four = Math.floor((Math.random() * 26) + 65);
  var five = Math.floor((Math.random() * 26) + 65);
  var one2 = String.fromCharCode(one);
  var two2 = (String.fromCharCode(two)).toLowerCase();
  var three2 = (String.fromCharCode(three)).toLowerCase();
  var four2 = (String.fromCharCode(four)).toLowerCase();
  var five2 = (String.fromCharCode(five)).toLowerCase();
  townName = one2+two2+three2+four2+five2+" City";
}

function funText(){
  funTextState++;
  var length = displayText.length;
  var individualText = displayText.split("");
  if(funTextState<length){
    realText="";
    for(var i = 0; i <= funTextState; i++){
      realText = realText+individualText[i];
    }
  }
  setTimeout(funText, 35);
}
