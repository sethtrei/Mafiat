// JavaScript File
var backRed = 0;
var backGreen = 255;
var backBlue = 255;
var scene = 0;
var gameStage = -1;
var displayText = "";
var townName;
var funTextState = 0;
var realText;
var personKilled;
var username;
var gameCodeAttempt;
var newRef;

var myFirebaseRef = new Firebase("https://xgamedatax.firebaseio.com/");
//var love???


function setup(){
    createCanvas(displayWidth, displayHeight);
    back();
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
  var displayText = "Ma Fiat.  I mean Mafia.";
  var textS = 36;
  textSize(textS);
  text(displayText,centerText(textS,displayText),textS);
  displayText = "Press Enter to continue";
  text(displayText,centerText(textS,displayText),(displayHeight-(textS*5)));
  var gameCodeAttempt = document.getElementById("gameCode");
  
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
      displayText = "Let us begin our story in "+townName+", where the citizens are about to lay their heads to rest.  They looked at their cellular devices with glee to see if they held a special role in the game...";
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

$(document).ready(function(){
    $("#remover").click(function(){
        gameCodeAttempt = $('#gameCodeAttempt').val();
        username = $('#username').val();
        $('#gameCode').remove();
        userInit();
    });
});

function userInit(){
  var anotherRef = new Firebase("https://xgamedatax.firebaseio.com/mafia/");
  anotherRef.child("gameCode").on("value", function(snapshot){
    alert(snapshot.val());
    if(snapshot.val()===gameCodeAttempt){
      newRef = new Firebase("https://xgamedatax.firebaseio.com/mafia/players/"+username+"/");
      newRef.update({
        alive:true
      });
      alert("You are in!  Please wait...")
    } else {
      alert("incorrect Game Code.  Sorry M8, but you have to refresh to try again.  REKT")
    }
  });
}