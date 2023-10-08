import * as THREE from 'three';

export const checkCollision = (obj1, obj2) => {
  const snakeBox = new THREE.Box3().setFromObject(obj1);
  const appleBox = new THREE.Box3().setFromObject(obj2);
  
  const intersectionBox = snakeBox.clone().intersect(appleBox);
  
  const volume = (box) => {
    const size = new THREE.Vector3();
    box.getSize(size);
    return size.x * size.y * size.z;
  };
  
  const snakeVolume = volume(snakeBox);
  const intersectionVolume = volume(intersectionBox);
  
  const percentage = (intersectionVolume / snakeVolume) * 100;

  return percentage > 20;
}
