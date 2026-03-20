import "./p-BJoMtgfR-D9rUZpa5.js";
import { r as b } from "./p-DgbT0exM-DhwO7jTN.js";
import { n as s } from "./p-Cl0B-RWe-DyB7mqIA.js";
import { t as o } from "./p-C53feagD-CYW0A4Js.js";
//#region node_modules/@ionic/core/components/p-Cz5nLPGT.js
/*!
* (C) Ionic http://ionicframework.com - MIT License
*/
var e = (e, s$1, n, a, c) => {
	const i = e.ownerDocument.defaultView;
	let p = o(e);
	const m = (t) => p ? -t.deltaX : t.deltaX;
	return s({
		el: e,
		gestureName: "goback-swipe",
		gesturePriority: 101,
		threshold: 10,
		canStart: (t) => (p = o(e), ((t) => {
			const { startX: o } = t;
			return p ? o >= i.innerWidth - 50 : o <= 50;
		})(t) && s$1()),
		onStart: n,
		onMove: (t) => {
			a(m(t) / i.innerWidth);
		},
		onEnd: (o) => {
			const r = m(o), e = i.innerWidth, s = r / e, n = ((t) => p ? -t.velocityX : t.velocityX)(o), a = n >= 0 && (n > .2 || r > e / 2), f = (a ? 1 - s : s) * e;
			let g = 0;
			if (f > 5) {
				const t = f / Math.abs(n);
				g = Math.min(t, 540);
			}
			c(a, s <= 0 ? .01 : b(0, s, .9999), g);
		}
	});
};
//#endregion
export { e as createSwipeBackGesture };

//# sourceMappingURL=p-Cz5nLPGT-CkCsY7K3.js.map