<script>
export default {
  props: {
    list: { type: Array, required: true },
    value: { type: String, default: '' },
    title: { type: String, default: '' },
  },
  emits: ['update:list'],
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
              @click="$emit('update:list', list.filter(item => item.id !== movie.id))"
            />
          </template>
        </v-list-item>
      </v-list>
    </template>
  </v-expansion-panel>
</template>