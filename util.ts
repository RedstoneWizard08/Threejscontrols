import { Vector3 } from "three";

export interface Velocities {
    forward: Vector3;
    backward: Vector3;

    left: Vector3;
    right: Vector3;

    up: Vector3;
    down: Vector3;
}

export const getVelocities = (speed: number): Velcoities => {
    const forward = new Vector3(0, 0, -speed);
    const backward = new Vector3(0, 0, speed);

    const left = new Vector3(-speed, 0, 0);
    const right = new Vector3(speed, 0, 0);

    const up = new Vector3(0, speed, 0);
    const down = new Vector3(0, -speed, 0);

    return { forward, backward, left, right, up, down };
};
