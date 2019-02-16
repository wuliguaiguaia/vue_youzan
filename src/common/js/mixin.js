export default {
    filters: {
        formatePrice(price) {
            let ar = Number(price).toLocaleString().split(".");
            if (ar.length < 2) {
                return ar[0] + ".00"
            } else if(ar.length > 2){    
                return ar[0] + '.' + ar[1].slice(0,2)  
            } else {
                return ar[0] + "." + ar[1].padEnd(2, 0)
            }
        }
    }
}