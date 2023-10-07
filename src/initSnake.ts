import { apple, regenerateApple } from './initApple';
import * as THREE from 'three';
import { checkCollision } from './../utils/checkCollision';
import { gameOptions } from './initGame';

const speed = 1;

const move = {
  "w": (snake, speed, delta) => {snake.translateZ(-1 * speed * delta)},
  "a": (snake, speed, delta) => {snake.translateX(-1 * speed * delta)},
  "ц": (snake, speed, delta) => {snake.translateZ(-1 * speed * delta)},
  "ф": (snake, speed, delta) => {snake.translateX(-1 * speed * delta)},
  "s": (snake, speed, delta) => {snake.translateZ(1 * speed * delta)},
  "ы": (snake, speed, delta) => {snake.translateZ(1 * speed * delta)},
  "d": (snake, speed, delta) => {snake.translateX(1 * speed * delta)},
  "в": (snake, speed, delta) => {snake.translateX(1 * speed * delta)},
}

const snakeMoveHandler = (snake: THREE.Mesh<THREE.BoxGeometry, THREE.MeshStandardMaterial, THREE.Object3DEventMap>, lastMove: null | string) => {
  if(lastMove) {
    move[lastMove](snake, speed, gameOptions.delta)
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

    // if(`${snake.position.x}${snake.position.z}` === `${apple.position.x}${apple.position.z}`) {
    //   regenerateApple()
    // }
    if (checkCollision(snake, apple)) {
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