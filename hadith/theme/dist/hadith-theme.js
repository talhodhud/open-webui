var fu = Object.defineProperty;
var rc = (r) => {
  throw TypeError(r);
};
var hu = (r, e, t) => e in r ? fu(r, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : r[e] = t;
var Mr = (r, e, t) => hu(r, typeof e != "symbol" ? e + "" : e, t), xs = (r, e, t) => e.has(r) || rc("Cannot " + t);
var I = (r, e, t) => (xs(r, e, "read from private field"), t ? t.call(r) : e.get(r)), le = (r, e, t) => e.has(r) ? rc("Cannot add the same private member more than once") : e instanceof WeakSet ? e.add(r) : e.set(r, t), re = (r, e, t, n) => (xs(r, e, "write to private field"), n ? n.call(r, t) : e.set(r, t), t), He = (r, e, t) => (xs(r, e, "access private method"), t);
var vl = Array.isArray, gu = Array.prototype.indexOf, ni = Array.prototype.includes, Xo = Array.from, mu = Object.defineProperty, Yn = Object.getOwnPropertyDescriptor, $c = Object.getOwnPropertyDescriptors, bu = Object.prototype, vu = Array.prototype, xl = Object.getPrototypeOf, nc = Object.isExtensible;
function _i(r) {
  return typeof r == "function";
}
const xu = () => {
};
function yu(r) {
  return r();
}
function Ls(r) {
  for (var e = 0; e < r.length; e++)
    r[e]();
}
function ed() {
  var r, e, t = new Promise((n, a) => {
    r = n, e = a;
  });
  return { promise: t, resolve: r, reject: e };
}
function wu(r, e) {
  if (Array.isArray(r))
    return r;
  if (!(Symbol.iterator in r))
    return Array.from(r);
  const t = [];
  for (const n of r)
    if (t.push(n), t.length === e) break;
  return t;
}
const nt = 2, ai = 4, ao = 8, yl = 1 << 24, Zn = 16, Vr = 32, ya = 64, Ys = 128, xr = 512, Qe = 1024, kt = 2048, kr = 4096, or = 8192, yr = 16384, za = 32768, js = 1 << 25, wa = 65536, ac = 1 << 17, ku = 1 << 18, gi = 1 << 19, td = 1 << 20, Wr = 1 << 25, ka = 65536, Fs = 1 << 21, wl = 1 << 22, jn = 1 << 23, $r = Symbol("$state"), rd = Symbol("legacy props"), Au = Symbol(""), fn = new class extends Error {
  constructor() {
    super(...arguments);
    Mr(this, "name", "StaleReactionError");
    Mr(this, "message", "The reaction that called `getAbortSignal()` was re-run or destroyed");
  }
}();
var Qc;
const nd = (
  // We gotta write it like this because after downleveling the pure comment may end up in the wrong location
  !!((Qc = globalThis.document) != null && Qc.contentType) && /* @__PURE__ */ globalThis.document.contentType.includes("xml")
);
function Su(r) {
  throw new Error("https://svelte.dev/e/lifecycle_outside_component");
}
function zu() {
  throw new Error("https://svelte.dev/e/async_derived_orphan");
}
function Eu(r, e, t) {
  throw new Error("https://svelte.dev/e/each_key_duplicate");
}
function _u(r) {
  throw new Error("https://svelte.dev/e/effect_in_teardown");
}
function Iu() {
  throw new Error("https://svelte.dev/e/effect_in_unowned_derived");
}
function Tu(r) {
  throw new Error("https://svelte.dev/e/effect_orphan");
}
function Mu() {
  throw new Error("https://svelte.dev/e/effect_update_depth_exceeded");
}
function Cu(r) {
  throw new Error("https://svelte.dev/e/props_invalid_value");
}
function Ou() {
  throw new Error("https://svelte.dev/e/state_descriptors_fixed");
}
function Pu() {
  throw new Error("https://svelte.dev/e/state_prototype_fixed");
}
function qu() {
  throw new Error("https://svelte.dev/e/state_unsafe_mutation");
}
function Nu() {
  throw new Error("https://svelte.dev/e/svelte_boundary_reset_onerror");
}
const Ru = 1, Vu = 2, ad = 4, Lu = 8, Yu = 16, ju = 1, Fu = 2, id = 4, Bu = 8, Du = 16, Uu = 1, Gu = 2, rt = Symbol(), od = "http://www.w3.org/1999/xhtml", Xu = "http://www.w3.org/2000/svg", Hu = "@attach";
function Ku() {
  console.warn("https://svelte.dev/e/select_multiple_invalid_value");
}
function Zu() {
  console.warn("https://svelte.dev/e/svelte_boundary_reset_noop");
}
function sd(r) {
  return r === this.v;
}
function Qu(r, e) {
  return r != r ? e == e : r !== e || r !== null && typeof r == "object" || typeof r == "function";
}
function ld(r) {
  return !Qu(r, this.v);
}
let mi = !1;
function Wu() {
  mi = !0;
}
let Pe = null;
function ii(r) {
  Pe = r;
}
function kl(r, e = !1, t) {
  Pe = {
    p: Pe,
    i: !1,
    c: null,
    e: null,
    s: r,
    x: null,
    r: (
      /** @type {Effect} */
      ne
    ),
    l: mi && !e ? { s: null, u: null, $: [] } : null
  };
}
function Al(r) {
  var e = (
    /** @type {ComponentContext} */
    Pe
  ), t = e.e;
  if (t !== null) {
    e.e = null;
    for (var n of t)
      Md(n);
  }
  return e.i = !0, Pe = e.p, /** @type {T} */
  {};
}
function io() {
  return !mi || Pe !== null && Pe.l === null;
}
let sa = [];
function cd() {
  var r = sa;
  sa = [], Ls(r);
}
function bn(r) {
  if (sa.length === 0 && !ji) {
    var e = sa;
    queueMicrotask(() => {
      e === sa && cd();
    });
  }
  sa.push(r);
}
function Ju() {
  for (; sa.length > 0; )
    cd();
}
function dd(r) {
  var e = ne;
  if (e === null)
    return ae.f |= jn, r;
  if (!(e.f & za) && !(e.f & ai))
    throw r;
  Nn(r, e);
}
function Nn(r, e) {
  for (; e !== null; ) {
    if (e.f & Ys) {
      if (!(e.f & za))
        throw r;
      try {
        e.b.error(r);
        return;
      } catch (t) {
        r = t;
      }
    }
    e = e.parent;
  }
  throw r;
}
const $u = -7169;
function je(r, e) {
  r.f = r.f & $u | e;
}
function Sl(r) {
  r.f & xr || r.deps === null ? je(r, Qe) : je(r, kr);
}
function pd(r) {
  if (r !== null)
    for (const e of r)
      !(e.f & nt) || !(e.f & ka) || (e.f ^= ka, pd(
        /** @type {Derived} */
        e.deps
      ));
}
function ud(r, e, t) {
  r.f & kt ? e.add(r) : r.f & kr && t.add(r), pd(r.deps), je(r, Qe);
}
let wo = !1;
function ef(r) {
  var e = wo;
  try {
    return wo = !1, [r(), wo];
  } finally {
    wo = e;
  }
}
const Ii = /* @__PURE__ */ new Set();
let J = null, pt = null, Bs = null, ji = !1, ys = !1, ja = null, Eo = null;
var ic = 0;
let tf = 1;
var Ka, Za, Qa, Wa, to, hr, Ja, Pn, Xr, $a, At, Ds, Us, Gs, Xs, fd;
const Do = class Do {
  constructor() {
    le(this, At);
    // for debugging. TODO remove once async is stable
    Mr(this, "id", tf++);
    /**
     * The current values of any sources that are updated in this batch
     * They keys of this map are identical to `this.#previous`
     * @type {Map<Source, any>}
     */
    Mr(this, "current", /* @__PURE__ */ new Map());
    /**
     * The values of any sources that are updated in this batch _before_ those updates took place.
     * They keys of this map are identical to `this.#current`
     * @type {Map<Source, any>}
     */
    Mr(this, "previous", /* @__PURE__ */ new Map());
    /**
     * When the batch is committed (and the DOM is updated), we need to remove old branches
     * and append new ones by calling the functions added inside (if/each/key/etc) blocks
     * @type {Set<(batch: Batch) => void>}
     */
    le(this, Ka, /* @__PURE__ */ new Set());
    /**
     * If a fork is discarded, we need to destroy any effects that are no longer needed
     * @type {Set<(batch: Batch) => void>}
     */
    le(this, Za, /* @__PURE__ */ new Set());
    /**
     * The number of async effects that are currently in flight
     */
    le(this, Qa, 0);
    /**
     * The number of async effects that are currently in flight, _not_ inside a pending boundary
     */
    le(this, Wa, 0);
    /**
     * A deferred that resolves when the batch is committed, used with `settled()`
     * TODO replace with Promise.withResolvers once supported widely enough
     * @type {{ promise: Promise<void>, resolve: (value?: any) => void, reject: (reason: unknown) => void } | null}
     */
    le(this, to, null);
    /**
     * The root effects that need to be flushed
     * @type {Effect[]}
     */
    le(this, hr, []);
    /**
     * Deferred effects (which run after async work has completed) that are DIRTY
     * @type {Set<Effect>}
     */
    le(this, Ja, /* @__PURE__ */ new Set());
    /**
     * Deferred effects that are MAYBE_DIRTY
     * @type {Set<Effect>}
     */
    le(this, Pn, /* @__PURE__ */ new Set());
    /**
     * A map of branches that still exist, but will be destroyed when this batch
     * is committed — we skip over these during `process`.
     * The value contains child effects that were dirty/maybe_dirty before being reset,
     * so they can be rescheduled if the branch survives.
     * @type {Map<Effect, { d: Effect[], m: Effect[] }>}
     */
    le(this, Xr, /* @__PURE__ */ new Map());
    Mr(this, "is_fork", !1);
    le(this, $a, !1);
  }
  /**
   * Add an effect to the #skipped_branches map and reset its children
   * @param {Effect} effect
   */
  skip_effect(e) {
    I(this, Xr).has(e) || I(this, Xr).set(e, { d: [], m: [] });
  }
  /**
   * Remove an effect from the #skipped_branches map and reschedule
   * any tracked dirty/maybe_dirty child effects
   * @param {Effect} effect
   */
  unskip_effect(e) {
    var t = I(this, Xr).get(e);
    if (t) {
      I(this, Xr).delete(e);
      for (var n of t.d)
        je(n, kt), this.schedule(n);
      for (n of t.m)
        je(n, kr), this.schedule(n);
    }
  }
  /**
   * Associate a change to a given source with the current
   * batch, noting its previous and current values
   * @param {Source} source
   * @param {any} value
   */
  capture(e, t) {
    t !== rt && !this.previous.has(e) && this.previous.set(e, t), e.f & jn || (this.current.set(e, e.v), pt == null || pt.set(e, e.v));
  }
  activate() {
    J = this;
  }
  deactivate() {
    J = null, pt = null;
  }
  flush() {
    try {
      if (ys = !0, J = this, !He(this, At, Ds).call(this)) {
        for (const e of I(this, Ja))
          I(this, Pn).delete(e), je(e, kt), this.schedule(e);
        for (const e of I(this, Pn))
          je(e, kr), this.schedule(e);
      }
      He(this, At, Us).call(this);
    } finally {
      ic = 0, Bs = null, ja = null, Eo = null, ys = !1, J = null, pt = null, Fn.clear();
    }
  }
  discard() {
    for (const e of I(this, Za)) e(this);
    I(this, Za).clear();
  }
  /**
   *
   * @param {boolean} blocking
   */
  increment(e) {
    re(this, Qa, I(this, Qa) + 1), e && re(this, Wa, I(this, Wa) + 1);
  }
  /**
   * @param {boolean} blocking
   * @param {boolean} skip - whether to skip updates (because this is triggered by a stale reaction)
   */
  decrement(e, t) {
    re(this, Qa, I(this, Qa) - 1), e && re(this, Wa, I(this, Wa) - 1), !(I(this, $a) || t) && (re(this, $a, !0), bn(() => {
      re(this, $a, !1), this.flush();
    }));
  }
  /** @param {(batch: Batch) => void} fn */
  oncommit(e) {
    I(this, Ka).add(e);
  }
  /** @param {(batch: Batch) => void} fn */
  ondiscard(e) {
    I(this, Za).add(e);
  }
  settled() {
    return (I(this, to) ?? re(this, to, ed())).promise;
  }
  static ensure() {
    if (J === null) {
      const e = J = new Do();
      ys || (Ii.add(J), ji || bn(() => {
        J === e && e.flush();
      }));
    }
    return J;
  }
  apply() {
  }
  /**
   *
   * @param {Effect} effect
   */
  schedule(e) {
    var a;
    if (Bs = e, (a = e.b) != null && a.is_pending && e.f & (ai | ao | yl) && !(e.f & za)) {
      e.b.defer_effect(e);
      return;
    }
    for (var t = e; t.parent !== null; ) {
      t = t.parent;
      var n = t.f;
      if (ja !== null && t === ne && (ae === null || !(ae.f & nt)))
        return;
      if (n & (ya | Vr)) {
        if (!(n & Qe))
          return;
        t.f ^= Qe;
      }
    }
    I(this, hr).push(t);
  }
};
Ka = new WeakMap(), Za = new WeakMap(), Qa = new WeakMap(), Wa = new WeakMap(), to = new WeakMap(), hr = new WeakMap(), Ja = new WeakMap(), Pn = new WeakMap(), Xr = new WeakMap(), $a = new WeakMap(), At = new WeakSet(), Ds = function() {
  return this.is_fork || I(this, Wa) > 0;
}, Us = function() {
  var s, l;
  ic++ > 1e3 && nf();
  const e = I(this, hr);
  re(this, hr, []), this.apply();
  var t = ja = [], n = [], a = Eo = [];
  for (const c of e)
    He(this, At, Gs).call(this, c, t, n);
  if (J = null, a.length > 0) {
    var i = Do.ensure();
    for (const c of a)
      i.schedule(c);
  }
  if (ja = null, Eo = null, He(this, At, Ds).call(this)) {
    He(this, At, Xs).call(this, n), He(this, At, Xs).call(this, t);
    for (const [c, d] of I(this, Xr))
      md(c, d);
  } else {
    I(this, Ja).clear(), I(this, Pn).clear();
    for (const c of I(this, Ka)) c(this);
    I(this, Ka).clear(), oc(n), oc(t), I(this, Qa) === 0 && He(this, At, fd).call(this), (s = I(this, to)) == null || s.resolve();
  }
  var o = (
    /** @type {Batch | null} */
    /** @type {unknown} */
    J
  );
  if (I(this, hr).length > 0) {
    const c = o ?? (o = this);
    I(c, hr).push(...I(this, hr).filter((d) => !I(c, hr).includes(d)));
  }
  o !== null && (Ii.add(o), He(l = o, At, Us).call(l));
}, /**
 * Traverse the effect tree, executing effects or stashing
 * them for later execution as appropriate
 * @param {Effect} root
 * @param {Effect[]} effects
 * @param {Effect[]} render_effects
 */
Gs = function(e, t, n) {
  e.f ^= Qe;
  for (var a = e.first; a !== null; ) {
    var i = a.f, o = (i & (Vr | ya)) !== 0, s = o && (i & Qe) !== 0, l = s || (i & or) !== 0 || I(this, Xr).has(a);
    if (!l && a.fn !== null) {
      o ? a.f ^= Qe : i & ai ? t.push(a) : bi(a) && (i & Zn && I(this, Pn).add(a), Sa(a));
      var c = a.first;
      if (c !== null) {
        a = c;
        continue;
      }
    }
    for (; a !== null; ) {
      var d = a.next;
      if (d !== null) {
        a = d;
        break;
      }
      a = a.parent;
    }
  }
}, /**
 * @param {Effect[]} effects
 */
Xs = function(e) {
  for (var t = 0; t < e.length; t += 1)
    ud(e[t], I(this, Ja), I(this, Pn));
}, fd = function() {
  var a;
  if (Ii.size > 1) {
    this.previous.clear();
    var e = J, t = pt, n = !0;
    for (const i of Ii) {
      if (i === this) {
        n = !1;
        continue;
      }
      const o = [];
      for (const [l, c] of this.current) {
        if (i.current.has(l))
          if (n && c !== i.current.get(l))
            i.current.set(l, c);
          else
            continue;
        o.push(l);
      }
      if (o.length === 0)
        continue;
      const s = [...i.current.keys()].filter((l) => !this.current.has(l));
      if (s.length > 0) {
        i.activate();
        const l = /* @__PURE__ */ new Set(), c = /* @__PURE__ */ new Map();
        for (const d of o)
          hd(d, s, l, c);
        if (I(i, hr).length > 0) {
          i.apply();
          for (const d of I(i, hr))
            He(a = i, At, Gs).call(a, d, [], []);
        }
        i.deactivate();
      }
    }
    J = e, pt = t;
  }
  I(this, Xr).clear(), Ii.delete(this);
};
let Aa = Do;
function rf(r) {
  var e = ji;
  ji = !0;
  try {
    for (var t; ; ) {
      if (Ju(), J === null)
        return (
          /** @type {T} */
          t
        );
      J.flush();
    }
  } finally {
    ji = e;
  }
}
function nf() {
  try {
    Mu();
  } catch (r) {
    Nn(r, Bs);
  }
}
let Or = null;
function oc(r) {
  var e = r.length;
  if (e !== 0) {
    for (var t = 0; t < e; ) {
      var n = r[t++];
      if (!(n.f & (yr | or)) && bi(n) && (Or = /* @__PURE__ */ new Set(), Sa(n), n.deps === null && n.first === null && n.nodes === null && n.teardown === null && n.ac === null && Pd(n), (Or == null ? void 0 : Or.size) > 0)) {
        Fn.clear();
        for (const a of Or) {
          if (a.f & (yr | or)) continue;
          const i = [a];
          let o = a.parent;
          for (; o !== null; )
            Or.has(o) && (Or.delete(o), i.push(o)), o = o.parent;
          for (let s = i.length - 1; s >= 0; s--) {
            const l = i[s];
            l.f & (yr | or) || Sa(l);
          }
        }
        Or.clear();
      }
    }
    Or = null;
  }
}
function hd(r, e, t, n) {
  if (!t.has(r) && (t.add(r), r.reactions !== null))
    for (const a of r.reactions) {
      const i = a.f;
      i & nt ? hd(
        /** @type {Derived} */
        a,
        e,
        t,
        n
      ) : i & (wl | Zn) && !(i & kt) && gd(a, e, n) && (je(a, kt), zl(
        /** @type {Effect} */
        a
      ));
    }
}
function gd(r, e, t) {
  const n = t.get(r);
  if (n !== void 0) return n;
  if (r.deps !== null)
    for (const a of r.deps) {
      if (ni.call(e, a))
        return !0;
      if (a.f & nt && gd(
        /** @type {Derived} */
        a,
        e,
        t
      ))
        return t.set(
          /** @type {Derived} */
          a,
          !0
        ), !0;
    }
  return t.set(r, !1), !1;
}
function zl(r) {
  J.schedule(r);
}
function md(r, e) {
  if (!(r.f & Vr && r.f & Qe)) {
    r.f & kt ? e.d.push(r) : r.f & kr && e.m.push(r), je(r, Qe);
    for (var t = r.first; t !== null; )
      md(t, e), t = t.next;
  }
}
function af(r) {
  let e = 0, t = Un(0), n;
  return () => {
    Il() && (g(t), lo(() => (e === 0 && (n = V(() => r(() => Fi(t)))), e += 1, () => {
      bn(() => {
        e -= 1, e === 0 && (n == null || n(), n = void 0, Fi(t));
      });
    })));
  };
}
var of = wa | gi;
function sf(r, e, t, n) {
  new lf(r, e, t, n);
}
var gr, bl, Hr, pa, Yt, Kr, er, Pr, gn, ua, qn, ei, ti, ri, mn, Uo, We, cf, df, pf, Hs, _o, Io, Ks;
class lf {
  /**
   * @param {TemplateNode} node
   * @param {BoundaryProps} props
   * @param {((anchor: Node) => void)} children
   * @param {((error: unknown) => unknown) | undefined} [transform_error]
   */
  constructor(e, t, n, a) {
    le(this, We);
    /** @type {Boundary | null} */
    Mr(this, "parent");
    Mr(this, "is_pending", !1);
    /**
     * API-level transformError transform function. Transforms errors before they reach the `failed` snippet.
     * Inherited from parent boundary, or defaults to identity.
     * @type {(error: unknown) => unknown}
     */
    Mr(this, "transform_error");
    /** @type {TemplateNode} */
    le(this, gr);
    /** @type {TemplateNode | null} */
    le(this, bl, null);
    /** @type {BoundaryProps} */
    le(this, Hr);
    /** @type {((anchor: Node) => void)} */
    le(this, pa);
    /** @type {Effect} */
    le(this, Yt);
    /** @type {Effect | null} */
    le(this, Kr, null);
    /** @type {Effect | null} */
    le(this, er, null);
    /** @type {Effect | null} */
    le(this, Pr, null);
    /** @type {DocumentFragment | null} */
    le(this, gn, null);
    le(this, ua, 0);
    le(this, qn, 0);
    le(this, ei, !1);
    /** @type {Set<Effect>} */
    le(this, ti, /* @__PURE__ */ new Set());
    /** @type {Set<Effect>} */
    le(this, ri, /* @__PURE__ */ new Set());
    /**
     * A source containing the number of pending async deriveds/expressions.
     * Only created if `$effect.pending()` is used inside the boundary,
     * otherwise updating the source results in needless `Batch.ensure()`
     * calls followed by no-op flushes
     * @type {Source<number> | null}
     */
    le(this, mn, null);
    le(this, Uo, af(() => (re(this, mn, Un(I(this, ua))), () => {
      re(this, mn, null);
    })));
    var i;
    re(this, gr, e), re(this, Hr, t), re(this, pa, (o) => {
      var s = (
        /** @type {Effect} */
        ne
      );
      s.b = this, s.f |= Ys, n(o);
    }), this.parent = /** @type {Effect} */
    ne.b, this.transform_error = a ?? ((i = this.parent) == null ? void 0 : i.transform_error) ?? ((o) => o), re(this, Yt, Qo(() => {
      He(this, We, Hs).call(this);
    }, of));
  }
  /**
   * Defer an effect inside a pending boundary until the boundary resolves
   * @param {Effect} effect
   */
  defer_effect(e) {
    ud(e, I(this, ti), I(this, ri));
  }
  /**
   * Returns `false` if the effect exists inside a boundary whose pending snippet is shown
   * @returns {boolean}
   */
  is_rendered() {
    return !this.is_pending && (!this.parent || this.parent.is_rendered());
  }
  has_pending_snippet() {
    return !!I(this, Hr).pending;
  }
  /**
   * Update the source that powers `$effect.pending()` inside this boundary,
   * and controls when the current `pending` snippet (if any) is removed.
   * Do not call from inside the class
   * @param {1 | -1} d
   * @param {Batch} batch
   */
  update_pending_count(e, t) {
    He(this, We, Ks).call(this, e, t), re(this, ua, I(this, ua) + e), !(!I(this, mn) || I(this, ei)) && (re(this, ei, !0), bn(() => {
      re(this, ei, !1), I(this, mn) && oi(I(this, mn), I(this, ua));
    }));
  }
  get_effect_pending() {
    return I(this, Uo).call(this), g(
      /** @type {Source<number>} */
      I(this, mn)
    );
  }
  /** @param {unknown} error */
  error(e) {
    var t = I(this, Hr).onerror;
    let n = I(this, Hr).failed;
    if (!t && !n)
      throw e;
    I(this, Kr) && (ut(I(this, Kr)), re(this, Kr, null)), I(this, er) && (ut(I(this, er)), re(this, er, null)), I(this, Pr) && (ut(I(this, Pr)), re(this, Pr, null));
    var a = !1, i = !1;
    const o = () => {
      if (a) {
        Zu();
        return;
      }
      a = !0, i && Nu(), I(this, Pr) !== null && ha(I(this, Pr), () => {
        re(this, Pr, null);
      }), He(this, We, Io).call(this, () => {
        He(this, We, Hs).call(this);
      });
    }, s = (l) => {
      try {
        i = !0, t == null || t(l, o), i = !1;
      } catch (c) {
        Nn(c, I(this, Yt) && I(this, Yt).parent);
      }
      n && re(this, Pr, He(this, We, Io).call(this, () => {
        try {
          return Ft(() => {
            var c = (
              /** @type {Effect} */
              ne
            );
            c.b = this, c.f |= Ys, n(
              I(this, gr),
              () => l,
              () => o
            );
          });
        } catch (c) {
          return Nn(
            c,
            /** @type {Effect} */
            I(this, Yt).parent
          ), null;
        }
      }));
    };
    bn(() => {
      var l;
      try {
        l = this.transform_error(e);
      } catch (c) {
        Nn(c, I(this, Yt) && I(this, Yt).parent);
        return;
      }
      l !== null && typeof l == "object" && typeof /** @type {any} */
      l.then == "function" ? l.then(
        s,
        /** @param {unknown} e */
        (c) => Nn(c, I(this, Yt) && I(this, Yt).parent)
      ) : s(l);
    });
  }
}
gr = new WeakMap(), bl = new WeakMap(), Hr = new WeakMap(), pa = new WeakMap(), Yt = new WeakMap(), Kr = new WeakMap(), er = new WeakMap(), Pr = new WeakMap(), gn = new WeakMap(), ua = new WeakMap(), qn = new WeakMap(), ei = new WeakMap(), ti = new WeakMap(), ri = new WeakMap(), mn = new WeakMap(), Uo = new WeakMap(), We = new WeakSet(), cf = function() {
  try {
    re(this, Kr, Ft(() => I(this, pa).call(this, I(this, gr))));
  } catch (e) {
    this.error(e);
  }
}, /**
 * @param {unknown} error The deserialized error from the server's hydration comment
 */
df = function(e) {
  const t = I(this, Hr).failed;
  t && re(this, Pr, Ft(() => {
    t(
      I(this, gr),
      () => e,
      () => () => {
      }
    );
  }));
}, pf = function() {
  const e = I(this, Hr).pending;
  if (e) {
    this.is_pending = !0, re(this, er, Ft(() => e(I(this, gr))));
    var t = (
      /** @type {Batch} */
      J
    );
    bn(() => {
      var n = re(this, gn, document.createDocumentFragment()), a = en();
      n.append(a), re(this, Kr, He(this, We, Io).call(this, () => Ft(() => I(this, pa).call(this, a)))), I(this, qn) === 0 && (I(this, gr).before(n), re(this, gn, null), ha(
        /** @type {Effect} */
        I(this, er),
        () => {
          re(this, er, null);
        }
      ), He(this, We, _o).call(this, t));
    });
  }
}, Hs = function() {
  var e = (
    /** @type {Batch} */
    J
  );
  try {
    if (this.is_pending = this.has_pending_snippet(), re(this, qn, 0), re(this, ua, 0), re(this, Kr, Ft(() => {
      I(this, pa).call(this, I(this, gr));
    })), I(this, qn) > 0) {
      var t = re(this, gn, document.createDocumentFragment());
      Cl(I(this, Kr), t);
      const n = (
        /** @type {(anchor: Node) => void} */
        I(this, Hr).pending
      );
      re(this, er, Ft(() => n(I(this, gr))));
    } else
      He(this, We, _o).call(this, e);
  } catch (n) {
    this.error(n);
  }
}, /**
 * @param {Batch} batch
 */
_o = function(e) {
  this.is_pending = !1;
  for (const t of I(this, ti))
    je(t, kt), e.schedule(t);
  for (const t of I(this, ri))
    je(t, kr), e.schedule(t);
  I(this, ti).clear(), I(this, ri).clear();
}, /**
 * @template T
 * @param {() => T} fn
 */
Io = function(e) {
  var t = ne, n = ae, a = Pe;
  Xt(I(this, Yt)), Ar(I(this, Yt)), ii(I(this, Yt).ctx);
  try {
    return Aa.ensure(), e();
  } catch (i) {
    return dd(i), null;
  } finally {
    Xt(t), Ar(n), ii(a);
  }
}, /**
 * Updates the pending count associated with the currently visible pending snippet,
 * if any, such that we can replace the snippet with content once work is done
 * @param {1 | -1} d
 * @param {Batch} batch
 */
Ks = function(e, t) {
  var n;
  if (!this.has_pending_snippet()) {
    this.parent && He(n = this.parent, We, Ks).call(n, e, t);
    return;
  }
  re(this, qn, I(this, qn) + e), I(this, qn) === 0 && (He(this, We, _o).call(this, t), I(this, er) && ha(I(this, er), () => {
    re(this, er, null);
  }), I(this, gn) && (I(this, gr).before(I(this, gn)), re(this, gn, null)));
};
function bd(r, e, t, n) {
  const a = io() ? oo : El;
  var i = r.filter((p) => !p.settled);
  if (t.length === 0 && i.length === 0) {
    n(e.map(a));
    return;
  }
  var o = (
    /** @type {Effect} */
    ne
  ), s = uf(), l = i.length === 1 ? i[0].promise : i.length > 1 ? Promise.all(i.map((p) => p.promise)) : null;
  function c(p) {
    s();
    try {
      n(p);
    } catch (h) {
      o.f & yr || Nn(h, o);
    }
    qo();
  }
  if (t.length === 0) {
    l.then(() => c(e.map(a)));
    return;
  }
  var d = vd();
  function u() {
    Promise.all(t.map((p) => /* @__PURE__ */ ff(p))).then((p) => c([...e.map(a), ...p])).catch((p) => Nn(p, o)).finally(() => d());
  }
  l ? l.then(() => {
    s(), u(), qo();
  }) : u();
}
function uf() {
  var r = (
    /** @type {Effect} */
    ne
  ), e = ae, t = Pe, n = (
    /** @type {Batch} */
    J
  );
  return function(i = !0) {
    Xt(r), Ar(e), ii(t), i && !(r.f & yr) && (n == null || n.activate(), n == null || n.apply());
  };
}
function qo(r = !0) {
  Xt(null), Ar(null), ii(null), r && (J == null || J.deactivate());
}
function vd() {
  var r = (
    /** @type {Boundary} */
    /** @type {Effect} */
    ne.b
  ), e = (
    /** @type {Batch} */
    J
  ), t = r.is_rendered();
  return r.update_pending_count(1, e), e.increment(t), (n = !1) => {
    r.update_pending_count(-1, e), e.decrement(t, n);
  };
}
// @__NO_SIDE_EFFECTS__
function oo(r) {
  var e = nt | kt, t = ae !== null && ae.f & nt ? (
    /** @type {Derived} */
    ae
  ) : null;
  return ne !== null && (ne.f |= gi), {
    ctx: Pe,
    deps: null,
    effects: null,
    equals: sd,
    f: e,
    fn: r,
    reactions: null,
    rv: 0,
    v: (
      /** @type {V} */
      rt
    ),
    wv: 0,
    parent: t ?? ne,
    ac: null
  };
}
// @__NO_SIDE_EFFECTS__
function ff(r, e, t) {
  let n = (
    /** @type {Effect | null} */
    ne
  );
  n === null && zu();
  var a = (
    /** @type {Promise<V>} */
    /** @type {unknown} */
    void 0
  ), i = Un(
    /** @type {V} */
    rt
  ), o = !ae, s = /* @__PURE__ */ new Map();
  return If(() => {
    var h;
    var l = (
      /** @type {Effect} */
      ne
    ), c = ed();
    a = c.promise;
    try {
      Promise.resolve(r()).then(c.resolve, c.reject).finally(qo);
    } catch (b) {
      c.reject(b), qo();
    }
    var d = (
      /** @type {Batch} */
      J
    );
    if (o) {
      if (l.f & za)
        var u = vd();
      if (
        /** @type {Boundary} */
        n.b.is_rendered()
      )
        (h = s.get(d)) == null || h.reject(fn), s.delete(d);
      else {
        for (const b of s.values())
          b.reject(fn);
        s.clear();
      }
      s.set(d, c);
    }
    const p = (b, f = void 0) => {
      if (u) {
        var m = f === fn;
        u(m);
      }
      if (!(f === fn || l.f & yr)) {
        if (d.activate(), f)
          i.f |= jn, oi(i, f);
        else {
          i.f & jn && (i.f ^= jn), oi(i, b);
          for (const [v, k] of s) {
            if (s.delete(v), v === d) break;
            k.reject(fn);
          }
        }
        d.deactivate();
      }
    };
    c.promise.then(p, (b) => p(null, b || "unknown"));
  }), Ko(() => {
    for (const l of s.values())
      l.reject(fn);
  }), new Promise((l) => {
    function c(d) {
      function u() {
        d === a ? l(i) : c(a);
      }
      d.then(u, u);
    }
    c(a);
  });
}
// @__NO_SIDE_EFFECTS__
function hf(r) {
  const e = /* @__PURE__ */ oo(r);
  return Rd(e), e;
}
// @__NO_SIDE_EFFECTS__
function El(r) {
  const e = /* @__PURE__ */ oo(r);
  return e.equals = ld, e;
}
function gf(r) {
  var e = r.effects;
  if (e !== null) {
    r.effects = null;
    for (var t = 0; t < e.length; t += 1)
      ut(
        /** @type {Effect} */
        e[t]
      );
  }
}
function mf(r) {
  for (var e = r.parent; e !== null; ) {
    if (!(e.f & nt))
      return e.f & yr ? null : (
        /** @type {Effect} */
        e
      );
    e = e.parent;
  }
  return null;
}
function _l(r) {
  var e, t = ne;
  Xt(mf(r));
  try {
    r.f &= ~ka, gf(r), e = jd(r);
  } finally {
    Xt(t);
  }
  return e;
}
function xd(r) {
  var e = _l(r);
  if (!r.equals(e) && (r.wv = Ld(), (!(J != null && J.is_fork) || r.deps === null) && (r.v = e, r.deps === null))) {
    je(r, Qe);
    return;
  }
  Gn || (pt !== null ? (Il() || J != null && J.is_fork) && pt.set(r, e) : Sl(r));
}
function bf(r) {
  var e, t;
  if (r.effects !== null)
    for (const n of r.effects)
      (n.teardown || n.ac) && ((e = n.teardown) == null || e.call(n), (t = n.ac) == null || t.abort(fn), n.teardown = xu, n.ac = null, Hi(n, 0), Tl(n));
}
function yd(r) {
  if (r.effects !== null)
    for (const e of r.effects)
      e.teardown && Sa(e);
}
let Zs = /* @__PURE__ */ new Set();
const Fn = /* @__PURE__ */ new Map();
let wd = !1;
function Un(r, e) {
  var t = {
    f: 0,
    // TODO ideally we could skip this altogether, but it causes type errors
    v: r,
    reactions: null,
    equals: sd,
    rv: 0,
    wv: 0
  };
  return t;
}
// @__NO_SIDE_EFFECTS__
function Mn(r, e) {
  const t = Un(r);
  return Rd(t), t;
}
// @__NO_SIDE_EFFECTS__
function Ce(r, e = !1, t = !0) {
  var a;
  const n = Un(r);
  return e || (n.equals = ld), mi && t && Pe !== null && Pe.l !== null && ((a = Pe.l).s ?? (a.s = [])).push(n), n;
}
function R(r, e, t = !1) {
  ae !== null && // since we are untracking the function inside `$inspect.with` we need to add this check
  // to ensure we error if state is set inside an inspect effect
  (!Rr || ae.f & ac) && io() && ae.f & (nt | Zn | wl | ac) && (wr === null || !ni.call(wr, r)) && qu();
  let n = t ? Fa(e) : e;
  return oi(r, n, Eo);
}
function oi(r, e, t = null) {
  if (!r.equals(e)) {
    var n = r.v;
    Gn ? Fn.set(r, e) : Fn.set(r, n), r.v = e;
    var a = Aa.ensure();
    if (a.capture(r, n), r.f & nt) {
      const i = (
        /** @type {Derived} */
        r
      );
      r.f & kt && _l(i), Sl(i);
    }
    r.wv = Ld(), kd(r, kt, t), io() && ne !== null && ne.f & Qe && !(ne.f & (Vr | ya)) && (fr === null ? Cf([r]) : fr.push(r)), !a.is_fork && Zs.size > 0 && !wd && vf();
  }
  return e;
}
function vf() {
  wd = !1;
  for (const r of Zs)
    r.f & Qe && je(r, kr), bi(r) && Sa(r);
  Zs.clear();
}
function sc(r, e = 1) {
  var t = g(r), n = e === 1 ? t++ : t--;
  return R(r, t), n;
}
function Fi(r) {
  R(r, r.v + 1);
}
function kd(r, e, t) {
  var n = r.reactions;
  if (n !== null)
    for (var a = io(), i = n.length, o = 0; o < i; o++) {
      var s = n[o], l = s.f;
      if (!(!a && s === ne)) {
        var c = (l & kt) === 0;
        if (c && je(s, e), l & nt) {
          var d = (
            /** @type {Derived} */
            s
          );
          pt == null || pt.delete(d), l & ka || (l & xr && (s.f |= ka), kd(d, kr, t));
        } else if (c) {
          var u = (
            /** @type {Effect} */
            s
          );
          l & Zn && Or !== null && Or.add(u), t !== null ? t.push(u) : zl(u);
        }
      }
    }
}
function Fa(r) {
  if (typeof r != "object" || r === null || $r in r)
    return r;
  const e = xl(r);
  if (e !== bu && e !== vu)
    return r;
  var t = /* @__PURE__ */ new Map(), n = vl(r), a = /* @__PURE__ */ Mn(0), i = ga, o = (s) => {
    if (ga === i)
      return s();
    var l = ae, c = ga;
    Ar(null), uc(i);
    var d = s();
    return Ar(l), uc(c), d;
  };
  return n && t.set("length", /* @__PURE__ */ Mn(
    /** @type {any[]} */
    r.length
  )), new Proxy(
    /** @type {any} */
    r,
    {
      defineProperty(s, l, c) {
        (!("value" in c) || c.configurable === !1 || c.enumerable === !1 || c.writable === !1) && Ou();
        var d = t.get(l);
        return d === void 0 ? o(() => {
          var u = /* @__PURE__ */ Mn(c.value);
          return t.set(l, u), u;
        }) : R(d, c.value, !0), !0;
      },
      deleteProperty(s, l) {
        var c = t.get(l);
        if (c === void 0) {
          if (l in s) {
            const d = o(() => /* @__PURE__ */ Mn(rt));
            t.set(l, d), Fi(a);
          }
        } else
          R(c, rt), Fi(a);
        return !0;
      },
      get(s, l, c) {
        var h;
        if (l === $r)
          return r;
        var d = t.get(l), u = l in s;
        if (d === void 0 && (!u || (h = Yn(s, l)) != null && h.writable) && (d = o(() => {
          var b = Fa(u ? s[l] : rt), f = /* @__PURE__ */ Mn(b);
          return f;
        }), t.set(l, d)), d !== void 0) {
          var p = g(d);
          return p === rt ? void 0 : p;
        }
        return Reflect.get(s, l, c);
      },
      getOwnPropertyDescriptor(s, l) {
        var c = Reflect.getOwnPropertyDescriptor(s, l);
        if (c && "value" in c) {
          var d = t.get(l);
          d && (c.value = g(d));
        } else if (c === void 0) {
          var u = t.get(l), p = u == null ? void 0 : u.v;
          if (u !== void 0 && p !== rt)
            return {
              enumerable: !0,
              configurable: !0,
              value: p,
              writable: !0
            };
        }
        return c;
      },
      has(s, l) {
        var p;
        if (l === $r)
          return !0;
        var c = t.get(l), d = c !== void 0 && c.v !== rt || Reflect.has(s, l);
        if (c !== void 0 || ne !== null && (!d || (p = Yn(s, l)) != null && p.writable)) {
          c === void 0 && (c = o(() => {
            var h = d ? Fa(s[l]) : rt, b = /* @__PURE__ */ Mn(h);
            return b;
          }), t.set(l, c));
          var u = g(c);
          if (u === rt)
            return !1;
        }
        return d;
      },
      set(s, l, c, d) {
        var x;
        var u = t.get(l), p = l in s;
        if (n && l === "length")
          for (var h = c; h < /** @type {Source<number>} */
          u.v; h += 1) {
            var b = t.get(h + "");
            b !== void 0 ? R(b, rt) : h in s && (b = o(() => /* @__PURE__ */ Mn(rt)), t.set(h + "", b));
          }
        if (u === void 0)
          (!p || (x = Yn(s, l)) != null && x.writable) && (u = o(() => /* @__PURE__ */ Mn(void 0)), R(u, Fa(c)), t.set(l, u));
        else {
          p = u.v !== rt;
          var f = o(() => Fa(c));
          R(u, f);
        }
        var m = Reflect.getOwnPropertyDescriptor(s, l);
        if (m != null && m.set && m.set.call(d, c), !p) {
          if (n && typeof l == "string") {
            var v = (
              /** @type {Source<number>} */
              t.get("length")
            ), k = Number(l);
            Number.isInteger(k) && k >= v.v && R(v, k + 1);
          }
          Fi(a);
        }
        return !0;
      },
      ownKeys(s) {
        g(a);
        var l = Reflect.ownKeys(s).filter((u) => {
          var p = t.get(u);
          return p === void 0 || p.v !== rt;
        });
        for (var [c, d] of t)
          d.v !== rt && !(c in s) && l.push(c);
        return l;
      },
      setPrototypeOf() {
        Pu();
      }
    }
  );
}
function lc(r) {
  try {
    if (r !== null && typeof r == "object" && $r in r)
      return r[$r];
  } catch {
  }
  return r;
}
function xf(r, e) {
  return Object.is(lc(r), lc(e));
}
var cc, Ad, Sd, zd;
function yf() {
  if (cc === void 0) {
    cc = window, Ad = /Firefox/.test(navigator.userAgent);
    var r = Element.prototype, e = Node.prototype, t = Text.prototype;
    Sd = Yn(e, "firstChild").get, zd = Yn(e, "nextSibling").get, nc(r) && (r.__click = void 0, r.__className = void 0, r.__attributes = null, r.__style = void 0, r.__e = void 0), nc(t) && (t.__t = void 0);
  }
}
function en(r = "") {
  return document.createTextNode(r);
}
// @__NO_SIDE_EFFECTS__
function si(r) {
  return (
    /** @type {TemplateNode | null} */
    Sd.call(r)
  );
}
// @__NO_SIDE_EFFECTS__
function so(r) {
  return (
    /** @type {TemplateNode | null} */
    zd.call(r)
  );
}
function S(r, e) {
  return /* @__PURE__ */ si(r);
}
function ce(r, e = !1) {
  {
    var t = /* @__PURE__ */ si(r);
    return t instanceof Comment && t.data === "" ? /* @__PURE__ */ so(t) : t;
  }
}
function z(r, e = 1, t = !1) {
  let n = r;
  for (; e--; )
    n = /** @type {TemplateNode} */
    /* @__PURE__ */ so(n);
  return n;
}
function wf(r) {
  r.textContent = "";
}
function Ed() {
  return !1;
}
function _d(r, e, t) {
  return (
    /** @type {T extends keyof HTMLElementTagNameMap ? HTMLElementTagNameMap[T] : Element} */
    document.createElementNS(e ?? od, r, void 0)
  );
}
function kf(r, e) {
  if (e) {
    const t = document.body;
    r.autofocus = !0, bn(() => {
      document.activeElement === t && r.focus();
    });
  }
}
let dc = !1;
function Af() {
  dc || (dc = !0, document.addEventListener(
    "reset",
    (r) => {
      Promise.resolve().then(() => {
        var e;
        if (!r.defaultPrevented)
          for (
            const t of
            /**@type {HTMLFormElement} */
            r.target.elements
          )
            (e = t.__on_r) == null || e.call(t);
      });
    },
    // In the capture phase to guarantee we get noticed of it (no possibility of stopPropagation)
    { capture: !0 }
  ));
}
function Ho(r) {
  var e = ae, t = ne;
  Ar(null), Xt(null);
  try {
    return r();
  } finally {
    Ar(e), Xt(t);
  }
}
function Id(r, e, t, n = t) {
  r.addEventListener(e, () => Ho(t));
  const a = r.__on_r;
  a ? r.__on_r = () => {
    a(), n(!0);
  } : r.__on_r = () => n(!0), Af();
}
function Td(r) {
  ne === null && (ae === null && Tu(), Iu()), Gn && _u();
}
function Sf(r, e) {
  var t = e.last;
  t === null ? e.last = e.first = r : (t.next = r, r.prev = t, e.last = r);
}
function Lr(r, e) {
  var t = ne;
  t !== null && t.f & or && (r |= or);
  var n = {
    ctx: Pe,
    deps: null,
    nodes: null,
    f: r | kt | xr,
    first: null,
    fn: e,
    last: null,
    next: null,
    parent: t,
    b: t && t.b,
    prev: null,
    teardown: null,
    wv: 0,
    ac: null
  }, a = n;
  if (r & ai)
    ja !== null ? ja.push(n) : Aa.ensure().schedule(n);
  else if (e !== null) {
    try {
      Sa(n);
    } catch (o) {
      throw ut(n), o;
    }
    a.deps === null && a.teardown === null && a.nodes === null && a.first === a.last && // either `null`, or a singular child
    !(a.f & gi) && (a = a.first, r & Zn && r & wa && a !== null && (a.f |= wa));
  }
  if (a !== null && (a.parent = t, t !== null && Sf(a, t), ae !== null && ae.f & nt && !(r & ya))) {
    var i = (
      /** @type {Derived} */
      ae
    );
    (i.effects ?? (i.effects = [])).push(a);
  }
  return n;
}
function Il() {
  return ae !== null && !Rr;
}
function Ko(r) {
  const e = Lr(ao, null);
  return je(e, Qe), e.teardown = r, e;
}
function Qs(r) {
  Td();
  var e = (
    /** @type {Effect} */
    ne.f
  ), t = !ae && (e & Vr) !== 0 && (e & za) === 0;
  if (t) {
    var n = (
      /** @type {ComponentContext} */
      Pe
    );
    (n.e ?? (n.e = [])).push(r);
  } else
    return Md(r);
}
function Md(r) {
  return Lr(ai | td, r);
}
function zf(r) {
  return Td(), Lr(ao | td, r);
}
function Ef(r) {
  Aa.ensure();
  const e = Lr(ya | gi, r);
  return (t = {}) => new Promise((n) => {
    t.outro ? ha(e, () => {
      ut(e), n(void 0);
    }) : (ut(e), n(void 0));
  });
}
function Zo(r) {
  return Lr(ai, r);
}
function ws(r, e) {
  var t = (
    /** @type {ComponentContextLegacy} */
    Pe
  ), n = { effect: null, ran: !1, deps: r };
  t.l.$.push(n), n.effect = lo(() => {
    if (r(), !n.ran) {
      n.ran = !0;
      var a = (
        /** @type {Effect} */
        ne
      );
      try {
        Xt(a.parent), V(e);
      } finally {
        Xt(a);
      }
    }
  });
}
function _f() {
  var r = (
    /** @type {ComponentContextLegacy} */
    Pe
  );
  lo(() => {
    for (var e of r.l.$) {
      e.deps();
      var t = e.effect;
      t.f & Qe && t.deps !== null && je(t, kr), bi(t) && Sa(t), e.ran = !1;
    }
  });
}
function If(r) {
  return Lr(wl | gi, r);
}
function lo(r, e = 0) {
  return Lr(ao | e, r);
}
function he(r, e = [], t = [], n = []) {
  bd(n, e, t, (a) => {
    Lr(ao, () => r(...a.map(g)));
  });
}
function Qo(r, e = 0) {
  var t = Lr(Zn | e, r);
  return t;
}
function Cd(r, e = 0) {
  var t = Lr(yl | e, r);
  return t;
}
function Ft(r) {
  return Lr(Vr | gi, r);
}
function Od(r) {
  var e = r.teardown;
  if (e !== null) {
    const t = Gn, n = ae;
    pc(!0), Ar(null);
    try {
      e.call(null);
    } finally {
      pc(t), Ar(n);
    }
  }
}
function Tl(r, e = !1) {
  var t = r.first;
  for (r.first = r.last = null; t !== null; ) {
    const a = t.ac;
    a !== null && Ho(() => {
      a.abort(fn);
    });
    var n = t.next;
    t.f & ya ? t.parent = null : ut(t, e), t = n;
  }
}
function Tf(r) {
  for (var e = r.first; e !== null; ) {
    var t = e.next;
    e.f & Vr || ut(e), e = t;
  }
}
function ut(r, e = !0) {
  var t = !1;
  (e || r.f & ku) && r.nodes !== null && r.nodes.end !== null && (Mf(
    r.nodes.start,
    /** @type {TemplateNode} */
    r.nodes.end
  ), t = !0), je(r, js), Tl(r, e && !t), Hi(r, 0);
  var n = r.nodes && r.nodes.t;
  if (n !== null)
    for (const i of n)
      i.stop();
  Od(r), r.f ^= js, r.f |= yr;
  var a = r.parent;
  a !== null && a.first !== null && Pd(r), r.next = r.prev = r.teardown = r.ctx = r.deps = r.fn = r.nodes = r.ac = null;
}
function Mf(r, e) {
  for (; r !== null; ) {
    var t = r === e ? null : /* @__PURE__ */ so(r);
    r.remove(), r = t;
  }
}
function Pd(r) {
  var e = r.parent, t = r.prev, n = r.next;
  t !== null && (t.next = n), n !== null && (n.prev = t), e !== null && (e.first === r && (e.first = n), e.last === r && (e.last = t));
}
function ha(r, e, t = !0) {
  var n = [];
  qd(r, n, !0);
  var a = () => {
    t && ut(r), e && e();
  }, i = n.length;
  if (i > 0) {
    var o = () => --i || a();
    for (var s of n)
      s.out(o);
  } else
    a();
}
function qd(r, e, t) {
  if (!(r.f & or)) {
    r.f ^= or;
    var n = r.nodes && r.nodes.t;
    if (n !== null)
      for (const s of n)
        (s.is_global || t) && e.push(s);
    for (var a = r.first; a !== null; ) {
      var i = a.next, o = (a.f & wa) !== 0 || // If this is a branch effect without a block effect parent,
      // it means the parent block effect was pruned. In that case,
      // transparency information was transferred to the branch effect.
      (a.f & Vr) !== 0 && (r.f & Zn) !== 0;
      qd(a, e, o ? t : !1), a = i;
    }
  }
}
function Ml(r) {
  Nd(r, !0);
}
function Nd(r, e) {
  if (r.f & or) {
    r.f ^= or, r.f & Qe || (je(r, kt), Aa.ensure().schedule(r));
    for (var t = r.first; t !== null; ) {
      var n = t.next, a = (t.f & wa) !== 0 || (t.f & Vr) !== 0;
      Nd(t, a ? e : !1), t = n;
    }
    var i = r.nodes && r.nodes.t;
    if (i !== null)
      for (const o of i)
        (o.is_global || e) && o.in();
  }
}
function Cl(r, e) {
  if (r.nodes)
    for (var t = r.nodes.start, n = r.nodes.end; t !== null; ) {
      var a = t === n ? null : /* @__PURE__ */ so(t);
      e.append(t), t = a;
    }
}
let To = !1, Gn = !1;
function pc(r) {
  Gn = r;
}
let ae = null, Rr = !1;
function Ar(r) {
  ae = r;
}
let ne = null;
function Xt(r) {
  ne = r;
}
let wr = null;
function Rd(r) {
  ae !== null && (wr === null ? wr = [r] : wr.push(r));
}
let jt = null, Jt = 0, fr = null;
function Cf(r) {
  fr = r;
}
let Vd = 1, la = 0, ga = la;
function uc(r) {
  ga = r;
}
function Ld() {
  return ++Vd;
}
function bi(r) {
  var e = r.f;
  if (e & kt)
    return !0;
  if (e & nt && (r.f &= ~ka), e & kr) {
    for (var t = (
      /** @type {Value[]} */
      r.deps
    ), n = t.length, a = 0; a < n; a++) {
      var i = t[a];
      if (bi(
        /** @type {Derived} */
        i
      ) && xd(
        /** @type {Derived} */
        i
      ), i.wv > r.wv)
        return !0;
    }
    e & xr && // During time traveling we don't want to reset the status so that
    // traversal of the graph in the other batches still happens
    pt === null && je(r, Qe);
  }
  return !1;
}
function Yd(r, e, t = !0) {
  var n = r.reactions;
  if (n !== null && !(wr !== null && ni.call(wr, r)))
    for (var a = 0; a < n.length; a++) {
      var i = n[a];
      i.f & nt ? Yd(
        /** @type {Derived} */
        i,
        e,
        !1
      ) : e === i && (t ? je(i, kt) : i.f & Qe && je(i, kr), zl(
        /** @type {Effect} */
        i
      ));
    }
}
function jd(r) {
  var f;
  var e = jt, t = Jt, n = fr, a = ae, i = wr, o = Pe, s = Rr, l = ga, c = r.f;
  jt = /** @type {null | Value[]} */
  null, Jt = 0, fr = null, ae = c & (Vr | ya) ? null : r, wr = null, ii(r.ctx), Rr = !1, ga = ++la, r.ac !== null && (Ho(() => {
    r.ac.abort(fn);
  }), r.ac = null);
  try {
    r.f |= Fs;
    var d = (
      /** @type {Function} */
      r.fn
    ), u = d();
    r.f |= za;
    var p = r.deps, h = J == null ? void 0 : J.is_fork;
    if (jt !== null) {
      var b;
      if (h || Hi(r, Jt), p !== null && Jt > 0)
        for (p.length = Jt + jt.length, b = 0; b < jt.length; b++)
          p[Jt + b] = jt[b];
      else
        r.deps = p = jt;
      if (Il() && r.f & xr)
        for (b = Jt; b < p.length; b++)
          ((f = p[b]).reactions ?? (f.reactions = [])).push(r);
    } else !h && p !== null && Jt < p.length && (Hi(r, Jt), p.length = Jt);
    if (io() && fr !== null && !Rr && p !== null && !(r.f & (nt | kr | kt)))
      for (b = 0; b < /** @type {Source[]} */
      fr.length; b++)
        Yd(
          fr[b],
          /** @type {Effect} */
          r
        );
    if (a !== null && a !== r) {
      if (la++, a.deps !== null)
        for (let m = 0; m < t; m += 1)
          a.deps[m].rv = la;
      if (e !== null)
        for (const m of e)
          m.rv = la;
      fr !== null && (n === null ? n = fr : n.push(.../** @type {Source[]} */
      fr));
    }
    return r.f & jn && (r.f ^= jn), u;
  } catch (m) {
    return dd(m);
  } finally {
    r.f ^= Fs, jt = e, Jt = t, fr = n, ae = a, wr = i, ii(o), Rr = s, ga = l;
  }
}
function Of(r, e) {
  let t = e.reactions;
  if (t !== null) {
    var n = gu.call(t, r);
    if (n !== -1) {
      var a = t.length - 1;
      a === 0 ? t = e.reactions = null : (t[n] = t[a], t.pop());
    }
  }
  if (t === null && e.f & nt && // Destroying a child effect while updating a parent effect can cause a dependency to appear
  // to be unused, when in fact it is used by the currently-updating parent. Checking `new_deps`
  // allows us to skip the expensive work of disconnecting and immediately reconnecting it
  (jt === null || !ni.call(jt, e))) {
    var i = (
      /** @type {Derived} */
      e
    );
    i.f & xr && (i.f ^= xr, i.f &= ~ka), Sl(i), bf(i), Hi(i, 0);
  }
}
function Hi(r, e) {
  var t = r.deps;
  if (t !== null)
    for (var n = e; n < t.length; n++)
      Of(r, t[n]);
}
function Sa(r) {
  var e = r.f;
  if (!(e & yr)) {
    je(r, Qe);
    var t = ne, n = To;
    ne = r, To = !0;
    try {
      e & (Zn | yl) ? Tf(r) : Tl(r), Od(r);
      var a = jd(r);
      r.teardown = typeof a == "function" ? a : null, r.wv = Vd;
      var i;
    } finally {
      To = n, ne = t;
    }
  }
}
async function Ri() {
  await Promise.resolve(), rf();
}
function g(r) {
  var e = r.f, t = (e & nt) !== 0;
  if (ae !== null && !Rr) {
    var n = ne !== null && (ne.f & yr) !== 0;
    if (!n && (wr === null || !ni.call(wr, r))) {
      var a = ae.deps;
      if (ae.f & Fs)
        r.rv < la && (r.rv = la, jt === null && a !== null && a[Jt] === r ? Jt++ : jt === null ? jt = [r] : jt.push(r));
      else {
        (ae.deps ?? (ae.deps = [])).push(r);
        var i = r.reactions;
        i === null ? r.reactions = [ae] : ni.call(i, ae) || i.push(ae);
      }
    }
  }
  if (Gn && Fn.has(r))
    return Fn.get(r);
  if (t) {
    var o = (
      /** @type {Derived} */
      r
    );
    if (Gn) {
      var s = o.v;
      return (!(o.f & Qe) && o.reactions !== null || Bd(o)) && (s = _l(o)), Fn.set(o, s), s;
    }
    var l = (o.f & xr) === 0 && !Rr && ae !== null && (To || (ae.f & xr) !== 0), c = (o.f & za) === 0;
    bi(o) && (l && (o.f |= xr), xd(o)), l && !c && (yd(o), Fd(o));
  }
  if (pt != null && pt.has(r))
    return pt.get(r);
  if (r.f & jn)
    throw r.v;
  return r.v;
}
function Fd(r) {
  if (r.f |= xr, r.deps !== null)
    for (const e of r.deps)
      (e.reactions ?? (e.reactions = [])).push(r), e.f & nt && !(e.f & xr) && (yd(
        /** @type {Derived} */
        e
      ), Fd(
        /** @type {Derived} */
        e
      ));
}
function Bd(r) {
  if (r.v === rt) return !0;
  if (r.deps === null) return !1;
  for (const e of r.deps)
    if (Fn.has(e) || e.f & nt && Bd(
      /** @type {Derived} */
      e
    ))
      return !0;
  return !1;
}
function V(r) {
  var e = Rr;
  try {
    return Rr = !0, r();
  } finally {
    Rr = e;
  }
}
function Nr(r) {
  if (!(typeof r != "object" || !r || r instanceof EventTarget)) {
    if ($r in r)
      Ws(r);
    else if (!Array.isArray(r))
      for (let e in r) {
        const t = r[e];
        typeof t == "object" && t && $r in t && Ws(t);
      }
  }
}
function Ws(r, e = /* @__PURE__ */ new Set()) {
  if (typeof r == "object" && r !== null && // We don't want to traverse DOM elements
  !(r instanceof EventTarget) && !e.has(r)) {
    e.add(r), r instanceof Date && r.getTime();
    for (let n in r)
      try {
        Ws(r[n], e);
      } catch {
      }
    const t = xl(r);
    if (t !== Object.prototype && t !== Array.prototype && t !== Map.prototype && t !== Set.prototype && t !== Date.prototype) {
      const n = $c(t);
      for (let a in n) {
        const i = n[a].get;
        if (i)
          try {
            i.call(r);
          } catch {
          }
      }
    }
  }
}
function Pf(r) {
  return r.endsWith("capture") && r !== "gotpointercapture" && r !== "lostpointercapture";
}
const qf = [
  "beforeinput",
  "click",
  "change",
  "dblclick",
  "contextmenu",
  "focusin",
  "focusout",
  "input",
  "keydown",
  "keyup",
  "mousedown",
  "mousemove",
  "mouseout",
  "mouseover",
  "mouseup",
  "pointerdown",
  "pointermove",
  "pointerout",
  "pointerover",
  "pointerup",
  "touchend",
  "touchmove",
  "touchstart"
];
function Nf(r) {
  return qf.includes(r);
}
const Rf = {
  // no `class: 'className'` because we handle that separately
  formnovalidate: "formNoValidate",
  ismap: "isMap",
  nomodule: "noModule",
  playsinline: "playsInline",
  readonly: "readOnly",
  defaultvalue: "defaultValue",
  defaultchecked: "defaultChecked",
  srcobject: "srcObject",
  novalidate: "noValidate",
  allowfullscreen: "allowFullscreen",
  disablepictureinpicture: "disablePictureInPicture",
  disableremoteplayback: "disableRemotePlayback"
};
function Vf(r) {
  return r = r.toLowerCase(), Rf[r] ?? r;
}
const Lf = ["touchstart", "touchmove"];
function Yf(r) {
  return Lf.includes(r);
}
const ca = Symbol("events"), Dd = /* @__PURE__ */ new Set(), Js = /* @__PURE__ */ new Set();
function Ud(r, e, t, n = {}) {
  function a(i) {
    if (n.capture || $s.call(e, i), !i.cancelBubble)
      return Ho(() => t == null ? void 0 : t.call(this, i));
  }
  return r.startsWith("pointer") || r.startsWith("touch") || r === "wheel" ? bn(() => {
    e.addEventListener(r, a, n);
  }) : e.addEventListener(r, a, n), a;
}
function te(r, e, t, n, a) {
  var i = { capture: n, passive: a }, o = Ud(r, e, t, i);
  (e === document.body || // @ts-ignore
  e === window || // @ts-ignore
  e === document || // Firefox has quirky behavior, it can happen that we still get "canplay" events when the element is already removed
  e instanceof HTMLMediaElement) && Ko(() => {
    e.removeEventListener(r, o, i);
  });
}
function jf(r, e, t) {
  (e[ca] ?? (e[ca] = {}))[r] = t;
}
function Ff(r) {
  for (var e = 0; e < r.length; e++)
    Dd.add(r[e]);
  for (var t of Js)
    t(r);
}
let fc = null;
function $s(r) {
  var m, v;
  var e = this, t = (
    /** @type {Node} */
    e.ownerDocument
  ), n = r.type, a = ((m = r.composedPath) == null ? void 0 : m.call(r)) || [], i = (
    /** @type {null | Element} */
    a[0] || r.target
  );
  fc = r;
  var o = 0, s = fc === r && r[ca];
  if (s) {
    var l = a.indexOf(s);
    if (l !== -1 && (e === document || e === /** @type {any} */
    window)) {
      r[ca] = e;
      return;
    }
    var c = a.indexOf(e);
    if (c === -1)
      return;
    l <= c && (o = l);
  }
  if (i = /** @type {Element} */
  a[o] || r.target, i !== e) {
    mu(r, "currentTarget", {
      configurable: !0,
      get() {
        return i || t;
      }
    });
    var d = ae, u = ne;
    Ar(null), Xt(null);
    try {
      for (var p, h = []; i !== null; ) {
        var b = i.assignedSlot || i.parentNode || /** @type {any} */
        i.host || null;
        try {
          var f = (v = i[ca]) == null ? void 0 : v[n];
          f != null && (!/** @type {any} */
          i.disabled || // DOM could've been updated already by the time this is reached, so we check this as well
          // -> the target could not have been disabled because it emits the event in the first place
          r.target === i) && f.call(i, r);
        } catch (k) {
          p ? h.push(k) : p = k;
        }
        if (r.cancelBubble || b === e || b === null)
          break;
        i = b;
      }
      if (p) {
        for (let k of h)
          queueMicrotask(() => {
            throw k;
          });
        throw p;
      }
    } finally {
      r[ca] = e, delete r.currentTarget, Ar(d), Xt(u);
    }
  }
}
var Wc;
const ks = (
  // We gotta write it like this because after downleveling the pure comment may end up in the wrong location
  ((Wc = globalThis == null ? void 0 : globalThis.window) == null ? void 0 : Wc.trustedTypes) && /* @__PURE__ */ globalThis.window.trustedTypes.createPolicy("svelte-trusted-html", {
    /** @param {string} html */
    createHTML: (r) => r
  })
);
function Bf(r) {
  return (
    /** @type {string} */
    (ks == null ? void 0 : ks.createHTML(r)) ?? r
  );
}
function Gd(r) {
  var e = _d("template");
  return e.innerHTML = Bf(r.replaceAll("<!>", "<!---->")), e.content;
}
function li(r, e) {
  var t = (
    /** @type {Effect} */
    ne
  );
  t.nodes === null && (t.nodes = { start: r, end: e, a: null, t: null });
}
// @__NO_SIDE_EFFECTS__
function W(r, e) {
  var t = (e & Uu) !== 0, n = (e & Gu) !== 0, a, i = !r.startsWith("<!>");
  return () => {
    a === void 0 && (a = Gd(i ? r : "<!>" + r), t || (a = /** @type {TemplateNode} */
    /* @__PURE__ */ si(a)));
    var o = (
      /** @type {TemplateNode} */
      n || Ad ? document.importNode(a, !0) : a.cloneNode(!0)
    );
    if (t) {
      var s = (
        /** @type {TemplateNode} */
        /* @__PURE__ */ si(o)
      ), l = (
        /** @type {TemplateNode} */
        o.lastChild
      );
      li(s, l);
    } else
      li(o, o);
    return o;
  };
}
// @__NO_SIDE_EFFECTS__
function Df(r, e, t = "svg") {
  var n = !r.startsWith("<!>"), a = `<${t}>${n ? r : "<!>" + r}</${t}>`, i;
  return () => {
    if (!i) {
      var o = (
        /** @type {DocumentFragment} */
        Gd(a)
      ), s = (
        /** @type {Element} */
        /* @__PURE__ */ si(o)
      );
      i = /** @type {Element} */
      /* @__PURE__ */ si(s);
    }
    var l = (
      /** @type {TemplateNode} */
      i.cloneNode(!0)
    );
    return li(l, l), l;
  };
}
// @__NO_SIDE_EFFECTS__
function Uf(r, e) {
  return /* @__PURE__ */ Df(r, e, "svg");
}
function ko(r = "") {
  {
    var e = en(r + "");
    return li(e, e), e;
  }
}
function Ie() {
  var r = document.createDocumentFragment(), e = document.createComment(""), t = en();
  return r.append(e, t), li(e, t), r;
}
function L(r, e) {
  r !== null && r.before(
    /** @type {Node} */
    e
  );
}
function Q(r, e) {
  var t = e == null ? "" : typeof e == "object" ? `${e}` : e;
  t !== (r.__t ?? (r.__t = r.nodeValue)) && (r.__t = t, r.nodeValue = `${t}`);
}
function Gf(r, e) {
  return Xf(r, e);
}
const Ao = /* @__PURE__ */ new Map();
function Xf(r, { target: e, anchor: t, props: n = {}, events: a, context: i, intro: o = !0, transformError: s }) {
  yf();
  var l = void 0, c = Ef(() => {
    var d = t ?? e.appendChild(en());
    sf(
      /** @type {TemplateNode} */
      d,
      {
        pending: () => {
        }
      },
      (h) => {
        kl({});
        var b = (
          /** @type {ComponentContext} */
          Pe
        );
        i && (b.c = i), a && (n.$$events = a), l = r(h, n) || {}, Al();
      },
      s
    );
    var u = /* @__PURE__ */ new Set(), p = (h) => {
      for (var b = 0; b < h.length; b++) {
        var f = h[b];
        if (!u.has(f)) {
          u.add(f);
          var m = Yf(f);
          for (const x of [e, document]) {
            var v = Ao.get(x);
            v === void 0 && (v = /* @__PURE__ */ new Map(), Ao.set(x, v));
            var k = v.get(f);
            k === void 0 ? (x.addEventListener(f, $s, { passive: m }), v.set(f, 1)) : v.set(f, k + 1);
          }
        }
      }
    };
    return p(Xo(Dd)), Js.add(p), () => {
      var m;
      for (var h of u)
        for (const v of [e, document]) {
          var b = (
            /** @type {Map<string, number>} */
            Ao.get(v)
          ), f = (
            /** @type {number} */
            b.get(h)
          );
          --f == 0 ? (v.removeEventListener(h, $s), b.delete(h), b.size === 0 && Ao.delete(v)) : b.set(h, f);
        }
      Js.delete(p), d !== t && ((m = d.parentNode) == null || m.removeChild(d));
    };
  });
  return Hf.set(l, c), l;
}
let Hf = /* @__PURE__ */ new WeakMap();
var qr, Zr, tr, fa, ro, no, Go;
class Xd {
  /**
   * @param {TemplateNode} anchor
   * @param {boolean} transition
   */
  constructor(e, t = !0) {
    /** @type {TemplateNode} */
    Mr(this, "anchor");
    /** @type {Map<Batch, Key>} */
    le(this, qr, /* @__PURE__ */ new Map());
    /**
     * Map of keys to effects that are currently rendered in the DOM.
     * These effects are visible and actively part of the document tree.
     * Example:
     * ```
     * {#if condition}
     * 	foo
     * {:else}
     * 	bar
     * {/if}
     * ```
     * Can result in the entries `true->Effect` and `false->Effect`
     * @type {Map<Key, Effect>}
     */
    le(this, Zr, /* @__PURE__ */ new Map());
    /**
     * Similar to #onscreen with respect to the keys, but contains branches that are not yet
     * in the DOM, because their insertion is deferred.
     * @type {Map<Key, Branch>}
     */
    le(this, tr, /* @__PURE__ */ new Map());
    /**
     * Keys of effects that are currently outroing
     * @type {Set<Key>}
     */
    le(this, fa, /* @__PURE__ */ new Set());
    /**
     * Whether to pause (i.e. outro) on change, or destroy immediately.
     * This is necessary for `<svelte:element>`
     */
    le(this, ro, !0);
    /**
     * @param {Batch} batch
     */
    le(this, no, (e) => {
      if (I(this, qr).has(e)) {
        var t = (
          /** @type {Key} */
          I(this, qr).get(e)
        ), n = I(this, Zr).get(t);
        if (n)
          Ml(n), I(this, fa).delete(t);
        else {
          var a = I(this, tr).get(t);
          a && (I(this, Zr).set(t, a.effect), I(this, tr).delete(t), a.fragment.lastChild.remove(), this.anchor.before(a.fragment), n = a.effect);
        }
        for (const [i, o] of I(this, qr)) {
          if (I(this, qr).delete(i), i === e)
            break;
          const s = I(this, tr).get(o);
          s && (ut(s.effect), I(this, tr).delete(o));
        }
        for (const [i, o] of I(this, Zr)) {
          if (i === t || I(this, fa).has(i)) continue;
          const s = () => {
            if (Array.from(I(this, qr).values()).includes(i)) {
              var c = document.createDocumentFragment();
              Cl(o, c), c.append(en()), I(this, tr).set(i, { effect: o, fragment: c });
            } else
              ut(o);
            I(this, fa).delete(i), I(this, Zr).delete(i);
          };
          I(this, ro) || !n ? (I(this, fa).add(i), ha(o, s, !1)) : s();
        }
      }
    });
    /**
     * @param {Batch} batch
     */
    le(this, Go, (e) => {
      I(this, qr).delete(e);
      const t = Array.from(I(this, qr).values());
      for (const [n, a] of I(this, tr))
        t.includes(n) || (ut(a.effect), I(this, tr).delete(n));
    });
    this.anchor = e, re(this, ro, t);
  }
  /**
   *
   * @param {any} key
   * @param {null | ((target: TemplateNode) => void)} fn
   */
  ensure(e, t) {
    var n = (
      /** @type {Batch} */
      J
    ), a = Ed();
    if (t && !I(this, Zr).has(e) && !I(this, tr).has(e))
      if (a) {
        var i = document.createDocumentFragment(), o = en();
        i.append(o), I(this, tr).set(e, {
          effect: Ft(() => t(o)),
          fragment: i
        });
      } else
        I(this, Zr).set(
          e,
          Ft(() => t(this.anchor))
        );
    if (I(this, qr).set(n, e), a) {
      for (const [s, l] of I(this, Zr))
        s === e ? n.unskip_effect(l) : n.skip_effect(l);
      for (const [s, l] of I(this, tr))
        s === e ? n.unskip_effect(l.effect) : n.skip_effect(l.effect);
      n.oncommit(I(this, no)), n.ondiscard(I(this, Go));
    } else
      I(this, no).call(this, n);
  }
}
qr = new WeakMap(), Zr = new WeakMap(), tr = new WeakMap(), fa = new WeakMap(), ro = new WeakMap(), no = new WeakMap(), Go = new WeakMap();
function ye(r, e, t = !1) {
  var n = new Xd(r), a = t ? wa : 0;
  function i(o, s) {
    n.ensure(o, s);
  }
  Qo(() => {
    var o = !1;
    e((s, l = 0) => {
      o = !0, i(l, s);
    }), o || i(-1, null);
  }, a);
}
function It(r, e) {
  return e;
}
function Kf(r, e, t) {
  for (var n = [], a = e.length, i, o = e.length, s = 0; s < a; s++) {
    let u = e[s];
    ha(
      u,
      () => {
        if (i) {
          if (i.pending.delete(u), i.done.add(u), i.pending.size === 0) {
            var p = (
              /** @type {Set<EachOutroGroup>} */
              r.outrogroups
            );
            el(r, Xo(i.done)), p.delete(i), p.size === 0 && (r.outrogroups = null);
          }
        } else
          o -= 1;
      },
      !1
    );
  }
  if (o === 0) {
    var l = n.length === 0 && t !== null;
    if (l) {
      var c = (
        /** @type {Element} */
        t
      ), d = (
        /** @type {Element} */
        c.parentNode
      );
      wf(d), d.append(c), r.items.clear();
    }
    el(r, e, !l);
  } else
    i = {
      pending: new Set(e),
      done: /* @__PURE__ */ new Set()
    }, (r.outrogroups ?? (r.outrogroups = /* @__PURE__ */ new Set())).add(i);
}
function el(r, e, t = !0) {
  var n;
  if (r.pending.size > 0) {
    n = /* @__PURE__ */ new Set();
    for (const o of r.pending.values())
      for (const s of o)
        n.add(
          /** @type {EachItem} */
          r.items.get(s).e
        );
  }
  for (var a = 0; a < e.length; a++) {
    var i = e[a];
    if (n != null && n.has(i)) {
      i.f |= Wr;
      const o = document.createDocumentFragment();
      Cl(i, o);
    } else
      ut(e[a], t);
  }
}
var hc;
function Tt(r, e, t, n, a, i = null) {
  var o = r, s = /* @__PURE__ */ new Map(), l = (e & ad) !== 0;
  if (l) {
    var c = (
      /** @type {Element} */
      r
    );
    o = c.appendChild(en());
  }
  var d = null, u = /* @__PURE__ */ El(() => {
    var x = t();
    return vl(x) ? x : x == null ? [] : Xo(x);
  }), p, h = /* @__PURE__ */ new Map(), b = !0;
  function f(x) {
    k.effect.f & yr || (k.pending.delete(x), k.fallback = d, Zf(k, p, o, e, n), d !== null && (p.length === 0 ? d.f & Wr ? (d.f ^= Wr, Vi(d, null, o)) : Ml(d) : ha(d, () => {
      d = null;
    })));
  }
  function m(x) {
    k.pending.delete(x);
  }
  var v = Qo(() => {
    p = /** @type {V[]} */
    g(u);
    for (var x = p.length, A = /* @__PURE__ */ new Set(), y = (
      /** @type {Batch} */
      J
    ), w = Ed(), M = 0; M < x; M += 1) {
      var T = p[M], E = n(T, M), j = b ? null : s.get(E);
      j ? (j.v && oi(j.v, T), j.i && oi(j.i, M), w && y.unskip_effect(j.e)) : (j = Qf(
        s,
        b ? o : hc ?? (hc = en()),
        T,
        E,
        M,
        a,
        e,
        t
      ), b || (j.e.f |= Wr), s.set(E, j)), A.add(E);
    }
    if (x === 0 && i && !d && (b ? d = Ft(() => i(o)) : (d = Ft(() => i(hc ?? (hc = en()))), d.f |= Wr)), x > A.size && Eu(), !b)
      if (h.set(y, A), w) {
        for (const [K, X] of s)
          A.has(K) || y.skip_effect(X.e);
        y.oncommit(f), y.ondiscard(m);
      } else
        f(y);
    g(u);
  }), k = { effect: v, items: s, pending: h, outrogroups: null, fallback: d };
  b = !1;
}
function Ti(r) {
  for (; r !== null && !(r.f & Vr); )
    r = r.next;
  return r;
}
function Zf(r, e, t, n, a) {
  var j, K, X, Y, ie, me, ue, fe, Te;
  var i = (n & Lu) !== 0, o = e.length, s = r.items, l = Ti(r.effect.first), c, d = null, u, p = [], h = [], b, f, m, v;
  if (i)
    for (v = 0; v < o; v += 1)
      b = e[v], f = a(b, v), m = /** @type {EachItem} */
      s.get(f).e, m.f & Wr || ((K = (j = m.nodes) == null ? void 0 : j.a) == null || K.measure(), (u ?? (u = /* @__PURE__ */ new Set())).add(m));
  for (v = 0; v < o; v += 1) {
    if (b = e[v], f = a(b, v), m = /** @type {EachItem} */
    s.get(f).e, r.outrogroups !== null)
      for (const _e of r.outrogroups)
        _e.pending.delete(m), _e.done.delete(m);
    if (m.f & Wr)
      if (m.f ^= Wr, m === l)
        Vi(m, null, t);
      else {
        var k = d ? d.next : l;
        m === r.effect.last && (r.effect.last = m.prev), m.prev && (m.prev.next = m.next), m.next && (m.next.prev = m.prev), Cn(r, d, m), Cn(r, m, k), Vi(m, k, t), d = m, p = [], h = [], l = Ti(d.next);
        continue;
      }
    if (m.f & or && (Ml(m), i && ((Y = (X = m.nodes) == null ? void 0 : X.a) == null || Y.unfix(), (u ?? (u = /* @__PURE__ */ new Set())).delete(m))), m !== l) {
      if (c !== void 0 && c.has(m)) {
        if (p.length < h.length) {
          var x = h[0], A;
          d = x.prev;
          var y = p[0], w = p[p.length - 1];
          for (A = 0; A < p.length; A += 1)
            Vi(p[A], x, t);
          for (A = 0; A < h.length; A += 1)
            c.delete(h[A]);
          Cn(r, y.prev, w.next), Cn(r, d, y), Cn(r, w, x), l = x, d = w, v -= 1, p = [], h = [];
        } else
          c.delete(m), Vi(m, l, t), Cn(r, m.prev, m.next), Cn(r, m, d === null ? r.effect.first : d.next), Cn(r, d, m), d = m;
        continue;
      }
      for (p = [], h = []; l !== null && l !== m; )
        (c ?? (c = /* @__PURE__ */ new Set())).add(l), h.push(l), l = Ti(l.next);
      if (l === null)
        continue;
    }
    m.f & Wr || p.push(m), d = m, l = Ti(m.next);
  }
  if (r.outrogroups !== null) {
    for (const _e of r.outrogroups)
      _e.pending.size === 0 && (el(r, Xo(_e.done)), (ie = r.outrogroups) == null || ie.delete(_e));
    r.outrogroups.size === 0 && (r.outrogroups = null);
  }
  if (l !== null || c !== void 0) {
    var M = [];
    if (c !== void 0)
      for (m of c)
        m.f & or || M.push(m);
    for (; l !== null; )
      !(l.f & or) && l !== r.fallback && M.push(l), l = Ti(l.next);
    var T = M.length;
    if (T > 0) {
      var E = n & ad && o === 0 ? t : null;
      if (i) {
        for (v = 0; v < T; v += 1)
          (ue = (me = M[v].nodes) == null ? void 0 : me.a) == null || ue.measure();
        for (v = 0; v < T; v += 1)
          (Te = (fe = M[v].nodes) == null ? void 0 : fe.a) == null || Te.fix();
      }
      Kf(r, M, E);
    }
  }
  i && bn(() => {
    var _e, it;
    if (u !== void 0)
      for (m of u)
        (it = (_e = m.nodes) == null ? void 0 : _e.a) == null || it.apply();
  });
}
function Qf(r, e, t, n, a, i, o, s) {
  var l = o & Ru ? o & Yu ? Un(t) : /* @__PURE__ */ Ce(t, !1, !1) : null, c = o & Vu ? Un(a) : null;
  return {
    v: l,
    i: c,
    e: Ft(() => (i(e, l ?? t, c ?? a, s), () => {
      r.delete(n);
    }))
  };
}
function Vi(r, e, t) {
  if (r.nodes)
    for (var n = r.nodes.start, a = r.nodes.end, i = e && !(e.f & Wr) ? (
      /** @type {EffectNodes} */
      e.nodes.start
    ) : t; n !== null; ) {
      var o = (
        /** @type {TemplateNode} */
        /* @__PURE__ */ so(n)
      );
      if (i.before(n), n === a)
        return;
      n = o;
    }
}
function Cn(r, e, t) {
  e === null ? r.effect.first = t : e.next = t, t === null ? r.effect.last = e : t.prev = e;
}
function Ze(r, e, t, n, a) {
  var s;
  var i = (s = e.$$slots) == null ? void 0 : s[t], o = !1;
  i === !0 && (i = e.children, o = !0), i === void 0 || i(r, o ? () => n : n);
}
function Wf(r, e, t, n, a, i) {
  var o = null, s = (
    /** @type {TemplateNode} */
    r
  ), l = new Xd(s, !1);
  Qo(() => {
    const c = e() || null;
    var d = Xu;
    if (c === null) {
      l.ensure(null, null);
      return;
    }
    return l.ensure(c, (u) => {
      if (c) {
        if (o = _d(c, d), li(o, o), n) {
          var p = o.appendChild(en());
          n(o, p);
        }
        ne.nodes.end = o, u.before(o);
      }
    }), () => {
    };
  }, wa), Ko(() => {
  });
}
function Jf(r, e) {
  var t = void 0, n;
  Cd(() => {
    t !== (t = e()) && (n && (ut(n), n = null), t && (n = Ft(() => {
      Zo(() => (
        /** @type {(node: Element) => void} */
        t(r)
      ));
    })));
  });
}
function Hd(r) {
  var e, t, n = "";
  if (typeof r == "string" || typeof r == "number") n += r;
  else if (typeof r == "object") if (Array.isArray(r)) {
    var a = r.length;
    for (e = 0; e < a; e++) r[e] && (t = Hd(r[e])) && (n && (n += " "), n += t);
  } else for (t in r) r[t] && (n && (n += " "), n += t);
  return n;
}
function $f() {
  for (var r, e, t = 0, n = "", a = arguments.length; t < a; t++) (r = arguments[t]) && (e = Hd(r)) && (n && (n += " "), n += e);
  return n;
}
function eh(r) {
  return typeof r == "object" ? $f(r) : r ?? "";
}
const gc = [...` 	
\r\f \v\uFEFF`];
function th(r, e, t) {
  var n = r == null ? "" : "" + r;
  if (e && (n = n ? n + " " + e : e), t) {
    for (var a of Object.keys(t))
      if (t[a])
        n = n ? n + " " + a : a;
      else if (n.length)
        for (var i = a.length, o = 0; (o = n.indexOf(a, o)) >= 0; ) {
          var s = o + i;
          (o === 0 || gc.includes(n[o - 1])) && (s === n.length || gc.includes(n[s])) ? n = (o === 0 ? "" : n.substring(0, o)) + n.substring(s + 1) : o = s;
        }
  }
  return n === "" ? null : n;
}
function mc(r, e = !1) {
  var t = e ? " !important;" : ";", n = "";
  for (var a of Object.keys(r)) {
    var i = r[a];
    i != null && i !== "" && (n += " " + a + ": " + i + t);
  }
  return n;
}
function As(r) {
  return r[0] !== "-" || r[1] !== "-" ? r.toLowerCase() : r;
}
function rh(r, e) {
  if (e) {
    var t = "", n, a;
    if (Array.isArray(e) ? (n = e[0], a = e[1]) : n = e, r) {
      r = String(r).replaceAll(/\s*\/\*.*?\*\/\s*/g, "").trim();
      var i = !1, o = 0, s = !1, l = [];
      n && l.push(...Object.keys(n).map(As)), a && l.push(...Object.keys(a).map(As));
      var c = 0, d = -1;
      const f = r.length;
      for (var u = 0; u < f; u++) {
        var p = r[u];
        if (s ? p === "/" && r[u - 1] === "*" && (s = !1) : i ? i === p && (i = !1) : p === "/" && r[u + 1] === "*" ? s = !0 : p === '"' || p === "'" ? i = p : p === "(" ? o++ : p === ")" && o--, !s && i === !1 && o === 0) {
          if (p === ":" && d === -1)
            d = u;
          else if (p === ";" || u === f - 1) {
            if (d !== -1) {
              var h = As(r.substring(c, d).trim());
              if (!l.includes(h)) {
                p !== ";" && u++;
                var b = r.substring(c, u).trim();
                t += " " + b + ";";
              }
            }
            c = u + 1, d = -1;
          }
        }
      }
    }
    return n && (t += mc(n)), a && (t += mc(a, !0)), t = t.trim(), t === "" ? null : t;
  }
  return r == null ? null : String(r);
}
function Lt(r, e, t, n, a, i) {
  var o = r.__className;
  if (o !== t || o === void 0) {
    var s = th(t, n, i);
    s == null ? r.removeAttribute("class") : e ? r.className = s : r.setAttribute("class", s), r.__className = t;
  } else if (i && a !== i)
    for (var l in i) {
      var c = !!i[l];
      (a == null || c !== !!a[l]) && r.classList.toggle(l, c);
    }
  return i;
}
function Ss(r, e = {}, t, n) {
  for (var a in t) {
    var i = t[a];
    e[a] !== i && (t[a] == null ? r.style.removeProperty(a) : r.style.setProperty(a, i, n));
  }
}
function nh(r, e, t, n) {
  var a = r.__style;
  if (a !== e) {
    var i = rh(e, n);
    i == null ? r.removeAttribute("style") : r.style.cssText = i, r.__style = e;
  } else n && (Array.isArray(n) ? (Ss(r, t == null ? void 0 : t[0], n[0]), Ss(r, t == null ? void 0 : t[1], n[1], "important")) : Ss(r, t, n));
  return n;
}
function No(r, e, t = !1) {
  if (r.multiple) {
    if (e == null)
      return;
    if (!vl(e))
      return Ku();
    for (var n of r.options)
      n.selected = e.includes(Bi(n));
    return;
  }
  for (n of r.options) {
    var a = Bi(n);
    if (xf(a, e)) {
      n.selected = !0;
      return;
    }
  }
  (!t || e !== void 0) && (r.selectedIndex = -1);
}
function Kd(r) {
  var e = new MutationObserver(() => {
    No(r, r.__value);
  });
  e.observe(r, {
    // Listen to option element changes
    childList: !0,
    subtree: !0,
    // because of <optgroup>
    // Listen to option element value attribute changes
    // (doesn't get notified of select value changes,
    // because that property is not reflected as an attribute)
    attributes: !0,
    attributeFilter: ["value"]
  }), Ko(() => {
    e.disconnect();
  });
}
function bc(r, e, t = e) {
  var n = /* @__PURE__ */ new WeakSet(), a = !0;
  Id(r, "change", (i) => {
    var o = i ? "[selected]" : ":checked", s;
    if (r.multiple)
      s = [].map.call(r.querySelectorAll(o), Bi);
    else {
      var l = r.querySelector(o) ?? // will fall back to first non-disabled option if no option is selected
      r.querySelector("option:not([disabled])");
      s = l && Bi(l);
    }
    t(s), J !== null && n.add(J);
  }), Zo(() => {
    var i = e();
    if (r === document.activeElement) {
      var o = (
        /** @type {Batch} */
        J
      );
      if (n.has(o))
        return;
    }
    if (No(r, i, a), a && i === void 0) {
      var s = r.querySelector(":checked");
      s !== null && (i = Bi(s), t(i));
    }
    r.__value = i, a = !1;
  }), Kd(r);
}
function Bi(r) {
  return "__value" in r ? r.__value : r.value;
}
const Mi = Symbol("class"), Ci = Symbol("style"), Zd = Symbol("is custom element"), Qd = Symbol("is html"), ah = nd ? "option" : "OPTION", ih = nd ? "select" : "SELECT";
function oh(r, e) {
  e ? r.hasAttribute("selected") || r.setAttribute("selected", "") : r.removeAttribute("selected");
}
function $t(r, e, t, n) {
  var a = Wd(r);
  a[e] !== (a[e] = t) && (e === "loading" && (r[Au] = t), t == null ? r.removeAttribute(e) : typeof t != "string" && Jd(r).includes(e) ? r[e] = t : r.setAttribute(e, t));
}
function sh(r, e, t, n, a = !1, i = !1) {
  var o = Wd(r), s = o[Zd], l = !o[Qd], c = e || {}, d = r.nodeName === ah;
  for (var u in e)
    u in t || (t[u] = null);
  t.class ? t.class = eh(t.class) : t[Mi] && (t.class = null), t[Ci] && (t.style ?? (t.style = null));
  var p = Jd(r);
  for (const A in t) {
    let y = t[A];
    if (d && A === "value" && y == null) {
      r.value = r.__value = "", c[A] = y;
      continue;
    }
    if (A === "class") {
      var h = r.namespaceURI === "http://www.w3.org/1999/xhtml";
      Lt(r, h, y, n, e == null ? void 0 : e[Mi], t[Mi]), c[A] = y, c[Mi] = t[Mi];
      continue;
    }
    if (A === "style") {
      nh(r, y, e == null ? void 0 : e[Ci], t[Ci]), c[A] = y, c[Ci] = t[Ci];
      continue;
    }
    var b = c[A];
    if (!(y === b && !(y === void 0 && r.hasAttribute(A)))) {
      c[A] = y;
      var f = A[0] + A[1];
      if (f !== "$$")
        if (f === "on") {
          const w = {}, M = "$$" + A;
          let T = A.slice(2);
          var m = Nf(T);
          if (Pf(T) && (T = T.slice(0, -7), w.capture = !0), !m && b) {
            if (y != null) continue;
            r.removeEventListener(T, c[M], w), c[M] = null;
          }
          if (m)
            jf(T, r, y), Ff([T]);
          else if (y != null) {
            let E = function(j) {
              c[A].call(this, j);
            };
            var x = E;
            c[M] = Ud(T, r, E, w);
          }
        } else if (A === "style")
          $t(r, A, y);
        else if (A === "autofocus")
          kf(
            /** @type {HTMLElement} */
            r,
            !!y
          );
        else if (!s && (A === "__value" || A === "value" && y != null))
          r.value = r.__value = y;
        else if (A === "selected" && d)
          oh(
            /** @type {HTMLOptionElement} */
            r,
            y
          );
        else {
          var v = A;
          l || (v = Vf(v));
          var k = v === "defaultValue" || v === "defaultChecked";
          if (y == null && !s && !k)
            if (o[A] = null, v === "value" || v === "checked") {
              let w = (
                /** @type {HTMLInputElement} */
                r
              );
              const M = e === void 0;
              if (v === "value") {
                let T = w.defaultValue;
                w.removeAttribute(v), w.defaultValue = T, w.value = w.__value = M ? T : null;
              } else {
                let T = w.defaultChecked;
                w.removeAttribute(v), w.defaultChecked = T, w.checked = M ? T : !1;
              }
            } else
              r.removeAttribute(A);
          else k || p.includes(v) && (s || typeof y != "string") ? (r[v] = y, v in o && (o[v] = rt)) : typeof y != "function" && $t(r, v, y);
        }
    }
  }
  return c;
}
function vc(r, e, t = [], n = [], a = [], i, o = !1, s = !1) {
  bd(a, t, n, (l) => {
    var c = void 0, d = {}, u = r.nodeName === ih, p = !1;
    if (Cd(() => {
      var b = e(...l.map(g)), f = sh(
        r,
        c,
        b,
        i,
        o,
        s
      );
      p && u && "value" in b && No(
        /** @type {HTMLSelectElement} */
        r,
        b.value
      );
      for (let v of Object.getOwnPropertySymbols(d))
        b[v] || ut(d[v]);
      for (let v of Object.getOwnPropertySymbols(b)) {
        var m = b[v];
        v.description === Hu && (!c || m !== c[v]) && (d[v] && ut(d[v]), d[v] = Ft(() => Jf(r, () => m))), f[v] = m;
      }
      c = f;
    }), u) {
      var h = (
        /** @type {HTMLSelectElement} */
        r
      );
      Zo(() => {
        No(
          h,
          /** @type {Record<string | symbol, any>} */
          c.value,
          !0
        ), Kd(h);
      });
    }
    p = !0;
  });
}
function Wd(r) {
  return (
    /** @type {Record<string | symbol, unknown>} **/
    // @ts-expect-error
    r.__attributes ?? (r.__attributes = {
      [Zd]: r.nodeName.includes("-"),
      [Qd]: r.namespaceURI === od
    })
  );
}
var xc = /* @__PURE__ */ new Map();
function Jd(r) {
  var e = r.getAttribute("is") || r.nodeName, t = xc.get(e);
  if (t) return t;
  xc.set(e, t = []);
  for (var n, a = r, i = Element.prototype; i !== a; ) {
    n = $c(a);
    for (var o in n)
      n[o].set && t.push(o);
    a = xl(a);
  }
  return t;
}
function lh(r, e, t = e) {
  var n = /* @__PURE__ */ new WeakSet();
  Id(r, "input", async (a) => {
    var i = a ? r.defaultValue : r.value;
    if (i = zs(r) ? Es(i) : i, t(i), J !== null && n.add(J), await Ri(), i !== (i = e())) {
      var o = r.selectionStart, s = r.selectionEnd, l = r.value.length;
      if (r.value = i ?? "", s !== null) {
        var c = r.value.length;
        o === s && s === l && c > l ? (r.selectionStart = c, r.selectionEnd = c) : (r.selectionStart = o, r.selectionEnd = Math.min(s, c));
      }
    }
  }), // If we are hydrating and the value has since changed,
  // then use the updated value from the input instead.
  // If defaultValue is set, then value == defaultValue
  // TODO Svelte 6: remove input.value check and set to empty string?
  V(e) == null && r.value && (t(zs(r) ? Es(r.value) : r.value), J !== null && n.add(J)), lo(() => {
    var a = e();
    if (r === document.activeElement) {
      var i = (
        /** @type {Batch} */
        J
      );
      if (n.has(i))
        return;
    }
    zs(r) && a === Es(r.value) || r.type === "date" && !a && !r.value || a !== r.value && (r.value = a ?? "");
  });
}
function zs(r) {
  var e = r.type;
  return e === "number" || e === "range";
}
function Es(r) {
  return r === "" ? null : +r;
}
function yc(r, e) {
  return r === e || (r == null ? void 0 : r[$r]) === e;
}
function ch(r = {}, e, t, n) {
  var a = (
    /** @type {ComponentContext} */
    Pe.r
  ), i = (
    /** @type {Effect} */
    ne
  );
  return Zo(() => {
    var o, s;
    return lo(() => {
      o = s, s = [], V(() => {
        r !== t(...s) && (e(r, ...s), o && yc(t(...o), r) && e(null, ...o));
      });
    }), () => {
      let l = i;
      for (; l !== a && l.parent !== null && l.parent.f & js; )
        l = l.parent;
      const c = () => {
        s && yc(t(...s), r) && e(null, ...s);
      }, d = l.teardown;
      l.teardown = () => {
        c(), d == null || d();
      };
    };
  }), r;
}
function dh(r) {
  return function(...e) {
    var t = (
      /** @type {Event} */
      e[0]
    );
    return t.preventDefault(), r == null ? void 0 : r.apply(this, e);
  };
}
function $d(r = !1) {
  const e = (
    /** @type {ComponentContextLegacy} */
    Pe
  ), t = e.l.u;
  if (!t) return;
  let n = () => Nr(e.s);
  if (r) {
    let a = 0, i = (
      /** @type {Record<string, any>} */
      {}
    );
    const o = /* @__PURE__ */ oo(() => {
      let s = !1;
      const l = e.s;
      for (const c in l)
        l[c] !== i[c] && (i[c] = l[c], s = !0);
      return s && a++, a;
    });
    n = () => g(o);
  }
  t.b.length && zf(() => {
    wc(e, n), Ls(t.b);
  }), Qs(() => {
    const a = V(() => t.m.map(yu));
    return () => {
      for (const i of a)
        typeof i == "function" && i();
    };
  }), t.a.length && Qs(() => {
    wc(e, n), Ls(t.a);
  });
}
function wc(r, e) {
  if (r.l.s)
    for (const t of r.l.s) g(t);
  e();
}
const ph = {
  get(r, e) {
    if (!r.exclude.includes(e))
      return g(r.version), e in r.special ? r.special[e]() : r.props[e];
  },
  set(r, e, t) {
    if (!(e in r.special)) {
      var n = ne;
      try {
        Xt(r.parent_effect), r.special[e] = mr(
          {
            get [e]() {
              return r.props[e];
            }
          },
          /** @type {string} */
          e,
          id
        );
      } finally {
        Xt(n);
      }
    }
    return r.special[e](t), sc(r.version), !0;
  },
  getOwnPropertyDescriptor(r, e) {
    if (!r.exclude.includes(e) && e in r.props)
      return {
        enumerable: !0,
        configurable: !0,
        value: r.props[e]
      };
  },
  deleteProperty(r, e) {
    return r.exclude.includes(e) || (r.exclude.push(e), sc(r.version)), !0;
  },
  has(r, e) {
    return r.exclude.includes(e) ? !1 : e in r.props;
  },
  ownKeys(r) {
    return Reflect.ownKeys(r.props).filter((e) => !r.exclude.includes(e));
  }
};
function Ge(r, e) {
  return new Proxy(
    {
      props: r,
      exclude: e,
      special: {},
      version: Un(0),
      // TODO this is only necessary because we need to track component
      // destruction inside `prop`, because of `bind:this`, but it
      // seems likely that we can simplify `bind:this` instead
      parent_effect: (
        /** @type {Effect} */
        ne
      )
    },
    ph
  );
}
const uh = {
  get(r, e) {
    let t = r.props.length;
    for (; t--; ) {
      let n = r.props[t];
      if (_i(n) && (n = n()), typeof n == "object" && n !== null && e in n) return n[e];
    }
  },
  set(r, e, t) {
    let n = r.props.length;
    for (; n--; ) {
      let a = r.props[n];
      _i(a) && (a = a());
      const i = Yn(a, e);
      if (i && i.set)
        return i.set(t), !0;
    }
    return !1;
  },
  getOwnPropertyDescriptor(r, e) {
    let t = r.props.length;
    for (; t--; ) {
      let n = r.props[t];
      if (_i(n) && (n = n()), typeof n == "object" && n !== null && e in n) {
        const a = Yn(n, e);
        return a && !a.configurable && (a.configurable = !0), a;
      }
    }
  },
  has(r, e) {
    if (e === $r || e === rd) return !1;
    for (let t of r.props)
      if (_i(t) && (t = t()), t != null && e in t) return !0;
    return !1;
  },
  ownKeys(r) {
    const e = [];
    for (let t of r.props)
      if (_i(t) && (t = t()), !!t) {
        for (const n in t)
          e.includes(n) || e.push(n);
        for (const n of Object.getOwnPropertySymbols(t))
          e.includes(n) || e.push(n);
      }
    return e;
  }
};
function Je(...r) {
  return new Proxy({ props: r }, uh);
}
function mr(r, e, t, n) {
  var x;
  var a = !mi || (t & Fu) !== 0, i = (t & Bu) !== 0, o = (t & Du) !== 0, s = (
    /** @type {V} */
    n
  ), l = !0, c = () => (l && (l = !1, s = o ? V(
    /** @type {() => V} */
    n
  ) : (
    /** @type {V} */
    n
  )), s);
  let d;
  if (i) {
    var u = $r in r || rd in r;
    d = ((x = Yn(r, e)) == null ? void 0 : x.set) ?? (u && e in r ? (A) => r[e] = A : void 0);
  }
  var p, h = !1;
  i ? [p, h] = ef(() => (
    /** @type {V} */
    r[e]
  )) : p = /** @type {V} */
  r[e], p === void 0 && n !== void 0 && (p = c(), d && (a && Cu(), d(p)));
  var b;
  if (a ? b = () => {
    var A = (
      /** @type {V} */
      r[e]
    );
    return A === void 0 ? c() : (l = !0, A);
  } : b = () => {
    var A = (
      /** @type {V} */
      r[e]
    );
    return A !== void 0 && (s = /** @type {V} */
    void 0), A === void 0 ? s : A;
  }, a && !(t & id))
    return b;
  if (d) {
    var f = r.$$legacy;
    return (
      /** @type {() => V} */
      function(A, y) {
        return arguments.length > 0 ? ((!a || !y || f || h) && d(y ? b() : A), A) : b();
      }
    );
  }
  var m = !1, v = (t & ju ? oo : El)(() => (m = !1, b()));
  i && g(v);
  var k = (
    /** @type {Effect} */
    ne
  );
  return (
    /** @type {() => V} */
    function(A, y) {
      if (arguments.length > 0) {
        const w = y ? g(v) : a && i ? Fa(A) : A;
        return R(v, w), m = !0, s !== void 0 && (s = w), A;
      }
      return Gn && m || k.f & yr ? v.v : g(v);
    }
  );
}
function fh(r) {
  Pe === null && Su(), mi && Pe.l !== null ? hh(Pe).m.push(r) : Qs(() => {
    const e = V(r);
    if (typeof e == "function") return (
      /** @type {() => void} */
      e
    );
  });
}
function hh(r) {
  var e = (
    /** @type {ComponentContextLegacy} */
    r.l
  );
  return e.u ?? (e.u = { a: [], b: [], m: [] });
}
const gh = "5";
var Jc;
typeof window < "u" && ((Jc = window.__svelte ?? (window.__svelte = {})).v ?? (Jc.v = /* @__PURE__ */ new Set())).add(gh);
Wu();
function un(r) {
  if (r === void 0)
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return r;
}
function ep(r, e) {
  r.prototype = Object.create(e.prototype), r.prototype.constructor = r, r.__proto__ = e;
}
/*!
 * GSAP 3.14.2
 * https://gsap.com
 *
 * @license Copyright 2008-2025, GreenSock. All rights reserved.
 * Subject to the terms at https://gsap.com/standard-license
 * @author: Jack Doyle, jack@greensock.com
*/
var sr = {
  autoSleep: 120,
  force3D: "auto",
  nullTargetWarn: 1,
  units: {
    lineHeight: ""
  }
}, ci = {
  duration: 0.5,
  overwrite: !1,
  delay: 0
}, Ol, ft, Oe, br = 1e8, ze = 1 / br, tl = Math.PI * 2, mh = tl / 4, bh = 0, tp = Math.sqrt, vh = Math.cos, xh = Math.sin, at = function(e) {
  return typeof e == "string";
}, Fe = function(e) {
  return typeof e == "function";
}, vn = function(e) {
  return typeof e == "number";
}, Pl = function(e) {
  return typeof e > "u";
}, tn = function(e) {
  return typeof e == "object";
}, Bt = function(e) {
  return e !== !1;
}, ql = function() {
  return typeof window < "u";
}, So = function(e) {
  return Fe(e) || at(e);
}, rp = typeof ArrayBuffer == "function" && ArrayBuffer.isView || function() {
}, wt = Array.isArray, yh = /random\([^)]+\)/g, wh = /,\s*/g, kc = /(?:-?\.?\d|\.)+/gi, np = /[-+=.]*\d+[.e\-+]*\d*[e\-+]*\d*/g, Ba = /[-+=.]*\d+[.e-]*\d*[a-z%]*/g, _s = /[-+=.]*\d+\.?\d*(?:e-|e\+)?\d*/gi, ap = /[+-]=-?[.\d]+/, kh = /[^,'"\[\]\s]+/gi, Ah = /^[+\-=e\s\d]*\d+[.\d]*([a-z]*|%)\s*$/i, Ne, Gr, rl, Nl, lr = {}, Ro = {}, ip, op = function(e) {
  return (Ro = di(e, lr)) && Ht;
}, Rl = function(e, t) {
  return console.warn("Invalid property", e, "set to", t, "Missing plugin? gsap.registerPlugin()");
}, Ki = function(e, t) {
  return !t && console.warn(e);
}, sp = function(e, t) {
  return e && (lr[e] = t) && Ro && (Ro[e] = t) || lr;
}, Zi = function() {
  return 0;
}, Sh = {
  suppressEvents: !0,
  isStart: !0,
  kill: !1
}, Mo = {
  suppressEvents: !0,
  kill: !1
}, zh = {
  suppressEvents: !0
}, Vl = {}, Bn = [], nl = {}, lp, rr = {}, Is = {}, Ac = 30, Co = [], Ll = "", Yl = function(e) {
  var t = e[0], n, a;
  if (tn(t) || Fe(t) || (e = [e]), !(n = (t._gsap || {}).harness)) {
    for (a = Co.length; a-- && !Co[a].targetTest(t); )
      ;
    n = Co[a];
  }
  for (a = e.length; a--; )
    e[a] && (e[a]._gsap || (e[a]._gsap = new Op(e[a], n))) || e.splice(a, 1);
  return e;
}, ma = function(e) {
  return e._gsap || Yl(vr(e))[0]._gsap;
}, cp = function(e, t, n) {
  return (n = e[t]) && Fe(n) ? e[t]() : Pl(n) && e.getAttribute && e.getAttribute(t) || n;
}, Dt = function(e, t) {
  return (e = e.split(",")).forEach(t) || e;
}, Ue = function(e) {
  return Math.round(e * 1e5) / 1e5 || 0;
}, qe = function(e) {
  return Math.round(e * 1e7) / 1e7 || 0;
}, Ga = function(e, t) {
  var n = t.charAt(0), a = parseFloat(t.substr(2));
  return e = parseFloat(e), n === "+" ? e + a : n === "-" ? e - a : n === "*" ? e * a : e / a;
}, Eh = function(e, t) {
  for (var n = t.length, a = 0; e.indexOf(t[a]) < 0 && ++a < n; )
    ;
  return a < n;
}, Vo = function() {
  var e = Bn.length, t = Bn.slice(0), n, a;
  for (nl = {}, Bn.length = 0, n = 0; n < e; n++)
    a = t[n], a && a._lazy && (a.render(a._lazy[0], a._lazy[1], !0)._lazy = 0);
}, jl = function(e) {
  return !!(e._initted || e._startAt || e.add);
}, dp = function(e, t, n, a) {
  Bn.length && !ft && Vo(), e.render(t, n, !!(ft && t < 0 && jl(e))), Bn.length && !ft && Vo();
}, pp = function(e) {
  var t = parseFloat(e);
  return (t || t === 0) && (e + "").match(kh).length < 2 ? t : at(e) ? e.trim() : e;
}, up = function(e) {
  return e;
}, cr = function(e, t) {
  for (var n in t)
    n in e || (e[n] = t[n]);
  return e;
}, _h = function(e) {
  return function(t, n) {
    for (var a in n)
      a in t || a === "duration" && e || a === "ease" || (t[a] = n[a]);
  };
}, di = function(e, t) {
  for (var n in t)
    e[n] = t[n];
  return e;
}, Sc = function r(e, t) {
  for (var n in t)
    n !== "__proto__" && n !== "constructor" && n !== "prototype" && (e[n] = tn(t[n]) ? r(e[n] || (e[n] = {}), t[n]) : t[n]);
  return e;
}, Lo = function(e, t) {
  var n = {}, a;
  for (a in e)
    a in t || (n[a] = e[a]);
  return n;
}, Di = function(e) {
  var t = e.parent || Ne, n = e.keyframes ? _h(wt(e.keyframes)) : cr;
  if (Bt(e.inherit))
    for (; t; )
      n(e, t.vars.defaults), t = t.parent || t._dp;
  return e;
}, Ih = function(e, t) {
  for (var n = e.length, a = n === t.length; a && n-- && e[n] === t[n]; )
    ;
  return n < 0;
}, fp = function(e, t, n, a, i) {
  var o = e[a], s;
  if (i)
    for (s = t[i]; o && o[i] > s; )
      o = o._prev;
  return o ? (t._next = o._next, o._next = t) : (t._next = e[n], e[n] = t), t._next ? t._next._prev = t : e[a] = t, t._prev = o, t.parent = t._dp = e, t;
}, Wo = function(e, t, n, a) {
  n === void 0 && (n = "_first"), a === void 0 && (a = "_last");
  var i = t._prev, o = t._next;
  i ? i._next = o : e[n] === t && (e[n] = o), o ? o._prev = i : e[a] === t && (e[a] = i), t._next = t._prev = t.parent = null;
}, Xn = function(e, t) {
  e.parent && (!t || e.parent.autoRemoveChildren) && e.parent.remove && e.parent.remove(e), e._act = 0;
}, ba = function(e, t) {
  if (e && (!t || t._end > e._dur || t._start < 0))
    for (var n = e; n; )
      n._dirty = 1, n = n.parent;
  return e;
}, Th = function(e) {
  for (var t = e.parent; t && t.parent; )
    t._dirty = 1, t.totalDuration(), t = t.parent;
  return e;
}, al = function(e, t, n, a) {
  return e._startAt && (ft ? e._startAt.revert(Mo) : e.vars.immediateRender && !e.vars.autoRevert || e._startAt.render(t, !0, a));
}, Mh = function r(e) {
  return !e || e._ts && r(e.parent);
}, zc = function(e) {
  return e._repeat ? pi(e._tTime, e = e.duration() + e._rDelay) * e : 0;
}, pi = function(e, t) {
  var n = Math.floor(e = qe(e / t));
  return e && n === e ? n - 1 : n;
}, Yo = function(e, t) {
  return (e - t._start) * t._ts + (t._ts >= 0 ? 0 : t._dirty ? t.totalDuration() : t._tDur);
}, Jo = function(e) {
  return e._end = qe(e._start + (e._tDur / Math.abs(e._ts || e._rts || ze) || 0));
}, $o = function(e, t) {
  var n = e._dp;
  return n && n.smoothChildTiming && e._ts && (e._start = qe(n._time - (e._ts > 0 ? t / e._ts : ((e._dirty ? e.totalDuration() : e._tDur) - t) / -e._ts)), Jo(e), n._dirty || ba(n, e)), e;
}, hp = function(e, t) {
  var n;
  if ((t._time || !t._dur && t._initted || t._start < e._time && (t._dur || !t.add)) && (n = Yo(e.rawTime(), t), (!t._dur || co(0, t.totalDuration(), n) - t._tTime > ze) && t.render(n, !0)), ba(e, t)._dp && e._initted && e._time >= e._dur && e._ts) {
    if (e._dur < e.duration())
      for (n = e; n._dp; )
        n.rawTime() >= 0 && n.totalTime(n._tTime), n = n._dp;
    e._zTime = -ze;
  }
}, Qr = function(e, t, n, a) {
  return t.parent && Xn(t), t._start = qe((vn(n) ? n : n || e !== Ne ? ur(e, n, t) : e._time) + t._delay), t._end = qe(t._start + (t.totalDuration() / Math.abs(t.timeScale()) || 0)), fp(e, t, "_first", "_last", e._sort ? "_start" : 0), il(t) || (e._recent = t), a || hp(e, t), e._ts < 0 && $o(e, e._tTime), e;
}, gp = function(e, t) {
  return (lr.ScrollTrigger || Rl("scrollTrigger", t)) && lr.ScrollTrigger.create(t, e);
}, mp = function(e, t, n, a, i) {
  if (Bl(e, t, i), !e._initted)
    return 1;
  if (!n && e._pt && !ft && (e._dur && e.vars.lazy !== !1 || !e._dur && e.vars.lazy) && lp !== nr.frame)
    return Bn.push(e), e._lazy = [i, a], 1;
}, Ch = function r(e) {
  var t = e.parent;
  return t && t._ts && t._initted && !t._lock && (t.rawTime() < 0 || r(t));
}, il = function(e) {
  var t = e.data;
  return t === "isFromStart" || t === "isStart";
}, Oh = function(e, t, n, a) {
  var i = e.ratio, o = t < 0 || !t && (!e._start && Ch(e) && !(!e._initted && il(e)) || (e._ts < 0 || e._dp._ts < 0) && !il(e)) ? 0 : 1, s = e._rDelay, l = 0, c, d, u;
  if (s && e._repeat && (l = co(0, e._tDur, t), d = pi(l, s), e._yoyo && d & 1 && (o = 1 - o), d !== pi(e._tTime, s) && (i = 1 - o, e.vars.repeatRefresh && e._initted && e.invalidate())), o !== i || ft || a || e._zTime === ze || !t && e._zTime) {
    if (!e._initted && mp(e, t, a, n, l))
      return;
    for (u = e._zTime, e._zTime = t || (n ? ze : 0), n || (n = t && !u), e.ratio = o, e._from && (o = 1 - o), e._time = 0, e._tTime = l, c = e._pt; c; )
      c.r(o, c.d), c = c._next;
    t < 0 && al(e, t, n, !0), e._onUpdate && !n && ar(e, "onUpdate"), l && e._repeat && !n && e.parent && ar(e, "onRepeat"), (t >= e._tDur || t < 0) && e.ratio === o && (o && Xn(e, 1), !n && !ft && (ar(e, o ? "onComplete" : "onReverseComplete", !0), e._prom && e._prom()));
  } else e._zTime || (e._zTime = t);
}, Ph = function(e, t, n) {
  var a;
  if (n > t)
    for (a = e._first; a && a._start <= n; ) {
      if (a.data === "isPause" && a._start > t)
        return a;
      a = a._next;
    }
  else
    for (a = e._last; a && a._start >= n; ) {
      if (a.data === "isPause" && a._start < t)
        return a;
      a = a._prev;
    }
}, ui = function(e, t, n, a) {
  var i = e._repeat, o = qe(t) || 0, s = e._tTime / e._tDur;
  return s && !a && (e._time *= o / e._dur), e._dur = o, e._tDur = i ? i < 0 ? 1e10 : qe(o * (i + 1) + e._rDelay * i) : o, s > 0 && !a && $o(e, e._tTime = e._tDur * s), e.parent && Jo(e), n || ba(e.parent, e), e;
}, Ec = function(e) {
  return e instanceof Mt ? ba(e) : ui(e, e._dur);
}, qh = {
  _start: 0,
  endTime: Zi,
  totalDuration: Zi
}, ur = function r(e, t, n) {
  var a = e.labels, i = e._recent || qh, o = e.duration() >= br ? i.endTime(!1) : e._dur, s, l, c;
  return at(t) && (isNaN(t) || t in a) ? (l = t.charAt(0), c = t.substr(-1) === "%", s = t.indexOf("="), l === "<" || l === ">" ? (s >= 0 && (t = t.replace(/=/, "")), (l === "<" ? i._start : i.endTime(i._repeat >= 0)) + (parseFloat(t.substr(1)) || 0) * (c ? (s < 0 ? i : n).totalDuration() / 100 : 1)) : s < 0 ? (t in a || (a[t] = o), a[t]) : (l = parseFloat(t.charAt(s - 1) + t.substr(s + 1)), c && n && (l = l / 100 * (wt(n) ? n[0] : n).totalDuration()), s > 1 ? r(e, t.substr(0, s - 1), n) + l : o + l)) : t == null ? o : +t;
}, Ui = function(e, t, n) {
  var a = vn(t[1]), i = (a ? 2 : 1) + (e < 2 ? 0 : 1), o = t[i], s, l;
  if (a && (o.duration = t[1]), o.parent = n, e) {
    for (s = o, l = n; l && !("immediateRender" in s); )
      s = l.vars.defaults || {}, l = Bt(l.vars.inherit) && l.parent;
    o.immediateRender = Bt(s.immediateRender), e < 2 ? o.runBackwards = 1 : o.startAt = t[i - 1];
  }
  return new Ke(t[0], o, t[i + 1]);
}, Qn = function(e, t) {
  return e || e === 0 ? t(e) : t;
}, co = function(e, t, n) {
  return n < e ? e : n > t ? t : n;
}, yt = function(e, t) {
  return !at(e) || !(t = Ah.exec(e)) ? "" : t[1];
}, Nh = function(e, t, n) {
  return Qn(n, function(a) {
    return co(e, t, a);
  });
}, ol = [].slice, bp = function(e, t) {
  return e && tn(e) && "length" in e && (!t && !e.length || e.length - 1 in e && tn(e[0])) && !e.nodeType && e !== Gr;
}, Rh = function(e, t, n) {
  return n === void 0 && (n = []), e.forEach(function(a) {
    var i;
    return at(a) && !t || bp(a, 1) ? (i = n).push.apply(i, vr(a)) : n.push(a);
  }) || n;
}, vr = function(e, t, n) {
  return Oe && !t && Oe.selector ? Oe.selector(e) : at(e) && !n && (rl || !fi()) ? ol.call((t || Nl).querySelectorAll(e), 0) : wt(e) ? Rh(e, n) : bp(e) ? ol.call(e, 0) : e ? [e] : [];
}, sl = function(e) {
  return e = vr(e)[0] || Ki("Invalid scope") || {}, function(t) {
    var n = e.current || e.nativeElement || e;
    return vr(t, n.querySelectorAll ? n : n === e ? Ki("Invalid scope") || Nl.createElement("div") : e);
  };
}, vp = function(e) {
  return e.sort(function() {
    return 0.5 - Math.random();
  });
}, xp = function(e) {
  if (Fe(e))
    return e;
  var t = tn(e) ? e : {
    each: e
  }, n = va(t.ease), a = t.from || 0, i = parseFloat(t.base) || 0, o = {}, s = a > 0 && a < 1, l = isNaN(a) || s, c = t.axis, d = a, u = a;
  return at(a) ? d = u = {
    center: 0.5,
    edges: 0.5,
    end: 1
  }[a] || 0 : !s && l && (d = a[0], u = a[1]), function(p, h, b) {
    var f = (b || t).length, m = o[f], v, k, x, A, y, w, M, T, E;
    if (!m) {
      if (E = t.grid === "auto" ? 0 : (t.grid || [1, br])[1], !E) {
        for (M = -br; M < (M = b[E++].getBoundingClientRect().left) && E < f; )
          ;
        E < f && E--;
      }
      for (m = o[f] = [], v = l ? Math.min(E, f) * d - 0.5 : a % E, k = E === br ? 0 : l ? f * u / E - 0.5 : a / E | 0, M = 0, T = br, w = 0; w < f; w++)
        x = w % E - v, A = k - (w / E | 0), m[w] = y = c ? Math.abs(c === "y" ? A : x) : tp(x * x + A * A), y > M && (M = y), y < T && (T = y);
      a === "random" && vp(m), m.max = M - T, m.min = T, m.v = f = (parseFloat(t.amount) || parseFloat(t.each) * (E > f ? f - 1 : c ? c === "y" ? f / E : E : Math.max(E, f / E)) || 0) * (a === "edges" ? -1 : 1), m.b = f < 0 ? i - f : i, m.u = yt(t.amount || t.each) || 0, n = n && f < 0 ? Tp(n) : n;
    }
    return f = (m[p] - m.min) / m.max || 0, qe(m.b + (n ? n(f) : f) * m.v) + m.u;
  };
}, ll = function(e) {
  var t = Math.pow(10, ((e + "").split(".")[1] || "").length);
  return function(n) {
    var a = qe(Math.round(parseFloat(n) / e) * e * t);
    return (a - a % 1) / t + (vn(n) ? 0 : yt(n));
  };
}, yp = function(e, t) {
  var n = wt(e), a, i;
  return !n && tn(e) && (a = n = e.radius || br, e.values ? (e = vr(e.values), (i = !vn(e[0])) && (a *= a)) : e = ll(e.increment)), Qn(t, n ? Fe(e) ? function(o) {
    return i = e(o), Math.abs(i - o) <= a ? i : o;
  } : function(o) {
    for (var s = parseFloat(i ? o.x : o), l = parseFloat(i ? o.y : 0), c = br, d = 0, u = e.length, p, h; u--; )
      i ? (p = e[u].x - s, h = e[u].y - l, p = p * p + h * h) : p = Math.abs(e[u] - s), p < c && (c = p, d = u);
    return d = !a || c <= a ? e[d] : o, i || d === o || vn(o) ? d : d + yt(o);
  } : ll(e));
}, wp = function(e, t, n, a) {
  return Qn(wt(e) ? !t : n === !0 ? !!(n = 0) : !a, function() {
    return wt(e) ? e[~~(Math.random() * e.length)] : (n = n || 1e-5) && (a = n < 1 ? Math.pow(10, (n + "").length - 2) : 1) && Math.floor(Math.round((e - n / 2 + Math.random() * (t - e + n * 0.99)) / n) * n * a) / a;
  });
}, Vh = function() {
  for (var e = arguments.length, t = new Array(e), n = 0; n < e; n++)
    t[n] = arguments[n];
  return function(a) {
    return t.reduce(function(i, o) {
      return o(i);
    }, a);
  };
}, Lh = function(e, t) {
  return function(n) {
    return e(parseFloat(n)) + (t || yt(n));
  };
}, Yh = function(e, t, n) {
  return Ap(e, t, 0, 1, n);
}, kp = function(e, t, n) {
  return Qn(n, function(a) {
    return e[~~t(a)];
  });
}, jh = function r(e, t, n) {
  var a = t - e;
  return wt(e) ? kp(e, r(0, e.length), t) : Qn(n, function(i) {
    return (a + (i - e) % a) % a + e;
  });
}, Fh = function r(e, t, n) {
  var a = t - e, i = a * 2;
  return wt(e) ? kp(e, r(0, e.length - 1), t) : Qn(n, function(o) {
    return o = (i + (o - e) % i) % i || 0, e + (o > a ? i - o : o);
  });
}, Qi = function(e) {
  return e.replace(yh, function(t) {
    var n = t.indexOf("[") + 1, a = t.substring(n || 7, n ? t.indexOf("]") : t.length - 1).split(wh);
    return wp(n ? a : +a[0], n ? 0 : +a[1], +a[2] || 1e-5);
  });
}, Ap = function(e, t, n, a, i) {
  var o = t - e, s = a - n;
  return Qn(i, function(l) {
    return n + ((l - e) / o * s || 0);
  });
}, Bh = function r(e, t, n, a) {
  var i = isNaN(e + t) ? 0 : function(h) {
    return (1 - h) * e + h * t;
  };
  if (!i) {
    var o = at(e), s = {}, l, c, d, u, p;
    if (n === !0 && (a = 1) && (n = null), o)
      e = {
        p: e
      }, t = {
        p: t
      };
    else if (wt(e) && !wt(t)) {
      for (d = [], u = e.length, p = u - 2, c = 1; c < u; c++)
        d.push(r(e[c - 1], e[c]));
      u--, i = function(b) {
        b *= u;
        var f = Math.min(p, ~~b);
        return d[f](b - f);
      }, n = t;
    } else a || (e = di(wt(e) ? [] : {}, e));
    if (!d) {
      for (l in t)
        Fl.call(s, e, l, "get", t[l]);
      i = function(b) {
        return Gl(b, s) || (o ? e.p : e);
      };
    }
  }
  return Qn(n, i);
}, _c = function(e, t, n) {
  var a = e.labels, i = br, o, s, l;
  for (o in a)
    s = a[o] - t, s < 0 == !!n && s && i > (s = Math.abs(s)) && (l = o, i = s);
  return l;
}, ar = function(e, t, n) {
  var a = e.vars, i = a[t], o = Oe, s = e._ctx, l, c, d;
  if (i)
    return l = a[t + "Params"], c = a.callbackScope || e, n && Bn.length && Vo(), s && (Oe = s), d = l ? i.apply(c, l) : i.call(c), Oe = o, d;
}, Li = function(e) {
  return Xn(e), e.scrollTrigger && e.scrollTrigger.kill(!!ft), e.progress() < 1 && ar(e, "onInterrupt"), e;
}, Da, Sp = [], zp = function(e) {
  if (e)
    if (e = !e.name && e.default || e, ql() || e.headless) {
      var t = e.name, n = Fe(e), a = t && !n && e.init ? function() {
        this._props = [];
      } : e, i = {
        init: Zi,
        render: Gl,
        add: Fl,
        kill: ag,
        modifier: ng,
        rawVars: 0
      }, o = {
        targetTest: 0,
        get: 0,
        getSetter: Ul,
        aliases: {},
        register: 0
      };
      if (fi(), e !== a) {
        if (rr[t])
          return;
        cr(a, cr(Lo(e, i), o)), di(a.prototype, di(i, Lo(e, o))), rr[a.prop = t] = a, e.targetTest && (Co.push(a), Vl[t] = 1), t = (t === "css" ? "CSS" : t.charAt(0).toUpperCase() + t.substr(1)) + "Plugin";
      }
      sp(t, a), e.register && e.register(Ht, a, Ut);
    } else
      Sp.push(e);
}, Se = 255, Yi = {
  aqua: [0, Se, Se],
  lime: [0, Se, 0],
  silver: [192, 192, 192],
  black: [0, 0, 0],
  maroon: [128, 0, 0],
  teal: [0, 128, 128],
  blue: [0, 0, Se],
  navy: [0, 0, 128],
  white: [Se, Se, Se],
  olive: [128, 128, 0],
  yellow: [Se, Se, 0],
  orange: [Se, 165, 0],
  gray: [128, 128, 128],
  purple: [128, 0, 128],
  green: [0, 128, 0],
  red: [Se, 0, 0],
  pink: [Se, 192, 203],
  cyan: [0, Se, Se],
  transparent: [Se, Se, Se, 0]
}, Ts = function(e, t, n) {
  return e += e < 0 ? 1 : e > 1 ? -1 : 0, (e * 6 < 1 ? t + (n - t) * e * 6 : e < 0.5 ? n : e * 3 < 2 ? t + (n - t) * (2 / 3 - e) * 6 : t) * Se + 0.5 | 0;
}, Ep = function(e, t, n) {
  var a = e ? vn(e) ? [e >> 16, e >> 8 & Se, e & Se] : 0 : Yi.black, i, o, s, l, c, d, u, p, h, b;
  if (!a) {
    if (e.substr(-1) === "," && (e = e.substr(0, e.length - 1)), Yi[e])
      a = Yi[e];
    else if (e.charAt(0) === "#") {
      if (e.length < 6 && (i = e.charAt(1), o = e.charAt(2), s = e.charAt(3), e = "#" + i + i + o + o + s + s + (e.length === 5 ? e.charAt(4) + e.charAt(4) : "")), e.length === 9)
        return a = parseInt(e.substr(1, 6), 16), [a >> 16, a >> 8 & Se, a & Se, parseInt(e.substr(7), 16) / 255];
      e = parseInt(e.substr(1), 16), a = [e >> 16, e >> 8 & Se, e & Se];
    } else if (e.substr(0, 3) === "hsl") {
      if (a = b = e.match(kc), !t)
        l = +a[0] % 360 / 360, c = +a[1] / 100, d = +a[2] / 100, o = d <= 0.5 ? d * (c + 1) : d + c - d * c, i = d * 2 - o, a.length > 3 && (a[3] *= 1), a[0] = Ts(l + 1 / 3, i, o), a[1] = Ts(l, i, o), a[2] = Ts(l - 1 / 3, i, o);
      else if (~e.indexOf("="))
        return a = e.match(np), n && a.length < 4 && (a[3] = 1), a;
    } else
      a = e.match(kc) || Yi.transparent;
    a = a.map(Number);
  }
  return t && !b && (i = a[0] / Se, o = a[1] / Se, s = a[2] / Se, u = Math.max(i, o, s), p = Math.min(i, o, s), d = (u + p) / 2, u === p ? l = c = 0 : (h = u - p, c = d > 0.5 ? h / (2 - u - p) : h / (u + p), l = u === i ? (o - s) / h + (o < s ? 6 : 0) : u === o ? (s - i) / h + 2 : (i - o) / h + 4, l *= 60), a[0] = ~~(l + 0.5), a[1] = ~~(c * 100 + 0.5), a[2] = ~~(d * 100 + 0.5)), n && a.length < 4 && (a[3] = 1), a;
}, _p = function(e) {
  var t = [], n = [], a = -1;
  return e.split(Dn).forEach(function(i) {
    var o = i.match(Ba) || [];
    t.push.apply(t, o), n.push(a += o.length + 1);
  }), t.c = n, t;
}, Ic = function(e, t, n) {
  var a = "", i = (e + a).match(Dn), o = t ? "hsla(" : "rgba(", s = 0, l, c, d, u;
  if (!i)
    return e;
  if (i = i.map(function(p) {
    return (p = Ep(p, t, 1)) && o + (t ? p[0] + "," + p[1] + "%," + p[2] + "%," + p[3] : p.join(",")) + ")";
  }), n && (d = _p(e), l = n.c, l.join(a) !== d.c.join(a)))
    for (c = e.replace(Dn, "1").split(Ba), u = c.length - 1; s < u; s++)
      a += c[s] + (~l.indexOf(s) ? i.shift() || o + "0,0,0,0)" : (d.length ? d : i.length ? i : n).shift());
  if (!c)
    for (c = e.split(Dn), u = c.length - 1; s < u; s++)
      a += c[s] + i[s];
  return a + c[u];
}, Dn = function() {
  var r = "(?:\\b(?:(?:rgb|rgba|hsl|hsla)\\(.+?\\))|\\B#(?:[0-9a-f]{3,4}){1,2}\\b", e;
  for (e in Yi)
    r += "|" + e + "\\b";
  return new RegExp(r + ")", "gi");
}(), Dh = /hsl[a]?\(/, Ip = function(e) {
  var t = e.join(" "), n;
  if (Dn.lastIndex = 0, Dn.test(t))
    return n = Dh.test(t), e[1] = Ic(e[1], n), e[0] = Ic(e[0], n, _p(e[1])), !0;
}, Wi, nr = function() {
  var r = Date.now, e = 500, t = 33, n = r(), a = n, i = 1e3 / 240, o = i, s = [], l, c, d, u, p, h, b = function f(m) {
    var v = r() - a, k = m === !0, x, A, y, w;
    if ((v > e || v < 0) && (n += v - t), a += v, y = a - n, x = y - o, (x > 0 || k) && (w = ++u.frame, p = y - u.time * 1e3, u.time = y = y / 1e3, o += x + (x >= i ? 4 : i - x), A = 1), k || (l = c(f)), A)
      for (h = 0; h < s.length; h++)
        s[h](y, p, w, m);
  };
  return u = {
    time: 0,
    frame: 0,
    tick: function() {
      b(!0);
    },
    deltaRatio: function(m) {
      return p / (1e3 / (m || 60));
    },
    wake: function() {
      ip && (!rl && ql() && (Gr = rl = window, Nl = Gr.document || {}, lr.gsap = Ht, (Gr.gsapVersions || (Gr.gsapVersions = [])).push(Ht.version), op(Ro || Gr.GreenSockGlobals || !Gr.gsap && Gr || {}), Sp.forEach(zp)), d = typeof requestAnimationFrame < "u" && requestAnimationFrame, l && u.sleep(), c = d || function(m) {
        return setTimeout(m, o - u.time * 1e3 + 1 | 0);
      }, Wi = 1, b(2));
    },
    sleep: function() {
      (d ? cancelAnimationFrame : clearTimeout)(l), Wi = 0, c = Zi;
    },
    lagSmoothing: function(m, v) {
      e = m || 1 / 0, t = Math.min(v || 33, e);
    },
    fps: function(m) {
      i = 1e3 / (m || 240), o = u.time * 1e3 + i;
    },
    add: function(m, v, k) {
      var x = v ? function(A, y, w, M) {
        m(A, y, w, M), u.remove(x);
      } : m;
      return u.remove(m), s[k ? "unshift" : "push"](x), fi(), x;
    },
    remove: function(m, v) {
      ~(v = s.indexOf(m)) && s.splice(v, 1) && h >= v && h--;
    },
    _listeners: s
  }, u;
}(), fi = function() {
  return !Wi && nr.wake();
}, pe = {}, Uh = /^[\d.\-M][\d.\-,\s]/, Gh = /["']/g, Xh = function(e) {
  for (var t = {}, n = e.substr(1, e.length - 3).split(":"), a = n[0], i = 1, o = n.length, s, l, c; i < o; i++)
    l = n[i], s = i !== o - 1 ? l.lastIndexOf(",") : l.length, c = l.substr(0, s), t[a] = isNaN(c) ? c.replace(Gh, "").trim() : +c, a = l.substr(s + 1).trim();
  return t;
}, Hh = function(e) {
  var t = e.indexOf("(") + 1, n = e.indexOf(")"), a = e.indexOf("(", t);
  return e.substring(t, ~a && a < n ? e.indexOf(")", n + 1) : n);
}, Kh = function(e) {
  var t = (e + "").split("("), n = pe[t[0]];
  return n && t.length > 1 && n.config ? n.config.apply(null, ~e.indexOf("{") ? [Xh(t[1])] : Hh(e).split(",").map(pp)) : pe._CE && Uh.test(e) ? pe._CE("", e) : n;
}, Tp = function(e) {
  return function(t) {
    return 1 - e(1 - t);
  };
}, Mp = function r(e, t) {
  for (var n = e._first, a; n; )
    n instanceof Mt ? r(n, t) : n.vars.yoyoEase && (!n._yoyo || !n._repeat) && n._yoyo !== t && (n.timeline ? r(n.timeline, t) : (a = n._ease, n._ease = n._yEase, n._yEase = a, n._yoyo = t)), n = n._next;
}, va = function(e, t) {
  return e && (Fe(e) ? e : pe[e] || Kh(e)) || t;
}, Ea = function(e, t, n, a) {
  n === void 0 && (n = function(l) {
    return 1 - t(1 - l);
  }), a === void 0 && (a = function(l) {
    return l < 0.5 ? t(l * 2) / 2 : 1 - t((1 - l) * 2) / 2;
  });
  var i = {
    easeIn: t,
    easeOut: n,
    easeInOut: a
  }, o;
  return Dt(e, function(s) {
    pe[s] = lr[s] = i, pe[o = s.toLowerCase()] = n;
    for (var l in i)
      pe[o + (l === "easeIn" ? ".in" : l === "easeOut" ? ".out" : ".inOut")] = pe[s + "." + l] = i[l];
  }), i;
}, Cp = function(e) {
  return function(t) {
    return t < 0.5 ? (1 - e(1 - t * 2)) / 2 : 0.5 + e((t - 0.5) * 2) / 2;
  };
}, Ms = function r(e, t, n) {
  var a = t >= 1 ? t : 1, i = (n || (e ? 0.3 : 0.45)) / (t < 1 ? t : 1), o = i / tl * (Math.asin(1 / a) || 0), s = function(d) {
    return d === 1 ? 1 : a * Math.pow(2, -10 * d) * xh((d - o) * i) + 1;
  }, l = e === "out" ? s : e === "in" ? function(c) {
    return 1 - s(1 - c);
  } : Cp(s);
  return i = tl / i, l.config = function(c, d) {
    return r(e, c, d);
  }, l;
}, Cs = function r(e, t) {
  t === void 0 && (t = 1.70158);
  var n = function(o) {
    return o ? --o * o * ((t + 1) * o + t) + 1 : 0;
  }, a = e === "out" ? n : e === "in" ? function(i) {
    return 1 - n(1 - i);
  } : Cp(n);
  return a.config = function(i) {
    return r(e, i);
  }, a;
};
Dt("Linear,Quad,Cubic,Quart,Quint,Strong", function(r, e) {
  var t = e < 5 ? e + 1 : e;
  Ea(r + ",Power" + (t - 1), e ? function(n) {
    return Math.pow(n, t);
  } : function(n) {
    return n;
  }, function(n) {
    return 1 - Math.pow(1 - n, t);
  }, function(n) {
    return n < 0.5 ? Math.pow(n * 2, t) / 2 : 1 - Math.pow((1 - n) * 2, t) / 2;
  });
});
pe.Linear.easeNone = pe.none = pe.Linear.easeIn;
Ea("Elastic", Ms("in"), Ms("out"), Ms());
(function(r, e) {
  var t = 1 / e, n = 2 * t, a = 2.5 * t, i = function(s) {
    return s < t ? r * s * s : s < n ? r * Math.pow(s - 1.5 / e, 2) + 0.75 : s < a ? r * (s -= 2.25 / e) * s + 0.9375 : r * Math.pow(s - 2.625 / e, 2) + 0.984375;
  };
  Ea("Bounce", function(o) {
    return 1 - i(1 - o);
  }, i);
})(7.5625, 2.75);
Ea("Expo", function(r) {
  return Math.pow(2, 10 * (r - 1)) * r + r * r * r * r * r * r * (1 - r);
});
Ea("Circ", function(r) {
  return -(tp(1 - r * r) - 1);
});
Ea("Sine", function(r) {
  return r === 1 ? 1 : -vh(r * mh) + 1;
});
Ea("Back", Cs("in"), Cs("out"), Cs());
pe.SteppedEase = pe.steps = lr.SteppedEase = {
  config: function(e, t) {
    e === void 0 && (e = 1);
    var n = 1 / e, a = e + (t ? 0 : 1), i = t ? 1 : 0, o = 1 - ze;
    return function(s) {
      return ((a * co(0, o, s) | 0) + i) * n;
    };
  }
};
ci.ease = pe["quad.out"];
Dt("onComplete,onUpdate,onStart,onRepeat,onReverseComplete,onInterrupt", function(r) {
  return Ll += r + "," + r + "Params,";
});
var Op = function(e, t) {
  this.id = bh++, e._gsap = this, this.target = e, this.harness = t, this.get = t ? t.get : cp, this.set = t ? t.getSetter : Ul;
}, Ji = /* @__PURE__ */ function() {
  function r(t) {
    this.vars = t, this._delay = +t.delay || 0, (this._repeat = t.repeat === 1 / 0 ? -2 : t.repeat || 0) && (this._rDelay = t.repeatDelay || 0, this._yoyo = !!t.yoyo || !!t.yoyoEase), this._ts = 1, ui(this, +t.duration, 1, 1), this.data = t.data, Oe && (this._ctx = Oe, Oe.data.push(this)), Wi || nr.wake();
  }
  var e = r.prototype;
  return e.delay = function(n) {
    return n || n === 0 ? (this.parent && this.parent.smoothChildTiming && this.startTime(this._start + n - this._delay), this._delay = n, this) : this._delay;
  }, e.duration = function(n) {
    return arguments.length ? this.totalDuration(this._repeat > 0 ? n + (n + this._rDelay) * this._repeat : n) : this.totalDuration() && this._dur;
  }, e.totalDuration = function(n) {
    return arguments.length ? (this._dirty = 0, ui(this, this._repeat < 0 ? n : (n - this._repeat * this._rDelay) / (this._repeat + 1))) : this._tDur;
  }, e.totalTime = function(n, a) {
    if (fi(), !arguments.length)
      return this._tTime;
    var i = this._dp;
    if (i && i.smoothChildTiming && this._ts) {
      for ($o(this, n), !i._dp || i.parent || hp(i, this); i && i.parent; )
        i.parent._time !== i._start + (i._ts >= 0 ? i._tTime / i._ts : (i.totalDuration() - i._tTime) / -i._ts) && i.totalTime(i._tTime, !0), i = i.parent;
      !this.parent && this._dp.autoRemoveChildren && (this._ts > 0 && n < this._tDur || this._ts < 0 && n > 0 || !this._tDur && !n) && Qr(this._dp, this, this._start - this._delay);
    }
    return (this._tTime !== n || !this._dur && !a || this._initted && Math.abs(this._zTime) === ze || !this._initted && this._dur && n || !n && !this._initted && (this.add || this._ptLookup)) && (this._ts || (this._pTime = n), dp(this, n, a)), this;
  }, e.time = function(n, a) {
    return arguments.length ? this.totalTime(Math.min(this.totalDuration(), n + zc(this)) % (this._dur + this._rDelay) || (n ? this._dur : 0), a) : this._time;
  }, e.totalProgress = function(n, a) {
    return arguments.length ? this.totalTime(this.totalDuration() * n, a) : this.totalDuration() ? Math.min(1, this._tTime / this._tDur) : this.rawTime() >= 0 && this._initted ? 1 : 0;
  }, e.progress = function(n, a) {
    return arguments.length ? this.totalTime(this.duration() * (this._yoyo && !(this.iteration() & 1) ? 1 - n : n) + zc(this), a) : this.duration() ? Math.min(1, this._time / this._dur) : this.rawTime() > 0 ? 1 : 0;
  }, e.iteration = function(n, a) {
    var i = this.duration() + this._rDelay;
    return arguments.length ? this.totalTime(this._time + (n - 1) * i, a) : this._repeat ? pi(this._tTime, i) + 1 : 1;
  }, e.timeScale = function(n, a) {
    if (!arguments.length)
      return this._rts === -ze ? 0 : this._rts;
    if (this._rts === n)
      return this;
    var i = this.parent && this._ts ? Yo(this.parent._time, this) : this._tTime;
    return this._rts = +n || 0, this._ts = this._ps || n === -ze ? 0 : this._rts, this.totalTime(co(-Math.abs(this._delay), this.totalDuration(), i), a !== !1), Jo(this), Th(this);
  }, e.paused = function(n) {
    return arguments.length ? (this._ps !== n && (this._ps = n, n ? (this._pTime = this._tTime || Math.max(-this._delay, this.rawTime()), this._ts = this._act = 0) : (fi(), this._ts = this._rts, this.totalTime(this.parent && !this.parent.smoothChildTiming ? this.rawTime() : this._tTime || this._pTime, this.progress() === 1 && Math.abs(this._zTime) !== ze && (this._tTime -= ze)))), this) : this._ps;
  }, e.startTime = function(n) {
    if (arguments.length) {
      this._start = qe(n);
      var a = this.parent || this._dp;
      return a && (a._sort || !this.parent) && Qr(a, this, this._start - this._delay), this;
    }
    return this._start;
  }, e.endTime = function(n) {
    return this._start + (Bt(n) ? this.totalDuration() : this.duration()) / Math.abs(this._ts || 1);
  }, e.rawTime = function(n) {
    var a = this.parent || this._dp;
    return a ? n && (!this._ts || this._repeat && this._time && this.totalProgress() < 1) ? this._tTime % (this._dur + this._rDelay) : this._ts ? Yo(a.rawTime(n), this) : this._tTime : this._tTime;
  }, e.revert = function(n) {
    n === void 0 && (n = zh);
    var a = ft;
    return ft = n, jl(this) && (this.timeline && this.timeline.revert(n), this.totalTime(-0.01, n.suppressEvents)), this.data !== "nested" && n.kill !== !1 && this.kill(), ft = a, this;
  }, e.globalTime = function(n) {
    for (var a = this, i = arguments.length ? n : a.rawTime(); a; )
      i = a._start + i / (Math.abs(a._ts) || 1), a = a._dp;
    return !this.parent && this._sat ? this._sat.globalTime(n) : i;
  }, e.repeat = function(n) {
    return arguments.length ? (this._repeat = n === 1 / 0 ? -2 : n, Ec(this)) : this._repeat === -2 ? 1 / 0 : this._repeat;
  }, e.repeatDelay = function(n) {
    if (arguments.length) {
      var a = this._time;
      return this._rDelay = n, Ec(this), a ? this.time(a) : this;
    }
    return this._rDelay;
  }, e.yoyo = function(n) {
    return arguments.length ? (this._yoyo = n, this) : this._yoyo;
  }, e.seek = function(n, a) {
    return this.totalTime(ur(this, n), Bt(a));
  }, e.restart = function(n, a) {
    return this.play().totalTime(n ? -this._delay : 0, Bt(a)), this._dur || (this._zTime = -ze), this;
  }, e.play = function(n, a) {
    return n != null && this.seek(n, a), this.reversed(!1).paused(!1);
  }, e.reverse = function(n, a) {
    return n != null && this.seek(n || this.totalDuration(), a), this.reversed(!0).paused(!1);
  }, e.pause = function(n, a) {
    return n != null && this.seek(n, a), this.paused(!0);
  }, e.resume = function() {
    return this.paused(!1);
  }, e.reversed = function(n) {
    return arguments.length ? (!!n !== this.reversed() && this.timeScale(-this._rts || (n ? -ze : 0)), this) : this._rts < 0;
  }, e.invalidate = function() {
    return this._initted = this._act = 0, this._zTime = -ze, this;
  }, e.isActive = function() {
    var n = this.parent || this._dp, a = this._start, i;
    return !!(!n || this._ts && this._initted && n.isActive() && (i = n.rawTime(!0)) >= a && i < this.endTime(!0) - ze);
  }, e.eventCallback = function(n, a, i) {
    var o = this.vars;
    return arguments.length > 1 ? (a ? (o[n] = a, i && (o[n + "Params"] = i), n === "onUpdate" && (this._onUpdate = a)) : delete o[n], this) : o[n];
  }, e.then = function(n) {
    var a = this, i = a._prom;
    return new Promise(function(o) {
      var s = Fe(n) ? n : up, l = function() {
        var d = a.then;
        a.then = null, i && i(), Fe(s) && (s = s(a)) && (s.then || s === a) && (a.then = d), o(s), a.then = d;
      };
      a._initted && a.totalProgress() === 1 && a._ts >= 0 || !a._tTime && a._ts < 0 ? l() : a._prom = l;
    });
  }, e.kill = function() {
    Li(this);
  }, r;
}();
cr(Ji.prototype, {
  _time: 0,
  _start: 0,
  _end: 0,
  _tTime: 0,
  _tDur: 0,
  _dirty: 0,
  _repeat: 0,
  _yoyo: !1,
  parent: null,
  _initted: !1,
  _rDelay: 0,
  _ts: 1,
  _dp: 0,
  ratio: 0,
  _zTime: -ze,
  _prom: 0,
  _ps: !1,
  _rts: 1
});
var Mt = /* @__PURE__ */ function(r) {
  ep(e, r);
  function e(n, a) {
    var i;
    return n === void 0 && (n = {}), i = r.call(this, n) || this, i.labels = {}, i.smoothChildTiming = !!n.smoothChildTiming, i.autoRemoveChildren = !!n.autoRemoveChildren, i._sort = Bt(n.sortChildren), Ne && Qr(n.parent || Ne, un(i), a), n.reversed && i.reverse(), n.paused && i.paused(!0), n.scrollTrigger && gp(un(i), n.scrollTrigger), i;
  }
  var t = e.prototype;
  return t.to = function(a, i, o) {
    return Ui(0, arguments, this), this;
  }, t.from = function(a, i, o) {
    return Ui(1, arguments, this), this;
  }, t.fromTo = function(a, i, o, s) {
    return Ui(2, arguments, this), this;
  }, t.set = function(a, i, o) {
    return i.duration = 0, i.parent = this, Di(i).repeatDelay || (i.repeat = 0), i.immediateRender = !!i.immediateRender, new Ke(a, i, ur(this, o), 1), this;
  }, t.call = function(a, i, o) {
    return Qr(this, Ke.delayedCall(0, a, i), o);
  }, t.staggerTo = function(a, i, o, s, l, c, d) {
    return o.duration = i, o.stagger = o.stagger || s, o.onComplete = c, o.onCompleteParams = d, o.parent = this, new Ke(a, o, ur(this, l)), this;
  }, t.staggerFrom = function(a, i, o, s, l, c, d) {
    return o.runBackwards = 1, Di(o).immediateRender = Bt(o.immediateRender), this.staggerTo(a, i, o, s, l, c, d);
  }, t.staggerFromTo = function(a, i, o, s, l, c, d, u) {
    return s.startAt = o, Di(s).immediateRender = Bt(s.immediateRender), this.staggerTo(a, i, s, l, c, d, u);
  }, t.render = function(a, i, o) {
    var s = this._time, l = this._dirty ? this.totalDuration() : this._tDur, c = this._dur, d = a <= 0 ? 0 : qe(a), u = this._zTime < 0 != a < 0 && (this._initted || !c), p, h, b, f, m, v, k, x, A, y, w, M;
    if (this !== Ne && d > l && a >= 0 && (d = l), d !== this._tTime || o || u) {
      if (s !== this._time && c && (d += this._time - s, a += this._time - s), p = d, A = this._start, x = this._ts, v = !x, u && (c || (s = this._zTime), (a || !i) && (this._zTime = a)), this._repeat) {
        if (w = this._yoyo, m = c + this._rDelay, this._repeat < -1 && a < 0)
          return this.totalTime(m * 100 + a, i, o);
        if (p = qe(d % m), d === l ? (f = this._repeat, p = c) : (y = qe(d / m), f = ~~y, f && f === y && (p = c, f--), p > c && (p = c)), y = pi(this._tTime, m), !s && this._tTime && y !== f && this._tTime - y * m - this._dur <= 0 && (y = f), w && f & 1 && (p = c - p, M = 1), f !== y && !this._lock) {
          var T = w && y & 1, E = T === (w && f & 1);
          if (f < y && (T = !T), s = T ? 0 : d % c ? c : d, this._lock = 1, this.render(s || (M ? 0 : qe(f * m)), i, !c)._lock = 0, this._tTime = d, !i && this.parent && ar(this, "onRepeat"), this.vars.repeatRefresh && !M && (this.invalidate()._lock = 1, y = f), s && s !== this._time || v !== !this._ts || this.vars.onRepeat && !this.parent && !this._act)
            return this;
          if (c = this._dur, l = this._tDur, E && (this._lock = 2, s = T ? c : -1e-4, this.render(s, !0), this.vars.repeatRefresh && !M && this.invalidate()), this._lock = 0, !this._ts && !v)
            return this;
          Mp(this, M);
        }
      }
      if (this._hasPause && !this._forcing && this._lock < 2 && (k = Ph(this, qe(s), qe(p)), k && (d -= p - (p = k._start))), this._tTime = d, this._time = p, this._act = !x, this._initted || (this._onUpdate = this.vars.onUpdate, this._initted = 1, this._zTime = a, s = 0), !s && d && c && !i && !y && (ar(this, "onStart"), this._tTime !== d))
        return this;
      if (p >= s && a >= 0)
        for (h = this._first; h; ) {
          if (b = h._next, (h._act || p >= h._start) && h._ts && k !== h) {
            if (h.parent !== this)
              return this.render(a, i, o);
            if (h.render(h._ts > 0 ? (p - h._start) * h._ts : (h._dirty ? h.totalDuration() : h._tDur) + (p - h._start) * h._ts, i, o), p !== this._time || !this._ts && !v) {
              k = 0, b && (d += this._zTime = -ze);
              break;
            }
          }
          h = b;
        }
      else {
        h = this._last;
        for (var j = a < 0 ? a : p; h; ) {
          if (b = h._prev, (h._act || j <= h._end) && h._ts && k !== h) {
            if (h.parent !== this)
              return this.render(a, i, o);
            if (h.render(h._ts > 0 ? (j - h._start) * h._ts : (h._dirty ? h.totalDuration() : h._tDur) + (j - h._start) * h._ts, i, o || ft && jl(h)), p !== this._time || !this._ts && !v) {
              k = 0, b && (d += this._zTime = j ? -ze : ze);
              break;
            }
          }
          h = b;
        }
      }
      if (k && !i && (this.pause(), k.render(p >= s ? 0 : -ze)._zTime = p >= s ? 1 : -1, this._ts))
        return this._start = A, Jo(this), this.render(a, i, o);
      this._onUpdate && !i && ar(this, "onUpdate", !0), (d === l && this._tTime >= this.totalDuration() || !d && s) && (A === this._start || Math.abs(x) !== Math.abs(this._ts)) && (this._lock || ((a || !c) && (d === l && this._ts > 0 || !d && this._ts < 0) && Xn(this, 1), !i && !(a < 0 && !s) && (d || s || !l) && (ar(this, d === l && a >= 0 ? "onComplete" : "onReverseComplete", !0), this._prom && !(d < l && this.timeScale() > 0) && this._prom())));
    }
    return this;
  }, t.add = function(a, i) {
    var o = this;
    if (vn(i) || (i = ur(this, i, a)), !(a instanceof Ji)) {
      if (wt(a))
        return a.forEach(function(s) {
          return o.add(s, i);
        }), this;
      if (at(a))
        return this.addLabel(a, i);
      if (Fe(a))
        a = Ke.delayedCall(0, a);
      else
        return this;
    }
    return this !== a ? Qr(this, a, i) : this;
  }, t.getChildren = function(a, i, o, s) {
    a === void 0 && (a = !0), i === void 0 && (i = !0), o === void 0 && (o = !0), s === void 0 && (s = -br);
    for (var l = [], c = this._first; c; )
      c._start >= s && (c instanceof Ke ? i && l.push(c) : (o && l.push(c), a && l.push.apply(l, c.getChildren(!0, i, o)))), c = c._next;
    return l;
  }, t.getById = function(a) {
    for (var i = this.getChildren(1, 1, 1), o = i.length; o--; )
      if (i[o].vars.id === a)
        return i[o];
  }, t.remove = function(a) {
    return at(a) ? this.removeLabel(a) : Fe(a) ? this.killTweensOf(a) : (a.parent === this && Wo(this, a), a === this._recent && (this._recent = this._last), ba(this));
  }, t.totalTime = function(a, i) {
    return arguments.length ? (this._forcing = 1, !this._dp && this._ts && (this._start = qe(nr.time - (this._ts > 0 ? a / this._ts : (this.totalDuration() - a) / -this._ts))), r.prototype.totalTime.call(this, a, i), this._forcing = 0, this) : this._tTime;
  }, t.addLabel = function(a, i) {
    return this.labels[a] = ur(this, i), this;
  }, t.removeLabel = function(a) {
    return delete this.labels[a], this;
  }, t.addPause = function(a, i, o) {
    var s = Ke.delayedCall(0, i || Zi, o);
    return s.data = "isPause", this._hasPause = 1, Qr(this, s, ur(this, a));
  }, t.removePause = function(a) {
    var i = this._first;
    for (a = ur(this, a); i; )
      i._start === a && i.data === "isPause" && Xn(i), i = i._next;
  }, t.killTweensOf = function(a, i, o) {
    for (var s = this.getTweensOf(a, o), l = s.length; l--; )
      Rn !== s[l] && s[l].kill(a, i);
    return this;
  }, t.getTweensOf = function(a, i) {
    for (var o = [], s = vr(a), l = this._first, c = vn(i), d; l; )
      l instanceof Ke ? Eh(l._targets, s) && (c ? (!Rn || l._initted && l._ts) && l.globalTime(0) <= i && l.globalTime(l.totalDuration()) > i : !i || l.isActive()) && o.push(l) : (d = l.getTweensOf(s, i)).length && o.push.apply(o, d), l = l._next;
    return o;
  }, t.tweenTo = function(a, i) {
    i = i || {};
    var o = this, s = ur(o, a), l = i, c = l.startAt, d = l.onStart, u = l.onStartParams, p = l.immediateRender, h, b = Ke.to(o, cr({
      ease: i.ease || "none",
      lazy: !1,
      immediateRender: !1,
      time: s,
      overwrite: "auto",
      duration: i.duration || Math.abs((s - (c && "time" in c ? c.time : o._time)) / o.timeScale()) || ze,
      onStart: function() {
        if (o.pause(), !h) {
          var m = i.duration || Math.abs((s - (c && "time" in c ? c.time : o._time)) / o.timeScale());
          b._dur !== m && ui(b, m, 0, 1).render(b._time, !0, !0), h = 1;
        }
        d && d.apply(b, u || []);
      }
    }, i));
    return p ? b.render(0) : b;
  }, t.tweenFromTo = function(a, i, o) {
    return this.tweenTo(i, cr({
      startAt: {
        time: ur(this, a)
      }
    }, o));
  }, t.recent = function() {
    return this._recent;
  }, t.nextLabel = function(a) {
    return a === void 0 && (a = this._time), _c(this, ur(this, a));
  }, t.previousLabel = function(a) {
    return a === void 0 && (a = this._time), _c(this, ur(this, a), 1);
  }, t.currentLabel = function(a) {
    return arguments.length ? this.seek(a, !0) : this.previousLabel(this._time + ze);
  }, t.shiftChildren = function(a, i, o) {
    o === void 0 && (o = 0);
    var s = this._first, l = this.labels, c;
    for (a = qe(a); s; )
      s._start >= o && (s._start += a, s._end += a), s = s._next;
    if (i)
      for (c in l)
        l[c] >= o && (l[c] += a);
    return ba(this);
  }, t.invalidate = function(a) {
    var i = this._first;
    for (this._lock = 0; i; )
      i.invalidate(a), i = i._next;
    return r.prototype.invalidate.call(this, a);
  }, t.clear = function(a) {
    a === void 0 && (a = !0);
    for (var i = this._first, o; i; )
      o = i._next, this.remove(i), i = o;
    return this._dp && (this._time = this._tTime = this._pTime = 0), a && (this.labels = {}), ba(this);
  }, t.totalDuration = function(a) {
    var i = 0, o = this, s = o._last, l = br, c, d, u;
    if (arguments.length)
      return o.timeScale((o._repeat < 0 ? o.duration() : o.totalDuration()) / (o.reversed() ? -a : a));
    if (o._dirty) {
      for (u = o.parent; s; )
        c = s._prev, s._dirty && s.totalDuration(), d = s._start, d > l && o._sort && s._ts && !o._lock ? (o._lock = 1, Qr(o, s, d - s._delay, 1)._lock = 0) : l = d, d < 0 && s._ts && (i -= d, (!u && !o._dp || u && u.smoothChildTiming) && (o._start += qe(d / o._ts), o._time -= d, o._tTime -= d), o.shiftChildren(-d, !1, -1 / 0), l = 0), s._end > i && s._ts && (i = s._end), s = c;
      ui(o, o === Ne && o._time > i ? o._time : i, 1, 1), o._dirty = 0;
    }
    return o._tDur;
  }, e.updateRoot = function(a) {
    if (Ne._ts && (dp(Ne, Yo(a, Ne)), lp = nr.frame), nr.frame >= Ac) {
      Ac += sr.autoSleep || 120;
      var i = Ne._first;
      if ((!i || !i._ts) && sr.autoSleep && nr._listeners.length < 2) {
        for (; i && !i._ts; )
          i = i._next;
        i || nr.sleep();
      }
    }
  }, e;
}(Ji);
cr(Mt.prototype, {
  _lock: 0,
  _hasPause: 0,
  _forcing: 0
});
var Zh = function(e, t, n, a, i, o, s) {
  var l = new Ut(this._pt, e, t, 0, 1, Lp, null, i), c = 0, d = 0, u, p, h, b, f, m, v, k;
  for (l.b = n, l.e = a, n += "", a += "", (v = ~a.indexOf("random(")) && (a = Qi(a)), o && (k = [n, a], o(k, e, t), n = k[0], a = k[1]), p = n.match(_s) || []; u = _s.exec(a); )
    b = u[0], f = a.substring(c, u.index), h ? h = (h + 1) % 5 : f.substr(-5) === "rgba(" && (h = 1), b !== p[d++] && (m = parseFloat(p[d - 1]) || 0, l._pt = {
      _next: l._pt,
      p: f || d === 1 ? f : ",",
      //note: SVG spec allows omission of comma/space when a negative sign is wedged between two numbers, like 2.5-5.3 instead of 2.5,-5.3 but when tweening, the negative value may switch to positive, so we insert the comma just in case.
      s: m,
      c: b.charAt(1) === "=" ? Ga(m, b) - m : parseFloat(b) - m,
      m: h && h < 4 ? Math.round : 0
    }, c = _s.lastIndex);
  return l.c = c < a.length ? a.substring(c, a.length) : "", l.fp = s, (ap.test(a) || v) && (l.e = 0), this._pt = l, l;
}, Fl = function(e, t, n, a, i, o, s, l, c, d) {
  Fe(a) && (a = a(i || 0, e, o));
  var u = e[t], p = n !== "get" ? n : Fe(u) ? c ? e[t.indexOf("set") || !Fe(e["get" + t.substr(3)]) ? t : "get" + t.substr(3)](c) : e[t]() : u, h = Fe(u) ? c ? eg : Rp : Dl, b;
  if (at(a) && (~a.indexOf("random(") && (a = Qi(a)), a.charAt(1) === "=" && (b = Ga(p, a) + (yt(p) || 0), (b || b === 0) && (a = b))), !d || p !== a || cl)
    return !isNaN(p * a) && a !== "" ? (b = new Ut(this._pt, e, t, +p || 0, a - (p || 0), typeof u == "boolean" ? rg : Vp, 0, h), c && (b.fp = c), s && b.modifier(s, this, e), this._pt = b) : (!u && !(t in e) && Rl(t, a), Zh.call(this, e, t, p, a, h, l || sr.stringFilter, c));
}, Qh = function(e, t, n, a, i) {
  if (Fe(e) && (e = Gi(e, i, t, n, a)), !tn(e) || e.style && e.nodeType || wt(e) || rp(e))
    return at(e) ? Gi(e, i, t, n, a) : e;
  var o = {}, s;
  for (s in e)
    o[s] = Gi(e[s], i, t, n, a);
  return o;
}, Pp = function(e, t, n, a, i, o) {
  var s, l, c, d;
  if (rr[e] && (s = new rr[e]()).init(i, s.rawVars ? t[e] : Qh(t[e], a, i, o, n), n, a, o) !== !1 && (n._pt = l = new Ut(n._pt, i, e, 0, 1, s.render, s, 0, s.priority), n !== Da))
    for (c = n._ptLookup[n._targets.indexOf(i)], d = s._props.length; d--; )
      c[s._props[d]] = l;
  return s;
}, Rn, cl, Bl = function r(e, t, n) {
  var a = e.vars, i = a.ease, o = a.startAt, s = a.immediateRender, l = a.lazy, c = a.onUpdate, d = a.runBackwards, u = a.yoyoEase, p = a.keyframes, h = a.autoRevert, b = e._dur, f = e._startAt, m = e._targets, v = e.parent, k = v && v.data === "nested" ? v.vars.targets : m, x = e._overwrite === "auto" && !Ol, A = e.timeline, y, w, M, T, E, j, K, X, Y, ie, me, ue, fe;
  if (A && (!p || !i) && (i = "none"), e._ease = va(i, ci.ease), e._yEase = u ? Tp(va(u === !0 ? i : u, ci.ease)) : 0, u && e._yoyo && !e._repeat && (u = e._yEase, e._yEase = e._ease, e._ease = u), e._from = !A && !!a.runBackwards, !A || p && !a.stagger) {
    if (X = m[0] ? ma(m[0]).harness : 0, ue = X && a[X.prop], y = Lo(a, Vl), f && (f._zTime < 0 && f.progress(1), t < 0 && d && s && !h ? f.render(-1, !0) : f.revert(d && b ? Mo : Sh), f._lazy = 0), o) {
      if (Xn(e._startAt = Ke.set(m, cr({
        data: "isStart",
        overwrite: !1,
        parent: v,
        immediateRender: !0,
        lazy: !f && Bt(l),
        startAt: null,
        delay: 0,
        onUpdate: c && function() {
          return ar(e, "onUpdate");
        },
        stagger: 0
      }, o))), e._startAt._dp = 0, e._startAt._sat = e, t < 0 && (ft || !s && !h) && e._startAt.revert(Mo), s && b && t <= 0 && n <= 0) {
        t && (e._zTime = t);
        return;
      }
    } else if (d && b && !f) {
      if (t && (s = !1), M = cr({
        overwrite: !1,
        data: "isFromStart",
        //we tag the tween with as "isFromStart" so that if [inside a plugin] we need to only do something at the very END of a tween, we have a way of identifying this tween as merely the one that's setting the beginning values for a "from()" tween. For example, clearProps in CSSPlugin should only get applied at the very END of a tween and without this tag, from(...{height:100, clearProps:"height", delay:1}) would wipe the height at the beginning of the tween and after 1 second, it'd kick back in.
        lazy: s && !f && Bt(l),
        immediateRender: s,
        //zero-duration tweens render immediately by default, but if we're not specifically instructed to render this tween immediately, we should skip this and merely _init() to record the starting values (rendering them immediately would push them to completion which is wasteful in that case - we'd have to render(-1) immediately after)
        stagger: 0,
        parent: v
        //ensures that nested tweens that had a stagger are handled properly, like gsap.from(".class", {y: gsap.utils.wrap([-100,100]), stagger: 0.5})
      }, y), ue && (M[X.prop] = ue), Xn(e._startAt = Ke.set(m, M)), e._startAt._dp = 0, e._startAt._sat = e, t < 0 && (ft ? e._startAt.revert(Mo) : e._startAt.render(-1, !0)), e._zTime = t, !s)
        r(e._startAt, ze, ze);
      else if (!t)
        return;
    }
    for (e._pt = e._ptCache = 0, l = b && Bt(l) || l && !b, w = 0; w < m.length; w++) {
      if (E = m[w], K = E._gsap || Yl(m)[w]._gsap, e._ptLookup[w] = ie = {}, nl[K.id] && Bn.length && Vo(), me = k === m ? w : k.indexOf(E), X && (Y = new X()).init(E, ue || y, e, me, k) !== !1 && (e._pt = T = new Ut(e._pt, E, Y.name, 0, 1, Y.render, Y, 0, Y.priority), Y._props.forEach(function(Te) {
        ie[Te] = T;
      }), Y.priority && (j = 1)), !X || ue)
        for (M in y)
          rr[M] && (Y = Pp(M, y, e, me, E, k)) ? Y.priority && (j = 1) : ie[M] = T = Fl.call(e, E, M, "get", y[M], me, k, 0, a.stringFilter);
      e._op && e._op[w] && e.kill(E, e._op[w]), x && e._pt && (Rn = e, Ne.killTweensOf(E, ie, e.globalTime(t)), fe = !e.parent, Rn = 0), e._pt && l && (nl[K.id] = 1);
    }
    j && Yp(e), e._onInit && e._onInit(e);
  }
  e._onUpdate = c, e._initted = (!e._op || e._pt) && !fe, p && t <= 0 && A.render(br, !0, !0);
}, Wh = function(e, t, n, a, i, o, s, l) {
  var c = (e._pt && e._ptCache || (e._ptCache = {}))[t], d, u, p, h;
  if (!c)
    for (c = e._ptCache[t] = [], p = e._ptLookup, h = e._targets.length; h--; ) {
      if (d = p[h][t], d && d.d && d.d._pt)
        for (d = d.d._pt; d && d.p !== t && d.fp !== t; )
          d = d._next;
      if (!d)
        return cl = 1, e.vars[t] = "+=0", Bl(e, s), cl = 0, l ? Ki(t + " not eligible for reset") : 1;
      c.push(d);
    }
  for (h = c.length; h--; )
    u = c[h], d = u._pt || u, d.s = (a || a === 0) && !i ? a : d.s + (a || 0) + o * d.c, d.c = n - d.s, u.e && (u.e = Ue(n) + yt(u.e)), u.b && (u.b = d.s + yt(u.b));
}, Jh = function(e, t) {
  var n = e[0] ? ma(e[0]).harness : 0, a = n && n.aliases, i, o, s, l;
  if (!a)
    return t;
  i = di({}, t);
  for (o in a)
    if (o in i)
      for (l = a[o].split(","), s = l.length; s--; )
        i[l[s]] = i[o];
  return i;
}, $h = function(e, t, n, a) {
  var i = t.ease || a || "power1.inOut", o, s;
  if (wt(t))
    s = n[e] || (n[e] = []), t.forEach(function(l, c) {
      return s.push({
        t: c / (t.length - 1) * 100,
        v: l,
        e: i
      });
    });
  else
    for (o in t)
      s = n[o] || (n[o] = []), o === "ease" || s.push({
        t: parseFloat(e),
        v: t[o],
        e: i
      });
}, Gi = function(e, t, n, a, i) {
  return Fe(e) ? e.call(t, n, a, i) : at(e) && ~e.indexOf("random(") ? Qi(e) : e;
}, qp = Ll + "repeat,repeatDelay,yoyo,repeatRefresh,yoyoEase,autoRevert", Np = {};
Dt(qp + ",id,stagger,delay,duration,paused,scrollTrigger", function(r) {
  return Np[r] = 1;
});
var Ke = /* @__PURE__ */ function(r) {
  ep(e, r);
  function e(n, a, i, o) {
    var s;
    typeof a == "number" && (i.duration = a, a = i, i = null), s = r.call(this, o ? a : Di(a)) || this;
    var l = s.vars, c = l.duration, d = l.delay, u = l.immediateRender, p = l.stagger, h = l.overwrite, b = l.keyframes, f = l.defaults, m = l.scrollTrigger, v = l.yoyoEase, k = a.parent || Ne, x = (wt(n) || rp(n) ? vn(n[0]) : "length" in a) ? [n] : vr(n), A, y, w, M, T, E, j, K;
    if (s._targets = x.length ? Yl(x) : Ki("GSAP target " + n + " not found. https://gsap.com", !sr.nullTargetWarn) || [], s._ptLookup = [], s._overwrite = h, b || p || So(c) || So(d)) {
      if (a = s.vars, A = s.timeline = new Mt({
        data: "nested",
        defaults: f || {},
        targets: k && k.data === "nested" ? k.vars.targets : x
      }), A.kill(), A.parent = A._dp = un(s), A._start = 0, p || So(c) || So(d)) {
        if (M = x.length, j = p && xp(p), tn(p))
          for (T in p)
            ~qp.indexOf(T) && (K || (K = {}), K[T] = p[T]);
        for (y = 0; y < M; y++)
          w = Lo(a, Np), w.stagger = 0, v && (w.yoyoEase = v), K && di(w, K), E = x[y], w.duration = +Gi(c, un(s), y, E, x), w.delay = (+Gi(d, un(s), y, E, x) || 0) - s._delay, !p && M === 1 && w.delay && (s._delay = d = w.delay, s._start += d, w.delay = 0), A.to(E, w, j ? j(y, E, x) : 0), A._ease = pe.none;
        A.duration() ? c = d = 0 : s.timeline = 0;
      } else if (b) {
        Di(cr(A.vars.defaults, {
          ease: "none"
        })), A._ease = va(b.ease || a.ease || "none");
        var X = 0, Y, ie, me;
        if (wt(b))
          b.forEach(function(ue) {
            return A.to(x, ue, ">");
          }), A.duration();
        else {
          w = {};
          for (T in b)
            T === "ease" || T === "easeEach" || $h(T, b[T], w, b.easeEach);
          for (T in w)
            for (Y = w[T].sort(function(ue, fe) {
              return ue.t - fe.t;
            }), X = 0, y = 0; y < Y.length; y++)
              ie = Y[y], me = {
                ease: ie.e,
                duration: (ie.t - (y ? Y[y - 1].t : 0)) / 100 * c
              }, me[T] = ie.v, A.to(x, me, X), X += me.duration;
          A.duration() < c && A.to({}, {
            duration: c - A.duration()
          });
        }
      }
      c || s.duration(c = A.duration());
    } else
      s.timeline = 0;
    return h === !0 && !Ol && (Rn = un(s), Ne.killTweensOf(x), Rn = 0), Qr(k, un(s), i), a.reversed && s.reverse(), a.paused && s.paused(!0), (u || !c && !b && s._start === qe(k._time) && Bt(u) && Mh(un(s)) && k.data !== "nested") && (s._tTime = -ze, s.render(Math.max(0, -d) || 0)), m && gp(un(s), m), s;
  }
  var t = e.prototype;
  return t.render = function(a, i, o) {
    var s = this._time, l = this._tDur, c = this._dur, d = a < 0, u = a > l - ze && !d ? l : a < ze ? 0 : a, p, h, b, f, m, v, k, x, A;
    if (!c)
      Oh(this, a, i, o);
    else if (u !== this._tTime || !a || o || !this._initted && this._tTime || this._startAt && this._zTime < 0 !== d || this._lazy) {
      if (p = u, x = this.timeline, this._repeat) {
        if (f = c + this._rDelay, this._repeat < -1 && d)
          return this.totalTime(f * 100 + a, i, o);
        if (p = qe(u % f), u === l ? (b = this._repeat, p = c) : (m = qe(u / f), b = ~~m, b && b === m ? (p = c, b--) : p > c && (p = c)), v = this._yoyo && b & 1, v && (A = this._yEase, p = c - p), m = pi(this._tTime, f), p === s && !o && this._initted && b === m)
          return this._tTime = u, this;
        b !== m && (x && this._yEase && Mp(x, v), this.vars.repeatRefresh && !v && !this._lock && p !== f && this._initted && (this._lock = o = 1, this.render(qe(f * b), !0).invalidate()._lock = 0));
      }
      if (!this._initted) {
        if (mp(this, d ? a : p, o, i, u))
          return this._tTime = 0, this;
        if (s !== this._time && !(o && this.vars.repeatRefresh && b !== m))
          return this;
        if (c !== this._dur)
          return this.render(a, i, o);
      }
      if (this._tTime = u, this._time = p, !this._act && this._ts && (this._act = 1, this._lazy = 0), this.ratio = k = (A || this._ease)(p / c), this._from && (this.ratio = k = 1 - k), !s && u && !i && !m && (ar(this, "onStart"), this._tTime !== u))
        return this;
      for (h = this._pt; h; )
        h.r(k, h.d), h = h._next;
      x && x.render(a < 0 ? a : x._dur * x._ease(p / this._dur), i, o) || this._startAt && (this._zTime = a), this._onUpdate && !i && (d && al(this, a, i, o), ar(this, "onUpdate")), this._repeat && b !== m && this.vars.onRepeat && !i && this.parent && ar(this, "onRepeat"), (u === this._tDur || !u) && this._tTime === u && (d && !this._onUpdate && al(this, a, !0, !0), (a || !c) && (u === this._tDur && this._ts > 0 || !u && this._ts < 0) && Xn(this, 1), !i && !(d && !s) && (u || s || v) && (ar(this, u === l ? "onComplete" : "onReverseComplete", !0), this._prom && !(u < l && this.timeScale() > 0) && this._prom()));
    }
    return this;
  }, t.targets = function() {
    return this._targets;
  }, t.invalidate = function(a) {
    return (!a || !this.vars.runBackwards) && (this._startAt = 0), this._pt = this._op = this._onUpdate = this._lazy = this.ratio = 0, this._ptLookup = [], this.timeline && this.timeline.invalidate(a), r.prototype.invalidate.call(this, a);
  }, t.resetTo = function(a, i, o, s, l) {
    Wi || nr.wake(), this._ts || this.play();
    var c = Math.min(this._dur, (this._dp._time - this._start) * this._ts), d;
    return this._initted || Bl(this, c), d = this._ease(c / this._dur), Wh(this, a, i, o, s, d, c, l) ? this.resetTo(a, i, o, s, 1) : ($o(this, 0), this.parent || fp(this._dp, this, "_first", "_last", this._dp._sort ? "_start" : 0), this.render(0));
  }, t.kill = function(a, i) {
    if (i === void 0 && (i = "all"), !a && (!i || i === "all"))
      return this._lazy = this._pt = 0, this.parent ? Li(this) : this.scrollTrigger && this.scrollTrigger.kill(!!ft), this;
    if (this.timeline) {
      var o = this.timeline.totalDuration();
      return this.timeline.killTweensOf(a, i, Rn && Rn.vars.overwrite !== !0)._first || Li(this), this.parent && o !== this.timeline.totalDuration() && ui(this, this._dur * this.timeline._tDur / o, 0, 1), this;
    }
    var s = this._targets, l = a ? vr(a) : s, c = this._ptLookup, d = this._pt, u, p, h, b, f, m, v;
    if ((!i || i === "all") && Ih(s, l))
      return i === "all" && (this._pt = 0), Li(this);
    for (u = this._op = this._op || [], i !== "all" && (at(i) && (f = {}, Dt(i, function(k) {
      return f[k] = 1;
    }), i = f), i = Jh(s, i)), v = s.length; v--; )
      if (~l.indexOf(s[v])) {
        p = c[v], i === "all" ? (u[v] = i, b = p, h = {}) : (h = u[v] = u[v] || {}, b = i);
        for (f in b)
          m = p && p[f], m && ((!("kill" in m.d) || m.d.kill(f) === !0) && Wo(this, m, "_pt"), delete p[f]), h !== "all" && (h[f] = 1);
      }
    return this._initted && !this._pt && d && Li(this), this;
  }, e.to = function(a, i) {
    return new e(a, i, arguments[2]);
  }, e.from = function(a, i) {
    return Ui(1, arguments);
  }, e.delayedCall = function(a, i, o, s) {
    return new e(i, 0, {
      immediateRender: !1,
      lazy: !1,
      overwrite: !1,
      delay: a,
      onComplete: i,
      onReverseComplete: i,
      onCompleteParams: o,
      onReverseCompleteParams: o,
      callbackScope: s
    });
  }, e.fromTo = function(a, i, o) {
    return Ui(2, arguments);
  }, e.set = function(a, i) {
    return i.duration = 0, i.repeatDelay || (i.repeat = 0), new e(a, i);
  }, e.killTweensOf = function(a, i, o) {
    return Ne.killTweensOf(a, i, o);
  }, e;
}(Ji);
cr(Ke.prototype, {
  _targets: [],
  _lazy: 0,
  _startAt: 0,
  _op: 0,
  _onInit: 0
});
Dt("staggerTo,staggerFrom,staggerFromTo", function(r) {
  Ke[r] = function() {
    var e = new Mt(), t = ol.call(arguments, 0);
    return t.splice(r === "staggerFromTo" ? 5 : 4, 0, 0), e[r].apply(e, t);
  };
});
var Dl = function(e, t, n) {
  return e[t] = n;
}, Rp = function(e, t, n) {
  return e[t](n);
}, eg = function(e, t, n, a) {
  return e[t](a.fp, n);
}, tg = function(e, t, n) {
  return e.setAttribute(t, n);
}, Ul = function(e, t) {
  return Fe(e[t]) ? Rp : Pl(e[t]) && e.setAttribute ? tg : Dl;
}, Vp = function(e, t) {
  return t.set(t.t, t.p, Math.round((t.s + t.c * e) * 1e6) / 1e6, t);
}, rg = function(e, t) {
  return t.set(t.t, t.p, !!(t.s + t.c * e), t);
}, Lp = function(e, t) {
  var n = t._pt, a = "";
  if (!e && t.b)
    a = t.b;
  else if (e === 1 && t.e)
    a = t.e;
  else {
    for (; n; )
      a = n.p + (n.m ? n.m(n.s + n.c * e) : Math.round((n.s + n.c * e) * 1e4) / 1e4) + a, n = n._next;
    a += t.c;
  }
  t.set(t.t, t.p, a, t);
}, Gl = function(e, t) {
  for (var n = t._pt; n; )
    n.r(e, n.d), n = n._next;
}, ng = function(e, t, n, a) {
  for (var i = this._pt, o; i; )
    o = i._next, i.p === a && i.modifier(e, t, n), i = o;
}, ag = function(e) {
  for (var t = this._pt, n, a; t; )
    a = t._next, t.p === e && !t.op || t.op === e ? Wo(this, t, "_pt") : t.dep || (n = 1), t = a;
  return !n;
}, ig = function(e, t, n, a) {
  a.mSet(e, t, a.m.call(a.tween, n, a.mt), a);
}, Yp = function(e) {
  for (var t = e._pt, n, a, i, o; t; ) {
    for (n = t._next, a = i; a && a.pr > t.pr; )
      a = a._next;
    (t._prev = a ? a._prev : o) ? t._prev._next = t : i = t, (t._next = a) ? a._prev = t : o = t, t = n;
  }
  e._pt = i;
}, Ut = /* @__PURE__ */ function() {
  function r(t, n, a, i, o, s, l, c, d) {
    this.t = n, this.s = i, this.c = o, this.p = a, this.r = s || Vp, this.d = l || this, this.set = c || Dl, this.pr = d || 0, this._next = t, t && (t._prev = this);
  }
  var e = r.prototype;
  return e.modifier = function(n, a, i) {
    this.mSet = this.mSet || this.set, this.set = ig, this.m = n, this.mt = i, this.tween = a;
  }, r;
}();
Dt(Ll + "parent,duration,ease,delay,overwrite,runBackwards,startAt,yoyo,immediateRender,repeat,repeatDelay,data,paused,reversed,lazy,callbackScope,stringFilter,id,yoyoEase,stagger,inherit,repeatRefresh,keyframes,autoRevert,scrollTrigger", function(r) {
  return Vl[r] = 1;
});
lr.TweenMax = lr.TweenLite = Ke;
lr.TimelineLite = lr.TimelineMax = Mt;
Ne = new Mt({
  sortChildren: !1,
  defaults: ci,
  autoRemoveChildren: !0,
  id: "root",
  smoothChildTiming: !0
});
sr.stringFilter = Ip;
var xa = [], Oo = {}, og = [], Tc = 0, sg = 0, Os = function(e) {
  return (Oo[e] || og).map(function(t) {
    return t();
  });
}, dl = function() {
  var e = Date.now(), t = [];
  e - Tc > 2 && (Os("matchMediaInit"), xa.forEach(function(n) {
    var a = n.queries, i = n.conditions, o, s, l, c;
    for (s in a)
      o = Gr.matchMedia(a[s]).matches, o && (l = 1), o !== i[s] && (i[s] = o, c = 1);
    c && (n.revert(), l && t.push(n));
  }), Os("matchMediaRevert"), t.forEach(function(n) {
    return n.onMatch(n, function(a) {
      return n.add(null, a);
    });
  }), Tc = e, Os("matchMedia"));
}, jp = /* @__PURE__ */ function() {
  function r(t, n) {
    this.selector = n && sl(n), this.data = [], this._r = [], this.isReverted = !1, this.id = sg++, t && this.add(t);
  }
  var e = r.prototype;
  return e.add = function(n, a, i) {
    Fe(n) && (i = a, a = n, n = Fe);
    var o = this, s = function() {
      var c = Oe, d = o.selector, u;
      return c && c !== o && c.data.push(o), i && (o.selector = sl(i)), Oe = o, u = a.apply(o, arguments), Fe(u) && o._r.push(u), Oe = c, o.selector = d, o.isReverted = !1, u;
    };
    return o.last = s, n === Fe ? s(o, function(l) {
      return o.add(null, l);
    }) : n ? o[n] = s : s;
  }, e.ignore = function(n) {
    var a = Oe;
    Oe = null, n(this), Oe = a;
  }, e.getTweens = function() {
    var n = [];
    return this.data.forEach(function(a) {
      return a instanceof r ? n.push.apply(n, a.getTweens()) : a instanceof Ke && !(a.parent && a.parent.data === "nested") && n.push(a);
    }), n;
  }, e.clear = function() {
    this._r.length = this.data.length = 0;
  }, e.kill = function(n, a) {
    var i = this;
    if (n ? function() {
      for (var s = i.getTweens(), l = i.data.length, c; l--; )
        c = i.data[l], c.data === "isFlip" && (c.revert(), c.getChildren(!0, !0, !1).forEach(function(d) {
          return s.splice(s.indexOf(d), 1);
        }));
      for (s.map(function(d) {
        return {
          g: d._dur || d._delay || d._sat && !d._sat.vars.immediateRender ? d.globalTime(0) : -1 / 0,
          t: d
        };
      }).sort(function(d, u) {
        return u.g - d.g || -1 / 0;
      }).forEach(function(d) {
        return d.t.revert(n);
      }), l = i.data.length; l--; )
        c = i.data[l], c instanceof Mt ? c.data !== "nested" && (c.scrollTrigger && c.scrollTrigger.revert(), c.kill()) : !(c instanceof Ke) && c.revert && c.revert(n);
      i._r.forEach(function(d) {
        return d(n, i);
      }), i.isReverted = !0;
    }() : this.data.forEach(function(s) {
      return s.kill && s.kill();
    }), this.clear(), a)
      for (var o = xa.length; o--; )
        xa[o].id === this.id && xa.splice(o, 1);
  }, e.revert = function(n) {
    this.kill(n || {});
  }, r;
}(), lg = /* @__PURE__ */ function() {
  function r(t) {
    this.contexts = [], this.scope = t, Oe && Oe.data.push(this);
  }
  var e = r.prototype;
  return e.add = function(n, a, i) {
    tn(n) || (n = {
      matches: n
    });
    var o = new jp(0, i || this.scope), s = o.conditions = {}, l, c, d;
    Oe && !o.selector && (o.selector = Oe.selector), this.contexts.push(o), a = o.add("onMatch", a), o.queries = n;
    for (c in n)
      c === "all" ? d = 1 : (l = Gr.matchMedia(n[c]), l && (xa.indexOf(o) < 0 && xa.push(o), (s[c] = l.matches) && (d = 1), l.addListener ? l.addListener(dl) : l.addEventListener("change", dl)));
    return d && a(o, function(u) {
      return o.add(null, u);
    }), this;
  }, e.revert = function(n) {
    this.kill(n || {});
  }, e.kill = function(n) {
    this.contexts.forEach(function(a) {
      return a.kill(n, !0);
    });
  }, r;
}(), jo = {
  registerPlugin: function() {
    for (var e = arguments.length, t = new Array(e), n = 0; n < e; n++)
      t[n] = arguments[n];
    t.forEach(function(a) {
      return zp(a);
    });
  },
  timeline: function(e) {
    return new Mt(e);
  },
  getTweensOf: function(e, t) {
    return Ne.getTweensOf(e, t);
  },
  getProperty: function(e, t, n, a) {
    at(e) && (e = vr(e)[0]);
    var i = ma(e || {}).get, o = n ? up : pp;
    return n === "native" && (n = ""), e && (t ? o((rr[t] && rr[t].get || i)(e, t, n, a)) : function(s, l, c) {
      return o((rr[s] && rr[s].get || i)(e, s, l, c));
    });
  },
  quickSetter: function(e, t, n) {
    if (e = vr(e), e.length > 1) {
      var a = e.map(function(d) {
        return Ht.quickSetter(d, t, n);
      }), i = a.length;
      return function(d) {
        for (var u = i; u--; )
          a[u](d);
      };
    }
    e = e[0] || {};
    var o = rr[t], s = ma(e), l = s.harness && (s.harness.aliases || {})[t] || t, c = o ? function(d) {
      var u = new o();
      Da._pt = 0, u.init(e, n ? d + n : d, Da, 0, [e]), u.render(1, u), Da._pt && Gl(1, Da);
    } : s.set(e, l);
    return o ? c : function(d) {
      return c(e, l, n ? d + n : d, s, 1);
    };
  },
  quickTo: function(e, t, n) {
    var a, i = Ht.to(e, cr((a = {}, a[t] = "+=0.1", a.paused = !0, a.stagger = 0, a), n || {})), o = function(l, c, d) {
      return i.resetTo(t, l, c, d);
    };
    return o.tween = i, o;
  },
  isTweening: function(e) {
    return Ne.getTweensOf(e, !0).length > 0;
  },
  defaults: function(e) {
    return e && e.ease && (e.ease = va(e.ease, ci.ease)), Sc(ci, e || {});
  },
  config: function(e) {
    return Sc(sr, e || {});
  },
  registerEffect: function(e) {
    var t = e.name, n = e.effect, a = e.plugins, i = e.defaults, o = e.extendTimeline;
    (a || "").split(",").forEach(function(s) {
      return s && !rr[s] && !lr[s] && Ki(t + " effect requires " + s + " plugin.");
    }), Is[t] = function(s, l, c) {
      return n(vr(s), cr(l || {}, i), c);
    }, o && (Mt.prototype[t] = function(s, l, c) {
      return this.add(Is[t](s, tn(l) ? l : (c = l) && {}, this), c);
    });
  },
  registerEase: function(e, t) {
    pe[e] = va(t);
  },
  parseEase: function(e, t) {
    return arguments.length ? va(e, t) : pe;
  },
  getById: function(e) {
    return Ne.getById(e);
  },
  exportRoot: function(e, t) {
    e === void 0 && (e = {});
    var n = new Mt(e), a, i;
    for (n.smoothChildTiming = Bt(e.smoothChildTiming), Ne.remove(n), n._dp = 0, n._time = n._tTime = Ne._time, a = Ne._first; a; )
      i = a._next, (t || !(!a._dur && a instanceof Ke && a.vars.onComplete === a._targets[0])) && Qr(n, a, a._start - a._delay), a = i;
    return Qr(Ne, n, 0), n;
  },
  context: function(e, t) {
    return e ? new jp(e, t) : Oe;
  },
  matchMedia: function(e) {
    return new lg(e);
  },
  matchMediaRefresh: function() {
    return xa.forEach(function(e) {
      var t = e.conditions, n, a;
      for (a in t)
        t[a] && (t[a] = !1, n = 1);
      n && e.revert();
    }) || dl();
  },
  addEventListener: function(e, t) {
    var n = Oo[e] || (Oo[e] = []);
    ~n.indexOf(t) || n.push(t);
  },
  removeEventListener: function(e, t) {
    var n = Oo[e], a = n && n.indexOf(t);
    a >= 0 && n.splice(a, 1);
  },
  utils: {
    wrap: jh,
    wrapYoyo: Fh,
    distribute: xp,
    random: wp,
    snap: yp,
    normalize: Yh,
    getUnit: yt,
    clamp: Nh,
    splitColor: Ep,
    toArray: vr,
    selector: sl,
    mapRange: Ap,
    pipe: Vh,
    unitize: Lh,
    interpolate: Bh,
    shuffle: vp
  },
  install: op,
  effects: Is,
  ticker: nr,
  updateRoot: Mt.updateRoot,
  plugins: rr,
  globalTimeline: Ne,
  core: {
    PropTween: Ut,
    globals: sp,
    Tween: Ke,
    Timeline: Mt,
    Animation: Ji,
    getCache: ma,
    _removeLinkedListItem: Wo,
    reverting: function() {
      return ft;
    },
    context: function(e) {
      return e && Oe && (Oe.data.push(e), e._ctx = Oe), Oe;
    },
    suppressOverwrites: function(e) {
      return Ol = e;
    }
  }
};
Dt("to,from,fromTo,delayedCall,set,killTweensOf", function(r) {
  return jo[r] = Ke[r];
});
nr.add(Mt.updateRoot);
Da = jo.to({}, {
  duration: 0
});
var cg = function(e, t) {
  for (var n = e._pt; n && n.p !== t && n.op !== t && n.fp !== t; )
    n = n._next;
  return n;
}, dg = function(e, t) {
  var n = e._targets, a, i, o;
  for (a in t)
    for (i = n.length; i--; )
      o = e._ptLookup[i][a], o && (o = o.d) && (o._pt && (o = cg(o, a)), o && o.modifier && o.modifier(t[a], e, n[i], a));
}, Ps = function(e, t) {
  return {
    name: e,
    headless: 1,
    rawVars: 1,
    //don't pre-process function-based values or "random()" strings.
    init: function(a, i, o) {
      o._onInit = function(s) {
        var l, c;
        if (at(i) && (l = {}, Dt(i, function(d) {
          return l[d] = 1;
        }), i = l), t) {
          l = {};
          for (c in i)
            l[c] = t(i[c]);
          i = l;
        }
        dg(s, i);
      };
    }
  };
}, Ht = jo.registerPlugin({
  name: "attr",
  init: function(e, t, n, a, i) {
    var o, s, l;
    this.tween = n;
    for (o in t)
      l = e.getAttribute(o) || "", s = this.add(e, "setAttribute", (l || 0) + "", t[o], a, i, 0, 0, o), s.op = o, s.b = l, this._props.push(o);
  },
  render: function(e, t) {
    for (var n = t._pt; n; )
      ft ? n.set(n.t, n.p, n.b, n) : n.r(e, n.d), n = n._next;
  }
}, {
  name: "endArray",
  headless: 1,
  init: function(e, t) {
    for (var n = t.length; n--; )
      this.add(e, n, e[n] || 0, t[n], 0, 0, 0, 0, 0, 1);
  }
}, Ps("roundProps", ll), Ps("modifiers"), Ps("snap", yp)) || jo;
Ke.version = Mt.version = Ht.version = "3.14.2";
ip = 1;
ql() && fi();
pe.Power0;
pe.Power1;
pe.Power2;
pe.Power3;
pe.Power4;
pe.Linear;
pe.Quad;
pe.Cubic;
pe.Quart;
pe.Quint;
pe.Strong;
pe.Elastic;
pe.Back;
pe.SteppedEase;
pe.Bounce;
pe.Sine;
pe.Expo;
pe.Circ;
/*!
 * CSSPlugin 3.14.2
 * https://gsap.com
 *
 * Copyright 2008-2025, GreenSock. All rights reserved.
 * Subject to the terms at https://gsap.com/standard-license
 * @author: Jack Doyle, jack@greensock.com
*/
var Mc, Vn, Xa, Xl, da, Cc, Hl, pg = function() {
  return typeof window < "u";
}, xn = {}, oa = 180 / Math.PI, Ha = Math.PI / 180, Va = Math.atan2, Oc = 1e8, Kl = /([A-Z])/g, ug = /(left|right|width|margin|padding|x)/i, fg = /[\s,\(]\S/, Jr = {
  autoAlpha: "opacity,visibility",
  scale: "scaleX,scaleY",
  alpha: "opacity"
}, pl = function(e, t) {
  return t.set(t.t, t.p, Math.round((t.s + t.c * e) * 1e4) / 1e4 + t.u, t);
}, hg = function(e, t) {
  return t.set(t.t, t.p, e === 1 ? t.e : Math.round((t.s + t.c * e) * 1e4) / 1e4 + t.u, t);
}, gg = function(e, t) {
  return t.set(t.t, t.p, e ? Math.round((t.s + t.c * e) * 1e4) / 1e4 + t.u : t.b, t);
}, mg = function(e, t) {
  return t.set(t.t, t.p, e === 1 ? t.e : e ? Math.round((t.s + t.c * e) * 1e4) / 1e4 + t.u : t.b, t);
}, bg = function(e, t) {
  var n = t.s + t.c * e;
  t.set(t.t, t.p, ~~(n + (n < 0 ? -0.5 : 0.5)) + t.u, t);
}, Fp = function(e, t) {
  return t.set(t.t, t.p, e ? t.e : t.b, t);
}, Bp = function(e, t) {
  return t.set(t.t, t.p, e !== 1 ? t.b : t.e, t);
}, vg = function(e, t, n) {
  return e.style[t] = n;
}, xg = function(e, t, n) {
  return e.style.setProperty(t, n);
}, yg = function(e, t, n) {
  return e._gsap[t] = n;
}, wg = function(e, t, n) {
  return e._gsap.scaleX = e._gsap.scaleY = n;
}, kg = function(e, t, n, a, i) {
  var o = e._gsap;
  o.scaleX = o.scaleY = n, o.renderTransform(i, o);
}, Ag = function(e, t, n, a, i) {
  var o = e._gsap;
  o[t] = n, o.renderTransform(i, o);
}, Re = "transform", Gt = Re + "Origin", Sg = function r(e, t) {
  var n = this, a = this.target, i = a.style, o = a._gsap;
  if (e in xn && i) {
    if (this.tfm = this.tfm || {}, e !== "transform")
      e = Jr[e] || e, ~e.indexOf(",") ? e.split(",").forEach(function(s) {
        return n.tfm[s] = hn(a, s);
      }) : this.tfm[e] = o.x ? o[e] : hn(a, e), e === Gt && (this.tfm.zOrigin = o.zOrigin);
    else
      return Jr.transform.split(",").forEach(function(s) {
        return r.call(n, s, t);
      });
    if (this.props.indexOf(Re) >= 0)
      return;
    o.svg && (this.svgo = a.getAttribute("data-svg-origin"), this.props.push(Gt, t, "")), e = Re;
  }
  (i || t) && this.props.push(e, t, i[e]);
}, Dp = function(e) {
  e.translate && (e.removeProperty("translate"), e.removeProperty("scale"), e.removeProperty("rotate"));
}, zg = function() {
  var e = this.props, t = this.target, n = t.style, a = t._gsap, i, o;
  for (i = 0; i < e.length; i += 3)
    e[i + 1] ? e[i + 1] === 2 ? t[e[i]](e[i + 2]) : t[e[i]] = e[i + 2] : e[i + 2] ? n[e[i]] = e[i + 2] : n.removeProperty(e[i].substr(0, 2) === "--" ? e[i] : e[i].replace(Kl, "-$1").toLowerCase());
  if (this.tfm) {
    for (o in this.tfm)
      a[o] = this.tfm[o];
    a.svg && (a.renderTransform(), t.setAttribute("data-svg-origin", this.svgo || "")), i = Hl(), (!i || !i.isStart) && !n[Re] && (Dp(n), a.zOrigin && n[Gt] && (n[Gt] += " " + a.zOrigin + "px", a.zOrigin = 0, a.renderTransform()), a.uncache = 1);
  }
}, Up = function(e, t) {
  var n = {
    target: e,
    props: [],
    revert: zg,
    save: Sg
  };
  return e._gsap || Ht.core.getCache(e), t && e.style && e.nodeType && t.split(",").forEach(function(a) {
    return n.save(a);
  }), n;
}, Gp, ul = function(e, t) {
  var n = Vn.createElementNS ? Vn.createElementNS((t || "http://www.w3.org/1999/xhtml").replace(/^https/, "http"), e) : Vn.createElement(e);
  return n && n.style ? n : Vn.createElement(e);
}, ir = function r(e, t, n) {
  var a = getComputedStyle(e);
  return a[t] || a.getPropertyValue(t.replace(Kl, "-$1").toLowerCase()) || a.getPropertyValue(t) || !n && r(e, hi(t) || t, 1) || "";
}, Pc = "O,Moz,ms,Ms,Webkit".split(","), hi = function(e, t, n) {
  var a = t || da, i = a.style, o = 5;
  if (e in i && !n)
    return e;
  for (e = e.charAt(0).toUpperCase() + e.substr(1); o-- && !(Pc[o] + e in i); )
    ;
  return o < 0 ? null : (o === 3 ? "ms" : o >= 0 ? Pc[o] : "") + e;
}, fl = function() {
  pg() && window.document && (Mc = window, Vn = Mc.document, Xa = Vn.documentElement, da = ul("div") || {
    style: {}
  }, ul("div"), Re = hi(Re), Gt = Re + "Origin", da.style.cssText = "border-width:0;line-height:0;position:absolute;padding:0", Gp = !!hi("perspective"), Hl = Ht.core.reverting, Xl = 1);
}, qc = function(e) {
  var t = e.ownerSVGElement, n = ul("svg", t && t.getAttribute("xmlns") || "http://www.w3.org/2000/svg"), a = e.cloneNode(!0), i;
  a.style.display = "block", n.appendChild(a), Xa.appendChild(n);
  try {
    i = a.getBBox();
  } catch {
  }
  return n.removeChild(a), Xa.removeChild(n), i;
}, Nc = function(e, t) {
  for (var n = t.length; n--; )
    if (e.hasAttribute(t[n]))
      return e.getAttribute(t[n]);
}, Xp = function(e) {
  var t, n;
  try {
    t = e.getBBox();
  } catch {
    t = qc(e), n = 1;
  }
  return t && (t.width || t.height) || n || (t = qc(e)), t && !t.width && !t.x && !t.y ? {
    x: +Nc(e, ["x", "cx", "x1"]) || 0,
    y: +Nc(e, ["y", "cy", "y1"]) || 0,
    width: 0,
    height: 0
  } : t;
}, Hp = function(e) {
  return !!(e.getCTM && (!e.parentNode || e.ownerSVGElement) && Xp(e));
}, Hn = function(e, t) {
  if (t) {
    var n = e.style, a;
    t in xn && t !== Gt && (t = Re), n.removeProperty ? (a = t.substr(0, 2), (a === "ms" || t.substr(0, 6) === "webkit") && (t = "-" + t), n.removeProperty(a === "--" ? t : t.replace(Kl, "-$1").toLowerCase())) : n.removeAttribute(t);
  }
}, Ln = function(e, t, n, a, i, o) {
  var s = new Ut(e._pt, t, n, 0, 1, o ? Bp : Fp);
  return e._pt = s, s.b = a, s.e = i, e._props.push(n), s;
}, Rc = {
  deg: 1,
  rad: 1,
  turn: 1
}, Eg = {
  grid: 1,
  flex: 1
}, Kn = function r(e, t, n, a) {
  var i = parseFloat(n) || 0, o = (n + "").trim().substr((i + "").length) || "px", s = da.style, l = ug.test(t), c = e.tagName.toLowerCase() === "svg", d = (c ? "client" : "offset") + (l ? "Width" : "Height"), u = 100, p = a === "px", h = a === "%", b, f, m, v;
  if (a === o || !i || Rc[a] || Rc[o])
    return i;
  if (o !== "px" && !p && (i = r(e, t, n, "px")), v = e.getCTM && Hp(e), (h || o === "%") && (xn[t] || ~t.indexOf("adius")))
    return b = v ? e.getBBox()[l ? "width" : "height"] : e[d], Ue(h ? i / b * u : i / 100 * b);
  if (s[l ? "width" : "height"] = u + (p ? o : a), f = a !== "rem" && ~t.indexOf("adius") || a === "em" && e.appendChild && !c ? e : e.parentNode, v && (f = (e.ownerSVGElement || {}).parentNode), (!f || f === Vn || !f.appendChild) && (f = Vn.body), m = f._gsap, m && h && m.width && l && m.time === nr.time && !m.uncache)
    return Ue(i / m.width * u);
  if (h && (t === "height" || t === "width")) {
    var k = e.style[t];
    e.style[t] = u + a, b = e[d], k ? e.style[t] = k : Hn(e, t);
  } else
    (h || o === "%") && !Eg[ir(f, "display")] && (s.position = ir(e, "position")), f === e && (s.position = "static"), f.appendChild(da), b = da[d], f.removeChild(da), s.position = "absolute";
  return l && h && (m = ma(f), m.time = nr.time, m.width = f[d]), Ue(p ? b * i / u : b && i ? u / b * i : 0);
}, hn = function(e, t, n, a) {
  var i;
  return Xl || fl(), t in Jr && t !== "transform" && (t = Jr[t], ~t.indexOf(",") && (t = t.split(",")[0])), xn[t] && t !== "transform" ? (i = eo(e, a), i = t !== "transformOrigin" ? i[t] : i.svg ? i.origin : Bo(ir(e, Gt)) + " " + i.zOrigin + "px") : (i = e.style[t], (!i || i === "auto" || a || ~(i + "").indexOf("calc(")) && (i = Fo[t] && Fo[t](e, t, n) || ir(e, t) || cp(e, t) || (t === "opacity" ? 1 : 0))), n && !~(i + "").trim().indexOf(" ") ? Kn(e, t, i, n) + n : i;
}, _g = function(e, t, n, a) {
  if (!n || n === "none") {
    var i = hi(t, e, 1), o = i && ir(e, i, 1);
    o && o !== n ? (t = i, n = o) : t === "borderColor" && (n = ir(e, "borderTopColor"));
  }
  var s = new Ut(this._pt, e.style, t, 0, 1, Lp), l = 0, c = 0, d, u, p, h, b, f, m, v, k, x, A, y;
  if (s.b = n, s.e = a, n += "", a += "", a.substring(0, 6) === "var(--" && (a = ir(e, a.substring(4, a.indexOf(")")))), a === "auto" && (f = e.style[t], e.style[t] = a, a = ir(e, t) || a, f ? e.style[t] = f : Hn(e, t)), d = [n, a], Ip(d), n = d[0], a = d[1], p = n.match(Ba) || [], y = a.match(Ba) || [], y.length) {
    for (; u = Ba.exec(a); )
      m = u[0], k = a.substring(l, u.index), b ? b = (b + 1) % 5 : (k.substr(-5) === "rgba(" || k.substr(-5) === "hsla(") && (b = 1), m !== (f = p[c++] || "") && (h = parseFloat(f) || 0, A = f.substr((h + "").length), m.charAt(1) === "=" && (m = Ga(h, m) + A), v = parseFloat(m), x = m.substr((v + "").length), l = Ba.lastIndex - x.length, x || (x = x || sr.units[t] || A, l === a.length && (a += x, s.e += x)), A !== x && (h = Kn(e, t, f, x) || 0), s._pt = {
        _next: s._pt,
        p: k || c === 1 ? k : ",",
        //note: SVG spec allows omission of comma/space when a negative sign is wedged between two numbers, like 2.5-5.3 instead of 2.5,-5.3 but when tweening, the negative value may switch to positive, so we insert the comma just in case.
        s: h,
        c: v - h,
        m: b && b < 4 || t === "zIndex" ? Math.round : 0
      });
    s.c = l < a.length ? a.substring(l, a.length) : "";
  } else
    s.r = t === "display" && a === "none" ? Bp : Fp;
  return ap.test(a) && (s.e = 0), this._pt = s, s;
}, Vc = {
  top: "0%",
  bottom: "100%",
  left: "0%",
  right: "100%",
  center: "50%"
}, Ig = function(e) {
  var t = e.split(" "), n = t[0], a = t[1] || "50%";
  return (n === "top" || n === "bottom" || a === "left" || a === "right") && (e = n, n = a, a = e), t[0] = Vc[n] || n, t[1] = Vc[a] || a, t.join(" ");
}, Tg = function(e, t) {
  if (t.tween && t.tween._time === t.tween._dur) {
    var n = t.t, a = n.style, i = t.u, o = n._gsap, s, l, c;
    if (i === "all" || i === !0)
      a.cssText = "", l = 1;
    else
      for (i = i.split(","), c = i.length; --c > -1; )
        s = i[c], xn[s] && (l = 1, s = s === "transformOrigin" ? Gt : Re), Hn(n, s);
    l && (Hn(n, Re), o && (o.svg && n.removeAttribute("transform"), a.scale = a.rotate = a.translate = "none", eo(n, 1), o.uncache = 1, Dp(a)));
  }
}, Fo = {
  clearProps: function(e, t, n, a, i) {
    if (i.data !== "isFromStart") {
      var o = e._pt = new Ut(e._pt, t, n, 0, 0, Tg);
      return o.u = a, o.pr = -10, o.tween = i, e._props.push(n), 1;
    }
  }
  /* className feature (about 0.4kb gzipped).
  , className(plugin, target, property, endValue, tween) {
  	let _renderClassName = (ratio, data) => {
  			data.css.render(ratio, data.css);
  			if (!ratio || ratio === 1) {
  				let inline = data.rmv,
  					target = data.t,
  					p;
  				target.setAttribute("class", ratio ? data.e : data.b);
  				for (p in inline) {
  					_removeProperty(target, p);
  				}
  			}
  		},
  		_getAllStyles = (target) => {
  			let styles = {},
  				computed = getComputedStyle(target),
  				p;
  			for (p in computed) {
  				if (isNaN(p) && p !== "cssText" && p !== "length") {
  					styles[p] = computed[p];
  				}
  			}
  			_setDefaults(styles, _parseTransform(target, 1));
  			return styles;
  		},
  		startClassList = target.getAttribute("class"),
  		style = target.style,
  		cssText = style.cssText,
  		cache = target._gsap,
  		classPT = cache.classPT,
  		inlineToRemoveAtEnd = {},
  		data = {t:target, plugin:plugin, rmv:inlineToRemoveAtEnd, b:startClassList, e:(endValue.charAt(1) !== "=") ? endValue : startClassList.replace(new RegExp("(?:\\s|^)" + endValue.substr(2) + "(?![\\w-])"), "") + ((endValue.charAt(0) === "+") ? " " + endValue.substr(2) : "")},
  		changingVars = {},
  		startVars = _getAllStyles(target),
  		transformRelated = /(transform|perspective)/i,
  		endVars, p;
  	if (classPT) {
  		classPT.r(1, classPT.d);
  		_removeLinkedListItem(classPT.d.plugin, classPT, "_pt");
  	}
  	target.setAttribute("class", data.e);
  	endVars = _getAllStyles(target, true);
  	target.setAttribute("class", startClassList);
  	for (p in endVars) {
  		if (endVars[p] !== startVars[p] && !transformRelated.test(p)) {
  			changingVars[p] = endVars[p];
  			if (!style[p] && style[p] !== "0") {
  				inlineToRemoveAtEnd[p] = 1;
  			}
  		}
  	}
  	cache.classPT = plugin._pt = new PropTween(plugin._pt, target, "className", 0, 0, _renderClassName, data, 0, -11);
  	if (style.cssText !== cssText) { //only apply if things change. Otherwise, in cases like a background-image that's pulled dynamically, it could cause a refresh. See https://gsap.com/forums/topic/20368-possible-gsap-bug-switching-classnames-in-chrome/.
  		style.cssText = cssText; //we recorded cssText before we swapped classes and ran _getAllStyles() because in cases when a className tween is overwritten, we remove all the related tweening properties from that class change (otherwise class-specific stuff can't override properties we've directly set on the target's style object due to specificity).
  	}
  	_parseTransform(target, true); //to clear the caching of transforms
  	data.css = new gsap.plugins.css();
  	data.css.init(target, changingVars, tween);
  	plugin._props.push(...data.css._props);
  	return 1;
  }
  */
}, $i = [1, 0, 0, 1, 0, 0], Kp = {}, Zp = function(e) {
  return e === "matrix(1, 0, 0, 1, 0, 0)" || e === "none" || !e;
}, Lc = function(e) {
  var t = ir(e, Re);
  return Zp(t) ? $i : t.substr(7).match(np).map(Ue);
}, Zl = function(e, t) {
  var n = e._gsap || ma(e), a = e.style, i = Lc(e), o, s, l, c;
  return n.svg && e.getAttribute("transform") ? (l = e.transform.baseVal.consolidate().matrix, i = [l.a, l.b, l.c, l.d, l.e, l.f], i.join(",") === "1,0,0,1,0,0" ? $i : i) : (i === $i && !e.offsetParent && e !== Xa && !n.svg && (l = a.display, a.display = "block", o = e.parentNode, (!o || !e.offsetParent && !e.getBoundingClientRect().width) && (c = 1, s = e.nextElementSibling, Xa.appendChild(e)), i = Lc(e), l ? a.display = l : Hn(e, "display"), c && (s ? o.insertBefore(e, s) : o ? o.appendChild(e) : Xa.removeChild(e))), t && i.length > 6 ? [i[0], i[1], i[4], i[5], i[12], i[13]] : i);
}, hl = function(e, t, n, a, i, o) {
  var s = e._gsap, l = i || Zl(e, !0), c = s.xOrigin || 0, d = s.yOrigin || 0, u = s.xOffset || 0, p = s.yOffset || 0, h = l[0], b = l[1], f = l[2], m = l[3], v = l[4], k = l[5], x = t.split(" "), A = parseFloat(x[0]) || 0, y = parseFloat(x[1]) || 0, w, M, T, E;
  n ? l !== $i && (M = h * m - b * f) && (T = A * (m / M) + y * (-f / M) + (f * k - m * v) / M, E = A * (-b / M) + y * (h / M) - (h * k - b * v) / M, A = T, y = E) : (w = Xp(e), A = w.x + (~x[0].indexOf("%") ? A / 100 * w.width : A), y = w.y + (~(x[1] || x[0]).indexOf("%") ? y / 100 * w.height : y)), a || a !== !1 && s.smooth ? (v = A - c, k = y - d, s.xOffset = u + (v * h + k * f) - v, s.yOffset = p + (v * b + k * m) - k) : s.xOffset = s.yOffset = 0, s.xOrigin = A, s.yOrigin = y, s.smooth = !!a, s.origin = t, s.originIsAbsolute = !!n, e.style[Gt] = "0px 0px", o && (Ln(o, s, "xOrigin", c, A), Ln(o, s, "yOrigin", d, y), Ln(o, s, "xOffset", u, s.xOffset), Ln(o, s, "yOffset", p, s.yOffset)), e.setAttribute("data-svg-origin", A + " " + y);
}, eo = function(e, t) {
  var n = e._gsap || new Op(e);
  if ("x" in n && !t && !n.uncache)
    return n;
  var a = e.style, i = n.scaleX < 0, o = "px", s = "deg", l = getComputedStyle(e), c = ir(e, Gt) || "0", d, u, p, h, b, f, m, v, k, x, A, y, w, M, T, E, j, K, X, Y, ie, me, ue, fe, Te, _e, it, Sr, dr, Wn, ht, zr;
  return d = u = p = f = m = v = k = x = A = 0, h = b = 1, n.svg = !!(e.getCTM && Hp(e)), l.translate && ((l.translate !== "none" || l.scale !== "none" || l.rotate !== "none") && (a[Re] = (l.translate !== "none" ? "translate3d(" + (l.translate + " 0 0").split(" ").slice(0, 3).join(", ") + ") " : "") + (l.rotate !== "none" ? "rotate(" + l.rotate + ") " : "") + (l.scale !== "none" ? "scale(" + l.scale.split(" ").join(",") + ") " : "") + (l[Re] !== "none" ? l[Re] : "")), a.scale = a.rotate = a.translate = "none"), M = Zl(e, n.svg), n.svg && (n.uncache ? (Te = e.getBBox(), c = n.xOrigin - Te.x + "px " + (n.yOrigin - Te.y) + "px", fe = "") : fe = !t && e.getAttribute("data-svg-origin"), hl(e, fe || c, !!fe || n.originIsAbsolute, n.smooth !== !1, M)), y = n.xOrigin || 0, w = n.yOrigin || 0, M !== $i && (K = M[0], X = M[1], Y = M[2], ie = M[3], d = me = M[4], u = ue = M[5], M.length === 6 ? (h = Math.sqrt(K * K + X * X), b = Math.sqrt(ie * ie + Y * Y), f = K || X ? Va(X, K) * oa : 0, k = Y || ie ? Va(Y, ie) * oa + f : 0, k && (b *= Math.abs(Math.cos(k * Ha))), n.svg && (d -= y - (y * K + w * Y), u -= w - (y * X + w * ie))) : (zr = M[6], Wn = M[7], it = M[8], Sr = M[9], dr = M[10], ht = M[11], d = M[12], u = M[13], p = M[14], T = Va(zr, dr), m = T * oa, T && (E = Math.cos(-T), j = Math.sin(-T), fe = me * E + it * j, Te = ue * E + Sr * j, _e = zr * E + dr * j, it = me * -j + it * E, Sr = ue * -j + Sr * E, dr = zr * -j + dr * E, ht = Wn * -j + ht * E, me = fe, ue = Te, zr = _e), T = Va(-Y, dr), v = T * oa, T && (E = Math.cos(-T), j = Math.sin(-T), fe = K * E - it * j, Te = X * E - Sr * j, _e = Y * E - dr * j, ht = ie * j + ht * E, K = fe, X = Te, Y = _e), T = Va(X, K), f = T * oa, T && (E = Math.cos(T), j = Math.sin(T), fe = K * E + X * j, Te = me * E + ue * j, X = X * E - K * j, ue = ue * E - me * j, K = fe, me = Te), m && Math.abs(m) + Math.abs(f) > 359.9 && (m = f = 0, v = 180 - v), h = Ue(Math.sqrt(K * K + X * X + Y * Y)), b = Ue(Math.sqrt(ue * ue + zr * zr)), T = Va(me, ue), k = Math.abs(T) > 2e-4 ? T * oa : 0, A = ht ? 1 / (ht < 0 ? -ht : ht) : 0), n.svg && (fe = e.getAttribute("transform"), n.forceCSS = e.setAttribute("transform", "") || !Zp(ir(e, Re)), fe && e.setAttribute("transform", fe))), Math.abs(k) > 90 && Math.abs(k) < 270 && (i ? (h *= -1, k += f <= 0 ? 180 : -180, f += f <= 0 ? 180 : -180) : (b *= -1, k += k <= 0 ? 180 : -180)), t = t || n.uncache, n.x = d - ((n.xPercent = d && (!t && n.xPercent || (Math.round(e.offsetWidth / 2) === Math.round(-d) ? -50 : 0))) ? e.offsetWidth * n.xPercent / 100 : 0) + o, n.y = u - ((n.yPercent = u && (!t && n.yPercent || (Math.round(e.offsetHeight / 2) === Math.round(-u) ? -50 : 0))) ? e.offsetHeight * n.yPercent / 100 : 0) + o, n.z = p + o, n.scaleX = Ue(h), n.scaleY = Ue(b), n.rotation = Ue(f) + s, n.rotationX = Ue(m) + s, n.rotationY = Ue(v) + s, n.skewX = k + s, n.skewY = x + s, n.transformPerspective = A + o, (n.zOrigin = parseFloat(c.split(" ")[2]) || !t && n.zOrigin || 0) && (a[Gt] = Bo(c)), n.xOffset = n.yOffset = 0, n.force3D = sr.force3D, n.renderTransform = n.svg ? Cg : Gp ? Qp : Mg, n.uncache = 0, n;
}, Bo = function(e) {
  return (e = e.split(" "))[0] + " " + e[1];
}, qs = function(e, t, n) {
  var a = yt(t);
  return Ue(parseFloat(t) + parseFloat(Kn(e, "x", n + "px", a))) + a;
}, Mg = function(e, t) {
  t.z = "0px", t.rotationY = t.rotationX = "0deg", t.force3D = 0, Qp(e, t);
}, ta = "0deg", Oi = "0px", ra = ") ", Qp = function(e, t) {
  var n = t || this, a = n.xPercent, i = n.yPercent, o = n.x, s = n.y, l = n.z, c = n.rotation, d = n.rotationY, u = n.rotationX, p = n.skewX, h = n.skewY, b = n.scaleX, f = n.scaleY, m = n.transformPerspective, v = n.force3D, k = n.target, x = n.zOrigin, A = "", y = v === "auto" && e && e !== 1 || v === !0;
  if (x && (u !== ta || d !== ta)) {
    var w = parseFloat(d) * Ha, M = Math.sin(w), T = Math.cos(w), E;
    w = parseFloat(u) * Ha, E = Math.cos(w), o = qs(k, o, M * E * -x), s = qs(k, s, -Math.sin(w) * -x), l = qs(k, l, T * E * -x + x);
  }
  m !== Oi && (A += "perspective(" + m + ra), (a || i) && (A += "translate(" + a + "%, " + i + "%) "), (y || o !== Oi || s !== Oi || l !== Oi) && (A += l !== Oi || y ? "translate3d(" + o + ", " + s + ", " + l + ") " : "translate(" + o + ", " + s + ra), c !== ta && (A += "rotate(" + c + ra), d !== ta && (A += "rotateY(" + d + ra), u !== ta && (A += "rotateX(" + u + ra), (p !== ta || h !== ta) && (A += "skew(" + p + ", " + h + ra), (b !== 1 || f !== 1) && (A += "scale(" + b + ", " + f + ra), k.style[Re] = A || "translate(0, 0)";
}, Cg = function(e, t) {
  var n = t || this, a = n.xPercent, i = n.yPercent, o = n.x, s = n.y, l = n.rotation, c = n.skewX, d = n.skewY, u = n.scaleX, p = n.scaleY, h = n.target, b = n.xOrigin, f = n.yOrigin, m = n.xOffset, v = n.yOffset, k = n.forceCSS, x = parseFloat(o), A = parseFloat(s), y, w, M, T, E;
  l = parseFloat(l), c = parseFloat(c), d = parseFloat(d), d && (d = parseFloat(d), c += d, l += d), l || c ? (l *= Ha, c *= Ha, y = Math.cos(l) * u, w = Math.sin(l) * u, M = Math.sin(l - c) * -p, T = Math.cos(l - c) * p, c && (d *= Ha, E = Math.tan(c - d), E = Math.sqrt(1 + E * E), M *= E, T *= E, d && (E = Math.tan(d), E = Math.sqrt(1 + E * E), y *= E, w *= E)), y = Ue(y), w = Ue(w), M = Ue(M), T = Ue(T)) : (y = u, T = p, w = M = 0), (x && !~(o + "").indexOf("px") || A && !~(s + "").indexOf("px")) && (x = Kn(h, "x", o, "px"), A = Kn(h, "y", s, "px")), (b || f || m || v) && (x = Ue(x + b - (b * y + f * M) + m), A = Ue(A + f - (b * w + f * T) + v)), (a || i) && (E = h.getBBox(), x = Ue(x + a / 100 * E.width), A = Ue(A + i / 100 * E.height)), E = "matrix(" + y + "," + w + "," + M + "," + T + "," + x + "," + A + ")", h.setAttribute("transform", E), k && (h.style[Re] = E);
}, Og = function(e, t, n, a, i) {
  var o = 360, s = at(i), l = parseFloat(i) * (s && ~i.indexOf("rad") ? oa : 1), c = l - a, d = a + c + "deg", u, p;
  return s && (u = i.split("_")[1], u === "short" && (c %= o, c !== c % (o / 2) && (c += c < 0 ? o : -o)), u === "cw" && c < 0 ? c = (c + o * Oc) % o - ~~(c / o) * o : u === "ccw" && c > 0 && (c = (c - o * Oc) % o - ~~(c / o) * o)), e._pt = p = new Ut(e._pt, t, n, a, c, hg), p.e = d, p.u = "deg", e._props.push(n), p;
}, Yc = function(e, t) {
  for (var n in t)
    e[n] = t[n];
  return e;
}, Pg = function(e, t, n) {
  var a = Yc({}, n._gsap), i = "perspective,force3D,transformOrigin,svgOrigin", o = n.style, s, l, c, d, u, p, h, b;
  a.svg ? (c = n.getAttribute("transform"), n.setAttribute("transform", ""), o[Re] = t, s = eo(n, 1), Hn(n, Re), n.setAttribute("transform", c)) : (c = getComputedStyle(n)[Re], o[Re] = t, s = eo(n, 1), o[Re] = c);
  for (l in xn)
    c = a[l], d = s[l], c !== d && i.indexOf(l) < 0 && (h = yt(c), b = yt(d), u = h !== b ? Kn(n, l, c, b) : parseFloat(c), p = parseFloat(d), e._pt = new Ut(e._pt, s, l, u, p - u, pl), e._pt.u = b || 0, e._props.push(l));
  Yc(s, a);
};
Dt("padding,margin,Width,Radius", function(r, e) {
  var t = "Top", n = "Right", a = "Bottom", i = "Left", o = (e < 3 ? [t, n, a, i] : [t + i, t + n, a + n, a + i]).map(function(s) {
    return e < 2 ? r + s : "border" + s + r;
  });
  Fo[e > 1 ? "border" + r : r] = function(s, l, c, d, u) {
    var p, h;
    if (arguments.length < 4)
      return p = o.map(function(b) {
        return hn(s, b, c);
      }), h = p.join(" "), h.split(p[0]).length === 5 ? p[0] : h;
    p = (d + "").split(" "), h = {}, o.forEach(function(b, f) {
      return h[b] = p[f] = p[f] || p[(f - 1) / 2 | 0];
    }), s.init(l, h, u);
  };
});
var Wp = {
  name: "css",
  register: fl,
  targetTest: function(e) {
    return e.style && e.nodeType;
  },
  init: function(e, t, n, a, i) {
    var o = this._props, s = e.style, l = n.vars.startAt, c, d, u, p, h, b, f, m, v, k, x, A, y, w, M, T, E;
    Xl || fl(), this.styles = this.styles || Up(e), T = this.styles.props, this.tween = n;
    for (f in t)
      if (f !== "autoRound" && (d = t[f], !(rr[f] && Pp(f, t, n, a, e, i)))) {
        if (h = typeof d, b = Fo[f], h === "function" && (d = d.call(n, a, e, i), h = typeof d), h === "string" && ~d.indexOf("random(") && (d = Qi(d)), b)
          b(this, e, f, d, n) && (M = 1);
        else if (f.substr(0, 2) === "--")
          c = (getComputedStyle(e).getPropertyValue(f) + "").trim(), d += "", Dn.lastIndex = 0, Dn.test(c) || (m = yt(c), v = yt(d), v ? m !== v && (c = Kn(e, f, c, v) + v) : m && (d += m)), this.add(s, "setProperty", c, d, a, i, 0, 0, f), o.push(f), T.push(f, 0, s[f]);
        else if (h !== "undefined") {
          if (l && f in l ? (c = typeof l[f] == "function" ? l[f].call(n, a, e, i) : l[f], at(c) && ~c.indexOf("random(") && (c = Qi(c)), yt(c + "") || c === "auto" || (c += sr.units[f] || yt(hn(e, f)) || ""), (c + "").charAt(1) === "=" && (c = hn(e, f))) : c = hn(e, f), p = parseFloat(c), k = h === "string" && d.charAt(1) === "=" && d.substr(0, 2), k && (d = d.substr(2)), u = parseFloat(d), f in Jr && (f === "autoAlpha" && (p === 1 && hn(e, "visibility") === "hidden" && u && (p = 0), T.push("visibility", 0, s.visibility), Ln(this, s, "visibility", p ? "inherit" : "hidden", u ? "inherit" : "hidden", !u)), f !== "scale" && f !== "transform" && (f = Jr[f], ~f.indexOf(",") && (f = f.split(",")[0]))), x = f in xn, x) {
            if (this.styles.save(f), E = d, h === "string" && d.substring(0, 6) === "var(--") {
              if (d = ir(e, d.substring(4, d.indexOf(")"))), d.substring(0, 5) === "calc(") {
                var j = e.style.perspective;
                e.style.perspective = d, d = ir(e, "perspective"), j ? e.style.perspective = j : Hn(e, "perspective");
              }
              u = parseFloat(d);
            }
            if (A || (y = e._gsap, y.renderTransform && !t.parseTransform || eo(e, t.parseTransform), w = t.smoothOrigin !== !1 && y.smooth, A = this._pt = new Ut(this._pt, s, Re, 0, 1, y.renderTransform, y, 0, -1), A.dep = 1), f === "scale")
              this._pt = new Ut(this._pt, y, "scaleY", y.scaleY, (k ? Ga(y.scaleY, k + u) : u) - y.scaleY || 0, pl), this._pt.u = 0, o.push("scaleY", f), f += "X";
            else if (f === "transformOrigin") {
              T.push(Gt, 0, s[Gt]), d = Ig(d), y.svg ? hl(e, d, 0, w, 0, this) : (v = parseFloat(d.split(" ")[2]) || 0, v !== y.zOrigin && Ln(this, y, "zOrigin", y.zOrigin, v), Ln(this, s, f, Bo(c), Bo(d)));
              continue;
            } else if (f === "svgOrigin") {
              hl(e, d, 1, w, 0, this);
              continue;
            } else if (f in Kp) {
              Og(this, y, f, p, k ? Ga(p, k + d) : d);
              continue;
            } else if (f === "smoothOrigin") {
              Ln(this, y, "smooth", y.smooth, d);
              continue;
            } else if (f === "force3D") {
              y[f] = d;
              continue;
            } else if (f === "transform") {
              Pg(this, d, e);
              continue;
            }
          } else f in s || (f = hi(f) || f);
          if (x || (u || u === 0) && (p || p === 0) && !fg.test(d) && f in s)
            m = (c + "").substr((p + "").length), u || (u = 0), v = yt(d) || (f in sr.units ? sr.units[f] : m), m !== v && (p = Kn(e, f, c, v)), this._pt = new Ut(this._pt, x ? y : s, f, p, (k ? Ga(p, k + u) : u) - p, !x && (v === "px" || f === "zIndex") && t.autoRound !== !1 ? bg : pl), this._pt.u = v || 0, x && E !== d ? (this._pt.b = c, this._pt.e = E, this._pt.r = mg) : m !== v && v !== "%" && (this._pt.b = c, this._pt.r = gg);
          else if (f in s)
            _g.call(this, e, f, c, k ? k + d : d);
          else if (f in e)
            this.add(e, f, c || e[f], k ? k + d : d, a, i);
          else if (f !== "parseTransform") {
            Rl(f, d);
            continue;
          }
          x || (f in s ? T.push(f, 0, s[f]) : typeof e[f] == "function" ? T.push(f, 2, e[f]()) : T.push(f, 1, c || e[f])), o.push(f);
        }
      }
    M && Yp(this);
  },
  render: function(e, t) {
    if (t.tween._time || !Hl())
      for (var n = t._pt; n; )
        n.r(e, n.d), n = n._next;
    else
      t.styles.revert();
  },
  get: hn,
  aliases: Jr,
  getSetter: function(e, t, n) {
    var a = Jr[t];
    return a && a.indexOf(",") < 0 && (t = a), t in xn && t !== Gt && (e._gsap.x || hn(e, "x")) ? n && Cc === n ? t === "scale" ? wg : yg : (Cc = n || {}) && (t === "scale" ? kg : Ag) : e.style && !Pl(e.style[t]) ? vg : ~t.indexOf("-") ? xg : Ul(e, t);
  },
  core: {
    _removeProperty: Hn,
    _getMatrix: Zl
  }
};
Ht.utils.checkPrefix = hi;
Ht.core.getStyleSaver = Up;
(function(r, e, t, n) {
  var a = Dt(r + "," + e + "," + t, function(i) {
    xn[i] = 1;
  });
  Dt(e, function(i) {
    sr.units[i] = "deg", Kp[i] = 1;
  }), Jr[a[13]] = r + "," + e, Dt(n, function(i) {
    var o = i.split(":");
    Jr[o[1]] = a[o[0]];
  });
})("x,y,z,scale,scaleX,scaleY,xPercent,yPercent", "rotation,rotationX,rotationY,skewX,skewY", "transform,transformOrigin,svgOrigin,force3D,smoothOrigin,transformPerspective", "0:translateX,1:translateY,2:translateZ,8:rotate,8:rotationZ,8:rotateZ,9:rotateX,10:rotateY");
Dt("x,y,z,top,right,bottom,left,width,height,fontSize,padding,margin,perspective", function(r) {
  sr.units[r] = "px";
});
Ht.registerPlugin(Wp);
var gl = Ht.registerPlugin(Wp) || Ht;
gl.core.Tween;
/**
 * @license lucide-svelte v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const qg = {
  xmlns: "http://www.w3.org/2000/svg",
  width: 24,
  height: 24,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": 2,
  "stroke-linecap": "round",
  "stroke-linejoin": "round"
};
var Ng = /* @__PURE__ */ Uf("<svg><!><!></svg>");
function $e(r, e) {
  const t = Ge(e, ["children", "$$slots", "$$events", "$$legacy"]), n = Ge(t, [
    "name",
    "color",
    "size",
    "strokeWidth",
    "absoluteStrokeWidth",
    "iconNode"
  ]);
  kl(e, !1);
  let a = mr(e, "name", 8, void 0), i = mr(e, "color", 8, "currentColor"), o = mr(e, "size", 8, 24), s = mr(e, "strokeWidth", 8, 2), l = mr(e, "absoluteStrokeWidth", 8, !1), c = mr(e, "iconNode", 24, () => []);
  const d = (...b) => b.filter((f, m, v) => !!f && v.indexOf(f) === m).join(" ");
  $d();
  var u = Ng();
  vc(
    u,
    (b, f) => ({
      ...qg,
      ...n,
      width: o(),
      height: o(),
      stroke: i(),
      "stroke-width": b,
      class: f
    }),
    [
      () => (Nr(l()), Nr(s()), Nr(o()), V(() => l() ? Number(s()) * 24 / Number(o()) : s())),
      () => (Nr(a()), Nr(t), V(() => d("lucide-icon", "lucide", a() ? `lucide-${a()}` : "", t.class)))
    ]
  );
  var p = S(u);
  Tt(p, 1, c, It, (b, f) => {
    var m = /* @__PURE__ */ hf(() => wu(g(f), 2));
    let v = () => g(m)[0], k = () => g(m)[1];
    var x = Ie(), A = ce(x);
    Wf(A, v, !0, (y, w) => {
      vc(y, () => ({ ...k() }));
    }), L(b, x);
  });
  var h = z(p);
  Ze(h, e, "default", {}), L(r, u), Al();
}
function On(r, e) {
  const t = Ge(e, ["children", "$$slots", "$$events", "$$legacy"]);
  /**
   * @license lucide-svelte v0.468.0 - ISC
   *
   * This source code is licensed under the ISC license.
   * See the LICENSE file in the root directory of this source tree.
   */
  const n = [
    ["path", { d: "m12 19-7-7 7-7" }],
    ["path", { d: "M19 12H5" }]
  ];
  $e(r, Je({ name: "arrow-left" }, () => t, {
    get iconNode() {
      return n;
    },
    children: (a, i) => {
      var o = Ie(), s = ce(o);
      Ze(s, e, "default", {}), L(a, o);
    },
    $$slots: { default: !0 }
  }));
}
function Ur(r, e) {
  const t = Ge(e, ["children", "$$slots", "$$events", "$$legacy"]);
  /**
   * @license lucide-svelte v0.468.0 - ISC
   *
   * This source code is licensed under the ISC license.
   * See the LICENSE file in the root directory of this source tree.
   */
  const n = [
    ["path", { d: "M7 17V7h10" }],
    ["path", { d: "M17 17 7 7" }]
  ];
  $e(r, Je({ name: "arrow-up-left" }, () => t, {
    get iconNode() {
      return n;
    },
    children: (a, i) => {
      var o = Ie(), s = ce(o);
      Ze(s, e, "default", {}), L(a, o);
    },
    $$slots: { default: !0 }
  }));
}
function La(r, e) {
  const t = Ge(e, ["children", "$$slots", "$$events", "$$legacy"]);
  /**
   * @license lucide-svelte v0.468.0 - ISC
   *
   * This source code is licensed under the ISC license.
   * See the LICENSE file in the root directory of this source tree.
   */
  const n = [
    ["path", { d: "M12 7v14" }],
    [
      "path",
      {
        d: "M3 18a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h5a4 4 0 0 1 4 4 4 4 0 0 1 4-4h5a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-6a3 3 0 0 0-3 3 3 3 0 0 0-3-3z"
      }
    ]
  ];
  $e(r, Je({ name: "book-open" }, () => t, {
    get iconNode() {
      return n;
    },
    children: (a, i) => {
      var o = Ie(), s = ce(o);
      Ze(s, e, "default", {}), L(a, o);
    },
    $$slots: { default: !0 }
  }));
}
function Ns(r, e) {
  const t = Ge(e, ["children", "$$slots", "$$events", "$$legacy"]);
  /**
   * @license lucide-svelte v0.468.0 - ISC
   *
   * This source code is licensed under the ISC license.
   * See the LICENSE file in the root directory of this source tree.
   */
  const n = [
    [
      "path",
      { d: "m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z" }
    ]
  ];
  $e(r, Je({ name: "bookmark" }, () => t, {
    get iconNode() {
      return n;
    },
    children: (a, i) => {
      var o = Ie(), s = ce(o);
      Ze(s, e, "default", {}), L(a, o);
    },
    $$slots: { default: !0 }
  }));
}
function Pi(r, e) {
  const t = Ge(e, ["children", "$$slots", "$$events", "$$legacy"]);
  /**
   * @license lucide-svelte v0.468.0 - ISC
   *
   * This source code is licensed under the ISC license.
   * See the LICENSE file in the root directory of this source tree.
   */
  const n = [["path", { d: "M20 6 9 17l-5-5" }]];
  $e(r, Je({ name: "check" }, () => t, {
    get iconNode() {
      return n;
    },
    children: (a, i) => {
      var o = Ie(), s = ce(o);
      Ze(s, e, "default", {}), L(a, o);
    },
    $$slots: { default: !0 }
  }));
}
function jc(r, e) {
  const t = Ge(e, ["children", "$$slots", "$$events", "$$legacy"]);
  /**
   * @license lucide-svelte v0.468.0 - ISC
   *
   * This source code is licensed under the ISC license.
   * See the LICENSE file in the root directory of this source tree.
   */
  const n = [["path", { d: "m15 18-6-6 6-6" }]];
  $e(r, Je({ name: "chevron-left" }, () => t, {
    get iconNode() {
      return n;
    },
    children: (a, i) => {
      var o = Ie(), s = ce(o);
      Ze(s, e, "default", {}), L(a, o);
    },
    $$slots: { default: !0 }
  }));
}
function Rg(r, e) {
  const t = Ge(e, ["children", "$$slots", "$$events", "$$legacy"]);
  /**
   * @license lucide-svelte v0.468.0 - ISC
   *
   * This source code is licensed under the ISC license.
   * See the LICENSE file in the root directory of this source tree.
   */
  const n = [
    [
      "path",
      {
        d: "m16.24 7.76-1.804 5.411a2 2 0 0 1-1.265 1.265L7.76 16.24l1.804-5.411a2 2 0 0 1 1.265-1.265z"
      }
    ],
    ["circle", { cx: "12", cy: "12", r: "10" }]
  ];
  $e(r, Je({ name: "compass" }, () => t, {
    get iconNode() {
      return n;
    },
    children: (a, i) => {
      var o = Ie(), s = ce(o);
      Ze(s, e, "default", {}), L(a, o);
    },
    $$slots: { default: !0 }
  }));
}
function Fc(r, e) {
  const t = Ge(e, ["children", "$$slots", "$$events", "$$legacy"]);
  /**
   * @license lucide-svelte v0.468.0 - ISC
   *
   * This source code is licensed under the ISC license.
   * See the LICENSE file in the root directory of this source tree.
   */
  const n = [
    [
      "rect",
      {
        width: "14",
        height: "14",
        x: "8",
        y: "8",
        rx: "2",
        ry: "2"
      }
    ],
    [
      "path",
      {
        d: "M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"
      }
    ]
  ];
  $e(r, Je({ name: "copy" }, () => t, {
    get iconNode() {
      return n;
    },
    children: (a, i) => {
      var o = Ie(), s = ce(o);
      Ze(s, e, "default", {}), L(a, o);
    },
    $$slots: { default: !0 }
  }));
}
function Vg(r, e) {
  const t = Ge(e, ["children", "$$slots", "$$events", "$$legacy"]);
  /**
   * @license lucide-svelte v0.468.0 - ISC
   *
   * This source code is licensed under the ISC license.
   * See the LICENSE file in the root directory of this source tree.
   */
  const n = [
    ["path", { d: "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" }],
    ["polyline", { points: "7 10 12 15 17 10" }],
    ["line", { x1: "12", x2: "12", y1: "15", y2: "3" }]
  ];
  $e(r, Je({ name: "download" }, () => t, {
    get iconNode() {
      return n;
    },
    children: (a, i) => {
      var o = Ie(), s = ce(o);
      Ze(s, e, "default", {}), L(a, o);
    },
    $$slots: { default: !0 }
  }));
}
function qi(r, e) {
  const t = Ge(e, ["children", "$$slots", "$$events", "$$legacy"]);
  /**
   * @license lucide-svelte v0.468.0 - ISC
   *
   * This source code is licensed under the ISC license.
   * See the LICENSE file in the root directory of this source tree.
   */
  const n = [
    ["path", { d: "M15 3h6v6" }],
    ["path", { d: "M10 14 21 3" }],
    [
      "path",
      {
        d: "M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"
      }
    ]
  ];
  $e(r, Je({ name: "external-link" }, () => t, {
    get iconNode() {
      return n;
    },
    children: (a, i) => {
      var o = Ie(), s = ce(o);
      Ze(s, e, "default", {}), L(a, o);
    },
    $$slots: { default: !0 }
  }));
}
function Lg(r, e) {
  const t = Ge(e, ["children", "$$slots", "$$events", "$$legacy"]);
  /**
   * @license lucide-svelte v0.468.0 - ISC
   *
   * This source code is licensed under the ISC license.
   * See the LICENSE file in the root directory of this source tree.
   */
  const n = [
    [
      "path",
      {
        d: "M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"
      }
    ],
    ["path", { d: "M14 2v4a2 2 0 0 0 2 2h4" }],
    ["path", { d: "M10 9H8" }],
    ["path", { d: "M16 13H8" }],
    ["path", { d: "M16 17H8" }]
  ];
  $e(r, Je({ name: "file-text" }, () => t, {
    get iconNode() {
      return n;
    },
    children: (a, i) => {
      var o = Ie(), s = ce(o);
      Ze(s, e, "default", {}), L(a, o);
    },
    $$slots: { default: !0 }
  }));
}
function pn(r, e) {
  const t = Ge(e, ["children", "$$slots", "$$events", "$$legacy"]);
  /**
   * @license lucide-svelte v0.468.0 - ISC
   *
   * This source code is licensed under the ISC license.
   * See the LICENSE file in the root directory of this source tree.
   */
  const n = [
    ["line", { x1: "6", x2: "6", y1: "3", y2: "15" }],
    ["circle", { cx: "18", cy: "6", r: "3" }],
    ["circle", { cx: "6", cy: "18", r: "3" }],
    ["path", { d: "M18 9a9 9 0 0 1-9 9" }]
  ];
  $e(r, Je({ name: "git-branch" }, () => t, {
    get iconNode() {
      return n;
    },
    children: (a, i) => {
      var o = Ie(), s = ce(o);
      Ze(s, e, "default", {}), L(a, o);
    },
    $$slots: { default: !0 }
  }));
}
function Rs(r, e) {
  const t = Ge(e, ["children", "$$slots", "$$events", "$$legacy"]);
  /**
   * @license lucide-svelte v0.468.0 - ISC
   *
   * This source code is licensed under the ISC license.
   * See the LICENSE file in the root directory of this source tree.
   */
  const n = [
    [
      "path",
      {
        d: "M12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83z"
      }
    ],
    [
      "path",
      {
        d: "M2 12a1 1 0 0 0 .58.91l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9A1 1 0 0 0 22 12"
      }
    ],
    [
      "path",
      {
        d: "M2 17a1 1 0 0 0 .58.91l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9A1 1 0 0 0 22 17"
      }
    ]
  ];
  $e(r, Je({ name: "layers" }, () => t, {
    get iconNode() {
      return n;
    },
    children: (a, i) => {
      var o = Ie(), s = ce(o);
      Ze(s, e, "default", {}), L(a, o);
    },
    $$slots: { default: !0 }
  }));
}
function Yg(r, e) {
  const t = Ge(e, ["children", "$$slots", "$$events", "$$legacy"]);
  /**
   * @license lucide-svelte v0.468.0 - ISC
   *
   * This source code is licensed under the ISC license.
   * See the LICENSE file in the root directory of this source tree.
   */
  const n = [
    [
      "rect",
      { width: "18", height: "18", x: "3", y: "3", rx: "2" }
    ],
    ["path", { d: "M15 3v18" }],
    ["path", { d: "m8 9 3 3-3 3" }]
  ];
  $e(r, Je({ name: "panel-right-close" }, () => t, {
    get iconNode() {
      return n;
    },
    children: (a, i) => {
      var o = Ie(), s = ce(o);
      Ze(s, e, "default", {}), L(a, o);
    },
    $$slots: { default: !0 }
  }));
}
function jg(r, e) {
  const t = Ge(e, ["children", "$$slots", "$$events", "$$legacy"]);
  /**
   * @license lucide-svelte v0.468.0 - ISC
   *
   * This source code is licensed under the ISC license.
   * See the LICENSE file in the root directory of this source tree.
   */
  const n = [
    [
      "path",
      { d: "M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" }
    ],
    ["path", { d: "M3 3v5h5" }]
  ];
  $e(r, Je({ name: "rotate-ccw" }, () => t, {
    get iconNode() {
      return n;
    },
    children: (a, i) => {
      var o = Ie(), s = ce(o);
      Ze(s, e, "default", {}), L(a, o);
    },
    $$slots: { default: !0 }
  }));
}
function Vs(r, e) {
  const t = Ge(e, ["children", "$$slots", "$$events", "$$legacy"]);
  /**
   * @license lucide-svelte v0.468.0 - ISC
   *
   * This source code is licensed under the ISC license.
   * See the LICENSE file in the root directory of this source tree.
   */
  const n = [
    ["circle", { cx: "11", cy: "11", r: "8" }],
    ["path", { d: "m21 21-4.3-4.3" }]
  ];
  $e(r, Je({ name: "search" }, () => t, {
    get iconNode() {
      return n;
    },
    children: (a, i) => {
      var o = Ie(), s = ce(o);
      Ze(s, e, "default", {}), L(a, o);
    },
    $$slots: { default: !0 }
  }));
}
function zo(r, e) {
  const t = Ge(e, ["children", "$$slots", "$$events", "$$legacy"]);
  /**
   * @license lucide-svelte v0.468.0 - ISC
   *
   * This source code is licensed under the ISC license.
   * See the LICENSE file in the root directory of this source tree.
   */
  const n = [
    [
      "path",
      {
        d: "M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"
      }
    ],
    ["path", { d: "m9 12 2 2 4-4" }]
  ];
  $e(r, Je({ name: "shield-check" }, () => t, {
    get iconNode() {
      return n;
    },
    children: (a, i) => {
      var o = Ie(), s = ce(o);
      Ze(s, e, "default", {}), L(a, o);
    },
    $$slots: { default: !0 }
  }));
}
function Fg(r, e) {
  const t = Ge(e, ["children", "$$slots", "$$events", "$$legacy"]);
  /**
   * @license lucide-svelte v0.468.0 - ISC
   *
   * This source code is licensed under the ISC license.
   * See the LICENSE file in the root directory of this source tree.
   */
  const n = [
    [
      "path",
      {
        d: "M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z"
      }
    ],
    ["path", { d: "M20 3v4" }],
    ["path", { d: "M22 5h-4" }],
    ["path", { d: "M4 17v2" }],
    ["path", { d: "M5 18H3" }]
  ];
  $e(r, Je({ name: "sparkles" }, () => t, {
    get iconNode() {
      return n;
    },
    children: (a, i) => {
      var o = Ie(), s = ce(o);
      Ze(s, e, "default", {}), L(a, o);
    },
    $$slots: { default: !0 }
  }));
}
function Bc(r, e) {
  const t = Ge(e, ["children", "$$slots", "$$events", "$$legacy"]);
  /**
   * @license lucide-svelte v0.468.0 - ISC
   *
   * This source code is licensed under the ISC license.
   * See the LICENSE file in the root directory of this source tree.
   */
  const n = [
    ["path", { d: "M18 6 6 18" }],
    ["path", { d: "m6 6 12 12" }]
  ];
  $e(r, Je({ name: "x" }, () => t, {
    get iconNode() {
      return n;
    },
    children: (a, i) => {
      var o = Ie(), s = ce(o);
      Ze(s, e, "default", {}), L(a, o);
    },
    $$slots: { default: !0 }
  }));
}
const Ni = [
  ["all", "الكتب الستة"],
  ["bukhari", "صحيح البخاري"],
  ["muslim", "صحيح مسلم"],
  ["abudawud", "سنن أبي داود"],
  ["tirmidhi", "جامع الترمذي"],
  ["nasai", "سنن النسائي"],
  ["ibnmajah", "سنن ابن ماجه"]
], Dc = "itqan:bukhari:1:1:bf026de7e155", na = [
  { name: "الإمام البخاري", detail: "المصنف · صحيح البخاري", quote: "نسبة الكتاب في ملف المصدر" },
  { name: "الحميدي عبد الله بن الزبير", detail: "الاسم كما ورد في النص", quote: "حَدَّثَنَا الْحُمَيْدِيُّ عَبْدُ اللَّهِ بْنُ الزُّبَيْرِ" },
  { name: "سفيان", detail: "الهوية التفصيلية تحتاج إلى توثيق", quote: "قَالَ : حَدَّثَنَا سُفْيَانُ" },
  { name: "يحيى بن سعيد الأنصاري", detail: "الاسم كما ورد في النص", quote: "قَالَ : حَدَّثَنَا يَحْيَى بْنُ سَعِيدٍ الْأَنْصَارِيُّ" },
  { name: "محمد بن إبراهيم التيمي", detail: "الاسم كما ورد في النص", quote: "قَالَ : أَخْبَرَنِي مُحَمَّدُ بْنُ إِبْرَاهِيمَ التَّيْمِيُّ" },
  { name: "علقمة بن وقاص الليثي", detail: "الاسم كما ورد في النص", quote: "أَنَّهُ سَمِعَ عَلْقَمَةَ بْنَ وَقَّاصٍ اللَّيْثِيَّ" },
  { name: "عمر بن الخطاب", detail: "رضي الله عنه · ورد اسمه في النص", quote: "يَقُولُ : سَمِعْتُ عُمَرَ بْنَ الْخَطَّابِ" },
  { name: "رسول الله ﷺ", detail: "طرف الرواية كما ورد في النص", quote: "قَالَ : سَمِعْتُ رَسُولَ اللَّهِ صَلَّى اللَّهُ عَلَيْهِ وَسَلَّمَ" }
];
var Bg = /* @__PURE__ */ W("<div><!><span> </span></div>"), Dg = /* @__PURE__ */ W('<section class="landing"><div class="ambient ambient-one"></div><div class="ambient ambient-two"></div> <header class="landing-nav"><button class="brand" aria-label="أثر — الصفحة الرئيسية"><span class="brand-symbol"><!></span><span class="wordmark">أثــر</span><span class="brand-caption">معرفةٌ يُستدلّ عليها</span></button> <nav class="landing-links" aria-label="التنقل"><button>رحلتك مع الحديث</button><button>منهجنا</button><span class="quiet-tag">تجربة تصميمية</span></nav> <div class="variant-actions"><button class="return-light">بيان السُّنّة · المحادثة <!></button><button class="return-light">الأصلية <!></button></div></header> <main><div class="hero"><div class="hero-copy" data-enter=""><div class="eyebrow"><span class="live-dot"></span> من سؤالٍ تتذكّره… إلى مصدرٍ تتبيّنه</div> <h1>كلُّ معرفةٍ<br/>تبدأ <em>بأثــر.</em></h1> <p class="hero-description">رحلة هادئة في رحاب الحديث النبوي.<br/>ابحث عن النص، افهم سياقه، وتأمّل الطريق إلى مصدره.</p> <div class="hero-actions"><button class="button mint">ابدأ رحلتك <!></button><button class="text-button light">ادخل مساحة الباحث <!></button></div> <div class="hero-note"><!><span>النص ومصدره أولًا. وما يحتاج إلى مراجعة، ظاهرٌ لك.</span></div></div> <div class="knowledge-orbit" aria-label="تصور بصري يربط سؤال المستخدم بمصادر الكتب الستة" data-enter=""><div class="orbit-caption">A CONNECTED JOURNEY OF KNOWLEDGE</div> <svg class="orbital-lines" viewBox="0 0 600 520" aria-hidden="true"><defs><radialGradient id="halo"><stop offset="0" stop-color="#6150ea" stop-opacity=".35"></stop><stop offset="1" stop-color="#6150ea" stop-opacity="0"></stop></radialGradient></defs><circle cx="300" cy="260" r="220" fill="url(#halo)"></circle><ellipse cx="300" cy="260" rx="252" ry="190" fill="none" stroke="#a9aad2" stroke-opacity=".19"></ellipse><ellipse cx="300" cy="260" rx="194" ry="139" fill="none" stroke="#a9aad2" stroke-opacity=".17"></ellipse><path class="orbit-trace" d="M300 80 Q565 165 300 443 Q35 345 300 80Z" fill="none" stroke="#2ef2c2" stroke-opacity=".4" stroke-dasharray="4 15"></path><path d="M150 110L300 260 472 148M90 270L300 260 495 346M208 437L300 260" fill="none" stroke="#b1a5fe" stroke-opacity=".23"></path></svg> <div class="orbit-core"><div class="core-glyph"><!></div><span>الكلمة… وأثرها</span><small>نص · فهم · مصدر</small></div> <!> <div class="orbit-footer"><span class="small-line"></span> ستة مصنّفات، ومساحة واحدة للاستكشاف <span class="small-line"></span></div></div></div> <section class="journeys" id="journeys" aria-labelledby="journeys-title"><div class="section-label" data-enter=""><span>مصادر واحدة. عدستان مختلفتان.</span><h2 id="journeys-title">اختر كيف تبدأ.</h2></div> <button class="journey-card" data-enter=""><span class="journey-number">01 / LEARN</span><div class="journey-heading"><!><h3>تعلّم وافهم</h3></div><p>أتذكّر كلمات، أريد فهم معنى،<br/>أبحث عن دليلٍ أشاركه بثقة.</p><span class="journey-bottom">للمتعلّم والمُعرّف بالإسلام <!></span></button> <button class="journey-card researcher" data-enter=""><span class="journey-number">02 / RESEARCH</span><div class="journey-heading"><!><h3>ابحث وقارن</h3></div><p>أجمع المواضع، أقارن الألفاظ،<br/>وأتتبّع الإسناد وشواهد الهوية.</p><span class="journey-bottom">للباحث والمتخصص <!></span></button></section> <section class="approach" id="approach"><span class="eyebrow">وضوحٌ في كل خطوة</span><h2>جمال التجربة، في وضوح الدليل.</h2><div class="approach-grid"><div><span>01</span><h3>اعثر على النص</h3><p>مطابقات من فهرس الكتب الستة، مع إبراز الكلمات التي تبحث عنها.</p></div><div><span>02</span><h3>افتح المصدر</h3><p>النص الأصلي، وموضعه في النسخة الرقمية، وحالة مراجعته.</p></div><div><span>03</span><h3>واصل على بيّنة</h3><p>اختيار محفوظ أثناء الفحص، ونسخٌ يحمل المصدر معه.</p></div></div></section></main> <footer class="landing-footer"><span class="wordmark">أثــر</span><span>تصوّر واجهة مشروع الحديث · هاكاثون الذكاء الاصطناعي الإسلامي</span><span>مشروع <b>بيان السنة</b></span></footer></section>'), Ug = /* @__PURE__ */ W('<button class="saved-item"><!><span> <small> </small></span><!></button>'), Gg = /* @__PURE__ */ W('<button class="button violet"><!> تصدير النصوص بمصادرها</button><div class="saved-list"></div>', 1), Xg = /* @__PURE__ */ W('<div class="empty-state"><!><h2>كلّ بحثٍ يبدأ باختيار.</h2><p>افتح أي نتيجة، ثم احفظها هنا مع مصدرها.</p><button class="button outline">ابدأ البحث <!></button></div>'), Hg = /* @__PURE__ */ W('<div class="page-heading" data-enter=""><span class="eyebrow">ما اخترتَ الاحتفاظ به</span><h1>دفتر المصادر</h1><p>نصوص ومراجع لهذه الجلسة. صدّرها للاحتفاظ بها.</p></div> <!>', 1), Kg = /* @__PURE__ */ W('<div class="welcome" data-enter=""><span class="welcome-emblem"><!></span><div class="eyebrow"> </div><h1> </h1><p> </p></div>'), Zg = /* @__PURE__ */ W('<div class="result-heading" data-enter=""><div><span class="eyebrow">رحلتك في الحديث</span><h1> </h1></div><button class="icon-button" aria-label="ابدأ بحثًا جديدًا"><!></button></div> <ol class="journey-steps"><li><span>01</span> ابحث</li><li><span>02</span> اختر النص</li><li><span>03</span> افحص المصدر</li><li><span>04</span> واصل الفهم</li></ol>', 1), Qg = /* @__PURE__ */ W("<option> </option>"), Wg = /* @__PURE__ */ W('<span class="spinner"></span>'), Jg = /* @__PURE__ */ W("<button> <!></button>"), $g = /* @__PURE__ */ W("<span> </span>"), em = /* @__PURE__ */ W('<div class="quick-examples" data-enter=""><span>جرّب أن تتذكّر</span><!></div><div class="usecases" data-enter=""><button><!><span>أتذكّر كلمات<small>من العبارة إلى موضع النص</small></span><!></button><button><!><span>أقارن الألفاظ<small>النتائج جنبًا إلى جنب</small></span><!></button><button><!><span>أستكشف الإسناد<small>مثال تفاعلي من صحيح البخاري</small></span><!></button></div><div class="source-strip"><span>نطاق الفهرس</span><!></div><div class="welcome-footnote"><!> نتائج البحث من نسخة Itqan الرقمية. الحكم على الصحة يحتاج إلى مصدر علمي مطابق.</div>', 1), tm = /* @__PURE__ */ W('<div class="error-box" role="alert"><h2>لم يكتمل البحث</h2><p> </p><button class="button outline">أعد المحاولة</button></div>'), rm = /* @__PURE__ */ W('<div class="loading-state" role="status"><span class="spinner"></span> نبحث عن أثر كلماتك في الفهرس…<div class="skeleton"></div><div class="skeleton"></div></div>'), nm = /* @__PURE__ */ W('<button class="button outline"> </button>'), am = /* @__PURE__ */ W('<div class="empty-state" data-enter=""><!><h2>لم نجد مطابقة في النطاق المختار.</h2><p>جرّب كلمات أقل أو نطاقًا أوسع. عدم العثور هنا لا يعني أن العبارة ليست حديثًا.</p><!></div>'), im = /* @__PURE__ */ W("<mark> </mark>"), om = /* @__PURE__ */ W('<button class="result-card" data-enter=""><div class="result-card-top"><span class="book-label"><!> </span><span class="result-index"> </span></div><h3> </h3><p class="hadith-snippet"></p><div class="result-card-bottom"><span> </span><!></div></button>'), sm = /* @__PURE__ */ W('<div class="results-meta"><h2>اختر النص الذي تقصده</h2><span> </span></div><div class="result-grid"></div><p class="small-note">المواضع قد تتضمن نسخًا مكررة من النص؛ عدد النتائج ليس عدد طرق الإسناد.</p>', 1), lm = /* @__PURE__ */ W('<span class="tab-dot"></span>'), cm = /* @__PURE__ */ W('<button role="tab"> <!></button>'), dm = /* @__PURE__ */ W("<mark> </mark>"), pm = /* @__PURE__ */ W('<details class="translation"><summary>الترجمة الإنجليزية في النسخة الرقمية</summary><p dir="ltr"> </p></details>'), um = /* @__PURE__ */ W('<div class="source-data"><p> </p><a target="_blank" rel="noreferrer">افتح ملف المصدر <!></a></div>'), fm = /* @__PURE__ */ W('<div class="text-lens"><span class="source-state"><span></span> نسخة رقمية · تحتاج إلى مراجعة على طبعة معتمدة</span><p class="full-hadith"></p><!><button class="source-disclosure"><!> بيانات المصدر والتتبّع <span> </span></button><!></div>'), hm = /* @__PURE__ */ W("<option> </option>"), gm = /* @__PURE__ */ W("<mark> </mark>"), mm = /* @__PURE__ */ W("<mark> </mark>"), bm = /* @__PURE__ */ W('<div class="comparison-columns"><article><span class="book-label"> </span><p></p><a target="_blank" rel="noreferrer">مصدر النص <!></a></article><article><span class="book-label"> </span><p></p><a target="_blank" rel="noreferrer">مصدر النص <!></a></article></div><p class="small-note">التظليل يبيّن كلمات البحث فقط؛ محاذاة الفروق آليًا مرحلة لاحقة.</p>', 1), vm = /* @__PURE__ */ W('<label class="compare-select">قارن النص المحدد مع <select></select></label><!>', 1), xm = /* @__PURE__ */ W('<div class="empty-state"><!><p>ابحث في نطاق أوسع للحصول على نص آخر للمقارنة.</p></div>'), ym = /* @__PURE__ */ W('<div class="comparison-lens"><p class="small-note">مقارنة بين نتائج البحث، وليست إثباتًا لوحدة الرواية أو استقلال الطريق.</p><!></div>'), wm = /* @__PURE__ */ W('<div class="chain-row"><span class="chain-index"> </span><button><span class="node-dot"></span><span> <small> </small></span><!></button></div>'), km = /* @__PURE__ */ W('<div class="chain-caption"><span>مسار واحد · من المصنف إلى طرف الرواية</span><button class="text-button"><!> Mermaid</button></div><p class="small-note">نقل يدوي لأسماء هذا السجل، قبل المراجعة العلمية. اختر اسمًا لفحص شاهده.</p><div class="chain-nodes"></div>', 1), Am = /* @__PURE__ */ W('<div class="empty-state"><!><h3>هذا المسار لم يُجهّز بعد.</h3><p>مثال الواجهة متاح لسجل «الأعمال بالنيات» في أول ملف صحيح البخاري. لن نرسم مسارًا تخمينيًا لهذا النص.</p><button class="button outline">افتح بحث المثال</button></div>'), Sm = /* @__PURE__ */ W('<div class="chain-lens"><!></div>'), zm = /* @__PURE__ */ W('<button class="text-button">كل النتائج <!></button>'), Em = /* @__PURE__ */ W('<div class="insight-icon"><!></div><span class="eyebrow">شاهد الاسم في السند</span><h2> </h2><blockquote> </blockquote><div class="insight-divider"></div><dl><dt>توثيق الهوية</dt><dd>لم يُربط بعد بترجمة موثّقة</dd><dt>الجرح والتعديل</dt><dd>لا يوجد حكم منقول في هذا المثال</dd><dt>المصدر</dt><dd> </dd></dl><a class="text-button" target="_blank" rel="noreferrer">راجع النص الأصلي <!></a>', 1), _m = /* @__PURE__ */ W('<div class="insight-icon"><!></div><span class="eyebrow">نافذة الدليل</span><h2>ماذا نعرف<br/>عن هذا النص؟</h2><ul class="evidence-checklist"><li><!><span>موضع رقمي محدد<small> </small></span></li><li><!><span>مرجع قابل للفحص<small> </small></span></li><li class="pending"><span class="hollow-dot"></span><span>المراجعة العلمية<small>لم تُنجز داخل هذه التجربة</small></span></li></ul><div class="insight-divider"></div><h3>خطوتك التالية</h3><p>افحص نتيجة الدرر، أو افتح النص المحدد في محادثة الأداة.</p><a class="button violet" target="_blank" rel="noreferrer">افتح في محادثة جديدة <!></a><small class="handoff-note">يفتح طلبًا جاهزًا؛ راجعه ثم أرسله.</small><a class="dorar-link" target="_blank" rel="noreferrer">ابحث عن العبارة في الدرر <!></a><p class="small-note">بحث مستقل؛ لم تُطابق أحكامه آليًا بهذا السجل.</p>', 1), Im = /* @__PURE__ */ W('<div class="evidence-layout" data-enter=""><section class="evidence-panel"><div class="evidence-header"><div><span class="eyebrow">النص الذي اخترته</span><h2> </h2><p> </p></div><button><!></button></div> <div class="evidence-tabs" role="tablist" aria-label="عدسات فحص النص"></div> <!> <div class="evidence-actions"><button class="button outline small"><!> </button><!></div></section><aside class="insight-panel"><!></aside></div>'), Tm = /* @__PURE__ */ W('<!> <form data-enter=""><div class="composer-input"><!><label class="sr-only" for="athar-query">الكلمات التي تتذكرها من الحديث</label><input id="athar-query" required="" autocomplete="off"/></div><div class="composer-bottom"><label class="collection-filter"><!><select aria-label="اختر مجموعة البحث"></select></label><span class="search-type">بحث في ألفاظ النص</span><button class="submit-search" aria-label="ابحث عن الحديث"><!></button></div></form> <!> <!> <!> <!> <!>', 1), Mm = /* @__PURE__ */ W('<div class="notice" role="status"> <button class="icon-button" aria-label="أغلق التنبيه"><!></button></div>'), Cm = /* @__PURE__ */ W('<div><aside><button class="mobile-only close-menu icon-button" aria-label="أغلق قائمة المساحة"><!></button> <button class="brand"><span class="brand-symbol"><!></span><span class="wordmark">أثــر</span><span class="lab-label">مختبر الواجهة</span></button> <button class="new-journey"><!> رحلة جديدة <span>+</span></button> <span class="sidebar-label">مساحتك المعرفية</span> <button><!> الاستكشاف</button> <button><!> دفتر المصادر <span class="count"> </span></button> <div class="side-separator"></div><span class="sidebar-label">عدسة العرض</span> <button><!><span>تعلّم وافهم<small>مسار مبسّط نحو المعنى</small></span><!></button> <button><!><span>ابحث وقارن<small>تفاصيل النص والمصدر</small></span><!></button> <div class="sidebar-bottom"><div class="integrity-note"><!><p>قيمة المعرفة<br/><strong>في إمكانية تتبّعها.</strong></p></div><span class="powered">مشروع بيان السنة</span></div></aside> <div class="workspace-body"><header class="workspace-top"><div class="breadcrumb"><button class="icon-button mobile-only" aria-label="افتح قائمة المساحة"><!></button><span> </span><!><strong> </strong></div><div class="top-actions"><button class="original-button">بيان السُّنّة · المحادثة <!></button><button class="original-button">الأصلية <!></button></div></header> <main class="workspace-main"><!> <!></main><footer class="workspace-footer"><span>أثــر / رحلة معرفية قابلة للتتبّع</span><span>تصميم تجريبي · البحث متصل بالفهرس المحلي</span></footer></div></div>'), Om = /* @__PURE__ */ W('<div class="athar" dir="rtl" lang="ar"><!></div>');
function Pm(r, e) {
  kl(e, !1);
  const t = /* @__PURE__ */ Ce(), n = /* @__PURE__ */ Ce(), a = /* @__PURE__ */ Ce();
  let i = mr(e, "apiBase", 8), o = mr(e, "webuiOrigin", 8), s = mr(e, "onClose", 8), l = mr(e, "onVariant2", 24, s), c = mr(e, "onReady", 8), d = /* @__PURE__ */ Ce(), u = /* @__PURE__ */ Ce("landing"), p = /* @__PURE__ */ Ce("learn"), h = /* @__PURE__ */ Ce(""), b = /* @__PURE__ */ Ce("all"), f = /* @__PURE__ */ Ce(!1), m = /* @__PURE__ */ Ce(""), v = /* @__PURE__ */ Ce(!1), k = /* @__PURE__ */ Ce(null), x = /* @__PURE__ */ Ce(null), A = /* @__PURE__ */ Ce("text"), y = /* @__PURE__ */ Ce(-1), w = /* @__PURE__ */ Ce(""), M = /* @__PURE__ */ Ce(!1), T = /* @__PURE__ */ Ce(!1), E = /* @__PURE__ */ Ce([]), j = /* @__PURE__ */ Ce(!1), K = /* @__PURE__ */ Ce(""), X = /* @__PURE__ */ Ce(!1), Y = 0, ie = null, me = /* @__PURE__ */ Ce(!1);
  const ue = ["الأعمال بالنيات", "فليقل خيرا أو ليصمت", "يسروا ولا تعسروا"];
  function fe(ee = "[data-enter]") {
    g(me) && g(d) && gl.fromTo(g(d).querySelectorAll(ee), { opacity: 0, y: 12 }, {
      opacity: 1,
      y: 0,
      duration: 0.45,
      stagger: 0.045,
      ease: "power3.out",
      clearProps: "transform"
    });
  }
  async function Te(ee) {
    var de;
    R(p, ee), R(u, "workspace"), R(X, !1), await Ri(), (de = g(d).closest("dialog")) == null || de.scrollTo({ top: 0 }), fe();
  }
  async function _e(ee = g(h)) {
    if (R(h, ee.trim()), !g(h) || g(f)) return;
    const de = ++Y;
    ie == null || ie.abort(), ie = new AbortController(), R(f, !0), R(m, ""), R(K, ""), R(v, !0), R(x, null), R(k, null), R(A, "text"), R(y, -1);
    try {
      const Me = await fetch(`${i()}/search?${new URLSearchParams({ query: g(h), collection: g(b) })}`, { signal: ie.signal, credentials: "omit" }), et = await Me.json();
      if (!Me.ok) throw new Error(et.message || "تعذّر الوصول إلى فهرس البحث.");
      if (de !== Y) return;
      R(k, et);
    } catch (Me) {
      Me.name !== "AbortError" && R(m, Me.message.includes("fetch") ? "خدمة البحث المحلية غير متاحة. شغّل خدمة تجربة الواجهة ثم أعد المحاولة." : Me.message);
    } finally {
      de === Y && (R(f, !1), await Ri(), fe(".result-card"));
    }
  }
  async function it(ee) {
    var de, Me, et;
    R(x, ee), R(A, "text"), R(y, -1), R(T, !1), R(w, ((Me = (de = g(k)) == null ? void 0 : de.results.find((wn) => wn.record_id !== ee.record_id)) == null ? void 0 : Me.record_id) || ""), await Ri(), (et = g(d).querySelector(".evidence-layout")) == null || et.scrollIntoView({
      block: "start",
      behavior: g(me) ? "smooth" : "instant"
    }), fe(".evidence-layout");
  }
  function Sr() {
    ie == null || ie.abort(), Y++, R(f, !1), R(k, null), R(x, null), R(v, !1), R(h, ""), R(m, ""), R(K, ""), R(M, !1);
  }
  function dr() {
    if (!g(x)) return;
    const ee = g(a);
    ee ? R(E, g(E).filter((de) => {
      var Me;
      return de.record_id !== ((Me = g(x)) == null ? void 0 : Me.record_id);
    })) : R(E, [...g(E), g(x)]), R(K, ee ? "أزيل النص من دفتر الجلسة." : "أضيف النص إلى دفتر هذه الجلسة.");
  }
  async function Wn() {
    if (g(x))
      try {
        await navigator.clipboard.writeText(`${g(x).arabic}

${g(x).citation}`), R(j, !0), setTimeout(() => R(j, !1), 2e3);
      } catch {
        R(K, "النسخ غير متاح في هذا المتصفح. يمكنك تحديد النص والمصدر ونسخهما.");
      }
  }
  function ht() {
    const ee = new Blob(
      [
        g(E).map((et) => `${et.arabic}

${et.citation}`).join(`

---

`)
      ],
      { type: "text/plain;charset=utf-8" }
    ), de = URL.createObjectURL(ee), Me = document.createElement("a");
    Me.href = de, Me.download = "athar-evidence.txt", Me.click(), setTimeout(() => URL.revokeObjectURL(de), 500);
  }
  function zr() {
    const ee = g(x) ? `افتح السجل ${g(x).record_id} باستخدام open_hadith_record واعرض مصدره وحالة المراجعة.` : `ابحث عن الحديث بالكلمات: ${g(h)}`;
    return `${o()}/?${new URLSearchParams({ model: "hadith-phrase-poc", q: ee, submit: "false" })}`;
  }
  function vi() {
    return `flowchart TD
` + na.map((ee, de) => `  N${de}["${ee.name}"]`).join(`
`) + `
` + na.slice(1).map((ee, de) => `  N${de} --> N${de + 1}`).join(`
`);
  }
  async function es() {
    try {
      await navigator.clipboard.writeText(vi()), R(K, "نُسخ مخطط هذا السجل فقط بصيغة Mermaid.");
    } catch {
      R(K, "تعذّر النسخ من المتصفح.");
    }
  }
  fh(() => {
    const ee = gl.matchMedia();
    return ee.add("(prefers-reduced-motion: no-preference)", () => (R(me, !0), fe(), () => {
      R(me, !1);
    })), c()((de) => {
      R(u, de), Ri().then(() => fe());
    }), () => {
      ee.revert(), ie == null || ie.abort();
    };
  }), ws(() => g(p), () => {
    R(t, g(p) === "research");
  }), ws(() => (g(k), g(w)), () => {
    var ee;
    R(n, (ee = g(k)) == null ? void 0 : ee.results.find((de) => de.record_id === g(w)));
  }), ws(() => (g(x), g(E)), () => {
    R(a, !!g(x) && g(E).some((ee) => {
      var de;
      return ee.record_id === ((de = g(x)) == null ? void 0 : de.record_id);
    }));
  }), _f(), $d();
  var yn = Om(), ts = S(yn);
  {
    var rs = (ee) => {
      var de = Dg(), Me = z(S(de), 3), et = S(Me), wn = S(et), Jn = S(wn);
      pn(Jn, { size: 24 });
      var _a = z(et, 2), Yr = S(_a), _ = z(Yr), C = z(_a, 2), q = S(C), B = z(S(q));
      Ur(B, { size: 16 });
      var N = z(q), P = z(S(N));
      Ur(P, { size: 16 });
      var F = z(Me, 2), U = S(F), H = S(U), G = z(S(H), 6), Z = S(G), D = z(S(Z));
      On(D, { size: 18 });
      var be = z(Z), Ve = z(S(be));
      Ur(Ve, { size: 17 });
      var gt = z(G, 2), Ct = S(gt);
      zo(Ct, { size: 16 });
      var Ot = z(H, 2), tt = z(S(Ot), 4), kn = S(tt), An = S(kn);
      pn(An, { size: 34, strokeWidth: 1 });
      var ot = z(tt, 2);
      Tt(
        ot,
        1,
        () => (Nr(Ni), V(() => Ni.slice(1))),
        It,
        (Pt, Fr, is) => {
          var wi = Bg();
          Lt(wi, 1, `book-orbit book-${is}`);
          var Ma = S(wi);
          La(Ma, { size: 17, strokeWidth: 1.2 });
          var os = z(Ma), uo = S(os);
          he(() => Q(uo, (g(Fr), V(() => g(Fr)[1])))), L(Pt, wi);
        }
      );
      var rn = z(U, 2), jr = z(S(rn), 2), Er = z(S(jr)), nn = S(Er);
      La(nn, { size: 26, strokeWidth: 1.3 });
      var yi = z(Er, 2), Ia = z(S(yi));
      On(Ia, { size: 19 });
      var Sn = z(jr, 2), Ta = z(S(Sn)), ns = S(Ta);
      pn(ns, { size: 26, strokeWidth: 1.3 });
      var po = z(Ta, 2), as = z(S(po));
      On(as, { size: 19 }), te("click", et, () => {
        R(u, "landing");
      }), te("click", Yr, () => {
        var Pt;
        return (Pt = g(d).querySelector("#journeys")) == null ? void 0 : Pt.scrollIntoView({ behavior: g(me) ? "smooth" : "instant" });
      }), te("click", _, () => {
        var Pt;
        return (Pt = g(d).querySelector("#approach")) == null ? void 0 : Pt.scrollIntoView({ behavior: g(me) ? "smooth" : "instant" });
      }), te("click", q, function(...Pt) {
        var Fr;
        (Fr = l()) == null || Fr.apply(this, Pt);
      }), te("click", N, function(...Pt) {
        var Fr;
        (Fr = s()) == null || Fr.apply(this, Pt);
      }), te("click", Z, () => Te("learn")), te("click", be, () => Te("research")), te("click", jr, () => Te("learn")), te("click", Sn, () => Te("research")), L(ee, de);
    }, xi = (ee) => {
      var de = Cm();
      let Me;
      var et = S(de);
      let wn;
      var Jn = S(et), _a = S(Jn);
      Bc(_a, { size: 18 });
      var Yr = z(Jn, 2), _ = S(Yr), C = S(_);
      pn(C, { size: 22 });
      var q = z(Yr, 2), B = S(q);
      Fg(B, { size: 16 });
      var N = z(q, 4);
      let P;
      var F = S(N);
      Rg(F, { size: 18 });
      var U = z(N, 2);
      let H;
      var G = S(U);
      Ns(G, { size: 18 });
      var Z = z(G, 2), D = S(Z), be = z(U, 5);
      let Ve;
      var gt = S(be);
      La(gt, { size: 17 });
      var Ct = z(gt, 2);
      {
        var Ot = (Le) => {
          Pi(Le, { size: 15 });
        };
        ye(Ct, (Le) => {
          g(t) || Le(Ot);
        });
      }
      var tt = z(be, 2);
      let kn;
      var An = S(tt);
      pn(An, { size: 17 });
      var ot = z(An, 2);
      {
        var rn = (Le) => {
          Pi(Le, { size: 15 });
        };
        ye(ot, (Le) => {
          g(t) && Le(rn);
        });
      }
      var jr = z(tt, 2), Er = S(jr), nn = S(Er);
      zo(nn, { size: 20 });
      var yi = z(et, 2), Ia = S(yi), Sn = S(Ia), Ta = S(Sn), ns = S(Ta);
      Yg(ns, { size: 20 });
      var po = z(Ta), as = S(po), Pt = z(po);
      jc(Pt, { size: 13 });
      var Fr = z(Pt), is = S(Fr), wi = z(Sn), Ma = S(wi), os = z(S(Ma));
      Ur(os, { size: 15 });
      var uo = z(Ma), eu = z(S(uo));
      Ur(eu, { size: 15 });
      var tu = z(Ia, 2), Jl = S(tu);
      {
        var ru = (Le) => {
          var qt = Hg(), $n = z(ce(qt), 2);
          {
            var Ca = (_r) => {
              var zn = Gg(), an = ce(zn), ea = S(an);
              Vg(ea, { size: 16 });
              var En = z(an);
              Tt(En, 5, () => g(E), It, (ss, _n) => {
                var Oa = Ug(), Pa = S(Oa);
                La(Pa, { size: 20 });
                var Ai = z(Pa), fo = S(Ai), ls = z(fo), cs = S(ls), ho = z(Ai);
                On(ho, { size: 17 }), he(() => {
                  Q(fo, (g(_n), V(() => g(_n).collection_label))), Q(cs, (g(_n), V(() => g(_n).chapter_title)));
                }), te("click", Oa, () => {
                  R(M, !1), it(g(_n)), R(v, !0);
                }), L(ss, Oa);
              }), te("click", an, ht), L(_r, zn);
            }, ki = (_r) => {
              var zn = Xg(), an = S(zn);
              Ns(an, { size: 36, strokeWidth: 1 });
              var ea = z(an, 3), En = z(S(ea));
              On(En, { size: 16 }), te("click", ea, () => R(M, !1)), L(_r, zn);
            };
            ye($n, (_r) => {
              g(E), V(() => g(E).length) ? _r(Ca) : _r(ki, -1);
            });
          }
          L(Le, qt);
        }, nu = (Le) => {
          var qt = Tm(), $n = ce(qt);
          {
            var Ca = ($) => {
              var we = Kg(), Be = S(we), St = S(Be);
              {
                var mt = (xe) => {
                  pn(xe, { size: 30, strokeWidth: 1.2 });
                }, st = (xe) => {
                  La(xe, { size: 30, strokeWidth: 1.2 });
                };
                ye(St, (xe) => {
                  g(t) ? xe(mt) : xe(st, -1);
                });
              }
              var bt = z(Be), Kt = S(bt), Nt = z(bt), vt = S(Nt), Rt = z(Nt), lt = S(Rt);
              he(() => {
                Q(Kt, g(t) ? "من موضع الرواية… إلى تفاصيلها" : "مساحةٌ للسؤال، وطريقٌ إلى المصدر"), Q(vt, g(t) ? "وراء كلّ نص، رحلة." : "ما الذي تتطلّع إلى معرفته؟"), Q(lt, g(t) ? "ابدأ بعبارة، واجمع نتائجها، ثم افحص النصوص وأسانيد المثال المتاح." : "ربما تتذكّر بضع كلمات. دعها تقودك إلى النص ومصدره.");
              }), L($, we);
            }, ki = ($) => {
              var we = Zg(), Be = ce(we), St = S(Be), mt = z(S(St)), st = S(mt), bt = z(St), Kt = S(bt);
              jg(Kt, { size: 19 });
              var Nt = z(Be, 2), vt = S(Nt);
              let Rt;
              var lt = z(vt);
              let xe;
              var In = z(lt);
              let Ir;
              he(() => {
                Q(st, g(x) ? "من النص، إلى الدليل." : "أثر الكلمات التي تذكّرتها."), Rt = Lt(vt, 1, "", null, Rt, { complete: g(v) }), xe = Lt(lt, 1, "", null, xe, { complete: !!g(x) }), Ir = Lt(In, 1, "", null, Ir, { complete: !!g(x) });
              }), te("click", bt, Sr), L($, we);
            };
            ye($n, ($) => {
              g(v) ? $(ki, -1) : $(Ca);
            });
          }
          var _r = z($n, 2);
          let zn;
          var an = S(_r), ea = S(an);
          Vs(ea, { size: 23, strokeWidth: 1.4 });
          var En = z(ea, 2);
          $t(En, "maxlength", 200);
          var ss = z(an), _n = S(ss), Oa = S(_n);
          Rs(Oa, { size: 15 });
          var Pa = z(Oa);
          Tt(Pa, 5, () => Ni, It, ($, we) => {
            var Be = Qg(), St = S(Be), mt = {};
            he(() => {
              Q(St, (g(we), V(() => g(we)[1]))), mt !== (mt = (g(we), V(() => g(we)[0]))) && (Be.value = (Be.__value = (g(we), V(() => g(we)[0]))) ?? "");
            }), L($, Be);
          });
          var Ai = z(_n, 2), fo = S(Ai);
          {
            var ls = ($) => {
              var we = Wg();
              L($, we);
            }, cs = ($) => {
              On($, { size: 20 });
            };
            ye(fo, ($) => {
              g(f) ? $(ls) : $(cs, -1);
            });
          }
          var ho = z(_r, 2);
          {
            var ou = ($) => {
              var we = em(), Be = ce(we), St = z(S(Be));
              Tt(St, 1, () => ue, It, (on, Br) => {
                var Dr = Jg(), sn = S(Dr), Si = z(sn);
                Ur(Si, { size: 13 }), he(() => Q(sn, `${g(Br) ?? ""} `)), te("click", Dr, () => _e(g(Br))), L(on, Dr);
              });
              var mt = z(Be), st = S(mt), bt = S(st);
              Vs(bt, { size: 20 });
              var Kt = z(bt, 2);
              Ur(Kt, { size: 16 });
              var Nt = z(st), vt = S(Nt);
              Rs(vt, { size: 20 });
              var Rt = z(vt, 2);
              Ur(Rt, { size: 16 });
              var lt = z(Nt), xe = S(lt);
              pn(xe, { size: 20 });
              var In = z(xe, 2);
              Ur(In, { size: 16 });
              var Ir = z(mt), qa = z(S(Ir));
              Tt(
                qa,
                1,
                () => (Nr(Ni), V(() => Ni.slice(1))),
                It,
                (on, Br) => {
                  var Dr = $g(), sn = S(Dr);
                  he(() => Q(sn, (g(Br), V(() => g(Br)[1])))), L(on, Dr);
                }
              );
              var Na = z(Ir), Ra = S(Na);
              zo(Ra, { size: 14 }), te("click", st, () => _e(ue[0])), te("click", Nt, () => {
                R(p, "research"), _e(ue[0]);
              }), te("click", lt, () => {
                R(p, "research"), _e(ue[0]), R(K, "اختر نتيجة صحيح البخاري، ثم افتح «الإسناد» لاستكشاف المثال.");
              }), L($, we);
            };
            ye(ho, ($) => {
              g(v) || $(ou);
            });
          }
          var $l = z(ho, 2);
          {
            var su = ($) => {
              var we = tm(), Be = z(S(we)), St = S(Be), mt = z(Be);
              he(() => Q(St, g(m))), te("click", mt, () => _e()), L($, we);
            };
            ye($l, ($) => {
              g(m) && $(su);
            });
          }
          var ec = z($l, 2);
          {
            var lu = ($) => {
              var we = rm();
              L($, we);
            };
            ye(ec, ($) => {
              g(f) && $(lu);
            });
          }
          var tc = z(ec, 2);
          {
            var cu = ($) => {
              var we = Ie(), Be = ce(we);
              {
                var St = (st) => {
                  var bt = am(), Kt = S(bt);
                  Vs(Kt, { size: 34, strokeWidth: 1 });
                  var Nt = z(Kt, 3);
                  Tt(
                    Nt,
                    1,
                    () => (g(k), V(() => g(k).suggestions)),
                    It,
                    (vt, Rt) => {
                      var lt = nm(), xe = S(lt);
                      he(() => Q(xe, `هل تقصد: ${g(Rt) ?? ""}؟`)), te("click", lt, () => _e(g(Rt))), L(vt, lt);
                    }
                  ), L(st, bt);
                }, mt = (st) => {
                  var bt = sm(), Kt = ce(bt), Nt = z(S(Kt)), vt = S(Nt), Rt = z(Kt);
                  Tt(Rt, 5, () => (g(k), V(() => g(k).results)), It, (lt, xe, In) => {
                    var Ir = om(), qa = S(Ir), Na = S(qa), Ra = S(Na);
                    La(Ra, { size: 14 });
                    var on = z(Ra, 1, !0), Br = z(Na), Dr = S(Br), sn = z(qa), Si = S(sn), go = z(sn);
                    Tt(go, 5, () => (g(xe), V(() => g(xe).snippet)), It, (zi, oe) => {
                      var Ee = Ie(), De = ce(Ee);
                      {
                        var zt = (ge) => {
                          var ve = im(), Xe = S(ve);
                          he(() => Q(Xe, (g(oe), V(() => g(oe).text)))), L(ge, ve);
                        }, Et = (ge) => {
                          var ve = ko();
                          he(() => Q(ve, (g(oe), V(() => g(oe).text)))), L(ge, ve);
                        };
                        ye(De, (ge) => {
                          g(oe), V(() => g(oe).match) ? ge(zt) : ge(Et, -1);
                        });
                      }
                      L(zi, Ee);
                    });
                    var ds = z(go), mo = S(ds), ps = S(mo), us = z(mo);
                    On(us, { size: 17 }), he(
                      (zi) => {
                        Q(on, (g(xe), V(() => g(xe).collection_label))), Q(Dr, zi), Q(Si, (g(xe), V(() => g(xe).chapter_title))), Q(ps, (g(xe), V(() => g(xe).match_label)));
                      },
                      [() => V(() => String(In + 1).padStart(2, "0"))]
                    ), te("click", Ir, () => it(g(xe))), L(lt, Ir);
                  }), he((lt, xe) => Q(vt, `${lt ?? ""} موضع بيانات · نعرض ${xe ?? ""}`), [
                    () => (g(k), V(() => g(k).total_matches.toLocaleString("ar"))),
                    () => (g(k), V(() => g(k).results.length.toLocaleString("ar")))
                  ]), L(st, bt);
                };
                ye(Be, (st) => {
                  g(k), V(() => !g(k).results.length) ? st(St) : g(x) || st(mt, 1);
                });
              }
              L($, we);
            };
            ye(tc, ($) => {
              g(k) && !g(f) && $(cu);
            });
          }
          var du = z(tc, 2);
          {
            var pu = ($) => {
              var we = Im(), Be = S(we), St = S(Be), mt = S(St), st = z(S(mt)), bt = S(st), Kt = z(st), Nt = S(Kt), vt = z(mt);
              let Rt;
              var lt = S(vt);
              Ns(lt, { size: 21 });
              var xe = z(St, 2);
              Tt(
                xe,
                4,
                () => [
                  ["text", "النص والمصدر"],
                  ["compare", "مقارنة الألفاظ"],
                  ["chain", "الإسناد"]
                ],
                It,
                (oe, Ee) => {
                  var De = cm(), zt = S(De), Et = z(zt);
                  {
                    var ge = (ve) => {
                      var Xe = lm();
                      L(ve, Xe);
                    };
                    ye(Et, (ve) => {
                      V(() => Ee[0] === "chain") && ve(ge);
                    });
                  }
                  he(() => {
                    $t(De, "aria-selected", (g(A), V(() => g(A) === Ee[0]))), Q(zt, V(() => Ee[1]));
                  }), te("click", De, () => {
                    R(A, Ee[0]), R(y, -1);
                  }), L(oe, De);
                }
              );
              var In = z(xe, 2);
              {
                var Ir = (oe) => {
                  var Ee = fm(), De = z(S(Ee));
                  Tt(
                    De,
                    5,
                    () => (g(x), V(() => g(x).arabic_parts)),
                    It,
                    (Ae, se) => {
                      var Ye = Ie(), _t = ce(Ye);
                      {
                        var ct = (xt) => {
                          var Zt = dm(), Tn = S(Zt);
                          he(() => Q(Tn, (g(se), V(() => g(se).text)))), L(xt, Zt);
                        }, dn = (xt) => {
                          var Zt = ko();
                          he(() => Q(Zt, (g(se), V(() => g(se).text)))), L(xt, Zt);
                        };
                        ye(_t, (xt) => {
                          g(se), V(() => g(se).match) ? xt(ct) : xt(dn, -1);
                        });
                      }
                      L(Ae, Ye);
                    }
                  );
                  var zt = z(De);
                  {
                    var Et = (Ae) => {
                      var se = pm(), Ye = z(S(se)), _t = S(Ye);
                      he(() => {
                        Q(_t, (g(x), V(() => g(x).english))), Ye.dir = Ye.dir;
                      }), L(Ae, se);
                    };
                    ye(zt, (Ae) => {
                      g(x), V(() => g(x).english) && Ae(Et);
                    });
                  }
                  var ge = z(zt), ve = S(ge);
                  Lg(ve, { size: 16 });
                  var Xe = z(ve, 2), Vt = S(Xe), ln = z(ge);
                  {
                    var cn = (Ae) => {
                      var se = um(), Ye = S(se), _t = S(Ye), ct = z(Ye), dn = z(S(ct));
                      qi(dn, { size: 14 }), he(() => {
                        Q(_t, (g(x), V(() => g(x).citation))), $t(ct, "href", (g(x), V(() => g(x).source_url)));
                      }), L(Ae, se);
                    };
                    ye(ln, (Ae) => {
                      g(T) && Ae(cn);
                    });
                  }
                  he(() => {
                    $t(ge, "aria-expanded", g(T)), Q(Vt, g(T) ? "−" : "+");
                  }), te("click", ge, () => R(T, !g(T))), L(oe, Ee);
                }, qa = (oe) => {
                  var Ee = ym(), De = z(S(Ee));
                  {
                    var zt = (ge) => {
                      var ve = vm(), Xe = ce(ve), Vt = z(S(Xe));
                      Tt(
                        Vt,
                        5,
                        () => (g(k), g(x), V(() => g(k).results.filter((Ae) => {
                          var se;
                          return Ae.record_id !== ((se = g(x)) == null ? void 0 : se.record_id);
                        }))),
                        It,
                        (Ae, se) => {
                          var Ye = hm(), _t = S(Ye), ct = {};
                          he(() => {
                            Q(_t, `${g(se), V(() => g(se).collection_label) ?? ""} · موضع ${g(se), V(() => g(se).source_position) ?? ""}`), ct !== (ct = (g(se), V(() => g(se).record_id))) && (Ye.value = (Ye.__value = (g(se), V(() => g(se).record_id))) ?? "");
                          }), L(Ae, Ye);
                        }
                      );
                      var ln = z(Xe);
                      {
                        var cn = (Ae) => {
                          var se = bm(), Ye = ce(se), _t = S(Ye), ct = S(_t), dn = S(ct), xt = z(ct);
                          Tt(
                            xt,
                            5,
                            () => (g(x), V(() => g(x).arabic_parts)),
                            It,
                            (hs, Qt) => {
                              var Ei = Ie(), gs = ce(Ei);
                              {
                                var ms = (Wt) => {
                                  var Tr = gm(), vs = S(Tr);
                                  he(() => Q(vs, (g(Qt), V(() => g(Qt).text)))), L(Wt, Tr);
                                }, bs = (Wt) => {
                                  var Tr = ko();
                                  he(() => Q(Tr, (g(Qt), V(() => g(Qt).text)))), L(Wt, Tr);
                                };
                                ye(gs, (Wt) => {
                                  g(Qt), V(() => g(Qt).match) ? Wt(ms) : Wt(bs, -1);
                                });
                              }
                              L(hs, Ei);
                            }
                          );
                          var Zt = z(xt), Tn = z(S(Zt));
                          qi(Tn, { size: 12 });
                          var bo = z(_t), vo = S(bo), fs = S(vo), xo = z(vo);
                          Tt(
                            xo,
                            5,
                            () => (g(n), V(() => g(n).arabic_parts)),
                            It,
                            (hs, Qt) => {
                              var Ei = Ie(), gs = ce(Ei);
                              {
                                var ms = (Wt) => {
                                  var Tr = mm(), vs = S(Tr);
                                  he(() => Q(vs, (g(Qt), V(() => g(Qt).text)))), L(Wt, Tr);
                                }, bs = (Wt) => {
                                  var Tr = ko();
                                  he(() => Q(Tr, (g(Qt), V(() => g(Qt).text)))), L(Wt, Tr);
                                };
                                ye(gs, (Wt) => {
                                  g(Qt), V(() => g(Qt).match) ? Wt(ms) : Wt(bs, -1);
                                });
                              }
                              L(hs, Ei);
                            }
                          );
                          var yo = z(xo), uu = z(S(yo));
                          qi(uu, { size: 12 }), he(() => {
                            Q(dn, (g(x), V(() => g(x).collection_label))), $t(Zt, "href", (g(x), V(() => g(x).source_url))), Q(fs, (g(n), V(() => g(n).collection_label))), $t(yo, "href", (g(n), V(() => g(n).source_url)));
                          }), L(Ae, se);
                        };
                        ye(ln, (Ae) => {
                          g(n) && Ae(cn);
                        });
                      }
                      bc(Vt, () => g(w), (Ae) => R(w, Ae)), L(ge, ve);
                    }, Et = (ge) => {
                      var ve = xm(), Xe = S(ve);
                      Rs(Xe, { size: 30 }), L(ge, ve);
                    };
                    ye(De, (ge) => {
                      g(k), V(() => g(k) && g(k).results.length > 1) ? ge(zt) : ge(Et, -1);
                    });
                  }
                  L(oe, Ee);
                }, Na = (oe) => {
                  var Ee = Sm(), De = S(Ee);
                  {
                    var zt = (ge) => {
                      var ve = km(), Xe = ce(ve), Vt = z(S(Xe)), ln = S(Vt);
                      Fc(ln, { size: 13 });
                      var cn = z(Xe, 2);
                      Tt(cn, 5, () => na, It, (Ae, se, Ye) => {
                        var _t = wm(), ct = S(_t), dn = S(ct), xt = z(ct);
                        let Zt;
                        var Tn = z(S(xt)), bo = S(Tn), vo = z(bo), fs = S(vo), xo = z(Tn);
                        jc(xo, { size: 15 }), he(
                          (yo) => {
                            Q(dn, yo), Zt = Lt(xt, 1, "", null, Zt, { "node-active": g(y) === Ye }), Q(bo, (g(se), V(() => g(se).name))), Q(fs, (g(se), V(() => g(se).detail)));
                          },
                          [() => V(() => String(Ye + 1).padStart(2, "0"))]
                        ), te("click", xt, () => R(y, Ye)), L(Ae, _t);
                      }), te("click", Vt, es), L(ge, ve);
                    }, Et = (ge) => {
                      var ve = Am(), Xe = S(ve);
                      pn(Xe, { size: 34, strokeWidth: 1 });
                      var Vt = z(Xe, 3);
                      te("click", Vt, () => {
                        R(b, "bukhari"), _e(ue[0]);
                      }), L(ge, ve);
                    };
                    ye(De, (ge) => {
                      g(x), Nr(Dc), V(() => g(x).record_id === Dc) ? ge(zt) : ge(Et, -1);
                    });
                  }
                  L(oe, Ee);
                };
                ye(In, (oe) => {
                  g(A) === "text" ? oe(Ir) : g(A) === "compare" ? oe(qa, 1) : oe(Na, -1);
                });
              }
              var Ra = z(In, 2), on = S(Ra), Br = S(on);
              {
                var Dr = (oe) => {
                  Pi(oe, { size: 15 });
                }, sn = (oe) => {
                  Fc(oe, { size: 15 });
                };
                ye(Br, (oe) => {
                  g(j) ? oe(Dr) : oe(sn, -1);
                });
              }
              var Si = z(Br, 1, !0), go = z(on);
              {
                var ds = (oe) => {
                  var Ee = zm(), De = z(S(Ee));
                  On(De, { size: 15 }), te("click", Ee, () => R(x, null)), L(oe, Ee);
                };
                ye(go, (oe) => {
                  g(k) && oe(ds);
                });
              }
              var mo = z(Be), ps = S(mo);
              {
                var us = (oe) => {
                  var Ee = Em(), De = ce(Ee), zt = S(De);
                  pn(zt, { size: 24 });
                  var Et = z(De, 2), ge = S(Et), ve = z(Et), Xe = S(ve), Vt = z(ve, 2), ln = z(S(Vt), 5), cn = S(ln), Ae = z(Vt), se = z(S(Ae));
                  qi(se, { size: 14 }), he(() => {
                    Q(ge, (Nr(na), g(y), V(() => na[g(y)].name))), Q(Xe, (Nr(na), g(y), V(() => na[g(y)].quote))), Q(cn, `${g(x), V(() => g(x).collection_label) ?? ""} · ${g(x), V(() => g(x).chapter_title) ?? ""}`), $t(Ae, "href", (g(x), V(() => g(x).source_url)));
                  }), L(oe, Ee);
                }, zi = (oe) => {
                  var Ee = _m(), De = ce(Ee), zt = S(De);
                  zo(zt, { size: 25, strokeWidth: 1.4 });
                  var Et = z(De, 3), ge = S(Et), ve = S(ge);
                  Pi(ve, { size: 15 });
                  var Xe = z(ve), Vt = z(S(Xe)), ln = S(Vt), cn = z(ge), Ae = S(cn);
                  Pi(Ae, { size: 15 });
                  var se = z(Ae), Ye = z(S(se)), _t = S(Ye), ct = z(Et, 4), dn = z(S(ct));
                  Ur(dn, { size: 15 });
                  var xt = z(ct, 2), Zt = z(S(xt));
                  qi(Zt, { size: 13 }), he(
                    (Tn) => {
                      Q(ln, (g(x), V(() => g(x).collection_label))), Q(_t, `نسخة Itqan · موضع ${g(x), V(() => g(x).source_position) ?? ""}`), $t(ct, "href", Tn), $t(xt, "href", (g(x), V(() => g(x).dorar_search_url)));
                    },
                    [() => V(zr)]
                  ), L(oe, Ee);
                };
                ye(ps, (oe) => {
                  g(y) >= 0 ? oe(us) : oe(zi, -1);
                });
              }
              he(() => {
                Q(bt, (g(x), V(() => g(x).collection_label))), Q(Nt, (g(x), V(() => g(x).chapter_title))), Rt = Lt(vt, 1, "icon-button", null, Rt, { saved: g(a) }), $t(vt, "aria-label", g(a) ? "أزل من دفتر المصادر" : "احفظ في دفتر المصادر"), Q(Si, g(j) ? "نُسخ مع المصدر" : "انسخ النص ومصدره");
              }), te("click", vt, dr), te("click", on, Wn), L($, we);
            };
            ye(du, ($) => {
              g(x) && $(pu);
            });
          }
          he(
            ($) => {
              zn = Lt(_r, 1, "search-composer", null, zn, { compact: g(v) }), $t(En, "placeholder", g(t) ? "أدخل ألفاظ المتن للبحث في الكتب الستة…" : "اكتب الكلمات التي تتذكّرها من الحديث…"), En.disabled = g(f), Pa.disabled = g(f), Ai.disabled = $;
            },
            [
              () => (g(f), g(h), V(() => g(f) || !g(h).trim()))
            ]
          ), lh(En, () => g(h), ($) => R(h, $)), bc(Pa, () => g(b), ($) => R(b, $)), te("submit", _r, dh(() => _e())), L(Le, qt);
        };
        ye(Jl, (Le) => {
          g(M) ? Le(ru) : Le(nu, -1);
        });
      }
      var au = z(Jl, 2);
      {
        var iu = (Le) => {
          var qt = Mm(), $n = S(qt), Ca = z($n), ki = S(Ca);
          Bc(ki, { size: 14 }), he(() => Q($n, g(K))), te("click", Ca, () => R(K, "")), L(Le, qt);
        };
        ye(au, (Le) => {
          g(K) && Le(iu);
        });
      }
      he(() => {
        Me = Lt(de, 1, "workspace", null, Me, { research: g(t) }), wn = Lt(et, 1, "sidebar", null, wn, { "mobile-open": g(X) }), P = Lt(N, 1, "sidebar-link", null, P, { "nav-active": !g(M) }), H = Lt(U, 1, "sidebar-link", null, H, { "nav-active": g(M) }), Q(D, (g(E), V(() => g(E).length))), Ve = Lt(be, 1, "persona-option", null, Ve, { chosen: !g(t) }), kn = Lt(tt, 1, "persona-option", null, kn, { chosen: g(t) }), Q(as, `مساحة ${g(t) ? "الباحث" : "المعرفة"}`), Q(is, g(M) ? "دفتر المصادر" : g(v) ? "من الكلمة إلى الدليل" : "بداية الرحلة");
      }), te("click", Jn, () => R(X, !1)), te("click", Yr, () => {
        R(u, "landing");
      }), te("click", q, Sr), te("click", N, () => {
        R(M, !1), R(X, !1);
      }), te("click", U, () => {
        R(M, !0), R(X, !1);
      }), te("click", be, () => {
        R(p, "learn");
      }), te("click", tt, () => {
        R(p, "research");
      }), te("click", Ta, () => R(X, !g(X))), te("click", Ma, function(...Le) {
        var qt;
        (qt = l()) == null || qt.apply(this, Le);
      }), te("click", uo, function(...Le) {
        var qt;
        (qt = s()) == null || qt.apply(this, Le);
      }), L(ee, de);
    };
    ye(ts, (ee) => {
      g(u) === "landing" ? ee(rs) : ee(xi, -1);
    });
  }
  ch(yn, (ee) => R(d, ee), () => g(d)), he(() => yn.dir = yn.dir), L(r, yn), Al();
}
const qm = ':host{--navy:#12183f;--violet:#6150ea;--mint:#2ef2c2;--paper:#f7f8fc;--ink:#202645;--muted:#777c92;--line:#e7e9f2;font-family:Readex,Segoe UI,sans-serif;color:var(--ink);font-weight:400;color-scheme:light}.athar-dialog{position:fixed;top:0;right:0;bottom:0;left:0;width:100vw;height:100dvh;max-width:none;max-height:none;margin:0;padding:0;border:0;background:var(--paper);color:var(--ink);overflow:auto;overscroll-behavior:contain}.athar-dialog::backdrop{background:#12183f99}.athar,*{box-sizing:border-box}button,input,select{font:inherit}button,a,input,select,summary{-webkit-tap-highlight-color:transparent}button{cursor:pointer}button:disabled{cursor:wait;opacity:.6}a{color:inherit;text-decoration:none}button{border:0}button,a{touch-action:manipulation}button:focus-visible,a:focus-visible,input:focus-visible,select:focus-visible,summary:focus-visible{outline:3px solid #9485ff;outline-offset:4px}h1,h2,h3,p{margin:0}svg{flex-shrink:0}button{color:inherit}mark{background:#dff6ed;color:#1c5c4b;border-radius:3px;padding:0 .1em}small{display:block}em{font-style:normal}.sr-only{position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0,0,0,0);white-space:nowrap;border:0}.landing{background:#101634;color:#f3f3fd;position:relative;overflow:hidden;min-height:100vh}.landing:before{content:"";position:absolute;top:0;right:0;bottom:0;left:0;pointer-events:none;opacity:.18;background-image:linear-gradient(#9294b418 1px,transparent 1px),linear-gradient(90deg,#9294b418 1px,transparent 1px);background-size:70px 70px;-webkit-mask-image:linear-gradient(#000,transparent 80%);mask-image:linear-gradient(#000,transparent 80%)}.ambient{position:absolute;border-radius:50%;pointer-events:none;filter:blur(90px)}.ambient-one{width:500px;height:500px;background:#5140a92b;top:80px;left:-170px}.ambient-two{width:350px;height:350px;background:#1e978c12;right:25%;top:430px}.landing-nav{position:relative;z-index:1;max-width:1460px;margin:auto;display:flex;justify-content:space-between;align-items:center;padding:32px 5.2%;gap:28px;border-bottom:1px solid #ffffff0d}.brand{display:flex;align-items:center;gap:13px;background:none;color:inherit;text-align:right}.brand-symbol{display:grid;place-items:center;width:40px;height:43px;border:1px solid #8b82ac55;border-radius:13px;color:#b2aaf3}.wordmark{font-family:Amiri,serif;font-size:37px;line-height:1.2;color:inherit}.brand-caption{font-size:11px;color:#a3a6bd;border-right:1px solid #ffffff25;padding-right:16px;margin-right:5px}.landing-links{display:flex;align-items:center;gap:35px;font-size:11px;color:#b9bdd1}.landing-links button:hover{color:var(--mint)}.quiet-tag{font-size:11px;color:#a7aad0;border:1px solid #ffffff16;border-radius:30px;padding:7px 11px}.return-light{display:flex;align-items:center;gap:12px;background:transparent;color:#d7d9e9;font-size:11px;white-space:nowrap}.hero{position:relative;display:grid;grid-template-columns:1fr 1fr;align-items:center;gap:30px;max-width:1340px;margin:auto;min-height:620px;padding:65px 5.2% 45px}.hero-copy{padding-bottom:20px}.eyebrow{display:flex;align-items:center;gap:9px;font-size:11px;line-height:1.8;font-weight:500;letter-spacing:.02em;color:#8d92ac}.hero-copy .eyebrow{color:#b0b4ce}.live-dot{width:5px;height:5px;border-radius:50%;background:var(--mint);box-shadow:0 0 18px #2ef2c266}.hero h1{font-family:Amiri,Georgia,serif;font-weight:400;font-size:clamp(60px,5.8vw,93px);line-height:1.2;letter-spacing:-2px;margin:25px 0 26px}.hero h1 em{color:#b4f0df}.hero-description{font-size:14px;line-height:2.25;color:#a9afc9}.hero-actions{display:flex;align-items:center;gap:28px;margin-top:33px}.button{display:inline-flex;align-items:center;justify-content:center;gap:15px;min-height:47px;border-radius:8px;padding:13px 24px;font-size:12px;font-weight:500;transition:transform .2s,box-shadow .2s,background .2s;line-height:1.7}.button:hover{transform:translateY(-2px)}.mint{background:var(--mint);color:#112f31;box-shadow:0 6px 28px #2ef2c213}.mint:hover{box-shadow:0 8px 30px #2ef2c22a}.text-button{background:transparent;display:inline-flex;align-items:center;justify-content:center;gap:9px;font-size:11px;color:var(--violet);padding:5px 0;line-height:1.8}.text-button.light{color:#d2cbee}.hero-note{display:flex;gap:9px;align-items:center;color:#838da9;font-size:11px;margin-top:34px}.knowledge-orbit{position:relative;min-width:0;height:510px;direction:ltr}.orbital-lines{position:absolute;top:0;right:0;bottom:0;left:0;width:100%;height:100%;overflow:visible}.orbit-caption{position:absolute;top:9px;left:0;width:100%;text-align:center;color:#777f9f;font:8px Readex,sans-serif;letter-spacing:3px}.orbit-core{position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);width:164px;height:164px;border:1px solid #bcb4ed32;border-radius:50%;background:radial-gradient(circle at 40% 0,#6150ea33,#18204680 70%);box-shadow:0 0 80px #6150ea24,inset 0 0 30px #8a72ec09;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:12px;color:#e3e0f9;font-size:14px;direction:rtl}.core-glyph{color:#b8e9e1}.orbit-core small{font-size:11px;color:#939dbd}.book-orbit{position:absolute;display:flex;align-items:center;justify-content:center;gap:12px;padding:15px 18px;background:linear-gradient(135deg,#222b5088,#1b2240ee);border:1px solid #8994c12e;border-radius:8px;box-shadow:0 10px 20px #030b1a33;direction:rtl;white-space:nowrap;font-size:11px;-webkit-backdrop-filter:blur(8px);backdrop-filter:blur(8px);color:#c6cbe0}.book-orbit svg{color:#b2a0e9}.book-0{top:16%;left:10%}.book-1{top:22%;right:0}.book-2{top:50%;left:0}.book-3{top:63%;right:1%}.book-4{bottom:10%;left:19%}.book-5{bottom:15%;right:10%}.orbit-footer{position:absolute;bottom:0;display:flex;gap:12px;align-items:center;justify-content:center;width:100%;font-size:11px;color:#7a859f;direction:rtl}.small-line{width:24px;height:1px;background:#68729466}.orbit-trace{animation:trace 45s linear infinite}@keyframes trace{to{stroke-dashoffset:380}}.journeys{display:grid;grid-template-columns:.8fr 1fr 1fr;gap:22px;max-width:1220px;padding:0 30px 78px;margin:auto;align-items:center;position:relative}.section-label>span{font-size:11px;color:#8d95b1}.section-label h2{font-family:Amiri,serif;font-weight:400;font-size:35px;margin-top:12px}.journey-card{position:relative;text-align:right;color:#dce0f1;background:linear-gradient(115deg,#22284955,#1a2141aa);border:1px solid #7788ac35;border-radius:12px;padding:24px 26px;min-height:220px;transition:transform .3s,border .3s,background .3s;overflow:hidden}.journey-card:hover{transform:translateY(-5px);border-color:#2ef2c255;background:#222c49}.journey-card.researcher:hover{border-color:#9b89fa80}.journey-number{font-size:11px;letter-spacing:2px;direction:ltr;display:block;text-align:right;color:#929bbb}.journey-heading{display:flex;gap:14px;align-items:center;margin:19px 0 12px;color:#c5eee4}.researcher .journey-heading{color:#c5baf6}.journey-heading h3{font-size:20px;font-weight:400}.journey-card p{font-size:11px;line-height:2;color:#949fbf}.journey-bottom{display:flex;justify-content:space-between;align-items:center;font-size:11px;margin-top:24px;padding-top:17px;border-top:1px solid #8991af24;color:#a7b1cd}.approach{padding:70px 6%;background:#0c132b;border-top:1px solid #ffffff0b;position:relative}.approach>.eyebrow{justify-content:center}.approach>h2{text-align:center;font-family:Amiri,serif;font-size:34px;font-weight:400;margin-top:10px}.approach-grid{max-width:1040px;margin:50px auto 0;display:grid;grid-template-columns:repeat(3,1fr);gap:65px}.approach-grid>div>span{color:#9184cb;font-size:11px}.approach-grid h3{font-size:15px;margin:16px 0 10px;color:#d8dced}.approach-grid p{font-size:11px;line-height:2;color:#858fae}.landing-footer{display:flex;align-items:center;justify-content:space-between;gap:20px;padding:27px 6%;color:#7c87a6;font-size:11px;border-top:1px solid #ffffff0b}.landing-footer .wordmark{font-size:27px;color:#b3bcd4}.landing-footer b{font-weight:400;color:#aab3cc}.workspace{min-height:100dvh;display:grid;grid-template-columns:238px minmax(0,1fr);background:var(--paper)}.sidebar{position:sticky;top:0;height:100dvh;background:var(--navy);color:#b4bdd6;padding:29px 20px;display:flex;flex-direction:column;z-index:3}.sidebar .brand{padding:0 8px}.sidebar .wordmark{font-size:34px;color:#fff}.sidebar .brand-symbol{width:33px;height:36px;border-color:#71669b66}.lab-label{font-size:11px;color:#8791b4;border-right:1px solid #8590b033;padding-right:12px;margin-right:auto;line-height:1.9;max-width:50px}.new-journey{display:flex;align-items:center;gap:11px;background:#ffffff0a;border:1px solid #7c84b038;padding:13px 15px;border-radius:8px;color:#d8dded;font-size:11px;margin:38px 0 33px}.new-journey span{margin-right:auto;color:#9ca9c8;font-size:19px}.new-journey:hover{background:#ffffff12}.sidebar-label{font-size:11px;color:#747f9f;display:block;margin:0 13px 16px}.sidebar-link{display:flex;align-items:center;gap:12px;padding:12px 14px;border-radius:7px;background:transparent;text-align:right;color:#9da9c7;font-size:11px;margin-bottom:7px}.sidebar-link.nav-active{color:#e5e3fd;background:#6150ea29}.sidebar-link.nav-active svg{color:#b4a7ff}.count{margin-right:auto;font-size:11px;background:#c6b9ff10;padding:3px 7px;border-radius:4px}.side-separator{height:1px;background:#acb5d619;margin:28px 12px}.persona-option{display:flex;align-items:center;gap:12px;background:transparent;text-align:right;padding:13px 12px;border:1px solid transparent;border-radius:8px;color:#aab4ce;font-size:11px;margin-bottom:9px}.persona-option small{color:#6f7d9f;font-size:11px;margin-top:7px}.persona-option.chosen{border-color:#94a1c133;background:#ffffff05;color:#e3e7f1}.persona-option>svg:last-child:not(:first-child){margin-right:auto;color:#90d3c1}.sidebar-bottom{margin-top:auto;padding:35px 11px 0}.integrity-note{display:flex;gap:13px;align-items:center;color:#7f8aa9}.integrity-note svg{color:#8c9fbb}.integrity-note p{font-size:11px;line-height:2}.integrity-note strong{font-weight:400;color:#adb8d0}.powered{margin-top:27px;display:block;font-size:11px;color:#667494;direction:ltr;text-align:right}.workspace-body{min-width:0;display:flex;flex-direction:column}.workspace-top{height:78px;display:flex;align-items:center;justify-content:space-between;padding:0 38px;gap:18px;border-bottom:1px solid var(--line);background:#fafbfecc}.breadcrumb{display:flex;align-items:center;gap:13px;font-size:11px;color:#9b9fb2}.breadcrumb strong{color:#555e7e;font-weight:400}.top-actions{display:flex;align-items:center;gap:22px}.preview-label{font-size:11px;color:#8b8ba3;display:flex;align-items:center;gap:6px;white-space:nowrap}.preview-label>span{width:4px;height:4px;background:#a493ec;border-radius:50%}.original-button{font-size:11px;border:1px solid #dadeea;border-radius:6px;background:transparent;padding:9px 11px;display:flex;gap:9px;align-items:center;white-space:nowrap}.workspace-main{width:100%;max-width:1210px;margin:0 auto;padding:36px 6% 45px;flex:1}.welcome{text-align:center;padding-top:23px}.welcome-emblem{width:62px;height:62px;display:grid;place-items:center;margin:0 auto 23px;border:1px solid #dcd7f5;border-radius:18px;background:linear-gradient(135deg,#fff,#edeafc);color:#8d7bd2;box-shadow:0 10px 35px #6150ea08}.welcome .eyebrow{justify-content:center;font-size:11px}.welcome h1,.page-heading h1{font-family:Amiri,serif;font-size:43px;font-weight:400;line-height:1.6;margin:12px 0 8px;color:var(--navy)}.welcome>p,.page-heading>p{font-size:11px;color:#85899f;line-height:2}.search-composer{max-width:805px;margin:33px auto 0;border:1px solid #dcdfea;background:#fff;border-radius:14px;padding:22px 22px 14px;box-shadow:0 10px 30px #313d6c05;transition:box-shadow .2s,border .2s}.search-composer:focus-within{border-color:#b6a9ed;box-shadow:0 6px 30px #6150ea0b}.composer-input{display:flex;align-items:center;gap:15px}.composer-input>svg{color:#999cb2}.composer-input input{width:100%;min-width:0;font-size:14px;line-height:2.1;outline:none!important;border:0;background:transparent;color:#343b5b}.composer-input input::placeholder{color:#a7abbc}.composer-bottom{display:flex;align-items:center;gap:15px;margin-top:23px}.collection-filter{display:flex;align-items:center;gap:7px;font-size:11px;color:#777d96}.collection-filter>select{border:0;background:transparent;color:inherit;outline:none;padding:4px;max-width:145px;font-size:11px}.search-type{font-size:11px;border-right:1px solid var(--line);padding-right:13px;color:#a8adbd}.submit-search{width:37px;height:37px;border-radius:9px;display:grid;place-items:center;background:var(--violet);color:#fff;margin-right:auto}.submit-search:disabled{opacity:.4;cursor:default}.quick-examples{display:flex;flex-wrap:wrap;align-items:center;justify-content:center;gap:10px;margin:16px auto 0;font-size:11px}.quick-examples>span{color:#9b9fb2;margin-left:5px}.quick-examples button{display:flex;align-items:center;gap:9px;font-size:11px;color:#7d8098;background:transparent;border:1px solid #e2e4ed;border-radius:30px;padding:7px 10px}.quick-examples button:hover{border-color:#b6ace1;color:var(--violet)}.usecases{display:grid;grid-template-columns:repeat(3,1fr);max-width:805px;gap:14px;margin:42px auto 0}.usecases button{display:flex;gap:13px;align-items:center;text-align:right;background:transparent;border:1px solid #e1e4ee;border-radius:9px;padding:18px 15px;transition:background .2s,transform .2s}.usecases button:hover{background:#fff;transform:translateY(-2px)}.usecases button>svg:first-child{color:#8f84ba}.usecases button>svg:last-child{margin-right:auto;color:#aab0c4}.usecases span{font-size:11px;color:#59617f}.usecases small{margin-top:7px;font-size:11px;color:#9b9fb4}.source-strip{display:flex;flex-wrap:wrap;justify-content:center;gap:18px;color:#a4a8ba;font-size:11px;margin:37px auto 0}.source-strip>span:first-child{color:#777e98}.welcome-footnote{display:flex;justify-content:center;align-items:center;gap:7px;color:#9fa6b9;font-size:11px;margin-top:24px;line-height:1.9;text-align:center}.workspace-footer{display:flex;justify-content:space-between;gap:16px;padding:18px 38px;font-size:11px;color:#a4aabe;border-top:1px solid #e8eaf2}.icon-button{display:grid;place-items:center;border:1px solid transparent;border-radius:6px;padding:7px;color:#8a90a7;background:transparent}.icon-button:hover{background:#ededf7}.icon-button.saved{color:#6150ea;background:#eeeafa}.result-heading{display:flex;justify-content:space-between;align-items:center}.result-heading h1{font-family:Amiri,serif;font-size:33px;font-weight:400;line-height:1.8;color:var(--navy)}.result-heading .eyebrow{font-size:11px}.journey-steps{list-style:none;display:flex;gap:15px;align-items:center;margin:19px 0 0;padding:0}.journey-steps li{display:flex;gap:8px;align-items:center;color:#acb0c2;font-size:11px;flex:1}.journey-steps li:not(:last-child):after{content:"";height:1px;background:#e4e6ee;flex:1;margin-right:9px}.journey-steps span{font-size:11px;padding:5px 7px;background:#eff0f7;border-radius:4px}.journey-steps .complete{color:#8271bc}.journey-steps .complete span{background:#eae5f7}.search-composer.compact{max-width:none;margin:25px 0 28px;display:flex;gap:10px;align-items:center;padding:11px 14px;border-radius:10px}.compact .composer-input{flex:1;min-width:0}.compact .composer-input input{font-size:12px}.compact .composer-bottom{margin:0;gap:10px}.compact .search-type{display:none}.results-meta{display:flex;justify-content:space-between;gap:14px;align-items:center;margin:20px 0}.results-meta h2{font-size:13px;font-weight:400;color:#646e89}.results-meta>span{font-size:11px;color:#9ca3b7}.result-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:17px}.result-card{text-align:right;border:1px solid #e0e3ed;border-radius:12px;background:#fff;padding:21px;transition:box-shadow .2s,border .2s;display:flex;flex-direction:column;min-width:0}.result-card:hover{border-color:#b4a9e3;box-shadow:0 8px 25px #31376c08}.result-card-top{display:flex;justify-content:space-between;align-items:center}.book-label{color:#797297;font-size:11px;display:inline-flex;gap:7px;align-items:center}.result-index{font-size:11px;color:#b1b7c8;direction:ltr}.result-card h3{font-size:11px;color:#9ca3b6;font-weight:400;margin-top:8px}.hadith-snippet{font:22px/1.9 Amiri,serif;color:#424e6c;margin:18px 0 24px;flex:1}.result-card-bottom{display:flex;justify-content:space-between;align-items:center;gap:12px;font-size:11px;border-top:1px solid #edf0f5;padding-top:13px;color:#929ab1}.result-card-bottom svg{color:#9a8ebd}.small-note{font-size:11px;line-height:1.9;color:#999fb3;margin:15px 0}.evidence-layout{display:grid;grid-template-columns:minmax(0,1fr) 247px;gap:22px;align-items:start}.evidence-panel{border:1px solid #e1e4ed;border-radius:12px;background:#fff;overflow:hidden;min-width:0}.evidence-header{display:flex;justify-content:space-between;gap:15px;padding:24px 26px}.evidence-header .eyebrow{font-size:11px}.evidence-header h2{font-size:20px;font-family:Amiri,serif;font-weight:400;color:#364262;margin:7px 0 3px}.evidence-header p{font-size:11px;color:#9299ad}.evidence-header>.icon-button{align-self:flex-start}.evidence-tabs{display:flex;border-bottom:1px solid #e9ebf2;padding:0 26px;gap:25px}.evidence-tabs button{display:flex;gap:6px;align-items:center;padding:13px 0;border-bottom:2px solid transparent;background:none;font-size:11px;color:#8b92a8}.evidence-tabs [aria-selected=true]{color:#7360b2;border-bottom-color:#8673c3}.tab-dot{width:4px;height:4px;border-radius:50%;background:#aca3c8}.text-lens,.comparison-lens,.chain-lens{padding:24px 26px}.source-state{font-size:11px;color:#9c8761;display:flex;gap:7px;align-items:center;line-height:1.8}.source-state>span{width:4px;height:4px;background:#bfa77e;border-radius:50%;flex-shrink:0}.full-hadith{font-family:Amiri,serif;font-size:25px;line-height:2.2;color:#374461;margin:24px 0 25px;text-align:justify;overflow-wrap:anywhere}.translation{padding:15px 0;border-top:1px solid #eeeef5;font-size:11px;color:#7d869c}.translation summary{cursor:pointer}.translation p{font:13px/1.8 Readex,system-ui;margin-top:15px;color:#707b94}.source-disclosure{width:100%;background:none;border-top:1px solid #eeeef5;padding:15px 0 0;display:flex;align-items:center;gap:9px;color:#8b93a8;font-size:11px;text-align:right}.source-disclosure>span{margin-right:auto}.source-data{background:#f7f8fb;border-radius:6px;margin-top:13px;padding:15px;overflow-wrap:anywhere;white-space:pre-wrap;font-size:11px;line-height:2;color:#798199}.source-data a{display:inline-flex;gap:7px;margin-top:9px;color:#7163a2}.evidence-actions{display:flex;align-items:center;justify-content:space-between;gap:10px;border-top:1px solid var(--line);padding:17px 24px;background:#fdfdff}.outline{color:#797a9f;background:#fff;border:1px solid #dedfeb}.small{font-size:11px;min-height:34px;padding:8px 12px;gap:7px}.violet{color:#fff;background:var(--violet)}.insight-panel{border:1px solid #e0deef;border-radius:12px;padding:25px 22px;background:linear-gradient(150deg,#f0edf9,#f7f8fc);position:sticky;top:20px;min-width:0}.insight-icon{width:45px;height:45px;border:1px solid #dcd6ee;border-radius:12px;display:grid;place-items:center;color:#9381b9;margin-bottom:22px}.insight-panel .eyebrow{font-size:11px}.insight-panel h2{font-family:Amiri,serif;font-size:26px;line-height:1.65;font-weight:400;color:#50456c;margin:7px 0 20px}.evidence-checklist{list-style:none;padding:0;margin:0;display:flex;flex-direction:column;gap:19px}.evidence-checklist li{display:flex;gap:9px;align-items:flex-start;font-size:11px;color:#70728c}.evidence-checklist svg{color:#79a998}.evidence-checklist small{color:#9b9bb1;font-size:11px;margin-top:6px;line-height:1.9}.hollow-dot{border:1px solid #b8a887;border-radius:50%;width:11px;height:11px;margin:2px;flex-shrink:0}.insight-divider{height:1px;background:#e2deed;margin:25px 0}.insight-panel h3{font-weight:400;font-size:11px;color:#6f6686;margin-bottom:12px}.insight-panel>p{font-size:11px;color:#9a92ab;line-height:2}.insight-panel>.button{width:100%;padding:11px 10px;font-size:11px;min-height:40px;margin-top:16px;gap:7px}.handoff-note{font-size:11px;color:#a5a0b7;text-align:center;margin-top:8px;line-height:1.8}.dorar-link{font-size:11px;color:#8c7fa4;display:flex;justify-content:center;gap:7px;margin-top:21px}.insight-panel .small-note{font-size:11px}.insight-panel blockquote{font:21px/1.9 Amiri,serif;color:#696780;border-right:2px solid #ccc3e4;margin:0;padding:0 13px}.insight-panel dl{font-size:11px}.insight-panel dt{color:#8c84a0;margin:15px 0 7px}.insight-panel dd{margin:0;color:#a5a0b4;font-size:11px;line-height:1.9}.compare-select{display:flex;flex-direction:column;gap:10px;font-size:11px;color:#797c98}.compare-select select{max-width:100%;padding:10px;border:1px solid var(--line);border-radius:7px;color:#6d6f8d;background:#fafbfe;font-size:11px}.comparison-columns{display:grid;grid-template-columns:1fr 1fr;gap:15px;margin-top:20px}.comparison-columns article{min-width:0;background:#fafafd;border:1px solid #edeef6;border-radius:8px;padding:15px}.comparison-columns p{font:20px/2 Amiri,serif;margin-top:13px;color:#5d6883;overflow-wrap:anywhere}.comparison-columns a{display:flex;gap:7px;color:#9483b1;font-size:11px;margin-top:12px}.chain-caption{display:flex;justify-content:space-between;gap:10px;font-size:11px;color:#8c87a2;align-items:center}.chain-caption .text-button{font-size:11px}.chain-nodes{max-width:410px;margin:22px auto 0;position:relative}.chain-row{display:flex;align-items:center;gap:14px;margin:0 0 21px}.chain-index{font-size:11px;color:#b4b0c5;direction:ltr}.chain-row button{position:relative;display:flex;align-items:center;gap:14px;border:1px solid #e0daed;padding:14px;background:linear-gradient(110deg,#fcfcfe,#f9f7fe);border-radius:9px;width:100%;text-align:right;font-size:11px;color:#68637e;min-width:0}.chain-row:not(:last-child) button:after{content:"";position:absolute;right:18px;width:1px;background:#c8bddb;height:22px;top:100%}.chain-row:not(:last-child) button:before{content:"";position:absolute;right:16px;width:5px;height:5px;border-right:1px solid #b4a3cc;border-bottom:1px solid #b4a3cc;transform:rotate(45deg);top:calc(100% + 8px)}.chain-row small{font-size:11px;color:#b0a7bf;margin-top:7px;line-height:1.7}.chain-row .node-active{border-color:#ac96cb;background:#f2eefa;box-shadow:0 3px 12px #ac96cb15}.chain-row button>svg{margin-right:auto;color:#b5a3cb}.node-dot{width:8px;height:8px;border:1px solid #a892c7;border-radius:50%;flex-shrink:0}.node-active .node-dot{background:#b3a3cc}.empty-state{text-align:center;display:flex;flex-direction:column;align-items:center;gap:15px;padding:55px 25px;color:#a39abb}.empty-state h2{font:29px/1.5 Amiri,serif;color:#666580}.empty-state p{font-size:11px;max-width:410px;line-height:2;color:#9299ac}.empty-state h3{font-size:14px;font-weight:400}.empty-state .button{margin-top:10px;font-size:11px}.page-heading{margin-bottom:26px}.saved-list{display:flex;flex-direction:column;gap:15px;margin-top:25px}.saved-item{border:1px solid #e2e4ee;display:flex;align-items:center;gap:20px;background:#fff;padding:23px;border-radius:10px;color:#7c7298;text-align:right}.saved-item span{font-size:14px;flex:1}.saved-item small{font-size:11px;color:#a19aaf;margin-top:10px}.notice{position:fixed;bottom:22px;left:50%;transform:translate(-50%);padding:13px 17px;display:flex;align-items:center;gap:20px;color:#d8dcec;background:#222b49;border:1px solid #56617c;border-radius:9px;font-size:11px;max-width:90%;z-index:5;box-shadow:0 10px 30px #12183f15}.error-box{border:1px solid #e6ccd0;border-radius:10px;padding:22px;color:#ac747d;background:#fdf7f8}.error-box h2{font-size:15px;font-weight:400}.error-box p{font-size:12px;line-height:2;margin:10px 0}.error-box button{font-size:11px}.spinner{display:inline-block;width:17px;height:17px;border:1px solid currentColor;border-bottom-color:transparent;border-radius:50%;animation:spin 1s linear infinite}@keyframes spin{to{transform:rotate(360deg)}}.loading-state{color:#9187ac;font-size:12px;margin:30px 0}.loading-state>.spinner{vertical-align:middle;margin-left:8px}.skeleton{height:125px;background:linear-gradient(90deg,#eeedf5,#f9f9fc,#eeedf5);background-size:200% 100%;animation:shimmer 2s infinite;margin-top:20px;border-radius:11px}@keyframes shimmer{to{background-position:-200% 0}}.mobile-only{display:none}@media (min-width:1600px){.hero{min-height:680px}.workspace-main{padding-top:55px}.welcome{padding-top:50px}.usecases{margin-top:55px}}@media (max-width:1150px){.hero h1{font-size:69px}.hero{gap:25px;padding-top:40px;min-height:570px}.knowledge-orbit{height:460px}.book-orbit{padding:12px 11px;font-size:11px;gap:8px}.orbit-core{width:138px;height:138px}.landing-links{gap:20px}.brand-caption{display:none}.workspace{grid-template-columns:210px minmax(0,1fr)}.sidebar{padding:25px 14px}.workspace-top{padding:0 25px}.workspace-main{padding:32px 4%}.evidence-layout{grid-template-columns:minmax(0,1fr) 210px;gap:15px}.insight-panel{padding:21px 16px}.usecases{gap:9px}.usecases button{padding:17px 11px;gap:9px}.usecases button>svg:last-child{display:none}.workspace-footer{padding:18px 25px}.text-lens,.comparison-lens,.chain-lens{padding:20px}.full-hadith{font-size:23px}.evidence-header{padding:22px 20px}}@media (max-width:900px){.landing-links>a{display:none}.hero{grid-template-columns:1.1fr 1fr;gap:10px;padding:40px 5%}.hero h1{font-size:60px}.hero-description{font-size:12px}.hero-actions{gap:18px}.hero-actions .text-button{font-size:11px}.hero-actions .button{font-size:11px;padding:11px 17px}.knowledge-orbit{height:400px}.book-orbit{font-size:11px;padding:10px 9px;gap:6px}.book-orbit svg{width:13px}.orbit-core{width:115px;height:115px;font-size:11px;gap:9px}.core-glyph svg{width:26px}.orbit-core small{font-size:11px}.orbit-caption{font-size:6px;letter-spacing:2px}.orbit-footer{font-size:11px}.book-0{left:5%}.book-1{right:-3%}.book-2{left:-3%}.book-3{right:-3%}.book-4{left:7%;bottom:14%}.book-5{right:1%;bottom:19%}.journeys{grid-template-columns:1fr 1fr;padding:0 5% 50px}.section-label{grid-column:1/-1;margin:10px 0 0}.section-label h2{margin-top:5px;font-size:29px}.journey-card{padding:22px}.approach-grid{gap:30px}.workspace{grid-template-columns:178px minmax(0,1fr)}.sidebar{padding:24px 11px}.sidebar .brand{gap:9px}.lab-label{display:none}.sidebar-link,.persona-option{font-size:11px;gap:9px;padding:11px 9px}.persona-option small{font-size:11px}.new-journey{font-size:11px;padding:12px 10px}.workspace-top{padding:0 20px}.preview-label{display:none}.breadcrumb{font-size:11px;gap:7px}.welcome h1{font-size:35px}.welcome>p{font-size:11px}.evidence-layout{grid-template-columns:1fr}.insight-panel{position:static}.insight-panel h2 br{display:none}.evidence-checklist{flex-direction:row;flex-wrap:wrap;gap:20px}.insight-panel>.button{width:auto}.insight-icon{float:left;margin-bottom:10px}.insight-panel .handoff-note{text-align:right}.dorar-link{justify-content:flex-start}.insight-divider{margin:18px 0}.insight-panel h2{font-size:24px;margin-bottom:18px}.insight-panel .small-note{margin-bottom:0}.full-hadith{font-size:25px}.usecases{grid-template-columns:1fr}.usecases button{padding:14px;gap:15px}.usecases small{display:inline;margin-right:12px}.usecases button>svg:last-child{display:block}.usecases{margin-top:30px}.source-strip{gap:12px}.workspace-footer{padding:18px;font-size:11px}.result-card{padding:16px}.hadith-snippet{font-size:21px}.results-meta{align-items:flex-start;flex-direction:column;gap:8px}.compact{flex-wrap:wrap}.compact .composer-input{flex-basis:100%}.compact .composer-bottom{width:100%}.compact .submit-search{margin-right:auto}}@media (max-width:620px){.landing-nav{padding:22px 6%;gap:14px}.landing-links{display:none}.brand-symbol{width:32px;height:35px}.wordmark{font-size:31px}.return-light{font-size:11px;gap:6px}.hero{display:flex;flex-direction:column;padding:45px 7% 20px;gap:5px;align-items:stretch}.hero h1{font-size:67px;margin:25px 0 20px}.hero-copy .eyebrow{font-size:11px}.hero-description{font-size:12px}.hero-actions{margin-top:26px;gap:21px}.hero-note{font-size:11px;margin-top:23px}.knowledge-orbit{width:100%;height:380px;margin:10px auto 15px;max-width:370px}.book-orbit{font-size:11px}.orbit-core{width:132px;height:132px}.book-0{left:8%}.book-1{right:0}.book-2{left:0}.book-3{right:0}.book-4{bottom:11%;left:15%}.book-5{bottom:18%;right:3%}.journeys{grid-template-columns:1fr;padding:0 7% 48px;gap:15px}.section-label{margin-bottom:8px}.journey-card{min-height:200px;padding:23px}.journey-heading{margin-top:17px}.journey-bottom{margin-top:19px}.approach{padding:45px 7%}.approach>h2{font-size:28px}.approach-grid{grid-template-columns:1fr;gap:28px;margin-top:32px}.approach-grid h3{margin-top:10px}.approach-grid p{max-width:320px}.landing-footer{padding:25px 7%;flex-wrap:wrap;font-size:11px;gap:15px}.landing-footer>span:nth-child(2){order:3;width:100%}.workspace{display:block}.sidebar{position:fixed;width:245px;right:0;top:0;height:100dvh;transform:translate(100%);transition:transform .25s;box-shadow:-10px 0 45px #12183f22}.sidebar.mobile-open{transform:translate(0)}.mobile-only{display:grid}.workspace-top{height:67px;padding:0 13px}.breadcrumb{font-size:11px;gap:5px}.breadcrumb>span{display:none}.original-button{font-size:11px;padding:8px;gap:5px}.top-actions{gap:0}.workspace-main{padding:29px 20px}.welcome{padding-top:18px}.welcome h1{font-size:34px;line-height:1.5;margin-top:16px}.welcome .eyebrow{font-size:11px}.welcome>p{font-size:11px;margin:12px auto;max-width:280px}.welcome-emblem{width:55px;height:55px;margin-bottom:20px}.search-composer{margin-top:28px;padding:17px 15px 12px}.composer-input{gap:11px}.composer-input input{font-size:12px}.composer-input>svg{width:19px}.composer-bottom{gap:10px;margin-top:18px}.search-type{font-size:11px;padding-right:9px}.collection-filter select{font-size:11px;max-width:113px}.collection-filter{gap:3px}.quick-examples{gap:8px;font-size:11px;margin-top:18px}.quick-examples>span{width:100%;text-align:center;margin-bottom:3px}.quick-examples button{font-size:11px}.usecases{margin-top:28px;gap:10px}.usecases small{display:block;margin:6px 0 0;font-size:11px}.usecases span{font-size:11px}.source-strip{gap:10px;font-size:11px;line-height:1.9;margin-top:27px}.source-strip>span:first-child{width:100%;text-align:center}.welcome-footnote{font-size:11px;align-items:flex-start;gap:5px;margin-top:18px}.workspace-footer{font-size:11px;padding:16px 20px;flex-direction:column;gap:7px}.result-heading h1{font-size:27px}.journey-steps{gap:8px;flex-wrap:wrap}.journey-steps li{font-size:11px;gap:5px;white-space:nowrap}.journey-steps li:not(:last-child):after{display:none}.journey-steps span{font-size:11px;padding:4px}.result-grid{grid-template-columns:1fr}.hadith-snippet{font-size:23px}.result-card{padding:21px}.evidence-tabs{gap:23px;padding:0 20px}.evidence-tabs button{font-size:11px}.text-lens,.chain-lens,.comparison-lens{padding:20px}.full-hadith{font-size:25px;line-height:2.1;text-align:right}.source-state{font-size:11px}.comparison-columns{grid-template-columns:1fr}.comparison-columns p{font-size:23px}.evidence-actions{padding:16px 20px;flex-wrap:wrap}.evidence-checklist{flex-direction:column;gap:18px}.insight-panel{padding:23px}.chain-caption,.chain-row button,.chain-row small{font-size:11px}.chain-row{gap:10px}.notice{font-size:11px;width:90%}.search-composer.compact{padding:13px}.result-heading .eyebrow{font-size:11px}}@media (prefers-reduced-motion:reduce){*,*:before,*:after{animation:none!important;transition:none!important;scroll-behavior:auto!important}}.landing-links button{background:transparent;color:inherit;padding:0;font-size:11px}.close-menu{position:absolute;left:8px;top:8px;color:#b1b9d2}.welcome>p,.page-heading>p{font-size:13px}.sidebar-link,.persona-option{font-size:12px}.sidebar-label{font-size:11px}.welcome-footnote{color:#737d94}.source-strip{color:#7e869d}.hero-note{color:#9ea8c2}.small-note{color:#737c94}.source-state{color:#8b724b}.search-type{color:#788299}.preview-label{color:#777e96}@media (max-width:900px){.landing-links>button{display:none}}@media (max-width:620px){.search-type{display:none}.welcome>p{font-size:12px}.journey-steps li{font-size:10px}.workspace-top .breadcrumb strong{font-size:11px}.original-button,.source-strip,.workspace-footer{font-size:10px}.chain-caption{align-items:flex-start;flex-direction:column}.welcome h1{font-size:31px}}@media (max-width:620px){.sidebar{visibility:hidden}.sidebar.mobile-open{visibility:visible}}.variant-actions{display:flex;align-items:center;gap:22px}@media (max-width:620px){.variant-actions{gap:12px}.top-actions{gap:6px}.top-actions .original-button{font-size:9px;padding:7px}.landing-nav .return-light{font-size:9px}}', Nm = "data:font/woff2;base64,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", Rm = "data:font/woff2;base64,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", Vm = "data:font/woff2;base64,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", Lm = 'html[data-athar-chat-v2] .app>div{flex-direction:row-reverse!important;justify-content:flex-end!important;background:#f8f9fe!important}html[data-athar-chat-v2] #chat-container{background:radial-gradient(ellipse at 50% 0,#efedf980,transparent 60%),#fafbff}html[data-athar-chat-v2] #sidebar{left:auto!important;right:0!important;background:#292151!important;color:#ece8ff!important;border-color:#615788!important;box-shadow:-8px 0 35px #18123812}html[data-athar-chat-v2] #sidebar [class*=text-gray-]{color:#c9c3e5!important}html[data-athar-chat-v2] #sidebar [class*=bg-gray-],html[data-athar-chat-v2] #sidebar [class*=from-gray-]{background-color:transparent!important;--tw-gradient-from:transparent!important}html[data-athar-chat-v2] #sidebar button:hover,html[data-athar-chat-v2] #sidebar a:hover{background-color:#ffffff12!important;color:#fff!important}html[data-athar-chat-v2] #sidebar [class*=border-]{border-color:#5d527b55!important}html[data-athar-chat-v2] #sidebar img[alt="Open WebUI"]{background:#fff;border-radius:7px;padding:2px}html[data-athar-chat-v2] #sidebar-resizer{display:none!important}html[data-athar-chat-v2] [data-athar-v2-slot=welcome]{padding-top:32px!important;padding-bottom:28px!important;transform:none!important}html[data-athar-chat-v2] #message-input-container{background:#fff!important;color:#202645!important;border:1px solid #dadbe9!important;box-shadow:0 12px 30px #22165006!important;border-radius:22px!important}html[data-athar-chat-v2] #chat-input{color:#202645!important;caret-color:#6150ea}html[data-athar-chat-v2] #chat-container nav{background:linear-gradient(#fafbff,#fafbffdd,transparent)}html.dark[data-athar-chat-v2] #chat-container{background:radial-gradient(ellipse at 50% 0,#30264b66,transparent 60%),#171626}html.dark[data-athar-chat-v2] #chat-container nav{background:linear-gradient(#171626,#171626dd,transparent)}html.dark[data-athar-chat-v2] .athar-v2-intro h2{color:#eee8fa}html[data-athar-chat-v2] #message-input-container [class*=text-gray-]{color:#70657d!important}html[data-athar-chat-v2] [data-athar-v2-slot=suggestions]{display:none!important}html[data-athar-chat-v2] [data-athar-v2-slot=suggestions-width]{width:100%;max-width:44rem!important;padding:0 20px}html[data-athar-chat-v2] [data-athar-v2-slot=composer-slot]{padding-top:16px!important;padding-bottom:2px!important}html[data-athar-chat-v2] .athar-v2-audience,html[data-athar-chat-v2] .athar-v2-cards{font-family:AtharReadex,Segoe UI,sans-serif;font-size:14px;line-height:1.5;font-weight:400;width:100%;max-width:44rem;margin:0 auto;color:#242a47}.athar-v2-audience,.athar-v2-cards,.athar-v2-auth-intro{display:none}html[data-athar-chat-v2] .athar-v2-audience,html[data-athar-chat-v2] .athar-v2-cards{display:block}.athar-v2-audience{padding:17px 20px 0}.athar-v2-intro{text-align:center;margin-bottom:17px}.athar-v2-eyebrow{font-size:11px;letter-spacing:.025em;color:#8b83a6}.athar-v2-intro h2{font-size:23px;font-weight:400;margin:7px 0 0;line-height:1.8;color:#2a2544}.athar-v2-toggles{display:grid;grid-template-columns:1fr 1fr;gap:12px}.athar-v2-persona{display:flex;align-items:center;gap:13px;padding:20px 18px;min-height:92px;border:1px solid #e2dfed;border-radius:13px;background:#fff;text-align:right;cursor:pointer;transition:background .18s,border .18s,box-shadow .18s;color:#7a708f}.athar-v2-persona>svg{width:26px;height:26px;flex-shrink:0}.athar-v2-persona strong{font-size:15px;font-weight:500;display:block;line-height:1.7;color:#39334e}.athar-v2-persona small{font-size:10px;display:block;color:#9b93ab;line-height:1.9;margin-top:4px}.athar-v2-persona[aria-pressed=true]{border-color:#9583d6;background:#f3f0fb;box-shadow:0 3px 14px #6150ea09;color:#7660b0}.athar-v2-radio{width:13px;height:13px;border:1px solid #d1cbdc;flex-shrink:0;border-radius:50%;margin-right:auto}.athar-v2-persona[aria-pressed=true] .athar-v2-radio{background:#7a62ba;border:3px solid #ded5f0;box-shadow:0 0 0 1px #a28cce}.athar-v2-cards-heading{display:flex;justify-content:space-between;align-items:center;gap:10px;font-size:11px;color:#8b829e;margin:14px 0 13px}.athar-v2-show-all{padding:5px 9px;background:transparent;color:#8b77b2;font-size:10px;cursor:pointer}.athar-v2-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:12px}.athar-v2-card{min-width:0;aspect-ratio:1;display:flex;flex-direction:column;align-items:flex-start;padding:18px 19px;text-align:right;border:1px solid #e2dfed;border-radius:15px;background:#fff;cursor:pointer;transition:transform .2s,border .2s,box-shadow .2s;color:#665675;animation:athar-card-in .3s ease both}.athar-v2-card:nth-child(2){animation-delay:35ms}.athar-v2-card:nth-child(3){animation-delay:.07s}.athar-v2-card:hover{border-color:#b6a2d2;transform:translateY(-3px);box-shadow:0 8px 24px #5141760a}.athar-v2-card-top{width:100%;display:flex;align-items:center;justify-content:space-between;margin-bottom:auto}.athar-v2-card-top>svg{width:24px;height:24px;color:#9b85b6}.athar-v2-card-top small{font-size:9px;color:#b4a6c3}.athar-v2-card[data-audience=research] .athar-v2-card-top svg{color:#786ac5}.athar-v2-card strong{font-size:13px;font-weight:500;line-height:1.85;margin-top:17px;color:#4a3b5b}.athar-v2-card-description{font-size:10px;line-height:1.9;color:#a094ac;margin-top:5px}.athar-v2-card>svg{width:16px;height:16px;color:#a99ab9;margin-top:14px;align-self:flex-end}.athar-v2-status{font-size:10px;line-height:1.9;text-align:center;color:#aaa1b4;margin:16px 0 7px;min-height:20px}.athar-v2-persona:focus-visible,.athar-v2-card:focus-visible,.athar-v2-show-all:focus-visible{outline:2px solid #9e88d0;outline-offset:3px}.athar-v2-intro{margin-bottom:12px}.athar-v2-intro .athar-v2-eyebrow{display:none}.athar-v2-intro h2{font-size:18px;margin:0;line-height:1.5}.athar-v2-card-description{color:#776783;font-size:11px}.athar-v2-persona small{color:#776783}.athar-v2-cards-heading,.athar-v2-show-all{color:#78648d}.athar-v2-status{color:#84758f}html[data-athar-auth-v2] #auth-page{padding-right:43vw;background:#fafbff}html[data-athar-auth-v2] #auth-page>div:first-child{background:#fafbff!important}html[data-athar-auth-v2] #auth-container{width:57vw;left:0;color:#29233e!important;z-index:2}html[data-athar-auth-v2] #auth-login-card{padding:32px;max-width:440px;color:#29233e!important}html[data-athar-auth-v2] #auth-login-card [class*=text-gray-]{color:#655b74!important}html[data-athar-auth-v2] #auth-login-card input{border-bottom:1px solid #ddd7e9;padding:10px 0;color:#29233e}html[data-athar-auth-v2] #auth-login-card button[type=submit]{background:#655284;color:#fff!important}#auth-login-card{direction:rtl!important;font-family:AtharReadex,system-ui,sans-serif!important;text-align:right!important}#auth-login-card label{text-align:right!important;font-family:AtharReadex,sans-serif!important}#auth-login-card input{text-align:right!important;font-family:AtharReadex,sans-serif!important;direction:rtl!important}#auth-login-card input[type=password],#auth-login-card input[type=email]{direction:ltr!important;text-align:right!important}#auth-login-card input::placeholder{text-align:right!important;font-family:AtharReadex,sans-serif!important;direction:rtl!important}#auth-login-card .text-2xl{font-family:AtharAmiri,serif!important;font-size:30px!important;line-height:1.6!important;text-align:center!important;font-weight:600!important}#auth-login-card button[type=submit]{font-family:AtharReadex,sans-serif!important;font-size:14px!important;font-weight:500!important}#auth-login-card form label.text-left{text-align:right!important}#auth-login-card button.pl-1\\.5{padding-left:0!important;padding-right:.375rem!important}html[data-athar-auth-v2] .athar-v2-auth-intro{display:flex;flex-direction:column;justify-content:center;position:fixed;right:0;top:0;width:43vw;height:100dvh;background:radial-gradient(ellipse at 0 0,#60549d55,transparent 75%),#292151;padding:7vw 5vw;color:#eee9fa;font-family:AtharReadex,Segoe UI,sans-serif;z-index:1;overflow:hidden}.athar-v2-auth-intro:after{content:"";position:absolute;width:320px;height:320px;border:1px solid #8574ae28;border-radius:50%;right:-140px;bottom:-160px;box-shadow:0 0 0 65px #8574ae09,0 0 0 130px #8574ae07;pointer-events:none}.athar-v2-auth-intro h1{white-space:pre-line;font:46px/1.75 AtharAmiri,serif;margin:21px 0;color:#efe7fb}.athar-v2-auth-intro>p{font-size:13px;line-height:2.25;color:#ada2c8;max-width:360px}.athar-v2-auth-intro .athar-v2-eyebrow{color:#b9a6d8;font-size:12px}.athar-v2-auth-features{display:flex;gap:22px;padding:28px 0;margin-top:16px;border-top:1px solid #65537c55}.athar-v2-auth-features span{display:flex;align-items:center;gap:10px;font-size:12px;color:#d7c5ec}.athar-v2-auth-features svg{width:22px;height:22px}.athar-v2-auth-intro>small{font-size:10px;color:#8d80ac;margin-top:50px}@keyframes athar-card-in{0%{opacity:0;transform:translateY(6px)}to{opacity:1;transform:none}}@media (max-width:767px){html[data-athar-chat-v2] #sidebar{transform:none!important}.athar-v2-audience{padding-top:10px}.athar-v2-persona{padding:14px 11px;gap:8px;min-height:88px}.athar-v2-persona strong{font-size:12px}.athar-v2-persona small{font-size:9px}.athar-v2-persona>svg{width:21px}.athar-v2-radio{display:none}.athar-v2-card{padding:13px 12px;aspect-ratio:auto;min-height:162px}.athar-v2-card strong{font-size:11px;line-height:1.8}.athar-v2-card-description{font-size:9px}.athar-v2-grid{gap:8px}.athar-v2-intro h2{font-size:21px}.athar-v2-cards-heading{font-size:10px}}@media (max-width:480px){.athar-v2-grid{grid-template-columns:repeat(2,minmax(0,1fr))}.athar-v2-card{aspect-ratio:1}.athar-v2-card strong{font-size:12px}.athar-v2-card-description{font-size:10px}.athar-v2-persona{align-items:flex-start}.athar-v2-persona>svg{width:18px;height:18px;margin-top:4px}.athar-v2-persona small{font-size:8px}}@media (max-width:900px){html[data-athar-auth-v2] #auth-page{padding-right:0}html[data-athar-auth-v2] #auth-container{width:100%}.athar-v2-auth-intro{display:none!important}html[data-athar-auth-v2] #auth-page:before{content:"بيان السُّنّة / الحديث النبوي للمعرّفين بالإسلام";position:fixed;top:85px;left:16px;right:16px;text-align:center;font:13px/1.8 AtharReadex,sans-serif;color:#78628f;z-index:3}}@media (prefers-reduced-motion:reduce){.athar-v2-card,.athar-v2-persona{animation:none!important;transition:none!important}}html[data-athar-chat-v2] [data-athar-v2-slot=model-intro]{align-items:center;gap:8px!important;opacity:.85}html[data-athar-chat-v2] [data-athar-v2-slot=model-intro] img{width:24px;height:24px;border-radius:7px}html[data-athar-chat-v2] [data-athar-v2-slot=model-intro] .text-2xl{font-size:12px!important;line-height:1.5}html[data-athar-chat-v2] [data-athar-v2-slot=model-intro] .text-sm{font-size:10px!important;line-height:1.4;max-width:32rem}.bayan-wordmark{font:38px/1.4 AtharAmiri,serif;margin:0;color:#33264c}.bayan-subtitle{font-size:12px;color:#7e6c93;line-height:1.8;margin:0 0 15px}.athar-v2-persona{min-height:77px;padding:15px}.athar-v2-persona strong{font-size:13px}.athar-v2-persona small{font-size:9px}.bayan-evidence,.bayan-request{border:1px solid #d9cde7;border-radius:12px;padding:12px 15px;margin:14px 0;background:#fff}.bayan-evidence>summary,.bayan-request>summary{font-size:12px;color:#53406e;cursor:pointer}.bayan-evidence-state{font-size:10px;line-height:1.9;color:#846c58;background:#faf4e8;padding:10px;border-radius:8px}.bayan-evidence-coverage{display:flex;flex-wrap:wrap;gap:5px;margin:12px 0}.bayan-evidence-coverage span{font-size:8px;padding:5px 7px;border-radius:6px;background:#f3f0f7;color:#877493}.bayan-evidence-coverage span[data-present=true]{background:#e4f1ee;color:#376a60}.bayan-evidence-record{padding:12px 0;border-top:1px solid #e9e2f0}.bayan-evidence-record>summary{font-size:11px;color:#634d7c;cursor:pointer;line-height:1.9}.bayan-source-text{font:21px/2.1 AtharAmiri,serif;color:#3f3651;margin:15px 0;max-height:290px;overflow:auto;white-space:pre-wrap}.bayan-source-id{display:block;direction:ltr;text-align:left;overflow-wrap:anywhere;font:10px/1.8 monospace;color:#92859f;margin:10px 0}.bayan-source-actions{display:flex;flex-wrap:wrap;gap:7px}.bayan-source-actions a,.bayan-source-actions button{font:10px/1.8 AtharReadex,sans-serif!important;border:1px solid #d7cbe5;border-radius:7px;padding:6px 9px;background:#f5f1fa;color:#65517e;text-decoration:none}.bayan-request .bayan-question{font-size:12px}.bayan-evidence summary:focus-visible,.bayan-request summary:focus-visible{outline:2px solid #8d70b0;outline-offset:4px}.athar-v2-toggles{grid-template-columns:repeat(3,minmax(0,1fr));gap:8px}.athar-v2-persona{gap:8px;padding:13px 10px}.athar-v2-persona>svg{width:22px;flex-shrink:0}.athar-v2-radio{display:none}.athar-v2-persona strong{font-size:12px}.athar-v2-persona small{font-size:8px}.athar-v2-cards[data-track=topics] .athar-v2-card{aspect-ratio:auto;min-height:168px;padding:14px 17px}.athar-v2-cards[data-track=topics] .athar-v2-card strong{margin-top:9px}.athar-v2-cards[data-track=topics] .athar-v2-card-top{display:none}.athar-v2-cards[data-track=topics] .athar-v2-card-description{font-size:10px}.athar-v2-cards[data-track=topics] .bayan-card-action{margin-top:auto;padding-top:10px}.bayan-topic-options{display:grid;grid-template-columns:1fr 1fr;gap:12px;margin:12px 0 20px}.bayan-topic-options label{font-size:11px;color:#69577b}.bayan-topic-options select{display:block;width:100%;margin-top:7px;padding:10px 8px;border:1px solid #d5c7e6;border-radius:9px;background:#fff;color:#49395c;font:12px AtharReadex,sans-serif}.bayan-topic-roots{padding:14px;border-radius:12px;background:#e9f3f1;color:#3f655d;margin-bottom:18px}.bayan-topic-roots strong{font-size:12px}.bayan-topic-roots p{font-size:11px;line-height:1.9;margin:6px 0}.bayan-topic-roots small{font-size:9px}.bayan-agent{font-size:10px;color:#6e558a;margin:12px 0}.bayan-gallery-switch{border:1px solid #d3c5e4;border-radius:9px;padding:8px 14px;background:#f0eaf8;color:#624c7a;font-size:11px!important}.bayan-auth-topic{background:#ffffff12;border:1px solid #ffffff40;color:#ebe1ff;padding:12px 16px;border-radius:11px;margin:10px 0;font:12px AtharReadex,sans-serif;cursor:pointer}@media (max-width:600px){.athar-v2-toggles{gap:6px}.athar-v2-persona{padding:10px 8px;display:block;min-height:87px}.athar-v2-persona>svg{display:none}.athar-v2-persona strong{font-size:10px!important}.athar-v2-persona small{font-size:8px!important;line-height:1.8}.bayan-topic-options{grid-template-columns:1fr}.athar-v2-cards[data-track=topics] .athar-v2-card{min-height:165px;padding:13px}}html.dark[data-athar-chat-v2] .bayan-wordmark{color:#f5ecff}.bayan-card-action{display:flex;align-items:center;justify-content:space-between;gap:12px;width:100%;font-size:10px;color:#78648d;margin-top:13px}.bayan-card-action svg{width:17px;height:17px}.athar-v2-card strong{margin-top:13px;font-size:16px}.athar-v2-card-description{font-size:11px;line-height:1.9}.athar-v2-card-top small{font-size:9px;color:#80718f}.bayan-count{font-size:10px}.bayan-demo{margin:auto;width:min(650px,calc(100vw - 32px));max-height:calc(100dvh - 40px);overflow:auto;padding:0;border:1px solid #e3dceb;border-radius:24px;background:#fbfaff;color:#352844;font:14px/1.8 AtharReadex,system-ui,sans-serif;box-shadow:0 30px 110px #18122944}.bayan-demo:not([open]){display:none}.bayan-demo::backdrop{background:#15102988;-webkit-backdrop-filter:blur(5px);backdrop-filter:blur(5px)}.bayan-demo-content{position:relative;padding:36px}.bayan-demo h2{font:38px/1.5 AtharAmiri,serif;margin:13px 0 6px}.bayan-demo h3{font-size:13px;font-weight:500;margin:23px 0 13px}.bayan-demo button{font:inherit;cursor:pointer}.bayan-demo button:focus-visible,.bayan-context button:focus-visible,.bayan-followups button:focus-visible{outline:2px solid #937cca;outline-offset:4px}.bayan-close{position:absolute;left:20px;top:20px;width:32px;height:32px;border-radius:50%;background:#efebf5;display:grid;place-items:center;border:0;color:#786985}.bayan-close svg{width:17px;height:17px}.bayan-kicker{font-size:10px;color:#9680ae}.bayan-demo-intro{font-size:12px;color:#807087;line-height:1.9;margin:0 0 24px}.bayan-question-label{font-size:10px;color:#8c7a9b}.bayan-question{font-size:16px;line-height:2;background:#f0ecf7;border-right:3px solid #b19bcd;border-radius:10px 0 0 10px;padding:15px 19px;margin:8px 0;color:#584668}.bayan-demo-steps{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:10px}.bayan-demo-steps button{border:1px solid #e0d6ed;background:#fff;border-radius:12px;padding:13px 9px;display:flex;flex-direction:column;align-items:flex-start;gap:8px;font-size:11px;text-align:right;color:#786088}.bayan-demo-steps button span{font-size:11px;color:#b5a5c6}.bayan-demo-steps button[aria-pressed=true]{background:#ebe5f6;border-color:#ae97ce;color:#514066}.bayan-step-detail{min-height:55px;font-size:12px;color:#7b698b;line-height:1.9;margin:16px 0 23px}.bayan-demo-note{font-size:10px;color:#887991;line-height:1.9;border-top:1px solid #e7deee;padding-top:16px;margin:0 0 18px}.bayan-demo-actions{display:flex;gap:12px}.bayan-primary,.bayan-secondary{min-height:43px;border-radius:10px;padding:10px 18px;border:1px solid #c9bddb;display:flex;gap:12px;align-items:center;justify-content:center;font-size:12px!important}.bayan-primary{background:#5a437c;color:#fff;border-color:#5a437c}.bayan-secondary{background:transparent;color:#786186}.bayan-primary svg{width:16px;height:16px}.bayan-gallery{display:grid;gap:12px;margin:24px 0}.bayan-gallery button{display:flex;gap:12px;align-items:center;text-align:right;background:#f1ecf7;border:1px solid #e4d9ef;border-radius:12px;padding:17px;color:#776183}.bayan-gallery svg{width:21px;height:21px;flex-shrink:0}.bayan-gallery strong{font-size:14px;font-weight:500}.bayan-gallery span{font-size:10px;margin-right:auto}.bayan-gallery button>svg:last-child{width:16px}.bayan-context{position:sticky;top:0;z-index:12;display:flex;align-items:center;gap:12px;padding:10px 22px;background:#faf8fff2;border-bottom:1px solid #e8e0ef;font-family:AtharReadex,sans-serif;color:#6f547f}.bayan-context-brand{font:23px AtharAmiri,serif}.bayan-context-case{font-size:11px;border-right:1px solid #d3c4df;padding-right:12px}.bayan-context button{margin-right:auto;font:10px AtharReadex,sans-serif;padding:7px 10px;border:1px solid #cfc0df;border-radius:8px;background:#fff;color:#755b87;cursor:pointer}.bayan-followups{display:flex;align-items:center;justify-content:center;gap:8px;flex-wrap:wrap;font:10px/1.8 AtharReadex,sans-serif;color:#806b91;margin:6px auto 10px;max-width:48rem;padding:0 16px}.bayan-followups button{font:inherit;border:1px solid #ddd2e8;border-radius:99px;background:#fbf9ff;color:#745988;padding:5px 11px;cursor:pointer}.bayan-followups[data-notice]:after{content:attr(data-notice);flex-basis:100%;text-align:center;font-size:10px}.bayan-auth-cases{display:grid;gap:8px}.bayan-auth-cases button{display:flex;align-items:center;gap:12px;border:1px solid #77629555;background:#ffffff05;color:#d7c5ec;border-radius:10px;padding:12px;font:12px AtharReadex,sans-serif;text-align:right;cursor:pointer;transition:background .2s}.bayan-auth-cases button:hover{background:#ffffff10}.bayan-auth-cases svg{width:18px;height:18px}.bayan-auth-cases svg:last-child{margin-right:auto;width:15px}.athar-v2-auth-intro h1{font-size:58px;margin:14px 0}.athar-v2-auth-features{padding:18px 0;margin-top:10px}.athar-v2-auth-intro>small{margin-top:25px}@media (max-width:600px){.bayan-demo-content{padding:26px 20px}.bayan-demo h2{font-size:31px}.bayan-question{font-size:14px}.bayan-demo-steps{gap:7px}.bayan-demo-steps button{font-size:10px}.bayan-demo-actions{flex-direction:column}.bayan-demo-note{font-size:10px}.bayan-gallery button{flex-wrap:wrap}.bayan-gallery span{flex-basis:60%}.bayan-context{padding:8px 12px;gap:8px}.bayan-context-brand{font-size:20px}.bayan-context-case{font-size:10px}.bayan-wordmark{font-size:33px}.bayan-subtitle{font-size:10px}.athar-v2-persona strong{font-size:11px}.athar-v2-card strong{font-size:15px}.athar-v2-card-description{font-size:10px}.athar-v2-card-top{gap:5px}.athar-v2-card-top small{font-size:8px}.bayan-card-action{font-size:9px}.bayan-followups>span{flex-basis:100%;text-align:center}}.bayan-route-selector{display:flex;align-items:center;justify-content:center;gap:6px;margin:6px 0 10px;width:100%}.bayan-route-btn{font:10px AtharReadex,sans-serif!important;border:1px solid #d7cbe5;border-radius:20px;padding:4px 12px;background:#f5f1fa;color:#65517e;cursor:pointer;transition:background .15s,color .15s}.bayan-route-btn[aria-pressed=true]{background:#5a437c;color:#fff!important;border-color:#5a437c}.bayan-narrator-card{padding:14px;background:#faf8fc;border:1px solid #e2d9ec;border-radius:12px;margin:12px 0;font-size:12px;line-height:2}.bayan-detail-row{margin:4px 0;font-size:11px;line-height:1.8;color:#3b324d}.bayan-badge-group{display:flex;flex-wrap:wrap;gap:6px;margin:10px 0}.bayan-badge-resolved{display:inline-block;padding:2px 8px;border-radius:6px;background:#e4f1ee;color:#23594e;font-size:10px}.bayan-badge-ambiguous{display:inline-block;padding:2px 8px;border-radius:6px;background:#fdf6e2;color:#7c5e10;font-size:10px}.bayan-badge-unresolved{display:inline-block;padding:2px 8px;border-radius:6px;background:#fdf2f2;color:#9b2c2c;font-size:10px}.bayan-badge-review{display:inline-block;padding:2px 8px;border-radius:6px;background:#fef9ee;color:#855c1e;font-size:10px}.bayan-candidates-section,.bayan-grades-section{margin-top:12px;padding-top:10px;border-top:1px solid #e9e2f0}.bayan-candidates-list{margin:6px 0;padding-right:18px;font-size:11px;color:#493b5d}.bayan-grade-item{margin:4px 0;font-size:11px;color:#433857}.bayan-missing-evidence-note{margin-top:8px;padding:8px 10px;border-radius:8px;background:#faf4e8;color:#846c58;font-size:10px;line-height:1.8}html[data-athar-chat-v2] [data-bayan-prose-hidden=true]{display:none!important}.bayan-lesson-card{direction:rtl;margin:20px 0 28px;width:100%;border:1px solid #c4ab78;border-radius:24px;overflow:hidden;background:#fffdf7;color:#382544;box-shadow:0 16px 48px #442d5420;text-align:right;animation:bayan-card-enter .45s ease both}.bayan-card-face{padding:30px;background:radial-gradient(ellipse at 0 0,#e6dcec 0,transparent 60%),#fffdf7}.bayan-card-top{display:flex;justify-content:space-between;gap:16px;flex-wrap:wrap;color:#81683f;font-size:12px;letter-spacing:.02em}.bayan-card-brand{font-weight:800}.bayan-card-topic{padding:3px 10px;border:1px solid #c8b28c;border-radius:30px}.bayan-lesson-card h2{font-family:AtharReadex,Tahoma,sans-serif;font-size:clamp(22px,3vw,30px);font-weight:650;line-height:1.6;margin:20px 0 12px}.bayan-card-takeaway{font-size:16px;line-height:1.95;margin:0 0 22px;color:#59455f}.bayan-card-quote{margin:14px 0;padding:18px 20px;background:#f1eaf5;border-right:3px solid #b69b68;border-radius:14px}.bayan-card-quote p{font-family:AtharAmiri,Georgia,serif;font-size:24px;line-height:1.95;margin:0;white-space:pre-line}.bayan-card-quote cite{font-family:AtharReadex,Tahoma,sans-serif;font-style:normal;font-size:12px;color:#755e85;display:block;margin-top:10px}.bayan-card-review{margin:24px 0 0;font-size:12px;color:#81683f}.bayan-card-controls{display:flex;flex-wrap:wrap;gap:8px;padding:16px 22px;border-top:1px solid #dfd3bf}.bayan-card-button{border:1px solid #d9c9df;border-radius:10px;padding:9px 13px;font:12px AtharReadex,Tahoma,sans-serif;background:#fffaf1;color:#5c3d70;cursor:pointer}.bayan-card-button:hover{background:#ede2f1;border-color:#ab88bd}.bayan-card-button:focus-visible{outline:3px solid #b5975c;outline-offset:3px}.bayan-card-feedback{display:block;padding:0 22px;font-size:12px;color:#715a7b}.bayan-card-sources{padding:16px 22px;font-size:12px;line-height:1.8;border-top:1px solid #e4dccc}.bayan-card-sources summary{cursor:pointer;font-weight:600}.bayan-card-source{margin-top:16px;padding-top:10px;border-top:1px solid #e1d6d0;overflow-wrap:anywhere}.bayan-card-source a{color:#674478;text-decoration:underline}.bayan-card-source code{display:block;direction:ltr;text-align:left;font-size:11px;overflow-wrap:anywhere}.bayan-card-dialog{margin:auto;width:min(850px,94vw);max-height:92vh;overflow:auto;border:0;border-radius:26px;padding:20px;background:#eee7f0;box-shadow:0 30px 100px #0008}.bayan-card-dialog::backdrop{background:#24152bb5;-webkit-backdrop-filter:blur(6px);backdrop-filter:blur(6px)}.bayan-learning-objective{background:#f3ecde;padding:14px;border-radius:12px;color:#594332;font-size:13px;line-height:1.8}.bayan-subtopic-readiness{font-size:12px;line-height:1.8;color:#775c82}.bayan-demo-actions button:disabled{opacity:.4;cursor:not-allowed}@keyframes bayan-card-enter{0%{opacity:0;transform:translateY(12px)}to{opacity:1;transform:none}}@media (prefers-reduced-motion:reduce){.bayan-lesson-card{animation:none}}@media (max-width:600px){.bayan-card-face{padding:20px}.bayan-card-quote{padding:14px}.bayan-card-quote p{font-size:22px}.bayan-card-controls{padding:14px}.bayan-card-dialog{padding:12px}}', Ql = {
  "topic-faith": [
    {
      id: "itqan:bukhari:1:1:bf026de7e155",
      collection: "bukhari",
      chapter: "كتاب بدء الوحى",
      position: 1,
      text: `حَدَّثَنَا الْحُمَيْدِيُّ عَبْدُ اللَّهِ بْنُ الزُّبَيْرِ  ، قَالَ : حَدَّثَنَا سُفْيَانُ  ، قَالَ : حَدَّثَنَا يَحْيَى بْنُ سَعِيدٍ الْأَنْصَارِيُّ  ، قَالَ : أَخْبَرَنِي مُحَمَّدُ بْنُ إِبْرَاهِيمَ التَّيْمِيُّ  ، أَنَّهُ سَمِعَ عَلْقَمَةَ بْنَ وَقَّاصٍ اللَّيْثِيَّ  ، يَقُولُ : سَمِعْتُ عُمَرَ بْنَ الْخَطَّابِ   رَضِيَ اللَّهُ عَنْهُ عَلَى الْمِنْبَرِ، قَالَ : سَمِعْتُ رَسُولَ اللَّهِ صَلَّى اللَّهُ عَلَيْهِ وَسَلَّمَ، يَقُولُ : "
إِنَّمَا الْأَعْمَالُ بِالنِّيَّاتِ، وَإِنَّمَا لِكُلِّ امْرِئٍ مَا نَوَى، فَمَنْ كَانَتْ هِجْرَتُهُ إِلَى دُنْيَا يُصِيبُهَا أَوْ إِلَى امْرَأَةٍ يَنْكِحُهَا، فَهِجْرَتُهُ إِلَى مَا هَاجَرَ إِلَيْهِ "`,
      sha256: "bf026de7e1551e20f4974b597dd25d0da06e690391e60b0b30211ec3ca2739fa",
      url: "https://github.com/R3GENESI5/Itqan/blob/199d870da5b726356b4a8dbaa096140cffb7d0ab/app/data/sunni/bukhari/1.json",
      review_status: "needs_review",
      source_verified: !0,
      scholarly_approved: !1
    },
    {
      id: "itqan:bukhari:2:2:43ab185c8834",
      collection: "bukhari",
      chapter: "كتاب الإيمان",
      position: 2,
      text: `حَدَّثَنَا عَبْدُ اللَّهِ بْنُ مُحَمَّدٍ، قَالَ حَدَّثَنَا أَبُو عَامِرٍ الْعَقَدِيُّ، قَالَ حَدَّثَنَا سُلَيْمَانُ بْنُ بِلاَلٍ، عَنْ عَبْدِ اللَّهِ بْنِ دِينَارٍ، عَنْ أَبِي صَالِحٍ، عَنْ أَبِي هُرَيْرَةَ ـ رضى الله عنه ـ عَنِ النَّبِيِّ صلى الله عليه وسلم قَالَ ‏
"‏ الإِيمَانُ بِضْعٌ وَسِتُّونَ شُعْبَةً، وَالْحَيَاءُ شُعْبَةٌ مِنَ الإِيمَانِ ‏"‏‏.‏`,
      sha256: "43ab185c8834487b916e2fc09b34e1180d7a9abb429dedf26d1525514e2483b7",
      url: "https://github.com/R3GENESI5/Itqan/blob/199d870da5b726356b4a8dbaa096140cffb7d0ab/app/data/sunni/bukhari/2.json",
      review_status: "needs_review",
      source_verified: !0,
      scholarly_approved: !1
    }
  ],
  "topic-mercy": [
    {
      id: "itqan:tirmidhi:27:30:b5e57ce2441d",
      collection: "tirmidhi",
      chapter: "كتاب البر والصلة عن رسول الله صلى الله عليه وسلم",
      position: 30,
      text: `حَدَّثَنَا ابْنُ أَبِي عُمَرَ، حَدَّثَنَا سُفْيَانُ، عَنْ عَمْرِو بْنِ دِينَارٍ، عَنْ أَبِي قَابُوسَ، عَنْ عَبْدِ اللَّهِ بْنِ عَمْرٍو، قَالَ قَالَ رَسُولُ اللَّهِ صلى الله عليه وسلم ‏
"‏ الرَّاحِمُونَ يَرْحَمُهُمُ الرَّحْمَنُ ارْحَمُوا مَنْ فِي الأَرْضِ يَرْحَمْكُمْ مَنْ فِي السَّمَاءِ الرَّحِمُ شُجْنَةٌ مِنَ الرَّحْمَنِ فَمَنْ وَصَلَهَا وَصَلَهُ اللَّهُ وَمَنْ قَطَعَهَا قَطَعَهُ اللَّهُ ‏"‏ ‏.‏ قَالَ أَبُو عِيسَى هَذَا حَدِيثٌ حَسَنٌ صَحِيحٌ ‏.‏`,
      sha256: "b5e57ce2441d017d872209a4a05996f29927aeffc82c75da5e2d1448673eb319",
      url: "https://github.com/R3GENESI5/Itqan/blob/199d870da5b726356b4a8dbaa096140cffb7d0ab/app/data/sunni/tirmidhi/27.json",
      review_status: "needs_review",
      source_verified: !0,
      scholarly_approved: !1
    },
    {
      id: "itqan:bukhari:78:55:022c1dbdd753",
      collection: "bukhari",
      chapter: "كتاب الأدب",
      position: 55,
      text: 'حَدَّثَنَا عَبْدُ الْعَزِيزِ بْنُ عَبْدِ اللَّهِ، حَدَّثَنَا إِبْرَاهِيمُ بْنُ سَعْدٍ، عَنْ صَالِحٍ، عَنِ ابْنِ شِهَابٍ، عَنْ عُرْوَةَ بْنِ الزُّبَيْرِ، أَنَّ عَائِشَةَ ـ رضى الله عنها ـ زَوْجَ النَّبِيِّ صلى الله عليه وسلم قَالَتْ دَخَلَ رَهْطٌ مِنَ الْيَهُودِ عَلَى رَسُولِ اللَّهِ صلى الله عليه وسلم فَقَالُوا السَّامُ عَلَيْكُمْ‏.‏ قَالَتْ عَائِشَةُ فَفَهِمْتُهَا فَقُلْتُ وَعَلَيْكُمُ السَّامُ وَاللَّعْنَةُ‏.‏ قَالَتْ فَقَالَ رَسُولُ اللَّهِ صلى الله عليه وسلم ‏"‏ مَهْلاً يَا عَائِشَةُ، إِنَّ اللَّهَ يُحِبُّ الرِّفْقَ فِي الأَمْرِ كُلِّهِ ‏"‏‏.‏ فَقُلْتُ يَا رَسُولَ اللَّهِ وَلَمْ تَسْمَعْ مَا قَالُوا قَالَ رَسُولُ اللَّهِ صلى الله عليه وسلم ‏"‏ قَدْ قُلْتُ وَعَلَيْكُمْ ‏"‏‏.‏',
      sha256: "022c1dbdd75312012c7569455f1d5a45a3e1f92423eba7dea5291a5cda7dc035",
      url: "https://github.com/R3GENESI5/Itqan/blob/199d870da5b726356b4a8dbaa096140cffb7d0ab/app/data/sunni/bukhari/78.json",
      review_status: "needs_review",
      source_verified: !0,
      scholarly_approved: !1
    },
    {
      id: "itqan:bukhari:97:6:c70c14ec93c8",
      collection: "bukhari",
      chapter: "كتاب التوحيد",
      position: 6,
      text: `حَدَّثَنَا مُحَمَّدٌ، أَخْبَرَنَا أَبُو مُعَاوِيَةَ، عَنِ الأَعْمَشِ، عَنْ زَيْدِ بْنِ وَهْبٍ، وَأَبِي، ظَبْيَانَ عَنْ جَرِيرِ بْنِ عَبْدِ اللَّهِ، قَالَ قَالَ رَسُولُ اللَّهِ صلى الله عليه وسلم ‏
"‏ لاَ يَرْحَمُ اللَّهُ مَنْ لاَ يَرْحَمُ النَّاسَ ‏"‏‏.‏`,
      sha256: "c70c14ec93c8095ab332bf3f2350a6dfadacfc769c10fe938d6fe6cfd1d01373",
      url: "https://github.com/R3GENESI5/Itqan/blob/199d870da5b726356b4a8dbaa096140cffb7d0ab/app/data/sunni/bukhari/97.json",
      review_status: "needs_review",
      source_verified: !0,
      scholarly_approved: !1
    }
  ],
  "topic-worship": [
    {
      id: "itqan:bukhari:9:7:b8de6739f520",
      collection: "bukhari",
      chapter: "كتاب مواقيت الصلاة",
      position: 7,
      text: 'حَدَّثَنَا إِبْرَاهِيمُ بْنُ حَمْزَةَ، قَالَ حَدَّثَنِي ابْنُ أَبِي حَازِمٍ، وَالدَّرَاوَرْدِيُّ، عَنْ يَزِيدَ، عَنْ مُحَمَّدِ بْنِ إِبْرَاهِيمَ، عَنْ أَبِي سَلَمَةَ بْنِ عَبْدِ الرَّحْمَنِ، عَنْ أَبِي هُرَيْرَةَ، أَنَّهُ سَمِعَ رَسُولَ اللَّهِ صلى الله عليه وسلم يَقُولُ ‏"‏ أَرَأَيْتُمْ لَوْ أَنَّ نَهَرًا بِبَابِ أَحَدِكُمْ، يَغْتَسِلُ فِيهِ كُلَّ يَوْمٍ خَمْسًا، مَا تَقُولُ ذَلِكَ يُبْقِي مِنْ دَرَنِهِ ‏"‏‏.‏ قَالُوا لاَ يُبْقِي مِنْ دَرَنِهِ شَيْئًا‏.‏ قَالَ ‏"‏ فَذَلِكَ مِثْلُ الصَّلَوَاتِ الْخَمْسِ، يَمْحُو اللَّهُ بِهَا الْخَطَايَا ‏"‏‏.‏',
      sha256: "b8de6739f520a27cb33f27459d8110974a15df167b08a537281333cae4e7919b",
      url: "https://github.com/R3GENESI5/Itqan/blob/199d870da5b726356b4a8dbaa096140cffb7d0ab/app/data/sunni/bukhari/9.json",
      review_status: "needs_review",
      source_verified: !0,
      scholarly_approved: !1
    },
    {
      id: "itqan:bukhari:2:31:7d396864714a",
      collection: "bukhari",
      chapter: "كتاب الإيمان",
      position: 31,
      text: `حَدَّثَنَا ابْنُ سَلاَمٍ، قَالَ أَخْبَرَنَا مُحَمَّدُ بْنُ فُضَيْلٍ، قَالَ حَدَّثَنَا يَحْيَى بْنُ سَعِيدٍ، عَنْ أَبِي سَلَمَةَ، عَنْ أَبِي هُرَيْرَةَ، قَالَ قَالَ رَسُولُ اللَّهِ صلى الله عليه وسلم ‏
"‏ مَنْ صَامَ رَمَضَانَ إِيمَانًا وَاحْتِسَابًا غُفِرَ لَهُ مَا تَقَدَّمَ مِنْ ذَنْبِهِ ‏"‏‏.‏`,
      sha256: "7d396864714a458d034d56009930bcd1a1dabfe69d8da5de1fe2aed844750d79",
      url: "https://github.com/R3GENESI5/Itqan/blob/199d870da5b726356b4a8dbaa096140cffb7d0ab/app/data/sunni/bukhari/2.json",
      review_status: "needs_review",
      source_verified: !0,
      scholarly_approved: !1
    }
  ],
  "topic-family": [
    {
      id: "itqan:bukhari:78:46:c2cf81c922d3",
      collection: "bukhari",
      chapter: "كتاب الأدب",
      position: 46,
      text: `حَدَّثَنَا مُحَمَّدُ بْنُ مِنْهَالٍ، حَدَّثَنَا يَزِيدُ بْنُ زُرَيْعٍ، حَدَّثَنَا عُمَرُ بْنُ مُحَمَّدٍ، عَنْ أَبِيهِ، عَنِ ابْنِ عُمَرَ ـ رضى الله عنهما ـ قَالَ قَالَ رَسُولُ اللَّهِ صلى الله عليه وسلم ‏
"‏ مَا زَالَ جِبْرِيلُ يُوصِينِي بِالْجَارِ حَتَّى ظَنَنْتُ أَنَّهُ سَيُوَرِّثُهُ ‏"‏‏.‏`,
      sha256: "c2cf81c922d3e0c8fff36d99be8a75f7499a83b3ae6792bccf948a327d69a1c2",
      url: "https://github.com/R3GENESI5/Itqan/blob/199d870da5b726356b4a8dbaa096140cffb7d0ab/app/data/sunni/bukhari/78.json",
      review_status: "needs_review",
      source_verified: !0,
      scholarly_approved: !1
    },
    {
      id: "itqan:bukhari:34:20:6be328f32eca",
      collection: "bukhari",
      chapter: "كتاب البيوع",
      position: 20,
      text: `حَدَّثَنَا مُحَمَّدُ بْنُ أَبِي يَعْقُوبَ الْكِرْمَانِيُّ، حَدَّثَنَا حَسَّانُ، حَدَّثَنَا يُونُسُ، حَدَّثَنَا مُحَمَّدٌ، عَنْ أَنَسِ بْنِ مَالِكٍ ـ رضى الله عنه ـ قَالَ سَمِعْتُ رَسُولَ اللَّهِ صلى الله عليه وسلم يَقُولُ ‏
"‏ مَنْ سَرَّهُ أَنْ يُبْسَطَ لَهُ رِزْقُهُ أَوْ يُنْسَأَ لَهُ فِي أَثَرِهِ فَلْيَصِلْ رَحِمَهُ ‏"‏‏.‏`,
      sha256: "6be328f32eca693b453690a19690d91c1da3bc7952219fd3afa4c0ad56ed9877",
      url: "https://github.com/R3GENESI5/Itqan/blob/199d870da5b726356b4a8dbaa096140cffb7d0ab/app/data/sunni/bukhari/34.json",
      review_status: "needs_review",
      source_verified: !0,
      scholarly_approved: !1
    }
  ],
  "topic-fairness": [
    {
      id: "itqan:muslim:1:189:0ae114813da4",
      collection: "muslim",
      chapter: "كتاب الإيمان",
      position: 189,
      text: `حَدَّثَنَا قُتَيْبَةُ بْنُ سَعِيدٍ، حَدَّثَنَا يَعْقُوبُ، - وَهُوَ ابْنُ عَبْدِ الرَّحْمَنِ الْقَارِيُّ ح وَحَدَّثَنَا أَبُو الأَحْوَصِ، مُحَمَّدُ بْنُ حَيَّانَ حَدَّثَنَا ابْنُ أَبِي حَازِمٍ، كِلاَهُمَا عَنْ سُهَيْلِ بْنِ أَبِي صَالِحٍ، عَنْ أَبِيهِ، عَنْ أَبِي هُرَيْرَةَ، أَنَّ رَسُولَ اللَّهِ صلى الله عليه وسلم قَالَ ‏
"‏ مَنْ حَمَلَ عَلَيْنَا السِّلاَحَ فَلَيْسَ مِنَّا وَمَنْ غَشَّنَا فَلَيْسَ مِنَّا ‏"‏ ‏.‏`,
      sha256: "0ae114813da4ca30432cd04bebb517da7cb61df4cd4449c57357ac2a955f689d",
      url: "https://github.com/R3GENESI5/Itqan/blob/199d870da5b726356b4a8dbaa096140cffb7d0ab/app/data/sunni/muslim/1.json",
      review_status: "needs_review",
      source_verified: !0,
      scholarly_approved: !1
    },
    {
      id: "itqan:bukhari:46:8:ea82d87c12e2",
      collection: "bukhari",
      chapter: "كتاب المظالم",
      position: 8,
      text: `حَدَّثَنَا أَحْمَدُ بْنُ يُونُسَ، حَدَّثَنَا عَبْدُ الْعَزِيزِ الْمَاجِشُونُ، أَخْبَرَنَا عَبْدُ اللَّهِ بْنُ دِينَارٍ، عَنْ عَبْدِ اللَّهِ بْنِ عُمَرَ ـ رضى الله عنهما ـ عَنِ النَّبِيِّ صلى الله عليه وسلم قَالَ ‏
"‏ الظُّلْمُ ظُلُمَاتٌ يَوْمَ الْقِيَامَةِ ‏"‏‏.‏`,
      sha256: "ea82d87c12e2019adfa5fef7953adfbce5a8979c3cee5a755ba0358ef4a30718",
      url: "https://github.com/R3GENESI5/Itqan/blob/199d870da5b726356b4a8dbaa096140cffb7d0ab/app/data/sunni/bukhari/46.json",
      review_status: "needs_review",
      source_verified: !0,
      scholarly_approved: !1
    }
  ],
  "topic-knowledge": [
    {
      id: "itqan:muslim:48:48:914dcfac86be",
      collection: "muslim",
      chapter: "كتاب الذكر والدعاء والتوبة والاستغفار",
      position: 48,
      text: `حَدَّثَنَا يَحْيَى بْنُ يَحْيَى التَّمِيمِيُّ، وَأَبُو بَكْرِ بْنُ أَبِي شَيْبَةَ وَمُحَمَّدُ بْنُ الْعَلاَءِ الْهَمْدَانِيُّ
 - وَاللَّفْظُ لِيَحْيَى - قَالَ يَحْيَى أَخْبَرَنَا وَقَالَ الآخَرَانِ، حَدَّثَنَا أَبُو مُعَاوِيَةَ، عَنِ الأَعْمَشِ، عَنْ 
 أَبِي صَالِحٍ، عَنْ أَبِي هُرَيْرَةَ، قَالَ قَالَ رَسُولُ اللَّهِ صلى الله عليه وسلم ‏
"‏ مَنْ نَفَّسَ عَنْ
 مُؤْمِنٍ كُرْبَةً مِنْ كُرَبِ الدُّنْيَا نَفَّسَ اللَّهُ عَنْهُ كُرْبَةً مِنْ كُرَبِ يَوْمِ الْقِيَامَةِ وَمَنْ يَسَّرَ عَلَى مُعْسِرٍ
 يَسَّرَ اللَّهُ عَلَيْهِ فِي الدُّنْيَا وَالآخِرَةِ وَمَنْ سَتَرَ مُسْلِمًا سَتَرَهُ اللَّهُ فِي الدُّنْيَا وَالآخِرَةِ وَاللَّهُ
 فِي عَوْنِ الْعَبْدِ مَا كَانَ الْعَبْدُ فِي عَوْنِ أَخِيهِ وَمَنْ سَلَكَ طَرِيقًا يَلْتَمِسُ فِيهِ عِلْمًا سَهَّلَ اللَّهُ
 لَهُ بِهِ طَرِيقًا إِلَى الْجَنَّةِ وَمَا اجْتَمَعَ قَوْمٌ فِي بَيْتٍ مِنْ بُيُوتِ اللَّهِ يَتْلُونَ كِتَابَ اللَّهِ وَيَتَدَارَسُونَهُ
 بَيْنَهُمْ إِلاَّ نَزَلَتْ عَلَيْهِمُ السَّكِينَةُ وَغَشِيَتْهُمُ الرَّحْمَةُ وَحَفَّتْهُمُ الْمَلاَئِكَةُ وَذَكَرَهُمُ اللَّهُ فِيمَنْ عِنْدَهُ
 وَمَنْ بَطَّأَ بِهِ عَمَلُهُ لَمْ يُسْرِعْ بِهِ نَسَبُهُ ‏"‏ ‏.‏`,
      sha256: "914dcfac86be6ae143a6d19f49363839a7fee9ab6f90c8b425e0246cd16b711a",
      url: "https://github.com/R3GENESI5/Itqan/blob/199d870da5b726356b4a8dbaa096140cffb7d0ab/app/data/sunni/muslim/48.json",
      review_status: "needs_review",
      source_verified: !0,
      scholarly_approved: !1
    },
    {
      id: "itqan:bukhari:3:11:7bca050e20fb",
      collection: "bukhari",
      chapter: "كتاب العلم",
      position: 11,
      text: `حَدَّثَنَا مُحَمَّدُ بْنُ بَشَّارٍ، قَالَ حَدَّثَنَا يَحْيَى بْنُ سَعِيدٍ، قَالَ حَدَّثَنَا شُعْبَةُ، قَالَ حَدَّثَنِي أَبُو التَّيَّاحِ، عَنْ أَنَسٍ، عَنِ النَّبِيِّ صلى الله عليه وسلم قَالَ ‏
"‏ يَسِّرُوا وَلاَ تُعَسِّرُوا، وَبَشِّرُوا وَلاَ تُنَفِّرُوا ‏"‏‏.‏`,
      sha256: "7bca050e20fbcecea43060fddcf8582dd76a794ea65cd79c96a8b4a13eafa42b",
      url: "https://github.com/R3GENESI5/Itqan/blob/199d870da5b726356b4a8dbaa096140cffb7d0ab/app/data/sunni/bukhari/3.json",
      review_status: "needs_review",
      source_verified: !0,
      scholarly_approved: !1
    }
  ]
};
function Ym(r) {
  var n;
  const e = r == null ? void 0 : r.lesson_content;
  if ((r == null ? void 0 : r.format) !== "card" || !(e != null && e.headline) || !e.takeaway || !Array.isArray(r.quotes) || !r.quotes.length) return null;
  const t = [];
  for (const a of r.quotes) {
    const i = (Ql[r.topic_id] || []).find((c) => c.id === a.occurrence_id), o = a.exact_text || ((n = a.text) == null ? void 0 : n.replace(/^«|»$/g, "")), s = a.source_span;
    if (!i || !o || !Array.isArray(s) || s.length !== 2 || !s.every(Number.isInteger) || s[0] < 0 || s[0] >= s[1] || Array.from(i.text).slice(s[0], s[1]).join("") !== o) return null;
    const l = { bukhari: "صحيح البخاري", muslim: "صحيح مسلم", tirmidhi: "جامع الترمذي", abudawud: "سنن أبي داود", nasai: "سنن النسائي", ibnmajah: "سنن ابن ماجه" };
    t.push({ exact_text: o, source_label: `${l[i.collection] || i.collection} · ${i.chapter}`, occurrence_id: i.id, source_url: i.url, text_sha256: i.sha256, source_span: s, source_locator: { display_label: `موضع المصدر المحلي: ${i.position}`, numbering_note: "الموضع في بيانات إتقان، وليس رقم الحديث في جميع الطبعات." } });
  }
  return { schema_version: "1", type: "hadith_card", headline: e.headline, takeaway: e.takeaway, quotes: t };
}
function jm(r, e = []) {
  var s;
  const t = (s = (r == null ? void 0 : r.chat) || r) == null ? void 0 : s.history;
  if (!(t != null && t.messages) || !t.currentId) return [];
  const n = new Set(e), a = /* @__PURE__ */ new Set(), i = [];
  let o = t.currentId;
  for (; o && !a.has(o); ) {
    a.add(o);
    const l = t.messages[o];
    if (!l) break;
    if (o = l.parentId, l.role !== "assistant" || n.size && !n.has(l.id)) continue;
    const c = Array.isArray(l.output) ? l.output : [], d = new Set(c.filter((u) => u.type === "function_call" && /(?:^|[._])get_reviewed_lesson$/.test(u.name || "")).map((u) => u.call_id));
    for (const u of [...c].reverse()) {
      if (u.type !== "function_call_output" || !d.has(u.call_id)) continue;
      const p = typeof u.output == "string" ? [{ text: u.output }] : u.output;
      if (Array.isArray(p)) {
        for (const h of p)
          if (!(typeof (h == null ? void 0 : h.text) != "string" || h.text.length > 2e6))
            try {
              const b = JSON.parse(h.text), f = b == null ? void 0 : b.data, m = (f == null ? void 0 : f.presentation) || Ym(f);
              if (b.schema_version !== "1" || b.status !== "needs_review" || (f == null ? void 0 : f.format) !== "card" || f.source_verified !== !0 || f.scholarly_approved !== !1 || f.review_status !== "needs_review" || (m == null ? void 0 : m.type) !== "hadith_card" || m.schema_version !== "1" || !m.headline || !m.takeaway || !Array.isArray(m.quotes) || !m.quotes.length || m.quotes.some((v) => !v.exact_text || !v.source_label || !v.occurrence_id || !v.text_sha256 || !Array.isArray(v.source_span) || v.source_span.length !== 2 || !Wl(v.source_url))) continue;
              i.push({ ...f, presentation: m, message_id: l.id });
              break;
            } catch {
            }
        break;
      }
    }
  }
  return i;
}
function Wl(r) {
  try {
    const e = new URL(r);
    return e.protocol === "https:" && !e.username && !e.password ? e.href : null;
  } catch {
    return null;
  }
}
function Uc(r, e = !1) {
  const t = r.presentation, n = [
    t.headline,
    t.takeaway,
    ...t.quotes.map((a) => `«${a.exact_text}»
${a.source_label}`),
    "مسودة تعليمية تحتاج مراجعة علمية؛ مطابقة النص للمصدر لا تعني اعتماد الشرح."
  ];
  return e && n.push(...t.quotes.map((a) => {
    var i;
    return `${a.occurrence_id}
${a.source_url}
${((i = a.source_locator) == null ? void 0 : i.display_label) || ""}
SHA-256: ${a.text_sha256}`;
  })), n.join(`

`);
}
const Cr = (r) => String(r ?? "").replace(/[&<>"']/g, (e) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[e]);
function Fm(r) {
  const e = r.presentation;
  return `<!doctype html><html lang="ar" dir="rtl"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta http-equiv="Content-Security-Policy" content="default-src 'none'; style-src 'unsafe-inline'"><title>${Cr(e.headline)}</title><style>body{margin:0;padding:3vw;background:#eee9df;color:#30223f;font:18px/1.9 Tahoma,Arial}article{max-width:760px;margin:auto;padding:40px;background:#fffdf7;border:1px solid #c5ac77;border-radius:28px}small{color:#795e39}h1{font-size:30px}blockquote{padding:20px;margin:20px 0;background:#f3edf6;border-right:4px solid #b99a60;border-radius:16px}a{color:#624079}details{font-size:14px;overflow-wrap:anywhere}footer{border-top:1px solid #dacdac;padding-top:16px;font-size:13px}@media print{body{background:white;padding:0}article{border:0;max-width:none}details{display:block}}</style><article><small>بيان السُّنّة · ${Cr(r.title_ar)}</small><h1>${Cr(e.headline)}</h1><p>${Cr(e.takeaway)}</p>${e.quotes.map((t) => `<blockquote>«${Cr(t.exact_text)}»<br><small>${Cr(t.source_label)}</small></blockquote>`).join("")}<footer>مسودة تعليمية تحتاج مراجعة علمية؛ مطابقة النص للمصدر لا تعني اعتماد الشرح.</footer><details><summary>تفاصيل المصادر والتحقق</summary>${e.quotes.map((t) => {
    var n;
    return `<p>${Cr(t.source_label)}<br><a href="${Cr(Wl(t.source_url) || "")}" rel="noopener noreferrer">المصدر</a><br>${Cr((n = t.source_locator) == null ? void 0 : n.display_label)}<br>${Cr(t.occurrence_id)}<br>SHA-256: ${Cr(t.text_sha256)}</p>`;
  }).join("")}</details></article></html>`;
}
const ke = (r, e = "", t) => {
  const n = document.createElement(r);
  return n.className = e, t !== void 0 && (n.textContent = t), n;
};
function aa(r, e) {
  const t = ke("button", "bayan-card-button", r);
  return t.type = "button", t.onclick = e, t;
}
function Jp(r, e, t) {
  var d, u;
  const n = r.presentation, a = ke("article", "bayan-lesson-card");
  a.dir = "rtl", a.setAttribute("aria-label", "بطاقة تعليمية: " + n.headline);
  const i = ke("div", "bayan-card-face"), o = ke("div", "bayan-card-top");
  o.append(ke("span", "bayan-card-brand", "بيان السُّنّة"), ke("span", "bayan-card-topic", r.title_ar)), i.append(o, ke("h2", "", n.headline), ke("p", "bayan-card-takeaway", n.takeaway));
  for (const p of n.quotes) {
    const h = ke("blockquote", "bayan-card-quote");
    h.append(ke("p", "", `«${p.exact_text}»`), ke("cite", "", p.source_label)), i.append(h);
  }
  i.append(ke("p", "bayan-card-review", "مسودة تعليمية · تحتاج مراجعة علمية")), a.append(i);
  const s = ke("div", "bayan-card-controls"), l = ke("span", "bayan-card-feedback");
  l.setAttribute("role", "status"), s.append(aa("عرض البطاقة", () => {
    var h;
    const p = ke("dialog", "bayan-card-dialog");
    p.dir = "rtl", p.setAttribute("aria-label", "عرض البطاقة التعليمية"), p.append(aa("إغلاق البطاقة", () => {
      p.close(), p.remove();
    }), Jp(r, e)), (h = p.querySelectorAll(".bayan-card-controls button")[0]) == null || h.remove(), p.onclick = (b) => {
      b.target === p && (p.close(), p.remove());
    }, p.onclose = () => p.remove(), document.body.append(p), p.showModal();
  })), s.append(aa("نسخ البطاقة", async () => {
    try {
      await navigator.clipboard.writeText(Uc(r, !1)), l.textContent = "نُسخت البطاقة بمصادرها المختصرة";
    } catch {
      l.textContent = "تعذر النسخ؛ يمكنك تنزيل البطاقة";
    }
  })), s.append(aa("تنزيل البطاقة", () => {
    const p = ke("a"), h = URL.createObjectURL(new Blob([Fm(r)], { type: "text/html;charset=utf-8" }));
    p.href = h, p.download = `bayan-${r.topic_id}${r.subtopic_id ? "-" + r.subtopic_id : ""}.html`, p.click(), setTimeout(() => URL.revokeObjectURL(h), 1e3), l.textContent = "بطاقة HTML مستقلة؛ افتحها للعرض أو اطبعها إلى PDF";
  })), s.append(aa("استكشف موضوعًا آخر", e)), t && s.append(aa("عرض نص المحادثة", t)), a.append(s, l);
  const c = ke("details", "bayan-card-sources");
  c.append(ke("summary", "", `المصادر والتحقق · ${n.quotes.length} شواهد`), ke("p", "", r.scope_note));
  for (const p of n.quotes) {
    const h = ke("div", "bayan-card-source"), b = ke("a", "", p.source_label);
    b.href = Wl(p.source_url), b.target = "_blank", b.rel = "noopener noreferrer", h.append(b, ke("p", "", p.selection_rationale)), h.append(ke("p", "", ((d = p.source_locator) == null ? void 0 : d.display_label) || ""), ke("code", "", p.occurrence_id), ke("p", "", ((u = p.source_locator) == null ? void 0 : u.numbering_note) || ""), ke("code", "", `SHA-256: ${p.text_sha256}`)), p.attributed_judgment && h.append(ke("p", "", typeof p.attributed_judgment == "string" ? p.attributed_judgment : JSON.stringify(p.attributed_judgment))), c.append(h);
  }
  return c.append(aa("نسخ تفاصيل التوثيق", async () => {
    try {
      await navigator.clipboard.writeText(Uc(r, !0)), l.textContent = "نُسخت تفاصيل التوثيق كاملة";
    } catch {
      l.textContent = "تعذر النسخ";
    }
  })), c.append(ke("p", "", "مطابقة النص للفهرس المحلي لا تعني اعتماد التفسير أو اكتمال تغطية الكتب الستة.")), a.append(c), a;
}
const Bm = [
  {
    id: "topic-faith",
    title: "الإيمان والمعنى",
    titleEn: "Faith and Purpose",
    question: "كيف يربط الإسلام الإيمان بالنية والعمل؟",
    questionEn: "How does Islam connect inner faith with intention and daily action?",
    seedQueries: [
      "الإيمان",
      "النيات"
    ],
    chapterTitles: [
      "كتاب بدء الوحى",
      "كتاب الإيمان",
      "كتاب الرقاق",
      "كتاب القدر",
      "كتاب الإيمان وشرائعه"
    ],
    chapterCount: 10,
    collections: [
      "bukhari",
      "muslim",
      "nasai",
      "tirmidhi"
    ],
    subtopics: [
      {
        id: "faith_intention",
        title: "النية والإخلاص وتجريد القصد لله",
        objective: "فهم أن الأعمال في الإسلام لا تُقاس بظاهرها المادي فحسب، بل بصدق القصد الباطني ونقاء النية.",
        cardAvailable: !0,
        scopeNote: "يغطي هذا الدرس معنى الشواهد المختارة فقط، ولا يزعم تغطية جميع جوانب المحور الفرعي."
      },
      {
        id: "faith_pillars",
        title: "أركان الإيمان وأثرها في سكينة النفس",
        objective: "استيعاب ركائز الإيمان بالله ورسله واليوم الآخر كمنظومة تعطي الإنسان طمأنينة وغاية في الوجود.",
        cardAvailable: !1,
        scopeNote: "لم تُجهز شواهد هذا المحور الفرعي بعد."
      },
      {
        id: "faith_conduct",
        title: "الإيمان سلوك عملي ومسؤولية أخلاقية",
        objective: "إدراك أن الإيمان الصادق يثمر حياءً وحسن تعامل وأمانة، وأن دعوى الإيمان بلا عمل دعوى جوفاء.",
        cardAvailable: !0,
        scopeNote: "يغطي هذا الدرس معنى الشواهد المختارة فقط، ولا يزعم تغطية جميع جوانب المحور الفرعي."
      }
    ],
    mappingStatus: "semantic_pack_derived",
    reviewStatus: "needs_review",
    sourceVerified: !0,
    scholarlyApproved: !1,
    modelId: "hadith-islam-guide",
    unifiedModelId: "bayan-unified-pilot",
    primarySkillId: "hadith-islam-guide"
  },
  {
    id: "topic-mercy",
    title: "الرحمة وحسن الخلق",
    titleEn: "Mercy and Good Character",
    question: "كيف تظهر الرحمة في تعامل المسلم مع الناس؟",
    questionEn: "How is mercy manifested in a Muslim's interaction with humanity and creation?",
    seedQueries: [
      "من لا يرحم",
      "الرفق"
    ],
    chapterTitles: [
      "كتاب الأدب",
      "كتاب الرقاق",
      "كتاب البر والصلة والآداب",
      "كتاب الأدب عن رسول الله صلى الله عليه وسلم"
    ],
    chapterCount: 7,
    collections: [
      "abudawud",
      "bukhari",
      "ibnmajah",
      "muslim",
      "tirmidhi"
    ],
    subtopics: [
      {
        id: "mercy_universal",
        title: "الرحمة الشاملة بالبشر والحيوان وسائر الخلق",
        objective: "إبراز أن رسالة النبي ﷺ قائمة على الرحمة العامة، وأن الإحسان للحيوان والضعيف سبب لمغفرة الله.",
        cardAvailable: !0,
        scopeNote: "يغطي هذا الدرس معنى الشواهد المختارة فقط، ولا يزعم تغطية جميع جوانب المحور الفرعي."
      },
      {
        id: "mercy_gentleness",
        title: "الرفق ونبذ العنف والغلظة",
        objective: "بيان فضل الرفق والتأني في معالجة الأمور، وأن ما كان الرفق في شيء إلا زانه.",
        cardAvailable: !0,
        scopeNote: "يغطي هذا الدرس معنى الشواهد المختارة فقط، ولا يزعم تغطية جميع جوانب المحور الفرعي."
      },
      {
        id: "mercy_character",
        title: "بشاشة الوجه وطيب الكلام والتواضع",
        objective: "تبيان أن التبسم والكلمة الطيبة والصفح من صميم الدين ومراتب الفضل عند الله.",
        cardAvailable: !1,
        scopeNote: "لم تُجهز شواهد هذا المحور الفرعي بعد."
      }
    ],
    mappingStatus: "semantic_pack_derived",
    reviewStatus: "needs_review",
    sourceVerified: !0,
    scholarlyApproved: !1,
    modelId: "hadith-islam-guide",
    unifiedModelId: "bayan-unified-pilot",
    primarySkillId: "hadith-islam-guide"
  },
  {
    id: "topic-worship",
    title: "العبادة والحياة",
    titleEn: "Worship and Life",
    question: "ما الصلة بين العبادة والحياة اليومية؟",
    questionEn: "What is the connection between Islamic worship and everyday life?",
    seedQueries: [
      "الصلاة",
      "الصيام"
    ],
    chapterTitles: [
      "كتاب الصوم",
      "كتاب الصلاة",
      "كتاب الزكاة",
      "كتاب العمل فى الصلاة",
      "كتاب الزكاة عن رسول الله صلى الله عليه وسلم"
    ],
    chapterCount: 16,
    collections: [
      "abudawud",
      "bukhari",
      "ibnmajah",
      "muslim",
      "nasai",
      "tirmidhi"
    ],
    subtopics: [
      {
        id: "worship_prayer",
        title: "الصلاة: معراج الروح ومحطة السكينة اليومية",
        objective: "إدراك الصلاة كصلة مستمرة بالله تريح القلب وتنهى عن الفحشاء والمنكر وتضبط إيقاع اليوم.",
        cardAvailable: !0,
        scopeNote: "يغطي هذا الدرس معنى الشواهد المختارة فقط، ولا يزعم تغطية جميع جوانب المحور الفرعي."
      },
      {
        id: "worship_fasting",
        title: "الصوم: تدريب الإرادة ومواساة المحتاجين",
        objective: "فهم الصيام كوسيلة للتحكم في الشهوات والشعور الفعلي بجوع الفقراء وتزكية النفس.",
        cardAvailable: !0,
        scopeNote: "يغطي هذا الدرس معنى الشواهد المختارة فقط، ولا يزعم تغطية جميع جوانب المحور الفرعي."
      },
      {
        id: "worship_solidarity",
        title: "الزكاة والصدقة: النماء والتكافل المجتمعي",
        objective: "بيان أن التصدق ليس مجرد ضريبة مالية بل تطهير للمال وشعور بالمسؤولية التكافلية تجاه المحتاجين.",
        cardAvailable: !1,
        scopeNote: "لم تُجهز شواهد هذا المحور الفرعي بعد."
      }
    ],
    mappingStatus: "semantic_pack_derived",
    reviewStatus: "needs_review",
    sourceVerified: !0,
    scholarlyApproved: !1,
    modelId: "hadith-islam-guide",
    unifiedModelId: "bayan-unified-pilot",
    primarySkillId: "hadith-islam-guide"
  },
  {
    id: "topic-family",
    title: "الأسرة والجوار",
    titleEn: "Family and Neighbors",
    question: "كيف يحفظ الإسلام حقوق الأسرة والجار؟",
    questionEn: "How does Islam safeguard family bonds and neighborly rights?",
    seedQueries: [
      "الجار",
      "الوالدين"
    ],
    chapterTitles: [
      "كتاب النكاح",
      "كتاب الأدب",
      "كتاب النفقات",
      "كتاب البر والصلة والآداب",
      "كتاب النكاح عن رسول الله صلى الله عليه وسلم"
    ],
    chapterCount: 13,
    collections: [
      "abudawud",
      "bukhari",
      "ibnmajah",
      "muslim",
      "nasai",
      "tirmidhi"
    ],
    subtopics: [
      {
        id: "family_parents",
        title: "بر الوالدين وصلة الأرحام",
        objective: "إظهار منزلة الأم والأب في الإسلام كأعظم الواجبات الاجتماعية بعد التوحيد.",
        cardAvailable: !1,
        scopeNote: "لم تُجهز شواهد هذا المحور الفرعي بعد."
      },
      {
        id: "family_neighbors",
        title: "حقوق الجار وحرمة إيذائه وإكرامه",
        objective: "بيان الوصية النبوية المتكررة بالجار مسلماً كان أو غير مسلم، وحرمة ترويعه أو بخسه.",
        cardAvailable: !0,
        scopeNote: "يغطي هذا الدرس معنى الشواهد المختارة فقط، ولا يزعم تغطية جميع جوانب المحور الفرعي."
      },
      {
        id: "family_spouses",
        title: "المودة والرحمة وحسن العشرة الزوجية",
        objective: "فهم المعيار النبوي للرجولة والخيرية: «خيركم خيركم لأهله وأنا خيركم لأهلي».",
        cardAvailable: !1,
        scopeNote: "لم تُجهز شواهد هذا المحور الفرعي بعد."
      }
    ],
    mappingStatus: "semantic_pack_derived",
    reviewStatus: "needs_review",
    sourceVerified: !0,
    scholarlyApproved: !1,
    modelId: "hadith-islam-guide",
    unifiedModelId: "bayan-unified-pilot",
    primarySkillId: "hadith-islam-guide"
  },
  {
    id: "topic-fairness",
    title: "العدل والأمانة",
    titleEn: "Justice and Trustworthiness",
    question: "كيف تحضر الأمانة والعدل في التعاملات؟",
    questionEn: "How are justice, honesty, and trust manifested in trade and daily interactions?",
    seedQueries: [
      "غش",
      "الأمانة"
    ],
    chapterTitles: [
      "كتاب البيوع",
      "كتاب الإجارة",
      "كتاب المظالم",
      "كتاب الشهادات",
      "كتاب الصلح"
    ],
    chapterCount: 11,
    collections: [
      "abudawud",
      "bukhari",
      "muslim",
      "nasai",
      "tirmidhi"
    ],
    subtopics: [
      {
        id: "fairness_trade",
        title: "الصدق في البيع والشراء والتحذير من الغش",
        objective: "إدراك مكانة التاجر الصدوق الأمين، وحرمة التطفيف والغش والخداع.",
        cardAvailable: !0,
        scopeNote: "يغطي هذا الدرس معنى الشواهد المختارة فقط، ولا يزعم تغطية جميع جوانب المحور الفرعي."
      },
      {
        id: "fairness_justice",
        title: "حرمة الظلم وأداء الحقوق إلى أهلها",
        objective: "بيان تحريم الظلم حتى مع المخالف، وإيفاء الأجير حقه قبل أن يجف عرقه.",
        cardAvailable: !0,
        scopeNote: "يغطي هذا الدرس معنى الشواهد المختارة فقط، ولا يزعم تغطية جميع جوانب المحور الفرعي."
      },
      {
        id: "fairness_trust",
        title: "رعاية الأمانة والوفاء بالعهود",
        objective: "ترسيخ أن خيانة الأمانة ونقض العهد من سمات النفاق المنافية لجوهر الإسلام.",
        cardAvailable: !1,
        scopeNote: "لم تُجهز شواهد هذا المحور الفرعي بعد."
      }
    ],
    mappingStatus: "semantic_pack_derived",
    reviewStatus: "needs_review",
    sourceVerified: !0,
    scholarlyApproved: !1,
    modelId: "hadith-islam-guide",
    unifiedModelId: "bayan-unified-pilot",
    primarySkillId: "hadith-islam-guide"
  },
  {
    id: "topic-knowledge",
    title: "العلم والحوار",
    titleEn: "Knowledge and Civil Dialogue",
    question: "كيف يدعو الحديث إلى التعلم وحسن الحوار؟",
    questionEn: "How does Hadith encourage the pursuit of knowledge and gracious dialogue?",
    seedQueries: [
      "العلم",
      "فليقل خيرا"
    ],
    chapterTitles: [
      "كتاب العلم",
      "كتاب الأدب",
      "كتاب الاعتصام بالكتاب والسنة",
      "كتاب العلم عن رسول الله صلى الله عليه وسلم",
      "كتاب الأدب عن رسول الله صلى الله عليه وسلم"
    ],
    chapterCount: 9,
    collections: [
      "abudawud",
      "bukhari",
      "ibnmajah",
      "muslim",
      "tirmidhi"
    ],
    subtopics: [
      {
        id: "knowledge_seeking",
        title: "فضل طلب العلم ونشره وتيسيره للناس",
        objective: "بيان أن طلب العلم عبادة وفريضة، وتيسير التعلم منهج نبوي: «يسروا ولا تعسروا».",
        cardAvailable: !0,
        scopeNote: "يغطي هذا الدرس معنى الشواهد المختارة فقط، ولا يزعم تغطية جميع جوانب المحور الفرعي."
      },
      {
        id: "knowledge_dialogue",
        title: "أدب الحديث والكلمة الطيبة والصمت عن الشر",
        objective: "ترسيخ قاعدة «فليقل خيراً أو ليصمت» والابتعاد عن السباب والفحش والمراء.",
        cardAvailable: !1,
        scopeNote: "لم تُجهز شواهد هذا المحور الفرعي بعد."
      },
      {
        id: "knowledge_humility",
        title: "التثبت في النقل والتواضع وعدم ادعاء العلم",
        objective: "تعليم التثبت من صحة الأخبار ونبذ التقول والافتراء والتواضع مع المعلم والمتعلم.",
        cardAvailable: !1,
        scopeNote: "لم تُجهز شواهد هذا المحور الفرعي بعد."
      }
    ],
    mappingStatus: "semantic_pack_derived",
    reviewStatus: "needs_review",
    sourceVerified: !0,
    scholarlyApproved: !1,
    modelId: "hadith-islam-guide",
    unifiedModelId: "bayan-unified-pilot",
    primarySkillId: "hadith-islam-guide"
  }
], Dm = {
  newcomer: { code: "newcomer", label: "مهتم يتعرف على الإسلام" },
  "مهتم يتعرف على الإسلام": { code: "newcomer", label: "مهتم يتعرف على الإسلام" },
  new_muslim: { code: "new_muslim", label: "حديث العهد بالإسلام" },
  "حديث العهد بالإسلام": { code: "new_muslim", label: "حديث العهد بالإسلام" },
  educator: { code: "educator", label: "معرّف بالإسلام" },
  "معرّف بالإسلام": { code: "educator", label: "معرّف بالإسلام" }
}, Um = {
  card: { code: "card", label: "بطاقة تعريفية قصيرة" },
  "بطاقة تعريفية قصيرة": { code: "card", label: "بطاقة تعريفية قصيرة" },
  qa: { code: "qa", label: "حوار سؤال وجواب" },
  "حوار سؤال وجواب": { code: "qa", label: "حوار سؤال وجواب" },
  two_minute: { code: "two_minute", label: "كلمة تعريفية من دقيقتين" },
  "كلمة تعريفية من دقيقتين": { code: "two_minute", label: "كلمة تعريفية من دقيقتين" }
};
function Gm(r) {
  const e = Dm[r == null ? void 0 : r.trim()];
  if (!e) throw new Error(`Invalid audience: ${r}`);
  return e;
}
function Xm(r) {
  const e = Um[r == null ? void 0 : r.trim()];
  if (!e) throw new Error(`Invalid format: ${r}`);
  return e;
}
const Ya = { name: "بيان السُّنّة", subtitle: "الحديث النبوي للمعرّفين بالإسلام" }, Po = [
  {
    id: "prayer-call",
    modelId: "hadith-model-1",
    unifiedModelId: "bayan-unified-pilot",
    primarySkillId: "hadith-search-record",
    track: "explore",
    task: "phrase_search",
    title: "الصلاة جامعة",
    category: "النص ومصادره",
    icon: "layers",
    learn: "تعرّف على مواضع الحديث وسياقه قبل الاستشهاد به.",
    research: "قارن مواضع اللفظ في الكتب الستة، ثم توسّع في الأسانيد.",
    question: "ابحث لي عن أحاديث (الصلاة جامعة) في الكتب الستة واذكر أرقامها وأسانيدها",
    outputs: [
      { title: "مواضع الحديث", description: "استعرض النصوص والمراجع التي يعيدها النموذج، وافتح توثيق كل رواية." },
      { title: "السياق والاختلاف", description: "قارن بين مواضع اللفظ، وانتبه إلى اختلاف الواقعة والسياق قبل جمع الروايات." },
      { title: "مسارات الإسناد", description: "تابع بطلب الشجرة لعرض الرواة ومسارات الروايات بصيغة Mermaid." }
    ],
    followups: [
      {
        label: "اعرض شجرة الأسانيد",
        prompt: "ارسم شجرة Mermaid للأحاديث المذكورة أعلاه، مع الرواة ومراجع الروايات. اجعل النبي ﷺ في أعلى الرسم عندما تدعمه الرواية، وافصل المسارات، وأظهر أي جزء غير متاح بدل استكماله بالافتراض.",
        modelId: "hadith-mermaid-agent",
        unifiedSkillId: "hadith-mermaid-architect",
        task: "isnad_graph"
      },
      {
        label: "بسّط لي المعنى",
        prompt: "اشرح معنى الحديث وسياقه بلغة مناسبة للتعريف بالإسلام، مع مصادر الشرح، وميّز النص المنقول عن التلخيص.",
        modelId: "hadith-sharh-agent",
        unifiedSkillId: "hadith-sharh-scholar",
        task: "explanation"
      }
    ]
  },
  {
    id: "hajj-arafah",
    modelId: "hadith-modular-agent",
    unifiedModelId: "bayan-unified-pilot",
    primarySkillId: "hadith-takhrij-compare",
    track: "research",
    task: "compare_and_graph",
    title: "الحج عرفة",
    category: "الروايات وطرقها",
    icon: "branch",
    learn: "من سؤال عن الحج إلى رواياته ومصادره في عرض واحد.",
    research: "استعرض التخريج المقارن وشجرة الطرق التي يعيدها النموذج.",
    question: "حديث الحج عرفة من الكتب الستة مع رسم شجرة إسناد شاملة للجميع",
    outputs: [
      { title: "التخريج المقارن", description: "شاهد النص ومواضعه التي عثر عليها النموذج في نطاق الكتب الستة." },
      { title: "شجرة الرواية", description: "افتح مخطط Mermaid لتتبّع المسارات والأسماء المعروضة في الإجابة." },
      { title: "المصدر مع المعنى", description: "افحص عزو النصوص والأحكام، ثم تابع بسؤال عن المعنى أو ألفاظ الحديث." }
    ],
    followups: [
      {
        label: "قارن ألفاظ الروايات",
        prompt: "قارن ألفاظ الروايات التي استرجعتها لهذا الحديث في جدول، مع مصدر كل لفظ، وميّز اختلاف الألفاظ عن النسخ المتكررة.",
        modelId: "hadith-modular-agent",
        unifiedSkillId: "hadith-takhrij-compare",
        task: "compare"
      },
      {
        label: "هيّئ بطاقة للتعريف",
        prompt: "هيّئ بطاقة قصيرة للتعريف بالإسلام من هذا الحديث: النص المختار، مصدره، ومعناه المبسط من شرح موثق. لا تضف سياقًا أو حكمًا لا يدعمه المصدر.",
        modelId: "hadith-islam-guide",
        unifiedSkillId: "hadith-islam-guide",
        task: "introductory_material"
      }
    ]
  },
  {
    id: "abu-hurairah",
    modelId: "hadith-rijal-agent",
    unifiedModelId: "bayan-unified-pilot",
    primarySkillId: "hadith-rijal-critic",
    track: "research",
    task: "narrator_network",
    title: "رواة أبي هريرة",
    category: "الرواة وتراجمهم",
    icon: "person",
    learn: "تعرّف على ناقلي الحديث، وتواريخهم، ومصادر تراجمهم.",
    research: "افحص الرواة عن أبي هريرة في صحيح البخاري وتوسّع في أقوال النقاد.",
    question: "من هم الرواة عن أبو هريرة في صحيح البخاري؟ اذكرهم جميعًا مع تواريخ وفاتهم",
    outputs: [
      { title: "الرواة في الكتاب", description: "اعرض قائمة الرواة التي تعيدها الأداة ضمن الكتاب المطلوب." },
      { title: "تواريخ وتراجم", description: "راجع بيانات الترجمة وتواريخ الوفاة، وما يذكره المصدر من معلومات غير متاحة." },
      { title: "أقوال النقاد", description: "توسّع بطلب الرتبة الحديثية مع نسبة الأقوال إلى أصحابها ومصادرها." }
    ],
    followups: [
      {
        label: "أضف الرتب ومصادرها",
        prompt: "هل يمكنك إضافة تواريخ الوفاة والرتبة الحديثية لكل راوٍ في الجدول؟ انسب كل قول إلى صاحبه ومصدره، وأبقِ ما لا يتوفر له توثيق غير متاح.",
        modelId: "hadith-rijal-agent",
        unifiedSkillId: "hadith-rijal-critic",
        task: "narrator_grades"
      },
      {
        label: "ارسم شبكة مختصرة",
        prompt: "اعرض شجرة إسنادية مختصرة لأبرز الرواة المذكورين، مع مصادر العلاقات، ووضّح أنها شبكة رواة في الكتاب وليست إسنادًا لحديث واحد.",
        modelId: "hadith-rijal-agent",
        unifiedSkillId: "hadith-rijal-critic",
        task: "narrator_network"
      }
    ]
  }
], ml = Bm.map((r) => ({
  id: r.id,
  modelId: r.modelId,
  unifiedModelId: r.unifiedModelId || "bayan-unified-pilot",
  primarySkillId: r.primarySkillId || "hadith-islam-guide",
  track: "islam",
  task: "introductory_material",
  title: r.title,
  category: "التعريف بالإسلام",
  icon: "book",
  topic: r,
  learn: r.question,
  research: r.question,
  question: r.question,
  outputs: [
    { title: "الدليل", description: "استرجع شواهد من نطاق الكتب الستة مع بيانات الكتاب والباب، وبيّن ما عُثر عليه فعليًا." },
    { title: "المعنى", description: "افصل النص المنقول عن التلخيص التعريفي، وأظهر ما يحتاج إلى شرح معتمد أو مراجعة." },
    { title: "مادة للتعريف", description: "حوّل الأدلة إلى مسودة تناسب جمهورك، ثم راجع مصادرها قبل مشاركتها." }
  ],
  followups: [
    {
      label: "بسّط المصطلحات",
      prompt: "بسّط المصطلحات في الإجابة لقارئ يتعرف على الإسلام لأول مرة، دون إضافة نصوص أو مصادر غير مسترجعة.",
      modelId: "hadith-islam-guide",
      unifiedSkillId: "hadith-islam-guide",
      task: "simplify_terms"
    },
    {
      label: "جهّز بطاقة بالمصادر",
      prompt: "جهّز من المادة المسترجعة بطاقة تعريفية قصيرة، وافصل النص النبوي عن التلخيص الأولي وأبقِ المصادر وحدود المراجعة ظاهرة.",
      modelId: "hadith-islam-guide",
      unifiedSkillId: "hadith-islam-guide",
      task: "card"
    }
  ]
}));
function Ua(r) {
  return [...Po, ...ml].find((e) => e.id === r);
}
const Hm = {
  "prayer-call": ["hadith-mermaid-agent", "hadith-sharh-agent"],
  "hajj-arafah": ["hadith-modular-agent", "hadith-islam-guide"],
  "abu-hurairah": ["hadith-rijal-agent", "hadith-rijal-agent"]
};
function Km(r) {
  if (!r || r.length <= 1) return null;
  const e = [
    { id: "all", label: "جميع الطرق", route: "all_paths" }
  ];
  return r.forEach((t, n) => {
    var s, l, c, d;
    const a = t.path_id || `path_${n + 1}`, i = t.teacher_name || ((l = (s = t.narrator_sequence) == null ? void 0 : s[0]) == null ? void 0 : l.raw_name) || ((d = (c = t.narrators) == null ? void 0 : c[0]) == null ? void 0 : d.raw_name), o = i ? `الطريق ${n + 1} (${i})` : `الطريق ${n + 1}`;
    e.push({ id: a, label: o, route: a });
  }), e;
}
function Zm(r) {
  var i, o;
  const e = !!(r.grade_text || r.ibn_hajar || r.dhahabi), t = r.ibn_hajar || ((i = r.grade_source) != null && i.includes("تقريب") ? r.grade_text : void 0) || "غير مسجل في بيانات التقريب", n = r.dhahabi || ((o = r.grade_source) != null && o.includes("كاشف") ? r.grade_text : void 0) || "غير مسجل في بيانات الكاشف", a = r.source_span ? `[${r.source_span[0]}, ${r.source_span[1]}]${r.source_span_text ? ` «${r.source_span_text}»` : ""}` : "غير محدد في النص";
  return {
    raw_text: r.raw_text,
    occurrence_id: r.occurrence_id || "غير متوفر",
    mention_id: r.mention_id || "غير محدد",
    source_span_display: a,
    canonical_name: r.canonical_name || "هوية لم تُحسم في البيانات (تحتاج دليلاً)",
    identity_status: r.identity_status === "resolved" ? "هوية مثبتة بدليل" : r.identity_status === "ambiguous" ? "هوية غير محسومة (مشترك/مبهم)" : "هوية لم تُحسم في البيانات (تحتاج دليلاً)",
    ibn_hajar: t,
    dhahabi: n,
    general_grade: r.grade_text || "غير محدد بدليل صريح",
    grade_source: r.grade_source || (r.grade_text ? "منقول من قاعدة البيانات" : "لم يثبت قول ناقد في البيانات"),
    has_evidence: e,
    missing_evidence_note: e ? void 0 : "تنبيه منهجي: لا يتوفر دليل صريح مسجل على التوثيق أو التضعيف لهذا الراوي؛ لا يتم اشتقاق الرتبة تلقائياً من اسم الراوي."
  };
}
function Gc(r, e, t, n = {}) {
  var b;
  const a = Ua(e), i = a == null ? void 0 : a.followups[t];
  if (!a || !i) throw new Error("Unknown follow-up");
  const o = n.mode === "unified", s = o ? "bayan-unified-pilot" : i.modelId || ((b = Hm[e]) == null ? void 0 : b[t]) || a.modelId, l = o && i.unifiedSkillId ? `<$${i.unifiedSkillId}> ` : "", c = n.occurrenceIds && n.occurrenceIds.length > 0 ? `
السجل المحدد: ${n.occurrenceIds.join(", ")}` : "", d = n.selectedPathId ? `
مسار الإسناد المحدد: ${n.selectedPathId}` : "", u = n.anchorName ? `
الراوي المستهدف للتحقيق (صاحب الضمير): ${n.anchorName}` : n.mentionId ? `
الراوي المستهدف: ${n.mentionId}` : "", p = a.topic && i.task === "card" ? Xi(a, n.audience || "newcomer", "card", n.subtopicId || "") : `${l}الموضوع: ${a.title}. سؤال الحالة الأصلي: ${a.question}
المطلوب الآن: ${i.prompt}${c}${d}${u}
هذه مسودة مستقلة ولا تتضمن نتائج المحادثة السابقة. استرجع النصوص بالأدوات وحدد occurrence_id قبل الشرح أو الرسم. إذا لم يتحدد النص المقصود فاعرض المرشحين للاختيار. اعرض ما استرجعته فقط، وأبقِ الفجوات والالتباس وحالة المراجعة ظاهرة، ولا تفترض منتهى نبويًا لكل أثر.`, h = new URL($p(r, e, n.submit ?? !1, p, n));
  return h.searchParams.set("model", s), h.toString();
}
function Xi(r, e = "newcomer", t = "card", n = "") {
  var c;
  const a = Gm(e), i = Xm(t), o = (c = r.topic) == null ? void 0 : c.subtopics.find((d) => d.id === n);
  if (n && !o) throw new Error("Unknown subtopic");
  const s = o ? `${o.title} ضمن ${r.title}` : r.title;
  return `${i.code === "card" ? "أنشئ بطاقة تعريفية قصيرة مرئية" : i.code === "qa" ? "أعد حوار سؤال وجواب" : "أعد كلمة تعريفية من دقيقتين"} عن ${s}، لجمهور ${a.label}.`;
}
function $p(r, e, t = !1, n, a = {}) {
  const i = Ua(e);
  if (!i) throw new Error("Unknown demonstration");
  const o = new URL("/", r);
  if (!["http:", "https:"].includes(o.protocol)) throw new Error("Invalid application origin");
  const s = a.mode === "unified" ? i.unifiedModelId : i.modelId, l = n || (i.topic && (a.audience || a.format) ? Xi(i, a.audience || "newcomer", a.format || "card", a.subtopicId || "") : i.question), c = new URLSearchParams({
    model: s,
    q: l,
    submit: String(t),
    athar: "chat",
    case: i.id
  });
  return a.audience && c.set("audience", a.audience), a.format && c.set("format", a.format), a.subtopicId && c.set("subtopic", a.subtopicId), a.occurrenceIds && a.occurrenceIds.length > 0 && c.set("occurrenceIds", a.occurrenceIds.join(",")), a.routeKind && c.set("routeKind", a.routeKind), a.selectedPathId && c.set("selectedPathId", a.selectedPathId), a.mentionId && c.set("mentionId", a.mentionId), a.anchorName && c.set("anchorName", a.anchorName), o.search = c.toString(), o.toString();
}
function Qm(r, e, t = {}) {
  if (!Object.values(Ql).flat().some((s) => s.id === e))
    throw new Error("Unknown evidence record");
  const n = new URL("/", r);
  if (!["http:", "https:"].includes(n.protocol)) throw new Error("Invalid application origin");
  const a = t.mode === "unified", i = a ? "bayan-unified-pilot" : "hadith-phrase-poc", o = a ? `افتح السجل ${e} باستخدام get_hadith_by_number(occurrence_id="${e}") واعرض نصه ومصدره وحالة المراجعة.` : `افتح السجل ${e} باستخدام open_hadith_record واعرض نصه ومصدره وحالة المراجعة.`;
  return n.search = new URLSearchParams({
    model: i,
    q: o,
    submit: "false",
    athar: "chat"
  }).toString(), n.toString();
}
function Xc() {
  var k, x, A;
  if (!location.pathname.startsWith("/auth")) return;
  document.title.includes("بيان السنة") || (document.title = "بيان السنة — تسجيل الدخول");
  try {
    const y = localStorage.getItem("locale");
    (!y || y === "en-US" || y === "en") && localStorage.setItem("locale", "ar-BH");
  } catch {
  }
  const r = document.getElementById("auth-login-card");
  if (!r) return;
  r.getAttribute("dir") !== "rtl" && r.setAttribute("dir", "rtl");
  const e = r.querySelector("form > div.mb-1 > div.text-2xl") || r.querySelector(".text-2xl");
  if (e) {
    const y = e.textContent || "";
    y.includes("Sign up") || y.includes("سجّل في") || y.includes("Create Account") ? e.textContent !== "إنشاء حساب في بيان السنة" && (e.textContent = "إنشاء حساب في بيان السنة") : y.includes("Get started") || y.includes("ابدأ") ? e.textContent !== "ابدأ مع بيان السنة" && (e.textContent = "ابدأ مع بيان السنة") : y.includes("LDAP") ? e.textContent !== "تسجيل الدخول عبر LDAP — بيان السنة" && (e.textContent = "تسجيل الدخول عبر LDAP — بيان السنة") : e.textContent !== "تسجيل الدخول إلى بيان السنة" && (e.textContent = "تسجيل الدخول إلى بيان السنة");
  }
  const t = r.querySelector("form > div.mb-1 > div.text-xs");
  if (t) {
    const y = "ⓘ بيان السنة يعمل محليًا بالكامل وتبقى بياناتك محفوظة بأمان على خادمك.";
    t.textContent !== y && (t.textContent = y);
  }
  const n = r.querySelector('label[for="email"]');
  n && n.textContent !== "البريد الإلكتروني" && (n.textContent = "البريد الإلكتروني");
  const a = r.querySelector("input#email");
  a && a.placeholder !== "أدخل البريد الإلكتروني" && (a.placeholder = "أدخل البريد الإلكتروني");
  const i = r.querySelector('label[for="password"]:not(.sr-only)');
  i && i.textContent !== "كلمة المرور" && (i.textContent = "كلمة المرور");
  const o = r.querySelector('label.sr-only[for="password"]');
  o && o.textContent !== "أدخل كلمة المرور" && (o.textContent = "أدخل كلمة المرور");
  const s = r.querySelector("input#password");
  s && s.placeholder !== "أدخل كلمة المرور" && (s.placeholder = "أدخل كلمة المرور");
  const l = r.querySelector(
    'button[aria-label*="password" i], button[aria-label*="كلمة المرور"]'
  );
  if (l) {
    const y = l.getAttribute("aria-pressed") === "true";
    l.setAttribute("aria-label", y ? "إخفاء كلمة المرور" : "إظهار كلمة المرور");
  }
  const c = r.querySelector('label[for="name"]');
  c && c.textContent !== "الاسم" && (c.textContent = "الاسم");
  const d = r.querySelector("input#name");
  d && d.placeholder !== "أدخل اسمك الكامل" && (d.placeholder = "أدخل اسمك الكامل");
  const u = r.querySelector('label[for="confirm-password"]');
  u && u.textContent !== "تأكيد كلمة المرور" && (u.textContent = "تأكيد كلمة المرور");
  const p = r.querySelector("input#confirm-password");
  p && p.placeholder !== "أدخل تأكيد كلمة المرور" && (p.placeholder = "أدخل تأكيد كلمة المرور");
  const h = r.querySelector('label[for="username"]');
  h && h.textContent !== "اسم المستخدم" && (h.textContent = "اسم المستخدم");
  const b = r.querySelector("input#username");
  b && b.placeholder !== "أدخل اسم المستخدم" && (b.placeholder = "أدخل اسم المستخدم");
  const f = r.querySelector('button[type="submit"]');
  if (f) {
    const y = f.querySelector(".self-center") || f, w = (y.textContent || "").trim();
    w.includes("Create") || w.includes("إنشاء") || w.includes("حساب") ? y.textContent !== "إنشاء حساب" && (y.textContent = "إنشاء حساب") : y.textContent !== "تسجيل الدخول" && (y.textContent = "تسجيل الدخول");
  }
  const m = r.querySelector("div.mt-4.text-sm.text-center") || r.querySelector("div.text-sm.text-center");
  if (m) {
    const y = m.querySelector("button");
    if (y) {
      const w = ((k = y.textContent) == null ? void 0 : k.trim()) || "";
      w === "Sign up" || w === "تسجيل" || w === "إنشاء حساب" ? (((x = m.childNodes[0]) == null ? void 0 : x.nodeType) === Node.TEXT_NODE && (m.childNodes[0].textContent = "ليس لديك حساب؟ "), y.textContent !== "إنشاء حساب" && (y.textContent = "إنشاء حساب")) : (w === "Sign in" || w === "تسجيل الدخول") && (((A = m.childNodes[0]) == null ? void 0 : A.nodeType) === Node.TEXT_NODE && (m.childNodes[0].textContent = "لديك حساب بالفعل؟ "), y.textContent !== "تسجيل الدخول" && (y.textContent = "تسجيل الدخول"));
    }
  }
  const v = r.querySelector("img#logo");
  v && v.alt !== "شعار بيان السنة" && (v.alt = "شعار بيان السنة");
}
function Hc(r) {
  var e;
  return ((e = r.match(/(?:^|-)flowchart-([a-zA-Z0-9_]+)(?:-\d+)?$/)) == null ? void 0 : e[1]) || null;
}
function Wm(r, e = []) {
  const t = (r == null ? void 0 : r.chat) || r, n = t == null ? void 0 : t.history;
  if (!(n != null && n.messages) || !n.currentId) return null;
  const a = new Set(e), i = [], o = /* @__PURE__ */ new Set();
  let s = n.currentId;
  for (; s && !o.has(s); ) {
    o.add(s);
    const l = n.messages[s];
    if (!l) break;
    i.push(l), s = l.parentId;
  }
  for (const l of i) {
    if (l.role !== "assistant" || a.size && !a.has(l.id)) continue;
    const c = Array.isArray(l.output) ? l.output : [], d = new Set(c.filter(
      (u) => u.type === "function_call" && /(?:^|[._])get_hadith_isnad_tree$/.test(u.name || "")
    ).map((u) => u.call_id));
    for (const u of [...c].reverse()) {
      if (u.type !== "function_call_output" || !d.has(u.call_id)) continue;
      const p = typeof u.output == "string" ? [{ text: u.output }] : u.output;
      if (Array.isArray(p)) {
        for (const h of p)
          if (!(typeof (h == null ? void 0 : h.text) != "string" || h.text.length > 2e6))
            try {
              const b = JSON.parse(h.text), f = b == null ? void 0 : b.data;
              if (!["ok", "partial"].includes(b.status) || !(f != null && f.occurrence_id) || !Array.isArray(f.paths) || !f.paths.length || !Array.isArray(f.nodes)) continue;
              return { ...b, message_id: l.id };
            } catch {
            }
      }
    }
  }
  return null;
}
const Kc = { book: "M12 5v16M3 3h5a4 4 0 0 1 4 2 4 4 0 0 1 4-2h5v16h-5a4 4 0 0 0-4 2 4 4 0 0 0-4-2H3Z", layers: "m12 3 10 6-10 6L2 9Zm-9 11 9 5 9-5m-18 5 9 5 9-5", branch: "M6 6v9a4 4 0 0 0 4 4h5M6 8h8a4 4 0 0 0 4-4M3 3a3 3 0 1 0 6 0 3 3 0 0 0-6 0M15 3a3 3 0 1 0 6 0 3 3 0 0 0-6 0M15 19a3 3 0 1 0 6 0 3 3 0 0 0-6 0", person: "M20 21v-2a7 7 0 0 0-14 0v2M8 7a5 5 0 1 0 10 0A5 5 0 0 0 8 7", arrow: "M19 12H5m6-6-6 6 6 6", close: "m6 6 12 12M6 18 18 6", play: "m8 4 12 8-12 8Z" };
function pr(r) {
  const e = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  e.setAttribute("viewBox", "0 0 24 24"), e.setAttribute("fill", "none"), e.setAttribute("stroke", "currentColor"), e.setAttribute("stroke-width", "1.5"), e.setAttribute("stroke-linecap", "round"), e.setAttribute("stroke-linejoin", "round"), e.setAttribute("aria-hidden", "true");
  const t = document.createElementNS(e.namespaceURI, "path");
  return t.setAttribute("d", Kc[r] || Kc.book), e.append(t), e;
}
function O(r, e, t) {
  const n = document.createElement(r);
  return n.className = e, t && (n.textContent = t), n;
}
function dt(r, e, t) {
  const n = O("button", r, e);
  return n.type = "button", n.onclick = t, n;
}
function Jm() {
  const r = O("style", "");
  r.dataset.atharVariant = "2", r.textContent = Lm, document.head.append(r);
  const e = O("section", "athar-v2-audience");
  e.id = "athar-v2-audience", e.dir = "rtl", e.setAttribute("aria-label", "اختر مسارك في الحديث");
  const t = O("section", "athar-v2-cards");
  t.id = "athar-v2-cards", t.dir = "rtl", t.setAttribute("aria-label", "حالات تطبيقية");
  const n = O("p", "athar-v2-status");
  n.setAttribute("role", "status");
  const a = O("section", "bayan-context");
  a.dir = "rtl", a.setAttribute("aria-label", "مسار المحادثة");
  const i = O("div", "bayan-followups");
  i.dir = "rtl", i.setAttribute("aria-label", "توسّع في هذه الحالة");
  const o = O("dialog", "bayan-demo");
  o.dir = "rtl", o.setAttribute("aria-labelledby", "bayan-demo-title"), o.addEventListener("click", (_) => {
    _.target === o && o.close();
  });
  const s = O("aside", "athar-v2-auth-intro");
  s.id = "athar-v2-auth-intro", s.dir = "rtl", s.append(O("span", "athar-v2-eyebrow", Ya.subtitle), O("h1", "", Ya.name), O("p", "", "من الحديث إلى فهمٍ واضح، ومصدرٍ تستطيع الرجوع إليه. ثلاث تجارب عملية تساعدك على عرض المعرفة والتوسّع في دليلها."));
  const l = O("div", "athar-v2-auth-features");
  for (const [_, C] of [["book", "تعلّم وعرّف"], ["branch", "توسّع وتحقّق"]]) {
    const q = O("span", "");
    q.append(pr(_), document.createTextNode(C)), l.append(q);
  }
  s.append(l);
  const c = O("div", "bayan-auth-cases");
  for (const _ of Po) {
    const C = dt("", "", () => xi(_));
    C.append(pr(_.icon), document.createTextNode(_.title), pr("arrow")), c.append(C);
  }
  s.append(c, O("small", "", "مشروع بيان السنة"));
  const d = dt("bayan-auth-topic", "رحلة التعريف بالإسلام · استكشف الموضوعات", () => ee(!0));
  s.insertBefore(d, c);
  const u = /* @__PURE__ */ new Map();
  let p = [];
  function h() {
    for (const { node: _, prose: C } of u.values())
      _.remove(), C && delete C.dataset.bayanProseHidden;
    u.clear(), p = [], document.querySelectorAll(".bayan-card-dialog").forEach((_) => _.remove());
  }
  function b() {
    const _ = new Set(p.map((C) => C.message_id));
    for (const [C, q] of u)
      (!_.has(C) || !q.node.isConnected) && (q.node.remove(), q.prose && delete q.prose.dataset.bayanProseHidden, u.delete(C));
    for (const C of p) {
      const q = document.getElementById(`message-${C.message_id}`);
      if (!q) continue;
      const B = JSON.stringify(C), N = u.get(C.message_id);
      if ((N == null ? void 0 : N.signature) === B) continue;
      N && (N.node.remove(), N.prose && delete N.prose.dataset.bayanProseHidden);
      const P = q.querySelector("#response-content-container"), F = Jp(C, () => ee(!0), P ? () => {
        P.dataset.bayanProseHidden = P.dataset.bayanProseHidden === "true" ? "false" : "true";
      } : void 0);
      P ? (P.dataset.bayanProseHidden = "true", P.before(F)) : q.append(F), u.set(C.message_id, { node: F, signature: B, prose: P });
    }
  }
  let f = !1, m = "topics";
  const v = /* @__PURE__ */ new Set();
  let k, x = "all_paths", A, y, w = null, M = null, T = null, E = 0, j;
  const K = /* @__PURE__ */ new Map();
  function X() {
    for (const [_, C] of K)
      _.style.opacity = C.opacity, _.style.filter = C.filter;
    K.clear(), document.querySelectorAll("#chat-pane svg[data-selected-path]").forEach((_) => _.removeAttribute("data-selected-path"));
  }
  let Y = Ua(new URLSearchParams(location.search).get("case")), ie = !!Y, me = location.pathname, ue = "", fe = "";
  const Te = _e();
  Y || (Y = Ua(Te[location.pathname]));
  function _e() {
    try {
      const _ = JSON.parse(sessionStorage.getItem("bayan-case-map") || "{}");
      return _ && typeof _ == "object" && !Array.isArray(_) ? _ : {};
    } catch {
      return {};
    }
  }
  function it(_, C) {
    _ && (_.dataset.atharV2Slot !== C && (_.dataset.atharV2Slot = C), v.add(_));
  }
  function Sr() {
    for (const _ of v) delete _.dataset.atharV2Slot;
    v.clear();
  }
  function dr() {
    return [...document.querySelectorAll('#chat-pane [id^="message-"]')].some((_) => /^message-[a-f\d]{8}-/i.test(_.id));
  }
  function Wn(_, C, q, B = {}) {
    ht($p(location.origin, _.id, C, q, { mode: "unified", ...B }));
  }
  function ht(_) {
    var q;
    if (location.pathname.startsWith("/auth") && (_ = "/auth?" + new URLSearchParams({ redirect: new URL(_).pathname + new URL(_).search, athar: "chat" })), !!((q = document.getElementById("chat-input")) != null && q.innerText.trim()) || dr()) {
      const B = window.open("about:blank", "_blank");
      if (!B) {
        const N = o.querySelector(".bayan-demo-note");
        N && (N.textContent = "اسمح بفتح تبويب جديد للحفاظ على محادثتك ومسودتك الحالية.");
        return;
      }
      B.opener = null, B.location.href = _, o.close();
    } else location.assign(_);
  }
  function zr(_) {
    const C = Ql[_.id] || [], q = O("details", "bayan-evidence");
    q.append(O("summary", "", `راجع الشواهد ومصادرها · ${C.length}`)), q.append(O("p", "bayan-evidence-state", "النصوص مطابقة للفهرس المحلي. اختيارها التعليمي وشرحها يحتاجان إلى مراجعة علمية."));
    const B = { bukhari: "صحيح البخاري", muslim: "صحيح مسلم", tirmidhi: "جامع الترمذي", abudawud: "سنن أبي داود", nasai: "سنن النسائي", ibnmajah: "سنن ابن ماجه" }, N = O("div", "bayan-evidence-coverage");
    for (const [P, F] of Object.entries(B)) {
      const U = C.filter((G) => G.collection === P).length, H = O("span", "", `${F} · ${U ? U + " في هذه الحزمة" : "غير ممثّل في الحزمة"}`);
      H.dataset.present = String(U > 0), N.append(H);
    }
    q.append(N);
    for (const P of C) {
      const F = O("details", "bayan-evidence-record");
      F.append(O("summary", "", `${B[P.collection]} · ${P.chapter} · الموضع المحلي ${P.position}`)), F.append(O("p", "bayan-source-text", P.text), O("code", "bayan-source-id", P.id));
      const U = O("div", "bayan-source-actions"), H = O("a", "", "افتح ملف المصدر");
      H.href = P.url, H.target = "_blank", H.rel = "noopener noreferrer";
      const G = dt("", "انسخ النص ومصدره", async () => {
        try {
          await navigator.clipboard.writeText(`${P.text}

${B[P.collection]} — ${P.chapter}
الموضع المحلي: ${P.position}
${P.id}
${P.url}
مطابق للفهرس المحلي؛ يحتاج اختيار الشاهد وشرحه إلى مراجعة علمية.`), G.textContent = "نُسخ النص مع مصدره";
        } catch {
          G.textContent = "تعذر النسخ؛ حدّد النص لنسخه";
        }
      });
      U.append(H, G, dt("", "حضّر فتح السجل بالأداة", () => ht(Qm(location.origin, P.id, { mode: "unified" })))), F.append(U), q.append(F);
    }
    return q;
  }
  function vi(_) {
    var Z;
    if (!_ || typeof _ != "object") return null;
    const C = _.data || _, q = C.occurrence_id || _.occurrence_id, B = _.message_id || _.id || C.message_id, N = C.graph_id || _.graph_id, P = C.paths || _.paths || [], F = C.nodes || _.nodes || ((Z = C.graph) == null ? void 0 : Z.nodes) || [], U = /* @__PURE__ */ new Map(), H = /* @__PURE__ */ new Map(), G = /* @__PURE__ */ new Map();
    if (Array.isArray(F))
      for (const D of F) {
        const be = (D.raw_text || D.name || D.canonical_name || D.id || "").trim(), Ve = {
          raw_text: D.raw_text || D.name || be,
          occurrence_id: q || D.occurrence_id,
          mention_id: D.mention_id,
          source_span: D.source_span,
          source_span_text: D.source_span_text || (Array.isArray(D.source_span) && typeof C.isnad_text == "string" ? C.isnad_text.slice(D.source_span[0], D.source_span[1]) : void 0),
          canonical_name: D.canonical_name,
          identity_status: D.identity_status || D.status,
          candidates: D.candidates,
          grade_text: D.identity_status === "resolved" ? D.grade || D.grade_ar : void 0,
          grade_source: D.grade_source,
          ibn_hajar: D.ibn_hajar,
          dhahabi: D.dhahabi,
          anchor_name: D.anchor_name,
          identity_evidence: D.evidence_source,
          resolution_rule: D.resolution_rule
        };
        be && U.set(be, Ve), D.id && H.set(String(D.id).toLowerCase(), Ve), D.mention_id && G.set(String(D.mention_id), Ve);
      }
    return { occurrence_id: q, message_id: B, graph_id: N, paths: P, nodes: U, nodeIdMap: H, mentionIdMap: G };
  }
  function es() {
    if (M) return M;
    if (typeof window < "u" && window.__BAYAN_GRAPH__)
      return vi(window.__BAYAN_GRAPH__);
    const _ = document.getElementById("chat-pane");
    if (!_) return null;
    const C = _.querySelectorAll("pre, code, details, [data-tool-output], .message-content");
    for (const q of Array.from(C).reverse()) {
      const B = q.textContent || "";
      if (B.includes('"paths"') || B.includes('"paths_count"') || B.includes('"occurrence_id"') && B.includes('"nodes"'))
        try {
          const N = B.indexOf("{"), P = B.lastIndexOf("}");
          if (N !== -1 && P > N) {
            const F = JSON.parse(B.slice(N, P + 1)), U = vi(F);
            if (U && U.paths.length > 0) return U;
          }
        } catch {
        }
    }
    return null;
  }
  async function yn() {
    const _ = location.pathname.match(/^\/c\/([a-f\d-]{36})$/i);
    if (!f || document.hidden || !_ || T || Date.now() - E < 2500) return;
    const C = location.pathname, q = new AbortController();
    T = q, E = Date.now();
    try {
      const B = await fetch(`/api/v1/chats/${_[1]}`, {
        credentials: "same-origin",
        signal: q.signal,
        cache: "no-store"
      });
      if (!B.ok) return;
      const N = await B.json();
      if (!f || location.pathname !== C || q.signal.aborted) return;
      const P = [...document.querySelectorAll('#chat-pane [id^="message-"]')].filter((U) => /^message-[a-f\d-]{36}$/i.test(U.id)).map((U) => U.id.replace(/^message-/, ""));
      p = jm(N, P), b(), p.length && p[0].message_id === P.at(-1) && (Y == null ? void 0 : Y.id) !== p[0].topic_id && (Y = Ua(p[0].topic_id), fe = "");
      const F = Wm(N, P);
      M = F ? vi(F) : null, Yr();
    } catch {
    } finally {
      T === q && (T = null);
    }
  }
  function ts(_) {
    o.isConnected || document.body.append(o), o.replaceChildren();
    const C = Zm(_), q = dt("bayan-close", "", () => o.close());
    q.setAttribute("aria-label", "أغلق درج الدليل"), q.append(pr("close"));
    const B = O("div", "bayan-demo-content");
    B.append(q, O("span", "bayan-kicker", "درج دليل الراوي والتحقيق"));
    const N = O("h2", "", C.raw_text);
    B.append(N);
    const P = O("div", "bayan-narrator-card");
    P.append(O("p", "bayan-detail-row", "اللفظ التراثي في الإسناد: " + C.raw_text)), P.append(O("p", "bayan-detail-row", "معرف السجل (occurrence_id): " + C.occurrence_id)), P.append(O("p", "bayan-detail-row", "معرف الورود (mention_id): " + C.mention_id)), P.append(O("p", "bayan-detail-row", "النطاق النصي (source_span): " + C.source_span_display)), P.append(O("p", "bayan-detail-row", (_.identity_status === "resolved" ? "التعيين المدعوم بالدليل: " : "التعيين المقترح غير المحسوم: ") + C.canonical_name)), _.resolution_rule && P.append(O("p", "bayan-detail-row", "قاعدة التعيين: " + _.resolution_rule)), _.identity_evidence && P.append(O("p", "bayan-detail-row", "مصدر دليل الهوية: " + _.identity_evidence)), _.anchor_name && P.append(O("p", "bayan-detail-row", "صاحب الضمير والسياق: " + _.anchor_name));
    const F = O("div", "bayan-badge-group"), U = _.identity_status === "resolved" ? "bayan-badge-resolved" : _.identity_status === "ambiguous" ? "bayan-badge-ambiguous" : "bayan-badge-unresolved";
    if (F.append(O("span", U, C.identity_status), O("span", "bayan-badge-review", "تحليل جزئي يحتاج مراجعة علمية (needs_review)")), P.append(F), _.candidates && _.candidates.length > 0) {
      const G = O("div", "bayan-candidates-section");
      G.append(O("strong", "", "المرشحون المحتملون:"));
      const Z = O("ul", "bayan-candidates-list");
      for (const D of _.candidates) {
        const be = O("li", "", `${D.name} — ${D.grade || "غير محدد"}`);
        Z.append(be);
      }
      G.append(Z), P.append(G);
    }
    const H = O("div", "bayan-grades-section");
    H.append(O("strong", "", "أقوال النقاد ومصادر الرتبة:")), H.append(
      O("p", "bayan-grade-item", "قول الحافظ ابن حجر (تقريب التهذيب): " + C.ibn_hajar),
      O("p", "bayan-grade-item", "قول الإمام الذهبي (الكاشف): " + C.dhahabi),
      O("p", "bayan-grade-item", "الرتبة الحديثية الموثقة: " + C.general_grade),
      O("p", "bayan-grade-item", "مصدر الرتبة: " + C.grade_source)
    ), C.missing_evidence_note && H.append(O("p", "bayan-missing-evidence-note", C.missing_evidence_note)), P.append(H), B.append(P), o.append(B), o.open || o.showModal(), q.focus();
  }
  function rs(_, C) {
    var P, F, U, H, G, Z, D;
    const q = C.getAttribute("data-mention-id") || ((P = C.dataset) == null ? void 0 : P.mentionId);
    if (q && ((F = w == null ? void 0 : w.mentionIdMap) != null && F.has(q)))
      return w.mentionIdMap.get(q);
    const B = C.getAttribute("data-node-id") || ((U = C.dataset) == null ? void 0 : U.nodeId) || C.getAttribute("data-narrator-id") || ((H = C.dataset) == null ? void 0 : H.narratorId);
    if (B && ((G = w == null ? void 0 : w.nodeIdMap) != null && G.has(B.toLowerCase())))
      return w.nodeIdMap.get(B.toLowerCase());
    if (C.id && (w != null && w.nodeIdMap)) {
      const be = (Z = Hc(C.id)) == null ? void 0 : Z.toLowerCase();
      if (be && w.nodeIdMap.has(be))
        return w.nodeIdMap.get(be);
    }
    const N = C.dataset;
    return N && (N.mentionId || N.canonicalName || N.narratorId) ? {
      raw_text: N.rawText || _,
      occurrence_id: N.occurrenceId || (w == null ? void 0 : w.occurrence_id),
      mention_id: N.mentionId,
      canonical_name: N.canonicalName,
      identity_status: N.identityStatus || "unresolved",
      grade_text: N.grade,
      ibn_hajar: N.ibnHajar,
      dhahabi: N.dhahabi
    } : (D = w == null ? void 0 : w.nodes) != null && D.has(_) ? w.nodes.get(_) : {
      raw_text: _,
      occurrence_id: w == null ? void 0 : w.occurrence_id,
      identity_status: "unresolved"
    };
  }
  document.addEventListener("click", (_) => {
    var B, N, P;
    if (!f || !document.documentElement.hasAttribute("data-athar-chat-v2") || !document.getElementById("chat-pane")) return;
    const q = (B = _.target) == null ? void 0 : B.closest('#chat-pane .node, #chat-pane g.node, #chat-pane [data-narrator-id], #chat-pane .bayan-narrator-node, #chat-pane g[id^="flowchart-"]');
    if (q && !o.open) {
      if (w != null && w.message_id && ((N = q.closest('[id^="message-"]')) == null ? void 0 : N.id) !== `message-${w.message_id}`) return;
      const F = ((P = q.textContent) == null ? void 0 : P.trim().replace(/\s+/g, " ")) || "";
      if (F) {
        const U = rs(F, q);
        A = U.mention_id, y = U.anchor_name || U.canonical_name, ts(U);
      }
    }
  });
  function xi(_) {
    o.isConnected || document.body.append(o), o.replaceChildren();
    const C = dt("bayan-close", "", () => o.close());
    C.setAttribute("aria-label", "أغلق عرض الحالة"), C.append(pr("close"));
    const q = O("div", "bayan-demo-content");
    q.append(C, O("span", "bayan-kicker", "حالة تطبيقية · " + _.category));
    const B = O("h2", "", _.title);
    B.id = "bayan-demo-title", q.append(B, O("p", "bayan-demo-intro", _[m === "research" ? "research" : "learn"]));
    let N = "newcomer", P = "card", F = "", U = _.topic ? Xi(_, N, P) : _.question;
    const H = O("blockquote", "bayan-question", U);
    if (_.topic) {
      let gt = function() {
        var jr;
        const ot = (jr = _.topic) == null ? void 0 : jr.subtopics.find((Er) => Er.id === F);
        kn.textContent = ot ? "هدف المحور: " + ot.objective : "اختر محورًا أدق، أو ابدأ بجولة تضم الشواهد المنتقاة للموضوع.", An.textContent = ot ? ot.cardAvailable ? ot.scopeNote : "هذا المحور موجود في التصنيف؛ لم تُجهز شواهده بعد. اختر محورًا آخر أو الجولة العامة." : "٦ موضوعات مبنية على تحليل المحتوى؛ جميع المواد التعليمية تحتاج مراجعة علمية.";
        const rn = !ot || ot.cardAvailable;
        q.querySelectorAll(".bayan-demo-actions button").forEach((Er) => Er.disabled = !rn);
      };
      const Ct = O("div", "bayan-topic-options");
      for (const [ot, rn, jr] of [["لمن تُعدّ المادة؟", [["مهتم يتعرف على الإسلام", "newcomer"], ["حديث العهد بالإسلام", "new_muslim"], ["معرّف بالإسلام", "educator"]], "reader"], ["كيف تريد تقديمها؟", [["بطاقة تعريفية قصيرة", "card"], ["حوار سؤال وجواب", "qa"], ["كلمة تعريفية من دقيقتين", "two_minute"]], "format"]]) {
        const Er = O("label", "", ot), nn = O("select", "");
        for (const [yi, Ia] of rn) {
          const Sn = O("option", "", yi);
          Sn.value = Ia, nn.append(Sn);
        }
        nn.onchange = () => {
          jr === "reader" ? N = nn.value : P = nn.value, P !== "card" && (F = "", tt.value = ""), U = Xi(_, N, P, F), H.textContent = U, gt();
        }, Er.append(nn), Ct.append(Er);
      }
      const Ot = O("label", "", "اختر محورًا من تحليل المحتوى"), tt = O("select", "");
      tt.setAttribute("aria-label", "المحور الفرعي"), tt.append(new Option("جولة عامة في الموضوع", ""));
      for (const ot of _.topic.subtopics) {
        const rn = new Option(ot.title + (ot.cardAvailable ? "" : " · مادته قيد الإعداد"), ot.id);
        tt.append(rn);
      }
      const kn = O("p", "bayan-learning-objective");
      kn.setAttribute("aria-live", "polite");
      const An = O("p", "bayan-subtopic-readiness");
      An.setAttribute("role", "status"), tt.onchange = () => {
        F = tt.value, F && (P = "card", Ct.querySelectorAll("select")[1].value = "card"), U = Xi(_, N, P, F), H.textContent = U, gt();
      }, Ot.append(tt), Ct.append(Ot), q.append(Ct, kn, An), gt(), q.append(zr(_));
    }
    const G = "بيان السُّنَّة — المساعد الموحد · " + (_.topic ? "مهارة التعريف بالإسلام" : _.id === "abu-hurairah" ? "مهارة الرجال" : _.id === "hajj-arafah" ? "مهارة الأسانيد" : "مهارة البحث والتخريج");
    if (q.append(O("p", "bayan-agent", "ينفّذها: " + G)), _.topic) {
      const gt = O("details", "bayan-request");
      gt.append(O("summary", "", "راجع السؤال الذي سيُرسل"), H), q.append(gt);
    } else q.append(O("span", "bayan-question-label", "السؤال الذي تبدأ به"), H);
    q.append(O("h3", "", "ما الذي ستستكشفه؟"));
    const Z = O("div", "bayan-demo-steps");
    Z.setAttribute("role", "group"), Z.setAttribute("aria-label", "مراحل الحالة");
    const D = O("p", "bayan-step-detail", _.outputs[0].description);
    D.id = "bayan-step-detail", D.setAttribute("aria-live", "polite"), _.outputs.forEach((gt, Ct) => {
      const Ot = dt("", "", () => {
        D.textContent = gt.description;
        for (const tt of Z.querySelectorAll("button")) tt.setAttribute("aria-pressed", String(tt === Ot));
      });
      Ot.setAttribute("aria-pressed", String(Ct === 0)), Ot.setAttribute("aria-controls", D.id), Ot.append(O("span", "", String(Ct + 1).padStart(2, "0")), document.createTextNode(gt.title)), Z.append(Ot);
    }), q.append(Z, D, O("p", "bayan-demo-note", "تُنفّذ الحالة مباشرة بالأدوات المتاحة. افحص المصادر في الإجابة، وقد تختلف النتائج عند إعادة التجربة."));
    const be = O("div", "bayan-demo-actions"), Ve = dt("bayan-primary", _.topic ? "ابدأ رحلة الموضوع" : "ابدأ العرض المباشر", () => Wn(_, !0, U, { audience: N, format: P, subtopicId: F }));
    Ve.append(pr("play")), be.append(Ve, dt("bayan-secondary", "عدّل السؤال أولًا", () => Wn(_, !1, U, { audience: N, format: P, subtopicId: F }))), q.append(be), o.append(q), o.open || o.showModal(), C.focus();
  }
  function ee(_ = !1) {
    o.isConnected || document.body.append(o), o.replaceChildren();
    const C = O("div", "bayan-demo-content"), q = dt("bayan-close", "", () => o.close());
    q.setAttribute("aria-label", "أغلق عرض الحالات"), q.append(pr("close"));
    const B = O("h2", "", "اختر تجربة جديدة");
    B.id = "bayan-demo-title", C.append(q, O("span", "bayan-kicker", Ya.name), B), C.append(dt("bayan-gallery-switch", _ ? "انتقل إلى الحالات البحثية" : "انتقل إلى موضوعات التعريف بالإسلام", () => ee(!_)));
    const N = O("div", "bayan-gallery");
    for (const P of _ ? ml : Po) {
      const F = dt("", "", () => xi(P));
      F.append(pr(P.icon), O("strong", "", P.title), O("span", "", P.category), pr("arrow")), N.append(F);
    }
    C.append(N, O("p", "bayan-demo-note", "إذا كانت لديك محادثة أو مسودة، تُفتح الحالة الجديدة في تبويب مستقل.")), o.append(C), o.open || o.showModal(), q.focus();
  }
  function de() {
    e.replaceChildren(), t.replaceChildren();
    const _ = O("div", "athar-v2-intro");
    _.append(O("h1", "bayan-wordmark", Ya.name), O("p", "bayan-subtitle", Ya.subtitle)), e.append(_);
    const C = O("div", "athar-v2-toggles");
    C.setAttribute("role", "group"), C.setAttribute("aria-label", "نوع المستخدم");
    for (const [P, F, U, H] of [["topics", "أُعرّف بالإسلام", "من الموضوع إلى مادة بمصادرها", "book"], ["learn", "أستكشف حديثًا", "حالات واضحة لفهم الحديث", "layers"], ["research", "أتوسّع وأبحث", "للروايات والأسانيد والرجال", "branch"]]) {
      const G = dt("athar-v2-persona", "", () => {
        var D;
        m = P, de(), (D = e.querySelector(`[data-audience="${P}"]`)) == null || D.focus();
      });
      G.setAttribute("aria-pressed", String(m === P)), G.dataset.audience = P;
      const Z = O("span", "athar-v2-persona-copy");
      Z.append(O("strong", "", F), O("small", "", U)), G.append(pr(H), Z, O("span", "athar-v2-radio")), C.append(G);
    }
    e.append(C);
    const q = m === "topics";
    t.dataset.track = q ? "topics" : "cases";
    const B = O("div", "athar-v2-cards-heading");
    B.append(O("span", "", q ? "أيّ باب تفتح للتعريف بالإسلام؟" : "جرّب قدرات بيان السُّنّة"), O("span", "bayan-count", q ? "موضوع ← دليل ← معنى" : "٣ حالات تطبيقية")), t.append(B);
    const N = O("div", "athar-v2-grid");
    for (const P of q ? ml : Po) {
      const F = dt("athar-v2-card", "", () => xi(P));
      F.dataset.case = P.id, F.setAttribute("aria-label", "استعرض حالة " + P.title), F.setAttribute("aria-haspopup", "dialog");
      const U = O("span", "athar-v2-card-top");
      U.append(pr(P.icon), O("small", "", P.category)), F.append(U, O("strong", "", P.title), O("span", "athar-v2-card-description", P[m === "research" ? "research" : "learn"]));
      const H = O("span", "bayan-card-action", q ? "صمّم رحلتك" : "استعرض التجربة");
      H.append(pr("arrow")), F.append(H), N.append(F);
    }
    t.append(N, n), n.textContent = q ? "٦ موضوعات · ١٣ شاهدًا مطابقًا للفهرس المحلي · المادة التعليمية قيد المراجعة." : "اختر حالة لتشاهد السؤال وخطوات التجربة، أو اكتب سؤالك مباشرة.";
  }
  function Me(_) {
    for (const C of _.querySelectorAll(".bayan-route-btn")) {
      const q = C.dataset.route;
      C.setAttribute("aria-pressed", String(q === "all_paths" ? !k : k === q));
    }
  }
  function et(_) {
    var U, H;
    k = _ === "all" ? void 0 : _, x = _ === "all" ? "all_paths" : "specific_path";
    const C = i.querySelector(".bayan-route-selector");
    C && Me(C);
    const B = ((U = (w != null && w.message_id ? document.getElementById(`message-${w.message_id}`) : null) || document.getElementById("chat-pane")) == null ? void 0 : U.querySelectorAll("svg:has(.node)")) || [], N = k ? (H = w == null ? void 0 : w.paths) == null ? void 0 : H.find((G) => G.path_id === k) : null, P = /* @__PURE__ */ new Set(), F = /* @__PURE__ */ new Set();
    if (N && Array.isArray(N.nodes))
      for (const G of N.nodes) {
        G.id && P.add(String(G.id).toLowerCase());
        const Z = (G.name || G.raw_text || G.canonical_name || "").trim();
        Z && F.add(Z);
      }
    if (B.forEach((G) => {
      k ? (G.setAttribute("data-selected-path", k), G.querySelectorAll('.node, g.node, g[id^="flowchart-"]').forEach((Z) => {
        var Ct;
        K.has(Z) || K.set(Z, { opacity: Z.style.opacity, filter: Z.style.filter });
        let D = !1;
        const be = ((Ct = Hc(Z.id)) == null ? void 0 : Ct.toLowerCase()) || "", Ve = (Z.getAttribute("data-node-id") || Z.getAttribute("data-path-id") || "").toLowerCase(), gt = (Z.textContent || "").trim();
        if (be && P.has(be)) D = !0;
        else if (Ve && (P.has(Ve) || Ve === (k == null ? void 0 : k.toLowerCase()) || Ve === "shared")) D = !0;
        else if (F.size > 0) {
          for (const Ot of F)
            if (gt.includes(Ot)) {
              D = !0;
              break;
            }
        }
        D ? (Z.style.opacity = "1", Z.style.filter = "") : (Z.style.opacity = "0.22", Z.style.filter = "grayscale(60%)");
      })) : (G.removeAttribute("data-selected-path"), X());
    }), window.dispatchEvent(new CustomEvent("bayan:path-selected", {
      detail: { selectedPathId: k, routeKind: x, occurrence_id: w == null ? void 0 : w.occurrence_id }
    })), Y) {
      const G = w != null && w.occurrence_id ? [w.occurrence_id] : [], Z = i.querySelectorAll("button:not(.bayan-route-btn)"), D = Y.track === "islam" ? Y.followups.filter((be) => be.task !== "isnad_graph") : Y.followups;
      Z.forEach((be, Ve) => {
        D[Ve] && (be.onclick = () => ht(Gc(location.origin, Y.id, Ve, {
          mode: "unified",
          routeKind: x,
          selectedPathId: k,
          occurrenceIds: G,
          mentionId: A,
          anchorName: y
        })));
      });
    }
    i.dataset.notice = k ? `اختير الطريق: ${k}. العقد الأخرى مخففة في الرسم.` : "تم عرض جميع الطرق.";
  }
  function wn(_) {
    if (!_) return "none";
    const C = _.occurrence_id || "no-occ", q = _.paths.map((B) => `${B.path_id}:${B.teacher_name || ""}`).join("|");
    return `${_.message_id || ""}:${C}:${_.paths.length}:${q}:${_.nodes.size}`;
  }
  function Jn() {
    const _ = (Y == null ? void 0 : Y.id) || "none", C = es(), q = wn(C), B = `${_}::${q}`;
    if (fe === B) return;
    const N = w == null ? void 0 : w.occurrence_id, P = C == null ? void 0 : C.occurrence_id;
    if ((_ !== ue || N !== P) && (k = void 0, x = "all_paths", A = void 0, y = void 0), ue = _, fe = B, w = C, a.replaceChildren(), i.replaceChildren(), delete i.dataset.notice, a.append(O("span", "bayan-context-brand", Ya.name)), Y && a.append(O("span", "bayan-context-case", Y.title)), a.append(dt("", (Y == null ? void 0 : Y.track) === "islam" ? "موضوعات التعريف بالإسلام" : "الحالات التطبيقية", () => ee((Y == null ? void 0 : Y.track) === "islam"))), Y || w) {
      const F = (w == null ? void 0 : w.paths) || [], U = Km(F);
      if (U) {
        const H = O("div", "bayan-route-selector");
        H.setAttribute("role", "group"), H.setAttribute("aria-label", "اختيار مسار الإسناد"), U.forEach((G) => {
          const Z = dt("bayan-route-btn", G.label, () => et(G.id));
          Z.dataset.route = G.route, Z.setAttribute("aria-pressed", String(G.id === "all" ? !k : k === G.id)), H.append(Z);
        }), i.append(H);
      }
    }
    if (Y) {
      i.append(O("span", "", "افتح مسودة متخصصة لهذه الحالة"));
      const F = w != null && w.occurrence_id ? [w.occurrence_id] : [];
      (Y.track === "islam" ? Y.followups.filter((H) => H.task !== "isnad_graph") : Y.followups).forEach((H, G) => {
        const Z = dt("", H.label, () => {
          var D, be, Ve;
          return ht(Gc(location.origin, Y.id, G, {
            mode: "unified",
            audience: (D = p[0]) == null ? void 0 : D.audience,
            format: (be = p[0]) == null ? void 0 : be.format,
            subtopicId: (Ve = p[0]) == null ? void 0 : Ve.subtopic_id,
            routeKind: x,
            selectedPathId: k,
            occurrenceIds: F,
            mentionId: A,
            anchorName: y
          }));
        });
        Z.title = "تُفتح مسودة بالنموذج المناسب مع تثبيت السجل ومسار العرض المختار", i.append(Z);
      });
    }
  }
  function _a() {
    if (location.pathname !== me) {
      if (ie && /^\/c\//.test(location.pathname) && Y) {
        Te[location.pathname] = Y.id;
        try {
          sessionStorage.setItem("bayan-case-map", JSON.stringify(Te));
        } catch {
        }
        ie = !1;
      } else
        Y = Ua(Te[location.pathname]), ie = !1;
      me = location.pathname, ue = "", fe = "", h(), X(), T == null || T.abort(), T = null, E = 0, M = null, w = null, k = void 0, x = "all_paths", A = void 0, y = void 0;
    }
  }
  function Yr() {
    var U;
    _a(), Xc();
    const _ = location.pathname === "/" || /^\/c\//.test(location.pathname), C = location.pathname.startsWith("/auth");
    if (document.documentElement.toggleAttribute("data-athar-chat-v2", f && _), document.documentElement.toggleAttribute("data-athar-auth-v2", f && C), !f || !_ && !C) {
      e.remove(), t.remove(), s.remove(), a.remove(), i.remove(), o.open && o.close(), Sr();
      return;
    }
    if (C) {
      e.remove(), t.remove(), a.remove(), i.remove(), s.isConnected || document.body.append(s);
      return;
    }
    s.remove();
    const q = document.querySelector("#message-input-container"), B = q == null ? void 0 : q.closest("form");
    if (dr()) {
      e.remove(), t.remove(), Sr(), Jn();
      const H = document.getElementById("chat-pane");
      H && a.parentElement !== H && H.prepend(a), B && (Y || w) && i.nextElementSibling !== B ? B.before(i) : !Y && !w && i.remove(), yn();
      return;
    }
    if (a.remove(), i.remove(), !q || !B) {
      e.remove(), t.remove();
      return;
    }
    let N = B.parentElement;
    for (; N && N.id !== "chat-pane" && !(N.classList.contains("text-base") && N.classList.contains("py-3")); ) N = N.parentElement;
    if ((!N || N.id === "chat-pane") && (N = B.parentElement), N && N.parentElement) {
      it(N, "composer-slot"), it(N.closest(".py-24"), "welcome");
      const H = [...N.parentElement.children].find((G) => G !== N && G !== e && G.classList.contains("flex-row"));
      it(H, "model-intro"), e.nextElementSibling !== N && N.before(e);
    }
    const P = document.querySelector('#chat-pane [role="list"]:has(button.waterfall[role="listitem"])'), F = (U = P == null ? void 0 : P.parentElement) == null ? void 0 : U.parentElement;
    F ? (it(F, "suggestions"), it(F.parentElement, "suggestions-width"), t.previousElementSibling !== F && F.after(t)) : !t.isConnected && N && N.after(t);
  }
  return de(), Xc(), { setEnabled(_) {
    f = _, j && clearInterval(j), j = void 0, _ ? j = setInterval(() => void yn(), 3e3) : (h(), X(), T == null || T.abort(), T = null, M = null, w = null, fe = ""), Yr();
  }, refresh: Yr };
}
const ia = document.documentElement.dataset.hadithPreview === "true", Zc = "hadith-theme-poc-host", $m = "http://127.0.0.1:8770/api";
if (!document.getElementById(Zc)) {
  let r = function() {
    c.open && (c.close(), document.documentElement.style.overflow = h, u == null || u.focus());
  }, e = function(E) {
    c.open || (u = document.activeElement, h = document.documentElement.style.overflow, p(E), c.showModal(), c.focus(), document.documentElement.style.overflow = "hidden");
  }, t = function() {
    x.textContent = `الواجهات · ${w[f]} ▾`;
    for (const E of A.querySelectorAll("button")) E.setAttribute("aria-pressed", String(E.dataset.variant === f));
  }, n = function(E) {
    r(), f = E, b.setEnabled(E === "chat");
    try {
      sessionStorage.setItem("hadith-view", E), localStorage.setItem("hadith-view", E);
    } catch {
    }
    A.hidden = !0, x.setAttribute("aria-expanded", "false"), t(), E === "journey" && e(location.pathname.startsWith("/auth") || ia ? "landing" : "workspace");
  };
  const a = document.createElement("div");
  a.id = Zc;
  const i = a.attachShadow({ mode: "open" }), o = document.createElement("style");
  o.textContent = `@font-face{font-family:Readex;src:url('${Nm}') format('woff2');font-weight:400;unicode-range:U+0600-06FF,U+0750-077F,U+08A0-08FF,U+FB50-FDFF,U+FE70-FEFF;font-display:swap}@font-face{font-family:Readex;src:url('${Rm}') format('woff2');font-weight:400;font-display:swap}@font-face{font-family:Amiri;src:url('${Vm}') format('woff2');font-weight:400;font-display:swap}` + qm;
  const s = document.createElement("style");
  s.dataset.hadithFonts = "true";
  const l = o.textContent.indexOf(":host");
  s.textContent = o.textContent.slice(0, l).replaceAll("Readex", "AtharReadex").replaceAll("Amiri", "AtharAmiri"), o.textContent = o.textContent.slice(l).replaceAll("Readex", "AtharReadex").replaceAll("Amiri", "AtharAmiri"), document.head.appendChild(s), i.appendChild(o);
  const c = document.createElement("dialog");
  c.className = "athar-dialog", c.tabIndex = -1, c.setAttribute("aria-label", "بيان السنة — واجهة الحديث");
  const d = document.createElement("div");
  c.appendChild(d), i.appendChild(c), document.body.appendChild(a);
  let u = null, p = () => {
  }, h = "";
  const b = Jm();
  let f = "original";
  const m = document.createElement("div");
  m.id = "athar-view-switch";
  const v = m.attachShadow({ mode: "open" }), k = document.createElement("style");
  k.textContent = ":host{font-family:AtharReadex,system-ui,sans-serif;direction:rtl}button{font:inherit;cursor:pointer}.trigger{display:flex;align-items:center;gap:10px;border:1px solid #6150ea55;background:#292151;color:#f1edfc;font-size:11px;border-radius:99px;padding:10px 15px;white-space:nowrap;box-shadow:0 3px 14px #1a164815}.menu{position:absolute;left:50%;transform:translateX(-50%);top:calc(100% + 9px);background:#fff;border:1px solid #e3ddef;border-radius:13px;width:245px;padding:7px;box-shadow:0 16px 44px #24203b22;direction:rtl}.menu[hidden]{display:none}.menu button{display:block;width:100%;background:transparent;text-align:right;padding:12px 13px;border:0;border-radius:8px;color:#716180;font-size:12px}.menu button small{display:block;font-size:10px;margin-top:5px;color:#a599b4}.menu button[aria-pressed=true]{background:#f1edf8;color:#574278}.menu button:hover{background:#f6f3fb}button:focus-visible{outline:2px solid #a396cd;outline-offset:3px}", v.append(k);
  const x = document.createElement("button");
  x.id = "hadith-theme-launcher", x.className = "trigger", x.type = "button", x.setAttribute("aria-label", "بدّل واجهة أثر"), x.setAttribute("aria-expanded", "false"), x.setAttribute("aria-controls", "athar-views");
  const A = document.createElement("div");
  A.id = "athar-views", A.className = "menu", A.hidden = !0;
  const y = [["original", "الواجهة الأصلية", "الواجهة الأساسية"], ["journey", "أثر ١ · رحلة المعرفة", "واجهة الاستكشاف الأولى"], ["chat", "بيان السُّنّة · أثر ٢", "الحالات التطبيقية والمحادثة"]], w = { original: "الأصلية", journey: "أثر ١", chat: "بيان السُّنّة" };
  for (const [E, j, K] of y) {
    const X = document.createElement("button");
    X.type = "button", X.dataset.variant = E, X.textContent = j;
    const Y = document.createElement("small");
    Y.textContent = K, X.append(Y), X.addEventListener("click", () => {
      if (ia && E === "chat") {
        window.open("http://localhost:8080/?athar=chat", "_blank", "noopener");
        return;
      }
      n(E);
    }), A.append(X);
  }
  x.addEventListener("click", () => {
    A.hidden = !A.hidden, x.setAttribute("aria-expanded", String(!A.hidden));
  }), v.append(x, A), t(), document.addEventListener("pointerdown", (E) => {
    E.composedPath().includes(m) || (A.hidden = !0, x.setAttribute("aria-expanded", "false"));
  }), m.addEventListener("keydown", (E) => {
    E.key === "Escape" && (A.hidden = !0, x.setAttribute("aria-expanded", "false"), x.focus());
  }), Gf(Pm, { target: d, props: { apiBase: ia ? "/api" : $m, onClose: () => n("original"), onVariant2: () => {
    ia ? window.open("http://localhost:8080/?athar=chat", "_blank", "noopener") : n("chat");
  }, onReady: (E) => {
    p = E;
  }, webuiOrigin: ia ? "http://localhost:8080" : location.origin } }), c.addEventListener("cancel", (E) => {
    E.preventDefault(), n("original");
  });
  const M = () => {
    const E = location.pathname.startsWith("/auth"), j = location.pathname === "/" || /^\/c\//.test(location.pathname);
    if (b.refresh(), !(E || j || ia)) {
      m.remove();
      return;
    }
    const K = j ? document.querySelector("nav") : null, X = K || document.body;
    m.parentElement !== X && X.appendChild(m), m.style.cssText = `position:${K ? "absolute" : "fixed"};top:${K ? "4px" : "18px"};left:50%;transform:translateX(-50%);z-index:60;`;
  };
  if (new MutationObserver(M).observe(document.body, { childList: !0, subtree: !0 }), window.addEventListener("popstate", M), M(), ia) n("journey");
  else {
    let E = "";
    try {
      E = sessionStorage.getItem("hadith-view") || localStorage.getItem("hadith-view") || "";
    } catch {
    }
    const j = new URLSearchParams(location.search).get("athar");
    j === "original" ? n("original") : (j === "chat" || E === "chat") && n("chat");
  }
}
