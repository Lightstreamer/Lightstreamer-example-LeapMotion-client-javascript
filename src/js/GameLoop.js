define(["Executor"],function(Executor) {
  
  var GameLoop = function(game,field,frameInterval,baseRate) {
    this.thread = null;
    this.game = game;
    this.field = field;
    
    this.frameInterval = frameInterval;
    this.rateFactor = frameInterval/baseRate;
  };
  
  GameLoop.prototype = {
     start: function() {
       if (this.thread) {
         return;
       }
       this.thread = Executor.addRepetitiveTask(this.calculate,this.frameInterval,this);
       
     },
     stop: function() {
       if (!this.thread) {
         return;
       }
       Executor.stopRepetitiveTask(this.thread);
       delete(this.thread);
     },
     calculate: function() {
       var f = this.rateFactor;
       this.game.forEachPlayer(function(player) {
         player.calculate(f);
       });
       this.field.render();
     }
  };
  
  
  return GameLoop;  
  
  
});
