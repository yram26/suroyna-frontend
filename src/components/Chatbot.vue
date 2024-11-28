<template>
    <div>
      <!-- Person Icon -->
      <button
        @click="toggleChat"
        class="fixed bottom-5 right-5 w-14 h-14 bg-blue-500 rounded-full flex items-center justify-center shadow-lg hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300"
      >
        <img src="../assets/img/bot.png" alt="Bot Icon" class="w-10 h-10" />
      </button>
  
      <!-- Chat Drawer -->
      <div
        :class="{
          'translate-x-0': isChatVisible,
          'translate-x-full': !isChatVisible,
        }"
        class="z-50 fixed bottom-0 right-0 w-80 h-[80vh] bg-white rounded-t-lg shadow-lg transition-transform duration-300 ease-in-out flex flex-col"
      >
        <div class="flex items-center justify-between bg-blue-500 text-white px-4 py-2 rounded-t-lg">
          <div class="flex items-center">
            <img
              src="../assets/img/bot.png"
              alt="Guide Avatar"
              class="w-10 h-10 rounded-full mr-2"
            />
            <h2 class="text-lg font-semibold">Tour Guide Bot</h2>
          </div>
          <button
            @click="toggleChat"
            class="text-white text-lg font-bold hover:text-gray-200"
          >
            ×
          </button>
        </div>
        <div
          class="flex-grow overflow-y-auto p-4 space-y-3 bg-gray-50"
          ref="messages"
        >
          <div
            v-for="(msg, index) in messages"
            :key="index"
            class="flex"
            :class="{
              'justify-end': msg.isUser,
              'justify-start': !msg.isUser,
            }"
          >
            <div
              :class="{
                'bg-blue-500 text-white': !msg.isUser,
                'bg-gray-300 text-gray-800': msg.isUser,
              }"
              class="max-w-xs px-4 py-2 rounded-lg shadow-md"
            >
              <p>{{ msg.text }}</p>
            </div>
          </div>
        </div>
        <div class="flex items-center px-4 py-2 bg-gray-100">
          <input
            v-model="userInput"
            @keyup.enter="sendMessage"
            placeholder="Type your message..."
            class="flex-grow px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-blue-300"
          />
          <button
            @click="sendMessage"
            class="ml-2 px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted, nextTick } from 'vue';
  
  // Initialize messages as an array
  const messages = ref([]); // Ensure this is an array
  const userInput = ref('');
  const isChatVisible = ref(false); // Initially hidden
  
  const predefinedResponses = {
    hello: "Hi! Welcome to our tour. How can I assist you today?",
    help: "I'd be delighted to help! Are you looking for a specific destination or feature?",
    default: "I'm here to guide you! Could you please clarify?",
  };
  
  const sendMessage = () => {
    if (userInput.value.trim() === '') return;
  
    // Add user message to the messages array
    messages.value.push({ text: userInput.value, isUser: true });
  
    // Generate and add bot response
    const response = getBotResponse(userInput.value);
    messages.value.push({ text: response, isUser: false });
  
    // Clear the input field
    userInput.value = '';
  
    // Scroll to the latest message
    nextTick(() => {
      const messagesContainer = document.querySelector('.overflow-y-auto');
      if (messagesContainer) {
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
      }
    });
  };
  
  const getBotResponse = (input) => {
    const lowerInput = input.toLowerCase();
    return predefinedResponses[lowerInput] || predefinedResponses.default;
  };
  
  const toggleChat = () => {
    isChatVisible.value = !isChatVisible.value;
  };
  
  onMounted(() => {
    // Add an initial greeting message from the bot
    messages.value.push({
      text: "Hello! I'm your tour guide bot. Ask me anything about this site!",
      isUser: false,
    });
  });
  </script>
  
  <style scoped>
  /* Add any additional styles if necessary */
  </style>