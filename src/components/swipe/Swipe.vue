<template>
  <div>
      <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
        <van-swipe-item v-for="(item,index) in swipeImage" :key="index">
            <img v-lazy="item" />
        </van-swipe-item>
      </van-swipe>
  </div>
</template>

<script>
export default {
  name:"Swipe",
  data(){
    return{
      swipeImage:[
        'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=2509256550,1525114671&fm=26&gp=0.jpg',
        'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=2281013845,304616971&fm=26&gp=0.jpg',
        'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=2571035762,637178437&fm=26&gp=0.jpg',
        'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fbpic.588ku.com%2FTemplet_origin_pic%2F04%2F75%2F51%2F5491ea27ae0a7485f6f0efee662a4eb6.jpg%21r850%2Ffw%2F800%2Fquality%2F90%2Funsharp%2Ftrue%2Fcompress%2Ftrue&refer=http%3A%2F%2Fbpic.588ku.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1622430767&t=c7d2262dfdcb27de9db30511cc904a57'
      ]
    }
  }

}
</script>

<style lang="less" scoped>
.my-swipe .van-swipe-item {
    color: #fff;
    overflow: hidden;
    height: 12rem;
    img{
      width: 100%;
      height: 100%;
    }
  }

</style>