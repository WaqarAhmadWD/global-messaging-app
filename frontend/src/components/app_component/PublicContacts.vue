<script setup>
import { ref, onMounted } from "vue";
import NotificationCounter from "@/components/app_component/NotificationCounter.vue";
import { useApiStore } from "@/stores/apiStore"; // Replace with your actual Pinia store

const contact = ref(null); // Reactive state for contact data
const apiStore = useApiStore(); // Access Pinia store

const fetchContacts = async () => {
  try {
    const result = await apiStore.fetchData({ url: "/contact/public-accounts", cache: "publicContact" });
    contact.value = result;
  } catch (error) {
    console.error("Failed to fetch public contacts:", error);
  }
};
const user = ref(null);
onMounted(() => {
  user.value = JSON.parse(localStorage.getItem("user"));
  fetchContacts();
});
</script>

<template>
  <div>
    <div class="bg-[#5F5F5F] h-[1px]"></div>

    <div v-if="contact">
      <router-link v-for="e in contact?.data ? contact.data : []" :key="e._id" :to="`/message/${e?.name}/${e?._id}`"
        class="flex gap-2 justify-between py-4 border-b border-[#5F5F5F] px-4 mb-2 items-center hover:bg-slate-900 cursor-pointer transition-all duration-200"
        v-show="user?._id !== e?._id">
        <div class="flex gap-2 items-center">
          <img src="/images/profile.svg" alt="Profile" class="md:w-16 md:h-16 w-8 h-8" />
          <div class="flex flex-col">
            <h1 class="text-lg font-semibold">{{ e?.name }}</h1>
            <p class="text-sm md:text-md">{{ e?.userId }}</p>
          </div>
        </div>
        <div class="flex gap-4 items-center">
          <NotificationCounter />
          <img src="/images/menu.svg" alt="Menu" class="h-1" />
        </div>
      </router-link>
    </div>
    <div v-else-if="contact?.length < 1" class="w-full flex justify-center items-center text-2xl font-bold h-[50vh]">
      No public contact yet
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
