import { apple, regenerateApple } from './initApple';
import * as THREE from 'three';

let speed = 1

const move = {
  87: (snake) => {snake.translateZ(-1)},
  65: (snake) => {snake.translateX(-1)},
  83: (snake) => {snake.translateZ(1)},
  68: (snake) => {snake.translateX(1)},
}

const snakeMoveHandler = (snake: THREE.Mesh<THREE.BoxGeometry, THREE.MeshStandardMaterial, THREE.Object3DEventMap>, lastMove: null | number) => {
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
  
  let lastMove: null | number = null

  setInterval(() => snakeMoveHandler(snake, lastMove), 300)
  
  window.addEventListener("keydown", e => lastMove = lastMove !== e.keyCode && move[e.keyCode]? e.keyCode : null)

  return snake
}