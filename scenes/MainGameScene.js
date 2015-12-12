function MainGameScene() {

  this.convergame = null;

  this.update = function(time) {

  };

  this.render = function() {
    this.convergame.draw.blankCanvas('#7ec0ee'); // sky blue
  };

  this.init = function(convergame) {
    this.convergame = convergame;
  };

}
