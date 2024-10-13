<script>
import { bulkImport } from './utils/api-utils';

import MovieList from './components/MovieList.vue';

export default {
  components: { MovieList },
  data () {
    return {
      loading: false,
    };
  },
  methods: {
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