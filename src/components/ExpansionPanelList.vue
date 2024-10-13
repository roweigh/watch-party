<script>
export default {
  props: {
    user: { type: Object, required: true },
    list: { type: Array, required: true },
    value: { type: String, default: '' },
    title: { type: String, default: '' },
  },
  emits: [
    'update-movie',
  ],
  methods: {
    removeSelf (movie) {
      const result = [...movie.voteList];
      result.splice(result.indexOf(this.userName));
      this.$emit('update-movie', { id: movie.id, result });
    },
  },
};
</script>

<template>
  <v-expansion-panel
    :value="value"
    static
  >
    <template #title>
      <h3>
        {{ title }}
      </h3>
    </template>
    <template #text>
      <v-list height="250">
        <v-list-item
          v-for="movie in list"
          :key="movie.id"
          :title="movie.name"
        >
          <template #append>
            <v-btn
              icon="mdi-close"
              size="small"
              @click="removeSelf(movie)"
            />
          </template>
        </v-list-item>
      </v-list>
    </template>
  </v-expansion-panel>
</template>