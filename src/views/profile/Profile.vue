<template>
  <div id="profile">
    <div class="userCard">
      <div class="userInfo" v-show="isLogin == 200">
        <van-row>
          <van-col span="8">
            <van-image
              class="avatar"
              round
              width="5rem"
              height="5rem"
              src="https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fwww.jshddq.net%2FUploadFiles%2Fimg_0_51715546_2816916450_26.jpg&refer=http%3A%2F%2Fwww.jshddq.net&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1622119398&t=161b4266af395dafdc344edc302c0275"
            />
          </van-col>
          <van-col class="username" span="10" offset="4">
            你好,
            {{ user.username }}
          </van-col>
        </van-row>
        <van-row>
          <van-col
            span="15"
            style="text-align: right; color: #403c3b; font-weight: 500"
          >
            目标院校：
          </van-col>
          <van-col span="1"></van-col>
          <van-col span="8">
            <van-tag type="primary" color="#D0D0D0" size="large" 
              style="float:left">{{
              userInfo.targetCollege !== "" ? userInfo.targetCollege 
              : user.targetCollege !== "" ? user.targetCollege
              : "暂无目标"
            }}</van-tag>
            <van-button
              style="float:left;margin-left: 0.1rem;"
              :icon="user.targetCollege !== ''?'replay':'plus'"
              type="primary"
              size="mini"
              color="#3598FE"
              @click="targetCollegeShow = true"
            />
            <van-overlay :show="targetCollegeShow" @click="targetCollegeShow = false">
              <div class="wrapper" @click.stop>
                <div class="block">
                  <van-form @submit="changeCollege">
                <van-field
                  v-model="user.targetCollege"
                  name="targetCollege"
                  label="目标院校"
                  placeholder="请输入"
                />
                  <van-button round block type="info" native-type="submit"
                    >提交</van-button
                  >
              </van-form>
                </div>
              </div>
              
            </van-overlay>
          </van-col>
        </van-row>
        <van-row style="margin-top:0.1rem">
          <van-col
            span="15"
            style="text-align: right; color: #403c3b; font-weight: 500"
          >
            理想成绩：
          </van-col>
          <van-col span="1"></van-col>
          <van-col span="8">
            <van-tag type="primary" color="#D0D0D0" size="large" 
              style="float:left;">{{
              user.targetScore !== "" ? user.targetScore+"分" : "暂无成绩"
            }}</van-tag>
            <van-button
              style="float:left;margin-left: 0.1rem;"
              :icon="user.targetScore !== ''?'replay':'plus'"
              type="primary"
              size="mini"
              color="#3598FE"
              @click="targetScoreShow = true"
            />
            <van-overlay :show="targetScoreShow" @click="targetScoreShow = false">
              <div class="wrapper" @click.stop>
                <div class="block">
                  <van-form @submit="changeTargetScore">
                <van-field
                  v-model="user.targetScore"
                  name="targetScore"
                  label="理想成绩"
                  placeholder="请输入"
                />
                  <van-button round block type="info" native-type="submit"
                    >提交</van-button
                  >
              </van-form>
                </div>
              </div>
              
            </van-overlay>
          </van-col>
        </van-row>
        <van-row style="margin-top:0.1rem">
          <van-col
            span="15"
            style="text-align: right; color: #403c3b; font-weight: 500"
          >
            当前成绩：
          </van-col>
          <van-col span="1"></van-col>
          <van-col span="8">
            <van-tag type="primary" color="#D0D0D0" size="large" 
              style="float:left;">{{
              user.currentScore !== "" ? user.currentScore+"分" : "暂无成绩"
            }}</van-tag>
            <van-button
              style="float:left;margin-left: 0.1rem;"
              :icon="user.currentScore !== ''?'replay':'plus'"
              type="primary"
              size="mini"
              color="#3598FE"
              @click="currentScoreShow = true"
            />
            <van-overlay :show="currentScoreShow" @click="currentScoreShow = false">
              <div class="wrapper" @click.stop>
                <div class="block">
                  <van-form @submit="changeCurrentScore">
                <van-field
                  v-model="user.currentScore"
                  name="currentScore"
                  label="当前成绩"
                  placeholder="请输入"
                />
                  <van-button round block type="info" native-type="submit"
                    >提交</van-button
                  >
              </van-form>
                </div>
              </div>
              
            </van-overlay>
          </van-col>
        </van-row>
      </div>
      <van-empty class="unLogin" description="尚未登录" v-show="isLogin == 400">
        <van-button
          round
          type="danger"
          class="bottom-button"
          url="/login"
          style="background-color: #1d8fe1; border: none; color: white"
          >登录
        </van-button>
      </van-empty>
    </div>
    <van-cell title="天梯榜" icon="friends-o" style="margin-top:5rem" @click="usersList" />
    <van-cell title="设置" icon="setting-o" url="/home" />
    <van-cell title="退出" icon="close" url="/profile" @click="logout" />
  </div>
