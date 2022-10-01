import { Body, Box, Plane, Vec3, World } from "cannon-es";
import {
    BoxGeometry,
    Mesh,
    MeshBasicMaterial,
    PerspectiveCamera,
    Scene,
    WebGLRenderer,
} from "three";
import { ThirdPersonController } from "./controls/ThirdPersonController";
import { cannonToThree } from "./controls/util";
import "./style.css";

const timeStep = 1 / 60;
let lastCallTime: number;

const scene = new Scene();
const camera = new PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
);

const renderer = new WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);

document.body.appendChild(renderer.domElement);

const world = new World({
    gravity: new Vec3(0, -9.82, 0),
});

const geometry = new BoxGeometry(1, 1, 1);
const material = new MeshBasicMaterial({ color: 0x00ff00 });
const cube = new Mesh(geometry, material);
scene.add(cube);

const body = new Body({
  mass: 5,
  shape: new Box(new Vec3(1, 1, 1)),
});

body.position.set(cube.position.x, cube.position.y, cube.position.z);
world.addBody(body);

const groundBody = new Body({
  type: Body.STATIC,
  shape: new Plane(),
});

groundBody.quaternion.setFromEuler(-Math.PI / 2, 0, 0);
world.addBody(groundBody);

camera.position.z = 5;

const controls = new ThirdPersonController(body, camera, scene, renderer.domElement);

const animate = () => {
    try {
      requestAnimationFrame(animate);

    const time = performance.now() / 1000;

    if (!lastCallTime) {
        world.step(timeStep);
    } else {
        const dt = time - lastCallTime;
        world.step(timeStep, dt);
    }

    lastCallTime = time;

    cube.position.copy(cannonToThree(body.position));

    controls.update();
    renderer.render(scene, camera);
    } catch(e) {
      alert(e);
    }
};

animate();
