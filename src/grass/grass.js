let width = 0;
let height = 0;
let dra;

const configuration = {
  count: 300,
  minWidth: 25,
  maxWidth: 60,
  minHeight: 50,
  topRadius: 20,
  colorMax: 200,
  colorMin: 100,
};

function randomGreenGardient() {
  var a = (Math.random() * (configuration.colorMax - configuration.colorMin)) + configuration.colorMin;
  var b = (Math.random() * (configuration.colorMax - configuration.colorMin)) + configuration.colorMin;

  let color1;
  let color2;
  if (a > b) {
    color1 = new SVG.Color({ r: 0, g: a, b: 0 });
    color2 = new SVG.Color({ r: 0, g: b, b: 0 });
  } else {
    color1 = new SVG.Color({ r: 0, g: b, b: 0 });
    color2 = new SVG.Color({ r: 0, g: a, b: 0 });
  }

  return draw.gradient('linear', function(add) {
    add.stop(0, color1)
    add.stop(1, color2)
  }).from(0, 0).to(0, 1);
}

function random(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

function randomLeafs() {
  let leafs = [];
  for (let i = 0; i < configuration.count; i++) {
    leafs.push({
      left: Math.floor(Math.random() * width),
      width: random(configuration.minWidth, configuration.maxWidth),
      height: random(configuration.minHeight, height),
      gradient: randomGreenGardient()});
  }

  return leafs;
}

function drawGrass() {
  const leafs = randomLeafs();
  console.dir(leafs);
  for (const leaf of leafs) {
    const bottomLeft = [leaf.left, height];
    const bottomRight = [leaf.left + leaf.width, height];
//    const bottomMiddle = [leaf.left + (leaf.width / 2), height];
    const top = [leaf.left + (leaf.width / 2), height - leaf.height];
    top[0] = top[0] + random(-configuration.topRadius, configuration.topRadius);

    var polygon = draw.polygon();
    polygon.plot([bottomLeft, top, bottomRight]).fill(leaf.gradient)
  }

}

function run() {
  const div = document.getElementById("grass");
  width = div.offsetWidth;
  height = div.offsetHeight;
  div.innerHTML = "";
  draw = SVG().addTo('#grass').size(width, height);
  drawGrass();
}

function registerEvents() {
  window.addEventListener("resize", run);
}

registerEvents();
run();