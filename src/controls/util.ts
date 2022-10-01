import { Vec3 } from "cannon-es";
import { Vector3 } from "three";

export interface Velocities {
    forward: Vec3;
    backward: Vec3;

    left: Vec3;
    right: Vec3;

    up: Vec3;
    down: Vec3;
}

export const getVelocities = (speed: number): Velocities => {
    const forward = new Vec3(0, 0, -speed);
    const backward = new Vec3(0, 0, speed);

    const left = new Vec3(-speed, 0, 0);
    const right = new Vec3(speed, 0, 0);

    const up = new Vec3(0, speed, 0);
    const down = new Vec3(0, -speed, 0);

    return { forward, backward, left, right, up, down };
};

export const cannonToThree = (vector: Vec3): Vector3 => {
    return new Vector3(vector.x, vector.y, vector.z);
};

export const threeToCannon = (vector: Vector3): Vec3 => {
    return new Vec3(vector.x, vector.y, vector.z);
};

export const addToCannonVector = (vector: Vec3, x: number, y: number, z: number): Vec3 => {
    vector.x += x;
    vector.y += y;
    vector.z += z;
    
    return vector;
};
