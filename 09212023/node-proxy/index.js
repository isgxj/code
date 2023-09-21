const http = require('http');
const httpProxy = require('http-proxy');

// 创建反向代理服务器
const proxy = httpProxy.createProxyServer({});

// 监听端口
const server = http.createServer((req, res) => {
    // 将请求代理到目标服务器
    proxy.web(req, res, { target: 'https://api.openai-proxy.com' });
});

// 监听端口
const port = 3005;
server.listen(port, () => {
    console.log(`反向代理服务器已启动，监听端口 ${port}`);
});
