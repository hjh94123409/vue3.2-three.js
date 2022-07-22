<template>
    <div class="enjoyLife">
        <h1>乐享生活100+</h1>
        <div class="enjoyLife-list">
            <div class="enjoyLife-list-item" v-for="index in 10" :key="index">
                <div class="enjoyLife-list-item-btn">
                    <img
                        :src="props.sports[index].menuThumbnail"
                        :alt="props.sports[index].displayName"
                    />
                    <h3>{{ props.sports[index].displayName }}</h3>
                </div>
            </div>
        </div>
        <a-button type="primary" size="large" @click="router.push('/product')">立即享受生活</a-button>
    </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
const props = defineProps({
    sports: Array,
});
const router = useRouter()

</script>

<style lang="less" scoped>
.enjoyLife{
    width: 1200px;
    margin: 40px auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    h1{
        font-size: 30px;
    }
    &-list{
        display: flex;
        width: 100%;
        flex-wrap: wrap;
        padding-top: 30px;
        &-item{
            width: 240px;
            margin-bottom: 45px;
            &-btn{
                width: 200px;
                height: 73px;
                background-color: #fff;
                display: flex;
                position: relative;
                box-shadow: 5px 5px 5px #ccc;
                justify-content: center;
                align-items: center;
                border-radius: 8px 8px 25px 8px;
                img{
                    width: 80px;
                    height: 80px;
                    position: absolute;
                    top: -15px;
                    left: -15px;
                }
                h3{
                    font-size: 18px;
                }
            }
        }
    }
}
</style>
