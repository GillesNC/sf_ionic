import { f as a$1 } from "./p-BJoMtgfR-D9rUZpa5.js";
import { o as e$1 } from "./p-DgbT0exM-DhwO7jTN.js";
//#region node_modules/@ionic/core/components/p-C59ryAuS.js
/*!
* (C) Ionic http://ionicframework.com - MIT License
*/
var t = "ion-content", a = ".ion-content-scroll-host", r = `${t}, ${a}`, e = (o) => "ION-CONTENT" === o.tagName, i = async (s) => e(s) ? (await new Promise(((t) => e$1(s, t))), s.getScrollElement()) : s, n = (o) => o.querySelector(".ion-content-scroll-host") || o.querySelector(r), f = (o) => o.closest(r), m = (o, s) => e(o) ? o.scrollToTop(s) : Promise.resolve(o.scrollTo({
	top: 0,
	left: 0,
	behavior: "smooth"
})), c = (o, s, t, a) => e(o) ? o.scrollByPoint(s, t, a) : Promise.resolve(o.scrollBy({
	top: t,
	left: s,
	behavior: a > 0 ? "smooth" : "auto"
})), p = (o) => a$1(o, t), h = (o) => {
	if (e(o)) {
		const s = o.scrollY;
		return o.scrollY = !1, s;
	}
	return o.style.setProperty("overflow", "hidden"), !0;
}, l = (o, s) => {
	e(o) ? o.scrollY = s : o.style.removeProperty("overflow");
};
//#endregion
export { h as a, m as c, t as d, f as i, n as l, c as n, i as o, e as r, l as s, a as t, p as u };

//# sourceMappingURL=p-C59ryAuS-DBRIFaDI.js.map