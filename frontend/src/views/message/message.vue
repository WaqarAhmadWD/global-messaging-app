<template>
  <div class="">
    <div class="bg-[#A052C6] py-4 px-8 justify-between fixed top-0 md:flex hidden" style="width: calc(100vw - 40rem);">
      <img src="/images/profile.svg" class="w-8 h-8 md:w-16 md:h-16" alt="">
      <div class="flex gap-7 items-center">
        <img src="/images/contact.svg" alt="" class="w-4 h-4 md:w-8 md:h-8">
        <img src="/images/video.svg" alt="" class="w-4 h-4 md:w-8 md:h-8">
        <img src="/images/menu.svg" alt="" class="w-4 h-4 md:w-8 md:h-8">
      </div>
    </div>
    <div class="mt-[6rem] mb-[8rem] lg:mb-[4rem]">
      <div v-for="message in messageList?.data ? messageList.data : []" class="p-4 grid items-center w-full">
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
    <form @submit.prevent="submit"
      class="py-4 lg:px-32 px-2 justify-between -translate-y-16 lg:translate-y-0 fixed bottom-0 form-container">
      <div class="w-full p-2 flex lg:bg-[#63636388] bg-[#474747] rounded-full items-center">
        <input type="text" class="w-full border-none outline-none grow bg-transparent  pl-4" v-model="message"
          placeholder="Message Here!">
        <img src="/images/attach.svg" alt="" class="w-6 h-6 mr-2">
        <button class="p-2  bg-[#A052C6] rounded-full" type="submit">
          <img src="/images/send.svg" alt="" class="md:w-6 md:h-6">
        </button>
      </div>
    </form>

  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';  // For handling route params
import { useApiStore } from '@/stores/apiStore';  // For dispatching actions from the store
import { socket } from "@/socket";

// Set up the reactive data
const messageList = ref(null);
const message = ref(null);
// Access the route params
const route = useRoute();
const store = useApiStore();
const props = defineProps({
  id: {
    type: String,
    required: true
  }
})
const fetchData = async (message = true, loading = true) => {
  const result = await store.fetchData({ url: `/message/get/${props?.id}`, loading, message });
  messageList.value = result;
}
onMounted(async () => {
  await fetchData();
  const user = await JSON.parse(localStorage.getItem("user"));
  socket.emit("joinRoom", user?._id);
})

socket.on("message", () => {
  fetchData(false, false);
});

const submit = async () => {
  if (message.value && props?.id) {
    await store.fetchData({ url: `/message/send/${props?.id}`, method: "POST", data: { message: message.value }, message: false, loading: false });
    socket.emit("message", props?.id);
    message.value = '';
    await fetchData(false, false);
  }
}
</script>

<style scoped>
.form-container {
  width: 100%;
}

@media screen and (min-width: 1024px) {
  .form-container {
    width: calc(100vw - 40rem);
  }
}
</style>
