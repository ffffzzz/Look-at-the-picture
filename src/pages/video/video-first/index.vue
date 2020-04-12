<template>
  <scroll-view scroll-y 
  enable-flex 
  class="video-first" @scrolltolower="videoBottom">
    <view class="first-item" v-for="item in videowp" 
      :key="item.id" @click="toVideo(item)">
      <image mode="widthFix" :src="item.img"></image>
    </view>
  </scroll-view>
</template>

<script>
export default {
  data() {
    return {
      videowp: [],
      noData: true 
    }
  },
  props: {
    urlobj: {
      type:Object,
      default: {}
    }
  },
  watch: {
    urlobj() {
      // 0.3因为4个页面共用一个组件但是请求又不一样  需要在watch监听再发一次请求
      
      // 1 旧数组的清空 ,因为skip在点击的时候已经清空 所以这里不用清空
      this.videowp = [];

      this.getvideo();
    }
  },
  mounted() {
    // 0.1发送视频数据 组件第一次创建触发
    this.getvideo();
  },
  methods: {
    // 0.0获取视频数据
    getvideo() {
      this.request({
        url: this.urlobj.url,
        data: this.urlobj.params
      }).then(res => {
        // console.log(res);

        if(res.res.videowp.length===0){
          this.noData = false;
            uni.showToast({
            title: "没有更多数据了",
            icon: 'none'
          })
          return;
        }		
        this.videowp = [...this.videowp, ...res.res.videowp];
      })
    },
    // 底部刷新事件
    videoBottom() {
      if(this.noData) {
        this.urlobj.params.skip += this.urlobj.params.limit;
        this.getvideo();
      }else{
        uni.showToast({
          title: "没有更多数据了",
          icon: 'none'
        })
      }
    },
    // 点击跳转播放页面
    toVideo(e) {
      // 1 将数据存到全局共享中
      getApp().globalData.video = e;
      // 2. 页面跳转
      uni.navigateTo({
        url: "/pages/videoPlay/index"
      })
    }		
  }
}
</script>

<style lang="scss" scoped>
.video-first {
  display: flex;
  flex-wrap: wrap;
  height: calc(100vh - 72rpx);
  .first-item {
    width: 33.33%;
    border: 5rpx solid #fff;
  }
}
</style>
