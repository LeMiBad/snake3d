import * as THREE from 'three';


export const checkCollision = (obj1: THREE.Mesh<THREE.BoxGeometry, THREE.MeshStandardMaterial>, obj2: THREE.Mesh<THREE.BoxGeometry, THREE.MeshStandardMaterial>) => {
  const snakeBox = new THREE.Box3().setFromObject(obj1);
  const appleBox = new THREE.Box3().setFromObject(obj2);

  return snakeBox.intersectsBox(appleBox);
}