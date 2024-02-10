import "./style.css"
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'; // 마우스로 카메라를 움직이기 위한 OrbitControls
import { FlyControls } from 'three/examples/jsm/controls/FlyControls'; // 마우스로 카메라를 움직이기 위한 FlyControls
import { FirstPersonControls } from 'three/examples/jsm/controls/FirstPersonControls'; // 마우스로 카메라를 움직이기 위한 FirstPersonControls
import { PointerLockControls } from 'three/examples/jsm/controls/PointerLockControls'; // 마우스로 카메라를 움직이기 위한 PointerLockControls
import { TrackballControls } from 'three/examples/jsm/controls/TrackballControls'; // 마우스로 카메라를 움직이기 위한 TrackballControls
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'; // GLTF 파일을 로드하기 위한 GLTFLoader


// Scene, Camera, Mesh, Renderer 생성
// Renderer 생성
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.shadowMap.enabled = true; // 그림자 생성
// renderer.shadowMap.type = THREE.BasicShadowMap; // 그림자 종류로 성능이 좋지 않음 (기본값)
// renderer.shadowMap.type = THREE.PCFShadowMap; // 그림자 종류로 성능이 중간
renderer.shadowMap.type = THREE.PCFSoftShadowMap; // 그림자 종류로 성능이 좋음
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
camera.position.z = 5; // 카메라 위치

// Mesh 생성
const floorGeometry = new THREE.PlaneGeometry(20, 20); // Geometry 생성 (가로, 세로)
const floorMaterial = new THREE.MeshStandardMaterial({ color: 0xbbbbbb }); // Material 생성 (색상)
const floor = new THREE.Mesh(floorGeometry, floorMaterial); // Mesh 생성 (Geometry, Material)
floor.rotation.x = -Math.PI / 2; // Mesh 회전 -> 바닥으로 만들기 위해 x축으로 -90도 회전
floor.receiveShadow = true; // 그림자 생성
floor.castShadow = true; // 그림자 생성
scene.add(floor); // Scene에 Mesh 추가

const BoxGeometry = new THREE.BoxGeometry(1, 1, 1); // Geometry 생성 (가로, 세로, 높이)
const BoxMaterial = new THREE.MeshStandardMaterial({ color: 0xffff00 }); // Material 생성 (색상)
const textureBox = new THREE.Mesh(BoxGeometry, BoxMaterial); // Mesh 생성 (Geometry, Material)
textureBox.position.y = 0.5; // Mesh 위치
textureBox.castShadow = true; // 그림자 생성
textureBox.receiveShadow = true; // 그림자 생성
scene.add(textureBox); // Scene에 Mesh 추가

const directionalLight = new THREE.DirectionalLight(0xffffff, 5); // 직사광선 생성 (색상, 강도)
directionalLight.castShadow = true; // 그림자 생성
directionalLight.position.set(3, 4, 5); // Light 위치
directionalLight.lookAt(0, 0, 0); // Light가 바라보는 방향
directionalLight.shadow.mapSize.width = 4096; // 그림자 해상도 너비
directionalLight.shadow.mapSize.height = 4096; // 그림자 해상도 높이
directionalLight.shadow.camera.top = 2; // 그림자 카메라 상단
directionalLight.shadow.camera.bottom = -2; // 그림자 카메라 하단
directionalLight.shadow.camera.left = -2; // 그림자 카메라 왼쪽
directionalLight.shadow.camera.right = 2; // 그림자 카메라 오른쪽
directionalLight.shadow.camera.near = 0.1; // 그림자 카메라 가까이
directionalLight.shadow.camera.far = 100; // 그림자 카메라 멀리
scene.add(directionalLight); // Scene에 Light 추가
const directionalLightHelper = new THREE.DirectionalLightHelper(directionalLight, 1); // 직사광선 Helper 생성 (Light, 크기)
scene.add(directionalLightHelper); // Scene에 직사광선 Helper 추가





// OrbitControls 생성
// const orbitControls = new OrbitControls(camera, renderer.domElement); // OrbitControls 생성 (카메라, Renderer의 DOMElement)
// orbitControls.enableDamping = true; // 카메라의 부드러운 움직임 설정
// orbitControls.dampingFactor = 0.05; // 카메라의 부드러운 움직임 설정 (값이 작을수록 더 부드러워짐)
// orbitControls.enableZoom = true; // 줌 설정( true : 줌 가능, false : 줌 불가능 )
// orbitControls.enablePan = true; // 카메라 이동 설정 (true : 이동 가능, false : 이동 불가능)
// orbitControls.enableRotate = true; // 카메라 회전 설정 (true : 회전 가능, false : 회전 불가능)
// orbitControls.autoRotate = true; // 자동 회전 설정 (true : 자동 회전, false : 자동 회전 불가능)
// orbitControls.autoRotateSpeed = 1; // 자동 회전 속도 설정(default : 2)
// orbitControls.maxPolarAngle = Math.PI / 2; // 카메라가 바닥을 볼 수 있는 최대 각도
// orbitControls.minPolarAngle = Math.PI / 4; // 카메라가 바닥을 볼 수 있는 최소 각도
// orbitControls.maxAzimuthAngle = Math.PI / 2; // 카메라가 상하좌우로 움직일 수 있는 최대 각도
// orbitControls.minAzimuthAngle = -Math.PI / 2; // 카메라가 상하좌우로 움직일 수 있는 최소 각도

