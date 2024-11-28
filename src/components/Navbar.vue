<template>

  <header class="fixed top-0 left-0 w-full z-50 bg-white text-gray-800 shadow-md">
    <div class="container mx-auto px-4 py-3">
      <div class="flex justify-between items-center">
        <!-- Logo and Brand -->
        <div class="flex items-center space-x-2">
          <img src="@/assets/img/logo_1.png" alt="Logo" class="h-12 w-auto">
          <RouterLink to="/" class="text-2xl font-bold text-yellow-900">SUROY-TA</RouterLink>
        </div>

        <!-- Main Navigation -->
        <nav class="hidden md:flex space-x-8">
          <a href="#home" @click.prevent="scrollToSection('#home')"
            class="text-lg text-gray-700 hover:text-blue-600  font-bold transition duration-300">
            Home
          </a>
          <a href="#about" @click.prevent="scrollToSection('#about')"
            class="text-lg text-gray-700 hover:text-blue-600  font-bold transition duration-300">
            About
          </a>
          <a href="#contact" @click.prevent="scrollToSection('#contact')"
            class="text-lg text-gray-700 hover:text-blue-600  font-bold transition duration-300">
            Contact
          </a>
        </nav>

        <!-- Auth Buttons -->
        <div class="flex items-center space-x-4">
          <button v-if="!isLoggedIn" @click="openLoginModal"
            class="px-6 py-2 text-blue-600 font-medium hover:text-blue-700 transition duration-300">
            Login
          </button>
          <button v-if="!isLoggedIn" @click="openRegisterModal"
            class="px-6 py-2 bg-blue-600 text-white font-medium rounded hover:bg-blue-700 transition duration-300">
            Get Started
          </button>
          <div v-if="isLoggedIn" class="flex items-center space-x-4">
            <img :src="profilePhoto" alt="Profile" class="h-10 w-10 rounded-full object-cover border-2 border-blue-600">
            <button @click="logout"
              class="flex items-center px-2 p-2 shadow-md shadow-black bg-red-600 text-white font-medium rounded hover:bg-red-700 transition duration-300">
              Logout <span class="ml-2 text-lg material-symbols-outlined">
                logout
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Login Modal-->
    <LoginModal :isOpen="isLoginModalOpen" :closeModal="closeLoginModal" />
    <!-- Register Modal -->
    <RegisterModal :isOpen="isRegisterModalOpen" :closeModal="closeRegisterModal" />

    <CreatePosts />
  </header>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import LoginModal from '../views/auth/Login.vue';
import RegisterModal from '../views/auth/Register.vue';
import CreatePosts from './CreatePosts.vue';

const isLoginModalOpen = ref(false);
const isRegisterModalOpen = ref(false);

// Reactive state for user profile
const username = ref('');
const profilePhoto = ref(''); // Reactive state for profile photo
const isLoggedIn = computed(() => !!localStorage.getItem('token')); // Check if user is logged in

function scrollToSection(sectionId) {
  const section = document.getElementById(sectionId.slice(1));
  if (section) {
    window.scrollTo({
      top: section.offsetTop,
      behavior: 'smooth',
    });
  }
}
// Set initial state on mounted
onMounted(() => {
  username.value = localStorage.getItem('username') || ''; // Get username from localStorage
  const storedPhoto = localStorage.getItem('profilePhoto');
  profilePhoto.value = storedPhoto ? `http://localhost:3000${storedPhoto}` : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRDBwg3rWQL6MFgjCkGVKXHONchGOaaeHuEww&s'; // Construct full URL
  console.log('Profile Photo URL:', profilePhoto.value);
});

const openLoginModal = () => {
  isLoginModalOpen.value = true;
};

const closeLoginModal = () => {
  isLoginModalOpen.value = false;
};

const openRegisterModal = () => {
  isRegisterModalOpen.value = true;
};

const closeRegisterModal = () => {
  isRegisterModalOpen.value = false;
};

// Logout function
const logout = () => {
  localStorage.removeItem('token'); // Clear token
  localStorage.removeItem('username'); // Clear username
  localStorage.removeItem('profilePhoto'); // Clear profile photo
  username.value = ''; // Reset username
  profilePhoto.value = ''; // Reset profile photo
  window.location.href = '/'; // Redirect to home and reload
};


</script>

<style scoped>
/* Add any additional styles for the navbar here */
</style>