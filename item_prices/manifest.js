TLabs.addFeature({ 
   name: '宝贝全网价格',
   version: '1.0.2',
   mods: [
       {
          matches: "item.taobao.com|item.tmall.com", //"www.taobao.com|*.taobao.com|*.tmall.com", // 特性适应的域，正则表达式，允许是 `*`
           path: 'item_prices.js' 
       }
   ]
});



