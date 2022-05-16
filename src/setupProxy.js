const {createProxyMiddleware} = require('http-proxy-middleware')

module.exports = function(app){
    app.use('/api1',createProxyMiddleware({
        target:'http://106.14.162.86:8080/books',
        changeOrigin:true,
        pathRewrite:{
            '^/api1':''
        }
    }))
  
        
}