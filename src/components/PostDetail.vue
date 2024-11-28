<template>
  <section class="animate-fade-in mt-20 min-h-screen p-8 bg-white shadow-md shadow-black rounded-lg p-6">
    <div class="max-w-4xl mx-auto">
      <h1 class="font-extrabold text-4xl mb-4">{{ post.title }}</h1>
      <div class="flex items-center mb-4">
        <img :src="post.authorImage" class="w-12 h-12 rounded-full mr-3" alt="Author" />
        <div>
          <p class="text-gray-700 font-semibold">{{ post.author }}</p>
          <p class="text-gray-500 text-sm">{{ post.date }}</p>
        </div>
      </div>

      <!-- Image Carousel -->
      <div class="relative w-full h-auto max-h-96 mb-4">
        <img :src="post.currentImageUrl" class="w-full h-auto max-h-96 object-cover rounded-lg" alt="Post Image" />
        <button v-if="post.imageUrls.length > 1" @click="prevImage" class="absolute top-1/2 left-0 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full">&lt;</button>
        <button v-if="post.imageUrls.length > 1" @click="nextImage" class="absolute top-1/2 right-0 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full">&gt;</button>
      </div>

      <p class="text-gray-700 mb-4">{{ post.content }}</p>
      <div class="flex justify-between items-center mt-4">
        <button @click="likePost(post.id)"
                class="bg-red-500 text-white py-1 px-3 rounded hover:bg-blue-600 transition duration-300">
          <i class="fas" :class="post.liked ? 'fa-solid fa-heart' : 'fa-regular fa-heart'"></i>
          {{ post.liked ? 'Unlike' : 'Like' }} <span class="ml-1">{{ post.likeCount }}</span>
        </button>
        <span class="text-gray-600">Views: {{ post.views }}</span>
      </div>

      <div class="mt-8">
        <h2 class="font-bold text-2xl mb-4">Comments</h2>
        <div v-for="comment in comments" :key="comment.commentId" class="flex items-start border-b pb-4 mb-6">
          <img :src="comment.profilePhoto || 'default-profile-photo.jpg'" alt="User Profile" class="w-10 h-10 rounded-full mr-4" />
          <div class="flex-grow">
            <div class="flex items-center justify-between">
              <p class="font-semibold">{{ comment.username }}</p>
              <p class="text-sm text-gray-500 ml-2">{{ new Date(comment.dateCreated).toLocaleDateString() }}</p>
            </div>
            <p v-if="!editMode[comment.commentId]" class="text-gray-600 mt-2">{{ comment.content }}</p>
            <div v-else class="mt-2">
              <textarea v-model="editedComment" rows="2" class="w-full border rounded p-2"></textarea>
              <div class="mt-2 space-x-6">
                <button @click="updateComment(comment.commentId)" class="bg-blue-500 text-white px-4 py-1 rounded">Save</button>
                <button @click="cancelEdit(comment.commentId)" class="bg-gray-300 text-black px-4 py-1 rounded">Cancel</button>
              </div>
            </div>
            <div v-if="isLoggedIn" class="flex mt-2 space-x-6">
              <button @click="enableEdit(comment.commentId, comment.content)" class="text-blue-500 hover:underline"><i class="fa-solid fa-pen-to-square"></i></button>
              <button @click="deleteComment(comment.commentId)" class="text-red-500 hover:underline"><i class="fa-solid fa-trash"></i></button>
            </div>
          </div>
        </div>

        <!-- Add Comment Form -->
        <form @submit.prevent="addComment" class="mt-4">
          <textarea v-model="newComment" placeholder="Add a comment..." class="w-full p-2 border rounded" required></textarea>
          <button type="submit" class="bg-blue-500 text-white py-2 px-4 rounded mt-2 hover:bg-blue-600 transition duration-300">Submit</button>
        </form>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import axios from 'axios';
import Swal from 'sweetalert2'; // Ensure SweetAlert2 is installed

const route = useRoute();
const post = ref({
  id: null,
  title: '',
  content: '',
  imageUrls: [],
  currentImageUrl: '',
  author: '',
  authorImage: '',
  date: '',
  likes: 0,
  views: 0,
  likeCount: 0, // Initialize likeCount
  liked: false, // Track if the post is liked
});
const comments = ref([]);
const newComment = ref('');
const editMode = ref({});
const editedComment = ref('');
const isLoggedIn = ref(false); // Assuming false by default

