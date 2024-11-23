<script setup>
import { inject } from 'vue';

 const props = defineProps(['person']);

</script>
<template>
 <label>{{ person.name }}</label>
 <input v-model="person.email"  type="text" class="mt-1 p-3 block   border-2 border-gray-700 shadow-sm sm:text-sm"  >
</template>
<style scoped>

</style>