<script>
import Avatar from '/src/components/Avatar.vue';

export default {
  components: {
    Avatar,
  },
  props: {
    user: { type: Object, required: true },
    movie: { type: Object, required: true },
    loading: { type: Boolean, default: false },
  },
  emits: [
    'update-movie',
  ],
  computed: {
    userName () { return this.user.name; },
    ratingColor () {
      if (this.movie.rating >= 9) {
        return 'green';
      } else if (this.movie.rating >= 8) {
        return 'light-green-darken-1';
      } else {
        return null;
      }
    },
    liked () {
      const liked = this.movie.interested.includes(this.userName);
      return liked ? 'pink-accent-2' : undefined;
    },
    unliked () {
      const unliked = this.movie.notInterested.includes(this.userName);
      return unliked ? 'red' : undefined;
    },
    seen () {
      const seen = this.movie.seen.includes(this.userName);
      return seen ? 'green' : undefined;
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
  <v-card>
    <v-card-title class="bg-grey-darken-3 text-h5 font-weight-bold">
      {{ movie?.name }}
    </v-card-title>

    <v-card-text class="bg-grey-darken-2 pt-4">
      <flex-row style="gap: 20px; justify-content: center; align-items: center;">
        <v-label> {{ movie?.year }} </v-label>
        <v-label> {{ movie?.duration }} </v-label>
        <v-chip
          :color="ratingColor"
          class="font-weight-bold"
          density="compact"
          variant="flat"
          label
        >
          {{ movie?.rating }}
        </v-chip>

        <flex-row style="position: absolute; right: 20px; gap: 12px">
          <avatar
            v-if="liked"
            icon="mdi-robot-angry"
            color="cyan-accent-4"
            type="like"
          />
          <avatar
            v-if="seen"
            icon="mdi-robot-angry"
            color="cyan-accent-4"
            type="seen"
          />
          <avatar
            v-if="unliked"
            icon="mdi-robot-angry"
            color="cyan-accent-4"
            type="unlike"
          />
        </flex-row>
      </flex-row>

      <p class="py-3">
        {{ movie?.description }}
      </p>

      <flex-row class="justify-center">
        <v-tooltip
          text="Keen"
          location="top"
        >
          <template #activator="{ props }">
            <v-btn
              v-bind="props"
              :loading="loading"
              :color="liked"
              icon="mdi-heart"
              variant="text"
              @click="$emit('interested', { liked, unliked })"
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
              :loading="loading"
              :color="seen"
              icon="mdi-eye-check"
              variant="text"
              @click="$emit('seen', seen)"
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
              :loading="loading"
              :color="unliked"
              icon="mdi-close-thick"
              variant="text"
              @click="$emit('not-interested', { liked, unliked })"
            />
          </template>
        </v-tooltip>
      </flex-row>
    </v-card-text>
  </v-card>
</template>