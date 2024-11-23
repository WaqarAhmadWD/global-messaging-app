<template>
    <div className="bg-black text-white min-h-screen   py-[3rem] lg:py-0">
        <div className="sm:px-8 px-2 pt-8 flex flex-col gap-4 w-full h-full">

            <div className="text-3xl font-bold opacity-75">Personal Accounts</div>
            <div className="flex justify-between items-center">
                <img src="/images/filter.svg" alt="" className="h-8" />
                <img src="/images/search.svg" alt="" className="h-8" />
            </div>
            <PersonalContacts />
        </div>
    </div>
</template>

<script setup>
import PersonalContacts from "@/components/app_component/PersonalContacts.vue";
</script>

<style scoped></style>