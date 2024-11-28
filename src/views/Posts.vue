<template>
  <section class="grid min-h-screen p-8 place-items-center bg-gray-100 mt-16">
    <div class="mt-16 "></div>
    <div class="animate-fade-in">
      <p class="font-extrabold text-center text-5xl mb-6">Begin your journey</p>
      <p class="font-semibold text-center mb-16">Browse for the famous places in Cebu</p>
    </div>
    <div class="animate-fade-in container grid grid-cols-1 gap-8 my-auto lg:grid-cols-3">
      <div v-for="post in posts" :key="post.id"
        class="relative flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 shadow-lg shadow-black transition-transform transform hover:scale-105 hover:shadow-2xl">
        <div class="relative bg-clip-border rounded-t-xl overflow-hidden">
          <img :src="post.currentImageUrl" :alt="post.title"
            class="object-cover w-full h-64 transition-opacity duration-500 hover:opacity-90" />
        </div>
        <div class="p-6">
          <p class="block antialiased font-sans text-sm font-semibold leading-normal text-inherit mb-4 font-semibold">{{
            post.category }}</p>
          <router-link :to="`/posts/${post.id}`"
            class="block antialiased tracking-normal  font-sans text-2xl font-extrabold leading-snug text-blue-gray-900 mb-6 normal-case transition-colors hover:text-blue-500">{{
              post.title }}</router-link>
          <p class="block antialiased font-sans text-base italic leading-relaxed text-inherit mb-4 font-semibold text-gray-500">
            {{ post.content }}</p>
          <p class="block antialiased font-sans text-sm leading-relaxed text-inherit mb-4 font-normal text-gray-500">
            Destination: {{ post.destination }}</p>
          <div class="flex items-center gap-4 mb-4">
            <img :src="post.authorImage"
              class="inline-block relative object-cover object-center rounded-full w-12 h-12" />
            <div>
              <p
                class="block antialiased font-sans text-base font-light leading-relaxed text-blue-gray-900 mb-0.5 font-semibold">
                {{ post.author }}</p>
              <p class="block antialiased font-sans text-sm leading-normal text-gray-700 font-normal">{{ post.date }}
              </p>
            </div>
          </div>
          <div class="flex justify-between items-center">
            <button @click="likePost(post.id)"
              class="bg-slate-500 text-white py-1 px-3 rounded hover:bg-blue-600 transition duration-300">
              <i class="fas" :class="post.liked ? 'fa-solid fa-heart' : 'fa-regular fa-heart'"></i>
              {{ post.liked ? 'Unlike' : 'Like' }} <span class="ml-1">{{ post.likeCount }}</span>
            </button>
            <span class="text-gray-600">Views: {{ post.views }}</span>
          </div>
          <div>
            <router-link :to="`/posts/${post.id}`" class="mt-6 flex mx-w-auto p-2 rounded-lg justify-center text-slate-600 underline font-bold hover:underline">Read more</router-link>
          </div>
        </div>
      </div>
    </div>
  </section>
  <footer class="bg-gray-900 text-white py-6 px-4 text-center relative z-10">
      <div class="max-w-4xl mx-auto">
        <div class="flex justify-center space-x-4 mb-4">
          <a href="#" class="hover:text-yellow-400 transition duration-300">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18 2a2 2 0 012 2v16a2 2 0 01-2 2H6a2 2 0 01-2-2V4a2 2 0 012-2h12zM8 11h8m-8 4h8m-8-8h8" />
            </svg>
          </a>
          <a href="#" class="hover:text-yellow-400 transition duration-300">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 2a10 10 0 00-3.95 19.29c.31.06.42-.13.42-.3v-1.12c-1.72.37-2.08-.83-2.08-.83-.28-.72-.68-.91-.68-.91-.55-.38.04-.37.04-.37.61.04.93.63.93.63.54.93 1.42.66 1.77.5.06-.39.21-.66.38-.81-1.37-.16-2.81-.68-2.81-3.03 0-.67.24-1.22.63-1.65-.06-.16-.27-.8.06-1.67 0 0 .51-.16 1.67.63a5.8 5.8 0 013.04 0c1.16-.79 1.67-.63 1.67-.63.33.87.12 1.51.06 1.67.39.43.63.98.63 1.65 0 2.36-1.44 2.87-2.81 3.03.21.18.4.54.4 1.09v1.62c0 .17.11.36.42.3A10 10 0 0012 2z" />
            </svg>
          </a>
          <a href="#" class="hover:text-yellow-400 transition duration-300">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 8a6 6 0 11-12 0 6 6 0 0112 0zM12 14a9 9 0 00-9 9h18a9 9 0 00-9-9z" />
            </svg>
          </a>
        </div>
        <p class="text-sm text-gray-400 mb-2">Follow us on social media for the latest updates</p>
        <p class="text-sm">&copy; 2024 All rights reserved.</p>
      </div>
    </footer>
</template>
<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';

const posts = ref([]);

const fetchPosts = async () => {
  try {
    const response = await axios.get('http://localhost:3000/api/posts', {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      }
    });
    posts.value = response.data.map(post => {
      const imageUrls = post.image_url.split(',').map(url => `http://localhost:3000${url.trim()}`);
      const authorImage = post.author_image.split(',').map(url => `http://localhost:3000${url.trim()}`);
      return {
        id: post.post_id,
        title: post.title,
        content: post.content,
        imageUrls,
        currentImageUrl: imageUrls[0],
        author: post.author,
        authorImage: authorImage[0], // Use the actual author's image
        date: new Date(post.created_at).toLocaleDateString(),
        likes: post.likes || 0, // Ensure likes are initialized
        likeCount: post.likeCount || 0, // Add likeCount to the post object
        views: post.views || 0,
        category: post.category_name,
        destination: post.destination,
        liked: false // Add a property to track if the post is liked
      };
    });

    // Set up image slideshow
    posts.value.forEach(post => {
      if (post.imageUrls.length > 1) {
        let currentIndex = 0;
        setInterval(() => {
          currentIndex = (currentIndex + 1) % post.imageUrls.length;
          post.currentImageUrl = post.imageUrls[currentIndex];
        }, 3000);
      }
    });
  } catch (error) {
    console.error('Error fetching posts:', error);
  }
};


const likePost = async (postId) => {
  try {
    const response = await axios.post('http://localhost:3000/api/posts/like', { postId }, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      }
    });
    const post = posts.value.find(p => p.id === postId);
    if (post) {
      post.likes = response.data.likeCount;
      window.location.reload(); // Update the likes count with the response from the server
    }
  } catch (error) {
    console.error('Error liking post:', error);
  }
};

onMounted(() => {
  fetchPosts();
});
</script>