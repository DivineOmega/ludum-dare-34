function Balloon() {

  this.convergame = null;

  this.x = 1920/2;
  this.y = 100;

  this.radius = 20;

  this.growthTimer = 0;
  this.moveTimer = 0;

  this.movingRight = true;
  this.movingUp = true;

  this.update = function(time) {

    this.growthTimer += time;

    if (this.growthTimer>=0.1) {
      this.radius += 0.15;
      this.growthTimer = 0;
    }

    this.moveTimer += time;

    if (this.moveTimer>=0.05) {
      var xOffset = 0.75;
      var yOffset = -0.3;

      if (!this.movingRight) {
        xOffset = -xOffset;
      }

      if (!this.movingUp) {
        yOffset = -yOffset;
      }

      this.x += xOffset;
      this.y += yOffset;

      this.moveTimer = 0;
    }

    while (this.y-this.radius<0+5) {
      this.y = this.y + 0.1;
    }

    while (this.y+this.radius>1080-5) {
      this.y = this.y - 0.1;
    }

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

    this.convergame.draw.circle(centreX, centreY, this.radius, '#000', '#F00', 5);

    var x1 = centreX;
    var y1 = centreY + this.radius + 3.5;
    var x2 = x1;
    var y2 = y1 + 200;

    this.convergame.draw.line(x1, y1, x2, y2, '#000', 3);
  };

  this.init = function(convergame) {
    this.convergame = convergame;
  };

}
