/*
Copyright 2013 Weswit s.r.l.

   Licensed under the Apache License, Version 2.0 (the "License");
   you may not use this file except in compliance with the License.
   You may obtain a copy of the License at

       http://www.apache.org/licenses/LICENSE-2.0

   Unless required by applicable law or agreed to in writing, software
   distributed under the License is distributed on an "AS IS" BASIS,
   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   See the License for the specific language governing permissions and
   limitations under the License.
*/

require(["js/Constants","js/LeapMotion"],
    function(Constants,LeapMotion) {
  
  $(document).ready(function() {
    function showInstructions(show) {
      if (show) {
        $("#waiting_leap").hide();
        $("#leap_instructions").show();
      } else {
        $("#waiting_leap").show();
        $("#leap_instructions").hide();
      }
    }
    setTimeout(function() {
      showInstructions(LeapMotion.isReady());
    },1000);
    LeapMotion.addListener({
      onReady: function(ready) {
        showInstructions(ready);
      }
    });
    
    if (Constants.DEBUG_LEAP) {
      $("#debug").show();
      LeapMotion.addListener({
        onFist: function(sx,sy,sz) {
          $("#h").html("fist");
        },
        onFistReleased: function(sx,sy,sz) {
          $("#h").html("palm");
          $("#s").html(sx + " | " + sy + " | " + sz);
        },
        onFistMove: function(x,y,z) {
          $("#x").html(x);
          $("#y").html(y);
          $("#z").html(z);
        }
      });
    }
  });
});
  

require(["js/Constants","js/lsClient","js/Field","js/Game","js/GameLoop","js/Player","js/LeapMotion","js/Simulator"],
    function(Constants,lsClient,Field,Game,GameLoop,Player,LeapMotion,Simulator) {

  var field = new Field($("#theWorld")[0]);
  var game = new Game(lsClient,Constants.ROOM,field);
  var gameLoop = new GameLoop(game,field,Constants.FRAME_INTERVAL,Constants.BASE_RATE);
  gameLoop.start();
  
  var player = new Player(Constants.DEFAULT_NICK,"",lsClient);
  player.addListener({
    onIdConfirmed: function(id) {
      game.setLocalPlayerKey(id);
    }//, onError
  });
  
  $("#nick").val(Constants.DEFAULT_NICK).prop('disabled', false).keyup(function() {
    player.changeNick($(this).val());
  });
  $("#status").prop('disabled', false).keyup(function() {
    player.changeStatus($(this).val());
  });
  
    LeapMotion.addListener({
      onFist: function(sx,sy,sz) {
        player.grab(Constants.ROOM);
      },
      onFistReleased: function(sx,sy,sz) {
        player.release(Constants.ROOM,sx,sy,sz);
      },
      onFistMove: function(x,y,z) {
        if (LeapMotion.isFist()) {
          player.move(Constants.ROOM,x,y,z);
          if (!Constants.LOCAL_PLAYER_RT) {
            game.moveLocalPlayer(x,y,z); //update local player locally - TODO prevent server synch on local player during grabbing
          }
        }
      }
    });
    
    if (LeapMotion.isReady()) {
      player.enterRoom(Constants.ROOM);
    } else {
      LeapMotion.addListener({
        onReady: function(ready) {
          if (ready) {
            player.enterRoom(Constants.ROOM);
          } else {
            player.exitRoom(Constants.ROOM);
          }
        }
      });
    }
  
  if (Constants.SIMULATE_LEAP) {
    Simulator(player,game);
  }
});
  



 
  