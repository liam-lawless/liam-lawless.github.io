var mouseIsDragged = false;
var leftPressed = false;
var bars = [];

var base;
var barThickness;
var sortingSpeed;

var i = 0;
var j = 0;

let sizeSlider, speedSlider;

function setup() {

  // create canvas dimensions and set background color
  createCanvas(600, 400);
  background(245, 246, 247);

  // base for the bars
  base = height - 30;

  // define sliders to control size and speed
  sizeSlider = createSlider(1, 20, 10, 1);
  speedSlider = createSlider(1, 20, 1, 1);

  // text at bottom with brief instructions
  textSize(12);
  text('Click + drag to move bars', 245, 195);
  text('Click to sort', 245, 210);
  text('Bar size', 40, 395);
  text('Sort speed', 160, 395);
}

function draw() {
  // constantly check to see what the current slider value is
  barThickness = sizeSlider.value();
  sortingSpeed = speedSlider.value();

  // only run if the user is left click + dragging mouse
  if (mouseIsDragged) {

    // RESET the list of bars, i, j, and background
    background(245, 246, 247);
    bars = [];
    i = 0;
    j = 0;

    // define the starting x positions of the sets of bars
    var xposR = (width / 2) + 1;
    var xposL = width / 2;

    // clamp mouseY
    if (mouseY > base - 5) {
      mouseY = base - 5;
    } else if (mouseY < 15) {
      mouseY = 15;
    }

    // clamp mouseX
    if (mouseX < 24) {
      mouseX = 24;
    } else if (mouseX > (width - 30)) {
      mouseX = width - 30;
    }

    // constant that determines number of bars generated based on the bar Thickness
    var constant = (2 * barThickness) + 2;

    // generate a bar with random heights based on the position of the X and Y coordinate of the cursor
    for (let i = 0; i < (int)(mouseX / constant); i++) {

      // bar height determined by cursor Y coordinate, min bar height = 5px
      var randHeightL = random(mouseY, base - 5);
      var randHeightR = random(mouseY, base - 5);

      // lines expanding left
      fill(100, 100, 200);
      noStroke();
      rectMode(CORNERS);
      rect(xposL, base, xposL - barThickness, randHeightL);
      bars.unshift(randHeightL); // add the bar to the front of the list

      // lines expanding right
      fill(100, 100, 200);
      noStroke();
      rectMode(CORNERS);
      rect(xposR, base, xposR + barThickness, randHeightR);
      bars.push(randHeightR); // add the bar to the back of the list

      // increment the bar x position by the width +1 for a small gap
      xposR += barThickness + 1;
      xposL -= barThickness + 1;
    }

    //reset mouse dragged
    mouseIsDragged = false;
  }

  // check if the user has left clicked
  if (leftPressed) {
    // reset background
    background(245, 246, 247);

    for (let n = 0; n < sortingSpeed; n++ ) {
      //sort the array
      if (bars[j + 1] > bars[j]) {
        // swap elements if first is greater
        var k = bars[j];
        bars[j] = bars[j + 1];
        bars[j + 1] = k;
      }

      if (i < bars.length) {
        j += 1;
        if (j >= bars.length - i - 1) {
          j = 0;
          i += 1;
        }
      }
    }

    // starting pos for the farthest left bar
    var startPos = (300 - ((barThickness + 1) * (bars.length / 2))) + 1;

    // draw the bars based on the sorted array
    for (let i = 0; i < bars.length; i++) {
      if (i == j) {
        fill(200, 100, 100);
      } else {
        fill(100, 100, 200);
      }
      noStroke();
      rectMode(CORNERS);
      rect(startPos, base, startPos + barThickness, bars[i]);

      startPos += barThickness + 1;
    }
  }
}

// detect when the mouse is pressed only in the sketch frame
// and when the user is NOT dragging
function mousePressed() {
  if (mouseButton == LEFT 
      && mouseX >= 0 
      && mouseX <= width 
      && mouseY >= 0 
      && mouseY <= height
      && !mouseIsDragged) {
    leftPressed = true;
  }
}

// Detect a click and drag
function mouseDragged() {
  if (mouseY >= 0 && mouseY <= 400) {
    mouseIsDragged = true;

    // stop any sorting currently happening
    leftPressed = false;
  }
}