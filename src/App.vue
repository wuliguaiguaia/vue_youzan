

<template>
  <div id="app">
      <router-view></router-view>
  </div>
</template>
<script>
import index from "@/page/index/index";
import foot from "@/components/foot";
export default {
  name: "app",
  data(){
    return {
      flag:false,
      showFoot:true
    }
  },
  watch:{
    // <index></index>
    // <foot v-show="showFoot"></foot>
    // '$route'(val){
    //   if(val.name===("addressAll" ||"addressEdit" || "shopcar" || "goodDetail" || "shopDetail" || "search" || "pay")){
    //     this.showFoot = false;
    //   }
    // }
  },
  components:{foot,index}
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
.mask{
  width: 100vw;
  height: 100vh;
  background-color: cornflowerblue;
  display: flex;
  align-items: center;
  justify-content: center;
  button{
        color: #fff;
    border: none;
    padding: 10px 15px;
    background: #585454;
    font-size: 14px;
  }
}
</style>