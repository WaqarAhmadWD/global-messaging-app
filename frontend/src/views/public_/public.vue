<template>
  <div class="bg-black text-white min-h-screen py-[3rem] lg:py-0">
    <div class="sm:px-8 px-2 pt-8 flex flex-col gap-4 w-full h-full">


      <!-- Section title -->
      <div class="text-3xl font-bold opacity-75">Public Accounts</div>

      <!-- Filter and Search icons -->
      <div class="flex justify-between items-center">
        <img src="/images/filter.svg" alt="Filter Icon" class="h-8" />
        <img src="/images/search.svg" alt="Search Icon" class="h-8" />
      </div>

      <!-- PublicContacts component -->
      <PublicContacts />
    </div>
  </div>
</template>

<script setup>
import PublicContacts from '@/components/app_component/PublicContacts.vue';  // Import the PublicContacts component
</script>

<style scoped>
/* Add any styles here if needed */
</style>
