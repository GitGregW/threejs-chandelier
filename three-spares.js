const textureLoader = new THREE.TextureLoader();

const laminateColorTexture = textureLoader.load(
  "./materials/laminate_floor_02_1k/laminate_floor_02_diff_1k.jpg"
);
const laminateARMTexture = textureLoader.load(
  "./materials/laminate_floor_02_1k/laminate_floor_02_arm_1k.jpg"
);
const laminateNormalTexture = textureLoader.load(
  "./materials/laminate_floor_02_1k/laminate_floor_02_nor_gl_1k.jpg"
);
laminateColorTexture.repeat.set(4.5, 1.5);
laminateARMTexture.repeat.set(4.5, 1.5);
laminateNormalTexture.repeat.set(4.5, 1.5);
laminateColorTexture.wrapS = THREE.RepeatWrapping;
laminateARMTexture.wrapS = THREE.RepeatWrapping;
laminateNormalTexture.wrapS = THREE.RepeatWrapping;
laminateColorTexture.wrapT = THREE.RepeatWrapping;
laminateARMTexture.wrapT = THREE.RepeatWrapping;
laminateNormalTexture.wrapT = THREE.RepeatWrapping;

laminateColorTexture.colorSpace = THREE.SRGBColorSpace;

const floor = new THREE.Mesh(
  new THREE.PlaneGeometry(8.4, 2.8, 10, 10),
  new THREE.MeshStandardMaterial({
    transparent: true,
    map: laminateColorTexture,
    aoMap: laminateARMTexture,
    roughnessMap: laminateARMTexture,
    metalnessMap: laminateARMTexture,
    normalMap: laminateNormalTexture,
  })
);
floor.rotation.x = -Math.PI * 0.5;
floor.translateZ(-1.5);
floor.translateY(-0.5);
// scene.add(floor);

const plasterColorTexture = textureLoader.load(
  "./materials/painted_plaster_wall_1k/painted_plaster_wall_diff_1k.jpg"
);
const plasterARMTexture = textureLoader.load(
  "./materials/painted_plaster_wall_1k/painted_plaster_wall_arm_1k.jpg"
);
const plasterNormalTexture = textureLoader.load(
  "./materials/painted_plaster_wall_1k/painted_plaster_wall_nor_gl_1k.jpg"
);
plasterColorTexture.repeat.set(4.5, 1.5);
plasterARMTexture.repeat.set(4.5, 1.5);
plasterNormalTexture.repeat.set(4.5, 1.5);
plasterColorTexture.wrapS = THREE.RepeatWrapping;
plasterARMTexture.wrapS = THREE.RepeatWrapping;
plasterNormalTexture.wrapS = THREE.RepeatWrapping;
plasterColorTexture.wrapT = THREE.RepeatWrapping;
plasterARMTexture.wrapT = THREE.RepeatWrapping;
plasterNormalTexture.wrapT = THREE.RepeatWrapping;
plasterColorTexture.colorSpace = THREE.SRGBColorSpace;

const ceiling = new THREE.Mesh(
  new THREE.PlaneGeometry(8.4, 2.8, 10, 10),
  new THREE.MeshStandardMaterial({
    transparent: true,
    color: "#6d809d",
    map: plasterColorTexture,
    aoMap: plasterARMTexture,
    roughnessMap: plasterARMTexture,
    metalnessMap: plasterARMTexture,
    normalMap: plasterNormalTexture,
  })
);
ceiling.rotation.x = -Math.PI * 1.5;
ceiling.translateZ(-0.65);
ceiling.translateY(0.5);
// scene.add(ceiling);

const wall = new THREE.Mesh(
  new THREE.PlaneGeometry(8.4, 2.3, 10, 10),
  new THREE.MeshStandardMaterial({
    transparent: true,
    color: "#3c5b89",
    map: plasterColorTexture,
    aoMap: plasterARMTexture,
    roughnessMap: plasterARMTexture,
    metalnessMap: plasterARMTexture,
    normalMap: plasterNormalTexture,
  })
);
wall.translateZ(-0.8);
wall.translateY(-0.4);
// scene.add(wall);
