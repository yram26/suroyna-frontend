<template>
 <div class="posts container p-12 mx-auto px-4 mt-20 max-w-6xl mt-20">
    <h2 class="text-4xl font-extrabold mb-8 text-center text-red-800 transform hover:scale-105 transition-transform duration-300">
      Exploring {{ destination }}
    </h2>

    <div v-if="posts.length" class="container grid grid-cols-1 gap-8 my-auto lg:grid-cols-3">
      <div v-for="(post, index) in processedPosts" 
           :key="post.id" 
           :style="`animation-delay: ${index * 150}ms`"
           class="shadow-slate-800 bg-white rounded-lg shadow-md overflow-hidden transform hover:-translate-x-2 transition-all duration-300 fade-in">
        <!-- Image Gallery -->
        <div class="relative bg-clip-border rounded-t-xl overflow-hidden">
          <img :src="`http://localhost:3000${post.currentImageUrl}`"
               :alt="post.title"
               class="object-cover w-full h-64 transition-opacity duration-500 hover:opacity-90" />
        </div>

        <!-- Content Section -->
        <div class="p-6">
          <!-- User Info -->
          <div class="flex items-center mb-4">
            <img :src="`http://localhost:3000${post.profile_photo}`"
                 class="inline-block relative object-cover object-center rounded-full w-12 h-12" />
            <div class="ml-4">
              <p class="font-semibold text-gray-800">{{ post.username }}</p>
              <p class="text-sm text-gray-500">
                {{ new Date(post.created_at).toLocaleDateString('en-US', { 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                }) }}
              </p>
            </div>
          </div>

          <!-- Post Title & Content -->
          <h3 class="text-xl font-bold text-gray-800 mb-2 hover:text-red-800 transition-colors duration-300">
            {{ post.title }}
          </h3>
          <p class="text-gray-600 mb-4 line-clamp-3">{{ post.content }}</p>

          <!-- Stats -->
          <div class="flex items-center justify-between text-sm text-gray-500 border-t pt-4">
            <div class="flex space-x-4">
              <span class="flex items-center">
                ❤️ {{ post.likes }}
              </span>
              <span class="flex items-center">
                👁️ {{ post.views }}
              </span>
            </div>
            <span class="bg-red-100 text-red-800 text-xs px-2 py-1 rounded-full">
              {{ post.destination }}
            </span>
          </div>

          <!-- Read More -->
          <div class="mt-4 text-center border-t pt-4">
            <router-link
              :to="`/posts/${post.id}`"
              class="text-red-800 font-semibold hover:text-red-600 transition-colors duration-300"
            >
              Read more →
            </router-link>
          </div>
        </div>
      </div>
    </div>
    <!-- No Posts Message -->
    <div v-else class="flex flex-col items-center justify-center min-h-[400px]">
      <svg xmlns="http://www.w3.org/2000/svg" class="h-16 w-16 text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
      </svg>
      <p class="text-xl text-gray-500">No posts available for this destination yet.</p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch, computed } from "vue";
import { useRoute } from "vue-router";
import axiosInstance from "@/axiosInstance";

const route = useRoute();
const destination = ref(route.params.destination);
const posts = ref([]);

const processedPosts = computed(() => {
  return posts.value.map(post => {
    const imageUrls = post.image_url.split(',').map(url => url.trim());
    return {
      ...post,
      id: post.post_id, // Include post_id
      currentImageUrl: imageUrls[0],
      allImageUrls: imageUrls,
    };
  });
});

async function fetchPosts(dest) {
  try {
    const response = await axiosInstance.get(`/api/posts/destination/${dest}`);
    posts.value = response.data;
  } catch (error) {
    console.error('Error fetching posts:', error);
  }
}

watch(
  () => route.params.destination,
  (newDestination) => {
    destination.value = newDestination;
    fetchPosts(newDestination);
  }
);

onMounted(() => {
  fetchPosts(destination.value);
});
</script>

<style scoped>
.fade-in {
  animation: fadeIn 0.5s ease-in-out forwards;
  opacity: 0;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Optional: Add hover effect for images */
.post-image:hover {
  transform: scale(1.05);
  transition: transform 0.3s ease;
}

/* Optional: Add smooth transition for all animations */
* {
  transition: all 0.3s ease;
}
</style>