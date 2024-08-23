import * as THREE from "https://esm.sh/three";

const canvas = document.querySelector("canvas");
const renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: true });
const scene = new THREE.Scene();
const light = new THREE.AmbientLight(0xffffff, 1.0);
scene.add(light);
const camera = new THREE.PerspectiveCamera(30, 1, 1, 1000);
camera.position.set(200, 200, 200);
camera.lookAt(new THREE.Vector3(0, 0, 0));
const euler = new THREE.Euler();
const q1 = new THREE.Quaternion(-Math.sqrt(0.5), 0, 0, Math.sqrt(0.5));

// 携帯電話のモックオブジェクト
const geometry = new THREE.BoxGeometry(72, 148, 8);  // iphone の実サイズ
const loader = new THREE.TextureLoader();
const texture = loader.load('iphone.jpg');
texture.colorSpace = THREE.SRGBColorSpace;
const materials = [
   new THREE.MeshStandardMaterial({ color: "silver" }),
   new THREE.MeshStandardMaterial({ color: "silver" }),
   new THREE.MeshStandardMaterial({ color: "silver" }),
   new THREE.MeshStandardMaterial({ color: "silver" }),
   new THREE.MeshBasicMaterial({ map: texture }),
   new THREE.MeshStandardMaterial({ color: "silver" }),
];
const edges = new THREE.EdgesGeometry(geometry);
const line = new THREE.LineSegments(edges, new THREE.LineBasicMaterial({ color: "black" }));
const mesh = new THREE.Mesh(geometry, materials);
const cube = new THREE.Group();
cube.rotation.reorder("YXZ");
cube.add(line);
cube.add(mesh);
scene.add(cube);

window.addEventListener("resize",  () => {
  const width = window.innerWidth;
  const height = window.innerHeight;
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(width, height);
  camera.aspect = width / height;
  camera.updateProjectionMatrix();
})
window.dispatchEvent(new Event('resize'));

setInterval(() => {
  euler.set( beta, alpha, - gamma, 'YXZ' ); 
  cube.quaternion.setFromEuler( euler );
  cube.quaternion.multiply( q1 );       
  renderer.render(scene, camera);
}, 20)
