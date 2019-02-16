import _fetch from "js/fetch.js";

class Cart{
    getAllList(){
        return _fetch({key:'cartList',type:"get"}).then((res)=>{
            return res.data.cartList;
        })
    }

    update(id,number){
        return _fetch({key:'cartUpdate',data:{id,number}})
    }

    remove(id){
        return _fetch({key:'cartRemove',data:{id}})
    }
    
    removeMore(ids){
        return _fetch({key:'cartRemove',data:{ids}})
    }
}

export default new Cart();