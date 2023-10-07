import { apple, regenerateApple } from './initApple';
import * as THREE from 'three';

let speed = 1

const move = {
  "w": (snake) => {snake.translateZ(-1)},
  "ц": (snake) => {snake.translateZ(-1)},
  "a": (snake) => {snake.translateX(-1)},
  "ф": (snake) => {snake.translateX(-1)},
  "s": (snake) => {snake.translateZ(1)},
  "ы": (snake) => {snake.translateZ(1)},
  "d": (snake) => {snake.translateX(1)},
  "в": (snake) => {snake.translateX(1)},
}

const snakeMoveHandler = (snake: THREE.Mesh<THREE.BoxGeometry, THREE.MeshStandardMaterial, THREE.Object3DEventMap>, lastMove: null | string) => {
  if(lastMove) {
    move[lastMove](snake)
    const {x, z} = snake.position

    if(x >= 10.1) {
      snake.position.x = 10
      lastMove = null
    }
    else if(x <= -10.1) {
      snake.position.x = -10
      lastMove = null
    }
    else if(z >= 10.1) {
      snake.position.z = 10
      lastMove = null
    }
    else if(z <= -10.1) {
      snake.position.z = -10
      lastMove = null
    }

    if(`${snake.position.x}${snake.position.z}` === `${apple.position.x}${apple.position.z}`) {
      regenerateApple()
    }
  }
}

const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshStandardMaterial({ color: 0xff0000 });
export const snake = new THREE.Mesh(geometry, material);
snake.translateY(1)
export const initSnake = () => {
  
  let lastMove: null | string = null

  setInterval(() => snakeMoveHandler(snake, lastMove), 300)
  
  window.addEventListener("keydown", e => lastMove = lastMove !== e.key && move[e.key]? e.key : null)

  return snake
}