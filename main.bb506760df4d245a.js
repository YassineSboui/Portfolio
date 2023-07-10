"use strict";
(self.webpackChunkPortfolio = self.webpackChunkPortfolio || []).push([
  [179],
  {
    90: () => {
      function ne(e) {
        return "function" == typeof e;
      }
      function Yr(e) {
        const n = e((r) => {
          Error.call(r), (r.stack = new Error().stack);
        });
        return (
          (n.prototype = Object.create(Error.prototype)),
          (n.prototype.constructor = n),
          n
        );
      }
      const li = Yr(
        (e) =>
          function (n) {
            e(this),
              (this.message = n
                ? `${n.length} errors occurred during unsubscription:\n${n
                    .map((r, o) => `${o + 1}) ${r.toString()}`)
                    .join("\n  ")}`
                : ""),
              (this.name = "UnsubscriptionError"),
              (this.errors = n);
          }
      );
      function Yn(e, t) {
        if (e) {
          const n = e.indexOf(t);
          0 <= n && e.splice(n, 1);
        }
      }
      class Je {
        constructor(t) {
          (this.initialTeardown = t),
            (this.closed = !1),
            (this._parentage = null),
            (this._finalizers = null);
        }
        unsubscribe() {
          let t;
          if (!this.closed) {
            this.closed = !0;
            const { _parentage: n } = this;
            if (n)
              if (((this._parentage = null), Array.isArray(n)))
                for (const i of n) i.remove(this);
              else n.remove(this);
            const { initialTeardown: r } = this;
            if (ne(r))
              try {
                r();
              } catch (i) {
                t = i instanceof li ? i.errors : [i];
              }
            const { _finalizers: o } = this;
            if (o) {
              this._finalizers = null;
              for (const i of o)
                try {
                  ld(i);
                } catch (s) {
                  (t = t ?? []),
                    s instanceof li ? (t = [...t, ...s.errors]) : t.push(s);
                }
            }
            if (t) throw new li(t);
          }
        }
        add(t) {
          var n;
          if (t && t !== this)
            if (this.closed) ld(t);
            else {
              if (t instanceof Je) {
                if (t.closed || t._hasParent(this)) return;
                t._addParent(this);
              }
              (this._finalizers =
                null !== (n = this._finalizers) && void 0 !== n ? n : []).push(
                t
              );
            }
        }
        _hasParent(t) {
          const { _parentage: n } = this;
          return n === t || (Array.isArray(n) && n.includes(t));
        }
        _addParent(t) {
          const { _parentage: n } = this;
          this._parentage = Array.isArray(n) ? (n.push(t), n) : n ? [n, t] : t;
        }
        _removeParent(t) {
          const { _parentage: n } = this;
          n === t ? (this._parentage = null) : Array.isArray(n) && Yn(n, t);
        }
        remove(t) {
          const { _finalizers: n } = this;
          n && Yn(n, t), t instanceof Je && t._removeParent(this);
        }
      }
      Je.EMPTY = (() => {
        const e = new Je();
        return (e.closed = !0), e;
      })();
      const ad = Je.EMPTY;
      function ud(e) {
        return (
          e instanceof Je ||
          (e && "closed" in e && ne(e.remove) && ne(e.add) && ne(e.unsubscribe))
        );
      }
      function ld(e) {
        ne(e) ? e() : e.unsubscribe();
      }
      const In = {
          onUnhandledError: null,
          onStoppedNotification: null,
          Promise: void 0,
          useDeprecatedSynchronousErrorHandling: !1,
          useDeprecatedNextContext: !1,
        },
        ci = {
          setTimeout(e, t, ...n) {
            const { delegate: r } = ci;
            return r?.setTimeout
              ? r.setTimeout(e, t, ...n)
              : setTimeout(e, t, ...n);
          },
          clearTimeout(e) {
            const { delegate: t } = ci;
            return (t?.clearTimeout || clearTimeout)(e);
          },
          delegate: void 0,
        };
      function cd(e) {
        ci.setTimeout(() => {
          const { onUnhandledError: t } = In;
          if (!t) throw e;
          t(e);
        });
      }
      function fa() {}
      const ND = ha("C", void 0, void 0);
      function ha(e, t, n) {
        return { kind: e, value: t, error: n };
      }
      let Sn = null;
      function di(e) {
        if (In.useDeprecatedSynchronousErrorHandling) {
          const t = !Sn;
          if ((t && (Sn = { errorThrown: !1, error: null }), e(), t)) {
            const { errorThrown: n, error: r } = Sn;
            if (((Sn = null), n)) throw r;
          }
        } else e();
      }
      class pa extends Je {
        constructor(t) {
          super(),
            (this.isStopped = !1),
            t
              ? ((this.destination = t), ud(t) && t.add(this))
              : (this.destination = VD);
        }
        static create(t, n, r) {
          return new Zr(t, n, r);
        }
        next(t) {
          this.isStopped
            ? ma(
                (function kD(e) {
                  return ha("N", e, void 0);
                })(t),
                this
              )
            : this._next(t);
        }
        error(t) {
          this.isStopped
            ? ma(
                (function FD(e) {
                  return ha("E", void 0, e);
                })(t),
                this
              )
            : ((this.isStopped = !0), this._error(t));
        }
        complete() {
          this.isStopped
            ? ma(ND, this)
            : ((this.isStopped = !0), this._complete());
        }
        unsubscribe() {
          this.closed ||
            ((this.isStopped = !0),
            super.unsubscribe(),
            (this.destination = null));
        }
        _next(t) {
          this.destination.next(t);
        }
        _error(t) {
          try {
            this.destination.error(t);
          } finally {
            this.unsubscribe();
          }
        }
        _complete() {
          try {
            this.destination.complete();
          } finally {
            this.unsubscribe();
          }
        }
      }
      const jD = Function.prototype.bind;
      function ga(e, t) {
        return jD.call(e, t);
      }
      class $D {
        constructor(t) {
          this.partialObserver = t;
        }
        next(t) {
          const { partialObserver: n } = this;
          if (n.next)
            try {
              n.next(t);
            } catch (r) {
              fi(r);
            }
        }
        error(t) {
          const { partialObserver: n } = this;
          if (n.error)
            try {
              n.error(t);
            } catch (r) {
              fi(r);
            }
          else fi(t);
        }
        complete() {
          const { partialObserver: t } = this;
          if (t.complete)
            try {
              t.complete();
            } catch (n) {
              fi(n);
            }
        }
      }
      class Zr extends pa {
        constructor(t, n, r) {
          let o;
          if ((super(), ne(t) || !t))
            o = {
              next: t ?? void 0,
              error: n ?? void 0,
              complete: r ?? void 0,
            };
          else {
            let i;
            this && In.useDeprecatedNextContext
              ? ((i = Object.create(t)),
                (i.unsubscribe = () => this.unsubscribe()),
                (o = {
                  next: t.next && ga(t.next, i),
                  error: t.error && ga(t.error, i),
                  complete: t.complete && ga(t.complete, i),
                }))
              : (o = t);
          }
          this.destination = new $D(o);
        }
      }
      function fi(e) {
        In.useDeprecatedSynchronousErrorHandling
          ? (function LD(e) {
              In.useDeprecatedSynchronousErrorHandling &&
                Sn &&
                ((Sn.errorThrown = !0), (Sn.error = e));
            })(e)
          : cd(e);
      }
      function ma(e, t) {
        const { onStoppedNotification: n } = In;
        n && ci.setTimeout(() => n(e, t));
      }
      const VD = {
          closed: !0,
          next: fa,
          error: function BD(e) {
            throw e;
          },
          complete: fa,
        },
        ya =
          ("function" == typeof Symbol && Symbol.observable) || "@@observable";
      function Mn(e) {
        return e;
      }
      function dd(e) {
        return 0 === e.length
          ? Mn
          : 1 === e.length
          ? e[0]
          : function (n) {
              return e.reduce((r, o) => o(r), n);
            };
      }
      let me = (() => {
        class e {
          constructor(n) {
            n && (this._subscribe = n);
          }
          lift(n) {
            const r = new e();
            return (r.source = this), (r.operator = n), r;
          }
          subscribe(n, r, o) {
            const i = (function zD(e) {
              return (
                (e && e instanceof pa) ||
                ((function HD(e) {
                  return e && ne(e.next) && ne(e.error) && ne(e.complete);
                })(e) &&
                  ud(e))
              );
            })(n)
              ? n
              : new Zr(n, r, o);
            return (
              di(() => {
                const { operator: s, source: a } = this;
                i.add(
                  s
                    ? s.call(i, a)
                    : a
                    ? this._subscribe(i)
                    : this._trySubscribe(i)
                );
              }),
              i
            );
          }
          _trySubscribe(n) {
            try {
              return this._subscribe(n);
            } catch (r) {
              n.error(r);
            }
          }
          forEach(n, r) {
            return new (r = fd(r))((o, i) => {
              const s = new Zr({
                next: (a) => {
                  try {
                    n(a);
                  } catch (u) {
                    i(u), s.unsubscribe();
                  }
                },
                error: i,
                complete: o,
              });
              this.subscribe(s);
            });
          }
          _subscribe(n) {
            var r;
            return null === (r = this.source) || void 0 === r
              ? void 0
              : r.subscribe(n);
          }
          [ya]() {
            return this;
          }
          pipe(...n) {
            return dd(n)(this);
          }
          toPromise(n) {
            return new (n = fd(n))((r, o) => {
              let i;
              this.subscribe(
                (s) => (i = s),
                (s) => o(s),
                () => r(i)
              );
            });
          }
        }
        return (e.create = (t) => new e(t)), e;
      })();
      function fd(e) {
        var t;
        return null !== (t = e ?? In.Promise) && void 0 !== t ? t : Promise;
      }
      const GD = Yr(
        (e) =>
          function () {
            e(this),
              (this.name = "ObjectUnsubscribedError"),
              (this.message = "object unsubscribed");
          }
      );
      let Tt = (() => {
        class e extends me {
          constructor() {
            super(),
              (this.closed = !1),
              (this.currentObservers = null),
              (this.observers = []),
              (this.isStopped = !1),
              (this.hasError = !1),
              (this.thrownError = null);
          }
          lift(n) {
            const r = new hd(this, this);
            return (r.operator = n), r;
          }
          _throwIfClosed() {
            if (this.closed) throw new GD();
          }
          next(n) {
            di(() => {
              if ((this._throwIfClosed(), !this.isStopped)) {
                this.currentObservers ||
                  (this.currentObservers = Array.from(this.observers));
                for (const r of this.currentObservers) r.next(n);
              }
            });
          }
          error(n) {
            di(() => {
              if ((this._throwIfClosed(), !this.isStopped)) {
                (this.hasError = this.isStopped = !0), (this.thrownError = n);
                const { observers: r } = this;
                for (; r.length; ) r.shift().error(n);
              }
            });
          }
          complete() {
            di(() => {
              if ((this._throwIfClosed(), !this.isStopped)) {
                this.isStopped = !0;
                const { observers: n } = this;
                for (; n.length; ) n.shift().complete();
              }
            });
          }
          unsubscribe() {
            (this.isStopped = this.closed = !0),
              (this.observers = this.currentObservers = null);
          }
          get observed() {
            var n;
            return (
              (null === (n = this.observers) || void 0 === n
                ? void 0
                : n.length) > 0
            );
          }
          _trySubscribe(n) {
            return this._throwIfClosed(), super._trySubscribe(n);
          }
          _subscribe(n) {
            return (
              this._throwIfClosed(),
              this._checkFinalizedStatuses(n),
              this._innerSubscribe(n)
            );
          }
          _innerSubscribe(n) {
            const { hasError: r, isStopped: o, observers: i } = this;
            return r || o
              ? ad
              : ((this.currentObservers = null),
                i.push(n),
                new Je(() => {
                  (this.currentObservers = null), Yn(i, n);
                }));
          }
          _checkFinalizedStatuses(n) {
            const { hasError: r, thrownError: o, isStopped: i } = this;
            r ? n.error(o) : i && n.complete();
          }
          asObservable() {
            const n = new me();
            return (n.source = this), n;
          }
        }
        return (e.create = (t, n) => new hd(t, n)), e;
      })();
      class hd extends Tt {
        constructor(t, n) {
          super(), (this.destination = t), (this.source = n);
        }
        next(t) {
          var n, r;
          null ===
            (r =
              null === (n = this.destination) || void 0 === n
                ? void 0
                : n.next) ||
            void 0 === r ||
            r.call(n, t);
        }
        error(t) {
          var n, r;
          null ===
            (r =
              null === (n = this.destination) || void 0 === n
                ? void 0
                : n.error) ||
            void 0 === r ||
            r.call(n, t);
        }
        complete() {
          var t, n;
          null ===
            (n =
              null === (t = this.destination) || void 0 === t
                ? void 0
                : t.complete) ||
            void 0 === n ||
            n.call(t);
        }
        _subscribe(t) {
          var n, r;
          return null !==
            (r =
              null === (n = this.source) || void 0 === n
                ? void 0
                : n.subscribe(t)) && void 0 !== r
            ? r
            : ad;
        }
      }
      function pd(e) {
        return ne(e?.lift);
      }
      function ye(e) {
        return (t) => {
          if (pd(t))
            return t.lift(function (n) {
              try {
                return e(n, this);
              } catch (r) {
                this.error(r);
              }
            });
          throw new TypeError("Unable to lift unknown Observable type");
        };
      }
      function ve(e, t, n, r, o) {
        return new WD(e, t, n, r, o);
      }
      class WD extends pa {
        constructor(t, n, r, o, i, s) {
          super(t),
            (this.onFinalize = i),
            (this.shouldUnsubscribe = s),
            (this._next = n
              ? function (a) {
                  try {
                    n(a);
                  } catch (u) {
                    t.error(u);
                  }
                }
              : super._next),
            (this._error = o
              ? function (a) {
                  try {
                    o(a);
                  } catch (u) {
                    t.error(u);
                  } finally {
                    this.unsubscribe();
                  }
                }
              : super._error),
            (this._complete = r
              ? function () {
                  try {
                    r();
                  } catch (a) {
                    t.error(a);
                  } finally {
                    this.unsubscribe();
                  }
                }
              : super._complete);
        }
        unsubscribe() {
          var t;
          if (!this.shouldUnsubscribe || this.shouldUnsubscribe()) {
            const { closed: n } = this;
            super.unsubscribe(),
              !n &&
                (null === (t = this.onFinalize) ||
                  void 0 === t ||
                  t.call(this));
          }
        }
      }
      function z(e, t) {
        return ye((n, r) => {
          let o = 0;
          n.subscribe(
            ve(r, (i) => {
              r.next(e.call(t, i, o++));
            })
          );
        });
      }
      function dn(e) {
        return this instanceof dn ? ((this.v = e), this) : new dn(e);
      }
      function vd(e) {
        if (!Symbol.asyncIterator)
          throw new TypeError("Symbol.asyncIterator is not defined.");
        var n,
          t = e[Symbol.asyncIterator];
        return t
          ? t.call(e)
          : ((e = (function Ca(e) {
              var t = "function" == typeof Symbol && Symbol.iterator,
                n = t && e[t],
                r = 0;
              if (n) return n.call(e);
              if (e && "number" == typeof e.length)
                return {
                  next: function () {
                    return (
                      e && r >= e.length && (e = void 0),
                      { value: e && e[r++], done: !e }
                    );
                  },
                };
              throw new TypeError(
                t
                  ? "Object is not iterable."
                  : "Symbol.iterator is not defined."
              );
            })(e)),
            (n = {}),
            r("next"),
            r("throw"),
            r("return"),
            (n[Symbol.asyncIterator] = function () {
              return this;
            }),
            n);
        function r(i) {
          n[i] =
            e[i] &&
            function (s) {
              return new Promise(function (a, u) {
                !(function o(i, s, a, u) {
                  Promise.resolve(u).then(function (l) {
                    i({ value: l, done: a });
                  }, s);
                })(a, u, (s = e[i](s)).done, s.value);
              });
            };
        }
      }
      "function" == typeof SuppressedError && SuppressedError;
      const Dd = (e) =>
        e && "number" == typeof e.length && "function" != typeof e;
      function wd(e) {
        return ne(e?.then);
      }
      function Cd(e) {
        return ne(e[ya]);
      }
      function _d(e) {
        return Symbol.asyncIterator && ne(e?.[Symbol.asyncIterator]);
      }
      function Ed(e) {
        return new TypeError(
          `You provided ${
            null !== e && "object" == typeof e ? "an invalid object" : `'${e}'`
          } where a stream was expected. You can provide an Observable, Promise, ReadableStream, Array, AsyncIterable, or Iterable.`
        );
      }
      const bd = (function pw() {
        return "function" == typeof Symbol && Symbol.iterator
          ? Symbol.iterator
          : "@@iterator";
      })();
      function Id(e) {
        return ne(e?.[bd]);
      }
      function Sd(e) {
        return (function yd(e, t, n) {
          if (!Symbol.asyncIterator)
            throw new TypeError("Symbol.asyncIterator is not defined.");
          var o,
            r = n.apply(e, t || []),
            i = [];
          return (
            (o = {}),
            s("next"),
            s("throw"),
            s("return"),
            (o[Symbol.asyncIterator] = function () {
              return this;
            }),
            o
          );
          function s(f) {
            r[f] &&
              (o[f] = function (h) {
                return new Promise(function (p, g) {
                  i.push([f, h, p, g]) > 1 || a(f, h);
                });
              });
          }
          function a(f, h) {
            try {
              !(function u(f) {
                f.value instanceof dn
                  ? Promise.resolve(f.value.v).then(l, c)
                  : d(i[0][2], f);
              })(r[f](h));
            } catch (p) {
              d(i[0][3], p);
            }
          }
          function l(f) {
            a("next", f);
          }
          function c(f) {
            a("throw", f);
          }
          function d(f, h) {
            f(h), i.shift(), i.length && a(i[0][0], i[0][1]);
          }
        })(this, arguments, function* () {
          const n = e.getReader();
          try {
            for (;;) {
              const { value: r, done: o } = yield dn(n.read());
              if (o) return yield dn(void 0);
              yield yield dn(r);
            }
          } finally {
            n.releaseLock();
          }
        });
      }
      function Md(e) {
        return ne(e?.getReader);
      }
      function at(e) {
        if (e instanceof me) return e;
        if (null != e) {
          if (Cd(e))
            return (function gw(e) {
              return new me((t) => {
                const n = e[ya]();
                if (ne(n.subscribe)) return n.subscribe(t);
                throw new TypeError(
                  "Provided object does not correctly implement Symbol.observable"
                );
              });
            })(e);
          if (Dd(e))
            return (function mw(e) {
              return new me((t) => {
                for (let n = 0; n < e.length && !t.closed; n++) t.next(e[n]);
                t.complete();
              });
            })(e);
          if (wd(e))
            return (function yw(e) {
              return new me((t) => {
                e.then(
                  (n) => {
                    t.closed || (t.next(n), t.complete());
                  },
                  (n) => t.error(n)
                ).then(null, cd);
              });
            })(e);
          if (_d(e)) return Td(e);
          if (Id(e))
            return (function vw(e) {
              return new me((t) => {
                for (const n of e) if ((t.next(n), t.closed)) return;
                t.complete();
              });
            })(e);
          if (Md(e))
            return (function Dw(e) {
              return Td(Sd(e));
            })(e);
        }
        throw Ed(e);
      }
      function Td(e) {
        return new me((t) => {
          (function ww(e, t) {
            var n, r, o, i;
            return (function gd(e, t, n, r) {
              return new (n || (n = Promise))(function (i, s) {
                function a(c) {
                  try {
                    l(r.next(c));
                  } catch (d) {
                    s(d);
                  }
                }
                function u(c) {
                  try {
                    l(r.throw(c));
                  } catch (d) {
                    s(d);
                  }
                }
                function l(c) {
                  c.done
                    ? i(c.value)
                    : (function o(i) {
                        return i instanceof n
                          ? i
                          : new n(function (s) {
                              s(i);
                            });
                      })(c.value).then(a, u);
                }
                l((r = r.apply(e, t || [])).next());
              });
            })(this, void 0, void 0, function* () {
              try {
                for (n = vd(e); !(r = yield n.next()).done; )
                  if ((t.next(r.value), t.closed)) return;
              } catch (s) {
                o = { error: s };
              } finally {
                try {
                  r && !r.done && (i = n.return) && (yield i.call(n));
                } finally {
                  if (o) throw o.error;
                }
              }
              t.complete();
            });
          })(e, t).catch((n) => t.error(n));
        });
      }
      function zt(e, t, n, r = 0, o = !1) {
        const i = t.schedule(function () {
          n(), o ? e.add(this.schedule(null, r)) : this.unsubscribe();
        }, r);
        if ((e.add(i), !o)) return i;
      }
      function Se(e, t, n = 1 / 0) {
        return ne(t)
          ? Se((r, o) => z((i, s) => t(r, i, o, s))(at(e(r, o))), n)
          : ("number" == typeof t && (n = t),
            ye((r, o) =>
              (function Cw(e, t, n, r, o, i, s, a) {
                const u = [];
                let l = 0,
                  c = 0,
                  d = !1;
                const f = () => {
                    d && !u.length && !l && t.complete();
                  },
                  h = (g) => (l < r ? p(g) : u.push(g)),
                  p = (g) => {
                    i && t.next(g), l++;
                    let y = !1;
                    at(n(g, c++)).subscribe(
                      ve(
                        t,
                        (D) => {
                          o?.(D), i ? h(D) : t.next(D);
                        },
                        () => {
                          y = !0;
                        },
                        void 0,
                        () => {
                          if (y)
                            try {
                              for (l--; u.length && l < r; ) {
                                const D = u.shift();
                                s ? zt(t, s, () => p(D)) : p(D);
                              }
                              f();
                            } catch (D) {
                              t.error(D);
                            }
                        }
                      )
                    );
                  };
                return (
                  e.subscribe(
                    ve(t, h, () => {
                      (d = !0), f();
                    })
                  ),
                  () => {
                    a?.();
                  }
                );
              })(r, o, e, n)
            ));
      }
      function Zn(e = 1 / 0) {
        return Se(Mn, e);
      }
      const At = new me((e) => e.complete());
      function _a(e) {
        return e[e.length - 1];
      }
      function Kr(e) {
        return (function Ew(e) {
          return e && ne(e.schedule);
        })(_a(e))
          ? e.pop()
          : void 0;
      }
      function Ad(e, t = 0) {
        return ye((n, r) => {
          n.subscribe(
            ve(
              r,
              (o) => zt(r, e, () => r.next(o), t),
              () => zt(r, e, () => r.complete(), t),
              (o) => zt(r, e, () => r.error(o), t)
            )
          );
        });
      }
      function Rd(e, t = 0) {
        return ye((n, r) => {
          r.add(e.schedule(() => n.subscribe(r), t));
        });
      }
      function xd(e, t) {
        if (!e) throw new Error("Iterable cannot be null");
        return new me((n) => {
          zt(n, t, () => {
            const r = e[Symbol.asyncIterator]();
            zt(
              n,
              t,
              () => {
                r.next().then((o) => {
                  o.done ? n.complete() : n.next(o.value);
                });
              },
              0,
              !0
            );
          });
        });
      }
      function _e(e, t) {
        return t
          ? (function xw(e, t) {
              if (null != e) {
                if (Cd(e))
                  return (function Sw(e, t) {
                    return at(e).pipe(Rd(t), Ad(t));
                  })(e, t);
                if (Dd(e))
                  return (function Tw(e, t) {
                    return new me((n) => {
                      let r = 0;
                      return t.schedule(function () {
                        r === e.length
                          ? n.complete()
                          : (n.next(e[r++]), n.closed || this.schedule());
                      });
                    });
                  })(e, t);
                if (wd(e))
                  return (function Mw(e, t) {
                    return at(e).pipe(Rd(t), Ad(t));
                  })(e, t);
                if (_d(e)) return xd(e, t);
                if (Id(e))
                  return (function Aw(e, t) {
                    return new me((n) => {
                      let r;
                      return (
                        zt(n, t, () => {
                          (r = e[bd]()),
                            zt(
                              n,
                              t,
                              () => {
                                let o, i;
                                try {
                                  ({ value: o, done: i } = r.next());
                                } catch (s) {
                                  return void n.error(s);
                                }
                                i ? n.complete() : n.next(o);
                              },
                              0,
                              !0
                            );
                        }),
                        () => ne(r?.return) && r.return()
                      );
                    });
                  })(e, t);
                if (Md(e))
                  return (function Rw(e, t) {
                    return xd(Sd(e), t);
                  })(e, t);
              }
              throw Ed(e);
            })(e, t)
          : at(e);
      }
      function Ea(e, t, ...n) {
        if (!0 === t) return void e();
        if (!1 === t) return;
        const r = new Zr({
          next: () => {
            r.unsubscribe(), e();
          },
        });
        return at(t(...n)).subscribe(r);
      }
      function ee(e) {
        for (let t in e) if (e[t] === ee) return t;
        throw Error("Could not find renamed property on target object.");
      }
      function re(e) {
        if ("string" == typeof e) return e;
        if (Array.isArray(e)) return "[" + e.map(re).join(", ") + "]";
        if (null == e) return "" + e;
        if (e.overriddenName) return `${e.overriddenName}`;
        if (e.name) return `${e.name}`;
        const t = e.toString();
        if (null == t) return "" + t;
        const n = t.indexOf("\n");
        return -1 === n ? t : t.substring(0, n);
      }
      function Ia(e, t) {
        return null == e || "" === e
          ? null === t
            ? ""
            : t
          : null == t || "" === t
          ? e
          : e + " " + t;
      }
      const Nw = ee({ __forward_ref__: ee });
      function Sa(e) {
        return (
          (e.__forward_ref__ = Sa),
          (e.toString = function () {
            return re(this());
          }),
          e
        );
      }
      function R(e) {
        return Ma(e) ? e() : e;
      }
      function Ma(e) {
        return (
          "function" == typeof e &&
          e.hasOwnProperty(Nw) &&
          e.__forward_ref__ === Sa
        );
      }
      function Ta(e) {
        return e && !!e.ɵproviders;
      }
      class w extends Error {
        constructor(t, n) {
          super(hi(t, n)), (this.code = t);
        }
      }
      function hi(e, t) {
        return `NG0${Math.abs(e)}${t ? ": " + t.trim() : ""}`;
      }
      function k(e) {
        return "string" == typeof e ? e : null == e ? "" : String(e);
      }
      function pi(e, t) {
        throw new w(-201, !1);
      }
      function ut(e, t) {
        null == e &&
          (function J(e, t, n, r) {
            throw new Error(
              `ASSERTION ERROR: ${e}` +
                (null == r ? "" : ` [Expected=> ${n} ${r} ${t} <=Actual]`)
            );
          })(t, e, null, "!=");
      }
      function M(e) {
        return {
          token: e.token,
          providedIn: e.providedIn || null,
          factory: e.factory,
          value: void 0,
        };
      }
      function hn(e) {
        return { providers: e.providers || [], imports: e.imports || [] };
      }
      function gi(e) {
        return Od(e, mi) || Od(e, Fd);
      }
      function Od(e, t) {
        return e.hasOwnProperty(t) ? e[t] : null;
      }
      function Nd(e) {
        return e && (e.hasOwnProperty(Aa) || e.hasOwnProperty(Uw))
          ? e[Aa]
          : null;
      }
      const mi = ee({ ɵprov: ee }),
        Aa = ee({ ɵinj: ee }),
        Fd = ee({ ngInjectableDef: ee }),
        Uw = ee({ ngInjectorDef: ee });
      var x = (() => (
        ((x = x || {})[(x.Default = 0)] = "Default"),
        (x[(x.Host = 1)] = "Host"),
        (x[(x.Self = 2)] = "Self"),
        (x[(x.SkipSelf = 4)] = "SkipSelf"),
        (x[(x.Optional = 8)] = "Optional"),
        x
      ))();
      let Ra;
      function lt(e) {
        const t = Ra;
        return (Ra = e), t;
      }
      function kd(e, t, n) {
        const r = gi(e);
        return r && "root" == r.providedIn
          ? void 0 === r.value
            ? (r.value = r.factory())
            : r.value
          : n & x.Optional
          ? null
          : void 0 !== t
          ? t
          : void pi(re(e));
      }
      const ie = (() =>
          (typeof globalThis < "u" && globalThis) ||
          (typeof global < "u" && global) ||
          (typeof window < "u" && window) ||
          (typeof self < "u" &&
            typeof WorkerGlobalScope < "u" &&
            self instanceof WorkerGlobalScope &&
            self))(),
        Jr = {},
        xa = "__NG_DI_FLAG__",
        yi = "ngTempTokenPath",
        zw = "ngTokenPath",
        Gw = /\n/gm,
        Ww = "\u0275",
        Ld = "__source";
      let Xr;
      function Kn(e) {
        const t = Xr;
        return (Xr = e), t;
      }
      function qw(e, t = x.Default) {
        if (void 0 === Xr) throw new w(-203, !1);
        return null === Xr
          ? kd(e, void 0, t)
          : Xr.get(e, t & x.Optional ? null : void 0, t);
      }
      function b(e, t = x.Default) {
        return (
          (function Hw() {
            return Ra;
          })() || qw
        )(R(e), t);
      }
      function W(e, t = x.Default) {
        return b(e, vi(t));
      }
      function vi(e) {
        return typeof e > "u" || "number" == typeof e
          ? e
          : 0 |
              (e.optional && 8) |
              (e.host && 1) |
              (e.self && 2) |
              (e.skipSelf && 4);
      }
      function Pa(e) {
        const t = [];
        for (let n = 0; n < e.length; n++) {
          const r = R(e[n]);
          if (Array.isArray(r)) {
            if (0 === r.length) throw new w(900, !1);
            let o,
              i = x.Default;
            for (let s = 0; s < r.length; s++) {
              const a = r[s],
                u = Qw(a);
              "number" == typeof u
                ? -1 === u
                  ? (o = a.token)
                  : (i |= u)
                : (o = a);
            }
            t.push(b(o, i));
          } else t.push(b(r));
        }
        return t;
      }
      function eo(e, t) {
        return (e[xa] = t), (e.prototype[xa] = t), e;
      }
      function Qw(e) {
        return e[xa];
      }
      function Gt(e) {
        return { toString: e }.toString();
      }
      var Rt = (() => (
          ((Rt = Rt || {})[(Rt.OnPush = 0)] = "OnPush"),
          (Rt[(Rt.Default = 1)] = "Default"),
          Rt
        ))(),
        xt = (() => {
          return (
            ((e = xt || (xt = {}))[(e.Emulated = 0)] = "Emulated"),
            (e[(e.None = 2)] = "None"),
            (e[(e.ShadowDom = 3)] = "ShadowDom"),
            xt
          );
          var e;
        })();
      const Wt = {},
        Q = [],
        Di = ee({ ɵcmp: ee }),
        Oa = ee({ ɵdir: ee }),
        Na = ee({ ɵpipe: ee }),
        $d = ee({ ɵmod: ee }),
        qt = ee({ ɵfac: ee }),
        to = ee({ __NG_ELEMENT_ID__: ee });
      let Kw = 0;
      function Pt(e) {
        return Gt(() => {
          const t = Vd(e),
            n = {
              ...t,
              decls: e.decls,
              vars: e.vars,
              template: e.template,
              consts: e.consts || null,
              ngContentSelectors: e.ngContentSelectors,
              onPush: e.changeDetection === Rt.OnPush,
              directiveDefs: null,
              pipeDefs: null,
              dependencies: (t.standalone && e.dependencies) || null,
              getStandaloneInjector: null,
              data: e.data || {},
              encapsulation: e.encapsulation || xt.Emulated,
              id: "c" + Kw++,
              styles: e.styles || Q,
              _: null,
              schemas: e.schemas || null,
              tView: null,
            };
          Ud(n);
          const r = e.dependencies;
          return (n.directiveDefs = wi(r, !1)), (n.pipeDefs = wi(r, !0)), n;
        });
      }
      function Xw(e) {
        return X(e) || xe(e);
      }
      function eC(e) {
        return null !== e;
      }
      function Tn(e) {
        return Gt(() => ({
          type: e.type,
          bootstrap: e.bootstrap || Q,
          declarations: e.declarations || Q,
          imports: e.imports || Q,
          exports: e.exports || Q,
          transitiveCompileScopes: null,
          schemas: e.schemas || null,
          id: e.id || null,
        }));
      }
      function Bd(e, t) {
        if (null == e) return Wt;
        const n = {};
        for (const r in e)
          if (e.hasOwnProperty(r)) {
            let o = e[r],
              i = o;
            Array.isArray(o) && ((i = o[1]), (o = o[0])),
              (n[o] = r),
              t && (t[o] = i);
          }
        return n;
      }
      function Re(e) {
        return Gt(() => {
          const t = Vd(e);
          return Ud(t), t;
        });
      }
      function X(e) {
        return e[Di] || null;
      }
      function xe(e) {
        return e[Oa] || null;
      }
      function We(e) {
        return e[Na] || null;
      }
      function et(e, t) {
        const n = e[$d] || null;
        if (!n && !0 === t)
          throw new Error(`Type ${re(e)} does not have '\u0275mod' property.`);
        return n;
      }
      function Vd(e) {
        const t = {};
        return {
          type: e.type,
          providersResolver: null,
          factory: null,
          hostBindings: e.hostBindings || null,
          hostVars: e.hostVars || 0,
          hostAttrs: e.hostAttrs || null,
          contentQueries: e.contentQueries || null,
          declaredInputs: t,
          exportAs: e.exportAs || null,
          standalone: !0 === e.standalone,
          selectors: e.selectors || Q,
          viewQuery: e.viewQuery || null,
          features: e.features || null,
          setInput: null,
          findHostDirectiveDefs: null,
          hostDirectives: null,
          inputs: Bd(e.inputs, t),
          outputs: Bd(e.outputs),
        };
      }
      function Ud(e) {
        e.features?.forEach((t) => t(e));
      }
      function wi(e, t) {
        if (!e) return null;
        const n = t ? We : Xw;
        return () =>
          ("function" == typeof e ? e() : e).map((r) => n(r)).filter(eC);
      }
      const Qt = 0,
        E = 1,
        B = 2,
        le = 3,
        yt = 4,
        An = 5,
        Pe = 6,
        Xn = 7,
        fe = 8,
        Ci = 9,
        _i = 10,
        U = 11,
        Fa = 12,
        no = 13,
        Hd = 14,
        er = 15,
        Oe = 16,
        ro = 17,
        tr = 18,
        Ot = 19,
        oo = 20,
        zd = 21,
        se = 22,
        ka = 1,
        Gd = 2,
        Ei = 7,
        bi = 8,
        nr = 9,
        je = 10;
      function tt(e) {
        return Array.isArray(e) && "object" == typeof e[ka];
      }
      function vt(e) {
        return Array.isArray(e) && !0 === e[ka];
      }
      function La(e) {
        return 0 != (4 & e.flags);
      }
      function io(e) {
        return e.componentOffset > -1;
      }
      function Ii(e) {
        return 1 == (1 & e.flags);
      }
      function Dt(e) {
        return !!e.template;
      }
      function nC(e) {
        return 0 != (256 & e[B]);
      }
      function Rn(e, t) {
        return e.hasOwnProperty(qt) ? e[qt] : null;
      }
      class iC {
        constructor(t, n, r) {
          (this.previousValue = t),
            (this.currentValue = n),
            (this.firstChange = r);
        }
        isFirstChange() {
          return this.firstChange;
        }
      }
      function xn() {
        return Qd;
      }
      function Qd(e) {
        return e.type.prototype.ngOnChanges && (e.setInput = aC), sC;
      }
      function sC() {
        const e = Zd(this),
          t = e?.current;
        if (t) {
          const n = e.previous;
          if (n === Wt) e.previous = t;
          else for (let r in t) n[r] = t[r];
          (e.current = null), this.ngOnChanges(t);
        }
      }
      function aC(e, t, n, r) {
        const o = this.declaredInputs[n],
          i =
            Zd(e) ||
            (function uC(e, t) {
              return (e[Yd] = t);
            })(e, { previous: Wt, current: null }),
          s = i.current || (i.current = {}),
          a = i.previous,
          u = a[o];
        (s[o] = new iC(u && u.currentValue, t, a === Wt)), (e[r] = t);
      }
      xn.ngInherit = !0;
      const Yd = "__ngSimpleChanges__";
      function Zd(e) {
        return e[Yd] || null;
      }
      const ct = function (e, t, n) {};
      function Me(e) {
        for (; Array.isArray(e); ) e = e[Qt];
        return e;
      }
      function Si(e, t) {
        return Me(t[e]);
      }
      function nt(e, t) {
        return Me(t[e.index]);
      }
      function Xd(e, t) {
        return e.data[t];
      }
      function qe(e, t) {
        const n = t[e];
        return tt(n) ? n : n[Qt];
      }
      function Mi(e) {
        return 64 == (64 & e[B]);
      }
      function pn(e, t) {
        return null == t ? null : e[t];
      }
      function ef(e) {
        e[tr] = 0;
      }
      function $a(e, t) {
        e[An] += t;
        let n = e,
          r = e[le];
        for (
          ;
          null !== r && ((1 === t && 1 === n[An]) || (-1 === t && 0 === n[An]));

        )
          (r[An] += t), (n = r), (r = r[le]);
      }
      const L = { lFrame: ff(null), bindingsEnabled: !0 };
      function nf() {
        return L.bindingsEnabled;
      }
      function v() {
        return L.lFrame.lView;
      }
      function q() {
        return L.lFrame.tView;
      }
      function Te() {
        let e = rf();
        for (; null !== e && 64 === e.type; ) e = e.parent;
        return e;
      }
      function rf() {
        return L.lFrame.currentTNode;
      }
      function Nt(e, t) {
        const n = L.lFrame;
        (n.currentTNode = e), (n.isParent = t);
      }
      function Ba() {
        return L.lFrame.isParent;
      }
      function or() {
        return L.lFrame.bindingIndex++;
      }
      function EC(e, t) {
        const n = L.lFrame;
        (n.bindingIndex = n.bindingRootIndex = e), Ua(t);
      }
      function Ua(e) {
        L.lFrame.currentDirectiveIndex = e;
      }
      function za(e) {
        L.lFrame.currentQueryIndex = e;
      }
      function IC(e) {
        const t = e[E];
        return 2 === t.type ? t.declTNode : 1 === t.type ? e[Pe] : null;
      }
      function cf(e, t, n) {
        if (n & x.SkipSelf) {
          let o = t,
            i = e;
          for (
            ;
            !((o = o.parent),
            null !== o ||
              n & x.Host ||
              ((o = IC(i)), null === o || ((i = i[er]), 10 & o.type)));

          );
          if (null === o) return !1;
          (t = o), (e = i);
        }
        const r = (L.lFrame = df());
        return (r.currentTNode = t), (r.lView = e), !0;
      }
      function Ga(e) {
        const t = df(),
          n = e[E];
        (L.lFrame = t),
          (t.currentTNode = n.firstChild),
          (t.lView = e),
          (t.tView = n),
          (t.contextLView = e),
          (t.bindingIndex = n.bindingStartIndex),
          (t.inI18n = !1);
      }
      function df() {
        const e = L.lFrame,
          t = null === e ? null : e.child;
        return null === t ? ff(e) : t;
      }
      function ff(e) {
        const t = {
          currentTNode: null,
          isParent: !0,
          lView: null,
          tView: null,
          selectedIndex: -1,
          contextLView: null,
          elementDepthCount: 0,
          currentNamespace: null,
          currentDirectiveIndex: -1,
          bindingRootIndex: -1,
          bindingIndex: -1,
          currentQueryIndex: 0,
          parent: e,
          child: null,
          inI18n: !1,
        };
        return null !== e && (e.child = t), t;
      }
      function hf() {
        const e = L.lFrame;
        return (
          (L.lFrame = e.parent), (e.currentTNode = null), (e.lView = null), e
        );
      }
      const pf = hf;
      function Wa() {
        const e = hf();
        (e.isParent = !0),
          (e.tView = null),
          (e.selectedIndex = -1),
          (e.contextLView = null),
          (e.elementDepthCount = 0),
          (e.currentDirectiveIndex = -1),
          (e.currentNamespace = null),
          (e.bindingRootIndex = -1),
          (e.bindingIndex = -1),
          (e.currentQueryIndex = 0);
      }
      function Be() {
        return L.lFrame.selectedIndex;
      }
      function Pn(e) {
        L.lFrame.selectedIndex = e;
      }
      function Ti(e, t) {
        for (let n = t.directiveStart, r = t.directiveEnd; n < r; n++) {
          const i = e.data[n].type.prototype,
            {
              ngAfterContentInit: s,
              ngAfterContentChecked: a,
              ngAfterViewInit: u,
              ngAfterViewChecked: l,
              ngOnDestroy: c,
            } = i;
          s && (e.contentHooks ?? (e.contentHooks = [])).push(-n, s),
            a &&
              ((e.contentHooks ?? (e.contentHooks = [])).push(n, a),
              (e.contentCheckHooks ?? (e.contentCheckHooks = [])).push(n, a)),
            u && (e.viewHooks ?? (e.viewHooks = [])).push(-n, u),
            l &&
              ((e.viewHooks ?? (e.viewHooks = [])).push(n, l),
              (e.viewCheckHooks ?? (e.viewCheckHooks = [])).push(n, l)),
            null != c && (e.destroyHooks ?? (e.destroyHooks = [])).push(n, c);
        }
      }
      function Ai(e, t, n) {
        gf(e, t, 3, n);
      }
      function Ri(e, t, n, r) {
        (3 & e[B]) === n && gf(e, t, n, r);
      }
      function qa(e, t) {
        let n = e[B];
        (3 & n) === t && ((n &= 2047), (n += 1), (e[B] = n));
      }
      function gf(e, t, n, r) {
        const i = r ?? -1,
          s = t.length - 1;
        let a = 0;
        for (let u = void 0 !== r ? 65535 & e[tr] : 0; u < s; u++)
          if ("number" == typeof t[u + 1]) {
            if (((a = t[u]), null != r && a >= r)) break;
          } else
            t[u] < 0 && (e[tr] += 65536),
              (a < i || -1 == i) &&
                (NC(e, n, t, u), (e[tr] = (4294901760 & e[tr]) + u + 2)),
              u++;
      }
      function NC(e, t, n, r) {
        const o = n[r] < 0,
          i = n[r + 1],
          a = e[o ? -n[r] : n[r]];
        if (o) {
          if (e[B] >> 11 < e[tr] >> 16 && (3 & e[B]) === t) {
            (e[B] += 2048), ct(4, a, i);
            try {
              i.call(a);
            } finally {
              ct(5, a, i);
            }
          }
        } else {
          ct(4, a, i);
          try {
            i.call(a);
          } finally {
            ct(5, a, i);
          }
        }
      }
      const ir = -1;
      class ao {
        constructor(t, n, r) {
          (this.factory = t),
            (this.resolving = !1),
            (this.canSeeViewProviders = n),
            (this.injectImpl = r);
        }
      }
      function Ya(e, t, n) {
        let r = 0;
        for (; r < n.length; ) {
          const o = n[r];
          if ("number" == typeof o) {
            if (0 !== o) break;
            r++;
            const i = n[r++],
              s = n[r++],
              a = n[r++];
            e.setAttribute(t, s, a, i);
          } else {
            const i = o,
              s = n[++r];
            yf(i) ? e.setProperty(t, i, s) : e.setAttribute(t, i, s), r++;
          }
        }
        return r;
      }
      function mf(e) {
        return 3 === e || 4 === e || 6 === e;
      }
      function yf(e) {
        return 64 === e.charCodeAt(0);
      }
      function uo(e, t) {
        if (null !== t && 0 !== t.length)
          if (null === e || 0 === e.length) e = t.slice();
          else {
            let n = -1;
            for (let r = 0; r < t.length; r++) {
              const o = t[r];
              "number" == typeof o
                ? (n = o)
                : 0 === n ||
                  vf(e, n, o, null, -1 === n || 2 === n ? t[++r] : null);
            }
          }
        return e;
      }
      function vf(e, t, n, r, o) {
        let i = 0,
          s = e.length;
        if (-1 === t) s = -1;
        else
          for (; i < e.length; ) {
            const a = e[i++];
            if ("number" == typeof a) {
              if (a === t) {
                s = -1;
                break;
              }
              if (a > t) {
                s = i - 1;
                break;
              }
            }
          }
        for (; i < e.length; ) {
          const a = e[i];
          if ("number" == typeof a) break;
          if (a === n) {
            if (null === r) return void (null !== o && (e[i + 1] = o));
            if (r === e[i + 1]) return void (e[i + 2] = o);
          }
          i++, null !== r && i++, null !== o && i++;
        }
        -1 !== s && (e.splice(s, 0, t), (i = s + 1)),
          e.splice(i++, 0, n),
          null !== r && e.splice(i++, 0, r),
          null !== o && e.splice(i++, 0, o);
      }
      function Df(e) {
        return e !== ir;
      }
      function xi(e) {
        return 32767 & e;
      }
      function Pi(e, t) {
        let n = (function jC(e) {
            return e >> 16;
          })(e),
          r = t;
        for (; n > 0; ) (r = r[er]), n--;
        return r;
      }
      let Za = !0;
      function Oi(e) {
        const t = Za;
        return (Za = e), t;
      }
      const wf = 255,
        Cf = 5;
      let $C = 0;
      const Ft = {};
      function Ni(e, t) {
        const n = _f(e, t);
        if (-1 !== n) return n;
        const r = t[E];
        r.firstCreatePass &&
          ((e.injectorIndex = t.length),
          Ka(r.data, e),
          Ka(t, null),
          Ka(r.blueprint, null));
        const o = Ja(e, t),
          i = e.injectorIndex;
        if (Df(o)) {
          const s = xi(o),
            a = Pi(o, t),
            u = a[E].data;
          for (let l = 0; l < 8; l++) t[i + l] = a[s + l] | u[s + l];
        }
        return (t[i + 8] = o), i;
      }
      function Ka(e, t) {
        e.push(0, 0, 0, 0, 0, 0, 0, 0, t);
      }
      function _f(e, t) {
        return -1 === e.injectorIndex ||
          (e.parent && e.parent.injectorIndex === e.injectorIndex) ||
          null === t[e.injectorIndex + 8]
          ? -1
          : e.injectorIndex;
      }
      function Ja(e, t) {
        if (e.parent && -1 !== e.parent.injectorIndex)
          return e.parent.injectorIndex;
        let n = 0,
          r = null,
          o = t;
        for (; null !== o; ) {
          if (((r = Rf(o)), null === r)) return ir;
          if ((n++, (o = o[er]), -1 !== r.injectorIndex))
            return r.injectorIndex | (n << 16);
        }
        return ir;
      }
      function Xa(e, t, n) {
        !(function BC(e, t, n) {
          let r;
          "string" == typeof n
            ? (r = n.charCodeAt(0) || 0)
            : n.hasOwnProperty(to) && (r = n[to]),
            null == r && (r = n[to] = $C++);
          const o = r & wf;
          t.data[e + (o >> Cf)] |= 1 << o;
        })(e, t, n);
      }
      function Ef(e, t, n) {
        if (n & x.Optional || void 0 !== e) return e;
        pi();
      }
      function bf(e, t, n, r) {
        if (
          (n & x.Optional && void 0 === r && (r = null),
          !(n & (x.Self | x.Host)))
        ) {
          const o = e[Ci],
            i = lt(void 0);
          try {
            return o ? o.get(t, r, n & x.Optional) : kd(t, r, n & x.Optional);
          } finally {
            lt(i);
          }
        }
        return Ef(r, 0, n);
      }
      function If(e, t, n, r = x.Default, o) {
        if (null !== e) {
          if (1024 & t[B]) {
            const s = (function GC(e, t, n, r, o) {
              let i = e,
                s = t;
              for (
                ;
                null !== i && null !== s && 1024 & s[B] && !(256 & s[B]);

              ) {
                const a = Sf(i, s, n, r | x.Self, Ft);
                if (a !== Ft) return a;
                let u = i.parent;
                if (!u) {
                  const l = s[zd];
                  if (l) {
                    const c = l.get(n, Ft, r);
                    if (c !== Ft) return c;
                  }
                  (u = Rf(s)), (s = s[er]);
                }
                i = u;
              }
              return o;
            })(e, t, n, r, Ft);
            if (s !== Ft) return s;
          }
          const i = Sf(e, t, n, r, Ft);
          if (i !== Ft) return i;
        }
        return bf(t, n, r, o);
      }
      function Sf(e, t, n, r, o) {
        const i = (function HC(e) {
          if ("string" == typeof e) return e.charCodeAt(0) || 0;
          const t = e.hasOwnProperty(to) ? e[to] : void 0;
          return "number" == typeof t ? (t >= 0 ? t & wf : zC) : t;
        })(n);
        if ("function" == typeof i) {
          if (!cf(t, e, r)) return r & x.Host ? Ef(o, 0, r) : bf(t, n, r, o);
          try {
            const s = i(r);
            if (null != s || r & x.Optional) return s;
            pi();
          } finally {
            pf();
          }
        } else if ("number" == typeof i) {
          let s = null,
            a = _f(e, t),
            u = ir,
            l = r & x.Host ? t[Oe][Pe] : null;
          for (
            (-1 === a || r & x.SkipSelf) &&
            ((u = -1 === a ? Ja(e, t) : t[a + 8]),
            u !== ir && Tf(r, !1)
              ? ((s = t[E]), (a = xi(u)), (t = Pi(u, t)))
              : (a = -1));
            -1 !== a;

          ) {
            const c = t[E];
            if (Mf(i, a, c.data)) {
              const d = UC(a, t, n, s, r, l);
              if (d !== Ft) return d;
            }
            (u = t[a + 8]),
              u !== ir && Tf(r, t[E].data[a + 8] === l) && Mf(i, a, t)
                ? ((s = c), (a = xi(u)), (t = Pi(u, t)))
                : (a = -1);
          }
        }
        return o;
      }
      function UC(e, t, n, r, o, i) {
        const s = t[E],
          a = s.data[e + 8],
          c = (function Fi(e, t, n, r, o) {
            const i = e.providerIndexes,
              s = t.data,
              a = 1048575 & i,
              u = e.directiveStart,
              c = i >> 20,
              f = o ? a + c : e.directiveEnd;
            for (let h = r ? a : a + c; h < f; h++) {
              const p = s[h];
              if ((h < u && n === p) || (h >= u && p.type === n)) return h;
            }
            if (o) {
              const h = s[u];
              if (h && Dt(h) && h.type === n) return u;
            }
            return null;
          })(
            a,
            s,
            n,
            null == r ? io(a) && Za : r != s && 0 != (3 & a.type),
            o & x.Host && i === a
          );
        return null !== c ? On(t, s, c, a) : Ft;
      }
      function On(e, t, n, r) {
        let o = e[n];
        const i = t.data;
        if (
          (function FC(e) {
            return e instanceof ao;
          })(o)
        ) {
          const s = o;
          s.resolving &&
            (function Fw(e, t) {
              const n = t ? `. Dependency path: ${t.join(" > ")} > ${e}` : "";
              throw new w(
                -200,
                `Circular dependency in DI detected for ${e}${n}`
              );
            })(
              (function K(e) {
                return "function" == typeof e
                  ? e.name || e.toString()
                  : "object" == typeof e &&
                    null != e &&
                    "function" == typeof e.type
                  ? e.type.name || e.type.toString()
                  : k(e);
              })(i[n])
            );
          const a = Oi(s.canSeeViewProviders);
          s.resolving = !0;
          const u = s.injectImpl ? lt(s.injectImpl) : null;
          cf(e, r, x.Default);
          try {
            (o = e[n] = s.factory(void 0, i, e, r)),
              t.firstCreatePass &&
                n >= r.directiveStart &&
                (function OC(e, t, n) {
                  const {
                    ngOnChanges: r,
                    ngOnInit: o,
                    ngDoCheck: i,
                  } = t.type.prototype;
                  if (r) {
                    const s = Qd(t);
                    (n.preOrderHooks ?? (n.preOrderHooks = [])).push(e, s),
                      (
                        n.preOrderCheckHooks ?? (n.preOrderCheckHooks = [])
                      ).push(e, s);
                  }
                  o &&
                    (n.preOrderHooks ?? (n.preOrderHooks = [])).push(0 - e, o),
                    i &&
                      ((n.preOrderHooks ?? (n.preOrderHooks = [])).push(e, i),
                      (
                        n.preOrderCheckHooks ?? (n.preOrderCheckHooks = [])
                      ).push(e, i));
                })(n, i[n], t);
          } finally {
            null !== u && lt(u), Oi(a), (s.resolving = !1), pf();
          }
        }
        return o;
      }
      function Mf(e, t, n) {
        return !!(n[t + (e >> Cf)] & (1 << e));
      }
      function Tf(e, t) {
        return !(e & x.Self || (e & x.Host && t));
      }
      class sr {
        constructor(t, n) {
          (this._tNode = t), (this._lView = n);
        }
        get(t, n, r) {
          return If(this._tNode, this._lView, t, vi(r), n);
        }
      }
      function zC() {
        return new sr(Te(), v());
      }
      function eu(e) {
        return Ma(e)
          ? () => {
              const t = eu(R(e));
              return t && t();
            }
          : Rn(e);
      }
      function Rf(e) {
        const t = e[E],
          n = t.type;
        return 2 === n ? t.declTNode : 1 === n ? e[Pe] : null;
      }
      const ur = "__parameters__";
      function cr(e, t, n) {
        return Gt(() => {
          const r = (function tu(e) {
            return function (...n) {
              if (e) {
                const r = e(...n);
                for (const o in r) this[o] = r[o];
              }
            };
          })(t);
          function o(...i) {
            if (this instanceof o) return r.apply(this, i), this;
            const s = new o(...i);
            return (a.annotation = s), a;
            function a(u, l, c) {
              const d = u.hasOwnProperty(ur)
                ? u[ur]
                : Object.defineProperty(u, ur, { value: [] })[ur];
              for (; d.length <= c; ) d.push(null);
              return (d[c] = d[c] || []).push(s), u;
            }
          }
          return (
            n && (o.prototype = Object.create(n.prototype)),
            (o.prototype.ngMetadataName = e),
            (o.annotationCls = o),
            o
          );
        });
      }
      class O {
        constructor(t, n) {
          (this._desc = t),
            (this.ngMetadataName = "InjectionToken"),
            (this.ɵprov = void 0),
            "number" == typeof n
              ? (this.__NG_ELEMENT_ID__ = n)
              : void 0 !== n &&
                (this.ɵprov = M({
                  token: this,
                  providedIn: n.providedIn || "root",
                  factory: n.factory,
                }));
        }
        get multi() {
          return this;
        }
        toString() {
          return `InjectionToken ${this._desc}`;
        }
      }
      function Nn(e, t) {
        e.forEach((n) => (Array.isArray(n) ? Nn(n, t) : t(n)));
      }
      function Pf(e, t, n) {
        t >= e.length ? e.push(n) : e.splice(t, 0, n);
      }
      function Li(e, t) {
        return t >= e.length - 1 ? e.pop() : e.splice(t, 1)[0];
      }
      function rt(e, t, n) {
        let r = dr(e, t);
        return (
          r >= 0
            ? (e[1 | r] = n)
            : ((r = ~r),
              (function YC(e, t, n, r) {
                let o = e.length;
                if (o == t) e.push(n, r);
                else if (1 === o) e.push(r, e[0]), (e[0] = n);
                else {
                  for (o--, e.push(e[o - 1], e[o]); o > t; )
                    (e[o] = e[o - 2]), o--;
                  (e[t] = n), (e[t + 1] = r);
                }
              })(e, r, t, n)),
          r
        );
      }
      function ru(e, t) {
        const n = dr(e, t);
        if (n >= 0) return e[1 | n];
      }
      function dr(e, t) {
        return (function Of(e, t, n) {
          let r = 0,
            o = e.length >> n;
          for (; o !== r; ) {
            const i = r + ((o - r) >> 1),
              s = e[i << n];
            if (t === s) return i << n;
            s > t ? (o = i) : (r = i + 1);
          }
          return ~(o << n);
        })(e, t, 1);
      }
      const ho = eo(cr("Optional"), 8),
        po = eo(cr("SkipSelf"), 4);
      var Qe = (() => (
        ((Qe = Qe || {})[(Qe.Important = 1)] = "Important"),
        (Qe[(Qe.DashCase = 2)] = "DashCase"),
        Qe
      ))();
      const lu = new Map();
      let y_ = 0;
      const du = "__ngContext__";
      function Ne(e, t) {
        tt(t)
          ? ((e[du] = t[oo]),
            (function D_(e) {
              lu.set(e[oo], e);
            })(t))
          : (e[du] = t);
      }
      let fu;
      function hu(e, t) {
        return fu(e, t);
      }
      function vo(e) {
        const t = e[le];
        return vt(t) ? t[le] : t;
      }
      function pu(e) {
        return Xf(e[no]);
      }
      function gu(e) {
        return Xf(e[yt]);
      }
      function Xf(e) {
        for (; null !== e && !vt(e); ) e = e[yt];
        return e;
      }
      function hr(e, t, n, r, o) {
        if (null != r) {
          let i,
            s = !1;
          vt(r) ? (i = r) : tt(r) && ((s = !0), (r = r[Qt]));
          const a = Me(r);
          0 === e && null !== n
            ? null == o
              ? ih(t, n, a)
              : Fn(t, n, a, o || null, !0)
            : 1 === e && null !== n
            ? Fn(t, n, a, o || null, !0)
            : 2 === e
            ? (function _u(e, t, n) {
                const r = Vi(e, t);
                r &&
                  (function $_(e, t, n, r) {
                    e.removeChild(t, n, r);
                  })(e, r, t, n);
              })(t, a, s)
            : 3 === e && t.destroyNode(a),
            null != i &&
              (function U_(e, t, n, r, o) {
                const i = n[Ei];
                i !== Me(n) && hr(t, e, r, i, o);
                for (let a = je; a < n.length; a++) {
                  const u = n[a];
                  Do(u[E], u, e, t, r, i);
                }
              })(t, e, i, n, o);
        }
      }
      function yu(e, t, n) {
        return e.createElement(t, n);
      }
      function th(e, t) {
        const n = e[nr],
          r = n.indexOf(t),
          o = t[le];
        512 & t[B] && ((t[B] &= -513), $a(o, -1)), n.splice(r, 1);
      }
      function vu(e, t) {
        if (e.length <= je) return;
        const n = je + t,
          r = e[n];
        if (r) {
          const o = r[ro];
          null !== o && o !== e && th(o, r), t > 0 && (e[n - 1][yt] = r[yt]);
          const i = Li(e, je + t);
          !(function x_(e, t) {
            Do(e, t, t[U], 2, null, null), (t[Qt] = null), (t[Pe] = null);
          })(r[E], r);
          const s = i[Ot];
          null !== s && s.detachView(i[E]),
            (r[le] = null),
            (r[yt] = null),
            (r[B] &= -65);
        }
        return r;
      }
      function nh(e, t) {
        if (!(128 & t[B])) {
          const n = t[U];
          n.destroyNode && Do(e, t, n, 3, null, null),
            (function N_(e) {
              let t = e[no];
              if (!t) return Du(e[E], e);
              for (; t; ) {
                let n = null;
                if (tt(t)) n = t[no];
                else {
                  const r = t[je];
                  r && (n = r);
                }
                if (!n) {
                  for (; t && !t[yt] && t !== e; )
                    tt(t) && Du(t[E], t), (t = t[le]);
                  null === t && (t = e), tt(t) && Du(t[E], t), (n = t && t[yt]);
                }
                t = n;
              }
            })(t);
        }
      }
      function Du(e, t) {
        if (!(128 & t[B])) {
          (t[B] &= -65),
            (t[B] |= 128),
            (function j_(e, t) {
              let n;
              if (null != e && null != (n = e.destroyHooks))
                for (let r = 0; r < n.length; r += 2) {
                  const o = t[n[r]];
                  if (!(o instanceof ao)) {
                    const i = n[r + 1];
                    if (Array.isArray(i))
                      for (let s = 0; s < i.length; s += 2) {
                        const a = o[i[s]],
                          u = i[s + 1];
                        ct(4, a, u);
                        try {
                          u.call(a);
                        } finally {
                          ct(5, a, u);
                        }
                      }
                    else {
                      ct(4, o, i);
                      try {
                        i.call(o);
                      } finally {
                        ct(5, o, i);
                      }
                    }
                  }
                }
            })(e, t),
            (function L_(e, t) {
              const n = e.cleanup,
                r = t[Xn];
              let o = -1;
              if (null !== n)
                for (let i = 0; i < n.length - 1; i += 2)
                  if ("string" == typeof n[i]) {
                    const s = n[i + 3];
                    s >= 0 ? r[(o = s)]() : r[(o = -s)].unsubscribe(), (i += 2);
                  } else {
                    const s = r[(o = n[i + 1])];
                    n[i].call(s);
                  }
              if (null !== r) {
                for (let i = o + 1; i < r.length; i++) (0, r[i])();
                t[Xn] = null;
              }
            })(e, t),
            1 === t[E].type && t[U].destroy();
          const n = t[ro];
          if (null !== n && vt(t[le])) {
            n !== t[le] && th(n, t);
            const r = t[Ot];
            null !== r && r.detachView(e);
          }
          !(function w_(e) {
            lu.delete(e[oo]);
          })(t);
        }
      }
      function rh(e, t, n) {
        return (function oh(e, t, n) {
          let r = t;
          for (; null !== r && 40 & r.type; ) r = (t = r).parent;
          if (null === r) return n[Qt];
          {
            const { componentOffset: o } = r;
            if (o > -1) {
              const { encapsulation: i } = e.data[r.directiveStart + o];
              if (i === xt.None || i === xt.Emulated) return null;
            }
            return nt(r, n);
          }
        })(e, t.parent, n);
      }
      function Fn(e, t, n, r, o) {
        e.insertBefore(t, n, r, o);
      }
      function ih(e, t, n) {
        e.appendChild(t, n);
      }
      function sh(e, t, n, r, o) {
        null !== r ? Fn(e, t, n, r, o) : ih(e, t, n);
      }
      function Vi(e, t) {
        return e.parentNode(t);
      }
      let wu,
        Iu,
        lh = function uh(e, t, n) {
          return 40 & e.type ? nt(e, n) : null;
        };
      function Ui(e, t, n, r) {
        const o = rh(e, r, t),
          i = t[U],
          a = (function ah(e, t, n) {
            return lh(e, t, n);
          })(r.parent || t[Pe], r, t);
        if (null != o)
          if (Array.isArray(n))
            for (let u = 0; u < n.length; u++) sh(i, o, n[u], a, !1);
          else sh(i, o, n, a, !1);
        void 0 !== wu && wu(i, r, t, n, o);
      }
      function Hi(e, t) {
        if (null !== t) {
          const n = t.type;
          if (3 & n) return nt(t, e);
          if (4 & n) return Cu(-1, e[t.index]);
          if (8 & n) {
            const r = t.child;
            if (null !== r) return Hi(e, r);
            {
              const o = e[t.index];
              return vt(o) ? Cu(-1, o) : Me(o);
            }
          }
          if (32 & n) return hu(t, e)() || Me(e[t.index]);
          {
            const r = dh(e, t);
            return null !== r
              ? Array.isArray(r)
                ? r[0]
                : Hi(vo(e[Oe]), r)
              : Hi(e, t.next);
          }
        }
        return null;
      }
      function dh(e, t) {
        return null !== t ? e[Oe][Pe].projection[t.projection] : null;
      }
      function Cu(e, t) {
        const n = je + e + 1;
        if (n < t.length) {
          const r = t[n],
            o = r[E].firstChild;
          if (null !== o) return Hi(r, o);
        }
        return t[Ei];
      }
      function Eu(e, t, n, r, o, i, s) {
        for (; null != n; ) {
          const a = r[n.index],
            u = n.type;
          if (
            (s && 0 === t && (a && Ne(Me(a), r), (n.flags |= 2)),
            32 != (32 & n.flags))
          )
            if (8 & u) Eu(e, t, n.child, r, o, i, !1), hr(t, e, o, a, i);
            else if (32 & u) {
              const l = hu(n, r);
              let c;
              for (; (c = l()); ) hr(t, e, o, c, i);
              hr(t, e, o, a, i);
            } else 16 & u ? fh(e, t, r, n, o, i) : hr(t, e, o, a, i);
          n = s ? n.projectionNext : n.next;
        }
      }
      function Do(e, t, n, r, o, i) {
        Eu(n, r, e.firstChild, t, o, i, !1);
      }
      function fh(e, t, n, r, o, i) {
        const s = n[Oe],
          u = s[Pe].projection[r.projection];
        if (Array.isArray(u))
          for (let l = 0; l < u.length; l++) hr(t, e, o, u[l], i);
        else Eu(e, t, u, s[le], o, i, !0);
      }
      function hh(e, t, n) {
        "" === n
          ? e.removeAttribute(t, "class")
          : e.setAttribute(t, "class", n);
      }
      function ph(e, t, n) {
        const { mergedAttrs: r, classes: o, styles: i } = n;
        null !== r && Ya(e, t, r),
          null !== o && hh(e, t, o),
          null !== i &&
            (function z_(e, t, n) {
              e.setAttribute(t, "style", n);
            })(e, t, i);
      }
      class Dh {
        constructor(t) {
          this.changingThisBreaksApplicationSecurity = t;
        }
        toString() {
          return `SafeValue must use [property]=binding: ${this.changingThisBreaksApplicationSecurity} (see https://g.co/ng/security#xss)`;
        }
      }
      const qi = new O("ENVIRONMENT_INITIALIZER"),
        Ah = new O("INJECTOR", -1),
        Rh = new O("INJECTOR_DEF_TYPES");
      class xh {
        get(t, n = Jr) {
          if (n === Jr) {
            const r = new Error(`NullInjectorError: No provider for ${re(t)}!`);
            throw ((r.name = "NullInjectorError"), r);
          }
          return n;
        }
      }
      function yE(...e) {
        return { ɵproviders: Ph(0, e), ɵfromNgModule: !0 };
      }
      function Ph(e, ...t) {
        const n = [],
          r = new Set();
        let o;
        return (
          Nn(t, (i) => {
            const s = i;
            xu(s, n, [], r) && (o || (o = []), o.push(s));
          }),
          void 0 !== o && Oh(o, n),
          n
        );
      }
      function Oh(e, t) {
        for (let n = 0; n < e.length; n++) {
          const { providers: o } = e[n];
          Pu(o, (i) => {
            t.push(i);
          });
        }
      }
      function xu(e, t, n, r) {
        if (!(e = R(e))) return !1;
        let o = null,
          i = Nd(e);
        const s = !i && X(e);
        if (i || s) {
          if (s && !s.standalone) return !1;
          o = e;
        } else {
          const u = e.ngModule;
          if (((i = Nd(u)), !i)) return !1;
          o = u;
        }
        const a = r.has(o);
        if (s) {
          if (a) return !1;
          if ((r.add(o), s.dependencies)) {
            const u =
              "function" == typeof s.dependencies
                ? s.dependencies()
                : s.dependencies;
            for (const l of u) xu(l, t, n, r);
          }
        } else {
          if (!i) return !1;
          {
            if (null != i.imports && !a) {
              let l;
              r.add(o);
              try {
                Nn(i.imports, (c) => {
                  xu(c, t, n, r) && (l || (l = []), l.push(c));
                });
              } finally {
              }
              void 0 !== l && Oh(l, t);
            }
            if (!a) {
              const l = Rn(o) || (() => new o());
              t.push(
                { provide: o, useFactory: l, deps: Q },
                { provide: Rh, useValue: o, multi: !0 },
                { provide: qi, useValue: () => b(o), multi: !0 }
              );
            }
            const u = i.providers;
            null == u ||
              a ||
              Pu(u, (c) => {
                t.push(c);
              });
          }
        }
        return o !== e && void 0 !== e.providers;
      }
      function Pu(e, t) {
        for (let n of e)
          Ta(n) && (n = n.ɵproviders), Array.isArray(n) ? Pu(n, t) : t(n);
      }
      const vE = ee({ provide: String, useValue: ee });
      function Ou(e) {
        return null !== e && "object" == typeof e && vE in e;
      }
      function kn(e) {
        return "function" == typeof e;
      }
      const Nu = new O("Set Injector scope."),
        Qi = {},
        wE = {};
      let Fu;
      function Yi() {
        return void 0 === Fu && (Fu = new xh()), Fu;
      }
      class Jt {}
      class kh extends Jt {
        get destroyed() {
          return this._destroyed;
        }
        constructor(t, n, r, o) {
          super(),
            (this.parent = n),
            (this.source = r),
            (this.scopes = o),
            (this.records = new Map()),
            (this._ngOnDestroyHooks = new Set()),
            (this._onDestroyHooks = []),
            (this._destroyed = !1),
            Lu(t, (s) => this.processProvider(s)),
            this.records.set(Ah, gr(void 0, this)),
            o.has("environment") && this.records.set(Jt, gr(void 0, this));
          const i = this.records.get(Nu);
          null != i && "string" == typeof i.value && this.scopes.add(i.value),
            (this.injectorDefTypes = new Set(this.get(Rh.multi, Q, x.Self)));
        }
        destroy() {
          this.assertNotDestroyed(), (this._destroyed = !0);
          try {
            for (const t of this._ngOnDestroyHooks) t.ngOnDestroy();
            for (const t of this._onDestroyHooks) t();
          } finally {
            this.records.clear(),
              this._ngOnDestroyHooks.clear(),
              this.injectorDefTypes.clear(),
              (this._onDestroyHooks.length = 0);
          }
        }
        onDestroy(t) {
          this._onDestroyHooks.push(t);
        }
        runInContext(t) {
          this.assertNotDestroyed();
          const n = Kn(this),
            r = lt(void 0);
          try {
            return t();
          } finally {
            Kn(n), lt(r);
          }
        }
        get(t, n = Jr, r = x.Default) {
          this.assertNotDestroyed(), (r = vi(r));
          const o = Kn(this),
            i = lt(void 0);
          try {
            if (!(r & x.SkipSelf)) {
              let a = this.records.get(t);
              if (void 0 === a) {
                const u =
                  (function IE(e) {
                    return (
                      "function" == typeof e ||
                      ("object" == typeof e && e instanceof O)
                    );
                  })(t) && gi(t);
                (a = u && this.injectableDefInScope(u) ? gr(ku(t), Qi) : null),
                  this.records.set(t, a);
              }
              if (null != a) return this.hydrate(t, a);
            }
            return (r & x.Self ? Yi() : this.parent).get(
              t,
              (n = r & x.Optional && n === Jr ? null : n)
            );
          } catch (s) {
            if ("NullInjectorError" === s.name) {
              if (((s[yi] = s[yi] || []).unshift(re(t)), o)) throw s;
              return (function Yw(e, t, n, r) {
                const o = e[yi];
                throw (
                  (t[Ld] && o.unshift(t[Ld]),
                  (e.message = (function Zw(e, t, n, r = null) {
                    e =
                      e && "\n" === e.charAt(0) && e.charAt(1) == Ww
                        ? e.slice(2)
                        : e;
                    let o = re(t);
                    if (Array.isArray(t)) o = t.map(re).join(" -> ");
                    else if ("object" == typeof t) {
                      let i = [];
                      for (let s in t)
                        if (t.hasOwnProperty(s)) {
                          let a = t[s];
                          i.push(
                            s +
                              ":" +
                              ("string" == typeof a ? JSON.stringify(a) : re(a))
                          );
                        }
                      o = `{${i.join(", ")}}`;
                    }
                    return `${n}${r ? "(" + r + ")" : ""}[${o}]: ${e.replace(
                      Gw,
                      "\n  "
                    )}`;
                  })("\n" + e.message, o, n, r)),
                  (e[zw] = o),
                  (e[yi] = null),
                  e)
                );
              })(s, t, "R3InjectorError", this.source);
            }
            throw s;
          } finally {
            lt(i), Kn(o);
          }
        }
        resolveInjectorInitializers() {
          const t = Kn(this),
            n = lt(void 0);
          try {
            const r = this.get(qi.multi, Q, x.Self);
            for (const o of r) o();
          } finally {
            Kn(t), lt(n);
          }
        }
        toString() {
          const t = [],
            n = this.records;
          for (const r of n.keys()) t.push(re(r));
          return `R3Injector[${t.join(", ")}]`;
        }
        assertNotDestroyed() {
          if (this._destroyed) throw new w(205, !1);
        }
        processProvider(t) {
          let n = kn((t = R(t))) ? t : R(t && t.provide);
          const r = (function _E(e) {
            return Ou(e)
              ? gr(void 0, e.useValue)
              : gr(
                  (function Lh(e, t, n) {
                    let r;
                    if (kn(e)) {
                      const o = R(e);
                      return Rn(o) || ku(o);
                    }
                    if (Ou(e)) r = () => R(e.useValue);
                    else if (
                      (function Fh(e) {
                        return !(!e || !e.useFactory);
                      })(e)
                    )
                      r = () => e.useFactory(...Pa(e.deps || []));
                    else if (
                      (function Nh(e) {
                        return !(!e || !e.useExisting);
                      })(e)
                    )
                      r = () => b(R(e.useExisting));
                    else {
                      const o = R(e && (e.useClass || e.provide));
                      if (
                        !(function EE(e) {
                          return !!e.deps;
                        })(e)
                      )
                        return Rn(o) || ku(o);
                      r = () => new o(...Pa(e.deps));
                    }
                    return r;
                  })(e),
                  Qi
                );
          })(t);
          if (kn(t) || !0 !== t.multi) this.records.get(n);
          else {
            let o = this.records.get(n);
            o ||
              ((o = gr(void 0, Qi, !0)),
              (o.factory = () => Pa(o.multi)),
              this.records.set(n, o)),
              (n = t),
              o.multi.push(t);
          }
          this.records.set(n, r);
        }
        hydrate(t, n) {
          return (
            n.value === Qi && ((n.value = wE), (n.value = n.factory())),
            "object" == typeof n.value &&
              n.value &&
              (function bE(e) {
                return (
                  null !== e &&
                  "object" == typeof e &&
                  "function" == typeof e.ngOnDestroy
                );
              })(n.value) &&
              this._ngOnDestroyHooks.add(n.value),
            n.value
          );
        }
        injectableDefInScope(t) {
          if (!t.providedIn) return !1;
          const n = R(t.providedIn);
          return "string" == typeof n
            ? "any" === n || this.scopes.has(n)
            : this.injectorDefTypes.has(n);
        }
      }
      function ku(e) {
        const t = gi(e),
          n = null !== t ? t.factory : Rn(e);
        if (null !== n) return n;
        if (e instanceof O) throw new w(204, !1);
        if (e instanceof Function)
          return (function CE(e) {
            const t = e.length;
            if (t > 0)
              throw (
                ((function fo(e, t) {
                  const n = [];
                  for (let r = 0; r < e; r++) n.push(t);
                  return n;
                })(t, "?"),
                new w(204, !1))
              );
            const n = (function Vw(e) {
              return (e && (e[mi] || e[Fd])) || null;
            })(e);
            return null !== n ? () => n.factory(e) : () => new e();
          })(e);
        throw new w(204, !1);
      }
      function gr(e, t, n = !1) {
        return { factory: e, value: t, multi: n ? [] : void 0 };
      }
      function Lu(e, t) {
        for (const n of e)
          Array.isArray(n) ? Lu(n, t) : n && Ta(n) ? Lu(n.ɵproviders, t) : t(n);
      }
      class SE {}
      class jh {}
      class TE {
        resolveComponentFactory(t) {
          throw (function ME(e) {
            const t = Error(
              `No component factory found for ${re(
                e
              )}. Did you add it to @NgModule.entryComponents?`
            );
            return (t.ngComponent = e), t;
          })(t);
        }
      }
      let Eo = (() => {
        class e {}
        return (e.NULL = new TE()), e;
      })();
      function AE() {
        return mr(Te(), v());
      }
      function mr(e, t) {
        return new Xt(nt(e, t));
      }
      let Xt = (() => {
        class e {
          constructor(n) {
            this.nativeElement = n;
          }
        }
        return (e.__NG_ELEMENT_ID__ = AE), e;
      })();
      class Bh {}
      let Zi = (() => {
          class e {}
          return (
            (e.__NG_ELEMENT_ID__ = () =>
              (function xE() {
                const e = v(),
                  n = qe(Te().index, e);
                return (tt(n) ? n : e)[U];
              })()),
            e
          );
        })(),
        PE = (() => {
          class e {}
          return (
            (e.ɵprov = M({
              token: e,
              providedIn: "root",
              factory: () => null,
            })),
            e
          );
        })();
      class Ki {
        constructor(t) {
          (this.full = t),
            (this.major = t.split(".")[0]),
            (this.minor = t.split(".")[1]),
            (this.patch = t.split(".").slice(2).join("."));
        }
      }
      const OE = new Ki("15.2.9"),
        ju = {},
        $u = "ngOriginalError";
      function Bu(e) {
        return e[$u];
      }
      class yr {
        constructor() {
          this._console = console;
        }
        handleError(t) {
          const n = this._findOriginalError(t);
          this._console.error("ERROR", t),
            n && this._console.error("ORIGINAL ERROR", n);
        }
        _findOriginalError(t) {
          let n = t && Bu(t);
          for (; n && Bu(n); ) n = Bu(n);
          return n || null;
        }
      }
      function en(e) {
        return e instanceof Function ? e() : e;
      }
      function Uh(e, t, n) {
        let r = e.length;
        for (;;) {
          const o = e.indexOf(t, n);
          if (-1 === o) return o;
          if (0 === o || e.charCodeAt(o - 1) <= 32) {
            const i = t.length;
            if (o + i === r || e.charCodeAt(o + i) <= 32) return o;
          }
          n = o + 1;
        }
      }
      const Hh = "ng-template";
      function zE(e, t, n) {
        let r = 0,
          o = !0;
        for (; r < e.length; ) {
          let i = e[r++];
          if ("string" == typeof i && o) {
            const s = e[r++];
            if (n && "class" === i && -1 !== Uh(s.toLowerCase(), t, 0))
              return !0;
          } else {
            if (1 === i) {
              for (; r < e.length && "string" == typeof (i = e[r++]); )
                if (i.toLowerCase() === t) return !0;
              return !1;
            }
            "number" == typeof i && (o = !1);
          }
        }
        return !1;
      }
      function zh(e) {
        return 4 === e.type && e.value !== Hh;
      }
      function GE(e, t, n) {
        return t === (4 !== e.type || n ? e.value : Hh);
      }
      function WE(e, t, n) {
        let r = 4;
        const o = e.attrs || [],
          i = (function YE(e) {
            for (let t = 0; t < e.length; t++) if (mf(e[t])) return t;
            return e.length;
          })(o);
        let s = !1;
        for (let a = 0; a < t.length; a++) {
          const u = t[a];
          if ("number" != typeof u) {
            if (!s)
              if (4 & r) {
                if (
                  ((r = 2 | (1 & r)),
                  ("" !== u && !GE(e, u, n)) || ("" === u && 1 === t.length))
                ) {
                  if (wt(r)) return !1;
                  s = !0;
                }
              } else {
                const l = 8 & r ? u : t[++a];
                if (8 & r && null !== e.attrs) {
                  if (!zE(e.attrs, l, n)) {
                    if (wt(r)) return !1;
                    s = !0;
                  }
                  continue;
                }
                const d = qE(8 & r ? "class" : u, o, zh(e), n);
                if (-1 === d) {
                  if (wt(r)) return !1;
                  s = !0;
                  continue;
                }
                if ("" !== l) {
                  let f;
                  f = d > i ? "" : o[d + 1].toLowerCase();
                  const h = 8 & r ? f : null;
                  if ((h && -1 !== Uh(h, l, 0)) || (2 & r && l !== f)) {
                    if (wt(r)) return !1;
                    s = !0;
                  }
                }
              }
          } else {
            if (!s && !wt(r) && !wt(u)) return !1;
            if (s && wt(u)) continue;
            (s = !1), (r = u | (1 & r));
          }
        }
        return wt(r) || s;
      }
      function wt(e) {
        return 0 == (1 & e);
      }
      function qE(e, t, n, r) {
        if (null === t) return -1;
        let o = 0;
        if (r || !n) {
          let i = !1;
          for (; o < t.length; ) {
            const s = t[o];
            if (s === e) return o;
            if (3 === s || 6 === s) i = !0;
            else {
              if (1 === s || 2 === s) {
                let a = t[++o];
                for (; "string" == typeof a; ) a = t[++o];
                continue;
              }
              if (4 === s) break;
              if (0 === s) {
                o += 4;
                continue;
              }
            }
            o += i ? 1 : 2;
          }
          return -1;
        }
        return (function ZE(e, t) {
          let n = e.indexOf(4);
          if (n > -1)
            for (n++; n < e.length; ) {
              const r = e[n];
              if ("number" == typeof r) return -1;
              if (r === t) return n;
              n++;
            }
          return -1;
        })(t, e);
      }
      function Gh(e, t, n = !1) {
        for (let r = 0; r < t.length; r++) if (WE(e, t[r], n)) return !0;
        return !1;
      }
      function Wh(e, t) {
        return e ? ":not(" + t.trim() + ")" : t;
      }
      function JE(e) {
        let t = e[0],
          n = 1,
          r = 2,
          o = "",
          i = !1;
        for (; n < e.length; ) {
          let s = e[n];
          if ("string" == typeof s)
            if (2 & r) {
              const a = e[++n];
              o += "[" + s + (a.length > 0 ? '="' + a + '"' : "") + "]";
            } else 8 & r ? (o += "." + s) : 4 & r && (o += " " + s);
          else
            "" !== o && !wt(s) && ((t += Wh(i, o)), (o = "")),
              (r = s),
              (i = i || !wt(r));
          n++;
        }
        return "" !== o && (t += Wh(i, o)), t;
      }
      const j = {};
      function te(e) {
        qh(q(), v(), Be() + e, !1);
      }
      function qh(e, t, n, r) {
        if (!r)
          if (3 == (3 & t[B])) {
            const i = e.preOrderCheckHooks;
            null !== i && Ai(t, i, n);
          } else {
            const i = e.preOrderHooks;
            null !== i && Ri(t, i, 0, n);
          }
        Pn(n);
      }
      function Kh(e, t = null, n = null, r) {
        const o = Jh(e, t, n, r);
        return o.resolveInjectorInitializers(), o;
      }
      function Jh(e, t = null, n = null, r, o = new Set()) {
        const i = [n || Q, yE(e)];
        return (
          (r = r || ("object" == typeof e ? void 0 : re(e))),
          new kh(i, t || Yi(), r || null, o)
        );
      }
      let tn = (() => {
        class e {
          static create(n, r) {
            if (Array.isArray(n)) return Kh({ name: "" }, r, n, "");
            {
              const o = n.name ?? "";
              return Kh({ name: o }, n.parent, n.providers, o);
            }
          }
        }
        return (
          (e.THROW_IF_NOT_FOUND = Jr),
          (e.NULL = new xh()),
          (e.ɵprov = M({ token: e, providedIn: "any", factory: () => b(Ah) })),
          (e.__NG_ELEMENT_ID__ = -1),
          e
        );
      })();
      function I(e, t = x.Default) {
        const n = v();
        return null === n ? b(e, t) : If(Te(), n, R(e), t);
      }
      function sp(e, t) {
        const n = e.contentQueries;
        if (null !== n)
          for (let r = 0; r < n.length; r += 2) {
            const i = n[r + 1];
            if (-1 !== i) {
              const s = e.data[i];
              za(n[r]), s.contentQueries(2, t[i], i);
            }
          }
      }
      function Xi(e, t, n, r, o, i, s, a, u, l, c) {
        const d = t.blueprint.slice();
        return (
          (d[Qt] = o),
          (d[B] = 76 | r),
          (null !== c || (e && 1024 & e[B])) && (d[B] |= 1024),
          ef(d),
          (d[le] = d[er] = e),
          (d[fe] = n),
          (d[_i] = s || (e && e[_i])),
          (d[U] = a || (e && e[U])),
          (d[Fa] = u || (e && e[Fa]) || null),
          (d[Ci] = l || (e && e[Ci]) || null),
          (d[Pe] = i),
          (d[oo] = (function v_() {
            return y_++;
          })()),
          (d[zd] = c),
          (d[Oe] = 2 == t.type ? e[Oe] : d),
          d
        );
      }
      function wr(e, t, n, r, o) {
        let i = e.data[t];
        if (null === i)
          (i = (function Gu(e, t, n, r, o) {
            const i = rf(),
              s = Ba(),
              u = (e.data[t] = (function bb(e, t, n, r, o, i) {
                return {
                  type: n,
                  index: r,
                  insertBeforeIndex: null,
                  injectorIndex: t ? t.injectorIndex : -1,
                  directiveStart: -1,
                  directiveEnd: -1,
                  directiveStylingLast: -1,
                  componentOffset: -1,
                  propertyBindings: null,
                  flags: 0,
                  providerIndexes: 0,
                  value: o,
                  attrs: i,
                  mergedAttrs: null,
                  localNames: null,
                  initialInputs: void 0,
                  inputs: null,
                  outputs: null,
                  tView: null,
                  next: null,
                  prev: null,
                  projectionNext: null,
                  child: null,
                  parent: t,
                  projection: null,
                  styles: null,
                  stylesWithoutHost: null,
                  residualStyles: void 0,
                  classes: null,
                  classesWithoutHost: null,
                  residualClasses: void 0,
                  classBindings: 0,
                  styleBindings: 0,
                };
              })(0, s ? i : i && i.parent, n, t, r, o));
            return (
              null === e.firstChild && (e.firstChild = u),
              null !== i &&
                (s
                  ? null == i.child && null !== u.parent && (i.child = u)
                  : null === i.next && ((i.next = u), (u.prev = i))),
              u
            );
          })(e, t, n, r, o)),
            (function _C() {
              return L.lFrame.inI18n;
            })() && (i.flags |= 32);
        else if (64 & i.type) {
          (i.type = n), (i.value = r), (i.attrs = o);
          const s = (function so() {
            const e = L.lFrame,
              t = e.currentTNode;
            return e.isParent ? t : t.parent;
          })();
          i.injectorIndex = null === s ? -1 : s.injectorIndex;
        }
        return Nt(i, !0), i;
      }
      function bo(e, t, n, r) {
        if (0 === n) return -1;
        const o = t.length;
        for (let i = 0; i < n; i++)
          t.push(r), e.blueprint.push(r), e.data.push(null);
        return o;
      }
      function Wu(e, t, n) {
        Ga(t);
        try {
          const r = e.viewQuery;
          null !== r && tl(1, r, n);
          const o = e.template;
          null !== o && ap(e, t, o, 1, n),
            e.firstCreatePass && (e.firstCreatePass = !1),
            e.staticContentQueries && sp(e, t),
            e.staticViewQueries && tl(2, e.viewQuery, n);
          const i = e.components;
          null !== i &&
            (function Cb(e, t) {
              for (let n = 0; n < t.length; n++) zb(e, t[n]);
            })(t, i);
        } catch (r) {
          throw (
            (e.firstCreatePass &&
              ((e.incompleteFirstPass = !0), (e.firstCreatePass = !1)),
            r)
          );
        } finally {
          (t[B] &= -5), Wa();
        }
      }
      function es(e, t, n, r) {
        const o = t[B];
        if (128 != (128 & o)) {
          Ga(t);
          try {
            ef(t),
              (function af(e) {
                return (L.lFrame.bindingIndex = e);
              })(e.bindingStartIndex),
              null !== n && ap(e, t, n, 2, r);
            const s = 3 == (3 & o);
            if (s) {
              const l = e.preOrderCheckHooks;
              null !== l && Ai(t, l, null);
            } else {
              const l = e.preOrderHooks;
              null !== l && Ri(t, l, 0, null), qa(t, 0);
            }
            if (
              ((function Ub(e) {
                for (let t = pu(e); null !== t; t = gu(t)) {
                  if (!t[Gd]) continue;
                  const n = t[nr];
                  for (let r = 0; r < n.length; r++) {
                    const o = n[r];
                    512 & o[B] || $a(o[le], 1), (o[B] |= 512);
                  }
                }
              })(t),
              (function Vb(e) {
                for (let t = pu(e); null !== t; t = gu(t))
                  for (let n = je; n < t.length; n++) {
                    const r = t[n],
                      o = r[E];
                    Mi(r) && es(o, r, o.template, r[fe]);
                  }
              })(t),
              null !== e.contentQueries && sp(e, t),
              s)
            ) {
              const l = e.contentCheckHooks;
              null !== l && Ai(t, l);
            } else {
              const l = e.contentHooks;
              null !== l && Ri(t, l, 1), qa(t, 1);
            }
            !(function Db(e, t) {
              const n = e.hostBindingOpCodes;
              if (null !== n)
                try {
                  for (let r = 0; r < n.length; r++) {
                    const o = n[r];
                    if (o < 0) Pn(~o);
                    else {
                      const i = o,
                        s = n[++r],
                        a = n[++r];
                      EC(s, i), a(2, t[i]);
                    }
                  }
                } finally {
                  Pn(-1);
                }
            })(e, t);
            const a = e.components;
            null !== a &&
              (function wb(e, t) {
                for (let n = 0; n < t.length; n++) Hb(e, t[n]);
              })(t, a);
            const u = e.viewQuery;
            if ((null !== u && tl(2, u, r), s)) {
              const l = e.viewCheckHooks;
              null !== l && Ai(t, l);
            } else {
              const l = e.viewHooks;
              null !== l && Ri(t, l, 2), qa(t, 2);
            }
            !0 === e.firstUpdatePass && (e.firstUpdatePass = !1),
              (t[B] &= -41),
              512 & t[B] && ((t[B] &= -513), $a(t[le], -1));
          } finally {
            Wa();
          }
        }
      }
      function ap(e, t, n, r, o) {
        const i = Be(),
          s = 2 & r;
        try {
          Pn(-1),
            s && t.length > se && qh(e, t, se, !1),
            ct(s ? 2 : 0, o),
            n(r, o);
        } finally {
          Pn(i), ct(s ? 3 : 1, o);
        }
      }
      function qu(e, t, n) {
        if (La(t)) {
          const o = t.directiveEnd;
          for (let i = t.directiveStart; i < o; i++) {
            const s = e.data[i];
            s.contentQueries && s.contentQueries(1, n[i], i);
          }
        }
      }
      function Qu(e, t, n) {
        nf() &&
          ((function xb(e, t, n, r) {
            const o = n.directiveStart,
              i = n.directiveEnd;
            io(n) &&
              (function jb(e, t, n) {
                const r = nt(t, e),
                  o = up(n),
                  i = e[_i],
                  s = ts(
                    e,
                    Xi(
                      e,
                      o,
                      null,
                      n.onPush ? 32 : 16,
                      r,
                      t,
                      i,
                      i.createRenderer(r, n),
                      null,
                      null,
                      null
                    )
                  );
                e[t.index] = s;
              })(t, n, e.data[o + n.componentOffset]),
              e.firstCreatePass || Ni(n, t),
              Ne(r, t);
            const s = n.initialInputs;
            for (let a = o; a < i; a++) {
              const u = e.data[a],
                l = On(t, e, a, n);
              Ne(l, t),
                null !== s && $b(0, a - o, l, u, 0, s),
                Dt(u) && (qe(n.index, t)[fe] = On(t, e, a, n));
            }
          })(e, t, n, nt(n, t)),
          64 == (64 & n.flags) && hp(e, t, n));
      }
      function Yu(e, t, n = nt) {
        const r = t.localNames;
        if (null !== r) {
          let o = t.index + 1;
          for (let i = 0; i < r.length; i += 2) {
            const s = r[i + 1],
              a = -1 === s ? n(t, e) : e[s];
            e[o++] = a;
          }
        }
      }
      function up(e) {
        const t = e.tView;
        return null === t || t.incompleteFirstPass
          ? (e.tView = Zu(
              1,
              null,
              e.template,
              e.decls,
              e.vars,
              e.directiveDefs,
              e.pipeDefs,
              e.viewQuery,
              e.schemas,
              e.consts
            ))
          : t;
      }
      function Zu(e, t, n, r, o, i, s, a, u, l) {
        const c = se + r,
          d = c + o,
          f = (function _b(e, t) {
            const n = [];
            for (let r = 0; r < t; r++) n.push(r < e ? null : j);
            return n;
          })(c, d),
          h = "function" == typeof l ? l() : l;
        return (f[E] = {
          type: e,
          blueprint: f,
          template: n,
          queries: null,
          viewQuery: a,
          declTNode: t,
          data: f.slice().fill(null, c),
          bindingStartIndex: c,
          expandoStartIndex: d,
          hostBindingOpCodes: null,
          firstCreatePass: !0,
          firstUpdatePass: !0,
          staticViewQueries: !1,
          staticContentQueries: !1,
          preOrderHooks: null,
          preOrderCheckHooks: null,
          contentHooks: null,
          contentCheckHooks: null,
          viewHooks: null,
          viewCheckHooks: null,
          destroyHooks: null,
          cleanup: null,
          contentQueries: null,
          components: null,
          directiveRegistry: "function" == typeof i ? i() : i,
          pipeRegistry: "function" == typeof s ? s() : s,
          firstChild: null,
          schemas: u,
          consts: h,
          incompleteFirstPass: !1,
        });
      }
      function lp(e, t, n, r) {
        const o = (function gp(e) {
          return e[Xn] || (e[Xn] = []);
        })(t);
        null === n
          ? o.push(r)
          : (o.push(n),
            e.firstCreatePass &&
              (function mp(e) {
                return e.cleanup || (e.cleanup = []);
              })(e).push(r, o.length - 1));
      }
      function cp(e, t, n, r) {
        for (let o in e)
          if (e.hasOwnProperty(o)) {
            n = null === n ? {} : n;
            const i = e[o];
            null === r
              ? dp(n, t, o, i)
              : r.hasOwnProperty(o) && dp(n, t, r[o], i);
          }
        return n;
      }
      function dp(e, t, n, r) {
        e.hasOwnProperty(n) ? e[n].push(t, r) : (e[n] = [t, r]);
      }
      function Ku(e, t, n, r) {
        if (nf()) {
          const o = null === r ? null : { "": -1 },
            i = (function Ob(e, t) {
              const n = e.directiveRegistry;
              let r = null,
                o = null;
              if (n)
                for (let i = 0; i < n.length; i++) {
                  const s = n[i];
                  if (Gh(t, s.selectors, !1))
                    if ((r || (r = []), Dt(s)))
                      if (null !== s.findHostDirectiveDefs) {
                        const a = [];
                        (o = o || new Map()),
                          s.findHostDirectiveDefs(s, a, o),
                          r.unshift(...a, s),
                          Ju(e, t, a.length);
                      } else r.unshift(s), Ju(e, t, 0);
                    else
                      (o = o || new Map()),
                        s.findHostDirectiveDefs?.(s, r, o),
                        r.push(s);
                }
              return null === r ? null : [r, o];
            })(e, n);
          let s, a;
          null === i ? (s = a = null) : ([s, a] = i),
            null !== s && fp(e, t, n, s, o, a),
            o &&
              (function Nb(e, t, n) {
                if (t) {
                  const r = (e.localNames = []);
                  for (let o = 0; o < t.length; o += 2) {
                    const i = n[t[o + 1]];
                    if (null == i) throw new w(-301, !1);
                    r.push(t[o], i);
                  }
                }
              })(n, r, o);
        }
        n.mergedAttrs = uo(n.mergedAttrs, n.attrs);
      }
      function fp(e, t, n, r, o, i) {
        for (let l = 0; l < r.length; l++) Xa(Ni(n, t), e, r[l].type);
        !(function kb(e, t, n) {
          (e.flags |= 1),
            (e.directiveStart = t),
            (e.directiveEnd = t + n),
            (e.providerIndexes = t);
        })(n, e.data.length, r.length);
        for (let l = 0; l < r.length; l++) {
          const c = r[l];
          c.providersResolver && c.providersResolver(c);
        }
        let s = !1,
          a = !1,
          u = bo(e, t, r.length, null);
        for (let l = 0; l < r.length; l++) {
          const c = r[l];
          (n.mergedAttrs = uo(n.mergedAttrs, c.hostAttrs)),
            Lb(e, n, t, u, c),
            Fb(u, c, o),
            null !== c.contentQueries && (n.flags |= 4),
            (null !== c.hostBindings ||
              null !== c.hostAttrs ||
              0 !== c.hostVars) &&
              (n.flags |= 64);
          const d = c.type.prototype;
          !s &&
            (d.ngOnChanges || d.ngOnInit || d.ngDoCheck) &&
            ((e.preOrderHooks ?? (e.preOrderHooks = [])).push(n.index),
            (s = !0)),
            !a &&
              (d.ngOnChanges || d.ngDoCheck) &&
              ((e.preOrderCheckHooks ?? (e.preOrderCheckHooks = [])).push(
                n.index
              ),
              (a = !0)),
            u++;
        }
        !(function Ib(e, t, n) {
          const o = t.directiveEnd,
            i = e.data,
            s = t.attrs,
            a = [];
          let u = null,
            l = null;
          for (let c = t.directiveStart; c < o; c++) {
            const d = i[c],
              f = n ? n.get(d) : null,
              p = f ? f.outputs : null;
            (u = cp(d.inputs, c, u, f ? f.inputs : null)),
              (l = cp(d.outputs, c, l, p));
            const g = null === u || null === s || zh(t) ? null : Bb(u, c, s);
            a.push(g);
          }
          null !== u &&
            (u.hasOwnProperty("class") && (t.flags |= 8),
            u.hasOwnProperty("style") && (t.flags |= 16)),
            (t.initialInputs = a),
            (t.inputs = u),
            (t.outputs = l);
        })(e, n, i);
      }
      function hp(e, t, n) {
        const r = n.directiveStart,
          o = n.directiveEnd,
          i = n.index,
          s = (function bC() {
            return L.lFrame.currentDirectiveIndex;
          })();
        try {
          Pn(i);
          for (let a = r; a < o; a++) {
            const u = e.data[a],
              l = t[a];
            Ua(a),
              (null !== u.hostBindings ||
                0 !== u.hostVars ||
                null !== u.hostAttrs) &&
                Pb(u, l);
          }
        } finally {
          Pn(-1), Ua(s);
        }
      }
      function Pb(e, t) {
        null !== e.hostBindings && e.hostBindings(1, t);
      }
      function Ju(e, t, n) {
        (t.componentOffset = n),
          (e.components ?? (e.components = [])).push(t.index);
      }
      function Fb(e, t, n) {
        if (n) {
          if (t.exportAs)
            for (let r = 0; r < t.exportAs.length; r++) n[t.exportAs[r]] = e;
          Dt(t) && (n[""] = e);
        }
      }
      function Lb(e, t, n, r, o) {
        e.data[r] = o;
        const i = o.factory || (o.factory = Rn(o.type)),
          s = new ao(i, Dt(o), I);
        (e.blueprint[r] = s),
          (n[r] = s),
          (function Ab(e, t, n, r, o) {
            const i = o.hostBindings;
            if (i) {
              let s = e.hostBindingOpCodes;
              null === s && (s = e.hostBindingOpCodes = []);
              const a = ~t.index;
              (function Rb(e) {
                let t = e.length;
                for (; t > 0; ) {
                  const n = e[--t];
                  if ("number" == typeof n && n < 0) return n;
                }
                return 0;
              })(s) != a && s.push(a),
                s.push(n, r, i);
            }
          })(e, t, r, bo(e, n, o.hostVars, j), o);
      }
      function $b(e, t, n, r, o, i) {
        const s = i[t];
        if (null !== s) {
          const a = r.setInput;
          for (let u = 0; u < s.length; ) {
            const l = s[u++],
              c = s[u++],
              d = s[u++];
            null !== a ? r.setInput(n, d, l, c) : (n[c] = d);
          }
        }
      }
      function Bb(e, t, n) {
        let r = null,
          o = 0;
        for (; o < n.length; ) {
          const i = n[o];
          if (0 !== i)
            if (5 !== i) {
              if ("number" == typeof i) break;
              if (e.hasOwnProperty(i)) {
                null === r && (r = []);
                const s = e[i];
                for (let a = 0; a < s.length; a += 2)
                  if (s[a] === t) {
                    r.push(i, s[a + 1], n[o + 1]);
                    break;
                  }
              }
              o += 2;
            } else o += 2;
          else o += 4;
        }
        return r;
      }
      function pp(e, t, n, r) {
        return [e, !0, !1, t, null, 0, r, n, null, null];
      }
      function Hb(e, t) {
        const n = qe(t, e);
        if (Mi(n)) {
          const r = n[E];
          48 & n[B] ? es(r, n, r.template, n[fe]) : n[An] > 0 && el(n);
        }
      }
      function el(e) {
        for (let r = pu(e); null !== r; r = gu(r))
          for (let o = je; o < r.length; o++) {
            const i = r[o];
            if (Mi(i))
              if (512 & i[B]) {
                const s = i[E];
                es(s, i, s.template, i[fe]);
              } else i[An] > 0 && el(i);
          }
        const n = e[E].components;
        if (null !== n)
          for (let r = 0; r < n.length; r++) {
            const o = qe(n[r], e);
            Mi(o) && o[An] > 0 && el(o);
          }
      }
      function zb(e, t) {
        const n = qe(t, e),
          r = n[E];
        (function Gb(e, t) {
          for (let n = t.length; n < e.blueprint.length; n++)
            t.push(e.blueprint[n]);
        })(r, n),
          Wu(r, n, n[fe]);
      }
      function ts(e, t) {
        return e[no] ? (e[Hd][yt] = t) : (e[no] = t), (e[Hd] = t), t;
      }
      function ns(e) {
        for (; e; ) {
          e[B] |= 32;
          const t = vo(e);
          if (nC(e) && !t) return e;
          e = t;
        }
        return null;
      }
      function rs(e, t, n, r = !0) {
        const o = t[_i];
        o.begin && o.begin();
        try {
          es(e, t, e.template, n);
        } catch (s) {
          throw (
            (r &&
              (function vp(e, t) {
                const n = e[Ci],
                  r = n ? n.get(yr, null) : null;
                r && r.handleError(t);
              })(t, s),
            s)
          );
        } finally {
          o.end && o.end();
        }
      }
      function tl(e, t, n) {
        za(0), t(e, n);
      }
      function nl(e, t, n, r, o) {
        for (let i = 0; i < n.length; ) {
          const s = n[i++],
            a = n[i++],
            u = t[s],
            l = e.data[s];
          null !== l.setInput ? l.setInput(u, o, r, a) : (u[a] = o);
        }
      }
      function os(e, t, n) {
        let r = n ? e.styles : null,
          o = n ? e.classes : null,
          i = 0;
        if (null !== t)
          for (let s = 0; s < t.length; s++) {
            const a = t[s];
            "number" == typeof a
              ? (i = a)
              : 1 == i
              ? (o = Ia(o, a))
              : 2 == i && (r = Ia(r, a + ": " + t[++s] + ";"));
          }
        n ? (e.styles = r) : (e.stylesWithoutHost = r),
          n ? (e.classes = o) : (e.classesWithoutHost = o);
      }
      function is(e, t, n, r, o = !1) {
        for (; null !== n; ) {
          const i = t[n.index];
          if ((null !== i && r.push(Me(i)), vt(i)))
            for (let a = je; a < i.length; a++) {
              const u = i[a],
                l = u[E].firstChild;
              null !== l && is(u[E], u, l, r);
            }
          const s = n.type;
          if (8 & s) is(e, t, n.child, r);
          else if (32 & s) {
            const a = hu(n, t);
            let u;
            for (; (u = a()); ) r.push(u);
          } else if (16 & s) {
            const a = dh(t, n);
            if (Array.isArray(a)) r.push(...a);
            else {
              const u = vo(t[Oe]);
              is(u[E], u, a, r, !0);
            }
          }
          n = o ? n.projectionNext : n.next;
        }
        return r;
      }
      class Io {
        get rootNodes() {
          const t = this._lView,
            n = t[E];
          return is(n, t, n.firstChild, []);
        }
        constructor(t, n) {
          (this._lView = t),
            (this._cdRefInjectingView = n),
            (this._appRef = null),
            (this._attachedToViewContainer = !1);
        }
        get context() {
          return this._lView[fe];
        }
        set context(t) {
          this._lView[fe] = t;
        }
        get destroyed() {
          return 128 == (128 & this._lView[B]);
        }
        destroy() {
          if (this._appRef) this._appRef.detachView(this);
          else if (this._attachedToViewContainer) {
            const t = this._lView[le];
            if (vt(t)) {
              const n = t[bi],
                r = n ? n.indexOf(this) : -1;
              r > -1 && (vu(t, r), Li(n, r));
            }
            this._attachedToViewContainer = !1;
          }
          nh(this._lView[E], this._lView);
        }
        onDestroy(t) {
          lp(this._lView[E], this._lView, null, t);
        }
        markForCheck() {
          ns(this._cdRefInjectingView || this._lView);
        }
        detach() {
          this._lView[B] &= -65;
        }
        reattach() {
          this._lView[B] |= 64;
        }
        detectChanges() {
          rs(this._lView[E], this._lView, this.context);
        }
        checkNoChanges() {}
        attachToViewContainerRef() {
          if (this._appRef) throw new w(902, !1);
          this._attachedToViewContainer = !0;
        }
        detachFromAppRef() {
          (this._appRef = null),
            (function O_(e, t) {
              Do(e, t, t[U], 2, null, null);
            })(this._lView[E], this._lView);
        }
        attachToAppRef(t) {
          if (this._attachedToViewContainer) throw new w(902, !1);
          this._appRef = t;
        }
      }
      class Wb extends Io {
        constructor(t) {
          super(t), (this._view = t);
        }
        detectChanges() {
          const t = this._view;
          rs(t[E], t, t[fe], !1);
        }
        checkNoChanges() {}
        get context() {
          return null;
        }
      }
      class Dp extends Eo {
        constructor(t) {
          super(), (this.ngModule = t);
        }
        resolveComponentFactory(t) {
          const n = X(t);
          return new So(n, this.ngModule);
        }
      }
      function wp(e) {
        const t = [];
        for (let n in e)
          e.hasOwnProperty(n) && t.push({ propName: e[n], templateName: n });
        return t;
      }
      class Qb {
        constructor(t, n) {
          (this.injector = t), (this.parentInjector = n);
        }
        get(t, n, r) {
          r = vi(r);
          const o = this.injector.get(t, ju, r);
          return o !== ju || n === ju ? o : this.parentInjector.get(t, n, r);
        }
      }
      class So extends jh {
        get inputs() {
          return wp(this.componentDef.inputs);
        }
        get outputs() {
          return wp(this.componentDef.outputs);
        }
        constructor(t, n) {
          super(),
            (this.componentDef = t),
            (this.ngModule = n),
            (this.componentType = t.type),
            (this.selector = (function XE(e) {
              return e.map(JE).join(",");
            })(t.selectors)),
            (this.ngContentSelectors = t.ngContentSelectors
              ? t.ngContentSelectors
              : []),
            (this.isBoundToModule = !!n);
        }
        create(t, n, r, o) {
          let i = (o = o || this.ngModule) instanceof Jt ? o : o?.injector;
          i &&
            null !== this.componentDef.getStandaloneInjector &&
            (i = this.componentDef.getStandaloneInjector(i) || i);
          const s = i ? new Qb(t, i) : t,
            a = s.get(Bh, null);
          if (null === a) throw new w(407, !1);
          const u = s.get(PE, null),
            l = a.createRenderer(null, this.componentDef),
            c = this.componentDef.selectors[0][0] || "div",
            d = r
              ? (function Eb(e, t, n) {
                  return e.selectRootElement(t, n === xt.ShadowDom);
                })(l, r, this.componentDef.encapsulation)
              : yu(
                  l,
                  c,
                  (function qb(e) {
                    const t = e.toLowerCase();
                    return "svg" === t ? "svg" : "math" === t ? "math" : null;
                  })(c)
                ),
            f = this.componentDef.onPush ? 288 : 272,
            h = Zu(0, null, null, 1, 0, null, null, null, null, null),
            p = Xi(null, h, null, f, null, null, a, l, u, s, null);
          let g, y;
          Ga(p);
          try {
            const D = this.componentDef;
            let _,
              m = null;
            D.findHostDirectiveDefs
              ? ((_ = []),
                (m = new Map()),
                D.findHostDirectiveDefs(D, _, m),
                _.push(D))
              : (_ = [D]);
            const S = (function Zb(e, t) {
                const n = e[E],
                  r = se;
                return (e[r] = t), wr(n, r, 2, "#host", null);
              })(p, d),
              Z = (function Kb(e, t, n, r, o, i, s, a) {
                const u = o[E];
                !(function Jb(e, t, n, r) {
                  for (const o of e)
                    t.mergedAttrs = uo(t.mergedAttrs, o.hostAttrs);
                  null !== t.mergedAttrs &&
                    (os(t, t.mergedAttrs, !0), null !== n && ph(r, n, t));
                })(r, e, t, s);
                const l = i.createRenderer(t, n),
                  c = Xi(
                    o,
                    up(n),
                    null,
                    n.onPush ? 32 : 16,
                    o[e.index],
                    e,
                    i,
                    l,
                    a || null,
                    null,
                    null
                  );
                return (
                  u.firstCreatePass && Ju(u, e, r.length - 1),
                  ts(o, c),
                  (o[e.index] = c)
                );
              })(S, d, D, _, p, a, l);
            (y = Xd(h, se)),
              d &&
                (function e0(e, t, n, r) {
                  if (r) Ya(e, n, ["ng-version", OE.full]);
                  else {
                    const { attrs: o, classes: i } = (function eb(e) {
                      const t = [],
                        n = [];
                      let r = 1,
                        o = 2;
                      for (; r < e.length; ) {
                        let i = e[r];
                        if ("string" == typeof i)
                          2 === o
                            ? "" !== i && t.push(i, e[++r])
                            : 8 === o && n.push(i);
                        else {
                          if (!wt(o)) break;
                          o = i;
                        }
                        r++;
                      }
                      return { attrs: t, classes: n };
                    })(t.selectors[0]);
                    o && Ya(e, n, o),
                      i && i.length > 0 && hh(e, n, i.join(" "));
                  }
                })(l, D, d, r),
              void 0 !== n &&
                (function t0(e, t, n) {
                  const r = (e.projection = []);
                  for (let o = 0; o < t.length; o++) {
                    const i = n[o];
                    r.push(null != i ? Array.from(i) : null);
                  }
                })(y, this.ngContentSelectors, n),
              (g = (function Xb(e, t, n, r, o, i) {
                const s = Te(),
                  a = o[E],
                  u = nt(s, o);
                fp(a, o, s, n, null, r);
                for (let c = 0; c < n.length; c++)
                  Ne(On(o, a, s.directiveStart + c, s), o);
                hp(a, o, s), u && Ne(u, o);
                const l = On(o, a, s.directiveStart + s.componentOffset, s);
                if (((e[fe] = o[fe] = l), null !== i))
                  for (const c of i) c(l, t);
                return qu(a, s, e), l;
              })(Z, D, _, m, p, [n0])),
              Wu(h, p, null);
          } finally {
            Wa();
          }
          return new Yb(this.componentType, g, mr(y, p), p, y);
        }
      }
      class Yb extends SE {
        constructor(t, n, r, o, i) {
          super(),
            (this.location = r),
            (this._rootLView = o),
            (this._tNode = i),
            (this.instance = n),
            (this.hostView = this.changeDetectorRef = new Wb(o)),
            (this.componentType = t);
        }
        setInput(t, n) {
          const r = this._tNode.inputs;
          let o;
          if (null !== r && (o = r[t])) {
            const i = this._rootLView;
            nl(i[E], i, o, t, n), ns(qe(this._tNode.index, i));
          }
        }
        get injector() {
          return new sr(this._tNode, this._rootLView);
        }
        destroy() {
          this.hostView.destroy();
        }
        onDestroy(t) {
          this.hostView.onDestroy(t);
        }
      }
      function n0() {
        const e = Te();
        Ti(v()[E], e);
      }
      function ss(e) {
        return (
          !!ol(e) &&
          (Array.isArray(e) || (!(e instanceof Map) && Symbol.iterator in e))
        );
      }
      function ol(e) {
        return null !== e && ("function" == typeof e || "object" == typeof e);
      }
      function Fe(e, t, n) {
        return !Object.is(e[t], n) && ((e[t] = n), !0);
      }
      function jt(e, t, n, r, o, i, s, a) {
        const u = v(),
          l = q(),
          c = e + se,
          d = l.firstCreatePass
            ? (function y0(e, t, n, r, o, i, s, a, u) {
                const l = t.consts,
                  c = wr(t, e, 4, s || null, pn(l, a));
                Ku(t, n, c, pn(l, u)), Ti(t, c);
                const d = (c.tView = Zu(
                  2,
                  c,
                  r,
                  o,
                  i,
                  t.directiveRegistry,
                  t.pipeRegistry,
                  null,
                  t.schemas,
                  l
                ));
                return (
                  null !== t.queries &&
                    (t.queries.template(t, c),
                    (d.queries = t.queries.embeddedTView(c))),
                  c
                );
              })(c, l, u, t, n, r, o, i, s)
            : l.data[c];
        Nt(d, !1);
        const f = u[U].createComment("");
        Ui(l, u, f, d),
          Ne(f, u),
          ts(u, (u[c] = pp(f, u, f, d))),
          Ii(d) && Qu(l, u, d),
          null != s && Yu(u, d, a);
      }
      function ht(e, t, n) {
        const r = v();
        return (
          Fe(r, or(), t) &&
            (function ot(e, t, n, r, o, i, s, a) {
              const u = nt(t, n);
              let c,
                l = t.inputs;
              !a && null != l && (c = l[r])
                ? (nl(e, n, c, r, o),
                  io(t) &&
                    (function Mb(e, t) {
                      const n = qe(t, e);
                      16 & n[B] || (n[B] |= 32);
                    })(n, t.index))
                : 3 & t.type &&
                  ((r = (function Sb(e) {
                    return "class" === e
                      ? "className"
                      : "for" === e
                      ? "htmlFor"
                      : "formaction" === e
                      ? "formAction"
                      : "innerHtml" === e
                      ? "innerHTML"
                      : "readonly" === e
                      ? "readOnly"
                      : "tabindex" === e
                      ? "tabIndex"
                      : e;
                  })(r)),
                  (o = null != s ? s(o, t.value || "", r) : o),
                  i.setProperty(u, r, o));
            })(
              q(),
              (function ae() {
                const e = L.lFrame;
                return Xd(e.tView, e.selectedIndex);
              })(),
              r,
              e,
              t,
              r[U],
              n,
              !1
            ),
          ht
        );
      }
      function sl(e, t, n, r, o) {
        const s = o ? "class" : "style";
        nl(e, n, t.inputs[s], s, r);
      }
      function F(e, t, n, r) {
        const o = v(),
          i = q(),
          s = se + e,
          a = o[U],
          u = i.firstCreatePass
            ? (function w0(e, t, n, r, o, i) {
                const s = t.consts,
                  u = wr(t, e, 2, r, pn(s, o));
                return (
                  Ku(t, n, u, pn(s, i)),
                  null !== u.attrs && os(u, u.attrs, !1),
                  null !== u.mergedAttrs && os(u, u.mergedAttrs, !0),
                  null !== t.queries && t.queries.elementStart(t, u),
                  u
                );
              })(s, i, o, t, n, r)
            : i.data[s],
          l = (o[s] = yu(
            a,
            t,
            (function PC() {
              return L.lFrame.currentNamespace;
            })()
          )),
          c = Ii(u);
        return (
          Nt(u, !0),
          ph(a, l, u),
          32 != (32 & u.flags) && Ui(i, o, l, u),
          0 ===
            (function pC() {
              return L.lFrame.elementDepthCount;
            })() && Ne(l, o),
          (function gC() {
            L.lFrame.elementDepthCount++;
          })(),
          c && (Qu(i, o, u), qu(i, u, o)),
          null !== r && Yu(o, u),
          F
        );
      }
      function P() {
        let e = Te();
        Ba()
          ? (function Va() {
              L.lFrame.isParent = !1;
            })()
          : ((e = e.parent), Nt(e, !1));
        const t = e;
        !(function mC() {
          L.lFrame.elementDepthCount--;
        })();
        const n = q();
        return (
          n.firstCreatePass && (Ti(n, e), La(e) && n.queries.elementEnd(e)),
          null != t.classesWithoutHost &&
            (function kC(e) {
              return 0 != (8 & e.flags);
            })(t) &&
            sl(n, t, v(), t.classesWithoutHost, !0),
          null != t.stylesWithoutHost &&
            (function LC(e) {
              return 0 != (16 & e.flags);
            })(t) &&
            sl(n, t, v(), t.stylesWithoutHost, !1),
          P
        );
      }
      function Ve(e, t, n, r) {
        return F(e, t, n, r), P(), Ve;
      }
      function us(e) {
        return !!e && "function" == typeof e.then;
      }
      const Lp = function kp(e) {
        return !!e && "function" == typeof e.subscribe;
      };
      function ls(e, t) {
        return (e << 17) | (t << 2);
      }
      function mn(e) {
        return (e >> 17) & 32767;
      }
      function dl(e) {
        return 2 | e;
      }
      function jn(e) {
        return (131068 & e) >> 2;
      }
      function fl(e, t) {
        return (-131069 & e) | (t << 2);
      }
      function hl(e) {
        return 1 | e;
      }
      function Kp(e, t, n, r, o) {
        const i = e[n + 1],
          s = null === t;
        let a = r ? mn(i) : jn(i),
          u = !1;
        for (; 0 !== a && (!1 === u || s); ) {
          const c = e[a + 1];
          O0(e[a], t) && ((u = !0), (e[a + 1] = r ? hl(c) : dl(c))),
            (a = r ? mn(c) : jn(c));
        }
        u && (e[n + 1] = r ? dl(i) : hl(i));
      }
      function O0(e, t) {
        return (
          null === e ||
          null == t ||
          (Array.isArray(e) ? e[1] : e) === t ||
          (!(!Array.isArray(e) || "string" != typeof t) && dr(e, t) >= 0)
        );
      }
      function pl(e, t) {
        return (
          (function Ct(e, t, n, r) {
            const o = v(),
              i = q(),
              s = (function Zt(e) {
                const t = L.lFrame,
                  n = t.bindingIndex;
                return (t.bindingIndex = t.bindingIndex + e), n;
              })(2);
            i.firstUpdatePass &&
              (function sg(e, t, n, r) {
                const o = e.data;
                if (null === o[n + 1]) {
                  const i = o[Be()],
                    s = (function ig(e, t) {
                      return t >= e.expandoStartIndex;
                    })(e, n);
                  (function cg(e, t) {
                    return 0 != (e.flags & (t ? 8 : 16));
                  })(i, r) &&
                    null === t &&
                    !s &&
                    (t = !1),
                    (t = (function U0(e, t, n, r) {
                      const o = (function Ha(e) {
                        const t = L.lFrame.currentDirectiveIndex;
                        return -1 === t ? null : e[t];
                      })(e);
                      let i = r ? t.residualClasses : t.residualStyles;
                      if (null === o)
                        0 === (r ? t.classBindings : t.styleBindings) &&
                          ((n = To((n = gl(null, e, t, n, r)), t.attrs, r)),
                          (i = null));
                      else {
                        const s = t.directiveStylingLast;
                        if (-1 === s || e[s] !== o)
                          if (((n = gl(o, e, t, n, r)), null === i)) {
                            let u = (function H0(e, t, n) {
                              const r = n ? t.classBindings : t.styleBindings;
                              if (0 !== jn(r)) return e[mn(r)];
                            })(e, t, r);
                            void 0 !== u &&
                              Array.isArray(u) &&
                              ((u = gl(null, e, t, u[1], r)),
                              (u = To(u, t.attrs, r)),
                              (function z0(e, t, n, r) {
                                e[mn(n ? t.classBindings : t.styleBindings)] =
                                  r;
                              })(e, t, r, u));
                          } else
                            i = (function G0(e, t, n) {
                              let r;
                              const o = t.directiveEnd;
                              for (
                                let i = 1 + t.directiveStylingLast;
                                i < o;
                                i++
                              )
                                r = To(r, e[i].hostAttrs, n);
                              return To(r, t.attrs, n);
                            })(e, t, r);
                      }
                      return (
                        void 0 !== i &&
                          (r
                            ? (t.residualClasses = i)
                            : (t.residualStyles = i)),
                        n
                      );
                    })(o, i, t, r)),
                    (function x0(e, t, n, r, o, i) {
                      let s = i ? t.classBindings : t.styleBindings,
                        a = mn(s),
                        u = jn(s);
                      e[r] = n;
                      let c,
                        l = !1;
                      if (
                        (Array.isArray(n)
                          ? ((c = n[1]),
                            (null === c || dr(n, c) > 0) && (l = !0))
                          : (c = n),
                        o)
                      )
                        if (0 !== u) {
                          const f = mn(e[a + 1]);
                          (e[r + 1] = ls(f, a)),
                            0 !== f && (e[f + 1] = fl(e[f + 1], r)),
                            (e[a + 1] = (function A0(e, t) {
                              return (131071 & e) | (t << 17);
                            })(e[a + 1], r));
                        } else
                          (e[r + 1] = ls(a, 0)),
                            0 !== a && (e[a + 1] = fl(e[a + 1], r)),
                            (a = r);
                      else
                        (e[r + 1] = ls(u, 0)),
                          0 === a ? (a = r) : (e[u + 1] = fl(e[u + 1], r)),
                          (u = r);
                      l && (e[r + 1] = dl(e[r + 1])),
                        Kp(e, c, r, !0),
                        Kp(e, c, r, !1),
                        (function P0(e, t, n, r, o) {
                          const i = o ? e.residualClasses : e.residualStyles;
                          null != i &&
                            "string" == typeof t &&
                            dr(i, t) >= 0 &&
                            (n[r + 1] = hl(n[r + 1]));
                        })(t, c, e, r, i),
                        (s = ls(a, u)),
                        i ? (t.classBindings = s) : (t.styleBindings = s);
                    })(o, i, t, n, s, r);
                }
              })(i, e, s, r),
              t !== j &&
                Fe(o, s, t) &&
                (function ug(e, t, n, r, o, i, s, a) {
                  if (!(3 & t.type)) return;
                  const u = e.data,
                    l = u[a + 1],
                    c = (function R0(e) {
                      return 1 == (1 & e);
                    })(l)
                      ? lg(u, t, n, o, jn(l), s)
                      : void 0;
                  cs(c) ||
                    (cs(i) ||
                      ((function T0(e) {
                        return 2 == (2 & e);
                      })(l) &&
                        (i = lg(u, null, n, o, a, s))),
                    (function H_(e, t, n, r, o) {
                      if (t) o ? e.addClass(n, r) : e.removeClass(n, r);
                      else {
                        let i = -1 === r.indexOf("-") ? void 0 : Qe.DashCase;
                        null == o
                          ? e.removeStyle(n, r, i)
                          : ("string" == typeof o &&
                              o.endsWith("!important") &&
                              ((o = o.slice(0, -10)), (i |= Qe.Important)),
                            e.setStyle(n, r, o, i));
                      }
                    })(r, s, Si(Be(), n), o, i));
                })(
                  i,
                  i.data[Be()],
                  o,
                  o[U],
                  e,
                  (o[s + 1] = (function Y0(e, t) {
                    return (
                      null == e ||
                        "" === e ||
                        ("string" == typeof t
                          ? (e += t)
                          : "object" == typeof e &&
                            (e = re(
                              (function gn(e) {
                                return e instanceof Dh
                                  ? e.changingThisBreaksApplicationSecurity
                                  : e;
                              })(e)
                            ))),
                      e
                    );
                  })(t, n)),
                  r,
                  s
                );
          })(e, t, null, !0),
          pl
        );
      }
      function gl(e, t, n, r, o) {
        let i = null;
        const s = n.directiveEnd;
        let a = n.directiveStylingLast;
        for (
          -1 === a ? (a = n.directiveStart) : a++;
          a < s && ((i = t[a]), (r = To(r, i.hostAttrs, o)), i !== e);

        )
          a++;
        return null !== e && (n.directiveStylingLast = a), r;
      }
      function To(e, t, n) {
        const r = n ? 1 : 2;
        let o = -1;
        if (null !== t)
          for (let i = 0; i < t.length; i++) {
            const s = t[i];
            "number" == typeof s
              ? (o = s)
              : o === r &&
                (Array.isArray(e) || (e = void 0 === e ? [] : ["", e]),
                rt(e, s, !!n || t[++i]));
          }
        return void 0 === e ? null : e;
      }
      function lg(e, t, n, r, o, i) {
        const s = null === t;
        let a;
        for (; o > 0; ) {
          const u = e[o],
            l = Array.isArray(u),
            c = l ? u[1] : u,
            d = null === c;
          let f = n[o + 1];
          f === j && (f = d ? Q : void 0);
          let h = d ? ru(f, r) : c === r ? f : void 0;
          if ((l && !cs(h) && (h = ru(u, r)), cs(h) && ((a = h), s))) return a;
          const p = e[o + 1];
          o = s ? mn(p) : jn(p);
        }
        if (null !== t) {
          let u = i ? t.residualClasses : t.residualStyles;
          null != u && (a = ru(u, r));
        }
        return a;
      }
      function cs(e) {
        return void 0 !== e;
      }
      function Y(e, t = "") {
        const n = v(),
          r = q(),
          o = e + se,
          i = r.firstCreatePass ? wr(r, o, 1, t, null) : r.data[o],
          s = (n[o] = (function mu(e, t) {
            return e.createText(t);
          })(n[U], t));
        Ui(r, n, s, i), Nt(i, !1);
      }
      function ke(e) {
        return Ao("", e, ""), ke;
      }
      function Ao(e, t, n) {
        const r = v(),
          o = (function _r(e, t, n, r) {
            return Fe(e, or(), n) ? t + k(n) + r : j;
          })(r, e, t, n);
        return (
          o !== j &&
            (function nn(e, t, n) {
              const r = Si(t, e);
              !(function eh(e, t, n) {
                e.setValue(t, n);
              })(e[U], r, n);
            })(r, Be(), o),
          Ao
        );
      }
      const Pr = "en-US";
      let Pg = Pr;
      class Or {}
      class om {}
      class im extends Or {
        constructor(t, n) {
          super(),
            (this._parent = n),
            (this._bootstrapComponents = []),
            (this.destroyCbs = []),
            (this.componentFactoryResolver = new Dp(this));
          const r = et(t);
          (this._bootstrapComponents = en(r.bootstrap)),
            (this._r3Injector = Jh(
              t,
              n,
              [
                { provide: Or, useValue: this },
                { provide: Eo, useValue: this.componentFactoryResolver },
              ],
              re(t),
              new Set(["environment"])
            )),
            this._r3Injector.resolveInjectorInitializers(),
            (this.instance = this._r3Injector.get(t));
        }
        get injector() {
          return this._r3Injector;
        }
        destroy() {
          const t = this._r3Injector;
          !t.destroyed && t.destroy(),
            this.destroyCbs.forEach((n) => n()),
            (this.destroyCbs = null);
        }
        onDestroy(t) {
          this.destroyCbs.push(t);
        }
      }
      class _l extends om {
        constructor(t) {
          super(), (this.moduleType = t);
        }
        create(t) {
          return new im(this.moduleType, t);
        }
      }
      class mS extends Or {
        constructor(t, n, r) {
          super(),
            (this.componentFactoryResolver = new Dp(this)),
            (this.instance = null);
          const o = new kh(
            [
              ...t,
              { provide: Or, useValue: this },
              { provide: Eo, useValue: this.componentFactoryResolver },
            ],
            n || Yi(),
            r,
            new Set(["environment"])
          );
          (this.injector = o), o.resolveInjectorInitializers();
        }
        destroy() {
          this.injector.destroy();
        }
        onDestroy(t) {
          this.injector.onDestroy(t);
        }
      }
      function gs(e, t, n = null) {
        return new mS(e, t, n).injector;
      }
      let yS = (() => {
        class e {
          constructor(n) {
            (this._injector = n), (this.cachedInjectors = new Map());
          }
          getOrCreateStandaloneInjector(n) {
            if (!n.standalone) return null;
            if (!this.cachedInjectors.has(n.id)) {
              const r = Ph(0, n.type),
                o =
                  r.length > 0
                    ? gs([r], this._injector, `Standalone[${n.type.name}]`)
                    : null;
              this.cachedInjectors.set(n.id, o);
            }
            return this.cachedInjectors.get(n.id);
          }
          ngOnDestroy() {
            try {
              for (const n of this.cachedInjectors.values())
                null !== n && n.destroy();
            } finally {
              this.cachedInjectors.clear();
            }
          }
        }
        return (
          (e.ɵprov = M({
            token: e,
            providedIn: "environment",
            factory: () => new e(b(Jt)),
          })),
          e
        );
      })();
      function sm(e) {
        e.getStandaloneInjector = (t) =>
          t.get(yS).getOrCreateStandaloneInjector(e);
      }
      function hm(e, t, n, r) {
        return (function pm(e, t, n, r, o, i) {
          const s = t + n;
          return Fe(e, s, o)
            ? (function Lt(e, t, n) {
                return (e[t] = n);
              })(e, s + 1, i ? r.call(i, o) : r(o))
            : (function Fo(e, t) {
                const n = e[t];
                return n === j ? void 0 : n;
              })(e, s + 1);
        })(
          v(),
          (function $e() {
            const e = L.lFrame;
            let t = e.bindingRootIndex;
            return (
              -1 === t && (t = e.bindingRootIndex = e.tView.bindingStartIndex),
              t
            );
          })(),
          e,
          t,
          n,
          r
        );
      }
      function bl(e) {
        return (t) => {
          setTimeout(e, void 0, t);
        };
      }
      const He = class US extends Tt {
        constructor(t = !1) {
          super(), (this.__isAsync = t);
        }
        emit(t) {
          super.next(t);
        }
        subscribe(t, n, r) {
          let o = t,
            i = n || (() => null),
            s = r;
          if (t && "object" == typeof t) {
            const u = t;
            (o = u.next?.bind(u)),
              (i = u.error?.bind(u)),
              (s = u.complete?.bind(u));
          }
          this.__isAsync && ((i = bl(i)), o && (o = bl(o)), s && (s = bl(s)));
          const a = super.subscribe({ next: o, error: i, complete: s });
          return t instanceof Je && t.add(a), a;
        }
      };
      let rn = (() => {
        class e {}
        return (e.__NG_ELEMENT_ID__ = WS), e;
      })();
      const zS = rn,
        GS = class extends zS {
          constructor(t, n, r) {
            super(),
              (this._declarationLView = t),
              (this._declarationTContainer = n),
              (this.elementRef = r);
          }
          createEmbeddedView(t, n) {
            const r = this._declarationTContainer.tView,
              o = Xi(
                this._declarationLView,
                r,
                t,
                16,
                null,
                r.declTNode,
                null,
                null,
                null,
                null,
                n || null
              );
            o[ro] = this._declarationLView[this._declarationTContainer.index];
            const s = this._declarationLView[Ot];
            return (
              null !== s && (o[Ot] = s.createEmbeddedView(r)),
              Wu(r, o, t),
              new Io(o)
            );
          }
        };
      function WS() {
        return (function ms(e, t) {
          return 4 & e.type ? new GS(t, e, mr(e, t)) : null;
        })(Te(), v());
      }
      let Et = (() => {
        class e {}
        return (e.__NG_ELEMENT_ID__ = qS), e;
      })();
      function qS() {
        return (function Cm(e, t) {
          let n;
          const r = t[e.index];
          if (vt(r)) n = r;
          else {
            let o;
            if (8 & e.type) o = Me(r);
            else {
              const i = t[U];
              o = i.createComment("");
              const s = nt(e, t);
              Fn(
                i,
                Vi(i, s),
                o,
                (function B_(e, t) {
                  return e.nextSibling(t);
                })(i, s),
                !1
              );
            }
            (t[e.index] = n = pp(r, t, o, e)), ts(t, n);
          }
          return new Dm(n, e, t);
        })(Te(), v());
      }
      const QS = Et,
        Dm = class extends QS {
          constructor(t, n, r) {
            super(),
              (this._lContainer = t),
              (this._hostTNode = n),
              (this._hostLView = r);
          }
          get element() {
            return mr(this._hostTNode, this._hostLView);
          }
          get injector() {
            return new sr(this._hostTNode, this._hostLView);
          }
          get parentInjector() {
            const t = Ja(this._hostTNode, this._hostLView);
            if (Df(t)) {
              const n = Pi(t, this._hostLView),
                r = xi(t);
              return new sr(n[E].data[r + 8], n);
            }
            return new sr(null, this._hostLView);
          }
          clear() {
            for (; this.length > 0; ) this.remove(this.length - 1);
          }
          get(t) {
            const n = wm(this._lContainer);
            return (null !== n && n[t]) || null;
          }
          get length() {
            return this._lContainer.length - je;
          }
          createEmbeddedView(t, n, r) {
            let o, i;
            "number" == typeof r
              ? (o = r)
              : null != r && ((o = r.index), (i = r.injector));
            const s = t.createEmbeddedView(n || {}, i);
            return this.insert(s, o), s;
          }
          createComponent(t, n, r, o, i) {
            const s =
              t &&
              !(function co(e) {
                return "function" == typeof e;
              })(t);
            let a;
            if (s) a = n;
            else {
              const d = n || {};
              (a = d.index),
                (r = d.injector),
                (o = d.projectableNodes),
                (i = d.environmentInjector || d.ngModuleRef);
            }
            const u = s ? t : new So(X(t)),
              l = r || this.parentInjector;
            if (!i && null == u.ngModule) {
              const f = (s ? l : this.parentInjector).get(Jt, null);
              f && (i = f);
            }
            const c = u.create(l, o, void 0, i);
            return this.insert(c.hostView, a), c;
          }
          insert(t, n) {
            const r = t._lView,
              o = r[E];
            if (
              (function hC(e) {
                return vt(e[le]);
              })(r)
            ) {
              const c = this.indexOf(t);
              if (-1 !== c) this.detach(c);
              else {
                const d = r[le],
                  f = new Dm(d, d[Pe], d[le]);
                f.detach(f.indexOf(t));
              }
            }
            const i = this._adjustIndex(n),
              s = this._lContainer;
            !(function F_(e, t, n, r) {
              const o = je + r,
                i = n.length;
              r > 0 && (n[o - 1][yt] = t),
                r < i - je
                  ? ((t[yt] = n[o]), Pf(n, je + r, t))
                  : (n.push(t), (t[yt] = null)),
                (t[le] = n);
              const s = t[ro];
              null !== s &&
                n !== s &&
                (function k_(e, t) {
                  const n = e[nr];
                  t[Oe] !== t[le][le][Oe] && (e[Gd] = !0),
                    null === n ? (e[nr] = [t]) : n.push(t);
                })(s, t);
              const a = t[Ot];
              null !== a && a.insertView(e), (t[B] |= 64);
            })(o, r, s, i);
            const a = Cu(i, s),
              u = r[U],
              l = Vi(u, s[Ei]);
            return (
              null !== l &&
                (function P_(e, t, n, r, o, i) {
                  (r[Qt] = o), (r[Pe] = t), Do(e, r, n, 1, o, i);
                })(o, s[Pe], u, r, l, a),
              t.attachToViewContainerRef(),
              Pf(Sl(s), i, t),
              t
            );
          }
          move(t, n) {
            return this.insert(t, n);
          }
          indexOf(t) {
            const n = wm(this._lContainer);
            return null !== n ? n.indexOf(t) : -1;
          }
          remove(t) {
            const n = this._adjustIndex(t, -1),
              r = vu(this._lContainer, n);
            r && (Li(Sl(this._lContainer), n), nh(r[E], r));
          }
          detach(t) {
            const n = this._adjustIndex(t, -1),
              r = vu(this._lContainer, n);
            return r && null != Li(Sl(this._lContainer), n) ? new Io(r) : null;
          }
          _adjustIndex(t, n = 0) {
            return t ?? this.length + n;
          }
        };
      function wm(e) {
        return e[bi];
      }
      function Sl(e) {
        return e[bi] || (e[bi] = []);
      }
      function vs(...e) {}
      const Ds = new O("Application Initializer");
      let ws = (() => {
        class e {
          constructor(n) {
            (this.appInits = n),
              (this.resolve = vs),
              (this.reject = vs),
              (this.initialized = !1),
              (this.done = !1),
              (this.donePromise = new Promise((r, o) => {
                (this.resolve = r), (this.reject = o);
              }));
          }
          runInitializers() {
            if (this.initialized) return;
            const n = [],
              r = () => {
                (this.done = !0), this.resolve();
              };
            if (this.appInits)
              for (let o = 0; o < this.appInits.length; o++) {
                const i = this.appInits[o]();
                if (us(i)) n.push(i);
                else if (Lp(i)) {
                  const s = new Promise((a, u) => {
                    i.subscribe({ complete: a, error: u });
                  });
                  n.push(s);
                }
              }
            Promise.all(n)
              .then(() => {
                r();
              })
              .catch((o) => {
                this.reject(o);
              }),
              0 === n.length && r(),
              (this.initialized = !0);
          }
        }
        return (
          (e.ɵfac = function (n) {
            return new (n || e)(b(Ds, 8));
          }),
          (e.ɵprov = M({ token: e, factory: e.ɵfac, providedIn: "root" })),
          e
        );
      })();
      const jo = new O("AppId", {
        providedIn: "root",
        factory: function qm() {
          return `${Ll()}${Ll()}${Ll()}`;
        },
      });
      function Ll() {
        return String.fromCharCode(97 + Math.floor(25 * Math.random()));
      }
      const Qm = new O("Platform Initializer"),
        jl = new O("Platform ID", {
          providedIn: "platform",
          factory: () => "unknown",
        });
      let _M = (() => {
        class e {
          log(n) {
            console.log(n);
          }
          warn(n) {
            console.warn(n);
          }
        }
        return (
          (e.ɵfac = function (n) {
            return new (n || e)();
          }),
          (e.ɵprov = M({ token: e, factory: e.ɵfac, providedIn: "platform" })),
          e
        );
      })();
      const on = new O("LocaleId", {
        providedIn: "root",
        factory: () =>
          W(on, x.Optional | x.SkipSelf) ||
          (function EM() {
            return (typeof $localize < "u" && $localize.locale) || Pr;
          })(),
      });
      class IM {
        constructor(t, n) {
          (this.ngModuleFactory = t), (this.componentFactories = n);
        }
      }
      let Ym = (() => {
        class e {
          compileModuleSync(n) {
            return new _l(n);
          }
          compileModuleAsync(n) {
            return Promise.resolve(this.compileModuleSync(n));
          }
          compileModuleAndAllComponentsSync(n) {
            const r = this.compileModuleSync(n),
              i = en(et(n).declarations).reduce((s, a) => {
                const u = X(a);
                return u && s.push(new So(u)), s;
              }, []);
            return new IM(r, i);
          }
          compileModuleAndAllComponentsAsync(n) {
            return Promise.resolve(this.compileModuleAndAllComponentsSync(n));
          }
          clearCache() {}
          clearCacheFor(n) {}
          getModuleId(n) {}
        }
        return (
          (e.ɵfac = function (n) {
            return new (n || e)();
          }),
          (e.ɵprov = M({ token: e, factory: e.ɵfac, providedIn: "root" })),
          e
        );
      })();
      const TM = (() => Promise.resolve(0))();
      function $l(e) {
        typeof Zone > "u"
          ? TM.then(() => {
              e && e.apply(null, null);
            })
          : Zone.current.scheduleMicroTask("scheduleMicrotask", e);
      }
      class de {
        constructor({
          enableLongStackTrace: t = !1,
          shouldCoalesceEventChangeDetection: n = !1,
          shouldCoalesceRunChangeDetection: r = !1,
        }) {
          if (
            ((this.hasPendingMacrotasks = !1),
            (this.hasPendingMicrotasks = !1),
            (this.isStable = !0),
            (this.onUnstable = new He(!1)),
            (this.onMicrotaskEmpty = new He(!1)),
            (this.onStable = new He(!1)),
            (this.onError = new He(!1)),
            typeof Zone > "u")
          )
            throw new w(908, !1);
          Zone.assertZonePatched();
          const o = this;
          (o._nesting = 0),
            (o._outer = o._inner = Zone.current),
            Zone.TaskTrackingZoneSpec &&
              (o._inner = o._inner.fork(new Zone.TaskTrackingZoneSpec())),
            t &&
              Zone.longStackTraceZoneSpec &&
              (o._inner = o._inner.fork(Zone.longStackTraceZoneSpec)),
            (o.shouldCoalesceEventChangeDetection = !r && n),
            (o.shouldCoalesceRunChangeDetection = r),
            (o.lastRequestAnimationFrameId = -1),
            (o.nativeRequestAnimationFrame = (function AM() {
              let e = ie.requestAnimationFrame,
                t = ie.cancelAnimationFrame;
              if (typeof Zone < "u" && e && t) {
                const n = e[Zone.__symbol__("OriginalDelegate")];
                n && (e = n);
                const r = t[Zone.__symbol__("OriginalDelegate")];
                r && (t = r);
              }
              return {
                nativeRequestAnimationFrame: e,
                nativeCancelAnimationFrame: t,
              };
            })().nativeRequestAnimationFrame),
            (function PM(e) {
              const t = () => {
                !(function xM(e) {
                  e.isCheckStableRunning ||
                    -1 !== e.lastRequestAnimationFrameId ||
                    ((e.lastRequestAnimationFrameId =
                      e.nativeRequestAnimationFrame.call(ie, () => {
                        e.fakeTopEventTask ||
                          (e.fakeTopEventTask = Zone.root.scheduleEventTask(
                            "fakeTopEventTask",
                            () => {
                              (e.lastRequestAnimationFrameId = -1),
                                Vl(e),
                                (e.isCheckStableRunning = !0),
                                Bl(e),
                                (e.isCheckStableRunning = !1);
                            },
                            void 0,
                            () => {},
                            () => {}
                          )),
                          e.fakeTopEventTask.invoke();
                      })),
                    Vl(e));
                })(e);
              };
              e._inner = e._inner.fork({
                name: "angular",
                properties: { isAngularZone: !0 },
                onInvokeTask: (n, r, o, i, s, a) => {
                  try {
                    return Jm(e), n.invokeTask(o, i, s, a);
                  } finally {
                    ((e.shouldCoalesceEventChangeDetection &&
                      "eventTask" === i.type) ||
                      e.shouldCoalesceRunChangeDetection) &&
                      t(),
                      Xm(e);
                  }
                },
                onInvoke: (n, r, o, i, s, a, u) => {
                  try {
                    return Jm(e), n.invoke(o, i, s, a, u);
                  } finally {
                    e.shouldCoalesceRunChangeDetection && t(), Xm(e);
                  }
                },
                onHasTask: (n, r, o, i) => {
                  n.hasTask(o, i),
                    r === o &&
                      ("microTask" == i.change
                        ? ((e._hasPendingMicrotasks = i.microTask),
                          Vl(e),
                          Bl(e))
                        : "macroTask" == i.change &&
                          (e.hasPendingMacrotasks = i.macroTask));
                },
                onHandleError: (n, r, o, i) => (
                  n.handleError(o, i),
                  e.runOutsideAngular(() => e.onError.emit(i)),
                  !1
                ),
              });
            })(o);
        }
        static isInAngularZone() {
          return typeof Zone < "u" && !0 === Zone.current.get("isAngularZone");
        }
        static assertInAngularZone() {
          if (!de.isInAngularZone()) throw new w(909, !1);
        }
        static assertNotInAngularZone() {
          if (de.isInAngularZone()) throw new w(909, !1);
        }
        run(t, n, r) {
          return this._inner.run(t, n, r);
        }
        runTask(t, n, r, o) {
          const i = this._inner,
            s = i.scheduleEventTask("NgZoneEvent: " + o, t, RM, vs, vs);
          try {
            return i.runTask(s, n, r);
          } finally {
            i.cancelTask(s);
          }
        }
        runGuarded(t, n, r) {
          return this._inner.runGuarded(t, n, r);
        }
        runOutsideAngular(t) {
          return this._outer.run(t);
        }
      }
      const RM = {};
      function Bl(e) {
        if (0 == e._nesting && !e.hasPendingMicrotasks && !e.isStable)
          try {
            e._nesting++, e.onMicrotaskEmpty.emit(null);
          } finally {
            if ((e._nesting--, !e.hasPendingMicrotasks))
              try {
                e.runOutsideAngular(() => e.onStable.emit(null));
              } finally {
                e.isStable = !0;
              }
          }
      }
      function Vl(e) {
        e.hasPendingMicrotasks = !!(
          e._hasPendingMicrotasks ||
          ((e.shouldCoalesceEventChangeDetection ||
            e.shouldCoalesceRunChangeDetection) &&
            -1 !== e.lastRequestAnimationFrameId)
        );
      }
      function Jm(e) {
        e._nesting++,
          e.isStable && ((e.isStable = !1), e.onUnstable.emit(null));
      }
      function Xm(e) {
        e._nesting--, Bl(e);
      }
      class OM {
        constructor() {
          (this.hasPendingMicrotasks = !1),
            (this.hasPendingMacrotasks = !1),
            (this.isStable = !0),
            (this.onUnstable = new He()),
            (this.onMicrotaskEmpty = new He()),
            (this.onStable = new He()),
            (this.onError = new He());
        }
        run(t, n, r) {
          return t.apply(n, r);
        }
        runGuarded(t, n, r) {
          return t.apply(n, r);
        }
        runOutsideAngular(t) {
          return t();
        }
        runTask(t, n, r, o) {
          return t.apply(n, r);
        }
      }
      const ey = new O(""),
        Cs = new O("");
      let zl,
        Ul = (() => {
          class e {
            constructor(n, r, o) {
              (this._ngZone = n),
                (this.registry = r),
                (this._pendingCount = 0),
                (this._isZoneStable = !0),
                (this._didWork = !1),
                (this._callbacks = []),
                (this.taskTrackingZone = null),
                zl ||
                  ((function NM(e) {
                    zl = e;
                  })(o),
                  o.addToWindow(r)),
                this._watchAngularEvents(),
                n.run(() => {
                  this.taskTrackingZone =
                    typeof Zone > "u"
                      ? null
                      : Zone.current.get("TaskTrackingZone");
                });
            }
            _watchAngularEvents() {
              this._ngZone.onUnstable.subscribe({
                next: () => {
                  (this._didWork = !0), (this._isZoneStable = !1);
                },
              }),
                this._ngZone.runOutsideAngular(() => {
                  this._ngZone.onStable.subscribe({
                    next: () => {
                      de.assertNotInAngularZone(),
                        $l(() => {
                          (this._isZoneStable = !0),
                            this._runCallbacksIfReady();
                        });
                    },
                  });
                });
            }
            increasePendingRequestCount() {
              return (
                (this._pendingCount += 1),
                (this._didWork = !0),
                this._pendingCount
              );
            }
            decreasePendingRequestCount() {
              if (((this._pendingCount -= 1), this._pendingCount < 0))
                throw new Error("pending async requests below zero");
              return this._runCallbacksIfReady(), this._pendingCount;
            }
            isStable() {
              return (
                this._isZoneStable &&
                0 === this._pendingCount &&
                !this._ngZone.hasPendingMacrotasks
              );
            }
            _runCallbacksIfReady() {
              if (this.isStable())
                $l(() => {
                  for (; 0 !== this._callbacks.length; ) {
                    let n = this._callbacks.pop();
                    clearTimeout(n.timeoutId), n.doneCb(this._didWork);
                  }
                  this._didWork = !1;
                });
              else {
                let n = this.getPendingTasks();
                (this._callbacks = this._callbacks.filter(
                  (r) =>
                    !r.updateCb ||
                    !r.updateCb(n) ||
                    (clearTimeout(r.timeoutId), !1)
                )),
                  (this._didWork = !0);
              }
            }
            getPendingTasks() {
              return this.taskTrackingZone
                ? this.taskTrackingZone.macroTasks.map((n) => ({
                    source: n.source,
                    creationLocation: n.creationLocation,
                    data: n.data,
                  }))
                : [];
            }
            addCallback(n, r, o) {
              let i = -1;
              r &&
                r > 0 &&
                (i = setTimeout(() => {
                  (this._callbacks = this._callbacks.filter(
                    (s) => s.timeoutId !== i
                  )),
                    n(this._didWork, this.getPendingTasks());
                }, r)),
                this._callbacks.push({ doneCb: n, timeoutId: i, updateCb: o });
            }
            whenStable(n, r, o) {
              if (o && !this.taskTrackingZone)
                throw new Error(
                  'Task tracking zone is required when passing an update callback to whenStable(). Is "zone.js/plugins/task-tracking" loaded?'
                );
              this.addCallback(n, r, o), this._runCallbacksIfReady();
            }
            getPendingRequestCount() {
              return this._pendingCount;
            }
            registerApplication(n) {
              this.registry.registerApplication(n, this);
            }
            unregisterApplication(n) {
              this.registry.unregisterApplication(n);
            }
            findProviders(n, r, o) {
              return [];
            }
          }
          return (
            (e.ɵfac = function (n) {
              return new (n || e)(b(de), b(Hl), b(Cs));
            }),
            (e.ɵprov = M({ token: e, factory: e.ɵfac })),
            e
          );
        })(),
        Hl = (() => {
          class e {
            constructor() {
              this._applications = new Map();
            }
            registerApplication(n, r) {
              this._applications.set(n, r);
            }
            unregisterApplication(n) {
              this._applications.delete(n);
            }
            unregisterAllApplications() {
              this._applications.clear();
            }
            getTestability(n) {
              return this._applications.get(n) || null;
            }
            getAllTestabilities() {
              return Array.from(this._applications.values());
            }
            getAllRootElements() {
              return Array.from(this._applications.keys());
            }
            findTestabilityInTree(n, r = !0) {
              return zl?.findTestabilityInTree(this, n, r) ?? null;
            }
          }
          return (
            (e.ɵfac = function (n) {
              return new (n || e)();
            }),
            (e.ɵprov = M({
              token: e,
              factory: e.ɵfac,
              providedIn: "platform",
            })),
            e
          );
        })();
      const sn = !1;
      let yn = null;
      const ty = new O("AllowMultipleToken"),
        Gl = new O("PlatformDestroyListeners"),
        ny = new O("appBootstrapListener");
      class ry {
        constructor(t, n) {
          (this.name = t), (this.token = n);
        }
      }
      function iy(e, t, n = []) {
        const r = `Platform: ${t}`,
          o = new O(r);
        return (i = []) => {
          let s = Wl();
          if (!s || s.injector.get(ty, !1)) {
            const a = [...n, ...i, { provide: o, useValue: !0 }];
            e
              ? e(a)
              : (function LM(e) {
                  if (yn && !yn.get(ty, !1)) throw new w(400, !1);
                  yn = e;
                  const t = e.get(ay);
                  (function oy(e) {
                    const t = e.get(Qm, null);
                    t && t.forEach((n) => n());
                  })(e);
                })(
                  (function sy(e = [], t) {
                    return tn.create({
                      name: t,
                      providers: [
                        { provide: Nu, useValue: "platform" },
                        { provide: Gl, useValue: new Set([() => (yn = null)]) },
                        ...e,
                      ],
                    });
                  })(a, r)
                );
          }
          return (function $M(e) {
            const t = Wl();
            if (!t) throw new w(401, !1);
            return t;
          })();
        };
      }
      function Wl() {
        return yn?.get(ay) ?? null;
      }
      let ay = (() => {
        class e {
          constructor(n) {
            (this._injector = n),
              (this._modules = []),
              (this._destroyListeners = []),
              (this._destroyed = !1);
          }
          bootstrapModuleFactory(n, r) {
            const o = (function ly(e, t) {
                let n;
                return (
                  (n =
                    "noop" === e
                      ? new OM()
                      : ("zone.js" === e ? void 0 : e) || new de(t)),
                  n
                );
              })(
                r?.ngZone,
                (function uy(e) {
                  return {
                    enableLongStackTrace: !1,
                    shouldCoalesceEventChangeDetection:
                      !(!e || !e.ngZoneEventCoalescing) || !1,
                    shouldCoalesceRunChangeDetection:
                      !(!e || !e.ngZoneRunCoalescing) || !1,
                  };
                })(r)
              ),
              i = [{ provide: de, useValue: o }];
            return o.run(() => {
              const s = tn.create({
                  providers: i,
                  parent: this.injector,
                  name: n.moduleType.name,
                }),
                a = n.create(s),
                u = a.injector.get(yr, null);
              if (!u) throw new w(402, !1);
              return (
                o.runOutsideAngular(() => {
                  const l = o.onError.subscribe({
                    next: (c) => {
                      u.handleError(c);
                    },
                  });
                  a.onDestroy(() => {
                    Es(this._modules, a), l.unsubscribe();
                  });
                }),
                (function cy(e, t, n) {
                  try {
                    const r = n();
                    return us(r)
                      ? r.catch((o) => {
                          throw (
                            (t.runOutsideAngular(() => e.handleError(o)), o)
                          );
                        })
                      : r;
                  } catch (r) {
                    throw (t.runOutsideAngular(() => e.handleError(r)), r);
                  }
                })(u, o, () => {
                  const l = a.injector.get(ws);
                  return (
                    l.runInitializers(),
                    l.donePromise.then(
                      () => (
                        (function Og(e) {
                          ut(e, "Expected localeId to be defined"),
                            "string" == typeof e &&
                              (Pg = e.toLowerCase().replace(/_/g, "-"));
                        })(a.injector.get(on, Pr) || Pr),
                        this._moduleDoBootstrap(a),
                        a
                      )
                    )
                  );
                })
              );
            });
          }
          bootstrapModule(n, r = []) {
            const o = dy({}, r);
            return (function FM(e, t, n) {
              const r = new _l(n);
              return Promise.resolve(r);
            })(0, 0, n).then((i) => this.bootstrapModuleFactory(i, o));
          }
          _moduleDoBootstrap(n) {
            const r = n.injector.get(_s);
            if (n._bootstrapComponents.length > 0)
              n._bootstrapComponents.forEach((o) => r.bootstrap(o));
            else {
              if (!n.instance.ngDoBootstrap) throw new w(-403, !1);
              n.instance.ngDoBootstrap(r);
            }
            this._modules.push(n);
          }
          onDestroy(n) {
            this._destroyListeners.push(n);
          }
          get injector() {
            return this._injector;
          }
          destroy() {
            if (this._destroyed) throw new w(404, !1);
            this._modules.slice().forEach((r) => r.destroy()),
              this._destroyListeners.forEach((r) => r());
            const n = this._injector.get(Gl, null);
            n && (n.forEach((r) => r()), n.clear()), (this._destroyed = !0);
          }
          get destroyed() {
            return this._destroyed;
          }
        }
        return (
          (e.ɵfac = function (n) {
            return new (n || e)(b(tn));
          }),
          (e.ɵprov = M({ token: e, factory: e.ɵfac, providedIn: "platform" })),
          e
        );
      })();
      function dy(e, t) {
        return Array.isArray(t) ? t.reduce(dy, e) : { ...e, ...t };
      }
      let _s = (() => {
        class e {
          get destroyed() {
            return this._destroyed;
          }
          get injector() {
            return this._injector;
          }
          constructor(n, r, o) {
            (this._zone = n),
              (this._injector = r),
              (this._exceptionHandler = o),
              (this._bootstrapListeners = []),
              (this._views = []),
              (this._runningTick = !1),
              (this._stable = !0),
              (this._destroyed = !1),
              (this._destroyListeners = []),
              (this.componentTypes = []),
              (this.components = []),
              (this._onMicrotaskEmptySubscription =
                this._zone.onMicrotaskEmpty.subscribe({
                  next: () => {
                    this._zone.run(() => {
                      this.tick();
                    });
                  },
                }));
            const i = new me((a) => {
                (this._stable =
                  this._zone.isStable &&
                  !this._zone.hasPendingMacrotasks &&
                  !this._zone.hasPendingMicrotasks),
                  this._zone.runOutsideAngular(() => {
                    a.next(this._stable), a.complete();
                  });
              }),
              s = new me((a) => {
                let u;
                this._zone.runOutsideAngular(() => {
                  u = this._zone.onStable.subscribe(() => {
                    de.assertNotInAngularZone(),
                      $l(() => {
                        !this._stable &&
                          !this._zone.hasPendingMacrotasks &&
                          !this._zone.hasPendingMicrotasks &&
                          ((this._stable = !0), a.next(!0));
                      });
                  });
                });
                const l = this._zone.onUnstable.subscribe(() => {
                  de.assertInAngularZone(),
                    this._stable &&
                      ((this._stable = !1),
                      this._zone.runOutsideAngular(() => {
                        a.next(!1);
                      }));
                });
                return () => {
                  u.unsubscribe(), l.unsubscribe();
                };
              });
            this.isStable = (function Pw(...e) {
              const t = Kr(e),
                n = (function Iw(e, t) {
                  return "number" == typeof _a(e) ? e.pop() : t;
                })(e, 1 / 0),
                r = e;
              return r.length
                ? 1 === r.length
                  ? at(r[0])
                  : Zn(n)(_e(r, t))
                : At;
            })(
              i,
              s.pipe(
                (function Ow(e = {}) {
                  const {
                    connector: t = () => new Tt(),
                    resetOnError: n = !0,
                    resetOnComplete: r = !0,
                    resetOnRefCountZero: o = !0,
                  } = e;
                  return (i) => {
                    let s,
                      a,
                      u,
                      l = 0,
                      c = !1,
                      d = !1;
                    const f = () => {
                        a?.unsubscribe(), (a = void 0);
                      },
                      h = () => {
                        f(), (s = u = void 0), (c = d = !1);
                      },
                      p = () => {
                        const g = s;
                        h(), g?.unsubscribe();
                      };
                    return ye((g, y) => {
                      l++, !d && !c && f();
                      const D = (u = u ?? t());
                      y.add(() => {
                        l--, 0 === l && !d && !c && (a = Ea(p, o));
                      }),
                        D.subscribe(y),
                        !s &&
                          l > 0 &&
                          ((s = new Zr({
                            next: (_) => D.next(_),
                            error: (_) => {
                              (d = !0), f(), (a = Ea(h, n, _)), D.error(_);
                            },
                            complete: () => {
                              (c = !0), f(), (a = Ea(h, r)), D.complete();
                            },
                          })),
                          at(g).subscribe(s));
                    })(i);
                  };
                })()
              )
            );
          }
          bootstrap(n, r) {
            const o = n instanceof jh;
            if (!this._injector.get(ws).done) {
              !o &&
                (function Jn(e) {
                  const t = X(e) || xe(e) || We(e);
                  return null !== t && t.standalone;
                })(n);
              throw new w(405, sn);
            }
            let s;
            (s = o ? n : this._injector.get(Eo).resolveComponentFactory(n)),
              this.componentTypes.push(s.componentType);
            const a = (function kM(e) {
                return e.isBoundToModule;
              })(s)
                ? void 0
                : this._injector.get(Or),
              l = s.create(tn.NULL, [], r || s.selector, a),
              c = l.location.nativeElement,
              d = l.injector.get(ey, null);
            return (
              d?.registerApplication(c),
              l.onDestroy(() => {
                this.detachView(l.hostView),
                  Es(this.components, l),
                  d?.unregisterApplication(c);
              }),
              this._loadComponent(l),
              l
            );
          }
          tick() {
            if (this._runningTick) throw new w(101, !1);
            try {
              this._runningTick = !0;
              for (let n of this._views) n.detectChanges();
            } catch (n) {
              this._zone.runOutsideAngular(() =>
                this._exceptionHandler.handleError(n)
              );
            } finally {
              this._runningTick = !1;
            }
          }
          attachView(n) {
            const r = n;
            this._views.push(r), r.attachToAppRef(this);
          }
          detachView(n) {
            const r = n;
            Es(this._views, r), r.detachFromAppRef();
          }
          _loadComponent(n) {
            this.attachView(n.hostView), this.tick(), this.components.push(n);
            const r = this._injector.get(ny, []);
            r.push(...this._bootstrapListeners), r.forEach((o) => o(n));
          }
          ngOnDestroy() {
            if (!this._destroyed)
              try {
                this._destroyListeners.forEach((n) => n()),
                  this._views.slice().forEach((n) => n.destroy()),
                  this._onMicrotaskEmptySubscription.unsubscribe();
              } finally {
                (this._destroyed = !0),
                  (this._views = []),
                  (this._bootstrapListeners = []),
                  (this._destroyListeners = []);
              }
          }
          onDestroy(n) {
            return (
              this._destroyListeners.push(n),
              () => Es(this._destroyListeners, n)
            );
          }
          destroy() {
            if (this._destroyed) throw new w(406, !1);
            const n = this._injector;
            n.destroy && !n.destroyed && n.destroy();
          }
          get viewCount() {
            return this._views.length;
          }
          warnIfDestroyed() {}
        }
        return (
          (e.ɵfac = function (n) {
            return new (n || e)(b(de), b(Jt), b(yr));
          }),
          (e.ɵprov = M({ token: e, factory: e.ɵfac, providedIn: "root" })),
          e
        );
      })();
      function Es(e, t) {
        const n = e.indexOf(t);
        n > -1 && e.splice(n, 1);
      }
      let ql = (() => {
        class e {}
        return (e.__NG_ELEMENT_ID__ = VM), e;
      })();
      function VM(e) {
        return (function UM(e, t, n) {
          if (io(e) && !n) {
            const r = qe(e.index, t);
            return new Io(r, r);
          }
          return 47 & e.type ? new Io(t[Oe], t) : null;
        })(Te(), v(), 16 == (16 & e));
      }
      class my {
        constructor() {}
        supports(t) {
          return ss(t);
        }
        create(t) {
          return new QM(t);
        }
      }
      const qM = (e, t) => t;
      class QM {
        constructor(t) {
          (this.length = 0),
            (this._linkedRecords = null),
            (this._unlinkedRecords = null),
            (this._previousItHead = null),
            (this._itHead = null),
            (this._itTail = null),
            (this._additionsHead = null),
            (this._additionsTail = null),
            (this._movesHead = null),
            (this._movesTail = null),
            (this._removalsHead = null),
            (this._removalsTail = null),
            (this._identityChangesHead = null),
            (this._identityChangesTail = null),
            (this._trackByFn = t || qM);
        }
        forEachItem(t) {
          let n;
          for (n = this._itHead; null !== n; n = n._next) t(n);
        }
        forEachOperation(t) {
          let n = this._itHead,
            r = this._removalsHead,
            o = 0,
            i = null;
          for (; n || r; ) {
            const s = !r || (n && n.currentIndex < vy(r, o, i)) ? n : r,
              a = vy(s, o, i),
              u = s.currentIndex;
            if (s === r) o--, (r = r._nextRemoved);
            else if (((n = n._next), null == s.previousIndex)) o++;
            else {
              i || (i = []);
              const l = a - o,
                c = u - o;
              if (l != c) {
                for (let f = 0; f < l; f++) {
                  const h = f < i.length ? i[f] : (i[f] = 0),
                    p = h + f;
                  c <= p && p < l && (i[f] = h + 1);
                }
                i[s.previousIndex] = c - l;
              }
            }
            a !== u && t(s, a, u);
          }
        }
        forEachPreviousItem(t) {
          let n;
          for (n = this._previousItHead; null !== n; n = n._nextPrevious) t(n);
        }
        forEachAddedItem(t) {
          let n;
          for (n = this._additionsHead; null !== n; n = n._nextAdded) t(n);
        }
        forEachMovedItem(t) {
          let n;
          for (n = this._movesHead; null !== n; n = n._nextMoved) t(n);
        }
        forEachRemovedItem(t) {
          let n;
          for (n = this._removalsHead; null !== n; n = n._nextRemoved) t(n);
        }
        forEachIdentityChange(t) {
          let n;
          for (
            n = this._identityChangesHead;
            null !== n;
            n = n._nextIdentityChange
          )
            t(n);
        }
        diff(t) {
          if ((null == t && (t = []), !ss(t))) throw new w(900, !1);
          return this.check(t) ? this : null;
        }
        onDestroy() {}
        check(t) {
          this._reset();
          let o,
            i,
            s,
            n = this._itHead,
            r = !1;
          if (Array.isArray(t)) {
            this.length = t.length;
            for (let a = 0; a < this.length; a++)
              (i = t[a]),
                (s = this._trackByFn(a, i)),
                null !== n && Object.is(n.trackById, s)
                  ? (r && (n = this._verifyReinsertion(n, i, s, a)),
                    Object.is(n.item, i) || this._addIdentityChange(n, i))
                  : ((n = this._mismatch(n, i, s, a)), (r = !0)),
                (n = n._next);
          } else
            (o = 0),
              (function p0(e, t) {
                if (Array.isArray(e))
                  for (let n = 0; n < e.length; n++) t(e[n]);
                else {
                  const n = e[Symbol.iterator]();
                  let r;
                  for (; !(r = n.next()).done; ) t(r.value);
                }
              })(t, (a) => {
                (s = this._trackByFn(o, a)),
                  null !== n && Object.is(n.trackById, s)
                    ? (r && (n = this._verifyReinsertion(n, a, s, o)),
                      Object.is(n.item, a) || this._addIdentityChange(n, a))
                    : ((n = this._mismatch(n, a, s, o)), (r = !0)),
                  (n = n._next),
                  o++;
              }),
              (this.length = o);
          return this._truncate(n), (this.collection = t), this.isDirty;
        }
        get isDirty() {
          return (
            null !== this._additionsHead ||
            null !== this._movesHead ||
            null !== this._removalsHead ||
            null !== this._identityChangesHead
          );
        }
        _reset() {
          if (this.isDirty) {
            let t;
            for (
              t = this._previousItHead = this._itHead;
              null !== t;
              t = t._next
            )
              t._nextPrevious = t._next;
            for (t = this._additionsHead; null !== t; t = t._nextAdded)
              t.previousIndex = t.currentIndex;
            for (
              this._additionsHead = this._additionsTail = null,
                t = this._movesHead;
              null !== t;
              t = t._nextMoved
            )
              t.previousIndex = t.currentIndex;
            (this._movesHead = this._movesTail = null),
              (this._removalsHead = this._removalsTail = null),
              (this._identityChangesHead = this._identityChangesTail = null);
          }
        }
        _mismatch(t, n, r, o) {
          let i;
          return (
            null === t ? (i = this._itTail) : ((i = t._prev), this._remove(t)),
            null !==
            (t =
              null === this._unlinkedRecords
                ? null
                : this._unlinkedRecords.get(r, null))
              ? (Object.is(t.item, n) || this._addIdentityChange(t, n),
                this._reinsertAfter(t, i, o))
              : null !==
                (t =
                  null === this._linkedRecords
                    ? null
                    : this._linkedRecords.get(r, o))
              ? (Object.is(t.item, n) || this._addIdentityChange(t, n),
                this._moveAfter(t, i, o))
              : (t = this._addAfter(new YM(n, r), i, o)),
            t
          );
        }
        _verifyReinsertion(t, n, r, o) {
          let i =
            null === this._unlinkedRecords
              ? null
              : this._unlinkedRecords.get(r, null);
          return (
            null !== i
              ? (t = this._reinsertAfter(i, t._prev, o))
              : t.currentIndex != o &&
                ((t.currentIndex = o), this._addToMoves(t, o)),
            t
          );
        }
        _truncate(t) {
          for (; null !== t; ) {
            const n = t._next;
            this._addToRemovals(this._unlink(t)), (t = n);
          }
          null !== this._unlinkedRecords && this._unlinkedRecords.clear(),
            null !== this._additionsTail &&
              (this._additionsTail._nextAdded = null),
            null !== this._movesTail && (this._movesTail._nextMoved = null),
            null !== this._itTail && (this._itTail._next = null),
            null !== this._removalsTail &&
              (this._removalsTail._nextRemoved = null),
            null !== this._identityChangesTail &&
              (this._identityChangesTail._nextIdentityChange = null);
        }
        _reinsertAfter(t, n, r) {
          null !== this._unlinkedRecords && this._unlinkedRecords.remove(t);
          const o = t._prevRemoved,
            i = t._nextRemoved;
          return (
            null === o ? (this._removalsHead = i) : (o._nextRemoved = i),
            null === i ? (this._removalsTail = o) : (i._prevRemoved = o),
            this._insertAfter(t, n, r),
            this._addToMoves(t, r),
            t
          );
        }
        _moveAfter(t, n, r) {
          return (
            this._unlink(t),
            this._insertAfter(t, n, r),
            this._addToMoves(t, r),
            t
          );
        }
        _addAfter(t, n, r) {
          return (
            this._insertAfter(t, n, r),
            (this._additionsTail =
              null === this._additionsTail
                ? (this._additionsHead = t)
                : (this._additionsTail._nextAdded = t)),
            t
          );
        }
        _insertAfter(t, n, r) {
          const o = null === n ? this._itHead : n._next;
          return (
            (t._next = o),
            (t._prev = n),
            null === o ? (this._itTail = t) : (o._prev = t),
            null === n ? (this._itHead = t) : (n._next = t),
            null === this._linkedRecords && (this._linkedRecords = new yy()),
            this._linkedRecords.put(t),
            (t.currentIndex = r),
            t
          );
        }
        _remove(t) {
          return this._addToRemovals(this._unlink(t));
        }
        _unlink(t) {
          null !== this._linkedRecords && this._linkedRecords.remove(t);
          const n = t._prev,
            r = t._next;
          return (
            null === n ? (this._itHead = r) : (n._next = r),
            null === r ? (this._itTail = n) : (r._prev = n),
            t
          );
        }
        _addToMoves(t, n) {
          return (
            t.previousIndex === n ||
              (this._movesTail =
                null === this._movesTail
                  ? (this._movesHead = t)
                  : (this._movesTail._nextMoved = t)),
            t
          );
        }
        _addToRemovals(t) {
          return (
            null === this._unlinkedRecords &&
              (this._unlinkedRecords = new yy()),
            this._unlinkedRecords.put(t),
            (t.currentIndex = null),
            (t._nextRemoved = null),
            null === this._removalsTail
              ? ((this._removalsTail = this._removalsHead = t),
                (t._prevRemoved = null))
              : ((t._prevRemoved = this._removalsTail),
                (this._removalsTail = this._removalsTail._nextRemoved = t)),
            t
          );
        }
        _addIdentityChange(t, n) {
          return (
            (t.item = n),
            (this._identityChangesTail =
              null === this._identityChangesTail
                ? (this._identityChangesHead = t)
                : (this._identityChangesTail._nextIdentityChange = t)),
            t
          );
        }
      }
      class YM {
        constructor(t, n) {
          (this.item = t),
            (this.trackById = n),
            (this.currentIndex = null),
            (this.previousIndex = null),
            (this._nextPrevious = null),
            (this._prev = null),
            (this._next = null),
            (this._prevDup = null),
            (this._nextDup = null),
            (this._prevRemoved = null),
            (this._nextRemoved = null),
            (this._nextAdded = null),
            (this._nextMoved = null),
            (this._nextIdentityChange = null);
        }
      }
      class ZM {
        constructor() {
          (this._head = null), (this._tail = null);
        }
        add(t) {
          null === this._head
            ? ((this._head = this._tail = t),
              (t._nextDup = null),
              (t._prevDup = null))
            : ((this._tail._nextDup = t),
              (t._prevDup = this._tail),
              (t._nextDup = null),
              (this._tail = t));
        }
        get(t, n) {
          let r;
          for (r = this._head; null !== r; r = r._nextDup)
            if (
              (null === n || n <= r.currentIndex) &&
              Object.is(r.trackById, t)
            )
              return r;
          return null;
        }
        remove(t) {
          const n = t._prevDup,
            r = t._nextDup;
          return (
            null === n ? (this._head = r) : (n._nextDup = r),
            null === r ? (this._tail = n) : (r._prevDup = n),
            null === this._head
          );
        }
      }
      class yy {
        constructor() {
          this.map = new Map();
        }
        put(t) {
          const n = t.trackById;
          let r = this.map.get(n);
          r || ((r = new ZM()), this.map.set(n, r)), r.add(t);
        }
        get(t, n) {
          const o = this.map.get(t);
          return o ? o.get(t, n) : null;
        }
        remove(t) {
          const n = t.trackById;
          return this.map.get(n).remove(t) && this.map.delete(n), t;
        }
        get isEmpty() {
          return 0 === this.map.size;
        }
        clear() {
          this.map.clear();
        }
      }
      function vy(e, t, n) {
        const r = e.previousIndex;
        if (null === r) return r;
        let o = 0;
        return n && r < n.length && (o = n[r]), r + t + o;
      }
      class Dy {
        constructor() {}
        supports(t) {
          return t instanceof Map || ol(t);
        }
        create() {
          return new KM();
        }
      }
      class KM {
        constructor() {
          (this._records = new Map()),
            (this._mapHead = null),
            (this._appendAfter = null),
            (this._previousMapHead = null),
            (this._changesHead = null),
            (this._changesTail = null),
            (this._additionsHead = null),
            (this._additionsTail = null),
            (this._removalsHead = null),
            (this._removalsTail = null);
        }
        get isDirty() {
          return (
            null !== this._additionsHead ||
            null !== this._changesHead ||
            null !== this._removalsHead
          );
        }
        forEachItem(t) {
          let n;
          for (n = this._mapHead; null !== n; n = n._next) t(n);
        }
        forEachPreviousItem(t) {
          let n;
          for (n = this._previousMapHead; null !== n; n = n._nextPrevious) t(n);
        }
        forEachChangedItem(t) {
          let n;
          for (n = this._changesHead; null !== n; n = n._nextChanged) t(n);
        }
        forEachAddedItem(t) {
          let n;
          for (n = this._additionsHead; null !== n; n = n._nextAdded) t(n);
        }
        forEachRemovedItem(t) {
          let n;
          for (n = this._removalsHead; null !== n; n = n._nextRemoved) t(n);
        }
        diff(t) {
          if (t) {
            if (!(t instanceof Map || ol(t))) throw new w(900, !1);
          } else t = new Map();
          return this.check(t) ? this : null;
        }
        onDestroy() {}
        check(t) {
          this._reset();
          let n = this._mapHead;
          if (
            ((this._appendAfter = null),
            this._forEach(t, (r, o) => {
              if (n && n.key === o)
                this._maybeAddToChanges(n, r),
                  (this._appendAfter = n),
                  (n = n._next);
              else {
                const i = this._getOrCreateRecordForKey(o, r);
                n = this._insertBeforeOrAppend(n, i);
              }
            }),
            n)
          ) {
            n._prev && (n._prev._next = null), (this._removalsHead = n);
            for (let r = n; null !== r; r = r._nextRemoved)
              r === this._mapHead && (this._mapHead = null),
                this._records.delete(r.key),
                (r._nextRemoved = r._next),
                (r.previousValue = r.currentValue),
                (r.currentValue = null),
                (r._prev = null),
                (r._next = null);
          }
          return (
            this._changesTail && (this._changesTail._nextChanged = null),
            this._additionsTail && (this._additionsTail._nextAdded = null),
            this.isDirty
          );
        }
        _insertBeforeOrAppend(t, n) {
          if (t) {
            const r = t._prev;
            return (
              (n._next = t),
              (n._prev = r),
              (t._prev = n),
              r && (r._next = n),
              t === this._mapHead && (this._mapHead = n),
              (this._appendAfter = t),
              t
            );
          }
          return (
            this._appendAfter
              ? ((this._appendAfter._next = n), (n._prev = this._appendAfter))
              : (this._mapHead = n),
            (this._appendAfter = n),
            null
          );
        }
        _getOrCreateRecordForKey(t, n) {
          if (this._records.has(t)) {
            const o = this._records.get(t);
            this._maybeAddToChanges(o, n);
            const i = o._prev,
              s = o._next;
            return (
              i && (i._next = s),
              s && (s._prev = i),
              (o._next = null),
              (o._prev = null),
              o
            );
          }
          const r = new JM(t);
          return (
            this._records.set(t, r),
            (r.currentValue = n),
            this._addToAdditions(r),
            r
          );
        }
        _reset() {
          if (this.isDirty) {
            let t;
            for (
              this._previousMapHead = this._mapHead, t = this._previousMapHead;
              null !== t;
              t = t._next
            )
              t._nextPrevious = t._next;
            for (t = this._changesHead; null !== t; t = t._nextChanged)
              t.previousValue = t.currentValue;
            for (t = this._additionsHead; null != t; t = t._nextAdded)
              t.previousValue = t.currentValue;
            (this._changesHead = this._changesTail = null),
              (this._additionsHead = this._additionsTail = null),
              (this._removalsHead = null);
          }
        }
        _maybeAddToChanges(t, n) {
          Object.is(n, t.currentValue) ||
            ((t.previousValue = t.currentValue),
            (t.currentValue = n),
            this._addToChanges(t));
        }
        _addToAdditions(t) {
          null === this._additionsHead
            ? (this._additionsHead = this._additionsTail = t)
            : ((this._additionsTail._nextAdded = t), (this._additionsTail = t));
        }
        _addToChanges(t) {
          null === this._changesHead
            ? (this._changesHead = this._changesTail = t)
            : ((this._changesTail._nextChanged = t), (this._changesTail = t));
        }
        _forEach(t, n) {
          t instanceof Map
            ? t.forEach(n)
            : Object.keys(t).forEach((r) => n(t[r], r));
        }
      }
      class JM {
        constructor(t) {
          (this.key = t),
            (this.previousValue = null),
            (this.currentValue = null),
            (this._nextPrevious = null),
            (this._next = null),
            (this._prev = null),
            (this._nextAdded = null),
            (this._nextRemoved = null),
            (this._nextChanged = null);
        }
      }
      function wy() {
        return new Ss([new my()]);
      }
      let Ss = (() => {
        class e {
          constructor(n) {
            this.factories = n;
          }
          static create(n, r) {
            if (null != r) {
              const o = r.factories.slice();
              n = n.concat(o);
            }
            return new e(n);
          }
          static extend(n) {
            return {
              provide: e,
              useFactory: (r) => e.create(n, r || wy()),
              deps: [[e, new po(), new ho()]],
            };
          }
          find(n) {
            const r = this.factories.find((o) => o.supports(n));
            if (null != r) return r;
            throw new w(901, !1);
          }
        }
        return (e.ɵprov = M({ token: e, providedIn: "root", factory: wy })), e;
      })();
      function Cy() {
        return new $o([new Dy()]);
      }
      let $o = (() => {
        class e {
          constructor(n) {
            this.factories = n;
          }
          static create(n, r) {
            if (r) {
              const o = r.factories.slice();
              n = n.concat(o);
            }
            return new e(n);
          }
          static extend(n) {
            return {
              provide: e,
              useFactory: (r) => e.create(n, r || Cy()),
              deps: [[e, new po(), new ho()]],
            };
          }
          find(n) {
            const r = this.factories.find((o) => o.supports(n));
            if (r) return r;
            throw new w(901, !1);
          }
        }
        return (e.ɵprov = M({ token: e, providedIn: "root", factory: Cy })), e;
      })();
      const tT = iy(null, "core", []);
      let nT = (() => {
          class e {
            constructor(n) {}
          }
          return (
            (e.ɵfac = function (n) {
              return new (n || e)(b(_s));
            }),
            (e.ɵmod = Tn({ type: e })),
            (e.ɵinj = hn({})),
            e
          );
        })(),
        Xl = null;
      function Vn() {
        return Xl;
      }
      class iT {}
      const Ze = new O("DocumentToken");
      let ec = (() => {
        class e {
          historyGo(n) {
            throw new Error("Not implemented");
          }
        }
        return (
          (e.ɵfac = function (n) {
            return new (n || e)();
          }),
          (e.ɵprov = M({
            token: e,
            factory: function () {
              return (function sT() {
                return b(_y);
              })();
            },
            providedIn: "platform",
          })),
          e
        );
      })();
      const aT = new O("Location Initialized");
      let _y = (() => {
        class e extends ec {
          constructor(n) {
            super(),
              (this._doc = n),
              (this._location = window.location),
              (this._history = window.history);
          }
          getBaseHrefFromDOM() {
            return Vn().getBaseHref(this._doc);
          }
          onPopState(n) {
            const r = Vn().getGlobalEventTarget(this._doc, "window");
            return (
              r.addEventListener("popstate", n, !1),
              () => r.removeEventListener("popstate", n)
            );
          }
          onHashChange(n) {
            const r = Vn().getGlobalEventTarget(this._doc, "window");
            return (
              r.addEventListener("hashchange", n, !1),
              () => r.removeEventListener("hashchange", n)
            );
          }
          get href() {
            return this._location.href;
          }
          get protocol() {
            return this._location.protocol;
          }
          get hostname() {
            return this._location.hostname;
          }
          get port() {
            return this._location.port;
          }
          get pathname() {
            return this._location.pathname;
          }
          get search() {
            return this._location.search;
          }
          get hash() {
            return this._location.hash;
          }
          set pathname(n) {
            this._location.pathname = n;
          }
          pushState(n, r, o) {
            Ey() ? this._history.pushState(n, r, o) : (this._location.hash = o);
          }
          replaceState(n, r, o) {
            Ey()
              ? this._history.replaceState(n, r, o)
              : (this._location.hash = o);
          }
          forward() {
            this._history.forward();
          }
          back() {
            this._history.back();
          }
          historyGo(n = 0) {
            this._history.go(n);
          }
          getState() {
            return this._history.state;
          }
        }
        return (
          (e.ɵfac = function (n) {
            return new (n || e)(b(Ze));
          }),
          (e.ɵprov = M({
            token: e,
            factory: function () {
              return (function uT() {
                return new _y(b(Ze));
              })();
            },
            providedIn: "platform",
          })),
          e
        );
      })();
      function Ey() {
        return !!window.history.pushState;
      }
      function tc(e, t) {
        if (0 == e.length) return t;
        if (0 == t.length) return e;
        let n = 0;
        return (
          e.endsWith("/") && n++,
          t.startsWith("/") && n++,
          2 == n ? e + t.substring(1) : 1 == n ? e + t : e + "/" + t
        );
      }
      function by(e) {
        const t = e.match(/#|\?|$/),
          n = (t && t.index) || e.length;
        return e.slice(0, n - ("/" === e[n - 1] ? 1 : 0)) + e.slice(n);
      }
      function an(e) {
        return e && "?" !== e[0] ? "?" + e : e;
      }
      let Un = (() => {
        class e {
          historyGo(n) {
            throw new Error("Not implemented");
          }
        }
        return (
          (e.ɵfac = function (n) {
            return new (n || e)();
          }),
          (e.ɵprov = M({
            token: e,
            factory: function () {
              return W(Sy);
            },
            providedIn: "root",
          })),
          e
        );
      })();
      const Iy = new O("appBaseHref");
      let Sy = (() => {
          class e extends Un {
            constructor(n, r) {
              super(),
                (this._platformLocation = n),
                (this._removeListenerFns = []),
                (this._baseHref =
                  r ??
                  this._platformLocation.getBaseHrefFromDOM() ??
                  W(Ze).location?.origin ??
                  "");
            }
            ngOnDestroy() {
              for (; this._removeListenerFns.length; )
                this._removeListenerFns.pop()();
            }
            onPopState(n) {
              this._removeListenerFns.push(
                this._platformLocation.onPopState(n),
                this._platformLocation.onHashChange(n)
              );
            }
            getBaseHref() {
              return this._baseHref;
            }
            prepareExternalUrl(n) {
              return tc(this._baseHref, n);
            }
            path(n = !1) {
              const r =
                  this._platformLocation.pathname +
                  an(this._platformLocation.search),
                o = this._platformLocation.hash;
              return o && n ? `${r}${o}` : r;
            }
            pushState(n, r, o, i) {
              const s = this.prepareExternalUrl(o + an(i));
              this._platformLocation.pushState(n, r, s);
            }
            replaceState(n, r, o, i) {
              const s = this.prepareExternalUrl(o + an(i));
              this._platformLocation.replaceState(n, r, s);
            }
            forward() {
              this._platformLocation.forward();
            }
            back() {
              this._platformLocation.back();
            }
            getState() {
              return this._platformLocation.getState();
            }
            historyGo(n = 0) {
              this._platformLocation.historyGo?.(n);
            }
          }
          return (
            (e.ɵfac = function (n) {
              return new (n || e)(b(ec), b(Iy, 8));
            }),
            (e.ɵprov = M({ token: e, factory: e.ɵfac, providedIn: "root" })),
            e
          );
        })(),
        lT = (() => {
          class e extends Un {
            constructor(n, r) {
              super(),
                (this._platformLocation = n),
                (this._baseHref = ""),
                (this._removeListenerFns = []),
                null != r && (this._baseHref = r);
            }
            ngOnDestroy() {
              for (; this._removeListenerFns.length; )
                this._removeListenerFns.pop()();
            }
            onPopState(n) {
              this._removeListenerFns.push(
                this._platformLocation.onPopState(n),
                this._platformLocation.onHashChange(n)
              );
            }
            getBaseHref() {
              return this._baseHref;
            }
            path(n = !1) {
              let r = this._platformLocation.hash;
              return null == r && (r = "#"), r.length > 0 ? r.substring(1) : r;
            }
            prepareExternalUrl(n) {
              const r = tc(this._baseHref, n);
              return r.length > 0 ? "#" + r : r;
            }
            pushState(n, r, o, i) {
              let s = this.prepareExternalUrl(o + an(i));
              0 == s.length && (s = this._platformLocation.pathname),
                this._platformLocation.pushState(n, r, s);
            }
            replaceState(n, r, o, i) {
              let s = this.prepareExternalUrl(o + an(i));
              0 == s.length && (s = this._platformLocation.pathname),
                this._platformLocation.replaceState(n, r, s);
            }
            forward() {
              this._platformLocation.forward();
            }
            back() {
              this._platformLocation.back();
            }
            getState() {
              return this._platformLocation.getState();
            }
            historyGo(n = 0) {
              this._platformLocation.historyGo?.(n);
            }
          }
          return (
            (e.ɵfac = function (n) {
              return new (n || e)(b(ec), b(Iy, 8));
            }),
            (e.ɵprov = M({ token: e, factory: e.ɵfac })),
            e
          );
        })(),
        nc = (() => {
          class e {
            constructor(n) {
              (this._subject = new He()),
                (this._urlChangeListeners = []),
                (this._urlChangeSubscription = null),
                (this._locationStrategy = n);
              const r = this._locationStrategy.getBaseHref();
              (this._basePath = (function fT(e) {
                if (new RegExp("^(https?:)?//").test(e)) {
                  const [, n] = e.split(/\/\/[^\/]+/);
                  return n;
                }
                return e;
              })(by(My(r)))),
                this._locationStrategy.onPopState((o) => {
                  this._subject.emit({
                    url: this.path(!0),
                    pop: !0,
                    state: o.state,
                    type: o.type,
                  });
                });
            }
            ngOnDestroy() {
              this._urlChangeSubscription?.unsubscribe(),
                (this._urlChangeListeners = []);
            }
            path(n = !1) {
              return this.normalize(this._locationStrategy.path(n));
            }
            getState() {
              return this._locationStrategy.getState();
            }
            isCurrentPathEqualTo(n, r = "") {
              return this.path() == this.normalize(n + an(r));
            }
            normalize(n) {
              return e.stripTrailingSlash(
                (function dT(e, t) {
                  if (!e || !t.startsWith(e)) return t;
                  const n = t.substring(e.length);
                  return "" === n || ["/", ";", "?", "#"].includes(n[0])
                    ? n
                    : t;
                })(this._basePath, My(n))
              );
            }
            prepareExternalUrl(n) {
              return (
                n && "/" !== n[0] && (n = "/" + n),
                this._locationStrategy.prepareExternalUrl(n)
              );
            }
            go(n, r = "", o = null) {
              this._locationStrategy.pushState(o, "", n, r),
                this._notifyUrlChangeListeners(
                  this.prepareExternalUrl(n + an(r)),
                  o
                );
            }
            replaceState(n, r = "", o = null) {
              this._locationStrategy.replaceState(o, "", n, r),
                this._notifyUrlChangeListeners(
                  this.prepareExternalUrl(n + an(r)),
                  o
                );
            }
            forward() {
              this._locationStrategy.forward();
            }
            back() {
              this._locationStrategy.back();
            }
            historyGo(n = 0) {
              this._locationStrategy.historyGo?.(n);
            }
            onUrlChange(n) {
              return (
                this._urlChangeListeners.push(n),
                this._urlChangeSubscription ||
                  (this._urlChangeSubscription = this.subscribe((r) => {
                    this._notifyUrlChangeListeners(r.url, r.state);
                  })),
                () => {
                  const r = this._urlChangeListeners.indexOf(n);
                  this._urlChangeListeners.splice(r, 1),
                    0 === this._urlChangeListeners.length &&
                      (this._urlChangeSubscription?.unsubscribe(),
                      (this._urlChangeSubscription = null));
                }
              );
            }
            _notifyUrlChangeListeners(n = "", r) {
              this._urlChangeListeners.forEach((o) => o(n, r));
            }
            subscribe(n, r, o) {
              return this._subject.subscribe({
                next: n,
                error: r,
                complete: o,
              });
            }
          }
          return (
            (e.normalizeQueryParams = an),
            (e.joinWithSlash = tc),
            (e.stripTrailingSlash = by),
            (e.ɵfac = function (n) {
              return new (n || e)(b(Un));
            }),
            (e.ɵprov = M({
              token: e,
              factory: function () {
                return (function cT() {
                  return new nc(b(Un));
                })();
              },
              providedIn: "root",
            })),
            e
          );
        })();
      function My(e) {
        return e.replace(/\/index.html$/, "");
      }
      class JT {
        constructor(t, n, r, o) {
          (this.$implicit = t),
            (this.ngForOf = n),
            (this.index = r),
            (this.count = o);
        }
        get first() {
          return 0 === this.index;
        }
        get last() {
          return this.index === this.count - 1;
        }
        get even() {
          return this.index % 2 == 0;
        }
        get odd() {
          return !this.even;
        }
      }
      let kr = (() => {
        class e {
          set ngForOf(n) {
            (this._ngForOf = n), (this._ngForOfDirty = !0);
          }
          set ngForTrackBy(n) {
            this._trackByFn = n;
          }
          get ngForTrackBy() {
            return this._trackByFn;
          }
          constructor(n, r, o) {
            (this._viewContainer = n),
              (this._template = r),
              (this._differs = o),
              (this._ngForOf = null),
              (this._ngForOfDirty = !0),
              (this._differ = null);
          }
          set ngForTemplate(n) {
            n && (this._template = n);
          }
          ngDoCheck() {
            if (this._ngForOfDirty) {
              this._ngForOfDirty = !1;
              const n = this._ngForOf;
              !this._differ &&
                n &&
                (this._differ = this._differs
                  .find(n)
                  .create(this.ngForTrackBy));
            }
            if (this._differ) {
              const n = this._differ.diff(this._ngForOf);
              n && this._applyChanges(n);
            }
          }
          _applyChanges(n) {
            const r = this._viewContainer;
            n.forEachOperation((o, i, s) => {
              if (null == o.previousIndex)
                r.createEmbeddedView(
                  this._template,
                  new JT(o.item, this._ngForOf, -1, -1),
                  null === s ? void 0 : s
                );
              else if (null == s) r.remove(null === i ? void 0 : i);
              else if (null !== i) {
                const a = r.get(i);
                r.move(a, s), $y(a, o);
              }
            });
            for (let o = 0, i = r.length; o < i; o++) {
              const a = r.get(o).context;
              (a.index = o), (a.count = i), (a.ngForOf = this._ngForOf);
            }
            n.forEachIdentityChange((o) => {
              $y(r.get(o.currentIndex), o);
            });
          }
          static ngTemplateContextGuard(n, r) {
            return !0;
          }
        }
        return (
          (e.ɵfac = function (n) {
            return new (n || e)(I(Et), I(rn), I(Ss));
          }),
          (e.ɵdir = Re({
            type: e,
            selectors: [["", "ngFor", "", "ngForOf", ""]],
            inputs: {
              ngForOf: "ngForOf",
              ngForTrackBy: "ngForTrackBy",
              ngForTemplate: "ngForTemplate",
            },
            standalone: !0,
          })),
          e
        );
      })();
      function $y(e, t) {
        e.context.$implicit = t.item;
      }
      let Uy = (() => {
          class e {
            constructor(n, r, o) {
              (this._ngEl = n),
                (this._differs = r),
                (this._renderer = o),
                (this._ngStyle = null),
                (this._differ = null);
            }
            set ngStyle(n) {
              (this._ngStyle = n),
                !this._differ &&
                  n &&
                  (this._differ = this._differs.find(n).create());
            }
            ngDoCheck() {
              if (this._differ) {
                const n = this._differ.diff(this._ngStyle);
                n && this._applyChanges(n);
              }
            }
            _setStyle(n, r) {
              const [o, i] = n.split("."),
                s = -1 === o.indexOf("-") ? void 0 : Qe.DashCase;
              null != r
                ? this._renderer.setStyle(
                    this._ngEl.nativeElement,
                    o,
                    i ? `${r}${i}` : r,
                    s
                  )
                : this._renderer.removeStyle(this._ngEl.nativeElement, o, s);
            }
            _applyChanges(n) {
              n.forEachRemovedItem((r) => this._setStyle(r.key, null)),
                n.forEachAddedItem((r) =>
                  this._setStyle(r.key, r.currentValue)
                ),
                n.forEachChangedItem((r) =>
                  this._setStyle(r.key, r.currentValue)
                );
            }
          }
          return (
            (e.ɵfac = function (n) {
              return new (n || e)(I(Xt), I($o), I(Zi));
            }),
            (e.ɵdir = Re({
              type: e,
              selectors: [["", "ngStyle", ""]],
              inputs: { ngStyle: "ngStyle" },
              standalone: !0,
            })),
            e
          );
        })(),
        MA = (() => {
          class e {}
          return (
            (e.ɵfac = function (n) {
              return new (n || e)();
            }),
            (e.ɵmod = Tn({ type: e })),
            (e.ɵinj = hn({})),
            e
          );
        })();
      const zy = "browser";
      let PA = (() => {
        class e {}
        return (
          (e.ɵprov = M({
            token: e,
            providedIn: "root",
            factory: () => new OA(b(Ze), window),
          })),
          e
        );
      })();
      class OA {
        constructor(t, n) {
          (this.document = t), (this.window = n), (this.offset = () => [0, 0]);
        }
        setOffset(t) {
          this.offset = Array.isArray(t) ? () => t : t;
        }
        getScrollPosition() {
          return this.supportsScrolling()
            ? [this.window.pageXOffset, this.window.pageYOffset]
            : [0, 0];
        }
        scrollToPosition(t) {
          this.supportsScrolling() && this.window.scrollTo(t[0], t[1]);
        }
        scrollToAnchor(t) {
          if (!this.supportsScrolling()) return;
          const n = (function NA(e, t) {
            const n = e.getElementById(t) || e.getElementsByName(t)[0];
            if (n) return n;
            if (
              "function" == typeof e.createTreeWalker &&
              e.body &&
              (e.body.createShadowRoot || e.body.attachShadow)
            ) {
              const r = e.createTreeWalker(e.body, NodeFilter.SHOW_ELEMENT);
              let o = r.currentNode;
              for (; o; ) {
                const i = o.shadowRoot;
                if (i) {
                  const s =
                    i.getElementById(t) || i.querySelector(`[name="${t}"]`);
                  if (s) return s;
                }
                o = r.nextNode();
              }
            }
            return null;
          })(this.document, t);
          n && (this.scrollToElement(n), n.focus());
        }
        setHistoryScrollRestoration(t) {
          if (this.supportScrollRestoration()) {
            const n = this.window.history;
            n && n.scrollRestoration && (n.scrollRestoration = t);
          }
        }
        scrollToElement(t) {
          const n = t.getBoundingClientRect(),
            r = n.left + this.window.pageXOffset,
            o = n.top + this.window.pageYOffset,
            i = this.offset();
          this.window.scrollTo(r - i[0], o - i[1]);
        }
        supportScrollRestoration() {
          try {
            if (!this.supportsScrolling()) return !1;
            const t =
              Gy(this.window.history) ||
              Gy(Object.getPrototypeOf(this.window.history));
            return !(!t || (!t.writable && !t.set));
          } catch {
            return !1;
          }
        }
        supportsScrolling() {
          try {
            return (
              !!this.window &&
              !!this.window.scrollTo &&
              "pageXOffset" in this.window
            );
          } catch {
            return !1;
          }
        }
      }
      function Gy(e) {
        return Object.getOwnPropertyDescriptor(e, "scrollRestoration");
      }
      class uR extends iT {
        constructor() {
          super(...arguments), (this.supportsDOMEvents = !0);
        }
      }
      class Dc extends uR {
        static makeCurrent() {
          !(function oT(e) {
            Xl || (Xl = e);
          })(new Dc());
        }
        onAndCancel(t, n, r) {
          return (
            t.addEventListener(n, r, !1),
            () => {
              t.removeEventListener(n, r, !1);
            }
          );
        }
        dispatchEvent(t, n) {
          t.dispatchEvent(n);
        }
        remove(t) {
          t.parentNode && t.parentNode.removeChild(t);
        }
        createElement(t, n) {
          return (n = n || this.getDefaultDocument()).createElement(t);
        }
        createHtmlDocument() {
          return document.implementation.createHTMLDocument("fakeTitle");
        }
        getDefaultDocument() {
          return document;
        }
        isElementNode(t) {
          return t.nodeType === Node.ELEMENT_NODE;
        }
        isShadowRoot(t) {
          return t instanceof DocumentFragment;
        }
        getGlobalEventTarget(t, n) {
          return "window" === n
            ? window
            : "document" === n
            ? t
            : "body" === n
            ? t.body
            : null;
        }
        getBaseHref(t) {
          const n = (function lR() {
            return (
              (Ho = Ho || document.querySelector("base")),
              Ho ? Ho.getAttribute("href") : null
            );
          })();
          return null == n
            ? null
            : (function cR(e) {
                (js = js || document.createElement("a")),
                  js.setAttribute("href", e);
                const t = js.pathname;
                return "/" === t.charAt(0) ? t : `/${t}`;
              })(n);
        }
        resetBaseElement() {
          Ho = null;
        }
        getUserAgent() {
          return window.navigator.userAgent;
        }
        getCookie(t) {
          return (function YT(e, t) {
            t = encodeURIComponent(t);
            for (const n of e.split(";")) {
              const r = n.indexOf("="),
                [o, i] = -1 == r ? [n, ""] : [n.slice(0, r), n.slice(r + 1)];
              if (o.trim() === t) return decodeURIComponent(i);
            }
            return null;
          })(document.cookie, t);
        }
      }
      let js,
        Ho = null;
      const Zy = new O("TRANSITION_ID"),
        fR = [
          {
            provide: Ds,
            useFactory: function dR(e, t, n) {
              return () => {
                n.get(ws).donePromise.then(() => {
                  const r = Vn(),
                    o = t.querySelectorAll(`style[ng-transition="${e}"]`);
                  for (let i = 0; i < o.length; i++) r.remove(o[i]);
                });
              };
            },
            deps: [Zy, Ze, tn],
            multi: !0,
          },
        ];
      let pR = (() => {
        class e {
          build() {
            return new XMLHttpRequest();
          }
        }
        return (
          (e.ɵfac = function (n) {
            return new (n || e)();
          }),
          (e.ɵprov = M({ token: e, factory: e.ɵfac })),
          e
        );
      })();
      const $s = new O("EventManagerPlugins");
      let Bs = (() => {
        class e {
          constructor(n, r) {
            (this._zone = r),
              (this._eventNameToPlugin = new Map()),
              n.forEach((o) => {
                o.manager = this;
              }),
              (this._plugins = n.slice().reverse());
          }
          addEventListener(n, r, o) {
            return this._findPluginFor(r).addEventListener(n, r, o);
          }
          addGlobalEventListener(n, r, o) {
            return this._findPluginFor(r).addGlobalEventListener(n, r, o);
          }
          getZone() {
            return this._zone;
          }
          _findPluginFor(n) {
            const r = this._eventNameToPlugin.get(n);
            if (r) return r;
            const o = this._plugins;
            for (let i = 0; i < o.length; i++) {
              const s = o[i];
              if (s.supports(n)) return this._eventNameToPlugin.set(n, s), s;
            }
            throw new Error(`No event manager plugin found for event ${n}`);
          }
        }
        return (
          (e.ɵfac = function (n) {
            return new (n || e)(b($s), b(de));
          }),
          (e.ɵprov = M({ token: e, factory: e.ɵfac })),
          e
        );
      })();
      class Ky {
        constructor(t) {
          this._doc = t;
        }
        addGlobalEventListener(t, n, r) {
          const o = Vn().getGlobalEventTarget(this._doc, t);
          if (!o)
            throw new Error(`Unsupported event target ${o} for event ${n}`);
          return this.addEventListener(o, n, r);
        }
      }
      let Jy = (() => {
          class e {
            constructor() {
              this.usageCount = new Map();
            }
            addStyles(n) {
              for (const r of n)
                1 === this.changeUsageCount(r, 1) && this.onStyleAdded(r);
            }
            removeStyles(n) {
              for (const r of n)
                0 === this.changeUsageCount(r, -1) && this.onStyleRemoved(r);
            }
            onStyleRemoved(n) {}
            onStyleAdded(n) {}
            getAllStyles() {
              return this.usageCount.keys();
            }
            changeUsageCount(n, r) {
              const o = this.usageCount;
              let i = o.get(n) ?? 0;
              return (i += r), i > 0 ? o.set(n, i) : o.delete(n), i;
            }
            ngOnDestroy() {
              for (const n of this.getAllStyles()) this.onStyleRemoved(n);
              this.usageCount.clear();
            }
          }
          return (
            (e.ɵfac = function (n) {
              return new (n || e)();
            }),
            (e.ɵprov = M({ token: e, factory: e.ɵfac })),
            e
          );
        })(),
        zo = (() => {
          class e extends Jy {
            constructor(n) {
              super(),
                (this.doc = n),
                (this.styleRef = new Map()),
                (this.hostNodes = new Set()),
                this.resetHostNodes();
            }
            onStyleAdded(n) {
              for (const r of this.hostNodes) this.addStyleToHost(r, n);
            }
            onStyleRemoved(n) {
              const r = this.styleRef;
              r.get(n)?.forEach((i) => i.remove()), r.delete(n);
            }
            ngOnDestroy() {
              super.ngOnDestroy(), this.styleRef.clear(), this.resetHostNodes();
            }
            addHost(n) {
              this.hostNodes.add(n);
              for (const r of this.getAllStyles()) this.addStyleToHost(n, r);
            }
            removeHost(n) {
              this.hostNodes.delete(n);
            }
            addStyleToHost(n, r) {
              const o = this.doc.createElement("style");
              (o.textContent = r), n.appendChild(o);
              const i = this.styleRef.get(r);
              i ? i.push(o) : this.styleRef.set(r, [o]);
            }
            resetHostNodes() {
              const n = this.hostNodes;
              n.clear(), n.add(this.doc.head);
            }
          }
          return (
            (e.ɵfac = function (n) {
              return new (n || e)(b(Ze));
            }),
            (e.ɵprov = M({ token: e, factory: e.ɵfac })),
            e
          );
        })();
      const wc = {
          svg: "http://www.w3.org/2000/svg",
          xhtml: "http://www.w3.org/1999/xhtml",
          xlink: "http://www.w3.org/1999/xlink",
          xml: "http://www.w3.org/XML/1998/namespace",
          xmlns: "http://www.w3.org/2000/xmlns/",
          math: "http://www.w3.org/1998/MathML/",
        },
        Cc = /%COMP%/g,
        tv = new O("RemoveStylesOnCompDestory", {
          providedIn: "root",
          factory: () => !1,
        });
      function nv(e, t) {
        return t.flat(100).map((n) => n.replace(Cc, e));
      }
      function rv(e) {
        return (t) => {
          if ("__ngUnwrap__" === t) return e;
          !1 === e(t) && (t.preventDefault(), (t.returnValue = !1));
        };
      }
      let _c = (() => {
        class e {
          constructor(n, r, o, i) {
            (this.eventManager = n),
              (this.sharedStylesHost = r),
              (this.appId = o),
              (this.removeStylesOnCompDestory = i),
              (this.rendererByCompId = new Map()),
              (this.defaultRenderer = new Ec(n));
          }
          createRenderer(n, r) {
            if (!n || !r) return this.defaultRenderer;
            const o = this.getOrCreateRenderer(n, r);
            return (
              o instanceof sv
                ? o.applyToHost(n)
                : o instanceof bc && o.applyStyles(),
              o
            );
          }
          getOrCreateRenderer(n, r) {
            const o = this.rendererByCompId;
            let i = o.get(r.id);
            if (!i) {
              const s = this.eventManager,
                a = this.sharedStylesHost,
                u = this.removeStylesOnCompDestory;
              switch (r.encapsulation) {
                case xt.Emulated:
                  i = new sv(s, a, r, this.appId, u);
                  break;
                case xt.ShadowDom:
                  return new CR(s, a, n, r);
                default:
                  i = new bc(s, a, r, u);
              }
              (i.onDestroy = () => o.delete(r.id)), o.set(r.id, i);
            }
            return i;
          }
          ngOnDestroy() {
            this.rendererByCompId.clear();
          }
          begin() {}
          end() {}
        }
        return (
          (e.ɵfac = function (n) {
            return new (n || e)(b(Bs), b(zo), b(jo), b(tv));
          }),
          (e.ɵprov = M({ token: e, factory: e.ɵfac })),
          e
        );
      })();
      class Ec {
        constructor(t) {
          (this.eventManager = t),
            (this.data = Object.create(null)),
            (this.destroyNode = null);
        }
        destroy() {}
        createElement(t, n) {
          return n
            ? document.createElementNS(wc[n] || n, t)
            : document.createElement(t);
        }
        createComment(t) {
          return document.createComment(t);
        }
        createText(t) {
          return document.createTextNode(t);
        }
        appendChild(t, n) {
          (iv(t) ? t.content : t).appendChild(n);
        }
        insertBefore(t, n, r) {
          t && (iv(t) ? t.content : t).insertBefore(n, r);
        }
        removeChild(t, n) {
          t && t.removeChild(n);
        }
        selectRootElement(t, n) {
          let r = "string" == typeof t ? document.querySelector(t) : t;
          if (!r)
            throw new Error(`The selector "${t}" did not match any elements`);
          return n || (r.textContent = ""), r;
        }
        parentNode(t) {
          return t.parentNode;
        }
        nextSibling(t) {
          return t.nextSibling;
        }
        setAttribute(t, n, r, o) {
          if (o) {
            n = o + ":" + n;
            const i = wc[o];
            i ? t.setAttributeNS(i, n, r) : t.setAttribute(n, r);
          } else t.setAttribute(n, r);
        }
        removeAttribute(t, n, r) {
          if (r) {
            const o = wc[r];
            o ? t.removeAttributeNS(o, n) : t.removeAttribute(`${r}:${n}`);
          } else t.removeAttribute(n);
        }
        addClass(t, n) {
          t.classList.add(n);
        }
        removeClass(t, n) {
          t.classList.remove(n);
        }
        setStyle(t, n, r, o) {
          o & (Qe.DashCase | Qe.Important)
            ? t.style.setProperty(n, r, o & Qe.Important ? "important" : "")
            : (t.style[n] = r);
        }
        removeStyle(t, n, r) {
          r & Qe.DashCase ? t.style.removeProperty(n) : (t.style[n] = "");
        }
        setProperty(t, n, r) {
          t[n] = r;
        }
        setValue(t, n) {
          t.nodeValue = n;
        }
        listen(t, n, r) {
          return "string" == typeof t
            ? this.eventManager.addGlobalEventListener(t, n, rv(r))
            : this.eventManager.addEventListener(t, n, rv(r));
        }
      }
      function iv(e) {
        return "TEMPLATE" === e.tagName && void 0 !== e.content;
      }
      class CR extends Ec {
        constructor(t, n, r, o) {
          super(t),
            (this.sharedStylesHost = n),
            (this.hostEl = r),
            (this.shadowRoot = r.attachShadow({ mode: "open" })),
            this.sharedStylesHost.addHost(this.shadowRoot);
          const i = nv(o.id, o.styles);
          for (const s of i) {
            const a = document.createElement("style");
            (a.textContent = s), this.shadowRoot.appendChild(a);
          }
        }
        nodeOrShadowRoot(t) {
          return t === this.hostEl ? this.shadowRoot : t;
        }
        appendChild(t, n) {
          return super.appendChild(this.nodeOrShadowRoot(t), n);
        }
        insertBefore(t, n, r) {
          return super.insertBefore(this.nodeOrShadowRoot(t), n, r);
        }
        removeChild(t, n) {
          return super.removeChild(this.nodeOrShadowRoot(t), n);
        }
        parentNode(t) {
          return this.nodeOrShadowRoot(
            super.parentNode(this.nodeOrShadowRoot(t))
          );
        }
        destroy() {
          this.sharedStylesHost.removeHost(this.shadowRoot);
        }
      }
      class bc extends Ec {
        constructor(t, n, r, o, i = r.id) {
          super(t),
            (this.sharedStylesHost = n),
            (this.removeStylesOnCompDestory = o),
            (this.rendererUsageCount = 0),
            (this.styles = nv(i, r.styles));
        }
        applyStyles() {
          this.sharedStylesHost.addStyles(this.styles),
            this.rendererUsageCount++;
        }
        destroy() {
          this.removeStylesOnCompDestory &&
            (this.sharedStylesHost.removeStyles(this.styles),
            this.rendererUsageCount--,
            0 === this.rendererUsageCount && this.onDestroy?.());
        }
      }
      class sv extends bc {
        constructor(t, n, r, o, i) {
          const s = o + "-" + r.id;
          super(t, n, r, i, s),
            (this.contentAttr = (function vR(e) {
              return "_ngcontent-%COMP%".replace(Cc, e);
            })(s)),
            (this.hostAttr = (function DR(e) {
              return "_nghost-%COMP%".replace(Cc, e);
            })(s));
        }
        applyToHost(t) {
          this.applyStyles(), this.setAttribute(t, this.hostAttr, "");
        }
        createElement(t, n) {
          const r = super.createElement(t, n);
          return super.setAttribute(r, this.contentAttr, ""), r;
        }
      }
      let _R = (() => {
        class e extends Ky {
          constructor(n) {
            super(n);
          }
          supports(n) {
            return !0;
          }
          addEventListener(n, r, o) {
            return (
              n.addEventListener(r, o, !1),
              () => this.removeEventListener(n, r, o)
            );
          }
          removeEventListener(n, r, o) {
            return n.removeEventListener(r, o);
          }
        }
        return (
          (e.ɵfac = function (n) {
            return new (n || e)(b(Ze));
          }),
          (e.ɵprov = M({ token: e, factory: e.ɵfac })),
          e
        );
      })();
      const av = ["alt", "control", "meta", "shift"],
        ER = {
          "\b": "Backspace",
          "\t": "Tab",
          "\x7f": "Delete",
          "\x1b": "Escape",
          Del: "Delete",
          Esc: "Escape",
          Left: "ArrowLeft",
          Right: "ArrowRight",
          Up: "ArrowUp",
          Down: "ArrowDown",
          Menu: "ContextMenu",
          Scroll: "ScrollLock",
          Win: "OS",
        },
        bR = {
          alt: (e) => e.altKey,
          control: (e) => e.ctrlKey,
          meta: (e) => e.metaKey,
          shift: (e) => e.shiftKey,
        };
      let IR = (() => {
        class e extends Ky {
          constructor(n) {
            super(n);
          }
          supports(n) {
            return null != e.parseEventName(n);
          }
          addEventListener(n, r, o) {
            const i = e.parseEventName(r),
              s = e.eventCallback(i.fullKey, o, this.manager.getZone());
            return this.manager
              .getZone()
              .runOutsideAngular(() => Vn().onAndCancel(n, i.domEventName, s));
          }
          static parseEventName(n) {
            const r = n.toLowerCase().split("."),
              o = r.shift();
            if (0 === r.length || ("keydown" !== o && "keyup" !== o))
              return null;
            const i = e._normalizeKey(r.pop());
            let s = "",
              a = r.indexOf("code");
            if (
              (a > -1 && (r.splice(a, 1), (s = "code.")),
              av.forEach((l) => {
                const c = r.indexOf(l);
                c > -1 && (r.splice(c, 1), (s += l + "."));
              }),
              (s += i),
              0 != r.length || 0 === i.length)
            )
              return null;
            const u = {};
            return (u.domEventName = o), (u.fullKey = s), u;
          }
          static matchEventFullKeyCode(n, r) {
            let o = ER[n.key] || n.key,
              i = "";
            return (
              r.indexOf("code.") > -1 && ((o = n.code), (i = "code.")),
              !(null == o || !o) &&
                ((o = o.toLowerCase()),
                " " === o ? (o = "space") : "." === o && (o = "dot"),
                av.forEach((s) => {
                  s !== o && (0, bR[s])(n) && (i += s + ".");
                }),
                (i += o),
                i === r)
            );
          }
          static eventCallback(n, r, o) {
            return (i) => {
              e.matchEventFullKeyCode(i, n) && o.runGuarded(() => r(i));
            };
          }
          static _normalizeKey(n) {
            return "esc" === n ? "escape" : n;
          }
        }
        return (
          (e.ɵfac = function (n) {
            return new (n || e)(b(Ze));
          }),
          (e.ɵprov = M({ token: e, factory: e.ɵfac })),
          e
        );
      })();
      const AR = iy(tT, "browser", [
          { provide: jl, useValue: zy },
          {
            provide: Qm,
            useValue: function SR() {
              Dc.makeCurrent();
            },
            multi: !0,
          },
          {
            provide: Ze,
            useFactory: function TR() {
              return (
                (function Q_(e) {
                  Iu = e;
                })(document),
                document
              );
            },
            deps: [],
          },
        ]),
        cv = new O(""),
        dv = [
          {
            provide: Cs,
            useClass: class hR {
              addToWindow(t) {
                (ie.getAngularTestability = (r, o = !0) => {
                  const i = t.findTestabilityInTree(r, o);
                  if (null == i)
                    throw new Error("Could not find testability for element.");
                  return i;
                }),
                  (ie.getAllAngularTestabilities = () =>
                    t.getAllTestabilities()),
                  (ie.getAllAngularRootElements = () => t.getAllRootElements()),
                  ie.frameworkStabilizers || (ie.frameworkStabilizers = []),
                  ie.frameworkStabilizers.push((r) => {
                    const o = ie.getAllAngularTestabilities();
                    let i = o.length,
                      s = !1;
                    const a = function (u) {
                      (s = s || u), i--, 0 == i && r(s);
                    };
                    o.forEach(function (u) {
                      u.whenStable(a);
                    });
                  });
              }
              findTestabilityInTree(t, n, r) {
                return null == n
                  ? null
                  : t.getTestability(n) ??
                      (r
                        ? Vn().isShadowRoot(n)
                          ? this.findTestabilityInTree(t, n.host, !0)
                          : this.findTestabilityInTree(t, n.parentElement, !0)
                        : null);
              }
            },
            deps: [],
          },
          { provide: ey, useClass: Ul, deps: [de, Hl, Cs] },
          { provide: Ul, useClass: Ul, deps: [de, Hl, Cs] },
        ],
        fv = [
          { provide: Nu, useValue: "root" },
          {
            provide: yr,
            useFactory: function MR() {
              return new yr();
            },
            deps: [],
          },
          { provide: $s, useClass: _R, multi: !0, deps: [Ze, de, jl] },
          { provide: $s, useClass: IR, multi: !0, deps: [Ze] },
          { provide: _c, useClass: _c, deps: [Bs, zo, jo, tv] },
          { provide: Bh, useExisting: _c },
          { provide: Jy, useExisting: zo },
          { provide: zo, useClass: zo, deps: [Ze] },
          { provide: Bs, useClass: Bs, deps: [$s, de] },
          { provide: class FA {}, useClass: pR, deps: [] },
          [],
        ];
      let RR = (() => {
          class e {
            constructor(n) {}
            static withServerTransition(n) {
              return {
                ngModule: e,
                providers: [
                  { provide: jo, useValue: n.appId },
                  { provide: Zy, useExisting: jo },
                  fR,
                ],
              };
            }
          }
          return (
            (e.ɵfac = function (n) {
              return new (n || e)(b(cv, 12));
            }),
            (e.ɵmod = Tn({ type: e })),
            (e.ɵinj = hn({ providers: [...fv, ...dv], imports: [MA, nT] })),
            e
          );
        })(),
        hv = (() => {
          class e {
            constructor(n) {
              this._doc = n;
            }
            getTitle() {
              return this._doc.title;
            }
            setTitle(n) {
              this._doc.title = n || "";
            }
          }
          return (
            (e.ɵfac = function (n) {
              return new (n || e)(b(Ze));
            }),
            (e.ɵprov = M({
              token: e,
              factory: function (n) {
                let r = null;
                return (
                  (r = n
                    ? new n()
                    : (function PR() {
                        return new hv(b(Ze));
                      })()),
                  r
                );
              },
              providedIn: "root",
            })),
            e
          );
        })();
      function A(...e) {
        return _e(e, Kr(e));
      }
      typeof window < "u" && window;
      class Mt extends Tt {
        constructor(t) {
          super(), (this._value = t);
        }
        get value() {
          return this.getValue();
        }
        _subscribe(t) {
          const n = super._subscribe(t);
          return !n.closed && t.next(this._value), n;
        }
        getValue() {
          const { hasError: t, thrownError: n, _value: r } = this;
          if (t) throw n;
          return this._throwIfClosed(), r;
        }
        next(t) {
          super.next((this._value = t));
        }
      }
      const Vs = Yr(
          (e) =>
            function () {
              e(this),
                (this.name = "EmptyError"),
                (this.message = "no elements in sequence");
            }
        ),
        { isArray: jR } = Array,
        { getPrototypeOf: $R, prototype: BR, keys: VR } = Object;
      const { isArray: zR } = Array;
      function Mc(...e) {
        const t = Kr(e),
          n = (function bw(e) {
            return ne(_a(e)) ? e.pop() : void 0;
          })(e),
          { args: r, keys: o } = (function UR(e) {
            if (1 === e.length) {
              const t = e[0];
              if (jR(t)) return { args: t, keys: null };
              if (
                (function HR(e) {
                  return e && "object" == typeof e && $R(e) === BR;
                })(t)
              ) {
                const n = VR(t);
                return { args: n.map((r) => t[r]), keys: n };
              }
            }
            return { args: e, keys: null };
          })(e);
        if (0 === r.length) return _e([], t);
        const i = new me(
          (function QR(e, t, n = Mn) {
            return (r) => {
              mv(
                t,
                () => {
                  const { length: o } = e,
                    i = new Array(o);
                  let s = o,
                    a = o;
                  for (let u = 0; u < o; u++)
                    mv(
                      t,
                      () => {
                        const l = _e(e[u], t);
                        let c = !1;
                        l.subscribe(
                          ve(
                            r,
                            (d) => {
                              (i[u] = d),
                                c || ((c = !0), a--),
                                a || r.next(n(i.slice()));
                            },
                            () => {
                              --s || r.complete();
                            }
                          )
                        );
                      },
                      r
                    );
                },
                r
              );
            };
          })(
            r,
            t,
            o
              ? (s) =>
                  (function qR(e, t) {
                    return e.reduce((n, r, o) => ((n[r] = t[o]), n), {});
                  })(o, s)
              : Mn
          )
        );
        return n
          ? i.pipe(
              (function WR(e) {
                return z((t) =>
                  (function GR(e, t) {
                    return zR(t) ? e(...t) : e(t);
                  })(e, t)
                );
              })(n)
            )
          : i;
      }
      function mv(e, t, n) {
        e ? zt(n, e, t) : t();
      }
      function Us(...e) {
        return (function YR() {
          return Zn(1);
        })()(_e(e, Kr(e)));
      }
      function yv(e) {
        return new me((t) => {
          at(e()).subscribe(t);
        });
      }
      function Go(e, t) {
        const n = ne(e) ? e : () => e,
          r = (o) => o.error(n());
        return new me(t ? (o) => t.schedule(r, 0, o) : r);
      }
      function Tc() {
        return ye((e, t) => {
          let n = null;
          e._refCount++;
          const r = ve(t, void 0, void 0, void 0, () => {
            if (!e || e._refCount <= 0 || 0 < --e._refCount)
              return void (n = null);
            const o = e._connection,
              i = n;
            (n = null),
              o && (!i || o === i) && o.unsubscribe(),
              t.unsubscribe();
          });
          e.subscribe(r), r.closed || (n = e.connect());
        });
      }
      class vv extends me {
        constructor(t, n) {
          super(),
            (this.source = t),
            (this.subjectFactory = n),
            (this._subject = null),
            (this._refCount = 0),
            (this._connection = null),
            pd(t) && (this.lift = t.lift);
        }
        _subscribe(t) {
          return this.getSubject().subscribe(t);
        }
        getSubject() {
          const t = this._subject;
          return (
            (!t || t.isStopped) && (this._subject = this.subjectFactory()),
            this._subject
          );
        }
        _teardown() {
          this._refCount = 0;
          const { _connection: t } = this;
          (this._subject = this._connection = null), t?.unsubscribe();
        }
        connect() {
          let t = this._connection;
          if (!t) {
            t = this._connection = new Je();
            const n = this.getSubject();
            t.add(
              this.source.subscribe(
                ve(
                  n,
                  void 0,
                  () => {
                    this._teardown(), n.complete();
                  },
                  (r) => {
                    this._teardown(), n.error(r);
                  },
                  () => this._teardown()
                )
              )
            ),
              t.closed && ((this._connection = null), (t = Je.EMPTY));
          }
          return t;
        }
        refCount() {
          return Tc()(this);
        }
      }
      function Vt(e, t) {
        return ye((n, r) => {
          let o = null,
            i = 0,
            s = !1;
          const a = () => s && !o && r.complete();
          n.subscribe(
            ve(
              r,
              (u) => {
                o?.unsubscribe();
                let l = 0;
                const c = i++;
                at(e(u, c)).subscribe(
                  (o = ve(
                    r,
                    (d) => r.next(t ? t(u, d, c, l++) : d),
                    () => {
                      (o = null), a();
                    }
                  ))
                );
              },
              () => {
                (s = !0), a();
              }
            )
          );
        });
      }
      function Hn(e) {
        return e <= 0
          ? () => At
          : ye((t, n) => {
              let r = 0;
              t.subscribe(
                ve(n, (o) => {
                  ++r <= e && (n.next(o), e <= r && n.complete());
                })
              );
            });
      }
      function Dv(...e) {
        const t = Kr(e);
        return ye((n, r) => {
          (t ? Us(e, n, t) : Us(e, n)).subscribe(r);
        });
      }
      function ln(e, t) {
        return ye((n, r) => {
          let o = 0;
          n.subscribe(ve(r, (i) => e.call(t, i, o++) && r.next(i)));
        });
      }
      function Hs(e) {
        return ye((t, n) => {
          let r = !1;
          t.subscribe(
            ve(
              n,
              (o) => {
                (r = !0), n.next(o);
              },
              () => {
                r || n.next(e), n.complete();
              }
            )
          );
        });
      }
      function wv(e = ZR) {
        return ye((t, n) => {
          let r = !1;
          t.subscribe(
            ve(
              n,
              (o) => {
                (r = !0), n.next(o);
              },
              () => (r ? n.complete() : n.error(e()))
            )
          );
        });
      }
      function ZR() {
        return new Vs();
      }
      function Dn(e, t) {
        const n = arguments.length >= 2;
        return (r) =>
          r.pipe(
            e ? ln((o, i) => e(o, i, r)) : Mn,
            Hn(1),
            n ? Hs(t) : wv(() => new Vs())
          );
      }
      function zn(e, t) {
        return ne(t) ? Se(e, t, 1) : Se(e, 1);
      }
      function Le(e, t, n) {
        const r = ne(e) || t || n ? { next: e, error: t, complete: n } : e;
        return r
          ? ye((o, i) => {
              var s;
              null === (s = r.subscribe) || void 0 === s || s.call(r);
              let a = !0;
              o.subscribe(
                ve(
                  i,
                  (u) => {
                    var l;
                    null === (l = r.next) || void 0 === l || l.call(r, u),
                      i.next(u);
                  },
                  () => {
                    var u;
                    (a = !1),
                      null === (u = r.complete) || void 0 === u || u.call(r),
                      i.complete();
                  },
                  (u) => {
                    var l;
                    (a = !1),
                      null === (l = r.error) || void 0 === l || l.call(r, u),
                      i.error(u);
                  },
                  () => {
                    var u, l;
                    a &&
                      (null === (u = r.unsubscribe) ||
                        void 0 === u ||
                        u.call(r)),
                      null === (l = r.finalize) || void 0 === l || l.call(r);
                  }
                )
              );
            })
          : Mn;
      }
      function wn(e) {
        return ye((t, n) => {
          let i,
            r = null,
            o = !1;
          (r = t.subscribe(
            ve(n, void 0, void 0, (s) => {
              (i = at(e(s, wn(e)(t)))),
                r ? (r.unsubscribe(), (r = null), i.subscribe(n)) : (o = !0);
            })
          )),
            o && (r.unsubscribe(), (r = null), i.subscribe(n));
        });
      }
      function Cv(e, t) {
        return ye(
          (function KR(e, t, n, r, o) {
            return (i, s) => {
              let a = n,
                u = t,
                l = 0;
              i.subscribe(
                ve(
                  s,
                  (c) => {
                    const d = l++;
                    (u = a ? e(u, c, d) : ((a = !0), c)), r && s.next(u);
                  },
                  o &&
                    (() => {
                      a && s.next(u), s.complete();
                    })
                )
              );
            };
          })(e, t, arguments.length >= 2, !0)
        );
      }
      function Ac(e) {
        return e <= 0
          ? () => At
          : ye((t, n) => {
              let r = [];
              t.subscribe(
                ve(
                  n,
                  (o) => {
                    r.push(o), e < r.length && r.shift();
                  },
                  () => {
                    for (const o of r) n.next(o);
                    n.complete();
                  },
                  void 0,
                  () => {
                    r = null;
                  }
                )
              );
            });
      }
      function _v(e, t) {
        const n = arguments.length >= 2;
        return (r) =>
          r.pipe(
            e ? ln((o, i) => e(o, i, r)) : Mn,
            Ac(1),
            n ? Hs(t) : wv(() => new Vs())
          );
      }
      function Rc(e) {
        return ye((t, n) => {
          try {
            t.subscribe(n);
          } finally {
            n.add(e);
          }
        });
      }
      const $ = "primary",
        Wo = Symbol("RouteTitle");
      class ex {
        constructor(t) {
          this.params = t || {};
        }
        has(t) {
          return Object.prototype.hasOwnProperty.call(this.params, t);
        }
        get(t) {
          if (this.has(t)) {
            const n = this.params[t];
            return Array.isArray(n) ? n[0] : n;
          }
          return null;
        }
        getAll(t) {
          if (this.has(t)) {
            const n = this.params[t];
            return Array.isArray(n) ? n : [n];
          }
          return [];
        }
        get keys() {
          return Object.keys(this.params);
        }
      }
      function Lr(e) {
        return new ex(e);
      }
      function tx(e, t, n) {
        const r = n.path.split("/");
        if (
          r.length > e.length ||
          ("full" === n.pathMatch && (t.hasChildren() || r.length < e.length))
        )
          return null;
        const o = {};
        for (let i = 0; i < r.length; i++) {
          const s = r[i],
            a = e[i];
          if (s.startsWith(":")) o[s.substring(1)] = a;
          else if (s !== a.path) return null;
        }
        return { consumed: e.slice(0, r.length), posParams: o };
      }
      function Ut(e, t) {
        const n = e ? Object.keys(e) : void 0,
          r = t ? Object.keys(t) : void 0;
        if (!n || !r || n.length != r.length) return !1;
        let o;
        for (let i = 0; i < n.length; i++)
          if (((o = n[i]), !Ev(e[o], t[o]))) return !1;
        return !0;
      }
      function Ev(e, t) {
        if (Array.isArray(e) && Array.isArray(t)) {
          if (e.length !== t.length) return !1;
          const n = [...e].sort(),
            r = [...t].sort();
          return n.every((o, i) => r[i] === o);
        }
        return e === t;
      }
      function bv(e) {
        return Array.prototype.concat.apply([], e);
      }
      function Iv(e) {
        return e.length > 0 ? e[e.length - 1] : null;
      }
      function Ae(e, t) {
        for (const n in e) e.hasOwnProperty(n) && t(e[n], n);
      }
      function Cn(e) {
        return Lp(e) ? e : us(e) ? _e(Promise.resolve(e)) : A(e);
      }
      const zs = !1,
        rx = {
          exact: function Tv(e, t, n) {
            if (
              !Gn(e.segments, t.segments) ||
              !Gs(e.segments, t.segments, n) ||
              e.numberOfChildren !== t.numberOfChildren
            )
              return !1;
            for (const r in t.children)
              if (!e.children[r] || !Tv(e.children[r], t.children[r], n))
                return !1;
            return !0;
          },
          subset: Av,
        },
        Sv = {
          exact: function ox(e, t) {
            return Ut(e, t);
          },
          subset: function ix(e, t) {
            return (
              Object.keys(t).length <= Object.keys(e).length &&
              Object.keys(t).every((n) => Ev(e[n], t[n]))
            );
          },
          ignored: () => !0,
        };
      function Mv(e, t, n) {
        return (
          rx[n.paths](e.root, t.root, n.matrixParams) &&
          Sv[n.queryParams](e.queryParams, t.queryParams) &&
          !("exact" === n.fragment && e.fragment !== t.fragment)
        );
      }
      function Av(e, t, n) {
        return Rv(e, t, t.segments, n);
      }
      function Rv(e, t, n, r) {
        if (e.segments.length > n.length) {
          const o = e.segments.slice(0, n.length);
          return !(!Gn(o, n) || t.hasChildren() || !Gs(o, n, r));
        }
        if (e.segments.length === n.length) {
          if (!Gn(e.segments, n) || !Gs(e.segments, n, r)) return !1;
          for (const o in t.children)
            if (!e.children[o] || !Av(e.children[o], t.children[o], r))
              return !1;
          return !0;
        }
        {
          const o = n.slice(0, e.segments.length),
            i = n.slice(e.segments.length);
          return (
            !!(Gn(e.segments, o) && Gs(e.segments, o, r) && e.children[$]) &&
            Rv(e.children[$], t, i, r)
          );
        }
      }
      function Gs(e, t, n) {
        return t.every((r, o) => Sv[n](e[o].parameters, r.parameters));
      }
      class _n {
        constructor(t = new H([], {}), n = {}, r = null) {
          (this.root = t), (this.queryParams = n), (this.fragment = r);
        }
        get queryParamMap() {
          return (
            this._queryParamMap || (this._queryParamMap = Lr(this.queryParams)),
            this._queryParamMap
          );
        }
        toString() {
          return ux.serialize(this);
        }
      }
      class H {
        constructor(t, n) {
          (this.segments = t),
            (this.children = n),
            (this.parent = null),
            Ae(n, (r, o) => (r.parent = this));
        }
        hasChildren() {
          return this.numberOfChildren > 0;
        }
        get numberOfChildren() {
          return Object.keys(this.children).length;
        }
        toString() {
          return Ws(this);
        }
      }
      class qo {
        constructor(t, n) {
          (this.path = t), (this.parameters = n);
        }
        get parameterMap() {
          return (
            this._parameterMap || (this._parameterMap = Lr(this.parameters)),
            this._parameterMap
          );
        }
        toString() {
          return Ov(this);
        }
      }
      function Gn(e, t) {
        return e.length === t.length && e.every((n, r) => n.path === t[r].path);
      }
      let Qo = (() => {
        class e {}
        return (
          (e.ɵfac = function (n) {
            return new (n || e)();
          }),
          (e.ɵprov = M({
            token: e,
            factory: function () {
              return new xc();
            },
            providedIn: "root",
          })),
          e
        );
      })();
      class xc {
        parse(t) {
          const n = new yx(t);
          return new _n(
            n.parseRootSegment(),
            n.parseQueryParams(),
            n.parseFragment()
          );
        }
        serialize(t) {
          const n = `/${Yo(t.root, !0)}`,
            r = (function dx(e) {
              const t = Object.keys(e)
                .map((n) => {
                  const r = e[n];
                  return Array.isArray(r)
                    ? r.map((o) => `${qs(n)}=${qs(o)}`).join("&")
                    : `${qs(n)}=${qs(r)}`;
                })
                .filter((n) => !!n);
              return t.length ? `?${t.join("&")}` : "";
            })(t.queryParams);
          return `${n}${r}${
            "string" == typeof t.fragment
              ? `#${(function lx(e) {
                  return encodeURI(e);
                })(t.fragment)}`
              : ""
          }`;
        }
      }
      const ux = new xc();
      function Ws(e) {
        return e.segments.map((t) => Ov(t)).join("/");
      }
      function Yo(e, t) {
        if (!e.hasChildren()) return Ws(e);
        if (t) {
          const n = e.children[$] ? Yo(e.children[$], !1) : "",
            r = [];
          return (
            Ae(e.children, (o, i) => {
              i !== $ && r.push(`${i}:${Yo(o, !1)}`);
            }),
            r.length > 0 ? `${n}(${r.join("//")})` : n
          );
        }
        {
          const n = (function ax(e, t) {
            let n = [];
            return (
              Ae(e.children, (r, o) => {
                o === $ && (n = n.concat(t(r, o)));
              }),
              Ae(e.children, (r, o) => {
                o !== $ && (n = n.concat(t(r, o)));
              }),
              n
            );
          })(e, (r, o) =>
            o === $ ? [Yo(e.children[$], !1)] : [`${o}:${Yo(r, !1)}`]
          );
          return 1 === Object.keys(e.children).length && null != e.children[$]
            ? `${Ws(e)}/${n[0]}`
            : `${Ws(e)}/(${n.join("//")})`;
        }
      }
      function xv(e) {
        return encodeURIComponent(e)
          .replace(/%40/g, "@")
          .replace(/%3A/gi, ":")
          .replace(/%24/g, "$")
          .replace(/%2C/gi, ",");
      }
      function qs(e) {
        return xv(e).replace(/%3B/gi, ";");
      }
      function Pc(e) {
        return xv(e)
          .replace(/\(/g, "%28")
          .replace(/\)/g, "%29")
          .replace(/%26/gi, "&");
      }
      function Qs(e) {
        return decodeURIComponent(e);
      }
      function Pv(e) {
        return Qs(e.replace(/\+/g, "%20"));
      }
      function Ov(e) {
        return `${Pc(e.path)}${(function cx(e) {
          return Object.keys(e)
            .map((t) => `;${Pc(t)}=${Pc(e[t])}`)
            .join("");
        })(e.parameters)}`;
      }
      const fx = /^[^\/()?;=#]+/;
      function Ys(e) {
        const t = e.match(fx);
        return t ? t[0] : "";
      }
      const hx = /^[^=?&#]+/,
        gx = /^[^&#]+/;
      class yx {
        constructor(t) {
          (this.url = t), (this.remaining = t);
        }
        parseRootSegment() {
          return (
            this.consumeOptional("/"),
            "" === this.remaining ||
            this.peekStartsWith("?") ||
            this.peekStartsWith("#")
              ? new H([], {})
              : new H([], this.parseChildren())
          );
        }
        parseQueryParams() {
          const t = {};
          if (this.consumeOptional("?"))
            do {
              this.parseQueryParam(t);
            } while (this.consumeOptional("&"));
          return t;
        }
        parseFragment() {
          return this.consumeOptional("#")
            ? decodeURIComponent(this.remaining)
            : null;
        }
        parseChildren() {
          if ("" === this.remaining) return {};
          this.consumeOptional("/");
          const t = [];
          for (
            this.peekStartsWith("(") || t.push(this.parseSegment());
            this.peekStartsWith("/") &&
            !this.peekStartsWith("//") &&
            !this.peekStartsWith("/(");

          )
            this.capture("/"), t.push(this.parseSegment());
          let n = {};
          this.peekStartsWith("/(") &&
            (this.capture("/"), (n = this.parseParens(!0)));
          let r = {};
          return (
            this.peekStartsWith("(") && (r = this.parseParens(!1)),
            (t.length > 0 || Object.keys(n).length > 0) && (r[$] = new H(t, n)),
            r
          );
        }
        parseSegment() {
          const t = Ys(this.remaining);
          if ("" === t && this.peekStartsWith(";")) throw new w(4009, zs);
          return this.capture(t), new qo(Qs(t), this.parseMatrixParams());
        }
        parseMatrixParams() {
          const t = {};
          for (; this.consumeOptional(";"); ) this.parseParam(t);
          return t;
        }
        parseParam(t) {
          const n = Ys(this.remaining);
          if (!n) return;
          this.capture(n);
          let r = "";
          if (this.consumeOptional("=")) {
            const o = Ys(this.remaining);
            o && ((r = o), this.capture(r));
          }
          t[Qs(n)] = Qs(r);
        }
        parseQueryParam(t) {
          const n = (function px(e) {
            const t = e.match(hx);
            return t ? t[0] : "";
          })(this.remaining);
          if (!n) return;
          this.capture(n);
          let r = "";
          if (this.consumeOptional("=")) {
            const s = (function mx(e) {
              const t = e.match(gx);
              return t ? t[0] : "";
            })(this.remaining);
            s && ((r = s), this.capture(r));
          }
          const o = Pv(n),
            i = Pv(r);
          if (t.hasOwnProperty(o)) {
            let s = t[o];
            Array.isArray(s) || ((s = [s]), (t[o] = s)), s.push(i);
          } else t[o] = i;
        }
        parseParens(t) {
          const n = {};
          for (
            this.capture("(");
            !this.consumeOptional(")") && this.remaining.length > 0;

          ) {
            const r = Ys(this.remaining),
              o = this.remaining[r.length];
            if ("/" !== o && ")" !== o && ";" !== o) throw new w(4010, zs);
            let i;
            r.indexOf(":") > -1
              ? ((i = r.slice(0, r.indexOf(":"))),
                this.capture(i),
                this.capture(":"))
              : t && (i = $);
            const s = this.parseChildren();
            (n[i] = 1 === Object.keys(s).length ? s[$] : new H([], s)),
              this.consumeOptional("//");
          }
          return n;
        }
        peekStartsWith(t) {
          return this.remaining.startsWith(t);
        }
        consumeOptional(t) {
          return (
            !!this.peekStartsWith(t) &&
            ((this.remaining = this.remaining.substring(t.length)), !0)
          );
        }
        capture(t) {
          if (!this.consumeOptional(t)) throw new w(4011, zs);
        }
      }
      function Oc(e) {
        return e.segments.length > 0 ? new H([], { [$]: e }) : e;
      }
      function Zs(e) {
        const t = {};
        for (const r of Object.keys(e.children)) {
          const i = Zs(e.children[r]);
          (i.segments.length > 0 || i.hasChildren()) && (t[r] = i);
        }
        return (function vx(e) {
          if (1 === e.numberOfChildren && e.children[$]) {
            const t = e.children[$];
            return new H(e.segments.concat(t.segments), t.children);
          }
          return e;
        })(new H(e.segments, t));
      }
      function Wn(e) {
        return e instanceof _n;
      }
      const Nc = !1;
      function Dx(e, t, n, r, o) {
        if (0 === n.length) return jr(t.root, t.root, t.root, r, o);
        const i = (function jv(e) {
          if ("string" == typeof e[0] && 1 === e.length && "/" === e[0])
            return new Lv(!0, 0, e);
          let t = 0,
            n = !1;
          const r = e.reduce((o, i, s) => {
            if ("object" == typeof i && null != i) {
              if (i.outlets) {
                const a = {};
                return (
                  Ae(i.outlets, (u, l) => {
                    a[l] = "string" == typeof u ? u.split("/") : u;
                  }),
                  [...o, { outlets: a }]
                );
              }
              if (i.segmentPath) return [...o, i.segmentPath];
            }
            return "string" != typeof i
              ? [...o, i]
              : 0 === s
              ? (i.split("/").forEach((a, u) => {
                  (0 == u && "." === a) ||
                    (0 == u && "" === a
                      ? (n = !0)
                      : ".." === a
                      ? t++
                      : "" != a && o.push(a));
                }),
                o)
              : [...o, i];
          }, []);
          return new Lv(n, t, r);
        })(n);
        return i.toRoot()
          ? jr(t.root, t.root, new H([], {}), r, o)
          : (function s(u) {
              const l = (function Cx(e, t, n, r) {
                  if (e.isAbsolute) return new $r(t.root, !0, 0);
                  if (-1 === r) return new $r(n, n === t.root, 0);
                  return (function $v(e, t, n) {
                    let r = e,
                      o = t,
                      i = n;
                    for (; i > o; ) {
                      if (((i -= o), (r = r.parent), !r))
                        throw new w(4005, Nc && "Invalid number of '../'");
                      o = r.segments.length;
                    }
                    return new $r(r, !1, o - i);
                  })(n, r + (Zo(e.commands[0]) ? 0 : 1), e.numberOfDoubleDots);
                })(i, t, e.snapshot?._urlSegment, u),
                c = l.processChildren
                  ? Br(l.segmentGroup, l.index, i.commands)
                  : Fc(l.segmentGroup, l.index, i.commands);
              return jr(t.root, l.segmentGroup, c, r, o);
            })(e.snapshot?._lastPathIndex);
      }
      function Zo(e) {
        return (
          "object" == typeof e && null != e && !e.outlets && !e.segmentPath
        );
      }
      function Ko(e) {
        return "object" == typeof e && null != e && e.outlets;
      }
      function jr(e, t, n, r, o) {
        let s,
          i = {};
        r &&
          Ae(r, (u, l) => {
            i[l] = Array.isArray(u) ? u.map((c) => `${c}`) : `${u}`;
          }),
          (s = e === t ? n : kv(e, t, n));
        const a = Oc(Zs(s));
        return new _n(a, i, o);
      }
      function kv(e, t, n) {
        const r = {};
        return (
          Ae(e.children, (o, i) => {
            r[i] = o === t ? n : kv(o, t, n);
          }),
          new H(e.segments, r)
        );
      }
      class Lv {
        constructor(t, n, r) {
          if (
            ((this.isAbsolute = t),
            (this.numberOfDoubleDots = n),
            (this.commands = r),
            t && r.length > 0 && Zo(r[0]))
          )
            throw new w(
              4003,
              Nc && "Root segment cannot have matrix parameters"
            );
          const o = r.find(Ko);
          if (o && o !== Iv(r))
            throw new w(4004, Nc && "{outlets:{}} has to be the last command");
        }
        toRoot() {
          return (
            this.isAbsolute &&
            1 === this.commands.length &&
            "/" == this.commands[0]
          );
        }
      }
      class $r {
        constructor(t, n, r) {
          (this.segmentGroup = t), (this.processChildren = n), (this.index = r);
        }
      }
      function Fc(e, t, n) {
        if (
          (e || (e = new H([], {})), 0 === e.segments.length && e.hasChildren())
        )
          return Br(e, t, n);
        const r = (function Ex(e, t, n) {
            let r = 0,
              o = t;
            const i = { match: !1, pathIndex: 0, commandIndex: 0 };
            for (; o < e.segments.length; ) {
              if (r >= n.length) return i;
              const s = e.segments[o],
                a = n[r];
              if (Ko(a)) break;
              const u = `${a}`,
                l = r < n.length - 1 ? n[r + 1] : null;
              if (o > 0 && void 0 === u) break;
              if (u && l && "object" == typeof l && void 0 === l.outlets) {
                if (!Vv(u, l, s)) return i;
                r += 2;
              } else {
                if (!Vv(u, {}, s)) return i;
                r++;
              }
              o++;
            }
            return { match: !0, pathIndex: o, commandIndex: r };
          })(e, t, n),
          o = n.slice(r.commandIndex);
        if (r.match && r.pathIndex < e.segments.length) {
          const i = new H(e.segments.slice(0, r.pathIndex), {});
          return (
            (i.children[$] = new H(e.segments.slice(r.pathIndex), e.children)),
            Br(i, 0, o)
          );
        }
        return r.match && 0 === o.length
          ? new H(e.segments, {})
          : r.match && !e.hasChildren()
          ? kc(e, t, n)
          : r.match
          ? Br(e, 0, o)
          : kc(e, t, n);
      }
      function Br(e, t, n) {
        if (0 === n.length) return new H(e.segments, {});
        {
          const r = (function _x(e) {
              return Ko(e[0]) ? e[0].outlets : { [$]: e };
            })(n),
            o = {};
          if (
            !r[$] &&
            e.children[$] &&
            1 === e.numberOfChildren &&
            0 === e.children[$].segments.length
          ) {
            const i = Br(e.children[$], t, n);
            return new H(e.segments, i.children);
          }
          return (
            Ae(r, (i, s) => {
              "string" == typeof i && (i = [i]),
                null !== i && (o[s] = Fc(e.children[s], t, i));
            }),
            Ae(e.children, (i, s) => {
              void 0 === r[s] && (o[s] = i);
            }),
            new H(e.segments, o)
          );
        }
      }
      function kc(e, t, n) {
        const r = e.segments.slice(0, t);
        let o = 0;
        for (; o < n.length; ) {
          const i = n[o];
          if (Ko(i)) {
            const u = bx(i.outlets);
            return new H(r, u);
          }
          if (0 === o && Zo(n[0])) {
            r.push(new qo(e.segments[t].path, Bv(n[0]))), o++;
            continue;
          }
          const s = Ko(i) ? i.outlets[$] : `${i}`,
            a = o < n.length - 1 ? n[o + 1] : null;
          s && a && Zo(a)
            ? (r.push(new qo(s, Bv(a))), (o += 2))
            : (r.push(new qo(s, {})), o++);
        }
        return new H(r, {});
      }
      function bx(e) {
        const t = {};
        return (
          Ae(e, (n, r) => {
            "string" == typeof n && (n = [n]),
              null !== n && (t[r] = kc(new H([], {}), 0, n));
          }),
          t
        );
      }
      function Bv(e) {
        const t = {};
        return Ae(e, (n, r) => (t[r] = `${n}`)), t;
      }
      function Vv(e, t, n) {
        return e == n.path && Ut(t, n.parameters);
      }
      const Jo = "imperative";
      class Ht {
        constructor(t, n) {
          (this.id = t), (this.url = n);
        }
      }
      class Lc extends Ht {
        constructor(t, n, r = "imperative", o = null) {
          super(t, n),
            (this.type = 0),
            (this.navigationTrigger = r),
            (this.restoredState = o);
        }
        toString() {
          return `NavigationStart(id: ${this.id}, url: '${this.url}')`;
        }
      }
      class qn extends Ht {
        constructor(t, n, r) {
          super(t, n), (this.urlAfterRedirects = r), (this.type = 1);
        }
        toString() {
          return `NavigationEnd(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}')`;
        }
      }
      class Ks extends Ht {
        constructor(t, n, r, o) {
          super(t, n), (this.reason = r), (this.code = o), (this.type = 2);
        }
        toString() {
          return `NavigationCancel(id: ${this.id}, url: '${this.url}')`;
        }
      }
      class Js extends Ht {
        constructor(t, n, r, o) {
          super(t, n), (this.reason = r), (this.code = o), (this.type = 16);
        }
      }
      class jc extends Ht {
        constructor(t, n, r, o) {
          super(t, n), (this.error = r), (this.target = o), (this.type = 3);
        }
        toString() {
          return `NavigationError(id: ${this.id}, url: '${this.url}', error: ${this.error})`;
        }
      }
      class Ix extends Ht {
        constructor(t, n, r, o) {
          super(t, n),
            (this.urlAfterRedirects = r),
            (this.state = o),
            (this.type = 4);
        }
        toString() {
          return `RoutesRecognized(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state})`;
        }
      }
      class Sx extends Ht {
        constructor(t, n, r, o) {
          super(t, n),
            (this.urlAfterRedirects = r),
            (this.state = o),
            (this.type = 7);
        }
        toString() {
          return `GuardsCheckStart(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state})`;
        }
      }
      class Mx extends Ht {
        constructor(t, n, r, o, i) {
          super(t, n),
            (this.urlAfterRedirects = r),
            (this.state = o),
            (this.shouldActivate = i),
            (this.type = 8);
        }
        toString() {
          return `GuardsCheckEnd(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state}, shouldActivate: ${this.shouldActivate})`;
        }
      }
      class Tx extends Ht {
        constructor(t, n, r, o) {
          super(t, n),
            (this.urlAfterRedirects = r),
            (this.state = o),
            (this.type = 5);
        }
        toString() {
          return `ResolveStart(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state})`;
        }
      }
      class Ax extends Ht {
        constructor(t, n, r, o) {
          super(t, n),
            (this.urlAfterRedirects = r),
            (this.state = o),
            (this.type = 6);
        }
        toString() {
          return `ResolveEnd(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state})`;
        }
      }
      class Rx {
        constructor(t) {
          (this.route = t), (this.type = 9);
        }
        toString() {
          return `RouteConfigLoadStart(path: ${this.route.path})`;
        }
      }
      class xx {
        constructor(t) {
          (this.route = t), (this.type = 10);
        }
        toString() {
          return `RouteConfigLoadEnd(path: ${this.route.path})`;
        }
      }
      class Px {
        constructor(t) {
          (this.snapshot = t), (this.type = 11);
        }
        toString() {
          return `ChildActivationStart(path: '${
            (this.snapshot.routeConfig && this.snapshot.routeConfig.path) || ""
          }')`;
        }
      }
      class Ox {
        constructor(t) {
          (this.snapshot = t), (this.type = 12);
        }
        toString() {
          return `ChildActivationEnd(path: '${
            (this.snapshot.routeConfig && this.snapshot.routeConfig.path) || ""
          }')`;
        }
      }
      class Nx {
        constructor(t) {
          (this.snapshot = t), (this.type = 13);
        }
        toString() {
          return `ActivationStart(path: '${
            (this.snapshot.routeConfig && this.snapshot.routeConfig.path) || ""
          }')`;
        }
      }
      class Fx {
        constructor(t) {
          (this.snapshot = t), (this.type = 14);
        }
        toString() {
          return `ActivationEnd(path: '${
            (this.snapshot.routeConfig && this.snapshot.routeConfig.path) || ""
          }')`;
        }
      }
      class Uv {
        constructor(t, n, r) {
          (this.routerEvent = t),
            (this.position = n),
            (this.anchor = r),
            (this.type = 15);
        }
        toString() {
          return `Scroll(anchor: '${this.anchor}', position: '${
            this.position ? `${this.position[0]}, ${this.position[1]}` : null
          }')`;
        }
      }
      let jx = (() => {
          class e {
            createUrlTree(n, r, o, i, s, a) {
              return Dx(n || r.root, o, i, s, a);
            }
          }
          return (
            (e.ɵfac = function (n) {
              return new (n || e)();
            }),
            (e.ɵprov = M({ token: e, factory: e.ɵfac })),
            e
          );
        })(),
        Bx = (() => {
          class e {}
          return (
            (e.ɵfac = function (n) {
              return new (n || e)();
            }),
            (e.ɵprov = M({
              token: e,
              factory: function (t) {
                return jx.ɵfac(t);
              },
              providedIn: "root",
            })),
            e
          );
        })();
      class Hv {
        constructor(t) {
          this._root = t;
        }
        get root() {
          return this._root.value;
        }
        parent(t) {
          const n = this.pathFromRoot(t);
          return n.length > 1 ? n[n.length - 2] : null;
        }
        children(t) {
          const n = $c(t, this._root);
          return n ? n.children.map((r) => r.value) : [];
        }
        firstChild(t) {
          const n = $c(t, this._root);
          return n && n.children.length > 0 ? n.children[0].value : null;
        }
        siblings(t) {
          const n = Bc(t, this._root);
          return n.length < 2
            ? []
            : n[n.length - 2].children
                .map((o) => o.value)
                .filter((o) => o !== t);
        }
        pathFromRoot(t) {
          return Bc(t, this._root).map((n) => n.value);
        }
      }
      function $c(e, t) {
        if (e === t.value) return t;
        for (const n of t.children) {
          const r = $c(e, n);
          if (r) return r;
        }
        return null;
      }
      function Bc(e, t) {
        if (e === t.value) return [t];
        for (const n of t.children) {
          const r = Bc(e, n);
          if (r.length) return r.unshift(t), r;
        }
        return [];
      }
      class cn {
        constructor(t, n) {
          (this.value = t), (this.children = n);
        }
        toString() {
          return `TreeNode(${this.value})`;
        }
      }
      function Vr(e) {
        const t = {};
        return e && e.children.forEach((n) => (t[n.value.outlet] = n)), t;
      }
      class zv extends Hv {
        constructor(t, n) {
          super(t), (this.snapshot = n), Vc(this, t);
        }
        toString() {
          return this.snapshot.toString();
        }
      }
      function Gv(e, t) {
        const n = (function Vx(e, t) {
            const s = new Xs([], {}, {}, "", {}, $, t, null, e.root, -1, {});
            return new qv("", new cn(s, []));
          })(e, t),
          r = new Mt([new qo("", {})]),
          o = new Mt({}),
          i = new Mt({}),
          s = new Mt({}),
          a = new Mt(""),
          u = new Ur(r, o, s, a, i, $, t, n.root);
        return (u.snapshot = n.root), new zv(new cn(u, []), n);
      }
      class Ur {
        constructor(t, n, r, o, i, s, a, u) {
          (this.url = t),
            (this.params = n),
            (this.queryParams = r),
            (this.fragment = o),
            (this.data = i),
            (this.outlet = s),
            (this.component = a),
            (this.title = this.data?.pipe(z((l) => l[Wo])) ?? A(void 0)),
            (this._futureSnapshot = u);
        }
        get routeConfig() {
          return this._futureSnapshot.routeConfig;
        }
        get root() {
          return this._routerState.root;
        }
        get parent() {
          return this._routerState.parent(this);
        }
        get firstChild() {
          return this._routerState.firstChild(this);
        }
        get children() {
          return this._routerState.children(this);
        }
        get pathFromRoot() {
          return this._routerState.pathFromRoot(this);
        }
        get paramMap() {
          return (
            this._paramMap ||
              (this._paramMap = this.params.pipe(z((t) => Lr(t)))),
            this._paramMap
          );
        }
        get queryParamMap() {
          return (
            this._queryParamMap ||
              (this._queryParamMap = this.queryParams.pipe(z((t) => Lr(t)))),
            this._queryParamMap
          );
        }
        toString() {
          return this.snapshot
            ? this.snapshot.toString()
            : `Future(${this._futureSnapshot})`;
        }
      }
      function Wv(e, t = "emptyOnly") {
        const n = e.pathFromRoot;
        let r = 0;
        if ("always" !== t)
          for (r = n.length - 1; r >= 1; ) {
            const o = n[r],
              i = n[r - 1];
            if (o.routeConfig && "" === o.routeConfig.path) r--;
            else {
              if (i.component) break;
              r--;
            }
          }
        return (function Ux(e) {
          return e.reduce(
            (t, n) => ({
              params: { ...t.params, ...n.params },
              data: { ...t.data, ...n.data },
              resolve: {
                ...n.data,
                ...t.resolve,
                ...n.routeConfig?.data,
                ...n._resolvedData,
              },
            }),
            { params: {}, data: {}, resolve: {} }
          );
        })(n.slice(r));
      }
      class Xs {
        get title() {
          return this.data?.[Wo];
        }
        constructor(t, n, r, o, i, s, a, u, l, c, d) {
          (this.url = t),
            (this.params = n),
            (this.queryParams = r),
            (this.fragment = o),
            (this.data = i),
            (this.outlet = s),
            (this.component = a),
            (this.routeConfig = u),
            (this._urlSegment = l),
            (this._lastPathIndex = c),
            (this._resolve = d);
        }
        get root() {
          return this._routerState.root;
        }
        get parent() {
          return this._routerState.parent(this);
        }
        get firstChild() {
          return this._routerState.firstChild(this);
        }
        get children() {
          return this._routerState.children(this);
        }
        get pathFromRoot() {
          return this._routerState.pathFromRoot(this);
        }
        get paramMap() {
          return (
            this._paramMap || (this._paramMap = Lr(this.params)), this._paramMap
          );
        }
        get queryParamMap() {
          return (
            this._queryParamMap || (this._queryParamMap = Lr(this.queryParams)),
            this._queryParamMap
          );
        }
        toString() {
          return `Route(url:'${this.url
            .map((r) => r.toString())
            .join("/")}', path:'${
            this.routeConfig ? this.routeConfig.path : ""
          }')`;
        }
      }
      class qv extends Hv {
        constructor(t, n) {
          super(n), (this.url = t), Vc(this, n);
        }
        toString() {
          return Qv(this._root);
        }
      }
      function Vc(e, t) {
        (t.value._routerState = e), t.children.forEach((n) => Vc(e, n));
      }
      function Qv(e) {
        const t =
          e.children.length > 0 ? ` { ${e.children.map(Qv).join(", ")} } ` : "";
        return `${e.value}${t}`;
      }
      function Uc(e) {
        if (e.snapshot) {
          const t = e.snapshot,
            n = e._futureSnapshot;
          (e.snapshot = n),
            Ut(t.queryParams, n.queryParams) ||
              e.queryParams.next(n.queryParams),
            t.fragment !== n.fragment && e.fragment.next(n.fragment),
            Ut(t.params, n.params) || e.params.next(n.params),
            (function nx(e, t) {
              if (e.length !== t.length) return !1;
              for (let n = 0; n < e.length; ++n) if (!Ut(e[n], t[n])) return !1;
              return !0;
            })(t.url, n.url) || e.url.next(n.url),
            Ut(t.data, n.data) || e.data.next(n.data);
        } else
          (e.snapshot = e._futureSnapshot), e.data.next(e._futureSnapshot.data);
      }
      function Hc(e, t) {
        const n =
          Ut(e.params, t.params) &&
          (function sx(e, t) {
            return (
              Gn(e, t) && e.every((n, r) => Ut(n.parameters, t[r].parameters))
            );
          })(e.url, t.url);
        return (
          n &&
          !(!e.parent != !t.parent) &&
          (!e.parent || Hc(e.parent, t.parent))
        );
      }
      function Xo(e, t, n) {
        if (n && e.shouldReuseRoute(t.value, n.value.snapshot)) {
          const r = n.value;
          r._futureSnapshot = t.value;
          const o = (function zx(e, t, n) {
            return t.children.map((r) => {
              for (const o of n.children)
                if (e.shouldReuseRoute(r.value, o.value.snapshot))
                  return Xo(e, r, o);
              return Xo(e, r);
            });
          })(e, t, n);
          return new cn(r, o);
        }
        {
          if (e.shouldAttach(t.value)) {
            const i = e.retrieve(t.value);
            if (null !== i) {
              const s = i.route;
              return (
                (s.value._futureSnapshot = t.value),
                (s.children = t.children.map((a) => Xo(e, a))),
                s
              );
            }
          }
          const r = (function Gx(e) {
              return new Ur(
                new Mt(e.url),
                new Mt(e.params),
                new Mt(e.queryParams),
                new Mt(e.fragment),
                new Mt(e.data),
                e.outlet,
                e.component,
                e
              );
            })(t.value),
            o = t.children.map((i) => Xo(e, i));
          return new cn(r, o);
        }
      }
      const zc = "ngNavigationCancelingError";
      function Yv(e, t) {
        const { redirectTo: n, navigationBehaviorOptions: r } = Wn(t)
            ? { redirectTo: t, navigationBehaviorOptions: void 0 }
            : t,
          o = Zv(!1, 0, t);
        return (o.url = n), (o.navigationBehaviorOptions = r), o;
      }
      function Zv(e, t, n) {
        const r = new Error("NavigationCancelingError: " + (e || ""));
        return (r[zc] = !0), (r.cancellationCode = t), n && (r.url = n), r;
      }
      function Kv(e) {
        return Jv(e) && Wn(e.url);
      }
      function Jv(e) {
        return e && e[zc];
      }
      class Wx {
        constructor() {
          (this.outlet = null),
            (this.route = null),
            (this.resolver = null),
            (this.injector = null),
            (this.children = new ei()),
            (this.attachRef = null);
        }
      }
      let ei = (() => {
        class e {
          constructor() {
            this.contexts = new Map();
          }
          onChildOutletCreated(n, r) {
            const o = this.getOrCreateContext(n);
            (o.outlet = r), this.contexts.set(n, o);
          }
          onChildOutletDestroyed(n) {
            const r = this.getContext(n);
            r && ((r.outlet = null), (r.attachRef = null));
          }
          onOutletDeactivated() {
            const n = this.contexts;
            return (this.contexts = new Map()), n;
          }
          onOutletReAttached(n) {
            this.contexts = n;
          }
          getOrCreateContext(n) {
            let r = this.getContext(n);
            return r || ((r = new Wx()), this.contexts.set(n, r)), r;
          }
          getContext(n) {
            return this.contexts.get(n) || null;
          }
        }
        return (
          (e.ɵfac = function (n) {
            return new (n || e)();
          }),
          (e.ɵprov = M({ token: e, factory: e.ɵfac, providedIn: "root" })),
          e
        );
      })();
      const ea = !1;
      let Xv = (() => {
        class e {
          constructor() {
            (this.activated = null),
              (this._activatedRoute = null),
              (this.name = $),
              (this.activateEvents = new He()),
              (this.deactivateEvents = new He()),
              (this.attachEvents = new He()),
              (this.detachEvents = new He()),
              (this.parentContexts = W(ei)),
              (this.location = W(Et)),
              (this.changeDetector = W(ql)),
              (this.environmentInjector = W(Jt));
          }
          ngOnChanges(n) {
            if (n.name) {
              const { firstChange: r, previousValue: o } = n.name;
              if (r) return;
              this.isTrackedInParentContexts(o) &&
                (this.deactivate(),
                this.parentContexts.onChildOutletDestroyed(o)),
                this.initializeOutletWithName();
            }
          }
          ngOnDestroy() {
            this.isTrackedInParentContexts(this.name) &&
              this.parentContexts.onChildOutletDestroyed(this.name);
          }
          isTrackedInParentContexts(n) {
            return this.parentContexts.getContext(n)?.outlet === this;
          }
          ngOnInit() {
            this.initializeOutletWithName();
          }
          initializeOutletWithName() {
            if (
              (this.parentContexts.onChildOutletCreated(this.name, this),
              this.activated)
            )
              return;
            const n = this.parentContexts.getContext(this.name);
            n?.route &&
              (n.attachRef
                ? this.attach(n.attachRef, n.route)
                : this.activateWith(n.route, n.injector));
          }
          get isActivated() {
            return !!this.activated;
          }
          get component() {
            if (!this.activated) throw new w(4012, ea);
            return this.activated.instance;
          }
          get activatedRoute() {
            if (!this.activated) throw new w(4012, ea);
            return this._activatedRoute;
          }
          get activatedRouteData() {
            return this._activatedRoute
              ? this._activatedRoute.snapshot.data
              : {};
          }
          detach() {
            if (!this.activated) throw new w(4012, ea);
            this.location.detach();
            const n = this.activated;
            return (
              (this.activated = null),
              (this._activatedRoute = null),
              this.detachEvents.emit(n.instance),
              n
            );
          }
          attach(n, r) {
            (this.activated = n),
              (this._activatedRoute = r),
              this.location.insert(n.hostView),
              this.attachEvents.emit(n.instance);
          }
          deactivate() {
            if (this.activated) {
              const n = this.component;
              this.activated.destroy(),
                (this.activated = null),
                (this._activatedRoute = null),
                this.deactivateEvents.emit(n);
            }
          }
          activateWith(n, r) {
            if (this.isActivated) throw new w(4013, ea);
            this._activatedRoute = n;
            const o = this.location,
              s = n.snapshot.component,
              a = this.parentContexts.getOrCreateContext(this.name).children,
              u = new qx(n, a, o.injector);
            if (
              r &&
              (function Qx(e) {
                return !!e.resolveComponentFactory;
              })(r)
            ) {
              const l = r.resolveComponentFactory(s);
              this.activated = o.createComponent(l, o.length, u);
            } else
              this.activated = o.createComponent(s, {
                index: o.length,
                injector: u,
                environmentInjector: r ?? this.environmentInjector,
              });
            this.changeDetector.markForCheck(),
              this.activateEvents.emit(this.activated.instance);
          }
        }
        return (
          (e.ɵfac = function (n) {
            return new (n || e)();
          }),
          (e.ɵdir = Re({
            type: e,
            selectors: [["router-outlet"]],
            inputs: { name: "name" },
            outputs: {
              activateEvents: "activate",
              deactivateEvents: "deactivate",
              attachEvents: "attach",
              detachEvents: "detach",
            },
            exportAs: ["outlet"],
            standalone: !0,
            features: [xn],
          })),
          e
        );
      })();
      class qx {
        constructor(t, n, r) {
          (this.route = t), (this.childContexts = n), (this.parent = r);
        }
        get(t, n) {
          return t === Ur
            ? this.route
            : t === ei
            ? this.childContexts
            : this.parent.get(t, n);
        }
      }
      let Gc = (() => {
        class e {}
        return (
          (e.ɵfac = function (n) {
            return new (n || e)();
          }),
          (e.ɵcmp = Pt({
            type: e,
            selectors: [["ng-component"]],
            standalone: !0,
            features: [sm],
            decls: 1,
            vars: 0,
            template: function (n, r) {
              1 & n && Ve(0, "router-outlet");
            },
            dependencies: [Xv],
            encapsulation: 2,
          })),
          e
        );
      })();
      function eD(e, t) {
        return (
          e.providers &&
            !e._injector &&
            (e._injector = gs(e.providers, t, `Route: ${e.path}`)),
          e._injector ?? t
        );
      }
      function qc(e) {
        const t = e.children && e.children.map(qc),
          n = t ? { ...e, children: t } : { ...e };
        return (
          !n.component &&
            !n.loadComponent &&
            (t || n.loadChildren) &&
            n.outlet &&
            n.outlet !== $ &&
            (n.component = Gc),
          n
        );
      }
      function mt(e) {
        return e.outlet || $;
      }
      function tD(e, t) {
        const n = e.filter((r) => mt(r) === t);
        return n.push(...e.filter((r) => mt(r) !== t)), n;
      }
      function ti(e) {
        if (!e) return null;
        if (e.routeConfig?._injector) return e.routeConfig._injector;
        for (let t = e.parent; t; t = t.parent) {
          const n = t.routeConfig;
          if (n?._loadedInjector) return n._loadedInjector;
          if (n?._injector) return n._injector;
        }
        return null;
      }
      class Xx {
        constructor(t, n, r, o) {
          (this.routeReuseStrategy = t),
            (this.futureState = n),
            (this.currState = r),
            (this.forwardEvent = o);
        }
        activate(t) {
          const n = this.futureState._root,
            r = this.currState ? this.currState._root : null;
          this.deactivateChildRoutes(n, r, t),
            Uc(this.futureState.root),
            this.activateChildRoutes(n, r, t);
        }
        deactivateChildRoutes(t, n, r) {
          const o = Vr(n);
          t.children.forEach((i) => {
            const s = i.value.outlet;
            this.deactivateRoutes(i, o[s], r), delete o[s];
          }),
            Ae(o, (i, s) => {
              this.deactivateRouteAndItsChildren(i, r);
            });
        }
        deactivateRoutes(t, n, r) {
          const o = t.value,
            i = n ? n.value : null;
          if (o === i)
            if (o.component) {
              const s = r.getContext(o.outlet);
              s && this.deactivateChildRoutes(t, n, s.children);
            } else this.deactivateChildRoutes(t, n, r);
          else i && this.deactivateRouteAndItsChildren(n, r);
        }
        deactivateRouteAndItsChildren(t, n) {
          t.value.component &&
          this.routeReuseStrategy.shouldDetach(t.value.snapshot)
            ? this.detachAndStoreRouteSubtree(t, n)
            : this.deactivateRouteAndOutlet(t, n);
        }
        detachAndStoreRouteSubtree(t, n) {
          const r = n.getContext(t.value.outlet),
            o = r && t.value.component ? r.children : n,
            i = Vr(t);
          for (const s of Object.keys(i))
            this.deactivateRouteAndItsChildren(i[s], o);
          if (r && r.outlet) {
            const s = r.outlet.detach(),
              a = r.children.onOutletDeactivated();
            this.routeReuseStrategy.store(t.value.snapshot, {
              componentRef: s,
              route: t,
              contexts: a,
            });
          }
        }
        deactivateRouteAndOutlet(t, n) {
          const r = n.getContext(t.value.outlet),
            o = r && t.value.component ? r.children : n,
            i = Vr(t);
          for (const s of Object.keys(i))
            this.deactivateRouteAndItsChildren(i[s], o);
          r &&
            (r.outlet &&
              (r.outlet.deactivate(), r.children.onOutletDeactivated()),
            (r.attachRef = null),
            (r.resolver = null),
            (r.route = null));
        }
        activateChildRoutes(t, n, r) {
          const o = Vr(n);
          t.children.forEach((i) => {
            this.activateRoutes(i, o[i.value.outlet], r),
              this.forwardEvent(new Fx(i.value.snapshot));
          }),
            t.children.length && this.forwardEvent(new Ox(t.value.snapshot));
        }
        activateRoutes(t, n, r) {
          const o = t.value,
            i = n ? n.value : null;
          if ((Uc(o), o === i))
            if (o.component) {
              const s = r.getOrCreateContext(o.outlet);
              this.activateChildRoutes(t, n, s.children);
            } else this.activateChildRoutes(t, n, r);
          else if (o.component) {
            const s = r.getOrCreateContext(o.outlet);
            if (this.routeReuseStrategy.shouldAttach(o.snapshot)) {
              const a = this.routeReuseStrategy.retrieve(o.snapshot);
              this.routeReuseStrategy.store(o.snapshot, null),
                s.children.onOutletReAttached(a.contexts),
                (s.attachRef = a.componentRef),
                (s.route = a.route.value),
                s.outlet && s.outlet.attach(a.componentRef, a.route.value),
                Uc(a.route.value),
                this.activateChildRoutes(t, null, s.children);
            } else {
              const a = ti(o.snapshot),
                u = a?.get(Eo) ?? null;
              (s.attachRef = null),
                (s.route = o),
                (s.resolver = u),
                (s.injector = a),
                s.outlet && s.outlet.activateWith(o, s.injector),
                this.activateChildRoutes(t, null, s.children);
            }
          } else this.activateChildRoutes(t, null, r);
        }
      }
      class nD {
        constructor(t) {
          (this.path = t), (this.route = this.path[this.path.length - 1]);
        }
      }
      class ta {
        constructor(t, n) {
          (this.component = t), (this.route = n);
        }
      }
      function eP(e, t, n) {
        const r = e._root;
        return ni(r, t ? t._root : null, n, [r.value]);
      }
      function Hr(e, t) {
        const n = Symbol(),
          r = t.get(e, n);
        return r === n
          ? "function" != typeof e ||
            (function Bw(e) {
              return null !== gi(e);
            })(e)
            ? t.get(e)
            : e
          : r;
      }
      function ni(
        e,
        t,
        n,
        r,
        o = { canDeactivateChecks: [], canActivateChecks: [] }
      ) {
        const i = Vr(t);
        return (
          e.children.forEach((s) => {
            (function nP(
              e,
              t,
              n,
              r,
              o = { canDeactivateChecks: [], canActivateChecks: [] }
            ) {
              const i = e.value,
                s = t ? t.value : null,
                a = n ? n.getContext(e.value.outlet) : null;
              if (s && i.routeConfig === s.routeConfig) {
                const u = (function rP(e, t, n) {
                  if ("function" == typeof n) return n(e, t);
                  switch (n) {
                    case "pathParamsChange":
                      return !Gn(e.url, t.url);
                    case "pathParamsOrQueryParamsChange":
                      return (
                        !Gn(e.url, t.url) || !Ut(e.queryParams, t.queryParams)
                      );
                    case "always":
                      return !0;
                    case "paramsOrQueryParamsChange":
                      return !Hc(e, t) || !Ut(e.queryParams, t.queryParams);
                    default:
                      return !Hc(e, t);
                  }
                })(s, i, i.routeConfig.runGuardsAndResolvers);
                u
                  ? o.canActivateChecks.push(new nD(r))
                  : ((i.data = s.data), (i._resolvedData = s._resolvedData)),
                  ni(e, t, i.component ? (a ? a.children : null) : n, r, o),
                  u &&
                    a &&
                    a.outlet &&
                    a.outlet.isActivated &&
                    o.canDeactivateChecks.push(new ta(a.outlet.component, s));
              } else
                s && ri(t, a, o),
                  o.canActivateChecks.push(new nD(r)),
                  ni(e, null, i.component ? (a ? a.children : null) : n, r, o);
            })(s, i[s.value.outlet], n, r.concat([s.value]), o),
              delete i[s.value.outlet];
          }),
          Ae(i, (s, a) => ri(s, n.getContext(a), o)),
          o
        );
      }
      function ri(e, t, n) {
        const r = Vr(e),
          o = e.value;
        Ae(r, (i, s) => {
          ri(i, o.component ? (t ? t.children.getContext(s) : null) : t, n);
        }),
          n.canDeactivateChecks.push(
            new ta(
              o.component && t && t.outlet && t.outlet.isActivated
                ? t.outlet.component
                : null,
              o
            )
          );
      }
      function oi(e) {
        return "function" == typeof e;
      }
      function Qc(e) {
        return e instanceof Vs || "EmptyError" === e?.name;
      }
      const na = Symbol("INITIAL_VALUE");
      function zr() {
        return Vt((e) =>
          Mc(e.map((t) => t.pipe(Hn(1), Dv(na)))).pipe(
            z((t) => {
              for (const n of t)
                if (!0 !== n) {
                  if (n === na) return na;
                  if (!1 === n || n instanceof _n) return n;
                }
              return !0;
            }),
            ln((t) => t !== na),
            Hn(1)
          )
        );
      }
      function rD(e) {
        return (function UD(...e) {
          return dd(e);
        })(
          Le((t) => {
            if (Wn(t)) throw Yv(0, t);
          }),
          z((t) => !0 === t)
        );
      }
      const Yc = {
        matched: !1,
        consumedSegments: [],
        remainingSegments: [],
        parameters: {},
        positionalParamSegments: {},
      };
      function oD(e, t, n, r, o) {
        const i = Zc(e, t, n);
        return i.matched
          ? (function wP(e, t, n, r) {
              const o = t.canMatch;
              return o && 0 !== o.length
                ? A(
                    o.map((s) => {
                      const a = Hr(s, e);
                      return Cn(
                        (function lP(e) {
                          return e && oi(e.canMatch);
                        })(a)
                          ? a.canMatch(t, n)
                          : e.runInContext(() => a(t, n))
                      );
                    })
                  ).pipe(zr(), rD())
                : A(!0);
            })((r = eD(t, r)), t, n).pipe(z((s) => (!0 === s ? i : { ...Yc })))
          : A(i);
      }
      function Zc(e, t, n) {
        if ("" === t.path)
          return "full" === t.pathMatch && (e.hasChildren() || n.length > 0)
            ? { ...Yc }
            : {
                matched: !0,
                consumedSegments: [],
                remainingSegments: n,
                parameters: {},
                positionalParamSegments: {},
              };
        const o = (t.matcher || tx)(n, e, t);
        if (!o) return { ...Yc };
        const i = {};
        Ae(o.posParams, (a, u) => {
          i[u] = a.path;
        });
        const s =
          o.consumed.length > 0
            ? { ...i, ...o.consumed[o.consumed.length - 1].parameters }
            : i;
        return {
          matched: !0,
          consumedSegments: o.consumed,
          remainingSegments: n.slice(o.consumed.length),
          parameters: s,
          positionalParamSegments: o.posParams ?? {},
        };
      }
      function ra(e, t, n, r) {
        if (
          n.length > 0 &&
          (function EP(e, t, n) {
            return n.some((r) => oa(e, t, r) && mt(r) !== $);
          })(e, n, r)
        ) {
          const i = new H(
            t,
            (function _P(e, t, n, r) {
              const o = {};
              (o[$] = r),
                (r._sourceSegment = e),
                (r._segmentIndexShift = t.length);
              for (const i of n)
                if ("" === i.path && mt(i) !== $) {
                  const s = new H([], {});
                  (s._sourceSegment = e),
                    (s._segmentIndexShift = t.length),
                    (o[mt(i)] = s);
                }
              return o;
            })(e, t, r, new H(n, e.children))
          );
          return (
            (i._sourceSegment = e),
            (i._segmentIndexShift = t.length),
            { segmentGroup: i, slicedSegments: [] }
          );
        }
        if (
          0 === n.length &&
          (function bP(e, t, n) {
            return n.some((r) => oa(e, t, r));
          })(e, n, r)
        ) {
          const i = new H(
            e.segments,
            (function CP(e, t, n, r, o) {
              const i = {};
              for (const s of r)
                if (oa(e, n, s) && !o[mt(s)]) {
                  const a = new H([], {});
                  (a._sourceSegment = e),
                    (a._segmentIndexShift = t.length),
                    (i[mt(s)] = a);
                }
              return { ...o, ...i };
            })(e, t, n, r, e.children)
          );
          return (
            (i._sourceSegment = e),
            (i._segmentIndexShift = t.length),
            { segmentGroup: i, slicedSegments: n }
          );
        }
        const o = new H(e.segments, e.children);
        return (
          (o._sourceSegment = e),
          (o._segmentIndexShift = t.length),
          { segmentGroup: o, slicedSegments: n }
        );
      }
      function oa(e, t, n) {
        return (
          (!(e.hasChildren() || t.length > 0) || "full" !== n.pathMatch) &&
          "" === n.path
        );
      }
      function iD(e, t, n, r) {
        return (
          !!(mt(e) === r || (r !== $ && oa(t, n, e))) &&
          ("**" === e.path || Zc(t, e, n).matched)
        );
      }
      function sD(e, t, n) {
        return 0 === t.length && !e.children[n];
      }
      const ia = !1;
      class sa {
        constructor(t) {
          this.segmentGroup = t || null;
        }
      }
      class aD {
        constructor(t) {
          this.urlTree = t;
        }
      }
      function ii(e) {
        return Go(new sa(e));
      }
      function uD(e) {
        return Go(new aD(e));
      }
      class TP {
        constructor(t, n, r, o, i) {
          (this.injector = t),
            (this.configLoader = n),
            (this.urlSerializer = r),
            (this.urlTree = o),
            (this.config = i),
            (this.allowRedirects = !0);
        }
        apply() {
          const t = ra(this.urlTree.root, [], [], this.config).segmentGroup,
            n = new H(t.segments, t.children);
          return this.expandSegmentGroup(this.injector, this.config, n, $)
            .pipe(
              z((i) =>
                this.createUrlTree(
                  Zs(i),
                  this.urlTree.queryParams,
                  this.urlTree.fragment
                )
              )
            )
            .pipe(
              wn((i) => {
                if (i instanceof aD)
                  return (this.allowRedirects = !1), this.match(i.urlTree);
                throw i instanceof sa ? this.noMatchError(i) : i;
              })
            );
        }
        match(t) {
          return this.expandSegmentGroup(this.injector, this.config, t.root, $)
            .pipe(
              z((o) => this.createUrlTree(Zs(o), t.queryParams, t.fragment))
            )
            .pipe(
              wn((o) => {
                throw o instanceof sa ? this.noMatchError(o) : o;
              })
            );
        }
        noMatchError(t) {
          return new w(4002, ia);
        }
        createUrlTree(t, n, r) {
          const o = Oc(t);
          return new _n(o, n, r);
        }
        expandSegmentGroup(t, n, r, o) {
          return 0 === r.segments.length && r.hasChildren()
            ? this.expandChildren(t, n, r).pipe(z((i) => new H([], i)))
            : this.expandSegment(t, r, n, r.segments, o, !0);
        }
        expandChildren(t, n, r) {
          const o = [];
          for (const i of Object.keys(r.children))
            "primary" === i ? o.unshift(i) : o.push(i);
          return _e(o).pipe(
            zn((i) => {
              const s = r.children[i],
                a = tD(n, i);
              return this.expandSegmentGroup(t, a, s, i).pipe(
                z((u) => ({ segment: u, outlet: i }))
              );
            }),
            Cv((i, s) => ((i[s.outlet] = s.segment), i), {}),
            _v()
          );
        }
        expandSegment(t, n, r, o, i, s) {
          return _e(r).pipe(
            zn((a) =>
              this.expandSegmentAgainstRoute(t, n, r, a, o, i, s).pipe(
                wn((l) => {
                  if (l instanceof sa) return A(null);
                  throw l;
                })
              )
            ),
            Dn((a) => !!a),
            wn((a, u) => {
              if (Qc(a)) return sD(n, o, i) ? A(new H([], {})) : ii(n);
              throw a;
            })
          );
        }
        expandSegmentAgainstRoute(t, n, r, o, i, s, a) {
          return iD(o, n, i, s)
            ? void 0 === o.redirectTo
              ? this.matchSegmentAgainstRoute(t, n, o, i, s)
              : a && this.allowRedirects
              ? this.expandSegmentAgainstRouteUsingRedirect(t, n, r, o, i, s)
              : ii(n)
            : ii(n);
        }
        expandSegmentAgainstRouteUsingRedirect(t, n, r, o, i, s) {
          return "**" === o.path
            ? this.expandWildCardWithParamsAgainstRouteUsingRedirect(t, r, o, s)
            : this.expandRegularSegmentAgainstRouteUsingRedirect(
                t,
                n,
                r,
                o,
                i,
                s
              );
        }
        expandWildCardWithParamsAgainstRouteUsingRedirect(t, n, r, o) {
          const i = this.applyRedirectCommands([], r.redirectTo, {});
          return r.redirectTo.startsWith("/")
            ? uD(i)
            : this.lineralizeSegments(r, i).pipe(
                Se((s) => {
                  const a = new H(s, {});
                  return this.expandSegment(t, a, n, s, o, !1);
                })
              );
        }
        expandRegularSegmentAgainstRouteUsingRedirect(t, n, r, o, i, s) {
          const {
            matched: a,
            consumedSegments: u,
            remainingSegments: l,
            positionalParamSegments: c,
          } = Zc(n, o, i);
          if (!a) return ii(n);
          const d = this.applyRedirectCommands(u, o.redirectTo, c);
          return o.redirectTo.startsWith("/")
            ? uD(d)
            : this.lineralizeSegments(o, d).pipe(
                Se((f) => this.expandSegment(t, n, r, f.concat(l), s, !1))
              );
        }
        matchSegmentAgainstRoute(t, n, r, o, i) {
          return "**" === r.path
            ? ((t = eD(r, t)),
              r.loadChildren
                ? (r._loadedRoutes
                    ? A({
                        routes: r._loadedRoutes,
                        injector: r._loadedInjector,
                      })
                    : this.configLoader.loadChildren(t, r)
                  ).pipe(
                    z(
                      (a) => (
                        (r._loadedRoutes = a.routes),
                        (r._loadedInjector = a.injector),
                        new H(o, {})
                      )
                    )
                  )
                : A(new H(o, {})))
            : oD(n, r, o, t).pipe(
                Vt(
                  ({ matched: s, consumedSegments: a, remainingSegments: u }) =>
                    s
                      ? this.getChildConfig((t = r._injector ?? t), r, o).pipe(
                          Se((c) => {
                            const d = c.injector ?? t,
                              f = c.routes,
                              { segmentGroup: h, slicedSegments: p } = ra(
                                n,
                                a,
                                u,
                                f
                              ),
                              g = new H(h.segments, h.children);
                            if (0 === p.length && g.hasChildren())
                              return this.expandChildren(d, f, g).pipe(
                                z((m) => new H(a, m))
                              );
                            if (0 === f.length && 0 === p.length)
                              return A(new H(a, {}));
                            const y = mt(r) === i;
                            return this.expandSegment(
                              d,
                              g,
                              f,
                              p,
                              y ? $ : i,
                              !0
                            ).pipe(
                              z((_) => new H(a.concat(_.segments), _.children))
                            );
                          })
                        )
                      : ii(n)
                )
              );
        }
        getChildConfig(t, n, r) {
          return n.children
            ? A({ routes: n.children, injector: t })
            : n.loadChildren
            ? void 0 !== n._loadedRoutes
              ? A({ routes: n._loadedRoutes, injector: n._loadedInjector })
              : (function DP(e, t, n, r) {
                  const o = t.canLoad;
                  return void 0 === o || 0 === o.length
                    ? A(!0)
                    : A(
                        o.map((s) => {
                          const a = Hr(s, e);
                          return Cn(
                            (function iP(e) {
                              return e && oi(e.canLoad);
                            })(a)
                              ? a.canLoad(t, n)
                              : e.runInContext(() => a(t, n))
                          );
                        })
                      ).pipe(zr(), rD());
                })(t, n, r).pipe(
                  Se((o) =>
                    o
                      ? this.configLoader.loadChildren(t, n).pipe(
                          Le((i) => {
                            (n._loadedRoutes = i.routes),
                              (n._loadedInjector = i.injector);
                          })
                        )
                      : (function SP(e) {
                          return Go(Zv(ia, 3));
                        })()
                  )
                )
            : A({ routes: [], injector: t });
        }
        lineralizeSegments(t, n) {
          let r = [],
            o = n.root;
          for (;;) {
            if (((r = r.concat(o.segments)), 0 === o.numberOfChildren))
              return A(r);
            if (o.numberOfChildren > 1 || !o.children[$])
              return t.redirectTo, Go(new w(4e3, ia));
            o = o.children[$];
          }
        }
        applyRedirectCommands(t, n, r) {
          return this.applyRedirectCreateUrlTree(
            n,
            this.urlSerializer.parse(n),
            t,
            r
          );
        }
        applyRedirectCreateUrlTree(t, n, r, o) {
          const i = this.createSegmentGroup(t, n.root, r, o);
          return new _n(
            i,
            this.createQueryParams(n.queryParams, this.urlTree.queryParams),
            n.fragment
          );
        }
        createQueryParams(t, n) {
          const r = {};
          return (
            Ae(t, (o, i) => {
              if ("string" == typeof o && o.startsWith(":")) {
                const a = o.substring(1);
                r[i] = n[a];
              } else r[i] = o;
            }),
            r
          );
        }
        createSegmentGroup(t, n, r, o) {
          const i = this.createSegments(t, n.segments, r, o);
          let s = {};
          return (
            Ae(n.children, (a, u) => {
              s[u] = this.createSegmentGroup(t, a, r, o);
            }),
            new H(i, s)
          );
        }
        createSegments(t, n, r, o) {
          return n.map((i) =>
            i.path.startsWith(":")
              ? this.findPosParam(t, i, o)
              : this.findOrReturn(i, r)
          );
        }
        findPosParam(t, n, r) {
          const o = r[n.path.substring(1)];
          if (!o) throw new w(4001, ia);
          return o;
        }
        findOrReturn(t, n) {
          let r = 0;
          for (const o of n) {
            if (o.path === t.path) return n.splice(r), o;
            r++;
          }
          return t;
        }
      }
      class RP {}
      class OP {
        constructor(t, n, r, o, i, s, a) {
          (this.injector = t),
            (this.rootComponentType = n),
            (this.config = r),
            (this.urlTree = o),
            (this.url = i),
            (this.paramsInheritanceStrategy = s),
            (this.urlSerializer = a);
        }
        recognize() {
          const t = ra(
            this.urlTree.root,
            [],
            [],
            this.config.filter((n) => void 0 === n.redirectTo)
          ).segmentGroup;
          return this.processSegmentGroup(
            this.injector,
            this.config,
            t,
            $
          ).pipe(
            z((n) => {
              if (null === n) return null;
              const r = new Xs(
                  [],
                  Object.freeze({}),
                  Object.freeze({ ...this.urlTree.queryParams }),
                  this.urlTree.fragment,
                  {},
                  $,
                  this.rootComponentType,
                  null,
                  this.urlTree.root,
                  -1,
                  {}
                ),
                o = new cn(r, n),
                i = new qv(this.url, o);
              return this.inheritParamsAndData(i._root), i;
            })
          );
        }
        inheritParamsAndData(t) {
          const n = t.value,
            r = Wv(n, this.paramsInheritanceStrategy);
          (n.params = Object.freeze(r.params)),
            (n.data = Object.freeze(r.data)),
            t.children.forEach((o) => this.inheritParamsAndData(o));
        }
        processSegmentGroup(t, n, r, o) {
          return 0 === r.segments.length && r.hasChildren()
            ? this.processChildren(t, n, r)
            : this.processSegment(t, n, r, r.segments, o);
        }
        processChildren(t, n, r) {
          return _e(Object.keys(r.children)).pipe(
            zn((o) => {
              const i = r.children[o],
                s = tD(n, o);
              return this.processSegmentGroup(t, s, i, o);
            }),
            Cv((o, i) => (o && i ? (o.push(...i), o) : null)),
            (function JR(e, t = !1) {
              return ye((n, r) => {
                let o = 0;
                n.subscribe(
                  ve(r, (i) => {
                    const s = e(i, o++);
                    (s || t) && r.next(i), !s && r.complete();
                  })
                );
              });
            })((o) => null !== o),
            Hs(null),
            _v(),
            z((o) => {
              if (null === o) return null;
              const i = cD(o);
              return (
                (function NP(e) {
                  e.sort((t, n) =>
                    t.value.outlet === $
                      ? -1
                      : n.value.outlet === $
                      ? 1
                      : t.value.outlet.localeCompare(n.value.outlet)
                  );
                })(i),
                i
              );
            })
          );
        }
        processSegment(t, n, r, o, i) {
          return _e(n).pipe(
            zn((s) =>
              this.processSegmentAgainstRoute(s._injector ?? t, s, r, o, i)
            ),
            Dn((s) => !!s),
            wn((s) => {
              if (Qc(s)) return sD(r, o, i) ? A([]) : A(null);
              throw s;
            })
          );
        }
        processSegmentAgainstRoute(t, n, r, o, i) {
          if (n.redirectTo || !iD(n, r, o, i)) return A(null);
          let s;
          if ("**" === n.path) {
            const a = o.length > 0 ? Iv(o).parameters : {},
              u = fD(r) + o.length;
            s = A({
              snapshot: new Xs(
                o,
                a,
                Object.freeze({ ...this.urlTree.queryParams }),
                this.urlTree.fragment,
                hD(n),
                mt(n),
                n.component ?? n._loadedComponent ?? null,
                n,
                dD(r),
                u,
                pD(n)
              ),
              consumedSegments: [],
              remainingSegments: [],
            });
          } else
            s = oD(r, n, o, t).pipe(
              z(
                ({
                  matched: a,
                  consumedSegments: u,
                  remainingSegments: l,
                  parameters: c,
                }) => {
                  if (!a) return null;
                  const d = fD(r) + u.length;
                  return {
                    snapshot: new Xs(
                      u,
                      c,
                      Object.freeze({ ...this.urlTree.queryParams }),
                      this.urlTree.fragment,
                      hD(n),
                      mt(n),
                      n.component ?? n._loadedComponent ?? null,
                      n,
                      dD(r),
                      d,
                      pD(n)
                    ),
                    consumedSegments: u,
                    remainingSegments: l,
                  };
                }
              )
            );
          return s.pipe(
            Vt((a) => {
              if (null === a) return A(null);
              const {
                snapshot: u,
                consumedSegments: l,
                remainingSegments: c,
              } = a;
              t = n._injector ?? t;
              const d = n._loadedInjector ?? t,
                f = (function FP(e) {
                  return e.children
                    ? e.children
                    : e.loadChildren
                    ? e._loadedRoutes
                    : [];
                })(n),
                { segmentGroup: h, slicedSegments: p } = ra(
                  r,
                  l,
                  c,
                  f.filter((y) => void 0 === y.redirectTo)
                );
              if (0 === p.length && h.hasChildren())
                return this.processChildren(d, f, h).pipe(
                  z((y) => (null === y ? null : [new cn(u, y)]))
                );
              if (0 === f.length && 0 === p.length) return A([new cn(u, [])]);
              const g = mt(n) === i;
              return this.processSegment(d, f, h, p, g ? $ : i).pipe(
                z((y) => (null === y ? null : [new cn(u, y)]))
              );
            })
          );
        }
      }
      function kP(e) {
        const t = e.value.routeConfig;
        return t && "" === t.path && void 0 === t.redirectTo;
      }
      function cD(e) {
        const t = [],
          n = new Set();
        for (const r of e) {
          if (!kP(r)) {
            t.push(r);
            continue;
          }
          const o = t.find((i) => r.value.routeConfig === i.value.routeConfig);
          void 0 !== o ? (o.children.push(...r.children), n.add(o)) : t.push(r);
        }
        for (const r of n) {
          const o = cD(r.children);
          t.push(new cn(r.value, o));
        }
        return t.filter((r) => !n.has(r));
      }
      function dD(e) {
        let t = e;
        for (; t._sourceSegment; ) t = t._sourceSegment;
        return t;
      }
      function fD(e) {
        let t = e,
          n = t._segmentIndexShift ?? 0;
        for (; t._sourceSegment; )
          (t = t._sourceSegment), (n += t._segmentIndexShift ?? 0);
        return n - 1;
      }
      function hD(e) {
        return e.data || {};
      }
      function pD(e) {
        return e.resolve || {};
      }
      function gD(e) {
        return "string" == typeof e.title || null === e.title;
      }
      function Kc(e) {
        return Vt((t) => {
          const n = e(t);
          return n ? _e(n).pipe(z(() => t)) : A(t);
        });
      }
      const Gr = new O("ROUTES");
      let Jc = (() => {
        class e {
          constructor() {
            (this.componentLoaders = new WeakMap()),
              (this.childrenLoaders = new WeakMap()),
              (this.compiler = W(Ym));
          }
          loadComponent(n) {
            if (this.componentLoaders.get(n))
              return this.componentLoaders.get(n);
            if (n._loadedComponent) return A(n._loadedComponent);
            this.onLoadStartListener && this.onLoadStartListener(n);
            const r = Cn(n.loadComponent()).pipe(
                z(yD),
                Le((i) => {
                  this.onLoadEndListener && this.onLoadEndListener(n),
                    (n._loadedComponent = i);
                }),
                Rc(() => {
                  this.componentLoaders.delete(n);
                })
              ),
              o = new vv(r, () => new Tt()).pipe(Tc());
            return this.componentLoaders.set(n, o), o;
          }
          loadChildren(n, r) {
            if (this.childrenLoaders.get(r)) return this.childrenLoaders.get(r);
            if (r._loadedRoutes)
              return A({
                routes: r._loadedRoutes,
                injector: r._loadedInjector,
              });
            this.onLoadStartListener && this.onLoadStartListener(r);
            const i = this.loadModuleFactoryOrRoutes(r.loadChildren).pipe(
                z((a) => {
                  this.onLoadEndListener && this.onLoadEndListener(r);
                  let u,
                    l,
                    c = !1;
                  Array.isArray(a)
                    ? (l = a)
                    : ((u = a.create(n).injector),
                      (l = bv(u.get(Gr, [], x.Self | x.Optional))));
                  return { routes: l.map(qc), injector: u };
                }),
                Rc(() => {
                  this.childrenLoaders.delete(r);
                })
              ),
              s = new vv(i, () => new Tt()).pipe(Tc());
            return this.childrenLoaders.set(r, s), s;
          }
          loadModuleFactoryOrRoutes(n) {
            return Cn(n()).pipe(
              z(yD),
              Se((r) =>
                r instanceof om || Array.isArray(r)
                  ? A(r)
                  : _e(this.compiler.compileModuleAsync(r))
              )
            );
          }
        }
        return (
          (e.ɵfac = function (n) {
            return new (n || e)();
          }),
          (e.ɵprov = M({ token: e, factory: e.ɵfac, providedIn: "root" })),
          e
        );
      })();
      function yD(e) {
        return (function zP(e) {
          return e && "object" == typeof e && "default" in e;
        })(e)
          ? e.default
          : e;
      }
      let ua = (() => {
        class e {
          get hasRequestedNavigation() {
            return 0 !== this.navigationId;
          }
          constructor() {
            (this.currentNavigation = null),
              (this.lastSuccessfulNavigation = null),
              (this.events = new Tt()),
              (this.configLoader = W(Jc)),
              (this.environmentInjector = W(Jt)),
              (this.urlSerializer = W(Qo)),
              (this.rootContexts = W(ei)),
              (this.navigationId = 0),
              (this.afterPreactivation = () => A(void 0)),
              (this.rootComponentType = null),
              (this.configLoader.onLoadEndListener = (o) =>
                this.events.next(new xx(o))),
              (this.configLoader.onLoadStartListener = (o) =>
                this.events.next(new Rx(o)));
          }
          complete() {
            this.transitions?.complete();
          }
          handleNavigationRequest(n) {
            const r = ++this.navigationId;
            this.transitions?.next({ ...this.transitions.value, ...n, id: r });
          }
          setupNavigations(n) {
            return (
              (this.transitions = new Mt({
                id: 0,
                targetPageId: 0,
                currentUrlTree: n.currentUrlTree,
                currentRawUrl: n.currentUrlTree,
                extractedUrl: n.urlHandlingStrategy.extract(n.currentUrlTree),
                urlAfterRedirects: n.urlHandlingStrategy.extract(
                  n.currentUrlTree
                ),
                rawUrl: n.currentUrlTree,
                extras: {},
                resolve: null,
                reject: null,
                promise: Promise.resolve(!0),
                source: Jo,
                restoredState: null,
                currentSnapshot: n.routerState.snapshot,
                targetSnapshot: null,
                currentRouterState: n.routerState,
                targetRouterState: null,
                guards: { canActivateChecks: [], canDeactivateChecks: [] },
                guardsResult: null,
              })),
              this.transitions.pipe(
                ln((r) => 0 !== r.id),
                z((r) => ({
                  ...r,
                  extractedUrl: n.urlHandlingStrategy.extract(r.rawUrl),
                })),
                Vt((r) => {
                  let o = !1,
                    i = !1;
                  return A(r).pipe(
                    Le((s) => {
                      this.currentNavigation = {
                        id: s.id,
                        initialUrl: s.rawUrl,
                        extractedUrl: s.extractedUrl,
                        trigger: s.source,
                        extras: s.extras,
                        previousNavigation: this.lastSuccessfulNavigation
                          ? {
                              ...this.lastSuccessfulNavigation,
                              previousNavigation: null,
                            }
                          : null,
                      };
                    }),
                    Vt((s) => {
                      const a = n.browserUrlTree.toString(),
                        u =
                          !n.navigated ||
                          s.extractedUrl.toString() !== a ||
                          a !== n.currentUrlTree.toString();
                      if (
                        !u &&
                        "reload" !==
                          (s.extras.onSameUrlNavigation ??
                            n.onSameUrlNavigation)
                      ) {
                        const c = "";
                        return (
                          this.events.next(
                            new Js(s.id, n.serializeUrl(r.rawUrl), c, 0)
                          ),
                          (n.rawUrlTree = s.rawUrl),
                          s.resolve(null),
                          At
                        );
                      }
                      if (n.urlHandlingStrategy.shouldProcessUrl(s.rawUrl))
                        return (
                          vD(s.source) && (n.browserUrlTree = s.extractedUrl),
                          A(s).pipe(
                            Vt((c) => {
                              const d = this.transitions?.getValue();
                              return (
                                this.events.next(
                                  new Lc(
                                    c.id,
                                    this.urlSerializer.serialize(
                                      c.extractedUrl
                                    ),
                                    c.source,
                                    c.restoredState
                                  )
                                ),
                                d !== this.transitions?.getValue()
                                  ? At
                                  : Promise.resolve(c)
                              );
                            }),
                            (function AP(e, t, n, r) {
                              return Vt((o) =>
                                (function MP(e, t, n, r, o) {
                                  return new TP(e, t, n, r, o).apply();
                                })(e, t, n, o.extractedUrl, r).pipe(
                                  z((i) => ({ ...o, urlAfterRedirects: i }))
                                )
                              );
                            })(
                              this.environmentInjector,
                              this.configLoader,
                              this.urlSerializer,
                              n.config
                            ),
                            Le((c) => {
                              (this.currentNavigation = {
                                ...this.currentNavigation,
                                finalUrl: c.urlAfterRedirects,
                              }),
                                (r.urlAfterRedirects = c.urlAfterRedirects);
                            }),
                            (function jP(e, t, n, r, o) {
                              return Se((i) =>
                                (function PP(
                                  e,
                                  t,
                                  n,
                                  r,
                                  o,
                                  i,
                                  s = "emptyOnly"
                                ) {
                                  return new OP(e, t, n, r, o, s, i)
                                    .recognize()
                                    .pipe(
                                      Vt((a) =>
                                        null === a
                                          ? (function xP(e) {
                                              return new me((t) => t.error(e));
                                            })(new RP())
                                          : A(a)
                                      )
                                    );
                                })(
                                  e,
                                  t,
                                  n,
                                  i.urlAfterRedirects,
                                  r.serialize(i.urlAfterRedirects),
                                  r,
                                  o
                                ).pipe(z((s) => ({ ...i, targetSnapshot: s })))
                              );
                            })(
                              this.environmentInjector,
                              this.rootComponentType,
                              n.config,
                              this.urlSerializer,
                              n.paramsInheritanceStrategy
                            ),
                            Le((c) => {
                              if (
                                ((r.targetSnapshot = c.targetSnapshot),
                                "eager" === n.urlUpdateStrategy)
                              ) {
                                if (!c.extras.skipLocationChange) {
                                  const f = n.urlHandlingStrategy.merge(
                                    c.urlAfterRedirects,
                                    c.rawUrl
                                  );
                                  n.setBrowserUrl(f, c);
                                }
                                n.browserUrlTree = c.urlAfterRedirects;
                              }
                              const d = new Ix(
                                c.id,
                                this.urlSerializer.serialize(c.extractedUrl),
                                this.urlSerializer.serialize(
                                  c.urlAfterRedirects
                                ),
                                c.targetSnapshot
                              );
                              this.events.next(d);
                            })
                          )
                        );
                      if (
                        u &&
                        n.urlHandlingStrategy.shouldProcessUrl(n.rawUrlTree)
                      ) {
                        const {
                            id: c,
                            extractedUrl: d,
                            source: f,
                            restoredState: h,
                            extras: p,
                          } = s,
                          g = new Lc(c, this.urlSerializer.serialize(d), f, h);
                        this.events.next(g);
                        const y = Gv(d, this.rootComponentType).snapshot;
                        return A(
                          (r = {
                            ...s,
                            targetSnapshot: y,
                            urlAfterRedirects: d,
                            extras: {
                              ...p,
                              skipLocationChange: !1,
                              replaceUrl: !1,
                            },
                          })
                        );
                      }
                      {
                        const c = "";
                        return (
                          this.events.next(
                            new Js(s.id, n.serializeUrl(r.extractedUrl), c, 1)
                          ),
                          (n.rawUrlTree = s.rawUrl),
                          s.resolve(null),
                          At
                        );
                      }
                    }),
                    Le((s) => {
                      const a = new Sx(
                        s.id,
                        this.urlSerializer.serialize(s.extractedUrl),
                        this.urlSerializer.serialize(s.urlAfterRedirects),
                        s.targetSnapshot
                      );
                      this.events.next(a);
                    }),
                    z(
                      (s) =>
                        (r = {
                          ...s,
                          guards: eP(
                            s.targetSnapshot,
                            s.currentSnapshot,
                            this.rootContexts
                          ),
                        })
                    ),
                    (function dP(e, t) {
                      return Se((n) => {
                        const {
                          targetSnapshot: r,
                          currentSnapshot: o,
                          guards: {
                            canActivateChecks: i,
                            canDeactivateChecks: s,
                          },
                        } = n;
                        return 0 === s.length && 0 === i.length
                          ? A({ ...n, guardsResult: !0 })
                          : (function fP(e, t, n, r) {
                              return _e(e).pipe(
                                Se((o) =>
                                  (function vP(e, t, n, r, o) {
                                    const i =
                                      t && t.routeConfig
                                        ? t.routeConfig.canDeactivate
                                        : null;
                                    return i && 0 !== i.length
                                      ? A(
                                          i.map((a) => {
                                            const u = ti(t) ?? o,
                                              l = Hr(a, u);
                                            return Cn(
                                              (function uP(e) {
                                                return e && oi(e.canDeactivate);
                                              })(l)
                                                ? l.canDeactivate(e, t, n, r)
                                                : u.runInContext(() =>
                                                    l(e, t, n, r)
                                                  )
                                            ).pipe(Dn());
                                          })
                                        ).pipe(zr())
                                      : A(!0);
                                  })(o.component, o.route, n, t, r)
                                ),
                                Dn((o) => !0 !== o, !0)
                              );
                            })(s, r, o, e).pipe(
                              Se((a) =>
                                a &&
                                (function oP(e) {
                                  return "boolean" == typeof e;
                                })(a)
                                  ? (function hP(e, t, n, r) {
                                      return _e(t).pipe(
                                        zn((o) =>
                                          Us(
                                            (function gP(e, t) {
                                              return (
                                                null !== e && t && t(new Px(e)),
                                                A(!0)
                                              );
                                            })(o.route.parent, r),
                                            (function pP(e, t) {
                                              return (
                                                null !== e && t && t(new Nx(e)),
                                                A(!0)
                                              );
                                            })(o.route, r),
                                            (function yP(e, t, n) {
                                              const r = t[t.length - 1],
                                                i = t
                                                  .slice(0, t.length - 1)
                                                  .reverse()
                                                  .map((s) =>
                                                    (function tP(e) {
                                                      const t = e.routeConfig
                                                        ? e.routeConfig
                                                            .canActivateChild
                                                        : null;
                                                      return t && 0 !== t.length
                                                        ? { node: e, guards: t }
                                                        : null;
                                                    })(s)
                                                  )
                                                  .filter((s) => null !== s)
                                                  .map((s) =>
                                                    yv(() =>
                                                      A(
                                                        s.guards.map((u) => {
                                                          const l =
                                                              ti(s.node) ?? n,
                                                            c = Hr(u, l);
                                                          return Cn(
                                                            (function aP(e) {
                                                              return (
                                                                e &&
                                                                oi(
                                                                  e.canActivateChild
                                                                )
                                                              );
                                                            })(c)
                                                              ? c.canActivateChild(
                                                                  r,
                                                                  e
                                                                )
                                                              : l.runInContext(
                                                                  () => c(r, e)
                                                                )
                                                          ).pipe(Dn());
                                                        })
                                                      ).pipe(zr())
                                                    )
                                                  );
                                              return A(i).pipe(zr());
                                            })(e, o.path, n),
                                            (function mP(e, t, n) {
                                              const r = t.routeConfig
                                                ? t.routeConfig.canActivate
                                                : null;
                                              if (!r || 0 === r.length)
                                                return A(!0);
                                              const o = r.map((i) =>
                                                yv(() => {
                                                  const s = ti(t) ?? n,
                                                    a = Hr(i, s);
                                                  return Cn(
                                                    (function sP(e) {
                                                      return (
                                                        e && oi(e.canActivate)
                                                      );
                                                    })(a)
                                                      ? a.canActivate(t, e)
                                                      : s.runInContext(() =>
                                                          a(t, e)
                                                        )
                                                  ).pipe(Dn());
                                                })
                                              );
                                              return A(o).pipe(zr());
                                            })(e, o.route, n)
                                          )
                                        ),
                                        Dn((o) => !0 !== o, !0)
                                      );
                                    })(r, i, e, t)
                                  : A(a)
                              ),
                              z((a) => ({ ...n, guardsResult: a }))
                            );
                      });
                    })(this.environmentInjector, (s) => this.events.next(s)),
                    Le((s) => {
                      if (
                        ((r.guardsResult = s.guardsResult), Wn(s.guardsResult))
                      )
                        throw Yv(0, s.guardsResult);
                      const a = new Mx(
                        s.id,
                        this.urlSerializer.serialize(s.extractedUrl),
                        this.urlSerializer.serialize(s.urlAfterRedirects),
                        s.targetSnapshot,
                        !!s.guardsResult
                      );
                      this.events.next(a);
                    }),
                    ln(
                      (s) =>
                        !!s.guardsResult ||
                        (n.restoreHistory(s),
                        this.cancelNavigationTransition(s, "", 3),
                        !1)
                    ),
                    Kc((s) => {
                      if (s.guards.canActivateChecks.length)
                        return A(s).pipe(
                          Le((a) => {
                            const u = new Tx(
                              a.id,
                              this.urlSerializer.serialize(a.extractedUrl),
                              this.urlSerializer.serialize(a.urlAfterRedirects),
                              a.targetSnapshot
                            );
                            this.events.next(u);
                          }),
                          Vt((a) => {
                            let u = !1;
                            return A(a).pipe(
                              (function $P(e, t) {
                                return Se((n) => {
                                  const {
                                    targetSnapshot: r,
                                    guards: { canActivateChecks: o },
                                  } = n;
                                  if (!o.length) return A(n);
                                  let i = 0;
                                  return _e(o).pipe(
                                    zn((s) =>
                                      (function BP(e, t, n, r) {
                                        const o = e.routeConfig,
                                          i = e._resolve;
                                        return (
                                          void 0 !== o?.title &&
                                            !gD(o) &&
                                            (i[Wo] = o.title),
                                          (function VP(e, t, n, r) {
                                            const o = (function UP(e) {
                                              return [
                                                ...Object.keys(e),
                                                ...Object.getOwnPropertySymbols(
                                                  e
                                                ),
                                              ];
                                            })(e);
                                            if (0 === o.length) return A({});
                                            const i = {};
                                            return _e(o).pipe(
                                              Se((s) =>
                                                (function HP(e, t, n, r) {
                                                  const o = ti(t) ?? r,
                                                    i = Hr(e, o);
                                                  return Cn(
                                                    i.resolve
                                                      ? i.resolve(t, n)
                                                      : o.runInContext(() =>
                                                          i(t, n)
                                                        )
                                                  );
                                                })(e[s], t, n, r).pipe(
                                                  Dn(),
                                                  Le((a) => {
                                                    i[s] = a;
                                                  })
                                                )
                                              ),
                                              Ac(1),
                                              (function XR(e) {
                                                return z(() => e);
                                              })(i),
                                              wn((s) => (Qc(s) ? At : Go(s)))
                                            );
                                          })(i, e, t, r).pipe(
                                            z(
                                              (s) => (
                                                (e._resolvedData = s),
                                                (e.data = Wv(e, n).resolve),
                                                o &&
                                                  gD(o) &&
                                                  (e.data[Wo] = o.title),
                                                null
                                              )
                                            )
                                          )
                                        );
                                      })(s.route, r, e, t)
                                    ),
                                    Le(() => i++),
                                    Ac(1),
                                    Se((s) => (i === o.length ? A(n) : At))
                                  );
                                });
                              })(
                                n.paramsInheritanceStrategy,
                                this.environmentInjector
                              ),
                              Le({
                                next: () => (u = !0),
                                complete: () => {
                                  u ||
                                    (n.restoreHistory(a),
                                    this.cancelNavigationTransition(a, "", 2));
                                },
                              })
                            );
                          }),
                          Le((a) => {
                            const u = new Ax(
                              a.id,
                              this.urlSerializer.serialize(a.extractedUrl),
                              this.urlSerializer.serialize(a.urlAfterRedirects),
                              a.targetSnapshot
                            );
                            this.events.next(u);
                          })
                        );
                    }),
                    Kc((s) => {
                      const a = (u) => {
                        const l = [];
                        u.routeConfig?.loadComponent &&
                          !u.routeConfig._loadedComponent &&
                          l.push(
                            this.configLoader.loadComponent(u.routeConfig).pipe(
                              Le((c) => {
                                u.component = c;
                              }),
                              z(() => {})
                            )
                          );
                        for (const c of u.children) l.push(...a(c));
                        return l;
                      };
                      return Mc(a(s.targetSnapshot.root)).pipe(Hs(), Hn(1));
                    }),
                    Kc(() => this.afterPreactivation()),
                    z((s) => {
                      const a = (function Hx(e, t, n) {
                        const r = Xo(e, t._root, n ? n._root : void 0);
                        return new zv(r, t);
                      })(
                        n.routeReuseStrategy,
                        s.targetSnapshot,
                        s.currentRouterState
                      );
                      return (r = { ...s, targetRouterState: a });
                    }),
                    Le((s) => {
                      (n.currentUrlTree = s.urlAfterRedirects),
                        (n.rawUrlTree = n.urlHandlingStrategy.merge(
                          s.urlAfterRedirects,
                          s.rawUrl
                        )),
                        (n.routerState = s.targetRouterState),
                        "deferred" === n.urlUpdateStrategy &&
                          (s.extras.skipLocationChange ||
                            n.setBrowserUrl(n.rawUrlTree, s),
                          (n.browserUrlTree = s.urlAfterRedirects));
                    }),
                    ((e, t, n) =>
                      z(
                        (r) => (
                          new Xx(
                            t,
                            r.targetRouterState,
                            r.currentRouterState,
                            n
                          ).activate(e),
                          r
                        )
                      ))(this.rootContexts, n.routeReuseStrategy, (s) =>
                      this.events.next(s)
                    ),
                    Hn(1),
                    Le({
                      next: (s) => {
                        (o = !0),
                          (this.lastSuccessfulNavigation =
                            this.currentNavigation),
                          (n.navigated = !0),
                          this.events.next(
                            new qn(
                              s.id,
                              this.urlSerializer.serialize(s.extractedUrl),
                              this.urlSerializer.serialize(n.currentUrlTree)
                            )
                          ),
                          n.titleStrategy?.updateTitle(
                            s.targetRouterState.snapshot
                          ),
                          s.resolve(!0);
                      },
                      complete: () => {
                        o = !0;
                      },
                    }),
                    Rc(() => {
                      o || i || this.cancelNavigationTransition(r, "", 1),
                        this.currentNavigation?.id === r.id &&
                          (this.currentNavigation = null);
                    }),
                    wn((s) => {
                      if (((i = !0), Jv(s))) {
                        Kv(s) || ((n.navigated = !0), n.restoreHistory(r, !0));
                        const a = new Ks(
                          r.id,
                          this.urlSerializer.serialize(r.extractedUrl),
                          s.message,
                          s.cancellationCode
                        );
                        if ((this.events.next(a), Kv(s))) {
                          const u = n.urlHandlingStrategy.merge(
                              s.url,
                              n.rawUrlTree
                            ),
                            l = {
                              skipLocationChange: r.extras.skipLocationChange,
                              replaceUrl:
                                "eager" === n.urlUpdateStrategy || vD(r.source),
                            };
                          n.scheduleNavigation(u, Jo, null, l, {
                            resolve: r.resolve,
                            reject: r.reject,
                            promise: r.promise,
                          });
                        } else r.resolve(!1);
                      } else {
                        n.restoreHistory(r, !0);
                        const a = new jc(
                          r.id,
                          this.urlSerializer.serialize(r.extractedUrl),
                          s,
                          r.targetSnapshot ?? void 0
                        );
                        this.events.next(a);
                        try {
                          r.resolve(n.errorHandler(s));
                        } catch (u) {
                          r.reject(u);
                        }
                      }
                      return At;
                    })
                  );
                })
              )
            );
          }
          cancelNavigationTransition(n, r, o) {
            const i = new Ks(
              n.id,
              this.urlSerializer.serialize(n.extractedUrl),
              r,
              o
            );
            this.events.next(i), n.resolve(!1);
          }
        }
        return (
          (e.ɵfac = function (n) {
            return new (n || e)();
          }),
          (e.ɵprov = M({ token: e, factory: e.ɵfac, providedIn: "root" })),
          e
        );
      })();
      function vD(e) {
        return e !== Jo;
      }
      let DD = (() => {
          class e {
            buildTitle(n) {
              let r,
                o = n.root;
              for (; void 0 !== o; )
                (r = this.getResolvedTitleForRoute(o) ?? r),
                  (o = o.children.find((i) => i.outlet === $));
              return r;
            }
            getResolvedTitleForRoute(n) {
              return n.data[Wo];
            }
          }
          return (
            (e.ɵfac = function (n) {
              return new (n || e)();
            }),
            (e.ɵprov = M({
              token: e,
              factory: function () {
                return W(GP);
              },
              providedIn: "root",
            })),
            e
          );
        })(),
        GP = (() => {
          class e extends DD {
            constructor(n) {
              super(), (this.title = n);
            }
            updateTitle(n) {
              const r = this.buildTitle(n);
              void 0 !== r && this.title.setTitle(r);
            }
          }
          return (
            (e.ɵfac = function (n) {
              return new (n || e)(b(hv));
            }),
            (e.ɵprov = M({ token: e, factory: e.ɵfac, providedIn: "root" })),
            e
          );
        })(),
        WP = (() => {
          class e {}
          return (
            (e.ɵfac = function (n) {
              return new (n || e)();
            }),
            (e.ɵprov = M({
              token: e,
              factory: function () {
                return W(QP);
              },
              providedIn: "root",
            })),
            e
          );
        })();
      class qP {
        shouldDetach(t) {
          return !1;
        }
        store(t, n) {}
        shouldAttach(t) {
          return !1;
        }
        retrieve(t) {
          return null;
        }
        shouldReuseRoute(t, n) {
          return t.routeConfig === n.routeConfig;
        }
      }
      let QP = (() => {
        class e extends qP {}
        return (
          (e.ɵfac = (function () {
            let t;
            return function (r) {
              return (
                t ||
                (t = (function Af(e) {
                  return Gt(() => {
                    const t = e.prototype.constructor,
                      n = t[qt] || eu(t),
                      r = Object.prototype;
                    let o = Object.getPrototypeOf(e.prototype).constructor;
                    for (; o && o !== r; ) {
                      const i = o[qt] || eu(o);
                      if (i && i !== n) return i;
                      o = Object.getPrototypeOf(o);
                    }
                    return (i) => new i();
                  });
                })(e))
              )(r || e);
            };
          })()),
          (e.ɵprov = M({ token: e, factory: e.ɵfac, providedIn: "root" })),
          e
        );
      })();
      const la = new O("", { providedIn: "root", factory: () => ({}) });
      let ZP = (() => {
          class e {}
          return (
            (e.ɵfac = function (n) {
              return new (n || e)();
            }),
            (e.ɵprov = M({
              token: e,
              factory: function () {
                return W(KP);
              },
              providedIn: "root",
            })),
            e
          );
        })(),
        KP = (() => {
          class e {
            shouldProcessUrl(n) {
              return !0;
            }
            extract(n) {
              return n;
            }
            merge(n, r) {
              return n;
            }
          }
          return (
            (e.ɵfac = function (n) {
              return new (n || e)();
            }),
            (e.ɵprov = M({ token: e, factory: e.ɵfac, providedIn: "root" })),
            e
          );
        })();
      function JP(e) {
        throw e;
      }
      function XP(e, t, n) {
        return t.parse("/");
      }
      const eO = {
          paths: "exact",
          fragment: "ignored",
          matrixParams: "ignored",
          queryParams: "exact",
        },
        tO = {
          paths: "subset",
          fragment: "ignored",
          matrixParams: "ignored",
          queryParams: "subset",
        };
      let it = (() => {
        class e {
          get navigationId() {
            return this.navigationTransitions.navigationId;
          }
          get browserPageId() {
            if ("computed" === this.canceledNavigationResolution)
              return this.location.getState()?.ɵrouterPageId;
          }
          get events() {
            return this.navigationTransitions.events;
          }
          constructor() {
            (this.disposed = !1),
              (this.currentPageId = 0),
              (this.console = W(_M)),
              (this.isNgZoneEnabled = !1),
              (this.options = W(la, { optional: !0 }) || {}),
              (this.errorHandler = this.options.errorHandler || JP),
              (this.malformedUriErrorHandler =
                this.options.malformedUriErrorHandler || XP),
              (this.navigated = !1),
              (this.lastSuccessfulId = -1),
              (this.urlHandlingStrategy = W(ZP)),
              (this.routeReuseStrategy = W(WP)),
              (this.urlCreationStrategy = W(Bx)),
              (this.titleStrategy = W(DD)),
              (this.onSameUrlNavigation =
                this.options.onSameUrlNavigation || "ignore"),
              (this.paramsInheritanceStrategy =
                this.options.paramsInheritanceStrategy || "emptyOnly"),
              (this.urlUpdateStrategy =
                this.options.urlUpdateStrategy || "deferred"),
              (this.canceledNavigationResolution =
                this.options.canceledNavigationResolution || "replace"),
              (this.config = bv(W(Gr, { optional: !0 }) ?? [])),
              (this.navigationTransitions = W(ua)),
              (this.urlSerializer = W(Qo)),
              (this.location = W(nc)),
              (this.isNgZoneEnabled =
                W(de) instanceof de && de.isInAngularZone()),
              this.resetConfig(this.config),
              (this.currentUrlTree = new _n()),
              (this.rawUrlTree = this.currentUrlTree),
              (this.browserUrlTree = this.currentUrlTree),
              (this.routerState = Gv(this.currentUrlTree, null)),
              this.navigationTransitions.setupNavigations(this).subscribe(
                (n) => {
                  (this.lastSuccessfulId = n.id),
                    (this.currentPageId = this.browserPageId ?? 0);
                },
                (n) => {
                  this.console.warn(`Unhandled Navigation Error: ${n}`);
                }
              );
          }
          resetRootComponentType(n) {
            (this.routerState.root.component = n),
              (this.navigationTransitions.rootComponentType = n);
          }
          initialNavigation() {
            if (
              (this.setUpLocationChangeListener(),
              !this.navigationTransitions.hasRequestedNavigation)
            ) {
              const n = this.location.getState();
              this.navigateToSyncWithBrowser(this.location.path(!0), Jo, n);
            }
          }
          setUpLocationChangeListener() {
            this.locationSubscription ||
              (this.locationSubscription = this.location.subscribe((n) => {
                const r = "popstate" === n.type ? "popstate" : "hashchange";
                "popstate" === r &&
                  setTimeout(() => {
                    this.navigateToSyncWithBrowser(n.url, r, n.state);
                  }, 0);
              }));
          }
          navigateToSyncWithBrowser(n, r, o) {
            const i = { replaceUrl: !0 },
              s = o?.navigationId ? o : null;
            if (o) {
              const u = { ...o };
              delete u.navigationId,
                delete u.ɵrouterPageId,
                0 !== Object.keys(u).length && (i.state = u);
            }
            const a = this.parseUrl(n);
            this.scheduleNavigation(a, r, s, i);
          }
          get url() {
            return this.serializeUrl(this.currentUrlTree);
          }
          getCurrentNavigation() {
            return this.navigationTransitions.currentNavigation;
          }
          resetConfig(n) {
            (this.config = n.map(qc)),
              (this.navigated = !1),
              (this.lastSuccessfulId = -1);
          }
          ngOnDestroy() {
            this.dispose();
          }
          dispose() {
            this.navigationTransitions.complete(),
              this.locationSubscription &&
                (this.locationSubscription.unsubscribe(),
                (this.locationSubscription = void 0)),
              (this.disposed = !0);
          }
          createUrlTree(n, r = {}) {
            const {
                relativeTo: o,
                queryParams: i,
                fragment: s,
                queryParamsHandling: a,
                preserveFragment: u,
              } = r,
              l = u ? this.currentUrlTree.fragment : s;
            let c = null;
            switch (a) {
              case "merge":
                c = { ...this.currentUrlTree.queryParams, ...i };
                break;
              case "preserve":
                c = this.currentUrlTree.queryParams;
                break;
              default:
                c = i || null;
            }
            return (
              null !== c && (c = this.removeEmptyProps(c)),
              this.urlCreationStrategy.createUrlTree(
                o,
                this.routerState,
                this.currentUrlTree,
                n,
                c,
                l ?? null
              )
            );
          }
          navigateByUrl(n, r = { skipLocationChange: !1 }) {
            const o = Wn(n) ? n : this.parseUrl(n),
              i = this.urlHandlingStrategy.merge(o, this.rawUrlTree);
            return this.scheduleNavigation(i, Jo, null, r);
          }
          navigate(n, r = { skipLocationChange: !1 }) {
            return (
              (function nO(e) {
                for (let t = 0; t < e.length; t++) {
                  const n = e[t];
                  if (null == n) throw new w(4008, false);
                }
              })(n),
              this.navigateByUrl(this.createUrlTree(n, r), r)
            );
          }
          serializeUrl(n) {
            return this.urlSerializer.serialize(n);
          }
          parseUrl(n) {
            let r;
            try {
              r = this.urlSerializer.parse(n);
            } catch (o) {
              r = this.malformedUriErrorHandler(o, this.urlSerializer, n);
            }
            return r;
          }
          isActive(n, r) {
            let o;
            if (((o = !0 === r ? { ...eO } : !1 === r ? { ...tO } : r), Wn(n)))
              return Mv(this.currentUrlTree, n, o);
            const i = this.parseUrl(n);
            return Mv(this.currentUrlTree, i, o);
          }
          removeEmptyProps(n) {
            return Object.keys(n).reduce((r, o) => {
              const i = n[o];
              return null != i && (r[o] = i), r;
            }, {});
          }
          scheduleNavigation(n, r, o, i, s) {
            if (this.disposed) return Promise.resolve(!1);
            let a, u, l, c;
            return (
              s
                ? ((a = s.resolve), (u = s.reject), (l = s.promise))
                : (l = new Promise((d, f) => {
                    (a = d), (u = f);
                  })),
              (c =
                "computed" === this.canceledNavigationResolution
                  ? o && o.ɵrouterPageId
                    ? o.ɵrouterPageId
                    : (this.browserPageId ?? 0) + 1
                  : 0),
              this.navigationTransitions.handleNavigationRequest({
                targetPageId: c,
                source: r,
                restoredState: o,
                currentUrlTree: this.currentUrlTree,
                currentRawUrl: this.currentUrlTree,
                rawUrl: n,
                extras: i,
                resolve: a,
                reject: u,
                promise: l,
                currentSnapshot: this.routerState.snapshot,
                currentRouterState: this.routerState,
              }),
              l.catch((d) => Promise.reject(d))
            );
          }
          setBrowserUrl(n, r) {
            const o = this.urlSerializer.serialize(n);
            if (this.location.isCurrentPathEqualTo(o) || r.extras.replaceUrl) {
              const s = {
                ...r.extras.state,
                ...this.generateNgRouterState(r.id, this.browserPageId),
              };
              this.location.replaceState(o, "", s);
            } else {
              const i = {
                ...r.extras.state,
                ...this.generateNgRouterState(r.id, r.targetPageId),
              };
              this.location.go(o, "", i);
            }
          }
          restoreHistory(n, r = !1) {
            if ("computed" === this.canceledNavigationResolution) {
              const i =
                this.currentPageId - (this.browserPageId ?? this.currentPageId);
              0 !== i
                ? this.location.historyGo(i)
                : this.currentUrlTree ===
                    this.getCurrentNavigation()?.finalUrl &&
                  0 === i &&
                  (this.resetState(n),
                  (this.browserUrlTree = n.currentUrlTree),
                  this.resetUrlToCurrentUrlTree());
            } else
              "replace" === this.canceledNavigationResolution &&
                (r && this.resetState(n), this.resetUrlToCurrentUrlTree());
          }
          resetState(n) {
            (this.routerState = n.currentRouterState),
              (this.currentUrlTree = n.currentUrlTree),
              (this.rawUrlTree = this.urlHandlingStrategy.merge(
                this.currentUrlTree,
                n.rawUrl
              ));
          }
          resetUrlToCurrentUrlTree() {
            this.location.replaceState(
              this.urlSerializer.serialize(this.rawUrlTree),
              "",
              this.generateNgRouterState(
                this.lastSuccessfulId,
                this.currentPageId
              )
            );
          }
          generateNgRouterState(n, r) {
            return "computed" === this.canceledNavigationResolution
              ? { navigationId: n, ɵrouterPageId: r }
              : { navigationId: n };
          }
        }
        return (
          (e.ɵfac = function (n) {
            return new (n || e)();
          }),
          (e.ɵprov = M({ token: e, factory: e.ɵfac, providedIn: "root" })),
          e
        );
      })();
      class wD {}
      let iO = (() => {
        class e {
          constructor(n, r, o, i, s) {
            (this.router = n),
              (this.injector = o),
              (this.preloadingStrategy = i),
              (this.loader = s);
          }
          setUpPreloading() {
            this.subscription = this.router.events
              .pipe(
                ln((n) => n instanceof qn),
                zn(() => this.preload())
              )
              .subscribe(() => {});
          }
          preload() {
            return this.processRoutes(this.injector, this.router.config);
          }
          ngOnDestroy() {
            this.subscription && this.subscription.unsubscribe();
          }
          processRoutes(n, r) {
            const o = [];
            for (const i of r) {
              i.providers &&
                !i._injector &&
                (i._injector = gs(i.providers, n, `Route: ${i.path}`));
              const s = i._injector ?? n,
                a = i._loadedInjector ?? s;
              ((i.loadChildren && !i._loadedRoutes && void 0 === i.canLoad) ||
                (i.loadComponent && !i._loadedComponent)) &&
                o.push(this.preloadConfig(s, i)),
                (i.children || i._loadedRoutes) &&
                  o.push(this.processRoutes(a, i.children ?? i._loadedRoutes));
            }
            return _e(o).pipe(Zn());
          }
          preloadConfig(n, r) {
            return this.preloadingStrategy.preload(r, () => {
              let o;
              o =
                r.loadChildren && void 0 === r.canLoad
                  ? this.loader.loadChildren(n, r)
                  : A(null);
              const i = o.pipe(
                Se((s) =>
                  null === s
                    ? A(void 0)
                    : ((r._loadedRoutes = s.routes),
                      (r._loadedInjector = s.injector),
                      this.processRoutes(s.injector ?? n, s.routes))
                )
              );
              return r.loadComponent && !r._loadedComponent
                ? _e([i, this.loader.loadComponent(r)]).pipe(Zn())
                : i;
            });
          }
        }
        return (
          (e.ɵfac = function (n) {
            return new (n || e)(b(it), b(Ym), b(Jt), b(wD), b(Jc));
          }),
          (e.ɵprov = M({ token: e, factory: e.ɵfac, providedIn: "root" })),
          e
        );
      })();
      const td = new O("");
      let CD = (() => {
        class e {
          constructor(n, r, o, i, s = {}) {
            (this.urlSerializer = n),
              (this.transitions = r),
              (this.viewportScroller = o),
              (this.zone = i),
              (this.options = s),
              (this.lastId = 0),
              (this.lastSource = "imperative"),
              (this.restoredId = 0),
              (this.store = {}),
              (s.scrollPositionRestoration =
                s.scrollPositionRestoration || "disabled"),
              (s.anchorScrolling = s.anchorScrolling || "disabled");
          }
          init() {
            "disabled" !== this.options.scrollPositionRestoration &&
              this.viewportScroller.setHistoryScrollRestoration("manual"),
              (this.routerEventsSubscription = this.createScrollEvents()),
              (this.scrollEventsSubscription = this.consumeScrollEvents());
          }
          createScrollEvents() {
            return this.transitions.events.subscribe((n) => {
              n instanceof Lc
                ? ((this.store[this.lastId] =
                    this.viewportScroller.getScrollPosition()),
                  (this.lastSource = n.navigationTrigger),
                  (this.restoredId = n.restoredState
                    ? n.restoredState.navigationId
                    : 0))
                : n instanceof qn &&
                  ((this.lastId = n.id),
                  this.scheduleScrollEvent(
                    n,
                    this.urlSerializer.parse(n.urlAfterRedirects).fragment
                  ));
            });
          }
          consumeScrollEvents() {
            return this.transitions.events.subscribe((n) => {
              n instanceof Uv &&
                (n.position
                  ? "top" === this.options.scrollPositionRestoration
                    ? this.viewportScroller.scrollToPosition([0, 0])
                    : "enabled" === this.options.scrollPositionRestoration &&
                      this.viewportScroller.scrollToPosition(n.position)
                  : n.anchor && "enabled" === this.options.anchorScrolling
                  ? this.viewportScroller.scrollToAnchor(n.anchor)
                  : "disabled" !== this.options.scrollPositionRestoration &&
                    this.viewportScroller.scrollToPosition([0, 0]));
            });
          }
          scheduleScrollEvent(n, r) {
            this.zone.runOutsideAngular(() => {
              setTimeout(() => {
                this.zone.run(() => {
                  this.transitions.events.next(
                    new Uv(
                      n,
                      "popstate" === this.lastSource
                        ? this.store[this.restoredId]
                        : null,
                      r
                    )
                  );
                });
              }, 0);
            });
          }
          ngOnDestroy() {
            this.routerEventsSubscription?.unsubscribe(),
              this.scrollEventsSubscription?.unsubscribe();
          }
        }
        return (
          (e.ɵfac = function (n) {
            !(function ip() {
              throw new Error("invalid");
            })();
          }),
          (e.ɵprov = M({ token: e, factory: e.ɵfac })),
          e
        );
      })();
      var st = (() => (
        ((st = st || {})[(st.COMPLETE = 0)] = "COMPLETE"),
        (st[(st.FAILED = 1)] = "FAILED"),
        (st[(st.REDIRECTING = 2)] = "REDIRECTING"),
        st
      ))();
      const Wr = !1;
      function En(e, t) {
        return { ɵkind: e, ɵproviders: t };
      }
      const nd = new O("", { providedIn: "root", factory: () => !1 });
      function ED() {
        const e = W(tn);
        return (t) => {
          const n = e.get(_s);
          if (t !== n.components[0]) return;
          const r = e.get(it),
            o = e.get(bD);
          1 === e.get(rd) && r.initialNavigation(),
            e.get(ID, null, x.Optional)?.setUpPreloading(),
            e.get(td, null, x.Optional)?.init(),
            r.resetRootComponentType(n.componentTypes[0]),
            o.closed || (o.next(), o.complete(), o.unsubscribe());
        };
      }
      const bD = new O(Wr ? "bootstrap done indicator" : "", {
          factory: () => new Tt(),
        }),
        rd = new O(Wr ? "initial navigation" : "", {
          providedIn: "root",
          factory: () => 1,
        });
      function cO() {
        let e = [];
        return (
          (e = Wr
            ? [
                {
                  provide: qi,
                  multi: !0,
                  useFactory: () => {
                    const t = W(it);
                    return () =>
                      t.events.subscribe((n) => {
                        console.group?.(`Router Event: ${n.constructor.name}`),
                          console.log(
                            (function kx(e) {
                              if (!("type" in e))
                                return `Unknown Router Event: ${e.constructor.name}`;
                              switch (e.type) {
                                case 14:
                                  return `ActivationEnd(path: '${
                                    e.snapshot.routeConfig?.path || ""
                                  }')`;
                                case 13:
                                  return `ActivationStart(path: '${
                                    e.snapshot.routeConfig?.path || ""
                                  }')`;
                                case 12:
                                  return `ChildActivationEnd(path: '${
                                    e.snapshot.routeConfig?.path || ""
                                  }')`;
                                case 11:
                                  return `ChildActivationStart(path: '${
                                    e.snapshot.routeConfig?.path || ""
                                  }')`;
                                case 8:
                                  return `GuardsCheckEnd(id: ${e.id}, url: '${e.url}', urlAfterRedirects: '${e.urlAfterRedirects}', state: ${e.state}, shouldActivate: ${e.shouldActivate})`;
                                case 7:
                                  return `GuardsCheckStart(id: ${e.id}, url: '${e.url}', urlAfterRedirects: '${e.urlAfterRedirects}', state: ${e.state})`;
                                case 2:
                                  return `NavigationCancel(id: ${e.id}, url: '${e.url}')`;
                                case 16:
                                  return `NavigationSkipped(id: ${e.id}, url: '${e.url}')`;
                                case 1:
                                  return `NavigationEnd(id: ${e.id}, url: '${e.url}', urlAfterRedirects: '${e.urlAfterRedirects}')`;
                                case 3:
                                  return `NavigationError(id: ${e.id}, url: '${e.url}', error: ${e.error})`;
                                case 0:
                                  return `NavigationStart(id: ${e.id}, url: '${e.url}')`;
                                case 6:
                                  return `ResolveEnd(id: ${e.id}, url: '${e.url}', urlAfterRedirects: '${e.urlAfterRedirects}', state: ${e.state})`;
                                case 5:
                                  return `ResolveStart(id: ${e.id}, url: '${e.url}', urlAfterRedirects: '${e.urlAfterRedirects}', state: ${e.state})`;
                                case 10:
                                  return `RouteConfigLoadEnd(path: ${e.route.path})`;
                                case 9:
                                  return `RouteConfigLoadStart(path: ${e.route.path})`;
                                case 4:
                                  return `RoutesRecognized(id: ${e.id}, url: '${e.url}', urlAfterRedirects: '${e.urlAfterRedirects}', state: ${e.state})`;
                                case 15:
                                  return `Scroll(anchor: '${
                                    e.anchor
                                  }', position: '${
                                    e.position
                                      ? `${e.position[0]}, ${e.position[1]}`
                                      : null
                                  }')`;
                              }
                            })(n)
                          ),
                          console.log(n),
                          console.groupEnd?.();
                      });
                  },
                },
              ]
            : []),
          En(1, e)
        );
      }
      const ID = new O(Wr ? "router preloader" : "");
      function dO(e) {
        return En(0, [
          { provide: ID, useExisting: iO },
          { provide: wD, useExisting: e },
        ]);
      }
      const si = !1,
        SD = new O(
          si ? "router duplicate forRoot guard" : "ROUTER_FORROOT_GUARD"
        ),
        fO = [
          nc,
          { provide: Qo, useClass: xc },
          it,
          ei,
          {
            provide: Ur,
            useFactory: function _D(e) {
              return e.routerState.root;
            },
            deps: [it],
          },
          Jc,
          si ? { provide: nd, useValue: !0 } : [],
        ];
      function hO() {
        return new ry("Router", it);
      }
      let MD = (() => {
        class e {
          constructor(n) {}
          static forRoot(n, r) {
            return {
              ngModule: e,
              providers: [
                fO,
                si && r?.enableTracing ? cO().ɵproviders : [],
                { provide: Gr, multi: !0, useValue: n },
                {
                  provide: SD,
                  useFactory: yO,
                  deps: [[it, new ho(), new po()]],
                },
                { provide: la, useValue: r || {} },
                r?.useHash
                  ? { provide: Un, useClass: lT }
                  : { provide: Un, useClass: Sy },
                {
                  provide: td,
                  useFactory: () => {
                    const e = W(PA),
                      t = W(de),
                      n = W(la),
                      r = W(ua),
                      o = W(Qo);
                    return (
                      n.scrollOffset && e.setOffset(n.scrollOffset),
                      new CD(o, r, e, t, n)
                    );
                  },
                },
                r?.preloadingStrategy
                  ? dO(r.preloadingStrategy).ɵproviders
                  : [],
                { provide: ry, multi: !0, useFactory: hO },
                r?.initialNavigation ? vO(r) : [],
                [
                  { provide: TD, useFactory: ED },
                  { provide: ny, multi: !0, useExisting: TD },
                ],
              ],
            };
          }
          static forChild(n) {
            return {
              ngModule: e,
              providers: [{ provide: Gr, multi: !0, useValue: n }],
            };
          }
        }
        return (
          (e.ɵfac = function (n) {
            return new (n || e)(b(SD, 8));
          }),
          (e.ɵmod = Tn({ type: e })),
          (e.ɵinj = hn({ imports: [Gc] })),
          e
        );
      })();
      function yO(e) {
        if (si && e)
          throw new w(
            4007,
            "The Router was provided more than once. This can happen if 'forRoot' is used outside of the root injector. Lazy loaded modules should use RouterModule.forChild() instead."
          );
        return "guarded";
      }
      function vO(e) {
        return [
          "disabled" === e.initialNavigation
            ? En(3, [
                {
                  provide: Ds,
                  multi: !0,
                  useFactory: () => {
                    const t = W(it);
                    return () => {
                      t.setUpLocationChangeListener();
                    };
                  },
                },
                { provide: rd, useValue: 2 },
              ]).ɵproviders
            : [],
          "enabledBlocking" === e.initialNavigation
            ? En(2, [
                { provide: rd, useValue: 0 },
                {
                  provide: Ds,
                  multi: !0,
                  deps: [tn],
                  useFactory: (t) => {
                    const n = t.get(aT, Promise.resolve());
                    return () =>
                      n.then(
                        () =>
                          new Promise((r) => {
                            const o = t.get(it),
                              i = t.get(bD);
                            (function sO(e, t) {
                              e.events
                                .pipe(
                                  ln(
                                    (n) =>
                                      n instanceof qn ||
                                      n instanceof Ks ||
                                      n instanceof jc ||
                                      n instanceof Js
                                  ),
                                  z((n) =>
                                    n instanceof qn || n instanceof Js
                                      ? st.COMPLETE
                                      : n instanceof Ks &&
                                        (0 === n.code || 1 === n.code)
                                      ? st.REDIRECTING
                                      : st.FAILED
                                  ),
                                  ln((n) => n !== st.REDIRECTING),
                                  Hn(1)
                                )
                                .subscribe(() => {
                                  t();
                                });
                            })(o, () => {
                              r(!0);
                            }),
                              (t.get(ua).afterPreactivation = () => (
                                r(!0), i.closed ? A(void 0) : i
                              )),
                              o.initialNavigation();
                          })
                      );
                  },
                },
              ]).ɵproviders
            : [],
        ];
      }
      const TD = new O(si ? "Router Initializer" : ""),
        wO = [];
      let CO = (() => {
        class e {}
        return (
          (e.ɵfac = function (n) {
            return new (n || e)();
          }),
          (e.ɵmod = Tn({ type: e })),
          (e.ɵinj = hn({ imports: [MD.forRoot(wO), MD] })),
          e
        );
      })();
      function AD(e) {
        return Array.isArray(e) ? e : [e];
      }
      class bO extends Je {
        constructor(t, n) {
          super();
        }
        schedule(t, n = 0) {
          return this;
        }
      }
      const ca = {
          setInterval(e, t, ...n) {
            const { delegate: r } = ca;
            return r?.setInterval
              ? r.setInterval(e, t, ...n)
              : setInterval(e, t, ...n);
          },
          clearInterval(e) {
            const { delegate: t } = ca;
            return (t?.clearInterval || clearInterval)(e);
          },
          delegate: void 0,
        },
        RD = { now: () => (RD.delegate || Date).now(), delegate: void 0 };
      class ai {
        constructor(t, n = ai.now) {
          (this.schedulerActionCtor = t), (this.now = n);
        }
        schedule(t, n = 0, r) {
          return new this.schedulerActionCtor(this, t).schedule(r, n);
        }
      }
      ai.now = RD.now;
      const MO = new (class SO extends ai {
        constructor(t, n = ai.now) {
          super(t, n), (this.actions = []), (this._active = !1);
        }
        flush(t) {
          const { actions: n } = this;
          if (this._active) return void n.push(t);
          let r;
          this._active = !0;
          do {
            if ((r = t.execute(t.state, t.delay))) break;
          } while ((t = n.shift()));
          if (((this._active = !1), r)) {
            for (; (t = n.shift()); ) t.unsubscribe();
            throw r;
          }
        }
      })(
        class IO extends bO {
          constructor(t, n) {
            super(t, n),
              (this.scheduler = t),
              (this.work = n),
              (this.pending = !1);
          }
          schedule(t, n = 0) {
            var r;
            if (this.closed) return this;
            this.state = t;
            const o = this.id,
              i = this.scheduler;
            return (
              null != o && (this.id = this.recycleAsyncId(i, o, n)),
              (this.pending = !0),
              (this.delay = n),
              (this.id =
                null !== (r = this.id) && void 0 !== r
                  ? r
                  : this.requestAsyncId(i, this.id, n)),
              this
            );
          }
          requestAsyncId(t, n, r = 0) {
            return ca.setInterval(t.flush.bind(t, this), r);
          }
          recycleAsyncId(t, n, r = 0) {
            if (null != r && this.delay === r && !1 === this.pending) return n;
            null != n && ca.clearInterval(n);
          }
          execute(t, n) {
            if (this.closed) return new Error("executing a cancelled action");
            this.pending = !1;
            const r = this._execute(t, n);
            if (r) return r;
            !1 === this.pending &&
              null != this.id &&
              (this.id = this.recycleAsyncId(this.scheduler, this.id, null));
          }
          _execute(t, n) {
            let o,
              r = !1;
            try {
              this.work(t);
            } catch (i) {
              (r = !0),
                (o = i || new Error("Scheduled action threw falsy error"));
            }
            if (r) return this.unsubscribe(), o;
          }
          unsubscribe() {
            if (!this.closed) {
              const { id: t, scheduler: n } = this,
                { actions: r } = n;
              (this.work = this.state = this.scheduler = null),
                (this.pending = !1),
                Yn(r, this),
                null != t && (this.id = this.recycleAsyncId(n, t, null)),
                (this.delay = null),
                super.unsubscribe();
            }
          }
        }
      );
      function AO(e) {
        return ye((t, n) => {
          at(e).subscribe(ve(n, () => n.complete(), fa)),
            !n.closed && t.subscribe(n);
        });
      }
      let od;
      try {
        od = typeof Intl < "u" && Intl.v8BreakIterator;
      } catch {
        od = !1;
      }
      let RO = (() => {
        class e {
          constructor(n) {
            (this._platformId = n),
              (this.isBrowser = this._platformId
                ? (function xA(e) {
                    return e === zy;
                  })(this._platformId)
                : "object" == typeof document && !!document),
              (this.EDGE =
                this.isBrowser && /(edge)/i.test(navigator.userAgent)),
              (this.TRIDENT =
                this.isBrowser && /(msie|trident)/i.test(navigator.userAgent)),
              (this.BLINK =
                this.isBrowser &&
                !(!window.chrome && !od) &&
                typeof CSS < "u" &&
                !this.EDGE &&
                !this.TRIDENT),
              (this.WEBKIT =
                this.isBrowser &&
                /AppleWebKit/i.test(navigator.userAgent) &&
                !this.BLINK &&
                !this.EDGE &&
                !this.TRIDENT),
              (this.IOS =
                this.isBrowser &&
                /iPad|iPhone|iPod/.test(navigator.userAgent) &&
                !("MSStream" in window)),
              (this.FIREFOX =
                this.isBrowser &&
                /(firefox|minefield)/i.test(navigator.userAgent)),
              (this.ANDROID =
                this.isBrowser &&
                /android/i.test(navigator.userAgent) &&
                !this.TRIDENT),
              (this.SAFARI =
                this.isBrowser &&
                /safari/i.test(navigator.userAgent) &&
                this.WEBKIT);
          }
        }
        return (
          (e.ɵfac = function (n) {
            return new (n || e)(b(jl));
          }),
          (e.ɵprov = M({ token: e, factory: e.ɵfac, providedIn: "root" })),
          e
        );
      })();
      const PD = new Set();
      let Qr,
        OO = (() => {
          class e {
            constructor(n) {
              (this._platform = n),
                (this._matchMedia =
                  this._platform.isBrowser && window.matchMedia
                    ? window.matchMedia.bind(window)
                    : FO);
            }
            matchMedia(n) {
              return (
                (this._platform.WEBKIT || this._platform.BLINK) &&
                  (function NO(e) {
                    if (!PD.has(e))
                      try {
                        Qr ||
                          ((Qr = document.createElement("style")),
                          Qr.setAttribute("type", "text/css"),
                          document.head.appendChild(Qr)),
                          Qr.sheet &&
                            (Qr.sheet.insertRule(`@media ${e} {body{ }}`, 0),
                            PD.add(e));
                      } catch (t) {
                        console.error(t);
                      }
                  })(n),
                this._matchMedia(n)
              );
            }
          }
          return (
            (e.ɵfac = function (n) {
              return new (n || e)(b(RO));
            }),
            (e.ɵprov = M({ token: e, factory: e.ɵfac, providedIn: "root" })),
            e
          );
        })();
      function FO(e) {
        return {
          matches: "all" === e || "" === e,
          media: e,
          addListener: () => {},
          removeListener: () => {},
        };
      }
      let sd = (() => {
        class e {
          constructor(n, r) {
            (this._mediaMatcher = n),
              (this._zone = r),
              (this._queries = new Map()),
              (this._destroySubject = new Tt());
          }
          ngOnDestroy() {
            this._destroySubject.next(), this._destroySubject.complete();
          }
          isMatched(n) {
            return OD(AD(n)).some((o) => this._registerQuery(o).mql.matches);
          }
          observe(n) {
            let i = Mc(OD(AD(n)).map((s) => this._registerQuery(s).observable));
            return (
              (i = Us(
                i.pipe(Hn(1)),
                i.pipe(
                  (function EO(e) {
                    return ln((t, n) => e <= n);
                  })(1),
                  (function TO(e, t = MO) {
                    return ye((n, r) => {
                      let o = null,
                        i = null,
                        s = null;
                      const a = () => {
                        if (o) {
                          o.unsubscribe(), (o = null);
                          const l = i;
                          (i = null), r.next(l);
                        }
                      };
                      function u() {
                        const l = s + e,
                          c = t.now();
                        if (c < l)
                          return (
                            (o = this.schedule(void 0, l - c)), void r.add(o)
                          );
                        a();
                      }
                      n.subscribe(
                        ve(
                          r,
                          (l) => {
                            (i = l),
                              (s = t.now()),
                              o || ((o = t.schedule(u, e)), r.add(o));
                          },
                          () => {
                            a(), r.complete();
                          },
                          void 0,
                          () => {
                            i = o = null;
                          }
                        )
                      );
                    });
                  })(0)
                )
              )),
              i.pipe(
                z((s) => {
                  const a = { matches: !1, breakpoints: {} };
                  return (
                    s.forEach(({ matches: u, query: l }) => {
                      (a.matches = a.matches || u), (a.breakpoints[l] = u);
                    }),
                    a
                  );
                })
              )
            );
          }
          _registerQuery(n) {
            if (this._queries.has(n)) return this._queries.get(n);
            const r = this._mediaMatcher.matchMedia(n),
              i = {
                observable: new me((s) => {
                  const a = (u) => this._zone.run(() => s.next(u));
                  return (
                    r.addListener(a),
                    () => {
                      r.removeListener(a);
                    }
                  );
                }).pipe(
                  Dv(r),
                  z(({ matches: s }) => ({ query: n, matches: s })),
                  AO(this._destroySubject)
                ),
                mql: r,
              };
            return this._queries.set(n, i), i;
          }
        }
        return (
          (e.ɵfac = function (n) {
            return new (n || e)(b(OO), b(de));
          }),
          (e.ɵprov = M({ token: e, factory: e.ɵfac, providedIn: "root" })),
          e
        );
      })();
      function OD(e) {
        return e
          .map((t) => t.split(","))
          .reduce((t, n) => t.concat(n))
          .map((t) => t.trim());
      }
      const bn_HandsetPortrait =
          "(max-width: 599.98px) and (orientation: portrait)",
        bn_WebLandscape = "(min-width: 1280px) and (orientation: landscape)";
      let kO = (() => {
        class e {
          constructor(n) {
            this.breakpointObserver = n;
          }
          ngOnInit() {}
        }
        return (
          (e.ɵfac = function (n) {
            return new (n || e)(I(sd));
          }),
          (e.ɵcmp = Pt({
            type: e,
            selectors: [["baner"]],
            decls: 18,
            vars: 0,
            consts: [
              [1, "container"],
              [1, "title"],
              [1, "name"],
              [1, "profile"],
              [1, "profile-bg"],
              ["src", "assets/NoBackground.png", "alt", ""],
            ],
            template: function (n, r) {
              1 & n &&
                (F(0, "div", 0)(1, "div", 1)(2, "span"),
                Y(3, "My Portfolio"),
                P()(),
                F(4, "div", 2)(5, "span")(6, "span"),
                Y(7, "Hi,"),
                P(),
                Y(8, " I am "),
                P(),
                Ve(9, "br"),
                F(10, "span"),
                Y(11, "Yassine Sboui"),
                P(),
                Ve(12, "br"),
                F(13, "span"),
                Y(14, "Software Developer"),
                P()(),
                F(15, "div", 3),
                Ve(16, "div", 4)(17, "img", 5),
                P()());
            },
            styles: [
              "[_nghost-%COMP%]{display:block;padding:4rem 2rem 6rem;background-color:var(--dark-gray);clip-path:polygon(0% 0%,100% 0%,100% 95%,50% 100%,0% 95%)}.container[_ngcontent-%COMP%]{display:grid;grid-template-columns:1fr}.title[_ngcontent-%COMP%]{font-size:4rem;padding:0 0 2rem;text-align:center;font-style:italic;color:var(--green);text-decoration:underline;font-family:Roboto Condensed,sans-serif}.name[_ngcontent-%COMP%]{grid-row:3/4;padding:2rem;color:#fff;font-size:2rem;margin-top:3rem;outline:1px solid white;font-family:Roboto Condensed,sans-serif}.name[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]:nth-of-type(1)   span[_ngcontent-%COMP%]{font-size:3rem;color:var(--green)}.name[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]:nth-of-type(2){display:inline-block;color:var(--green);font-size:4rem;font-weight:700;padding:10px 0;letter-spacing:8px;text-shadow:10px 8px 10px var(--black)}.profile[_ngcontent-%COMP%]{width:300px;height:300px;grid-row:2/3;margin:0 auto;position:relative;clip-path:inset(0 round 0 0 25%)}.profile[_ngcontent-%COMP%]   .profile-bg[_ngcontent-%COMP%]{height:75%;width:75%;bottom:0%;position:absolute;background-color:#69f0ae;clip-path:inset(0 round 50% 0 0)}.profile[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]{height:100%;position:absolute}.pc[_nghost-%COMP%]{padding:4rem 2rem 10rem;clip-path:polygon(0% 0%,100% 0%,100% 90%,50% 100%,0% 90%)}.pc[_nghost-%COMP%]   .container[_ngcontent-%COMP%]{grid-template-columns:1fr 1fr;grid-template-rows:1fr 2fr}.pc[_nghost-%COMP%]   .title[_ngcontent-%COMP%]{grid-column:1/2;padding:0%;margin:auto;font-size:5rem;font-style:normal;text-decoration:none}.pc[_nghost-%COMP%]   .profile[_ngcontent-%COMP%]{grid-row:1/3;grid-column:2/3;width:600px;height:600px}.pc[_nghost-%COMP%]   .name[_ngcontent-%COMP%]{grid-row:2/3;width:600px;margin:auto auto 0 0;height:max-content}",
            ],
          })),
          e
        );
      })();
      function LO(e, t) {
        if ((1 & e && (F(0, "td"), Y(1), P()), 2 & e)) {
          const n = t.$implicit;
          te(1), ke(n);
        }
      }
      function jO(e, t) {
        if ((1 & e && (F(0, "tr"), jt(1, LO, 2, 1, "td", 2), P()), 2 & e)) {
          const n = t.$implicit;
          te(1), ht("ngForOf", n);
        }
      }
      function $O(e, t) {
        if ((1 & e && (F(0, "p"), Y(1), P()), 2 & e)) {
          const n = t.$implicit;
          te(1), Ao(" ", n, " ");
        }
      }
      let BO = (() => {
        class e {
          constructor() {
            (this.myData = [
              ["Name", "Yassine Sboui"],
              ["DOB", "07/08/2000"],
              [
                "Education",
                "Higher Institute of Technological Studies of Charguia (2023)",
              ],
              ["Interests", "SPORTS ( GYM / FOOTBALL) / GAMING"],
            ]),
              (this.aboutMe = [
                "I am a 22-year-old senior technician specializing in information systems development.",
                "I approach life with a constant smile and an insatiable thirst for new professional experiences.",
                "I possess a strong sense of perseverance and professionalism, which I bring to every endeavor.",
                "Currently, I am actively seeking a job opportunity in the field of web development.",
              ]);
          }
          ngOnInit() {}
        }
        return (
          (e.ɵfac = function (n) {
            return new (n || e)();
          }),
          (e.ɵcmp = Pt({
            type: e,
            selectors: [["personal-information"]],
            decls: 9,
            vars: 2,
            consts: [
              [1, "container"],
              [1, "title"],
              [4, "ngFor", "ngForOf"],
            ],
            template: function (n, r) {
              1 & n &&
                (F(0, "div", 0)(1, "h1", 1)(2, "span"),
                Y(3, "Personal Information"),
                P()(),
                F(4, "table")(5, "tbody"),
                jt(6, jO, 2, 1, "tr", 2),
                P()(),
                F(7, "section"),
                jt(8, $O, 2, 1, "p", 2),
                P()()),
                2 & n &&
                  (te(6),
                  ht("ngForOf", r.myData),
                  te(2),
                  ht("ngForOf", r.aboutMe));
            },
            dependencies: [kr],
            styles: [
              "[_nghost-%COMP%]{display:block;color:#fff;padding:3rem 2rem}.container[_ngcontent-%COMP%]{gap:2rem;display:grid}table[_ngcontent-%COMP%]{font-size:1.3rem;outline:1px solid white}table[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%]{height:40px}table[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%]   td[_ngcontent-%COMP%]{padding-left:.5rem}table[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%]   td[_ngcontent-%COMP%]:nth-child(even){color:var(--green)}section[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]{font-size:1.2rem;text-align:justify}section[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]:not(:first-child){margin-top:1rem}.pc[_nghost-%COMP%]{margin-top:3rem}.pc[_nghost-%COMP%]   .container[_ngcontent-%COMP%]{grid-template-columns:1fr 1fr}.pc[_nghost-%COMP%]   h1[_ngcontent-%COMP%]{grid-column:1/3}.pc[_nghost-%COMP%]   section[_ngcontent-%COMP%], .pc[_nghost-%COMP%]   table[_ngcontent-%COMP%]{width:80%;margin:auto}",
            ],
          })),
          e
        );
      })();
      function VO(e, t) {
        if (
          (1 & e &&
            (F(0, "section")(1, "h2"),
            Y(2),
            P(),
            F(3, "h3"),
            Y(4),
            P(),
            F(5, "h4"),
            Y(6),
            P(),
            F(7, "h4"),
            Y(8),
            P()()),
          2 & e)
        ) {
          const n = t.$implicit;
          te(2),
            ke(n.course),
            te(2),
            ke(n.institute),
            te(2),
            ke(n.duration),
            te(2),
            ke(n.score);
        }
      }
      let UO = (() => {
        class e {
          constructor() {
            this.educationList = [
              {
                institute: "Iset Charguia",
                course: "LICENCE",
                duration: "2019-2023",
                score: "Honors",
              },
              {
                institute: "L'aouina high school",
                course: "BACCALAUREATE",
                duration: "2019",
                score: "Fairly good mention",
              },
            ];
          }
          ngOnInit() {}
        }
        return (
          (e.ɵfac = function (n) {
            return new (n || e)();
          }),
          (e.ɵcmp = Pt({
            type: e,
            selectors: [["education"]],
            decls: 4,
            vars: 1,
            consts: [
              [1, "container"],
              [4, "ngFor", "ngForOf"],
            ],
            template: function (n, r) {
              1 & n &&
                (F(0, "div", 0)(1, "h1"),
                Y(2, "Education"),
                P(),
                jt(3, VO, 9, 4, "section", 1),
                P()),
                2 & n && (te(3), ht("ngForOf", r.educationList));
            },
            dependencies: [kr],
            styles: [
              "[_nghost-%COMP%]{display:block;color:#fff;padding:3rem 2rem}section[_ngcontent-%COMP%]{margin-top:2rem}section[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%]{color:var(--green)}section[_ngcontent-%COMP%]   h4[_ngcontent-%COMP%]{color:var(--gray-light)}.pc[_nghost-%COMP%]   section[_ngcontent-%COMP%]{width:600px;position:relative;margin-left:5rem;display:grid;gap:0 1.5rem;grid-template-columns:1fr 5fr;grid-template-rows:repeat(3,1fr)}.pc[_nghost-%COMP%]   section[_ngcontent-%COMP%]   h4[_ngcontent-%COMP%]:nth-child(4){grid-row:1/4;margin-top:0%;display:flex;font-size:1.5rem;align-items:center;justify-content:center;border-right:1px solid white}",
            ],
          })),
          e
        );
      })();
      function HO(e, t) {
        if ((1 & e && (F(0, "li"), Y(1), P()), 2 & e)) {
          const n = t.$implicit;
          te(1), ke(n);
        }
      }
      function zO(e, t) {
        if (
          (1 & e &&
            (F(0, "li")(1, "h2"),
            Y(2),
            P(),
            F(3, "h3"),
            Y(4),
            P(),
            F(5, "h4"),
            Y(6),
            P(),
            F(7, "ul"),
            jt(8, HO, 2, 1, "li", 1),
            P()()),
          2 & e)
        ) {
          const n = t.$implicit;
          te(2),
            ke(n.role),
            te(2),
            ke(n.company),
            te(2),
            ke(n.duration),
            te(2),
            ht("ngForOf", n.description);
        }
      }
      let GO = (() => {
        class e {
          constructor() {
            this.workExpList = [
              {
                role: "Internship ( Web developer )",
                company: "Sofiatech",
                duration: "feb. 2023 - jul. 2023",
                description: [
                  "AI-powered resume screening for better matches.",
                  "AI-driven analysis for precise candidate-job fit.",
                  "Automated tasks for efficient recruitment processes.",
                ],
              },
              {
                role: "Internship ( Mobile developer )",
                company: "Al\xe9ria Consulting",
                duration: "jan. 2022 - feb. 2022",
                description: [
                  "Mobile Development/Augmented Reality using AndroidStudio & Unity.",
                  "Mobile App with AR using AndroidStudio + Unity for real-field testing.",
                  "AR-based guidance in the field using AndroidStudio & Unity.",
                ],
              },
              {
                role: "Internship ( Web developer )",
                company: "Al\xe9ria Consulting",
                duration: "jul. 2021 - aug 2021",
                description: [
                  "Front-end website creation for billboard rentals using React.",
                  "Web development for billboard rental website with React.",
                  "Building a billboard rental platform using React.",
                ],
              },
            ];
          }
          ngOnInit() {}
        }
        return (
          (e.ɵfac = function (n) {
            return new (n || e)();
          }),
          (e.ɵcmp = Pt({
            type: e,
            selectors: [["work-experience"]],
            decls: 5,
            vars: 1,
            consts: [
              [1, "container"],
              [4, "ngFor", "ngForOf"],
            ],
            template: function (n, r) {
              1 & n &&
                (F(0, "div", 0)(1, "h1"),
                Y(2, "Work Experience"),
                P(),
                F(3, "ul"),
                jt(4, zO, 9, 4, "li", 1),
                P()()),
                2 & n && (te(4), ht("ngForOf", r.workExpList));
            },
            dependencies: [kr],
            styles: [
              '[_nghost-%COMP%]{display:block;color:#fff;padding:3rem 2rem}ul[_ngcontent-%COMP%]:has(ul){padding:0%;list-style:none}ul[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]:has(ul){margin-top:2rem}ul[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%]{color:var(--green)}ul[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]   h4[_ngcontent-%COMP%]{color:var(--gray-light)}.pc[_nghost-%COMP%]   ul[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]:has(ul){width:max-content;position:relative;margin-left:5rem}.pc[_nghost-%COMP%]   ul[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]:has(ul):before{content:"";position:absolute;width:20px;height:20px;left:-60px;top:5px;border-radius:50%;z-index:2;background-color:var(--green)}.pc[_nghost-%COMP%]   ul[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]:has(ul):after{content:"";position:absolute;width:1px;height:130%;left:-50px;top:5%;z-index:1;background-color:var(--gray-light)}.pc[_nghost-%COMP%]   ul[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]:has(ul):last-child:after{height:100%}',
            ],
          })),
          e
        );
      })();
      const WO = function (e) {
        return { width: e };
      };
      function qO(e, t) {
        if (
          (1 & e &&
            (F(0, "section")(1, "h2"),
            Y(2),
            P(),
            F(3, "h4"),
            Y(4),
            P(),
            F(5, "div", 2)(6, "div", 3),
            Ve(7, "div", 4),
            P(),
            F(8, "div"),
            Y(9),
            P()()()),
          2 & e)
        ) {
          const n = t.$implicit;
          te(2),
            ke(n.name),
            te(2),
            ke(n.level),
            te(3),
            ht("ngStyle", hm(4, WO, n.rating + "%")),
            te(2),
            Ao("", n.rating, "%");
        }
      }
      let QO = (() => {
        class e {
          constructor() {
            this.skills = [
              {
                name: "Angular, Angular Material, Bootstap5",
                level: "specialist",
                rating: 85,
              },
              {
                name: "NodeJS, ExpressJS, MongoDB",
                level: "specialist",
                rating: 80,
              },
              { name: "ReactJS", level: "Intermidiate", rating: 70 },
              {
                name: "Android Studio, FastAPI, SpringBoot, MySQL, UNITY",
                level: "Practitioner",
                rating: 60,
              },
            ];
          }
          ngOnInit() {}
        }
        return (
          (e.ɵfac = function (n) {
            return new (n || e)();
          }),
          (e.ɵcmp = Pt({
            type: e,
            selectors: [["skills"]],
            decls: 4,
            vars: 1,
            consts: [
              [1, "container"],
              [4, "ngFor", "ngForOf"],
              [1, "rating"],
              [1, "bar"],
              [3, "ngStyle"],
            ],
            template: function (n, r) {
              1 & n &&
                (F(0, "div", 0)(1, "h1"),
                Y(2, "Skills"),
                P(),
                jt(3, qO, 10, 6, "section", 1),
                P()),
                2 & n && (te(3), ht("ngForOf", r.skills));
            },
            dependencies: [kr, Uy],
            styles: [
              "[_nghost-%COMP%]{display:block;color:#fff;padding:3rem 2rem}section[_ngcontent-%COMP%]{margin-top:2rem}section[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%]{color:var(--green);font-family:Roboto Condensed,sans-serif}section[_ngcontent-%COMP%]   .rating[_ngcontent-%COMP%]{width:100%;height:max-content;margin-top:.5rem;display:flex;align-items:center;justify-content:space-between}section[_ngcontent-%COMP%]   .rating[_ngcontent-%COMP%]   .bar[_ngcontent-%COMP%]{height:5px;flex-grow:1;margin-right:1rem;background-color:#fff3}section[_ngcontent-%COMP%]   .rating[_ngcontent-%COMP%]   .bar[_ngcontent-%COMP%]   div[_ngcontent-%COMP%]{height:100%;background-color:var(--green)}.pc[_nghost-%COMP%]   .container[_ngcontent-%COMP%]{display:grid;gap:2rem 4rem;grid-template-columns:1fr 1fr}.pc[_nghost-%COMP%]   h1[_ngcontent-%COMP%]{grid-column:1/3}.pc[_nghost-%COMP%]   section[_ngcontent-%COMP%]{margin-top:1rem}",
            ],
          })),
          e
        );
      })();
      function YO(e, t) {
        if ((1 & e && (F(0, "ul")(1, "li"), Y(2), P()()), 2 & e)) {
          const n = t.$implicit;
          te(2), ke(n);
        }
      }
      function ZO(e, t) {
        if (
          (1 & e &&
            (F(0, "section")(1, "h2"),
            Y(2),
            P(),
            F(3, "h3")(4, "span"),
            Y(5, "Technologies: "),
            P(),
            F(6, "span"),
            Y(7),
            P()(),
            jt(8, YO, 3, 1, "ul", 1),
            P()),
          2 & e)
        ) {
          const n = t.$implicit;
          te(2),
            ke(n.title),
            te(5),
            ke(n.technologies),
            te(1),
            ht("ngForOf", n.description);
        }
      }
      let KO = (() => {
          class e {
            constructor() {
              this.projects = [
                {
                  title:
                    "Recruitment web application with artificial intelligence",
                  technologies:
                    "Angular, Angular Material, Bootstrap5, NodeJS, ExpressJS, MongoDB, Python, Spacy, FastAPI",
                  description: [
                    "Implemented responsive and user-friendly interfaces using Angular, Angular Material, and Bootstrap5.",
                    "Utilized NodeJS and ExpressJS to develop API endpoints for handling non-AI related functionalities such as user management and database operations.",
                    "Designed and developed a scalable MongoDB database to store and manage recruitment-related data such as job postings, candidate profiles, and application records.",
                    "Integrated Python and Spacy into the application to leverage natural language processing and AI capabilities for resume parsing, sentiment analysis, and candidate matching.",
                    "Implemented FastAPI, a Python framework, to build API endpoints specifically for AI-related functionalities, such as processing and analyzing candidate data using machine learning models.",
                    "Ensured seamless integration between the frontend and backend components of the application through close collaboration with designers, frontend developers, and backend developers.",
                    "Deployed the web application on a production environment, optimizing it for high performance and reliability.",
                    "Continuously monitored and improved the application's user experience, performance, and AI functionalities.",
                  ],
                },
                {
                  title: "Travel Agency website",
                  technologies:
                    "Angular, Angular Material, NodeJS , ExpressJS , MongoDB",
                  description: [
                    "Implemented responsive and interactive user interfaces using Angular and Angular Material.",
                    "Utilized NodeJS and ExpressJS to build the server-side logic and handle API requests.",
                    "Designed and developed a scalable database using MongoDB to store and manage data related to travel agencies, destinations, bookings, and user profiles.",
                    "Implemented authentication and authorization mechanisms to ensure secure access to the site web.",
                    "Collaborated with designers, frontend developers, and backend developers to ensure seamless integration of frontend and backend components.",
                    "Deployed the site web on a production environment, ensuring high performance and reliability.",
                    "Continuously monitored and optimized the site web to improve user experience and performance.",
                  ],
                },
                {
                  title:
                    "Mobile Development/Augmented Reality: Farmer Guidance Application",
                  technologies: "Android Studio, Unity",
                  description: [
                    "Utilized Android Studio, an integrated development environment, to design, develop, and test the mobile application for the Android platform.",
                    "Collaborated with a team of developers, designers, and agricultural experts to understand the specific needs and requirements of farmers.",
                    "Implemented features in the mobile application to assist farmers in crop selection, pest management, and irrigation techniques.",
                    "Incorporated augmented reality (AR) technology into the application using Unity, a popular game development platform, to create an immersive AR experience for farmers.",
                    "Developed interactive AR elements that could be overlaid onto the real-world environment when viewed through the mobile device's camera.",
                    "Ensured seamless integration between the mobile application developed in Android Studio and the AR components created in Unity.",
                    "Conducted field tests to evaluate the application's effectiveness and gathered feedback from farmers.",
                    "Continuously improved and enhanced the mobile application based on user feedback and advancements in technology.",
                    "Deployed the mobile application on the Android app store, making it accessible for farmers to download and utilize.",
                  ],
                },
                {
                  title:
                    "Web Development: Front-End of Billboard Rental Website",
                  technologies: "React",
                  description: [
                    "Developed the front-end of a billboard rental website using React.",
                    "Utilized React, a popular JavaScript library, to build a responsive and dynamic user interface.",
                    "Collaborated with a team of designers and developers to design and implement the website's features.",
                    "Created reusable components using React's composition and modularity concepts.",
                    "Managed application state using React hooks and context to ensure efficient data management and user interactions.",
                    "Integrated third-party libraries and APIs to add additional functionalities such as billboard geolocation and online payments.",
                    "Optimized website performance using efficient rendering techniques, code splitting, and caching.",
                    "Performed unit testing and user interface testing to ensure the quality and reliability of the front-end.",
                    "Worked closely with the back-end team to integrate front-end features with APIs and back-end services.",
                    "Deployed the website to a server or hosting platform, ensuring continuous availability and optimal user experience.",
                  ],
                },
              ];
            }
            ngOnInit() {}
          }
          return (
            (e.ɵfac = function (n) {
              return new (n || e)();
            }),
            (e.ɵcmp = Pt({
              type: e,
              selectors: [["projects"]],
              decls: 4,
              vars: 1,
              consts: [
                [1, "container"],
                [4, "ngFor", "ngForOf"],
              ],
              template: function (n, r) {
                1 & n &&
                  (F(0, "div", 0)(1, "h1"),
                  Y(2, "Projects"),
                  P(),
                  jt(3, ZO, 9, 3, "section", 1),
                  P()),
                  2 & n && (te(3), ht("ngForOf", r.projects));
              },
              dependencies: [kr],
              styles: [
                '[_nghost-%COMP%]{display:block;color:#fff;padding:2rem 3rem}section[_ngcontent-%COMP%]{margin-top:2rem}section[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%]{color:var(--green)}section[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%]{margin-top:.5rem;color:var(--gray-light)}section[_ngcontent-%COMP%]   ul[_ngcontent-%COMP%]{margin-top:.5rem;list-style:circle}.pc[_nghost-%COMP%]   section[_ngcontent-%COMP%]{margin-left:5rem;position:relative}.pc[_nghost-%COMP%]   section[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]:nth-child(2){color:#fff}.pc[_nghost-%COMP%]   section[_ngcontent-%COMP%]:before{content:"";position:absolute;width:20px;height:20px;left:-60px;top:5px;border-radius:50%;z-index:2;background-color:var(--green)}.pc[_nghost-%COMP%]   section[_ngcontent-%COMP%]:after{content:"";position:absolute;width:1px;height:130%;left:-50px;top:5%;z-index:1;background-color:var(--gray-light)}.pc[_nghost-%COMP%]   section[_ngcontent-%COMP%]:last-child:after{height:100%}',
              ],
            })),
            e
          );
        })(),
        JO = (() => {
          class e {
            constructor() {}
            ngOnInit() {}
          }
          return (
            (e.ɵfac = function (n) {
              return new (n || e)();
            }),
            (e.ɵcmp = Pt({
              type: e,
              selectors: [["contact"]],
              decls: 24,
              vars: 0,
              consts: [
                [1, "container"],
                [1, "social-media"],
                ["href", "mailto:sboui.ys7@gmail.com"],
                [1, "bx", "bxl-gmail"],
                ["href", "https://www.facebook.com/Ysboui7"],
                [1, "bx", "bxl-facebook-circle"],
                ["href", "https://www.instagram.com/yassine.sboui7/"],
                [1, "bx", "bxl-instagram"],
                ["href", "https://www.linkedin.com/in/yassine7sboui/"],
                [1, "bx", "bxl-linkedin"],
                ["href", "https://github.com/YassineSboui"],
                [1, "bx", "bxl-github"],
                [1, "contact-info"],
              ],
              template: function (n, r) {
                1 & n &&
                  (F(0, "div", 0)(1, "h1"),
                  Y(2, "Contact"),
                  P(),
                  F(3, "ul", 1)(4, "a", 2)(5, "li"),
                  Ve(6, "i", 3),
                  P()(),
                  F(7, "a", 4)(8, "li"),
                  Ve(9, "i", 5),
                  P()(),
                  F(10, "a", 6)(11, "li"),
                  Ve(12, "i", 7),
                  P()(),
                  F(13, "a", 8)(14, "li"),
                  Ve(15, "i", 9),
                  P()(),
                  F(16, "a", 10)(17, "li"),
                  Ve(18, "i", 11),
                  P()()(),
                  F(19, "ul", 12)(20, "li"),
                  Y(21, "Mobile: +216 29469868"),
                  P(),
                  F(22, "li"),
                  Y(23, "sboui.ys7@gmail.com"),
                  P()()());
              },
              styles: [
                "[_nghost-%COMP%]{display:block;color:#fff;padding:2rem 3rem}ul[_ngcontent-%COMP%]{margin-top:2rem;list-style:none;padding:0%}.social-media[_ngcontent-%COMP%]{font-size:2rem;display:flex;align-items:center;justify-content:space-around}.social-media[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]{height:60px;width:60px;display:flex;align-items:center;justify-content:center;border-radius:50%;color:var(--green);background-color:#fff3}.contact-info[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]{height:30px;font-size:1.2rem}.pc[_nghost-%COMP%]   .container[_ngcontent-%COMP%]{display:grid;gap:2rem;grid-template-columns:1fr 1fr}.pc[_nghost-%COMP%]   h1[_ngcontent-%COMP%]{grid-column:1/3}.pc[_nghost-%COMP%]   .social-media[_ngcontent-%COMP%], .pc[_nghost-%COMP%]   .contact-info[_ngcontent-%COMP%]{width:400px;margin:0 auto}.pc[_nghost-%COMP%]   .social-media[_ngcontent-%COMP%]{cursor:pointer}.pc[_nghost-%COMP%]   .social-media[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]:hover{background-color:#ffffff4d}",
              ],
            })),
            e
          );
        })(),
        XO = (() => {
          class e {
            constructor(n, r) {
              (this.element = n),
                (this.breakpointObserver = r),
                this.breakpointObserver
                  .observe([bn_HandsetPortrait, bn_WebLandscape])
                  .subscribe({
                    next: (o) => {
                      for (let i of Object.keys(o.breakpoints))
                        o.breakpoints[i] &&
                          (i === bn_HandsetPortrait &&
                            this.element.nativeElement.classList.remove("pc"),
                          i === bn_WebLandscape &&
                            this.element.nativeElement.classList.add("pc"));
                    },
                  });
            }
          }
          return (
            (e.ɵfac = function (n) {
              return new (n || e)(I(Xt), I(sd));
            }),
            (e.ɵdir = Re({ type: e, selectors: [["", "responsive", ""]] })),
            e
          );
        })(),
        e1 = (() => {
          class e {
            constructor(n) {
              (this.breakpointObserver = n),
                (this.title = "Portfolio"),
                (this.pcMode = !1),
                this.breakpointObserver
                  .observe([bn_HandsetPortrait, bn_WebLandscape])
                  .subscribe({
                    next: (r) => {
                      for (let o of Object.keys(r.breakpoints))
                        r.breakpoints[o] &&
                          (o === bn_HandsetPortrait && (this.pcMode = !1),
                          o === bn_WebLandscape && (this.pcMode = !0));
                    },
                  });
            }
          }
          return (
            (e.ɵfac = function (n) {
              return new (n || e)(I(sd));
            }),
            (e.ɵcmp = Pt({
              type: e,
              selectors: [["app-root"]],
              hostVars: 2,
              hostBindings: function (n, r) {
                2 & n && pl("pc", r.pcMode);
              },
              decls: 8,
              vars: 0,
              consts: [
                ["responsive", ""],
                [1, "container"],
              ],
              template: function (n, r) {
                1 & n &&
                  (Ve(0, "baner", 0)(1, "personal-information", 0),
                  F(2, "div", 1),
                  Ve(3, "work-experience", 0)(4, "education", 0),
                  P(),
                  Ve(5, "skills", 0)(6, "projects", 0)(7, "contact", 0));
              },
              dependencies: [kO, BO, UO, GO, QO, KO, JO, XO],
              styles: [
                "[_nghost-%COMP%]{display:block;background-color:var(--black)}.pc[_nghost-%COMP%]   .container[_ngcontent-%COMP%]{display:grid;grid-template-columns:1fr 1fr}",
              ],
            })),
            e
          );
        })(),
        t1 = (() => {
          class e {}
          return (
            (e.ɵfac = function (n) {
              return new (n || e)();
            }),
            (e.ɵmod = Tn({ type: e, bootstrap: [e1] })),
            (e.ɵinj = hn({ imports: [RR, CO] })),
            e
          );
        })();
      AR()
        .bootstrapModule(t1)
        .catch((e) => console.error(e));
    },
  },
  (ne) => {
    ne((ne.s = 90));
  },
]);
