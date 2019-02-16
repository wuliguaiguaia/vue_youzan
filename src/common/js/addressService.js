import _fetch from "js/fetch.js";

class Address{
    getAllList(){
        return _fetch({key:'addressList',type:"get"}).then((res)=>{
            return res.data.lists;
        })
    }
    update(id,list){
        return _fetch({key:'addressEdit',data:{id,list}})
    }

    add(list){
        return _fetch({key:'addressAdd',data:{list}})
    }
    
    remove(id){
        return _fetch({key:'addressRemove',data:{id}})
    }

    setDefault(id){
        return _fetch({key:'addressSetDefault',data:{id}})
    }
}

export default new Address();