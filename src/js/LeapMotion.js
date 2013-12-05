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
  
  var FINGERS_OF_FIST = 1;
  
  var LeapMotion = function() {
    this.initDispatcher();
    this.fist = false;
    
    this.handInUse == null;
    
    this.controller = new Leap.Controller();
    this.registerCallbacks();
    this.controller.connect();
  };
  
  LeapMotion.prototype = {
      
      /**
       * @private
       */
      registerCallbacks: function() {
        var that = this;
        this.controller.on('frame', function(frame) { 
          that.onFrame(frame);
        });
      },
      
      /**
       * @private
       */
      onFrame: function(frame) {
        //better way to handle a single-hand application?
        var hand = this.getHandInUse(frame.hands);
        if (!hand) {
          this.setFist(false); //remove the hand == remove the fist
          return;
        }
        this.setFist(hand.fingers.length <= FINGERS_OF_FIST);
        
      },
      
      /**
       * @private
       */
      getHandInUse: function(hands) {
        if (hands.length == 0) {
          this.handInUse = null;
          return null;
        }
        for (var i=0; i<hands.length; i++) {
          if (hands[i].id == this.handInUse || this.handInUse === null) {
            this.handInUse = hands[i].id;
            return hands[i];
          }
        }
        this.handInUse = null;
        return this.getHandInUse(hands);
        
      },
    
      isFist: function() {
        return this.fist;
      },
      
      setFist: function(isFist) {
       if (this.fist == isFist) {
         return;
       }
       this.dispatchEvent(isFist ? "onFist" : "onFistReleased"); //TODO give info about the forces 
       this.fist = isFist;
      }
      
      
      
      
  };
  
  
  Inheritance(LeapMotion,EventDispatcher,true,true);
  return new LeapMotion(); //singleton
});

