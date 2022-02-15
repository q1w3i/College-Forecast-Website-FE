<template>
  <div class="college">
    <div class="collegeTitle">
      <van-cell is-link @click="showPopup">选择年份</van-cell>
      <van-popup v-model="show" position="bottom" :style="{ height: '30%' }">
        <van-picker
          title="年份"
          show-toolbar
          :columns="columns"
          @confirm="onConfirm"
          @cancel="onCancel"
          @change="onChange"
          :default-index="3"
        />
      </van-popup>
      <van-search
        v-model="searchCollege"
        placeholder="请输入搜索关键词"
        show-action
      >
        <template #action>
          <div @click="searchCollegeDetail()">搜索</div>
        </template>
      </van-search>
      <van-row>
        <van-col span="14"></van-col>
        <van-col span="10">
          <van-radio-group v-model="ordering" direction="horizontal">
            <van-radio name="grade"> 升序 </van-radio>
            <van-radio name="-grade"> 降序 </van-radio>
          </van-radio-group>
        </van-col>
      </van-row>
    </div>
    <div class="collegeList">
      <div class="collegeItemHeader">
        <van-row gutter="5">
          <van-col span="8">院校</van-col>
          <van-col span="8">最低录取分</van-col>
          <van-col span="8">最低排位</van-col>
        </van-row>
      </div>
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
      >
        <div
          class="collegeItem"
          v-for="(item, index) in collegeList"
          :key="index"
        >
          <van-row gutter="5">
            <van-col span="8" style="font-size: 0.9rem" @click="addTargetCollege(item.college)">{{
              item.college
            }}</van-col>
            <van-col span="8">{{ item.grade }}</van-col>
            <van-col span="8">{{ item.ranking!==0 ? item.ranking : "暂无数据" }}</van-col>
          </van-row>
        </div>
      </van-list>
    </div>
    <div class="backTop">
      <img
        src="../../assets/img/backtop.png"
        alt=""
        @click="backTop"
        v-if="btnFlag"
      />
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import { mapState,mapMutations } from 'vuex';
import Swipe from "../../components/swipe/Swipe.vue";
export default {
  data() {
    return {
      show: false,
      columns: ["2017", "2018", "2019", "2020"],
      ordering: "-grade",
      page: 1,
      collegeList: [],
      year: "seventeen",
      loading: false,
      finished: false,
      btnFlag: false,
      searchCollege: "",
      isLoadingShow:false,
      isLogin: 400, //400为未登录,200为登录
      user:{},
    };
  },

  methods: {
    ...mapMutations(['setUser']),
    async getCollege(year, page, ordering) {
      const { data: res } = await this.$http.get(
        `${year}/?ordering=${ordering}&page=${page}`
      );
      if (res.code === 1) {
        this.collegeList = this.collegeList.concat(res.data);
        console.log(this.collegeList);
      } else if (res.code === 0) {
        this.$toast.fail("数据获取失败");
      }
    },
    async getCollegeDetail(year) {
      const { data: res } = await this.$http.get(`${year}/?page_size=9999`);
      if (res.code === 1) {
        this.collegeList = this.collegeList.concat(res.data);
        var newCollegeList =[]
        
        for(var i=0; i<this.collegeList.length; i++){
            if(this.collegeList[i].college.indexOf(this.searchCollege) !==-1 ){
                newCollegeList.push(this.collegeList[i])
            }
        }
        this.collegeList = newCollegeList
      } else if (res.code === 0) {
        this.$toast.fail("数据获取失败");
      }
    },
    async changeCollege(college) {
      const { data: res } = await this.$http.put(`users/${this.user.id}/update_user/`,{
        targetCollege:college.targetCollege
      })
      if (res.code === 1) {
        this.$toast.success("添加成功");
        localStorage.setItem("user", JSON.stringify(this.user))
        this.user = res.data
        this.setUser(res.data)
        this.lgActive = 0;
      } else if (res.code === 0) {
        this.$toast.fail("添加失败");
      }
      this.targetCollegeShow=false
    },
    // async getCollege(year, page, ordering) {
    //   const { data: res } = await this.$http.get(
    //     `${year}/`,{
    //         page:page,
    //         ordering:ordering,
    //     }
    //   );
    //   if (res.code === 1) {
    //     this.collegeList = this.collegeList.concat(res.data);
    //     console.log(this.collegeList);
    //   } else if (res.code === 0) {
    //     this.$toast.fail("数据获取失败");
    //   }
    // },
    showPopup() {
      this.show = true;
    },
    onConfirm(value, index) {
      switch (index) {
        case 0:
          this.year = "seventeen";
          break;
        case 1:
          this.year = "eighteen";
          break;
        case 2:
          this.year = "nineteen";
          break;
        case 3:
          this.year = "twenty";
          break;
      }
      this.collegeList.splice(0, this.collegeList.length);
      this.page = 1;
      this.getCollege(this.year, this.page, this.ordering);
      this.show = false;
    },
    onChange(picker, value, index) {},
    onCancel() {
      this.show = false;
    },
    onLoad() {
      this.loading = true;
      this.page++;
      this.getCollege(this.year, this.page, this.ordering);
      this.loading = false;
    },
    backTop() {
      const that = this;
      let timer = setInterval(() => {
        let ispeed = Math.floor(-that.scrollTop / 5);
        document.documentElement.scrollTop = document.body.scrollTop =
          that.scrollTop + ispeed;
        if (that.scrollTop === 0) {
          clearInterval(timer);
        }
      }, 16);
    },
    scrollToTop() {
      const that = this;
      let scrollTop =
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop;
      that.scrollTop = scrollTop;
      if (that.scrollTop > 60) {
        that.btnFlag = true;
      } else {
        that.btnFlag = false;
      }
    },
    searchCollegeDetail() {
      this.loading = true;
      this.collegeList.splice(0, this.collegeList.length);
      this.getCollegeDetail(this.year);
      this.loading = false;
    },
    login() {
      const token = window.localStorage.getItem("token");
      if (token) {
        this.user = window.localStorage.getItem("user");
        this.user = JSON.parse(this.user);
        this.isLogin = 200;
      }
    },
    addTargetCollege(college){
      if(this.isLogin == 200){
        this.user.targetCollege = college
        this.setUser(this.user)
        console.log(this.userInfo);
        this.changeCollege(this.user);
        this.$toast.success(`修改目标院校:${college}`);
      }
    }
  },
  created() {
    this.page = 1;
    this.login();
    this.getCollege(this.year, this.page, this.ordering);
  },

  mounted() {
    window.addEventListener("scroll", this.scrollToTop);
  },
  destroyed() {
    window.removeEventListener("scroll", this.scrollToTop);
  },
  computed:{
    ...mapState(['userInfo'])
  },
  watch: {
    ordering(newRadio) {
      this.collegeList.splice(0, this.collegeList.length);
      this.getCollege(this.year, 1, newRadio);
      console.log(newRadio);
    },
  },
  components: { Swipe },
};
</script>

<style scoped lang="less">
.collegeTitle {
  .van-radio {
    font-size: 0.5rem;
  }
}
.collegeList {
  .collegeItemHeader {
    background-color: #3598fe;
    margin: 1rem auto;
    width: 80%;
    height: 2rem;
    text-align: center;
    border-radius: 1rem;
    padding: 1rem;
    color: #ffffff;
    font-style: "微软雅黑";
    font-weight: 700;
    .van-row {
      margin-top: 0.5rem;
    }
  }
  .collegeItem {
    background-color: #ffffff;
    margin: 1rem auto;
    width: 80%;
    height: 5rem;
    text-align: center;
    border-radius: 1rem;
    padding: 1rem;
    .van-row {
      margin-top: 2rem;
    }
  }
}
.backTop {
  position: fixed;
  z-index: 9;
  bottom: 4rem;
  right: 1rem;
  img {
    width: 2rem;
  }
}
</style>
