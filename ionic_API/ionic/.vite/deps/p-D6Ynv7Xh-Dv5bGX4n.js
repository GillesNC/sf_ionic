import { r as __exportAll } from "./react-BZ3rxvNc.js";
import { n as t$1 } from "./p-D13Eaw-8-CmPZk2Lo.js";
//#region node_modules/@ionic/core/components/p-D6Ynv7Xh.js
/*!
* (C) Ionic http://ionicframework.com - MIT License
*/
var p_D6Ynv7Xh_exports = /* @__PURE__ */ __exportAll({
	KEYBOARD_DID_CLOSE: () => o,
	KEYBOARD_DID_OPEN: () => t,
	copyVisualViewport: () => g,
	keyboardDidClose: () => c,
	keyboardDidOpen: () => p,
	keyboardDidResize: () => b,
	setKeyboardClose: () => h,
	setKeyboardOpen: () => f,
	startKeyboardAssist: () => n,
	trackViewportChanges: () => D
});
var t = "ionKeyboardDidShow", o = "ionKeyboardDidHide";
var i = {}, a = {}, d = !1, n = (t) => {
	if (t$1.getEngine()) r(t);
	else {
		if (!t.visualViewport) return;
		a = g(t.visualViewport), t.visualViewport.onresize = () => {
			D(t), p() || b(t) ? f(t) : c(t) && h(t);
		};
	}
}, r = (e) => {
	e.addEventListener("keyboardDidShow", ((t) => f(e, t))), e.addEventListener("keyboardDidHide", (() => h(e)));
}, f = (e, t) => {
	w(e, t), d = !0;
}, h = (e) => {
	y(e), d = !1;
}, p = () => !d && i.width === a.width && (i.height - a.height) * a.scale > 150, b = (e) => d && !c(e), c = (e) => d && a.height === e.innerHeight, w = (e, o) => {
	const i = new CustomEvent(t, { detail: { keyboardHeight: o ? o.keyboardHeight : e.innerHeight - a.height } });
	e.dispatchEvent(i);
}, y = (e) => {
	const t = new CustomEvent(o);
	e.dispatchEvent(t);
}, D = (e) => {
	i = Object.assign({}, a), a = g(e.visualViewport);
}, g = (e) => ({
	width: Math.round(e.width),
	height: Math.round(e.height),
	offsetTop: e.offsetTop,
	offsetLeft: e.offsetLeft,
	pageTop: e.pageTop,
	pageLeft: e.pageLeft,
	scale: e.scale
});
//#endregion
export { t as n, p_D6Ynv7Xh_exports as t };

//# sourceMappingURL=p-D6Ynv7Xh-Dv5bGX4n.js.map