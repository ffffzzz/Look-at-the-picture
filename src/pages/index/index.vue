<template>
	<view class="home">
		<view class="home-title">
			<view class="home-title-inner">
				<uni-segmented-control :current="current" :values="items.map(e=>e.title)" @clickItem="onClickItem" style-type="text" active-color="#d4237a">
				</uni-segmented-control>
			</view>
			<view class="iconfont icon-soushuo"></view>
		</view>
		<view class="content">
			<!-- 这里要把v-show改成v-if 因为不是if的话组件一直是同一个组件 -->
			<view v-if="current === 0">
				<home-recommend></home-recommend>
			</view>
			<view v-if="current === 1">
				<home-category></home-category>
			</view>
			<view v-if="current === 2"> 
				<home-new></home-new>
			</view>
			<view v-if="current === 3">
				<home-album></home-album>
			</view>
		</view>
	</view>
</template>

<script>
// uni ui的组件
import {uniSegmentedControl } from '@dcloudio/uni-ui'

// 自己的组件
import homeRecommend from "./home-recommend"
import homeCategory from "./home-category"
import homeAlbum from "./home-album"
import homeNew from "./home-new"
export default {
	data() {
		return {
			items: [
				{title: "推荐"},
				{title: "分类"},
				{title: "最新"},
				{title: "专辑"}
				],
			current: 0
		}
	},
	components: {
		homeRecommend,
		homeCategory,
		homeAlbum,
		homeNew,
		uniSegmentedControl 
	},
	methods: {
		onClickItem(e) {
			this.current = e.currentIndex;
		}
	},
	onLoad() {
	}
}
</script>

<style lang="scss" scoped>
.home {
	.home-title{
		position: relative;
		.home-title-inner{
			width: 60%;
			margin: 0 auto;
		}
		.icon-soushuo{
			position: absolute;
			top: 50%;
			transform: translateY(-50%);
			right: 5%;
		}
	}
	.content{}
}
</style>
