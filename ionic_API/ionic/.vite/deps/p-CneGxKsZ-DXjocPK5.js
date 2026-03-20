import { o as P, u as W } from "./p-BJoMtgfR-D9rUZpa5.js";
import { o as e } from "./p-DgbT0exM-DhwO7jTN.js";
import { c as m, i as f } from "./p-C59ryAuS-DBRIFaDI.js";
//#region node_modules/@ionic/core/components/p-CneGxKsZ.js
/*!
* (C) Ionic http://ionicframework.com - MIT License
*/
var n = () => {
	const n = window;
	n.addEventListener("statusTap", (() => {
		W((() => {
			const o = document.elementFromPoint(n.innerWidth / 2, n.innerHeight / 2);
			if (!o) return;
			const e$1 = f(o);
			e$1 && new Promise(((o) => e(e$1, o))).then((() => {
				P((async () => {
					e$1.style.setProperty("--overflow", "hidden"), await m(e$1, 300), e$1.style.removeProperty("--overflow");
				}));
			}));
		}));
	}));
};
//#endregion
export { n as startStatusTap };

//# sourceMappingURL=p-CneGxKsZ-DXjocPK5.js.map