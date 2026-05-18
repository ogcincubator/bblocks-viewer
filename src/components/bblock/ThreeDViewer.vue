<template>
  <div class="three-d-viewer-wrapper">
    <div ref="canvasContainer" class="three-d-viewer-canvas" />
    <div v-if="error" class="three-d-viewer-error">{{ error }}</div>
    <div class="three-d-viewer-controls">
      <v-btn
        size="x-small" variant="elevated" color="white" icon
        title="Reset camera" @click="onResetCamera"
      ><v-icon>mdi-fit-to-screen-outline</v-icon></v-btn>
      <v-btn
        size="x-small" variant="elevated" :color="showGrid ? 'primary' : 'white'" icon
        title="Toggle grid" @click="onToggleGrid"
      ><v-icon>mdi-grid</v-icon></v-btn>
      <v-btn
        size="x-small" variant="elevated" :color="wireframe ? 'primary' : 'white'" icon
        title="Toggle wireframe" @click="onToggleWireframe"
      ><v-icon>mdi-cube-outline</v-icon></v-btn>
      <template v-if="isTopoFormat">
        <v-btn
          size="x-small" variant="elevated" :color="showEdges ? 'primary' : 'white'" icon
          title="Toggle edges" @click="onToggleEdges"
        ><v-icon>mdi-vector-line</v-icon></v-btn>
        <v-btn
          size="x-small" variant="elevated" :color="showVertices ? 'primary' : 'white'" icon
          title="Toggle vertices" @click="onToggleVertices"
        ><v-icon>mdi-dots-grid</v-icon></v-btn>
      </template>
    </div>
    <v-btn
      v-if="fullscreenButton"
      class="three-d-fullscreen-btn"
      size="small" color="white" variant="elevated"
      title="Full screen" @click="dialogOpen = true"
    ><v-icon>mdi-fullscreen</v-icon></v-btn>
    <v-dialog v-model="dialogOpen">
      <v-card>
        <v-card-title class="d-flex align-center">
          3D view
          <v-spacer />
          <v-btn icon="mdi-close" variant="text" @click="dialogOpen = false" />
        </v-card-title>
        <v-card-text class="pa-0" style="height: 75vh">
          <three-d-viewer v-if="dialogOpen" :data="data" :fullscreen-button="false" />
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';
import ThreeDViewer from './ThreeDViewer.vue';
import { isTopoFeatureMultiCollection } from '@/utils/detect-3d.js';

const props = defineProps({
  data: { type: Object, required: true },
  fullscreenButton: { type: Boolean, default: true },
});

const canvasContainer = ref(null);
const dialogOpen = ref(false);
const error = ref(null);

const isTopoFormat = ref(false);
const showGrid = ref(false);
const wireframe = ref(false);
const showEdges = ref(true);
const showVertices = ref(false);

let animating = false;
let animFrameId = null;
let renderer = null;
let camera = null;
let controls = null;
let gridHelper = null;
let solidMeshes = [];
let solidEdges = [];
let solidVertices = [];
let initialCameraPosition = null;
let initialCameraTarget = null;
let resizeObserver = null;

onMounted(async () => {
  try {
    await initViewer();
  } catch (e) {
    console.error('ThreeDViewer init failed', e);
    error.value = 'Failed to initialize 3D viewer.';
  }
});

onBeforeUnmount(() => {
  animating = false;
  if (animFrameId) cancelAnimationFrame(animFrameId);
  if (resizeObserver) resizeObserver.disconnect();
  if (renderer) {
    renderer.dispose();
    renderer.domElement.remove();
    renderer = null;
  }
  disposeObjects();
});

async function initViewer() {
  const container = canvasContainer.value;
  if (!container) return;

  const [THREE, { OrbitControls }] = await Promise.all([
    import('three'),
    import('three/addons/controls/OrbitControls.js'),
  ]);

  isTopoFormat.value = isTopoFeatureMultiCollection(props.data);

  const width = container.clientWidth || 600;
  const height = container.clientHeight || 400;

  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0xadb1b1);

  camera = new THREE.PerspectiveCamera(60, width / height, 0.001, 10000);
  camera.up.set(0, 0, 1);

  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(width, height);
  container.appendChild(renderer.domElement);

  controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  controls.dampingFactor = 0.05;

  scene.add(new THREE.AmbientLight(0xffffff, 0.5));
  const d1 = new THREE.DirectionalLight(0xffffff, 0.8);
  d1.position.set(100, 100, 100);
  scene.add(d1);
  const d2 = new THREE.DirectionalLight(0xffffff, 0.3);
  d2.position.set(-100, -100, -100);
  scene.add(d2);
  const d3 = new THREE.DirectionalLight(0xffffff, 0.3);
  d3.position.set(0, -100, 0);
  scene.add(d3);

  gridHelper = new THREE.GridHelper(100, 20, 0x444444, 0x222222);
  gridHelper.rotation.x = Math.PI / 2;
  gridHelper.visible = false;
  scene.add(gridHelper);

  scene.add(new THREE.AxesHelper(1));

  if (isTopoFormat.value) {
    await buildTopoScene(scene, THREE);
  } else {
    await buildGeoJsonScene(scene, THREE);
  }

  fitCamera(THREE);

  resizeObserver = new ResizeObserver(() => {
    if (!canvasContainer.value || !renderer) return;
    const w = canvasContainer.value.clientWidth;
    const h = canvasContainer.value.clientHeight;
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    renderer.setSize(w, h);
  });
  resizeObserver.observe(container);

  animating = true;
  function animate() {
    if (!animating) return;
    animFrameId = requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
  }
  animate();
}

