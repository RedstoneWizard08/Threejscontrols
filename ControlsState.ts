import { Vector2 } from "three";

export class MovementState {
    public forward: boolean;
    public backward: boolean;
    
    public left: boolean;
    public right: boolean;

    public up: boolean;
    public down: boolean;

    public constructor() {
        this.forward = false;
        this.backward = false;

        this.left = false;
        this.right = false;

        this.up = false;
        this.down = false;
    }

    public get none() {
        return !this.forward && !this.backward && !this.left && !this.right && !this.up && !this.down;
    }
}

export class ControlsState {
    public movement: MovementState;
    public mouse: Vector2;

    public constructor() {
        this.movement = new MovementState();
        this.mouse = new Vector2();
    }
}
