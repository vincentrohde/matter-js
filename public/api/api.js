// custom functions

const getPosition = body => {
  return body.position;
};

const getDifference = (original, input) => {
  let difference = Math.abs(original - input);
  if (original > input) {
    return -difference;
  } else {
    return difference;
  }
};

const updatePosition = (body, input) => {
  return {
    x: getDifference(body.x, input.x),
    y: getDifference(body.y, input.y)
  };
};

// Matter.Body.translate(boxA, updatePosition(getPosition(boxA), input));

// API stuff

let boxAngularVelocity = 0;

Matter.Events.on(engine, "afterUpdate", () => {
  if (boxAngularVelocity > 0) {
    Matter.Body.setAngularVelocity(boxA, boxAngularVelocity);
  }
});

class ChairAPI {
  constructor(body, angularVelocity) {
    this.body = body;
    this.angularVelocity = angularVelocity;
  }
  rotate(velocity) {
    angularVelocity = (velocity * Math.PI) / 6;
  }
  forward(velocity) {
    Matter.Body.setVelocity(body, { x: 0, y: velocity * 10 });
  }
  stop() {
    angularVelocity = 0;
  }
}

class ChairControl {
  constructor(chair) {
    this.chair = chair;
  }
  getChairs() {
    return [chair];
  }
}

class Chair {
  constructor(readyState, batteryState, motionState) {
    this.readyState = readyState;
    this.batteryState = batteryState;
    this.motionState = motionState;
  }

  ready() {
    return this.readyState;
  }

  getStatus() {
    return this.batteryState;
  }

  move({ motionType, velocity }) {
    switch (motionType) {
      case "Rotation":
        boxAngularVelocity = (velocity * Math.PI) / 6;
        break;

      case "Straight":
        const alpha = this.getPosition().bearing - 90;
        const a = Math.sin(alpha) * velocity;
        const b = Math.cos(alpha) * velocity;
        Matter.Body.applyForce(boxA, this.getPosition(), { x: 0.5, y: 0 });
        break;
    }
  }

  stop() {
    boxAngularVelocity = 0;
  }

  getPosition() {
    return (
      {
        x: boxA.position.x,
        y: boxA.position.y,
        bearing: boxA.angle
      } || null
    );
  }

  getCurrentMotion() {
    return this.motionState || null;
  }
}

let myChairAPI = new ChairAPI(boxA, boxAngularVelocity);

let chair = new Chair(
  true,
  {
    battery: 1.0
  },
  "Straight"
);

// window.ChairControl = ChairControl;
// const [chair] = ChairControl.getChairs();
window.chair = chair;
