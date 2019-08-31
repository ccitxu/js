const express = require('express');
const app = express();
let etag = 0;
app.get('/',(req,res)=>{
    etag++;
    res.set('ETag',etag);
    res.send('hello http');
})
app.post('/demopost',function(request,response){
            var name=request.body.name;
            var data={  "success":true,  
                         "data": { 
                             "name":"requestName", 
                              "value":name } 
                            };
         response.json(data);
     }
 );
app.listen(3000,()=>{
    console.log('The server is running at http://127.0.0.1:3000/')
})