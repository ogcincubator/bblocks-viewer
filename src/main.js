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

// Styles
import '@/styles/viewer.scss';

const app = createApp(App)

registerPlugins(app)

if (process.env.gitInfo) {
  console.log(`BBlocks Viewer revision ${process.env.gitInfo.shortCommitId} (updated ${process.env.gitInfo.date})`);
}

app.mount('#app')
