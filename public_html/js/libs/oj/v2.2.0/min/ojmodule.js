/**
 * Copyright (c) 2014, 2016, Oracle and/or its affiliates.
 * The Universal Permissive License (UPL), Version 1.0
 */
"use strict";
define(["ojs/ojcore","knockout","promise"],function(a,g){a.Fx={};a.Fx.Zc={viewPath:"text!views/",viewSuffix:".html",modelPath:"viewModels/",initializeMethod:"initialize",disposeMethod:"dispose",activatedHandler:"handleActivated",attachedHandler:"handleAttached",detachedHandler:"handleDetached",bindingsAppliedHandler:"handleBindingsApplied",deactivatedHandler:"handleDeactivated",transitionCompletedHandler:"handleTransitionCompleted"};o_("ModuleBinding.defaults",a.Fx.Zc,a);(function(){function b(b,
c,e,f,h,k,l){var q=c.canAnimate;if(null==q||q.call(c,b)){var s,t;if(q=c.prepareAnimation.call(c,b))s=q.newViewParent,t=q.oldViewParent;var B=s||e;t&&t!==e?d(f,t):B===e&&k(null);B!==e&&g.virtualElements.setDomNodeChildren(B,[]);h(B);var J=Array.prototype.slice.call(B.childNodes),I=!1,Q=function(){I||(I=!0,e!==B&&(m(e,J),a.Components&&(r(J,a.Components.Eh),r(J,a.Components.tg))))},A=k.bind(null,t);b.newViewParent=s;b.oldViewParent=t;b.oldViewNodes=f;b.removeOldView=A;b.insertNewView=Q;var L=function(){A();
Q();l()};return c.animate.call(c,b).then(L,function(){L();a.t.error("ojModule animation promise was rejected")})}}function c(a,b,c){b=b||a;var d=[];c&&a===b&&(c.parentNode.removeChild(c),d.push(c));g.virtualElements.setDomNodeChildren(b,d)}function d(a,b){a.forEach(function(a){b.appendChild(a)})}function e(a,b,c){if(a&&a[b]){var d={element:c[0],valueAccessor:c[1]};2<c.length&&(d.viewModel=c[2],3<c.length&&(d["boolean"===typeof c[3]?"fromCache":"cachedNodes"]=c[3]));return g.ignoreDependencies(a[b],
a,[d])}}function f(b,c,d){if(null!=b&&(c=a.Fx.Zc[c],null!=c&&b&&(c=b[c],"function"===typeof c))){var e=void 0;d&&(e={element:d[0],valueAccessor:d[1]},2<d.length&&(e["boolean"===typeof d[2]?"fromCache":"cachedNodes"]=d[2]));return g.ignoreDependencies(c,b,[e])}}function h(a,b,c){var d=[];for(a=g.virtualElements.firstChild(a);null!=a&&a!=c;a=a.nextSibling)a!=b&&d.push(a);return d}function k(a,b){var c=[],d=g.virtualElements.firstChild(a);l(d,b,function(a){c.push(a)});return c}function l(a,b,c){for(;null!=
a;){var d=g.virtualElements.nextSibling(a),e=a.nodeType;a===b||1!==e&&8!==e||c(a);a=d}}function m(a,b){for(var c=b.length-1;0<=c;c--)g.virtualElements.prepend(a,b[c])}function r(a,b){if(b)for(var c=0;c<a.length;c++)b(a[c])}function t(a){if("string"===typeof a)a=g.utils.parseHtmlFragment(a);else if(window.DocumentFragment?a instanceof DocumentFragment:a&&11===a.nodeType)a=g.utils.arrayPushAll([],a.childNodes);else if(Array.isArray(a))a=g.utils.arrayPushAll([],a);else throw"The View ("+a+") has an unsupported type";
return a}function s(b){return new Promise(function(c,d){require([b],function(a){c(a)},function(c){a.t.error("ojModule failed to load "+b);d(c)})})}function q(a){return a?new Promise(function(b){a.then(b,b)}):a}g.bindingHandlers.ojModule={init:function(p,n,u,v,w){function y(a){if(a!=J)throw A;}function x(a){f(a,"disposeMethod",[p,n])}var z,C,E={},B,J=-1,I,Q;g.utils.domNodeDisposal.addDisposeCallback(p,function(){x(z);for(var a=Object.keys(E),b=0;b<a.length;b++)x(E[a[b]].au)});var A=Error("Promise cancelled because ojModule is fetching new View and ViewModel");
8===p.nodeType&&(g.virtualElements.setDomNodeChildren(p,[]),Q=p.nextSibling);g.computed(function(){J++;var u=0===J,v=g.utils.unwrapObservable,M=v(n()),H,N,Y,K,S,F,R,V;"string"===typeof M?H=M:(H=v(M.name),N=v(M.viewName),Y=v(M.params),K=v(M.viewModelFactory),S=v(M.createViewFunction),F=v(M.cacheKey),R=v(M.lifecycleListener),V=v(M.animation));var v=e(R,"activated",[p,n]),Z,O,G=null==F?null:E[F];if(null!=G)delete E[F],Z=Promise.resolve(G.view),O=Promise.resolve(G.au);else if(null!=K&&(O=g.ignoreDependencies(K.createViewModel,
K,[Y,n])),null==O&&null!=H&&(O=s(a.Fx.Zc.modelPath+H)),null!=O&&(O=O.then(function(a,b){y(a);return b="function"===typeof b?new b(Y):f(b,"initializeMethod",[p,n])||b}.bind(null,J)),null!=S&&(Z=O.then(function(a,b){y(a);if(null==b)throw"createViewFunction option cannot be used when the ViewModel is null";var c=b[S];if(null==c)throw"function specified by the createViewFunction option was not found on the ViewModel";return c.call(b)}.bind(null,J)))),null==Z)if(N=null==N?H:N,null!=N)Z=s(a.Fx.Zc.viewPath+
N+a.Fx.Zc.viewSuffix);else throw Error("View name must be specified");if(null==Z)throw Error("ojModule is missing a View");var U;null!=O&&(U=O.then(function(a,b){y(a);return f(b,"activatedHandler",[p,n])}.bind(null,J)));Promise.all([Z,O,v,U,C]).then(function(v,s){if(v==J){var y=s[0];if(null==y)throw"The module's View was resolved to null";var A=t(y),D=s[1],M=!1,H,K=h(p,I,Q),O=k(p,I);null!=B&&(M=!0,H=K,I||(I=document.createElement("div"),I.className="oj-helper-module-cache",g.virtualElements.prepend(p,
I)));var N=!1,y=function(b){N||(N=!0,M?d(K,I):O.forEach(function(a){g.cleanNode(a)}),c(p,b||p,I),u||(e(R,"detached",[p,n,z,H]),f(z,"detachedHandler",[p,n,H]),e(R,"deactivated",[p,n,z]),f(z,"deactivatedHandler",[p,n])),M?(r(H,a.Components?a.Components.lu:null),E[B]={au:z,view:H}):x(z),z=D,B=F)},fa=function(b){b=b||p;m(b,A);var c=null!=G;c&&r(A,a.Components?a.Components.Kr:null);e(R,"attached",[b,n,D,c]);f(D,"attachedHandler",[b,n,c]);if(!c){var d=w.createChildContext(D,void 0,function(a){a.$module=
D;a.$params=Y});l(A[0],I,function(a){g.applyBindings(d,a)});e(R,"bindingsApplied",[b,n,D]);f(D,"bindingsAppliedHandler",[b,n])}},ha=function(){e(R,"transitionCompleted",[p,n,D]);f(D,"transitionCompletedHandler",[p,n])};if(null!=V){var oa=b({node:p,valueAccessor:n,isInitial:u,oldViewModel:z,newViewModel:D},V,p,K,fa,y,ha);C=q(oa)}else C=void 0;C||(y(null),fa(null),ha())}}.bind(null,J),function(b,c){c!==A&&null!=c&&a.t.error(c)}.bind(null,J))},null,{disposeWhenNodeIsRemoved:p});return{controlsDescendantBindings:!0}}};
g.virtualElements.allowedBindings.ojModule=!0})()});