(function(e){function t(t){for(var r,o,u=t[0],s=t[1],c=t[2],l=0,f=[];l<u.length;l++)o=u[l],Object.prototype.hasOwnProperty.call(a,o)&&a[o]&&f.push(a[o][0]),a[o]=0;for(r in s)Object.prototype.hasOwnProperty.call(s,r)&&(e[r]=s[r]);d&&d(t);while(f.length)f.shift()();return i.push.apply(i,c||[]),n()}function n(){for(var e,t=0;t<i.length;t++){for(var n=i[t],r=!0,o=1;o<n.length;o++){var s=n[o];0!==a[s]&&(r=!1)}r&&(i.splice(t--,1),e=u(u.s=n[0]))}return e}var r={},a={app:0},i=[];function o(e){return u.p+"js/"+({about:"about"}[e]||e)+"."+{about:"e7571486"}[e]+".js"}function u(t){if(r[t])return r[t].exports;var n=r[t]={i:t,l:!1,exports:{}};return e[t].call(n.exports,n,n.exports,u),n.l=!0,n.exports}u.e=function(e){var t=[],n=a[e];if(0!==n)if(n)t.push(n[2]);else{var r=new Promise((function(t,r){n=a[e]=[t,r]}));t.push(n[2]=r);var i,s=document.createElement("script");s.charset="utf-8",s.timeout=120,u.nc&&s.setAttribute("nonce",u.nc),s.src=o(e);var c=new Error;i=function(t){s.onerror=s.onload=null,clearTimeout(l);var n=a[e];if(0!==n){if(n){var r=t&&("load"===t.type?"missing":t.type),i=t&&t.target&&t.target.src;c.message="Loading chunk "+e+" failed.\n("+r+": "+i+")",c.name="ChunkLoadError",c.type=r,c.request=i,n[1](c)}a[e]=void 0}};var l=setTimeout((function(){i({type:"timeout",target:s})}),12e4);s.onerror=s.onload=i,document.head.appendChild(s)}return Promise.all(t)},u.m=e,u.c=r,u.d=function(e,t,n){u.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},u.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},u.t=function(e,t){if(1&t&&(e=u(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(u.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)u.d(n,r,function(t){return e[t]}.bind(null,r));return n},u.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return u.d(t,"a",t),t},u.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},u.p="",u.oe=function(e){throw console.error(e),e};var s=window["webpackJsonp"]=window["webpackJsonp"]||[],c=s.push.bind(s);s.push=t,s=s.slice();for(var l=0;l<s.length;l++)t(s[l]);var d=c;i.push([0,"chunk-vendors"]),n()})({0:function(e,t,n){e.exports=n("cd49")},"034f":function(e,t,n){"use strict";var r=n("85ec"),a=n.n(r);a.a},"5ced":function(e,t,n){},"75ec":function(e,t,n){"use strict";var r=n("e0a2"),a=n.n(r);a.a},"85ec":function(e,t,n){},cccb:function(e,t,n){"use strict";var r=n("5ced"),a=n.n(r);a.a},cd49:function(e,t,n){"use strict";n.r(t);n("e260"),n("e6cf"),n("cca6"),n("a79d");var r=n("2b0e"),a=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{attrs:{id:"app"}},[n("router-view")],1)},i=[],o=(n("034f"),n("2877")),u={},s=Object(o["a"])(u,a,i,!1,null,null,null),c=s.exports,l=(n("d3b7"),n("8c4f")),d=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"home"},[n("div",{staticClass:"overlay",attrs:{id:"title"}},[n("div",[e._v("MakeIt Labs")]),e.logged?n("div",[e._v("Welcome UserName!")]):e._e()]),e._m(0),e._m(1),e.logged?n("AgreementScreen",{on:{agreement:function(t){return e.handleAgreement(t)}}}):e._e()],1)},f=[function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"overlay",attrs:{id:"agree"}},[n("div",[e._v("Agreed! Free to use the space.")])])},function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"overlay",attrs:{id:"disagree"}},[n("div",[e._v("Sorry, you can't use the space without agreeing. Please talk to a makeit member.")])])}],h=n("cffa"),m=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{attrs:{id:"Agreement"}},[e._m(0),n("div",{attrs:{id:"Slider"}},[n("div",{attrs:{id:"Slide"}}),n("div",{staticClass:"end",attrs:{id:"OK"},on:{click:function(t){return e.agree(!0)}}}),n("div",{staticClass:"end",attrs:{id:"NO"},on:{click:function(t){return e.agree(!1)}}})]),e._l(2,(function(e,t){return n("canvas",{key:t,ref:"can",refInFor:!0})})),n("video",{ref:"vid",attrs:{autoplay:""}})],2)},p=[function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{attrs:{id:"AgreementTxt"}},[n("h1",[e._v("MakeIt Labs Agreement")]),n("p",[e._v(" Lorem ipsum dolor sit amet consectetur adipisicing elit. Eum consequatur vero rem voluptatum ipsam. Nesciunt at, delectus aliquid reprehenderit hic ex perferendis, animi aliquam dolorem tempora, asperiores qui natus ipsum! Lorem ipsum dolor sit amet reprehenderit ")]),n("p",[e._v(" Lorem ipsum dolor sit amet consectetur adipisicing elit. Eum consequatur vero rem voluptatum ipsam. Nesciunt at, delectus aliquid reprehenderit hic ex perferendis, animi aliquam dolorem tempora, asperiores qui natus ipsum! ")]),n("p",[e._v(" Lorem ipsum dolor sit amet consectetur adipisicing elit. Eum consequatur vero rem voluptatum ipsam. Nesciunt at, delectus aliquid reprehenderit hic ex perferendis, animi aliquam dolorem tempora, asperiores qui natus ipsum! ")]),n("p",[e._v(" Have fun! ")])])}],v=n("b85c"),g=n("d4ec"),b=n("bee2"),y=n("262e"),w=n("2caf"),_=n("9ab4"),x=n("60a3"),k=function(e){Object(y["a"])(n,e);var t=Object(w["a"])(n);function n(){var e;return Object(g["a"])(this,n),e=t.apply(this,arguments),e.ctx=[],e}return Object(b["a"])(n,[{key:"mounted",value:function(){var e=this;this.vid=this.$refs.vid;var t,n=Object(v["a"])(this.$refs.can);try{for(n.s();!(t=n.n()).done;){var r=t.value,a=r.getContext("2d");r.width=window.innerWidth,r.height=window.innerHeight,a.translate(r.width,0),a.scale(-1,1),this.ctx.push(a)}}catch(i){n.e(i)}finally{n.f()}this.slide=document.querySelector("#Slide"),this.slide.style.top=window.innerHeight/2-50+"px",setTimeout((function(){navigator.mediaDevices.getUserMedia({video:{width:window.innerWidth,height:window.innerHeight}}).then((function(t){e.vid.srcObject=t,e.update()})).catch((function(e){console.log(e)}))}),1e3)}},{key:"update",value:function(){this.ctx[0].drawImage(this.vid,0,0),this.blend(),this.checkAreas(),window.requestAnimationFrame(this.update)}},{key:"agree",value:function(e){this.$emit("agreement",e)}},{key:"checkAreas",value:function(){for(var e=100,t=window.innerHeight,n=t/8,r=0;r<8;++r){var a=Math.round(r*n),i=this.ctx[1].getImageData(0,a,e,n),o=0,u=0;while(o<i.data.length/4)u+=(i.data[4*o]+i.data[4*o+1]+i.data[4*o+2])/3,++o;u=Math.round(u/(i.data.length/4)),u>10&&(this.slide.style.top=a+"px")}}},{key:"blend",value:function(){var e=100,t=window.innerHeight,n=window.innerWidth-e,r=this.ctx[0].getImageData(n,0,e,t),a=this.ctx[0].createImageData(e,t);this.lastImageData||(this.lastImageData=this.ctx[0].getImageData(n,0,e,t)),this.differenceAccuracy(a.data,r.data,this.lastImageData.data),this.ctx[1].putImageData(a,n,0),this.lastImageData=r}},{key:"difference",value:function(e,t,n){if(t.length!=n.length)return null;var r=0;while(r<.25*t.length)e[4*r]=0==t[4*r]?0:this.fastAbs(t[4*r]-n[4*r]),e[4*r+1]=0==t[4*r+1]?0:this.fastAbs(t[4*r+1]-n[4*r+1]),e[4*r+2]=0==t[4*r+2]?0:this.fastAbs(t[4*r+2]-n[4*r+2]),e[4*r+3]=255,++r}},{key:"differenceAccuracy",value:function(e,t,n){if(t.length!=n.length)return null;var r=0;while(r<.25*t.length){var a=(t[4*r]+t[4*r+1]+t[4*r+2])/3,i=(n[4*r]+n[4*r+1]+n[4*r+2])/3,o=this.threshold(this.fastAbs(a-i));e[4*r]=o,e[4*r+1]=o,e[4*r+2]=o,e[4*r+3]=255,++r}}},{key:"threshold",value:function(e){return e>21?255:0}},{key:"fastAbs",value:function(e){return(e^e>>31)-(e>>31)}}]),n}(x["c"]);Object(_["a"])([Object(x["b"])()],k.prototype,"msg",void 0),k=Object(_["a"])([x["a"]],k);var O=k,j=O,A=(n("75ec"),Object(o["a"])(j,m,p,!1,null,"a9228af0",null)),q=A.exports,S={name:"Home",components:{AgreementScreen:q},data:function(){return{logged:!1}},methods:{enter:function(){this.logged=!0,h["a"].to("#title",{bottom:window.innerHeight,delay:4})},exit:function(){this.logged=!1,h["a"].to("#title",{bottom:0,delay:4,onComplete:function(){document.querySelector("#agree").style.top="-100%",document.querySelector("#disagree").style.top="100%"}})},handleAgreement:function(e){1==e?h["a"].to("#agree",{top:0}):h["a"].to("#disagree",{top:0}),this.exit()}},mounted:function(){var e=this;document.addEventListener("keydown",(function(t){switch(t.which){case 32:e.enter();break}}))}},E=S,I=(n("cccb"),Object(o["a"])(E,d,f,!1,null,null,null)),C=I.exports;r["a"].use(l["a"]);var D=[{path:"/",name:"Home",component:C},{path:"/about",name:"About",component:function(){return n.e("about").then(n.bind(null,"f820"))}}],P=new l["a"]({base:"",routes:D}),$=P;r["a"].config.productionTip=!1,new r["a"]({router:$,render:function(e){return e(c)}}).$mount("#app")},e0a2:function(e,t,n){}});
//# sourceMappingURL=app.e25ccf7d.js.map