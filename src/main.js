import { createApp } from 'vue';
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import './style.css';

// Vuetify
import { createVuetify } from 'vuetify';
import 'vuetify/styles';
import '@mdi/font/css/materialdesignicons.css';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';

import FlexCol from './components/flex/FlexCol.vue';
import FlexRow from './components/flex/FlexRow.vue';

import App from './App.vue';

const firebaseApp = initializeApp({
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: 'watch-party-e433c.firebaseapp.com',
  projectId: 'watch-party-e433c',
  storageBucket: 'watch-party-e433c.appspot.com',
  messagingSenderId: '643238465941',
  appId: '1:643238465941:web:320cea4af717f271a9669c',
  measurementId: 'G-2EF477QLT4',
});
const db = getFirestore(firebaseApp);

const vuetify = createVuetify({
  components,
  directives,
  theme: {
    defaultTheme: 'dark',
  },
});

const app = createApp(App);

app.use(vuetify);
app.component('FlexCol', FlexCol);
app.component('FlexRow', FlexRow);
app.mount('#app');

export { db };