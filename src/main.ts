import "./style.css";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { debugMesh } from "./gui";

//Scene and Camera initialize
const elementCanvas = document.createElement("canvas");
document.body.appendChild(elementCanvas);
const canvas = elementCanvas;
const renderSize = { w: window.innerWidth, h: window.innerHeight };
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, renderSize.w / renderSize.h);
scene.add(new THREE.AxesHelper());

// Default Cube
const MaterialBasic = new THREE.MeshBasicMaterial({ color: 0xaaaaaa });
const MeshDefaultCube = new THREE.Mesh(
  new THREE.BoxGeometry(1, 1, 1),
  MaterialBasic
);
scene.add(MeshDefaultCube);
debugMesh(MeshDefaultCube, "Default Cube");

camera.position.z = 3;
const controls = new OrbitControls(camera, canvas);
scene.add(camera);
const renderer = new THREE.WebGLRenderer({ canvas: canvas });
renderer.setSize(renderSize.w, renderSize.h);

const newFrame = () => {
  controls.update();
  renderer.render(scene, camera);
  window.requestAnimationFrame(newFrame);
};
newFrame();
