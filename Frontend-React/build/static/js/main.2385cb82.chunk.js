(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{124:function(e,a,t){},126:function(e,a,t){"use strict";t.r(a);var n=t(0),r=t.n(n),o=t(39),l=t(21),i=t(13),s=t(14),c=t(64),u=t(65),p=t.n(u),d=t(10),m=function(e,a){return fetch("https://api.team9postoffice.ga"+e,{method:"post",credentials:"include",headers:{accept:"application/json, text/plain, */*","content-type":"application/json"},body:JSON.stringify(a)}).then(function(e){if(e.ok)return e.json();throw new Error("Server Error. Please try again")})},h={email:"",password:"",error:{is:!1,msg:""}},E=function(e){return function(a){a({type:"login/UPDATE_PASSWORD_FIELD",payload:{password:e}})}},g=function(e){return function(a){a({type:"login/UPDATE_EMAIL_FIELD",payload:{email:e}})}},f=function(e,a){return function(t){t({type:"login/REQUEST_LOGIN"}),m("/auth",{email:e,password:a}).then(function(e){if(console.log(e),!e.isAuth)throw new Error("Invalid Credentials.");t({type:"login/LOGIN_SUCCESS"}),t(Object(i.push)("/"))}).catch(function(e){t({type:"login/LOGIN_FAILED",payload:{error:{is:!0,msg:e.message}}})})}},y=t(28),b=t.n(y),O={role:"",errorMsg:""},v=function(){return function(e){e({type:"home/FETCH_ROLE_COOKIE"});var a=b.a.get("role");a?e({type:"home/SET_ROLE_COOKIE",payload:{role:a}}):(e({type:"home/FAIL_ROLE_COOKIE"}),e(Object(i.push)("/login")))}},S={firstName:"",lastName:"",email:"",password:"",address:"",address2:"",city:"",stateUS:"Choose...",zip:"",error:{is:!1,msg:""}},C=function(e){return function(a){a({type:"signup/UPDATE_PASSWORD_FIELD",payload:{password:e}})}},I=function(e){return function(a){a({type:"signup/UPDATE_EMAIL_FIELD",payload:{email:e}})}},_=function(e){return function(a){a({type:"signup/UPDATE_ADDRESS_FIELD",payload:{address:e}})}},A=function(e){return function(a){a({type:"signup/UPDATE_ADDRESS2_FIELD",payload:{address2:e}})}},L=function(e){return function(a){a({type:"signup/UPDATE_STATE_FIELD",payload:{stateUS:e}})}},D=function(e){return function(a){a({type:"signup/UPDATE_ZIP_FIELD",payload:{zip:e}})}},w=function(e){return function(a){a({type:"signup/UPDATE_CITY_FIELD",payload:{city:e}})}},F=function(e){return function(a){a({type:"signup/UPDATE_FIRST_NAME_FIELD",payload:{firstName:e}})}},j=function(e){return function(a){a({type:"signup/UPDATE_LAST_NAME_FIELD",payload:{lastName:e}})}},N=function(){return function(e){e({type:"signup/SIGNUP_REQUEST"}),m("/signup/customer",{}).then(function(a){if(!a.success)throw new Error("Could not signup!");e({type:"signup/SIGNUP_SUCCESS"}),e(Object(i.push)("/"))}).catch(function(a){console.log(a),e({type:"signup/SIGNUP_FAILED",payload:{is:!0,msg:a.message}})})}},P=Object(s.c)({login:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:h,a=arguments.length>1?arguments[1]:void 0;switch(a.type){case"login/UPDATE_PASSWORD_FIELD":return Object(d.a)({},e,{password:a.payload.password});case"login/UPDATE_EMAIL_FIELD":return Object(d.a)({},e,{email:a.payload.email});case"login/REQUEST_LOGIN":return e;case"login/LOGIN_FAILED":return Object(d.a)({},e,{error:a.payload.error});case"login/LOGIN_SUCCESS":return Object(d.a)({},e);default:return e}},home:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:O,a=arguments.length>1?arguments[1]:void 0;switch(a.type){case"home/FETCH_ROLE_COOKIE":return e;case"home/SET_ROLE_COOKIE":return Object(d.a)({},e,{role:a.payload.role});case"home/FAIL_ROLE_COOKIE":default:return e}},signup:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:S,a=arguments.length>1?arguments[1]:void 0;switch(a.type){case"signup/UPDATE_PASSWORD_FIELD":return Object(d.a)({},e,{password:a.payload.password});case"signup/UPDATE_EMAIL_FIELD":return Object(d.a)({},e,{email:a.payload.email});case"signup/UPDATE_ADDRESS_FIELD":return Object(d.a)({},e,{address:a.payload.address});case"signup/UPDATE_ADDRESS2_FIELD":return Object(d.a)({},e,{address2:a.payload.address2});case"signup/UPDATE_STATE_FIELD":return Object(d.a)({},e,{stateUS:a.payload.stateUS});case"signup/UPDATE_CITY_FIELD":return Object(d.a)({},e,{city:a.payload.city});case"signup/UPDATE_ZIP_FIELD":return Object(d.a)({},e,{zip:a.payload.zip});case"signup/UPDATE_FIRST_NAME_FIELD":return Object(d.a)({},e,{firstName:a.payload.firstName});case"signup/UPDATE_LAST_NAME_FIELD":return Object(d.a)({},e,{lastName:a.payload.lastName});case"signup/SIGNUP_FAILED":return Object(d.a)({},e,{error:a.payload.error});case"signup/SIGNUP_SUCCESS":case"signup/SIGNUP_REQUEST":return Object(d.a)({},e);default:return e}}}),T=t(66),U=t.n(T),G=p()(),k=[c.a,Object(i.routerMiddleware)(G),U.a],R=s.d.apply(void 0,[s.a.apply(void 0,k)].concat([])),M=Object(s.e)(Object(i.connectRouter)(G)(P),{},R),x=t(128),H=t(16),W=t(17),z=t(20),K=t(18),Z=t(19),J=function(e){function a(){return Object(H.a)(this,a),Object(z.a)(this,Object(K.a)(a).apply(this,arguments))}return Object(Z.a)(a,e),Object(W.a)(a,[{key:"render",value:function(){return r.a.createElement("div",null,r.a.createElement("p",null,"Customer"))}}]),a}(r.a.Component),Y=function(e){function a(e){var t;return Object(H.a)(this,a),(t=Object(z.a)(this,Object(K.a)(a).call(this,e))).props.getRoleCookie(),t}return Object(Z.a)(a,e),Object(W.a)(a,[{key:"render",value:function(){var e,a=this.props.role;return console.log(a),"Customer"===a?e=r.a.createElement(J,null):"Facility"===a?e=r.a.createElement("p",null,"Facility Home"):"Truck"===a?e=r.a.createElement("p",null,"Truck Home"):this.props.pushLogin(),r.a.createElement("div",null,e)}}]),a}(r.a.Component),Q=Object(l.connect)(function(e){return{role:e.home.role}},function(e){return Object(s.b)({getRoleCookie:v,pushLogin:function(){return Object(i.push)("login")}},e)})(Y),B=function(){return r.a.createElement("div",null,r.a.createElement("h1",null,"About Page"),r.a.createElement("p",null,"Did you get here via Redux?"))},V=t(2),q=t.n(V),X=t(26),$=t.n(X),ee=t(45),ae=t.n(ee),te=function(){var e=b.a.get("user_id"),a=b.a.get("role");return e&&a},ne=function(e){function a(){var e,t;Object(H.a)(this,a);for(var n=arguments.length,r=new Array(n),o=0;o<n;o++)r[o]=arguments[o];return(t=Object(z.a)(this,(e=Object(K.a)(a)).call.apply(e,[this].concat(r)))).handlePasswordChange=function(e){console.log(e.target.value),t.props.updatePasswordField(e.target.value)},t.handleEmailChange=function(e){console.log(e.target.value),t.props.updateEmailField(e.target.value)},t.handleSubmitClick=function(){console.log(t.props.email),console.log(t.props.password),t.props.checkLoginCredentials(t.props.email,t.props.password)},t}return Object(Z.a)(a,e),Object(W.a)(a,[{key:"componentDidMount",value:function(){te()&&this.props.pushHome()}},{key:"render",value:function(){return r.a.createElement("div",{style:re},this.props.error.is?r.a.createElement(ae.a,{variant:"danger"}," ",r.a.createElement(ae.a.Heading,null,"Login Error!"),r.a.createElement("p",null,"Your email or password is incorrect. Try again.")):null,r.a.createElement(q.a,{style:oe},r.a.createElement(q.a.Group,{controlId:"formBasicEmail"},r.a.createElement(q.a.Label,null,"Email address"),r.a.createElement(q.a.Control,{type:"email",placeholder:"Enter email",value:this.props.email,onChange:this.handleEmailChange.bind(this)}),r.a.createElement(q.a.Text,{className:"text-muted"},"We'll never share your email with anyone else.")),r.a.createElement(q.a.Group,{controlId:"formBasicPassword"},r.a.createElement(q.a.Label,null,"Password"),r.a.createElement(q.a.Control,{type:"password",placeholder:"Password",value:this.props.password,onChange:this.handlePasswordChange.bind(this)})),r.a.createElement($.a,{variant:"primary",size:"large",onClick:this.handleSubmitClick.bind(this)},"Submit")))}}]),a}(r.a.Component),re={textAlign:"center"},oe={display:"inline-block",margin:"0 auto",marginTop:"3%",width:"20%"},le=Object(l.connect)(function(e){var a=e.login;return{email:a.email,password:a.password,error:a.error}},function(e){return Object(s.b)({updatePasswordField:E,updateEmailField:g,checkLoginCredentials:f,pushHome:function(){return Object(i.push)("/")}},e)})(ne),ie=t(47),se=t.n(ie),ce=t(46),ue=t.n(ce),pe=t(43),de=t.n(pe),me=function(e){function a(){return Object(H.a)(this,a),Object(z.a)(this,Object(K.a)(a).apply(this,arguments))}return Object(Z.a)(a,e),Object(W.a)(a,[{key:"render",value:function(){return r.a.createElement("div",null,r.a.createElement("link",{rel:"stylesheet",href:"https://maxcdn.bootstrapcdn.com/bootstrap/4.2.1/css/bootstrap.min.css",integrity:"sha384-GJzZqFGwb1QTTN6wy59ffF1BuGJpLSa9DkKMp0DgiMDm4iYMj70gZWKYbI706tWS",crossOrigin:"anonymous"}),r.a.createElement(ue.a,{bg:"primary",variant:"dark"},r.a.createElement(ue.a.Brand,{href:"/"},"Navbar"),r.a.createElement(se.a,{className:"mr-auto"},r.a.createElement(se.a.Link,{href:"/"},"Home")),r.a.createElement(q.a,{inline:!0},r.a.createElement(de.a,{type:"text",placeholder:"Search",className:"mr-sm-2"}),r.a.createElement($.a,{variant:"outline-light"},"Search"))))}}]),a}(r.a.Component),he=t(22),Ee=t.n(he),ge=t(67),fe=function(e){function a(){var e,t;Object(H.a)(this,a);for(var n=arguments.length,r=new Array(n),o=0;o<n;o++)r[o]=arguments[o];return(t=Object(z.a)(this,(e=Object(K.a)(a)).call.apply(e,[this].concat(r)))).handleEmail=function(e){console.log(e.target.value),t.props.updateEmailField(e.target.value)},t.handlePassword=function(e){console.log(e.target.value),t.props.updatePasswordField(e.target.value)},t.handleFirstName=function(e){console.log(e.target.value),t.props.updateFirstNameField(e.target.value)},t.handleLastName=function(e){console.log(e.target.value),t.props.updateLastNameField(e.target.value)},t.handleCity=function(e){console.log(e.target.value),t.props.updateCityField(e.target.value)},t.handleZip=function(e){console.log(e.target.value),t.props.updateZipField(e.target.value)},t.handleAddress=function(e){console.log(e.target.value),t.props.updateAddressField(e.target.value)},t.handleAddress2=function(e){console.log(e.target.value),t.props.updateAddress2Field(e.target.value)},t.handleState=function(e){console.log(e.target.value),t.props.updateStateField(e.target.value)},t.handleSubmit=function(e){t.props.submit()},t}return Object(Z.a)(a,e),Object(W.a)(a,[{key:"componentDidMount",value:function(){te()&&this.props.pushHome()}},{key:"render",value:function(){return r.a.createElement("div",{style:be},r.a.createElement("h1",{style:ye}," Sign up here! "),r.a.createElement(q.a,{style:Oe},r.a.createElement(q.a.Row,null,r.a.createElement(q.a.Group,{as:Ee.a,controlId:"formGridFirstName"},r.a.createElement(q.a.Label,null,"First Name"),r.a.createElement(q.a.Control,{placeholder:"First Name",value:this.props.firstName,onChange:this.handleFirstName.bind(this)})),r.a.createElement(q.a.Group,{as:Ee.a,controlId:"formGridLastName"},r.a.createElement(q.a.Label,null,"Last Name"),r.a.createElement(q.a.Control,{placeholder:"Last Name",value:this.props.firstName,onChange:this.handleLastName.bind(this)}))),r.a.createElement(q.a.Row,null,r.a.createElement(q.a.Group,{as:Ee.a,controlId:"formGridEmail"},r.a.createElement(q.a.Label,null,"Email"),r.a.createElement(q.a.Control,{type:"email",placeholder:"Enter email",value:this.props.email,onChange:this.handleEmail.bind(this)})),r.a.createElement(q.a.Group,{as:Ee.a,controlId:"formGridPassword"},r.a.createElement(q.a.Label,null,"Password"),r.a.createElement(q.a.Control,{type:"password",placeholder:"Password",value:this.props.password,onChange:this.handlePassword.bind(this)}))),r.a.createElement(q.a.Group,{controlId:"formGridAddress1"},r.a.createElement(q.a.Label,null,"Address"),r.a.createElement(q.a.Control,{placeholder:"1234 Main St",value:this.props.address,onChange:this.handleAddress.bind(this)})),r.a.createElement(q.a.Group,{controlId:"formGridAddress2"},r.a.createElement(q.a.Label,null,"Address 2"),r.a.createElement(q.a.Control,{placeholder:"Apartment, studio, or floor",value:this.props.address2,onChange:this.handleAddress2.bind(this)})),r.a.createElement(q.a.Row,null,r.a.createElement(q.a.Group,{as:Ee.a,controlId:"formGridCity"},r.a.createElement(q.a.Label,null,"City"),r.a.createElement(q.a.Control,{value:this.props.city,onChange:this.handleCity.bind(this)})),r.a.createElement(q.a.Group,{as:Ee.a,controlId:"formGridState"},r.a.createElement(q.a.Label,null,"State"),r.a.createElement(q.a.Control,{as:"select",value:this.props.stateUS,onChange:this.handleState.bind(this)},r.a.createElement("option",null,"Choose..."),ve.map(function(e){return r.a.createElement("option",null,e)}))),r.a.createElement(q.a.Group,{as:Ee.a,controlId:"formGridZip"},r.a.createElement(q.a.Label,null,"Zip"),r.a.createElement(q.a.Control,{value:this.props.zip,onChange:this.handleZip.bind(this)}))),r.a.createElement($.a,{variant:"primary",type:"submit",onClick:this.handleSubmit.bind(this)},"Submit")),";")}}]),a}(r.a.Component),ye={marginTop:"3%"},be={textAlign:"center"},Oe={display:"inline-block",margin:"0 auto",marginTop:"3%"},ve=Object(ge.a)(["Alabama","Alaska","Arizona","Arkansas","California","Colorado","Connecticut","Delaware","Florida","Georgia","Hawaii","Idaho","Illinois","Indiana","Iowa","Kansas","Kentucky","Louisiana","Maine","Maryland","Massachusetts","Michigan","Minnesota","Mississippi","Missouri","Montana","Nebraska","Nevada","New Hampshire","New Jersey","New Mexico","New York","North Carolina","North Dakota","Ohio","Oklahoma","Oregon","Pennsylvania","Rhode Island","South Carolina","South Dakota","Tennessee","Texas","Utah","Vermont","Virginia","Washington","West Virginia","Wisconsin","Wyoming","District of Columbia","Puerto Rico","Guam","American Samoa","U.S. Virgin Islands","Northern Mariana Islands"]),Se=Object(l.connect)(function(e){var a=e.signup;return{email:a.email,password:a.password,address:a.address,address2:a.address2,stateUS:a.stateUS,zip:a.zip,city:a.city,firstName:a.firstName,lastName:a.lastName}},function(e){return Object(s.b)({updateAddressField:_,updateCityField:w,updateAddress2Field:A,updateZipField:D,updateStateField:L,updatePasswordField:C,updateEmailField:I,updateFirstNameField:F,updateLastNameField:j,submit:N,pushHome:function(){return Object(i.push)("/")}},e)})(fe),Ce=function(){return r.a.createElement("div",null,r.a.createElement("header",null,r.a.createElement(me,null)),r.a.createElement("main",null,r.a.createElement(x.a,{exact:!0,path:"/",component:Q}),r.a.createElement(x.a,{exact:!0,path:"/about-us",component:B}),r.a.createElement(x.a,{exact:!0,path:"/login",component:le}),r.a.createElement(x.a,{exact:!0,path:"/signup",component:Se})))},Ie=(t(122),t(124),document.querySelector("#root"));Object(o.render)(r.a.createElement(l.Provider,{store:M},r.a.createElement(i.ConnectedRouter,{history:G},r.a.createElement("div",null,r.a.createElement(Ce,null)))),Ie)},68:function(e,a,t){e.exports=t(126)}},[[68,2,1]]]);
//# sourceMappingURL=main.2385cb82.chunk.js.map