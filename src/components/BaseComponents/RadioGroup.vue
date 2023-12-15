<template>
  <div class="flex">
    <slot></slot>
    <div class="ml-3">
    <BaseRadio
    class="ml-1"
      v-for="option in options"
      :key="option.value"
      :label="option.label"
      :value="option.value"
      :modelValue="modelValue"
      @update:modelValue="$emit('update:modelValue', $event)"
    ></BaseRadio>
  </div>
  </div>
</template>

<script>
import BaseRadio from "@/components/questions/BaseComponents/BaseRadio.vue";
export default {
  components: { BaseRadio },
  props: {
    label: { type: String, default: "" },
    modelValue: { type: [String, Number], default: "" },
    errors: { type: Array, default: () => [] },
    options: { type: Array, required: true },
  },
  emits: ["update:modelValue"],
  computed: {
    success() {
      return this.errors.length === 0;
    },
  },
};
</script>
