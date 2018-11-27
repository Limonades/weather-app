(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{10:function(e,t,a){e.exports=a(23)},15:function(e,t,a){},21:function(e,t,a){},23:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),l=a(7),o=a.n(l),c=(a(15),a(1)),i=a(2),s=a(4),u=a(3),m=a(5),h=a(8),f=a.n(h),d=function(e,t){return fetch(e,t).then(function(e){if(200===e.status)return e.json();throw new Error(e.statusText)})},v="https://api.weatherbit.io/v2.0//forecast/daily",p="8fab1e8c72554b01807ac34da3e2cbfc",g=a(9),y=a.n(g),w=function(){return r.a.createElement("img",{style:{width:"".concat(100,"px")},src:y.a,alt:"loader"})},b=(a(21),function(e){function t(){var e,a;Object(c.a)(this,t);for(var n=arguments.length,r=new Array(n),l=0;l<n;l++)r[l]=arguments[l];return(a=Object(s.a)(this,(e=Object(u.a)(t)).call.apply(e,[this].concat(r)))).defineDay=function(e){switch(new Date(1e3*e).getDay()){case 0:return"Sunday";case 1:return"Monday";case 2:return"Tuesday";case 3:return"Wednesday";case 4:return"Thursday";case 5:return"Friday";case 6:return"Saturday";default:console.log("error")}},a}return Object(m.a)(t,e),Object(i.a)(t,[{key:"render",value:function(){var e=this,t=this.props.weekTemp;return r.a.createElement("div",null,r.a.createElement("h5",{className:"week__title"},"forecast for the week"),r.a.createElement("div",{className:"week__day-wrap"},t.slice(1,8).map(function(t,a){return r.a.createElement("div",{className:"week__day",key:a},r.a.createElement("p",null,e.defineDay(t.ts)),r.a.createElement("p",null,t.temp,"\xb0"))})))}}]),t}(r.a.Component)),k=function(e){function t(){var e,a;Object(c.a)(this,t);for(var n=arguments.length,r=new Array(n),l=0;l<n;l++)r[l]=arguments[l];return(a=Object(s.a)(this,(e=Object(u.a)(t)).call.apply(e,[this].concat(r)))).handleClick=function(){var e=a.props,t=e.id;(0,e.removeFromFavorites)(t)},a.handleSearch=function(e){e.preventDefault();var t=a.props,n=t.lat,r=t.lng,l=t.name;(0,t.getData)(n,r,l)},a}return Object(m.a)(t,e),Object(i.a)(t,[{key:"render",value:function(){var e=this.props,t=e.name,a=e.id;return console.log(t),r.a.createElement("li",null,r.a.createElement("a",{onClick:this.handleSearch,href:"/"},t),console.log(a),r.a.createElement("button",{onClick:this.handleClick,type:"button"},"X"))}}]),t}(r.a.Component);k.defaultProps={lat:null,lng:null};var S=k,E=function(e){function t(){return Object(c.a)(this,t),Object(s.a)(this,Object(u.a)(t).apply(this,arguments))}return Object(m.a)(t,e),Object(i.a)(t,[{key:"render",value:function(){var e=this.props,t=e.favorites,a=e.removeFromFavorites,n=e.getData;return r.a.createElement("div",null,r.a.createElement("h2",null,"Favorites"),r.a.createElement("ul",null,t.map(function(e){return r.a.createElement(S,{removeFromFavorites:a,getData:n,key:e.id,id:e.id,name:e.requestName,lat:e.lat,lng:e.lng})})))}}]),t}(r.a.Component),O=function(e){function t(){var e;return Object(c.a)(this,t),(e=Object(s.a)(this,Object(u.a)(t).call(this))).handleSubmit=function(e){e.preventDefault()},e.handleClick=function(){var t=e.state,a=t.lat,n=t.lng,r=t.searchValue;t.requestName;return e.getData(a,n,r)},e.handleChange=function(t){var a=e.state,n=a.lat,r=a.lng,l=a.requestName,o=a.inFavorites;e.setState({searchValue:t.target.value}),n&&r&&e.setState({lat:null,lng:null}),o&&e.setState({inFavorites:!1}),l&&e.setState({requestName:""})},e.getData=function(t,a,n){return t||a||""!==n?(e.setState({searchValue:"",currentTemp:null,error:null,isLoading:!0,weekTemp:null}),t||a||""===n?void d("".concat(v,"/?lat=").concat(t,"&lon=").concat(a,"&key=").concat(p)).then(function(t){e.setState({currentTemp:t.data[0].temp,error:null,isLoading:!1,weekTemp:t.data,requestName:"".concat(n)})}).catch(function(t){e.setState({error:t.message,currentTemp:null,isLoading:!1,lng:null,lat:null})}):d("".concat(v,"/forecast/daily?city=").concat(n,"&key=").concat(p)).then(function(t){e.setState({requestName:t.city_name,currentTemp:t.data[0].temp,error:null,isLoading:!1,weekTemp:t.data})}).catch(function(t){e.setState({error:t.message,currentTemp:null,isLoading:!1})})):e.setState({searchValue:"",currentTemp:null,error:"\u041d\u0435 \u0432 \u044d\u0442\u043e\u0442 \u0440\u0430\u0437, \u043f\u0435\u0442\u0443\u0448\u043e\u043a)",isLoading:!1,weekTemp:null})},e.addToFavorites=function(){var t=e.state,a=t.lat,n=t.lng,r=t.requestName,l=t.favorites,o=t.inFavorites,c={id:Date.now(),lat:a,lng:n,requestName:r};console.log(r);var i=l;if(console.log(i),i.forEach(function(t){if(r===t.requestName)return e.setState({inFavorites:!0})}),!o){i.unshift(c);var s=JSON.stringify(i);return localStorage.setItem("localWeatherData",s),e.setState({favorites:i,inFavorites:!0})}},e.removeFromFavorites=function(t){var a=e.state.favorites.slice(),n=[];a.forEach(function(e){n.push(e.id)});var r=n.indexOf(t);a.splice(r,1),e.setState({favorites:a,inFavorites:!1})},e.checkRequest=function(t){var a=e.state,n=a.lat,r=a.lng;if(t.geometry){var l=t.geometry.viewport.l.j,o=t.geometry.viewport.l.l,c=t.formatted_address;return e.setState({searchValue:"",lat:l,lng:o}),e.getData(l,o,c)}var i=t.name;e.getData(n,r,i)},e.state={requestName:"",searchValue:"",currentTemp:null,error:null,isLoading:!1,weekTemp:null,lat:null,lng:null,favorites:[],inFavorites:!1},e}return Object(m.a)(t,e),Object(i.a)(t,[{key:"componentDidMount",value:function(){var e=JSON.parse(localStorage.getItem("localWeatherData"));e&&this.setState({favorites:e})}},{key:"componentDidUpdate",value:function(){var e=this.state.favorites,t=JSON.parse(localStorage.getItem("localWeatherData")),a=JSON.stringify(e);if(!t)return!1;e.length!==t.length&&localStorage.setItem("localWeatherData",a)}},{key:"render",value:function(){var e=this,t=this.state,a=t.requestName,n=t.searchValue,l=t.currentTemp,o=t.error,c=t.isLoading,i=t.weekTemp,s=t.favorites,u=t.lat,m=t.lng;return r.a.createElement("div",null,r.a.createElement("form",{onSubmit:this.handleSubmit},r.a.createElement(f.a,{value:n,onChange:this.handleChange,style:{width:"50%"},onPlaceSelected:function(t){e.checkRequest(t)},types:["(regions)"]}),r.a.createElement("button",{type:"button",onClick:this.handleClick,name:"send"},"search")),l?r.a.createElement("div",null,r.a.createElement("h1",null,a),r.a.createElement("button",{onClick:this.addToFavorites,type:"button"},"\u0414\u043e\u0431\u0430\u0432\u0438\u0442\u044c \u0432 \u0418\u0437\u0431\u0440\u0430\u043d\u043d\u043e\u0435"),r.a.createElement("p",{style:{fontSize:"".concat(36,"px")}},"Now ",l,"\xb0 \u0433\u0440\u0430\u0434\u0443\u0441\u0438\u043a\u043e\u0432")):null,o?r.a.createElement("p",{style:{fontSize:"".concat(36,"px"),color:"brown"}},o):null,c?r.a.createElement(w,null):null,i?r.a.createElement(b,{weekTemp:i}):null,s.length?r.a.createElement(E,{removeFromFavorites:this.removeFromFavorites,lat:u,lng:m,favorites:s,getData:this.getData}):null)}}]),t}(r.a.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));o.a.render(r.a.createElement(O,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})},9:function(e,t,a){e.exports=a.p+"static/media/loader.0315fe01.gif"}},[[10,2,1]]]);
//# sourceMappingURL=main.d1418c60.chunk.js.map