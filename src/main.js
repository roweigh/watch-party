import { createApp } from 'vue'
import './style.css'

// Vuetify
import { createVuetify } from 'vuetify'
import 'vuetify/styles'
import '@mdi/font/css/materialdesignicons.css'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

import FlexCol from './components/flex/FlexCol.vue'
import FlexRow from './components/flex/FlexRow.vue'

import App from './App.vue'

const vuetify = createVuetify({
  components,
  directives,
  theme: {
    defaultTheme: 'dark'
  }
});

const app = createApp(App);

app.use(vuetify);
app.component('FlexCol', FlexCol);
app.component('FlexRow', FlexRow);
app.mount('#app')