// NPM
import {execSync} from "child_process";

// Plugins
import vue from '@vitejs/plugin-vue'
import vuetify, { transformAssetUrls } from 'vite-plugin-vuetify'
import generateFile from 'vite-plugin-generate-file'
import svgLoader from "vite-svg-loader"

// Utilities
import {defineConfig, splitVendorChunkPlugin} from 'vite'
import { fileURLToPath, URL } from 'node:url'

let generateFileConfig = [];
let gitInfo = null;
try {
  const gitStr = execSync('git show -q --format="%H %h %aI"')
    .toString().trim().split(' ');
  gitInfo = {
    commitId: gitStr[0],
    shortCommitId: gitStr[1],
    date: gitStr[2],
  };
  generateFileConfig.push({
    type: 'json',
    output: 'GIT_INFO',
    data: gitInfo,
  });
} catch {
  // ignore
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue({
      template: { transformAssetUrls }
    }),
    // https://github.com/vuetifyjs/vuetify-loader/tree/next/packages/vite-plugin
    vuetify({
      autoImport: true,
      styles: {
        configFile: 'src/styles/settings.scss',
      },
    }),
    generateFile(generateFileConfig),
    svgLoader(),
    splitVendorChunkPlugin(),
  ],
  define: {
    'process.env': {
      gitInfo,
    },
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
    extensions: [
      '.js',
      '.json',
      '.jsx',
      '.mjs',
      '.ts',
      '.tsx',
      '.vue',
    ],
  },
  server: {
    port: 3000,
  },
  base: process.env.VITE_DYNAMIC_BASE_URL ? '/@BASE_URL@/' : (process.env.VITE_BASE_URL || "/"),
  build: {
    //minify: false,
    rollupOptions: {
      output: {
        entryFileNames: "assets/[name].js",
        chunkFileNames: "assets/[name].js",
        assetFileNames: "assets/[name].[ext]",
      },
    },
  },
})
