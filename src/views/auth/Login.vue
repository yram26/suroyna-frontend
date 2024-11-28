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
          Login to <span class="font-extrabold">Suroy TA</span>
        </label>
        <form @submit.prevent="handleLogin" class="mt-10">
          <div>
            <label for="username" class="font-semibold text-white">Username</label>
            <input v-model="username" type="text" placeholder="Username"
              class="mt-1 block w-full text-black border-none bg-gray-100 h-11 rounded-xl shadow-lg hover:bg-blue-100 focus:bg-blue-100 focus:ring-0"
              required />
          </div>
          <div class="mt-7">
            <label for="username" class="font-semibold text-white">Password</label>
            <input v-model="password" type="password" placeholder="Password"
              class="mt-1 block w-full text-black border-none bg-gray-100 h-11 rounded-xl shadow-lg hover:bg-blue-100 focus:bg-blue-100 focus:ring-0"
              required />
          </div>
          <div class="mt-7 flex">
            <label for="remember_me" class="inline-flex items-center w-full cursor-pointer">
              <input id="remember_me" type="checkbox"
                class="rounded border-gray-300 text-indigo-600 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                name="remember" />
              <span class="ml-2 text-sm text-gray-100">Remember me</span>
            </label>
            <div class="w-full text-right">
              <a class="underline text-sm text-gray-100 hover:text-gray-900" href="#">
                Forgot Password?
              </a>
            </div>
          </div>
          <div class="mt-7">
            <button type="submit" :disabled="loading"
              class="bg-purple-500 mb-6 w-full py-3 rounded-xl text-white shadow-xl hover:shadow-inner focus:outline-none transition duration-500 ease-in-out transform hover:-translate-x hover:scale-105">
              <span v-if="loading">Loading...</span>
              <span v-else>Login</span>
            </button>
          </div>
          <div>
            <button type="button" @click="closeModal"
              class="text-gray-100 hover:text-gray-800 text-center w-full font-bold">
         
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router'; // Import useRouter
import axiosInstance from '@/axiosInstance'; // Import the Axios instance
import Swal from 'sweetalert2'; // Import SweetAlert2

const props = defineProps(['isOpen', 'closeModal']);
const username = ref('');
const password = ref('');
const loading = ref(false); // Loading state
const router = useRouter(); // Initialize router
const isModalOpen = ref(false);


const closeModal = () => {
  isModalOpen.value = false;
};

const handleLogin = async () => {
  loading.value = true; // Set loading to true
  try {
    const response = await axiosInstance.post('api/auth/login', {
      username: username.value,
      password: password.value,
    });

    console.log('Login successful:', response.data);
    
    // Store user data and token
    const { token, user } = response.data;
    localStorage.setItem('token', token);
    localStorage.setItem('username', user.username);
    localStorage.setItem('profilePhoto', user.profilePhoto || 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRDBwg3rWQL6MFgjCkGVKXHONchGOaaeHuEww&s');
    localStorage.setItem('userType', user.user_type); // Store user type
    localStorage.setItem('userId', user.id); // Correctly store user ID from the user object

    Swal.fire('Success!', 'Login successful!', 'success'); // Show success alert
    // Redirect based on user type
    if (user.user_type === 'Admin') {
      router.push('/dashboard/home'); // Redirect to admin dashboard
    } else {
      window.location.reload();
      router.push('/posts'); // Redirect to regular user home or another route
    }

    closeModal(); // Close the modal after successful login
  } catch (error) {
    console.error('Login failed:', error.response?.data || error.message);
    Swal.fire('Error!', error.response?.data.message || 'Login failed!', 'error'); // Show error alert
  } finally {
    loading.value = false; // Reset loading state
  }
};
</script>


<style scoped>
/* Add any additional styles for the modal here */
</style>