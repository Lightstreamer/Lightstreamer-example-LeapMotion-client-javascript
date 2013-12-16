define(["Executor"],function(Executor) {
  
  var GameLoop = function(game,field,frameRate,baseRate) {
    this.thread = null;
    this.game = game;
    this.field = field;
    
    this.frameRate = frameRate;
    this.rateFactor = frameRate/baseRate;
  };
  
  GameLoop.prototype = {
     start: function() {
       if (this.thread) {
         return;
       }
       this.thread = Executor.addRepetitiveTask(this.calculate,this.frameRate,this);
       
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
