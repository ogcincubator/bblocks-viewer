// Plugins
import vue from '@vitejs/plugin-vue'
import vuetify, { transformAssetUrls } from 'vite-plugin-vuetify'
import pluginRewriteAll from 'vite-plugin-rewrite-all'

// Utilities
import { defineConfig } from 'vite'
import { fileURLToPath, URL } from 'node:url'
import {createHtmlPlugin} from "vite-plugin-html";

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
    pluginRewriteAll(),
    createHtmlPlugin({
      entry: 'src/main.js',
      inject: {
        data: {
          injectConfig: `<script src="${process.env.VITE_DYNAMIC_BASE_URL ? '/@BASE_URL@/' : (process.env.VITE_BASE_URL || "/")}config.js"></script>`,
        },
      },
    })
  ],
  define: { 'process.env': {} },
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
})
