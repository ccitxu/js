{
expires //缓存过期时间 格林威治时 间（GMT）
cache-control
   {
       max-age//请求开始到过期时间的之间秒数
       s-maxage//一类似max-age运用与共享缓存
       public  //经过HTTP认证才能访问的内容，输出是自动不可以缓存的
       no-cache //强制每次请求直接发送给源服务器，而不经过本地缓存版本的校验
       no-store //强制缓存在任何情况下都不要保留任何副本
   }
 Last-Modified//最近一次访问时间
 If-Modified-Since//上次访问时间
 ETag
}
