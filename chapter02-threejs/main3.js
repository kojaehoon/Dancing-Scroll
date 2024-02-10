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

// Mesh 생성
const floorGeometry = new THREE.PlaneGeometry(20, 20); // Geometry 생성 (가로, 세로)
const floorMaterial = new THREE.MeshStandardMaterial({ color: 0xbbbbbb }); // Material 생성 (색상)
const floor = new THREE.Mesh(floorGeometry, floorMaterial); // Mesh 생성 (Geometry, Material)
floor.rotation.x = -Math.PI / 2; // Mesh 회전 -> 바닥으로 만들기 위해 x축으로 -90도 회전
floor.receiveShadow = true; // 그림자 생성
floor.castShadow = true; // 그림자 생성
scene.add(floor); // Scene에 Mesh 추가

const BoxGeometry = new THREE.BoxGeometry(1, 1, 1); // Geometry 생성 (가로, 세로, 높이)
const BoxMaterial = new THREE.MeshStandardMaterial({ color: 0xffffff }); // Material 생성 (색상)
const textureBox = new THREE.Mesh(BoxGeometry, BoxMaterial); // Mesh 생성 (Geometry, Material)
textureBox.position.y = 0.5; // Mesh 위치
textureBox.castShadow = true; // 그림자 생성
textureBox.receiveShadow = true; // 그림자 생성
scene.add(textureBox); // Scene에 Mesh 추가

// Light 생성

// const ambientLight = new THREE.AmbientLight(0xffffff, 5); // 주변광 생성 (색상, 강도)
// scene.add(ambientLight); // Scene에 주변광 추가

// const directionalLight = new THREE.DirectionalLight(0xffffff, 5); // 직사광선 생성 (색상, 강도)
// directionalLight.castShadow = true; // 그림자 생성
// directionalLight.position.set(3, 4, 5); // Light 위치
// directionalLight.lookAt(0, 0, 0); // Light가 바라보는 방향
// scene.add(directionalLight); // Scene에 Light 추가
// const directionalLightHelper = new THREE.DirectionalLightHelper(directionalLight, 1); // 직사광선 Helper 생성 (Light, 크기)
// scene.add(directionalLightHelper); // Scene에 직사광선 Helper 추가

// const hemisphereLight = new THREE.HemisphereLight(0xb4a912, 0x12f34f, 5); // 반구광 생성 (색상, 그림자 색상, 강도)
// hemisphereLight.position.set(0, 1, 0); // Light 위치
// scene.add(hemisphereLight); // Scene에 Light 추가
// const hemisphereLightHelper = new THREE.HemisphereLightHelper(hemisphereLight, 1); // 반구광 Helper 생성 (Light, 크기)
// scene.add(hemisphereLightHelper); // Scene에 반구광 Helper 추가

// const pointLight = new THREE.PointLight(0xffffff, 5, 5, 4); // 점광선 생성 (색상, 강도, 최대거리, 감쇠)
// pointLight.castShadow = true; // 그림자 생성
// pointLight.position.set(1, 1, 1); // Light 위치
// scene.add(pointLight); // Scene에 Light 추가
// const pointLightHelper = new THREE.PointLightHelper(pointLight, 1); // 점광선 Helper 생성 (Light, 크기)
// scene.add(pointLightHelper); // Scene에 점광선 Helper 추가

// const reacAreaLight = new THREE.RectAreaLight(0xffffff, 5, 2, 2); // 직사광선 생성 (색상, 강도)
// reacAreaLight.position.set(0, 1, 2); // Light 위치
// scene.add(reacAreaLight); // Scene에 Light 추가

const target = new THREE.Object3D(); // Object3D 생성
scene.add(target); // Scene에 Object3D 추가
const spotLight = new THREE.SpotLight(0xffffff, 10, 100, Math.PI / 4, 1, 1); // 스포트라이트 생성 (색상, 강도, 최대거리, 각도, 감쇠, 감쇠)
spotLight.castShadow = true; // 그림자 생성
spotLight.position.set(0, 3, 0); // Light 위치
spotLight.target = target; // Light가 바라보는 방향
spotLight.target.position.set(1, 0, 2); // Light가 바라보는 방향
scene.add(spotLight); // Scene에 Light 추가
const spotLightHelper = new THREE.SpotLightHelper(spotLight); // 스포트라이트 Helper 생성 (Light)
scene.add(spotLightHelper); // Scene에 스포트라이트 Helper 추가




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