let path = require("path");
module.exports  = {
    publicPath: process.env.NODE_ENV === 'production'
    ? '/vue_youzan/dist/'
    : '/',
    configureWebpack:{
        resolve:{
            alias:{
                // "components":"@/components",
                // "page":"@/page",
                "css":"@/common/css",
                "js":"@/common/js"
            }
        }
    },
    css:{
        sourceMap:true,
        loaderOptions:{
            sass:{
                sourceMap:true
            }
        }
    }
}