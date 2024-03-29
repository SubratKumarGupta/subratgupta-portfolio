window.onload = async () => {
  const { Power4, gsap } = await import("gsap");
  const {
    CircleGeometry,
    Fog,

    IcosahedronGeometry,
    Mesh,
    MeshPhysicalMaterial,
    MeshStandardMaterial,
    Object3D,
    PCFSoftShadowMap,
    PerspectiveCamera,
    PointLight,
    Raycaster,
    RectAreaLight,
    Scene,
    SpotLight,
    Vector2,
    WebGLRenderer,
  } = await import("three");

  const canvas = document.getElementById(
    "three-raycaster"
  ) as HTMLCanvasElement;

  const renderer = new WebGLRenderer({
    canvas,
    antialias: true,
    alpha: true,
  });
  renderer.setSize(canvas.clientWidth, canvas.clientHeight);
  renderer.shadowMap.enabled = false;
  renderer.shadowMap.type = PCFSoftShadowMap;
  renderer.shadowMap.needsUpdate = true;

  window.addEventListener("resize", onWindowResize, false);

  function onWindowResize(): void {
    const parent = document.getElementById(
      "raycaster-wrapper"
    ) as HTMLDivElement;
    camera.aspect = parent.clientWidth / parent.clientHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(parent.clientWidth, parent.clientHeight);
  }

  const camera = new PerspectiveCamera(
    35,
    canvas.clientWidth / canvas.clientHeight,
    1,
    500
  );
  const scene = new Scene();
  let cameraRange = 3;

  //   const setcolor = ;
  scene.background = null; //new THREE.Color(setcolor);
  scene.fog = new Fog(0x000000, 2.5, 3.5);
  //   sean

  const sceneGroup = new Object3D();
  const particularGruop = new Object3D();
  const modularGruop = new Object3D();

  function generateParticle(num: number, amp = 2): void {
    const gmaterial = new MeshPhysicalMaterial({
      color: 0xffffff,
      side: 2,
    });
    const gparticular = new CircleGeometry(0.2, 5);
    interface Particular
      extends THREE.Mesh<THREE.CircleGeometry, THREE.MeshPhysicalMaterial> {
      speedValue: number;
    }
    for (let i = 1; i < num; i++) {
      const pscale = 0.001 + Math.abs(mathRandom(0.03));
      const particular = new Mesh(gparticular, gmaterial) as Particular;
      particular.position.set(
        mathRandom(amp),
        mathRandom(amp),
        mathRandom(amp)
      );
      particular.rotation.set(mathRandom(), mathRandom(), mathRandom());
      particular.scale.set(pscale, pscale, pscale);
      particular.speedValue = mathRandom(1);

      particularGruop.add(particular);
    }
  }

  generateParticle(200, 2);

  sceneGroup.add(particularGruop);
  scene.add(modularGruop);
  scene.add(sceneGroup);

  function mathRandom(num = 1): number {
    const setNumber = -Math.random() * num + Math.random() * num;
    return setNumber;
  }

  //init
  function init() {
    for (let i = 0; i < 30; i++) {
      const geometry = new IcosahedronGeometry(1);
      const material = new MeshStandardMaterial({
        color: 0x111111,
        transparent: false,
        opacity: 1,
        wireframe: false,
      });
      const cube = new Mesh(geometry, material);
      // @ts-ignore: Unreachable code error
      cube.speedRotation = Math.random() * 0.1;
      // @ts-ignore: Unreachable code error
      cube.positionX = mathRandom();
      // @ts-ignore: Unreachable code error
      cube.positionY = mathRandom();
      // @ts-ignore: Unreachable code error
      cube.positionZ = mathRandom();

      cube.castShadow = true;
      cube.receiveShadow = true;

      const newScaleValue = mathRandom(0.3);

      cube.scale.set(newScaleValue, newScaleValue, newScaleValue);
      //---
      cube.rotation.x = mathRandom((180 * Math.PI) / 180);
      cube.rotation.y = mathRandom((180 * Math.PI) / 180);
      cube.rotation.z = mathRandom((180 * Math.PI) / 180);
      // @ts-ignore: Unreachable code error
      cube.position.set(cube.positionX, cube.positionY, cube.positionZ);
      modularGruop.add(cube);
    }
  }

  //camera
  let cameraValue = false;
  camera.position.set(0, 0, cameraRange);

  function cameraSet(): void {
    if (!cameraValue) {
      gsap.to(camera.position, 1, { z: cameraRange, ease: Power4.easeInOut });
      cameraValue = true;
    } else {
      gsap.to(camera.position, 1, {
        x: 0,
        y: 0,
        z: cameraRange,
        ease: Power4.easeInOut,
      });
      let INTERSECTED = null;
      cameraValue = false;
    }
  }

  //lights

  // const ambientLight = new THREE.AmbientLight(0xffffff, 0.1);

  const light = new SpotLight(0xffffff, 3);

  light.position.set(5, 5, 2);
  light.castShadow = true;
  light.shadow.mapSize.width = 10000;
  light.shadow.mapSize.height = light.shadow.mapSize.width;
  light.penumbra = 0.5;

  const lightBack = new PointLight(0x0fffff, 1);
  lightBack.position.set(0, -3, -1);

  scene.add(sceneGroup);
  scene.add(light);
  scene.add(lightBack);

  const rectSize = 2;
  const intensity = 100;
  const rectLight = new RectAreaLight(0x0fffff, intensity, rectSize, rectSize);

  rectLight.position.set(0, 0, 1);
  rectLight.lookAt(0, 0, 0);

  scene.add(rectLight);

  //------------------------------------------------------------- RAYCASTER

  const raycaster = new Raycaster();
  const mouse = new Vector2();
  let INTERSECTED: any = null;
  let intersected: any = null;

  function onMouseMove(event: MouseEvent) {
    event.preventDefault();
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
  }

  function onMouseDown(event: MouseEvent) {
    event.preventDefault();
    onMouseMove(event);
    raycaster.setFromCamera(mouse, camera);
    intersected = raycaster.intersectObjects(modularGruop.children);
    if (intersected.length > 0) {
      cameraValue = false;
      if (INTERSECTED !== intersected[0].object) {
        if (INTERSECTED)
          INTERSECTED.material.emissive.setHex(INTERSECTED.currentHex);

        INTERSECTED = intersected[0].object;
        INTERSECTED.currentHex = INTERSECTED.material.emissive.getHex();
        INTERSECTED.material.emissive.setHex(0xffff00);

        gsap.to(camera.position, {
          duration: 1,
          x: INTERSECTED.position.x,
          y: INTERSECTED.position.y,
          z: INTERSECTED.position.z + 3,
          ease: "power2.inOut",
        });
      } else {
        if (INTERSECTED)
          INTERSECTED.material.emissive.setHex(INTERSECTED.currentHex);
        INTERSECTED = null;
      }
    }
    console.log(intersected.length);
  }

  function onMouseUp(event: MouseEvent) {}

  window.addEventListener("mousedown", onMouseDown, false);
  window.addEventListener("mouseup", onMouseUp, false);
  window.addEventListener("mousemove", onMouseMove, false);

  //render
  var uSpeed: number = 0.1;

  function animate(): void {
    var time: number = performance.now() * 0.0003;
    requestAnimationFrame(animate);
    //---
    for (
      var i: number = 0, l: number = particularGruop.children.length;
      i < l;
      i++
    ) {
      var newObject: any = particularGruop.children[i];
      newObject.rotation.x += newObject.speedValue / 10;
      newObject.rotation.y += newObject.speedValue / 10;
      newObject.rotation.z += newObject.speedValue / 10;
      //---
      //newObject.position.y = Math.sin(time) * 3;
    }

    for (
      var i: number = 0, l: number = modularGruop.children.length;
      i < l;
      i++
    ) {
      var newCubes: any = modularGruop.children[i];
      newCubes.rotation.x += 0.008;
      newCubes.rotation.y += 0.005;
      newCubes.rotation.z += 0.003;
      //---
      newCubes.position.x =
        Math.sin(time * newCubes.positionZ) * newCubes.positionY;
      newCubes.position.y =
        Math.cos(time * newCubes.positionX) * newCubes.positionZ;
      newCubes.position.z =
        Math.sin(time * newCubes.positionY) * newCubes.positionX;
    }
    //---
    particularGruop.rotation.y += 0.005;
    //---
    modularGruop.rotation.y -= (mouse.x * 4 + modularGruop.rotation.y) * uSpeed;
    modularGruop.rotation.x -=
      (-mouse.y * 4 + modularGruop.rotation.x) * uSpeed;
    camera.lookAt(scene.position);
    renderer.render(scene, camera);
  }
  animate();
  init();
};
