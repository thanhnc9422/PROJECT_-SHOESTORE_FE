const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = app => {
    app.use(
        createProxyMiddleware('/internal/security/login',
        {
            target:'https://kina.viettel.io:5198',
            changeOrigin: true
        })
    )
    app.listen(3000);
}
