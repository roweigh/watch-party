<script>
export default {
  props: {
    icon: { type: String, required: true },
    color: { type: String, default: 'grey' },
    type: { type: String, default: null },
  },
  computed: {
    badge () {
      switch (this.type) {
      case 'like':
        return { icon: 'mdi-heart', color: 'pink-accent-2' };
      case 'seen':
        return { icon: 'mdi-eye-check', color: 'green' };
      case 'unlike':
        return { icon: 'mdi-close-thick', color: 'red' };
      default:
        return null;
      }
    },
  },
};
</script>

<template>
  <v-badge
    v-if="badge"
    :icon="badge.icon"
    :color="badge.color"
    bordered
  >
    <template #default>
      <v-avatar
        :color="color"
        :icon="icon"
      />
    </template>
  </v-badge>

  <v-avatar
    v-else
    :color="color"
    :icon="icon"
  />
</template>