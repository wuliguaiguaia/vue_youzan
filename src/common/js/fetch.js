import URL from "./api";
import axios from "axios";

export default function _fetch({key,data=null,type='post'}){
    return new Promise((resolve,reject)=>{
        axios[type](URL[key],data).then((res)=>{
            // if(res.status === 200){

            // }else if(res.status === 202){

            // }
            resolve(res);
        }).catch((err)=>{
            reject(err)
        })
        // let xhr = new XMLHttpRequest();
        // xhr.open(type,URL[key]);
        // xhr.onreadystatechange = function(){
        //     if(xhr.readyState === 4){
        //         if(xhr.status === 200){
        //             resolve(xhr.responseText)
        //             console.log('200')
        //         }else if(xhr.status === 202){
        //             console.log('202')
        //         }else{
        //             resolve(xhr.response)
        //             // reject(new Error('request fail'))
        //         }
        //     }
        // }
        // xhr.send(data || null);
    })
}