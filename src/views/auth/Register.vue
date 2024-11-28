<template>
    <div v-if="isOpen" class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div class="relative sm:max-w-sm w-full">
      <div class="card bg-yellow-600 shadow-lg w-full h-full rounded-3xl absolute transform -rotate-6"></div>
      <div class="card bg-red-600 shadow-lg w-full h-full rounded-3xl absolute transform rotate-6"></div>
      <div class="relative w-full rounded-3xl px-6 py-4 bg-slate-900 shadow-md">
        <div class="flex justify-center">
            <img src="@/assets/img/logo_1.png" alt="Logo" class="w-32 h-auto mx-auto">
          </div>
          <label for="" class="block mt-3 text-lg text-gray-100 text-center font-semibold">
            Register to <span class="font-bold">Suroy TA!</span>
          </label>
          <form @submit.prevent="handleRegister" class="mt-10">
            <div>
              <label for="username" class="font-semibold text-white">Username</label>
              <input
                v-model="username"
                type="text"
                placeholder="Username"
                class="mt-1 text-black block w-full border-none bg-gray-100 h-11 rounded-xl shadow-lg hover:bg-blue-100 focus:bg-blue-100 focus:ring-0"
                required
              />
            </div>
            <div class="mt-7">
              <label for="username" class="font-semibold text-white">Email</label>
              <input
                v-model="email"
                type="email"
                placeholder="Email"
                class="mt-1 text-black block w-full border-none bg-gray-100 h-11 rounded-xl shadow-lg hover:bg-blue-100 focus:bg-blue-100 focus:ring-0"
                required
              />
            </div>
            <div class="mt-7">
              <label for="username" class="font-semibold text-white">Password</label>
              <input
                v-model="password"
                type="password"
                placeholder="Password"
                class="mt-1 text-black block w-full border-none bg-gray-100 h-11 rounded-xl shadow-lg hover:bg-blue-100 focus:bg-blue-100 focus:ring-0"
                required
              />
            </div>
            <div class="mt-7">
              <button
                type="submit"
                :disabled="loading"
                class="bg-blue-500 w-full py-3 rounded-xl text-white shadow-xl hover:shadow-inner focus:outline-none transition duration-500 ease-in-out transform hover:-translate-x hover:scale-105"
              >
                <span v-if="loading">Loading...</span>
                <span v-else>Register</span>
              </button>
            </div>
            <div class="mt-7">
              <div>
                <button
                  type="button"
                  @click="closeModal"
                  class="text-gray-100 hover:text-gray-800 text-center w-full font-bold"
                >
                  Cancel
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import axiosInstance from '@/axiosInstance'; // Import the Axios instance
  import Swal from 'sweetalert2'; // Import SweetAlert2
  
  const props = defineProps(['isOpen', 'closeModal']);
  const username = ref('');
  const email = ref('');
  const password = ref('');
  const loading = ref(false); // Loading state
  
  const handleRegister = async () => {
    loading.value = true; // Set loading to true
    try {
      const response = await axiosInstance.post('api/auth/register', {
        username: username.value,
        email: email.value,
        password: password.value,
        profilePhoto: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRDBwg3rWQL6MFgjCkGVKXHONchGOaaeHuEww&s', // Optional: Add a default profile photo URL
      });
      console.log('Registration successful:', response.data);
      Swal.fire('Success!', 'Registration successful!', 'success'); // Show success alert
      closeModal(); // Close the modal after successful registration
    } catch (error) {
      console.error('Registration failed:', error.response.data);
      Swal.fire('Error!', error.response.data.message || 'Registration failed!', 'error'); // Show error alert
    } finally {
      loading.value = false; // Reset loading state
    }
  };
  </script>
  
  <style scoped>
  /* Add any additional styles for the modal here */
  </style>