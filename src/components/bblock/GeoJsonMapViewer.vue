<template>
  <div ref="mapContainer" class="geojson-map-viewer"></div>
</template>

<script>
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import jsonldUIUtils from 'jsonld-ui-utils';
import configService from '@/services/config.service';

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
  mounted() {
    this.$nextTick(() => {
      this.map = L.map(this.$refs.mapContainer, {attributionControl: false});
      const attControl = L.control.attribution().addTo(this.map);
      attControl.setPrefix('<a href="https://leafletjs.com/">Leaflet</a>');
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        maxZoom: 19,
      }).addTo(this.map);
      this.updateLayer();
    });
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
    updateLayer() {
      if (!this.map) return;
      if (this.geojsonLayer) {
        this.geojsonLayer.remove();
        this.geojsonLayer = null;
      }
      const ldContext = this.ldContext || null;
      const { bblocksFallbackRainbowInstances, bblocksFallbackSparqlEndpoints } = configService.config;
      const augmentOptions = {};
      if (bblocksFallbackRainbowInstances) augmentOptions.fallbackRainbowInstances = bblocksFallbackRainbowInstances;
      if (bblocksFallbackSparqlEndpoints) augmentOptions.fallbackSparqlEndpoints = bblocksFallbackSparqlEndpoints;
      try {
        this.geojsonLayer = L.geoJSON(this.geojson, {
          onEachFeature(feature, layer) {
            if (!feature.properties || Object.keys(feature.properties).length === 0) return;
            const container = document.createElement('div');
            container.className = 'geojson-map-popup';
            container.style.maxHeight = '300px';
            container.style.overflow = 'auto';
            jsonldUIUtils.createPropertiesTable(feature, container);
            layer.bindPopup(container, {maxWidth: 400});
            if (ldContext) {
              jsonldUIUtils.loadContext(ldContext).then(resolvedContext => {
                jsonldUIUtils.augment(container, resolvedContext, augmentOptions);
              });
            }
          },
        }).addTo(this.map);
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
  height: 400px;
  width: 100%;
}
</style>

<style>
.geojson-map-popup .object-table {
  border-collapse: collapse;
  font-size: 0.75rem;
  width: 100%;
}

.geojson-map-popup .object-table th {
  text-align: left;
  padding: 4px 8px;
  border-bottom: 2px solid #ccc;
  white-space: nowrap;
}

.geojson-map-popup .object-property,
.geojson-map-popup .object-value {
  padding: 3px 8px;
  vertical-align: top;
}

.geojson-map-popup .object-property {
  white-space: nowrap;
  font-weight: 500;
  color: #555;
}

.geojson-map-popup tr:nth-child(odd) > td {
  background-color: rgba(0, 0, 0, 0.05);
}
</style>
