function MainGameScene() {

  this.convergame = null;

  this.playerBalloon = null;
  this.rockThrowers = [];
  this.rocks = [];

  this.rockThrowerLimit = 2;

  this.rockThrowerLimitIncreaseTimer = 0;
  this.addNewRockThrowersTimer = 0;

  this.rockThrowerLimitIncreaseTimerExpiration = 30;

  this.gameTime = 0;

  this.balloonDestroySound = new Audio('audio/balloonDestroy.ogg');
  this.windSound = new Audio('audio/wind.ogg');

  this.update = function(time) {

    // Game over checking
    if (this.playerBalloon.destroyed && this.playerBalloon.y < -400 ) {
      this.convergame.scene.changeScene(startScene);
    }

    if (!this.playerBalloon.destroyed) {
      this.gameTime += time;
    }

    // Increase rock thrower limit every so often
    this.rockThrowerLimitIncreaseTimer += time;

    if(this.rockThrowerLimitIncreaseTimer > this.rockThrowerLimitIncreaseTimerExpiration) {
      this.rockThrowerLimit++;
      this.rockThrowerLimitIncreaseTimer = 0;
    }

    // Add new rock throwers
    this.addNewRockThrowersTimer += time;

    if (this.addNewRockThrowersTimer > 2.5) {

      if (this.rockThrowers.length < this.rockThrowerLimit) {
        var rockThrower = new RockThrower();
        rockThrower.init(convergame);
        this.rockThrowers.push(rockThrower);
      }

      this.addNewRockThrowersTimer = 0;
    }

    // Left right button handling
    if (this.convergame.input.mouse.isPointerWithinRect(1920-170, 1080*0.5, 150, 150) &&
        this.convergame.input.mouse.isLeftButtonPressed()) {
      this.playerBalloon.toggleLeftRight();
      this.convergame.input.mouse.resetButtonState();
      if (this.windSound.readyState>0) {
        this.windSound.currentTime = 0;
        this.windSound.play();
      }
    }

    // Down up button handling
    if (this.convergame.input.mouse.isPointerWithinRect(1920-170, 1080*0.5+170, 150, 150) &&
        this.convergame.input.mouse.isLeftButtonPressed()) {
      this.playerBalloon.toggleDownUp();
      this.convergame.input.mouse.resetButtonState();
      if (this.windSound.readyState>0) {
        this.windSound.currentTime = 0;
        this.windSound.play();
      }
    }

    this.playerBalloon.update(time);

    // Update rock throwers
    for (var i = 0; i < this.rockThrowers.length; i++) {
      this.rockThrowers[i].update(time);
    }

    // Update rocks
    for (i = 0; i < this.rocks.length; i++) {
      this.rocks[i].update(time);
      if (this.rocks[i].y<0 || this.rocks[i].x<0 || this.rocks[i].x>1920-190) {
        this.rocks.splice(i, 1);
        i--;
      }
    }

    // Check for rock balloon collision
    var balloonHitRadius = this.playerBalloon.radius*0.80;
    for (i = 0; i < this.rocks.length; i++) {
      if (this.rocks[i].x > this.playerBalloon.x-balloonHitRadius &&
          this.rocks[i].x < this.playerBalloon.x+balloonHitRadius &&
          this.rocks[i].y > this.playerBalloon.y-balloonHitRadius &&
          this.rocks[i].y < this.playerBalloon.y+balloonHitRadius) {

        this.playerBalloon.destroy();

        this.rocks.splice(i, 1);
        i--;

      }
    }

  };

  this.render = function() {
    this.convergame.draw.blankCanvas('#7ec0ee'); // sky blue

    this.convergame.draw.rectangle(0, 1080-100, 1920, 100, '#000', '#7cfc00'); // grass

    this.playerBalloon.render();

    this.convergame.draw.rectangle(1920-190, 0, 190, 1080-100, '#000', '#b2b2b2'); // building

    this.convergame.draw.text(1920-190+10, 40, '#000', 32, 'sans-serif', 'left', 'Time:');
    this.convergame.draw.text(1920-190+10+150, 80, '#000', 32, 'sans-serif', 'right', this.gameTime.toFixed(2));

    var leftRightBtnString = 'Left';
    if (this.playerBalloon.movingRight) {
      leftRightBtnString = 'Right';
    }
    this.convergame.draw.rectangle(1920-170, 1080*0.5, 150, 150, '#000', '#7ec066');
    this.convergame.draw.text(1920-170+7+70, 1080*0.5+85, '#333', 32, 'sans-serif', 'center', leftRightBtnString);

    var upDownBtnString = 'Down';
    if (this.playerBalloon.movingUp) {
      upDownBtnString = 'Up';
    }
    this.convergame.draw.rectangle(1920-170, 1080*0.5+170, 150, 150, '#000', '#7ec066');
    this.convergame.draw.text(1920-170+7+70, 1080*0.5+170+85, '#333', 32, 'sans-serif', 'center', upDownBtnString);

    // Render rock throwers
    for (var i = 0; i < this.rockThrowers.length; i++) {
      this.rockThrowers[i].render();
    }

    // Render rocks
    for (i = 0; i < this.rocks.length; i++) {
      this.rocks[i].render();
    }

  };

  this.init = function(convergame) {
    this.convergame = convergame;

    this.playerBalloon = new Balloon();
    this.playerBalloon.init(convergame);

    this.rockThrowers = [];
    this.rocks = [];

    this.rockThrowerLimit = 1;

    this.addNewRockThrowersTimer = 0;
    this.rockThrowerLimitIncreaseTimer = 0;

    this.gameTime = 0;
  };

  this.setDifficulty = function(difficulty) {
    if (difficulty=='casual') {
      this.rockThrowerLimit = 1;
      this.rockThrowerLimitIncreaseTimerExpiration = 60;
    } else if (difficulty=='easy') {
      this.rockThrowerLimit = 2;
      this.rockThrowerLimitIncreaseTimerExpiration = 30;
    } else if (difficulty=='normal') {
      this.rockThrowerLimit = 3;
      this.rockThrowerLimitIncreaseTimerExpiration = 30;
    } else if (difficulty=='hard') {
      this.rockThrowerLimit = 4;
      this.rockThrowerLimitIncreaseTimerExpiration = 20;
    } else if (difficulty=='extreme') {
      this.rockThrowerLimit = 5;
      this.rockThrowerLimitIncreaseTimerExpiration = 10;
    }
  };

}
