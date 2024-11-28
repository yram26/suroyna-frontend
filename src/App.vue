<script setup>
import { ref, computed } from 'vue';
import { useRoute } from 'vue-router';
import Chatbot from '@/components/Chatbot.vue';
import Navbar from '@/components/Navbar.vue';
import CreatePosts from '@/components/CreatePosts.vue';

// Get the current route
const route = useRoute();

// Computed property to determine if the Navbar should be shown
const showNavbar = computed(() => {
  // Hide Navbar if the route is '/dashboard'
  return !route.path.startsWith('/dashboard');
});

// Computed property to determine if CreatePosts should be shown
const showCreatePosts = computed(() => {
  const isLoggedIn = !!localStorage.getItem('token'); // Check if the user is logged in
  // Show CreatePosts if the user is logged in and not on the dashboard
  return isLoggedIn && !route.path.startsWith('/dashboard');
});
</script>

<template>
  <div>
    <!-- Conditionally render the Navbar and CreatePosts components -->
    <Navbar v-if="showNavbar" />
    <CreatePosts v-if="showCreatePosts" />

    <!-- Router View to display child routes -->
     
    <RouterView />
  </div>
</template>

<style>
.animate-fade-in {
  animation: fadeIn 1.5s ease-in-out;
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
}</style>