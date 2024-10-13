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
    seen: { type: Array, required: true },
  },
  emits: [
    'update:interested',
    'update:not-interested',
    'update:seen',
  ],
  computed: {
    liked () {
      const liked = this.interested.map(m => m.id).includes(this.movie.id);
      return liked ? 'pink-accent-2' : undefined;
    },
    unliked () {
      const liked = this.notInterested.map(m => m.id).includes(this.movie.id);
      return liked ? 'red' : undefined;
    },
    seened () {
      const liked = this.seen.map(m => m.id).includes(this.movie.id);
      return liked ? 'green' : undefined;
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

    updateInterested () {
      if (this.liked) {
        this.removeInterested();
      } else {
        this.addInterested();
      }
    },

    addInterested () {
      const result = [...this.interested, this.movie];
      this.removeNotInterested();
      this.$emit('update:interested', result);
    },

    removeInterested () {
      const result = this.interested.filter(m => m.id !== this.movie.id);
      this.$emit('update:interested', result);
    },

    updateNotInterested () {
      if (this.unliked) {
        this.removeNotInterested();
      } else {
        this.addNotInterested();
      }
    },

    addNotInterested () {
      const result = [...this.notInterested, this.movie];
      this.removeInterested();
      this.$emit('update:not-interested', result);
    },

    removeNotInterested () {
      const result = this.notInterested.filter(m => m.id !== this.movie.id);
      this.$emit('update:not-interested', result);
    },

    updateSeen () {
      if (this.seened) {
        this.removeSeen();
      } else {
        this.addSeen();
      }
    },

    addSeen () {
      const result = [...this.seen, this.movie];
      this.$emit('update:seen', result);
    },

    removeSeen () {
      const result = this.seen.filter(m => m.id !== this.movie.id);
      this.$emit('update:seen', result);
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
            v-if="liked"
            icon="mdi-robot-angry"
            color="cyan-accent-4"
            type="like"
          />
          <avatar
            v-if="seened"
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
              :color="liked"
              icon="mdi-heart"
              variant="text"
              @click="updateInterested()"
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
              :color="seened"
              icon="mdi-eye-check"
              variant="text"
              @click="updateSeen()"
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
              :color="unliked"
              icon="mdi-close-thick"
              variant="text"
              @click="updateNotInterested()"
            />
          </template>
        </v-tooltip>
      </flex-row>
    </v-card-text>
  </v-card>
</template>