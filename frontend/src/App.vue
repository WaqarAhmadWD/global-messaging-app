<script setup>
import { computed, onMounted } from "vue";
import { useGeneralStore } from "@/stores/general"
import { socket } from "@/socket";
import Auth from "@/layouts/auth.vue";
import App from "@/layouts/app.vue";
const store = useGeneralStore();
import { useApiStore } from "@/stores/apiStore";
const storeApi = useApiStore();
const layout = computed(() => {
  return store.layout === "auth" ? Auth : App;
})
socket.on("message", async () => {
  await fetchData(false, false);
  nextTick(() => scrollToBottom());
});
onMounted(() => {
  const user = JSON.parse(localStorage.getItem("user"));
  socket.emit("joinRoom", user?._id);
});
</script>

<template>
  <component :is="layout" />
</template>
