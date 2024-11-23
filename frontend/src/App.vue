<script setup>
import { computed } from "vue";
import { useGeneralStore } from "@/stores/general"
import Auth from "@/layouts/auth.vue";
import App from "@/layouts/app.vue";
const store = useGeneralStore();

const layout = computed(() => {
  return store.layout === "auth" ? Auth : App;
})
</script>

<template>
  <component :is="layout" />
</template>
