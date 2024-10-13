<script>
import Avatar from '/src/components/Avatar.vue';

export default {
  components: {
    Avatar,
  },
  props: {
    user: { type: Object, required: true },
    movie: { type: Object, required: true },
    loading: { type: Boolean, required: true },
  },
  emits: [
    'update-movie',
  ],
  computed: {
    userName () {
      return this.user.name;
    },
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
      const liked = this.movie.interested.includes(this.user.name);
      return liked ? 'pink-accent-2' : undefined;
    },
    unliked () {
      const unliked = this.movie.notInterested.includes(this.user.name);
      return unliked ? 'red' : undefined;
    },
    seen () {
      const seen = this.movie.seen.map(m => m.id).includes(this.movie.id);
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

    updateInterested () {
      if (this.liked) {
        this.$emit('update-movie', {
          interested: this.movie.interested.filter(name => name !== this.userName),
        });
      } else {
        const payload = {
          interested: [
            ...this.movie.interested,
            this.userName,
          ],
        };

        if (this.unliked) {
          const notInterested = [...this.movie.notInterested];
          const i = notInterested.indexOf(this.userName);
          notInterested.splice(i);
          payload.notInterested = notInterested;
        }

        this.$emit('update-movie', payload);
      }
    },

    notInterested () {
      if (this.unliked) {
        this.$emit('update-movie', {
          notInterested: this.movie.notInterested.filter(name => name !== this.userName),
        });
      } else {
        const payload = {
          notInterested: [
            ...this.movie.notInterested,
            this.userName,
          ],
        };

        if (this.liked) {
          const interested = [...this.movie.interested];
          const i = interested.indexOf(this.userName);
          interested.splice(i);
          payload.interested = interested;
        }

        this.$emit('update-movie', payload);
      }
    },

    updateSeen () {
      if (this.seen) {
        const payload = {
          seen: this.movie.seen.filter(name => name !== this.userName),
        };
        this.$emit('update-movie', payload);
      } else {
        const payload = {
          seen: [
            ...this.movie.seen,
            this.userName,
          ],
        };
        this.$emit('update-movie', payload);
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
          :color="ratingColor"
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
              :loading="loading"
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
              :loading="loading"
              :color="seen"
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
              :loading="loading"
              :color="unliked"
              icon="mdi-close-thick"
              variant="text"
              @click="notInterested()"
            />
          </template>
        </v-tooltip>
      </flex-row>
    </v-card-text>
  </v-card>
</template>