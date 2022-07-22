<template>
    <div class="isLoading" v-show="data.isLoading">
        <Loading :progress="data.progress" />
    </div>
    <div class="product" v-show="!data.isLoading">
        <div class="product-base3d" id="base3dElement"></div>
        <div
            class="product-desc"
            v-if="data.products[data.productIndex]"
            v-for="(desc, index) in data.products[data.productIndex].desc"
            :key="index"
            :class="{ active: data.deacIndex === index }"
        >
            <h1>{{ desc.title }}</h1>
            <p>{{ desc.content }}</p>
        </div>
        <div class="product-left" :class="{ hidden: store.state.isFullscreen }">
            <h1><SketchOutlined />产品推荐</h1>
            <div class="product-left-list">
                <div
                    class="product-left-list-item"
                    v-for="(prod, pI) in data.products"
                    :key="prod.id"
                    :class="{ active: pI === data.productIndex }"
                    @click="changeModel(prod, pI)"
                >
                    <div class="product-left-list-item-title">
                        {{ prod.title }}
                    </div>
                    <div class="product-left-list-item-img">
                        <img :src="prod.imgsrc" :alt="prod.title" />
                    </div>
                    <a-button
                        type="primary"
                        block
                        @click.stop="addBuyCart(prod)"
                    >
                        <template #icon>
                            <ShoppingCartOutlined />
                        </template>
                        加入购物车
                    </a-button>
                </div>
            </div>
        </div>
        <div
            class="product-right"
            :class="{ hidden: store.state.isFullscreen }"
        >
            <h1><RadarChartOutlined />切换使用场景</h1>
            <div class="product-right-scenes">
                <!-- <div
                    class="product-right-scenes-item"
                    v-for="(scence, sI) in data.scenes"
                    :key="scence"
                    @click="changeScene(scence, sI)"
                >
                    <img
                        :class="{ active: sI === data.sceneIndex }"
                        :src="`./files/hdr/${scence}.jpg`"
                        :alt="scence"
                    />
                </div> -->
                <div class="product-right-scenes-item" @click="changeScene(data.scenes[0], 0)">
                    <img
                        :class="{ active: data.sceneIndex === 0 }"
                        src="/public/files/hdr/000.jpg"
                        alt="/public/files/hdr/000.jpg"
                    />
                </div>
                <div class="product-right-scenes-item" @click="changeScene(data.scenes[5], 5)">
                    <img
                        :class="{ active: data.sceneIndex === 1 }"
                        src="/public/files/hdr/067.jpg"
                        alt="/public/files/hdr/067.jpg"
                    />
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { onMounted, reactive } from "vue";
import { getProducts } from "@/api";
import { useStore } from "vuex";

import {
    SketchOutlined,
    RadarChartOutlined,
    ShoppingCartOutlined,
} from "@ant-design/icons-vue";

import Loading from "@/components/Loading.vue";

import Base3d from "@/utils/Base3d";

const data = reactive({
    products: [],
    scenes: [],
    isLoading: true,
    productIndex: 0,
    sceneIndex: 0,
    base3d: {},
    deacIndex: 0,
    progress: 0,
});

const store = useStore();

const loadingFinish = () => {
    data.isLoading = false;
};

onMounted(async () => {
    const result = await getProducts();
    // console.log(result);
    data.isLoading = false;
    data.products = result.list;
    data.scenes = result.hdr;
    data.base3d = new Base3d("#base3dElement", loadingFinish);
    data.base3d.onProgress((e) => {
        let progress = e.loaded / e.total;
        data.progress = progress.toFixed(2) * 100;
    });
});

const changeModel = (prod, pI) => {
    data.productIndex = pI;
    data.base3d.setModel(prod.modelName);
};

const changeScene = (scene, sI) => {
    data.sceneIndex = sI;
    data.base3d.setEnvMap(scene);
};

const addBuyCart = (prod) => {
    const product = { ...prod, num: 1 };
    let index = 0;
    const isExist = store.state.buyCarts.some((item, i) => {
        if (product.id === item.id) {
            index = i;
            return true;
        } else {
            return false;
        }
    });
    if (isExist) {
        store.commit("addBuyCartsNum", index);
    } else {
        store.commit("addBuyCarts", product);
    }
};

window.addEventListener("mousewheel", (e) => {
    // console.log(e.deltaY);
    let duration = data.base3d.animateAction._clip.duration;
    let time = data.base3d.animateAction.time;
    let index = Math.floor((time / duration) * 4);
    data.deacIndex = index;

    if (e.deltaY > 0) {
        store.commit("SETFULLSCREEN", true);
    } else if (e.deltaY < 0) {
        store.commit("SETFULLSCREEN", false);
    }
});
</script>

<style lang="less" scoped>
.list {
    height: 100vh;
    position: fixed;
    width: 300px;
    padding-top: 60px;
    transition: all 0.5s;
    background-color: rgba(255, 255, 255, 0.8);
    top: 0;
}
.product {
    &-base3d {
        background-color: #fff;
    }
    &-desc {
        position: fixed;
        z-index: 2;
        background-color: rgba(255, 255, 255, 0.5);
        width: 500px;
        top: 100px;
        left: 50%;
        margin-left: -250px;
        transform: translateX(-100vw);
        transition: all 0.5s;
        padding: 15px;

        &.active {
            transform: translateX(0);
        }
    }
    &-left {
        &:extend(.list);
        left: 0;
        &.hidden {
            transform: translateX(-100%);
        }
        h1 {
            font-size: 20px;
            font-weight: 700;
            padding: 10px 25px 0;
        }
        &-list {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            &-item {
                text-align: center;
                width: 250px;
                background-color: #fff;
                border-radius: 20px;
                overflow: hidden;
                margin-bottom: 15px;
                box-shadow: 5px 5px 10px #666;
                transition: all 0.3s;
                &-title {
                    padding: 20px 0;
                }
                &-img {
                    width: 190px;
                    margin: 0 auto;
                    img {
                        width: 100%;
                    }
                }
                &:hover {
                    transform: translateY(-5px);
                    box-shadow: 5px 5px 10px #666, 0 0 20px orangered;
                }
                &.active {
                    box-shadow: 5px 5px 10px #666, 0 0 20px red;
                }
            }
        }
    }
    &-right {
        .list;
        right: 0;
        &.hidden {
            transform: translateX(100%);
        }
        h1 {
            font-size: 20px;
            font-weight: 700;
            padding: 0 30px;
        }
        &-scenes {
            display: flex;
            flex-direction: column;
            // justify-content: center;
            align-items: center;
            &-item {
                padding: 6px 0;
                margin-bottom: 15px;
                img {
                    width: 250px;
                    border-radius: 10px;
                    box-shadow: 5px 5px 10px #666;
                    transition: all 0.3s;
                    &:hover {
                        transform: translateY(-5px);
                        box-shadow: 5px 5px 10px #666, 0 0 20px orangered;
                    }
                    &.active {
                        box-shadow: 5px 5px 10px #666, 0 0 20px red;
                    }
                }
            }
        }
    }
}
</style>
