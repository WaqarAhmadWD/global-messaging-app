<script setup>
import { ref, computed } from "vue";
import { RouterLink, useRoute, useRouter } from "vue-router";
import NotificationCounter from "@/components/app_component/NotificationCounter.vue";

// Get current route path
const route = useRoute();
const pathname = computed(() => route.path);

const chats = [
  { id: 0, url: "/", img: "/images/all_chats.svg", title: "All Chats" },
  { id: 1, url: "/1", img: "/images/grou_chats.svg", title: "Group Chats" },
  { id: 2, url: "/2", img: "/images/stores.svg", title: "Stories" },
  { id: 3, url: "/Public", img: "/images/chat_requests.svg", title: "Public" },
  { id: 4, url: "/3", img: "/images/archive.svg", title: "Archive" },
  { id: 5, url: "/4", img: "/images/globe.svg", title: "Public Club" },
];
</script>

<template>
  <div class="left-0 top-0 h-full lg:w-64 hidden lg:block fixed border-r text-white bg-black">
    <div class="flex flex-col justify-between w-full h-full p-4 gap-y-6">
      <!-- Logo -->
      <div class="w-full flex justify-center pt-2">
        <img src="/images/dark-logo.svg" alt="Logo" class="w-fit" />
      </div>

      <!-- Chats -->
      <div class="grow">
        <RouterLink v-for="e in chats" :key="e.id"
          class="m-2 px-4 py-2 flex justify-between hover:bg-gray-700 transition-all duration-100 rounded-xl cursor-pointer items-center"
          :to="e.url" :class="{ 'bg-gray-700': pathname === e.url }">
          <div class="flex gap-2 items-center w-full">
            <img :src="e.img" alt="" class="w-4" />
            <div>{{ e.title }}</div>
          </div>
          <NotificationCounter />
        </RouterLink>
      </div>

      <!-- Settings and Logout -->
      <div>
        <div
          class="m-2 px-4 py-2 flex justify-between hover:bg-gray-700 transition-all duration-100 rounded-xl cursor-pointer items-center">
          <div class="flex gap-2 items-center">
            <img src="/images/setting.svg" alt="Settings Icon" class="w-4" />
            <div>Settings</div>
          </div>
        </div>
        <router-link to="/auth/login"
          class="m-2 px-4 py-2 flex justify-between hover:bg-gray-700 transition-all duration-100 rounded-xl cursor-pointer items-center">
          <div class="flex gap-2 items-center">
            <img src="/images/logout-door.svg" alt="Logout Icon" />
            <div>Login</div>
          </div>
        </router-link>
      </div>
    </div>
  </div>
</template>
