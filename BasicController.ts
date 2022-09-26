import { Vector2, Vector3, Quaternion, Scene, Camera, Object3D } from "three";

export class BasicController {
    protected position: Vector2;
    protected rotation: Quaternion;

    protected player: Object3D;
    protected camera: Camera;
    protected element: HTMLElement;
    protected scene: Scene;
    
    public constructor(player: any, camera: any, scene: Scene, element: HTMLElement) {
        this.position = new Vector3();
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