// const flyControls = new FlyControls(camera, renderer.domElement); // FlyControls 생성 (카메라, Renderer의 DOMElement)
// flyControls.movementSpeed = 5; // 카메라 이동 속도 설정(키보드로 움직일 때 속도)
// flyControls.rollSpeed = Math.PI / 10; // 카메라 회전 속도 설정(키보드로 회전할 때 속도)
// flyControls.autoForward = false; // 카메라 자동 전진 설정( true : 자동 전진, false : 자동 전진 불가능 )

camera.position.set(0, 1, 5); // 카메라 위치
// const firstPersonControls = new FirstPersonControls(camera, renderer.domElement); // FirstPersonControls 생성 (카메라, Renderer의 DOMElement)
// firstPersonControls.lookSpeed = 0.1; // 카메라 회전 속도 설정(마우스로 회전할 때 속도)
// firstPersonControls.movementSpeed = 1; // 카메라 이동 속도 설정(키보드로 움직일 때 속도)
// firstPersonControls.lookVertical = true; // 카메라 수직 회전 설정( true : 수직 회전 가능, false : 수직 회전 불가능 )

// FPS 게임 처럼 마우스를 클릭하면 마우스 커서가 사라지고, ESC를 누르면 마우스 커서가 나타남
// const pointerLockControls = new PointerLockControls(camera, renderer.domElement); // PointerLockControls 생성 (카메라, Renderer의 DOMElement)
// window.addEventListener('click', () => {
//     pointerLockControls.lock(); // 마우스 클릭 시 커서가 사라지고, 카메라가 마우스를 따라다님
// });

const trackballControls = new TrackballControls(camera, renderer.domElement); // TrackballControls 생성 (카메라, Renderer의 DOMElement)
trackballControls.rotateSpeed = 2.0; // 카메라 회전 속도 설정(마우스로 회전할 때 속도)
trackballControls.zoomSpeed = 1.5; // 카메라 줌 속도 설정(마우스로 줌할 때 속도)
trackballControls.panSpeed = 1.0; // 카메라 이동 속도 설정(마우스로 이동할 때 속도)
trackballControls.noRotate = false; // 카메라 회전 설정( true : 회전 불가능, false : 회전 가능 )
trackballControls.noZoom = false; // 카메라 줌 설정( true : 줌 불가능, false : 줌 가능 )
trackballControls.noPan = false; // 카메라 이동 설정( true : 이동 불가능, false : 이동 가능 )
trackballControls.staticMoving = false; // 카메라 부드러운 움직임 설정( true : 부드러움, false : 부드러움 불가능 )
trackballControls.dynamicDampingFactor = 0.05; // 카메라 부드러운 움직임 설정(값이 작을수록 더 부드러워짐)
const target = new THREE.Mesh(
    new THREE.SphereGeometry(0.5),
    new THREE.MeshBasicMaterial({ color: 0xff0000 })
)
target.position.set(4, 0.5, 0);
scene.add(target);
trackballControls.target = target.position; // 카메라가 바라보는 방향 설정


window.addEventListener('resize', () => {
  renderer.setSize(window.innerWidth, window.innerHeight); // Renderer의 크기 설정
  camera.aspect = window.innerWidth / window.innerHeight; // 종횡비 설정
  camera.updateProjectionMatrix(); // 카메라의 종횡비 업데이트
  renderer.render(scene, camera); // Renderer에 Scene과 Camera를 넣어줘야함  
});

const clock = new THREE.Clock(); // 시간을 계산하기 위한 Clock 생성
const render = () => {
    requestAnimationFrame(render); // 애니메이션 프레임 생성
    renderer.render(scene, camera); // Renderer에 Scene과 Camera를 넣어줘야함
    // orbitControls.update(); // OrbitControls 업데이트
    // flyControls.update(clock.getDelta()); // FlyControls 업데이트
    // firstPersonControls.update(clock.getDelta()); // FirstPersonControls 업데이트
    trackballControls.update(); // TrackballControls 업데이트
};

render(); // render 함수 호출