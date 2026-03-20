import { r as __exportAll } from "./react-BZ3rxvNc.js";
//#region node_modules/@ionic/core/components/p-BmVRXR1y.js
var p_BmVRXR1y_exports = /* @__PURE__ */ __exportAll({ startFocusVisible: () => e });
/*!
* (C) Ionic http://ionicframework.com - MIT License
*/
var o = "ion-focused", t = [
	"Tab",
	"ArrowDown",
	"Space",
	"Escape",
	" ",
	"Shift",
	"Enter",
	"ArrowLeft",
	"ArrowRight",
	"ArrowUp",
	"Home",
	"End"
], e = (e) => {
	let s = [], n = !0;
	const c = e ? e.shadowRoot : document, u = e || document.body, r = (t) => {
		s.forEach(((t) => t.classList.remove(o))), t.forEach(((t) => t.classList.add(o))), s = t;
	}, d = () => {
		n = !1, r([]);
	}, f = (o) => {
		n = t.includes(o.key), n || r([]);
	}, i = (o) => {
		if (n && void 0 !== o.composedPath) r(o.composedPath().filter(((o) => !!o.classList && o.classList.contains("ion-focusable"))));
	}, w = () => {
		c.activeElement === u && r([]);
	};
	return c.addEventListener("keydown", f), c.addEventListener("focusin", i), c.addEventListener("focusout", w), c.addEventListener("touchstart", d, { passive: !0 }), c.addEventListener("mousedown", d), {
		destroy: () => {
			c.removeEventListener("keydown", f), c.removeEventListener("focusin", i), c.removeEventListener("focusout", w), c.removeEventListener("touchstart", d), c.removeEventListener("mousedown", d);
		},
		setFocus: r
	};
};
//#endregion
export { p_BmVRXR1y_exports as n, e as t };

//# sourceMappingURL=p-BmVRXR1y-Cdf61RUs.js.map