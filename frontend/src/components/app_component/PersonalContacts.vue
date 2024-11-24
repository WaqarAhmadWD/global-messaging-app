<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import NotificationCounter from "@/components/app_component/NotificationCounter.vue";
import { useApiStore } from "@/stores/apiStore"; // Replace with your actual Pinia store
import { socket } from "@/socket";

const contact = ref([]); // Reactive state for contact data
const router = useRouter();
const apiStore = useApiStore(); // Access the store

const fetchContacts = async () => {
  try {
    const result = await apiStore.fetchData({ url: "/contact/get" });
    contact.value = result.data;
  } catch (error) {
    console.error("Failed to fetch contacts:", error);
  }
};
const user = ref(null);
onMounted(async () => {
  user.value = JSON.parse(localStorage.getItem("user"));
  await fetchContacts();
});
socket.on("message", async () => {
  console.log("Message received");
  if (fetchData) {
    await fetchData(false, false);
    nextTick(() => scrollToBottom());
  } else {
    console.error("fetchData is undefined");
  }
});
</script>

<template>
  <div>
    <div class="bg-[#5F5F5F] h-[1px]"></div>
    <div v-if="!contact" class="w-full flex justify-center items-center text-2xl font-bold h-[50vh]">
      No Friends contact yet
    </div>
    <div v-else>
      <router-link v-for="e in contact" :key="e.user._id" :to="`/message/${e.user._id}`"
        class="flex gap-2 justify-between py-4 border-b border-[#5F5F5F] px-4 mb-2 items-center hover:bg-slate-900 cursor-pointer transition-all duration-200">
        <div class="flex gap-2 items-center">
          <img src="/images/profile.svg" alt="Profile" class="md:w-16 md:h-16 w-8 h-8" />
          <div class="flex flex-col">
            <h1 class="text-lg font-semibold">{{ e.user.name }} <span v-if="user?._id === e.user?._id"> (You)</span>
            </h1>
            <p class="text-sm md:text-md">{{ e.message }}</p>
          </div>
        </div>
        <div class="flex gap-4 items-center">
          <NotificationCounter />
          <img src="/images/menu.svg" alt="Menu" class="h-1" />
        </div>
      </router-link>
    </div>
  </div>
</template>
