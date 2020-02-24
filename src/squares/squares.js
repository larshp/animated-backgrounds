var squares = null;
var states = [];
var timer = null;

function randomColor() {
  let color = Math.ceil(Math.random() * 5);
  switch(color) {
    case 1:
      return 'rgb(240, 171, 0)';
    case 2:
      return 'rgb(15, 170, 255)';
    case 3:
      return 'rgb(147, 201, 57)';
    case 4:
      return 'rgb(118, 10, 133)';
    case 5:
      return 'rgb(68, 69, 50)';
  }
}

function random(square) {
  let top = Math.round(Math.random() * window.innerHeight)  + "px";
  square.style.top = top;
  let left = Math.round(Math.random() * window.innerWidth)  + "px";
  square.style.left = left;
  square.style.background = randomColor();
  square.style.display = 'inline';
}

function update() {
  for(let i=0; i<squares.length; i++) {
    switch(states[i]) {
      case null:
      case "runOut":
        random(squares[i]);
        squares[i].classList.remove("runFall");
        squares[i].classList.remove("runOut");
        squares[i].classList.add("runIn");
        states[i] = "runIn";
        break;
      case "runIn":
        if (Math.ceil(Math.random()*100) < 50) {
          squares[i].classList.remove("runFall");
          squares[i].classList.remove("runIn");
          squares[i].classList.add("runOut");
          states[i] = "runOut";
        }
        break;
    }
  }

  timer = setTimeout(update, 4000);
}

// eslint-disable-next-line no-unused-vars
function hide() {
  clearTimeout(timer);
  for(let i=0; i<squares.length; i++) {
    squares[i].classList.remove("runIn");
    squares[i].classList.remove("runOut");
    squares[i].classList.add("runFall");
    states[i] = null;
  }
}

function initialize(count = 20) {
  for(let i=0;i<count;i++) {
    document.body.innerHTML += '<div class="square"></div>';
    states.push(null);
  }
  squares = document.getElementsByClassName("square");
  update();
}

initialize();
