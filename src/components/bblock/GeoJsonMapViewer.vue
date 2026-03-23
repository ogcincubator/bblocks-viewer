<template>
  <div ref="mapContainer" class="geojson-map-viewer"></div>
</template>

<script>
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

export default {
  props: {
    geojson: {
      type: Object,
      required: true,
    },
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
      try {
        this.geojsonLayer = L.geoJSON(this.geojson, {
          onEachFeature(feature, layer) {
            if (!feature.properties || Object.keys(feature.properties).length === 0) return;
            const content = `<pre style="margin:0;font-size:0.8em;max-height:200px;overflow:auto">${
              JSON.stringify(feature.properties, null, 2)
            }</pre>`;
            layer.bindPopup(content, { maxWidth: 400 });
          },
        }).addTo(this.map);
        const bounds = this.geojsonLayer.getBounds();
        if (bounds.isValid()) {
          this.map.fitBounds(bounds, { padding: [20, 20] });
        } else {
          this.map.setView([0, 0], 2);
        }
      } catch {
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
