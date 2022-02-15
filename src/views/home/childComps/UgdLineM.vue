<template>
  <div id="udgline-m">
    <van-loading type="spinner" color="#1989fa" v-show="isLoadingShow"/>
    <div
      id="myChart"
      :style="{ width: '100%', height: '12rem' }"
      class="udg-line"
    ></div>
  </div>
</template>

<script>
import {mapMutations} from 'vuex'
export default {
  name: "UgdLineM",
  data() {
    return {
      grade: [],
      gradejson: [
        {
          name: "第一段",
          type: "line",
          data: [],
        },
        {
          name: "第二段",
          type: "line",
          data: [],
        },
        {
          name: "第三段",
          type: "line",
          data: [],
        },
      ],
      isLoadingShow:false
    };
  },

  mounted() {},
  methods: {
    ...mapMutations(['setGrade']),
    drawLine() {
      // 基于准备好的dom，初始化echarts实例
      var echarts = require("echarts");
      let myChart = echarts.init(document.getElementById("myChart"));
      // 绘制图表
      myChart.setOption({
        tooltip: {
          trigger: "axis",
        },
        legend: {
          data: ["第一段", "第二段", "第三段"],
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true,
        },
        toolbox: {
          feature: {
            saveAsImage: {},
          },
        },
        xAxis: {
          type: "category",
          boundaryGap: false,
          data: ["2017", "2018", "2019", "2020"],
        },
        yAxis: {
          type: "value",
        },
        series: this.gradejson,
      });
    },
    // 三段线数据
    async getdrawLine() {
      this.isLoadingShow = true;
      const { data: res } = await this.$http.get("grade/");
      if (res.code === 1) {
        this.grade = res.data;
        this.setGrade(this.grade.reverse())
        this.gradejson[0].data = [
          this.grade[0].bk1,
          this.grade[1].bk1,
          this.grade[2].bk1,
          this.grade[3].bk1,
        ];
        this.gradejson[1].data = [
          this.grade[0].bk2,
          this.grade[1].bk2,
          this.grade[2].bk2,
          this.grade[3].bk2,
        ];
        this.gradejson[2].data = [
          this.grade[0].bk3,
          this.grade[1].bk3,
          this.grade[2].bk3,
          this.grade[3].bk3,
        ];
        this.isLoadingShow = false;
        this.drawLine();
      } else {
        this.$toast.fail("数据请求失败");
      }
    },
  },
  created() {
    this.getdrawLine();
  },
};
</script>

<style lang="less" scoped>
#udgline-m {
  width: 100%;
  height: 12rem;
  position: relative;
  .van-loading{
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%,-50%);
  }
}
</style>