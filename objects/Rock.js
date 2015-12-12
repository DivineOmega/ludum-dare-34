function Rock() {

  this.convergame = null;

  this.x = 1920/2;
  this.y = 1080-110;

  this.movementTimer = 0;
  this.changeDirectionTimer = 0;
  this.throwTimer = 0;

  this.movingRight = true;

  this.xOffset = 0;

  this.update = function(time) {

    // Perform movement
    this.movementTimer += time;
    if(this.movementTimer>0.025) {

      var yOffset = -0.75 * 9;

      this.y += yOffset;
      this.x += this.xOffset;

      this.movementTimer = 0;
    }

  };

  this.render = function() {

    var centreX = this.x;
    var centreY = this.y;

    this.convergame.draw.circle(centreX, centreY, 7.5, '#000', '#CCC', 2.5);

  };

  this.init = function(convergame) {
    this.convergame = convergame;

  };

  this.setPosition = function(x, y) {
    this.x = x;
    this.y = y;
  };

  this.setXOffset = function(xOffset) {
    this.xOffset = xOffset;
  };

}
