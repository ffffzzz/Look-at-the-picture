<template>
 <view class="video-play">
   <image :src="videoobj.img"></image>

   <!-- 工具栏 -->
   <view class="video-tool">
     <view @click="mutedClick" :class="['iconfont', muted? 'icon-jingyin': 'icon-shengyin']"></view>
     <view class="iconfont icon-forward-null">
       <button open-type="share"></button>
     </view>
   </view>

   <!-- 视频 -->
    <view class="video-wrap">
      <video :muted="muted" :src="videoobj.video" object-fit="fill"></video>
    </view>

    <!-- 下载高清 -->
    <view class="download">
      <view class="download-btn" @click="downClick">下载高清</view>
    </view>

 </view>
</template>

<script>
export default {
  data() {
    return {
      videoobj: {},
      // 是否静音
      muted: false
    }
  },
  onLoad() {
    // console.log(getApp().globalData);
    this.videoobj = getApp().globalData.video;

  },
  methods: {
    // 开关声音
    mutedClick() {
      this.muted = !this.muted
    },
    // 下载视频
    async downClick() {
      // 点击按钮就显示下载中效果
      await uni.showLoading({
        title: "下载中"
      });

      // 1. 将远程视频文件下载到小程序内存中
      // 整段代码的返回值并且下标为1才是数据 所以加()[1]
      const {tempFilePath} = (await uni.downloadFile({url: this.videoobj.video}))[1];
      // 2. 将内存中的文件下载到本地
      await  uni.saveVideoToPhotosAlbum({
        filePath: tempFilePath
      });

      // 取消下载中
      uni.hideLoading();

      // 弹窗告诉用户下载完成
      uni.showToast({
        title: "下载成功"
      })

    }
  }
}
</script>

<style lang="scss" scoped>
.video-play {
  position: relative;
  image {
    position: absolute;
    width: 100vw;
    height: 100vh;
    // cs3滤镜
    filter: blur(20px);
    z-index: -1;
  }


  .video-tool {
    display: flex;
    height: 80rpx;
    justify-content: flex-end;
    .iconfont {
      width: 80rpx;
      color: #fff;
      font-size: 50rpx;
      border-radius: 40rpx;
      background-color: rgba(0,0,0,.5);
      display: flex;
      justify-content: center;
      align-items: center;
      margin-right: 20rpx;
    }
    .icon-forward-null {
      position: relative;
      button {
        position: absolute;
        width: 100%;
        height: 100%;
        opacity: 0;
      }
    }
  }

  .video-wrap {
    display: flex;
    justify-content: center;
    video { 
      width: 360rpx;
      height: 600rpx;
    }
  }

  .download {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 30rpx;
    .download-btn {
      color: #fff;
      width: 360rpx;
      height: 80rpx;
      border-radius: 40rpx;
      display: flex;
      justify-content: center;
      align-items: center; 
      border: 3rpx solid #fff;
      background-color: rgba(0,0,0,.2);
    }
  }
}
</style>
