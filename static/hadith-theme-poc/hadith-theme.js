var of = Object.defineProperty;
var Wl = (i) => {
  throw TypeError(i);
};
var sf = (i, e, t) => e in i ? of(i, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : i[e] = t;
var cr = (i, e, t) => sf(i, typeof e != "symbol" ? e + "" : e, t), gs = (i, e, t) => e.has(i) || Wl("Cannot " + t);
var E = (i, e, t) => (gs(i, e, "read from private field"), t ? t.call(i) : e.get(i)), re = (i, e, t) => e.has(i) ? Wl("Cannot add the same private member more than once") : e instanceof WeakSet ? e.add(i) : e.set(i, t), W = (i, e, t, r) => (gs(i, e, "write to private field"), r ? r.call(i, t) : e.set(i, t), t), Le = (i, e, t) => (gs(i, e, "access private method"), t);
var gl = Array.isArray, lf = Array.prototype.indexOf, Vn = Array.prototype.includes, Ro = Array.from, cf = Object.defineProperty, hi = Object.getOwnPropertyDescriptor, Gc = Object.getOwnPropertyDescriptors, df = Object.prototype, pf = Array.prototype, ml = Object.getPrototypeOf, Jl = Object.isExtensible;
function sa(i) {
  return typeof i == "function";
}
const ff = () => {
};
function uf(i) {
  return i();
}
function Rs(i) {
  for (var e = 0; e < i.length; e++)
    i[e]();
}
function Xc() {
  var i, e, t = new Promise((r, n) => {
    i = r, e = n;
  });
  return { promise: t, resolve: i, reject: e };
}
function hf(i, e) {
  if (Array.isArray(i))
    return i;
  if (!(Symbol.iterator in i))
    return Array.from(i);
  const t = [];
  for (const r of i)
    if (t.push(r), t.length === e) break;
  return t;
}
const Ze = 2, Nn = 4, La = 8, vl = 1 << 24, Si = 16, mr = 32, Ji = 64, Vs = 128, tr = 512, Fe = 1024, st = 2048, nr = 4096, Ut = 8192, rr = 16384, nn = 32768, Ns = 1 << 25, $i = 65536, $l = 1 << 17, gf = 1 << 18, Zn = 1 << 19, Zc = 1 << 20, Or = 1 << 25, en = 65536, Ys = 1 << 21, bl = 1 << 22, gi = 1 << 23, Pr = Symbol("$state"), Kc = Symbol("legacy props"), mf = Symbol(""), Ur = new class extends Error {
  constructor() {
    super(...arguments);
    cr(this, "name", "StaleReactionError");
    cr(this, "message", "The reaction that called `getAbortSignal()` was re-run or destroyed");
  }
}();
var jc;
const Hc = (
  // We gotta write it like this because after downleveling the pure comment may end up in the wrong location
  !!((jc = globalThis.document) != null && jc.contentType) && /* @__PURE__ */ globalThis.document.contentType.includes("xml")
);
function vf(i) {
  throw new Error("https://svelte.dev/e/lifecycle_outside_component");
}
function bf() {
  throw new Error("https://svelte.dev/e/async_derived_orphan");
}
function xf(i, e, t) {
  throw new Error("https://svelte.dev/e/each_key_duplicate");
}
function yf(i) {
  throw new Error("https://svelte.dev/e/effect_in_teardown");
}
function wf() {
  throw new Error("https://svelte.dev/e/effect_in_unowned_derived");
}
function kf(i) {
  throw new Error("https://svelte.dev/e/effect_orphan");
}
function Af() {
  throw new Error("https://svelte.dev/e/effect_update_depth_exceeded");
}
function Sf(i) {
  throw new Error("https://svelte.dev/e/props_invalid_value");
}
function zf() {
  throw new Error("https://svelte.dev/e/state_descriptors_fixed");
}
function Ef() {
  throw new Error("https://svelte.dev/e/state_prototype_fixed");
}
function Tf() {
  throw new Error("https://svelte.dev/e/state_unsafe_mutation");
}
function Mf() {
  throw new Error("https://svelte.dev/e/svelte_boundary_reset_onerror");
}
const If = 1, Of = 2, Qc = 4, Cf = 8, Pf = 16, qf = 1, Rf = 2, Wc = 4, Vf = 8, Nf = 16, Yf = 1, Lf = 2, Xe = Symbol(), Jc = "http://www.w3.org/1999/xhtml", _f = "http://www.w3.org/2000/svg", Df = "@attach";
function Ff() {
  console.warn("https://svelte.dev/e/select_multiple_invalid_value");
}
function jf() {
  console.warn("https://svelte.dev/e/svelte_boundary_reset_noop");
}
function $c(i) {
  return i === this.v;
}
function Bf(i, e) {
  return i != i ? e == e : i !== e || i !== null && typeof i == "object" || typeof i == "function";
}
function ed(i) {
  return !Bf(i, this.v);
}
let Kn = !1;
function Uf() {
  Kn = !0;
}
let Se = null;
function Yn(i) {
  Se = i;
}
function xl(i, e = !1, t) {
  Se = {
    p: Se,
    i: !1,
    c: null,
    e: null,
    s: i,
    x: null,
    r: (
      /** @type {Effect} */
      J
    ),
    l: Kn && !e ? { s: null, u: null, $: [] } : null
  };
}
function yl(i) {
  var e = (
    /** @type {ComponentContext} */
    Se
  ), t = e.e;
  if (t !== null) {
    e.e = null;
    for (var r of t)
      kd(r);
  }
  return e.i = !0, Se = e.p, /** @type {T} */
  {};
}
function _a() {
  return !Kn || Se !== null && Se.l === null;
}
let _i = [];
function td() {
  var i = _i;
  _i = [], Rs(i);
}
function Kr(i) {
  if (_i.length === 0 && !ya) {
    var e = _i;
    queueMicrotask(() => {
      e === _i && td();
    });
  }
  _i.push(i);
}
function Gf() {
  for (; _i.length > 0; )
    td();
}
function rd(i) {
  var e = J;
  if (e === null)
    return $.f |= gi, i;
  if (!(e.f & nn) && !(e.f & Nn))
    throw i;
  di(i, e);
}
function di(i, e) {
  for (; e !== null; ) {
    if (e.f & Vs) {
      if (!(e.f & nn))
        throw i;
      try {
        e.b.error(i);
        return;
      } catch (t) {
        i = t;
      }
    }
    e = e.parent;
  }
  throw i;
}
const Xf = -7169;
function Ce(i, e) {
  i.f = i.f & Xf | e;
}
function wl(i) {
  i.f & tr || i.deps === null ? Ce(i, Fe) : Ce(i, nr);
}
function id(i) {
  if (i !== null)
    for (const e of i)
      !(e.f & Ze) || !(e.f & en) || (e.f ^= en, id(
        /** @type {Derived} */
        e.deps
      ));
}
function nd(i, e, t) {
  i.f & st ? e.add(i) : i.f & nr && t.add(i), id(i.deps), Ce(i, Fe);
}
let lo = !1;
function Zf(i) {
  var e = lo;
  try {
    return lo = !1, [i(), lo];
  } finally {
    lo = e;
  }
}
const la = /* @__PURE__ */ new Set();
let G = null, Je = null, Ls = null, ya = !1, ms = !1, xn = null, ho = null;
var ec = 0;
let Kf = 1;
var En, Tn, Mn, In, Va, Qt, On, li, zr, Cn, lt, _s, Ds, Fs, js, ad;
const Co = class Co {
  constructor() {
    re(this, lt);
    // for debugging. TODO remove once async is stable
    cr(this, "id", Kf++);
    /**
     * The current values of any sources that are updated in this batch
     * They keys of this map are identical to `this.#previous`
     * @type {Map<Source, any>}
     */
    cr(this, "current", /* @__PURE__ */ new Map());
    /**
     * The values of any sources that are updated in this batch _before_ those updates took place.
     * They keys of this map are identical to `this.#current`
     * @type {Map<Source, any>}
     */
    cr(this, "previous", /* @__PURE__ */ new Map());
    /**
     * When the batch is committed (and the DOM is updated), we need to remove old branches
     * and append new ones by calling the functions added inside (if/each/key/etc) blocks
     * @type {Set<(batch: Batch) => void>}
     */
    re(this, En, /* @__PURE__ */ new Set());
    /**
     * If a fork is discarded, we need to destroy any effects that are no longer needed
     * @type {Set<(batch: Batch) => void>}
     */
    re(this, Tn, /* @__PURE__ */ new Set());
    /**
     * The number of async effects that are currently in flight
     */
    re(this, Mn, 0);
    /**
     * The number of async effects that are currently in flight, _not_ inside a pending boundary
     */
    re(this, In, 0);
    /**
     * A deferred that resolves when the batch is committed, used with `settled()`
     * TODO replace with Promise.withResolvers once supported widely enough
     * @type {{ promise: Promise<void>, resolve: (value?: any) => void, reject: (reason: unknown) => void } | null}
     */
    re(this, Va, null);
    /**
     * The root effects that need to be flushed
     * @type {Effect[]}
     */
    re(this, Qt, []);
    /**
     * Deferred effects (which run after async work has completed) that are DIRTY
     * @type {Set<Effect>}
     */
    re(this, On, /* @__PURE__ */ new Set());
    /**
     * Deferred effects that are MAYBE_DIRTY
     * @type {Set<Effect>}
     */
    re(this, li, /* @__PURE__ */ new Set());
    /**
     * A map of branches that still exist, but will be destroyed when this batch
     * is committed — we skip over these during `process`.
     * The value contains child effects that were dirty/maybe_dirty before being reset,
     * so they can be rescheduled if the branch survives.
     * @type {Map<Effect, { d: Effect[], m: Effect[] }>}
     */
    re(this, zr, /* @__PURE__ */ new Map());
    cr(this, "is_fork", !1);
    re(this, Cn, !1);
  }
  /**
   * Add an effect to the #skipped_branches map and reset its children
   * @param {Effect} effect
   */
  skip_effect(e) {
    E(this, zr).has(e) || E(this, zr).set(e, { d: [], m: [] });
  }
  /**
   * Remove an effect from the #skipped_branches map and reschedule
   * any tracked dirty/maybe_dirty child effects
   * @param {Effect} effect
   */
  unskip_effect(e) {
    var t = E(this, zr).get(e);
    if (t) {
      E(this, zr).delete(e);
      for (var r of t.d)
        Ce(r, st), this.schedule(r);
      for (r of t.m)
        Ce(r, nr), this.schedule(r);
    }
  }
  /**
   * Associate a change to a given source with the current
   * batch, noting its previous and current values
   * @param {Source} source
   * @param {any} value
   */
  capture(e, t) {
    t !== Xe && !this.previous.has(e) && this.previous.set(e, t), e.f & gi || (this.current.set(e, e.v), Je == null || Je.set(e, e.v));
  }
  activate() {
    G = this;
  }
  deactivate() {
    G = null, Je = null;
  }
  flush() {
    try {
      if (ms = !0, G = this, !Le(this, lt, _s).call(this)) {
        for (const e of E(this, On))
          E(this, li).delete(e), Ce(e, st), this.schedule(e);
        for (const e of E(this, li))
          Ce(e, nr), this.schedule(e);
      }
      Le(this, lt, Ds).call(this);
    } finally {
      ec = 0, Ls = null, xn = null, ho = null, ms = !1, G = null, Je = null, mi.clear();
    }
  }
  discard() {
    for (const e of E(this, Tn)) e(this);
    E(this, Tn).clear();
  }
  /**
   *
   * @param {boolean} blocking
   */
  increment(e) {
    W(this, Mn, E(this, Mn) + 1), e && W(this, In, E(this, In) + 1);
  }
  /**
   * @param {boolean} blocking
   * @param {boolean} skip - whether to skip updates (because this is triggered by a stale reaction)
   */
  decrement(e, t) {
    W(this, Mn, E(this, Mn) - 1), e && W(this, In, E(this, In) - 1), !(E(this, Cn) || t) && (W(this, Cn, !0), Kr(() => {
      W(this, Cn, !1), this.flush();
    }));
  }
  /** @param {(batch: Batch) => void} fn */
  oncommit(e) {
    E(this, En).add(e);
  }
  /** @param {(batch: Batch) => void} fn */
  ondiscard(e) {
    E(this, Tn).add(e);
  }
  settled() {
    return (E(this, Va) ?? W(this, Va, Xc())).promise;
  }
  static ensure() {
    if (G === null) {
      const e = G = new Co();
      ms || (la.add(G), ya || Kr(() => {
        G === e && e.flush();
      }));
    }
    return G;
  }
  apply() {
  }
  /**
   *
   * @param {Effect} effect
   */
  schedule(e) {
    var n;
    if (Ls = e, (n = e.b) != null && n.is_pending && e.f & (Nn | La | vl) && !(e.f & nn)) {
      e.b.defer_effect(e);
      return;
    }
    for (var t = e; t.parent !== null; ) {
      t = t.parent;
      var r = t.f;
      if (xn !== null && t === J && ($ === null || !($.f & Ze)))
        return;
      if (r & (Ji | mr)) {
        if (!(r & Fe))
          return;
        t.f ^= Fe;
      }
    }
    E(this, Qt).push(t);
  }
};
En = new WeakMap(), Tn = new WeakMap(), Mn = new WeakMap(), In = new WeakMap(), Va = new WeakMap(), Qt = new WeakMap(), On = new WeakMap(), li = new WeakMap(), zr = new WeakMap(), Cn = new WeakMap(), lt = new WeakSet(), _s = function() {
  return this.is_fork || E(this, In) > 0;
}, Ds = function() {
  var s, l;
  ec++ > 1e3 && Qf();
  const e = E(this, Qt);
  W(this, Qt, []), this.apply();
  var t = xn = [], r = [], n = ho = [];
  for (const c of e)
    Le(this, lt, Fs).call(this, c, t, r);
  if (G = null, n.length > 0) {
    var a = Co.ensure();
    for (const c of n)
      a.schedule(c);
  }
  if (xn = null, ho = null, Le(this, lt, _s).call(this)) {
    Le(this, lt, js).call(this, r), Le(this, lt, js).call(this, t);
    for (const [c, d] of E(this, zr))
      ld(c, d);
  } else {
    E(this, On).clear(), E(this, li).clear();
    for (const c of E(this, En)) c(this);
    E(this, En).clear(), tc(r), tc(t), E(this, Mn) === 0 && Le(this, lt, ad).call(this), (s = E(this, Va)) == null || s.resolve();
  }
  var o = (
    /** @type {Batch | null} */
    /** @type {unknown} */
    G
  );
  if (E(this, Qt).length > 0) {
    const c = o ?? (o = this);
    E(c, Qt).push(...E(this, Qt).filter((d) => !E(c, Qt).includes(d)));
  }
  o !== null && (la.add(o), Le(l = o, lt, Ds).call(l));
}, /**
 * Traverse the effect tree, executing effects or stashing
 * them for later execution as appropriate
 * @param {Effect} root
 * @param {Effect[]} effects
 * @param {Effect[]} render_effects
 */
Fs = function(e, t, r) {
  e.f ^= Fe;
  for (var n = e.first; n !== null; ) {
    var a = n.f, o = (a & (mr | Ji)) !== 0, s = o && (a & Fe) !== 0, l = s || (a & Ut) !== 0 || E(this, zr).has(n);
    if (!l && n.fn !== null) {
      o ? n.f ^= Fe : a & Nn ? t.push(n) : Hn(n) && (a & Si && E(this, li).add(n), rn(n));
      var c = n.first;
      if (c !== null) {
        n = c;
        continue;
      }
    }
    for (; n !== null; ) {
      var d = n.next;
      if (d !== null) {
        n = d;
        break;
      }
      n = n.parent;
    }
  }
}, /**
 * @param {Effect[]} effects
 */
js = function(e) {
  for (var t = 0; t < e.length; t += 1)
    nd(e[t], E(this, On), E(this, li));
}, ad = function() {
  var n;
  if (la.size > 1) {
    this.previous.clear();
    var e = G, t = Je, r = !0;
    for (const a of la) {
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
          od(d, s, l, c);
        if (E(a, Qt).length > 0) {
          a.apply();
          for (const d of E(a, Qt))
            Le(n = a, lt, Fs).call(n, d, [], []);
        }
        a.deactivate();
      }
    }
    G = e, Je = t;
  }
  E(this, zr).clear(), la.delete(this);
};
let tn = Co;
function Hf(i) {
  var e = ya;
  ya = !0;
  try {
    for (var t; ; ) {
      if (Gf(), G === null)
        return (
          /** @type {T} */
          t
        );
      G.flush();
    }
  } finally {
    ya = e;
  }
}
function Qf() {
  try {
    Af();
  } catch (i) {
    di(i, Ls);
  }
}
let pr = null;
function tc(i) {
  var e = i.length;
  if (e !== 0) {
    for (var t = 0; t < e; ) {
      var r = i[t++];
      if (!(r.f & (rr | Ut)) && Hn(r) && (pr = /* @__PURE__ */ new Set(), rn(r), r.deps === null && r.first === null && r.nodes === null && r.teardown === null && r.ac === null && zd(r), (pr == null ? void 0 : pr.size) > 0)) {
        mi.clear();
        for (const n of pr) {
          if (n.f & (rr | Ut)) continue;
          const a = [n];
          let o = n.parent;
          for (; o !== null; )
            pr.has(o) && (pr.delete(o), a.push(o)), o = o.parent;
          for (let s = a.length - 1; s >= 0; s--) {
            const l = a[s];
            l.f & (rr | Ut) || rn(l);
          }
        }
        pr.clear();
      }
    }
    pr = null;
  }
}
function od(i, e, t, r) {
  if (!t.has(i) && (t.add(i), i.reactions !== null))
    for (const n of i.reactions) {
      const a = n.f;
      a & Ze ? od(
        /** @type {Derived} */
        n,
        e,
        t,
        r
      ) : a & (bl | Si) && !(a & st) && sd(n, e, r) && (Ce(n, st), kl(
        /** @type {Effect} */
        n
      ));
    }
}
function sd(i, e, t) {
  const r = t.get(i);
  if (r !== void 0) return r;
  if (i.deps !== null)
    for (const n of i.deps) {
      if (Vn.call(e, n))
        return !0;
      if (n.f & Ze && sd(
        /** @type {Derived} */
        n,
        e,
        t
      ))
        return t.set(
          /** @type {Derived} */
          n,
          !0
        ), !0;
    }
  return t.set(i, !1), !1;
}
function kl(i) {
  G.schedule(i);
}
function ld(i, e) {
  if (!(i.f & mr && i.f & Fe)) {
    i.f & st ? e.d.push(i) : i.f & nr && e.m.push(i), Ce(i, Fe);
    for (var t = i.first; t !== null; )
      ld(t, e), t = t.next;
  }
}
function Wf(i) {
  let e = 0, t = xi(0), r;
  return () => {
    zl() && (h(t), ja(() => (e === 0 && (r = P(() => i(() => wa(t)))), e += 1, () => {
      Kr(() => {
        e -= 1, e === 0 && (r == null || r(), r = void 0, wa(t));
      });
    })));
  };
}
var Jf = $i | Zn;
function $f(i, e, t, r) {
  new eu(i, e, t, r);
}
var Wt, hl, Er, Bi, At, Tr, Lt, fr, Xr, Ui, ci, Pn, qn, Rn, Zr, Po, je, tu, ru, iu, Bs, go, mo, Us;
class eu {
  /**
   * @param {TemplateNode} node
   * @param {BoundaryProps} props
   * @param {((anchor: Node) => void)} children
   * @param {((error: unknown) => unknown) | undefined} [transform_error]
   */
  constructor(e, t, r, n) {
    re(this, je);
    /** @type {Boundary | null} */
    cr(this, "parent");
    cr(this, "is_pending", !1);
    /**
     * API-level transformError transform function. Transforms errors before they reach the `failed` snippet.
     * Inherited from parent boundary, or defaults to identity.
     * @type {(error: unknown) => unknown}
     */
    cr(this, "transform_error");
    /** @type {TemplateNode} */
    re(this, Wt);
    /** @type {TemplateNode | null} */
    re(this, hl, null);
    /** @type {BoundaryProps} */
    re(this, Er);
    /** @type {((anchor: Node) => void)} */
    re(this, Bi);
    /** @type {Effect} */
    re(this, At);
    /** @type {Effect | null} */
    re(this, Tr, null);
    /** @type {Effect | null} */
    re(this, Lt, null);
    /** @type {Effect | null} */
    re(this, fr, null);
    /** @type {DocumentFragment | null} */
    re(this, Xr, null);
    re(this, Ui, 0);
    re(this, ci, 0);
    re(this, Pn, !1);
    /** @type {Set<Effect>} */
    re(this, qn, /* @__PURE__ */ new Set());
    /** @type {Set<Effect>} */
    re(this, Rn, /* @__PURE__ */ new Set());
    /**
     * A source containing the number of pending async deriveds/expressions.
     * Only created if `$effect.pending()` is used inside the boundary,
     * otherwise updating the source results in needless `Batch.ensure()`
     * calls followed by no-op flushes
     * @type {Source<number> | null}
     */
    re(this, Zr, null);
    re(this, Po, Wf(() => (W(this, Zr, xi(E(this, Ui))), () => {
      W(this, Zr, null);
    })));
    var a;
    W(this, Wt, e), W(this, Er, t), W(this, Bi, (o) => {
      var s = (
        /** @type {Effect} */
        J
      );
      s.b = this, s.f |= Vs, r(o);
    }), this.parent = /** @type {Effect} */
    J.b, this.transform_error = n ?? ((a = this.parent) == null ? void 0 : a.transform_error) ?? ((o) => o), W(this, At, Lo(() => {
      Le(this, je, Bs).call(this);
    }, Jf));
  }
  /**
   * Defer an effect inside a pending boundary until the boundary resolves
   * @param {Effect} effect
   */
  defer_effect(e) {
    nd(e, E(this, qn), E(this, Rn));
  }
  /**
   * Returns `false` if the effect exists inside a boundary whose pending snippet is shown
   * @returns {boolean}
   */
  is_rendered() {
    return !this.is_pending && (!this.parent || this.parent.is_rendered());
  }
  has_pending_snippet() {
    return !!E(this, Er).pending;
  }
  /**
   * Update the source that powers `$effect.pending()` inside this boundary,
   * and controls when the current `pending` snippet (if any) is removed.
   * Do not call from inside the class
   * @param {1 | -1} d
   * @param {Batch} batch
   */
  update_pending_count(e, t) {
    Le(this, je, Us).call(this, e, t), W(this, Ui, E(this, Ui) + e), !(!E(this, Zr) || E(this, Pn)) && (W(this, Pn, !0), Kr(() => {
      W(this, Pn, !1), E(this, Zr) && Ln(E(this, Zr), E(this, Ui));
    }));
  }
  get_effect_pending() {
    return E(this, Po).call(this), h(
      /** @type {Source<number>} */
      E(this, Zr)
    );
  }
  /** @param {unknown} error */
  error(e) {
    var t = E(this, Er).onerror;
    let r = E(this, Er).failed;
    if (!t && !r)
      throw e;
    E(this, Tr) && ($e(E(this, Tr)), W(this, Tr, null)), E(this, Lt) && ($e(E(this, Lt)), W(this, Lt, null)), E(this, fr) && ($e(E(this, fr)), W(this, fr, null));
    var n = !1, a = !1;
    const o = () => {
      if (n) {
        jf();
        return;
      }
      n = !0, a && Mf(), E(this, fr) !== null && Xi(E(this, fr), () => {
        W(this, fr, null);
      }), Le(this, je, mo).call(this, () => {
        Le(this, je, Bs).call(this);
      });
    }, s = (l) => {
      try {
        a = !0, t == null || t(l, o), a = !1;
      } catch (c) {
        di(c, E(this, At) && E(this, At).parent);
      }
      r && W(this, fr, Le(this, je, mo).call(this, () => {
        try {
          return zt(() => {
            var c = (
              /** @type {Effect} */
              J
            );
            c.b = this, c.f |= Vs, r(
              E(this, Wt),
              () => l,
              () => o
            );
          });
        } catch (c) {
          return di(
            c,
            /** @type {Effect} */
            E(this, At).parent
          ), null;
        }
      }));
    };
    Kr(() => {
      var l;
      try {
        l = this.transform_error(e);
      } catch (c) {
        di(c, E(this, At) && E(this, At).parent);
        return;
      }
      l !== null && typeof l == "object" && typeof /** @type {any} */
      l.then == "function" ? l.then(
        s,
        /** @param {unknown} e */
        (c) => di(c, E(this, At) && E(this, At).parent)
      ) : s(l);
    });
  }
}
Wt = new WeakMap(), hl = new WeakMap(), Er = new WeakMap(), Bi = new WeakMap(), At = new WeakMap(), Tr = new WeakMap(), Lt = new WeakMap(), fr = new WeakMap(), Xr = new WeakMap(), Ui = new WeakMap(), ci = new WeakMap(), Pn = new WeakMap(), qn = new WeakMap(), Rn = new WeakMap(), Zr = new WeakMap(), Po = new WeakMap(), je = new WeakSet(), tu = function() {
  try {
    W(this, Tr, zt(() => E(this, Bi).call(this, E(this, Wt))));
  } catch (e) {
    this.error(e);
  }
}, /**
 * @param {unknown} error The deserialized error from the server's hydration comment
 */
ru = function(e) {
  const t = E(this, Er).failed;
  t && W(this, fr, zt(() => {
    t(
      E(this, Wt),
      () => e,
      () => () => {
      }
    );
  }));
}, iu = function() {
  const e = E(this, Er).pending;
  if (e) {
    this.is_pending = !0, W(this, Lt, zt(() => e(E(this, Wt))));
    var t = (
      /** @type {Batch} */
      G
    );
    Kr(() => {
      var r = W(this, Xr, document.createDocumentFragment()), n = qr();
      r.append(n), W(this, Tr, Le(this, je, mo).call(this, () => zt(() => E(this, Bi).call(this, n)))), E(this, ci) === 0 && (E(this, Wt).before(r), W(this, Xr, null), Xi(
        /** @type {Effect} */
        E(this, Lt),
        () => {
          W(this, Lt, null);
        }
      ), Le(this, je, go).call(this, t));
    });
  }
}, Bs = function() {
  var e = (
    /** @type {Batch} */
    G
  );
  try {
    if (this.is_pending = this.has_pending_snippet(), W(this, ci, 0), W(this, Ui, 0), W(this, Tr, zt(() => {
      E(this, Bi).call(this, E(this, Wt));
    })), E(this, ci) > 0) {
      var t = W(this, Xr, document.createDocumentFragment());
      Ml(E(this, Tr), t);
      const r = (
        /** @type {(anchor: Node) => void} */
        E(this, Er).pending
      );
      W(this, Lt, zt(() => r(E(this, Wt))));
    } else
      Le(this, je, go).call(this, e);
  } catch (r) {
    this.error(r);
  }
}, /**
 * @param {Batch} batch
 */
go = function(e) {
  this.is_pending = !1;
  for (const t of E(this, qn))
    Ce(t, st), e.schedule(t);
  for (const t of E(this, Rn))
    Ce(t, nr), e.schedule(t);
  E(this, qn).clear(), E(this, Rn).clear();
}, /**
 * @template T
 * @param {() => T} fn
 */
mo = function(e) {
  var t = J, r = $, n = Se;
  Ot(E(this, At)), ar(E(this, At)), Yn(E(this, At).ctx);
  try {
    return tn.ensure(), e();
  } catch (a) {
    return rd(a), null;
  } finally {
    Ot(t), ar(r), Yn(n);
  }
}, /**
 * Updates the pending count associated with the currently visible pending snippet,
 * if any, such that we can replace the snippet with content once work is done
 * @param {1 | -1} d
 * @param {Batch} batch
 */
Us = function(e, t) {
  var r;
  if (!this.has_pending_snippet()) {
    this.parent && Le(r = this.parent, je, Us).call(r, e, t);
    return;
  }
  W(this, ci, E(this, ci) + e), E(this, ci) === 0 && (Le(this, je, go).call(this, t), E(this, Lt) && Xi(E(this, Lt), () => {
    W(this, Lt, null);
  }), E(this, Xr) && (E(this, Wt).before(E(this, Xr)), W(this, Xr, null)));
};
function cd(i, e, t, r) {
  const n = _a() ? Da : Al;
  var a = i.filter((f) => !f.settled);
  if (t.length === 0 && a.length === 0) {
    r(e.map(n));
    return;
  }
  var o = (
    /** @type {Effect} */
    J
  ), s = nu(), l = a.length === 1 ? a[0].promise : a.length > 1 ? Promise.all(a.map((f) => f.promise)) : null;
  function c(f) {
    s();
    try {
      r(f);
    } catch (v) {
      o.f & rr || di(v, o);
    }
    ko();
  }
  if (t.length === 0) {
    l.then(() => c(e.map(n)));
    return;
  }
  var d = dd();
  function p() {
    Promise.all(t.map((f) => /* @__PURE__ */ au(f))).then((f) => c([...e.map(n), ...f])).catch((f) => di(f, o)).finally(() => d());
  }
  l ? l.then(() => {
    s(), p(), ko();
  }) : p();
}
function nu() {
  var i = (
    /** @type {Effect} */
    J
  ), e = $, t = Se, r = (
    /** @type {Batch} */
    G
  );
  return function(a = !0) {
    Ot(i), ar(e), Yn(t), a && !(i.f & rr) && (r == null || r.activate(), r == null || r.apply());
  };
}
function ko(i = !0) {
  Ot(null), ar(null), Yn(null), i && (G == null || G.deactivate());
}
function dd() {
  var i = (
    /** @type {Boundary} */
    /** @type {Effect} */
    J.b
  ), e = (
    /** @type {Batch} */
    G
  ), t = i.is_rendered();
  return i.update_pending_count(1, e), e.increment(t), (r = !1) => {
    i.update_pending_count(-1, e), e.decrement(t, r);
  };
}
// @__NO_SIDE_EFFECTS__
function Da(i) {
  var e = Ze | st, t = $ !== null && $.f & Ze ? (
    /** @type {Derived} */
    $
  ) : null;
  return J !== null && (J.f |= Zn), {
    ctx: Se,
    deps: null,
    effects: null,
    equals: $c,
    f: e,
    fn: i,
    reactions: null,
    rv: 0,
    v: (
      /** @type {V} */
      Xe
    ),
    wv: 0,
    parent: t ?? J,
    ac: null
  };
}
// @__NO_SIDE_EFFECTS__
function au(i, e, t) {
  let r = (
    /** @type {Effect | null} */
    J
  );
  r === null && bf();
  var n = (
    /** @type {Promise<V>} */
    /** @type {unknown} */
    void 0
  ), a = xi(
    /** @type {V} */
    Xe
  ), o = !$, s = /* @__PURE__ */ new Map();
  return yu(() => {
    var v;
    var l = (
      /** @type {Effect} */
      J
    ), c = Xc();
    n = c.promise;
    try {
      Promise.resolve(i()).then(c.resolve, c.reject).finally(ko);
    } catch (g) {
      c.reject(g), ko();
    }
    var d = (
      /** @type {Batch} */
      G
    );
    if (o) {
      if (l.f & nn)
        var p = dd();
      if (
        /** @type {Boundary} */
        r.b.is_rendered()
      )
        (v = s.get(d)) == null || v.reject(Ur), s.delete(d);
      else {
        for (const g of s.values())
          g.reject(Ur);
        s.clear();
      }
      s.set(d, c);
    }
    const f = (g, u = void 0) => {
      if (p) {
        var m = u === Ur;
        p(m);
      }
      if (!(u === Ur || l.f & rr)) {
        if (d.activate(), u)
          a.f |= gi, Ln(a, u);
        else {
          a.f & gi && (a.f ^= gi), Ln(a, g);
          for (const [x, A] of s) {
            if (s.delete(x), x === d) break;
            A.reject(Ur);
          }
        }
        d.deactivate();
      }
    };
    c.promise.then(f, (g) => f(null, g || "unknown"));
  }), No(() => {
    for (const l of s.values())
      l.reject(Ur);
  }), new Promise((l) => {
    function c(d) {
      function p() {
        d === n ? l(a) : c(n);
      }
      d.then(p, p);
    }
    c(n);
  });
}
// @__NO_SIDE_EFFECTS__
function ou(i) {
  const e = /* @__PURE__ */ Da(i);
  return Md(e), e;
}
// @__NO_SIDE_EFFECTS__
function Al(i) {
  const e = /* @__PURE__ */ Da(i);
  return e.equals = ed, e;
}
function su(i) {
  var e = i.effects;
  if (e !== null) {
    i.effects = null;
    for (var t = 0; t < e.length; t += 1)
      $e(
        /** @type {Effect} */
        e[t]
      );
  }
}
function lu(i) {
  for (var e = i.parent; e !== null; ) {
    if (!(e.f & Ze))
      return e.f & rr ? null : (
        /** @type {Effect} */
        e
      );
    e = e.parent;
  }
  return null;
}
function Sl(i) {
  var e, t = J;
  Ot(lu(i));
  try {
    i.f &= ~en, su(i), e = Pd(i);
  } finally {
    Ot(t);
  }
  return e;
}
function pd(i) {
  var e = Sl(i);
  if (!i.equals(e) && (i.wv = Od(), (!(G != null && G.is_fork) || i.deps === null) && (i.v = e, i.deps === null))) {
    Ce(i, Fe);
    return;
  }
  yi || (Je !== null ? (zl() || G != null && G.is_fork) && Je.set(i, e) : wl(i));
}
function cu(i) {
  var e, t;
  if (i.effects !== null)
    for (const r of i.effects)
      (r.teardown || r.ac) && ((e = r.teardown) == null || e.call(r), (t = r.ac) == null || t.abort(Ur), r.teardown = ff, r.ac = null, Ta(r, 0), El(r));
}
function fd(i) {
  if (i.effects !== null)
    for (const e of i.effects)
      e.teardown && rn(e);
}
let Gs = /* @__PURE__ */ new Set();
const mi = /* @__PURE__ */ new Map();
let ud = !1;
function xi(i, e) {
  var t = {
    f: 0,
    // TODO ideally we could skip this altogether, but it causes type errors
    v: i,
    reactions: null,
    equals: $c,
    rv: 0,
    wv: 0
  };
  return t;
}
// @__NO_SIDE_EFFECTS__
function ai(i, e) {
  const t = xi(i);
  return Md(t), t;
}
// @__NO_SIDE_EFFECTS__
function ke(i, e = !1, t = !0) {
  var n;
  const r = xi(i);
  return e || (r.equals = ed), Kn && t && Se !== null && Se.l !== null && ((n = Se.l).s ?? (n.s = [])).push(r), r;
}
function C(i, e, t = !1) {
  $ !== null && // since we are untracking the function inside `$inspect.with` we need to add this check
  // to ensure we error if state is set inside an inspect effect
  (!gr || $.f & $l) && _a() && $.f & (Ze | Si | bl | $l) && (ir === null || !Vn.call(ir, i)) && Tf();
  let r = t ? yn(e) : e;
  return Ln(i, r, ho);
}
function Ln(i, e, t = null) {
  if (!i.equals(e)) {
    var r = i.v;
    yi ? mi.set(i, e) : mi.set(i, r), i.v = e;
    var n = tn.ensure();
    if (n.capture(i, r), i.f & Ze) {
      const a = (
        /** @type {Derived} */
        i
      );
      i.f & st && Sl(a), wl(a);
    }
    i.wv = Od(), hd(i, st, t), _a() && J !== null && J.f & Fe && !(J.f & (mr | Ji)) && (Ht === null ? Au([i]) : Ht.push(i)), !n.is_fork && Gs.size > 0 && !ud && du();
  }
  return e;
}
function du() {
  ud = !1;
  for (const i of Gs)
    i.f & Fe && Ce(i, nr), Hn(i) && rn(i);
  Gs.clear();
}
function rc(i, e = 1) {
  var t = h(i), r = e === 1 ? t++ : t--;
  return C(i, t), r;
}
function wa(i) {
  C(i, i.v + 1);
}
function hd(i, e, t) {
  var r = i.reactions;
  if (r !== null)
    for (var n = _a(), a = r.length, o = 0; o < a; o++) {
      var s = r[o], l = s.f;
      if (!(!n && s === J)) {
        var c = (l & st) === 0;
        if (c && Ce(s, e), l & Ze) {
          var d = (
            /** @type {Derived} */
            s
          );
          Je == null || Je.delete(d), l & en || (l & tr && (s.f |= en), hd(d, nr, t));
        } else if (c) {
          var p = (
            /** @type {Effect} */
            s
          );
          l & Si && pr !== null && pr.add(p), t !== null ? t.push(p) : kl(p);
        }
      }
    }
}
function yn(i) {
  if (typeof i != "object" || i === null || Pr in i)
    return i;
  const e = ml(i);
  if (e !== df && e !== pf)
    return i;
  var t = /* @__PURE__ */ new Map(), r = gl(i), n = /* @__PURE__ */ ai(0), a = Zi, o = (s) => {
    if (Zi === a)
      return s();
    var l = $, c = Zi;
    ar(null), sc(a);
    var d = s();
    return ar(l), sc(c), d;
  };
  return r && t.set("length", /* @__PURE__ */ ai(
    /** @type {any[]} */
    i.length
  )), new Proxy(
    /** @type {any} */
    i,
    {
      defineProperty(s, l, c) {
        (!("value" in c) || c.configurable === !1 || c.enumerable === !1 || c.writable === !1) && zf();
        var d = t.get(l);
        return d === void 0 ? o(() => {
          var p = /* @__PURE__ */ ai(c.value);
          return t.set(l, p), p;
        }) : C(d, c.value, !0), !0;
      },
      deleteProperty(s, l) {
        var c = t.get(l);
        if (c === void 0) {
          if (l in s) {
            const d = o(() => /* @__PURE__ */ ai(Xe));
            t.set(l, d), wa(n);
          }
        } else
          C(c, Xe), wa(n);
        return !0;
      },
      get(s, l, c) {
        var v;
        if (l === Pr)
          return i;
        var d = t.get(l), p = l in s;
        if (d === void 0 && (!p || (v = hi(s, l)) != null && v.writable) && (d = o(() => {
          var g = yn(p ? s[l] : Xe), u = /* @__PURE__ */ ai(g);
          return u;
        }), t.set(l, d)), d !== void 0) {
          var f = h(d);
          return f === Xe ? void 0 : f;
        }
        return Reflect.get(s, l, c);
      },
      getOwnPropertyDescriptor(s, l) {
        var c = Reflect.getOwnPropertyDescriptor(s, l);
        if (c && "value" in c) {
          var d = t.get(l);
          d && (c.value = h(d));
        } else if (c === void 0) {
          var p = t.get(l), f = p == null ? void 0 : p.v;
          if (p !== void 0 && f !== Xe)
            return {
              enumerable: !0,
              configurable: !0,
              value: f,
              writable: !0
            };
        }
        return c;
      },
      has(s, l) {
        var f;
        if (l === Pr)
          return !0;
        var c = t.get(l), d = c !== void 0 && c.v !== Xe || Reflect.has(s, l);
        if (c !== void 0 || J !== null && (!d || (f = hi(s, l)) != null && f.writable)) {
          c === void 0 && (c = o(() => {
            var v = d ? yn(s[l]) : Xe, g = /* @__PURE__ */ ai(v);
            return g;
          }), t.set(l, c));
          var p = h(c);
          if (p === Xe)
            return !1;
        }
        return d;
      },
      set(s, l, c, d) {
        var b;
        var p = t.get(l), f = l in s;
        if (r && l === "length")
          for (var v = c; v < /** @type {Source<number>} */
          p.v; v += 1) {
            var g = t.get(v + "");
            g !== void 0 ? C(g, Xe) : v in s && (g = o(() => /* @__PURE__ */ ai(Xe)), t.set(v + "", g));
          }
        if (p === void 0)
          (!f || (b = hi(s, l)) != null && b.writable) && (p = o(() => /* @__PURE__ */ ai(void 0)), C(p, yn(c)), t.set(l, p));
        else {
          f = p.v !== Xe;
          var u = o(() => yn(c));
          C(p, u);
        }
        var m = Reflect.getOwnPropertyDescriptor(s, l);
        if (m != null && m.set && m.set.call(d, c), !f) {
          if (r && typeof l == "string") {
            var x = (
              /** @type {Source<number>} */
              t.get("length")
            ), A = Number(l);
            Number.isInteger(A) && A >= x.v && C(x, A + 1);
          }
          wa(n);
        }
        return !0;
      },
      ownKeys(s) {
        h(n);
        var l = Reflect.ownKeys(s).filter((p) => {
          var f = t.get(p);
          return f === void 0 || f.v !== Xe;
        });
        for (var [c, d] of t)
          d.v !== Xe && !(c in s) && l.push(c);
        return l;
      },
      setPrototypeOf() {
        Ef();
      }
    }
  );
}
function ic(i) {
  try {
    if (i !== null && typeof i == "object" && Pr in i)
      return i[Pr];
  } catch {
  }
  return i;
}
function pu(i, e) {
  return Object.is(ic(i), ic(e));
}
var nc, gd, md, vd;
function fu() {
  if (nc === void 0) {
    nc = window, gd = /Firefox/.test(navigator.userAgent);
    var i = Element.prototype, e = Node.prototype, t = Text.prototype;
    md = hi(e, "firstChild").get, vd = hi(e, "nextSibling").get, Jl(i) && (i.__click = void 0, i.__className = void 0, i.__attributes = null, i.__style = void 0, i.__e = void 0), Jl(t) && (t.__t = void 0);
  }
}
function qr(i = "") {
  return document.createTextNode(i);
}
// @__NO_SIDE_EFFECTS__
function _n(i) {
  return (
    /** @type {TemplateNode | null} */
    md.call(i)
  );
}
// @__NO_SIDE_EFFECTS__
function Fa(i) {
  return (
    /** @type {TemplateNode | null} */
    vd.call(i)
  );
}
function k(i, e) {
  return /* @__PURE__ */ _n(i);
}
function ie(i, e = !1) {
  {
    var t = /* @__PURE__ */ _n(i);
    return t instanceof Comment && t.data === "" ? /* @__PURE__ */ Fa(t) : t;
  }
}
function S(i, e = 1, t = !1) {
  let r = i;
  for (; e--; )
    r = /** @type {TemplateNode} */
    /* @__PURE__ */ Fa(r);
  return r;
}
function uu(i) {
  i.textContent = "";
}
function bd() {
  return !1;
}
function xd(i, e, t) {
  return (
    /** @type {T extends keyof HTMLElementTagNameMap ? HTMLElementTagNameMap[T] : Element} */
    document.createElementNS(e ?? Jc, i, void 0)
  );
}
function hu(i, e) {
  if (e) {
    const t = document.body;
    i.autofocus = !0, Kr(() => {
      document.activeElement === t && i.focus();
    });
  }
}
let ac = !1;
function gu() {
  ac || (ac = !0, document.addEventListener(
    "reset",
    (i) => {
      Promise.resolve().then(() => {
        var e;
        if (!i.defaultPrevented)
          for (
            const t of
            /**@type {HTMLFormElement} */
            i.target.elements
          )
            (e = t.__on_r) == null || e.call(t);
      });
    },
    // In the capture phase to guarantee we get noticed of it (no possibility of stopPropagation)
    { capture: !0 }
  ));
}
function Vo(i) {
  var e = $, t = J;
  ar(null), Ot(null);
  try {
    return i();
  } finally {
    ar(e), Ot(t);
  }
}
function yd(i, e, t, r = t) {
  i.addEventListener(e, () => Vo(t));
  const n = i.__on_r;
  n ? i.__on_r = () => {
    n(), r(!0);
  } : i.__on_r = () => r(!0), gu();
}
function wd(i) {
  J === null && ($ === null && kf(), wf()), yi && yf();
}
function mu(i, e) {
  var t = e.last;
  t === null ? e.last = e.first = i : (t.next = i, i.prev = t, e.last = i);
}
function vr(i, e) {
  var t = J;
  t !== null && t.f & Ut && (i |= Ut);
  var r = {
    ctx: Se,
    deps: null,
    nodes: null,
    f: i | st | tr,
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
  }, n = r;
  if (i & Nn)
    xn !== null ? xn.push(r) : tn.ensure().schedule(r);
  else if (e !== null) {
    try {
      rn(r);
    } catch (o) {
      throw $e(r), o;
    }
    n.deps === null && n.teardown === null && n.nodes === null && n.first === n.last && // either `null`, or a singular child
    !(n.f & Zn) && (n = n.first, i & Si && i & $i && n !== null && (n.f |= $i));
  }
  if (n !== null && (n.parent = t, t !== null && mu(n, t), $ !== null && $.f & Ze && !(i & Ji))) {
    var a = (
      /** @type {Derived} */
      $
    );
    (a.effects ?? (a.effects = [])).push(n);
  }
  return r;
}
function zl() {
  return $ !== null && !gr;
}
function No(i) {
  const e = vr(La, null);
  return Ce(e, Fe), e.teardown = i, e;
}
function Xs(i) {
  wd();
  var e = (
    /** @type {Effect} */
    J.f
  ), t = !$ && (e & mr) !== 0 && (e & nn) === 0;
  if (t) {
    var r = (
      /** @type {ComponentContext} */
      Se
    );
    (r.e ?? (r.e = [])).push(i);
  } else
    return kd(i);
}
function kd(i) {
  return vr(Nn | Zc, i);
}
function vu(i) {
  return wd(), vr(La | Zc, i);
}
function bu(i) {
  tn.ensure();
  const e = vr(Ji | Zn, i);
  return (t = {}) => new Promise((r) => {
    t.outro ? Xi(e, () => {
      $e(e), r(void 0);
    }) : ($e(e), r(void 0));
  });
}
function Yo(i) {
  return vr(Nn, i);
}
function vs(i, e) {
  var t = (
    /** @type {ComponentContextLegacy} */
    Se
  ), r = { effect: null, ran: !1, deps: i };
  t.l.$.push(r), r.effect = ja(() => {
    if (i(), !r.ran) {
      r.ran = !0;
      var n = (
        /** @type {Effect} */
        J
      );
      try {
        Ot(n.parent), P(e);
      } finally {
        Ot(n);
      }
    }
  });
}
function xu() {
  var i = (
    /** @type {ComponentContextLegacy} */
    Se
  );
  ja(() => {
    for (var e of i.l.$) {
      e.deps();
      var t = e.effect;
      t.f & Fe && t.deps !== null && Ce(t, nr), Hn(t) && rn(t), e.ran = !1;
    }
  });
}
function yu(i) {
  return vr(bl | Zn, i);
}
function ja(i, e = 0) {
  return vr(La | e, i);
}
function se(i, e = [], t = [], r = []) {
  cd(r, e, t, (n) => {
    vr(La, () => i(...n.map(h)));
  });
}
function Lo(i, e = 0) {
  var t = vr(Si | e, i);
  return t;
}
function Ad(i, e = 0) {
  var t = vr(vl | e, i);
  return t;
}
function zt(i) {
  return vr(mr | Zn, i);
}
function Sd(i) {
  var e = i.teardown;
  if (e !== null) {
    const t = yi, r = $;
    oc(!0), ar(null);
    try {
      e.call(null);
    } finally {
      oc(t), ar(r);
    }
  }
}
function El(i, e = !1) {
  var t = i.first;
  for (i.first = i.last = null; t !== null; ) {
    const n = t.ac;
    n !== null && Vo(() => {
      n.abort(Ur);
    });
    var r = t.next;
    t.f & Ji ? t.parent = null : $e(t, e), t = r;
  }
}
function wu(i) {
  for (var e = i.first; e !== null; ) {
    var t = e.next;
    e.f & mr || $e(e), e = t;
  }
}
function $e(i, e = !0) {
  var t = !1;
  (e || i.f & gf) && i.nodes !== null && i.nodes.end !== null && (ku(
    i.nodes.start,
    /** @type {TemplateNode} */
    i.nodes.end
  ), t = !0), Ce(i, Ns), El(i, e && !t), Ta(i, 0);
  var r = i.nodes && i.nodes.t;
  if (r !== null)
    for (const a of r)
      a.stop();
  Sd(i), i.f ^= Ns, i.f |= rr;
  var n = i.parent;
  n !== null && n.first !== null && zd(i), i.next = i.prev = i.teardown = i.ctx = i.deps = i.fn = i.nodes = i.ac = null;
}
function ku(i, e) {
  for (; i !== null; ) {
    var t = i === e ? null : /* @__PURE__ */ Fa(i);
    i.remove(), i = t;
  }
}
function zd(i) {
  var e = i.parent, t = i.prev, r = i.next;
  t !== null && (t.next = r), r !== null && (r.prev = t), e !== null && (e.first === i && (e.first = r), e.last === i && (e.last = t));
}
function Xi(i, e, t = !0) {
  var r = [];
  Ed(i, r, !0);
  var n = () => {
    t && $e(i), e && e();
  }, a = r.length;
  if (a > 0) {
    var o = () => --a || n();
    for (var s of r)
      s.out(o);
  } else
    n();
}
function Ed(i, e, t) {
  if (!(i.f & Ut)) {
    i.f ^= Ut;
    var r = i.nodes && i.nodes.t;
    if (r !== null)
      for (const s of r)
        (s.is_global || t) && e.push(s);
    for (var n = i.first; n !== null; ) {
      var a = n.next, o = (n.f & $i) !== 0 || // If this is a branch effect without a block effect parent,
      // it means the parent block effect was pruned. In that case,
      // transparency information was transferred to the branch effect.
      (n.f & mr) !== 0 && (i.f & Si) !== 0;
      Ed(n, e, o ? t : !1), n = a;
    }
  }
}
function Tl(i) {
  Td(i, !0);
}
function Td(i, e) {
  if (i.f & Ut) {
    i.f ^= Ut, i.f & Fe || (Ce(i, st), tn.ensure().schedule(i));
    for (var t = i.first; t !== null; ) {
      var r = t.next, n = (t.f & $i) !== 0 || (t.f & mr) !== 0;
      Td(t, n ? e : !1), t = r;
    }
    var a = i.nodes && i.nodes.t;
    if (a !== null)
      for (const o of a)
        (o.is_global || e) && o.in();
  }
}
function Ml(i, e) {
  if (i.nodes)
    for (var t = i.nodes.start, r = i.nodes.end; t !== null; ) {
      var n = t === r ? null : /* @__PURE__ */ Fa(t);
      e.append(t), t = n;
    }
}
let vo = !1, yi = !1;
function oc(i) {
  yi = i;
}
let $ = null, gr = !1;
function ar(i) {
  $ = i;
}
let J = null;
function Ot(i) {
  J = i;
}
let ir = null;
function Md(i) {
  $ !== null && (ir === null ? ir = [i] : ir.push(i));
}
let St = null, Nt = 0, Ht = null;
function Au(i) {
  Ht = i;
}
let Id = 1, Di = 0, Zi = Di;
function sc(i) {
  Zi = i;
}
function Od() {
  return ++Id;
}
function Hn(i) {
  var e = i.f;
  if (e & st)
    return !0;
  if (e & Ze && (i.f &= ~en), e & nr) {
    for (var t = (
      /** @type {Value[]} */
      i.deps
    ), r = t.length, n = 0; n < r; n++) {
      var a = t[n];
      if (Hn(
        /** @type {Derived} */
        a
      ) && pd(
        /** @type {Derived} */
        a
      ), a.wv > i.wv)
        return !0;
    }
    e & tr && // During time traveling we don't want to reset the status so that
    // traversal of the graph in the other batches still happens
    Je === null && Ce(i, Fe);
  }
  return !1;
}
function Cd(i, e, t = !0) {
  var r = i.reactions;
  if (r !== null && !(ir !== null && Vn.call(ir, i)))
    for (var n = 0; n < r.length; n++) {
      var a = r[n];
      a.f & Ze ? Cd(
        /** @type {Derived} */
        a,
        e,
        !1
      ) : e === a && (t ? Ce(a, st) : a.f & Fe && Ce(a, nr), kl(
        /** @type {Effect} */
        a
      ));
    }
}
function Pd(i) {
  var u;
  var e = St, t = Nt, r = Ht, n = $, a = ir, o = Se, s = gr, l = Zi, c = i.f;
  St = /** @type {null | Value[]} */
  null, Nt = 0, Ht = null, $ = c & (mr | Ji) ? null : i, ir = null, Yn(i.ctx), gr = !1, Zi = ++Di, i.ac !== null && (Vo(() => {
    i.ac.abort(Ur);
  }), i.ac = null);
  try {
    i.f |= Ys;
    var d = (
      /** @type {Function} */
      i.fn
    ), p = d();
    i.f |= nn;
    var f = i.deps, v = G == null ? void 0 : G.is_fork;
    if (St !== null) {
      var g;
      if (v || Ta(i, Nt), f !== null && Nt > 0)
        for (f.length = Nt + St.length, g = 0; g < St.length; g++)
          f[Nt + g] = St[g];
      else
        i.deps = f = St;
      if (zl() && i.f & tr)
        for (g = Nt; g < f.length; g++)
          ((u = f[g]).reactions ?? (u.reactions = [])).push(i);
    } else !v && f !== null && Nt < f.length && (Ta(i, Nt), f.length = Nt);
    if (_a() && Ht !== null && !gr && f !== null && !(i.f & (Ze | nr | st)))
      for (g = 0; g < /** @type {Source[]} */
      Ht.length; g++)
        Cd(
          Ht[g],
          /** @type {Effect} */
          i
        );
    if (n !== null && n !== i) {
      if (Di++, n.deps !== null)
        for (let m = 0; m < t; m += 1)
          n.deps[m].rv = Di;
      if (e !== null)
        for (const m of e)
          m.rv = Di;
      Ht !== null && (r === null ? r = Ht : r.push(.../** @type {Source[]} */
      Ht));
    }
    return i.f & gi && (i.f ^= gi), p;
  } catch (m) {
    return rd(m);
  } finally {
    i.f ^= Ys, St = e, Nt = t, Ht = r, $ = n, ir = a, Yn(o), gr = s, Zi = l;
  }
}
function Su(i, e) {
  let t = e.reactions;
  if (t !== null) {
    var r = lf.call(t, i);
    if (r !== -1) {
      var n = t.length - 1;
      n === 0 ? t = e.reactions = null : (t[r] = t[n], t.pop());
    }
  }
  if (t === null && e.f & Ze && // Destroying a child effect while updating a parent effect can cause a dependency to appear
  // to be unused, when in fact it is used by the currently-updating parent. Checking `new_deps`
  // allows us to skip the expensive work of disconnecting and immediately reconnecting it
  (St === null || !Vn.call(St, e))) {
    var a = (
      /** @type {Derived} */
      e
    );
    a.f & tr && (a.f ^= tr, a.f &= ~en), wl(a), cu(a), Ta(a, 0);
  }
}
function Ta(i, e) {
  var t = i.deps;
  if (t !== null)
    for (var r = e; r < t.length; r++)
      Su(i, t[r]);
}
function rn(i) {
  var e = i.f;
  if (!(e & rr)) {
    Ce(i, Fe);
    var t = J, r = vo;
    J = i, vo = !0;
    try {
      e & (Si | vl) ? wu(i) : El(i), Sd(i);
      var n = Pd(i);
      i.teardown = typeof n == "function" ? n : null, i.wv = Id;
      var a;
    } finally {
      vo = r, J = t;
    }
  }
}
async function ma() {
  await Promise.resolve(), Hf();
}
function h(i) {
  var e = i.f, t = (e & Ze) !== 0;
  if ($ !== null && !gr) {
    var r = J !== null && (J.f & rr) !== 0;
    if (!r && (ir === null || !Vn.call(ir, i))) {
      var n = $.deps;
      if ($.f & Ys)
        i.rv < Di && (i.rv = Di, St === null && n !== null && n[Nt] === i ? Nt++ : St === null ? St = [i] : St.push(i));
      else {
        ($.deps ?? ($.deps = [])).push(i);
        var a = i.reactions;
        a === null ? i.reactions = [$] : Vn.call(a, $) || a.push($);
      }
    }
  }
  if (yi && mi.has(i))
    return mi.get(i);
  if (t) {
    var o = (
      /** @type {Derived} */
      i
    );
    if (yi) {
      var s = o.v;
      return (!(o.f & Fe) && o.reactions !== null || Rd(o)) && (s = Sl(o)), mi.set(o, s), s;
    }
    var l = (o.f & tr) === 0 && !gr && $ !== null && (vo || ($.f & tr) !== 0), c = (o.f & nn) === 0;
    Hn(o) && (l && (o.f |= tr), pd(o)), l && !c && (fd(o), qd(o));
  }
  if (Je != null && Je.has(i))
    return Je.get(i);
  if (i.f & gi)
    throw i.v;
  return i.v;
}
function qd(i) {
  if (i.f |= tr, i.deps !== null)
    for (const e of i.deps)
      (e.reactions ?? (e.reactions = [])).push(i), e.f & Ze && !(e.f & tr) && (fd(
        /** @type {Derived} */
        e
      ), qd(
        /** @type {Derived} */
        e
      ));
}
function Rd(i) {
  if (i.v === Xe) return !0;
  if (i.deps === null) return !1;
  for (const e of i.deps)
    if (mi.has(e) || e.f & Ze && Rd(
      /** @type {Derived} */
      e
    ))
      return !0;
  return !1;
}
function P(i) {
  var e = gr;
  try {
    return gr = !0, i();
  } finally {
    gr = e;
  }
}
function hr(i) {
  if (!(typeof i != "object" || !i || i instanceof EventTarget)) {
    if (Pr in i)
      Zs(i);
    else if (!Array.isArray(i))
      for (let e in i) {
        const t = i[e];
        typeof t == "object" && t && Pr in t && Zs(t);
      }
  }
}
function Zs(i, e = /* @__PURE__ */ new Set()) {
  if (typeof i == "object" && i !== null && // We don't want to traverse DOM elements
  !(i instanceof EventTarget) && !e.has(i)) {
    e.add(i), i instanceof Date && i.getTime();
    for (let r in i)
      try {
        Zs(i[r], e);
      } catch {
      }
    const t = ml(i);
    if (t !== Object.prototype && t !== Array.prototype && t !== Map.prototype && t !== Set.prototype && t !== Date.prototype) {
      const r = Gc(t);
      for (let n in r) {
        const a = r[n].get;
        if (a)
          try {
            a.call(i);
          } catch {
          }
      }
    }
  }
}
function zu(i) {
  return i.endsWith("capture") && i !== "gotpointercapture" && i !== "lostpointercapture";
}
const Eu = [
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
function Tu(i) {
  return Eu.includes(i);
}
const Mu = {
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
function Iu(i) {
  return i = i.toLowerCase(), Mu[i] ?? i;
}
const Ou = ["touchstart", "touchmove"];
function Cu(i) {
  return Ou.includes(i);
}
const Fi = Symbol("events"), Vd = /* @__PURE__ */ new Set(), Ks = /* @__PURE__ */ new Set();
function Nd(i, e, t, r = {}) {
  function n(a) {
    if (r.capture || Hs.call(e, a), !a.cancelBubble)
      return Vo(() => t == null ? void 0 : t.call(this, a));
  }
  return i.startsWith("pointer") || i.startsWith("touch") || i === "wheel" ? Kr(() => {
    e.addEventListener(i, n, r);
  }) : e.addEventListener(i, n, r), n;
}
function H(i, e, t, r, n) {
  var a = { capture: r, passive: n }, o = Nd(i, e, t, a);
  (e === document.body || // @ts-ignore
  e === window || // @ts-ignore
  e === document || // Firefox has quirky behavior, it can happen that we still get "canplay" events when the element is already removed
  e instanceof HTMLMediaElement) && No(() => {
    e.removeEventListener(i, o, a);
  });
}
function Pu(i, e, t) {
  (e[Fi] ?? (e[Fi] = {}))[i] = t;
}
function qu(i) {
  for (var e = 0; e < i.length; e++)
    Vd.add(i[e]);
  for (var t of Ks)
    t(i);
}
let lc = null;
function Hs(i) {
  var m, x;
  var e = this, t = (
    /** @type {Node} */
    e.ownerDocument
  ), r = i.type, n = ((m = i.composedPath) == null ? void 0 : m.call(i)) || [], a = (
    /** @type {null | Element} */
    n[0] || i.target
  );
  lc = i;
  var o = 0, s = lc === i && i[Fi];
  if (s) {
    var l = n.indexOf(s);
    if (l !== -1 && (e === document || e === /** @type {any} */
    window)) {
      i[Fi] = e;
      return;
    }
    var c = n.indexOf(e);
    if (c === -1)
      return;
    l <= c && (o = l);
  }
  if (a = /** @type {Element} */
  n[o] || i.target, a !== e) {
    cf(i, "currentTarget", {
      configurable: !0,
      get() {
        return a || t;
      }
    });
    var d = $, p = J;
    ar(null), Ot(null);
    try {
      for (var f, v = []; a !== null; ) {
        var g = a.assignedSlot || a.parentNode || /** @type {any} */
        a.host || null;
        try {
          var u = (x = a[Fi]) == null ? void 0 : x[r];
          u != null && (!/** @type {any} */
          a.disabled || // DOM could've been updated already by the time this is reached, so we check this as well
          // -> the target could not have been disabled because it emits the event in the first place
          i.target === a) && u.call(a, i);
        } catch (A) {
          f ? v.push(A) : f = A;
        }
        if (i.cancelBubble || g === e || g === null)
          break;
        a = g;
      }
      if (f) {
        for (let A of v)
          queueMicrotask(() => {
            throw A;
          });
        throw f;
      }
    } finally {
      i[Fi] = e, delete i.currentTarget, ar(d), Ot(p);
    }
  }
}
var Bc;
const bs = (
  // We gotta write it like this because after downleveling the pure comment may end up in the wrong location
  ((Bc = globalThis == null ? void 0 : globalThis.window) == null ? void 0 : Bc.trustedTypes) && /* @__PURE__ */ globalThis.window.trustedTypes.createPolicy("svelte-trusted-html", {
    /** @param {string} html */
    createHTML: (i) => i
  })
);
function Ru(i) {
  return (
    /** @type {string} */
    (bs == null ? void 0 : bs.createHTML(i)) ?? i
  );
}
function Yd(i) {
  var e = xd("template");
  return e.innerHTML = Ru(i.replaceAll("<!>", "<!---->")), e.content;
}
function Dn(i, e) {
  var t = (
    /** @type {Effect} */
    J
  );
  t.nodes === null && (t.nodes = { start: i, end: e, a: null, t: null });
}
// @__NO_SIDE_EFFECTS__
function U(i, e) {
  var t = (e & Yf) !== 0, r = (e & Lf) !== 0, n, a = !i.startsWith("<!>");
  return () => {
    n === void 0 && (n = Yd(a ? i : "<!>" + i), t || (n = /** @type {TemplateNode} */
    /* @__PURE__ */ _n(n)));
    var o = (
      /** @type {TemplateNode} */
      r || gd ? document.importNode(n, !0) : n.cloneNode(!0)
    );
    if (t) {
      var s = (
        /** @type {TemplateNode} */
        /* @__PURE__ */ _n(o)
      ), l = (
        /** @type {TemplateNode} */
        o.lastChild
      );
      Dn(s, l);
    } else
      Dn(o, o);
    return o;
  };
}
// @__NO_SIDE_EFFECTS__
function Vu(i, e, t = "svg") {
  var r = !i.startsWith("<!>"), n = `<${t}>${r ? i : "<!>" + i}</${t}>`, a;
  return () => {
    if (!a) {
      var o = (
        /** @type {DocumentFragment} */
        Yd(n)
      ), s = (
        /** @type {Element} */
        /* @__PURE__ */ _n(o)
      );
      a = /** @type {Element} */
      /* @__PURE__ */ _n(s);
    }
    var l = (
      /** @type {TemplateNode} */
      a.cloneNode(!0)
    );
    return Dn(l, l), l;
  };
}
// @__NO_SIDE_EFFECTS__
function Nu(i, e) {
  return /* @__PURE__ */ Vu(i, e, "svg");
}
function co(i = "") {
  {
    var e = qr(i + "");
    return Dn(e, e), e;
  }
}
function we() {
  var i = document.createDocumentFragment(), e = document.createComment(""), t = qr();
  return i.append(e, t), Dn(e, t), i;
}
function q(i, e) {
  i !== null && i.before(
    /** @type {Node} */
    e
  );
}
function B(i, e) {
  var t = e == null ? "" : typeof e == "object" ? `${e}` : e;
  t !== (i.__t ?? (i.__t = i.nodeValue)) && (i.__t = t, i.nodeValue = `${t}`);
}
function Yu(i, e) {
  return Lu(i, e);
}
const po = /* @__PURE__ */ new Map();
function Lu(i, { target: e, anchor: t, props: r = {}, events: n, context: a, intro: o = !0, transformError: s }) {
  fu();
  var l = void 0, c = bu(() => {
    var d = t ?? e.appendChild(qr());
    $f(
      /** @type {TemplateNode} */
      d,
      {
        pending: () => {
        }
      },
      (v) => {
        xl({});
        var g = (
          /** @type {ComponentContext} */
          Se
        );
        a && (g.c = a), n && (r.$$events = n), l = i(v, r) || {}, yl();
      },
      s
    );
    var p = /* @__PURE__ */ new Set(), f = (v) => {
      for (var g = 0; g < v.length; g++) {
        var u = v[g];
        if (!p.has(u)) {
          p.add(u);
          var m = Cu(u);
          for (const b of [e, document]) {
            var x = po.get(b);
            x === void 0 && (x = /* @__PURE__ */ new Map(), po.set(b, x));
            var A = x.get(u);
            A === void 0 ? (b.addEventListener(u, Hs, { passive: m }), x.set(u, 1)) : x.set(u, A + 1);
          }
        }
      }
    };
    return f(Ro(Vd)), Ks.add(f), () => {
      var m;
      for (var v of p)
        for (const x of [e, document]) {
          var g = (
            /** @type {Map<string, number>} */
            po.get(x)
          ), u = (
            /** @type {number} */
            g.get(v)
          );
          --u == 0 ? (x.removeEventListener(v, Hs), g.delete(v), g.size === 0 && po.delete(x)) : g.set(v, u);
        }
      Ks.delete(f), d !== t && ((m = d.parentNode) == null || m.removeChild(d));
    };
  });
  return _u.set(l, c), l;
}
let _u = /* @__PURE__ */ new WeakMap();
var ur, Mr, _t, Gi, Na, Ya, qo;
class Ld {
  /**
   * @param {TemplateNode} anchor
   * @param {boolean} transition
   */
  constructor(e, t = !0) {
    /** @type {TemplateNode} */
    cr(this, "anchor");
    /** @type {Map<Batch, Key>} */
    re(this, ur, /* @__PURE__ */ new Map());
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
    re(this, Mr, /* @__PURE__ */ new Map());
    /**
     * Similar to #onscreen with respect to the keys, but contains branches that are not yet
     * in the DOM, because their insertion is deferred.
     * @type {Map<Key, Branch>}
     */
    re(this, _t, /* @__PURE__ */ new Map());
    /**
     * Keys of effects that are currently outroing
     * @type {Set<Key>}
     */
    re(this, Gi, /* @__PURE__ */ new Set());
    /**
     * Whether to pause (i.e. outro) on change, or destroy immediately.
     * This is necessary for `<svelte:element>`
     */
    re(this, Na, !0);
    /**
     * @param {Batch} batch
     */
    re(this, Ya, (e) => {
      if (E(this, ur).has(e)) {
        var t = (
          /** @type {Key} */
          E(this, ur).get(e)
        ), r = E(this, Mr).get(t);
        if (r)
          Tl(r), E(this, Gi).delete(t);
        else {
          var n = E(this, _t).get(t);
          n && (E(this, Mr).set(t, n.effect), E(this, _t).delete(t), n.fragment.lastChild.remove(), this.anchor.before(n.fragment), r = n.effect);
        }
        for (const [a, o] of E(this, ur)) {
          if (E(this, ur).delete(a), a === e)
            break;
          const s = E(this, _t).get(o);
          s && ($e(s.effect), E(this, _t).delete(o));
        }
        for (const [a, o] of E(this, Mr)) {
          if (a === t || E(this, Gi).has(a)) continue;
          const s = () => {
            if (Array.from(E(this, ur).values()).includes(a)) {
              var c = document.createDocumentFragment();
              Ml(o, c), c.append(qr()), E(this, _t).set(a, { effect: o, fragment: c });
            } else
              $e(o);
            E(this, Gi).delete(a), E(this, Mr).delete(a);
          };
          E(this, Na) || !r ? (E(this, Gi).add(a), Xi(o, s, !1)) : s();
        }
      }
    });
    /**
     * @param {Batch} batch
     */
    re(this, qo, (e) => {
      E(this, ur).delete(e);
      const t = Array.from(E(this, ur).values());
      for (const [r, n] of E(this, _t))
        t.includes(r) || ($e(n.effect), E(this, _t).delete(r));
    });
    this.anchor = e, W(this, Na, t);
  }
  /**
   *
   * @param {any} key
   * @param {null | ((target: TemplateNode) => void)} fn
   */
  ensure(e, t) {
    var r = (
      /** @type {Batch} */
      G
    ), n = bd();
    if (t && !E(this, Mr).has(e) && !E(this, _t).has(e))
      if (n) {
        var a = document.createDocumentFragment(), o = qr();
        a.append(o), E(this, _t).set(e, {
          effect: zt(() => t(o)),
          fragment: a
        });
      } else
        E(this, Mr).set(
          e,
          zt(() => t(this.anchor))
        );
    if (E(this, ur).set(r, e), n) {
      for (const [s, l] of E(this, Mr))
        s === e ? r.unskip_effect(l) : r.skip_effect(l);
      for (const [s, l] of E(this, _t))
        s === e ? r.unskip_effect(l.effect) : r.skip_effect(l.effect);
      r.oncommit(E(this, Ya)), r.ondiscard(E(this, qo));
    } else
      E(this, Ya).call(this, r);
  }
}
ur = new WeakMap(), Mr = new WeakMap(), _t = new WeakMap(), Gi = new WeakMap(), Na = new WeakMap(), Ya = new WeakMap(), qo = new WeakMap();
function he(i, e, t = !1) {
  var r = new Ld(i), n = t ? $i : 0;
  function a(o, s) {
    r.ensure(o, s);
  }
  Lo(() => {
    var o = !1;
    e((s, l = 0) => {
      o = !0, a(l, s);
    }), o || a(-1, null);
  }, n);
}
function ht(i, e) {
  return e;
}
function Du(i, e, t) {
  for (var r = [], n = e.length, a, o = e.length, s = 0; s < n; s++) {
    let p = e[s];
    Xi(
      p,
      () => {
        if (a) {
          if (a.pending.delete(p), a.done.add(p), a.pending.size === 0) {
            var f = (
              /** @type {Set<EachOutroGroup>} */
              i.outrogroups
            );
            Qs(i, Ro(a.done)), f.delete(a), f.size === 0 && (i.outrogroups = null);
          }
        } else
          o -= 1;
      },
      !1
    );
  }
  if (o === 0) {
    var l = r.length === 0 && t !== null;
    if (l) {
      var c = (
        /** @type {Element} */
        t
      ), d = (
        /** @type {Element} */
        c.parentNode
      );
      uu(d), d.append(c), i.items.clear();
    }
    Qs(i, e, !l);
  } else
    a = {
      pending: new Set(e),
      done: /* @__PURE__ */ new Set()
    }, (i.outrogroups ?? (i.outrogroups = /* @__PURE__ */ new Set())).add(a);
}
function Qs(i, e, t = !0) {
  var r;
  if (i.pending.size > 0) {
    r = /* @__PURE__ */ new Set();
    for (const o of i.pending.values())
      for (const s of o)
        r.add(
          /** @type {EachItem} */
          i.items.get(s).e
        );
  }
  for (var n = 0; n < e.length; n++) {
    var a = e[n];
    if (r != null && r.has(a)) {
      a.f |= Or;
      const o = document.createDocumentFragment();
      Ml(a, o);
    } else
      $e(e[n], t);
  }
}
var cc;
function gt(i, e, t, r, n, a = null) {
  var o = i, s = /* @__PURE__ */ new Map(), l = (e & Qc) !== 0;
  if (l) {
    var c = (
      /** @type {Element} */
      i
    );
    o = c.appendChild(qr());
  }
  var d = null, p = /* @__PURE__ */ Al(() => {
    var b = t();
    return gl(b) ? b : b == null ? [] : Ro(b);
  }), f, v = /* @__PURE__ */ new Map(), g = !0;
  function u(b) {
    A.effect.f & rr || (A.pending.delete(b), A.fallback = d, Fu(A, f, o, e, r), d !== null && (f.length === 0 ? d.f & Or ? (d.f ^= Or, va(d, null, o)) : Tl(d) : Xi(d, () => {
      d = null;
    })));
  }
  function m(b) {
    A.pending.delete(b);
  }
  var x = Lo(() => {
    f = /** @type {V[]} */
    h(p);
    for (var b = f.length, w = /* @__PURE__ */ new Set(), y = (
      /** @type {Batch} */
      G
    ), T = bd(), M = 0; M < b; M += 1) {
      var I = f[M], z = r(I, M), N = g ? null : s.get(z);
      N ? (N.v && Ln(N.v, I), N.i && Ln(N.i, M), T && y.unskip_effect(N.e)) : (N = ju(
        s,
        g ? o : cc ?? (cc = qr()),
        I,
        z,
        M,
        n,
        e,
        t
      ), g || (N.e.f |= Or), s.set(z, N)), w.add(z);
    }
    if (b === 0 && a && !d && (g ? d = zt(() => a(o)) : (d = zt(() => a(cc ?? (cc = qr()))), d.f |= Or)), b > w.size && xf(), !g)
      if (v.set(y, w), T) {
        for (const [_, L] of s)
          w.has(_) || y.skip_effect(L.e);
        y.oncommit(u), y.ondiscard(m);
      } else
        u(y);
    h(p);
  }), A = { effect: x, items: s, pending: v, outrogroups: null, fallback: d };
  g = !1;
}
function ca(i) {
  for (; i !== null && !(i.f & mr); )
    i = i.next;
  return i;
}
function Fu(i, e, t, r, n) {
  var N, _, L, Q, oe, de, O, Y, V;
  var a = (r & Cf) !== 0, o = e.length, s = i.items, l = ca(i.effect.first), c, d = null, p, f = [], v = [], g, u, m, x;
  if (a)
    for (x = 0; x < o; x += 1)
      g = e[x], u = n(g, x), m = /** @type {EachItem} */
      s.get(u).e, m.f & Or || ((_ = (N = m.nodes) == null ? void 0 : N.a) == null || _.measure(), (p ?? (p = /* @__PURE__ */ new Set())).add(m));
  for (x = 0; x < o; x += 1) {
    if (g = e[x], u = n(g, x), m = /** @type {EachItem} */
    s.get(u).e, i.outrogroups !== null)
      for (const j of i.outrogroups)
        j.pending.delete(m), j.done.delete(m);
    if (m.f & Or)
      if (m.f ^= Or, m === l)
        va(m, null, t);
      else {
        var A = d ? d.next : l;
        m === i.effect.last && (i.effect.last = m.prev), m.prev && (m.prev.next = m.next), m.next && (m.next.prev = m.prev), oi(i, d, m), oi(i, m, A), va(m, A, t), d = m, f = [], v = [], l = ca(d.next);
        continue;
      }
    if (m.f & Ut && (Tl(m), a && ((Q = (L = m.nodes) == null ? void 0 : L.a) == null || Q.unfix(), (p ?? (p = /* @__PURE__ */ new Set())).delete(m))), m !== l) {
      if (c !== void 0 && c.has(m)) {
        if (f.length < v.length) {
          var b = v[0], w;
          d = b.prev;
          var y = f[0], T = f[f.length - 1];
          for (w = 0; w < f.length; w += 1)
            va(f[w], b, t);
          for (w = 0; w < v.length; w += 1)
            c.delete(v[w]);
          oi(i, y.prev, T.next), oi(i, d, y), oi(i, T, b), l = b, d = T, x -= 1, f = [], v = [];
        } else
          c.delete(m), va(m, l, t), oi(i, m.prev, m.next), oi(i, m, d === null ? i.effect.first : d.next), oi(i, d, m), d = m;
        continue;
      }
      for (f = [], v = []; l !== null && l !== m; )
        (c ?? (c = /* @__PURE__ */ new Set())).add(l), v.push(l), l = ca(l.next);
      if (l === null)
        continue;
    }
    m.f & Or || f.push(m), d = m, l = ca(m.next);
  }
  if (i.outrogroups !== null) {
    for (const j of i.outrogroups)
      j.pending.size === 0 && (Qs(i, Ro(j.done)), (oe = i.outrogroups) == null || oe.delete(j));
    i.outrogroups.size === 0 && (i.outrogroups = null);
  }
  if (l !== null || c !== void 0) {
    var M = [];
    if (c !== void 0)
      for (m of c)
        m.f & Ut || M.push(m);
    for (; l !== null; )
      !(l.f & Ut) && l !== i.fallback && M.push(l), l = ca(l.next);
    var I = M.length;
    if (I > 0) {
      var z = r & Qc && o === 0 ? t : null;
      if (a) {
        for (x = 0; x < I; x += 1)
          (O = (de = M[x].nodes) == null ? void 0 : de.a) == null || O.measure();
        for (x = 0; x < I; x += 1)
          (V = (Y = M[x].nodes) == null ? void 0 : Y.a) == null || V.fix();
      }
      Du(i, M, z);
    }
  }
  a && Kr(() => {
    var j, D;
    if (p !== void 0)
      for (m of p)
        (D = (j = m.nodes) == null ? void 0 : j.a) == null || D.apply();
  });
}
function ju(i, e, t, r, n, a, o, s) {
  var l = o & If ? o & Pf ? xi(t) : /* @__PURE__ */ ke(t, !1, !1) : null, c = o & Of ? xi(n) : null;
  return {
    v: l,
    i: c,
    e: zt(() => (a(e, l ?? t, c ?? n, s), () => {
      i.delete(r);
    }))
  };
}
function va(i, e, t) {
  if (i.nodes)
    for (var r = i.nodes.start, n = i.nodes.end, a = e && !(e.f & Or) ? (
      /** @type {EffectNodes} */
      e.nodes.start
    ) : t; r !== null; ) {
      var o = (
        /** @type {TemplateNode} */
        /* @__PURE__ */ Fa(r)
      );
      if (a.before(r), r === n)
        return;
      r = o;
    }
}
function oi(i, e, t) {
  e === null ? i.effect.first = t : e.next = t, t === null ? i.effect.last = e : t.prev = e;
}
function De(i, e, t, r, n) {
  var s;
  var a = (s = e.$$slots) == null ? void 0 : s[t], o = !1;
  a === !0 && (a = e.children, o = !0), a === void 0 || a(i, o ? () => r : r);
}
function Bu(i, e, t, r, n, a) {
  var o = null, s = (
    /** @type {TemplateNode} */
    i
  ), l = new Ld(s, !1);
  Lo(() => {
    const c = e() || null;
    var d = _f;
    if (c === null) {
      l.ensure(null, null);
      return;
    }
    return l.ensure(c, (p) => {
      if (c) {
        if (o = xd(c, d), Dn(o, o), r) {
          var f = o.appendChild(qr());
          r(o, f);
        }
        J.nodes.end = o, p.before(o);
      }
    }), () => {
    };
  }, $i), No(() => {
  });
}
function Uu(i, e) {
  var t = void 0, r;
  Ad(() => {
    t !== (t = e()) && (r && ($e(r), r = null), t && (r = zt(() => {
      Yo(() => (
        /** @type {(node: Element) => void} */
        t(i)
      ));
    })));
  });
}
function _d(i) {
  var e, t, r = "";
  if (typeof i == "string" || typeof i == "number") r += i;
  else if (typeof i == "object") if (Array.isArray(i)) {
    var n = i.length;
    for (e = 0; e < n; e++) i[e] && (t = _d(i[e])) && (r && (r += " "), r += t);
  } else for (t in i) i[t] && (r && (r += " "), r += t);
  return r;
}
function Gu() {
  for (var i, e, t = 0, r = "", n = arguments.length; t < n; t++) (i = arguments[t]) && (e = _d(i)) && (r && (r += " "), r += e);
  return r;
}
function Xu(i) {
  return typeof i == "object" ? Gu(i) : i ?? "";
}
const dc = [...` 	
\r\f \v\uFEFF`];
function Zu(i, e, t) {
  var r = i == null ? "" : "" + i;
  if (e && (r = r ? r + " " + e : e), t) {
    for (var n of Object.keys(t))
      if (t[n])
        r = r ? r + " " + n : n;
      else if (r.length)
        for (var a = n.length, o = 0; (o = r.indexOf(n, o)) >= 0; ) {
          var s = o + a;
          (o === 0 || dc.includes(r[o - 1])) && (s === r.length || dc.includes(r[s])) ? r = (o === 0 ? "" : r.substring(0, o)) + r.substring(s + 1) : o = s;
        }
  }
  return r === "" ? null : r;
}
function pc(i, e = !1) {
  var t = e ? " !important;" : ";", r = "";
  for (var n of Object.keys(i)) {
    var a = i[n];
    a != null && a !== "" && (r += " " + n + ": " + a + t);
  }
  return r;
}
function xs(i) {
  return i[0] !== "-" || i[1] !== "-" ? i.toLowerCase() : i;
}
function Ku(i, e) {
  if (e) {
    var t = "", r, n;
    if (Array.isArray(e) ? (r = e[0], n = e[1]) : r = e, i) {
      i = String(i).replaceAll(/\s*\/\*.*?\*\/\s*/g, "").trim();
      var a = !1, o = 0, s = !1, l = [];
      r && l.push(...Object.keys(r).map(xs)), n && l.push(...Object.keys(n).map(xs));
      var c = 0, d = -1;
      const u = i.length;
      for (var p = 0; p < u; p++) {
        var f = i[p];
        if (s ? f === "/" && i[p - 1] === "*" && (s = !1) : a ? a === f && (a = !1) : f === "/" && i[p + 1] === "*" ? s = !0 : f === '"' || f === "'" ? a = f : f === "(" ? o++ : f === ")" && o--, !s && a === !1 && o === 0) {
          if (f === ":" && d === -1)
            d = p;
          else if (f === ";" || p === u - 1) {
            if (d !== -1) {
              var v = xs(i.substring(c, d).trim());
              if (!l.includes(v)) {
                f !== ";" && p++;
                var g = i.substring(c, p).trim();
                t += " " + g + ";";
              }
            }
            c = p + 1, d = -1;
          }
        }
      }
    }
    return r && (t += pc(r)), n && (t += pc(n, !0)), t = t.trim(), t === "" ? null : t;
  }
  return i == null ? null : String(i);
}
function kt(i, e, t, r, n, a) {
  var o = i.__className;
  if (o !== t || o === void 0) {
    var s = Zu(t, r, a);
    s == null ? i.removeAttribute("class") : e ? i.className = s : i.setAttribute("class", s), i.__className = t;
  } else if (a && n !== a)
    for (var l in a) {
      var c = !!a[l];
      (n == null || c !== !!n[l]) && i.classList.toggle(l, c);
    }
  return a;
}
function ys(i, e = {}, t, r) {
  for (var n in t) {
    var a = t[n];
    e[n] !== a && (t[n] == null ? i.style.removeProperty(n) : i.style.setProperty(n, a, r));
  }
}
function Hu(i, e, t, r) {
  var n = i.__style;
  if (n !== e) {
    var a = Ku(e, r);
    a == null ? i.removeAttribute("style") : i.style.cssText = a, i.__style = e;
  } else r && (Array.isArray(r) ? (ys(i, t == null ? void 0 : t[0], r[0]), ys(i, t == null ? void 0 : t[1], r[1], "important")) : ys(i, t, r));
  return r;
}
function Ao(i, e, t = !1) {
  if (i.multiple) {
    if (e == null)
      return;
    if (!gl(e))
      return Ff();
    for (var r of i.options)
      r.selected = e.includes(ka(r));
    return;
  }
  for (r of i.options) {
    var n = ka(r);
    if (pu(n, e)) {
      r.selected = !0;
      return;
    }
  }
  (!t || e !== void 0) && (i.selectedIndex = -1);
}
function Dd(i) {
  var e = new MutationObserver(() => {
    Ao(i, i.__value);
  });
  e.observe(i, {
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
    e.disconnect();
  });
}
function fc(i, e, t = e) {
  var r = /* @__PURE__ */ new WeakSet(), n = !0;
  yd(i, "change", (a) => {
    var o = a ? "[selected]" : ":checked", s;
    if (i.multiple)
      s = [].map.call(i.querySelectorAll(o), ka);
    else {
      var l = i.querySelector(o) ?? // will fall back to first non-disabled option if no option is selected
      i.querySelector("option:not([disabled])");
      s = l && ka(l);
    }
    t(s), G !== null && r.add(G);
  }), Yo(() => {
    var a = e();
    if (i === document.activeElement) {
      var o = (
        /** @type {Batch} */
        G
      );
      if (r.has(o))
        return;
    }
    if (Ao(i, a, n), n && a === void 0) {
      var s = i.querySelector(":checked");
      s !== null && (a = ka(s), t(a));
    }
    i.__value = a, n = !1;
  }), Dd(i);
}
function ka(i) {
  return "__value" in i ? i.__value : i.value;
}
const da = Symbol("class"), pa = Symbol("style"), Fd = Symbol("is custom element"), jd = Symbol("is html"), Qu = Hc ? "option" : "OPTION", Wu = Hc ? "select" : "SELECT";
function Ju(i, e) {
  e ? i.hasAttribute("selected") || i.setAttribute("selected", "") : i.removeAttribute("selected");
}
function Yt(i, e, t, r) {
  var n = Bd(i);
  n[e] !== (n[e] = t) && (e === "loading" && (i[mf] = t), t == null ? i.removeAttribute(e) : typeof t != "string" && Ud(i).includes(e) ? i[e] = t : i.setAttribute(e, t));
}
function $u(i, e, t, r, n = !1, a = !1) {
  var o = Bd(i), s = o[Fd], l = !o[jd], c = e || {}, d = i.nodeName === Qu;
  for (var p in e)
    p in t || (t[p] = null);
  t.class ? t.class = Xu(t.class) : t[da] && (t.class = null), t[pa] && (t.style ?? (t.style = null));
  var f = Ud(i);
  for (const w in t) {
    let y = t[w];
    if (d && w === "value" && y == null) {
      i.value = i.__value = "", c[w] = y;
      continue;
    }
    if (w === "class") {
      var v = i.namespaceURI === "http://www.w3.org/1999/xhtml";
      kt(i, v, y, r, e == null ? void 0 : e[da], t[da]), c[w] = y, c[da] = t[da];
      continue;
    }
    if (w === "style") {
      Hu(i, y, e == null ? void 0 : e[pa], t[pa]), c[w] = y, c[pa] = t[pa];
      continue;
    }
    var g = c[w];
    if (!(y === g && !(y === void 0 && i.hasAttribute(w)))) {
      c[w] = y;
      var u = w[0] + w[1];
      if (u !== "$$")
        if (u === "on") {
          const T = {}, M = "$$" + w;
          let I = w.slice(2);
          var m = Tu(I);
          if (zu(I) && (I = I.slice(0, -7), T.capture = !0), !m && g) {
            if (y != null) continue;
            i.removeEventListener(I, c[M], T), c[M] = null;
          }
          if (m)
            Pu(I, i, y), qu([I]);
          else if (y != null) {
            let z = function(N) {
              c[w].call(this, N);
            };
            var b = z;
            c[M] = Nd(I, i, z, T);
          }
        } else if (w === "style")
          Yt(i, w, y);
        else if (w === "autofocus")
          hu(
            /** @type {HTMLElement} */
            i,
            !!y
          );
        else if (!s && (w === "__value" || w === "value" && y != null))
          i.value = i.__value = y;
        else if (w === "selected" && d)
          Ju(
            /** @type {HTMLOptionElement} */
            i,
            y
          );
        else {
          var x = w;
          l || (x = Iu(x));
          var A = x === "defaultValue" || x === "defaultChecked";
          if (y == null && !s && !A)
            if (o[w] = null, x === "value" || x === "checked") {
              let T = (
                /** @type {HTMLInputElement} */
                i
              );
              const M = e === void 0;
              if (x === "value") {
                let I = T.defaultValue;
                T.removeAttribute(x), T.defaultValue = I, T.value = T.__value = M ? I : null;
              } else {
                let I = T.defaultChecked;
                T.removeAttribute(x), T.defaultChecked = I, T.checked = M ? I : !1;
              }
            } else
              i.removeAttribute(w);
          else A || f.includes(x) && (s || typeof y != "string") ? (i[x] = y, x in o && (o[x] = Xe)) : typeof y != "function" && Yt(i, x, y);
        }
    }
  }
  return c;
}
function uc(i, e, t = [], r = [], n = [], a, o = !1, s = !1) {
  cd(n, t, r, (l) => {
    var c = void 0, d = {}, p = i.nodeName === Wu, f = !1;
    if (Ad(() => {
      var g = e(...l.map(h)), u = $u(
        i,
        c,
        g,
        a,
        o,
        s
      );
      f && p && "value" in g && Ao(
        /** @type {HTMLSelectElement} */
        i,
        g.value
      );
      for (let x of Object.getOwnPropertySymbols(d))
        g[x] || $e(d[x]);
      for (let x of Object.getOwnPropertySymbols(g)) {
        var m = g[x];
        x.description === Df && (!c || m !== c[x]) && (d[x] && $e(d[x]), d[x] = zt(() => Uu(i, () => m))), u[x] = m;
      }
      c = u;
    }), p) {
      var v = (
        /** @type {HTMLSelectElement} */
        i
      );
      Yo(() => {
        Ao(
          v,
          /** @type {Record<string | symbol, any>} */
          c.value,
          !0
        ), Dd(v);
      });
    }
    f = !0;
  });
}
function Bd(i) {
  return (
    /** @type {Record<string | symbol, unknown>} **/
    // @ts-expect-error
    i.__attributes ?? (i.__attributes = {
      [Fd]: i.nodeName.includes("-"),
      [jd]: i.namespaceURI === Jc
    })
  );
}
var hc = /* @__PURE__ */ new Map();
function Ud(i) {
  var e = i.getAttribute("is") || i.nodeName, t = hc.get(e);
  if (t) return t;
  hc.set(e, t = []);
  for (var r, n = i, a = Element.prototype; a !== n; ) {
    r = Gc(n);
    for (var o in r)
      r[o].set && t.push(o);
    n = ml(n);
  }
  return t;
}
function eh(i, e, t = e) {
  var r = /* @__PURE__ */ new WeakSet();
  yd(i, "input", async (n) => {
    var a = n ? i.defaultValue : i.value;
    if (a = ws(i) ? ks(a) : a, t(a), G !== null && r.add(G), await ma(), a !== (a = e())) {
      var o = i.selectionStart, s = i.selectionEnd, l = i.value.length;
      if (i.value = a ?? "", s !== null) {
        var c = i.value.length;
        o === s && s === l && c > l ? (i.selectionStart = c, i.selectionEnd = c) : (i.selectionStart = o, i.selectionEnd = Math.min(s, c));
      }
    }
  }), // If we are hydrating and the value has since changed,
  // then use the updated value from the input instead.
  // If defaultValue is set, then value == defaultValue
  // TODO Svelte 6: remove input.value check and set to empty string?
  P(e) == null && i.value && (t(ws(i) ? ks(i.value) : i.value), G !== null && r.add(G)), ja(() => {
    var n = e();
    if (i === document.activeElement) {
      var a = (
        /** @type {Batch} */
        G
      );
      if (r.has(a))
        return;
    }
    ws(i) && n === ks(i.value) || i.type === "date" && !n && !i.value || n !== i.value && (i.value = n ?? "");
  });
}
function ws(i) {
  var e = i.type;
  return e === "number" || e === "range";
}
function ks(i) {
  return i === "" ? null : +i;
}
function gc(i, e) {
  return i === e || (i == null ? void 0 : i[Pr]) === e;
}
function th(i = {}, e, t, r) {
  var n = (
    /** @type {ComponentContext} */
    Se.r
  ), a = (
    /** @type {Effect} */
    J
  );
  return Yo(() => {
    var o, s;
    return ja(() => {
      o = s, s = [], P(() => {
        i !== t(...s) && (e(i, ...s), o && gc(t(...o), i) && e(null, ...o));
      });
    }), () => {
      let l = a;
      for (; l !== n && l.parent !== null && l.parent.f & Ns; )
        l = l.parent;
      const c = () => {
        s && gc(t(...s), i) && e(null, ...s);
      }, d = l.teardown;
      l.teardown = () => {
        c(), d == null || d();
      };
    };
  }), i;
}
function rh(i) {
  return function(...e) {
    var t = (
      /** @type {Event} */
      e[0]
    );
    return t.preventDefault(), i == null ? void 0 : i.apply(this, e);
  };
}
function Gd(i = !1) {
  const e = (
    /** @type {ComponentContextLegacy} */
    Se
  ), t = e.l.u;
  if (!t) return;
  let r = () => hr(e.s);
  if (i) {
    let n = 0, a = (
      /** @type {Record<string, any>} */
      {}
    );
    const o = /* @__PURE__ */ Da(() => {
      let s = !1;
      const l = e.s;
      for (const c in l)
        l[c] !== a[c] && (a[c] = l[c], s = !0);
      return s && n++, n;
    });
    r = () => h(o);
  }
  t.b.length && vu(() => {
    mc(e, r), Rs(t.b);
  }), Xs(() => {
    const n = P(() => t.m.map(uf));
    return () => {
      for (const a of n)
        typeof a == "function" && a();
    };
  }), t.a.length && Xs(() => {
    mc(e, r), Rs(t.a);
  });
}
function mc(i, e) {
  if (i.l.s)
    for (const t of i.l.s) h(t);
  e();
}
const ih = {
  get(i, e) {
    if (!i.exclude.includes(e))
      return h(i.version), e in i.special ? i.special[e]() : i.props[e];
  },
  set(i, e, t) {
    if (!(e in i.special)) {
      var r = J;
      try {
        Ot(i.parent_effect), i.special[e] = Jt(
          {
            get [e]() {
              return i.props[e];
            }
          },
          /** @type {string} */
          e,
          Wc
        );
      } finally {
        Ot(r);
      }
    }
    return i.special[e](t), rc(i.version), !0;
  },
  getOwnPropertyDescriptor(i, e) {
    if (!i.exclude.includes(e) && e in i.props)
      return {
        enumerable: !0,
        configurable: !0,
        value: i.props[e]
      };
  },
  deleteProperty(i, e) {
    return i.exclude.includes(e) || (i.exclude.push(e), rc(i.version)), !0;
  },
  has(i, e) {
    return i.exclude.includes(e) ? !1 : e in i.props;
  },
  ownKeys(i) {
    return Reflect.ownKeys(i.props).filter((e) => !i.exclude.includes(e));
  }
};
function Ne(i, e) {
  return new Proxy(
    {
      props: i,
      exclude: e,
      special: {},
      version: xi(0),
      // TODO this is only necessary because we need to track component
      // destruction inside `prop`, because of `bind:this`, but it
      // seems likely that we can simplify `bind:this` instead
      parent_effect: (
        /** @type {Effect} */
        J
      )
    },
    ih
  );
}
const nh = {
  get(i, e) {
    let t = i.props.length;
    for (; t--; ) {
      let r = i.props[t];
      if (sa(r) && (r = r()), typeof r == "object" && r !== null && e in r) return r[e];
    }
  },
  set(i, e, t) {
    let r = i.props.length;
    for (; r--; ) {
      let n = i.props[r];
      sa(n) && (n = n());
      const a = hi(n, e);
      if (a && a.set)
        return a.set(t), !0;
    }
    return !1;
  },
  getOwnPropertyDescriptor(i, e) {
    let t = i.props.length;
    for (; t--; ) {
      let r = i.props[t];
      if (sa(r) && (r = r()), typeof r == "object" && r !== null && e in r) {
        const n = hi(r, e);
        return n && !n.configurable && (n.configurable = !0), n;
      }
    }
  },
  has(i, e) {
    if (e === Pr || e === Kc) return !1;
    for (let t of i.props)
      if (sa(t) && (t = t()), t != null && e in t) return !0;
    return !1;
  },
  ownKeys(i) {
    const e = [];
    for (let t of i.props)
      if (sa(t) && (t = t()), !!t) {
        for (const r in t)
          e.includes(r) || e.push(r);
        for (const r of Object.getOwnPropertySymbols(t))
          e.includes(r) || e.push(r);
      }
    return e;
  }
};
function Be(...i) {
  return new Proxy({ props: i }, nh);
}
function Jt(i, e, t, r) {
  var b;
  var n = !Kn || (t & Rf) !== 0, a = (t & Vf) !== 0, o = (t & Nf) !== 0, s = (
    /** @type {V} */
    r
  ), l = !0, c = () => (l && (l = !1, s = o ? P(
    /** @type {() => V} */
    r
  ) : (
    /** @type {V} */
    r
  )), s);
  let d;
  if (a) {
    var p = Pr in i || Kc in i;
    d = ((b = hi(i, e)) == null ? void 0 : b.set) ?? (p && e in i ? (w) => i[e] = w : void 0);
  }
  var f, v = !1;
  a ? [f, v] = Zf(() => (
    /** @type {V} */
    i[e]
  )) : f = /** @type {V} */
  i[e], f === void 0 && r !== void 0 && (f = c(), d && (n && Sf(), d(f)));
  var g;
  if (n ? g = () => {
    var w = (
      /** @type {V} */
      i[e]
    );
    return w === void 0 ? c() : (l = !0, w);
  } : g = () => {
    var w = (
      /** @type {V} */
      i[e]
    );
    return w !== void 0 && (s = /** @type {V} */
    void 0), w === void 0 ? s : w;
  }, n && !(t & Wc))
    return g;
  if (d) {
    var u = i.$$legacy;
    return (
      /** @type {() => V} */
      function(w, y) {
        return arguments.length > 0 ? ((!n || !y || u || v) && d(y ? g() : w), w) : g();
      }
    );
  }
  var m = !1, x = (t & qf ? Da : Al)(() => (m = !1, g()));
  a && h(x);
  var A = (
    /** @type {Effect} */
    J
  );
  return (
    /** @type {() => V} */
    function(w, y) {
      if (arguments.length > 0) {
        const T = y ? h(x) : n && a ? yn(w) : w;
        return C(x, T), m = !0, s !== void 0 && (s = T), w;
      }
      return yi && m || A.f & rr ? x.v : h(x);
    }
  );
}
function ah(i) {
  Se === null && vf(), Kn && Se.l !== null ? oh(Se).m.push(i) : Xs(() => {
    const e = P(i);
    if (typeof e == "function") return (
      /** @type {() => void} */
      e
    );
  });
}
function oh(i) {
  var e = (
    /** @type {ComponentContextLegacy} */
    i.l
  );
  return e.u ?? (e.u = { a: [], b: [], m: [] });
}
const sh = "5";
var Uc;
typeof window < "u" && ((Uc = window.__svelte ?? (window.__svelte = {})).v ?? (Uc.v = /* @__PURE__ */ new Set())).add(sh);
Uf();
function Br(i) {
  if (i === void 0)
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return i;
}
function Xd(i, e) {
  i.prototype = Object.create(e.prototype), i.prototype.constructor = i, i.__proto__ = e;
}
/*!
 * GSAP 3.14.2
 * https://gsap.com
 *
 * @license Copyright 2008-2025, GreenSock. All rights reserved.
 * Subject to the terms at https://gsap.com/standard-license
 * @author: Jack Doyle, jack@greensock.com
*/
var Gt = {
  autoSleep: 120,
  force3D: "auto",
  nullTargetWarn: 1,
  units: {
    lineHeight: ""
  }
}, Fn = {
  duration: 0.5,
  overwrite: !1,
  delay: 0
}, Il, et, Ae, $t = 1e8, xe = 1 / $t, Ws = Math.PI * 2, lh = Ws / 4, ch = 0, Zd = Math.sqrt, dh = Math.cos, ph = Math.sin, Ke = function(e) {
  return typeof e == "string";
}, Pe = function(e) {
  return typeof e == "function";
}, Hr = function(e) {
  return typeof e == "number";
}, Ol = function(e) {
  return typeof e > "u";
}, Rr = function(e) {
  return typeof e == "object";
}, Et = function(e) {
  return e !== !1;
}, Cl = function() {
  return typeof window < "u";
}, fo = function(e) {
  return Pe(e) || Ke(e);
}, Kd = typeof ArrayBuffer == "function" && ArrayBuffer.isView || function() {
}, ot = Array.isArray, fh = /random\([^)]+\)/g, uh = /,\s*/g, vc = /(?:-?\.?\d|\.)+/gi, Hd = /[-+=.]*\d+[.e\-+]*\d*[e\-+]*\d*/g, wn = /[-+=.]*\d+[.e-]*\d*[a-z%]*/g, As = /[-+=.]*\d+\.?\d*(?:e-|e\+)?\d*/gi, Qd = /[+-]=-?[.\d]+/, hh = /[^,'"\[\]\s]+/gi, gh = /^[+\-=e\s\d]*\d+[.\d]*([a-z]*|%)\s*$/i, Te, Sr, Js, Pl, Xt = {}, So = {}, Wd, Jd = function(e) {
  return (So = jn(e, Xt)) && Ct;
}, ql = function(e, t) {
  return console.warn("Invalid property", e, "set to", t, "Missing plugin? gsap.registerPlugin()");
}, Ma = function(e, t) {
  return !t && console.warn(e);
}, $d = function(e, t) {
  return e && (Xt[e] = t) && So && (So[e] = t) || Xt;
}, Ia = function() {
  return 0;
}, mh = {
  suppressEvents: !0,
  isStart: !0,
  kill: !1
}, bo = {
  suppressEvents: !0,
  kill: !1
}, vh = {
  suppressEvents: !0
}, Rl = {}, vi = [], $s = {}, ep, Dt = {}, Ss = {}, bc = 30, xo = [], Vl = "", Nl = function(e) {
  var t = e[0], r, n;
  if (Rr(t) || Pe(t) || (e = [e]), !(r = (t._gsap || {}).harness)) {
    for (n = xo.length; n-- && !xo[n].targetTest(t); )
      ;
    r = xo[n];
  }
  for (n = e.length; n--; )
    e[n] && (e[n]._gsap || (e[n]._gsap = new Sp(e[n], r))) || e.splice(n, 1);
  return e;
}, Ki = function(e) {
  return e._gsap || Nl(er(e))[0]._gsap;
}, tp = function(e, t, r) {
  return (r = e[t]) && Pe(r) ? e[t]() : Ol(r) && e.getAttribute && e.getAttribute(t) || r;
}, Tt = function(e, t) {
  return (e = e.split(",")).forEach(t) || e;
}, Ve = function(e) {
  return Math.round(e * 1e5) / 1e5 || 0;
}, Ee = function(e) {
  return Math.round(e * 1e7) / 1e7 || 0;
}, An = function(e, t) {
  var r = t.charAt(0), n = parseFloat(t.substr(2));
  return e = parseFloat(e), r === "+" ? e + n : r === "-" ? e - n : r === "*" ? e * n : e / n;
}, bh = function(e, t) {
  for (var r = t.length, n = 0; e.indexOf(t[n]) < 0 && ++n < r; )
    ;
  return n < r;
}, zo = function() {
  var e = vi.length, t = vi.slice(0), r, n;
  for ($s = {}, vi.length = 0, r = 0; r < e; r++)
    n = t[r], n && n._lazy && (n.render(n._lazy[0], n._lazy[1], !0)._lazy = 0);
}, Yl = function(e) {
  return !!(e._initted || e._startAt || e.add);
}, rp = function(e, t, r, n) {
  vi.length && !et && zo(), e.render(t, r, !!(et && t < 0 && Yl(e))), vi.length && !et && zo();
}, ip = function(e) {
  var t = parseFloat(e);
  return (t || t === 0) && (e + "").match(hh).length < 2 ? t : Ke(e) ? e.trim() : e;
}, np = function(e) {
  return e;
}, Zt = function(e, t) {
  for (var r in t)
    r in e || (e[r] = t[r]);
  return e;
}, xh = function(e) {
  return function(t, r) {
    for (var n in r)
      n in t || n === "duration" && e || n === "ease" || (t[n] = r[n]);
  };
}, jn = function(e, t) {
  for (var r in t)
    e[r] = t[r];
  return e;
}, xc = function i(e, t) {
  for (var r in t)
    r !== "__proto__" && r !== "constructor" && r !== "prototype" && (e[r] = Rr(t[r]) ? i(e[r] || (e[r] = {}), t[r]) : t[r]);
  return e;
}, Eo = function(e, t) {
  var r = {}, n;
  for (n in e)
    n in t || (r[n] = e[n]);
  return r;
}, Aa = function(e) {
  var t = e.parent || Te, r = e.keyframes ? xh(ot(e.keyframes)) : Zt;
  if (Et(e.inherit))
    for (; t; )
      r(e, t.vars.defaults), t = t.parent || t._dp;
  return e;
}, yh = function(e, t) {
  for (var r = e.length, n = r === t.length; n && r-- && e[r] === t[r]; )
    ;
  return r < 0;
}, ap = function(e, t, r, n, a) {
  var o = e[n], s;
  if (a)
    for (s = t[a]; o && o[a] > s; )
      o = o._prev;
  return o ? (t._next = o._next, o._next = t) : (t._next = e[r], e[r] = t), t._next ? t._next._prev = t : e[n] = t, t._prev = o, t.parent = t._dp = e, t;
}, _o = function(e, t, r, n) {
  r === void 0 && (r = "_first"), n === void 0 && (n = "_last");
  var a = t._prev, o = t._next;
  a ? a._next = o : e[r] === t && (e[r] = o), o ? o._prev = a : e[n] === t && (e[n] = a), t._next = t._prev = t.parent = null;
}, wi = function(e, t) {
  e.parent && (!t || e.parent.autoRemoveChildren) && e.parent.remove && e.parent.remove(e), e._act = 0;
}, Hi = function(e, t) {
  if (e && (!t || t._end > e._dur || t._start < 0))
    for (var r = e; r; )
      r._dirty = 1, r = r.parent;
  return e;
}, wh = function(e) {
  for (var t = e.parent; t && t.parent; )
    t._dirty = 1, t.totalDuration(), t = t.parent;
  return e;
}, el = function(e, t, r, n) {
  return e._startAt && (et ? e._startAt.revert(bo) : e.vars.immediateRender && !e.vars.autoRevert || e._startAt.render(t, !0, n));
}, kh = function i(e) {
  return !e || e._ts && i(e.parent);
}, yc = function(e) {
  return e._repeat ? Bn(e._tTime, e = e.duration() + e._rDelay) * e : 0;
}, Bn = function(e, t) {
  var r = Math.floor(e = Ee(e / t));
  return e && r === e ? r - 1 : r;
}, To = function(e, t) {
  return (e - t._start) * t._ts + (t._ts >= 0 ? 0 : t._dirty ? t.totalDuration() : t._tDur);
}, Do = function(e) {
  return e._end = Ee(e._start + (e._tDur / Math.abs(e._ts || e._rts || xe) || 0));
}, Fo = function(e, t) {
  var r = e._dp;
  return r && r.smoothChildTiming && e._ts && (e._start = Ee(r._time - (e._ts > 0 ? t / e._ts : ((e._dirty ? e.totalDuration() : e._tDur) - t) / -e._ts)), Do(e), r._dirty || Hi(r, e)), e;
}, op = function(e, t) {
  var r;
  if ((t._time || !t._dur && t._initted || t._start < e._time && (t._dur || !t.add)) && (r = To(e.rawTime(), t), (!t._dur || Ba(0, t.totalDuration(), r) - t._tTime > xe) && t.render(r, !0)), Hi(e, t)._dp && e._initted && e._time >= e._dur && e._ts) {
    if (e._dur < e.duration())
      for (r = e; r._dp; )
        r.rawTime() >= 0 && r.totalTime(r._tTime), r = r._dp;
    e._zTime = -xe;
  }
}, Ir = function(e, t, r, n) {
  return t.parent && wi(t), t._start = Ee((Hr(r) ? r : r || e !== Te ? Kt(e, r, t) : e._time) + t._delay), t._end = Ee(t._start + (t.totalDuration() / Math.abs(t.timeScale()) || 0)), ap(e, t, "_first", "_last", e._sort ? "_start" : 0), tl(t) || (e._recent = t), n || op(e, t), e._ts < 0 && Fo(e, e._tTime), e;
}, sp = function(e, t) {
  return (Xt.ScrollTrigger || ql("scrollTrigger", t)) && Xt.ScrollTrigger.create(t, e);
}, lp = function(e, t, r, n, a) {
  if (_l(e, t, a), !e._initted)
    return 1;
  if (!r && e._pt && !et && (e._dur && e.vars.lazy !== !1 || !e._dur && e.vars.lazy) && ep !== Ft.frame)
    return vi.push(e), e._lazy = [a, n], 1;
}, Ah = function i(e) {
  var t = e.parent;
  return t && t._ts && t._initted && !t._lock && (t.rawTime() < 0 || i(t));
}, tl = function(e) {
  var t = e.data;
  return t === "isFromStart" || t === "isStart";
}, Sh = function(e, t, r, n) {
  var a = e.ratio, o = t < 0 || !t && (!e._start && Ah(e) && !(!e._initted && tl(e)) || (e._ts < 0 || e._dp._ts < 0) && !tl(e)) ? 0 : 1, s = e._rDelay, l = 0, c, d, p;
  if (s && e._repeat && (l = Ba(0, e._tDur, t), d = Bn(l, s), e._yoyo && d & 1 && (o = 1 - o), d !== Bn(e._tTime, s) && (a = 1 - o, e.vars.repeatRefresh && e._initted && e.invalidate())), o !== a || et || n || e._zTime === xe || !t && e._zTime) {
    if (!e._initted && lp(e, t, n, r, l))
      return;
    for (p = e._zTime, e._zTime = t || (r ? xe : 0), r || (r = t && !p), e.ratio = o, e._from && (o = 1 - o), e._time = 0, e._tTime = l, c = e._pt; c; )
      c.r(o, c.d), c = c._next;
    t < 0 && el(e, t, r, !0), e._onUpdate && !r && jt(e, "onUpdate"), l && e._repeat && !r && e.parent && jt(e, "onRepeat"), (t >= e._tDur || t < 0) && e.ratio === o && (o && wi(e, 1), !r && !et && (jt(e, o ? "onComplete" : "onReverseComplete", !0), e._prom && e._prom()));
  } else e._zTime || (e._zTime = t);
}, zh = function(e, t, r) {
  var n;
  if (r > t)
    for (n = e._first; n && n._start <= r; ) {
      if (n.data === "isPause" && n._start > t)
        return n;
      n = n._next;
    }
  else
    for (n = e._last; n && n._start >= r; ) {
      if (n.data === "isPause" && n._start < t)
        return n;
      n = n._prev;
    }
}, Un = function(e, t, r, n) {
  var a = e._repeat, o = Ee(t) || 0, s = e._tTime / e._tDur;
  return s && !n && (e._time *= o / e._dur), e._dur = o, e._tDur = a ? a < 0 ? 1e10 : Ee(o * (a + 1) + e._rDelay * a) : o, s > 0 && !n && Fo(e, e._tTime = e._tDur * s), e.parent && Do(e), r || Hi(e.parent, e), e;
}, wc = function(e) {
  return e instanceof mt ? Hi(e) : Un(e, e._dur);
}, Eh = {
  _start: 0,
  endTime: Ia,
  totalDuration: Ia
}, Kt = function i(e, t, r) {
  var n = e.labels, a = e._recent || Eh, o = e.duration() >= $t ? a.endTime(!1) : e._dur, s, l, c;
  return Ke(t) && (isNaN(t) || t in n) ? (l = t.charAt(0), c = t.substr(-1) === "%", s = t.indexOf("="), l === "<" || l === ">" ? (s >= 0 && (t = t.replace(/=/, "")), (l === "<" ? a._start : a.endTime(a._repeat >= 0)) + (parseFloat(t.substr(1)) || 0) * (c ? (s < 0 ? a : r).totalDuration() / 100 : 1)) : s < 0 ? (t in n || (n[t] = o), n[t]) : (l = parseFloat(t.charAt(s - 1) + t.substr(s + 1)), c && r && (l = l / 100 * (ot(r) ? r[0] : r).totalDuration()), s > 1 ? i(e, t.substr(0, s - 1), r) + l : o + l)) : t == null ? o : +t;
}, Sa = function(e, t, r) {
  var n = Hr(t[1]), a = (n ? 2 : 1) + (e < 2 ? 0 : 1), o = t[a], s, l;
  if (n && (o.duration = t[1]), o.parent = r, e) {
    for (s = o, l = r; l && !("immediateRender" in s); )
      s = l.vars.defaults || {}, l = Et(l.vars.inherit) && l.parent;
    o.immediateRender = Et(s.immediateRender), e < 2 ? o.runBackwards = 1 : o.startAt = t[a - 1];
  }
  return new _e(t[0], o, t[a + 1]);
}, zi = function(e, t) {
  return e || e === 0 ? t(e) : t;
}, Ba = function(e, t, r) {
  return r < e ? e : r > t ? t : r;
}, at = function(e, t) {
  return !Ke(e) || !(t = gh.exec(e)) ? "" : t[1];
}, Th = function(e, t, r) {
  return zi(r, function(n) {
    return Ba(e, t, n);
  });
}, rl = [].slice, cp = function(e, t) {
  return e && Rr(e) && "length" in e && (!t && !e.length || e.length - 1 in e && Rr(e[0])) && !e.nodeType && e !== Sr;
}, Mh = function(e, t, r) {
  return r === void 0 && (r = []), e.forEach(function(n) {
    var a;
    return Ke(n) && !t || cp(n, 1) ? (a = r).push.apply(a, er(n)) : r.push(n);
  }) || r;
}, er = function(e, t, r) {
  return Ae && !t && Ae.selector ? Ae.selector(e) : Ke(e) && !r && (Js || !Gn()) ? rl.call((t || Pl).querySelectorAll(e), 0) : ot(e) ? Mh(e, r) : cp(e) ? rl.call(e, 0) : e ? [e] : [];
}, il = function(e) {
  return e = er(e)[0] || Ma("Invalid scope") || {}, function(t) {
    var r = e.current || e.nativeElement || e;
    return er(t, r.querySelectorAll ? r : r === e ? Ma("Invalid scope") || Pl.createElement("div") : e);
  };
}, dp = function(e) {
  return e.sort(function() {
    return 0.5 - Math.random();
  });
}, pp = function(e) {
  if (Pe(e))
    return e;
  var t = Rr(e) ? e : {
    each: e
  }, r = Qi(t.ease), n = t.from || 0, a = parseFloat(t.base) || 0, o = {}, s = n > 0 && n < 1, l = isNaN(n) || s, c = t.axis, d = n, p = n;
  return Ke(n) ? d = p = {
    center: 0.5,
    edges: 0.5,
    end: 1
  }[n] || 0 : !s && l && (d = n[0], p = n[1]), function(f, v, g) {
    var u = (g || t).length, m = o[u], x, A, b, w, y, T, M, I, z;
    if (!m) {
      if (z = t.grid === "auto" ? 0 : (t.grid || [1, $t])[1], !z) {
        for (M = -$t; M < (M = g[z++].getBoundingClientRect().left) && z < u; )
          ;
        z < u && z--;
      }
      for (m = o[u] = [], x = l ? Math.min(z, u) * d - 0.5 : n % z, A = z === $t ? 0 : l ? u * p / z - 0.5 : n / z | 0, M = 0, I = $t, T = 0; T < u; T++)
        b = T % z - x, w = A - (T / z | 0), m[T] = y = c ? Math.abs(c === "y" ? w : b) : Zd(b * b + w * w), y > M && (M = y), y < I && (I = y);
      n === "random" && dp(m), m.max = M - I, m.min = I, m.v = u = (parseFloat(t.amount) || parseFloat(t.each) * (z > u ? u - 1 : c ? c === "y" ? u / z : z : Math.max(z, u / z)) || 0) * (n === "edges" ? -1 : 1), m.b = u < 0 ? a - u : a, m.u = at(t.amount || t.each) || 0, r = r && u < 0 ? wp(r) : r;
    }
    return u = (m[f] - m.min) / m.max || 0, Ee(m.b + (r ? r(u) : u) * m.v) + m.u;
  };
}, nl = function(e) {
  var t = Math.pow(10, ((e + "").split(".")[1] || "").length);
  return function(r) {
    var n = Ee(Math.round(parseFloat(r) / e) * e * t);
    return (n - n % 1) / t + (Hr(r) ? 0 : at(r));
  };
}, fp = function(e, t) {
  var r = ot(e), n, a;
  return !r && Rr(e) && (n = r = e.radius || $t, e.values ? (e = er(e.values), (a = !Hr(e[0])) && (n *= n)) : e = nl(e.increment)), zi(t, r ? Pe(e) ? function(o) {
    return a = e(o), Math.abs(a - o) <= n ? a : o;
  } : function(o) {
    for (var s = parseFloat(a ? o.x : o), l = parseFloat(a ? o.y : 0), c = $t, d = 0, p = e.length, f, v; p--; )
      a ? (f = e[p].x - s, v = e[p].y - l, f = f * f + v * v) : f = Math.abs(e[p] - s), f < c && (c = f, d = p);
    return d = !n || c <= n ? e[d] : o, a || d === o || Hr(o) ? d : d + at(o);
  } : nl(e));
}, up = function(e, t, r, n) {
  return zi(ot(e) ? !t : r === !0 ? !!(r = 0) : !n, function() {
    return ot(e) ? e[~~(Math.random() * e.length)] : (r = r || 1e-5) && (n = r < 1 ? Math.pow(10, (r + "").length - 2) : 1) && Math.floor(Math.round((e - r / 2 + Math.random() * (t - e + r * 0.99)) / r) * r * n) / n;
  });
}, Ih = function() {
  for (var e = arguments.length, t = new Array(e), r = 0; r < e; r++)
    t[r] = arguments[r];
  return function(n) {
    return t.reduce(function(a, o) {
      return o(a);
    }, n);
  };
}, Oh = function(e, t) {
  return function(r) {
    return e(parseFloat(r)) + (t || at(r));
  };
}, Ch = function(e, t, r) {
  return gp(e, t, 0, 1, r);
}, hp = function(e, t, r) {
  return zi(r, function(n) {
    return e[~~t(n)];
  });
}, Ph = function i(e, t, r) {
  var n = t - e;
  return ot(e) ? hp(e, i(0, e.length), t) : zi(r, function(a) {
    return (n + (a - e) % n) % n + e;
  });
}, qh = function i(e, t, r) {
  var n = t - e, a = n * 2;
  return ot(e) ? hp(e, i(0, e.length - 1), t) : zi(r, function(o) {
    return o = (a + (o - e) % a) % a || 0, e + (o > n ? a - o : o);
  });
}, Oa = function(e) {
  return e.replace(fh, function(t) {
    var r = t.indexOf("[") + 1, n = t.substring(r || 7, r ? t.indexOf("]") : t.length - 1).split(uh);
    return up(r ? n : +n[0], r ? 0 : +n[1], +n[2] || 1e-5);
  });
}, gp = function(e, t, r, n, a) {
  var o = t - e, s = n - r;
  return zi(a, function(l) {
    return r + ((l - e) / o * s || 0);
  });
}, Rh = function i(e, t, r, n) {
  var a = isNaN(e + t) ? 0 : function(v) {
    return (1 - v) * e + v * t;
  };
  if (!a) {
    var o = Ke(e), s = {}, l, c, d, p, f;
    if (r === !0 && (n = 1) && (r = null), o)
      e = {
        p: e
      }, t = {
        p: t
      };
    else if (ot(e) && !ot(t)) {
      for (d = [], p = e.length, f = p - 2, c = 1; c < p; c++)
        d.push(i(e[c - 1], e[c]));
      p--, a = function(g) {
        g *= p;
        var u = Math.min(f, ~~g);
        return d[u](g - u);
      }, r = t;
    } else n || (e = jn(ot(e) ? [] : {}, e));
    if (!d) {
      for (l in t)
        Ll.call(s, e, l, "get", t[l]);
      a = function(g) {
        return jl(g, s) || (o ? e.p : e);
      };
    }
  }
  return zi(r, a);
}, kc = function(e, t, r) {
  var n = e.labels, a = $t, o, s, l;
  for (o in n)
    s = n[o] - t, s < 0 == !!r && s && a > (s = Math.abs(s)) && (l = o, a = s);
  return l;
}, jt = function(e, t, r) {
  var n = e.vars, a = n[t], o = Ae, s = e._ctx, l, c, d;
  if (a)
    return l = n[t + "Params"], c = n.callbackScope || e, r && vi.length && zo(), s && (Ae = s), d = l ? a.apply(c, l) : a.call(c), Ae = o, d;
}, ba = function(e) {
  return wi(e), e.scrollTrigger && e.scrollTrigger.kill(!!et), e.progress() < 1 && jt(e, "onInterrupt"), e;
}, kn, mp = [], vp = function(e) {
  if (e)
    if (e = !e.name && e.default || e, Cl() || e.headless) {
      var t = e.name, r = Pe(e), n = t && !r && e.init ? function() {
        this._props = [];
      } : e, a = {
        init: Ia,
        render: jl,
        add: Ll,
        kill: Qh,
        modifier: Hh,
        rawVars: 0
      }, o = {
        targetTest: 0,
        get: 0,
        getSetter: Fl,
        aliases: {},
        register: 0
      };
      if (Gn(), e !== n) {
        if (Dt[t])
          return;
        Zt(n, Zt(Eo(e, a), o)), jn(n.prototype, jn(a, Eo(e, o))), Dt[n.prop = t] = n, e.targetTest && (xo.push(n), Rl[t] = 1), t = (t === "css" ? "CSS" : t.charAt(0).toUpperCase() + t.substr(1)) + "Plugin";
      }
      $d(t, n), e.register && e.register(Ct, n, Mt);
    } else
      mp.push(e);
}, be = 255, xa = {
  aqua: [0, be, be],
  lime: [0, be, 0],
  silver: [192, 192, 192],
  black: [0, 0, 0],
  maroon: [128, 0, 0],
  teal: [0, 128, 128],
  blue: [0, 0, be],
  navy: [0, 0, 128],
  white: [be, be, be],
  olive: [128, 128, 0],
  yellow: [be, be, 0],
  orange: [be, 165, 0],
  gray: [128, 128, 128],
  purple: [128, 0, 128],
  green: [0, 128, 0],
  red: [be, 0, 0],
  pink: [be, 192, 203],
  cyan: [0, be, be],
  transparent: [be, be, be, 0]
}, zs = function(e, t, r) {
  return e += e < 0 ? 1 : e > 1 ? -1 : 0, (e * 6 < 1 ? t + (r - t) * e * 6 : e < 0.5 ? r : e * 3 < 2 ? t + (r - t) * (2 / 3 - e) * 6 : t) * be + 0.5 | 0;
}, bp = function(e, t, r) {
  var n = e ? Hr(e) ? [e >> 16, e >> 8 & be, e & be] : 0 : xa.black, a, o, s, l, c, d, p, f, v, g;
  if (!n) {
    if (e.substr(-1) === "," && (e = e.substr(0, e.length - 1)), xa[e])
      n = xa[e];
    else if (e.charAt(0) === "#") {
      if (e.length < 6 && (a = e.charAt(1), o = e.charAt(2), s = e.charAt(3), e = "#" + a + a + o + o + s + s + (e.length === 5 ? e.charAt(4) + e.charAt(4) : "")), e.length === 9)
        return n = parseInt(e.substr(1, 6), 16), [n >> 16, n >> 8 & be, n & be, parseInt(e.substr(7), 16) / 255];
      e = parseInt(e.substr(1), 16), n = [e >> 16, e >> 8 & be, e & be];
    } else if (e.substr(0, 3) === "hsl") {
      if (n = g = e.match(vc), !t)
        l = +n[0] % 360 / 360, c = +n[1] / 100, d = +n[2] / 100, o = d <= 0.5 ? d * (c + 1) : d + c - d * c, a = d * 2 - o, n.length > 3 && (n[3] *= 1), n[0] = zs(l + 1 / 3, a, o), n[1] = zs(l, a, o), n[2] = zs(l - 1 / 3, a, o);
      else if (~e.indexOf("="))
        return n = e.match(Hd), r && n.length < 4 && (n[3] = 1), n;
    } else
      n = e.match(vc) || xa.transparent;
    n = n.map(Number);
  }
  return t && !g && (a = n[0] / be, o = n[1] / be, s = n[2] / be, p = Math.max(a, o, s), f = Math.min(a, o, s), d = (p + f) / 2, p === f ? l = c = 0 : (v = p - f, c = d > 0.5 ? v / (2 - p - f) : v / (p + f), l = p === a ? (o - s) / v + (o < s ? 6 : 0) : p === o ? (s - a) / v + 2 : (a - o) / v + 4, l *= 60), n[0] = ~~(l + 0.5), n[1] = ~~(c * 100 + 0.5), n[2] = ~~(d * 100 + 0.5)), r && n.length < 4 && (n[3] = 1), n;
}, xp = function(e) {
  var t = [], r = [], n = -1;
  return e.split(bi).forEach(function(a) {
    var o = a.match(wn) || [];
    t.push.apply(t, o), r.push(n += o.length + 1);
  }), t.c = r, t;
}, Ac = function(e, t, r) {
  var n = "", a = (e + n).match(bi), o = t ? "hsla(" : "rgba(", s = 0, l, c, d, p;
  if (!a)
    return e;
  if (a = a.map(function(f) {
    return (f = bp(f, t, 1)) && o + (t ? f[0] + "," + f[1] + "%," + f[2] + "%," + f[3] : f.join(",")) + ")";
  }), r && (d = xp(e), l = r.c, l.join(n) !== d.c.join(n)))
    for (c = e.replace(bi, "1").split(wn), p = c.length - 1; s < p; s++)
      n += c[s] + (~l.indexOf(s) ? a.shift() || o + "0,0,0,0)" : (d.length ? d : a.length ? a : r).shift());
  if (!c)
    for (c = e.split(bi), p = c.length - 1; s < p; s++)
      n += c[s] + a[s];
  return n + c[p];
}, bi = function() {
  var i = "(?:\\b(?:(?:rgb|rgba|hsl|hsla)\\(.+?\\))|\\B#(?:[0-9a-f]{3,4}){1,2}\\b", e;
  for (e in xa)
    i += "|" + e + "\\b";
  return new RegExp(i + ")", "gi");
}(), Vh = /hsl[a]?\(/, yp = function(e) {
  var t = e.join(" "), r;
  if (bi.lastIndex = 0, bi.test(t))
    return r = Vh.test(t), e[1] = Ac(e[1], r), e[0] = Ac(e[0], r, xp(e[1])), !0;
}, Ca, Ft = function() {
  var i = Date.now, e = 500, t = 33, r = i(), n = r, a = 1e3 / 240, o = a, s = [], l, c, d, p, f, v, g = function u(m) {
    var x = i() - n, A = m === !0, b, w, y, T;
    if ((x > e || x < 0) && (r += x - t), n += x, y = n - r, b = y - o, (b > 0 || A) && (T = ++p.frame, f = y - p.time * 1e3, p.time = y = y / 1e3, o += b + (b >= a ? 4 : a - b), w = 1), A || (l = c(u)), w)
      for (v = 0; v < s.length; v++)
        s[v](y, f, T, m);
  };
  return p = {
    time: 0,
    frame: 0,
    tick: function() {
      g(!0);
    },
    deltaRatio: function(m) {
      return f / (1e3 / (m || 60));
    },
    wake: function() {
      Wd && (!Js && Cl() && (Sr = Js = window, Pl = Sr.document || {}, Xt.gsap = Ct, (Sr.gsapVersions || (Sr.gsapVersions = [])).push(Ct.version), Jd(So || Sr.GreenSockGlobals || !Sr.gsap && Sr || {}), mp.forEach(vp)), d = typeof requestAnimationFrame < "u" && requestAnimationFrame, l && p.sleep(), c = d || function(m) {
        return setTimeout(m, o - p.time * 1e3 + 1 | 0);
      }, Ca = 1, g(2));
    },
    sleep: function() {
      (d ? cancelAnimationFrame : clearTimeout)(l), Ca = 0, c = Ia;
    },
    lagSmoothing: function(m, x) {
      e = m || 1 / 0, t = Math.min(x || 33, e);
    },
    fps: function(m) {
      a = 1e3 / (m || 240), o = p.time * 1e3 + a;
    },
    add: function(m, x, A) {
      var b = x ? function(w, y, T, M) {
        m(w, y, T, M), p.remove(b);
      } : m;
      return p.remove(m), s[A ? "unshift" : "push"](b), Gn(), b;
    },
    remove: function(m, x) {
      ~(x = s.indexOf(m)) && s.splice(x, 1) && v >= x && v--;
    },
    _listeners: s
  }, p;
}(), Gn = function() {
  return !Ca && Ft.wake();
}, ae = {}, Nh = /^[\d.\-M][\d.\-,\s]/, Yh = /["']/g, Lh = function(e) {
  for (var t = {}, r = e.substr(1, e.length - 3).split(":"), n = r[0], a = 1, o = r.length, s, l, c; a < o; a++)
    l = r[a], s = a !== o - 1 ? l.lastIndexOf(",") : l.length, c = l.substr(0, s), t[n] = isNaN(c) ? c.replace(Yh, "").trim() : +c, n = l.substr(s + 1).trim();
  return t;
}, _h = function(e) {
  var t = e.indexOf("(") + 1, r = e.indexOf(")"), n = e.indexOf("(", t);
  return e.substring(t, ~n && n < r ? e.indexOf(")", r + 1) : r);
}, Dh = function(e) {
  var t = (e + "").split("("), r = ae[t[0]];
  return r && t.length > 1 && r.config ? r.config.apply(null, ~e.indexOf("{") ? [Lh(t[1])] : _h(e).split(",").map(ip)) : ae._CE && Nh.test(e) ? ae._CE("", e) : r;
}, wp = function(e) {
  return function(t) {
    return 1 - e(1 - t);
  };
}, kp = function i(e, t) {
  for (var r = e._first, n; r; )
    r instanceof mt ? i(r, t) : r.vars.yoyoEase && (!r._yoyo || !r._repeat) && r._yoyo !== t && (r.timeline ? i(r.timeline, t) : (n = r._ease, r._ease = r._yEase, r._yEase = n, r._yoyo = t)), r = r._next;
}, Qi = function(e, t) {
  return e && (Pe(e) ? e : ae[e] || Dh(e)) || t;
}, an = function(e, t, r, n) {
  r === void 0 && (r = function(l) {
    return 1 - t(1 - l);
  }), n === void 0 && (n = function(l) {
    return l < 0.5 ? t(l * 2) / 2 : 1 - t((1 - l) * 2) / 2;
  });
  var a = {
    easeIn: t,
    easeOut: r,
    easeInOut: n
  }, o;
  return Tt(e, function(s) {
    ae[s] = Xt[s] = a, ae[o = s.toLowerCase()] = r;
    for (var l in a)
      ae[o + (l === "easeIn" ? ".in" : l === "easeOut" ? ".out" : ".inOut")] = ae[s + "." + l] = a[l];
  }), a;
}, Ap = function(e) {
  return function(t) {
    return t < 0.5 ? (1 - e(1 - t * 2)) / 2 : 0.5 + e((t - 0.5) * 2) / 2;
  };
}, Es = function i(e, t, r) {
  var n = t >= 1 ? t : 1, a = (r || (e ? 0.3 : 0.45)) / (t < 1 ? t : 1), o = a / Ws * (Math.asin(1 / n) || 0), s = function(d) {
    return d === 1 ? 1 : n * Math.pow(2, -10 * d) * ph((d - o) * a) + 1;
  }, l = e === "out" ? s : e === "in" ? function(c) {
    return 1 - s(1 - c);
  } : Ap(s);
  return a = Ws / a, l.config = function(c, d) {
    return i(e, c, d);
  }, l;
}, Ts = function i(e, t) {
  t === void 0 && (t = 1.70158);
  var r = function(o) {
    return o ? --o * o * ((t + 1) * o + t) + 1 : 0;
  }, n = e === "out" ? r : e === "in" ? function(a) {
    return 1 - r(1 - a);
  } : Ap(r);
  return n.config = function(a) {
    return i(e, a);
  }, n;
};
Tt("Linear,Quad,Cubic,Quart,Quint,Strong", function(i, e) {
  var t = e < 5 ? e + 1 : e;
  an(i + ",Power" + (t - 1), e ? function(r) {
    return Math.pow(r, t);
  } : function(r) {
    return r;
  }, function(r) {
    return 1 - Math.pow(1 - r, t);
  }, function(r) {
    return r < 0.5 ? Math.pow(r * 2, t) / 2 : 1 - Math.pow((1 - r) * 2, t) / 2;
  });
});
ae.Linear.easeNone = ae.none = ae.Linear.easeIn;
an("Elastic", Es("in"), Es("out"), Es());
(function(i, e) {
  var t = 1 / e, r = 2 * t, n = 2.5 * t, a = function(s) {
    return s < t ? i * s * s : s < r ? i * Math.pow(s - 1.5 / e, 2) + 0.75 : s < n ? i * (s -= 2.25 / e) * s + 0.9375 : i * Math.pow(s - 2.625 / e, 2) + 0.984375;
  };
  an("Bounce", function(o) {
    return 1 - a(1 - o);
  }, a);
})(7.5625, 2.75);
an("Expo", function(i) {
  return Math.pow(2, 10 * (i - 1)) * i + i * i * i * i * i * i * (1 - i);
});
an("Circ", function(i) {
  return -(Zd(1 - i * i) - 1);
});
an("Sine", function(i) {
  return i === 1 ? 1 : -dh(i * lh) + 1;
});
an("Back", Ts("in"), Ts("out"), Ts());
ae.SteppedEase = ae.steps = Xt.SteppedEase = {
  config: function(e, t) {
    e === void 0 && (e = 1);
    var r = 1 / e, n = e + (t ? 0 : 1), a = t ? 1 : 0, o = 1 - xe;
    return function(s) {
      return ((n * Ba(0, o, s) | 0) + a) * r;
    };
  }
};
Fn.ease = ae["quad.out"];
Tt("onComplete,onUpdate,onStart,onRepeat,onReverseComplete,onInterrupt", function(i) {
  return Vl += i + "," + i + "Params,";
});
var Sp = function(e, t) {
  this.id = ch++, e._gsap = this, this.target = e, this.harness = t, this.get = t ? t.get : tp, this.set = t ? t.getSetter : Fl;
}, Pa = /* @__PURE__ */ function() {
  function i(t) {
    this.vars = t, this._delay = +t.delay || 0, (this._repeat = t.repeat === 1 / 0 ? -2 : t.repeat || 0) && (this._rDelay = t.repeatDelay || 0, this._yoyo = !!t.yoyo || !!t.yoyoEase), this._ts = 1, Un(this, +t.duration, 1, 1), this.data = t.data, Ae && (this._ctx = Ae, Ae.data.push(this)), Ca || Ft.wake();
  }
  var e = i.prototype;
  return e.delay = function(r) {
    return r || r === 0 ? (this.parent && this.parent.smoothChildTiming && this.startTime(this._start + r - this._delay), this._delay = r, this) : this._delay;
  }, e.duration = function(r) {
    return arguments.length ? this.totalDuration(this._repeat > 0 ? r + (r + this._rDelay) * this._repeat : r) : this.totalDuration() && this._dur;
  }, e.totalDuration = function(r) {
    return arguments.length ? (this._dirty = 0, Un(this, this._repeat < 0 ? r : (r - this._repeat * this._rDelay) / (this._repeat + 1))) : this._tDur;
  }, e.totalTime = function(r, n) {
    if (Gn(), !arguments.length)
      return this._tTime;
    var a = this._dp;
    if (a && a.smoothChildTiming && this._ts) {
      for (Fo(this, r), !a._dp || a.parent || op(a, this); a && a.parent; )
        a.parent._time !== a._start + (a._ts >= 0 ? a._tTime / a._ts : (a.totalDuration() - a._tTime) / -a._ts) && a.totalTime(a._tTime, !0), a = a.parent;
      !this.parent && this._dp.autoRemoveChildren && (this._ts > 0 && r < this._tDur || this._ts < 0 && r > 0 || !this._tDur && !r) && Ir(this._dp, this, this._start - this._delay);
    }
    return (this._tTime !== r || !this._dur && !n || this._initted && Math.abs(this._zTime) === xe || !this._initted && this._dur && r || !r && !this._initted && (this.add || this._ptLookup)) && (this._ts || (this._pTime = r), rp(this, r, n)), this;
  }, e.time = function(r, n) {
    return arguments.length ? this.totalTime(Math.min(this.totalDuration(), r + yc(this)) % (this._dur + this._rDelay) || (r ? this._dur : 0), n) : this._time;
  }, e.totalProgress = function(r, n) {
    return arguments.length ? this.totalTime(this.totalDuration() * r, n) : this.totalDuration() ? Math.min(1, this._tTime / this._tDur) : this.rawTime() >= 0 && this._initted ? 1 : 0;
  }, e.progress = function(r, n) {
    return arguments.length ? this.totalTime(this.duration() * (this._yoyo && !(this.iteration() & 1) ? 1 - r : r) + yc(this), n) : this.duration() ? Math.min(1, this._time / this._dur) : this.rawTime() > 0 ? 1 : 0;
  }, e.iteration = function(r, n) {
    var a = this.duration() + this._rDelay;
    return arguments.length ? this.totalTime(this._time + (r - 1) * a, n) : this._repeat ? Bn(this._tTime, a) + 1 : 1;
  }, e.timeScale = function(r, n) {
    if (!arguments.length)
      return this._rts === -xe ? 0 : this._rts;
    if (this._rts === r)
      return this;
    var a = this.parent && this._ts ? To(this.parent._time, this) : this._tTime;
    return this._rts = +r || 0, this._ts = this._ps || r === -xe ? 0 : this._rts, this.totalTime(Ba(-Math.abs(this._delay), this.totalDuration(), a), n !== !1), Do(this), wh(this);
  }, e.paused = function(r) {
    return arguments.length ? (this._ps !== r && (this._ps = r, r ? (this._pTime = this._tTime || Math.max(-this._delay, this.rawTime()), this._ts = this._act = 0) : (Gn(), this._ts = this._rts, this.totalTime(this.parent && !this.parent.smoothChildTiming ? this.rawTime() : this._tTime || this._pTime, this.progress() === 1 && Math.abs(this._zTime) !== xe && (this._tTime -= xe)))), this) : this._ps;
  }, e.startTime = function(r) {
    if (arguments.length) {
      this._start = Ee(r);
      var n = this.parent || this._dp;
      return n && (n._sort || !this.parent) && Ir(n, this, this._start - this._delay), this;
    }
    return this._start;
  }, e.endTime = function(r) {
    return this._start + (Et(r) ? this.totalDuration() : this.duration()) / Math.abs(this._ts || 1);
  }, e.rawTime = function(r) {
    var n = this.parent || this._dp;
    return n ? r && (!this._ts || this._repeat && this._time && this.totalProgress() < 1) ? this._tTime % (this._dur + this._rDelay) : this._ts ? To(n.rawTime(r), this) : this._tTime : this._tTime;
  }, e.revert = function(r) {
    r === void 0 && (r = vh);
    var n = et;
    return et = r, Yl(this) && (this.timeline && this.timeline.revert(r), this.totalTime(-0.01, r.suppressEvents)), this.data !== "nested" && r.kill !== !1 && this.kill(), et = n, this;
  }, e.globalTime = function(r) {
    for (var n = this, a = arguments.length ? r : n.rawTime(); n; )
      a = n._start + a / (Math.abs(n._ts) || 1), n = n._dp;
    return !this.parent && this._sat ? this._sat.globalTime(r) : a;
  }, e.repeat = function(r) {
    return arguments.length ? (this._repeat = r === 1 / 0 ? -2 : r, wc(this)) : this._repeat === -2 ? 1 / 0 : this._repeat;
  }, e.repeatDelay = function(r) {
    if (arguments.length) {
      var n = this._time;
      return this._rDelay = r, wc(this), n ? this.time(n) : this;
    }
    return this._rDelay;
  }, e.yoyo = function(r) {
    return arguments.length ? (this._yoyo = r, this) : this._yoyo;
  }, e.seek = function(r, n) {
    return this.totalTime(Kt(this, r), Et(n));
  }, e.restart = function(r, n) {
    return this.play().totalTime(r ? -this._delay : 0, Et(n)), this._dur || (this._zTime = -xe), this;
  }, e.play = function(r, n) {
    return r != null && this.seek(r, n), this.reversed(!1).paused(!1);
  }, e.reverse = function(r, n) {
    return r != null && this.seek(r || this.totalDuration(), n), this.reversed(!0).paused(!1);
  }, e.pause = function(r, n) {
    return r != null && this.seek(r, n), this.paused(!0);
  }, e.resume = function() {
    return this.paused(!1);
  }, e.reversed = function(r) {
    return arguments.length ? (!!r !== this.reversed() && this.timeScale(-this._rts || (r ? -xe : 0)), this) : this._rts < 0;
  }, e.invalidate = function() {
    return this._initted = this._act = 0, this._zTime = -xe, this;
  }, e.isActive = function() {
    var r = this.parent || this._dp, n = this._start, a;
    return !!(!r || this._ts && this._initted && r.isActive() && (a = r.rawTime(!0)) >= n && a < this.endTime(!0) - xe);
  }, e.eventCallback = function(r, n, a) {
    var o = this.vars;
    return arguments.length > 1 ? (n ? (o[r] = n, a && (o[r + "Params"] = a), r === "onUpdate" && (this._onUpdate = n)) : delete o[r], this) : o[r];
  }, e.then = function(r) {
    var n = this, a = n._prom;
    return new Promise(function(o) {
      var s = Pe(r) ? r : np, l = function() {
        var d = n.then;
        n.then = null, a && a(), Pe(s) && (s = s(n)) && (s.then || s === n) && (n.then = d), o(s), n.then = d;
      };
      n._initted && n.totalProgress() === 1 && n._ts >= 0 || !n._tTime && n._ts < 0 ? l() : n._prom = l;
    });
  }, e.kill = function() {
    ba(this);
  }, i;
}();
Zt(Pa.prototype, {
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
  _zTime: -xe,
  _prom: 0,
  _ps: !1,
  _rts: 1
});
var mt = /* @__PURE__ */ function(i) {
  Xd(e, i);
  function e(r, n) {
    var a;
    return r === void 0 && (r = {}), a = i.call(this, r) || this, a.labels = {}, a.smoothChildTiming = !!r.smoothChildTiming, a.autoRemoveChildren = !!r.autoRemoveChildren, a._sort = Et(r.sortChildren), Te && Ir(r.parent || Te, Br(a), n), r.reversed && a.reverse(), r.paused && a.paused(!0), r.scrollTrigger && sp(Br(a), r.scrollTrigger), a;
  }
  var t = e.prototype;
  return t.to = function(n, a, o) {
    return Sa(0, arguments, this), this;
  }, t.from = function(n, a, o) {
    return Sa(1, arguments, this), this;
  }, t.fromTo = function(n, a, o, s) {
    return Sa(2, arguments, this), this;
  }, t.set = function(n, a, o) {
    return a.duration = 0, a.parent = this, Aa(a).repeatDelay || (a.repeat = 0), a.immediateRender = !!a.immediateRender, new _e(n, a, Kt(this, o), 1), this;
  }, t.call = function(n, a, o) {
    return Ir(this, _e.delayedCall(0, n, a), o);
  }, t.staggerTo = function(n, a, o, s, l, c, d) {
    return o.duration = a, o.stagger = o.stagger || s, o.onComplete = c, o.onCompleteParams = d, o.parent = this, new _e(n, o, Kt(this, l)), this;
  }, t.staggerFrom = function(n, a, o, s, l, c, d) {
    return o.runBackwards = 1, Aa(o).immediateRender = Et(o.immediateRender), this.staggerTo(n, a, o, s, l, c, d);
  }, t.staggerFromTo = function(n, a, o, s, l, c, d, p) {
    return s.startAt = o, Aa(s).immediateRender = Et(s.immediateRender), this.staggerTo(n, a, s, l, c, d, p);
  }, t.render = function(n, a, o) {
    var s = this._time, l = this._dirty ? this.totalDuration() : this._tDur, c = this._dur, d = n <= 0 ? 0 : Ee(n), p = this._zTime < 0 != n < 0 && (this._initted || !c), f, v, g, u, m, x, A, b, w, y, T, M;
    if (this !== Te && d > l && n >= 0 && (d = l), d !== this._tTime || o || p) {
      if (s !== this._time && c && (d += this._time - s, n += this._time - s), f = d, w = this._start, b = this._ts, x = !b, p && (c || (s = this._zTime), (n || !a) && (this._zTime = n)), this._repeat) {
        if (T = this._yoyo, m = c + this._rDelay, this._repeat < -1 && n < 0)
          return this.totalTime(m * 100 + n, a, o);
        if (f = Ee(d % m), d === l ? (u = this._repeat, f = c) : (y = Ee(d / m), u = ~~y, u && u === y && (f = c, u--), f > c && (f = c)), y = Bn(this._tTime, m), !s && this._tTime && y !== u && this._tTime - y * m - this._dur <= 0 && (y = u), T && u & 1 && (f = c - f, M = 1), u !== y && !this._lock) {
          var I = T && y & 1, z = I === (T && u & 1);
          if (u < y && (I = !I), s = I ? 0 : d % c ? c : d, this._lock = 1, this.render(s || (M ? 0 : Ee(u * m)), a, !c)._lock = 0, this._tTime = d, !a && this.parent && jt(this, "onRepeat"), this.vars.repeatRefresh && !M && (this.invalidate()._lock = 1, y = u), s && s !== this._time || x !== !this._ts || this.vars.onRepeat && !this.parent && !this._act)
            return this;
          if (c = this._dur, l = this._tDur, z && (this._lock = 2, s = I ? c : -1e-4, this.render(s, !0), this.vars.repeatRefresh && !M && this.invalidate()), this._lock = 0, !this._ts && !x)
            return this;
          kp(this, M);
        }
      }
      if (this._hasPause && !this._forcing && this._lock < 2 && (A = zh(this, Ee(s), Ee(f)), A && (d -= f - (f = A._start))), this._tTime = d, this._time = f, this._act = !b, this._initted || (this._onUpdate = this.vars.onUpdate, this._initted = 1, this._zTime = n, s = 0), !s && d && c && !a && !y && (jt(this, "onStart"), this._tTime !== d))
        return this;
      if (f >= s && n >= 0)
        for (v = this._first; v; ) {
          if (g = v._next, (v._act || f >= v._start) && v._ts && A !== v) {
            if (v.parent !== this)
              return this.render(n, a, o);
            if (v.render(v._ts > 0 ? (f - v._start) * v._ts : (v._dirty ? v.totalDuration() : v._tDur) + (f - v._start) * v._ts, a, o), f !== this._time || !this._ts && !x) {
              A = 0, g && (d += this._zTime = -xe);
              break;
            }
          }
          v = g;
        }
      else {
        v = this._last;
        for (var N = n < 0 ? n : f; v; ) {
          if (g = v._prev, (v._act || N <= v._end) && v._ts && A !== v) {
            if (v.parent !== this)
              return this.render(n, a, o);
            if (v.render(v._ts > 0 ? (N - v._start) * v._ts : (v._dirty ? v.totalDuration() : v._tDur) + (N - v._start) * v._ts, a, o || et && Yl(v)), f !== this._time || !this._ts && !x) {
              A = 0, g && (d += this._zTime = N ? -xe : xe);
              break;
            }
          }
          v = g;
        }
      }
      if (A && !a && (this.pause(), A.render(f >= s ? 0 : -xe)._zTime = f >= s ? 1 : -1, this._ts))
        return this._start = w, Do(this), this.render(n, a, o);
      this._onUpdate && !a && jt(this, "onUpdate", !0), (d === l && this._tTime >= this.totalDuration() || !d && s) && (w === this._start || Math.abs(b) !== Math.abs(this._ts)) && (this._lock || ((n || !c) && (d === l && this._ts > 0 || !d && this._ts < 0) && wi(this, 1), !a && !(n < 0 && !s) && (d || s || !l) && (jt(this, d === l && n >= 0 ? "onComplete" : "onReverseComplete", !0), this._prom && !(d < l && this.timeScale() > 0) && this._prom())));
    }
    return this;
  }, t.add = function(n, a) {
    var o = this;
    if (Hr(a) || (a = Kt(this, a, n)), !(n instanceof Pa)) {
      if (ot(n))
        return n.forEach(function(s) {
          return o.add(s, a);
        }), this;
      if (Ke(n))
        return this.addLabel(n, a);
      if (Pe(n))
        n = _e.delayedCall(0, n);
      else
        return this;
    }
    return this !== n ? Ir(this, n, a) : this;
  }, t.getChildren = function(n, a, o, s) {
    n === void 0 && (n = !0), a === void 0 && (a = !0), o === void 0 && (o = !0), s === void 0 && (s = -$t);
    for (var l = [], c = this._first; c; )
      c._start >= s && (c instanceof _e ? a && l.push(c) : (o && l.push(c), n && l.push.apply(l, c.getChildren(!0, a, o)))), c = c._next;
    return l;
  }, t.getById = function(n) {
    for (var a = this.getChildren(1, 1, 1), o = a.length; o--; )
      if (a[o].vars.id === n)
        return a[o];
  }, t.remove = function(n) {
    return Ke(n) ? this.removeLabel(n) : Pe(n) ? this.killTweensOf(n) : (n.parent === this && _o(this, n), n === this._recent && (this._recent = this._last), Hi(this));
  }, t.totalTime = function(n, a) {
    return arguments.length ? (this._forcing = 1, !this._dp && this._ts && (this._start = Ee(Ft.time - (this._ts > 0 ? n / this._ts : (this.totalDuration() - n) / -this._ts))), i.prototype.totalTime.call(this, n, a), this._forcing = 0, this) : this._tTime;
  }, t.addLabel = function(n, a) {
    return this.labels[n] = Kt(this, a), this;
  }, t.removeLabel = function(n) {
    return delete this.labels[n], this;
  }, t.addPause = function(n, a, o) {
    var s = _e.delayedCall(0, a || Ia, o);
    return s.data = "isPause", this._hasPause = 1, Ir(this, s, Kt(this, n));
  }, t.removePause = function(n) {
    var a = this._first;
    for (n = Kt(this, n); a; )
      a._start === n && a.data === "isPause" && wi(a), a = a._next;
  }, t.killTweensOf = function(n, a, o) {
    for (var s = this.getTweensOf(n, o), l = s.length; l--; )
      pi !== s[l] && s[l].kill(n, a);
    return this;
  }, t.getTweensOf = function(n, a) {
    for (var o = [], s = er(n), l = this._first, c = Hr(a), d; l; )
      l instanceof _e ? bh(l._targets, s) && (c ? (!pi || l._initted && l._ts) && l.globalTime(0) <= a && l.globalTime(l.totalDuration()) > a : !a || l.isActive()) && o.push(l) : (d = l.getTweensOf(s, a)).length && o.push.apply(o, d), l = l._next;
    return o;
  }, t.tweenTo = function(n, a) {
    a = a || {};
    var o = this, s = Kt(o, n), l = a, c = l.startAt, d = l.onStart, p = l.onStartParams, f = l.immediateRender, v, g = _e.to(o, Zt({
      ease: a.ease || "none",
      lazy: !1,
      immediateRender: !1,
      time: s,
      overwrite: "auto",
      duration: a.duration || Math.abs((s - (c && "time" in c ? c.time : o._time)) / o.timeScale()) || xe,
      onStart: function() {
        if (o.pause(), !v) {
          var m = a.duration || Math.abs((s - (c && "time" in c ? c.time : o._time)) / o.timeScale());
          g._dur !== m && Un(g, m, 0, 1).render(g._time, !0, !0), v = 1;
        }
        d && d.apply(g, p || []);
      }
    }, a));
    return f ? g.render(0) : g;
  }, t.tweenFromTo = function(n, a, o) {
    return this.tweenTo(a, Zt({
      startAt: {
        time: Kt(this, n)
      }
    }, o));
  }, t.recent = function() {
    return this._recent;
  }, t.nextLabel = function(n) {
    return n === void 0 && (n = this._time), kc(this, Kt(this, n));
  }, t.previousLabel = function(n) {
    return n === void 0 && (n = this._time), kc(this, Kt(this, n), 1);
  }, t.currentLabel = function(n) {
    return arguments.length ? this.seek(n, !0) : this.previousLabel(this._time + xe);
  }, t.shiftChildren = function(n, a, o) {
    o === void 0 && (o = 0);
    var s = this._first, l = this.labels, c;
    for (n = Ee(n); s; )
      s._start >= o && (s._start += n, s._end += n), s = s._next;
    if (a)
      for (c in l)
        l[c] >= o && (l[c] += n);
    return Hi(this);
  }, t.invalidate = function(n) {
    var a = this._first;
    for (this._lock = 0; a; )
      a.invalidate(n), a = a._next;
    return i.prototype.invalidate.call(this, n);
  }, t.clear = function(n) {
    n === void 0 && (n = !0);
    for (var a = this._first, o; a; )
      o = a._next, this.remove(a), a = o;
    return this._dp && (this._time = this._tTime = this._pTime = 0), n && (this.labels = {}), Hi(this);
  }, t.totalDuration = function(n) {
    var a = 0, o = this, s = o._last, l = $t, c, d, p;
    if (arguments.length)
      return o.timeScale((o._repeat < 0 ? o.duration() : o.totalDuration()) / (o.reversed() ? -n : n));
    if (o._dirty) {
      for (p = o.parent; s; )
        c = s._prev, s._dirty && s.totalDuration(), d = s._start, d > l && o._sort && s._ts && !o._lock ? (o._lock = 1, Ir(o, s, d - s._delay, 1)._lock = 0) : l = d, d < 0 && s._ts && (a -= d, (!p && !o._dp || p && p.smoothChildTiming) && (o._start += Ee(d / o._ts), o._time -= d, o._tTime -= d), o.shiftChildren(-d, !1, -1 / 0), l = 0), s._end > a && s._ts && (a = s._end), s = c;
      Un(o, o === Te && o._time > a ? o._time : a, 1, 1), o._dirty = 0;
    }
    return o._tDur;
  }, e.updateRoot = function(n) {
    if (Te._ts && (rp(Te, To(n, Te)), ep = Ft.frame), Ft.frame >= bc) {
      bc += Gt.autoSleep || 120;
      var a = Te._first;
      if ((!a || !a._ts) && Gt.autoSleep && Ft._listeners.length < 2) {
        for (; a && !a._ts; )
          a = a._next;
        a || Ft.sleep();
      }
    }
  }, e;
}(Pa);
Zt(mt.prototype, {
  _lock: 0,
  _hasPause: 0,
  _forcing: 0
});
var Fh = function(e, t, r, n, a, o, s) {
  var l = new Mt(this._pt, e, t, 0, 1, Op, null, a), c = 0, d = 0, p, f, v, g, u, m, x, A;
  for (l.b = r, l.e = n, r += "", n += "", (x = ~n.indexOf("random(")) && (n = Oa(n)), o && (A = [r, n], o(A, e, t), r = A[0], n = A[1]), f = r.match(As) || []; p = As.exec(n); )
    g = p[0], u = n.substring(c, p.index), v ? v = (v + 1) % 5 : u.substr(-5) === "rgba(" && (v = 1), g !== f[d++] && (m = parseFloat(f[d - 1]) || 0, l._pt = {
      _next: l._pt,
      p: u || d === 1 ? u : ",",
      //note: SVG spec allows omission of comma/space when a negative sign is wedged between two numbers, like 2.5-5.3 instead of 2.5,-5.3 but when tweening, the negative value may switch to positive, so we insert the comma just in case.
      s: m,
      c: g.charAt(1) === "=" ? An(m, g) - m : parseFloat(g) - m,
      m: v && v < 4 ? Math.round : 0
    }, c = As.lastIndex);
  return l.c = c < n.length ? n.substring(c, n.length) : "", l.fp = s, (Qd.test(n) || x) && (l.e = 0), this._pt = l, l;
}, Ll = function(e, t, r, n, a, o, s, l, c, d) {
  Pe(n) && (n = n(a || 0, e, o));
  var p = e[t], f = r !== "get" ? r : Pe(p) ? c ? e[t.indexOf("set") || !Pe(e["get" + t.substr(3)]) ? t : "get" + t.substr(3)](c) : e[t]() : p, v = Pe(p) ? c ? Xh : Mp : Dl, g;
  if (Ke(n) && (~n.indexOf("random(") && (n = Oa(n)), n.charAt(1) === "=" && (g = An(f, n) + (at(f) || 0), (g || g === 0) && (n = g))), !d || f !== n || al)
    return !isNaN(f * n) && n !== "" ? (g = new Mt(this._pt, e, t, +f || 0, n - (f || 0), typeof p == "boolean" ? Kh : Ip, 0, v), c && (g.fp = c), s && g.modifier(s, this, e), this._pt = g) : (!p && !(t in e) && ql(t, n), Fh.call(this, e, t, f, n, v, l || Gt.stringFilter, c));
}, jh = function(e, t, r, n, a) {
  if (Pe(e) && (e = za(e, a, t, r, n)), !Rr(e) || e.style && e.nodeType || ot(e) || Kd(e))
    return Ke(e) ? za(e, a, t, r, n) : e;
  var o = {}, s;
  for (s in e)
    o[s] = za(e[s], a, t, r, n);
  return o;
}, zp = function(e, t, r, n, a, o) {
  var s, l, c, d;
  if (Dt[e] && (s = new Dt[e]()).init(a, s.rawVars ? t[e] : jh(t[e], n, a, o, r), r, n, o) !== !1 && (r._pt = l = new Mt(r._pt, a, e, 0, 1, s.render, s, 0, s.priority), r !== kn))
    for (c = r._ptLookup[r._targets.indexOf(a)], d = s._props.length; d--; )
      c[s._props[d]] = l;
  return s;
}, pi, al, _l = function i(e, t, r) {
  var n = e.vars, a = n.ease, o = n.startAt, s = n.immediateRender, l = n.lazy, c = n.onUpdate, d = n.runBackwards, p = n.yoyoEase, f = n.keyframes, v = n.autoRevert, g = e._dur, u = e._startAt, m = e._targets, x = e.parent, A = x && x.data === "nested" ? x.vars.targets : m, b = e._overwrite === "auto" && !Il, w = e.timeline, y, T, M, I, z, N, _, L, Q, oe, de, O, Y;
  if (w && (!f || !a) && (a = "none"), e._ease = Qi(a, Fn.ease), e._yEase = p ? wp(Qi(p === !0 ? a : p, Fn.ease)) : 0, p && e._yoyo && !e._repeat && (p = e._yEase, e._yEase = e._ease, e._ease = p), e._from = !w && !!n.runBackwards, !w || f && !n.stagger) {
    if (L = m[0] ? Ki(m[0]).harness : 0, O = L && n[L.prop], y = Eo(n, Rl), u && (u._zTime < 0 && u.progress(1), t < 0 && d && s && !v ? u.render(-1, !0) : u.revert(d && g ? bo : mh), u._lazy = 0), o) {
      if (wi(e._startAt = _e.set(m, Zt({
        data: "isStart",
        overwrite: !1,
        parent: x,
        immediateRender: !0,
        lazy: !u && Et(l),
        startAt: null,
        delay: 0,
        onUpdate: c && function() {
          return jt(e, "onUpdate");
        },
        stagger: 0
      }, o))), e._startAt._dp = 0, e._startAt._sat = e, t < 0 && (et || !s && !v) && e._startAt.revert(bo), s && g && t <= 0 && r <= 0) {
        t && (e._zTime = t);
        return;
      }
    } else if (d && g && !u) {
      if (t && (s = !1), M = Zt({
        overwrite: !1,
        data: "isFromStart",
        //we tag the tween with as "isFromStart" so that if [inside a plugin] we need to only do something at the very END of a tween, we have a way of identifying this tween as merely the one that's setting the beginning values for a "from()" tween. For example, clearProps in CSSPlugin should only get applied at the very END of a tween and without this tag, from(...{height:100, clearProps:"height", delay:1}) would wipe the height at the beginning of the tween and after 1 second, it'd kick back in.
        lazy: s && !u && Et(l),
        immediateRender: s,
        //zero-duration tweens render immediately by default, but if we're not specifically instructed to render this tween immediately, we should skip this and merely _init() to record the starting values (rendering them immediately would push them to completion which is wasteful in that case - we'd have to render(-1) immediately after)
        stagger: 0,
        parent: x
        //ensures that nested tweens that had a stagger are handled properly, like gsap.from(".class", {y: gsap.utils.wrap([-100,100]), stagger: 0.5})
      }, y), O && (M[L.prop] = O), wi(e._startAt = _e.set(m, M)), e._startAt._dp = 0, e._startAt._sat = e, t < 0 && (et ? e._startAt.revert(bo) : e._startAt.render(-1, !0)), e._zTime = t, !s)
        i(e._startAt, xe, xe);
      else if (!t)
        return;
    }
    for (e._pt = e._ptCache = 0, l = g && Et(l) || l && !g, T = 0; T < m.length; T++) {
      if (z = m[T], _ = z._gsap || Nl(m)[T]._gsap, e._ptLookup[T] = oe = {}, $s[_.id] && vi.length && zo(), de = A === m ? T : A.indexOf(z), L && (Q = new L()).init(z, O || y, e, de, A) !== !1 && (e._pt = I = new Mt(e._pt, z, Q.name, 0, 1, Q.render, Q, 0, Q.priority), Q._props.forEach(function(V) {
        oe[V] = I;
      }), Q.priority && (N = 1)), !L || O)
        for (M in y)
          Dt[M] && (Q = zp(M, y, e, de, z, A)) ? Q.priority && (N = 1) : oe[M] = I = Ll.call(e, z, M, "get", y[M], de, A, 0, n.stringFilter);
      e._op && e._op[T] && e.kill(z, e._op[T]), b && e._pt && (pi = e, Te.killTweensOf(z, oe, e.globalTime(t)), Y = !e.parent, pi = 0), e._pt && l && ($s[_.id] = 1);
    }
    N && Cp(e), e._onInit && e._onInit(e);
  }
  e._onUpdate = c, e._initted = (!e._op || e._pt) && !Y, f && t <= 0 && w.render($t, !0, !0);
}, Bh = function(e, t, r, n, a, o, s, l) {
  var c = (e._pt && e._ptCache || (e._ptCache = {}))[t], d, p, f, v;
  if (!c)
    for (c = e._ptCache[t] = [], f = e._ptLookup, v = e._targets.length; v--; ) {
      if (d = f[v][t], d && d.d && d.d._pt)
        for (d = d.d._pt; d && d.p !== t && d.fp !== t; )
          d = d._next;
      if (!d)
        return al = 1, e.vars[t] = "+=0", _l(e, s), al = 0, l ? Ma(t + " not eligible for reset") : 1;
      c.push(d);
    }
  for (v = c.length; v--; )
    p = c[v], d = p._pt || p, d.s = (n || n === 0) && !a ? n : d.s + (n || 0) + o * d.c, d.c = r - d.s, p.e && (p.e = Ve(r) + at(p.e)), p.b && (p.b = d.s + at(p.b));
}, Uh = function(e, t) {
  var r = e[0] ? Ki(e[0]).harness : 0, n = r && r.aliases, a, o, s, l;
  if (!n)
    return t;
  a = jn({}, t);
  for (o in n)
    if (o in a)
      for (l = n[o].split(","), s = l.length; s--; )
        a[l[s]] = a[o];
  return a;
}, Gh = function(e, t, r, n) {
  var a = t.ease || n || "power1.inOut", o, s;
  if (ot(t))
    s = r[e] || (r[e] = []), t.forEach(function(l, c) {
      return s.push({
        t: c / (t.length - 1) * 100,
        v: l,
        e: a
      });
    });
  else
    for (o in t)
      s = r[o] || (r[o] = []), o === "ease" || s.push({
        t: parseFloat(e),
        v: t[o],
        e: a
      });
}, za = function(e, t, r, n, a) {
  return Pe(e) ? e.call(t, r, n, a) : Ke(e) && ~e.indexOf("random(") ? Oa(e) : e;
}, Ep = Vl + "repeat,repeatDelay,yoyo,repeatRefresh,yoyoEase,autoRevert", Tp = {};
Tt(Ep + ",id,stagger,delay,duration,paused,scrollTrigger", function(i) {
  return Tp[i] = 1;
});
var _e = /* @__PURE__ */ function(i) {
  Xd(e, i);
  function e(r, n, a, o) {
    var s;
    typeof n == "number" && (a.duration = n, n = a, a = null), s = i.call(this, o ? n : Aa(n)) || this;
    var l = s.vars, c = l.duration, d = l.delay, p = l.immediateRender, f = l.stagger, v = l.overwrite, g = l.keyframes, u = l.defaults, m = l.scrollTrigger, x = l.yoyoEase, A = n.parent || Te, b = (ot(r) || Kd(r) ? Hr(r[0]) : "length" in n) ? [r] : er(r), w, y, T, M, I, z, N, _;
    if (s._targets = b.length ? Nl(b) : Ma("GSAP target " + r + " not found. https://gsap.com", !Gt.nullTargetWarn) || [], s._ptLookup = [], s._overwrite = v, g || f || fo(c) || fo(d)) {
      if (n = s.vars, w = s.timeline = new mt({
        data: "nested",
        defaults: u || {},
        targets: A && A.data === "nested" ? A.vars.targets : b
      }), w.kill(), w.parent = w._dp = Br(s), w._start = 0, f || fo(c) || fo(d)) {
        if (M = b.length, N = f && pp(f), Rr(f))
          for (I in f)
            ~Ep.indexOf(I) && (_ || (_ = {}), _[I] = f[I]);
        for (y = 0; y < M; y++)
          T = Eo(n, Tp), T.stagger = 0, x && (T.yoyoEase = x), _ && jn(T, _), z = b[y], T.duration = +za(c, Br(s), y, z, b), T.delay = (+za(d, Br(s), y, z, b) || 0) - s._delay, !f && M === 1 && T.delay && (s._delay = d = T.delay, s._start += d, T.delay = 0), w.to(z, T, N ? N(y, z, b) : 0), w._ease = ae.none;
        w.duration() ? c = d = 0 : s.timeline = 0;
      } else if (g) {
        Aa(Zt(w.vars.defaults, {
          ease: "none"
        })), w._ease = Qi(g.ease || n.ease || "none");
        var L = 0, Q, oe, de;
        if (ot(g))
          g.forEach(function(O) {
            return w.to(b, O, ">");
          }), w.duration();
        else {
          T = {};
          for (I in g)
            I === "ease" || I === "easeEach" || Gh(I, g[I], T, g.easeEach);
          for (I in T)
            for (Q = T[I].sort(function(O, Y) {
              return O.t - Y.t;
            }), L = 0, y = 0; y < Q.length; y++)
              oe = Q[y], de = {
                ease: oe.e,
                duration: (oe.t - (y ? Q[y - 1].t : 0)) / 100 * c
              }, de[I] = oe.v, w.to(b, de, L), L += de.duration;
          w.duration() < c && w.to({}, {
            duration: c - w.duration()
          });
        }
      }
      c || s.duration(c = w.duration());
    } else
      s.timeline = 0;
    return v === !0 && !Il && (pi = Br(s), Te.killTweensOf(b), pi = 0), Ir(A, Br(s), a), n.reversed && s.reverse(), n.paused && s.paused(!0), (p || !c && !g && s._start === Ee(A._time) && Et(p) && kh(Br(s)) && A.data !== "nested") && (s._tTime = -xe, s.render(Math.max(0, -d) || 0)), m && sp(Br(s), m), s;
  }
  var t = e.prototype;
  return t.render = function(n, a, o) {
    var s = this._time, l = this._tDur, c = this._dur, d = n < 0, p = n > l - xe && !d ? l : n < xe ? 0 : n, f, v, g, u, m, x, A, b, w;
    if (!c)
      Sh(this, n, a, o);
    else if (p !== this._tTime || !n || o || !this._initted && this._tTime || this._startAt && this._zTime < 0 !== d || this._lazy) {
      if (f = p, b = this.timeline, this._repeat) {
        if (u = c + this._rDelay, this._repeat < -1 && d)
          return this.totalTime(u * 100 + n, a, o);
        if (f = Ee(p % u), p === l ? (g = this._repeat, f = c) : (m = Ee(p / u), g = ~~m, g && g === m ? (f = c, g--) : f > c && (f = c)), x = this._yoyo && g & 1, x && (w = this._yEase, f = c - f), m = Bn(this._tTime, u), f === s && !o && this._initted && g === m)
          return this._tTime = p, this;
        g !== m && (b && this._yEase && kp(b, x), this.vars.repeatRefresh && !x && !this._lock && f !== u && this._initted && (this._lock = o = 1, this.render(Ee(u * g), !0).invalidate()._lock = 0));
      }
      if (!this._initted) {
        if (lp(this, d ? n : f, o, a, p))
          return this._tTime = 0, this;
        if (s !== this._time && !(o && this.vars.repeatRefresh && g !== m))
          return this;
        if (c !== this._dur)
          return this.render(n, a, o);
      }
      if (this._tTime = p, this._time = f, !this._act && this._ts && (this._act = 1, this._lazy = 0), this.ratio = A = (w || this._ease)(f / c), this._from && (this.ratio = A = 1 - A), !s && p && !a && !m && (jt(this, "onStart"), this._tTime !== p))
        return this;
      for (v = this._pt; v; )
        v.r(A, v.d), v = v._next;
      b && b.render(n < 0 ? n : b._dur * b._ease(f / this._dur), a, o) || this._startAt && (this._zTime = n), this._onUpdate && !a && (d && el(this, n, a, o), jt(this, "onUpdate")), this._repeat && g !== m && this.vars.onRepeat && !a && this.parent && jt(this, "onRepeat"), (p === this._tDur || !p) && this._tTime === p && (d && !this._onUpdate && el(this, n, !0, !0), (n || !c) && (p === this._tDur && this._ts > 0 || !p && this._ts < 0) && wi(this, 1), !a && !(d && !s) && (p || s || x) && (jt(this, p === l ? "onComplete" : "onReverseComplete", !0), this._prom && !(p < l && this.timeScale() > 0) && this._prom()));
    }
    return this;
  }, t.targets = function() {
    return this._targets;
  }, t.invalidate = function(n) {
    return (!n || !this.vars.runBackwards) && (this._startAt = 0), this._pt = this._op = this._onUpdate = this._lazy = this.ratio = 0, this._ptLookup = [], this.timeline && this.timeline.invalidate(n), i.prototype.invalidate.call(this, n);
  }, t.resetTo = function(n, a, o, s, l) {
    Ca || Ft.wake(), this._ts || this.play();
    var c = Math.min(this._dur, (this._dp._time - this._start) * this._ts), d;
    return this._initted || _l(this, c), d = this._ease(c / this._dur), Bh(this, n, a, o, s, d, c, l) ? this.resetTo(n, a, o, s, 1) : (Fo(this, 0), this.parent || ap(this._dp, this, "_first", "_last", this._dp._sort ? "_start" : 0), this.render(0));
  }, t.kill = function(n, a) {
    if (a === void 0 && (a = "all"), !n && (!a || a === "all"))
      return this._lazy = this._pt = 0, this.parent ? ba(this) : this.scrollTrigger && this.scrollTrigger.kill(!!et), this;
    if (this.timeline) {
      var o = this.timeline.totalDuration();
      return this.timeline.killTweensOf(n, a, pi && pi.vars.overwrite !== !0)._first || ba(this), this.parent && o !== this.timeline.totalDuration() && Un(this, this._dur * this.timeline._tDur / o, 0, 1), this;
    }
    var s = this._targets, l = n ? er(n) : s, c = this._ptLookup, d = this._pt, p, f, v, g, u, m, x;
    if ((!a || a === "all") && yh(s, l))
      return a === "all" && (this._pt = 0), ba(this);
    for (p = this._op = this._op || [], a !== "all" && (Ke(a) && (u = {}, Tt(a, function(A) {
      return u[A] = 1;
    }), a = u), a = Uh(s, a)), x = s.length; x--; )
      if (~l.indexOf(s[x])) {
        f = c[x], a === "all" ? (p[x] = a, g = f, v = {}) : (v = p[x] = p[x] || {}, g = a);
        for (u in g)
          m = f && f[u], m && ((!("kill" in m.d) || m.d.kill(u) === !0) && _o(this, m, "_pt"), delete f[u]), v !== "all" && (v[u] = 1);
      }
    return this._initted && !this._pt && d && ba(this), this;
  }, e.to = function(n, a) {
    return new e(n, a, arguments[2]);
  }, e.from = function(n, a) {
    return Sa(1, arguments);
  }, e.delayedCall = function(n, a, o, s) {
    return new e(a, 0, {
      immediateRender: !1,
      lazy: !1,
      overwrite: !1,
      delay: n,
      onComplete: a,
      onReverseComplete: a,
      onCompleteParams: o,
      onReverseCompleteParams: o,
      callbackScope: s
    });
  }, e.fromTo = function(n, a, o) {
    return Sa(2, arguments);
  }, e.set = function(n, a) {
    return a.duration = 0, a.repeatDelay || (a.repeat = 0), new e(n, a);
  }, e.killTweensOf = function(n, a, o) {
    return Te.killTweensOf(n, a, o);
  }, e;
}(Pa);
Zt(_e.prototype, {
  _targets: [],
  _lazy: 0,
  _startAt: 0,
  _op: 0,
  _onInit: 0
});
Tt("staggerTo,staggerFrom,staggerFromTo", function(i) {
  _e[i] = function() {
    var e = new mt(), t = rl.call(arguments, 0);
    return t.splice(i === "staggerFromTo" ? 5 : 4, 0, 0), e[i].apply(e, t);
  };
});
var Dl = function(e, t, r) {
  return e[t] = r;
}, Mp = function(e, t, r) {
  return e[t](r);
}, Xh = function(e, t, r, n) {
  return e[t](n.fp, r);
}, Zh = function(e, t, r) {
  return e.setAttribute(t, r);
}, Fl = function(e, t) {
  return Pe(e[t]) ? Mp : Ol(e[t]) && e.setAttribute ? Zh : Dl;
}, Ip = function(e, t) {
  return t.set(t.t, t.p, Math.round((t.s + t.c * e) * 1e6) / 1e6, t);
}, Kh = function(e, t) {
  return t.set(t.t, t.p, !!(t.s + t.c * e), t);
}, Op = function(e, t) {
  var r = t._pt, n = "";
  if (!e && t.b)
    n = t.b;
  else if (e === 1 && t.e)
    n = t.e;
  else {
    for (; r; )
      n = r.p + (r.m ? r.m(r.s + r.c * e) : Math.round((r.s + r.c * e) * 1e4) / 1e4) + n, r = r._next;
    n += t.c;
  }
  t.set(t.t, t.p, n, t);
}, jl = function(e, t) {
  for (var r = t._pt; r; )
    r.r(e, r.d), r = r._next;
}, Hh = function(e, t, r, n) {
  for (var a = this._pt, o; a; )
    o = a._next, a.p === n && a.modifier(e, t, r), a = o;
}, Qh = function(e) {
  for (var t = this._pt, r, n; t; )
    n = t._next, t.p === e && !t.op || t.op === e ? _o(this, t, "_pt") : t.dep || (r = 1), t = n;
  return !r;
}, Wh = function(e, t, r, n) {
  n.mSet(e, t, n.m.call(n.tween, r, n.mt), n);
}, Cp = function(e) {
  for (var t = e._pt, r, n, a, o; t; ) {
    for (r = t._next, n = a; n && n.pr > t.pr; )
      n = n._next;
    (t._prev = n ? n._prev : o) ? t._prev._next = t : a = t, (t._next = n) ? n._prev = t : o = t, t = r;
  }
  e._pt = a;
}, Mt = /* @__PURE__ */ function() {
  function i(t, r, n, a, o, s, l, c, d) {
    this.t = r, this.s = a, this.c = o, this.p = n, this.r = s || Ip, this.d = l || this, this.set = c || Dl, this.pr = d || 0, this._next = t, t && (t._prev = this);
  }
  var e = i.prototype;
  return e.modifier = function(r, n, a) {
    this.mSet = this.mSet || this.set, this.set = Wh, this.m = r, this.mt = a, this.tween = n;
  }, i;
}();
Tt(Vl + "parent,duration,ease,delay,overwrite,runBackwards,startAt,yoyo,immediateRender,repeat,repeatDelay,data,paused,reversed,lazy,callbackScope,stringFilter,id,yoyoEase,stagger,inherit,repeatRefresh,keyframes,autoRevert,scrollTrigger", function(i) {
  return Rl[i] = 1;
});
Xt.TweenMax = Xt.TweenLite = _e;
Xt.TimelineLite = Xt.TimelineMax = mt;
Te = new mt({
  sortChildren: !1,
  defaults: Fn,
  autoRemoveChildren: !0,
  id: "root",
  smoothChildTiming: !0
});
Gt.stringFilter = yp;
var Wi = [], yo = {}, Jh = [], Sc = 0, $h = 0, Ms = function(e) {
  return (yo[e] || Jh).map(function(t) {
    return t();
  });
}, ol = function() {
  var e = Date.now(), t = [];
  e - Sc > 2 && (Ms("matchMediaInit"), Wi.forEach(function(r) {
    var n = r.queries, a = r.conditions, o, s, l, c;
    for (s in n)
      o = Sr.matchMedia(n[s]).matches, o && (l = 1), o !== a[s] && (a[s] = o, c = 1);
    c && (r.revert(), l && t.push(r));
  }), Ms("matchMediaRevert"), t.forEach(function(r) {
    return r.onMatch(r, function(n) {
      return r.add(null, n);
    });
  }), Sc = e, Ms("matchMedia"));
}, Pp = /* @__PURE__ */ function() {
  function i(t, r) {
    this.selector = r && il(r), this.data = [], this._r = [], this.isReverted = !1, this.id = $h++, t && this.add(t);
  }
  var e = i.prototype;
  return e.add = function(r, n, a) {
    Pe(r) && (a = n, n = r, r = Pe);
    var o = this, s = function() {
      var c = Ae, d = o.selector, p;
      return c && c !== o && c.data.push(o), a && (o.selector = il(a)), Ae = o, p = n.apply(o, arguments), Pe(p) && o._r.push(p), Ae = c, o.selector = d, o.isReverted = !1, p;
    };
    return o.last = s, r === Pe ? s(o, function(l) {
      return o.add(null, l);
    }) : r ? o[r] = s : s;
  }, e.ignore = function(r) {
    var n = Ae;
    Ae = null, r(this), Ae = n;
  }, e.getTweens = function() {
    var r = [];
    return this.data.forEach(function(n) {
      return n instanceof i ? r.push.apply(r, n.getTweens()) : n instanceof _e && !(n.parent && n.parent.data === "nested") && r.push(n);
    }), r;
  }, e.clear = function() {
    this._r.length = this.data.length = 0;
  }, e.kill = function(r, n) {
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
        c = a.data[l], c instanceof mt ? c.data !== "nested" && (c.scrollTrigger && c.scrollTrigger.revert(), c.kill()) : !(c instanceof _e) && c.revert && c.revert(r);
      a._r.forEach(function(d) {
        return d(r, a);
      }), a.isReverted = !0;
    }() : this.data.forEach(function(s) {
      return s.kill && s.kill();
    }), this.clear(), n)
      for (var o = Wi.length; o--; )
        Wi[o].id === this.id && Wi.splice(o, 1);
  }, e.revert = function(r) {
    this.kill(r || {});
  }, i;
}(), eg = /* @__PURE__ */ function() {
  function i(t) {
    this.contexts = [], this.scope = t, Ae && Ae.data.push(this);
  }
  var e = i.prototype;
  return e.add = function(r, n, a) {
    Rr(r) || (r = {
      matches: r
    });
    var o = new Pp(0, a || this.scope), s = o.conditions = {}, l, c, d;
    Ae && !o.selector && (o.selector = Ae.selector), this.contexts.push(o), n = o.add("onMatch", n), o.queries = r;
    for (c in r)
      c === "all" ? d = 1 : (l = Sr.matchMedia(r[c]), l && (Wi.indexOf(o) < 0 && Wi.push(o), (s[c] = l.matches) && (d = 1), l.addListener ? l.addListener(ol) : l.addEventListener("change", ol)));
    return d && n(o, function(p) {
      return o.add(null, p);
    }), this;
  }, e.revert = function(r) {
    this.kill(r || {});
  }, e.kill = function(r) {
    this.contexts.forEach(function(n) {
      return n.kill(r, !0);
    });
  }, i;
}(), Mo = {
  registerPlugin: function() {
    for (var e = arguments.length, t = new Array(e), r = 0; r < e; r++)
      t[r] = arguments[r];
    t.forEach(function(n) {
      return vp(n);
    });
  },
  timeline: function(e) {
    return new mt(e);
  },
  getTweensOf: function(e, t) {
    return Te.getTweensOf(e, t);
  },
  getProperty: function(e, t, r, n) {
    Ke(e) && (e = er(e)[0]);
    var a = Ki(e || {}).get, o = r ? np : ip;
    return r === "native" && (r = ""), e && (t ? o((Dt[t] && Dt[t].get || a)(e, t, r, n)) : function(s, l, c) {
      return o((Dt[s] && Dt[s].get || a)(e, s, l, c));
    });
  },
  quickSetter: function(e, t, r) {
    if (e = er(e), e.length > 1) {
      var n = e.map(function(d) {
        return Ct.quickSetter(d, t, r);
      }), a = n.length;
      return function(d) {
        for (var p = a; p--; )
          n[p](d);
      };
    }
    e = e[0] || {};
    var o = Dt[t], s = Ki(e), l = s.harness && (s.harness.aliases || {})[t] || t, c = o ? function(d) {
      var p = new o();
      kn._pt = 0, p.init(e, r ? d + r : d, kn, 0, [e]), p.render(1, p), kn._pt && jl(1, kn);
    } : s.set(e, l);
    return o ? c : function(d) {
      return c(e, l, r ? d + r : d, s, 1);
    };
  },
  quickTo: function(e, t, r) {
    var n, a = Ct.to(e, Zt((n = {}, n[t] = "+=0.1", n.paused = !0, n.stagger = 0, n), r || {})), o = function(l, c, d) {
      return a.resetTo(t, l, c, d);
    };
    return o.tween = a, o;
  },
  isTweening: function(e) {
    return Te.getTweensOf(e, !0).length > 0;
  },
  defaults: function(e) {
    return e && e.ease && (e.ease = Qi(e.ease, Fn.ease)), xc(Fn, e || {});
  },
  config: function(e) {
    return xc(Gt, e || {});
  },
  registerEffect: function(e) {
    var t = e.name, r = e.effect, n = e.plugins, a = e.defaults, o = e.extendTimeline;
    (n || "").split(",").forEach(function(s) {
      return s && !Dt[s] && !Xt[s] && Ma(t + " effect requires " + s + " plugin.");
    }), Ss[t] = function(s, l, c) {
      return r(er(s), Zt(l || {}, a), c);
    }, o && (mt.prototype[t] = function(s, l, c) {
      return this.add(Ss[t](s, Rr(l) ? l : (c = l) && {}, this), c);
    });
  },
  registerEase: function(e, t) {
    ae[e] = Qi(t);
  },
  parseEase: function(e, t) {
    return arguments.length ? Qi(e, t) : ae;
  },
  getById: function(e) {
    return Te.getById(e);
  },
  exportRoot: function(e, t) {
    e === void 0 && (e = {});
    var r = new mt(e), n, a;
    for (r.smoothChildTiming = Et(e.smoothChildTiming), Te.remove(r), r._dp = 0, r._time = r._tTime = Te._time, n = Te._first; n; )
      a = n._next, (t || !(!n._dur && n instanceof _e && n.vars.onComplete === n._targets[0])) && Ir(r, n, n._start - n._delay), n = a;
    return Ir(Te, r, 0), r;
  },
  context: function(e, t) {
    return e ? new Pp(e, t) : Ae;
  },
  matchMedia: function(e) {
    return new eg(e);
  },
  matchMediaRefresh: function() {
    return Wi.forEach(function(e) {
      var t = e.conditions, r, n;
      for (n in t)
        t[n] && (t[n] = !1, r = 1);
      r && e.revert();
    }) || ol();
  },
  addEventListener: function(e, t) {
    var r = yo[e] || (yo[e] = []);
    ~r.indexOf(t) || r.push(t);
  },
  removeEventListener: function(e, t) {
    var r = yo[e], n = r && r.indexOf(t);
    n >= 0 && r.splice(n, 1);
  },
  utils: {
    wrap: Ph,
    wrapYoyo: qh,
    distribute: pp,
    random: up,
    snap: fp,
    normalize: Ch,
    getUnit: at,
    clamp: Th,
    splitColor: bp,
    toArray: er,
    selector: il,
    mapRange: gp,
    pipe: Ih,
    unitize: Oh,
    interpolate: Rh,
    shuffle: dp
  },
  install: Jd,
  effects: Ss,
  ticker: Ft,
  updateRoot: mt.updateRoot,
  plugins: Dt,
  globalTimeline: Te,
  core: {
    PropTween: Mt,
    globals: $d,
    Tween: _e,
    Timeline: mt,
    Animation: Pa,
    getCache: Ki,
    _removeLinkedListItem: _o,
    reverting: function() {
      return et;
    },
    context: function(e) {
      return e && Ae && (Ae.data.push(e), e._ctx = Ae), Ae;
    },
    suppressOverwrites: function(e) {
      return Il = e;
    }
  }
};
Tt("to,from,fromTo,delayedCall,set,killTweensOf", function(i) {
  return Mo[i] = _e[i];
});
Ft.add(mt.updateRoot);
kn = Mo.to({}, {
  duration: 0
});
var tg = function(e, t) {
  for (var r = e._pt; r && r.p !== t && r.op !== t && r.fp !== t; )
    r = r._next;
  return r;
}, rg = function(e, t) {
  var r = e._targets, n, a, o;
  for (n in t)
    for (a = r.length; a--; )
      o = e._ptLookup[a][n], o && (o = o.d) && (o._pt && (o = tg(o, n)), o && o.modifier && o.modifier(t[n], e, r[a], n));
}, Is = function(e, t) {
  return {
    name: e,
    headless: 1,
    rawVars: 1,
    //don't pre-process function-based values or "random()" strings.
    init: function(n, a, o) {
      o._onInit = function(s) {
        var l, c;
        if (Ke(a) && (l = {}, Tt(a, function(d) {
          return l[d] = 1;
        }), a = l), t) {
          l = {};
          for (c in a)
            l[c] = t(a[c]);
          a = l;
        }
        rg(s, a);
      };
    }
  };
}, Ct = Mo.registerPlugin({
  name: "attr",
  init: function(e, t, r, n, a) {
    var o, s, l;
    this.tween = r;
    for (o in t)
      l = e.getAttribute(o) || "", s = this.add(e, "setAttribute", (l || 0) + "", t[o], n, a, 0, 0, o), s.op = o, s.b = l, this._props.push(o);
  },
  render: function(e, t) {
    for (var r = t._pt; r; )
      et ? r.set(r.t, r.p, r.b, r) : r.r(e, r.d), r = r._next;
  }
}, {
  name: "endArray",
  headless: 1,
  init: function(e, t) {
    for (var r = t.length; r--; )
      this.add(e, r, e[r] || 0, t[r], 0, 0, 0, 0, 0, 1);
  }
}, Is("roundProps", nl), Is("modifiers"), Is("snap", fp)) || Mo;
_e.version = mt.version = Ct.version = "3.14.2";
Wd = 1;
Cl() && Gn();
ae.Power0;
ae.Power1;
ae.Power2;
ae.Power3;
ae.Power4;
ae.Linear;
ae.Quad;
ae.Cubic;
ae.Quart;
ae.Quint;
ae.Strong;
ae.Elastic;
ae.Back;
ae.SteppedEase;
ae.Bounce;
ae.Sine;
ae.Expo;
ae.Circ;
/*!
 * CSSPlugin 3.14.2
 * https://gsap.com
 *
 * Copyright 2008-2025, GreenSock. All rights reserved.
 * Subject to the terms at https://gsap.com/standard-license
 * @author: Jack Doyle, jack@greensock.com
*/
var zc, fi, Sn, Bl, ji, Ec, Ul, ig = function() {
  return typeof window < "u";
}, Qr = {}, Li = 180 / Math.PI, zn = Math.PI / 180, mn = Math.atan2, Tc = 1e8, Gl = /([A-Z])/g, ng = /(left|right|width|margin|padding|x)/i, ag = /[\s,\(]\S/, Cr = {
  autoAlpha: "opacity,visibility",
  scale: "scaleX,scaleY",
  alpha: "opacity"
}, sl = function(e, t) {
  return t.set(t.t, t.p, Math.round((t.s + t.c * e) * 1e4) / 1e4 + t.u, t);
}, og = function(e, t) {
  return t.set(t.t, t.p, e === 1 ? t.e : Math.round((t.s + t.c * e) * 1e4) / 1e4 + t.u, t);
}, sg = function(e, t) {
  return t.set(t.t, t.p, e ? Math.round((t.s + t.c * e) * 1e4) / 1e4 + t.u : t.b, t);
}, lg = function(e, t) {
  return t.set(t.t, t.p, e === 1 ? t.e : e ? Math.round((t.s + t.c * e) * 1e4) / 1e4 + t.u : t.b, t);
}, cg = function(e, t) {
  var r = t.s + t.c * e;
  t.set(t.t, t.p, ~~(r + (r < 0 ? -0.5 : 0.5)) + t.u, t);
}, qp = function(e, t) {
  return t.set(t.t, t.p, e ? t.e : t.b, t);
}, Rp = function(e, t) {
  return t.set(t.t, t.p, e !== 1 ? t.b : t.e, t);
}, dg = function(e, t, r) {
  return e.style[t] = r;
}, pg = function(e, t, r) {
  return e.style.setProperty(t, r);
}, fg = function(e, t, r) {
  return e._gsap[t] = r;
}, ug = function(e, t, r) {
  return e._gsap.scaleX = e._gsap.scaleY = r;
}, hg = function(e, t, r, n, a) {
  var o = e._gsap;
  o.scaleX = o.scaleY = r, o.renderTransform(a, o);
}, gg = function(e, t, r, n, a) {
  var o = e._gsap;
  o[t] = r, o.renderTransform(a, o);
}, Me = "transform", It = Me + "Origin", mg = function i(e, t) {
  var r = this, n = this.target, a = n.style, o = n._gsap;
  if (e in Qr && a) {
    if (this.tfm = this.tfm || {}, e !== "transform")
      e = Cr[e] || e, ~e.indexOf(",") ? e.split(",").forEach(function(s) {
        return r.tfm[s] = Gr(n, s);
      }) : this.tfm[e] = o.x ? o[e] : Gr(n, e), e === It && (this.tfm.zOrigin = o.zOrigin);
    else
      return Cr.transform.split(",").forEach(function(s) {
        return i.call(r, s, t);
      });
    if (this.props.indexOf(Me) >= 0)
      return;
    o.svg && (this.svgo = n.getAttribute("data-svg-origin"), this.props.push(It, t, "")), e = Me;
  }
  (a || t) && this.props.push(e, t, a[e]);
}, Vp = function(e) {
  e.translate && (e.removeProperty("translate"), e.removeProperty("scale"), e.removeProperty("rotate"));
}, vg = function() {
  var e = this.props, t = this.target, r = t.style, n = t._gsap, a, o;
  for (a = 0; a < e.length; a += 3)
    e[a + 1] ? e[a + 1] === 2 ? t[e[a]](e[a + 2]) : t[e[a]] = e[a + 2] : e[a + 2] ? r[e[a]] = e[a + 2] : r.removeProperty(e[a].substr(0, 2) === "--" ? e[a] : e[a].replace(Gl, "-$1").toLowerCase());
  if (this.tfm) {
    for (o in this.tfm)
      n[o] = this.tfm[o];
    n.svg && (n.renderTransform(), t.setAttribute("data-svg-origin", this.svgo || "")), a = Ul(), (!a || !a.isStart) && !r[Me] && (Vp(r), n.zOrigin && r[It] && (r[It] += " " + n.zOrigin + "px", n.zOrigin = 0, n.renderTransform()), n.uncache = 1);
  }
}, Np = function(e, t) {
  var r = {
    target: e,
    props: [],
    revert: vg,
    save: mg
  };
  return e._gsap || Ct.core.getCache(e), t && e.style && e.nodeType && t.split(",").forEach(function(n) {
    return r.save(n);
  }), r;
}, Yp, ll = function(e, t) {
  var r = fi.createElementNS ? fi.createElementNS((t || "http://www.w3.org/1999/xhtml").replace(/^https/, "http"), e) : fi.createElement(e);
  return r && r.style ? r : fi.createElement(e);
}, Bt = function i(e, t, r) {
  var n = getComputedStyle(e);
  return n[t] || n.getPropertyValue(t.replace(Gl, "-$1").toLowerCase()) || n.getPropertyValue(t) || !r && i(e, Xn(t) || t, 1) || "";
}, Mc = "O,Moz,ms,Ms,Webkit".split(","), Xn = function(e, t, r) {
  var n = t || ji, a = n.style, o = 5;
  if (e in a && !r)
    return e;
  for (e = e.charAt(0).toUpperCase() + e.substr(1); o-- && !(Mc[o] + e in a); )
    ;
  return o < 0 ? null : (o === 3 ? "ms" : o >= 0 ? Mc[o] : "") + e;
}, cl = function() {
  ig() && window.document && (zc = window, fi = zc.document, Sn = fi.documentElement, ji = ll("div") || {
    style: {}
  }, ll("div"), Me = Xn(Me), It = Me + "Origin", ji.style.cssText = "border-width:0;line-height:0;position:absolute;padding:0", Yp = !!Xn("perspective"), Ul = Ct.core.reverting, Bl = 1);
}, Ic = function(e) {
  var t = e.ownerSVGElement, r = ll("svg", t && t.getAttribute("xmlns") || "http://www.w3.org/2000/svg"), n = e.cloneNode(!0), a;
  n.style.display = "block", r.appendChild(n), Sn.appendChild(r);
  try {
    a = n.getBBox();
  } catch {
  }
  return r.removeChild(n), Sn.removeChild(r), a;
}, Oc = function(e, t) {
  for (var r = t.length; r--; )
    if (e.hasAttribute(t[r]))
      return e.getAttribute(t[r]);
}, Lp = function(e) {
  var t, r;
  try {
    t = e.getBBox();
  } catch {
    t = Ic(e), r = 1;
  }
  return t && (t.width || t.height) || r || (t = Ic(e)), t && !t.width && !t.x && !t.y ? {
    x: +Oc(e, ["x", "cx", "x1"]) || 0,
    y: +Oc(e, ["y", "cy", "y1"]) || 0,
    width: 0,
    height: 0
  } : t;
}, _p = function(e) {
  return !!(e.getCTM && (!e.parentNode || e.ownerSVGElement) && Lp(e));
}, ki = function(e, t) {
  if (t) {
    var r = e.style, n;
    t in Qr && t !== It && (t = Me), r.removeProperty ? (n = t.substr(0, 2), (n === "ms" || t.substr(0, 6) === "webkit") && (t = "-" + t), r.removeProperty(n === "--" ? t : t.replace(Gl, "-$1").toLowerCase())) : r.removeAttribute(t);
  }
}, ui = function(e, t, r, n, a, o) {
  var s = new Mt(e._pt, t, r, 0, 1, o ? Rp : qp);
  return e._pt = s, s.b = n, s.e = a, e._props.push(r), s;
}, Cc = {
  deg: 1,
  rad: 1,
  turn: 1
}, bg = {
  grid: 1,
  flex: 1
}, Ai = function i(e, t, r, n) {
  var a = parseFloat(r) || 0, o = (r + "").trim().substr((a + "").length) || "px", s = ji.style, l = ng.test(t), c = e.tagName.toLowerCase() === "svg", d = (c ? "client" : "offset") + (l ? "Width" : "Height"), p = 100, f = n === "px", v = n === "%", g, u, m, x;
  if (n === o || !a || Cc[n] || Cc[o])
    return a;
  if (o !== "px" && !f && (a = i(e, t, r, "px")), x = e.getCTM && _p(e), (v || o === "%") && (Qr[t] || ~t.indexOf("adius")))
    return g = x ? e.getBBox()[l ? "width" : "height"] : e[d], Ve(v ? a / g * p : a / 100 * g);
  if (s[l ? "width" : "height"] = p + (f ? o : n), u = n !== "rem" && ~t.indexOf("adius") || n === "em" && e.appendChild && !c ? e : e.parentNode, x && (u = (e.ownerSVGElement || {}).parentNode), (!u || u === fi || !u.appendChild) && (u = fi.body), m = u._gsap, m && v && m.width && l && m.time === Ft.time && !m.uncache)
    return Ve(a / m.width * p);
  if (v && (t === "height" || t === "width")) {
    var A = e.style[t];
    e.style[t] = p + n, g = e[d], A ? e.style[t] = A : ki(e, t);
  } else
    (v || o === "%") && !bg[Bt(u, "display")] && (s.position = Bt(e, "position")), u === e && (s.position = "static"), u.appendChild(ji), g = ji[d], u.removeChild(ji), s.position = "absolute";
  return l && v && (m = Ki(u), m.time = Ft.time, m.width = u[d]), Ve(f ? g * a / p : g && a ? p / g * a : 0);
}, Gr = function(e, t, r, n) {
  var a;
  return Bl || cl(), t in Cr && t !== "transform" && (t = Cr[t], ~t.indexOf(",") && (t = t.split(",")[0])), Qr[t] && t !== "transform" ? (a = Ra(e, n), a = t !== "transformOrigin" ? a[t] : a.svg ? a.origin : Oo(Bt(e, It)) + " " + a.zOrigin + "px") : (a = e.style[t], (!a || a === "auto" || n || ~(a + "").indexOf("calc(")) && (a = Io[t] && Io[t](e, t, r) || Bt(e, t) || tp(e, t) || (t === "opacity" ? 1 : 0))), r && !~(a + "").trim().indexOf(" ") ? Ai(e, t, a, r) + r : a;
}, xg = function(e, t, r, n) {
  if (!r || r === "none") {
    var a = Xn(t, e, 1), o = a && Bt(e, a, 1);
    o && o !== r ? (t = a, r = o) : t === "borderColor" && (r = Bt(e, "borderTopColor"));
  }
  var s = new Mt(this._pt, e.style, t, 0, 1, Op), l = 0, c = 0, d, p, f, v, g, u, m, x, A, b, w, y;
  if (s.b = r, s.e = n, r += "", n += "", n.substring(0, 6) === "var(--" && (n = Bt(e, n.substring(4, n.indexOf(")")))), n === "auto" && (u = e.style[t], e.style[t] = n, n = Bt(e, t) || n, u ? e.style[t] = u : ki(e, t)), d = [r, n], yp(d), r = d[0], n = d[1], f = r.match(wn) || [], y = n.match(wn) || [], y.length) {
    for (; p = wn.exec(n); )
      m = p[0], A = n.substring(l, p.index), g ? g = (g + 1) % 5 : (A.substr(-5) === "rgba(" || A.substr(-5) === "hsla(") && (g = 1), m !== (u = f[c++] || "") && (v = parseFloat(u) || 0, w = u.substr((v + "").length), m.charAt(1) === "=" && (m = An(v, m) + w), x = parseFloat(m), b = m.substr((x + "").length), l = wn.lastIndex - b.length, b || (b = b || Gt.units[t] || w, l === n.length && (n += b, s.e += b)), w !== b && (v = Ai(e, t, u, b) || 0), s._pt = {
        _next: s._pt,
        p: A || c === 1 ? A : ",",
        //note: SVG spec allows omission of comma/space when a negative sign is wedged between two numbers, like 2.5-5.3 instead of 2.5,-5.3 but when tweening, the negative value may switch to positive, so we insert the comma just in case.
        s: v,
        c: x - v,
        m: g && g < 4 || t === "zIndex" ? Math.round : 0
      });
    s.c = l < n.length ? n.substring(l, n.length) : "";
  } else
    s.r = t === "display" && n === "none" ? Rp : qp;
  return Qd.test(n) && (s.e = 0), this._pt = s, s;
}, Pc = {
  top: "0%",
  bottom: "100%",
  left: "0%",
  right: "100%",
  center: "50%"
}, yg = function(e) {
  var t = e.split(" "), r = t[0], n = t[1] || "50%";
  return (r === "top" || r === "bottom" || n === "left" || n === "right") && (e = r, r = n, n = e), t[0] = Pc[r] || r, t[1] = Pc[n] || n, t.join(" ");
}, wg = function(e, t) {
  if (t.tween && t.tween._time === t.tween._dur) {
    var r = t.t, n = r.style, a = t.u, o = r._gsap, s, l, c;
    if (a === "all" || a === !0)
      n.cssText = "", l = 1;
    else
      for (a = a.split(","), c = a.length; --c > -1; )
        s = a[c], Qr[s] && (l = 1, s = s === "transformOrigin" ? It : Me), ki(r, s);
    l && (ki(r, Me), o && (o.svg && r.removeAttribute("transform"), n.scale = n.rotate = n.translate = "none", Ra(r, 1), o.uncache = 1, Vp(n)));
  }
}, Io = {
  clearProps: function(e, t, r, n, a) {
    if (a.data !== "isFromStart") {
      var o = e._pt = new Mt(e._pt, t, r, 0, 0, wg);
      return o.u = n, o.pr = -10, o.tween = a, e._props.push(r), 1;
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
}, qa = [1, 0, 0, 1, 0, 0], Dp = {}, Fp = function(e) {
  return e === "matrix(1, 0, 0, 1, 0, 0)" || e === "none" || !e;
}, qc = function(e) {
  var t = Bt(e, Me);
  return Fp(t) ? qa : t.substr(7).match(Hd).map(Ve);
}, Xl = function(e, t) {
  var r = e._gsap || Ki(e), n = e.style, a = qc(e), o, s, l, c;
  return r.svg && e.getAttribute("transform") ? (l = e.transform.baseVal.consolidate().matrix, a = [l.a, l.b, l.c, l.d, l.e, l.f], a.join(",") === "1,0,0,1,0,0" ? qa : a) : (a === qa && !e.offsetParent && e !== Sn && !r.svg && (l = n.display, n.display = "block", o = e.parentNode, (!o || !e.offsetParent && !e.getBoundingClientRect().width) && (c = 1, s = e.nextElementSibling, Sn.appendChild(e)), a = qc(e), l ? n.display = l : ki(e, "display"), c && (s ? o.insertBefore(e, s) : o ? o.appendChild(e) : Sn.removeChild(e))), t && a.length > 6 ? [a[0], a[1], a[4], a[5], a[12], a[13]] : a);
}, dl = function(e, t, r, n, a, o) {
  var s = e._gsap, l = a || Xl(e, !0), c = s.xOrigin || 0, d = s.yOrigin || 0, p = s.xOffset || 0, f = s.yOffset || 0, v = l[0], g = l[1], u = l[2], m = l[3], x = l[4], A = l[5], b = t.split(" "), w = parseFloat(b[0]) || 0, y = parseFloat(b[1]) || 0, T, M, I, z;
  r ? l !== qa && (M = v * m - g * u) && (I = w * (m / M) + y * (-u / M) + (u * A - m * x) / M, z = w * (-g / M) + y * (v / M) - (v * A - g * x) / M, w = I, y = z) : (T = Lp(e), w = T.x + (~b[0].indexOf("%") ? w / 100 * T.width : w), y = T.y + (~(b[1] || b[0]).indexOf("%") ? y / 100 * T.height : y)), n || n !== !1 && s.smooth ? (x = w - c, A = y - d, s.xOffset = p + (x * v + A * u) - x, s.yOffset = f + (x * g + A * m) - A) : s.xOffset = s.yOffset = 0, s.xOrigin = w, s.yOrigin = y, s.smooth = !!n, s.origin = t, s.originIsAbsolute = !!r, e.style[It] = "0px 0px", o && (ui(o, s, "xOrigin", c, w), ui(o, s, "yOrigin", d, y), ui(o, s, "xOffset", p, s.xOffset), ui(o, s, "yOffset", f, s.yOffset)), e.setAttribute("data-svg-origin", w + " " + y);
}, Ra = function(e, t) {
  var r = e._gsap || new Sp(e);
  if ("x" in r && !t && !r.uncache)
    return r;
  var n = e.style, a = r.scaleX < 0, o = "px", s = "deg", l = getComputedStyle(e), c = Bt(e, It) || "0", d, p, f, v, g, u, m, x, A, b, w, y, T, M, I, z, N, _, L, Q, oe, de, O, Y, V, j, D, F, Z, ze, le, pe;
  return d = p = f = u = m = x = A = b = w = 0, v = g = 1, r.svg = !!(e.getCTM && _p(e)), l.translate && ((l.translate !== "none" || l.scale !== "none" || l.rotate !== "none") && (n[Me] = (l.translate !== "none" ? "translate3d(" + (l.translate + " 0 0").split(" ").slice(0, 3).join(", ") + ") " : "") + (l.rotate !== "none" ? "rotate(" + l.rotate + ") " : "") + (l.scale !== "none" ? "scale(" + l.scale.split(" ").join(",") + ") " : "") + (l[Me] !== "none" ? l[Me] : "")), n.scale = n.rotate = n.translate = "none"), M = Xl(e, r.svg), r.svg && (r.uncache ? (V = e.getBBox(), c = r.xOrigin - V.x + "px " + (r.yOrigin - V.y) + "px", Y = "") : Y = !t && e.getAttribute("data-svg-origin"), dl(e, Y || c, !!Y || r.originIsAbsolute, r.smooth !== !1, M)), y = r.xOrigin || 0, T = r.yOrigin || 0, M !== qa && (_ = M[0], L = M[1], Q = M[2], oe = M[3], d = de = M[4], p = O = M[5], M.length === 6 ? (v = Math.sqrt(_ * _ + L * L), g = Math.sqrt(oe * oe + Q * Q), u = _ || L ? mn(L, _) * Li : 0, A = Q || oe ? mn(Q, oe) * Li + u : 0, A && (g *= Math.abs(Math.cos(A * zn))), r.svg && (d -= y - (y * _ + T * Q), p -= T - (y * L + T * oe))) : (pe = M[6], ze = M[7], D = M[8], F = M[9], Z = M[10], le = M[11], d = M[12], p = M[13], f = M[14], I = mn(pe, Z), m = I * Li, I && (z = Math.cos(-I), N = Math.sin(-I), Y = de * z + D * N, V = O * z + F * N, j = pe * z + Z * N, D = de * -N + D * z, F = O * -N + F * z, Z = pe * -N + Z * z, le = ze * -N + le * z, de = Y, O = V, pe = j), I = mn(-Q, Z), x = I * Li, I && (z = Math.cos(-I), N = Math.sin(-I), Y = _ * z - D * N, V = L * z - F * N, j = Q * z - Z * N, le = oe * N + le * z, _ = Y, L = V, Q = j), I = mn(L, _), u = I * Li, I && (z = Math.cos(I), N = Math.sin(I), Y = _ * z + L * N, V = de * z + O * N, L = L * z - _ * N, O = O * z - de * N, _ = Y, de = V), m && Math.abs(m) + Math.abs(u) > 359.9 && (m = u = 0, x = 180 - x), v = Ve(Math.sqrt(_ * _ + L * L + Q * Q)), g = Ve(Math.sqrt(O * O + pe * pe)), I = mn(de, O), A = Math.abs(I) > 2e-4 ? I * Li : 0, w = le ? 1 / (le < 0 ? -le : le) : 0), r.svg && (Y = e.getAttribute("transform"), r.forceCSS = e.setAttribute("transform", "") || !Fp(Bt(e, Me)), Y && e.setAttribute("transform", Y))), Math.abs(A) > 90 && Math.abs(A) < 270 && (a ? (v *= -1, A += u <= 0 ? 180 : -180, u += u <= 0 ? 180 : -180) : (g *= -1, A += A <= 0 ? 180 : -180)), t = t || r.uncache, r.x = d - ((r.xPercent = d && (!t && r.xPercent || (Math.round(e.offsetWidth / 2) === Math.round(-d) ? -50 : 0))) ? e.offsetWidth * r.xPercent / 100 : 0) + o, r.y = p - ((r.yPercent = p && (!t && r.yPercent || (Math.round(e.offsetHeight / 2) === Math.round(-p) ? -50 : 0))) ? e.offsetHeight * r.yPercent / 100 : 0) + o, r.z = f + o, r.scaleX = Ve(v), r.scaleY = Ve(g), r.rotation = Ve(u) + s, r.rotationX = Ve(m) + s, r.rotationY = Ve(x) + s, r.skewX = A + s, r.skewY = b + s, r.transformPerspective = w + o, (r.zOrigin = parseFloat(c.split(" ")[2]) || !t && r.zOrigin || 0) && (n[It] = Oo(c)), r.xOffset = r.yOffset = 0, r.force3D = Gt.force3D, r.renderTransform = r.svg ? Ag : Yp ? jp : kg, r.uncache = 0, r;
}, Oo = function(e) {
  return (e = e.split(" "))[0] + " " + e[1];
}, Os = function(e, t, r) {
  var n = at(t);
  return Ve(parseFloat(t) + parseFloat(Ai(e, "x", r + "px", n))) + n;
}, kg = function(e, t) {
  t.z = "0px", t.rotationY = t.rotationX = "0deg", t.force3D = 0, jp(e, t);
}, Ri = "0deg", fa = "0px", Vi = ") ", jp = function(e, t) {
  var r = t || this, n = r.xPercent, a = r.yPercent, o = r.x, s = r.y, l = r.z, c = r.rotation, d = r.rotationY, p = r.rotationX, f = r.skewX, v = r.skewY, g = r.scaleX, u = r.scaleY, m = r.transformPerspective, x = r.force3D, A = r.target, b = r.zOrigin, w = "", y = x === "auto" && e && e !== 1 || x === !0;
  if (b && (p !== Ri || d !== Ri)) {
    var T = parseFloat(d) * zn, M = Math.sin(T), I = Math.cos(T), z;
    T = parseFloat(p) * zn, z = Math.cos(T), o = Os(A, o, M * z * -b), s = Os(A, s, -Math.sin(T) * -b), l = Os(A, l, I * z * -b + b);
  }
  m !== fa && (w += "perspective(" + m + Vi), (n || a) && (w += "translate(" + n + "%, " + a + "%) "), (y || o !== fa || s !== fa || l !== fa) && (w += l !== fa || y ? "translate3d(" + o + ", " + s + ", " + l + ") " : "translate(" + o + ", " + s + Vi), c !== Ri && (w += "rotate(" + c + Vi), d !== Ri && (w += "rotateY(" + d + Vi), p !== Ri && (w += "rotateX(" + p + Vi), (f !== Ri || v !== Ri) && (w += "skew(" + f + ", " + v + Vi), (g !== 1 || u !== 1) && (w += "scale(" + g + ", " + u + Vi), A.style[Me] = w || "translate(0, 0)";
}, Ag = function(e, t) {
  var r = t || this, n = r.xPercent, a = r.yPercent, o = r.x, s = r.y, l = r.rotation, c = r.skewX, d = r.skewY, p = r.scaleX, f = r.scaleY, v = r.target, g = r.xOrigin, u = r.yOrigin, m = r.xOffset, x = r.yOffset, A = r.forceCSS, b = parseFloat(o), w = parseFloat(s), y, T, M, I, z;
  l = parseFloat(l), c = parseFloat(c), d = parseFloat(d), d && (d = parseFloat(d), c += d, l += d), l || c ? (l *= zn, c *= zn, y = Math.cos(l) * p, T = Math.sin(l) * p, M = Math.sin(l - c) * -f, I = Math.cos(l - c) * f, c && (d *= zn, z = Math.tan(c - d), z = Math.sqrt(1 + z * z), M *= z, I *= z, d && (z = Math.tan(d), z = Math.sqrt(1 + z * z), y *= z, T *= z)), y = Ve(y), T = Ve(T), M = Ve(M), I = Ve(I)) : (y = p, I = f, T = M = 0), (b && !~(o + "").indexOf("px") || w && !~(s + "").indexOf("px")) && (b = Ai(v, "x", o, "px"), w = Ai(v, "y", s, "px")), (g || u || m || x) && (b = Ve(b + g - (g * y + u * M) + m), w = Ve(w + u - (g * T + u * I) + x)), (n || a) && (z = v.getBBox(), b = Ve(b + n / 100 * z.width), w = Ve(w + a / 100 * z.height)), z = "matrix(" + y + "," + T + "," + M + "," + I + "," + b + "," + w + ")", v.setAttribute("transform", z), A && (v.style[Me] = z);
}, Sg = function(e, t, r, n, a) {
  var o = 360, s = Ke(a), l = parseFloat(a) * (s && ~a.indexOf("rad") ? Li : 1), c = l - n, d = n + c + "deg", p, f;
  return s && (p = a.split("_")[1], p === "short" && (c %= o, c !== c % (o / 2) && (c += c < 0 ? o : -o)), p === "cw" && c < 0 ? c = (c + o * Tc) % o - ~~(c / o) * o : p === "ccw" && c > 0 && (c = (c - o * Tc) % o - ~~(c / o) * o)), e._pt = f = new Mt(e._pt, t, r, n, c, og), f.e = d, f.u = "deg", e._props.push(r), f;
}, Rc = function(e, t) {
  for (var r in t)
    e[r] = t[r];
  return e;
}, zg = function(e, t, r) {
  var n = Rc({}, r._gsap), a = "perspective,force3D,transformOrigin,svgOrigin", o = r.style, s, l, c, d, p, f, v, g;
  n.svg ? (c = r.getAttribute("transform"), r.setAttribute("transform", ""), o[Me] = t, s = Ra(r, 1), ki(r, Me), r.setAttribute("transform", c)) : (c = getComputedStyle(r)[Me], o[Me] = t, s = Ra(r, 1), o[Me] = c);
  for (l in Qr)
    c = n[l], d = s[l], c !== d && a.indexOf(l) < 0 && (v = at(c), g = at(d), p = v !== g ? Ai(r, l, c, g) : parseFloat(c), f = parseFloat(d), e._pt = new Mt(e._pt, s, l, p, f - p, sl), e._pt.u = g || 0, e._props.push(l));
  Rc(s, n);
};
Tt("padding,margin,Width,Radius", function(i, e) {
  var t = "Top", r = "Right", n = "Bottom", a = "Left", o = (e < 3 ? [t, r, n, a] : [t + a, t + r, n + r, n + a]).map(function(s) {
    return e < 2 ? i + s : "border" + s + i;
  });
  Io[e > 1 ? "border" + i : i] = function(s, l, c, d, p) {
    var f, v;
    if (arguments.length < 4)
      return f = o.map(function(g) {
        return Gr(s, g, c);
      }), v = f.join(" "), v.split(f[0]).length === 5 ? f[0] : v;
    f = (d + "").split(" "), v = {}, o.forEach(function(g, u) {
      return v[g] = f[u] = f[u] || f[(u - 1) / 2 | 0];
    }), s.init(l, v, p);
  };
});
var Bp = {
  name: "css",
  register: cl,
  targetTest: function(e) {
    return e.style && e.nodeType;
  },
  init: function(e, t, r, n, a) {
    var o = this._props, s = e.style, l = r.vars.startAt, c, d, p, f, v, g, u, m, x, A, b, w, y, T, M, I, z;
    Bl || cl(), this.styles = this.styles || Np(e), I = this.styles.props, this.tween = r;
    for (u in t)
      if (u !== "autoRound" && (d = t[u], !(Dt[u] && zp(u, t, r, n, e, a)))) {
        if (v = typeof d, g = Io[u], v === "function" && (d = d.call(r, n, e, a), v = typeof d), v === "string" && ~d.indexOf("random(") && (d = Oa(d)), g)
          g(this, e, u, d, r) && (M = 1);
        else if (u.substr(0, 2) === "--")
          c = (getComputedStyle(e).getPropertyValue(u) + "").trim(), d += "", bi.lastIndex = 0, bi.test(c) || (m = at(c), x = at(d), x ? m !== x && (c = Ai(e, u, c, x) + x) : m && (d += m)), this.add(s, "setProperty", c, d, n, a, 0, 0, u), o.push(u), I.push(u, 0, s[u]);
        else if (v !== "undefined") {
          if (l && u in l ? (c = typeof l[u] == "function" ? l[u].call(r, n, e, a) : l[u], Ke(c) && ~c.indexOf("random(") && (c = Oa(c)), at(c + "") || c === "auto" || (c += Gt.units[u] || at(Gr(e, u)) || ""), (c + "").charAt(1) === "=" && (c = Gr(e, u))) : c = Gr(e, u), f = parseFloat(c), A = v === "string" && d.charAt(1) === "=" && d.substr(0, 2), A && (d = d.substr(2)), p = parseFloat(d), u in Cr && (u === "autoAlpha" && (f === 1 && Gr(e, "visibility") === "hidden" && p && (f = 0), I.push("visibility", 0, s.visibility), ui(this, s, "visibility", f ? "inherit" : "hidden", p ? "inherit" : "hidden", !p)), u !== "scale" && u !== "transform" && (u = Cr[u], ~u.indexOf(",") && (u = u.split(",")[0]))), b = u in Qr, b) {
            if (this.styles.save(u), z = d, v === "string" && d.substring(0, 6) === "var(--") {
              if (d = Bt(e, d.substring(4, d.indexOf(")"))), d.substring(0, 5) === "calc(") {
                var N = e.style.perspective;
                e.style.perspective = d, d = Bt(e, "perspective"), N ? e.style.perspective = N : ki(e, "perspective");
              }
              p = parseFloat(d);
            }
            if (w || (y = e._gsap, y.renderTransform && !t.parseTransform || Ra(e, t.parseTransform), T = t.smoothOrigin !== !1 && y.smooth, w = this._pt = new Mt(this._pt, s, Me, 0, 1, y.renderTransform, y, 0, -1), w.dep = 1), u === "scale")
              this._pt = new Mt(this._pt, y, "scaleY", y.scaleY, (A ? An(y.scaleY, A + p) : p) - y.scaleY || 0, sl), this._pt.u = 0, o.push("scaleY", u), u += "X";
            else if (u === "transformOrigin") {
              I.push(It, 0, s[It]), d = yg(d), y.svg ? dl(e, d, 0, T, 0, this) : (x = parseFloat(d.split(" ")[2]) || 0, x !== y.zOrigin && ui(this, y, "zOrigin", y.zOrigin, x), ui(this, s, u, Oo(c), Oo(d)));
              continue;
            } else if (u === "svgOrigin") {
              dl(e, d, 1, T, 0, this);
              continue;
            } else if (u in Dp) {
              Sg(this, y, u, f, A ? An(f, A + d) : d);
              continue;
            } else if (u === "smoothOrigin") {
              ui(this, y, "smooth", y.smooth, d);
              continue;
            } else if (u === "force3D") {
              y[u] = d;
              continue;
            } else if (u === "transform") {
              zg(this, d, e);
              continue;
            }
          } else u in s || (u = Xn(u) || u);
          if (b || (p || p === 0) && (f || f === 0) && !ag.test(d) && u in s)
            m = (c + "").substr((f + "").length), p || (p = 0), x = at(d) || (u in Gt.units ? Gt.units[u] : m), m !== x && (f = Ai(e, u, c, x)), this._pt = new Mt(this._pt, b ? y : s, u, f, (A ? An(f, A + p) : p) - f, !b && (x === "px" || u === "zIndex") && t.autoRound !== !1 ? cg : sl), this._pt.u = x || 0, b && z !== d ? (this._pt.b = c, this._pt.e = z, this._pt.r = lg) : m !== x && x !== "%" && (this._pt.b = c, this._pt.r = sg);
          else if (u in s)
            xg.call(this, e, u, c, A ? A + d : d);
          else if (u in e)
            this.add(e, u, c || e[u], A ? A + d : d, n, a);
          else if (u !== "parseTransform") {
            ql(u, d);
            continue;
          }
          b || (u in s ? I.push(u, 0, s[u]) : typeof e[u] == "function" ? I.push(u, 2, e[u]()) : I.push(u, 1, c || e[u])), o.push(u);
        }
      }
    M && Cp(this);
  },
  render: function(e, t) {
    if (t.tween._time || !Ul())
      for (var r = t._pt; r; )
        r.r(e, r.d), r = r._next;
    else
      t.styles.revert();
  },
  get: Gr,
  aliases: Cr,
  getSetter: function(e, t, r) {
    var n = Cr[t];
    return n && n.indexOf(",") < 0 && (t = n), t in Qr && t !== It && (e._gsap.x || Gr(e, "x")) ? r && Ec === r ? t === "scale" ? ug : fg : (Ec = r || {}) && (t === "scale" ? hg : gg) : e.style && !Ol(e.style[t]) ? dg : ~t.indexOf("-") ? pg : Fl(e, t);
  },
  core: {
    _removeProperty: ki,
    _getMatrix: Xl
  }
};
Ct.utils.checkPrefix = Xn;
Ct.core.getStyleSaver = Np;
(function(i, e, t, r) {
  var n = Tt(i + "," + e + "," + t, function(a) {
    Qr[a] = 1;
  });
  Tt(e, function(a) {
    Gt.units[a] = "deg", Dp[a] = 1;
  }), Cr[n[13]] = i + "," + e, Tt(r, function(a) {
    var o = a.split(":");
    Cr[o[1]] = n[o[0]];
  });
})("x,y,z,scale,scaleX,scaleY,xPercent,yPercent", "rotation,rotationX,rotationY,skewX,skewY", "transform,transformOrigin,svgOrigin,force3D,smoothOrigin,transformPerspective", "0:translateX,1:translateY,2:translateZ,8:rotate,8:rotationZ,8:rotateZ,9:rotateX,10:rotateY");
Tt("x,y,z,top,right,bottom,left,width,height,fontSize,padding,margin,perspective", function(i) {
  Gt.units[i] = "px";
});
Ct.registerPlugin(Bp);
var pl = Ct.registerPlugin(Bp) || Ct;
pl.core.Tween;
/**
 * @license lucide-svelte v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Eg = {
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
var Tg = /* @__PURE__ */ Nu("<svg><!><!></svg>");
function Ue(i, e) {
  const t = Ne(e, ["children", "$$slots", "$$events", "$$legacy"]), r = Ne(t, [
    "name",
    "color",
    "size",
    "strokeWidth",
    "absoluteStrokeWidth",
    "iconNode"
  ]);
  xl(e, !1);
  let n = Jt(e, "name", 8, void 0), a = Jt(e, "color", 8, "currentColor"), o = Jt(e, "size", 8, 24), s = Jt(e, "strokeWidth", 8, 2), l = Jt(e, "absoluteStrokeWidth", 8, !1), c = Jt(e, "iconNode", 24, () => []);
  const d = (...g) => g.filter((u, m, x) => !!u && x.indexOf(u) === m).join(" ");
  Gd();
  var p = Tg();
  uc(
    p,
    (g, u) => ({
      ...Eg,
      ...r,
      width: o(),
      height: o(),
      stroke: a(),
      "stroke-width": g,
      class: u
    }),
    [
      () => (hr(l()), hr(s()), hr(o()), P(() => l() ? Number(s()) * 24 / Number(o()) : s())),
      () => (hr(n()), hr(t), P(() => d("lucide-icon", "lucide", n() ? `lucide-${n()}` : "", t.class)))
    ]
  );
  var f = k(p);
  gt(f, 1, c, ht, (g, u) => {
    var m = /* @__PURE__ */ ou(() => hf(h(u), 2));
    let x = () => h(m)[0], A = () => h(m)[1];
    var b = we(), w = ie(b);
    Bu(w, x, !0, (y, T) => {
      uc(y, () => ({ ...A() }));
    }), q(g, b);
  });
  var v = S(f);
  De(v, e, "default", {}), q(i, p), yl();
}
function si(i, e) {
  const t = Ne(e, ["children", "$$slots", "$$events", "$$legacy"]);
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
  Ue(i, Be({ name: "arrow-left" }, () => t, {
    get iconNode() {
      return r;
    },
    children: (n, a) => {
      var o = we(), s = ie(o);
      De(s, e, "default", {}), q(n, o);
    },
    $$slots: { default: !0 }
  }));
}
function Ar(i, e) {
  const t = Ne(e, ["children", "$$slots", "$$events", "$$legacy"]);
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
  Ue(i, Be({ name: "arrow-up-left" }, () => t, {
    get iconNode() {
      return r;
    },
    children: (n, a) => {
      var o = we(), s = ie(o);
      De(s, e, "default", {}), q(n, o);
    },
    $$slots: { default: !0 }
  }));
}
function vn(i, e) {
  const t = Ne(e, ["children", "$$slots", "$$events", "$$legacy"]);
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
  Ue(i, Be({ name: "book-open" }, () => t, {
    get iconNode() {
      return r;
    },
    children: (n, a) => {
      var o = we(), s = ie(o);
      De(s, e, "default", {}), q(n, o);
    },
    $$slots: { default: !0 }
  }));
}
function Cs(i, e) {
  const t = Ne(e, ["children", "$$slots", "$$events", "$$legacy"]);
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
  Ue(i, Be({ name: "bookmark" }, () => t, {
    get iconNode() {
      return r;
    },
    children: (n, a) => {
      var o = we(), s = ie(o);
      De(s, e, "default", {}), q(n, o);
    },
    $$slots: { default: !0 }
  }));
}
function ua(i, e) {
  const t = Ne(e, ["children", "$$slots", "$$events", "$$legacy"]);
  /**
   * @license lucide-svelte v0.468.0 - ISC
   *
   * This source code is licensed under the ISC license.
   * See the LICENSE file in the root directory of this source tree.
   */
  const r = [["path", { d: "M20 6 9 17l-5-5" }]];
  Ue(i, Be({ name: "check" }, () => t, {
    get iconNode() {
      return r;
    },
    children: (n, a) => {
      var o = we(), s = ie(o);
      De(s, e, "default", {}), q(n, o);
    },
    $$slots: { default: !0 }
  }));
}
function Vc(i, e) {
  const t = Ne(e, ["children", "$$slots", "$$events", "$$legacy"]);
  /**
   * @license lucide-svelte v0.468.0 - ISC
   *
   * This source code is licensed under the ISC license.
   * See the LICENSE file in the root directory of this source tree.
   */
  const r = [["path", { d: "m15 18-6-6 6-6" }]];
  Ue(i, Be({ name: "chevron-left" }, () => t, {
    get iconNode() {
      return r;
    },
    children: (n, a) => {
      var o = we(), s = ie(o);
      De(s, e, "default", {}), q(n, o);
    },
    $$slots: { default: !0 }
  }));
}
function Mg(i, e) {
  const t = Ne(e, ["children", "$$slots", "$$events", "$$legacy"]);
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
  Ue(i, Be({ name: "compass" }, () => t, {
    get iconNode() {
      return r;
    },
    children: (n, a) => {
      var o = we(), s = ie(o);
      De(s, e, "default", {}), q(n, o);
    },
    $$slots: { default: !0 }
  }));
}
function Nc(i, e) {
  const t = Ne(e, ["children", "$$slots", "$$events", "$$legacy"]);
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
  Ue(i, Be({ name: "copy" }, () => t, {
    get iconNode() {
      return r;
    },
    children: (n, a) => {
      var o = we(), s = ie(o);
      De(s, e, "default", {}), q(n, o);
    },
    $$slots: { default: !0 }
  }));
}
function Ig(i, e) {
  const t = Ne(e, ["children", "$$slots", "$$events", "$$legacy"]);
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
  Ue(i, Be({ name: "download" }, () => t, {
    get iconNode() {
      return r;
    },
    children: (n, a) => {
      var o = we(), s = ie(o);
      De(s, e, "default", {}), q(n, o);
    },
    $$slots: { default: !0 }
  }));
}
function ha(i, e) {
  const t = Ne(e, ["children", "$$slots", "$$events", "$$legacy"]);
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
  Ue(i, Be({ name: "external-link" }, () => t, {
    get iconNode() {
      return r;
    },
    children: (n, a) => {
      var o = we(), s = ie(o);
      De(s, e, "default", {}), q(n, o);
    },
    $$slots: { default: !0 }
  }));
}
function Og(i, e) {
  const t = Ne(e, ["children", "$$slots", "$$events", "$$legacy"]);
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
  Ue(i, Be({ name: "file-text" }, () => t, {
    get iconNode() {
      return r;
    },
    children: (n, a) => {
      var o = we(), s = ie(o);
      De(s, e, "default", {}), q(n, o);
    },
    $$slots: { default: !0 }
  }));
}
function jr(i, e) {
  const t = Ne(e, ["children", "$$slots", "$$events", "$$legacy"]);
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
  Ue(i, Be({ name: "git-branch" }, () => t, {
    get iconNode() {
      return r;
    },
    children: (n, a) => {
      var o = we(), s = ie(o);
      De(s, e, "default", {}), q(n, o);
    },
    $$slots: { default: !0 }
  }));
}
function Ps(i, e) {
  const t = Ne(e, ["children", "$$slots", "$$events", "$$legacy"]);
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
  Ue(i, Be({ name: "layers" }, () => t, {
    get iconNode() {
      return r;
    },
    children: (n, a) => {
      var o = we(), s = ie(o);
      De(s, e, "default", {}), q(n, o);
    },
    $$slots: { default: !0 }
  }));
}
function Cg(i, e) {
  const t = Ne(e, ["children", "$$slots", "$$events", "$$legacy"]);
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
  Ue(i, Be({ name: "panel-right-close" }, () => t, {
    get iconNode() {
      return r;
    },
    children: (n, a) => {
      var o = we(), s = ie(o);
      De(s, e, "default", {}), q(n, o);
    },
    $$slots: { default: !0 }
  }));
}
function Pg(i, e) {
  const t = Ne(e, ["children", "$$slots", "$$events", "$$legacy"]);
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
  Ue(i, Be({ name: "rotate-ccw" }, () => t, {
    get iconNode() {
      return r;
    },
    children: (n, a) => {
      var o = we(), s = ie(o);
      De(s, e, "default", {}), q(n, o);
    },
    $$slots: { default: !0 }
  }));
}
function qs(i, e) {
  const t = Ne(e, ["children", "$$slots", "$$events", "$$legacy"]);
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
  Ue(i, Be({ name: "search" }, () => t, {
    get iconNode() {
      return r;
    },
    children: (n, a) => {
      var o = we(), s = ie(o);
      De(s, e, "default", {}), q(n, o);
    },
    $$slots: { default: !0 }
  }));
}
function uo(i, e) {
  const t = Ne(e, ["children", "$$slots", "$$events", "$$legacy"]);
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
  Ue(i, Be({ name: "shield-check" }, () => t, {
    get iconNode() {
      return r;
    },
    children: (n, a) => {
      var o = we(), s = ie(o);
      De(s, e, "default", {}), q(n, o);
    },
    $$slots: { default: !0 }
  }));
}
function qg(i, e) {
  const t = Ne(e, ["children", "$$slots", "$$events", "$$legacy"]);
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
  Ue(i, Be({ name: "sparkles" }, () => t, {
    get iconNode() {
      return r;
    },
    children: (n, a) => {
      var o = we(), s = ie(o);
      De(s, e, "default", {}), q(n, o);
    },
    $$slots: { default: !0 }
  }));
}
function Yc(i, e) {
  const t = Ne(e, ["children", "$$slots", "$$events", "$$legacy"]);
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
  Ue(i, Be({ name: "x" }, () => t, {
    get iconNode() {
      return r;
    },
    children: (n, a) => {
      var o = we(), s = ie(o);
      De(s, e, "default", {}), q(n, o);
    },
    $$slots: { default: !0 }
  }));
}
const ga = [
  ["all", "الكتب الستة"],
  ["bukhari", "صحيح البخاري"],
  ["muslim", "صحيح مسلم"],
  ["abudawud", "سنن أبي داود"],
  ["tirmidhi", "جامع الترمذي"],
  ["nasai", "سنن النسائي"],
  ["ibnmajah", "سنن ابن ماجه"]
], Lc = "itqan:bukhari:1:1:bf026de7e155", Ni = [
  { name: "الإمام البخاري", detail: "المصنف · صحيح البخاري", quote: "نسبة الكتاب في ملف المصدر" },
  { name: "الحميدي عبد الله بن الزبير", detail: "الاسم كما ورد في النص", quote: "حَدَّثَنَا الْحُمَيْدِيُّ عَبْدُ اللَّهِ بْنُ الزُّبَيْرِ" },
  { name: "سفيان", detail: "الهوية التفصيلية تحتاج إلى توثيق", quote: "قَالَ : حَدَّثَنَا سُفْيَانُ" },
  { name: "يحيى بن سعيد الأنصاري", detail: "الاسم كما ورد في النص", quote: "قَالَ : حَدَّثَنَا يَحْيَى بْنُ سَعِيدٍ الْأَنْصَارِيُّ" },
  { name: "محمد بن إبراهيم التيمي", detail: "الاسم كما ورد في النص", quote: "قَالَ : أَخْبَرَنِي مُحَمَّدُ بْنُ إِبْرَاهِيمَ التَّيْمِيُّ" },
  { name: "علقمة بن وقاص الليثي", detail: "الاسم كما ورد في النص", quote: "أَنَّهُ سَمِعَ عَلْقَمَةَ بْنَ وَقَّاصٍ اللَّيْثِيَّ" },
  { name: "عمر بن الخطاب", detail: "رضي الله عنه · ورد اسمه في النص", quote: "يَقُولُ : سَمِعْتُ عُمَرَ بْنَ الْخَطَّابِ" },
  { name: "رسول الله ﷺ", detail: "طرف الرواية كما ورد في النص", quote: "قَالَ : سَمِعْتُ رَسُولَ اللَّهِ صَلَّى اللَّهُ عَلَيْهِ وَسَلَّمَ" }
];
var Rg = /* @__PURE__ */ U("<div><!><span> </span></div>"), Vg = /* @__PURE__ */ U('<section class="landing"><div class="ambient ambient-one"></div><div class="ambient ambient-two"></div> <header class="landing-nav"><button class="brand" aria-label="أثر — الصفحة الرئيسية"><span class="brand-symbol"><!></span><span class="wordmark">أثــر</span><span class="brand-caption">معرفةٌ يُستدلّ عليها</span></button> <nav class="landing-links" aria-label="التنقل"><button>رحلتك مع الحديث</button><button>منهجنا</button><span class="quiet-tag">تجربة تصميمية</span></nav> <div class="variant-actions"><button class="return-light">بيان السُّنّة · المحادثة <!></button><button class="return-light">الأصلية <!></button></div></header> <main><div class="hero"><div class="hero-copy" data-enter=""><div class="eyebrow"><span class="live-dot"></span> من سؤالٍ تتذكّره… إلى مصدرٍ تتبيّنه</div> <h1>كلُّ معرفةٍ<br/>تبدأ <em>بأثــر.</em></h1> <p class="hero-description">رحلة هادئة في رحاب الحديث النبوي.<br/>ابحث عن النص، افهم سياقه، وتأمّل الطريق إلى مصدره.</p> <div class="hero-actions"><button class="button mint">ابدأ رحلتك <!></button><button class="text-button light">ادخل مساحة الباحث <!></button></div> <div class="hero-note"><!><span>النص ومصدره أولًا. وما يحتاج إلى مراجعة، ظاهرٌ لك.</span></div></div> <div class="knowledge-orbit" aria-label="تصور بصري يربط سؤال المستخدم بمصادر الكتب الستة" data-enter=""><div class="orbit-caption">A CONNECTED JOURNEY OF KNOWLEDGE</div> <svg class="orbital-lines" viewBox="0 0 600 520" aria-hidden="true"><defs><radialGradient id="halo"><stop offset="0" stop-color="#6150ea" stop-opacity=".35"></stop><stop offset="1" stop-color="#6150ea" stop-opacity="0"></stop></radialGradient></defs><circle cx="300" cy="260" r="220" fill="url(#halo)"></circle><ellipse cx="300" cy="260" rx="252" ry="190" fill="none" stroke="#a9aad2" stroke-opacity=".19"></ellipse><ellipse cx="300" cy="260" rx="194" ry="139" fill="none" stroke="#a9aad2" stroke-opacity=".17"></ellipse><path class="orbit-trace" d="M300 80 Q565 165 300 443 Q35 345 300 80Z" fill="none" stroke="#2ef2c2" stroke-opacity=".4" stroke-dasharray="4 15"></path><path d="M150 110L300 260 472 148M90 270L300 260 495 346M208 437L300 260" fill="none" stroke="#b1a5fe" stroke-opacity=".23"></path></svg> <div class="orbit-core"><div class="core-glyph"><!></div><span>الكلمة… وأثرها</span><small>نص · فهم · مصدر</small></div> <!> <div class="orbit-footer"><span class="small-line"></span> ستة مصنّفات، ومساحة واحدة للاستكشاف <span class="small-line"></span></div></div></div> <section class="journeys" id="journeys" aria-labelledby="journeys-title"><div class="section-label" data-enter=""><span>مصادر واحدة. عدستان مختلفتان.</span><h2 id="journeys-title">اختر كيف تبدأ.</h2></div> <button class="journey-card" data-enter=""><span class="journey-number">01 / LEARN</span><div class="journey-heading"><!><h3>تعلّم وافهم</h3></div><p>أتذكّر كلمات، أريد فهم معنى،<br/>أبحث عن دليلٍ أشاركه بثقة.</p><span class="journey-bottom">للمتعلّم والمُعرّف بالإسلام <!></span></button> <button class="journey-card researcher" data-enter=""><span class="journey-number">02 / RESEARCH</span><div class="journey-heading"><!><h3>ابحث وقارن</h3></div><p>أجمع المواضع، أقارن الألفاظ،<br/>وأتتبّع الإسناد وشواهد الهوية.</p><span class="journey-bottom">للباحث والمتخصص <!></span></button></section> <section class="approach" id="approach"><span class="eyebrow">وضوحٌ في كل خطوة</span><h2>جمال التجربة، في وضوح الدليل.</h2><div class="approach-grid"><div><span>01</span><h3>اعثر على النص</h3><p>مطابقات من فهرس الكتب الستة، مع إبراز الكلمات التي تبحث عنها.</p></div><div><span>02</span><h3>افتح المصدر</h3><p>النص الأصلي، وموضعه في النسخة الرقمية، وحالة مراجعته.</p></div><div><span>03</span><h3>واصل على بيّنة</h3><p>اختيار محفوظ أثناء الفحص، ونسخٌ يحمل المصدر معه.</p></div></div></section></main> <footer class="landing-footer"><span class="wordmark">أثــر</span><span>تصوّر واجهة مشروع الحديث · هاكاثون الذكاء الاصطناعي الإسلامي</span><span>مشروع <b>بيان السنة</b></span></footer></section>'), Ng = /* @__PURE__ */ U('<button class="saved-item"><!><span> <small> </small></span><!></button>'), Yg = /* @__PURE__ */ U('<button class="button violet"><!> تصدير النصوص بمصادرها</button><div class="saved-list"></div>', 1), Lg = /* @__PURE__ */ U('<div class="empty-state"><!><h2>كلّ بحثٍ يبدأ باختيار.</h2><p>افتح أي نتيجة، ثم احفظها هنا مع مصدرها.</p><button class="button outline">ابدأ البحث <!></button></div>'), _g = /* @__PURE__ */ U('<div class="page-heading" data-enter=""><span class="eyebrow">ما اخترتَ الاحتفاظ به</span><h1>دفتر المصادر</h1><p>نصوص ومراجع لهذه الجلسة. صدّرها للاحتفاظ بها.</p></div> <!>', 1), Dg = /* @__PURE__ */ U('<div class="welcome" data-enter=""><span class="welcome-emblem"><!></span><div class="eyebrow"> </div><h1> </h1><p> </p></div>'), Fg = /* @__PURE__ */ U('<div class="result-heading" data-enter=""><div><span class="eyebrow">رحلتك في الحديث</span><h1> </h1></div><button class="icon-button" aria-label="ابدأ بحثًا جديدًا"><!></button></div> <ol class="journey-steps"><li><span>01</span> ابحث</li><li><span>02</span> اختر النص</li><li><span>03</span> افحص المصدر</li><li><span>04</span> واصل الفهم</li></ol>', 1), jg = /* @__PURE__ */ U("<option> </option>"), Bg = /* @__PURE__ */ U('<span class="spinner"></span>'), Ug = /* @__PURE__ */ U("<button> <!></button>"), Gg = /* @__PURE__ */ U("<span> </span>"), Xg = /* @__PURE__ */ U('<div class="quick-examples" data-enter=""><span>جرّب أن تتذكّر</span><!></div><div class="usecases" data-enter=""><button><!><span>أتذكّر كلمات<small>من العبارة إلى موضع النص</small></span><!></button><button><!><span>أقارن الألفاظ<small>النتائج جنبًا إلى جنب</small></span><!></button><button><!><span>أستكشف الإسناد<small>مثال تفاعلي من صحيح البخاري</small></span><!></button></div><div class="source-strip"><span>نطاق الفهرس</span><!></div><div class="welcome-footnote"><!> نتائج البحث من نسخة Itqan الرقمية. الحكم على الصحة يحتاج إلى مصدر علمي مطابق.</div>', 1), Zg = /* @__PURE__ */ U('<div class="error-box" role="alert"><h2>لم يكتمل البحث</h2><p> </p><button class="button outline">أعد المحاولة</button></div>'), Kg = /* @__PURE__ */ U('<div class="loading-state" role="status"><span class="spinner"></span> نبحث عن أثر كلماتك في الفهرس…<div class="skeleton"></div><div class="skeleton"></div></div>'), Hg = /* @__PURE__ */ U('<button class="button outline"> </button>'), Qg = /* @__PURE__ */ U('<div class="empty-state" data-enter=""><!><h2>لم نجد مطابقة في النطاق المختار.</h2><p>جرّب كلمات أقل أو نطاقًا أوسع. عدم العثور هنا لا يعني أن العبارة ليست حديثًا.</p><!></div>'), Wg = /* @__PURE__ */ U("<mark> </mark>"), Jg = /* @__PURE__ */ U('<button class="result-card" data-enter=""><div class="result-card-top"><span class="book-label"><!> </span><span class="result-index"> </span></div><h3> </h3><p class="hadith-snippet"></p><div class="result-card-bottom"><span> </span><!></div></button>'), $g = /* @__PURE__ */ U('<div class="results-meta"><h2>اختر النص الذي تقصده</h2><span> </span></div><div class="result-grid"></div><p class="small-note">المواضع قد تتضمن نسخًا مكررة من النص؛ عدد النتائج ليس عدد طرق الإسناد.</p>', 1), e1 = /* @__PURE__ */ U('<span class="tab-dot"></span>'), t1 = /* @__PURE__ */ U('<button role="tab"> <!></button>'), r1 = /* @__PURE__ */ U("<mark> </mark>"), i1 = /* @__PURE__ */ U('<details class="translation"><summary>الترجمة الإنجليزية في النسخة الرقمية</summary><p dir="ltr"> </p></details>'), n1 = /* @__PURE__ */ U('<div class="source-data"><p> </p><a target="_blank" rel="noreferrer">افتح ملف المصدر <!></a></div>'), a1 = /* @__PURE__ */ U('<div class="text-lens"><span class="source-state"><span></span> نسخة رقمية · تحتاج إلى مراجعة على طبعة معتمدة</span><p class="full-hadith"></p><!><button class="source-disclosure"><!> بيانات المصدر والتتبّع <span> </span></button><!></div>'), o1 = /* @__PURE__ */ U("<option> </option>"), s1 = /* @__PURE__ */ U("<mark> </mark>"), l1 = /* @__PURE__ */ U("<mark> </mark>"), c1 = /* @__PURE__ */ U('<div class="comparison-columns"><article><span class="book-label"> </span><p></p><a target="_blank" rel="noreferrer">مصدر النص <!></a></article><article><span class="book-label"> </span><p></p><a target="_blank" rel="noreferrer">مصدر النص <!></a></article></div><p class="small-note">التظليل يبيّن كلمات البحث فقط؛ محاذاة الفروق آليًا مرحلة لاحقة.</p>', 1), d1 = /* @__PURE__ */ U('<label class="compare-select">قارن النص المحدد مع <select></select></label><!>', 1), p1 = /* @__PURE__ */ U('<div class="empty-state"><!><p>ابحث في نطاق أوسع للحصول على نص آخر للمقارنة.</p></div>'), f1 = /* @__PURE__ */ U('<div class="comparison-lens"><p class="small-note">مقارنة بين نتائج البحث، وليست إثباتًا لوحدة الرواية أو استقلال الطريق.</p><!></div>'), u1 = /* @__PURE__ */ U('<div class="chain-row"><span class="chain-index"> </span><button><span class="node-dot"></span><span> <small> </small></span><!></button></div>'), h1 = /* @__PURE__ */ U('<div class="chain-caption"><span>مسار واحد · من المصنف إلى طرف الرواية</span><button class="text-button"><!> Mermaid</button></div><p class="small-note">نقل يدوي لأسماء هذا السجل، قبل المراجعة العلمية. اختر اسمًا لفحص شاهده.</p><div class="chain-nodes"></div>', 1), g1 = /* @__PURE__ */ U('<div class="empty-state"><!><h3>هذا المسار لم يُجهّز بعد.</h3><p>مثال الواجهة متاح لسجل «الأعمال بالنيات» في أول ملف صحيح البخاري. لن نرسم مسارًا تخمينيًا لهذا النص.</p><button class="button outline">افتح بحث المثال</button></div>'), m1 = /* @__PURE__ */ U('<div class="chain-lens"><!></div>'), v1 = /* @__PURE__ */ U('<button class="text-button">كل النتائج <!></button>'), b1 = /* @__PURE__ */ U('<div class="insight-icon"><!></div><span class="eyebrow">شاهد الاسم في السند</span><h2> </h2><blockquote> </blockquote><div class="insight-divider"></div><dl><dt>توثيق الهوية</dt><dd>لم يُربط بعد بترجمة موثّقة</dd><dt>الجرح والتعديل</dt><dd>لا يوجد حكم منقول في هذا المثال</dd><dt>المصدر</dt><dd> </dd></dl><a class="text-button" target="_blank" rel="noreferrer">راجع النص الأصلي <!></a>', 1), x1 = /* @__PURE__ */ U('<div class="insight-icon"><!></div><span class="eyebrow">نافذة الدليل</span><h2>ماذا نعرف<br/>عن هذا النص؟</h2><ul class="evidence-checklist"><li><!><span>موضع رقمي محدد<small> </small></span></li><li><!><span>مرجع قابل للفحص<small> </small></span></li><li class="pending"><span class="hollow-dot"></span><span>المراجعة العلمية<small>لم تُنجز داخل هذه التجربة</small></span></li></ul><div class="insight-divider"></div><h3>خطوتك التالية</h3><p>افحص نتيجة الدرر، أو افتح النص المحدد في محادثة الأداة.</p><a class="button violet" target="_blank" rel="noreferrer">افتح في محادثة جديدة <!></a><small class="handoff-note">يفتح طلبًا جاهزًا؛ راجعه ثم أرسله.</small><a class="dorar-link" target="_blank" rel="noreferrer">ابحث عن العبارة في الدرر <!></a><p class="small-note">بحث مستقل؛ لم تُطابق أحكامه آليًا بهذا السجل.</p>', 1), y1 = /* @__PURE__ */ U('<div class="evidence-layout" data-enter=""><section class="evidence-panel"><div class="evidence-header"><div><span class="eyebrow">النص الذي اخترته</span><h2> </h2><p> </p></div><button><!></button></div> <div class="evidence-tabs" role="tablist" aria-label="عدسات فحص النص"></div> <!> <div class="evidence-actions"><button class="button outline small"><!> </button><!></div></section><aside class="insight-panel"><!></aside></div>'), w1 = /* @__PURE__ */ U('<!> <form data-enter=""><div class="composer-input"><!><label class="sr-only" for="athar-query">الكلمات التي تتذكرها من الحديث</label><input id="athar-query" required="" autocomplete="off"/></div><div class="composer-bottom"><label class="collection-filter"><!><select aria-label="اختر مجموعة البحث"></select></label><span class="search-type">بحث في ألفاظ النص</span><button class="submit-search" aria-label="ابحث عن الحديث"><!></button></div></form> <!> <!> <!> <!> <!>', 1), k1 = /* @__PURE__ */ U('<div class="notice" role="status"> <button class="icon-button" aria-label="أغلق التنبيه"><!></button></div>'), A1 = /* @__PURE__ */ U('<div><aside><button class="mobile-only close-menu icon-button" aria-label="أغلق قائمة المساحة"><!></button> <button class="brand"><span class="brand-symbol"><!></span><span class="wordmark">أثــر</span><span class="lab-label">مختبر الواجهة</span></button> <button class="new-journey"><!> رحلة جديدة <span>+</span></button> <span class="sidebar-label">مساحتك المعرفية</span> <button><!> الاستكشاف</button> <button><!> دفتر المصادر <span class="count"> </span></button> <div class="side-separator"></div><span class="sidebar-label">عدسة العرض</span> <button><!><span>تعلّم وافهم<small>مسار مبسّط نحو المعنى</small></span><!></button> <button><!><span>ابحث وقارن<small>تفاصيل النص والمصدر</small></span><!></button> <div class="sidebar-bottom"><div class="integrity-note"><!><p>قيمة المعرفة<br/><strong>في إمكانية تتبّعها.</strong></p></div><span class="powered">مشروع بيان السنة</span></div></aside> <div class="workspace-body"><header class="workspace-top"><div class="breadcrumb"><button class="icon-button mobile-only" aria-label="افتح قائمة المساحة"><!></button><span> </span><!><strong> </strong></div><div class="top-actions"><button class="original-button">بيان السُّنّة · المحادثة <!></button><button class="original-button">الأصلية <!></button></div></header> <main class="workspace-main"><!> <!></main><footer class="workspace-footer"><span>أثــر / رحلة معرفية قابلة للتتبّع</span><span>تصميم تجريبي · البحث متصل بالفهرس المحلي</span></footer></div></div>'), S1 = /* @__PURE__ */ U('<div class="athar" dir="rtl" lang="ar"><!></div>');
function z1(i, e) {
  xl(e, !1);
  const t = /* @__PURE__ */ ke(), r = /* @__PURE__ */ ke(), n = /* @__PURE__ */ ke();
  let a = Jt(e, "apiBase", 8), o = Jt(e, "webuiOrigin", 8), s = Jt(e, "onClose", 8), l = Jt(e, "onVariant2", 24, s), c = Jt(e, "onReady", 8), d = /* @__PURE__ */ ke(), p = /* @__PURE__ */ ke("landing"), f = /* @__PURE__ */ ke("learn"), v = /* @__PURE__ */ ke(""), g = /* @__PURE__ */ ke("all"), u = /* @__PURE__ */ ke(!1), m = /* @__PURE__ */ ke(""), x = /* @__PURE__ */ ke(!1), A = /* @__PURE__ */ ke(null), b = /* @__PURE__ */ ke(null), w = /* @__PURE__ */ ke("text"), y = /* @__PURE__ */ ke(-1), T = /* @__PURE__ */ ke(""), M = /* @__PURE__ */ ke(!1), I = /* @__PURE__ */ ke(!1), z = /* @__PURE__ */ ke([]), N = /* @__PURE__ */ ke(!1), _ = /* @__PURE__ */ ke(""), L = /* @__PURE__ */ ke(!1), Q = 0, oe = null, de = /* @__PURE__ */ ke(!1);
  const O = ["الأعمال بالنيات", "فليقل خيرا أو ليصمت", "يسروا ولا تعسروا"];
  function Y(K = "[data-enter]") {
    h(de) && h(d) && pl.fromTo(h(d).querySelectorAll(K), { opacity: 0, y: 12 }, {
      opacity: 1,
      y: 0,
      duration: 0.45,
      stagger: 0.045,
      ease: "power3.out",
      clearProps: "transform"
    });
  }
  async function V(K) {
    var ne;
    C(f, K), C(p, "workspace"), C(L, !1), await ma(), (ne = h(d).closest("dialog")) == null || ne.scrollTo({ top: 0 }), Y();
  }
  async function j(K = h(v)) {
    if (C(v, K.trim()), !h(v) || h(u)) return;
    const ne = ++Q;
    oe == null || oe.abort(), oe = new AbortController(), C(u, !0), C(m, ""), C(_, ""), C(x, !0), C(b, null), C(A, null), C(w, "text"), C(y, -1);
    try {
      const ge = await fetch(`${a()}/search?${new URLSearchParams({ query: h(v), collection: h(g) })}`, { signal: oe.signal, credentials: "omit" }), Ge = await ge.json();
      if (!ge.ok) throw new Error(Ge.message || "تعذّر الوصول إلى فهرس البحث.");
      if (ne !== Q) return;
      C(A, Ge);
    } catch (ge) {
      ge.name !== "AbortError" && C(m, ge.message.includes("fetch") ? "خدمة البحث المحلية غير متاحة. شغّل خدمة تجربة الواجهة ثم أعد المحاولة." : ge.message);
    } finally {
      ne === Q && (C(u, !1), await ma(), Y(".result-card"));
    }
  }
  async function D(K) {
    var ne, ge, Ge;
    C(b, K), C(w, "text"), C(y, -1), C(I, !1), C(T, ((ge = (ne = h(A)) == null ? void 0 : ne.results.find((Jr) => Jr.record_id !== K.record_id)) == null ? void 0 : ge.record_id) || ""), await ma(), (Ge = h(d).querySelector(".evidence-layout")) == null || Ge.scrollIntoView({
      block: "start",
      behavior: h(de) ? "smooth" : "instant"
    }), Y(".evidence-layout");
  }
  function F() {
    oe == null || oe.abort(), Q++, C(u, !1), C(A, null), C(b, null), C(x, !1), C(v, ""), C(m, ""), C(_, ""), C(M, !1);
  }
  function Z() {
    if (!h(b)) return;
    const K = h(n);
    K ? C(z, h(z).filter((ne) => {
      var ge;
      return ne.record_id !== ((ge = h(b)) == null ? void 0 : ge.record_id);
    })) : C(z, [...h(z), h(b)]), C(_, K ? "أزيل النص من دفتر الجلسة." : "أضيف النص إلى دفتر هذه الجلسة.");
  }
  async function ze() {
    if (h(b))
      try {
        await navigator.clipboard.writeText(`${h(b).arabic}

${h(b).citation}`), C(N, !0), setTimeout(() => C(N, !1), 2e3);
      } catch {
        C(_, "النسخ غير متاح في هذا المتصفح. يمكنك تحديد النص والمصدر ونسخهما.");
      }
  }
  function le() {
    const K = new Blob(
      [
        h(z).map((Ge) => `${Ge.arabic}

${Ge.citation}`).join(`

---

`)
      ],
      { type: "text/plain;charset=utf-8" }
    ), ne = URL.createObjectURL(K), ge = document.createElement("a");
    ge.href = ne, ge.download = "athar-evidence.txt", ge.click(), setTimeout(() => URL.revokeObjectURL(ne), 500);
  }
  function pe() {
    const K = h(b) ? `افتح السجل ${h(b).record_id} باستخدام open_hadith_record واعرض مصدره وحالة المراجعة.` : `ابحث عن الحديث بالكلمات: ${h(v)}`;
    return `${o()}/?${new URLSearchParams({ model: "hadith-phrase-poc", q: K, submit: "false" })}`;
  }
  function br() {
    return `flowchart TD
` + Ni.map((K, ne) => `  N${ne}["${K.name}"]`).join(`
`) + `
` + Ni.slice(1).map((K, ne) => `  N${ne} --> N${ne + 1}`).join(`
`);
  }
  async function Ei() {
    try {
      await navigator.clipboard.writeText(br()), C(_, "نُسخ مخطط هذا السجل فقط بصيغة Mermaid.");
    } catch {
      C(_, "تعذّر النسخ من المتصفح.");
    }
  }
  ah(() => {
    const K = pl.matchMedia();
    return K.add("(prefers-reduced-motion: no-preference)", () => (C(de, !0), Y(), () => {
      C(de, !1);
    })), c()((ne) => {
      C(p, ne), ma().then(() => Y());
    }), () => {
      K.revert(), oe == null || oe.abort();
    };
  }), vs(() => h(f), () => {
    C(t, h(f) === "research");
  }), vs(() => (h(A), h(T)), () => {
    var K;
    C(r, (K = h(A)) == null ? void 0 : K.results.find((ne) => ne.record_id === h(T)));
  }), vs(() => (h(b), h(z)), () => {
    C(n, !!h(b) && h(z).some((K) => {
      var ne;
      return K.record_id === ((ne = h(b)) == null ? void 0 : ne.record_id);
    }));
  }), xu(), Gd();
  var Wr = S1(), xr = k(Wr);
  {
    var on = (K) => {
      var ne = Vg(), ge = S(k(ne), 3), Ge = k(ge), Jr = k(Ge), $r = k(Jr);
      jr($r, { size: 24 });
      var Ua = S(Ge, 2), sn = k(Ua), jo = S(sn), Bo = S(Ua, 2), Ti = k(Bo), Uo = S(k(Ti));
      Ar(Uo, { size: 16 });
      var Mi = S(Ti), Ga = S(k(Mi));
      Ar(Ga, { size: 16 });
      var Go = S(ge, 2), Ii = k(Go), Qn = k(Ii), Wn = S(k(Qn), 6), Jn = k(Wn), Xo = S(k(Jn));
      si(Xo, { size: 18 });
      var Oi = S(Jn), Xa = S(k(Oi));
      Ar(Xa, { size: 17 });
      var Za = S(Wn, 2), Zo = k(Za);
      uo(Zo, { size: 16 });
      var Ko = S(Qn, 2), Ci = S(k(Ko), 4), Ka = k(Ci), Ha = k(Ka);
      jr(Ha, { size: 34, strokeWidth: 1 });
      var Ho = S(Ci, 2);
      gt(
        Ho,
        1,
        () => (hr(ga), P(() => ga.slice(1))),
        ht,
        (vt, yr, ts) => {
          var ta = Rg();
          kt(ta, 1, `book-orbit book-${ts}`);
          var cn = k(ta);
          vn(cn, { size: 17, strokeWidth: 1.2 });
          var rs = S(cn), $a = k(rs);
          se(() => B($a, (h(yr), P(() => h(yr)[1])))), q(vt, ta);
        }
      );
      var Qo = S(Ii, 2), $n = S(k(Qo), 2), Qa = S(k($n)), Wo = k(Qa);
      vn(Wo, { size: 26, strokeWidth: 1.3 });
      var Jo = S(Qa, 2), Wa = S(k(Jo));
      si(Wa, { size: 19 });
      var ea = S($n, 2), ln = S(k(ea)), $o = k(ln);
      jr($o, { size: 26, strokeWidth: 1.3 });
      var Ja = S(ln, 2), es = S(k(Ja));
      si(es, { size: 19 }), H("click", Ge, () => {
        C(p, "landing");
      }), H("click", sn, () => {
        var vt;
        return (vt = h(d).querySelector("#journeys")) == null ? void 0 : vt.scrollIntoView({ behavior: h(de) ? "smooth" : "instant" });
      }), H("click", jo, () => {
        var vt;
        return (vt = h(d).querySelector("#approach")) == null ? void 0 : vt.scrollIntoView({ behavior: h(de) ? "smooth" : "instant" });
      }), H("click", Ti, function(...vt) {
        var yr;
        (yr = l()) == null || yr.apply(this, vt);
      }), H("click", Mi, function(...vt) {
        var yr;
        (yr = s()) == null || yr.apply(this, vt);
      }), H("click", Jn, () => V("learn")), H("click", Oi, () => V("research")), H("click", $n, () => V("learn")), H("click", ea, () => V("research")), q(K, ne);
    }, Vr = (K) => {
      var ne = A1();
      let ge;
      var Ge = k(ne);
      let Jr;
      var $r = k(Ge), Ua = k($r);
      Yc(Ua, { size: 18 });
      var sn = S($r, 2), jo = k(sn), Bo = k(jo);
      jr(Bo, { size: 22 });
      var Ti = S(sn, 2), Uo = k(Ti);
      qg(Uo, { size: 16 });
      var Mi = S(Ti, 4);
      let Ga;
      var Go = k(Mi);
      Mg(Go, { size: 18 });
      var Ii = S(Mi, 2);
      let Qn;
      var Wn = k(Ii);
      Cs(Wn, { size: 18 });
      var Jn = S(Wn, 2), Xo = k(Jn), Oi = S(Ii, 5);
      let Xa;
      var Za = k(Oi);
      vn(Za, { size: 17 });
      var Zo = S(Za, 2);
      {
        var Ko = (Ie) => {
          ua(Ie, { size: 15 });
        };
        he(Zo, (Ie) => {
          h(t) || Ie(Ko);
        });
      }
      var Ci = S(Oi, 2);
      let Ka;
      var Ha = k(Ci);
      jr(Ha, { size: 17 });
      var Ho = S(Ha, 2);
      {
        var Qo = (Ie) => {
          ua(Ie, { size: 15 });
        };
        he(Ho, (Ie) => {
          h(t) && Ie(Qo);
        });
      }
      var $n = S(Ci, 2), Qa = k($n), Wo = k(Qa);
      uo(Wo, { size: 20 });
      var Jo = S(Ge, 2), Wa = k(Jo), ea = k(Wa), ln = k(ea), $o = k(ln);
      Cg($o, { size: 20 });
      var Ja = S(ln), es = k(Ja), vt = S(Ja);
      Vc(vt, { size: 13 });
      var yr = S(vt), ts = k(yr), ta = S(ea), cn = k(ta), rs = S(k(cn));
      Ar(rs, { size: 15 });
      var $a = S(cn), Xp = S(k($a));
      Ar(Xp, { size: 15 });
      var Zp = S(Wa, 2), Zl = k(Zp);
      {
        var Kp = (Ie) => {
          var bt = _g(), Pi = S(ie(bt), 2);
          {
            var dn = (or) => {
              var ei = Yg(), Nr = ie(ei), qi = k(Nr);
              Ig(qi, { size: 16 });
              var ti = S(Nr);
              gt(ti, 5, () => h(z), ht, (is, ri) => {
                var pn = Ng(), fn = k(pn);
                vn(fn, { size: 20 });
                var ia = S(fn), eo = k(ia), ns = S(eo), as = k(ns), to = S(ia);
                si(to, { size: 17 }), se(() => {
                  B(eo, (h(ri), P(() => h(ri).collection_label))), B(as, (h(ri), P(() => h(ri).chapter_title)));
                }), H("click", pn, () => {
                  C(M, !1), D(h(ri)), C(x, !0);
                }), q(is, pn);
              }), H("click", Nr, le), q(or, ei);
            }, ra = (or) => {
              var ei = Lg(), Nr = k(ei);
              Cs(Nr, { size: 36, strokeWidth: 1 });
              var qi = S(Nr, 3), ti = S(k(qi));
              si(ti, { size: 16 }), H("click", qi, () => C(M, !1)), q(or, ei);
            };
            he(Pi, (or) => {
              h(z), P(() => h(z).length) ? or(dn) : or(ra, -1);
            });
          }
          q(Ie, bt);
        }, Hp = (Ie) => {
          var bt = w1(), Pi = ie(bt);
          {
            var dn = (X) => {
              var me = Dg(), qe = k(me), ct = k(qe);
              {
                var tt = (ue) => {
                  jr(ue, { size: 30, strokeWidth: 1.2 });
                }, He = (ue) => {
                  vn(ue, { size: 30, strokeWidth: 1.2 });
                };
                he(ct, (ue) => {
                  h(t) ? ue(tt) : ue(He, -1);
                });
              }
              var rt = S(qe), Pt = k(rt), xt = S(rt), it = k(xt), yt = S(xt), Qe = k(yt);
              se(() => {
                B(Pt, h(t) ? "من موضع الرواية… إلى تفاصيلها" : "مساحةٌ للسؤال، وطريقٌ إلى المصدر"), B(it, h(t) ? "وراء كلّ نص، رحلة." : "ما الذي تتطلّع إلى معرفته؟"), B(Qe, h(t) ? "ابدأ بعبارة، واجمع نتائجها، ثم افحص النصوص وأسانيد المثال المتاح." : "ربما تتذكّر بضع كلمات. دعها تقودك إلى النص ومصدره.");
              }), q(X, me);
            }, ra = (X) => {
              var me = Fg(), qe = ie(me), ct = k(qe), tt = S(k(ct)), He = k(tt), rt = S(ct), Pt = k(rt);
              Pg(Pt, { size: 19 });
              var xt = S(qe, 2), it = k(xt);
              let yt;
              var Qe = S(it);
              let ue;
              var ii = S(Qe);
              let sr;
              se(() => {
                B(He, h(b) ? "من النص، إلى الدليل." : "أثر الكلمات التي تذكّرتها."), yt = kt(it, 1, "", null, yt, { complete: h(x) }), ue = kt(Qe, 1, "", null, ue, { complete: !!h(b) }), sr = kt(ii, 1, "", null, sr, { complete: !!h(b) });
              }), H("click", rt, F), q(X, me);
            };
            he(Pi, (X) => {
              h(x) ? X(ra, -1) : X(dn);
            });
          }
          var or = S(Pi, 2);
          let ei;
          var Nr = k(or), qi = k(Nr);
          qs(qi, { size: 23, strokeWidth: 1.4 });
          var ti = S(qi, 2);
          Yt(ti, "maxlength", 200);
          var is = S(Nr), ri = k(is), pn = k(ri);
          Ps(pn, { size: 15 });
          var fn = S(pn);
          gt(fn, 5, () => ga, ht, (X, me) => {
            var qe = jg(), ct = k(qe), tt = {};
            se(() => {
              B(ct, (h(me), P(() => h(me)[1]))), tt !== (tt = (h(me), P(() => h(me)[0]))) && (qe.value = (qe.__value = (h(me), P(() => h(me)[0]))) ?? "");
            }), q(X, qe);
          });
          var ia = S(ri, 2), eo = k(ia);
          {
            var ns = (X) => {
              var me = Bg();
              q(X, me);
            }, as = (X) => {
              si(X, { size: 20 });
            };
            he(eo, (X) => {
              h(u) ? X(ns) : X(as, -1);
            });
          }
          var to = S(or, 2);
          {
            var Jp = (X) => {
              var me = Xg(), qe = ie(me), ct = S(k(qe));
              gt(ct, 1, () => O, ht, (Yr, wr) => {
                var kr = Ug(), Lr = k(kr), na = S(Lr);
                Ar(na, { size: 13 }), se(() => B(Lr, `${h(wr) ?? ""} `)), H("click", kr, () => j(h(wr))), q(Yr, kr);
              });
              var tt = S(qe), He = k(tt), rt = k(He);
              qs(rt, { size: 20 });
              var Pt = S(rt, 2);
              Ar(Pt, { size: 16 });
              var xt = S(He), it = k(xt);
              Ps(it, { size: 20 });
              var yt = S(it, 2);
              Ar(yt, { size: 16 });
              var Qe = S(xt), ue = k(Qe);
              jr(ue, { size: 20 });
              var ii = S(ue, 2);
              Ar(ii, { size: 16 });
              var sr = S(tt), un = S(k(sr));
              gt(
                un,
                1,
                () => (hr(ga), P(() => ga.slice(1))),
                ht,
                (Yr, wr) => {
                  var kr = Gg(), Lr = k(kr);
                  se(() => B(Lr, (h(wr), P(() => h(wr)[1])))), q(Yr, kr);
                }
              );
              var hn = S(sr), gn = k(hn);
              uo(gn, { size: 14 }), H("click", He, () => j(O[0])), H("click", xt, () => {
                C(f, "research"), j(O[0]);
              }), H("click", Qe, () => {
                C(f, "research"), j(O[0]), C(_, "اختر نتيجة صحيح البخاري، ثم افتح «الإسناد» لاستكشاف المثال.");
              }), q(X, me);
            };
            he(to, (X) => {
              h(x) || X(Jp);
            });
          }
          var Kl = S(to, 2);
          {
            var $p = (X) => {
              var me = Zg(), qe = S(k(me)), ct = k(qe), tt = S(qe);
              se(() => B(ct, h(m))), H("click", tt, () => j()), q(X, me);
            };
            he(Kl, (X) => {
              h(m) && X($p);
            });
          }
          var Hl = S(Kl, 2);
          {
            var ef = (X) => {
              var me = Kg();
              q(X, me);
            };
            he(Hl, (X) => {
              h(u) && X(ef);
            });
          }
          var Ql = S(Hl, 2);
          {
            var tf = (X) => {
              var me = we(), qe = ie(me);
              {
                var ct = (He) => {
                  var rt = Qg(), Pt = k(rt);
                  qs(Pt, { size: 34, strokeWidth: 1 });
                  var xt = S(Pt, 3);
                  gt(
                    xt,
                    1,
                    () => (h(A), P(() => h(A).suggestions)),
                    ht,
                    (it, yt) => {
                      var Qe = Hg(), ue = k(Qe);
                      se(() => B(ue, `هل تقصد: ${h(yt) ?? ""}؟`)), H("click", Qe, () => j(h(yt))), q(it, Qe);
                    }
                  ), q(He, rt);
                }, tt = (He) => {
                  var rt = $g(), Pt = ie(rt), xt = S(k(Pt)), it = k(xt), yt = S(Pt);
                  gt(yt, 5, () => (h(A), P(() => h(A).results)), ht, (Qe, ue, ii) => {
                    var sr = Jg(), un = k(sr), hn = k(un), gn = k(hn);
                    vn(gn, { size: 14 });
                    var Yr = S(gn, 1, !0), wr = S(hn), kr = k(wr), Lr = S(un), na = k(Lr), ro = S(Lr);
                    gt(ro, 5, () => (h(ue), P(() => h(ue).snippet)), ht, (aa, ee) => {
                      var ye = we(), Re = ie(ye);
                      {
                        var dt = (ce) => {
                          var fe = Wg(), Ye = k(fe);
                          se(() => B(Ye, (h(ee), P(() => h(ee).text)))), q(ce, fe);
                        }, pt = (ce) => {
                          var fe = co();
                          se(() => B(fe, (h(ee), P(() => h(ee).text)))), q(ce, fe);
                        };
                        he(Re, (ce) => {
                          h(ee), P(() => h(ee).match) ? ce(dt) : ce(pt, -1);
                        });
                      }
                      q(aa, ye);
                    });
                    var os = S(ro), io = k(os), ss = k(io), ls = S(io);
                    si(ls, { size: 17 }), se(
                      (aa) => {
                        B(Yr, (h(ue), P(() => h(ue).collection_label))), B(kr, aa), B(na, (h(ue), P(() => h(ue).chapter_title))), B(ss, (h(ue), P(() => h(ue).match_label)));
                      },
                      [() => P(() => String(ii + 1).padStart(2, "0"))]
                    ), H("click", sr, () => D(h(ue))), q(Qe, sr);
                  }), se((Qe, ue) => B(it, `${Qe ?? ""} موضع بيانات · نعرض ${ue ?? ""}`), [
                    () => (h(A), P(() => h(A).total_matches.toLocaleString("ar"))),
                    () => (h(A), P(() => h(A).results.length.toLocaleString("ar")))
                  ]), q(He, rt);
                };
                he(qe, (He) => {
                  h(A), P(() => !h(A).results.length) ? He(ct) : h(b) || He(tt, 1);
                });
              }
              q(X, me);
            };
            he(Ql, (X) => {
              h(A) && !h(u) && X(tf);
            });
          }
          var rf = S(Ql, 2);
          {
            var nf = (X) => {
              var me = y1(), qe = k(me), ct = k(qe), tt = k(ct), He = S(k(tt)), rt = k(He), Pt = S(He), xt = k(Pt), it = S(tt);
              let yt;
              var Qe = k(it);
              Cs(Qe, { size: 21 });
              var ue = S(ct, 2);
              gt(
                ue,
                4,
                () => [
                  ["text", "النص والمصدر"],
                  ["compare", "مقارنة الألفاظ"],
                  ["chain", "الإسناد"]
                ],
                ht,
                (ee, ye) => {
                  var Re = t1(), dt = k(Re), pt = S(dt);
                  {
                    var ce = (fe) => {
                      var Ye = e1();
                      q(fe, Ye);
                    };
                    he(pt, (fe) => {
                      P(() => ye[0] === "chain") && fe(ce);
                    });
                  }
                  se(() => {
                    Yt(Re, "aria-selected", (h(w), P(() => h(w) === ye[0]))), B(dt, P(() => ye[1]));
                  }), H("click", Re, () => {
                    C(w, ye[0]), C(y, -1);
                  }), q(ee, Re);
                }
              );
              var ii = S(ue, 2);
              {
                var sr = (ee) => {
                  var ye = a1(), Re = S(k(ye));
                  gt(
                    Re,
                    5,
                    () => (h(b), P(() => h(b).arabic_parts)),
                    ht,
                    (ve, te) => {
                      var Oe = we(), ft = ie(Oe);
                      {
                        var We = (nt) => {
                          var qt = r1(), ni = k(qt);
                          se(() => B(ni, (h(te), P(() => h(te).text)))), q(nt, qt);
                        }, Fr = (nt) => {
                          var qt = co();
                          se(() => B(qt, (h(te), P(() => h(te).text)))), q(nt, qt);
                        };
                        he(ft, (nt) => {
                          h(te), P(() => h(te).match) ? nt(We) : nt(Fr, -1);
                        });
                      }
                      q(ve, Oe);
                    }
                  );
                  var dt = S(Re);
                  {
                    var pt = (ve) => {
                      var te = i1(), Oe = S(k(te)), ft = k(Oe);
                      se(() => {
                        B(ft, (h(b), P(() => h(b).english))), Oe.dir = Oe.dir;
                      }), q(ve, te);
                    };
                    he(dt, (ve) => {
                      h(b), P(() => h(b).english) && ve(pt);
                    });
                  }
                  var ce = S(dt), fe = k(ce);
                  Og(fe, { size: 16 });
                  var Ye = S(fe, 2), wt = k(Ye), _r = S(ce);
                  {
                    var Dr = (ve) => {
                      var te = n1(), Oe = k(te), ft = k(Oe), We = S(Oe), Fr = S(k(We));
                      ha(Fr, { size: 14 }), se(() => {
                        B(ft, (h(b), P(() => h(b).citation))), Yt(We, "href", (h(b), P(() => h(b).source_url)));
                      }), q(ve, te);
                    };
                    he(_r, (ve) => {
                      h(I) && ve(Dr);
                    });
                  }
                  se(() => {
                    Yt(ce, "aria-expanded", h(I)), B(wt, h(I) ? "−" : "+");
                  }), H("click", ce, () => C(I, !h(I))), q(ee, ye);
                }, un = (ee) => {
                  var ye = f1(), Re = S(k(ye));
                  {
                    var dt = (ce) => {
                      var fe = d1(), Ye = ie(fe), wt = S(k(Ye));
                      gt(
                        wt,
                        5,
                        () => (h(A), h(b), P(() => h(A).results.filter((ve) => {
                          var te;
                          return ve.record_id !== ((te = h(b)) == null ? void 0 : te.record_id);
                        }))),
                        ht,
                        (ve, te) => {
                          var Oe = o1(), ft = k(Oe), We = {};
                          se(() => {
                            B(ft, `${h(te), P(() => h(te).collection_label) ?? ""} · موضع ${h(te), P(() => h(te).source_position) ?? ""}`), We !== (We = (h(te), P(() => h(te).record_id))) && (Oe.value = (Oe.__value = (h(te), P(() => h(te).record_id))) ?? "");
                          }), q(ve, Oe);
                        }
                      );
                      var _r = S(Ye);
                      {
                        var Dr = (ve) => {
                          var te = c1(), Oe = ie(te), ft = k(Oe), We = k(ft), Fr = k(We), nt = S(We);
                          gt(
                            nt,
                            5,
                            () => (h(b), P(() => h(b).arabic_parts)),
                            ht,
                            (ds, Rt) => {
                              var oa = we(), ps = ie(oa);
                              {
                                var fs = (Vt) => {
                                  var lr = s1(), hs = k(lr);
                                  se(() => B(hs, (h(Rt), P(() => h(Rt).text)))), q(Vt, lr);
                                }, us = (Vt) => {
                                  var lr = co();
                                  se(() => B(lr, (h(Rt), P(() => h(Rt).text)))), q(Vt, lr);
                                };
                                he(ps, (Vt) => {
                                  h(Rt), P(() => h(Rt).match) ? Vt(fs) : Vt(us, -1);
                                });
                              }
                              q(ds, oa);
                            }
                          );
                          var qt = S(nt), ni = S(k(qt));
                          ha(ni, { size: 12 });
                          var no = S(ft), ao = k(no), cs = k(ao), oo = S(ao);
                          gt(
                            oo,
                            5,
                            () => (h(r), P(() => h(r).arabic_parts)),
                            ht,
                            (ds, Rt) => {
                              var oa = we(), ps = ie(oa);
                              {
                                var fs = (Vt) => {
                                  var lr = l1(), hs = k(lr);
                                  se(() => B(hs, (h(Rt), P(() => h(Rt).text)))), q(Vt, lr);
                                }, us = (Vt) => {
                                  var lr = co();
                                  se(() => B(lr, (h(Rt), P(() => h(Rt).text)))), q(Vt, lr);
                                };
                                he(ps, (Vt) => {
                                  h(Rt), P(() => h(Rt).match) ? Vt(fs) : Vt(us, -1);
                                });
                              }
                              q(ds, oa);
                            }
                          );
                          var so = S(oo), af = S(k(so));
                          ha(af, { size: 12 }), se(() => {
                            B(Fr, (h(b), P(() => h(b).collection_label))), Yt(qt, "href", (h(b), P(() => h(b).source_url))), B(cs, (h(r), P(() => h(r).collection_label))), Yt(so, "href", (h(r), P(() => h(r).source_url)));
                          }), q(ve, te);
                        };
                        he(_r, (ve) => {
                          h(r) && ve(Dr);
                        });
                      }
                      fc(wt, () => h(T), (ve) => C(T, ve)), q(ce, fe);
                    }, pt = (ce) => {
                      var fe = p1(), Ye = k(fe);
                      Ps(Ye, { size: 30 }), q(ce, fe);
                    };
                    he(Re, (ce) => {
                      h(A), P(() => h(A) && h(A).results.length > 1) ? ce(dt) : ce(pt, -1);
                    });
                  }
                  q(ee, ye);
                }, hn = (ee) => {
                  var ye = m1(), Re = k(ye);
                  {
                    var dt = (ce) => {
                      var fe = h1(), Ye = ie(fe), wt = S(k(Ye)), _r = k(wt);
                      Nc(_r, { size: 13 });
                      var Dr = S(Ye, 2);
                      gt(Dr, 5, () => Ni, ht, (ve, te, Oe) => {
                        var ft = u1(), We = k(ft), Fr = k(We), nt = S(We);
                        let qt;
                        var ni = S(k(nt)), no = k(ni), ao = S(no), cs = k(ao), oo = S(ni);
                        Vc(oo, { size: 15 }), se(
                          (so) => {
                            B(Fr, so), qt = kt(nt, 1, "", null, qt, { "node-active": h(y) === Oe }), B(no, (h(te), P(() => h(te).name))), B(cs, (h(te), P(() => h(te).detail)));
                          },
                          [() => P(() => String(Oe + 1).padStart(2, "0"))]
                        ), H("click", nt, () => C(y, Oe)), q(ve, ft);
                      }), H("click", wt, Ei), q(ce, fe);
                    }, pt = (ce) => {
                      var fe = g1(), Ye = k(fe);
                      jr(Ye, { size: 34, strokeWidth: 1 });
                      var wt = S(Ye, 3);
                      H("click", wt, () => {
                        C(g, "bukhari"), j(O[0]);
                      }), q(ce, fe);
                    };
                    he(Re, (ce) => {
                      h(b), hr(Lc), P(() => h(b).record_id === Lc) ? ce(dt) : ce(pt, -1);
                    });
                  }
                  q(ee, ye);
                };
                he(ii, (ee) => {
                  h(w) === "text" ? ee(sr) : h(w) === "compare" ? ee(un, 1) : ee(hn, -1);
                });
              }
              var gn = S(ii, 2), Yr = k(gn), wr = k(Yr);
              {
                var kr = (ee) => {
                  ua(ee, { size: 15 });
                }, Lr = (ee) => {
                  Nc(ee, { size: 15 });
                };
                he(wr, (ee) => {
                  h(N) ? ee(kr) : ee(Lr, -1);
                });
              }
              var na = S(wr, 1, !0), ro = S(Yr);
              {
                var os = (ee) => {
                  var ye = v1(), Re = S(k(ye));
                  si(Re, { size: 15 }), H("click", ye, () => C(b, null)), q(ee, ye);
                };
                he(ro, (ee) => {
                  h(A) && ee(os);
                });
              }
              var io = S(qe), ss = k(io);
              {
                var ls = (ee) => {
                  var ye = b1(), Re = ie(ye), dt = k(Re);
                  jr(dt, { size: 24 });
                  var pt = S(Re, 2), ce = k(pt), fe = S(pt), Ye = k(fe), wt = S(fe, 2), _r = S(k(wt), 5), Dr = k(_r), ve = S(wt), te = S(k(ve));
                  ha(te, { size: 14 }), se(() => {
                    B(ce, (hr(Ni), h(y), P(() => Ni[h(y)].name))), B(Ye, (hr(Ni), h(y), P(() => Ni[h(y)].quote))), B(Dr, `${h(b), P(() => h(b).collection_label) ?? ""} · ${h(b), P(() => h(b).chapter_title) ?? ""}`), Yt(ve, "href", (h(b), P(() => h(b).source_url)));
                  }), q(ee, ye);
                }, aa = (ee) => {
                  var ye = x1(), Re = ie(ye), dt = k(Re);
                  uo(dt, { size: 25, strokeWidth: 1.4 });
                  var pt = S(Re, 3), ce = k(pt), fe = k(ce);
                  ua(fe, { size: 15 });
                  var Ye = S(fe), wt = S(k(Ye)), _r = k(wt), Dr = S(ce), ve = k(Dr);
                  ua(ve, { size: 15 });
                  var te = S(ve), Oe = S(k(te)), ft = k(Oe), We = S(pt, 4), Fr = S(k(We));
                  Ar(Fr, { size: 15 });
                  var nt = S(We, 2), qt = S(k(nt));
                  ha(qt, { size: 13 }), se(
                    (ni) => {
                      B(_r, (h(b), P(() => h(b).collection_label))), B(ft, `نسخة Itqan · موضع ${h(b), P(() => h(b).source_position) ?? ""}`), Yt(We, "href", ni), Yt(nt, "href", (h(b), P(() => h(b).dorar_search_url)));
                    },
                    [() => P(pe)]
                  ), q(ee, ye);
                };
                he(ss, (ee) => {
                  h(y) >= 0 ? ee(ls) : ee(aa, -1);
                });
              }
              se(() => {
                B(rt, (h(b), P(() => h(b).collection_label))), B(xt, (h(b), P(() => h(b).chapter_title))), yt = kt(it, 1, "icon-button", null, yt, { saved: h(n) }), Yt(it, "aria-label", h(n) ? "أزل من دفتر المصادر" : "احفظ في دفتر المصادر"), B(na, h(N) ? "نُسخ مع المصدر" : "انسخ النص ومصدره");
              }), H("click", it, Z), H("click", Yr, ze), q(X, me);
            };
            he(rf, (X) => {
              h(b) && X(nf);
            });
          }
          se(
            (X) => {
              ei = kt(or, 1, "search-composer", null, ei, { compact: h(x) }), Yt(ti, "placeholder", h(t) ? "أدخل ألفاظ المتن للبحث في الكتب الستة…" : "اكتب الكلمات التي تتذكّرها من الحديث…"), ti.disabled = h(u), fn.disabled = h(u), ia.disabled = X;
            },
            [
              () => (h(u), h(v), P(() => h(u) || !h(v).trim()))
            ]
          ), eh(ti, () => h(v), (X) => C(v, X)), fc(fn, () => h(g), (X) => C(g, X)), H("submit", or, rh(() => j())), q(Ie, bt);
        };
        he(Zl, (Ie) => {
          h(M) ? Ie(Kp) : Ie(Hp, -1);
        });
      }
      var Qp = S(Zl, 2);
      {
        var Wp = (Ie) => {
          var bt = k1(), Pi = k(bt), dn = S(Pi), ra = k(dn);
          Yc(ra, { size: 14 }), se(() => B(Pi, h(_))), H("click", dn, () => C(_, "")), q(Ie, bt);
        };
        he(Qp, (Ie) => {
          h(_) && Ie(Wp);
        });
      }
      se(() => {
        ge = kt(ne, 1, "workspace", null, ge, { research: h(t) }), Jr = kt(Ge, 1, "sidebar", null, Jr, { "mobile-open": h(L) }), Ga = kt(Mi, 1, "sidebar-link", null, Ga, { "nav-active": !h(M) }), Qn = kt(Ii, 1, "sidebar-link", null, Qn, { "nav-active": h(M) }), B(Xo, (h(z), P(() => h(z).length))), Xa = kt(Oi, 1, "persona-option", null, Xa, { chosen: !h(t) }), Ka = kt(Ci, 1, "persona-option", null, Ka, { chosen: h(t) }), B(es, `مساحة ${h(t) ? "الباحث" : "المعرفة"}`), B(ts, h(M) ? "دفتر المصادر" : h(x) ? "من الكلمة إلى الدليل" : "بداية الرحلة");
      }), H("click", $r, () => C(L, !1)), H("click", sn, () => {
        C(p, "landing");
      }), H("click", Ti, F), H("click", Mi, () => {
        C(M, !1), C(L, !1);
      }), H("click", Ii, () => {
        C(M, !0), C(L, !1);
      }), H("click", Oi, () => {
        C(f, "learn");
      }), H("click", Ci, () => {
        C(f, "research");
      }), H("click", ln, () => C(L, !h(L))), H("click", cn, function(...Ie) {
        var bt;
        (bt = l()) == null || bt.apply(this, Ie);
      }), H("click", $a, function(...Ie) {
        var bt;
        (bt = s()) == null || bt.apply(this, Ie);
      }), q(K, ne);
    };
    he(xr, (K) => {
      h(p) === "landing" ? K(on) : K(Vr, -1);
    });
  }
  th(Wr, (K) => C(d, K), () => h(d)), se(() => Wr.dir = Wr.dir), q(i, Wr), yl();
}
const E1 = ':host{--navy:#12183f;--violet:#6150ea;--mint:#2ef2c2;--paper:#f7f8fc;--ink:#202645;--muted:#777c92;--line:#e7e9f2;font-family:Readex,Segoe UI,sans-serif;color:var(--ink);font-weight:400;color-scheme:light}.athar-dialog{position:fixed;top:0;right:0;bottom:0;left:0;width:100vw;height:100dvh;max-width:none;max-height:none;margin:0;padding:0;border:0;background:var(--paper);color:var(--ink);overflow:auto;overscroll-behavior:contain}.athar-dialog::backdrop{background:#12183f99}.athar,*{box-sizing:border-box}button,input,select{font:inherit}button,a,input,select,summary{-webkit-tap-highlight-color:transparent}button{cursor:pointer}button:disabled{cursor:wait;opacity:.6}a{color:inherit;text-decoration:none}button{border:0}button,a{touch-action:manipulation}button:focus-visible,a:focus-visible,input:focus-visible,select:focus-visible,summary:focus-visible{outline:3px solid #9485ff;outline-offset:4px}h1,h2,h3,p{margin:0}svg{flex-shrink:0}button{color:inherit}mark{background:#dff6ed;color:#1c5c4b;border-radius:3px;padding:0 .1em}small{display:block}em{font-style:normal}.sr-only{position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0,0,0,0);white-space:nowrap;border:0}.landing{background:#101634;color:#f3f3fd;position:relative;overflow:hidden;min-height:100vh}.landing:before{content:"";position:absolute;top:0;right:0;bottom:0;left:0;pointer-events:none;opacity:.18;background-image:linear-gradient(#9294b418 1px,transparent 1px),linear-gradient(90deg,#9294b418 1px,transparent 1px);background-size:70px 70px;-webkit-mask-image:linear-gradient(#000,transparent 80%);mask-image:linear-gradient(#000,transparent 80%)}.ambient{position:absolute;border-radius:50%;pointer-events:none;filter:blur(90px)}.ambient-one{width:500px;height:500px;background:#5140a92b;top:80px;left:-170px}.ambient-two{width:350px;height:350px;background:#1e978c12;right:25%;top:430px}.landing-nav{position:relative;z-index:1;max-width:1460px;margin:auto;display:flex;justify-content:space-between;align-items:center;padding:32px 5.2%;gap:28px;border-bottom:1px solid #ffffff0d}.brand{display:flex;align-items:center;gap:13px;background:none;color:inherit;text-align:right}.brand-symbol{display:grid;place-items:center;width:40px;height:43px;border:1px solid #8b82ac55;border-radius:13px;color:#b2aaf3}.wordmark{font-family:Amiri,serif;font-size:37px;line-height:1.2;color:inherit}.brand-caption{font-size:11px;color:#a3a6bd;border-right:1px solid #ffffff25;padding-right:16px;margin-right:5px}.landing-links{display:flex;align-items:center;gap:35px;font-size:11px;color:#b9bdd1}.landing-links button:hover{color:var(--mint)}.quiet-tag{font-size:11px;color:#a7aad0;border:1px solid #ffffff16;border-radius:30px;padding:7px 11px}.return-light{display:flex;align-items:center;gap:12px;background:transparent;color:#d7d9e9;font-size:11px;white-space:nowrap}.hero{position:relative;display:grid;grid-template-columns:1fr 1fr;align-items:center;gap:30px;max-width:1340px;margin:auto;min-height:620px;padding:65px 5.2% 45px}.hero-copy{padding-bottom:20px}.eyebrow{display:flex;align-items:center;gap:9px;font-size:11px;line-height:1.8;font-weight:500;letter-spacing:.02em;color:#8d92ac}.hero-copy .eyebrow{color:#b0b4ce}.live-dot{width:5px;height:5px;border-radius:50%;background:var(--mint);box-shadow:0 0 18px #2ef2c266}.hero h1{font-family:Amiri,Georgia,serif;font-weight:400;font-size:clamp(60px,5.8vw,93px);line-height:1.2;letter-spacing:-2px;margin:25px 0 26px}.hero h1 em{color:#b4f0df}.hero-description{font-size:14px;line-height:2.25;color:#a9afc9}.hero-actions{display:flex;align-items:center;gap:28px;margin-top:33px}.button{display:inline-flex;align-items:center;justify-content:center;gap:15px;min-height:47px;border-radius:8px;padding:13px 24px;font-size:12px;font-weight:500;transition:transform .2s,box-shadow .2s,background .2s;line-height:1.7}.button:hover{transform:translateY(-2px)}.mint{background:var(--mint);color:#112f31;box-shadow:0 6px 28px #2ef2c213}.mint:hover{box-shadow:0 8px 30px #2ef2c22a}.text-button{background:transparent;display:inline-flex;align-items:center;justify-content:center;gap:9px;font-size:11px;color:var(--violet);padding:5px 0;line-height:1.8}.text-button.light{color:#d2cbee}.hero-note{display:flex;gap:9px;align-items:center;color:#838da9;font-size:11px;margin-top:34px}.knowledge-orbit{position:relative;min-width:0;height:510px;direction:ltr}.orbital-lines{position:absolute;top:0;right:0;bottom:0;left:0;width:100%;height:100%;overflow:visible}.orbit-caption{position:absolute;top:9px;left:0;width:100%;text-align:center;color:#777f9f;font:8px Readex,sans-serif;letter-spacing:3px}.orbit-core{position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);width:164px;height:164px;border:1px solid #bcb4ed32;border-radius:50%;background:radial-gradient(circle at 40% 0,#6150ea33,#18204680 70%);box-shadow:0 0 80px #6150ea24,inset 0 0 30px #8a72ec09;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:12px;color:#e3e0f9;font-size:14px;direction:rtl}.core-glyph{color:#b8e9e1}.orbit-core small{font-size:11px;color:#939dbd}.book-orbit{position:absolute;display:flex;align-items:center;justify-content:center;gap:12px;padding:15px 18px;background:linear-gradient(135deg,#222b5088,#1b2240ee);border:1px solid #8994c12e;border-radius:8px;box-shadow:0 10px 20px #030b1a33;direction:rtl;white-space:nowrap;font-size:11px;-webkit-backdrop-filter:blur(8px);backdrop-filter:blur(8px);color:#c6cbe0}.book-orbit svg{color:#b2a0e9}.book-0{top:16%;left:10%}.book-1{top:22%;right:0}.book-2{top:50%;left:0}.book-3{top:63%;right:1%}.book-4{bottom:10%;left:19%}.book-5{bottom:15%;right:10%}.orbit-footer{position:absolute;bottom:0;display:flex;gap:12px;align-items:center;justify-content:center;width:100%;font-size:11px;color:#7a859f;direction:rtl}.small-line{width:24px;height:1px;background:#68729466}.orbit-trace{animation:trace 45s linear infinite}@keyframes trace{to{stroke-dashoffset:380}}.journeys{display:grid;grid-template-columns:.8fr 1fr 1fr;gap:22px;max-width:1220px;padding:0 30px 78px;margin:auto;align-items:center;position:relative}.section-label>span{font-size:11px;color:#8d95b1}.section-label h2{font-family:Amiri,serif;font-weight:400;font-size:35px;margin-top:12px}.journey-card{position:relative;text-align:right;color:#dce0f1;background:linear-gradient(115deg,#22284955,#1a2141aa);border:1px solid #7788ac35;border-radius:12px;padding:24px 26px;min-height:220px;transition:transform .3s,border .3s,background .3s;overflow:hidden}.journey-card:hover{transform:translateY(-5px);border-color:#2ef2c255;background:#222c49}.journey-card.researcher:hover{border-color:#9b89fa80}.journey-number{font-size:11px;letter-spacing:2px;direction:ltr;display:block;text-align:right;color:#929bbb}.journey-heading{display:flex;gap:14px;align-items:center;margin:19px 0 12px;color:#c5eee4}.researcher .journey-heading{color:#c5baf6}.journey-heading h3{font-size:20px;font-weight:400}.journey-card p{font-size:11px;line-height:2;color:#949fbf}.journey-bottom{display:flex;justify-content:space-between;align-items:center;font-size:11px;margin-top:24px;padding-top:17px;border-top:1px solid #8991af24;color:#a7b1cd}.approach{padding:70px 6%;background:#0c132b;border-top:1px solid #ffffff0b;position:relative}.approach>.eyebrow{justify-content:center}.approach>h2{text-align:center;font-family:Amiri,serif;font-size:34px;font-weight:400;margin-top:10px}.approach-grid{max-width:1040px;margin:50px auto 0;display:grid;grid-template-columns:repeat(3,1fr);gap:65px}.approach-grid>div>span{color:#9184cb;font-size:11px}.approach-grid h3{font-size:15px;margin:16px 0 10px;color:#d8dced}.approach-grid p{font-size:11px;line-height:2;color:#858fae}.landing-footer{display:flex;align-items:center;justify-content:space-between;gap:20px;padding:27px 6%;color:#7c87a6;font-size:11px;border-top:1px solid #ffffff0b}.landing-footer .wordmark{font-size:27px;color:#b3bcd4}.landing-footer b{font-weight:400;color:#aab3cc}.workspace{min-height:100dvh;display:grid;grid-template-columns:238px minmax(0,1fr);background:var(--paper)}.sidebar{position:sticky;top:0;height:100dvh;background:var(--navy);color:#b4bdd6;padding:29px 20px;display:flex;flex-direction:column;z-index:3}.sidebar .brand{padding:0 8px}.sidebar .wordmark{font-size:34px;color:#fff}.sidebar .brand-symbol{width:33px;height:36px;border-color:#71669b66}.lab-label{font-size:11px;color:#8791b4;border-right:1px solid #8590b033;padding-right:12px;margin-right:auto;line-height:1.9;max-width:50px}.new-journey{display:flex;align-items:center;gap:11px;background:#ffffff0a;border:1px solid #7c84b038;padding:13px 15px;border-radius:8px;color:#d8dded;font-size:11px;margin:38px 0 33px}.new-journey span{margin-right:auto;color:#9ca9c8;font-size:19px}.new-journey:hover{background:#ffffff12}.sidebar-label{font-size:11px;color:#747f9f;display:block;margin:0 13px 16px}.sidebar-link{display:flex;align-items:center;gap:12px;padding:12px 14px;border-radius:7px;background:transparent;text-align:right;color:#9da9c7;font-size:11px;margin-bottom:7px}.sidebar-link.nav-active{color:#e5e3fd;background:#6150ea29}.sidebar-link.nav-active svg{color:#b4a7ff}.count{margin-right:auto;font-size:11px;background:#c6b9ff10;padding:3px 7px;border-radius:4px}.side-separator{height:1px;background:#acb5d619;margin:28px 12px}.persona-option{display:flex;align-items:center;gap:12px;background:transparent;text-align:right;padding:13px 12px;border:1px solid transparent;border-radius:8px;color:#aab4ce;font-size:11px;margin-bottom:9px}.persona-option small{color:#6f7d9f;font-size:11px;margin-top:7px}.persona-option.chosen{border-color:#94a1c133;background:#ffffff05;color:#e3e7f1}.persona-option>svg:last-child:not(:first-child){margin-right:auto;color:#90d3c1}.sidebar-bottom{margin-top:auto;padding:35px 11px 0}.integrity-note{display:flex;gap:13px;align-items:center;color:#7f8aa9}.integrity-note svg{color:#8c9fbb}.integrity-note p{font-size:11px;line-height:2}.integrity-note strong{font-weight:400;color:#adb8d0}.powered{margin-top:27px;display:block;font-size:11px;color:#667494;direction:ltr;text-align:right}.workspace-body{min-width:0;display:flex;flex-direction:column}.workspace-top{height:78px;display:flex;align-items:center;justify-content:space-between;padding:0 38px;gap:18px;border-bottom:1px solid var(--line);background:#fafbfecc}.breadcrumb{display:flex;align-items:center;gap:13px;font-size:11px;color:#9b9fb2}.breadcrumb strong{color:#555e7e;font-weight:400}.top-actions{display:flex;align-items:center;gap:22px}.preview-label{font-size:11px;color:#8b8ba3;display:flex;align-items:center;gap:6px;white-space:nowrap}.preview-label>span{width:4px;height:4px;background:#a493ec;border-radius:50%}.original-button{font-size:11px;border:1px solid #dadeea;border-radius:6px;background:transparent;padding:9px 11px;display:flex;gap:9px;align-items:center;white-space:nowrap}.workspace-main{width:100%;max-width:1210px;margin:0 auto;padding:36px 6% 45px;flex:1}.welcome{text-align:center;padding-top:23px}.welcome-emblem{width:62px;height:62px;display:grid;place-items:center;margin:0 auto 23px;border:1px solid #dcd7f5;border-radius:18px;background:linear-gradient(135deg,#fff,#edeafc);color:#8d7bd2;box-shadow:0 10px 35px #6150ea08}.welcome .eyebrow{justify-content:center;font-size:11px}.welcome h1,.page-heading h1{font-family:Amiri,serif;font-size:43px;font-weight:400;line-height:1.6;margin:12px 0 8px;color:var(--navy)}.welcome>p,.page-heading>p{font-size:11px;color:#85899f;line-height:2}.search-composer{max-width:805px;margin:33px auto 0;border:1px solid #dcdfea;background:#fff;border-radius:14px;padding:22px 22px 14px;box-shadow:0 10px 30px #313d6c05;transition:box-shadow .2s,border .2s}.search-composer:focus-within{border-color:#b6a9ed;box-shadow:0 6px 30px #6150ea0b}.composer-input{display:flex;align-items:center;gap:15px}.composer-input>svg{color:#999cb2}.composer-input input{width:100%;min-width:0;font-size:14px;line-height:2.1;outline:none!important;border:0;background:transparent;color:#343b5b}.composer-input input::placeholder{color:#a7abbc}.composer-bottom{display:flex;align-items:center;gap:15px;margin-top:23px}.collection-filter{display:flex;align-items:center;gap:7px;font-size:11px;color:#777d96}.collection-filter>select{border:0;background:transparent;color:inherit;outline:none;padding:4px;max-width:145px;font-size:11px}.search-type{font-size:11px;border-right:1px solid var(--line);padding-right:13px;color:#a8adbd}.submit-search{width:37px;height:37px;border-radius:9px;display:grid;place-items:center;background:var(--violet);color:#fff;margin-right:auto}.submit-search:disabled{opacity:.4;cursor:default}.quick-examples{display:flex;flex-wrap:wrap;align-items:center;justify-content:center;gap:10px;margin:16px auto 0;font-size:11px}.quick-examples>span{color:#9b9fb2;margin-left:5px}.quick-examples button{display:flex;align-items:center;gap:9px;font-size:11px;color:#7d8098;background:transparent;border:1px solid #e2e4ed;border-radius:30px;padding:7px 10px}.quick-examples button:hover{border-color:#b6ace1;color:var(--violet)}.usecases{display:grid;grid-template-columns:repeat(3,1fr);max-width:805px;gap:14px;margin:42px auto 0}.usecases button{display:flex;gap:13px;align-items:center;text-align:right;background:transparent;border:1px solid #e1e4ee;border-radius:9px;padding:18px 15px;transition:background .2s,transform .2s}.usecases button:hover{background:#fff;transform:translateY(-2px)}.usecases button>svg:first-child{color:#8f84ba}.usecases button>svg:last-child{margin-right:auto;color:#aab0c4}.usecases span{font-size:11px;color:#59617f}.usecases small{margin-top:7px;font-size:11px;color:#9b9fb4}.source-strip{display:flex;flex-wrap:wrap;justify-content:center;gap:18px;color:#a4a8ba;font-size:11px;margin:37px auto 0}.source-strip>span:first-child{color:#777e98}.welcome-footnote{display:flex;justify-content:center;align-items:center;gap:7px;color:#9fa6b9;font-size:11px;margin-top:24px;line-height:1.9;text-align:center}.workspace-footer{display:flex;justify-content:space-between;gap:16px;padding:18px 38px;font-size:11px;color:#a4aabe;border-top:1px solid #e8eaf2}.icon-button{display:grid;place-items:center;border:1px solid transparent;border-radius:6px;padding:7px;color:#8a90a7;background:transparent}.icon-button:hover{background:#ededf7}.icon-button.saved{color:#6150ea;background:#eeeafa}.result-heading{display:flex;justify-content:space-between;align-items:center}.result-heading h1{font-family:Amiri,serif;font-size:33px;font-weight:400;line-height:1.8;color:var(--navy)}.result-heading .eyebrow{font-size:11px}.journey-steps{list-style:none;display:flex;gap:15px;align-items:center;margin:19px 0 0;padding:0}.journey-steps li{display:flex;gap:8px;align-items:center;color:#acb0c2;font-size:11px;flex:1}.journey-steps li:not(:last-child):after{content:"";height:1px;background:#e4e6ee;flex:1;margin-right:9px}.journey-steps span{font-size:11px;padding:5px 7px;background:#eff0f7;border-radius:4px}.journey-steps .complete{color:#8271bc}.journey-steps .complete span{background:#eae5f7}.search-composer.compact{max-width:none;margin:25px 0 28px;display:flex;gap:10px;align-items:center;padding:11px 14px;border-radius:10px}.compact .composer-input{flex:1;min-width:0}.compact .composer-input input{font-size:12px}.compact .composer-bottom{margin:0;gap:10px}.compact .search-type{display:none}.results-meta{display:flex;justify-content:space-between;gap:14px;align-items:center;margin:20px 0}.results-meta h2{font-size:13px;font-weight:400;color:#646e89}.results-meta>span{font-size:11px;color:#9ca3b7}.result-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:17px}.result-card{text-align:right;border:1px solid #e0e3ed;border-radius:12px;background:#fff;padding:21px;transition:box-shadow .2s,border .2s;display:flex;flex-direction:column;min-width:0}.result-card:hover{border-color:#b4a9e3;box-shadow:0 8px 25px #31376c08}.result-card-top{display:flex;justify-content:space-between;align-items:center}.book-label{color:#797297;font-size:11px;display:inline-flex;gap:7px;align-items:center}.result-index{font-size:11px;color:#b1b7c8;direction:ltr}.result-card h3{font-size:11px;color:#9ca3b6;font-weight:400;margin-top:8px}.hadith-snippet{font:22px/1.9 Amiri,serif;color:#424e6c;margin:18px 0 24px;flex:1}.result-card-bottom{display:flex;justify-content:space-between;align-items:center;gap:12px;font-size:11px;border-top:1px solid #edf0f5;padding-top:13px;color:#929ab1}.result-card-bottom svg{color:#9a8ebd}.small-note{font-size:11px;line-height:1.9;color:#999fb3;margin:15px 0}.evidence-layout{display:grid;grid-template-columns:minmax(0,1fr) 247px;gap:22px;align-items:start}.evidence-panel{border:1px solid #e1e4ed;border-radius:12px;background:#fff;overflow:hidden;min-width:0}.evidence-header{display:flex;justify-content:space-between;gap:15px;padding:24px 26px}.evidence-header .eyebrow{font-size:11px}.evidence-header h2{font-size:20px;font-family:Amiri,serif;font-weight:400;color:#364262;margin:7px 0 3px}.evidence-header p{font-size:11px;color:#9299ad}.evidence-header>.icon-button{align-self:flex-start}.evidence-tabs{display:flex;border-bottom:1px solid #e9ebf2;padding:0 26px;gap:25px}.evidence-tabs button{display:flex;gap:6px;align-items:center;padding:13px 0;border-bottom:2px solid transparent;background:none;font-size:11px;color:#8b92a8}.evidence-tabs [aria-selected=true]{color:#7360b2;border-bottom-color:#8673c3}.tab-dot{width:4px;height:4px;border-radius:50%;background:#aca3c8}.text-lens,.comparison-lens,.chain-lens{padding:24px 26px}.source-state{font-size:11px;color:#9c8761;display:flex;gap:7px;align-items:center;line-height:1.8}.source-state>span{width:4px;height:4px;background:#bfa77e;border-radius:50%;flex-shrink:0}.full-hadith{font-family:Amiri,serif;font-size:25px;line-height:2.2;color:#374461;margin:24px 0 25px;text-align:justify;overflow-wrap:anywhere}.translation{padding:15px 0;border-top:1px solid #eeeef5;font-size:11px;color:#7d869c}.translation summary{cursor:pointer}.translation p{font:13px/1.8 Readex,system-ui;margin-top:15px;color:#707b94}.source-disclosure{width:100%;background:none;border-top:1px solid #eeeef5;padding:15px 0 0;display:flex;align-items:center;gap:9px;color:#8b93a8;font-size:11px;text-align:right}.source-disclosure>span{margin-right:auto}.source-data{background:#f7f8fb;border-radius:6px;margin-top:13px;padding:15px;overflow-wrap:anywhere;white-space:pre-wrap;font-size:11px;line-height:2;color:#798199}.source-data a{display:inline-flex;gap:7px;margin-top:9px;color:#7163a2}.evidence-actions{display:flex;align-items:center;justify-content:space-between;gap:10px;border-top:1px solid var(--line);padding:17px 24px;background:#fdfdff}.outline{color:#797a9f;background:#fff;border:1px solid #dedfeb}.small{font-size:11px;min-height:34px;padding:8px 12px;gap:7px}.violet{color:#fff;background:var(--violet)}.insight-panel{border:1px solid #e0deef;border-radius:12px;padding:25px 22px;background:linear-gradient(150deg,#f0edf9,#f7f8fc);position:sticky;top:20px;min-width:0}.insight-icon{width:45px;height:45px;border:1px solid #dcd6ee;border-radius:12px;display:grid;place-items:center;color:#9381b9;margin-bottom:22px}.insight-panel .eyebrow{font-size:11px}.insight-panel h2{font-family:Amiri,serif;font-size:26px;line-height:1.65;font-weight:400;color:#50456c;margin:7px 0 20px}.evidence-checklist{list-style:none;padding:0;margin:0;display:flex;flex-direction:column;gap:19px}.evidence-checklist li{display:flex;gap:9px;align-items:flex-start;font-size:11px;color:#70728c}.evidence-checklist svg{color:#79a998}.evidence-checklist small{color:#9b9bb1;font-size:11px;margin-top:6px;line-height:1.9}.hollow-dot{border:1px solid #b8a887;border-radius:50%;width:11px;height:11px;margin:2px;flex-shrink:0}.insight-divider{height:1px;background:#e2deed;margin:25px 0}.insight-panel h3{font-weight:400;font-size:11px;color:#6f6686;margin-bottom:12px}.insight-panel>p{font-size:11px;color:#9a92ab;line-height:2}.insight-panel>.button{width:100%;padding:11px 10px;font-size:11px;min-height:40px;margin-top:16px;gap:7px}.handoff-note{font-size:11px;color:#a5a0b7;text-align:center;margin-top:8px;line-height:1.8}.dorar-link{font-size:11px;color:#8c7fa4;display:flex;justify-content:center;gap:7px;margin-top:21px}.insight-panel .small-note{font-size:11px}.insight-panel blockquote{font:21px/1.9 Amiri,serif;color:#696780;border-right:2px solid #ccc3e4;margin:0;padding:0 13px}.insight-panel dl{font-size:11px}.insight-panel dt{color:#8c84a0;margin:15px 0 7px}.insight-panel dd{margin:0;color:#a5a0b4;font-size:11px;line-height:1.9}.compare-select{display:flex;flex-direction:column;gap:10px;font-size:11px;color:#797c98}.compare-select select{max-width:100%;padding:10px;border:1px solid var(--line);border-radius:7px;color:#6d6f8d;background:#fafbfe;font-size:11px}.comparison-columns{display:grid;grid-template-columns:1fr 1fr;gap:15px;margin-top:20px}.comparison-columns article{min-width:0;background:#fafafd;border:1px solid #edeef6;border-radius:8px;padding:15px}.comparison-columns p{font:20px/2 Amiri,serif;margin-top:13px;color:#5d6883;overflow-wrap:anywhere}.comparison-columns a{display:flex;gap:7px;color:#9483b1;font-size:11px;margin-top:12px}.chain-caption{display:flex;justify-content:space-between;gap:10px;font-size:11px;color:#8c87a2;align-items:center}.chain-caption .text-button{font-size:11px}.chain-nodes{max-width:410px;margin:22px auto 0;position:relative}.chain-row{display:flex;align-items:center;gap:14px;margin:0 0 21px}.chain-index{font-size:11px;color:#b4b0c5;direction:ltr}.chain-row button{position:relative;display:flex;align-items:center;gap:14px;border:1px solid #e0daed;padding:14px;background:linear-gradient(110deg,#fcfcfe,#f9f7fe);border-radius:9px;width:100%;text-align:right;font-size:11px;color:#68637e;min-width:0}.chain-row:not(:last-child) button:after{content:"";position:absolute;right:18px;width:1px;background:#c8bddb;height:22px;top:100%}.chain-row:not(:last-child) button:before{content:"";position:absolute;right:16px;width:5px;height:5px;border-right:1px solid #b4a3cc;border-bottom:1px solid #b4a3cc;transform:rotate(45deg);top:calc(100% + 8px)}.chain-row small{font-size:11px;color:#b0a7bf;margin-top:7px;line-height:1.7}.chain-row .node-active{border-color:#ac96cb;background:#f2eefa;box-shadow:0 3px 12px #ac96cb15}.chain-row button>svg{margin-right:auto;color:#b5a3cb}.node-dot{width:8px;height:8px;border:1px solid #a892c7;border-radius:50%;flex-shrink:0}.node-active .node-dot{background:#b3a3cc}.empty-state{text-align:center;display:flex;flex-direction:column;align-items:center;gap:15px;padding:55px 25px;color:#a39abb}.empty-state h2{font:29px/1.5 Amiri,serif;color:#666580}.empty-state p{font-size:11px;max-width:410px;line-height:2;color:#9299ac}.empty-state h3{font-size:14px;font-weight:400}.empty-state .button{margin-top:10px;font-size:11px}.page-heading{margin-bottom:26px}.saved-list{display:flex;flex-direction:column;gap:15px;margin-top:25px}.saved-item{border:1px solid #e2e4ee;display:flex;align-items:center;gap:20px;background:#fff;padding:23px;border-radius:10px;color:#7c7298;text-align:right}.saved-item span{font-size:14px;flex:1}.saved-item small{font-size:11px;color:#a19aaf;margin-top:10px}.notice{position:fixed;bottom:22px;left:50%;transform:translate(-50%);padding:13px 17px;display:flex;align-items:center;gap:20px;color:#d8dcec;background:#222b49;border:1px solid #56617c;border-radius:9px;font-size:11px;max-width:90%;z-index:5;box-shadow:0 10px 30px #12183f15}.error-box{border:1px solid #e6ccd0;border-radius:10px;padding:22px;color:#ac747d;background:#fdf7f8}.error-box h2{font-size:15px;font-weight:400}.error-box p{font-size:12px;line-height:2;margin:10px 0}.error-box button{font-size:11px}.spinner{display:inline-block;width:17px;height:17px;border:1px solid currentColor;border-bottom-color:transparent;border-radius:50%;animation:spin 1s linear infinite}@keyframes spin{to{transform:rotate(360deg)}}.loading-state{color:#9187ac;font-size:12px;margin:30px 0}.loading-state>.spinner{vertical-align:middle;margin-left:8px}.skeleton{height:125px;background:linear-gradient(90deg,#eeedf5,#f9f9fc,#eeedf5);background-size:200% 100%;animation:shimmer 2s infinite;margin-top:20px;border-radius:11px}@keyframes shimmer{to{background-position:-200% 0}}.mobile-only{display:none}@media (min-width:1600px){.hero{min-height:680px}.workspace-main{padding-top:55px}.welcome{padding-top:50px}.usecases{margin-top:55px}}@media (max-width:1150px){.hero h1{font-size:69px}.hero{gap:25px;padding-top:40px;min-height:570px}.knowledge-orbit{height:460px}.book-orbit{padding:12px 11px;font-size:11px;gap:8px}.orbit-core{width:138px;height:138px}.landing-links{gap:20px}.brand-caption{display:none}.workspace{grid-template-columns:210px minmax(0,1fr)}.sidebar{padding:25px 14px}.workspace-top{padding:0 25px}.workspace-main{padding:32px 4%}.evidence-layout{grid-template-columns:minmax(0,1fr) 210px;gap:15px}.insight-panel{padding:21px 16px}.usecases{gap:9px}.usecases button{padding:17px 11px;gap:9px}.usecases button>svg:last-child{display:none}.workspace-footer{padding:18px 25px}.text-lens,.comparison-lens,.chain-lens{padding:20px}.full-hadith{font-size:23px}.evidence-header{padding:22px 20px}}@media (max-width:900px){.landing-links>a{display:none}.hero{grid-template-columns:1.1fr 1fr;gap:10px;padding:40px 5%}.hero h1{font-size:60px}.hero-description{font-size:12px}.hero-actions{gap:18px}.hero-actions .text-button{font-size:11px}.hero-actions .button{font-size:11px;padding:11px 17px}.knowledge-orbit{height:400px}.book-orbit{font-size:11px;padding:10px 9px;gap:6px}.book-orbit svg{width:13px}.orbit-core{width:115px;height:115px;font-size:11px;gap:9px}.core-glyph svg{width:26px}.orbit-core small{font-size:11px}.orbit-caption{font-size:6px;letter-spacing:2px}.orbit-footer{font-size:11px}.book-0{left:5%}.book-1{right:-3%}.book-2{left:-3%}.book-3{right:-3%}.book-4{left:7%;bottom:14%}.book-5{right:1%;bottom:19%}.journeys{grid-template-columns:1fr 1fr;padding:0 5% 50px}.section-label{grid-column:1/-1;margin:10px 0 0}.section-label h2{margin-top:5px;font-size:29px}.journey-card{padding:22px}.approach-grid{gap:30px}.workspace{grid-template-columns:178px minmax(0,1fr)}.sidebar{padding:24px 11px}.sidebar .brand{gap:9px}.lab-label{display:none}.sidebar-link,.persona-option{font-size:11px;gap:9px;padding:11px 9px}.persona-option small{font-size:11px}.new-journey{font-size:11px;padding:12px 10px}.workspace-top{padding:0 20px}.preview-label{display:none}.breadcrumb{font-size:11px;gap:7px}.welcome h1{font-size:35px}.welcome>p{font-size:11px}.evidence-layout{grid-template-columns:1fr}.insight-panel{position:static}.insight-panel h2 br{display:none}.evidence-checklist{flex-direction:row;flex-wrap:wrap;gap:20px}.insight-panel>.button{width:auto}.insight-icon{float:left;margin-bottom:10px}.insight-panel .handoff-note{text-align:right}.dorar-link{justify-content:flex-start}.insight-divider{margin:18px 0}.insight-panel h2{font-size:24px;margin-bottom:18px}.insight-panel .small-note{margin-bottom:0}.full-hadith{font-size:25px}.usecases{grid-template-columns:1fr}.usecases button{padding:14px;gap:15px}.usecases small{display:inline;margin-right:12px}.usecases button>svg:last-child{display:block}.usecases{margin-top:30px}.source-strip{gap:12px}.workspace-footer{padding:18px;font-size:11px}.result-card{padding:16px}.hadith-snippet{font-size:21px}.results-meta{align-items:flex-start;flex-direction:column;gap:8px}.compact{flex-wrap:wrap}.compact .composer-input{flex-basis:100%}.compact .composer-bottom{width:100%}.compact .submit-search{margin-right:auto}}@media (max-width:620px){.landing-nav{padding:22px 6%;gap:14px}.landing-links{display:none}.brand-symbol{width:32px;height:35px}.wordmark{font-size:31px}.return-light{font-size:11px;gap:6px}.hero{display:flex;flex-direction:column;padding:45px 7% 20px;gap:5px;align-items:stretch}.hero h1{font-size:67px;margin:25px 0 20px}.hero-copy .eyebrow{font-size:11px}.hero-description{font-size:12px}.hero-actions{margin-top:26px;gap:21px}.hero-note{font-size:11px;margin-top:23px}.knowledge-orbit{width:100%;height:380px;margin:10px auto 15px;max-width:370px}.book-orbit{font-size:11px}.orbit-core{width:132px;height:132px}.book-0{left:8%}.book-1{right:0}.book-2{left:0}.book-3{right:0}.book-4{bottom:11%;left:15%}.book-5{bottom:18%;right:3%}.journeys{grid-template-columns:1fr;padding:0 7% 48px;gap:15px}.section-label{margin-bottom:8px}.journey-card{min-height:200px;padding:23px}.journey-heading{margin-top:17px}.journey-bottom{margin-top:19px}.approach{padding:45px 7%}.approach>h2{font-size:28px}.approach-grid{grid-template-columns:1fr;gap:28px;margin-top:32px}.approach-grid h3{margin-top:10px}.approach-grid p{max-width:320px}.landing-footer{padding:25px 7%;flex-wrap:wrap;font-size:11px;gap:15px}.landing-footer>span:nth-child(2){order:3;width:100%}.workspace{display:block}.sidebar{position:fixed;width:245px;right:0;top:0;height:100dvh;transform:translate(100%);transition:transform .25s;box-shadow:-10px 0 45px #12183f22}.sidebar.mobile-open{transform:translate(0)}.mobile-only{display:grid}.workspace-top{height:67px;padding:0 13px}.breadcrumb{font-size:11px;gap:5px}.breadcrumb>span{display:none}.original-button{font-size:11px;padding:8px;gap:5px}.top-actions{gap:0}.workspace-main{padding:29px 20px}.welcome{padding-top:18px}.welcome h1{font-size:34px;line-height:1.5;margin-top:16px}.welcome .eyebrow{font-size:11px}.welcome>p{font-size:11px;margin:12px auto;max-width:280px}.welcome-emblem{width:55px;height:55px;margin-bottom:20px}.search-composer{margin-top:28px;padding:17px 15px 12px}.composer-input{gap:11px}.composer-input input{font-size:12px}.composer-input>svg{width:19px}.composer-bottom{gap:10px;margin-top:18px}.search-type{font-size:11px;padding-right:9px}.collection-filter select{font-size:11px;max-width:113px}.collection-filter{gap:3px}.quick-examples{gap:8px;font-size:11px;margin-top:18px}.quick-examples>span{width:100%;text-align:center;margin-bottom:3px}.quick-examples button{font-size:11px}.usecases{margin-top:28px;gap:10px}.usecases small{display:block;margin:6px 0 0;font-size:11px}.usecases span{font-size:11px}.source-strip{gap:10px;font-size:11px;line-height:1.9;margin-top:27px}.source-strip>span:first-child{width:100%;text-align:center}.welcome-footnote{font-size:11px;align-items:flex-start;gap:5px;margin-top:18px}.workspace-footer{font-size:11px;padding:16px 20px;flex-direction:column;gap:7px}.result-heading h1{font-size:27px}.journey-steps{gap:8px;flex-wrap:wrap}.journey-steps li{font-size:11px;gap:5px;white-space:nowrap}.journey-steps li:not(:last-child):after{display:none}.journey-steps span{font-size:11px;padding:4px}.result-grid{grid-template-columns:1fr}.hadith-snippet{font-size:23px}.result-card{padding:21px}.evidence-tabs{gap:23px;padding:0 20px}.evidence-tabs button{font-size:11px}.text-lens,.chain-lens,.comparison-lens{padding:20px}.full-hadith{font-size:25px;line-height:2.1;text-align:right}.source-state{font-size:11px}.comparison-columns{grid-template-columns:1fr}.comparison-columns p{font-size:23px}.evidence-actions{padding:16px 20px;flex-wrap:wrap}.evidence-checklist{flex-direction:column;gap:18px}.insight-panel{padding:23px}.chain-caption,.chain-row button,.chain-row small{font-size:11px}.chain-row{gap:10px}.notice{font-size:11px;width:90%}.search-composer.compact{padding:13px}.result-heading .eyebrow{font-size:11px}}@media (prefers-reduced-motion:reduce){*,*:before,*:after{animation:none!important;transition:none!important;scroll-behavior:auto!important}}.landing-links button{background:transparent;color:inherit;padding:0;font-size:11px}.close-menu{position:absolute;left:8px;top:8px;color:#b1b9d2}.welcome>p,.page-heading>p{font-size:13px}.sidebar-link,.persona-option{font-size:12px}.sidebar-label{font-size:11px}.welcome-footnote{color:#737d94}.source-strip{color:#7e869d}.hero-note{color:#9ea8c2}.small-note{color:#737c94}.source-state{color:#8b724b}.search-type{color:#788299}.preview-label{color:#777e96}@media (max-width:900px){.landing-links>button{display:none}}@media (max-width:620px){.search-type{display:none}.welcome>p{font-size:12px}.journey-steps li{font-size:10px}.workspace-top .breadcrumb strong{font-size:11px}.original-button,.source-strip,.workspace-footer{font-size:10px}.chain-caption{align-items:flex-start;flex-direction:column}.welcome h1{font-size:31px}}@media (max-width:620px){.sidebar{visibility:hidden}.sidebar.mobile-open{visibility:visible}}.variant-actions{display:flex;align-items:center;gap:22px}@media (max-width:620px){.variant-actions{gap:12px}.top-actions{gap:6px}.top-actions .original-button{font-size:9px;padding:7px}.landing-nav .return-light{font-size:9px}}', T1 = "data:font/woff2;base64,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", M1 = "data:font/woff2;base64,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", I1 = "data:font/woff2;base64,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", O1 = 'html[data-athar-chat-v2] .app>div{flex-direction:row-reverse!important;justify-content:flex-end!important;background:#f8f9fe!important}html[data-athar-chat-v2] #chat-container{background:radial-gradient(ellipse at 50% 0,#efedf980,transparent 60%),#fafbff}html[data-athar-chat-v2] #sidebar{left:auto!important;right:0!important;background:#292151!important;color:#ece8ff!important;border-color:#615788!important;box-shadow:-8px 0 35px #18123812}html[data-athar-chat-v2] #sidebar [class*=text-gray-]{color:#c9c3e5!important}html[data-athar-chat-v2] #sidebar [class*=bg-gray-],html[data-athar-chat-v2] #sidebar [class*=from-gray-]{background-color:transparent!important;--tw-gradient-from:transparent!important}html[data-athar-chat-v2] #sidebar button:hover,html[data-athar-chat-v2] #sidebar a:hover{background-color:#ffffff12!important;color:#fff!important}html[data-athar-chat-v2] #sidebar [class*=border-]{border-color:#5d527b55!important}html[data-athar-chat-v2] #sidebar img[alt="Open WebUI"]{background:#fff;border-radius:7px;padding:2px}html[data-athar-chat-v2] #sidebar-resizer{display:none!important}html[data-athar-chat-v2] [data-athar-v2-slot=welcome]{padding-top:32px!important;padding-bottom:28px!important;transform:none!important}html[data-athar-chat-v2] #message-input-container{background:#fff!important;color:#202645!important;border:1px solid #dadbe9!important;box-shadow:0 12px 30px #22165006!important;border-radius:22px!important}html[data-athar-chat-v2] #chat-input{color:#202645!important;caret-color:#6150ea}html[data-athar-chat-v2] #chat-container nav{background:linear-gradient(#fafbff,#fafbffdd,transparent)}html.dark[data-athar-chat-v2] #chat-container{background:radial-gradient(ellipse at 50% 0,#30264b66,transparent 60%),#171626}html.dark[data-athar-chat-v2] #chat-container nav{background:linear-gradient(#171626,#171626dd,transparent)}html.dark[data-athar-chat-v2] .athar-v2-intro h2{color:#eee8fa}html[data-athar-chat-v2] #message-input-container [class*=text-gray-]{color:#70657d!important}html[data-athar-chat-v2] [data-athar-v2-slot=suggestions]{display:none!important}html[data-athar-chat-v2] [data-athar-v2-slot=suggestions-width]{width:100%;max-width:44rem!important;padding:0 20px}html[data-athar-chat-v2] [data-athar-v2-slot=composer-slot]{padding-top:16px!important;padding-bottom:2px!important}html[data-athar-chat-v2] .athar-v2-audience,html[data-athar-chat-v2] .athar-v2-cards{font-family:AtharReadex,Segoe UI,sans-serif;font-size:14px;line-height:1.5;font-weight:400;width:100%;max-width:44rem;margin:0 auto;color:#242a47}.athar-v2-audience,.athar-v2-cards,.athar-v2-auth-intro{display:none}html[data-athar-chat-v2] .athar-v2-audience,html[data-athar-chat-v2] .athar-v2-cards{display:block}.athar-v2-audience{padding:17px 20px 0}.athar-v2-intro{text-align:center;margin-bottom:17px}.athar-v2-eyebrow{font-size:11px;letter-spacing:.025em;color:#8b83a6}.athar-v2-intro h2{font-size:23px;font-weight:400;margin:7px 0 0;line-height:1.8;color:#2a2544}.athar-v2-toggles{display:grid;grid-template-columns:1fr 1fr;gap:12px}.athar-v2-persona{display:flex;align-items:center;gap:13px;padding:20px 18px;min-height:92px;border:1px solid #e2dfed;border-radius:13px;background:#fff;text-align:right;cursor:pointer;transition:background .18s,border .18s,box-shadow .18s;color:#7a708f}.athar-v2-persona>svg{width:26px;height:26px;flex-shrink:0}.athar-v2-persona strong{font-size:15px;font-weight:500;display:block;line-height:1.7;color:#39334e}.athar-v2-persona small{font-size:10px;display:block;color:#9b93ab;line-height:1.9;margin-top:4px}.athar-v2-persona[aria-pressed=true]{border-color:#9583d6;background:#f3f0fb;box-shadow:0 3px 14px #6150ea09;color:#7660b0}.athar-v2-radio{width:13px;height:13px;border:1px solid #d1cbdc;flex-shrink:0;border-radius:50%;margin-right:auto}.athar-v2-persona[aria-pressed=true] .athar-v2-radio{background:#7a62ba;border:3px solid #ded5f0;box-shadow:0 0 0 1px #a28cce}.athar-v2-cards-heading{display:flex;justify-content:space-between;align-items:center;gap:10px;font-size:11px;color:#8b829e;margin:14px 0 13px}.athar-v2-show-all{padding:5px 9px;background:transparent;color:#8b77b2;font-size:10px;cursor:pointer}.athar-v2-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:12px}.athar-v2-card{min-width:0;aspect-ratio:1;display:flex;flex-direction:column;align-items:flex-start;padding:18px 19px;text-align:right;border:1px solid #e2dfed;border-radius:15px;background:#fff;cursor:pointer;transition:transform .2s,border .2s,box-shadow .2s;color:#665675;animation:athar-card-in .3s ease both}.athar-v2-card:nth-child(2){animation-delay:35ms}.athar-v2-card:nth-child(3){animation-delay:.07s}.athar-v2-card:hover{border-color:#b6a2d2;transform:translateY(-3px);box-shadow:0 8px 24px #5141760a}.athar-v2-card-top{width:100%;display:flex;align-items:center;justify-content:space-between;margin-bottom:auto}.athar-v2-card-top>svg{width:24px;height:24px;color:#9b85b6}.athar-v2-card-top small{font-size:9px;color:#b4a6c3}.athar-v2-card[data-audience=research] .athar-v2-card-top svg{color:#786ac5}.athar-v2-card strong{font-size:13px;font-weight:500;line-height:1.85;margin-top:17px;color:#4a3b5b}.athar-v2-card-description{font-size:10px;line-height:1.9;color:#a094ac;margin-top:5px}.athar-v2-card>svg{width:16px;height:16px;color:#a99ab9;margin-top:14px;align-self:flex-end}.athar-v2-status{font-size:10px;line-height:1.9;text-align:center;color:#aaa1b4;margin:16px 0 7px;min-height:20px}.athar-v2-persona:focus-visible,.athar-v2-card:focus-visible,.athar-v2-show-all:focus-visible{outline:2px solid #9e88d0;outline-offset:3px}.athar-v2-intro{margin-bottom:12px}.athar-v2-intro .athar-v2-eyebrow{display:none}.athar-v2-intro h2{font-size:18px;margin:0;line-height:1.5}.athar-v2-card-description{color:#776783;font-size:11px}.athar-v2-persona small{color:#776783}.athar-v2-cards-heading,.athar-v2-show-all{color:#78648d}.athar-v2-status{color:#84758f}html[data-athar-auth-v2] #auth-page{padding-right:43vw;background:#fafbff}html[data-athar-auth-v2] #auth-page>div:first-child{background:#fafbff!important}html[data-athar-auth-v2] #auth-container{width:57vw;left:0;color:#29233e!important;z-index:2}html[data-athar-auth-v2] #auth-login-card{padding:32px;max-width:440px;color:#29233e!important}html[data-athar-auth-v2] #auth-login-card [class*=text-gray-]{color:#655b74!important}html[data-athar-auth-v2] #auth-login-card input{border-bottom:1px solid #ddd7e9;padding:10px 0;color:#29233e}html[data-athar-auth-v2] #auth-login-card button[type=submit]{background:#655284;color:#fff!important}#auth-login-card{direction:rtl!important;font-family:AtharReadex,system-ui,sans-serif!important;text-align:right!important}#auth-login-card label{text-align:right!important;font-family:AtharReadex,sans-serif!important}#auth-login-card input{text-align:right!important;font-family:AtharReadex,sans-serif!important;direction:rtl!important}#auth-login-card input[type=password],#auth-login-card input[type=email]{direction:ltr!important;text-align:right!important}#auth-login-card input::placeholder{text-align:right!important;font-family:AtharReadex,sans-serif!important;direction:rtl!important}#auth-login-card .text-2xl{font-family:AtharAmiri,serif!important;font-size:30px!important;line-height:1.6!important;text-align:center!important;font-weight:600!important}#auth-login-card button[type=submit]{font-family:AtharReadex,sans-serif!important;font-size:14px!important;font-weight:500!important}#auth-login-card form label.text-left{text-align:right!important}#auth-login-card button.pl-1\\.5{padding-left:0!important;padding-right:.375rem!important}html[data-athar-auth-v2] .athar-v2-auth-intro{display:flex;flex-direction:column;justify-content:center;position:fixed;right:0;top:0;width:43vw;height:100dvh;background:radial-gradient(ellipse at 0 0,#60549d55,transparent 75%),#292151;padding:7vw 5vw;color:#eee9fa;font-family:AtharReadex,Segoe UI,sans-serif;z-index:1;overflow:hidden}.athar-v2-auth-intro:after{content:"";position:absolute;width:320px;height:320px;border:1px solid #8574ae28;border-radius:50%;right:-140px;bottom:-160px;box-shadow:0 0 0 65px #8574ae09,0 0 0 130px #8574ae07;pointer-events:none}.athar-v2-auth-intro h1{white-space:pre-line;font:46px/1.75 AtharAmiri,serif;margin:21px 0;color:#efe7fb}.athar-v2-auth-intro>p{font-size:13px;line-height:2.25;color:#ada2c8;max-width:360px}.athar-v2-auth-intro .athar-v2-eyebrow{color:#b9a6d8;font-size:12px}.athar-v2-auth-features{display:flex;gap:22px;padding:28px 0;margin-top:16px;border-top:1px solid #65537c55}.athar-v2-auth-features span{display:flex;align-items:center;gap:10px;font-size:12px;color:#d7c5ec}.athar-v2-auth-features svg{width:22px;height:22px}.athar-v2-auth-intro>small{font-size:10px;color:#8d80ac;margin-top:50px}@keyframes athar-card-in{0%{opacity:0;transform:translateY(6px)}to{opacity:1;transform:none}}@media (max-width:767px){html[data-athar-chat-v2] #sidebar{transform:none!important}.athar-v2-audience{padding-top:10px}.athar-v2-persona{padding:14px 11px;gap:8px;min-height:88px}.athar-v2-persona strong{font-size:12px}.athar-v2-persona small{font-size:9px}.athar-v2-persona>svg{width:21px}.athar-v2-radio{display:none}.athar-v2-card{padding:13px 12px;aspect-ratio:auto;min-height:162px}.athar-v2-card strong{font-size:11px;line-height:1.8}.athar-v2-card-description{font-size:9px}.athar-v2-grid{gap:8px}.athar-v2-intro h2{font-size:21px}.athar-v2-cards-heading{font-size:10px}}@media (max-width:480px){.athar-v2-grid{grid-template-columns:repeat(2,minmax(0,1fr))}.athar-v2-card{aspect-ratio:1}.athar-v2-card strong{font-size:12px}.athar-v2-card-description{font-size:10px}.athar-v2-persona{align-items:flex-start}.athar-v2-persona>svg{width:18px;height:18px;margin-top:4px}.athar-v2-persona small{font-size:8px}}@media (max-width:900px){html[data-athar-auth-v2] #auth-page{padding-right:0}html[data-athar-auth-v2] #auth-container{width:100%}.athar-v2-auth-intro{display:none!important}html[data-athar-auth-v2] #auth-page:before{content:"بيان السُّنّة / الحديث النبوي للمعرّفين بالإسلام";position:fixed;top:85px;left:16px;right:16px;text-align:center;font:13px/1.8 AtharReadex,sans-serif;color:#78628f;z-index:3}}@media (prefers-reduced-motion:reduce){.athar-v2-card,.athar-v2-persona{animation:none!important;transition:none!important}}html[data-athar-chat-v2] [data-athar-v2-slot=model-intro]{align-items:center;gap:8px!important;opacity:.85}html[data-athar-chat-v2] [data-athar-v2-slot=model-intro] img{width:24px;height:24px;border-radius:7px}html[data-athar-chat-v2] [data-athar-v2-slot=model-intro] .text-2xl{font-size:12px!important;line-height:1.5}html[data-athar-chat-v2] [data-athar-v2-slot=model-intro] .text-sm{font-size:10px!important;line-height:1.4;max-width:32rem}.bayan-wordmark{font:38px/1.4 AtharAmiri,serif;margin:0;color:#33264c}.bayan-subtitle{font-size:12px;color:#7e6c93;line-height:1.8;margin:0 0 15px}.athar-v2-persona{min-height:77px;padding:15px}.athar-v2-persona strong{font-size:13px}.athar-v2-persona small{font-size:9px}.bayan-evidence,.bayan-request{border:1px solid #d9cde7;border-radius:12px;padding:12px 15px;margin:14px 0;background:#fff}.bayan-evidence>summary,.bayan-request>summary{font-size:12px;color:#53406e;cursor:pointer}.bayan-evidence-state{font-size:10px;line-height:1.9;color:#846c58;background:#faf4e8;padding:10px;border-radius:8px}.bayan-evidence-coverage{display:flex;flex-wrap:wrap;gap:5px;margin:12px 0}.bayan-evidence-coverage span{font-size:8px;padding:5px 7px;border-radius:6px;background:#f3f0f7;color:#877493}.bayan-evidence-coverage span[data-present=true]{background:#e4f1ee;color:#376a60}.bayan-evidence-record{padding:12px 0;border-top:1px solid #e9e2f0}.bayan-evidence-record>summary{font-size:11px;color:#634d7c;cursor:pointer;line-height:1.9}.bayan-source-text{font:21px/2.1 AtharAmiri,serif;color:#3f3651;margin:15px 0;max-height:290px;overflow:auto;white-space:pre-wrap}.bayan-source-id{display:block;direction:ltr;text-align:left;overflow-wrap:anywhere;font:10px/1.8 monospace;color:#92859f;margin:10px 0}.bayan-source-actions{display:flex;flex-wrap:wrap;gap:7px}.bayan-source-actions a,.bayan-source-actions button{font:10px/1.8 AtharReadex,sans-serif!important;border:1px solid #d7cbe5;border-radius:7px;padding:6px 9px;background:#f5f1fa;color:#65517e;text-decoration:none}.bayan-request .bayan-question{font-size:12px}.bayan-evidence summary:focus-visible,.bayan-request summary:focus-visible{outline:2px solid #8d70b0;outline-offset:4px}.athar-v2-toggles{grid-template-columns:repeat(3,minmax(0,1fr));gap:8px}.athar-v2-persona{gap:8px;padding:13px 10px}.athar-v2-persona>svg{width:22px;flex-shrink:0}.athar-v2-radio{display:none}.athar-v2-persona strong{font-size:12px}.athar-v2-persona small{font-size:8px}.athar-v2-cards[data-track=topics] .athar-v2-card{aspect-ratio:auto;min-height:168px;padding:14px 17px}.athar-v2-cards[data-track=topics] .athar-v2-card strong{margin-top:9px}.athar-v2-cards[data-track=topics] .athar-v2-card-top{display:none}.athar-v2-cards[data-track=topics] .athar-v2-card-description{font-size:10px}.athar-v2-cards[data-track=topics] .bayan-card-action{margin-top:auto;padding-top:10px}.bayan-topic-options{display:grid;grid-template-columns:1fr 1fr;gap:12px;margin:12px 0 20px}.bayan-topic-options label{font-size:11px;color:#69577b}.bayan-topic-options select{display:block;width:100%;margin-top:7px;padding:10px 8px;border:1px solid #d5c7e6;border-radius:9px;background:#fff;color:#49395c;font:12px AtharReadex,sans-serif}.bayan-topic-roots{padding:14px;border-radius:12px;background:#e9f3f1;color:#3f655d;margin-bottom:18px}.bayan-topic-roots strong{font-size:12px}.bayan-topic-roots p{font-size:11px;line-height:1.9;margin:6px 0}.bayan-topic-roots small{font-size:9px}.bayan-agent{font-size:10px;color:#6e558a;margin:12px 0}.bayan-gallery-switch{border:1px solid #d3c5e4;border-radius:9px;padding:8px 14px;background:#f0eaf8;color:#624c7a;font-size:11px!important}.bayan-auth-topic{background:#ffffff12;border:1px solid #ffffff40;color:#ebe1ff;padding:12px 16px;border-radius:11px;margin:10px 0;font:12px AtharReadex,sans-serif;cursor:pointer}@media (max-width:600px){.athar-v2-toggles{gap:6px}.athar-v2-persona{padding:10px 8px;display:block;min-height:87px}.athar-v2-persona>svg{display:none}.athar-v2-persona strong{font-size:10px!important}.athar-v2-persona small{font-size:8px!important;line-height:1.8}.bayan-topic-options{grid-template-columns:1fr}.athar-v2-cards[data-track=topics] .athar-v2-card{min-height:165px;padding:13px}}html.dark[data-athar-chat-v2] .bayan-wordmark{color:#f5ecff}.bayan-card-action{display:flex;align-items:center;justify-content:space-between;gap:12px;width:100%;font-size:10px;color:#78648d;margin-top:13px}.bayan-card-action svg{width:17px;height:17px}.athar-v2-card strong{margin-top:13px;font-size:16px}.athar-v2-card-description{font-size:11px;line-height:1.9}.athar-v2-card-top small{font-size:9px;color:#80718f}.bayan-count{font-size:10px}.bayan-demo{margin:auto;width:min(650px,calc(100vw - 32px));max-height:calc(100dvh - 40px);overflow:auto;padding:0;border:1px solid #e3dceb;border-radius:24px;background:#fbfaff;color:#352844;font:14px/1.8 AtharReadex,system-ui,sans-serif;box-shadow:0 30px 110px #18122944}.bayan-demo:not([open]){display:none}.bayan-demo::backdrop{background:#15102988;-webkit-backdrop-filter:blur(5px);backdrop-filter:blur(5px)}.bayan-demo-content{position:relative;padding:36px}.bayan-demo h2{font:38px/1.5 AtharAmiri,serif;margin:13px 0 6px}.bayan-demo h3{font-size:13px;font-weight:500;margin:23px 0 13px}.bayan-demo button{font:inherit;cursor:pointer}.bayan-demo button:focus-visible,.bayan-context button:focus-visible,.bayan-followups button:focus-visible{outline:2px solid #937cca;outline-offset:4px}.bayan-close{position:absolute;left:20px;top:20px;width:32px;height:32px;border-radius:50%;background:#efebf5;display:grid;place-items:center;border:0;color:#786985}.bayan-close svg{width:17px;height:17px}.bayan-kicker{font-size:10px;color:#9680ae}.bayan-demo-intro{font-size:12px;color:#807087;line-height:1.9;margin:0 0 24px}.bayan-question-label{font-size:10px;color:#8c7a9b}.bayan-question{font-size:16px;line-height:2;background:#f0ecf7;border-right:3px solid #b19bcd;border-radius:10px 0 0 10px;padding:15px 19px;margin:8px 0;color:#584668}.bayan-demo-steps{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:10px}.bayan-demo-steps button{border:1px solid #e0d6ed;background:#fff;border-radius:12px;padding:13px 9px;display:flex;flex-direction:column;align-items:flex-start;gap:8px;font-size:11px;text-align:right;color:#786088}.bayan-demo-steps button span{font-size:11px;color:#b5a5c6}.bayan-demo-steps button[aria-pressed=true]{background:#ebe5f6;border-color:#ae97ce;color:#514066}.bayan-step-detail{min-height:55px;font-size:12px;color:#7b698b;line-height:1.9;margin:16px 0 23px}.bayan-demo-note{font-size:10px;color:#887991;line-height:1.9;border-top:1px solid #e7deee;padding-top:16px;margin:0 0 18px}.bayan-demo-actions{display:flex;gap:12px}.bayan-primary,.bayan-secondary{min-height:43px;border-radius:10px;padding:10px 18px;border:1px solid #c9bddb;display:flex;gap:12px;align-items:center;justify-content:center;font-size:12px!important}.bayan-primary{background:#5a437c;color:#fff;border-color:#5a437c}.bayan-secondary{background:transparent;color:#786186}.bayan-primary svg{width:16px;height:16px}.bayan-gallery{display:grid;gap:12px;margin:24px 0}.bayan-gallery button{display:flex;gap:12px;align-items:center;text-align:right;background:#f1ecf7;border:1px solid #e4d9ef;border-radius:12px;padding:17px;color:#776183}.bayan-gallery svg{width:21px;height:21px;flex-shrink:0}.bayan-gallery strong{font-size:14px;font-weight:500}.bayan-gallery span{font-size:10px;margin-right:auto}.bayan-gallery button>svg:last-child{width:16px}.bayan-context{position:sticky;top:0;z-index:12;display:flex;align-items:center;gap:12px;padding:10px 22px;background:#faf8fff2;border-bottom:1px solid #e8e0ef;font-family:AtharReadex,sans-serif;color:#6f547f}.bayan-context-brand{font:23px AtharAmiri,serif}.bayan-context-case{font-size:11px;border-right:1px solid #d3c4df;padding-right:12px}.bayan-context button{margin-right:auto;font:10px AtharReadex,sans-serif;padding:7px 10px;border:1px solid #cfc0df;border-radius:8px;background:#fff;color:#755b87;cursor:pointer}.bayan-followups{display:flex;align-items:center;justify-content:center;gap:8px;flex-wrap:wrap;font:10px/1.8 AtharReadex,sans-serif;color:#806b91;margin:6px auto 10px;max-width:48rem;padding:0 16px}.bayan-followups button{font:inherit;border:1px solid #ddd2e8;border-radius:99px;background:#fbf9ff;color:#745988;padding:5px 11px;cursor:pointer}.bayan-followups[data-notice]:after{content:attr(data-notice);flex-basis:100%;text-align:center;font-size:10px}.bayan-auth-cases{display:grid;gap:8px}.bayan-auth-cases button{display:flex;align-items:center;gap:12px;border:1px solid #77629555;background:#ffffff05;color:#d7c5ec;border-radius:10px;padding:12px;font:12px AtharReadex,sans-serif;text-align:right;cursor:pointer;transition:background .2s}.bayan-auth-cases button:hover{background:#ffffff10}.bayan-auth-cases svg{width:18px;height:18px}.bayan-auth-cases svg:last-child{margin-right:auto;width:15px}.athar-v2-auth-intro h1{font-size:58px;margin:14px 0}.athar-v2-auth-features{padding:18px 0;margin-top:10px}.athar-v2-auth-intro>small{margin-top:25px}@media (max-width:600px){.bayan-demo-content{padding:26px 20px}.bayan-demo h2{font-size:31px}.bayan-question{font-size:14px}.bayan-demo-steps{gap:7px}.bayan-demo-steps button{font-size:10px}.bayan-demo-actions{flex-direction:column}.bayan-demo-note{font-size:10px}.bayan-gallery button{flex-wrap:wrap}.bayan-gallery span{flex-basis:60%}.bayan-context{padding:8px 12px;gap:8px}.bayan-context-brand{font-size:20px}.bayan-context-case{font-size:10px}.bayan-wordmark{font-size:33px}.bayan-subtitle{font-size:10px}.athar-v2-persona strong{font-size:11px}.athar-v2-card strong{font-size:15px}.athar-v2-card-description{font-size:10px}.athar-v2-card-top{gap:5px}.athar-v2-card-top small{font-size:8px}.bayan-card-action{font-size:9px}.bayan-followups>span{flex-basis:100%;text-align:center}}', C1 = [
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
        objective: "فهم أن الأعمال في الإسلام لا تُقاس بظاهرها المادي فحسب، بل بصدق القصد الباطني ونقاء النية."
      },
      {
        id: "faith_pillars",
        title: "أركان الإيمان وأثرها في سكينة النفس",
        objective: "استيعاب ركائز الإيمان بالله ورسله واليوم الآخر كمنظومة تعطي الإنسان طمأنينة وغاية في الوجود."
      },
      {
        id: "faith_conduct",
        title: "الإيمان سلوك عملي ومسؤولية أخلاقية",
        objective: "إدراك أن الإيمان الصادق يثمر حياءً وحسن تعامل وأمانة، وأن دعوى الإيمان بلا عمل دعوى جوفاء."
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
        objective: "إبراز أن رسالة النبي ﷺ قائمة على الرحمة العامة، وأن الإحسان للحيوان والضعيف سبب لمغفرة الله."
      },
      {
        id: "mercy_gentleness",
        title: "الرفق ونبذ العنف والغلظة",
        objective: "بيان فضل الرفق والتأني في معالجة الأمور، وأن ما كان الرفق في شيء إلا زانه."
      },
      {
        id: "mercy_character",
        title: "بشاشة الوجه وطيب الكلام والتواضع",
        objective: "تبيان أن التبسم والكلمة الطيبة والصفح من صميم الدين ومراتب الفضل عند الله."
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
        objective: "إدراك الصلاة كصلة مستمرة بالله تريح القلب وتنهى عن الفحشاء والمنكر وتضبط إيقاع اليوم."
      },
      {
        id: "worship_fasting",
        title: "الصوم: تدريب الإرادة ومواساة المحتاجين",
        objective: "فهم الصيام كوسيلة للتحكم في الشهوات والشعور الفعلي بجوع الفقراء وتزكية النفس."
      },
      {
        id: "worship_solidarity",
        title: "الزكاة والصدقة: النماء والتكافل المجتمعي",
        objective: "بيان أن التصدق ليس مجرد ضريبة مالية بل تطهير للمال وشعور بالمسؤولية التكافلية تجاه المحتاجين."
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
        objective: "إظهار منزلة الأم والأب في الإسلام كأعظم الواجبات الاجتماعية بعد التوحيد."
      },
      {
        id: "family_neighbors",
        title: "حقوق الجار وحرمة إيذائه وإكرامه",
        objective: "بيان الوصية النبوية المتكررة بالجار مسلماً كان أو غير مسلم، وحرمة ترويعه أو بخسه."
      },
      {
        id: "family_spouses",
        title: "المودة والرحمة وحسن العشرة الزوجية",
        objective: "فهم المعيار النبوي للرجولة والخيرية: «خيركم خيركم لأهله وأنا خيركم لأهلي»."
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
        objective: "إدراك مكانة التاجر الصدوق الأمين، وحرمة التطفيف والغش والخداع."
      },
      {
        id: "fairness_justice",
        title: "حرمة الظلم وأداء الحقوق إلى أهلها",
        objective: "بيان تحريم الظلم حتى مع المخالف، وإيفاء الأجير حقه قبل أن يجف عرقه."
      },
      {
        id: "fairness_trust",
        title: "رعاية الأمانة والوفاء بالعهود",
        objective: "ترسيخ أن خيانة الأمانة ونقض العهد من سمات النفاق المنافية لجوهر الإسلام."
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
        objective: "بيان أن طلب العلم عبادة وفريضة، وتيسير التعلم منهج نبوي: «يسروا ولا تعسروا»."
      },
      {
        id: "knowledge_dialogue",
        title: "أدب الحديث والكلمة الطيبة والصمت عن الشر",
        objective: "ترسيخ قاعدة «فليقل خيراً أو ليصمت» والابتعاد عن السباب والفحش والمراء."
      },
      {
        id: "knowledge_humility",
        title: "التثبت في النقل والتواضع وعدم ادعاء العلم",
        objective: "تعليم التثبت من صحة الأخبار ونبذ التقول والافتراء والتواضع مع المعلم والمتعلم."
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
], Up = {
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
}, P1 = {
  newcomer: { code: "newcomer", label: "مهتم يتعرف على الإسلام" },
  "مهتم يتعرف على الإسلام": { code: "newcomer", label: "مهتم يتعرف على الإسلام" },
  new_muslim: { code: "new_muslim", label: "حديث العهد بالإسلام" },
  "حديث العهد بالإسلام": { code: "new_muslim", label: "حديث العهد بالإسلام" },
  educator: { code: "educator", label: "معرّف بالإسلام" },
  "معرّف بالإسلام": { code: "educator", label: "معرّف بالإسلام" }
}, q1 = {
  card: { code: "card", label: "بطاقة تعريفية قصيرة" },
  "بطاقة تعريفية قصيرة": { code: "card", label: "بطاقة تعريفية قصيرة" },
  qa: { code: "qa", label: "حوار سؤال وجواب" },
  "حوار سؤال وجواب": { code: "qa", label: "حوار سؤال وجواب" },
  two_minute: { code: "two_minute", label: "كلمة تعريفية من دقيقتين" },
  "كلمة تعريفية من دقيقتين": { code: "two_minute", label: "كلمة تعريفية من دقيقتين" }
};
function R1(i) {
  const e = P1[i == null ? void 0 : i.trim()];
  if (!e) throw new Error(`Invalid audience: ${i}`);
  return e;
}
function V1(i) {
  const e = q1[i == null ? void 0 : i.trim()];
  if (!e) throw new Error(`Invalid format: ${i}`);
  return e;
}
const bn = { name: "بيان السُّنّة", subtitle: "الحديث النبوي للمعرّفين بالإسلام" }, wo = [
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
], fl = C1.map((i) => ({
  id: i.id,
  modelId: i.modelId,
  unifiedModelId: i.unifiedModelId || "bayan-unified-pilot",
  primarySkillId: i.primarySkillId || "hadith-islam-guide",
  track: "islam",
  task: "introductory_material",
  title: i.title,
  category: "التعريف بالإسلام",
  icon: "book",
  topic: i,
  learn: i.question,
  research: i.question,
  question: i.question,
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
      task: "introductory_material"
    }
  ]
}));
function Ea(i) {
  return [...wo, ...fl].find((e) => e.id === i);
}
const N1 = {
  "prayer-call": ["hadith-mermaid-agent", "hadith-sharh-agent"],
  "hajj-arafah": ["hadith-modular-agent", "hadith-islam-guide"],
  "abu-hurairah": ["hadith-rijal-agent", "hadith-rijal-agent"]
};
function Y1(i, e, t, r = {}) {
  var f;
  const n = Ea(e), a = n == null ? void 0 : n.followups[t];
  if (!n || !a) throw new Error("Unknown follow-up");
  const o = r.mode === "unified", s = o ? "bayan-unified-pilot" : a.modelId || ((f = N1[e]) == null ? void 0 : f[t]) || n.modelId, l = o && a.unifiedSkillId ? `<$${a.unifiedSkillId}> ` : "", c = r.occurrenceIds && r.occurrenceIds.length > 0 ? `
السجل المحدد: ${r.occurrenceIds.join(", ")}` : "", d = `${l}الموضوع: ${n.title}. سؤال الحالة الأصلي: ${n.question}
المطلوب الآن: ${a.prompt}${c}
هذه مسودة مستقلة ولا تتضمن نتائج المحادثة السابقة. استرجع النصوص بالأدوات وحدد occurrence_id قبل الشرح أو الرسم. إذا لم يتحدد النص المقصود فاعرض المرشحين للاختيار. اعرض ما استرجعته فقط، وأبقِ الفجوات والالتباس وحالة المراجعة ظاهرة، ولا تفترض منتهى نبويًا لكل أثر.`, p = new URL(Gp(i, e, r.submit ?? !1, d, r));
  return p.searchParams.set("model", s), p.toString();
}
function ul(i, e = "newcomer", t = "card") {
  var s, l;
  const r = R1(e), n = V1(t), a = ((l = (s = i.topic) == null ? void 0 : s.seedQueries) == null ? void 0 : l.join("، ")) || "";
  let o = "";
  return n.code === "card" ? o = "المطلوب: بطاقة تعريفية قصيرة: النص المختار، مصدره في كتب السنة، ومعناه الإنساني والروحي المبسط؛ دون استطراد بحثي طويل." : n.code === "qa" ? o = "المطلوب: حوار هادئ بصيغة سؤال وجواب يوضح الإشكال أو المفهوم بلغة عصرية مستندة إلى الشاهد، دون تعقيد مصطلحي." : n.code === "two_minute" && (o = "المطلوب: كلمة تعريفية مركزة من دقيقتين (نحو 200 كلمة) يلقيها المعرّف، تنطلق من الشاهد النبوي إلى أثره في حياة الإنسان."), `أريد إعداد ${n.label} لجمهور: ${r.label}. الموضوع: ${i.title}. السؤال: ${i.question}
ابدأ بجمع شاهدين مناسبين من نطاق الكتب الستة بأداة البحث. كلمات بداية مقترحة: ${a}. اختر شاهدين يدلان على الموضوع في سياقهما؛ استبعد المصادفة اللفظية والدعاء العارض، وبيّن سبب اختيار كل شاهد. اعرض النصوص المسترجعة ومصادرها، ثم تلخيصًا تعريفيًا واضحًا منفصلًا عنها.
${o}
بيّن حدود البحث وما يحتاج إلى مراجعة (needs_review)، ولا تفترض وجود الموضوع في جميع الكتب أو صحة كل نتيجة.`;
}
function Gp(i, e, t = !1, r, n = {}) {
  const a = Ea(e);
  if (!a) throw new Error("Unknown demonstration");
  const o = new URL("/", i);
  if (!["http:", "https:"].includes(o.protocol)) throw new Error("Invalid application origin");
  const s = n.mode === "unified" ? a.unifiedModelId : a.modelId, l = r || (a.topic && (n.audience || n.format) ? ul(a, n.audience || "newcomer", n.format || "card") : a.question), c = new URLSearchParams({
    model: s,
    q: l,
    submit: String(t),
    athar: "chat",
    case: a.id
  });
  return n.audience && c.set("audience", n.audience), n.format && c.set("format", n.format), n.occurrenceIds && n.occurrenceIds.length > 0 && c.set("occurrenceIds", n.occurrenceIds.join(",")), o.search = c.toString(), o.toString();
}
function L1(i, e, t = {}) {
  if (!Object.values(Up).flat().some((s) => s.id === e))
    throw new Error("Unknown evidence record");
  const r = new URL("/", i);
  if (!["http:", "https:"].includes(r.protocol)) throw new Error("Invalid application origin");
  const n = t.mode === "unified", a = n ? "bayan-unified-pilot" : "hadith-phrase-poc", o = n ? `افتح السجل ${e} باستخدام get_hadith_by_number(occurrence_id="${e}") واعرض نصه ومصدره وحالة المراجعة.` : `افتح السجل ${e} باستخدام open_hadith_record واعرض نصه ومصدره وحالة المراجعة.`;
  return r.search = new URLSearchParams({
    model: a,
    q: o,
    submit: "false",
    athar: "chat"
  }).toString(), r.toString();
}
function _c() {
  var A, b, w;
  if (!location.pathname.startsWith("/auth")) return;
  document.title.includes("بيان السنة") || (document.title = "بيان السنة — تسجيل الدخول");
  try {
    const y = localStorage.getItem("locale");
    (!y || y === "en-US" || y === "en") && localStorage.setItem("locale", "ar-BH");
  } catch {
  }
  const i = document.getElementById("auth-login-card");
  if (!i) return;
  i.getAttribute("dir") !== "rtl" && i.setAttribute("dir", "rtl");
  const e = i.querySelector("form > div.mb-1 > div.text-2xl") || i.querySelector(".text-2xl");
  if (e) {
    const y = e.textContent || "";
    y.includes("Sign up") || y.includes("سجّل في") || y.includes("Create Account") ? e.textContent !== "إنشاء حساب في بيان السنة" && (e.textContent = "إنشاء حساب في بيان السنة") : y.includes("Get started") || y.includes("ابدأ") ? e.textContent !== "ابدأ مع بيان السنة" && (e.textContent = "ابدأ مع بيان السنة") : y.includes("LDAP") ? e.textContent !== "تسجيل الدخول عبر LDAP — بيان السنة" && (e.textContent = "تسجيل الدخول عبر LDAP — بيان السنة") : e.textContent !== "تسجيل الدخول إلى بيان السنة" && (e.textContent = "تسجيل الدخول إلى بيان السنة");
  }
  const t = i.querySelector("form > div.mb-1 > div.text-xs");
  if (t) {
    const y = "ⓘ بيان السنة يعمل محليًا بالكامل وتبقى بياناتك محفوظة بأمان على خادمك.";
    t.textContent !== y && (t.textContent = y);
  }
  const r = i.querySelector('label[for="email"]');
  r && r.textContent !== "البريد الإلكتروني" && (r.textContent = "البريد الإلكتروني");
  const n = i.querySelector("input#email");
  n && n.placeholder !== "أدخل البريد الإلكتروني" && (n.placeholder = "أدخل البريد الإلكتروني");
  const a = i.querySelector('label[for="password"]:not(.sr-only)');
  a && a.textContent !== "كلمة المرور" && (a.textContent = "كلمة المرور");
  const o = i.querySelector('label.sr-only[for="password"]');
  o && o.textContent !== "أدخل كلمة المرور" && (o.textContent = "أدخل كلمة المرور");
  const s = i.querySelector("input#password");
  s && s.placeholder !== "أدخل كلمة المرور" && (s.placeholder = "أدخل كلمة المرور");
  const l = i.querySelector(
    'button[aria-label*="password" i], button[aria-label*="كلمة المرور"]'
  );
  if (l) {
    const y = l.getAttribute("aria-pressed") === "true";
    l.setAttribute("aria-label", y ? "إخفاء كلمة المرور" : "إظهار كلمة المرور");
  }
  const c = i.querySelector('label[for="name"]');
  c && c.textContent !== "الاسم" && (c.textContent = "الاسم");
  const d = i.querySelector("input#name");
  d && d.placeholder !== "أدخل اسمك الكامل" && (d.placeholder = "أدخل اسمك الكامل");
  const p = i.querySelector('label[for="confirm-password"]');
  p && p.textContent !== "تأكيد كلمة المرور" && (p.textContent = "تأكيد كلمة المرور");
  const f = i.querySelector("input#confirm-password");
  f && f.placeholder !== "أدخل تأكيد كلمة المرور" && (f.placeholder = "أدخل تأكيد كلمة المرور");
  const v = i.querySelector('label[for="username"]');
  v && v.textContent !== "اسم المستخدم" && (v.textContent = "اسم المستخدم");
  const g = i.querySelector("input#username");
  g && g.placeholder !== "أدخل اسم المستخدم" && (g.placeholder = "أدخل اسم المستخدم");
  const u = i.querySelector('button[type="submit"]');
  if (u) {
    const y = u.querySelector(".self-center") || u, T = (y.textContent || "").trim();
    T.includes("Create") || T.includes("إنشاء") || T.includes("حساب") ? y.textContent !== "إنشاء حساب" && (y.textContent = "إنشاء حساب") : y.textContent !== "تسجيل الدخول" && (y.textContent = "تسجيل الدخول");
  }
  const m = i.querySelector("div.mt-4.text-sm.text-center") || i.querySelector("div.text-sm.text-center");
  if (m) {
    const y = m.querySelector("button");
    if (y) {
      const T = ((A = y.textContent) == null ? void 0 : A.trim()) || "";
      T === "Sign up" || T === "تسجيل" || T === "إنشاء حساب" ? (((b = m.childNodes[0]) == null ? void 0 : b.nodeType) === Node.TEXT_NODE && (m.childNodes[0].textContent = "ليس لديك حساب؟ "), y.textContent !== "إنشاء حساب" && (y.textContent = "إنشاء حساب")) : (T === "Sign in" || T === "تسجيل الدخول") && (((w = m.childNodes[0]) == null ? void 0 : w.nodeType) === Node.TEXT_NODE && (m.childNodes[0].textContent = "لديك حساب بالفعل؟ "), y.textContent !== "تسجيل الدخول" && (y.textContent = "تسجيل الدخول"));
    }
  }
  const x = i.querySelector("img#logo");
  x && x.alt !== "شعار بيان السنة" && (x.alt = "شعار بيان السنة");
}
const Dc = { book: "M12 5v16M3 3h5a4 4 0 0 1 4 2 4 4 0 0 1 4-2h5v16h-5a4 4 0 0 0-4 2 4 4 0 0 0-4-2H3Z", layers: "m12 3 10 6-10 6L2 9Zm-9 11 9 5 9-5m-18 5 9 5 9-5", branch: "M6 6v9a4 4 0 0 0 4 4h5M6 8h8a4 4 0 0 0 4-4M3 3a3 3 0 1 0 6 0 3 3 0 0 0-6 0M15 3a3 3 0 1 0 6 0 3 3 0 0 0-6 0M15 19a3 3 0 1 0 6 0 3 3 0 0 0-6 0", person: "M20 21v-2a7 7 0 0 0-14 0v2M8 7a5 5 0 1 0 10 0A5 5 0 0 0 8 7", arrow: "M19 12H5m6-6-6 6 6 6", close: "m6 6 12 12M6 18 18 6", play: "m8 4 12 8-12 8Z" };
function dr(i) {
  const e = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  e.setAttribute("viewBox", "0 0 24 24"), e.setAttribute("fill", "none"), e.setAttribute("stroke", "currentColor"), e.setAttribute("stroke-width", "1.5"), e.setAttribute("stroke-linecap", "round"), e.setAttribute("stroke-linejoin", "round"), e.setAttribute("aria-hidden", "true");
  const t = document.createElementNS(e.namespaceURI, "path");
  return t.setAttribute("d", Dc[i] || Dc.book), e.append(t), e;
}
function R(i, e, t) {
  const r = document.createElement(i);
  return r.className = e, t && (r.textContent = t), r;
}
function ut(i, e, t) {
  const r = R("button", i, e);
  return r.type = "button", r.onclick = t, r;
}
function _1() {
  const i = R("style", "");
  i.dataset.atharVariant = "2", i.textContent = O1, document.head.append(i);
  const e = R("section", "athar-v2-audience");
  e.id = "athar-v2-audience", e.dir = "rtl", e.setAttribute("aria-label", "اختر مسارك في الحديث");
  const t = R("section", "athar-v2-cards");
  t.id = "athar-v2-cards", t.dir = "rtl", t.setAttribute("aria-label", "حالات تطبيقية");
  const r = R("p", "athar-v2-status");
  r.setAttribute("role", "status");
  const n = R("section", "bayan-context");
  n.dir = "rtl", n.setAttribute("aria-label", "مسار المحادثة");
  const a = R("div", "bayan-followups");
  a.dir = "rtl", a.setAttribute("aria-label", "توسّع في هذه الحالة");
  const o = R("dialog", "bayan-demo");
  o.dir = "rtl", o.setAttribute("aria-labelledby", "bayan-demo-title"), o.addEventListener("click", (O) => {
    O.target === o && o.close();
  });
  const s = R("aside", "athar-v2-auth-intro");
  s.id = "athar-v2-auth-intro", s.dir = "rtl", s.append(R("span", "athar-v2-eyebrow", bn.subtitle), R("h1", "", bn.name), R("p", "", "من الحديث إلى فهمٍ واضح، ومصدرٍ تستطيع الرجوع إليه. ثلاث تجارب عملية تساعدك على عرض المعرفة والتوسّع في دليلها."));
  const l = R("div", "athar-v2-auth-features");
  for (const [O, Y] of [["book", "تعلّم وعرّف"], ["branch", "توسّع وتحقّق"]]) {
    const V = R("span", "");
    V.append(dr(O), document.createTextNode(Y)), l.append(V);
  }
  s.append(l);
  const c = R("div", "bayan-auth-cases");
  for (const O of wo) {
    const Y = ut("", "", () => N(O));
    Y.append(dr(O.icon), document.createTextNode(O.title), dr("arrow")), c.append(Y);
  }
  s.append(c, R("small", "", "مشروع بيان السنة"));
  const d = ut("bayan-auth-topic", "رحلة التعريف بالإسلام · استكشف الموضوعات", () => _(!0));
  s.insertBefore(d, c);
  let p = !1, f = "topics";
  const v = /* @__PURE__ */ new Set();
  let g = Ea(new URLSearchParams(location.search).get("case")), u = !!g, m = location.pathname, x = "";
  const A = b();
  g || (g = Ea(A[location.pathname]));
  function b() {
    try {
      const O = JSON.parse(sessionStorage.getItem("bayan-case-map") || "{}");
      return O && typeof O == "object" && !Array.isArray(O) ? O : {};
    } catch {
      return {};
    }
  }
  function w(O, Y) {
    O && (O.dataset.atharV2Slot !== Y && (O.dataset.atharV2Slot = Y), v.add(O));
  }
  function y() {
    for (const O of v) delete O.dataset.atharV2Slot;
    v.clear();
  }
  function T() {
    return [...document.querySelectorAll('#chat-pane [id^="message-"]')].some((O) => /^message-[a-f\d]{8}-/i.test(O.id));
  }
  function M(O, Y, V) {
    I(Gp(location.origin, O.id, Y, V, { mode: "unified" }));
  }
  function I(O) {
    var V;
    if (location.pathname.startsWith("/auth") && (O = "/auth?" + new URLSearchParams({ redirect: new URL(O).pathname + new URL(O).search, athar: "chat" })), !!((V = document.getElementById("chat-input")) != null && V.innerText.trim()) || T()) {
      const j = window.open("about:blank", "_blank");
      if (!j) {
        const D = o.querySelector(".bayan-demo-note");
        D && (D.textContent = "اسمح بفتح تبويب جديد للحفاظ على محادثتك ومسودتك الحالية.");
        return;
      }
      j.opener = null, j.location.href = O, o.close();
    } else location.assign(O);
  }
  function z(O) {
    const Y = Up[O.id] || [], V = R("details", "bayan-evidence");
    V.append(R("summary", "", `راجع الشواهد ومصادرها · ${Y.length}`)), V.append(R("p", "bayan-evidence-state", "النصوص مطابقة للفهرس المحلي. اختيارها التعليمي وشرحها يحتاجان إلى مراجعة علمية."));
    const j = { bukhari: "صحيح البخاري", muslim: "صحيح مسلم", tirmidhi: "جامع الترمذي", abudawud: "سنن أبي داود", nasai: "سنن النسائي", ibnmajah: "سنن ابن ماجه" }, D = R("div", "bayan-evidence-coverage");
    for (const [F, Z] of Object.entries(j)) {
      const ze = Y.filter((pe) => pe.collection === F).length, le = R("span", "", `${Z} · ${ze ? ze + " في هذه الحزمة" : "غير ممثّل في الحزمة"}`);
      le.dataset.present = String(ze > 0), D.append(le);
    }
    V.append(D);
    for (const F of Y) {
      const Z = R("details", "bayan-evidence-record");
      Z.append(R("summary", "", `${j[F.collection]} · ${F.chapter} · الموضع المحلي ${F.position}`)), Z.append(R("p", "bayan-source-text", F.text), R("code", "bayan-source-id", F.id));
      const ze = R("div", "bayan-source-actions"), le = R("a", "", "افتح ملف المصدر");
      le.href = F.url, le.target = "_blank", le.rel = "noopener noreferrer";
      const pe = ut("", "انسخ النص ومصدره", async () => {
        try {
          await navigator.clipboard.writeText(`${F.text}

${j[F.collection]} — ${F.chapter}
الموضع المحلي: ${F.position}
${F.id}
${F.url}
مطابق للفهرس المحلي؛ يحتاج اختيار الشاهد وشرحه إلى مراجعة علمية.`), pe.textContent = "نُسخ النص مع مصدره";
        } catch {
          pe.textContent = "تعذر النسخ؛ حدّد النص لنسخه";
        }
      });
      ze.append(le, pe, ut("", "حضّر فتح السجل بالأداة", () => I(L1(location.origin, F.id, { mode: "unified" })))), Z.append(ze), V.append(Z);
    }
    return V;
  }
  function N(O) {
    o.isConnected || document.body.append(o), o.replaceChildren();
    const Y = ut("bayan-close", "", () => o.close());
    Y.setAttribute("aria-label", "أغلق عرض الحالة"), Y.append(dr("close"));
    const V = R("div", "bayan-demo-content");
    V.append(Y, R("span", "bayan-kicker", "حالة تطبيقية · " + O.category));
    const j = R("h2", "", O.title);
    j.id = "bayan-demo-title", V.append(j, R("p", "bayan-demo-intro", O[f === "research" ? "research" : "learn"]));
    let D = "newcomer", F = "card", Z = O.topic ? ul(O, D, F) : O.question;
    const ze = R("blockquote", "bayan-question", Z);
    if (O.topic) {
      const xr = R("div", "bayan-topic-options");
      for (const [on, Vr, K] of [["لمن تُعدّ المادة؟", [["مهتم يتعرف على الإسلام", "newcomer"], ["حديث العهد بالإسلام", "new_muslim"], ["معرّف بالإسلام", "educator"]], "reader"], ["كيف تريد تقديمها؟", [["بطاقة تعريفية قصيرة", "card"], ["حوار سؤال وجواب", "qa"], ["كلمة تعريفية من دقيقتين", "two_minute"]], "format"]]) {
        const ne = R("label", "", on), ge = R("select", "");
        for (const [Ge, Jr] of Vr) {
          const $r = R("option", "", Ge);
          $r.value = Jr, ge.append($r);
        }
        ge.onchange = () => {
          K === "reader" ? D = ge.value : F = ge.value, Z = ul(O, D, F), ze.textContent = Z;
        }, ne.append(ge), xr.append(ne);
      }
      V.append(xr), V.append(z(O));
    }
    const le = O.topic ? "دليل المعرّف بالإسلام" : O.id === "abu-hurairah" ? "ناقد الأسانيد وخبير الرجال" : O.id === "hajj-arafah" ? "محقق السنة · الروايات والشجرة" : "محقق السنة · النص والتخريج";
    if (V.append(R("p", "bayan-agent", "ينفّذها: " + le)), O.topic) {
      const xr = R("details", "bayan-request");
      xr.append(R("summary", "", "راجع السؤال الذي سيُرسل"), ze), V.append(xr);
    } else V.append(R("span", "bayan-question-label", "السؤال الذي تبدأ به"), ze);
    V.append(R("h3", "", "ما الذي ستستكشفه؟"));
    const pe = R("div", "bayan-demo-steps");
    pe.setAttribute("role", "group"), pe.setAttribute("aria-label", "مراحل الحالة");
    const br = R("p", "bayan-step-detail", O.outputs[0].description);
    br.id = "bayan-step-detail", br.setAttribute("aria-live", "polite"), O.outputs.forEach((xr, on) => {
      const Vr = ut("", "", () => {
        br.textContent = xr.description;
        for (const K of pe.querySelectorAll("button")) K.setAttribute("aria-pressed", String(K === Vr));
      });
      Vr.setAttribute("aria-pressed", String(on === 0)), Vr.setAttribute("aria-controls", br.id), Vr.append(R("span", "", String(on + 1).padStart(2, "0")), document.createTextNode(xr.title)), pe.append(Vr);
    }), V.append(pe, br, R("p", "bayan-demo-note", "تُنفّذ الحالة مباشرة بالأدوات المتاحة. افحص المصادر في الإجابة، وقد تختلف النتائج عند إعادة التجربة."));
    const Ei = R("div", "bayan-demo-actions"), Wr = ut("bayan-primary", O.topic ? "ابدأ رحلة الموضوع" : "ابدأ العرض المباشر", () => M(O, !0, Z));
    Wr.append(dr("play")), Ei.append(Wr, ut("bayan-secondary", "عدّل السؤال أولًا", () => M(O, !1, Z))), V.append(Ei), o.append(V), o.open || o.showModal(), Y.focus();
  }
  function _(O = !1) {
    o.isConnected || document.body.append(o), o.replaceChildren();
    const Y = R("div", "bayan-demo-content"), V = ut("bayan-close", "", () => o.close());
    V.setAttribute("aria-label", "أغلق عرض الحالات"), V.append(dr("close"));
    const j = R("h2", "", "اختر تجربة جديدة");
    j.id = "bayan-demo-title", Y.append(V, R("span", "bayan-kicker", bn.name), j), Y.append(ut("bayan-gallery-switch", O ? "انتقل إلى الحالات البحثية" : "انتقل إلى موضوعات التعريف بالإسلام", () => _(!O)));
    const D = R("div", "bayan-gallery");
    for (const F of O ? fl : wo) {
      const Z = ut("", "", () => N(F));
      Z.append(dr(F.icon), R("strong", "", F.title), R("span", "", F.category), dr("arrow")), D.append(Z);
    }
    Y.append(D, R("p", "bayan-demo-note", "إذا كانت لديك محادثة أو مسودة، تُفتح الحالة الجديدة في تبويب مستقل.")), o.append(Y), o.open || o.showModal(), V.focus();
  }
  function L() {
    e.replaceChildren(), t.replaceChildren();
    const O = R("div", "athar-v2-intro");
    O.append(R("h1", "bayan-wordmark", bn.name), R("p", "bayan-subtitle", bn.subtitle)), e.append(O);
    const Y = R("div", "athar-v2-toggles");
    Y.setAttribute("role", "group"), Y.setAttribute("aria-label", "نوع المستخدم");
    for (const [F, Z, ze, le] of [["topics", "أُعرّف بالإسلام", "من الموضوع إلى مادة بمصادرها", "book"], ["learn", "أستكشف حديثًا", "حالات واضحة لفهم الحديث", "layers"], ["research", "أتوسّع وأبحث", "للروايات والأسانيد والرجال", "branch"]]) {
      const pe = ut("athar-v2-persona", "", () => {
        var Ei;
        f = F, L(), (Ei = e.querySelector(`[data-audience="${F}"]`)) == null || Ei.focus();
      });
      pe.setAttribute("aria-pressed", String(f === F)), pe.dataset.audience = F;
      const br = R("span", "athar-v2-persona-copy");
      br.append(R("strong", "", Z), R("small", "", ze)), pe.append(dr(le), br, R("span", "athar-v2-radio")), Y.append(pe);
    }
    e.append(Y);
    const V = f === "topics";
    t.dataset.track = V ? "topics" : "cases";
    const j = R("div", "athar-v2-cards-heading");
    j.append(R("span", "", V ? "أيّ باب تفتح للتعريف بالإسلام؟" : "جرّب قدرات بيان السُّنّة"), R("span", "bayan-count", V ? "موضوع ← دليل ← معنى" : "٣ حالات تطبيقية")), t.append(j);
    const D = R("div", "athar-v2-grid");
    for (const F of V ? fl : wo) {
      const Z = ut("athar-v2-card", "", () => N(F));
      Z.dataset.case = F.id, Z.setAttribute("aria-label", "استعرض حالة " + F.title), Z.setAttribute("aria-haspopup", "dialog");
      const ze = R("span", "athar-v2-card-top");
      ze.append(dr(F.icon), R("small", "", F.category)), Z.append(ze, R("strong", "", F.title), R("span", "athar-v2-card-description", F[f === "research" ? "research" : "learn"]));
      const le = R("span", "bayan-card-action", V ? "صمّم رحلتك" : "استعرض التجربة");
      le.append(dr("arrow")), Z.append(le), D.append(Z);
    }
    t.append(D, r), r.textContent = V ? "٦ موضوعات · ١٣ شاهدًا مطابقًا للفهرس المحلي · المادة التعليمية قيد المراجعة." : "اختر حالة لتشاهد السؤال وخطوات التجربة، أو اكتب سؤالك مباشرة.";
  }
  function Q() {
    const O = (g == null ? void 0 : g.id) || "none";
    x !== O && (x = O, n.replaceChildren(), a.replaceChildren(), delete a.dataset.notice, n.append(R("span", "bayan-context-brand", bn.name)), g && n.append(R("span", "bayan-context-case", g.title)), n.append(ut("", "الحالات التطبيقية", _)), g && (a.append(R("span", "", "افتح مسودة متخصصة لهذه الحالة")), (g.track === "islam" ? g.followups.filter((V) => V.task !== "isnad_graph") : g.followups).forEach((V, j) => {
      const D = ut("", V.label, () => I(Y1(location.origin, g.id, j, { mode: "unified" })));
      D.title = "تُفتح مسودة بالنموذج المناسب مع إعادة استرجاع الأدلة", a.append(D);
    })));
  }
  function oe() {
    if (location.pathname !== m) {
      if (u && /^\/c\//.test(location.pathname) && g) {
        A[location.pathname] = g.id;
        try {
          sessionStorage.setItem("bayan-case-map", JSON.stringify(A));
        } catch {
        }
        u = !1;
      } else
        g = Ea(A[location.pathname]), u = !1;
      m = location.pathname, x = "";
    }
  }
  function de() {
    var ze;
    oe(), _c();
    const O = location.pathname === "/" || /^\/c\//.test(location.pathname), Y = location.pathname.startsWith("/auth");
    if (document.documentElement.toggleAttribute("data-athar-chat-v2", p && O), document.documentElement.toggleAttribute("data-athar-auth-v2", p && Y), !p || !O && !Y) {
      e.remove(), t.remove(), s.remove(), n.remove(), a.remove(), o.open && o.close(), y();
      return;
    }
    if (Y) {
      e.remove(), t.remove(), n.remove(), a.remove(), s.isConnected || document.body.append(s);
      return;
    }
    s.remove();
    const V = document.querySelector("#message-input-container"), j = V == null ? void 0 : V.closest("form");
    if (T()) {
      e.remove(), t.remove(), y(), Q();
      const le = document.getElementById("chat-pane");
      le && n.parentElement !== le && le.prepend(n), j && g && a.nextElementSibling !== j ? j.before(a) : g || a.remove();
      return;
    }
    if (n.remove(), a.remove(), !V || !j) {
      e.remove(), t.remove();
      return;
    }
    let D = j.parentElement;
    for (; D && D.id !== "chat-pane" && !(D.classList.contains("text-base") && D.classList.contains("py-3")); ) D = D.parentElement;
    if ((!D || D.id === "chat-pane") && (D = j.parentElement), D && D.parentElement) {
      w(D, "composer-slot"), w(D.closest(".py-24"), "welcome");
      const le = [...D.parentElement.children].find((pe) => pe !== D && pe !== e && pe.classList.contains("flex-row"));
      w(le, "model-intro"), e.nextElementSibling !== D && D.before(e);
    }
    const F = document.querySelector('#chat-pane [role="list"]:has(button.waterfall[role="listitem"])'), Z = (ze = F == null ? void 0 : F.parentElement) == null ? void 0 : ze.parentElement;
    Z ? (w(Z, "suggestions"), w(Z.parentElement, "suggestions-width"), t.previousElementSibling !== Z && Z.after(t)) : !t.isConnected && D && D.after(t);
  }
  return L(), _c(), { setEnabled(O) {
    p = O, de();
  }, refresh: de };
}
const Yi = document.documentElement.dataset.hadithPreview === "true", Fc = "hadith-theme-poc-host", D1 = "http://127.0.0.1:8770/api";
if (!document.getElementById(Fc)) {
  let i = function() {
    c.open && (c.close(), document.documentElement.style.overflow = v, p == null || p.focus());
  }, e = function(z) {
    c.open || (p = document.activeElement, v = document.documentElement.style.overflow, f(z), c.showModal(), c.focus(), document.documentElement.style.overflow = "hidden");
  }, t = function() {
    b.textContent = `الواجهات · ${T[u]} ▾`;
    for (const z of w.querySelectorAll("button")) z.setAttribute("aria-pressed", String(z.dataset.variant === u));
  }, r = function(z) {
    i(), u = z, g.setEnabled(z === "chat");
    try {
      sessionStorage.setItem("hadith-view", z);
    } catch {
    }
    w.hidden = !0, b.setAttribute("aria-expanded", "false"), t(), z === "journey" && e(location.pathname.startsWith("/auth") || Yi ? "landing" : "workspace");
  };
  const n = document.createElement("div");
  n.id = Fc;
  const a = n.attachShadow({ mode: "open" }), o = document.createElement("style");
  o.textContent = `@font-face{font-family:Readex;src:url('${T1}') format('woff2');font-weight:400;unicode-range:U+0600-06FF,U+0750-077F,U+08A0-08FF,U+FB50-FDFF,U+FE70-FEFF;font-display:swap}@font-face{font-family:Readex;src:url('${M1}') format('woff2');font-weight:400;font-display:swap}@font-face{font-family:Amiri;src:url('${I1}') format('woff2');font-weight:400;font-display:swap}` + E1;
  const s = document.createElement("style");
  s.dataset.hadithFonts = "true";
  const l = o.textContent.indexOf(":host");
  s.textContent = o.textContent.slice(0, l).replaceAll("Readex", "AtharReadex").replaceAll("Amiri", "AtharAmiri"), o.textContent = o.textContent.slice(l).replaceAll("Readex", "AtharReadex").replaceAll("Amiri", "AtharAmiri"), document.head.appendChild(s), a.appendChild(o);
  const c = document.createElement("dialog");
  c.className = "athar-dialog", c.tabIndex = -1, c.setAttribute("aria-label", "بيان السنة — واجهة الحديث");
  const d = document.createElement("div");
  c.appendChild(d), a.appendChild(c), document.body.appendChild(n);
  let p = null, f = () => {
  }, v = "";
  const g = _1();
  let u = "original";
  const m = document.createElement("div");
  m.id = "athar-view-switch";
  const x = m.attachShadow({ mode: "open" }), A = document.createElement("style");
  A.textContent = ":host{font-family:AtharReadex,system-ui,sans-serif;direction:rtl}button{font:inherit;cursor:pointer}.trigger{display:flex;align-items:center;gap:10px;border:1px solid #6150ea55;background:#292151;color:#f1edfc;font-size:11px;border-radius:99px;padding:10px 15px;white-space:nowrap;box-shadow:0 3px 14px #1a164815}.menu{position:absolute;left:50%;transform:translateX(-50%);top:calc(100% + 9px);background:#fff;border:1px solid #e3ddef;border-radius:13px;width:245px;padding:7px;box-shadow:0 16px 44px #24203b22;direction:rtl}.menu[hidden]{display:none}.menu button{display:block;width:100%;background:transparent;text-align:right;padding:12px 13px;border:0;border-radius:8px;color:#716180;font-size:12px}.menu button small{display:block;font-size:10px;margin-top:5px;color:#a599b4}.menu button[aria-pressed=true]{background:#f1edf8;color:#574278}.menu button:hover{background:#f6f3fb}button:focus-visible{outline:2px solid #a396cd;outline-offset:3px}", x.append(A);
  const b = document.createElement("button");
  b.id = "hadith-theme-launcher", b.className = "trigger", b.type = "button", b.setAttribute("aria-label", "بدّل واجهة أثر"), b.setAttribute("aria-expanded", "false"), b.setAttribute("aria-controls", "athar-views");
  const w = document.createElement("div");
  w.id = "athar-views", w.className = "menu", w.hidden = !0;
  const y = [["original", "الواجهة الأصلية", "الواجهة الأساسية"], ["journey", "أثر ١ · رحلة المعرفة", "واجهة الاستكشاف الأولى"], ["chat", "بيان السُّنّة · أثر ٢", "الحالات التطبيقية والمحادثة"]], T = { original: "الأصلية", journey: "أثر ١", chat: "بيان السُّنّة" };
  for (const [z, N, _] of y) {
    const L = document.createElement("button");
    L.type = "button", L.dataset.variant = z, L.textContent = N;
    const Q = document.createElement("small");
    Q.textContent = _, L.append(Q), L.addEventListener("click", () => {
      if (Yi && z === "chat") {
        window.open("http://localhost:8080/?athar=chat", "_blank", "noopener");
        return;
      }
      r(z);
    }), w.append(L);
  }
  b.addEventListener("click", () => {
    w.hidden = !w.hidden, b.setAttribute("aria-expanded", String(!w.hidden));
  }), x.append(b, w), t(), document.addEventListener("pointerdown", (z) => {
    z.composedPath().includes(m) || (w.hidden = !0, b.setAttribute("aria-expanded", "false"));
  }), m.addEventListener("keydown", (z) => {
    z.key === "Escape" && (w.hidden = !0, b.setAttribute("aria-expanded", "false"), b.focus());
  }), Yu(z1, { target: d, props: { apiBase: Yi ? "/api" : D1, onClose: () => r("original"), onVariant2: () => {
    Yi ? window.open("http://localhost:8080/?athar=chat", "_blank", "noopener") : r("chat");
  }, onReady: (z) => {
    f = z;
  }, webuiOrigin: Yi ? "http://localhost:8080" : location.origin } }), c.addEventListener("cancel", (z) => {
    z.preventDefault(), r("original");
  });
  const M = () => {
    const z = location.pathname.startsWith("/auth"), N = location.pathname === "/" || /^\/c\//.test(location.pathname);
    if (g.refresh(), !(z || N || Yi)) {
      m.remove();
      return;
    }
    const _ = N ? document.querySelector("nav") : null, L = _ || document.body;
    m.parentElement !== L && L.appendChild(m), m.style.cssText = `position:${_ ? "absolute" : "fixed"};top:${_ ? "4px" : "18px"};left:50%;transform:translateX(-50%);z-index:60;`;
  };
  if (new MutationObserver(M).observe(document.body, { childList: !0, subtree: !0 }), window.addEventListener("popstate", M), M(), Yi) r("journey");
  else {
    let z = "";
    try {
      z = sessionStorage.getItem("hadith-view") || "";
    } catch {
    }
    (new URLSearchParams(location.search).get("athar") === "chat" || z === "chat") && r("chat");
  }
}
