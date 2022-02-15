<template>
  <div class="gradeTable">
            <van-row type="flex" style="background-color:#FAFAFA;color:#5772C7">
              <van-col span="6">年份</van-col>
              <van-col span="6">一段线</van-col>
              <van-col span="6">二段线</van-col>
              <van-col span="6">三段线</van-col>
            </van-row>
            <van-row
              v-for="(item, index) in this.grade"
              :key="index"
              gutter="20"
            >
              <van-col span="6">{{ item.year }}</van-col>
              <van-col span="6">{{ item.bk1 }}</van-col>
              <van-col span="6">{{ item.bk2 }}</van-col>
              <van-col span="6">{{ item.bk3 }}</van-col>
            </van-row>
          </div>
</template>

<script type="text/ecmascript-6">
import { mapState } from "vuex";
export default {
  data() {
    return {

    }
  },
  components: {

  },
    computed: {
    ...mapState(["grade"]),
  },
}
</script>

<style scoped lang="less">
.gradeTable {
    text-align: center;
    line-height: 2.4rem;
  }
</style>
