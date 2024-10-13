<script>
import {
  getMovies,
  updateMovie,
} from '../api/movies';

import MovieItem from './movies/MovieItem.vue';
import ExpansionPanelList from './ExpansionPanelList.vue';

export default {
  components: {
    MovieItem,
    ExpansionPanelList,
  },
  data () {
    return {
      expanded: [
        'interested',
        'notInterested',
      ],

      movies: [],




      interested: [],
      notInterested: [],
      seen: [],

      user: [
        {
          name: 'Roweigh',
          color: 'teal',
          avatar: 'mdi-emoticon-wink-outline',
          seen: [],
        },
      ],
      users:[
        {
          name: 'John Doe',
          color: 'purple',
          avatar: 'mdi-robot-angry',
          seen: [
            '/title/tt0111161/',
            '/title/tt0068646/',
          ],
        },
      ],
    };
  },
  computed: {
    excluded () {
      // const notInterestedIds = this.notInterested.map(i => {return i.id;});
      // const interestedIds = this.interested.map(i => {return i.id;});
      return [
        // ...interestedIds,
        // ...notInterestedIds,
      ];
    },
  },
  async created() {
    await getMovies().then(response => {
      this.movies = response;
    });
  },
  methods: {
    async updateMovie () {
      await updateMovie('CWEj45l8cNSr0fEQuczO', {
        description: 'yeet',
        duration: '1',
        id: '1',
        interested: [],
        name: 'name',
        rating: '1',
        ranking: Math.random(1),
        seen: [],
        year: 2000,
      });
    },
  },
};
</script>

<template>
  <flex-row class="pa-5">
    <flex-col style="gap: 20px; max-width: 70%; min-width: 70%">
      <!-- <v-data-iterator></v-data-iterator> -->
      <movie-item
        v-for="movie in movies"
        :key="movie.id"
        v-model:interested="interested"
        v-model:not-interested="notInterested"
        v-model:seen="seen"
        :movie="movie"
      />
    </flex-col>

    <flex-col style="flex-grow: 1">
      <v-expansion-panels
        v-model="expanded"
        multiple
      >
        <expansion-panel-list
          v-model:list="interested"
          value="interested"
          title="🐐 List"
        />
        <!-- <expansion-panel-list
          v-model:list="[]"
          value="interested"
          title="🐐 List"
        />
        <expansion-panel-list
          v-model:list="[]"
          value="interested"
          title="🐐 List"
        /> -->
        <expansion-panel-list
          v-model:list="notInterested"
          value="notInterested"
          title="💩 List"
        />
      </v-expansion-panels>
    </flex-col>
  </flex-row>
</template>