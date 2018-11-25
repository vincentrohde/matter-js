let x = true;
let Engine = Matter.Engine,
    Render = Matter.Render,
    World = Matter.World,
    Bodies = Matter.Bodies,
    engine = Engine.create();

elements = {
    startNode: document.getElementsByClassName("start"),
    circleButton: document.querySelector(".circle"),
}

// initialize environment


let activeNode = document.querySelector(".active");
let startNode = document.getElementsByClassName("start");
let circleButton = document.querySelector(".circle");
let resetButton = document.querySelector(".reset");
let toggleButton = document.querySelector(".toggle");

var y = true; // controller for active item tracking (debugging)
var seat = null;

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

// custom elements in the world
let boxA = Bodies.rectangle(400, 400, 80, 80);
let seatA = Bodies.circle(Math.random() * 500 + 30, 30, 30);

World.add(engine.world, [boxA]);

// turn off gravity
engine.world.gravity.y = 0;

// run engine and renderer
Engine.run(engine);
Render.run(render);


// initialize event listeners

circleButton.addEventListener("click", () => {
    // World.add(engine.world, addCircle());
    addCircle();
});

resetButton.addEventListener("click", () => {
    World.clear(engine.world, true);
    World.add(engine.world, [boxA]);
});

toggleButton.addEventListener("click", () => {
    y = !y;
    console.log(y);
});

document.addEventListener("keydown", e => {
    // 38 up, 39 right, 40 down, 37 left
    // 87 w, 81 q
    keyEvent(seatA, e.keyCode);
});

document.addEventListener("keyup", e => {
    keyEvent(seatA, e.keyCode);
});



// define SeatObject for information storing
// function SeatObject(xPosition, yPosition, bearing) {
//   this.xPosition = xPosition;
//   this.yPosition = yPosition;
//   this.bearing = bearing;
// }

// render world


// custom functions
let addCircle = () => {
    if(x) {
        // let seat = new SeatObject(30, 30, 0);
        // console.log('x: ' + seat.xPosition);
        // seat = Bodies.circle(Math.random() * 500 + 30, 30, 30);
        // var seat = Matter.Body.create(Math.random() * 500 + 30, 30, 30);
        World.add(engine.world, seatA);
        x = false;
        // return seat;
    }
    else {
        Matter.Body.setPosition(seatA, {x: 60, y: 60});
        getPositionX();
    }
}

let getPositionX = () => {
    // active.top;
    // for (i = 0; i < 50; i++) {
    // console.log('running...');
    // setTimeout(function(){
    console.log('running...');
    // if(startNode.length) {
    let startNodePos = offset(elements.startNode);
    console.log(startNodePos.top);
    // }
    // }, 600);
    // }
}

function offset(el) {
    var rect = el.getBoundingClientRect(),
        scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
        scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    return { top: rect.top + scrollTop, left: rect.left + scrollLeft }
}

// Matter.grid.create();

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

// add boundaries

// var offset = 5;
// World.add(engine.world, [
//   Bodies.rectangle(400, -offset, 800 + 2 * offset, 30, { isStatic: true }),
//   Bodies.rectangle(400, 600 + offset, 800 + 2 * offset, 30, { isStatic: true }),
//   Bodies.rectangle(800 + offset, 300, 30, 600 + 2 * offset, { isStatic: true }),
//   Bodies.rectangle(-offset, 300, 30, 600 + 2 * offset, { isStatic: true })
// ]);




