import "../style.css";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

const canvas = document.querySelector("canvas.webgl");

const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x111111);

// Lumière générale
scene.add(new THREE.AmbientLight(0xffffff, 1.2));

// Lumière “ciel/sol” (donne du volume)
const hemi = new THREE.HemisphereLight(0xffffff, 0x222222, 1.0);
hemi.position.set(0, 1, 0);
scene.add(hemi);

// Key light (principale)
const key = new THREE.DirectionalLight(0xffffff, 2.8);
key.position.set(4, 6, 3);
scene.add(key);

// Fill light (remplit les ombres)
const fill = new THREE.DirectionalLight(0xffffff, 1.2);
fill.position.set(-4, 2, -3);
scene.add(fill);

const camera = new THREE.PerspectiveCamera(50, sizes.width / sizes.height, 0.1, 2000);
camera.position.set(2, 1.5, 4);
scene.add(camera);

const renderer = new THREE.WebGLRenderer({
  canvas,
  antialias: true,
  alpha: true
});
renderer.setClearAlpha(0);

renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.outputColorSpace = THREE.SRGBColorSpace;
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.0;

const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

renderer.toneMappingExposure = 1.35;

// Charger le GLB
const loader = new GLTFLoader();

loader.load(
  "/models/scene.glb",
  (gltf) => {
    console.log("GLB OK");

    const model = gltf.scene;
    scene.add(model);
    model.traverse((o) => {
  if (o.isMesh) {
    o.castShadow = true;
    o.receiveShadow = true;
  }
});


    // Centre + cadre automatiquement
    const box = new THREE.Box3().setFromObject(model);
    const size = new THREE.Vector3();
    box.getSize(size);
    const center = new THREE.Vector3();
    box.getCenter(center);
    model.position.sub(center);

    const maxDim = Math.max(size.x, size.y, size.z);
    const dist = (!isFinite(maxDim) || maxDim < 0.01) ? 5 : maxDim * 2.5;

    camera.near = dist / 100;
    camera.far = dist * 100;
    camera.updateProjectionMatrix();

    camera.position.set(dist, dist * 0.6, dist);
    control.target.set(0, 0, 0);
    control.update();

    // On cache le cube quand le modèle est là
    debugCube.visible = false;
  },
  undefined,
  (err) => {
    console.error("GLB ERREUR", err);
    debugCube.visible = true;
  }
);



window.addEventListener("resize", () => {
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

function tick() {
  controls.update();
  renderer.render(scene, camera);
  requestAnimationFrame(tick);
}
tick();










