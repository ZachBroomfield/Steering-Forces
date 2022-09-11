/*
  System to visualise the effect of multiple steering forces acting upon vehicles.
  Flow Field that acts up each vehicle individually.
  Flocking system comprised of three steering forces:
    Alignment,
    Cohesion,
    Separation.
  Ability to modify a range of values while simulation is running to see the effects.
*/

// global variables
const vehicles = [];
const ui = {};
let flowfield;
let state;

function setup() {
  // create canvas the width and height of the window being drawn to leaving space for UI elements
  createCanvas(window.innerWidth - 200, window.innerHeight);

  flowfield = new FlowField(30);

  // define initial state of the simulation as well as track any changes to state
  state = {
    numVehicles: 100,
    flowfield: {
      xRate: -0.006,
      yRate: 0.002,
      mult: 0.5,
      enabled: true,
    },
    flocking: {
      enabled: true,
    },
    align: {
      mult: 0.8,
      radius: 70,
      enabled: true,
    },
    cohesion: {
      mult: 1,
      radius: 90,
      enabled: true,
    },
    separate: {
      mult: 1.3,
      radius: 50,
      enabled: true,
    },
  };

  // create initial vehicles
  updateVehicleCount(state.numVehicles);

  createUI(ui);
}

function draw() {
  // each frame, redrawn background, then update
  background(51);

  // update UI and state with any changes from user input
  updateUI();
  updateState(state);

  // ensure vehicle count matches user input
  if (state.numVehicles != vehicles.length) {
    updateVehicleCount(state.numVehicles);
  }

  // generate and display next frame of flow field, if enabled
  if (state.flowfield.enabled) {
    flowfield.update(state.flowfield.xRate, state.flowfield.yRate)
    flowfield.draw();
  }

  // calculate and store sum of steering forces for each vehicle due
  // to flowfield and group behaviours
  for (let i = 0; i < vehicles.length; i++) {
    vehicles[i].calculateForces(state, flowfield, vehicles);
  }

  // apply steering forces after all vehicles have calculated their
  // respective forces, then draw
  for (let i = 0; i < vehicles.length; i++) {
    vehicles[i].update();
    vehicles[i].draw();
  }
}

function updateVehicleCount(newCount) {
  if (newCount < vehicles.length) {
    // if number of vehicles is to reduce, set vehicles array
    // to new, smaller value
    vehicles.length = newCount;
  } else {
    // if number of vehicles is to increase, create new vehicle
    // and end of vehicle array until correct amount
    while (newCount > vehicles.length) {
      vehicles.push(new Vehicle(random(width), random(height)));
    }
  }
}