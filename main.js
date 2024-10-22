import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { GUI } from "three/addons/libs/lil-gui.module.min.js";

const scene = new THREE.Scene();
const loader = new GLTFLoader();

// Sizes
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

// Camera
const camera = new THREE.PerspectiveCamera(50, sizes.width / sizes.height);
camera.position.z = 0;
camera.position.x = 1.6;
camera.position.y = -2;

scene.add(camera);

// const gui = new GUI();
// gui
//   .add({ z: camera.position.z }, "z", -10, 10, 0.1)
//   .onChange((value) => (camera.position.z = value));
// gui
//   .add({ x: camera.position.x }, "x", -10, 10, 0.1)
//   .onChange((value) => (camera.position.x = value));
// gui
//   .add({ y: camera.position.y }, "y", -10, 10, 0.1)
//   .onChange((value) => (camera.position.y = value));

camera.rotateY(Math.PI * 0.5);

// Canvas
const canvas = document.querySelector("canvas.webgl");

// Renderer
const renderer = new THREE.WebGLRenderer({
  alpha: true,
  canvas: canvas,
});

renderer.setSize(sizes.width, sizes.height);
// renderer.setAnimationLoop(animate);
// const controls = new OrbitControls(camera, renderer.domElement);
// controls.autoRotate = true;

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

  renderer.setSize(window.innerWidth, window.innerHeight);
}
window.addEventListener("resize", onWindowResize);

function buildThresholdList() {
  let thresholds = [];
  let numSteps = 50;

  for (let i = 1.0; i <= numSteps; i++) {
    let ratio = i / numSteps;
    thresholds.push(ratio);
  }

  thresholds.push(0);
  return thresholds;
}

loader.load(
  "/models/chandelier-lit.glb",
  (gltf) => {
    const chandelierPosY = -2.3;
    console.log(gltf.scene.position.y);
    gltf.scene.position.y = chandelierPosY;
    scene.add(gltf.scene);

    // gui
    //   .add({ rotateY: 0 }, "rotateY", 0, Math.PI, Math.PI * 0.1)
    //   .onChange((value) => gltf.scene.rotateY(value));

    // function animate() {
    //   gltf.scene.rotation.y += 0.01;
    //   renderer.render(scene, camera);
    // }
    // renderer.setAnimationLoop(animate);

    const directionalLeftLight = new THREE.DirectionalLight(0xffffff, 2);
    directionalLeftLight.position.set(-6, 0, 3);
    directionalLeftLight.target = gltf.scene;
    scene.add(directionalLeftLight);

    const directionalRightLight = new THREE.DirectionalLight(0xffffff, 2);
    directionalRightLight.position.set(4, 0, 3);
    directionalRightLight.target = gltf.scene;
    scene.add(directionalRightLight);

    const options = {
      root: null,
      rootMargin: "0px 0px 600px 0px",
      threshold: buildThresholdList(),
    };
    const callback = (entries) => {
      entries.forEach((entry) => {
        gltf.scene.position.y = chandelierPosY - entry.intersectionRatio * 1.6;
        gltf.scene.rotation.y = entry.intersectionRatio * 4;
      });
    };

    const observer = new IntersectionObserver(callback, options);
    observer.observe(document.querySelector(".three__section"));
  },
  undefined,
  (error) => {
    console.error(error);
  }
);

// loader.load(
//   "/models/table-mesh.glb",
//   (gltf) => {
//     gltf.scene.translateY(-1.5);
//     scene.add(gltf.scene);
//   },
//   undefined,
//   (error) => {
//     console.error(error);
//   }
// );

const render = () => {
  // update controls
  // controls.update();

  // Render
  renderer.render(scene, camera);
  window.requestAnimationFrame(render);
  // const helper = new THREE.CameraHelper(camera);
  // scene.add(helper);
};
render();
