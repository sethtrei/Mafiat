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
var playerCount = 0;
var playerAmt = 0;
var players = [];
var inGame = false;
var gameState;
var oldGameState = 0;
var role = "person";

var myFirebaseRef = new Firebase("https://xgamedatax.firebaseio.com/");
//var love???


function setup(){
    createCanvas(400, 500);
    back();
    findPlayers();
    updatePlayerCount();
    getGameState();
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
    event();
}

function windowResized() {
  resizeCanvas(400, 500);
  background(0,255,255);
}

function back(){
  background(backRed,backBlue,backGreen);
}

function titleScreen(){
  fill(255,0,0);
  var displayText = "Ma Fiat.  I mean Mafia.";
  var textS = 18;
  textSize(textS);
  text(displayText,centerText(textS*2,displayText),textS);
  //displayText = "Press Enter to continue";
  //text(displayText,centerText(textS,displayText),(500-(textS*5)));
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
  text(realText,0,(500/4),400,(500/4)*3);
}

function centerText(textS, displayText){
  return((500/2)-((displayText.length/2)*(textS/2.7)));
}

function keyPressed(){
  if(keyCode===ENTER||keyCode===RETURN){
    switch(scene){
      case 0:
        //runGame();
        //scene=1;
        break;
      case 1:
        break;
    }
  }
}

function runGame(){
  //gameStage++;
  //gameStages();  
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
  if(gameState === "join"){
    var anotherRef = new Firebase("https://xgamedatax.firebaseio.com/mafia/");
    anotherRef.child("gameCode").on("value", function(snapshot){
      if(snapshot.val()===gameCodeAttempt){
        newRef = new Firebase("https://xgamedatax.firebaseio.com/mafia/players/"+username+"/");
        newRef.update({
          alive:true
        });
        alert("You are in!  Please wait...")
        inGame = true;
        anotherRef.child("playerCount").once("value", function(snap){
          var players = snap.val()
          anotherRef.update({
            playerCount : (players+1)
          });
          playerCount = players+1;
        });
      } else {
        alert("Incorrect Game Code.  Sorry M8, but you have to refresh to try again.  REKT")
      }
      removePlayer0();
      findPlayers();
    });
  } else {
    alert("Sorry, the game is already in session");
  }
}

function selectPlayer(){
  // use .appendChild() with jQuery
  // look it up on w3
  //also look up nodes
  var anotherRef = new Firebase("https://xgamedatax.firebaseio.com/mafia/");
  for(var i = 0; i < playerAmt; i++){
    var name = "#player"+(i+1);
    $(name).removeAttr("hidden");
  }
}

function removePlayerSelector(){
  for(var i = 0; i < playerAmt; i++){
    var button = document.getElementsByTagName("button")[i];
    var att = document.createAttribute("hidden");
    button.setAttributeNode(att);
  }
}

function labelPlayers(){
  for(var i = 0; i < playerAmt; i++){
    var h = document.getElementsByTagName("button")[i];
    var anotherNewRef = new Firebase("https://xgamedatax.firebaseio.com/mafia/players/"+username+"/");
    
    var t = document.createTextNode();
    h.appendChild(t);
  }
}
//http://tinyurl.com/firebaseStuffzPlzLOL
//use .forEach from firebase

function findPlayers(){
  var playerRef = new Firebase("https://xgamedatax.firebaseio.com/mafia/players/");
  playerRef.once("value", function(snapshot) {
    var amountOfPlayers=0;
    players = [];
    snapshot.forEach(function(childSnapshot){
      var key = childSnapshot.key();
      players.push(childSnapshot.key());
      amountOfPlayers++;
    });
  });
  setTimeout(updateButtons,1000);
  setTimeout(findPlayers,5000);
}

function updateButtons(){
  for(var i = 0; i < players.length; i++){
    var btnName = "#player"+(i+1);
    $(btnName).text(players[i]);
  }
  labelPlayers();
}

function removePlayer0(){
  var player0Ref = new Firebase("https://xgamedatax.firebaseio.com/mafia/players/player0");
  player0Ref.remove();
}

function updatePlayerCount(){
   var anotherRef = new Firebase("https://xgamedatax.firebaseio.com/mafia/");
    anotherRef.child("playerCount").on("value", function(snapshot){
      playerAmt = snapshot.val();
    });
    setTimeout(updatePlayerCount, 5000);
}

function getGameState(){
  var anotherRef = new Firebase("https://xgamedatax.firebaseio.com/mafia/");
  anotherRef.child("gameState").on("value", function(snapshot){
    gameState = snapshot.val();
  });
  setTimeout(getGameState,1000);
}

function event(){
  if(oldGameState!=0){
    if(oldGameState!=gameState){
      switch(gameState){
        case "inGame":
          removePlayerSelector();
          break;
        case "mafia":
          if(role === "mafia"){
            selectPlayer();
          }
          break;
        case "nurse":
          if(role=== "nurse"){
            selectPlayer();
          }
          break;
        case "vote":
          selectPlayer();
          break;
        case "roles":
          findPlayers();
          //it's weird, but it only works if you call it twice
          getRole();
          getRole();
          setTimeout(reportRole,2000);
          break;
        default:
          if(gameState!="join"){
            console.log("Unknown Gamestate: "+gameState);
          }
      }
    }
  }
  oldGameState = gameState;
}

function getRole(){
  var thisRef = new Firebase("https://xgamedatax.firebaseio.com/mafia/players/"+username);
  thisRef.child("role").on("value",function (snapshot){
    role = snapshot.val();
  });
}

function reportRole(){
  if(role === "civilian"){
    alert("You are a civilian");
  } else {
    alert("You are the "+role+"!");
  }
}