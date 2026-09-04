<template>
  <v-overlay
    :model-value="modelValue"
    persistent
    class="align-center justify-center loading-overlay"
    scrim="#000000"
    :opacity="0.4"
  >
    <v-progress-circular
      indeterminate
      :color="color"
      :size="size"
      :width="width"
    />
  </v-overlay>
</template>

<script setup lang="ts">
withDefaults(
  defineProps<{
    modelValue: boolean;
    color?: string;
    size?: number | string;
    width?: number | string;
  }>(),
  {
    color: "primary",
    size: 64,
    width: 6,
  },
);
</script>

<style scoped>
.loading-overlay {
  backdrop-filter: blur(4px);
  -webkit-backdrop-filter: blur(4px);
}
</style>
