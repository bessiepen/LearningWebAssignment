// chapter11 - canvas simple
function draw() {
  var canvas = document.getElementById('draw-in-me');

    if (canvas.getContext) {
      var ctx = canvas.getContext('2d');
      ctx.beginPath();
      ctx.moveTo(120.0, 32.0);
      ctx.bezierCurveTo(120.0, 36.4, 116.4, 40.0, 112.0, 40.0);
      ctx.lineTo(8.0, 40.0);
      ctx.bezierCurveTo(3.6, 40.0, 0.0, 36.4, 0.0, 32.0);
      ctx.lineTo(0.0, 8.0);
      ctx.bezierCurveTo(0.0, 3.6, 3.6, 0.0, 8.0, 0.0);
      ctx.lineTo(112.0, 0.0);
      ctx.bezierCurveTo(116.4, 0.0, 120.0, 3.6, 120.0, 8.0);
      ctx.lineTo(120.0, 32.0);
      ctx.closePath();
      ctx.fill();
      ctx.lineWidth = 2.0;
      ctx.strokeStyle = "rgb(255, 255, 255)";
      ctx.stroke();
    }

}
window.onload = draw;

// chapter11 - canvas grayscale

function convertToGs(img) {
  if (!Modernizr.canvas) return;
  img.color = img.src;
  img.grayscale = createGSCanvas(img);
  img.onmouseover = function() {
    this.src = this.color;
  }
  img.onmouseover = function() {
    this.src = this.grayscale;
  }
  img.onmouseout();
}
function createGSCanvas(img) {
  var canvas = document.createElement("canvas");
  canvas.width = img.width;
  canvas.height = img.height;
  var ctx = canvas.getContext("2d");
  ctx.drawImage(img,0,0);
  var c = ctx.getImageData(0,0, img.width, img.height);
  for (i=0; i<c.height; i++) {
    for (j=0; j<c.width; j++) {
      var x = (i*4) * c.width + (j*4);
      var r = c.data[x];
      var g = c.data[x+1];
      var b = c.data[x+2];
      c.data[x] = c.data[x+1] = c.data[x+2] = (r+g+b)/3;
    }
  }
  ctx.putImageData(c,0,0,0,0, c.width, c.height);
  return canvas.toDataURL();
}
window.onload = function() {
  convertTOGS(document.getElementById('avatar'));
}
