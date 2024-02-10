import "./style.css"
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'; // 마우스로 카메라를 움직이기 위한 OrbitControls

// Scene, Camera, Mesh, Renderer 생성
// Renderer 생성
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.shadowMap.enabled = true; // 그림자 생성   
renderer.setSize(window.innerWidth, window.innerHeight); // Renderer의 크기 설정
document.body.appendChild(renderer.domElement); // Renderer의 DOMElement를 body에 추가

const scene = new THREE.Scene(); // Scene 생성

// 카메라 종류 : 퍼스펙티브, 오쏘그래피
const camera = new THREE.PerspectiveCamera(
    60, // 시야각
    window.innerWidth / window.innerHeight, // 종횡비
    0.1, // Near
    100 // Far
);
camera.position.x = 5; // 카메라 위치
camera.position.y = 5; // 카메라 위치
camera.position.z = 10; // 카메라 위치

// Light 생성
const directionalLight = new THREE.DirectionalLight(0xffffff, 5); // 직사광선 생성 (색상, 강도)
directionalLight.castShadow = true; // 그림자 생성
directionalLight.position.set(3, 4, 5); // Light 위치
directionalLight.lookAt(0, 0, 0); // Light가 바라보는 방향
scene.add(directionalLight); // Scene에 Light 추가

// Mesh 생성
const floorGeometry = new THREE.PlaneGeometry(20, 20); // Geometry 생성 (가로, 세로)
const floorMaterial = new THREE.MeshStandardMaterial({ color: 0xbbbbbb }); // Material 생성 (색상)
const floor = new THREE.Mesh(floorGeometry, floorMaterial); // Mesh 생성 (Geometry, Material)
floor.rotation.x = -Math.PI / 2; // Mesh 회전 -> 바닥으로 만들기 위해 x축으로 -90도 회전
floor.receiveShadow = true; // 그림자 생성
floor.castShadow = true; // 그림자 생성
scene.add(floor); // Scene에 Mesh 추가

// frontSide, backSide, doubleSide
const frontSideGeometry = new THREE.BoxGeometry(1, 1, 1); // Geometry 생성 (가로, 세로, 높이)
const frontSideMaterial = new THREE.MeshStandardMaterial({ color: 0x00ffff, side: THREE.FrontSide }); // Material 생성 (색상)
const frontSide = new THREE.Mesh(frontSideGeometry, frontSideMaterial); // Mesh 생성 (Geometry, Material)
frontSide.position.y = 0.5; // Mesh 위치
frontSide.position.z = 4; // Mesh 위치
frontSide.castShadow = true; // 그림자 생성 
frontSide.receiveShadow = true; // 그림자 생성
scene.add(frontSide); // Scene에 Mesh 추가

const backSideGeometry = new THREE.BoxGeometry(1, 1, 1); // Geometry 생성 (가로, 세로, 높이)
const backSideMaterial = new THREE.MeshStandardMaterial({ color: 0xff00ff, side: THREE.BackSide }); // Material 생성 (색상)
const backSide = new THREE.Mesh(backSideGeometry, backSideMaterial); // Mesh 생성 (Geometry, Material)
backSide.position.set(2, 0.5, 4); // Mesh 위치
backSide.position.y = 0.51; // Mesh 위치
// backSide.castShadow = true; // 그림자 생성
backSide.receiveShadow = true; // 그림자 생성
scene.add(backSide); // Scene에 Mesh 추가

const doubleSideGeometry = new THREE.BoxGeometry(1, 1, 1); // Geometry 생성 (가로, 세로, 높이)
const doubleSideMaterial = new THREE.MeshStandardMaterial({ color: 0xffff00, side: THREE.DoubleSide }); // Material 생성 (색상)
const doubleSide = new THREE.Mesh(doubleSideGeometry, doubleSideMaterial); // Mesh 생성 (Geometry, Material)
doubleSide.position.set(4, 0.5, 4); // Mesh 위치
doubleSide.position.y = 0.51; // Mesh 위치
// doubleSide.castShadow = true; // 그림자 생성
doubleSide.receiveShadow = true; // 그림자 생성
scene.add(doubleSide); // Scene에 Mesh 추가

const torusKnotGeometry = new THREE.TorusKnotGeometry(0.5, 0.15, 100, 20); // Geometry 생성 (반지름, 관, 둥근 정도, 둥근 정도의 세분화)
const torusKnotMaterial = new THREE.MeshStandardMaterial({ color: 0xff0000 }); // Material 생성 (색상)
torusKnotMaterial.roughness = 0.5; // Material의 거칠기
torusKnotMaterial.metalness = 1; // Material의 금속성
const torusKnot = new THREE.Mesh(torusKnotGeometry, torusKnotMaterial); // Mesh 생성 (Geometry, Material)
torusKnot.position.set(-4, 1, 0); // Mesh 위치
torusKnot.castShadow = true; // 그림자 생성
torusKnot.receiveShadow = true; // 그림자 생성
scene.add(torusKnot); // Scene에 Mesh 추가

