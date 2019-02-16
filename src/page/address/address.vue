<template>
  <div class="container">
    <transition name="slide">
    <router-view></router-view>
      </transition> 
  </div>
</template>
<script>
export default {};
</script>
<style lang="scss" scoped>
@import url('./address_base.scss');
@import url('./address.scss');
.slide-enter{
  transform:translateX(-100%);
}
.slide-enter-to{
  transform:translateX(0);
  transition: transform 500ms;
}
.slide-leave-to{
  transform:translateX(100%);
  transition: transform  50ms;
}
</style>


