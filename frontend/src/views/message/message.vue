<template>
  <div v-if="message">
    <!-- Message will be displayed here when fetched -->
    <p>{{ message }}</p>
  </div>
  <div v-else>
    <!-- Loading state -->
    <p>Loading...</p>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';  // For handling route params
import { useApiStore } from '@/stores/apiStore';  // For dispatching actions from the store
// Set up the reactive data
const message = ref(null);

// Access the route params
const route = useRoute();
const store = useApiStore();
const props = defineProps({
  id: {
    type: String,
    required: true
  }
})
onMounted(async () => {
  const messageId = route.pro
  const result = await store.fetchData({ url: `/message/get/${props?.id}` });
  message.value = result;
})

</script>

<style scoped>
/* Add your styles here */
</style>
