function RockThrower() {

  this.convergame = null;

  this.x = 1920/2;
  this.y = 1080-110;

  this.movementTimer = 0;
  this.changeDirectionTimer = 0;

  this.movingRight = true;

  this.update = function(time) {

    // Perform movement
    this.movementTimer += time;
    if(this.movementTimer>0.025) {

      var xOffset = 0.75 * 3;

      if (!this.movingRight) {
        xOffset = -xOffset;
      }

      this.x += xOffset;

      this.movementTimer = 0;
    }

    // Change direction
    this.changeDirectionTimer += time;
    if(this.changeDirectionTimer>4) {
      if (Math.floor(Math.random()*100)<50) {
        this.movingRight = !this.movingRight;
      }
      this.changeDirectionTimer = 0;
    }

    // Ensure rock thrower stays within the screen
    while (this.x-this.radius<0+5) {
      this.x = this.x + 0.1;
    }

    while (this.x+this.radius>1920-5) {
      this.x = this.x - 0.1;
    }

  };

  this.render = function() {

    var centreX = this.x;
    var centreY = this.y;

    this.convergame.draw.line(centreX, centreY - 20, centreX, centreY + 20, '#000', 3);
    this.convergame.draw.line(centreX, centreY, centreX - 15, centreY - 20, '#000', 3);
    this.convergame.draw.line(centreX, centreY, centreX + 15, centreY - 20, '#000', 3);
    this.convergame.draw.line(centreX, centreY + 20, centreX - 15, centreY + 40, '#000', 3);
    this.convergame.draw.line(centreX, centreY + 20, centreX + 15, centreY + 40, '#000', 3);
    this.convergame.draw.circle(centreX, centreY - 30, 7.5, '#000', '#FFF', 5);

  };

  this.init = function(convergame) {
    this.convergame = convergame;

    if (Math.floor(Math.random()*100)<50) {
      this.movingRight = !this.movingRight;
    }
  };

}
