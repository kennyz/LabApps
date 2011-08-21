TLabs.addFeature({ //特性添加方法，不可修改 name: '数据魔方入口',// 特性名称，说明，可自定义
   version: '1.0.3',//特性的版本号，可自定义
   mods: [
       {
          matches: "*", //"www.taobao.com|*.taobao.com|*.tmall.com", // 特性适应的域，正则表达式，允许是 `*`
           path: 'visit_once.js' //特性的主逻辑js名称，可自定义
       }
   ]
});



