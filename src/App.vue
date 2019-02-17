

<template>
  <div id="app">
      <index v-if="flag"></index>
      <router-view v-else></router-view>
  </div>
</template>

<script>
import index from "page/index/index";
export default {
  name: "app",
  data(){
    return {
      flag:true
    }
  },
  components:{index},
  watch:{
    '$route'(val,oval){
      console.log(1)
      this.flag = false;
    }
  }
};
</script>

<style lang="scss">
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>