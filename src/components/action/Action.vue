<template>
<!-- 1给容器绑定两个触屏事件 touchstart 和 touchend
     2用户按下屏幕事件
      2.1记录用户按下屏幕大的时间 Date.now()
      2.2记录用户按下品谷的坐标x和y
     3用户离开屏幕事件
      3.1记录用户按下屏幕大的时间 Date.now()
      3.2记录用户按下品谷的坐标x和y
      3.3根据两个事件运算 判断 用户按下屏幕时长是否合法
      3.4根据两队坐标判断距离是否合法 判断滑动的方向
     4 并且对外提供数据 滑动的方向  子传父 
 -->
  <view @touchstart="btn1" @touchend="btn2">
    <slot></slot>
  </view>
  
</template>

<script>
export default {
  data() {
    return {
      // 按下的时间
      starTime: 0,
      // 按下的坐标
      startX: 0,
      startY: 0
    };
  },
  methods: {
    // 用户按下屏幕
    btn1(e) {
      this.starTime = Date.now();
      this.startX = e.changedTouches[0].clientX;
      this.startY = e.changedTouches[0].clientY;
    },
    // 离开屏幕
    btn2(e) {
      const endTime = Date.now();
      const endX = e.changedTouches[0].clientX;
      const endY = e.changedTouches[0].clientY;

      // 判断按下的时间
      if(endTime - this.starTime > 2000) {
        return;
      }

      // 滑动的方向
      let direction = "";

      // 先判断用户滑动的距离是否合法 合法:判断滑动的方向 Math.abs绝对值
      if(Math.abs(endX - this.startX) > 10&& Math.abs(endY-this.startY<10)) {
        // 滑动的方向
        direction = endX - this.startX > 0? "right" : "left";
      }else {
        return;
      }
      // 发射事件给父组件
      this.$emit("actionClick",{direction});

    }
  }
}
</script>

<style lang="scss">
</style>
