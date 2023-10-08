import { apple, regenerateApple } from "./initApple";
import * as THREE from "three";
import { checkCollision } from "./../utils/checkCollision";
import { gameOptions } from "./initGame";

type Vector2 = {
  x: number,
  y: number
}

const speed = 0.01;
const gameFieldSize: Vector2 = {
  x: 20,
  y: 20
}

const move = {
  87: (snake, speed, delta) => {
    snake.translateZ(-speed * delta);
  },
  65: (snake, speed, delta) => {
    snake.translateX(-speed * delta);
  },
  83: (snake, speed, delta) => {
    snake.translateZ(speed * delta);
  },
  68: (snake, speed, delta) => {
    snake.translateX(speed * delta);
  },
};

const snakeMoveHandler = (
  snake: THREE.Mesh<
    THREE.BoxGeometry,
    THREE.MeshStandardMaterial,
    THREE.Object3DEventMap
  >,
  lastMove: null | number
) => {
  if (lastMove) {
    move[lastMove](snake, speed, gameOptions.delta);
    const { x, z } = snake.position;

    if (x >= gameFieldSize.x / 2) {
      snake.translateX(-gameFieldSize.x);
    } else if (x <= -gameFieldSize.x / 2) {
      snake.translateX(gameFieldSize.x);
    } else if (z >= gameFieldSize.y / 2) {
      snake.translateZ(-gameFieldSize.y);
    } else if (z <= -gameFieldSize.y / 2) {
      snake.translateZ(gameFieldSize.y);
    }

    if (checkCollision(snake, apple)) {
      regenerateApple();
    }
  }
};

const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshStandardMaterial({ color: 0x386641 });
export const snake = new THREE.Mesh(geometry, material);
snake.translateY(1);

let lastMove: null | number = null;
export const moveSnake = () => snakeMoveHandler(snake, lastMove);
export const initSnake = () => {
  window.addEventListener(
    "keydown",
    (e) =>
      (lastMove = lastMove !== e.keyCode && move[e.keyCode] ? e.keyCode : null)
  );

  return snake;
};

function lerp(a, b, t) {
  return a + (b - a) * t;
}
