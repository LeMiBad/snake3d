import { apple, regenerateApple } from "./initApple";
import * as THREE from "three";
import { checkCollision } from "./../utils/checkCollision";
import { gameOptions, scene } from "./initGame";

type Vector2 = {
  x: number,
  y: number
}

const speed = 0.005;
const gameFieldSize: Vector2 = {
  x: 20,
  y: 20
}

const move = {
  87: (snake, speed, delta) => snake.translateZ(-speed * delta),
  65: (snake, speed, delta) => snake.translateX(-speed * delta),
  83: (snake, speed, delta) => snake.translateZ(speed * delta),
  68: (snake, speed, delta) => snake.translateX(speed * delta),
};

const bodys = []

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
    const correctionValue = 0.1;

    if (x >= gameFieldSize.x / 2 + correctionValue) {
      snake.translateX(-gameFieldSize.x);
    } else if (x <= -gameFieldSize.x / 2 - correctionValue) {
      snake.translateX(gameFieldSize.x);
    } else if (z >= gameFieldSize.y / 2 + correctionValue) {
      snake.translateZ(-gameFieldSize.y);
    } else if (z <= -gameFieldSize.y / 2 - correctionValue) {
      snake.translateZ(gameFieldSize.y);
    }

    if (checkCollision(snake, apple)) {
      bodys.push({x: Math.round(snake.position.x), z: Math.round(snake.position.z), lastMove})
      initSnakeBody(bodys.length-1)
      regenerateApple();
    }
  }
};

const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshStandardMaterial({ color: 0x386641 });
export const snake = new THREE.Mesh(geometry, material);
snake.translateY(1);

let lastMove: null | number = null;
let curMove: null | number = null;
let lastCoords = `${Math.ceil(snake.position.x)}-${Math.ceil(snake.position.z)}`

const queque = []

export const moveSnake = () => {
  const curCoords = `${Math.ceil(snake.position.x)}-${Math.ceil(snake.position.z)}`;
  
  if (!curMove) {
    curMove = lastMove;
  } 

  if (curCoords !== lastCoords) {
    if (lastMove) {
      queque.unshift({ x: snake.position.x, z: snake.position.z });
      curMove = lastMove;
      lastMove = null;
    }
    lastCoords = curCoords;
  }

  snakeMoveHandler(snake, curMove);
};

export const initSnake = () => {
  window.addEventListener("keydown", (e) => {
    if(!lastMove) {
      lastMove = lastMove !== e.keyCode && move[e.keyCode] ? e.keyCode : null
    }
  });

  return snake;
};


const initSnakeBody = (i) => {
  const geometry = new THREE.BoxGeometry(1, 1, 1);
  const material = new THREE.MeshStandardMaterial({ color: 0x386641 });
  const snakeBody = new THREE.Mesh(geometry, material);

  const {x, z} = bodys[i]

  snakeBody.position.x = x
  snakeBody.position.z = z
  snakeBody.position.y += 1

  bodys[i].body = snakeBody

  scene.add(snakeBody)
}


export const moveBodys = () => {
  const curCoords = `${Math.ceil(snake.position.x)}-${Math.ceil(snake.position.z)}`
  
  if(!curMove) {
    curMove = lastMove
  } 
  
  if(curCoords !== lastCoords) {
    if(lastMove) {
      queque.push(curCoords)
      curMove = lastMove
      lastMove = null
    }
    lastCoords = curCoords
  }
  
  for(let body of bodys) {
    snakeMoveHandler(body.body, curMove)
  }
}