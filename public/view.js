import * as THREE from "https://esm.sh/three";

// イベントハンドラー
window.addEventListener("resize",  onResize);

// 初期設定
const canvas = document.querySelector("canvas");
const renderer = new THREE.WebGLRenderer({canvas: canvas, antialias: true});
renderer.shadowMap.enabled = true;
const scene = new THREE.Scene();

// 環境光源
//const ambientLight = new THREE.AmbientLight(0xffffff, 0.1);
//scene.add(ambientLight);

// スポット光源
const spotLight = new THREE.SpotLight(0xffffff, 1, 100, Math.PI / 4, 1, 0.5);
spotLight.position.set(0, 50, 0)
spotLight.castShadow = true;
spotLight.shadow.mapSize.set(2048, 2048);
scene.add(spotLight);

// カメラ設定
const camera = new THREE.PerspectiveCamera(30, 1, 1, 1000);
camera.position.set(10, 10, 40);
camera.lookAt(new THREE.Vector3(0, 0, 0));
const euler = new THREE.Euler();
const qt = new THREE.Quaternion();
const q1 = new THREE.Quaternion().setFromAxisAngle(
    new THREE.Vector3(1, 0, 0),
    THREE.MathUtils.degToRad(-90),
);

// 床オブジェクト
const floor = new THREE.Mesh(
  new THREE.BoxGeometry(100, 0.1, 100),
  new THREE.MeshLambertMaterial()
)
floor.receiveShadow = true;
floor.position.set(0, -10, 0);
scene.add(floor);

// 携帯電話オブジェクト
const geometry = new THREE.BoxGeometry(7.2, 14.8, .8);  // iphone の 1/10 サイズ
const texture_front = new THREE.TextureLoader().load('iphone-front.png');
texture_front.colorSpace = THREE.SRGBColorSpace;
const texture_back = new THREE.TextureLoader().load('iphone-back.png');
texture_back.colorSpace = THREE.SRGBColorSpace;
const texture_side = new THREE.TextureLoader().load('iphone-side.png');
texture_side.colorSpace = THREE.SRGBColorSpace;
const materials = [
   new THREE.MeshBasicMaterial({ map: texture_side }),
   new THREE.MeshPhysicalMaterial({ color: "silver" }),
   new THREE.MeshPhysicalMaterial({ color: "silver" }),
   new THREE.MeshPhysicalMaterial({ color: "silver" }),
   new THREE.MeshBasicMaterial({ map: texture_front }),
   new THREE.MeshBasicMaterial({ map: texture_back }),
];
const cube = new THREE.Mesh(geometry, materials);
cube.castShadow = true;
cube.rotation.reorder("YXZ");
cube.add(new THREE.AxesHelper(10)); // The X axis is red. The Y axis is green. The Z axis is blue.
scene.add(cube);

// リサイズ
function onResize() {
  const width = window.innerWidth;
  const height = window.innerHeight;
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(width, height);
  camera.aspect = width / height;
  camera.updateProjectionMatrix();
}

// アニメーション
function tick() {
  euler.set(
    THREE.MathUtils.degToRad(beta),
    THREE.MathUtils.degToRad(alpha),
    THREE.MathUtils.degToRad(gamma),
    "YXZ"
  ); 
  qt.setFromEuler(euler);
  qt.multiply(q1);
  cube.quaternion.slerp(qt, 0.1); 
  renderer.render(scene, camera);
  requestAnimationFrame(tick);
}

setInterval(()=>{
  if (!(beta == 0 && alpha == 0 && gamma == 0))
    console.log(beta, alpha, gamma);
}, 2000)

onResize();
tick();
