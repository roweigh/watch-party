<script>
import data from '../data.json';

import ExpansionPanelList from './ExpansionPanelList.vue';

export default {
  components: {
    ExpansionPanelList,
  },
  data () {
    return {
      data,
      interested: [],
      notInterested: [],
      expanded: [
        'interested',
        'notInterested',
      ],
    };
  },
  computed: {
    excluded () {
      const notInterestedIds = this.notInterested.map(i => {return i.id;});
      const interestedIds = this.interested.map(i => {return i.id;});
      return [
        ...interestedIds,
        ...notInterestedIds,
      ];
    },
    movies () {
      return [...this.data].sort((a, b) => {
        if (a.aggregateRating.ratingValue < b.aggregateRating.ratingValue) {
          return 1;
        }
        if (a.aggregateRating.ratingValue > b.aggregateRating.ratingValue) {
          return -1;
        }
        return 0;
      })
        .map((movie, i) => {
          return {
            id: movie.url,
            name: `${i + 1}. ${movie.name}`,
            description: movie.description,
            rating: movie.aggregateRating.ratingValue.toFixed(1),
            year: movie.datePublished.split('-')[0],
            duration: movie.duration,
          };
        })
        .filter(movie => {return !this.excluded.includes(movie.id); })
        .slice(0, 10);
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
    <flex-col style="gap: 20px; max-width: 70%; min-width: 70%">
      <v-card
        v-for="movie in movies"
        :key="movie.id"
      >
        <template #title>
          <flex-row style="gap: 20px; justify-content: center;">
            <h4 class="text-h5 font-weight-bold">
              {{ movie.name }}
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
                @click="interested.push(movie)"
              />
            </template>
          </v-tooltip>
          <v-tooltip
            text="Mark Seen"
            location="top"
          >
            <template #activator="{ props }">
              <v-btn
                v-bind="props"
                icon="mdi-eye"
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
                icon="mdi-delete"
                variant="text"
                @click="notInterested.push(movie)"
              />
            </template>
          </v-tooltip>
          <v-spacer />
        </v-card-actions>
      </v-card>
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