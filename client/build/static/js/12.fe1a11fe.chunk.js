(this.webpackJsonpclient=this.webpackJsonpclient||[]).push([[12],{234:function(e,t,a){"use strict";var n=a(0),c=a.n(n),r=a(72),o=a(312);t.a=Object(r.a)((function(e){var t=e.store;return c.a.createElement("div",{className:"row justify-content-center"},t.classifications.map((function(e){return c.a.createElement(o.a,{title:e.Name,key:e.Id,enterDelay:1e3},c.a.createElement("div",{className:"classification-icon  mx-4 my-2 ".concat(t.selectedClassification===e.Id?"selected":""),onClick:function(){return t.SelectClassification(e.Id)}},c.a.createElement("img",{src:e.ImageUrl,alt:e.Name})))})))}))},303:function(e,t,a){"use strict";a.r(t);var n=a(73),c=a(0),r=a.n(c),o=a(308),l=a(72),i=a(213),s=Object(l.a)((function(e){var t=e.store,a=Object(c.useState)(""),l=Object(n.a)(a,2),s=l[0],m=l[1],u=Object(c.useState)(""),p=Object(n.a)(u,2),d=p[0],f=p[1],b=Object(i.a)("common").t;return r.a.createElement("div",{className:" mx-auto row flex-column",style:{maxWidth:330}},r.a.createElement(o.a,{id:"patient-id",label:b("patient id"),type:"number",value:s,onChange:function(e){return m(e.target.value)},onBlur:function(){return t.SetPatientId(s)},onKeyUp:function(e){return 13===e.keyCode&&e.target.blur()},variant:"outlined",color:"primary",className:" mb-3"}),!t.showPatientNameInput&&r.a.createElement("h2",{className:"my-2"},t.patientName),t.showPatientNameInput&&r.a.createElement(o.a,{id:"patient-name",label:b("patient name"),value:d,onChange:function(e){return f(e.target.value)},onBlur:function(){return t.SetPatientName(d)},variant:"outlined",color:"primary",className:" mb-3"}))})),m=a(269),u=Object(l.a)((function(e){var t=e.store,a=Object(i.a)("common").t;return r.a.createElement("div",{className:"row mt-5 mb-5 "},r.a.createElement("div",{className:"container-note col-8 mx-auto px-0"},r.a.createElement("p",{className:"note bg-primary"},a("note")),r.a.createElement("textarea",{type:"text",className:"write-note",required:!0,value:t.note,onChange:function(e){return t.SetNote(e.target.value)}}),r.a.createElement("div",{className:"line1"}),r.a.createElement("div",{className:"line2"}),r.a.createElement("div",{className:"line3"}),r.a.createElement("div",{className:"line4"}),r.a.createElement("div",{className:"line5"})))})),p=a(21),d=a(22),f=a(98),b=a(100),v=a(101),E=a(270),h=a(263),g=a.n(h),y=a(7),O=a.n(y),N=function(e){Object(v.a)(a,e);var t=Object(b.a)(a);function a(e){var n;return Object(p.a)(this,a),(n=t.call(this,e)).handleChange=function(e){n.props.handleSelect&&n.props.handleSelect(e),n.setState({selectedOption:""}),n.props.autoFocus&&n.refs.input.focus(),n.props.actionOnSelectedOption&&n.props.actionOnSelectedOption(e.value)},n.mapOptionsToValues=function(e){return e.map((function(e){return{value:e.Id,label:e.Name}}))},n.getOptions=function(e,t){if(!e)return t([]);n.source.cancel("search value updated"),n.source=n.CancelToken.source();var a=n.props.queryName,c="".concat(n.props.fetchUrl).concat(a?"?".concat(a,"=").concat(e):"");O.a.get(c,{cancelToken:n.source.token}).then((function(e){var a=e.data.data;n.props.mapOptionsToValues?t(n.props.mapOptionsToValues(a)):t(n.mapOptionsToValues(a))})).catch((function(e){}))},n.state={selectedOption:n.props.defaultValue},n.getOptions=g.a.debounce(n.getOptions.bind(Object(f.a)(n)),500),n.CancelToken=O.a.CancelToken,n.source=n.CancelToken.source(),n}return Object(d.a)(a,[{key:"render",value:function(){var e=this.props,t=e.defaultOptions,a=e.placeholder,n=e.inputId;return r.a.createElement(E.a,{ref:"input",className:this.props.classes,isMulti:this.props.isMulti,inputId:n,cacheOptions:!0,value:this.state.selectedOption,defaultOptions:t,loadOptions:this.getOptions,placeholder:a,onChange:this.handleChange})}}]),a}(r.a.Component),j=function(e){var t=e.store,a=Object(i.a)("common").t;return r.a.createElement("div",{className:"col-12 py-5 mx-auto row justify-content-center"},r.a.createElement("div",{style:{width:"100%"}},r.a.createElement(N,{fetchUrl:"/api/medicins",autoFocus:!0,queryName:"name",classes:"w-100",placeholder:a("type med name"),handleSelect:function(e){t.AddMedicine(e)}})))},x=a(247),C=a(271),w=a(265),k=a.n(w),S=Object(x.a)({root:function(){return{background:"#FFF",borderBottom:"1px solid #999",borderWidth:"1px !important"}},icon:{cursor:"pointer"}}),T=function(e){var t=e.name,a=(e.id,e.onRemove),n=e.onToggleBold,c=e.onToggleChronic,o=S();return r.a.createElement("div",{className:"mb-"},r.a.createElement("div",{className:"".concat(o.root," mx-auto px-2 py-2 row justify-content-between ")},r.a.createElement("h5",{className:"mb-0 align-self-center"},t),r.a.createElement("div",{className:"col-12 ml-auto  col-sm-auto row justify-content-end align-items-center"},r.a.createElement(C.a,{color:"primary",inputProps:{"aria-label":"secondary checkbox"},onChange:c}),r.a.createElement(C.a,{color:"primary",inputProps:{"aria-label":"secondary checkbox"},onChange:n}),r.a.createElement(k.a,{onClick:a,style:{color:"#b90404"},className:o.icon}))))},F=Object(l.a)((function(e){var t=e.store,a=t.medicins,n=Object(i.a)("common").t;return r.a.createElement("div",{className:"row justify-content-center align-content-start mx-auto col-12",style:{minHeight:400}},r.a.createElement("div",{className:"col-12 px-0 row justify-content-between"},r.a.createElement("label",{className:""},n("med name")),r.a.createElement("div",null,r.a.createElement("label",{className:"mx-1"},n("chronic")),r.a.createElement("label",{className:"mx-1 mr-4"},n("bold")))),r.a.createElement("div",{className:" w-100"},a.map((function(e,a){return r.a.createElement(T,{key:e.value,name:e.label,onRemove:function(){return t.RemoveMedicin(a)},onToggleBold:function(){return t.ToggleBold(a)},onToggleChronic:function(){return t.ToggleChronic(a)}})}))))})),I=a(224),P=a(46),q=a(29),B=function(e){var t=Object(c.useRef)(null);Object(c.useEffect)((function(){a(e.loading)}),[e.loading]);var a=function(){var e=arguments.length>0&&void 0!==arguments[0]&&arguments[0];t.current&&(e?(t.current.querySelector(".loading").style.display="block",t.current.querySelector(".content").style.display="none"):(t.current.querySelector(".loading").style.display="none",t.current.querySelector(".content").style.display="block"))},n=r.a.cloneElement(e.children,{ref:t});return r.a.createElement(r.a.Fragment,null,n)},V=a(266),M=a.n(V),R=a(129),U=function(e){var t=Object(R.a)();return r.a.createElement("div",{className:"align-self-center"},r.a.createElement(M.a,Object.assign({size:5,color:t.palette.primary.main,loading:!0},e)))},W=a(234),J=a(75),z=Object(x.a)({root:{maxWidth:500,backgroundColor:"#fff",boxShadow:"3px 4px 10px #999"}}),A=function(e){var t=e.store,a=z();return r.a.createElement("div",{className:"".concat(a.root," row mx-auto mb-5 px-3")},r.a.createElement(j,{store:t}),r.a.createElement(F,{store:t}))};t.default=Object(l.a)((function(){var e=Object(c.useContext)(P.b).NewPrescriptionStore,t=Object(c.useState)(new e),a=Object(n.a)(t,1)[0],o=Object(i.a)("common").t;return Object(c.useEffect)((function(){a.FetchClassifications()}),[a]),a.redirect?r.a.createElement(q.a,{to:"/"}):a.loading?r.a.createElement(J.a,null):r.a.createElement(m.a,{pb:8},r.a.createElement(m.a,{pt:5,display:"flex"},r.a.createElement(s,{store:a})),r.a.createElement(W.a,{store:a}),r.a.createElement(u,{store:a}),r.a.createElement(A,{store:a}),r.a.createElement("div",{className:"row justify-content-center py-3"},r.a.createElement(B,{loading:a.submitingPrescription},r.a.createElement(I.a,{variant:"contained",color:"primary",onClick:function(){return a.SubmitPrescription()}},r.a.createElement("span",{className:"content"},o("submit prescription")),r.a.createElement("div",{className:"loading"},r.a.createElement(U,{color:"#FFF"}))))))}))}}]);
//# sourceMappingURL=12.fe1a11fe.chunk.js.map