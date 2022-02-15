<template>
  <div id="module">
      <div class="module-title">
          <slot name="title"></slot>
      </div>
      <div class="module-content">
          <slot name="content"></slot>
      </div>
  </div>
</template>

<script>
export default {
    name:"Module"
}
</script>

<style>
#module{
    width: 100%;
    height: 100%;
}
.module-title{
    color: #fff;
    width: 100%;
    height: 30px;
    border-top-right-radius: 5px;
    border-top-left-radius: 5px;
    background-image: linear-gradient(-225deg, #22E1FF 0%, #1D8FE1 48%, #625EB1 100%);
}
.module-content{
    width: 100%;
    height: 100%;
}
</style>