// track the height of the next UI element and increment between elements
let heightOffset = 10;

function createUI(ui) {
  // create each individual UI section
  createVehiclesUI(ui);
  
  createFlowFieldUI(ui);

  createFlockingUI(ui);

  createAlignUI(ui);

  createCohesionUI(ui);

  createSeparateUI(ui);
}

function createVehiclesUI(ui) {
  ui.vehicles = {}

  // create and place description span
  ui.vehicles.span = createSpan('Number of Vehicles');
  ui.vehicles.span.position(width + 4, heightOffset);

  heightOffset += 20;


  // create and place slider with span to display value
  ui.vehicles.slider = createSlider(1, 400, state.numVehicles, 1);
  ui.vehicles.slider.position(width, heightOffset);
  ui.vehicles.spanValue = createSpan(ui.vehicles.slider.value());
  ui.vehicles.spanValue.position(width + 150, heightOffset);

  heightOffset += 70;
}

function createFlowFieldUI(ui) {
  ui.ff = {};

  // create and place enable/disable checkbox
  ui.ff.checkbox = createCheckbox('Flow Field', true);
  ui.ff.checkbox.position(width, heightOffset);
  
  // register callback function for change event
  ui.ff.checkbox.changed(onFFCheckEvent);

  heightOffset += 30;

  // create and place description span
  ui.ff.spanRates = createSpan('Rate of change');
  ui.ff.spanRates.position(width + 4, heightOffset);

  heightOffset += 20;

  // create and place slider with span to display value
  ui.ff.sliderXRate = createSlider(-0.02, 0.02, state.flowfield.xRate, 0.001);
  ui.ff.sliderXRate.position(width, heightOffset);
  ui.ff.spanXRateValue = createSpan(ui.ff.sliderXRate.value());
  ui.ff.spanXRateValue.position(width + 150, heightOffset);

  heightOffset += 20;

  // create and place slider with span to display value
  ui.ff.sliderYRate = createSlider(-0.02, 0.02, state.flowfield.yRate, 0.001);
  ui.ff.spanYRateValue = createSpan(ui.ff.sliderYRate.value());
  ui.ff.spanYRateValue.position(width + 150, heightOffset);
  ui.ff.sliderYRate.position(width, heightOffset);

  heightOffset += 30;

  // create and place description span
  ui.ff.spanWeight = createSpan('Weighting');
  ui.ff.spanWeight.position(width + 4, heightOffset);

  heightOffset += 20;

  // create and place slider with span to display value
  ui.ff.sliderWeight = createSlider(0, 4, state.flowfield.mult, 0.1);
  ui.ff.spanWeightValue = createSpan(ui.ff.sliderWeight.value());
  ui.ff.spanWeightValue.position(width + 150, heightOffset);
  ui.ff.sliderWeight.position(width, heightOffset);

  heightOffset += 70;
}

function createFlockingUI(ui) {
  ui.flock = {};

  // create and place enable/disable checkbox
  ui.flock.checkbox = createCheckbox('Flocking', true);
  ui.flock.checkbox.changed(onFlockCheckEvent);
  ui.flock.checkbox.position(width, heightOffset);

  heightOffset += 40;
}

function createAlignUI(ui) {
  ui.align = {};

  // create and place enable/disable checkbox
  ui.align.checkbox = createCheckbox('Alignment', true);
  ui.align.checkbox.changed(onAlignCheckEvent);
  ui.align.checkbox.position(width, heightOffset);

  heightOffset += 30;

  // create and place description span
  ui.align.spanWeight = createSpan('Weighting');
  ui.align.spanWeight.position(width + 4, heightOffset);

  heightOffset += 20;

  // create and place slider with span to display value
  ui.align.sliderWeight = createSlider(0, 4, state.align.mult, 0.1);
  ui.align.sliderWeight.position(width, heightOffset);
  ui.align.spanWeightValue = createSpan(ui.align.sliderWeight.value());
  ui.align.spanWeightValue.position(width + 150, heightOffset);

  heightOffset += 20;

  // create and place description span
  ui.align.spanRadius = createSpan('Sensing radius');
  ui.align.spanRadius.position(width + 4, heightOffset);

  heightOffset += 20;

  // create and place slider with span to display value
  ui.align.sliderRadius = createSlider(0, 200, state.align.radius, 1);
  ui.align.sliderRadius.position(width, heightOffset);
  ui.align.spanRadiusValue = createSpan(ui.align.sliderRadius.value());
  ui.align.spanRadiusValue.position(width + 150, heightOffset);

  heightOffset += 40;
}

