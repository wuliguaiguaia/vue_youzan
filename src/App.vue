

<template>
  <div id="app">
      <router-view></router-view>
  </div>
</template>
<script>
export default {
  name: "app",
  data(){
    return {
      flag:false,
      showFoot:true
    }
  },
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