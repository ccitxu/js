const express = require('express');
const app = express();
let etag = 0;
app.get('/',(req,res)=>{
    etag++;
    res.set('ETag',etag);
    res.send('hello http');
})
app.listen(3000,()=>{
    console.log('The server is running at http://127.0.0.1:3000/')
})