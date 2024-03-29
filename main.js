window._C = { v: 1, device: "d", isM: false, isD: true };
!(function () {
  "use strict";
  function a(t, i) {
    if (!(t instanceof i))
      throw new TypeError("Cannot call a class as a function");
  }
  function s(t, i) {
    for (var e = 0; e < i.length; e++) {
      var s = i[e];
      (s.enumerable = s.enumerable || !1),
        (s.configurable = !0),
        "value" in s && (s.writable = !0),
        Object.defineProperty(t, s.key, s);
    }
  }
  function o(t, i, e) {
    return i && s(t.prototype, i), e && s(t, e), t;
  }
  function e(t) {
    a(this, e), new c(), d.run();
  }
  function h(t, i) {
    a(this, h);
    for (var e = i.length, s = [], r = 0; r < e; r++) {
      var n = t.createTexture();
      t.bindTexture(t.TEXTURE_2D, n),
        t.texImage2D(
          t.TEXTURE_2D,
          0,
          t.RGBA,
          t.RGBA,
          t.UNSIGNED_BYTE,
          i[r]
        ),
        t.texParameteri(t.TEXTURE_2D, t.TEXTURE_WRAP_S, t.CLAMP_TO_EDGE),
        t.texParameteri(t.TEXTURE_2D, t.TEXTURE_WRAP_T, t.CLAMP_TO_EDGE),
        t.texParameteri(t.TEXTURE_2D, t.TEXTURE_MIN_FILTER, t.LINEAR),
        t.texParameteri(t.TEXTURE_2D, t.TEXTURE_MAG_FILTER, t.LINEAR),
        (s[r] = n);
    }
    return s;
  }
  function i() {
    a(this, i);
    var t = (45 * Math.PI) / 180;
    return {
      matrix: g.multiply(
        g.perspective(t, 1, 1, 10),
        g.inverse(g.lookAt([0, 0, 5], [0, 0, 0], [0, 1, 0]))
      ),
      winGl: Y.R(2 * Math.tan(t / 2) * 5, 5),
    };
  }
  var t,
    Y =
      ((function (t) {
        var w = {};
        ((t.exports = w).M = function (t) {
          w.BM(this, ["gRaf", "run", "uSvg", "uLine", "uProp"]),
            (this.v = this.vInit(t)),
            (this.raf = new w.Raf(this.run));
        }),
          (w.M.prototype = {
            vInit: function (t) {
              var i = {
                el: w.Select.el(t.el),
                e: { curve: t.e || "linear" },
                d: { origin: t.d || 0, curr: 0 },
                delay: t.delay || 0,
                cb: t.cb || !1,
                r: t.r || 2,
                prog: 0,
                progE: 0,
                elapsed: 0,
              };
              (i.elL = i.el.length),
                w.Has(t, "update")
                  ? (i.up = function () {
                      t.update(i);
                    })
                  : w.Has(t, "svg")
                  ? (i.up = this.uSvg)
                  : w.Has(t, "line")
                  ? (i.up = this.uLine)
                  : (i.up = this.uProp);
              var e = t.p || !1,
                s = t.svg || !1,
                c = t.line || !1,
                r = !1;
              if (e) {
                (i.prop = {}), (i.propI = []);
                var n = Object.keys(e);
                i.propL = n.length;
                for (var a = 0; a < i.propL; a++) {
                  var o = n[a];
                  i.prop[a] = {
                    name: o,
                    origin: { start: e[o][0], end: e[o][1] },
                    curr: e[o][0],
                    start: e[o][0],
                    end: e[o][1],
                    unit: e[o][2] || "%",
                  };
                  var h = o.charAt(0),
                    l = "r" === h && r ? "r2" : h;
                  (r = "r" === h), (i.propI[l] = a);
                }
              } else if (s)
                (i.svg = {
                  type: s.type,
                  attr: "polygon" === s.type ? "points" : "d",
                  end: s.end,
                  originArr: {},
                  arr: {},
                  val: [],
                }),
                  (i.svg.start =
                    s.start || i.el[0].getAttribute(i.svg.attr)),
                  (i.svg.curr = i.svg.start),
                  (i.svg.originArr.start = this.svgS(i.svg.start)),
                  (i.svg.originArr.end = this.svgS(i.svg.end)),
                  (i.svg.arr.start = i.svg.originArr.start),
                  (i.svg.arr.end = i.svg.originArr.end),
                  (i.svg.arrL = i.svg.arr.start.length);
              else if (c) {
                var u = function (t) {
                  if ("circle" === t.tagName)
                    return 2 * t.getAttribute("r") * Math.PI;
                  if ("line" === t.tagName) {
                    var i = t.getAttribute("x1"),
                      e = t.getAttribute("x2"),
                      s = t.getAttribute("y1"),
                      r = t.getAttribute("y2");
                    return Math.sqrt((e -= i) * e + (r -= s) * r);
                  }
                  if ("polyline" !== t.tagName)
                    return (w.Select.el(c.elWL)[0] || t).getTotalLength();
                  for (
                    var n, a = 0, o = t.points.numberOfItems, h = 0;
                    h < o;
                    h++
                  ) {
                    var l = t.points.getItem(h);
                    0 < h &&
                      (a += Math.sqrt(
                        Math.pow(l.x - n.x, 2) + Math.pow(l.y - n.y, 2)
                      )),
                      (n = l);
                  }
                  return a;
                };
                for (
                  i.line = {
                    dashed: c.dashed,
                    coeff: {
                      start: w.Is.def(c.start)
                        ? (100 - c.start) / 100
                        : 1,
                      end: w.Is.def(c.end) ? (100 - c.end) / 100 : 0,
                    },
                    shapeL: [],
                    origin: { start: [], end: [] },
                    curr: [],
                    start: [],
                    end: [],
                  },
                    a = 0;
                  a < i.elL;
                  a++
                ) {
                  var f;
                  if (((i.line.shapeL[a] = u(i.el[a])), i.line.dashed)) {
                    for (
                      var d = 0,
                        p = dashed.split(/[\s,]/),
                        v = p.length,
                        y = 0;
                      y < v;
                      y++
                    )
                      d += parseFloat(p[y]) || 0;
                    var g = "",
                      m = Math.ceil(i.line.shapeL[a] / d);
                    for (y = 0; y < m; y++) g += dashed + " ";
                    f = g + "0 " + i.line.shapeL[a];
                  } else f = i.line.shapeL[a];
                  (i.el[a].style.strokeDasharray = f),
                    (i.line.origin.start[a] =
                      i.line.coeff.start * i.line.shapeL[a]),
                    (i.line.origin.end[a] =
                      i.line.coeff.end * i.line.shapeL[a]),
                    (i.line.curr[a] = i.line.origin.start[a]),
                    (i.line.start[a] = i.line.origin.start[a]),
                    (i.line.end[a] = i.line.origin.end[a]);
                }
              }
              return i;
            },
            play: function (t) {
              this.pause(), this.vUpd(t), this.delay.run();
            },
            pause: function () {
              this.raf.stop(), this.delay && this.delay.stop();
            },
            vUpd: function (t) {
              var i = t || {},
                e = w.Has(i, "reverse") ? "start" : "end";
              if (w.Has(this.v, "prop"))
                for (var s = 0; s < this.v.propL; s++)
                  (this.v.prop[s].end = this.v.prop[s].origin[e]),
                    (this.v.prop[s].start = this.v.prop[s].curr),
                    w.Has(i, "p") &&
                      w.Has(i.p, this.v.prop[s].name) &&
                      (w.Has(i.p[this.v.prop[s].name], "newEnd") &&
                        (this.v.prop[s].end =
                          i.p[this.v.prop[s].name].newEnd),
                      w.Has(i.p[this.v.prop[s].name], "newStart") &&
                        (this.v.prop[s].start =
                          i.p[this.v.prop[s].name].newStart));
              else if (w.Has(this.v, "svg"))
                w.Has(i, "svg") && w.Has(i.svg, "start")
                  ? (this.v.svg.arr.start = i.svg.start)
                  : (this.v.svg.arr.start = this.svgS(this.v.svg.curr)),
                  w.Has(i, "svg") && w.Has(i.svg, "end")
                    ? (this.v.svg.arr.end = i.svg.end)
                    : (this.v.svg.arr.end = this.v.svg.originArr[e]);
              else if (w.Has(this.v, "line")) {
                for (s = 0; s < this.v.elL; s++)
                  this.v.line.start[s] = this.v.line.curr[s];
                if (w.Has(i, "line") && w.Has(i.line, "end"))
                  for (
                    this.v.line.coeff.end = (100 - i.line.end) / 100,
                      s = 0;
                    s < this.v.elL;
                    s++
                  )
                    this.v.line.end[s] =
                      this.v.line.coeff.end * this.v.line.shapeL[s];
                else this.v.line.end[s] = this.v.line.origin[e][s];
              }
              (this.v.d.curr = w.Has(i, "d")
                ? i.d
                : w.R(this.v.d.origin - this.v.d.curr + this.v.elapsed)),
                (this.v.e.curve = i.e || this.v.e.curve),
                (this.v.e.calc = w.Ease[this.v.e.curve]),
                (this.v.delay = w.Has(i, "delay")
                  ? i.delay
                  : this.v.delay),
                (this.v.cb = w.Has(i, "cb") ? i.cb : this.v.cb),
                (this.v.prog = this.v.progE =
                  0 === this.v.d.curr ? 1 : 0),
                (this.delay = new w.Delay(this.gRaf, this.v.delay));
            },
            gRaf: function () {
              this.raf.run();
            },
            run: function (t) {
              1 === this.v.prog
                ? (this.pause(), this.v.cb && this.v.cb())
                : ((this.v.elapsed = w.Clamp(t, 0, this.v.d.curr)),
                  (this.v.prog = w.Clamp(
                    this.v.elapsed / this.v.d.curr,
                    0,
                    1
                  )),
                  (this.v.progE = this.v.e.calc(this.v.prog)),
                  this.v.up());
            },
            uProp: function () {
              for (
                var t = this.v.prop, i = this.v.propI, e = 0;
                e < this.v.propL;
                e++
              )
                t[e].curr = this.lerp(t[e].start, t[e].end);
              var s = w.Has(i, "x") ? t[i.x].curr + t[i.x].unit : 0,
                r = w.Has(i, "y") ? t[i.y].curr + t[i.y].unit : 0,
                n =
                  s + r === 0 ? 0 : "translate3d(" + s + "," + r + ",0)",
                a = w.Has(i, "r")
                  ? t[i.r].name + "(" + t[i.r].curr + "deg)"
                  : 0,
                o = w.Has(i, "r2")
                  ? t[i.r2].name + "(" + t[i.r2].curr + "deg)"
                  : 0,
                h = w.Has(i, "s")
                  ? t[i.s].name + "(" + t[i.s].curr + ")"
                  : 0,
                l =
                  n + a + o + h === 0
                    ? 0
                    : [n, a, o, h]
                        .filter(function (t) {
                          return 0 !== t;
                        })
                        .join(" "),
                c = w.Has(i, "o") ? t[i.o].curr : -1;
              for (e = 0; e < this.v.elL && !w.Is.und(this.v.el[e]); e++)
                0 !== l && (this.v.el[e].style.transform = l),
                  0 <= c && (this.v.el[e].style.opacity = c);
            },
            uSvg: function () {
              var t = this.v.svg;
              t.currTemp = "";
              for (var i = 0; i < t.arrL; i++)
                (t.val[i] = isNaN(t.arr.start[i])
                  ? t.arr.start[i]
                  : this.lerp(t.arr.start[i], t.arr.end[i])),
                  (t.currTemp += t.val[i] + " "),
                  (t.curr = t.currTemp.trim());
              for (i = 0; i < this.v.elL && !w.Is.und(this.v.el[i]); i++)
                this.v.el[i].setAttribute(t.attr, t.curr);
            },
            uLine: function () {
              for (var t = this.v.line, i = 0; i < this.v.elL; i++) {
                var e = this.v.el[i].style;
                (t.curr[i] = this.lerp(t.start[i], t.end[i])),
                  (e.strokeDashoffset = t.curr[i]),
                  0 === this.v.prog && (e.opacity = 1);
              }
            },
            lerp: function (t, i) {
              return w.R(w.Lerp(t, i, this.v.progE), this.v.r);
            },
            svgS: function (t) {
              for (
                var i = [], e = t.split(" "), s = e.length, r = 0;
                r < s;
                r++
              )
                for (
                  var n = e[r].split(","), a = n.length, o = 0;
                  o < a;
                  o++
                ) {
                  var h = n[o];
                  (h = isNaN(h) ? h : +h), i.push(h);
                }
              return i;
            },
          }),
          (w.TL = function () {
            (this.arr = []), (this.del = 0);
          }),
          (w.TL.prototype = {
            from: function (t) {
              (this.del += w.Has(t, "delay") ? t.delay : 0),
                (t.delay = this.del),
                this.arr.push(new w.M(t));
            },
            play: function (t) {
              this.run("play", t);
            },
            pause: function () {
              this.run("pause");
            },
            run: function (t, i) {
              for (
                var e = this.arr.length, s = i || void 0, r = 0;
                r < e;
                r++
              )
                this.arr[r][t](s);
            },
          }),
          (w.BM = function (t, i) {
            for (var e = i.length, s = 0; s < e; s++)
              t[i[s]] = t[i[s]].bind(t);
          }),
          (w.Clamp = function (t, i, e) {
            return Math.min(Math.max(t, i), e);
          }),
          (w.Delay = function (t, i) {
            (this.cb = t),
              (this.d = i),
              w.BM(this, ["loop"]),
              (this.raf = new w.Raf(this.loop));
          }),
          (w.Delay.prototype = {
            run: function () {
              0 === this.d ? this.cb() : this.raf.run();
            },
            stop: function () {
              this.raf.stop();
            },
            loop: function (t) {
              var i = w.Clamp(t, 0, this.d);
              1 === w.Clamp(i / this.d, 0, 1) && (this.stop(), this.cb());
            },
          }),
          (w.Ease = {
            linear: function (t) {
              return t;
            },
            i1: function (t) {
              return 1 - Math.cos(t * (Math.PI / 2));
            },
            o1: function (t) {
              return Math.sin(t * (Math.PI / 2));
            },
            io1: function (t) {
              return -0.5 * (Math.cos(Math.PI * t) - 1);
            },
            i2: function (t) {
              return t * t;
            },
            o2: function (t) {
              return t * (2 - t);
            },
            io2: function (t) {
              return t < 0.5 ? 2 * t * t : (4 - 2 * t) * t - 1;
            },
            i3: function (t) {
              return t * t * t;
            },
            o3: function (t) {
              return --t * t * t + 1;
            },
            io3: function (t) {
              return t < 0.5
                ? 4 * t * t * t
                : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
            },
            i4: function (t) {
              return t * t * t * t;
            },
            o4: function (t) {
              return 1 - --t * t * t * t;
            },
            io4: function (t) {
              return t < 0.5
                ? 8 * t * t * t * t
                : 1 - 8 * --t * t * t * t;
            },
            i5: function (t) {
              return t * t * t * t * t;
            },
            o5: function (t) {
              return 1 + --t * t * t * t * t;
            },
            io5: function (t) {
              return t < 0.5
                ? 16 * t * t * t * t * t
                : 1 + 16 * --t * t * t * t * t;
            },
            i6: function (t) {
              return 0 === t ? 0 : Math.pow(2, 10 * (t - 1));
            },
            o6: function (t) {
              return 1 === t ? 1 : 1 - Math.pow(2, -10 * t);
            },
            io6: function (t) {
              return 0 === t
                ? 0
                : 1 === t
                ? 1
                : (t /= 0.5) < 1
                ? 0.5 * Math.pow(2, 10 * (t - 1))
                : 0.5 * (2 - Math.pow(2, -10 * --t));
            },
          }),
          (w.Has = function (t, i) {
            return !!t && hasOwnProperty.call(t, i);
          }),
          (w.Is = {
            str: function (t) {
              return "string" == typeof t;
            },
            obj: function (t) {
              return t === Object(t);
            },
            arr: function (t) {
              return t.constructor === Array;
            },
            def: function (t) {
              return void 0 !== t;
            },
            und: function (t) {
              return void 0 === t;
            },
          }),
          (w.Lerp = function (t, i, e) {
            return t * (1 - e) + i * e;
          }),
          (w.R = function (t, i) {
            return (
              (i = w.Is.und(i) ? 100 : Math.pow(10, i)),
              Math.round(t * i) / i
            );
          }),
          (w.RafId = 0);
        function i(t) {
          (this.cb = t),
            (this.active = !1),
            ((this.c = this).id = w.RafId),
            w.RafId++,
            w.BM(this, ["loop"]);
        }
        (i.prototype = {
          run: function (t) {
            t
              ? (this.sT += t)
              : (w.Tab.add(this.id, this.c), (this.sT = 0)),
              this.gR(),
              (this.active = !0);
          },
          stop: function (t) {
            (this.active = !1),
              cancelAnimationFrame(this.raf),
              t || w.Tab.remove(this.id);
          },
          gR: function () {
            this.raf = requestAnimationFrame(this.loop);
          },
          loop: function (t) {
            this.time(t), this.active && this.gR();
          },
          time: function (t) {
            this.sT || (this.sT = t);
            var i = t - this.sT;
            this.cb(i, this.id);
          },
        }),
          (w.Raf = i),
          (w.Rand = function (t, i, e) {
            return w.R(Math.random() * (i - t) + t, e);
          }),
          (w.Snif = {
            uA: navigator.userAgent.toLowerCase(),
            get isMobileAndroid() {
              return /android.*mobile/.test(this.uA);
            },
            get isAndroid() {
              return (
                this.isMobileAndroid ||
                (!this.isMobileAndroid && /android/i.test(this.uA))
              );
            },
            get isFirefox() {
              return -1 < this.uA.indexOf("firefox");
            },
            get safari() {
              return this.uA.match(/version\/[\d\.]+.*safari/);
            },
            get isSafari() {
              return !!this.safari && !this.isAndroid;
            },
            get isSafariOlderThan8() {
              var t = 8;
              return (
                this.isSafari &&
                  (t = +this.safari[0]
                    .match(/version\/\d{1,2}/)[0]
                    .split("/")[1]),
                t < 8
              );
            },
            get isIEolderThan11() {
              return -1 < this.uA.indexOf("msie");
            },
            get isIE11() {
              return 0 < navigator.appVersion.indexOf("Trident/");
            },
            get isEdge() {
              return /Edge\/\d./i.test(this.uA);
            },
          }),
          (w.Throttle = function (t) {
            (this.del = t.delay),
              (this.onlyAtEnd = t.onlyAtEnd),
              (this.cb = t.cb),
              this.last,
              this.t;
          }),
          (w.Throttle.prototype = {
            run: function () {
              var t = this,
                i = !0,
                e = Date.now();
              (this.last && e < this.last + this.del) || i
                ? ((i = !1),
                  clearTimeout(this.t),
                  (this.t = setTimeout(function () {
                    (t.last = e), t.cb();
                  }, this.del)))
                : ((this.last = e),
                  this.onlyAtEnd || ((i = !1), this.cb()));
            },
          }),
          (w.Cr = function (t) {
            return document.createElement(t);
          }),
          (w.G = {
            p: function (t) {
              return t || document;
            },
            id: function (t, i) {
              return this.p(i).getElementById(t);
            },
            class: function (t, i) {
              return this.p(i).getElementsByClassName(t);
            },
            tag: function (t, i) {
              return this.p(i).getElementsByTagName(t);
            },
          }),
          (w.Dom = {
            html: document.documentElement,
            body: document.body,
          }),
          (w.Select = {
            el: function (t) {
              var i = [];
              if (w.Is.str(t)) {
                var e = t.substring(1);
                "#" === t.charAt(0)
                  ? (i[0] = w.G.id(e))
                  : (i = w.G.class(e));
              } else i[0] = t;
              return i;
            },
            type: function (t) {
              return "#" === t.charAt(0) ? "id" : "class";
            },
            name: function (t) {
              return t.substring(1);
            },
          }),
          (w.Index = {
            i: function (t, i) {
              for (var e = i.length, s = 0; s < e; s++)
                if (t === i[s]) return s;
              return -1;
            },
            list: function (t) {
              var i = t.parentNode.children;
              return this.i(t, i);
            },
            class: function (t, i) {
              var e = w.G.class(i);
              return this.i(t, e);
            },
          }),
          (w.L = function (t, i, e, s) {
            var r = document,
              n = (t = w.Select.el(t)).length,
              a = e,
              o = "mouse",
              h = [
                "scroll",
                o + "Wheel",
                o + "move",
                "touchmove",
                "touchstart",
              ],
              l = -1 !== h.indexOf(e) && { passive: !1 };
            e === h[1]
              ? (a =
                  "onwheel" in r
                    ? "wheel"
                    : w.Is.def(r.onmousewheel)
                    ? o + "wheel"
                    : "DOMMouseScroll")
              : "focusOut" === e &&
                (a = w.Snif.isFirefox ? "blur" : "focusout");
            for (var c = "a" === i ? "add" : "remove", u = 0; u < n; u++)
              t[u][c + "EventListener"](a, s, l);
          });
        function e(t) {
          (this.cb = t.cb),
            (this.el = w.Has(t, "el") ? w.Select.el(t.el)[0] : document),
            (this.iM = w.Snif.isMobile),
            (this.eT = this.iM ? "touch" : "mouse"),
            (this.tick = !1),
            w.BM(this, ["gRaf", "run"]),
            (this.raf = new w.Raf(this.run));
        }
        (e.prototype = {
          on: function () {
            this.l("a");
          },
          off: function () {
            this.l("r");
          },
          l: function (t) {
            w.L(this.el, t, this.eT + "move", this.gRaf);
          },
          gRaf: function (t) {
            (this.e = t), this.tick || ((this.tick = !0), this.raf.run());
          },
          run: function () {
            var t = this.iM ? this.e.changedTouches[0] : this.e;
            this.cb(t.pageX, t.pageY, this.e),
              this.raf.stop(),
              (this.tick = !1);
          },
        }),
          (w.MM = e);
        function s(t) {
          (this.cb = t.cb),
            (this.eT = w.Snif.isMobile ? "orientationchange" : "resize"),
            (this.tick = !1),
            w.BM(this, ["gT", "gRaf", "run"]),
            (this.t = new w.Throttle({
              delay: t.throttleDelay,
              onlyAtEnd: !0,
              cb: this.gRaf,
            })),
            (this.raf = new w.Raf(this.run));
        }
        (s.prototype = {
          on: function () {
            this.l("a");
          },
          off: function () {
            this.l("r");
          },
          l: function (t) {
            w.L(window, t, this.eT, this.gT);
          },
          gT: function (t) {
            (this.e = t), this.t.run();
          },
          gRaf: function () {
            this.tick || ((this.tick = !0), this.raf.run());
          },
          run: function () {
            this.cb(this.e), this.raf.stop(), (this.tick = !1);
          },
        }),
          (w.RO = s);
        function r() {
          (this.arr = []),
            (this.arrL = 0),
            (this.pause = 0),
            w.BM(this, ["run"]),
            w.L(document, "a", "visibilitychange", this.run);
        }
        (r.prototype = {
          add: function (t, i) {
            this.arr.push([t, i]), this.arrL++;
          },
          remove: function (t) {
            for (var i = 0; i < this.arrL; i++)
              this.arr[i][0] === t &&
                (this.arr.splice(i, 1), this.arrL--);
          },
          run: function () {
            var t = performance.now();
            if (document.hidden) {
              this.pause = performance.now();
              for (var i = 0; i < this.arrL; i++) this.arr[i][1].stop(!0);
            } else {
              var e = t - this.pause;
              for (i = 0; i < this.arrL; i++) this.arr[i][1].run(e);
            }
          },
        }),
          (w.Tab = new r()),
          (w.STop = function (t) {
            var i,
              e = pageYOffset,
              s = {
                dest: 0,
                d: ((i = w.Lerp(300, 1500, e / t.h)), 0 === e ? 0 : i),
                e: e <= 2500 ? "io" + Math.ceil(e / 500) : "io6",
                cb: t.cb,
              };
            w.STo(s);
          }),
          (w.STo = function (t) {
            var i = document,
              e = i.scrollingElement ? i.scrollingElement : w.Dom.body,
              s = w.Snif.isFirefox || w.Snif.isIE ? i.documentElement : e,
              r = pageYOffset,
              n = t.dest,
              a = new w.M({
                d: t.d,
                e: t.e,
                update: function (t) {
                  s.scrollTop = w.R(w.Lerp(r, n, t.progE));
                },
                cb: o,
              });
            function o() {
              t.cb && t.cb();
            }
            r === n ? o() : a.play();
          }),
          (w.SZero = function () {
            window.scrollTo(0, 0);
          }),
          (w.TopRefresh = function () {
            "scrollRestoration" in history
              ? (history.scrollRestoration = "manual")
              : (window.onbeforeunload = function () {
                  window.scrollTo(0, 0);
                });
          }),
          (w.PE = {
            s: function (t, i) {
              t.style.pointerEvents = i;
            },
            all: function (t) {
              this.s(t, "all");
            },
            none: function (t) {
              this.s(t, "none");
            },
          }),
          (w.T = function (t, i, e, s) {
            var r = w.Is.und(s) ? "%" : s;
            t.style.transform =
              "translate3d(" + i + r + "," + e + r + ",0)";
          });
      })((t = { exports: {} }), t.exports),
      t.exports),
    r = new ((function () {
      function t() {
        a(this, t);
      }
      return (
        o(t, [
          {
            key: "msg",
            value: function (t) {
              this.c(t + " to view this website.", "");
            },
          },
          {
            key: "c",
            value: function (t, i) {
              this.issueW = this.div("-w", i);
              var e = this.div("", "");
              (e.textContent = "Please " + t),
                this.issueW.appendChild(e),
                Y.G.id("app").appendChild(this.issueW);
            },
          },
          {
            key: "div",
            value: function (t, i) {
              var e = Y.Cr("div");
              return (e.className = "iss" + t + i), e;
            },
          },
        ]),
        t
      );
    })())(),
    n = (function () {
      function e() {
        a(this, e);
        var t = _C,
          i = Y.Snif;
        i.isIEolderThan11 || i.isSafariOlderThan8
          ? r.msg("update your browser")
          : this.glOn() || r.msg("enable WebGL"),
          (t.is404 = !document.querySelector("meta[name=description]"));
      }
      return (
        o(e, [
          {
            key: "glOn",
            value: function () {
              try {
                var t = Y.Cr("canvas");
                return (
                  !!window.WebGLRenderingContext &&
                  (t.getContext("webgl") ||
                    t.getContext("experimental-webgl"))
                );
              } catch (t) {
                return !1;
              }
            },
          },
        ]),
        e
      );
    })(),
    l = (function () {
      function t() {
        a(this, t),
          Y.BM(this, ["ro"]),
          new Y.RO({ cb: this.ro, throttleDelay: 100 }).on(),
          this.ro();
      }
      return (
        o(t, [
          {
            key: "ro",
            value: function () {
              var t = _C,
                i = t.data;
              if (
                ((t.win = { w: innerWidth, h: innerHeight }),
                (t.winDemi = { w: t.win.w / 2, h: t.win.h / 2 }),
                (t.psd = { h: i.psd.h, w: i.psd.w }),
                (t.winWpsdW = t.win.w / t.psd.w),
                (t.winHpsdH = t.win.h / t.psd.h),
                (t.psdWwinW = t.psd.w / t.win.w),
                (t.psdHwinH = t.psd.h / t.win.h),
                (t.win.ratio = t.win.h / t.win.w),
                !t.loaderHideLaunched)
              ) {
                var e = Y.G.id("nav-dodeca-wrap");
                e.style.transform = "translate3d(0,0,0) scale(1)";
                var s = e.getBoundingClientRect(),
                  r = s.top,
                  n = s.left,
                  a = e.offsetHeight,
                  o = e.offsetWidth;
                (t.dodeca = {
                  tX: -n + t.win.w / 2 - o / 2,
                  tY: -r + t.win.h / 2 - a / 2,
                }),
                  (e.style.transform =
                    "translate3d(" +
                    t.dodeca.tX +
                    "px," +
                    t.dodeca.tY +
                    "px,0) scale(2)");
              }
            },
          },
        ]),
        t
      );
    })(),
    c = (function () {
      function t() {
        a(this, t),
          Y.BM(this, ["eD"]),
          Y.L(Y.Dom.body, "a", "click", this.eD);
      }
      return (
        o(t, [
          {
            key: "eD",
            value: function (t) {
              for (var i = window, e = t.target, s = !1; e; ) {
                if ("A" === e.tagName) {
                  s = !0;
                  break;
                }
                e = e.parentNode;
              }
              if (s) {
                var r = Y.Is.und(e.dataset.href)
                  ? e.href
                  : e.dataset.href;
                if (e.classList.contains("_tb")) a(), i.open(r);
                else if ("mailto" === r.substring(0, 6)) {
                  a();
                  var n = i.open(r);
                  setTimeout(function (t) {
                    n.close();
                  }, 300);
                }
              }
              function a() {
                t.preventDefault();
              }
            },
          },
        ]),
        t
      );
    })(),
    u = new ((function () {
      function t() {
        a(this, t), (this.c = _C), (this.c.loaderHideLaunched = !1);
      }
      return (
        o(t, [
          {
            key: "showD",
            value: function (t) {
              var i = Y.G.class("nav-dodeca-poly")[0],
                e = new Y.TL();
              e.from({
                el: i,
                p: { opacity: [0, 0.2] },
                d: 200,
                e: "linear",
                delay: 500,
                cb: t,
              }),
                e.play();
            },
          },
          {
            key: "hideD",
            value: function (i) {
              var e = this;
              this.c.loaderHideLaunched = !0;
              var s = Y.G.id("_p"),
                t = Y.G.id("loader"),
                r = Y.G.id("nav-dodeca-wrap"),
                n = Y.G.class("nav-dodeca-poly"),
                a = Y.G.id("n-br-scroll-w"),
                o = Y.G.id("n-br-loading"),
                h = Y.G.id("nav-link-w"),
                l = Y.G.class("under", h),
                c = Y.G.id("nav-arrow-w"),
                u = Y.G.id("h1").children,
                f = this.c.dodeca.tX,
                d = this.c.dodeca.tY,
                p = 1500,
                v = new Y.TL();
              v.from({ el: o, p: { y: [0, -102] }, d: 700, e: "i3" }),
                v.from({ el: t, p: { y: [0, -100] }, d: 2200, e: "io5" }),
                v.from({
                  el: r,
                  p: { y: [d, 0, "px"], x: [f, 0, "px"], scale: [2, 1] },
                  d: 2200,
                  e: "io5",
                }),
                v.from({
                  el: n[2],
                  p: { opacity: [0, 1] },
                  d: 1100,
                  e: "o3",
                }),
                v.from({
                  el: n[1],
                  p: { opacity: [1, 0] },
                  d: 1100,
                  e: "o3",
                }),
                v.from({
                  el: u[0],
                  p: { y: [100, 0], rotateX: [90, 0] },
                  d: 2e3,
                  e: "o6",
                  delay: p,
                }),
                v.from({
                  el: u[1],
                  p: { y: [100, 0], rotateX: [90, 0] },
                  d: 2e3,
                  e: "o6",
                  delay: 200,
                }),
                v.from({
                  el: l[0],
                  p: { x: [-102, 0] },
                  d: p,
                  e: "o6",
                  delay: 200,
                }),
                v.from({
                  el: l[1],
                  p: { x: [-102, 0] },
                  d: p,
                  e: "o6",
                  delay: 100,
                }),
                v.from({
                  el: a,
                  p: { y: [-100, 0] },
                  d: p,
                  e: "o6",
                  delay: 100,
                }),
                v.from({ el: l[2], p: { x: [-102, 0] }, d: p, e: "o6" }),
                v.from({ el: c, p: { y: [-100, 0] }, d: 2e3, e: "o6" });
              var y = new Y.TL();
              y.from({
                el: ".nav-light",
                p: { opacity: [1, 0] },
                d: 1700,
                e: "o3",
              }),
                y.from({
                  el: ".nav-dark",
                  p: { opacity: [0, 1] },
                  d: 1700,
                  e: "o3",
                });
              var g = new Y.M({
                delay: 1e3,
                d: 1600,
                e: "o2",
                update: function (t) {
                  (e.c.needGLDraw = !0),
                    (e.c.shape[0].noise = Y.Lerp(-1, 1, t.progE));
                },
                cb: function (t) {
                  e.c.needGLDraw = !1;
                },
              });
              v.play(),
                y.play(),
                g.play(),
                this.c.navLink.intro({ d: p, delay: 1700 }),
                new Y.Delay(function (t) {
                  i(), Y.PE.none(s);
                }, 1e3).run();
            },
          },
          {
            key: "hideM",
            value: function () {
              var t = Y.G.id("loader"),
                i = new Y.TL();
              i.from({
                el: t,
                p: { opacity: [1, 0] },
                d: 1e3,
                e: "o3",
                delay: 300,
              }),
                i.play();
            },
          },
        ]),
        t
      );
    })())(),
    f = new ((function () {
      function t() {
        a(this, t);
      }
      return (
        o(t, [
          {
            key: "run",
            value: function (t) {
              for (
                var e = this, s = [], i = "/media/d/", r = 0;
                r < 4;
                r++
              )
                s[r] = i + "home/" + (r + 1) + ".jpg";
              for (var n = 0; n < 17; n++)
                s[n + 4] = i + "gallery/" + n + ".jpg";
              (this.arrL = s.length),
                (this.cb = t),
                (this.img = []),
                (this.no = 0),
                Y.BM(this, ["loop"]),
                (this.raf = new Y.Raf(this.loop));
              for (
                var a = [],
                  o = function (i) {
                    (a[i] = new Image()),
                      (a[i].onload = function (t) {
                        new Y.Delay(function (t) {
                          (e.img[i] = a[i]), e.no++;
                        }, 15 * i).run();
                      }),
                      (a[i].src = s[i]);
                  },
                  h = 0;
                h < this.arrL;
                h++
              )
                o(h);
              (this.poly = Y.G.class("nav-dodeca-poly")),
                (this.polyL = this.poly[0].getTotalLength()),
                (this.poly1S = this.poly[1].style),
                (this.poly1S.strokeDasharray = this.polyL),
                (this.step = this.polyL / this.arrL),
                (this.curr = this.polyL),
                (this.poly1S.strokeDashoffset = this.curr),
                (this.poly1S.opacity = 1),
                this.raf.run();
            },
          },
          {
            key: "loop",
            value: function () {
              var t = (this.arrL - this.no) * this.step;
              if (
                ((this.curr += 0.15 * (t - this.curr)),
                (this.poly1S.strokeDashoffset = Y.R(this.curr) - 0.4),
                0 === Y.R(this.curr, 0))
              ) {
                this.raf.stop(), (this.poly1S.strokeDashoffset = 0);
                var i = this.img.slice(0, 4),
                  e = this.img.slice(4);
                this.cb(i, e), (this.poly[0].style.opacity = 0);
              }
            },
          },
        ]),
        t
      );
    })())(),
    d = new ((function () {
      function t() {
        a(this, t), (this.c = _C), Y.BM(this, ["cb"]);
      }
      return (
        o(t, [
          {
            key: "run",
            value: function () {
              var i = this;
              (this.isLocal = this.c.isLocal),
                (this.isD = this.c.isD),
                this.isD
                  ? (this.c.GLCore.init(),
                    this.c.GL.init(),
                    u.showD(function (t) {
                      f.run(i.cb);
                    }))
                  : (u.hideM(),
                    this.c.listener.init(),
                    this.c.listener.on());
            },
          },
          {
            key: "cb",
            value: function (t, i) {
              var e = this;
              this.c.GLCore.imgU(t, i),
                this.c.listener.init(),
                u.hideD(function (t) {
                  e.c.listener.on();
                });
            },
          },
        ]),
        t
      );
    })())(),
    p = "#h-s1-",
    v = {
      psd: { w: 1800, h: 1125 },
      outsideXhr: ["#h1"],
      parallax: [
        {
          section: "#h-s1",
          oh: !0,
          arr: [
            { el: p + "no-0", speed: 0.06 },
            { el: p + "caption-0", speed: 0.1 },
            { el: p + "caption-1", speed: -0.04 },
            { el: p + "caption-2", speed: -0.08 },
            { el: p + "no-1", speed: -0.02 },
            { el: p + "no-2", speed: -0.12 },
          ],
        },
      ],
      gl: [
        { type: "bg", points: { hori: 2, vert: 2 }, speed: 1, noise: -1 },
        {
          type: "img",
          x: 750,
          y: 1719,
          w: 750,
          h: 750,
          points: { hori: 2, vert: 2 },
          speed: 1.1,
          scale: 1.2,
        },
        {
          type: "img",
          x: 150,
          y: 644,
          w: 900,
          h: 900,
          points: { hori: 2, vert: 2 },
          speed: 0.96,
          scale: 1.2,
        },
        {
          type: "img",
          x: 150,
          y: 2226,
          w: 750,
          h: 750,
          points: { hori: 2, vert: 2 },
          speed: 0.92,
          scale: 1.2,
        },
        {
          type: "img",
          x: 750,
          y: 2860,
          w: 900,
          h: 900,
          points: { hori: 2, vert: 2 },
          speed: 1,
          scale: 1.2,
        },
        {
          type: "bg",
          x: 0,
          y: 5445,
          w: 560,
          h: 450,
          points: { hori: 2, vert: 2 },
          speed: 1,
          noise: -1,
        },
        {
          type: "bg",
          x: 900,
          y: 6078,
          w: 900,
          h: 665,
          points: { hori: 2, vert: 2 },
          speed: 1,
          noise: -1,
        },
      ],
      caption: [
        { n: 39.3219, w: 120.2643, txt: "Donner Lake, California" },
        { n: 38.906, w: 120.0988, txt: "Mount Tallac, Lake Tahoe" },
        { n: 39.2267, w: 119.928, txt: "Monkey Rock, Lake Tahoe" },
        { n: 38.906, w: 120.0988, txt: "Mount Tallac, Lake Tahoe" },
        { n: 38.5627, w: 120.0444, txt: "Highway 89, Lake Tahoe" },
        { n: 52.8737, w: 118.0814, txt: "Jasper, Alberta" },
        { n: 51.1784, w: 115.5708, txt: "Banff, Alberta" },
        { n: 52.8737, w: 118.0814, txt: "Jasper, Alberta" },
        { n: 51.4254, w: 116.1773, txt: "Lake Louise, Alberta" },
        { n: 39.2497, w: 119.9527, txt: "Incline Village, Lake Tahoe" },
        { n: 37.7155, w: 119.6769, txt: "Yosemite, California" },
        { n: 39.3219, w: 120.2643, txt: "Donner Lake, California" },
        { n: 51.3217, w: 116.186, txt: "Moraine Lake, Alberta" },
        { n: 37.7456, w: 119.5936, txt: "Yosemite Valley, California" },
        { n: 39.2377, w: 120.0266, txt: "Kings Beach, Lake Tahoe" },
        { n: 52.8737, w: 118.0814, txt: "Jasper, Alberta" },
        { n: 39.3219, w: 120.2643, txt: "Donner Lake, California" },
      ],
    },
    y = new ((function () {
      function t() {
        a(this, t);
      }
      return (
        o(t, [
          {
            key: "canvasCtx",
            value: function (t, i) {
              return (
                t.getContext("webgl", i) ||
                t.getContext("experimental-webgl")
              );
            },
          },
          {
            key: "crP",
            value: function (t, i) {
              var e = this.crS(t, i[0], t.VERTEX_SHADER),
                s = this.crS(t, i[1], t.FRAGMENT_SHADER),
                r = t.createProgram();
              return (
                t.attachShader(r, e),
                t.attachShader(r, s),
                t.linkProgram(r),
                r
              );
            },
          },
          {
            key: "crS",
            value: function (t, i, e) {
              var s = t.createShader(e);
              return t.shaderSource(s, i), t.compileShader(s), s;
            },
          },
          {
            key: "loc",
            value: function (t, i, e, s) {
              for (
                var r = s.length,
                  n = {},
                  a = "a" === t ? "Attrib" : "Uniform",
                  o = 0;
                o < r;
                o++
              )
                n[s[o]] = i["get" + a + "Location"](e, t + "_" + s[o]);
              return n;
            },
          },
          {
            key: "resizeCvs",
            value: function (t, i) {
              var e = t.canvas,
                s = e.clientWidth * i,
                r = e.clientHeight * i;
              (e.width === s && e.height === r) ||
                ((e.width = s), (e.height = r)),
                t.viewport(0, 0, e.width, e.height);
            },
          },
        ]),
        t
      );
    })())(),
    g = new ((function () {
      function t() {
        a(this, t);
      }
      return (
        o(t, [
          {
            key: "inverse",
            value: function (t, i) {
              i = i || new Float32Array(16);
              var e = t[0],
                s = t[1],
                r = t[2],
                n = t[3],
                a = t[4],
                o = t[5],
                h = t[6],
                l = t[7],
                c = t[8],
                u = t[9],
                f = t[10],
                d = t[11],
                p = t[12],
                v = t[13],
                y = t[14],
                g = t[15],
                m = f * g,
                w = y * d,
                x = h * g,
                b = y * l,
                k = h * d,
                L = f * l,
                T = r * g,
                R = y * n,
                G = r * d,
                D = f * n,
                M = r * l,
                S = h * n,
                C = c * v,
                A = p * u,
                E = a * v,
                H = p * o,
                _ = a * u,
                z = c * o,
                W = e * v,
                B = p * s,
                I = e * u,
                P = c * s,
                O = e * o,
                X = a * s,
                F = m * o + b * u + k * v - (w * o + x * u + L * v),
                N = w * s + T * u + D * v - (m * s + R * u + G * v),
                Y = x * s + R * o + M * v - (b * s + T * o + S * v),
                U = L * s + G * o + S * u - (k * s + D * o + M * u),
                j = 1 / (e * F + a * N + c * Y + p * U);
              return (
                (i[0] = j * F),
                (i[1] = j * N),
                (i[2] = j * Y),
                (i[3] = j * U),
                (i[4] =
                  j * (w * a + x * c + L * p - (m * a + b * c + k * p))),
                (i[5] =
                  j * (m * e + R * c + G * p - (w * e + T * c + D * p))),
                (i[6] =
                  j * (b * e + T * a + S * p - (x * e + R * a + M * p))),
                (i[7] =
                  j * (k * e + D * a + M * c - (L * e + G * a + S * c))),
                (i[8] =
                  j * (C * l + H * d + _ * g - (A * l + E * d + z * g))),
                (i[9] =
                  j * (A * n + W * d + P * g - (C * n + B * d + I * g))),
                (i[10] =
                  j * (E * n + B * l + O * g - (H * n + W * l + X * g))),
                (i[11] =
                  j * (z * n + I * l + X * d - (_ * n + P * l + O * d))),
                (i[12] =
                  j * (E * f + z * y + A * h - (_ * y + C * h + H * f))),
                (i[13] =
                  j * (I * y + C * r + B * f - (W * f + P * y + A * r))),
                (i[14] =
                  j * (W * h + X * y + H * r - (O * y + E * r + B * h))),
                (i[15] =
                  j * (O * f + _ * r + P * h - (I * h + X * f + z * r))),
                i
              );
            },
          },
          {
            key: "perspective",
            value: function (t, i, e, s, r) {
              r = r || new Float32Array(16);
              var n = Math.tan(0.5 * Math.PI - 0.5 * t),
                a = 1 / (e - s);
              return (
                (r[0] = n / i),
                (r[1] = 0),
                (r[2] = 0),
                (r[3] = 0),
                (r[4] = 0),
                (r[5] = n),
                (r[6] = 0),
                (r[7] = 0),
                (r[8] = 0),
                (r[9] = 0),
                (r[10] = (e + s) * a),
                (r[11] = -1),
                (r[12] = 0),
                (r[13] = 0),
                (r[14] = e * s * a * 2),
                (r[15] = 0),
                r
              );
            },
          },
          {
            key: "multiply",
            value: function (t, i, e) {
              e = e || new Float32Array(16);
              var s = i[0],
                r = i[1],
                n = i[2],
                a = i[3],
                o = i[4],
                h = i[5],
                l = i[6],
                c = i[7],
                u = i[8],
                f = i[9],
                d = i[10],
                p = i[11],
                v = i[12],
                y = i[13],
                g = i[14],
                m = i[15],
                w = t[0],
                x = t[1],
                b = t[2],
                k = t[3],
                L = t[4],
                T = t[5],
                R = t[6],
                G = t[7],
                D = t[8],
                M = t[9],
                S = t[10],
                C = t[11],
                A = t[12],
                E = t[13],
                H = t[14],
                _ = t[15];
              return (
                (e[0] = s * w + r * L + n * D + a * A),
                (e[1] = s * x + r * T + n * M + a * E),
                (e[2] = s * b + r * R + n * S + a * H),
                (e[3] = s * k + r * G + n * C + a * _),
                (e[4] = o * w + h * L + l * D + c * A),
                (e[5] = o * x + h * T + l * M + c * E),
                (e[6] = o * b + h * R + l * S + c * H),
                (e[7] = o * k + h * G + l * C + c * _),
                (e[8] = u * w + f * L + d * D + p * A),
                (e[9] = u * x + f * T + d * M + p * E),
                (e[10] = u * b + f * R + d * S + p * H),
                (e[11] = u * k + f * G + d * C + p * _),
                (e[12] = v * w + y * L + g * D + m * A),
                (e[13] = v * x + y * T + g * M + m * E),
                (e[14] = v * b + y * R + g * S + m * H),
                (e[15] = v * k + y * G + g * C + m * _),
                e
              );
            },
          },
          {
            key: "lookAt",
            value: function (t, i, e, s) {
              s = s || new Float32Array(16);
              var r = this.normalize(this.subtract(t, i)),
                n = this.normalize(this.cross(e, r)),
                a = this.normalize(this.cross(r, n));
              return (
                (s[0] = n[0]),
                (s[1] = n[1]),
                (s[2] = n[2]),
                (s[3] = 0),
                (s[4] = a[0]),
                (s[5] = a[1]),
                (s[6] = a[2]),
                (s[7] = 0),
                (s[8] = r[0]),
                (s[9] = r[1]),
                (s[10] = r[2]),
                (s[11] = 0),
                (s[12] = t[0]),
                (s[13] = t[1]),
                (s[14] = t[2]),
                (s[15] = 1),
                s
              );
            },
          },
          {
            key: "subtract",
            value: function (t, i, e) {
              return (
                ((e = e || new Float32Array(3))[0] = t[0] - i[0]),
                (e[1] = t[1] - i[1]),
                (e[2] = t[2] - i[2]),
                e
              );
            },
          },
          {
            key: "cross",
            value: function (t, i, e) {
              return (
                ((e = e || new Float32Array(3))[0] =
                  t[1] * i[2] - t[2] * i[1]),
                (e[1] = t[2] * i[0] - t[0] * i[2]),
                (e[2] = t[0] * i[1] - t[1] * i[0]),
                e
              );
            },
          },
          {
            key: "normalize",
            value: function (t, i) {
              i = i || new Float32Array(3);
              var e = Math.sqrt(t[0] * t[0] + t[1] * t[1] + t[2] * t[2]);
              return (
                1e-5 < e &&
                  ((i[0] = t[0] / e),
                  (i[1] = t[1] / e),
                  (i[2] = t[2] / e)),
                i
              );
            },
          },
        ]),
        t
      );
    })())(),
    m = (function () {
      function i(t) {
        a(this, i),
          (this.c = _C),
          (this.winW = this.c.win.w),
          (this.winH = this.c.win.h),
          (this.winWpsdW = this.c.winWpsdW),
          (this.winHpsdH = this.c.winHpsdH),
          (this.winGlwinW = this.c.winGlwinW),
          (this.winGlwinH = this.c.winGlwinH),
          (this.demiWinGl = this.c.winGlDemi);
      }
      return (
        o(i, [
          {
            key: "run",
            value: function (t) {
              var i = t.shape,
                e = t.index,
                s = {};
              0 === e
                ? ((s.x = 0),
                  (s.y = 0 - t.scroll.y),
                  (s.w = this.winW),
                  (s.h = this.winH))
                : 0 < e && e < 7
                ? ((s.x = i.x * this.winWpsdW + t.scroll.x),
                  (s.y = this.winH + i.y * this.winWpsdW - t.scroll.y),
                  (s.w = i.w * this.winWpsdW),
                  (s.h = i.h * this.winWpsdW))
                : ((s.x = i.x + i.zoom.x - t.scroll.x),
                  (s.y = i.y + i.zoom.y - t.scroll.y),
                  (s.w = i.w + i.zoom.w),
                  (s.h = i.h + i.zoom.h));
              for (
                var r = s.x * this.winGlwinW,
                  n = s.y * this.winGlwinH,
                  a = s.w * this.winGlwinW,
                  o = s.h * this.winGlwinH,
                  h = i.points.hori - 1,
                  l = i.points.vert - 1,
                  c = a / h,
                  u = o / l,
                  f = this.demiWinGl - r,
                  d = -this.demiWinGl + o + n,
                  p = [],
                  v = 0,
                  y = 0;
                y < l;
                y++
              )
                for (var g = u * y - d, m = g + u, w = 0; w < h; w++) {
                  var x = c * w - f,
                    b = x + c;
                  (p[v++] = x),
                    (p[v++] = g),
                    (p[v++] = b),
                    (p[v++] = g),
                    (p[v++] = x),
                    (p[v++] = m),
                    (p[v++] = x),
                    (p[v++] = m),
                    (p[v++] = b),
                    (p[v++] = g),
                    (p[v++] = b),
                    (p[v++] = m);
                }
              var k = p.length / 2,
                L = [],
                T = t.img;
              if (Y.Is.def(t.img)) {
                var R = {};
                (R.img = Y.R(T.width / T.height, 7)),
                  (R.shape = 0 === s.h ? 0 : Y.R(s.w / s.h, 7));
                var G = t.scale,
                  D = {};
                R.shape > R.img
                  ? ((D.w = G), (D.h = (G / R.img) * R.shape))
                  : ((D.w = (G * R.img) / R.shape), (D.h = G));
                for (
                  var M = (1 - 1 / D.w) / 2 + t.parallax.x,
                    S = (1 - 1 / D.h) / 2 - t.parallax.y,
                    C = 0,
                    A = 0;
                  A < l;
                  A++
                )
                  for (
                    var E = 1 - A / l / D.h - S,
                      H = 1 - (A + 1) / l / D.h - S,
                      _ = 0;
                    _ < h;
                    _++
                  ) {
                    var z = _ / h / D.w + M,
                      W = (_ + 1) / h / D.w + M;
                    (L[C++] = z),
                      (L[C++] = E),
                      (L[C++] = W),
                      (L[C++] = E),
                      (L[C++] = z),
                      (L[C++] = H),
                      (L[C++] = z),
                      (L[C++] = H),
                      (L[C++] = W),
                      (L[C++] = E),
                      (L[C++] = W),
                      (L[C++] = H);
                  }
              }
              return {
                pos: { type: "TRIANGLES", arr: p, l: k },
                texCoord: { arr: L },
              };
            },
          },
        ]),
        i
      );
    })(),
    w = (function () {
      function t() {
        a(this, t),
          (this.c = _C),
          Y.BM(this, ["resize"]),
          (this.RO = new Y.RO({ cb: this.resize, throttleDelay: 100 })),
          this.init();
      }
      return (
        o(t, [
          {
            key: "init",
            value: function () {
              (this.gl = y.canvasCtx(Y.G.id("gl"), {
                antialias: !0,
                alpha: !0,
              })),
                (this.program = y.crP(this.gl, [
                  "precision mediump float;attribute vec4 a_p;uniform mat4 u_m;attribute vec2 a_t;uniform float u_w;uniform float u_c;uniform float u_d;uniform float u_z;uniform float u_n;varying vec2 v;varying vec2 p;float io4(float m){return m<0.5?8.0*m*m*m*m:1.0-8.0*(--m)*m*m*m;}void main(){float d=length(a_p.xy);float z=0.0;if(d<u_d){float n=d/u_d;float e=io4(n);z=u_z-(e*u_z);z=-z*u_c;}float z2=sin(a_p.x/-0.7+u_n)*u_w;gl_Position=u_m*vec4(a_p.x,a_p.y,z+z2,1.0);v=a_t;p=a_p.xy;}",
                  "precision highp float;varying vec2 v;uniform sampler2D u_tex;uniform float u_b;uniform float u_o;uniform float u_no;uniform float u_y;varying vec2 p;float g(in vec2 st){return fract(sin(dot(st.xy,vec2(12.9898,78.233)))*43758.5453123);}float e(vec2 st){vec2 i=floor(st);vec2 f=fract(st);vec2 u=f*f*(3.0-2.0*f);return mix(mix(g(i+vec2(0.0,0.0)),g(i+vec2(1.0,0.0)),u.x),mix(g(i+vec2(0.0,1.0)),g(i+vec2(1.0,1.0)),u.x),u.y);}void main(){float f =150.0;float n=smoothstep(0.49,0.5,e(vec2(p.x*f,(p.y-u_y)*f))-(0.51*u_no));vec3 d=vec3(0.952941,0.949019,0.945098);vec4 c=vec4(d.rgb,0.0);vec4 b=vec4(d.rgb,1.0);vec4 a=mix(c,b,n);vec4 tex=texture2D(u_tex,v);vec4 finalTex=mix(tex,a,u_b);vec4 finalTex2=mix(b,finalTex,u_o);gl_FragColor=finalTex2;gl_FragColor.rgb*=gl_FragColor.a;}",
                ])),
                (this.attrib = y.loc("a", this.gl, this.program, [
                  "p",
                  "t",
                ])),
                (this.uniform = y.loc("u", this.gl, this.program, [
                  "m",
                  "b",
                  "c",
                  "d",
                  "z",
                  "w",
                  "n",
                  "o",
                  "no",
                  "y",
                ])),
                (this.texCoordBuffer = this.gl.createBuffer()),
                this.gl.bindBuffer(
                  this.gl.ARRAY_BUFFER,
                  this.texCoordBuffer
                ),
                this.gl.vertexAttribPointer(
                  this.attrib.t,
                  2,
                  this.gl.FLOAT,
                  !1,
                  0,
                  0
                ),
                (this.positionBuffer = this.gl.createBuffer()),
                this.gl.bindBuffer(
                  this.gl.ARRAY_BUFFER,
                  this.positionBuffer
                ),
                this.gl.vertexAttribPointer(
                  this.attrib.p,
                  2,
                  this.gl.FLOAT,
                  !1,
                  0,
                  0
                ),
                this.gl.enableVertexAttribArray(this.attrib.p),
                this.RO.on(),
                this.resize();
            },
          },
          {
            key: "resize",
            value: function () {
              y.resizeCvs(this.gl, 1),
                this.gl.enable(this.gl.CULL_FACE),
                this.gl.cullFace(this.gl.BACK),
                this.gl.useProgram(this.program);
              var t = new i();
              (this.c.winGl = t.winGl),
                (this.c.winGlDemi = this.c.winGl / 2),
                (this.c.winGlwinW = this.c.winGl / this.c.win.w),
                (this.c.winGlwinH = this.c.winGl / this.c.win.h),
                this.gl.uniformMatrix4fv(this.uniform.m, !1, t.matrix),
                (this.verticesTx = new m()),
                (this.verticesBg = new m());
            },
          },
          {
            key: "imgU",
            value: function (t, i) {
              (this.img = { page: t, gallery: i }),
                (this.texPage = new h(this.gl, this.img.page)),
                (this.texGallery = new h(this.gl, this.img.gallery));
            },
          },
          {
            key: "drawBg",
            value: function (t) {
              var i = this.verticesBg.run({
                shape: t.shape,
                scroll: t.scroll,
                index: t.index,
              });
              this.gl.uniform1f(this.uniform.b, 1),
                this.gl.uniform1f(this.uniform.o, t.opacity),
                this.gl.uniform1f(this.uniform.n, 0),
                this.gl.uniform1f(this.uniform.w, 0),
                this.gl.uniform1f(this.uniform.c, 0),
                this.gl.uniform1f(this.uniform.d, 0),
                this.gl.uniform1f(this.uniform.z, 0),
                this.gl.uniform1f(this.uniform.no, t.noise),
                this.gl.uniform1f(
                  this.uniform.y,
                  t.scroll.y * this.c.winGlwinH
                ),
                this.draw(i);
            },
          },
          {
            key: "drawImg",
            value: function (t) {
              var i = 6 < t.index,
                e = t.texNo,
                s = i ? this.img.gallery[e] : this.img.page[e],
                r = i ? this.texGallery[e] : this.texPage[e],
                n = this.verticesTx.run({
                  shape: t.shape,
                  scroll: t.scroll,
                  scale: t.scale,
                  parallax: t.parallax,
                  img: s,
                  index: t.index,
                });
              this.gl.uniform1f(this.uniform.b, 0),
                this.gl.uniform1f(this.uniform.o, t.opacity),
                this.gl.uniform1f(this.uniform.n, t.now),
                this.gl.uniform1f(this.uniform.w, t.wave),
                this.gl.uniform1f(this.uniform.c, t.curve),
                this.gl.uniform1f(this.uniform.d, 1.3 * this.c.winGl),
                this.gl.uniform1f(this.uniform.z, 1.4),
                this.gl.uniform1f(this.uniform.no, 0),
                this.gl.uniform1f(this.uniform.y, 0),
                this.gl.bindTexture(this.gl.TEXTURE_2D, r),
                this.gl.bindBuffer(
                  this.gl.ARRAY_BUFFER,
                  this.texCoordBuffer
                ),
                this.gl.enableVertexAttribArray(this.attrib.t),
                this.gl.bufferData(
                  this.gl.ARRAY_BUFFER,
                  new Float32Array(n.texCoord.arr),
                  this.gl.STATIC_DRAW
                ),
                this.draw(n);
            },
          },
          {
            key: "draw",
            value: function (t) {
              this.gl.bindBuffer(
                this.gl.ARRAY_BUFFER,
                this.positionBuffer
              ),
                this.gl.enableVertexAttribArray(this.attrib.p),
                this.gl.bufferData(
                  this.gl.ARRAY_BUFFER,
                  new Float32Array(t.pos.arr),
                  this.gl.STATIC_DRAW
                ),
                this.gl.drawArrays(this.gl[t.pos.type], 0, t.pos.l);
            },
          },
          {
            key: "clear",
            value: function () {
              this.gl.clear(this.gl.DEPTH_BUFFER_BIT);
            },
          },
        ]),
        t
      );
    })(),
    x = new ((function () {
      function i() {
        a(this, i),
          (this.c = _C),
          (this.c.lastToRender = 17),
          (this.isScaled = []);
        for (var t = 0; t < 4; t++) this.isScaled[t] = !1;
      }
      return (
        o(i, [
          {
            key: "init",
            value: function (t) {
              (this.cb = t.cb), (this.c.shape = this.c.data.gl);
              for (var i = 0; i < 27; i++) this.c.shape[i + 7] = {};
              (this.c.shapeL = this.c.shape.length),
                (this.arr = this.c.shape),
                (this.arrL = this.arr.length);
              for (var e = 0; e < this.arrL; e++) {
                var s = this.arr[e];
                (s.speed = s.speed || 1), (s.isOut = !0), (s.inside = {});
              }
            },
          },
          {
            key: "resize",
            value: function () {
              (this.winH = this.c.win.h), (this.winW = this.c.win.w);
              for (
                var t = this.c.winWpsdW, i = (this.c.winHpsdH, 0);
                i < this.arrL;
                i++
              ) {
                var e = this.arr[i],
                  s = e.inside;
                if (0 === i)
                  (s.top = 0),
                    (s.bottom = this.winH),
                    (s.left = 0),
                    (s.right = this.winW);
                else if (0 < i && i < 7) {
                  var r = e.y * t;
                  (s.top = r + this.winH),
                    (s.bottom = r + this.winH + e.h * t);
                  var n = e.x * t;
                  (s.left = n), (s.right = n + e.w * t);
                } else {
                  var a = e.y;
                  (s.top = a), (s.bottom = a + e.h);
                  var o = e.x;
                  (s.left = o), (s.right = o + e.w);
                }
              }
              this.run();
            },
          },
          {
            key: "run",
            value: function () {
              var t = this.c.lastToRender;
              (this.sY = this.c.s),
                (this.sX = 0),
                (this.mmX = this.c.mm.x),
                (this.mmY = this.c.mm.y);
              for (var i = 0; i < this.arrL; i++)
                i !== t && this.inOut(i);
              0 < this.arrL && this.inOut(t);
            },
          },
          {
            key: "inOut",
            value: function (t) {
              var i,
                e = this.arr[t],
                s = e.inside,
                r = 6 < t,
                n = r ? this.mmY : this.sY * e.speed,
                a = n + this.winH >= s.top && n <= s.bottom,
                o = r ? this.mmX : -this.sX,
                h = o + this.winW;
              (i = r
                ? h >= e.x && o <= e.x + e.w
                : h >= s.left && o <= s.right),
                a && i
                  ? (0 < t &&
                      t < 5 &&
                      (this.isScaled[t] ||
                        ((this.isScaled[t] = !0), this.imgScale(t))),
                    e.isOut && (e.isOut = !1),
                    this.cb(t))
                  : e.isOut || ((e.isOut = !0), this.cb(t));
            },
          },
          {
            key: "imgScale",
            value: function (i) {
              var e = this;
              new Y.M({
                d: 2500,
                e: "o4",
                update: function (t) {
                  (e.c.needGLDraw = !0),
                    (e.c.shape[i].scale = Y.Lerp(1.2, 1, t.progE));
                },
                cb: function (t) {
                  e.c.needGLDraw = !1;
                },
              }).play();
            },
          },
        ]),
        i
      );
    })())(),
    b = (function () {
      function t() {
        a(this, t), (this.c = _C), Y.BM(this, ["draw"]);
      }
      return (
        o(t, [
          {
            key: "init",
            value: function () {
              (this.c.imgL = 17),
                (this.c.limit = this.c.imgL - 1),
                (this.c.no = { line: 0, col: 0 }),
                x.init({ cb: this.draw });
            },
          },
          {
            key: "resize",
            value: function () {
              (this.gShapeW = 740 * this.c.winWpsdW),
                (this.gShapeH = 600 * this.c.winHpsdH),
                (this.c.marge = 60 * this.c.winHpsdH),
                (this.gShapeWDemi = this.gShapeW / 2),
                (this.gShapeHDemi = this.gShapeH / 2),
                (this.centerX =
                  2 * this.gShapeW +
                  this.gShapeWDemi +
                  this.c.marge / 2 -
                  this.c.win.w / 2),
                (this.centerY =
                  2 * this.gShapeH +
                  this.gShapeHDemi +
                  this.c.marge / 2 -
                  this.c.win.h / 2);
              for (var t = (this.inc = 0); t < 5; t++)
                this.gLine({ index: t, y: this.gShapeH * t });
              if (
                ((this.c.introXImpair =
                  -(this.centerX + this.c.win.w - this.c.marge) - 2),
                (this.c.introXPair =
                  this.c.introXImpair - this.gShapeWDemi - 2),
                !this.c.galleryIsOn)
              )
                for (var i = 7; i < this.c.shapeL; i++) {
                  var e = this.c.shape[i];
                  e.line % 2 == 0
                    ? (e.x = e.xOrigin + this.c.introXImpair)
                    : (e.x = e.xOrigin + this.c.introXPair);
                }
              this.imgNo(), x.resize();
            },
          },
          {
            key: "inside",
            value: function () {
              x.run();
            },
          },
          {
            key: "gLine",
            value: function (t) {
              for (
                var i = t.index % 2 == 0,
                  e = i ? 5 : 6,
                  s = i ? 0 : this.gShapeWDemi,
                  r = this.c.marge,
                  n = 0;
                n < e;
                n++
              ) {
                var a = this.c.shape[this.inc + 7];
                (a.x = n * this.gShapeW - s - this.centerX + r),
                  (a.xOrigin = a.x),
                  (a.y = t.y - this.centerY + r),
                  (a.w = this.gShapeW - r),
                  (a.h = this.gShapeH - r),
                  (a.points = { hori: 6, vert: 10 }),
                  (a.line = t.index),
                  (a.col = n),
                  this.c.isZoomed && this.inc + 7 === this.c.lastToRender
                    ? ((a.zoom = {
                        x: -a.x,
                        y: -a.y,
                        w: this.c.win.w - a.w,
                        h: this.c.win.h - a.h,
                      }),
                      (a.scale = 1))
                    : ((a.zoom = { x: 0, y: 0, w: 0, h: 0 }),
                      (a.scale = this.c.scale)),
                  (a.wave = 0),
                  this.inc++;
              }
            },
          },
          {
            key: "imgNo",
            value: function () {
              for (
                var t = this.c.no.line, i = this.c.no.col, e = 7;
                e < this.c.shapeL;
                e++
              ) {
                var s = this.c.shape[e],
                  r = s.line + t,
                  n = r % 2 == 0 ? 0 : 1,
                  a = (r - n) / 2 - n + 3 * (s.col + i);
                (a > this.c.limit || a < 0) &&
                  (a %= this.c.imgL) < 0 &&
                  (a = this.c.imgL + a),
                  (s.imgNo = a);
              }
            },
          },
          {
            key: "draw",
            value: function (t) {
              var i = this.c,
                e = i.s,
                s = i.shape[t],
                r = this.c.glPageOpacity;
              if ("bg" === s.type) {
                if (1 === s.noise) return;
                this.c.GLCore.drawBg({
                  index: t,
                  shape: s,
                  scroll: { y: e * s.speed, x: 0 },
                  opacity: r,
                  noise: s.noise,
                });
              } else if (t < 7)
                this.c.GLCore.drawImg({
                  curve: 0,
                  wave: 0,
                  now: 0,
                  index: t,
                  shape: s,
                  scale: s.scale,
                  parallax: { x: 0, y: 0 },
                  scroll: { y: e * s.speed, x: 0 },
                  texNo: t - 1,
                  opacity: r,
                });
              else {
                var n = i.mm.x,
                  a = i.mm.y,
                  o = i.curve,
                  h = i.now,
                  l = i.parallax;
                this.c.GLCore.drawImg({
                  curve: o,
                  wave: s.wave,
                  now: h,
                  index: t,
                  shape: s,
                  scale: s.scale,
                  parallax: l,
                  scroll: { y: a, x: n },
                  texNo: s.imgNo,
                  opacity: 1,
                });
              }
            },
          },
        ]),
        t
      );
    })(),
    k = (function () {
      function r(t) {
        a(this, r);
        var i = t.cb;
        (this.cbY = i.y),
          (this.c = _C),
          (this.isOn = !1),
          (this.y = 0),
          (this.isFF = Y.Snif.isFirefox),
          Y.BM(this, ["raf", "run"]);
        for (var e = ["mouseWheel", "keydown"], s = 0; s < 2; s++)
          Y.L(document, "a", e[s], this.raf);
      }
      return (
        o(r, [
          {
            key: "on",
            value: function (t) {
              t.reset && (this.y = 0), (this.tick = !1), (this.isOn = !0);
            },
          },
          {
            key: "off",
            value: function () {
              this.isOn = !1;
            },
          },
          {
            key: "scrollTo",
            value: function (t) {
              this.y = -t;
            },
          },
          {
            key: "resize",
            value: function (t) {
              (this.max = t),
                (this.spaceGap = this.c.win.h - 40),
                this.c.outroIsOn && this.gCb();
            },
          },
          {
            key: "raf",
            value: function (t) {
              (this.e = t),
                (this.eT = t.type),
                (this.eK = t.key),
                !t.cancelable ||
                  ("keydown" === this.eT && "Tab" !== this.eK) ||
                  t.preventDefault(),
                this.isOn &&
                  ((this.c.takeScroll = !0),
                  this.tick ||
                    (requestAnimationFrame(this.run), (this.tick = !0)));
            },
          },
          {
            key: "run",
            value: function () {
              var t = this.eT;
              "wheel" === t
                ? this.onW()
                : "mousewheel" === t
                ? this.onMW()
                : "keydown" === t && this.keyD();
            },
          },
          {
            key: "onMW",
            value: function () {
              var t = this.e.wheelDeltaY
                ? this.e.wheelDeltaY
                : this.e.wheelDelta;
              (this.y += t), this.gCb();
            },
          },
          {
            key: "onW",
            value: function () {
              var t = this.e.wheelDeltaY || -1 * this.e.deltaY;
              this.isFF && 1 === this.e.deltaMode && (t *= 60),
                (t *= 0.556),
                (this.y += t),
                this.gCb();
            },
          },
          {
            key: "keyD",
            value: function () {
              var t = this.eK,
                i = "ArrowUp" === t,
                e = "ArrowDown" === t,
                s = " " === t;
              if (i || e || s) {
                var r = 0;
                if (i) r = 100;
                else if (e) r = -100;
                else if (s) {
                  var n = this.e.shiftKey ? 1 : -1;
                  r = this.spaceGap * n;
                }
                (this.y += r), this.gCb();
              } else this.tick = !1;
            },
          },
          {
            key: "gCb",
            value: function () {
              this.tick &&
                ((this.y = Y.R(Y.Clamp(this.y, -this.max, 0))),
                this.cbY(-this.y),
                (this.tick = !1));
            },
          },
        ]),
        r
      );
    })(),
    L = new ((function () {
      function t() {
        a(this, t), (this.c = _C);
      }
      return (
        o(t, [
          {
            key: "init",
            value: function (t) {
              this.cb = t.cb;
              var i = Y.G.class("page")[0].children,
                e = i.length;
              this.arr = [];
              for (var s = 0, r = 0; r < e; r++) {
                var n = i[r];
                n.classList.contains("_ns") ||
                  ((this.arr[s] = { dom: n }), s++);
              }
              var a = this.c.data.outsideXhr;
              if (Y.Is.def(a))
                for (var o = a.length, h = 0; h < o; h++)
                  this.arr.push({ dom: Y.Select.el(a[h])[0], isH1: !0 });
              this.arrL = this.arr.length;
              var l = this.c.data.parallax,
                c = Y.Is.def(l) ? l : void 0;
              this.hasParallax = Y.Is.def(c);
              for (
                var u = this.hasParallax ? c.length : 0, f = 0;
                f < this.arrL;
                f++
              ) {
                var d = this.arr[f];
                if (((d.isOut = !0), (d.inside = {}), this.hasParallax))
                  for (var p = 0; p < u; p++) {
                    var v = c[p];
                    if (
                      ((d.oh = v.oh), d.dom === Y.Select.el(v.section)[0])
                    ) {
                      var y = v.arr;
                      (d.parallaxL = y.length), (d.parallax = []);
                      for (var g = 0; g < d.parallaxL; g++) {
                        var m = (d.parallax[g] = {});
                        (m.dom = Y.Select.el(y[g].el)[0]),
                          (m.speed = y[g].speed);
                      }
                    }
                  }
              }
            },
          },
          {
            key: "resize",
            value: function () {
              for (
                var t = this.c.win.h, i = this.c.s, e = 0;
                e < this.arrL;
                e++
              ) {
                var s = this.arr[e];
                this.draw(s);
                var r = s.dom.getBoundingClientRect().top,
                  n = r,
                  a = r + s.dom.offsetHeight;
                if (this.hasParallax && !s.oh)
                  for (var o = 0; o < s.parallaxL; o++) {
                    var h = s.parallax[o],
                      l = 1 + h.speed,
                      c = h.dom.getBoundingClientRect().top,
                      u = (c - t) / l,
                      f = (c + h.dom.offsetHeight) / l;
                    (n = n < u ? n : u), (a = a < f ? f : a);
                  }
                "h1" === s.dom.id
                  ? ((s.inside.top = n / 1.1 - t + i),
                    (s.inside.bottom = a / 1.1 + i))
                  : ((s.inside.top = n - t + i),
                    (s.inside.bottom = a + i));
              }
            },
          },
          {
            key: "run",
            value: function (t) {
              for (var i = this.c.s, e = 0; e < this.arrL; e++) {
                var s = this.arr[e];
                i >= s.inside.top && i <= s.inside.bottom
                  ? ((s.isOut = !1), this.draw(s))
                  : s.isOut || ((s.isOut = !0), this.draw(s));
              }
            },
          },
          {
            key: "draw",
            value: function (t) {
              var i = this.c.s;
              if (
                (t.isH1 ? this.cb(t.dom, 1.1 * i) : this.cb(t.dom, i),
                this.hasParallax)
              )
                for (var e = 0; e < t.parallaxL; e++)
                  this.cb(t.parallax[e].dom, i * t.parallax[e].speed);
            },
          },
        ]),
        t
      );
    })())(),
    T = new ((function () {
      function t() {
        a(this, t),
          (this.c = _C),
          (this.trigger = []),
          (this.sensibility = []),
          (this.tl = []),
          (this.isVisible = []),
          (this.limit = []),
          (this.firstTime = !0);
      }
      return (
        o(t, [
          {
            key: "init",
            value: function () {
              for (
                var e = this,
                  t = 0,
                  s = [],
                  i = function (i) {
                    (e.trigger[i] = Y.G.id("h-s2-img-" + i)),
                      (e.sensibility[i] = 0.8),
                      (s[i] = new Y.M({
                        d: 1600,
                        e: "o2",
                        update: function (t) {
                          (e.c.needGLDraw = !0),
                            (e.c.shape[5 + i].noise = Y.Lerp(
                              -1,
                              1,
                              t.progE
                            ));
                        },
                        cb: function (t) {
                          e.c.needGLDraw = !1;
                        },
                      })),
                      (e.tl[i] = {
                        play: function (t) {
                          s[i].play();
                        },
                      }),
                      t++;
                  },
                  r = 0;
                r < 2;
                r++
              )
                i(r);
              var n = Y.G.id("h-s1-0"),
                a = Y.G.class("entitled", n)[0],
                o = Y.G.class("line", n)[0],
                h = Y.G.class("title-1", n)[0].children;
              (this.trigger[t] = n),
                (this.sensibility[t] = 0.8),
                (this.tl[t] = new Y.TL()),
                this.tl[t].from({
                  el: a,
                  p: { y: [100, 0], rotateX: [90, 0] },
                  d: 1800,
                  e: "o6",
                }),
                this.tl[t].from({
                  el: o,
                  p: { scaleX: [0, 1] },
                  d: 1800,
                  e: "o6",
                  delay: 100,
                });
              for (r = 0; r < 3; r++)
                this.tl[t].from({
                  el: h[r],
                  p: { y: [100, 0], rotateX: [90, 0] },
                  d: 1800,
                  e: "o6",
                  delay: 100,
                });
              t++;
              var l = Y.G.id("h-s1-1"),
                c = Y.G.class("entitled", l)[0],
                u = Y.G.class("line", l)[0],
                f = Y.G.class("txt-1", l)[0],
                d = Y.G.class("txt-0", l)[0];
              (this.trigger[t] = l),
                (this.sensibility[t] = 0.8),
                (this.tl[t] = new Y.TL()),
                this.tl[t].from({
                  el: c,
                  p: { y: [100, 0], rotateX: [90, 0] },
                  d: 1800,
                  e: "o6",
                  delay: 200,
                }),
                this.tl[t].from({
                  el: u,
                  p: { scaleX: [0, 1] },
                  d: 1800,
                  e: "o6",
                  delay: 100,
                }),
                this.tl[t].from({
                  el: f,
                  p: { y: [20, 0], opacity: [0, 1] },
                  d: 1800,
                  e: "o6",
                  delay: 100,
                }),
                this.tl[t].from({
                  el: d,
                  p: { y: [100, 0], opacity: [0, 1] },
                  d: 1800,
                  e: "o6",
                  delay: 100,
                }),
                t++;
              for (
                var p = Y.G.id("h-s1-caption-w").children, v = 0;
                v < 4;
                v++
              )
                (this.trigger[t] = p[v]),
                  (this.sensibility[t] = 0.8),
                  (this.tl[t] = new Y.TL()),
                  this.tl[t].from({
                    el: p[v],
                    p: { y: [100, 0], opacity: [0, 1] },
                    d: 1800,
                    e: "o6",
                  }),
                  t++;
              var y = Y.G.id("h-s1-gallery-txt");
              (this.trigger[t] = y),
                (this.sensibility[t] = 0.8),
                (this.tl[t] = new Y.TL()),
                this.tl[t].from({
                  el: y,
                  p: { y: [100, 0], opacity: [0, 1] },
                  d: 1800,
                  e: "o6",
                }),
                t++;
              var g = Y.G.id("h-s2-title"),
                m = g.children;
              (this.trigger[t] = g),
                (this.sensibility[t] = 0.8),
                (this.tl[t] = new Y.TL());
              for (var w = 0; w < 4; w++) {
                var x = 0 === w ? 0 : 100;
                this.tl[t].from({
                  el: m[w],
                  p: { y: [100, 0], rotateX: [90, 0] },
                  d: 1800,
                  e: "o6",
                  delay: x,
                });
              }
              t++;
              for (var b = Y.G.class("h-s2-li"), k = 0; k < 5; k++) {
                var L = b[k],
                  T = Y.G.class("entitled", L)[0],
                  R = Y.G.class("line", L)[0],
                  G = Y.G.class("title-1", L)[0].children,
                  D = G.length,
                  M = Y.G.class("txt-0", L),
                  S = M.length;
                if (
                  ((this.trigger[t] = L),
                  (this.sensibility[t] = 0.8),
                  (this.tl[t] = new Y.TL()),
                  this.tl[t].from({
                    el: T,
                    p: { y: [100, 0], rotateX: [90, 0] },
                    d: 1800,
                    e: "o6",
                  }),
                  this.tl[t].from({
                    el: R,
                    p: { scaleX: [0, 1] },
                    d: 1800,
                    e: "o6",
                    delay: 100,
                  }),
                  2 === k)
                ) {
                  var C = Y.G.class("txt-1", L)[0];
                  this.tl[t].from({
                    el: C,
                    p: { y: [100, 0], opacity: [0, 1] },
                    d: 1800,
                    e: "o6",
                    delay: 100,
                  });
                  for (var A = 0; A < D; A++)
                    this.tl[t].from({
                      el: G[A],
                      p: { y: [100, 0], rotateX: [90, 0] },
                      d: 1800,
                      e: "o6",
                      delay: 100,
                    });
                  for (var E = 0; E < S; E++)
                    this.tl[t].from({
                      el: M[E],
                      p: { y: [100, 0], opacity: [0, 1] },
                      d: 1800,
                      e: "o6",
                      delay: 100,
                    });
                } else {
                  for (var H = 0; H < D; H++)
                    this.tl[t].from({
                      el: G[H],
                      p: { y: [100, 0], rotateX: [90, 0] },
                      d: 1800,
                      e: "o6",
                      delay: 100,
                    });
                  for (var _ = 0; _ < S; _++)
                    this.tl[t].from({
                      el: M[_],
                      p: { y: [100, 0], opacity: [0, 1] },
                      d: 1800,
                      e: "o6",
                      delay: 100,
                    });
                  if (1 === k || 4 === k) {
                    var z = Y.G.class("txt-2", L)[0];
                    this.tl[t].from({
                      el: z,
                      p: { y: [50, 0], opacity: [0, 1] },
                      d: 1800,
                      e: "o6",
                      delay: 100,
                    });
                  }
                }
                t++;
              }
              var W = Y.G.id("footer"),
                B = Y.G.class("entitled", W),
                I = Y.G.class("line", W),
                P = Y.G.class("txt-2", W),
                O = Y.G.class("title-1", W)[0].children,
                X = Y.G.class("txt-0", W)[0];
              (this.trigger[t] = W),
                (this.sensibility[t] = 0.8),
                (this.tl[t] = new Y.TL()),
                this.tl[t].from({
                  el: B[0],
                  p: { y: [100, 0], rotateX: [90, 0] },
                  d: 1800,
                  e: "o6",
                }),
                this.tl[t].from({
                  el: I[0],
                  p: { scaleX: [0, 1] },
                  d: 1800,
                  e: "o6",
                  delay: 100,
                }),
                this.tl[t].from({
                  el: P[0],
                  p: { y: [100, 0], opacity: [0, 1] },
                  d: 1800,
                  e: "o6",
                  delay: 100,
                }),
                this.tl[t].from({
                  el: P[1],
                  p: { y: [100, 0], opacity: [0, 1] },
                  d: 1800,
                  e: "o6",
                  delay: 100,
                }),
                this.tl[t].from({
                  el: B[1],
                  p: { y: [100, 0], rotateX: [90, 0] },
                  d: 1800,
                  e: "o6",
                  delay: 100,
                }),
                this.tl[t].from({
                  el: I[1],
                  p: { scaleX: [0, 1] },
                  d: 1800,
                  e: "o6",
                  delay: 100,
                });
              for (var F = 0; F < 3; F++)
                this.tl[t].from({
                  el: O[F],
                  p: { y: [100, 0], rotateX: [90, 0] },
                  d: 1800,
                  e: "o6",
                  delay: 100,
                });
              if (
                (this.tl[t].from({
                  el: X,
                  p: { y: [100, 0], opacity: [0, 1] },
                  d: 1800,
                  e: "o6",
                  delay: 100,
                }),
                (this.triggerL = this.trigger.length),
                this.firstTime)
              ) {
                this.firstTime = !1;
                for (var N = 0; N < this.triggerL; N++)
                  this.isVisible[N] = !1;
              }
            },
          },
          {
            key: "resize",
            value: function () {
              for (
                var t = this.c.s, i = this.c.win.h, e = 0;
                e < this.triggerL;
                e++
              )
                0 !== this.trigger[e] &&
                  (this.limit[e] =
                    this.trigger[e].getBoundingClientRect().top +
                    t -
                    i * this.sensibility[e]);
            },
          },
          {
            key: "run",
            value: function () {
              var t = this.c.s;
              0 < t &&
                this.c.scrollHero.isVisible() &&
                this.c.scrollHero.hide();
              for (var i = 0; i < this.triggerL; i++)
                t > this.limit[i] &&
                  !this.isVisible[i] &&
                  ((this.isVisible[i] = !0), this.tl[i].play());
            },
          },
        ]),
        t
      );
    })())(),
    R = new ((function () {
      function t() {
        var i = this;
        a(this, t),
          (this.c = _C),
          (this.isRunning = !1),
          (this.timer = new Y.Delay(function (t) {
            (i.isRunning = !1), i.pointer("none");
          }, 300));
      }
      return (
        o(t, [
          {
            key: "init",
            value: function () {
              (this.isMobile = this.c.isMobile),
                this.isMobile || (this.el = Y.G.id("_p"));
            },
          },
          {
            key: "run",
            value: function () {
              this.isMobile ||
                (this.timer.stop(),
                this.isRunning ||
                  ((this.isRunning = !0), this.pointer("all")),
                this.timer.run());
            },
          },
          {
            key: "pointer",
            value: function (t) {
              Y.PE[t](this.el);
            },
          },
        ]),
        t
      );
    })())(),
    G = (function () {
      function t() {
        a(this, t),
          (this.c = _C),
          (this.c.s = 0),
          (this.c.takeScroll = !1),
          (this.a = { pause: function (t) {} }),
          (this.c.needGLDraw = !1),
          (this.s = { y: {}, x: {} }),
          Y.BM(this, ["sY", "draw", "sTop", "sBottom"]),
          (this.vScroll = new k({ cb: { y: this.sY } }));
      }
      return (
        o(t, [
          {
            key: "init",
            value: function () {
              R.init(),
                T.init(),
                (this.navProg = Y.G.id("nav-prog")),
                this.sUp({ x: 0, y: 0 }),
                L.init({ cb: this.draw });
            },
          },
          {
            key: "resize",
            value: function () {
              var t = this.c.win.h,
                i = Y.G.id("xhr").children[0].offsetHeight - t;
              (this.progC = i / 100),
                this.vScroll.resize(i),
                this.sUp({ x: 0, y: Y.Clamp(this.s.y.targ, 0, i) }),
                L.resize(),
                T.resize();
            },
          },
          {
            key: "on",
            value: function (t) {
              this.lS("a"), this.vScroll.on(t);
            },
          },
          {
            key: "off",
            value: function () {
              this.lS("r"), this.vScroll.off();
            },
          },
          {
            key: "sY",
            value: function (t) {
              this.c.takeScroll && this.a.pause(),
                (this.s.y.targ = Y.R(t)),
                R.run();
            },
          },
          {
            key: "loop",
            value: function () {
              if (this.s.y.currR !== this.s.y.targ || this.c.needGLDraw) {
                var t = this.s.y.targ - this.s.y.curr;
                (this.s.y.curr += 0.09 * t),
                  (this.s.y.currR = Y.R(this.s.y.curr)),
                  (this.c.s = this.s.y.currR),
                  Y.T(
                    this.navProg,
                    0,
                    Y.R(this.s.y.curr / this.progC - 100)
                  ),
                  T.run(),
                  this.c.galleryIsOn || this.c.GL.inside(),
                  L.run();
              }
            },
          },
          {
            key: "draw",
            value: function (t, i) {
              Y.T(t, 0, -i, "px");
            },
          },
          {
            key: "sUp",
            value: function (t) {
              for (var i = ["x", "y"], e = 0; e < 2; e++) {
                var s = i[e],
                  r = t[s];
                (this.s[s].targ = r),
                  (this.s[s].curr = r),
                  (this.s[s].currR = r);
              }
              this.c.s = this.s.y.targ;
            },
          },
          {
            key: "lS",
            value: function (t) {
              Y.L("#footer-top", t, "click", this.sTop),
                Y.L(".s-bottom", t, "click", this.sBottom);
            },
          },
          {
            key: "sTop",
            value: function () {
              this.sTo({ end: 0, d: 2e3, e: "io6" });
            },
          },
          {
            key: "sBottom",
            value: function () {
              this.sTo({ end: this.c.win.h, d: 1300, e: "io5" });
            },
          },
          {
            key: "sTo",
            value: function (t) {
              var e = this,
                s = this.s.y.targ,
                r = t.end;
              (this.a = new Y.M({
                d: t.d,
                e: t.e,
                update: function (t) {
                  var i = Y.Lerp(s, r, t.progE);
                  e.vScroll.scrollTo(i), e.sY(i);
                },
              })),
                (this.c.takeScroll = !1),
                this.a.play();
            },
          },
        ]),
        t
      );
    })(),
    D = new ((function () {
      function t() {
        a(this, t),
          (this.c = _C),
          (this.inDom = !1),
          Y.BM(this, ["click"]);
      }
      return (
        o(t, [
          {
            key: "on",
            value: function () {
              this.l("a");
            },
          },
          {
            key: "off",
            value: function () {
              this.l("r");
            },
          },
          {
            key: "l",
            value: function (t) {
              Y.L("#nav-date", t, "click", this.click);
            },
          },
          {
            key: "click",
            value: function () {
              if (this.inDom)
                "o" === this.gridW.className
                  ? (this.gridW.parentNode.removeChild(this.gridW),
                    (this.inDom = !1))
                  : (this.gridW.className = "o");
              else {
                (this.gridW = Y.Cr("div")), (this.gridW.id = "grid-w");
                var t = Y.Cr("div");
                t.id = "grid";
                for (
                  var i = this.c.isDesktop ? 12 : 2, e = [], s = 0;
                  s < i;
                  s++
                )
                  (e[s] = Y.Cr("div")), t.appendChild(e[s]);
                this.gridW.appendChild(t),
                  Y.G.id("app").appendChild(this.gridW),
                  (this.inDom = !0);
              }
            },
          },
        ]),
        t
      );
    })())(),
    M = new ((function () {
      function t() {
        a(this, t),
          Y.BM(this, ["down", "up"]),
          (this.d = 500),
          (this.e = "o3");
      }
      return (
        o(t, [
          {
            key: "init",
            value: function (t) {
              var i = "h-s1-gallery-btn",
                e = Y.G.class(i + "-poly");
              (this.cta = Y.G.id(i)),
                (this.lineA = new Y.M({
                  line: { elWL: e[0], start: 0, end: 100 },
                  el: e[1],
                  e: "linear",
                  cb: !1,
                }));
            },
          },
          {
            key: "on",
            value: function () {
              this.l("a");
            },
          },
          {
            key: "off",
            value: function () {
              this.l("r");
            },
          },
          {
            key: "l",
            value: function (t) {
              Y.L(this.cta, t, "mousedown", this.down),
                Y.L(this.cta, t, "mouseup", this.up);
            },
          },
          {
            key: "down",
            value: function () {
              var i = this;
              this.lineA.play({
                line: { end: 100 },
                reverse: !1,
                d: 1e3,
                cb: function (t) {
                  i.lineA.play({
                    line: { end: 0 },
                    reverse: !0,
                    d: 1,
                    cb: !1,
                  }),
                    Y.G.class("nav-link")[3].click();
                },
              });
            },
          },
          {
            key: "up",
            value: function () {
              this.lineA.play({
                line: { end: 0 },
                reverse: !0,
                d: 1e3,
                cb: !1,
              });
            },
          },
        ]),
        t
      );
    })())(),
    S = 4,
    C = 0.001,
    A = 1e-7,
    E = 10,
    H = 11,
    _ = 1 / (H - 1);
  function z(t, i) {
    return 1 - 3 * i + 3 * t;
  }
  function W(t, i) {
    return 3 * i - 6 * t;
  }
  function B(t) {
    return 3 * t;
  }
  function I(t, i, e) {
    return ((z(i, e) * t + W(i, e)) * t + B(i)) * t;
  }
  function P(t, i, e) {
    return 3 * z(i, e) * t * t + 2 * W(i, e) * t + B(i);
  }
  function O(a, i, o, e) {
    var h = new Float32Array(H);
    if (a !== i || o !== e)
      for (var t = 0; t < H; ++t) h[t] = I(t * _, a, o);
    function s(t) {
      for (var i = 0, e = H - 1, s = 1; s !== e && h[s] <= t; ++s) i += _;
      var r = i + ((t - h[--s]) / (h[s + 1] - h[s])) * _,
        n = P(r, a, o);
      return C <= n
        ? (function (t, i, e, s) {
            for (var r = 0; r < S; ++r) {
              var n = P(i, e, s);
              if (0 === n) return i;
              i -= (I(i, e, s) - t) / n;
            }
            return i;
          })(t, r, a, o)
        : 0 === n
        ? r
        : (function (t, i, e, s, r) {
            for (
              var n = 0, a = 0, o = 0;
              0 < (n = I((a = i + (e - i) / 2), s, r) - t)
                ? (e = a)
                : (i = a),
                Math.abs(n) > A && ++o < E;

            );
            return a;
          })(t, n, n + _, a, o);
    }
    return function (t) {
      return a === i && o === e
        ? t
        : 0 === t
        ? 0
        : 1 === t
        ? 1
        : I(s(t), i, e);
    };
  }
  var X = new ((function () {
      function t() {
        a(this, t);
      }
      return (
        o(t, [
          {
            key: "run",
            value: function (t) {
              t.setAttribute("style", "");
            },
          },
        ]),
        t
      );
    })())(),
    F = new ((function () {
      function t() {
        a(this, t),
          (this.c = _C),
          (this.c.mm = { x: 0, y: 0 }),
          (this.firstTime = !0),
          (this.c.galleryIsOn = !1),
          (this.galleryIntro = !1),
          (this.ease = O(0.7, 0, 0.1, 1)),
          (this.c.now = 0),
          (this.c.curve = 0),
          (this.c.glPageOpacity = 1),
          (this.c.isZoomed = !1),
          (this.mm = {
            x: { targ: 0, curr: 0, currR: 0 },
            y: { targ: 0, curr: 0, currR: 0 },
          }),
          (this.start = { x: 0, y: 0 }),
          (this.last = { x: 0, y: 0 }),
          (this.c.parallax = { x: 0, y: 0 }),
          (this.curve = { targ: 0, curr: 0, currR: 0 }),
          (this.sensi = 1.2),
          (this.wave = { start: 0, end: 0.4, curr: 0 }),
          (this.c.scale = 1.4),
          (this.scale = {
            start: this.c.scale,
            curr: this.c.scale,
            end: 1,
          }),
          (this.isDown = !1),
          (this.isDezooming = !1),
          Y.BM(this, ["move", "down", "up", "back", "gallShow"]),
          (this.mmE = new Y.MM({ cb: this.move }));
      }
      return (
        o(t, [
          {
            key: "init",
            value: function () {
              (this.app = Y.G.id("app")),
                (this.cta = Y.G.class("nav-link")[3]),
                (this.drag = Y.G.id("nav-drag")),
                (this.dragSail = Y.G.id("nav-drag-sail")),
                (this.dragBg = Y.G.class("nav-drag-bg"));
              var t = Y.G.id("nav-caption");
              (this.caption0 = Y.G.class("nav-caption-0")),
                (this.caption1 = Y.G.id("nav-caption-1")),
                (this.dragShow = new Y.M({
                  el: this.drag,
                  p: { opacity: [0, 1] },
                  d: 10,
                  e: "o2",
                })),
                (this.dragSailShow = new Y.M({
                  el: this.dragSail,
                  p: { opacity: [0, 0.2] },
                  d: 10,
                  e: "linear",
                })),
                (this.dragClose = new Y.TL()),
                this.dragClose.from({
                  el: this.dragBg[0],
                  p: { x: [0, 35] },
                  d: 600,
                  e: "o4",
                }),
                this.dragClose.from({
                  el: this.dragBg[1],
                  p: { x: [0, -35] },
                  d: 600,
                  e: "o4",
                }),
                this.dragClose.from({
                  el: "#nav-drag-content-0",
                  p: { y: [0, -50], opacity: [1, 0] },
                  d: 600,
                  e: "o4",
                }),
                this.dragClose.from({
                  el: "#nav-drag-content-1",
                  p: { y: [50, 0], opacity: [0, 1] },
                  d: 600,
                  e: "o4",
                }),
                this.dragClose.from({
                  el: "#nav-drag-bg-wrap",
                  p: { opacity: [0.94, 0.6] },
                  d: 600,
                  e: "o4",
                }),
                (this.captionShow = new Y.M({
                  el: t,
                  p: { opacity: [0, 1] },
                  d: 10,
                  e: "o2",
                }));
            },
          },
          {
            key: "resize",
            value: function () {
              (this.jump = {
                x: this.c.shape[7].w + this.c.marge,
                y: this.c.shape[7].h + this.c.marge,
              }),
                (this.jumpDemi = {
                  x: this.jump.x / 2,
                  y: this.jump.y / 2,
                });
            },
          },
          {
            key: "on",
            value: function () {
              this.lCTA("a");
            },
          },
          {
            key: "lCTA",
            value: function (t) {
              Y.L(this.cta, t, "click", this.gallShow);
            },
          },
          {
            key: "gallShow",
            value: function () {
              var a = this;
              this.lCTA("r"),
                this.c.scroll.off(),
                this.c.scrollHero.isVisible() && this.c.scrollHero.hide(),
                this.c.navLink.hide({ d: 1200 }),
                (this.app.style.userSelect = "none"),
                (this.c.galleryIsOn = !0);
              var t = new Y.M({
                  d: 2e3,
                  e: "io5",
                  update: function (t) {
                    for (
                      var i = t.progE,
                        e = Y.Lerp(a.c.introXImpair, 0, i),
                        s = Y.Lerp(a.c.introXPair, 0, i),
                        r = 7;
                      r < a.c.shapeL;
                      r++
                    ) {
                      var n = a.c.shape[r];
                      n.line % 2 == 0
                        ? (n.x = n.xOrigin + e)
                        : (n.x = n.xOrigin + s);
                    }
                  },
                }),
                i = new Y.M({
                  d: 800,
                  e: "o3",
                  update: function (t) {
                    a.c.glPageOpacity = 1 - t.progE;
                  },
                });
              (this.galleryIntro = !0),
                this.mmE.on(),
                this.lDown("a"),
                (this.isDezooming = !0),
                (this.curve.targ = 0.8),
                new Y.Delay(function (t) {
                  (a.curve.targ = 0),
                    Y.PE.all(a.dragBg[0]),
                    Y.PE.all(a.dragBg[1]);
                }, 1e3).run(),
                this.dragShow.play({ d: 1500, delay: 800 }),
                this.firstTime &&
                  this.dragSailShow.play({ d: 500, delay: 800 }),
                i.play(),
                t.play({
                  cb: function (t) {
                    (a.galleryIntro = !1), (a.isDezooming = !1);
                  },
                });
            },
          },
          {
            key: "gallHide",
            value: function () {
              var a = this;
              this.mmE.off(), this.lDown("r");
              var t = new Y.M({
                  d: 2e3,
                  e: "io5",
                  update: function (t) {
                    a.isDezooming = !0;
                    for (
                      var i = t.progE,
                        e = Y.Lerp(0, -a.c.introXImpair, i),
                        s = Y.Lerp(0, -a.c.introXPair, i),
                        r = 7;
                      r < a.c.shapeL;
                      r++
                    ) {
                      var n = a.c.shape[r];
                      n.line % 2 == 0
                        ? (n.x = n.xOrigin + e)
                        : (n.x = n.xOrigin + s);
                    }
                  },
                }),
                i = new Y.M({
                  delay: 1e3,
                  d: 800,
                  e: "o3",
                  update: function (t) {
                    a.c.glPageOpacity = t.progE;
                  },
                });
              this.c.scroll.on({ revest: !1 }),
                X.run(this.app),
                Y.PE.none(this.dragBg[0]),
                Y.PE.none(this.dragBg[1]),
                (this.curve.targ = 0.8),
                new Y.Delay(function (t) {
                  a.curve.targ = 0;
                }, 1e3).run(),
                this.c.navLink.show({ d: 1200, delay: 1e3 }),
                this.dragShow.play({ reverse: !0, d: 600, delay: 0 }),
                i.play(),
                t.play({
                  cb: function (t) {
                    a.lCTA("a"),
                      (a.c.galleryIsOn = !1),
                      (a.isDezooming = !1);
                  },
                });
            },
          },
          {
            key: "loop",
            value: function (t) {
              if (
                this.mm.x.currR !== this.mm.x.targ ||
                this.mm.y.currR !== this.mm.y.targ ||
                this.curve.currR !== this.curve.targ ||
                this.isDezooming
              ) {
                (this.c.now = t / 120),
                  this.isDown &&
                    (Math.abs(this.mm.x.curr) > this.jump.x &&
                      this.gJump({ axe: "x", fromLoop: !0 }),
                    Math.abs(this.mm.y.curr) > this.jump.y &&
                      this.gJump({ axe: "y", fromLoop: !0 }));
                var i = this.mm.x.targ - this.mm.x.curr;
                (this.mm.x.curr += 0.06 * i),
                  (this.mm.x.currR = Y.R(this.mm.x.curr)),
                  (this.c.mm.x = this.mm.x.currR);
                var e = this.mm.y.targ - this.mm.y.curr;
                (this.mm.y.curr += 0.06 * e),
                  (this.mm.y.currR = Y.R(this.mm.y.curr)),
                  (this.c.mm.y = this.mm.y.currR);
                var s = this.curve.targ - this.curve.curr;
                (this.curve.curr += 0.09 * s),
                  (this.curve.currR = Y.R(this.curve.curr)),
                  (this.c.curve = -this.curve.currR / 2),
                  (this.c.parallax.x = Y.R(
                    Y.Clamp(i / 13e3, -0.1, 0.1),
                    6
                  )),
                  (this.c.parallax.y = Y.R(
                    Y.Clamp(e / 13e3, -0.1, 0.1),
                    6
                  )),
                  this.c.GL.inside();
              }
            },
          },
          {
            key: "lDown",
            value: function (t) {
              Y.L(document, t, "mousedown", this.down);
            },
          },
          {
            key: "lUp",
            value: function (t) {
              Y.L(document, t, "mouseup", this.up);
            },
          },
          {
            key: "lBack",
            value: function (t) {
              Y.L(document, t, "click", this.back);
            },
          },
          {
            key: "down",
            value: function (t) {
              "nav-drag-bg" === t.target.className
                ? this.firstTime
                  ? this.changeDrag()
                  : this.galleryIntro ||
                    (this.lDown("r"), this.gallHide())
                : (this.firstTime && this.changeDrag(),
                  this.lDown("r"),
                  (this.isDown = !0),
                  (this.start.x = t.pageX),
                  (this.start.y = t.pageY),
                  (this.last.x = this.mm.x.targ),
                  (this.last.y = this.mm.y.targ),
                  (this.curve.targ = 0.8),
                  this.lUp("a"));
            },
          },
          {
            key: "changeDrag",
            value: function () {
              (this.firstTime = !1),
                this.dragSailShow.play({ reverse: !0, d: 500, delay: 0 }),
                this.dragClose.play();
            },
          },
          {
            key: "move",
            value: function (t, i) {
              this.isDown &&
                ((this.mm.x.targ = Y.R(-(t - this.start.x) * this.sensi)),
                (this.mm.y.targ = Y.R(-(i - this.start.y) * this.sensi)));
            },
          },
          {
            key: "up",
            value: function (t) {
              this.lUp("r"),
                (this.isDown = !1),
                Math.abs(this.mm.x.targ - this.last.x) < 3 &&
                Math.abs(this.mm.y.targ - this.last.y) < 3 &&
                !this.isDezooming
                  ? this.upClick(t)
                  : this.upCenter();
            },
          },
          {
            key: "upClick",
            value: function (t) {
              for (
                var r = this, i = t.pageX, e = t.pageY, s = -1, n = 7;
                n < this.c.shapeL;
                n++
              ) {
                var a = this.c.shape[n];
                if (!a.isOut) {
                  var o = i >= a.x && i <= a.x + a.w,
                    h = e >= a.y && e <= a.y + a.h;
                  if (o && h) {
                    s = n;
                    break;
                  }
                }
              }
              if (-1 === s)
                return (this.curve.targ = 0), void this.lDown("a");
              (this.c.isZoomed = !0), (this.c.lastToRender = s);
              var l = this.c.shape[s],
                c = l.zoom.x,
                u = l.zoom.y,
                f = l.zoom.w,
                d = l.zoom.h,
                p = -l.x,
                v = -l.y,
                y = this.c.win.w - l.w,
                g = this.c.win.h - l.h;
              this.wave.curr = 0;
              var m = this.wave.start,
                w = this.wave.end,
                x = this.scale.start,
                b = this.scale.end;
              this.zoom = new Y.M({
                d: 1500,
                e: "linear",
                update: function (t) {
                  var i = r.ease(t.progE),
                    e = 2 * i,
                    s = r.c.shape[r.c.lastToRender];
                  (s.zoom.x = Y.Lerp(c, p, i)),
                    (s.zoom.y = Y.Lerp(u, v, i)),
                    (s.zoom.w = Y.Lerp(f, y, i)),
                    (s.zoom.h = Y.Lerp(d, g, i)),
                    (r.wave.curr =
                      i < 0.5 ? Y.Lerp(m, w, e) : Y.Lerp(w, m, e - 1)),
                    (s.wave = r.wave.curr),
                    (r.scale.curr = Y.Lerp(x, b, i)),
                    (s.scale = r.scale.curr),
                    (r.curve.targ = Y.Lerp(0.8, 0, i));
                },
              });
              var k = this.c.data.caption[l.imgNo];
              (this.caption0[0].textContent = k.n + "° N,"),
                (this.caption0[1].textContent = k.w + "° W"),
                (this.caption1.textContent = k.txt),
                Y.PE.none(this.dragBg[0]),
                Y.PE.none(this.dragBg[1]),
                this.dragShow.play({ reverse: !0, d: 500, delay: 0 }),
                this.zoom.play(),
                this.captionShow.play({ d: 700, delay: 750 }),
                new Y.Delay(function (t) {
                  r.lBack("a");
                }, 400).run();
            },
          },
          {
            key: "back",
            value: function () {
              var r = this;
              this.lBack("r"),
                this.zoom.pause(),
                (this.isDezooming = !0),
                (this.c.isZoomed = !1);
              var t = this.c.lastToRender,
                i = this.c.shape[t],
                n = i.zoom.x,
                a = i.zoom.y,
                o = i.zoom.w,
                h = i.zoom.h,
                l = this.wave.start,
                c = this.wave.end,
                u = this.scale.curr,
                f = this.scale.start,
                e = new Y.M({
                  d: 1200,
                  e: "linear",
                  update: function (t) {
                    var i = r.ease(t.progE),
                      e = 2 * i,
                      s = r.c.shape[r.c.lastToRender];
                    (s.zoom.x = Y.Lerp(n, 0, i)),
                      (s.zoom.y = Y.Lerp(a, 0, i)),
                      (s.zoom.w = Y.Lerp(o, 0, i)),
                      (s.zoom.h = Y.Lerp(h, 0, i)),
                      (s.wave =
                        i < 0.5
                          ? Y.Lerp(r.wave.curr, c, e)
                          : Y.Lerp(c, l, e - 1)),
                      (s.scale = Y.Lerp(u, f, i));
                  },
                  cb: function (t) {
                    r.isDezooming = !1;
                  },
                });
              (this.curve.targ = 0),
                new Y.Delay(function (t) {
                  Y.PE.all(r.dragBg[0]), Y.PE.all(r.dragBg[1]);
                }, 500).run(),
                this.captionShow.play({ reverse: !0, d: 400, delay: 0 }),
                this.dragShow.play({ d: 500, delay: 500 }),
                e.play(),
                this.lDown("a");
            },
          },
          {
            key: "upCenter",
            value: function () {
              this.lDown("a"), (this.curve.targ = 0);
              var t = Math.abs(this.mm.x.targ) > this.jump.x / 2;
              Math.abs(this.mm.y.targ) > this.jump.y / 2
                ? this.gJump({ axe: "y", fromLoop: !1 })
                : t && this.gJump({ axe: "x", fromLoop: !1 }),
                (this.mm.x.targ = 0),
                (this.mm.y.targ = 0);
            },
          },
          {
            key: "gJump",
            value: function (t) {
              var i,
                e = t.axe,
                s = t.fromLoop;
              if (
                ((i = s
                  ? this.mm.x.targ > this.mm.x.curr
                    ? -1
                    : 1
                  : 0 < this.mm.x.targ
                  ? -1
                  : 1),
                "x" === e)
              ) {
                var r = i * this.jump.x;
                (this.mm.x.curr += r),
                  (this.mm.x.currR += r),
                  s &&
                    ((this.mm.x.targ += r),
                    (this.start.x += r / this.sensi));
                var n = this.c.lastToRender,
                  a = Y.Clamp(n - 7 + i, 0, 26) + 7,
                  o = this.c.shape[n],
                  h = this.c.shape[a];
                (h.zoom = o.zoom),
                  (h.wave = o.wave),
                  (h.scale = o.scale),
                  (o.zoom = { x: 0, y: 0, w: 0, h: 0 }),
                  (o.wave = 0),
                  (o.scale = this.c.scale),
                  (this.c.lastToRender = a),
                  (this.c.no.col -= i),
                  this.c.GL.imgNo();
              } else {
                var l,
                  c =
                    (l = s
                      ? this.mm.y.targ > this.mm.y.curr
                        ? -1
                        : 1
                      : 0 < this.mm.y.targ
                      ? -1
                      : 1) * this.jump.y,
                  u = 0.5 * i * this.jump.x;
                (this.mm.y.curr += c),
                  (this.mm.y.currR += c),
                  (this.mm.x.curr += u),
                  (this.mm.x.currR += u),
                  s &&
                    ((this.mm.y.targ += c),
                    (this.start.y += c / this.sensi),
                    (this.mm.x.targ += u),
                    (this.start.x += u / this.sensi));
                var f,
                  d = this.c.lastToRender;
                1 === l && -1 === i
                  ? (f = 5)
                  : -1 === l && 1 === i
                  ? (f = -5)
                  : -1 === l && -1 === i
                  ? (f = -6)
                  : 1 === l && 1 === i && (f = 6);
                var p = Y.Clamp(d - 7 + f, 0, 26) + 7,
                  v = this.c.shape[d],
                  y = this.c.shape[p];
                (y.zoom = v.zoom),
                  (y.wave = v.wave),
                  (y.scale = v.scale),
                  (v.zoom = { x: 0, y: 0, w: 0, h: 0 }),
                  (v.wave = 0),
                  (v.scale = this.c.scale),
                  (this.c.lastToRender = p),
                  (this.c.no.line += 2 * l),
                  1 === i && 1 === l
                    ? (this.c.no.col -= i)
                    : -1 === l && -1 === i && (this.c.no.col -= i),
                  this.c.GL.imgNo();
              }
            },
          },
        ]),
        t
      );
    })())(),
    N = (function () {
      function s() {
        a(this, s),
          (this.c = _C),
          (this.scrollIsVisible = !0),
          (this.dodecaWrap = Y.G.id("nav-dodeca-wrap"));
        var t = Y.G.id("n-br-scroll"),
          i = Y.G.id("nav-arrow"),
          e = Y.G.class("nav-dodeca-poly");
        (this.sHide = new Y.TL()),
          this.sHide.from({
            el: t,
            p: { y: [0, 105] },
            d: 1800,
            e: "o6",
          }),
          this.sHide.from({
            el: i,
            p: { y: [0, 105] },
            d: 1800,
            e: "o6",
          }),
          (this.sHide2 = new Y.M({
            el: e[2],
            line: { elWL: e[0], start: 100, end: 0 },
            d: 1800,
            e: "o4",
          }));
      }
      return (
        o(s, [
          {
            key: "hide",
            value: function () {
              (this.scrollIsVisible = !1),
                Y.PE.none(this.dodecaWrap),
                this.sHide.play(),
                this.sHide2.play();
            },
          },
          {
            key: "isVisible",
            value: function () {
              return this.scrollIsVisible;
            },
          },
        ]),
        s
      );
    })(),
    U = (function () {
      function n() {
        a(this, n), (this.c = _C);
        var t = Y.G.class("nav-link"),
          i = Y.G.id("nav-logo"),
          e = Y.G.id("nav-date");
        this.sail = Y.G.id("sail");
        var s = Y.G.id("h1"),
          r = Y.G.id("nav-prog-w");
        (this.hide0 = new Y.M({
          el: t[0],
          p: { y: [0, -100] },
          d: 10,
          e: "o6",
        })),
          (this.show1 = new Y.M({
            el: t[1],
            p: { y: [-100, 0] },
            d: 10,
            e: "o6",
          })),
          (this.show2 = new Y.M({
            el: t[2],
            p: { y: [-100, 0] },
            d: 10,
            e: "o6",
          })),
          (this.show3 = new Y.M({
            el: t[3],
            p: { y: [-100, 0] },
            d: 10,
            e: "o6",
          })),
          (this.hideLogo = new Y.M({
            el: i,
            p: { x: [0, -100] },
            d: 10,
            e: "o6",
          })),
          (this.hideDate = new Y.M({
            el: e,
            p: { x: [0, 100] },
            d: 10,
            e: "o6",
          })),
          (this.hideProg = new Y.M({
            el: r,
            p: { x: [0, -102] },
            d: 10,
            e: "o6",
          })),
          (this.showSail = new Y.M({
            el: this.sail,
            p: { opacity: [0, 1] },
            d: 10,
            e: "o6",
          })),
          (this.h1Hide = new Y.M({
            el: s,
            p: { opacity: [1, 0] },
            d: 10,
            e: "o3",
          }));
      }
      return (
        o(n, [
          {
            key: "intro",
            value: function (t) {
              var i = t.delay;
              this.show1.play({ d: t.d, delay: i }),
                this.show2.play({ d: t.d, delay: i + 100 }),
                this.show3.play({ d: t.d, delay: i + 200 });
            },
          },
          {
            key: "hide",
            value: function (t) {
              Y.PE.all(this.sail),
                this.hide0.play({ d: t.d, delay: 0 }),
                this.show1.play({ reverse: !0, d: t.d, delay: 0 }),
                this.show2.play({ reverse: !0, d: t.d, delay: 0 }),
                this.show3.play({ reverse: !0, d: t.d, delay: 0 }),
                this.hideLogo.play({ d: t.d, delay: 0 }),
                this.hideDate.play({ d: t.d, delay: 0 }),
                this.showSail.play({ d: t.d, delay: 0 }),
                this.hideProg.play({ d: t.d, delay: 0 }),
                this.h1Hide.play({ d: 600, delay: 0 });
            },
          },
          {
            key: "show",
            value: function (t) {
              var i = t.delay;
              Y.PE.none(this.sail),
                this.hide0.play({ reverse: !0, d: t.d, delay: i }),
                this.show1.play({ d: t.d, delay: i }),
                this.show2.play({ d: t.d, delay: i + 100 }),
                this.show3.play({ d: t.d, delay: i + 200 }),
                this.hideLogo.play({ reverse: !0, d: t.d, delay: i }),
                this.hideDate.play({ reverse: !0, d: t.d, delay: i }),
                this.showSail.play({ reverse: !0, d: t.d, delay: i }),
                this.hideProg.play({ reverse: !0, d: t.d, delay: i }),
                this.h1Hide.play({ reverse: !0, d: t.d, delay: i });
            },
          },
        ]),
        n
      );
    })(),
    j = (function () {
      function t() {
        a(this, t),
          (this.c = _C),
          Y.BM(this, ["resize", "loop"]),
          (this.ro = new Y.RO({ cb: this.resize, throttleDelay: 100 })),
          (this.c.scroll = new G()),
          (this.raf = new Y.Raf(this.loop)),
          (this.c.scrollHero = new N()),
          (this.c.navLink = new U());
      }
      return (
        o(t, [
          {
            key: "init",
            value: function () {
              this.c.scroll.init(),
                M.init(),
                F.init(),
                this.resize(),
                this.ro.on();
            },
          },
          {
            key: "resize",
            value: function () {
              this.c.scroll.resize(), this.c.GL.resize(), F.resize();
            },
          },
          {
            key: "on",
            value: function () {
              this.raf.run(),
                M.on(),
                this.c.scroll.on({ reset: !0 }),
                D.on(),
                F.on();
            },
          },
          {
            key: "loop",
            value: function (t) {
              this.c.scroll.loop(), F.loop(t);
            },
          },
        ]),
        t
      );
    })(),
    V = new ((function () {
      function t() {
        a(this, t), Y.BM(this, ["click"]);
      }
      return (
        o(t, [
          {
            key: "init",
            value: function (t) {
              (this.sTop = Y.G.id("footer-top")),
                (this.page = Y.G.class("page")[0]);
            },
          },
          {
            key: "resize",
            value: function () {
              this.h = this.page.offsetHeight;
            },
          },
          {
            key: "on",
            value: function () {
              this.l("a");
            },
          },
          {
            key: "off",
            value: function () {
              this.l("r");
            },
          },
          {
            key: "l",
            value: function (t) {
              Y.L(this.sTop, t, "click", this.click);
            },
          },
          {
            key: "click",
            value: function () {
              Y.STop({ h: this.h });
            },
          },
        ]),
        t
      );
    })())(),
    J = (function () {
      function t() {
        a(this, t),
          (this.c = _C),
          Y.BM(this, ["resize"]),
          (this.ro = new Y.RO({ cb: this.resize, throttleDelay: 100 }));
      }
      return (
        o(t, [
          {
            key: "init",
            value: function () {
              V.init(), this.resize(), this.ro.on();
            },
          },
          {
            key: "resize",
            value: function () {
              V.resize();
            },
          },
          {
            key: "on",
            value: function () {
              V.on(), D.on();
            },
          },
          {
            key: "off",
            value: function () {
              this.ro.off(), V.off(), D.off();
            },
          },
        ]),
        t
      );
    })();
  new (function t() {
    a(this, t),
      new n(),
      "serviceWorker" in navigator &&
        navigator.serviceWorker.register("/sw.js");
    var i = _C;
    i.is404 ||
      (i.isMobile && Y.TopRefresh(),
      i.isD ? (i.listener = new j()) : (i.listener = new J()),
      i.isD &&
        ((i.data = v), new l(), (i.GLCore = new w()), (i.GL = new b())),
      new e());
  })();
})();
