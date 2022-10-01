import { FirstPersonController } from "./FirstPersonController";
import { addToCannonVector, cannonToThree, getVelocities } from "./util";

export class ThirdPersonController extends FirstPersonController {
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

        this.camera.position.copy(cannonToThree(addToCannonVector(this.player.position, -3, 2, -3)));
    }
}
