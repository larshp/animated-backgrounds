configuration = {
  leafCountFactor: 5,
  minWidth: 25,
  maxWidth: 50,
  minHeight: 50,
  topRadius: 40,
  colorMax: 200,
  colorMin: 100,
};

class Grass {
  draw;
  width = 0;
  height = 0;
  divName = "";

  constructor(divName) {
    this.divName = divName;
    this.registerEvents();
  }

  randomGreenGardient() {
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

    return this.draw.gradient('linear', function(add) {
      add.stop(0, color1)
      add.stop(1, color2)
    }).from(0, 0).to(0, 1);
  }

  random(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
  }

  randomLeafs() {
    let leafs = [];

    const count = ( this.width / configuration.maxWidth ) * configuration.leafCountFactor;

    for (let i = 0; i < count; i++) {
      leafs.push({
        left: Math.floor(Math.random() * this.width),
        width: this.random(configuration.minWidth, configuration.maxWidth),
        height: this.random(configuration.minHeight, this.height),
        gradient: this.randomGreenGardient()});
    }

    return leafs;
  }

  drawGrass() {
    const leafs = this.randomLeafs();
    for (const leaf of leafs) {
      const bottomLeft = [leaf.left, this.height];
      const bottomRight = [leaf.left + leaf.width, this.height];

      const top = [leaf.left + (leaf.width / 2), this.height - leaf.height];
      top[0] = top[0] + this.random(-configuration.topRadius, configuration.topRadius);

      const vector1 = [bottomLeft[0], bottomLeft[1] - (leaf.height / 2)];
      const vector2 = [bottomRight[0], bottomRight[1] - (leaf.height / 2)];

      const path1 = "M" + bottomLeft[0] + " " + bottomLeft[1] +
        " C " + bottomLeft[0] + " " + bottomLeft[1] + " " + vector1[0] + " " + vector1[1] + " " + top[0] + " " + top[1] +
        " C " + top[0] + " " + top[1] + " " + vector2[0] + " " + vector2[1] + " " + bottomRight[0] + " " + bottomRight[1];

      this.draw.path(path1).fill("red").fill(leaf.gradient);
    }
  }

  run() {
    const div = document.getElementById(this.divName);
    this.width = div.offsetWidth;
    this.height = div.offsetHeight;
    div.innerHTML = "";
    this.draw = SVG().addTo('#grass').size(this.width, this.height);
    this.drawGrass();
  }

  registerEvents() {
    window.addEventListener("resize", this.run.bind(this));
  }
}

const g = new Grass("grass").run();