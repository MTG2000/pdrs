(this.webpackJsonpclient=this.webpackJsonpclient||[]).push([[14],{269:function(e,a,t){"use strict";t.r(a);var n=t(52),r=t(0),s=t.n(r),c=t(229),l=t(191),o=t(261),i=t(281),m=t(271),u=t(283),g=t(278),d=t(182),p=t(33),b=t(51),v=t(193),y=t.n(v);a.default=Object(b.a)((function(){var e=Object(r.useContext)(p.b).AppStore,a=Object(r.useState)(e),t=Object(n.a)(a,1)[0],b=Object(r.useState)(""),v=Object(n.a)(b,2),f=v[0],h=v[1],E=Object(r.useState)(""),j=Object(n.a)(E,2),w=j[0],C=j[1];Object(r.useEffect)((function(){t.FetchMessagesCategories()}),[t]);return s.a.createElement(c.a,{className:"py-5"},s.a.createElement(l.a,{variant:"h4",color:"primary",align:"center"},"We are here to help"),s.a.createElement(l.a,{variant:"h6",align:"center"},"Need A new medicine added, new classification, improvment proposal, found a bug in the system, or even just wanting to chat we will read your message and do our best to help"),s.a.createElement("form",{className:"mx-auto mt-5",style:{maxWidth:300},onSubmit:function(e){e.preventDefault(),t.SendMessage(f,w)}},s.a.createElement(o.a,{className:"w-100",variant:"outlined",required:!0},s.a.createElement(i.a,{id:"msg-category"},"Message Category"),s.a.createElement(m.a,{labelId:"msg-category",required:!0,value:f,onChange:function(e){return h(e.target.value)},label:"Message Category"},0===t.messagesCategories.length&&s.a.createElement(u.a,{value:""},"Loading Categories"),t.messagesCategories.map((function(e){return s.a.createElement(u.a,{key:e.Id,value:e.Id},e.Name)})))),s.a.createElement(g.a,{label:"Your Message",type:"text",required:!0,multiline:!0,rows:"7",className:"col-12 col-md-55 my-3",color:"primary",variant:"outlined",value:w,onChange:function(e){return C(e.target.value)}}),s.a.createElement("div",{className:"col-12 py-4 row mx-0 justify-content-center"},s.a.createElement(d.a,{type:"submit",variant:"contained",color:"primary"},"Send Message ",s.a.createElement(y.a,{className:"ml-2"})))))}))}}]);
//# sourceMappingURL=14.91ce7c16.chunk.js.map