<template>
  <div>
    <!-- Chat Container -->
    <div ref="chatContainer" class="mt-[6rem]  overflow-y-auto lg:h-[calc(100vh-12rem)] h-[calc(100vh-16rem)]"
      v-if="messageList">
      <div v-for="message in messageList?.data ? messageList.data : []" :key="message._id"
        class="p-4 grid items-center w-full">
        <div v-if="message.receiver === props?.id" class="flex gap-2 items-center justify-self-end">
          <div class="bg-gray-700 px-4 py-2 rounded-full">
            {{ message?.message }}
          </div>
          <img src="/images/profile.svg" alt="" class="w-8 h-8">
        </div>
        <div v-else class="flex gap-2 items-center justify-self-start">
          <img src="/images/profile.svg" alt="" class="w-8 h-8">
          <div class="bg-gray-700 px-4 py-2 rounded-full">
            {{ message?.message }}
          </div>
        </div>
      </div>
    </div>
    <div v-else-if="message?.length < 1" class="w-full flex justify-center items-center text-2xl font-bold h-[50vh]">
      No public contact yet
    </div>
    <div v-else class="w-full animate-pulse grid gap-2 pt-16  p-4 ">
      <div class="lg:h-12 h-8 w-[30%] bg-gray-200 rounded-full dark:bg-gray-700 lg:mb-2  justify-self-start">
      </div>
      <div class="lg:h-12 h-8 w-[40%] bg-gray-200 rounded-full dark:bg-gray-700 lg:mb-2  justify-self-end">
      </div>
      <div class="lg:h-12 h-8 w-1/2 bg-gray-200 rounded-full dark:bg-gray-700 lg:mb-2  justify-self-start">
      </div>
      <div class="lg:h-12 h-8 w-[30%] bg-gray-200 rounded-full dark:bg-gray-700 lg:mb-2  justify-self-end">
      </div>
      <div class="lg:h-12 h-8 w-[80%] bg-gray-200 rounded-full dark:bg-gray-700 lg:mb-2  justify-self-start">
      </div>

      <span class="sr-only">Loading...</span>
    </div>

    <!-- Input Form -->
    <form @submit.prevent="submit"
      class="py-4  lg:px-32 px-2 justify-between -translate-y-16 lg:translate-y-0 fixed bottom-0 form-container">
      <div class="w-full p-2 flex lg:bg-[#63636388] bg-[#474747] rounded-full items-center">
        <input type="text" class="w-full border-none outline-none grow bg-transparent pl-4" v-model="message"
          placeholder="Message Here!">
        <img src="/images/attach.svg" alt="" class="w-6 h-6 mr-2">
        <button class="p-2 rounded-full" :class="[message ? 'bg-[#A052C6]' : 'bg-gray-900']" type="submit">
          <img src="/images/send.svg" alt="" class="md:w-6 md:h-6">
        </button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref, onMounted, nextTick } from 'vue';
import { useApiStore } from '@/stores/apiStore';
import { socket } from "@/socket";
import { useRoute } from "vue-router";

const route = useRoute();
// Reactive state
const messageList = ref(null);
const message = ref(null);
const chatContainer = ref(null);

// Route and store
const store = useApiStore();

// Props
const props = defineProps({
  id: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  }
});

// Fetch data
const fetchData = async (cache = null, refresh = false) => {
  const result = await store.fetchData({ url: `/message/get/${props?.id}`, cache, refresh });
  if (messageList.value?.data?.length === 0) {
    // Scroll to bottom after the first load
    nextTick(() => scrollToBottom());
  }
  messageList.value = result;
};

// Scroll to the bottom
const scrollToBottom = () => {
  if (chatContainer.value) {
    chatContainer.value.scrollTop = chatContainer.value.scrollHeight;
  }
};

// On mounted
onMounted(async () => {
  await fetchData(`message-${props?.id}`, false);
  if (route?.query?.notification > 0)
    await store.fetchData({ url: "/contact/get", cache: "contact", refresh: true });

  nextTick(() => scrollToBottom());
});

// Handle new messages
socket.on("message", async () => {
  console.log("Message received");
  if (fetchData) {
    await fetchData(`message-${props?.id}`, true);
    nextTick(() => scrollToBottom());
  } else {
    console.error("fetchData is undefined");
  }
});

// Handle form submit
const submit = async () => {
  if (message.value && props?.id) {
    await store.fetchData({ url: `/message/send/${props?.id}`, method: "POST", data: { message: message.value } });
    await store.fetchData({ url: "/contact/get", cache: "contact", refresh: true });
    socket.emit("message", { id: props?.id, name: props?.name });
    message.value = '';
    await fetchData(false, false);
    nextTick(() => scrollToBottom());
  }
};
</script>

<style scoped>
.chat-container {
  height: calc(100vh - 16rem);
  overflow-y: auto;
}

.form-container {
  width: 100%;
}

@media screen and (min-width: 1024px) {
  .form-container {
    width: calc(100vw - 40rem);
  }
}
</style>
