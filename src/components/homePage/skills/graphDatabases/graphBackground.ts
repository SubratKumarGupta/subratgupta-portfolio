window.requestIdleCallback(async () => {
  const ForceGraph3D = (await import("3d-force-graph")).default;
  const { Mesh, MeshLambertMaterial, SphereGeometry } = await import("three");
  const NODES = 400;
  const GROUPS = 12;
  const gData = {
    nodes: [...Array(NODES).keys()].map((i) => ({
      id: i,
      group: Math.ceil(Math.random() * GROUPS),
    })),
    links: [...Array(NODES).keys()]
      .filter((id) => id)
      .map((id) => ({
        source: id,
        target: Math.round(Math.random() * (id - 1)),
      })),
  };
  console.log(gData);
  const distance = 1400;
  const nodeMetrial = new MeshLambertMaterial({
    color: "#3fd4d4",
    emissive: "#3fd4d4",
    emissiveIntensity: 1,
    opacity: 1,
  });

  const isMobileOrTablet =
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Touch|Opera Mini/i.test(
      navigator.userAgent
    );
  // Random tree

  const getNodeMesh = () => {
    return new Mesh(new SphereGeometry(5), nodeMetrial);
  };

  const graphDiv = document.getElementById("3d-graph") as HTMLDivElement;
  const Graph = ForceGraph3D()(graphDiv)
    // .jsonUrl("/dataset.json")
    .width(graphDiv.clientWidth)
    .height(graphDiv.clientHeight)
    .nodeThreeObject(() => getNodeMesh())
    .linkOpacity(0.2)
    .showNavInfo(false)
    .zoomToFit()
    .enablePointerInteraction(false)
    .backgroundColor("rgba(0,0,0,0)")
    .cameraPosition({ z: distance })
    .graphData(gData)
    .nodeColor(() => "#3fd4d4");
  //@ts-ignore
  Graph.controls().noZoom = true;
  let angle = 0;
  let isPaused = false;
  let lastTime = 0;
  let cameraPosBeforePause = { x: 0, y: 0, z: 0 };
  const transitionDuration = 500; // in milliseconds
  // controls.enabled = false;
  console.log(navigator);

  if (isMobileOrTablet) {
    // @ts-ignore
    Graph.controls().enabled = false;
    graphDiv.classList.add("pointer-events-none");
  }
  console.log(isMobileOrTablet);

  window.addEventListener("resize", () => {
    Graph.width(graphDiv.clientWidth)
      .height(graphDiv.clientHeight)
      .renderer()
      .setSize(graphDiv.clientWidth, graphDiv.clientHeight);

    console.log(isMobileOrTablet);
    if (isMobileOrTablet) {
      // @ts-ignore
      Graph.controls().enabled = false;
      graphDiv.classList.add("pointer-events-none");
    } else {
      // @ts-ignore
      Graph.controls().enabled = true;
    }
  });
  const animate = (currentTime: number) => {
    if (!isPaused) {
      Graph.cameraPosition({
        x: distance * Math.sin(angle),
        z: distance * Math.cos(angle),
      });
      angle += Math.PI / 500;
    } else {
      const timeSincePause = currentTime - lastTime;
      if (timeSincePause <= transitionDuration) {
        const t = timeSincePause / transitionDuration;
        const cameraPosX =
          cameraPosBeforePause.x +
          t * (distance * Math.sin(angle) - cameraPosBeforePause.x);
        const cameraPosZ =
          cameraPosBeforePause.z +
          t * (distance * Math.cos(angle) - cameraPosBeforePause.z);
        Graph.cameraPosition({
          x: cameraPosX,
          z: cameraPosZ,
        });
      }
    }
    lastTime = currentTime;
    requestAnimationFrame(animate);
  };

  const handleMouseDown = () => {
    isPaused = true;
    cameraPosBeforePause = Graph.cameraPosition();
  };

  const handleMouseUp = () => {
    isPaused = false;
    lastTime = performance.now();
  };

  document.addEventListener("mousedown", handleMouseDown);

  document.addEventListener("mouseup", handleMouseUp);

  requestAnimationFrame((currentTime) => {
    lastTime = currentTime;
    animate(currentTime);
  });
});
