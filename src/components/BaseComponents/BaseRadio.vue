<template>
   
  <label :for="label">
  <input :value="value" type="radio" :checked="modelValue === value" :id="label" @change="handleRadio"  v-bind="$attrs"/>
  {{ label }}</label>
</template>

<script>
export default {
  name: "BaseRadio",
  props: ["label", "modelValue","id","header","value"],
  emits: ["update:modelValue"],
  methods: {
    handleRadio(event) {
      this.$emit("update:modelValue", event.target.value);
      event.stopPropagation();
    },
  },
};
</script>
