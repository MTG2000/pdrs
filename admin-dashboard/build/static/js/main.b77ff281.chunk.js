(this.webpackJsonpclient=this.webpackJsonpclient||[]).push([[0],{208:function(e,t,a){e.exports=a(342)},255:function(e,t){},257:function(e,t){},290:function(e,t){},291:function(e,t){},339:function(e,t,a){},340:function(e,t,a){},342:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),c=a(13),o=a.n(c),s=a(25),l=Object(s.a)((function(e){e.store;return r.a.createElement("header",null)})),i=function(){return r.a.createElement("footer",null)},u=a(34),m=a(52),d=a(14),p=a(377),f=a(373),v=a(397),h=a(63),b=a.n(h),g=Object(f.a)({card:{backgroundColor:"#FFF",boxShadow:"3px 5px 10px #9b9b9b",maxWidth:700},removeIcon:{color:"red",cursor:"pointer"}}),E=function(e){var t,a=e.message,n=e.onRead,c=g();return r.a.createElement("div",{className:"col-12"},r.a.createElement("div",{className:"".concat(c.card,"  px-3 mb-4 py-3 row mx-0 justify-content-between")},r.a.createElement("div",{className:"col-10"},r.a.createElement("div",{className:"mb-2"},r.a.createElement(v.a,{size:"small",style:{background:(t=a.Category,-1!==t.toLowerCase().indexOf("problem")?"#f44336":-1!==t.toLowerCase().indexOf("add")?"#3d5afe":-1!==t.toLowerCase().indexOf("feature")?"#43a047":"#546e7a"),color:"#FFF"},label:a.Category})),r.a.createElement("h5",null,a.Content),r.a.createElement("span",{className:"text-dark "},a.DoctorName&&"Doctor ".concat(a.DoctorName),a.PharmacyName&&"Pharmacy ".concat(a.PharmacyName))),r.a.createElement(b.a,{className:"".concat(c.removeIcon," align-self-center"),onClick:n})))},y=a(175),N=a.n(y),w=Object(s.a)((function(e){var t=e.store;return Object(n.useEffect)((function(){t.FetchNewMessages()}),[t]),t.loadingNewMessages?r.a.createElement("h2",{className:"text-center py-5"},"Loading..."):0===t.newMessages.length?r.a.createElement("h2",{className:"text-center py-5"},"No New Messages..."):r.a.createElement("div",{className:"row py-5 mx-0"},r.a.createElement("h5",null,r.a.createElement(N.a,null)," You Have Some New Messages"),t.newMessages.map((function(e){return r.a.createElement(E,{key:e.Id,message:e,onRead:function(){return t.MarkMessageRead(e.Id)}})})))})),x=a(12),j=a.n(x),O=a(23),k=a(40),S=a(41),M=a(6),C=a(21),I=a.n(C),A=function(){function e(){Object(k.a)(this,e),this.username="",this.role="",this.username=localStorage.getItem("username"),this.role=localStorage.getItem("user-role")}return Object(S.a)(e,[{key:"ChangeWidth",value:function(e){var t=e?240:64,a=document.getElementById("app-container"),n=Math.max(document.body.scrollWidth,document.documentElement.scrollWidth,document.body.offsetWidth,document.documentElement.offsetWidth,document.documentElement.clientWidth);a.style.width="".concat(n-t,"px")}},{key:"Logout",value:function(){var e=Object(O.a)(j.a.mark((function e(){return j.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,I.a.get("/api/users/logout");case 3:e.next=7;break;case 5:e.prev=5,e.t0=e.catch(0);case 7:return e.prev=7,localStorage.clear(),window.location="/login",e.finish(7);case 11:case"end":return e.stop()}}),e,null,[[0,5,7,11]])})));return function(){return e.apply(this,arguments)}}()}]),e}();Object(M.j)(A,{username:M.o,role:M.o,Logout:M.f,ChangeWidth:M.f});var R=new A,F=function(){function e(){Object(k.a)(this,e),this.newMessages=[],this.loadingNewMessages=!0,this.newAccountRequests=[],this.loadingNewAccountRequests=!0,this.loadingDashboard=!0}return Object(S.a)(e,[{key:"FetchNewMessages",value:function(){var e=Object(O.a)(j.a.mark((function e(){var t,a,n=this;return j.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,this.loadingNewMessages=!0,e.next=4,I.a.get("/api/admin/new-messages");case 4:t=e.sent,a=t.data.data,Object(M.p)((function(){n.newMessages=a,n.loadingNewMessages=!1})),e.next=12;break;case 9:e.prev=9,e.t0=e.catch(0),this.loadingNewMessages=!1;case 12:case"end":return e.stop()}}),e,this,[[0,9]])})));return function(){return e.apply(this,arguments)}}()},{key:"MarkMessageRead",value:function(){var e=Object(O.a)(j.a.mark((function e(t){return j.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,I.a.post("/api/admin/read-message",{id:t});case 3:this.FetchNewMessages(),e.next=8;break;case 6:e.prev=6,e.t0=e.catch(0);case 8:case"end":return e.stop()}}),e,this,[[0,6]])})));return function(t){return e.apply(this,arguments)}}()},{key:"FetchNewAccountRequests",value:function(){var e=Object(O.a)(j.a.mark((function e(){var t,a,n=this;return j.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,this.loadingNewAccountRequests=!0,e.next=4,I.a.get("/api/admin/new-account-requests");case 4:t=e.sent,a=t.data.data,Object(M.p)((function(){n.newAccountRequests=a,n.loadingNewAccountRequests=!1})),e.next=13;break;case 9:e.prev=9,e.t0=e.catch(0),u.NotificationManager.error(e.t0.response.data.message,e.t0.response.data.title),this.loadingNewAccountRequests=!1;case 13:case"end":return e.stop()}}),e,this,[[0,9]])})));return function(){return e.apply(this,arguments)}}()},{key:"MarkAccountRequestRead",value:function(){var e=Object(O.a)(j.a.mark((function e(t){return j.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,I.a.post("/api/admin/read-account-request",{id:t});case 3:this.FetchNewAccountRequests(),e.next=9;break;case 6:e.prev=6,e.t0=e.catch(0),u.NotificationManager.error(e.t0.response.data.message,e.t0.response.data.title);case 9:case"end":return e.stop()}}),e,this,[[0,6]])})));return function(t){return e.apply(this,arguments)}}()}]),e}();Object(M.j)(F,{newMessages:M.o,loadingNewMessages:M.o,newAccountRequests:M.o,loadingNewAccountRequests:M.o,FetchNewAccountRequests:M.f});var q=new F,U=function(){function e(){Object(k.a)(this,e),this.allUsers=[],this.users=[]}return Object(S.a)(e,[{key:"FetchAllUsers",value:function(){var e=Object(O.a)(j.a.mark((function e(){var t,a,n=this;return j.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,I.a.get("/api/users");case 3:t=e.sent,a=t.data.data,Object(M.p)((function(){n.allUsers=a,n.users=n.allUsers})),e.next=10;break;case 8:e.prev=8,e.t0=e.catch(0);case 10:case"end":return e.stop()}}),e,null,[[0,8]])})));return function(){return e.apply(this,arguments)}}()},{key:"SearchUsers",value:function(e){this.users=this.allUsers.filter((function(t){return-1!==t.Username.toLowerCase().indexOf(e.toLowerCase())||(t.DoctorName?-1!==t.DoctorName.toLowerCase().indexOf(e.toLowerCase()):!!t.PharmacyName&&-1!==t.PharmacyName.toLowerCase().indexOf(e.toLowerCase()))}))}},{key:"RegisterUser",value:function(){var e=Object(O.a)(j.a.mark((function e(t,a,n,r,c,o,s){return j.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,I.a.post("/api/users/register",{username:t,contact:a,password:n,type:r,doctorName:c,pharmacyName:o,address:s});case 3:u.NotificationManager.success("User Registered Successfully"),this.FetchAllUsers(),Object(M.p)((function(){})),e.next=11;break;case 8:e.prev=8,e.t0=e.catch(0),u.NotificationManager.error(e.t0.response.data.message,e.t0.response.data.title);case 11:case"end":return e.stop()}}),e,this,[[0,8]])})));return function(t,a,n,r,c,o,s){return e.apply(this,arguments)}}()},{key:"ToggleActive",value:function(){var e=Object(O.a)(j.a.mark((function e(t){var a=this;return j.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,this.users=this.users.map((function(e){return e.Id===t&&(e.loadingToggleActive=!0),e})),this.loadingToggleActive=!0,e.next=5,I.a.post("/api/users/toggle-active-state",{id:t});case 5:Object(M.p)((function(){a.users=a.users.map((function(e){return e.Id===t&&(e.loadingToggleActive=!1),e})),a.users=a.users.map((function(e){return e.Id===t&&(e.IsActive=!e.IsActive),e}))})),e.next=10;break;case 8:e.prev=8,e.t0=e.catch(0);case 10:case"end":return e.stop()}}),e,this,[[0,8]])})));return function(t){return e.apply(this,arguments)}}()}]),e}();Object(M.j)(U,{users:M.o,allUsers:M.o,FetchAllUsers:M.f,SearchUsers:M.f,RegisterUser:M.f});var T=new U,P=function(){function e(){Object(k.a)(this,e),this.allMedicins=[],this.medicins=[]}return Object(S.a)(e,[{key:"FetchMedicins",value:function(){var e=Object(O.a)(j.a.mark((function e(){var t,a,n=this;return j.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,I.a.get("/api/medicins");case 3:t=e.sent,a=t.data.data,Object(M.p)((function(){n.allMedicins=a,n.medicins=a})),e.next=10;break;case 8:e.prev=8,e.t0=e.catch(0);case 10:case"end":return e.stop()}}),e,null,[[0,8]])})));return function(){return e.apply(this,arguments)}}()},{key:"SearchMedicins",value:function(e){this.medicins=this.allMedicins.filter((function(t){return-1!==t.Name.toLowerCase().indexOf(e.toLowerCase())}))}},{key:"NewMedicine",value:function(){var e=Object(O.a)(j.a.mark((function e(t){return j.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,I.a.post("/api/medicins/new",{name:t});case 3:u.NotificationManager.success("Medicine Added Successfully"),this.FetchMedicins(),e.next=10;break;case 7:e.prev=7,e.t0=e.catch(0),u.NotificationManager.error(e.t0.response.data.message,e.t0.response.data.title);case 10:case"end":return e.stop()}}),e,this,[[0,7]])})));return function(t){return e.apply(this,arguments)}}()}]),e}();Object(M.j)(P,{medicins:M.o,FetchMedicins:M.f});var L=new P,D=r.a.createContext(),W=function(e){return r.a.createElement(D.Provider,{value:{AppState:R,DashboardStore:q,ManageUsersStore:T,ManageMedicinsStore:L}},e.children)},z=Object(f.a)({card:{backgroundColor:"#FFF",boxShadow:"3px 5px 10px #9b9b9b",maxWidth:700},removeIcon:{color:"red",cursor:"pointer"}}),K=function(e){var t=e.requset,a=e.onRead,n=z();return r.a.createElement("div",{className:"col-12"},r.a.createElement("div",{className:"".concat(n.card,"  px-3 mb-4 py-3 row mx-0 justify-content-between")},r.a.createElement("div",null,r.a.createElement("div",null,r.a.createElement("span",{className:"text-info "},t.Type),r.a.createElement("br",null),r.a.createElement("span",{className:"text-dark "},t.Name)),r.a.createElement("h5",null,t.Phone),r.a.createElement("h5",null,t.Email)),r.a.createElement(b.a,{className:"".concat(n.removeIcon," align-self-center"),onClick:a})))},B=a(91),H=a.n(B),J=Object(s.a)((function(e){var t=e.store;return Object(n.useEffect)((function(){t.FetchNewAccountRequests()}),[t]),t.loadingNewAccountRequests?r.a.createElement("h2",{className:"text-center py-5"},"Loading Account Requests..."):0===t.newAccountRequests.length?r.a.createElement("h2",{className:"text-center py-5"},"No New Requests..."):r.a.createElement("div",{className:"row py-5 mx-0"},r.a.createElement("h5",null," ",r.a.createElement(H.a,null)," You have New Account Requests"),t.newAccountRequests.map((function(e){return r.a.createElement(K,{key:e.Id,requset:e,onRead:function(){return t.MarkAccountRequestRead(e.Id)}})})))})),Y=function(){var e=Object(n.useContext)(D).DashboardStore,t=Object(n.useState)(e),a=Object(d.a)(t,1)[0];return r.a.createElement(p.a,{className:"py-5"},r.a.createElement("div",{className:"row"},r.a.createElement("div",{className:"col-12 col-lg-6"},r.a.createElement(w,{store:a})),r.a.createElement("div",{className:"col-12 col-lg-6"},r.a.createElement(J,{store:a}))))},G=a(177),Q=a.n(G),V=function(e){var t=Object(n.useRef)(null);Object(n.useEffect)((function(){a(e.loading)}),[e.loading]);var a=function(){var e=arguments.length>0&&void 0!==arguments[0]&&arguments[0];t.current&&(e?(t.current.disabled=!0,t.current.querySelector(".loading").style.display="block",t.current.querySelector(".content").style.display="none"):(t.current.disabled=!1,t.current.querySelector(".loading").style.display="none",t.current.querySelector(".content").style.display="block"))},c=r.a.cloneElement(e.children,{ref:t});return r.a.createElement(r.a.Fragment,null,c)},X=a(176),Z=a.n(X),$=a(47),_=function(e){var t=Object($.a)();return r.a.createElement("div",{className:"align-self-center"},r.a.createElement(Z.a,Object.assign({},e,{size:5,color:t.palette.primary.main,loading:!0})))},ee=Object(f.a)({card:{backgroundColor:"#FFF",boxShadow:"3px 5px 10px #939393",borderRadius:5},activeIcon:{color:"green",cursor:"pointer"},deactiveIcon:{color:"red",cursor:"pointer"}}),te=function(e){var t=e.user,a=e.onToggleActive,n=ee();return r.a.createElement("div",{className:"".concat(n.card," col-12 mb-2 py-3 row mx-0 justify-content-between")},r.a.createElement("div",null,r.a.createElement("div",null,r.a.createElement("span",{className:"text-info "},t.Username),r.a.createElement("span",{className:"text-dark mx-4"},t.DoctorName&&"Doctor ".concat(t.DoctorName),t.PharmacyName&&"Pharmacy ".concat(t.PharmacyName)))),r.a.createElement(V,{loading:t.loadingToggleActive},r.a.createElement("button",{className:"btn-none"},r.a.createElement("span",{className:"content"},t.IsActive?r.a.createElement(Q.a,{className:"".concat(n.activeIcon," align-self-center"),onClick:a}):r.a.createElement(b.a,{className:"".concat(n.deactiveIcon," align-self-center"),onClick:a})),r.a.createElement("div",{className:"loading"},r.a.createElement(_,{color:"#FFF"})))))},ae=Object(s.a)((function(e){var t=e.store;return Object(n.useEffect)((function(){t.FetchAllUsers()}),[t]),r.a.createElement("div",{style:{maxWidth:600},className:"mx-auto py-5"},t.users.map((function(e){return r.a.createElement(te,{key:e.Id,user:e,onToggleActive:function(){return t.ToggleActive(e.Id)}})})))})),ne=a(393),re=function(e){var t=e.store,a=Object(n.useState)(""),c=Object(d.a)(a,2),o=c[0],s=c[1];return r.a.createElement("div",{className:"row mx-auto justify-content-center",style:{maxWidth:280}},r.a.createElement(ne.a,{id:"search-users",label:"Search Users",value:o,onChange:function(e){s(e.target.value),t.SearchUsers(e.target.value)},variant:"outlined",color:"primary",className:" mx-auto mb-3 col-12 "}))},ce=a(383),oe=a(396),se=a(385),le=a(382),ie=a(381),ue=a(380),me=a(398),de=a(378),pe=a(399),fe=a(384),ve=a(394),he=a(178),be=a.n(he),ge=function(e){var t=e.store,a=Object(n.useState)(!1),c=Object(d.a)(a,2),o=c[0],s=c[1],l=r.a.useState(!1),i=Object(d.a)(l,2),u=i[0],m=i[1],p=Object(n.useState)(""),f=Object(d.a)(p,2),v=f[0],h=f[1],b=Object(n.useState)(""),g=Object(d.a)(b,2),E=g[0],y=g[1],N=Object(n.useState)(""),w=Object(d.a)(N,2),x=w[0],j=w[1],O=Object(n.useState)(""),k=Object(d.a)(O,2),S=k[0],M=k[1],C=Object(n.useState)(""),I=Object(d.a)(C,2),A=I[0],R=I[1],F=Object(n.useState)(""),q=Object(d.a)(F,2),U=q[0],T=q[1],P=function(e){s(!1),e&&(console.log("ssss"),t.RegisterUser(v,E,U,u,x,S,A))};return r.a.createElement("div",null,r.a.createElement(ue.a,{color:"primary","aria-label":"add",className:"fab-btn",onClick:function(){s(!0)}},r.a.createElement(H.a,null)),r.a.createElement(oe.a,{open:o,onClose:P,"aria-labelledby":"form-dialog-title"},r.a.createElement(ie.a,{id:"form-dialog-title"},"Register New User"),r.a.createElement(le.a,null,r.a.createElement("div",{className:"row justify-content-between mx-0 px-2"},r.a.createElement(ne.a,{label:"Username",type:"text",className:"col-12 col-md-5 mb-3",color:"primary",required:!0,value:v,onChange:function(e){return h(e.target.value)}}),r.a.createElement(ne.a,{label:"Contact Info",placeholder:"0968443292",type:"text",className:"col-12 col-md-5 mb-3",value:E,onChange:function(e){return y(e.target.value)}}),r.a.createElement("div",{className:"col-12 mb-3 px-0 row mx-0 "},r.a.createElement(ne.a,{label:"Password",type:"text",className:"col-12 col-md-8",value:U,InputProps:{readOnly:!0},color:"primary",required:!0}),r.a.createElement(ce.a,{variant:"contained",color:"primary",className:"mx-3  align-self-center",onClick:function(){T(be.a.generate({length:8,uppercase:!1}))}},"Generate")),r.a.createElement(me.a,{component:"fieldset",className:"my-3 col-12"},r.a.createElement(de.a,{component:"legend"},"User Type"),r.a.createElement(pe.a,{"aria-label":"gender",name:"gender1",value:u,onChange:function(e){return m(e.target.value)},className:"row mx-0 flex-row",defaultChecked:!0},r.a.createElement(fe.a,{value:"Admin",control:r.a.createElement(ve.a,{color:"primary"}),label:"Admin"}),r.a.createElement(fe.a,{value:"Doctor",control:r.a.createElement(ve.a,{color:"primary"}),label:"Doctor"}),r.a.createElement(fe.a,{value:"Pharmacy",control:r.a.createElement(ve.a,{color:"primary"}),label:"Pharmacy"}))),"Doctor"===u&&r.a.createElement(ne.a,{label:"Doctor Name",type:"text",className:"col-12 mb-3",value:x,onChange:function(e){return j(e.target.value)}}),"Pharmacy"===u&&r.a.createElement(r.a.Fragment,null,r.a.createElement(ne.a,{label:"Pharmacy Name",type:"text",className:"col-12 mb-3",value:S,onChange:function(e){return M(e.target.value)}}),r.a.createElement(ne.a,{label:"Pharmacy Address",type:"text",className:"col-12 mb-3",value:A,onChange:function(e){return R(e.target.value)}})))),r.a.createElement(se.a,null,r.a.createElement(ce.a,{onClick:function(){return P(!1)},color:"primary"},"Cancel"),r.a.createElement(ce.a,{onClick:function(){return P(!0)},color:"primary"},"Register"))))},Ee=Object(s.a)((function(){var e=Object(n.useContext)(D).ManageUsersStore,t=Object(n.useState)(e),a=Object(d.a)(t,1)[0];return r.a.createElement("div",{className:"py-5"},r.a.createElement(ge,{store:a}),r.a.createElement(re,{store:a}),r.a.createElement(ae,{store:a}))})),ye=a(386),Ne=a(379),we=a(387),xe=a(388),je=a(389),Oe=a(390),ke=a(391),Se=Object(s.a)((function(e){var t=e.store;return Object(n.useEffect)((function(){t.FetchMedicins()}),[t]),r.a.createElement(ye.a,{component:Ne.a,style:{maxWidth:500},className:"mx-auto mt-4"},r.a.createElement(we.a,{"aria-label":"simple table"},r.a.createElement(xe.a,null,r.a.createElement(je.a,null,r.a.createElement(Oe.a,null,"Id"),r.a.createElement(Oe.a,null,"Medicine Name"))),r.a.createElement(ke.a,null,t.medicins.map((function(e,t){return r.a.createElement(je.a,{key:e.Id},r.a.createElement(Oe.a,{component:"th",scope:"row"},t+1),r.a.createElement(Oe.a,null,e.Name))})))))})),Me=function(e){var t=e.store,a=Object(n.useState)(""),c=Object(d.a)(a,2),o=c[0],s=c[1];return r.a.createElement("div",{className:"row mx-auto justify-content-center",style:{maxWidth:280}},r.a.createElement(ne.a,{id:"search-meds",label:"Search Medicins",value:o,onChange:function(e){s(e.target.value),t.SearchMedicins(e.target.value)},variant:"outlined",color:"primary",className:" mx-auto mb-3 col-12 "}))},Ce=a(179),Ie=a.n(Ce),Ae=function(e){var t=e.store,a=Object(n.useState)(!1),c=Object(d.a)(a,2),o=c[0],s=c[1],l=Object(n.useState)(""),i=Object(d.a)(l,2),u=i[0],m=i[1],p=function(e){s(!1),!0===e&&t.NewMedicine(u)};return r.a.createElement("div",null,r.a.createElement(ue.a,{color:"primary","aria-label":"add",className:"fab-btn",variant:"extended",onClick:function(){s(!0)}},r.a.createElement(Ie.a,null)," New Medicine"),r.a.createElement(oe.a,{open:o,onClose:p,"aria-labelledby":"form-dialog-title"},r.a.createElement(ie.a,{id:"form-dialog-title"},"New Medicine"),r.a.createElement(le.a,null,r.a.createElement("div",{className:"row justify-content-between mx-0 px-2"},r.a.createElement(ne.a,{label:"Medicine Name",type:"text",className:"col-12  mb-3",color:"primary",value:u,onChange:function(e){return m(e.target.value)}}))),r.a.createElement(se.a,null,r.a.createElement(ce.a,{onClick:p,color:"primary"},"Cancel"),r.a.createElement(ce.a,{onClick:function(){return p(!0)},color:"primary"},"Register"))))},Re=function(){var e=Object(n.useContext)(D).ManageMedicinsStore,t=Object(n.useState)(e),a=Object(d.a)(t,1)[0];return r.a.createElement(p.a,{className:"py-5"},r.a.createElement(Me,{store:a}),r.a.createElement(Se,{store:a}),r.a.createElement(Ae,{store:a}))},Fe=a(193),qe=a(180),Ue=a.n(qe),Te=function(){return r.a.createElement(p.a,{className:"py-5"},r.a.createElement(Fe.a,{variant:"h5",align:"center"},"A Work In Progress .... ",r.a.createElement(Ue.a,null)))},Pe=Object(s.a)((function(e){e.store;return r.a.createElement(m.c,null,r.a.createElement(m.a,{path:"/manage-users",component:Ee}),r.a.createElement(m.a,{path:"/manage-medicins",component:Re}),r.a.createElement(m.a,{path:"/statistics",component:Te}),r.a.createElement(m.a,{path:"/",component:Y}))})),Le=a(20),De=a.n(Le),We=a(183),ze=a.n(We),Ke=a(185),Be=a.n(Ke),He=a(182),Je=a.n(He),Ye=a(186),Ge=a.n(Ye),Qe=a(184),Ve=a.n(Qe),Xe=Object(m.g)((function(){var e=Object(n.useContext)(D).AppState,t=Object(n.useState)(e),a=Object(d.a)(t,1)[0],c=Object(n.useState)(!0),o=Object(d.a)(c,2),s=o[0],l=o[1],i=Object(m.f)();return Object(n.useEffect)((function(){a.ChangeWidth(s)}),[a,s]),r.a.createElement(De.a,{onSelect:function(e){},className:"bg-primary",onToggle:function(e){l(e)},expanded:s,style:{position:"fixed"}},r.a.createElement(De.a.Toggle,null),r.a.createElement(De.a.Nav,{defaultSelected:window.location.pathname.slice(1),onSelect:function(e){var t="/"+e;window.location.pathname!==t&&i.push(t)}},r.a.createElement(Le.NavItem,{eventKey:"home"},r.a.createElement(Le.NavIcon,null,r.a.createElement(Je.a,{style:{fontSize:"1.75em"}})),r.a.createElement(Le.NavText,null,"Dashboard")),r.a.createElement(Le.NavItem,{eventKey:"manage-users"},r.a.createElement(Le.NavIcon,null,r.a.createElement(ze.a,{style:{fontSize:"1.75em"}})),r.a.createElement(Le.NavText,null,"Manage Users")),r.a.createElement(Le.NavItem,{eventKey:"manage-medicins"},r.a.createElement(Le.NavIcon,null,r.a.createElement(Ve.a,{style:{fontSize:"1.75em"}})),r.a.createElement(Le.NavText,null,"Manage Medicins")),r.a.createElement(Le.NavItem,{eventKey:"statistics"},r.a.createElement(Le.NavIcon,null,r.a.createElement(Be.a,{style:{fontSize:"1.75em"}})),r.a.createElement(Le.NavText,null,"Statistics & Reports")),r.a.createElement(Le.NavItem,{onClick:function(){a.Logout()}},r.a.createElement(Le.NavIcon,null,r.a.createElement(Ge.a,{style:{fontSize:"1.75em"}})),r.a.createElement(Le.NavText,null,"Logout"))))}));var Ze=function(){return r.a.createElement("div",{className:"App"},r.a.createElement(u.NotificationContainer,null),r.a.createElement(l,null),r.a.createElement(Xe,null),r.a.createElement("div",{id:"app-container",style:{marginLeft:"auto",width:"100%"}},r.a.createElement(Pe,null)),r.a.createElement(i,null))},$e=a(187),_e=a(114);$e.a.add(_e.b,_e.a);a(337);var et=a(188),tt=a.n(et);a(338);tt.a.init({offset:100,duration:700,easing:"ease-in-sine",delay:100}),I.a.interceptors.response.use((function(e){return e}),function(){var e=Object(O.a)(j.a.mark((function e(t){var a,n;return j.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if("Token Expired"!==t.response.data){e.next=16;break}return e.prev=1,e.next=4,I.a.post("/api/users/refresh-token",{username:localStorage.getItem("username"),refreshToken:localStorage.getItem("refreshToken")});case 4:return a=e.sent,localStorage.setItem("refreshToken",a.data.data.refreshToken),e.next=8,I()(t.config);case 8:return n=e.sent,e.abrupt("return",Promise.resolve(n));case 12:e.prev=12,e.t0=e.catch(1),localStorage.clear(),window.location="/login";case 16:return e.abrupt("return",Promise.reject(t));case 17:case"end":return e.stop()}}),e,null,[[1,12]])})));return function(t){return e.apply(this,arguments)}}());a(339),a(340);var at=a(392),nt=a(189),rt=Object(nt.a)({typography:{fontFamily:["Titillium Web",'"Segoe UI"',"Roboto",'"Helvetica Neue"',"Arial","sans-serif",'"Apple Color Emoji"','"Segoe UI Emoji"','"Segoe UI Symbol"'].join(",")},palette:{primary:{main:"#007ebe"},secondary:{main:"#8bb6cb"}},overrides:{MuiOutlinedInput:{notchedOutline:{borderColor:"#007ebe",borderWidth:1}},MuiInputLabel:{root:{color:"#007ebe"}}}}),ct=a(190),ot=a(191),st=function(e){Object(ot.a)(a,e);var t=Object(ct.a)(a);function a(){return Object(k.a)(this,a),t.apply(this,arguments)}return Object(S.a)(a,[{key:"componentDidUpdate",value:function(e){this.props.location!==e.location&&window.scrollTo(0,0)}},{key:"render",value:function(){return this.props.children}}]),a}(n.Component),lt=Object(m.g)(st),it=a(74),ut=(a(341),function(e){return r.a.createElement(it.a,null,r.a.createElement(W,null,r.a.createElement(at.a,{theme:rt},r.a.createElement(lt,null,e.children))))});o.a.render(r.a.createElement(ut,null,r.a.createElement(Ze,null)),document.getElementById("root"))}},[[208,1,2]]]);
//# sourceMappingURL=main.b77ff281.chunk.js.map