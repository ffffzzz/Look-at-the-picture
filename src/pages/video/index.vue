<template>
	<view class="video">
		<view class="video-title">
			<view class="video-title-inner">
				<uni-segmented-control :current="current" :values="items.map(e=>e.title)" @clickItem="onClickItem" style-type="text" active-color="#d4237a">
				</uni-segmented-control>
			</view>
			<view class="iconfont icon-soushuo"></view>
		</view>
		<view class="content">
			<!-- 这里要把v-show改成v-if 因为不是if的话组件一直是同一个组件 -->
			<view v-if="current < 4">
				<video-first :urlobj="{url:items[current].url,params:items[current].params}"></video-first>
			</view>
			<view >
				<video-last v-if="current === 4" :urlobj="{url:items[current].url,params:items[current].params}"></video-last>
			</view>
		</view>
	</view>
</template>

<script>
import {uniSegmentedControl } from '@dcloudio/uni-ui';

import videoFirst from "./video-first/index";
import videoLast from "./video-last/index";
export default {
	data() {
		return {
			items: [
				{title: "推荐",url: "http://157.122.54.189:9088/videoimg/v1/videowp/featured",params:{limit:30,skip:0,order:"hot"}},
				{title: "娱乐",url: "http://157.122.54.189:9088/videoimg/v1/videowp/category/59b25abbe7bce76bc834198a",params:{limit:30,skip:0,order:"new"}},
				{title: "最新",url: "http://157.122.54.189:9088/videoimg/v1/videowp/videowp",params:{limit:30,skip:0,order:"new"}},
				{title: "热门",url: "http://157.122.54.189:9088/videoimg/v1/videowp/videowp",params:{limit:30,skip:0,order:"hot"}},
				{title: "分类",url: "http://157.122.54.189:9088/videoimg/v1/videowp/category",params:{}}
				],
			current: 0
		}
	},
	components: {
		uniSegmentedControl,
		videoFirst,
		videoLast
	},
	methods: {
		onClickItem(e) {
			this.current = e.currentIndex;
		}
	}
}
</script>

<style lang="scss" scoped>
.video {
	.video-title{
		position: relative;
		.video-title-inner{
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
