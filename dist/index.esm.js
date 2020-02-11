import{Router as e,useListen as r,useParams as t,matchRoutes as n,useRoutes as a,createRoutesFromChildren as o,useResolvedLocation as i,useLocation as u}from"react-router";export{MemoryRouter,Navigate,Outlet,Redirect,Route,Router,createRoutesFromChildren,generatePath,matchRoutes,resolveLocation,useBlocker,useHref,useLocation,useMatch,useNavigate,useOutlet,useParams,usePending,useResolvedLocation}from"react-router";export{BrowserRouter,HashRouter,Link,NavLink,Prompt,usePrompt}from"react-router-dom";import s,{useState as c,useRef as v,useEffect as l}from"react";import{createContainer as d}from"react-tracked";import{prepare as f,run as h,prefetch as p}from"react-suspense-fetch";process;var m=function(e){var r=e.pathname,t=e.search;return(void 0===r?"/":r)+(void 0===t?"":t)+(void 0===(e=e.hash)?"":e)};function g(r){var t=r.children,n=r.context,a=void 0===n?{}:n,o=r.location,i=void 0===o?"/":o;"string"==typeof i&&(i=function(e){var r={};if(e){var t=e.indexOf("#");0<=t&&(r.hash=e.substr(t),e=e.substr(0,t)),0<=(t=e.indexOf("?"))&&(r.search=e.substr(t),e=e.substr(0,t)),e&&(r.pathname=e)}return r}(i));var u={pathname:i.pathname||"/",search:i.search||"",hash:i.hash||"",state:i.state||null,key:i.key||"default"};return s.createElement(e,{children:t,history:{get action(){return"POP"},get location(){return u},push:function(e,r){var t=m(e);console.warn('You cannot perform a PUSH with a static router. You probably want a REPLACE instead.\n\nTo avoid this warning, find the element that is calling `navigate("'+t+'")` and change it to `navigate("'+t+'", { replace: true })`. This could also be caused by rendering a `<Navigate to={"'+t+'"} />` on the server. In that case, just add a `replace: true` prop to do a redirect instead.'),a.url=t,a.state=r},replace:function(e,r){var t=m(e);a.url=t,a.state=r},go:function(e){throw new Error("You cannot perform "+(-1===e?"GO BACK":"GO("+e+")")+" on the server because it is a stateless environment. This error was probably triggered when you did a `navigate("+e+")` somewhere in your app.")},listen:function(){},block:function(){},createHref:function(e){return m(e)}}})}function w(){return(w=Object.assign||function(e){for(var r=1;r<arguments.length;r++){var t=arguments[r];for(var n in t)Object.prototype.hasOwnProperty.call(t,n)&&(e[n]=t[n])}return e}).apply(this,arguments)}var b=function(e){return!!e.element},y=d(function(e){return[e.data,null]}),P=y.useTrackedState,O=y.Provider,R=function(){return P({unstable_ignoreStateEquality:!0})},S=y.useSelector,k={pathname:null},E=function(e){var r=i(k).pathname;return e?(r+"/"+e).replace(/\/\/+/g,"/"):r},x=function(e,r){return e.map(function(e){if(!b(e))return e;if(!e.element.props.fetchData)return e;var t=r.get(e.path);return w({},e,{element:t&&s.createElement(O,{data:t,children:e.element})})})},L=function(e,r){var t=new Map;return(e||[]).forEach(function(e){var n=e.params,a=e.pathname,o=e.route;if(o&&b(o)){var i=o.element.props.fetchData;if(i){var u=i({params:w({},r,{},n),pathname:a});t.set(o.path,u)}}}),t},M="undefined"==typeof window||void 0===window.navigator||(""+window.navigator.userAgent).includes("ServerSideRendering"),j="undefined"!=typeof window&&window.cacheForSsr||{},H=M?function(e,r,o){void 0===r&&(r=""),void 0===o&&(o=!1);var i=E(r),s=t(),c=u(),v=n(e,c,i,o),l=j[i];l||(l=L(v,s),j[i]=l);var d=x(e,l);return a(d,r,o)}:function(e,o,i){void 0===o&&(o=""),void 0===i&&(i=!1);var u=r(),s=E(o),d=t(),f=c(new Map),h=f[0],p=f[1],m=v();l(function(){m.current={routesOrig:e,basename:s,caseSensitive:i,parentParams:d}}),l(function(){var e=new Map;return u(function(r){var t,a,o,i,u=n(null==(t=m.current)?void 0:t.routesOrig,r,null==(a=m.current)?void 0:a.basename,null==(o=m.current)?void 0:o.caseSensitive);e=L(u||[],(null==(i=m.current)?void 0:i.parentParams)||{}),p(function(r){return 0===r.size&&0===e.size?r:e})})},[u]);var g=x(e,h);return a(g,o,i)},N=function(e){var r=e.basename,t=void 0===r?"":r,n=e.caseSensitive,a=void 0!==n&&n,i=o(e.children);return H(i,t,a)},T=function(e){var r=f(e),t=function(e){var r=e[0],t=e[1];try{return Promise.resolve(r(t))}catch(e){return Promise.reject(e)}};return function(e){return h(r,null),p(t,[r,e],function(e){return[e[0].default,e[1]]})}};export{T as LazyFetcher,N as Routes,g as StaticRouter,R as useRouteData,S as useRouteDataSelector,H as useRoutes};
//# sourceMappingURL=index.esm.js.map
