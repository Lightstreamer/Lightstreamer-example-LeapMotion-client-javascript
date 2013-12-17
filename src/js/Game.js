define(["./Constants","./Cube"],
    function(Constants,Cube) {
  
  var BRIDGE_CALL = {
    nick: "setNick",
    status: "setStatus",
    posX: "setPosX",
    posY: "setPosY",
    posZ: "setPosZ",
    rotX: "setRotX",
    rotY: "setRotY",
    rotZ: "setRotZ",
    rotW: "setRotW",
    dVx: "setDVX",
    dVy: "setDVY",
    dVz: "setDVZ",
    dRx: "setDRX",
    dRY: "setDRY",
    dRz: "setDRZ"
  };
  
  var CONVERT = {
      posX: true,
      posY: true,
      posZ: true,
      rotX: true,
      rotY: true,
      rotZ: true,
      rotW: true
  };
  
  var Game = function(field) {
    this.players = {};
    this.field = field;
    
    this.localPlayerKey = null;
    
    this.extraInfo = null;
    this.showExtraInfo(true);
  };
  
  Game.prototype = {
      
      showExtraInfo: function(show) {
        var newV = this.field.isWebGLinUse() && show; 
        
        if (this.extraInfo != newV) {
          this.forEachPlayer(function(player) {
            player.showStatus(newV);
            player.showNick(newV);
          });
          this.extraInfo = newV;
        } 
      },
      
      setLocalPlayerKey: function(key) {
        this.localPlayerKey = key;
      },
      
      onItemUpdate: function(itemUpdate) {
        
        var key = itemUpdate.getValue("key");
        var command = itemUpdate.getValue("command");
      
        if (command == "DELETE") {
          this.removePlayer(key);
          return;
        } 
        
        if (command == "ADD") {
          this.addPlayer(key);
        }

        this.updatePlayer(key,itemUpdate);
      },
      
      onUnsubscription: function() {
        var that = this;
        this.forEachPlayer(function(player) {
          that.removePlayer(player.getKey());
        });
      },
      
      forEachPlayer: function(cb) {
        for (var i in this.players) {
          cb(this.players[i]);
        }
      },
      
      removePlayer: function(key) {
        if (!this.players[key]) {
          return;
        }
        var player = this.players[key];
        delete(this.players[key]);
        player.clear();
      },
      addPlayer: function(key) {
        if (this.players[key]) {
          return;
        }

        this.players[key] = new Cube(key,key == this.localPlayerKey ? Constants.OWN : Constants.OTHER,this.field,this.extraInfo);
      },
      getPlayer: function(key) {
        return this.players[key];
      },
      updatePlayer: function(key,itemUpdate) {
        var player = this.players[key];
        if (!player) {
          //TODO error?
          return;
        }
        
        itemUpdate.forEachChangedField(function(name,pos,val) {
          var tc = BRIDGE_CALL[name];
          console.log(tc + " - " + val);
          if (val !== null && tc) {
            if (CONVERT[name]) {
              val = getMyDouble(fromBase64(val));
            }
            player[tc](val);
          }
        });
      }
      
  };
  
  return Game;
});