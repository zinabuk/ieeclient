<template>
  <input type="file" @change="handleFile($event)" v-bind="$attrs" />
</template>

<script>
export default {
  name: "BasefileInput",
  props: ["modelValue"],
  emits: ["update:modelValue"],
  methods: {
    handleFile(event) {
      console.log(event)
      this.$emit("update:modelValue", event.target.files[0]);
    },
  },
};
</script>
