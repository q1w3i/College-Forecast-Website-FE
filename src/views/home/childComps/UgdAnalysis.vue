<template>
  <div class="analysis">
    <van-grid direction="horizontal" clickable border :column-num="2" icon-size="2rem">
      <van-grid-item icon="chart-trending-o" text="分数线预测" to="/gradeanalysis" />
      <van-grid-item icon="home-o" text="院校预测" dot to="/colegeanalysis"/>
    </van-grid>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  data() {
    return {};
  },
  components: {},
};
</script>

<style scoped lang="less">
.analysis{
    .van-grid{
        .van-grid-item{
            height: 7rem;
        }
    }
}
</style>
