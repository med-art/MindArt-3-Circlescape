let lineArrayX = [];
let lineArrayY = [];
let bgLayer1, fgLayer1, subLayer1;
let bgLayer2, fgLayer2, subLayer2;
let bgLayer3, fgLayer3, subLayer3;
let bg;
let drawingIsActive = 1;
let tileNum = 2;
let sliderImg;
let introElement;
let currentLayer = 1;
let audio;
let ellipseSize;
let inverter = 1;
let arcRadius;
let tempCosX, tempSinY;
let introLayer;
let alphaTemp = 0.02;

function preload() {
  fgLayer1 = loadImage('assets/s1-1.jpg');
  fgLayer2 = loadImage('assets/s1-2.jpg');
  fgLayer3 = loadImage('assets/s1-3.jpg');
  audio = loadSound('assets/audio_01.mp3');
  click = loadSound('assets/click.mp3');
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  calcDimensions();
  textLayer = createGraphics(windowWidth, windowHeight);
  bgLayer1 = createGraphics(windowWidth, windowHeight);
  subLayer1 = createGraphics(windowWidth, windowHeight);
  bgLayer1.background(255, 240, 245);
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
  introLayer = createGraphics(windowWidth, windowHeight);
  sliderImg = createGraphics(windowWidth, windowHeight);
  introElement = createGraphics(windowWidth, windowHeight);
  driftY = height / 3;
  ellipseSize = vMax * 20;
  arcRadius = vMin * 35;
  slide = 0;
  slideShow();
  //may need background fill.
}

function touchMoved() {
  if (introState === 3) {
    if (drawingIsActive && eraseBoolean === 0) {
      if (currentLayer === 1) {
        bgLayer1.strokeWeight(12);
        lineArrayX.push(winMouseX);
        lineArrayY.push(winMouseY);
        bgLayer1.beginShape();
        for (i = 0; i < lineArrayX.length; i++) {
          bgLayer1.curveVertex(lineArrayX[i], lineArrayY[i]);
        }
        bgLayer1.endShape();
      } else if (currentLayer === 2) {
        bgLayer2.strokeWeight(12);
        lineArrayX.push(winMouseX);
        lineArrayY.push(winMouseY);
        bgLayer2.beginShape();
        for (i = 0; i < lineArrayX.length; i++) {
          bgLayer2.curveVertex(lineArrayX[i], lineArrayY[i]);
        }
        bgLayer2.endShape();
      } else if (currentLayer === 3) {
        bgLayer3.strokeWeight(12);
        lineArrayX.push(winMouseX);
        lineArrayY.push(winMouseY);
        bgLayer3.beginShape();
        for (i = 0; i < lineArrayX.length; i++) {
          bgLayer3.curveVertex(lineArrayX[i], lineArrayY[i]);
        }
        bgLayer3.endShape();
      }
    } else if (drawingIsActive && eraseBoolean) {
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
    } else {
      tileNum = constrain(((width / (winMouseX + 20))), 1, 10);
      makeSlider(winMouseX);
    }
  } else {
    if (slide > 0) {
      if (dist(tempCosX, tempSinY, winMouseX, winMouseY) < ellipseSize / 2) {
        ellipseSize = ellipseSize * 0.999;
        arcRadius = arcRadius * 0.9995;
        alphaTemp = 0.02;
      }
    }
  }
  return false;
}

function touchEnded() {
  if (drawingIsActive) {
    if (currentLayer === 1) {
      if (lineArrayX.length > 20 && dist(winMouseX, winMouseY, lineArrayX[0], lineArrayY[0]) < 250) {
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
    } else if (currentLayer === 2) {
      if (lineArrayX.length > 20 && dist(winMouseX, winMouseY, lineArrayX[0], lineArrayY[0]) < 250) {
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
    } else if (currentLayer === 3) {
      if (lineArrayX.length > 20 && dist(winMouseX, winMouseY, lineArrayX[0], lineArrayY[0]) < 250) {
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
  }
  alphaTemp = 0;
  //  return false;
}

function draw() {
  if (introState === 3) {
    subLayer2.blendMode(MULTIPLY);
    subLayer1.blendMode(BLEND);
    subLayer1.image(bgLayer1, 0, 0, width, height);
    subLayer1.blendMode(LIGHTEST);
    subLayer1.image(fgLayer1, 0, 0, vMax * 100, vMax * 100);
    subLayer2.image(subLayer1, 0, 0, width, height);
    subLayer1.blendMode(BLEND);
    subLayer1.image(bgLayer2, 0, 0, width, height);
    subLayer1.blendMode(LIGHTEST);
    subLayer1.image(fgLayer2, 0, 0, vMax * 100, vMax * 100);
    subLayer2.image(subLayer1, 0, 0, width, height);
    subLayer1.blendMode(BLEND);
    subLayer1.image(bgLayer3, 0, 0, width, height);
    subLayer1.blendMode(LIGHTEST);
    subLayer1.image(fgLayer3, 0, 0, vMax * 100, vMax * 100);
    subLayer2.image(subLayer1, 0, 0, width, height);
    background(255);

    if (drawingIsActive) {
      image(subLayer2, 0, 0, width, height);
    } else if (!drawingIsActive) {
      {
        for (let i = 0; i < tileNum; i++) {
          for (let j = 0; j < tileNum; j++) {
            blendMode(DARKEST);
            image(subLayer2, (width / tileNum) * i, (height / tileNum) * j, width / tileNum, height / tileNum);
          }
        }
        blendMode(BLEND);
        image(sliderImg, 0, 0, width, height);
      }
    }
    subLayer2.clear();
  } else {
    blendMode(BLEND);
    background(241, 181, 0); // include an alphaTemp?
    if (slide > 0) {
      tempCosX = (arcRadius * cos(radians(driftY / 3))) + width / 2;
      tempSinY = (arcRadius * sin(radians(driftY / 3))) + height / 2;
      fill('#469ede');
      stroke(255, 255, 255, 50);
      ellipse(width / 2, height / 2, arcRadius * 2, arcRadius * 2);
      stroke('#469ede');
      strokeWeight(10);
      fill(255, 255, 255, 100);
      ellipse(tempCosX, tempSinY, ellipseSize, ellipseSize);
      driftY += 1.1;
      textLayer.text(introText[slide - 1], width / 2, (height / 6) * (slide));
    }
    image(introElement, 0, 0, width, height);
    image(textLayer, 0, 0, width, height);
  }
}

function windowResized() {
  paint.resizeCanvas(windowWidth, windowHeight);
  sliderImg.resizeCanvas(windowWidth, windowHeight);
  resizeCanvas(windowWidth, windowHeight);
  calcDimensions();
  removeElements();
  makeSwatch();
  saveNext();
}

function colorAlpha(aColor, alpha) {
  var c = color(aColor);
  return color('rgba(' + [red(c), green(c), blue(c), alpha].join(',') + ')');
}
