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
      error: function(message) {
        this.dispatchEvent("onError",[message]);
      },
      
      /**
       * @private
       */
      sendRoomMessage: function(command,sequence,room) {
        if (!this.rooms[room]) {
          return;
        }
        this.sendMessage(command,sequence);
      },
      
      /**
       * @private
       */
      sendMessage: function(command,sequence) {
        if (!this.playing) {
          return;
        }
        this.client.sendMessage(command,sequence,0,this);
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
        this.sendMessage("enter|"+room,room);
      },
      
      exitRoom: function(room) {
        this.sendRoomMessage("leave|"+room,room,room);
      },
      
      grab: function(room) {
        this.sendRoomMessage("grab|"+room,"3D",room);
      },
      
      release: function(room) {
        this.sendRoomMessage("release|"+room,"3D",room);
      },
      
      move: function(room,x,y,z) {
        this.sendRoomMessage("move|"+room,"3D",room);
      },
      
      changeNick: function(newNick) {
        this.nick = newNick;
        this.sendNick();
      },
      
      /**
       * @private
       */
      sendNick: function() {
        this.sendMessage("nick|"+this.nick,"nick");
      },
      
      changeStatus: function(newStatus) {
        this.status = newStatus;
        this.sendStatus();
      },
  
      /**
       * @private
       */
      sendStatus: function() {
        this.sendMessage("status|"+this.status,"status");
      },
      
      //message listener
     
      // onDiscarded onAbort onProcessed -> do nothing
      
      onDeny: function(originalMessage,code,message) {
        //Event handler that is called by Lightstreamer when the related message has been processed by the Server but the expected processing outcome could not be achieved for any reason.
        this.error(message);
      },
      
      onError: function() {
        this.error("Unexpected error");
      }
  };
  
  Inheritance(Player,EventDispatcher,true,true);
  return new Player;
  
});