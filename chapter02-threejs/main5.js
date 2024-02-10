import "./style.css"
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'; // 마우스로 카메라를 움직이기 위한 OrbitControls
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
floor.name = "FLOOR"; // Mesh 이름
scene.add(floor); // Scene에 Mesh 추가

const BoxGeometry = new THREE.BoxGeometry(1, 1, 1); // Geometry 생성 (가로, 세로, 높이)
const BoxMaterial = new THREE.MeshStandardMaterial({ color: 0xffff00 }); // Material 생성 (색상)
const textureBox = new THREE.Mesh(BoxGeometry, BoxMaterial); // Mesh 생성 (Geometry, Material)
textureBox.position.y = 0.5; // Mesh 위치
textureBox.castShadow = true; // 그림자 생성
textureBox.receiveShadow = true; // 그림자 생성
// scene.add(textureBox); // Scene에 Mesh 추가

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

// GLTFLoader 생성
const gltfLoader = new GLTFLoader(); // GLTFLoader 생성
const gltf = await gltfLoader.loadAsync("/dancer.glb"); // GLTF 파일 로드 (파일경로, 콜백함수)
console.log(gltf); // 꽤 필수로 봐야할 부분
const character = gltf.scene; // 로드된 데이터에서 scene을 가져옴
const animationClips = gltf.animations; // 로드된 데이터에서 animations를 가져옴
character.position.y = 0.8; // Mesh 위치
character.scale.set(0.01, 0.01, 0.01); // Mesh 크기
character.castShadow = true; // 그림자 생성
character.receiveShadow = true; // 그림자 생성
character.traverse((child) => { // 로드된 데이터의 모든 자식에 대해 반복
    if (child.isMesh) { // 자식이 Mesh인 경우
        child.castShadow = true; // 그림자 생성
        child.receiveShadow = true; // 그림자 생성
    }
});

scene.add(character); // Scene에 로드된 데이터 추가

const mixer = new THREE.AnimationMixer(character); // AnimationMixer 생성
const action = mixer.clipAction(animationClips[0]); // AnimationMixer에 AnimationClip 추가
// action.setLoop(THREE.LoopOnce); // AnimationMixer의 반복 설정 (LoopOnce : 한번만 실행)
// action.setLoop(THREE.LoopRepeat); // AnimationMixer의 반복 설정 (LoopRepeat : 반복 실행)
action.setLoop(THREE.LoopPingPong); // AnimationMixer의 반복 설정 (LoopPingPong : 왕복 실행)
// action.setDuration(4); // AnimationMixer의 지속시간 설정 (default : 4)
// action.setEffectiveTimeScale(1); // AnimationMixer의 시간 스케일 설정 (default : 1) (배속)
// action.setEffectiveWeight(2); // AnimationMixer의 가중치 설정 (default : 1) (투명도) 낮을수록 춤을 대충춤
action.play(); // AnimationMixer 실행
// setTimeout(() => {
//     mixer.clipAction(animationClips[0]).paused = true; // 3초 후에 AnimationMixer 정지
// }, 3000); // 3초 후에 AnimationMixer 정지




// OrbitControls 생성
const orbitControls = new OrbitControls(camera, renderer.domElement); // OrbitControls 생성 (카메라, Renderer의 DOMElement)
orbitControls.enableDamping = true; // 카메라의 부드러운 움직임 설정
orbitControls.dampingFactor = 0.05; // 카메라의 부드러운 움직임 설정 (값이 작을수록 더 부드러워짐)

const newPosition = new THREE.Vector3(0, 1, 0); // 새로운 위치 생성
const rayCaster = new THREE.Raycaster(); // Raycaster 생성
renderer.domElement.addEventListener('pointerdown', (e) => { // Renderer의 DOMElement에 클릭 이벤트 추가
    const x = (e.clientX / window.innerWidth) * 2 - 1; // 클릭한 x좌표
    const y = -(e.clientY / window.innerHeight) * 2 + 1; // 클릭한 y좌표

    rayCaster.setFromCamera(new THREE.Vector2(x, y), camera); // Raycaster의 시작점 설정
    const intersects = rayCaster.intersectObjects(scene.children, true); // Raycaster로 Scene의 Mesh와 광선이 교차하는지 확인

    const intersectFloor = intersects.find((intersect) => intersect.object.name === "FLOOR"); // Floor와 교차한 Mesh 찾기
    console.log(intersectFloor); // Raycaster로 교차한 Floor 출력
    newPosition.copy(intersectFloor.point); // Floor와 교차한 Mesh의 위치를 새로운 위치로 설정
    newPosition.y = 1; // 새로운 위치의 y좌표를 1로 설정
});

window.addEventListener('resize', () => {
  renderer.setSize(window.innerWidth, window.innerHeight); // Renderer의 크기 설정
  camera.aspect = window.innerWidth / window.innerHeight; // 종횡비 설정
  camera.updateProjectionMatrix(); // 카메라의 종횡비 업데이트
  renderer.render(scene, camera); // Renderer에 Scene과 Camera를 넣어줘야함  
});

const clock = new THREE.Clock(); // 시간을 계산하기 위한 Clock 생성
const targetVector = new THREE.Vector3(); // Target 위치 생성
const render = () => {
    character.lookAt(newPosition); // Mesh가 새로운 위치를 바라보도록 설정
    targetVector.subVectors(newPosition, character.position).normalize().multiplyScalar(0.01); // 새로운 위치로 이동하기 위한 벡터 생성
    if(Math.abs(character.position.x - newPosition.x) > 0.01 || Math.abs(character.position.z - newPosition.z) > 0.01) { // 새로운 위치와 Mesh의 위치가 0.01보다 큰 경우
        character.position.x += targetVector.x; // Mesh의 x좌표를 새로운 위치로 이동
        character.position.z += targetVector.z; // Mesh의 z좌표를 새로운 위치로 이동
        action.stop(); // AnimationMixer 정지
    }
    action.play(); // AnimationMixer 실행
    requestAnimationFrame(render); // 애니메이션 프레임 생성
    renderer.render(scene, camera); // Renderer에 Scene과 Camera를 넣어줘야함
    orbitControls.update(); // OrbitControls 업데이트
    if (mixer) {
        mixer.update(clock.getDelta()); // AnimationMixer 업데이트
    }
};

render(); // render 함수 호출