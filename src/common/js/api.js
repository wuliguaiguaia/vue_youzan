// const URL = {
//     hotLists:"/index/hotLists",
//     banner:"/index/banner",

//     topLists:"/sort/topLists",
//     rank:"/sort/rank",
//     subLists:"/sort/subLists",

//     searchGoods:"/search/goodLists",
//     searchShops:"/search/shopLists",

//     goodDetails:"/details/good",
//     goodDeals:"/details/goodDeals",
//     shopDetails:"/details/shop",

//     cartList: "/cart/list",
//     cartUpdate:"/cart/update",s
//     cartRemove:"/cart/remove",
//     cartRemoveMore:"/cart/removeMore",

//     addressList:"/address/lists",
//     addressEdit:"/address/edit",
//     addressAdd:"/address/add",
//     addressRemove:"/address/remove",
//     addressSetDefault:"/address/setDefault"
// }

// const host = "http://rap2api.taobao.org/app/mock/122885/get";
 

const url = {
  hotLists: '/index/hotLists',
  banner: '/index/banner',

  topLists: '/category/topLists',
  subLists: '/category/subLists',
  rank: '/category/rank',

  searchGoods: "/search/goodLists",
  searchShops: "/search/shopLists",

  goodDetails: '/goods/details',
  goodDeals: '/goods/deal',
  //     shopDetails:"/details/shop",

  cartList: '/cart/lists',
  cartUpdate: "/cart/update",
  cartRemove: '/cart/remove',
  cartRemoveMore: '/cart/mRemove',

  addressList: '/address/list',
  addressAdd: '/address/add',
  addressRemove: '/address/remove',
  addressEdit: '/address/update',
  addressSetDefault: '/address/setDefault',
}
// const host = 'https://easy-mock.com/mock/5bd1bce75e38a677f659a931'
const host = ' https://easy-mock.com/mock/5c6545ef1287da4cf0569501'

for (let key in url) {
  if (url.hasOwnProperty(key)) {
    url[key] = host + url[key]
  }
}



export default url