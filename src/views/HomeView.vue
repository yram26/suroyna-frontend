<template>
   <section id="home" class="relative h-screen">
    <div class="absolute inset-0 bg-black/10 z-10"></div>
    <video
      autoplay
      loop
      muted
      playsinline
      class="absolute inset-0 w-full h-full object-cover"
    >
      <source src="@/assets/vid/vid.mp4" type="video/mp4" />
    </video>
    
    <div class="relative z-20 container mx-auto px-4 h-full">
      <div class="flex items-center justify-between h-full">
        <!-- Left Content -->
        <div class="max-w-2xl">
          <h1 class="text-5xl md:text-6xl font-bold text-white mb-6 animate-fade-in">
            Discover Cebu's Hidden Gems
          </h1>
          <p class="text-xl text-white mb-8">
            Your ultimate guide to exploring the Queen City of the South
          </p>
          <div class="p-4 rounded-lg shadow-lg">
            <div class="relative">
              <input
                v-model="searchQuery"
                type="text"
                placeholder="Search destinations, experiences, or guides..."
                class="w-full pl-12 pr-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-6 w-6 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>
        </div>

        <!-- Right Image -->
        <div class="hidden lg:block w-1/3 animate-float">
          <img 
            src="@/assets/img/cebu.png" 
            alt="Tourist Guide" 
            class="max-w-full h-auto drop-shadow-2xl"
          />
        </div>
      </div>
    </div>
  </section>
 <section id="about">
       <AboutView/>
     </section>
     <section id="contact">
       <ContactView/>
     </section>
 
 </template>
 
 <script setup>
 import { ref, onMounted, onUnmounted  } from "vue";
 import axios from "axios";
 import AboutView from "./AboutView.vue";
 import ContactView from "./Contact.vue";
 import { useRoute } from 'vue-router';
 import Chatbot from "@/components/Chatbot.vue";
 
 const route = useRoute();
 
 const activeLink = ref('');
 
 // Reactive variable for search input
 const searchQuery = ref("");
 let intervalId;
 
 function scrollToSection(sectionId) {
   const section = document.querySelector(sectionId);
   if (section) {
     window.scrollTo({
       top: section.offsetTop,
       behavior: 'smooth',
     });
   }
 }
 
 
 
 // Reactive variable for latest posts
 const latestPosts = ref([]);
 
 // Fetch latest posts
 const fetchLatestPosts = async () => {
   try {
     const response = await axios.get('http://localhost:3000/api/posts/latest');
     latestPosts.value = response.data.map(post => ({
       id: post.post_id,
       title: post.title,
       imageUrl: `http://localhost:3000${post.image_url.split(',')[0]}`, // Use the first image for the card
       excerpt: post.content.substring(0, 100) + '...', // Shorten content for excerpt
       author: post.author,
       authorImage: `http://localhost:3000${post.author_image.split(',')[0]}`, // Use the first image for the card
     }));
   } catch (error) {
     console.error('Error fetching latest posts:', error);
   }
 };
 
 // Fetch posts on component mount
 onMounted(() => {
   fetchLatestPosts();
   activeLink.value = route.name;
 });
 onUnmounted(() => {
   clearInterval(intervalId);
 });
 </script>
 <style scoped>
 @keyframes glow {
   0% {
     text-shadow: 0 0 5px rgba(247, 246, 243, 0.8), 0 0 15px rgba(255, 255, 255, 0.7);
   }
   50% {
     text-shadow: 0 0 10px rgb(247, 247, 247), 0 0 30px rgba(250, 250, 250, 0.8);
   }
   100% {
     text-shadow: 0 0 5px rgba(255, 255, 255, 0.8), 0 0 15px rgba(255, 255, 255, 0.7);
   }
 }
 
 .animate-glow {
   animation: glow 1.5s infinite alternate;
 }
 video {
   object-fit: cover;
 }
 
 </style>