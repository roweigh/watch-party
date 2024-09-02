<script>
import Avatar from '/src/components/Avatar.vue';

export default {
  components: {
    Avatar,
  },
  props: {
    movie: { type: Object, required: true },
    interested: { type: Array, required: true },
    notInterested: { type: Array, required: true },
  },
  emits: [
    'update:interested',
    'update:not-interested',
  ],
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
  <v-card>
    <v-card-title class="bg-grey-darken-3">
      <span class="text-h5 font-weight-bold">
        {{ movie.name }}
      </span>
    </v-card-title>

    <v-card-text class="bg-grey-darken-2 pt-4">
      <flex-row
        class="text-medium-emphasis"
        style="gap: 20px; justify-content: center; align-items: center;"
      >
        <span> {{ movie.year }} </span>
        <span> {{ movie.duration }} </span>
        <v-chip
          :color="getColor(movie.rating)"
          variant="flat"
          label
        >
          <span style="font-weight: bold">
            {{ movie.rating }}
          </span>
        </v-chip>

        <flex-row style="position: absolute; right: 20px; gap: 12px">
          <avatar
            icon="mdi-robot-angry"
            color="cyan-accent-4"
            type="like"
          />
          <avatar
            icon="mdi-robot-angry"
            color="cyan-accent-4"
            type="seen"
          />
          <avatar
            icon="mdi-robot-angry"
            color="cyan-accent-4"
            type="unlike"
          />
        </flex-row>
      </flex-row>

      <flex-row
        class="pt-3 pb-3"
        style="justify-content: center;"
      >
        {{ movie.description }}
      </flex-row>

      <flex-row style="justify-content: center;">
        <v-tooltip
          text="Keen"
          location="top"
        >
          <template #activator="{ props }">
            <v-btn
              v-bind="props"
              icon="mdi-heart"
              variant="text"
              @click="$emit('update:interested', [...interested, movie])"
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
              icon="mdi-eye-check"
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
              icon="mdi-close-thick"
              variant="text"
              @click="$emit('update:not-interested', [...notInterested, movie])"
            />
          </template>
        </v-tooltip>
      </flex-row>
    </v-card-text>
  </v-card>
</template>