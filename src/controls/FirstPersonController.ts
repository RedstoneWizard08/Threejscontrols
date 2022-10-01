import { BasicController } from "./BasicController";
import { ControlsState } from "./ControlsState";
import { cannonToThree, getVelocities } from "./util";
import { Euler, Vector3, Raycaster, Scene, Camera } from "three";
import { Body } from "cannon-es";

export class FirstPersonController extends BasicController {
    protected locked: boolean;
    protected state: ControlsState;
    protected euler: Euler;

    protected mouseSpeed = 0;
    protected minPolarAngle = 0;
    protected maxPolarAngle = Math.PI;

    protected pi2 = Math.PI / 2;

    public constructor(
        player: Body,
        camera: Camera,
        scene: Scene,
        element: HTMLElement
    ) {
        super(player, camera, scene, element);

        this.locked = false;
        this.state = new ControlsState();
        this.euler = new Euler(0, 0, 0, "YXZ");

        this.updatePointerLock();
    }

    public attach(): void {
        this.element.addEventListener("mousedown", this.onMouseDown.bind(this));
        this.element.addEventListener("mousemove", this.onMouseMove.bind(this));

        this.element.addEventListener("keydown", this.onKeyDown.bind(this));
        this.element.addEventListener("keyup", this.onKeyUp.bind(this));

        document.addEventListener(
            "pointerlockchange",
            this.updatePointerLock.bind(this)
        );
    }

    public detatch(): void {
        this.element.removeEventListener(
            "mousedown",
            this.onMouseDown.bind(this)
        );
        this.element.removeEventListener(
            "mousemove",
            this.onMouseMove.bind(this)
        );

        this.element.removeEventListener("keydown", this.onKeyDown.bind(this));
        this.element.removeEventListener("keyup", this.onKeyUp.bind(this));

        document.removeEventListener(
            "pointerlockchange",
            this.updatePointerLock.bind(this)
        );
    }

    private onMouseDown(): void {
        this.updatePointerLock();

        if (!this.locked) {
            this.element.requestPointerLock();
        }
    }

    private onMouseMove(event: MouseEvent): void {
        if (this.locked) {
            const movementX = event.movementX || 0;
            const movementY = event.movementY || 0;

            this.euler.setFromQuaternion(this.camera.quaternion);

            this.euler.y -= movementX * 0.002 * this.mouseSpeed;
            this.euler.x -= movementY * 0.002 * this.mouseSpeed;

            this.euler.x = Math.max(
                this.pi2 - this.maxPolarAngle,
                Math.min(this.pi2 - this.minPolarAngle, this.euler.x)
            );

            this.camera.quaternion.setFromEuler(this.euler);
        }
    }

    private onKeyDown(event: KeyboardEvent): void {
        if (this.locked)
            switch (event.code) {
                case "KeyW":
                case "ArrowUp":
                    this.state.movement.forward = true;
                    break;

                case "KeyA":
                case "ArrowLeft":
                    this.state.movement.left = true;
                    break;

                case "KeyS":
                case "ArrowDown":
                    this.state.movement.backward = true;
                    break;

                case "KeyD":
                case "ArrowRight":
                    this.state.movement.right = true;
                    break;

                case "Space":
                    this.state.movement.up = true;
                    break;

                case "KeyC":
                    this.state.movement.down = true;
                    break;

                case "Escape":
                    this.updatePointerLock();

                    if (this.locked) document.exitPointerLock();

                    break;
            }
    }

    private onKeyUp(event: KeyboardEvent): void {
        if (this.locked)
            switch (event.code) {
                case "KeyW":
                case "ArrowUp":
                    this.state.movement.forward = false;
                    break;

                case "KeyA":
                case "ArrowLeft":
                    this.state.movement.left = false;
                    break;

                case "KeyS":
                case "ArrowDown":
                    this.state.movement.backward = false;
                    break;

                case "KeyD":
                case "ArrowRight":
                    this.state.movement.right = false;
                    break;

                case "Space":
                    this.state.movement.up = false;
                    break;

                case "KeyC":
                    this.state.movement.down = false;
                    break;
            }
    }

    private updatePointerLock(): void {
        if (document.pointerLockElement) this.locked = true;
        else this.locked = false;
    }

    protected isGrounded(): boolean {
        const DOWN_DIRECTION = new Vector3(0, -1, 0);

        const rayCaster = new Raycaster(
            cannonToThree(this.player.position),
            DOWN_DIRECTION,
            0,
            10
        );
        rayCaster.set(cannonToThree(this.player.position), DOWN_DIRECTION);

        const intersect = rayCaster.intersectObjects(this.scene.children, true);

        if (intersect.length > 0) return true;
        else return false;
    }

    public update(): void {
        const {
            forward: forwardVelocity,
            backward: backwardVelocity,

            left: leftVelocity,
            right: rightVelocity,

            up: upVelocity,
            down: downVelocity,
        } = getVelocities(10);

        if (this.state.movement.forward)
            this.player.velocity.copy(forwardVelocity);
        if (this.state.movement.backward)
            this.player.velocity.copy(backwardVelocity);

        if (this.state.movement.left) this.player.velocity.copy(leftVelocity);
        if (this.state.movement.right) this.player.velocity.copy(rightVelocity);

        if (this.state.movement.up) this.player.velocity.copy(upVelocity);
        if (this.state.movement.down) this.player.velocity.copy(downVelocity);

        if (this.state.movement.none && !this.isGrounded())
            this.player.velocity.copy(downVelocity);

        this.camera.position.copy(cannonToThree(this.player.position));
    }
}
