<template>
  <div id="app">
    <navbar>
      <template #left>
      </template>
    </navbar>
    <div class="view">
          <keep-alive exclude="Users">
      <router-view/>
    </keep-alive>
    </div>
    <tabbar></tabbar>
  </div>
</template>
<script>
import Tabbar from './components/tabbar/Tabbar'
import Navbar from './components/navbar/Navbar'
export default {
    components:{
      Tabbar,
      Navbar
    },
    data(){
        return{
            list:{}
        }
    },
    methods:{
    },
    created(){

    }

}

</script>


<style lang="less">
@import "assets/css/base.css";
.view{
  margin-top: 2.9rem;
}
</style>