const fetchPost = async () => {
  const postId = route.params.id;
  try {
    const response = await axios.get(`http://localhost:3000/api/posts/${postId}`, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      }
    });
    isLoggedIn.value = true; // Set logged in status
    const imageUrls = response.data.image_url.split(',').map(url => `http://localhost:3000${url.trim()}`);
    
    // Check if author_image is defined and use a fallback if not
    const authorImage = response.data.author_image 
      ? `http://localhost:3000${response.data.author_image.trim()}`
      : 'https://example.com/default-profile-photo.jpg'; // Use a default image URL

    post.value = {
      id: response.data.post_id,
      title: response.data.title,
      content: response.data.content,
      imageUrls,
      currentImageUrl: imageUrls[0] || '',
      author: response.data.author,
      authorImage, // Use the actual author's image or fallback
      date: new Date(response.data.created_at).toLocaleDateString(),
      likes: response.data.likes || 0,
      views: response.data.views || 0,
      likeCount: response.data.likeCount || 0, // Set likeCount from response
      liked: false, // Initialize liked state
    };
    await fetchComments(postId);
  } catch (error) {
    console.error('Error fetching post:', error);
    Swal.fire('Error', 'Failed to fetch post details.', 'error');
  }
};

const fetchComments = async (postId) => {
  try {
    const response = await axios.get(`http://localhost:3000/posts/${postId}/comments`, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      }
    });
    isLoggedIn.value = true; // Set logged in status
    comments.value = response.data.map(comment => {
      const profilePhoto = comment.profilePhoto 
        ? `http://localhost:3000${comment.profilePhoto.trim()}`
        : 'https://example.com/default-profile-photo.jpg'; // Use a default image URL

      return {
        ...comment,
        profilePhoto, // Use the actual profile photo or fallback
      };
    });
  } catch (error) {
    console.error('Error fetching comments:', error);
    Swal.fire('Error', 'Failed to fetch comments.', 'error');
  }
};

const likePost = async (postId) => {
  try {
    const response = await axios.post('http://localhost:3000/api/posts/like', { postId }, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      }
    });
    post.value.likeCount = response.data.likeCount; // Update the likeCount with the response from the server
    post.value.liked = !post.value.liked; // Toggle the liked state
  } catch (error) {
    console.error('Error toggling like:', error);
    Swal.fire('Error', 'Failed to toggle like.', 'error');
  }
};

const addComment = async () => {
  if (newComment.value.trim()) {
    const postId = post.value?.id; // Safely access post ID

    if (!postId) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Post ID is missing.',
      });
      return;
    }

    try {
      const response = await axios.post(
        `http://localhost:3000/posts/${postId}/comments`,
        { content: newComment.value },
        {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );

      if (response.status === 201) {
        comments.value.push({
          commentId: response.data.commentId,
          postId,
          userId: response.data.userId,
          content: response.data.content,
          dateCreated: new Date().toISOString(), // Set the current date
          username: 'Your Username', // Replace with actual username if available
          profilePhoto: 'default-profile-photo.jpg', // Replace with actual profile photo if available
        });
        newComment.value = ''; // Clear the input field
        Swal.fire({
          icon: 'success',
          title: 'Comment Added',
          text: 'Your comment was successfully added!',
        });
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Failed to Add Comment',
          text: 'An unexpected error occurred. Please try again.',
        });
      }
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: error.response?.data?.error || 'An unexpected error occurred. Please try again.',
      });
    }
  } else {
    Swal.fire({
      icon: 'warning',
      title: 'Empty Comment',
      text: 'Please enter a comment before submitting.',
    });
  }
};

// Enable edit mode for a specific comment
const enableEdit = (commentId, content) => {
  editMode.value[commentId] = true;
  editedComment.value = content;
};

// Cancel editing
const cancelEdit = (commentId) => {
  editMode.value[commentId] = false;
  editedComment.value = '';
};

// Update a comment
const updateComment = async (commentId) => {
  try {
    await axios.put(
      `http://localhost:3000/comments/${commentId}`,
      { content: editedComment.value },
      { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
    );

    const comment = comments.value.find((c) => c.commentId === commentId);
    if (comment) {
      comment.content = editedComment.value;
    }

    cancelEdit(commentId);
    Swal.fire('Success', 'Comment updated successfully!', 'success');
  } catch (error) {
    console.error('Error updating comment:', error.response ? error.response.data : error.message);
    Swal.fire('Error', 'Not authorized to edit this comment', 'error');
  }
};

// Delete a comment
const deleteComment = async (commentId) => {
  try {
    await axios.delete(`http://localhost:3000/comments/${commentId}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    });

    comments.value = comments.value.filter((c) => c.commentId !== commentId);
    Swal.fire('Success', 'Comment deleted successfully!', 'success');
  } catch (error) {
    console.error('Error deleting comment:', error.response ? error.response.data : error.message);
    Swal.fire('Error', 'Not authorized to delete this comment.', 'error');
  }
};

const prevImage = () => {
  const currentIndex = post.value.imageUrls.indexOf(post.value.currentImageUrl);
  const prevIndex = (currentIndex - 1 + post.value.imageUrls.length) % post.value.imageUrls.length;
  post.value.currentImageUrl = post.value.imageUrls[prevIndex];
};

const nextImage = () => {
  const currentIndex = post.value.imageUrls.indexOf(post.value.currentImageUrl);
  const nextIndex = (currentIndex + 1) % post.value.imageUrls.length;
  post.value.currentImageUrl = post.value.imageUrls[nextIndex];
};

onMounted(() => {
  fetchPost();
});
</script>