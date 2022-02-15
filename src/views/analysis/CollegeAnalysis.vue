<template>
  <div class="collegeAnalysis">
    <navbar>
      <div slot="left" class="return" @click="$router.back(-1)">
        <van-icon name="arrow-left" color="#FFF" size="0.9rem" />
        <div class="returnText">返回</div>
      </div>
    </navbar>
    <van-divider
      :style="{ color: '#1989fa', borderColor: '#1989fa', padding: '0 16px' }"
    >
      院校预测
    </van-divider>
    <van-search
      v-model="searchCollege"
      placeholder="请输入搜索关键词"
      show-action
    >
      <template #action>
        <div @click="searchCollegeDetail()">搜索</div>
      </template>
    </van-search>
    <div class="college">
      <van-tabs type="card" v-model="analyseActive" color="#1D8FE1" animated>
        <van-tab title="预测数据">
          <div class="collegeTable">
            <van-row
              type="flex"
              style="background-color: #fafafa; color: #5772c7"
            >
              <van-col span="8">年份</van-col>
              <van-col span="8">最低录取分</van-col>
              <van-col span="8">最低段位</van-col>
            </van-row>
            <van-row
              v-for="(item, index) in collegeGrade"
              :key="index"
              v-show="collegeGrade"
              gutter="20"
            >
              <van-col span="8">{{ item.year }}</van-col>
              <van-col span="8">{{ item.grade }}</van-col>
              <van-col span="8">{{ item.ranking }}</van-col>
            </van-row>
            <van-empty class="noneData" image="search" description="暂无数据" v-show="!collegeGrade" />
          </div>
        </van-tab>
        <van-tab title="预测结果">
          <div class="collegeTable">
            <van-row
              type="flex"
              style="background-color: #fafafa; color: #5772c7"
            >
              <van-col span="8">预测年份</van-col>
              <van-col span="8">最低录取分</van-col>
              <van-col span="8">最低段位</van-col>
            </van-row>
            <van-empty class="noneData" image="search" description="暂无数据" v-show="!addcollegeGrade" />
            <van-row
              v-for="(item, index) in addcollegeGrade"
              :key="index"
              v-show="addcollegeGrade"
              gutter="20"
            >
              <van-col span="8">{{ item.year }}</van-col>
              <van-col span="8">{{ item.grade }}</van-col>
              <van-col span="8">{{ item.ranking }}</van-col>
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
            <div class="custom-button">{{ alpha / 100 }}</div>
          </template>
        </van-slider>
      </div>
      <div class="controlbtn">
        <van-button type="info" @click="collegeanalysis">开始预测</van-button>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import Navbar from "../../components/navbar/Navbar";
import { analyse } from "../../utils/analyse";
import { mapState } from "vuex";
export default {
  data() {
    return {
      time: "1",
      alpha: 40,
      tipsShow: false,
      isLoadingShow: false,
      searchCollege: "",
      collegeList: [],
      collegeGrade: null,
      addcollegeGrade: null, //存预测值
      analyseActive: 0,
    };
  },
  computed: {},
  components: {
    Navbar,
  },
  created() {},
  methods: {
    async getCollegeDetail(year) {
      const { data: res } = await this.$http.get(`${year}/?page_size=9999`);
      if (res.code === 1) {
        this.collegeList = res.data;
        var newCollegeList;
        for (var i = 0; i < this.collegeList.length; i++) {
          if (this.collegeList[i].college.indexOf(this.searchCollege) !== -1) {
            newCollegeList = this.collegeList[i];
          } else if (
            this.collegeList[i].college.indexOf(this.searchCollege) == -1
          ) {
            newCollegeList == null;
          }
        }
        let yearnum = 0;
        switch (year) {
          case "seventeen":
            yearnum = 2017;
            break;
          case "eighteen":
            yearnum = 2018;
            break;
          case "nineteen":
            yearnum = 2019;
            break;
          case "twenty":
            yearnum = 2020;
            break;
        }
        if (newCollegeList !== undefined) {
          this.collegeGrade.push({
            year: yearnum,
            grade: newCollegeList.grade,
            ranking: newCollegeList.ranking,
          });
        } else {
          this.$toast.fail("数据不足4年,无法预测");
        }
      } else if (res.code === 0) {
        this.$toast.fail("数据获取失败");
      }
    },
    async searchCollegeDetail() {
      this.collegeGrade = [];
      await this.getCollegeDetail("seventeen");
      await this.getCollegeDetail("eighteen");
      await this.getCollegeDetail("nineteen");
      await this.getCollegeDetail("twenty");
    },
    collegeanalysis() {
      if (this.searchCollege !== "") {
        this.analyseActive = 1;
        this.addcollegeGrade = [];
        let alpha = this.alpha / 100;
        let grade = [];
        let ranking = [];
        for (let i = 0; i < this.collegeGrade.length; i++) {
          grade.push(this.collegeGrade[i].grade);
          ranking.push(this.collegeGrade[i].ranking);
        }
        let onegrade = analyse(grade, alpha, 1);
        let oneranking = analyse(ranking, alpha, 1);
        if (this.time == 1) {
          this.addcollegeGrade.push({
            year: 2021,
            grade: onegrade,
            ranking: oneranking,
          });
        } else if (this.time == 2) {
          let twograde = analyse(grade, alpha, 2);
          let tworanking = analyse(ranking, alpha, 2);
          this.addcollegeGrade.push({
            year: 2021,
            grade: onegrade,
            ranking: oneranking,
          });
          this.addcollegeGrade.push({
            year: 2022,
            grade: twograde,
            ranking: tworanking,
          });
        }
      } else {
        this.$toast.fail("请先选择院校");
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
.collegeTable {
  text-align: center;
  line-height: 2.4rem;
  .noneData{
    height: 2.4rem;
    margin-top: 5rem;
  }
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
        color: #ee0a24;
        font-size: 0.7rem;
        line-height: 2rem;
        text-align: center;
        background-color: #fff;
        border-radius: 50%;
        border: #e6e6e6 solid 0.1rem;
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
