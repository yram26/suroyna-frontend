<template>
  <div class="container mx-auto p-6 mt-16">
    <div class="mt-16"></div>
    <div class="animate-fade-in bg-white shadow-md rounded-lg p-6 mb-6 shadow-black">
      <Profile />
    </div>
    <!-- Profile Information Section -->
    <div class="animate-fade-in bg-white shadow-md rounded-lg p-6 mb-6 shadow-black">
      
      <h2 class="text-2xl font-extrabold mb-8 ">Edit Information</h2>
      <div class="flex items-center mb-4">
        <!-- Profile Photo -->
        <img
          :src="fullProfilePhotoUrl"
          alt="Profile Photo"
          class="h-24 w-24 rounded-full border border-gray-300 mr-4 object-cover"
          @error="setDefaultProfileImage"
        />
        <div class="flex-1">
          <label for="profilePhoto" class="block text-sm font-extrabold text-gray-700">Profile Photo</label>
          <input
            type="file"
            id="profilePhoto"
            @change="handleFileUpload"
            class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-500 focus:border-blue-500 p-2"
          />
        </div>
      </div>
      <form @submit.prevent="updateProfile">
        <div class="mb-4">
          <label for="username" class="block text-sm font-medium text-gray-700">Username</label>
          <input
            v-model="user.username"
            type="text"
            id="username"
            required
            class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-500 focus:border-blue-500 p-2"
          />
        </div>
        <div class="mb-4">
          <label for="email" class="block text-sm font-medium text-gray-700">Email</label>
          <input
            v-model="user.email"
            type="email"
            id="email"
            required
            class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-500 focus:border-blue-500 p-2"
          />
        </div>
        <div class="mb-4">
          <label for="password" class="block text-sm font-medium text-gray-700">Password</label>
          <input
            v-model="user.password"
            type="password"
            id="password"
            placeholder="Leave blank to keep current password"
            class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-500 focus:border-blue-500 p-2"
          />
        </div>
        <button
          type="submit"
          class="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-300"
        >
          Update Profile
        </button>
      </form>
    </div>

    <!-- User Posts Section -->
    <div class="bg-white shadow-md shadow-black rounded-lg p-6 sm:p-8">
      <h2 class="text-2xl font-extrabold mb-6 text-gray-800">Your Posts</h2>

      <!-- Posts Grid -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <div
          v-for="post in userPosts"
          :key="post.post_id"
          class="bg-gray-50 border border-gray-200 rounded-lg overflow-hidden shadow-md shadow-black hover:shadow-lg transition-shadow duration-300"
        >
          <!-- Post Image -->
          <img
            :src="post.currentImageUrl"
            :alt="post.title"
            class="object-cover w-full h-48 rounded-t-lg transition-opacity duration-300 hover:opacity-90"
          />

          <!-- Post Content -->
          <div class="p-4 space-y-6">
            <RouterLink :to="`/posts/${post.post_id}`" class="text-lg font-extrabold  text-slate-700 truncate hover:text-blue-600">
              {{ post.title }}
            </RouterLink>

            <p class="text-sm font-semibold italic text-gray-600 line-clamp-2">{{ post.content }}</p>
          </div>

          <!-- Post Actions -->
          <div class="flex items-center justify-between px-4 py-2 bg-gray-100 border-t border-gray-200">
            <button
              @click="openEditModal(post)"
              class="text-blue-500 text-sm hover:text-blue-700 transition-colors duration-200"
            >
              Edit
            </button>
            <button
              @click="deletePost(post.post_id)"
              class="text-red-500 text-sm hover:text-red-700 transition-colors duration-200"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Edit Post Modal -->
    <div v-if="isEditModalOpen" class="fixed inset-0 flex items-center justify-center z-50">
      <div class="bg-white p-6 rounded-lg shadow-lg">
        <h2 class="text-xl font-semibold mb-4">Edit Post</h2>
        <form @submit.prevent="submitEditPost">
          <div class="mb-4">
            <label for="editTitle" class="block text-sm font-medium text-gray-700">Title</label>
            <input
              v-model="editPostData.title"
              type="text"
              id="editTitle"
              class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-500 focus:border-blue-500 p-2"
              required
            />
          </div>
          <div class="mb-4">
            <label for="editContent" class="block text-sm font-medium text-gray-700">Content</label>
            <textarea
              v-model="editPostData.content"
              id="editContent"
              class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-500 focus:border-blue-500 p-2"
              rows="3"
              required
            ></textarea>
          </div>
          <div class="mb-4">
  <label for="editCategory" class="block text-sm font-medium text-gray-700">Category Name</label>
  <select
    v-model="editPostData.category_name"
    id="editCategory"
    class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-500 focus:border-blue-500 p-2"
    required
  >
    <option value="" disabled>Select a category</option>
    <option value="Cityscape">Cityscape</option>
    <option value="Landscape">Landscape</option>
    <option value="Seascape">Seascape</option>
  </select>