function createCohesionUI(ui) {
  ui.coh = {};

  // create and place enable/disable checkbox
  ui.coh.checkbox = createCheckbox('Cohesion', true);
  ui.coh.checkbox.changed(onCohesionCheckEvent);
  ui.coh.checkbox.position(width, heightOffset);
  
  heightOffset += 30;

  // create and place description span
  ui.coh.spanWeight = createSpan('Weighting');
  ui.coh.spanWeight.position(width + 4, heightOffset);

  heightOffset += 20;

  // create and place slider with span to display value
  ui.coh.sliderWeight = createSlider(0, 4, state.cohesion.mult, 0.1);
  ui.coh.spanWeightValue = createSpan(ui.coh.sliderWeight.value());
  ui.coh.spanWeightValue.position(width + 150, heightOffset);
  ui.coh.sliderWeight.position(width, heightOffset);

  heightOffset += 20;

  // create and place description span
  ui.coh.spanRadius = createSpan('Sensing radius');
  ui.coh.spanRadius.position(width + 4, heightOffset);

  heightOffset += 20;

  // create and place slider with span to display value
  ui.coh.sliderRadius = createSlider(0, 200, state.cohesion.radius, 1);
  ui.coh.sliderRadius.position(width, heightOffset);
  ui.coh.spanRadiusValue = createSpan(ui.coh.sliderRadius.value());
  ui.coh.spanRadiusValue.position(width + 150, heightOffset);

  heightOffset += 40;
}

function createSeparateUI(ui) {
  ui.sep = {};

  // create and place enable/disable checkbox
  ui.sep.checkbox = createCheckbox('Separation', true);
  ui.sep.checkbox.changed(onSeparateCheckEvent);
  ui.sep.checkbox.position(width, heightOffset);

  heightOffset += 30;

  // create and place description span
  ui.sep.spanWeight = createSpan('Weighting');
  ui.sep.spanWeight.position(width + 4, heightOffset);

  heightOffset += 20;

  // create and place slider with span to display value
  ui.sep.sliderWeight = createSlider(0, 4, state.separate.mult, 0.1);
  ui.sep.spanWeightValue = createSpan(ui.sep.sliderWeight.value());
  ui.sep.spanWeightValue.position(width + 150, heightOffset);
  ui.sep.sliderWeight.position(width, heightOffset);

  heightOffset += 20;

  // create and place description span
  ui.sep.spanRadius = createSpan('Sensing radius');
  ui.sep.spanRadius.position(width + 4, heightOffset);

  heightOffset += 20;

  // create and place slider with span to display value
  ui.sep.sliderRadius = createSlider(0, 200, state.separate.radius, 1);
  ui.sep.sliderRadius.position(width, heightOffset);
  ui.sep.spanRadiusValue = createSpan(ui.sep.sliderRadius.value());
  ui.sep.spanRadiusValue.position(width + 150, heightOffset);

  heightOffset += 40;
}

function updateUI() {
  // ensure that each value span displays correct value, even when actively adjusting slider

  ui.vehicles.spanValue.html(ui.vehicles.slider.value());

  ui.ff.spanXRateValue.html(ui.ff.sliderXRate.value());
  ui.ff.spanYRateValue.html(ui.ff.sliderYRate.value());
  ui.ff.spanWeightValue.html(ui.ff.sliderWeight.value());

  ui.align.spanWeightValue.html(ui.align.sliderWeight.value());
  ui.align.spanRadiusValue.html(ui.align.sliderRadius.value());

  ui.coh.spanWeightValue.html(ui.coh.sliderWeight.value());
  ui.coh.spanRadiusValue.html(ui.coh.sliderRadius.value());

  ui.sep.spanWeightValue.html(ui.sep.sliderWeight.value());
  ui.sep.spanRadiusValue.html(ui.sep.sliderRadius.value());
}

function updateState(state) {
  // ensure that state object holds accurate values, even when actively adjusting slider

  state.numVehicles = ui.vehicles.slider.value();

  state.flowfield.xRate = ui.ff.sliderXRate.value();
  state.flowfield.yRate = ui.ff.sliderYRate.value();
  state.flowfield.mult = ui.ff.sliderWeight.value();

  state.align.mult = ui.align.sliderWeight.value();
  state.align.radius = ui.align.sliderRadius.value();

  state.cohesion.mult = ui.coh.sliderWeight.value();
  state.cohesion.radius = ui.coh.sliderRadius.value();

  state.separate.mult = ui.sep.sliderWeight.value();
  state.separate.radius = ui.sep.sliderRadius.value();
}

// event handlers to update state object

function onFFCheckEvent() {
  if (ui.ff.checkbox.checked()) {
    state.flowfield.enabled = true;
  } else {
    state.flowfield.enabled = false;
  }
}

function onFlockCheckEvent() {
  if (ui.flock.checkbox.checked()) {
    state.flocking.enabled = true;
  } else {
    state.flocking.enabled = false;
  }
}

function onAlignCheckEvent() {
  if (ui.align.checkbox.checked()) {
    state.align.enabled = true;
  } else {
    state.align.enabled = false;
  }
}

function onCohesionCheckEvent() {
  if (ui.coh.checkbox.checked()) {
    state.cohesion.enabled = true;
  } else {
    state.cohesion.enabled = false;
  }
}

function onSeparateCheckEvent() {
  if (ui.sep.checkbox.checked()) {
    state.separate.enabled = true;
  } else {
    state.separate.enabled = false;
  }
}