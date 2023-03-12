import "./style.css";
import * as THREE from "three";


//Scene and Camera initialize
const elementCanvas = document.createElement('canvas');
document.body?.appendChild(elementCanvas);
const canvas = elementCanvas;
const renderSize = { w: 800, h: 600 };
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, renderSize.w / renderSize.h);
scene.add(new THREE.AxesHelper());

// Default Cube
const MaterialBasic = new THREE.MeshBasicMaterial({color: 0xaaaaaa})
const MeshDefaultCube = new THREE.Mesh(new THREE.BoxGeometry(1,1,1), MaterialBasic)
scene.add(MeshDefaultCube);

camera.position.z = 3;
scene.add(camera);
const renderer = new THREE.WebGLRenderer({ canvas: canvas });
renderer.setSize(renderSize.w, renderSize.h);

renderer.render(scene, camera)