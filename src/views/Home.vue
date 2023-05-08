<template>
  <v-container>
    <v-row>
      <v-col>
        <v-card>
          <v-card-text>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <v-row align="stretch">
      <v-col
        v-for="bblock of buildingBlocks" :key="bblock.itemIdentifier"
        md="3"
      >
        <v-card class="fill-height" @click="viewBBlock(bblock)">
          <v-card-title>{{ bblock.name }}</v-card-title>
          <v-card-text>
            {{ trim(bblock.abstract, 100) }}
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <v-dialog v-model="bblockDialog" width="auto" max-width="1000">
      <building-block :bblock="bblockView"></building-block>
    </v-dialog>

    <v-overlay
      :model-value="loading"
      class="align-center justify-center"
    >
      <v-progress-circular
        color="primary"
        indeterminate
        size="64"
      ></v-progress-circular>
    </v-overlay>
  </v-container>
</template>

<script>
import axios from 'axios';
import BuildingBlock from "@/views/BuildingBlock";

const REGISTER_JSON = 'https://raw.githubusercontent.com/avillar/bblocks/master/register.json';

export default {
  components: {BuildingBlock},
  data() {
    return {
      loading: false,
      buildingBlocks: null,
      bblockDialog: false,
      bblockView: null,
    };
  },
  mounted() {
    this.loading = true;
    axios.get(REGISTER_JSON)
      .then(resp => {
        this.buildingBlocks = resp.data;
        this.buildingBlocks.sort((a, b) => {
          const na = a.name.toLowerCase(), nb = b.name.toLowerCase();
          return na < nb ? -1 : (na > nb ? 1 : 0);
        });
      })
      .finally(() => {
        this.loading = false;
      });
  },
  methods: {
    trim(s, l, ellipsis='…') {
      if (!s || s.length <= l) {
        return s;
      }
      return `${s.substr(0, l - 1)}${ellipsis}`;
    },
    viewBBlock(bblock) {
      this.bblockView = bblock;
      this.bblockDialog = true;
    },
  },
}
</script>
