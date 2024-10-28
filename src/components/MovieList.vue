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
        saving: false,
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
    // movies () {
    //   return this.moviesData.map((item, i) => {
    //     const movie = item.data();
    //     movie.name = `${i+1}. ${movie.name}`;
    //     return {
    //       id: item.id,
    //       data: movie,
    //       show: !(movie.notInterested.length === 1 && movie.notInterested[0] === this.user.name),
    //     };
    //   });
    // },

    interested () {
      return this.moviesData
        .filter(movie =>  movie.interested.includes(this.user.name))
        .map(movie => {
          return {
            id: movie.id,
            name: movie.name,
            voteList: movie.interested,
          };
        });
    },

    notInterested () {
      return this.moviesData
        .filter(movie => movie.notInterested.includes(this.user.name))
        .map(movie => {
          return {
            id: movie.id,
            name: movie.name,
            voteList: movie.notInterested,
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
      await updateMovie(id, payload).then(() => {
        this.loadingFlags.loading = false;
      });
    },

    async updateInterested (movie, { liked, unliked }) {
      const payload = { interested: movie.interested };
      this.loadingFlags.loading = true;
      if (liked) {
        movie.interested = movie.interested.filter(name => name !== this.user.name);
      } else {
        movie.interested.push(this.user.name);
      }

      if (unliked) {
        movie.notInterested = movie.notInterested.filter(name => name !== this.user.name);
        payload.notInterested = movie.notInterested;
      }

      await updateMovie(movie.id, payload);
      this.loadingFlags.loading = false;
    },

    async updateNotInterested (movie, { liked, unliked }) {
      const payload = { notInterested: movie.notInterested };
      this.loadingFlags.loading = true;
      if (unliked) {
        movie.notInterested = movie.notInterested.filter(name => name !== this.user.name);
      } else {
        movie.notInterested.push(this.user.name);
      }

      if (liked) {
        movie.interested = movie.interested.filter(name => name !== this.user.name);
        payload.interested = movie.interested;
      }

      await updateMovie(movie.id, payload);
      this.loadingFlags.loading = false;
    },

    async updateSeen (movie, seen) {
      const payload = { seen: movie.seen };
      this.loadingFlags.loading = true;
      if (!seen) {
        movie.seen.push(this.user.name);
      } else {
        movie.seen = movie.seen.filter(name => name !== this.user.name);
      }

      await updateMovie(movie.id, payload);
      this.loadingFlags.loading = false;
    },
  },
};
</script>

<template>
  <flex-row class="pa-5 justify-end">
    <v-progress-circular
      :indeterminate="loadingFlags.loading"
    />
    <flex-col style="gap: 20px; max-width: 50%; min-width: 50%; margin-left: 20px; margin-right: 20px">
      <!-- <v-data-iterator></v-data-iterator> -->
      <template
        v-for="movie in moviesData"
        :key="movie.id"
      >
        <movie-item
          :user="user"
          :movie="movie"
          @interested="updateInterested(movie, $event)"
          @not-interested="updateNotInterested(movie, $event)"
          @seen="updateSeen(movie, $event)"
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