/**
 * main.js
 *
 * Bootstraps Vuetify and other plugins then mounts the App`
 */

// Components
import App from './App.vue'

// Composables
import { createApp } from 'vue'

// Plugins
import { registerPlugins } from '@/plugins'
import { preloadTabPlugins } from '@/composables/tab-plugins'

// Styles
import '@/styles/viewer.scss';

const app = createApp(App)

registerPlugins(app)

// Kick off tab-plugin module loading in parallel with the user's navigation to their first bblock
// page, rather than lazily inside BuildingBlock.vue — see .claude/tab-plugins-design.md
// "Resolved items" #11 (pre-load flash).
preloadTabPlugins();

if (process.env.gitInfo) {
  console.log(`BBlocks Viewer revision ${process.env.gitInfo.shortCommitId} (updated ${process.env.gitInfo.date})`);
}

app.mount('#app')
