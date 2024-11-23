<script setup>
import { nextTick, onMounted, onUpdated, provide, reactive, ref } from 'vue';
import { countries } from '../js/countries';
import { invoice } from '../js/invoice';
import PersonComponent from './PersonComponent.vue'
import Radio from './Radio.vue';
import CourseA from './CourseA.vue';


   // accordion 1 start  inactive index
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

   // accordion 2 start active index
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
   //color display 
   const color = ref('none');
   function getColor(){
      return{
         backgroundColor:color.value
      }
   }
    //<!-- Display Random Image -->
   const displayImage = ref(true);

   // search
   const search = ref('');
   function getFilterCountries(){
      return countries.filter(country=>{
         return country.name.toLowerCase().startsWith(search.value.toLowerCase());
      })
   }
   //invoice
   const data = reactive({
      sender:'',
      billTo:'',
      shipTo:'',
      invoiceNum:'',
      date:'',
      dueDate:'',
      additionalNote:'',
      items:[
         {
            description:'',
            quantity:'',
            rate:'',
            amount:'',
         }
      ],
      note:'',
      terms:'',
      subtotal:'',
      tax:'',
      total:'',
   })

   function addMoreItem(){
       data.items.push({
         description:'',
         quantity:'',
         rate:'',
         amount:''
         })
   }
   function getSubTotal(){
      let subtotal = 0;
      data.items.forEach(item=>{
         subtotal += item.amount;
         data.subtotal = subtotal;
         return subtotal;
      })
   }
   function getTotal(){
      let total = 0;
      const tax = data.subtotal * data.tax / 100;
      total = data.subtotal + tax;
      data.total = total;
      return total;
   }

   //props with object
   const person = reactive({
      name:'makbul',
      email:'makbul@gmail.com'
   })

   // radio
   const fruit = ref('apple');
   //provide
   const course = reactive({
      name:'Vue',
      price:'1500'
   });
   provide('course',course);
   provide('stock',100);
