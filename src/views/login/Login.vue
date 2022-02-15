<template>
  <div>
    <van-tabs v-model="lgActive" animated>
      <!-- 登录tabs -->
      <van-tab title="登录">
        <van-divider
          :style="{
            color: '#1989fa',
            borderColor: '#105cfb',
            padding: '0 16px',
          }"
        >
          <img src="../../assets/img/logo.png" alt="" style="width: 50px" />
        </van-divider>
        <van-form @submit="loginSubmit">
          <van-field
            v-model="user.id"
            maxlength="11"
            name="id"
            label="用户名"
            placeholder="用户名"
            :rules="[{ required: true, message: '请填写用户名' }]"
          />
          <van-field
            v-model="user.password"
            maxlength="16"
            minlength="6"
            type="password"
            name="password"
            label="密码"
            placeholder="密码"
            :rules="[{ required: true, message: '请填写密码' }]"
          />
          <div style="margin: 16px">
            <van-button
              round
              block
              type="info"
              native-type="submit"
              link="/home"
              >登录</van-button
            >
          </div>
        </van-form>
      </van-tab>
      <!-- 注册tabs -->
      <van-tab title="注册">
        <van-divider
          :style="{
            color: '#1989fa',
            borderColor: '#105cfb',
            padding: '0 16px',
          }"
        >
          <img src="../../assets/img/logo.png" alt="" style="width: 50px" />
        </van-divider>
        <van-form @submit="registerSubmit">
          <van-field
            v-model="user.id"
            maxlength="11"
            name="id"
            label="用户名"
            placeholder="用户名"
            :rules="[{ required: true, message: '请填写用户名' }]"
          />
          <van-field
            v-model="user.username"
            maxlength="11"
            name="username"
            label="昵称"
            placeholder="昵称"
            :rules="[{ required: true, message: '请填写昵称' }]"
          />
          <van-field
            v-model="user.password"
            maxlength="16"
            minlength="6"
            type="password"
            name="password"
            label="密码"
            placeholder="密码"
            :rules="[{ required: true, message: '请填写密码' }]"
          />
          <van-field
            v-model="user.email"
            maxlength="25"
            name="email"
            label="电子邮箱"
            placeholder="电子邮箱"
            :rules="[
              { required: true, message: '请填写电子邮箱' },
              {
                pattern: /^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/,
                message: '邮箱格式错误！',
              },
            ]"
          />
          <div style="margin: 16px">
            <van-button round block type="info" native-type="submit"
              >注册</van-button
            >
          </div>
        </van-form>
      </van-tab>
    </van-tabs>
  </div>
</template>
<script type="text/ecmascript-6">
import { MD5 } from "../../utils/md5.js";
export default {
  data() {
    return {
      user: {},
      lgActive: 0,
    };
  },
  components: {},
  methods: {
    async registerSubmit(values) {
      const { data: res } = await this.$http.post("users/", values);
      if (res.code === 1) {
        this.$toast.success("注册成功");
        this.lgActive = 0;
      } else if (res.code === 0) {
        this.$toast.fail("注册失败");
      }
    },
    async loginSubmit(values) {
      const { data: res } = await this.$http.post("login/", {
        id: values.id,
        password: MD5(values.password),
      });

      if (res.code === 1) {
        this.user = res.data;
        window.localStorage.setItem("token", res.token);
        window.localStorage.setItem("user", JSON.stringify(this.user));
        this.$toast.success("登录成功");
         this.$router.push({  //核心语句
               path:'/profile',   //跳转的路径
               query:{           //路由传参时push和query搭配使用 ，作用时传递参数
               active:1 ,
               }
           })
      } else{
        this.$toast.fail("登陆失败");
      }
    },

  },
};
</script>

<style scoped lang="less">
/deep/.van-tabs__line {
  background-color: #105cfb;
}
</style>
