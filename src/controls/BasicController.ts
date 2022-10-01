import { Vector2, Quaternion, Scene, Camera } from "three";
import { Body } from "cannon-es";

export class BasicController {
    protected position: Vector2;
    protected rotation: Quaternion;

    protected player: Body;
    protected camera: Camera;
    protected element: HTMLElement;
    protected scene: Scene;

    public constructor(
        player: Body,
        camera: Camera,
        scene: Scene,
        element: HTMLElement
    ) {
        this.position = new Vector2();
        this.rotation = new Quaternion();

        this.player = player;
        this.camera = camera;
        this.element = element;
        this.scene = scene;
    }

    public attach() {}

    public detatch() {}

    public update() {}
}
