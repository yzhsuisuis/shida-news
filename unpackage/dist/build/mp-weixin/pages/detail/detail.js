(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/detail/detail"],{"021d":function(t,e,i){"use strict";i.r(e);var n=i("1200"),a=i.n(n);for(var o in n)["default"].indexOf(o)<0&&function(t){i.d(e,t,(function(){return n[t]}))}(o);e["default"]=a.a},1200:function(t,e,i){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var n=i("5de9"),a={data:function(){return{options:null,detail:{}}},onLoad:function(t){this.options=t,this.getDetail()},methods:{getDetail:function(){var e=this;t.request({url:"https://ku.qingnian8.com/dataApi/news/detail.php",data:this.options,success:function(i){console.log("getit"),console.log(i),i.data.posttime=(0,n.parseTime)(i.data.posttime),i.data.content=i.data.content.replace(/<img/gi,'<img style="max-width:100%"'),e.detail=i.data,e.setHistory(),t.setNavigationBarTitle({title:e.detail.title})}})},setHistory:function(){var e=this,i=t.getStorageSync("historyArr")||[],a={id:this.detail.id,classid:this.detail.classid,picurl:this.detail.picurl,title:this.detail.title,looktime:(0,n.parseTime)(Date.now())},o=i.findIndex((function(t){return t.id==e.detail.id}));o>=0&&i.splice(o,1),i.unshift(a),i=i.slice(0,10),t.setStorageSync("historyArr",i)}}};e.default=a}).call(this,i("df3c")["default"])},5524:function(t,e,i){"use strict";i.r(e);var n=i("82a5"),a=i("021d");for(var o in a)["default"].indexOf(o)<0&&function(t){i.d(e,t,(function(){return a[t]}))}(o);i("c5e4");var c=i("828b"),s=Object(c["a"])(a["default"],n["b"],n["c"],!1,null,null,null,!1,n["a"],void 0);e["default"]=s.exports},"82a5":function(t,e,i){"use strict";i.d(e,"b",(function(){return n})),i.d(e,"c",(function(){return a})),i.d(e,"a",(function(){}));var n=function(){var t=this.$createElement;this._self._c},a=[]},c5e4:function(t,e,i){"use strict";var n=i("d093"),a=i.n(n);a.a},d05a:function(t,e,i){"use strict";(function(t,e){var n=i("47a9");i("c20f");n(i("3240"));var a=n(i("5524"));t.__webpack_require_UNI_MP_PLUGIN__=i,e(a.default)}).call(this,i("3223")["default"],i("df3c")["createPage"])},d093:function(t,e,i){}},[["d05a","common/runtime","common/vendor"]]]);