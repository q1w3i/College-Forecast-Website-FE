<template>
  <div>
      <van-nav-bar title="高考先知">
          <slot slot="left" name="left"></slot>
      </van-nav-bar>
  </div>
</template>

<script>
export default {
  methods: {

  },
  
};
</script>

<style lang="less" scoped>
.van-nav-bar{
    background-color: #105cfb;
    /deep/.van-ellipsis{
        color: #fff;
    }
    position: fixed;
    top: 0;
    width: 100%;
}
</style>