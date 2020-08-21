let capture, canvas;

function setup() {
  canvas = createCanvas(640, 640);
  capture = createCapture(VIDEO);
  capture.hide();
}

function draw() {
  background(0);
  blendMode(ADD);
  if (capture.loadedmetadata) {
    let c = capture.get(0, 0, width, height);
    c.mask(mask(0));
    image(c, 0, 0);
    
    flip(c);
    flip(c);
    flip(c);
    
    translate(width / 2, height / 2);
    scale(1, -1, 1);
    translate(-width / 2, -height / 2);
    
    image(c, 0, 0);
    flip(c);
    flip(c);
    flip(c);

  }
  blendMode(BLEND);
}

function mouseClicked() {
  saveCanvas(canvas, 'microkaleidoscope.jpg'); 
}

function flip(c) {
  translate(width / 2, height / 2);
  rotate(PI/2);
  translate(-width / 2, -height / 2);
  image(c, 0, 0);
}

function mask(i) {
  let mask = createGraphics(width, height);
  mask.beginShape();
  mask.vertex(width / 2, height / 2);
  mask.vertex(width / 2, 0);
  mask.vertex(width, 0); // N
  mask.vertex(width / 2, height / 2);
  mask.strokeWeight(0.1);
  mask.endShape();
  mask.stroke(255);
  mask.fill(255);
  return mask;
}