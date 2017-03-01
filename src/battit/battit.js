let points = [];
let ctx = null;
var timer = null;

function draw() {
  console.log("draw");
  ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

  for(let i=0;i<points.length;i++) {
    ctx.beginPath();
    ctx.arc(points[i].x, points[i].y, 2, 0, Math.PI*2, true);
    ctx.closePath();
    ctx.fillStyle = '#00ff00';
    ctx.fill();

    points[i].x = points[i].x + points[i].vector.x;
    points[i].y = points[i].y + points[i].vector.y;

    if (points[i].x > window.innerWidth || points[i].x < 0) {
      points[i].vector.x = -points[i].vector.x;
    }
    if (points[i].y > window.innerHeight || points[i].y < 0) {
      points[i].vector.y = -points[i].vector.y;
    }

  }

  timer = setTimeout(draw, 50);
}

function initialize(count = 30) {
  var canvas = document.getElementById('canvas');
  if (canvas.getContext) {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    ctx = canvas.getContext('2d');

    for(let i=0;i<count;i++) {
      points.push({
        x: Math.floor(Math.random() * window.innerWidth) + 1 ,
        y: Math.floor(Math.random() * window.innerHeight) + 1,
        vector: {
          x: Math.random() * Math.random() < 0.5 ? 1 : -1,
          y: Math.random() * Math.random() < 0.5 ? 1 : -1}
        });
    }
    console.dir(points);

    draw();
  }
}

initialize();