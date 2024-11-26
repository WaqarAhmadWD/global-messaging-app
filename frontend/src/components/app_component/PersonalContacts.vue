<script setup>
import { ref, onMounted } from "vue";
import NotificationCounter from "@/components/app_component/NotificationCounter.vue";
import { useApiStore } from "@/stores/apiStore"; // Replace with your actual Pinia store
import { socket } from "@/socket";
const contact = ref(null); // Reactive state for contact data
const apiStore = useApiStore(); // Access the store

const fetchContacts = async (cache = null) => {
  try {
    const result = await apiStore.fetchData({ url: "/contact/get", cache });
    contact.value = result.data;
  } catch (error) {
    console.error("Failed to fetch contacts:", error);
  }
};
const user = ref(null);
onMounted(async () => {
  user.value = JSON.parse(localStorage.getItem("user"));

  await fetchContacts("contact");
});
socket.on("message", async () => {
  console.log("Message received");
  await fetchContacts();
});
</script>

<template>
  <div>
    <div class="bg-[#5F5F5F] h-[1px]"></div>
    <div v-if="contact">
      <router-link v-for="e in contact" :key="e.user._id"
        :to="`/message/${e?.user?.name}/${e?.user._id}/?notification=${e?.notification}`"
        class="flex gap-2 justify-between py-4 border-b border-[#5F5F5F] px-4 mb-2 items-center hover:bg-slate-900 cursor-pointer transition-all duration-200"
        v-show="user?._id !== e.user?._id">

        <div class="flex gap-2 items-center">
          <img src="/images/profile.svg" alt="Profile" class="md:w-16 md:h-16 w-8 h-8" />
          <div class="flex flex-col">
            <h1 class="text-lg font-semibold">{{ e.user.name }}
            </h1>
            <p class="text-sm md:text-md">{{ e.message }}</p>
          </div>
        </div>
        <div class="flex gap-4 items-center">
          <NotificationCounter :Notif="e?.notification" />
          <img src="/images/menu.svg" alt="Menu" class="h-1" />
        </div>
      </router-link>
    </div>
    <div v-else-if="contact?.length < 1" class="w-full min-h-[50vh] flex justify-center items-center text-8">
      No contact
    </div>
    <div v-else class="w-full animate-pulse grid gap-2 pt-16  p-4 ">
      <div class="lg:h-24 h-12 w-full bg-gray-200 rounded-xl dark:bg-gray-700 lg:mb-2  justify-self-start">
      </div>
      <div class="lg:h-24 h-12 w-full bg-gray-200 rounded-xl dark:bg-gray-700 lg:mb-2  justify-self-start">
      </div>
      <div class="lg:h-24 h-12 w-full bg-gray-200 rounded-xl dark:bg-gray-700 lg:mb-2  justify-self-start">
      </div>
      <span class="sr-only">Loading...</span>
    </div>
  </div>
</template>
