<template>
    <div class="header" :class="{ hidden: store.state.isFullscreen }">
        <div class="header-logo" @click="router.push('/')">
            <img src="../assets/vue.svg" alt="logo" />
        </div>
        <a-input-search v-model:value="data.value" placeholder="搜索商品或商品号" class="header-input" @search="onSearch" />
        <a-menu v-model:selectedKeys="data.current" mode="horizontal">
            <a-menu-item key="help">
                <template #icon>
                    <question-circle-outlined />
                </template>
                帮助
            </a-menu-item>
            <a-menu-item key="salesRoom" disabled>
                <template #icon>
                    <shop-outlined />
                </template>
                门店
            </a-menu-item>
            <a-sub-menu key="account">
                <template #icon>
                    <user-outlined />
                </template>
                <template #title>账户</template>
            </a-sub-menu>
            <a-sub-menu key="buycart">
                <template #icon>
                    <shopping-cart-outlined />
                </template>
                <template #title>购物车</template>
                <a-menu-item-group title="商品列表">
                    <a-menu-item v-for="(prod, index) in store.state.buyCarts" :key="prod.id" key="setting:1">
                        <div class="prod-item">
                            <div class="prod-item-left">
                                <img :src="prod.imgsrc" :alt="prod.title" />
                            </div>
                            <div class="prod-item-middle">
                                <div class="prod-item-middle-title">
                                    {{ prod.title }}
                                </div>
                                <div class="prod-item-middle-content">
                                    <span class="prod-item-middle-content-num">数量：{{ prod.num }}</span>
                                    <div class="prod-item-middle-content-control">
                                        <span class="prod-item-middle-content-control-btn"
                                            @click.stop="changeProductNum(true, index)">+</span>
                                        <span class="prod-item-middle-content-control-btn"
                                            @click.stop="changeProductNum(false, index)">-</span>
                                    </div>
                                </div>
                            </div>
                            <div class="prod-item-right">
                                <div class="prod-item-right-price">
                                    ￥ {{ prod.price * prod.num }}
                                </div>
                            </div>
                        </div>
                    </a-menu-item>
                    <a-menu-item key="totalPrice">
                        <div class="totalPrice">
                            <span>总价：</span>
                            <span class="totalPrice-num">￥ {{ store.getters.totalPrice }}</span>
                        </div>
                    </a-menu-item>
                </a-menu-item-group>
            </a-sub-menu>
        </a-menu>
    </div>
</template>

<script setup>
import { reactive } from "vue";
import { useRoute, useRouter } from "vue-router";
import {
    QuestionCircleOutlined,
    ShopOutlined,
    UserOutlined,
    ShoppingCartOutlined,
} from "@ant-design/icons-vue";

import { useStore } from "vuex";

const route = useRoute();

const router = useRouter();

const data = reactive({
    value: "",
    current: [""],
});

const store = useStore();

const onSearch = () => { };

const changeProductNum = (boolean, index) => {
    if (boolean) {
        store.commit('addBuyCartsNum', index)
    } else {
        store.commit('minusBuyCartsNum', index)
    }
}


</script>

<style lang="less" scoped>
.header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: fixed;
    z-index: 10;
    width: 100%;
    background-color: #fff;
    box-shadow: 0 0 10px #ccc;
    transition: all 0.5s;

    &-logo {
        margin-right: 15px;
    }

    &.hidden {
        transform: translateY(-100%);
    }
}
.ant-menu-vertical {
    .ant-menu-item {
        height: auto;
    }
}

.prod-item {
    display: flex;
    width: 400px;
    justify-content: space-between;
    border-bottom: 1px dashed #ccc;
    padding-bottom: 15px;
    &-left {
        width: 100px;
        img {
            width: 90%;
        }
    }

    &-middle {
        width: 220px;
        display: flex;
        flex-direction: column;
        &-title {
            font-size: 16px;
            font-weight: 700;
        }
        &-content {
            display: flex;
            justify-content: space-between;
            &-control {
                margin-right: 20px;
                &-btn {
                    display: inline-block;
                    width: 25px;
                    height: 25px;
                    text-align: center;
                    line-height: 20px;
                    border: 1px solid #ccc;
                    margin: 0 5px;
                    cursor: pointer;
                }
            }
        }
    }
    &-right {
        display: flex;
        align-items: center;
        &-price {
            display: flex;
            font-weight: 700;
            color: orange;
            font-size: 16px;
        }
    }
}
.totalPrice {
    display: flex;
    justify-content: flex-end;
    &-num {
        font-size: 18px;
        font-weight: 700;
        color: orange;
        margin-right: 20px;
    }
}
</style>
