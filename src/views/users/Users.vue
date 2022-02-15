<template>
  <div id="users">
    <navbar>
      <div slot="left" class="return" @click="prev">
        <van-icon name="arrow-left" color="#FFF" size="0.9rem"/>
        <div class="returnText">返回</div>
        </div>
    </navbar>
    <div class="collegeTitle">
      <van-row>
        <van-col span="8"><van-tag color="#ee0a24" size="large" text-color="#ffffff">天梯榜</van-tag></van-col>
        <van-col span="8"><van-tag color="#3598FE" size="large" text-color="#ffffff">{{ targetCollege }}</van-tag></van-col>
        <van-col span="8"></van-col>
      </van-row>
      <van-notice-bar color="#1989fa" background="#ecf9ff" scrollable left-icon="info-o">
  天梯榜采用的是当前成绩的排名哦!
</van-notice-bar>
    </div>
    <div class="usersList">
      <div class="list" v-for="(item, index) in usersList" :key="index">
        <div class="listItem">
          <van-row>
            <van-col span="8"><van-tag round type="primary">{{index+1}}</van-tag></van-col>
            <van-col span="8">{{ item.username }}</van-col>
            <van-col span="8" v-if="item.currentScore"
              >
              {{ item.currentScore }}分</van-col
            >
            <van-col span="8" v-else>暂无数据</van-col>
          </van-row>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import Navbar from '../../components/navbar/Navbar'
export default {
  name: "Users",
  data() {
    return {
      usersList: [],
      loading: false,
      finished: false,
      targetCollege: this.$route.query.targetCollege,
    };
  },
  components: {
    Navbar,
  },
  methods: {
    async Usersload() {
      const { data: res } = await this.$http.get("users/?ordering=-currentScore");
      if (res.code === 1) {
        var that = this;
        this.usersList = res.data.filter(function (x) {
          return x.targetCollege == that.$route.query.targetCollege;
        });
        console.log(this.usersList);
      }
    },
    prev(){
      this.$router.go(-1)
    }
  },
  created() {
    this.Usersload();
  },
};
</script>

<style scoped lang="less">
.return{
  font-size: 0.9rem;
  color: #ffffff;
  .van-icon{
    float: left;
    margin-top: 0.7rem;
  }
  .returnText{
    float: left;
    margin-top: 0.5rem;
  }
}
.collegeTitle {
  text-align: center;
  position: fixed;
  top: 2.9rem;
  z-index: 9;
  width: 100%;
  background-color: #E6E6E6;
  height: 2.5rem;
  line-height: 2.5rem;
}
.usersList {
  margin-top: 8rem;
  text-align: center;
  .listItem{
    padding: 0.5rem;
    width: 90%;
    margin: 0.5rem auto 0.5rem auto;
    border-bottom: #E6E6E6 0.01rem solid;
  }
}
</style>
