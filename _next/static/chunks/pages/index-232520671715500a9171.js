_N_E=(window.webpackJsonp_N_E=window.webpackJsonp_N_E||[]).push([[9],{JLwl:function(e,n,t){"use strict";t.d(n,"a",(function(){return d}));var a=t("o0o1"),r=t.n(a);function l(e,n,t,a,r,l,o){try{var i=e[l](o),u=i.value}catch(c){return void t(c)}i.done?n(u):Promise.resolve(u).then(a,r)}var o=t("q1tI"),i=t.n(o),u=t("HM8Y"),c=i.a.createElement;function s(e){return fetch("".concat(u.a.sheetsUrl,"?email=").concat(e))}function f(e){!function(e){if(null==e)throw new TypeError("Cannot destructure undefined")}(e);var n=Object(o.useState)(null),t=n[0],a=n[1],u=Object(o.useState)(!1),f=u[0],d=u[1],g=Object(o.useState)(!1),p=g[0],m=g[1],b=function(){var e,n=(e=r.a.mark((function e(n){var t,a;return r.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(t=n.trim().toLowerCase(),!/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i.test(t)){e.next=11;break}return d(!1),e.next=6,s(t);case 6:a=e.sent,console.log(a),200==a.status?m(!0):d(!0),e.next=12;break;case 11:d(!0);case 12:case"end":return e.stop()}}),e)})),function(){var n=this,t=arguments;return new Promise((function(a,r){var o=e.apply(n,t);function i(e){l(o,a,r,i,u,"next",e)}function u(e){l(o,a,r,i,u,"throw",e)}i(void 0)}))});return function(e){return n.apply(this,arguments)}}();return p?c(i.a.Fragment,null,c("div",null," Thank you for subscribing. "),c("div",null," You did good today. \ud83d\ude3c ")):c(i.a.Fragment,null,c("div",null,"I write about technology, career, travel and philosophy."),c("div",{className:"flex flex-row justify-center place-items-center gap-6"},c("input",{onChange:function(e){return a(e.target.value)},type:"email",className:(f?"border-red-600":"border-gray-600")+" rounded border focus:outline-none text-gray-600 px-4 py-2",required:!0}),c("button",{onClick:function(){return b(t)},className:"relative inline-flex rounded  items-center px-4 py-2 border border-gray-600 text-gray-200 bg-gray-700  hover:bg-gray-700 hover:bg-opacity-50 focus:outline-none"},"Subscribe")))}function d(){return u.a.disableNewsletter?c(i.a.Fragment,null):c("div",{className:"border-t border-gray-600 flex flex-col justify-center place-items-center gap-6 p-8 mt-8"},c(f,null))}},RNiq:function(e,n,t){"use strict";t.r(n),t.d(n,"__N_SSG",(function(){return h})),t.d(n,"default",(function(){return v}));var a=t("q1tI"),r=t.n(a),l=t("8Kt/"),o=t.n(l),i=t("YFqc"),u=t.n(i),c=t("HM8Y"),s=t("JLwl"),f=t("CafY"),d=t("65Hy"),g=t("RaWj"),p=t("vnQH"),m=t.n(p),b=r.a.createElement,h=!0;function v(e){var n=e.allPostsData;return b(f.a,{home:!0},b(o.a,null,b("title",null,c.a.siteTitle," | by ",c.a.author),Object(g.b)()),b("section",{className:m.a.profile},b(u.a,{href:"/"},b("a",null,b("img",{src:"/images/sony.jpeg",className:"".concat(m.a.profileImage," ").concat(m.a.borderCircle),alt:"Sony Mathew"}))),b("h2",{className:m.a.headingLg},"Sony Mathew")),b("section",{className:m.a.headingMd},b("p",{className:"text-center"},"I'm a Software Developer. Working remotely \ud83c\udfd6 \xa0",b(u.a,{href:"https://www.bigbinary.com/"},b("a",{target:"_blank"},"@BigBinary")),"."),b("br",null),b("h3",{className:m.a.headingLg},"Recent Ramblings"),b("ul",null,n.slice(0,3).map((function(e){var n=e.id,t=e.date,a=e.title;return b("li",{key:n},b(u.a,{href:"/posts/".concat(n)},b("a",null,a)),b("br",null),b("small",{className:m.a.lightText},b(d.a,{dateString:t})))})))),b("p",null,b(u.a,{href:"/blog"},b("a",null,"See All Articles \u2192"))),b(s.a,null))}},vlRD:function(e,n,t){(window.__NEXT_P=window.__NEXT_P||[]).push(["/",function(){return t("RNiq")}])}},[["vlRD",0,1,2,3]]]);