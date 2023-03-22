import GUI from "lil-gui";
import type { Mesh, Euler, Material } from "three";
import gsap from "gsap";

const gui = new GUI();

const methods = {
  spin: (rotation: Euler) => {
    const loops = 4;
    gsap.to(rotation, {
      duration: 4.4 * loops,
      y: rotation.y + Math.PI * 2 * loops,
      ease: "linear",
    });
  },
};

export const debugMesh = (mesh: Mesh, folderName = "General") => {
  const folder = gui.addFolder(folderName);
  folder.add({ spin: methods.spin.bind(this, mesh.rotation) }, "spin");

  folder.add(mesh.position, "x").min(-5).max(5).step(0.05);
  folder.add(mesh.position, "y").min(-5).max(5).step(0.05);
  folder.add(mesh.position, "z").min(-5).max(5).step(0.05);

};

export const debugMaterial = (material: Material, folderName = "General") => {
    const folder = gui.addFolder(folderName);
    folder.addColor(material, "color");
    folder.add(material, "roughness").min(0).max(1).step(0.1);
    folder.add(material, "metalness").min(0).max(1).step(0.1);
}