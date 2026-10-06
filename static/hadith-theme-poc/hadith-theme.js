var nf = Object.defineProperty;
var Ql = (n) => {
  throw TypeError(n);
};
var af = (n, t, e) => t in n ? nf(n, t, { enumerable: !0, configurable: !0, writable: !0, value: e }) : n[t] = e;
var pr = (n, t, e) => af(n, typeof t != "symbol" ? t + "" : t, e), gs = (n, t, e) => t.has(n) || Ql("Cannot " + e);
var E = (n, t, e) => (gs(n, t, "read from private field"), e ? e.call(n) : t.get(n)), rt = (n, t, e) => t.has(n) ? Ql("Cannot add the same private member more than once") : t instanceof WeakSet ? t.add(n) : t.set(n, e), Q = (n, t, e, r) => (gs(n, t, "write to private field"), r ? r.call(n, e) : t.set(n, e), e), Ft = (n, t, e) => (gs(n, t, "access private method"), e);
var hl = Array.isArray, of = Array.prototype.indexOf, Vi = Array.prototype.includes, Vo = Array.from, sf = Object.defineProperty, gn = Object.getOwnPropertyDescriptor, Gc = Object.getOwnPropertyDescriptors, lf = Object.prototype, cf = Array.prototype, gl = Object.getPrototypeOf, Wl = Object.isExtensible;
function oa(n) {
  return typeof n == "function";
}
const df = () => {
};
function pf(n) {
  return n();
}
function Vs(n) {
  for (var t = 0; t < n.length; t++)
    n[t]();
}
function Xc() {
  var n, t, e = new Promise((r, i) => {
    n = r, t = i;
  });
  return { promise: e, resolve: n, reject: t };
}
function ff(n, t) {
  if (Array.isArray(n))
    return n;
  if (!(Symbol.iterator in n))
    return Array.from(n);
  const e = [];
  for (const r of n)
    if (e.push(r), e.length === t) break;
  return e;
}
const Kt = 2, qi = 4, Na = 8, vl = 1 << 24, zn = 16, xr = 32, Jn = 64, qs = 128, rr = 512, jt = 1024, le = 2048, ar = 4096, Xe = 8192, nr = 16384, ni = 32768, Ns = 1 << 25, $n = 65536, Jl = 1 << 17, uf = 1 << 18, _i = 1 << 19, _c = 1 << 20, Cr = 1 << 25, ti = 65536, Ys = 1 << 21, ml = 1 << 22, vn = 1 << 23, Vr = Symbol("$state"), Zc = Symbol("legacy props"), hf = Symbol(""), _r = new class extends Error {
  constructor() {
    super(...arguments);
    pr(this, "name", "StaleReactionError");
    pr(this, "message", "The reaction that called `getAbortSignal()` was re-run or destroyed");
  }
}();
var Bc;
const Kc = (
  // We gotta write it like this because after downleveling the pure comment may end up in the wrong location
  !!((Bc = globalThis.document) != null && Bc.contentType) && /* @__PURE__ */ globalThis.document.contentType.includes("xml")
);
function gf(n) {
  throw new Error("https://svelte.dev/e/lifecycle_outside_component");
}
function vf() {
  throw new Error("https://svelte.dev/e/async_derived_orphan");
}
function mf(n, t, e) {
  throw new Error("https://svelte.dev/e/each_key_duplicate");
}
function xf(n) {
  throw new Error("https://svelte.dev/e/effect_in_teardown");
}
function bf() {
  throw new Error("https://svelte.dev/e/effect_in_unowned_derived");
}
function yf(n) {
  throw new Error("https://svelte.dev/e/effect_orphan");
}
function wf() {
  throw new Error("https://svelte.dev/e/effect_update_depth_exceeded");
}
function kf(n) {
  throw new Error("https://svelte.dev/e/props_invalid_value");
}
function Af() {
  throw new Error("https://svelte.dev/e/state_descriptors_fixed");
}
function Sf() {
  throw new Error("https://svelte.dev/e/state_prototype_fixed");
}
function zf() {
  throw new Error("https://svelte.dev/e/state_unsafe_mutation");
}
function Ef() {
  throw new Error("https://svelte.dev/e/svelte_boundary_reset_onerror");
}
const Tf = 1, Mf = 2, Hc = 4, Of = 8, Pf = 16, If = 1, Cf = 2, Qc = 4, Rf = 8, Vf = 16, qf = 1, Nf = 2, Zt = Symbol(), Wc = "http://www.w3.org/1999/xhtml", Yf = "http://www.w3.org/2000/svg", Lf = "@attach";
function Df() {
  console.warn("https://svelte.dev/e/select_multiple_invalid_value");
}
function Ff() {
  console.warn("https://svelte.dev/e/svelte_boundary_reset_noop");
}
function Jc(n) {
  return n === this.v;
}
function Bf(n, t) {
  return n != n ? t == t : n !== t || n !== null && typeof n == "object" || typeof n == "function";
}
function $c(n) {
  return !Bf(n, this.v);
}
let Zi = !1;
function Uf() {
  Zi = !0;
}
let zt = null;
function Ni(n) {
  zt = n;
}
function xl(n, t = !1, e) {
  zt = {
    p: zt,
    i: !1,
    c: null,
    e: null,
    s: n,
    x: null,
    r: (
      /** @type {Effect} */
      W
    ),
    l: Zi && !t ? { s: null, u: null, $: [] } : null
  };
}
function bl(n) {
  var t = (
    /** @type {ComponentContext} */
    zt
  ), e = t.e;
  if (e !== null) {
    t.e = null;
    for (var r of e)
      wd(r);
  }
  return t.i = !0, zt = t.p, /** @type {T} */
  {};
}
function Ya() {
  return !Zi || zt !== null && zt.l === null;
}
let Dn = [];
function td() {
  var n = Dn;
  Dn = [], Vs(n);
}
function Qr(n) {
  if (Dn.length === 0 && !ba) {
    var t = Dn;
    queueMicrotask(() => {
      t === Dn && td();
    });
  }
  Dn.push(n);
}
function jf() {
  for (; Dn.length > 0; )
    td();
}
function ed(n) {
  var t = W;
  if (t === null)
    return J.f |= vn, n;
  if (!(t.f & ni) && !(t.f & qi))
    throw n;
  pn(n, t);
}
function pn(n, t) {
  for (; t !== null; ) {
    if (t.f & qs) {
      if (!(t.f & ni))
        throw n;
      try {
        t.b.error(n);
        return;
      } catch (e) {
        n = e;
      }
    }
    t = t.parent;
  }
  throw n;
}
const Gf = -7169;
function Rt(n, t) {
  n.f = n.f & Gf | t;
}
function yl(n) {
  n.f & rr || n.deps === null ? Rt(n, jt) : Rt(n, ar);
}
function rd(n) {
  if (n !== null)
    for (const t of n)
      !(t.f & Kt) || !(t.f & ti) || (t.f ^= ti, rd(
        /** @type {Derived} */
        t.deps
      ));
}
function nd(n, t, e) {
  n.f & le ? t.add(n) : n.f & ar && e.add(n), rd(n.deps), Rt(n, jt);
}
let so = !1;
function Xf(n) {
  var t = so;
  try {
    return so = !1, [n(), so];
  } finally {
    so = t;
  }
}
const sa = /* @__PURE__ */ new Set();
let X = null, $t = null, Ls = null, ba = !1, vs = !1, xi = null, uo = null;
var $l = 0;
let _f = 1;
var zi, Ei, Ti, Mi, Ra, We, Oi, cn, Tr, Pi, ce, Ds, Fs, Bs, Us, id;
const Io = class Io {
  constructor() {
    rt(this, ce);
    // for debugging. TODO remove once async is stable
    pr(this, "id", _f++);
    /**
     * The current values of any sources that are updated in this batch
     * They keys of this map are identical to `this.#previous`
     * @type {Map<Source, any>}
     */
    pr(this, "current", /* @__PURE__ */ new Map());
    /**
     * The values of any sources that are updated in this batch _before_ those updates took place.
     * They keys of this map are identical to `this.#current`
     * @type {Map<Source, any>}
     */
    pr(this, "previous", /* @__PURE__ */ new Map());
    /**
     * When the batch is committed (and the DOM is updated), we need to remove old branches
     * and append new ones by calling the functions added inside (if/each/key/etc) blocks
     * @type {Set<(batch: Batch) => void>}
     */
    rt(this, zi, /* @__PURE__ */ new Set());
    /**
     * If a fork is discarded, we need to destroy any effects that are no longer needed
     * @type {Set<(batch: Batch) => void>}
     */
    rt(this, Ei, /* @__PURE__ */ new Set());
    /**
     * The number of async effects that are currently in flight
     */
    rt(this, Ti, 0);
    /**
     * The number of async effects that are currently in flight, _not_ inside a pending boundary
     */
    rt(this, Mi, 0);
    /**
     * A deferred that resolves when the batch is committed, used with `settled()`
     * TODO replace with Promise.withResolvers once supported widely enough
     * @type {{ promise: Promise<void>, resolve: (value?: any) => void, reject: (reason: unknown) => void } | null}
     */
    rt(this, Ra, null);
    /**
     * The root effects that need to be flushed
     * @type {Effect[]}
     */
    rt(this, We, []);
    /**
     * Deferred effects (which run after async work has completed) that are DIRTY
     * @type {Set<Effect>}
     */
    rt(this, Oi, /* @__PURE__ */ new Set());
    /**
     * Deferred effects that are MAYBE_DIRTY
     * @type {Set<Effect>}
     */
    rt(this, cn, /* @__PURE__ */ new Set());
    /**
     * A map of branches that still exist, but will be destroyed when this batch
     * is committed — we skip over these during `process`.
     * The value contains child effects that were dirty/maybe_dirty before being reset,
     * so they can be rescheduled if the branch survives.
     * @type {Map<Effect, { d: Effect[], m: Effect[] }>}
     */
    rt(this, Tr, /* @__PURE__ */ new Map());
    pr(this, "is_fork", !1);
    rt(this, Pi, !1);
  }
  /**
   * Add an effect to the #skipped_branches map and reset its children
   * @param {Effect} effect
   */
  skip_effect(t) {
    E(this, Tr).has(t) || E(this, Tr).set(t, { d: [], m: [] });
  }
  /**
   * Remove an effect from the #skipped_branches map and reschedule
   * any tracked dirty/maybe_dirty child effects
   * @param {Effect} effect
   */
  unskip_effect(t) {
    var e = E(this, Tr).get(t);
    if (e) {
      E(this, Tr).delete(t);
      for (var r of e.d)
        Rt(r, le), this.schedule(r);
      for (r of e.m)
        Rt(r, ar), this.schedule(r);
    }
  }
  /**
   * Associate a change to a given source with the current
   * batch, noting its previous and current values
   * @param {Source} source
   * @param {any} value
   */
  capture(t, e) {
    e !== Zt && !this.previous.has(t) && this.previous.set(t, e), t.f & vn || (this.current.set(t, t.v), $t == null || $t.set(t, t.v));
  }
  activate() {
    X = this;
  }
  deactivate() {
    X = null, $t = null;
  }
  flush() {
    try {
      if (vs = !0, X = this, !Ft(this, ce, Ds).call(this)) {
        for (const t of E(this, Oi))
          E(this, cn).delete(t), Rt(t, le), this.schedule(t);
        for (const t of E(this, cn))
          Rt(t, ar), this.schedule(t);
      }
      Ft(this, ce, Fs).call(this);
    } finally {
      $l = 0, Ls = null, xi = null, uo = null, vs = !1, X = null, $t = null, mn.clear();
    }
  }
  discard() {
    for (const t of E(this, Ei)) t(this);
    E(this, Ei).clear();
  }
  /**
   *
   * @param {boolean} blocking
   */
  increment(t) {
    Q(this, Ti, E(this, Ti) + 1), t && Q(this, Mi, E(this, Mi) + 1);
  }
  /**
   * @param {boolean} blocking
   * @param {boolean} skip - whether to skip updates (because this is triggered by a stale reaction)
   */
  decrement(t, e) {
    Q(this, Ti, E(this, Ti) - 1), t && Q(this, Mi, E(this, Mi) - 1), !(E(this, Pi) || e) && (Q(this, Pi, !0), Qr(() => {
      Q(this, Pi, !1), this.flush();
    }));
  }
  /** @param {(batch: Batch) => void} fn */
  oncommit(t) {
    E(this, zi).add(t);
  }
  /** @param {(batch: Batch) => void} fn */
  ondiscard(t) {
    E(this, Ei).add(t);
  }
  settled() {
    return (E(this, Ra) ?? Q(this, Ra, Xc())).promise;
  }
  static ensure() {
    if (X === null) {
      const t = X = new Io();
      vs || (sa.add(X), ba || Qr(() => {
        X === t && t.flush();
      }));
    }
    return X;
  }
  apply() {
  }
  /**
   *
   * @param {Effect} effect
   */
  schedule(t) {
    var i;
    if (Ls = t, (i = t.b) != null && i.is_pending && t.f & (qi | Na | vl) && !(t.f & ni)) {
      t.b.defer_effect(t);
      return;
    }
    for (var e = t; e.parent !== null; ) {
      e = e.parent;
      var r = e.f;
      if (xi !== null && e === W && (J === null || !(J.f & Kt)))
        return;
      if (r & (Jn | xr)) {
        if (!(r & jt))
          return;
        e.f ^= jt;
      }
    }
    E(this, We).push(e);
  }
};
zi = new WeakMap(), Ei = new WeakMap(), Ti = new WeakMap(), Mi = new WeakMap(), Ra = new WeakMap(), We = new WeakMap(), Oi = new WeakMap(), cn = new WeakMap(), Tr = new WeakMap(), Pi = new WeakMap(), ce = new WeakSet(), Ds = function() {
  return this.is_fork || E(this, Mi) > 0;
}, Fs = function() {
  var s, l;
  $l++ > 1e3 && Kf();
  const t = E(this, We);
  Q(this, We, []), this.apply();
  var e = xi = [], r = [], i = uo = [];
  for (const c of t)
    Ft(this, ce, Bs).call(this, c, e, r);
  if (X = null, i.length > 0) {
    var a = Io.ensure();
    for (const c of i)
      a.schedule(c);
  }
  if (xi = null, uo = null, Ft(this, ce, Ds).call(this)) {
    Ft(this, ce, Us).call(this, r), Ft(this, ce, Us).call(this, e);
    for (const [c, d] of E(this, Tr))
      sd(c, d);
  } else {
    E(this, Oi).clear(), E(this, cn).clear();
    for (const c of E(this, zi)) c(this);
    E(this, zi).clear(), tc(r), tc(e), E(this, Ti) === 0 && Ft(this, ce, id).call(this), (s = E(this, Ra)) == null || s.resolve();
  }
  var o = (
    /** @type {Batch | null} */
    /** @type {unknown} */
    X
  );
  if (E(this, We).length > 0) {
    const c = o ?? (o = this);
    E(c, We).push(...E(this, We).filter((d) => !E(c, We).includes(d)));
  }
  o !== null && (sa.add(o), Ft(l = o, ce, Fs).call(l));
}, /**
 * Traverse the effect tree, executing effects or stashing
 * them for later execution as appropriate
 * @param {Effect} root
 * @param {Effect[]} effects
 * @param {Effect[]} render_effects
 */
Bs = function(t, e, r) {
  t.f ^= jt;
  for (var i = t.first; i !== null; ) {
    var a = i.f, o = (a & (xr | Jn)) !== 0, s = o && (a & jt) !== 0, l = s || (a & Xe) !== 0 || E(this, Tr).has(i);
    if (!l && i.fn !== null) {
      o ? i.f ^= jt : a & qi ? e.push(i) : Ki(i) && (a & zn && E(this, cn).add(i), ri(i));
      var c = i.first;
      if (c !== null) {
        i = c;
        continue;
      }
    }
    for (; i !== null; ) {
      var d = i.next;
      if (d !== null) {
        i = d;
        break;
      }
      i = i.parent;
    }
  }
}, /**
 * @param {Effect[]} effects
 */
Us = function(t) {
  for (var e = 0; e < t.length; e += 1)
    nd(t[e], E(this, Oi), E(this, cn));
}, id = function() {
  var i;
  if (sa.size > 1) {
    this.previous.clear();
    var t = X, e = $t, r = !0;
    for (const a of sa) {
      if (a === this) {
        r = !1;
        continue;
      }
      const o = [];
      for (const [l, c] of this.current) {
        if (a.current.has(l))
          if (r && c !== a.current.get(l))
            a.current.set(l, c);
          else
            continue;
        o.push(l);
      }
      if (o.length === 0)
        continue;
      const s = [...a.current.keys()].filter((l) => !this.current.has(l));
      if (s.length > 0) {
        a.activate();
        const l = /* @__PURE__ */ new Set(), c = /* @__PURE__ */ new Map();
        for (const d of o)
          ad(d, s, l, c);
        if (E(a, We).length > 0) {
          a.apply();
          for (const d of E(a, We))
            Ft(i = a, ce, Bs).call(i, d, [], []);
        }
        a.deactivate();
      }
    }
    X = t, $t = e;
  }
  E(this, Tr).clear(), sa.delete(this);
};
let ei = Io;
function Zf(n) {
  var t = ba;
  ba = !0;
  try {
    for (var e; ; ) {
      if (jf(), X === null)
        return (
          /** @type {T} */
          e
        );
      X.flush();
    }
  } finally {
    ba = t;
  }
}
function Kf() {
  try {
    wf();
  } catch (n) {
    pn(n, Ls);
  }
}
let ur = null;
function tc(n) {
  var t = n.length;
  if (t !== 0) {
    for (var e = 0; e < t; ) {
      var r = n[e++];
      if (!(r.f & (nr | Xe)) && Ki(r) && (ur = /* @__PURE__ */ new Set(), ri(r), r.deps === null && r.first === null && r.nodes === null && r.teardown === null && r.ac === null && Sd(r), (ur == null ? void 0 : ur.size) > 0)) {
        mn.clear();
        for (const i of ur) {
          if (i.f & (nr | Xe)) continue;
          const a = [i];
          let o = i.parent;
          for (; o !== null; )
            ur.has(o) && (ur.delete(o), a.push(o)), o = o.parent;
          for (let s = a.length - 1; s >= 0; s--) {
            const l = a[s];
            l.f & (nr | Xe) || ri(l);
          }
        }
        ur.clear();
      }
    }
    ur = null;
  }
}
function ad(n, t, e, r) {
  if (!e.has(n) && (e.add(n), n.reactions !== null))
    for (const i of n.reactions) {
      const a = i.f;
      a & Kt ? ad(
        /** @type {Derived} */
        i,
        t,
        e,
        r
      ) : a & (ml | zn) && !(a & le) && od(i, t, r) && (Rt(i, le), wl(
        /** @type {Effect} */
        i
      ));
    }
}
function od(n, t, e) {
  const r = e.get(n);
  if (r !== void 0) return r;
  if (n.deps !== null)
    for (const i of n.deps) {
      if (Vi.call(t, i))
        return !0;
      if (i.f & Kt && od(
        /** @type {Derived} */
        i,
        t,
        e
      ))
        return e.set(
          /** @type {Derived} */
          i,
          !0
        ), !0;
    }
  return e.set(n, !1), !1;
}
function wl(n) {
  X.schedule(n);
}
function sd(n, t) {
  if (!(n.f & xr && n.f & jt)) {
    n.f & le ? t.d.push(n) : n.f & ar && t.m.push(n), Rt(n, jt);
    for (var e = n.first; e !== null; )
      sd(e, t), e = e.next;
  }
}
function Hf(n) {
  let t = 0, e = yn(0), r;
  return () => {
    Sl() && (h(e), Fa(() => (t === 0 && (r = C(() => n(() => ya(e)))), t += 1, () => {
      Qr(() => {
        t -= 1, t === 0 && (r == null || r(), r = void 0, ya(e));
      });
    })));
  };
}
var Qf = $n | _i;
function Wf(n, t, e, r) {
  new Jf(n, t, e, r);
}
var Je, ul, Mr, jn, Se, Or, De, hr, Kr, Gn, dn, Ii, Ci, Ri, Hr, Co, Gt, $f, tu, eu, js, ho, go, Gs;
class Jf {
  /**
   * @param {TemplateNode} node
   * @param {BoundaryProps} props
   * @param {((anchor: Node) => void)} children
   * @param {((error: unknown) => unknown) | undefined} [transform_error]
   */
  constructor(t, e, r, i) {
    rt(this, Gt);
    /** @type {Boundary | null} */
    pr(this, "parent");
    pr(this, "is_pending", !1);
    /**
     * API-level transformError transform function. Transforms errors before they reach the `failed` snippet.
     * Inherited from parent boundary, or defaults to identity.
     * @type {(error: unknown) => unknown}
     */
    pr(this, "transform_error");
    /** @type {TemplateNode} */
    rt(this, Je);
    /** @type {TemplateNode | null} */
    rt(this, ul, null);
    /** @type {BoundaryProps} */
    rt(this, Mr);
    /** @type {((anchor: Node) => void)} */
    rt(this, jn);
    /** @type {Effect} */
    rt(this, Se);
    /** @type {Effect | null} */
    rt(this, Or, null);
    /** @type {Effect | null} */
    rt(this, De, null);
    /** @type {Effect | null} */
    rt(this, hr, null);
    /** @type {DocumentFragment | null} */
    rt(this, Kr, null);
    rt(this, Gn, 0);
    rt(this, dn, 0);
    rt(this, Ii, !1);
    /** @type {Set<Effect>} */
    rt(this, Ci, /* @__PURE__ */ new Set());
    /** @type {Set<Effect>} */
    rt(this, Ri, /* @__PURE__ */ new Set());
    /**
     * A source containing the number of pending async deriveds/expressions.
     * Only created if `$effect.pending()` is used inside the boundary,
     * otherwise updating the source results in needless `Batch.ensure()`
     * calls followed by no-op flushes
     * @type {Source<number> | null}
     */
    rt(this, Hr, null);
    rt(this, Co, Hf(() => (Q(this, Hr, yn(E(this, Gn))), () => {
      Q(this, Hr, null);
    })));
    var a;
    Q(this, Je, t), Q(this, Mr, e), Q(this, jn, (o) => {
      var s = (
        /** @type {Effect} */
        W
      );
      s.b = this, s.f |= qs, r(o);
    }), this.parent = /** @type {Effect} */
    W.b, this.transform_error = i ?? ((a = this.parent) == null ? void 0 : a.transform_error) ?? ((o) => o), Q(this, Se, Lo(() => {
      Ft(this, Gt, js).call(this);
    }, Qf));
  }
  /**
   * Defer an effect inside a pending boundary until the boundary resolves
   * @param {Effect} effect
   */
  defer_effect(t) {
    nd(t, E(this, Ci), E(this, Ri));
  }
  /**
   * Returns `false` if the effect exists inside a boundary whose pending snippet is shown
   * @returns {boolean}
   */
  is_rendered() {
    return !this.is_pending && (!this.parent || this.parent.is_rendered());
  }
  has_pending_snippet() {
    return !!E(this, Mr).pending;
  }
  /**
   * Update the source that powers `$effect.pending()` inside this boundary,
   * and controls when the current `pending` snippet (if any) is removed.
   * Do not call from inside the class
   * @param {1 | -1} d
   * @param {Batch} batch
   */
  update_pending_count(t, e) {
    Ft(this, Gt, Gs).call(this, t, e), Q(this, Gn, E(this, Gn) + t), !(!E(this, Hr) || E(this, Ii)) && (Q(this, Ii, !0), Qr(() => {
      Q(this, Ii, !1), E(this, Hr) && Yi(E(this, Hr), E(this, Gn));
    }));
  }
  get_effect_pending() {
    return E(this, Co).call(this), h(
      /** @type {Source<number>} */
      E(this, Hr)
    );
  }
  /** @param {unknown} error */
  error(t) {
    var e = E(this, Mr).onerror;
    let r = E(this, Mr).failed;
    if (!e && !r)
      throw t;
    E(this, Or) && (te(E(this, Or)), Q(this, Or, null)), E(this, De) && (te(E(this, De)), Q(this, De, null)), E(this, hr) && (te(E(this, hr)), Q(this, hr, null));
    var i = !1, a = !1;
    const o = () => {
      if (i) {
        Ff();
        return;
      }
      i = !0, a && Ef(), E(this, hr) !== null && _n(E(this, hr), () => {
        Q(this, hr, null);
      }), Ft(this, Gt, go).call(this, () => {
        Ft(this, Gt, js).call(this);
      });
    }, s = (l) => {
      try {
        a = !0, e == null || e(l, o), a = !1;
      } catch (c) {
        pn(c, E(this, Se) && E(this, Se).parent);
      }
      r && Q(this, hr, Ft(this, Gt, go).call(this, () => {
        try {
          return Ee(() => {
            var c = (
              /** @type {Effect} */
              W
            );
            c.b = this, c.f |= qs, r(
              E(this, Je),
              () => l,
              () => o
            );
          });
        } catch (c) {
          return pn(
            c,
            /** @type {Effect} */
            E(this, Se).parent
          ), null;
        }
      }));
    };
    Qr(() => {
      var l;
      try {
        l = this.transform_error(t);
      } catch (c) {
        pn(c, E(this, Se) && E(this, Se).parent);
        return;
      }
      l !== null && typeof l == "object" && typeof /** @type {any} */
      l.then == "function" ? l.then(
        s,
        /** @param {unknown} e */
        (c) => pn(c, E(this, Se) && E(this, Se).parent)
      ) : s(l);
    });
  }
}
Je = new WeakMap(), ul = new WeakMap(), Mr = new WeakMap(), jn = new WeakMap(), Se = new WeakMap(), Or = new WeakMap(), De = new WeakMap(), hr = new WeakMap(), Kr = new WeakMap(), Gn = new WeakMap(), dn = new WeakMap(), Ii = new WeakMap(), Ci = new WeakMap(), Ri = new WeakMap(), Hr = new WeakMap(), Co = new WeakMap(), Gt = new WeakSet(), $f = function() {
  try {
    Q(this, Or, Ee(() => E(this, jn).call(this, E(this, Je))));
  } catch (t) {
    this.error(t);
  }
}, /**
 * @param {unknown} error The deserialized error from the server's hydration comment
 */
tu = function(t) {
  const e = E(this, Mr).failed;
  e && Q(this, hr, Ee(() => {
    e(
      E(this, Je),
      () => t,
      () => () => {
      }
    );
  }));
}, eu = function() {
  const t = E(this, Mr).pending;
  if (t) {
    this.is_pending = !0, Q(this, De, Ee(() => t(E(this, Je))));
    var e = (
      /** @type {Batch} */
      X
    );
    Qr(() => {
      var r = Q(this, Kr, document.createDocumentFragment()), i = qr();
      r.append(i), Q(this, Or, Ft(this, Gt, go).call(this, () => Ee(() => E(this, jn).call(this, i)))), E(this, dn) === 0 && (E(this, Je).before(r), Q(this, Kr, null), _n(
        /** @type {Effect} */
        E(this, De),
        () => {
          Q(this, De, null);
        }
      ), Ft(this, Gt, ho).call(this, e));
    });
  }
}, js = function() {
  var t = (
    /** @type {Batch} */
    X
  );
  try {
    if (this.is_pending = this.has_pending_snippet(), Q(this, dn, 0), Q(this, Gn, 0), Q(this, Or, Ee(() => {
      E(this, jn).call(this, E(this, Je));
    })), E(this, dn) > 0) {
      var e = Q(this, Kr, document.createDocumentFragment());
      Tl(E(this, Or), e);
      const r = (
        /** @type {(anchor: Node) => void} */
        E(this, Mr).pending
      );
      Q(this, De, Ee(() => r(E(this, Je))));
    } else
      Ft(this, Gt, ho).call(this, t);
  } catch (r) {
    this.error(r);
  }
}, /**
 * @param {Batch} batch
 */
ho = function(t) {
  this.is_pending = !1;
  for (const e of E(this, Ci))
    Rt(e, le), t.schedule(e);
  for (const e of E(this, Ri))
    Rt(e, ar), t.schedule(e);
  E(this, Ci).clear(), E(this, Ri).clear();
}, /**
 * @template T
 * @param {() => T} fn
 */
go = function(t) {
  var e = W, r = J, i = zt;
  Ie(E(this, Se)), or(E(this, Se)), Ni(E(this, Se).ctx);
  try {
    return ei.ensure(), t();
  } catch (a) {
    return ed(a), null;
  } finally {
    Ie(e), or(r), Ni(i);
  }
}, /**
 * Updates the pending count associated with the currently visible pending snippet,
 * if any, such that we can replace the snippet with content once work is done
 * @param {1 | -1} d
 * @param {Batch} batch
 */
Gs = function(t, e) {
  var r;
  if (!this.has_pending_snippet()) {
    this.parent && Ft(r = this.parent, Gt, Gs).call(r, t, e);
    return;
  }
  Q(this, dn, E(this, dn) + t), E(this, dn) === 0 && (Ft(this, Gt, ho).call(this, e), E(this, De) && _n(E(this, De), () => {
    Q(this, De, null);
  }), E(this, Kr) && (E(this, Je).before(E(this, Kr)), Q(this, Kr, null)));
};
function ld(n, t, e, r) {
  const i = Ya() ? La : kl;
  var a = n.filter((u) => !u.settled);
  if (e.length === 0 && a.length === 0) {
    r(t.map(i));
    return;
  }
  var o = (
    /** @type {Effect} */
    W
  ), s = ru(), l = a.length === 1 ? a[0].promise : a.length > 1 ? Promise.all(a.map((u) => u.promise)) : null;
  function c(u) {
    s();
    try {
      r(u);
    } catch (m) {
      o.f & nr || pn(m, o);
    }
    ko();
  }
  if (e.length === 0) {
    l.then(() => c(t.map(i)));
    return;
  }
  var d = cd();
  function p() {
    Promise.all(e.map((u) => /* @__PURE__ */ nu(u))).then((u) => c([...t.map(i), ...u])).catch((u) => pn(u, o)).finally(() => d());
  }
  l ? l.then(() => {
    s(), p(), ko();
  }) : p();
}
function ru() {
  var n = (
    /** @type {Effect} */
    W
  ), t = J, e = zt, r = (
    /** @type {Batch} */
    X
  );
  return function(a = !0) {
    Ie(n), or(t), Ni(e), a && !(n.f & nr) && (r == null || r.activate(), r == null || r.apply());
  };
}
function ko(n = !0) {
  Ie(null), or(null), Ni(null), n && (X == null || X.deactivate());
}
function cd() {
  var n = (
    /** @type {Boundary} */
    /** @type {Effect} */
    W.b
  ), t = (
    /** @type {Batch} */
    X
  ), e = n.is_rendered();
  return n.update_pending_count(1, t), t.increment(e), (r = !1) => {
    n.update_pending_count(-1, t), t.decrement(e, r);
  };
}
// @__NO_SIDE_EFFECTS__
function La(n) {
  var t = Kt | le, e = J !== null && J.f & Kt ? (
    /** @type {Derived} */
    J
  ) : null;
  return W !== null && (W.f |= _i), {
    ctx: zt,
    deps: null,
    effects: null,
    equals: Jc,
    f: t,
    fn: n,
    reactions: null,
    rv: 0,
    v: (
      /** @type {V} */
      Zt
    ),
    wv: 0,
    parent: e ?? W,
    ac: null
  };
}
// @__NO_SIDE_EFFECTS__
function nu(n, t, e) {
  let r = (
    /** @type {Effect | null} */
    W
  );
  r === null && vf();
  var i = (
    /** @type {Promise<V>} */
    /** @type {unknown} */
    void 0
  ), a = yn(
    /** @type {V} */
    Zt
  ), o = !J, s = /* @__PURE__ */ new Map();
  return xu(() => {
    var m;
    var l = (
      /** @type {Effect} */
      W
    ), c = Xc();
    i = c.promise;
    try {
      Promise.resolve(n()).then(c.resolve, c.reject).finally(ko);
    } catch (g) {
      c.reject(g), ko();
    }
    var d = (
      /** @type {Batch} */
      X
    );
    if (o) {
      if (l.f & ni)
        var p = cd();
      if (
        /** @type {Boundary} */
        r.b.is_rendered()
      )
        (m = s.get(d)) == null || m.reject(_r), s.delete(d);
      else {
        for (const g of s.values())
          g.reject(_r);
        s.clear();
      }
      s.set(d, c);
    }
    const u = (g, f = void 0) => {
      if (p) {
        var v = f === _r;
        p(v);
      }
      if (!(f === _r || l.f & nr)) {
        if (d.activate(), f)
          a.f |= vn, Yi(a, f);
        else {
          a.f & vn && (a.f ^= vn), Yi(a, g);
          for (const [b, A] of s) {
            if (s.delete(b), b === d) break;
            A.reject(_r);
          }
        }
        d.deactivate();
      }
    };
    c.promise.then(u, (g) => u(null, g || "unknown"));
  }), No(() => {
    for (const l of s.values())
      l.reject(_r);
  }), new Promise((l) => {
    function c(d) {
      function p() {
        d === i ? l(a) : c(i);
      }
      d.then(p, p);
    }
    c(i);
  });
}
// @__NO_SIDE_EFFECTS__
function iu(n) {
  const t = /* @__PURE__ */ La(n);
  return Td(t), t;
}
// @__NO_SIDE_EFFECTS__
function kl(n) {
  const t = /* @__PURE__ */ La(n);
  return t.equals = $c, t;
}
function au(n) {
  var t = n.effects;
  if (t !== null) {
    n.effects = null;
    for (var e = 0; e < t.length; e += 1)
      te(
        /** @type {Effect} */
        t[e]
      );
  }
}
function ou(n) {
  for (var t = n.parent; t !== null; ) {
    if (!(t.f & Kt))
      return t.f & nr ? null : (
        /** @type {Effect} */
        t
      );
    t = t.parent;
  }
  return null;
}
function Al(n) {
  var t, e = W;
  Ie(ou(n));
  try {
    n.f &= ~ti, au(n), t = Id(n);
  } finally {
    Ie(e);
  }
  return t;
}
function dd(n) {
  var t = Al(n);
  if (!n.equals(t) && (n.wv = Od(), (!(X != null && X.is_fork) || n.deps === null) && (n.v = t, n.deps === null))) {
    Rt(n, jt);
    return;
  }
  wn || ($t !== null ? (Sl() || X != null && X.is_fork) && $t.set(n, t) : yl(n));
}
function su(n) {
  var t, e;
  if (n.effects !== null)
    for (const r of n.effects)
      (r.teardown || r.ac) && ((t = r.teardown) == null || t.call(r), (e = r.ac) == null || e.abort(_r), r.teardown = df, r.ac = null, za(r, 0), zl(r));
}
function pd(n) {
  if (n.effects !== null)
    for (const t of n.effects)
      t.teardown && ri(t);
}
let Xs = /* @__PURE__ */ new Set();
const mn = /* @__PURE__ */ new Map();
let fd = !1;
function yn(n, t) {
  var e = {
    f: 0,
    // TODO ideally we could skip this altogether, but it causes type errors
    v: n,
    reactions: null,
    equals: Jc,
    rv: 0,
    wv: 0
  };
  return e;
}
// @__NO_SIDE_EFFECTS__
function on(n, t) {
  const e = yn(n);
  return Td(e), e;
}
// @__NO_SIDE_EFFECTS__
function At(n, t = !1, e = !0) {
  var i;
  const r = yn(n);
  return t || (r.equals = $c), Zi && e && zt !== null && zt.l !== null && ((i = zt.l).s ?? (i.s = [])).push(r), r;
}
function I(n, t, e = !1) {
  J !== null && // since we are untracking the function inside `$inspect.with` we need to add this check
  // to ensure we error if state is set inside an inspect effect
  (!mr || J.f & Jl) && Ya() && J.f & (Kt | zn | ml | Jl) && (ir === null || !Vi.call(ir, n)) && zf();
  let r = e ? bi(t) : t;
  return Yi(n, r, uo);
}
function Yi(n, t, e = null) {
  if (!n.equals(t)) {
    var r = n.v;
    wn ? mn.set(n, t) : mn.set(n, r), n.v = t;
    var i = ei.ensure();
    if (i.capture(n, r), n.f & Kt) {
      const a = (
        /** @type {Derived} */
        n
      );
      n.f & le && Al(a), yl(a);
    }
    n.wv = Od(), ud(n, le, e), Ya() && W !== null && W.f & jt && !(W.f & (xr | Jn)) && (Qe === null ? wu([n]) : Qe.push(n)), !i.is_fork && Xs.size > 0 && !fd && lu();
  }
  return t;
}
function lu() {
  fd = !1;
  for (const n of Xs)
    n.f & jt && Rt(n, ar), Ki(n) && ri(n);
  Xs.clear();
}
function ec(n, t = 1) {
  var e = h(n), r = t === 1 ? e++ : e--;
  return I(n, e), r;
}
function ya(n) {
  I(n, n.v + 1);
}
function ud(n, t, e) {
  var r = n.reactions;
  if (r !== null)
    for (var i = Ya(), a = r.length, o = 0; o < a; o++) {
      var s = r[o], l = s.f;
      if (!(!i && s === W)) {
        var c = (l & le) === 0;
        if (c && Rt(s, t), l & Kt) {
          var d = (
            /** @type {Derived} */
            s
          );
          $t == null || $t.delete(d), l & ti || (l & rr && (s.f |= ti), ud(d, ar, e));
        } else if (c) {
          var p = (
            /** @type {Effect} */
            s
          );
          l & zn && ur !== null && ur.add(p), e !== null ? e.push(p) : wl(p);
        }
      }
    }
}
function bi(n) {
  if (typeof n != "object" || n === null || Vr in n)
    return n;
  const t = gl(n);
  if (t !== lf && t !== cf)
    return n;
  var e = /* @__PURE__ */ new Map(), r = hl(n), i = /* @__PURE__ */ on(0), a = Zn, o = (s) => {
    if (Zn === a)
      return s();
    var l = J, c = Zn;
    or(null), oc(a);
    var d = s();
    return or(l), oc(c), d;
  };
  return r && e.set("length", /* @__PURE__ */ on(
    /** @type {any[]} */
    n.length
  )), new Proxy(
    /** @type {any} */
    n,
    {
      defineProperty(s, l, c) {
        (!("value" in c) || c.configurable === !1 || c.enumerable === !1 || c.writable === !1) && Af();
        var d = e.get(l);
        return d === void 0 ? o(() => {
          var p = /* @__PURE__ */ on(c.value);
          return e.set(l, p), p;
        }) : I(d, c.value, !0), !0;
      },
      deleteProperty(s, l) {
        var c = e.get(l);
        if (c === void 0) {
          if (l in s) {
            const d = o(() => /* @__PURE__ */ on(Zt));
            e.set(l, d), ya(i);
          }
        } else
          I(c, Zt), ya(i);
        return !0;
      },
      get(s, l, c) {
        var m;
        if (l === Vr)
          return n;
        var d = e.get(l), p = l in s;
        if (d === void 0 && (!p || (m = gn(s, l)) != null && m.writable) && (d = o(() => {
          var g = bi(p ? s[l] : Zt), f = /* @__PURE__ */ on(g);
          return f;
        }), e.set(l, d)), d !== void 0) {
          var u = h(d);
          return u === Zt ? void 0 : u;
        }
        return Reflect.get(s, l, c);
      },
      getOwnPropertyDescriptor(s, l) {
        var c = Reflect.getOwnPropertyDescriptor(s, l);
        if (c && "value" in c) {
          var d = e.get(l);
          d && (c.value = h(d));
        } else if (c === void 0) {
          var p = e.get(l), u = p == null ? void 0 : p.v;
          if (p !== void 0 && u !== Zt)
            return {
              enumerable: !0,
              configurable: !0,
              value: u,
              writable: !0
            };
        }
        return c;
      },
      has(s, l) {
        var u;
        if (l === Vr)
          return !0;
        var c = e.get(l), d = c !== void 0 && c.v !== Zt || Reflect.has(s, l);
        if (c !== void 0 || W !== null && (!d || (u = gn(s, l)) != null && u.writable)) {
          c === void 0 && (c = o(() => {
            var m = d ? bi(s[l]) : Zt, g = /* @__PURE__ */ on(m);
            return g;
          }), e.set(l, c));
          var p = h(c);
          if (p === Zt)
            return !1;
        }
        return d;
      },
      set(s, l, c, d) {
        var x;
        var p = e.get(l), u = l in s;
        if (r && l === "length")
          for (var m = c; m < /** @type {Source<number>} */
          p.v; m += 1) {
            var g = e.get(m + "");
            g !== void 0 ? I(g, Zt) : m in s && (g = o(() => /* @__PURE__ */ on(Zt)), e.set(m + "", g));
          }
        if (p === void 0)
          (!u || (x = gn(s, l)) != null && x.writable) && (p = o(() => /* @__PURE__ */ on(void 0)), I(p, bi(c)), e.set(l, p));
        else {
          u = p.v !== Zt;
          var f = o(() => bi(c));
          I(p, f);
        }
        var v = Reflect.getOwnPropertyDescriptor(s, l);
        if (v != null && v.set && v.set.call(d, c), !u) {
          if (r && typeof l == "string") {
            var b = (
              /** @type {Source<number>} */
              e.get("length")
            ), A = Number(l);
            Number.isInteger(A) && A >= b.v && I(b, A + 1);
          }
          ya(i);
        }
        return !0;
      },
      ownKeys(s) {
        h(i);
        var l = Reflect.ownKeys(s).filter((p) => {
          var u = e.get(p);
          return u === void 0 || u.v !== Zt;
        });
        for (var [c, d] of e)
          d.v !== Zt && !(c in s) && l.push(c);
        return l;
      },
      setPrototypeOf() {
        Sf();
      }
    }
  );
}
function rc(n) {
  try {
    if (n !== null && typeof n == "object" && Vr in n)
      return n[Vr];
  } catch {
  }
  return n;
}
function cu(n, t) {
  return Object.is(rc(n), rc(t));
}
var nc, hd, gd, vd;
function du() {
  if (nc === void 0) {
    nc = window, hd = /Firefox/.test(navigator.userAgent);
    var n = Element.prototype, t = Node.prototype, e = Text.prototype;
    gd = gn(t, "firstChild").get, vd = gn(t, "nextSibling").get, Wl(n) && (n.__click = void 0, n.__className = void 0, n.__attributes = null, n.__style = void 0, n.__e = void 0), Wl(e) && (e.__t = void 0);
  }
}
function qr(n = "") {
  return document.createTextNode(n);
}
// @__NO_SIDE_EFFECTS__
function Li(n) {
  return (
    /** @type {TemplateNode | null} */
    gd.call(n)
  );
}
// @__NO_SIDE_EFFECTS__
function Da(n) {
  return (
    /** @type {TemplateNode | null} */
    vd.call(n)
  );
}
function w(n, t) {
  return /* @__PURE__ */ Li(n);
}
function nt(n, t = !1) {
  {
    var e = /* @__PURE__ */ Li(n);
    return e instanceof Comment && e.data === "" ? /* @__PURE__ */ Da(e) : e;
  }
}
function S(n, t = 1, e = !1) {
  let r = n;
  for (; t--; )
    r = /** @type {TemplateNode} */
    /* @__PURE__ */ Da(r);
  return r;
}
function pu(n) {
  n.textContent = "";
}
function md() {
  return !1;
}
function xd(n, t, e) {
  return (
    /** @type {T extends keyof HTMLElementTagNameMap ? HTMLElementTagNameMap[T] : Element} */
    document.createElementNS(t ?? Wc, n, void 0)
  );
}
function fu(n, t) {
  if (t) {
    const e = document.body;
    n.autofocus = !0, Qr(() => {
      document.activeElement === e && n.focus();
    });
  }
}
let ic = !1;
function uu() {
  ic || (ic = !0, document.addEventListener(
    "reset",
    (n) => {
      Promise.resolve().then(() => {
        var t;
        if (!n.defaultPrevented)
          for (
            const e of
            /**@type {HTMLFormElement} */
            n.target.elements
          )
            (t = e.__on_r) == null || t.call(e);
      });
    },
    // In the capture phase to guarantee we get noticed of it (no possibility of stopPropagation)
    { capture: !0 }
  ));
}
function qo(n) {
  var t = J, e = W;
  or(null), Ie(null);
  try {
    return n();
  } finally {
    or(t), Ie(e);
  }
}
function bd(n, t, e, r = e) {
  n.addEventListener(t, () => qo(e));
  const i = n.__on_r;
  i ? n.__on_r = () => {
    i(), r(!0);
  } : n.__on_r = () => r(!0), uu();
}
function yd(n) {
  W === null && (J === null && yf(), bf()), wn && xf();
}
function hu(n, t) {
  var e = t.last;
  e === null ? t.last = t.first = n : (e.next = n, n.prev = e, t.last = n);
}
function br(n, t) {
  var e = W;
  e !== null && e.f & Xe && (n |= Xe);
  var r = {
    ctx: zt,
    deps: null,
    nodes: null,
    f: n | le | rr,
    first: null,
    fn: t,
    last: null,
    next: null,
    parent: e,
    b: e && e.b,
    prev: null,
    teardown: null,
    wv: 0,
    ac: null
  }, i = r;
  if (n & qi)
    xi !== null ? xi.push(r) : ei.ensure().schedule(r);
  else if (t !== null) {
    try {
      ri(r);
    } catch (o) {
      throw te(r), o;
    }
    i.deps === null && i.teardown === null && i.nodes === null && i.first === i.last && // either `null`, or a singular child
    !(i.f & _i) && (i = i.first, n & zn && n & $n && i !== null && (i.f |= $n));
  }
  if (i !== null && (i.parent = e, e !== null && hu(i, e), J !== null && J.f & Kt && !(n & Jn))) {
    var a = (
      /** @type {Derived} */
      J
    );
    (a.effects ?? (a.effects = [])).push(i);
  }
  return r;
}
function Sl() {
  return J !== null && !mr;
}
function No(n) {
  const t = br(Na, null);
  return Rt(t, jt), t.teardown = n, t;
}
function _s(n) {
  yd();
  var t = (
    /** @type {Effect} */
    W.f
  ), e = !J && (t & xr) !== 0 && (t & ni) === 0;
  if (e) {
    var r = (
      /** @type {ComponentContext} */
      zt
    );
    (r.e ?? (r.e = [])).push(n);
  } else
    return wd(n);
}
function wd(n) {
  return br(qi | _c, n);
}
function gu(n) {
  return yd(), br(Na | _c, n);
}
function vu(n) {
  ei.ensure();
  const t = br(Jn | _i, n);
  return (e = {}) => new Promise((r) => {
    e.outro ? _n(t, () => {
      te(t), r(void 0);
    }) : (te(t), r(void 0));
  });
}
function Yo(n) {
  return br(qi, n);
}
function ms(n, t) {
  var e = (
    /** @type {ComponentContextLegacy} */
    zt
  ), r = { effect: null, ran: !1, deps: n };
  e.l.$.push(r), r.effect = Fa(() => {
    if (n(), !r.ran) {
      r.ran = !0;
      var i = (
        /** @type {Effect} */
        W
      );
      try {
        Ie(i.parent), C(t);
      } finally {
        Ie(i);
      }
    }
  });
}
function mu() {
  var n = (
    /** @type {ComponentContextLegacy} */
    zt
  );
  Fa(() => {
    for (var t of n.l.$) {
      t.deps();
      var e = t.effect;
      e.f & jt && e.deps !== null && Rt(e, ar), Ki(e) && ri(e), t.ran = !1;
    }
  });
}
function xu(n) {
  return br(ml | _i, n);
}
function Fa(n, t = 0) {
  return br(Na | t, n);
}
function st(n, t = [], e = [], r = []) {
  ld(r, t, e, (i) => {
    br(Na, () => n(...i.map(h)));
  });
}
function Lo(n, t = 0) {
  var e = br(zn | t, n);
  return e;
}
function kd(n, t = 0) {
  var e = br(vl | t, n);
  return e;
}
function Ee(n) {
  return br(xr | _i, n);
}
function Ad(n) {
  var t = n.teardown;
  if (t !== null) {
    const e = wn, r = J;
    ac(!0), or(null);
    try {
      t.call(null);
    } finally {
      ac(e), or(r);
    }
  }
}
function zl(n, t = !1) {
  var e = n.first;
  for (n.first = n.last = null; e !== null; ) {
    const i = e.ac;
    i !== null && qo(() => {
      i.abort(_r);
    });
    var r = e.next;
    e.f & Jn ? e.parent = null : te(e, t), e = r;
  }
}
function bu(n) {
  for (var t = n.first; t !== null; ) {
    var e = t.next;
    t.f & xr || te(t), t = e;
  }
}
function te(n, t = !0) {
  var e = !1;
  (t || n.f & uf) && n.nodes !== null && n.nodes.end !== null && (yu(
    n.nodes.start,
    /** @type {TemplateNode} */
    n.nodes.end
  ), e = !0), Rt(n, Ns), zl(n, t && !e), za(n, 0);
  var r = n.nodes && n.nodes.t;
  if (r !== null)
    for (const a of r)
      a.stop();
  Ad(n), n.f ^= Ns, n.f |= nr;
  var i = n.parent;
  i !== null && i.first !== null && Sd(n), n.next = n.prev = n.teardown = n.ctx = n.deps = n.fn = n.nodes = n.ac = null;
}
function yu(n, t) {
  for (; n !== null; ) {
    var e = n === t ? null : /* @__PURE__ */ Da(n);
    n.remove(), n = e;
  }
}
function Sd(n) {
  var t = n.parent, e = n.prev, r = n.next;
  e !== null && (e.next = r), r !== null && (r.prev = e), t !== null && (t.first === n && (t.first = r), t.last === n && (t.last = e));
}
function _n(n, t, e = !0) {
  var r = [];
  zd(n, r, !0);
  var i = () => {
    e && te(n), t && t();
  }, a = r.length;
  if (a > 0) {
    var o = () => --a || i();
    for (var s of r)
      s.out(o);
  } else
    i();
}
function zd(n, t, e) {
  if (!(n.f & Xe)) {
    n.f ^= Xe;
    var r = n.nodes && n.nodes.t;
    if (r !== null)
      for (const s of r)
        (s.is_global || e) && t.push(s);
    for (var i = n.first; i !== null; ) {
      var a = i.next, o = (i.f & $n) !== 0 || // If this is a branch effect without a block effect parent,
      // it means the parent block effect was pruned. In that case,
      // transparency information was transferred to the branch effect.
      (i.f & xr) !== 0 && (n.f & zn) !== 0;
      zd(i, t, o ? e : !1), i = a;
    }
  }
}
function El(n) {
  Ed(n, !0);
}
function Ed(n, t) {
  if (n.f & Xe) {
    n.f ^= Xe, n.f & jt || (Rt(n, le), ei.ensure().schedule(n));
    for (var e = n.first; e !== null; ) {
      var r = e.next, i = (e.f & $n) !== 0 || (e.f & xr) !== 0;
      Ed(e, i ? t : !1), e = r;
    }
    var a = n.nodes && n.nodes.t;
    if (a !== null)
      for (const o of a)
        (o.is_global || t) && o.in();
  }
}
function Tl(n, t) {
  if (n.nodes)
    for (var e = n.nodes.start, r = n.nodes.end; e !== null; ) {
      var i = e === r ? null : /* @__PURE__ */ Da(e);
      t.append(e), e = i;
    }
}
let vo = !1, wn = !1;
function ac(n) {
  wn = n;
}
let J = null, mr = !1;
function or(n) {
  J = n;
}
let W = null;
function Ie(n) {
  W = n;
}
let ir = null;
function Td(n) {
  J !== null && (ir === null ? ir = [n] : ir.push(n));
}
let ze = null, Ye = 0, Qe = null;
function wu(n) {
  Qe = n;
}
let Md = 1, Fn = 0, Zn = Fn;
function oc(n) {
  Zn = n;
}
function Od() {
  return ++Md;
}
function Ki(n) {
  var t = n.f;
  if (t & le)
    return !0;
  if (t & Kt && (n.f &= ~ti), t & ar) {
    for (var e = (
      /** @type {Value[]} */
      n.deps
    ), r = e.length, i = 0; i < r; i++) {
      var a = e[i];
      if (Ki(
        /** @type {Derived} */
        a
      ) && dd(
        /** @type {Derived} */
        a
      ), a.wv > n.wv)
        return !0;
    }
    t & rr && // During time traveling we don't want to reset the status so that
    // traversal of the graph in the other batches still happens
    $t === null && Rt(n, jt);
  }
  return !1;
}
function Pd(n, t, e = !0) {
  var r = n.reactions;
  if (r !== null && !(ir !== null && Vi.call(ir, n)))
    for (var i = 0; i < r.length; i++) {
      var a = r[i];
      a.f & Kt ? Pd(
        /** @type {Derived} */
        a,
        t,
        !1
      ) : t === a && (e ? Rt(a, le) : a.f & jt && Rt(a, ar), wl(
        /** @type {Effect} */
        a
      ));
    }
}
function Id(n) {
  var f;
  var t = ze, e = Ye, r = Qe, i = J, a = ir, o = zt, s = mr, l = Zn, c = n.f;
  ze = /** @type {null | Value[]} */
  null, Ye = 0, Qe = null, J = c & (xr | Jn) ? null : n, ir = null, Ni(n.ctx), mr = !1, Zn = ++Fn, n.ac !== null && (qo(() => {
    n.ac.abort(_r);
  }), n.ac = null);
  try {
    n.f |= Ys;
    var d = (
      /** @type {Function} */
      n.fn
    ), p = d();
    n.f |= ni;
    var u = n.deps, m = X == null ? void 0 : X.is_fork;
    if (ze !== null) {
      var g;
      if (m || za(n, Ye), u !== null && Ye > 0)
        for (u.length = Ye + ze.length, g = 0; g < ze.length; g++)
          u[Ye + g] = ze[g];
      else
        n.deps = u = ze;
      if (Sl() && n.f & rr)
        for (g = Ye; g < u.length; g++)
          ((f = u[g]).reactions ?? (f.reactions = [])).push(n);
    } else !m && u !== null && Ye < u.length && (za(n, Ye), u.length = Ye);
    if (Ya() && Qe !== null && !mr && u !== null && !(n.f & (Kt | ar | le)))
      for (g = 0; g < /** @type {Source[]} */
      Qe.length; g++)
        Pd(
          Qe[g],
          /** @type {Effect} */
          n
        );
    if (i !== null && i !== n) {
      if (Fn++, i.deps !== null)
        for (let v = 0; v < e; v += 1)
          i.deps[v].rv = Fn;
      if (t !== null)
        for (const v of t)
          v.rv = Fn;
      Qe !== null && (r === null ? r = Qe : r.push(.../** @type {Source[]} */
      Qe));
    }
    return n.f & vn && (n.f ^= vn), p;
  } catch (v) {
    return ed(v);
  } finally {
    n.f ^= Ys, ze = t, Ye = e, Qe = r, J = i, ir = a, Ni(o), mr = s, Zn = l;
  }
}
function ku(n, t) {
  let e = t.reactions;
  if (e !== null) {
    var r = of.call(e, n);
    if (r !== -1) {
      var i = e.length - 1;
      i === 0 ? e = t.reactions = null : (e[r] = e[i], e.pop());
    }
  }
  if (e === null && t.f & Kt && // Destroying a child effect while updating a parent effect can cause a dependency to appear
  // to be unused, when in fact it is used by the currently-updating parent. Checking `new_deps`
  // allows us to skip the expensive work of disconnecting and immediately reconnecting it
  (ze === null || !Vi.call(ze, t))) {
    var a = (
      /** @type {Derived} */
      t
    );
    a.f & rr && (a.f ^= rr, a.f &= ~ti), yl(a), su(a), za(a, 0);
  }
}
function za(n, t) {
  var e = n.deps;
  if (e !== null)
    for (var r = t; r < e.length; r++)
      ku(n, e[r]);
}
function ri(n) {
  var t = n.f;
  if (!(t & nr)) {
    Rt(n, jt);
    var e = W, r = vo;
    W = n, vo = !0;
    try {
      t & (zn | vl) ? bu(n) : zl(n), Ad(n);
      var i = Id(n);
      n.teardown = typeof i == "function" ? i : null, n.wv = Md;
      var a;
    } finally {
      vo = r, W = e;
    }
  }
}
async function ga() {
  await Promise.resolve(), Zf();
}
function h(n) {
  var t = n.f, e = (t & Kt) !== 0;
  if (J !== null && !mr) {
    var r = W !== null && (W.f & nr) !== 0;
    if (!r && (ir === null || !Vi.call(ir, n))) {
      var i = J.deps;
      if (J.f & Ys)
        n.rv < Fn && (n.rv = Fn, ze === null && i !== null && i[Ye] === n ? Ye++ : ze === null ? ze = [n] : ze.push(n));
      else {
        (J.deps ?? (J.deps = [])).push(n);
        var a = n.reactions;
        a === null ? n.reactions = [J] : Vi.call(a, J) || a.push(J);
      }
    }
  }
  if (wn && mn.has(n))
    return mn.get(n);
  if (e) {
    var o = (
      /** @type {Derived} */
      n
    );
    if (wn) {
      var s = o.v;
      return (!(o.f & jt) && o.reactions !== null || Rd(o)) && (s = Al(o)), mn.set(o, s), s;
    }
    var l = (o.f & rr) === 0 && !mr && J !== null && (vo || (J.f & rr) !== 0), c = (o.f & ni) === 0;
    Ki(o) && (l && (o.f |= rr), dd(o)), l && !c && (pd(o), Cd(o));
  }
  if ($t != null && $t.has(n))
    return $t.get(n);
  if (n.f & vn)
    throw n.v;
  return n.v;
}
function Cd(n) {
  if (n.f |= rr, n.deps !== null)
    for (const t of n.deps)
      (t.reactions ?? (t.reactions = [])).push(n), t.f & Kt && !(t.f & rr) && (pd(
        /** @type {Derived} */
        t
      ), Cd(
        /** @type {Derived} */
        t
      ));
}
function Rd(n) {
  if (n.v === Zt) return !0;
  if (n.deps === null) return !1;
  for (const t of n.deps)
    if (mn.has(t) || t.f & Kt && Rd(
      /** @type {Derived} */
      t
    ))
      return !0;
  return !1;
}
function C(n) {
  var t = mr;
  try {
    return mr = !0, n();
  } finally {
    mr = t;
  }
}
function vr(n) {
  if (!(typeof n != "object" || !n || n instanceof EventTarget)) {
    if (Vr in n)
      Zs(n);
    else if (!Array.isArray(n))
      for (let t in n) {
        const e = n[t];
        typeof e == "object" && e && Vr in e && Zs(e);
      }
  }
}
function Zs(n, t = /* @__PURE__ */ new Set()) {
  if (typeof n == "object" && n !== null && // We don't want to traverse DOM elements
  !(n instanceof EventTarget) && !t.has(n)) {
    t.add(n), n instanceof Date && n.getTime();
    for (let r in n)
      try {
        Zs(n[r], t);
      } catch {
      }
    const e = gl(n);
    if (e !== Object.prototype && e !== Array.prototype && e !== Map.prototype && e !== Set.prototype && e !== Date.prototype) {
      const r = Gc(e);
      for (let i in r) {
        const a = r[i].get;
        if (a)
          try {
            a.call(n);
          } catch {
          }
      }
    }
  }
}
function Au(n) {
  return n.endsWith("capture") && n !== "gotpointercapture" && n !== "lostpointercapture";
}
const Su = [
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
function zu(n) {
  return Su.includes(n);
}
const Eu = {
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
function Tu(n) {
  return n = n.toLowerCase(), Eu[n] ?? n;
}
const Mu = ["touchstart", "touchmove"];
function Ou(n) {
  return Mu.includes(n);
}
const Bn = Symbol("events"), Vd = /* @__PURE__ */ new Set(), Ks = /* @__PURE__ */ new Set();
function qd(n, t, e, r = {}) {
  function i(a) {
    if (r.capture || Hs.call(t, a), !a.cancelBubble)
      return qo(() => e == null ? void 0 : e.call(this, a));
  }
  return n.startsWith("pointer") || n.startsWith("touch") || n === "wheel" ? Qr(() => {
    t.addEventListener(n, i, r);
  }) : t.addEventListener(n, i, r), i;
}
function H(n, t, e, r, i) {
  var a = { capture: r, passive: i }, o = qd(n, t, e, a);
  (t === document.body || // @ts-ignore
  t === window || // @ts-ignore
  t === document || // Firefox has quirky behavior, it can happen that we still get "canplay" events when the element is already removed
  t instanceof HTMLMediaElement) && No(() => {
    t.removeEventListener(n, o, a);
  });
}
function Pu(n, t, e) {
  (t[Bn] ?? (t[Bn] = {}))[n] = e;
}
function Iu(n) {
  for (var t = 0; t < n.length; t++)
    Vd.add(n[t]);
  for (var e of Ks)
    e(n);
}
let sc = null;
function Hs(n) {
  var v, b;
  var t = this, e = (
    /** @type {Node} */
    t.ownerDocument
  ), r = n.type, i = ((v = n.composedPath) == null ? void 0 : v.call(n)) || [], a = (
    /** @type {null | Element} */
    i[0] || n.target
  );
  sc = n;
  var o = 0, s = sc === n && n[Bn];
  if (s) {
    var l = i.indexOf(s);
    if (l !== -1 && (t === document || t === /** @type {any} */
    window)) {
      n[Bn] = t;
      return;
    }
    var c = i.indexOf(t);
    if (c === -1)
      return;
    l <= c && (o = l);
  }
  if (a = /** @type {Element} */
  i[o] || n.target, a !== t) {
    sf(n, "currentTarget", {
      configurable: !0,
      get() {
        return a || e;
      }
    });
    var d = J, p = W;
    or(null), Ie(null);
    try {
      for (var u, m = []; a !== null; ) {
        var g = a.assignedSlot || a.parentNode || /** @type {any} */
        a.host || null;
        try {
          var f = (b = a[Bn]) == null ? void 0 : b[r];
          f != null && (!/** @type {any} */
          a.disabled || // DOM could've been updated already by the time this is reached, so we check this as well
          // -> the target could not have been disabled because it emits the event in the first place
          n.target === a) && f.call(a, n);
        } catch (A) {
          u ? m.push(A) : u = A;
        }
        if (n.cancelBubble || g === t || g === null)
          break;
        a = g;
      }
      if (u) {
        for (let A of m)
          queueMicrotask(() => {
            throw A;
          });
        throw u;
      }
    } finally {
      n[Bn] = t, delete n.currentTarget, or(d), Ie(p);
    }
  }
}
var Uc;
const xs = (
  // We gotta write it like this because after downleveling the pure comment may end up in the wrong location
  ((Uc = globalThis == null ? void 0 : globalThis.window) == null ? void 0 : Uc.trustedTypes) && /* @__PURE__ */ globalThis.window.trustedTypes.createPolicy("svelte-trusted-html", {
    /** @param {string} html */
    createHTML: (n) => n
  })
);
function Cu(n) {
  return (
    /** @type {string} */
    (xs == null ? void 0 : xs.createHTML(n)) ?? n
  );
}
function Nd(n) {
  var t = xd("template");
  return t.innerHTML = Cu(n.replaceAll("<!>", "<!---->")), t.content;
}
function Di(n, t) {
  var e = (
    /** @type {Effect} */
    W
  );
  e.nodes === null && (e.nodes = { start: n, end: t, a: null, t: null });
}
// @__NO_SIDE_EFFECTS__
function j(n, t) {
  var e = (t & qf) !== 0, r = (t & Nf) !== 0, i, a = !n.startsWith("<!>");
  return () => {
    i === void 0 && (i = Nd(a ? n : "<!>" + n), e || (i = /** @type {TemplateNode} */
    /* @__PURE__ */ Li(i)));
    var o = (
      /** @type {TemplateNode} */
      r || hd ? document.importNode(i, !0) : i.cloneNode(!0)
    );
    if (e) {
      var s = (
        /** @type {TemplateNode} */
        /* @__PURE__ */ Li(o)
      ), l = (
        /** @type {TemplateNode} */
        o.lastChild
      );
      Di(s, l);
    } else
      Di(o, o);
    return o;
  };
}
// @__NO_SIDE_EFFECTS__
function Ru(n, t, e = "svg") {
  var r = !n.startsWith("<!>"), i = `<${e}>${r ? n : "<!>" + n}</${e}>`, a;
  return () => {
    if (!a) {
      var o = (
        /** @type {DocumentFragment} */
        Nd(i)
      ), s = (
        /** @type {Element} */
        /* @__PURE__ */ Li(o)
      );
      a = /** @type {Element} */
      /* @__PURE__ */ Li(s);
    }
    var l = (
      /** @type {TemplateNode} */
      a.cloneNode(!0)
    );
    return Di(l, l), l;
  };
}
// @__NO_SIDE_EFFECTS__
function Vu(n, t) {
  return /* @__PURE__ */ Ru(n, t, "svg");
}
function lo(n = "") {
  {
    var t = qr(n + "");
    return Di(t, t), t;
  }
}
function kt() {
  var n = document.createDocumentFragment(), t = document.createComment(""), e = qr();
  return n.append(t, e), Di(t, e), n;
}
function R(n, t) {
  n !== null && n.before(
    /** @type {Node} */
    t
  );
}
function B(n, t) {
  var e = t == null ? "" : typeof t == "object" ? `${t}` : t;
  e !== (n.__t ?? (n.__t = n.nodeValue)) && (n.__t = e, n.nodeValue = `${e}`);
}
function qu(n, t) {
  return Nu(n, t);
}
const co = /* @__PURE__ */ new Map();
function Nu(n, { target: t, anchor: e, props: r = {}, events: i, context: a, intro: o = !0, transformError: s }) {
  du();
  var l = void 0, c = vu(() => {
    var d = e ?? t.appendChild(qr());
    Wf(
      /** @type {TemplateNode} */
      d,
      {
        pending: () => {
        }
      },
      (m) => {
        xl({});
        var g = (
          /** @type {ComponentContext} */
          zt
        );
        a && (g.c = a), i && (r.$$events = i), l = n(m, r) || {}, bl();
      },
      s
    );
    var p = /* @__PURE__ */ new Set(), u = (m) => {
      for (var g = 0; g < m.length; g++) {
        var f = m[g];
        if (!p.has(f)) {
          p.add(f);
          var v = Ou(f);
          for (const x of [t, document]) {
            var b = co.get(x);
            b === void 0 && (b = /* @__PURE__ */ new Map(), co.set(x, b));
            var A = b.get(f);
            A === void 0 ? (x.addEventListener(f, Hs, { passive: v }), b.set(f, 1)) : b.set(f, A + 1);
          }
        }
      }
    };
    return u(Vo(Vd)), Ks.add(u), () => {
      var v;
      for (var m of p)
        for (const b of [t, document]) {
          var g = (
            /** @type {Map<string, number>} */
            co.get(b)
          ), f = (
            /** @type {number} */
            g.get(m)
          );
          --f == 0 ? (b.removeEventListener(m, Hs), g.delete(m), g.size === 0 && co.delete(b)) : g.set(m, f);
        }
      Ks.delete(u), d !== e && ((v = d.parentNode) == null || v.removeChild(d));
    };
  });
  return Yu.set(l, c), l;
}
let Yu = /* @__PURE__ */ new WeakMap();
var gr, Pr, Fe, Xn, Va, qa, Ro;
class Yd {
  /**
   * @param {TemplateNode} anchor
   * @param {boolean} transition
   */
  constructor(t, e = !0) {
    /** @type {TemplateNode} */
    pr(this, "anchor");
    /** @type {Map<Batch, Key>} */
    rt(this, gr, /* @__PURE__ */ new Map());
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
    rt(this, Pr, /* @__PURE__ */ new Map());
    /**
     * Similar to #onscreen with respect to the keys, but contains branches that are not yet
     * in the DOM, because their insertion is deferred.
     * @type {Map<Key, Branch>}
     */
    rt(this, Fe, /* @__PURE__ */ new Map());
    /**
     * Keys of effects that are currently outroing
     * @type {Set<Key>}
     */
    rt(this, Xn, /* @__PURE__ */ new Set());
    /**
     * Whether to pause (i.e. outro) on change, or destroy immediately.
     * This is necessary for `<svelte:element>`
     */
    rt(this, Va, !0);
    /**
     * @param {Batch} batch
     */
    rt(this, qa, (t) => {
      if (E(this, gr).has(t)) {
        var e = (
          /** @type {Key} */
          E(this, gr).get(t)
        ), r = E(this, Pr).get(e);
        if (r)
          El(r), E(this, Xn).delete(e);
        else {
          var i = E(this, Fe).get(e);
          i && (E(this, Pr).set(e, i.effect), E(this, Fe).delete(e), i.fragment.lastChild.remove(), this.anchor.before(i.fragment), r = i.effect);
        }
        for (const [a, o] of E(this, gr)) {
          if (E(this, gr).delete(a), a === t)
            break;
          const s = E(this, Fe).get(o);
          s && (te(s.effect), E(this, Fe).delete(o));
        }
        for (const [a, o] of E(this, Pr)) {
          if (a === e || E(this, Xn).has(a)) continue;
          const s = () => {
            if (Array.from(E(this, gr).values()).includes(a)) {
              var c = document.createDocumentFragment();
              Tl(o, c), c.append(qr()), E(this, Fe).set(a, { effect: o, fragment: c });
            } else
              te(o);
            E(this, Xn).delete(a), E(this, Pr).delete(a);
          };
          E(this, Va) || !r ? (E(this, Xn).add(a), _n(o, s, !1)) : s();
        }
      }
    });
    /**
     * @param {Batch} batch
     */
    rt(this, Ro, (t) => {
      E(this, gr).delete(t);
      const e = Array.from(E(this, gr).values());
      for (const [r, i] of E(this, Fe))
        e.includes(r) || (te(i.effect), E(this, Fe).delete(r));
    });
    this.anchor = t, Q(this, Va, e);
  }
  /**
   *
   * @param {any} key
   * @param {null | ((target: TemplateNode) => void)} fn
   */
  ensure(t, e) {
    var r = (
      /** @type {Batch} */
      X
    ), i = md();
    if (e && !E(this, Pr).has(t) && !E(this, Fe).has(t))
      if (i) {
        var a = document.createDocumentFragment(), o = qr();
        a.append(o), E(this, Fe).set(t, {
          effect: Ee(() => e(o)),
          fragment: a
        });
      } else
        E(this, Pr).set(
          t,
          Ee(() => e(this.anchor))
        );
    if (E(this, gr).set(r, t), i) {
      for (const [s, l] of E(this, Pr))
        s === t ? r.unskip_effect(l) : r.skip_effect(l);
      for (const [s, l] of E(this, Fe))
        s === t ? r.unskip_effect(l.effect) : r.skip_effect(l.effect);
      r.oncommit(E(this, qa)), r.ondiscard(E(this, Ro));
    } else
      E(this, qa).call(this, r);
  }
}
gr = new WeakMap(), Pr = new WeakMap(), Fe = new WeakMap(), Xn = new WeakMap(), Va = new WeakMap(), qa = new WeakMap(), Ro = new WeakMap();
function gt(n, t, e = !1) {
  var r = new Yd(n), i = e ? $n : 0;
  function a(o, s) {
    r.ensure(o, s);
  }
  Lo(() => {
    var o = !1;
    t((s, l = 0) => {
      o = !0, a(l, s);
    }), o || a(-1, null);
  }, i);
}
function ge(n, t) {
  return t;
}
function Lu(n, t, e) {
  for (var r = [], i = t.length, a, o = t.length, s = 0; s < i; s++) {
    let p = t[s];
    _n(
      p,
      () => {
        if (a) {
          if (a.pending.delete(p), a.done.add(p), a.pending.size === 0) {
            var u = (
              /** @type {Set<EachOutroGroup>} */
              n.outrogroups
            );
            Qs(n, Vo(a.done)), u.delete(a), u.size === 0 && (n.outrogroups = null);
          }
        } else
          o -= 1;
      },
      !1
    );
  }
  if (o === 0) {
    var l = r.length === 0 && e !== null;
    if (l) {
      var c = (
        /** @type {Element} */
        e
      ), d = (
        /** @type {Element} */
        c.parentNode
      );
      pu(d), d.append(c), n.items.clear();
    }
    Qs(n, t, !l);
  } else
    a = {
      pending: new Set(t),
      done: /* @__PURE__ */ new Set()
    }, (n.outrogroups ?? (n.outrogroups = /* @__PURE__ */ new Set())).add(a);
}
function Qs(n, t, e = !0) {
  var r;
  if (n.pending.size > 0) {
    r = /* @__PURE__ */ new Set();
    for (const o of n.pending.values())
      for (const s of o)
        r.add(
          /** @type {EachItem} */
          n.items.get(s).e
        );
  }
  for (var i = 0; i < t.length; i++) {
    var a = t[i];
    if (r != null && r.has(a)) {
      a.f |= Cr;
      const o = document.createDocumentFragment();
      Tl(a, o);
    } else
      te(t[i], e);
  }
}
var lc;
function ve(n, t, e, r, i, a = null) {
  var o = n, s = /* @__PURE__ */ new Map(), l = (t & Hc) !== 0;
  if (l) {
    var c = (
      /** @type {Element} */
      n
    );
    o = c.appendChild(qr());
  }
  var d = null, p = /* @__PURE__ */ kl(() => {
    var x = e();
    return hl(x) ? x : x == null ? [] : Vo(x);
  }), u, m = /* @__PURE__ */ new Map(), g = !0;
  function f(x) {
    A.effect.f & nr || (A.pending.delete(x), A.fallback = d, Du(A, u, o, t, r), d !== null && (u.length === 0 ? d.f & Cr ? (d.f ^= Cr, va(d, null, o)) : El(d) : _n(d, () => {
      d = null;
    })));
  }
  function v(x) {
    A.pending.delete(x);
  }
  var b = Lo(() => {
    u = /** @type {V[]} */
    h(p);
    for (var x = u.length, y = /* @__PURE__ */ new Set(), k = (
      /** @type {Batch} */
      X
    ), M = md(), T = 0; T < x; T += 1) {
      var O = u[T], z = r(O, T), N = g ? null : s.get(z);
      N ? (N.v && Yi(N.v, O), N.i && Yi(N.i, T), M && k.unskip_effect(N.e)) : (N = Fu(
        s,
        g ? o : lc ?? (lc = qr()),
        O,
        z,
        T,
        i,
        t,
        e
      ), g || (N.e.f |= Cr), s.set(z, N)), y.add(z);
    }
    if (x === 0 && a && !d && (g ? d = Ee(() => a(o)) : (d = Ee(() => a(lc ?? (lc = qr()))), d.f |= Cr)), x > y.size && mf(), !g)
      if (m.set(k, y), M) {
        for (const [F, L] of s)
          y.has(F) || k.skip_effect(L.e);
        k.oncommit(f), k.ondiscard(v);
      } else
        f(k);
    h(p);
  }), A = { effect: b, items: s, pending: m, outrogroups: null, fallback: d };
  g = !1;
}
function la(n) {
  for (; n !== null && !(n.f & xr); )
    n = n.next;
  return n;
}
function Du(n, t, e, r, i) {
  var N, F, L, K, ot, dt, lt, P, Y;
  var a = (r & Of) !== 0, o = t.length, s = n.items, l = la(n.effect.first), c, d = null, p, u = [], m = [], g, f, v, b;
  if (a)
    for (b = 0; b < o; b += 1)
      g = t[b], f = i(g, b), v = /** @type {EachItem} */
      s.get(f).e, v.f & Cr || ((F = (N = v.nodes) == null ? void 0 : N.a) == null || F.measure(), (p ?? (p = /* @__PURE__ */ new Set())).add(v));
  for (b = 0; b < o; b += 1) {
    if (g = t[b], f = i(g, b), v = /** @type {EachItem} */
    s.get(f).e, n.outrogroups !== null)
      for (const q of n.outrogroups)
        q.pending.delete(v), q.done.delete(v);
    if (v.f & Cr)
      if (v.f ^= Cr, v === l)
        va(v, null, e);
      else {
        var A = d ? d.next : l;
        v === n.effect.last && (n.effect.last = v.prev), v.prev && (v.prev.next = v.next), v.next && (v.next.prev = v.prev), sn(n, d, v), sn(n, v, A), va(v, A, e), d = v, u = [], m = [], l = la(d.next);
        continue;
      }
    if (v.f & Xe && (El(v), a && ((K = (L = v.nodes) == null ? void 0 : L.a) == null || K.unfix(), (p ?? (p = /* @__PURE__ */ new Set())).delete(v))), v !== l) {
      if (c !== void 0 && c.has(v)) {
        if (u.length < m.length) {
          var x = m[0], y;
          d = x.prev;
          var k = u[0], M = u[u.length - 1];
          for (y = 0; y < u.length; y += 1)
            va(u[y], x, e);
          for (y = 0; y < m.length; y += 1)
            c.delete(m[y]);
          sn(n, k.prev, M.next), sn(n, d, k), sn(n, M, x), l = x, d = M, b -= 1, u = [], m = [];
        } else
          c.delete(v), va(v, l, e), sn(n, v.prev, v.next), sn(n, v, d === null ? n.effect.first : d.next), sn(n, d, v), d = v;
        continue;
      }
      for (u = [], m = []; l !== null && l !== v; )
        (c ?? (c = /* @__PURE__ */ new Set())).add(l), m.push(l), l = la(l.next);
      if (l === null)
        continue;
    }
    v.f & Cr || u.push(v), d = v, l = la(v.next);
  }
  if (n.outrogroups !== null) {
    for (const q of n.outrogroups)
      q.pending.size === 0 && (Qs(n, Vo(q.done)), (ot = n.outrogroups) == null || ot.delete(q));
    n.outrogroups.size === 0 && (n.outrogroups = null);
  }
  if (l !== null || c !== void 0) {
    var T = [];
    if (c !== void 0)
      for (v of c)
        v.f & Xe || T.push(v);
    for (; l !== null; )
      !(l.f & Xe) && l !== n.fallback && T.push(l), l = la(l.next);
    var O = T.length;
    if (O > 0) {
      var z = r & Hc && o === 0 ? e : null;
      if (a) {
        for (b = 0; b < O; b += 1)
          (lt = (dt = T[b].nodes) == null ? void 0 : dt.a) == null || lt.measure();
        for (b = 0; b < O; b += 1)
          (Y = (P = T[b].nodes) == null ? void 0 : P.a) == null || Y.fix();
      }
      Lu(n, T, z);
    }
  }
  a && Qr(() => {
    var q, _;
    if (p !== void 0)
      for (v of p)
        (_ = (q = v.nodes) == null ? void 0 : q.a) == null || _.apply();
  });
}
function Fu(n, t, e, r, i, a, o, s) {
  var l = o & Tf ? o & Pf ? yn(e) : /* @__PURE__ */ At(e, !1, !1) : null, c = o & Mf ? yn(i) : null;
  return {
    v: l,
    i: c,
    e: Ee(() => (a(t, l ?? e, c ?? i, s), () => {
      n.delete(r);
    }))
  };
}
function va(n, t, e) {
  if (n.nodes)
    for (var r = n.nodes.start, i = n.nodes.end, a = t && !(t.f & Cr) ? (
      /** @type {EffectNodes} */
      t.nodes.start
    ) : e; r !== null; ) {
      var o = (
        /** @type {TemplateNode} */
        /* @__PURE__ */ Da(r)
      );
      if (a.before(r), r === i)
        return;
      r = o;
    }
}
function sn(n, t, e) {
  t === null ? n.effect.first = e : t.next = e, e === null ? n.effect.last = t : e.prev = t;
}
function Ut(n, t, e, r, i) {
  var s;
  var a = (s = t.$$slots) == null ? void 0 : s[e], o = !1;
  a === !0 && (a = t.children, o = !0), a === void 0 || a(n, o ? () => r : r);
}
function Bu(n, t, e, r, i, a) {
  var o = null, s = (
    /** @type {TemplateNode} */
    n
  ), l = new Yd(s, !1);
  Lo(() => {
    const c = t() || null;
    var d = Yf;
    if (c === null) {
      l.ensure(null, null);
      return;
    }
    return l.ensure(c, (p) => {
      if (c) {
        if (o = xd(c, d), Di(o, o), r) {
          var u = o.appendChild(qr());
          r(o, u);
        }
        W.nodes.end = o, p.before(o);
      }
    }), () => {
    };
  }, $n), No(() => {
  });
}
function Uu(n, t) {
  var e = void 0, r;
  kd(() => {
    e !== (e = t()) && (r && (te(r), r = null), e && (r = Ee(() => {
      Yo(() => (
        /** @type {(node: Element) => void} */
        e(n)
      ));
    })));
  });
}
function Ld(n) {
  var t, e, r = "";
  if (typeof n == "string" || typeof n == "number") r += n;
  else if (typeof n == "object") if (Array.isArray(n)) {
    var i = n.length;
    for (t = 0; t < i; t++) n[t] && (e = Ld(n[t])) && (r && (r += " "), r += e);
  } else for (e in n) n[e] && (r && (r += " "), r += e);
  return r;
}
function ju() {
  for (var n, t, e = 0, r = "", i = arguments.length; e < i; e++) (n = arguments[e]) && (t = Ld(n)) && (r && (r += " "), r += t);
  return r;
}
function Gu(n) {
  return typeof n == "object" ? ju(n) : n ?? "";
}
const cc = [...` 	
\r\f \v\uFEFF`];
function Xu(n, t, e) {
  var r = n == null ? "" : "" + n;
  if (t && (r = r ? r + " " + t : t), e) {
    for (var i of Object.keys(e))
      if (e[i])
        r = r ? r + " " + i : i;
      else if (r.length)
        for (var a = i.length, o = 0; (o = r.indexOf(i, o)) >= 0; ) {
          var s = o + a;
          (o === 0 || cc.includes(r[o - 1])) && (s === r.length || cc.includes(r[s])) ? r = (o === 0 ? "" : r.substring(0, o)) + r.substring(s + 1) : o = s;
        }
  }
  return r === "" ? null : r;
}
function dc(n, t = !1) {
  var e = t ? " !important;" : ";", r = "";
  for (var i of Object.keys(n)) {
    var a = n[i];
    a != null && a !== "" && (r += " " + i + ": " + a + e);
  }
  return r;
}
function bs(n) {
  return n[0] !== "-" || n[1] !== "-" ? n.toLowerCase() : n;
}
function _u(n, t) {
  if (t) {
    var e = "", r, i;
    if (Array.isArray(t) ? (r = t[0], i = t[1]) : r = t, n) {
      n = String(n).replaceAll(/\s*\/\*.*?\*\/\s*/g, "").trim();
      var a = !1, o = 0, s = !1, l = [];
      r && l.push(...Object.keys(r).map(bs)), i && l.push(...Object.keys(i).map(bs));
      var c = 0, d = -1;
      const f = n.length;
      for (var p = 0; p < f; p++) {
        var u = n[p];
        if (s ? u === "/" && n[p - 1] === "*" && (s = !1) : a ? a === u && (a = !1) : u === "/" && n[p + 1] === "*" ? s = !0 : u === '"' || u === "'" ? a = u : u === "(" ? o++ : u === ")" && o--, !s && a === !1 && o === 0) {
          if (u === ":" && d === -1)
            d = p;
          else if (u === ";" || p === f - 1) {
            if (d !== -1) {
              var m = bs(n.substring(c, d).trim());
              if (!l.includes(m)) {
                u !== ";" && p++;
                var g = n.substring(c, p).trim();
                e += " " + g + ";";
              }
            }
            c = p + 1, d = -1;
          }
        }
      }
    }
    return r && (e += dc(r)), i && (e += dc(i, !0)), e = e.trim(), e === "" ? null : e;
  }
  return n == null ? null : String(n);
}
function Ae(n, t, e, r, i, a) {
  var o = n.__className;
  if (o !== e || o === void 0) {
    var s = Xu(e, r, a);
    s == null ? n.removeAttribute("class") : t ? n.className = s : n.setAttribute("class", s), n.__className = e;
  } else if (a && i !== a)
    for (var l in a) {
      var c = !!a[l];
      (i == null || c !== !!i[l]) && n.classList.toggle(l, c);
    }
  return a;
}
function ys(n, t = {}, e, r) {
  for (var i in e) {
    var a = e[i];
    t[i] !== a && (e[i] == null ? n.style.removeProperty(i) : n.style.setProperty(i, a, r));
  }
}
function Zu(n, t, e, r) {
  var i = n.__style;
  if (i !== t) {
    var a = _u(t, r);
    a == null ? n.removeAttribute("style") : n.style.cssText = a, n.__style = t;
  } else r && (Array.isArray(r) ? (ys(n, e == null ? void 0 : e[0], r[0]), ys(n, e == null ? void 0 : e[1], r[1], "important")) : ys(n, e, r));
  return r;
}
function Ao(n, t, e = !1) {
  if (n.multiple) {
    if (t == null)
      return;
    if (!hl(t))
      return Df();
    for (var r of n.options)
      r.selected = t.includes(wa(r));
    return;
  }
  for (r of n.options) {
    var i = wa(r);
    if (cu(i, t)) {
      r.selected = !0;
      return;
    }
  }
  (!e || t !== void 0) && (n.selectedIndex = -1);
}
function Dd(n) {
  var t = new MutationObserver(() => {
    Ao(n, n.__value);
  });
  t.observe(n, {
    // Listen to option element changes
    childList: !0,
    subtree: !0,
    // because of <optgroup>
    // Listen to option element value attribute changes
    // (doesn't get notified of select value changes,
    // because that property is not reflected as an attribute)
    attributes: !0,
    attributeFilter: ["value"]
  }), No(() => {
    t.disconnect();
  });
}
function pc(n, t, e = t) {
  var r = /* @__PURE__ */ new WeakSet(), i = !0;
  bd(n, "change", (a) => {
    var o = a ? "[selected]" : ":checked", s;
    if (n.multiple)
      s = [].map.call(n.querySelectorAll(o), wa);
    else {
      var l = n.querySelector(o) ?? // will fall back to first non-disabled option if no option is selected
      n.querySelector("option:not([disabled])");
      s = l && wa(l);
    }
    e(s), X !== null && r.add(X);
  }), Yo(() => {
    var a = t();
    if (n === document.activeElement) {
      var o = (
        /** @type {Batch} */
        X
      );
      if (r.has(o))
        return;
    }
    if (Ao(n, a, i), i && a === void 0) {
      var s = n.querySelector(":checked");
      s !== null && (a = wa(s), e(a));
    }
    n.__value = a, i = !1;
  }), Dd(n);
}
function wa(n) {
  return "__value" in n ? n.__value : n.value;
}
const ca = Symbol("class"), da = Symbol("style"), Fd = Symbol("is custom element"), Bd = Symbol("is html"), Ku = Kc ? "option" : "OPTION", Hu = Kc ? "select" : "SELECT";
function Qu(n, t) {
  t ? n.hasAttribute("selected") || n.setAttribute("selected", "") : n.removeAttribute("selected");
}
function Le(n, t, e, r) {
  var i = Ud(n);
  i[t] !== (i[t] = e) && (t === "loading" && (n[hf] = e), e == null ? n.removeAttribute(t) : typeof e != "string" && jd(n).includes(t) ? n[t] = e : n.setAttribute(t, e));
}
function Wu(n, t, e, r, i = !1, a = !1) {
  var o = Ud(n), s = o[Fd], l = !o[Bd], c = t || {}, d = n.nodeName === Ku;
  for (var p in t)
    p in e || (e[p] = null);
  e.class ? e.class = Gu(e.class) : e[ca] && (e.class = null), e[da] && (e.style ?? (e.style = null));
  var u = jd(n);
  for (const y in e) {
    let k = e[y];
    if (d && y === "value" && k == null) {
      n.value = n.__value = "", c[y] = k;
      continue;
    }
    if (y === "class") {
      var m = n.namespaceURI === "http://www.w3.org/1999/xhtml";
      Ae(n, m, k, r, t == null ? void 0 : t[ca], e[ca]), c[y] = k, c[ca] = e[ca];
      continue;
    }
    if (y === "style") {
      Zu(n, k, t == null ? void 0 : t[da], e[da]), c[y] = k, c[da] = e[da];
      continue;
    }
    var g = c[y];
    if (!(k === g && !(k === void 0 && n.hasAttribute(y)))) {
      c[y] = k;
      var f = y[0] + y[1];
      if (f !== "$$")
        if (f === "on") {
          const M = {}, T = "$$" + y;
          let O = y.slice(2);
          var v = zu(O);
          if (Au(O) && (O = O.slice(0, -7), M.capture = !0), !v && g) {
            if (k != null) continue;
            n.removeEventListener(O, c[T], M), c[T] = null;
          }
          if (v)
            Pu(O, n, k), Iu([O]);
          else if (k != null) {
            let z = function(N) {
              c[y].call(this, N);
            };
            var x = z;
            c[T] = qd(O, n, z, M);
          }
        } else if (y === "style")
          Le(n, y, k);
        else if (y === "autofocus")
          fu(
            /** @type {HTMLElement} */
            n,
            !!k
          );
        else if (!s && (y === "__value" || y === "value" && k != null))
          n.value = n.__value = k;
        else if (y === "selected" && d)
          Qu(
            /** @type {HTMLOptionElement} */
            n,
            k
          );
        else {
          var b = y;
          l || (b = Tu(b));
          var A = b === "defaultValue" || b === "defaultChecked";
          if (k == null && !s && !A)
            if (o[y] = null, b === "value" || b === "checked") {
              let M = (
                /** @type {HTMLInputElement} */
                n
              );
              const T = t === void 0;
              if (b === "value") {
                let O = M.defaultValue;
                M.removeAttribute(b), M.defaultValue = O, M.value = M.__value = T ? O : null;
              } else {
                let O = M.defaultChecked;
                M.removeAttribute(b), M.defaultChecked = O, M.checked = T ? O : !1;
              }
            } else
              n.removeAttribute(y);
          else A || u.includes(b) && (s || typeof k != "string") ? (n[b] = k, b in o && (o[b] = Zt)) : typeof k != "function" && Le(n, b, k);
        }
    }
  }
  return c;
}
function fc(n, t, e = [], r = [], i = [], a, o = !1, s = !1) {
  ld(i, e, r, (l) => {
    var c = void 0, d = {}, p = n.nodeName === Hu, u = !1;
    if (kd(() => {
      var g = t(...l.map(h)), f = Wu(
        n,
        c,
        g,
        a,
        o,
        s
      );
      u && p && "value" in g && Ao(
        /** @type {HTMLSelectElement} */
        n,
        g.value
      );
      for (let b of Object.getOwnPropertySymbols(d))
        g[b] || te(d[b]);
      for (let b of Object.getOwnPropertySymbols(g)) {
        var v = g[b];
        b.description === Lf && (!c || v !== c[b]) && (d[b] && te(d[b]), d[b] = Ee(() => Uu(n, () => v))), f[b] = v;
      }
      c = f;
    }), p) {
      var m = (
        /** @type {HTMLSelectElement} */
        n
      );
      Yo(() => {
        Ao(
          m,
          /** @type {Record<string | symbol, any>} */
          c.value,
          !0
        ), Dd(m);
      });
    }
    u = !0;
  });
}
function Ud(n) {
  return (
    /** @type {Record<string | symbol, unknown>} **/
    // @ts-expect-error
    n.__attributes ?? (n.__attributes = {
      [Fd]: n.nodeName.includes("-"),
      [Bd]: n.namespaceURI === Wc
    })
  );
}
var uc = /* @__PURE__ */ new Map();
function jd(n) {
  var t = n.getAttribute("is") || n.nodeName, e = uc.get(t);
  if (e) return e;
  uc.set(t, e = []);
  for (var r, i = n, a = Element.prototype; a !== i; ) {
    r = Gc(i);
    for (var o in r)
      r[o].set && e.push(o);
    i = gl(i);
  }
  return e;
}
function Ju(n, t, e = t) {
  var r = /* @__PURE__ */ new WeakSet();
  bd(n, "input", async (i) => {
    var a = i ? n.defaultValue : n.value;
    if (a = ws(n) ? ks(a) : a, e(a), X !== null && r.add(X), await ga(), a !== (a = t())) {
      var o = n.selectionStart, s = n.selectionEnd, l = n.value.length;
      if (n.value = a ?? "", s !== null) {
        var c = n.value.length;
        o === s && s === l && c > l ? (n.selectionStart = c, n.selectionEnd = c) : (n.selectionStart = o, n.selectionEnd = Math.min(s, c));
      }
    }
  }), // If we are hydrating and the value has since changed,
  // then use the updated value from the input instead.
  // If defaultValue is set, then value == defaultValue
  // TODO Svelte 6: remove input.value check and set to empty string?
  C(t) == null && n.value && (e(ws(n) ? ks(n.value) : n.value), X !== null && r.add(X)), Fa(() => {
    var i = t();
    if (n === document.activeElement) {
      var a = (
        /** @type {Batch} */
        X
      );
      if (r.has(a))
        return;
    }
    ws(n) && i === ks(n.value) || n.type === "date" && !i && !n.value || i !== n.value && (n.value = i ?? "");
  });
}
function ws(n) {
  var t = n.type;
  return t === "number" || t === "range";
}
function ks(n) {
  return n === "" ? null : +n;
}
function hc(n, t) {
  return n === t || (n == null ? void 0 : n[Vr]) === t;
}
function $u(n = {}, t, e, r) {
  var i = (
    /** @type {ComponentContext} */
    zt.r
  ), a = (
    /** @type {Effect} */
    W
  );
  return Yo(() => {
    var o, s;
    return Fa(() => {
      o = s, s = [], C(() => {
        n !== e(...s) && (t(n, ...s), o && hc(e(...o), n) && t(null, ...o));
      });
    }), () => {
      let l = a;
      for (; l !== i && l.parent !== null && l.parent.f & Ns; )
        l = l.parent;
      const c = () => {
        s && hc(e(...s), n) && t(null, ...s);
      }, d = l.teardown;
      l.teardown = () => {
        c(), d == null || d();
      };
    };
  }), n;
}
function th(n) {
  return function(...t) {
    var e = (
      /** @type {Event} */
      t[0]
    );
    return e.preventDefault(), n == null ? void 0 : n.apply(this, t);
  };
}
function Gd(n = !1) {
  const t = (
    /** @type {ComponentContextLegacy} */
    zt
  ), e = t.l.u;
  if (!e) return;
  let r = () => vr(t.s);
  if (n) {
    let i = 0, a = (
      /** @type {Record<string, any>} */
      {}
    );
    const o = /* @__PURE__ */ La(() => {
      let s = !1;
      const l = t.s;
      for (const c in l)
        l[c] !== a[c] && (a[c] = l[c], s = !0);
      return s && i++, i;
    });
    r = () => h(o);
  }
  e.b.length && gu(() => {
    gc(t, r), Vs(e.b);
  }), _s(() => {
    const i = C(() => e.m.map(pf));
    return () => {
      for (const a of i)
        typeof a == "function" && a();
    };
  }), e.a.length && _s(() => {
    gc(t, r), Vs(e.a);
  });
}
function gc(n, t) {
  if (n.l.s)
    for (const e of n.l.s) h(e);
  t();
}
const eh = {
  get(n, t) {
    if (!n.exclude.includes(t))
      return h(n.version), t in n.special ? n.special[t]() : n.props[t];
  },
  set(n, t, e) {
    if (!(t in n.special)) {
      var r = W;
      try {
        Ie(n.parent_effect), n.special[t] = $e(
          {
            get [t]() {
              return n.props[t];
            }
          },
          /** @type {string} */
          t,
          Qc
        );
      } finally {
        Ie(r);
      }
    }
    return n.special[t](e), ec(n.version), !0;
  },
  getOwnPropertyDescriptor(n, t) {
    if (!n.exclude.includes(t) && t in n.props)
      return {
        enumerable: !0,
        configurable: !0,
        value: n.props[t]
      };
  },
  deleteProperty(n, t) {
    return n.exclude.includes(t) || (n.exclude.push(t), ec(n.version)), !0;
  },
  has(n, t) {
    return n.exclude.includes(t) ? !1 : t in n.props;
  },
  ownKeys(n) {
    return Reflect.ownKeys(n.props).filter((t) => !n.exclude.includes(t));
  }
};
function Lt(n, t) {
  return new Proxy(
    {
      props: n,
      exclude: t,
      special: {},
      version: yn(0),
      // TODO this is only necessary because we need to track component
      // destruction inside `prop`, because of `bind:this`, but it
      // seems likely that we can simplify `bind:this` instead
      parent_effect: (
        /** @type {Effect} */
        W
      )
    },
    eh
  );
}
const rh = {
  get(n, t) {
    let e = n.props.length;
    for (; e--; ) {
      let r = n.props[e];
      if (oa(r) && (r = r()), typeof r == "object" && r !== null && t in r) return r[t];
    }
  },
  set(n, t, e) {
    let r = n.props.length;
    for (; r--; ) {
      let i = n.props[r];
      oa(i) && (i = i());
      const a = gn(i, t);
      if (a && a.set)
        return a.set(e), !0;
    }
    return !1;
  },
  getOwnPropertyDescriptor(n, t) {
    let e = n.props.length;
    for (; e--; ) {
      let r = n.props[e];
      if (oa(r) && (r = r()), typeof r == "object" && r !== null && t in r) {
        const i = gn(r, t);
        return i && !i.configurable && (i.configurable = !0), i;
      }
    }
  },
  has(n, t) {
    if (t === Vr || t === Zc) return !1;
    for (let e of n.props)
      if (oa(e) && (e = e()), e != null && t in e) return !0;
    return !1;
  },
  ownKeys(n) {
    const t = [];
    for (let e of n.props)
      if (oa(e) && (e = e()), !!e) {
        for (const r in e)
          t.includes(r) || t.push(r);
        for (const r of Object.getOwnPropertySymbols(e))
          t.includes(r) || t.push(r);
      }
    return t;
  }
};
function Xt(...n) {
  return new Proxy({ props: n }, rh);
}
function $e(n, t, e, r) {
  var x;
  var i = !Zi || (e & Cf) !== 0, a = (e & Rf) !== 0, o = (e & Vf) !== 0, s = (
    /** @type {V} */
    r
  ), l = !0, c = () => (l && (l = !1, s = o ? C(
    /** @type {() => V} */
    r
  ) : (
    /** @type {V} */
    r
  )), s);
  let d;
  if (a) {
    var p = Vr in n || Zc in n;
    d = ((x = gn(n, t)) == null ? void 0 : x.set) ?? (p && t in n ? (y) => n[t] = y : void 0);
  }
  var u, m = !1;
  a ? [u, m] = Xf(() => (
    /** @type {V} */
    n[t]
  )) : u = /** @type {V} */
  n[t], u === void 0 && r !== void 0 && (u = c(), d && (i && kf(), d(u)));
  var g;
  if (i ? g = () => {
    var y = (
      /** @type {V} */
      n[t]
    );
    return y === void 0 ? c() : (l = !0, y);
  } : g = () => {
    var y = (
      /** @type {V} */
      n[t]
    );
    return y !== void 0 && (s = /** @type {V} */
    void 0), y === void 0 ? s : y;
  }, i && !(e & Qc))
    return g;
  if (d) {
    var f = n.$$legacy;
    return (
      /** @type {() => V} */
      function(y, k) {
        return arguments.length > 0 ? ((!i || !k || f || m) && d(k ? g() : y), y) : g();
      }
    );
  }
  var v = !1, b = (e & If ? La : kl)(() => (v = !1, g()));
  a && h(b);
  var A = (
    /** @type {Effect} */
    W
  );
  return (
    /** @type {() => V} */
    function(y, k) {
      if (arguments.length > 0) {
        const M = k ? h(b) : i && a ? bi(y) : y;
        return I(b, M), v = !0, s !== void 0 && (s = M), y;
      }
      return wn && v || A.f & nr ? b.v : h(b);
    }
  );
}
function nh(n) {
  zt === null && gf(), Zi && zt.l !== null ? ih(zt).m.push(n) : _s(() => {
    const t = C(n);
    if (typeof t == "function") return (
      /** @type {() => void} */
      t
    );
  });
}
function ih(n) {
  var t = (
    /** @type {ComponentContextLegacy} */
    n.l
  );
  return t.u ?? (t.u = { a: [], b: [], m: [] });
}
const ah = "5";
var jc;
typeof window < "u" && ((jc = window.__svelte ?? (window.__svelte = {})).v ?? (jc.v = /* @__PURE__ */ new Set())).add(ah);
Uf();
function Xr(n) {
  if (n === void 0)
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return n;
}
function Xd(n, t) {
  n.prototype = Object.create(t.prototype), n.prototype.constructor = n, n.__proto__ = t;
}
/*!
 * GSAP 3.14.2
 * https://gsap.com
 *
 * @license Copyright 2008-2025, GreenSock. All rights reserved.
 * Subject to the terms at https://gsap.com/standard-license
 * @author: Jack Doyle, jack@greensock.com
*/
var _e = {
  autoSleep: 120,
  force3D: "auto",
  nullTargetWarn: 1,
  units: {
    lineHeight: ""
  }
}, Fi = {
  duration: 0.5,
  overwrite: !1,
  delay: 0
}, Ml, ee, St, tr = 1e8, bt = 1 / tr, Ws = Math.PI * 2, oh = Ws / 4, sh = 0, _d = Math.sqrt, lh = Math.cos, ch = Math.sin, Ht = function(t) {
  return typeof t == "string";
}, Vt = function(t) {
  return typeof t == "function";
}, Wr = function(t) {
  return typeof t == "number";
}, Ol = function(t) {
  return typeof t > "u";
}, Nr = function(t) {
  return typeof t == "object";
}, Te = function(t) {
  return t !== !1;
}, Pl = function() {
  return typeof window < "u";
}, po = function(t) {
  return Vt(t) || Ht(t);
}, Zd = typeof ArrayBuffer == "function" && ArrayBuffer.isView || function() {
}, se = Array.isArray, dh = /random\([^)]+\)/g, ph = /,\s*/g, vc = /(?:-?\.?\d|\.)+/gi, Kd = /[-+=.]*\d+[.e\-+]*\d*[e\-+]*\d*/g, yi = /[-+=.]*\d+[.e-]*\d*[a-z%]*/g, As = /[-+=.]*\d+\.?\d*(?:e-|e\+)?\d*/gi, Hd = /[+-]=-?[.\d]+/, fh = /[^,'"\[\]\s]+/gi, uh = /^[+\-=e\s\d]*\d+[.\d]*([a-z]*|%)\s*$/i, Tt, Er, Js, Il, Ze = {}, So = {}, Qd, Wd = function(t) {
  return (So = Bi(t, Ze)) && Ce;
}, Cl = function(t, e) {
  return console.warn("Invalid property", t, "set to", e, "Missing plugin? gsap.registerPlugin()");
}, Ea = function(t, e) {
  return !e && console.warn(t);
}, Jd = function(t, e) {
  return t && (Ze[t] = e) && So && (So[t] = e) || Ze;
}, Ta = function() {
  return 0;
}, hh = {
  suppressEvents: !0,
  isStart: !0,
  kill: !1
}, mo = {
  suppressEvents: !0,
  kill: !1
}, gh = {
  suppressEvents: !0
}, Rl = {}, xn = [], $s = {}, $d, Be = {}, Ss = {}, mc = 30, xo = [], Vl = "", ql = function(t) {
  var e = t[0], r, i;
  if (Nr(e) || Vt(e) || (t = [t]), !(r = (e._gsap || {}).harness)) {
    for (i = xo.length; i-- && !xo[i].targetTest(e); )
      ;
    r = xo[i];
  }
  for (i = t.length; i--; )
    t[i] && (t[i]._gsap || (t[i]._gsap = new Ap(t[i], r))) || t.splice(i, 1);
  return t;
}, Kn = function(t) {
  return t._gsap || ql(er(t))[0]._gsap;
}, tp = function(t, e, r) {
  return (r = t[e]) && Vt(r) ? t[e]() : Ol(r) && t.getAttribute && t.getAttribute(e) || r;
}, Me = function(t, e) {
  return (t = t.split(",")).forEach(e) || t;
}, Yt = function(t) {
  return Math.round(t * 1e5) / 1e5 || 0;
}, Et = function(t) {
  return Math.round(t * 1e7) / 1e7 || 0;
}, ki = function(t, e) {
  var r = e.charAt(0), i = parseFloat(e.substr(2));
  return t = parseFloat(t), r === "+" ? t + i : r === "-" ? t - i : r === "*" ? t * i : t / i;
}, vh = function(t, e) {
  for (var r = e.length, i = 0; t.indexOf(e[i]) < 0 && ++i < r; )
    ;
  return i < r;
}, zo = function() {
  var t = xn.length, e = xn.slice(0), r, i;
  for ($s = {}, xn.length = 0, r = 0; r < t; r++)
    i = e[r], i && i._lazy && (i.render(i._lazy[0], i._lazy[1], !0)._lazy = 0);
}, Nl = function(t) {
  return !!(t._initted || t._startAt || t.add);
}, ep = function(t, e, r, i) {
  xn.length && !ee && zo(), t.render(e, r, !!(ee && e < 0 && Nl(t))), xn.length && !ee && zo();
}, rp = function(t) {
  var e = parseFloat(t);
  return (e || e === 0) && (t + "").match(fh).length < 2 ? e : Ht(t) ? t.trim() : t;
}, np = function(t) {
  return t;
}, Ke = function(t, e) {
  for (var r in e)
    r in t || (t[r] = e[r]);
  return t;
}, mh = function(t) {
  return function(e, r) {
    for (var i in r)
      i in e || i === "duration" && t || i === "ease" || (e[i] = r[i]);
  };
}, Bi = function(t, e) {
  for (var r in e)
    t[r] = e[r];
  return t;
}, xc = function n(t, e) {
  for (var r in e)
    r !== "__proto__" && r !== "constructor" && r !== "prototype" && (t[r] = Nr(e[r]) ? n(t[r] || (t[r] = {}), e[r]) : e[r]);
  return t;
}, Eo = function(t, e) {
  var r = {}, i;
  for (i in t)
    i in e || (r[i] = t[i]);
  return r;
}, ka = function(t) {
  var e = t.parent || Tt, r = t.keyframes ? mh(se(t.keyframes)) : Ke;
  if (Te(t.inherit))
    for (; e; )
      r(t, e.vars.defaults), e = e.parent || e._dp;
  return t;
}, xh = function(t, e) {
  for (var r = t.length, i = r === e.length; i && r-- && t[r] === e[r]; )
    ;
  return r < 0;
}, ip = function(t, e, r, i, a) {
  var o = t[i], s;
  if (a)
    for (s = e[a]; o && o[a] > s; )
      o = o._prev;
  return o ? (e._next = o._next, o._next = e) : (e._next = t[r], t[r] = e), e._next ? e._next._prev = e : t[i] = e, e._prev = o, e.parent = e._dp = t, e;
}, Do = function(t, e, r, i) {
  r === void 0 && (r = "_first"), i === void 0 && (i = "_last");
  var a = e._prev, o = e._next;
  a ? a._next = o : t[r] === e && (t[r] = o), o ? o._prev = a : t[i] === e && (t[i] = a), e._next = e._prev = e.parent = null;
}, kn = function(t, e) {
  t.parent && (!e || t.parent.autoRemoveChildren) && t.parent.remove && t.parent.remove(t), t._act = 0;
}, Hn = function(t, e) {
  if (t && (!e || e._end > t._dur || e._start < 0))
    for (var r = t; r; )
      r._dirty = 1, r = r.parent;
  return t;
}, bh = function(t) {
  for (var e = t.parent; e && e.parent; )
    e._dirty = 1, e.totalDuration(), e = e.parent;
  return t;
}, tl = function(t, e, r, i) {
  return t._startAt && (ee ? t._startAt.revert(mo) : t.vars.immediateRender && !t.vars.autoRevert || t._startAt.render(e, !0, i));
}, yh = function n(t) {
  return !t || t._ts && n(t.parent);
}, bc = function(t) {
  return t._repeat ? Ui(t._tTime, t = t.duration() + t._rDelay) * t : 0;
}, Ui = function(t, e) {
  var r = Math.floor(t = Et(t / e));
  return t && r === t ? r - 1 : r;
}, To = function(t, e) {
  return (t - e._start) * e._ts + (e._ts >= 0 ? 0 : e._dirty ? e.totalDuration() : e._tDur);
}, Fo = function(t) {
  return t._end = Et(t._start + (t._tDur / Math.abs(t._ts || t._rts || bt) || 0));
}, Bo = function(t, e) {
  var r = t._dp;
  return r && r.smoothChildTiming && t._ts && (t._start = Et(r._time - (t._ts > 0 ? e / t._ts : ((t._dirty ? t.totalDuration() : t._tDur) - e) / -t._ts)), Fo(t), r._dirty || Hn(r, t)), t;
}, ap = function(t, e) {
  var r;
  if ((e._time || !e._dur && e._initted || e._start < t._time && (e._dur || !e.add)) && (r = To(t.rawTime(), e), (!e._dur || Ba(0, e.totalDuration(), r) - e._tTime > bt) && e.render(r, !0)), Hn(t, e)._dp && t._initted && t._time >= t._dur && t._ts) {
    if (t._dur < t.duration())
      for (r = t; r._dp; )
        r.rawTime() >= 0 && r.totalTime(r._tTime), r = r._dp;
    t._zTime = -bt;
  }
}, Ir = function(t, e, r, i) {
  return e.parent && kn(e), e._start = Et((Wr(r) ? r : r || t !== Tt ? He(t, r, e) : t._time) + e._delay), e._end = Et(e._start + (e.totalDuration() / Math.abs(e.timeScale()) || 0)), ip(t, e, "_first", "_last", t._sort ? "_start" : 0), el(e) || (t._recent = e), i || ap(t, e), t._ts < 0 && Bo(t, t._tTime), t;
}, op = function(t, e) {
  return (Ze.ScrollTrigger || Cl("scrollTrigger", e)) && Ze.ScrollTrigger.create(e, t);
}, sp = function(t, e, r, i, a) {
  if (Ll(t, e, a), !t._initted)
    return 1;
  if (!r && t._pt && !ee && (t._dur && t.vars.lazy !== !1 || !t._dur && t.vars.lazy) && $d !== Ue.frame)
    return xn.push(t), t._lazy = [a, i], 1;
}, wh = function n(t) {
  var e = t.parent;
  return e && e._ts && e._initted && !e._lock && (e.rawTime() < 0 || n(e));
}, el = function(t) {
  var e = t.data;
  return e === "isFromStart" || e === "isStart";
}, kh = function(t, e, r, i) {
  var a = t.ratio, o = e < 0 || !e && (!t._start && wh(t) && !(!t._initted && el(t)) || (t._ts < 0 || t._dp._ts < 0) && !el(t)) ? 0 : 1, s = t._rDelay, l = 0, c, d, p;
  if (s && t._repeat && (l = Ba(0, t._tDur, e), d = Ui(l, s), t._yoyo && d & 1 && (o = 1 - o), d !== Ui(t._tTime, s) && (a = 1 - o, t.vars.repeatRefresh && t._initted && t.invalidate())), o !== a || ee || i || t._zTime === bt || !e && t._zTime) {
    if (!t._initted && sp(t, e, i, r, l))
      return;
    for (p = t._zTime, t._zTime = e || (r ? bt : 0), r || (r = e && !p), t.ratio = o, t._from && (o = 1 - o), t._time = 0, t._tTime = l, c = t._pt; c; )
      c.r(o, c.d), c = c._next;
    e < 0 && tl(t, e, r, !0), t._onUpdate && !r && je(t, "onUpdate"), l && t._repeat && !r && t.parent && je(t, "onRepeat"), (e >= t._tDur || e < 0) && t.ratio === o && (o && kn(t, 1), !r && !ee && (je(t, o ? "onComplete" : "onReverseComplete", !0), t._prom && t._prom()));
  } else t._zTime || (t._zTime = e);
}, Ah = function(t, e, r) {
  var i;
  if (r > e)
    for (i = t._first; i && i._start <= r; ) {
      if (i.data === "isPause" && i._start > e)
        return i;
      i = i._next;
    }
  else
    for (i = t._last; i && i._start >= r; ) {
      if (i.data === "isPause" && i._start < e)
        return i;
      i = i._prev;
    }
}, ji = function(t, e, r, i) {
  var a = t._repeat, o = Et(e) || 0, s = t._tTime / t._tDur;
  return s && !i && (t._time *= o / t._dur), t._dur = o, t._tDur = a ? a < 0 ? 1e10 : Et(o * (a + 1) + t._rDelay * a) : o, s > 0 && !i && Bo(t, t._tTime = t._tDur * s), t.parent && Fo(t), r || Hn(t.parent, t), t;
}, yc = function(t) {
  return t instanceof me ? Hn(t) : ji(t, t._dur);
}, Sh = {
  _start: 0,
  endTime: Ta,
  totalDuration: Ta
}, He = function n(t, e, r) {
  var i = t.labels, a = t._recent || Sh, o = t.duration() >= tr ? a.endTime(!1) : t._dur, s, l, c;
  return Ht(e) && (isNaN(e) || e in i) ? (l = e.charAt(0), c = e.substr(-1) === "%", s = e.indexOf("="), l === "<" || l === ">" ? (s >= 0 && (e = e.replace(/=/, "")), (l === "<" ? a._start : a.endTime(a._repeat >= 0)) + (parseFloat(e.substr(1)) || 0) * (c ? (s < 0 ? a : r).totalDuration() / 100 : 1)) : s < 0 ? (e in i || (i[e] = o), i[e]) : (l = parseFloat(e.charAt(s - 1) + e.substr(s + 1)), c && r && (l = l / 100 * (se(r) ? r[0] : r).totalDuration()), s > 1 ? n(t, e.substr(0, s - 1), r) + l : o + l)) : e == null ? o : +e;
}, Aa = function(t, e, r) {
  var i = Wr(e[1]), a = (i ? 2 : 1) + (t < 2 ? 0 : 1), o = e[a], s, l;
  if (i && (o.duration = e[1]), o.parent = r, t) {
    for (s = o, l = r; l && !("immediateRender" in s); )
      s = l.vars.defaults || {}, l = Te(l.vars.inherit) && l.parent;
    o.immediateRender = Te(s.immediateRender), t < 2 ? o.runBackwards = 1 : o.startAt = e[a - 1];
  }
  return new Bt(e[0], o, e[a + 1]);
}, En = function(t, e) {
  return t || t === 0 ? e(t) : e;
}, Ba = function(t, e, r) {
  return r < t ? t : r > e ? e : r;
}, oe = function(t, e) {
  return !Ht(t) || !(e = uh.exec(t)) ? "" : e[1];
}, zh = function(t, e, r) {
  return En(r, function(i) {
    return Ba(t, e, i);
  });
}, rl = [].slice, lp = function(t, e) {
  return t && Nr(t) && "length" in t && (!e && !t.length || t.length - 1 in t && Nr(t[0])) && !t.nodeType && t !== Er;
}, Eh = function(t, e, r) {
  return r === void 0 && (r = []), t.forEach(function(i) {
    var a;
    return Ht(i) && !e || lp(i, 1) ? (a = r).push.apply(a, er(i)) : r.push(i);
  }) || r;
}, er = function(t, e, r) {
  return St && !e && St.selector ? St.selector(t) : Ht(t) && !r && (Js || !Gi()) ? rl.call((e || Il).querySelectorAll(t), 0) : se(t) ? Eh(t, r) : lp(t) ? rl.call(t, 0) : t ? [t] : [];
}, nl = function(t) {
  return t = er(t)[0] || Ea("Invalid scope") || {}, function(e) {
    var r = t.current || t.nativeElement || t;
    return er(e, r.querySelectorAll ? r : r === t ? Ea("Invalid scope") || Il.createElement("div") : t);
  };
}, cp = function(t) {
  return t.sort(function() {
    return 0.5 - Math.random();
  });
}, dp = function(t) {
  if (Vt(t))
    return t;
  var e = Nr(t) ? t : {
    each: t
  }, r = Qn(e.ease), i = e.from || 0, a = parseFloat(e.base) || 0, o = {}, s = i > 0 && i < 1, l = isNaN(i) || s, c = e.axis, d = i, p = i;
  return Ht(i) ? d = p = {
    center: 0.5,
    edges: 0.5,
    end: 1
  }[i] || 0 : !s && l && (d = i[0], p = i[1]), function(u, m, g) {
    var f = (g || e).length, v = o[f], b, A, x, y, k, M, T, O, z;
    if (!v) {
      if (z = e.grid === "auto" ? 0 : (e.grid || [1, tr])[1], !z) {
        for (T = -tr; T < (T = g[z++].getBoundingClientRect().left) && z < f; )
          ;
        z < f && z--;
      }
      for (v = o[f] = [], b = l ? Math.min(z, f) * d - 0.5 : i % z, A = z === tr ? 0 : l ? f * p / z - 0.5 : i / z | 0, T = 0, O = tr, M = 0; M < f; M++)
        x = M % z - b, y = A - (M / z | 0), v[M] = k = c ? Math.abs(c === "y" ? y : x) : _d(x * x + y * y), k > T && (T = k), k < O && (O = k);
      i === "random" && cp(v), v.max = T - O, v.min = O, v.v = f = (parseFloat(e.amount) || parseFloat(e.each) * (z > f ? f - 1 : c ? c === "y" ? f / z : z : Math.max(z, f / z)) || 0) * (i === "edges" ? -1 : 1), v.b = f < 0 ? a - f : a, v.u = oe(e.amount || e.each) || 0, r = r && f < 0 ? yp(r) : r;
    }
    return f = (v[u] - v.min) / v.max || 0, Et(v.b + (r ? r(f) : f) * v.v) + v.u;
  };
}, il = function(t) {
  var e = Math.pow(10, ((t + "").split(".")[1] || "").length);
  return function(r) {
    var i = Et(Math.round(parseFloat(r) / t) * t * e);
    return (i - i % 1) / e + (Wr(r) ? 0 : oe(r));
  };
}, pp = function(t, e) {
  var r = se(t), i, a;
  return !r && Nr(t) && (i = r = t.radius || tr, t.values ? (t = er(t.values), (a = !Wr(t[0])) && (i *= i)) : t = il(t.increment)), En(e, r ? Vt(t) ? function(o) {
    return a = t(o), Math.abs(a - o) <= i ? a : o;
  } : function(o) {
    for (var s = parseFloat(a ? o.x : o), l = parseFloat(a ? o.y : 0), c = tr, d = 0, p = t.length, u, m; p--; )
      a ? (u = t[p].x - s, m = t[p].y - l, u = u * u + m * m) : u = Math.abs(t[p] - s), u < c && (c = u, d = p);
    return d = !i || c <= i ? t[d] : o, a || d === o || Wr(o) ? d : d + oe(o);
  } : il(t));
}, fp = function(t, e, r, i) {
  return En(se(t) ? !e : r === !0 ? !!(r = 0) : !i, function() {
    return se(t) ? t[~~(Math.random() * t.length)] : (r = r || 1e-5) && (i = r < 1 ? Math.pow(10, (r + "").length - 2) : 1) && Math.floor(Math.round((t - r / 2 + Math.random() * (e - t + r * 0.99)) / r) * r * i) / i;
  });
}, Th = function() {
  for (var t = arguments.length, e = new Array(t), r = 0; r < t; r++)
    e[r] = arguments[r];
  return function(i) {
    return e.reduce(function(a, o) {
      return o(a);
    }, i);
  };
}, Mh = function(t, e) {
  return function(r) {
    return t(parseFloat(r)) + (e || oe(r));
  };
}, Oh = function(t, e, r) {
  return hp(t, e, 0, 1, r);
}, up = function(t, e, r) {
  return En(r, function(i) {
    return t[~~e(i)];
  });
}, Ph = function n(t, e, r) {
  var i = e - t;
  return se(t) ? up(t, n(0, t.length), e) : En(r, function(a) {
    return (i + (a - t) % i) % i + t;
  });
}, Ih = function n(t, e, r) {
  var i = e - t, a = i * 2;
  return se(t) ? up(t, n(0, t.length - 1), e) : En(r, function(o) {
    return o = (a + (o - t) % a) % a || 0, t + (o > i ? a - o : o);
  });
}, Ma = function(t) {
  return t.replace(dh, function(e) {
    var r = e.indexOf("[") + 1, i = e.substring(r || 7, r ? e.indexOf("]") : e.length - 1).split(ph);
    return fp(r ? i : +i[0], r ? 0 : +i[1], +i[2] || 1e-5);
  });
}, hp = function(t, e, r, i, a) {
  var o = e - t, s = i - r;
  return En(a, function(l) {
    return r + ((l - t) / o * s || 0);
  });
}, Ch = function n(t, e, r, i) {
  var a = isNaN(t + e) ? 0 : function(m) {
    return (1 - m) * t + m * e;
  };
  if (!a) {
    var o = Ht(t), s = {}, l, c, d, p, u;
    if (r === !0 && (i = 1) && (r = null), o)
      t = {
        p: t
      }, e = {
        p: e
      };
    else if (se(t) && !se(e)) {
      for (d = [], p = t.length, u = p - 2, c = 1; c < p; c++)
        d.push(n(t[c - 1], t[c]));
      p--, a = function(g) {
        g *= p;
        var f = Math.min(u, ~~g);
        return d[f](g - f);
      }, r = e;
    } else i || (t = Bi(se(t) ? [] : {}, t));
    if (!d) {
      for (l in e)
        Yl.call(s, t, l, "get", e[l]);
      a = function(g) {
        return Bl(g, s) || (o ? t.p : t);
      };
    }
  }
  return En(r, a);
}, wc = function(t, e, r) {
  var i = t.labels, a = tr, o, s, l;
  for (o in i)
    s = i[o] - e, s < 0 == !!r && s && a > (s = Math.abs(s)) && (l = o, a = s);
  return l;
}, je = function(t, e, r) {
  var i = t.vars, a = i[e], o = St, s = t._ctx, l, c, d;
  if (a)
    return l = i[e + "Params"], c = i.callbackScope || t, r && xn.length && zo(), s && (St = s), d = l ? a.apply(c, l) : a.call(c), St = o, d;
}, ma = function(t) {
  return kn(t), t.scrollTrigger && t.scrollTrigger.kill(!!ee), t.progress() < 1 && je(t, "onInterrupt"), t;
}, wi, gp = [], vp = function(t) {
  if (t)
    if (t = !t.name && t.default || t, Pl() || t.headless) {
      var e = t.name, r = Vt(t), i = e && !r && t.init ? function() {
        this._props = [];
      } : t, a = {
        init: Ta,
        render: Bl,
        add: Yl,
        kill: Kh,
        modifier: Zh,
        rawVars: 0
      }, o = {
        targetTest: 0,
        get: 0,
        getSetter: Fl,
        aliases: {},
        register: 0
      };
      if (Gi(), t !== i) {
        if (Be[e])
          return;
        Ke(i, Ke(Eo(t, a), o)), Bi(i.prototype, Bi(a, Eo(t, o))), Be[i.prop = e] = i, t.targetTest && (xo.push(i), Rl[e] = 1), e = (e === "css" ? "CSS" : e.charAt(0).toUpperCase() + e.substr(1)) + "Plugin";
      }
      Jd(e, i), t.register && t.register(Ce, i, Oe);
    } else
      gp.push(t);
}, xt = 255, xa = {
  aqua: [0, xt, xt],
  lime: [0, xt, 0],
  silver: [192, 192, 192],
  black: [0, 0, 0],
  maroon: [128, 0, 0],
  teal: [0, 128, 128],
  blue: [0, 0, xt],
  navy: [0, 0, 128],
  white: [xt, xt, xt],
  olive: [128, 128, 0],
  yellow: [xt, xt, 0],
  orange: [xt, 165, 0],
  gray: [128, 128, 128],
  purple: [128, 0, 128],
  green: [0, 128, 0],
  red: [xt, 0, 0],
  pink: [xt, 192, 203],
  cyan: [0, xt, xt],
  transparent: [xt, xt, xt, 0]
}, zs = function(t, e, r) {
  return t += t < 0 ? 1 : t > 1 ? -1 : 0, (t * 6 < 1 ? e + (r - e) * t * 6 : t < 0.5 ? r : t * 3 < 2 ? e + (r - e) * (2 / 3 - t) * 6 : e) * xt + 0.5 | 0;
}, mp = function(t, e, r) {
  var i = t ? Wr(t) ? [t >> 16, t >> 8 & xt, t & xt] : 0 : xa.black, a, o, s, l, c, d, p, u, m, g;
  if (!i) {
    if (t.substr(-1) === "," && (t = t.substr(0, t.length - 1)), xa[t])
      i = xa[t];
    else if (t.charAt(0) === "#") {
      if (t.length < 6 && (a = t.charAt(1), o = t.charAt(2), s = t.charAt(3), t = "#" + a + a + o + o + s + s + (t.length === 5 ? t.charAt(4) + t.charAt(4) : "")), t.length === 9)
        return i = parseInt(t.substr(1, 6), 16), [i >> 16, i >> 8 & xt, i & xt, parseInt(t.substr(7), 16) / 255];
      t = parseInt(t.substr(1), 16), i = [t >> 16, t >> 8 & xt, t & xt];
    } else if (t.substr(0, 3) === "hsl") {
      if (i = g = t.match(vc), !e)
        l = +i[0] % 360 / 360, c = +i[1] / 100, d = +i[2] / 100, o = d <= 0.5 ? d * (c + 1) : d + c - d * c, a = d * 2 - o, i.length > 3 && (i[3] *= 1), i[0] = zs(l + 1 / 3, a, o), i[1] = zs(l, a, o), i[2] = zs(l - 1 / 3, a, o);
      else if (~t.indexOf("="))
        return i = t.match(Kd), r && i.length < 4 && (i[3] = 1), i;
    } else
      i = t.match(vc) || xa.transparent;
    i = i.map(Number);
  }
  return e && !g && (a = i[0] / xt, o = i[1] / xt, s = i[2] / xt, p = Math.max(a, o, s), u = Math.min(a, o, s), d = (p + u) / 2, p === u ? l = c = 0 : (m = p - u, c = d > 0.5 ? m / (2 - p - u) : m / (p + u), l = p === a ? (o - s) / m + (o < s ? 6 : 0) : p === o ? (s - a) / m + 2 : (a - o) / m + 4, l *= 60), i[0] = ~~(l + 0.5), i[1] = ~~(c * 100 + 0.5), i[2] = ~~(d * 100 + 0.5)), r && i.length < 4 && (i[3] = 1), i;
}, xp = function(t) {
  var e = [], r = [], i = -1;
  return t.split(bn).forEach(function(a) {
    var o = a.match(yi) || [];
    e.push.apply(e, o), r.push(i += o.length + 1);
  }), e.c = r, e;
}, kc = function(t, e, r) {
  var i = "", a = (t + i).match(bn), o = e ? "hsla(" : "rgba(", s = 0, l, c, d, p;
  if (!a)
    return t;
  if (a = a.map(function(u) {
    return (u = mp(u, e, 1)) && o + (e ? u[0] + "," + u[1] + "%," + u[2] + "%," + u[3] : u.join(",")) + ")";
  }), r && (d = xp(t), l = r.c, l.join(i) !== d.c.join(i)))
    for (c = t.replace(bn, "1").split(yi), p = c.length - 1; s < p; s++)
      i += c[s] + (~l.indexOf(s) ? a.shift() || o + "0,0,0,0)" : (d.length ? d : a.length ? a : r).shift());
  if (!c)
    for (c = t.split(bn), p = c.length - 1; s < p; s++)
      i += c[s] + a[s];
  return i + c[p];
}, bn = function() {
  var n = "(?:\\b(?:(?:rgb|rgba|hsl|hsla)\\(.+?\\))|\\B#(?:[0-9a-f]{3,4}){1,2}\\b", t;
  for (t in xa)
    n += "|" + t + "\\b";
  return new RegExp(n + ")", "gi");
}(), Rh = /hsl[a]?\(/, bp = function(t) {
  var e = t.join(" "), r;
  if (bn.lastIndex = 0, bn.test(e))
    return r = Rh.test(e), t[1] = kc(t[1], r), t[0] = kc(t[0], r, xp(t[1])), !0;
}, Oa, Ue = function() {
  var n = Date.now, t = 500, e = 33, r = n(), i = r, a = 1e3 / 240, o = a, s = [], l, c, d, p, u, m, g = function f(v) {
    var b = n() - i, A = v === !0, x, y, k, M;
    if ((b > t || b < 0) && (r += b - e), i += b, k = i - r, x = k - o, (x > 0 || A) && (M = ++p.frame, u = k - p.time * 1e3, p.time = k = k / 1e3, o += x + (x >= a ? 4 : a - x), y = 1), A || (l = c(f)), y)
      for (m = 0; m < s.length; m++)
        s[m](k, u, M, v);
  };
  return p = {
    time: 0,
    frame: 0,
    tick: function() {
      g(!0);
    },
    deltaRatio: function(v) {
      return u / (1e3 / (v || 60));
    },
    wake: function() {
      Qd && (!Js && Pl() && (Er = Js = window, Il = Er.document || {}, Ze.gsap = Ce, (Er.gsapVersions || (Er.gsapVersions = [])).push(Ce.version), Wd(So || Er.GreenSockGlobals || !Er.gsap && Er || {}), gp.forEach(vp)), d = typeof requestAnimationFrame < "u" && requestAnimationFrame, l && p.sleep(), c = d || function(v) {
        return setTimeout(v, o - p.time * 1e3 + 1 | 0);
      }, Oa = 1, g(2));
    },
    sleep: function() {
      (d ? cancelAnimationFrame : clearTimeout)(l), Oa = 0, c = Ta;
    },
    lagSmoothing: function(v, b) {
      t = v || 1 / 0, e = Math.min(b || 33, t);
    },
    fps: function(v) {
      a = 1e3 / (v || 240), o = p.time * 1e3 + a;
    },
    add: function(v, b, A) {
      var x = b ? function(y, k, M, T) {
        v(y, k, M, T), p.remove(x);
      } : v;
      return p.remove(v), s[A ? "unshift" : "push"](x), Gi(), x;
    },
    remove: function(v, b) {
      ~(b = s.indexOf(v)) && s.splice(b, 1) && m >= b && m--;
    },
    _listeners: s
  }, p;
}(), Gi = function() {
  return !Oa && Ue.wake();
}, at = {}, Vh = /^[\d.\-M][\d.\-,\s]/, qh = /["']/g, Nh = function(t) {
  for (var e = {}, r = t.substr(1, t.length - 3).split(":"), i = r[0], a = 1, o = r.length, s, l, c; a < o; a++)
    l = r[a], s = a !== o - 1 ? l.lastIndexOf(",") : l.length, c = l.substr(0, s), e[i] = isNaN(c) ? c.replace(qh, "").trim() : +c, i = l.substr(s + 1).trim();
  return e;
}, Yh = function(t) {
  var e = t.indexOf("(") + 1, r = t.indexOf(")"), i = t.indexOf("(", e);
  return t.substring(e, ~i && i < r ? t.indexOf(")", r + 1) : r);
}, Lh = function(t) {
  var e = (t + "").split("("), r = at[e[0]];
  return r && e.length > 1 && r.config ? r.config.apply(null, ~t.indexOf("{") ? [Nh(e[1])] : Yh(t).split(",").map(rp)) : at._CE && Vh.test(t) ? at._CE("", t) : r;
}, yp = function(t) {
  return function(e) {
    return 1 - t(1 - e);
  };
}, wp = function n(t, e) {
  for (var r = t._first, i; r; )
    r instanceof me ? n(r, e) : r.vars.yoyoEase && (!r._yoyo || !r._repeat) && r._yoyo !== e && (r.timeline ? n(r.timeline, e) : (i = r._ease, r._ease = r._yEase, r._yEase = i, r._yoyo = e)), r = r._next;
}, Qn = function(t, e) {
  return t && (Vt(t) ? t : at[t] || Lh(t)) || e;
}, ii = function(t, e, r, i) {
  r === void 0 && (r = function(l) {
    return 1 - e(1 - l);
  }), i === void 0 && (i = function(l) {
    return l < 0.5 ? e(l * 2) / 2 : 1 - e((1 - l) * 2) / 2;
  });
  var a = {
    easeIn: e,
    easeOut: r,
    easeInOut: i
  }, o;
  return Me(t, function(s) {
    at[s] = Ze[s] = a, at[o = s.toLowerCase()] = r;
    for (var l in a)
      at[o + (l === "easeIn" ? ".in" : l === "easeOut" ? ".out" : ".inOut")] = at[s + "." + l] = a[l];
  }), a;
}, kp = function(t) {
  return function(e) {
    return e < 0.5 ? (1 - t(1 - e * 2)) / 2 : 0.5 + t((e - 0.5) * 2) / 2;
  };
}, Es = function n(t, e, r) {
  var i = e >= 1 ? e : 1, a = (r || (t ? 0.3 : 0.45)) / (e < 1 ? e : 1), o = a / Ws * (Math.asin(1 / i) || 0), s = function(d) {
    return d === 1 ? 1 : i * Math.pow(2, -10 * d) * ch((d - o) * a) + 1;
  }, l = t === "out" ? s : t === "in" ? function(c) {
    return 1 - s(1 - c);
  } : kp(s);
  return a = Ws / a, l.config = function(c, d) {
    return n(t, c, d);
  }, l;
}, Ts = function n(t, e) {
  e === void 0 && (e = 1.70158);
  var r = function(o) {
    return o ? --o * o * ((e + 1) * o + e) + 1 : 0;
  }, i = t === "out" ? r : t === "in" ? function(a) {
    return 1 - r(1 - a);
  } : kp(r);
  return i.config = function(a) {
    return n(t, a);
  }, i;
};
Me("Linear,Quad,Cubic,Quart,Quint,Strong", function(n, t) {
  var e = t < 5 ? t + 1 : t;
  ii(n + ",Power" + (e - 1), t ? function(r) {
    return Math.pow(r, e);
  } : function(r) {
    return r;
  }, function(r) {
    return 1 - Math.pow(1 - r, e);
  }, function(r) {
    return r < 0.5 ? Math.pow(r * 2, e) / 2 : 1 - Math.pow((1 - r) * 2, e) / 2;
  });
});
at.Linear.easeNone = at.none = at.Linear.easeIn;
ii("Elastic", Es("in"), Es("out"), Es());
(function(n, t) {
  var e = 1 / t, r = 2 * e, i = 2.5 * e, a = function(s) {
    return s < e ? n * s * s : s < r ? n * Math.pow(s - 1.5 / t, 2) + 0.75 : s < i ? n * (s -= 2.25 / t) * s + 0.9375 : n * Math.pow(s - 2.625 / t, 2) + 0.984375;
  };
  ii("Bounce", function(o) {
    return 1 - a(1 - o);
  }, a);
})(7.5625, 2.75);
ii("Expo", function(n) {
  return Math.pow(2, 10 * (n - 1)) * n + n * n * n * n * n * n * (1 - n);
});
ii("Circ", function(n) {
  return -(_d(1 - n * n) - 1);
});
ii("Sine", function(n) {
  return n === 1 ? 1 : -lh(n * oh) + 1;
});
ii("Back", Ts("in"), Ts("out"), Ts());
at.SteppedEase = at.steps = Ze.SteppedEase = {
  config: function(t, e) {
    t === void 0 && (t = 1);
    var r = 1 / t, i = t + (e ? 0 : 1), a = e ? 1 : 0, o = 1 - bt;
    return function(s) {
      return ((i * Ba(0, o, s) | 0) + a) * r;
    };
  }
};
Fi.ease = at["quad.out"];
Me("onComplete,onUpdate,onStart,onRepeat,onReverseComplete,onInterrupt", function(n) {
  return Vl += n + "," + n + "Params,";
});
var Ap = function(t, e) {
  this.id = sh++, t._gsap = this, this.target = t, this.harness = e, this.get = e ? e.get : tp, this.set = e ? e.getSetter : Fl;
}, Pa = /* @__PURE__ */ function() {
  function n(e) {
    this.vars = e, this._delay = +e.delay || 0, (this._repeat = e.repeat === 1 / 0 ? -2 : e.repeat || 0) && (this._rDelay = e.repeatDelay || 0, this._yoyo = !!e.yoyo || !!e.yoyoEase), this._ts = 1, ji(this, +e.duration, 1, 1), this.data = e.data, St && (this._ctx = St, St.data.push(this)), Oa || Ue.wake();
  }
  var t = n.prototype;
  return t.delay = function(r) {
    return r || r === 0 ? (this.parent && this.parent.smoothChildTiming && this.startTime(this._start + r - this._delay), this._delay = r, this) : this._delay;
  }, t.duration = function(r) {
    return arguments.length ? this.totalDuration(this._repeat > 0 ? r + (r + this._rDelay) * this._repeat : r) : this.totalDuration() && this._dur;
  }, t.totalDuration = function(r) {
    return arguments.length ? (this._dirty = 0, ji(this, this._repeat < 0 ? r : (r - this._repeat * this._rDelay) / (this._repeat + 1))) : this._tDur;
  }, t.totalTime = function(r, i) {
    if (Gi(), !arguments.length)
      return this._tTime;
    var a = this._dp;
    if (a && a.smoothChildTiming && this._ts) {
      for (Bo(this, r), !a._dp || a.parent || ap(a, this); a && a.parent; )
        a.parent._time !== a._start + (a._ts >= 0 ? a._tTime / a._ts : (a.totalDuration() - a._tTime) / -a._ts) && a.totalTime(a._tTime, !0), a = a.parent;
      !this.parent && this._dp.autoRemoveChildren && (this._ts > 0 && r < this._tDur || this._ts < 0 && r > 0 || !this._tDur && !r) && Ir(this._dp, this, this._start - this._delay);
    }
    return (this._tTime !== r || !this._dur && !i || this._initted && Math.abs(this._zTime) === bt || !this._initted && this._dur && r || !r && !this._initted && (this.add || this._ptLookup)) && (this._ts || (this._pTime = r), ep(this, r, i)), this;
  }, t.time = function(r, i) {
    return arguments.length ? this.totalTime(Math.min(this.totalDuration(), r + bc(this)) % (this._dur + this._rDelay) || (r ? this._dur : 0), i) : this._time;
  }, t.totalProgress = function(r, i) {
    return arguments.length ? this.totalTime(this.totalDuration() * r, i) : this.totalDuration() ? Math.min(1, this._tTime / this._tDur) : this.rawTime() >= 0 && this._initted ? 1 : 0;
  }, t.progress = function(r, i) {
    return arguments.length ? this.totalTime(this.duration() * (this._yoyo && !(this.iteration() & 1) ? 1 - r : r) + bc(this), i) : this.duration() ? Math.min(1, this._time / this._dur) : this.rawTime() > 0 ? 1 : 0;
  }, t.iteration = function(r, i) {
    var a = this.duration() + this._rDelay;
    return arguments.length ? this.totalTime(this._time + (r - 1) * a, i) : this._repeat ? Ui(this._tTime, a) + 1 : 1;
  }, t.timeScale = function(r, i) {
    if (!arguments.length)
      return this._rts === -bt ? 0 : this._rts;
    if (this._rts === r)
      return this;
    var a = this.parent && this._ts ? To(this.parent._time, this) : this._tTime;
    return this._rts = +r || 0, this._ts = this._ps || r === -bt ? 0 : this._rts, this.totalTime(Ba(-Math.abs(this._delay), this.totalDuration(), a), i !== !1), Fo(this), bh(this);
  }, t.paused = function(r) {
    return arguments.length ? (this._ps !== r && (this._ps = r, r ? (this._pTime = this._tTime || Math.max(-this._delay, this.rawTime()), this._ts = this._act = 0) : (Gi(), this._ts = this._rts, this.totalTime(this.parent && !this.parent.smoothChildTiming ? this.rawTime() : this._tTime || this._pTime, this.progress() === 1 && Math.abs(this._zTime) !== bt && (this._tTime -= bt)))), this) : this._ps;
  }, t.startTime = function(r) {
    if (arguments.length) {
      this._start = Et(r);
      var i = this.parent || this._dp;
      return i && (i._sort || !this.parent) && Ir(i, this, this._start - this._delay), this;
    }
    return this._start;
  }, t.endTime = function(r) {
    return this._start + (Te(r) ? this.totalDuration() : this.duration()) / Math.abs(this._ts || 1);
  }, t.rawTime = function(r) {
    var i = this.parent || this._dp;
    return i ? r && (!this._ts || this._repeat && this._time && this.totalProgress() < 1) ? this._tTime % (this._dur + this._rDelay) : this._ts ? To(i.rawTime(r), this) : this._tTime : this._tTime;
  }, t.revert = function(r) {
    r === void 0 && (r = gh);
    var i = ee;
    return ee = r, Nl(this) && (this.timeline && this.timeline.revert(r), this.totalTime(-0.01, r.suppressEvents)), this.data !== "nested" && r.kill !== !1 && this.kill(), ee = i, this;
  }, t.globalTime = function(r) {
    for (var i = this, a = arguments.length ? r : i.rawTime(); i; )
      a = i._start + a / (Math.abs(i._ts) || 1), i = i._dp;
    return !this.parent && this._sat ? this._sat.globalTime(r) : a;
  }, t.repeat = function(r) {
    return arguments.length ? (this._repeat = r === 1 / 0 ? -2 : r, yc(this)) : this._repeat === -2 ? 1 / 0 : this._repeat;
  }, t.repeatDelay = function(r) {
    if (arguments.length) {
      var i = this._time;
      return this._rDelay = r, yc(this), i ? this.time(i) : this;
    }
    return this._rDelay;
  }, t.yoyo = function(r) {
    return arguments.length ? (this._yoyo = r, this) : this._yoyo;
  }, t.seek = function(r, i) {
    return this.totalTime(He(this, r), Te(i));
  }, t.restart = function(r, i) {
    return this.play().totalTime(r ? -this._delay : 0, Te(i)), this._dur || (this._zTime = -bt), this;
  }, t.play = function(r, i) {
    return r != null && this.seek(r, i), this.reversed(!1).paused(!1);
  }, t.reverse = function(r, i) {
    return r != null && this.seek(r || this.totalDuration(), i), this.reversed(!0).paused(!1);
  }, t.pause = function(r, i) {
    return r != null && this.seek(r, i), this.paused(!0);
  }, t.resume = function() {
    return this.paused(!1);
  }, t.reversed = function(r) {
    return arguments.length ? (!!r !== this.reversed() && this.timeScale(-this._rts || (r ? -bt : 0)), this) : this._rts < 0;
  }, t.invalidate = function() {
    return this._initted = this._act = 0, this._zTime = -bt, this;
  }, t.isActive = function() {
    var r = this.parent || this._dp, i = this._start, a;
    return !!(!r || this._ts && this._initted && r.isActive() && (a = r.rawTime(!0)) >= i && a < this.endTime(!0) - bt);
  }, t.eventCallback = function(r, i, a) {
    var o = this.vars;
    return arguments.length > 1 ? (i ? (o[r] = i, a && (o[r + "Params"] = a), r === "onUpdate" && (this._onUpdate = i)) : delete o[r], this) : o[r];
  }, t.then = function(r) {
    var i = this, a = i._prom;
    return new Promise(function(o) {
      var s = Vt(r) ? r : np, l = function() {
        var d = i.then;
        i.then = null, a && a(), Vt(s) && (s = s(i)) && (s.then || s === i) && (i.then = d), o(s), i.then = d;
      };
      i._initted && i.totalProgress() === 1 && i._ts >= 0 || !i._tTime && i._ts < 0 ? l() : i._prom = l;
    });
  }, t.kill = function() {
    ma(this);
  }, n;
}();
Ke(Pa.prototype, {
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
  _zTime: -bt,
  _prom: 0,
  _ps: !1,
  _rts: 1
});
var me = /* @__PURE__ */ function(n) {
  Xd(t, n);
  function t(r, i) {
    var a;
    return r === void 0 && (r = {}), a = n.call(this, r) || this, a.labels = {}, a.smoothChildTiming = !!r.smoothChildTiming, a.autoRemoveChildren = !!r.autoRemoveChildren, a._sort = Te(r.sortChildren), Tt && Ir(r.parent || Tt, Xr(a), i), r.reversed && a.reverse(), r.paused && a.paused(!0), r.scrollTrigger && op(Xr(a), r.scrollTrigger), a;
  }
  var e = t.prototype;
  return e.to = function(i, a, o) {
    return Aa(0, arguments, this), this;
  }, e.from = function(i, a, o) {
    return Aa(1, arguments, this), this;
  }, e.fromTo = function(i, a, o, s) {
    return Aa(2, arguments, this), this;
  }, e.set = function(i, a, o) {
    return a.duration = 0, a.parent = this, ka(a).repeatDelay || (a.repeat = 0), a.immediateRender = !!a.immediateRender, new Bt(i, a, He(this, o), 1), this;
  }, e.call = function(i, a, o) {
    return Ir(this, Bt.delayedCall(0, i, a), o);
  }, e.staggerTo = function(i, a, o, s, l, c, d) {
    return o.duration = a, o.stagger = o.stagger || s, o.onComplete = c, o.onCompleteParams = d, o.parent = this, new Bt(i, o, He(this, l)), this;
  }, e.staggerFrom = function(i, a, o, s, l, c, d) {
    return o.runBackwards = 1, ka(o).immediateRender = Te(o.immediateRender), this.staggerTo(i, a, o, s, l, c, d);
  }, e.staggerFromTo = function(i, a, o, s, l, c, d, p) {
    return s.startAt = o, ka(s).immediateRender = Te(s.immediateRender), this.staggerTo(i, a, s, l, c, d, p);
  }, e.render = function(i, a, o) {
    var s = this._time, l = this._dirty ? this.totalDuration() : this._tDur, c = this._dur, d = i <= 0 ? 0 : Et(i), p = this._zTime < 0 != i < 0 && (this._initted || !c), u, m, g, f, v, b, A, x, y, k, M, T;
    if (this !== Tt && d > l && i >= 0 && (d = l), d !== this._tTime || o || p) {
      if (s !== this._time && c && (d += this._time - s, i += this._time - s), u = d, y = this._start, x = this._ts, b = !x, p && (c || (s = this._zTime), (i || !a) && (this._zTime = i)), this._repeat) {
        if (M = this._yoyo, v = c + this._rDelay, this._repeat < -1 && i < 0)
          return this.totalTime(v * 100 + i, a, o);
        if (u = Et(d % v), d === l ? (f = this._repeat, u = c) : (k = Et(d / v), f = ~~k, f && f === k && (u = c, f--), u > c && (u = c)), k = Ui(this._tTime, v), !s && this._tTime && k !== f && this._tTime - k * v - this._dur <= 0 && (k = f), M && f & 1 && (u = c - u, T = 1), f !== k && !this._lock) {
          var O = M && k & 1, z = O === (M && f & 1);
          if (f < k && (O = !O), s = O ? 0 : d % c ? c : d, this._lock = 1, this.render(s || (T ? 0 : Et(f * v)), a, !c)._lock = 0, this._tTime = d, !a && this.parent && je(this, "onRepeat"), this.vars.repeatRefresh && !T && (this.invalidate()._lock = 1, k = f), s && s !== this._time || b !== !this._ts || this.vars.onRepeat && !this.parent && !this._act)
            return this;
          if (c = this._dur, l = this._tDur, z && (this._lock = 2, s = O ? c : -1e-4, this.render(s, !0), this.vars.repeatRefresh && !T && this.invalidate()), this._lock = 0, !this._ts && !b)
            return this;
          wp(this, T);
        }
      }
      if (this._hasPause && !this._forcing && this._lock < 2 && (A = Ah(this, Et(s), Et(u)), A && (d -= u - (u = A._start))), this._tTime = d, this._time = u, this._act = !x, this._initted || (this._onUpdate = this.vars.onUpdate, this._initted = 1, this._zTime = i, s = 0), !s && d && c && !a && !k && (je(this, "onStart"), this._tTime !== d))
        return this;
      if (u >= s && i >= 0)
        for (m = this._first; m; ) {
          if (g = m._next, (m._act || u >= m._start) && m._ts && A !== m) {
            if (m.parent !== this)
              return this.render(i, a, o);
            if (m.render(m._ts > 0 ? (u - m._start) * m._ts : (m._dirty ? m.totalDuration() : m._tDur) + (u - m._start) * m._ts, a, o), u !== this._time || !this._ts && !b) {
              A = 0, g && (d += this._zTime = -bt);
              break;
            }
          }
          m = g;
        }
      else {
        m = this._last;
        for (var N = i < 0 ? i : u; m; ) {
          if (g = m._prev, (m._act || N <= m._end) && m._ts && A !== m) {
            if (m.parent !== this)
              return this.render(i, a, o);
            if (m.render(m._ts > 0 ? (N - m._start) * m._ts : (m._dirty ? m.totalDuration() : m._tDur) + (N - m._start) * m._ts, a, o || ee && Nl(m)), u !== this._time || !this._ts && !b) {
              A = 0, g && (d += this._zTime = N ? -bt : bt);
              break;
            }
          }
          m = g;
        }
      }
      if (A && !a && (this.pause(), A.render(u >= s ? 0 : -bt)._zTime = u >= s ? 1 : -1, this._ts))
        return this._start = y, Fo(this), this.render(i, a, o);
      this._onUpdate && !a && je(this, "onUpdate", !0), (d === l && this._tTime >= this.totalDuration() || !d && s) && (y === this._start || Math.abs(x) !== Math.abs(this._ts)) && (this._lock || ((i || !c) && (d === l && this._ts > 0 || !d && this._ts < 0) && kn(this, 1), !a && !(i < 0 && !s) && (d || s || !l) && (je(this, d === l && i >= 0 ? "onComplete" : "onReverseComplete", !0), this._prom && !(d < l && this.timeScale() > 0) && this._prom())));
    }
    return this;
  }, e.add = function(i, a) {
    var o = this;
    if (Wr(a) || (a = He(this, a, i)), !(i instanceof Pa)) {
      if (se(i))
        return i.forEach(function(s) {
          return o.add(s, a);
        }), this;
      if (Ht(i))
        return this.addLabel(i, a);
      if (Vt(i))
        i = Bt.delayedCall(0, i);
      else
        return this;
    }
    return this !== i ? Ir(this, i, a) : this;
  }, e.getChildren = function(i, a, o, s) {
    i === void 0 && (i = !0), a === void 0 && (a = !0), o === void 0 && (o = !0), s === void 0 && (s = -tr);
    for (var l = [], c = this._first; c; )
      c._start >= s && (c instanceof Bt ? a && l.push(c) : (o && l.push(c), i && l.push.apply(l, c.getChildren(!0, a, o)))), c = c._next;
    return l;
  }, e.getById = function(i) {
    for (var a = this.getChildren(1, 1, 1), o = a.length; o--; )
      if (a[o].vars.id === i)
        return a[o];
  }, e.remove = function(i) {
    return Ht(i) ? this.removeLabel(i) : Vt(i) ? this.killTweensOf(i) : (i.parent === this && Do(this, i), i === this._recent && (this._recent = this._last), Hn(this));
  }, e.totalTime = function(i, a) {
    return arguments.length ? (this._forcing = 1, !this._dp && this._ts && (this._start = Et(Ue.time - (this._ts > 0 ? i / this._ts : (this.totalDuration() - i) / -this._ts))), n.prototype.totalTime.call(this, i, a), this._forcing = 0, this) : this._tTime;
  }, e.addLabel = function(i, a) {
    return this.labels[i] = He(this, a), this;
  }, e.removeLabel = function(i) {
    return delete this.labels[i], this;
  }, e.addPause = function(i, a, o) {
    var s = Bt.delayedCall(0, a || Ta, o);
    return s.data = "isPause", this._hasPause = 1, Ir(this, s, He(this, i));
  }, e.removePause = function(i) {
    var a = this._first;
    for (i = He(this, i); a; )
      a._start === i && a.data === "isPause" && kn(a), a = a._next;
  }, e.killTweensOf = function(i, a, o) {
    for (var s = this.getTweensOf(i, o), l = s.length; l--; )
      fn !== s[l] && s[l].kill(i, a);
    return this;
  }, e.getTweensOf = function(i, a) {
    for (var o = [], s = er(i), l = this._first, c = Wr(a), d; l; )
      l instanceof Bt ? vh(l._targets, s) && (c ? (!fn || l._initted && l._ts) && l.globalTime(0) <= a && l.globalTime(l.totalDuration()) > a : !a || l.isActive()) && o.push(l) : (d = l.getTweensOf(s, a)).length && o.push.apply(o, d), l = l._next;
    return o;
  }, e.tweenTo = function(i, a) {
    a = a || {};
    var o = this, s = He(o, i), l = a, c = l.startAt, d = l.onStart, p = l.onStartParams, u = l.immediateRender, m, g = Bt.to(o, Ke({
      ease: a.ease || "none",
      lazy: !1,
      immediateRender: !1,
      time: s,
      overwrite: "auto",
      duration: a.duration || Math.abs((s - (c && "time" in c ? c.time : o._time)) / o.timeScale()) || bt,
      onStart: function() {
        if (o.pause(), !m) {
          var v = a.duration || Math.abs((s - (c && "time" in c ? c.time : o._time)) / o.timeScale());
          g._dur !== v && ji(g, v, 0, 1).render(g._time, !0, !0), m = 1;
        }
        d && d.apply(g, p || []);
      }
    }, a));
    return u ? g.render(0) : g;
  }, e.tweenFromTo = function(i, a, o) {
    return this.tweenTo(a, Ke({
      startAt: {
        time: He(this, i)
      }
    }, o));
  }, e.recent = function() {
    return this._recent;
  }, e.nextLabel = function(i) {
    return i === void 0 && (i = this._time), wc(this, He(this, i));
  }, e.previousLabel = function(i) {
    return i === void 0 && (i = this._time), wc(this, He(this, i), 1);
  }, e.currentLabel = function(i) {
    return arguments.length ? this.seek(i, !0) : this.previousLabel(this._time + bt);
  }, e.shiftChildren = function(i, a, o) {
    o === void 0 && (o = 0);
    var s = this._first, l = this.labels, c;
    for (i = Et(i); s; )
      s._start >= o && (s._start += i, s._end += i), s = s._next;
    if (a)
      for (c in l)
        l[c] >= o && (l[c] += i);
    return Hn(this);
  }, e.invalidate = function(i) {
    var a = this._first;
    for (this._lock = 0; a; )
      a.invalidate(i), a = a._next;
    return n.prototype.invalidate.call(this, i);
  }, e.clear = function(i) {
    i === void 0 && (i = !0);
    for (var a = this._first, o; a; )
      o = a._next, this.remove(a), a = o;
    return this._dp && (this._time = this._tTime = this._pTime = 0), i && (this.labels = {}), Hn(this);
  }, e.totalDuration = function(i) {
    var a = 0, o = this, s = o._last, l = tr, c, d, p;
    if (arguments.length)
      return o.timeScale((o._repeat < 0 ? o.duration() : o.totalDuration()) / (o.reversed() ? -i : i));
    if (o._dirty) {
      for (p = o.parent; s; )
        c = s._prev, s._dirty && s.totalDuration(), d = s._start, d > l && o._sort && s._ts && !o._lock ? (o._lock = 1, Ir(o, s, d - s._delay, 1)._lock = 0) : l = d, d < 0 && s._ts && (a -= d, (!p && !o._dp || p && p.smoothChildTiming) && (o._start += Et(d / o._ts), o._time -= d, o._tTime -= d), o.shiftChildren(-d, !1, -1 / 0), l = 0), s._end > a && s._ts && (a = s._end), s = c;
      ji(o, o === Tt && o._time > a ? o._time : a, 1, 1), o._dirty = 0;
    }
    return o._tDur;
  }, t.updateRoot = function(i) {
    if (Tt._ts && (ep(Tt, To(i, Tt)), $d = Ue.frame), Ue.frame >= mc) {
      mc += _e.autoSleep || 120;
      var a = Tt._first;
      if ((!a || !a._ts) && _e.autoSleep && Ue._listeners.length < 2) {
        for (; a && !a._ts; )
          a = a._next;
        a || Ue.sleep();
      }
    }
  }, t;
}(Pa);
Ke(me.prototype, {
  _lock: 0,
  _hasPause: 0,
  _forcing: 0
});
var Dh = function(t, e, r, i, a, o, s) {
  var l = new Oe(this._pt, t, e, 0, 1, Op, null, a), c = 0, d = 0, p, u, m, g, f, v, b, A;
  for (l.b = r, l.e = i, r += "", i += "", (b = ~i.indexOf("random(")) && (i = Ma(i)), o && (A = [r, i], o(A, t, e), r = A[0], i = A[1]), u = r.match(As) || []; p = As.exec(i); )
    g = p[0], f = i.substring(c, p.index), m ? m = (m + 1) % 5 : f.substr(-5) === "rgba(" && (m = 1), g !== u[d++] && (v = parseFloat(u[d - 1]) || 0, l._pt = {
      _next: l._pt,
      p: f || d === 1 ? f : ",",
      //note: SVG spec allows omission of comma/space when a negative sign is wedged between two numbers, like 2.5-5.3 instead of 2.5,-5.3 but when tweening, the negative value may switch to positive, so we insert the comma just in case.
      s: v,
      c: g.charAt(1) === "=" ? ki(v, g) - v : parseFloat(g) - v,
      m: m && m < 4 ? Math.round : 0
    }, c = As.lastIndex);
  return l.c = c < i.length ? i.substring(c, i.length) : "", l.fp = s, (Hd.test(i) || b) && (l.e = 0), this._pt = l, l;
}, Yl = function(t, e, r, i, a, o, s, l, c, d) {
  Vt(i) && (i = i(a || 0, t, o));
  var p = t[e], u = r !== "get" ? r : Vt(p) ? c ? t[e.indexOf("set") || !Vt(t["get" + e.substr(3)]) ? e : "get" + e.substr(3)](c) : t[e]() : p, m = Vt(p) ? c ? Gh : Tp : Dl, g;
  if (Ht(i) && (~i.indexOf("random(") && (i = Ma(i)), i.charAt(1) === "=" && (g = ki(u, i) + (oe(u) || 0), (g || g === 0) && (i = g))), !d || u !== i || al)
    return !isNaN(u * i) && i !== "" ? (g = new Oe(this._pt, t, e, +u || 0, i - (u || 0), typeof p == "boolean" ? _h : Mp, 0, m), c && (g.fp = c), s && g.modifier(s, this, t), this._pt = g) : (!p && !(e in t) && Cl(e, i), Dh.call(this, t, e, u, i, m, l || _e.stringFilter, c));
}, Fh = function(t, e, r, i, a) {
  if (Vt(t) && (t = Sa(t, a, e, r, i)), !Nr(t) || t.style && t.nodeType || se(t) || Zd(t))
    return Ht(t) ? Sa(t, a, e, r, i) : t;
  var o = {}, s;
  for (s in t)
    o[s] = Sa(t[s], a, e, r, i);
  return o;
}, Sp = function(t, e, r, i, a, o) {
  var s, l, c, d;
  if (Be[t] && (s = new Be[t]()).init(a, s.rawVars ? e[t] : Fh(e[t], i, a, o, r), r, i, o) !== !1 && (r._pt = l = new Oe(r._pt, a, t, 0, 1, s.render, s, 0, s.priority), r !== wi))
    for (c = r._ptLookup[r._targets.indexOf(a)], d = s._props.length; d--; )
      c[s._props[d]] = l;
  return s;
}, fn, al, Ll = function n(t, e, r) {
  var i = t.vars, a = i.ease, o = i.startAt, s = i.immediateRender, l = i.lazy, c = i.onUpdate, d = i.runBackwards, p = i.yoyoEase, u = i.keyframes, m = i.autoRevert, g = t._dur, f = t._startAt, v = t._targets, b = t.parent, A = b && b.data === "nested" ? b.vars.targets : v, x = t._overwrite === "auto" && !Ml, y = t.timeline, k, M, T, O, z, N, F, L, K, ot, dt, lt, P;
  if (y && (!u || !a) && (a = "none"), t._ease = Qn(a, Fi.ease), t._yEase = p ? yp(Qn(p === !0 ? a : p, Fi.ease)) : 0, p && t._yoyo && !t._repeat && (p = t._yEase, t._yEase = t._ease, t._ease = p), t._from = !y && !!i.runBackwards, !y || u && !i.stagger) {
    if (L = v[0] ? Kn(v[0]).harness : 0, lt = L && i[L.prop], k = Eo(i, Rl), f && (f._zTime < 0 && f.progress(1), e < 0 && d && s && !m ? f.render(-1, !0) : f.revert(d && g ? mo : hh), f._lazy = 0), o) {
      if (kn(t._startAt = Bt.set(v, Ke({
        data: "isStart",
        overwrite: !1,
        parent: b,
        immediateRender: !0,
        lazy: !f && Te(l),
        startAt: null,
        delay: 0,
        onUpdate: c && function() {
          return je(t, "onUpdate");
        },
        stagger: 0
      }, o))), t._startAt._dp = 0, t._startAt._sat = t, e < 0 && (ee || !s && !m) && t._startAt.revert(mo), s && g && e <= 0 && r <= 0) {
        e && (t._zTime = e);
        return;
      }
    } else if (d && g && !f) {
      if (e && (s = !1), T = Ke({
        overwrite: !1,
        data: "isFromStart",
        //we tag the tween with as "isFromStart" so that if [inside a plugin] we need to only do something at the very END of a tween, we have a way of identifying this tween as merely the one that's setting the beginning values for a "from()" tween. For example, clearProps in CSSPlugin should only get applied at the very END of a tween and without this tag, from(...{height:100, clearProps:"height", delay:1}) would wipe the height at the beginning of the tween and after 1 second, it'd kick back in.
        lazy: s && !f && Te(l),
        immediateRender: s,
        //zero-duration tweens render immediately by default, but if we're not specifically instructed to render this tween immediately, we should skip this and merely _init() to record the starting values (rendering them immediately would push them to completion which is wasteful in that case - we'd have to render(-1) immediately after)
        stagger: 0,
        parent: b
        //ensures that nested tweens that had a stagger are handled properly, like gsap.from(".class", {y: gsap.utils.wrap([-100,100]), stagger: 0.5})
      }, k), lt && (T[L.prop] = lt), kn(t._startAt = Bt.set(v, T)), t._startAt._dp = 0, t._startAt._sat = t, e < 0 && (ee ? t._startAt.revert(mo) : t._startAt.render(-1, !0)), t._zTime = e, !s)
        n(t._startAt, bt, bt);
      else if (!e)
        return;
    }
    for (t._pt = t._ptCache = 0, l = g && Te(l) || l && !g, M = 0; M < v.length; M++) {
      if (z = v[M], F = z._gsap || ql(v)[M]._gsap, t._ptLookup[M] = ot = {}, $s[F.id] && xn.length && zo(), dt = A === v ? M : A.indexOf(z), L && (K = new L()).init(z, lt || k, t, dt, A) !== !1 && (t._pt = O = new Oe(t._pt, z, K.name, 0, 1, K.render, K, 0, K.priority), K._props.forEach(function(Y) {
        ot[Y] = O;
      }), K.priority && (N = 1)), !L || lt)
        for (T in k)
          Be[T] && (K = Sp(T, k, t, dt, z, A)) ? K.priority && (N = 1) : ot[T] = O = Yl.call(t, z, T, "get", k[T], dt, A, 0, i.stringFilter);
      t._op && t._op[M] && t.kill(z, t._op[M]), x && t._pt && (fn = t, Tt.killTweensOf(z, ot, t.globalTime(e)), P = !t.parent, fn = 0), t._pt && l && ($s[F.id] = 1);
    }
    N && Pp(t), t._onInit && t._onInit(t);
  }
  t._onUpdate = c, t._initted = (!t._op || t._pt) && !P, u && e <= 0 && y.render(tr, !0, !0);
}, Bh = function(t, e, r, i, a, o, s, l) {
  var c = (t._pt && t._ptCache || (t._ptCache = {}))[e], d, p, u, m;
  if (!c)
    for (c = t._ptCache[e] = [], u = t._ptLookup, m = t._targets.length; m--; ) {
      if (d = u[m][e], d && d.d && d.d._pt)
        for (d = d.d._pt; d && d.p !== e && d.fp !== e; )
          d = d._next;
      if (!d)
        return al = 1, t.vars[e] = "+=0", Ll(t, s), al = 0, l ? Ea(e + " not eligible for reset") : 1;
      c.push(d);
    }
  for (m = c.length; m--; )
    p = c[m], d = p._pt || p, d.s = (i || i === 0) && !a ? i : d.s + (i || 0) + o * d.c, d.c = r - d.s, p.e && (p.e = Yt(r) + oe(p.e)), p.b && (p.b = d.s + oe(p.b));
}, Uh = function(t, e) {
  var r = t[0] ? Kn(t[0]).harness : 0, i = r && r.aliases, a, o, s, l;
  if (!i)
    return e;
  a = Bi({}, e);
  for (o in i)
    if (o in a)
      for (l = i[o].split(","), s = l.length; s--; )
        a[l[s]] = a[o];
  return a;
}, jh = function(t, e, r, i) {
  var a = e.ease || i || "power1.inOut", o, s;
  if (se(e))
    s = r[t] || (r[t] = []), e.forEach(function(l, c) {
      return s.push({
        t: c / (e.length - 1) * 100,
        v: l,
        e: a
      });
    });
  else
    for (o in e)
      s = r[o] || (r[o] = []), o === "ease" || s.push({
        t: parseFloat(t),
        v: e[o],
        e: a
      });
}, Sa = function(t, e, r, i, a) {
  return Vt(t) ? t.call(e, r, i, a) : Ht(t) && ~t.indexOf("random(") ? Ma(t) : t;
}, zp = Vl + "repeat,repeatDelay,yoyo,repeatRefresh,yoyoEase,autoRevert", Ep = {};
Me(zp + ",id,stagger,delay,duration,paused,scrollTrigger", function(n) {
  return Ep[n] = 1;
});
var Bt = /* @__PURE__ */ function(n) {
  Xd(t, n);
  function t(r, i, a, o) {
    var s;
    typeof i == "number" && (a.duration = i, i = a, a = null), s = n.call(this, o ? i : ka(i)) || this;
    var l = s.vars, c = l.duration, d = l.delay, p = l.immediateRender, u = l.stagger, m = l.overwrite, g = l.keyframes, f = l.defaults, v = l.scrollTrigger, b = l.yoyoEase, A = i.parent || Tt, x = (se(r) || Zd(r) ? Wr(r[0]) : "length" in i) ? [r] : er(r), y, k, M, T, O, z, N, F;
    if (s._targets = x.length ? ql(x) : Ea("GSAP target " + r + " not found. https://gsap.com", !_e.nullTargetWarn) || [], s._ptLookup = [], s._overwrite = m, g || u || po(c) || po(d)) {
      if (i = s.vars, y = s.timeline = new me({
        data: "nested",
        defaults: f || {},
        targets: A && A.data === "nested" ? A.vars.targets : x
      }), y.kill(), y.parent = y._dp = Xr(s), y._start = 0, u || po(c) || po(d)) {
        if (T = x.length, N = u && dp(u), Nr(u))
          for (O in u)
            ~zp.indexOf(O) && (F || (F = {}), F[O] = u[O]);
        for (k = 0; k < T; k++)
          M = Eo(i, Ep), M.stagger = 0, b && (M.yoyoEase = b), F && Bi(M, F), z = x[k], M.duration = +Sa(c, Xr(s), k, z, x), M.delay = (+Sa(d, Xr(s), k, z, x) || 0) - s._delay, !u && T === 1 && M.delay && (s._delay = d = M.delay, s._start += d, M.delay = 0), y.to(z, M, N ? N(k, z, x) : 0), y._ease = at.none;
        y.duration() ? c = d = 0 : s.timeline = 0;
      } else if (g) {
        ka(Ke(y.vars.defaults, {
          ease: "none"
        })), y._ease = Qn(g.ease || i.ease || "none");
        var L = 0, K, ot, dt;
        if (se(g))
          g.forEach(function(lt) {
            return y.to(x, lt, ">");
          }), y.duration();
        else {
          M = {};
          for (O in g)
            O === "ease" || O === "easeEach" || jh(O, g[O], M, g.easeEach);
          for (O in M)
            for (K = M[O].sort(function(lt, P) {
              return lt.t - P.t;
            }), L = 0, k = 0; k < K.length; k++)
              ot = K[k], dt = {
                ease: ot.e,
                duration: (ot.t - (k ? K[k - 1].t : 0)) / 100 * c
              }, dt[O] = ot.v, y.to(x, dt, L), L += dt.duration;
          y.duration() < c && y.to({}, {
            duration: c - y.duration()
          });
        }
      }
      c || s.duration(c = y.duration());
    } else
      s.timeline = 0;
    return m === !0 && !Ml && (fn = Xr(s), Tt.killTweensOf(x), fn = 0), Ir(A, Xr(s), a), i.reversed && s.reverse(), i.paused && s.paused(!0), (p || !c && !g && s._start === Et(A._time) && Te(p) && yh(Xr(s)) && A.data !== "nested") && (s._tTime = -bt, s.render(Math.max(0, -d) || 0)), v && op(Xr(s), v), s;
  }
  var e = t.prototype;
  return e.render = function(i, a, o) {
    var s = this._time, l = this._tDur, c = this._dur, d = i < 0, p = i > l - bt && !d ? l : i < bt ? 0 : i, u, m, g, f, v, b, A, x, y;
    if (!c)
      kh(this, i, a, o);
    else if (p !== this._tTime || !i || o || !this._initted && this._tTime || this._startAt && this._zTime < 0 !== d || this._lazy) {
      if (u = p, x = this.timeline, this._repeat) {
        if (f = c + this._rDelay, this._repeat < -1 && d)
          return this.totalTime(f * 100 + i, a, o);
        if (u = Et(p % f), p === l ? (g = this._repeat, u = c) : (v = Et(p / f), g = ~~v, g && g === v ? (u = c, g--) : u > c && (u = c)), b = this._yoyo && g & 1, b && (y = this._yEase, u = c - u), v = Ui(this._tTime, f), u === s && !o && this._initted && g === v)
          return this._tTime = p, this;
        g !== v && (x && this._yEase && wp(x, b), this.vars.repeatRefresh && !b && !this._lock && u !== f && this._initted && (this._lock = o = 1, this.render(Et(f * g), !0).invalidate()._lock = 0));
      }
      if (!this._initted) {
        if (sp(this, d ? i : u, o, a, p))
          return this._tTime = 0, this;
        if (s !== this._time && !(o && this.vars.repeatRefresh && g !== v))
          return this;
        if (c !== this._dur)
          return this.render(i, a, o);
      }
      if (this._tTime = p, this._time = u, !this._act && this._ts && (this._act = 1, this._lazy = 0), this.ratio = A = (y || this._ease)(u / c), this._from && (this.ratio = A = 1 - A), !s && p && !a && !v && (je(this, "onStart"), this._tTime !== p))
        return this;
      for (m = this._pt; m; )
        m.r(A, m.d), m = m._next;
      x && x.render(i < 0 ? i : x._dur * x._ease(u / this._dur), a, o) || this._startAt && (this._zTime = i), this._onUpdate && !a && (d && tl(this, i, a, o), je(this, "onUpdate")), this._repeat && g !== v && this.vars.onRepeat && !a && this.parent && je(this, "onRepeat"), (p === this._tDur || !p) && this._tTime === p && (d && !this._onUpdate && tl(this, i, !0, !0), (i || !c) && (p === this._tDur && this._ts > 0 || !p && this._ts < 0) && kn(this, 1), !a && !(d && !s) && (p || s || b) && (je(this, p === l ? "onComplete" : "onReverseComplete", !0), this._prom && !(p < l && this.timeScale() > 0) && this._prom()));
    }
    return this;
  }, e.targets = function() {
    return this._targets;
  }, e.invalidate = function(i) {
    return (!i || !this.vars.runBackwards) && (this._startAt = 0), this._pt = this._op = this._onUpdate = this._lazy = this.ratio = 0, this._ptLookup = [], this.timeline && this.timeline.invalidate(i), n.prototype.invalidate.call(this, i);
  }, e.resetTo = function(i, a, o, s, l) {
    Oa || Ue.wake(), this._ts || this.play();
    var c = Math.min(this._dur, (this._dp._time - this._start) * this._ts), d;
    return this._initted || Ll(this, c), d = this._ease(c / this._dur), Bh(this, i, a, o, s, d, c, l) ? this.resetTo(i, a, o, s, 1) : (Bo(this, 0), this.parent || ip(this._dp, this, "_first", "_last", this._dp._sort ? "_start" : 0), this.render(0));
  }, e.kill = function(i, a) {
    if (a === void 0 && (a = "all"), !i && (!a || a === "all"))
      return this._lazy = this._pt = 0, this.parent ? ma(this) : this.scrollTrigger && this.scrollTrigger.kill(!!ee), this;
    if (this.timeline) {
      var o = this.timeline.totalDuration();
      return this.timeline.killTweensOf(i, a, fn && fn.vars.overwrite !== !0)._first || ma(this), this.parent && o !== this.timeline.totalDuration() && ji(this, this._dur * this.timeline._tDur / o, 0, 1), this;
    }
    var s = this._targets, l = i ? er(i) : s, c = this._ptLookup, d = this._pt, p, u, m, g, f, v, b;
    if ((!a || a === "all") && xh(s, l))
      return a === "all" && (this._pt = 0), ma(this);
    for (p = this._op = this._op || [], a !== "all" && (Ht(a) && (f = {}, Me(a, function(A) {
      return f[A] = 1;
    }), a = f), a = Uh(s, a)), b = s.length; b--; )
      if (~l.indexOf(s[b])) {
        u = c[b], a === "all" ? (p[b] = a, g = u, m = {}) : (m = p[b] = p[b] || {}, g = a);
        for (f in g)
          v = u && u[f], v && ((!("kill" in v.d) || v.d.kill(f) === !0) && Do(this, v, "_pt"), delete u[f]), m !== "all" && (m[f] = 1);
      }
    return this._initted && !this._pt && d && ma(this), this;
  }, t.to = function(i, a) {
    return new t(i, a, arguments[2]);
  }, t.from = function(i, a) {
    return Aa(1, arguments);
  }, t.delayedCall = function(i, a, o, s) {
    return new t(a, 0, {
      immediateRender: !1,
      lazy: !1,
      overwrite: !1,
      delay: i,
      onComplete: a,
      onReverseComplete: a,
      onCompleteParams: o,
      onReverseCompleteParams: o,
      callbackScope: s
    });
  }, t.fromTo = function(i, a, o) {
    return Aa(2, arguments);
  }, t.set = function(i, a) {
    return a.duration = 0, a.repeatDelay || (a.repeat = 0), new t(i, a);
  }, t.killTweensOf = function(i, a, o) {
    return Tt.killTweensOf(i, a, o);
  }, t;
}(Pa);
Ke(Bt.prototype, {
  _targets: [],
  _lazy: 0,
  _startAt: 0,
  _op: 0,
  _onInit: 0
});
Me("staggerTo,staggerFrom,staggerFromTo", function(n) {
  Bt[n] = function() {
    var t = new me(), e = rl.call(arguments, 0);
    return e.splice(n === "staggerFromTo" ? 5 : 4, 0, 0), t[n].apply(t, e);
  };
});
var Dl = function(t, e, r) {
  return t[e] = r;
}, Tp = function(t, e, r) {
  return t[e](r);
}, Gh = function(t, e, r, i) {
  return t[e](i.fp, r);
}, Xh = function(t, e, r) {
  return t.setAttribute(e, r);
}, Fl = function(t, e) {
  return Vt(t[e]) ? Tp : Ol(t[e]) && t.setAttribute ? Xh : Dl;
}, Mp = function(t, e) {
  return e.set(e.t, e.p, Math.round((e.s + e.c * t) * 1e6) / 1e6, e);
}, _h = function(t, e) {
  return e.set(e.t, e.p, !!(e.s + e.c * t), e);
}, Op = function(t, e) {
  var r = e._pt, i = "";
  if (!t && e.b)
    i = e.b;
  else if (t === 1 && e.e)
    i = e.e;
  else {
    for (; r; )
      i = r.p + (r.m ? r.m(r.s + r.c * t) : Math.round((r.s + r.c * t) * 1e4) / 1e4) + i, r = r._next;
    i += e.c;
  }
  e.set(e.t, e.p, i, e);
}, Bl = function(t, e) {
  for (var r = e._pt; r; )
    r.r(t, r.d), r = r._next;
}, Zh = function(t, e, r, i) {
  for (var a = this._pt, o; a; )
    o = a._next, a.p === i && a.modifier(t, e, r), a = o;
}, Kh = function(t) {
  for (var e = this._pt, r, i; e; )
    i = e._next, e.p === t && !e.op || e.op === t ? Do(this, e, "_pt") : e.dep || (r = 1), e = i;
  return !r;
}, Hh = function(t, e, r, i) {
  i.mSet(t, e, i.m.call(i.tween, r, i.mt), i);
}, Pp = function(t) {
  for (var e = t._pt, r, i, a, o; e; ) {
    for (r = e._next, i = a; i && i.pr > e.pr; )
      i = i._next;
    (e._prev = i ? i._prev : o) ? e._prev._next = e : a = e, (e._next = i) ? i._prev = e : o = e, e = r;
  }
  t._pt = a;
}, Oe = /* @__PURE__ */ function() {
  function n(e, r, i, a, o, s, l, c, d) {
    this.t = r, this.s = a, this.c = o, this.p = i, this.r = s || Mp, this.d = l || this, this.set = c || Dl, this.pr = d || 0, this._next = e, e && (e._prev = this);
  }
  var t = n.prototype;
  return t.modifier = function(r, i, a) {
    this.mSet = this.mSet || this.set, this.set = Hh, this.m = r, this.mt = a, this.tween = i;
  }, n;
}();
Me(Vl + "parent,duration,ease,delay,overwrite,runBackwards,startAt,yoyo,immediateRender,repeat,repeatDelay,data,paused,reversed,lazy,callbackScope,stringFilter,id,yoyoEase,stagger,inherit,repeatRefresh,keyframes,autoRevert,scrollTrigger", function(n) {
  return Rl[n] = 1;
});
Ze.TweenMax = Ze.TweenLite = Bt;
Ze.TimelineLite = Ze.TimelineMax = me;
Tt = new me({
  sortChildren: !1,
  defaults: Fi,
  autoRemoveChildren: !0,
  id: "root",
  smoothChildTiming: !0
});
_e.stringFilter = bp;
var Wn = [], bo = {}, Qh = [], Ac = 0, Wh = 0, Ms = function(t) {
  return (bo[t] || Qh).map(function(e) {
    return e();
  });
}, ol = function() {
  var t = Date.now(), e = [];
  t - Ac > 2 && (Ms("matchMediaInit"), Wn.forEach(function(r) {
    var i = r.queries, a = r.conditions, o, s, l, c;
    for (s in i)
      o = Er.matchMedia(i[s]).matches, o && (l = 1), o !== a[s] && (a[s] = o, c = 1);
    c && (r.revert(), l && e.push(r));
  }), Ms("matchMediaRevert"), e.forEach(function(r) {
    return r.onMatch(r, function(i) {
      return r.add(null, i);
    });
  }), Ac = t, Ms("matchMedia"));
}, Ip = /* @__PURE__ */ function() {
  function n(e, r) {
    this.selector = r && nl(r), this.data = [], this._r = [], this.isReverted = !1, this.id = Wh++, e && this.add(e);
  }
  var t = n.prototype;
  return t.add = function(r, i, a) {
    Vt(r) && (a = i, i = r, r = Vt);
    var o = this, s = function() {
      var c = St, d = o.selector, p;
      return c && c !== o && c.data.push(o), a && (o.selector = nl(a)), St = o, p = i.apply(o, arguments), Vt(p) && o._r.push(p), St = c, o.selector = d, o.isReverted = !1, p;
    };
    return o.last = s, r === Vt ? s(o, function(l) {
      return o.add(null, l);
    }) : r ? o[r] = s : s;
  }, t.ignore = function(r) {
    var i = St;
    St = null, r(this), St = i;
  }, t.getTweens = function() {
    var r = [];
    return this.data.forEach(function(i) {
      return i instanceof n ? r.push.apply(r, i.getTweens()) : i instanceof Bt && !(i.parent && i.parent.data === "nested") && r.push(i);
    }), r;
  }, t.clear = function() {
    this._r.length = this.data.length = 0;
  }, t.kill = function(r, i) {
    var a = this;
    if (r ? function() {
      for (var s = a.getTweens(), l = a.data.length, c; l--; )
        c = a.data[l], c.data === "isFlip" && (c.revert(), c.getChildren(!0, !0, !1).forEach(function(d) {
          return s.splice(s.indexOf(d), 1);
        }));
      for (s.map(function(d) {
        return {
          g: d._dur || d._delay || d._sat && !d._sat.vars.immediateRender ? d.globalTime(0) : -1 / 0,
          t: d
        };
      }).sort(function(d, p) {
        return p.g - d.g || -1 / 0;
      }).forEach(function(d) {
        return d.t.revert(r);
      }), l = a.data.length; l--; )
        c = a.data[l], c instanceof me ? c.data !== "nested" && (c.scrollTrigger && c.scrollTrigger.revert(), c.kill()) : !(c instanceof Bt) && c.revert && c.revert(r);
      a._r.forEach(function(d) {
        return d(r, a);
      }), a.isReverted = !0;
    }() : this.data.forEach(function(s) {
      return s.kill && s.kill();
    }), this.clear(), i)
      for (var o = Wn.length; o--; )
        Wn[o].id === this.id && Wn.splice(o, 1);
  }, t.revert = function(r) {
    this.kill(r || {});
  }, n;
}(), Jh = /* @__PURE__ */ function() {
  function n(e) {
    this.contexts = [], this.scope = e, St && St.data.push(this);
  }
  var t = n.prototype;
  return t.add = function(r, i, a) {
    Nr(r) || (r = {
      matches: r
    });
    var o = new Ip(0, a || this.scope), s = o.conditions = {}, l, c, d;
    St && !o.selector && (o.selector = St.selector), this.contexts.push(o), i = o.add("onMatch", i), o.queries = r;
    for (c in r)
      c === "all" ? d = 1 : (l = Er.matchMedia(r[c]), l && (Wn.indexOf(o) < 0 && Wn.push(o), (s[c] = l.matches) && (d = 1), l.addListener ? l.addListener(ol) : l.addEventListener("change", ol)));
    return d && i(o, function(p) {
      return o.add(null, p);
    }), this;
  }, t.revert = function(r) {
    this.kill(r || {});
  }, t.kill = function(r) {
    this.contexts.forEach(function(i) {
      return i.kill(r, !0);
    });
  }, n;
}(), Mo = {
  registerPlugin: function() {
    for (var t = arguments.length, e = new Array(t), r = 0; r < t; r++)
      e[r] = arguments[r];
    e.forEach(function(i) {
      return vp(i);
    });
  },
  timeline: function(t) {
    return new me(t);
  },
  getTweensOf: function(t, e) {
    return Tt.getTweensOf(t, e);
  },
  getProperty: function(t, e, r, i) {
    Ht(t) && (t = er(t)[0]);
    var a = Kn(t || {}).get, o = r ? np : rp;
    return r === "native" && (r = ""), t && (e ? o((Be[e] && Be[e].get || a)(t, e, r, i)) : function(s, l, c) {
      return o((Be[s] && Be[s].get || a)(t, s, l, c));
    });
  },
  quickSetter: function(t, e, r) {
    if (t = er(t), t.length > 1) {
      var i = t.map(function(d) {
        return Ce.quickSetter(d, e, r);
      }), a = i.length;
      return function(d) {
        for (var p = a; p--; )
          i[p](d);
      };
    }
    t = t[0] || {};
    var o = Be[e], s = Kn(t), l = s.harness && (s.harness.aliases || {})[e] || e, c = o ? function(d) {
      var p = new o();
      wi._pt = 0, p.init(t, r ? d + r : d, wi, 0, [t]), p.render(1, p), wi._pt && Bl(1, wi);
    } : s.set(t, l);
    return o ? c : function(d) {
      return c(t, l, r ? d + r : d, s, 1);
    };
  },
  quickTo: function(t, e, r) {
    var i, a = Ce.to(t, Ke((i = {}, i[e] = "+=0.1", i.paused = !0, i.stagger = 0, i), r || {})), o = function(l, c, d) {
      return a.resetTo(e, l, c, d);
    };
    return o.tween = a, o;
  },
  isTweening: function(t) {
    return Tt.getTweensOf(t, !0).length > 0;
  },
  defaults: function(t) {
    return t && t.ease && (t.ease = Qn(t.ease, Fi.ease)), xc(Fi, t || {});
  },
  config: function(t) {
    return xc(_e, t || {});
  },
  registerEffect: function(t) {
    var e = t.name, r = t.effect, i = t.plugins, a = t.defaults, o = t.extendTimeline;
    (i || "").split(",").forEach(function(s) {
      return s && !Be[s] && !Ze[s] && Ea(e + " effect requires " + s + " plugin.");
    }), Ss[e] = function(s, l, c) {
      return r(er(s), Ke(l || {}, a), c);
    }, o && (me.prototype[e] = function(s, l, c) {
      return this.add(Ss[e](s, Nr(l) ? l : (c = l) && {}, this), c);
    });
  },
  registerEase: function(t, e) {
    at[t] = Qn(e);
  },
  parseEase: function(t, e) {
    return arguments.length ? Qn(t, e) : at;
  },
  getById: function(t) {
    return Tt.getById(t);
  },
  exportRoot: function(t, e) {
    t === void 0 && (t = {});
    var r = new me(t), i, a;
    for (r.smoothChildTiming = Te(t.smoothChildTiming), Tt.remove(r), r._dp = 0, r._time = r._tTime = Tt._time, i = Tt._first; i; )
      a = i._next, (e || !(!i._dur && i instanceof Bt && i.vars.onComplete === i._targets[0])) && Ir(r, i, i._start - i._delay), i = a;
    return Ir(Tt, r, 0), r;
  },
  context: function(t, e) {
    return t ? new Ip(t, e) : St;
  },
  matchMedia: function(t) {
    return new Jh(t);
  },
  matchMediaRefresh: function() {
    return Wn.forEach(function(t) {
      var e = t.conditions, r, i;
      for (i in e)
        e[i] && (e[i] = !1, r = 1);
      r && t.revert();
    }) || ol();
  },
  addEventListener: function(t, e) {
    var r = bo[t] || (bo[t] = []);
    ~r.indexOf(e) || r.push(e);
  },
  removeEventListener: function(t, e) {
    var r = bo[t], i = r && r.indexOf(e);
    i >= 0 && r.splice(i, 1);
  },
  utils: {
    wrap: Ph,
    wrapYoyo: Ih,
    distribute: dp,
    random: fp,
    snap: pp,
    normalize: Oh,
    getUnit: oe,
    clamp: zh,
    splitColor: mp,
    toArray: er,
    selector: nl,
    mapRange: hp,
    pipe: Th,
    unitize: Mh,
    interpolate: Ch,
    shuffle: cp
  },
  install: Wd,
  effects: Ss,
  ticker: Ue,
  updateRoot: me.updateRoot,
  plugins: Be,
  globalTimeline: Tt,
  core: {
    PropTween: Oe,
    globals: Jd,
    Tween: Bt,
    Timeline: me,
    Animation: Pa,
    getCache: Kn,
    _removeLinkedListItem: Do,
    reverting: function() {
      return ee;
    },
    context: function(t) {
      return t && St && (St.data.push(t), t._ctx = St), St;
    },
    suppressOverwrites: function(t) {
      return Ml = t;
    }
  }
};
Me("to,from,fromTo,delayedCall,set,killTweensOf", function(n) {
  return Mo[n] = Bt[n];
});
Ue.add(me.updateRoot);
wi = Mo.to({}, {
  duration: 0
});
var $h = function(t, e) {
  for (var r = t._pt; r && r.p !== e && r.op !== e && r.fp !== e; )
    r = r._next;
  return r;
}, t1 = function(t, e) {
  var r = t._targets, i, a, o;
  for (i in e)
    for (a = r.length; a--; )
      o = t._ptLookup[a][i], o && (o = o.d) && (o._pt && (o = $h(o, i)), o && o.modifier && o.modifier(e[i], t, r[a], i));
}, Os = function(t, e) {
  return {
    name: t,
    headless: 1,
    rawVars: 1,
    //don't pre-process function-based values or "random()" strings.
    init: function(i, a, o) {
      o._onInit = function(s) {
        var l, c;
        if (Ht(a) && (l = {}, Me(a, function(d) {
          return l[d] = 1;
        }), a = l), e) {
          l = {};
          for (c in a)
            l[c] = e(a[c]);
          a = l;
        }
        t1(s, a);
      };
    }
  };
}, Ce = Mo.registerPlugin({
  name: "attr",
  init: function(t, e, r, i, a) {
    var o, s, l;
    this.tween = r;
    for (o in e)
      l = t.getAttribute(o) || "", s = this.add(t, "setAttribute", (l || 0) + "", e[o], i, a, 0, 0, o), s.op = o, s.b = l, this._props.push(o);
  },
  render: function(t, e) {
    for (var r = e._pt; r; )
      ee ? r.set(r.t, r.p, r.b, r) : r.r(t, r.d), r = r._next;
  }
}, {
  name: "endArray",
  headless: 1,
  init: function(t, e) {
    for (var r = e.length; r--; )
      this.add(t, r, t[r] || 0, e[r], 0, 0, 0, 0, 0, 1);
  }
}, Os("roundProps", il), Os("modifiers"), Os("snap", pp)) || Mo;
Bt.version = me.version = Ce.version = "3.14.2";
Qd = 1;
Pl() && Gi();
at.Power0;
at.Power1;
at.Power2;
at.Power3;
at.Power4;
at.Linear;
at.Quad;
at.Cubic;
at.Quart;
at.Quint;
at.Strong;
at.Elastic;
at.Back;
at.SteppedEase;
at.Bounce;
at.Sine;
at.Expo;
at.Circ;
/*!
 * CSSPlugin 3.14.2
 * https://gsap.com
 *
 * Copyright 2008-2025, GreenSock. All rights reserved.
 * Subject to the terms at https://gsap.com/standard-license
 * @author: Jack Doyle, jack@greensock.com
*/
var Sc, un, Ai, Ul, Un, zc, jl, e1 = function() {
  return typeof window < "u";
}, Jr = {}, Ln = 180 / Math.PI, Si = Math.PI / 180, gi = Math.atan2, Ec = 1e8, Gl = /([A-Z])/g, r1 = /(left|right|width|margin|padding|x)/i, n1 = /[\s,\(]\S/, Rr = {
  autoAlpha: "opacity,visibility",
  scale: "scaleX,scaleY",
  alpha: "opacity"
}, sl = function(t, e) {
  return e.set(e.t, e.p, Math.round((e.s + e.c * t) * 1e4) / 1e4 + e.u, e);
}, i1 = function(t, e) {
  return e.set(e.t, e.p, t === 1 ? e.e : Math.round((e.s + e.c * t) * 1e4) / 1e4 + e.u, e);
}, a1 = function(t, e) {
  return e.set(e.t, e.p, t ? Math.round((e.s + e.c * t) * 1e4) / 1e4 + e.u : e.b, e);
}, o1 = function(t, e) {
  return e.set(e.t, e.p, t === 1 ? e.e : t ? Math.round((e.s + e.c * t) * 1e4) / 1e4 + e.u : e.b, e);
}, s1 = function(t, e) {
  var r = e.s + e.c * t;
  e.set(e.t, e.p, ~~(r + (r < 0 ? -0.5 : 0.5)) + e.u, e);
}, Cp = function(t, e) {
  return e.set(e.t, e.p, t ? e.e : e.b, e);
}, Rp = function(t, e) {
  return e.set(e.t, e.p, t !== 1 ? e.b : e.e, e);
}, l1 = function(t, e, r) {
  return t.style[e] = r;
}, c1 = function(t, e, r) {
  return t.style.setProperty(e, r);
}, d1 = function(t, e, r) {
  return t._gsap[e] = r;
}, p1 = function(t, e, r) {
  return t._gsap.scaleX = t._gsap.scaleY = r;
}, f1 = function(t, e, r, i, a) {
  var o = t._gsap;
  o.scaleX = o.scaleY = r, o.renderTransform(a, o);
}, u1 = function(t, e, r, i, a) {
  var o = t._gsap;
  o[e] = r, o.renderTransform(a, o);
}, Mt = "transform", Pe = Mt + "Origin", h1 = function n(t, e) {
  var r = this, i = this.target, a = i.style, o = i._gsap;
  if (t in Jr && a) {
    if (this.tfm = this.tfm || {}, t !== "transform")
      t = Rr[t] || t, ~t.indexOf(",") ? t.split(",").forEach(function(s) {
        return r.tfm[s] = Zr(i, s);
      }) : this.tfm[t] = o.x ? o[t] : Zr(i, t), t === Pe && (this.tfm.zOrigin = o.zOrigin);
    else
      return Rr.transform.split(",").forEach(function(s) {
        return n.call(r, s, e);
      });
    if (this.props.indexOf(Mt) >= 0)
      return;
    o.svg && (this.svgo = i.getAttribute("data-svg-origin"), this.props.push(Pe, e, "")), t = Mt;
  }
  (a || e) && this.props.push(t, e, a[t]);
}, Vp = function(t) {
  t.translate && (t.removeProperty("translate"), t.removeProperty("scale"), t.removeProperty("rotate"));
}, g1 = function() {
  var t = this.props, e = this.target, r = e.style, i = e._gsap, a, o;
  for (a = 0; a < t.length; a += 3)
    t[a + 1] ? t[a + 1] === 2 ? e[t[a]](t[a + 2]) : e[t[a]] = t[a + 2] : t[a + 2] ? r[t[a]] = t[a + 2] : r.removeProperty(t[a].substr(0, 2) === "--" ? t[a] : t[a].replace(Gl, "-$1").toLowerCase());
  if (this.tfm) {
    for (o in this.tfm)
      i[o] = this.tfm[o];
    i.svg && (i.renderTransform(), e.setAttribute("data-svg-origin", this.svgo || "")), a = jl(), (!a || !a.isStart) && !r[Mt] && (Vp(r), i.zOrigin && r[Pe] && (r[Pe] += " " + i.zOrigin + "px", i.zOrigin = 0, i.renderTransform()), i.uncache = 1);
  }
}, qp = function(t, e) {
  var r = {
    target: t,
    props: [],
    revert: g1,
    save: h1
  };
  return t._gsap || Ce.core.getCache(t), e && t.style && t.nodeType && e.split(",").forEach(function(i) {
    return r.save(i);
  }), r;
}, Np, ll = function(t, e) {
  var r = un.createElementNS ? un.createElementNS((e || "http://www.w3.org/1999/xhtml").replace(/^https/, "http"), t) : un.createElement(t);
  return r && r.style ? r : un.createElement(t);
}, Ge = function n(t, e, r) {
  var i = getComputedStyle(t);
  return i[e] || i.getPropertyValue(e.replace(Gl, "-$1").toLowerCase()) || i.getPropertyValue(e) || !r && n(t, Xi(e) || e, 1) || "";
}, Tc = "O,Moz,ms,Ms,Webkit".split(","), Xi = function(t, e, r) {
  var i = e || Un, a = i.style, o = 5;
  if (t in a && !r)
    return t;
  for (t = t.charAt(0).toUpperCase() + t.substr(1); o-- && !(Tc[o] + t in a); )
    ;
  return o < 0 ? null : (o === 3 ? "ms" : o >= 0 ? Tc[o] : "") + t;
}, cl = function() {
  e1() && window.document && (Sc = window, un = Sc.document, Ai = un.documentElement, Un = ll("div") || {
    style: {}
  }, ll("div"), Mt = Xi(Mt), Pe = Mt + "Origin", Un.style.cssText = "border-width:0;line-height:0;position:absolute;padding:0", Np = !!Xi("perspective"), jl = Ce.core.reverting, Ul = 1);
}, Mc = function(t) {
  var e = t.ownerSVGElement, r = ll("svg", e && e.getAttribute("xmlns") || "http://www.w3.org/2000/svg"), i = t.cloneNode(!0), a;
  i.style.display = "block", r.appendChild(i), Ai.appendChild(r);
  try {
    a = i.getBBox();
  } catch {
  }
  return r.removeChild(i), Ai.removeChild(r), a;
}, Oc = function(t, e) {
  for (var r = e.length; r--; )
    if (t.hasAttribute(e[r]))
      return t.getAttribute(e[r]);
}, Yp = function(t) {
  var e, r;
  try {
    e = t.getBBox();
  } catch {
    e = Mc(t), r = 1;
  }
  return e && (e.width || e.height) || r || (e = Mc(t)), e && !e.width && !e.x && !e.y ? {
    x: +Oc(t, ["x", "cx", "x1"]) || 0,
    y: +Oc(t, ["y", "cy", "y1"]) || 0,
    width: 0,
    height: 0
  } : e;
}, Lp = function(t) {
  return !!(t.getCTM && (!t.parentNode || t.ownerSVGElement) && Yp(t));
}, An = function(t, e) {
  if (e) {
    var r = t.style, i;
    e in Jr && e !== Pe && (e = Mt), r.removeProperty ? (i = e.substr(0, 2), (i === "ms" || e.substr(0, 6) === "webkit") && (e = "-" + e), r.removeProperty(i === "--" ? e : e.replace(Gl, "-$1").toLowerCase())) : r.removeAttribute(e);
  }
}, hn = function(t, e, r, i, a, o) {
  var s = new Oe(t._pt, e, r, 0, 1, o ? Rp : Cp);
  return t._pt = s, s.b = i, s.e = a, t._props.push(r), s;
}, Pc = {
  deg: 1,
  rad: 1,
  turn: 1
}, v1 = {
  grid: 1,
  flex: 1
}, Sn = function n(t, e, r, i) {
  var a = parseFloat(r) || 0, o = (r + "").trim().substr((a + "").length) || "px", s = Un.style, l = r1.test(e), c = t.tagName.toLowerCase() === "svg", d = (c ? "client" : "offset") + (l ? "Width" : "Height"), p = 100, u = i === "px", m = i === "%", g, f, v, b;
  if (i === o || !a || Pc[i] || Pc[o])
    return a;
  if (o !== "px" && !u && (a = n(t, e, r, "px")), b = t.getCTM && Lp(t), (m || o === "%") && (Jr[e] || ~e.indexOf("adius")))
    return g = b ? t.getBBox()[l ? "width" : "height"] : t[d], Yt(m ? a / g * p : a / 100 * g);
  if (s[l ? "width" : "height"] = p + (u ? o : i), f = i !== "rem" && ~e.indexOf("adius") || i === "em" && t.appendChild && !c ? t : t.parentNode, b && (f = (t.ownerSVGElement || {}).parentNode), (!f || f === un || !f.appendChild) && (f = un.body), v = f._gsap, v && m && v.width && l && v.time === Ue.time && !v.uncache)
    return Yt(a / v.width * p);
  if (m && (e === "height" || e === "width")) {
    var A = t.style[e];
    t.style[e] = p + i, g = t[d], A ? t.style[e] = A : An(t, e);
  } else
    (m || o === "%") && !v1[Ge(f, "display")] && (s.position = Ge(t, "position")), f === t && (s.position = "static"), f.appendChild(Un), g = Un[d], f.removeChild(Un), s.position = "absolute";
  return l && m && (v = Kn(f), v.time = Ue.time, v.width = f[d]), Yt(u ? g * a / p : g && a ? p / g * a : 0);
}, Zr = function(t, e, r, i) {
  var a;
  return Ul || cl(), e in Rr && e !== "transform" && (e = Rr[e], ~e.indexOf(",") && (e = e.split(",")[0])), Jr[e] && e !== "transform" ? (a = Ca(t, i), a = e !== "transformOrigin" ? a[e] : a.svg ? a.origin : Po(Ge(t, Pe)) + " " + a.zOrigin + "px") : (a = t.style[e], (!a || a === "auto" || i || ~(a + "").indexOf("calc(")) && (a = Oo[e] && Oo[e](t, e, r) || Ge(t, e) || tp(t, e) || (e === "opacity" ? 1 : 0))), r && !~(a + "").trim().indexOf(" ") ? Sn(t, e, a, r) + r : a;
}, m1 = function(t, e, r, i) {
  if (!r || r === "none") {
    var a = Xi(e, t, 1), o = a && Ge(t, a, 1);
    o && o !== r ? (e = a, r = o) : e === "borderColor" && (r = Ge(t, "borderTopColor"));
  }
  var s = new Oe(this._pt, t.style, e, 0, 1, Op), l = 0, c = 0, d, p, u, m, g, f, v, b, A, x, y, k;
  if (s.b = r, s.e = i, r += "", i += "", i.substring(0, 6) === "var(--" && (i = Ge(t, i.substring(4, i.indexOf(")")))), i === "auto" && (f = t.style[e], t.style[e] = i, i = Ge(t, e) || i, f ? t.style[e] = f : An(t, e)), d = [r, i], bp(d), r = d[0], i = d[1], u = r.match(yi) || [], k = i.match(yi) || [], k.length) {
    for (; p = yi.exec(i); )
      v = p[0], A = i.substring(l, p.index), g ? g = (g + 1) % 5 : (A.substr(-5) === "rgba(" || A.substr(-5) === "hsla(") && (g = 1), v !== (f = u[c++] || "") && (m = parseFloat(f) || 0, y = f.substr((m + "").length), v.charAt(1) === "=" && (v = ki(m, v) + y), b = parseFloat(v), x = v.substr((b + "").length), l = yi.lastIndex - x.length, x || (x = x || _e.units[e] || y, l === i.length && (i += x, s.e += x)), y !== x && (m = Sn(t, e, f, x) || 0), s._pt = {
        _next: s._pt,
        p: A || c === 1 ? A : ",",
        //note: SVG spec allows omission of comma/space when a negative sign is wedged between two numbers, like 2.5-5.3 instead of 2.5,-5.3 but when tweening, the negative value may switch to positive, so we insert the comma just in case.
        s: m,
        c: b - m,
        m: g && g < 4 || e === "zIndex" ? Math.round : 0
      });
    s.c = l < i.length ? i.substring(l, i.length) : "";
  } else
    s.r = e === "display" && i === "none" ? Rp : Cp;
  return Hd.test(i) && (s.e = 0), this._pt = s, s;
}, Ic = {
  top: "0%",
  bottom: "100%",
  left: "0%",
  right: "100%",
  center: "50%"
}, x1 = function(t) {
  var e = t.split(" "), r = e[0], i = e[1] || "50%";
  return (r === "top" || r === "bottom" || i === "left" || i === "right") && (t = r, r = i, i = t), e[0] = Ic[r] || r, e[1] = Ic[i] || i, e.join(" ");
}, b1 = function(t, e) {
  if (e.tween && e.tween._time === e.tween._dur) {
    var r = e.t, i = r.style, a = e.u, o = r._gsap, s, l, c;
    if (a === "all" || a === !0)
      i.cssText = "", l = 1;
    else
      for (a = a.split(","), c = a.length; --c > -1; )
        s = a[c], Jr[s] && (l = 1, s = s === "transformOrigin" ? Pe : Mt), An(r, s);
    l && (An(r, Mt), o && (o.svg && r.removeAttribute("transform"), i.scale = i.rotate = i.translate = "none", Ca(r, 1), o.uncache = 1, Vp(i)));
  }
}, Oo = {
  clearProps: function(t, e, r, i, a) {
    if (a.data !== "isFromStart") {
      var o = t._pt = new Oe(t._pt, e, r, 0, 0, b1);
      return o.u = i, o.pr = -10, o.tween = a, t._props.push(r), 1;
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
}, Ia = [1, 0, 0, 1, 0, 0], Dp = {}, Fp = function(t) {
  return t === "matrix(1, 0, 0, 1, 0, 0)" || t === "none" || !t;
}, Cc = function(t) {
  var e = Ge(t, Mt);
  return Fp(e) ? Ia : e.substr(7).match(Kd).map(Yt);
}, Xl = function(t, e) {
  var r = t._gsap || Kn(t), i = t.style, a = Cc(t), o, s, l, c;
  return r.svg && t.getAttribute("transform") ? (l = t.transform.baseVal.consolidate().matrix, a = [l.a, l.b, l.c, l.d, l.e, l.f], a.join(",") === "1,0,0,1,0,0" ? Ia : a) : (a === Ia && !t.offsetParent && t !== Ai && !r.svg && (l = i.display, i.display = "block", o = t.parentNode, (!o || !t.offsetParent && !t.getBoundingClientRect().width) && (c = 1, s = t.nextElementSibling, Ai.appendChild(t)), a = Cc(t), l ? i.display = l : An(t, "display"), c && (s ? o.insertBefore(t, s) : o ? o.appendChild(t) : Ai.removeChild(t))), e && a.length > 6 ? [a[0], a[1], a[4], a[5], a[12], a[13]] : a);
}, dl = function(t, e, r, i, a, o) {
  var s = t._gsap, l = a || Xl(t, !0), c = s.xOrigin || 0, d = s.yOrigin || 0, p = s.xOffset || 0, u = s.yOffset || 0, m = l[0], g = l[1], f = l[2], v = l[3], b = l[4], A = l[5], x = e.split(" "), y = parseFloat(x[0]) || 0, k = parseFloat(x[1]) || 0, M, T, O, z;
  r ? l !== Ia && (T = m * v - g * f) && (O = y * (v / T) + k * (-f / T) + (f * A - v * b) / T, z = y * (-g / T) + k * (m / T) - (m * A - g * b) / T, y = O, k = z) : (M = Yp(t), y = M.x + (~x[0].indexOf("%") ? y / 100 * M.width : y), k = M.y + (~(x[1] || x[0]).indexOf("%") ? k / 100 * M.height : k)), i || i !== !1 && s.smooth ? (b = y - c, A = k - d, s.xOffset = p + (b * m + A * f) - b, s.yOffset = u + (b * g + A * v) - A) : s.xOffset = s.yOffset = 0, s.xOrigin = y, s.yOrigin = k, s.smooth = !!i, s.origin = e, s.originIsAbsolute = !!r, t.style[Pe] = "0px 0px", o && (hn(o, s, "xOrigin", c, y), hn(o, s, "yOrigin", d, k), hn(o, s, "xOffset", p, s.xOffset), hn(o, s, "yOffset", u, s.yOffset)), t.setAttribute("data-svg-origin", y + " " + k);
}, Ca = function(t, e) {
  var r = t._gsap || new Ap(t);
  if ("x" in r && !e && !r.uncache)
    return r;
  var i = t.style, a = r.scaleX < 0, o = "px", s = "deg", l = getComputedStyle(t), c = Ge(t, Pe) || "0", d, p, u, m, g, f, v, b, A, x, y, k, M, T, O, z, N, F, L, K, ot, dt, lt, P, Y, q, _, U, D, it, pt, ft;
  return d = p = u = f = v = b = A = x = y = 0, m = g = 1, r.svg = !!(t.getCTM && Lp(t)), l.translate && ((l.translate !== "none" || l.scale !== "none" || l.rotate !== "none") && (i[Mt] = (l.translate !== "none" ? "translate3d(" + (l.translate + " 0 0").split(" ").slice(0, 3).join(", ") + ") " : "") + (l.rotate !== "none" ? "rotate(" + l.rotate + ") " : "") + (l.scale !== "none" ? "scale(" + l.scale.split(" ").join(",") + ") " : "") + (l[Mt] !== "none" ? l[Mt] : "")), i.scale = i.rotate = i.translate = "none"), T = Xl(t, r.svg), r.svg && (r.uncache ? (Y = t.getBBox(), c = r.xOrigin - Y.x + "px " + (r.yOrigin - Y.y) + "px", P = "") : P = !e && t.getAttribute("data-svg-origin"), dl(t, P || c, !!P || r.originIsAbsolute, r.smooth !== !1, T)), k = r.xOrigin || 0, M = r.yOrigin || 0, T !== Ia && (F = T[0], L = T[1], K = T[2], ot = T[3], d = dt = T[4], p = lt = T[5], T.length === 6 ? (m = Math.sqrt(F * F + L * L), g = Math.sqrt(ot * ot + K * K), f = F || L ? gi(L, F) * Ln : 0, A = K || ot ? gi(K, ot) * Ln + f : 0, A && (g *= Math.abs(Math.cos(A * Si))), r.svg && (d -= k - (k * F + M * K), p -= M - (k * L + M * ot))) : (ft = T[6], it = T[7], _ = T[8], U = T[9], D = T[10], pt = T[11], d = T[12], p = T[13], u = T[14], O = gi(ft, D), v = O * Ln, O && (z = Math.cos(-O), N = Math.sin(-O), P = dt * z + _ * N, Y = lt * z + U * N, q = ft * z + D * N, _ = dt * -N + _ * z, U = lt * -N + U * z, D = ft * -N + D * z, pt = it * -N + pt * z, dt = P, lt = Y, ft = q), O = gi(-K, D), b = O * Ln, O && (z = Math.cos(-O), N = Math.sin(-O), P = F * z - _ * N, Y = L * z - U * N, q = K * z - D * N, pt = ot * N + pt * z, F = P, L = Y, K = q), O = gi(L, F), f = O * Ln, O && (z = Math.cos(O), N = Math.sin(O), P = F * z + L * N, Y = dt * z + lt * N, L = L * z - F * N, lt = lt * z - dt * N, F = P, dt = Y), v && Math.abs(v) + Math.abs(f) > 359.9 && (v = f = 0, b = 180 - b), m = Yt(Math.sqrt(F * F + L * L + K * K)), g = Yt(Math.sqrt(lt * lt + ft * ft)), O = gi(dt, lt), A = Math.abs(O) > 2e-4 ? O * Ln : 0, y = pt ? 1 / (pt < 0 ? -pt : pt) : 0), r.svg && (P = t.getAttribute("transform"), r.forceCSS = t.setAttribute("transform", "") || !Fp(Ge(t, Mt)), P && t.setAttribute("transform", P))), Math.abs(A) > 90 && Math.abs(A) < 270 && (a ? (m *= -1, A += f <= 0 ? 180 : -180, f += f <= 0 ? 180 : -180) : (g *= -1, A += A <= 0 ? 180 : -180)), e = e || r.uncache, r.x = d - ((r.xPercent = d && (!e && r.xPercent || (Math.round(t.offsetWidth / 2) === Math.round(-d) ? -50 : 0))) ? t.offsetWidth * r.xPercent / 100 : 0) + o, r.y = p - ((r.yPercent = p && (!e && r.yPercent || (Math.round(t.offsetHeight / 2) === Math.round(-p) ? -50 : 0))) ? t.offsetHeight * r.yPercent / 100 : 0) + o, r.z = u + o, r.scaleX = Yt(m), r.scaleY = Yt(g), r.rotation = Yt(f) + s, r.rotationX = Yt(v) + s, r.rotationY = Yt(b) + s, r.skewX = A + s, r.skewY = x + s, r.transformPerspective = y + o, (r.zOrigin = parseFloat(c.split(" ")[2]) || !e && r.zOrigin || 0) && (i[Pe] = Po(c)), r.xOffset = r.yOffset = 0, r.force3D = _e.force3D, r.renderTransform = r.svg ? w1 : Np ? Bp : y1, r.uncache = 0, r;
}, Po = function(t) {
  return (t = t.split(" "))[0] + " " + t[1];
}, Ps = function(t, e, r) {
  var i = oe(e);
  return Yt(parseFloat(e) + parseFloat(Sn(t, "x", r + "px", i))) + i;
}, y1 = function(t, e) {
  e.z = "0px", e.rotationY = e.rotationX = "0deg", e.force3D = 0, Bp(t, e);
}, Vn = "0deg", pa = "0px", qn = ") ", Bp = function(t, e) {
  var r = e || this, i = r.xPercent, a = r.yPercent, o = r.x, s = r.y, l = r.z, c = r.rotation, d = r.rotationY, p = r.rotationX, u = r.skewX, m = r.skewY, g = r.scaleX, f = r.scaleY, v = r.transformPerspective, b = r.force3D, A = r.target, x = r.zOrigin, y = "", k = b === "auto" && t && t !== 1 || b === !0;
  if (x && (p !== Vn || d !== Vn)) {
    var M = parseFloat(d) * Si, T = Math.sin(M), O = Math.cos(M), z;
    M = parseFloat(p) * Si, z = Math.cos(M), o = Ps(A, o, T * z * -x), s = Ps(A, s, -Math.sin(M) * -x), l = Ps(A, l, O * z * -x + x);
  }
  v !== pa && (y += "perspective(" + v + qn), (i || a) && (y += "translate(" + i + "%, " + a + "%) "), (k || o !== pa || s !== pa || l !== pa) && (y += l !== pa || k ? "translate3d(" + o + ", " + s + ", " + l + ") " : "translate(" + o + ", " + s + qn), c !== Vn && (y += "rotate(" + c + qn), d !== Vn && (y += "rotateY(" + d + qn), p !== Vn && (y += "rotateX(" + p + qn), (u !== Vn || m !== Vn) && (y += "skew(" + u + ", " + m + qn), (g !== 1 || f !== 1) && (y += "scale(" + g + ", " + f + qn), A.style[Mt] = y || "translate(0, 0)";
}, w1 = function(t, e) {
  var r = e || this, i = r.xPercent, a = r.yPercent, o = r.x, s = r.y, l = r.rotation, c = r.skewX, d = r.skewY, p = r.scaleX, u = r.scaleY, m = r.target, g = r.xOrigin, f = r.yOrigin, v = r.xOffset, b = r.yOffset, A = r.forceCSS, x = parseFloat(o), y = parseFloat(s), k, M, T, O, z;
  l = parseFloat(l), c = parseFloat(c), d = parseFloat(d), d && (d = parseFloat(d), c += d, l += d), l || c ? (l *= Si, c *= Si, k = Math.cos(l) * p, M = Math.sin(l) * p, T = Math.sin(l - c) * -u, O = Math.cos(l - c) * u, c && (d *= Si, z = Math.tan(c - d), z = Math.sqrt(1 + z * z), T *= z, O *= z, d && (z = Math.tan(d), z = Math.sqrt(1 + z * z), k *= z, M *= z)), k = Yt(k), M = Yt(M), T = Yt(T), O = Yt(O)) : (k = p, O = u, M = T = 0), (x && !~(o + "").indexOf("px") || y && !~(s + "").indexOf("px")) && (x = Sn(m, "x", o, "px"), y = Sn(m, "y", s, "px")), (g || f || v || b) && (x = Yt(x + g - (g * k + f * T) + v), y = Yt(y + f - (g * M + f * O) + b)), (i || a) && (z = m.getBBox(), x = Yt(x + i / 100 * z.width), y = Yt(y + a / 100 * z.height)), z = "matrix(" + k + "," + M + "," + T + "," + O + "," + x + "," + y + ")", m.setAttribute("transform", z), A && (m.style[Mt] = z);
}, k1 = function(t, e, r, i, a) {
  var o = 360, s = Ht(a), l = parseFloat(a) * (s && ~a.indexOf("rad") ? Ln : 1), c = l - i, d = i + c + "deg", p, u;
  return s && (p = a.split("_")[1], p === "short" && (c %= o, c !== c % (o / 2) && (c += c < 0 ? o : -o)), p === "cw" && c < 0 ? c = (c + o * Ec) % o - ~~(c / o) * o : p === "ccw" && c > 0 && (c = (c - o * Ec) % o - ~~(c / o) * o)), t._pt = u = new Oe(t._pt, e, r, i, c, i1), u.e = d, u.u = "deg", t._props.push(r), u;
}, Rc = function(t, e) {
  for (var r in e)
    t[r] = e[r];
  return t;
}, A1 = function(t, e, r) {
  var i = Rc({}, r._gsap), a = "perspective,force3D,transformOrigin,svgOrigin", o = r.style, s, l, c, d, p, u, m, g;
  i.svg ? (c = r.getAttribute("transform"), r.setAttribute("transform", ""), o[Mt] = e, s = Ca(r, 1), An(r, Mt), r.setAttribute("transform", c)) : (c = getComputedStyle(r)[Mt], o[Mt] = e, s = Ca(r, 1), o[Mt] = c);
  for (l in Jr)
    c = i[l], d = s[l], c !== d && a.indexOf(l) < 0 && (m = oe(c), g = oe(d), p = m !== g ? Sn(r, l, c, g) : parseFloat(c), u = parseFloat(d), t._pt = new Oe(t._pt, s, l, p, u - p, sl), t._pt.u = g || 0, t._props.push(l));
  Rc(s, i);
};
Me("padding,margin,Width,Radius", function(n, t) {
  var e = "Top", r = "Right", i = "Bottom", a = "Left", o = (t < 3 ? [e, r, i, a] : [e + a, e + r, i + r, i + a]).map(function(s) {
    return t < 2 ? n + s : "border" + s + n;
  });
  Oo[t > 1 ? "border" + n : n] = function(s, l, c, d, p) {
    var u, m;
    if (arguments.length < 4)
      return u = o.map(function(g) {
        return Zr(s, g, c);
      }), m = u.join(" "), m.split(u[0]).length === 5 ? u[0] : m;
    u = (d + "").split(" "), m = {}, o.forEach(function(g, f) {
      return m[g] = u[f] = u[f] || u[(f - 1) / 2 | 0];
    }), s.init(l, m, p);
  };
});
var Up = {
  name: "css",
  register: cl,
  targetTest: function(t) {
    return t.style && t.nodeType;
  },
  init: function(t, e, r, i, a) {
    var o = this._props, s = t.style, l = r.vars.startAt, c, d, p, u, m, g, f, v, b, A, x, y, k, M, T, O, z;
    Ul || cl(), this.styles = this.styles || qp(t), O = this.styles.props, this.tween = r;
    for (f in e)
      if (f !== "autoRound" && (d = e[f], !(Be[f] && Sp(f, e, r, i, t, a)))) {
        if (m = typeof d, g = Oo[f], m === "function" && (d = d.call(r, i, t, a), m = typeof d), m === "string" && ~d.indexOf("random(") && (d = Ma(d)), g)
          g(this, t, f, d, r) && (T = 1);
        else if (f.substr(0, 2) === "--")
          c = (getComputedStyle(t).getPropertyValue(f) + "").trim(), d += "", bn.lastIndex = 0, bn.test(c) || (v = oe(c), b = oe(d), b ? v !== b && (c = Sn(t, f, c, b) + b) : v && (d += v)), this.add(s, "setProperty", c, d, i, a, 0, 0, f), o.push(f), O.push(f, 0, s[f]);
        else if (m !== "undefined") {
          if (l && f in l ? (c = typeof l[f] == "function" ? l[f].call(r, i, t, a) : l[f], Ht(c) && ~c.indexOf("random(") && (c = Ma(c)), oe(c + "") || c === "auto" || (c += _e.units[f] || oe(Zr(t, f)) || ""), (c + "").charAt(1) === "=" && (c = Zr(t, f))) : c = Zr(t, f), u = parseFloat(c), A = m === "string" && d.charAt(1) === "=" && d.substr(0, 2), A && (d = d.substr(2)), p = parseFloat(d), f in Rr && (f === "autoAlpha" && (u === 1 && Zr(t, "visibility") === "hidden" && p && (u = 0), O.push("visibility", 0, s.visibility), hn(this, s, "visibility", u ? "inherit" : "hidden", p ? "inherit" : "hidden", !p)), f !== "scale" && f !== "transform" && (f = Rr[f], ~f.indexOf(",") && (f = f.split(",")[0]))), x = f in Jr, x) {
            if (this.styles.save(f), z = d, m === "string" && d.substring(0, 6) === "var(--") {
              if (d = Ge(t, d.substring(4, d.indexOf(")"))), d.substring(0, 5) === "calc(") {
                var N = t.style.perspective;
                t.style.perspective = d, d = Ge(t, "perspective"), N ? t.style.perspective = N : An(t, "perspective");
              }
              p = parseFloat(d);
            }
            if (y || (k = t._gsap, k.renderTransform && !e.parseTransform || Ca(t, e.parseTransform), M = e.smoothOrigin !== !1 && k.smooth, y = this._pt = new Oe(this._pt, s, Mt, 0, 1, k.renderTransform, k, 0, -1), y.dep = 1), f === "scale")
              this._pt = new Oe(this._pt, k, "scaleY", k.scaleY, (A ? ki(k.scaleY, A + p) : p) - k.scaleY || 0, sl), this._pt.u = 0, o.push("scaleY", f), f += "X";
            else if (f === "transformOrigin") {
              O.push(Pe, 0, s[Pe]), d = x1(d), k.svg ? dl(t, d, 0, M, 0, this) : (b = parseFloat(d.split(" ")[2]) || 0, b !== k.zOrigin && hn(this, k, "zOrigin", k.zOrigin, b), hn(this, s, f, Po(c), Po(d)));
              continue;
            } else if (f === "svgOrigin") {
              dl(t, d, 1, M, 0, this);
              continue;
            } else if (f in Dp) {
              k1(this, k, f, u, A ? ki(u, A + d) : d);
              continue;
            } else if (f === "smoothOrigin") {
              hn(this, k, "smooth", k.smooth, d);
              continue;
            } else if (f === "force3D") {
              k[f] = d;
              continue;
            } else if (f === "transform") {
              A1(this, d, t);
              continue;
            }
          } else f in s || (f = Xi(f) || f);
          if (x || (p || p === 0) && (u || u === 0) && !n1.test(d) && f in s)
            v = (c + "").substr((u + "").length), p || (p = 0), b = oe(d) || (f in _e.units ? _e.units[f] : v), v !== b && (u = Sn(t, f, c, b)), this._pt = new Oe(this._pt, x ? k : s, f, u, (A ? ki(u, A + p) : p) - u, !x && (b === "px" || f === "zIndex") && e.autoRound !== !1 ? s1 : sl), this._pt.u = b || 0, x && z !== d ? (this._pt.b = c, this._pt.e = z, this._pt.r = o1) : v !== b && b !== "%" && (this._pt.b = c, this._pt.r = a1);
          else if (f in s)
            m1.call(this, t, f, c, A ? A + d : d);
          else if (f in t)
            this.add(t, f, c || t[f], A ? A + d : d, i, a);
          else if (f !== "parseTransform") {
            Cl(f, d);
            continue;
          }
          x || (f in s ? O.push(f, 0, s[f]) : typeof t[f] == "function" ? O.push(f, 2, t[f]()) : O.push(f, 1, c || t[f])), o.push(f);
        }
      }
    T && Pp(this);
  },
  render: function(t, e) {
    if (e.tween._time || !jl())
      for (var r = e._pt; r; )
        r.r(t, r.d), r = r._next;
    else
      e.styles.revert();
  },
  get: Zr,
  aliases: Rr,
  getSetter: function(t, e, r) {
    var i = Rr[e];
    return i && i.indexOf(",") < 0 && (e = i), e in Jr && e !== Pe && (t._gsap.x || Zr(t, "x")) ? r && zc === r ? e === "scale" ? p1 : d1 : (zc = r || {}) && (e === "scale" ? f1 : u1) : t.style && !Ol(t.style[e]) ? l1 : ~e.indexOf("-") ? c1 : Fl(t, e);
  },
  core: {
    _removeProperty: An,
    _getMatrix: Xl
  }
};
Ce.utils.checkPrefix = Xi;
Ce.core.getStyleSaver = qp;
(function(n, t, e, r) {
  var i = Me(n + "," + t + "," + e, function(a) {
    Jr[a] = 1;
  });
  Me(t, function(a) {
    _e.units[a] = "deg", Dp[a] = 1;
  }), Rr[i[13]] = n + "," + t, Me(r, function(a) {
    var o = a.split(":");
    Rr[o[1]] = i[o[0]];
  });
})("x,y,z,scale,scaleX,scaleY,xPercent,yPercent", "rotation,rotationX,rotationY,skewX,skewY", "transform,transformOrigin,svgOrigin,force3D,smoothOrigin,transformPerspective", "0:translateX,1:translateY,2:translateZ,8:rotate,8:rotationZ,8:rotateZ,9:rotateX,10:rotateY");
Me("x,y,z,top,right,bottom,left,width,height,fontSize,padding,margin,perspective", function(n) {
  _e.units[n] = "px";
});
Ce.registerPlugin(Up);
var pl = Ce.registerPlugin(Up) || Ce;
pl.core.Tween;
/**
 * @license lucide-svelte v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const S1 = {
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
var z1 = /* @__PURE__ */ Vu("<svg><!><!></svg>");
function _t(n, t) {
  const e = Lt(t, ["children", "$$slots", "$$events", "$$legacy"]), r = Lt(e, [
    "name",
    "color",
    "size",
    "strokeWidth",
    "absoluteStrokeWidth",
    "iconNode"
  ]);
  xl(t, !1);
  let i = $e(t, "name", 8, void 0), a = $e(t, "color", 8, "currentColor"), o = $e(t, "size", 8, 24), s = $e(t, "strokeWidth", 8, 2), l = $e(t, "absoluteStrokeWidth", 8, !1), c = $e(t, "iconNode", 24, () => []);
  const d = (...g) => g.filter((f, v, b) => !!f && b.indexOf(f) === v).join(" ");
  Gd();
  var p = z1();
  fc(
    p,
    (g, f) => ({
      ...S1,
      ...r,
      width: o(),
      height: o(),
      stroke: a(),
      "stroke-width": g,
      class: f
    }),
    [
      () => (vr(l()), vr(s()), vr(o()), C(() => l() ? Number(s()) * 24 / Number(o()) : s())),
      () => (vr(i()), vr(e), C(() => d("lucide-icon", "lucide", i() ? `lucide-${i()}` : "", e.class)))
    ]
  );
  var u = w(p);
  ve(u, 1, c, ge, (g, f) => {
    var v = /* @__PURE__ */ iu(() => ff(h(f), 2));
    let b = () => h(v)[0], A = () => h(v)[1];
    var x = kt(), y = nt(x);
    Bu(y, b, !0, (k, M) => {
      fc(k, () => ({ ...A() }));
    }), R(g, x);
  });
  var m = S(u);
  Ut(m, t, "default", {}), R(n, p), bl();
}
function ln(n, t) {
  const e = Lt(t, ["children", "$$slots", "$$events", "$$legacy"]);
  /**
   * @license lucide-svelte v0.468.0 - ISC
   *
   * This source code is licensed under the ISC license.
   * See the LICENSE file in the root directory of this source tree.
   */
  const r = [
    ["path", { d: "m12 19-7-7 7-7" }],
    ["path", { d: "M19 12H5" }]
  ];
  _t(n, Xt({ name: "arrow-left" }, () => e, {
    get iconNode() {
      return r;
    },
    children: (i, a) => {
      var o = kt(), s = nt(o);
      Ut(s, t, "default", {}), R(i, o);
    },
    $$slots: { default: !0 }
  }));
}
function zr(n, t) {
  const e = Lt(t, ["children", "$$slots", "$$events", "$$legacy"]);
  /**
   * @license lucide-svelte v0.468.0 - ISC
   *
   * This source code is licensed under the ISC license.
   * See the LICENSE file in the root directory of this source tree.
   */
  const r = [
    ["path", { d: "M7 17V7h10" }],
    ["path", { d: "M17 17 7 7" }]
  ];
  _t(n, Xt({ name: "arrow-up-left" }, () => e, {
    get iconNode() {
      return r;
    },
    children: (i, a) => {
      var o = kt(), s = nt(o);
      Ut(s, t, "default", {}), R(i, o);
    },
    $$slots: { default: !0 }
  }));
}
function vi(n, t) {
  const e = Lt(t, ["children", "$$slots", "$$events", "$$legacy"]);
  /**
   * @license lucide-svelte v0.468.0 - ISC
   *
   * This source code is licensed under the ISC license.
   * See the LICENSE file in the root directory of this source tree.
   */
  const r = [
    ["path", { d: "M12 7v14" }],
    [
      "path",
      {
        d: "M3 18a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h5a4 4 0 0 1 4 4 4 4 0 0 1 4-4h5a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-6a3 3 0 0 0-3 3 3 3 0 0 0-3-3z"
      }
    ]
  ];
  _t(n, Xt({ name: "book-open" }, () => e, {
    get iconNode() {
      return r;
    },
    children: (i, a) => {
      var o = kt(), s = nt(o);
      Ut(s, t, "default", {}), R(i, o);
    },
    $$slots: { default: !0 }
  }));
}
function Is(n, t) {
  const e = Lt(t, ["children", "$$slots", "$$events", "$$legacy"]);
  /**
   * @license lucide-svelte v0.468.0 - ISC
   *
   * This source code is licensed under the ISC license.
   * See the LICENSE file in the root directory of this source tree.
   */
  const r = [
    [
      "path",
      { d: "m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z" }
    ]
  ];
  _t(n, Xt({ name: "bookmark" }, () => e, {
    get iconNode() {
      return r;
    },
    children: (i, a) => {
      var o = kt(), s = nt(o);
      Ut(s, t, "default", {}), R(i, o);
    },
    $$slots: { default: !0 }
  }));
}
function fa(n, t) {
  const e = Lt(t, ["children", "$$slots", "$$events", "$$legacy"]);
  /**
   * @license lucide-svelte v0.468.0 - ISC
   *
   * This source code is licensed under the ISC license.
   * See the LICENSE file in the root directory of this source tree.
   */
  const r = [["path", { d: "M20 6 9 17l-5-5" }]];
  _t(n, Xt({ name: "check" }, () => e, {
    get iconNode() {
      return r;
    },
    children: (i, a) => {
      var o = kt(), s = nt(o);
      Ut(s, t, "default", {}), R(i, o);
    },
    $$slots: { default: !0 }
  }));
}
function Vc(n, t) {
  const e = Lt(t, ["children", "$$slots", "$$events", "$$legacy"]);
  /**
   * @license lucide-svelte v0.468.0 - ISC
   *
   * This source code is licensed under the ISC license.
   * See the LICENSE file in the root directory of this source tree.
   */
  const r = [["path", { d: "m15 18-6-6 6-6" }]];
  _t(n, Xt({ name: "chevron-left" }, () => e, {
    get iconNode() {
      return r;
    },
    children: (i, a) => {
      var o = kt(), s = nt(o);
      Ut(s, t, "default", {}), R(i, o);
    },
    $$slots: { default: !0 }
  }));
}
function E1(n, t) {
  const e = Lt(t, ["children", "$$slots", "$$events", "$$legacy"]);
  /**
   * @license lucide-svelte v0.468.0 - ISC
   *
   * This source code is licensed under the ISC license.
   * See the LICENSE file in the root directory of this source tree.
   */
  const r = [
    [
      "path",
      {
        d: "m16.24 7.76-1.804 5.411a2 2 0 0 1-1.265 1.265L7.76 16.24l1.804-5.411a2 2 0 0 1 1.265-1.265z"
      }
    ],
    ["circle", { cx: "12", cy: "12", r: "10" }]
  ];
  _t(n, Xt({ name: "compass" }, () => e, {
    get iconNode() {
      return r;
    },
    children: (i, a) => {
      var o = kt(), s = nt(o);
      Ut(s, t, "default", {}), R(i, o);
    },
    $$slots: { default: !0 }
  }));
}
function qc(n, t) {
  const e = Lt(t, ["children", "$$slots", "$$events", "$$legacy"]);
  /**
   * @license lucide-svelte v0.468.0 - ISC
   *
   * This source code is licensed under the ISC license.
   * See the LICENSE file in the root directory of this source tree.
   */
  const r = [
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
  _t(n, Xt({ name: "copy" }, () => e, {
    get iconNode() {
      return r;
    },
    children: (i, a) => {
      var o = kt(), s = nt(o);
      Ut(s, t, "default", {}), R(i, o);
    },
    $$slots: { default: !0 }
  }));
}
function T1(n, t) {
  const e = Lt(t, ["children", "$$slots", "$$events", "$$legacy"]);
  /**
   * @license lucide-svelte v0.468.0 - ISC
   *
   * This source code is licensed under the ISC license.
   * See the LICENSE file in the root directory of this source tree.
   */
  const r = [
    ["path", { d: "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" }],
    ["polyline", { points: "7 10 12 15 17 10" }],
    ["line", { x1: "12", x2: "12", y1: "15", y2: "3" }]
  ];
  _t(n, Xt({ name: "download" }, () => e, {
    get iconNode() {
      return r;
    },
    children: (i, a) => {
      var o = kt(), s = nt(o);
      Ut(s, t, "default", {}), R(i, o);
    },
    $$slots: { default: !0 }
  }));
}
function ua(n, t) {
  const e = Lt(t, ["children", "$$slots", "$$events", "$$legacy"]);
  /**
   * @license lucide-svelte v0.468.0 - ISC
   *
   * This source code is licensed under the ISC license.
   * See the LICENSE file in the root directory of this source tree.
   */
  const r = [
    ["path", { d: "M15 3h6v6" }],
    ["path", { d: "M10 14 21 3" }],
    [
      "path",
      {
        d: "M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"
      }
    ]
  ];
  _t(n, Xt({ name: "external-link" }, () => e, {
    get iconNode() {
      return r;
    },
    children: (i, a) => {
      var o = kt(), s = nt(o);
      Ut(s, t, "default", {}), R(i, o);
    },
    $$slots: { default: !0 }
  }));
}
function M1(n, t) {
  const e = Lt(t, ["children", "$$slots", "$$events", "$$legacy"]);
  /**
   * @license lucide-svelte v0.468.0 - ISC
   *
   * This source code is licensed under the ISC license.
   * See the LICENSE file in the root directory of this source tree.
   */
  const r = [
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
  _t(n, Xt({ name: "file-text" }, () => e, {
    get iconNode() {
      return r;
    },
    children: (i, a) => {
      var o = kt(), s = nt(o);
      Ut(s, t, "default", {}), R(i, o);
    },
    $$slots: { default: !0 }
  }));
}
function Gr(n, t) {
  const e = Lt(t, ["children", "$$slots", "$$events", "$$legacy"]);
  /**
   * @license lucide-svelte v0.468.0 - ISC
   *
   * This source code is licensed under the ISC license.
   * See the LICENSE file in the root directory of this source tree.
   */
  const r = [
    ["line", { x1: "6", x2: "6", y1: "3", y2: "15" }],
    ["circle", { cx: "18", cy: "6", r: "3" }],
    ["circle", { cx: "6", cy: "18", r: "3" }],
    ["path", { d: "M18 9a9 9 0 0 1-9 9" }]
  ];
  _t(n, Xt({ name: "git-branch" }, () => e, {
    get iconNode() {
      return r;
    },
    children: (i, a) => {
      var o = kt(), s = nt(o);
      Ut(s, t, "default", {}), R(i, o);
    },
    $$slots: { default: !0 }
  }));
}
function Cs(n, t) {
  const e = Lt(t, ["children", "$$slots", "$$events", "$$legacy"]);
  /**
   * @license lucide-svelte v0.468.0 - ISC
   *
   * This source code is licensed under the ISC license.
   * See the LICENSE file in the root directory of this source tree.
   */
  const r = [
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
  _t(n, Xt({ name: "layers" }, () => e, {
    get iconNode() {
      return r;
    },
    children: (i, a) => {
      var o = kt(), s = nt(o);
      Ut(s, t, "default", {}), R(i, o);
    },
    $$slots: { default: !0 }
  }));
}
function O1(n, t) {
  const e = Lt(t, ["children", "$$slots", "$$events", "$$legacy"]);
  /**
   * @license lucide-svelte v0.468.0 - ISC
   *
   * This source code is licensed under the ISC license.
   * See the LICENSE file in the root directory of this source tree.
   */
  const r = [
    [
      "rect",
      { width: "18", height: "18", x: "3", y: "3", rx: "2" }
    ],
    ["path", { d: "M15 3v18" }],
    ["path", { d: "m8 9 3 3-3 3" }]
  ];
  _t(n, Xt({ name: "panel-right-close" }, () => e, {
    get iconNode() {
      return r;
    },
    children: (i, a) => {
      var o = kt(), s = nt(o);
      Ut(s, t, "default", {}), R(i, o);
    },
    $$slots: { default: !0 }
  }));
}
function P1(n, t) {
  const e = Lt(t, ["children", "$$slots", "$$events", "$$legacy"]);
  /**
   * @license lucide-svelte v0.468.0 - ISC
   *
   * This source code is licensed under the ISC license.
   * See the LICENSE file in the root directory of this source tree.
   */
  const r = [
    [
      "path",
      { d: "M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" }
    ],
    ["path", { d: "M3 3v5h5" }]
  ];
  _t(n, Xt({ name: "rotate-ccw" }, () => e, {
    get iconNode() {
      return r;
    },
    children: (i, a) => {
      var o = kt(), s = nt(o);
      Ut(s, t, "default", {}), R(i, o);
    },
    $$slots: { default: !0 }
  }));
}
function Rs(n, t) {
  const e = Lt(t, ["children", "$$slots", "$$events", "$$legacy"]);
  /**
   * @license lucide-svelte v0.468.0 - ISC
   *
   * This source code is licensed under the ISC license.
   * See the LICENSE file in the root directory of this source tree.
   */
  const r = [
    ["circle", { cx: "11", cy: "11", r: "8" }],
    ["path", { d: "m21 21-4.3-4.3" }]
  ];
  _t(n, Xt({ name: "search" }, () => e, {
    get iconNode() {
      return r;
    },
    children: (i, a) => {
      var o = kt(), s = nt(o);
      Ut(s, t, "default", {}), R(i, o);
    },
    $$slots: { default: !0 }
  }));
}
function fo(n, t) {
  const e = Lt(t, ["children", "$$slots", "$$events", "$$legacy"]);
  /**
   * @license lucide-svelte v0.468.0 - ISC
   *
   * This source code is licensed under the ISC license.
   * See the LICENSE file in the root directory of this source tree.
   */
  const r = [
    [
      "path",
      {
        d: "M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"
      }
    ],
    ["path", { d: "m9 12 2 2 4-4" }]
  ];
  _t(n, Xt({ name: "shield-check" }, () => e, {
    get iconNode() {
      return r;
    },
    children: (i, a) => {
      var o = kt(), s = nt(o);
      Ut(s, t, "default", {}), R(i, o);
    },
    $$slots: { default: !0 }
  }));
}
function I1(n, t) {
  const e = Lt(t, ["children", "$$slots", "$$events", "$$legacy"]);
  /**
   * @license lucide-svelte v0.468.0 - ISC
   *
   * This source code is licensed under the ISC license.
   * See the LICENSE file in the root directory of this source tree.
   */
  const r = [
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
  _t(n, Xt({ name: "sparkles" }, () => e, {
    get iconNode() {
      return r;
    },
    children: (i, a) => {
      var o = kt(), s = nt(o);
      Ut(s, t, "default", {}), R(i, o);
    },
    $$slots: { default: !0 }
  }));
}
function Nc(n, t) {
  const e = Lt(t, ["children", "$$slots", "$$events", "$$legacy"]);
  /**
   * @license lucide-svelte v0.468.0 - ISC
   *
   * This source code is licensed under the ISC license.
   * See the LICENSE file in the root directory of this source tree.
   */
  const r = [
    ["path", { d: "M18 6 6 18" }],
    ["path", { d: "m6 6 12 12" }]
  ];
  _t(n, Xt({ name: "x" }, () => e, {
    get iconNode() {
      return r;
    },
    children: (i, a) => {
      var o = kt(), s = nt(o);
      Ut(s, t, "default", {}), R(i, o);
    },
    $$slots: { default: !0 }
  }));
}
const ha = [
  ["all", "الكتب الستة"],
  ["bukhari", "صحيح البخاري"],
  ["muslim", "صحيح مسلم"],
  ["abudawud", "سنن أبي داود"],
  ["tirmidhi", "جامع الترمذي"],
  ["nasai", "سنن النسائي"],
  ["ibnmajah", "سنن ابن ماجه"]
], Yc = "itqan:bukhari:1:1:bf026de7e155", Nn = [
  { name: "الإمام البخاري", detail: "المصنف · صحيح البخاري", quote: "نسبة الكتاب في ملف المصدر" },
  { name: "الحميدي عبد الله بن الزبير", detail: "الاسم كما ورد في النص", quote: "حَدَّثَنَا الْحُمَيْدِيُّ عَبْدُ اللَّهِ بْنُ الزُّبَيْرِ" },
  { name: "سفيان", detail: "الهوية التفصيلية تحتاج إلى توثيق", quote: "قَالَ : حَدَّثَنَا سُفْيَانُ" },
  { name: "يحيى بن سعيد الأنصاري", detail: "الاسم كما ورد في النص", quote: "قَالَ : حَدَّثَنَا يَحْيَى بْنُ سَعِيدٍ الْأَنْصَارِيُّ" },
  { name: "محمد بن إبراهيم التيمي", detail: "الاسم كما ورد في النص", quote: "قَالَ : أَخْبَرَنِي مُحَمَّدُ بْنُ إِبْرَاهِيمَ التَّيْمِيُّ" },
  { name: "علقمة بن وقاص الليثي", detail: "الاسم كما ورد في النص", quote: "أَنَّهُ سَمِعَ عَلْقَمَةَ بْنَ وَقَّاصٍ اللَّيْثِيَّ" },
  { name: "عمر بن الخطاب", detail: "رضي الله عنه · ورد اسمه في النص", quote: "يَقُولُ : سَمِعْتُ عُمَرَ بْنَ الْخَطَّابِ" },
  { name: "رسول الله ﷺ", detail: "طرف الرواية كما ورد في النص", quote: "قَالَ : سَمِعْتُ رَسُولَ اللَّهِ صَلَّى اللَّهُ عَلَيْهِ وَسَلَّمَ" }
];
var C1 = /* @__PURE__ */ j("<div><!><span> </span></div>"), R1 = /* @__PURE__ */ j('<section class="landing"><div class="ambient ambient-one"></div><div class="ambient ambient-two"></div> <header class="landing-nav"><button class="brand" aria-label="أثر — الصفحة الرئيسية"><span class="brand-symbol"><!></span><span class="wordmark">أثــر</span><span class="brand-caption">معرفةٌ يُستدلّ عليها</span></button> <nav class="landing-links" aria-label="التنقل"><button>رحلتك مع الحديث</button><button>منهجنا</button><span class="quiet-tag">تجربة تصميمية</span></nav> <div class="variant-actions"><button class="return-light">بيان السُّنّة · المحادثة <!></button><button class="return-light">الأصلية <!></button></div></header> <main><div class="hero"><div class="hero-copy" data-enter=""><div class="eyebrow"><span class="live-dot"></span> من سؤالٍ تتذكّره… إلى مصدرٍ تتبيّنه</div> <h1>كلُّ معرفةٍ<br/>تبدأ <em>بأثــر.</em></h1> <p class="hero-description">رحلة هادئة في رحاب الحديث النبوي.<br/>ابحث عن النص، افهم سياقه، وتأمّل الطريق إلى مصدره.</p> <div class="hero-actions"><button class="button mint">ابدأ رحلتك <!></button><button class="text-button light">ادخل مساحة الباحث <!></button></div> <div class="hero-note"><!><span>النص ومصدره أولًا. وما يحتاج إلى مراجعة، ظاهرٌ لك.</span></div></div> <div class="knowledge-orbit" aria-label="تصور بصري يربط سؤال المستخدم بمصادر الكتب الستة" data-enter=""><div class="orbit-caption">A CONNECTED JOURNEY OF KNOWLEDGE</div> <svg class="orbital-lines" viewBox="0 0 600 520" aria-hidden="true"><defs><radialGradient id="halo"><stop offset="0" stop-color="#6150ea" stop-opacity=".35"></stop><stop offset="1" stop-color="#6150ea" stop-opacity="0"></stop></radialGradient></defs><circle cx="300" cy="260" r="220" fill="url(#halo)"></circle><ellipse cx="300" cy="260" rx="252" ry="190" fill="none" stroke="#a9aad2" stroke-opacity=".19"></ellipse><ellipse cx="300" cy="260" rx="194" ry="139" fill="none" stroke="#a9aad2" stroke-opacity=".17"></ellipse><path class="orbit-trace" d="M300 80 Q565 165 300 443 Q35 345 300 80Z" fill="none" stroke="#2ef2c2" stroke-opacity=".4" stroke-dasharray="4 15"></path><path d="M150 110L300 260 472 148M90 270L300 260 495 346M208 437L300 260" fill="none" stroke="#b1a5fe" stroke-opacity=".23"></path></svg> <div class="orbit-core"><div class="core-glyph"><!></div><span>الكلمة… وأثرها</span><small>نص · فهم · مصدر</small></div> <!> <div class="orbit-footer"><span class="small-line"></span> ستة مصنّفات، ومساحة واحدة للاستكشاف <span class="small-line"></span></div></div></div> <section class="journeys" id="journeys" aria-labelledby="journeys-title"><div class="section-label" data-enter=""><span>مصادر واحدة. عدستان مختلفتان.</span><h2 id="journeys-title">اختر كيف تبدأ.</h2></div> <button class="journey-card" data-enter=""><span class="journey-number">01 / LEARN</span><div class="journey-heading"><!><h3>تعلّم وافهم</h3></div><p>أتذكّر كلمات، أريد فهم معنى،<br/>أبحث عن دليلٍ أشاركه بثقة.</p><span class="journey-bottom">للمتعلّم والمُعرّف بالإسلام <!></span></button> <button class="journey-card researcher" data-enter=""><span class="journey-number">02 / RESEARCH</span><div class="journey-heading"><!><h3>ابحث وقارن</h3></div><p>أجمع المواضع، أقارن الألفاظ،<br/>وأتتبّع الإسناد وشواهد الهوية.</p><span class="journey-bottom">للباحث والمتخصص <!></span></button></section> <section class="approach" id="approach"><span class="eyebrow">وضوحٌ في كل خطوة</span><h2>جمال التجربة، في وضوح الدليل.</h2><div class="approach-grid"><div><span>01</span><h3>اعثر على النص</h3><p>مطابقات من فهرس الكتب الستة، مع إبراز الكلمات التي تبحث عنها.</p></div><div><span>02</span><h3>افتح المصدر</h3><p>النص الأصلي، وموضعه في النسخة الرقمية، وحالة مراجعته.</p></div><div><span>03</span><h3>واصل على بيّنة</h3><p>اختيار محفوظ أثناء الفحص، ونسخٌ يحمل المصدر معه.</p></div></div></section></main> <footer class="landing-footer"><span class="wordmark">أثــر</span><span>تصوّر واجهة مشروع الحديث · هاكاثون الذكاء الاصطناعي الإسلامي</span><span>Powered by <b>Open WebUI</b></span></footer></section>'), V1 = /* @__PURE__ */ j('<button class="saved-item"><!><span> <small> </small></span><!></button>'), q1 = /* @__PURE__ */ j('<button class="button violet"><!> تصدير النصوص بمصادرها</button><div class="saved-list"></div>', 1), N1 = /* @__PURE__ */ j('<div class="empty-state"><!><h2>كلّ بحثٍ يبدأ باختيار.</h2><p>افتح أي نتيجة، ثم احفظها هنا مع مصدرها.</p><button class="button outline">ابدأ البحث <!></button></div>'), Y1 = /* @__PURE__ */ j('<div class="page-heading" data-enter=""><span class="eyebrow">ما اخترتَ الاحتفاظ به</span><h1>دفتر المصادر</h1><p>نصوص ومراجع لهذه الجلسة. صدّرها للاحتفاظ بها.</p></div> <!>', 1), L1 = /* @__PURE__ */ j('<div class="welcome" data-enter=""><span class="welcome-emblem"><!></span><div class="eyebrow"> </div><h1> </h1><p> </p></div>'), D1 = /* @__PURE__ */ j('<div class="result-heading" data-enter=""><div><span class="eyebrow">رحلتك في الحديث</span><h1> </h1></div><button class="icon-button" aria-label="ابدأ بحثًا جديدًا"><!></button></div> <ol class="journey-steps"><li><span>01</span> ابحث</li><li><span>02</span> اختر النص</li><li><span>03</span> افحص المصدر</li><li><span>04</span> واصل الفهم</li></ol>', 1), F1 = /* @__PURE__ */ j("<option> </option>"), B1 = /* @__PURE__ */ j('<span class="spinner"></span>'), U1 = /* @__PURE__ */ j("<button> <!></button>"), j1 = /* @__PURE__ */ j("<span> </span>"), G1 = /* @__PURE__ */ j('<div class="quick-examples" data-enter=""><span>جرّب أن تتذكّر</span><!></div><div class="usecases" data-enter=""><button><!><span>أتذكّر كلمات<small>من العبارة إلى موضع النص</small></span><!></button><button><!><span>أقارن الألفاظ<small>النتائج جنبًا إلى جنب</small></span><!></button><button><!><span>أستكشف الإسناد<small>مثال تفاعلي من صحيح البخاري</small></span><!></button></div><div class="source-strip"><span>نطاق الفهرس</span><!></div><div class="welcome-footnote"><!> نتائج البحث من نسخة Itqan الرقمية. الحكم على الصحة يحتاج إلى مصدر علمي مطابق.</div>', 1), X1 = /* @__PURE__ */ j('<div class="error-box" role="alert"><h2>لم يكتمل البحث</h2><p> </p><button class="button outline">أعد المحاولة</button></div>'), _1 = /* @__PURE__ */ j('<div class="loading-state" role="status"><span class="spinner"></span> نبحث عن أثر كلماتك في الفهرس…<div class="skeleton"></div><div class="skeleton"></div></div>'), Z1 = /* @__PURE__ */ j('<button class="button outline"> </button>'), K1 = /* @__PURE__ */ j('<div class="empty-state" data-enter=""><!><h2>لم نجد مطابقة في النطاق المختار.</h2><p>جرّب كلمات أقل أو نطاقًا أوسع. عدم العثور هنا لا يعني أن العبارة ليست حديثًا.</p><!></div>'), H1 = /* @__PURE__ */ j("<mark> </mark>"), Q1 = /* @__PURE__ */ j('<button class="result-card" data-enter=""><div class="result-card-top"><span class="book-label"><!> </span><span class="result-index"> </span></div><h3> </h3><p class="hadith-snippet"></p><div class="result-card-bottom"><span> </span><!></div></button>'), W1 = /* @__PURE__ */ j('<div class="results-meta"><h2>اختر النص الذي تقصده</h2><span> </span></div><div class="result-grid"></div><p class="small-note">المواضع قد تتضمن نسخًا مكررة من النص؛ عدد النتائج ليس عدد طرق الإسناد.</p>', 1), J1 = /* @__PURE__ */ j('<span class="tab-dot"></span>'), $1 = /* @__PURE__ */ j('<button role="tab"> <!></button>'), tg = /* @__PURE__ */ j("<mark> </mark>"), eg = /* @__PURE__ */ j('<details class="translation"><summary>الترجمة الإنجليزية في النسخة الرقمية</summary><p dir="ltr"> </p></details>'), rg = /* @__PURE__ */ j('<div class="source-data"><p> </p><a target="_blank" rel="noreferrer">افتح ملف المصدر <!></a></div>'), ng = /* @__PURE__ */ j('<div class="text-lens"><span class="source-state"><span></span> نسخة رقمية · تحتاج إلى مراجعة على طبعة معتمدة</span><p class="full-hadith"></p><!><button class="source-disclosure"><!> بيانات المصدر والتتبّع <span> </span></button><!></div>'), ig = /* @__PURE__ */ j("<option> </option>"), ag = /* @__PURE__ */ j("<mark> </mark>"), og = /* @__PURE__ */ j("<mark> </mark>"), sg = /* @__PURE__ */ j('<div class="comparison-columns"><article><span class="book-label"> </span><p></p><a target="_blank" rel="noreferrer">مصدر النص <!></a></article><article><span class="book-label"> </span><p></p><a target="_blank" rel="noreferrer">مصدر النص <!></a></article></div><p class="small-note">التظليل يبيّن كلمات البحث فقط؛ محاذاة الفروق آليًا مرحلة لاحقة.</p>', 1), lg = /* @__PURE__ */ j('<label class="compare-select">قارن النص المحدد مع <select></select></label><!>', 1), cg = /* @__PURE__ */ j('<div class="empty-state"><!><p>ابحث في نطاق أوسع للحصول على نص آخر للمقارنة.</p></div>'), dg = /* @__PURE__ */ j('<div class="comparison-lens"><p class="small-note">مقارنة بين نتائج البحث، وليست إثباتًا لوحدة الرواية أو استقلال الطريق.</p><!></div>'), pg = /* @__PURE__ */ j('<div class="chain-row"><span class="chain-index"> </span><button><span class="node-dot"></span><span> <small> </small></span><!></button></div>'), fg = /* @__PURE__ */ j('<div class="chain-caption"><span>مسار واحد · من المصنف إلى طرف الرواية</span><button class="text-button"><!> Mermaid</button></div><p class="small-note">نقل يدوي لأسماء هذا السجل، قبل المراجعة العلمية. اختر اسمًا لفحص شاهده.</p><div class="chain-nodes"></div>', 1), ug = /* @__PURE__ */ j('<div class="empty-state"><!><h3>هذا المسار لم يُجهّز بعد.</h3><p>مثال الواجهة متاح لسجل «الأعمال بالنيات» في أول ملف صحيح البخاري. لن نرسم مسارًا تخمينيًا لهذا النص.</p><button class="button outline">افتح بحث المثال</button></div>'), hg = /* @__PURE__ */ j('<div class="chain-lens"><!></div>'), gg = /* @__PURE__ */ j('<button class="text-button">كل النتائج <!></button>'), vg = /* @__PURE__ */ j('<div class="insight-icon"><!></div><span class="eyebrow">شاهد الاسم في السند</span><h2> </h2><blockquote> </blockquote><div class="insight-divider"></div><dl><dt>توثيق الهوية</dt><dd>لم يُربط بعد بترجمة موثّقة</dd><dt>الجرح والتعديل</dt><dd>لا يوجد حكم منقول في هذا المثال</dd><dt>المصدر</dt><dd> </dd></dl><a class="text-button" target="_blank" rel="noreferrer">راجع النص الأصلي <!></a>', 1), mg = /* @__PURE__ */ j('<div class="insight-icon"><!></div><span class="eyebrow">نافذة الدليل</span><h2>ماذا نعرف<br/>عن هذا النص؟</h2><ul class="evidence-checklist"><li><!><span>موضع رقمي محدد<small> </small></span></li><li><!><span>مرجع قابل للفحص<small> </small></span></li><li class="pending"><span class="hollow-dot"></span><span>المراجعة العلمية<small>لم تُنجز داخل هذه التجربة</small></span></li></ul><div class="insight-divider"></div><h3>خطوتك التالية</h3><p>افحص نتيجة الدرر، أو افتح النص المحدد في محادثة الأداة.</p><a class="button violet" target="_blank" rel="noreferrer">افتح في محادثة جديدة <!></a><small class="handoff-note">يفتح طلبًا جاهزًا؛ راجعه ثم أرسله.</small><a class="dorar-link" target="_blank" rel="noreferrer">ابحث عن العبارة في الدرر <!></a><p class="small-note">بحث مستقل؛ لم تُطابق أحكامه آليًا بهذا السجل.</p>', 1), xg = /* @__PURE__ */ j('<div class="evidence-layout" data-enter=""><section class="evidence-panel"><div class="evidence-header"><div><span class="eyebrow">النص الذي اخترته</span><h2> </h2><p> </p></div><button><!></button></div> <div class="evidence-tabs" role="tablist" aria-label="عدسات فحص النص"></div> <!> <div class="evidence-actions"><button class="button outline small"><!> </button><!></div></section><aside class="insight-panel"><!></aside></div>'), bg = /* @__PURE__ */ j('<!> <form data-enter=""><div class="composer-input"><!><label class="sr-only" for="athar-query">الكلمات التي تتذكرها من الحديث</label><input id="athar-query" required="" autocomplete="off"/></div><div class="composer-bottom"><label class="collection-filter"><!><select aria-label="اختر مجموعة البحث"></select></label><span class="search-type">بحث في ألفاظ النص</span><button class="submit-search" aria-label="ابحث عن الحديث"><!></button></div></form> <!> <!> <!> <!> <!>', 1), yg = /* @__PURE__ */ j('<div class="notice" role="status"> <button class="icon-button" aria-label="أغلق التنبيه"><!></button></div>'), wg = /* @__PURE__ */ j('<div><aside><button class="mobile-only close-menu icon-button" aria-label="أغلق قائمة المساحة"><!></button> <button class="brand"><span class="brand-symbol"><!></span><span class="wordmark">أثــر</span><span class="lab-label">مختبر الواجهة</span></button> <button class="new-journey"><!> رحلة جديدة <span>+</span></button> <span class="sidebar-label">مساحتك المعرفية</span> <button><!> الاستكشاف</button> <button><!> دفتر المصادر <span class="count"> </span></button> <div class="side-separator"></div><span class="sidebar-label">عدسة العرض</span> <button><!><span>تعلّم وافهم<small>مسار مبسّط نحو المعنى</small></span><!></button> <button><!><span>ابحث وقارن<small>تفاصيل النص والمصدر</small></span><!></button> <div class="sidebar-bottom"><div class="integrity-note"><!><p>قيمة المعرفة<br/><strong>في إمكانية تتبّعها.</strong></p></div><span class="powered">Powered by Open WebUI</span></div></aside> <div class="workspace-body"><header class="workspace-top"><div class="breadcrumb"><button class="icon-button mobile-only" aria-label="افتح قائمة المساحة"><!></button><span> </span><!><strong> </strong></div><div class="top-actions"><button class="original-button">بيان السُّنّة · المحادثة <!></button><button class="original-button">الأصلية <!></button></div></header> <main class="workspace-main"><!> <!></main><footer class="workspace-footer"><span>أثــر / رحلة معرفية قابلة للتتبّع</span><span>تصميم تجريبي · البحث متصل بالفهرس المحلي</span></footer></div></div>'), kg = /* @__PURE__ */ j('<div class="athar" dir="rtl" lang="ar"><!></div>');
function Ag(n, t) {
  xl(t, !1);
  const e = /* @__PURE__ */ At(), r = /* @__PURE__ */ At(), i = /* @__PURE__ */ At();
  let a = $e(t, "apiBase", 8), o = $e(t, "webuiOrigin", 8), s = $e(t, "onClose", 8), l = $e(t, "onVariant2", 24, s), c = $e(t, "onReady", 8), d = /* @__PURE__ */ At(), p = /* @__PURE__ */ At("landing"), u = /* @__PURE__ */ At("learn"), m = /* @__PURE__ */ At(""), g = /* @__PURE__ */ At("all"), f = /* @__PURE__ */ At(!1), v = /* @__PURE__ */ At(""), b = /* @__PURE__ */ At(!1), A = /* @__PURE__ */ At(null), x = /* @__PURE__ */ At(null), y = /* @__PURE__ */ At("text"), k = /* @__PURE__ */ At(-1), M = /* @__PURE__ */ At(""), T = /* @__PURE__ */ At(!1), O = /* @__PURE__ */ At(!1), z = /* @__PURE__ */ At([]), N = /* @__PURE__ */ At(!1), F = /* @__PURE__ */ At(""), L = /* @__PURE__ */ At(!1), K = 0, ot = null, dt = /* @__PURE__ */ At(!1);
  const lt = ["الأعمال بالنيات", "فليقل خيرا أو ليصمت", "يسروا ولا تعسروا"];
  function P(G = "[data-enter]") {
    h(dt) && h(d) && pl.fromTo(h(d).querySelectorAll(G), { opacity: 0, y: 12 }, {
      opacity: 1,
      y: 0,
      duration: 0.45,
      stagger: 0.045,
      ease: "power3.out",
      clearProps: "transform"
    });
  }
  async function Y(G) {
    var $;
    I(u, G), I(p, "workspace"), I(L, !1), await ga(), ($ = h(d).closest("dialog")) == null || $.scrollTo({ top: 0 }), P();
  }
  async function q(G = h(m)) {
    if (I(m, G.trim()), !h(m) || h(f)) return;
    const $ = ++K;
    ot == null || ot.abort(), ot = new AbortController(), I(f, !0), I(v, ""), I(F, ""), I(b, !0), I(x, null), I(A, null), I(y, "text"), I(k, -1);
    try {
      const wt = await fetch(`${a()}/search?${new URLSearchParams({ query: h(m), collection: h(g) })}`, { signal: ot.signal, credentials: "omit" }), Pt = await wt.json();
      if (!wt.ok) throw new Error(Pt.message || "تعذّر الوصول إلى فهرس البحث.");
      if ($ !== K) return;
      I(A, Pt);
    } catch (wt) {
      wt.name !== "AbortError" && I(v, wt.message.includes("fetch") ? "خدمة البحث المحلية غير متاحة. شغّل خدمة تجربة الواجهة ثم أعد المحاولة." : wt.message);
    } finally {
      $ === K && (I(f, !1), await ga(), P(".result-card"));
    }
  }
  async function _(G) {
    var $, wt, Pt;
    I(x, G), I(y, "text"), I(k, -1), I(O, !1), I(M, ((wt = ($ = h(A)) == null ? void 0 : $.results.find((Yr) => Yr.record_id !== G.record_id)) == null ? void 0 : wt.record_id) || ""), await ga(), (Pt = h(d).querySelector(".evidence-layout")) == null || Pt.scrollIntoView({
      block: "start",
      behavior: h(dt) ? "smooth" : "instant"
    }), P(".evidence-layout");
  }
  function U() {
    ot == null || ot.abort(), K++, I(f, !1), I(A, null), I(x, null), I(b, !1), I(m, ""), I(v, ""), I(F, ""), I(T, !1);
  }
  function D() {
    if (!h(x)) return;
    const G = h(i);
    G ? I(z, h(z).filter(($) => {
      var wt;
      return $.record_id !== ((wt = h(x)) == null ? void 0 : wt.record_id);
    })) : I(z, [...h(z), h(x)]), I(F, G ? "أزيل النص من دفتر الجلسة." : "أضيف النص إلى دفتر هذه الجلسة.");
  }
  async function it() {
    if (h(x))
      try {
        await navigator.clipboard.writeText(`${h(x).arabic}

${h(x).citation}`), I(N, !0), setTimeout(() => I(N, !1), 2e3);
      } catch {
        I(F, "النسخ غير متاح في هذا المتصفح. يمكنك تحديد النص والمصدر ونسخهما.");
      }
  }
  function pt() {
    const G = new Blob(
      [
        h(z).map((Pt) => `${Pt.arabic}

${Pt.citation}`).join(`

---

`)
      ],
      { type: "text/plain;charset=utf-8" }
    ), $ = URL.createObjectURL(G), wt = document.createElement("a");
    wt.href = $, wt.download = "athar-evidence.txt", wt.click(), setTimeout(() => URL.revokeObjectURL($), 500);
  }
  function ft() {
    const G = h(x) ? `افتح السجل ${h(x).record_id} باستخدام open_hadith_record واعرض مصدره وحالة المراجعة.` : `ابحث عن الحديث بالكلمات: ${h(m)}`;
    return `${o()}/?${new URLSearchParams({ model: "hadith-phrase-poc", q: G, submit: "false" })}`;
  }
  function Ot() {
    return `flowchart TD
` + Nn.map((G, $) => `  N${$}["${G.name}"]`).join(`
`) + `
` + Nn.slice(1).map((G, $) => `  N${$} --> N${$ + 1}`).join(`
`);
  }
  async function yr() {
    try {
      await navigator.clipboard.writeText(Ot()), I(F, "نُسخ مخطط هذا السجل فقط بصيغة Mermaid.");
    } catch {
      I(F, "تعذّر النسخ من المتصفح.");
    }
  }
  nh(() => {
    const G = pl.matchMedia();
    return G.add("(prefers-reduced-motion: no-preference)", () => (I(dt, !0), P(), () => {
      I(dt, !1);
    })), c()(($) => {
      I(p, $), ga().then(() => P());
    }), () => {
      G.revert(), ot == null || ot.abort();
    };
  }), ms(() => h(u), () => {
    I(e, h(u) === "research");
  }), ms(() => (h(A), h(M)), () => {
    var G;
    I(r, (G = h(A)) == null ? void 0 : G.results.find(($) => $.record_id === h(M)));
  }), ms(() => (h(x), h(z)), () => {
    I(i, !!h(x) && h(z).some((G) => {
      var $;
      return G.record_id === (($ = h(x)) == null ? void 0 : $.record_id);
    }));
  }), mu(), Gd();
  var sr = kg(), Ua = w(sr);
  {
    var wr = (G) => {
      var $ = R1(), wt = S(w($), 3), Pt = w(wt), Yr = w(Pt), $r = w(Yr);
      Gr($r, { size: 24 });
      var ja = S(Pt, 2), oi = w(ja), Uo = S(oi), jo = S(ja, 2), Tn = w(jo), Go = S(w(Tn));
      zr(Go, { size: 16 });
      var Mn = S(Tn), Ga = S(w(Mn));
      zr(Ga, { size: 16 });
      var Xo = S(wt, 2), On = w(Xo), Hi = w(On), Qi = S(w(Hi), 6), Wi = w(Qi), _o = S(w(Wi));
      ln(_o, { size: 18 });
      var Pn = S(Wi), Xa = S(w(Pn));
      zr(Xa, { size: 17 });
      var _a = S(Qi, 2), Zo = w(_a);
      fo(Zo, { size: 16 });
      var Ko = S(Hi, 2), In = S(w(Ko), 4), Za = w(In), Ka = w(Za);
      Gr(Ka, { size: 34, strokeWidth: 1 });
      var Ho = S(In, 2);
      ve(
        Ho,
        1,
        () => (vr(ha), C(() => ha.slice(1))),
        ge,
        (xe, kr, es) => {
          var ta = C1();
          Ae(ta, 1, `book-orbit book-${es}`);
          var li = w(ta);
          vi(li, { size: 17, strokeWidth: 1.2 });
          var rs = S(li), Ja = w(rs);
          st(() => B(Ja, (h(kr), C(() => h(kr)[1])))), R(xe, ta);
        }
      );
      var Qo = S(On, 2), Ji = S(w(Qo), 2), Ha = S(w(Ji)), Wo = w(Ha);
      vi(Wo, { size: 26, strokeWidth: 1.3 });
      var Jo = S(Ha, 2), Qa = S(w(Jo));
      ln(Qa, { size: 19 });
      var $i = S(Ji, 2), si = S(w($i)), $o = w(si);
      Gr($o, { size: 26, strokeWidth: 1.3 });
      var Wa = S(si, 2), ts = S(w(Wa));
      ln(ts, { size: 19 }), H("click", Pt, () => {
        I(p, "landing");
      }), H("click", oi, () => {
        var xe;
        return (xe = h(d).querySelector("#journeys")) == null ? void 0 : xe.scrollIntoView({ behavior: h(dt) ? "smooth" : "instant" });
      }), H("click", Uo, () => {
        var xe;
        return (xe = h(d).querySelector("#approach")) == null ? void 0 : xe.scrollIntoView({ behavior: h(dt) ? "smooth" : "instant" });
      }), H("click", Tn, function(...xe) {
        var kr;
        (kr = l()) == null || kr.apply(this, xe);
      }), H("click", Mn, function(...xe) {
        var kr;
        (kr = s()) == null || kr.apply(this, xe);
      }), H("click", Wi, () => Y("learn")), H("click", Pn, () => Y("research")), H("click", Ji, () => Y("learn")), H("click", $i, () => Y("research")), R(G, $);
    }, ai = (G) => {
      var $ = wg();
      let wt;
      var Pt = w($);
      let Yr;
      var $r = w(Pt), ja = w($r);
      Nc(ja, { size: 18 });
      var oi = S($r, 2), Uo = w(oi), jo = w(Uo);
      Gr(jo, { size: 22 });
      var Tn = S(oi, 2), Go = w(Tn);
      I1(Go, { size: 16 });
      var Mn = S(Tn, 4);
      let Ga;
      var Xo = w(Mn);
      E1(Xo, { size: 18 });
      var On = S(Mn, 2);
      let Hi;
      var Qi = w(On);
      Is(Qi, { size: 18 });
      var Wi = S(Qi, 2), _o = w(Wi), Pn = S(On, 5);
      let Xa;
      var _a = w(Pn);
      vi(_a, { size: 17 });
      var Zo = S(_a, 2);
      {
        var Ko = (It) => {
          fa(It, { size: 15 });
        };
        gt(Zo, (It) => {
          h(e) || It(Ko);
        });
      }
      var In = S(Pn, 2);
      let Za;
      var Ka = w(In);
      Gr(Ka, { size: 17 });
      var Ho = S(Ka, 2);
      {
        var Qo = (It) => {
          fa(It, { size: 15 });
        };
        gt(Ho, (It) => {
          h(e) && It(Qo);
        });
      }
      var Ji = S(In, 2), Ha = w(Ji), Wo = w(Ha);
      fo(Wo, { size: 20 });
      var Jo = S(Pt, 2), Qa = w(Jo), $i = w(Qa), si = w($i), $o = w(si);
      O1($o, { size: 20 });
      var Wa = S(si), ts = w(Wa), xe = S(Wa);
      Vc(xe, { size: 13 });
      var kr = S(xe), es = w(kr), ta = S($i), li = w(ta), rs = S(w(li));
      zr(rs, { size: 15 });
      var Ja = S(li), Gp = S(w(Ja));
      zr(Gp, { size: 15 });
      var Xp = S(Qa, 2), _l = w(Xp);
      {
        var _p = (It) => {
          var be = Y1(), Cn = S(nt(be), 2);
          {
            var ci = (lr) => {
              var tn = q1(), Lr = nt(tn), Rn = w(Lr);
              T1(Rn, { size: 16 });
              var en = S(Lr);
              ve(en, 5, () => h(z), ge, (ns, rn) => {
                var di = V1(), pi = w(di);
                vi(pi, { size: 20 });
                var ra = S(pi), $a = w(ra), is = S($a), as = w(is), to = S(ra);
                ln(to, { size: 17 }), st(() => {
                  B($a, (h(rn), C(() => h(rn).collection_label))), B(as, (h(rn), C(() => h(rn).chapter_title)));
                }), H("click", di, () => {
                  I(T, !1), _(h(rn)), I(b, !0);
                }), R(ns, di);
              }), H("click", Lr, pt), R(lr, tn);
            }, ea = (lr) => {
              var tn = N1(), Lr = w(tn);
              Is(Lr, { size: 36, strokeWidth: 1 });
              var Rn = S(Lr, 3), en = S(w(Rn));
              ln(en, { size: 16 }), H("click", Rn, () => I(T, !1)), R(lr, tn);
            };
            gt(Cn, (lr) => {
              h(z), C(() => h(z).length) ? lr(ci) : lr(ea, -1);
            });
          }
          R(It, be);
        }, Zp = (It) => {
          var be = bg(), Cn = nt(be);
          {
            var ci = (Z) => {
              var vt = L1(), qt = w(vt), de = w(qt);
              {
                var re = (ht) => {
                  Gr(ht, { size: 30, strokeWidth: 1.2 });
                }, Qt = (ht) => {
                  vi(ht, { size: 30, strokeWidth: 1.2 });
                };
                gt(de, (ht) => {
                  h(e) ? ht(re) : ht(Qt, -1);
                });
              }
              var ne = S(qt), Re = w(ne), ye = S(ne), ie = w(ye), we = S(ye), Wt = w(we);
              st(() => {
                B(Re, h(e) ? "من موضع الرواية… إلى تفاصيلها" : "مساحةٌ للسؤال، وطريقٌ إلى المصدر"), B(ie, h(e) ? "وراء كلّ نص، رحلة." : "ما الذي تتطلّع إلى معرفته؟"), B(Wt, h(e) ? "ابدأ بعبارة، واجمع نتائجها، ثم افحص النصوص وأسانيد المثال المتاح." : "ربما تتذكّر بضع كلمات. دعها تقودك إلى النص ومصدره.");
              }), R(Z, vt);
            }, ea = (Z) => {
              var vt = D1(), qt = nt(vt), de = w(qt), re = S(w(de)), Qt = w(re), ne = S(de), Re = w(ne);
              P1(Re, { size: 19 });
              var ye = S(qt, 2), ie = w(ye);
              let we;
              var Wt = S(ie);
              let ht;
              var nn = S(Wt);
              let cr;
              st(() => {
                B(Qt, h(x) ? "من النص، إلى الدليل." : "أثر الكلمات التي تذكّرتها."), we = Ae(ie, 1, "", null, we, { complete: h(b) }), ht = Ae(Wt, 1, "", null, ht, { complete: !!h(x) }), cr = Ae(nn, 1, "", null, cr, { complete: !!h(x) });
              }), H("click", ne, U), R(Z, vt);
            };
            gt(Cn, (Z) => {
              h(b) ? Z(ea, -1) : Z(ci);
            });
          }
          var lr = S(Cn, 2);
          let tn;
          var Lr = w(lr), Rn = w(Lr);
          Rs(Rn, { size: 23, strokeWidth: 1.4 });
          var en = S(Rn, 2);
          Le(en, "maxlength", 200);
          var ns = S(Lr), rn = w(ns), di = w(rn);
          Cs(di, { size: 15 });
          var pi = S(di);
          ve(pi, 5, () => ha, ge, (Z, vt) => {
            var qt = F1(), de = w(qt), re = {};
            st(() => {
              B(de, (h(vt), C(() => h(vt)[1]))), re !== (re = (h(vt), C(() => h(vt)[0]))) && (qt.value = (qt.__value = (h(vt), C(() => h(vt)[0]))) ?? "");
            }), R(Z, qt);
          });
          var ra = S(rn, 2), $a = w(ra);
          {
            var is = (Z) => {
              var vt = B1();
              R(Z, vt);
            }, as = (Z) => {
              ln(Z, { size: 20 });
            };
            gt($a, (Z) => {
              h(f) ? Z(is) : Z(as, -1);
            });
          }
          var to = S(lr, 2);
          {
            var Qp = (Z) => {
              var vt = G1(), qt = nt(vt), de = S(w(qt));
              ve(de, 1, () => lt, ge, (Dr, Ar) => {
                var Sr = U1(), Fr = w(Sr), na = S(Fr);
                zr(na, { size: 13 }), st(() => B(Fr, `${h(Ar) ?? ""} `)), H("click", Sr, () => q(h(Ar))), R(Dr, Sr);
              });
              var re = S(qt), Qt = w(re), ne = w(Qt);
              Rs(ne, { size: 20 });
              var Re = S(ne, 2);
              zr(Re, { size: 16 });
              var ye = S(Qt), ie = w(ye);
              Cs(ie, { size: 20 });
              var we = S(ie, 2);
              zr(we, { size: 16 });
              var Wt = S(ye), ht = w(Wt);
              Gr(ht, { size: 20 });
              var nn = S(ht, 2);
              zr(nn, { size: 16 });
              var cr = S(re), fi = S(w(cr));
              ve(
                fi,
                1,
                () => (vr(ha), C(() => ha.slice(1))),
                ge,
                (Dr, Ar) => {
                  var Sr = j1(), Fr = w(Sr);
                  st(() => B(Fr, (h(Ar), C(() => h(Ar)[1])))), R(Dr, Sr);
                }
              );
              var ui = S(cr), hi = w(ui);
              fo(hi, { size: 14 }), H("click", Qt, () => q(lt[0])), H("click", ye, () => {
                I(u, "research"), q(lt[0]);
              }), H("click", Wt, () => {
                I(u, "research"), q(lt[0]), I(F, "اختر نتيجة صحيح البخاري، ثم افتح «الإسناد» لاستكشاف المثال.");
              }), R(Z, vt);
            };
            gt(to, (Z) => {
              h(b) || Z(Qp);
            });
          }
          var Zl = S(to, 2);
          {
            var Wp = (Z) => {
              var vt = X1(), qt = S(w(vt)), de = w(qt), re = S(qt);
              st(() => B(de, h(v))), H("click", re, () => q()), R(Z, vt);
            };
            gt(Zl, (Z) => {
              h(v) && Z(Wp);
            });
          }
          var Kl = S(Zl, 2);
          {
            var Jp = (Z) => {
              var vt = _1();
              R(Z, vt);
            };
            gt(Kl, (Z) => {
              h(f) && Z(Jp);
            });
          }
          var Hl = S(Kl, 2);
          {
            var $p = (Z) => {
              var vt = kt(), qt = nt(vt);
              {
                var de = (Qt) => {
                  var ne = K1(), Re = w(ne);
                  Rs(Re, { size: 34, strokeWidth: 1 });
                  var ye = S(Re, 3);
                  ve(
                    ye,
                    1,
                    () => (h(A), C(() => h(A).suggestions)),
                    ge,
                    (ie, we) => {
                      var Wt = Z1(), ht = w(Wt);
                      st(() => B(ht, `هل تقصد: ${h(we) ?? ""}؟`)), H("click", Wt, () => q(h(we))), R(ie, Wt);
                    }
                  ), R(Qt, ne);
                }, re = (Qt) => {
                  var ne = W1(), Re = nt(ne), ye = S(w(Re)), ie = w(ye), we = S(Re);
                  ve(we, 5, () => (h(A), C(() => h(A).results)), ge, (Wt, ht, nn) => {
                    var cr = Q1(), fi = w(cr), ui = w(fi), hi = w(ui);
                    vi(hi, { size: 14 });
                    var Dr = S(hi, 1, !0), Ar = S(ui), Sr = w(Ar), Fr = S(fi), na = w(Fr), eo = S(Fr);
                    ve(eo, 5, () => (h(ht), C(() => h(ht).snippet)), ge, (ia, tt) => {
                      var yt = kt(), Nt = nt(yt);
                      {
                        var pe = (ct) => {
                          var ut = H1(), Dt = w(ut);
                          st(() => B(Dt, (h(tt), C(() => h(tt).text)))), R(ct, ut);
                        }, fe = (ct) => {
                          var ut = lo();
                          st(() => B(ut, (h(tt), C(() => h(tt).text)))), R(ct, ut);
                        };
                        gt(Nt, (ct) => {
                          h(tt), C(() => h(tt).match) ? ct(pe) : ct(fe, -1);
                        });
                      }
                      R(ia, yt);
                    });
                    var os = S(eo), ro = w(os), ss = w(ro), ls = S(ro);
                    ln(ls, { size: 17 }), st(
                      (ia) => {
                        B(Dr, (h(ht), C(() => h(ht).collection_label))), B(Sr, ia), B(na, (h(ht), C(() => h(ht).chapter_title))), B(ss, (h(ht), C(() => h(ht).match_label)));
                      },
                      [() => C(() => String(nn + 1).padStart(2, "0"))]
                    ), H("click", cr, () => _(h(ht))), R(Wt, cr);
                  }), st((Wt, ht) => B(ie, `${Wt ?? ""} موضع بيانات · نعرض ${ht ?? ""}`), [
                    () => (h(A), C(() => h(A).total_matches.toLocaleString("ar"))),
                    () => (h(A), C(() => h(A).results.length.toLocaleString("ar")))
                  ]), R(Qt, ne);
                };
                gt(qt, (Qt) => {
                  h(A), C(() => !h(A).results.length) ? Qt(de) : h(x) || Qt(re, 1);
                });
              }
              R(Z, vt);
            };
            gt(Hl, (Z) => {
              h(A) && !h(f) && Z($p);
            });
          }
          var tf = S(Hl, 2);
          {
            var ef = (Z) => {
              var vt = xg(), qt = w(vt), de = w(qt), re = w(de), Qt = S(w(re)), ne = w(Qt), Re = S(Qt), ye = w(Re), ie = S(re);
              let we;
              var Wt = w(ie);
              Is(Wt, { size: 21 });
              var ht = S(de, 2);
              ve(
                ht,
                4,
                () => [
                  ["text", "النص والمصدر"],
                  ["compare", "مقارنة الألفاظ"],
                  ["chain", "الإسناد"]
                ],
                ge,
                (tt, yt) => {
                  var Nt = $1(), pe = w(Nt), fe = S(pe);
                  {
                    var ct = (ut) => {
                      var Dt = J1();
                      R(ut, Dt);
                    };
                    gt(fe, (ut) => {
                      C(() => yt[0] === "chain") && ut(ct);
                    });
                  }
                  st(() => {
                    Le(Nt, "aria-selected", (h(y), C(() => h(y) === yt[0]))), B(pe, C(() => yt[1]));
                  }), H("click", Nt, () => {
                    I(y, yt[0]), I(k, -1);
                  }), R(tt, Nt);
                }
              );
              var nn = S(ht, 2);
              {
                var cr = (tt) => {
                  var yt = ng(), Nt = S(w(yt));
                  ve(
                    Nt,
                    5,
                    () => (h(x), C(() => h(x).arabic_parts)),
                    ge,
                    (mt, et) => {
                      var Ct = kt(), ue = nt(Ct);
                      {
                        var Jt = (ae) => {
                          var Ve = tg(), an = w(Ve);
                          st(() => B(an, (h(et), C(() => h(et).text)))), R(ae, Ve);
                        }, jr = (ae) => {
                          var Ve = lo();
                          st(() => B(Ve, (h(et), C(() => h(et).text)))), R(ae, Ve);
                        };
                        gt(ue, (ae) => {
                          h(et), C(() => h(et).match) ? ae(Jt) : ae(jr, -1);
                        });
                      }
                      R(mt, Ct);
                    }
                  );
                  var pe = S(Nt);
                  {
                    var fe = (mt) => {
                      var et = eg(), Ct = S(w(et)), ue = w(Ct);
                      st(() => {
                        B(ue, (h(x), C(() => h(x).english))), Ct.dir = Ct.dir;
                      }), R(mt, et);
                    };
                    gt(pe, (mt) => {
                      h(x), C(() => h(x).english) && mt(fe);
                    });
                  }
                  var ct = S(pe), ut = w(ct);
                  M1(ut, { size: 16 });
                  var Dt = S(ut, 2), ke = w(Dt), Br = S(ct);
                  {
                    var Ur = (mt) => {
                      var et = rg(), Ct = w(et), ue = w(Ct), Jt = S(Ct), jr = S(w(Jt));
                      ua(jr, { size: 14 }), st(() => {
                        B(ue, (h(x), C(() => h(x).citation))), Le(Jt, "href", (h(x), C(() => h(x).source_url)));
                      }), R(mt, et);
                    };
                    gt(Br, (mt) => {
                      h(O) && mt(Ur);
                    });
                  }
                  st(() => {
                    Le(ct, "aria-expanded", h(O)), B(ke, h(O) ? "−" : "+");
                  }), H("click", ct, () => I(O, !h(O))), R(tt, yt);
                }, fi = (tt) => {
                  var yt = dg(), Nt = S(w(yt));
                  {
                    var pe = (ct) => {
                      var ut = lg(), Dt = nt(ut), ke = S(w(Dt));
                      ve(
                        ke,
                        5,
                        () => (h(A), h(x), C(() => h(A).results.filter((mt) => {
                          var et;
                          return mt.record_id !== ((et = h(x)) == null ? void 0 : et.record_id);
                        }))),
                        ge,
                        (mt, et) => {
                          var Ct = ig(), ue = w(Ct), Jt = {};
                          st(() => {
                            B(ue, `${h(et), C(() => h(et).collection_label) ?? ""} · موضع ${h(et), C(() => h(et).source_position) ?? ""}`), Jt !== (Jt = (h(et), C(() => h(et).record_id))) && (Ct.value = (Ct.__value = (h(et), C(() => h(et).record_id))) ?? "");
                          }), R(mt, Ct);
                        }
                      );
                      var Br = S(Dt);
                      {
                        var Ur = (mt) => {
                          var et = sg(), Ct = nt(et), ue = w(Ct), Jt = w(ue), jr = w(Jt), ae = S(Jt);
                          ve(
                            ae,
                            5,
                            () => (h(x), C(() => h(x).arabic_parts)),
                            ge,
                            (ds, qe) => {
                              var aa = kt(), ps = nt(aa);
                              {
                                var fs = (Ne) => {
                                  var dr = ag(), hs = w(dr);
                                  st(() => B(hs, (h(qe), C(() => h(qe).text)))), R(Ne, dr);
                                }, us = (Ne) => {
                                  var dr = lo();
                                  st(() => B(dr, (h(qe), C(() => h(qe).text)))), R(Ne, dr);
                                };
                                gt(ps, (Ne) => {
                                  h(qe), C(() => h(qe).match) ? Ne(fs) : Ne(us, -1);
                                });
                              }
                              R(ds, aa);
                            }
                          );
                          var Ve = S(ae), an = S(w(Ve));
                          ua(an, { size: 12 });
                          var no = S(ue), io = w(no), cs = w(io), ao = S(io);
                          ve(
                            ao,
                            5,
                            () => (h(r), C(() => h(r).arabic_parts)),
                            ge,
                            (ds, qe) => {
                              var aa = kt(), ps = nt(aa);
                              {
                                var fs = (Ne) => {
                                  var dr = og(), hs = w(dr);
                                  st(() => B(hs, (h(qe), C(() => h(qe).text)))), R(Ne, dr);
                                }, us = (Ne) => {
                                  var dr = lo();
                                  st(() => B(dr, (h(qe), C(() => h(qe).text)))), R(Ne, dr);
                                };
                                gt(ps, (Ne) => {
                                  h(qe), C(() => h(qe).match) ? Ne(fs) : Ne(us, -1);
                                });
                              }
                              R(ds, aa);
                            }
                          );
                          var oo = S(ao), rf = S(w(oo));
                          ua(rf, { size: 12 }), st(() => {
                            B(jr, (h(x), C(() => h(x).collection_label))), Le(Ve, "href", (h(x), C(() => h(x).source_url))), B(cs, (h(r), C(() => h(r).collection_label))), Le(oo, "href", (h(r), C(() => h(r).source_url)));
                          }), R(mt, et);
                        };
                        gt(Br, (mt) => {
                          h(r) && mt(Ur);
                        });
                      }
                      pc(ke, () => h(M), (mt) => I(M, mt)), R(ct, ut);
                    }, fe = (ct) => {
                      var ut = cg(), Dt = w(ut);
                      Cs(Dt, { size: 30 }), R(ct, ut);
                    };
                    gt(Nt, (ct) => {
                      h(A), C(() => h(A) && h(A).results.length > 1) ? ct(pe) : ct(fe, -1);
                    });
                  }
                  R(tt, yt);
                }, ui = (tt) => {
                  var yt = hg(), Nt = w(yt);
                  {
                    var pe = (ct) => {
                      var ut = fg(), Dt = nt(ut), ke = S(w(Dt)), Br = w(ke);
                      qc(Br, { size: 13 });
                      var Ur = S(Dt, 2);
                      ve(Ur, 5, () => Nn, ge, (mt, et, Ct) => {
                        var ue = pg(), Jt = w(ue), jr = w(Jt), ae = S(Jt);
                        let Ve;
                        var an = S(w(ae)), no = w(an), io = S(no), cs = w(io), ao = S(an);
                        Vc(ao, { size: 15 }), st(
                          (oo) => {
                            B(jr, oo), Ve = Ae(ae, 1, "", null, Ve, { "node-active": h(k) === Ct }), B(no, (h(et), C(() => h(et).name))), B(cs, (h(et), C(() => h(et).detail)));
                          },
                          [() => C(() => String(Ct + 1).padStart(2, "0"))]
                        ), H("click", ae, () => I(k, Ct)), R(mt, ue);
                      }), H("click", ke, yr), R(ct, ut);
                    }, fe = (ct) => {
                      var ut = ug(), Dt = w(ut);
                      Gr(Dt, { size: 34, strokeWidth: 1 });
                      var ke = S(Dt, 3);
                      H("click", ke, () => {
                        I(g, "bukhari"), q(lt[0]);
                      }), R(ct, ut);
                    };
                    gt(Nt, (ct) => {
                      h(x), vr(Yc), C(() => h(x).record_id === Yc) ? ct(pe) : ct(fe, -1);
                    });
                  }
                  R(tt, yt);
                };
                gt(nn, (tt) => {
                  h(y) === "text" ? tt(cr) : h(y) === "compare" ? tt(fi, 1) : tt(ui, -1);
                });
              }
              var hi = S(nn, 2), Dr = w(hi), Ar = w(Dr);
              {
                var Sr = (tt) => {
                  fa(tt, { size: 15 });
                }, Fr = (tt) => {
                  qc(tt, { size: 15 });
                };
                gt(Ar, (tt) => {
                  h(N) ? tt(Sr) : tt(Fr, -1);
                });
              }
              var na = S(Ar, 1, !0), eo = S(Dr);
              {
                var os = (tt) => {
                  var yt = gg(), Nt = S(w(yt));
                  ln(Nt, { size: 15 }), H("click", yt, () => I(x, null)), R(tt, yt);
                };
                gt(eo, (tt) => {
                  h(A) && tt(os);
                });
              }
              var ro = S(qt), ss = w(ro);
              {
                var ls = (tt) => {
                  var yt = vg(), Nt = nt(yt), pe = w(Nt);
                  Gr(pe, { size: 24 });
                  var fe = S(Nt, 2), ct = w(fe), ut = S(fe), Dt = w(ut), ke = S(ut, 2), Br = S(w(ke), 5), Ur = w(Br), mt = S(ke), et = S(w(mt));
                  ua(et, { size: 14 }), st(() => {
                    B(ct, (vr(Nn), h(k), C(() => Nn[h(k)].name))), B(Dt, (vr(Nn), h(k), C(() => Nn[h(k)].quote))), B(Ur, `${h(x), C(() => h(x).collection_label) ?? ""} · ${h(x), C(() => h(x).chapter_title) ?? ""}`), Le(mt, "href", (h(x), C(() => h(x).source_url)));
                  }), R(tt, yt);
                }, ia = (tt) => {
                  var yt = mg(), Nt = nt(yt), pe = w(Nt);
                  fo(pe, { size: 25, strokeWidth: 1.4 });
                  var fe = S(Nt, 3), ct = w(fe), ut = w(ct);
                  fa(ut, { size: 15 });
                  var Dt = S(ut), ke = S(w(Dt)), Br = w(ke), Ur = S(ct), mt = w(Ur);
                  fa(mt, { size: 15 });
                  var et = S(mt), Ct = S(w(et)), ue = w(Ct), Jt = S(fe, 4), jr = S(w(Jt));
                  zr(jr, { size: 15 });
                  var ae = S(Jt, 2), Ve = S(w(ae));
                  ua(Ve, { size: 13 }), st(
                    (an) => {
                      B(Br, (h(x), C(() => h(x).collection_label))), B(ue, `نسخة Itqan · موضع ${h(x), C(() => h(x).source_position) ?? ""}`), Le(Jt, "href", an), Le(ae, "href", (h(x), C(() => h(x).dorar_search_url)));
                    },
                    [() => C(ft)]
                  ), R(tt, yt);
                };
                gt(ss, (tt) => {
                  h(k) >= 0 ? tt(ls) : tt(ia, -1);
                });
              }
              st(() => {
                B(ne, (h(x), C(() => h(x).collection_label))), B(ye, (h(x), C(() => h(x).chapter_title))), we = Ae(ie, 1, "icon-button", null, we, { saved: h(i) }), Le(ie, "aria-label", h(i) ? "أزل من دفتر المصادر" : "احفظ في دفتر المصادر"), B(na, h(N) ? "نُسخ مع المصدر" : "انسخ النص ومصدره");
              }), H("click", ie, D), H("click", Dr, it), R(Z, vt);
            };
            gt(tf, (Z) => {
              h(x) && Z(ef);
            });
          }
          st(
            (Z) => {
              tn = Ae(lr, 1, "search-composer", null, tn, { compact: h(b) }), Le(en, "placeholder", h(e) ? "أدخل ألفاظ المتن للبحث في الكتب الستة…" : "اكتب الكلمات التي تتذكّرها من الحديث…"), en.disabled = h(f), pi.disabled = h(f), ra.disabled = Z;
            },
            [
              () => (h(f), h(m), C(() => h(f) || !h(m).trim()))
            ]
          ), Ju(en, () => h(m), (Z) => I(m, Z)), pc(pi, () => h(g), (Z) => I(g, Z)), H("submit", lr, th(() => q())), R(It, be);
        };
        gt(_l, (It) => {
          h(T) ? It(_p) : It(Zp, -1);
        });
      }
      var Kp = S(_l, 2);
      {
        var Hp = (It) => {
          var be = yg(), Cn = w(be), ci = S(Cn), ea = w(ci);
          Nc(ea, { size: 14 }), st(() => B(Cn, h(F))), H("click", ci, () => I(F, "")), R(It, be);
        };
        gt(Kp, (It) => {
          h(F) && It(Hp);
        });
      }
      st(() => {
        wt = Ae($, 1, "workspace", null, wt, { research: h(e) }), Yr = Ae(Pt, 1, "sidebar", null, Yr, { "mobile-open": h(L) }), Ga = Ae(Mn, 1, "sidebar-link", null, Ga, { "nav-active": !h(T) }), Hi = Ae(On, 1, "sidebar-link", null, Hi, { "nav-active": h(T) }), B(_o, (h(z), C(() => h(z).length))), Xa = Ae(Pn, 1, "persona-option", null, Xa, { chosen: !h(e) }), Za = Ae(In, 1, "persona-option", null, Za, { chosen: h(e) }), B(ts, `مساحة ${h(e) ? "الباحث" : "المعرفة"}`), B(es, h(T) ? "دفتر المصادر" : h(b) ? "من الكلمة إلى الدليل" : "بداية الرحلة");
      }), H("click", $r, () => I(L, !1)), H("click", oi, () => {
        I(p, "landing");
      }), H("click", Tn, U), H("click", Mn, () => {
        I(T, !1), I(L, !1);
      }), H("click", On, () => {
        I(T, !0), I(L, !1);
      }), H("click", Pn, () => {
        I(u, "learn");
      }), H("click", In, () => {
        I(u, "research");
      }), H("click", si, () => I(L, !h(L))), H("click", li, function(...It) {
        var be;
        (be = l()) == null || be.apply(this, It);
      }), H("click", Ja, function(...It) {
        var be;
        (be = s()) == null || be.apply(this, It);
      }), R(G, $);
    };
    gt(Ua, (G) => {
      h(p) === "landing" ? G(wr) : G(ai, -1);
    });
  }
  $u(sr, (G) => I(d, G), () => h(d)), st(() => sr.dir = sr.dir), R(n, sr), bl();
}
const Sg = ':host{--navy:#12183f;--violet:#6150ea;--mint:#2ef2c2;--paper:#f7f8fc;--ink:#202645;--muted:#777c92;--line:#e7e9f2;font-family:Readex,Segoe UI,sans-serif;color:var(--ink);font-weight:400;color-scheme:light}.athar-dialog{position:fixed;top:0;right:0;bottom:0;left:0;width:100vw;height:100dvh;max-width:none;max-height:none;margin:0;padding:0;border:0;background:var(--paper);color:var(--ink);overflow:auto;overscroll-behavior:contain}.athar-dialog::backdrop{background:#12183f99}.athar,*{box-sizing:border-box}button,input,select{font:inherit}button,a,input,select,summary{-webkit-tap-highlight-color:transparent}button{cursor:pointer}button:disabled{cursor:wait;opacity:.6}a{color:inherit;text-decoration:none}button{border:0}button,a{touch-action:manipulation}button:focus-visible,a:focus-visible,input:focus-visible,select:focus-visible,summary:focus-visible{outline:3px solid #9485ff;outline-offset:4px}h1,h2,h3,p{margin:0}svg{flex-shrink:0}button{color:inherit}mark{background:#dff6ed;color:#1c5c4b;border-radius:3px;padding:0 .1em}small{display:block}em{font-style:normal}.sr-only{position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0,0,0,0);white-space:nowrap;border:0}.landing{background:#101634;color:#f3f3fd;position:relative;overflow:hidden;min-height:100vh}.landing:before{content:"";position:absolute;top:0;right:0;bottom:0;left:0;pointer-events:none;opacity:.18;background-image:linear-gradient(#9294b418 1px,transparent 1px),linear-gradient(90deg,#9294b418 1px,transparent 1px);background-size:70px 70px;-webkit-mask-image:linear-gradient(#000,transparent 80%);mask-image:linear-gradient(#000,transparent 80%)}.ambient{position:absolute;border-radius:50%;pointer-events:none;filter:blur(90px)}.ambient-one{width:500px;height:500px;background:#5140a92b;top:80px;left:-170px}.ambient-two{width:350px;height:350px;background:#1e978c12;right:25%;top:430px}.landing-nav{position:relative;z-index:1;max-width:1460px;margin:auto;display:flex;justify-content:space-between;align-items:center;padding:32px 5.2%;gap:28px;border-bottom:1px solid #ffffff0d}.brand{display:flex;align-items:center;gap:13px;background:none;color:inherit;text-align:right}.brand-symbol{display:grid;place-items:center;width:40px;height:43px;border:1px solid #8b82ac55;border-radius:13px;color:#b2aaf3}.wordmark{font-family:Amiri,serif;font-size:37px;line-height:1.2;color:inherit}.brand-caption{font-size:11px;color:#a3a6bd;border-right:1px solid #ffffff25;padding-right:16px;margin-right:5px}.landing-links{display:flex;align-items:center;gap:35px;font-size:11px;color:#b9bdd1}.landing-links button:hover{color:var(--mint)}.quiet-tag{font-size:11px;color:#a7aad0;border:1px solid #ffffff16;border-radius:30px;padding:7px 11px}.return-light{display:flex;align-items:center;gap:12px;background:transparent;color:#d7d9e9;font-size:11px;white-space:nowrap}.hero{position:relative;display:grid;grid-template-columns:1fr 1fr;align-items:center;gap:30px;max-width:1340px;margin:auto;min-height:620px;padding:65px 5.2% 45px}.hero-copy{padding-bottom:20px}.eyebrow{display:flex;align-items:center;gap:9px;font-size:11px;line-height:1.8;font-weight:500;letter-spacing:.02em;color:#8d92ac}.hero-copy .eyebrow{color:#b0b4ce}.live-dot{width:5px;height:5px;border-radius:50%;background:var(--mint);box-shadow:0 0 18px #2ef2c266}.hero h1{font-family:Amiri,Georgia,serif;font-weight:400;font-size:clamp(60px,5.8vw,93px);line-height:1.2;letter-spacing:-2px;margin:25px 0 26px}.hero h1 em{color:#b4f0df}.hero-description{font-size:14px;line-height:2.25;color:#a9afc9}.hero-actions{display:flex;align-items:center;gap:28px;margin-top:33px}.button{display:inline-flex;align-items:center;justify-content:center;gap:15px;min-height:47px;border-radius:8px;padding:13px 24px;font-size:12px;font-weight:500;transition:transform .2s,box-shadow .2s,background .2s;line-height:1.7}.button:hover{transform:translateY(-2px)}.mint{background:var(--mint);color:#112f31;box-shadow:0 6px 28px #2ef2c213}.mint:hover{box-shadow:0 8px 30px #2ef2c22a}.text-button{background:transparent;display:inline-flex;align-items:center;justify-content:center;gap:9px;font-size:11px;color:var(--violet);padding:5px 0;line-height:1.8}.text-button.light{color:#d2cbee}.hero-note{display:flex;gap:9px;align-items:center;color:#838da9;font-size:11px;margin-top:34px}.knowledge-orbit{position:relative;min-width:0;height:510px;direction:ltr}.orbital-lines{position:absolute;top:0;right:0;bottom:0;left:0;width:100%;height:100%;overflow:visible}.orbit-caption{position:absolute;top:9px;left:0;width:100%;text-align:center;color:#777f9f;font:8px Readex,sans-serif;letter-spacing:3px}.orbit-core{position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);width:164px;height:164px;border:1px solid #bcb4ed32;border-radius:50%;background:radial-gradient(circle at 40% 0,#6150ea33,#18204680 70%);box-shadow:0 0 80px #6150ea24,inset 0 0 30px #8a72ec09;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:12px;color:#e3e0f9;font-size:14px;direction:rtl}.core-glyph{color:#b8e9e1}.orbit-core small{font-size:11px;color:#939dbd}.book-orbit{position:absolute;display:flex;align-items:center;justify-content:center;gap:12px;padding:15px 18px;background:linear-gradient(135deg,#222b5088,#1b2240ee);border:1px solid #8994c12e;border-radius:8px;box-shadow:0 10px 20px #030b1a33;direction:rtl;white-space:nowrap;font-size:11px;-webkit-backdrop-filter:blur(8px);backdrop-filter:blur(8px);color:#c6cbe0}.book-orbit svg{color:#b2a0e9}.book-0{top:16%;left:10%}.book-1{top:22%;right:0}.book-2{top:50%;left:0}.book-3{top:63%;right:1%}.book-4{bottom:10%;left:19%}.book-5{bottom:15%;right:10%}.orbit-footer{position:absolute;bottom:0;display:flex;gap:12px;align-items:center;justify-content:center;width:100%;font-size:11px;color:#7a859f;direction:rtl}.small-line{width:24px;height:1px;background:#68729466}.orbit-trace{animation:trace 45s linear infinite}@keyframes trace{to{stroke-dashoffset:380}}.journeys{display:grid;grid-template-columns:.8fr 1fr 1fr;gap:22px;max-width:1220px;padding:0 30px 78px;margin:auto;align-items:center;position:relative}.section-label>span{font-size:11px;color:#8d95b1}.section-label h2{font-family:Amiri,serif;font-weight:400;font-size:35px;margin-top:12px}.journey-card{position:relative;text-align:right;color:#dce0f1;background:linear-gradient(115deg,#22284955,#1a2141aa);border:1px solid #7788ac35;border-radius:12px;padding:24px 26px;min-height:220px;transition:transform .3s,border .3s,background .3s;overflow:hidden}.journey-card:hover{transform:translateY(-5px);border-color:#2ef2c255;background:#222c49}.journey-card.researcher:hover{border-color:#9b89fa80}.journey-number{font-size:11px;letter-spacing:2px;direction:ltr;display:block;text-align:right;color:#929bbb}.journey-heading{display:flex;gap:14px;align-items:center;margin:19px 0 12px;color:#c5eee4}.researcher .journey-heading{color:#c5baf6}.journey-heading h3{font-size:20px;font-weight:400}.journey-card p{font-size:11px;line-height:2;color:#949fbf}.journey-bottom{display:flex;justify-content:space-between;align-items:center;font-size:11px;margin-top:24px;padding-top:17px;border-top:1px solid #8991af24;color:#a7b1cd}.approach{padding:70px 6%;background:#0c132b;border-top:1px solid #ffffff0b;position:relative}.approach>.eyebrow{justify-content:center}.approach>h2{text-align:center;font-family:Amiri,serif;font-size:34px;font-weight:400;margin-top:10px}.approach-grid{max-width:1040px;margin:50px auto 0;display:grid;grid-template-columns:repeat(3,1fr);gap:65px}.approach-grid>div>span{color:#9184cb;font-size:11px}.approach-grid h3{font-size:15px;margin:16px 0 10px;color:#d8dced}.approach-grid p{font-size:11px;line-height:2;color:#858fae}.landing-footer{display:flex;align-items:center;justify-content:space-between;gap:20px;padding:27px 6%;color:#7c87a6;font-size:11px;border-top:1px solid #ffffff0b}.landing-footer .wordmark{font-size:27px;color:#b3bcd4}.landing-footer b{font-weight:400;color:#aab3cc}.workspace{min-height:100dvh;display:grid;grid-template-columns:238px minmax(0,1fr);background:var(--paper)}.sidebar{position:sticky;top:0;height:100dvh;background:var(--navy);color:#b4bdd6;padding:29px 20px;display:flex;flex-direction:column;z-index:3}.sidebar .brand{padding:0 8px}.sidebar .wordmark{font-size:34px;color:#fff}.sidebar .brand-symbol{width:33px;height:36px;border-color:#71669b66}.lab-label{font-size:11px;color:#8791b4;border-right:1px solid #8590b033;padding-right:12px;margin-right:auto;line-height:1.9;max-width:50px}.new-journey{display:flex;align-items:center;gap:11px;background:#ffffff0a;border:1px solid #7c84b038;padding:13px 15px;border-radius:8px;color:#d8dded;font-size:11px;margin:38px 0 33px}.new-journey span{margin-right:auto;color:#9ca9c8;font-size:19px}.new-journey:hover{background:#ffffff12}.sidebar-label{font-size:11px;color:#747f9f;display:block;margin:0 13px 16px}.sidebar-link{display:flex;align-items:center;gap:12px;padding:12px 14px;border-radius:7px;background:transparent;text-align:right;color:#9da9c7;font-size:11px;margin-bottom:7px}.sidebar-link.nav-active{color:#e5e3fd;background:#6150ea29}.sidebar-link.nav-active svg{color:#b4a7ff}.count{margin-right:auto;font-size:11px;background:#c6b9ff10;padding:3px 7px;border-radius:4px}.side-separator{height:1px;background:#acb5d619;margin:28px 12px}.persona-option{display:flex;align-items:center;gap:12px;background:transparent;text-align:right;padding:13px 12px;border:1px solid transparent;border-radius:8px;color:#aab4ce;font-size:11px;margin-bottom:9px}.persona-option small{color:#6f7d9f;font-size:11px;margin-top:7px}.persona-option.chosen{border-color:#94a1c133;background:#ffffff05;color:#e3e7f1}.persona-option>svg:last-child:not(:first-child){margin-right:auto;color:#90d3c1}.sidebar-bottom{margin-top:auto;padding:35px 11px 0}.integrity-note{display:flex;gap:13px;align-items:center;color:#7f8aa9}.integrity-note svg{color:#8c9fbb}.integrity-note p{font-size:11px;line-height:2}.integrity-note strong{font-weight:400;color:#adb8d0}.powered{margin-top:27px;display:block;font-size:11px;color:#667494;direction:ltr;text-align:right}.workspace-body{min-width:0;display:flex;flex-direction:column}.workspace-top{height:78px;display:flex;align-items:center;justify-content:space-between;padding:0 38px;gap:18px;border-bottom:1px solid var(--line);background:#fafbfecc}.breadcrumb{display:flex;align-items:center;gap:13px;font-size:11px;color:#9b9fb2}.breadcrumb strong{color:#555e7e;font-weight:400}.top-actions{display:flex;align-items:center;gap:22px}.preview-label{font-size:11px;color:#8b8ba3;display:flex;align-items:center;gap:6px;white-space:nowrap}.preview-label>span{width:4px;height:4px;background:#a493ec;border-radius:50%}.original-button{font-size:11px;border:1px solid #dadeea;border-radius:6px;background:transparent;padding:9px 11px;display:flex;gap:9px;align-items:center;white-space:nowrap}.workspace-main{width:100%;max-width:1210px;margin:0 auto;padding:36px 6% 45px;flex:1}.welcome{text-align:center;padding-top:23px}.welcome-emblem{width:62px;height:62px;display:grid;place-items:center;margin:0 auto 23px;border:1px solid #dcd7f5;border-radius:18px;background:linear-gradient(135deg,#fff,#edeafc);color:#8d7bd2;box-shadow:0 10px 35px #6150ea08}.welcome .eyebrow{justify-content:center;font-size:11px}.welcome h1,.page-heading h1{font-family:Amiri,serif;font-size:43px;font-weight:400;line-height:1.6;margin:12px 0 8px;color:var(--navy)}.welcome>p,.page-heading>p{font-size:11px;color:#85899f;line-height:2}.search-composer{max-width:805px;margin:33px auto 0;border:1px solid #dcdfea;background:#fff;border-radius:14px;padding:22px 22px 14px;box-shadow:0 10px 30px #313d6c05;transition:box-shadow .2s,border .2s}.search-composer:focus-within{border-color:#b6a9ed;box-shadow:0 6px 30px #6150ea0b}.composer-input{display:flex;align-items:center;gap:15px}.composer-input>svg{color:#999cb2}.composer-input input{width:100%;min-width:0;font-size:14px;line-height:2.1;outline:none!important;border:0;background:transparent;color:#343b5b}.composer-input input::placeholder{color:#a7abbc}.composer-bottom{display:flex;align-items:center;gap:15px;margin-top:23px}.collection-filter{display:flex;align-items:center;gap:7px;font-size:11px;color:#777d96}.collection-filter>select{border:0;background:transparent;color:inherit;outline:none;padding:4px;max-width:145px;font-size:11px}.search-type{font-size:11px;border-right:1px solid var(--line);padding-right:13px;color:#a8adbd}.submit-search{width:37px;height:37px;border-radius:9px;display:grid;place-items:center;background:var(--violet);color:#fff;margin-right:auto}.submit-search:disabled{opacity:.4;cursor:default}.quick-examples{display:flex;flex-wrap:wrap;align-items:center;justify-content:center;gap:10px;margin:16px auto 0;font-size:11px}.quick-examples>span{color:#9b9fb2;margin-left:5px}.quick-examples button{display:flex;align-items:center;gap:9px;font-size:11px;color:#7d8098;background:transparent;border:1px solid #e2e4ed;border-radius:30px;padding:7px 10px}.quick-examples button:hover{border-color:#b6ace1;color:var(--violet)}.usecases{display:grid;grid-template-columns:repeat(3,1fr);max-width:805px;gap:14px;margin:42px auto 0}.usecases button{display:flex;gap:13px;align-items:center;text-align:right;background:transparent;border:1px solid #e1e4ee;border-radius:9px;padding:18px 15px;transition:background .2s,transform .2s}.usecases button:hover{background:#fff;transform:translateY(-2px)}.usecases button>svg:first-child{color:#8f84ba}.usecases button>svg:last-child{margin-right:auto;color:#aab0c4}.usecases span{font-size:11px;color:#59617f}.usecases small{margin-top:7px;font-size:11px;color:#9b9fb4}.source-strip{display:flex;flex-wrap:wrap;justify-content:center;gap:18px;color:#a4a8ba;font-size:11px;margin:37px auto 0}.source-strip>span:first-child{color:#777e98}.welcome-footnote{display:flex;justify-content:center;align-items:center;gap:7px;color:#9fa6b9;font-size:11px;margin-top:24px;line-height:1.9;text-align:center}.workspace-footer{display:flex;justify-content:space-between;gap:16px;padding:18px 38px;font-size:11px;color:#a4aabe;border-top:1px solid #e8eaf2}.icon-button{display:grid;place-items:center;border:1px solid transparent;border-radius:6px;padding:7px;color:#8a90a7;background:transparent}.icon-button:hover{background:#ededf7}.icon-button.saved{color:#6150ea;background:#eeeafa}.result-heading{display:flex;justify-content:space-between;align-items:center}.result-heading h1{font-family:Amiri,serif;font-size:33px;font-weight:400;line-height:1.8;color:var(--navy)}.result-heading .eyebrow{font-size:11px}.journey-steps{list-style:none;display:flex;gap:15px;align-items:center;margin:19px 0 0;padding:0}.journey-steps li{display:flex;gap:8px;align-items:center;color:#acb0c2;font-size:11px;flex:1}.journey-steps li:not(:last-child):after{content:"";height:1px;background:#e4e6ee;flex:1;margin-right:9px}.journey-steps span{font-size:11px;padding:5px 7px;background:#eff0f7;border-radius:4px}.journey-steps .complete{color:#8271bc}.journey-steps .complete span{background:#eae5f7}.search-composer.compact{max-width:none;margin:25px 0 28px;display:flex;gap:10px;align-items:center;padding:11px 14px;border-radius:10px}.compact .composer-input{flex:1;min-width:0}.compact .composer-input input{font-size:12px}.compact .composer-bottom{margin:0;gap:10px}.compact .search-type{display:none}.results-meta{display:flex;justify-content:space-between;gap:14px;align-items:center;margin:20px 0}.results-meta h2{font-size:13px;font-weight:400;color:#646e89}.results-meta>span{font-size:11px;color:#9ca3b7}.result-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:17px}.result-card{text-align:right;border:1px solid #e0e3ed;border-radius:12px;background:#fff;padding:21px;transition:box-shadow .2s,border .2s;display:flex;flex-direction:column;min-width:0}.result-card:hover{border-color:#b4a9e3;box-shadow:0 8px 25px #31376c08}.result-card-top{display:flex;justify-content:space-between;align-items:center}.book-label{color:#797297;font-size:11px;display:inline-flex;gap:7px;align-items:center}.result-index{font-size:11px;color:#b1b7c8;direction:ltr}.result-card h3{font-size:11px;color:#9ca3b6;font-weight:400;margin-top:8px}.hadith-snippet{font:22px/1.9 Amiri,serif;color:#424e6c;margin:18px 0 24px;flex:1}.result-card-bottom{display:flex;justify-content:space-between;align-items:center;gap:12px;font-size:11px;border-top:1px solid #edf0f5;padding-top:13px;color:#929ab1}.result-card-bottom svg{color:#9a8ebd}.small-note{font-size:11px;line-height:1.9;color:#999fb3;margin:15px 0}.evidence-layout{display:grid;grid-template-columns:minmax(0,1fr) 247px;gap:22px;align-items:start}.evidence-panel{border:1px solid #e1e4ed;border-radius:12px;background:#fff;overflow:hidden;min-width:0}.evidence-header{display:flex;justify-content:space-between;gap:15px;padding:24px 26px}.evidence-header .eyebrow{font-size:11px}.evidence-header h2{font-size:20px;font-family:Amiri,serif;font-weight:400;color:#364262;margin:7px 0 3px}.evidence-header p{font-size:11px;color:#9299ad}.evidence-header>.icon-button{align-self:flex-start}.evidence-tabs{display:flex;border-bottom:1px solid #e9ebf2;padding:0 26px;gap:25px}.evidence-tabs button{display:flex;gap:6px;align-items:center;padding:13px 0;border-bottom:2px solid transparent;background:none;font-size:11px;color:#8b92a8}.evidence-tabs [aria-selected=true]{color:#7360b2;border-bottom-color:#8673c3}.tab-dot{width:4px;height:4px;border-radius:50%;background:#aca3c8}.text-lens,.comparison-lens,.chain-lens{padding:24px 26px}.source-state{font-size:11px;color:#9c8761;display:flex;gap:7px;align-items:center;line-height:1.8}.source-state>span{width:4px;height:4px;background:#bfa77e;border-radius:50%;flex-shrink:0}.full-hadith{font-family:Amiri,serif;font-size:25px;line-height:2.2;color:#374461;margin:24px 0 25px;text-align:justify;overflow-wrap:anywhere}.translation{padding:15px 0;border-top:1px solid #eeeef5;font-size:11px;color:#7d869c}.translation summary{cursor:pointer}.translation p{font:13px/1.8 Readex,system-ui;margin-top:15px;color:#707b94}.source-disclosure{width:100%;background:none;border-top:1px solid #eeeef5;padding:15px 0 0;display:flex;align-items:center;gap:9px;color:#8b93a8;font-size:11px;text-align:right}.source-disclosure>span{margin-right:auto}.source-data{background:#f7f8fb;border-radius:6px;margin-top:13px;padding:15px;overflow-wrap:anywhere;white-space:pre-wrap;font-size:11px;line-height:2;color:#798199}.source-data a{display:inline-flex;gap:7px;margin-top:9px;color:#7163a2}.evidence-actions{display:flex;align-items:center;justify-content:space-between;gap:10px;border-top:1px solid var(--line);padding:17px 24px;background:#fdfdff}.outline{color:#797a9f;background:#fff;border:1px solid #dedfeb}.small{font-size:11px;min-height:34px;padding:8px 12px;gap:7px}.violet{color:#fff;background:var(--violet)}.insight-panel{border:1px solid #e0deef;border-radius:12px;padding:25px 22px;background:linear-gradient(150deg,#f0edf9,#f7f8fc);position:sticky;top:20px;min-width:0}.insight-icon{width:45px;height:45px;border:1px solid #dcd6ee;border-radius:12px;display:grid;place-items:center;color:#9381b9;margin-bottom:22px}.insight-panel .eyebrow{font-size:11px}.insight-panel h2{font-family:Amiri,serif;font-size:26px;line-height:1.65;font-weight:400;color:#50456c;margin:7px 0 20px}.evidence-checklist{list-style:none;padding:0;margin:0;display:flex;flex-direction:column;gap:19px}.evidence-checklist li{display:flex;gap:9px;align-items:flex-start;font-size:11px;color:#70728c}.evidence-checklist svg{color:#79a998}.evidence-checklist small{color:#9b9bb1;font-size:11px;margin-top:6px;line-height:1.9}.hollow-dot{border:1px solid #b8a887;border-radius:50%;width:11px;height:11px;margin:2px;flex-shrink:0}.insight-divider{height:1px;background:#e2deed;margin:25px 0}.insight-panel h3{font-weight:400;font-size:11px;color:#6f6686;margin-bottom:12px}.insight-panel>p{font-size:11px;color:#9a92ab;line-height:2}.insight-panel>.button{width:100%;padding:11px 10px;font-size:11px;min-height:40px;margin-top:16px;gap:7px}.handoff-note{font-size:11px;color:#a5a0b7;text-align:center;margin-top:8px;line-height:1.8}.dorar-link{font-size:11px;color:#8c7fa4;display:flex;justify-content:center;gap:7px;margin-top:21px}.insight-panel .small-note{font-size:11px}.insight-panel blockquote{font:21px/1.9 Amiri,serif;color:#696780;border-right:2px solid #ccc3e4;margin:0;padding:0 13px}.insight-panel dl{font-size:11px}.insight-panel dt{color:#8c84a0;margin:15px 0 7px}.insight-panel dd{margin:0;color:#a5a0b4;font-size:11px;line-height:1.9}.compare-select{display:flex;flex-direction:column;gap:10px;font-size:11px;color:#797c98}.compare-select select{max-width:100%;padding:10px;border:1px solid var(--line);border-radius:7px;color:#6d6f8d;background:#fafbfe;font-size:11px}.comparison-columns{display:grid;grid-template-columns:1fr 1fr;gap:15px;margin-top:20px}.comparison-columns article{min-width:0;background:#fafafd;border:1px solid #edeef6;border-radius:8px;padding:15px}.comparison-columns p{font:20px/2 Amiri,serif;margin-top:13px;color:#5d6883;overflow-wrap:anywhere}.comparison-columns a{display:flex;gap:7px;color:#9483b1;font-size:11px;margin-top:12px}.chain-caption{display:flex;justify-content:space-between;gap:10px;font-size:11px;color:#8c87a2;align-items:center}.chain-caption .text-button{font-size:11px}.chain-nodes{max-width:410px;margin:22px auto 0;position:relative}.chain-row{display:flex;align-items:center;gap:14px;margin:0 0 21px}.chain-index{font-size:11px;color:#b4b0c5;direction:ltr}.chain-row button{position:relative;display:flex;align-items:center;gap:14px;border:1px solid #e0daed;padding:14px;background:linear-gradient(110deg,#fcfcfe,#f9f7fe);border-radius:9px;width:100%;text-align:right;font-size:11px;color:#68637e;min-width:0}.chain-row:not(:last-child) button:after{content:"";position:absolute;right:18px;width:1px;background:#c8bddb;height:22px;top:100%}.chain-row:not(:last-child) button:before{content:"";position:absolute;right:16px;width:5px;height:5px;border-right:1px solid #b4a3cc;border-bottom:1px solid #b4a3cc;transform:rotate(45deg);top:calc(100% + 8px)}.chain-row small{font-size:11px;color:#b0a7bf;margin-top:7px;line-height:1.7}.chain-row .node-active{border-color:#ac96cb;background:#f2eefa;box-shadow:0 3px 12px #ac96cb15}.chain-row button>svg{margin-right:auto;color:#b5a3cb}.node-dot{width:8px;height:8px;border:1px solid #a892c7;border-radius:50%;flex-shrink:0}.node-active .node-dot{background:#b3a3cc}.empty-state{text-align:center;display:flex;flex-direction:column;align-items:center;gap:15px;padding:55px 25px;color:#a39abb}.empty-state h2{font:29px/1.5 Amiri,serif;color:#666580}.empty-state p{font-size:11px;max-width:410px;line-height:2;color:#9299ac}.empty-state h3{font-size:14px;font-weight:400}.empty-state .button{margin-top:10px;font-size:11px}.page-heading{margin-bottom:26px}.saved-list{display:flex;flex-direction:column;gap:15px;margin-top:25px}.saved-item{border:1px solid #e2e4ee;display:flex;align-items:center;gap:20px;background:#fff;padding:23px;border-radius:10px;color:#7c7298;text-align:right}.saved-item span{font-size:14px;flex:1}.saved-item small{font-size:11px;color:#a19aaf;margin-top:10px}.notice{position:fixed;bottom:22px;left:50%;transform:translate(-50%);padding:13px 17px;display:flex;align-items:center;gap:20px;color:#d8dcec;background:#222b49;border:1px solid #56617c;border-radius:9px;font-size:11px;max-width:90%;z-index:5;box-shadow:0 10px 30px #12183f15}.error-box{border:1px solid #e6ccd0;border-radius:10px;padding:22px;color:#ac747d;background:#fdf7f8}.error-box h2{font-size:15px;font-weight:400}.error-box p{font-size:12px;line-height:2;margin:10px 0}.error-box button{font-size:11px}.spinner{display:inline-block;width:17px;height:17px;border:1px solid currentColor;border-bottom-color:transparent;border-radius:50%;animation:spin 1s linear infinite}@keyframes spin{to{transform:rotate(360deg)}}.loading-state{color:#9187ac;font-size:12px;margin:30px 0}.loading-state>.spinner{vertical-align:middle;margin-left:8px}.skeleton{height:125px;background:linear-gradient(90deg,#eeedf5,#f9f9fc,#eeedf5);background-size:200% 100%;animation:shimmer 2s infinite;margin-top:20px;border-radius:11px}@keyframes shimmer{to{background-position:-200% 0}}.mobile-only{display:none}@media (min-width:1600px){.hero{min-height:680px}.workspace-main{padding-top:55px}.welcome{padding-top:50px}.usecases{margin-top:55px}}@media (max-width:1150px){.hero h1{font-size:69px}.hero{gap:25px;padding-top:40px;min-height:570px}.knowledge-orbit{height:460px}.book-orbit{padding:12px 11px;font-size:11px;gap:8px}.orbit-core{width:138px;height:138px}.landing-links{gap:20px}.brand-caption{display:none}.workspace{grid-template-columns:210px minmax(0,1fr)}.sidebar{padding:25px 14px}.workspace-top{padding:0 25px}.workspace-main{padding:32px 4%}.evidence-layout{grid-template-columns:minmax(0,1fr) 210px;gap:15px}.insight-panel{padding:21px 16px}.usecases{gap:9px}.usecases button{padding:17px 11px;gap:9px}.usecases button>svg:last-child{display:none}.workspace-footer{padding:18px 25px}.text-lens,.comparison-lens,.chain-lens{padding:20px}.full-hadith{font-size:23px}.evidence-header{padding:22px 20px}}@media (max-width:900px){.landing-links>a{display:none}.hero{grid-template-columns:1.1fr 1fr;gap:10px;padding:40px 5%}.hero h1{font-size:60px}.hero-description{font-size:12px}.hero-actions{gap:18px}.hero-actions .text-button{font-size:11px}.hero-actions .button{font-size:11px;padding:11px 17px}.knowledge-orbit{height:400px}.book-orbit{font-size:11px;padding:10px 9px;gap:6px}.book-orbit svg{width:13px}.orbit-core{width:115px;height:115px;font-size:11px;gap:9px}.core-glyph svg{width:26px}.orbit-core small{font-size:11px}.orbit-caption{font-size:6px;letter-spacing:2px}.orbit-footer{font-size:11px}.book-0{left:5%}.book-1{right:-3%}.book-2{left:-3%}.book-3{right:-3%}.book-4{left:7%;bottom:14%}.book-5{right:1%;bottom:19%}.journeys{grid-template-columns:1fr 1fr;padding:0 5% 50px}.section-label{grid-column:1/-1;margin:10px 0 0}.section-label h2{margin-top:5px;font-size:29px}.journey-card{padding:22px}.approach-grid{gap:30px}.workspace{grid-template-columns:178px minmax(0,1fr)}.sidebar{padding:24px 11px}.sidebar .brand{gap:9px}.lab-label{display:none}.sidebar-link,.persona-option{font-size:11px;gap:9px;padding:11px 9px}.persona-option small{font-size:11px}.new-journey{font-size:11px;padding:12px 10px}.workspace-top{padding:0 20px}.preview-label{display:none}.breadcrumb{font-size:11px;gap:7px}.welcome h1{font-size:35px}.welcome>p{font-size:11px}.evidence-layout{grid-template-columns:1fr}.insight-panel{position:static}.insight-panel h2 br{display:none}.evidence-checklist{flex-direction:row;flex-wrap:wrap;gap:20px}.insight-panel>.button{width:auto}.insight-icon{float:left;margin-bottom:10px}.insight-panel .handoff-note{text-align:right}.dorar-link{justify-content:flex-start}.insight-divider{margin:18px 0}.insight-panel h2{font-size:24px;margin-bottom:18px}.insight-panel .small-note{margin-bottom:0}.full-hadith{font-size:25px}.usecases{grid-template-columns:1fr}.usecases button{padding:14px;gap:15px}.usecases small{display:inline;margin-right:12px}.usecases button>svg:last-child{display:block}.usecases{margin-top:30px}.source-strip{gap:12px}.workspace-footer{padding:18px;font-size:11px}.result-card{padding:16px}.hadith-snippet{font-size:21px}.results-meta{align-items:flex-start;flex-direction:column;gap:8px}.compact{flex-wrap:wrap}.compact .composer-input{flex-basis:100%}.compact .composer-bottom{width:100%}.compact .submit-search{margin-right:auto}}@media (max-width:620px){.landing-nav{padding:22px 6%;gap:14px}.landing-links{display:none}.brand-symbol{width:32px;height:35px}.wordmark{font-size:31px}.return-light{font-size:11px;gap:6px}.hero{display:flex;flex-direction:column;padding:45px 7% 20px;gap:5px;align-items:stretch}.hero h1{font-size:67px;margin:25px 0 20px}.hero-copy .eyebrow{font-size:11px}.hero-description{font-size:12px}.hero-actions{margin-top:26px;gap:21px}.hero-note{font-size:11px;margin-top:23px}.knowledge-orbit{width:100%;height:380px;margin:10px auto 15px;max-width:370px}.book-orbit{font-size:11px}.orbit-core{width:132px;height:132px}.book-0{left:8%}.book-1{right:0}.book-2{left:0}.book-3{right:0}.book-4{bottom:11%;left:15%}.book-5{bottom:18%;right:3%}.journeys{grid-template-columns:1fr;padding:0 7% 48px;gap:15px}.section-label{margin-bottom:8px}.journey-card{min-height:200px;padding:23px}.journey-heading{margin-top:17px}.journey-bottom{margin-top:19px}.approach{padding:45px 7%}.approach>h2{font-size:28px}.approach-grid{grid-template-columns:1fr;gap:28px;margin-top:32px}.approach-grid h3{margin-top:10px}.approach-grid p{max-width:320px}.landing-footer{padding:25px 7%;flex-wrap:wrap;font-size:11px;gap:15px}.landing-footer>span:nth-child(2){order:3;width:100%}.workspace{display:block}.sidebar{position:fixed;width:245px;right:0;top:0;height:100dvh;transform:translate(100%);transition:transform .25s;box-shadow:-10px 0 45px #12183f22}.sidebar.mobile-open{transform:translate(0)}.mobile-only{display:grid}.workspace-top{height:67px;padding:0 13px}.breadcrumb{font-size:11px;gap:5px}.breadcrumb>span{display:none}.original-button{font-size:11px;padding:8px;gap:5px}.top-actions{gap:0}.workspace-main{padding:29px 20px}.welcome{padding-top:18px}.welcome h1{font-size:34px;line-height:1.5;margin-top:16px}.welcome .eyebrow{font-size:11px}.welcome>p{font-size:11px;margin:12px auto;max-width:280px}.welcome-emblem{width:55px;height:55px;margin-bottom:20px}.search-composer{margin-top:28px;padding:17px 15px 12px}.composer-input{gap:11px}.composer-input input{font-size:12px}.composer-input>svg{width:19px}.composer-bottom{gap:10px;margin-top:18px}.search-type{font-size:11px;padding-right:9px}.collection-filter select{font-size:11px;max-width:113px}.collection-filter{gap:3px}.quick-examples{gap:8px;font-size:11px;margin-top:18px}.quick-examples>span{width:100%;text-align:center;margin-bottom:3px}.quick-examples button{font-size:11px}.usecases{margin-top:28px;gap:10px}.usecases small{display:block;margin:6px 0 0;font-size:11px}.usecases span{font-size:11px}.source-strip{gap:10px;font-size:11px;line-height:1.9;margin-top:27px}.source-strip>span:first-child{width:100%;text-align:center}.welcome-footnote{font-size:11px;align-items:flex-start;gap:5px;margin-top:18px}.workspace-footer{font-size:11px;padding:16px 20px;flex-direction:column;gap:7px}.result-heading h1{font-size:27px}.journey-steps{gap:8px;flex-wrap:wrap}.journey-steps li{font-size:11px;gap:5px;white-space:nowrap}.journey-steps li:not(:last-child):after{display:none}.journey-steps span{font-size:11px;padding:4px}.result-grid{grid-template-columns:1fr}.hadith-snippet{font-size:23px}.result-card{padding:21px}.evidence-tabs{gap:23px;padding:0 20px}.evidence-tabs button{font-size:11px}.text-lens,.chain-lens,.comparison-lens{padding:20px}.full-hadith{font-size:25px;line-height:2.1;text-align:right}.source-state{font-size:11px}.comparison-columns{grid-template-columns:1fr}.comparison-columns p{font-size:23px}.evidence-actions{padding:16px 20px;flex-wrap:wrap}.evidence-checklist{flex-direction:column;gap:18px}.insight-panel{padding:23px}.chain-caption,.chain-row button,.chain-row small{font-size:11px}.chain-row{gap:10px}.notice{font-size:11px;width:90%}.search-composer.compact{padding:13px}.result-heading .eyebrow{font-size:11px}}@media (prefers-reduced-motion:reduce){*,*:before,*:after{animation:none!important;transition:none!important;scroll-behavior:auto!important}}.landing-links button{background:transparent;color:inherit;padding:0;font-size:11px}.close-menu{position:absolute;left:8px;top:8px;color:#b1b9d2}.welcome>p,.page-heading>p{font-size:13px}.sidebar-link,.persona-option{font-size:12px}.sidebar-label{font-size:11px}.welcome-footnote{color:#737d94}.source-strip{color:#7e869d}.hero-note{color:#9ea8c2}.small-note{color:#737c94}.source-state{color:#8b724b}.search-type{color:#788299}.preview-label{color:#777e96}@media (max-width:900px){.landing-links>button{display:none}}@media (max-width:620px){.search-type{display:none}.welcome>p{font-size:12px}.journey-steps li{font-size:10px}.workspace-top .breadcrumb strong{font-size:11px}.original-button,.source-strip,.workspace-footer{font-size:10px}.chain-caption{align-items:flex-start;flex-direction:column}.welcome h1{font-size:31px}}@media (max-width:620px){.sidebar{visibility:hidden}.sidebar.mobile-open{visibility:visible}}.variant-actions{display:flex;align-items:center;gap:22px}@media (max-width:620px){.variant-actions{gap:12px}.top-actions{gap:6px}.top-actions .original-button{font-size:9px;padding:7px}.landing-nav .return-light{font-size:9px}}', zg = "data:font/woff2;base64,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", Eg = "data:font/woff2;base64,d09GMgABAAAAADgwABAAAAAAgAAAADfPAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAGoFOG8QIHIluBmA/U1RBVEQAhSIRCAqBiCDrQAuERgABNgIkA4kIBCAFhGQHjAIMBxtAbiXc2JTBeQBBlC/HVxTBxgEBInvKUdQNTiqR7P+/JsgRMkPUC/CtnRMOoVBSEOkMPYvOrmb3aLdnky4JSkGhXB17o4FL/dUxicYkDuEQjrGcY88HP7l0yqY09SEuic+WzRvm9XZ/4uN4ACz1ysu/ivsX7/k9d20lFtwdxSEqwp6kcmvq1iM09kkuT5DcP++Z2fvwQSAQqrgz26SiO2uP+Dn72X2SvBgQgofw8KBJg1sQraFSaAgcwbRu5wY1+/SOikOdq/O51ilVakCvGZ7fZk9XFm5ExadapP4n2gZBQZlg5Fyxcm53q7h2m5frdNlXWT4/f79hX5msmdHzJwOzMeoadY3ieeQHBsoveMFT+8XezHKxXitiFGMxN1P7YDLs0bvZ7wB9skNOS2qGnJms0OSMij4X+hu+60ZNDHo8b7v/JAAIpLuiyYYFAAV6Xq3QpMhLccloRgO1AT3k2gDcb8EzhKD9O6e51wYuzS8AqZGanHCDWG6HG4W5sy0WQxa7UUvhK2QH53S3u/HX5s5NF5jTMQe62pr6+v9v088q58zVXeWPLCfH82EBrbNxEFvZIQWpTHrsnt7VzGjmekyydz2e71ifTix5c1a2Ah8Cmj9fJ2NYYAeQOskO2H/RC8xlgKDCLh01ddqSuGhb5uFrLLX3ghsFbE/exLhYtXf8s2HQBAVyZeEqZI0FsrGuwtTf+7kvF8aesbF5rMaY4SHm7GepvvMtmydD8zPpHcxgzOC6woigZoURInt+Lj3G1EpMtEM7ls371iBBRLjgBRddK6vjHBZYNrAu8E4ilGi+5FjmMKRNFxAklMhcLx7GQ0Pd1SzKhq3O3D52rYfEQeI1BrO0Sl002IQ3CO+8R5gOCURoJAQUERIjYhoZAoKBfYG1YRR/EXgEUEwUgfFlgUICAtaUohN58qlJs8D7hqGiYnC6bahsPljenanXgjcSMGdA4e5krN4Ay1jirlvqtCD/YeZBek/3ZRaQAEXjjN0hRiBRANDxXV1jy6psaUM2xdUZfxCjGUJ4ELQ0C3NAi50EpF2lXWNJo9itVlXJK70kSLeFfJkyipskVpeEy9AChReRF+PRISVtY3pk4EtnqkVFJ07usylxEZSuLpOdqUmBrpXSS7pYmURTu0hMTRUKCC60+MZ+aHwgQAmn4sCcAG4zGioH34OrKetLegLRQnYj3WOdKZolGSTW17OIYLSVwqb01ssPZN7X5RuNS1dUgMalUyq48VI/VR1bQRz8DlIqXNux2KVnXDGhe6hQ3jWT8ce+f3FfdbwUHnS0NwBXEud6qkfq93dvt/eP/tRv+llayIau6pJ2t7XD7Wu+bU0mt6FRuP66Ifp6tvpXVfc6lUW9j7WspCLMxa82Ixh9yFu4LzI2F+5lJNew86UM5sSHHsjB7M7W/JYf8tXlo9uSdVmRRenMvAyx6OZq0kGzp5NIXcLxxhnrpZ5vlHGNQ2QxTy3ZwUTQTyNAGSDTPbHBW3uq5NKBqD0I0QLXoQ1bdRwF0tjGQEsjSTkvEHkVTxAG43+sHmA1RYa20dlPbCvKWXHHpYqcZpLEK4ldWRxDfLww23K8NxByCNg5YRAOMv94+A75Np9WjA0jA1pCz/LcDV9hOdd1uB1cB2QxiUMRCckVA3u4g8tLqX19IeLVwNX2dsR9ztot8keP+8h5jvbJkpEjwo3owSFCHAdM5zhgIy8Bz9aFi7X8kcRZmI/zIN/DyPMZAeMOfU6mIgE0kwLvBt6ao68Pv/Lt7r0bXpn8YngWHh/3YCuwJjdCv/1wawgZN8XTiIhyJgFTVf5CMIO/dTvbEGvdC2up+8UMLC06mbElGNElgjEiii/eExDqDJJORowl6OqDEejwS/CaM3QNpWHG2upBa6dmjS+viDmfWAzyzCMmiSLAv72GOgVbp2lStvEKDFwDAW8ADaAHhLoB0IaTkfZ4gvE/xVtGuAE0ACq8SDrSHLcSXTmmxcfBchUsJw4CDkb48WGDCTwXGaVYjnXIYhLnIhISL8YeXMqrgdvZHaiNRMQ9xw7sinjE44WN3Axsxtl4H/I3ITgaCgkBJZYhU5k/S34AMS6sFg/mgASupIJRnq1Y8x1z3AlnDMJovReN1KcRzmjIWQ0b1JAhF0NgYl8IK3dYyEbB8MEr4+64ZW8wbOedt1hnwTnRTqtQNsTYAgststgSSy23Uq8+dD3goIqaw+56YhyysALEfNqijOUBYUHsNGOJcJcczQMdOKlwsFF0BMGLeK62rLUOmBbKrsXM4MGBdZ0VeXRvSl8y4grjUQttPMJkLRdZg4Ul2nE8EUAyLJ+J2LL3sQTwIpc7W+e7tvJgdxfTkdSpMzPmcQHMDdBonNHsdH7cMOgCG2PAs2YaN3WFZVU/tfQeO/mAZ2rnuk/KeX76OtXPajEb/bJ/0N8kVY6PVtlSMBRKFWa7f7m5i1kxtkjy6TFrkwJ7hoYAKwLGAsf9sm0n006ahXWVJ+mIGdbQ4bEI1qdbT9MO0lPtszRTjge2N6n1fOVVYXXVvdzEkXkuMynM4sA+sUHsxtHSPCI59OA3qZpj3N2loPn6vbK/5hW3YiHbWTnBVvPO1ZhG55Mia02HSjqDCEsJV9SSjk7kKCvJH8qir8j2TadM8ne8vmlXs5iWmG4Xg5QCwoBuUppYVWCCkxl7Ff9BLcIayzA3PZE0w5KwTnZI+K67TrTHVccPKERTajqazlf0eKBookaeXbDsDDQnSWOmuYEd/9VkmG8PTMyBAPNNm9BWETYJlisjd+g71ZobANt2hRctZ9mtPAJ7zbUrJ2TWJp6D4Cc3GpRtSb8/flKosZ5+egYKj1+THy4L2xHmMlGxZ2hN4ymW05ZBLYJCfNb4rXWSiHNgVO5eiv6AvIJ+ndb3bO5nlv0xwaBfo04zKuOT29BRrtavztUbh7nI+XDu9SFWCAInNELEDPOUGL+xA6x6azLoeNz8zYi6s23clIwYQcc27ydjCU6BZ48ZdG8IviVUMNLQ8GTl/KgAUlnN7vt3ivmNryqnyJGGjMR+FPkC+yhc5bp6dtPZiIpOznpFNkJCCdWWGhDCaXX0r1qw7S56vqiYfJZRD4tz2f6/N+PW9AzkQpp8J1CoDMZjMBXRlD//LAiaVOfGnan2PdCW8Qekut2mYmMPnbvnop+Oal89brSEuEkwpKvz6j/jyyAeWMeEJ5UZ20WaRnf59fbpjp1oOHOmeXCoBXsjLskw5jwe5gsIoQSbmBCmplgqNbG2xXYuhKsbdncnPDywpyejUBgovWkfHytfXyM/P6l/gCAwUBwciaKjuTHJKCWFn5pqmJbGzcwyzc7h5uZzCspRRYVs3jxuZSWqquLMn8/TaPjV1SJtHaXTsfX1xg0Nto3NwpYWSVsXv7fXpq/P+tgJszNnLM6etRwctBgassShiEswDMnjOQpFyMCYlEicTEzMpFK+tTUrk4nt5MjFhXR1s3V3Rx4exp6ePIXCXOlN+fg4+/pa+fnJ/QNEgYGmQUH86GgcE2sRF2etVqP4ZDolxT411dLUkfS5jLUgEBvLZuPlGCzALZTh8otLVwAxuqAEhYjRBDnohlJ0R0PXqBWaoE2zb9cEHZpBp8Z0sYFT0Q5l4CDADpYfU1ckIEHECMkIg5DDpl4Gey9s4LlhnkqJrfkuK9Zujz/GuEZS/Zgbc075gL/yEmfab7f16THjb+XNZLzme9o7vLQK20eZejMMcIJ1VJEEwQgaENYJJamPutZ1ndJOLTsH98M21zorpnZq+mqP03Nu6vLCLKBfeh4f11nMc5MrYMYsjDmINpQz4sqDuV9ml/IRwFqQSHaOKHellsZtwuXeclXxmVt5NJ0WMdPgJNOPSrKd9kl1wEGzHXbE3Dmc8CxnDcl1xbACfIoO+aT5Rv5BgNyhug5dRv04jZo0Bw69HDVUYKB4YEIgUWgc3DNpgn3AXAYCiULj4GbclYKjEAgVJlyESDFixVGLlyBRkuSz1KBAoxCKFCtRqky5yn0OFHpZmqZI8sGPfVvml+KfQHfe2ux3P+NnCYhJSFt27DmEIzhxJufC/a1CEWxFCAkVJlyESDFixVGLlyBRkmQFChUpVqJUmXKVtW74GQImZ9LITsMeHDhy4kzOhftHVfVyanWZZLLwPgrbp30xUPo6yaeMupfT/1u6WhT4gUCKickAAAAAQC/TwVRPIYEEEkgggQQSSCCBEVBpJpBAAgnUuXq5YFnVAuB6N7jRTW52i1vd8Zi7i3T1NVTxgpJwQiBRaBzc4BMBk5aPEBERETMiOBIhIlSYcBEixYgVd6buTTwkSJQkuRUQAAAAgP8RzM/QFOiqNBTx4tv0wqIuOjV86iHy4KQar1HFj1sxm3VlEBERsWFEQ6p4Oo7o8BCt4EQATnWxubB8LKEP+GzOcAZFXWFPsduvHNQYzvWT8EcjpuTej3Yh7S7Yh2bk6FXlcC2O0A0tNkhaw3NHcoJ098XRrOMSeKxf0mjR0fEqMUF3yGB9g7nbN8hAv6xBq54khx4Sj1lefuy2Wyp4GTjqN0FSAaWjtCCpQcz7woDEsB3oVlSWKssmvMm3s2gXjvynCvbWY4bEYeYKQrVwA43a1w6Z8bcYyDg8RALNBk1nPqSZgRzkcOdCRIcwJ3oHo4+f3IFnJ4nqxKKBxXbJK87Emxv9IrkbwBoyg4rE3O1zqTaIRk1tuYbK2VFyx+VbJ8kI8PMEiQk79hw4cuJMzoX7DcGsjiGfUWZ1TfoW4SiJs+SGuGBWtr90OPAAMlcH04aanwGZZ2QUiugfKAOf/viLxHac68OsL46jrowvOzVzjbcjMVf6BN25bdDmwt+agMfw9eQJZoUGAiPw8KO2mba5bXPaptumgPRIEC6iTjpfGt70qmthY6m2phpWl9cVlcCIprKiCAqamhINDF9hH+axDZPYUB7VNlTXgV8ee4IGNVpUGCIxgLxcog5GxIw9MJQAtSIPz7QjXdO0CnIkX2XZWf3sMGIYDGNuOcWFbnU8wx4XCtk3XgjFiYw5MYEuWI5O1tK1JVJ0ILwc7SSRDkGDCIh7ofMtvEQ54QEaQTwBW9sYHlllM6CDtLVY2+JbSPhHiR49x7LJB15AgsfURZcssNKgTXfASbWYotGZCxCNIHtguobIMhEDGcyByO5gHaTYoAxW7pJaK2f6EATSN8TMzQSmUdBQOpxlHgeIPawTZYkpY79CxbmRgRDOiQBBQoQbBNi7ANREMGDvqTEfF+v9N+6/ckyA9sbnv2ZchHCGpumBnXJsnCgiZIAMYxRxTGMW81jEMlaRxjoyW0al4BAd8AZiylttKH0YjN/7RwhTKt79TgxlyFJTwCjpFw1czuhzBYiR+nxz0MCCRgZXotaFWYYEJYshkxCfVNDhc7A1HXdPQX0hqWwnboQWnaWgNk3PqF8cnUxk7bIOBfrKZgJnxW8/11IlyOldPg9uA84k/0DZOQIDhDtuQjyaNFh8pG7bA/oWLug6uB/YHgHh54GNr5Sdj9Lpp2SmoSKAx97z6hGAkCC5JPreOiAmGoCEKQDKQ1zy2MB9Fe0a4FgskoyQQoBO+hTNyMye7Yne6K2BCJJgCPvtGXYtdmPWkpWxdqwT68UGstGs3h12tBPbmej1rIOlFOg70WUZnWgBYhDclo1Yc1baOuC6/E7gQsDMtAX8/6SPylJRvAP87xcffD9aNdoKwM8/o8Zo82jh6MdR/fv7R4IjFwABRwOXGwXknfkKAHlrPkuyb9xM6vS/dD9kh0v2+9crwy474qh9HuhzSK8Dttpm3JgndrkC4eETMiBhwpQZKWsyNlh2XLnz4ElByYcvP/4CnXDQSS8cDgeCRYsRJ16KVGnSZcqWI1eeAhUqVZmvmpZOvQaNWhxz23HP/G6n/7tr1D0jroaGa7qd89xfrkcANz31vR/ChZf+sSdC+E6P8372k1/sRsNIXBQOhoAxQ0bErJizYEnElhN7DuQcPeLM2wwqXgK40QgXIlSkMBGixEqWIFGSuWaaZTa1fCUKFSlT7LFSdWrU+kSTeZq5KA87rGl6fwkBg4accsZZpyFo6tcDZEdATwbZA2zwerDZB8HS+WB8CGDAc29VEN640vsGzc+RUeIjMkVnQADycevCZmR6RIhCTD+RFz6u6pQy9ikOUJsJTOLnpzOSXZkJEcGU5qkpL0SceKZ0HYBCVgQ08p8ZxEhMOICNR1YEQ88O0oizDsSkGJAh0aYolYoA6+Imwoj8pwECGzHUCOe/J4dNkGXG7M7DeQW2HqKyKUVQ5FmKaVTunPX267oO9qOKeAk+XYvx8MtqmWhzg6grxyU9CEtbfPjZiwDuV8qLcN3i+17I10pUKYlZOCGL+4rl5jmWXSPZdrcg2m5FoJaOuic7ggXPVn8Zkgpk/Sg6DmOKQoGc65/MbXZf2ZDFAlqJQVxM3KS3yluZuvZ22RAkFh3nx1D1zYCXqAKZO6yELa9WS1TczmfRJL0S7cJythcaP5r3O32T7p0+io9Vcwqo6v7ns5yf7gbl1s7FbKoVFLvdqqsoO5eEu6VUuLFGIVZycVTAKtHsyMIQxYeCxAvvQV88x2aAOvoIsFimBptm0AE8+j0GPjcBxMJo6XE2jmlCNBEvEvvh68ZR3tRQSTQR52+u1FX0kZ3PAN7epRamg0LcrPRYP7GaRM0AUbdHiwZVVDor2egBsVFQ8vli39r7nrOnaAEBzZTmpSYk3Lisj0fKtnkfVlynyUUtSJGJv4SLSoZMx9gi64UkP8hECzXnERnjplpcEDEZo7NDK/AuiNmVE3Z8+epysgEzjcqKbeRzaBfkW4G/+Z1nzRdS5uk8LJX9a7GwFcRhDvAmwpnx1tRM5hLQAxTDVVhDSDBIIfBW+DZDpqdU7S95N0WTyRll5DbL9s8JuazrTQCCf3j5wnzb347GR+o268Y0T6Mk5KGl83O2uki0Bqpl24LRCDQ0eZcYf/6XhwHl5fmK8/LyCHup2ROnYxZ+eMrr1Tbn2i0N0yvR5enCo3R8RzWbe6+WgcnpezK5Wxc6KuYEzjrpqKdJE0JuhBUUkhWpEMWc96EJj4kZQ1cSEzMWXC03ugbLTdVgUU881HSeJYq3vgKcMWaGQ8VmGYl2oqd9s02LtrLe3j6JXteompoKC7wdHfICf7+ygbUu0mgPYX080kUsBE1q6XJjxS6EOI0NBeyRTOOnnmYlD8USY+soV7I++damiH2ghQJ6o9VSSMd8wpMafN5ayDnBVX5ATcinkrNLAm9GMD7aKmogh6p++HyYFTh23ioivfTOtN65/IpstukasRW96kqOy/dDQ202OyzpfQtolT8jKprslV/r1KHmvGL5nHEaba09xqwXzvjBWABLrDmJMV3gwvcFfXkvDPw9u3JWQQqJWfdeFP04LX3Ejnt+KkaNYljRq+r50DGNFBzpiHeT9DFqyWfDxsRaNaHqLeEil7vZPvFpx2lHjb+rUrkGeZvdVveiTrhaK3paCBL1XSDZO9cb2450mXR8Vf5ltWHOY25ME9BWpmSSDHvFSWy3bfsdkOgpnVk+kr8h29B0GG5LKfBXMFyY70iJUs6RPMz8Qz/Nqq6I/Lwtvz8/53CzrovicU+8bf4bosOVD6ARFM4+YgyRNzDcLRu1q0vaD2UA3jV08gFFTKvARAf0ipWusldgCMnbdXynthwYKNks1RxuRURqyA8n79E5ayZ5LnmOY+e7F1vdLzKETOI+1DR1QDceNQEbc5PEoIlCnDdbFb4tsNm80yvilZt1S3cscyabtxSxl6HAqUUy5DITEi0MFIJCtixneoBkmOZtMlr08Ge1lXeNHVlE4fe33Zdy13PmpBbLNapeu5CHraAc97oL2yBvlT+Tog63qhCryMTBduCOnGpDEqq97u7cS0L/xDr6+i5gAZB5T/NRS4k21gkD0aLjC9d+Tux1rdJzbg2day/PMuv9lRMbF8P7H91go9Wr5yL7YLC4g5AOxD4h0bWkt0pHJFFaC/ESLv2/rq+16YvrnWKaic5G4Qtfr3EUzfovrLk54hHIWQjtLww7TCVY0R160fEqv1tNjoXd87vOu/VbBqzZrdAz0kEBOVMLWZ75V4upSKiIxUPgSKYQQX8zqEBSfpf9Rn/zhB5lR0qBfb5rE66uVfHsuFXQgFl+q/Yra9XqHV9YpNQj4aPo8wrA0+5VdtooLC+GNizeSk/Sda20q31r5fadSnjg3nsvBU0Iw1s4q16rlR9g2yIJB5+CV/gwi7vE/hsjW8wkRPoFAGD1XXXhjcqahy+y4N7jGedYvRoFCTFTckkyw5RRlGLhE8sNhl9u9ZDoWAreI8YEM3wjmXx2o3bNPBZUWo3Ieyplfqai1dJ4TOvfc59C6YTrEpmQoeIuVwUyVXIG/JawceUjvkuBveSTgjYr/xv/8PyFf0pQyIXMpsGeCnLytXPyOH/jrHLiLbxSz3zj3XC361yggANf8JdKeO+pk1z25u6pSwjz5kvnuRgAPXsrHtqWC65TjF+Qc8a65rHoPBLa+4o2x79UCA2zqEg4YGjII86RL3Rj6O4FX1vX9cEb8fq2Zp5Ep98YeQKBivoCV6UA+ZyFcflChoqXnOg6uq0i44DHkBI59dL+impURNmjj7XPXTGnJLqL/Jmfi7mRB8P5lat8sbE0e3lcqbjMrNfhudZ7PVL4N9M9dXgrhrU/stq1Pns+NRbBD/NPBoYxPktOY9TO5ySsguchbMc76UzTQkMS6F1LauKCee/UBVEwjHc7eYnCqCEHD4p/13IP5Y/IMeRJ3sFhpyhlxquuayIxP8/70JSpwQ+jK7q9LFd3BiuXsMBzjUnYQ9e+YCa3OSBO9Obe6xmkeMgptNhhcxFR6zYu4BQzzcjpQCK0iVGhWG3TfczEmYMPg86QqbvR8RD/Er/gMeuD7JHUB3IfNYM4cywgiW4MGZHMAhOSC56Qy9ZpAY+9xXerisMPyMzcpAsz4voCl5lfJzGNGYQp4CEXNaRoJIBSE1tx1kvl45yxW2dPRLF7HzvJDewsaB7paufESE993qnaV2vIJ2u+x+OOkCm7bYs0oyllvdSMt+mfRObr5PPHjMAPhC1YfjMJr0lLW7pvfxLZnEglKdJDUlMglX8CDw3SOAXxMU2/WtA0DII9lgdnuM+WX9frHGEk92aL34PDCntNOmZMpprLzUPQ5M2HMGzvecCQt5WtFseKjT8yjDjQibWlrYY9auFXvc79XqfnOZtxOHdADdMk+WMyvoJ4ITm9O1e01h3Z4IZEfk3gxyHgo01XsM5tJKLFM8N9MddwVL/BXriofTxm14fvlihelI3+rcMU+fybKok0HACFaGYxlQll1yoQADGskS3pt5ore2JjW3onXi+0zsI+adt90TyJvuMI0PTTJZHNBV6scTGA1Jv6+4zkDC0TnVZnbg5Px8ri+XtgGcXLVgEyvXE2tJFuRz76RRXzWzT4NyjElGD4eb4PAlzunCsfuTq4w/Rtk7Do8QaMcnIDddxu0j1l/PlfkQBk0YS2YkL35HbBFLyDIExHJ4kx0fGnS/c752xQDkx5OLEp5b1HbaG+7k3tf2KqrfmGacVcPmjr57mahfKwyWSLLMZ9CasFAZWaEbxSTzFcyp2tcunUzPITLifzRxif76ZCF4w7wCLG16KJp5XLIgHtSCqzQOfVpBlh/ajHvzcuVajqeDYHN6E3cZLVjiaOnv3jYIeusSssTZNAWz8mME9Vn4KWhMPQSF1yviqwPSl5TlfDXk9vNpnoiSdjbN3OJqBUJioSN5Sc9dv6T+dD34TyK9T5WL45H3vOWsT5znxenH80D8aY4EJ9e0Y/Ggzol7all+mCuiw9ptsMe2+npWp9gu928RN6rTCJwEkhnxCYEH+Nifv2tW49BVdcCisG6mIDMiDt7zmrk9mtovztPPCWDv4ymA0HZxz4X3NedIx/7UKu71xH5kXf5M8fyTZle5YpWdE7NWwwcXnKPG3f+ujE4Nhs+cxUt3MPuJ46r5alXf+Ns0XbSh/PX2aiZAMPufJJxvlualeZk7u2iAna+jN7rX/kS7qJpfGf9Zxtf064f2qAkw4A5fbgQcbfrkum1aPhsHpUxdH2p5VMLBRSMrV8eU0dv8rNSRoMIliwpeHvKG0udtLotwzlHaDAfhJ8wSVHLsg4/+YmzlPVJaGRcFi5JJFaoopA+dBpQp5wJ5RXPd1iojWvj7G1D3wzaGpiv89MgLZ+uilpNGSsVtls0mw6XDG8jXr+GSbz6XPUg3Wyy5LDeU1tSVPqul8/Q2arSxKZ5imNXny4/2Bo65dYs2ZLttpkybSbq85P0x629JGu1Z/ov0l/ZzOTO3m/4z5gYhoWuOQuX50SjutsgtdNVMyFVTOV+ESEW092S03VjT1qd2yeTRrwv1Cj0QgfK6Pjfyobruiu5x3+lueqygxqwed1V/N/5W/XgUEq1oV4F0YO9ezUKKJhhUIdVSiimp25QxHvwiUIUJpNLNix6zz7jaOxjbmfQ5+N7VpMngC/j0zMevD47IkdiouflI4HLrJk5lse++5856P+sEa9bv7yI8PvTQROHV92+DCouGbCL131so7ywKKyhZHh+9BPbkfgimQJYOSlKRtGX9eNXlYvrBwTucqANXU9/oPl+b/Dawk/7JoHlsyRfaaUIdyrTudHPapqa6NQETT0/FmqiQjliFLy/u4mvHlzSWwL46up/+EJ0RiZZydJ3yI6nS976ODDUnV0nlpnGnHm7z8gsWq3cfiiEXLDZq0yVg/phE5yRuWf4+IGsPxowemaF6niz3T6EyKtu9tZNegvr5d99asBnhDNkGQektSZcWkj9MGydjHjs4UESOfjU90am8KHgU/wFoFmhuPEZ4MN20ZyH+YifyAU5yssTy9cXYhEbAt6kfqU3CMXR7UaUdQDKRQiapNGK64lBwLGV+dxLgiFIPRy5EOGjC8Y4d/wsylKv1wa02igaEAhp7J/9hnhf+aYAIfx1iKOQiRiL/QjHqGXNFZMebE190luEY70n8dNxDcpPApRjU4HgbAiOX8Bg4ZrPI75AT2/1eGrE8vVYak2uoMhpjdZHAm1HSMO7W83hmOGTtpiX71tab/X0ypxQcKQSiEMIitBVoYupaoVdLY2naiwr+O1b2KhHQPkEWBlYu1uZG7YJpyJ+NtEZk2jwO7iJKeW7zeNdaO+td4n4t+SAYrWSg3XL413rpsbxIGlakgIw0I5a+4kTvjOd5X4u29hvVoUJf1cq7EVqO8b+zhUfuS1JqrM4OPyYe3MHeF8jCsNDCOuQiTiLAwjPsbiv1pnKRoX5L6t5qVhZzvHbFYFIHFEq5VE/ZBK6Zdzj0YzOouB917ORd08FuFJrBG5sNVnz5mgAsXBwDiCFJsGRQFxYU6oHWGrmHQXK+wGSPe1ANxjgrB5i6Ui56iRhaLSyS8j+aFpDIAWCLb/OLl/6o8aqfgk98nfxz/zOoEY/PVneIAI87XS+Qredibkok9s/Tm9I88cpFqCCkHGZ8nrXHI9rVhlpZrzBpvWoab9pLRSrMArzGngrq1hQs0IXIhEROjeQkFv7UBK4ZOLo8WTqOiDFAo/UYoFfzoFXXYOxVWsU/nPn8U2pujs1TQwYXOO9bjLVMtU6uJ8h4ubnFr+DBEruSvl5+wModIt5ocNGlFNTFFl86Y5bt4XGV+fZHhMuR9ysKmBqTqcyXPzy/y8P1JzohxpL2qeHwnbCrVgeT3vdN+21i0qeSoTRzQaUbg32bJEiEB65JF9MR85566/HceR/mt0ELmefsReiESqC30IIkTIq4opL67KfVWsVHggUUSr7b+qXER9+S9RwCvM//zY9pCby0d/uozSf+x6JXWyO43OAb8xzkpIBlteQhgQ5ovMqekUxaNPkcZ9fMNH71BlKledQMf3Yl/1me2cu+9j8cT+k9Mrdny68zCRZmdw1T8yITVSLwTbGaWH9bR+58skud6l0/KDEc13jjtjZ9+bwV+lNjlD9t8yPyP6zqwZrmoSKT0K6kNffotVht3StKlK0xo3HNmWWpECqzbmHnp5VzacBf9rY41GlnK4cyLYHjHTf2JX06w5VE5LPbYmxAG/3K7o/3alaM+mri8qwOkjFTlYsiyzWm1bo3l6ZGX+UIVnfahthR9s//2dj96hje54c8qbNOx9lNW76erVf/09I9cL4Mn7nb+A11Sk+dmlvjdcjwx/mV1ZKLxe0XQfqOdUdgqmx7vqyrLe+DhYv0Q4xghq5FzPF2KV1mn73JUyp3yfMj5XFzltl8vkw1wKLGB9dxMcXArBIhECyUVeWAxBiETshSAR4hHJEGarQBRjMh0iQSuQM9G6xqqn+vtF6GA0OisRKI1kfJGVixax4yO/+YI3lMbAKi8tdaZd+8jbynw4D1Js7NUfUNjITmCt/ZxNH3z3Zo2m1J2RlposzUpNg4n+D8eh8zaN76tqyoO/GL/GpYjUapdX6ujcI1VC4YkkH41sXUUPv/5tWJLdZPjk3+U6pEIWZK1mhSG3vau3CqS9H/iUZDna/hsUb3i29iwAxNTY/BbnxzBfLHZwewWi8CtCLO7HNmNQJCpk9U7Wu2uf+GmflT1rNudcsKNv0A6o3k08u4MX1/MordpBgT3xRKep99RL8mZmdIDYsfJ1D01sTtvMOVvAOtztgtuFVzlOKZ9rP8kX/1otlHCdr4EB27kX2rKHUW7TOYCFHVX66mYjcyqEr6xzp+xk68z1bZqqKgjU1LEfoYRZS06yEYHJ//9TXTpHO38vk8nG7Ofzt2HYDOZWnpUlvEml3hKxWKJbVOpNIfjE9Pzp4pryNzx0vqnVYmq3eKoH+hywupHrsPPrlOTHCQg/MVGzH24QviThCxlXhLyhCjG3fBhOMDK3Qlij0wtq3XIIcsn5tXqdoMatkPhYAbU6yGL1qNXNYBHCxJgcR8ZkTPLLMMDBRYrbVjyhRM/AoNErg40dPrlUdUNGe6kw3RluHHOB5xjaM+Gp0jI0TUbGfUFBfXbMO7ORP+o+M9VRHLvu/HmKdpeSKzgPpm5Kdoe2s39cJx67DWECHZe3zHDvvOcEY1zycZvvmxCOESIT/qWgT24QEp65Az/3XOXC0d9OsBioo6ylFgE7OdVwymvlxu0qKQtmTjvNxzIf1j/x4+cCzTmpQPJUBP8diXCBQH4fT3of1DErXM4fdb/x9Eo+OMTjn1PSaX0RyS0SVYpYtJwFKDq55O0y1ICUrjxnI6IIuDIi6S8cAUV4CncCjT6Jw+/AoE+AJzgqeg5xdWiycBM51sWKmFjpwQLcpYn2lyfAII+t57HjzKsfKtC4M8U9ii3b/EJ9ejqJRiWvbWMzDNW/AvGir+xBalkQ0oPYpqzgLa9k/V1k/69l82pffIm8luZl/tZHY6z9c39yHkNFoi13vFUNLJUjpdTUG5SK+hq7c0a8f/M+XT0FSCNHj0FfV8q9P+0tp8u+q/yXQ3xB1SsCwSshAT/0MhhvmjZEdcTw7P06XL+uNQc72pWJJYubDm5uQF/e7xtRnh6G/qaJxLV8975aV+0/+5IjNv9qrbMWoBeSr9jbyUft4FwV6WPheq1JQqAd62B1lG3G2x9vb8r+lZ3r27A3DNgH5geWfLx2zcgnWto7E+m6OjSUBaYD/4FUxyL26QEGTpbCsnsRCWgJVNs/kAahD6ZbQEtGfbwNh3bvn64WFy3Orw0wilnagKmoxUU1/QCIT67u6/93un44t90UOYcGIocKRZE/Gn/YsjUCHIemJ62oAKv/T7u7mU2JdaveSGXoaFTt0tjnKBINmG78H69bkqW+0LCJUxPsnjF+v3jb5W/m7Cm7Lge5GTfWNwuHDF4fMCsaTi2qIBTNSSsCDgfiv6x8/X3jam06rV5RM7vmzObRy+7+6BJZc61yCHELCnBLUq/net9mTs8Yvfyd2uFii6ROiB/TK9it1ZFGlY6J+pRbIO+eqdZYJrAMAx/BN2sC1V3zjPUd243DPbYt7bCgyxfoFSAKV8VbtTzn/lqGp5wBcb6SOV1sUwVF6yIL/+A3KaR2UJ2d/nHfwJq3xAhJo40moSooxFp9PaSCOsXMzbVUwvL6RR+sHnt+/ZbNpR6d1Z21Rhpm1TKqg/9W2Q2SJX6uFvJzLgjiDyYXinLW2rC5lQF+Cxzi6Ot0yqTVYWjNat31Z3se/j/QrgXOrnP1ZBrxW/EIf3TZiX8hNRSOQw6+A53tNjqKVt4kS+Zz0CjDySQliPeGRCyFo4aVnyaIEryi3aqwOiERq5dz0SZsx2wujHMFTVKROyQ2lMLFPAhHqtvbQvG5hAfkGigcl4GVdKBbn8noRwIBEciP6AN+OG1paFvb8LA1rTOmrCaczmmDleMgXOP5rz6N428q4fJLn3Qk/jTqEHjFhdf6LR3SYFDaYbFKZwZDHRILshIVtctq6YUl7BqgGNsrLFUzq6ulTt5SrajhfMuNKh7Ewlrfyf0SmQ+C6On8UrkiIE1Ot4AkIuO1h6SDx77vY69gsXYxPaTcyG8qdEsFCsLohaBtZh7e/Ltxf5YE8rVCaMEbzqUfmBT6aDC6j+7H+kHpGndEJIKlMhECi6D7+S6plGojIqmTaGgkkRr1ROJskfXbKuAc2J7ZDpDTGzMb04wNmQ1AkPzs6YjODfVkn+lqybSmD2a6AaFFFVUoYmq1CMqqqqJE1RzXhQjcnEEQ79FMMwxTbetbZI+XSvV5yCSPj1Z7PfvmzhxI3ILnmhr8nPzx7UG1+MnrTWutjl5Ps7YLn/tyPj6bAfsYX5sm3qJaFgupRprTBa1XWkMUKGtGNtKRbmfVcDBqndNt9zAHR1S1cC3p+uctm4pS6zevf24BKbiq9eOaGR4pFnnlxrELjhkuQzarh11tspzPkFvB5S/9S8DEebduw7oZjBLCzQ6iE91wxWSoZPlnhIVIrpWkov95IPY/Am3gksb+dQN9b2P94/VP14d/jzdsKeIAe902GghVlGWtNXJ6gx9dPu78GLqY+DUBVG/jH8TBSHKq+e9UssVhtjenLgDVP4kfE//ewLxIw2DoLyT1BdSKihfR2ScFrbyovHgE0bQXgSoh8VLixbPxl+JggFD4O+65WHyMyt+PgTGiCNLvLwdAJU18lPiQnvwoyd2wIr8CtI9On9j2yavSL0owEM3vtvks6C0bPn2l/GYJ2ozzFUseh0Bx/RnpJxkzE9BqXurI4kKcNVaiHi8HqV/tySgUi/9f+yl6J0ORQWXqeo/+8AUHv/6raM/bYOm5idzLE2wv5FYK6gwGQQOshMr3W4NBJ6yHVRI//utiLnfS1wT8P8VcbeqtrZBbJazTf0pwTur7sNDCIvw96WM6SPX8Mxn+okwHj7Qu4V34wAs2aWKbGqrAn/+q1qzO25+yx9YvBEfzMEXcSsHS/OjQQMO1dvRBLwP8mUOjfU+jv5+2ZtDep59Q2lv421j8LTz+DA57G0DluINfs2QlKKvVVTrD7FE93lw1vaQSsrx7pp98AWx36Qr3/5zjQ1WJHgHvY5rmtUEj6O4J0AKgZGx47oN46n7h0Ub00NS7bujDH4qPo51DpaXbp8ruTCudhpoRn/Zf4G+cLsgi97xGqiibjC8Gk0NGnAXjE1lStbGikvlY5S3PoEUCk5lcirDgrACFb7lYOpnI3cI/lo8WlJdsPHpiQB7/5rNGeC9KncSQem75lVm+R344rFLQeZxtpfHXExe5/FYMTP5e7OQNLozHXd+LY179LR5n/djhAJMfML2f8dxq5Vo9l92t25QnXpXgdmn8tBS9xN/H0XPXRGHjc/QxZneTDuHwr4xoYr2kbXTPA+qijRIDiXD398Un+Pqrai4xpWD2UQG8KwQsR/xYSZHcnGJ8U1jUSjG6MmzSZ1NCfoPNs2iQIr4+xfjsFFFyg9FJaJYiXk0x/muK6E2D0W+AHbMSUxssaPfgYt89uLFVDy6C1Q9uZKFjykLloNhKkILQY6VR1EyAe3v5K156EwB7V/VPB7uRZkQm3u8jwdO836AkTyZPpLz7X8rU+jgdiVkcyiMS/2DeH5k8mTzR8G5XyHg7K97PziytJ1tPtH675N2sas9TEjknXLB7ckFywaICIzVMH4HalPeHJE8mTzS82wEbU97voUwoABm824FkXp5l4oCqhQpMGUrJqgp3k42HlT6YRTnUJxgJctaFrsAqkOsVVsMdsAaudta2YB1cC+vhBtgAN8JGuNnZxAlvloh+OPoe9wOcqQ4nlZz8+CTgvEJOg2vksWRdvryFtXszhbZ48eeTcnuh5uZ6QV5tSd8fUKz2gt1y/aiQFlBNgKzCdnssvgoeVRoOgbXSF7crrPC/SRs0nRh0fqe1ISDAg8LaBcPWssq05KJrfFGGL6njCST0+Oya6QlNSlkP2bVfNuuME2jD9ziJUzjdro8GQCyimVZiOfVv5RRTUbrXK8WDiRmbrNaWaDloNN/CHFlVGi4f4ZIYBMe9/I8vru3+Q96xMvHr/PtlgDGfjUVbmsAFiy78b8/TJABbgL53fJajPdG2iVp60dZ6n1BOfhf2iOIEW2UQbYu23PZn1CBvTUOJUvMuo0Uc/rSU+7YjyORom4C/lUYic//qqkyKtgkYqcgDfeVeItq78BxZnVtDlBv78kaDjIocRW/tMfLJz8eaQyBWe4IY0etOsjVsCPycS/Q3QDb1bmGeB9nhDr2ALw6h/6B8QwV1rutJihEIo6RLQZi/lY6AGkwopUEQMFu7U9Oy4SSQMJxBuV/uAcZ6+C6W/HIQ2td7z4NeUWvQIxcuy5yEe4MiFU73KNfkRtTjAqgg7l88sNC6XqZKZtQ9yD7ZkfQUn5RG1u3nntnR9QRBptBaivQ5PQy45gdvwYMPAfkqLoMEX9A/9Sjf+bHPARL7qfSo+da+mmFJcq41v6nSyjn9Z182zpdx05ZLU6HqPFCHjyeZnRhVdOC2BsScv0N5bqa3z0lgcz+fylJzNQ0Y8Rxz8Duu66d3ND+OJTKbyxZkamcl7paEDc1P26icP7etebwvrW5u8kMhaySxtWM0p2RZh3y2/OQxl9Lf88t4LXEA+tDCAFt4Ckt46mDTsGax9S10SE0xOy95eUbd7msIyMFPNa3xbWjda/0blyAeAX54d6UB+NV3OEGvmPyF58IfWIYBAv7/MXu9o/5/rhzwPRezY9VmNWWLt1nHaVR/V9ydlBdtXPHjntFyxZCw/vOVyZfPe9SAqNHqjlL1FrKNiE06Sn7olaAcwKDIXQsCW7dVMXFEhX0f7wGqhrPvPZnUfIf5uBdr35JNeJ9MGwUvCqlLoLx0j9WwGn2PSE7QCqF3J6E5y3lUYMOZ1CGINQHFMDZvWOcreB25D2H0d8LR/1t/atMS5gmxfKKHK0eujsnt2kSdnUNqNn7e8z55P+ORbtLmUaO5iulg76oqBo1BzZN7VJliOMQ8FvKkCGP9Vln0KyupZpBikhbwzGtzy+NVI5JqyOrPuR7klQluFJ86k0VDFguKZHPNHAFZwiPlVJnLPrF8UsQ9yew5vn6d5pMMI77Dgu7cjCQmIJvHfBOU/5pH+KDKWRpq8xqNbxs9bEppvmyOWUjWX9jUgxiekubb64r7ZQUfqMXqKFW7c5toyROSfMk9YZ6N0uzIfbozDmvAUw51eamql6PyAD9PessIYHxWfcXREMdxnLx3qXqKso4UQ8wh06yHJetKaDnlD0V5Ls5fnhOVj8uXMGgxmU/nd2bWVB6Npso99p3tBeEr4wKIyBqxVnwc882/RrFugrTxkAMXJJ8cfKOrvcYVyxckl7u7/4IWlt8xcvb2vJaOwQ1yrT7Lyi4a/voz4Fx4qZe5cvnyfZz96VlYvoRXLkYrzqO034YX4VkPgeyoGC2R94Hs8yJ9aGtZgYAWDICPRZ60IJJIWjBR6BaCv3MtJAd/tFAsrWuh2dHeRMSX/20ggLW5tyCQEVmm64sOnKxMuSINNOqptahVpg4rRrNaRbR0KtXQmqtMpQrz1F+I9S3W0gmk4BoRT6ucS6un4ZKMpSuWp1GoUyGDtCKlWrM0AfbwuUK1VcQ8JzSUuawZY4+touTjsEEbbCXnp2qQFKlSxAhS6E8FK+Eo46wWNoxn1nNnCLhZszooCxIy45EqZUpCL0IDelxj5AtnyZH0KlQyRzco5qmEvGoKBXKaKKKT8NGWmK+SlkKdSq71h1zgTdvul8rpOZIdgZ2dDoaTivUpsdU6jpyUcvaYXNlK1+yyKT92Xw176JzzK66fihnKqVxwUYXL1ttmOy9PeVul/ay/Ytg8/wgQKEiwJ0JCQLRK82lU0ar2nRixasQZowYu8uAn4lcZP7yr6jVqymRokJwpK8Ofk80ytGjTrtX3Ouww0zOzzDbHcnNl6tStR5es1eaHxx2Ulw8XcRAXMTDgsK99w3j1/Myq7R+tFWl4iI8ESLgRijdhHElMNkXxe21swur32htvY4uIXezjwIgBazJ/Iv3Izg+OWkqIJhYWxzgxjLOddonEJ5CvUKhwxxy32x577fO7P/zlbxQee4xlllhphVUWRq7AI4scwomLxbbElchzL+zHsmVjoyI/KYoDScONDEROQUlFTUNLR8/AyMTMwqqKLWvABevgjTznPg95Uc3OwcnFDYbw8PLxCwgKCYuIiqlZjltX1lhmGJ8paagvK0jw1PSXaFKSopnO6QeflZHImd2VSpXGMKMz/4ZVBaLjlFOSK6gMejTMz4WX68tZze3vspPe4Z9h3o64KLCZbXTp075q5Fk6q5ppi2SZI9q9WOZoaV9pM/LlenUkoRtJiGQIRUTokAgRIsRDhEiG0BERIrSwg0qnKY6qV2uwax/0OJREbgvvBr1OwtbEnJJdyBE6r0ZUxCyrWfIvxOrl9LrpbZTZ5E9gorIGVSqdsky8g5fSWJ6WsCpxtKx9Gkp/Ce74sj8ly4x95FSnO+q4zFE6XJrSEPl0tqsRS+ECIR/LkC7jaLnkr0ySlWUqVH5q5u9KTUpYJchO/TbUKjRZqjZUsNH4sKFBG72F2k5RlAlJP5M4AuN8YSs9OjpFR74KQIPGCcwXP5gLtY4gMhgmGhu91aYSVWFx7fjhx9WGTC/rc7ri9Zz76R9QWA0=", Tg = "data:font/woff2;base64,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", Mg = 'html[data-athar-chat-v2] .app>div{flex-direction:row-reverse!important;justify-content:flex-end!important;background:#f8f9fe!important}html[data-athar-chat-v2] #chat-container{background:radial-gradient(ellipse at 50% 0,#efedf980,transparent 60%),#fafbff}html[data-athar-chat-v2] #sidebar{left:auto!important;right:0!important;background:#292151!important;color:#ece8ff!important;border-color:#615788!important;box-shadow:-8px 0 35px #18123812}html[data-athar-chat-v2] #sidebar [class*=text-gray-]{color:#c9c3e5!important}html[data-athar-chat-v2] #sidebar [class*=bg-gray-],html[data-athar-chat-v2] #sidebar [class*=from-gray-]{background-color:transparent!important;--tw-gradient-from:transparent!important}html[data-athar-chat-v2] #sidebar button:hover,html[data-athar-chat-v2] #sidebar a:hover{background-color:#ffffff12!important;color:#fff!important}html[data-athar-chat-v2] #sidebar [class*=border-]{border-color:#5d527b55!important}html[data-athar-chat-v2] #sidebar img[alt="Open WebUI"]{background:#fff;border-radius:7px;padding:2px}html[data-athar-chat-v2] #sidebar-resizer{display:none!important}html[data-athar-chat-v2] [data-athar-v2-slot=welcome]{padding-top:32px!important;padding-bottom:28px!important;transform:none!important}html[data-athar-chat-v2] #message-input-container{background:#fff!important;color:#202645!important;border:1px solid #dadbe9!important;box-shadow:0 12px 30px #22165006!important;border-radius:22px!important}html[data-athar-chat-v2] #chat-input{color:#202645!important;caret-color:#6150ea}html[data-athar-chat-v2] #chat-container nav{background:linear-gradient(#fafbff,#fafbffdd,transparent)}html.dark[data-athar-chat-v2] #chat-container{background:radial-gradient(ellipse at 50% 0,#30264b66,transparent 60%),#171626}html.dark[data-athar-chat-v2] #chat-container nav{background:linear-gradient(#171626,#171626dd,transparent)}html.dark[data-athar-chat-v2] .athar-v2-intro h2{color:#eee8fa}html[data-athar-chat-v2] #message-input-container [class*=text-gray-]{color:#70657d!important}html[data-athar-chat-v2] [data-athar-v2-slot=suggestions]{display:none!important}html[data-athar-chat-v2] [data-athar-v2-slot=suggestions-width]{width:100%;max-width:44rem!important;padding:0 20px}html[data-athar-chat-v2] [data-athar-v2-slot=composer-slot]{padding-top:16px!important;padding-bottom:2px!important}html[data-athar-chat-v2] .athar-v2-audience,html[data-athar-chat-v2] .athar-v2-cards{font-family:AtharReadex,Segoe UI,sans-serif;font-size:14px;line-height:1.5;font-weight:400;width:100%;max-width:44rem;margin:0 auto;color:#242a47}.athar-v2-audience,.athar-v2-cards,.athar-v2-auth-intro{display:none}html[data-athar-chat-v2] .athar-v2-audience,html[data-athar-chat-v2] .athar-v2-cards{display:block}.athar-v2-audience{padding:17px 20px 0}.athar-v2-intro{text-align:center;margin-bottom:17px}.athar-v2-eyebrow{font-size:11px;letter-spacing:.025em;color:#8b83a6}.athar-v2-intro h2{font-size:23px;font-weight:400;margin:7px 0 0;line-height:1.8;color:#2a2544}.athar-v2-toggles{display:grid;grid-template-columns:1fr 1fr;gap:12px}.athar-v2-persona{display:flex;align-items:center;gap:13px;padding:20px 18px;min-height:92px;border:1px solid #e2dfed;border-radius:13px;background:#fff;text-align:right;cursor:pointer;transition:background .18s,border .18s,box-shadow .18s;color:#7a708f}.athar-v2-persona>svg{width:26px;height:26px;flex-shrink:0}.athar-v2-persona strong{font-size:15px;font-weight:500;display:block;line-height:1.7;color:#39334e}.athar-v2-persona small{font-size:10px;display:block;color:#9b93ab;line-height:1.9;margin-top:4px}.athar-v2-persona[aria-pressed=true]{border-color:#9583d6;background:#f3f0fb;box-shadow:0 3px 14px #6150ea09;color:#7660b0}.athar-v2-radio{width:13px;height:13px;border:1px solid #d1cbdc;flex-shrink:0;border-radius:50%;margin-right:auto}.athar-v2-persona[aria-pressed=true] .athar-v2-radio{background:#7a62ba;border:3px solid #ded5f0;box-shadow:0 0 0 1px #a28cce}.athar-v2-cards-heading{display:flex;justify-content:space-between;align-items:center;gap:10px;font-size:11px;color:#8b829e;margin:14px 0 13px}.athar-v2-show-all{padding:5px 9px;background:transparent;color:#8b77b2;font-size:10px;cursor:pointer}.athar-v2-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:12px}.athar-v2-card{min-width:0;aspect-ratio:1;display:flex;flex-direction:column;align-items:flex-start;padding:18px 19px;text-align:right;border:1px solid #e2dfed;border-radius:15px;background:#fff;cursor:pointer;transition:transform .2s,border .2s,box-shadow .2s;color:#665675;animation:athar-card-in .3s ease both}.athar-v2-card:nth-child(2){animation-delay:35ms}.athar-v2-card:nth-child(3){animation-delay:.07s}.athar-v2-card:hover{border-color:#b6a2d2;transform:translateY(-3px);box-shadow:0 8px 24px #5141760a}.athar-v2-card-top{width:100%;display:flex;align-items:center;justify-content:space-between;margin-bottom:auto}.athar-v2-card-top>svg{width:24px;height:24px;color:#9b85b6}.athar-v2-card-top small{font-size:9px;color:#b4a6c3}.athar-v2-card[data-audience=research] .athar-v2-card-top svg{color:#786ac5}.athar-v2-card strong{font-size:13px;font-weight:500;line-height:1.85;margin-top:17px;color:#4a3b5b}.athar-v2-card-description{font-size:10px;line-height:1.9;color:#a094ac;margin-top:5px}.athar-v2-card>svg{width:16px;height:16px;color:#a99ab9;margin-top:14px;align-self:flex-end}.athar-v2-status{font-size:10px;line-height:1.9;text-align:center;color:#aaa1b4;margin:16px 0 7px;min-height:20px}.athar-v2-persona:focus-visible,.athar-v2-card:focus-visible,.athar-v2-show-all:focus-visible{outline:2px solid #9e88d0;outline-offset:3px}.athar-v2-intro{margin-bottom:12px}.athar-v2-intro .athar-v2-eyebrow{display:none}.athar-v2-intro h2{font-size:18px;margin:0;line-height:1.5}.athar-v2-card-description{color:#776783;font-size:11px}.athar-v2-persona small{color:#776783}.athar-v2-cards-heading,.athar-v2-show-all{color:#78648d}.athar-v2-status{color:#84758f}html[data-athar-auth-v2] #auth-page{padding-right:43vw;background:#fafbff}html[data-athar-auth-v2] #auth-page>div:first-child{background:#fafbff!important}html[data-athar-auth-v2] #auth-container{width:57vw;left:0;color:#29233e!important;z-index:2}html[data-athar-auth-v2] #auth-login-card{padding:32px;max-width:440px;color:#29233e!important}html[data-athar-auth-v2] #auth-login-card [class*=text-gray-]{color:#655b74!important}html[data-athar-auth-v2] #auth-login-card input{border-bottom:1px solid #ddd7e9;padding:10px 0;color:#29233e}html[data-athar-auth-v2] #auth-login-card button[type=submit]{background:#655284;color:#fff!important}html[data-athar-auth-v2] .athar-v2-auth-intro{display:flex;flex-direction:column;justify-content:center;position:fixed;right:0;top:0;width:43vw;height:100dvh;background:radial-gradient(ellipse at 0 0,#60549d55,transparent 75%),#292151;padding:7vw 5vw;color:#eee9fa;font-family:AtharReadex,Segoe UI,sans-serif;z-index:1;overflow:hidden}.athar-v2-auth-intro:after{content:"";position:absolute;width:320px;height:320px;border:1px solid #8574ae28;border-radius:50%;right:-140px;bottom:-160px;box-shadow:0 0 0 65px #8574ae09,0 0 0 130px #8574ae07;pointer-events:none}.athar-v2-auth-intro h1{white-space:pre-line;font:46px/1.75 AtharAmiri,serif;margin:21px 0;color:#efe7fb}.athar-v2-auth-intro>p{font-size:13px;line-height:2.25;color:#ada2c8;max-width:360px}.athar-v2-auth-intro .athar-v2-eyebrow{color:#b9a6d8;font-size:12px}.athar-v2-auth-features{display:flex;gap:22px;padding:28px 0;margin-top:16px;border-top:1px solid #65537c55}.athar-v2-auth-features span{display:flex;align-items:center;gap:10px;font-size:12px;color:#d7c5ec}.athar-v2-auth-features svg{width:22px;height:22px}.athar-v2-auth-intro>small{font-size:10px;color:#8d80ac;margin-top:50px}@keyframes athar-card-in{0%{opacity:0;transform:translateY(6px)}to{opacity:1;transform:none}}@media (max-width:767px){html[data-athar-chat-v2] #sidebar{transform:none!important}.athar-v2-audience{padding-top:10px}.athar-v2-persona{padding:14px 11px;gap:8px;min-height:88px}.athar-v2-persona strong{font-size:12px}.athar-v2-persona small{font-size:9px}.athar-v2-persona>svg{width:21px}.athar-v2-radio{display:none}.athar-v2-card{padding:13px 12px;aspect-ratio:auto;min-height:162px}.athar-v2-card strong{font-size:11px;line-height:1.8}.athar-v2-card-description{font-size:9px}.athar-v2-grid{gap:8px}.athar-v2-intro h2{font-size:21px}.athar-v2-cards-heading{font-size:10px}}@media (max-width:480px){.athar-v2-grid{grid-template-columns:repeat(2,minmax(0,1fr))}.athar-v2-card{aspect-ratio:1}.athar-v2-card strong{font-size:12px}.athar-v2-card-description{font-size:10px}.athar-v2-persona{align-items:flex-start}.athar-v2-persona>svg{width:18px;height:18px;margin-top:4px}.athar-v2-persona small{font-size:8px}}@media (max-width:900px){html[data-athar-auth-v2] #auth-page{padding-right:0}html[data-athar-auth-v2] #auth-container{width:100%}.athar-v2-auth-intro{display:none!important}html[data-athar-auth-v2] #auth-page:before{content:"بيان السُّنّة / الحديث النبوي للمعرّفين بالإسلام";position:fixed;top:85px;left:16px;right:16px;text-align:center;font:13px/1.8 AtharReadex,sans-serif;color:#78628f;z-index:3}}@media (prefers-reduced-motion:reduce){.athar-v2-card,.athar-v2-persona{animation:none!important;transition:none!important}}html[data-athar-chat-v2] [data-athar-v2-slot=model-intro]{align-items:center;gap:8px!important;opacity:.85}html[data-athar-chat-v2] [data-athar-v2-slot=model-intro] img{width:24px;height:24px;border-radius:7px}html[data-athar-chat-v2] [data-athar-v2-slot=model-intro] .text-2xl{font-size:12px!important;line-height:1.5}html[data-athar-chat-v2] [data-athar-v2-slot=model-intro] .text-sm{font-size:10px!important;line-height:1.4;max-width:32rem}.bayan-wordmark{font:38px/1.4 AtharAmiri,serif;margin:0;color:#33264c}.bayan-subtitle{font-size:12px;color:#7e6c93;line-height:1.8;margin:0 0 15px}.athar-v2-persona{min-height:77px;padding:15px}.athar-v2-persona strong{font-size:13px}.athar-v2-persona small{font-size:9px}.bayan-evidence,.bayan-request{border:1px solid #d9cde7;border-radius:12px;padding:12px 15px;margin:14px 0;background:#fff}.bayan-evidence>summary,.bayan-request>summary{font-size:12px;color:#53406e;cursor:pointer}.bayan-evidence-state{font-size:10px;line-height:1.9;color:#846c58;background:#faf4e8;padding:10px;border-radius:8px}.bayan-evidence-coverage{display:flex;flex-wrap:wrap;gap:5px;margin:12px 0}.bayan-evidence-coverage span{font-size:8px;padding:5px 7px;border-radius:6px;background:#f3f0f7;color:#877493}.bayan-evidence-coverage span[data-present=true]{background:#e4f1ee;color:#376a60}.bayan-evidence-record{padding:12px 0;border-top:1px solid #e9e2f0}.bayan-evidence-record>summary{font-size:11px;color:#634d7c;cursor:pointer;line-height:1.9}.bayan-source-text{font:21px/2.1 AtharAmiri,serif;color:#3f3651;margin:15px 0;max-height:290px;overflow:auto;white-space:pre-wrap}.bayan-source-id{display:block;direction:ltr;text-align:left;overflow-wrap:anywhere;font:10px/1.8 monospace;color:#92859f;margin:10px 0}.bayan-source-actions{display:flex;flex-wrap:wrap;gap:7px}.bayan-source-actions a,.bayan-source-actions button{font:10px/1.8 AtharReadex,sans-serif!important;border:1px solid #d7cbe5;border-radius:7px;padding:6px 9px;background:#f5f1fa;color:#65517e;text-decoration:none}.bayan-request .bayan-question{font-size:12px}.bayan-evidence summary:focus-visible,.bayan-request summary:focus-visible{outline:2px solid #8d70b0;outline-offset:4px}.athar-v2-toggles{grid-template-columns:repeat(3,minmax(0,1fr));gap:8px}.athar-v2-persona{gap:8px;padding:13px 10px}.athar-v2-persona>svg{width:22px;flex-shrink:0}.athar-v2-radio{display:none}.athar-v2-persona strong{font-size:12px}.athar-v2-persona small{font-size:8px}.athar-v2-cards[data-track=topics] .athar-v2-card{aspect-ratio:auto;min-height:168px;padding:14px 17px}.athar-v2-cards[data-track=topics] .athar-v2-card strong{margin-top:9px}.athar-v2-cards[data-track=topics] .athar-v2-card-top{display:none}.athar-v2-cards[data-track=topics] .athar-v2-card-description{font-size:10px}.athar-v2-cards[data-track=topics] .bayan-card-action{margin-top:auto;padding-top:10px}.bayan-topic-options{display:grid;grid-template-columns:1fr 1fr;gap:12px;margin:12px 0 20px}.bayan-topic-options label{font-size:11px;color:#69577b}.bayan-topic-options select{display:block;width:100%;margin-top:7px;padding:10px 8px;border:1px solid #d5c7e6;border-radius:9px;background:#fff;color:#49395c;font:12px AtharReadex,sans-serif}.bayan-topic-roots{padding:14px;border-radius:12px;background:#e9f3f1;color:#3f655d;margin-bottom:18px}.bayan-topic-roots strong{font-size:12px}.bayan-topic-roots p{font-size:11px;line-height:1.9;margin:6px 0}.bayan-topic-roots small{font-size:9px}.bayan-agent{font-size:10px;color:#6e558a;margin:12px 0}.bayan-gallery-switch{border:1px solid #d3c5e4;border-radius:9px;padding:8px 14px;background:#f0eaf8;color:#624c7a;font-size:11px!important}.bayan-auth-topic{background:#ffffff12;border:1px solid #ffffff40;color:#ebe1ff;padding:12px 16px;border-radius:11px;margin:10px 0;font:12px AtharReadex,sans-serif;cursor:pointer}@media (max-width:600px){.athar-v2-toggles{gap:6px}.athar-v2-persona{padding:10px 8px;display:block;min-height:87px}.athar-v2-persona>svg{display:none}.athar-v2-persona strong{font-size:10px!important}.athar-v2-persona small{font-size:8px!important;line-height:1.8}.bayan-topic-options{grid-template-columns:1fr}.athar-v2-cards[data-track=topics] .athar-v2-card{min-height:165px;padding:13px}}html.dark[data-athar-chat-v2] .bayan-wordmark{color:#f5ecff}.bayan-card-action{display:flex;align-items:center;justify-content:space-between;gap:12px;width:100%;font-size:10px;color:#78648d;margin-top:13px}.bayan-card-action svg{width:17px;height:17px}.athar-v2-card strong{margin-top:13px;font-size:16px}.athar-v2-card-description{font-size:11px;line-height:1.9}.athar-v2-card-top small{font-size:9px;color:#80718f}.bayan-count{font-size:10px}.bayan-demo{margin:auto;width:min(650px,calc(100vw - 32px));max-height:calc(100dvh - 40px);overflow:auto;padding:0;border:1px solid #e3dceb;border-radius:24px;background:#fbfaff;color:#352844;font:14px/1.8 AtharReadex,system-ui,sans-serif;box-shadow:0 30px 110px #18122944}.bayan-demo:not([open]){display:none}.bayan-demo::backdrop{background:#15102988;-webkit-backdrop-filter:blur(5px);backdrop-filter:blur(5px)}.bayan-demo-content{position:relative;padding:36px}.bayan-demo h2{font:38px/1.5 AtharAmiri,serif;margin:13px 0 6px}.bayan-demo h3{font-size:13px;font-weight:500;margin:23px 0 13px}.bayan-demo button{font:inherit;cursor:pointer}.bayan-demo button:focus-visible,.bayan-context button:focus-visible,.bayan-followups button:focus-visible{outline:2px solid #937cca;outline-offset:4px}.bayan-close{position:absolute;left:20px;top:20px;width:32px;height:32px;border-radius:50%;background:#efebf5;display:grid;place-items:center;border:0;color:#786985}.bayan-close svg{width:17px;height:17px}.bayan-kicker{font-size:10px;color:#9680ae}.bayan-demo-intro{font-size:12px;color:#807087;line-height:1.9;margin:0 0 24px}.bayan-question-label{font-size:10px;color:#8c7a9b}.bayan-question{font-size:16px;line-height:2;background:#f0ecf7;border-right:3px solid #b19bcd;border-radius:10px 0 0 10px;padding:15px 19px;margin:8px 0;color:#584668}.bayan-demo-steps{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:10px}.bayan-demo-steps button{border:1px solid #e0d6ed;background:#fff;border-radius:12px;padding:13px 9px;display:flex;flex-direction:column;align-items:flex-start;gap:8px;font-size:11px;text-align:right;color:#786088}.bayan-demo-steps button span{font-size:11px;color:#b5a5c6}.bayan-demo-steps button[aria-pressed=true]{background:#ebe5f6;border-color:#ae97ce;color:#514066}.bayan-step-detail{min-height:55px;font-size:12px;color:#7b698b;line-height:1.9;margin:16px 0 23px}.bayan-demo-note{font-size:10px;color:#887991;line-height:1.9;border-top:1px solid #e7deee;padding-top:16px;margin:0 0 18px}.bayan-demo-actions{display:flex;gap:12px}.bayan-primary,.bayan-secondary{min-height:43px;border-radius:10px;padding:10px 18px;border:1px solid #c9bddb;display:flex;gap:12px;align-items:center;justify-content:center;font-size:12px!important}.bayan-primary{background:#5a437c;color:#fff;border-color:#5a437c}.bayan-secondary{background:transparent;color:#786186}.bayan-primary svg{width:16px;height:16px}.bayan-gallery{display:grid;gap:12px;margin:24px 0}.bayan-gallery button{display:flex;gap:12px;align-items:center;text-align:right;background:#f1ecf7;border:1px solid #e4d9ef;border-radius:12px;padding:17px;color:#776183}.bayan-gallery svg{width:21px;height:21px;flex-shrink:0}.bayan-gallery strong{font-size:14px;font-weight:500}.bayan-gallery span{font-size:10px;margin-right:auto}.bayan-gallery button>svg:last-child{width:16px}.bayan-context{position:sticky;top:0;z-index:12;display:flex;align-items:center;gap:12px;padding:10px 22px;background:#faf8fff2;border-bottom:1px solid #e8e0ef;font-family:AtharReadex,sans-serif;color:#6f547f}.bayan-context-brand{font:23px AtharAmiri,serif}.bayan-context-case{font-size:11px;border-right:1px solid #d3c4df;padding-right:12px}.bayan-context button{margin-right:auto;font:10px AtharReadex,sans-serif;padding:7px 10px;border:1px solid #cfc0df;border-radius:8px;background:#fff;color:#755b87;cursor:pointer}.bayan-followups{display:flex;align-items:center;justify-content:center;gap:8px;flex-wrap:wrap;font:10px/1.8 AtharReadex,sans-serif;color:#806b91;margin:6px auto 10px;max-width:48rem;padding:0 16px}.bayan-followups button{font:inherit;border:1px solid #ddd2e8;border-radius:99px;background:#fbf9ff;color:#745988;padding:5px 11px;cursor:pointer}.bayan-followups[data-notice]:after{content:attr(data-notice);flex-basis:100%;text-align:center;font-size:10px}.bayan-auth-cases{display:grid;gap:8px}.bayan-auth-cases button{display:flex;align-items:center;gap:12px;border:1px solid #77629555;background:#ffffff05;color:#d7c5ec;border-radius:10px;padding:12px;font:12px AtharReadex,sans-serif;text-align:right;cursor:pointer;transition:background .2s}.bayan-auth-cases button:hover{background:#ffffff10}.bayan-auth-cases svg{width:18px;height:18px}.bayan-auth-cases svg:last-child{margin-right:auto;width:15px}.athar-v2-auth-intro h1{font-size:58px;margin:14px 0}.athar-v2-auth-features{padding:18px 0;margin-top:10px}.athar-v2-auth-intro>small{margin-top:25px}@media (max-width:600px){.bayan-demo-content{padding:26px 20px}.bayan-demo h2{font-size:31px}.bayan-question{font-size:14px}.bayan-demo-steps{gap:7px}.bayan-demo-steps button{font-size:10px}.bayan-demo-actions{flex-direction:column}.bayan-demo-note{font-size:10px}.bayan-gallery button{flex-wrap:wrap}.bayan-gallery span{flex-basis:60%}.bayan-context{padding:8px 12px;gap:8px}.bayan-context-brand{font-size:20px}.bayan-context-case{font-size:10px}.bayan-wordmark{font-size:33px}.bayan-subtitle{font-size:10px}.athar-v2-persona strong{font-size:11px}.athar-v2-card strong{font-size:15px}.athar-v2-card-description{font-size:10px}.athar-v2-card-top{gap:5px}.athar-v2-card-top small{font-size:8px}.bayan-card-action{font-size:9px}.bayan-followups>span{flex-basis:100%;text-align:center}}', Og = [
  {
    id: "topic-faith",
    title: "الإيمان والمعنى",
    question: "كيف يربط الإسلام الإيمان بالنية والعمل؟",
    seedQueries: [
      "الإيمان",
      "النيات"
    ],
    chapterTitles: [
      "كتاب الأيمان والنذور",
      "كتاب بدء الوحى",
      "كتاب الإيمان",
      "كتاب فضل ليلة القدر",
      "كتاب القدر"
    ],
    chapterCount: 16,
    collections: [
      "abudawud",
      "bukhari",
      "muslim",
      "nasai",
      "tirmidhi"
    ],
    mappingStatus: "chapter_title_candidate_only",
    modelId: "hadith-islam-guide"
  },
  {
    id: "topic-mercy",
    title: "الرحمة وحسن الخلق",
    question: "كيف تظهر الرحمة في تعامل المسلم مع الناس؟",
    seedQueries: [
      "من لا يرحم",
      "الرفق"
    ],
    chapterTitles: [
      "كتاب الأدب",
      "كتاب الاستئذان",
      "كتاب الرقاق",
      "كتاب الألفاظ من الأدب وغيرها",
      "كتاب البر والصلة والآداب"
    ],
    chapterCount: 11,
    collections: [
      "abudawud",
      "bukhari",
      "ibnmajah",
      "muslim",
      "tirmidhi"
    ],
    mappingStatus: "chapter_title_candidate_only",
    modelId: "hadith-islam-guide"
  },
  {
    id: "topic-worship",
    title: "العبادة والحياة",
    question: "ما الصلة بين العبادة والحياة اليومية؟",
    seedQueries: [
      "الصلاة",
      "الصيام"
    ],
    chapterTitles: [
      "كتاب الصوم",
      "كتاب الصلاة",
      "كتاب الزكاة",
      "كتاب فضل الصلاة فى مسجد مكة والمدينة",
      "كتاب العمل فى الصلاة"
    ],
    chapterCount: 29,
    collections: [
      "abudawud",
      "bukhari",
      "ibnmajah",
      "muslim",
      "nasai",
      "tirmidhi"
    ],
    mappingStatus: "chapter_title_candidate_only",
    modelId: "hadith-islam-guide"
  },
  {
    id: "topic-family",
    title: "الأسرة والجوار",
    question: "كيف يحفظ الإسلام حقوق الأسرة والجار؟",
    seedQueries: [
      "الجار",
      "الوالدين"
    ],
    chapterTitles: [
      "كتاب النكاح",
      "كتاب الأدب",
      "كتاب النفقات",
      "كتاب الرضاع",
      "كتاب الألفاظ من الأدب وغيرها"
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
    mappingStatus: "chapter_title_candidate_only",
    modelId: "hadith-islam-guide"
  },
  {
    id: "topic-fairness",
    title: "العدل والأمانة",
    question: "كيف تحضر الأمانة والعدل في التعاملات؟",
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
    chapterCount: 14,
    collections: [
      "abudawud",
      "bukhari",
      "ibnmajah",
      "muslim",
      "nasai",
      "tirmidhi"
    ],
    mappingStatus: "chapter_title_candidate_only",
    modelId: "hadith-islam-guide"
  },
  {
    id: "topic-knowledge",
    title: "العلم والحوار",
    question: "كيف يدعو الحديث إلى التعلم وحسن الحوار؟",
    seedQueries: [
      "العلم",
      "فليقل خيرا"
    ],
    chapterTitles: [
      "كتاب العلم",
      "كتاب الأدب",
      "كتاب الاعتصام بالكتاب والسنة",
      "كتاب الألفاظ من الأدب وغيرها",
      "كتاب العلم عن رسول الله صلى الله عليه وسلم"
    ],
    chapterCount: 10,
    collections: [
      "abudawud",
      "bukhari",
      "ibnmajah",
      "muslim",
      "tirmidhi"
    ],
    mappingStatus: "chapter_title_candidate_only",
    modelId: "hadith-islam-guide"
  }
], jp = {
  "topic-faith": [
    {
      id: "itqan:bukhari:1:1:bf026de7e155",
      collection: "bukhari",
      chapter: "كتاب بدء الوحى",
      position: 1,
      text: `حَدَّثَنَا الْحُمَيْدِيُّ عَبْدُ اللَّهِ بْنُ الزُّبَيْرِ  ، قَالَ : حَدَّثَنَا سُفْيَانُ  ، قَالَ : حَدَّثَنَا يَحْيَى بْنُ سَعِيدٍ الْأَنْصَارِيُّ  ، قَالَ : أَخْبَرَنِي مُحَمَّدُ بْنُ إِبْرَاهِيمَ التَّيْمِيُّ  ، أَنَّهُ سَمِعَ عَلْقَمَةَ بْنَ وَقَّاصٍ اللَّيْثِيَّ  ، يَقُولُ : سَمِعْتُ عُمَرَ بْنَ الْخَطَّابِ   رَضِيَ اللَّهُ عَنْهُ عَلَى الْمِنْبَرِ، قَالَ : سَمِعْتُ رَسُولَ اللَّهِ صَلَّى اللَّهُ عَلَيْهِ وَسَلَّمَ، يَقُولُ : "
إِنَّمَا الْأَعْمَالُ بِالنِّيَّاتِ، وَإِنَّمَا لِكُلِّ امْرِئٍ مَا نَوَى، فَمَنْ كَانَتْ هِجْرَتُهُ إِلَى دُنْيَا يُصِيبُهَا أَوْ إِلَى امْرَأَةٍ يَنْكِحُهَا، فَهِجْرَتُهُ إِلَى مَا هَاجَرَ إِلَيْهِ "`,
      sha256: "bf026de7e1551e20f4974b597dd25d0da06e690391e60b0b30211ec3ca2739fa",
      url: "https://github.com/R3GENESI5/Itqan/blob/199d870da5b726356b4a8dbaa096140cffb7d0ab/app/data/sunni/bukhari/1.json"
    },
    {
      id: "itqan:bukhari:2:2:43ab185c8834",
      collection: "bukhari",
      chapter: "كتاب الإيمان",
      position: 2,
      text: `حَدَّثَنَا عَبْدُ اللَّهِ بْنُ مُحَمَّدٍ، قَالَ حَدَّثَنَا أَبُو عَامِرٍ الْعَقَدِيُّ، قَالَ حَدَّثَنَا سُلَيْمَانُ بْنُ بِلاَلٍ، عَنْ عَبْدِ اللَّهِ بْنِ دِينَارٍ، عَنْ أَبِي صَالِحٍ، عَنْ أَبِي هُرَيْرَةَ ـ رضى الله عنه ـ عَنِ النَّبِيِّ صلى الله عليه وسلم قَالَ ‏
"‏ الإِيمَانُ بِضْعٌ وَسِتُّونَ شُعْبَةً، وَالْحَيَاءُ شُعْبَةٌ مِنَ الإِيمَانِ ‏"‏‏.‏`,
      sha256: "43ab185c8834487b916e2fc09b34e1180d7a9abb429dedf26d1525514e2483b7",
      url: "https://github.com/R3GENESI5/Itqan/blob/199d870da5b726356b4a8dbaa096140cffb7d0ab/app/data/sunni/bukhari/2.json"
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
      url: "https://github.com/R3GENESI5/Itqan/blob/199d870da5b726356b4a8dbaa096140cffb7d0ab/app/data/sunni/tirmidhi/27.json"
    },
    {
      id: "itqan:bukhari:78:55:022c1dbdd753",
      collection: "bukhari",
      chapter: "كتاب الأدب",
      position: 55,
      text: 'حَدَّثَنَا عَبْدُ الْعَزِيزِ بْنُ عَبْدِ اللَّهِ، حَدَّثَنَا إِبْرَاهِيمُ بْنُ سَعْدٍ، عَنْ صَالِحٍ، عَنِ ابْنِ شِهَابٍ، عَنْ عُرْوَةَ بْنِ الزُّبَيْرِ، أَنَّ عَائِشَةَ ـ رضى الله عنها ـ زَوْجَ النَّبِيِّ صلى الله عليه وسلم قَالَتْ دَخَلَ رَهْطٌ مِنَ الْيَهُودِ عَلَى رَسُولِ اللَّهِ صلى الله عليه وسلم فَقَالُوا السَّامُ عَلَيْكُمْ‏.‏ قَالَتْ عَائِشَةُ فَفَهِمْتُهَا فَقُلْتُ وَعَلَيْكُمُ السَّامُ وَاللَّعْنَةُ‏.‏ قَالَتْ فَقَالَ رَسُولُ اللَّهِ صلى الله عليه وسلم ‏"‏ مَهْلاً يَا عَائِشَةُ، إِنَّ اللَّهَ يُحِبُّ الرِّفْقَ فِي الأَمْرِ كُلِّهِ ‏"‏‏.‏ فَقُلْتُ يَا رَسُولَ اللَّهِ وَلَمْ تَسْمَعْ مَا قَالُوا قَالَ رَسُولُ اللَّهِ صلى الله عليه وسلم ‏"‏ قَدْ قُلْتُ وَعَلَيْكُمْ ‏"‏‏.‏',
      sha256: "022c1dbdd75312012c7569455f1d5a45a3e1f92423eba7dea5291a5cda7dc035",
      url: "https://github.com/R3GENESI5/Itqan/blob/199d870da5b726356b4a8dbaa096140cffb7d0ab/app/data/sunni/bukhari/78.json"
    },
    {
      id: "itqan:bukhari:97:6:c70c14ec93c8",
      collection: "bukhari",
      chapter: "كتاب التوحيد",
      position: 6,
      text: `حَدَّثَنَا مُحَمَّدٌ، أَخْبَرَنَا أَبُو مُعَاوِيَةَ، عَنِ الأَعْمَشِ، عَنْ زَيْدِ بْنِ وَهْبٍ، وَأَبِي، ظَبْيَانَ عَنْ جَرِيرِ بْنِ عَبْدِ اللَّهِ، قَالَ قَالَ رَسُولُ اللَّهِ صلى الله عليه وسلم ‏
"‏ لاَ يَرْحَمُ اللَّهُ مَنْ لاَ يَرْحَمُ النَّاسَ ‏"‏‏.‏`,
      sha256: "c70c14ec93c8095ab332bf3f2350a6dfadacfc769c10fe938d6fe6cfd1d01373",
      url: "https://github.com/R3GENESI5/Itqan/blob/199d870da5b726356b4a8dbaa096140cffb7d0ab/app/data/sunni/bukhari/97.json"
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
      url: "https://github.com/R3GENESI5/Itqan/blob/199d870da5b726356b4a8dbaa096140cffb7d0ab/app/data/sunni/bukhari/9.json"
    },
    {
      id: "itqan:bukhari:2:31:7d396864714a",
      collection: "bukhari",
      chapter: "كتاب الإيمان",
      position: 31,
      text: `حَدَّثَنَا ابْنُ سَلاَمٍ، قَالَ أَخْبَرَنَا مُحَمَّدُ بْنُ فُضَيْلٍ، قَالَ حَدَّثَنَا يَحْيَى بْنُ سَعِيدٍ، عَنْ أَبِي سَلَمَةَ، عَنْ أَبِي هُرَيْرَةَ، قَالَ قَالَ رَسُولُ اللَّهِ صلى الله عليه وسلم ‏
"‏ مَنْ صَامَ رَمَضَانَ إِيمَانًا وَاحْتِسَابًا غُفِرَ لَهُ مَا تَقَدَّمَ مِنْ ذَنْبِهِ ‏"‏‏.‏`,
      sha256: "7d396864714a458d034d56009930bcd1a1dabfe69d8da5de1fe2aed844750d79",
      url: "https://github.com/R3GENESI5/Itqan/blob/199d870da5b726356b4a8dbaa096140cffb7d0ab/app/data/sunni/bukhari/2.json"
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
      url: "https://github.com/R3GENESI5/Itqan/blob/199d870da5b726356b4a8dbaa096140cffb7d0ab/app/data/sunni/bukhari/78.json"
    },
    {
      id: "itqan:bukhari:34:20:6be328f32eca",
      collection: "bukhari",
      chapter: "كتاب البيوع",
      position: 20,
      text: `حَدَّثَنَا مُحَمَّدُ بْنُ أَبِي يَعْقُوبَ الْكِرْمَانِيُّ، حَدَّثَنَا حَسَّانُ، حَدَّثَنَا يُونُسُ، حَدَّثَنَا مُحَمَّدٌ، عَنْ أَنَسِ بْنِ مَالِكٍ ـ رضى الله عنه ـ قَالَ سَمِعْتُ رَسُولَ اللَّهِ صلى الله عليه وسلم يَقُولُ ‏
"‏ مَنْ سَرَّهُ أَنْ يُبْسَطَ لَهُ رِزْقُهُ أَوْ يُنْسَأَ لَهُ فِي أَثَرِهِ فَلْيَصِلْ رَحِمَهُ ‏"‏‏.‏`,
      sha256: "6be328f32eca693b453690a19690d91c1da3bc7952219fd3afa4c0ad56ed9877",
      url: "https://github.com/R3GENESI5/Itqan/blob/199d870da5b726356b4a8dbaa096140cffb7d0ab/app/data/sunni/bukhari/34.json"
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
      url: "https://github.com/R3GENESI5/Itqan/blob/199d870da5b726356b4a8dbaa096140cffb7d0ab/app/data/sunni/muslim/1.json"
    },
    {
      id: "itqan:bukhari:46:8:ea82d87c12e2",
      collection: "bukhari",
      chapter: "كتاب المظالم",
      position: 8,
      text: `حَدَّثَنَا أَحْمَدُ بْنُ يُونُسَ، حَدَّثَنَا عَبْدُ الْعَزِيزِ الْمَاجِشُونُ، أَخْبَرَنَا عَبْدُ اللَّهِ بْنُ دِينَارٍ، عَنْ عَبْدِ اللَّهِ بْنِ عُمَرَ ـ رضى الله عنهما ـ عَنِ النَّبِيِّ صلى الله عليه وسلم قَالَ ‏
"‏ الظُّلْمُ ظُلُمَاتٌ يَوْمَ الْقِيَامَةِ ‏"‏‏.‏`,
      sha256: "ea82d87c12e2019adfa5fef7953adfbce5a8979c3cee5a755ba0358ef4a30718",
      url: "https://github.com/R3GENESI5/Itqan/blob/199d870da5b726356b4a8dbaa096140cffb7d0ab/app/data/sunni/bukhari/46.json"
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
      url: "https://github.com/R3GENESI5/Itqan/blob/199d870da5b726356b4a8dbaa096140cffb7d0ab/app/data/sunni/muslim/48.json"
    },
    {
      id: "itqan:bukhari:3:11:7bca050e20fb",
      collection: "bukhari",
      chapter: "كتاب العلم",
      position: 11,
      text: `حَدَّثَنَا مُحَمَّدُ بْنُ بَشَّارٍ، قَالَ حَدَّثَنَا يَحْيَى بْنُ سَعِيدٍ، قَالَ حَدَّثَنَا شُعْبَةُ، قَالَ حَدَّثَنِي أَبُو التَّيَّاحِ، عَنْ أَنَسٍ، عَنِ النَّبِيِّ صلى الله عليه وسلم قَالَ ‏
"‏ يَسِّرُوا وَلاَ تُعَسِّرُوا، وَبَشِّرُوا وَلاَ تُنَفِّرُوا ‏"‏‏.‏`,
      sha256: "7bca050e20fbcecea43060fddcf8582dd76a794ea65cd79c96a8b4a13eafa42b",
      url: "https://github.com/R3GENESI5/Itqan/blob/199d870da5b726356b4a8dbaa096140cffb7d0ab/app/data/sunni/bukhari/3.json"
    }
  ]
}, mi = { name: "بيان السُّنّة", subtitle: "الحديث النبوي للمعرّفين بالإسلام" }, yo = [
  {
    id: "prayer-call",
    modelId: "hadith-model-1",
    title: "الصلاة جامعة",
    category: "النص ومصادره",
    icon: "layers",
    learn: "تعرّف على مواضع الحديث وسياقه قبل الاستشهاد به.",
    research: "قارن مواضع اللفظ في الكتب الستة، ثم توسّع في الأسانيد.",
    question: "ابحث لي عن أحاديث (الصلاة جامعة) في الكتب الستة واذكر أرقامها وأسانيدها",
    outputs: [{ title: "مواضع الحديث", description: "استعرض النصوص والمراجع التي يعيدها النموذج، وافتح توثيق كل رواية." }, { title: "السياق والاختلاف", description: "قارن بين مواضع اللفظ، وانتبه إلى اختلاف الواقعة والسياق قبل جمع الروايات." }, { title: "مسارات الإسناد", description: "تابع بطلب الشجرة لعرض الرواة ومسارات الروايات بصيغة Mermaid." }],
    followups: [{ label: "اعرض شجرة الأسانيد", prompt: "ارسم شجرة Mermaid للأحاديث المذكورة أعلاه، مع الرواة ومراجع الروايات. اجعل النبي ﷺ في أعلى الرسم عندما تدعمه الرواية، وافصل المسارات، وأظهر أي جزء غير متاح بدل استكماله بالافتراض." }, { label: "بسّط لي المعنى", prompt: "اشرح معنى الحديث وسياقه بلغة مناسبة للتعريف بالإسلام، مع مصادر الشرح، وميّز النص المنقول عن التلخيص." }]
  },
  {
    id: "hajj-arafah",
    modelId: "hadith-modular-agent",
    title: "الحج عرفة",
    category: "الروايات وطرقها",
    icon: "branch",
    learn: "من سؤال عن الحج إلى رواياته ومصادره في عرض واحد.",
    research: "استعرض التخريج المقارن وشجرة الطرق التي يعيدها النموذج.",
    question: "حديث الحج عرفة من الكتب الستة مع رسم شجرة إسناد شاملة للجميع",
    outputs: [{ title: "التخريج المقارن", description: "شاهد النص ومواضعه التي عثر عليها النموذج في نطاق الكتب الستة." }, { title: "شجرة الرواية", description: "افتح مخطط Mermaid لتتبّع المسارات والأسماء المعروضة في الإجابة." }, { title: "المصدر مع المعنى", description: "افحص عزو النصوص والأحكام، ثم تابع بسؤال عن المعنى أو ألفاظ الحديث." }],
    followups: [{ label: "قارن ألفاظ الروايات", prompt: "قارن ألفاظ الروايات التي استرجعتها لهذا الحديث في جدول، مع مصدر كل لفظ، وميّز اختلاف الألفاظ عن النسخ المتكررة." }, { label: "هيّئ بطاقة للتعريف", prompt: "هيّئ بطاقة قصيرة للتعريف بالإسلام من هذا الحديث: النص المختار، مصدره، ومعناه المبسط من شرح موثق. لا تضف سياقًا أو حكمًا لا يدعمه المصدر." }]
  },
  {
    id: "abu-hurairah",
    modelId: "hadith-rijal-agent",
    title: "رواة أبي هريرة",
    category: "الرواة وتراجمهم",
    icon: "person",
    learn: "تعرّف على ناقلي الحديث، وتواريخهم، ومصادر تراجمهم.",
    research: "افحص الرواة عن أبي هريرة في صحيح البخاري وتوسّع في أقوال النقاد.",
    question: "من هم الرواة عن أبو هريرة في صحيح البخاري؟ اذكرهم جميعًا مع تواريخ وفاتهم",
    outputs: [{ title: "الرواة في الكتاب", description: "اعرض قائمة الرواة التي تعيدها الأداة ضمن الكتاب المطلوب." }, { title: "تواريخ وتراجم", description: "راجع بيانات الترجمة وتواريخ الوفاة، وما يذكره المصدر من معلومات غير متاحة." }, { title: "أقوال النقاد", description: "توسّع بطلب الرتبة الحديثية مع نسبة الأقوال إلى أصحابها ومصادرها." }],
    followups: [{ label: "أضف الرتب ومصادرها", prompt: "هل يمكنك إضافة تواريخ الوفاة والرتبة الحديثية لكل راوٍ في الجدول؟ انسب كل قول إلى صاحبه ومصدره، وأبقِ ما لا يتوفر له توثيق غير متاح." }, { label: "ارسم شبكة مختصرة", prompt: "اعرض شجرة إسنادية مختصرة لأبرز الرواة المذكورين، مع مصادر العلاقات، ووضّح أنها شبكة رواة في الكتاب وليست إسنادًا لحديث واحد." }]
  }
], fl = Og.map((n) => ({
  id: n.id,
  modelId: n.modelId,
  title: n.title,
  category: "التعريف بالإسلام",
  icon: "book",
  topic: n,
  learn: n.question,
  research: n.question,
  question: n.question,
  outputs: [{ title: "الدليل", description: "استرجع شواهد من نطاق الكتب الستة مع بيانات الكتاب والباب، وبيّن ما عُثر عليه فعليًا." }, { title: "المعنى", description: "افصل النص المنقول عن التلخيص التعريفي، وأظهر ما يحتاج إلى شرح معتمد أو مراجعة." }, { title: "مادة للتعريف", description: "حوّل الأدلة إلى مسودة تناسب جمهورك، ثم راجع مصادرها قبل مشاركتها." }],
  followups: [{ label: "بسّط المصطلحات", prompt: "بسّط المصطلحات في الإجابة لقارئ يتعرف على الإسلام لأول مرة، دون إضافة نصوص أو مصادر غير مسترجعة." }, { label: "جهّز بطاقة بالمصادر", prompt: "جهّز من المادة المسترجعة بطاقة تعريفية قصيرة، وافصل النص النبوي عن التلخيص الأولي وأبقِ المصادر وحدود المراجعة ظاهرة." }]
}));
function wo(n) {
  return [...yo, ...fl].find((t) => t.id === n);
}
function Lc(n, t = "مهتم يتعرف على الإسلام", e = "بطاقة تعريفية قصيرة") {
  var r;
  return `أريد إعداد ${e} لجمهور: ${t}. الموضوع: ${n.title}. السؤال: ${n.question}
ابدأ بجمع شاهدين مناسبين من نطاق الكتب الستة بأداة البحث. كلمات بداية مقترحة: ${(r = n.topic) == null ? void 0 : r.seedQueries.join("، ")}. اختر شاهدين يدلان على الموضوع في سياقهما؛ استبعد المصادفة اللفظية والدعاء العارض، وبيّن سبب اختيار كل شاهد. اعرض النصوص المسترجعة ومصادرها، ثم تلخيصًا تعريفيًا واضحًا منفصلًا عنها. بيّن حدود البحث وما يحتاج إلى مراجعة، ولا تفترض وجود الموضوع في جميع الكتب أو صحة كل نتيجة.`;
}
function Pg(n, t, e = !1, r) {
  const i = wo(t);
  if (!i) throw new Error("Unknown demonstration");
  const a = new URL("/", n);
  if (!["http:", "https:"].includes(a.protocol)) throw new Error("Invalid application origin");
  return a.search = new URLSearchParams({ model: i.modelId, q: r || i.question, submit: String(e), athar: "chat", case: i.id }).toString(), a.toString();
}
function Ig(n, t) {
  if (!Object.values(jp).flat().some((r) => r.id === t)) throw new Error("Unknown evidence record");
  const e = new URL("/", n);
  if (!["http:", "https:"].includes(e.protocol)) throw new Error("Invalid application origin");
  return e.search = new URLSearchParams({ model: "hadith-phrase-poc", q: `افتح السجل ${t} باستخدام open_hadith_record واعرض نصه ومصدره وحالة المراجعة.`, submit: "false", athar: "chat" }).toString(), e.toString();
}
const Dc = { book: "M12 5v16M3 3h5a4 4 0 0 1 4 2 4 4 0 0 1 4-2h5v16h-5a4 4 0 0 0-4 2 4 4 0 0 0-4-2H3Z", layers: "m12 3 10 6-10 6L2 9Zm-9 11 9 5 9-5m-18 5 9 5 9-5", branch: "M6 6v9a4 4 0 0 0 4 4h5M6 8h8a4 4 0 0 0 4-4M3 3a3 3 0 1 0 6 0 3 3 0 0 0-6 0M15 3a3 3 0 1 0 6 0 3 3 0 0 0-6 0M15 19a3 3 0 1 0 6 0 3 3 0 0 0-6 0", person: "M20 21v-2a7 7 0 0 0-14 0v2M8 7a5 5 0 1 0 10 0A5 5 0 0 0 8 7", arrow: "M19 12H5m6-6-6 6 6 6", close: "m6 6 12 12M6 18 18 6", play: "m8 4 12 8-12 8Z" };
function fr(n) {
  const t = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  t.setAttribute("viewBox", "0 0 24 24"), t.setAttribute("fill", "none"), t.setAttribute("stroke", "currentColor"), t.setAttribute("stroke-width", "1.5"), t.setAttribute("stroke-linecap", "round"), t.setAttribute("stroke-linejoin", "round"), t.setAttribute("aria-hidden", "true");
  const e = document.createElementNS(t.namespaceURI, "path");
  return e.setAttribute("d", Dc[n] || Dc.book), t.append(e), t;
}
function V(n, t, e) {
  const r = document.createElement(n);
  return r.className = t, e && (r.textContent = e), r;
}
function he(n, t, e) {
  const r = V("button", n, t);
  return r.type = "button", r.onclick = e, r;
}
function Cg() {
  const n = V("style", "");
  n.dataset.atharVariant = "2", n.textContent = Mg, document.head.append(n);
  const t = V("section", "athar-v2-audience");
  t.id = "athar-v2-audience", t.dir = "rtl", t.setAttribute("aria-label", "اختر مسارك في الحديث");
  const e = V("section", "athar-v2-cards");
  e.id = "athar-v2-cards", e.dir = "rtl", e.setAttribute("aria-label", "حالات تطبيقية");
  const r = V("p", "athar-v2-status");
  r.setAttribute("role", "status");
  const i = V("section", "bayan-context");
  i.dir = "rtl", i.setAttribute("aria-label", "مسار المحادثة");
  const a = V("div", "bayan-followups");
  a.dir = "rtl", a.setAttribute("aria-label", "توسّع في هذه الحالة");
  const o = V("dialog", "bayan-demo");
  o.dir = "rtl", o.setAttribute("aria-labelledby", "bayan-demo-title"), o.addEventListener("click", (P) => {
    P.target === o && o.close();
  });
  const s = V("aside", "athar-v2-auth-intro");
  s.id = "athar-v2-auth-intro", s.dir = "rtl", s.append(V("span", "athar-v2-eyebrow", mi.subtitle), V("h1", "", mi.name), V("p", "", "من الحديث إلى فهمٍ واضح، ومصدرٍ تستطيع الرجوع إليه. ثلاث تجارب عملية تساعدك على عرض المعرفة والتوسّع في دليلها."));
  const l = V("div", "athar-v2-auth-features");
  for (const [P, Y] of [["book", "تعلّم وعرّف"], ["branch", "توسّع وتحقّق"]]) {
    const q = V("span", "");
    q.append(fr(P), document.createTextNode(Y)), l.append(q);
  }
  s.append(l);
  const c = V("div", "bayan-auth-cases");
  for (const P of yo) {
    const Y = he("", "", () => F(P));
    Y.append(fr(P.icon), document.createTextNode(P.title), fr("arrow")), c.append(Y);
  }
  s.append(c, V("small", "", "Powered by Open WebUI"));
  const d = he("bayan-auth-topic", "رحلة التعريف بالإسلام · استكشف الموضوعات", () => L(!0));
  s.insertBefore(d, c);
  let p = !1, u = "topics";
  const m = /* @__PURE__ */ new Set();
  let g = wo(new URLSearchParams(location.search).get("case")), f = !!g, v = location.pathname, b = "";
  const A = x();
  g || (g = wo(A[location.pathname]));
  function x() {
    try {
      const P = JSON.parse(sessionStorage.getItem("bayan-case-map") || "{}");
      return P && typeof P == "object" && !Array.isArray(P) ? P : {};
    } catch {
      return {};
    }
  }
  function y(P, Y) {
    P && (P.dataset.atharV2Slot !== Y && (P.dataset.atharV2Slot = Y), m.add(P));
  }
  function k() {
    for (const P of m) delete P.dataset.atharV2Slot;
    m.clear();
  }
  function M() {
    return [...document.querySelectorAll('#chat-pane [id^="message-"]')].some((P) => /^message-[a-f\d]{8}-/i.test(P.id));
  }
  function T(P) {
    const Y = document.querySelector('#chat-input[contenteditable="true"]');
    if (!Y) return;
    Y.focus();
    const q = document.createRange();
    q.selectNodeContents(Y), q.collapse(!1);
    const _ = window.getSelection();
    _ == null || _.removeAllRanges(), _ == null || _.addRange(q);
    const U = document.execCommand("insertText", !1, (Y.innerText.trim() ? `

` : "") + P);
    a.dataset.notice = U ? "أضيف السؤال إلى المسودة." : "يمكنك كتابة السؤال في مربع المحادثة.";
  }
  function O(P, Y, q) {
    z(Pg(location.origin, P.id, Y, q));
  }
  function z(P) {
    var q;
    if (location.pathname.startsWith("/auth") && (P = "/auth?" + new URLSearchParams({ redirect: new URL(P).pathname + new URL(P).search, athar: "chat" })), !!((q = document.getElementById("chat-input")) != null && q.innerText.trim()) || M()) {
      const _ = window.open("about:blank", "_blank");
      if (!_) {
        const U = o.querySelector(".bayan-demo-note");
        U && (U.textContent = "اسمح بفتح تبويب جديد للحفاظ على محادثتك ومسودتك الحالية.");
        return;
      }
      _.opener = null, _.location.href = P, o.close();
    } else location.assign(P);
  }
  function N(P) {
    const Y = jp[P.id] || [], q = V("details", "bayan-evidence");
    q.append(V("summary", "", `راجع الشواهد ومصادرها · ${Y.length}`)), q.append(V("p", "bayan-evidence-state", "النصوص مطابقة للفهرس المحلي. اختيارها التعليمي وشرحها يحتاجان إلى مراجعة علمية."));
    const _ = { bukhari: "صحيح البخاري", muslim: "صحيح مسلم", tirmidhi: "جامع الترمذي", abudawud: "سنن أبي داود", nasai: "سنن النسائي", ibnmajah: "سنن ابن ماجه" }, U = V("div", "bayan-evidence-coverage");
    for (const [D, it] of Object.entries(_)) {
      const pt = Y.filter((Ot) => Ot.collection === D).length, ft = V("span", "", `${it} · ${pt ? pt + " في هذه الحزمة" : "غير ممثّل في الحزمة"}`);
      ft.dataset.present = String(pt > 0), U.append(ft);
    }
    q.append(U);
    for (const D of Y) {
      const it = V("details", "bayan-evidence-record");
      it.append(V("summary", "", `${_[D.collection]} · ${D.chapter} · الموضع المحلي ${D.position}`)), it.append(V("p", "bayan-source-text", D.text), V("code", "bayan-source-id", D.id));
      const pt = V("div", "bayan-source-actions"), ft = V("a", "", "افتح ملف المصدر");
      ft.href = D.url, ft.target = "_blank", ft.rel = "noopener noreferrer";
      const Ot = he("", "انسخ النص ومصدره", async () => {
        try {
          await navigator.clipboard.writeText(`${D.text}

${_[D.collection]} — ${D.chapter}
الموضع المحلي: ${D.position}
${D.id}
${D.url}
مطابق للفهرس المحلي؛ يحتاج اختيار الشاهد وشرحه إلى مراجعة علمية.`), Ot.textContent = "نُسخ النص مع مصدره";
        } catch {
          Ot.textContent = "تعذر النسخ؛ حدّد النص لنسخه";
        }
      });
      pt.append(ft, Ot, he("", "حضّر فتح السجل بالأداة", () => z(Ig(location.origin, D.id)))), it.append(pt), q.append(it);
    }
    return q;
  }
  function F(P) {
    o.isConnected || document.body.append(o), o.replaceChildren();
    const Y = he("bayan-close", "", () => o.close());
    Y.setAttribute("aria-label", "أغلق عرض الحالة"), Y.append(fr("close"));
    const q = V("div", "bayan-demo-content");
    q.append(Y, V("span", "bayan-kicker", "حالة تطبيقية · " + P.category));
    const _ = V("h2", "", P.title);
    _.id = "bayan-demo-title", q.append(_, V("p", "bayan-demo-intro", P[u === "research" ? "research" : "learn"]));
    let U = "مهتم يتعرف على الإسلام", D = "بطاقة تعريفية قصيرة", it = P.topic ? Lc(P, U, D) : P.question;
    const pt = V("blockquote", "bayan-question", it);
    if (P.topic) {
      const wr = V("div", "bayan-topic-options");
      for (const [ai, G, $] of [["لمن تُعدّ المادة؟", ["مهتم يتعرف على الإسلام", "حديث العهد بالإسلام", "معرّف بالإسلام"], "reader"], ["كيف تريد تقديمها؟", ["بطاقة تعريفية قصيرة", "حوار سؤال وجواب", "كلمة تعريفية من دقيقتين"], "format"]]) {
        const wt = V("label", "", ai), Pt = V("select", "");
        for (const Yr of G) {
          const $r = V("option", "", Yr);
          $r.value = Yr, Pt.append($r);
        }
        Pt.onchange = () => {
          $ === "reader" ? U = Pt.value : D = Pt.value, it = Lc(P, U, D), pt.textContent = it;
        }, wt.append(Pt), wr.append(wt);
      }
      q.append(wr), q.append(N(P));
    }
    const ft = P.topic ? "دليل المعرّف بالإسلام" : P.id === "abu-hurairah" ? "ناقد الأسانيد وخبير الرجال" : P.id === "hajj-arafah" ? "محقق السنة · الروايات والشجرة" : "محقق السنة · النص والتخريج";
    if (q.append(V("p", "bayan-agent", "ينفّذها: " + ft)), P.topic) {
      const wr = V("details", "bayan-request");
      wr.append(V("summary", "", "راجع السؤال الذي سيُرسل"), pt), q.append(wr);
    } else q.append(V("span", "bayan-question-label", "السؤال الذي تبدأ به"), pt);
    q.append(V("h3", "", "ما الذي ستستكشفه؟"));
    const Ot = V("div", "bayan-demo-steps");
    Ot.setAttribute("role", "group"), Ot.setAttribute("aria-label", "مراحل الحالة");
    const yr = V("p", "bayan-step-detail", P.outputs[0].description);
    yr.id = "bayan-step-detail", yr.setAttribute("aria-live", "polite"), P.outputs.forEach((wr, ai) => {
      const G = he("", "", () => {
        yr.textContent = wr.description;
        for (const $ of Ot.querySelectorAll("button")) $.setAttribute("aria-pressed", String($ === G));
      });
      G.setAttribute("aria-pressed", String(ai === 0)), G.setAttribute("aria-controls", yr.id), G.append(V("span", "", String(ai + 1).padStart(2, "0")), document.createTextNode(wr.title)), Ot.append(G);
    }), q.append(Ot, yr, V("p", "bayan-demo-note", "تُنفّذ الحالة مباشرة بالأدوات المتاحة. افحص المصادر في الإجابة، وقد تختلف النتائج عند إعادة التجربة."));
    const sr = V("div", "bayan-demo-actions"), Ua = he("bayan-primary", P.topic ? "ابدأ رحلة الموضوع" : "ابدأ العرض المباشر", () => O(P, !0, it));
    Ua.append(fr("play")), sr.append(Ua, he("bayan-secondary", "عدّل السؤال أولًا", () => O(P, !1, it))), q.append(sr), o.append(q), o.open || o.showModal(), Y.focus();
  }
  function L(P = !1) {
    o.isConnected || document.body.append(o), o.replaceChildren();
    const Y = V("div", "bayan-demo-content"), q = he("bayan-close", "", () => o.close());
    q.setAttribute("aria-label", "أغلق عرض الحالات"), q.append(fr("close"));
    const _ = V("h2", "", "اختر تجربة جديدة");
    _.id = "bayan-demo-title", Y.append(q, V("span", "bayan-kicker", mi.name), _), Y.append(he("bayan-gallery-switch", P ? "انتقل إلى الحالات البحثية" : "انتقل إلى موضوعات التعريف بالإسلام", () => L(!P)));
    const U = V("div", "bayan-gallery");
    for (const D of P ? fl : yo) {
      const it = he("", "", () => F(D));
      it.append(fr(D.icon), V("strong", "", D.title), V("span", "", D.category), fr("arrow")), U.append(it);
    }
    Y.append(U, V("p", "bayan-demo-note", "إذا كانت لديك محادثة أو مسودة، تُفتح الحالة الجديدة في تبويب مستقل.")), o.append(Y), o.open || o.showModal(), q.focus();
  }
  function K() {
    t.replaceChildren(), e.replaceChildren();
    const P = V("div", "athar-v2-intro");
    P.append(V("h1", "bayan-wordmark", mi.name), V("p", "bayan-subtitle", mi.subtitle)), t.append(P);
    const Y = V("div", "athar-v2-toggles");
    Y.setAttribute("role", "group"), Y.setAttribute("aria-label", "نوع المستخدم");
    for (const [D, it, pt, ft] of [["topics", "أُعرّف بالإسلام", "من الموضوع إلى مادة بمصادرها", "book"], ["learn", "أستكشف حديثًا", "حالات واضحة لفهم الحديث", "layers"], ["research", "أتوسّع وأبحث", "للروايات والأسانيد والرجال", "branch"]]) {
      const Ot = he("athar-v2-persona", "", () => {
        var sr;
        u = D, K(), (sr = t.querySelector(`[data-audience="${D}"]`)) == null || sr.focus();
      });
      Ot.setAttribute("aria-pressed", String(u === D)), Ot.dataset.audience = D;
      const yr = V("span", "athar-v2-persona-copy");
      yr.append(V("strong", "", it), V("small", "", pt)), Ot.append(fr(ft), yr, V("span", "athar-v2-radio")), Y.append(Ot);
    }
    t.append(Y);
    const q = u === "topics";
    e.dataset.track = q ? "topics" : "cases";
    const _ = V("div", "athar-v2-cards-heading");
    _.append(V("span", "", q ? "أيّ باب تفتح للتعريف بالإسلام؟" : "جرّب قدرات بيان السُّنّة"), V("span", "bayan-count", q ? "موضوع ← دليل ← معنى" : "٣ حالات تطبيقية")), e.append(_);
    const U = V("div", "athar-v2-grid");
    for (const D of q ? fl : yo) {
      const it = he("athar-v2-card", "", () => F(D));
      it.dataset.case = D.id, it.setAttribute("aria-label", "استعرض حالة " + D.title), it.setAttribute("aria-haspopup", "dialog");
      const pt = V("span", "athar-v2-card-top");
      pt.append(fr(D.icon), V("small", "", D.category)), it.append(pt, V("strong", "", D.title), V("span", "athar-v2-card-description", D[u === "research" ? "research" : "learn"]));
      const ft = V("span", "bayan-card-action", q ? "صمّم رحلتك" : "استعرض التجربة");
      ft.append(fr("arrow")), it.append(ft), U.append(it);
    }
    e.append(U, r), r.textContent = q ? "٦ موضوعات · ١٣ شاهدًا مطابقًا للفهرس المحلي · المادة التعليمية قيد المراجعة." : "اختر حالة لتشاهد السؤال وخطوات التجربة، أو اكتب سؤالك مباشرة.";
  }
  function ot() {
    const P = (g == null ? void 0 : g.id) || "none";
    if (b !== P && (b = P, i.replaceChildren(), a.replaceChildren(), delete a.dataset.notice, i.append(V("span", "bayan-context-brand", mi.name)), g && i.append(V("span", "bayan-context-case", g.title)), i.append(he("", "الحالات التطبيقية", L)), g)) {
      a.append(V("span", "", "توسّع في هذه الحالة"));
      for (const Y of g.followups) a.append(he("", Y.label, () => T(Y.prompt)));
    }
  }
  function dt() {
    if (location.pathname !== v) {
      if (f && /^\/c\//.test(location.pathname) && g) {
        A[location.pathname] = g.id;
        try {
          sessionStorage.setItem("bayan-case-map", JSON.stringify(A));
        } catch {
        }
        f = !1;
      } else
        g = wo(A[location.pathname]), f = !1;
      v = location.pathname, b = "";
    }
  }
  function lt() {
    var pt;
    dt();
    const P = location.pathname === "/" || /^\/c\//.test(location.pathname), Y = location.pathname.startsWith("/auth");
    if (document.documentElement.toggleAttribute("data-athar-chat-v2", p && P), document.documentElement.toggleAttribute("data-athar-auth-v2", p && Y), !p || !P && !Y) {
      t.remove(), e.remove(), s.remove(), i.remove(), a.remove(), o.open && o.close(), k();
      return;
    }
    if (Y) {
      t.remove(), e.remove(), i.remove(), a.remove(), s.isConnected || document.body.append(s);
      return;
    }
    s.remove();
    const q = document.querySelector("#message-input-container"), _ = q == null ? void 0 : q.closest("form");
    if (M()) {
      t.remove(), e.remove(), k(), ot();
      const ft = document.getElementById("chat-pane");
      ft && i.parentElement !== ft && ft.prepend(i), _ && g && a.nextElementSibling !== _ ? _.before(a) : g || a.remove();
      return;
    }
    if (i.remove(), a.remove(), !q || !_) {
      t.remove(), e.remove();
      return;
    }
    let U = _.parentElement;
    for (; U && U.id !== "chat-pane" && !(U.classList.contains("text-base") && U.classList.contains("py-3")); ) U = U.parentElement;
    if ((!U || U.id === "chat-pane") && (U = _.parentElement), U && U.parentElement) {
      y(U, "composer-slot"), y(U.closest(".py-24"), "welcome");
      const ft = [...U.parentElement.children].find((Ot) => Ot !== U && Ot !== t && Ot.classList.contains("flex-row"));
      y(ft, "model-intro"), t.nextElementSibling !== U && U.before(t);
    }
    const D = document.querySelector('#chat-pane [role="list"]:has(button.waterfall[role="listitem"])'), it = (pt = D == null ? void 0 : D.parentElement) == null ? void 0 : pt.parentElement;
    it ? (y(it, "suggestions"), y(it.parentElement, "suggestions-width"), e.previousElementSibling !== it && it.after(e)) : !e.isConnected && U && U.after(e);
  }
  return K(), { setEnabled(P) {
    p = P, lt();
  }, refresh: lt };
}
const Yn = document.documentElement.dataset.hadithPreview === "true", Fc = "hadith-theme-poc-host", Rg = "http://127.0.0.1:8770/api";
if (!document.getElementById(Fc)) {
  let n = function() {
    c.open && (c.close(), document.documentElement.style.overflow = m, p == null || p.focus());
  }, t = function(z) {
    c.open || (p = document.activeElement, m = document.documentElement.style.overflow, u(z), c.showModal(), c.focus(), document.documentElement.style.overflow = "hidden");
  }, e = function() {
    x.textContent = `الواجهات · ${M[f]} ▾`;
    for (const z of y.querySelectorAll("button")) z.setAttribute("aria-pressed", String(z.dataset.variant === f));
  }, r = function(z) {
    n(), f = z, g.setEnabled(z === "chat");
    try {
      sessionStorage.setItem("hadith-view", z);
    } catch {
    }
    y.hidden = !0, x.setAttribute("aria-expanded", "false"), e(), z === "journey" && t(location.pathname.startsWith("/auth") || Yn ? "landing" : "workspace");
  };
  const i = document.createElement("div");
  i.id = Fc;
  const a = i.attachShadow({ mode: "open" }), o = document.createElement("style");
  o.textContent = `@font-face{font-family:Readex;src:url('${zg}') format('woff2');font-weight:400;unicode-range:U+0600-06FF,U+0750-077F,U+08A0-08FF,U+FB50-FDFF,U+FE70-FEFF;font-display:swap}@font-face{font-family:Readex;src:url('${Eg}') format('woff2');font-weight:400;font-display:swap}@font-face{font-family:Amiri;src:url('${Tg}') format('woff2');font-weight:400;font-display:swap}` + Sg;
  const s = document.createElement("style");
  s.dataset.hadithFonts = "true";
  const l = o.textContent.indexOf(":host");
  s.textContent = o.textContent.slice(0, l).replaceAll("Readex", "AtharReadex").replaceAll("Amiri", "AtharAmiri"), o.textContent = o.textContent.slice(l).replaceAll("Readex", "AtharReadex").replaceAll("Amiri", "AtharAmiri"), document.head.appendChild(s), a.appendChild(o);
  const c = document.createElement("dialog");
  c.className = "athar-dialog", c.tabIndex = -1, c.setAttribute("aria-label", "أثر — تجربة واجهة الحديث");
  const d = document.createElement("div");
  c.appendChild(d), a.appendChild(c), document.body.appendChild(i);
  let p = null, u = () => {
  }, m = "";
  const g = Cg();
  let f = "original";
  const v = document.createElement("div");
  v.id = "athar-view-switch";
  const b = v.attachShadow({ mode: "open" }), A = document.createElement("style");
  A.textContent = ":host{font-family:AtharReadex,system-ui,sans-serif;direction:rtl}button{font:inherit;cursor:pointer}.trigger{display:flex;align-items:center;gap:10px;border:1px solid #6150ea55;background:#292151;color:#f1edfc;font-size:11px;border-radius:99px;padding:10px 15px;white-space:nowrap;box-shadow:0 3px 14px #1a164815}.menu{position:absolute;left:50%;transform:translateX(-50%);top:calc(100% + 9px);background:#fff;border:1px solid #e3ddef;border-radius:13px;width:245px;padding:7px;box-shadow:0 16px 44px #24203b22;direction:rtl}.menu[hidden]{display:none}.menu button{display:block;width:100%;background:transparent;text-align:right;padding:12px 13px;border:0;border-radius:8px;color:#716180;font-size:12px}.menu button small{display:block;font-size:10px;margin-top:5px;color:#a599b4}.menu button[aria-pressed=true]{background:#f1edf8;color:#574278}.menu button:hover{background:#f6f3fb}button:focus-visible{outline:2px solid #a396cd;outline-offset:3px}", b.append(A);
  const x = document.createElement("button");
  x.id = "hadith-theme-launcher", x.className = "trigger", x.type = "button", x.setAttribute("aria-label", "بدّل واجهة أثر"), x.setAttribute("aria-expanded", "false"), x.setAttribute("aria-controls", "athar-views");
  const y = document.createElement("div");
  y.id = "athar-views", y.className = "menu", y.hidden = !0;
  const k = [["original", "الواجهة الأصلية", "Open WebUI كما هو"], ["journey", "أثر ١ · رحلة المعرفة", "واجهة الاستكشاف الأولى"], ["chat", "بيان السُّنّة · أثر ٢", "الحالات التطبيقية والمحادثة"]], M = { original: "الأصلية", journey: "أثر ١", chat: "بيان السُّنّة" };
  for (const [z, N, F] of k) {
    const L = document.createElement("button");
    L.type = "button", L.dataset.variant = z, L.textContent = N;
    const K = document.createElement("small");
    K.textContent = F, L.append(K), L.addEventListener("click", () => {
      if (Yn && z === "chat") {
        window.open("http://localhost:8080/?athar=chat", "_blank", "noopener");
        return;
      }
      r(z);
    }), y.append(L);
  }
  x.addEventListener("click", () => {
    y.hidden = !y.hidden, x.setAttribute("aria-expanded", String(!y.hidden));
  }), b.append(x, y), e(), document.addEventListener("pointerdown", (z) => {
    z.composedPath().includes(v) || (y.hidden = !0, x.setAttribute("aria-expanded", "false"));
  }), v.addEventListener("keydown", (z) => {
    z.key === "Escape" && (y.hidden = !0, x.setAttribute("aria-expanded", "false"), x.focus());
  }), qu(Ag, { target: d, props: { apiBase: Yn ? "/api" : Rg, onClose: () => r("original"), onVariant2: () => {
    Yn ? window.open("http://localhost:8080/?athar=chat", "_blank", "noopener") : r("chat");
  }, onReady: (z) => {
    u = z;
  }, webuiOrigin: Yn ? "http://localhost:8080" : location.origin } }), c.addEventListener("cancel", (z) => {
    z.preventDefault(), r("original");
  });
  const T = () => {
    const z = location.pathname.startsWith("/auth"), N = location.pathname === "/" || /^\/c\//.test(location.pathname);
    if (g.refresh(), !(z || N || Yn)) {
      v.remove();
      return;
    }
    const F = N ? document.querySelector("nav") : null, L = F || document.body;
    v.parentElement !== L && L.appendChild(v), v.style.cssText = `position:${F ? "absolute" : "fixed"};top:${F ? "4px" : "18px"};left:50%;transform:translateX(-50%);z-index:60;`;
  };
  if (new MutationObserver(T).observe(document.body, { childList: !0, subtree: !0 }), window.addEventListener("popstate", T), T(), Yn) r("journey");
  else {
    let z = "";
    try {
      z = sessionStorage.getItem("hadith-view") || "";
    } catch {
    }
    (new URLSearchParams(location.search).get("athar") === "chat" || z === "chat") && r("chat");
  }
}
