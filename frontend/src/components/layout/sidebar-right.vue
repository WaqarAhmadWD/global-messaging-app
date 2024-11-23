<script setup>
import { ref } from "vue";

const chats = [
  { id: 0, title: "all chats" },
  { id: 1, title: "all chats" },
  { id: 2, title: "all chats" },
  { id: 3, title: "all chats" },
  { id: 4, title: "all chats" },
  { id: 5, title: "all chats" },
];

const notif = [
  {
    id: 1,
    contact: "Sufyan Khan",
    message: "Last message would appear here an...",
  },
  {
    id: 2,
    contact: "Waqar Ahmad",
    message: "Last message would appear here an...",
  },
  {
    id: 3,
    contact: "Fayzan",
    message: "Last message would appear here an...",
  },
  {
    id: 4,
    contact: "Usman",
    message: "Last message would appear here an...",
  },
  { id: 5, contact: "Umar", message: "Last message would appear here an..." },
];
</script>

<template>
  <div class="right-0 lg:w-96 hidden lg:block fixed text-white h-full pr-[2.125rem]">
    <div class="flex flex-col justify-between w-full h-full p-4 gap-y-12 border-l">
      <!-- Profile Images -->
      <div class="w-full flex justify-between pt-4">
        <img src="/images/profile.svg" alt="Profile 1" class="w-12 h-12" />
        <img src="/images/profile.svg" alt="Profile 2" class="w-12 h-12" />
        <img src="/images/profile.svg" alt="Profile 3" class="w-12 h-12" />
        <img src="/images/profile.svg" alt="Profile 4" class="w-12 h-12" />
        <img src="/images/profile.svg" alt="Profile 5" class="w-12 h-12" />
      </div>

      <!-- Placeholder Blocks -->
      <div class="flex flex-col gap-4">
        <div class="w-full bg-purple-400 aspect-[2.2] rounded-xl"></div>
        <div class="w-full bg-purple-400 aspect-[2.2] rounded-xl"></div>
      </div>

      <!-- Notifications -->
      <div class="bg-[#383838] p-4 grow">
        <div class="text-[1.125rem] font-bold">Notifications</div>
        <div v-for="e in notif" :key="e.id"
          class="py-2 flex justify-between hover:bg-gray-700 transition-all duration-100 rounded-xl cursor-pointer items-center">
          <div class="flex gap-2 items-center">
            <img src="/images/notification.svg" alt="Notification Icon" class="w-5" />
            <div>
              <h1 class="font-semibold">{{ e.contact }}</h1>
              <p class="text-sm">{{ e.message }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
