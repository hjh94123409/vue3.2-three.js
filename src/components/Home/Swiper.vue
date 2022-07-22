<template>
    <div class="carousel">
        <div
            class="carousel-bg"
            :style="{ backgroundColor: data.bgColor }"
        ></div>
        <a-carousel arrows  :beforeChange="changeFn">
            <template #prevArrow>
                <div class="custom-slick-arrow" style="left: 10px; z-index: 1">
                    <left-circle-outlined />
                </div>
            </template>
            <template #nextArrow>
                <div class="custom-slick-arrow" style="right: 10px">
                    <right-circle-outlined />
                </div>
            </template>
            <div
                class="carousel-item"
                v-for="(item, index) in props.bannerList"
                :key="item._id"
            >
                <div class="carousel-item-box">
                    <div class="carousel-item-box-left">
                        <h3 :style="{ color: item.text_color }">
                            {{ item.desktop_sub_title || item.sub_title }}
                        </h3>
                        <h1 :style="{ color: item.text_color }">
                            {{ item.desktop_title || item.title }}
                        </h1>
                    </div>
                    <div class="carousel-item-box-right">
                        <img
                            :src="`https://pixl.decathlon.com.cn/${item.picture_desktop}/banner.jpg`"
                            :alt="item.title"
                        />
                    </div>
                </div>
            </div>
        </a-carousel>
    </div>
</template>

<script setup>
import { reactive } from "vue";
import { LeftCircleOutlined, RightCircleOutlined } from "@ant-design/icons-vue";

const props = defineProps({
    bannerList: Array,
});

// console.log(props.bannerList);

const data = reactive({
    bgColor: props.bannerList[0].bg_color,
});

const changeFn = (from, to) => {
    // console.log(from, to)
    data.bgColor = props.bannerList[to].bg_color;
};
</script>

<style lang="less" scoped>
.carousel {
    height: 575px;
    position: relative;
    overflow: hidden;
    &-bg {
        position: absolute;
        height: inherit;
        width: 100%;
        height: inherit;
        background-color: orangered;
        transform: skew(0, -8deg);
        transform-origin: 0 0;
        transition: all 0.8s;
    }
    &-item{
        height: 575px;
        &-box{
            display: flex;
            min-width: 1200px;
            justify-content: center;
            &-left{
                width: 300px;
                margin-right: 60px;
                display: flex;
                flex-direction: column;
                text-align: left;
                padding-top: 100px;
                h3{
                    font-size: 30px;
                    font-weight: 900;
                }
                h1{
                    font-size: 60px;
                    font-weight: 900;
                }
            }
            &-right{
                margin-top: 45px;
                transform-origin: 0 100%;
                transform: skew(0, -8deg);
                overflow: hidden;
                border-radius: 20px;
                border-bottom-right-radius: 80px;
                img{
                    transform-origin: 0 100%;
                    transform: skew(0, 8deg);
                    border-radius: 20px;
                }
            }
        }
    }
}
.ant-carousel {
    position: relative;
    z-index: 1;
}
.ant-carousel :deep(.slick-slide) {
    text-align: center;
    height: 575px;
    overflow: hidden;
}

.ant-carousel :deep(.slick-arrow.custom-slick-arrow) {
    width: 25px;
    height: 25px;
    font-size: 25px;
    color: #fff;
    background-color: rgba(31, 45, 61, 0.11);
    opacity: 0.3;
    z-index: 1;
}

.ant-carousel :deep(.custom-slick-arrow:before) {
    display: none;
}

.ant-carousel :deep(.custom-slick-arrow:hover) {
    opacity: 0.5;
}

.ant-carousel :deep(.slick-slide h3) {
    color: #fff;
}
</style>
