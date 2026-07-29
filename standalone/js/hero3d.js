/* Three.js hero scene — CDN, no npm */
function initHero3D() {
  const canvas = document.getElementById('hero-canvas');
  if (!canvas || typeof THREE === 'undefined') return;

  const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
  renderer.setSize(window.innerWidth, window.innerHeight);

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 100);
  camera.position.set(0, 0.5, 5);

  scene.add(new THREE.AmbientLight(0xffffff, 0.5));
  const dir = new THREE.DirectionalLight(0xffffff, 1);
  dir.position.set(5, 5, 5);
  scene.add(dir);
  const gold = new THREE.PointLight(0xffd54f, 0.8, 20);
  gold.position.set(-3, 2, 2);
  scene.add(gold);

  const group = new THREE.Group();
  scene.add(group);

  // Abacus frame
  const frame = new THREE.Mesh(
    new THREE.BoxGeometry(3.2, 2.2, 0.15),
    new THREE.MeshStandardMaterial({ color: 0x3d2314, roughness: 0.4 })
  );
  frame.position.set(2.5, 0.5, -1);
  group.add(frame);

  const colors = [0xffd54f, 0xff5252, 0x29b6f6, 0x66bb6a, 0xab47bc];
  const beads = [];
  for (let row = 0; row < 5; row++) {
    for (let col = 0; col < 8; col++) {
      const bead = new THREE.Mesh(
        new THREE.SphereGeometry(0.12, 12, 12),
        new THREE.MeshStandardMaterial({
          color: colors[row % 5],
          emissive: colors[row % 5],
          emissiveIntensity: 0.25,
          metalness: 0.5,
        })
      );
      bead.position.set(2.5 + (col - 3.5) * 0.35, 0.5 + (2 - row) * 0.4, -0.9);
      bead.userData.baseY = bead.position.y;
      bead.userData.phase = col + row;
      group.add(bead);
      beads.push(bead);
    }
  }

  // Floating books
  [[-3, -0.5, -0.5], [1, 2, -1.5], [-1.5, 1.5, 0.5]].forEach(([x, y, z], i) => {
    const book = new THREE.Mesh(
      new THREE.BoxGeometry(0.6, 0.8, 0.08),
      new THREE.MeshStandardMaterial({ color: [0xff5252, 0x29b6f6, 0xffd54f][i] })
    );
    book.position.set(x, y, z);
    book.userData.float = i;
    group.add(book);
  });

  // Platform
  const floor = new THREE.Mesh(
    new THREE.CircleGeometry(4, 48),
    new THREE.MeshStandardMaterial({ color: 0xf5f0ff, roughness: 0.8 })
  );
  floor.rotation.x = -Math.PI / 2;
  floor.position.y = -1.5;
  scene.add(floor);

  let mouseX = 0;
  let mouseY = 0;
  document.addEventListener('mousemove', (e) => {
    mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
    mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
  });

  const clock = new THREE.Clock();
  function animate() {
    requestAnimationFrame(animate);
    const t = clock.getElapsedTime();
    group.rotation.y = Math.sin(t * 0.3) * 0.15 + mouseX * 0.1;
    beads.forEach((b) => {
      b.position.y = b.userData.baseY + Math.sin(t * 2 + b.userData.phase) * 0.05;
    });
    group.children.forEach((c) => {
      if (c.userData.float !== undefined) {
        c.position.y += Math.sin(t + c.userData.float) * 0.002;
        c.rotation.y += 0.005;
      }
    });
    camera.position.x = mouseX * 0.3;
    camera.position.y = 0.5 - mouseY * 0.15;
    camera.lookAt(0, 0, 0);
    renderer.render(scene, camera);
  }
  animate();

  window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  });
}

window.initHero3D = initHero3D;
