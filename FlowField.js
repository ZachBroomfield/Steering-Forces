function FlowField(resolution) {

  
  this._constructor = function(resolution) {
    // construct flow field based on required resolution and canvas dimensions
    this.resolution = resolution;

    this.cols = Math.ceil(width / this.resolution);
    this.rows = Math.ceil(height / this.resolution);
    this.field = new Array2D(this.cols, this.rows);
    
    // holds the x and y offset values that will be used at the start of 
    // each new flow field creation
    this.xOffStart = 0;
    this.yOffStart = 0;
  
    this.createNextFlowField();
  }

  this.createNextFlowField = function() {
    // creates a new flow field that starts from current value of xOffStart and yOffStart
    let xOff = this.xOffStart;
    for (let i = 0; i < this.cols; i++) {
      let yOff = this.yOffStart;
      for (let j = 0; j < this.rows; j++) {
        // generate angle from Perlin Noise using current value of xOff and yOff
        let angle = map(noise(xOff, yOff), 0, 1, 0, PI * 4);

        // sets the value at (i, j) to new vector with specified angle
        this.field.set(i, j, p5.Vector.fromAngle(angle));

        yOff += 0.05;
      }
      xOff += 0.05;
    }
  }

  this.lookup = function(lookup) {
    // calculate which flow field vector lookup object is currently on
    let column = Math.floor(constrain(lookup.x / this.resolution, 0, this.cols - 1));
    let row = Math.floor(constrain(lookup.y / this.resolution, 0, this.rows - 1));

    // return the value of current flow field vector
    return this.field.get(column, row).copy();
  }

  this.drawVector = function(vec, x, y, mag) {
    // draw each flow field vector without translating canvas, to minimise performance loss
    stroke(200, 100);
    vec.setMag(mag);
    
    // offset ensures vector is drawn in the middle of it's area of effect, instead of top-left corner
    const offset = Math.floor(this.resolution / 2);
    line(x + offset, y + offset, x + vec.x + offset, y + vec.y + offset);
  }

  this.update = function(xRate, yRate) {
    // update the value for the start of each flow field creation by the given rate
    // if called each frame with a non-zero value, changes the flow field
    // that is generated each frame by given rate
    this.xOffStart += xRate;
    this.yOffStart += yRate;

    this.createNextFlowField()
  }

  this.draw = function() {
    // draws each flow field vector
    for (let i = 0; i < this.cols; i++) {
      for (let j = 0; j < this.rows; j++) {
        this.drawVector(this.field.get(i, j), i * this.resolution, j * this.resolution, this.resolution - 2);
      }
    }
  }

  this._constructor(resolution);
}
