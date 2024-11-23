<script setup>
import { computed } from 'vue';

const props = defineProps([
    'label','modelValue','value'
])
const emit = defineEmits(['update:modelValue']);

const radioValue = computed({
    get: ()=> props.modelValue,
    set: (value)=> emit('update:modelValue',value)
}) 
</script>
<template>
     <label>{{ label }}</label>
     <input  v-model="radioValue" :value='value' type="radio" class="mt-1 p-3 block   border-2 border-gray-700 shadow-sm sm:text-sm"  >
</template>
<style scoped>
</style>