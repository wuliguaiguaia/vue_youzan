<template>
<div class="container"> 
    <div class="content">
      <div class="user-infos">
        <div class="pull-left avatar">
          <div class="img"></div>
        </div>
        <div class="pull-left desc">
          <p>Alias
          </p>
        </div>
      </div>
      <div class="order-related">
        <ul class="uc-order list-horizon clearfix js-order-overview">
          <li>
            <a class="link clearfix relative link-topay" data-for="topay">
              <p class="title-info c-black font-size-12">待付款</p>
            </a>
          </li>
          <li>
            <a class="link clearfix relative link-totuan" data-for="totuan">
              <p class="title-info c-black font-size-12">待接单</p>
            </a>
          </li>
          <li>
            <a class="link clearfix relative link-tosend" data-for="tosend">
              <p class="title-info c-black font-size-12">待发货</p>
            </a>
          </li>
          <li>
            <a class="link clearfix relative link-send" data-for="send">
              <p class="title-info c-black font-size-12">待收货</p>
            </a>
          </li>
          <li>
            <a class="link clearfix relative link-rights">
              <p class="title-info c-black font-size-12">退款/维权</p>
            </a>
          </li>
        </ul>
        <div class="block block-list list-vertical">
          <a class="block-item link clearfix ico-order">
            <p class="title-info c-black font-size-14">全部订单</p>
          </a>
        </div>
        <div class="block block-list list-vertical">
          <a class="block-item link clearfix ico-favior js-login">
            <p class="title-info c-black font-size-14">收藏的商品</p>
          </a>
          <a class="block-item link clearfix ico-shop js-login">
            <p class="title-info c-black font-size-14">收藏的店铺</p>
          </a>
          <a class="block-item link clearfix ico-bought js-login">
            <p class="title-info c-black font-size-14">我买过的</p>
          </a>
          <a class="block-item link clearfix ico-history js-login">
            <p class="title-info c-black font-size-14">我的浏览记录</p>
          </a>
        </div>
        <div class="block block-list list-vertical">
          <a class="block-item link clearfix ico-card">
            <p class="title-info c-black font-size-14">我的会员卡</p>
          </a>
          <a class="block-item link clearfix ico-coupon">
            <p class="title-info c-black font-size-14">我的优惠券</p>
          </a>
          <a class="block-item link clearfix ico-luckymoney hide">
            <p class="title-info c-black font-size-14">我的红包</p>
          </a>
          <a class="block-item link clearfix ico-backs">
            <p class="title-info c-black font-size-14">我的返现</p>
          </a>
        </div>
        <div class="block block-list list-vertical">
          <router-link :to="{name:'addressAll'}" class="block-item link clearfix ico-setting js-login">
            <p class="title-info c-black font-size-14">地址管理</p>
          </router-link>
          <a class="block-item link clearfix ico-help">
            <p class="title-info c-black font-size-14">联系有赞客服</p>
          </a>
        </div>
      </div>
    </div>
  <foot :title.sync="title"></foot>
</div>
</template>
<script>
import foot from "@/components/foot";
// import bus from "js/bus";
export default {
    data(){
      return{
        title:"hello"
      }
    },
    components:{foot},
}
</script>

<style lang="scss">
@import url("./member.scss");
.title-info{
  text-align: left;
}
</style>
