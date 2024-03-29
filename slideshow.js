let introText = ["Touchez", "Regardez", "Ecoutez", "Touchez"];
let appCol = "#f1b300";
let slide = 4;
let delayTime = 8000;
let introState = 0;
let startButton;

function mousePressed() {
  if (introState < 3) {
    if (audio.isPlaying()) {} else {
      audio.loop(5);
    }
  }
  if (slide === 0) {
    click.play();
    startButton.remove();
    slide++;
    slideShow();
  }
  return false;
}

function slideShow() {
  if (slide === 0) {
    background(241, 181, 0);
    startButton = createButton(introText[0]);
    startButton.class("startButton");
    startButton.position((width / 2) - (12 * vMax), (height / 2) - (4 * vMax));
  }
  if (slide === introText.length) {
    textLayer.remove();
    subLayer1.clear();
    introState = 3;
    makeSwatch();
    introLayer.clear();
    introLayer.blendMode(DARKEST);
    counter = 0;
    slide = 4;
    blendMode(BLEND);
    background(255);
    bgLayer1.stroke(swatchCol[0]);
    bgLayer2.stroke(swatchCol[1]);
    bgLayer3.stroke(swatchCol[2]);

  } else if (slide < introText.length && slide > 0) {
    textLayer.clear();
    textLayer.fill(255, 5);
    textLayer.textSize(vMax * 8);
    textLayer.textAlign(CENTER, CENTER);
    textLayer.rectMode(CENTER);
    if (slide > 0) {
      if (slide === introText.length - 1) {
        delayTime = 10000;
      }
      slide++;

      setTimeout(slideShow, delayTime);
    }
  }
}
