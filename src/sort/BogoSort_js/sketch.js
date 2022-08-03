var values = [];
var base;
var swaps = 0;
var start = false;

function setup() {
  createCanvas(400, 400);
  background(245, 246, 247);
  
  // slider to control number of bars
  barCount = createSlider(2, 20, 5, 1);
  barCount.position(135, 400)
  
  // instructions
  textSize(12);
  text("Click to sort.", 170, 200);
}

function draw() {
  
  // generate a new array if mouse is pressed
  if (mouseIsPressed) {
    generate();
  }
  
  // only draw if the user has started the program
  if (start) {
    // reset the background
    background(245, 246, 247);

    // randomize values
    shuffle(values, true);

    // count the swap
    swaps += 1;

    // shift over to draw next bar
    let shift = 0;

    // draw the bars
    for (var j = 0; j < values.length; j++) {
      posX = 200 - barCount.value() * 2 + shift;

      strokeWeight(3);
      stroke(100, 100, 200);
      line(posX, 350, posX, values[j]);
      shift += 4;
    }

    // if the array is sorted, stop randomizing
    if (isSorted(values)) {
      start = false;
      textSize(12);
      noStroke();
      text("Swap count: " + swaps, 160, 370);
    }
  }
}

// check if the array is sorted
function isSorted(array) {
  for (let i = 0; i < array.length; i++) {
    if (array[i] > array[i + 1]) {
      return false;
    }
  }

  return true;
}

// start sorting if the user clicks in the canvas
function mousePressed() {
  if (mouseX >= 0 && mouseX <= width && mouseY >= 0 && mouseY <= height) {
    start = true;
    // reset swap count
    swaps = 0;
  }
}

// mobile compatibility
function touchStarted() {
  if (mouseX >= 0 && mouseX <= width && mouseY >= 0 && mouseY <= height) {
    start = true;
    // reset swap count
    swaps = 0;
  }
}

// generate a new array of values
function generate() {
  // randomize values
  values = [];
  for (var i = 0; i < barCount.value(); i++) {
    values[i] = random(50, height - 50);
  }
}