</template>

<script>
import { mapState,mapMutations } from 'vuex';
export default {
  name: "Profile",
  components: {},
  data() {
    return {
      list: {},
      isLogin: 400, //400为未登录,200为登录
      isLoadingShow: false,
      user: {},
      targetCollegeShow:false,
      targetScoreShow:false,
      currentScoreShow: false,
    };
  },
  computed: {
    ...mapState(['userInfo'])
  },
  methods: {
    ...mapMutations(['setUser']),
    login() {
      const token = window.localStorage.getItem("token");
      if (token) {
        this.user = window.localStorage.getItem("user");
        this.user = JSON.parse(this.user);
        this.isLogin = 200;
      }
    },
    logout() {
      window.localStorage.clear();
      this.isLogin = 400;
      this.$toast.success("退出成功");
    },
    async changeCollege(values) {
      const { data: res } = await this.$http.put(`users/${this.user.id}/update_user/`,{
        targetCollege:values.targetCollege
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
    async changeTargetScore(values) {
      const { data: res } = await this.$http.put(`users/${this.user.id}/update_user/`,{
        targetScore:values.targetScore
      })
      if (res.code === 1) {
        this.$toast.success({
          message:"添加成功"
          });
        localStorage.setItem("user", JSON.stringify(this.user))
        this.user = res.data
        this.setUser(res.data)
        this.lgActive = 0;
      } else if (res.code === 0) {
        this.$toast.fail("添加失败");
      }
      this.targetScoreShow=false
    },
    async changeCurrentScore(values) {
      const { data: res } = await this.$http.put(`users/${this.user.id}/update_user/`,{
        currentScore:values.currentScore
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
      this.currentScoreShow=false
    },
    usersList(){
      if(this.user.targetCollege == ""){
        this.$toast.fail("请先添加目标院校")
        this.targetCollegeShow=true
      }else if(this.userInfo.targetCollege !== ""){
        this.$router.push({  //核心语句
               path:'/users',   //跳转的路径
               query:{           //路由传参时push和query搭配使用 ，作用时传递参数
                targetCollege:this.userInfo.targetCollege
               }
           })
      }else if(this.user.targetCollege !== ""){
        this.$router.push({  //核心语句
               path:'/users',   //跳转的路径
               query:{           //路由传参时push和query搭配使用 ，作用时传递参数
                targetCollege:this.user.targetCollege
               }
           })
      }
    }
  },
  created() {
    this.login();
  },
};
</script>

<style lang="less" scoped>
.bottom-button {
  width: 10rem;
  height: 2.5rem;
  color: white;
}
.userCard {
  position: relative;
  .userInfo {
    height: 8rem;
    position: relative;
    .van-button {
      float: left;
    }
    .wrapper {
      position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%,-50%);
      height: 5rem;
      width: 20rem;
    }
    .block {
    width: 20rem;
    height: 5rem;
    background-color: #fff;
    .van-button{
      width: 7rem;
      height: 2rem;
    }
  }
  }
  .unLogin {
    height: 20rem;
    padding: 0;
  }
  .avatar {
    float: right;
    margin-top: 1rem;
  }
  .username {
    font-size: 1.5rem;
    margin-top: 3rem;
  }
  .van-loading {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }
}
</style>