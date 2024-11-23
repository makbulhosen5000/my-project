<script setup>
import { inject } from 'vue';


const course = inject('course');
const stock = inject('stock');
</script>
<template>
<section class="flex items-center justify-center gap-5 pt-3">
    <div>
        <label for="file" class="block text-sm font-medium text-gray-700">My Favorite Course</label>
        <div class="flex gap-2">
            <p>Course Name: {{ course.name }}</p>
            <p>Course Price: {{ course.price }}</p>
            <p>Stock: {{ stock }}</p>
            <input v-model="course.name"  type="text" class="mt-1 p-3 block   border-2 border-gray-700 shadow-sm sm:text-sm"  >
        </div>
    </div>
</section>
</template>
<style scoped>

</style>