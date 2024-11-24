<template>
  <div className="w-5 h-5 rounded-full bg-[#A052C6] flex justify-center items-center text-sm" v-if="props?.Notif">
    {{ props.Notif }}
  </div>
</template>

<script setup>
const props = defineProps({
  Notif: {
    type: Number
  }
})

</script>

<style scoped></style>
