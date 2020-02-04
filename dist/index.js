var e,t=require("react-router"),r=require("react-router-dom"),n=require("react"),u=(e=n)&&"object"==typeof e&&"default"in e?e.default:e,o=require("history"),a=require("react-tracked"),i=require("react-suspense-fetch");function c(){return(c=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var r=arguments[t];for(var n in r)Object.prototype.hasOwnProperty.call(r,n)&&(e[n]=r[n])}return e}).apply(this,arguments)}var s=n.createContext(null),f=function(e){return u.createElement(s.Provider,{value:e.history},e.children)},l=n.createContext(!1),p=function(e){return u.createElement(l.Provider,{value:e.suspensePending},e.children)},m=a.createContainer(function(e){return[e.data,null]}),d=m.useTrackedState,b=m.Provider,h=m.useSelector,v=Symbol("INITIALIZED_MAP"),P=function(e){var r=e.history,o=e.routePath,a=e.basename,i=e.caseSensitive,c=e.fetchData,s=e.match,f=e.children,l=n.useRef(),p=n.useRef(),m=n.useState(function(){var e=function(e,t,r,n,u,o){var a=function(e){var t=e,r=t[v];return r||(r=new Map,t[v]=r),r}(e),i=JSON.stringify({path:r,basename:n,caseSensitive:u,match:o});if(!a.has(i)){var c=t(o),s=setTimeout(function(){a.delete(i)},3e4);a.set(i,{data:c,commit:function(){clearTimeout(s)},cleanup:function(){a.delete(i),clearTimeout(s)}})}return a.get(i)}(r,c,o,a,i,s);return l.current=e.commit,p.current=e.cleanup,e.data}),d=m[0],h=m[1];return n.useEffect(function(){var e=r.listen(function(e){var r=e.location;l.current&&l.current();var n=t.matchRoutes([{path:o}],r,a,i);n&&n.length&&(h(c({params:n[0].params,pathname:n[0].pathname})),p.current&&p.current())});return function(){p.current&&p.current(),e()}},[r,o,a,i,c]),u.createElement(b,{data:d},f)},y={pathname:null},g=function(e,r,u){void 0===r&&(r=""),void 0===u&&(u=!1);var o=function(){var e=n.useContext(s);if(!e)throw new Error("missing <HistoryContext>");return e}(),a=t.useLocation(),i=t.useResolvedLocation(y).pathname,f=t.useParams(),l=r?(i+"/"+r).replace(/\/\/+/g,"/"):i,p=n.useMemo(function(){return t.matchRoutes(e,a,l,u)},[e,a,l,u]),m=[].concat(e);return(p||[]).forEach(function(e){if(e.route){var t=m.indexOf(e.route);if(-1!==t){var r=m[t];if(function(e){return!!e.element}(r)){var a=r.element.props.fetchData;if(a){var i=c({},f,{},e.params),s=n.createElement(P,{key:r.path,history:o,routePath:r.path,basename:l,caseSensitive:u,fetchData:a,match:{params:i,pathname:e.pathname}},r.element);m[t]=c({},r,{element:s})}}}}}),t.useRoutes(m,r,u)};Object.defineProperty(exports,"MemoryRouter",{enumerable:!0,get:function(){return t.MemoryRouter}}),Object.defineProperty(exports,"Navigate",{enumerable:!0,get:function(){return t.Navigate}}),Object.defineProperty(exports,"Outlet",{enumerable:!0,get:function(){return t.Outlet}}),Object.defineProperty(exports,"Redirect",{enumerable:!0,get:function(){return t.Redirect}}),Object.defineProperty(exports,"Route",{enumerable:!0,get:function(){return t.Route}}),Object.defineProperty(exports,"Router",{enumerable:!0,get:function(){return t.Router}}),Object.defineProperty(exports,"createRoutesFromChildren",{enumerable:!0,get:function(){return t.createRoutesFromChildren}}),Object.defineProperty(exports,"generatePath",{enumerable:!0,get:function(){return t.generatePath}}),Object.defineProperty(exports,"matchRoutes",{enumerable:!0,get:function(){return t.matchRoutes}}),Object.defineProperty(exports,"resolveLocation",{enumerable:!0,get:function(){return t.resolveLocation}}),Object.defineProperty(exports,"useBlocker",{enumerable:!0,get:function(){return t.useBlocker}}),Object.defineProperty(exports,"useHref",{enumerable:!0,get:function(){return t.useHref}}),Object.defineProperty(exports,"useLocation",{enumerable:!0,get:function(){return t.useLocation}}),Object.defineProperty(exports,"useMatch",{enumerable:!0,get:function(){return t.useMatch}}),Object.defineProperty(exports,"useNavigate",{enumerable:!0,get:function(){return t.useNavigate}}),Object.defineProperty(exports,"useOutlet",{enumerable:!0,get:function(){return t.useOutlet}}),Object.defineProperty(exports,"useParams",{enumerable:!0,get:function(){return t.useParams}}),Object.defineProperty(exports,"useResolvedLocation",{enumerable:!0,get:function(){return t.useResolvedLocation}}),Object.defineProperty(exports,"HashRouter",{enumerable:!0,get:function(){return r.HashRouter}}),Object.defineProperty(exports,"Link",{enumerable:!0,get:function(){return r.Link}}),Object.defineProperty(exports,"NavLink",{enumerable:!0,get:function(){return r.NavLink}}),Object.defineProperty(exports,"Prompt",{enumerable:!0,get:function(){return r.Prompt}}),Object.defineProperty(exports,"usePrompt",{enumerable:!0,get:function(){return r.usePrompt}}),exports.BrowserRouter=function(e){var r=e.timeout,a=e.window,i=e.children,s=n.useTransition(r?{timeoutMs:r}:null),l=s[0],m=s[1],d=n.useRef();return d.current||(d.current=function(e){return function(t){return c({},t,{listen:function(r){return t.listen(function(t){e(function(){r(t)})})}})}}(l)(o.createBrowserHistory({window:a}))),u.createElement(f,{history:d.current},u.createElement(p,{suspensePending:m},u.createElement(t.Router,{history:d.current,timeout:r},i)))},exports.LazyFetcher=function(e){var t=i.prepare(e),r=function(e){var t=e[0],r=e[1];try{return Promise.resolve(t(r))}catch(e){return Promise.reject(e)}};return function(e){return i.run(t,null),i.prefetch(r,[t,e],function(e){return[e[0].default,e[1]]})}},exports.Routes=function(e){var r=e.basename,n=void 0===r?"":r,u=e.caseSensitive,o=void 0!==u&&u,a=t.createRoutesFromChildren(e.children);return g(a,n,o)},exports.useRouteData=function(){return d({unstable_ignoreStateEquality:!0})},exports.useRouteDataSelector=h,exports.useRoutes=g,exports.useSuspensePending=function(){return n.useContext(l)};
//# sourceMappingURL=index.js.map
