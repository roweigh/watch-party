<script>
import { io } from 'socket.io-client';
import { bulkImport } from './utils/api-utils';

import MovieList from './components/MovieList.vue';

export default {
  components: { MovieList },
  data () {
    return {
      loading: false,
      socket: null,
    };
  },
  created () {
    this.socket = new io('ws://localhost:8080');

    this.socket.on('message', text => {
      console.log(text);
    });


    // document.querySelector('button')
  },
  methods: {
    test () {
      this.socket.emit('message', 'hello');
    },
    async bulkImport() {
      this.loading = true;
      await bulkImport();
      this.loading = false;
    },
  },
};
</script>


<template>
  <v-layout>
    <v-app-bar
      color="grey"
      flat
    >
      <v-toolbar-title>
        <h3>
          Watch Party
        </h3>
        <v-btn @click="test">
          hi
        </v-btn>
      </v-toolbar-title>
      <!-- <v-btn
        :loading="loading"
        variant="outlined"
        @click="bulkImport()"
      >
        Bulk Import
      </v-btn> -->
    </v-app-bar>

    <v-main>
      <MovieList />
    </v-main>
  </v-layout>
</template>