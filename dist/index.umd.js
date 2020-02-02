!function(e,t){"object"==typeof exports&&"undefined"!=typeof module?t(exports,require("react-router"),require("react-router-dom"),require("react"),require("history"),require("react-tracked"),require("react-suspense-fetch")):"function"==typeof define&&define.amd?define(["exports","react-router","react-router-dom","react","history","react-tracked","react-suspense-fetch"],t):t((e=e||self).reactSuspenseRouter={},e.ReactRouter,e.ReactRouterDOM,e.react,e.history,e.reactTracked,e.reactSuspenseFetch)}(this,function(e,t,r,n,u,o,a){var i="default"in n?n.default:n;function c(){return(c=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var r=arguments[t];for(var n in r)Object.prototype.hasOwnProperty.call(r,n)&&(e[n]=r[n])}return e}).apply(this,arguments)}var s=n.createContext(null),f=function(e){return i.createElement(s.Provider,{value:e.history},e.children)},l=n.createContext(!1),m=function(e){return i.createElement(l.Provider,{value:e.suspensePending},e.children)},d=o.createContainer(function(e){return[e.data,null]}),p=d.useTrackedState,h=d.Provider,b=d.useSelector,y=Symbol("INITIALIZED_MAP"),v=function(e){var r=e.history,u=e.routePath,o=e.basename,a=e.caseSensitive,c=e.fetchData,s=e.match,f=e.children,l=n.useState(null),m=l[0],d=l[1],p=null===m?function(e,t,r,n,u,o){var a=function(e){var t=e,r=t[y];return r||(r=new Map,t[y]=r),r}(e),i=JSON.stringify({path:r,basename:n,caseSensitive:u,match:o});return a.has(i)||a.set(i,o?t(o):null),a.get(i)}(r,c,u,o,a,s):m;return n.useEffect(function(){return r.listen(function(e){var r=t.matchRoutes([{path:u}],e.location,o,a);r&&r.length&&d(c({params:r[0].params,pathname:r[0].pathname}))})},[r,u,o,a,c]),i.createElement(h,{data:p},f)},P={pathname:null},g=function(e,r,u){void 0===r&&(r=""),void 0===u&&(u=!1);var o=function(){var e=n.useContext(s);if(!e)throw new Error("missing <HistoryContext>");return e}(),a=t.useLocation(),i=t.useResolvedLocation(P).pathname,f=t.useParams(),l=r?(i+"/"+r).replace(/\/\/+/g,"/"):i,m=n.useMemo(function(){return t.matchRoutes(e,a,l,u)},[e,a,l,u]),d=[].concat(e);return(m||[]).forEach(function(e){if(e.route){var t=d.indexOf(e.route);if(-1!==t){var r=d[t];if(function(e){return!!e.element}(r)){var a=r.element.props.fetchData;if(a){var i=c({},f,{},e.params),s=n.createElement(v,{history:o,routePath:r.path,basename:l,caseSensitive:u,fetchData:a,match:{params:i,pathname:e.pathname}},r.element);d[t]=c({},r,{element:s})}}}}}),t.useRoutes(d,r,u)};Object.defineProperty(e,"MemoryRouter",{enumerable:!0,get:function(){return t.MemoryRouter}}),Object.defineProperty(e,"Navigate",{enumerable:!0,get:function(){return t.Navigate}}),Object.defineProperty(e,"Outlet",{enumerable:!0,get:function(){return t.Outlet}}),Object.defineProperty(e,"Redirect",{enumerable:!0,get:function(){return t.Redirect}}),Object.defineProperty(e,"Route",{enumerable:!0,get:function(){return t.Route}}),Object.defineProperty(e,"Router",{enumerable:!0,get:function(){return t.Router}}),Object.defineProperty(e,"createRoutesFromChildren",{enumerable:!0,get:function(){return t.createRoutesFromChildren}}),Object.defineProperty(e,"generatePath",{enumerable:!0,get:function(){return t.generatePath}}),Object.defineProperty(e,"matchRoutes",{enumerable:!0,get:function(){return t.matchRoutes}}),Object.defineProperty(e,"resolveLocation",{enumerable:!0,get:function(){return t.resolveLocation}}),Object.defineProperty(e,"useBlocker",{enumerable:!0,get:function(){return t.useBlocker}}),Object.defineProperty(e,"useHref",{enumerable:!0,get:function(){return t.useHref}}),Object.defineProperty(e,"useLocation",{enumerable:!0,get:function(){return t.useLocation}}),Object.defineProperty(e,"useMatch",{enumerable:!0,get:function(){return t.useMatch}}),Object.defineProperty(e,"useNavigate",{enumerable:!0,get:function(){return t.useNavigate}}),Object.defineProperty(e,"useOutlet",{enumerable:!0,get:function(){return t.useOutlet}}),Object.defineProperty(e,"useParams",{enumerable:!0,get:function(){return t.useParams}}),Object.defineProperty(e,"useResolvedLocation",{enumerable:!0,get:function(){return t.useResolvedLocation}}),Object.defineProperty(e,"HashRouter",{enumerable:!0,get:function(){return r.HashRouter}}),Object.defineProperty(e,"Link",{enumerable:!0,get:function(){return r.Link}}),Object.defineProperty(e,"NavLink",{enumerable:!0,get:function(){return r.NavLink}}),Object.defineProperty(e,"Prompt",{enumerable:!0,get:function(){return r.Prompt}}),Object.defineProperty(e,"usePrompt",{enumerable:!0,get:function(){return r.usePrompt}}),e.BrowserRouter=function(e){var r=e.timeout,o=e.window,a=e.children,s=n.useTransition(r?{timeoutMs:r}:null),l=s[0],d=s[1],p=n.useRef();return p.current||(p.current=function(e){return function(t){return c({},t,{listen:function(r){return t.listen(function(t){e(function(){r(t)})})}})}}(l)(u.createBrowserHistory({window:o}))),i.createElement(f,{history:p.current},i.createElement(m,{suspensePending:d},i.createElement(t.Router,{history:p.current,timeout:r},a)))},e.LazyFetcher=function(e){var t=a.prepare(e),r=function(e){var t=e[0],r=e[1];try{return Promise.resolve(t(r))}catch(e){return Promise.reject(e)}};return function(e){return a.run(t,null),a.prefetch(r,[t,e],function(e){return[e[0].default,e[1]]})}},e.Routes=function(e){var r=e.basename,n=void 0===r?"":r,u=e.caseSensitive,o=void 0!==u&&u,a=t.createRoutesFromChildren(e.children);return g(a,n,o)},e.useRouteData=function(){return p({unstable_ignoreStateEquality:!0})},e.useRouteDataSelector=b,e.useRoutes=g,e.useSuspensePending=function(){return n.useContext(l)}});
//# sourceMappingURL=index.umd.js.map
