<template>
<div class="container"> 
    <div class="content">
      <div class="user-infos">
        <div class="pull-left avatar">
          <div class="img">
            <img src="./../../assets/avator.jpg" alt="">
          </div>
        </div>
        <div class="pull-left desc">
          <p>Alias
          </p>
        </div>
      </div>
      <div class="order-related">
        <ul class="uc-order list-horizon clearfix js-order-overview">
          <li>
            <a class="link clearfix relative link-topay" data-for="topay" href="" target="_blank">
              <p class="title-info c-black font-size-12">待付款</p>
            </a>
          </li>
          <li>
            <a class="link clearfix relative link-totuan" data-for="totuan" href="" target="_blank">
              <p class="title-info c-black font-size-12">待接单</p>
            </a>
          </li>
          <li>
            <a class="link clearfix relative link-tosend" data-for="tosend" href="" target="_blank">
              <p class="title-info c-black font-size-12">待发货</p>
            </a>
          </li>
          <li>
            <a class="link clearfix relative link-send" data-for="send" href="" target="_blank">
              <p class="title-info c-black font-size-12">待收货</p>
            </a>
          </li>
          <li>
            <a class="link clearfix relative link-rights" href="" target="_blank">
              <p class="title-info c-black font-size-12">退款/维权</p>
            </a>
          </li>
        </ul>
        <div class="block block-list list-vertical">
          <a class="block-item link clearfix ico-order" href="" target="_blank">
            <p class="title-info c-black font-size-14">全部订单</p>
          </a>
        </div>
        <div class="block block-list list-vertical">
          <a class="block-item link clearfix ico-favior js-login" href="" target="_blank">
            <p class="title-info c-black font-size-14">收藏的商品</p>
          </a>
          <a class="block-item link clearfix ico-shop js-login" href=" " target="_blank">
            <p class="title-info c-black font-size-14">收藏的店铺</p>
          </a>
          <a class="block-item link clearfix ico-bought js-login" href=" " target="_blank">
            <p class="title-info c-black font-size-14">我买过的</p>
          </a>
          <a class="block-item link clearfix ico-history js-login" href=" " target="_blank">
            <p class="title-info c-black font-size-14">我的浏览记录</p>
          </a>
        </div>
        <div class="block block-list list-vertical">
          <a class="block-item link clearfix ico-card" href=" " target="_blank">
            <p class="title-info c-black font-size-14">我的会员卡</p>
          </a>
          <a class="block-item link clearfix ico-coupon" href=" " target="_blank">
            <p class="title-info c-black font-size-14">我的优惠券</p>
          </a>
          <a class="block-item link clearfix ico-luckymoney hide" href=" " target="_blank">
            <p class="title-info c-black font-size-14">我的红包</p>
          </a>
          <a class="block-item link clearfix ico-backs" href=" " target="_blank">
            <p class="title-info c-black font-size-14">我的返现</p>
          </a>
        </div>
        <div class="block block-list list-vertical">
          <router-link :to="{name:'addressAll'}" class="block-item link clearfix ico-setting js-login">
            <p class="title-info c-black font-size-14">地址管理</p>
          </router-link>
          <a class="block-item link clearfix ico-help" href=" " target="_blank">
            <p class="title-info c-black font-size-14">联系有赞客服</p>
          </a>
        </div>
      </div>
    </div>
  <foot :title.sync="title"></foot>
</div>
</template>
<script>
import foot from "components/foot";
// import "./member_base.scss";
import "./member.scss";
import bus from "js/bus";
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
.content{
}
</style>
