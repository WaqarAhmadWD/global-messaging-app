<template>
    <div class="fixed bottom-4 w-full  custom_center ">
        <div
            class="w-[90%] mx-auto p-4 rounded-xl h-full flex justify-between  items-center backdrop-blur-sm bg-white/20 ">
            <div class="flex gap-2">
                <img src="/images/O.svg" alt="" class="w-8 h-8">
                <div class="flex flex-col gap-2">
                    <h1 class="lg:text-[1.25rem]">Login or Signup into Ofenup</h1>
                    <p class="xl:max-w-[70%] w-full text-xs lg:text-md">Log in to connect with your loved ones and
                        explore inspiring
                        stories
                        shared
                        by others.</p>
                </div>
            </div>
            <div class="flex md:flex-row flex-col gap-2">
                <RouterLink class="p-2 rounded-lg bg-[#A052C6] hover:bg-[#7a16ac] " to="/auth/login">Log in</RouterLink>
                <RouterLink class="p-2 rounded-lg hover:bg-[#A052C6]" to="/auth/signup">Signup</RouterLink>
            </div>
        </div>
    </div>
</template>

<script setup>
import { RouterLink } from 'vue-router';
</script>

<style lang="scss" scoped></style>