const torusKnotLambertMaterial = new THREE.MeshLambertMaterial({ color: 0xff0000 }); // Material 생성 (색상)
torusKnotLambertMaterial.emissive = new THREE.Color(0x0000ff); // Material의 발광색
torusKnotLambertMaterial.emissiveIntensity = 0.2; // Material의 발광 강도
const torusKnotLambert = new THREE.Mesh(torusKnotGeometry, torusKnotLambertMaterial); // Mesh 생성 (Geometry, Material)
torusKnotLambert.position.set(-2, 1, 0); // Mesh 위치
torusKnotLambert.castShadow = true; // 그림자 생성
torusKnotLambert.receiveShadow = true; // 그림자 생성
scene.add(torusKnotLambert); // Scene에 Mesh 추가

const torusKnotPhongMaterial = new THREE.MeshPhongMaterial({ color: 0xff0000 }); // Material 생성 (색상)
torusKnotPhongMaterial.emissive = new THREE.Color(0x00ff00); // Material의 발광색
torusKnotPhongMaterial.emissiveIntensity = 0.2; // Material의 발광 강도
torusKnotPhongMaterial.specular = new THREE.Color(0x0000ff); // Material의 반사색
torusKnotPhongMaterial.shininess = 100; // Material의 광택
const torusKnotPhong = new THREE.Mesh(torusKnotGeometry, torusKnotPhongMaterial); // Mesh 생성 (Geometry, Material)
torusKnotPhong.position.set(0, 1, 0); // Mesh 위치
torusKnotPhong.castShadow = true; // 그림자 생성
torusKnotPhong.receiveShadow = true; // 그림자 생성
scene.add(torusKnotPhong); // Scene에 Mesh 추가

const torusKnotBasicMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000 }); // Material 생성 (색상)
const torusKnotBasic = new THREE.Mesh(torusKnotGeometry, torusKnotBasicMaterial); // Mesh 생성 (Geometry, Material)
torusKnotBasic.position.set(2, 1, 0); // Mesh 위치
torusKnotBasic.castShadow = true; // 그림자 생성
torusKnotBasic.receiveShadow = true; // 그림자 생성
scene.add(torusKnotBasic); // Scene에 Mesh 추가

const torusKnotDepthMaterial = new THREE.MeshDepthMaterial({ color: 0xfffff }); // Material 생성
torusKnotDepthMaterial.opacity = 0.5; // Material의 와이어프레임
const torusKnotDepth = new THREE.Mesh(torusKnotGeometry, torusKnotDepthMaterial); // Mesh 생성 (Geometry, Material)
torusKnotDepth.position.set(4, 1, 0); // Mesh 위치
torusKnotDepth.castShadow = true; // 그림자 생성
torusKnotDepth.receiveShadow = true; // 그림자 생성
scene.add(torusKnotDepth); // Scene에 Mesh 추가

const textureLoader = new THREE.TextureLoader(); // TextureLoader 생성
// textureLoader.load("/threejs.webp", (texture) => {
//     const textureBoxGeometry = new THREE.BoxGeometry(1, 1, 1); // Geometry 생성 (가로, 세로, 높이)
//     const textureBoxMaterial = new THREE.MeshStandardMaterial({ map: texture }); // Material 생성 (색상)
//     const textureBox = new THREE.Mesh(textureBoxGeometry, textureBoxMaterial); // Mesh 생성 (Geometry, Material)
//     textureBox.position.set(0, 0.5, 2); // Mesh 위치
//     textureBox.castShadow = true; // 그림자 생성
//     textureBox.receiveShadow = true; // 그림자 생성
//     scene.add(textureBox); // Scene에 Mesh 추가
// }); // TextureLoader로 이미지 로드
const texture = await textureLoader.loadAsync("/threejs.webp");
const textureBoxGeometry = new THREE.BoxGeometry(1, 1, 1); // Geometry 생성 (가로, 세로, 높이)
const textureBoxMaterial = new THREE.MeshStandardMaterial({ map: texture }); // Material 생성 (색상)
const textureBox = new THREE.Mesh(textureBoxGeometry, textureBoxMaterial); // Mesh 생성 (Geometry, Material)
textureBox.position.set(0, 0.5, 2); // Mesh 위치
textureBox.castShadow = true; // 그림자 생성
textureBox.receiveShadow = true; // 그림자 생성
scene.add(textureBox); // Scene에 Mesh 추가








// OrbitControls 생성
const orbitControls = new OrbitControls(camera, renderer.domElement); // OrbitControls 생성 (카메라, Renderer의 DOMElement)
orbitControls.update(); // OrbitControls 업데이트

window.addEventListener('resize', () => {
  renderer.setSize(window.innerWidth, window.innerHeight); // Renderer의 크기 설정
  camera.aspect = window.innerWidth / window.innerHeight; // 종횡비 설정
  camera.updateProjectionMatrix(); // 카메라의 종횡비 업데이트
  renderer.render(scene, camera); // Renderer에 Scene과 Camera를 넣어줘야함  
});

const render = () => {
    requestAnimationFrame(render); // 애니메이션 프레임 생성
    renderer.render(scene, camera); // Renderer에 Scene과 Camera를 넣어줘야함
    textureBox.rotation.y += 0.01; // Mesh 회전
};

render(); // render 함수 호출