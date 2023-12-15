<template>
  <button @click="handleClick"><slot></slot></button>
</template>

<script>
export default {
  props: [],
  emits: ["HandleButton"],
  methods: {
    handleClick() {
      
      this.$emit("HandleButton");
    },
  },
};
</script>
