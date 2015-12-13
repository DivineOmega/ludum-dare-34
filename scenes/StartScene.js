function StartScene() {

  this.convergame = null;

  this.demoBalloon = null;

  this.update = function(time) {

    this.demoBalloon.update(time);

    // Casual button
    if (this.convergame.input.mouse.isPointerWithinRect(1920-170, 120, 150, 150) &&
        this.convergame.input.mouse.isLeftButtonPressed()) {
      this.convergame.scene.changeScene(mainGameScene);
      mainGameScene.setDifficulty('casual');
    }

    // Easy button
    if (this.convergame.input.mouse.isPointerWithinRect(1920-170, 120+170, 150, 150) &&
        this.convergame.input.mouse.isLeftButtonPressed()) {
      this.convergame.scene.changeScene(mainGameScene);
      mainGameScene.setDifficulty('easy');
    }

    // Normal button
    if (this.convergame.input.mouse.isPointerWithinRect(1920-170, 120+170+170, 150, 150) &&
        this.convergame.input.mouse.isLeftButtonPressed()) {
      this.convergame.scene.changeScene(mainGameScene);
      mainGameScene.setDifficulty('normal');
    }

    // Hard button
    if (this.convergame.input.mouse.isPointerWithinRect(1920-170, 120+170+170+170, 150, 150) &&
        this.convergame.input.mouse.isLeftButtonPressed()) {
      this.convergame.scene.changeScene(mainGameScene);
      mainGameScene.setDifficulty('hard');
    }

    // Extreme button
    if (this.convergame.input.mouse.isPointerWithinRect(1920-170, 120+170+170+170+170, 150, 150) &&
        this.convergame.input.mouse.isLeftButtonPressed()) {
      this.convergame.scene.changeScene(mainGameScene);
      mainGameScene.setDifficulty('extreme');
    }

  };

  this.render = function() {
    this.convergame.draw.blankCanvas('#7ec0ee'); // sky blue

    this.convergame.draw.rectangle(0, 1080-100, 1920, 100, '#000', '#7cfc00'); // grass

    this.demoBalloon.render();

    this.convergame.draw.rectangle(1920-190, 0, 190, 1080-100, '#000', '#b2b2b2'); // building

    this.convergame.draw.text(1920/2, 250, '#F00', 64, 'sans-serif', 'center', 'Balloon Bullies', true, 4, 4, '#622');

    this.convergame.draw.text(1920/2, 400, '#000', 32, 'sans-serif', 'center', 'You\'re just a balloon, but fools want to throw rocks at you.');
    this.convergame.draw.text(1920/2, 450, '#000', 32, 'sans-serif', 'center', 'Evade their malicious attempts to expediate your destruction.');

    this.convergame.draw.text(1920/2, 550, '#000', 32, 'sans-serif', 'center', 'To begin, choose a difficulty from the windows of that bulding over there.');

    this.convergame.draw.text(1920-190+10, 40, '#000', 32, 'sans-serif', 'left', 'Time:');
    this.convergame.draw.text(1920-190+10+150, 80, '#000', 32, 'sans-serif', 'right', mainGameScene.gameTime.toFixed(2));

    this.convergame.draw.rectangle(1920-170, 120, 150, 150, '#000', '#7ec066');
    this.convergame.draw.text(1920-170+7+70, 120+85, '#333', 32, 'sans-serif', 'center', 'Casual');

    this.convergame.draw.rectangle(1920-170, 120+170, 150, 150, '#000', '#7ec066');
    this.convergame.draw.text(1920-170+7+70, 120+170+85, '#333', 32, 'sans-serif', 'center', 'Easy');

    this.convergame.draw.rectangle(1920-170, 120+170+170, 150, 150, '#000', '#7ec066');
    this.convergame.draw.text(1920-170+7+70, 120+170+170+85, '#333', 32, 'sans-serif', 'center', 'Normal');

    this.convergame.draw.rectangle(1920-170, 120+170+170+170, 150, 150, '#000', '#7ec066');
    this.convergame.draw.text(1920-170+7+70, 120+170+170+170+85, '#333', 32, 'sans-serif', 'center', 'Hard');

    this.convergame.draw.rectangle(1920-170, 120+170+170+170+170, 150, 150, '#000', '#7ec066');
    this.convergame.draw.text(1920-170+7+70, 120+170+170+170+170+85, '#333', 32, 'sans-serif', 'center', 'Extreme');

  };

  this.init = function(convergame) {
    this.convergame = convergame;

    this.demoBalloon = new Balloon();
    this.demoBalloon.init(convergame);
  };

}
