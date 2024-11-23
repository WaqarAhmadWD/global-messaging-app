<template>
    <div class="relative w-full h-full">
        <MobileHeader />
        <SidebarRight />
        <MobileFooter />
        <Sidebar />
        <div class="custom_center">
            <RouterView />
        </div>
    </div>
</template>

<script setup>
import { RouterView } from 'vue-router';
import MobileFooter from "@/components/layout/MobileFooter.vue";
import MobileHeader from "@/components/layout/MobileHeader.vue";
import SidebarRight from "@/components/layout/sidebar-right.vue";
import Sidebar from "@/components/layout/sidebar.vue";
</script>
<style></style>