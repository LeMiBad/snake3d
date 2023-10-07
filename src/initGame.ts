import { initSnake, moveSnake } from "./initSnake";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { initApple } from "./initApple";

const createCube = () => {
  const geometry = new THREE.BoxGeometry(21, 1, 21);
  const material = new THREE.MeshStandardMaterial({ color: 0x00ff00 });
  const cube = new THREE.Mesh(geometry, material);

  return cube;
};

const setLight = (scene: THREE.Scene) => {
  const pointLight = new THREE.PointLight(0xffffff, 1000);
  pointLight.position.set(0, 15, 0);
  scene.add(pointLight);

  const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
  scene.add(ambientLight);
};

export const gameOptions = { delta: 0 };

export const initGame = () => {
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  const renderer = new THREE.WebGLRenderer();
  const controls = new OrbitControls(camera, renderer.domElement);

  renderer.setSize(window.innerWidth - 75, window.innerHeight - 75);

  const resizeScene = () =>
    renderer.setSize(window.innerWidth - 75, window.innerHeight - 75);

  window.addEventListener("resize", resizeScene);

  setLight(scene);
  scene.add(createCube());
  scene.add(initSnake());
  scene.add(initApple());
  scene.background = new THREE.Color(0xffffff);

  camera.position.z = 13;
  camera.position.y = 13.7;
  camera.rotateX(-0.5);

  let prev = 0;
  const update = (delta) => {
    let _delta = delta - prev;
    prev = delta;
    
    gameOptions.delta = _delta;
    
    requestAnimationFrame(update);
    controls.update();
    renderer.render(scene, camera);
    moveSnake();
  };

  update(0.3);

  return renderer;
};
