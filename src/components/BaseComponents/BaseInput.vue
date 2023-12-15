<template>
  <label for="id">{{ label }}</label>
  <input :value="modelValue" @input="handleInput"  v-bind="$attrs" />
</template>

<script>
export default {
  name: "BaseInput",
  props: ["modelValue", "label"],
  methods: {
    handleInput(event) {
      this.$emit("update:modelValue", event.target.value);
      event.stopPropagation();
    },
  },
};
</script>
