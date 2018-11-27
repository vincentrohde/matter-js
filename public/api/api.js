// custom functions

let getPosition = (body) => {
    return body.position;
};

let getDifference = (original, input) => {
    let difference = Math.abs(original - input);
    if(original > input) {
        return -difference;
    } else {
        return difference;
    }
}

let updatePosition = (body, input) => {
    return {
        x: getDifference(body.x, input.x),
        y: getDifference(body.y, input.y)
    }
};

// Matter.Body.translate(boxA, updatePosition(getPosition(boxA), input));

// API stuff

let boxAngularVelocity = 0;

Matter.Events.on(engine, "afterUpdate", ()=>{
    if(boxAngularVelocity > 0){
        Matter.Body.setAngularVelocity( boxA, boxAngularVelocity);
    }
})

const ChairAPI = {
    rotate : velocity => {
        boxAngularVelocity = velocity * Math.PI/6;
    },
    forward: velocity => Matter.Body.setVelocity( boxA, {x: 0, y: velocity * 10}),
    stop: () => boxAngularVelocity = 0
};

const ChairControl = {
    getChairs: () => {
        return [Chair];
    }
}

const Chair = {
    readyState: true,
    batteryState: {
        battery: 1.0
    },
    ready() {
        return this.readyState;
    },
    getStatus() {
        return this.batteryState;
    },
    move({motionType, velocity}) {
        switch(motionType) {
            case 'Rotation':
                boxAngularVelocity = velocity * Math.PI/6;
                break;

            case 'Straight':
                const alpha = this.getPosition().bearing-90;
                const a = Math.sin(alpha) * velocity;
                const b = Math.cos(alpha) * velocity;
                Matter.Body.applyForce(boxA, this.getPosition(), {x: 0.5, y: 0});
                break;
        }
    },

    stop: () => {
        boxAngularVelocity = 0;
    },

    getPosition() {

        return {
            x: boxA.position.x,
            y: boxA.position.y,
            bearing: boxA.angle
        }

    }
};

window.ChairControl = ChairControl;
const [chair] = ChairControl.getChairs();
window.chair = chair;