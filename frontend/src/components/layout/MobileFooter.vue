<template>
  <div class="bottom-0 w-full lg:hidden fixed text-white p-[1rem] bg-black">
    <div class="w-full h-full flex justify-between md:justify-center md:gap-8 items-center">
      <router-link v-for="item in data" :key="item.id" :to="item.url" class="flex flex-col gap-2 items-center relative"
        :class="{ 'bg-gray-700 p-1 rounded-2xl': currentPath === item.url }">
        <div
          className="w-5 h-5 rounded-full bg-[#A052C6] flex justify-center items-center text-sm absolute -translate-x-6 -translate-y-3"
          v-if="item.id === 0 && store?.notificationsCounter > 0">
          {{ store?.notificationsCounter }}
        </div>
        <img :src="item.img" alt="" class="w-6" />
        <div class="text-[0.75rem]">{{ item.title }}</div>
      </router-link>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useRoute } from "vue-router";
import { useGeneralStore } from "@/stores/general"
const store = useGeneralStore();

// Reactive reference for the current path
const route = useRoute();
const currentPath = computed(() => route.path);

// Footer data
const data = [
  { id: 0, url: "/", img: "/images/all_chats.svg", title: "All Chats" },
  { id: 1, url: "/message-club", img: "/images/grou_chats.svg", title: "Club" },
  { id: 2, url: "/2", img: "/images/stores.svg", title: "Stories" },
  { id: 3, url: "/public", img: "/images/chat_requests.svg", title: "Public Acc" },
  { id: 4, url: "/auth/login", img: "/images/more.svg", title: "More" },
];
</script>

<style scoped>
/* Add any styles here if needed */
</style>
