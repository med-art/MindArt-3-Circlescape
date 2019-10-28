let lineArrayX = [];
let lineArrayY = [];

let bgLayer1, fgLayer1, subLayer1;
let bgLayer2, fgLayer2, subLayer2;
let bgLayer3, fgLayer3, subLayer3;
let bg;

let drawingIsActive = 1;

let tileNum = 2;
let sliderImg;
let holdingImg;

let currentLayer = 1;

let audio;
let ellipseSize;
let inverter = 1;
let arcRadius;
let tempCosX, tempSinY;


function preload() {
  fgLayer1 = loadImage('assets/s1-1.jpg');
  fgLayer2 = loadImage('assets/s1-2.jpg');
  fgLayer3 = loadImage('assets/s1-3.jpg');
  audio = loadSound('assets/audio.mp3');
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

  sliderImg = createGraphics(windowWidth, windowHeight);
  holdingImg = createGraphics(windowWidth, windowHeight);




  driftY = height/3;
  ellipseSize = vMax * 20;
  arcRadius = vMin*35;



slideShow();

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
    }

    else if (currentLayer === 2) {
      bgLayer2.strokeWeight(12);
      lineArrayX.push(winMouseX);
      lineArrayY.push(winMouseY);
      bgLayer2.beginShape();
      for (i = 0; i < lineArrayX.length; i++) {
        bgLayer2.curveVertex(lineArrayX[i], lineArrayY[i]);
      }
      bgLayer2.endShape();
    }

    else if (currentLayer === 3) {
        bgLayer3.strokeWeight(12);
      lineArrayX.push(winMouseX);
      lineArrayY.push(winMouseY);
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

    tileNum = constrain(((width / (winMouseX + 20))), 1, 10);
    makeSlider(winMouseX);

  }

} else {

  if (slide > 0) {

    if (dist(tempCosX,tempSinY,winMouseX,winMouseY) < ellipseSize/2){
      ellipseSize = ellipseSize-(0.5);
      arcRadius = arcRadius-(0.1);
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
    }

    else if (currentLayer === 2) {
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
    }

    else if (currentLayer === 3) {
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


  } else {
    //nothing for now
  }



//  return false;

}


function draw() {

if (introState === 3){

  if (drawingIsActive) {
    blendMode(BLEND);
    background(255);

    subLayer1.blendMode(BLEND);
    subLayer1.image(bgLayer1, 0, 0, width, height);
    subLayer1.blendMode(LIGHTEST);
    subLayer1.image(fgLayer1, 0, 0, vMax*100, vMax*100);

    subLayer2.blendMode(BLEND);
    subLayer2.image(bgLayer2, 0, 0, width, height);
    subLayer2.blendMode(LIGHTEST);
    subLayer2.image(fgLayer2, 0, 0, vMax*100, vMax*100);

    subLayer3.blendMode(BLEND);
    subLayer3.image(bgLayer3, 0, 0, width, height);
    subLayer3.blendMode(LIGHTEST);
    subLayer3.image(fgLayer3, 0, 0, vMax*100, vMax*100);

    blendMode(MULTIPLY);
    image(subLayer1, 0, 0, width, height);
    image(subLayer2, 0, 0, width, height);
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
} else {

      //introLayer.image(textLayer, 0, 0, width, height);
      blendMode(BLEND);
      background(241, 181, 0, 100);
      //image(introLayer, 0, 0, width, height);


      if (slide > 0) {

      blendMode(BLEND);
        fill(color('#469ede'));
        noStroke();





        tempCosX = (arcRadius * cos(radians(driftY/3))) + width / 2;
        tempSinY = (arcRadius * sin(radians(driftY/3))) + height / 2;
        ellipse(tempCosX, tempSinY, ellipseSize, ellipseSize);

        driftY+=1.5;

        // if (driftY <= 100 || driftY >= height- 100) {
        //   inverter = -inverter;
        //   }
      }

      if (slide === 0) {
        textLayer.text(introText[slide], width / 2, (height / 8) * (slide + 2));
      } else {
        textLayer.text(introText[slide - 1], width / 2, (height / 6) * (slide));
      } // this if else statgement needs to be replaced with a better system. The current state tracking is not working
      image(textLayer, 0, 0, width, height);

}

}

function windowResized() {
    paint.resizeCanvas(windowWidth, windowHeight);
  resizeCanvas(windowWidth, windowHeight);
  calcDimensions();
  removeElements();
  makeSwatch();
  saveNext();
}
