<script setup>
import { nextTick, onMounted, onUpdated, reactive, ref } from 'vue';





   // accordion 2 start
   const accordions = reactive([
      {
         heading:"About Bangladesh",
         content:"Lorem ipsum dolor, sit amet consectetur adipisicing elit. Illo distinctio optio iusto dignissimos, esse quas? Fuga officia recusandae dolores quo, itaque vero assumenda iste expedita aspernatur laborum placeat corporis excepturi ducimus deserunt illo nulla voluptatibus veniam impedit doloribus fugit. Blanditiis eligendi id consequuntur laboriosam mollitia minima earum placeat ea quibusdam?",
         isOpen:true   
      },
      {
         heading:"About Pakistan",
         content:"Lorem ipsum dolor, sit amet consectetur adipisicing elit. Illo distinctio optio iusto dignissimos, esse quas? Fuga officia recusandae dolores quo, itaque vero assumenda iste expedita aspernatur laborum placeat corporis excepturi ducimus deserunt illo nulla voluptatibus veniam impedit doloribus fugit. Blanditiis eligendi id consequuntur laboriosam mollitia minima earum placeat ea quibusdam?",
         isOpen:false
      },

   ])

   // accordion 1 start active index
   const activeIndex = ref(0);

   // location start
   const location = reactive(
      {
      name : "Dhaka",
      whether : "sunny"
      }
   );
   function changeLocation(newLocation,newWhether){
      location.name = newLocation;
      location.whether = newWhether;
   }
   // image size small & large start
   const images = [
      {
      id:'1',
      img:"https://i.ibb.co.com/XsvkgL7/ghjghjgh.jpg",
      },
      {
      id:'2',
      img:"https://i.ibb.co.com/YdtRcY0/makbul.jpg",
      },
      {
      id:'3',
      img:"https://i.ibb.co.com/k4y6T4f/IMG20171205160142.jpg",

      }
    ]

   // image change by clicking start

   const fullImage = ref('https://i.ibb.co.com/YdtRcY0/makbul.jpg');
   const imagesList = [
      {
      id:'1',
      img:"https://i.ibb.co.com/XsvkgL7/ghjghjgh.jpg",
      },
      {
      id:'2',
      img:"https://i.ibb.co.com/YdtRcY0/makbul.jpg",
      },
      {
      id:'3',
      img:"https://i.ibb.co.com/k4y6T4f/IMG20171205160142.jpg",
      }
   ]

   function changeImage(imageList){
       fullImage.value = imageList.img;
   }

   //carousel
   let carousel = null
   const items = ref([
      'https://i.ibb.co.com/sHcf1xN/apu.jpg',
      'https://i.ibb.co.com/BKHMyPT/modern-amphitheater-usa.jpg',
      'https://i.ibb.co.com/s3MgWrn/building-lake.jpg',
      'https://i.ibb.co.com/VVXY9fn/school-teaching-building.jpg',
      'https://i.ibb.co.com/W6Lrzmq/glass-buildings-seen-from-lake.jpg',
   ]);
   const newItem = ref('https://i.ibb.co.com/r3D5Kzm/red-buildings-households.jpg');
   function addNewItem(){
      items.value.push(newItem.value);
      // if you add new item you should destroy carousel
      carousel.destroy();
      // after destroy you should make again carousel
      // when dom will update that time nextTick() will call
      nextTick(function(){
         carousel = new Flickity('#carousel',{});
      })
      //carousel = new Flickity('#carousel',{});
   }
   onMounted(()=>{
      carousel = new Flickity('#carousel',{});

   })

</script>
<template>
   <!-- carousel -->

   <section class="py-3">
      <div class="my-5 text-center">
          <input v-model="newItem" type="text" class="p-2 bg-blue-200 rounded-md mr-2">  
          <button @click="addNewItem()" class=" rounded-md bg-blue-500 hover:bg-blue-700 text-white font-bold p-2">Add Image</button>
      </div>
      <div class="mx-auto items" id="carousel">
         <div :style="`background-image:url(${item})`" class="item"  v-for="item,index in items" :key="item">{{ index++ }}</div>
      </div>
   </section>
   <!-- image show by clicking start -->
   <section class="flex items-center justify-center min-h-screen bg-gray-100">
         <div class="">
            <!-- Top row with three images -->
            <div class="grid grid-cols-3 gap-4 mb-4">
               <div v-for="imageList in imagesList" >
                  <img @click="changeImage(imageList)" :src="imageList.img" :key="imageList.id" alt="Image" class="cursor-pointer h-52 w-52"> 
               </div>
            </div>
            
            <!-- Single image below -->
            <div class="flex justify-center">
                  <img  :src="fullImage" alt="Image 4" class=" cursor-pointer h-96 w-full">
            </div>
         </div>
   </section>


  <!-- accordion 2 start -->
   <section class=" ml-5 mt-5">
      <h1 class="underline text-blue-900 font-bold">Inactive Accordion</h1>
      <div v-for="accordion in accordions">
         <div @click="accordion.isOpen =! accordion.isOpen" class=" cursor-pointer">
            <h1 class=" text-red-600 text-2xl"> <span class=" font-semibold text-red-600">+</span>{{ accordion.heading }}</h1>
         </div>
         <div class=" text-red-950 font-semibold" v-show="accordion.isOpen">
            <p>{{ accordion.content }}</p>
         </div>
      </div>
   </section>
   <!-- accordion 1 start -->
   <section class=" ml-5 mt-5">
      <h1 class="underline text-blue-900 font-bold" >Active Accordion</h1>
      <div @click="activeIndex = index" v-for="(accordion,index) in accordions">
         <div  class=" cursor-pointer">
            <h1 class=" text-red-600 text-2xl"> <span class=" font-semibold text-red-600">+</span>{{ accordion.heading }}</h1>
         </div>
         <div class=" text-red-950 font-semibold" v-show="index == activeIndex">
            <p>{{ accordion.content }}</p>
         </div>
      </div>
   </section>
   <!-- location start -->
   <section class="bg-green-200">
      <div class="flex items-center justify-center h-screen gap-4" >
         <button class=" bg-red-600 h-20 w-28 rounded-md " @click="changeLocation('Brahmanbaria','Sunny')">Brahmanbaria</button>
         <button class=" bg-red-600 h-20 w-28 rounded-md " @click="changeLocation('Chittagong','Cloud')" >Chittagong</button>
         <button class=" bg-red-600 h-20 w-28 rounded-md " @click="changeLocation('Dhaka','Rain')">Dhaka</button>
          <div>
            <h1 class=" h-8 w-8">Location:{{ location.name }}</h1>
            <h1 class=" h-8 w-8">Whether:{{ location.whether }}</h1>
          </div>
      </div>
   </section>
   <!-- image size small & large start -->
   <section class="flex items-center justify-center h-screen gap-4 bg-slate-200">
      <div v-for="image in images" :key="image.id">
         <img class="w-72" :class="image.id == 2?'h-80':'h-72'" :src="image.img" alt="">
      </div>
   </section>




</template>

<style scoped>
.items{
   width: 600px;
   height: 400px;
}
.item{
   width: 600px;
   height: 400px;
   background-color: #ccc;
   background-size: cover;
}
</style>
