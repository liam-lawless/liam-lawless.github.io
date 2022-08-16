let clicks = 0;
let values = [];
let states = [];
let sorting = false;

function setup() {
  createCanvas(600, 400);
  for (let i = 0; i < width / 2; i++) {
    values[i] = noise(i / 90.0) * height;
    states.push(-1);
  }

  speed = createSlider(0, 20, 10);
  speed.position(235, 380);
}

function draw() {
  background(202, 239, 209);
  for (let i = 0; i < values.length; i++) {
    // color coding
    if (states[i] == 0) {
      // color for the bar at the pivot index
      stroke(255, 90, 0);
    } else if (states[i] == 1) {
      // color for the bars being sorted currently
      stroke(29, 99, 101);
    } else {
      stroke(199, 107, 152);
    }
    strokeWeight(3.5);
    point(i * 2, height - values[i]);
  }

  if (clicks % 2 == 1 && sorting == true) {
    quickSort(0, values.length - 1);
    sorting = false;
  }
}

function mousePressed() {
  // check if mouse is on screen
  if (mouseX >= 0 && mouseX <= width && mouseY >= 0 && mouseY <= height) {
    background(0, 0, 0);
    clicks += 1;
    sorting = true;

    // reset the canvas
    if (clicks != 0 && clicks % 2 == 0) {
      // clear arrays
      values = [];
      states = [];

      // generate new random noiseSeed
      noiseSeed(random(0, 10000));

      // populate arrays
      for (let i = 0; i < width / 2; i++) {
        values[i] = noise(i / 90.0) * height;
        states.push(-1);
      }

      // stop sorting
      sorting = false;
      //stop();
    }
  }
}

async function quickSort(start, end) {
  if (start > end) {
    return;
  }
  let index = await partition(start, end);
  // restore original state
  states[index] = -1;
  await Promise.all([quickSort(start, index - 1), quickSort(index + 1, end)]);
}

async function partition(start, end) {
  for (let i = start; i < end; i++) {
    // identify the elements being considered currently
    states[i] = 1;
  }

  let pivotIndex = start;
  // make pivot index distinct
  states[pivotIndex] = 0;
  let pivotElement = values[end];
  for (let i = start; i < end; i++) {
    if (values[i] < pivotElement) {
      await swap(i, pivotIndex);
      states[pivotIndex] = -1;
      pivotIndex++;
      states[pivotIndex] = 0;
    }
  }
  await swap(end, pivotIndex);
  for (let i = start; i < end; i++) {
    // restore original state
    if (i != pivotIndex) {
      states[i] = -1;
    }
  }
  return pivotIndex;
}

async function swap(i, j) {
  await sleep(speed.value());
  let temp = values[i];
  values[i] = values[j];
  values[j] = temp;
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
