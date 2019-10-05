// TODO:
// figure out how to only fill once certain criteria are met, i.e. a certain
// number of vertexes + minimum distance between array[0] for X and Y, and the
// last Array value

let lineArrayX = [];
let lineArrayY = [];

let _x, _y;


function setup(){
  createCanvas(windowWidth, windowHeight);
  background(190);
  strokeWeight(50);
  noFill();

_x = random((width/4)*1,(width/4)*3);
_y = random((height/4)*1,(height/4)*3);

lineArrayX[0] = _x;
lineArrayY[0] = _y;


for (let i = 1; i <20; i++){
  _x = _x + random(-200,200);
  _y = _y + random(-200,200);
  lineArrayX[i] = _x;
  lineArrayY[i] = _y;
}

}


function touchStarted(){
  //clear the array
}

function touchMoved(){

for (let i = 0; i < lineArrayX.length; i++){
  if (int(abs(dist(mouseX, mouseY, lineArrayX[i], lineArrayY[i]))) < 1);
  console.log("yes");
}

}

function touchEnded(){

}

function draw(){
  beginShape();
  for (i = 0; i < lineArrayX.length; i++){
    curveVertex(lineArrayX[i], lineArrayY[i]);
  }
  endShape();

}
