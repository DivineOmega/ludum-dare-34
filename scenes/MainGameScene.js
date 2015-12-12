function MainGameScene() {

  this.convergame = null;

  this.playerBalloon = null;

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

  };

  this.render = function() {
    this.convergame.draw.blankCanvas('#7ec0ee'); // sky blue

    this.playerBalloon.render();

    this.convergame.draw.rectangle(1920-170, 1080*0.5, 150, 150, '#000', '#7ec066');
    this.convergame.draw.text(1920-170+7+70, 1080*0.5+85, '#333', 32, 'sans-serif', 'center', 'Left/Right');

    this.convergame.draw.rectangle(1920-170, 1080*0.5+170, 150, 150, '#000', '#7ec066');
    this.convergame.draw.text(1920-170+7+70, 1080*0.5+170+85, '#333', 32, 'sans-serif', 'center', 'Up/Down');

  };

  this.init = function(convergame) {
    this.convergame = convergame;

    this.playerBalloon = new Balloon();
    this.playerBalloon.init(convergame);
  };

}
