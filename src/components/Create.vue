<template>
  <div class="min-h-screen bg-slate-900 py-8 px-4 sm:px-6 lg:px-8 mt-16">
    <div class="max-w-2xl mx-auto bg-white rounded-xl shadow-lg shadow-black p-6 sm:p-8">
      <h2 class="text-3xl font-bold text-gray-900 border-b border-gray-200 pb-4 mb-6">
        Create a New Post
      </h2>

      <form @submit.prevent="submitPost" class="space-y-6">
        <!-- Title Input -->
        <div>
          <label for="title" class="block text-sm font-medium text-gray-700 mb-1">
            Title
          </label>
          <input 
            v-model="title" 
            type="text" 
            id="title" 
            required 
            placeholder="Enter post title"
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
          />
        </div>

        <!-- Content Input -->
        <div>
          <label for="content" class="block text-sm font-medium text-gray-700 mb-1">
            Content
          </label>
          <textarea 
            v-model="content" 
            id="content" 
            rows="6" 
            required 
            placeholder="Write your post content here..."
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors resize-none"
          ></textarea>
        </div>

        <!-- Category Select -->
        <div>
          <label for="category" class="block text-sm font-medium text-gray-700 mb-1">
            Category
          </label>
          <select 
            v-model="category_name" 
            id="category" 
            required
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors bg-white"
          >
            <option value="" disabled selected>Select a category</option>
            <option 
              v-for="category in categories" 
              :key="category.category_id" 
              :value="category.name"
            >
              {{ category.name }}
            </option>
          </select>
        </div>

        <!-- Destination Input -->
        <div>
  <label for="destination" class="block text-sm font-medium text-gray-700 mb-1">
    Destination
  </label>
  <select 
    v-model="destination" 
    id="destination" 
    required 
    class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
  >
    <option disabled value="">Select your destination</option>
    <optgroup label="Highly Urbanized City">
      <option value="Cebu City">Cebu City</option>
    </optgroup>
    <optgroup label="Independent Component City">
      <option value="Lapu-Lapu City">Lapu-Lapu City</option>
    </optgroup>
    <optgroup label="Component Cities">
      <option value="Carcar City">Carcar City</option>
      <option value="Danao City">Danao City</option>
      <option value="Naga City">Naga City</option>
      <option value="Talisay City">Talisay City</option>
      <option value="Toledo City">Toledo City</option>
    </optgroup>
    <optgroup label="Municipalities">
      <option value="Alcantara">Alcantara</option>
      <option value="Alcoy">Alcoy</option>
      <option value="Alegria">Alegria</option>
      <option value="Aloguinsan">Aloguinsan</option>
      <option value="Argao">Argao</option>
      <option value="Asturias">Asturias</option>
      <option value="Badian">Badian</option>
      <option value="Balamban">Balamban</option>
      <option value="Bantayan">Bantayan</option>
      <option value="Barili">Barili</option>
      <option value="Boljoon">Boljoon</option>
      <option value="Borbon">Borbon</option>
      <option value="Catmon">Catmon</option>
      <option value="Compostela">Compostela</option>
      <option value="Consolacion">Consolacion</option>
      <option value="Cordova">Cordova</option>
      <option value="Daanbantayan">Daanbantayan</option>
      <option value="Dalaguete">Dalaguete</option>
      <option value="Ginatilan">Ginatilan</option>
      <option value="Liloan">Liloan</option>
      <option value="Madridejos">Madridejos</option>
      <option value="Malabuyoc">Malabuyoc</option>
      <option value="Medellin">Medellin</option>
      <option value="Minglanilla">Minglanilla</option>
      <option value="Moalboal">Moalboal</option>
      <option value="Oslob">Oslob</option>
      <option value="Pilar">Pilar</option>
      <option value="Pinamungajan">Pinamungajan</option>
      <option value="Poro">Poro</option>
      <option value="Ronda">Ronda</option>
      <option value="Samboan">Samboan</option>
      <option value="San Fernando">San Fernando</option>
      <option value="San Francisco">San Francisco</option>
      <option value="San Remigio">San Remigio</option>
      <option value="Santa Fe">Santa Fe</option>
      <option value="Santander">Santander</option>
      <option value="Sibonga">Sibonga</option>
      <option value="Sogod">Sogod</option>
      <option value="Tabogon">Tabogon</option>
      <option value="Tabuelan">Tabuelan</option>
      <option value="Tuburan">Tuburan</option>
      <option value="Tudela">Tudela</option>
    </optgroup>
    <optgroup label="Islands">
      <option value="Bantayan Island">Bantayan Island</option>
      <option value="Camotes Islands">Camotes Islands</option>
      <option value="Malapascua Island">Malapascua Island</option>
    </optgroup>
  </select>
