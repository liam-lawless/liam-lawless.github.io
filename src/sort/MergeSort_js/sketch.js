let values = [];
let clicks = 0;

function setup() {
  createCanvas(600, 400);

  // determine how fast it will sort
  sortSpeed = 0;

  // initialize color mode
  colorMode(HSB, width);

  // create array of randomly colored bars
  generate();
}

function draw() {
  if (clicks == 1) {
    clicks += 1;

    mergeSort(values);
  }

  for (let i = 0; i < width; i++) {
    stroke(values[i], width, width);
    line(i, 0, i, height);
  }
}

function mergeSort(a) {
  // create copy of the array
  dupe = a.slice();
  // asynchronous sort the copy
  mergeSortSlice(dupe, 0, dupe.length);
  return;
}

async function mergeSortSlice(a, start, end) {
  if (end - start <= 1) return;

  var mid = round((end + start) / 2);

  // wait till divides are sort
  await mergeSortSlice(a, start, mid);
  await mergeSortSlice(a, mid, end);

  // merge divides
  let i = start,
    j = mid;
  while (i < end && j < end) {
    if (a[i] > a[j]) {
      let t = a[j];
      a.splice(j, 1);
      a.splice(i, 0, t);
      j++;
    }
    i++;
    if (i == j) j++;

    // copy back the current state of the sorting
    values = a.slice();

    // // set speed of sorting
    await sleep(0);
  }
}

async function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function mousePressed() {
  clicks += 1;
}

function generate() {
  values = [];

  for (let i = 0; i <= width; i++) {
    values[i] = round(random(1, width));
  }
}
