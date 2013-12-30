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
   
    setInterval(function() {
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