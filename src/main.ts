import "./style.css";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { debugMaterial, debugMesh } from "./gui";

//Scene and Camera initialize
const elementCanvas = document.createElement("canvas");
document.body.appendChild(elementCanvas);
const canvas = elementCanvas;
const renderSize = { w: window.innerWidth, h: window.innerHeight };
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, renderSize.w / renderSize.h);
scene.add(new THREE.AxesHelper());

// Texture
const loadingManager = new THREE.LoadingManager();
const textureLoader = new THREE.TextureLoader(loadingManager); 
const colorTexture = textureLoader.load("/textures/door/color.jpg");
colorTexture.wrapS = THREE.MirroredRepeatWrapping;
colorTexture.wrapT = THREE.MirroredRepeatWrapping;
/* colorTexture.repeat.x = 2;
colorTexture.repeat.y = 3;
colorTexture.rotation = Math.PI * 0.25; */
const alphaTexture = textureLoader.load("/textures/door/alpha.jpg");
const heightTexture = textureLoader.load("/textures/door/height.jpg");
const normalTexture = textureLoader.load("/textures/door/normal.jpg");
const ambientOcclusionTexture = textureLoader.load("/textures/door/ambientOcclusion.jpg");
const metalnessTexture = textureLoader.load("/textures/door/metalness.jpg");
const roughnessTexture = textureLoader.load("/textures/door/roughness.jpg");

// Default Cube
const MaterialBasic = new THREE.MeshStandardMaterial();
MaterialBasic.side = THREE.DoubleSide;
MaterialBasic.map = colorTexture;
MaterialBasic.roughness = 0;
MaterialBasic.metalness = 0.5;
debugMaterial(MaterialBasic, "Material Basic");

const MeshDefaultCube = new THREE.Mesh(
  new THREE.BoxGeometry(1, 1, 1),
  MaterialBasic
);

const MeshPlane = new THREE.Mesh(new THREE.PlaneGeometry(1, 1), MaterialBasic);
MeshPlane.position.x = -2;

scene.add(MeshDefaultCube, MeshPlane);
debugMesh(MeshDefaultCube, "Default Cube");
debugMesh(MeshPlane, "Default Plane");

// Camera and Lighting
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
const pointLight = new THREE.PointLight(0xffffff, 0.8);
pointLight.position.set(2, 3, 4);
camera.position.z = 3;
const controls = new OrbitControls(camera, canvas);
scene.add(camera, ambientLight, pointLight);
const renderer = new THREE.WebGLRenderer({ canvas: canvas });
renderer.setSize(renderSize.w, renderSize.h);

window.addEventListener("resize", () => {
  renderSize.w = window.innerWidth;
  renderSize.h = window.innerHeight;

  camera.aspect = renderSize.w / renderSize.h;
  camera.updateProjectionMatrix();

  renderer.setSize(renderSize.w, renderSize.h);
});

const newFrame = () => {
  controls.update();
  renderer.render(scene, camera);
  window.requestAnimationFrame(newFrame);
};
newFrame();
