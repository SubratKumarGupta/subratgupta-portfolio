import * as THREE from "three";
import gsap from "gsap";

import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
const shuffle = (array: string[]): string[] => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

let currTextureIndex = 0;
const texturePaths = [
  "sand_universe.jpg",
  "surreal_flowers.jpg",
  "cyberpunk_neon.jpg",
  "tree_villsge.jpg",
];
const canvas = document.getElementById(
  "three-worldviewer"
) as HTMLCanvasElement;
// Create the scene, camera, and renderer
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  canvas.clientWidth / canvas.clientHeight,
  0.1,
  1000
);
const renderer = new THREE.WebGLRenderer({
  canvas,
  alpha: true,
});

renderer.setSize(canvas.clientWidth, canvas.clientHeight);

// Load the panoramic image and create a texture

const loader = new THREE.TextureLoader();
const texture = loader.load(`/worldview_Img/medium/${texturePaths[0]}`);

// Create a spherical geometry and map the texture to it
const geometry = new THREE.SphereGeometry(500, 60, 40);

// Flip the geometry inside out
geometry.scale(-1, 1, 1);

const material = new THREE.MeshBasicMaterial({
  map: texture,
  transparent: true,
});

const sphere = new THREE.Mesh(geometry, material);

const transitionSphear = new THREE.Mesh(
  geometry,
  new THREE.MeshBasicMaterial({
    transparent: true,
    opacity: 0,
  })
);
scene.add(sphere);
scene.add(transitionSphear);

// Set up the camera and controls
camera.position.set(0, 0, 0.1);

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableZoom = false;
controls.enablePan = false;

controls.rotateSpeed = 0.3;

function onWindowResize(): void {
  const canvas = document.getElementById(
    "three-worldviewer"
  ) as HTMLCanvasElement;
  camera.aspect = canvas.clientWidth / canvas.clientHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(canvas.clientWidth, canvas.clientHeight);
}

window.addEventListener("resize", onWindowResize, false);

// Animation loop
let lastTime = 0;
const rotationSpeed = 0.00005;

function animate(time: number) {
  const delta = time - lastTime;
  lastTime = time;
  requestAnimationFrame(animate);

  // gsap.fromTo(material, { opacity: 0 }, { opacity: 1, duration: 0.5 });
  transitionSphear.rotation.y += rotationSpeed * delta;
  sphere.rotation.y += rotationSpeed * delta;

  controls.update();
  renderer.render(scene, camera);
}

animate(0);
//load new texture
let Transitioning = false;
document.getElementById("loadworld")?.addEventListener("click", () => {
  if (Transitioning === true) {
    console.log("return");
    return;
  }
  Transitioning = true;
  if (currTextureIndex == texturePaths.length - 1) {
    currTextureIndex = 0;
  } else {
    currTextureIndex = currTextureIndex + 1;
  }
  const texture = loader.load(
    `/worldview_Img/medium/${texturePaths[currTextureIndex]}`
  );
  transitionSphear.material.opacity = 0;
  transitionSphear.material.map = texture;
  transitionSphear.material.needsUpdate = true;
  console.log(transitionSphear.material.map);
  const tl = gsap.timeline();
  tl.to(transitionSphear.material, {
    opacity: 1,
    duration: 0.6,
  })
    .to(material, {
      opacity: 0,
      duration: 0.6,
    })
    .add(() => {
      material.map = texture; //update
      material.opacity = 1;
      transitionSphear.material.opacity = 0;
      transitionSphear.material.map = null;
      transitionSphear.material.needsUpdate = true;
      material.needsUpdate = true;
    })
    .add(() => {
      Transitioning = false;
    });

  // .add(transitionSphear.material, {
  //   opacity: 0,
  //   duration: 0.5,
  // })
});
