// showroom3d.js
// ------------------------------------------------------------
// 360° 3D showroom: asli 3D car model (models/car.glb) ko kaala paint
// karke ek ghoomte platform pe dikhata hai.
//   - Apne aap dheere-dheere ghoomti hai
//   - Mouse / ungli se ghuma sakte ho, scroll se zoom
// Library: three.js (index.html mein import map se aati hai)
// Model: "Car Concept" by Eric Chadwick / Darmstadt Graphics Group,
//        Khronos glTF Sample Assets, license CC BY 4.0
// ------------------------------------------------------------

import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { RoomEnvironment } from "three/addons/environments/RoomEnvironment.js";

const box = document.getElementById("showroom");

// Model bhaari hai (~11 MB), isliye tabhi load karo jab user scroll karke yahan pahunche
const observer = new IntersectionObserver((entries) => {
  if (entries[0].isIntersecting) {
    observer.disconnect();
    startShowroom();
  }
}, { rootMargin: "300px" });
observer.observe(box);

function startShowroom() {
  // --- Renderer (canvas) ---
  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setSize(box.clientWidth, box.clientHeight);
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.0;
  box.appendChild(renderer.domElement);

  // --- Scene aur camera ---
  const scene = new THREE.Scene();
  const pmrem = new THREE.PMREMGenerator(renderer);
  scene.environment = pmrem.fromScene(new RoomEnvironment(), 0.04).texture; // chamakdaar reflections

  const camera = new THREE.PerspectiveCamera(35, box.clientWidth / box.clientHeight, 0.1, 100);
  camera.position.set(4.9, 1.8, 4.9);

  // --- Mouse se ghumane ke controls ---
  const controls = new OrbitControls(camera, renderer.domElement);
  controls.target.set(0, 0.6, 0);
  controls.enableDamping = true;
  controls.autoRotate = true;       // apne aap ghoomna
  controls.autoRotateSpeed = 1.6;
  controls.enablePan = false;
  controls.minDistance = 4;
  controls.maxDistance = 14;
  controls.maxPolarAngle = Math.PI / 2.05; // zameen ke neeche na jaaye

  // --- Laal roshni (DWON style) ---
  const redLight = new THREE.PointLight(0xe10600, 30, 12);
  redLight.position.set(-3, 2, -3);
  scene.add(redLight);
  scene.add(new THREE.HemisphereLight(0xffffff, 0x220000, 0.6));

  // --- Ghoomta platform (turntable) ---
  const platform = new THREE.Mesh(
    new THREE.CylinderGeometry(3.4, 3.5, 0.12, 96),
    new THREE.MeshStandardMaterial({ color: 0x141414, metalness: 0.6, roughness: 0.35 })
  );
  platform.position.y = -0.06;
  scene.add(platform);

  const ring = new THREE.Mesh(
    new THREE.TorusGeometry(3.45, 0.035, 12, 120),
    new THREE.MeshBasicMaterial({ color: 0xe10600 })
  );
  ring.rotation.x = Math.PI / 2;
  ring.position.y = 0.0;
  scene.add(ring);

  // --- Car model load karo ---
  new GLTFLoader().load("models/car.glb", (gltf) => {
    const car = gltf.scene;

    car.traverse((part) => {
      if (!part.isMesh) return;
      const name = (part.material.name || "").toLowerCase();

      // Body ka paint: gehra kaala, glossy clearcoat ke saath
      if (name.startsWith("paint") || name.includes("panel sides")) {
        part.material = new THREE.MeshPhysicalMaterial({
          color: 0x050505, metalness: 0.7, roughness: 0.28, clearcoat: 1, clearcoatRoughness: 0.05,
        });
      }
      // Number plate hata do
      if (name === "license" || part.name.toLowerCase().includes("license")) part.visible = false;
    });

    // Gaadi ko platform ke beech mein rakho aur sahi size do
    const size = new THREE.Box3().setFromObject(car).getSize(new THREE.Vector3());
    const scale = 4.6 / Math.max(size.x, size.z);
    car.scale.setScalar(scale);
    const fitted = new THREE.Box3().setFromObject(car);
    const center = fitted.getCenter(new THREE.Vector3());
    car.position.x -= center.x;
    car.position.z -= center.z;
    car.position.y -= fitted.min.y;

    scene.add(car);
    const loading = box.querySelector(".showroom-loading");
    if (loading) loading.remove();
  });

  // --- Window ka size badle toh canvas bhi badlo ---
  window.addEventListener("resize", () => {
    camera.aspect = box.clientWidth / box.clientHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(box.clientWidth, box.clientHeight);
  });

  // --- Har frame pe draw karo ---
  renderer.setAnimationLoop(() => {
    controls.update();
    renderer.render(scene, camera);
  });
}
