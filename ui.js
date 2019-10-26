let newButton, saveButton;
let appCol = 0;
let appBg = '#e3f3fc';


function saveNext(){

  newButton = createButton("Next")
  newButton.class("select");
  newButton.position(width-(15 * vMax), height - (12.5 * vMax));
  newButton.style('font-size', '2.6vmax');
  newButton.style('height', '4.5vmax');
  newButton.mousePressed(nextStep);

  saveButton = createButton("Save")
  saveButton.class("select");
  saveButton.style('font-size', '2.6vmax');
  saveButton.style('height', '4.5vmax');
  saveButton.position(width-(15 * vMax), height - (6.5 * vMax));
  saveButton.mousePressed(saveImg);
}

function nextStep(){

drawingIsActive = !drawingIsActive;

if (!drawingIsActive){


}
else{
bgLayer1.clear();
bgLayer2.clear();
subLayer1.background(appBg);
subLayer2.background(appBg);
blendMode(BLEND);
}


}


function saveImg() {

    blendMode(BLEND);

    if (drawingIsActive){

  // save the drawing
    }
    else{

    // save the drawing
    }

    save('linescape' + month() + day() + hour() + second() + '.jpg');
}

function makeSlider(_mouseX) {

  sliderImg.clear();
  sliderImg.stroke(255);
  sliderImg.strokeWeight(5);
  sliderImg.line(50, height - (6 * vMax), width - (16 * vMax), height - (6 * vMax));

  sliderImg.rectMode(RADIUS);
  sliderImg.fill(0);
  sliderImg.noStroke();
  sliderImg.rect(constrain(_mouseX, width * 0.04, width * 0.82), height - (6 * vMax), 1 * vMax, 5 * vMax);

}
