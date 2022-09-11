function Vehicle(x, y) {
  // create initial variables for vehicle
  this.pos = createVector(x, y);
  this.vel = createVector(0, 0);
  this.acc = createVector(0, 0);
  this.maxSpeed = 4;
  this.maxForce = 0.2;

  this.applyForce = function(force) {
    // adds each given force to the current acc vector
    this.acc.add(force);
  }

  this.calculateForces = function(state, flowfield, vehicles) {
    // creates 4 zero value vectors that may be changed during function execution
    let followForce = createVector(0, 0);
    let alignForce = createVector(0, 0);
    let cohesionForce = createVector(0, 0);
    let separateForce = createVector(0, 0);
    
    if (state.flowfield.enabled) {
      // if flow field is enabled, generate force upon this vehicle by flow field
      followForce = this.follow(flowfield);
    }

    if (state.flocking.enabled) {
      // if flocking is enabled, potentially generate force upon this vehicle by each flocking component
      if (state.align.enabled) {
        // if align is enabled, generate force upon this vehicle by alignment with other vehicles
        alignForce = this.align(vehicles, state.align.radius);
      }

      if (state.cohesion.enabled) {
        // if cohesion is enabled, generate force upon this vehicle by cohesion with other vehicles
        cohesionForce = this.cohesion(vehicles, state.cohesion.radius);
      }

      if (state.separate.enabled) {
        // if separate is enabled, generate force upon this vehicle by separation with other vehicles
        separateForce = this.separate(vehicles, state.separate.radius);
      }
    }

    // mutliply each force by current weighting for given force
    followForce.mult(state.flowfield.mult);
    alignForce.mult(state.align.mult);
    cohesionForce.mult(state.cohesion.mult);
    separateForce.mult(state.separate.mult);

    // apply each force to vehicles acceleration
    this.applyForce(followForce);
    this.applyForce(alignForce);
    this.applyForce(cohesionForce);
    this.applyForce(separateForce);
  }

  this.align = function(vehicles, senseRadius) {
    // create initial variables
    let sum = createVector(0, 0);
    let steering = createVector(0, 0);
    let count = 0;

    for (let i = 0; i < vehicles.length; i++) {
      // if comparing to self, immediately continue to next loop
      if (vehicles[i] === this) continue;

      // calculate distance between this and other vehicle
      let dist = p5.Vector.dist(this.pos, vehicles[i].pos);

      // check if distance is within sense radius and not zero
      if ((dist > 0) && (dist < senseRadius)) {
        // sum together current sum vector and other vehicles velocity
        sum.add(vehicles[i].vel);
        count++;
      }
    }

    // check if any other vehicles were valid
    if (count > 0) {
      // average sum vector and set magnitude to max speed
      sum.div(count);
      sum.setMag(this.maxSpeed);

      // create steering vector from desired - velocity
      steering = p5.Vector.sub(sum, this.vel);
      steering.limit(this.maxForce);
    }

    return steering;
  }

  this.cohesion = function(vehicles, senseRadius) {
    // create initial variables
    let sum = createVector(0, 0);
    let count = 0;
    let steering = createVector(0, 0);

    for (let i = 0; i < vehicles.length; i++) {
      // if comparing to self, immediately continue to next loop
      if (vehicles[i] === this) continue;

      // calculate distance between this and other vehicle
      let dist = p5.Vector.dist(this.pos, vehicles[i].pos);

      // check if distance is within sense radius and not zero
      if ((dist > 0) && (dist < senseRadius)) {
        // sum together current sum vector and other vehicles velocity
        sum.add(vehicles[i].pos);
        count++;
      }
    }

    // check if any other vehicles were valid
    if (count > 0) {
      // average sum vector
      sum.div(count);

      // create desired vector from sum - position, and set magnitude to max speed
      let desired = p5.Vector.sub(sum, this.pos);
      desired.setMag(this.maxSpeed);

      // create steering vector from desired - velocity
      steering = p5.Vector.sub(desired, this.vel);
      steering.limit(this.maxForce);
    }

    return steering;
  }

  this.separate = function(vehicles, senseRadius) {
    // create initial variables
    let sum = createVector(0, 0);
    let count = 0;
    let steering = createVector(0, 0);

    for (let i = 0; i < vehicles.length; i++) {
      // if comparing to self, immediately continue to next loop
      if (vehicles[i] === this) continue;

      // calculate distance between this and other vehicle
      let dist = p5.Vector.dist(this.pos, vehicles[i].pos);

      // check if distance is within sense radius and not zero
      if ((dist > 0) && (dist < senseRadius)) {
        // calculate vector for the difference in position of this and other vehicle
        let difference = p5.Vector.sub(this.pos, vehicles[i].pos);

        // set the magnitude of the difference vector to the inverse of distance
        difference.setMag(1 / dist);

        // sum together current sum vector and difference vector
        sum.add(difference);
        count++;
      }
    }

    // check if any other vehicles were valid
    if (count > 0) {
      // average sum vector and set magnitude to max speed
      sum.div(count);
      sum.setMag(this.maxSpeed);

      // create steering vector from desired - velocity
      steering = p5.Vector.sub(sum, this.vel);
      steering.limit(this.maxForce);
    }
    
    return steering;
  }

  this.follow = function(flowfield) {
    // get desired vector from flow field lookup
    let desired = flowfield.lookup(this.pos);
    desired.mult(this.maxSpeed);

    // create steering vector from desired - velocity
    let steering = p5.Vector.sub(desired, this.vel);
    steering.limit(this.maxForce);
    return steering;
  }

  this.update = function() {
    // add acc to vel and vel to pos
    this.vel.add(this.acc);
    this.vel.limit(this.maxSpeed);
    this.pos.add(this.vel);

    // reset acc vector for next frame
    this.acc.set(0, 0);

    // screen wrap if necessary
    this.normalisePosition();
  }

  this.draw = function() {
    // calculate angle to be drawn
    let angle = this.vel.heading() + PI / 2;

    fill('#0084FF');
    strokeWeight(1);
    push();
    // translate canvas to this position and rotate by angle
    translate(this.pos.x, this.pos.y);
    rotate(angle);

    // draw triangle after this translation/rotation so that triangle  
    // is pointing along the same angle as this velocity vector
    triangle(0, -12, -6, 12, 6, 12);
    pop();
  }

  this.normalisePosition = function() {
    // move to opposite edge of screen if vehicle leaves canvas edge
    if (this.pos.x < -6) this.pos.x = width + 6;
    if (this.pos.y < -6) this.pos.y = height + 6;
    if (this.pos.x > width + 6) this.pos.x = -6;
    if (this.pos.y > height + 6) this.pos.y = -6;
  }
}