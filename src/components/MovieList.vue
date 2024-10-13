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
      loadingFlags: {
        initializing: false,
        loading: false,
      },
      expanded: [
        'interested',
        'notInterested',
      ],

      movies: [],




      interested: [],
      notInterested: [],
      seen: [],

      user: {
        name: 'Roweigh',
        color: 'teal',
        avatar: 'mdi-emoticon-wink-outline',
      },
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
    await this.getMovies();
    // this.loadingFlags.initializing
  },
  methods: {
    async getMovies ()  {
      await getMovies().then(response => {
        this.movies = response;
      });
    },

    async updateMovie (id, payload) {
      this.loadingFlags.loading = true;
      await updateMovie(id, payload).then(async () => {
        await this.getMovies();
        this.loadingFlags.loading = false;
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
        :user="user"
        :movie="movie.data()"
        :loading="loadingFlags.loading"
        @update-movie="updateMovie(movie.id, $event)"
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