let lineArrayX = [];
let lineArrayY = [];
let bgLayer1, fgLayer1, subLayer1;
let bgLayer2, fgLayer2, subLayer2;
let bgLayer3, fgLayer3;
let bg;
let drawingIsActive = 1;
let tileNum = 2;
let sliderImg;
let currentLayer = 1;
let audio;
let ellipseSize;
let inverter = 1;
let arcRadius;
let tempCosX, tempSinY;
let introLayer;
let alphaTemp = 0.02;
let colArray = ['#2f4fa4', '#d54489', '#fce200', '#fce300', '#007b3d', '#479fdf', '#93338d', '#f16301', '#007b3d', '#fe8f1d', '#fce300'];
let colSelected;

function preload() {
  fgLayer1 = loadImage('assets/s1-1.png');
  fgLayer2 = loadImage('assets/s1-2.png');
  fgLayer3 = loadImage('assets/s1-3.png');
  audio = loadSound('assets/audio.mp3');
  click = loadSound('assets/click.mp3');
  sliderIcon = loadImage('assets/slider.png')
}



function setup() {
  createCanvas(windowWidth, windowHeight);
  calcDimensions();
  textLayer = createGraphics(width, height);
  bgLayer1 = createGraphics(width, height);
  subLayer1 = createGraphics(width, height);
  bgLayer1.background(255, 240, 245);
  bgLayer1.strokeWeight(12);
  bgLayer1.noFill();
  bgLayer2 = createGraphics(width, height);
  subLayer2 = createGraphics(width, height);
  bgLayer2.background(255);
  bgLayer2.strokeWeight(12);
  bgLayer2.noFill();
  bgLayer3 = createGraphics(width, height);
  subLayer3 = createGraphics(width, height);
  bgLayer3.background(255);
  bgLayer3.strokeWeight(12);
  bgLayer3.noFill();
  introLayer = createGraphics(width, height);
  introLayer.blendMode(BLEND);
  sliderImg = createGraphics(width, height);
  driftY = height / 3;
  strokeWeight(10);
  ellipseSize = vMax * 20;
  arcRadius = vMin * 35;
  slide = 0;
  slideShow();

}

