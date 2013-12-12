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
define(["Inheritance","EventDispatcher"],
    function(Inheritance,EventDispatcher) {
  
  var Player = function(nick,status,client) {
    this.initDispatcher();
    
    this.client = client;
    this.nick = nick;
    this.status = status;
    
    this.rooms = {};
    
    this.client.addListener(this);
    
  };
  
  Player.prototype = {
    
      ready: function() {
        if (this.playing) {
          return;
        }
        this.playing = true;
        
        //conf nick & status
        this.sendNick();
        this.sendStatus();
        
        //re-enter rooms
        for (var i in rooms) {
          this.enterRoomInternal(i);
        }
      },
      
      reset: function() {
        /*if (!this.playing) {
          return;
        }*/
        this.playing = false;
      },
      
      /**
       * @private
       */
      error: function(op,message) {
        this.dispatchEvent("onError",[op,message]);
      },
      
      /**
       * @private
       */
      sendRoomMessage: function(command,room) {
        if (!this.rooms[room]) {
          return;
        }
        this.send(command);
      },
      
      /**
       * @private
       */
      sendMessage: function(command) {
        //TODO check connection
        this.client.sendMessage(command); //TODO listen outcome
      },
      
      enterRoom: function(room) {
        if (this.rooms[room]){
          return;
        }
        
        this.enterRoomInternal(room);
        
        this.rooms[room] = true;
      },
      
      /**
       * @private
       */
      enterRoomInternal: function(room) {
        this.send("enter|"+room);
      },
      
      exitRoom: function(room) {
        this.sendRoomMessage("leave|"+room,room);
      },
      
      grab: function(room) {
        this.sendRoomMessage("grab|"+room,room);
      },
      
      release: function(room) {
        this.sendRoomMessage("release|"+room,room);
      },
      
      move: function(room,x,y,z) {
        this.sendRoomMessage("move|"+room,room);
      },
      
      changeNick: function(newNick) {
        this.nick = newNick;
        this.sendNick();
      },
      
      /**
       * @private
       */
      sendNick: function() {
        this.send("nick|"+this.nick);
      },
      
      changeStatus: function(newStatus) {
        this.status = newStatus;
        this.sendStatus();
      },
  
      /**
       * @private
       */
      sendStatus: function() {
        this.send("status|"+this.status);
      }
      
      
  };
  
  Inheritance(Player,EventDispatcher,true,true);
  return new Player;
  
});