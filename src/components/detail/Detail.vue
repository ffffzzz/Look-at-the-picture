<template>
    <view @click="detailClick">
        <slot></slot>
    </view>
</template>

<script>
export default {
    props: {
        list: {
            type: Array,
            default() {
                return []
            }
        },
        index: {
            type: Number,
            default() {
                return 1
            }
        }
    },
    methods: {
        detailClick() {
            // 1.将数据存到globalData全局中
            getApp().globalData.imgList = this.list;
            getApp().globalData.imgIndex = this.index;
            // 2.跳转
            uni.navigateTo({
                url:"/pages/imgDetail/index"
            })
        }
    }
}
</script>

<style lang="scss" scoped>
</style>
