/**
 * plugins/vuetify.ts
 *
 * Framework documentation: https://vuetifyjs.com`
 */

// Composables
import { createVuetify } from 'vuetify'
// Styles
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'

// https://vuetifyjs.com/en/introduction/why-vuetify/#feature-guides
export default createVuetify({
  theme: {
    defaultTheme: 'light',
    themes: {
      light: {
        dark: false,
        colors: {
          primary: '#8866FF',
          secondary: '#1E293B',
          background: '#F1F4F9',
          surface: '#ffffff',
          success: '#10b981',
          warning: '#f59e0b',
          error: '#CC4284',
          info: '#0284c7',
        },
      },
    },
  },
})
