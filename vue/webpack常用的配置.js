const path = require('path');//引入node的path模块
const webpack =require('webpack');
const htmlwebpackPlugin = require('html-Webpack-Plugin')
const extractTextPlugin = require('extract-text-webpack-plugin')
const copywebpackplugin = require('copy-webpack-plugin')
module.exports={
    entry:'index.js',
    output:{
        path:path.resolve(__dirname,'dist'),
        filename:'[name].js'
    },
    module:{
        rules:[{
            test:/.js$/,
            include:[
                path.resolve(__dirname,'src')
            ],
            use:'babel-loader'
        },{
            test:/.less$/,
            use:extractTextPlugin.extract({
                fallback:'style-loader',
                use:[
                    'css-loader',
                    'less-loader',
                ]
            })
        },{
            test:/.(png|jpg|gif)/,
            use:[{
                loader:'file-loader'
            }]
        }
    ]
    },
    resolve:{
        extension:['.js',".json",'jsx','.less','.css'],
        alias:{
            untils:path.resolve(_dirname,'src/untils')
        }
    },
    plugins:[
        new extractTextPlugin('[name].css'),
        new htmlwebpackPlugin({
            file:'index.html',
            template:'src/index.html'
        }),
        new copywebpackplugin({
            form:'src/asset/favicon.icon',to:'favicon.ico'
        }),
        new  webpack.ProvidePlugin({
            '_':'lodash'
        }),
        new webpack.HotModuleReplacementPlugin()
    ],
    devServer:({
        port:'8080',
        host:'0,0,0,0',
        hot:true,
        https: true,
        open:true,//自动打开浏览器
        allowedHost:[
            'host.com',
      'subdomain.host.com',
      'subdomain2.host.com',
        ],//允许服务器访问的白名单
        compress:true,
        contentbase: path.join(__dirname, 'public'),//告诉服务器从哪里获取页面
        headers:{'X-Custom-Foo': 'bar'},//所有响应中添加首部内容
        historyApiFallback:[{
            rewrites:[{

            }]
        }],//所以首页错误都跳到这个页面
    })
}