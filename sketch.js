let capture, canvas, maskCanvas, mask;

function setup() {
  canvas = createCanvas(640, 640);
  let constraints = {
    video: {
      facingMode: 'environment',
    },
    audio: false
  };
  capture = createCapture(constraints);
  capture.hide();
  maskCanvas = createGraphics(width, height);
  mask = setupMask();
  canvas.elt.style.width = "100%";
  canvas.elt.style['margin-top'] = (displayHeight-height)/2;
}

function draw() {
  background(0);
  blendMode(ADD);
  if (capture.loadedmetadata) {
    let c = capture.get(0, 0, width, height);
    c.mask(mask);
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

function setupMask() {
  maskCanvas.clear();
  maskCanvas.beginShape();
  maskCanvas.vertex(width / 2, height / 2);
  maskCanvas.vertex(width / 2, 0);
  maskCanvas.vertex(width, 0); // N
  maskCanvas.vertex(width / 2, height / 2);
  maskCanvas.strokeWeight(0.1);
  maskCanvas.endShape();
  maskCanvas.stroke(255);
  maskCanvas.fill(255);
  return maskCanvas;
}
