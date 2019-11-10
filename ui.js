let swatchCol = ['#004da7', "#d54288", '#fce302', '#004ea9', '#fce300', '#007c40', '#479fdf', '#92328c', '#ef6301', '#007b3d', '#fe8f1c', '#fce300'];
let newButton, saveButton;
let appBg = 250;
let fsBool = 0;
let fsButton;
let swatch1, swatch2, swatch3;
let stage = 0;
let eraseBoolean = 0;
let lE;

function calcDimensions() {
  vW = width / 100;
  hMax = height/100;
  if (width > height) {
    vMax = width / 100;
    vMin = height / 100;
    lE = width;
  } else {
    vMax = height / 100;
    vMin = width / 100;
    lE = height;
  }
}

function makeSwatch() {
  button = createImg('assets/eraseOn.png');
  button.remove();
  button = createImg('assets/eraseOff.png');
  button.position(1.5 * vMax, height - (14 * vMax));
  button.size(14 * vMax, 14 * vMax);
  button.mousePressed(makeErase);
  swatch1 = createButton("");
  swatch1.position(15 * vMax, height - (13 * vMax));
  swatch1.size(8 * vMax, 10.5 * vMax);
  swatch1.style("background-color", swatchCol[((stage * 3) + 0)]);
  swatch1.class("box");
  swatch1.mousePressed(function() {
    changeBrush(1)
  });
  swatch2 = createButton("");
  swatch2.position(23 * vMax, height - (13 * vMax));
  swatch2.size(8 * vMax, 10.5 * vMax);
  swatch2.style("background-color", swatchCol[((stage * 3) + 1)]);
  swatch2.class("box");
  swatch2.mousePressed(function() {
    changeBrush(2)
  });
  swatch3 = createButton("");
  swatch3.position(31 * vMax, height - (13 * vMax));
  swatch3.size(8 * vMax, 10.5 * vMax);
  swatch3.style('background-color', swatchCol[((stage * 3) + 2)]);
  swatch3.class("box");
  swatch3.mousePressed(function() {
    changeBrush(3)
  });
  fsButton = createImg('assets/enterFS.png');
  fsButton.style('height', '4.5vMax');
  fsButton.position(width - (7.5 * vMax), 1.5 * vMax);
  fsButton.mousePressed(fs);
  selColour = createImg('assets/colSelected.png');
  selColour.position(15 * vMax, height - (16 * vMax));
  selColour.size(8 * vMax, 16 * vMax);
  selColour.mousePressed();
  saveNext();
}

function saveNext() {
  newButton = createButton("Next")
  newButton.class("select");
  newButton.position(width - (15 * vMax), height - (12.5 * vMax));
  newButton.style('font-size', '2.6vmax');
  newButton.style('height', '4.5vmax');
  newButton.mousePressed(nextStep);
  saveButton = createButton("Save")
  saveButton.class("select");
  saveButton.style('font-size', '2.6vmax');
  saveButton.style('height', '4.5vmax');
  saveButton.position(width - (15 * vMax), height - (6.5 * vMax));
  saveButton.mousePressed(saveImg);
}

function nextStep() {
  swatch1.remove();
  swatch2.remove();
  swatch3.remove();
  button.remove();
  selColour.remove();
  drawingIsActive = !drawingIsActive;
  if (!drawingIsActive) {
      introLayer.image(subLayer1, 0, 0, width, height);
      introLayer.image(subLayer2, 0, 0, width, height);
      introLayer.image(subLayer3, 0, 0, width, height);
    makeSlider(winMouseX);
  } else {
    stage++;
    if (stage === 4) {
      stage = 0;
    }
    bgLayer1.background(255, 240, 245);
    bgLayer2.background(255, 240, 245);
    bgLayer3.background(255, 240, 245);
    subLayer1.background(appBg);
    subLayer2.background(appBg);
    subLayer3.background(appBg);
    introLayer.clear();
    clear();

    if (stage === 0) {
      fgLayer1 = loadImage('assets/s1-1.png');
      fgLayer2 = loadImage('assets/s1-2.png');
      fgLayer3 = loadImage('assets/s1-3.png');
    } else if (stage === 1) {
      fgLayer1 = loadImage('assets/s2-1.png');
      fgLayer2 = loadImage('assets/s2-2.png');
      fgLayer3 = loadImage('assets/s2-3.png');
    } else if (stage === 2) {
      fgLayer1 = loadImage('assets/s3-1.png');
      fgLayer2 = loadImage('assets/s3-2.png');
      fgLayer3 = loadImage('assets/s3-3.png');
    } else if (stage === 3) {
      fgLayer1 = loadImage('assets/s4-1.png');
      fgLayer2 = loadImage('assets/s4-2.png');
      fgLayer3 = loadImage('assets/s4-3.png');
    }
    console.log(stage);
    bgLayer1.stroke(swatchCol[stage*3]);
    bgLayer2.stroke(swatchCol[(stage*3)+1]);
    bgLayer3.stroke(swatchCol[(stage*3)+2]);


    makeSwatch();
    fsButton.remove();
    saveButton.remove();
    newButton.remove();
    currentLayer = 1;
    blendMode(BLEND);
  }
}

function changeBrush(layerSelected) {
  currentLayer = layerSelected;



  selColour.remove();
  selColour = createImg('assets/colSelected.png');
  selColour.position((15 + (8 * (layerSelected - 1))) * vMax, height - (16 * vMax));
  selColour.size(8 * vMax, 16 * vMax);
  selColour.mousePressed();
  button.remove();
  button = createImg('assets/eraseOff.png');
  button.position(1.5 * vMax, height - (14 * vMax));
  button.size(14 * vMax, 14 * vMax);
  button.mousePressed(makeErase);
  eraseBoolean = 0;
}

function makeSlider(_mouseX) {
  sliderImg.clear();
  sliderImg.stroke(255);
  sliderImg.strokeWeight(9*hMax);
  sliderImg.line(8 * hMax, 8 * hMax, 8*hMax, height - (8 * hMax));
  sliderImg.stroke("#5cf22c");
  sliderImg.strokeWeight(9*hMax);
  sliderImg.line(8 * hMax, 8 * hMax, 8*hMax, constrain(mouseY, 8*hMax, height - (8 * hMax)));
  sliderImg.imageMode(CENTER);
  sliderImg.image(sliderIcon, 8*hMax, constrain(mouseY, 8*hMax, height - (8 * hMax)), 8.5*hMax, 8.5*hMax);

}

function saveImg() {
  blendMode(BLEND);
  save('linescape' + month() + day() + hour() + second() + '.jpg');
}

function fs() {
  if (!fsBool) {
    fullscreen(1);
    fsBool = 1;
  } else {
    fullscreen(0);
    fsBool = 0;
  }
}

function makeErase() {
  selColour.remove();
  button.remove();
  button = createImg('assets/eraseOn.png');
  button.position(1.5 * vMax, height - (14 * vMax));
  button.size(14 * vMax, 14 * vMax);
  button.mousePressed(makeErase);
  eraseBoolean = 1;
}
