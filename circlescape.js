let lineArrayX = [];
let lineArrayY = [];

let bgLayer1, fgLayer1, subLayer1;
let bgLayer2, fgLayer2, subLayer2;

let drawingIsActive = 1;

let tileNum = 5;

let sliderImg;
let holdingImg;

let circleIsActive = 1;

function preload(){
  fgLayer1 = loadImage('assets/background.jpg');
    fgLayer2 = loadImage('assets/background2.jpg');
}

function setup() {
  createCanvas(windowWidth, windowHeight);

  bgLayer1 = createGraphics(windowWidth, windowHeight);

  subLayer1 = createGraphics(windowWidth, windowHeight);
  bgLayer1.background(appBg);
  bgLayer1.strokeWeight(12);
  bgLayer1.stroke(0);
  bgLayer1.noFill();


  bgLayer2 = createGraphics(windowWidth, windowHeight);

  subLayer2 = createGraphics(windowWidth, windowHeight);
  bgLayer2.background(appBg);
  bgLayer2.strokeWeight(12);
  bgLayer2.stroke(0);
  bgLayer2.noFill();


  sliderImg = createGraphics(windowWidth, windowHeight);
  holdingImg = createGraphics(windowWidth, windowHeight);


  calcDimensions();
  saveNext();

}

function calcDimensions() {
  vW = width / 100;

  if (width > height) {
    vMax = width / 100;
    vMin = height / 100;
  } else {
    vMax = height / 100;
    vMin = width / 100;
  }
}


function keyPressed(){
  circleIsActive = !circleIsActive;
}

function touchStarted() {
// nothing for now
  return false;
}

function touchMoved() {

  if (drawingIsActive) {

    if (circleIsActive) {

      bgLayer1.strokeWeight(5);
      lineArrayX.push(mouseX);
      lineArrayY.push(mouseY);
      bgLayer1.beginShape();
      for (i = 0; i < lineArrayX.length; i++) {
        bgLayer1.curveVertex(lineArrayX[i], lineArrayY[i]);
      }
      bgLayer1.endShape();

    } else {

      bgLayer1.strokeCap(ROUND);
      bgLayer2.strokeWeight(50);
      bgLayer2.line(pwinMouseX, pwinMouseY, winMouseX, winMouseY);
      bgLayer2.point(winMouseX, winMouseY)


    }

  } else {

    tileNum = constrain(((width / (mouseX + 20))), 1, 10);
    makeSlider(winMouseX);

  }

  return false;

}




function touchEnded() {

  if (drawingIsActive) {

    if (circleIsActive) {

      if (lineArrayX.length > 20 && dist(mouseX, mouseY, lineArrayX[0], lineArrayY[0]) < 50) {
        bgLayer1.fill(0);
        lineArrayX.push(lineArrayX[0]);
        lineArrayY.push(lineArrayY[0]);

        bgLayer1.beginShape();
        for (i = 0; i < lineArrayX.length; i++) {
          bgLayer1.curveVertex(lineArrayX[i], lineArrayY[i]);
        }
        bgLayer1.curveVertex(lineArrayX[0], lineArrayY[0]);
        bgLayer1.endShape();
      }

      lineArrayX = [];
      lineArrayY = [];
      bgLayer1.fill(0, 1);
    }

    else {

    }
  } else {
    //nothing for now
  }

  return false;

}


function draw() {

  if (drawingIsActive) {
    subLayer1.blendMode(BLEND);
    subLayer1.image(bgLayer1, 0, 0, width, height);
    subLayer1.blendMode(LIGHTEST);
    subLayer1.image(fgLayer1, 0, 0, width, height);
    image(subLayer1, 0, 0, width, height);

    subLayer2.blendMode(BLEND);
    subLayer2.image(bgLayer2, 0, 0, width, height);
    subLayer2.blendMode(LIGHTEST);
    subLayer2.image(fgLayer2, 0, 0, width, height);
    blendMode(DARKEST);
    image(subLayer2, 0, 0, width, height);

  } else {
    for (let i = 0; i < tileNum; i++) {
      for (let j = 0; j < tileNum; j++) {
        blendMode(BLEND);
        image(subLayer1, (width / tileNum) * i, (height / tileNum) * j, width / tileNum, height / tileNum);
        blendMode(DARKEST);
        image(subLayer2, (width / tileNum) * i, (height / tileNum) * j, width / tileNum, height / tileNum);
      }
    }
    blendMode(BLEND);
    image(sliderImg, 0, 0, width, height);
  }

}
