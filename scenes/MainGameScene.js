function MainGameScene() {

  this.convergame = null;

  this.playerBalloon = null;

  this.update = function(time) {
    this.playerBalloon.update(time);
  };

  this.render = function() {
    this.convergame.draw.blankCanvas('#7ec0ee'); // sky blue

    this.playerBalloon.render();
  };

  this.init = function(convergame) {
    this.convergame = convergame;

    this.playerBalloon = new Balloon();
    this.playerBalloon.init(convergame);
  };

}
