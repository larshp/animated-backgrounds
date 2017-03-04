let points = [];
let ctx = null;
var timer = null;

function distance(a, b) {
  return Math.sqrt(Math.pow(a.x - b.x, 2) + Math.pow(a.y - b.y, 2));
}

function findClosest(point) {
  let closest = [];

  for(let i=0;i<points.length;i++) {
    if(point.x === points[i].x && point.y === points[i].y) {
      continue;
    }
    closest.push({distance: distance(point, points[i]), from: point, to: points[i]});
  }

  closest = closest.sort(function(a, b) {
    return a.distance - b.distance;
  }).slice(0, 3);

  return closest;
}

function draw() {
  ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

  let closest = [];

  for(let i=0;i<points.length;i++) {
    ctx.beginPath();
    ctx.arc(points[i].x, points[i].y, 3, 0, Math.PI*2, true);
    ctx.closePath();
    ctx.fillStyle = '#00ff00';
    ctx.fill();

    points[i].x = points[i].x + points[i].vector.x;
    points[i].y = points[i].y + points[i].vector.y;

    closest = closest.concat(findClosest(points[i]));

    if (points[i].x > window.innerWidth || points[i].x < 0) {
      points[i].vector.x = -points[i].vector.x;
    }
    if (points[i].y > window.innerHeight || points[i].y < 0) {
      points[i].vector.y = -points[i].vector.y;
    }
  }

// todo, remove identical from closest(from + to)

  for(let i=0;i<closest.length;i++) {
    ctx.beginPath();
    ctx.moveTo(closest[i].from.x,closest[i].from.y);
    ctx.lineTo(closest[i].to.x,closest[i].to.y);
    ctx.strokeStyle = '#ff0000';
    ctx.stroke();
    ctx.closePath();
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
      let vector = {
          x: Math.random() * (Math.random() < 0.5 ? 1 : -1),
          y: Math.random() * (Math.random() < 0.5 ? 1 : -1)};

      points.push({
        x: Math.floor(Math.random() * window.innerWidth) + 1 ,
        y: Math.floor(Math.random() * window.innerHeight) + 1,
        vector: vector});
    }
//    console.dir(points);

    draw();
  }
}

initialize();