<template>
  <view class="video-last">
    <view class="first-item" v-for="item in category" 
      :key="item.id" @click="toVideo(item)">
      <image mode="aspectFill" :src="item.img"></image>
      <view class="last-name">{{item.name}}</view>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      category: [],
    }
  },
  props: {
    urlobj: {
      type:Object,
      default: {}
    }
  },
  mounted() {
    // 0.1 发送数据请求
    this.getList();
  },
  methods: {
    // 0.0 获取数据请求
    getList() {
      this.request({
        url: this.urlobj.url
      }).then(res => {
        console.log(res);
        this.category = res.res.category
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.video-last {
	display: flex;
	flex-wrap: wrap;
  .first-item {
		width: 50%;
		position: relative;
		border-bottom: 5rpx solid #fff;
    image {
			height: 288rpx;
    }

    .last-name {
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
