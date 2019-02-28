<template>
  <div>
    <a @click="$router.push({path: '/goodDetail/:id',params:{id:good.id}})" class="content">
      <div class="thumb badge center-img">
        <img :src="good.img">
        <span class="num">{{index+1}}</span>
      </div>
      <div class="detail">
        <div class="title">{{good.name}}</div>
        <div class="price">{{good.price | formatePrice}}</div>
        <div class="recommend">
          <span>推荐值:</span>
          <span>{{good.recommend}}</span>
        </div>
      </div>
    </a>
  </div>
</template>
<script>
import mixin from "js/mixin.js";
export default {
  props: ["good", "index"],
  data() {
    return {};
  },
  mixins: [mixin],
};
</script>
<style lang="scss" scoped>
.content {
  display: block;
}
.thumb {
  margin-bottom: 6px;
  text-align: center;
  background-color: #f4f4f4;
  position: relative;

  &:after {
    content: " ";
    display: block;
    padding-top: 100%;
  }

  img {
    position: absolute;
    margin: auto;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    max-width: 100%;
    max-height: 100%;
  }
}

.detail .title {
  padding-bottom: 8px;
  font-size: 12px;
  line-height: 1;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
}

.detail .price {
  padding-bottom: 8px;
  font-size: 14px;
  color: #ff525e;
}
</style>


