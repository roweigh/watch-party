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
      user: {
        name: 'Roweigh',
        color: 'teal',
        avatar: 'mdi-emoticon-wink-outline',
      },

      loadingFlags: {
        initializing: false,
        loading: false,
      },
      expanded: [
        'interested',
        'notInterested',
      ],

      moviesData: [],
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
    movies () {
      return this.moviesData.map((item, i) => {
        const movie = item.data();
        movie.name = `${i+1}. ${movie.name}`;
        return {
          id: item.id,
          data: movie,
          show: !(movie.notInterested.length === 1 && movie.notInterested[0] === this.user.name),
        };
      });
    },

    interested () {
      return this.movies
        .filter(movie =>  movie.data.interested.includes(this.user.name))
        .map(movie => {
          return {
            id: movie.id,
            name: movie.data.name,
            voteList: movie.data.interested,
          };
        });
    },

    notInterested () {
      return this.movies
        .filter(movie => movie.data.notInterested.includes(this.user.name))
        .map(movie => {
          return {
            id: movie.id,
            name: movie.data.name,
            voteList: movie.data.notInterested,
          };
        });
    },
  },
  async created() {
    await this.getMovies();
    // this.loadingFlags.initializing = false
  },
  methods: {
    async getMovies ()  {
      await getMovies().then(response => {
        this.moviesData = response;
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
  <flex-row
    class="pa-5"
    style="justify-content: end;"
  >
    <flex-col
      style="gap: 20px; max-width: 50%; min-width: 50%; margin-left: 20px; margin-right: 20px"
    >
      <!-- <v-data-iterator></v-data-iterator> -->
      <template
        v-for="movie in movies"
        :key="movie.id"
      >
        <movie-item
          v-if="movie.show"
          :user="user"
          :movie="movie.data"
          :loading="loadingFlags.loading"
          @update-movie="updateMovie(movie.id, $event)"
        />
      </template>
    </flex-col>
    <flex-col style="flex-grow: 1; max-width: 25%; min-width: 25%">
      <v-expansion-panels
        v-model="expanded"
        multiple
      >
        <expansion-panel-list
          :user="user"
          :list="interested"
          value="interested"
          title="🐐 List"
          @update-movie="updateMovie($event.id, {interested: $event.result})"
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
          :user="user"
          :list="notInterested"
          value="notInterested"
          title="💩 List"
          @update-movie="updateMovie($event.id, {notInterested: $event.result})"
        />
      </v-expansion-panels>
    </flex-col>
  </flex-row>
</template>