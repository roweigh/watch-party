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
  apiKey: 'AIzaSyDwYJzfBWT_yfve_upzeGGjMQaTOTD4E_4',
  authDomain: 'watch-party-2e8e1.firebaseapp.com',
  projectId: 'watch-party-2e8e1',
  storageBucket: 'watch-party-2e8e1.appspot.com',
  messagingSenderId: '937198903893',
  appId: '1:937198903893:web:a037e1483a5bc7e5572adc',
  measurementId: 'G-XNY44R5F7S',
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