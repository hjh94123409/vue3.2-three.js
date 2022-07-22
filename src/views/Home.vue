<template>
  <suspense>
        <template #fallback>
            <Loading />
        </template>
        <template #default>
            <HomeSuspence />
        </template>
    </suspense>
</template>

<script setup>
import { defineAsyncComponent } from "vue";
import Loading from "@/components/Loading.vue";
const HomeSuspence = defineAsyncComponent(() => import("@/components/HomeSuspence.vue"));
</script>

<style lang="less" scoped>
  
</style>