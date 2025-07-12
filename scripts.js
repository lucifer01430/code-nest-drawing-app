const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const colorPicker = document.getElementById("color");
const brushSize = document.getElementById("brush-size");
const eraserBtn = document.getElementById("eraser");
const clearBtn = document.getElementById("clear");
const saveBtn = document.getElementById("save");

let drawing = false;
let currentColor = colorPicker.value;
let currentSize = brushSize.value;
let isErasing = false;

// Setup canvas resolution for different devices
function fixCanvasResolution() {
  const ratio = window.devicePixelRatio || 1;
  const containerWidth = canvas.parentElement.offsetWidth;
  const canvasHeight = window.innerWidth < 576 ? 400 : 500; // responsive height

  canvas.width = containerWidth * ratio;
  canvas.height = canvasHeight * ratio;

  canvas.style.width = `${containerWidth}px`;
  canvas.style.height = `${canvasHeight}px`;

  ctx.setTransform(1, 0, 0, 1, 0, 0); // Reset transform before scaling
  ctx.scale(ratio, ratio);
}
fixCanvasResolution();

// Smooth lines
ctx.lineJoin = "round";
ctx.lineCap = "round";

// Get touch position
function getTouchPos(touchEvent) {
  const rect = canvas.getBoundingClientRect();
  return {
    x: touchEvent.touches[0].clientX - rect.left,
    y: touchEvent.touches[0].clientY - rect.top
  };
}

// Start drawing
function startDraw(x, y) {
  drawing = true;
  ctx.beginPath();
  ctx.moveTo(x, y);
}

// Draw line
function drawLine(x, y) {
  if (!drawing) return;

  ctx.lineWidth = currentSize;
  ctx.strokeStyle = isErasing ? "#ffffff" : currentColor;

  ctx.lineTo(x, y);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(x, y);
}

// Stop drawing
function stopDraw() {
  drawing = false;
  ctx.beginPath();
}

// Mouse events
canvas.addEventListener("mousedown", (e) => {
  startDraw(e.offsetX, e.offsetY);
});
canvas.addEventListener("mousemove", (e) => {
  drawLine(e.offsetX, e.offsetY);
});
canvas.addEventListener("mouseup", stopDraw);
canvas.addEventListener("mouseout", stopDraw);

// Touch events
canvas.addEventListener("touchstart", (e) => {
  e.preventDefault();
  const pos = getTouchPos(e);
  startDraw(pos.x, pos.y);
}, { passive: false });

canvas.addEventListener("touchmove", (e) => {
  e.preventDefault();
  const pos = getTouchPos(e);
  drawLine(pos.x, pos.y);
}, { passive: false });

canvas.addEventListener("touchend", (e) => {
  e.preventDefault();
  stopDraw();
}, { passive: false });

canvas.addEventListener("touchcancel", (e) => {
  e.preventDefault();
  stopDraw();
}, { passive: false });

// Tool listeners
colorPicker.addEventListener("change", (e) => {
  currentColor = e.target.value;
  isErasing = false;
});

brushSize.addEventListener("input", (e) => {
  currentSize = e.target.value;
});

eraserBtn.addEventListener("click", () => {
  isErasing = true;
});

clearBtn.addEventListener("click", () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.beginPath();
});

saveBtn.addEventListener("click", () => {
  const link = document.createElement("a");
  link.download = "drawing.png";
  link.href = canvas.toDataURL("image/png");
  link.click();
});

// Responsive fix
window.addEventListener("resize", () => {
  fixCanvasResolution();
});
