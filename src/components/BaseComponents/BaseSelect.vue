<template>
  <slot></slot>
  <select
    :value="modelValue"
    @change="handleSelect($event)"
    v-bind="$attrs"
    label="label"

  >
  <option value="" selected disabled>{{ placeholder }}</option>
    <option
      v-for="(option, index) in selectOption"
      :key="index"
      :value="option.value"
      :selected="modelValue === value"
    >
      {{ option.label }}
    </option>
    
  </select> 
</template>

<script>
export default {
  name: "BaseSelect",
  props: ["modelValue","selectOption","placeholder"],
  emits: ["update:modelValue"],
  data(){
    return {
        
    }
  },
  methods: {
    handleSelect(Event) {
      this.$emit("update:modelValue", Event.target.value);
    },
  },
};
</script>
