

<template>
  <div id="app">
      <router-view v-if="flag"></router-view>
      <index v-else></index>
      <!-- <router-view v-if="flag"></router-view>
      <div class="mask" v-else >
        <button @click="flag=true">点击进入商城 ></button>
      </div> -->
  </div>
</template>
<script>
import index from "@/page/index/index";
export default {
  name: "app",
  data(){
    return {
      flag:false
    }
  },
  components:{index},
   created(){
     setTimeout(() => {
        this.flag = true
     },0);
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