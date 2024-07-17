import * as THREE from 'three';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls';

import Earth from "./../assets/img/earth.jpg";
import Jupiter from "./../assets/img/jupiter.jpg";
import Mars from "./../assets/img/mars.jpg";
import Mercury from "./../assets/img/mercury.jpg";
import Neptune from "./../assets/img/neptune.jpg";
import Pluto from "./../assets/img/pluto.jpg";
import Satrun from "./../assets/img/saturn.jpg";
import SatrunRing from "./../assets/img/saturn ring.png";
import Star from "./../assets/img/stars.jpg";
import Sun from "./../assets/img/sun.jpg";
import Uranus from "./../assets/img/uranus.jpg";
import UranusRing from "./../assets/img/uranus ring.png";
import Venus from "./../assets/img/venus.jpg";

const renderer = new THREE.WebGLRenderer();

renderer.setSize(window.innerWidth, window.innerHeight);

document.body.appendChild(renderer.domElement);

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
    45,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
);

const orbit = new OrbitControls(camera, renderer.domElement);

camera.position.set(-90, 140, 140);
orbit.update();

const ambientLight = new THREE.AmbientLight(0x333333);
scene.add(ambientLight);

const cubeTextureLoader = new THREE.CubeTextureLoader();
scene.background = cubeTextureLoader.load([
    Star,
    Star,
    Star,
    Star,
    Star,
    Star,
]);

const textureLoader = new THREE.TextureLoader();

const sunGeo = new THREE.SphereGeometry(16, 30, 30);
const sunMat = new THREE.MeshBasicMaterial({
    map: textureLoader.load(Sun)
})
const sunGeoMat = new THREE.Mesh(sunGeo, sunMat);
scene.add(sunGeoMat);

function createPlanete(size, texture, position, ring) {
    const geo = new THREE.SphereGeometry(size, 30, 30);
    const mat = new THREE.MeshBasicMaterial({
        map: textureLoader.load(texture)
    });
    const mesh = new THREE.Mesh(geo, mat);
    const obj = new THREE.Object3D();
    obj.add(mesh);
    if(ring) {
        const ringGeo = new THREE.RingGeometry(
            ring.innerRadius,
            ring.outerRadius,
            32);
        const ringMat = new THREE.MeshBasicMaterial({
            map: textureLoader.load(ring.texture),
            side: THREE.DoubleSide
        });
        const ringMesh = new THREE.Mesh(ringGeo, ringMat);
        obj.add(ringMesh);
        ringMesh.position.x = position;
        ringMesh.rotation.x = -0.5 * Math.PI;
    }
    scene.add(obj);
    mesh.position.x = position;
    return {mesh, obj}
}

const mercury = createPlanete(3.2, Mercury, 28);
const venus = createPlanete(5.8, Venus, 44);
const earth = createPlanete(6, Earth, 62);
const mars = createPlanete(4, Mars, 78);
const jupiter = createPlanete(12, Jupiter, 100);
const saturn = createPlanete(10, Satrun, 138, {
    innerRadius: 10,
    outerRadius: 20,
    texture: SatrunRing
});
const uranus = createPlanete(7, Uranus, 176, {
    innerRadius: 7,
    outerRadius: 12,
    texture: UranusRing
});
const neptune = createPlanete(7, Neptune, 200);
const pluto = createPlanete(2.8, Pluto, 216);

const pointLight = new THREE.PointLight(0xFFFFFF, 2, 3000);
scene.add(pointLight);


function animate() {
     //Self-rotation
     sunGeoMat.rotateY(0.004);
     mercury.mesh.rotateY(0.004);
     venus.mesh.rotateY(0.002);
     earth.mesh.rotateY(0.02);
     mars.mesh.rotateY(0.018);
     jupiter.mesh.rotateY(0.04);
     saturn.mesh.rotateY(0.038);
     uranus.mesh.rotateY(0.03);
     neptune.mesh.rotateY(0.032);
     pluto.mesh.rotateY(0.008);
 
     //Around-sun-rotation
     mercury.obj.rotateY(0.04);
     venus.obj.rotateY(0.015);
     earth.obj.rotateY(0.01);
     mars.obj.rotateY(0.008);
     jupiter.obj.rotateY(0.002);
     saturn.obj.rotateY(0.0009);
     uranus.obj.rotateY(0.0004);
     neptune.obj.rotateY(0.0001);
     pluto.obj.rotateY(0.00007);

    renderer.render(scene, camera);
}

window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth,window.innerHeight)
})


renderer.setAnimationLoop(animate);