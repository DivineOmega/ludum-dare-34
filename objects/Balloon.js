function Balloon() {

  this.convergame = null;

  this.x = 1920/2;
  this.y = 250;

  this.radius = 20;

  this.growthTimer = 0;
  this.moveTimer = 0;
  this.destroyTimer = 0;

  this.movingRight = true;
  this.movingUp = true;

  this.destroyed = false;

  this.destroy = function() {
    this.destroyed = true;
  };

  this.toggleLeftRight = function() {
    this.movingRight = !this.movingRight;
  };

  this.toggleDownUp = function() {
    this.movingUp = !this.movingUp;
  };

  this.update = function(time) {

    if(this.destroyed) {
      this.destroyTimer += time;

      if (this.destroyTimer>=0.05) {

        this.y -= 0.3 * 12;
        this.x += -4 + (Math.floor(Math.random()*8+1));

        var radiusReduction = 0.125;

        if (this.radius >= radiusReduction) {
          this.radius -= radiusReduction;
        }
      }

      return;
    }

    // Grow the balloon over time
    this.growthTimer += time;

    if (this.growthTimer>=0.1) {
      this.radius += 0.15 * 0.45;
      this.growthTimer = 0;
    }

    // Perform movement
    this.moveTimer += time;

    if (this.moveTimer>=0.0125) {
      var xOffset = 0.75 * 4;
      var yOffset = -0.3 * 4;

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

    // Ensure balloon stays within the screen
    while (this.y-this.radius<0+5) {
      this.y = this.y + 0.1;
    }

    while (this.y+this.radius>(1080*0.60)-5) {
      this.y = this.y - 0.1;
    }

    while (this.x-this.radius<0+5) {
      this.x = this.x + 0.1;
    }

    while (this.x+this.radius>1920-190-5) {
      this.x = this.x - 0.1;
    }

  };

  this.render = function() {

    var centreX = this.x;
    var centreY = this.y;

    this.convergame.draw.circle(centreX, centreY, this.radius, '#000', '#F00', 5);

    var x1 = centreX;
    var y1 = centreY + this.radius + (1.5 * (this.radius/40));
    var x2 = x1;
    var y2 = y1 + 200;

    this.convergame.draw.line(x1, y1, x2, y2, '#000', 3);
  };

  this.init = function(convergame) {
    this.convergame = convergame;

    if (Math.floor(Math.random()*100)<50) {
      this.movingRight = !this.movingRight;
    }

    if (Math.floor(Math.random()*100)<50) {
      this.movingUp = !this.movingUp;
    }

  };

}
