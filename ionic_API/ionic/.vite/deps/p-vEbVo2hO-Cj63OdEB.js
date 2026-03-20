import { r as __exportAll } from "./react-BZ3rxvNc.js";
import { g as n, m as f } from "./p-BJoMtgfR-D9rUZpa5.js";
import { t as d } from "./p-ZjP4CjeZ-B7Af306i.js";
//#region node_modules/@ionic/core/components/p-vEbVo2hO.js
/*!
* (C) Ionic http://ionicframework.com - MIT License
*/
var p_vEbVo2hO_exports = /* @__PURE__ */ __exportAll({
	MENU_BACK_BUTTON_PRIORITY: () => 99,
	OVERLAY_BACK_BUTTON_PRIORITY: () => 100,
	blockHardwareBackButton: () => i,
	shouldUseCloseWatcher: () => o,
	startHardwareBackButton: () => r
}), o = () => n.get("experimentalCloseWatcher", !1) && void 0 !== d && "CloseWatcher" in d, i = () => {
	document.addEventListener("backbutton", (() => {}));
}, r = () => {
	const e = document;
	let i = !1;
	const r = () => {
		if (i) return;
		let t = 0, o = [];
		const r = new CustomEvent("ionBackButton", {
			bubbles: !1,
			detail: { register(e, n) {
				o.push({
					priority: e,
					handler: n,
					id: t++
				});
			} }
		});
		e.dispatchEvent(r);
		const a = () => {
			if (o.length > 0) {
				let t = {
					priority: Number.MIN_SAFE_INTEGER,
					handler: () => {},
					id: -1
				};
				o.forEach(((e) => {
					e.priority >= t.priority && (t = e);
				})), i = !0, o = o.filter(((e) => e.id !== t.id)), (async (t) => {
					try {
						if (null == t ? void 0 : t.handler) {
							const e = t.handler(a);
							null != e && await e;
						}
					} catch (t) {
						f("[ion-app] - Exception in startHardwareBackButton:", t);
					}
				})(t).then((() => i = !1));
			}
		};
		a();
	};
	if (o()) {
		let e;
		const n = () => {
			e?.destroy(), e = new d.CloseWatcher(), e.onclose = () => {
				r(), n();
			};
		};
		n();
	} else e.addEventListener("backbutton", r);
};
//#endregion
export { p_vEbVo2hO_exports as n, o as t };

//# sourceMappingURL=p-vEbVo2hO-Cj63OdEB.js.map