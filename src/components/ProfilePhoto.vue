<template>
    <div class="bg-gray-600 p-4 rounded-lg">
      <h2 class="text-2xl font-extrabold text-slate-100 mb-8">Profile Information</h2>
      <div v-if="userProfile" class="flex items-center mb-4">
        <!-- Profile Photo -->
        <img
          :src="fullProfilePhotoUrl"
          alt="Profile Photo"
          class="h-40 w-40 rounded-full border border-4 border-gray-100 mr-4 object-cover"
          @error="setDefaultProfileImage"
        />
        <div class="flex-1 space-y-2">
          <p class="text-gray-100 font-semibold">Username : <span class="font-light">{{ userProfile.username }}</span></p>
          <p class="text-gray-100 font-semibold">Email : <span class="font-light">{{ userProfile.email }}</span></p>
        </div>
      </div>
      <div v-else>
        <p>Loading profile...</p>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted, computed } from 'vue';
  import axios from 'axios';
  
  const userProfile = ref(null);
  const baseUrl = 'http://localhost:3000'; // Base URL for API
  
  // Computed property for profile photo URL
  const fullProfilePhotoUrl = computed(() => {
    return userProfile.value && userProfile.value.profile_photo
      ? `${baseUrl}${userProfile.value.profile_photo}`
      : 'https://example.com/default-profile-photo.jpg'; // Default profile photo
  });
  
  // Fetch user profile on component mount
  onMounted(async () => {
    try {
      const response = await axios.get(`${baseUrl}/api/profile/myprofile`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
  
      userProfile.value = response.data.user; // Populate user profile data
    } catch (error) {
      console.error('Error fetching user profile:', error);
    }
  });
  
  // Fallback for profile image error
  const setDefaultProfileImage = (event) => {
    event.target.src = 'https://example.com/default-profile-photo.jpg'; // Default image URL
  };
  </script>
  
  <style scoped>
  /* Add any additional styles here */
  </style>