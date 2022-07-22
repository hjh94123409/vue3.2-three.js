<template>
    <div id="scene"></div>
</template>

<script setup>
import { reactive, onMounted } from 'vue'
import Base3d from '@/utils/Base3d'

const data = reactive({
    base3d: {}
})

onMounted(() => {
    data.base3d = new Base3d('#scene')
    // console.log(data.base3d)
})

</script>

<style lang="less" scoped>
</style>