</script>
<template>

   <!-- provide -->
    <CourseA />
   <!-- radio -->
      <section class="flex items-center justify-center gap-5 pt-3">
      <div>
         <label for="file" class="block text-sm font-medium text-gray-700">My Favorite Fruit</label>
         <div class="flex gap-2">
            <Radio v-model="fruit" label="apple" value="apple" />
            <Radio v-model="fruit" label="guava" value="guava" />
            <Radio v-model="fruit" label="mango" value="mango" />
         </div>
      </div>
   </section>
   <!-- props with object -->
   <section class="flex items-center justify-center gap-5 pt-3">
      <div>
         <label for="file" class="block text-sm font-medium text-gray-700">{{ person.name }}</label>
         <input  v-model="person.email"  type="text" class="mt-1 p-3 block   border-2 border-gray-700 shadow-sm sm:text-sm" placeholder="Enter Sender" >
      </div>
      <div>
         <PersonComponent :person="person"/>
      </div>
   </section>
   <!-- invoice -->
   <section class="">
      <div class="max-w-6xl mx-auto bg-white shadow-lg rounded-lg p-6">
         <h2 class="text-2xl font-bold text-gray-800 mb-6">Invoice Layout</h2>
         <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <!-- Left Side -->
            <div class="space-y-4">
               <div>
                  <label for="file" class="block text-sm font-medium text-gray-700"> Sender</label>
                  <input v-model="data.sender"  type="text" id="file"  class="mt-1 p-3 block w-full  border-2 border-gray-700 shadow-sm sm:text-sm" placeholder="Enter Sender" >
               </div>
               <div>
                  <label for="file" class="block text-sm font-medium text-gray-700"> Bill To</label>
                  <input v-model="data.billTo"  type="text" id="file"  class="mt-1 p-3 block w-full  border-2 border-gray-700 shadow-sm sm:text-sm" placeholder="Enter Bill To" >
               </div>
               <div>
                  <label for="file" class="block text-sm font-medium text-gray-700"> Ship to</label>
                  <input v-model="data.shipTo"  type="text" class="mt-1 p-3 block w-full  border-2 border-gray-700 shadow-sm sm:text-sm" placeholder="Enter Ship To" >
               </div>
            </div>
            
            <!-- Right Side -->
            <div class="space-y-4">
            <!-- Three Input Fields -->
               <div>
                  <label for="field3" class="block text-sm font-medium text-gray-700">Date</label>
                  <input  v-model="data.date" type="text" id="field3" placeholder="Enter Date"  class="mt-1 p-3 block w-full  border-2 border-gray-700 shadow-sm sm:text-sm">
               </div>
               <div>
                  <label for="field4" class="block text-sm font-medium text-gray-700">Due Date</label>
                  <input  v-model="data.dueDate" type="text" id="field4" placeholder="Enter Due Date"  class="mt-1 p-3 block w-full  border-2 border-gray-700 shadow-sm sm:text-sm">
               </div>
               <div>
                  <label for="field5" class="block text-sm font-medium text-gray-700">Additional Note</label>
                  <input  v-model="data.additionalNote" type="text" id="field5" placeholder="Enter Additional Note"  class="mt-1 p-3 block w-full  border-2 border-gray-700 shadow-sm sm:text-sm">
               </div>
            </div>
         </div>
         <div class="my-5">
            <table class=" w-full text-left border-collapse border border-gray-300">
               <thead class="bg-gray-200">
                  <tr>
                     <th class="border border-gray-300 px-4 py-2">Description</th>
                     <th class="border border-gray-300 px-4 py-2">Quantity</th>
                     <th class="border border-gray-300 px-4 py-2">Rate</th>
                     <th class="border border-gray-300 px-4 py-2">Amount</th>
                  </tr>
               </thead>
               <tbody>
                  <tr v-for="(item,index) in data.items" :key="index">
                     <td class="border border-gray-300 px-4 py-2"><input v-model="item.description" type="text" id="field5" placeholder="Enter Description"  class="mt-1 p-3 block w-full  border-2 border-gray-700 shadow-sm sm:text-sm"></td>
                     <td class="border border-gray-300 px-4 py-2"><input v-model="item.quantity" type="number" id="field5" placeholder="Enter Quantity"  class="mt-1 p-3 block w-full  border-2 border-gray-700 shadow-sm sm:text-sm"></td>
                     <td class="border border-gray-300 px-4 py-2"><input v-model="item.rate" type="number" id="field5" placeholder="Enter Rate"  class="mt-1 p-3 block w-full  border-2 border-gray-700 shadow-sm sm:text-sm"></td>
                     <td  class="border border-gray-300 px-4 py-2">$ {{ item.amount = item.quantity * item.rate }}</td>
                  </tr>
               </tbody>
               <button @click="addMoreItem()" class="bg-green-600 p-2 m-2">Add More</button>
               <button @click="Object.assign(data,invoice)" class="bg-green-600 p-2 m-2">Load Invoice</button>
               <tfoot>
          <tr>
            <td  colspan="3" class="border border-gray-300 px-4 py-2 text-right font-bold">Subtotal:</td>
            <td class="border border-gray-300 px-4 py-2" :value="getSubTotal()">${{ data.subtotal}}</td>           
          </tr>
          <tr>
            <td colspan="3" class="border border-gray-300 px-4 py-2 text-right font-bold">Tax:</td>
            <td class="border border-gray-300 px-4 py-2" ><input v-model="data.tax" type="number" id="field5"></td>
          </tr>
          <tr>
            <td colspan="3" class="border border-gray-300 px-4 py-2 text-right font-bold">Total:</td>
            <td class="border border-gray-300 px-4 py-2" :value="getTotal()">$ {{ data.total }}</td>
          </tr>
        </tfoot>
            </table>       
         </div>
      </div>
   </section>

   <!-- Search Country -->
   <section class="flex justify-center items-center gap-16 py-5">
      <div>
         <h1>Country {{ search }}</h1>
         <input  v-model="search"  type="search" class="p-2 bg-blue-200 rounded-md mr-2" placeholder="Search Country"> 
         
         <div class="pt-3">
            <ul>
               <li v-for="(country,key) in getFilterCountries()" :key="key">{{ country.name }}</li>
            </ul>
         </div>
      </div>
   </section>
   <!-- Display Random Image -->
      <section class="flex justify-center items-start">
      <div class="my-5">
         <div class="flex gap-2">
          <p>Display Random Image with v-show {{ displayColor }}</p>
          <input type="checkbox" class="p-2 bg-blue-200 rounded-md mr-2" v-model="displayImage"> 
        
         </div>
          <img v-show="displayImage" class=" w-56 h-28 py-2" :src="`https://picsum.photos/500/300?random?version=${Math.random()}`" alt="">
      </div>
   </section>
   <!-- color display  -->
   <section class="flex justify-center items-start">
      <div class="my-5">
          <p>Your Favorite Color: {{ color }}</p>
          <input v-model="color" type="text" class="p-2 bg-blue-200 rounded-md mr-2"> 
          <div :style="getColor()" class=" w-56 h-28 py-2"></div> 
      </div>
   </section>
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
   <!-- image change by clicking start -->
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


  <!-- accordion 1 inactive start -->
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
   <!-- accordion 2 active start -->
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
