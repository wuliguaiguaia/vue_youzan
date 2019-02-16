<template>
  <div class="swiper-container">
    <div class="swiper-wrapper">
      <!-- Slides -->
      <div class="swiper-slide" v-for="(list,index) in lists" :key="index">
        <a :href="list.clickUrl">
          <img :src="list.img" alt>
        </a>
      </div>
    </div>
    <div class="swiper-pagination"></div>
  </div>
</template>
<script>
import Swiper from "swiper";
import "swiper/dist/css/swiper.min.css";
export default {
  props: {
    lists: {
      type: Array,
      require: true
    }
  },
  created() {
  },
  mounted() {
    this.$nextTick(()=>{
      new Swiper(".swiper-container", {
        loop: true,
        pagination: {
          el: ".swiper-pagination"
        }
      });
    })
  }
};
</script>

<style lang="scss" scoped>
.swiper-container {
  width: 100vw;
}
.swiper-slide img {
  width: 100%;
  height: 100%;
}
</style>

    
