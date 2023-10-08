import { getRandomInt } from './../utils/getRandom';
import * as THREE from 'three';


const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshStandardMaterial({ color: 0xee9b00 });
export const apple = new THREE.Mesh(geometry, material);
export const regenerateApple = () => {
  apple.position.x = getRandomInt(-10, 10)
  apple.position.z = getRandomInt(-10, 10)
}

export const initApple = () => {
  apple.translateY(1)
  apple.translateX(-4)

  return apple
}