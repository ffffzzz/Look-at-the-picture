<template>
    <view>
        <!-- 专辑背景 -->
        <view class="album-bg">
            <image :src="album.cover" mode="widthFix"></image>
            <view class="album-info">
                <view class="info-left">{{album.name}}</view>
                <view class="info-right">关注专辑</view>
            </view>
        </view>

        <!-- 作者 -->
        <view class="album-author">
            <view class="author-top">
                <image mode="widthFix" :src="album.user.avatar"></image>
                <view class="author-name">{{album.user.name}}</view>
            </view>
            <view class="author-bottom">
                <text>{{album.desc}}</text>
            </view>
        </view>

        <!-- 列表图片 -->
        <view class="album-list">
            <view class="album-item" v-for="(item,index) in wallpaper" :key="item.id">
                <detail :list="wallpaper" :index="index">
                    <image mode="aspectFill" :src="item.thumb+item.rule.replace('$<Height>',360)"></image>
                </detail>    
            </view>
        </view>

    </view>
</template>

<script>
import Detail from "../../components/detail/Detail";
export default {
    data(){
        return {
            params: {
                limit: 30,
                order: "new",
                skip: 0,
                // 1表示第一次请求数据,有album对象
                // 0表示不是第一次请求数据,只有wallpaper数组
                first: 1
                  },
            id: 1,
            album: {},
            wallpaper: [],
            noData: true
        }
    },
    components: {
        Detail
    },
    methods: {
        getList() {
            this.request({
                url: `http://157.122.54.189:9088/image/v1/wallpaper/album/${this.id}/wallpaper`,
                data: this.params
            }).then(res => {

                if(Object.keys(this.album).length===0) {
                    this.album = res.res.album;
                }

                if(res.res.wallpaper===0) {
                    this.noData = false;
                     uni.showToast({
                     title: "没有更多数据了",
                     icon: "none"
                    });
                    return;
                }
               
                this.wallpaper = [...this.wallpaper, ...res.res.wallpaper]
            })
        }
    },
    onLoad(options) {
        this.id = options.id;
        // this.id = "5d5f8e45e7bce75ae7fb8278"
        this.getList()
    },
    onReachBottom() {
        console.log(111);
        if(this.nodata) {
            // 有请求继续拼接
            this.params.first = 0
            this.params.skip+= this.params.limit;
            this.getList();
        }else{
            uni.showToast({
                title: "没有更多数据了",
                icon: "none"
            })
        }
    }
}
</script>

<style lang="scss" scoped>
// 专辑背景
.album-bg {
    position: relative;
  .album-info {
      position: absolute;
      width: 100%;
      left: 0;
      bottom: 0;
      display: flex;
      justify-content: space-between;
      height: 80rpx;
      align-items: center;
      color: #fff;
      padding: 0 10rpx;
    .info-left {
        font-size: 40rpx;
    }
    .info-right {
        background-color: $color;
        height: 60rpx;
        width: 152rpx;
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 10rpx;
    }
  }
}

// 作者
.album-author {
    padding: 10rpx;
  .author-top {
      padding: 10rpx 0 ;
      display: flex;
    image {
        width: 50rpx;
    }

    .author-name {
        color: #000;
        margin-left: 15rpx;
    }
  }
}

// 列表图片
.album-list {
    display: flex;
    flex-wrap: wrap;
  .album-item {
      width: 33.33%;
      border: 3rpx solid #fff;
    image {
        height: 160rpx;
    }
  }
}
</style>
