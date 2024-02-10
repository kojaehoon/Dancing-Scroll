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
camera.position.y = 1; // 카메라 위치
camera.position.z = 5; // 카메라 위치

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

const geometry = new THREE.BoxGeometry(1, 1, 1); // Geometry 생성 (가로, 세로, 높이)
const material = new THREE.MeshStandardMaterial({ color: 0xff0000 }); // Material 생성 (색상)
const mesh = new THREE.Mesh(geometry, material); // Mesh 생성 (Geometry, Material)
mesh.castShadow = true; // 그림자 생성
mesh.receiveShadow = true; // 그림자 생성
mesh.position.y = 0.5; // Mesh 위치
scene.add(mesh); // Scene에 Mesh 추가

const capsuleGeometry = new THREE.CapsuleGeometry(1, 2, 20, 30); // Geometry 생성 (반지름, 높이, 세그먼트, 세그먼트)
const capsuleMaterial = new THREE.MeshStandardMaterial({ color: 0xffff00 }); // Material 생성 (색상)
const capsuleMesh = new THREE.Mesh(capsuleGeometry, capsuleMaterial); // Mesh 생성 (Geometry, Material)
capsuleMesh.position.set(3, 1.75, 0); // Mesh 위치
capsuleMesh.castShadow = true; // 그림자 생성
capsuleMesh.receiveShadow = true; // 그림자 생성
scene.add(capsuleMesh); // Scene에 Mesh 추가

const cylinderGeometry = new THREE.CylinderGeometry(1, 1, 2); // Geometry 생성 (상단 반지름, 하단 반지름, 높이, 세그먼트(몇각형으로 나눌지))
const cylinderMaterial = new THREE.MeshStandardMaterial({ color: 0x00ff00 }); // Material 생성 (색상)
const cylinderMesh = new THREE.Mesh(cylinderGeometry, cylinderMaterial); // Mesh 생성 (Geometry, Material)
cylinderMesh.position.set(-3, 1, 0); // Mesh 위치
cylinderMesh.castShadow = true; // 그림자 생성
cylinderMesh.receiveShadow = true; // 그림자 생성
scene.add(cylinderMesh); // Scene에 Mesh 추가

const torusGeometry = new THREE.TorusGeometry(0.5, 0.1, 16, 100, Math.PI / 2); // Geometry 생성 (반지름, 관의 반지름, 반지름 세그먼트, 관의 세그먼트)
const torusMaterial = new THREE.MeshStandardMaterial({ color: 0x0000ff }); // Material 생성 (색상)
const torusMesh = new THREE.Mesh(torusGeometry, torusMaterial); // Mesh 생성 (Geometry, Material)
torusMesh.position.set(0, 0.5, 1); // Mesh 위치
torusMesh.castShadow = true; // 그림자 생성
torusMesh.receiveShadow = true; // 그림자 생성
scene.add(torusMesh); // Scene에 Mesh 추가

const starShape = new THREE.Shape(); // Shape 생성
starShape.moveTo(0, 1); // 시작점
starShape.lineTo(0.2, 0.2); // 선
starShape.lineTo(1, 0.2); // 선
starShape.lineTo(0.4, -0.2); // 선
starShape.lineTo(0.6, -1); // 선
starShape.lineTo(0, -0.5); // 선
starShape.lineTo(-0.6, -1); // 선
starShape.lineTo(-0.4, -0.2); // 선
starShape.lineTo(-1, 0.2); // 선
starShape.lineTo(-0.2, 0.2); // 선
starShape.lineTo(0, 1); // 선
const shapeGeometry = new THREE.ShapeGeometry(starShape); // Geometry 생성 (Shape)
const shapeMaterial = new THREE.MeshStandardMaterial({ color: 0xff00ff }); // Material 생성 (색상)
const shapeMesh = new THREE.Mesh(shapeGeometry, shapeMaterial); // Mesh 생성 (Geometry, Material)
shapeMesh.position.set(0, 1, 2); // Mesh 위치
scene.add(shapeMesh); // Scene에 Mesh 추가 

const extrudeSettings = {
  steps: 1, // 세그먼트
  depth: 0.1, // 깊이
  bevelEnabled: true, // 모서리를 둥글게 할지
  bevelThickness: 0.1, // 모서리 둥글기 두께
  bevelSize: 0.3, // 모서리 둥글기 크기
  bevelSegments: 100 // 모서리 둥글기 세그먼트
};
const extrudeGeometry = new THREE.ExtrudeGeometry(starShape, extrudeSettings); // Geometry 생성 (Shape, 설정)
const extrudeMaterial = new THREE.MeshStandardMaterial({ color: 0x0ddaaf }); // Material 생성 (색상)
const extrudeMesh = new THREE.Mesh(extrudeGeometry, extrudeMaterial); // Mesh 생성 (Geometry, Material)
extrudeMesh.position.set(2, 1.3, 2); // Mesh 위치
extrudeMesh.castShadow = true; // 그림자 생성
extrudeMesh.receiveShadow = true; // 그림자 생성
scene.add(extrudeMesh); // Scene에 Mesh 추가

const sphereGeometry = new THREE.SphereGeometry(1, 32, 32); // Geometry 생성 (반지름, 가로 세그먼트, 세로 세그먼트)
const sphereMaterial = new THREE.MeshStandardMaterial({ color: 0x00ffff }); // Material 생성 (색상)
const sphereMesh = new THREE.Mesh(sphereGeometry, sphereMaterial); // Mesh 생성 (Geometry, Material)
sphereMesh.position.set(0, 1, -3); // Mesh 위치
sphereMesh.castShadow = true; // 그림자 생성
sphereMesh.receiveShadow = true; // 그림자 생성
scene.add(sphereMesh); // Scene에 Mesh 추가

const numPoints = 1000;
const positions = new Float32Array(numPoints * 3); // Float32Array 생성

for (let i = 0; i < numPoints; i++) {
  const x = (Math.random() - 0.5) * 1;
  const y = (Math.random() - 0.5) * 1;
  const z = (Math.random() - 0.5) * 1;

  positions[i * 3] = x;
  positions[i * 3 + 1] = y;
  positions[i * 3 + 2] = z;
}
const bufferGeometry = new THREE.BufferGeometry(); // BufferGeometry 생성
bufferGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3)); // BufferGeometry에 속성 추가
const pointsMaterial = new THREE.PointsMaterial({ color: 0xffff00, size: 0.05 }); // Material 생성 (색상, 크기)
const points = new THREE.Points(sphereGeometry, pointsMaterial); // Points 생성 (Geometry, Material)
points.position.set(0, 0, -5); // Points 위치
scene.add(points); // Scene에 Points 추가

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
};

render(); // render 함수 호출