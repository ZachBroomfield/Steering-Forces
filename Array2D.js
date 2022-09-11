function Array2D(width, height) {
  // create a 1D array that interfaces as a 2D array
  // index at (x, y) = x + (y * width)
  this._constructor = function(width, height) {
    this.values = new Array(width * height);
    this.width = width;
    this.height = height;
  }

  this.get = function(x, y) {
    return this.values[x + (y * this.width)];
  }

  this.set = function(x, y, value) {
    this.values[x + (y * this.width)] = value;
  }

  this._constructor(width, height);
}