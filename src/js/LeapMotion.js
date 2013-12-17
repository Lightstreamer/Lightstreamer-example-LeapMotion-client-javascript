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
define(["Inheritance","EventDispatcher","./Constants"],
    function(Inheritance,EventDispatcher,Constants) {
  
  var FINGERS_OF_FIST = 1;
  
  var POSITIONS = {
      x: 0,
      y: 1,
      z: 2
  };
  
  function convert(frame,leapPos,axis) {
    var pos = POSITIONS[axis];

    var converter = frame.interactionBox.size[pos]/(Constants.MAX_SIZE[axis]*2); //TODO not sure if frame.interactionBox.size can change overtime or not
    var converted = leapPos[pos]/converter;
    
    if (axis == "y") {
      val = (converted/2)-Constants.MAX_SIZE[axis];
    } else {
      val = converted/2;
    }
    
    if (Math.abs(val) > Constants.MAX_SIZE[axis]) {
      if (val > 0) {
        val = Constants.MAX_SIZE[axis]-1;
      } else {
        val = -(Constants.MAX_SIZE[axis]-1);
      }
    }
    return val;
  }
  
  
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
       
        var pos = [
                   convert(frame,hand.palmPosition,"x"),
                   convert(frame,hand.palmPosition,"y"),
                   convert(frame,hand.palmPosition,"z")
                   ];
        
        this.dispatchEvent(this.isFist() ? "onFistMove" : "onPalmMove",pos);

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

