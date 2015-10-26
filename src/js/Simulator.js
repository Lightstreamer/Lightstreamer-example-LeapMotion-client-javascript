/*
  Copyright (c) Lightstreamer Srl

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
define(["./Constants"],function(Constants) {
  
  var p = {
      x: 0,
      y: 0,
      z: 0
  };
  var f = {
      x: 0,
      y: 0,
      z: 0
  };
  var c = 0;
  var cc = 20;
  
  function randomMovement() {
    var g = Math.round(Math.random()*4);
    var m = Math.round(Math.random()*2);
    if (m == 1) {
      g *= -1;
    }
    return g;
  }
  
  return function(player, game) {
    player.enterRoom(Constants.ROOM);
    player.grab(Constants.ROOM);
    game.lockLocalPlayer(true);
    
    var released = false;
    
    setInterval(function() {
      if (released) {
        player.grab(Constants.ROOM);
        game.lockLocalPlayer(true);
      } else {
        player.release(Constants.ROOM,randomMovement()*100,randomMovement()*100,randomMovement()*100);
        game.lockLocalPlayer(false);
      }
      released = !released;
      
    },5000);
   
    setInterval(function() {
      if (released) {
        return;
      }
      c++;
      if (c >= cc) {
        for (var i in f) {
          f[i] = randomMovement();
        }
        c=0;
        cc = Math.round(Math.random()*100);
      }
      for (var i in f) {
        p[i] += f[i];
        if (Math.abs(p[i]) > Constants.MAX_SIZE[i]-1) {
          if (p[i] > 0) {
            p[i] = Constants.MAX_SIZE[i]-1;
          } else {
            p[i] = -(Constants.MAX_SIZE[i]-1);
          }
          f[i]*=-1;
        }
      }
      
      player.move(Constants.ROOM,p["x"],p["y"],p["z"]);
      if (!Constants.LOCAL_PLAYER_RT) {
        game.moveLocalPlayer(p["x"],p["y"],p["z"]);
      }
    },50);
  };
  
});