
<template>
  <div>
    <van-tabbar 
    v-model="active"
    :fixed="true">
    <van-tabbar-item icon="chart-trending-o" replace to="/home">预测</van-tabbar-item>
    <van-tabbar-item icon="home-o" replace to="/college">院校库</van-tabbar-item>
    <van-tabbar-item icon="friends-o" replace to="/profile">我的</van-tabbar-item>
</van-tabbar>
  </div>
</template>

<script>
export default {
    name:"Tabbar",
    data() {
        return {
        active: 0,
        };
    },
    watch:{
  $route(to,from){
    if(to.path=='/profile'){
      this.active=2
    }else if(to.path=='/home'){
      this.active=0
    }else if(to.path=='/college'){
      this.active=1
    }
  }
},
}

</script>
<style lang='less' scoped>

</style>