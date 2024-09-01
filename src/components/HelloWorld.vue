<script>
import data from '../data.json'

export default {
  data () {
    return {
      data
    }
  },
  computed: {
    movies () {
      return this.data.map(movie => {
        return {
          name: movie.name,
          description: movie.description,
          rating: movie.aggregateRating.ratingValue.toFixed(1),
          year: movie.datePublished.split('-')[0],
          duration: movie.duration,
          id: movie.url
        }
      }).sort((a, b) => {
        if (a.rating < b.rating) {
          return 1;
        }
        if (a.rating > b.rating) {
          return -1;
        }
        return 0;
      })
    }
  },
  methods: {
    getColor (rating) {
      if (rating >= 9) {
        return 'green';
      } else if (rating >= 8) {
        return 'light-green-darken-1';
      } else {
        return null
      }
    }
  }
}
</script>

<template>
  <flex-col style="gap: 20px"> 
    <v-card 
      v-for="(movie, i) in movies"
      :text="movie.description"
    >
    <template v-slot:title>
      <flex-row style="gap: 20px; justify-content: center;">
        <h4 class="text-h5 font-weight-bold">{{i + 1}}. {{movie.name}}</h4>
        <v-chip 
          :color="getColor(movie.rating)"
          variant="flat"
          label
        >
        <span style="font-weight: bold">
          {{ movie.rating }}
        </span>
        </v-chip>
      </flex-row>
    </template>
    <template v-slot:subtitle>
      <flex-row style="gap: 20px; justify-content: center;">
        <div>
          {{ movie.year }}
        </div>
        <div>
          {{ movie.duration }}
        </div>
      </flex-row>
    </template>
      <!-- <flex-row v-for="v in Object.values(movie)">
        {{ v }}
      </flex-row> -->
    </v-card>
  </flex-col> 
</template>