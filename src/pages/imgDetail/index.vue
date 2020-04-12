<template>
    <view>
        <!-- 用户信息 -->
        <view class="user-info">
            <view class="user-left">
                <image :src="imgDetail.user.avatar" mode="widthFix"></image>
            </view>
            <view class="user-right">
                <view class="user-name">{{imgDetail.user.name}}</view>
                <view class="user-time">{{imgDetail.cnTime}}</view>
            </view>
        </view>

        <!-- 大图片 -->
        <view class="big-img">
            <action @actionClick="actionClick">
                <image mode="widthFix" :src="imgDetail.thumb"></image>
            </action>
        </view>

        <!-- 点赞收藏 -->
        <view class="rank">
            <view class="rank-left">
                <text class="iconfont icon-dianzan">{{imgDetail.rank}}</text>
            </view>
            <view class="rank-right">
                <text class="iconfont icon-shoucang">收藏</text>
            </view>
        </view>
        
        <!-- 专辑 -->
        <view class="album-wrap" v-if="album.length">
            <view class="album-title">相关</view>
            <view class="album-list">
                <view v-for="item in album" :key="item.id" class="album-item">
                    <view class="album-cover">
                        <image :src="item.cover" mode="aspectFill"></image>
                    </view>
                    <view class="album-info">
                        <view class="album-text">专辑</view>
                        <view class="album-name">{{item.name}}</view>
                        <text class="iconfont icon-icon"></text>
                    </view>
                </view>
            </view>
        </view>

        <!-- 最热评论 hot-->
        <view class="comment hot" v-if="hot.length">
            <view class="comment-title">
                <text class="iconfont icon-hot1"></text>
                <text class="comment-text">最热评论</text>
            </view>
            <view class="comment-list">
                <view class="comment-item" v-for="item in hot" :key="item.id">
                    <!-- 用户信息 -->
                    <view class="user-info">
                        <!-- 用户头像 -->
                       <view class="user-icon"><image :src="item.user.avatar" mode="widthFix"></image></view>
                        <!-- 用户名称 -->
                        <view class="user-name">
                            <view class="name">{{item.user.name}}</view>
                            <view class="time">{{item.cnTime}}</view>
                        </view>
                        <!-- 用户徽章 -->
                        <view class="user-badge">
                            <image v-for="item2 in item.user.title" 
                            :key="item2.icon" :src="item2.icon"></image>
                        </view>
                    </view>
                    <!-- 评论数据 -->
                    <view class="user-desc">
                        <view class="comment-content">{{item.content}}</view>
                        <view class="comment-link">
                            <text class="iconfont icon-dianzan">{{item.size}}</text>
                        </view>
                    </view>
                </view>
            </view>
        </view>

        <!-- 最新评论 new-->
        <view class="comment new" v-if="comment.length">
            <view class="comment-title">
                <text class="iconfont icon-pinglun"></text>
                <text class="comment-text">最新评论</text>
            </view>
            <view class="comment-list">
                <view class="comment-item" v-for="item in comment" :key="item.id">
                    <!-- 用户信息 -->
                    <view class="user-info">
                        <!-- 用户头像 -->
                        <view class="user-icon"><image :src="item.user.avatar" mode="widthFix"></image></view>
                        <!-- 用户名称 -->
                        <view class="user-name">
                            <view class="name">{{item.user.name}}</view>
                            <view class="time">{{item.cnTime}}</view>
                        </view>
                        <!-- 用户徽章 -->
                        <view class="user-badge">
                            <image v-for="item2 in item.user.title" 
                            :key="item2.icon" :src="item2.icon"></image>
                        </view>
                    </view>
                    <!-- 评论数据 -->
                    <view class="user-desc">
                        <view class="comment-content">{{item.content}}</view>
                        <view class="comment-link">
                            <text class="iconfont icon-dianzan">{{item.size}}</text>
                        </view>
                    </view>
                </view>
            </view>
        </view>
        
        <!-- 下载开始 -->
        <view class="download">
            <view class="download-btn" @click="downlClick">下载图片</view>
        </view>

    </view>
</template>