async function buildTopoScene(scene, THREE) {
  const {
    buildMaps, buildSolidGeometry, buildSolidEdgeLines,
    createSolidMesh, createVertexMarkers, getFeatures,
  } = await import('@/utils/topo-geometry.js');

  const maps = buildMaps(props.data);
  const solids = getFeatures(props.data.solids || []);

  solids.forEach((solid, i) => {
    const { geometry } = buildSolidGeometry(solid, maps.shellMap, maps.faceMap, maps.ringMap, maps.edgeMap, maps.pointMap);
    const mesh = createSolidMesh(solid, i, geometry);
    const edges = buildSolidEdgeLines(solid, maps.shellMap, maps.faceMap, maps.ringMap, maps.edgeMap, maps.pointMap);
    const vertices = createVertexMarkers(geometry);

    mesh.material.wireframe = wireframe.value;
    edges.visible = showEdges.value;
    vertices.visible = showVertices.value;

    scene.add(mesh, edges, vertices);
    solidMeshes.push(mesh);
    solidEdges.push(edges);
    solidVertices.push(vertices);
  });
}

async function buildGeoJsonScene(scene) {
  const { buildGeoJson3DObjects } = await import('@/utils/geojson-3d.js');
  const result = buildGeoJson3DObjects(props.data);
  result.meshes.forEach(m => { m.material.wireframe = wireframe.value; solidMeshes.push(m); });
  result.lines.forEach(l => solidEdges.push(l));
  result.points.forEach(p => solidVertices.push(p));
  result.objects.forEach(o => scene.add(o));
}

function fitCamera(THREE) {
  const allObjects = [...solidMeshes, ...solidEdges, ...solidVertices];
  if (!allObjects.length) return;
  const box = new THREE.Box3();
  allObjects.forEach(o => box.expandByObject(o));
  if (box.isEmpty()) return;

  const center = box.getCenter(new THREE.Vector3());
  const size = box.getSize(new THREE.Vector3());
  const maxDim = Math.max(size.x, size.y, size.z);
  const dist = maxDim * 2;

  camera.position.set(center.x - dist * 0.7, center.y - dist * 0.7, center.z + dist * 0.7);
  camera.near = dist * 0.001;
  camera.far = dist * 100;
  camera.updateProjectionMatrix();
  controls.target.copy(center);
  controls.update();

  initialCameraPosition = camera.position.clone();
  initialCameraTarget = controls.target.clone();
}

function disposeObjects() {
  solidMeshes.forEach(m => { m.geometry?.dispose(); m.material?.dispose(); });
  solidEdges.forEach(e => { e.geometry?.dispose(); e.material?.dispose(); });
  solidVertices.forEach(g => { g.children?.forEach(c => { c.geometry?.dispose(); c.material?.dispose(); }); });
  solidMeshes = [];
  solidEdges = [];
  solidVertices = [];
}

function onResetCamera() {
  if (!initialCameraPosition || !camera || !controls) return;
  camera.position.copy(initialCameraPosition);
  controls.target.copy(initialCameraTarget);
  controls.update();
}

function onToggleGrid() {
  showGrid.value = !showGrid.value;
  if (gridHelper) gridHelper.visible = showGrid.value;
}

function onToggleWireframe() {
  wireframe.value = !wireframe.value;
  solidMeshes.forEach(m => { m.material.wireframe = wireframe.value; });
}

function onToggleEdges() {
  showEdges.value = !showEdges.value;
  solidEdges.forEach(e => { e.visible = showEdges.value; });
}

function onToggleVertices() {
  showVertices.value = !showVertices.value;
  solidVertices.forEach(g => { g.visible = showVertices.value; });
}
</script>

<style scoped>
.three-d-viewer-wrapper {
  position: relative;
  height: 100%;
  width: 100%;
}

.three-d-viewer-canvas {
  height: 100%;
  width: 100%;
}

.three-d-viewer-error {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.6);
  color: #ff6666;
  font-size: 0.9rem;
  padding: 1rem;
  text-align: center;
}

.three-d-viewer-controls {
  position: absolute;
  bottom: 8px;
  left: 8px;
  display: flex;
  flex-direction: column;
  gap: 4px;
  z-index: 10;
  opacity: 0.85;
}

.three-d-viewer-controls:hover {
  opacity: 1;
}

.three-d-fullscreen-btn {
  position: absolute;
  top: 8px;
  right: 8px;
  z-index: 10;
  opacity: 0.85;
  min-width: 0 !important;
  padding: 0 !important;
  width: 28px;
}

.three-d-fullscreen-btn:hover {
  opacity: 1;
}
</style>