<template>
   <label for="label"><input  :value="modelValue" id="label" :checked="modelValue===value" @change="handleCheckBox" v-bind="$attrs" /><slot></slot></label>
</template>

<script>
export default {
  name: "BaseCheckBox",
  props: ['modelValue','label'],
  emits: ['update:modelValue'], 
  methods: {
    handleCheckBox(event) {
      this.$emit("update:modelValue", event.target.vaule);
    },
  },
};
</script>