</div>
          <div class="mb-4">
            <label for="editImages" class="block text-sm font-medium text-gray-700">Images</label>
            <input
              type="file"
              id="editImages"
              @change="handleImageUpload"
              multiple
              class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-500 focus:border-blue-500 p-2"
            />
          </div>
          <button
            type="submit"
            class="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-300"
          >
            Save Changes
          </button>
          <button
            type="button"
            @click="closeEditModal"
            class="ml-2 bg-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-400 transition duration-300"
          >
            Cancel
          </button>
        </form>
      </div>
    </div>
  </div>
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
import { ref, onMounted, computed } from 'vue';
import axios from 'axios';
import Swal from 'sweetalert2';
import Profile from '../components/ProfilePhoto.vue';

const user = ref({
  username: '',
  email: '',
  password: '', // Add password field
  profilePhoto: '',
});

const userPosts = ref([]);
const baseUrl = 'http://localhost:3000'; // Base URL for API
const isEditModalOpen = ref(false);
const editPostData = ref({
  title: '',
  content: '',
  category_name: '',
  image_urls: [],
  post_id: null,
});

// Handle file upload for profile photo
const handleFileUpload = (event) => {
  const file = event.target.files[0];
  if (file) {
    user.value.profilePhoto = file; // Store the file for upload
  }
};

// Computed property for profile photo URL
const fullProfilePhotoUrl = computed(() =>
  user.value.profilePhoto ? URL.createObjectURL(user.value.profilePhoto) : `${baseUrl}${user.value.profilePhoto || '/default-profile-image.png'}`
);

// Fetch user profile and posts
onMounted(async () => {
  try {
    const response = await axios.get(`${baseUrl}/api/profile`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });

    user.value = response.data.user; // Populate user data
    userPosts.value = response.data.posts.map((post) => {
      const imageUrls = post.image_url
        ? post.image_url.split(',').map((url) => `${baseUrl}${url.trim()}`)
        : []; // Split and prefix URLs
      return {
        ...post,
        currentImageUrl: imageUrls[0] || '/default-post-image.png', // Default image if none provided
        imageUrls, // Store all image URLs for future use if needed
      };
    });
  } catch (error) {
    console.error('Error fetching user profile:', error);
    Swal.fire('Error', 'Failed to load user profile.', 'error');
  }
});

// Update user profile
const updateProfile = async () => {
  const formData = new FormData();
  if (user.value.username) {
    formData.append('username', user.value.username);
  }
  if (user.value.email) {
    formData.append('email', user.value.email);
  }
  if (user.value.password) {
    formData.append('password', user.value.password); // Append the password if provided
  }
  if (user.value.profilePhoto) {
    formData.append('profilePhoto', user.value.profilePhoto); // Append the file
  }

  try {
    await axios.put(`${baseUrl}/api/profile`, formData, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'multipart/form-data',
      },
    });
    Swal.fire('Success', 'Profile updated successfully!', 'success');
  } catch (error) {
    console.error('Error updating profile:', error);
    Swal.fire('Error', 'Failed to update profile.', 'error');
  }
};

// Open the edit modal and populate the data
const openEditModal = (post) => {
  editPostData.value = {
    title: post.title,
    content: post.content,
    category_name: post.category_name, // Assuming you have this field
    image_urls: post.imageUrls, // Existing image URLs
    post_id: post.post_id,
  };
  isEditModalOpen.value = true;
};

// Close the edit modal
const closeEditModal = () => {
  isEditModalOpen.value = false;
  editPostData.value = {
    title: '',
    content: '',
    category_name: '',
    image_urls: [],
    post_id: null,
  };
};

// Handle image uploads for posts
const handleImageUpload = (event) => {
  const files = Array.from(event.target.files);
  editPostData.value.image_urls = files.map(file => URL.createObjectURL(file)); // Store the image URLs for preview
};

// Submit the edited post
const submitEditPost = async () => {
  try {
    const formData = new FormData();
    formData.append('title', editPostData.value.title);
    formData.append('content', editPostData.value.content);
    formData.append('category_name', editPostData.value.category_name);
    editPostData.value.image_urls.forEach((image) => {
      formData.append('images', image); // Append each image file
    });

    await axios.put(`${baseUrl}/api/posts/${editPostData.value.post_id}`, formData, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'multipart/form-data',
      },
    });

    Swal.fire('Success', 'Post updated successfully!', 'success');
    closeEditModal(); // Close the modal after successful update
    // Optionally, refresh the posts or update the local state
  } catch (error) {
    console.error('Error updating post:', error);
    Swal.fire('Error', 'Failed to update post.', 'error');
  }
};

// Delete post
const deletePost = async (postId) => {
  try {
    const response = await axios.delete(`${baseUrl}/api/posts/${postId}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });

    // Check if the response indicates success
    if (response.data.message === 'Post deleted successfully') {
      userPosts.value = userPosts.value.filter((post) => post.post_id !== postId);
      Swal.fire('Deleted', 'Post deleted successfully!', 'success');
    } else {
      Swal.fire('Error', 'Failed to delete post.', 'error');
    }
  } catch (error) {
    console.error('Error deleting post:', error);
    Swal.fire('Error', error.response?.data?.message || 'Failed to delete post.', 'error');
  }
};
</script>

<style>
/* Add any additional styles here */
body{
  background-color: #f0f0f0;
}
</style>