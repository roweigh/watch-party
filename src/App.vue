<script setup>
import MovieList from './components/MovieList.vue';
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
    </v-app-bar>

    <v-main>
      <MovieList />
    </v-main>
  </v-layout>
</template>