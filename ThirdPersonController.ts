import { FirstPersonController } from "./FirstPersonController";

export class ThirdPersonController extends FirstPersonController {
    public update(): void {
        const {
            forward: forwardVelocity,
            backward: backwardVelocity,
            
            left: leftVelocity,
            right: rightVelocity,
            
            up: upVelocity,
            down: downVelocity
        } = getVelocities(10);

        if (this.state.movement.forward) this.player.setVelocity(forwardVelocity);
        if (this.state.movement.backward) this.player.setVelocity(backwardVelocity);

        if (this.state.movement.left) this.player.setVelocity(leftVelocity);
        if (this.state.movement.right) this.player.setVelocity(rightVelocity);

        if (this.state.movement.up) this.player.setVelocity(upVelocity);
        if (this.state.movement.down) this.player.setVelocity(downVelocity);

        if (this.state.movement.none && !this.isGrounded()) this.player.setVelocity(downVelocity);

        this.camera.position.set(this.player.position.add(-3, 2, -3));
    }
}
