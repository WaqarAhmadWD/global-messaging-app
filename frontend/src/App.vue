<script setup>
import { computed, onMounted } from "vue";
import { useGeneralStore } from "@/stores/general"
import { socket } from "@/socket";
import Auth from "@/layouts/auth.vue";
import App from "@/layouts/app.vue";
const store = useGeneralStore();
import { useApiStore } from "@/stores/apiStore";
const apiStore = useApiStore();

const layout = computed(() => {
  return store.layout === "auth" ? Auth : App;
})
socket.on("message", async (payload) => {
  apiStore.fetchData({ url: "/contact/get", cache: "contact", refresh: true })
  apiStore.fetchData({ showMe: `${payload.name} messaged you` });
});
onMounted(() => {
  const user = JSON.parse(localStorage.getItem("user"));
  socket.emit("joinRoom", { id: user?._id });
});
</script>

<template>
  <component :is="layout" />
</template>
