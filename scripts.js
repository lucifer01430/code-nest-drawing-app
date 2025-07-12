 const canvas = document.getElementById("canvas");
  const ctx = canvas.getContext("2d");
  const colorPicker = document.getElementById("color");
  const brushSize = document.getElementById("brush-size");
  const eraserBtn = document.getElementById("eraser");
  const clearBtn = document.getElementById("clear");
  const saveBtn = document.getElementById("save");

  // Better canvas resolution on all devices
  function fixCanvasResolution() {
    const ratio = window.devicePixelRatio || 1;
    canvas.width = canvas.offsetWidth * ratio;
    canvas.height = canvas.offsetHeight * ratio;
    ctx.scale(ratio, ratio);
  }
  fixCanvasResolution();

  let drawing = false;
  let currentColor = colorPicker.value;
  let currentSize = brushSize.value;
  let isErasing = false;

  // Styling for smoother lines
  ctx.lineJoin = "round";
  ctx.lineCap = "round";

  canvas.addEventListener("mousedown", (e) => {
    drawing = true;
    ctx.beginPath();
    ctx.moveTo(e.offsetX, e.offsetY);
  });

  canvas.addEventListener("mouseup", () => {
    drawing = false;
    ctx.beginPath();
  });

  canvas.addEventListener("mouseout", () => {
    drawing = false;
    ctx.beginPath();
  });

  canvas.addEventListener("mousemove", (e) => {
    if (!drawing) return;

    ctx.lineWidth = currentSize;
    ctx.strokeStyle = isErasing ? "#ffffff" : currentColor;

    ctx.lineTo(e.offsetX, e.offsetY);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(e.offsetX, e.offsetY);
  });

  // Tools
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

  // Optional: Resize fix on window resize
  window.addEventListener("resize", () => {
    fixCanvasResolution();
  });