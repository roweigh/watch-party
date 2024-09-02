<script>
import data from '../data.json';

export default {
  data () {
    return {
      data,
      notInterested: [],
    };
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
          id: movie.url,
        };
      }).sort((a, b) => {
        if (a.rating < b.rating) {
          return 1;
        }
        if (a.rating > b.rating) {
          return -1;
        }
        return 0;
      });
    },
  },
  methods: {
    getColor (rating) {
      if (rating >= 9) {
        return 'green';
      } else if (rating >= 8) {
        return 'light-green-darken-1';
      } else {
        return null;
      }
    },
  },
};
</script>

<template>
  <flex-row>
    <flex-col style="gap: 20px; max-width: 70%">
      <v-card
        v-for="(movie, i) in movies"
        :key="i"
      >
        <template #title>
          <flex-row style="gap: 20px; justify-content: center;">
            <h4 class="text-h5 font-weight-bold">
              {{ i + 1 }}. {{ movie.name }}
            </h4>
          </flex-row>
        </template>

        <template #text>
          <flex-col style="gap: 10px">
            <flex-row style="gap: 20px; justify-content: center; align-items: center;">
              <div>
                {{ movie.year }}
              </div>
              <div>
                {{ movie.duration }}
              </div>
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
            <flex-row style="justify-content: center;">
              {{ movie.description }}
            </flex-row>
          </flex-col>
        </template>

        <v-card-actions>
          <v-spacer />
          <v-tooltip
            text="Keen"
            location="top"
          >
            <template #activator="{ props }">
              <v-btn
                v-bind="props"
                icon="mdi-heart"
                variant="text"
              />
            </template>
          </v-tooltip>
          <v-tooltip
            text="Don't care"
            location="top"
          >
            <template #activator="{ props }">
              <v-btn
                v-bind="props"
                icon="mdi-thumb-up"
                variant="text"
              />
            </template>
          </v-tooltip>
          <v-tooltip
            text="Seen"
            location="top"
          >
            <template #activator="{ props }">
              <v-btn
                v-bind="props"
                icon="mdi-check"
                variant="text"
              />
            </template>
          </v-tooltip>
          <v-tooltip
            text="Not Interested"
            location="top"
          >
            <template #activator="{ props }">
              <v-btn
                v-bind="props"
                icon="mdi-close"
                variant="text"
                @click="notInterested.push(movie)"
              />
            </template>
          </v-tooltip>
          <v-spacer />
        </v-card-actions>
        {{ notInterested }}
        <!-- <flex-row v-for="v in Object.values(movie)">
          {{ v }}
        </flex-row> -->
      </v-card>
    </flex-col>

    <flex-col style="flex-grow: 1">
      <v-expansion-panels>
        <v-expansion-panel static>
          <template #title>
            <h3>
              🐐 List
            </h3>
          </template>
          <template #text>
            hi
          </template>
        </v-expansion-panel>
      </v-expansion-panels>

      <v-expansion-panels>
        <v-expansion-panel static>
          <template #title>
            <h3>
              💩 List
            </h3>
          </template>
          <template #text>
            hi
          </template>
        </v-expansion-panel>
      </v-expansion-panels>
    </flex-col>
  </flex-row>
</template>