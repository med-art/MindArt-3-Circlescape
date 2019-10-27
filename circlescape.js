let lineArrayX = [];
let lineArrayY = [];

let bgLayer1, fgLayer1, subLayer1;
let bgLayer2, fgLayer2, subLayer2;
let bgLayer3, fgLayer3, subLayer3;
let bg;

let drawingIsActive = 1;

let tileNum = 5;
let sliderImg;
let holdingImg;

let currentLayer = 1;

function preload() {
  fgLayer1 = loadImage('assets/s1-1.jpg');
  fgLayer2 = loadImage('assets/s1-2.jpg');
  fgLayer3 = loadImage('assets/s1-3.jpg');

}

function setup() {
  createCanvas(windowWidth, windowHeight);

  bgLayer1 = createGraphics(windowWidth, windowHeight);
  subLayer1 = createGraphics(windowWidth, windowHeight);
  bgLayer1.background(255);
  bgLayer1.strokeWeight(12);
  bgLayer1.stroke(0);
  bgLayer1.noFill();

  bgLayer2 = createGraphics(windowWidth, windowHeight);
  subLayer2 = createGraphics(windowWidth, windowHeight);
  bgLayer2.background(255);
  bgLayer2.strokeWeight(12);
  bgLayer2.stroke(0);
  bgLayer2.noFill();

  bgLayer3 = createGraphics(windowWidth, windowHeight);
  subLayer3 = createGraphics(windowWidth, windowHeight);
  bgLayer3.background(255);
  bgLayer3.strokeWeight(12);
  bgLayer3.stroke(0);
  bgLayer3.noFill();

  sliderImg = createGraphics(windowWidth, windowHeight);
  holdingImg = createGraphics(windowWidth, windowHeight);

  calcDimensions();
  makeSwatch();


}




function touchMoved() {

  if (drawingIsActive && eraseBoolean === 0) {

    if (currentLayer === 1) {
      bgLayer1.strokeWeight(12);
      lineArrayX.push(mouseX);
      lineArrayY.push(mouseY);
      bgLayer1.beginShape();
      for (i = 0; i < lineArrayX.length; i++) {
        bgLayer1.curveVertex(lineArrayX[i], lineArrayY[i]);
      }
      bgLayer1.endShape();
    }

    else if (currentLayer === 2) {
        bgLayer2.strokeWeight(12);
      lineArrayX.push(mouseX);
      lineArrayY.push(mouseY);
      bgLayer2.beginShape();
      for (i = 0; i < lineArrayX.length; i++) {
        bgLayer2.curveVertex(lineArrayX[i], lineArrayY[i]);
      }
      bgLayer2.endShape();
    }

    else if (currentLayer === 3) {
        bgLayer3.strokeWeight(12);
      lineArrayX.push(mouseX);
      lineArrayY.push(mouseY);
      bgLayer3.beginShape();
      for (i = 0; i < lineArrayX.length; i++) {
        bgLayer3.curveVertex(lineArrayX[i], lineArrayY[i]);
      }
      bgLayer3.endShape();
    }

  }
  else if (drawingIsActive && eraseBoolean){
    bgLayer1.noStroke();
    bgLayer1.fill(255);
      bgLayer2.noStroke();
    bgLayer2.fill(255);
      bgLayer3.noStroke();
    bgLayer3.fill(255);
    bgLayer1.circle(winMouseX, winMouseY, 100, 100);
    bgLayer2.circle(winMouseX, winMouseY, 100, 100);
    bgLayer3.circle(winMouseX, winMouseY, 100, 100);

  bgLayer1.stroke(0);
    bgLayer2.stroke(0);
      bgLayer3.stroke(0);
    bgLayer1.noFill();
    bgLayer2.noFill();
    bgLayer3.noFill();


  }

  else {

    tileNum = constrain(((width / (mouseX + 20))), 1, 10);
    makeSlider(winMouseX);

  }



  return false;

}




function touchEnded() {

  if (drawingIsActive) {


    if (currentLayer === 1) {
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
      bgLayer1.noFill();
    }

    else if (currentLayer === 2) {
      if (lineArrayX.length > 20 && dist(mouseX, mouseY, lineArrayX[0], lineArrayY[0]) < 50) {
        bgLayer2.fill(0);
        lineArrayX.push(lineArrayX[0]);
        lineArrayY.push(lineArrayY[0]);

        bgLayer2.beginShape();
        for (i = 0; i < lineArrayX.length; i++) {
          bgLayer2.curveVertex(lineArrayX[i], lineArrayY[i]);
        }
        bgLayer2.curveVertex(lineArrayX[0], lineArrayY[0]);
        bgLayer2.endShape();
      }

      lineArrayX = [];
      lineArrayY = [];
      bgLayer2.noFill();
    }

    else if (currentLayer === 3) {
      if (lineArrayX.length > 20 && dist(mouseX, mouseY, lineArrayX[0], lineArrayY[0]) < 50) {
        bgLayer3.fill(0);
        lineArrayX.push(lineArrayX[0]);
        lineArrayY.push(lineArrayY[0]);

        bgLayer3.beginShape();
        for (i = 0; i < lineArrayX.length; i++) {
          bgLayer3.curveVertex(lineArrayX[i], lineArrayY[i]);
        }
        bgLayer3.curveVertex(lineArrayX[0], lineArrayY[0]);
        bgLayer3.endShape();
      }

      lineArrayX = [];
      lineArrayY = [];
      bgLayer3.noFill();
    }


  } else {
    //nothing for now
  }



//  return false;

}


function draw() {

  if (drawingIsActive) {
    blendMode(BLEND);
    background(255);
    subLayer1.blendMode(BLEND);
    subLayer1.image(bgLayer1, 0, 0, width, height);
    subLayer1.blendMode(LIGHTEST);
    subLayer1.image(fgLayer1, 0, 0, width, height);
    blendMode(MULTIPLY);
    image(subLayer1, 0, 0, width, height);

    subLayer2.blendMode(BLEND);
    subLayer2.image(bgLayer2, 0, 0, width, height);
    subLayer2.blendMode(LIGHTEST);
    subLayer2.image(fgLayer2, 0, 0, width, height);
    blendMode(MULTIPLY);
    image(subLayer2, 0, 0, width, height);

    subLayer3.blendMode(BLEND);
    subLayer3.image(bgLayer3, 0, 0, width, height);
    subLayer3.blendMode(LIGHTEST);
    subLayer3.image(fgLayer3, 0, 0, width, height);
    blendMode(MULTIPLY);
    image(subLayer3, 0, 0, width, height);


  } else {
    for (let i = 0; i < tileNum; i++) {
      for (let j = 0; j < tileNum; j++) {
        blendMode(BLEND);
        image(subLayer1, (width / tileNum) * i, (height / tileNum) * j, width / tileNum, height / tileNum);
        blendMode(DARKEST);
        image(subLayer2, (width / tileNum) * i, (height / tileNum) * j, width / tileNum, height / tileNum);
        blendMode(DARKEST);
        image(subLayer3, (width / tileNum) * i, (height / tileNum) * j, width / tileNum, height / tileNum);
      }
    }
    blendMode(BLEND);
    image(sliderImg, 0, 0, width, height);
  }

}
