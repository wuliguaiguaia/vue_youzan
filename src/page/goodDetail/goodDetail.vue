<template>
  <div class="body-fixed-bottom default-theme">
    <div v-if="GOOD" v-cloak>
      <div class="container wap-goods internal-purchase">
        <div class="content no-sidebar">
          <div class="content-body">
            <div>
              <swiper :lists="goodbannerList" v-if="goodbannerList"></swiper>
            </div>
            <div class="goods-header">
              <h2 class="title" v-cloak>{{GOOD.title}}</h2>
              <span
                class="hide js-add-wish js-wish-animate wish-add font-size-12 tag tag-redf30 pull-right"
              >喜欢</span>
              <div class="goods-price">
                <div class="current-price">
                  <span>¥</span>
                  <i class="js-goods-price price">{{GOOD.price}}</i>
                </div>
                <span class="btn btn-blue btn-retail hide js-retail-btn">门店有售</span>
                <div class="original-price">¥{{GOOD.originalPrice}}</div>
              </div>
              <hr class="with-margin-l">
              <div class="stock-detail">
                <dl>
                  <dt>运费:</dt>
                  <dd class="js-postage-desc" data-postage="免运费">{{GOOD.postage}}</dd>
                </dl>
                <dl>
                  <dt>剩余:</dt>
                  <dd>{{GOOD.remain}}</dd>
                </dl>
                <dl>
                  <dt>销量:</dt>
                  <dd>{{GOOD.sales}}</dd>
                </dl>
              </div>
            </div>
            <div class="sku-detail adv-opts" @click="chooseSku(1)">
              <div class="sku-detail-inner adv-opts-inner">
                <dl class="sku-group select-sku js-select-sku">
                  <dt>
                    <span class="js-sku-label">选择</span>：
                  </dt>
                  <dd class="js-sku-value">
                    <span class="sku-item">净含量</span>
                  </dd>
                </dl>
              </div>
            </div>
            <div class="js-store-info">
              <div class="block block-list goods-store">
                <div class="custom-store block-item">
                  <a class="custom-store-link clearfix" href>
                    <div class="custom-store-img"></div>
                    <div class="custom-store-name">{{GOOD.storeName}}</div>
                    <span class="custom-store-enter">进入店铺</span>
                  </a>
                </div>
                <a class="offline-store block-item js-retail-store hide">
                  <span class="offline-store-img"></span>
                  <span class="offline-store-name">线下门店</span>
                  <div class="offline-store-branch js-retail-store-name"></div>
                </a>
                <div class="renzheng block-item">
                  <span
                    class="js-rz-item-alert rz-item"
                    v-for="(item,index) in GOOD.identification"
                    :key="index"
                  >
                    <span class="rz-name font-size-12 c-gray-darker">{{item}}</span>
                  </span>
                </div>
              </div>
            </div>
            <a class="js-package-buy-block hide"></a>
            <div class="js-detail-container">
              <div class="js-tabber-container goods-detail">
                <div class="js-tabber tabber tabber-n2 clearfix orange">
                  <button
                    :class="{active:index === curIndex}"
                    @click="toggleMainTab(index)"
                    v-for="(tab,index) in mainTab"
                    :key="index"
                  >{{tab}}</button>
                </div>
                <div class="js-tabber-content">
                  <div class="js-part hide" data-type="sales">
                    <div class="js-traderecord-list block-list-traderecord">
                      <div class="list-header">
                        <span class="col-1">买家</span>
                        <span class="col-2 center">成交时间</span>
                        <span class="col-3 center">数量</span>
                      </div>
                      <div class="js-list b-list block block-list"></div>
                    </div>
                  </div>
                  <div
                    class="js-part js-goods-detail goods-tabber-c"
                    v-show="GOOD.description&&curIndex===0"
                    v-html="GOOD.description"
                  ></div>
                  <div class="js-traderecord-list block-list-traderecord" v-show="curIndex===1">
                    <div class="list-header">
                      <span class="col-1">买家</span>
                      <span class="col-2 center">成交时间</span>
                      <span class="col-3 center">数量</span>
                    </div>
                    <div class="js-list b-list block block-list">
                      <li class="block-item" v-for="(deal,index) in goodDeals" :key="index">
                        <span class="col-1 c-gray-darker">{{deal.buyer}}</span>
                        <span class="col-2 c-gray-dark center">{{deal.time}}</span>
                        <span class="col-3 c-gray-darker center">{{deal.num}}</span>
                      </li>
                    </div>
                    <div
                      class="js-show-more-btn block-item center font-size-14 c-gray-darker hide"
                    >查看更多</div>
                  </div>
                </div>
              </div>
            </div>
            <div class="js-bottom-opts js-footer-auto-ele stick-bottom">
              <div class="stick-bottom-icons">
                <a href="javascript:;" class="js-yz-im icons icons-im">店主</a>
                <a href class="js-call-im icons icons-home">店铺</a>
                <a href="javascript:;" class="js-yz-zan icons icons-zan">收藏</a>
              </div>
              <div class="stick-bottom-btns">
                <!-- 尚未开售 -->
                <div class="btn-cart" @click="chooseSku(2)">
                  <a class="js-add-cart" >加入购物车</a>
                </div>
                <div class="btn-buy"  @click="chooseSku(3)">
                  <a class="js-buy-it">立即购买</a>
                </div>
              </div>
            </div>
            <div id="right-icon" class="js-right-icon">
              <div class="js-right-icon-container right-icon-container clearfix">
                <a id="global-cart" href class="icon new s0">
                  <p class="icon-img" @click="$router.push({name:'shopcar'})"></p>
                </a>
                <a class="js-show-more-btn icon show-more-btn"></a>
              </div>
            </div>
            <div class="js-recommend">
              <p class="center font-size-14 c-black">更多精选商品</p>
              <div class="js-recommend-goods-list">
                <ul
                  class="js-goods-list sc-goods-list pic clearfix size-1"
                  data-size="1"
                  data-showtype="card"
                >
                  <!-- 商品区域 -->
                  <!-- 展现类型判断 -->
                  <li class="js-goods-card goods-card small-pic card">
                    <a
                      href
                      class="js-goods link clearfix"
                      target="_blank"
                      data-goods-id="343086880"
                      title="【28号陆续发货】寻找田野|青海有机鲜枸杞 营养价值高安全无农残 吃水果一样吃枸杞"
                    >
                      <div
                        class="photo-block"
                        data-width="750"
                        data-height="750"
                        style="background-color: rgb(255, 255, 255);"
                      >
                        <img
                          class="goods-photo js-goods-lazy"
                          data-src="https://img.yzcdn.cn/upload_files/2017/07/11/FoN0SazpvslhoiiyuHETeyWHqzTE.jpg?imageView2/2/w/280/h/280/q/75/format/webp"
                          src="https://img.yzcdn.cn/upload_files/2017/07/11/FoN0SazpvslhoiiyuHETeyWHqzTE.jpg?imageView2/2/w/280/h/280/q/75/format/webp"
                        >
                      </div>
                      <div class="info clearfix info-title info-price btn0">
                        <p class="goods-title">【28号陆续发货】寻找田野|青海有机鲜枸杞 营养价值高安全无农残 吃水果一样吃枸杞</p>
                        <p class="goods-sub-title c-black hide"></p>
                        <p class="goods-price">
                          <em>¥88.00</em>
                        </p>
                        <p class="goods-price-taobao hide"></p>
                      </div>
                    </a>
                  </li>
                  <li class="js-goods-card goods-card small-pic card">
                    <a
                      href
                      class="js-goods link clearfix"
                      target="_blank"
                      data-goods-id="342718779"
                      title="【米饭版和牛肉版】小龙坎方便火锅 只要一瓶矿泉水就能吃的地道四川火锅"
                    >
                      <div class="photo-block" data-width="0" data-height="0">
                        <img
                          class="goods-photo js-goods-lazy"
                          data-src="https://img.yzcdn.cn/upload_files/2017/07/04/FidWCdQxsEMojh63W8GK016mwPAo.jpg?imageView2/2/w/280/h/280/q/75/format/webp"
                          src="https://img.yzcdn.cn/upload_files/2017/07/04/FidWCdQxsEMojh63W8GK016mwPAo.jpg?imageView2/2/w/280/h/280/q/75/format/webp"
                        >
                      </div>
                      <div class="info clearfix info-title info-price btn0">
                        <p class="goods-title">【米饭版和牛肉版】小龙坎方便火锅 只要一瓶矿泉水就能吃的地道四川火锅</p>
                        <p class="goods-sub-title c-black hide">不用火，不用电，一瓶矿泉水就能吃地道四川火锅</p>
                        <p class="goods-price">
                          <em>¥28.00</em>
                        </p>
                        <p class="goods-price-taobao hide"></p>
                      </div>
                    </a>
                  </li>
                  <li class="js-goods-card goods-card small-pic card">
                    <a
                      href
                      class="js-goods link clearfix"
                      target="_blank"
                      data-goods-id="342676309"
                      title="寻找田野|绍兴黄酒 良宵 2012年古法手工原浆半干黄酒 礼盒装 送礼佳品"
                    >
                      <div class="photo-block" data-width="750" data-height="750">
                        <img
                          class="goods-photo js-goods-lazy"
                          data-src="https://img.yzcdn.cn/upload_files/2017/07/04/Fq1yXSOb84HmElu-Qgrm65EmAeIz.jpg?imageView2/2/w/280/h/280/q/75/format/webp"
                          src="https://img.yzcdn.cn/upload_files/2017/07/04/Fq1yXSOb84HmElu-Qgrm65EmAeIz.jpg?imageView2/2/w/280/h/280/q/75/format/webp"
                        >
                      </div>
                      <div class="info clearfix info-title info-price btn0">
                        <p class="goods-title">寻找田野|绍兴黄酒 良宵 2012年古法手工原浆半干黄酒 礼盒装 送礼佳品</p>
                        <p class="goods-sub-title c-black hide"></p>
                        <p class="goods-price">
                          <em>¥128.00</em>
                        </p>
                        <p class="goods-price-taobao hide"></p>
                      </div>
                    </a>
                  </li>
                  <li class="js-goods-card goods-card small-pic card">
                    <a
                      href
                      class="js-goods link clearfix"
                      target="_blank"
                      data-goods-id="342108270"
                      title="寻找田野|新疆库车小白杏 400g*4盒  长在树上的白色蜂蜜"
                    >
                      <div class="photo-block" data-width="800" data-height="800">
                        <img
                          class="goods-photo js-goods-lazy"
                          data-src="https://img.yzcdn.cn/upload_files/2017/07/12/FhxXtAXp1pEauruMKjw2QZCuCjbQ.jpg?imageView2/2/w/280/h/280/q/75/format/webp"
                          src="https://img.yzcdn.cn/upload_files/2017/07/12/FhxXtAXp1pEauruMKjw2QZCuCjbQ.jpg?imageView2/2/w/280/h/280/q/75/format/webp"
                        >
                      </div>
                      <div class="info clearfix info-title info-price btn0">
                        <p class="goods-title">寻找田野|新疆库车小白杏 400g*4盒 长在树上的白色蜂蜜</p>
                        <p class="goods-sub-title c-black hide"></p>
                        <p class="goods-price">
                          <em>¥118.00</em>
                        </p>
                        <p class="goods-price-taobao">138</p>
                      </div>
                    </a>
                  </li>
                  <li class="js-goods-card goods-card small-pic card">
                    <a
                      href
                      class="js-goods link clearfix"
                      target="_blank"
                      data-goods-id="341654863"
                      title="寻找田野|无锡阳山水蜜桃 可以吸着吃的水蜜桃 单果200g礼盒装顺丰直达"
                    >
                      <div class="photo-block" data-width="800" data-height="800">
                        <img
                          class="goods-photo js-goods-lazy"
                          data-src="https://img.yzcdn.cn/upload_files/2017/07/12/FvDOdNLYTkgPg8_LC16vBTKUkpDp.jpg?imageView2/2/w/280/h/280/q/75/format/webp"
                          src="https://img.yzcdn.cn/upload_files/2017/07/12/FvDOdNLYTkgPg8_LC16vBTKUkpDp.jpg?imageView2/2/w/280/h/280/q/75/format/webp"
                        >
                      </div>
                      <div class="info clearfix info-title info-price btn0">
                        <p class="goods-title">寻找田野|无锡阳山水蜜桃 可以吸着吃的水蜜桃 单果200g礼盒装顺丰直达</p>
                        <p class="goods-sub-title c-black hide"></p>
                        <p class="goods-price">
                          <em>¥178.00</em>
                        </p>
                        <p class="goods-price-taobao hide"></p>
                      </div>
                    </a>
                  </li>
                  <li class="js-goods-card goods-card small-pic card">
                    <a
                      href
                      class="js-goods link clearfix"
                      target="_blank"
                      data-goods-id="340716475"
                      title="认养一头牛 安全无添加的好牛奶/酸奶"
                    >
                      <div class="photo-block" data-width="0" data-height="0">
                        <img
                          class="goods-photo js-goods-lazy"
                          data-src="https://img.yzcdn.cn/upload_files/2017/06/14/FlAhOUgjHk6uwBhTmMW95hHPlVJh.jpg?imageView2/2/w/280/h/280/q/75/format/webp"
                          src="https://img.yzcdn.cn/upload_files/2017/06/14/FlAhOUgjHk6uwBhTmMW95hHPlVJh.jpg?imageView2/2/w/280/h/280/q/75/format/webp"
                        >
                      </div>
                      <div class="info clearfix info-title info-price btn0">
                        <p class="goods-title">认养一头牛 安全无添加的好牛奶/酸奶</p>
                        <p class="goods-sub-title c-black hide"></p>
                        <p class="goods-price">
                          <em>¥60.00</em>
                        </p>
                        <p class="goods-price-taobao hide"></p>
                      </div>
                    </a>
                  </li>
                  <li class="js-goods-card goods-card small-pic card">
                    <a
                      href
                      class="js-goods link clearfix"
                      target="_blank"
                      data-goods-id="339552343"
                      title="新西兰进口佳沛绿奇异果  多规格包邮 单果90g--110g"
                    >
                      <div class="photo-block" data-width="0" data-height="0">
                        <img
                          class="goods-photo js-goods-lazy"
                          data-src="https://img.yzcdn.cn/upload_files/2017/06/02/FlFNqGPuFKS_DlTAoJTcX9VEDv_4.jpg?imageView2/2/w/280/h/280/q/75/format/webp"
                          src="https://img.yzcdn.cn/upload_files/2017/06/02/FlFNqGPuFKS_DlTAoJTcX9VEDv_4.jpg?imageView2/2/w/280/h/280/q/75/format/webp"
                        >
                      </div>
                      <div class="info clearfix info-title info-price btn0">
                        <p class="goods-title">新西兰进口佳沛绿奇异果 多规格包邮 单果90g--110g</p>
                        <p class="goods-sub-title c-black hide"></p>
                        <p class="goods-price">
                          <em>¥35.00</em>
                        </p>
                        <p class="goods-price-taobao hide"></p>
                      </div>
                    </a>
                  </li>
                  <li class="js-goods-card goods-card small-pic card">
                    <a
                      href
                      class="js-goods link clearfix"
                      target="_blank"
                      data-goods-id="339441682"
                      title="四杰克系列葡萄酒 五星酒庄出品 750ML"
                    >
                      <div class="photo-block" data-width="800" data-height="800">
                        <img
                          class="goods-photo js-goods-lazy"
                          data-src="https://img.yzcdn.cn/upload_files/2017/07/12/Fh2E3KeB4j0rAOdILQAC52F_B4hb.jpg?imageView2/2/w/280/h/280/q/75/format/webp"
                          src="https://img.yzcdn.cn/upload_files/2017/07/12/Fh2E3KeB4j0rAOdILQAC52F_B4hb.jpg?imageView2/2/w/280/h/280/q/75/format/webp"
                        >
                      </div>
                      <div class="info clearfix info-title info-price btn0">
                        <p class="goods-title">四杰克系列葡萄酒 五星酒庄出品 750ML</p>
                        <p class="goods-sub-title c-black hide"></p>
                        <p class="goods-price">
                          <em>¥220.00</em>
                        </p>
                        <p class="goods-price-taobao hide"></p>
                      </div>
                    </a>
                  </li>
                  <li class="js-goods-card goods-card small-pic card">
                    <a
                      href
                      class="js-goods link clearfix"
                      target="_blank"
                      data-goods-id="339414742"
                      title="寻找田野|墨西哥进口牛油果 单果140g--180g  6个装 包邮"
                    >
                      <div class="photo-block" data-width="1080" data-height="1080">
                        <img
                          class="goods-photo js-goods-lazy"
                          data-src="https://img.yzcdn.cn/upload_files/2017/07/12/FuDDKJmd-yfvmaDUfk-PO-yETRwZ.jpg?imageView2/2/w/280/h/280/q/75/format/webp"
                          src="https://img.yzcdn.cn/upload_files/2017/07/12/FuDDKJmd-yfvmaDUfk-PO-yETRwZ.jpg?imageView2/2/w/280/h/280/q/75/format/webp"
                        >
                      </div>
                      <div class="info clearfix info-title info-price btn0">
                        <p class="goods-title">寻找田野|墨西哥进口牛油果 单果140g--180g 6个装 包邮</p>
                        <p class="goods-sub-title c-black hide"></p>
                        <p class="goods-price">
                          <em>¥98.00</em>
                        </p>
                        <p class="goods-price-taobao hide"></p>
                      </div>
                    </a>
                  </li>
                  <li class="js-goods-card goods-card small-pic card">
                    <a
                      href
                      class="js-goods link clearfix"
                      target="_blank"
                      data-goods-id="338917983"
                      title="花园系列葡萄酒 五星酒庄出品 750ML"
                    >
                      <div class="photo-block" data-width="800" data-height="800">
                        <img
                          class="goods-photo js-goods-lazy"
                          data-src="https://img.yzcdn.cn/upload_files/2017/07/12/FoCENpKklzLyD5VpWVEtS0_jbGc8.jpg?imageView2/2/w/280/h/280/q/75/format/webp"
                          src="https://img.yzcdn.cn/upload_files/2017/07/12/FoCENpKklzLyD5VpWVEtS0_jbGc8.jpg?imageView2/2/w/280/h/280/q/75/format/webp"
                        >
                      </div>
                      <div class="info clearfix info-title info-price btn0">
                        <p class="goods-title">花园系列葡萄酒 五星酒庄出品 750ML</p>
                        <p class="goods-sub-title c-black hide"></p>
                        <p class="goods-price">
                          <em>¥268.00</em>
                        </p>
                        <p class="goods-price-taobao hide"></p>
                      </div>
                    </a>
                  </li>
                </ul>
              </div>
              <p class="center">
                <a href class="center btn btn-white btn-xsmall font-size-14">进店逛逛&gt;</a>
              </p>
            </div>
          </div>
          <div id="shop-nav"></div>
        </div>
      </div>
      <div class="js-footer">
        <div>
          <div class="footer">
            <div class="copyright">
              <div class="ft-links">
                <a href target="_blank">店铺主页</a>
                <a href target="_blank">会员中心</a>
                <a href="javascript:;" class="js-open-follow">关注我们</a>
                <a href target="_blank">店铺信息</a>
                <!-- 第三方app隐藏topbar时，需要在底部显示购物记录入口 -->
              </div>
              <div
                class="ft-copyright"
                style="background-image: url(https://img.yzcdn.cn/upload_files/2017/06/16/FgtL3QzprXTGrVPaolozNT08Xs2K.png);"
              ></div>
            </div>
          </div>
        </div>
      </div>
      <!-- <div class="search-bar">
        <form class="search-form" action="https://h5.youzan.com/v2/search" method="GET">
          <input type="search" class="search-input" placeholder="搜索商品" name="q" value>
          <input type="hidden" name="kdt_id" value="16546132">
          <a class="js-search-cancel search-cancel" href="javascript:;">取消</a>
          <span class="search-icon"></span>
          <span class="close-icon hide"></span>
        </form>
        <div class="history-wrap center">
          <ul class="history-list search-recom-list js-history-list clearfix"></ul>
          <a class="tag tag-clear js-tag-clear c-gray-darker hide" href="javascript:;">清除历史搜索</a>
        </div>
      </div>-->
      <!-- mask -->
      <transition name="fade">
        <div
          id="yFzBKP9GDL"
          v-show="showSku"
          @click="showSku = false"
          style="height: 100%; position: fixed; top: 0px; left: 0px; right: 0px; background-color: rgba(0, 0, 0, 0.7); z-index: 1000;"
        ></div>
      </transition>
      <!-- sku 1 -->
      <transition name="skutoggle" tag="div">
        <div  v-show="showSku"
          class="sku-layout sku-box-shadow popup"
          style="overflow: hidden; position: fixed; z-index: 1000; background: white; bottom: 0px;width:100vw;"
        >
          <div class="sku-layout-title name-card sku-name-card">
            <div class="thumb">
              <img
                class="js-goods-thumb goods-thumb"
                src="https://img.yzcdn.cn/upload_files/2017/07/12/FkSvYz8FLLD9-t0smXO43hF6ov7S.jpg?imageView2/2/w/100/h/100/q/75/format/webp?imageView2/2/w/100/h/100/q/75/format/webp"
                alt
              >
            </div>
            <div class="detail goods-base-info clearfix">
              <p class="title c-black ellipsis">寻找田野|最正宗的上海南汇8424 得奖最多奥运会指定西瓜1只/箱 9-11斤</p>
              <div class="goods-price clearfix">
                <div class="current-price pull-left c-black">
                  <span class="price-name pull-left font-size-14 c-orange">¥</span>
                  <i class="js-goods-price price font-size-16 vertical-middle c-orange">98.00</i>
                </div>
                <div class="original-price vertical-middle font-size-14 line-through">108</div>
              </div>
            </div>
            <div class="js-cancel sku-cancel" @click="showSku = false">
              <div class="cancel-img"></div>
            </div>
          </div>
          <div class="adv-opts layout-content">
            <div class="goods-models js-sku-views block block-list border-top-0">
              <dl class="clearfix block-item sku-list-container">
                <dt class="model-title sku-sel-title">
                  <label>净含量：</label>
                </dt>
                <dd>
                  <ul class="model-list sku-sel-list">
                    <li class="tag sku-tag pull-left ellipsis active">4500g-5000g</li>
                  </ul>
                </dd>
              </dl>
              <dl class="clearfix block-item">
                <dt class="sku-num pull-left">
                  <label>购买数量：</label>
                </dt>
                <dd class="sku-quantity-contaienr">
                  <dl class="clearfix">
                    <div class="quantity">
                      <button class="minus" type="button" :class="{disabled:buyGoodNum <= 1}"></button>
                      <input type="text" class="txt" pattern="[0-9]*" :value="buyGoodNum">
                      <button class="plus" type="button"></button>
                      <div class="response-area response-area-minus" @click="changeGoodNum(-1)"></div>
                      <div class="response-area response-area-plus" @click="changeGoodNum(+1)"></div>
                    </div>
                  </dl>
                </dd>
              </dl>
            </div>
            <!-- <div class="bottom-padding"></div> -->
            <div class="confirm-action content-foot clearfix">
              <!-- 加入购物车 -->
              <div class="big-btn-1-1" v-show="skuNumber === 2" @click="addCart">
                <a class="js-confirm-it big-btn red-btn main-btn">加入购物车</a>
              </div>
              <!-- 立即购买 -->
              <div class="big-btn-1-1" v-show="skuNumber === 3" @click="buyGoods">
                <a class="js-confirm-it big-btn red-btn main-btn">下一步</a>
              </div>
              <!-- 选择规格 -->
              <div class="big-btn-2-1" v-show="skuNumber === 1">
                <a class="js-mutiBtn-confirm cart big-btn orange-btn vice-btn">加入购物车</a>
                <a
                  href="javascript:;"
                  class="js-mutiBtn-confirm confirm big-btn red-btn main-btn"
                >立即购买</a>
              </div>
            </div>
          </div>
        </div>
      </transition>
      <div class="motify" v-show="isShowAddcarNotice">
        <div class="motify-inner">已成功添加到购物车</div>
      </div>
    </div>
    <div class="loading-more" v-if="!GOOD">
      <span></span>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import URL from "js/api.js";
