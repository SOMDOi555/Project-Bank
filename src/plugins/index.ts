/**
 * plugins/index.ts
 *
 * Automatically included in `./src/main.ts`
 */

// Types
import type { App } from 'vue'

// Plugins
import router from '../router'
import vuetify from './vuetify'
import sweetalert from './sweetalert'

export function registerPlugins (app: App) {
  app.use(vuetify)
  app.use(router)
  app.use(sweetalert)
}