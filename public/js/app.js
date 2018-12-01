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

// custom elements in the world

let boxA = Bodies.rectangle((65/2), (65/2), 65, 65);

// set air friction
boxA.frictionAir = .1;

// add elements to the world
World.add(engine.world, [boxA]);

// turn off gravity
engine.world.gravity.y = 0;

// run the engine
Engine.run(engine);

// run the renderer
Render.run(render);
