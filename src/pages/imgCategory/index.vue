<template>
	<view class="category">
		<view class="category-title">
			<view class="category-title-inner">
				<uni-segmented-control :current="current" :values="items.map(e=>e.title)" @clickItem="onClickItem" style-type="text" active-color="#d4237a">
				</uni-segmented-control>
			</view>
			<view class="iconfont icon-soushuo"></view>
		</view>
		<scroll-view @scrolltolower="toBottom" enable-flex scroll-y class="content">
			<view class="category-item" 
      v-for="(item,index) in vertical" :key="item.id">
        <detail :list="vertical" :index="index">
          <image :src="item.thumb" mode="widthFix"></image>
        </detail>
      </view>
		</scroll-view>
	</view>
</template>

<script>
// uni ui的组件
import {uniSegmentedControl } from '@dcloudio/uni-ui'

import Detail from "../../components/detail/Detail";

export default {
  data() {
    return {
      items: [
        // order: "new" 可以根据点击索引取到里面的order
				{title: "最新" ,order: "new"},
				{title: "热门" ,order: "hot"}
				],
      current: 0,
      params: {
        limit: 30,
        skip: 0,
        order: "new"
      },
      id: 0,
      // 页面显示数据的数组
      vertical: [],
      noData: true
    }
  },
  components: {
    uniSegmentedControl,
    Detail
  },
  onLoad(options) {
      this.id = options.id;
      // 1.1 发送分类item的数据
      this.getList();
    },
  methods: {
    onClickItem(e) {
      /*
        1.点击标题的事件
        2.根据被点击的标题  切换标题
        3.根据标题切换order
        4.然后重新发请求
      */
      // 2.根据被点击的标题  切换标题
      this.current = e.currentIndex;
      // 3.根据标题切换order
      this.params.order = this.items[e.currentIndex].order;
      // 5. 切换order后skip不用重新做分页并且页面显示得数组要清空
      this.params.skip = 0;
      this.vertical = [];
      // 4.然后重新发请求
      this.getList();
    },
    
    getList() {
      // 1.0 获取分类item的数据
      this.request({
        url: `http://157.122.54.189:9088/image/v1/vertical/category/${this.id}/vertical`,
        data: this.params
      }).then(res => {
        // console.log(res);

        if(res.res.vertical.length===0) {
          this.noData = false;
          uni.showToast({
            title: "没有更多数据了",
            icon: "none"
        })
          return;
        }
        this.vertical = [...this.vertical, ...res.res.vertical]
      })
    },
    // 加载下一页数据
    toBottom() {
      if(this.noData) {
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
}
</script>

<style lang="scss">
.category {
	.category-title{
		position: relative;
		.category-title-inner{
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
	.content{
    display: flex;
    flex-wrap: wrap;
    // 给滚动标签加上一个固定的高度
    height: calc(100vh - 72rpx);
    .category-item {
      width: 33.33%;
      border: 5rpx solid #fff;
      image {

      }
    }
  }
}
</style>
