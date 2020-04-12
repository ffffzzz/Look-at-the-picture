<template>
	<scroll-view class="home-album" scroll-y @scrolltolower="aBottm">
		<!-- 轮播图 -->
		<!-- 轮播有自己的高150px,
		image有自己的宽320px(在app.vue里重置了)高240px 
		所以要计算图片的宽度和高度 640*284
		然后把图片的比例写到swiper中
		640/284=2.25..约等于2.3  750/2.3=326.1就行了
		由于swiperitem的高是继承下来的  所以设置image的高度为100%
		-->
		<view class="album-swiper">
			<swiper autoplay indicator-dots circular>
				<swiper-item v-for="item in banners" :key="item.id">
					<image :src="item.thumb"></image>
				</swiper-item>
			</swiper>
		</view>

		<!-- 列表 -->
		<view class="album-list">
			<navigator class="album-item" 
			v-for="item in album" 
			:key="item.id" :url="`/pages/album/index?id=${item.id}`">
				<view class="item-left">
					<image :src="item.cover" mode="aspectFill"></image>
				</view>
				<view class="item-right">
					<view class="right-title">{{item.name}}</view>
					<view class="right-text">{{item.desc}}</view>
					<view class="right-btn">
						<view class="right-attention">+ 关注</view>
					</view>
				</view>
			</navigator>
		</view>

	</scroll-view>
</template>

<script>
export default {
	data() {
		return {
			param: {
				limit: 30,
				order: "new",
				skip: 0
			},
			// 1.0轮播图数据
			banners: [],
			// 1.1列表数组
			album: [],
			noData: true
		}
	},
	mounted() {
		uni.setNavigationBarTitle({title: "专辑"});
		this.getalbum()
	},
	methods: {
		// 0.0获取接口的数据
		getalbum() {
			this.request({
				url: "http://157.122.54.189:9088/image/v1/wallpaper/album",
				data: this.param
			}).then(res=> {
				
				if(this.banners.length === 0) {
					// 1.2轮播图数据
					this.banners = res.res.banner;
				}

				if(res.res.album === 0) { 
					this.noData = false;
					uni.showToast({
                     title: "没有更多数据了",
                     icon: "none"
                    });
					return;
				}
				
				// 1.3列表数据
				this.album = [...this.album , ...res.res.album];
			}) 
		},
		// // swiper自带的滚动条触底事件
		aBottm() {
			/*
			1. 修改参数
			2. 重新发送请求
			3. 请求回来hots的数据要叠加
			*/
			if(this.noData) {
				// 判断  加载了很多没有就了不发请求了
				this.param.skip+= this.param.limit;
				this.getalbum()
			}else {
				// 加载了很多没有就了不发请求了
				uni.showToast({
					title: "没有数据了",
					icon: "none"
				})
			}
		}
	}
}
</script>

<style lang="scss" scoped>
.home-album {
	height: calc(100vh - 72rpx);
}
// 轮播图
.album-swiper {
	swiper {
		height: 326.1rpx;
		image {
			height: 100%;
		}
	}
}

// 列表
.album-list {
	padding: 10rpx;
  .album-item {
	  padding: 10rpx 0;
	  display: flex;
	  border-bottom: 1px solid #ccc;
    .item-left {
		flex: 1;
		padding: 10rpx;
      image {
		  width: 200rpx;
		  height: 200rpx;
      }
    }

    .item-right {
		flex: 2;
		padding: 0 10rpx;
		overflow: hidden;
      .right-title {
		  font-size: 30rpx;
		  color: #000;
		  padding: 10rpx 0;
      }

      .right-text {
		  padding: 10rpx 0;
		  font-size: 24rpx;
		  text-overflow: ellipsis;
		  overflow: hidden;
		  white-space: nowrap;
      }

      .right-btn {
		  padding: 10rpx;
		  display: flex;
		  justify-content: flex-end;
        .right-attention {
			color: $color;
			border: 1rpx solid $color;
			padding: 10rpx;
        }
      }
    }
  }
}
</style>
