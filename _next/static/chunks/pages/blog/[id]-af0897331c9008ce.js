(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[610],{516:function(e,n,t){(window.__NEXT_P=window.__NEXT_P||[]).push(["/blog/[id]",function(){return t(593)}])},593:function(e,n,t){"use strict";t.r(n),t.d(n,{__N_SSG:function(){return m},default:function(){return j}});var a=t(5893),s=t(9008),r=t.n(s),l=t(9566),i=t(7294);function c(){return(0,i.useEffect)(()=>{"undefined"!=typeof a2a&&a2a.init()},[]),(0,a.jsx)(a.Fragment,{children:(0,a.jsxs)("div",{className:"flex a2a_kit a2a_kit_size_32 a2a_default_style gap-1 pt-8",children:[(0,a.jsx)("a",{className:"a2a_button_facebook",alt:"Share on Facebook",children:"\xa0"}),(0,a.jsx)("a",{className:"a2a_button_twitter",children:"\xa0"}),(0,a.jsx)("a",{className:"a2a_button_linkedin",children:"\xa0"}),(0,a.jsx)("a",{className:"a2a_button_copy_link",children:"\xa0"})]})})}var o=t(6570),d=t(4846),u=t(1868);function h(e){let{tags:n}=e;return(0,a.jsxs)("div",{children:[(0,a.jsx)("span",{className:"px-1 pl-0 text-gray-500",children:"Tagged as "}),n.map(e=>(0,a.jsxs)("span",{className:"px-1 text-gray-600",children:["#",e]},e))]})}var x=t(1995),_=t.n(x);function f(e){let{article:n}=e;if(!n.toc)return null;let t={},s=0,r=n.content.split("\n").filter(e=>e.startsWith("#")).map(e=>{let n=e.match(/^#+/)[0].length,a=e.replace(/^#+\s+/,""),r=a.toLowerCase().replace(/[^\w\s-]/g,"").replace(/\s+/g,"-");if(n<s)for(let e=n+1;e<=6;e++)t[e]=0;t[n]=(t[n]||0)+1;let l=[];for(let e=1;e<=n;e++)l.push(t[e]||0);return s=n,{level:n,text:a,id:r,sectionNumber:l.join(".")}}).map(e=>'<li style="margin-left: '.concat(20*e.level,'px">\n      <a href="#').concat(e.id,'"><span class="section-number">').concat(e.sectionNumber.replace(/^0\./,""),".</span> ").concat(e.text,"</a>\n    </li>")).join("\n");return(0,a.jsxs)(a.Fragment,{children:[(0,a.jsx)("br",{}),(0,a.jsx)("div",{className:_().tocHeader,children:"Table of Contents"}),(0,a.jsx)("div",{className:_().toc,dangerouslySetInnerHTML:{__html:r}})]})}var m=!0;function j(e){let{postData:n}=e;return(0,a.jsx)(a.Fragment,{children:(0,a.jsxs)(o.Z,{children:[(0,a.jsx)(r(),{children:(0,d.q)({article:n})}),(0,a.jsxs)("article",{children:[(0,a.jsx)("h1",{className:_().headingXl,children:n.title}),(0,a.jsxs)("div",{className:_().lightText,children:[(0,a.jsx)("div",{children:n.author}),(0,a.jsx)(u.Z,{dateString:n.date})," • ",n.readingTime," min read"]}),(0,a.jsx)(f,{article:n}),(0,a.jsx)("div",{className:"mt-5",dangerouslySetInnerHTML:{__html:n.contentHtml}}),(0,a.jsx)(h,{tags:n.tags})]}),(0,a.jsx)(c,{}),(0,a.jsx)(l.Z,{})]})})}}},function(e){e.O(0,[996,367,165,888,774,179],function(){return e(e.s=516)}),_N_E=e.O()}]);