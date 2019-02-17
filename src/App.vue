<template>
  <div id="app">
    <div class=""> 
      xxxxxa
      <router-view></router-view>
    </div>
    <foot></foot>
  </div>
</template>

<script>
import foot from "components/foot";
export default {
  name: "app",
  components:{foot}
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