<script>
import moment from "moment";
import Action from "../../components/action/Action"
// 设置为中文
moment.locale("zh-cn")
export default {
    data() {
        return {
            // 1.0图片信息对象
            imgDetail: {},
            // 专辑数据
            album: [],
            // 最热评论
            hot: [],
            // 最新评论
            comment: [],
            // 图片的索引
            imgIndex: 0
        }
    },
    components: {
        Action
    },
    onLoad() {
        // console.log(getApp().globalData);
        const { imgIndex } = getApp().globalData;

        // 图片的索引
        this.imgIndex = imgIndex;
        this.getPage();
    },
    methods: {
        // 给当前页码赋值
        getPage() {
            const { imgList } = getApp().globalData;
            this. imgDetail = imgList[this.imgIndex];
            
            // xxx年前的数据 但是是英文的  所以上面设置成中文
            this.imgDetail.cnTime = moment(this.imgDetail.atime*1000).fromNow()

            // 获取图片详情的id  :this.imgDetail.id
            this.getcomments(this.imgDetail.id)
        },
        // 获取评论的数据
        getcomments(id) {
            this.request({
                url: `http://157.122.54.189:9088/image/v2/wallpaper/wallpaper/${id}/comment`
            }).then(res => {
                // console.log(res);
                this.album = res.res.album;

                // 给hot数组添加一个事件属性 不然是时间戳
                res.res.hot.forEach(item => item.cnTime = moment(item.atime*1000).fromNow());
                res.res.comment.forEach(item => item.cnTime = moment(item.atime*1000).fromNow());
                this.hot = res.res.hot;
                this.comment = res.res.comment
            })
        },
        // 滑动事件
        actionClick(e) {
            // console.log(e);
            /*
              1. 用户左滑  imgIndex++
              2. 用户右滑  imgIndex--
              3. 判断数据是否到顶
              4. 左滑 e.direction === "left"&& this.imgIndex < imgList.length-1
              5. 右滑 e.direction === "right"&& this.imgIndex > 0
            */

            // 需要重新再拿一次imgList  因为放在上面的getApp()中
           const { imgList } = getApp().globalData;
           if(e.direction === "left"&& this.imgIndex < imgList.length-1) {
            //  可以进行左滑 加载下一页
            this.imgIndex++;
            this.getPage();
           }else if(e.direction === "right"&& this.imgIndex > 0) {
            //  可以右滑 加载上一页
            this.imgIndex--;
            this.getPage();
           }else {
               uni.showToast({
                   title: "没有数据了",
                   icon: "none"
               })
           }
        },
        // 点击下载图片
      async  downlClick() {
        // uni.downloadFile
        // uni.saveImageToPhotosAlbum

        await uni.showToast({
            title: "下载中"
        })

        // 1.将远程图片下载到小程序的内存中// url远程图片路径
         const res = await uni.downloadFile({ url: this.imgDetail.img})
         const {tempFilePath} = res[1];
        // 2.将小程序内存中的临时文件下载到本地上
         const res2 = await uni.saveImageToPhotosAlbum({filePath: tempFilePath})
        // 3.提示用户下载成功
            // console.log(res2);
            // console.log("xiazai");

         uni.hideLoading();
         await uni.showToast({
             title: "下载成功"
         })
        }
    }
}
</script>

<style lang="scss" scoped>
// 用户信息
.user-info {
    display: flex;
    padding: 20rpx;
  .user-left {
      padding: 0 20rpx;
    image {
        width: 88rpx;
        border-radius: 50%;
    }
  }
  .user-right {
    .user-name {
        color: #000;
        font-weight: 600;
    }
    .user-time {
        color: #ccc;
        font-size: 24rpx;
        padding: 10rpx 0;
    }
  }
}

// 点赞收藏
.rank {
    display: flex;
    height: 80rpx;
    border-bottom: 5rpx solid #eee;
  .rank-left {
      flex: 1;
      display: flex;
      justify-content: center;
      align-items: center;
  }

  .rank-right {
      flex: 1;
      display: flex;
      justify-content: center;
      align-items: center;
  }
}

.big-img {
    image {
        border-bottom: 1px solid #eee;
    }
}

// 专辑
.album-wrap {
    padding: 20rpx;
  .album-title {
      padding: 10rpx 0;
  }

  .album-list {
    .album-item {
        display: flex;
        padding: 10rpx 0;
        border-bottom: 10rpx solid #eee;
      .album-cover {
          flex: 1;
        image {
            height: 180rpx;
            width: 180rpx;
        }
      }

      .album-info {
          flex: 3;
          padding-left: 20rpx;
          position: relative;
        .album-text {
            width: 100rpx;
            height: 50rpx;
            background-color: $color;
            color: #fff;
            display: flex;
            justify-content: center;
            align-items: center;
        }

        .album-name {
            padding: 10rpx 0;
            color: #888;
        }
        .icon-icon {
            position: absolute;
            font-size: 40rpx;
            top: 50%;
            transform: translateY(-50%);
            right: 10%;
            color: #000;
        }
      }
    }
  }
}


// 最热评论
.comment {
  .comment-title {
      padding: 15rpx;
    .icon-hot1 {
        font-size: 40rpx;
        color: red;
    }

    text.comment-text {
        font-weight: 600;
        font-size: 36rpx;
        color: #666;
        margin-left: 10rpx;
    }
  }

 .comment-list {
  .comment-item {
      border-bottom: 15rpx solid #eee;
    //   用户信息
    .user-info {
        display: flex;
        padding: 20rpx 0;
      .user-icon {
          width: 15%;
          display: flex;
          justify-content: center;
          align-items: center;
        image {
            width: 90%;
        }
      }

      .user-name {
          flex: 1;
        .name {
            color: #777;
        }

        .time {
            color: #ccc;
            font-size: 24rpx;
            padding: 5rpx 0;
        }
      }
    // 用户徽章
      .user-badge {

        image {
            width: 40rpx;
            height: 40rpx;
            display: inline-block;
        }
      }
    }
    // 评论数据
    .user-desc {
        display: flex;
        padding: 30rpx 0;
      .comment-content {
          padding-left: 15%;
          color: #000;
          flex: 1;
      }

      .comment-link {
          text-align: right;
        .icon-dianzan {

        }
      }
    }
  }
}
}

// 最新评论
.new {
    .icon-pinglun {
        color: aqua !important;
    }
}

// 下载
.download {
    height: 120rpx;
    display: flex;
    justify-content: center;
    align-items: center;
    .download-btn {
        width: 90%;
        height: 80%;
        background-color: $color;
        color: #fff;
        font-size: 50rpx;
        font-weight: 600;
        display: flex;
        justify-content: center;
        align-items: center;
    }
}
</style>
