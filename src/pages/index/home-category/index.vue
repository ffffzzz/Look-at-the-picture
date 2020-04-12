<template>
	<view class="home-category">
		<navigator class="category-item" 
		v-for="item in category" 
		:key="item.id" :url="`/pages/imgCategory/index?id=${item.id}`">
			<image mode="aspectFill" :src="item.cover"></image>
			<view class="category-name">{{item.name}}</view>
		</navigator>
	</view>
</template>

<script>
export default {
	data() {
		return {
			// 分类数组
			category: []
		}
	},
	mounted() {
		// 0 修改页面的标题
		uni.setNavigationBarTitle({title: "分类"});
		// 1.1发送分类数据
		this.getCategory();
	},
	methods:{
		// 1.0 获取分类数据
		getCategory() {
			this.request({
				url: "http://157.122.54.189:9088/image/v1/vertical/category"
			}).then(res => {
				this.category = res.res.category;
			})
		}
	}
}
</script>

<style lang="scss" scoped>
// 分类
.home-category {
	display: flex;
	flex-wrap: wrap;
  .category-item {
		width: 33.33%;
		position: relative;
		border-bottom: 5rpx solid #fff;
    image {
			height: 240rpx;
    }

    .category-name {
		position: absolute;
		height: 40rpx;
		left: 0;
		bottom: 0;
		color: #fff;
		font-size: 40rpx;
		display: flex;
		align-items: center;
		padding-left: 20rpx;
		// 渐变
		background-image: linear-gradient(to right top, rgba(0,0,0,.2),rgba(0,0,0,0));
    }
  }
}
</style>
