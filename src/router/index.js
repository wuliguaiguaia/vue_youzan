import Vue from "vue";
import Router from 'vue-router';

import index from "@/page/index/index";
import sort from "@/page/sort/sort";
import shopcar from "@/page/shopcar/shopcar";
import person from "@/page/person/person";
import search from "@/page/search/search";
import goodDetail from "@/page/goodDetail/goodDetail";
import shopDetail from "@/page/shopDetail/shopDetail";
import address from "@/page/address/address";
import all from "@/page/address/all";
import edit from "@/page/address/edit";
import pay from "@/page/pay/pay";

Vue.use(Router);

export default new Router({
    mode: "history",
    routes: [{
        path: "/",
        redirect: "/index"
    }, {
        path: "/index",
        component: index,
        name: "index"
    }, {
        path: "/sort",
        component: sort,
        name: "sort",
    }, {
        path: "/shopcar",
        component: shopcar,
        name: "shopcar"
    }, {
        path: "/person",
        component: person,
        name: "person"
    }, {
        path: "/search",
        component: search,
        name: "search"
    }, {
        path: "/goodDetail/:id",
        component: goodDetail,
        name: "goodDetail",
    }, {
        path: "/shopDetail/:id",
        component: shopDetail,
        name: "shopDetail"
    }, {
        path: "/address",
        component: address,
        redirect:"/address/all",
        children:[{
            path:"all",
            component:all,
            name:"addressAll",
        },{
            path:"edit",
            component:edit,
            name:"addressEdit"
        }]
    }, {
        path: "/pay",
        component: pay,
        name: "pay"
    }]
})