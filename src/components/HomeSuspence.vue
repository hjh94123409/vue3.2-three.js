<template>
    <div class="swiperBox">
        <Swiper :bannerList="data.bannerList" />
        <EnjoyLife :sports="data.sports" />
    </div>
</template>

<script setup>
import { reactive } from "vue";
import { useStore } from "vuex";

import Swiper from "./Home/Swiper.vue";

import EnjoyLife from './Home/EnjoyLife.vue'

import { getHomePage } from "../api";

const result = await getHomePage();

const store = useStore();

const data = reactive({
    bannerList: result.banner,
    sports: result.sports
});
</script>

<style lang="less" scoped>
.swiperBox {
    padding-top: 46px;
}
</style>
