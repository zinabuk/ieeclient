<template>
<textarea :value="modelValue" @input="handleArea"></textarea>
</tempalte>

<script>
    export default{
        name: "BasetextArea",
        props: ["modelValue"],
        emits: ["update:modelValue"],
        methods:{
handleArea(){
            this.$emit("update:modelValue", ev.target.value)
        }
    }
    }
</script>