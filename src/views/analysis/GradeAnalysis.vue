<template>
  <div class="gradeAnalysis">
    <navbar>
      <div slot="left" class="return" @click="$router.back(-1)">
        <van-icon name="arrow-left" color="#FFF" size="0.9rem" />
        <div class="returnText">返回</div>
      </div>
    </navbar>
    <van-divider
      :style="{ color: '#1989fa', borderColor: '#1989fa', padding: '0 16px' }"
    >
      浙江各段分数线
    </van-divider>
    <div class="grade">
      <van-tabs type="card" v-model="analyseActive" color="#1D8FE1" animated>
        <van-tab title="预测数据"> <ugd-table /></van-tab>
        <van-tab title="预测结果">
          <div class="gradeTable">
            <van-row
              type="flex"
              style="background-color: #fafafa; color: #5772c7"
            >
              <van-col span="6">预测年份</van-col>
              <van-col span="6">一段线</van-col>
              <van-col span="6">二段线</van-col>
              <van-col span="6">三段线</van-col>
            </van-row>
            <van-row
              v-for="(item, index) in this.addgrade"
              :key="index"
              gutter="20"
            >
              <van-col span="6">{{ item.year }}</van-col>
              <van-col span="6">{{ item.bk1 }}</van-col>
              <van-col span="6">{{ item.bk2 }}</van-col>
              <van-col span="6">{{ item.bk3 }}</van-col>
            </van-row>
          </div>
        </van-tab>
      </van-tabs>
    </div>
    <van-divider
      :style="{ color: '#1989fa', borderColor: '#1989fa', padding: '0 16px' }"
    >
      开始预测
    </van-divider>
    <div class="control">
      <div class="timeControl">
        <van-radio-group v-model="time" direction="horizontal">
          <div
            style="color: #666a6d; font-size: 0.9rem; margin: 1rem 0 auto 1rem"
          >
            请选择预测的时间范围:
          </div>
          <van-radio name="1" style="margin-left: 2rem">1年</van-radio>
          <van-radio name="2">2年</van-radio>
        </van-radio-group>
      </div>
      <div class="alphaControl">
        <div class="tips">
          选择Alpha值
          <van-icon color="#FFE793" name="question" @click="tipsShow = true" />
          <van-popup
            v-model="tipsShow"
            round
            closeable
            position="top"
            :style="{ height: '30%' }"
          >
            <div class="text">
              当alpha值越小时，过去数据的作用越大，预测值趋向平稳，越不能反映序列数据的变化；
              <br />
              当alpha值越大时，近期数据所占的权重就越大，对变化的反映越灵敏。
              <br />
              在实际应用中一般取: <span>alpha=2/(n+1)</span>
              <br />
              alpha的取值范围通常是 <span>0.01≤alpha≤0.3</span>
            </div>
          </van-popup>
        </div>
        <van-slider
          v-model="alpha"
          max="99"
          min="1"
          bar-height="4px"
          active-color="#ee0a24"
        >
          <template #button>
            <div class="custom-button">{{ alpha/100 }}</div>
          </template> </van-slider
        >
      </div>
      <div class="controlbtn">
        <van-button type="info" @click="gradeanalysis">开始预测</van-button>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import Navbar from "../../components/navbar/Navbar";
import UgdTable from "../../views/home/childComps/UgdTable";
import { analyse } from "../../utils/analyse";
import { mapState } from "vuex";
export default {
  data() {
    return {
      time: "1",
      alpha: 40,
      tipsShow: false,
      isLoadingShow: false,
      newgrade: [], //存预测值
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
      year: [],
      addgrade: [],
      analyseActive:0
    };
  },
  computed: {
    ...mapState(["grade"]),
  },
  components: {
    Navbar,
    UgdTable,
  },
  created() {
    this.newgrade = this.grade;
  },
  methods: {
    gradeanalysis() {
      this.analyseActive = 1;
      this.newgrade = JSON.parse(JSON.stringify(this.grade));
      let alpha = this.alpha / 100;
      let bk1 = [];
      let bk2 = [];
      let bk3 = [];
      this.addgrade = [];
      for (let i = 0; i < this.grade.length; i++) {
        bk1.push(this.grade[i].bk1);
        bk2.push(this.grade[i].bk2);
        bk3.push(this.grade[i].bk3);
      }

      let onebk1 = analyse(bk1, alpha, 1);
      let onebk2 = analyse(bk2, alpha, 1);
      let onebk3 = analyse(bk3, alpha, 1);
      this.year = [2017, 2018, 2019, 2020, 2021];
      if (this.time == 1) {
        this.newgrade.push({
          bk1: onebk1,
          bk2: onebk2,
          bk3: onebk3,
          isAnalysis: true,
          year: 2021,
        });
        this.addgrade.push({
          bk1: onebk1,
          bk2: onebk2,
          bk3: onebk3,
          isAnalysis: true,
          year: 2021,
        });
        for (let i = 0; i < this.newgrade.length; i++) {
          this.gradejson[0].data.push(this.newgrade[i].bk1);
          this.gradejson[1].data.push(this.newgrade[i].bk2);
          this.gradejson[2].data.push(this.newgrade[i].bk3);
        }
      } else if ((this.time = 2)) {
        let twobk1 = analyse(bk1, alpha, 2);
        let twobk2 = analyse(bk2, alpha, 2);
        let twobk3 = analyse(bk3, alpha, 2);
        this.newgrade.push({
          bk1: onebk1,
          bk2: onebk2,
          bk3: onebk3,
          isAnalysis: true,
          year: 2021,
        });
        this.newgrade.push({
          bk1: twobk1,
          bk2: twobk2,
          bk3: twobk3,
          isAnalysis: true,
          year: 2022,
        });
        this.addgrade.push({
          bk1: onebk1,
          bk2: onebk2,
          bk3: onebk3,
          isAnalysis: true,
          year: 2021,
        });
        this.addgrade.push({
          bk1: twobk1,
          bk2: twobk2,
          bk3: twobk3,
          isAnalysis: true,
          year: 2022,
        });
      }
    },
  },
};
</script>

<style scoped lang="less">
.return {
  font-size: 0.9rem;
  color: #ffffff;
  .van-icon {
    float: left;
    margin-top: 0.7rem;
  }
  .returnText {
    float: left;
    margin-top: 0.5rem;
  }
}
.gradeTable {
  text-align: center;
  line-height: 2.4rem;
}
.control {
  width: 90%;
  margin: 1rem auto;
  background-color: #fff;
  height: 12rem;
  border-radius: 1rem;
  .timeControl {
    width: 100%;
    height: 4rem;
    .van-radio {
      margin-top: 1rem;
    }
  }
  .alphaControl {
    text-align: center;
    width: 80%;
    margin: auto;
    color: #666a6d;
    font-size: 0.9rem;
    .van-slider {
      margin-top: 2rem;
      .custom-button {
        width: 2rem;
        height: 2rem;
        color: #EE0A24;
        font-size: 0.7rem;
        line-height: 2rem;
        text-align: center;
        background-color: #fff;
        border-radius: 50%;
        border: #E6E6E6 solid 0.1rem;
      }
    }
    .tips {
      .van-popup {
        .text {
          padding: 2rem;
          text-align: left;
          span {
            color: red;
          }
        }
      }
    }
  }
  .controlbtn {
    width: 100%;
    position: relative;
    height: 5rem;
    .van-button {
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
    }
  }
}
</style>
