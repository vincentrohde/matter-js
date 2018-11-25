// initialize world
let Engine = Matter.Engine,
  Render = Matter.Render,
  World = Matter.World,
  Bodies = Matter.Bodies;

let engine = Engine.create();

let circleButton = document.querySelector(".circle");
let resetButton = document.querySelector(".reset");

// define SeatObject for information storing
function SeatObject(xPosition, yPosition, bearing) {
  this.xPosition = xPosition;
  this.yPosition = yPosition;
  this.bearing = bearing;
}

// render world
let render = Render.create({
  element: document.querySelector(".body"),
  engine: engine,
  options: {
    wireframes: true,
    showAngleIndicator: true,
    height: 650,
    width: 650
  }
});

// custom functions
let addCircle = () => {
    let seat = new SeatObject(30, 30, 0);
    console.log('x: ' + seat.xPosition);
    return Bodies.circle(Math.random() * 500 + 30, 30, 30);
}

let keyEvent = (body, key) => {
  switch (key) {
    case 37:
      Matter.Body.translate(body, { x: -10, y: 0 });
      break;

    case 38:
      Matter.Body.translate(body, { x: 0, y: -10 });
      break;

    case 39:
      Matter.Body.translate(body, { x: 10, y: 0 });
      break;

    case 40:
      Matter.Body.translate(body, { x: 0, y: 10 });
      break;

    case 81:
      Matter.Body.rotate(body, Math.PI / 6);
      break;

    case 87:
      Matter.Body.rotate(body, -(Math.PI / 6));
      break;

    default:
      break;
  }
};

// custom elements in the world

let boxA = Bodies.rectangle(400, 400, 80, 80);

World.add(engine.world, [boxA]);

// add boundaries

// var offset = 5;
// World.add(engine.world, [
//   Bodies.rectangle(400, -offset, 800 + 2 * offset, 30, { isStatic: true }),
//   Bodies.rectangle(400, 600 + offset, 800 + 2 * offset, 30, { isStatic: true }),
//   Bodies.rectangle(800 + offset, 300, 30, 600 + 2 * offset, { isStatic: true }),
//   Bodies.rectangle(-offset, 300, 30, 600 + 2 * offset, { isStatic: true })
// ]);

// turn off gravity

engine.world.gravity.y = 0;

// initialize event listeners

circleButton.addEventListener("click", () => {
  World.add(engine.world, addCircle());
});

resetButton.addEventListener("click", () => {
  World.clear(engine.world, true);
  World.add(engine.world, [boxA]);
});

document.addEventListener("keydown", e => {
  // 38 up, 39 right, 40 down, 37 left
  // 87 w, 81 q
  keyEvent(boxA, e.keyCode);
});

document.addEventListener("keyup", e => {
  keyEvent(boxA, e.keyCode);
});

Engine.run(engine);
Render.run(render);
