<template>
	<scroll-view @scrolltolower="rBottm" class="home-recommends" scroll-y v-if="recommends.length > 0">
		<!-- 推荐 -->
		<view class="recommend-wrap">
			<navigator class="recommend-item" 
			v-for="item in recommends" 
			:key="item.id" :url="`/pages/album/index?id=${item.target}`">
			<image :src="item.thumb" mode="widthFix"></image>
			</navigator>
		</view>

		<!-- 月份 -->
		<view class="moneths-wrap">
			<view class="moneths-title">
				<view class="moneths-title-left">
					<view class="moneths-info">
						<text>{{monthes.DD}} /</text>
						{{monthes.MM}} 月
					</view>
					<view class="moneths-text">{{monthes.title}}</view>
				</view>
				<view class="moneths-title-right">更多 ></view>
			</view>
			<view class="moneths-content">
				<view class="moneths-item" 
				v-for="(item,index) in monthes.items" 
				:key="item.id">
				<detail :list="monthes.items" :index="index">
					<image mode="widthFix" :src="item.thumb+item.rule.replace('$<Height>',360)"></image>
				</detail>
				</view>
			</view>
		</view>
		 
		 <!-- 热门 -->
		<view class="hots-wrap">
			<view class="hots-title">
				<text>热门</text>
			</view>
			<view class="hots-content">
				<view class="hots-item" 
				v-for="(item,index) in hots" 
				:key="item.id">
				<detail :list="hots" :index="index">
					<image :src="item.thumb" mode="widthFix"></image>
				</detail>
				</view>
			</view>
		</view>

	</scroll-view>
</template>

<script>
// 将momentjs引入
import moment from "moment";
import Detail from "../../../components/detail/Detail";
export default {
	data() {
		return {
			// 1.0推荐数据
			recommends: [],
			// 2.0月份
			monthes: {},
			// 3.0热门
			hots: [],
			params: {
				// 要几条数据
				limit: 30,
				// 关键字
				order: "hot",
				// 跳过几条数据
				skip: 0
			},
			noData: true
		}
	},
	components: {
		Detail
	},
	mounted() {
		// 0 修改页面的标题
		uni.setNavigationBarTitle({title: "推荐"});		

		this.getrecommend();
	},
	methods: {
		// 0.0获取接口数据
		getrecommend() {
			this.request({
			url: "http://157.122.54.189:9088/image/v3/homepage/vertical",
			data: this.params,
		}).then(res => {
			// 做个判断还有,没有下一页数据了
			if(res.res.vertical === 0) {
				this.noData = false;
				uni.showToast({
                     title: "没有更多数据了",
                     icon: "none"
                    });
				return
			}

			// 做一个判断  不然每次发送请求都会重新再次获得数据
			if(this.recommends.length === 0) {
				// 1.1推荐数据
			this.recommends = res.res.homepage[1].items;
			// 2.1月份数据
			this.monthes = res.res.homepage[2];
			// 2.2将月份时间戳改真实时间
			this.monthes.MM = moment(this.monthes.stime).format("MM");
			this.monthes.DD = moment(this.monthes.stime).format("DD");
			}
			
			// 3.1热门数据
			// 使用数组拼接的方式
			this.hots = [...this.hots, ...res.res.vertical];
		})
		},
		// swiper自带的滚动条触底事件
		rBottm() {
			/*
			1. 修改参数
			2. 重新发送请求
			3. 请求回来hots的数据要叠加
			*/
			if(this.noData) {
				// 判断  加载了很多没有就了不发请求了
				this.params.skip+= this.params.limit;
				this.getrecommend()
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
.home-recommends {
	// scroll view的高度等于 屏幕高度 - 头部标题的高度
	height: calc( 100vh - 72rpx);
}
// 推荐
.recommend-wrap {
	display: flex;
	flex-wrap: wrap;
	.recommend-item {
		width: 50%;
		border: 3px solid #fff;
	}
}

// 月份
.moneths-wrap {
  .moneths-title {
	  display: flex;
	  justify-content: space-between;
	  align-items: center;
    .moneths-title-left {
		color: $color;
		font-size: 30rpx;
		font-weight: 600;
		display: flex;
      .moneths-info {
        text {
			font-size: 36rpx;
        }
      }

      .moneths-text {
				color: #666;
				font-size: 34rpx;
				margin-left: 30rpx;
				}
    }

    .moneths-title-right {
		font-size: 34rpx;
		color: $color;
    }
  }

  .moneths-content {
	  display: flex;
	  flex-wrap: wrap;
	  .moneths-item {
		  width: 50%;
			border: 5rpx solid #fff;
			// image {
			// 	height: 390rpx;
      // }
	  }
  }
}

// 热门
.hots-wrap {
  .hots-title {
	  padding: 20rpx;
    text {
		border-left: 25rpx solid $color;
		padding-left: 20rpx;
		font-size: 24rpx;
		font-weight: 600;
    }
  }

  .hots-content {
	  display: flex;
	  flex-wrap: wrap;
    .hots-item {
		width: 33.33%;
		border: 3rpx solid #fff;
      image {

      }
    }
  }
}
</style>
