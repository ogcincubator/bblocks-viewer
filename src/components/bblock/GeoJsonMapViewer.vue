<template>
  <div ref="mapContainer" class="geojson-map-viewer"></div>
</template>

<script>
import configService from '@/services/config.service';

let cachedL = null;
let cachedCreateJsonLDGeoJSONLayer = null;

async function loadDeps() {
  if (cachedL) return { L: cachedL, createJsonLDGeoJSONLayer: cachedCreateJsonLDGeoJSONLayer };

  const [
    { default: L },
    { createJsonLDGeoJSONLayer },
    { default: markerIcon },
    { default: markerIcon2x },
    { default: markerShadow },
  ] = await Promise.all([
    import('leaflet'),
    import('@opengeospatial/jsonld-ui-utils/leaflet'),
    import('leaflet/dist/images/marker-icon.png'),
    import('leaflet/dist/images/marker-icon-2x.png'),
    import('leaflet/dist/images/marker-shadow.png'),
    import('leaflet/dist/leaflet.css'),
  ]);

  delete L.Icon.Default.prototype._getIconUrl;
  L.Icon.Default.mergeOptions({
    iconUrl: markerIcon,
    iconRetinaUrl: markerIcon2x,
    shadowUrl: markerShadow,
  });

  cachedL = L;
  cachedCreateJsonLDGeoJSONLayer = createJsonLDGeoJSONLayer;
  return { L, createJsonLDGeoJSONLayer };
}

export default {
  props: {
    geojson: {
      type: Object,
      required: true,
    },
    ldContext: {
      type: String,
      required: false,
    }
  },
  data() {
    return {
      map: null,
      geojsonLayer: null,
    };
  },
  async mounted() {
    const { L } = await loadDeps();
    if (!this.$refs.mapContainer) return;
    this.map = L.map(this.$refs.mapContainer, {attributionControl: false, maxZoom: 22});
    const attControl = L.control.attribution().addTo(this.map);
    attControl.setPrefix('<a href="https://leafletjs.com/">Leaflet</a>');
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      maxZoom: 22,
      maxNativeZoom: 19,
    }).addTo(this.map);
    this.updateLayer();
  },
  beforeUnmount() {
    if (this.map) {
      this.map.remove();
      this.map = null;
    }
  },
  watch: {
    geojson: {
      deep: true,
      handler() {
        this.updateLayer();
      },
    },
  },
  methods: {
    async updateLayer() {
      if (!this.map) return;
      if (this.geojsonLayer) {
        this.geojsonLayer.remove();
        this.geojsonLayer = null;
      }
      const { L, createJsonLDGeoJSONLayer } = await loadDeps();
      const ldContext = this.ldContext || undefined;
      const { bblocksFallbackRainbowInstances, bblocksFallbackSparqlEndpoints } = configService.config;
      const augmentOptions = {};
      if (bblocksFallbackRainbowInstances) augmentOptions.fallbackRainbowInstances = bblocksFallbackRainbowInstances;
      if (bblocksFallbackSparqlEndpoints) augmentOptions.fallbackSparqlEndpoints = bblocksFallbackSparqlEndpoints;
      try {
        this.geojsonLayer = (await createJsonLDGeoJSONLayer(L, this.geojson, {
          ldContext,
          augmentOptions,
          popupOptions: { maxWidth: 400, maxHeight: 300 },
        })).addTo(this.map);
        const bounds = this.geojsonLayer.getBounds();
        if (bounds.isValid()) {
          this.map.fitBounds(bounds, {padding: [20, 20]});
        } else {
          this.map.setView([0, 0], 2);
        }
      } catch (e) {
        console.log('error defining map', e);
        this.map.setView([0, 0], 2);
      }
    },
  },
};
</script>

<style scoped>
.geojson-map-viewer {
  height: 100%;
  width: 100%;
}
</style>

<style>
.leaflet-popup-content .object-table {
  border-collapse: collapse;
  font-size: 0.75rem;
  width: 100%;
}

.leaflet-popup-content .object-table th {
  text-align: left;
  padding: 4px 8px;
  border-bottom: 2px solid #ccc;
  white-space: nowrap;
}

.leaflet-popup-content .object-property,
.leaflet-popup-content .object-value {
  padding: 3px 8px;
  vertical-align: top;
}

.leaflet-popup-content .object-property {
  white-space: nowrap;
  font-weight: 500;
  color: #555;
}

.leaflet-popup-content tr:nth-child(odd) > td {
  background-color: rgba(0, 0, 0, 0.05);
}
</style>
