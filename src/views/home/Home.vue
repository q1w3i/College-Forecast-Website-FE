<template>
  <div id="home">
    <swipe />
    <van-divider
      :style="{ color: '#1989fa', borderColor: '#1989fa', padding: '0 16px' }"
    >
      浙江各段分数线
    </van-divider>
    <div class="grade">
      <van-tabs type="card" color="#1D8FE1" animated>
        <van-tab title="线图"> <udg-line-m /></van-tab>
        <van-tab title="列表"><udg-table /></van-tab>
      </van-tabs>
    </div>
    <van-divider
      :style="{ color: '#1989fa', borderColor: '#1989fa', padding: '0 16px' }"
    >
      分数线预测入口
    </van-divider>
    <udg-analysis />
    <div style="height:4.5rem;position: relative;">
      <div class="author">@waylon</div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import Swipe from "../../components/swipe/Swipe";
import UdgLineM from "./childComps/UgdLineM";
import UdgTable from "./childComps/UgdTable";
import UdgAnalysis from "./childComps/UgdAnalysis";
import { analyse } from "../../utils/analyse";
export default {
  name: "Home",
  components: {
    Swipe,
    UdgLineM,
    UdgTable,
    UdgAnalysis
  },
  data() {
    return {};
  },
  computed: {
    ...mapState(["grade"]),
  },
  created() {},
};
</script>

<style lang="less" scoped>
.grade {
  padding-top: 1rem;
  padding-bottom: 1rem;
  background-color: #fff;
}
.author{
  position: absolute;
  bottom:3.3rem;
  width: 100%;
  text-align: center;
  font-size: 1rem;
  color: #E7EAED;
}
</style>