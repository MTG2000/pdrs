(this.webpackJsonpclient=this.webpackJsonpclient||[]).push([[2],{103:function(e,t,a){e.exports=a(154)},151:function(e,t,a){},152:function(e,t,a){},154:function(e,t,a){"use strict";a.r(t);var n=a(0),i=a.n(n),r=a(20),s=a.n(r),c=a(52),o=a(4),u=a.n(o),l=a(5),p=a(164),h=a(165),m=a(95),f=a(13),d=function(e){var t=e.store,a=t.username,n=t.role;return i.a.createElement(p.a,{collapseOnSelect:!0,expand:"lg",bg:"primary",variant:"dark",style:{zIndex:100}},i.a.createElement(p.a.Brand,{href:"/"},i.a.createElement("h4",{className:"no-gutters mb-0"},"P.D.R.S")),i.a.createElement(p.a.Toggle,{"aria-controls":"responsive-navbar-nav"}),i.a.createElement(p.a.Collapse,{id:"responsive-navbar-nav"},i.a.createElement(h.a,{className:"ml-auto text-white"},"Doctor"===n&&i.a.createElement(f.b,{className:"nav-link text-white",to:"/new-prescription"},"New Prescription"),"Pharmacy"===n&&i.a.createElement(f.b,{className:"nav-link text-white",to:"/dispense-prescription"},"Dispense Prescription"),"Doctor"===n&&i.a.createElement(f.b,{className:"nav-link text-white",to:"/patients-prescriptions"},"Patinets Prescriptions"),"Admin"===n&&i.a.createElement(m.a,{className:"nav-link text-white",href:"/admin"},"Admin Dashboard"),a&&"Admin"!==n&&i.a.createElement(f.b,{className:"nav-link text-white",to:"/contact"},"Technical Support"),!a&&i.a.createElement(f.b,{className:"nav-link text-white",to:"/about"},"About"," "),a?i.a.createElement(f.b,{className:"nav-link text-white",to:"#",onClick:Object(l.a)(u.a.mark((function e(){return u.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,t.Logout();case 2:case"end":return e.stop()}}),e)})))},"Logout"):i.a.createElement(f.b,{className:"nav-link text-white",to:"/login"},"Login"))))},v=function(){return i.a.createElement("footer",null)},g=a(8),b=a(162),k=a(33),N=a(22),y=a(96),P=function(e){var t=e.component,a=e.isAuth,n=void 0!==a&&a,r=Object(y.a)(e,["component","isAuth"]);return console.log("Private"),i.a.createElement(N.b,Object.assign({},r,{render:function(e){return n?i.a.createElement(t,e):i.a.createElement(N.a,{to:"/login"})}}))},x=a(51),w=a(57),j=i.a.lazy((function(){return Promise.all([a.e(0),a.e(1),a.e(6),a.e(10)]).then(a.bind(null,274))})),O=i.a.lazy((function(){return Promise.all([a.e(0),a.e(1),a.e(5),a.e(12)]).then(a.bind(null,272))})),I=i.a.lazy((function(){return Promise.all([a.e(0),a.e(9)]).then(a.bind(null,268))})),S=i.a.lazy((function(){return Promise.all([a.e(0),a.e(7)]).then(a.bind(null,275))})),E=i.a.lazy((function(){return Promise.all([a.e(0),a.e(1),a.e(11),a.e(13)]).then(a.bind(null,276))})),C=i.a.lazy((function(){return Promise.all([a.e(0),a.e(8),a.e(14)]).then(a.bind(null,269))})),F=Object(x.a)((function(e){var t=e.store,a=t.username,n=t.role;return i.a.createElement(i.a.Suspense,{fallback:i.a.createElement(w.a,{fullPage:!0})},i.a.createElement(N.d,null,i.a.createElement(N.b,{path:"/login",component:I}),i.a.createElement(P,{path:"/contact",component:C,isAuth:a}),i.a.createElement(P,{path:"/new-prescription",component:O,isAuth:"Doctor"===n}),i.a.createElement(P,{path:"/dispense-prescription",component:E,isAuth:"Pharmacy"===n}),i.a.createElement(P,{path:"/patients-prescriptions",component:j,isAuth:a}),i.a.createElement(N.b,{path:"/",component:S})))}));var M=function(){var e=Object(n.useContext)(k.b).AppStore,t=Object(n.useState)(e),a=Object(c.a)(t,1)[0];return i.a.createElement("div",{className:"App"},i.a.createElement(g.NotificationContainer,null),i.a.createElement(d,{store:a}),i.a.createElement(b.a,null,i.a.createElement(F,{store:a})),i.a.createElement(v,null))},A=a(92),T=a(49);A.a.add(T.b,T.a);var D=a(93),B=a.n(D);a(150);B.a.init({offset:100,duration:700,easing:"ease-in-sine",delay:100});var L=a(7),z=a.n(L);z.a.interceptors.response.use((function(e){return e}),function(){var e=Object(l.a)(u.a.mark((function e(t){var a,n;return u.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if("Token Expired"!==t.response.data){e.next=16;break}return e.prev=1,e.next=4,z.a.post("/api/users/refresh-token",{username:localStorage.getItem("username"),refreshToken:localStorage.getItem("refreshToken")});case 4:return a=e.sent,localStorage.setItem("refreshToken",a.data.data.refreshToken),e.next=8,z()(t.config);case 8:return n=e.sent,e.abrupt("return",Promise.resolve(n));case 12:e.prev=12,e.t0=e.catch(1),localStorage.clear(),window.location="/login";case 16:return e.abrupt("return",Promise.reject(t));case 17:case"end":return e.stop()}}),e,null,[[1,12]])})));return function(t){return e.apply(this,arguments)}}());a(151),a(152);var R=a(163),W=a(94),U=Object(W.a)({typography:{fontFamily:["Titillium Web",'"Segoe UI"',"Roboto",'"Helvetica Neue"',"Arial","sans-serif",'"Apple Color Emoji"','"Segoe UI Emoji"','"Segoe UI Symbol"'].join(",")},palette:{primary:{main:"#007ebe"},secondary:{main:"#8bb6cb"}},overrides:{MuiOutlinedInput:{notchedOutline:{borderColor:"#007ebe",borderWidth:1}},MuiInputLabel:{root:{color:"#007ebe"}}}}),q=a(17),H=a(18),J=a(83),Y=a(84),_=function(e){Object(Y.a)(a,e);var t=Object(J.a)(a);function a(){return Object(q.a)(this,a),t.apply(this,arguments)}return Object(H.a)(a,[{key:"componentDidUpdate",value:function(e){this.props.location!==e.location&&window.scrollTo(0,0)}},{key:"render",value:function(){return this.props.children}}]),a}(n.Component),G=Object(N.g)(_),K=(a(153),function(e){return i.a.createElement(f.a,null,i.a.createElement(k.a,null,i.a.createElement(R.a,{theme:U},i.a.createElement(G,null,e.children))))});s.a.render(i.a.createElement(K,null,i.a.createElement(M,null)),document.getElementById("root"))},33:function(e,t,a){"use strict";a.d(t,"b",(function(){return x})),a.d(t,"a",(function(){return w}));var n=a(0),i=a.n(n),r=a(59),s=a(4),c=a.n(s),o=a(5),u=a(17),l=a(18),p=a(1),h=a(8),m=a(7),f=a.n(m),d=function(){function e(){Object(u.a)(this,e),this.patientId="",this.patientName="",this.showPatientNameInput=!1,this.note="",this.medicins=[],this.classifications=[],this.selectedClassification=-1,this.submitingPrescription=!1,this.loading=!0,this.redirect=!1}return Object(l.a)(e,[{key:"SetPatientId",value:function(e){this.patientId=e,this.FetchPatientName()}},{key:"SetPatientName",value:function(e){this.patientName=e}},{key:"FetchPatientName",value:function(){var e=Object(o.a)(c.a.mark((function e(){var t,a,n=this;return c.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(e.prev=0,!(this.patientId.length<6)){e.next=3;break}return e.abrupt("return");case 3:return e.next=5,f.a.get("/api/users/patient?id=".concat(this.patientId));case 5:t=e.sent,a=t.data.data,Object(p.p)((function(){a.Name?(n.patientName=a.Name,n.showPatientNameInput=!1):n.showPatientNameInput=!0})),e.next=14;break;case 10:e.prev=10,e.t0=e.catch(0),this.showPatientNameInput=!0,this.patientName="";case 14:case"end":return e.stop()}}),e,this,[[0,10]])})));return function(){return e.apply(this,arguments)}}()},{key:"FetchClassifications",value:function(){var e=Object(o.a)(c.a.mark((function e(){var t,a,n=this;return c.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,f.a.get("/api/medicins/classifications");case 3:t=e.sent,a=t.data.data,Object(p.p)((function(){n.classifications=a,n.loading=!1})),e.next=10;break;case 8:e.prev=8,e.t0=e.catch(0);case 10:case"end":return e.stop()}}),e,null,[[0,8]])})));return function(){return e.apply(this,arguments)}}()},{key:"SelectClassification",value:function(e){this.selectedClassification=e}},{key:"AddMedicine",value:function(e){this.medicins.push(e)}},{key:"RemoveMedicin",value:function(e){this.medicins=this.medicins.filter((function(t,a){return a!==e}))}},{key:"ToggleChronic",value:function(e){this.medicins[e].isChronic=!this.medicins[e].isChronic}},{key:"ToggleBold",value:function(e){this.medicins[e].isBold=!this.medicins[e].isBold}},{key:"SetNote",value:function(e){this.note=e}},{key:"SubmitPrescription",value:function(){var e=Object(o.a)(c.a.mark((function e(){var t,a=this;return c.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(e.prev=0,!this.submitingPrescription){e.next=3;break}return e.abrupt("return");case 3:return this.submitingPrescription=!0,t={patientId:this.patientId,patientName:this.patientName,note:this.note,medicins:Object(p.r)(this.medicins),classificationId:this.selectedClassification},e.next=7,f.a.post("/api/patients/new-prescription",Object(r.a)({},t));case 7:h.NotificationManager.success("Prescription Created Successfully"),this.submitingPrescription=!1,setTimeout((function(){Object(p.p)((function(){a.redirect=!0}))}),3e3),e.next=16;break;case 12:e.prev=12,e.t0=e.catch(0),h.NotificationManager.error(e.t0.response.data.message,e.t0.response.data.title),this.submitingPrescription=!1;case 16:case"end":return e.stop()}}),e,this,[[0,12]])})));return function(){return e.apply(this,arguments)}}()}]),e}();Object(p.j)(d,{redirect:p.o,loading:p.o,selectedClassification:p.o,patientId:p.o,showPatientNameInput:p.o,submitingPrescription:p.o,patientName:p.o,note:p.o,medicins:p.o,classifications:p.o,AddMedicine:p.f,SetPatientId:p.f,FetchClassifications:p.f,RemoveMedicin:p.f,ToggleBold:p.f,ToggleChronic:p.f,SelectClassification:p.f,SetNote:p.f,SubmitPrescription:p.f,FetchPatientName:p.f,SetPatientName:p.f});var v=d,g=function(){function e(){Object(u.a)(this,e),this.patientId="",this.patientName="",this.classifications=[],this.allPrescriptions=[],this.prescriptions=[],this.chronicMedicins=[],this.selectedClassification=0,this.loading=!0,this.loadingPrescriptions=!1}return Object(l.a)(e,[{key:"SetPatientId",value:function(e){this.patientId=e,this.FetchPatientName(),this.FetchPrescriptions()}},{key:"FetchPatientName",value:function(){var e=Object(o.a)(c.a.mark((function e(){var t,a,n=this;return c.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,f.a.get("/api/users/patient?id=".concat(this.patientId));case 3:t=e.sent,a=t.data.data,Object(p.p)((function(){n.patientName=a.Name})),e.next=11;break;case 8:e.prev=8,e.t0=e.catch(0),this.patientName="";case 11:case"end":return e.stop()}}),e,this,[[0,8]])})));return function(){return e.apply(this,arguments)}}()},{key:"FilterPrescriptions",value:function(){var e=this;this.selectedClassification?this.prescriptions=this.allPrescriptions.filter((function(t){return t.Classification_Id===e.selectedClassification})):this.prescriptions=this.allPrescriptions}},{key:"FetchClassifications",value:function(){var e=Object(o.a)(c.a.mark((function e(){var t,a,n=this;return c.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,f.a.get("/api/medicins/classifications");case 3:t=e.sent,a=t.data.data,Object(p.p)((function(){n.classifications=a,n.loading=!1})),e.next=10;break;case 8:e.prev=8,e.t0=e.catch(0);case 10:case"end":return e.stop()}}),e,null,[[0,8]])})));return function(){return e.apply(this,arguments)}}()},{key:"FetchPrescriptions",value:function(){var e=Object(o.a)(c.a.mark((function e(){var t,a,n,i=this;return c.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,this.loadingPrescriptions=!0,t=(t="/api/patients/prescriptions?").concat("patientId=".concat(this.patientId)),e.next=6,f.a.get(t);case 6:a=e.sent,n=a.data.data,Object(p.p)((function(){i.allPrescriptions=n.prescriptions,i.chronicMedicins=n.chronicMedicins,i.loadingPrescriptions=!1})),this.FilterPrescriptions(),e.next=19;break;case 12:if(e.prev=12,e.t0=e.catch(0),"AbortError"!==e.t0.name){e.next=16;break}return e.abrupt("return");case 16:console.log(e.t0),h.NotificationManager.error(e.t0.response.data.message,e.t0.response.data.title),this.loadingPrescriptions=!1;case 19:case"end":return e.stop()}}),e,this,[[0,12]])})));return function(){return e.apply(this,arguments)}}()},{key:"SelectClassification",value:function(){var e=Object(o.a)(c.a.mark((function e(t){return c.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(t===this.selectedClassification?this.selectedClassification=0:this.selectedClassification=t,!this.patientId||0!==this.allPrescriptions.length){e.next=6;break}return e.next=4,this.FetchPrescriptions();case 4:e.next=7;break;case 6:this.FilterPrescriptions();case 7:case"end":return e.stop()}}),e,this)})));return function(t){return e.apply(this,arguments)}}()}]),e}();Object(p.j)(g,{loading:p.o,loadingPrescriptions:p.o,selectedClassification:p.o,prescriptions:p.o,chronicMedicins:p.o,patientId:p.o,patientName:p.o,classifications:p.o,SetPatientId:p.f,FetchClassifications:p.f,SelectClassification:p.f,FetchPrescriptions:p.f,FetchPatientName:p.f});var b=g,k=function(){function e(){Object(u.a)(this,e),this.patientId="",this.patientName="",this.prescriptions=[],this.loading=!0,this.loadingPrescriptions=!1}return Object(l.a)(e,[{key:"SetPatientId",value:function(e){this.patientId=e,this.FetchPatientName(),this.FetchPrescriptions()}},{key:"FetchPatientName",value:function(){var e=Object(o.a)(c.a.mark((function e(){var t,a,n=this;return c.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,f.a.get("/api/users/patients?id=".concat(this.patientId));case 3:t=e.sent,a=t.data.data,Object(p.p)((function(){n.patientName=a.Name})),e.next=11;break;case 8:e.prev=8,e.t0=e.catch(0),this.patientName="";case 11:case"end":return e.stop()}}),e,this,[[0,8]])})));return function(){return e.apply(this,arguments)}}()},{key:"Dispense",value:function(){var e=Object(o.a)(c.a.mark((function e(t){var a,n=arguments;return c.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return a=n.length>1&&void 0!==n[1]?n[1]:[],e.prev=1,e.next=4,f.a.post("/api/patients/dispense",{prescriptionId:t,medicins:a});case 4:h.NotificationManager.success("Prescription Dispensed Successfully"),this.FetchPrescriptions(),e.next=11;break;case 8:e.prev=8,e.t0=e.catch(1),h.NotificationManager.error(e.t0.response.data.message,e.t0.response.data.title);case 11:case"end":return e.stop()}}),e,this,[[1,8]])})));return function(t){return e.apply(this,arguments)}}()},{key:"FetchPrescriptions",value:function(){var e=Object(o.a)(c.a.mark((function e(){var t,a,n,i=this;return c.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,this.loadingPrescriptions=!0,t=(t="/api/patients/prescriptions-to-dispense?").concat("patientId=".concat(this.patientId)),e.next=6,f.a.get(t);case 6:a=e.sent,n=a.data.data,Object(p.p)((function(){i.prescriptions=n.prescriptions,i.loadingPrescriptions=!1})),e.next=15;break;case 11:e.prev=11,e.t0=e.catch(0),h.NotificationManager.error(e.t0.response.data.message,e.t0.response.data.title),this.loadingPrescriptions=!1;case 15:case"end":return e.stop()}}),e,this,[[0,11]])})));return function(){return e.apply(this,arguments)}}()},{key:"SelectClassification",value:function(e){this.selectedClassification=e,this.patientId&&this.FetchPrescriptions()}}]),e}();Object(p.j)(k,{loading:p.o,loadingPrescriptions:p.o,prescriptions:p.o,patientId:p.o,patientName:p.o,SetPatientId:p.f,FetchPrescriptions:p.f,FetchPatientName:p.f});var N=k,y=function(){function e(){Object(u.a)(this,e),this.username="",this.role="",this.messagesCategories=[],this.username=localStorage.getItem("username"),this.role=localStorage.getItem("user-role"),this.doctorName=localStorage.getItem("doctorName")||void 0,this.pharmacyName=localStorage.getItem("pharmacyName")||void 0}return Object(l.a)(e,[{key:"Login",value:function(){var e=Object(o.a)(c.a.mark((function e(t,a){var n,i,r=this;return c.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,f.a.post("/api/users/login",{username:t,password:a});case 3:n=e.sent,i=n.data.data,Object(p.p)((function(){var e="/";r.role=i.role,localStorage.clear(),localStorage.setItem("refreshToken",i.refreshToken),localStorage.setItem("username",i.username),localStorage.setItem("user-role",r.role),i.DoctorName?(r.doctorName=i.DoctorName,localStorage.setItem("doctorName",r.doctorName),h.NotificationManager.success("Welcome Back Doctor "+r.doctorName)):i.PharmacyName?(r.pharmacyName=i.PharmacyName,localStorage.setItem("pharmacyName",r.pharmacyName),h.NotificationManager.success("Welcome Back ")):i.IsAdmin&&(e="/admin",h.NotificationManager.success("Welcome Back Admin ")),setTimeout((function(){Object(p.p)((function(){r.username=i.username,window.location=e}))}),3e3)})),e.next=11;break;case 8:e.prev=8,e.t0=e.catch(0),h.NotificationManager.error(e.t0.response.data.message,e.t0.response.data.title);case 11:case"end":return e.stop()}}),e,null,[[0,8]])})));return function(t,a){return e.apply(this,arguments)}}()},{key:"SendRequest",value:function(){var e=Object(o.a)(c.a.mark((function e(t,a,n,i){return c.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,f.a.post("/api/users/request-account",{name:t,type:a,phone:n,email:i});case 3:h.NotificationManager.success(" Your Request was sent successfuly"),e.next=9;break;case 6:e.prev=6,e.t0=e.catch(0),h.NotificationManager.error(e.t0.response.data.message,e.t0.response.data.title);case 9:case"end":return e.stop()}}),e,null,[[0,6]])})));return function(t,a,n,i){return e.apply(this,arguments)}}()},{key:"Logout",value:function(){var e=Object(o.a)(c.a.mark((function e(){return c.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,f.a.get("/api/users/logout");case 3:e.next=7;break;case 5:e.prev=5,e.t0=e.catch(0);case 7:return e.prev=7,localStorage.clear(),window.location="/login",e.finish(7);case 11:case"end":return e.stop()}}),e,null,[[0,5,7,11]])})));return function(){return e.apply(this,arguments)}}()},{key:"FetchMessagesCategories",value:function(){var e=Object(o.a)(c.a.mark((function e(){var t,a,n=this;return c.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,f.a.get("/api/users/messages-categories");case 3:t=e.sent,a=t.data.data,Object(p.p)((function(){n.messagesCategories=a})),e.next=10;break;case 8:e.prev=8,e.t0=e.catch(0);case 10:case"end":return e.stop()}}),e,null,[[0,8]])})));return function(){return e.apply(this,arguments)}}()},{key:"SendMessage",value:function(){var e=Object(o.a)(c.a.mark((function e(t,a){return c.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,f.a.post("/api/users/send-message",{category:t,content:a});case 3:h.NotificationManager.success(" Your Message was sent successfuly"),e.next=9;break;case 6:e.prev=6,e.t0=e.catch(0),h.NotificationManager.error(e.t0.response.data.message,e.t0.response.data.title);case 9:case"end":return e.stop()}}),e,null,[[0,6]])})));return function(t,a){return e.apply(this,arguments)}}()}]),e}();Object(p.j)(y,{username:p.o,role:p.o,messagesCategories:p.o,doctorName:p.o,pharmacyName:p.o,Login:p.f,Logout:p.f,FetchMessagesCategories:p.f});var P=new y,x=i.a.createContext(),w=function(e){return i.a.createElement(x.Provider,{value:{NewPrescriptionStore:v,PatientPrescriptionsStore:b,AppStore:P,PrescriptionsDispensingStore:N}},e.children)}},57:function(e,t,a){"use strict";var n=a(0),i=a.n(n),r=a(91),s=a.n(r),c=a(99);t.a=function(e){var t=Object(c.a)();return i.a.createElement("div",{className:"row justify-content-center align-content-center py-5",style:{minHeight:e.fullPage?"88vh":void 0}},i.a.createElement(s.a,Object.assign({height:55,width:8,margin:3,color:t.palette.primary.main,loading:!0},e)),i.a.createElement("h2",{className:"text-primary col-12 text-center py-2"},e.message||"Loading"))}}},[[103,3,4]]]);
//# sourceMappingURL=main.e804a3c6.chunk.js.map