</div>
        <!-- Image Upload -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">
            Images (up to 5)
          </label>
          <div class="mt-1 flex items-center space-x-4">
            <input 
              type="file" 
              @change="handleFileUpload" 
              id="image" 
              accept="image/*"
              multiple
              ref="fileInput"
              class="hidden"
            />
            <button 
              type="button" 
              @click="$refs.fileInput.click()"
              class="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors duration-200 flex items-center space-x-2"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <span>Choose Files</span>
            </button>
          </div>
          
          <!-- Image Previews -->
          <div v-if="imagePreviews.length" class="mt-4 grid grid-cols-2 gap-4">
            <div
              v-for="(preview, index) in imagePreviews"
              :key="index"
              class="relative group"
            >
              <img 
                :src="preview" 
                alt="Preview" 
                class="w-full h-32 object-cover rounded-lg shadow"
              />
              <button
                type="button"
                @click="removeImage(index)"
                class="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
              >
                &times;
              </button>
            </div>
          </div>
        </div>

        <!-- Form Actions -->
        <div class="flex justify-end space-x-4 pt-6 border-t border-gray-200">
          <button
            type="submit"
            class="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Create Post
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import Swal from 'sweetalert2';
import axiosInstance from '@/axiosInstance';

const title = ref('');
const content = ref('');
const category_name = ref('');
const destination = ref('');
const images = ref([]);
const imagePreviews = ref([]);
const categories = ref([]);

const handleFileUpload = (event) => {
  const files = Array.from(event.target.files);
  if (images.value.length + files.length > 5) {
    Swal.fire({
      icon: 'error',
      title: 'Error!',
      text: 'You can upload a maximum of 5 images.',
    });
    return;
  }

  files.forEach((file) => {
    images.value.push(file);

    const reader = new FileReader();
    reader.onload = (e) => {
      imagePreviews.value.push(e.target.result);
    };
    reader.readAsDataURL(file);
  });
};

const removeImage = (index) => {
  images.value.splice(index, 1);
  imagePreviews.value.splice(index, 1);
};

const submitPost = async () => {
  try {
    const formData = new FormData();
    formData.append('title', title.value);
    formData.append('content', content.value);
    formData.append('category_name', category_name.value);
    formData.append('destination', destination.value);
    images.value.forEach((image, index) => {
      formData.append('images', image);
    });

    const response = await axiosInstance.post('/api/posts', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      },
    });

    Swal.fire({
      icon: 'success',
      title: 'Success!',
      text: 'Post created successfully',
      timer: 1500,
      showConfirmButton: false
    });

    // Reset form
    title.value = '';
    content.value = '';
    category_name.value = '';
    destination.value = '';
    images.value = [];
    imagePreviews.value = [];
  } catch (error) {
    console.error('Error creating post:', error);
    Swal.fire({
      icon: 'error',
      title: 'Error!',
      text: error.response?.data?.message || 'Network error. Please try again.',
    });
  }
};

onMounted(async () => {
  try {
    const response = await axiosInstance.get('/api/categories');
    categories.value = response.data;
  } catch (error) {
    console.error('Error fetching categories:', error);
    Swal.fire({
      icon: 'error',
      title: 'Error!',
      text: 'Failed to load categories',
    });
  }
});
</script>