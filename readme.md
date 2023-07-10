# Jce-Loader

````js
npm install jce-loader -g
````

## use

直接将JCE作为axios的 httpRequestFunction 引入
匹配规则为 含有 get del query 的为get请求
其他的都为post

````js
import { getList } from '../test/Test.jce';
console.log(getList); // [Function: queryCrmProduct]
const data = await getList()

````

## CMD

使用命令行工具生成对应的axios 文件；

````js
jce2req at ./TgTip.jce
// 该命令行可以直接生成对应的TgTipRequest.js

import httpRequest from '@/utils/request';     
export function saveTip(data){
    return httpReqeust({
        url:'TgTip/saveTip',
        method:'post',
        data
    })
};

jce2req at ./TgTip.jce -a /api
// 该命令行可以生成url前缀为/api的路由请求
export function saveTip(data){
    return httpReqeust({
        url:'/api/TgTip/saveTip',
        method:'post',
        data
    })
};
````
