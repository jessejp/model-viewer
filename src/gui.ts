import GUI from "lil-gui";
import type { Mesh } from "three";

const gui = new GUI();

export const debugMesh = (mesh: Mesh, folderName = 'General') => {
    const folder = gui.addFolder(folderName);
    folder.add(mesh.position, 'x').min(-5).max(5).step(0.05);
    folder.add(mesh.position, 'y').min(-5).max(5).step(0.05);
    folder.add(mesh.position, 'z').min(-5).max(5).step(0.05);
    folder.addColor(mesh.material, 'color');
}