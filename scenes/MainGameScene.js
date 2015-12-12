function MainGameScene() {

  this.convergame = null;

  this.playerBalloon = null;
  this.rockThrower = null;
  this.rocks = [];

  this.update = function(time) {

    if (this.convergame.input.mouse.isPointerWithinRect(1920-170, 1080*0.5, 150, 150) &&
        this.convergame.input.mouse.isLeftButtonPressed()) {
      this.playerBalloon.toggleLeftRight();
      this.convergame.input.mouse.resetButtonState();
    }

    if (this.convergame.input.mouse.isPointerWithinRect(1920-170, 1080*0.5+170, 150, 150) &&
        this.convergame.input.mouse.isLeftButtonPressed()) {
      this.playerBalloon.toggleDownUp();
      this.convergame.input.mouse.resetButtonState();
    }

    this.playerBalloon.update(time);
    this.rockThrower.update(time);

    // Update rocks
    for (var i = 0; i < this.rocks.length; i++) {
      this.rocks[i].update(time);
      if (this.rocks[i].y<0) {
        this.rocks.splice(i, 1);
        i--;
      }
    }

  };

  this.render = function() {
    this.convergame.draw.blankCanvas('#7ec0ee'); // sky blue

    this.convergame.draw.rectangle(0, 1080-100, 1920, 1080, '#000', '#7cfc00');

    this.playerBalloon.render();
    this.rockThrower.render();

    this.convergame.draw.rectangle(1920-170, 1080*0.5, 150, 150, '#000', '#7ec066');
    this.convergame.draw.text(1920-170+7+70, 1080*0.5+85, '#333', 32, 'sans-serif', 'center', 'Left/Right');

    this.convergame.draw.rectangle(1920-170, 1080*0.5+170, 150, 150, '#000', '#7ec066');
    this.convergame.draw.text(1920-170+7+70, 1080*0.5+170+85, '#333', 32, 'sans-serif', 'center', 'Up/Down');

    // Render rocks
    for (var i = 0; i < this.rocks.length; i++) {
      this.rocks[i].render();
    }

  };

  this.init = function(convergame) {
    this.convergame = convergame;

    this.playerBalloon = new Balloon();
    this.playerBalloon.init(convergame);

    this.rockThrower = new RockThrower();
    this.rockThrower.init(convergame);
  };

}
