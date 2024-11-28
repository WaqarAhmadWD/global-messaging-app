<script setup>
import { computed, onMounted } from "vue";
import { useGeneralStore } from "@/stores/general"
import { socket } from "@/socket";
import Auth from "@/layouts/auth.vue";
import App from "@/layouts/app.vue";
import { useApiStore } from "@/stores/apiStore";
const store = useGeneralStore();
const apiStore = useApiStore();

const layout = computed(() => {
  return store.layout === "auth" ? Auth : App;
})
socket.on("message", async (payload) => {
  apiStore.fetchData({ showMe: `${payload.name} messaged you` });
  const contact = await apiStore.fetchData({ url: "/contact/get", cache: "contact", refresh: true })
  if (contact?.data) {
    store.notificationsCounter = contact.data.reduce((OldValue, NewValue) => OldValue + NewValue.notifications, 0);
    store.notificationsList = contact.data.filter((e) => e.notifications > 0);
  }
});
onMounted(async () => {
  const user = JSON.parse(localStorage.getItem("user"));
  socket.emit("joinRoom", { id: user?._id });
  const contact = await apiStore.fetchData({ url: "/contact/get", cache: "contact", refresh: true })
  if (contact?.data) {
    store.notificationsCounter = contact.data.reduce((OldValue, NewValue) => OldValue + NewValue.notifications, 0);
    store.notificationsList = contact.data.filter((e) => e.notifications > 0);
  }
});
</script>

<template>
  <component :is="layout" />
</template>
