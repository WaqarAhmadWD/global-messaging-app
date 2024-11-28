import { ref, computed } from "vue";
import { defineStore } from "pinia";

export const useGeneralStore = defineStore("general", () => {
  const layout = ref(null);
  const notificationsCounter = ref(0);
  const notificationsList = ref(null);

  return { layout, notificationsCounter, notificationsList };
});
