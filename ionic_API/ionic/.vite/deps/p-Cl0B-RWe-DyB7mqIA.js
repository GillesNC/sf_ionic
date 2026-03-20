import { r as __exportAll } from "./react-BZ3rxvNc.js";
//#region node_modules/@ionic/core/components/p-BTEOs1at.js
/*!
* (C) Ionic http://ionicframework.com - MIT License
*/
var t = class {
	constructor(t, s, i, h, e) {
		this.id = s, this.name = i, this.disableScroll = e, this.priority = 1e6 * h + s, this.ctrl = t;
	}
	canStart() {
		return !!this.ctrl && this.ctrl.canStart(this.name);
	}
	start() {
		return !!this.ctrl && this.ctrl.start(this.name, this.id, this.priority);
	}
	capture() {
		if (!this.ctrl) return !1;
		const t = this.ctrl.capture(this.name, this.id, this.priority);
		return t && this.disableScroll && this.ctrl.disableScroll(this.id), t;
	}
	release() {
		this.ctrl && (this.ctrl.release(this.id), this.disableScroll && this.ctrl.enableScroll(this.id));
	}
	destroy() {
		this.release(), this.ctrl = void 0;
	}
};
var s$1 = class {
	constructor(t, s, i, h) {
		this.id = s, this.disable = i, this.disableScroll = h, this.ctrl = t;
	}
	block() {
		if (this.ctrl) {
			if (this.disable) for (const t of this.disable) this.ctrl.disableGesture(t, this.id);
			this.disableScroll && this.ctrl.disableScroll(this.id);
		}
	}
	unblock() {
		if (this.ctrl) {
			if (this.disable) for (const t of this.disable) this.ctrl.enableGesture(t, this.id);
			this.disableScroll && this.ctrl.enableScroll(this.id);
		}
	}
	destroy() {
		this.unblock(), this.ctrl = void 0;
	}
};
var i$1 = "backdrop-no-scroll", h = new class {
	constructor() {
		this.gestureId = 0, this.requestedStart = /* @__PURE__ */ new Map(), this.disabledGestures = /* @__PURE__ */ new Map(), this.disabledScroll = /* @__PURE__ */ new Set();
	}
	createGesture(s) {
		var i;
		return new t(this, this.newID(), s.name, null !== (i = s.priority) && void 0 !== i ? i : 0, !!s.disableScroll);
	}
	createBlocker(t = {}) {
		return new s$1(this, this.newID(), t.disable, !!t.disableScroll);
	}
	start(t, s, i) {
		return this.canStart(t) ? (this.requestedStart.set(s, i), !0) : (this.requestedStart.delete(s), !1);
	}
	capture(t, s, i) {
		if (!this.start(t, s, i)) return !1;
		const h = this.requestedStart;
		let e = -1e4;
		if (h.forEach(((t) => {
			e = Math.max(e, t);
		})), e === i) {
			this.capturedId = s, h.clear();
			const i = new CustomEvent("ionGestureCaptured", { detail: { gestureName: t } });
			return document.dispatchEvent(i), !0;
		}
		return h.delete(s), !1;
	}
	release(t) {
		this.requestedStart.delete(t), this.capturedId === t && (this.capturedId = void 0);
	}
	disableGesture(t, s) {
		let i = this.disabledGestures.get(t);
		void 0 === i && (i = /* @__PURE__ */ new Set(), this.disabledGestures.set(t, i)), i.add(s);
	}
	enableGesture(t, s) {
		const i = this.disabledGestures.get(t);
		void 0 !== i && i.delete(s);
	}
	disableScroll(t) {
		this.disabledScroll.add(t), 1 === this.disabledScroll.size && document.body.classList.add("backdrop-no-scroll");
	}
	enableScroll(t) {
		this.disabledScroll.delete(t), 0 === this.disabledScroll.size && document.body.classList.remove("backdrop-no-scroll");
	}
	canStart(t) {
		return void 0 === this.capturedId && !this.isDisabled(t);
	}
	isCaptured() {
		return void 0 !== this.capturedId;
	}
	isScrollDisabled() {
		return this.disabledScroll.size > 0;
	}
	isDisabled(t) {
		const s = this.disabledGestures.get(t);
		return !!(s && s.size > 0);
	}
	newID() {
		return this.gestureId++, this.gestureId;
	}
}();
//#endregion
//#region node_modules/@ionic/core/components/p-Cl0B-RWe.js
/*!
* (C) Ionic http://ionicframework.com - MIT License
*/
var p_Cl0B_RWe_exports = /* @__PURE__ */ __exportAll({
	GESTURE_CONTROLLER: () => h,
	createGesture: () => s
});
var e = (t, e, n, r) => {
	const s = !!o(t) && {
		capture: !1,
		passive: !!r.passive
	};
	let i, c;
	return t.__zone_symbol__addEventListener ? (i = "__zone_symbol__addEventListener", c = "__zone_symbol__removeEventListener") : (i = "addEventListener", c = "removeEventListener"), t[i](e, n, s), () => {
		t[c](e, n, s);
	};
}, o = (t) => {
	if (void 0 === n) try {
		const e = Object.defineProperty({}, "passive", { get: () => {
			n = !0;
		} });
		t.addEventListener("optsTest", (() => {}), e);
	} catch (t) {
		n = !1;
	}
	return !!n;
};
var n;
var r = (t) => t instanceof Document ? t : t.ownerDocument, s = (o) => {
	let n = !1, s = !1, d = !0, u = !1;
	const l = Object.assign({
		disableScroll: !1,
		direction: "x",
		gesturePriority: 0,
		passive: !0,
		maxAngle: 40,
		threshold: 10
	}, o), v = l.canStart, m = l.onWillStart, p = l.onStart, f = l.onEnd, y = l.notCaptured, h$1 = l.onMove, _ = l.threshold, b = l.passive, D = l.blurOnStart, E = {
		type: "pan",
		startX: 0,
		startY: 0,
		startTime: 0,
		currentX: 0,
		currentY: 0,
		velocityX: 0,
		velocityY: 0,
		deltaX: 0,
		deltaY: 0,
		currentTime: 0,
		event: void 0,
		data: void 0
	}, g = ((t, e, o) => {
		const n = o * (Math.PI / 180), r = "x" === t, s = Math.cos(n), i = e * e;
		let c = 0, a = 0, d = !1, u = 0;
		return {
			start(t, e) {
				c = t, a = e, u = 0, d = !0;
			},
			detect(t, e) {
				if (!d) return !1;
				const o = t - c, n = e - a, l = o * o + n * n;
				if (l < i) return !1;
				const m = (r ? o : n) / Math.sqrt(l);
				return u = m > s ? 1 : m < -s ? -1 : 0, d = !1, !0;
			},
			isGesture: () => 0 !== u,
			getDirection: () => u
		};
	})(l.direction, l.threshold, l.maxAngle), x = h.createGesture({
		name: o.gestureName,
		priority: o.gesturePriority,
		disableScroll: o.disableScroll
	}), L = () => {
		n && (u = !1, h$1 && h$1(E));
	}, T = () => !!x.capture() && (n = !0, d = !1, E.startX = E.currentX, E.startY = E.currentY, E.startTime = E.currentTime, m ? m(E).then(X) : X(), !0), X = () => {
		D && (() => {
			if ("undefined" != typeof document) {
				const t = document.activeElement;
				null != t && t.blur && t.blur();
			}
		})(), p && p(E), d = !0;
	}, Y = () => {
		n = !1, s = !1, u = !1, d = !0, x.release();
	}, j = (t) => {
		const e = n, o = d;
		Y(), o && (i(E, t), e ? f && f(E) : y && y(E));
	}, M = ((t, o, n, s, i) => {
		let c, a, d, u, l, v, m, p = 0;
		const f = (r) => {
			p = Date.now() + 2e3, o(r) && (!a && n && (a = e(t, "touchmove", n, i)), d || (d = e(r.target, "touchend", h, i)), u || (u = e(r.target, "touchcancel", h, i)));
		}, y = (s) => {
			p > Date.now() || o(s) && (!v && n && (v = e(r(t), "mousemove", n, i)), m || (m = e(r(t), "mouseup", _, i)));
		}, h = (t) => {
			b(), s && s(t);
		}, _ = (t) => {
			D(), s && s(t);
		}, b = () => {
			a && a(), d && d(), u && u(), a = d = u = void 0;
		}, D = () => {
			v && v(), m && m(), v = m = void 0;
		}, E = () => {
			b(), D();
		}, g = (o = !0) => {
			o ? (c || (c = e(t, "touchstart", f, i)), l || (l = e(t, "mousedown", y, i))) : (c && c(), l && l(), c = l = void 0, E());
		};
		return {
			enable: g,
			stop: E,
			destroy: () => {
				g(!1), s = n = o = void 0;
			}
		};
	})(l.el, ((t) => {
		const e = a(t);
		return !(s || !d) && (c(t, E), E.startX = E.currentX, E.startY = E.currentY, E.startTime = E.currentTime = e, E.velocityX = E.velocityY = E.deltaX = E.deltaY = 0, E.event = t, (!v || !1 !== v(E)) && (x.release(), !!x.start() && (s = !0, 0 === _ ? T() : (g.start(E.startX, E.startY), !0))));
	}), ((t) => {
		n ? !u && d && (u = !0, i(E, t), requestAnimationFrame(L)) : (i(E, t), g.detect(E.currentX, E.currentY) && (g.isGesture() && T() || O()));
	}), j, { passive: b }), O = () => {
		Y(), M.stop(), y && y(E);
	};
	return {
		enable(t = !0) {
			t || (n && j(void 0), Y()), M.enable(t);
		},
		destroy() {
			x.destroy(), M.destroy();
		}
	};
}, i = (t, e) => {
	if (!e) return;
	const o = t.currentX, n = t.currentY, r = t.currentTime;
	c(e, t);
	const s = t.currentX, i = t.currentY, d = (t.currentTime = a(e)) - r;
	if (d > 0 && d < 100) {
		const e = (i - n) / d;
		t.velocityX = (s - o) / d * .7 + .3 * t.velocityX, t.velocityY = .7 * e + .3 * t.velocityY;
	}
	t.deltaX = s - t.startX, t.deltaY = i - t.startY, t.event = e;
}, c = (t, e) => {
	let o = 0, n = 0;
	if (t) {
		const e = t.changedTouches;
		if (e && e.length > 0) {
			const t = e[0];
			o = t.clientX, n = t.clientY;
		} else void 0 !== t.pageX && (o = t.pageX, n = t.pageY);
	}
	e.currentX = o, e.currentY = n;
}, a = (t) => t.timeStamp || Date.now();
//#endregion
export { i$1 as i, s as n, h as r, p_Cl0B_RWe_exports as t };

//# sourceMappingURL=p-Cl0B-RWe-DyB7mqIA.js.map