import swiper from "@/components/swiper";

export default {
  data() {
    return {
      GOOD: null,
      mainTab: ["商品详情", "本店成交"],
      curIndex: 0,
      goodDeals: null,
      skuNumber: 0,
      showSku: false,
      buyGoodNum: 1,
      isShowAddcarNotice: false,
      goodbannerList: null
    };
  },
  components: { swiper },
  created() {
    this.getGOOD();
  },
  computed: {
    id() {
      return this.$route.params.id;
    }
  },
  watch: {},
  mounted() {},
  methods: {
    changeGoodNum(n) {
      if (n === -1 && this.buyGoodNum === 1) {
        return;
      }
      this.buyGoodNum += n;
    },
    chooseSku(n) {
      this.showSku = true;
      this.skuNumber = n;
    },
    getGOOD() {
      axios.post(URL.goodDetails, { id: this.id }).then(res => {
        this.GOOD = res.data.data;
        let bannerLists = res.data.data.imgs;
        this.goodbannerList = [];
        bannerLists.forEach((item, i) => {
          let url = "";
          if (!bannerLists[i].clickUrl) {
            url = "";
          }
          this.goodbannerList.push({ img: item, clickUrl: url });
        });
      });
    },
    toggleMainTab(index) {
      this.curIndex = index;
      if (index === 1) {
        this.getGOODDeals();
      }
    },
    getGOODDeals() {
      axios.post(URL.goodDeals, { id: this.id }).then(res => {
        this.goodDeals = res.data.lists;
      });
    },
    addCart() {
      this.showSku = false;
      this.isShowAddcarNotice = true;
      setTimeout(() => {
        this.isShowAddcarNotice = false;
      }, 500);
    },
    buyGoods() {
      this.$router.push({name:"pay"})
    }
  }
};
</script>

<style lang="scss" scoped>
// @import url("./transition.scss");
// @import url("./goods_common.scss");
@import url("./goods_custom.scss");
@import url("./goods.scss");
// @import url("./goods_theme.scss");
@import url("./goods_mars.scss");
@import url("./goods_sku.scss");

.motify {
  display: block;
}

.sku-layout .sku-sel-title {
  float: left;
}
#global-cart.new .icon-img {
  position: fixed;
  bottom: 66px;
  right: 22px;
  z-index: 999;
  background-position: 0 0;
  background-image: url(https://b.yzcdn.cn/v2/image/yzapp/h5/cart1@2x.png);
  background-size: 100% 100%;
  height: 50px;
  width: 50px;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
  opacity: 1;
}
.fade-enter, .fade-leave-to{
  opacity: 0;
}
.skutoggle-enter-active, .skutoggle-leave-active {
  transition: transform .5s;
  transform: translateY(0)
}
.skutoggle-enter, .skutoggle-leave-to{
   transform: translateY(100%)
}
// .skutoggle-enter-to,.skutoggle-leave{
//   transform: translateY(100%)
// }
 
</style>
