import { ref, computed } from "vue";
import { defineStore } from "pinia";

export const useGeneralStore = defineStore("general", () => {
  const layout = ref(null);

  return { layout };
});