function touchMoved() {
  if (introState === 3) {
    if (drawingIsActive && eraseBoolean === 0) {
      lineArrayX.push(winMouseX);
      lineArrayY.push(winMouseY);
      if (currentLayer === 1) {
        bgLayer1.beginShape();
        for (i = 0; i < lineArrayX.length; i++) {
          bgLayer1.curveVertex(lineArrayX[i], lineArrayY[i]);
        }
        bgLayer1.endShape();
      } else if (currentLayer === 2) {
        bgLayer2.beginShape();
        for (i = 0; i < lineArrayX.length; i++) {
          bgLayer2.curveVertex(lineArrayX[i], lineArrayY[i]);
        }
        bgLayer2.endShape();
      } else if (currentLayer === 3) {
        bgLayer3.beginShape();
        for (i = 0; i < lineArrayX.length; i++) {
          bgLayer3.curveVertex(lineArrayX[i], lineArrayY[i]);
        }
        bgLayer3.endShape();
      }
    } else if (drawingIsActive && eraseBoolean) {

      bgLayer1.line(winMouseX, winMouseY, pwinMouseX, pwinMouseY);
      bgLayer2.line(winMouseX, winMouseY, pwinMouseX, pwinMouseY);
      bgLayer3.line(winMouseX, winMouseY, pwinMouseX, pwinMouseY);
      blendMode(BLEND);
      strokeWeight(100);
      stroke(255,90);
      line(winMouseX, winMouseY, pwinMouseX, pwinMouseY);

    } else {
        tileNum = constrain(((height / (winMouseY + 20))), 1, 10);
      makeSlider(winMouseY);
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
      if (lineArrayX.length > 20 && dist(winMouseX, winMouseY, lineArrayX[0], lineArrayY[0]) < 350) {
        bgLayer1.fill(swatchCol[stage * 3]);
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
      if (lineArrayX.length > 20 && dist(winMouseX, winMouseY, lineArrayX[0], lineArrayY[0]) < 350) {
        bgLayer2.fill(swatchCol[(stage * 3) + 1])
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
      if (lineArrayX.length > 20 && dist(winMouseX, winMouseY, lineArrayX[0], lineArrayY[0]) < 350) {
        bgLayer3.fill(swatchCol[(stage * 3) + 2])
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
  blendMode(DARKEST);
}

function draw() {


  if (introState === 3) {
    blendMode(DARKEST);
    if (currentLayer === 1) {
      subLayer1.image(bgLayer1, 0, 0, width, height);
      subLayer1.image(fgLayer1, 0, 0, width, height);
      image(subLayer1, 0, 0, width, height);
    } else if (currentLayer === 2) {
      subLayer2.image(bgLayer2, 0, 0, width, height);
      subLayer2.image(fgLayer2, 0, 0, width, height);
      image(subLayer2, 0, 0, width, height);
    } else if (currentLayer === 3) {
      subLayer3.image(bgLayer3, 0, 0, width, height);
      subLayer3.image(fgLayer3, 0, 0, width, height);
      image(subLayer3, 0, 0, width, height);
    }
    if (!drawingIsActive) {
        blendMode(BLEND);
        for (let i = 0; i < tileNum; i++) {
          for (let j = 0; j < tileNum; j++) {
            image(introLayer, (width / tileNum) * i, (height / tileNum) * j, width / tileNum, height / tileNum);
console.log(tileNum);
          }
        }
        image(sliderImg, 0, 0, width, height);

    }
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
      fill(255, 255, 255, 100);
      ellipse(tempCosX, tempSinY, ellipseSize, ellipseSize);
      driftY += 1.1;
      textLayer.text(introText[slide - 1], width / 2, (height / 6) * (slide));
    }
    image(subLayer1, 0, 0, width, height);
    image(textLayer, 0, 0, width, height);
  }
}

function windowResized() {

  resizeCanvas(windowWidth, windowHeight);
  calcDimensions();
  textLayer.resizeCanvas(windowWidth, windowHeight);

  // let introLayerNew = createGraphics(windowWidth, windowHeight);
  // introLayerNew.image(introLayer,0,0,windowWidth, windowHeight);
  // introLayer.resizeCanvas(windowWidth, windowHeight);
  // introLayer = introLayerNew;
  // changeBrush(currentLayer);
  //
  // removeElements();
  //
  //
  //
  if (introState === 3){
  //   let bgLayer1New = createGraphics(windowWidth, windowHeight);
  //   bgLayer1New.image(bgLayer1,0,0,windowWidth, windowHeight);
  //   bgLayer1.resizeCanvas(windowWidth, windowHeight);
  //   bgLayer1 = bgLayer1New;
  //   let bgLayer2New = createGraphics(windowWidth, windowHeight);
  //   bgLayer2New.image(bgLayer2,0,0,windowWidth, windowHeight);
  //   bgLayer2.resizeCanvas(windowWidth, windowHeight);
  //   bgLayer2 = bgLayer2New;
  //   let bgLayer3New = createGraphics(windowWidth, windowHeight);
  //   bgLayer3New.image(bgLayer3,0,0,windowWidth, windowHeight);
  //   bgLayer3.resizeCanvas(windowWidth, windowHeight);
  //   bgLayer3 = bgLayer3New;
  //
  //   let subLayer1New = createGraphics(windowWidth, windowHeight);
  //   subLayer1New.image(subLayer1,0,0,windowWidth, windowHeight);
  //   subLayer1.resizeCanvas(windowWidth, windowHeight);
  //   subLayer1 = subLayer1New;
  //   let subLayer2New = createGraphics(windowWidth, windowHeight);
  //   subLayer2New.image(subLayer2,0,0,windowWidth, windowHeight);
  //   subLayer2.resizeCanvas(windowWidth, windowHeight);
  //   subLayer2 = subLayer2New;
  //   let subLayer3New = createGraphics(windowWidth, windowHeight);
  //   subLayer3New.image(subLayer3,0,0,windowWidth, windowHeight);
  //   subLayer3.resizeCanvas(windowWidth, windowHeight);
  //   subLayer3 = subLayer3New;
  //
  //   sliderImg.resizeCanvas(windowWidth, windowHeight);
  //   saveNext();
  //


    if (drawingIsActive){

        makeSwatch();
        blendMode(BLEND);
          background(255);
          blendMode(DARKEST);
          image(subLayer1, windowWidth, windowHeight);
          image(subLayer2, windowWidth, windowHeight);
          image(subLayer3, windowWidth, windowHeight);
          changeBrush(currentLayer);

    }

    else if (!drawingIsActive){
      blendMode(BLEND);
      background(255);
      makeSlider();


    }
  }
}
