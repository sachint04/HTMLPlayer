(function() {
    /*
     Copyright 2015 Google Inc.

     Swiffy runtime version v7.3.0

     In addition to the Google Terms of Service (http://www.google.com/accounts/TOS),
     Google grants you and the Google Swiffy end users a personal, worldwide,
     royalty-free, non-assignable and non-exclusive license to use the Google Swiffy
     runtime to host it for Google Swiffy end users and to use it in connection with
     the Google Swiffy service.
    */
    var g;
    var aa = this,
        l = function(a) {
            return void 0 !== a
        },
        ba = function() {},
        ca = function(a) {
            var b = typeof a;
            if ("object" == b)
                if (a) {
                    if (a instanceof Array) return "array";
                    if (a instanceof Object) return b;
                    var c = Object.prototype.toString.call(a);
                    if ("[object Window]" == c) return "object";
                    if ("[object Array]" == c || "number" == typeof a.length && "undefined" != typeof a.splice && "undefined" != typeof a.propertyIsEnumerable && !a.propertyIsEnumerable("splice")) return "array";
                    if ("[object Function]" == c || "undefined" != typeof a.call && "undefined" != typeof a.propertyIsEnumerable &&
                        !a.propertyIsEnumerable("call")) return "function"
                } else return "null";
            else if ("function" == b && "undefined" == typeof a.call) return "object";
            return b
        },
        da = function(a) {
            return "array" == ca(a)
        },
        ea = function(a) {
            var b = ca(a);
            return "array" == b || "object" == b && "number" == typeof a.length
        },
        fa = function(a) {
            return "string" == typeof a
        },
        ga = function(a) {
            return "boolean" == typeof a
        },
        ha = function(a) {
            return "number" == typeof a
        },
        ia = function(a) {
            return "function" == ca(a)
        },
        ja = function(a) {
            var b = typeof a;
            return "object" == b && null != a || "function" == b
        },
        ka = function(a, b, c) {
            return a.call.apply(a.bind, arguments)
        },
        la = function(a, b, c) {
            if (!a) throw Error();
            if (2 < arguments.length) {
                var d = Array.prototype.slice.call(arguments, 2);
                return function() {
                    var c = Array.prototype.slice.call(arguments);
                    Array.prototype.unshift.apply(c, d);
                    return a.apply(b, c)
                }
            }
            return function() {
                return a.apply(b, arguments)
            }
        },
        ma = function(a, b, c) {
            ma = Function.prototype.bind && -1 != Function.prototype.bind.toString().indexOf("native code") ? ka : la;
            return ma.apply(null, arguments)
        },
        na = Date.now || function() {
            return +new Date
        },
        m = function(a, b) {
            function c() {}
            c.prototype = b.prototype;
            a.U = b.prototype;
            a.prototype = new c;
            a.prototype.constructor = a;
            a.Sg = function(a, c, f) {
                for (var h = Array(arguments.length - 2), k = 2; k < arguments.length; k++) h[k - 2] = arguments[k];
                return b.prototype[c].apply(a, h)
            }
        };
    Object.defineProperty && !Object.defineProperties && (Object.defineProperties = function(a, b) {
        for (var c in b) Object.defineProperty(a, c, b[c]);
        return a
    });
    "Uint32Array" in window || (window.Uint32Array = Array);
    "Uint8Array" in window || (window.Uint8Array = Array);
    "Float32Array" in window || (window.Float32Array = Array);
    var oa = String.prototype.trim ? function(a) {
            return a.trim()
        } : function(a) {
            return a.replace(/^[\s\xa0]+|[\s\xa0]+$/g, "")
        },
        wa = function(a, b) {
            if (b) a = a.replace(pa, "&amp;").replace(qa, "&lt;").replace(ra, "&gt;").replace(sa, "&quot;").replace(ta, "&#39;").replace(ua, "&#0;");
            else {
                if (!va.test(a)) return a; - 1 != a.indexOf("&") && (a = a.replace(pa, "&amp;")); - 1 != a.indexOf("<") && (a = a.replace(qa, "&lt;")); - 1 != a.indexOf(">") && (a = a.replace(ra, "&gt;")); - 1 != a.indexOf('"') && (a = a.replace(sa, "&quot;")); - 1 != a.indexOf("'") && (a = a.replace(ta,
                    "&#39;")); - 1 != a.indexOf("\x00") && (a = a.replace(ua, "&#0;"))
            }
            return a
        },
        pa = /&/g,
        qa = /</g,
        ra = />/g,
        sa = /"/g,
        ta = /'/g,
        ua = /\x00/g,
        va = /[\x00&<>"']/,
        xa = {
            "\x00": "\\0",
            "\b": "\\b",
            "\f": "\\f",
            "\n": "\\n",
            "\r": "\\r",
            "\t": "\\t",
            "\x0B": "\\x0B",
            '"': '\\"',
            "\\": "\\\\"
        },
        ya = {
            "'": "\\'"
        },
        za = function(a) {
            a = String(a);
            if (a.quote) return a.quote();
            for (var b = ['"'], c = 0; c < a.length; c++) {
                var d = a.charAt(c),
                    e = d.charCodeAt(0),
                    f = c + 1,
                    h;
                if (!(h = xa[d])) {
                    if (!(31 < e && 127 > e))
                        if (d in ya) d = ya[d];
                        else if (d in xa) d = ya[d] = xa[d];
                    else {
                        e = d;
                        h = d.charCodeAt(0);
                        if (31 < h && 127 > h) e = d;
                        else {
                            if (256 > h) {
                                if (e = "\\x", 16 > h || 256 < h) e += "0"
                            } else e = "\\u", 4096 > h && (e += "0");
                            e += h.toString(16).toUpperCase()
                        }
                        d = ya[d] = e
                    }
                    h = d
                }
                b[f] = h
            }
            b.push('"');
            return b.join("")
        },
        Aa = function(a, b) {
            return a < b ? -1 : a > b ? 1 : 0
        };
    var Ba = Array.prototype,
        Ca = Ba.indexOf ? function(a, b, c) {
            return Ba.indexOf.call(a, b, c)
        } : function(a, b, c) {
            c = null == c ? 0 : 0 > c ? Math.max(0, a.length + c) : c;
            if (fa(a)) return fa(b) && 1 == b.length ? a.indexOf(b, c) : -1;
            for (; c < a.length; c++)
                if (c in a && a[c] === b) return c;
            return -1
        },
        Da = function(a, b) {
            var c = Ca(a, b),
                d;
            (d = 0 <= c) && Ba.splice.call(a, c, 1);
            return d
        },
        Ea = function(a, b, c) {
            a: {
                for (var d = a.length, e = fa(a) ? a.split("") : a, f = 0; f < d; f++)
                    if (f in e && b.call(c, e[f], f, a)) {
                        b = f;
                        break a
                    }
                b = -1
            }
            return 0 <= b ? (Ba.splice.call(a, b, 1), !0) : !1
        },
        Fa = function(a) {
            return Ba.concat.apply(Ba,
                arguments)
        },
        Ga = function(a, b, c) {
            return 2 >= arguments.length ? Ba.slice.call(a, b) : Ba.slice.call(a, b, c)
        },
        Ia = function(a, b, c) {
            c = c || Ha;
            for (var d = 0, e = a.length, f; d < e;) {
                var h = d + e >> 1,
                    k;
                k = c(b, a[h]);
                0 < k ? d = h + 1 : (e = h, f = !k)
            }
            return f ? d : ~d
        },
        Ka = function(a, b, c) {
            if (!ea(a) || !ea(b) || a.length != b.length) return !1;
            var d = a.length;
            c = c || Ja;
            for (var e = 0; e < d; e++)
                if (!c(a[e], b[e])) return !1;
            return !0
        },
        Ha = function(a, b) {
            return a > b ? 1 : a < b ? -1 : 0
        },
        Ja = function(a, b) {
            return a === b
        };
    var La = function(a, b, c) {
            for (var d in a) b.call(c, a[d], d, a)
        },
        Ma = function(a) {
            var b = ca(a);
            if ("object" == b || "array" == b) {
                if (a.clone) return a.clone();
                var b = "array" == b ? [] : {},
                    c;
                for (c in a) b[c] = Ma(a[c]);
                return b
            }
            return a
        },
        Na = "constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(" "),
        Oa = function(a, b) {
            for (var c, d, e = 1; e < arguments.length; e++) {
                d = arguments[e];
                for (c in d) a[c] = d[c];
                for (var f = 0; f < Na.length; f++) c = Na[f], Object.prototype.hasOwnProperty.call(d, c) && (a[c] = d[c])
            }
        },
        Pa = function(a) {
            var b = arguments.length;
            if (1 == b && da(arguments[0])) return Pa.apply(null, arguments[0]);
            for (var c = {}, d = 0; d < b; d++) c[arguments[d]] = !0;
            return c
        };
    Pa("area base br col command embed hr img input keygen link meta param source track wbr".split(" "));
    var Qa;
    a: {
        var Ra = aa.navigator;
        if (Ra) {
            var Sa = Ra.userAgent;
            if (Sa) {
                Qa = Sa;
                break a
            }
        }
        Qa = ""
    }
    var Ta = function(a) {
        return -1 != Qa.indexOf(a)
    };
    var Ua = function() {
            return Ta("Opera") || Ta("OPR")
        },
        Va = function() {
            return (Ta("Chrome") || Ta("CriOS")) && !Ua() && !Ta("Edge")
        };
    var Wa = Ua(),
        Xa = Ta("Trident") || Ta("MSIE"),
        Ya = Ta("Edge"),
        Za = Ta("Gecko") && !(-1 != Qa.toLowerCase().indexOf("webkit") && !Ta("Edge")) && !(Ta("Trident") || Ta("MSIE")) && !Ta("Edge"),
        $a = -1 != Qa.toLowerCase().indexOf("webkit") && !Ta("Edge"),
        ab = Ta("Macintosh"),
        bb = Ta("Linux") || Ta("CrOS"),
        cb = function() {
            var a = Qa;
            if (Za) return /rv\:([^\);]+)(\)|;)/.exec(a);
            if (Ya) return /Edge\/([\d\.]+)/.exec(a);
            if (Xa) return /\b(?:MSIE|rv)[: ]([^\);]+)(\)|;)/.exec(a);
            if ($a) return /WebKit\/(\S+)/.exec(a)
        },
        db = function() {
            var a = aa.document;
            return a ?
                a.documentMode : void 0
        },
        eb = function() {
            if (Wa && aa.opera) {
                var a = aa.opera.version;
                return ia(a) ? a() : a
            }
            var a = "",
                b = cb();
            b && (a = b ? b[1] : "");
            return Xa && (b = db(), b > parseFloat(a)) ? String(b) : a
        }(),
        fb = {},
        gb = function(a) {
            var b;
            if (!(b = fb[a])) {
                b = 0;
                for (var c = oa(String(eb)).split("."), d = oa(String(a)).split("."), e = Math.max(c.length, d.length), f = 0; 0 == b && f < e; f++) {
                    var h = c[f] || "",
                        k = d[f] || "",
                        n = RegExp("(\\d*)(\\D*)", "g"),
                        q = RegExp("(\\d*)(\\D*)", "g");
                    do {
                        var u = n.exec(h) || ["", "", ""],
                            p = q.exec(k) || ["", "", ""];
                        if (0 == u[0].length && 0 == p[0].length) break;
                        b = Aa(0 == u[1].length ? 0 : parseInt(u[1], 10), 0 == p[1].length ? 0 : parseInt(p[1], 10)) || Aa(0 == u[2].length, 0 == p[2].length) || Aa(u[2], p[2])
                    } while (0 == b)
                }
                b = fb[a] = 0 <= b
            }
            return b
        },
        hb = aa.document,
        ib = hb && Xa ? db() || ("CSS1Compat" == hb.compatMode ? parseInt(eb, 10) : 5) : void 0;
    !Za && !Xa || Xa && 9 <= ib || Za && gb("1.9.1");
    Xa && gb("9");
    var jb = function(a) {
        jb[" "](a);
        return a
    };
    jb[" "] = ba;
    var kb = !Xa || 9 <= ib,
        lb = Xa && !gb("9");
    !$a || gb("528");
    Za && gb("1.9b") || Xa && gb("8") || Wa && gb("9.5") || $a && gb("528");
    Za && !gb("8") || Xa && gb("9");
    var mb = function() {
        this.Ui = this.Ui;
        this.Vj = this.Vj
    };
    mb.prototype.Ui = !1;
    mb.prototype.il = function() {
        this.Ui || (this.Ui = !0, this.oh())
    };
    mb.prototype.oh = function() {
        if (this.Vj)
            for (; this.Vj.length;) this.Vj.shift()()
    };
    var nb = function(a, b) {
        this.type = a;
        this.currentTarget = this.target = b;
        this.defaultPrevented = this.$e = !1;
        this.Hr = !0
    };
    nb.prototype.stopPropagation = function() {
        this.$e = !0
    };
    nb.prototype.preventDefault = function() {
        this.defaultPrevented = !0;
        this.Hr = !1
    };
    var ob = function(a, b) {
        nb.call(this, a ? a.type : "");
        this.relatedTarget = this.currentTarget = this.target = null;
        this.charCode = this.keyCode = this.button = this.screenY = this.screenX = this.clientY = this.clientX = this.offsetY = this.offsetX = 0;
        this.metaKey = this.shiftKey = this.altKey = this.ctrlKey = !1;
        this.Tb = this.state = null;
        a && this.init(a, b)
    };
    m(ob, nb);
    ob.prototype.init = function(a, b) {
        var c = this.type = a.type;
        this.target = a.target || a.srcElement;
        this.currentTarget = b;
        var d = a.relatedTarget;
        if (d) {
            if (Za) {
                var e;
                a: {
                    try {
                        jb(d.nodeName);
                        e = !0;
                        break a
                    } catch (f) {}
                    e = !1
                }
                e || (d = null)
            }
        } else "mouseover" == c ? d = a.fromElement : "mouseout" == c && (d = a.toElement);
        this.relatedTarget = d;
        this.offsetX = $a || void 0 !== a.offsetX ? a.offsetX : a.layerX;
        this.offsetY = $a || void 0 !== a.offsetY ? a.offsetY : a.layerY;
        this.clientX = void 0 !== a.clientX ? a.clientX : a.pageX;
        this.clientY = void 0 !== a.clientY ? a.clientY :
            a.pageY;
        this.screenX = a.screenX || 0;
        this.screenY = a.screenY || 0;
        this.button = a.button;
        this.keyCode = a.keyCode || 0;
        this.charCode = a.charCode || ("keypress" == c ? a.keyCode : 0);
        this.ctrlKey = a.ctrlKey;
        this.altKey = a.altKey;
        this.shiftKey = a.shiftKey;
        this.metaKey = a.metaKey;
        this.state = a.state;
        this.Tb = a;
        a.defaultPrevented && this.preventDefault()
    };
    ob.prototype.stopPropagation = function() {
        ob.U.stopPropagation.call(this);
        this.Tb.stopPropagation ? this.Tb.stopPropagation() : this.Tb.cancelBubble = !0
    };
    ob.prototype.preventDefault = function() {
        ob.U.preventDefault.call(this);
        var a = this.Tb;
        if (a.preventDefault) a.preventDefault();
        else if (a.returnValue = !1, lb) try {
            if (a.ctrlKey || 112 <= a.keyCode && 123 >= a.keyCode) a.keyCode = -1
        } catch (b) {}
    };
    var pb = "closure_listenable_" + (1E6 * Math.random() | 0),
        qb = function(a) {
            return !(!a || !a[pb])
        },
        rb = 0;
    var sb = function(a, b, c, d, e, f) {
        this.listener = a;
        this.ak = b;
        this.src = c;
        this.type = d;
        this.Di = !!e;
        this.Qe = f;
        this.key = ++rb;
        this.qg = this.Bi = !1
    };
    sb.prototype.Oj = function() {
        this.qg = !0;
        this.Qe = this.src = this.ak = this.listener = null
    };
    var tb = function(a) {
        this.src = a;
        this.hb = {};
        this.gi = 0
    };
    g = tb.prototype;
    g.add = function(a, b, c, d, e) {
        var f = a.toString();
        a = this.hb[f];
        a || (a = this.hb[f] = [], this.gi++);
        var h = ub(a, b, d, e); - 1 < h ? (b = a[h], c || (b.Bi = !1)) : (b = new sb(b, null, this.src, f, !!d, e), b.Bi = c, a.push(b));
        return b
    };
    g.remove = function(a, b, c, d) {
        a = a.toString();
        if (!(a in this.hb)) return !1;
        var e = this.hb[a];
        b = ub(e, b, c, d);
        return -1 < b ? (e[b].Oj(), Ba.splice.call(e, b, 1), 0 == e.length && (delete this.hb[a], this.gi--), !0) : !1
    };
    g.tr = function(a) {
        var b = a.type;
        if (!(b in this.hb)) return !1;
        var c = Da(this.hb[b], a);
        c && (a.Oj(), 0 == this.hb[b].length && (delete this.hb[b], this.gi--));
        return c
    };
    g.gx = function(a) {
        a = a && a.toString();
        var b = 0,
            c;
        for (c in this.hb)
            if (!a || c == a) {
                for (var d = this.hb[c], e = 0; e < d.length; e++) ++b, d[e].Oj();
                delete this.hb[c];
                this.gi--
            }
        return b
    };
    g.Cl = function(a, b, c, d) {
        a = this.hb[a.toString()];
        var e = -1;
        a && (e = ub(a, b, c, d));
        return -1 < e ? a[e] : null
    };
    var ub = function(a, b, c, d) {
        for (var e = 0; e < a.length; ++e) {
            var f = a[e];
            if (!f.qg && f.listener == b && f.Di == !!c && f.Qe == d) return e
        }
        return -1
    };
    var vb = "closure_lm_" + (1E6 * Math.random() | 0),
        wb = {},
        xb = 0,
        yb = function(a, b, c, d, e) {
            if (da(b)) {
                for (var f = 0; f < b.length; f++) yb(a, b[f], c, d, e);
                return null
            }
            c = zb(c);
            return qb(a) ? a.gw(b, c, d, e) : Ab(a, b, c, !1, d, e)
        },
        Ab = function(a, b, c, d, e, f) {
            if (!b) throw Error("Invalid event type");
            var h = !!e,
                k = Bb(a);
            k || (a[vb] = k = new tb(a));
            c = k.add(b, c, d, e, f);
            if (c.ak) return c;
            d = Cb();
            c.ak = d;
            d.src = a;
            d.listener = c;
            if (a.addEventListener) a.addEventListener(b.toString(), d, h);
            else if (a.attachEvent) a.attachEvent(Db(b.toString()), d);
            else throw Error("addEventListener and attachEvent are unavailable.");
            xb++;
            return c
        },
        Cb = function() {
            var a = Eb,
                b = kb ? function(c) {
                    return a.call(b.src, b.listener, c)
                } : function(c) {
                    c = a.call(b.src, b.listener, c);
                    if (!c) return c
                };
            return b
        },
        Fb = function(a, b, c, d, e) {
            if (da(b)) {
                for (var f = 0; f < b.length; f++) Fb(a, b[f], c, d, e);
                return null
            }
            c = zb(c);
            return qb(a) ? a.hw(b, c, d, e) : Ab(a, b, c, !0, d, e)
        },
        Gb = function(a, b, c, d, e) {
            if (da(b)) {
                for (var f = 0; f < b.length; f++) Gb(a, b[f], c, d, e);
                return null
            }
            c = zb(c);
            if (qb(a)) return a.ay(b, c, d, e);
            if (!a) return !1;
            if (a = Bb(a))
                if (b = a.Cl(b, c, !!d, e)) return Hb(b);
            return !1
        },
        Hb = function(a) {
            if (ha(a) ||
                !a || a.qg) return !1;
            var b = a.src;
            if (qb(b)) return b.Gs(a);
            var c = a.type,
                d = a.ak;
            b.removeEventListener ? b.removeEventListener(c, d, a.Di) : b.detachEvent && b.detachEvent(Db(c), d);
            xb--;
            (c = Bb(b)) ? (c.tr(a), 0 == c.gi && (c.src = null, b[vb] = null)) : a.Oj();
            return !0
        },
        Ib = function(a, b) {
            if (!a) return 0;
            if (qb(a)) return a.qr(b);
            var c = Bb(a);
            if (!c) return 0;
            var d = 0,
                e = b && b.toString(),
                f;
            for (f in c.hb)
                if (!e || f == e)
                    for (var h = c.hb[f].concat(), k = 0; k < h.length; ++k) Hb(h[k]) && ++d;
            return d
        },
        Db = function(a) {
            return a in wb ? wb[a] : wb[a] = "on" + a
        },
        Kb =
        function(a, b, c, d) {
            var e = !0;
            if (a = Bb(a))
                if (b = a.hb[b.toString()])
                    for (b = b.concat(), a = 0; a < b.length; a++) {
                        var f = b[a];
                        f && f.Di == c && !f.qg && (f = Jb(f, d), e = e && !1 !== f)
                    }
                return e
        },
        Jb = function(a, b) {
            var c = a.listener,
                d = a.Qe || a.src;
            a.Bi && Hb(a);
            return c.call(d, b)
        },
        Eb = function(a, b) {
            if (a.qg) return !0;
            if (!kb) {
                var c;
                if (!(c = b)) a: {
                    c = ["window", "event"];
                    for (var d = aa, e; e = c.shift();)
                        if (null != d[e]) d = d[e];
                        else {
                            c = null;
                            break a
                        }
                    c = d
                }
                e = c;
                c = new ob(e, this);
                d = !0;
                if (!(0 > e.keyCode || void 0 != e.returnValue)) {
                    a: {
                        var f = !1;
                        if (0 == e.keyCode) try {
                            e.keyCode = -1;
                            break a
                        } catch (h) {
                            f = !0
                        }
                        if (f || void 0 == e.returnValue) e.returnValue = !0
                    }
                    e = [];
                    for (f = c.currentTarget; f; f = f.parentNode) e.push(f);
                    for (var f = a.type, k = e.length - 1; !c.$e && 0 <= k; k--) {
                        c.currentTarget = e[k];
                        var n = Kb(e[k], f, !0, c),
                            d = d && n
                    }
                    for (k = 0; !c.$e && k < e.length; k++) c.currentTarget = e[k],
                    n = Kb(e[k], f, !1, c),
                    d = d && n
                }
                return d
            }
            return Jb(a, new ob(b, this))
        },
        Bb = function(a) {
            a = a[vb];
            return a instanceof tb ? a : null
        },
        Lb = "__closure_events_fn_" + (1E9 * Math.random() >>> 0),
        zb = function(a) {
            if (ia(a)) return a;
            a[Lb] || (a[Lb] = function(b) {
                return a.handleEvent(b)
            });
            return a[Lb]
        };
    var Mb = function() {
        mb.call(this);
        this.Ld = new tb(this);
        this.et = this;
        this.zm = null
    };
    m(Mb, mb);
    Mb.prototype[pb] = !0;
    g = Mb.prototype;
    g.addEventListener = function(a, b, c, d) {
        yb(this, a, b, c, d)
    };
    g.removeEventListener = function(a, b, c, d) {
        Gb(this, a, b, c, d)
    };
    g.dispatchEvent = function(a) {
        var b, c = this.zm;
        if (c)
            for (b = []; c; c = c.zm) b.push(c);
        var c = this.et,
            d = a.type || a;
        if (fa(a)) a = new nb(a, c);
        else if (a instanceof nb) a.target = a.target || c;
        else {
            var e = a;
            a = new nb(d, c);
            Oa(a, e)
        }
        var e = !0,
            f;
        if (b)
            for (var h = b.length - 1; !a.$e && 0 <= h; h--) f = a.currentTarget = b[h], e = f.ej(d, !0, a) && e;
        a.$e || (f = a.currentTarget = c, e = f.ej(d, !0, a) && e, a.$e || (e = f.ej(d, !1, a) && e));
        if (b)
            for (h = 0; !a.$e && h < b.length; h++) f = a.currentTarget = b[h], e = f.ej(d, !1, a) && e;
        return e
    };
    g.oh = function() {
        Mb.U.oh.call(this);
        this.qr();
        this.zm = null
    };
    g.gw = function(a, b, c, d) {
        return this.Ld.add(String(a), b, !1, c, d)
    };
    g.hw = function(a, b, c, d) {
        return this.Ld.add(String(a), b, !0, c, d)
    };
    g.ay = function(a, b, c, d) {
        return this.Ld.remove(String(a), b, c, d)
    };
    g.Gs = function(a) {
        return this.Ld.tr(a)
    };
    g.qr = function(a) {
        return this.Ld ? this.Ld.gx(a) : 0
    };
    g.ej = function(a, b, c) {
        a = this.Ld.hb[String(a)];
        if (!a) return !0;
        a = a.concat();
        for (var d = !0, e = 0; e < a.length; ++e) {
            var f = a[e];
            if (f && !f.qg && f.Di == b) {
                var h = f.listener,
                    k = f.Qe || f.src;
                f.Bi && this.Gs(f);
                d = !1 !== h.call(k, c) && d
            }
        }
        return d && 0 != c.Hr
    };
    g.Cl = function(a, b, c, d) {
        return this.Ld.Cl(String(a), b, c, d)
    };
    var Pb = function(a, b, c, d, e) {
            if (!(Xa || Ya || $a && gb("525"))) return !0;
            if (ab && e) return Nb(a);
            if (e && !d) return !1;
            ha(b) && (b = Ob(b));
            if (!c && (17 == b || 18 == b || ab && 91 == b)) return !1;
            if (($a || Ya) && d && c) switch (a) {
                case 220:
                case 219:
                case 221:
                case 192:
                case 186:
                case 189:
                case 187:
                case 188:
                case 190:
                case 191:
                case 192:
                case 222:
                    return !1
            }
            if (Xa && d && b == a) return !1;
            switch (a) {
                case 13:
                    return !0;
                case 27:
                    return !($a || Ya)
            }
            return Nb(a)
        },
        Nb = function(a) {
            if (48 <= a && 57 >= a || 96 <= a && 106 >= a || 65 <= a && 90 >= a || ($a || Ya) && 0 == a) return !0;
            switch (a) {
                case 32:
                case 63:
                case 64:
                case 107:
                case 109:
                case 110:
                case 111:
                case 186:
                case 59:
                case 189:
                case 187:
                case 61:
                case 188:
                case 190:
                case 191:
                case 192:
                case 222:
                case 219:
                case 220:
                case 221:
                    return !0;
                default:
                    return !1
            }
        },
        Ob = function(a) {
            if (Za) a = Qb(a);
            else if (ab && $a) a: switch (a) {
                case 93:
                    a = 91;
                    break a
            }
            return a
        },
        Qb = function(a) {
            switch (a) {
                case 61:
                    return 187;
                case 59:
                    return 186;
                case 173:
                    return 189;
                case 224:
                    return 91;
                case 0:
                    return 224;
                default:
                    return a
            }
        };
    var Tb = function(a, b) {
        Mb.call(this);
        a && this.ui(a, b)
    };
    m(Tb, Mb);
    g = Tb.prototype;
    g.rh = null;
    g.Ej = null;
    g.$l = null;
    g.Hj = null;
    g.qc = -1;
    g.Ue = -1;
    g.wk = !1;
    var Ub = {
            3: 13,
            12: 144,
            63232: 38,
            63233: 40,
            63234: 37,
            63235: 39,
            63236: 112,
            63237: 113,
            63238: 114,
            63239: 115,
            63240: 116,
            63241: 117,
            63242: 118,
            63243: 119,
            63244: 120,
            63245: 121,
            63246: 122,
            63247: 123,
            63248: 44,
            63272: 46,
            63273: 36,
            63275: 35,
            63276: 33,
            63277: 34,
            63289: 144,
            63302: 45
        },
        Vb = {
            Up: 38,
            Down: 40,
            Left: 37,
            Right: 39,
            Enter: 13,
            F1: 112,
            F2: 113,
            F3: 114,
            F4: 115,
            F5: 116,
            F6: 117,
            F7: 118,
            F8: 119,
            F9: 120,
            F10: 121,
            F11: 122,
            F12: 123,
            "U+007F": 46,
            Home: 36,
            End: 35,
            PageUp: 33,
            PageDown: 34,
            Insert: 45
        },
        Wb = Xa || Ya || $a && gb("525"),
        Xb = ab && Za;
    g = Tb.prototype;
    g.yv = function(a) {
        ($a || Ya) && (17 == this.qc && !a.ctrlKey || 18 == this.qc && !a.altKey || ab && 91 == this.qc && !a.metaKey) && this.Cr(); - 1 == this.qc && (a.ctrlKey && 17 != a.keyCode ? this.qc = 17 : a.altKey && 18 != a.keyCode ? this.qc = 18 : a.metaKey && 91 != a.keyCode && (this.qc = 91));
        Wb && !Pb(a.keyCode, this.qc, a.shiftKey, a.ctrlKey, a.altKey) ? this.handleEvent(a) : (this.Ue = Ob(a.keyCode), Xb && (this.wk = a.altKey))
    };
    g.Cr = function() {
        this.Ue = this.qc = -1
    };
    g.zv = function(a) {
        this.Cr();
        this.wk = a.altKey
    };
    g.handleEvent = function(a) {
        var b = a.Tb,
            c, d, e = b.altKey;
        Xa && "keypress" == a.type ? (c = this.Ue, d = 13 != c && 27 != c ? b.keyCode : 0) : ($a || Ya) && "keypress" == a.type ? (c = this.Ue, d = 0 <= b.charCode && 63232 > b.charCode && Nb(c) ? b.charCode : 0) : Wa && !$a ? (c = this.Ue, d = Nb(c) ? b.keyCode : 0) : (c = b.keyCode || this.Ue, d = b.charCode || 0, Xb && (e = this.wk), ab && 63 == d && 224 == c && (c = 191));
        var f = c = Ob(c),
            h = b.keyIdentifier;
        c ? 63232 <= c && c in Ub ? f = Ub[c] : 25 == c && a.shiftKey && (f = 9) : h && h in Vb && (f = Vb[h]);
        a = f == this.qc;
        this.qc = f;
        b = new Yb(f, d, a, b);
        b.altKey = e;
        this.dispatchEvent(b)
    };
    g.ui = function(a, b) {
        this.Hj && this.detach();
        this.rh = a;
        this.Ej = yb(this.rh, "keypress", this, b);
        this.$l = yb(this.rh, "keydown", this.yv, b, this);
        this.Hj = yb(this.rh, "keyup", this.zv, b, this)
    };
    g.detach = function() {
        this.Ej && (Hb(this.Ej), Hb(this.$l), Hb(this.Hj), this.Hj = this.$l = this.Ej = null);
        this.rh = null;
        this.Ue = this.qc = -1
    };
    g.oh = function() {
        Tb.U.oh.call(this);
        this.detach()
    };
    var Yb = function(a, b, c, d) {
        ob.call(this, d);
        this.type = "key";
        this.keyCode = a;
        this.charCode = b;
        this.repeat = c
    };
    m(Yb, ob);
    var Zb = function(a) {
        return a
    };
    var $b = "StopIteration" in aa ? aa.StopIteration : {
            message: "StopIteration",
            stack: ""
        },
        ac = function() {};
    ac.prototype.next = function() {
        throw $b;
    };
    ac.prototype.bt = function() {
        return this
    };
    var bc = function(a, b) {
        this.Hc = {};
        this.Ca = [];
        this.ki = this.Ga = 0;
        var c = arguments.length;
        if (1 < c) {
            if (c % 2) throw Error("Uneven number of arguments");
            for (var d = 0; d < c; d += 2) this.set(arguments[d], arguments[d + 1])
        } else a && this.addAll(a)
    };
    g = bc.prototype;
    g.wp = function() {
        return this.Ga
    };
    g.Sf = function() {
        this.Xg();
        for (var a = [], b = 0; b < this.Ca.length; b++) a.push(this.Hc[this.Ca[b]]);
        return a
    };
    g.Ah = function() {
        this.Xg();
        return this.Ca.concat()
    };
    g.bh = function(a) {
        return cc(this.Hc, a)
    };
    g.ia = function(a, b) {
        if (this === a) return !0;
        if (this.Ga != a.wp()) return !1;
        var c = b || dc;
        this.Xg();
        for (var d, e = 0; d = this.Ca[e]; e++)
            if (!c(this.get(d), a.get(d))) return !1;
        return !0
    };
    var dc = function(a, b) {
        return a === b
    };
    g = bc.prototype;
    g.Wa = function() {
        return 0 == this.Ga
    };
    g.clear = function() {
        this.Hc = {};
        this.ki = this.Ga = this.Ca.length = 0
    };
    g.remove = function(a) {
        return cc(this.Hc, a) ? (delete this.Hc[a], this.Ga--, this.ki++, this.Ca.length > 2 * this.Ga && this.Xg(), !0) : !1
    };
    g.Xg = function() {
        if (this.Ga != this.Ca.length) {
            for (var a = 0, b = 0; a < this.Ca.length;) {
                var c = this.Ca[a];
                cc(this.Hc, c) && (this.Ca[b++] = c);
                a++
            }
            this.Ca.length = b
        }
        if (this.Ga != this.Ca.length) {
            for (var d = {}, b = a = 0; a < this.Ca.length;) c = this.Ca[a], cc(d, c) || (this.Ca[b++] = c, d[c] = 1), a++;
            this.Ca.length = b
        }
    };
    g.get = function(a, b) {
        return cc(this.Hc, a) ? this.Hc[a] : b
    };
    g.set = function(a, b) {
        cc(this.Hc, a) || (this.Ga++, this.Ca.push(a), this.ki++);
        this.Hc[a] = b
    };
    g.addAll = function(a) {
        var b;
        if (a instanceof bc) b = a.Ah(), a = a.Sf();
        else {
            b = [];
            var c = 0,
                d;
            for (d in a) b[c++] = d;
            c = [];
            d = 0;
            for (var e in a) c[d++] = a[e];
            a = c
        }
        for (e = 0; e < b.length; e++) this.set(b[e], a[e])
    };
    g.forEach = function(a, b) {
        for (var c = this.Ah(), d = 0; d < c.length; d++) {
            var e = c[d],
                f = this.get(e);
            a.call(b, f, e, this)
        }
    };
    g.clone = function() {
        return new bc(this)
    };
    g.bt = function(a) {
        this.Xg();
        var b = 0,
            c = this.ki,
            d = this,
            e = new ac;
        e.next = function() {
            if (c != d.ki) throw Error("The map has changed since the iterator was created");
            if (b >= d.Ca.length) throw $b;
            var e = d.Ca[b++];
            return a ? e : d.Hc[e]
        };
        return e
    };
    var cc = function(a, b) {
        return Object.prototype.hasOwnProperty.call(a, b)
    };
    var ec = function(a, b) {
        if (a)
            for (var c = a.split("&"), d = 0; d < c.length; d++) {
                var e = c[d].indexOf("="),
                    f = null,
                    h = null;
                0 <= e ? (f = c[d].substring(0, e), h = c[d].substring(e + 1)) : f = c[d];
                b(f, h ? decodeURIComponent(h.replace(/\+/g, " ")) : "")
            }
    };
    var fc = function(a, b, c) {
        this.Ga = this.Pa = null;
        this.Jd = a || null;
        this.Ev = !!c
    };
    g = fc.prototype;
    g.Kd = function() {
        if (!this.Pa && (this.Pa = new bc, this.Ga = 0, this.Jd)) {
            var a = this;
            ec(this.Jd, function(b, c) {
                a.add(decodeURIComponent(b.replace(/\+/g, " ")), c)
            })
        }
    };
    g.wp = function() {
        this.Kd();
        return this.Ga
    };
    g.add = function(a, b) {
        this.Kd();
        this.yj();
        a = this.zh(a);
        var c = this.Pa.get(a);
        c || this.Pa.set(a, c = []);
        c.push(b);
        this.Ga++;
        return this
    };
    g.remove = function(a) {
        this.Kd();
        a = this.zh(a);
        return this.Pa.bh(a) ? (this.yj(), this.Ga -= this.Pa.get(a).length, this.Pa.remove(a)) : !1
    };
    g.clear = function() {
        this.yj();
        this.Pa = null;
        this.Ga = 0
    };
    g.Wa = function() {
        this.Kd();
        return 0 == this.Ga
    };
    g.bh = function(a) {
        this.Kd();
        a = this.zh(a);
        return this.Pa.bh(a)
    };
    g.Ah = function() {
        this.Kd();
        for (var a = this.Pa.Sf(), b = this.Pa.Ah(), c = [], d = 0; d < b.length; d++)
            for (var e = a[d], f = 0; f < e.length; f++) c.push(b[d]);
        return c
    };
    g.Sf = function(a) {
        this.Kd();
        var b = [];
        if (fa(a)) this.bh(a) && (b = Fa(b, this.Pa.get(this.zh(a))));
        else {
            a = this.Pa.Sf();
            for (var c = 0; c < a.length; c++) b = Fa(b, a[c])
        }
        return b
    };
    g.set = function(a, b) {
        this.Kd();
        this.yj();
        a = this.zh(a);
        this.bh(a) && (this.Ga -= this.Pa.get(a).length);
        this.Pa.set(a, [b]);
        this.Ga++;
        return this
    };
    g.get = function(a, b) {
        var c = a ? this.Sf(a) : [];
        return 0 < c.length ? String(c[0]) : b
    };
    g.toString = function() {
        if (this.Jd) return this.Jd;
        if (!this.Pa) return "";
        for (var a = [], b = this.Pa.Ah(), c = 0; c < b.length; c++)
            for (var d = b[c], e = encodeURIComponent(String(d)), d = this.Sf(d), f = 0; f < d.length; f++) {
                var h = e;
                "" !== d[f] && (h += "=" + encodeURIComponent(String(d[f])));
                a.push(h)
            }
        return this.Jd = a.join("&")
    };
    g.yj = function() {
        this.Jd = null
    };
    g.clone = function() {
        var a = new fc;
        a.Jd = this.Jd;
        this.Pa && (a.Pa = this.Pa.clone(), a.Ga = this.Ga);
        return a
    };
    g.zh = function(a) {
        a = String(a);
        this.Ev && (a = a.toLowerCase());
        return a
    };
    var gc = null,
        ic = null,
        jc = Za || $a || Wa || "function" == typeof aa.atob,
        kc = function() {
            if (!gc) {
                gc = {};
                ic = {};
                for (var a = 0; 65 > a; a++) gc[a] = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=".charAt(a), ic[gc[a]] = a, 62 <= a && (ic["ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_.".charAt(a)] = a)
            }
        };
    var lc = function(a) {
        a = String(a);
        if (/^\s*$/.test(a) ? 0 : /^[\],:{}\s\u2028\u2029]*$/.test(a.replace(/\\["\\\/bfnrtu]/g, "@").replace(/"[^"\\\n\r\u2028\u2029\x00-\x08\x0a-\x1f]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, "]").replace(/(?:^|:|,)(?:[\s\u2028\u2029]*\[)+/g, ""))) try {
            return eval("(" + a + ")")
        } catch (b) {}
        throw Error("Invalid JSON string: " + a);
    };
    !Ta("Android") || Va() || Ta("Firefox") || Ua();
    Va();
    var mc = Ta("Safari") && !(Va() || Ta("Coast") || Ua() || Ta("Edge") || Ta("Silk") || Ta("Android")) && !(Ta("iPhone") && !Ta("iPod") && !Ta("iPad") || Ta("iPad") || Ta("iPod"));
    var nc = /iPhone|iPod/,
        oc = function(a, b, c, d) {
            return a << 21 | b << 14 | c << 7 | d
        },
        pc = /OS (\d)_(\d)(?:_(\d))?/;
    var qc = function(a, b, c) {
            for (var d = []; c = b(a, c, d););
            return String.fromCharCode.apply(String, d)
        },
        rc = function(a, b, c) {
            var d = a.length,
                e = c.length;
            if (b >= d) return 0;
            var f = a[b++];
            c.push(f);
            if (194 > f || 244 < f) return b;
            for (var h = f & 32 ? f & 16 ? 3 : 2 : 1, f = f & 63 >> h; h--;) {
                if (b >= d) return 0;
                var k = a[b];
                if (128 != (k & 192)) return b;
                c.push(k);
                b++;
                f = f << 6 | k & 63
            }
            if (1114111 < f) return b;
            65535 < f && (f -= 65536, c[e++] = (f >> 10 & 1023) + 55296, f = (f & 1023) + 56320);
            c[e++] = f;
            c.length = e;
            return b
        },
        sc = function(a, b, c) {
            if (b + 2 > a.length) return 0;
            c.push(a[b++] | a[b++] <<
                8);
            return b
        },
        tc = function(a, b, c) {
            if (b + 2 > a.length) return 0;
            c.push(a[b++] << 8 | a[b++]);
            return b
        };
    var uc = "normal layer multiply screen lighten darken difference add subtract invert alpha erase overlay hardlight shader".split(" "),
        vc = {
            CA: 0,
            AA: 1,
            TA: 2,
            QA: 3,
            RA: 4,
            EC: 5,
            vz: 6,
            NA: 7,
            MB: 8,
            NB: 9,
            HB: 10,
            GB: 11,
            iB: 12,
            oz: 13,
            qz: 14,
            nz: 15,
            pz: 16,
            qA: 17,
            $y: 18,
            pe: 19,
            BA: 20
        },
        wc = {
            dB: 2,
            qf: 3,
            Kg: 4,
            Mg: 5,
            jf: 6,
            sz: 7,
            DA: 8,
            EA: 9,
            iA: 12,
            hA: 13,
            gA: 14,
            fA: 15,
            Ws: 16,
            lA: 17,
            $z: 18,
            Zz: 19,
            eA: 20,
            dA: 21,
            cA: 22,
            bA: 23,
            aA: 24,
            jA: 25,
            kA: 26,
            OA: 27,
            wB: 28,
            hB: 29,
            aB: 30,
            sk: 31,
            pB: 32,
            vB: 33,
            bB: 35,
            kB: 36,
            rB: 37,
            tB: 38,
            mB: 39,
            oB: 40,
            $s: 41,
            rz: 42,
            tC: 43,
            sB: 44,
            nB: 45,
            uB: 46,
            lB: 47,
            qB: 48,
            pf: 49,
            Lg: 50,
            MA: 53,
            KA: 54,
            LA: 55,
            IA: 56,
            JA: 57,
            eC: 58,
            cC: 59,
            dC: 60,
            aC: 61,
            bC: 62,
            of: 64,
            ne: 65,
            pe: 66,
            Hy: 69,
            Fy: 70,
            LB: 71,
            KB: 72,
            hf: 73,
            Ty: 74,
            oe: 76,
            Iy: 78,
            Gy: 79,
            uC: 80,
            wC: 81,
            vC: 82,
            Ig: 83,
            YA: 85,
            XA: 86,
            ri: 87,
            nf: 88,
            Fz: 89,
            mf: 90,
            Cz: 93,
            Bz: 94,
            Gz: 96,
            VB: 97,
            Hz: 98,
            PB: 99,
            Jg: 100,
            kf: 101,
            Mz: 102,
            rA: 104,
            lz: 106,
            lf: 108,
            WB: 109,
            Xy: 112,
            zz: 113,
            yz: 114,
            Wy: 115,
            Yy: 116,
            Vy: 117,
            Uy: 118,
            ni: 119,
            mi: 120,
            ud: 128,
            Py: 130,
            Ry: 133,
            ry: 134,
            sy: 135,
            Qy: 137,
            VA: 144,
            Vs: 145,
            nA: 146,
            Ss: 147,
            dz: 148,
            CC: 149,
            Zs: 150,
            vy: 151,
            Qs: 160,
            at: 161,
            Ys: 162,
            Ts: 163,
            Xs: 164,
            PA: 165,
            OB: 166,
            FC: 167,
            uy: 168,
            wy: 169,
            xy: 170,
            Us: 171,
            kC: 172,
            GA: 173,
            FA: 174,
            Xz: 175,
            Wz: 176,
            pi: 177,
            yA: 178,
            zA: 179,
            oi: 180,
            pA: 192,
            fz: 193,
            oA: 194,
            ez: 195,
            WA: 196,
            oy: 197,
            sC: 198,
            UA: 199,
            Iz: 208,
            Jz: 209,
            Kz: 210,
            Lz: 211,
            QB: 212,
            RB: 213,
            TB: 214,
            UB: 215,
            az: 239,
            cz: 240,
            bz: 241,
            Fn: 256,
            Hn: 257,
            Gn: 258,
            tk: 259,
            Dn: 260,
            En: 261,
            Cn: 262,
            Rs: 263
        };
    var xc = function(a, b) {
        this.type = a;
        this.ng = b || null
    };
    var yc = function(a, b) {
        this.x = a;
        this.y = b
    };
    yc.prototype.pb = function(a) {
        if (!a.bc()) {
            var b = this.x * a.J + this.y * a.u + a.Z;
            this.x = this.x * a.F + this.y * a.C + a.Y;
            this.y = b
        }
    };
    yc.prototype.Sc = function(a) {
        if (!a.bc()) {
            var b = a.ul();
            if (0 != b) {
                var c = this.x - a.Y,
                    d = this.y - a.Z;
                this.x = (c * a.u - d * a.C) / b;
                this.y = (d * a.F - c * a.J) / b
            }
        }
    };
    yc.prototype.clone = function() {
        return new yc(this.x, this.y)
    };
    var zc = function(a, b) {
            return Math.sqrt(a * a + b * b)
        },
        Ac = function(a, b, c, d, e, f) {
            this.F = a;
            this.J = b;
            this.C = c;
            this.u = d;
            this.Y = e;
            this.Z = f
        },
        Bc = new Ac(1, 0, 0, 1, 0, 0),
        Cc = new Ac(0, 0, 0, 0, 0, 0),
        Dc = new Ac(20, 0, 0, 20, 0, 0),
        Ec = new Ac(.05, 0, 0, .05, 0, 0),
        Hc = 20 / 16384 / 2,
        Ic = function(a, b, c, d, e, f) {
            if (0 === e && 0 === f && 0 === b && 0 === c) {
                if (1 === a && 1 === d) return Bc;
                if (.05 === a && .05 === d) return Ec;
                if (20 === a && 20 === d) return Dc
            }
            return new Ac(a, b, c, d, e, f)
        };
    g = Ac.prototype;
    g.ul = function() {
        return this.F * this.u - this.J * this.C
    };
    g.jq = function() {
        if (this.bc()) return this;
        var a = this.ul();
        return 0 == a ? Bc : Ic(this.u / a, -this.J / a, -this.C / a, this.F / a, (this.C * this.Z - this.u * this.Y) / a, (this.J * this.Y - this.F * this.Z) / a)
    };
    g.multiply = function(a) {
        return this.bc() ? a : a.bc() ? this : Ic(this.F * a.F + this.J * a.C, this.F * a.J + this.J * a.u, this.C * a.F + this.u * a.C, this.C * a.J + this.u * a.u, this.Y * a.F + this.Z * a.C + a.Y, this.Y * a.J + this.Z * a.u + a.Z)
    };
    g.br = function(a, b) {
        return 1 === a && 1 === b ? this : Ic(this.F * a, this.J * a, this.C * b, this.u * b, this.Y, this.Z)
    };
    g.ar = function(a, b) {
        return 1 === a && 1 === b ? this : Ic(this.F * a, this.J * b, this.C * a, this.u * b, this.Y * a, this.Z * b)
    };
    g.wv = function() {
        return this.bc() ? 1 : Math.sqrt(this.F * this.F + this.J * this.J)
    };
    g.xv = function() {
        return this.bc() ? 1 : Math.sqrt(this.C * this.C + this.u * this.u)
    };
    g.qv = function() {
        return this.bc() ? 1 : Math.sqrt(Math.sqrt(this.F * this.F + this.J * this.J) * Math.sqrt(this.C * this.C + this.u * this.u))
    };
    g.$j = function(a, b) {
        return 0 === a && 0 === b ? this : Ic(this.F, this.J, this.C, this.u, this.Y + a, this.Z + b)
    };
    g.An = function(a, b) {
        return this.Y === a && this.Z === b ? this : Ic(this.F, this.J, this.C, this.u, a, b)
    };
    g.toString = function() {
        return "matrix(" + this.F + "," + this.J + "," + this.C + "," + this.u + "," + this.Y + "," + this.Z + ")"
    };
    g.lu = function() {
        var a = this.wv(),
            b = this.xv();
        if (!a || !b || this.bc()) return {
            td: 1,
            gf: 1,
            angle: 0,
            C: 0,
            u: 1
        };
        var c = this.F / a,
            d = this.J / a;
        return {
            td: a,
            gf: b,
            angle: -Math.atan2(this.J, this.F),
            C: (c * this.C + d * this.u) / a,
            u: (c * this.u - d * this.C) / b
        }
    };
    g.bc = function() {
        return this === Bc
    };
    g.ia = function(a) {
        return a === this ? !0 : !a || a.bc() || this.bc() ? !1 : this.F == a.F && this.J == a.J && this.C == a.C && this.u == a.u && this.Y == a.Y && this.Z == a.Z
    };
    g.Et = function(a) {
        return a === this ? !0 : this.F == a.F && this.J == a.J && this.C == a.C && this.u == a.u
    };
    g.yc = function(a) {
        this.bc() || a.transform(this.F, this.J, this.C, this.u, this.Y, this.Z)
    };
    g.lm = function() {
        return (!!this.F || !!this.J) && (!!this.u || !!this.C)
    };
    var Jc = function(a, b, c, d) {
        this.r = a;
        this.Jb = b;
        this.Fb = c;
        this.ad = d
    };
    Jc.prototype.toString = function() {
        return "rgb(" + (this.r | 0) + "," + (this.Jb | 0) + "," + (this.Fb | 0) + ")"
    };
    Jc.prototype.rd = function() {
        return "rgba(" + (this.r | 0) + "," + (this.Jb | 0) + "," + (this.Fb | 0) + "," + (this.ad / .255 | 0) / 1E3 + ")"
    };
    var Kc = function(a, b) {
            var c = a | 0,
                d = c & 255,
                c = c >> 8,
                e = c & 255,
                f = l(b) ? b : 100;
            return new Jc(c >> 8 & 255, e, d, 100 > f ? 0 < f ? 2.55 * f | 0 : 0 : 255)
        },
        Lc = function(a, b) {
            return a | (255 * b | 0) << 24
        };
    Jc.prototype.Xv = function() {
        return 255 <= this.ad
    };
    Jc.prototype.hv = function() {
        return .3 * this.r + .6 * this.Jb + .1 * this.Fb
    };
    var Mc = function(a, b, c, d, e, f, h, k) {
            this.Mb = a;
            this.dc = b;
            this.Kb = c;
            this.$b = d;
            this.Gb = e;
            this.Sb = f;
            this.Ta = h;
            this.Eb = k
        },
        Nc = new Mc(256, 0, 256, 0, 256, 0, 256, 0);
    g = Mc.prototype;
    g.Hv = function(a) {
        return new Mc(this.Mb * a.Mb >> 8, (this.Mb * a.dc >> 8) + this.dc, this.Kb * a.Kb >> 8, (this.Kb * a.$b >> 8) + this.$b, this.Gb * a.Gb >> 8, (this.Gb * a.Sb >> 8) + this.Sb, this.Ta * a.Ta >> 8, (this.Ta * a.Eb >> 8) + this.Eb)
    };
    g.apply = function(a) {
        return new Jc((a.r * this.Mb >> 8) + this.dc, (a.Jb * this.Kb >> 8) + this.$b, (a.Fb * this.Gb >> 8) + this.Sb, Math.max(Math.min((a.ad * this.Ta >> 8) + this.Eb, 255), 0))
    };
    g.ia = function(a) {
        return null != a && this.Mb == a.Mb && this.dc == a.dc && this.Kb == a.Kb && this.$b == a.$b && this.Gb == a.Gb && this.Sb == a.Sb && this.Ta == a.Ta && this.Eb == a.Eb
    };
    g.we = function() {
        return 0 == this.Eb && (0 == this.Ta || 256 >= this.Ta && 256 == this.Mb && 0 == this.dc && 256 == this.Kb && 0 == this.$b && 256 == this.Gb && 0 == this.Sb)
    };
    g.Gl = function() {
        return Math.max(this.Ta, 0) / 256
    };
    g.Os = function(a) {
        return new Mc(this.Mb, this.dc, this.Kb, this.$b, this.Gb, this.Sb, a, this.Eb)
    };
    g.Rn = function() {
        return [this.Mb, 0, 0, 0, this.dc, 0, this.Kb, 0, 0, this.$b, 0, 0, this.Gb, 0, this.Sb, 0, 0, 0, this.Ta, this.Eb]
    };
    g.Qx = function() {
        return Nc.ia(this) ? "" : this.Mb + "," + this.dc + "," + this.Kb + "," + this.$b + "," + this.Gb + "," + this.Sb + "," + this.Ta + "," + this.Eb
    };
    g.lm = function() {
        return 0 < 255 * this.Ta + this.Eb
    };
    g.Wv = function(a) {
        return this.ia(a) || this.we() && a.we()
    };
    var Oc = function(a, b, c, d) {
        this.j = a;
        this.l = b;
        this.s = c;
        this.G = d;
        this.Wa() && this.reset()
    };
    g = Oc.prototype;
    g.reset = function() {
        this.l = this.j = Number.POSITIVE_INFINITY;
        this.G = this.s = Number.NEGATIVE_INFINITY
    };
    g.clone = function() {
        return new Oc(this.j, this.l, this.s, this.G)
    };
    g.expand = function(a, b) {
        this.kc(a, b, 0, 0)
    };
    g.kc = function(a, b, c, d) {
        this.j = Math.min(this.j, a - c);
        this.s = Math.max(this.s, a + c);
        this.l = Math.min(this.l, b - d);
        this.G = Math.max(this.G, b + d)
    };
    g.cj = function() {
        this.j = Math.floor(this.j);
        this.l = Math.floor(this.l);
        this.s = Math.ceil(this.s);
        this.G = Math.ceil(this.G)
    };
    g.add = function(a) {
        this.l += a.l;
        this.G += a.G;
        this.j += a.j;
        this.s += a.s
    };
    g.gt = function(a) {
        this.l -= a.G;
        this.G -= a.l;
        this.j -= a.s;
        this.s -= a.j
    };
    g.translate = function(a, b) {
        this.j += a;
        this.l += b;
        this.s += a;
        this.G += b
    };
    g.scale = function(a, b) {
        this.j *= a;
        this.l *= b;
        this.s *= a;
        this.G *= b
    };
    g.mm = function(a) {
        if (!a.bc() && !this.Wa()) {
            var b = this.j,
                c = this.l,
                d = this.s - this.j,
                e = this.G - this.l,
                f = a.F * b + a.C * c + a.Y,
                b = a.J * b + a.u * c + a.Z,
                c = f + a.F * d,
                d = b + a.J * d,
                h = a.C * e;
            a = a.u * e;
            this.j = Math.min(f, c, f + h, c + h);
            this.s = Math.max(f, c, f + h, c + h);
            this.l = Math.min(b, d, b + a, d + a);
            this.G = Math.max(b, d, b + a, d + a)
        }
    };
    g.pb = function(a) {
        var b = this.clone();
        b.mm(a);
        return b
    };
    g.Vq = function(a) {
        return this.s >= a.j && a.s >= this.j && this.G >= a.l && a.G >= this.l
    };
    g.vo = function(a) {
        return a.j >= this.j && a.s <= this.s && a.l >= this.l && a.G <= this.G
    };
    g.ia = function(a) {
        return a.j == this.j && a.s == this.s && a.l == this.l && a.G == this.G
    };
    g.contains = function(a, b) {
        return a >= this.j && a <= this.s && b >= this.l && b <= this.G
    };
    g.fh = function(a) {
        this.j = Math.min(this.j, a.j);
        this.s = Math.max(this.s, a.s);
        this.l = Math.min(this.l, a.l);
        this.G = Math.max(this.G, a.G)
    };
    g.xj = function(a) {
        this.j = Math.max(this.j, a.j);
        this.s = Math.min(this.s, a.s);
        this.l = Math.max(this.l, a.l);
        this.G = Math.min(this.G, a.G);
        this.Wa() && this.reset()
    };
    g.Mw = function(a) {
        this.j -= a;
        this.l -= a;
        this.s += a;
        this.G += a
    };
    g.Wa = function() {
        return !(this.j <= this.s && this.l <= this.G)
    };
    g.width = function() {
        return Math.max(this.s - this.j, 0)
    };
    g.height = function() {
        return Math.max(this.G - this.l, 0)
    };
    var Qc = function(a) {
        if (fa(a)) {
            var b = Pc(a);
            a = b();
            var c = b(),
                d = a + b(),
                b = c + b();
            return new Oc(a, c, d, b)
        }
        return new Oc(a.xmin, a.ymin, a.xmax, a.ymax)
    };
    Oc.prototype.toString = function() {
        return "" + this.j + " " + this.l + " " + this.width() + " " + this.height()
    };
    var Sc = function(a, b, c, d) {
            this.x = new Rc(a.j, a.width(), b.j, b.width(), c);
            this.y = new Rc(a.l, a.height(), b.l, b.height(), d)
        },
        Rc = function(a, b, c, d, e) {
            this.Yi = Math.min(1 / e, b / (b - d));
            this.Dv = c;
            this.Ql = d;
            this.vm = a + this.Yi * (c - a);
            this.Kq = b - this.Yi * (b - d)
        };
    Rc.prototype.slice = function(a) {
        a -= this.Dv;
        return 0 > a ? this.vm + this.Yi * a : a < this.Ql ? this.vm + a * this.Kq / this.Ql : this.vm + this.Kq + this.Yi * (a - this.Ql)
    };
    var Tc = function(a, b, c, d, e) {
        this.clip = a;
        c || (a = a.ya(), d = this.Fp(d, e), this.No = a.Y - d.x, this.Oo = a.Z - d.y);
        this.$g = b
    };
    Tc.prototype.No = 0;
    Tc.prototype.Oo = 0;
    Tc.prototype.Fp = function(a, b) {
        var c = this.clip.getParent() ? this.clip.getParent().ca() : Bc,
            d = new yc(a, b);
        d.Sc(c);
        return d
    };
    Tc.prototype.rw = function(a, b) {
        var c = this.Fp(a, b),
            d = c.x + this.No,
            c = c.y + this.Oo;
        this.$g && (d = Math.max(Math.min(d, this.$g.s), this.$g.j), c = Math.max(Math.min(c, this.$g.G), this.$g.l));
        this.clip.setTransform(this.clip.ya().An(d, c))
    };
    var Uc = function() {
            this.y = this.x = 0;
            this.So = !1;
            this.$c = !0;
            this.Jo = "auto";
            this.Go = ""
        },
        Vc = {
            arrow: "default",
            auto: "",
            button: "pointer",
            hand: "move",
            ibeam: "text"
        };
    g = Uc.prototype;
    g.fk = function(a) {
        this.So = a
    };
    g.Mv = function() {
        return this.So
    };
    g.ln = function(a) {
        var b = new yc(this.x, this.y);
        b.Sc(a);
        return b.x
    };
    g.mn = function(a) {
        var b = new yc(this.x, this.y);
        b.Sc(a);
        return b.y
    };
    g.lj = function(a) {
        var b = this.$c;
        this.$c = a;
        return b
    };
    g.Xx = function(a) {
        var b = Vc[a];
        if (!l(b)) return !1;
        this.Jo = a;
        this.Go = b;
        return !0
    };
    g.Nf = function() {
        return this.Jo
    };
    g.Uu = function() {
        return this.$c ? this.Go : "none"
    };
    var Xc = function(a) {
            this.Lo = a || ":" + (Wc++).toString(36)
        },
        Wc = 0,
        Yc = new Xc,
        Zc = {};
    Xc.prototype.Dw = 0;
    Xc.prototype.Fl = function() {
        return this.Lo + "-" + (this.Dw++).toString(36)
    };
    var $c = function(a, b) {
        this.ja = a;
        this.Ee = [];
        this.qm = !1;
        this.Ij = null;
        this.As = 0;
        this.Tf = !1;
        this.Ux = b;
        this.pt = "createTouch" in document && 0 <= b
    };
    g = $c.prototype;
    g.ey = function() {
        if (this.pt) {
            yb(this.ja.Ea, "touchstart", this.Wx, !1, this);
            yb(this.ja.Ea, "touchmove", this.Tx, !1, this);
            yb(this.ja.Ea, "touchend", this.Sx, !1, this);
            var a = yb(document, "touchstart", this.Vx, !1, this);
            this.Ee.push(a);
            a = yb(document, "touchend", this.Rx, !1, this);
            this.Ee.push(a)
        }
        yb(this.ja.Ea, "mousemove", this.qw, !1, this);
        yb(this.ja.Ea, "mousedown", this.ow, !1, this);
        yb(this.ja.Ea, "mouseup", this.vw, !1, this);
        yb(this.ja.Ea, "mouseout", this.sw, !1, this);
        yb(this.ja.Ea, "contextmenu", ad, !1);
        yb(this.ja.Ea, "mouseover",
            ad, !1);
        a = yb(document, "mousedown", this.nw, !1, this);
        this.Ee.push(a);
        a = yb(document, "mouseup", this.uw, !1, this);
        this.Ee.push(a);
        a = yb(document, "mouseover", this.pw, !1, this);
        this.Ee.push(a)
    };
    g.Zx = function() {
        for (var a = 0; a < this.Ee.length; a++) Hb(this.Ee[a])
    };
    g.Wx = function(a) {
        a.stopPropagation();
        this.Th(a);
        var b = a.Tb.touches,
            c = a.Tb.changedTouches;
        this.Tf || 1 != b.length || 1 != c.length ? (this.Tf = !0, this.Ik(a)) : (this.Ij = bd(a), this.ja.Ye(this.Pf(a)), this.ja.Nq())
    };
    g.Tx = function(a) {
        a.stopPropagation();
        this.Th(a);
        this.Tf || (a = this.Pf(a), this.ja.Ye(a))
    };
    g.Sx = function(a) {
        a.stopPropagation();
        this.Th(a);
        var b = a.Tb.changedTouches;
        0 != a.Tb.touches.length || 1 != b.length || this.Tf || this.zw(a) || this.ja.Rq();
        this.Ik(a)
    };
    g.Vx = function(a) {
        a.stopPropagation();
        this.Th(a);
        this.ja.Oq();
        this.Tf = !0
    };
    g.Rx = function(a) {
        a.stopPropagation();
        this.Th(a);
        this.Ik(a);
        this.ja.Sq()
    };
    g.Ik = function(a) {
        this.ja.Ye(new yc(-1, -1), null);
        this.qm = !1;
        0 == a.Tb.touches.length && (this.Tf = !1)
    };
    g.qw = function(a) {
        a.stopPropagation();
        this.se(a) && this.ja.Ye(this.Pf(a))
    };
    g.ow = function(a) {
        a.stopPropagation();
        this.se(a) && (this.ja.Ye(this.Pf(a)), this.ja.Nq())
    };
    g.vw = function(a) {
        a.stopPropagation();
        this.se(a) && this.ja.Rq()
    };
    g.sw = function(a) {
        a.stopPropagation();
        this.se(a) && this.ja.Ye(this.Pf(a), null)
    };
    g.nw = function(a) {
        a.stopPropagation();
        this.se(a) && this.ja.Oq()
    };
    g.uw = function(a) {
        a.stopPropagation();
        this.se(a) && this.ja.Sq()
    };
    g.pw = function(a) {
        a.stopPropagation();
        this.se(a) && this.ja.Ye(this.Pf(a), null)
    };
    g.Th = function() {
        this.As = na() + 1E3
    };
    g.se = function(a) {
        return na() < this.As ? !1 : 2 != a.button
    };
    g.zw = function(a) {
        var b = bd(a);
        if (!this.Ij) return !0;
        a = b.x - this.Ij.x;
        var b = b.y - this.Ij.y,
            c = this.Ux;
        return a * a + b * b > c * c ? !0 : !1
    };
    var bd = function(a) {
        var b = a.Tb.touches,
            c = a.Tb.changedTouches;
        b && 1 == b.length ? a = b[0] : c && 1 == c.length && (a = c[0]);
        return new yc(a.clientX, a.clientY)
    };
    $c.prototype.Pf = function(a) {
        a = bd(a);
        var b = this.ja.ae.getBoundingClientRect();
        this.qm = a.x >= b.left && a.x < b.right && a.y >= b.top && a.y < b.bottom;
        a = new yc(a.x - b.left, a.y - b.top);
        a.Sc(this.ja.X.jk);
        return a
    };
    var ad = function(a) {
        a.stopPropagation();
        return !1
    };
    var cd = function(a) {
        if (9 > a.length) return !1;
        for (var b = 0; 9 > b; ++b)
            if ("__swiffy_".charCodeAt(b) != a.charCodeAt(b)) return !1;
        return !0
    };
    var dd = window != window.top,
        ed = function(a) {
            return window.setTimeout(function() {
                a.call(window, Date.now())
            }, 1E3 / 60)
        },
        fd = function(a) {
            window.clearTimeout(a)
        },
        gd = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || null,
        hd = window.cancelAnimationFrame || window.webkitCancelAnimationFrame || window.mozCancelAnimationFrame || window.oCancelAnimationFrame || null,
        id;
    if (id = -1 != navigator.userAgent.indexOf("iPad") || nc.test(navigator.userAgent)) {
        var jd = pc.exec(navigator.userAgent) || [];
        jd.shift();
        id = oc.apply(null, jd) < oc(7)
    }
    var kd = id ? ed : gd ? ma(gd, window) : ed,
        ld = kd === ed ? fd : ma(hd, window),
        md = document.createElement("canvas");
    md.width = 1;
    md.height = 1;
    var nd = md.getContext("2d"),
        od = nd.createImageData(1, 1);
    od.data[0] = 127;
    od.data[3] = 127;
    nd.putImageData(od, 0, 0);
    var pd = 255 == nd.getImageData(0, 0, 1, 1).data[0],
        qd = function(a, b, c, d) {
            a.putImageData(b, c, d)
        },
        rd = function(a, b, c, d) {
            for (var e = b.data, f = e.length; 0 < f;) {
                var h = e[--f] + 1;
                e[--f] = e[f] * h >> 8;
                e[--f] = e[f] * h >> 8;
                e[--f] = e[f] * h >> 8
            }
            a.putImageData(b, c, d)
        },
        sd = pd ? rd : qd;
    var td = function() {
            this.Si = [];
            this.hm = {}
        },
        ud = function(a, b) {
            this.id = a;
            this.mh = b
        };
    ud.prototype.Xl = function() {
        return !!this.mh
    };
    ud.prototype.get = function() {
        return this.mh
    };
    td.prototype.Ie = function(a) {
        var b = this.Si[a];
        b || (b = new ud(a, null), this.Si[a] = b);
        return b
    };
    td.prototype.Vu = function(a, b) {
        var c = this.Si[a],
            c = c && c.mh;
        return c instanceof b ? c : null
    };
    td.prototype.dr = function(a) {
        this.Ie(a.id).mh = a
    };
    td.prototype.Ot = function(a, b) {
        for (var c = this.Si, d = 0; d < c.length; d++) c[d] && c[d].mh && c[d].get().zd(a);
        b && a.Hk(b)
    };
    var vd = function() {
        this.tm = !0;
        this.uj = [];
        this.Nj = []
    };
    vd.prototype.add = function(a) {
        this.Nj.push(a)
    };
    vd.prototype.uk = function(a) {
        this.uj.push(a)
    };
    vd.prototype.flush = function() {
        if (this.tm) {
            this.tm = !1;
            for (var a = 0, b = 0;;)
                if (a < this.uj.length) this.uj[a++]();
                else if (b < this.Nj.length) this.Nj[b++]();
            else {
                this.uj = [];
                this.Nj = [];
                this.tm = !0;
                break
            }
        }
    };
    var wd = RegExp("^[A-Z_a-z\u00c0-\u00d6\u00d8-\u00f6\u00f8-\u02ff\u0370-\u037d\u037f-\u1fff\u200c-\u200d\u2070-\u218f\u2c00-\u2fef\u3001-\ud7ff\uf900-\ufdcf\ufdf0-\ufffd][A-Z_a-z\u00c0-\u00d6\u00d8-\u00f6\u00f8-\u02ff\u0370-\u037d\u037f-\u1fff\u200c-\u200d\u2070-\u218f\u2c00-\u2fef\u3001-\ud7ff\uf900-\ufdcf\ufdf0-\ufffd.0-9\u00b7\u0300-\u036f\u203f-\u2040-]*$"),
        xd = function(a) {
            if (null != a && (a = String(a), a.match(wd))) return a
        },
        yd = {
            "<": "&lt;",
            ">": "&gt;",
            "&": "&amp;",
            '"': "&quot;",
            "'": "&apos;",
            "\t": "&#x9;",
            "\n": "&#xA;",
            "\r": "&#xD;"
        },
        zd = function(a) {
            return yd[a] || a
        },
        Ad = function(a) {
            return String(a).replace(/[<>&]/g, zd)
        },
        Bd = function(a) {
            return String(a).replace(/[<&"\t\n\r]/g, zd)
        },
        Cd = {},
        Dd;
    for (Dd in yd) Cd[yd[Dd]] = Dd;
    var Ed = "&nbsp; &iexcl; &cent; &pound; &curren; &yen; &brvbar; &sect; &uml; &copy; &ordf; &laquo; &not; &shy; &reg; &macr; &deg; &plusmn; &sup2; &sup3; &acute; &micro; &para; &middot; &cedil; &sup1; &ordm; &raquo; &frac14; &frac12; &frac34; &iquest; &Agrave; &Aacute; &Acirc; &Atilde; &Auml; &Aring; &AElig; &Ccedil; &Egrave; &Eacute; &Ecirc; &Euml; &Igrave; &Iacute; &Icirc; &Iuml; &ETH; &Ntilde; &Ograve; &Oacute; &Ocirc; &Otilde; &Ouml; &times; &Oslash; &Ugrave; &Uacute; &Ucirc; &Uuml; &Yacute; &THORN; &szlig; &agrave; &aacute; &acirc; &atilde; &auml; &aring; &aelig; &ccedil; &egrave; &eacute; &ecirc; &euml; &igrave; &iacute; &icirc; &iuml; &eth; &ntilde; &ograve; &oacute; &ocirc; &otilde; &ouml; &divide; &oslash; &ugrave; &uacute; &ucirc; &uuml; &yacute; &thorn; &yuml;".split(" "),
        Fd = {},
        Gd;
    for (Gd in Cd) Fd[Gd] = Cd[Gd];
    for (var Hd = 0; Hd < Ed.length; ++Hd) Fd[Ed[Hd]] = String.fromCharCode(Hd + 160);
    var Id = function(a, b, c, d) {
        this.hc = a;
        this.Ba = 0;
        this.Fv = b;
        this.Ow = c;
        this.Fu = d ? Fd : Cd;
        this.next = this.dh
    };
    g = Id.prototype;
    g.zs = function() {
        this.next = this.zs;
        return null
    };
    g.Cc = function(a) {
        this.next = function() {
            throw this.Cc(a);
        };
        throw new Jd(a);
    };
    g.Fs = function(a) {
        var b = this.Fu;
        return a.replace(/&(#?)([^\s]+?);/g, function(a, d, e) {
            return d && (d = Number("0" + e), d === d) ? String.fromCharCode(d) : b[a] || a
        })
    };
    g.dh = function() {
        var a = this.vj("<"),
            b;
        0 > a ? (b = this.hc.substring(this.Ba), this.next = this.zs) : (b = this.hc.substring(this.Ba, a), this.Ba = a, this.next = this.jw);
        this.Fv && (b = b.trim());
        return b ? (b = this.Fs(b), {
            type: "text",
            value: b
        }) : this.next()
    };
    g.jw = function() {
        var a = this.fi("<![CDATA[", "]]\x3e", !1, "cdata");
        if (a || (a = this.fi("\x3c!--", "--\x3e", !1, "comment")) || (a = this.fi("<!DOCTYPE", ">", !0, "doctype")) || (a = this.fi("<?XML", "?>", !0, "xml_declaration")) || !this.Ow && (a = this.fi("<?", "?>", !1, "processing_instruction"))) return a;
        if ("/" == this.hc.charAt(this.Ba + 1)) return this.next = this.dh, {
            type: "close",
            value: this.Ut()
        };
        for (a = {
                type: "tag",
                value: this.Vt(),
                attributes: []
            };;) {
            this.uo();
            if (this.Ov()) throw this.Cc("tag");
            if (this.nn(">")) {
                this.next = this.dh;
                break
            }
            if (this.nn("/>")) {
                this.next =
                    this.gu(a.value);
                break
            }
            a.attributes.push({
                name: this.St(),
                value: this.Tt()
            })
        }
        return a
    };
    g.gu = function(a) {
        return function() {
            this.next = this.dh;
            return {
                type: "close",
                value: a
            }
        }
    };
    g.vj = function(a) {
        return this.hc.indexOf(a, this.Ba)
    };
    g.Ov = function() {
        return this.Ba >= this.hc.length
    };
    g.nn = function(a) {
        return this.hc.substr(this.Ba, a.length).toUpperCase() == a ? (this.Ba += a.length, !0) : !1
    };
    g.uo = function() {
        for (var a = this.hc; this.Ba < a.length; this.Ba++) switch (a.charAt(this.Ba)) {
            case " ":
            case "\t":
            case "\r":
            case "\n":
                break;
            default:
                return
        }
    };
    g.fi = function(a, b, c, d) {
        var e = this.Ba;
        if (!this.nn(a)) return null;
        a = this.vj(b);
        if (0 > a) throw this.Cc(d);
        c = c ? this.hc.substring(e, a + b.length) : this.hc.substring(this.Ba, a);
        this.Ba = a + b.length;
        this.next = this.dh;
        return {
            type: d,
            value: c
        }
    };
    g.Vt = function() {
        for (var a = this.hc, b = this.Ba + 1, c = b; c < a.length; c++) switch (a.charAt(c)) {
            case "/":
                if (">" != a.charAt(c + 1)) break;
            case " ":
            case "\t":
            case "\r":
            case "\n":
            case ">":
                if (c == b) throw this.Cc("tag");
                this.Ba = c;
                return a.substring(b, c)
        }
        throw this.Cc("tag");
    };
    g.Ut = function() {
        for (var a = this.hc, b = this.Ba + 2, c = !1, d = b; d < a.length; d++) switch (a.charAt(d)) {
            case " ":
            case "\t":
            case "\r":
            case "\n":
                c = !0;
                break;
            case ">":
                if (d == b) throw this.Cc("close");
                this.Ba = d + 1;
                return a.substring(b, d).trim();
            default:
                if (c) throw this.Cc("close");
        }
        throw this.Cc("close");
    };
    g.St = function() {
        var a = this.vj(">");
        if (0 > a) throw this.Cc("tag");
        var b = this.vj("="),
            c = this.Ba;
        if (0 > b || b == c || b > a) throw this.Cc("attribute");
        this.Ba = b + 1;
        return this.hc.substring(c, b).trim()
    };
    g.Tt = function() {
        this.uo();
        var a = this.hc,
            b = this.Ba,
            c = a.charAt(b++);
        if ('"' == c || "'" == c)
            for (var d = b; d < a.length; d++)
                if (a.charAt(d) == c) return this.Ba = d + 1, this.Fs(a.substring(b, d));
        throw this.Cc("attribute");
    };
    var Jd = function(a) {
        this.type = a
    };
    var Kd = function(a) {
        this.yd = this.Vd = this.Ha = null;
        this.Bg = 0;
        this.o = a || null;
        this.Oh = []
    };
    g = Kd.prototype;
    g.dj = function(a) {
        if (this.yd && a == this.yd.depth) return this.yd;
        if (!this.Ha || this.Ha.depth > a) return this.yd = null;
        for (var b = this.Ha; b.nextSibling && !(b.nextSibling.depth >= a);) b = b.nextSibling;
        b.nextSibling && b.nextSibling.depth == a && (b = b.nextSibling);
        return this.yd = b
    };
    g.Yj = function(a, b) {
        this.gq(a, this.dj(b));
        a.depth = b
    };
    g.gq = function(a, b) {
        b ? (b.nextSibling ? b.nextSibling.rc = a : this.Vd = a, a.rc = b, a.nextSibling = b.nextSibling, b.nextSibling = a) : (this.Ha && (this.Ha.rc = a, a.nextSibling = this.Ha), this.Ha = a, this.Vd || (this.Vd = a));
        a.Fc || ++this.Bg
    };
    g.pg = function(a) {
        this.yd === a && (this.yd = this.yd.nextSibling);
        a.rc ? a.rc.nextSibling = a.nextSibling : this.Ha = a.nextSibling;
        a.nextSibling ? a.nextSibling.rc = a.rc : this.Vd = a.rc;
        a.nextSibling = null;
        a.rc = null;
        a.depth = void 0;
        a.Fc || --this.Bg
    };
    g.Am = function(a, b) {
        this.Yj(a, b);
        Ld(this.o, a)
    };
    g.ur = function(a) {
        return (a = this.Mc(a)) ? this.Fm(a) : null
    };
    g.Fm = function(a) {
        this.pg(a);
        a.Bv(5) ? this.Oh.push(a) : this.hl(a);
        return a
    };
    g.Ju = function(a) {
        for (var b = this.Ha; b;) {
            var c = b,
                b = b.nextSibling;
            c.Fc || a(c) || this.Fm(c)
        }
    };
    g.Mc = function(a) {
        var b = this.dj(a);
        return b && b.depth == a ? b : null
    };
    g.forEach = function(a) {
        for (var b = this.Ha; b;) {
            if (a(b)) return !0;
            b = b.nextSibling
        }
        return !1
    };
    g.Lu = function(a) {
        for (var b = this.Vd; b;) {
            if (a(b)) return !0;
            b = b.rc
        }
        return !1
    };
    g.yp = function(a) {
        for (var b = this.Ha; b;) {
            if (b.getName() == a) return b;
            b = b.nextSibling
        }
        return null
    };
    g.jv = function() {
        return this.Vd ? Math.max(0, this.Vd.depth + 1) : 0
    };
    g.hl = function(a) {
        Md(this.o, a);
        a.ta();
        a.depth = void 0
    };
    g.ta = function() {
        for (; this.Ha;) {
            var a = this.Ha;
            this.pg(a);
            this.hl(a)
        }
    };
    g.me = function() {
        for (var a = this.Ha; a;) a.me(), a = a.nextSibling
    };
    g.ru = function() {
        if (0 < this.Oh.length) {
            for (var a = 0; a < this.Oh.length; a++) this.hl(this.Oh[a]);
            this.Oh = []
        }
    };
    g.ot = function(a) {
        this.o = a.o;
        for (a = this.Ha; a;) Ld(this.o, a), a = a.nextSibling
    };
    g.Kk = function(a, b) {
        this.o && (Md(this.o, a), b && Ld(this.o, a, b))
    };
    g.cn = function(a, b) {
        if (b < a) {
            var c = a;
            a = b;
            b = c
        }
        var c = this.dj(a),
            d = this.dj(b);
        c && c.depth == a ? this.pg(c) : c = null;
        d && d.depth == b ? this.pg(d) : d = null;
        c && this.Yj(c, b);
        d && this.Yj(d, a)
    };
    g.xw = function(a) {
        var b = Math.min(-16384, this.Ha.depth) - 1;
        this.pg(a);
        this.Yj(a, b)
    };
    g.He = function() {
        return this.Bg
    };
    g.Ge = function(a) {
        if (0 > a || a >= this.Bg) return null;
        if (a <= this.Bg - a) {
            for (var b = this.Ha; 1 <= a;) b = b.nextSibling, b.Fc || --a;
            for (; b.Fc;) b = b.nextSibling
        } else {
            b = this.Vd;
            for (a = this.Bg - 1 - a; 1 <= a;) b = b.rc, b.Fc || --a;
            for (; b.Fc;) b = b.rc
        }
        return b
    };
    g.Mf = function(a) {
        for (var b = 0, c = this.Ha; c; c = c.nextSibling) {
            if (c === a) return b;
            c.Fc || ++b
        }
        return -1
    };
    g.Te = function(a, b) {
        var c = this.Ge(b - 1);
        a.depth = NaN;
        this.gq(a, c)
    };
    g.Uh = function(a) {
        this.pg(a)
    };
    var Ld = function(a, b, c) {
            if (a && (c = l(c) ? c : b.getName())) {
                var d = b.i.da();
                b = b.qa() ? b.o : a;
                d.zo(a, c, b)
            }
        },
        Md = function(a, b) {
            if (a) {
                var c = b.getName();
                if (c) {
                    var d = b.i.da(),
                        e = b.qa() ? b.o : a;
                    d.vr(a, c, e)
                }
            }
        };
    Kd.prototype.jm = function(a) {
        var b = new Oc;
        this.forEach(function(c) {
            b.fh(a(c).pb(c.ya()));
            return !1
        });
        return b
    };
    Kd.prototype.Bn = function(a) {
        var b = new Oc;
        this.forEach(function(c) {
            b.fh(a(c));
            return !1
        });
        return b
    };
    var Nd = function(a, b) {
            if (this.wl()) return Function("return (" + a + ")(" + b.join(",") + ");")()
        },
        Od = function() {
            return !0
        },
        Qd = function(a, b, c, d) {
            var e = r.i.wl();
            if (!e) return !1;
            var f = e[a];
            if (!f || f.__swiffy_external) c ? (f = function() {
                try {
                    for (var a = [], e = 0; e < arguments.length; ++e) a.push(Pd(arguments[e]));
                    var f = c.apply(b, a);
                    return Pd(f)
                } catch (q) {
                    return d ? d(q) : null
                }
            }, Object.defineProperty(f, "__swiffy_external", {
                value: !0
            }), e[a] = f) : delete e[a];
            return !0
        },
        Sd = function(a, b, c) {
            var d = a.wl();
            (d = d && d.id) && null != c && Rd(a, "window[" +
                za(d + "_DoFSCommand") + "]", [b, c])
        },
        Rd = function(a, b, c, d) {
            try {
                var e = a.hp(b, c.map(Td));
                return Pd(e)
            } catch (f) {
                if (d) return d(f)
            }
        },
        Td = function(a) {
            switch (ca(a)) {
                case "undefined":
                case "null":
                case "boolean":
                case "number":
                    return String(a);
                case "string":
                    return za(a);
                case "array":
                    return "[" + a.map(Td) + "]";
                case "object":
                    if (a instanceof Date) return "new Date(" + a.getTime() + ")";
                    var b = [],
                        c;
                    for (c in a) b.push(za(c) + ":" + Td(a[c]));
                    return "{" + b.join(",") + "}";
                default:
                    return "null"
            }
        },
        Pd = function(a) {
            switch (ca(a)) {
                case "undefined":
                case "null":
                case "boolean":
                case "number":
                case "string":
                    return a;
                case "array":
                    return a.map(Pd);
                case "object":
                    if (a instanceof Date) return new Date(a.getTime());
                    var b = [],
                        c;
                    for (c in a) b[c] = Pd(a[c]);
                    return b;
                default:
                    return null
            }
        };
    var Ud = function(a) {
        this.Nr = a || null;
        this.Kc = null;
        this.gd = this.fd = 0;
        this.Zc = null;
        this.zq = "";
        this.ym = {};
        this.yq = this.contentType = this.content = null
    };
    Ud.prototype.gv = function() {
        return this.zq || this.Zc || ""
    };
    Ud.prototype.yx = function(a) {
        this.zq = a
    };
    Ud.prototype.Ag = function(a) {
        this.Zc = a
    };
    Ud.prototype.reset = function() {
        this.Kc = null;
        this.gd = this.fd = 0;
        this.Zc = null;
        this.ym = {};
        this.contentType = this.content = null
    };
    var Vd = function(a, b) {
            Object.defineProperty(a, "__swiffy_v", {
                value: b
            })
        },
        x = function(a) {
            return a.__swiffy_v
        };
    var Wd = function() {
            this.sc = null
        },
        $d = [];
    Wd.prototype.vb = function() {
        return new Wd
    };
    var ae = function(a) {
            if (a) {
                for (var b = [], c = 0; c < a.length; ++c) {
                    var d = $d[a[c].type];
                    d && b.push(d(a[c]))
                }
                return b
            }
        },
        be = function(a, b) {
            Vd(a.prototype, {
                Iu: b
            })
        },
        ce = function(a, b) {
            for (var c = [], d = 0; d < a.length; ++d) {
                var e, f = (e = a[d]) && x(e);
                if (e = (f = f && f.Iu) ? f.call(e) : null) c.push(e);
                else if (b) return null
            }
            return c
        };
    Wd.prototype.sm = function() {
        return !1
    };
    Wd.prototype.ua = function() {
        return new Oc(0, 0, 0, 0)
    };
    Wd.prototype.ia = function(a) {
        return a && Object.getPrototypeOf(this) == Object.getPrototypeOf(a)
    };
    var de = function(a, b, c) {
        this.sc = null;
        this.quality = a;
        this.x = b;
        this.y = c
    };
    m(de, Wd);
    $d[2] = function(a) {
        return new de(a.quality, a.x, a.y)
    };
    g = de.prototype;
    g.vb = function() {
        return new de(this.quality, this.x, this.y)
    };
    g.Ip = function() {
        return 0
    };
    g.Jp = function() {
        return 0
    };
    g.Yl = function() {
        return !1
    };
    g.ua = function() {
        var a = new Oc(0, 0, 0, 0),
            b = 0 < this.quality ? Math.ceil(41 * (1 - Math.exp(-this.quality / 3.4))) : 0,
            c = Math.abs(this.x * b),
            b = Math.abs(this.y * b),
            d = this.Ip(),
            e = this.Jp();
        a.kc(d, e, c, b);
        this.Yl() && a.kc(-d, -e, c, b);
        return a
    };
    g.ia = function(a) {
        return de.U.ia.call(this, a) && this.quality == a.quality && this.x == a.x && this.y == a.y
    };
    g.sm = function(a, b) {
        return 1 <= this.quality && 2 < this.x && 2 < this.y && 2 < a && 2 < b && 100 < a * b
    };
    g.accept = function(a) {
        a.un(this)
    };
    var ee = function(a) {
        this.sc = null;
        this.matrix = a
    };
    m(ee, Wd);
    $d[3] = function(a) {
        return new ee(a.matrix)
    };
    ee.prototype.vb = function() {
        return new ee(this.matrix.slice())
    };
    ee.prototype.ia = function(a) {
        return ee.U.ia.call(this, a) && Ka(this.matrix, a.matrix)
    };
    ee.prototype.accept = function(a) {
        a.vn(this)
    };
    var fe = function(a, b, c, d, e, f, h) {
        de.call(this, d, e, f);
        this.angle = a;
        this.distance = b;
        this.strength = c;
        this.fa = h
    };
    m(fe, de);
    var ge = {
            type: "inner",
            knockout: !1,
            jd: "source-atop"
        },
        he = {
            type: "inner",
            knockout: !0,
            jd: "source-in"
        },
        ie = [ge, he, {
            type: "outer",
            knockout: !1,
            jd: "destination-over"
        }, {
            type: "outer",
            knockout: !0,
            jd: "source-out"
        }, {
            type: "full",
            knockout: !1,
            jd: "source-over"
        }, {
            type: "full",
            knockout: !0,
            jd: "copy"
        }],
        ke = function(a, b, c) {
            return je(b ? "inner" : a ? "full" : "outer", c)
        },
        je = function(a, b) {
            for (var c = 0; c < ie.length; ++c)
                if (a == ie[c].type && !!b == ie[c].knockout) return ie[c];
            return b ? he : ge
        };
    fe.prototype.Ip = function() {
        return Math.cos(this.angle) * this.distance * 20
    };
    fe.prototype.Jp = function() {
        return Math.sin(this.angle) * this.distance * 20
    };
    fe.prototype.ia = function(a) {
        return fe.U.ia.call(this, a) && this.angle == a.angle && this.distance == a.distance && this.strength == a.strength && this.fa == a.fa
    };
    fe.prototype.sm = function() {
        return !1
    };
    var le = function(a, b, c, d, e, f, h, k, n) {
        fe.call(this, a, d, e, f, h, k, n);
        this.highlight = b;
        this.shadow = c
    };
    m(le, fe);
    $d[4] = function(a) {
        return new le(a.angle, a.highlight, a.shadow, a.distance, a.strength, a.quality, a.x, a.y, ke(a.onTop, a.inner, a.knockout))
    };
    le.prototype.vb = function() {
        return new le(this.angle, this.highlight, this.shadow, this.distance, this.strength, this.quality, this.x, this.y, this.fa)
    };
    le.prototype.Yl = function() {
        return !0
    };
    le.prototype.ia = function(a) {
        return le.U.ia.call(this, a) && a instanceof le && this.highlight == a.highlight && this.shadow == a.shadow
    };
    le.prototype.accept = function(a) {
        a.tn(this)
    };
    var me = function(a, b, c, d, e, f, h, k) {
        this.sc = null;
        this.bias = a;
        this.clamp = b;
        this.color = c;
        this.divisor = d;
        this.matrix = e;
        this.matrixX = f;
        this.matrixY = h;
        this.preserveAlpha = k
    };
    m(me, Wd);
    $d[5] = function(a) {
        return new me(a.bias, a.clamp, a.color, a.divisor, a.matrix, a.matrixX, a.matrixY, a.preserveAlpha)
    };
    me.prototype.vb = function() {
        return new me(this.bias, this.clamp, this.color, this.divisor, this.matrix, this.matrixX, this.matrixY, this.preserveAlpha)
    };
    me.prototype.ia = function(a) {
        return me.U.ia.call(this, a) && this.bias == a.bias && this.clamp == a.clamp && this.color == a.color && this.divisor == a.divisor && Ka(this.matrix, a.matrix) && this.matrixX == a.matrixX && this.matrixY == a.matrixY && this.preserveAlpha == a.preserveAlpha
    };
    me.prototype.accept = function(a) {
        a.wn(this)
    };
    var ne = function(a, b, c, d, e, f, h, k) {
        fe.call(this, a, c, d, e, f, h, k);
        this.color = b
    };
    m(ne, fe);
    var oe = function(a, b, c) {
        return je(b ? "inner" : a && !c ? "full" : "outer", c || a)
    };
    $d[1] = function(a) {
        return new ne(a.angle, a.color, a.distance, a.strength, a.quality, a.x, a.y, oe(a.hideObject, a.inner, a.knockout))
    };
    ne.prototype.vb = function() {
        return new ne(this.angle, this.color, this.distance, this.strength, this.quality, this.x, this.y, this.fa)
    };
    ne.prototype.ia = function(a) {
        return ne.U.ia.call(this, a) && this.color == a.color
    };
    ne.prototype.accept = function(a) {
        a.xn(this)
    };
    var pe = function(a, b, c, d, e, f, h, k, n, q) {
        fe.call(this, a, e, f, h, k, n, q);
        this.Yb = b;
        this.Xb = c;
        this.Zb = d
    };
    m(pe, fe);
    $d[7] = function(a) {
        for (var b = qe(a.ratios), c = qe(a.colors), d = Array(c.length), e = 0; e < c.length; ++e) d[e] = (c[e] >>> 24) / 255, c[e] &= 16777215;
        return new pe(a.angle, c, d, b, a.distance, a.strength, a.quality, a.x, a.y, ke(a.onTop, a.inner, a.knockout))
    };
    pe.prototype.vb = function() {
        return new pe(this.angle, this.Yb, this.Xb, this.Zb, this.distance, this.strength, this.quality, this.x, this.y, this.fa)
    };
    pe.prototype.Yl = function() {
        return !0
    };
    pe.prototype.ia = function(a) {
        return pe.U.ia.call(this, a) && Ka(this.Yb, a.Yb) && Ka(this.Xb, a.Xb) && Ka(this.Zb, a.Zb)
    };
    pe.prototype.accept = function(a) {
        a.yn(this)
    };
    var re = function(a, b, c, d, e, f, h, k, n, q) {
        fe.call(this, a, e, f, h, k, n, q);
        this.Yb = b;
        this.Xb = c;
        this.Zb = d
    };
    m(re, fe);
    $d[6] = function(a) {
        for (var b = qe(a.ratios), c = qe(a.colors), d = Array(c.length), e = 0; e < c.length; ++e) d[e] = (c[e] >>> 24) / 255, c[e] &= 16777215;
        return new re(a.angle, c, d, b, a.distance, a.strength, a.quality, a.x, a.y, ke(a.onTop, a.inner, a.knockout))
    };
    re.prototype.vb = function() {
        return new re(this.angle, this.Yb, this.Xb, this.Zb, this.distance, this.strength, this.quality, this.x, this.y, this.fa)
    };
    re.prototype.ia = function(a) {
        return re.U.ia.call(this, a) && Ka(this.Yb, a.Yb) && Ka(this.Xb, a.Xb) && Ka(this.Zb, a.Zb)
    };
    re.prototype.accept = function(a) {
        a.zn(this)
    };
    var se = function() {
        this.Gc = 1;
        this.je = this.Zd = 0;
        this.volume = this.Wc = 1
    };
    se.prototype.Cd = function(a) {
        this.Gc = a.Gc;
        this.Zd = a.Zd;
        this.je = a.je;
        this.Wc = a.Wc;
        this.volume = a.volume
    };
    var te = function() {
        this.rs = [];
        this.tf = [];
        this.lb = new se
    };
    g = te.prototype;
    g.fx = function(a) {
        this.rs[a.id] = a
    };
    g.Sk = function(a, b, c, d, e) {
        var f = new Audio(a.sound),
            h = new ue(this, b, a, f);
        this.tf.push(h);
        var k = function() {
            f.currentTime = d / 1E3;
            f.play()
        };
        Fb(f, "canplaythrough", k);
        yb(f, "ended", function() {
            0 < --e ? k() : (h.remove(), ia(c) && c())
        });
        return h
    };
    g.xs = function(a, b) {
        var c = this.rs[a];
        c && this.Sk(c, b, null, 0, 0)
    };
    g.an = function(a, b) {
        var c = this.tf;
        a = a || this.lb;
        for (var d = c.length - 1; 0 <= d; d--) {
            var e = c[d];
            b ? e.$h === b && e.lb === a && e.remove() : this.lb !== a && e.lb !== a || e.remove()
        }
    };
    g.ai = function() {
        for (var a = 0; a < this.tf.length; a++) this.tf[a].ai()
    };
    var ue = function(a, b, c, d) {
        this.Um = a;
        this.lb = b;
        this.$h = c;
        this.Pl = d;
        this.ai()
    };
    ue.prototype.remove = function() {
        this.Pl.pause();
        Ib(this.Pl);
        this.Um.tf.splice(this.Um.tf.indexOf(this), 1)
    };
    ue.prototype.ai = function() {
        var a = this.Um.lb,
            b = a.volume;
        this.lb !== a && (b *= this.lb.volume);
        this.Pl.volume = 0 > b ? 0 : 1 < b ? 1 : b
    };
    var ve = function(a, b, c) {
        this.i = a;
        this.definition = b;
        this.o = c || this.oa();
        this.o.__swiffy_d = this;
        this.o.__swiffy_child_ref = {}
    };
    ve.prototype.na = function(a, b) {
        this.i.da().na(this, a, b)
    };
    ve.prototype.ah = function() {};
    ve.prototype.Kf = function() {};
    var y = function(a) {
        return a.__swiffy_d
    };
    var we = function(a, b, c) {
        ve.call(this, b, a, c)
    };
    m(we, ve);
    var xe = function() {
            this.color = this.bold = this.Ra = null;
            this.ff = !1;
            this.letterSpacing = this.cc = this.leading = this.leftMargin = this.rightMargin = this.indent = this.target = this.url = this.Ds = this.bo = this.Db = this.Ua = this.size = this.italic = this.font = null
        },
        ye = function() {
            var a = new xe;
            a.bold = !1;
            a.italic = !1;
            a.Db = !1;
            a.font = "_serif";
            a.color = 0;
            a.size = 240;
            a.indent = 0;
            a.Ua = 0;
            a.rightMargin = 0;
            a.leftMargin = 0;
            a.leading = 0;
            a.Ra = 0;
            a.cc = !1;
            a.letterSpacing = 0;
            return a
        },
        Ae = function(a) {
            var b = ye(),
                c = a.font && a.font.get();
            c instanceof ze &&
                (b.font = c);
            l(a.color) && (b.color = 16777215 & a.color);
            l(a.height) && (b.size = a.height);
            l(a.indent) && (b.indent = a.indent);
            l(a.align) && (b.Ra = a.align);
            l(a.leftMargin) && (b.leftMargin = a.leftMargin);
            l(a.rightMargin) && (b.rightMargin = a.rightMargin);
            l(a.leading) && (b.leading = a.leading);
            return b
        },
        Be = function(a) {
            var b = new xe;
            b.color = a;
            b.ff = !0;
            return b
        };
    g = xe.prototype;
    g.Cd = function(a) {
        this.ff = a.ff;
        null != a.color && (this.color = a.color, this.ff = !0);
        this.bold = null != a.bold ? a.bold : this.bold;
        this.font = null != a.font ? a.font : this.font;
        this.italic = null != a.italic ? a.italic : this.italic;
        this.size = null != a.size ? a.size : this.size;
        this.Db = null != a.Db ? a.Db : this.Db;
        this.Ra = null != a.Ra ? a.Ra : this.Ra;
        this.target = null != a.target ? a.target : this.target;
        this.url = null != a.url ? a.url : this.url;
        this.indent = null != a.indent ? a.indent : this.indent;
        this.Ua = null != a.Ua ? a.Ua : this.Ua;
        this.rightMargin = null != a.rightMargin ?
            a.rightMargin : this.rightMargin;
        this.leftMargin = null != a.leftMargin ? a.leftMargin : this.leftMargin;
        this.leading = null != a.leading ? a.leading : this.leading;
        this.cc = null != a.cc ? a.cc : this.cc;
        this.letterSpacing = null != a.letterSpacing ? a.letterSpacing : this.letterSpacing
    };
    g.Fh = function() {
        return !!this.font && this.font instanceof ze
    };
    g.Ol = function() {
        return !!this.font && this.font instanceof ze && (0 < this.font.glyphs.length || this.font == Ce)
    };
    g.zp = function() {
        return this.font instanceof ze && (0 < this.font.glyphs.length || this.font == Ce) ? this.font : null
    };
    g.clone = function() {
        var a = new xe;
        a.bold = this.bold;
        a.color = this.color;
        a.font = this.font;
        a.italic = this.italic;
        a.size = this.size;
        a.Db = this.Db;
        a.ff = this.ff;
        a.Ra = this.Ra;
        a.url = this.url;
        a.target = this.target;
        a.indent = this.indent;
        a.Ua = this.Ua;
        a.rightMargin = this.rightMargin;
        a.leftMargin = this.leftMargin;
        a.leading = this.leading;
        a.cc = this.cc;
        a.letterSpacing = this.letterSpacing;
        return a
    };
    g.mw = function(a) {
        this.bold = this.bold == a.bold ? this.bold : null;
        this.color = this.color == a.color ? this.color : null;
        this.font = this.font == a.font ? this.font : null;
        this.italic = this.italic == a.italic ? this.italic : null;
        this.size = this.size == a.size ? this.size : null;
        this.Db = this.Db == a.Db ? this.Db : null;
        this.Ra = this.Ra == a.Ra ? this.Ra : null;
        this.url = this.url == a.url ? this.url : null;
        this.target = this.target == a.target ? this.target : null;
        this.cc = this.cc == a.cc ? this.cc : null;
        this.indent = this.indent == a.indent ? this.indent : null;
        this.Ua = this.Ua ==
            a.Ua ? this.Ua : null;
        this.rightMargin = this.rightMargin == a.rightMargin ? this.rightMargin : null;
        this.leftMargin = this.leftMargin == a.leftMargin ? this.leftMargin : null;
        this.leading = this.leading == a.leading ? this.leading : null;
        this.letterSpacing = this.letterSpacing == a.letterSpacing ? this.letterSpacing : null
    };
    var De = {
        _sans: "Arial, Helvetica, sans-serif",
        _serif: "Times, serif",
        _typewriter: "monospace"
    };
    xe.prototype.yc = function(a) {
        var b = "";
        this.bold && (b += "bold ");
        this.italic && (b += "italic ");
        var c = this.font instanceof ze ? this.font.name : this.font;
        a.font = b + this.size + "px " + (De[c] || '"' + c + '", sans-serif')
    };
    var Ee = function(a) {
            if (null == a) return null;
            a = Math.round(Number(a));
            a != a && (a = -2147483648);
            return 20 * a
        },
        Fe = function(a) {
            return null == a ? null : a / 20
        },
        Ge = function(a) {
            if (null == a) return null;
            switch (String(a)) {
                case "left":
                    return 0;
                case "center":
                    return 2;
                case "right":
                    return 1;
                case "justify":
                    return 3
            }
        },
        He = function() {
            switch (x(this).Ra) {
                case 0:
                    return "left";
                case 2:
                    return "center";
                case 1:
                    return "right";
                case 3:
                    return "justify";
                default:
                    return null
            }
        },
        Ie = function(a) {
            a = Ge(a);
            if (!l(a)) return !1;
            x(this).Ra = a;
            return !0
        },
        Je = function() {
            return Fe(x(this).Ua)
        },
        Ke = function(a) {
            x(this).Ua = Ee(a)
        },
        Le = function() {
            return x(this).bold
        },
        Me = function(a) {
            x(this).bold = null == a ? null : !!a
        },
        Ne = function() {
            return x(this).bo
        },
        Oe = function(a) {
            x(this).bo = null == a ? null : !!a
        },
        Pe = function() {
            var a = x(this).color;
            return null == a ? null : a & 16777215
        },
        Qe = function(a) {
            x(this).color = null == a ? null : Number(a) & 16777215
        },
        Re = function() {
            var a = x(this).font;
            a instanceof ze && (a = a.name);
            return a
        },
        Se = function(a) {
            x(this).font = null == a ? null : String(a)
        },
        Te = function() {
            return Fe(x(this).indent)
        },
        Ue = function(a) {
            x(this).indent =
                Ee(a)
        },
        Ve = function() {
            return x(this).italic
        },
        We = function(a) {
            x(this).italic = null == a ? null : !!a
        },
        Xe = function() {
            return x(this).cc
        },
        Ye = function(a) {
            x(this).cc = null == a ? null : !!a
        },
        Ze = function() {
            return Fe(x(this).leading)
        },
        $e = function(a) {
            x(this).leading = Ee(a)
        },
        af = function() {
            return Fe(x(this).leftMargin)
        },
        bf = function(a) {
            x(this).leftMargin = Ee(a)
        },
        cf = function() {
            return Fe(x(this).letterSpacing)
        },
        df = function(a) {
            null == a ? a = null : (a = Number(a), a != a && (a = -2147483648), a *= 20);
            x(this).letterSpacing = a
        },
        ef = function() {
            return Fe(x(this).rightMargin)
        },
        ff = function(a) {
            x(this).rightMargin = Ee(a)
        },
        gf = function() {
            return Fe(x(this).size)
        },
        hf = function(a) {
            x(this).size = Ee(a)
        },
        jf = function() {
            return x(this).target
        },
        kf = function(a) {
            x(this).target = null == a ? null : String(a)
        },
        lf = function() {
            var a = x(this).Ds;
            return a && a.map(Fe)
        },
        mf = function(a) {
            var b = null;
            if (a && a.length)
                for (var b = [], c = 0; c < a.length; ++c) b.push(Ee(a[c]) | 0);
            x(this).Ds = b
        },
        nf = function() {
            return x(this).Db
        },
        of = function(a) {
            x(this).Db = null == a ? null : !!a
        },
        pf = function() {
            return x(this).url
        },
        qf = function(a) {
            x(this).url =
                null == a ? null : String(a)
        };
    var rf = function() {
            this.or = [];
            this.us = null
        },
        sf = {},
        tf = function(a) {
            var b = new rf(a);
            return sf["swiffy." + a] = b
        };
    g = rf.prototype;
    g.al = function(a) {
        return new(this.or[uf(a.constructor)])(a)
    };
    g.hu = function(a) {
        return new this.us(a)
    };
    g.bx = function(a) {
        a.prototype.Hu = this
    };
    g.Pv = function(a) {
        return !!a && a.Hu === this
    };
    g.La = function(a, b) {
        this.bx(b);
        this.or[uf(a)] = b
    };
    g.nr = function(a) {
        this.us = a
    };
    var vf = [],
        uf = function(a) {
            l(a.Ar) || (a.Ar = vf.length, vf.push(a));
            return a.Ar
        };
    var wf = function(a) {
        this.lw = a;
        this.Qh = {};
        this.kj = this.Vg = 0
    };
    wf.prototype.Aa = function(a) {
        if (a = this.Qh[a]) a.bm = this.kj;
        return a
    };
    wf.prototype.Bt = function() {
        return this.Vg < this.lw
    };
    wf.prototype.add = function(a, b) {
        this.Qh[a] = b;
        this.Vg += b.Mp();
        b.bm = this.kj
    };
    wf.prototype.Lk = function() {
        for (var a in this.Qh) {
            var b = this.Qh[a];
            6 < this.kj - b.bm && (this.Vg -= b.Mp(), b.Rd.od(), delete this.Qh[a])
        }
        this.kj++
    };
    var xf = function(a, b, c) {
        this.Rd = a;
        this.vt = b;
        this.Ok = c;
        this.bm = 0;
        this.Cw = !0
    };
    xf.prototype.Mp = function() {
        return this.Rd.I() * this.Rd.S()
    };
    var yf = tf("CANVAS");
    var zf = function(a, b, c, d) {
            for (var e = a.length, f = 0; f < e; f += 4) {
                var h = a[f + 3] * d,
                    k = b[f + 3];
                b[f + 3] = h + k - h * k / 255;
                var n = 1 / (255 * b[f + 3]);
                b[f + 0] = n * (c(a[f + 0], b[f + 0]) * h * k + a[f + 0] * h * (255 - k) + b[f + 0] * k * (255 - h));
                b[f + 1] = n * (c(a[f + 1], b[f + 1]) * h * k + a[f + 1] * h * (255 - k) + b[f + 1] * k * (255 - h));
                b[f + 2] = n * (c(a[f + 2], b[f + 2]) * h * k + a[f + 2] * h * (255 - k) + b[f + 2] * k * (255 - h))
            }
        },
        Af = function(a, b, c, d) {
            for (var e = a.length, f = 0; f < e; f += 4) {
                var h = a[f + 3] * d,
                    k = b[f + 3];
                if (0 < k) {
                    var n = Math.min(255, h + k | 0);
                    b[f + 3] = n;
                    n = 1 / n;
                    h *= c;
                    b[f + 0] = (b[f + 0] * k + a[f + 0] * h) * n;
                    b[f + 1] = (b[f + 1] * k + a[f +
                        1] * h) * n;
                    b[f + 2] = (b[f + 2] * k + a[f + 2] * h) * n
                } else b[f + 0] = a[f + 0], b[f + 1] = a[f + 1], b[f + 2] = a[f + 2], b[f + 3] = h
            }
        },
        Bf = function(a, b, c) {
            for (var d = a.length, e = 0; e < d; e += 4) {
                var f = a[e + 3] * c;
                0 < b[e + 3] ? (b[e + 0] = b[e + 0] * (1 - 2 / 255 * f) + f, b[e + 1] = b[e + 1] * (1 - 2 / 255 * f) + f, b[e + 2] = b[e + 2] * (1 - 2 / 255 * f) + f) : (b[e + 0] = a[e + 0], b[e + 1] = a[e + 1], b[e + 2] = a[e + 2], b[e + 3] = f)
            }
        },
        Cf = [, , function(a, b) {
            return a * b / 255
        }, function(a, b) {
            return a + b - a * b / 255
        }];
    Cf[5] = Math.min;
    Cf[4] = Math.max;
    Cf[13] = function(a, b) {
        return 127 >= a ? 2 * a * b / 255 : 2 * (a + b - a * b / 255) - 255
    };
    Cf[12] = function(a, b) {
        return 127 >= b ? 2 * b * a / 255 : 2 * (b + a - b * a / 255) - 255
    };
    Cf[6] = function(a, b) {
        return Math.abs(a - b)
    };
    var Df = function(a, b, c, d) {
        var e = Cf[c];
        if (!e) switch (e = 1, c) {
            case 8:
                e = -1;
            case 7:
                Af(a, b, e, d);
                return;
            case 9:
                Bf(a, b, d);
                return;
            default:
                e = function(a) {
                    return a
                }
        }
        zf(a, b, e, d)
    };
    var Ef = function(a, b, c, d, e, f, h, k, n) {
            for (var q = 0, u = 0; u < n; ++u) {
                for (var p = 0, t = 0, v = 0, w = 0, A = u * k * 4, B = A, F = 0; F < h; ++F) t += a[B + 0], v += a[B + 1], w += a[B + 2], p += a[B + 3], B += 4;
                for (var G = q, F = 0; F < f; ++F) b[G + 0] = t * e, b[G + 1] = v * e, b[G + 2] = w * e, b[G + 3] = p * e, F + h < k && (t += a[B + 0], v += a[B + 1], w += a[B + 2], p += a[B + 3], B += 4), G += c;
                for (; F + h + 4 <= k; F += 4) b[G + 0] = t * e, b[G + 1] = v * e, b[G + 2] = w * e, b[G + 3] = p * e, G += c, t += a[B + 0] - a[A + 0], v += a[B + 1] - a[A + 1], w += a[B + 2] - a[A + 2], p += a[B + 3] - a[A + 3], b[G + 0] = t * e, b[G + 1] = v * e, b[G + 2] = w * e, b[G + 3] = p * e, G += c, t += a[B + 4] - a[A + 4], v += a[B + 5] - a[A + 5], w +=
                    a[B + 6] - a[A + 6], p += a[B + 7] - a[A + 7], b[G + 0] = t * e, b[G + 1] = v * e, b[G + 2] = w * e, b[G + 3] = p * e, G += c, t += a[B + 8] - a[A + 8], v += a[B + 9] - a[A + 9], w += a[B + 10] - a[A + 10], p += a[B + 11] - a[A + 11], b[G + 0] = t * e, b[G + 1] = v * e, b[G + 2] = w * e, b[G + 3] = p * e, G += c, t += a[B + 12] - a[A + 12], v += a[B + 13] - a[A + 13], w += a[B + 14] - a[A + 14], p += a[B + 15] - a[A + 15], A += 16, B += 16;
                for (; F + h < k; ++F) b[G + 0] = t * e, b[G + 1] = v * e, b[G + 2] = w * e, b[G + 3] = p * e, t += a[B + 0] - a[A + 0], v += a[B + 1] - a[A + 1], w += a[B + 2] - a[A + 2], p += a[B + 3] - a[A + 3], A += 4, B += 4, G += c;
                for (; F < k; ++F) b[G + 0] = t * e, b[G + 1] = v * e, b[G + 2] = w * e, b[G + 3] = p * e, t -= a[A + 0], v -=
                    a[A + 1], w -= a[A + 2], p -= a[A + 3], A += 4, G += c;
                q += d
            }
        },
        Ff = function(a, b, c, d, e, f, h, k, n) {
            var q = 0;
            e /= 255;
            for (var u = 0; u < n; ++u) {
                for (var p = 0, t = 0, v = 0, w = 0, A = u * k * 4, B = A, F, G = 0; G < h; ++G) F = a[B + 3], t += a[B + 0] * F, v += a[B + 1] * F, w += a[B + 2] * F, p += 255 * F, B += 4;
                for (var K = q, G = 0; G < f; ++G) b[K + 0] = t * e, b[K + 1] = v * e, b[K + 2] = w * e, b[K + 3] = p * e, G + h < k && (F = a[B + 3], t += a[B + 0] * F, v += a[B + 1] * F, w += a[B + 2] * F, p += 255 * F, B += 4), K += c;
                for (; G + h + 4 <= k; G += 4) b[K + 0] = t * e, b[K + 1] = v * e, b[K + 2] = w * e, b[K + 3] = p * e, K += c, F = a[B + 3], t += a[B + 0] * F, v += a[B + 1] * F, w += a[B + 2] * F, p += 255 * F, F = a[A + 3], t -= a[A + 0] *
                    F, v -= a[A + 1] * F, w -= a[A + 2] * F, p -= 255 * F, b[K + 0] = t * e, b[K + 1] = v * e, b[K + 2] = w * e, b[K + 3] = p * e, K += c, F = a[B + 7], t += a[B + 4] * F, v += a[B + 5] * F, w += a[B + 6] * F, p += 255 * F, F = a[A + 7], t -= a[A + 4] * F, v -= a[A + 5] * F, w -= a[A + 6] * F, p -= 255 * F, b[K + 0] = t * e, b[K + 1] = v * e, b[K + 2] = w * e, b[K + 3] = p * e, K += c, F = a[B + 11], t += a[B + 8] * F, v += a[B + 9] * F, w += a[B + 10] * F, p += 255 * F, F = a[A + 11], t -= a[A + 8] * F, v -= a[A + 9] * F, w -= a[A + 10] * F, p -= 255 * F, b[K + 0] = t * e, b[K + 1] = v * e, b[K + 2] = w * e, b[K + 3] = p * e, K += c, F = a[B + 15], t += a[B + 12] * F, v += a[B + 13] * F, w += a[B + 14] * F, p += 255 * F, F = a[A + 15], t -= a[A + 12] * F, v -= a[A + 13] * F, w -= a[A +
                        14] * F, p -= 255 * F, A += 16, B += 16;
                for (; G + h < k; ++G) b[K + 0] = t * e, b[K + 1] = v * e, b[K + 2] = w * e, b[K + 3] = p * e, F = a[B + 3], t += a[B + 0] * F, v += a[B + 1] * F, w += a[B + 2] * F, p += 255 * F, F = a[A + 3], t -= a[A + 0] * F, v -= a[A + 1] * F, w -= a[A + 2] * F, p -= 255 * F, A += 4, B += 4, K += c;
                for (; G < k; ++G) b[K + 0] = t * e, b[K + 1] = v * e, b[K + 2] = w * e, b[K + 3] = p * e, F = a[A + 3], t -= a[A + 0] * F, v -= a[A + 1] * F, w -= a[A + 2] * F, p -= 255 * F, A += 4, K += c;
                q += d
            }
        },
        Gf = function(a, b, c, d, e, f, h, k, n) {
            for (var q = 0, u = 0; u < n; ++u) {
                for (var p = 0, t = 0, v = 0, w = 0, A = u * k * 4, B = A, F = 0; F < h; ++F) t += a[B + 0], v += a[B + 1], w += a[B + 2], p += a[B + 3], B += 4;
                for (var G = q, K, F =
                        0; F < f; ++F) K = 255 / p, b[G + 0] = t * K, b[G + 1] = v * K, b[G + 2] = w * K, b[G + 3] = p * e, F + h < k && (t += a[B + 0], v += a[B + 1], w += a[B + 2], p += a[B + 3], B += 4), G += c;
                for (; F + h + 4 <= k; F += 4) K = 255 / p, b[G + 0] = t * K, b[G + 1] = v * K, b[G + 2] = w * K, b[G + 3] = p * e, G += c, t += a[B + 0] - a[A + 0], v += a[B + 1] - a[A + 1], w += a[B + 2] - a[A + 2], p += a[B + 3] - a[A + 3], K = 255 / p, b[G + 0] = t * K, b[G + 1] = v * K, b[G + 2] = w * K, b[G + 3] = p * e, G += c, t += a[B + 4] - a[A + 4], v += a[B + 5] - a[A + 5], w += a[B + 6] - a[A + 6], p += a[B + 7] - a[A + 7], K = 255 / p, b[G + 0] = t * K, b[G + 1] = v * K, b[G + 2] = w * K, b[G + 3] = p * e, G += c, t += a[B + 8] - a[A + 8], v += a[B + 9] - a[A + 9], w += a[B + 10] - a[A + 10], p +=
                    a[B + 11] - a[A + 11], K = 255 / p, b[G + 0] = t * K, b[G + 1] = v * K, b[G + 2] = w * K, b[G + 3] = p * e, G += c, t += a[B + 12] - a[A + 12], v += a[B + 13] - a[A + 13], w += a[B + 14] - a[A + 14], p += a[B + 15] - a[A + 15], A += 16, B += 16;
                for (; F + h < k; ++F) K = 255 / p, b[G + 0] = t * K, b[G + 1] = v * K, b[G + 2] = w * K, b[G + 3] = p * e, t += a[B + 0] - a[A + 0], v += a[B + 1] - a[A + 1], w += a[B + 2] - a[A + 2], p += a[B + 3] - a[A + 3], A += 4, B += 4, G += c;
                for (; F < k; ++F) K = 255 / p, b[G + 0] = t * K, b[G + 1] = v * K, b[G + 2] = w * K, b[G + 3] = p * e, t -= a[A + 0], v -= a[A + 1], w -= a[A + 2], p -= a[A + 3], A += 4, G += c;
                q += d
            }
        };
    var Hf = function(a, b, c, d, e, f, h, k, n, q) {
            for (var u = 0; u < q; ++u) {
                for (var p = 0, t = u * n * 4 + b, v = t, w = 0; w < k; ++w) p += a[v], v += 4;
                for (var A = c, w = 0; w < h; ++w) a[A] = p * f, w + k < n && (p += a[v], v += 4), A += d;
                for (; w + k + 4 <= n; w += 4) a[A] = p * f, A += d, p += a[v] - a[t], a[A] = p * f, A += d, p += a[v + 4] - a[t + 4], a[A] = p * f, A += d, p += a[v + 8] - a[t + 8], a[A] = p * f, A += d, p += a[v + 12] - a[t + 12], t += 16, v += 16;
                for (; w + k < n; ++w) a[A] = p * f, p += a[v] - a[t], t += 4, v += 4, A += d;
                for (; w < n; ++w) a[A] = p * f, p -= a[t], t += 4, A += d;
                c += e
            }
        },
        If = function(a, b, c, d, e, f, h, k) {
            e = Math.max(a.x * e | 0, 1);
            f = Math.max(a.y * f | 0, 1);
            a = a.quality;
            if (0 < a && 1 < e * f) {
                for (var n = a & 1, q, u, p = 3, t = 2, v = 1; v < a; ++v) q = (e - n) / 2 | 0, u = e - q, Hf(b, p, t, 4, 4 * c, 1 / e, q, u, c, d), n ^= 1, q = p, p = t, t = q;
                a & 1 && (e = e - 1 | 1);
                q = (e - n) / 2 | 0;
                Hf(b, p, t, 4 * d, 4, 1 / e, q, e - q, c, d);
                q = p;
                p = t;
                t = q;
                n = a & 1;
                for (v = 1; v < a; ++v) q = (f - n) / 2 | 0, u = f - q, Hf(b, p, t, 4, 4 * d, 1 / f, q, u, d, c), n ^= 1, q = p, p = t, t = q;
                a & 1 && (f = f - 1 | 1);
                q = (f - n) / 2 | 0;
                Hf(b, p, h, 4 * c, 4, k / f, q, f - q, d, c)
            } else
                for (e = 3; e < c * d * 4; e += 4, h += 4) b[h] = b[e] * k
        },
        Jf = function(a, b, c, d, e, f) {
            If(a, b, c, d, e, f, 1, 1);
            var h = a.distance;
            e = Math.round(Math.cos(a.angle) * h * e);
            f = Math.round(Math.sin(a.angle) * h *
                f);
            a = a.strength;
            a *= .5;
            for (h = 0; h < d; ++h)
                for (var k = 0; k < c; ++k) {
                    var n = 0,
                        q = 0;
                    0 <= k + e && k + e < c && 0 <= h + f && h + f < d && (n = b[4 * ((h + f) * c + k + e) + 1]);
                    0 <= k - e && k - e < c && 0 <= h - f && h - f < d && (q = b[4 * ((h - f) * c + k - e) + 1]);
                    b[4 * (h * c + k) + 3] = (n - q) * a + 127.5
                }
        },
        Lf = function(a, b, c, d) {
            for (var e = new Uint8Array(1024), f = 0, h = Kf(b[f]), k = c[f], n = d[f], q = 0, u = h, p = k, t = 0; 256 > t; ++t) {
                if (t >= n && (u = h, p = k, q = n, ++f < d.length ? (h = Kf(b[f]), k = c[f], n = d[f]) : n = 255, t == q)) {
                    e[4 * t + 0] = u.r;
                    e[4 * t + 1] = u.Jb;
                    e[4 * t + 2] = u.Fb;
                    e[4 * t + 3] = 255 * p;
                    continue
                }
                var v = (t - q) / (n - q);
                e[4 * t + 0] = u.r + (h.r - u.r) *
                    v;
                e[4 * t + 1] = u.Jb + (h.Jb - u.Jb) * v;
                e[4 * t + 2] = u.Fb + (h.Fb - u.Fb) * v;
                e[4 * t + 3] = 255 * (p + (k - p) * v)
            }
            b = a.length;
            for (c = 0; c < b; c += 4) d = 4 * a[c + 3], a[c + 0] = e[d + 0], a[c + 1] = e[d + 1], a[c + 2] = e[d + 2], a[c + 3] = e[d + 3]
        };
    var Mf = tf("NUL");
    var Nf = function(a, b, c) {
        this.gridFit = a;
        this.thickness = b;
        this.sharpness = c
    };
    var Of = function() {};
    Of.prototype.pc = function() {};
    var Pf = [],
        Qf = function(a, b) {
            Pf[a] = b
        },
        Rf = function(a, b) {
            Qf(a, function(a, d, e, f, h, k) {
                b(a, d, e, k).pc(f, d, e.wc, h)
            })
        };
    var Tf = function(a) {
        this.id = a;
        this.nk = null;
        this.gm = "";
        this.hi = Sf++
    };
    m(Tf, Of);
    var Sf = 1;
    Tf.prototype.qa = !1;
    Tf.prototype.zd = function() {};
    Tf.prototype.ub = function() {
        return null
    };
    Tf.prototype.pc = function(a, b, c) {
        c.dr(this)
    };
    var Uf = function(a, b, c) {
        Tf.call(this, a);
        this.sound = b;
        this.format = c
    };
    m(Uf, Tf);
    Rf(11, function(a) {
        return new Uf(a.id, a.data, a.format)
    });
    Uf.prototype.pc = function(a, b, c, d) {
        Uf.U.pc.call(this, a, b, c, d);
        b.Dh().nc().fx(this)
    };
    Pf[18] = function(a, b) {
        b.jr(a)
    };
    Pf[15] = function(a, b, c, d, e) {
        d.fc.ft(e, a.label)
    };
    Pf[19] = function(a, b, c) {
        for (var d = 0; d < a.references.length; d++) b.ls(c.wc, a.references[d])
    };
    var Vf = function() {
        this.ld = []
    };
    g = Vf.prototype;
    g.fq = function(a) {
        var b = this.ld;
        b.push(a);
        this.yw(b.length - 1)
    };
    g.remove = function() {
        var a = this.ld,
            b = a.length,
            c = a[0];
        if (!(0 >= b)) return 1 == b ? this.ld = [] : (a[0] = a.pop(), this.ww(0)), c
    };
    g.Nw = function() {
        return 0 == this.ld.length ? void 0 : this.ld[0]
    };
    g.ww = function(a) {
        for (var b = this.ld, c = b.length, d = b[a]; 2 * a + 1 < c;) {
            var e = 2 * a + 1,
                f = e + 1,
                e = f < c && 0 > b[f].compare(b[e]) ? f : e;
            if (0 > d.compare(b[e])) break;
            b[a] = b[e];
            a = e
        }
        b[a] = d
    };
    g.yw = function(a) {
        for (var b = this.ld, c = b[a]; 0 < a;) {
            var d = Math.floor((a - 1) / 2);
            if (0 > c.compare(b[d])) b[a] = b[d], a = d;
            else break
        }
        b[a] = c
    };
    g.Wa = function() {
        return 0 == this.ld.length
    };
    var Wf = new Vf,
        Xf = 0,
        Zf = function(a, b) {
            return Yf(a, b, !1)
        },
        $f = function(a, b) {
            return Yf(a, b, !0)
        },
        Yf = function(a, b, c) {
            b = Math.max(b | 0, 1);
            var d = Date.now() + b,
                e = Xf++;
            Wf.fq(new ag(d, a, e, c ? b : void 0));
            return e
        },
        bg = function(a) {
            for (var b = Wf.ld, c = 0; c < b.length; ++c)
                if (b[c].id == a) {
                    b[c].Mk = !0;
                    break
                }
        },
        cg = function() {
            if (!Wf.Wa() && Wf.Nw().time <= Date.now()) {
                var a = Wf.remove();
                a.Mk || (l(a.interval) && !a.Mk && (a.time += a.interval, Wf.fq(a)), a.Nu.apply(window));
                Wf.Wa() || window.setTimeout(cg, 0)
            }
        },
        ag = function(a, b, c, d) {
            this.time = a;
            this.Nu =
                b;
            this.id = c;
            this.interval = d;
            this.Mk = !1
        };
    ag.prototype.compare = function(a) {
        var b = this.time - a.time;
        return 0 == b ? this.id - a.id : b
    };
    var dg = function(a, b, c) {
        this.jj = a ? a : 60;
        this.kw = b;
        this.ja = c;
        this.rg = 0;
        this.hn = !1;
        this.qd = 0;
        this.Gw = ma(this.Fw, this);
        this.Xj = ma(this.Hw, this);
        this.wh = this.hj = 0;
        this.ju = Date.now();
        yb(document, "visibilitychange", dg.prototype.Iw, !1, this)
    };
    g = dg.prototype;
    g.vx = function(a) {
        this.jj = a
    };
    g.start = function() {
        this.qd || (this.qd = window.setTimeout(this.Xj, 0))
    };
    g.stop = function() {
        window.clearTimeout(this.qd);
        this.qd = 0;
        ld(this.rg);
        this.rg = 0
    };
    g.Iw = function() {
        document.hidden ? this.stop() : this.start()
    };
    g.pd = function() {
        this.rg || this.wh || (this.rg = kd(this.Gw))
    };
    g.Hw = function() {
        if (!dd && this.ja.Tp().Wa()) this.qd = window.setTimeout(this.Xj, 50);
        else if (this.hn && this.rg) this.qd = 0;
        else {
            var a = 0 < this.wh ? 1 : 1E3 / this.jj;
            this.hj += a % 1;
            1 < this.hj && (--this.hj, a += 1);
            this.qd = window.setTimeout(this.Xj, a);
            Wf.Wa() || window.setTimeout(cg, 0);
            this.ja.tick();
            this.wh ? this.wh-- : (this.hn = !0, this.pd())
        }
    };
    g.Fw = function() {
        this.hn = !1;
        var a = 1E3 / this.jj,
            b = Date.now();
        this.ja.bk();
        this.wh = Math.min(Math.floor((Date.now() - b) / a), this.kw);
        this.rg = 0;
        this.qd || (this.qd = window.setTimeout(this.Xj, 1))
    };
    var eg = function(a, b, c, d, e, f, h) {
            switch (arguments.length) {
                case 0:
                    return new Date(Date.now());
                case 1:
                    return new Date(a);
                default:
                    return new Date(a, b, l(c) ? c : 1, l(d) ? d : 0, l(e) ? e : 0, l(f) ? f : 0, l(h) ? h : 0)
            }
        },
        fg = function(a, b, c, d) {
            Object.defineProperty(a.prototype, b, {
                get: c,
                set: d || function() {}
            })
        };
    fg(Date, "date", Date.prototype.getDate, Date.prototype.setDate);
    fg(Date, "dateUTC", Date.prototype.getUTCDate, Date.prototype.setUTCDate);
    fg(Date, "day", Date.prototype.getDay);
    fg(Date, "dayUTC", Date.prototype.getUTCDay);
    fg(Date, "fullYear", Date.prototype.getFullYear, Date.prototype.setFullYear);
    fg(Date, "fullYearUTC", Date.prototype.getUTCFullYear, Date.prototype.setUTCFullYear);
    fg(Date, "hours", Date.prototype.getHours, Date.prototype.setHours);
    fg(Date, "hoursUTC", Date.prototype.getUTCHours, Date.prototype.setUTCHours);
    fg(Date, "milliseconds", Date.prototype.getMilliseconds, Date.prototype.setMilliseconds);
    fg(Date, "millisecondsUTC", Date.prototype.getUTCMilliseconds, Date.prototype.setUTCMilliseconds);
    fg(Date, "minutes", Date.prototype.getMinutes, Date.prototype.setMinutes);
    fg(Date, "minutesUTC", Date.prototype.getUTCMinutes, Date.prototype.setUTCMinutes);
    fg(Date, "month", Date.prototype.getMonth, Date.prototype.setMonth);
    fg(Date, "monthUTC", Date.prototype.getUTCMonth, Date.prototype.setUTCMonth);
    fg(Date, "seconds", Date.prototype.getSeconds, Date.prototype.setSeconds);
    fg(Date, "secondsUTC", Date.prototype.getUTCSeconds, Date.prototype.setUTCSeconds);
    fg(Date, "time", Date.prototype.getTime, Date.prototype.setTime);
    fg(Date, "timezoneOffset", Date.prototype.getTimezoneOffset);
    Object.defineProperty(Date, "__swiffy_override", {
        value: eg
    });
    Object.defineProperty(Array, "__swiffy_override", {
        value: Array
    });
    var gg = function(a) {
            window.console && window.console.log("[trace] " + a)
        },
        hg = function(a) {
            this.value = a
        },
        ig = "",
        jg = [],
        kg = function(a, b) {
            if (jg.length >= a) throw new RangeError("Maximum stack size reached");
            jg.push(b)
        },
        lg = function() {
            jg.pop();
            return jg.length
        },
        mg = function(a, b) {
            if (b) throw a;
            if (a instanceof hg) gg(a.value);
            else if (!(a instanceof RangeError)) throw a;
        };
    var ng = 0,
        og = function(a) {
            a = Pc(a);
            return Ic(a() / 65536 + 1, a() / 65536, a() / 65536, a() / 65536 + 1, +a(), +a())
        },
        qe = function(a) {
            var b = [];
            a = Pc(a);
            for (var c = 0, d; l(d = a());) c += d, b.push(c);
            return b
        },
        Pc = function(a) {
            var b = a.length,
                c = 0;
            return function() {
                for (var d = 0, e = 1; c < b; e *= 10) {
                    var f = a.charCodeAt(c++);
                    if (58 == f) return 0;
                    if (96 < f) return d + e * (f - 96);
                    if (64 < f) return -d - e * (f - 64);
                    d = 10 * d + f - 48
                }
            }
        },
        pg = function(a) {
            a = Number(a);
            return isFinite(a) ? a : 0
        },
        qg = function(a) {
            a = Pc(a);
            return new Mc(a() + 256 | 0, +a(), a() + 256 | 0, +a(), a() + 256 | 0, +a(), a() +
                256 | 0, +a())
        },
        Kf = function(a, b) {
            var c = a,
                d = c & 255,
                c = c >> 8,
                e = c & 255,
                c = c >> 8,
                f = c & 255,
                c = c >> 8 & 255;
            b && (f = (f * b.Mb >> 8) + b.dc, e = (e * b.Kb >> 8) + b.$b, d = (d * b.Gb >> 8) + b.Sb, c = (c * b.Ta >> 8) + b.Eb);
            return new Jc(f, e, d, c)
        },
        rg = function(a) {
            a = a.replace(/^ *rgb *\( *([^,]+) *, *([^,]+) *, *([^,]+) *\) *$/, function(a, c, d, e) {
                return (c << 16) + (d << 8) + (e << 0)
            });
            a = a.replace(/^ *#([0-9a-fA-F]+) *$/, function(a, c) {
                var d = parseInt(c, 16);
                return 4278190080 | d
            });
            return a | 0
        },
        sg = function(a, b, c) {
            return a + (b - a) * c
        },
        tg = function(a) {
            a = String(a).trim();
            return "0" ==
                a.charAt(0) && "x" != a.charAt(1).toLowerCase()
        },
        vg = function(a) {
            var b = a.internedStrings;
            b && (delete a.internedStrings, ug(a, b))
        },
        ug = function(a, b) {
            for (var c in a) {
                var d = a[c];
                "string" == typeof d && "#" == d.charAt(0) ? a[c] = b[d.substr(1)] : d instanceof Object && ug(d, b)
            }
        },
        wg = function(a, b) {
            if (b in a) {
                for (var c; !c && a; a = Object.getPrototypeOf(a)) c = Object.getOwnPropertyDescriptor(a, b);
                return c
            }
        },
        z = function(a, b) {
            return l(a) ? a : b
        },
        xg = function(a, b) {
            var c = document.createElement("canvas");
            c.width = a;
            c.height = b;
            return c
        },
        yg = function(a) {
            return a.getContext("2d")
        },
        zg = function(a, b, c) {
            a[b] || (a[b] = []);
            a[b].push(c)
        };
    var Ag = function(a, b, c) {
        "_self" == b && this.su() && (b = "_parent");
        if (c) {
            var d = document.createElement("form");
            d.method = "post";
            d.action = a;
            d.target = b;
            a = [];
            for (b = 0; b < c.length;) {
                var e = c[b++],
                    f = c[b++];
                a.push('<input type="hidden" name="', wa(e));
                l(f) && a.push('" value="', wa(f));
                a.push('" />')
            }
            d.innerHTML = a.join("");
            d.style.visibility = "hidden";
            document.body.appendChild(d);
            d.submit();
            document.body.removeChild(d)
        } else window.open(a, b)
    };
    var Bg = function(a) {
            this.Ya = a || [];
            this.ml = this.Zm = null
        },
        Cg = {
            0: 1,
            1: 1,
            2: 2,
            3: 0
        };
    Bg.prototype.kc = function(a, b) {
        for (var c = 0, d = 0, e = 0, f = this.Ya; c < f.length;) switch (f[c++]) {
            case 0:
                d = f[c++];
                e = f[c++];
                break;
            case 1:
                a.kc(d, e, b, b);
                d = f[c++];
                e = f[c++];
                a.kc(d, e, b, b);
                break;
            case 2:
                a.kc(d, e, b, b);
                var h = f[c++],
                    k = f[c++],
                    n = f[c++],
                    q = f[c++],
                    u = (h - d) / (2 * h - d - n),
                    p = (k - e) / (2 * k - e - q);
                0 < p && 1 > p && a.kc(d, (1 - p) * (1 - p) * e + 2 * (1 - p) * p * k + p * p * q, b, b);
                0 < u && 1 > u && a.kc((1 - u) * (1 - u) * d + 2 * (1 - u) * u * h + u * u * n, e, b, b);
                d = n;
                e = q;
                a.kc(d, e, b, b)
        }
    };
    Bg.prototype.slice = function(a, b) {
        function c() {
            var a = t[w],
                b = t[w + 1],
                c = u.slice(a * e + b * h + n) - n,
                a = p.slice(a * f + b * k + q) - q;
            t[w++] = (c * k - a * h) / d;
            t[w++] = (a * e - c * f) / d
        }
        if (!a) return this;
        var d = b.ul();
        if (0 == d) return this;
        for (var e = b.F, f = b.J, h = b.C, k = b.u, n = b.Y, q = b.Z, u = a.x, p = a.y, t = this.Ya.slice(), v = t.length, w = 0; w < v;) switch (t[w++]) {
            case 2:
                c();
            case 1:
            case 0:
                c()
        }
        return new Bg(t)
    };
    Bg.prototype.Wo = function(a) {
        Dg(a, this.Ya, 1, 0, 0, 1, 0, 0)
    };
    var Dg = function(a, b, c, d, e, f, h, k) {
        a.moveTo(h, k);
        for (var n = b.length, q = 0; q < n;) {
            var u = b[q++];
            if (3 === u) a.closePath();
            else {
                var p = b[q] * c + b[q + 1] * e + h,
                    t = b[q] * d + b[q + 1] * f + k,
                    q = q + 2;
                if (0 === u) a.moveTo(p, t);
                else if (1 === u) a.lineTo(p, t);
                else if (2 === u) {
                    var u = b[q] * c + b[q + 1] * e + h,
                        v = b[q] * d + b[q + 1] * f + k,
                        q = q + 2;
                    a.quadraticCurveTo(p, t, u, v)
                }
            }
        }
    };
    Bg.prototype.Wa = function() {
        for (var a = 0; a < this.Ya.length;) switch (this.Ya[a++]) {
            case 0:
                a += 2;
            case 3:
                break;
            case 1:
            case 2:
                return !1;
            default:
                return !1
        }
        return !0
    };
    Bg.prototype.Ps = function() {
        for (var a = [], b = 0; b < this.Ya.length;) {
            var c = this.Ya[b++];
            3 != c && a.push(c);
            for (var d = 0; d < 2 * Cg[c]; d++) a.push(this.Ya[b++])
        }
        return new Bg(a)
    };
    var Fg = function(a) {
            return new Bg(Eg(a))
        },
        Eg = function(a) {
            a = Pc(a);
            for (var b = 0, c = 0, d = [], e; l(e = a());) switch (d.push(e), e) {
                case 2:
                    d.push(b + a(), c + a());
                case 0:
                case 1:
                    b += a(), c += a(), d.push(b, c)
            }
            return d
        };
    g = Bg.prototype;
    g.Cu = function(a) {
        this.Zm || this.bq();
        Dg(a, this.Zm, 1, 0, 0, 1, 0, 0)
    };
    g.xu = function(a) {
        this.ml || this.bq();
        Dg(a, this.ml, 1, 0, 0, 1, 0, 0)
    };
    g.ew = function(a, b) {
        for (var c = 0, d = []; c < this.Ya.length;) {
            var e = this.Ya[c++];
            d.push(e);
            for (var f = 0; f < 2 * Cg[e]; f++) d.push(sg(this.Ya[c], a.Ya[c++], b))
        }
        return new Bg(d)
    };
    g.bq = function() {
        for (var a = [], b = [], c = 0, d = 0, e = 0, f = 0, h = this.Ya, k = function(a, b, c) {
                if (a !== b) {
                    var d = h[a];
                    a = h[a + 1];
                    var e = d - h[b];
                    b = a - h[b + 1];
                    var f = 10 * Math.max(Math.abs(e), Math.abs(b));
                    c.push(0, d, a, 1, d - e / f, a - b / f, 1, d, a)
                }
            }, n = h.length, q = 0; q < n;) {
            var u = h[q++];
            3 == u && (d = e = f = c);
            0 == u ? (k(c, d, a), k(f, e, b), d = e = f = c = q, q += 2) : (c === d && (d = q), e = f, f = q, q += 2, 2 === u && (e = f, f = q, q += 2))
        }
        k(c, d, a);
        k(f, e, b);
        this.Zm = a;
        this.ml = b
    };
    g.moveTo = function(a, b) {
        this.Ya.push(0, a, b);
        return this
    };
    g.lineTo = function(a, b) {
        this.Ya.push(1, a, b);
        return this
    };
    g.close = function() {
        this.Ya.push(3);
        return this
    };
    g.nb = function(a, b, c, d) {
        this.Ya.push(2, a, b, c, d);
        return this
    };
    var Hg = function(a, b) {
        this.ku = a;
        this.Yw = b || Gg
    };
    g = Hg.prototype;
    g.P = function() {
        return this.ku
    };
    g.lc = function() {
        return this.P().canvas
    };
    g.I = function() {
        return this.lc().width
    };
    g.S = function() {
        return this.lc().height
    };
    g.kd = function(a, b, c, d, e) {
        var f = this.lc(),
            h = f.width,
            k = f.height;
        d = d || h;
        e = e || k;
        d === h && e === k ? a.drawImage(f, b, c) : a.drawImage(f, 0, 0, h, k, b, c, d, e)
    };
    g.od = function() {
        return null
    };
    g.ua = function(a, b, c, d) {
        return this.Yw.ua(a, b, c, d)
    };
    var Ig = function() {};
    Ig.prototype.ua = function(a, b) {
        return new Hg(yg(xg(a, b)))
    };
    var Gg = new Ig;
    var Jg = function(a, b) {
            this.rt = a;
            this.qt = b;
            this.xe = {}
        },
        Kg = function(a, b, c) {
            this.nd = a;
            this.Oi = b;
            this.size = c;
            this.kn = this.height = this.width = 0;
            this.next = null
        };
    g = Kg.prototype;
    g.P = function() {
        return this.Oi
    };
    g.lc = function() {
        return this.Oi.canvas
    };
    g.I = function() {
        return this.width
    };
    g.S = function() {
        return this.height
    };
    g.kd = function(a, b, c, d, e) {
        d = d || this.width;
        e = e || this.height;
        a.drawImage(this.lc(), 0, 0, this.width, this.height, b, c, d, e)
    };
    g.od = function(a) {
        if (a === this) return null;
        a = this.nd;
        ++this.kn;
        this.P().restore();
        this.next = a.xe[this.size] || null;
        a.xe[this.size] = this;
        return null
    };
    g.ua = function(a, b, c, d) {
        return this.nd.ua(a, b, c, d)
    };
    g.ct = function(a, b) {
        this.width = a;
        this.height = b
    };
    var Lg = function(a, b) {
        if (1 == a || a == b) return a;
        var c;
        if (a > b) c = b + 10 * Math.ceil((a - b) / 10);
        else {
            c = b;
            for (var d = Math.ceil(.5 * c); d >= a;) c = d, d = Math.ceil(.5 * c)
        }
        return c
    };
    Jg.prototype.ua = function(a, b, c, d) {
        var e = Lg(a, this.rt),
            f = Lg(b, this.qt),
            h = "" + e + "x" + f,
            k = this.xe[h];
        k ? (this.xe[h] = k.next, h = k.P(), h.save(), (!c || Za && bb) && h.clearRect(0, 0, e, f)) : (k = new Kg(this, yg(xg(e, f)), h), k.P().save());
        k.ct(a, b, d);
        return k
    };
    Jg.prototype.Lk = function() {
        var a, b, c, d = Object.keys(this.xe);
        for (c = 0; c < d.length; ++c) {
            b = d[c];
            var e = null;
            for (a = this.xe[b]; a; a = a.next) a.kn ? (a.kn = 0, e = a) : e ? e.next = a.next : this.xe[b] = a.next
        }
    };
    var Mg = function(a, b, c, d, e, f, h, k) {
        this.md = c;
        this.quality = d;
        this.kb = b.clone();
        this.Ab = a;
        this.qb = this.I() / this.kb.width();
        this.sb = this.S() / this.kb.height();
        this.Zh = f || null;
        this.flags = e || 0;
        this.Ze = h || null;
        this.Pj = k || null
    };
    g = Mg.prototype;
    g.Td = function() {
        return !!(this.flags & 2)
    };
    g.nq = function() {
        return !!(this.flags & 4)
    };
    g.Nv = function() {
        return !!(this.flags & 8)
    };
    g.Vf = function() {
        return !!(this.flags & 1)
    };
    g.Kh = function() {
        return (!this.Td() || !this.nq() && this.Nv()) && !this.Vf()
    };
    g.yh = function(a) {
        var b = this.qb,
            c = this.sb,
            d = this.P();
        d.setTransform(a.F * b, a.J * c, a.C * b, a.u * c, a.Y * b - this.Oc(), a.Z * c - this.Pc());
        return d
    };
    g.vv = function() {
        var a = this.P();
        a.setTransform(1, 0, 0, 1, 0, 0);
        return a
    };
    g.P = function() {
        return this.Ab.P()
    };
    g.nv = function(a) {
        var b = this.qb,
            c = this.sb;
        return Ic(a.F * b, a.J * c, a.C * b, a.u * c, a.Y * b - this.Oc(), a.Z * c - this.Pc())
    };
    g.clear = function(a) {
        a ? this.fill(a, "copy") : (a = this.P(), a.setTransform(1, 0, 0, 1, 0, 0), a.clearRect(0, 0, this.I(), this.S()))
    };
    g.fill = function(a, b) {
        var c = this.P();
        c.setTransform(1, 0, 0, 1, 0, 0);
        c.globalCompositeOperation = b || "source-over";
        c.fillStyle = a;
        c.fillRect(0, 0, this.I(), this.S());
        c.globalCompositeOperation = "source-over"
    };
    g.bu = function() {
        var a = this.P();
        a.save();
        a.setTransform(1, 0, 0, 1, 0, 0);
        a.beginPath();
        a.rect(0, 0, this.I(), this.S());
        a.restore()
    };
    g.I = function() {
        return this.Ab.I()
    };
    g.S = function() {
        return this.Ab.S()
    };
    g.oj = function() {
        return new Oc(0, 0, this.I(), this.S())
    };
    g.ua = function() {
        return this.Ab
    };
    g.lc = function() {
        return this.Ab.lc()
    };
    g.Oc = function() {
        return this.kb.j * this.qb
    };
    g.Pc = function() {
        return this.kb.l * this.sb
    };
    g.vs = function(a, b) {
        b = z(b, this.flags);
        return this.Li(this.Ek(a), !1, b | 2, 1)
    };
    g.On = function() {
        var a = this.oj();
        a.translate(this.Oc(), this.Pc());
        return this.Li(a, !1, this.Ze.flags, 1, this.Ze)
    };
    g.nl = function() {
        this.qo();
        this.Ze.release();
        this.release();
        return this.Pj
    };
    g.qo = function() {
        this.Bq(this.Ze, 1);
        this.Pj.ph(this)
    };
    g.Li = function(a, b, c, d, e) {
        c = z(c, this.flags);
        b = d || this.quality;
        d = a.width();
        var f = a.height();
        0 >= d || 0 >= f ? (d = f = 1, a = new Oc(-1, -1, 0, 0)) : a = a.clone();
        a.scale(1 / this.qb, 1 / this.sb);
        d = Math.ceil(d * b);
        f = Math.ceil(f * b);
        d = this.Ab.ua(d, f, !1, !0);
        return new Mg(d, a, this.md, b, c, this.Zh, this, e)
    };
    g.release = function() {
        return this.Ab = this.Ab.od()
    };
    g.Ek = function(a) {
        var b = this.qb,
            c = this.sb,
            d = this.kb.clone(),
            e = Ng(a);
        e.Wa() || d.gt(e);
        d.xj(Og(a));
        d.scale(b, c);
        d.cj();
        return d
    };
    g.ph = function(a) {
        this.Vo(a.ua(), a.qb, a.sb, a.Oc(), a.Pc())
    };
    g.Vo = function(a, b, c, d, e) {
        var f = this.P();
        f.setTransform(1, 0, 0, 1, 0, 0);
        b = this.qb / b;
        c = this.sb / c;
        a.kd(f, d * b - this.Oc(), e * c - this.Pc(), a.I() * b, a.S() * c)
    };
    g.ut = function(a, b, c) {
        var d = this.Pj;
        if (1 >= b || !d) this.Wn(a, b, c);
        else {
            var e = this.Ab.P();
            this.qo();
            e.globalCompositeOperation = "copy";
            this.ph(a);
            this.Bq(this.Ze, 1);
            d.Wn(this, b, c);
            this.clear();
            e.globalCompositeOperation = "source-over"
        }
    };
    g.Bq = function(a, b) {
        var c = this.Ab.P();
        c.globalAlpha = b;
        c.globalCompositeOperation = "destination-in";
        this.ph(a);
        c.globalAlpha = 1;
        c.globalCompositeOperation = "source-over"
    };
    g.Wn = function(a, b, c) {
        var d = this.Ab.P(),
            e = Pg(b);
        d.globalCompositeOperation = e;
        d.globalCompositeOperation == e ? (d.globalAlpha = c, this.ph(a), d.globalCompositeOperation = "source-over") : this.Pw(a, b, c);
        d.globalAlpha = 1
    };
    g.Pw = function(a, b, c) {
        var d = a.oj(),
            e = a.Oc() - this.Oc(),
            f = a.Pc() - this.Pc();
        d.translate(e, f);
        d.xj(this.oj());
        var e = d.j,
            f = d.l,
            h = d.width(),
            k = d.height();
        if (!(0 >= h || 0 >= k)) {
            var d = this.Ab.P(),
                n = a.Ab.P().getImageData(e - (a.Oc() - this.Oc()), f - (a.Pc() - this.Pc()), h, k).data,
                e = Math.round(e),
                f = Math.round(f),
                h = d.getImageData(e, f, h, k);
            Df(n, h.data, b, c);
            a.quality != this.quality ? (b = a.$k(), sd(b.P(), h, 0, 0), d.globalCompositeOperation = "source-over", this.Vo(b, a.qb, a.sb, a.Oc(), a.Pc()), b.od()) : sd(d, h, e, f)
        }
    };
    var Pg = function(a) {
        switch (a) {
            case 2:
            case 4:
            case 5:
            case 3:
            case 12:
            case 6:
                return uc[a];
            case 13:
                return "hard-light";
            case 7:
                return "lighter";
            case 10:
                return "destination-in";
            case 11:
                return "destination-out";
            case 8:
            case 9:
                return "";
            default:
                return "source-over"
        }
    };
    g = Mg.prototype;
    g.getImageData = function() {
        return this.P().getImageData(0, 0, this.I(), this.S())
    };
    g.createImageData = function() {
        return this.P().createImageData(this.I(), this.S())
    };
    g.putImageData = function(a) {
        sd(this.P(), a, 0, 0)
    };
    g.$w = function(a) {
        this.P().putImageData(a, 0, 0)
    };
    g.Zg = function(a, b, c, d, e) {
        var f = this.P();
        f.save();
        f.setTransform(1, 0, 0, 1, 0, 0);
        f.globalAlpha = c;
        f.globalCompositeOperation = b;
        a.kd(f, d || 0, e || 0, this.I(), this.S());
        f.restore()
    };
    g.Hi = function(a, b, c) {
        a = a || 1;
        var d = this.oj();
        d.scale(a, a);
        d.cj();
        d = this.Ab.ua(d.width(), d.height(), !0, !1);
        a = new Mg(d, this.kb, this.md, a, this.flags, this.Zh, this.Ze);
        a.Zg(this.ua(), "copy", 1, b, c);
        return a
    };
    g.$k = function() {
        return this.Ab.ua(this.I(), this.S(), !1, !1)
    };
    g.gy = function(a) {
        return a === this.Zh ? this : new Mg(this.ua(), this.kb, this.md, this.quality, this.flags, a, this.Ze, this.Pj)
    };
    g.Gv = function(a) {
        return this.kb.Vq(a)
    };
    var Qg = function() {
        this.ir = new Hg(yg(xg(1, 1)))
    };
    Qg.prototype.Uj = function(a, b, c) {
        b = new Oc(b, c, b + 1, c + 1);
        b = new Mg(this.ir, b, 1, 1, 1);
        a = yf.al(a);
        a.jc(b);
        if (b = 0 < b.getImageData().data[3]) this.ir.lc().width = 1;
        a.ta();
        return b
    };
    var Rg = /100000100000100000.0s/,
        Sg = /1000.0100.0010.000.0s/,
        Tg = /0000.0000.0000.000.0s/,
        Ug = function(a) {
            a.save();
            a.setTransform(1, 0, 0, 1, 0, 0)
        },
        Vg = function(a, b, c, d, e, f) {
            d.globalAlpha = b;
            d.globalCompositeOperation = c;
            d.drawImage(a.canvas, 0, 0, e, f, 0, 0, e, f)
        },
        Wg = function(a, b, c, d) {
            a != b && Vg(a, 1, "copy", b, c, d)
        },
        Xg = function(a, b, c, d) {
            Ug(b);
            Wg(a, b, c, d);
            b.restore()
        },
        Yg = function(a, b, c, d) {
            Ug(b);
            b.clearRect(0, 0, c, d);
            b.restore()
        },
        Zg = function(a, b, c, d, e) {
            e = e[18] / 256;
            Ug(b);
            Za || mc ? (Wg(a, b, c, d), Vg(a, e, "source-in", b, c, d)) : Vg(a,
                e, "copy", b, c, d);
            b.restore()
        },
        $g = function(a, b, c, d, e) {
            var f = e[4],
                h = e[9],
                k = e[14];
            e = e[18] / 256;
            Ug(b);
            Wg(a, b, c, d);
            var n = b == a ? yg(xg(c, d)) : a;
            Wg(a, n, c, d);
            b.fillStyle = "rgba(" + f + "," + h + "," + k + ",1)";
            b.globalCompositeOperation = "lighter";
            b.fillRect(0, 0, c, d);
            Vg(n, e, "destination-in", b, c, d);
            b.restore()
        },
        ah = function(a, b, c, d, e) {
            var f = e[4],
                h = e[9],
                k = e[14];
            e = e[18] / 256;
            Ug(b);
            Wg(a, b, c, d);
            b.fillStyle = "rgba(" + f + "," + h + "," + k + "," + e + ")";
            b.globalCompositeOperation = "source-in";
            b.fillRect(0, 0, c, d);
            b.restore()
        },
        bh = {
            "10000010000010000010s": Xg,
            "10000010000010000010sm": Xg
        },
        ch = function(a, b, c) {
            var d = [!1, !1, !1, b],
                e = [];
            c = c ? ")>>8)" : ")/256)";
            for (var f = 0, h = 0; 4 > h; ++h) {
                for (var k = !1, n = !1, q = [], u = [], p = 0; 4 > p; ++p) {
                    var t = a[f++];
                    "1" == t ? (p == h ? k = !0 : n = d[p] = !0, q.push("s" + p)) : "x" == t && (n = d[p] = !0, u.push("m" + h + p + "*s" + p))
                }
                "0" != a[f++] && (n = !0, q.push("m" + h + "4"));
                u.length || q.length ? n && (d[h] |= k, p = "this[i+" + h + "]=", q.length && (p += q.join("+") + (u.length ? "+" : "")), u.length && (p += "((" + u.join("+") + c), e.push(p)) : e.push("this[i+" + h + "]=0;")
            }
            a = [];
            for (p = 0; 4 > p; ++p) d[p] && a.push("s" +
                p + "=this[i+" + p + "]");
            d = [];
            d.push("for(var i=0,l=this.length;i<l;i+=4){");
            a.length && d.push("var " + a.join() + ";");
            b && d.push("if (s3) {");
            d.push(e.join("\n"));
            d.push("}");
            b && d.push("}");
            var v = new Function("m00", "m01", "m02", "m03", "m04", "m10", "m11", "m12", "m13", "m14", "m20", "m21", "m22", "m23", "m24", "m30", "m31", "m32", "m33", "m34", d.join("\n"));
            return function(a, b, c, d, e) {
                a = a.getImageData(0, 0, c, d);
                v.apply(a.data, e);
                sd(b, a, 0, 0)
            }
        },
        dh = function(a, b) {
            var c = !!(a[15] || a[16] || a[17] || a[19]);
            if (!a[18] && !c) return Yg;
            b = b &&
                c;
            for (var d = c = !0, e = "", f = 0; 20 > f; ++f) {
                var h = a[f],
                    d = d && (4 == f % 5 && -16E3 < h && 16E3 > h || 4 != f % 5 && -65025 < h && 65025 > h);
                if (0 == h) e += "0";
                else if (256 != h || 4 == f % 5) {
                    if (e += "x", 0 > h || 255 < h) c = !1
                } else e += "1"
            }
            d && (e += "s");
            b && (e += "m");
            if (f = bh[e]) return f;
            if (c) {
                if (Rg.test(e)) return Zg;
                if (Sg.test(e)) return $g;
                if (Tg.test(e)) return ah
            }
            f = ch(e, b, d);
            return bh[e] = f
        },
        eh = function(a, b, c, d) {
            dh(c, d)(a.P(), (b || a).P(), a.I(), a.S(), c)
        },
        fh = function(a, b, c) {
            if (c.we()) return b.globalAlpha = c.Gl(), a;
            b = a.ua(a.I(), a.S(), !1, !1);
            eh(a, b, c.Rn(), !0);
            return b
        };
    var ih = function(a, b, c) {
            ve.call(this, b, a, c);
            this.la = null;
            this.Jc = !1;
            this.xi = [];
            this.um = this.km = !1;
            a !== gh && (this.la = new Hg(yg(xg(a.width, a.height))), this.la.P().drawImage(a.canvas, 0, 0), this.Jc = a.transparent);
            this.hi = hh++
        },
        jh;
    m(ih, ve);
    var gh = {},
        hh = 0;
    g = ih.prototype;
    g.pc = function(a, b, c, d) {
        this.la || (this.la = new Hg(yg(xg(a, b))), (this.Jc = c) || (d = (d | 4278190080) >>> 0), c = this.la.P(), c.fillStyle = Kf(d).rd(), c.fillRect(0, 0, a, b))
    };
    g.I = function() {
        return this.la ? this.la.I() : 0
    };
    g.S = function() {
        return this.la ? this.la.S() : 0
    };
    g.ua = function() {
        return this.la
    };
    g.lc = function() {
        return this.la.lc()
    };
    g.In = function(a) {
        var b = this.xi;
        0 <= Ca(b, a) || b.push(a)
    };
    g.sr = function(a) {
        Da(this.xi, a)
    };
    g.iw = function() {
        this.km = !0
    };
    g.by = function() {
        this.km = !1;
        this.um && this.gg()
    };
    g.gg = function() {
        this.hi = hh++;
        if (this.km) this.um = !0;
        else {
            this.um = !1;
            for (var a = 0; a < this.xi.length; ++a) this.xi[a].Iq()
        }
    };
    g.il = function() {
        this.la = null;
        this.gg()
    };
    g.fu = function(a, b) {
        return this.la.P().createImageData(a, b)
    };
    g.Nd = function(a, b, c, d) {
        return this.la.P().getImageData(a, b, c, d)
    };
    g.kg = function(a, b, c) {
        sd(this.la.P(), a, b, c);
        this.gg()
    };
    g.jc = function(a, b, c) {
        this.la && (a.Wi(this.la, b || Bc, c || Nc), this.gg())
    };
    g.Wi = function(a, b, c) {
        this.la && (a = a.P(), a.save(), a.setTransform(b.F, b.J, b.C, b.u, .05 * b.Y, .05 * b.Z), b = fh(this.la, a, c), b.kd(a, 0, 0, b.I(), b.S()), b.od(this.la), a.restore())
    };
    g.fillRect = function(a, b, c, d, e) {
        var f = this.la.P();
        this.Jc ? 4278190080 === (e & 4278190080) || f.clearRect(a, b, c, d) : e = (e | 4278190080) >>> 0;
        0 != e && (f.fillStyle = Kf(e).rd(), f.fillRect(a, b, c, d));
        this.gg()
    };
    g.Rm = function(a, b, c) {
        var d = this.fu(1, 1),
            e = d.data;
        e[0] = c >>> 16 & 255;
        e[1] = c >>> 8 & 255;
        e[2] = c & 255;
        e[3] = this.Jc ? c >>> 24 : 255;
        this.kg(d, a, b)
    };
    g.Bx = function(a, b, c) {
        var d = this.Nd(a, b, 1, 1),
            e = d.data;
        e[0] = c >>> 16 & 255;
        e[1] = c >>> 8 & 255;
        e[2] = c & 255;
        this.kg(d, a, b)
    };
    g.Hl = function(a, b) {
        var c = this.Nd(a, b, 1, 1).data;
        return (c[3] << 24 | c[0] << 16 | c[1] << 8 | c[2]) >>> 0
    };
    g.lv = function(a, b) {
        var c = this.Nd(a, b, 1, 1).data;
        return (c[0] << 16 | c[1] << 8 | c[2]) >>> 0
    };
    g.ov = function(a, b, c, d) {
        if (0 >= c || 0 >= d) return [];
        a = this.Nd(a, b, c, d).data;
        b = Array(Math.floor(a.length / 4));
        for (d = c = 0; d < b.length; d++) b[d] = (a[c++] << 16 | a[c++] << 8 | a[c++] | a[c++] << 24) >>> 0;
        return b
    };
    g.Dx = function(a, b, c, d, e) {
        if (!(0 >= c || 0 >= d)) {
            var f = this.Nd(a, b, c, d),
                h = f.data;
            c = Math.min(e.length, c * d * 4);
            d = this.Jc ? 0 : 255;
            for (var k = 0, n = 0; k < c; k++) {
                var q = e[k];
                h[n++] = q >>> 16 & 255;
                h[n++] = q >>> 8 & 255;
                h[n++] = q & 255;
                h[n++] = (q >>> 24 | d) & 255
            }
            this.kg(f, a, b)
        }
    };
    g.mv = function(a, b, c, d, e) {
        if (0 >= c || 0 >= d) return new Uint8Array(0);
        a = this.Nd(a, b, c, d).data;
        if (e)
            for (e = 0; e < a.length; e += 4) b = a[e], a[e] = a[e + 2], a[e + 2] = b;
        else
            for (e = 0; e < a.length; e += 4) b = a[e], a[e] = a[e + 3], a[e + 3] = a[e + 2], a[e + 2] = a[e + 1], a[e + 1] = b;
        return a
    };
    g.Cx = function(a, b, c, d, e, f) {
        if (!(0 >= c || 0 >= d)) {
            c = this.Nd(a, b, c, d);
            d = c.data;
            var h = 4 * Math.floor(Math.min(d.length, e.length) / 4),
                k = this.Jc ? 0 : 255;
            e = new Uint8Array(e.buffer, e.byteOffset, e.byteLength);
            if (f)
                for (f = 0; f < h; f += 4) d[f] = e[f + 2], d[f + 1] = e[f + 1], d[f + 2] = e[f], d[f + 3] = e[f + 3] | k;
            else
                for (f = 0; f < h; f += 4) d[f] = e[f + 1], d[f + 1] = e[f + 2], d[f + 2] = e[f + 3], d[f + 3] = e[f] | k;
            this.kg(c, a, b)
        }
    };
    g.scroll = function(a, b) {
        if (a || b) {
            var c = 0 > a ? -a : 0,
                d = 0 > b ? -b : 0,
                e = 0 > a ? 0 : a,
                f = 0 > b ? 0 : b,
                h = this.I() - c - e,
                k = this.S() - d - f;
            0 < h && 0 < k && this.kg(this.Nd(c, d, h, k), e, f)
        }
    };
    g.wo = function(a, b, c, d, e, f, h, k, n, q, u) {
        d = Math.min(d, a.I() - b, this.I() - f);
        e = Math.min(e, a.S() - c, this.S() - h);
        k && (d = Math.min(d, k.I() - n), e = Math.min(e, k.S() - q));
        if (!(0 >= d || 0 >= e)) {
            var p;
            k && k.Jc ? (p = yg(xg(d, e)), a.la.kd(p, -b, -c), p.globalCompositeOperation = "destination-in", k.la.kd(p, -n, -q), c = b = 0, a = !0) : (p = a.la.P(), a = a.Jc);
            !a || !u && this.Jc ? sd(this.la.P(), p.getImageData(b, c, d, e), f, h) : this.la.P().drawImage(p.canvas, b, c, d, e, f, h, d, e);
            this.gg()
        }
    };
    var kh = function(a, b, c, d, e) {
            if (!jh) {
                jh = [];
                for (var f = 0; 95327 > f; ++f) {
                    var h = 65536 * Math.sin(f),
                        h = h - Math.floor(h),
                        h = 2 * h * Math.PI;
                    jh.push([Math.cos(h), Math.sin(h)])
                }
            }
            a = jh[(48761 * a + 15473 * b + 16691 * e >>> 0) % 95327];
            return a[0] * c + a[1] * d
        },
        lh = function(a, b, c) {
            c = 3 * c * c - 2 * c * c * c;
            return a * (1 - c) + b * c
        },
        mh = function(a, b, c, d, e, f, h, k, n, q, u, p) {
            a /= e;
            b /= f;
            e = 0;
            f = 1;
            for (--q; 0 <= q; --q) {
                var t, v = a + h[q],
                    w = b + k[q],
                    A = n,
                    B = Math.floor(v),
                    F = Math.floor(w),
                    G = B + 1,
                    K = F + 1;
                t = v - B;
                var Xd = w - F,
                    v = v - G,
                    Rb = w - K;
                u && (B %= c, F %= d, G %= c, K %= d);
                w = kh(B, F, t, Xd, A);
                B = kh(B,
                    K, t, Rb, A);
                F = kh(G, F, v, Xd, A);
                A = kh(G, K, v, Rb, A);
                t = lh(lh(w, F, t), lh(B, A, t), Xd);
                p || (t = Math.abs(t));
                e += t * f;
                a *= 2;
                b *= 2;
                c *= 2;
                d *= 2;
                f /= 2
            }
            return p ? .5 * e + .5 : e
        };
    ih.prototype.Yq = function(a, b, c, d, e, f, h, k, n) {
        c = 32 >= c ? c : 0;
        for (var q = [], u = [], p = 1 / a, t = 1 / b, v = c - 1; 0 <= v; --v) {
            var w = n[v];
            w ? (q[v] = w.x * p, u[v] = w.y * t) : (q[v] = 0, u[v] = 0);
            p *= 2;
            t *= 2
        }
        n = this.la.P().createImageData(this.la.I(), this.la.S());
        p = n.data;
        t = n.width / a;
        v = n.height / b;
        if (k)
            for (w = k = 0; k < n.height; ++k)
                for (var A = 0; A < n.width; w += 4, ++A) h = 255 * mh(k, A, t, v, a, b, q, u, d, c, e, f), p[w] = h, p[w + 1] = h, p[w + 2] = h, p[w + 3] = 255;
        else
            for (w = k = 0; k < n.height; ++k)
                for (A = 0; A < n.width; w += 4, ++A) {
                    var B = 1;
                    h & 8 && (B = mh(k, A, t, v, a, b, q, u, d + 3, c, e, f));
                    p[w + 3] = 255 *
                        B;
                    h & 1 && (p[w] = mh(k, A, t, v, a, b, q, u, d, c, e, f) / B * 255);
                    h & 2 && (p[w + 1] = mh(k, A, t, v, a, b, q, u, d + 1, c, e, f) / B * 255);
                    h & 4 && (p[w + 2] = mh(k, A, t, v, a, b, q, u, d + 2, c, e, f) / B * 255)
                }
        this.kg(n, 0, 0)
    };
    var nh = function(a) {
        this.D = a
    };
    g = nh.prototype;
    g.tn = function(a) {
        var b = this.D,
            c = b.$k(),
            d = b.getImageData();
        Jf(a, d.data, d.width, d.height, 20 * b.qb, 20 * b.sb);
        for (var e = Kf(a.highlight), f = Kf(a.shadow), h = d.data, k = e.r, n = e.Jb, q = e.Fb, e = e.ad, u = f.r, p = f.Jb, t = f.Fb, f = f.ad, v = h.length, w = 0; w < v; w += 4) 127.5 < h[w + 3] ? (h[w + 0] = k, h[w + 1] = n, h[w + 2] = q, h[w + 3] = (h[w + 3] - 127.5) * f >> 7) : (h[w + 0] = u, h[w + 1] = p, h[w + 2] = t, h[w + 3] = (127.5 - h[w + 3]) * e >> 7);
        sd(c.P(), d, 0, 0);
        b.Zg(c, a.fa.jd, 1);
        c.od()
    };
    g.un = function(a) {
        var b = this.D,
            c = a.quality;
        if (!(1 > c || 1 >= a.x && 1 >= a.y)) {
            var d = 20 * b.sb,
                e = Math.max(20 * a.x * b.qb | 0, 1);
            a = Math.max(a.y * d | 0, 1);
            for (var d = b.I(), f = b.S(), h = b.getImageData(), k = h.data, n = b.createImageData().data, q = c & 1, u, p, t = Ff, v = 1; v < c; ++v) u = (e - q) / 2 | 0, p = e - u, t(k, n, 4, 4 * d, 1 / e, u, p, d, f), q ^= 1, u = k, k = n, n = u, t = Ef;
            c & 1 && (e = e - 1 | 1);
            u = (e - q) / 2 | 0;
            t(k, n, 4 * f, 4, 1 / e, u, e - u, d, f);
            u = k;
            k = n;
            n = u;
            t = Ef;
            q = c & 1;
            for (v = 1; v < c; ++v) u = (a - q) / 2 | 0, p = a - u, t(k, n, 4, 4 * f, 1 / a, u, p, f, d), q ^= 1, u = k, k = n, n = u;
            t = pd ? Ef : Gf;
            c & 1 && (a = a - 1 | 1);
            u = (a - q) / 2 | 0;
            t(k, n,
                4 * d, 4, 1 / a, u, a - u, f, d);
            b.$w(h)
        }
    };
    g.vn = function(a) {
        for (var b = this.D, c = [], d = 0; 20 > d; ++d) {
            var e = a.matrix[d];
            c[d] = (4 == d % 5 ? e : 256 * e) | 0
        }
        eh(b.ua(), null, c, !1)
    };
    g.wn = function(a) {
        for (var b = this.D, c = b.I(), d = b.S(), e = b.createImageData(), f = e.data, h = b.getImageData().data, k = a.divisor || 1, n = a.matrixX, q = a.matrixY, u = new Float32Array(n * q), p = 0; p < a.matrix.length; ++p) u[p] = a.matrix[p] / k;
        var k = n / 2 | 0,
            p = q / 2 | 0,
            t = a.bias,
            v = a.preserveAlpha,
            w = a.clamp;
        if (!w) var A = a.color >> 24 & 255,
            B = a.color >> 16 & 255,
            F = a.color >> 8 & 255,
            G = a.color & 255;
        for (var K = a = 0; a < d; ++a)
            for (var Xd = 0; Xd < c; ++Xd, K += 4) {
                for (var Rb = t, Fc = t, Gc = t, Sb = t, Tn = 0, Qj = 0; Qj < q; ++Qj)
                    for (var Un = a + Qj - p, Vn = Math.max(0, Math.min(Un, d - 1)), Rj = 0; Rj <
                        n; ++Rj, ++Tn) {
                        var hc = u[Tn],
                            Yd = Xd + Rj - k,
                            Wn = Math.max(0, Math.min(Yd, c - 1)),
                            Zd = 4 * (Vn * c + Wn);
                        w || Wn === Yd && Vn === Un ? v ? (Rb += hc * h[Zd], Fc += hc * h[Zd + 1], Gc += hc * h[Zd + 2]) : (Yd = h[Zd + 3], Rb += hc * Yd * h[Zd] / 255, Fc += hc * Yd * h[Zd + 1] / 255, Gc += hc * Yd * h[Zd + 2] / 255, Sb += hc * Yd) : (Rb += hc * B, Fc += hc * F, Gc += hc * G, Sb += hc * A)
                    }
                v ? Sb = h[K + 3] : 0 >= Sb ? Rb = Fc = Gc = Sb = 0 : (255 < Sb && (Sb = 255), Rb = 255 * Rb / Sb, Fc = 255 * Fc / Sb, Gc = 255 * Gc / Sb);
                f[K] = Rb;
                f[K + 1] = Fc;
                f[K + 2] = Gc;
                f[K + 3] = Sb
            }
        b.putImageData(e)
    };
    g.xn = function(a) {
        var b = this.D,
            c;
        c = a.distance;
        var d = Kf(a.color),
            e = 2 < c ? .5 : 1,
            f = 20 * b.qb * e,
            h = 20 * b.sb * e;
        c = b.Hi(e, Math.cos(a.angle) * c * f, Math.sin(a.angle) * c * h);
        e = c.getImageData();
        if ("inner" == a.fa.type) {
            If(a, e.data, e.width, e.height, f, h, 3, 1);
            for (var f = e.data, h = d.r, k = d.Jb, n = d.Fb, d = d.ad, q = a.strength, u = f.length, p = 0; p < u; p += 4) f[p + 0] = h, f[p + 1] = k, f[p + 2] = n, f[p + 3] = (255 - f[p + 3]) * q, f[p + 3] = f[p + 3] * d >> 8;
            c.putImageData(e)
        } else If(a, e.data, e.width, e.height, f, h, 3, a.strength), c.putImageData(e), d = Za && bb && 254 < d.r && 254 < d.Jb && 254 <
            d.Fb ? new Jc(254, 254, 254, d.ad) : d, c.fill(d.rd(), "source-in");
        e = c.ua();
        b.Zg(e, a.fa.jd, 1);
        c.release()
    };
    g.yn = function(a) {
        var b = this.D,
            c = b.$k(),
            d = b.getImageData();
        Jf(a, d.data, d.width, d.height, 20 * b.qb, 20 * b.sb);
        Lf(d.data, a.Yb, a.Xb, a.Zb);
        sd(c.P(), d, 0, 0);
        b.Zg(c, a.fa.jd, 1);
        c.od()
    };
    g.zn = function(a) {
        var b = this.D,
            c = 20 * b.qb,
            d = 20 * b.sb,
            e = a.distance,
            e = b.Hi(1, Math.cos(a.angle) * e * c, Math.sin(a.angle) * e * d),
            f = e.getImageData();
        If(a, f.data, f.width, f.height, c, d, 3, a.strength);
        Lf(f.data, a.Yb, a.Xb, a.Zb);
        e.putImageData(f);
        c = e.ua();
        b.Zg(c, a.fa.jd, 1);
        e.release()
    };
    var oh = function(a) {
        this.i = a
    };
    Mf.nr(oh);
    oh.prototype.yr = function() {
        var a = this.i.X;
        a.Uf() && a.Qf(Mf).jc(0)
    };
    oh.prototype.ui = function() {};
    oh.prototype.ta = function() {
        this.i.X.og()
    };
    var ph = function() {};
    m(ph, Of);
    g = ph.prototype;
    g.uh = function() {};
    g.Fe = function() {};
    g.th = function() {};
    g.Rk = function() {};
    g.Qg = function() {};
    var rh = function(a, b) {
        for (var c = 0; c < a.length; ++c) {
            var d = a[c];
            if (d instanceof qh && d.depth == b) return c
        }
        return -1
    };
    ph.prototype.pc = function(a, b, c, d) {
        zg(a.tags, d, this)
    };
    var ze = function(a, b, c, d, e, f, h, k, n) {
        Tf.call(this, a);
        this.name = b;
        this.glyphs = c;
        this.emSquareSize = d;
        this.ascent = e;
        this.descent = f;
        this.bold = h;
        this.italic = k;
        this.lineHeight = (e + f) / d;
        this.Nk = {};
        for (a = 0; a < c.length; a++) this.Nk[c[a].unicode] = a;
        this.fn = n
    };
    m(ze, Tf);
    var Ce = new ze(-1, "", [], 1024, 0, 0, !1, !1);
    Rf(5, function(a) {
        for (var b = a.emSquareSize ? a.emSquareSize : 1024, c = [], d = 0; a.glyphs && d < a.glyphs.length; d++) {
            var e = a.glyphs[d];
            c.push(new sh(Eg(e.data), e.unicode, e.advance))
        }
        return new ze(a.id, a.name, c, b, a.ascent ? a.ascent : 0, a.descent ? a.descent : 0, a.bold, a.italic, a.thickness)
    });
    g = ze.prototype;
    g.zl = function(a) {
        return this.glyphs[this.Nk[a]]
    };
    g.pc = function(a, b, c, d) {
        ze.U.pc.call(this, a, b, c, d);
        zg(b.Dh().Md, this.name, this)
    };
    g.Jm = function(a) {
        for (var b = [], c = 0; c < a.length; ++c) b[c] = this.Nk[a.charAt(c)];
        return b
    };
    g.dw = function(a, b, c, d, e) {
        for (var f = [], h = 0; h < e.length; ++h) {
            f[h] = a;
            var k = this.glyphs[e[h]];
            k && (a += k.advance * b / this.emSquareSize + c, " " == k.unicode && (a += d))
        }
        return f
    };
    g.wr = function(a, b, c, d, e, f, h, k) {
        var n = e * f.C + f.Y;
        e = e * f.u + f.Z;
        var q = f.F,
            u = f.J,
            p = b / this.emSquareSize,
            t = p * f.F,
            v = p * f.J,
            w = p * f.C,
            p = p * f.u;
        a.beginPath();
        for (var A = 0; A < c.length; ++A) {
            var B = this.glyphs[c[A]];
            if (B) {
                var F = d[A];
                Dg(a, B.data, t, v, w, p, F * q + n, F * u + e)
            }
        }
        h && (a.fillStyle = a.strokeStyle = h.rd());
        a.fill();
        k && h && h.Xv() && 200 < h.hv() && (b = 1 - f.qv() * b / 20, 0 < b && (a.lineWidth = b, a.stroke()))
    };
    var sh = function(a, b, c) {
        this.data = a;
        this.unicode = b;
        this.advance = c
    };
    var th = function(a) {
        this.actions = a
    };
    m(th, ph);
    Rf(9, function(a, b) {
        var c = b.eh(a.actions, void 0);
        return new th(c)
    });
    th.prototype.uh = function() {};
    th.prototype.th = function(a, b) {
        b ? this.actions.call(a) : a.i.Cb.add(this.actions.bind(a))
    };
    th.prototype.Qg = function(a) {
        a.push(this)
    };
    var uh = function(a) {
        this.actions = a
    };
    m(uh, th);
    Rf(20, function(a, b) {
        var c = b.eh(a.actions, void 0);
        return new uh(c)
    });
    uh.prototype.pc = function(a, b, c, d) {
        zg(a.eq, d, this)
    };
    Pf[16] = function(a, b, c) {
        c = c.wc;
        for (var d in a.data) {
            var e = c.Ie(a.data[d]).get();
            e && (c.hm[d] = e, e.gm = d, e instanceof ze && zg(b.Dh().Md, d, e))
        }
    };
    var qh = function(a, b, c, d, e, f, h, k) {
        this.definition = b;
        this.depth = a.depth;
        this.matrix = c;
        this.clip = a.clip;
        this.colortransform = d;
        this.name = a.name;
        this.ratio = h;
        this.blendmode = a.blendmode;
        this.replace = a.replace;
        this.actions = e;
        this.filters = f;
        this.qa = !!(b && b.Xl() && b.get().qa);
        this.ig = k;
        this.visible = a.visible;
        this.cacheAsBitmap = a.cacheAsBitmap
    };
    m(qh, ph);
    Rf(3, function(a, b, c) {
        var d;
        l(a.actions) && (d = a.actions.map(function(a) {
            return {
                events: a.events,
                key: a.key,
                actions: b.eh(a.actions, void 0)
            }
        }));
        var e = ae(a.filters),
            f;
        l(a.matrix) && (f = a.matrix ? og(a.matrix) : Bc);
        var h = l(a.id) ? c.wc.Ie(a.id) : null,
            k = a.colortransform ? qg(a.colortransform) : void 0;
        return new qh(a, h, f, k, d, e, l(a.ratio) ? a.ratio / 65535 : void 0, c.Qw.Fl())
    });
    g = qh.prototype;
    g.Fe = function(a) {
        var b = this.depth + -16384,
            c = a.N.Mc(b),
            d = null;
        if (!this.replace == !c) {
            if (c)
                if (!this.definition || c.qa() || this.qa) d = c;
                else {
                    if (a.ie(b), d = this.Ii(a)) d.setTransform(c.ya()), d.Nb(c.mb), d.wg(c.Ub), d.vg(c.wd), d.Nm(c.ze), d.Ob(c.getName())
                } else d = this.Ii(a);
            d && !d.Yn() && (this.matrix && d.setTransform(this.matrix), this.colortransform && d.Nb(this.colortransform), l(this.ratio) && d.yg(this.ratio), this.filters && d.wg(this.filters), l(this.blendmode) && d.vg(this.blendmode), l(this.visible) && d.ik(!!this.visible),
                l(this.cacheAsBitmap) && d.Mm(this.cacheAsBitmap))
        }
    };
    g.uh = function(a) {
        var b = a.N.Mc(this.depth + -16384),
            c = null;
        if (b) {
            var c = b.qa() && this.qa,
                d = this.definition ? this.definition.id : void 0,
                d = !b.qa() && b.definition.id == d;
            (c || d) && b.Qc() == (this.ratio || 0) ? c = b : (a.N.xw(b), c = this.Ii(a))
        } else c = this.Ii(a);
        if (c) return c.Yn() || (c.setTransform(this.matrix ? this.matrix : Bc), c.Nb(this.colortransform ? this.colortransform : Nc), c.yg(this.ratio || 0), c.wg(this.filters ? this.filters : []), c.vg(this.blendmode), l(this.visible) && c.ik(!!this.visible)), c
    };
    g.Ii = function(a) {
        if (!this.definition || !this.definition.Xl()) return null;
        var b = this.definition.get(),
            c = b.ub(a.i, this.ig);
        if (!c) return null;
        this.name ? c.Ob(this.name) : a.i.da().ap(a.i, c);
        this.clip && c.Nm(this.clip + -16384);
        if (this.actions)
            for (c.sh(7), b = 0; b < this.actions.length; ++b) {
                var d = this.actions[b];
                c.Jn(d.events, d.key, d.actions)
            } else b.gm && c.sh(7);
        a.bd(c, this.depth + -16384);
        c.na(!0);
        return c
    };
    g.Rk = function(a) {
        a.push(this)
    };
    g.Qg = function(a) {
        var b = rh(a, this.depth);
        if (0 > b) this.replace || a.push(this);
        else if (this.replace) {
            var c = a[b];
            a.splice(b, 1);
            b = c.definition;
            c.qa || this.qa || !this.definition || (b = this.definition);
            c = new qh({
                    depth: this.depth,
                    name: c.name,
                    replace: !1,
                    qa: c.qa,
                    clip: c.clip,
                    blendmode: z(this.blendmode, c.blendmode),
                    visible: z(this.visible, c.visible),
                    filters: z(this.filters, c.filters)
                }, b, z(this.matrix, c.matrix), z(this.colortransform, c.colortransform), z(this.actions, c.actions), z(this.filters, c.filters), z(this.ratio, c.ratio),
                this.ig);
            a.push(c)
        }
    };
    g.Av = function(a) {
        if (!this.actions || !this.qa) return !1;
        for (var b = 0; b < this.actions.length; ++b)
            if (0 != (this.actions[b].events & a)) return !0;
        return !1
    };
    g.Zt = function() {
        return new qh({
            depth: this.depth + -65536,
            name: this.name,
            replace: !1,
            qa: !0,
            clip: 0,
            blendmode: this.blendmode,
            filters: this.filters,
            visible: this.visible
        }, this.definition, this.matrix, this.colortransform, this.actions, this.filters, this.ratio, this.ig)
    };
    var vh = function(a) {
        this.gl = a
    };
    m(vh, ph);
    Rf(4, function(a) {
        return new vh(a.depth)
    });
    g = vh.prototype;
    g.Fe = function(a) {
        a.ie(this.gl + -16384)
    };
    g.uh = vh.prototype.Fe;
    g.Rk = function(a) {
        a.push(this)
    };
    g.Qg = function(a) {
        var b = rh(a, this.gl);
        if (0 <= b) {
            var c = a[b];
            c.Av(160) ? (a[b] = c.Zt(), a.push(this.$t())) : a.splice(b, 1)
        }
    };
    g.$t = function() {
        return new vh(this.gl + -65536)
    };
    var wh = function(a, b) {
        this.tc = a;
        this.Lm = [];
        this.Mr = {};
        for (var c = 0; c < a.length; c++) this.Mr[a[c].name] = a[c].offset;
        this.Lf = b;
        this.ij = {};
        for (c = 0; c < b.length; c++) this.ij[b[c].name] = b[c].offset
    };
    m(wh, ph);
    Rf(23, function(a) {
        return new wh(a.scenes, a.frames)
    });
    wh.prototype.pc = function(a) {
        a.fc = this;
        for (var b = this.tc, c = this.Lf, d = this.Lm, e = 0, f = 0; e < b.length; e++) {
            for (var h = [], k = e + 1 < b.length ? b[e + 1].offset : a.frameCount; f < c.length && c[f].offset < k;) h.push(c[f++]);
            d.push({
                numFrames: k - b[e].offset,
                Lf: h
            })
        }
    };
    wh.prototype.ft = function(a, b) {
        this.ij[b] = a
    };
    var xh = function(a, b) {
        var c = Ia(a, {
            offset: b
        }, function(a, b) {
            return a.offset - b.offset
        });
        0 > c && (c = -c - 2);
        return c
    };
    g = wh.prototype;
    g.Ch = function(a) {
        return xh(this.tc, a)
    };
    g.Np = function(a) {
        a = this.Ch(a);
        return this.tc[a] ? this.tc[a].offset : 0
    };
    g.pv = function(a) {
        a = this.Ch(a);
        return this.tc[a - 1] ? this.tc[a - 1].offset : Number.NEGATIVE_INFINITY
    };
    g.kv = function(a) {
        a = this.Ch(a);
        return this.tc[a + 1] ? this.tc[a + 1].offset : Number.POSITIVE_INFINITY
    };
    g.Yu = function(a) {
        return xh(this.Lf, a)
    };
    var yh = function(a) {
        this.ratio = a
    };
    yh.prototype.Qc = function() {
        return this.ratio
    };
    var zh = new yh(0),
        Bh = function(a, b, c) {
            return da(a) ? 1 == a.length ? new Ah(c(a[0])) : new b(c(a[0]), c(a[1])) : new Ah(c(a))
        },
        Ah = function(a) {
            this.value = a
        };
    Ah.prototype.Aa = function() {
        return this.value
    };
    var Ch = function(a, b) {
        this.from = a;
        this.to = b
    };
    Ch.prototype.Aa = function(a) {
        return sg(this.from, this.to, a.Qc())
    };
    var Dh = new Ah(0),
        Eh = function(a, b) {
            this.from = a;
            this.to = b
        };
    Eh.prototype.Aa = function(a) {
        var b = this.from,
            c = this.to;
        a = a.Qc();
        return Ic(sg(b.F, c.F, a), sg(b.J, c.J, a), sg(b.C, c.C, a), sg(b.u, c.u, a), sg(b.Y, c.Y, a), sg(b.Z, c.Z, a))
    };
    var Fh = new Ah(Bc),
        Gh = new Ah(Dc),
        Hh = function(a, b) {
            this.from = a;
            this.to = b
        };
    Hh.prototype.Aa = function(a) {
        var b = this.from,
            c = this.to;
        a = a.Qc();
        return new Jc(sg(b.r, c.r, a), sg(b.Jb, c.Jb, a), sg(b.Fb, c.Fb, a), sg(b.ad, c.ad, a))
    };
    var Ih = function(a, b) {
        this.from = a;
        this.to = b;
        this.Mu = a.Ps();
        this.Px = b.Ps()
    };
    Ih.prototype.Aa = function(a) {
        a = a.Qc();
        return 0 == a ? this.from : 1 == a ? this.to : this.Mu.ew(this.Px, a)
    };
    var Jh = function(a, b) {
        this.from = a;
        this.to = b
    };
    Jh.prototype.Aa = function(a) {
        var b = this.from,
            c = this.to;
        a = a.Qc();
        return new Oc(sg(b.j, c.j, a), sg(b.l, c.l, a), sg(b.s, c.s, a), sg(b.G, c.G, a))
    };
    var Kh = [null, "reflect", "repeat"],
        Lh = [null, "linearRGB"],
        Mh = function(a) {
            this.color = a
        };
    Mh.prototype.yc = function(a, b, c) {
        a = this.color.Aa(a);
        a = c.apply(a);
        b.fillStyle = a.rd();
        b.fill("evenodd")
    };
    Mh.prototype.Ae = function() {
        return 1
    };
    var Nh = function(a, b, c, d, e) {
        this.transform = a;
        this.stops = b;
        this.ss = Kh[c];
        this.focus = e
    };
    Nh.prototype.yc = function(a, b, c) {
        b.save();
        var d = this.transform.Aa(a),
            d = d.br(16384, 16384);
        d.yc(b);
        var e = -1,
            f = 1,
            h = this.focus.Aa(a);
        if (this.ss) {
            var k = Oh(a),
                n = this.Wg(k.j, k.l, d, h);
            n < e && (e = n);
            n > f && (f = n);
            n = this.Wg(k.s, k.l, d, h);
            n < e && (e = n);
            n > f && (f = n);
            n = this.Wg(k.j, k.G, d, h);
            n < e && (e = n);
            n > f && (f = n);
            n = this.Wg(k.s, k.G, d, h);
            n < e && (e = n);
            n > f && (f = n);
            f = Math.min(Math.ceil(f), 25);
            e = Math.max(Math.floor(e), -25)
        }
        this.Pn(a, b, d, c, h, f, e);
        b.fill("evenodd");
        b.restore()
    };
    Nh.prototype.Mn = function(a, b, c, d, e) {
        var f = b,
            h = 1 / (c - b);
        switch (this.ss) {
            case "reflect":
                for (f & 1 && (++f, this.Ng(a, b - f, -h, d, e)); f + 1 < c;) this.Ng(a, f - b, h, d, e), f += 2, this.Ng(a, b - f, -h, d, e);
            case "repeat":
                for (; f < c;) this.Ng(a, f - b, h, d, e), ++f;
                break;
            default:
                this.Ng(a, 0, 1, d, e)
        }
    };
    Nh.prototype.Ng = function(a, b, c, d, e) {
        for (var f = this.stops, h = 0; h < f.length; h++) {
            var k = (f[h].offset.Aa(d) + b) * c,
                n = f[h].color.Aa(d),
                n = e.apply(n);
            if (-1 != navigator.userAgent.indexOf("iPad") || nc.test(navigator.userAgent)) try {
                a.addColorStop(k, n.rd())
            } catch (q) {} else a.addColorStop(k, n.rd())
        }
    };
    Nh.prototype.Ae = function() {
        return 1
    };
    var Ph = function(a, b, c, d) {
        Nh.call(this, a, b, c, d, Dh)
    };
    m(Ph, Nh);
    Ph.prototype.Wg = function(a, b, c) {
        a = new yc(a, b);
        a.Sc(c);
        return a.x
    };
    Ph.prototype.Pn = function(a, b, c, d, e, f, h) {
        f |= 1;
        h = h - 1 | 1;
        c = b.createLinearGradient(h, 0, f, 0);
        this.Mn(c, (h + 1) / 2, (f + 1) / 2, a, d);
        b.fillStyle = c
    };
    var Qh = function(a, b, c, d, e) {
        Nh.call(this, a, b, c, d, e)
    };
    m(Qh, Nh);
    Qh.prototype.Wg = function(a, b, c, d) {
        var e = new yc(a, b);
        e.Sc(c);
        a = e.x;
        b = e.y;
        c = d * d - 1;
        e = d * (a - d);
        a = (a - d) * (a - d) + b * b;
        return 0 != c ? (a = e * e - c * a, 0 < c ? (-e + Math.sqrt(a)) / c : (-e - Math.sqrt(a)) / c) : -.5 * a / e
    };
    Qh.prototype.Pn = function(a, b, c, d, e, f) {
        c = b.createRadialGradient(e, 0, 0, e * (1 - f), 0, f);
        this.Mn(c, 0, f, a, d);
        b.fillStyle = c
    };
    var Rh = function(a, b, c) {
        this.Rd = new Hg(yg(a));
        this.transform = b;
        this.Ht = c
    };
    Rh.prototype.Ae = function() {
        return 150
    };
    Rh.prototype.yc = function(a, b, c) {
        b.save();
        this.transform.Aa(a).yc(b);
        a = fh(this.Rd, b, c);
        this.Ht ? (b.clip("evenodd"), a.kd(b, 0, 0, a.I(), a.S())) : (b.fillStyle = b.createPattern(a.lc(), "repeat"), b.fill("evenodd"));
        a.od(this.Rd);
        b.restore()
    };
    var Sh = function(a, b, c, d, e, f) {
        this.width = a;
        this.miter = e;
        this.Ym = b;
        this.Zo = c;
        this.$v = d;
        this.flags = f
    };
    Sh.prototype.bn = function(a, b, c, d, e) {
        var f = this.Ym != this.Zo;
        c.lineCap = f ? "butt" : this.Ym;
        c.lineJoin = this.$v;
        c.miterLimit = this.miter;
        a = this.width.Aa(a);
        var h = (e.F + e.C) * b.qb;
        e = (e.J + e.u) * b.sb;
        var k = this.flags & 4,
            n = this.flags & 2;
        c.lineWidth = Math.max(a * (k && n ? .05 * b.md : n ? h : k ? e : Math.sqrt((h * h + e * e) / 2)), b.md);
        Th(c);
        f && (c.lineJoin = "bevel", c.beginPath(), c.lineCap = this.Ym, d.Cu(c), Th(c), c.beginPath(), c.lineCap = this.Zo, d.xu(c), Th(c))
    };
    var Th = function(a) {
            a.save();
            a.setTransform(1, 0, 0, 1, 0, 0);
            a.stroke();
            a.restore()
        },
        Uh = function(a, b, c, d, e, f, h) {
            Sh.call(this, b, c, d, e, f, h);
            this.color = a
        };
    m(Uh, Sh);
    Uh.prototype.Qn = function(a, b, c, d, e, f) {
        var h = this.color.Aa(a);
        c.strokeStyle = f.apply(h).rd();
        this.bn(a, b, c, d, e)
    };
    Uh.prototype.Ae = function() {
        return 2
    };
    var Vh = function(a, b, c, d, e, f, h) {
        Sh.call(this, b, c, d, e, f, h);
        this.fill = a
    };
    m(Vh, Sh);
    Vh.prototype.Qn = function(a, b, c, d, e, f) {
        c.save();
        var h = b.Ek(a),
            h = b.Li(h, !1),
            k = h.yh(e);
        k.beginPath();
        d.Wo(k);
        k.strokeStyle = "rgb(0,0,0)";
        this.bn(a, h, k, d, e);
        k.globalCompositeOperation = "source-in";
        h.bu();
        this.fill.yc(a, k, f);
        b.ph(h);
        c.restore();
        h.release()
    };
    Vh.prototype.Ae = function() {
        return 2 * this.fill.Ae()
    };
    var Wh = function(a, b, c) {
        ve.call(this, a, b, c);
        this.depth = this.ze = void 0;
        this.We = "";
        this.rc = this.nextSibling = this.ma = null;
        this.Gd = [];
        this.Ub = [];
        this.$c = !0;
        this.fr = 0;
        this.Ti = void 0;
        this.ac = !1;
        this.ke = Bc;
        this.zf = null;
        this.mb = Nc;
        this.Hg = this.rk = null;
        this.dm = Nc;
        this.kb = this.Jf = this.vd = this.Gh = this.fj = null;
        this.wd = 0;
        this.Xn = !1;
        this.Va = this.Id = null;
        this.Mj = !1;
        this.Zc = null;
        this.Fc = !1;
        this.sc = null;
        this.fo = !1;
        this.Yd = null;
        this.xc = 60817408;
        this.lb = new se;
        this.K(0)
    };
    m(Wh, ve);
    var Xh = function(a) {
        if (!a.Hg) return !1;
        a.Hg = null;
        a.gj(Xh);
        return !1
    };
    g = Wh.prototype;
    g.Ks = function() {
        if (!this.Hg) {
            var a = this.ma,
                a = a ? a.Rc().Hv(this.mb) : this.mb;
            this.Wf() ? (this.dm = a, this.Hg = Nc) : (this.dm = Nc, this.Hg = a)
        }
        return this.Hg
    };
    g.Rc = function() {
        return this.Ks()
    };
    g.Al = function() {
        this.Ks();
        return this.dm
    };
    g.ca = function() {
        if (!this.rk) {
            var a = this.ma || this.Va && this.Va.ma;
            this.rk = a ? this.ke.multiply(a.ca()) : this.ke
        }
        return this.rk
    };
    g.gj = function() {
        return !1
    };
    g.np = function() {
        return !1
    };
    g.map = function(a) {
        return a(this)
    };
    g.Fa = function() {
        this.Xn = !0
    };
    g.Yn = function() {
        return !!this.Xn
    };
    g.setTransform = function(a, b) {
        if (b || !this.ke.ia(a)) this.K(2), this.ke = a, this.zf = null, this.Ih()
    };
    g.mc = function() {
        this.zf || (this.zf = this.ke.lu());
        return this.zf
    };
    g.sf = function() {
        var a = this.zf;
        if (a) {
            var b = Math.cos(a.angle),
                c = Math.sin(a.angle);
            this.setTransform(Ic(a.td * b, -a.td * c, a.td * b * a.C + a.gf * c * a.u, a.gf * b * a.u - a.td * c * a.C, this.ke.Y, this.ke.Z));
            this.zf = a
        }
    };
    g.I = function() {
        var a = Yh(this),
            a = a.pb(this.ya());
        return a.width() / 20
    };
    g.Sm = function(a) {
        if (0 <= a) {
            var b = this.I(),
                c = this.ya();
            0 == b ? (b = Yh(this).width() / 20, 0 == b && (b = 1), this.setTransform(Ic(a / b, c.J, 0, c.u, c.Y, c.Z))) : (0 == a && (a = 1 / 1024), this.setTransform(c.ar(a / b, 1).An(c.Y, c.Z)))
        }
    };
    g.S = function() {
        var a = Yh(this),
            a = a.pb(this.ya());
        return a.height() / 20
    };
    g.Pm = function(a) {
        if (0 <= a) {
            var b = this.S(),
                c = this.ya();
            0 == b ? (b = Yh(this).height() / 20, 0 == b && (b = 1), this.setTransform(Ic(c.F, 0, c.C, a / b, c.Y, c.Z))) : (0 == a && (a = 1 / 1024), this.setTransform(c.ar(1, a / b).An(c.Y, c.Z)))
        }
    };
    g.Ih = function() {
        this.Va ? this.Va.xb() : this.ma && this.ma.xb();
        Zh(this)
    };
    var Zh = function(a) {
        a.rk = null;
        a.Gh = null;
        a.kb = null;
        a.gj(Zh);
        a.np(Zh);
        return !1
    };
    g = Wh.prototype;
    g.xb = function() {
        for (var a = this; a; a = a.ma) a.fj = null, a.vd = null, a.Gh = null, a.kb = null
    };
    g.ya = function() {
        return this.ke
    };
    g.Xp = function() {
        return l(this.ze)
    };
    g.Nm = function(a) {
        this.ze != a && (this.K(0), this.ze = a)
    };
    g.Qc = function() {
        return this.fr
    };
    g.Uf = function(a) {
        if (l(a)) return this.Gd[a] == this.i.sg;
        for (a = 0; a < this.Gd.length; a++)
            if (this.Gd[a] == this.i.sg) return !0;
        return !1
    };
    g.K = function(a) {
        this.Gd[a] != this.i.sg && (this.Gd[a] = this.i.sg, this.Va ? this.Va.K(0) : this.ma && this.ma.K(1))
    };
    g.yg = function(a) {
        this.fr = a
    };
    g.ta = function() {
        this.Ti = !0;
        this.Va && this.Va.af(null);
        this.i.Sv(this) && this.i.mk();
        this.i.da().Mq(this)
    };
    g.me = function() {};
    g.Nb = function(a, b) {
        if (b || !this.mb.ia(a)) this.K(2), this.mb = a, Xh(this)
    };
    g.Qm = function(a) {
        a != this.Wf() && Xh(this)
    };
    g.vg = function(a) {
        var b = this.wd,
            c = this.Wf();
        this.wd = a | 0;
        b != this.wd && (this.K(2), this.Qm(c))
    };
    g.af = function(a) {
        if (this.Id != a) {
            this.K(0);
            var b = this.Id;
            this.Va && this.Va.af(null);
            b && (b.K(0), b.Va = null, b.Jf = null, b.getParent() ? b.getParent().K(1) : b.Ih());
            a && (a.K(0), a.af(null), a.Nm(void 0), a.Va && a.Va.af(null), a.Va = this, a.Jf = null, a.getParent() || a.Ih());
            this.Id = a
        }
    };
    g.Ns = function(a) {
        for (var b = 0; b < this.Ub.length; ++b) this.Ub[b].accept(a)
    };
    g.wg = function(a) {
        if (this.Ub != a && (0 < this.Ub.length || 0 < a.length)) {
            var b = this.Wf(),
                c = this.Ub;
            this.Ub = [];
            for (var d = !1, e = 0; e < a.length; e++) e >= c.length || !c[e].ia(a[e]) ? (d = !0, this.Ub.push(a[e].vb())) : this.Ub.push(c[e]);
            if (d || a.length != c.length)
                for (this.K(0), this.Qm(b), this.Jf = null, a = this; a; a = a.ma) a.kb = null
        }
    };
    g.Ob = function(a) {
        a = String(a);
        a != this.We && this.ma && this.ma.Kk(this, a);
        this.We = a
    };
    g.getName = function() {
        return this.We
    };
    g.xg = function(a) {
        if (this.ma != a) {
            var b = this.Uf();
            b && this.ma && this.ma.K(1);
            this.ma = a;
            b && this.ma && this.ma.K(1)
        }
    };
    g.getParent = function() {
        return this.ma
    };
    g.tp = function() {
        for (var a = [], b = this; b; b = b.getParent()) a.push(b);
        return a
    };
    g.Vv = function() {
        return this.i.X.contains(this)
    };
    g.qj = function() {
        for (var a = "", b = this; b && b.getName();) a = "." + b.getName() + a, b = b.getParent();
        b && b.getParent() == b.i.X && (a = "_level" + (b.depth - -16384) + a);
        return a
    };
    g.Dl = function() {
        return this.Yd ? this.Yd : this.getParent() && this.getParent().Dl() || this.i.da().Of()
    };
    g.Zr = function(a) {
        this.Yd = a
    };
    g.Mx = function() {
        return this.$c && this.Al().lm() && this.ca().lm()
    };
    g.ik = function(a) {
        this.$c != a && (this.K(0), this.$c = a)
    };
    g.qa = function() {
        return !1
    };
    g.Lv = function() {
        return !1 === this.Ti
    };
    g.Ud = function() {
        return !0 === this.Ti
    };
    g.sh = function(a) {
        this.xc |= 1 << a
    };
    g.tu = function(a) {
        this.xc &= ~(1 << a)
    };
    g.fireEvent = function(a, b) {
        var c = !1;
        !this.Fc && this.xc & 1 << a.type && ((c = this.vl(a.type)) && c.sound && this.i.nc().xs(c.sound, this.lb), c = this.i.da().fireEvent(this, c, a, b));
        return c
    };
    g.vl = function() {
        return null
    };
    g.Bv = function(a) {
        return !!this.vl(a, !0)
    };
    var Yh = function(a) {
            a.fj || (a.fj = a.vf());
            return a.fj
        },
        $h = function(a) {
            return a.uf()
        },
        Oh = function(a) {
            a.vd || (a.vd = a.ve());
            return a.vd
        },
        ai = function(a) {
            a.Gh || (a.Gh = a.Fk());
            return a.Gh
        },
        Ng = function(a) {
            if (!a.Jf) {
                var b = new Oc(0, 0, 0, 0);
                if (!a.ze && !a.Va)
                    for (var c = 0; c < a.Ub.length; c++) b.add(a.Ub[c].ua());
                a.Jf = b
            }
            return a.Jf
        },
        Og = function(a) {
            if (!a.kb) {
                var b = a.Gk();
                b.add(Ng(a));
                a.kb = b
            }
            return a.kb
        };
    g = Wh.prototype;
    g.uf = function() {
        return Yh(this)
    };
    g.ve = function() {
        return Yh(this)
    };
    g.Fk = function() {
        return Yh(this).pb(this.ca())
    };
    g.Gk = function() {
        return Oh(this).pb(this.ca())
    };
    g.Lp = function() {
        var a = Yh(this).pb(this.ca());
        a.scale(.05, .05);
        a.cj();
        return a
    };
    g.xo = function() {};
    g.na = function(a, b) {
        this.Ti = !1;
        Wh.U.na.call(this, a, b)
    };
    g.Ag = function(a) {
        this.Zc = a
    };
    g.si = function() {
        return this.i.da().si(this)
    };
    g.$r = function(a) {
        this.Mj = a
    };
    g.contains = function(a) {
        for (; a && a != this;) a = a.getParent();
        return a == this
    };
    g.Qf = function(a) {
        a.Pv(this.sc) || (this.sc && this.sc.ta(), this.sc = a.al(this));
        return this.sc
    };
    g.og = function() {
        this.sc && this.sc.ta();
        this.sc = null
    };
    g.Wf = function() {
        return !!this.wd || this.Ul()
    };
    g.Wt = function(a, b) {
        return (new Qg).Uj(this, a, b)
    };
    g.Hd = function(a, b, c, d, e) {
        return this.Cj(a, b) && e.Uj(this, a, b) ? c(this) ? this : d : null
    };
    g.Cj = function(a, b) {
        return this.$c && ai(this).contains(a, b)
    };
    g.Bp = function(a, b, c) {
        var d = new Qg;
        return this.Hd(a, b, c, null, d)
    };
    g.Mm = function(a) {
        var b = this.Wf();
        this.fo = a;
        this.Qm(b)
    };
    g.Ul = function() {
        return this.fo || 0 < this.Ub.length
    };
    var bi = {
            Sn: 24,
            Uq: 21
        },
        ci = {
            Sn: 25,
            Uq: 23
        };
    Wh.prototype.Kf = function(a, b, c) {
        c != this.ma && this.Lv() && (this.fireEvent(new xc(a.Sn), !0), this.Vv() && this.map(function(c) {
            c.fireEvent(new xc(a.Uq), !0);
            return b
        }))
    };
    Wh.prototype.Wi = function(a, b, c) {
        var d = a.P();
        d.save();
        var e = this.Qf(yf),
            f = new Oc(0, 0, 20 * a.I(), 20 * a.S()),
            h = new Mg(a, f, 1, 1);
        this.detach(b, c, function() {
            e.jc(h)
        });
        d.restore()
    };
    Wh.prototype.detach = function(a, b, c) {
        var d = this.ma,
            e = this.ya(),
            f = this.mb;
        this.ma = null;
        this.setTransform(a, !!d);
        this.Nb(b, !!d);
        c();
        this.setTransform(e, !!d);
        this.Nb(f, !!d);
        this.ma = d
    };
    Wh.prototype.bj = function() {};
    var di = function(a) {
        a.bj();
        return !1
    };
    var ei = function(a, b, c) {
            if (a)
                for (var d in a) {
                    var e = a[d];
                    if (!("$" == d.charAt(0) || cd(d) || e && e.__swiffy_d instanceof Wh)) {
                        da(e) || (e = [e]);
                        for (var f = 0; f < e.length; ++f) b.call(c, d, String(e[f]))
                    }
                }
        },
        fi = function(a, b) {
            var c;
            fa(a) ? c = a : (c = new fc, ei(a, c.add, c), c = c.toString());
            if (!b) return c;
            if (!c) return b;
            var d = b.indexOf("?") + 1;
            return b = d ? b.slice(0, d) + c + "&" + b.slice(d) : b + ("?" + c)
        },
        gi = function(a) {
            a = a.replace(/\+/g, " ");
            try {
                return decodeURIComponent(a)
            } catch (b) {
                for (var c = "", d = 0, e = d; e < a.length; d = e) {
                    e = a.indexOf("%", d);
                    if (0 > e) break;
                    for (var c = c + a.substring(d, e), f = d = 0; e < a.length;) {
                        var h = a.charCodeAt(e++);
                        if (37 === h) {
                            if (!/[0-9a-fA-F]/.test(a.charAt(e)) || !/[0-9a-fA-F]/.test(a.charAt(++e)))
                                if (0 < f) continue;
                                else break;
                            h = parseInt(a.substr(++e - 2, 2), 16)
                        }
                        if (0 < f) d = (d << 6) + (h & 63), f--;
                        else if (192 === (h & 192)) {
                            for (; h & 64;) h <<= 1, f++;
                            d = (h & 127) >> f
                        } else d = h;
                        if (0 === f) {
                            c += String.fromCharCode(d);
                            break
                        }
                    }
                }
                return c + a.substring(d)
            }
        },
        ii = function(a, b) {
            var c = a.indexOf("?"),
                d = a.indexOf("#");
            0 <= c && (0 > d || d > c) && hi(a.substring(c + 1), b)
        },
        hi = function(a,
            b) {
            for (var c = a.split("&"), d = 0; d < c.length; d++) {
                var e = c[d],
                    f = void 0,
                    h = e.indexOf("=");
                0 <= h && (f = gi(e.substring(h + 1)), e = e.substring(0, h));
                b(gi(e), f)
            }
        },
        ji = function(a) {
            return function(b, c) {
                b && (a[b] = c || "")
            }
        };
    var ki = function(a, b, c) {
        Wh.call(this, b, gh, c);
        this.Rb = a;
        this.Zq = "auto";
        this.smoothing = !1
    };
    m(ki, Wh);
    g = ki.prototype;
    g.qx = function(a) {
        a !== this.Rb && (this.Rb && this.Rb.sr(this), (this.Rb = a) && this.Rb.In(this), this.Iq())
    };
    g.Iq = function() {
        this.K(0)
    };
    g.na = function(a, b) {
        ki.U.na.call(this, a, b);
        this.Rb && this.Rb.In(this)
    };
    g.ta = function() {
        ki.U.ta.call(this);
        this.Rb && this.Rb.sr(this)
    };
    g.vf = function() {
        var a = this.Rb,
            b = a ? 20 * a.I() : 0,
            a = a ? 20 * a.S() : 0;
        return new Oc(0, 0, b, a)
    };
    var li = function(a, b, c, d) {
        Wh.call(this, a, b, d);
        this.uc = 1;
        this.Sl = !1;
        this.cg = this.enabled = !0;
        this.Ll = [];
        this.jl = !1;
        this.am = 0;
        this.cf = void 0;
        this.tabIndex = -1;
        this.ig = c || Yc.Fl();
        this.xc |= 6291200
    };
    m(li, Wh);
    var mi = function() {
        this.actions = [];
        this.sound = null
    };
    g = li.prototype;
    g.vl = function(a, b) {
        var c = this.Ll[a];
        return !c || b && !c.actions.length ? null : c
    };
    g.Ap = function(a) {
        var b = this.Ll[a];
        b || (b = new mi, this.Ll[a] = b);
        return b
    };
    g.Jn = function(a, b, c) {
        var d = this.i.da().Kp(this),
            e;
        for (e in vc) {
            var f = vc[e];
            if (a & 1 << f) {
                this.sh(f);
                var h = null,
                    k = !1;
                20 == f && (h = function(a) {
                    return a.getKey().uv() == b
                }, k = !0);
                this.Ap(f).actions.push({
                    iq: c.bind(d),
                    ro: h,
                    stopPropagation: k
                });
                1 << f & 4325120 && this.$i()
            }
        }
    };
    g.Gx = function(a, b) {
        for (var c in vc) {
            var d = vc[c];
            a & d && (this.Ap(d).sound = b)
        }
    };
    g.Vl = function() {
        return this.le() && this.cg
    };
    g.Zl = function() {
        return !!this.cf
    };
    g.le = function() {
        return this.Sl && this.enabled && !this.Ud()
    };
    g.$i = function() {
        this.Sl = !0
    };
    g.tb = function(a) {
        this.uc != a && (this.uc = a)
    };
    g.rx = function(a) {
        this.jl = a
    };
    g.bs = function(a) {
        this.cg != a && (this.cg = a)
    };
    g.trackAsMenu = function() {
        return !1
    };
    g.Kr = function(a) {
        if (this.le()) {
            var b;
            this.i.Jh() || 1 != this.uc ? this.trackAsMenu() && !this.i.Bj() && 1 == this.uc ? (this.tb(4), b = 14) : this.i.Aj(this) && 2 == this.uc && (this.tb(4), b = 16) : (this.tb(2), b = 9);
            b && this.fireEvent(new xc(b, a))
        }
    };
    g.Jr = function(a) {
        if (this.le()) {
            var b;
            this.i.Jh() || 2 != this.uc ? this.trackAsMenu() && !this.i.Bj() && 4 == this.uc ? (this.tb(1), b = 13) : this.i.Aj(this) && 4 == this.uc && (this.tb(2), b = 15) : (this.tb(1), b = 8);
            b && this.fireEvent(new xc(b, a))
        } else this.tb(1)
    };
    g.bg = function() {
        this.le() ? (this.i.setCapture(this, !this.trackAsMenu()), this.tb(4), this.fireEvent(new xc(12))) : this.tb(1)
    };
    g.Rj = function() {
        if (this.le()) {
            var a = this.i.Aj(this) || this.trackAsMenu() && !this.i.Bj();
            this.i.releaseCapture(this);
            this.tb(2);
            if (a) {
                var a = Date.now(),
                    b = a - this.am;
                this.jl && 600 > b ? (this.fireEvent(new xc(22)), this.am = 0) : (this.fireEvent(new xc(11)), this.am = a)
            } else this.fireEvent(new xc(9))
        } else this.tb(1)
    };
    g.Ft = function() {
        this.le() && !this.trackAsMenu() && (this.tb(1), this.fireEvent(new xc(10)))
    };
    g.Nf = function() {
        if (!this.Vl()) return "default";
        var a = this.o.useHandCursor;
        return l(a) && !a ? "default" : "pointer"
    };
    var ni = function(a, b, c, d) {
        li.call(this, a, b, c, d);
        this.N = new Kd(this.o);
        this.Qj = !0;
        this.Cg = this.Wh = null
    };
    m(ni, li);
    g = ni.prototype;
    g.ta = function() {
        ni.U.ta.call(this);
        this.N.ta();
        this.K(0)
    };
    g.vf = function() {
        return this.N.jm(Yh)
    };
    g.uf = function() {
        return this.N.jm($h)
    };
    g.ve = function() {
        return this.N.jm(Oh)
    };
    g.Fk = function() {
        return this.N.Bn(ai)
    };
    g.Gk = function() {
        return this.N.Bn(Og)
    };
    g.map = function(a) {
        var b = ni.U.map.call(this, a);
        return b = b || this.N.forEach(function(b) {
            return b.map(a)
        })
    };
    g.gj = function(a) {
        return this.N.forEach(a)
    };
    g.qa = function() {
        return !0
    };
    g.Su = function(a) {
        return this.N.yp(a)
    };
    g.bd = function(a, b) {
        this.K(0);
        var c = a.getParent();
        c && c.removeChild(a);
        a.xg(this);
        this.N.Am(a, b);
        this.xb();
        a.Kf(bi, !1, c)
    };
    g.removeChild = function(a) {
        a.og();
        a.Kf(ci, !1);
        this.K(0);
        this.N.Fm(a);
        a.me();
        a.xg(null);
        this.xb()
    };
    g.og = function() {
        ni.U.og.call(this);
        this.N.forEach(function(a) {
            a.og();
            return !1
        })
    };
    g.pr = function() {
        for (var a = this.N.Ha; a;) this.removeChild(a), a = this.N.Ha
    };
    g.ie = function(a) {
        (a = this.N.Mc(a)) && this.removeChild(a)
    };
    g.Mc = function(a) {
        return this.N.Mc(a)
    };
    g.Kk = function(a, b) {
        this.N.Kk(a, b)
    };
    g.cn = function(a, b) {
        this.K(0);
        this.N.cn(a, b)
    };
    g.Wp = function(a) {
        return this === a.getParent()
    };
    g.He = function() {
        return this.N.He()
    };
    g.Ge = function(a) {
        return this.N.Ge(a)
    };
    g.Mf = function(a) {
        return this.N.Mf(a)
    };
    g.Te = function(a, b) {
        this.K(0);
        var c = a.getParent();
        c && c.Uh(a, this);
        a.xg(this);
        this.N.Te(a, b);
        this.xb();
        a.Kf(bi, !1, c)
    };
    g.Uh = function(a, b) {
        a.Kf(ci, !1, b);
        this.K(0);
        this.N.Uh(a);
        a.xg(null);
        this.xb()
    };
    g.xb = function() {
        ni.U.xb.call(this);
        this.Cg = null
    };
    g.Ih = function() {
        ni.U.Ih.call(this);
        this.Cg = null
    };
    g.Ex = function(a) {
        this.Wh = a;
        this.Cg = null
    };
    g.sv = function() {
        if (!this.Cg && this.Wh && 0 < this.Wh.width() && 0 < this.Wh.height()) {
            var a = this.ya();
            if (0 < a.F && 0 < a.u && !a.J && !a.C) {
                var b = new Oc;
                this.gj(function(a) {
                    a.xo(b);
                    return !1
                });
                0 < b.width() && 0 < b.height() && (this.Cg = new Sc(b, this.Wh, a.F, a.u))
            }
        }
        return this.Cg
    };
    g.zx = function(a) {
        this.Qj != a && (this.Qj = a)
    };
    g.Hd = function(a, b, c, d, e) {
        return this.Cj(a, b) ? (c(this) && (d = this), this.Zp(a, b, c, d, e)) : null
    };
    g.Zp = function(a, b, c, d, e) {
        var f = null,
            h = [];
        this.N.forEach(function(k) {
            if (k.Va) return !1;
            for (; 0 < h.length && k.depth > h[h.length - 1];) h.pop();
            if (k.Xp()) {
                if (k instanceof oi) return !1;
                e.Uj(k, a, b) ? 0 == h.length && c(k) && (!k || k == d && f || (f = k)) : h.push(k.ze)
            } else if (0 == h.length) {
                var n = k.Id;
                if (!n || e.Uj(n, a, b)) k = k.Hd(a, b, c, d, e), !k || k == d && f || (f = k)
            }
            return !1
        });
        return f
    };
    Wh.prototype.io = function() {
        return !0
    };
    var pi = function(a, b, c, d) {
        ni.call(this, b, a, c, d);
        this.Qd = new Kd
    };
    m(pi, ni);
    g = pi.prototype;
    g.na = function(a, b) {
        pi.U.na.call(this, a, b);
        this.ef(this.N, 1);
        this.ef(this.Qd, 8);
        this.$i();
        for (var c = 0; c < this.definition.actions.length; c++) {
            var d = this.definition.actions[c];
            this.Jn(d.events, d.key, d.actions)
        }
        for (c = 0; c < this.definition.sounds.length; c++) d = this.definition.sounds[c], this.Gx(d.events, d.sound)
    };
    g.ta = function() {
        pi.U.ta.call(this);
        this.Qd.ta()
    };
    g.Fk = function() {
        return this.Qd.Bn(ai)
    };
    g.np = function(a) {
        return this.Qd.forEach(a)
    };
    g.tb = function(a) {
        a != this.uc && (this.ef(this.N, a, this.uc), this.i.pd());
        pi.U.tb.call(this, a)
    };
    g.le = function() {
        return pi.U.le.call(this) && this.cg
    };
    g.trackAsMenu = function() {
        return this.definition.trackAsMenu
    };
    g.ef = function(a, b, c) {
        this.K(0);
        var d = this.definition.records;
        if (d) {
            if (l(c))
                for (var e = 0; e < d.length; e++) {
                    var f = d[e],
                        h = f.states & c,
                        k = f.states & b;
                    h && !k && a.ur(f.depth)
                }
            for (e = 0; e < d.length; e++)
                if (f = d[e], h = f.states & c, (k = f.states & b) && !h && (h = this.ig + "." + f.definition.id.toString(36), f.definition.Xl() && (h = f.definition.get().ub(this.i, h)))) h.qa() && 8 != b && h.Ob(this.i.Bh()), h.xg(this), h.na(), a.Am(h, f.depth), f.transform && h.setTransform(f.transform), f.filters && h.wg(f.filters), f.blendmode && h.vg(f.blendmode), f.Ok && h.Nb(f.Ok)
        }
    };
    g.Hd = function(a, b, c, d, e) {
        var f = null;
        if (this.Cj(a, b)) {
            var h = c(this);
            h && (d = this);
            if ((f = this.Zp(a, b, c, d, e)) && f != d) return f;
            if (h && this.Qd.Lu(function(f) {
                    return !!f.Hd(a, b, c, d, e)
                })) return d
        }
        return f
    };
    var qi = function(a, b, c) {
        Wh.call(this, b, a, c)
    };
    m(qi, Wh);
    g = qi.prototype;
    g.ve = function() {
        return this.definition.ve(this)
    };
    g.vf = function() {
        var a = this.definition;
        return a.bounds ? a.bounds.Aa(zh) : a.ve(this)
    };
    g.uf = function() {
        return this.definition.uf(this)
    };
    g.Gk = function() {
        var a = this.definition.flags,
            b = Oh(this),
            c = this.ca();
        if (a & 2) {
            var d = $h(this),
                e = d.pb(c),
                f = this.i.X.jk,
                h = f.F,
                f = f.u;
            e.j += (b.j - d.j) / h;
            e.l += (b.l - d.l) / f;
            e.s += (b.s - d.s) / h;
            e.G += (b.G - d.G) / f;
            a & 1 && e.fh(b.pb(c));
            return e
        }
        return b.pb(c)
    };
    g.xo = function(a) {
        var b = this.definition.uf(this);
        a.fh(b.pb(this.ya()))
    };
    g.yg = function(a) {
        a != this.Qc() && (this.K(0), this.xb());
        qi.U.yg.call(this, a)
    };
    var ri = function(a, b, c, d) {
        pi.call(this, a, b, c, d);
        this.$m = {}
    };
    m(ri, pi);
    g = ri.prototype;
    g.na = function(a, b) {
        ri.U.na.call(this, a, b);
        this.ef(this.N, 1);
        this.ef(this.Qd, 8)
    };
    g.ta = function() {
        ri.U.ta.call(this)
    };
    g.Hx = function(a, b) {
        b && b.xg(this);
        this.$m[a] = b;
        a != this.uc && 8 != a || this.ef(8 == a ? this.Qd : this.N, a)
    };
    g.tv = function(a) {
        return this.$m[a]
    };
    g.ef = function(a, b) {
        var c = this.$m[b];
        c != a.Mc(1) && (a.ur(1), c && a.Am(c, 1), this.K(0))
    };
    var si = function(a, b, c) {
        Wh.call(this, b, a, c)
    };
    m(si, Wh);
    si.prototype.vf = function() {
        return this.definition.bounds
    };
    si.prototype.ve = function() {
        return this.definition.Ou()
    };
    var ti = function(a, b, c) {
        Wh.call(this, b, a, c)
    };
    m(ti, Wh);
    ti.prototype.qa = function() {
        return !0
    };
    ti.prototype.vf = function() {
        return new Oc(0, 0, 20 * this.definition.width, 20 * this.definition.height)
    };
    ti.prototype.yg = function(a) {
        a != this.Qc() && this.K(0);
        ti.U.yg.call(this, a)
    };
    var ui = {};
    var vi = function(a, b, c, d, e) {
        Tf.call(this, a);
        this.trackAsMenu = b;
        this.records = c;
        this.actions = d;
        this.sounds = e
    };
    m(vi, Tf);
    Rf(10, function(a, b, c) {
        for (var d = [], e = 0; a.records && e < a.records.length; e++) {
            var f = a.records[e],
                h = f.transform ? og(f.transform) : null,
                k = f.colortransform ? qg(f.colortransform) : null,
                n = ae(f.filters);
            l(f.id) && d.push(new wi(c.wc.Ie(f.id), f.depth, h, f.states, k, n, f.blendmode))
        }
        c = [];
        for (e = 0; a.actions && e < a.actions.length; e++) f = a.actions[e], c.push({
            actions: b.eh(f.actions, void 0),
            key: f.key,
            events: f.events
        });
        b = [];
        for (e = 0; a.sounds && e < a.sounds.length; e++) f = a.sounds[e], b.push(new xi(f.events, f.sound));
        return new vi(a.id,
            a.trackAsMenu, d, c, b)
    });
    vi.prototype.ub = function(a, b, c) {
        return new pi(this, a, b, c)
    };
    vi.prototype.qa = !0;
    var wi = function(a, b, c, d, e, f, h) {
            this.definition = a;
            this.depth = b;
            this.transform = c;
            this.states = d;
            this.Ok = e;
            this.filters = f;
            this.blendmode = h
        },
        xi = function(a, b) {
            this.events = a;
            this.sound = b
        };
    var yi = function(a, b, c, d, e, f) {
        Tf.call(this, a);
        this.data = b;
        this.mask = c;
        this.width = d;
        this.height = e;
        this.transparent = f;
        this.canvas = xg(d, e)
    };
    m(yi, Tf);
    var zi = function(a) {
        return new yi(a.id, a.data, a.mask, a.width, a.height, !(!a.transparent && !a.mask))
    };
    Rf(8, zi);
    yi.prototype.zd = function(a) {
        a.Ri();
        var b, c = !1,
            d, e = !this.mask,
            f = this,
            h = function() {
                if (c && e) {
                    var h = f.canvas.getContext("2d");
                    h.clearRect(0, 0, f.width, f.height);
                    h.drawImage(b, 0, 0, f.width, f.height);
                    d && (h.globalCompositeOperation = "destination-in", h.drawImage(d, 0, 0, f.width, f.height));
                    a.Ce()
                }
            };
        b = new Image;
        b.onload = function() {
            c = !0;
            h()
        };
        b.onerror = function() {
            a.Ce()
        };
        b.src = this.data;
        this.mask && (d = new Image, d.onload = function() {
            e = !0;
            h()
        }, d.onerror = b.onerror, d.src = this.mask)
    };
    yi.prototype.ub = function(a, b, c) {
        return new ki(new ih(this, a), a, c)
    };
    var Ai = function(a) {
            return a / 255
        },
        Bi = function(a, b) {
            var c = b.transform ? Bh(b.transform, Eh, og) : Gh;
            if (l(b.color)) return new Mh(Bh(b.color, Hh, Kf));
            if (b.gradient) {
                var d = b.gradient,
                    e = d.stops,
                    f = [];
                if (e)
                    for (var h = 0; h < e.length; h++) {
                        var k = e[h];
                        f[h] = {
                            color: Bh(k.color, Hh, Kf),
                            offset: Bh(k.offset, Ch, Ai)
                        }
                    }
                e = d.spread | 0;
                h = d.interpolation | 0;
                if (2 == b.type) return new Ph(c, f, e, h);
                d = d.f ? Bh(d.f, Ch, Zb) : Dh;
                return new Qh(c, f, e, h, d)
            }
            return b.bitmap && (f = a.Vu(b.bitmap, yi)) ? new Rh(f.canvas, c, 6 == b.type) : new Mh(new Ah(new Jc(255, 0, 0,
                255)))
        },
        Ci = ["round", "butt", "square"],
        Di = ["round", "bevel", "miter"];
    var Ei = function(a, b, c, d, e) {
        Tf.call(this, a);
        this.paths = b;
        this.bounds = c;
        this.edges = d;
        this.flags = e;
        for (c = a = 0; c < b.length; c++) {
            d = b[c];
            var f = d.data.Aa(zh).Ya.length;
            d.line && (a += f * d.line.Ae());
            d.fill && (a += f * d.fill.Ae())
        }
        this.hy = 1500 < a;
        this.Dt = !(e & 2)
    };
    m(Ei, Tf);
    Ei.prototype.zd = function() {};
    Rf(1, function(a, b, c) {
        var d = c.wc,
            e = a.fillstyles ? a.fillstyles.map(function(a) {
                return Bi(d, a)
            }) : [],
            f = a.linestyles ? a.linestyles.map(function(a) {
                if (a) {
                    var b = Bh(a.width, Ch, Zb),
                        c = Ci[a.cap] || "round",
                        e = Ci[a.ecap] || c,
                        f = Di[a.joint] || "round";
                    a = a.fill ? new Vh(Bi(d, a.fill), b, c, e, f, a.miter | 0, a.flags | 0) : new Uh(Bh(a.color, Hh, Kf), b, c, e, f, a.miter | 0, a.flags | 0)
                } else a = null;
                return a
            }) : [],
            h = 0;
        b = a.paths.map(function(a) {
            var b = f[a.line] || null,
                c = e[a.fill] || null;
            a = Bh(a.data, Ih, Fg);
            if (b) {
                var d = b.flags & 6;
                0 != d && (h |= 2);
                6 != d && (h |=
                    1)
            }
            return {
                data: a,
                fill: c,
                line: b
            }
        });
        return new Ei(a.id, b, Bh(a.bounds, Jh, Qc), a.edges ? Bh(a.edges, Jh, Qc) : null, h)
    });
    Ei.prototype.ub = function(a, b, c) {
        return new qi(this, a, c)
    };
    Ei.prototype.ve = function(a) {
        if (this.bounds) return this.bounds.Aa(a);
        for (var b = new Oc, c = this.paths, d = 0; d < c.length; ++d) {
            var e = c[d],
                f = e.line ? e.line.width.Aa(a) / 2 : 0;
            e.data.Aa(a).kc(b, f)
        }
        return b
    };
    Ei.prototype.uf = function(a) {
        if (this.edges) return this.edges.Aa(a);
        for (var b = new Oc, c = this.paths, d = 0; d < c.length; ++d) c[d].data.Aa(a).kc(b, 0);
        return b
    };
    var Fi = function(a, b) {
        var c = new Ei(-1, [], null, null, 0);
        Wh.call(this, a, c, b);
        this.clear();
        this.kh = this.yf = null;
        this.Fa()
    };
    m(Fi, qi);
    g = Fi.prototype;
    g.Ia = function() {
        return this
    };
    g.duplicate = function() {
        var a = new Fi(this.i);
        a.definition = Ma(this.definition);
        return a
    };
    g.clear = function() {
        this.definition.paths = [];
        this.Tc = this.Uc = this.Wd = this.Xd = 0;
        this.K(0);
        this.xb()
    };
    g.Le = function() {
        var a = this.yf,
            b = this.kh,
            c;
        b && (c = b);
        a && a != b && (c = a);
        return c ? (this.K(0), this.xb(), c.data.value) : new Bg
    };
    g.moveTo = function(a, b) {
        l(a) && l(b) && (a *= 20, b *= 20, this.Le().moveTo(a, b), this.Tc = a, this.Uc = b, this.Wd = a, this.Xd = b)
    };
    g.lineTo = function(a, b) {
        l(a) && l(b) && (a *= 20, b *= 20, a != this.Tc || b != this.Uc || this.kh ? this.Le().lineTo(a, b) : this.Le().close(), this.Wd = a, this.Xd = b)
    };
    g.nb = function(a, b, c, d) {
        l(c) && l(d) && l(a) && l(b) && (a *= 20, b *= 20, c *= 20, d *= 20, this.Le().nb(a, b, c, d), this.Wd = c, this.Xd = d)
    };
    g.Au = function(a, b, c, d) {
        l(a) && l(b) && l(c) && l(d) && (a *= 20, b *= 20, c *= 20, d *= 20, this.Le().moveTo(a, b).lineTo(a, b + d).lineTo(a + c, b + d).lineTo(a + c, b).lineTo(a, b), this.Tc = this.Wd = a, this.Uc = this.Xd = b)
    };
    var Gi = Math.sqrt(2);
    g = Fi.prototype;
    g.Uo = function(a, b, c, d) {
        if (l(a) && l(b) && l(c) && l(d)) {
            a *= 20;
            b *= 20;
            c *= 20;
            d *= 20;
            var e = c / Gi,
                f = d / Gi,
                h = c * (Gi - 1),
                k = d * (Gi - 1);
            this.Le().moveTo(a + c, b).nb(a + c, b + k, a + e, b + f).nb(a + h, b + d, a, b + d).nb(a - h, b + d, a - e, b + f).nb(a - c, b + k, a - c, b).nb(a - c, b - k, a - e, b - f).nb(a - h, b - d, a, b - d).nb(a + h, b - d, a + e, b - f).nb(a + c, b - k, a + c, b);
            this.Tc = this.Wd = a + c;
            this.Uc = this.Xd = b
        }
    };
    g.Bu = function(a, b, c, d, e, f) {
        l(a) && l(b) && l(c) && l(d) && l(e) && l(f) && (e && f ? (e > c && (e = c), f > d && (f = d)) : e = f = 0, a *= 20, b *= 20, c *= 20, d *= 20, e *= 10, f *= 10, this.Le().moveTo(a + c, b + d - f).nb(a + c, b + d, a + c - e, b + d).lineTo(a + e, b + d).nb(a, b + d, a, b + d - f).lineTo(a, b + f).nb(a, b, a + e, b).lineTo(a + c - e, b).nb(a + c, b, a + c, b + f).lineTo(a + c, b + d - f), this.Tc = this.Wd = a + c, this.Uc = this.Xd = b + d - f)
    };
    g.ci = function(a, b, c, d) {
        var e = this.definition.paths,
            f = e[e.length - 1],
            h = new Bg;
        h.moveTo(a, b);
        a = {
            data: new Ah(h),
            fill: d,
            line: c
        };
        f && f.data.value.Wa() ? e[e.length - 1] = a : e.push(a);
        return a
    };
    g.Fq = function(a) {
        var b = this.yf,
            c = this.kh;
        if (c) {
            if (c.data.value.Wa()) {
                b = c;
                b.line = a;
                this.yf = b;
                return
            }
            b == c && (b = this.ci(0, 0, c.line, null), b.data = c.data, delete c.line)
        }
        this.yf = b = a ? this.ci(this.Wd, this.Xd, a, null) : null
    };
    g.Tj = function(a) {
        var b = this.kh;
        b && b.data.value.close();
        var c = this.yf;
        b && c && c != b ? (c.data.value.lineTo(this.Tc, this.Uc), a ? c = b = this.ci(this.Tc, this.Uc, c.line, a) : b = null) : (b = a ? this.ci(this.Tc, this.Uc, null, a) : null, c && (b ? (b.line = c.line, c = b) : c = this.ci(this.Tc, this.Uc, c.line, null)));
        this.kh = b;
        this.yf = c;
        this.Wd = this.Tc;
        this.Xd = this.Uc;
        this.K(0)
    };
    var Hi = {
            round: "round",
            none: "butt",
            square: "square"
        },
        Ii = {
            round: "round",
            bevel: "bevel",
            miter: "miter"
        },
        Ji = {
            linear: Ph,
            radial: Qh
        },
        Ki = {
            vertical: 2,
            horizontal: 4,
            none: 6
        };
    Fi.prototype.tq = function(a, b, c, d, e, f, h, k) {
        a *= 20;
        if (a == a) {
            var n = 0;
            d && (n |= 1);
            n |= Ki[e];
            f = Hi[f] || "round";
            h = Ii[h] || "round";
            this.Fq(new Uh(new Ah(Kc(b, c)), new Ah(a), f, f, h, k, n))
        } else this.Fq(null)
    };
    var Li = function(a, b, c) {
        return b && (a = a.indexOf(b), 0 <= a) ? a : c
    };
    Fi.prototype.Un = function(a, b) {
        l(a) && this.Tj(new Mh(new Ah(Kc(a, b))))
    };
    Fi.prototype.st = function(a, b, c) {
        if (a = a.lc()) b = b ? b.br(20, 20) : Dc, this.Tj(new Rh(a, new Ah(b), !c))
    };
    Fi.prototype.Vn = function(a, b, c, d, e, f, h, k) {
        if ((a = Ji[a]) && da(b) && da(c) && da(d)) {
            for (var n = b.length, q = [], u = 0; u < n; ++u) {
                var p = d[u] / 255;
                0 <= p && 1 >= p && q.push({
                    color: new Ah(Kc(b[u], c[u])),
                    offset: new Ah(p)
                })
            }
            this.Tj(new a(e ? new Ah(e) : Fh, q, Li(Kh, f, 0), Li(Lh, h, 0), new Ah(k || 0)))
        }
    };
    Fi.prototype.$o = function() {
        this.Tj(null)
    };
    var Mi = function(a, b, c, d) {
        ni.call(this, b, a, c, d);
        this.aq();
        this.Jj = !1;
        this.qh = {};
        this.De = null;
        this.i.dx(this);
        this.xc |= 127;
        this.pl = 0
    };
    m(Mi, ni);
    g = Mi.prototype;
    g.aq = function() {
        this.$p = [];
        this.Dj = this.Io = this.ka = -1;
        this.Ph = !1;
        this.Ug = !0;
        this.op = []
    };
    g.ck = function(a) {
        this.me();
        this.pr();
        this.aq();
        for (var b = this.o, c = Object.getOwnPropertyNames(b), d = 0; d < c.length; ++d) cd(c[d]) || delete b[c[d]];
        this.definition = a || this.definition.Ji();
        this.ac = !0;
        this.na();
        a && (this.fireEvent(new xc(18)), this.i.eb())
    };
    g.na = function(a, b) {
        this.ac && this.sh(7);
        Mi.U.na.call(this, a, b)
    };
    g.ah = function() {
        this.bj(0, !0);
        Mi.U.ah.call(this);
        this.Jj || (this.Jj = !0, this.play(), this.Nn())
    };
    g.me = function() {
        this.Jj && (this.N.me(), this.fireEvent(new xc(5)), this.Jj = !1);
        Mi.U.me.call(this)
    };
    g.play = function() {
        this.Ph = !0
    };
    g.Ur = function(a) {
        this.Ug = a
    };
    g.Zl = function() {
        return l(this.cf) ? this.cf : this.Ug
    };
    g.tick = function() {
        this.N.ru();
        this.Ph && this.Nn()
    };
    g.Nn = function() {
        var a = this.ka + 1;
        if (a >= this.definition.frameCount) {
            if (this.definition.Ro) return;
            a = 0
        }
        0 == this.definition.frameCount && this.i.Ka == this || this.uq(a)
    };
    g.stop = function() {
        this.Ph = !1
    };
    g.Wb = function(a, b) {
        0 <= a && (a >= this.definition.frameCount ? this.vq(this.definition.frameCount - 1) : (this.uq(a), this.bj(this.ka, !0)), this.Ph = b)
    };
    g.dl = function(a, b) {
        this.Dj = a;
        this.aw = b;
        var c = this;
        this.i.Cb.add(function() {
            -1 != c.Dj && c.Wb(c.Dj, c.aw)
        })
    };
    g.Uw = function() {
        var a = this.definition.fc.pv(this.ka);
        0 > a && (a = 0);
        this.dl(a, !0)
    };
    g.Ew = function() {
        var a = this.definition.fc,
            b = a.kv(this.ka),
            a = a.tc,
            a = a.length ? a[a.length - 1].offset : 0;
        b > a && (b = a);
        this.dl(b, !0)
    };
    g.$f = function(a, b) {
        var c = this.definition.fc,
            d;
        if (l(b)) {
            if (d = c.Mr[b], !l(d)) return
        } else d = c.Np(this.ka);
        var e = Number(a) + d - 1;
        return 0 <= e && e == Math.floor(e) ? e : (e = c.ij[a]) && c.Np(e) != d ? void 0 : e
    };
    g.Xu = function(a) {
        return this.definition.tags[a]
    };
    g.uq = function(a) {
        this.Dj = -1;
        if (a != this.ka)
            if (a > this.ka) {
                if (this.vq(a - 1), this.ka = a, this.ep(this.ka), a = this.definition.tags[this.ka])
                    for (var b = 0; b < a.length; b++) a[b].Fe(this), a[b].th(this, !1)
            } else {
                this.ka = a;
                a = this.definition.qq[this.ka];
                var c = [];
                if (a)
                    for (b = 0; b < a.length; b++) {
                        var d = a[b].uh(this);
                        d && c.push(d);
                        a[b].th(this, !1)
                    }
                var e = this;
                this.N.Ju(function(a) {
                    if (!(0 > a.depth) || 0 <= c.indexOf(a)) return !0;
                    e.K(0);
                    a.me();
                    return !1
                });
                this.Uf(0) && this.N.ot(this)
            }
    };
    g.vq = function(a) {
        for (; a > this.ka;) {
            this.ka++;
            this.ep(this.ka);
            var b = this.definition.tags[this.ka];
            if (b)
                for (var c = 0; c < b.length; c++) b[c].Fe(this)
        }
    };
    g.bj = function(a, b) {
        var c = l(a) ? a : this.ka;
        b ? this.i.Cb.add(this.cp.bind(this, c)) : this.cp(c)
    };
    g.cp = function(a) {
        var b = this.op[a];
        if (b && this.Io != a) {
            jg.push(void 0);
            try {
                b(), lg()
            } catch (c) {
                this.stop(), mg(c, !!lg())
            }
        }
        this.Io = a
    };
    g.io = function(a) {
        var b = this.pl != a;
        this.pl = a;
        return b
    };
    g.Iv = function() {
        return ++this.pl
    };
    g.ep = function(a) {
        if (!this.$p[a]) {
            for (var b = this.definition.eq[a], c = 0; b && c < b.length; c++) b[c].th(this, !0);
            this.$p[a] = !0
        }
    };
    g.da = function() {
        return this.i.da()
    };
    g.mj = function() {
        return this.i.mj()
    };
    g.nc = function() {
        return this.i.nc()
    };
    g.duplicate = function(a, b, c) {
        var d = new Mi(this.definition, this.i, this.ig + "_d");
        d.ac = !0;
        d.Ob(b);
        d.setTransform(this.ya());
        this.De && (d.De = this.De.duplicate(d), d.bd(d.De, -16385));
        d.na();
        a.ie(c);
        a.bd(d, c);
        d.Nb(this.mb);
        return d
    };
    g.Ia = function() {
        var a = this.De;
        a || (this.De = a = new Fi(this.i), a.Fc = !0, this.bd(a, -16385));
        return a
    };
    g.tb = function(a) {
        if (this.Ug && a != this.uc) {
            var b;
            switch (a) {
                case 1:
                    b = "_up";
                    break;
                case 4:
                    b = "_down";
                    break;
                case 2:
                    b = "_over"
            }
            b && (b = this.definition.fc.ij[b], l(b) && (this.Wb(b, !1), this.i.pd()))
        }
        Mi.U.tb.call(this, a)
    };
    g.xq = function(a, b, c) {
        this.Ag(Ni(a));
        var d = this;
        Oi(a, this.i, b, c, {
            Lb: function() {},
            jb: function() {},
            ib: function() {},
            zb: function(a) {
                d.ck(a)
            }
        })
    };
    g.Wu = function() {
        var a = this.i.va,
            b = this;
        return this.i.X.Bp(a.x, a.y, function(a) {
            return !b.contains(a) && a instanceof li
        })
    };
    g.Nf = function() {
        return this.Ug ? Mi.U.Nf.call(this) : "default"
    };
    g.Ho = function() {
        var a = this.definition.fc;
        return a.Lf[a.Yu(this.ka)]
    };
    var Pi = function(a) {
        this.$ = a
    };
    Mf.La(Wh, Pi);
    Mf.La(Fi, Pi);
    Mf.La(si, Pi);
    Mf.La(ki, Pi);
    Mf.La(ti, Pi);
    Mf.La(qi, Pi);
    Pi.prototype.jc = function(a) {
        var b = this.$;
        b.Uf() && (b.Al(), this.Ib(a), b.Id && b.Id.Qf(Mf).jc(2 | a))
    };
    Pi.prototype.Ib = function() {};
    Pi.prototype.ta = function() {};
    var Ri = function(a, b, c, d, e) {
        Tf.call(this, a);
        this.matrix = b;
        this.records = c;
        this.bounds = d;
        this.Yx = e;
        this.vd = null;
        Qi && Qi(this)
    };
    m(Ri, Tf);
    var Qi = null;
    Rf(6, function(a, b, c) {
        b = Qc(a.bounds);
        for (var d = og(a.matrix), e = l(a.mode) && 1 != a.mode ? null : new Nf(a.gridFit || 0, a.thickness || 0, a.sharpness || 0), f = [], h = 0; a.records && h < a.records.length; h++) {
            var k = a.records[h],
                n = l(k.font) ? c.wc.Ie(k.font) : null,
                q = l(k.glyphs) ? qe(k.glyphs) : null;
            f.push(new Si(k.text, q, n, k.height, qe(k.x), Number(k.y), k.color))
        }
        return new Ri(a.id, d, f, b, e)
    });
    Ri.prototype.ub = function(a, b, c) {
        return new si(this, a, c)
    };
    Ri.prototype.Ou = function() {
        if (!this.vd)
            for (var a = this.vd = this.bounds.clone(), b = 0; b < this.records.length; b++) {
                var c = this.records[b].Pu();
                c.mm(this.matrix);
                a.fh(c)
            }
        return this.vd
    };
    var Si = function(a, b, c, d, e, f, h) {
        this.text = a;
        this.font = c;
        this.height = d;
        this.x = e;
        this.y = f;
        this.color = h;
        this.Pd = b
    };
    Si.prototype.jx = function(a, b, c, d) {
        var e = this.font && this.font.get();
        e instanceof ze && (this.Pd || (this.Pd = e.Jm(this.text)), c = c ? c.apply(Kf(this.color)) : null, e.wr(a, this.height, this.Pd, this.x, this.y, b, c, d))
    };
    Si.prototype.Pu = function() {
        var a = this.font && this.font.get(),
            b = 0,
            c = 0,
            d = 0,
            e = 0;
        a instanceof ze && (this.Pd || (this.Pd = a.Jm(this.text)), this.Pd.length && (c = this.y + a.descent * this.height / a.emSquareSize, b = this.y - a.ascent * this.height / a.emSquareSize, d = this.x[0], e = this.Pd.length - 1, e = this.x[e] + (a.glyphs[this.Pd[e]].advance | 0) * this.height / a.emSquareSize));
        return new Oc(d, b, e, c)
    };
    var Ti = function(a, b, c, d, e, f, h, k, n, q) {
        Tf.call(this, a);
        this.numFrames = b;
        this.width = c;
        this.height = d;
        this.deblocking = e;
        this.smoothing = f;
        this.codecId = h;
        this.motionEstimationData = k;
        this.Rd = new Image;
        this.motionX = n;
        this.motionY = q
    };
    m(Ti, Tf);
    Rf(24, function(a) {
        var b = null,
            c = null;
        a.motionEstimationData && (b = qe(a.motionEstimationData.motionX), c = qe(a.motionEstimationData.motionY));
        return new Ti(a.id, a.numFrames, a.width, a.height, a.deblocking, a.smoothing, a.codecId, a.motionEstimationData, b, c)
    });
    Ti.prototype.ub = function(a, b, c) {
        return new ti(this, a, c)
    };
    Ti.prototype.zd = function() {};
    var Ui = function(a) {
        this.id = a
    };
    m(Ui, ph);
    Rf(12, function(a) {
        return new Ui(a.id)
    });
    Ui.prototype.Fe = function(a) {
        a.nc().xs(this.id, a.lb)
    };
    Ui.prototype.uh = Ui.prototype.Fe;
    Ui.prototype.Qg = function(a) {
        a.push(this)
    };
    var Vi = function() {
        this.source = ""
    };
    g = Vi.prototype;
    g.append = function(a) {
        this.source += a;
        return this
    };
    g.Es = function() {
        var a = this.source;
        this.source = "";
        return a
    };
    g.wj = function(a) {
        return a.Kw
    };
    g.Bk = function(a) {
        return this.append(this.wj(a))
    };
    g.Pg = function(a, b) {
        this.Bk(a).append("(");
        for (var c = 1; c < arguments.length; ++c) 1 < c && this.append(","), this.append(arguments[c]);
        return this.append(")")
    };
    g.O = function(a, b) {
        return this.Pg.apply(this, arguments).append(";")
    };
    g.Gu = function(a) {
        return fa(a) ? za(a) : String(a)
    };
    var Wi = function(a, b, c, d) {
        Tf.call(this, b);
        this.Eq = a;
        this.qq = [];
        this.fc = new wh([], []);
        this.frameCount = c;
        this.scaleRect = d;
        this.tags = [];
        this.eq = [];
        this.Ro = !1
    };
    m(Wi, Tf);
    Rf(7, function(a, b, c, d) {
        var e = new Wi(c, a.id, a.frameCount, a.scaleRect ? Qc(a.scaleRect) : null);
        e.Wq(a.tags, b, c, d);
        return e
    });
    g = Wi.prototype;
    g.Wq = function(a, b, c) {
        for (var d = 0, e = 0, f = 0; a && f < a.length; f++) {
            var h = a[f];
            if (2 == h.type) d++, e = 0;
            else {
                var k = Pf[h.type];
                k && (e++, k(h, b, c, this, d, void 0))
            }
        }
        this.Pt()
    };
    g.qa = !0;
    g.ub = function(a, b, c) {
        a = new Mi(this, a, b, c);
        this.scaleRect && a.Ex(this.scaleRect);
        return a
    };
    g.Ji = function() {
        return new Wi(this.Eq, 0, 0, null)
    };
    g.Pt = function() {
        for (var a = [], b = 0; b < this.frameCount; ++b) {
            for (var c = this.tags[b], d = [], e = 0; e < a.length; ++e) a[e].Rk(d);
            if (c)
                for (e = 0; e < c.length; ++e) c[e].Qg(d);
            a = this.qq[b] = d
        }
    };
    var Xi = function(a, b, c, d, e) {
        Wi.call(this, this, 0, a, null);
        this.frameRate = b;
        this.vc = c;
        this.as3 = d;
        this.wc = new td;
        e ? (a = Zc[e], b = new Xc(a), a || (Zc[e] = b.Lo), e = b) : e = Yc;
        this.Qw = e;
        this.wc.dr(this)
    };
    m(Xi, Wi);
    var Zi = function(a, b) {
            var c = new Xi(a.frameCount, a.frameRate, a.version, Yi(a), a.digest);
            c.Wq(a.tags, b, c, a.url || "root");
            a.truncated && (c.Ro = !0);
            return c
        },
        Yi = function(a) {
            if (l(a.as3)) return a.as3;
            if (a.tags)
                for (var b = 0; b < a.tags.length; ++b)
                    if (18 == a.tags[b].type) return !0;
            return !1
        };
    var $i = function(a, b, c, d) {
            var e = !1;
            if (da(c))
                for (var f = 0; f < c.length; ++f) {
                    var h = c[f];
                    switch (h.name && h.name.toLowerCase()) {
                        case "content-type":
                            e = !0
                    }
                    a.setRequestHeader(h.name, h.value)
                }
            e || ("POST" == b && (d = d || "application/x-www-form-urlencoded"), d && a.setRequestHeader("Content-Type", d))
        },
        cj = function(a) {
            return function(b, c, d, e, f, h) {
                d = String(d).toUpperCase();
                switch (d) {
                    case "POST":
                        if ("function" == typeof ArrayBuffer) {
                            aj(a, b, c, "POST", fi(e), f, h);
                            break
                        }
                    case "GET":
                        b = fi(e, b);
                    default:
                        USING_XML_HTTP_MOCK ? aj(a, b, c, "GET",
                            null, f, h) : bj(b, c, f)
                }
            }
        },
        aj = function(a, b, c, d, e, f, h) {
            c && c.Ri();
            var k = new XMLHttpRequest;
            k.open(d, b);
            k.responseType = "arraybuffer";
            k.onreadystatechange = function() {
                if (4 == k.readyState) {
                    if (dj(k)) {
                        var b = new Uint8Array(k.response);
                        if (!ea(b)) throw Error("encodeByteArray takes an array as a parameter");
                        kc();
                        for (var d = gc, e = [], h = 0; h < b.length; h += 3) {
                            var t = b[h],
                                v = h + 1 < b.length,
                                w = v ? b[h + 1] : 0,
                                A = h + 2 < b.length,
                                B = A ? b[h + 2] : 0,
                                F = t >> 2,
                                t = (t & 3) << 4 | w >> 4,
                                w = (w & 15) << 2 | B >> 6,
                                B = B & 63;
                            A || (B = 64, v || (w = 64));
                            e.push(d[F], d[t], d[w], d[B])
                        }
                        bj("data:image/" +
                            a + ";base64," + e.join(""), c, f)
                    } else f.ib(k.status);
                    c && c.Ce()
                }
            };
            $i(k, d, h);
            k.send(e)
        },
        bj = function(a, b, c) {
            b && b.Ri();
            var d = new Image;
            d.onload = function() {
                c.Lb();
                c.jb(0, 1024);
                c.jb(1024, 1024);
                c.zb({
                    type: 8,
                    id: 1,
                    data: d.src,
                    width: d.width,
                    height: d.height
                }, 200);
                b && b.Ce()
            };
            d.onerror = function() {
                c.ib(404);
                b && b.Ce()
            };
            d.src = a
        },
        ej = function(a, b, c, d, e, f, h) {
            b && b.Ri();
            var k = new XMLHttpRequest,
                n = !0,
                q = 0,
                u = 0;
            k.onreadystatechange = function() {
                2 == k.readyState ? dj(k) && e.Lb() : 4 == k.readyState && dj(k) && 0 != u && q != u && e.jb(u, u)
            };
            k.onprogress =
                function(a) {
                    dj(k) && (n && 0 != a.loaded && e.jb(0, a.total), e.jb(a.loaded, a.total));
                    n = !1;
                    q = a.loaded;
                    u = a.total
                };
            k.onload = function() {
                dj(k) ? e.zb(k.responseText, k.status) : e.ib(k.status);
                b && b.Ce()
            };
            k.onerror = function() {
                e.ib(k.status);
                b && b.Ce()
            };
            c = String(c).toUpperCase();
            var p = null;
            switch (c) {
                case "POST":
                    k.open(c, a);
                    p = fi(d);
                    break;
                case "GET":
                    a = fi(d, a);
                default:
                    k.open("GET", a)
            }
            $i(k, c, f, h);
            k.send(p)
        },
        gj = function(a, b, c, d, e, f) {
            ej(a, b, c, d, {
                Lb: function() {},
                jb: function() {},
                ib: function() {},
                zb: function(a) {
                    var b = e(),
                        c = b.o;
                    hi(a, ji(c));
                    b.fireEvent(new xc(18));
                    fj("onData", c)
                }
            }, f)
        },
        hj = function(a) {
            return (a = a.match(/\.([^.?#]+)(?:#.*$|\?.*$|$)/)) && a[1] || ""
        },
        ij = {
            png: "image/png",
            gif: "image/gif",
            jpg: "image/jpeg",
            jpeg: "image/jpeg",
            swf: "application/x-shockwave-flash"
        },
        jj = cj("jpeg"),
        kj = {
            png: cj("png"),
            gif: cj("gif"),
            jpg: jj,
            jpeg: jj,
            swf: function(a, b, c, d, e, f) {
                USING_XML_HTTP_MOCK || (a = a.replace(/^([^?#]+)([?#].*)?$/g, "$1.json$2"));
                ej(a, b, c, d, {
                        Lb: e.Lb,
                        jb: e.jb,
                        ib: e.ib,
                        zb: function(a, b) {
                            try {
                                var c;
                                a ? (c = lc(a), vg(c)) : c = {};
                                e.zb(c, b)
                            } catch (d) {
                                e.ib(b)
                            }
                        }
                    },
                    f)
            }
        },
        lj = function(a, b, c, d, e, f) {
            var h = hj(a);
            (h = kj[h]) && h(a, b, c, d, e, f)
        },
        mj = function(a, b, c, d) {
            var e = Zi(a, c);
            b.cq(e.wc, function() {
                d(e)
            })
        },
        nj = function(a, b, c, d, e, f, h) {
            lj(a, b, d, e, {
                Lb: f.Lb,
                jb: f.jb,
                ib: f.ib,
                zb: function(a, d) {
                    if (8 == a.type) {
                        var e = zi(a);
                        e.zd(b);
                        b.Hk(function() {
                            f.zb(e, d)
                        })
                    } else mj(a, b, c, function(a) {
                        f.zb(a, d)
                    })
                }
            }, h)
        },
        Oi = function(a, b, c, d, e, f) {
            lj(a, b, c, d, {
                Lb: e.Lb,
                jb: e.jb,
                ib: e.ib,
                zb: function(a, c) {
                    a.type && (a = {
                        tags: [a, {
                            type: 3,
                            id: a.id,
                            depth: 1
                        }, {
                            type: 2
                        }],
                        frameCount: 1
                    });
                    mj(a, b, b.da().Ed, function(a) {
                        e.zb(a,
                            c)
                    })
                }
            }, f)
        },
        dj = function(a) {
            return 200 == a.status || 0 == a.status && null != a.response
        },
        Ni = function(a) {
            var b = document.createElement("a");
            b.href = a;
            return b.href
        };
    var oj = function(a, b, c, d, e, f, h) {
            this.i = a.i;
            this.variables = b;
            this.url = c;
            this.target = d || "_self";
            this.method = e;
            this.mq = !!f;
            this.Wl = !!h;
            this.Fr = this.mq || this.Wl ? a.Oe("_self" == this.target ? "this" : this.target) : null
        },
        pj = {
            0: void 0,
            1: "GET",
            2: "POST"
        };
    g = oj.prototype;
    g.request = function(a) {
        var b = this.target.match(/^\_level(\d+)$/i);
        if (this.mq) return this.Wl ? b ? this.Qo(Number(b[1])) : this.wu() : this.vu(), !0;
        if (b) return this.Wl ? this.Qo(Number(b[1])) : this.uu(Number(b[1])), !0;
        if ("" == this.url) return !0;
        if (b = this.url.match(/^fscommand:(.*)$/i)) return Sd(this.i, b[1], this.target), !0;
        b = this.target;
        if (!a && "_self" != b) return !1;
        var c = this.method;
        a = this.url;
        if (1 == c) a = fi(this.variables, a), a = a.replace(/%20/g, "+");
        else if (2 == c) {
            var d;
            d = this.variables;
            fa(d) ? d = [d] : (c = [], ei(d, c.push,
                c), d = c)
        }
        this.i.navigate(a, b, d);
        return !0
    };
    g.uu = function(a) {
        var b = this.i;
        b.X.ie(-16384 + a);
        this.url && Oi(this.url, b, pj[this.method], this.variables, {
            Lb: function() {},
            jb: function() {},
            ib: function() {},
            zb: function(c) {
                b.wq(a, c)
            }
        })
    };
    g.vu = function() {
        var a = this.Fr,
            b = pj[this.method];
        if (a) {
            var c = a.__swiffy_d;
            c instanceof Mi && c.xq(this.url, b, a)
        }
    };
    g.wu = function() {
        var a = this.Fr,
            b = pj[this.method];
        a && a.__swiffy_d instanceof Mi && a.loadVariables.call(a, this.url, b)
    };
    g.Qo = function(a) {
        var b = this.i;
        gj(this.url, b, pj[this.method], this.variables, function() {
            var c = b.$u(a);
            c || (c = new Xi(0, 0, b.vc, !1), c = new Mi(c, b, null), b.vk(c, a), c.na(), c.ac = !0);
            return c
        })
    };
    var oi = function(a, b, c, d) {
        li.call(this, b, a, c, d);
        this.xk = "normal";
        this.ed = a.autoSize;
        this.wi = a.border;
        this.vi = 16777215;
        this.Ai = a.border;
        this.zi = 0;
        this.Gi = !1;
        this.Zi = a.editable;
        this.Ff = a.Yo;
        this.Vp = "pixel";
        this.Dc = a.html;
        this.nm = a.maxChars;
        this.Ve = a.multiline;
        this.di = !1;
        this.Xq = a.password;
        this.Km = null;
        this.Xh = a.selectable;
        this.ps = 0;
        this.sa = null;
        this.df = a.color;
        this.fn = 0;
        this.Gg = a.wrap;
        this.Bc = Ae(a);
        this.Re = [];
        this.gc = [];
        this.xd = a.bounds.clone();
        this.ho = !0;
        this.Ls = !1;
        this.Fg = a.variable;
        this.links = [];
        null == this.sa && (a = a.text, this.Yc(l(a) ? a : ""))
    };
    m(oi, li);
    g = oi.prototype;
    g.vf = function() {
        if ("none" == this.ed) return this.xd;
        var a = this.xd.clone(),
            b = this.Jl() + 80;
        a.G = this.xd.l + b;
        this.Gg || (b = this.Kl() + 80, "left" == this.ed ? a.s = a.j + b : "right" == this.ed ? a.j = a.s - b : "center" == this.ed && (b = (a.s - b - a.j) / 2, a.j += b, a.s -= b));
        return a
    };
    g.Yc = function(a) {
        this.ho && this.Dc && this.df != this.definition.color && (this.K(0), this.df = this.definition.color);
        if (this.di || this.sa != a) this.Gi && (a = a.replace(/[\t\r\n ]+/g, " ").replace(/^[\t\r\n ]+|[\t\r\n ]+$/g, "")), this.Ls = !0, this.Js(a), this.di = !1
    };
    g.Vr = function(a) {
        this.ho = a
    };
    g.pj = function() {
        var a = this.sa;
        return this.Dc ? qj(a, this.definition.multiline) : a
    };
    g.hs = function(a, b) {
        this.Dc && (a = rj(a), this.Vr(!1));
        (b || this.Yc).call(this, a);
        this.Vr(!0)
    };
    g.Cp = function() {
        var a = this.sa;
        if (this.Dc) {
            for (var b = /\s*<p(?: [^>]*)?>.*?<\/p>\s*/ig, c = 0, d = b.exec(a), e = ""; d;) d.index > c && (e += "<p>" + a.substring(c, d.index) + "</p>"), e += d[0], c = b.lastIndex, d = b.exec(a);
            a.length > c && (e += "<p>" + a.substring(c) + "</p>");
            a = e
        }
        return a
    };
    g.xx = function(a) {
        this.Dc != a && (this.K(0), this.Dc = a)
    };
    g.ms = function(a) {
        this.df = 16777215 & a | this.df & 4278190080;
        this.gk(Be(this.df))
    };
    g.Pp = function() {
        return this.df & 16777215
    };
    g.Pr = function(a) {
        this.xk = a
    };
    g.ug = function(a) {
        this.wi = a;
        this.K(0)
    };
    g.Rr = function(a) {
        this.vi = a & 16777215;
        this.K(0)
    };
    g.Sr = function(a) {
        this.Ai = a;
        this.K(0)
    };
    g.Tr = function(a) {
        this.zi = a & 16777215;
        this.K(0)
    };
    g.Wr = function(a) {
        this.Gi = a
    };
    g.Xr = function(a) {
        this.Ff = a;
        this.Js(this.sa)
    };
    g.wx = function(a) {
        this.Vp = a
    };
    g.as = function(a) {
        this.nm = a
    };
    g.cs = function(a) {
        this.Ve != a && (this.di = !0);
        this.Ve = a;
        this.Eg()
    };
    g.Ax = function(a) {
        this.Xq = a
    };
    g.fs = function(a) {
        this.Km = a
    };
    g.Fx = function(a) {
        this.ps = a
    };
    g.Ix = function(a) {
        this.fn = a
    };
    g.Oe = function() {
        return this.Fg
    };
    g.hk = function(a) {
        this.Fg && this.i.da().on(this.Fg, this);
        (this.Fg = a) && this.i.da().Em(this.Fg, this, this.definition.text)
    };
    g.os = function(a) {
        this.Gg != a && (this.di = !0);
        this.Gg = a;
        this.Eg()
    };
    g.Qr = function(a) {
        this.K(0);
        this.ed = a;
        this.xb()
    };
    g.js = function(a) {
        this.Xh = a
    };
    g.Om = function(a) {
        this.Zi = a
    };
    g.Zl = function() {
        return l(this.cf) ? this.cf : this.Zi
    };
    g.Qp = function(a, b) {
        l(a) ? l(b) || (b = a + 1) : (a = 0, b = this.sa.length);
        for (var c = null, d = 0, e, f = 0; f < this.Re.length; f++)
            for (var h = this.Re[f], k = 0; k < h.length; k++) {
                var n = h[k];
                e = d + n.sa.length - 1;
                d < b && e >= a && (c ? c.mw(n.format) : c = n.format.clone());
                d = e + 1
            }
        c ? c.font = c.Fh() ? c.font.name : c.font : c = new xe;
        return c
    };
    g.Hp = function() {
        var a = new xe;
        a.Cd(this.Bc);
        return a
    };
    g.gk = function(a, b, c) {
        a = a.clone();
        l(b) ? l(c) || (c = b + 1) : (b = 0, c = this.sa.length);
        for (var d = 0, e, f = 0; f < this.Re.length; f++)
            for (var h = this.Re[f], k = 0; k < h.length; k++) {
                var n = h[k],
                    q = n.sa;
                e = d + q.length - 1;
                if (d < c && e >= b) {
                    var u = Math.max(d, b) - d,
                        d = Math.min(e + 1, c) - d;
                    if (0 < u) {
                        var p = n.xh(q.substring(0, u));
                        h.splice(k, 0, p);
                        k++
                    }
                    d < q.length && (p = n.xh(q.substring(d)), h.splice(k + 1, 0, p));
                    n.Yc(q.substring(u, d));
                    null != a.color && (a.color |= 4278190080);
                    !this.Ff && n.format.Ol() && (a.font = n.format.font);
                    n.format.Cd(a);
                    n.ii(this.xl())
                }
                d = e + 1
            }
        this.Eg();
        this.K(0)
    };
    g.es = function(a) {
        this.di = !0;
        this.Bc.Cd(a)
    };
    g.na = function(a, b) {
        oi.U.na.call(this, a, b);
        (this.i.da().Xo || this.Xh) && this.bs(!0);
        this.definition.variable && this.i.da().Em(this.definition.variable, this, this.definition.text)
    };
    g.ta = function() {
        oi.U.ta.call(this);
        this.definition.variable && this.i.da().on(this.definition.variable, this)
    };
    g.qa = function() {
        return this.definition.qa
    };
    g.Js = function(a) {
        this.K(0);
        this.sa = a;
        this.Re = [];
        this.Dc || (a = sj(a));
        this.lt(a, this.Ve)
    };
    g.lt = function(a, b) {
        var c = new tj(null, null);
        c.format = Ae(this.definition);
        if (this.Ff && this.definition.font) {
            var d = this.definition.font.get();
            d instanceof ze && (c.format.font = d)
        } else this.definition.font && (d = this.definition.font.get(), d instanceof ze && (c.format.font = d.name));
        c.format.color = this.df | 0;
        c.format.Fh() && (d = c.format.font, c.format.italic = d.italic, c.format.bold = d.bold);
        this.Dc && this.Bc && (c.format.italic = !!this.Bc.italic, c.format.bold = !!this.Bc.bold, c.format.size = this.Bc.size, c.format.Ra = this.Bc.Ra,
            c.format.indent = this.Bc.indent, c.format.Ua = this.Bc.Ua, d = this.Bc.color, c.format.color = this.Bc.ff ? 4278190080 | d : c.format.color);
        var d = new uj(c, this.xl(), b),
            e = a.replace(/\r\n|\r|\n/g, "<br/>");
        c.ii(this.xl());
        var c = new Id(e, !1, !1, !0),
            f;
        try {
            for (; f = c.next();) switch (f.type) {
                case "tag":
                    e = {};
                    if (f.attributes)
                        for (var h = 0; h < f.attributes.length; ++h) {
                            var k = f.attributes[h];
                            e[k.name.toLowerCase()] = k.value
                        }
                    d.Ox(f.value.toLowerCase(), e);
                    break;
                case "close":
                    d.Du(f.value.toLowerCase());
                    break;
                case "text":
                case "cdata":
                    d.Gt(f.value)
            }
        } catch (n) {}
        this.Re =
            d.em;
        this.Eg()
    };
    g.Eg = function() {
        var a = this.Re;
        if (!(this.Ls || this.Ve || this.Dc)) {
            var b = [];
            b.push(Array.prototype.concat.apply([], a));
            a = b
        }
        this.Gg && (a = this.my(a, this.xd));
        this.gc = a;
        "none" != this.ed && this.xb()
    };
    g.Ep = function(a, b) {
        var c = a.s - a.j - 80;
        b && (c -= b.leftMargin + b.rightMargin + b.Ua);
        return c
    };
    g.my = function(a, b) {
        var c = [],
            d = 0,
            e = !1;
        c[d] = [];
        for (var f = 0; f < a.length; f++) {
            for (var h = a[f], k = 0 < h.length ? h[0].format : null, n = this.Ep(b, k), k = k ? k.indent | 0 : 0, q = 0; q < h.length; q++)
                for (var u = h[q].ly(k, n, e), p = 0; p < u.length; p++) e = h[q].xh(u[p]), e.Zf = p == u.length - 1, c[d].push(e), p == u.length - 1 ? (k += e.I(), e = this.Ve || " " == e.sa[e.sa.length - 1]) : (d++, c[d] = [], k = 0, e = !1);
            d++;
            c[d] = []
        }
        0 == c[d].length && c.pop();
        return c
    };
    g.ev = function(a) {
        if (0 <= a && a < this.gc.length) {
            a = this.gc[a];
            for (var b = "", c = 0; c < a.length; c++) b += a[c].sa;
            return b.replace(/\n/, "")
        }
        return null
    };
    g.Dp = function(a) {
        for (var b = 0, c = 0, d = 0; d < this.gc.length; d++, b = c) {
            for (var e = this.gc[d], f = 0; f < e.length; f++) c += e[f].sa.length, e[f].Zf && c++;
            b = a(d, b, c);
            if (-1 != b) return b
        }
        return -1
    };
    g.dv = function(a) {
        return 0 <= a && a < this.gc.length ? this.Dp(function(b, c) {
            return b == a ? c : -1
        }) : -1
    };
    g.bv = function(a) {
        return 0 <= a && a < this.sa.length ? this.Dp(function(b, c, d) {
            return c <= a && d > a ? b : -1
        }) : -1
    };
    g.zr = function(a) {
        var b = Yh(this);
        this.links = [];
        for (var c = 0, d = !0, e = 0, f = this.gc, h = 0; h < f.length; h++) {
            var k = f[h],
                n = vj(k),
                q = wj(k) * n;
            if (0 != h && "none" == this.ed && c + q > b.G) break;
            var u = 0 < k.length ? k[0].format : null;
            0 == h && u && (e = u.leading | 0, c = b.l + 40 - .5 * e, 0 > e ? c = b.l : 0 > c && (c = b.l + 40));
            for (var p = b.j + 40 + (u ? u.leftMargin : 0), t = this.Ep(b, u), v = 0, w = 0; w < k.length; w++) v += k[w].I();
            if (u) switch (l(u.Ua) && (p += u.Ua), l(u.indent) && d && (p += u.indent, t -= u.indent, d = !1), u.Ra) {
                case 2:
                    p += (t - v) / 2;
                    break;
                case 1:
                    p += t - v
            }
            for (w = 0; w < k.length; w++) k[w].sa.length &&
                (v = 0, u = k[w].I(), !k[k.length - 1].Zf && 3 == k[w].format.Ra && h < f.length - 1 && (v = (k[w].sa.match(/ /g) || []).length, v = (t - u) / v), a.xr(k[w], p, c, n, v), k[w].format.url && (v = new xj(p, c, u, q, k[w].format.url, k[w].format.target), this.links.push(v)), p += u, d = d || k[w].Zf);
            c += q + e
        }
    };
    g.xl = function() {
        return this.Ff ? this.i.Md : null
    };
    g.Sm = function(a) {
        0 <= a && (this.xd.s = this.xd.j + 20 * a, this.Eg(), this.xb(), this.K(0))
    };
    g.Pm = function(a) {
        0 <= a && (this.xd.G = this.xd.l + 20 * a, this.Eg(), this.xb(), this.K(0))
    };
    g.bg = function() {
        var a = this.fv();
        a ? this.i.Rh(new oj(this.i.da(), "", a.fw, a.target, 1)) : oi.U.bg.call(this)
    };
    g.fv = function() {
        var a = new yc(this.i.va.x, this.i.va.y);
        a.Sc(this.ca());
        for (var b = 0; b < this.links.length; b++)
            if (this.links[b].Tn.contains(a.x, a.y)) return this.links[b];
        return null
    };
    var xj = function(a, b, c, d, e, f) {
            this.Tn = new Oc(a, b, a + c, b + d);
            this.fw = e || "";
            this.target = f || "_self"
        },
        yj = function() {
            this.format = ye();
            this.Zf = !1;
            this.sa = "";
            this.li = 0
        },
        zj = xg(1, 1);
    g = yj.prototype;
    g.xh = function(a) {
        var b = this.Hi();
        b.sa = a;
        return b
    };
    g.Yc = function(a) {
        this.sa = a;
        this.li = 0
    };
    g.ii = function(a, b) {
        this.li = 0;
        !l(b) && this.format.Fh() && (b = this.format.font.name);
        if (a) {
            if (!l(b) && l(this.format.font) && (b = String(this.format.font)), !this.format.Fh() || b != this.format.font.name || !!this.format.italic != !!this.format.font.italic || !!this.format.bold != !!this.format.font.bold) {
                var c = Ce;
                if (l(b) && a && a[b])
                    for (var d = a[b], e = 0; e < d.length; ++e) {
                        if (!!this.format.italic == !!d[e].italic && !!this.format.bold == !!d[e].bold) {
                            this.format.font = d[e];
                            return
                        }
                        c == Ce && (c = d[e])
                    }
                this.format.font = c
            }
        } else b && (this.format.font =
            b)
    };
    g.Hi = function() {
        var a = new yj;
        a.format.Cd(this.format);
        return a
    };
    g.I = function() {
        this.li || (this.li = this.measureText(this.sa));
        return this.li
    };
    g.measureText = function(a) {
        var b = 0;
        if (this.format.Ol()) {
            for (var c = 0; c < a.length; c++) {
                var d = this.format.font.zl(a.charAt(c));
                l(d) && (b += d.advance ? d.advance : 0)
            }
            b = b * this.format.size / (this.format.font.emSquareSize | 0)
        } else b = this.Ru(a);
        return b += this.format.letterSpacing * a.length | 0
    };
    g.vp = function() {
        var a = zj.getContext("2d");
        this.format.yc(a);
        return a
    };
    g.Ru = function(a) {
        return this.vp().measureText(a).width
    };
    g.ly = function(a, b, c) {
        for (var d = [], e = 0, f = d[0] = "", h = 0, k = this.sa.split(" "), n = 0; n < k.length; n++)
            if (!(0 < e && 0 == a && "" == k[n])) {
                k[n] = k[n].replace(/&nbsp;/g, " ");
                var q = this.measureText(k[n]);
                a + h + q > b ? q < b && c ? (e++, a = q, d[e] = k[n]) : (e || d[e] ? a = 0 : d.pop(), this.ky(k[n], b, a, d), e = d.length - 1, a = this.measureText(d[e])) : (d[e] = d[e] + f + k[n], a += h + q);
                c = !0;
                0 == n && (f = " ", h = this.measureText("a a") - this.measureText("aa"))
            }
        return d
    };
    g.ky = function(a, b, c, d) {
        this.format.Ol() ? this.jy(a, b, c, d) : this.iy(a, b, c, d)
    };
    g.jy = function(a, b, c, d) {
        for (var e = 0, f = 0, h = this.format.size / (this.format.font.emSquareSize | 0), k = 0; k < a.length; k++) {
            var n = this.format.font.zl(a.charAt(k)),
                n = (l(n) && n.advance ? n.advance : 0) * h + this.format.letterSpacing;
            0 < k - f && e + n > b - c && (d.push(a.substring(f, k)), f = k, c = e = 0);
            e += n
        }
        d.push(a.substring(f))
    };
    g.iy = function(a, b, c, d) {
        for (var e = this.vp(), f = 0; f < a.length;) {
            for (var h = f + 1, k = a.length, n; k > h;) {
                var q = h + (k - h) / 2,
                    q = Math.ceil(q);
                n = a.substring(f, q);
                e.measureText(n).width <= b - c ? h = q : k = q - 1
            }
            d.push(a.substring(f, h));
            f = h;
            c = 0
        }
    };
    var tj = function(a, b) {
        yj.call(this);
        a && this.format.Cd(a.format);
        this.parent = a;
        this.Jw = b
    };
    m(tj, yj);
    var qj = function(a, b) {
            return a.replace(/<[^>]+>|&[^;]+;/g, function(a) {
                switch (a) {
                    case "&amp;":
                        return "&";
                    case "&lt;":
                        return "<";
                    case "&gt;":
                        return ">";
                    case "&quot;":
                        return '"';
                    case "&apos;":
                        return "'";
                    case "&nbsp;":
                        return " ";
                    case "</p>":
                    case "<br>":
                    case "<br/>":
                        return b ? "\n" : ""
                }
                return ""
            })
        },
        rj = function(a) {
            return a.replace(/[<>&]/g, function(a) {
                switch (a) {
                    case "&":
                        return "&amp;";
                    case "<":
                        return "&lt;";
                    case ">":
                        return "&gt;"
                }
                return a
            })
        },
        sj = function(a) {
            return a.replace(/[&<>"'\u02c6\u02dc]/g, function(a) {
                switch (a) {
                    case "&":
                        return "&amp;";
                    case "<":
                        return "&lt;";
                    case ">":
                        return "&gt;";
                    case "'":
                        return "&apos;";
                    case '"':
                        return "&quot;";
                    case "\u02c6":
                        return "&#710;";
                    case "\u02dc":
                        return "&#732;"
                }
                return a
            })
        };
    oi.prototype.Jl = function() {
        for (var a = 0, b = 0; b < this.gc.length; b++) var c = this.gc[b],
            d = vj(c),
            c = wj(c),
            a = a + c * d;
        return a
    };
    var vj = function(a) {
            for (var b = 0, c = 0; c < a.length; c++) b = Math.max(b, a[c].format.size);
            return b
        },
        wj = function(a) {
            for (var b = 1, c = 0; c < a.length; c++) b = a[c].format.Fh() && a[c].format.font.lineHeight ? Math.max(b, a[c].format.font.lineHeight) : Math.max(b, 1.14);
            return b
        },
        Aj = function(a) {
            switch (a) {
                case "left":
                    return 0;
                case "center":
                    return 2;
                case "right":
                    return 1;
                case "justify":
                    return 3;
                default:
                    return 0
            }
        };
    oi.prototype.Kl = function() {
        for (var a = 0, b = 0; b < this.gc.length; b++) {
            for (var c = 0, d = this.gc[b], e = 0; e < d.length; e++) c += d[e].I();
            a = Math.max(a, c)
        }
        return a
    };
    var uj = function(a, b, c) {
        this.Xa = a;
        this.Lc = [];
        this.em = [];
        this.em.push(this.Lc);
        this.Md = b;
        this.multiline = c
    };
    g = uj.prototype;
    g.jg = function(a) {
        this.Xa = new tj(this.Xa, a)
    };
    g.Rw = function(a) {
        var b = this.Xa;
        b.parent && b.Jw == a && (this.Xa = b.parent)
    };
    g.Ox = function(a, b) {
        switch (a) {
            case "p":
                this.jg(a);
                var c = b.align;
                c && (this.Xa.format.Ra = Aj(c));
                break;
            case "b":
                this.jg(a);
                this.Xa.format.bold = !0;
                this.Xa.ii(this.Md);
                break;
            case "i":
                this.jg(a);
                this.Xa.format.italic = !0;
                this.Xa.ii(this.Md);
                break;
            case "u":
                this.jg(a);
                this.Xa.format.Db = !0;
                break;
            case "a":
                this.jg(a);
                if (c = b.href) this.Xa.format.url = c;
                if (c = b.target) this.Xa.format.target = c;
                break;
            case "br":
            case "sbr":
                this.Kn();
                break;
            case "font":
                this.jg(a);
                if (c = b.color) this.Xa.format.color = rg(c);
                (c = b.face) && this.Xa.ii(this.Md,
                    c);
                c = Number(b.size);
                c == c && (this.Xa.format.size = 20 * c);
                c = Number(b.letterspacing);
                c == c && (this.Xa.format.letterSpacing = 20 * c)
        }
    };
    g.Du = function(a) {
        switch (a) {
            case "p":
                this.multiline && this.Kn()
        }
        this.Rw(a)
    };
    g.Kn = function() {
        if (this.Lc.length) {
            var a = this.Lc.length;
            a && (this.Lc[a - 1].Zf = !0);
            do {
                a--;
                var b = this.Lc[a];
                b.Yc(b.sa.replace(/\s+$/g, ""))
            } while (0 < a && !this.Lc[a].sa.length)
        } else a = this.Xa.xh(""), a.Zf = !0, this.Lc.push(a);
        this.Lc = [];
        this.em.push(this.Lc)
    };
    g.Gt = function(a) {
        this.Lc.push(this.Xa.xh(a))
    };
    oi.prototype.Hd = function(a, b, c, d) {
        if (this.Cj(a, b)) {
            if (this.Xh || c(this)) return this;
            a = new yc(a, b);
            a.Sc(this.ca());
            for (b = 0; b < this.links.length; b++)
                if (this.links[b].Tn.contains(a.x, a.y)) return this;
            return d
        }
        return null
    };
    oi.prototype.cv = function(a) {
        var b = this.gc[a];
        if (!b) return null;
        for (var c = a = 0, d = 0, e = 0, f = 0, h = 0; h < b.length; h++) {
            var k = b[h].format.zp(),
                n = b[h].format.size,
                q = b[h].format.leading;
            a = Math.max(a, (k ? k.ascent / k.emSquareSize : .9) * n | 0);
            c = Math.max(c, (k ? k.descent / k.emSquareSize : 1 - .9) * n | 0);
            d = Math.max(d, q);
            e = Math.max(e, q + (k ? k.lineHeight : 1.14) * n | 0);
            f += b[h].I() | 0
        }
        b = Yh(this).j + 40 + b[0] ? b[0].format.leftMargin : 0;
        return {
            ascent: a,
            descent: c,
            leading: d,
            height: e,
            width: f,
            x: b
        }
    };
    var Bj = function(a, b) {
        var c = new Xi(0, 0, a.vc, !0);
        ni.call(this, a, c, "stage");
        this.backgroundColor = Kf(b.backgroundColor).toString();
        this.Xm = b.frameSize.xmax / 20;
        this.Vm = b.frameSize.ymax / 20;
        this.Xc = "showAll";
        this.Qk = this.Pk = this.Ad = this.Bd = this.Og = 0;
        this.jk = Bc;
        this.K(0)
    };
    m(Bj, ni);
    var Cj = {
        L: 1,
        T: 2,
        R: 4,
        B: 8
    };
    g = Bj.prototype;
    g.Hd = function(a, b, c, d, e) {
        a = Bj.U.Hd.call(this, a, b, c, d, e);
        a === this.i.Ka && (a = null);
        return !a && c(this) ? this : a
    };
    g.gs = function(a) {
        this.Xc != a && (this.Xc = a, this.qn())
    };
    g.sp = function(a) {
        for (var b = "", c = this.Og, d = 0; d < a.length; ++d) {
            var e = a[d];
            c & Cj[e] && (b += e)
        }
        return b
    };
    g.Or = function(a) {
        a = a.toUpperCase();
        for (var b = 0, c = 0; c < a.length; ++c) b = b | Cj[a[c]] | 0;
        this.Og != b && (this.Og = b, this.qn())
    };
    g.Is = function() {
        var a;
        a: {
            var b = this.i.ae;
            try {
                if (b.getBoundingClientRect) {
                    var c = b.getBoundingClientRect();
                    a = new Oc(c.left, c.top, c.right, c.bottom);
                    break a
                }
            } catch (d) {}
            a = new Oc(0, 0, b.offsetWidth, b.offsetHeight)
        }
        var b = a.width(),
            c = a.height(),
            e = a.j;
        a = a.l;
        var f = !1;
        if (this.Pk != e || this.Qk != a) this.Pk = e, this.Qk = a, f = !0;
        if (this.Bd != b || this.Ad != c) this.Bd = b, this.Ad = c, "noScale" == this.Xc && this.i.da().Tq(), f = !0;
        f && this.qn()
    };
    g.up = function(a, b, c, d, e) {
        return this.Og & a ? 0 : this.Og & b ? c - d * e : (c - d * e) / 2
    };
    g.qn = function() {
        var a = this.Bd,
            b = this.Ad,
            c = this.Xm,
            d = this.Vm,
            e = c ? a / c : 1,
            f = d ? b / d : 1;
        switch (this.Xc) {
            case "noScale":
                e = f = 1;
                break;
            case "showAll":
                e = f = Math.min(e, f);
                break;
            case "noBorder":
                e = f = Math.max(e, f)
        }
        this.jk = Ic(e / 20, 0, 0, f / 20, this.up(1, 4, a, c, e), this.up(2, 8, b, d, f));
        this.K(0)
    };
    g.ug = function(a) {
        this.K(0);
        this.backgroundColor = a ? a : "rgba(0,0,0,0)"
    };
    g.rp = function(a, b) {
        return this.Bp(a, b, function(a) {
            return a instanceof li && a.Sl && a.cg
        })
    };
    g.Nf = function() {
        return "default"
    };
    var Dj = {
        Dz: "fullScreen",
        Ez: "fullScreenInteractive",
        eB: "normal"
    };
    var Ej = function(a) {
            this.$ = a;
            this.yb = null;
            this.cm = 0;
            this.oq = this.Lh = this.pq = null
        },
        Fj = new wf(3E6),
        Gj = {};
    g = Ej.prototype;
    g.jc = function(a) {
        var b = this.$,
            c = a.Kh(),
            d = b.Mx() || !c;
        (d = d && a.Gv(Og(b))) ? (c && b.Wf() ? this.yu(a) : (this.yb = this.yb && this.yb.release(), this.To(a)), this.cm = this.$.i.sg) : this.yb = this.yb && this.yb.release()
    };
    g.rm = function(a) {
        if (l(a)) return this.cm < this.$.Gd[a];
        for (a = 0; a < this.$.Gd.length; a++)
            if (this.cm < this.$.Gd[a]) return !0;
        return !1
    };
    g.yu = function(a) {
        var b = this.$,
            c = b.wd;
        if (!a.nq() || 11 != c && 10 != c) {
            for (var d = this.yb, e = a.Ek(b), f = b.Ub, h = a.quality, k = 0; 1 <= h && k < f.length; ++k) f[k].sm(a.I(), a.S()) && (h = .5);
            var k = Og(b),
                n = a.kb.clone();
            n.xj(k);
            n.translate(-k.j, -k.l);
            var k = b.ca(),
                b = b.Al(),
                q = a.flags & -5,
                u = d && !this.rm(0) && !this.rm(1) && this.oq.vo(n) && this.Lh.Et(k) && this.pq.Wv(b) && d.quality * d.md >= h * a.md;
            if (d && u) e.scale(1 / a.qb, 1 / a.sb), f = d.kb, e.ia(f) || (e = k.Y - this.Lh.Y, h = k.Z - this.Lh.Z, this.Lh = k, f = f.clone(), f.translate(e, h), d = this.yb = new Mg(d.ua(), f,
                d.md, d.quality, q));
            else {
                d && d.release();
                d = this.yb = a.Li(e, !0, q, h);
                this.Lh = k;
                this.pq = b;
                this.oq = n;
                this.To(d);
                e = new nh(d);
                for (k = 0; k < f.length; ++k) f[k].accept(e);
                b.we() || eh(d.ua(), null, b.Rn(), !0)
            }
            e = 1;
            b.we() && (e = b.Gl());
            a.ut(d, c, e)
        } else this.yb = this.yb && this.yb.release()
    };
    g.To = function(a) {
        a.Td() ? this.kl(a) : this.zu(a)
    };
    g.kl = function(a) {
        var b = this.Qu(a);
        b ? this.ix(b, a) : this.Ib(a)
    };
    g.Qu = function(a) {
        var b = this.$;
        if (a.Vf() || a.Zh || !this.Tm()) return null;
        var c = a.qb / a.quality,
            d = a.sb / a.quality,
            e = b.ca(),
            f = e.F * e.F * c * c + e.J * e.J * d * d,
            c = e.u * e.u * d * d + e.C * e.C * c * c;
        if (1.2 * f < c || 1.2 * c < f || .001 < Math.abs(e.F * e.C + e.J * e.u) + Math.abs(e.F * e.J + e.C * e.u)) return null;
        e = Gj[b.definition.hi];
        e || (e = f, Gj[b.definition.hi] = e);
        f = Math.ceil(Math.log(f / e) / 2 / Math.log(1.4) - .05);
        b = b.Rc();
        if (b.we() || a.Td()) b = Nc;
        c = this.Il(a, f, b);
        d = Fj.Aa(c);
        !d && Fj.Bt() && (d = this.Tw(a, Math.pow(1.4, f) * Math.sqrt(e), b)) && Fj.add(c, d);
        return d
    };
    g.Il = function(a, b, c) {
        return this.$.definition.hi + ";" + b + ";" + a.Kh() + c.Qx()
    };
    g.Tm = function() {
        return !1
    };
    g.ix = function(a, b) {
        var c = this.$,
            d = b.yh(c.ca());
        b.Td() || (c = c.Rc(), c.we() && (d.globalAlpha = c.Gl()));
        c = a.vt;
        a.Rd.kd(d, c.j, c.l, c.width(), c.height());
        d.globalAlpha = 1;
        a.Cw = !1
    };
    g.Tw = function(a, b, c) {
        var d = this.$,
            e = Oh(d).clone();
        e.scale(b, b);
        e.Mw(1);
        e.cj();
        if (e.Wa() || 1E6 < e.width() * e.height()) return null;
        var f = a.ua().ua(e.width(), e.height(), !1, !0),
            h = new Oc(0, 0, e.width(), e.height());
        h.translate(e.j, e.l);
        h.scale(1 / b, 1 / b);
        var k = new Mg(f, h, a.md, a.quality, a.flags),
            n = this;
        d.detach(Bc, c, function() {
            n.Ib(k)
        });
        e.scale(1 / b, 1 / b);
        return new xf(f, e, c)
    };
    g.Ib = function() {};
    g.zu = function(a) {
        var b = this.$.Id;
        b ? (a = a.vs(b, a.flags | 8), b.Qf(yf).jc(a), a = a.On(), this.kl(a), a.nl()) : this.kl(a)
    };
    g.ta = function() {
        this.yb = this.yb && this.yb.release()
    };
    var Hj = function(a, b) {
        for (var c = [], d = b.Ha; d; d = d.nextSibling)
            if ((!d.Va || a.Td()) && !d.Fc) {
                for (; 0 < c.length && d.depth > c[c.length - 1];) c.pop(), a = a.nl();
                var e = d.Xp() && !a.Td();
                if (e) {
                    if (d instanceof oi) continue;
                    c.push(d.ze);
                    a = a.vs(d)
                }
                d.Qf(yf).jc(a);
                e && (a = a.On())
            }
        for (d = 0; d < c.length; d++) a = a.nl()
    };
    var Ij = function(a, b) {
        this.i = a;
        this.zc = document.createElement("canvas");
        this.Ci = null;
        this.Gm = 0;
        this.Hm = new Oc(0, 0, 0, 0);
        this.ts = b.al(a.X)
    };
    Ij.prototype.ui = function(a) {
        a.appendChild(this.zc)
    };
    Ij.prototype.yr = function() {
        var a = this.i,
            b = a.X,
            c = window.devicePixelRatio || 1,
            a = a.Tp();
        if (!a.Wa()) {
            var d = Math.max(b.Bd, b.Ad);
            2048 < d * c && (c = 2048 / d);
            if (this.ts.rm() || this.Gm != c || !this.Hm.vo(a)) this.Ci || (this.Ci = new Jg(b.Bd * c, b.Ad * c)), this.Hm.ia(a) && this.Gm == c ? Za && (this.zc.width = a.width() * c, this.zc.height = a.height() * c) : (this.zc.width = a.width() * c, this.zc.height = a.height() * c, this.zc.style.width = a.width() + "px", this.zc.style.height = a.height() + "px", this.zc.style.position = "relative", this.zc.style.left = a.j + "px",
                this.zc.style.top = a.l + "px"), b = b.jk, d = a.clone(), d.translate(-b.Y, -b.Z), d.scale(1 / b.F, 1 / b.u), this.Gm = c, this.Hm = a, this.Tu(d, c, new Hg(yg(this.zc), this.Ci)), Fj.Lk(), this.Ci.Lk()
        }
    };
    Ij.prototype.ta = function() {
        this.i.X.og()
    };
    var Jj = function(a) {
        Ej.call(this, a)
    };
    m(Jj, Ej);
    yf.La(ki, Jj);
    Jj.prototype.Ib = function(a) {
        var b = this.$,
            c = b.Rb.ua();
        if (c) {
            var d = 20 * c.I(),
                e = 20 * c.S(),
                f = a.yh(b.ca());
            a.Kh() ? (a = fh(c, f, b.Rc()), a.kd(f, 0, 0, d, e), a.od(c)) : f.fillRect(0, 0, d, e)
        }
    };
    var Kj = function(a) {
        Ej.call(this, a)
    };
    m(Kj, Ej);
    yf.La(pi, Kj);
    yf.La(ri, Kj);
    Kj.prototype.Ib = function(a) {
        Hj(a, a.Vf() ? this.$.Qd : this.$.N)
    };
    var Lj = function(a) {
        Ej.call(this, a)
    };
    m(Lj, Ej);
    yf.La(oi, Lj);
    Lj.prototype.Ib = function(a) {
        var b = this.$,
            c = a.yh(b.ca()),
            d = Yh(b);
        if (a.Vf()) c.fillRect(d.j, d.l, d.width(), d.height());
        else {
            a = a.Td();
            if (!a) {
                c.save();
                c.beginPath();
                c.rect(d.j, d.l, d.width(), d.height());
                var d = b.ac ? void 0 : b.Rc(),
                    e;
                b.wi && (e = Kf(b.vi, d), c.fillStyle = e.toString(), c.fill());
                b.Ai && (e = Kf(b.zi, d), c.strokeStyle = e.toString(), c.lineJoin = "miter", Mj(c));
                c.clip()
            }
            b.zr(new Nj(c, b, a));
            a || c.restore()
        }
    };
    var Nj = function(a, b, c) {
        this.Oi = a;
        this.It = c;
        this.$ = b
    };
    Nj.prototype.xr = function(a, b, c, d, e) {
        var f = this.Oi,
            h = this.$,
            k = a.format,
            n = k.size,
            q = k.letterSpacing,
            u = a.sa;
        if (!this.It) {
            var p = Kf(k.color),
                p = h.Rc().apply(p);
            f.fillStyle = p.rd()
        }
        h = k.zp();
        c += d * (h ? h.ascent / h.emSquareSize : .9);
        if (h) u = h.Jm(u), h.wr(f, n, u, h.dw(b, n, q, e, u), c, Bc, null, null);
        else if (k.yc(f), q || e)
            for (n = b, p = 0; p < u.length; p++) {
                var t = u[p];
                " " == t && (n += e);
                f.fillText(t, n, c);
                n += f.measureText(t).width + q
            } else f.fillText(u, b, c);
        k.Db && (d = c + d * (h ? h.descent / h.emSquareSize : 1 - .9) / 2, f.beginPath(), f.moveTo(b, d), f.lineTo(b +
            a.I(), d), Mj(f))
    };
    var Mj = function(a) {
        a.save();
        a.transform(1, 0, 0, 1, 0, 0);
        a.lineWidth = 10;
        a.stroke();
        a.restore()
    };
    var Oj = function(a) {
        Ej.call(this, a)
    };
    m(Oj, Ej);
    yf.La(Mi, Oj);
    Oj.prototype.Ib = function(a) {
        var b = this.$;
        a = a.gy(b.sv());
        var c = b.De;
        c && Pj(a, c.definition.paths, b);
        Hj(a, b.N)
    };
    var Sj = function(a) {
        Ej.call(this, a)
    };
    m(Sj, Ej);
    yf.La(qi, Sj);
    yf.La(Fi, Sj);
    Sj.prototype.Ib = function(a) {
        var b = this.$;
        Pj(a, b.definition.paths, b)
    };
    var Pj = function(a, b, c) {
        for (var d = c.ya(), e = c.ca(), f = c.Rc(), h = a.yh(e), k = 0; k < b.length; k++) {
            var n = b[k],
                q = n.data.Aa(c).slice(a.Zh, d);
            h.beginPath();
            q.Wo(h);
            n.fill && (a.Kh() ? n.fill.yc(c, h, f) : h.fill());
            n.line && !a.Td() && (a.Vf() ? n.line.bn(c, a, h, q, e) : n.line.Qn(c, a, h, q, e, f))
        }
    };
    Sj.prototype.Tm = function() {
        return this.$.definition.Dt && this.$.definition.hy
    };
    Sj.prototype.Il = function(a, b, c) {
        return Sj.U.Il.call(this, a, b, c) + this.$.Qc()
    };
    var Tj = function(a) {
        Ij.call(this, a, yf)
    };
    m(Tj, Ij);
    yf.nr(Tj);
    Tj.prototype.Tu = function(a, b, c) {
        a = new Mg(c, a, b, 1, 4);
        this.hx(a);
        this.ts.jc(a)
    };
    Tj.prototype.hx = function(a) {
        a.clear(this.i.X.backgroundColor)
    };
    var Uj = function(a) {
        Ej.call(this, a)
    };
    m(Uj, Ej);
    yf.La(Bj, Uj);
    Uj.prototype.Ib = function(a) {
        Hj(a, this.$.N)
    };
    var Vj = function(a) {
        Ej.call(this, a)
    };
    m(Vj, Ej);
    yf.La(si, Vj);
    Vj.prototype.Ib = function(a) {
        for (var b = this.$.ca(), c = this.$.Rc(), d = this.$.definition, e = d.Yx, f = a.vv(), b = a.nv(b), h = d.matrix.multiply(b), c = a.Kh() ? c : null, k = 0; k < d.records.length; k++) d.records[k].jx(f, h, c, e);
        a.Vf() && e && (a = d.bounds, a.Wa() || (b.yc(f), f.fillRect(a.j, a.l, a.s - a.j, a.G - a.l)))
    };
    Vj.prototype.Tm = function() {
        return !0
    };
    var Wj = function(a) {
        Ej.call(this, a)
    };
    m(Wj, Ej);
    yf.La(ti, Wj);
    Wj.prototype.Ib = function() {};
    var Xj = function(a) {
        this.$ = a
    };
    m(Xj, Pi);
    Mf.La(Mi, Xj);
    Mf.La(Bj, Xj);
    Mf.La(pi, Xj);
    Mf.La(ri, Xj);
    Xj.prototype.Ib = function(a) {
        var b = this.$;
        if (b.Uf())
            for (b = b.N.Ha; b; b = b.nextSibling) b.Va || b.Qf(Mf).jc(a)
    };
    var Yj = function(a) {
        this.$ = a
    };
    m(Yj, Pi);
    Mf.La(oi, Yj);
    Yj.prototype.Ib = function() {
        this.$.zr(this)
    };
    Yj.prototype.xr = function() {};
    Yj.prototype.ta = function() {};
    var Zj = function(a, b, c, d) {
        Tf.call(this, a.id);
        this.font = d || null;
        this.height = a.height;
        this.color = l(a.color) ? a.color : 4278190080;
        this.text = a.text;
        this.align = !l(a.align) || a.html && 7 >= c ? 0 : a.align;
        this.bounds = b;
        this.html = !!a.html;
        this.wrap = !!a.wrap;
        this.multiline = !!a.multiline;
        this.indent = a.indent;
        this.leading = a.leading;
        this.leftMargin = a.leftMargin;
        this.rightMargin = a.rightMargin;
        this.border = !!a.border;
        this.variable = a.variable || null;
        this.qa = 6 <= c;
        this.selectable = !!a.selectable;
        this.editable = !!a.editable;
        this.password = !!a.password;
        this.maxChars = a.maxChars || null;
        this.Yo = !!a.embed;
        this.autoSize = a.autoSize ? "left" : "none"
    };
    m(Zj, Tf);
    Rf(13, function(a, b, c) {
        c = l(a.font) ? c.wc.Ie(a.font) : null;
        return new Zj(a, Qc(a.bounds), b.Dh().vc, c)
    });
    Zj.prototype.ub = function(a, b, c) {
        return new oi(this, a, b, c)
    };
    var ak = function(a, b) {
            for (var c = x(a), d = "(", e = 0; e < b.length; ++e) 0 < e && (d += ", "), d += b[e] + "=" + c[e];
            return d + ")"
        },
        bk = function(a) {
            a = x(a);
            return new Mc(256 * a[0] | 0, a[4], 256 * a[1] | 0, a[5], 256 * a[2] | 0, a[6], 256 * a[3] | 0, a[7])
        },
        ck = function(a, b) {
            return new a(b.Mb / 256, b.Kb / 256, b.Gb / 256, b.Ta / 256, b.dc, b.$b, b.Sb, b.Eb)
        },
        dk = "redMultiplier greenMultiplier blueMultiplier alphaMultiplier redOffset greenOffset blueOffset alphaOffset".split(" "),
        ek = function(a) {
            var b = x(this);
            a = x(a);
            for (var c = 0, d = 4; 4 > c; ++c, ++d) b[d] += b[c] * a[d], b[c] *=
                a[c]
        },
        fk = function() {
            var a = x(this);
            return (a[4] << 16 | a[5] << 8 | a[6]) >>> 0
        },
        gk = function(a) {
            var b = x(this);
            b[0] = 0;
            b[1] = 0;
            b[2] = 0;
            b[4] = a >> 16 & 255;
            b[5] = a >> 8 & 255;
            b[6] = a & 255
        },
        hk = "a b c d tx ty".split(" "),
        ik = function(a) {
            a = x(a);
            return new Ac(a[0], a[1], a[2], a[3], 20 * a[4], 20 * a[5])
        },
        jk = function(a, b) {
            return new a(b.F, b.J, b.C, b.u, b.Y / 20, b.Z / 20)
        },
        kk = function(a) {
            var b = x(this);
            a = x(a);
            var c;
            c = b[0] * a[0] + b[1] * a[2];
            b[1] = b[0] * a[1] + b[1] * a[3];
            b[0] = c;
            c = b[2] * a[0] + b[3] * a[2];
            b[3] = b[2] * a[1] + b[3] * a[3];
            b[2] = c;
            c = b[4] * a[0] + b[5] * a[2] + a[4];
            b[5] = b[4] * a[1] + b[5] * a[3] + a[5];
            b[4] = c
        },
        lk = function(a) {
            var b = x(this);
            a = x(a);
            for (var c = 0; 6 > c; ++c) b[c] = a[c]
        },
        mk = function(a, b, c, d, e) {
            var f = x(this),
                h = Math.cos(c);
            c = Math.sin(c);
            f[0] = h * a;
            f[1] = c * b;
            f[2] = -c * a;
            f[3] = h * b;
            f[4] = d;
            f[5] = e
        },
        nk = function(a, b, c) {
            var d = x(this);
            return new c(d[0] * a + d[2] * b, d[1] * a + d[3] * b)
        },
        ok = function() {
            var a = x(this);
            a[0] = 1;
            a[1] = 0;
            a[2] = 0;
            a[3] = 1;
            a[4] = 0;
            a[5] = 0
        },
        pk = function() {
            var a = x(this),
                b = a[0],
                c = a[1],
                d = a[2],
                e = a[3],
                f = a[4],
                h = a[5];
            if (0 == c && 0 == d) a[0] = 1 / b, a[3] = 1 / e, a[4] = -f / b, a[5] = -h / e;
            else {
                var k =
                    b * e - c * d;
                0 == k ? ok.call(this) : (a[0] = e / k, a[1] = -c / k, a[2] = -d / k, a[3] = b / k, a[4] = (d * h - e * f) / k, a[5] = (c * f - b * h) / k)
            }
        },
        qk = function(a) {
            var b = x(this),
                c = Math.cos(a);
            a = Math.sin(a);
            var d;
            d = b[0] * c - b[1] * a;
            b[1] = b[1] * c + b[0] * a;
            b[0] = d;
            d = b[2] * c - b[3] * a;
            b[3] = b[3] * c + b[2] * a;
            b[2] = d;
            d = b[4] * c - b[5] * a;
            b[5] = b[5] * c + b[4] * a;
            b[4] = d
        },
        rk = function(a, b) {
            var c = x(this);
            c[0] *= a;
            c[1] *= b;
            c[2] *= a;
            c[3] *= b;
            c[4] *= a;
            c[5] *= b
        },
        sk = function(a, b, c) {
            var d = x(this);
            return new c(d[0] * a + d[2] * b + d[4], d[1] * a + d[3] * b + d[5])
        };
    Object.defineProperty(Array, "CASEINSENSITIVE", {
        value: 1
    });
    Object.defineProperty(Array, "DESCENDING", {
        value: 2
    });
    Object.defineProperty(Array, "NUMERIC", {
        value: 16
    });
    Object.defineProperty(Array, "RETURNINDEXEDARRAY", {
        value: 8
    });
    Object.defineProperty(Array, "UNIQUESORT", {
        value: 4
    });
    var tk = function(a, b, c) {
            var d = b & Array.DESCENDING ? -1 : 1,
                e = r,
                f;
            f = b & Array.NUMERIC ? e.no : b & Array.CASEINSENSITIVE ? e.lo : e.mo;
            return function(b, k) {
                return d * f.call(e, b && b[a], k && k[a]) || c(b, k)
            }
        },
        uk = function(a, b) {
            return function(c, d) {
                return b(a[c], a[d])
            }
        };
    Object.defineProperty(Array.prototype, "sortOn", {
        value: function(a, b) {
            a = da(a) ? a : [a];
            var c;
            da(b) && b.length == a.length ? c = b[0] >>> 0 : (c = b >>> 0, b = null);
            for (var d = c & Array.RETURNINDEXEDARRAY, e = c & Array.UNIQUESORT, f = !1, h = function() {
                    f = !0;
                    return 0
                }, k = a.length - 1; 0 <= k; --k) h = tk(a[k], b ? b[k] >>> 0 : c, h);
            c = this;
            if (d || e)
                for (h = uk(c, h), c = [], k = this.length - 1; 0 <= k; --k) c[k] = k;
            c.sort(h);
            if (e) {
                if (f) return 0;
                if (!d) {
                    for (d = 0; d < c.length; d++)
                        if (-1 != c[d]) {
                            for (var e = this[d], n, h = d; n = c[h], c[h] = -1, n != d; h = n) this[h] = this[n];
                            this[h] = e
                        }
                    return this
                }
            }
            return c
        }
    });
    var r = null,
        fj = function(a, b, c) {
            a = b[a];
            if (ia(a)) return a.call.apply(a.call, arguments)
        },
        vk = {};
    USING_XML_HTTP_MOCK = !!aa.USING_XML_HTTP_MOCK;
    var wk = function(a, b, c) {
            vg(b);
            this.ae = a;
            this.vc = b.version;
            a = window.location.href;
            var d = c && c.maxFrameDrop;
            null != d || (d = 3);
            this.kx = sf[c && c.renderer || "swiffy.CANVAS"];
            this.va = new Uc;
            this.Nx = new te;
            this.Lw = b.fileSize;
            this.dg = [];
            this.xf = new dg(b.frameRate, d, this);
            this.el = 0;
            this.Wj = [];
            this.Bs = [];
            this.Md = {};
            this.Cb = new vd;
            this.xa = new(vk[Yi(b) ? "as3" : "as2"])(this);
            d = Zi(b, this.xa.Ed);
            this.Vc = [];
            this.hd = null;
            this.Jk = !1;
            this.$x = 1;
            this.qs = !(c && c.dontWireEvents);
            this.Ea = document.createElement("div");
            this.Ea.style.position =
                "relative";
            this.Ea.style.width = "100%";
            this.Ea.style.height = "100%";
            this.Ea.style.overflow = "hidden";
            this.Ea.style.webkitTapHighlightColor = "rgba(0,0,0,0)";
            this.Ea.style.webkitUserSelect = "none";
            this.Ea.style.HC = "none";
            this.Ea.style.IC = "none";
            var e = c && c.touchRadius;
            null != e || (e = 16);
            this.Bm = new $c(this, e);
            this.sg = 1;
            this.X = new Bj(this, b);
            this.Ka = new Mi(d, this, "#0");
            3 == this.xa.Ed.ql() && (this.Ka.Ob("root1"), this.Ka.Zr(this.xa.Of()));
            this.X.na();
            this.Ka.tu(19);
            this.Ka.play();
            this.vk(this.Ka, 0);
            this.Wm = this.kx.hu(this);
            this.Qb = null;
            this.cq(d.wc);
            this.X.Is();
            this.kp = !0;
            this.sd = [];
            this.Ef = null;
            this.ks(a);
            this.navigate = Ag;
            this.hp = Nd;
            this.ht = !(c && 0 == c.allowScriptAccess);
            this.Tl = !1
        },
        xk = ["swiffy", "Stage"],
        yk = aa;
    xk[0] in yk || !yk.execScript || yk.execScript("var " + xk[0]);
    for (var zk; xk.length && (zk = xk.shift());) !xk.length && l(wk) ? yk[zk] = wk : yk = yk[zk] ? yk[zk] : yk[zk] = {};
    wk.prototype.Bl = function(a, b) {
        for (var c = this.Bs, d = 0; d < c.length; d++) {
            var e = c[d].hm[a];
            if (e instanceof b) return e
        }
    };
    wk.prototype.pause = function() {
        this.xf.stop()
    };
    wk.prototype.qu = function() {
        this.xf.stop();
        this.Bm.Zx();
        this.X.ta();
        this.Wm.ta();
        Ib(this.Ea);
        var a = this.Ea;
        a && a.parentNode && a.parentNode.removeChild(a);
        this.nc().an()
    };
    wk.prototype.destroy = wk.prototype.qu;
    wk.prototype.ug = function(a) {
        this.X.ug(a)
    };
    wk.prototype.setBackground = wk.prototype.ug;
    wk.prototype.sx = function(a) {
        this.hp = a || Nd
    };
    wk.prototype.setExternalInterfaceCallHook = wk.prototype.sx;
    wk.prototype.ux = function(a) {
        hi(a, this.mp())
    };
    wk.prototype.setFlashVars = wk.prototype.ux;
    wk.prototype.ks = function(a) {
        this.xa.Of().Ag(a);
        ii(a, this.mp())
    };
    wk.prototype.setSwfUrl = wk.prototype.ks;
    wk.prototype.ds = function(a) {
        this.navigate = a || Ag
    };
    wk.prototype.setNavigateHook = wk.prototype.ds;
    wk.prototype.Lx = function(a) {
        this.ds(a ? function(b, c, d) {
            b = a(b, d ? "POST" : "GET", c);
            Ag.call(this, b, c, d)
        } : null)
    };
    wk.prototype.setUrlHook = wk.prototype.Lx;
    wk.prototype.start = function() {
        var a = this.xf;
        this.Hk(function() {
            a.start()
        })
    };
    wk.prototype.start = wk.prototype.start;
    g = wk.prototype;
    g.vk = function(a, b) {
        this.X.bd(a, -16384 + b);
        this.da().kr(a, b)
    };
    g.wq = function(a, b, c) {
        b = new Mi(b, this, null);
        c && c(b);
        this.vk(b, a);
        b.na();
        b.ac = !0;
        this.eb()
    };
    g.$u = function(a) {
        return this.X.Mc(-16384 + a)
    };
    g.Ri = function() {
        this.el++
    };
    g.Ce = function() {
        if (0 == --this.el) {
            for (var a = 0; a < this.Wj.length; a++) this.Wj[a].call();
            this.Wj = []
        }
    };
    g.Qv = function() {
        return 0 == this.el
    };
    g.Hk = function(a) {
        this.Qv() ? a.call() : this.Wj.push(a)
    };
    g.fy = function() {
        this.qs = !1;
        this.Bm.ey();
        yb(document, "keyup", this.cw, !1, this);
        yb(new Tb(document), "key", this.bw, !1, this)
    };
    g.Ww = function(a) {
        this.Ka.map(function(b) {
            if (b instanceof li) return b.fireEvent(a)
        })
    };
    g.Nq = function() {
        this.jo();
        this.va.fk(!0);
        this.xa.Cf(new xc(3));
        this.eb();
        this.xa.bg();
        this.Qb ? this.Qb.bg() : this.setCapture(this.X);
        this.eb();
        this.Hf(!1)
    };
    g.Rq = function() {
        this.va.fk(!1);
        this.xa.Cf(new xc(2));
        this.eb();
        this.xa.Rj();
        this.Qb ? this.Qb.Rj() : this.releaseCapture(this.X);
        this.eb();
        this.Hf(!0)
    };
    g.Qq = function(a) {
        if (a) {
            var b = a.getParent();
            if (b) {
                do this.xa.si(b) || (a = b); while (b = b.getParent())
            }
        }
        this.Qb != a && (this.xa.Pq(this.Hq(this.Qb), this.Hq(a)), this.Qb = a, this.eb(), this.Hf(!1), this.pn())
    };
    g.Ye = function(a, b) {
        var c = this.va.x = a.x,
            d = this.va.y = a.y;
        l(b) || (b = this.X.rp(c, d));
        this.Ef && this.Ef.rw(c, d);
        this.xa.Dq(b);
        this.Cb.flush();
        this.Qq(b)
    };
    g.Oq = function() {
        this.setCapture(this.X, !0)
    };
    g.Sq = function() {
        this.releaseCapture(this.X)
    };
    g.Tp = function() {
        var a = this.X,
            b = new Oc(0, 0, a.Bd, a.Ad),
            c = new Oc(0, 0, window.innerWidth, window.innerHeight);
        c.translate(-a.Pk, -a.Qk);
        //b.xj(c);
        return b
    };
    g.cw = function(a) {
        this.xa.Gj(a);
        this.xa.Cf(new xc(0));
        this.eb();
        this.xa.$n();
        this.Hf(!0)
    };
    g.bw = function(a) {
        this.xa.Fj(a);
        this.xa.Cf(new xc(1));
        this.eb();
        this.xa.Zn();
        this.Ww(new xc(20));
        this.eb();
        this.Hf(!0)
    };
    g.Uv = function() {
        return null != this.Qb
    };
    g.pn = function() {
        var a = this.va.Uu();
        a || (a = "default", (this.Bj() || this.Tv() || !this.Jh() && this.Uv()) && this.Qb && (a = this.Qb.Nf()));
        this.Ea.style.cursor = a
    };
    g.ws = function(a, b, c, d, e, f) {
        this.mk();
        var h = null;
        l(c) && l(d) && l(e) && l(f) && (h = new Oc(20 * c, 20 * d, 20 * e, 20 * f));
        this.Ef = new Tc(a, h, l(b) && b, this.va.x, this.va.y)
    };
    g.mk = function() {
        this.Ef = null
    };
    g.Sv = function(a) {
        return null != this.Ef && this.Ef.clip === a
    };
    g.Hq = function(a) {
        return a != this.X ? a : null
    };
    g.Jh = function() {
        return !!this.hd && !this.hd.Ud()
    };
    g.Bj = function() {
        return this.Jh() && this.Jk
    };
    g.Aj = function(a) {
        return this.hd == a && !a.Ud()
    };
    g.Tv = function() {
        var a = this.Qb;
        return !!a && this.Aj(a)
    };
    g.setCapture = function(a, b) {
        this.releaseCapture(a);
        this.va.fk(!0);
        this.hd = a;
        b && (this.Jk = !0, this.pn())
    };
    g.releaseCapture = function(a) {
        this.va.fk(!1);
        this.hd && (this.pn(), this.hd != a && (this.jo(), this.hd && (this.hd.Ft(), this.eb())), this.hd = null, this.Jk = !1)
    };
    g.dx = function(a) {
        2 == this.xa.Ed.ql() ? this.Vc.push(a) : this.dg.push(a)
    };
    g.cq = function(a, b) {
        a.Ot(this, b);
        this.Bs.push(a)
    };
    g.tick = function() {
        this.qs && this.fy();
        this.Vc = this.Vc.filter(function(a) {
            return !a.Ud()
        });
        this.X.Is();
        if (this.kp) this.xa.ol(), this.Ka.fireEvent(new xc(6)), this.Qt(), this.xa.im(this.xa.Of());
        else {
            this.xa.ol();
            for (var a = this.Vc.length - 1; 0 <= a; --a) {
                var b = this.Vc[a];
                b.fireEvent(new xc(6));
                b.tick()
            }
            this.dg.length && (Array.prototype.push.apply(this.Vc, this.dg), this.dg = []);
            this.eb();
            b = this.Ka.Iv();
            for (a = this.Vc.length - 1; 0 <= a; --a)
                for (var c = this.Vc[a]; c.io(b);)
                    if (c.getParent()) c = c.getParent();
                    else {
                        c.map(di);
                        break
                    }
            this.Ka.map(di)
        }
        this.xa.fp();
        this.eb();
        this.X.Uf() && this.Bm.qm && (a = this.X.rp(this.va.x, this.va.y), a != this.Qb && this.Qq(a));
        this.Hf(!1);
        this.kp = !1
    };
    g.Qt = function() {
        this.Ka.na();
        this.Ka.o.$version = "HTML 11,0,0,0";
        Array.prototype.push.apply(this.Vc, this.dg);
        this.dg = [];
        this.eb();
        this.Ka.sh(7);
        this.Ka.fireEvent(new xc(7))
    };
    g.da = function() {
        return this.xa
    };
    g.eb = function() {
        this.Cb.flush()
    };
    g.Hf = function(a) {
        for (var b = [], c = 0; c < this.sd.length; ++c) this.sd[c].request(a) || b.push(this.sd[c]);
        this.sd = b
    };
    g.jo = function() {
        this.sd = []
    };
    g.Rh = function(a) {
        for (var b = 0; b < this.sd.length; ++b)
            if (this.sd[b].target == a.target) {
                this.sd[b] = a;
                return
            }
        this.sd.push(a)
    };
    g.mj = function() {
        return this.xf
    };
    g.Sp = function() {
        return Date.now() - this.xf.ju
    };
    g.nc = function() {
        return this.Nx
    };
    g.mp = function() {
        var a = this.xa;
        return function(b, c) {
            b && a.Yr(b, c || "")
        }
    };
    g.Bh = function() {
        return "instance" + this.$x++
    };
    g.bk = function() {
        this.Tl && (this.da().bk(), this.eb(), this.Tl = !1);
        this.Wm.yr();
        this.Ea.parentNode || (this.Wm.ui(this.Ea), this.ae.appendChild(this.Ea));
        this.sg++
    };
    g.Kv = function() {
        this.Tl = !0
    };
    g.pd = function() {
        this.xf.pd()
    };
    g.getName = function() {
        return this.ae.id
    };
    g.su = function() {
        if (window.top == window) return !1;
        var a = this.ae.parentNode;
        if (!a || a != document.body) return !1;
        for (a = a.firstChild; a; a = a.nextSibling)
            if (a != this.ae && "SCRIPT" != a.tagName && (a.nodeType != Node.TEXT_NODE || a.nodeValue.trim())) return !1;
        return !0
    };
    g.wl = function() {
        return this.ht ? this.ae : null
    };
    var Ak = 1,
        Bk = function(a, b) {
            a.prototype = Object.create(b.prototype);
            a.prototype.constructor = a
        },
        C = function(a, b, c) {
            c && Bk(a, c);
            a.prototype ? (c = a.prototype.__swiffy_as2_classdef || null, Object.defineProperty(a.prototype, "__swiffy_as2_classdef", {
                value: a
            })) : c = Object;
            Object.defineProperty(a, "__swiffy_as2_typeid", {
                value: Ak++
            });
            Object.defineProperty(a, "__swiffy_as2_baseclass", {
                value: c
            });
            Object.defineProperty(a, "__swiffy_as2_name", {
                value: b
            })
        };
    C(Object, "Object");
    var D = function(a, b, c, d) {
        b = null == b ? Object.getOwnPropertyNames(a) : fa(b) ? b.split(",") : b;
        var e = {};
        d & 4 && (e.writable = !0);
        d & 2 && (e.configurable = !0);
        d & 1 && (e.enumerable = !0);
        c & 4 && (e.writable = !1);
        c & 2 && (e.configurable = !1);
        c & 1 && (e.enumerable = !1);
        for (c = 0; c < b.length; ++c)(d = Object.getOwnPropertyDescriptor(a, b[c])) && d.configurable && Object.defineProperty(a, b[c], e)
    };
    var Ck = function(a) {
        Object.defineProperty(this, "__swiffy_vm", {
            value: a
        })
    };
    C(Ck, "AsBroadcaster");
    var Ek = function(a) {
            return function(b) {
                for (var c = [], d = 1; d < arguments.length; ++d) c.push(arguments[d]);
                for (d = 0; d < this._listeners.length; ++d) {
                    var e = this._listeners[d],
                        f = a.Oa(e, b);
                    Dk(e, f, c, b)
                }
                return 0 < this._listeners.length ? !0 : void 0
            }
        },
        Fk = function(a) {
            null != a ? Da(this._listeners, a) : Ea(this._listeners, function(a) {
                return null == a
            });
            this._listeners.push(a);
            return !0
        },
        Gk = function(a) {
            return Da(this._listeners, a)
        };
    Ck.prototype.initialize = function(a) {
        ja(a) && (a._listeners = [], a.addListener = Fk, a.broadcastMessage = Ek(this.__swiffy_vm), a.removeListener = Gk, D(a, ["addListener", "broadcastMessage", "removeListener", "_listeners"], 3))
    };
    D(Ck.prototype, null, 3);
    var Hk = function() {};
    C(Hk, "BitmapFilter");
    var Ik = function(a, b, c, d, e, f, h, k, n, q, u, p) {
        this.angle = l(b) ? b : 45;
        this.blurX = l(h) ? h : 4;
        this.blurY = l(k) ? k : 4;
        this.distance = l(a) ? a : 4;
        this.highlightAlpha = l(d) ? d : 1;
        this.highlightColor = l(c) ? c : 16777215;
        this.knockout = l(p) ? p : !1;
        this.quality = l(q) ? q : 1;
        this.shadowAlpha = l(f) ? f : 1;
        this.shadowColor = l(e) ? e : 0;
        this.strength = l(n) ? n : 1;
        this.type = l(u) ? u : "inner";
        D(this, null, 3)
    };
    C(Ik, "BevelFilter", Hk);
    be(Ik, function() {
        return new le(this.angle * Math.PI / 180, Lc(this.highlightColor, this.highlightAlpha), Lc(this.shadowColor, this.shadowAlpha), this.distance, this.strength, this.quality, this.blurX, this.blurY, je(this.type, this.knockout))
    });
    var Jk = function(a, b, c) {
        this.blurX = l(a) ? a : 4;
        this.blurY = l(b) ? b : 4;
        this.quality = l(c) ? c : 1;
        D(this, null, 3)
    };
    C(Jk, "BlurFilter", Hk);
    be(Jk, function() {
        return new de(this.quality, this.blurX, this.blurY)
    });
    var Kk = function(a) {
        a = r.ei(a);
        Vd(this, {
            $: a && a.__swiffy_d,
            Ir: 0
        })
    };
    C(Kk, "Color");
    Kk.prototype.getRGB = function() {
        var a = x(this);
        if (a.$) return a.Ir
    };
    Kk.prototype.setRGB = function(a) {
        var b = x(this),
            c = b.$;
        c && (b.Ir = a, c.Nb(new Mc(0, (a & 16711680) >> 16, 0, (a & 65280) >> 8, 0, a & 255, 256, 0)), c.Fa())
    };
    Kk.prototype.setTransform = function(a) {
        var b = x(this).$;
        if (b) {
            var c = b.i.da(),
                d = c.Oa(a, "ra"),
                e = c.Oa(a, "rb"),
                f = c.Oa(a, "ga"),
                h = c.Oa(a, "gb"),
                k = c.Oa(a, "ba"),
                n = c.Oa(a, "bb"),
                q = c.Oa(a, "aa");
            a = c.Oa(a, "ab");
            c = b.mb;
            b.Nb(new Mc(l(d) ? 2.56 * d | 0 : c.Mb, l(e) ? e : c.dc, l(f) ? 2.56 * f | 0 : c.Kb, l(h) ? h : c.$b, l(k) ? 2.56 * k | 0 : c.Gb, l(n) ? n : c.Sb, l(q) ? 2.56 * q | 0 : c.Ta, l(a) ? a : c.Eb));
            b.Fa()
        }
    };
    Kk.prototype.getTransform = function() {
        var a = x(this).$;
        if (a) return a = a.mb, {
            ra: a.Mb / 2.56,
            rb: a.dc,
            ga: a.Kb / 2.56,
            gb: a.$b,
            ba: a.Gb / 2.56,
            bb: a.Sb,
            aa: a.Ta / 2.56,
            ab: a.Eb
        }
    };
    D(Kk.prototype, null, 3);
    var Lk = function(a) {
        this.matrix = l(a) ? a.slice() : [1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0];
        D(this, null, 3)
    };
    C(Lk, "ColorMatrixFilter", Hk);
    be(Lk, function() {
        return new ee(this.matrix)
    });
    var Mk = function(a, b, c, d, e, f, h, k) {
        var n = [1, 1, 1, 1, 0, 0, 0, 0];
        if (8 <= arguments.length)
            for (var q = 0; 8 > q; ++q) n[q] = Number(arguments[q]);
        Vd(this, n)
    };
    C(Mk, "ColorTransform");
    dk.forEach(function(a, b) {
        Object.defineProperty(Mk.prototype, a, {
            get: function() {
                return x(this)[b]
            },
            set: function(a) {
                x(this)[b] = Number(a)
            }
        })
    });
    Object.defineProperty(Mk.prototype, "rgb", {
        get: fk,
        set: gk
    });
    Mk.prototype.concat = function(a) {
        a instanceof Mk && ek.call(this, a)
    };
    Mk.prototype.toString = function() {
        return ak(this, dk)
    };
    var Nk = function(a) {
        this.onSelect = a;
        this.builtInItems = {
            zoom: !0,
            quality: !0,
            play: !0,
            loop: !0,
            rewind: !0,
            forward_back: !0,
            print: !0
        };
        this.customItems = []
    };
    C(Nk, "ContextMenu");
    Nk.prototype.copy = function() {
        var a = new Nk;
        a.builtInItems = this.builtInItems;
        var b = this.customItems;
        b && (a.customItems = b.map(function(a) {
            if (ia(a.copy)) return a.copy()
        }));
        return a
    };
    Nk.prototype.hideBuiltInItems = function() {
        this.builtInItems = {
            zoom: !1,
            quality: !1,
            play: !1,
            loop: !1,
            rewind: !1,
            forward_back: !1,
            print: !1
        }
    };
    var Ok = function(a, b, c, d, e) {
        this.caption = a;
        this.onSelect = b;
        this.separatorBefore = z(c, !1);
        this.enabled = z(d, !0);
        this.visible = z(e, !0)
    };
    C(Ok, "ContextMenuItem");
    Ok.prototype.copy = function() {
        return new Ok(this.caption, this.callbackFunction, this.separatorBefore, this.enabled, this.visible)
    };
    var Pk = function(a, b, c, d, e, f, h, k, n) {
        this.matrixX = l(a) ? a : 0;
        this.matrixY = l(b) ? b : 0;
        var q = [];
        Object.defineProperty(this, "matrix", {
            get: function() {
                return q
            },
            set: function(a) {
                var b = this.matrixY * this.matrixX;
                q = null != a ? a : [];
                if (q.length > b) q.length = b;
                else
                    for (; q.length < b;) q.push(0)
            }
        });
        this.matrix = c;
        this.bias = l(e) ? e : 0;
        this.preserveAlpha = l(f) ? f : !0;
        this.clamp = l(h) ? h : !0;
        this.color = l(k) ? k : 0;
        this.alpha = l(n) ? n : 0;
        this.divisor = l(d) ? d : 1;
        D(this, null, 3)
    };
    C(Pk, "ConvolutionFilter", Hk);
    be(Pk, function() {
        return new me(this.bias, this.clamp, Lc(this.color, this.alpha), this.divisor, this.matrix, this.matrixX, this.matrixY, this.preserveAlpha)
    });
    var Qk = function(a, b, c, d, e, f, h, k, n, q, u) {
        this.angle = l(b) ? b : 45;
        this.blurX = l(e) ? e : 4;
        this.blurY = l(f) ? f : 4;
        this.distance = l(a) ? a : 4;
        this.alpha = l(d) ? d : 1;
        this.color = l(c) ? c : 0;
        this.knockout = l(q) ? q : !1;
        this.quality = l(k) ? k : 1;
        this.strength = l(h) ? h : 1;
        this.inner = l(n) ? n : !1;
        this.hideObject = l(u) ? u : !1;
        D(this, null, 3)
    };
    C(Qk, "DropShadowFilter", Hk);
    be(Qk, function() {
        return new ne(this.angle * Math.PI / 180, Lc(this.color, this.alpha), this.distance, this.strength, this.quality, this.blurX, this.blurY, oe(this.hideObject, this.inner, this.knockout))
    });
    var Rk = function(a) {
        this.name = "Error";
        this.message = l(a) ? a : "Error"
    };
    C(Rk, "Error");
    Rk.prototype.toString = function() {
        return this.message
    };
    D(Rk.prototype, null, 3);
    var Sk = function() {};
    C(Sk, "ExternalInterface");
    Object.defineProperty(Sk, "available", {
        get: Od
    });
    Sk.call = function(a, b) {
        return Rd(r.i, String(a), Array.prototype.slice.call(arguments, 1))
    };
    Sk.addCallback = function(a, b, c) {
        return Qd(String(a), l(b) ? b : null, c)
    };
    D(Sk, null, 3);
    var Tk = function(a, b, c, d, e, f, h, k) {
        this.blurX = l(c) ? c : 6;
        this.blurY = l(d) ? d : 6;
        this.alpha = l(b) ? b : 1;
        this.color = l(a) ? a : 16711680;
        this.knockout = l(k) ? k : !1;
        this.quality = l(f) ? f : 1;
        this.strength = l(e) ? e : 2;
        this.inner = l(h) ? h : !1;
        D(this, null, 3)
    };
    C(Tk, "GlowFilter", Hk);
    be(Tk, function() {
        return new ne(0, Lc(this.color, this.alpha), 0, this.strength, this.quality, this.blurX, this.blurY, oe(!1, this.inner, this.knockout))
    });
    var Uk = function(a, b, c, d, e, f, h, k, n, q, u) {
        this.distance = l(a) ? a : 4;
        this.angle = l(b) ? b : 45;
        var p = [];
        Object.defineProperty(this, "colors", {
            enumerable: !0,
            get: function() {
                return p
            },
            set: function(a) {
                p = da(a) ? a : [];
                for (a = 0; a < p.length; a++) p[a] = (null != p[a] ? Number(p[a]) : 16711680) % 16777216
            }
        });
        this.colors = c;
        var t = [];
        Object.defineProperty(this, "alphas", {
            enumerable: !0,
            get: function() {
                return t
            },
            set: function(a) {
                t = da(a) ? a : [];
                a = l(p) ? p.length : 0;
                for (var b = 0; b < a; b++) t[b] = Math.min(1, Math.floor(Number(255 * (null != t[b] ? Number(t[b]) :
                    1))) / 255);
                t.length = a
            }
        });
        this.alphas = d;
        var v = [];
        Object.defineProperty(this, "ratios", {
            enumerable: !0,
            get: function() {
                return v
            },
            set: function(a) {
                v = da(a) ? a : [];
                a = l(p) ? p.length : 0;
                for (var b = 0; b < a; b++) {
                    var c = null != v[b] ? Number(v[b]) : 0,
                        c = Math.floor(c);
                    0 > c ? c = 0 : 255 < c && (c = 255);
                    v[b] = c
                }
                v.length = a
            }
        });
        this.ratios = e;
        this.blurX = l(f) ? f : 4;
        this.blurY = l(h) ? h : 4;
        this.quality = l(n) ? n : 1;
        this.strength = l(k) ? k : 1;
        this.knockout = l(u) ? u : !1;
        this.type = l(q) ? q : "inner"
    };
    C(Uk, "GradientBevelFilter", Hk);
    be(Uk, function() {
        return new pe(this.angle * Math.PI / 180, this.colors, this.alphas, this.ratios, this.distance, this.strength, this.quality, this.blurX, this.blurY, je(this.type, this.knockout))
    });
    var Vk = function(a, b, c, d, e, f, h, k, n, q, u) {
        this.distance = l(a) ? a : 4;
        this.angle = l(b) ? b : 45;
        var p = [];
        Object.defineProperty(this, "colors", {
            enumerable: !0,
            get: function() {
                return p
            },
            set: function(a) {
                p = da(a) ? a : [];
                for (a = 0; a < p.length; a++) p[a] = (null != p[a] ? Number(p[a]) : 16711680) % 16777216
            }
        });
        this.colors = c;
        var t = [];
        Object.defineProperty(this, "alphas", {
            enumerable: !0,
            get: function() {
                return t
            },
            set: function(a) {
                t = da(a) ? a : [];
                a = l(p) ? p.length : 0;
                for (var b = 0; b < a; b++) t[b] = Math.min(1, Math.floor(Number(255 * (null != t[b] ? Number(t[b]) :
                    1))) / 255);
                t.length = a
            }
        });
        this.alphas = d;
        var v = [];
        Object.defineProperty(this, "ratios", {
            enumerable: !0,
            get: function() {
                return v
            },
            set: function(a) {
                v = da(a) ? a : [];
                a = l(p) ? p.length : 0;
                for (var b = 0; b < a; b++) {
                    var c = null != v[b] ? Number(v[b]) : 0,
                        c = Math.floor(c);
                    0 > c ? c = 0 : 255 < c && (c = 255);
                    v[b] = c
                }
                v.length = a
            }
        });
        this.ratios = e;
        this.blurX = l(f) ? f : 4;
        this.blurY = l(h) ? h : 4;
        this.quality = l(n) ? n : 1;
        this.strength = l(k) ? k : 1;
        this.knockout = l(u) ? u : !1;
        this.type = l(q) ? q : "inner"
    };
    C(Vk, "GradientGlowFilter", Hk);
    be(Vk, function() {
        return new re(this.angle * Math.PI / 180, this.colors, this.alphas, this.ratios, this.distance, this.strength, this.quality, this.blurX, this.blurY, je(this.type, this.knockout))
    });
    var Wk = function() {
        this.filters = []
    };
    g = Wk.prototype;
    g.tn = function(a) {
        this.filters.push(new Ik(a.distance, 180 * a.angle / Math.PI, a.highlight & 16777215, (a.highlight >>> 24) / 255, a.shadow & 16777215, (a.shadow >>> 24) / 255, a.x, a.y, a.strength, a.quality, a.fa.type, a.fa.knockout))
    };
    g.un = function(a) {
        this.filters.push(new Jk(a.x, a.y, a.quality))
    };
    g.vn = function(a) {
        this.filters.push(new Lk(a.matrix))
    };
    g.wn = function(a) {
        this.filters.push(new Pk(a.matrixX, a.matrixY, a.matrix, a.divisor, a.bias, a.preserveAlpha, a.clamp, a.color & 16777215, (a.color >>> 24) / 255))
    };
    g.xn = function(a) {
        this.filters.push(new Qk(a.distance, 180 * a.angle / Math.PI, a.color & 16777215, (a.color >>> 24) / 255, a.x, a.y, a.strength, a.quality, "inner" == a.fa.type, a.fa.knockout && "outer" == a.fa.type, a.fa.knockout))
    };
    g.yn = function(a) {
        this.filters.push(new Uk(a.distance, 180 * a.angle / Math.PI, a.Yb, a.Xb, a.Zb, a.x, a.y, a.strength, a.quality, a.fa.type, a.fa.knockout))
    };
    g.zn = function(a) {
        this.filters.push(new Vk(a.distance, 180 * a.angle / Math.PI, a.Yb, a.Xb, a.Zb, a.x, a.y, a.strength, a.quality, a.fa.type, a.fa.knockout))
    };
    var Xk = function() {
        this.Ca = {};
        this.Ck = this.Fi = 0;
        D(this, null, 3)
    };
    C(Xk, "Key");
    Xk.prototype.getAscii = function() {
        return this.Ck
    };
    Xk.prototype.getCode = function() {
        return this.Fi
    };
    Xk.prototype.isDown = function(a) {
        return !!this.Ca[a]
    };
    Xk.prototype.isToggled = function() {
        return !1
    };
    Object.defineProperties(Xk.prototype, {
        BACKSPACE: {
            value: 8
        },
        CAPSLOCK: {
            value: 20
        },
        CONTROL: {
            value: 17
        },
        DELETEKEY: {
            value: 46
        },
        DOWN: {
            value: 40
        },
        END: {
            value: 35
        },
        ENTER: {
            value: 13
        },
        ESCAPE: {
            value: 27
        },
        HOME: {
            value: 36
        },
        INSERT: {
            value: 45
        },
        LEFT: {
            value: 37
        },
        PGDN: {
            value: 34
        },
        PGUP: {
            value: 33
        },
        RIGHT: {
            value: 39
        },
        SHIFT: {
            value: 16
        },
        SPACE: {
            value: 32
        },
        TAB: {
            value: 9
        },
        UP: {
            value: 38
        }
    });
    Xk.prototype.Gj = function(a) {
        this.Fi = a.keyCode;
        this.Ca[a.keyCode] = !1
    };
    Xk.prototype.Fj = function(a) {
        this.Fi = a.keyCode;
        this.Ck = a.charCode;
        this.Ca[a.keyCode] = !0
    };
    var Yk = {
        37: 1,
        39: 2,
        36: 3,
        35: 4,
        45: 5,
        46: 6,
        8: 8,
        13: 13,
        38: 14,
        40: 15,
        33: 16,
        34: 17,
        9: 18,
        27: 19
    };
    Xk.prototype.uv = function() {
        var a = Yk[this.Fi];
        return a ? a : this.Ck
    };
    D(Xk.prototype, null, 3);
    var Zk = function() {};
    C(Zk, "Mouse");
    Zk.prototype.hide = function() {
        return r.i.va.lj(!1)
    };
    Zk.prototype.show = function() {
        return r.i.va.lj(!0)
    };
    D(Zk.prototype, null, 3);
    var $k = function() {
        r.Hh(this)
    };
    C($k, "MovieClipLoader");
    $k.prototype.checkPolicyFile = !1;
    $k.prototype.loadClip = function(a, b) {
        if (a && b) {
            var c = r;
            a = c.Da(a);
            var d = this,
                e = b.__swiffy_d;
            ha(b) ? e = c.i.Ka : fa(b) ? e = c.ei(b).__swiffy_d : e.Ag(Ni(a));
            Oi(a, e.i, "", this, {
                Lb: function() {},
                jb: function() {},
                ib: function(a) {
                    d.broadcastMessage("onLoadError", b, a)
                },
                zb: function(c, h) {
                    d.broadcastMessage("onLoadStart", b);
                    d.broadcastMessage("onLoadProgress", b, 1024, 1024);
                    d.broadcastMessage("onLoadComplete", b, h);
                    ha(b) ? e.i.wq(b, c, function(b) {
                        b.Ag(Ni(a))
                    }) : e.ck(c);
                    d.broadcastMessage("onLoadInit", b)
                }
            })
        }
    };
    $k.prototype.getProgress = function() {
        return {
            bytesLoaded: 1024,
            bytesTotal: 1024
        }
    };
    $k.prototype.unloadClip = function(a) {
        (a = a && a.__swiffy_d) && a.ck()
    };
    var al = function() {
        this.isConnected = !1
    };
    C(al, "NetConnection");
    al.prototype.connect = function() {
        return !0
    };
    var bl = function() {
        Vd(this, {
            Dk: 0,
            Tg: .1,
            fd: 0,
            gd: 0,
            bl: 0,
            time: 0,
            paused: !1
        })
    };
    C(bl, "NetStream");
    bl.prototype.play = function() {};
    bl.prototype.close = function() {};
    bl.prototype.pause = function() {};
    bl.prototype.receiveAudio = function() {};
    bl.prototype.receiveVideo = function() {};
    bl.prototype.seek = function() {};
    bl.prototype.setBufferTime = function(a) {
        x(this).Tg = a
    };
    Object.defineProperty(bl.prototype, "bufferTime", {
        get: function() {
            return x(this).Tg
        }
    });
    Object.defineProperty(bl.prototype, "bufferLength", {
        get: function() {
            return x(this).Dk
        }
    });
    Object.defineProperty(bl.prototype, "bytesLoaded", {
        get: function() {
            return x(this).fd
        }
    });
    Object.defineProperty(bl.prototype, "bytesTotal", {
        get: function() {
            return x(this).gd
        }
    });
    Object.defineProperty(bl.prototype, "currentFps", {
        get: function() {
            return x(this).bl
        }
    });
    Object.defineProperty(bl.prototype, "time", {
        get: function() {
            return x(this).time
        }
    });
    var cl = function() {};
    cl.prototype.valueOf = function() {};
    var dl = function(a) {
        return null != a ? Object(a) : new cl
    };
    "__proto__" in Object || Object.defineProperty(dl.prototype, "__proto__", {
        get: function() {
            return Object.getPrototypeOf(this)
        }
    });
    var el = function(a) {
            return null != a ? Object(a) : Object.create(dl.prototype)
        },
        fl = {};
    dl.registerClass = function(a, b) {
        if (2 > arguments.length) return !1;
        fl[a] = b;
        return !0
    };
    D(dl, null, 3);
    var gl = function(a) {
        return dl.call(this, a)
    };
    C(gl, "Function", dl);
    Object.defineProperty(gl, "__swiffy_wrapped_type", {
        value: Function
    });
    Object.defineProperty(Function, "__swiffy_override", {
        value: el
    });
    Object.defineProperty(gl, "__swiffy_override", {
        value: el
    });
    var hl = function(a, b) {
        var c = this && this.__swiffy_override || this;
        if (ia(c)) return c.apply(dl(a), da(b) ? b : [])
    };
    gl.prototype.apply = hl;
    Object.defineProperty(Function.prototype.apply, "__swiffy_override", {
        value: hl
    });
    Function.prototype.bind && Object.defineProperty(Function.prototype.bind, "__swiffy_override", {
        value: void 0
    });
    var il = function(a, b) {
        return hl.call(this, a, Array.prototype.slice.call(arguments, 1))
    };
    gl.prototype.call = il;
    Object.defineProperty(Function.prototype.call, "__swiffy_override", {
        value: il
    });
    D(gl, null, 3);
    D(gl.prototype, null, 3);
    var jl = function(a) {
            x(a).Br = [];
            Object.defineProperty(a, "contentType", {
                value: "application/x-www-form-urlencoded",
                writable: !0
            });
            Object.defineProperty(a, "loaded", {
                value: !1,
                writable: !0
            })
        },
        kl = function(a, b, c) {
            var d = r;
            a = x(a).Br;
            if (fa(b) && l(c)) a.push({
                name: b,
                value: d.Da(c)
            });
            else if (da(b)) {
                c = b.length / 2;
                for (var e = 0; e < c; e++) a.push({
                    name: d.Da(b[2 * e]),
                    value: d.Da(b[2 * e + 1])
                })
            }
        },
        ll = function(a, b, c, d) {
            var e = r;
            a = e.Da(a);
            b.loaded = !1;
            var f = null,
                h = "GET",
                k, n;
            c && (f = c.toString(), h = l(d) ? d : "POST", k = x(c).Br, n = c.contentType);
            ej(a, e.i, h, f, {
                Lb: function() {},
                jb: function() {},
                ib: function() {
                    fj("onData", b, void 0)
                },
                zb: function(a) {
                    fj("onData", b, a)
                }
            }, k, n)
        },
        ml = function(a, b, c, d) {
            var e = r;
            a = e.Da(a);
            c = l(c) ? c : "_self";
            d = l(d) ? d : "POST";
            if ("GET" == d) d = 1;
            else if ("POST" == d) d = 2;
            else return;
            e.i.Rh(new oj(e, b, a, c, d))
        };
    var nl = function() {
        Vd(this, {});
        jl(this)
    };
    C(nl, "LoadVars");
    nl.prototype.addRequestHeader = function(a, b) {
        kl(this, a, b)
    };
    nl.prototype.load = function(a) {
        ll(a, this)
    };
    nl.prototype.send = function(a, b, c) {
        if (0 == arguments.length) return !1;
        ml(a, this, b, c);
        return !0
    };
    nl.prototype.sendAndLoad = function(a, b, c) {
        b && ll(a, b, this, c)
    };
    nl.prototype.onData = function(a) {
        var b = l(a);
        b && fj("decode", this, a);
        this.loaded = b;
        fj("onLoad", this, b)
    };
    nl.prototype.onLoad = function() {};
    nl.prototype.decode = function(a) {
        hi(a, ji(this))
    };
    nl.prototype.toString = function() {
        return fi(this)
    };
    D(nl.prototype, null, 3);
    var ol = function(a, b) {
        this.x = l(a) ? a : 0;
        this.y = l(b) ? b : 0
    };
    C(ol, "Point", dl);
    Object.defineProperty(ol.prototype, "length", {
        get: function() {
            return zc(this.x, this.y)
        }
    });
    ol.prototype.add = function(a) {
        return new ol(this.x + a.x, this.y + a.y)
    };
    ol.prototype.clone = function() {
        return new ol(this.x, this.y)
    };
    ol.distance = function(a, b) {
        return zc(a.x - b.x, a.y - b.y)
    };
    ol.prototype.equals = function(a) {
        return this.x == a.x && this.y == a.y
    };
    ol.interpolate = function(a, b, c) {
        return new ol(a.x * c + b.x * (1 - c), a.y * c + b.y * (1 - c))
    };
    ol.prototype.normalize = function(a) {
        a /= this.length;
        this.x *= a;
        this.y *= a
    };
    ol.prototype.offset = function(a, b) {
        this.x += a;
        this.y += b
    };
    ol.polar = function(a, b) {
        return new ol(a * Math.cos(b), a * Math.sin(b))
    };
    ol.prototype.subtract = function(a) {
        return new ol(this.x - a.x, this.y - a.y)
    };
    ol.prototype.toString = function() {
        return "(x=" + this.x + ", y=" + this.y + ")"
    };
    var pl = function(a, b, c, d, e, f) {
        var h = [1, 0, 0, 1, 0, 0];
        if (0 < arguments.length)
            for (var k = 0; 6 > k; ++k) h[k] = arguments[k];
        Vd(this, h)
    };
    C(pl, "Matrix", dl);
    hk.forEach(function(a, b) {
        Object.defineProperty(pl.prototype, a, {
            get: function() {
                return x(this)[b]
            },
            set: function(a) {
                x(this)[b] = a
            }
        })
    });
    pl.prototype.clone = function() {
        var a = x(this);
        return new pl(a[0], a[1], a[2], a[3], a[4], a[5])
    };
    pl.prototype.concat = function(a) {
        a instanceof pl && kk.call(this, a)
    };
    pl.prototype.copyFrom = function(a) {
        a instanceof pl && lk.call(this, a)
    };
    pl.prototype.createBox = function(a, b, c, d, e) {
        mk.call(this, Number(a), Number(b), Number(c || 0), Number(d || 0), Number(e || 0))
    };
    pl.prototype.createGradientBox = function(a, b, c, d, e) {
        a = Number(a);
        b = Number(b);
        mk.call(this, a * Hc, b * Hc, Number(c || 0), a / 2 + Number(d || 0), b / 2 + Number(e || 0))
    };
    pl.prototype.deltaTransformPoint = function(a) {
        return nk.call(this, a.x, a.y, ol)
    };
    pl.prototype.identity = function() {
        ok.call(this)
    };
    pl.prototype.invert = function() {
        pk.call(this)
    };
    pl.prototype.rotate = function(a) {
        qk.call(this, a)
    };
    pl.prototype.scale = function(a, b) {
        rk.call(this, a, b)
    };
    pl.prototype.transformPoint = function(a) {
        return sk.call(this, a.x, a.y, ol)
    };
    pl.prototype.translate = function(a, b) {
        var c = x(this);
        c[4] += a;
        c[5] += b
    };
    pl.prototype.toString = function() {
        return ak(this, hk)
    };
    var ql = function(a, b, c, d) {
        this.x = l(a) ? a : 0;
        this.y = l(b) ? b : 0;
        this.width = l(c) ? c : 0;
        this.height = l(d) ? d : 0
    };
    C(ql, "Rectangle", dl);
    Object.defineProperty(ql.prototype, "top", {
        get: function() {
            return this.y
        },
        set: function(a) {
            this.y = a
        }
    });
    Object.defineProperty(ql.prototype, "left", {
        get: function() {
            return this.x
        },
        set: function(a) {
            this.x = a
        }
    });
    Object.defineProperty(ql.prototype, "bottom", {
        get: function() {
            return this.y + this.height
        },
        set: function(a) {
            this.height = a - this.y
        }
    });
    Object.defineProperty(ql.prototype, "right", {
        get: function() {
            return this.x + this.width
        },
        set: function(a) {
            this.width = a - this.x
        }
    });
    Object.defineProperty(ql.prototype, "topLeft", {
        get: function() {
            return new ol(this.left, this.top)
        },
        set: function(a) {
            this.left = a.x;
            this.top = a.y
        }
    });
    Object.defineProperty(ql.prototype, "bottomRight", {
        get: function() {
            return new ol(this.right, this.bottom)
        },
        set: function(a) {
            this.right = a.x;
            this.bottom = a.y
        }
    });
    Object.defineProperty(ql.prototype, "size", {
        get: function() {
            return new ol(this.width, this.height)
        },
        set: function(a) {
            this.width = a.x;
            this.height = a.y
        }
    });
    ql.prototype.clone = function() {
        return new ql(this.x, this.y, this.width, this.height)
    };
    ql.prototype.contains = function(a, b) {
        return this.x <= a && this.y <= b && a < this.right && b < this.bottom
    };
    ql.prototype.containsPoint = function(a) {
        return this.contains(a.x, a.y)
    };
    ql.prototype.containsRectangle = function(a) {
        var b = this.right,
            c = this.bottom,
            d = a.right,
            e = a.bottom;
        return this.x <= a.x && this.y <= a.y && a.x < b && a.y < c && this.x < d && this.y < e && d <= b && e <= c
    };
    ql.prototype.copyFrom = function(a) {
        this.x = a.x;
        this.y = a.y;
        this.width = a.width;
        this.height = a.height
    };
    ql.prototype.equals = function(a) {
        return this.x == a.x && this.y == a.y && this.width == a.width && this.height == a.height
    };
    ql.prototype.inflate = function(a, b) {
        this.x -= a;
        this.y -= b;
        this.width += 2 * a;
        this.height += 2 * b
    };
    ql.prototype.inflatePoint = function(a) {
        this.inflate(a.x, a.y)
    };
    ql.prototype.intersection = function(a) {
        if (this.intersects(a)) {
            var b = Math.max(this.x, a.x),
                c = Math.max(this.y, a.y),
                d = Math.min(this.right, a.right);
            a = Math.min(this.bottom, a.bottom);
            return new ql(b, c, d - b, a - c)
        }
        return new ql
    };
    ql.prototype.intersects = function(a) {
        return 0 < a.width && 0 < a.height && 0 < this.width && 0 < this.height && a.x < this.right && a.y < this.bottom && a.right > this.x && a.bottom > this.y
    };
    ql.prototype.isEmpty = function() {
        return 0 >= this.width || 0 >= this.height
    };
    ql.prototype.offset = function(a, b) {
        this.x += a;
        this.y += b
    };
    ql.prototype.offsetPoint = function(a) {
        this.offset(a.x, a.y)
    };
    ql.prototype.setEmpty = function() {
        this.height = this.width = this.y = this.x = 0
    };
    ql.prototype.union = function(a) {
        if (this.isEmpty()) return a.clone();
        if (a.isEmpty()) return this.clone();
        var b = Math.min(this.x, a.x),
            c = Math.min(this.y, a.y),
            d = Math.max(this.right, a.right);
        a = Math.max(this.bottom, a.bottom);
        return new ql(b, c, d - b, a - c)
    };
    ql.prototype.toString = function() {
        return "(x=" + this.x + ", y=" + this.y + ", w=" + this.width + ", h=" + this.height + ")"
    };
    var rl = function(a, b, c, d) {
        c = l(c) ? c : !0;
        d = l(d) ? d : 4294967295;
        if (!("__swiffy_d" in this)) {
            var e = new ih(gh, r.i);
            e.pc(a, b, c, d);
            this.__swiffy_d = e
        }
    };
    C(rl, "BitmapData", dl);
    var sl = function(a) {
        return a.__swiffy_d
    };
    Object.defineProperty(rl, "__swiffy_override", {
        value: function(a, b, c, d) {
            return 8191 >= a && 8191 >= b && 16777215 >= a * b ? new rl(a, b, c, d) : void 0
        }
    });
    Object.defineProperty(rl.prototype, "width", {
        get: function() {
            return sl(this).I()
        }
    });
    Object.defineProperty(rl.prototype, "height", {
        get: function() {
            return sl(this).S()
        }
    });
    Object.defineProperty(rl.prototype, "rectangle", {
        get: function() {
            var a = sl(this);
            return new ql(0, 0, a.I(), a.S())
        }
    });
    Object.defineProperty(rl.prototype, "transparent", {
        get: function() {
            return sl(this).Jc
        }
    });
    rl.loadBitmap = function(a) {
        var b = fl[a] || rl,
            c = Object.create(b.prototype),
            d = r.i;
        (a = d.Bl(a, yi)) && (c.__swiffy_d = new ih(a, d, c));
        b.call(c);
        return c
    };
    rl.prototype.copyPixels = function(a, b, c, d, e, f) {
        a && b && c && (e = e || b, sl(this).wo(sl(a), b.x, b.y, b.width, b.height, c.x, c.y, d ? sl(d) : null, e.x, e.y, !!f))
    };
    rl.prototype.dispose = function() {
        sl(this).il()
    };
    rl.prototype.fillRect = function(a, b) {
        a && sl(this).fillRect(a.x, a.y, a.width, a.height, b)
    };
    rl.prototype.getPixel = function(a, b) {
        return sl(this).Hl(a, b) & 16777215
    };
    rl.prototype.getPixel32 = function(a, b) {
        return sl(this).Hl(a, b)
    };
    rl.prototype.scroll = function(a, b) {
        sl(this).scroll(a, b)
    };
    rl.prototype.setPixel = function(a, b, c) {
        sl(this).Rm(a, b, c | 4278190080)
    };
    rl.prototype.setPixel32 = function(a, b, c) {
        sl(this).Rm(a, b, c)
    };
    D(rl, null, 3);
    rl.prototype.draw = function(a, b, c) {
        (a = a && a.__swiffy_d) && a.Wi && this.__swiffy_d.jc(a, b && (b instanceof pl ? ik(b) : Bc), c && (c instanceof Mk ? bk(c) : Nc))
    };
    rl.prototype.perlinNoise = function(a, b, c, d, e, f, h, k, n) {
        var q = r;
        a = q.Pb(a);
        b = q.Pb(b);
        c = q.Pb(c) >>> 0;
        d = q.Pb(d) | 0;
        e = q.Dg(e);
        f = q.Dg(f);
        h = null != h ? q.Pb(h) | 0 : 7;
        k = q.Dg(k);
        n = da(n) ? n : [];
        this.__swiffy_d.Yq(a, b, c, d, e, f, h, k, n)
    };
    var tl = function(a) {
        var b;
        null != a ? (a = a.__swiffy_d, a instanceof Wh && (b = a.lb)) : b = r.i.nc().lb;
        Vd(this, {
            transform: b,
            $h: null
        })
    };
    C(tl, "Sound");
    tl.prototype.checkPolicyFile = !1;
    Object.defineProperty(tl.prototype, "duration", {
        value: 0
    });
    Object.defineProperty(tl.prototype, "id3", {
        value: void 0
    });
    Object.defineProperty(tl.prototype, "position", {
        value: 0
    });
    tl.prototype.onID3 = void 0;
    tl.prototype.onLoad = void 0;
    tl.prototype.onSoundComplete = void 0;
    tl.prototype.attachSound = function(a) {
        a = r.i.Bl(String(a), Uf);
        l(a) && (x(this).$h = a)
    };
    tl.prototype.getBytesLoaded = function() {
        return 0
    };
    tl.prototype.getBytesTotal = function() {
        return 0
    };
    tl.prototype.getPan = function() {
        var a = x(this).transform;
        if (a) {
            var b = Math.abs(Math.round(100 * a.Gc)),
                a = Math.abs(Math.round(100 * a.Wc));
            return 100 == b ? -100 + a : 100 - b
        }
    };
    tl.prototype.getTransform = function() {
        var a = x(this).transform;
        return a && {
            ll: Math.round(100 * a.Gc),
            lr: Math.round(100 * a.Zd),
            rl: Math.round(100 * a.je),
            rr: Math.round(100 * a.Wc)
        }
    };
    tl.prototype.getVolume = function() {
        var a = x(this).transform;
        return a && Math.round(100 * a.volume)
    };
    tl.prototype.loadSound = function() {};
    tl.prototype.setPan = function(a) {
        a = ul(a);
        var b = x(this).transform;
        b && (b.Gc = 0 < a ? 1 - a / 100 : 1, b.Zd = 0, b.je = 0, b.Wc = 0 > a ? 1 + a / 100 : 1)
    };
    tl.prototype.setTransform = function(a) {
        var b = x(this).transform;
        a && b && (l(a.ll) && (b.Gc = (a.ll | 0) / 100), l(a.lr) && (b.Zd = (a.lr | 0) / 100), l(a.rl) && (b.je = (a.rl | 0) / 100), l(a.rr) && (b.Wc = (a.rr | 0) / 100))
    };
    tl.prototype.setVolume = function(a) {
        a = ul(a);
        var b = x(this).transform;
        b && (b.volume = a / 100, r.i.nc().ai())
    };
    tl.prototype.start = function(a, b) {
        var c = x(this);
        if (c.transform) {
            var d = this;
            c.$h && r.i.nc().Sk(c.$h, c.transform, function() {
                if (ia(d.onSoundComplete)) d.onSoundComplete()
            }, 1E3 * a | 0, b | 0)
        }
    };
    tl.prototype.stop = function(a) {
        var b = x(this).transform;
        if (b) {
            var c;
            if (a && (c = r.i.Bl(a, Uf), !c)) return;
            r.i.nc().an(b, c)
        }
    };
    D(tl.prototype, null, 3);
    var ul = function(a) {
        a = Number(a);
        return isNaN(a) ? -2147483648 : a | 0
    };
    var vl = function() {
        this.showMenu = !0
    };
    C(vl, "Stage");
    Object.defineProperty(vl.prototype, "height", {
        get: function() {
            var a = this.__swiffy_d;
            return "noScale" == a.Xc ? a.Ad : a.Vm
        },
        set: function() {}
    });
    Object.defineProperty(vl.prototype, "width", {
        get: function() {
            var a = this.__swiffy_d;
            return "noScale" == a.Xc ? a.Bd : a.Xm
        },
        set: function() {}
    });
    Object.defineProperty(vl.prototype, "align", {
        get: function() {
            return this.__swiffy_d.sp("LTRB")
        },
        set: function(a) {
            this.__swiffy_d.Or(String(a))
        }
    });
    Object.defineProperty(vl.prototype, "scaleMode", {
        get: function() {
            return this.__swiffy_d.Xc
        },
        set: function(a) {
            var b = this.__swiffy_d;
            switch (String(a).toLowerCase()) {
                case "exactfit":
                    a = "exactFit";
                    break;
                case "noborder":
                    a = "noBorder";
                    break;
                case "noscale":
                    a = "noScale";
                    break;
                default:
                    a = "showAll"
            }
            b.gs(a)
        }
    });
    D(vl.prototype, null, 3);
    var wl = function() {
        this.allowDomain = function() {
            return !0
        };
        this.allowInsecureDomain = function() {
            return !0
        }
    };
    C(wl, "System.security");
    var xl = function() {
        this.security = new wl
    };
    C(xl, "System");
    var yl = function() {
        Vd(this, new xe)
    };
    C(yl, "TextFormat");
    var zl = function(a) {
        var b = Object.create(yl.prototype);
        Vd(b, a);
        return b
    };
    Object.defineProperties(yl.prototype, {
        align: {
            get: He,
            set: Ie,
            cb: !0
        },
        blockIndent: {
            get: Je,
            set: Ke,
            cb: !0
        },
        bold: {
            get: Le,
            set: Me,
            cb: !0
        },
        bullet: {
            get: Ne,
            set: Oe,
            cb: !0
        },
        color: {
            get: Pe,
            set: Qe,
            cb: !0
        },
        font: {
            get: Re,
            set: Se,
            cb: !0
        },
        indent: {
            get: Te,
            set: Ue,
            cb: !0
        },
        italic: {
            get: Ve,
            set: We,
            cb: !0
        },
        kerning: {
            get: Xe,
            set: Ye,
            cb: !0
        },
        leading: {
            get: Ze,
            set: $e,
            cb: !0
        },
        leftMargin: {
            get: af,
            set: bf,
            cb: !0
        },
        letterSpacing: {
            get: cf,
            set: df,
            cb: !0
        },
        rightMargin: {
            get: ef,
            set: ff,
            cb: !0
        },
        size: {
            get: gf,
            set: hf,
            cb: !0
        },
        tabStops: {
            get: lf,
            set: mf,
            cb: !0
        },
        target: {
            get: jf,
            set: kf,
            cb: !0
        },
        underline: {
            get: nf,
            set: of,
            cb: !0
        },
        url: {
            get: pf,
            set: qf,
            cb: !0
        }
    });
    var Al = function(a) {
        Vd(this, a)
    };
    C(Al, "Transform");
    Object.defineProperty(Al, "__swiffy_override", {
        value: function(a) {
            a = a && a.__swiffy_d;
            if (a instanceof Wh) return new Al(a)
        }
    });
    Object.defineProperty(Al.prototype, "colorTransform", {
        get: function() {
            return ck(Mk, x(this).mb)
        },
        set: function(a) {
            x(this).Nb(a instanceof Mk ? bk(a) : Nc)
        }
    });
    Object.defineProperty(Al.prototype, "concatenatedColorTransform", {
        get: function() {
            var a = x(this).Rc();
            return ck(Mk, a)
        }
    });
    Object.defineProperty(Al.prototype, "concatenatedMatrix", {
        get: function() {
            var a = x(this).ca();
            return jk(pl, a)
        }
    });
    Object.defineProperty(Al.prototype, "matrix", {
        get: function() {
            return jk(pl, x(this).ya())
        },
        set: function(a) {
            x(this).setTransform(a instanceof pl ? ik(a) : Bc)
        }
    });
    Object.defineProperty(Al.prototype, "pixelBounds", {
        get: function() {
            var a = x(this).Lp();
            return new ql(a.j, a.l, a.width(), a.height())
        }
    });
    var E = function() {};
    Bk(E, dl);
    E.prototype.valueOf = function() {
        return this
    };
    E.prototype.getDepth = function() {
        var a = this.__swiffy_d;
        return a ? a.depth : void 0
    };
    var Bl = function(a, b, c, d) {
            Object.defineProperty(a, b, {
                get: function() {
                    var a = this.__swiffy_d;
                    if (a) return c.call(this, a)
                },
                set: function(a) {
                    var c = this.__swiffy_d;
                    c ? d.call(this, c, a) : Object.defineProperty(this, b, {
                        value: a
                    })
                }
            })
        },
        Cl = function(a, b, c, d) {
            Bl(a, b, c, function(a, b) {
                var c = a.i.da().Pb(b);
                isNaN(c) || d.call(this, a, c)
            })
        },
        Dl = function(a, b) {
            Bl(a, b, function() {
                return 0
            }, function() {})
        },
        El = function(a, b, c) {
            Bl(a, b, c, function() {})
        };
    Cl(E.prototype, "_x", function(a) {
        return a.ya().Y / 20
    }, function(a, b) {
        var c = a.ya();
        a.setTransform(c.$j(20 * b - c.Y, 0));
        a.Fa()
    });
    Cl(E.prototype, "_y", function(a) {
        return a.ya().Z / 20
    }, function(a, b) {
        var c = a.ya();
        a.setTransform(c.$j(0, 20 * b - c.Z));
        a.Fa()
    });
    Cl(E.prototype, "_xscale", function(a) {
        return 100 * a.mc().td
    }, function(a, b) {
        a.mc().td = b / 100;
        a.sf();
        a.Fa()
    });
    Cl(E.prototype, "_yscale", function(a) {
        return 100 * a.mc().gf
    }, function(a, b) {
        a.mc().gf = b / 100;
        a.sf();
        a.Fa()
    });
    Cl(E.prototype, "_alpha", function(a) {
        return a.mb.Ta / 2.56
    }, function(a, b) {
        a.Nb(a.mb.Os(2.56 * b | 0));
        a.Fa()
    });
    Cl(E.prototype, "_visible", function(a) {
        return a.$c
    }, function(a, b) {
        a.ik(Boolean(b))
    });
    Cl(E.prototype, "_rotation", function(a) {
        return -180 * a.mc().angle / Math.PI
    }, function(a, b) {
        a.mc().angle = -b * Math.PI / 180;
        a.sf();
        a.Fa()
    });
    Bl(E.prototype, "_name", function(a) {
        return a.getName()
    }, function(a, b) {
        a.Ob(b)
    });
    Dl(E.prototype, "_quality");
    Dl(E.prototype, "_highquality");
    Dl(E.prototype, "_soundbuftime");
    El(E.prototype, "_parent", function(a) {
        return (a = a.getParent()) && a != a.i.X ? a.o : void 0
    });
    El(E.prototype, "_xmouse", function(a) {
        return a.i.va.ln(a.ca()) / 20
    });
    El(E.prototype, "_ymouse", function(a) {
        return a.i.va.mn(a.ca()) / 20
    });
    El(E.prototype, "_url", function(a) {
        return null === a.Zc ? a.Dl().Zc.replace(/^([^?#]+)\.html?\b/, "$1") : a.Zc
    });
    Cl(E.prototype, "_width", function(a) {
        return a.I()
    }, function(a, b) {
        a.Sm(b);
        a.Fa()
    });
    Cl(E.prototype, "_height", function(a) {
        return a.S()
    }, function(a, b) {
        a.Pm(b);
        a.Fa()
    });
    El(E.prototype, "_root", function(a) {
        for (; a && !a.Mj && a.getParent() != a.i.X;) a = a.getParent();
        return a ? a.o : void 0
    });
    El(E.prototype, "_target", function(a) {
        for (var b = ""; a && a.getName();) b = "/" + a.getName() + b, a = a.getParent();
        a && a.getParent() == a.i.X && (a = a.depth - -16384) && (b = "_level" + a + b);
        return b || "/"
    });
    Bl(E.prototype, "filters", function(a) {
        var b = new Wk;
        a.Ns(b);
        return b.filters
    }, function(a, b) {
        if (da(b)) {
            var c = ce(b, !1);
            c && a.wg(c)
        }
    });
    Bl(E.prototype, "transform", function(a) {
        return new Al(a)
    }, function(a, b) {
        if (ja(b)) {
            var c = new Al(a);
            c.colorTransform = b.colorTransform;
            c.matrix = b.matrix
        }
    });
    D(E.prototype, null, 3);
    var Fl = function() {};
    C(Fl, "TextField", E);
    Fl.prototype.getTextFormat = function(a, b) {
        var c = this.__swiffy_d;
        if (c) return c = c.Qp(a, b), zl(c)
    };
    Fl.prototype.setTextFormat = function(a, b, c) {
        var d = this.__swiffy_d;
        if (d) {
            var e, f, h;
            a instanceof yl ? e = a : b instanceof yl ? (e = b, f = a) : c instanceof yl && (e = c, f = a, h = b);
            e && d.gk(x(e), f, h)
        }
    };
    Fl.prototype.getNewTextFormat = function() {
        var a = this.__swiffy_d;
        if (a) return a = a.Hp(), zl(a)
    };
    Fl.prototype.setNewTextFormat = function(a) {
        var b = this.__swiffy_d;
        b && a instanceof yl && b.es(x(a))
    };
    var Gl = function(a, b, c, d) {
        Object.defineProperty(Fl.prototype, a, {
            get: function() {
                var a = this.__swiffy_d;
                if (a) return b.call(this, a)
            },
            set: function(a) {
                var b = this.__swiffy_d;
                b && c && c.call(this, b, a)
            },
            enumerable: l(d) ? d : !0
        })
    };
    Gl("text", function(a) {
        return a.pj()
    }, function(a, b) {
        var c = a.i.da(),
            d = a.Oe(),
            e;
        null != d && (e = function(a) {
            c.dy(d, this, a)
        });
        a.hs(c.Da(b), e)
    });
    Gl("htmlText", function(a) {
        return a.Cp()
    }, function(a, b) {
        var c = a.i.da();
        b = c.Da(b);
        null != a.Oe() ? c.hk(a.Oe(), b) : a.Yc(b)
    });
    Gl("textColor", function(a) {
        return a.Pp()
    }, function(a, b) {
        a.ms(Number(b))
    });
    Gl("antiAliasType", function(a) {
        return a.xk
    }, function(a, b) {
        "normal" != b && "advanced" != b || a.Pr(String(b))
    });
    Gl("autoSize", function(a) {
        return a.ed
    }, function(a, b) {
        switch (b) {
            case !0:
                b = "left";
            case "center":
            case "left":
            case "none":
            case "right":
                break;
            default:
                b = "none"
        }
        a.Qr(b)
    });
    Gl("background", function(a) {
        return a.wi
    }, function(a, b) {
        a.ug(!!b)
    }, !1);
    Gl("backgroundColor", function(a) {
        return a.vi
    }, function(a, b) {
        a.Rr(Number(b))
    }, !1);
    Gl("border", function(a) {
        return a.Ai
    }, function(a, b) {
        a.Sr(!!b)
    }, !1);
    Gl("borderColor", function(a) {
        return a.zi
    }, function(a, b) {
        a.Tr(Number(b))
    }, !1);
    Gl("condenseWhite", function(a) {
        return a.Gi
    }, function(a, b) {
        a.Wr(!!b)
    }, !1);
    Gl("embedFonts", function(a) {
        return a.Ff
    }, function(a, b) {
        a.Xr(!!b)
    });
    Gl("gridFitType", function(a) {
        return a.Vp
    }, function(a, b) {
        "none" != b && "pixel" != b && "subpixel" != b || a.wx(String(b))
    }, !1);
    Gl("html", function(a) {
        return a.Dc
    }, function(a, b) {
        b = !!b;
        if (b != a.Dc) {
            var c = this.text;
            a.xx(b);
            this.text = c
        }
    });
    Gl("length", function(a) {
        return a.pj().length
    });
    Gl("maxChars", function(a) {
        return a.nm
    }, function(a, b) {
        a.as(null != b ? Number(b) : null)
    }, !1);
    Gl("mouseWheelEnabled", function() {
        return !0
    }, void 0, !1);
    Gl("multiline", function(a) {
        return a.Ve
    }, function(a, b) {
        a.cs(!!b)
    });
    Gl("password", function(a) {
        return a.Xq
    }, function(a, b) {
        a.Ax(!!b)
    }, !1);
    Gl("restrict", function(a) {
        return a.Km
    }, function(a, b) {
        a.fs(null != b ? String(b) : null)
    }, !1);
    Gl("selectable", function(a) {
        return a.Xh
    }, function(a, b) {
        a.js(!!b)
    });
    Object.defineProperty(Fl.prototype, "styleSheet", {
        value: void 0,
        enumerable: !1
    });
    Gl("sharpness", function(a) {
        return a.ps
    }, function(a, b) {
        a.Fx(Number(b))
    }, !1);
    Object.defineProperty(Fl.prototype, "tabIndex", {
        value: void 0,
        writable: !0,
        enumerable: !1
    });
    Gl("textHeight", function(a) {
        return Math.floor(a.Jl() / 20)
    });
    Gl("textWidth", function(a) {
        return Math.floor(a.Kl() / 20)
    });
    Gl("thickness", function(a) {
        return a.fn
    }, function(a, b) {
        a.Ix(Number(b))
    }, !1);
    Gl("variable", function(a) {
        return a.Oe()
    }, function(a, b) {
        a.hk(null != b ? String(b) : null)
    });
    Gl("wordWrap", function(a) {
        return a.Gg
    }, function(a, b) {
        a.os(!!b)
    });
    Gl("type", function(a) {
        return a.Zi ? "input" : "dynamic"
    }, function(a, b) {
        b = String(b).toLowerCase();
        "input" == b ? a.Om(!0) : "dynamic" == b && a.Om(!1)
    }, !1);
    D(Fl.prototype, null, 3);
    var Hl = function() {};
    Bk(Hl, E);
    var Il = function(a) {
            return function(b) {
                Object.defineProperty(this, a, {
                    value: b,
                    configurable: !0,
                    writable: !0,
                    enumerable: !0
                });
                (b = this.__swiffy_d) && b != b.i.Ka && b.$i()
            }
        },
        Jl = function(a) {
            Object.defineProperty(a.prototype, "enabled", {
                get: function() {
                    var a = this.__swiffy_d;
                    if (a) return a.enabled
                },
                set: function(a) {
                    var c = this.__swiffy_d;
                    c && (c.enabled = !!a)
                }
            })
        },
        Kl = function() {},
        Ll = [, , "onMouseUp", "onMouseDown", "onMouseMove", "onUnload", "onEnterFrame"];
    Ll[17] = "onInitialize";
    Ll[19] = "onConstruct";
    Ll[7] = "onLoad";
    Ll[14] = "onDragOver";
    Ll[16] = "onDragOver";
    Ll[8] = "onRollOut";
    Ll[9] = "onRollOver";
    Ll[10] = "onReleaseOutside";
    Ll[11] = "onRelease";
    Ll[12] = "onPress";
    Ll[13] = "onDragOut";
    Ll[15] = "onDragOut";
    for (var Ml = {}, Nl = 0; Nl < Ll.length; Nl++)
        if (1 << Nl & 4325120) {
            var Ol = Ll[Nl];
            Ml[Ol] = {
                get: Kl,
                set: Il(Ol)
            }
        }
    Object.defineProperties(Hl.prototype, Ml);
    D(Hl.prototype, null, 3);
    var Pl = function() {};
    Bk(Pl, Hl);
    D(Pl.prototype, null, 3);
    var Ql = function() {};
    C(Ql, "Button", Pl);
    Jl(Ql);
    Ql.prototype.useHandCursor = !0;
    Object.defineProperty(Ql.prototype, "tabIndex", {
        value: void 0,
        writable: !0,
        enumerable: !0
    });
    D(Ql.prototype, null, 3);
    var H = function() {};
    C(H, "MovieClip", Pl);
    Jl(H);
    H.prototype.useHandCursor = !0;
    H.prototype.focusEnabled = void 0;
    Object.defineProperty(H.prototype, "_droptarget", {
        get: function() {
            var a = this.__swiffy_d;
            return a ? (a = (a = a.Wu()) && a.o._target) && "/" != a ? a : "" : ""
        }
    });
    H.prototype.gotoAndStop = function(a) {
        var b = this.__swiffy_d;
        b && b.Wb(b.$f(a), !1)
    };
    H.prototype.gotoAndPlay = function(a) {
        var b = this.__swiffy_d;
        b && b.Wb(b.$f(a), !0)
    };
    H.prototype.play = function() {
        var a = this.__swiffy_d;
        a && a.play()
    };
    H.prototype.stop = function() {
        var a = this.__swiffy_d;
        a && a.stop()
    };
    H.prototype.nextFrame = function() {
        var a = this.__swiffy_d;
        a && a.Wb(a.ka + 1, !1)
    };
    H.prototype.prevFrame = function() {
        var a = this.__swiffy_d;
        a && a.Wb(a.ka - 1, !1)
    };
    H.prototype.globalToLocal = function(a) {
        var b = this.__swiffy_d;
        b && b.i.da().Cq(a, function(a) {
            a.Sc(b.ca())
        })
    };
    H.prototype.localToGlobal = function(a) {
        var b = this.__swiffy_d;
        b && b.i.da().Cq(a, function(a) {
            a.pb(b.ca())
        })
    };
    H.prototype.createEmptyMovieClip = function(a, b) {
        var c = this.__swiffy_d;
        if (c) {
            var d = new Mi(c.definition.Ji(), c.i, null);
            d.ac = !0;
            d.Ob(a);
            d.na();
            c.ie(b);
            c.bd(d, b);
            return d.o
        }
    };
    H.prototype.createTextField = function(a, b, c, d, e, f) {
        if (!(6 > arguments.length)) {
            var h = this.__swiffy_d;
            if (h) {
                var k = pg(b),
                    n = pg(c),
                    q = pg(d),
                    u = new Zj({
                        tag: -1,
                        height: 240,
                        color: 4278190080,
                        border: !1,
                        Yo: !1,
                        html: !1,
                        maxChars: null,
                        multiline: !1,
                        password: !1,
                        selectable: !0,
                        variable: null,
                        wrap: !1,
                        qa: 6 <= h.i.vc
                    }, new Oc(0, 0, 20 * Math.abs(pg(e)), 20 * Math.abs(pg(f))), h.i.vc),
                    u = new oi(u, h.i, null);
                u.Ob(String(a));
                u.setTransform(Ic(1, 0, 0, 1, 20 * n, 20 * q));
                u.na();
                u.ac = !0;
                h.ie(k);
                h.bd(u, k);
                return u.o
            }
        }
    };
    H.prototype.getNextHighestDepth = function() {
        var a = this.__swiffy_d;
        return a ? a.N.jv() : void 0
    };
    H.prototype.getInstanceAtDepth = function(a) {
        var b = this.__swiffy_d;
        if (b && !(-16384 > a) && (a = b.N.Mc(a))) return a instanceof li ? a.o : b.o
    };
    H.prototype.getSWFVersion = function() {
        var a = this.__swiffy_d;
        return a ? a.i.vc : -1
    };
    H.prototype.setMask = function(a) {
        var b = this.__swiffy_d;
        if (b) {
            var c;
            c = fa(a) ? b.i.da().ip(a) : a;
            if (c instanceof H || c instanceof Fl) return b.af(c.__swiffy_d), !0;
            b.af(null);
            return !l(a)
        }
    };
    H.prototype.attachMovie = function(a, b, c, d) {
        var e = this.__swiffy_d;
        if (e && (a = e.definition.Eq.wc.hm[a], l(a))) {
            var f = Yc.Fl();
            a = a.ub(e.i, f);
            a.ac = !0;
            a.Ob(b);
            e.ie(c);
            e.bd(a, c);
            if (l(d)) {
                b = a.o;
                for (var h in d) b[h] = d[h]
            }
            a.na();
            return a.o
        }
    };
    H.prototype.attachBitmap = function(a, b) {
        var c = this.__swiffy_d;
        if (c && a) {
            var d = new ki(a.__swiffy_d, c.i);
            d.ac = !0;
            c.ie(b);
            c.bd(d, b)
        }
    };
    H.prototype.duplicateMovieClip = function(a, b, c) {
        var d = this.__swiffy_d;
        if (d) {
            var e = d.getParent();
            if (e) {
                a = d.duplicate(e, a, b);
                if (l(c)) {
                    b = a.o;
                    for (var f in c) b[f] = c[f]
                }
                return a.o
            }
        }
    };
    H.prototype.removeMovieClip = function() {
        var a = this.__swiffy_d;
        if (a) {
            var b = a.getParent();
            0 <= a.depth && a.ac && b && (a.ta(), b.removeChild(a))
        }
    };
    H.prototype.loadMovie = function(a, b) {
        var c = this.__swiffy_d;
        c && (a = c.i.da().Da(a), c.xq(a, b, this))
    };
    H.prototype.loadVariables = function(a, b) {
        var c = this.__swiffy_d;
        c && gj(a, c.i, b, this, function() {
            return c
        })
    };
    H.prototype.unloadMovie = function() {
        var a = this.__swiffy_d;
        a && a.ck()
    };
    H.prototype.swapDepths = function(a) {
        var b = this.__swiffy_d,
            c = b ? b.getParent() : void 0;
        if (c) {
            var d = void 0;
            if (a instanceof E) {
                a = a.__swiffy_d;
                if (a.getParent() != c) return;
                d = a.depth
            } else "number" === typeof a && (d = a);
            l(d) && c.cn(b.depth, d)
        }
    };
    H.prototype.getBytesTotal = function() {
        var a = this.__swiffy_d;
        if (a) return a.i.Lw
    };
    H.prototype.getBytesLoaded = H.prototype.getBytesTotal;
    H.prototype.getBounds = function(a) {
        var b = this.__swiffy_d;
        if (b) {
            var c = Yh(b).clone();
            c.Wa() && c.expand(134217728, 134217728);
            if (l(a)) {
                var d = null;
                fa(a) && (a = b.i.da().vh(a, this));
                a instanceof H && (d = a.__swiffy_d);
                if (d) c.mm(b.ca().multiply(d.ca().jq()));
                else return
            }
            return {
                xMin: c.j / 20,
                xMax: c.s / 20,
                yMin: c.l / 20,
                yMax: c.G / 20
            }
        }
    };
    H.prototype.getURL = function(a, b, c) {
        var d = this.__swiffy_d;
        if (d) {
            var e = d.i.da();
            a = e.Da(a);
            var f = 0;
            fa(c) && (c = c.toLowerCase(), "get" == c ? f = 1 : "post" == c && (f = 2));
            a = new oj(e, this, a, b, f);
            d.i.Rh(a)
        }
    };
    H.prototype.hitTest = function(a, b, c) {
        var d = this.__swiffy_d;
        if (l(a) && d) {
            var e = Yh(d).pb(d.ca());
            if (!l(b) && !l(c)) {
                if (c = null, a instanceof H ? c = a.__swiffy_d : fa(a) && (c = d.i.da().vh(a, this)), null != c) return d = Yh(c).pb(c.ca()), e.Vq(d)
            } else if (l(b)) return a *= 20, b *= 20, e.contains(a, b) && (!c || d.Wt(a, b))
        }
        return !1
    };
    H.prototype.clear = function() {
        var a = this.__swiffy_d;
        a && a.Ia().clear()
    };
    H.prototype.moveTo = function(a, b) {
        var c = this.__swiffy_d;
        c && c.Ia().moveTo(a, b)
    };
    H.prototype.lineTo = function(a, b) {
        var c = this.__swiffy_d;
        c && c.Ia().lineTo(a, b)
    };
    H.prototype.curveTo = function(a, b, c, d) {
        var e = this.__swiffy_d;
        e && e.Ia().nb(a, b, c, d)
    };
    H.prototype.lineStyle = function(a, b, c, d, e, f, h, k) {
        var n = this.__swiffy_d;
        n && n.Ia().tq(a, b, c, d, e, f, h, k)
    };
    H.prototype.beginFill = function(a, b) {
        var c = this.__swiffy_d;
        c && c.Ia().Un(a, b)
    };
    var Rl = function(a, b) {
        if (!a) return null;
        if (a instanceof pl) return ik(a);
        var c = r,
            d = {},
            e, f, h, k;
        if (c.El(a, d, "a", "b", "c", "d", "tx", "ty")) c = d.a, e = d.b, f = d.c, h = d.d, k = d.tx, d = d.ty;
        else if (b)
            if (c.El(a, d, "a", "b", "d", "e", "g", "h")) c = d.a * Hc, e = d.b * Hc, f = d.d * Hc, h = d.e * Hc, k = d.g, d = d.h;
            else if (c.El(a, d, "matrixType", "x", "y", "w", "h", "r") && "box" == d.matrixType) {
            h = Math.cos(d.r);
            f = Math.sin(d.r);
            k = d.w * Hc;
            var n = d.h * Hc,
                c = h * k;
            e = f * n;
            f = -f * n;
            h *= k;
            k = d.w / 2 + d.x;
            d = d.h / 2 + d.y
        } else return null;
        else return null;
        return Ic(+c, +e, +f, +h, 20 * k, 20 *
            d)
    };
    H.prototype.beginBitmapFill = function(a, b, c) {
        var d = this.__swiffy_d;
        d && (a = a && a.__swiffy_d, a instanceof ih && d.Ia().st(a, Rl(b, !1), l(c) ? !!c : !0))
    };
    H.prototype.beginGradientFill = function(a, b, c, d, e, f, h, k) {
        var n = this.__swiffy_d;
        n && (e = Rl(e, !0)) && n.Ia().Vn(a, b, c, d, e, f, h, k)
    };
    H.prototype.endFill = function() {
        var a = this.__swiffy_d;
        a && a.Ia().$o()
    };
    H.prototype.startDrag = function(a, b, c, d, e) {
        var f = this.__swiffy_d;
        f && f.i.ws(f, a, b, c, d, e)
    };
    H.prototype.stopDrag = function() {
        var a = this.__swiffy_d;
        a && a.i.mk()
    };
    El(H.prototype, "_currentframe", function(a) {
        return Math.max(1, a.ka + 1)
    });
    El(H.prototype, "_totalframes", function(a) {
        return a.definition.frameCount
    });
    El(H.prototype, "_framesloaded", function(a) {
        return a.definition.frameCount
    });
    Bl(H.prototype, "_lockroot", function(a) {
        return a.Mj
    }, function(a, b) {
        a.$r(Boolean(b))
    });
    Bl(H.prototype, "blendMode", function(a) {
        return uc[a.wd]
    }, function(a, b) {
        var c = b - 1;
        c != c && (c = uc.indexOf(String(b)));
        a.vg(uc[c] ? c : 0)
    });
    Bl(H.prototype, "cacheAsBitmap", function(a) {
        return a.Ul()
    }, function(a, b) {
        a.Mm(Boolean(b))
    });
    D(H.prototype, null, 3);
    var Sl = function() {};
    C(Sl, "Video", E);
    Object.defineProperty(Sl.prototype, "width", {
        get: function() {
            return this.__swiffy_d.width
        }
    });
    Object.defineProperty(Sl.prototype, "height", {
        get: function() {
            return this.__swiffy_d.height
        }
    });
    Object.defineProperty(Sl.prototype, "smoothing", {
        get: function() {
            return this.__swiffy_d.smoothing
        },
        set: function(a) {
            this.__swiffy_d.smoothing = a
        }
    });
    Object.defineProperty(Sl.prototype, "deblocking", {
        get: function() {
            return this.__swiffy_d.deblocking
        },
        set: function(a) {
            this.__swiffy_d.deblocking = a
        }
    });
    Sl.prototype.attachVideo = function() {};
    Sl.prototype.clear = function() {};
    D(Sl.prototype, null, 3);
    var Ul = function(a, b) {
            if ("_" == b.charAt(0) && a instanceof E) {
                if (b in a) return b;
                var c = b.toLowerCase();
                if (Tl[c] && c in a) return c
            }
            return b
        },
        Xl = function(a, b) {
            var c = Vl[typeof a];
            if (c) {
                var d = b.toLowerCase();
                return (c = c[d]) ? c : d
            }
            if (b in a) return b;
            var e = Wl(a),
                d = b.toLowerCase();
            return (c = e[d]) ? c : b == d || d in a ? d : e[d] = b
        },
        Yl = function(a, b) {
            var c = Vl[typeof a];
            if (!c) {
                if (b in a) return b;
                c = Wl(a)
            }
            var d = b.toLowerCase();
            return (c = c[d]) ? c : d
        },
        Zl = function(a) {
            a = a instanceof pi ? a.getParent() : a;
            return a = this.sl(a, ni)
        },
        $l = function(a) {
            a =
                a instanceof pi ? a.getParent() : a;
            return a = this.sl(a, Mi)
        },
        am = function(a) {
            return ha(a) ? a : null == a || fa(a) && "" === a.trim() ? Number.NaN : Number(a)
        },
        bm = function(a) {
            return ha(a) ? a : null != a ? fa(a) && "" === a.trim() ? Number.NaN : Number(a) : 0
        },
        cm = function(a) {
            return ha(a) ? a : null != a ? fa(a) ? (a = Number(a), isNaN(a) ? 0 : a) : Number(a) : 0
        },
        dm = function(a) {
            if (fa(a)) return a;
            ga(a) && (a = a ? "1" : "0");
            return l(a) ? a instanceof E ? (a = a.__swiffy_d) ? a.qj() : "" : a + "" : ""
        },
        em = function(a) {
            return fa(a) ? a : l(a) ? a instanceof E ? (a = a.__swiffy_d) ? a.qj() : "" : a +
                "" : ""
        },
        fm = function(a) {
            return fa(a) ? a : a instanceof E ? (a = a.__swiffy_d) ? a.qj() : "" : a + ""
        },
        gm = function(a) {
            return !!a
        },
        hm = function(a) {
            return !(fa(a) ? !Number(a) : !a)
        },
        im = function(a, b) {
            return a == b ? 1 : 0
        },
        jm = function(a, b) {
            return a == b
        },
        km = function(a, b) {
            var c = typeof a,
                d = typeof b;
            return "number" === c && "number" === d ? a == b : this.pp(a, c, b, d)
        },
        lm = function(a, b) {
            var c = typeof a,
                d = typeof b;
            return c === d && null === a === (null === b) ? a == b : this.pp(a, c, b, d)
        };
    var mm = function(a, b) {
        Object.defineProperty(this, "nodeType", {
            value: a,
            writable: !1
        });
        Object.defineProperty(this, "attributes", {
            value: {},
            writable: !1
        });
        1 == a ? (this.nodeName = b, this.nodeValue = null) : (this.nodeName = null, this.nodeValue = b);
        Vd(this, {
            nextSibling: null,
            previousSibling: null,
            parentNode: null,
            childNodes: []
        })
    };
    C(mm, "XMLNode");
    Object.defineProperty(mm.prototype, "childNodes", {
        get: function() {
            return x(this).childNodes.slice(0)
        }
    });
    Object.defineProperty(mm.prototype, "firstChild", {
        get: function() {
            return x(this).childNodes[0]
        }
    });
    Object.defineProperty(mm.prototype, "lastChild", {
        get: function() {
            var a = x(this).childNodes;
            return a[a.length - 1]
        }
    });
    Object.defineProperty(mm.prototype, "nextSibling", {
        get: function() {
            return x(this).nextSibling
        }
    });
    Object.defineProperty(mm.prototype, "parentNode", {
        get: function() {
            return x(this).parentNode
        }
    });
    Object.defineProperty(mm.prototype, "previousSibling", {
        get: function() {
            return x(this).previousSibling
        }
    });
    mm.prototype.toString = function() {
        return nm(this, !1, 0)
    };
    var nm = function(a, b, c) {
        b = "undefined" !== typeof b ? b : !1;
        c = "undefined" !== typeof c ? c : 0;
        var d = "";
        if (b)
            for (var e = 0; e < c; e++) d += "  ";
        var f = b ? "\n" : "";
        if (3 == a.nodeType) return d + Ad(a.nodeValue) + f;
        var h = "";
        if (null == a.nodeName) a.xmlDecl && (h += d + a.xmlDecl + f), a.docTypeDecl && (h += d + a.docTypeDecl + f);
        else {
            var h = h + (d + "<" + a.nodeName),
                k;
            for (k in a.attributes) h += " " + k + '="' + a.attributes[k] + '"';
            if (0 == x(a).childNodes.length) return h + " />";
            h += ">" + f
        }
        k = x(a).childNodes;
        for (e = 0; e < k.length; e++) h += nm(k[e], b, c + 1);
        null != a.nodeName &&
            (h += d + "</" + a.nodeName + ">" + f);
        return h
    };
    mm.prototype.appendChild = function(a) {
        if (!~x(this).childNodes.indexOf(a)) {
            a.removeNode();
            var b = this.lastChild;
            x(this).childNodes.push(a);
            b && (x(b).nextSibling = a, x(a).previousSibling = b);
            x(a).parentNode = this
        }
    };
    mm.prototype.insertBefore = function(a, b) {
        var c = x(this).childNodes;
        if (!~c.indexOf(a)) {
            var d = c.indexOf(b);
            if (~d) {
                a.removeNode();
                x(a).parentNode = this;
                var e = c[d - 1],
                    f = c[d];
                c.splice(d, 0, a);
                e ? (x(e).nextSibling = a, x(a).previousSibling = e) : x(a).previousSibling = null;
                f ? (x(f).previousSibling = a, x(a).nextSibling = f) : x(a).nextSibling = null
            }
        }
    };
    mm.prototype.removeNode = function() {
        var a = x(this);
        a.parentNode && Da(x(a.parentNode).childNodes, this);
        a.nextSibling && (x(a.nextSibling).previousSibling = a.previousSibling);
        a.previousSibling && (x(a.previousSibling).nextSibling = a.nextSibling);
        a.nextSibling = null;
        a.previousSibling = null;
        a.parentNode = null
    };
    mm.prototype.cloneNode = function(a) {
        var b = new mm(this.nodeType, null);
        b.nodeName = this.nodeName;
        b.nodeValue = this.nodeValue;
        for (var c in this.attributes) b.attributes[c] = this.attributes[c];
        if (a) {
            c = x(this).childNodes;
            for (var d = x(b).childNodes, e = 0; e < c.length; e++) {
                var f = c[e].cloneNode(a);
                d[e] = f
            }
        }
        return b
    };
    mm.prototype.hasChildNodes = function() {
        return 0 < x(this).childNodes.length
    };
    var om = function(a, b, c) {
            for (var d = null, e = x(b), f; f = c.next();) {
                var h;
                switch (f.type) {
                    case "close":
                        return f.value;
                    case "tag":
                        h = 1;
                        break;
                    case "text":
                    case "cdata":
                        h = 3;
                        break;
                    case "xml_declaration":
                        a.xmlDecl || (a.xmlDecl = "");
                        a.xmlDecl += f.value;
                        continue;
                    case "doctype":
                        a.docTypeDecl = f.value;
                        continue;
                    default:
                        continue
                }
                h = new mm(h, f.value);
                var k = x(h);
                k.parentNode = b;
                d && (k.previousSibling = d, x(d).nextSibling = h);
                d = h;
                e.childNodes.push(h);
                if ("tag" == f.type) {
                    if (f.attributes)
                        for (k = 0; k < f.attributes.length; k++) {
                            var n = f.attributes[k];
                            h.attributes[n.name] = n.value
                        }
                    h = om(a, h, c);
                    if (null === h || h != f.value) return a.status = -9, h
                }
            }
            return null
        },
        pm = function(a) {
            mm.call(this, 1, null);
            jl(this);
            a && this.parseXML(a)
        };
    C(pm, "XML", mm);
    pm.prototype.status = 0;
    pm.prototype.createElement = function(a) {
        return new mm(1, a)
    };
    pm.prototype.createTextNode = function(a) {
        return new mm(3, a)
    };
    pm.prototype.addRequestHeader = function(a, b) {
        kl(this, a, b)
    };
    pm.prototype.load = function(a) {
        ll(a, this)
    };
    pm.prototype.send = function(a, b, c) {
        if (0 == arguments.length) return !1;
        ml(a, this.toString(), b, c);
        return !0
    };
    pm.prototype.sendAndLoad = function(a, b, c) {
        b && ll(a, b, this, c)
    };
    pm.prototype.onData = function(a) {
        var b = l(a);
        b && fj("parseXML", this, a);
        this.loaded = b;
        fj("onLoad", this, b)
    };
    pm.prototype.onLoad = function() {};
    pm.prototype.parseXML = function(a) {
        for (var b = x(this).childNodes, c = b.length - 1; 0 <= c; c--) b[c].removeNode();
        for (var d in this.attributes) delete this.attributes[d];
        this.docTypeDecl = this.xmlDecl = void 0;
        a = new Id(a, this.ignoreWhite, !0);
        try {
            this.status = 0, null !== om(this, this, a) && (this.status = -10)
        } catch (e) {
            this.status = qm(e.type)
        }
    };
    var qm = function(a) {
        switch (a) {
            case "cdata":
                return -2;
            case "xml_declaration":
                return -3;
            case "doctype":
                return -4;
            case "comment":
                return -5;
            case "tag":
            case "close":
                return -6;
            case "attribute":
                return -8;
            default:
                return -1
        }
    };
    D(pm.prototype, null, 3);
    var tm = function(a) {
        Object.defineProperty(this, "__swiffy_vm", {
            value: a
        });
        this.String = rm(String, function(b) {
            return a.Da(b)
        }, ["fromCharCode"]);
        D(this, "String", 3);
        this.Number = rm(Number, function(b) {
            return a.Pb(b)
        }, ["MAX_VALUE", "MIN_VALUE", "NaN", "NEGATIVE_INFINITY", "POSITIVE_INFINITY"]);
        D(this, "Number", 3);
        this.Boolean = rm(Boolean, function(b) {
            return a.Dg(b)
        });
        D(this, "Boolean", 3);
        this.AsBroadcaster = new Ck(a);
        D(this, "AsBroadcaster", 3);
        this.setInterval = function() {
            return sm(a, $f, arguments)
        };
        D(this, "setInterval",
            3);
        this.setTimeout = function() {
            return sm(a, Zf, arguments)
        };
        D(this, "setTimeout", 3);
        this.getVersion = function() {
            return "HTML 11,0,0,0"
        };
        D(this, "getVersion", 3);
        this.updateAfterEvent = function() {
            a.i.pd()
        };
        D(this, "updateAfterEvent", 3);
        this.escape = function(b) {
            return encodeURIComponent(a.Da(b)).replace(/[.!*'()]/g, function(a) {
                return "%" + a.charCodeAt(0).toString(16).toUpperCase()
            })
        };
        D(this, "escape", 3);
        this.unescape = function(b) {
            return gi(a.Da(b))
        };
        D(this, "unescape", 3);
        this._global = this;
        D(this, "_global", 3);
        Object.prototype.hasOwnProperty("addProperty") ||
            (Function.prototype.toString = function() {
                return "[type Function]"
            }, Object.prototype.unwatch = function(a) {
                if (1 > arguments.length) return !1;
                var c = this[a];
                delete this[a];
                this[a] = c;
                return !0
            }, Object.prototype.watch = function(a, c, d) {
                if (2 > arguments.length) return !1;
                for (var e = this, f = null, h = this; h; h = Object.getPrototypeOf(h))
                    if (null != Object.getOwnPropertyDescriptor(h, a)) {
                        e = h;
                        f = Object.getOwnPropertyDescriptor(h, a);
                        break
                    }
                if (!f || f.configurable) {
                    var k = e[a];
                    delete e[a];
                    Object.defineProperty(e, a, {
                        get: function() {
                            return k
                        },
                        set: function(e) {
                            return k = c.call(this, a, k, e, d)
                        },
                        configurable: !0
                    })
                }
                return !0
            }, Object.prototype.addProperty = function(a, c, d) {
                var e = Object.getOwnPropertyDescriptor(this, a);
                if (null == a || "" == a || !ia(c) || d && !ia(d) || e && !e.configurable) return !1;
                if (!d || e && !e.writable) d = function() {};
                Object.defineProperty(this, a, {
                    get: c,
                    set: d,
                    configurable: !0,
                    enumerable: !(e && !e.enumerable)
                });
                return !0
            }, D(Object.prototype, ["watch", "unwatch", "addProperty"], 3))
    };
    C(tm, "global");
    var rm = function(a, b, c) {
        b.__swiffy_override = function(c) {
            return new a(b(c))
        };
        b.__swiffy_wrapped_type = a;
        if (l(c))
            for (var d = 0; d < c.length; d++) b[c[d]] = a[c[d]];
        D(b, null, 3);
        return b
    };
    tm.prototype.ASSetPropFlags = function(a, b, c, d) {
        ja(a) && D(a, b, c, d)
    };
    tm.prototype.clearInterval = function(a) {
        bg(a)
    };
    tm.prototype.clearTimeout = function(a) {
        bg(a)
    };
    tm.prototype.parseFloat = parseFloat;
    tm.prototype.parseInt = function(a, b) {
        !l(b) && tg(a) && (b = 8);
        return parseInt(a, b)
    };
    tm.prototype.isFinite = function(a) {
        return isFinite(a)
    };
    tm.prototype.isNaN = function(a) {
        return isNaN(a)
    };
    var sm = function(a, b, c) {
        var d = c[0];
        if (ia(d) && 2 <= c.length) {
            var e = Array.prototype.slice.call(c, 2);
            c = c[1];
            return b(function() {
                d.apply(dl(null), e);
                a.i.Cb.flush()
            }, c)
        }
        if (ja(d) && 3 <= c.length) {
            var f = c[1],
                e = Array.prototype.slice.call(c, 3);
            c = c[2];
            return b(function() {
                ia(d[f]) && (d[f].apply(dl(d), e), a.i.Cb.flush())
            }, c)
        }
    };
    tm.prototype.Array = Array;
    tm.prototype.AsBroadcaster = Ck;
    tm.prototype.Button = Ql;
    tm.prototype.flash = {
        display: {
            BitmapData: rl
        },
        external: {
            ExternalInterface: Sk
        },
        filters: {
            BevelFilter: Ik,
            BlurFilter: Jk,
            ColorMatrixFilter: Lk,
            ConvolutionFilter: Pk,
            DropShadowFilter: Qk,
            GlowFilter: Tk,
            GradientBevelFilter: Uk,
            GradientGlowFilter: Vk
        },
        geom: {
            ColorTransform: Mk,
            Matrix: pl,
            Point: ol,
            Rectangle: ql,
            Transform: Al
        }
    };
    tm.prototype.Color = Kk;
    tm.prototype.Date = Date;
    tm.prototype.Error = Rk;
    tm.prototype.Function = gl;
    tm.prototype.LoadVars = nl;
    tm.prototype.Math = Math;
    tm.prototype.MovieClip = H;
    tm.prototype.MovieClipLoader = $k;
    tm.prototype.NetConnection = al;
    tm.prototype.NetStream = bl;
    tm.prototype.Object = dl;
    Object.defineProperty(dl, "__swiffy_override", {
        value: el
    });
    Object.defineProperty(dl, "__swiffy_wrapped_type", {
        value: Object
    });
    tm.prototype.Sound = tl;
    tm.prototype.System = new xl;
    tm.prototype.TextField = Fl;
    tm.prototype.TextFormat = yl;
    tm.prototype.XML = pm;
    tm.prototype.XMLNode = mm;
    tm.prototype.Video = Sl;
    Object.defineProperty(tm.prototype, "Key", {
        get: function() {
            return this.__swiffy_vm.getKey()
        },
        set: function() {}
    });
    Object.defineProperty(tm.prototype, "Mouse", {
        get: function() {
            return this.__swiffy_vm.Mh
        },
        set: function() {}
    });
    Object.defineProperty(tm.prototype, "Stage", {
        get: function() {
            return this.__swiffy_vm.i.X.o
        },
        set: function() {}
    });
    D(tm.prototype, null, 3);
    C(Array, "Array");
    C(Boolean, "Boolean");
    C(Date, "Date");
    C(Math, "Math");
    C(Number, "Number");
    C(String, "String");
    var um = function(a, b) {
        this.object = a;
        this.method = b
    };
    um.prototype.Op = function() {
        for (var a = this.object; a = Object.getPrototypeOf(a);)
            for (var b = Object.getOwnPropertyNames(a), c = 0; c < b.length; c++)
                if (a[b[c]] === this.method) return Object.getPrototypeOf(a);
        return null
    };
    var vm = function(a, b, c) {
        this.ha = a;
        this.data = {};
        this.Za = b;
        this.Ku = c
    };
    g = vm.prototype;
    g.get = function(a) {
        var b = this.ha.Sa(this.data, a);
        return b in this.data ? this.data[b] : this.Za.get(a)
    };
    g.call = function(a, b) {
        var c = this.ha.Sa(this.data, a);
        return c in this.data ? (c = this.data[c], c instanceof um ? Dk(c.object, Object.getPrototypeOf(c.method.prototype).constructor, b, "super") : Dk(this.Vb(), c, b, a)) : this.Za.call(a, b)
    };
    g.set = function(a, b) {
        var c = this.ha.Sa(this.data, a);
        return c in this.data ? (this.data[c] = b, !0) : this.Za.set(a, b)
    };
    g.Fd = function(a, b) {
        this.ha.Yh(this.data, a, b)
    };
    g.Qi = function(a) {
        a = this.ha.ue(this.data, a);
        a in this.data || (this.data[a] = void 0)
    };
    g.Af = function(a) {
        return this.ha.Sa(this.data, a) in this.data ? !1 : this.Za.Af(a)
    };
    g.zg = function(a) {
        this.Za.zg(a)
    };
    g.Vb = function() {
        return this.Za.Vb()
    };
    g.Rf = function() {
        return this.Za.Rf()
    };
    g.getFunction = function() {
        return this.Ku
    };
    var wm = function(a, b, c) {
        this.ha = a;
        this.data = c;
        this.Za = b
    };
    g = wm.prototype;
    g.get = function(a) {
        var b = this.ha.Sa(this.data, a);
        return b in this.data ? this.data[b] : this.Za.get(a)
    };
    g.call = function(a, b) {
        var c = this.ha.Sa(this.data, a);
        return c in this.data ? Dk(this.data, this.data[c], b, a) : this.Za.call(a, b)
    };
    g.set = function(a, b) {
        var c = this.ha.Sa(this.data, a);
        return c in this.data ? (this.data[c] = b, !0) : this.Za.set(a, b)
    };
    g.Fd = function(a, b) {
        var c = this.ha.Sa(this.data, a);
        c in this.data ? this.data[c] = b : this.Za.Fd(a, b)
    };
    g.Qi = function(a) {
        this.ha.Sa(this.data, a) in this.data || this.Za.Qi(a)
    };
    g.Af = function(a) {
        var b = this.ha.nh(this.data, a);
        return l(b) ? b : this.Za.Af(a)
    };
    g.zg = function(a) {
        this.Za.zg(a)
    };
    g.Vb = function() {
        return this.Za.Vb()
    };
    g.Rf = function() {
        return this.Za.Rf()
    };
    g.getFunction = function() {
        return this.Za.getFunction()
    };
    var xm = function(a, b) {
        this.ha = a;
        this.gn = this.dn = this.data = b
    };
    g = xm.prototype;
    g.get = function(a) {
        var b = this.ha.Sa(this.data, a);
        return b in this.data ? this.data[b] : "this" == a.toLowerCase() ? this.gn : this.ha.yl(a)
    };
    g.call = function(a, b) {
        var c = this.data,
            d = this.ha.Sa(c, a);
        return d in c ? Dk(c, c[d], b, a) : Dk(void 0, this.ha.yl(a), b, a)
    };
    g.set = function(a, b) {
        this.ha.Yh(this.data, a, b);
        return !0
    };
    g.Fd = function(a, b) {
        this.ha.Yh(this.data, a, b)
    };
    g.Qi = function(a) {
        a = this.ha.ue(this.data, a);
        a in this.data || (this.data[a] = void 0)
    };
    g.Af = function(a) {
        var b = this.ha.nh(this.data, a);
        return l(b) ? b : !!this.ha.nh(this.ha.wb, a)
    };
    g.zg = function(a) {
        a ? this.data = this.dn = a : (this.dn = null, this.data = this.gn)
    };
    g.Vb = function() {
        return this.dn
    };
    g.Rf = function() {
        return this.gn
    };
    g.getFunction = function() {
        return null
    };
    var ym = function(a) {
        this.Ed = this;
        this.Kx(a.vc);
        this.Ma = [];
        this.ec = 0;
        this.Bb = this.Ic = 4;
        this.so = [];
        this.i = a;
        this.D = null;
        this.wb = new tm(this);
        this.Yd = new Ud;
        this.Mh = new Zk;
        this.Hh(this.Mh);
        this.Yf = new Xk;
        this.Hh(this.Yf);
        this.fm();
        this.Jx()
    };
    g = ym.prototype;
    g.ql = function() {
        return 2
    };
    g.Dh = function() {
        return this.i
    };
    g.jr = function() {};
    g.ls = function() {};
    g.Xo = !1;
    g.Kx = function(a) {
        this.ue = Xl;
        this.ia = km;
        this.Sa = Yl;
        this.Kp = $l;
        this.Jq = im;
        this.Dg = hm;
        this.Pb = cm;
        this.Da = dm;
        5 <= a && (this.Jq = jm, this.Pb = bm, this.Da = em, 6 <= a && (this.ia = lm, this.Kp = Zl, 7 <= a && (this.Sa = this.ue = Ul, this.Dg = gm, this.Pb = am, this.Da = fm)))
    };
    g.Jx = function() {
        var a = this,
            b = this.i.ae;
        b.SetVariable = function(b, d) {
            var e = a.bi(String(b), a.i.Ka.o);
            if (e) {
                var f = a.ue(e.path, e.Sh);
                e.path[f] = String(d)
            }
        };
        b.GetVariable = function(b) {
            if (b = a.bi(String(b), a.i.Ka.o)) {
                var d = a.Sa(b.path, b.Sh);
                return d in b.path ? String(b.path[d]) : null
            }
            return null
        }
    };
    g.getKey = function() {
        return this.Yf
    };
    g.Hh = function(a) {
        this.yl("AsBroadcaster").initialize(a)
    };
    var zm = function(a, b) {
        a.broadcastMessage(b)
    };
    ym.prototype.mx = function(a) {
        this.Ma = [];
        this.ec = 0;
        this.Bb = this.Ic = 4;
        this.D = new xm(this, a.o)
    };
    var Am = function(a) {
            a = a.replace(/\.\.|\/:?|:/g, function(a) {
                return ".." == a ? "_parent" : "."
            });
            "." == a[0] && (a = "_root" + a);
            "." == a[a.length - 1] && (a = a.substring(0, a.length - 1));
            return a
        },
        Bm = function(a) {
            for (var b = [], c = 0, d = a.length, e = 0; e < d; e++) switch (a[e]) {
                case ".":
                    var f = e + 1;
                    if (f != d && "." == a[f]) {
                        e > c && b.push(a.substring(c, e));
                        b.push("_parent");
                        c = e + 2;
                        e++;
                        break
                    }
                case ":":
                    e > c && b.push(a.substring(c, e));
                    c = e + 1;
                    break;
                case "/":
                    0 == e ? b.push("_root") : e > c && b.push(a.substring(c, e)), c = e + 1
            }
            e > c ? b.push(0 == c && e == d ? a : a.substring(c, e)) :
                0 == b.length && b.push("");
            return b
        };
    ym.prototype.bi = function(a, b) {
        if (b = b || this.Vb()) {
            var c = 0 < a.indexOf(":") ? a.split(":") : a.split(".");
            if (1 < c.length) {
                var d = c.slice(0, c.length - 1).join(".");
                b = this.vh(d, b)
            }
            if (b) return {
                path: b,
                Sh: c[c.length - 1]
            }
        }
    };
    ym.prototype.yl = function(a) {
        return this.Oa(this.wb, a)
    };
    var Vl = {
            "boolean": {},
            number: {},
            string: {},
            object: void 0,
            "function": void 0,
            undefined: {}
        },
        Cm = function(a) {
            var b = Object.getOwnPropertyNames(a.constructor.prototype);
            a = Vl[typeof a];
            for (var c = 0; c < b.length; ++c) {
                var d = b[c],
                    e = d.toLowerCase();
                d != e && (a[e] = d)
            }
        };
    Cm(!1);
    Cm(0);
    Cm("");
    var Wl = function(a) {
        if (!a) return {
            constructor: "constructor"
        };
        var b = a.__swiffy_nm;
        if (!b || b.__swiffy_nm != a) {
            for (var b = Object.create(Wl(Object.getPrototypeOf(a))), c = Object.getOwnPropertyNames(a), d = 0; d < c.length; ++d) {
                var e = c[d],
                    f = e.toLowerCase();
                e != f && (b[f] = e)
            }
            Object.defineProperty(b, "__swiffy_nm", {
                value: a,
                writable: !0
            });
            Object.defineProperty(a, "__swiffy_nm", {
                value: b,
                writable: !0
            })
        }
        return b
    };
    g = ym.prototype;
    g.Cq = function(a, b) {
        if (ja(a)) {
            var c = this.Sa(a, "x"),
                d = this.Sa(a, "y"),
                e = a[c],
                f = a[d];
            ha(e) && ha(f) && (e = new yc(20 * e, 20 * f), b(e), a[c] = e.x / 20, a[d] = e.y / 20)
        }
    };
    g.Vb = function() {
        return this.D.Vb()
    };
    g.Od = function() {
        var a = this.D.Vb();
        return a ? a.__swiffy_d : null
    };
    g.push = function(a) {
        this.Ma[this.Bb++] = a
    };
    g.pop = function() {
        if (this.Bb > this.Ic) {
            var a = this.Ma[--this.Bb];
            this.Ma[this.Bb] = void 0;
            return a
        }
    };
    g.W = function() {
        return this.Pb(this.pop())
    };
    g.wa = function() {
        return this.Da(this.pop())
    };
    g.de = function() {
        return this.Dg(this.pop())
    };
    g.$q = function() {
        return this.ei(this.pop())
    };
    g.Zj = function() {
        for (var a = Number(this.pop()), a = Math.min(a, this.Bb - this.Ic), b = [], c = 0; c < a; ++c) b[c] = this.pop();
        return b
    };
    g.ei = function(a) {
        if (a instanceof E || (a = this.ip(String(a)))) return a
    };
    g.vh = function(a, b) {
        if (a)
            for (var c = Bm(a), d = 0; d < c.length && b; d++) b = this.Oa(b, c[d]);
        return b
    };
    g.ip = function(a) {
        return this.vh(a, this.Vb())
    };
    g.bg = function() {
        zm(this.Mh, "onMouseDown")
    };
    g.Dq = function() {
        this.Cf(new xc(4));
        zm(this.Mh, "onMouseMove")
    };
    g.Rj = function() {
        zm(this.Mh, "onMouseUp")
    };
    g.Tq = function() {
        zm(this.i.X.o, "onResize")
    };
    g.Gj = function(a) {
        this.Yf.Gj(a)
    };
    g.$n = function() {
        zm(this.Yf, "onKeyUp")
    };
    g.Fj = function(a) {
        this.Yf.Fj(a)
    };
    g.Zn = function() {
        zm(this.Yf, "onKeyDown")
    };
    g.ol = function() {};
    g.fp = function() {};
    g.bk = function() {};
    g.im = function() {};
    g.zo = function(a, b, c) {
        b = this.Sa(a, b);
        var d = !(b in a);
        if (!d) {
            var e = a.__swiffy_child_ref[b];
            e && (d = a[b], d = d === e && d.__swiffy_d.depth > c.__swiffy_d.depth)
        }
        d && (b = this.ue(a, b), a[b] = c, a.__swiffy_child_ref[b] = c)
    };
    g.vr = function(a, b, c) {
        b = this.Sa(a, b);
        c === a[b] && (delete a[b], delete a.__swiffy_child_ref[b])
    };
    g.Em = function(a, b, c) {
        this.i.Cb.uk(this.ax.bind(this, a, b, c))
    };
    g.ax = function(a, b, c) {
        this.pm(a, b, function(a, e, f, h) {
            var k = c;
            l(h.qh[f]) || (h.qh[f] = []);
            h.qh[f].push(b);
            f in e && (b.Yc(String(e[f])), k = e[f]);
            Object.defineProperty(e, f, a.eu(k, h.qh[f]))
        })
    };
    g.on = function(a, b) {
        this.i.Cb.uk(this.cy.bind(this, a, b))
    };
    g.cy = function(a, b) {
        this.pm(a, b, function(a, d, e, f) {
            (a = f.qh[e]) && Da(a, b)
        })
    };
    g.dy = function(a, b, c) {
        this.pm(a, b, function(a, b, f) {
            b[f] = c
        })
    };
    g.pm = function(a, b, c) {
        if (b = this.sl(b, Mi)) a = Am(a), (a = (b = this.bi(a, b.o)) && b.path) && a.__swiffy_d && (b = this.ue(a, b.Sh), c(this, a, b, a.__swiffy_d))
    };
    g.sl = function(a, b) {
        for (var c = a; c && !(c instanceof b);) c = c.getParent();
        return c
    };
    g.kr = function(a, b) {
        var c = -16384 + b,
            d = "_level" + b;
        d in H.prototype || Object.defineProperty(H.prototype, d, {
            get: function() {
                var a = this.__swiffy_d;
                if (a && (a = a.i.X.Mc(c))) return a.o
            },
            set: function(a) {
                Object.defineProperty(this, d, {
                    value: a,
                    configurable: !0,
                    writable: !0,
                    enumerable: !0
                })
            }
        })
    };
    g.fireEvent = function(a, b, c, d) {
        var e = a.o,
            f = Ll[c.type];
        a = !1;
        if (b)
            for (c = 0; c < b.actions.length; ++c) {
                var h = b.actions[c];
                if (!h.ro || h.ro(this)) d ? h.iq() : this.i.Cb.add(h.iq), h.stopPropagation && (a = !0)
            }
        if (f) {
            var k = this;
            b = function() {
                var a = k.Oa(e, f);
                ia(a) && a.call(e)
            };
            d ? b() : this.i.Cb.add(b)
        }
        return a
    };
    g.fm = function() {
        var a = this;
        Wh.prototype.oa = function() {
            return Object.create(E.prototype)
        };
        oi.prototype.oa = function() {
            var b = Object.create(Fl.prototype);
            a.Hh(b);
            b.addListener(b);
            return b
        };
        Bj.prototype.oa = function() {
            var b = Object.create(vl.prototype);
            a.Hh(b);
            return b
        };
        ni.prototype.oa = function() {
            return Object.create(Pl.prototype)
        };
        Mi.prototype.oa = function() {
            var a = void 0,
                c = this.definition.gm;
            c && (a = fl[c]);
            return Object.create((a ? a : H).prototype)
        };
        pi.prototype.oa = function() {
            return Object.create(Ql.prototype)
        };
        ih.prototype.oa = function() {
            return {}
        };
        ti.prototype.oa = function() {
            return Object.create(Sl.prototype)
        }
    };
    g.na = function(a, b) {
        var c = a.o,
            d = new xc(17),
            e = new xc(19),
            f = new xc(7);
        b ? (a.fireEvent(d, !0), this.i.Cb.uk(function() {
            a.fireEvent(e, !0);
            c.constructor()
        }), a.fireEvent(f), a.ah()) : (a.ah(), a.fireEvent(d, !0), a.fireEvent(e, !0), c.constructor(), a.fireEvent(f))
    };
    g.Mq = function() {};
    g.eu = function(a, b) {
        var c = a,
            d = this;
        return {
            get: function() {
                return c
            },
            set: function(a) {
                c = a;
                a = d.Da(a);
                for (var f = 0; f < b.length; f++) b[f].Yc(a)
            },
            configurable: !0
        }
    };
    g.nh = function(a, b) {
        if (null != a) {
            var c = this.Sa(a, b);
            if (c in a) {
                var d = delete a[c];
                this.lx(a, c);
                return d
            }
        }
    };
    g.lx = function(a, b) {
        if (a instanceof H) {
            var c = a.__swiffy_d;
            c && (c = c.N.yp(b)) && Ld(a, c, b)
        }
    };
    g.Yr = function(a, b) {
        this.i.Ka.o[a] = b
    };
    g.Of = function() {
        return this.Yd
    };
    g.eh = function(a, b) {
        var c = this.Yt(a, b),
            d = this;
        return function() {
            this.Ud() || (d.mx(this), c())
        }
    };
    g.Yt = function(a) {
        a = this.Yg(a, 4);
        a = "return " + Dm(Em, a);
        return Function("vm", a)(this)
    };
    g.Gf = function(a, b, c, d, e) {
        kg(120);
        var f = r;
        r = this;
        try {
            var h = a(b, c, d, e);
            lg();
            return h
        } catch (k) {
            mg(k, !!lg())
        } finally {
            r = f
        }
    };
    g.Yg = function(a, b) {
        return a ? "function(){" + this.oo(a, b) + "}" : "null"
    };
    g.oo = function(a, b) {
        for (var c = 0, d = "for(var j=0;;){" + Dm(Fm) + "switch(j){", e = [-1], f = 0; f < a.length;) {
            var h = a[f++];
            switch (h.type) {
                case 157:
                case 153:
                    e[h.target] = -1
            }
        }
        for (h = f = 0; f < a.length; ++f) e[f] && (e[f] = h++);
        f = {
            labels: e,
            registerCount: b
        };
        d += "case 0:";
        for (h = 0; h < a.length; h++) {
            var k = e[h];
            k && (d += "case " + k + ":");
            c++;
            var k = a[h],
                n = I[k.type];
            n && (d = n.compile ? d + n.compile.call(n, k, this, f) : d + Dm(n))
        }
        return d + "default:return;}}"
    };
    var Gm = function(a, b) {
            for (var c = "vm." + a.action + "(", d = 1; d < arguments.length; ++d) 1 < d && (c += ","), c += arguments[d];
            return c + ")"
        },
        Dm = function(a, b) {
            return Gm.apply(null, arguments) + ";"
        },
        Hm = function(a) {
            return l(a) && 0 <= a ? "j=" + a + ";continue;" : "return;"
        };
    g = ym.prototype;
    g.si = function(a) {
        return !(a instanceof Mi && a.Vl())
    };
    g.Pq = function(a, b) {
        a && a.Jr(b);
        b && b.Kr(a)
    };
    g.Cf = function(a) {
        for (var b = this.i.Vc, c = b.length - 1; 0 <= c; c--) b[c].Ud() || b[c].fireEvent(a)
    };
    g.ap = function(a, b) {
        b.qa() && b.Ob(a.Bh())
    };
    g.mo = function(a, b) {
        a = String(a);
        b = String(b);
        return a < b ? -1 : a > b ? 1 : 0
    };
    g.lo = function(a, b) {
        a = String(a).toUpperCase();
        b = String(b).toUpperCase();
        return a < b ? -1 : a > b ? 1 : 0
    };
    g.no = function(a, b) {
        ha(a) && ha(b) || (a = String(a), b = String(b));
        return a < b ? -1 : a > b ? 1 : 0
    };
    var Im = "_x _y _xscale _yscale _currentframe _totalframes _alpha _visible _width _height _rotation _target _framesloaded _name _droptarget _url _highquality _focusrect _soundbuftime _quality _xmouse _ymouse".split(" "),
        Tl = function() {
            var a = {};
            Im.forEach(function(b) {
                a[b] = !0
            });
            return a
        }(),
        I = {
            4: function() {
                var a = this.Od();
                a instanceof Mi && a.Wb(a.ka + 1, !1)
            },
            5: function() {
                var a = this.Od();
                a instanceof Mi && a.Wb(a.ka - 1, !1)
            },
            6: function() {
                var a = this.Od();
                a instanceof Mi && a.play()
            },
            7: function() {
                var a = this.Od();
                a instanceof
                Mi && a.stop()
            },
            9: function() {
                var a = this.Od();
                a instanceof Mi && a.nc().an()
            },
            10: function() {
                var a = this.W(),
                    b = this.W();
                this.push(b + a)
            },
            11: function() {
                var a = this.W(),
                    b = this.W();
                this.push(b - a)
            },
            12: function() {
                var a = this.W(),
                    b = this.W();
                this.push(b * a)
            },
            13: function() {
                var a = this.W(),
                    b = this.W();
                this.push(b / a)
            },
            14: function() {
                var a = this.W(),
                    b = this.W();
                this.push(this.Jq(b, a))
            },
            15: function() {
                var a = this.W(),
                    b = this.W();
                this.push(b < a)
            },
            16: function() {
                var a = this.de(),
                    b = this.de();
                this.push(b && a)
            },
            17: function() {
                var a = this.de(),
                    b = this.de();
                this.push(b || a)
            },
            18: function() {
                var a = this.de();
                this.push(!a)
            },
            19: function() {
                var a = this.wa(),
                    b = this.wa();
                this.push(b == a)
            },
            20: function() {
                var a = this.wa();
                this.push(a.length)
            },
            21: function() {
                var a = this.pop() | 0,
                    b = this.pop() | 0,
                    c = this.wa();
                this.push(c.substr(Math.max(0, b - 1), a))
            }
        },
        Jm = function() {
            return this.pop()
        };
    I[23] = Jm;
    I[24] = function() {
        var a = this.W(),
            a = 0 > a ? Math.ceil(a) : Math.floor(a);
        this.push(a)
    };
    I[28] = function() {
        var a = this.wa();
        this.push(this.Oe(a))
    };
    ym.prototype.Oe = function(a) {
        a = Bm(a);
        for (var b = this.D.get(a[0]), c = 1; c < a.length && l(b); ++c) b = this.Oa(b, a[c]);
        return b
    };
    I[29] = function() {
        var a = this.pop(),
            b = this.wa();
        this.hk(b, a)
    };
    ym.prototype.hk = function(a, b) {
        var c = Bm(a);
        if (1 == c.length) this.D.set(c[0], b);
        else {
            for (var d = this.D.get(c[0]), e = 1; l(d) && e < c.length - 1; ++e) d = this.Oa(d, c[e]);
            l(d) && this.Yh(d, c[e], b)
        }
    };
    I[33] = function() {
        var a = this.wa(),
            b = this.wa();
        this.push(b + a)
    };
    I[34] = function() {
        var a = Im[this.W()],
            b = this.ei(this.pop());
        this.push(b && a && b[a])
    };
    I[35] = function() {
        var a = this.pop(),
            b = Im[this.W()],
            c = this.ei(this.pop());
        c && b && (c[b] = a)
    };
    I[36] = function() {
        var a = this.W(),
            b = this.wa(),
            c = this.$q(),
            d = this.Od();
        c && d && c.__swiffy_d && c.__swiffy_d.duplicate(d, b, a + -16384)
    };
    I[37] = function() {
        var a = this.$q();
        a instanceof H && a.removeMovieClip()
    };
    I[38] = function() {
        var a = this.pop();
        gg(l(a) ? this.Da(a) : "undefined")
    };
    I[51] = function() {
        var a = this.W();
        this.push(String.fromCharCode(a))
    };
    I[50] = function() {
        var a = this.wa();
        this.push(a.charCodeAt(0))
    };
    I[52] = function() {
        this.push(this.i.Sp())
    };
    I[48] = function() {
        var a = this.W(),
            b;
        do b = Math.floor(Math.random() * a); while (b == a && 0 < a);
        this.push(b)
    };
    I[60] = function() {
        var a = this.pop(),
            b = this.wa();
        b && this.D.Fd(b, a)
    };
    I[65] = function() {
        var a = this.wa();
        a && this.D.Qi(a)
    };
    I[59] = function() {
        var a = this.mu(this.pop());
        this.push(a)
    };
    ym.prototype.mu = function(a) {
        a = this.Da(a);
        a = Bm(a);
        if (1 == a.length) return this.D.Af(a[0]);
        var b = this.D.get(a[0]),
            c;
        for (c = 1; l(b) && c < a.length - 1; ++c) b = this.Oa(b, a[c]);
        return !!this.nh(b, a[c])
    };
    I[62] = function() {};
    I[62].Na = 2;
    I[62].compile = function() {
        return "return " + Dm(Jm)
    };
    I[63] = function() {
        var a = this.W(),
            b = this.W();
        this.push(b % a)
    };
    I[71] = function() {
        var a = this.pop(),
            b = this.pop();
        this.push(fa(b) || fa(a) ? this.Da(b) + this.Da(a) : this.Pb(b) + this.Pb(a))
    };
    I[72] = function() {
        var a = this.pop(),
            b = this.pop();
        this.push(this.sq(b, a))
    };
    ym.prototype.sq = function(a, b) {
        var c = typeof a,
            d = typeof b;
        if ("number" !== c || "number" !== d) {
            if ("object" === c && null !== a && (a = Km(a), c = typeof a, "object" === c) || "object" === d && null !== b && (b = Km(b), d = typeof b, "object" === d)) return !1;
            if ("string" === c && "string" === d) return a < b;
            a = this.Pb(a);
            b = this.Pb(b)
        }
        return a !== a || b !== b ? void 0 : a < b
    };
    I[103] = function() {
        var a = this.pop(),
            b = this.pop();
        this.push(this.sq(a, b))
    };
    I[73] = function() {
        var a = this.pop(),
            b = this.pop();
        this.push(this.ia(b, a))
    };
    ym.prototype.pp = function(a, b, c, d) {
        "object" === b && null !== a && (a = Km(a), b = typeof a);
        "object" === d && null !== c && (c = Km(c), d = typeof c);
        if ("object" === b || "object" === d) return void 0 === a || null === a ? void 0 === c || null === c : a === c;
        if (a != c) return !1;
        if ("string" === b) {
            if (("boolean" === d || "number" === d) && "" == a.trim()) return !1
        } else if ("string" === d && ("boolean" === b || "number" === b) && "" == c.trim()) return !1;
        return !0
    };
    var Km = function(a) {
        return a.valueOf ? ia(a.valueOf) ? a.valueOf() : a.valueOf : a.toString()
    };
    I[102] = function() {
        var a = this.pop(),
            b = this.pop();
        this.push(b === a)
    };
    I[41] = function() {
        var a = this.wa(),
            b = this.wa();
        this.push(b < a)
    };
    I[42] = function() {
        throw new hg(this.pop());
    };
    I[42].Na = 2;
    I[104] = function() {
        var a = this.wa(),
            b = this.wa();
        this.push(b > a)
    };
    I[105] = function() {
        var a = this.pop(),
            b = this.pop();
        ia(a) && ia(b) && Bk(b, a)
    };
    I[74] = function() {
        var a = this.W();
        this.push(a)
    };
    I[75] = function() {
        var a = this.wa();
        this.push(a)
    };
    I[76] = function() {
        var a = this.pop();
        this.push(a);
        this.push(a)
    };
    I[77] = function() {
        var a = this.pop(),
            b = this.pop();
        this.push(a);
        this.push(b)
    };
    I[78] = function() {
        var a = this.pop(),
            b = this.pop();
        this.push(this.Oa(b, a))
    };
    ym.prototype.Oa = function(a, b) {
        if (null != a) {
            a instanceof um && (a = a.Op());
            if (!ha(b)) b = this.Sa(a, this.Da(b));
            else if (fa(a)) return;
            return a[b]
        }
    };
    ym.prototype.El = function(a, b, c) {
        for (var d = 2; d < arguments.length; ++d) {
            var e = arguments[d];
            if (!l(b[e])) {
                var f = this.Oa(a, e);
                if (!l(f)) return !1;
                b[e] = f
            }
        }
        return !0
    };
    I[79] = function() {
        var a = this.pop(),
            b = this.pop(),
            c = this.pop();
        this.Yh(c, b, a)
    };
    ym.prototype.Yh = function(a, b, c) {
        null != a && (ha(b) || (b = this.ue(a, this.Da(b)), "length" == b ? a instanceof Array && (c = Math.max(0, c | 0)) : "prototype" == b && ia(a) && (c.constructor = a)), a[b] = c)
    };
    I[80] = function() {
        var a = this.W();
        this.push(++a)
    };
    I[81] = function() {
        var a = this.W();
        this.push(--a)
    };
    I[96] = function() {
        var a = this.W(),
            b = this.W();
        this.push(a & b)
    };
    I[97] = function() {
        var a = this.W(),
            b = this.W();
        this.push(a | b)
    };
    I[98] = function() {
        var a = this.W(),
            b = this.W();
        this.push(b ^ a)
    };
    I[99] = function() {
        var a = this.W(),
            b = this.W();
        this.push(b << a)
    };
    I[100] = function() {
        var a = this.W(),
            b = this.W();
        this.push(b >> a)
    };
    I[101] = function() {
        var a = this.W(),
            b = this.W();
        this.push(b >>> a)
    };
    I[58] = function() {
        var a = this.wa(),
            b = this.pop();
        this.push(!!this.nh(b, a))
    };
    I[129] = function(a) {
        var b = this.Od();
        b instanceof Mi && b.Wb(a, !1)
    };
    I[129].compile = function(a) {
        return Dm(this, a.frame)
    };
    I[140] = function(a) {
        var b = this.Od();
        b instanceof Mi && (a = b.$f(a), void 0 != a && b.Wb(a, !1))
    };
    I[140].compile = function(a) {
        return Dm(this, za(a.label))
    };
    I[136] = function() {};
    I[136].compile = function(a, b) {
        b.so = a.constants;
        return Dm(this)
    };
    I[32] = function() {
        var a = this.pop();
        a instanceof E || (a = String(a), a = this.vh(a, this.D.Rf()), a instanceof E || (a = void 0));
        this.D.zg(a)
    };
    I[69] = function() {
        var a = this.pop(),
            b = void 0;
        a instanceof E && (b = a.__swiffy_d.qj());
        this.push(b)
    };
    I[305] = function(a) {
        this.push(a)
    };
    I[305].compile = function(a) {
        a = a.value;
        fa(a) && (a = za(a));
        return Dm(this, a)
    };
    I[306] = function() {
        this.push(void 0)
    };
    I[307] = function() {
        this.push(Number.POSITIVE_INFINITY)
    };
    I[308] = function() {
        this.push(Number.NEGATIVE_INFINITY)
    };
    I[309] = function() {
        this.push(Number.NaN)
    };
    I[304] = function(a) {
        this.push(a)
    };
    I[304].compile = function(a, b) {
        var c = b.so[a.index];
        l(c) && (c = za(c));
        return Dm(this, c)
    };
    I[303] = function(a) {
        this.push(this.Ma[a + this.ec])
    };
    I[303].compile = function(a, b, c) {
        a = a.index;
        return a < c.registerCount ? Dm(this, a) : Dm(I[306])
    };
    I[135] = function(a) {
        this.Ma[a + this.ec] = this.Ma[this.Bb - 1]
    };
    I[135].compile = function(a, b, c) {
        a = a.index;
        return a < c.registerCount ? Dm(this, a) : ""
    };
    I[154] = function(a, b, c) {
        var d = this.wa(),
            e = this.wa();
        a = new oj(this, this.Vb(), e, d, a, b, c);
        this.i.Rh(a)
    };
    I[154].compile = function(a) {
        return Dm(this, a.method, a.target, a.variables)
    };
    I[148] = function(a) {
        var b = this.pop();
        if (b instanceof Object) {
            var c = this.D;
            this.D = new wm(this, c, b);
            try {
                this.Gf(a)
            } finally {
                this.D = c
            }
        }
    };
    I[148].compile = function(a, b, c) {
        return Dm(this, b.Yg(a.body, c.registerCount))
    };
    I[155] = function(a) {
        this.push(this.Ko(4, a))
    };
    I[155].compile = function(a, b) {
        var c = b.po(a.args, [], 0, a.body, 4);
        return Dm(this, c)
    };
    I[142] = function(a, b) {
        this.push(this.Ko(a, b))
    };
    I[142].compile = function(a, b) {
        var c = b.po(a.args, a.preloads, a.suppress, a.body, a.registerCount);
        return Dm(this, a.registerCount, c)
    };
    ym.prototype.po = function(a, b, c, d, e) {
        var f = "function(self,fn,caller,args){";
        c & 4 || (f += Dm(Lm, '"this"', "self"));
        c & 1 || (f += Dm(Mm, "self", "fn"));
        c & 2 || (f += "args=Array.prototype.slice.call(args);args.callee=fn;", f += "args.caller=caller;", f += Dm(Lm, '"arguments"', "args"));
        for (c = 0; c < b.length && c + 1 < e; ++c) var h = Gm(Nm, za(b[c])),
            f = f + Dm(Om, c + 1, h);
        for (c = 0; c < a.length; ++c) b = a[c], h = "args[" + c + "]", f = fa(b) ? f + Dm(Lm, za(b), h) : f + Dm(Om, b, h);
        return f + this.oo(d, e) + "}"
    };
    ym.prototype.Ko = function(a, b) {
        var c = this,
            d = this.D,
            e = function() {
                var f = c.D,
                    h = c.D.Vb();
                c.D = new vm(c, 5 < c.i.vc ? d : new xm(c, this), e);
                var k = c.ec,
                    n = c.Ic;
                c.ec = c.Bb;
                c.Bb += a;
                c.Ic = c.Bb;
                try {
                    return c.Gf(b, this, e, f.getFunction(), arguments)
                } finally {
                    for (var q = c.ec; q < c.Bb; ++q) c.Ma[q] = void 0;
                    c.Bb = c.ec;
                    c.ec = k;
                    c.Ic = n;
                    c.D = f;
                    c.D.zg(h)
                }
            };
        Bk(e, dl);
        return e
    };
    I[143] = function(a, b, c, d, e) {
        try {
            this.Gf(a)
        } catch (f) {
            if (f instanceof hg) {
                var h = f.value;
                if (null != b) {
                    var k;
                    l(e) ? (k = this.D.get(e), this.D.Fd(e, h)) : (d += this.ec, d >= this.ec && d < this.Ic && (this.Ma[d] = h));
                    try {
                        this.Gf(b)
                    } finally {
                        l(e) && (l(k) ? this.D.Fd(e, k) : this.D.Af(e))
                    }
                } else throw f;
            } else throw c = null, f;
        } finally {
            null != c && this.Gf(c)
        }
    };
    I[143].compile = function(a, b, c) {
        var d = a.variable;
        l(d) && (d = za(d));
        return Dm(this, b.Yg(a.tryBlock, c.registerCount), b.Yg(a.catchBlock, c.registerCount), b.Yg(a.finallyBlock, c.registerCount), a.register, d)
    };
    I[61] = function() {
        var a = this.wa(),
            b = this.Zj(),
            c = Bm(a);
        if (2 > c.length) this.push(this.D.call(c[0], b));
        else {
            for (var d = this.D.get(c[0]), e = 1; null != d && e < c.length; ++e) var f = d,
                d = this.Oa(f, c[e]);
            this.push(Dk(f, d, b, a))
        }
    };
    I[61].Na = 1;
    var Dk = function(a, b, c) {
        if (ia(b)) return b.apply(dl(a), c)
    };
    I[82] = function() {
        var a = this.pop(),
            b = this.pop(),
            c = this.Zj();
        this.push(this.xt(a, b, c))
    };
    I[82].Na = 1;
    ym.prototype.xt = function(a, b, c) {
        if (null != b) {
            if (null != a && "" !== a) {
                var d = b;
                if (d instanceof um) {
                    b = d.Op();
                    if (!b) return;
                    d = d.object
                }
                b = this.Oa(b, a);
                ia(b) && "__swiffy_override" in b && (b = b.__swiffy_override);
                return Dk(d, b, c, a)
            }
            if (b instanceof um) return Dk(b.object, Object.getPrototypeOf(b.method.prototype).constructor, c, "super");
            (a = this.D.Vb()) || (a = this.D.Rf());
            ia(b) && "__swiffy_override" in b && (b = b.__swiffy_override);
            return Dk(a, b, c, "")
        }
    };
    ym.prototype.zd = function(a, b) {
        ia(a) || (a = dl);
        var c;
        (c = a.__swiffy_override) ? c = c.apply(dl(null), b): (c = Object.create(a.prototype), a.apply(dl(c), b));
        this.push(c)
    };
    I[64] = function() {
        var a = this.wa(),
            b = this.D.get(a),
            c = this.Zj();
        this.zd(b, c, a)
    };
    I[83] = function() {
        var a = this.pop(),
            b = this.pop(),
            c = this.Zj(),
            d;
        null != b && (d = null != a && "" !== a ? this.Oa(b, a) : b);
        this.zd(d, c, a)
    };
    I[67] = function() {
        for (var a = el(), b = Number(this.pop()), c = 0; c < b; c++) {
            var d = this.pop(),
                e = this.wa();
            a[e] = d
        }
        this.push(a)
    };
    I[66] = function() {
        for (var a = [], b = Number(this.pop()), c = 0; c < b; c++) a[c] = this.pop();
        this.push(a)
    };
    I[68] = function() {
        var a = this.pop();
        this.push(a instanceof H ? "movieclip" : null == a || void 0 == a ? String(a) : typeof a)
    };
    I[85] = function() {
        var a = this.pop();
        this.push(void 0);
        if ("string" !== typeof a)
            for (var b in a) cd(b) || this.push(b)
    };
    I[153] = function() {};
    I[153].Na = 2;
    I[153].compile = function(a, b, c) {
        return Hm(c.labels[a.target])
    };
    I[157] = function() {
        return this.de()
    };
    I[157].Na = 1;
    I[157].compile = function(a, b, c) {
        return "if(" + Gm(this) + "){" + Hm(c.labels[a.target]) + "}"
    };
    I[158] = function() {
        var a = this.wa(),
            b = this.bi(a);
        if (a = b && b.path.__swiffy_d)
            if (b = a.$f(b.Sh), void 0 != b && (b = a.Xu(b))) {
                for (var c = this.D, d = this.ec, e = this.Ic, f = this.Bb, h = this.Ma, k = 0; k < b.length; k++) b[k].th(a, !0);
                this.Ma = h;
                this.D = c;
                this.ec = d;
                this.Ic = e;
                this.Bb = f
            }
    };
    I[158].Na = 1;
    I[159] = function(a, b) {
        var c = this.wa(),
            d = this.bi(c);
        if (c = d && d.path.__swiffy_d) d = c.$f(d.Sh), void 0 != d && c.Wb(d + a, b)
    };
    I[159].compile = function(a) {
        return Dm(this, a.frameBias, a.play)
    };
    I[44] = function() {
        var a = this.pop(),
            b = Number(this.pop()),
            a = (a = a ? a.prototype : null) ? a : {},
            c;
        if (a.hasOwnProperty("__swiffy_if")) c = a.__swiffy_if;
        else {
            c = [];
            var d = a.__swiffy_if;
            if (d)
                for (var e = 0; e < d.length; ++e) c.push(d[e]);
            Object.defineProperty(a, "__swiffy_if", {
                value: c
            })
        }
        for (var f = 0; f < b; ++f)
            if (a = (d = this.pop()) ? d.prototype : null)
                if (c.push(d), d = a.__swiffy_if)
                    for (e = 0; e < d.length; ++e) c.push(d[e])
    };
    var Pm = function(a, b) {
        if (ia(b)) {
            "__swiffy_wrapped_type" in b && (b = b.__swiffy_wrapped_type);
            if (a instanceof b) return a;
            if (a instanceof Object) {
                var c = a.__swiffy_if;
                if (c && -1 != c.indexOf(b)) return a
            }
        }
        return null
    };
    I[43] = function() {
        var a = this.pop(),
            b = this.pop();
        this.push(Pm(a, b))
    };
    I[84] = function() {
        var a = this.pop(),
            b = this.pop();
        this.push(!!Pm(b, a))
    };
    I[39] = function() {
        var a = this.pop(),
            b = this.de(),
            c = this.de(),
            d = c ? this.W() : void 0,
            e = c ? this.W() : void 0,
            f = c ? this.W() : void 0,
            c = c ? this.W() : void 0,
            a = a ? a.__swiffy_d : null;
        a instanceof Mi && this.i.ws(a, b, c, f, e, d)
    };
    I[40] = function() {
        this.i.mk()
    };
    I[1E3] = function() {};
    var Om = function(a, b) {
        this.Ma[a + this.ec] = b
    };
    I[1001] = Om;
    var Lm = function(a, b) {
        this.D.Fd(a, b)
    };
    I[1002] = Lm;
    var Mm = function(a, b) {
        this.D.Fd("super", new um(a, b))
    };
    I[1003] = Mm;
    var Nm = function(a) {
        return this.D.get(a)
    };
    I[1004] = Nm;
    var Em = function(a) {
        var b = this;
        return function() {
            b.Gf(a)
        }
    };
    I[1005] = Em;
    var Fm = function() {
        ++ng
    };
    I[1006] = Fm;
    La({
        cB: 4,
        jB: 5,
        gB: 6,
        hC: 7,
        iC: 9,
        Qs: 10,
        at: 11,
        Ys: 12,
        Ts: 13,
        Us: 14,
        LESS: 15,
        py: 16,
        fB: 17,
        Zs: 18,
        nC: 19,
        qC: 20,
        oC: 21,
        $s: 23,
        yC: 24,
        Sz: 28,
        $B: 29,
        ZB: 32,
        mC: 33,
        Pz: 34,
        YB: 35,
        Oy: 36,
        IB: 37,
        BC: 38,
        gC: 39,
        uz: 40,
        rC: 41,
        qf: 42,
        Ly: 43,
        mA: 44,
        FB: 48,
        My: 50,
        qy: 51,
        Qz: 52,
        kz: 58,
        mz: 59,
        iz: 60,
        Jy: 61,
        JB: 62,
        Xs: 63,
        $A: 64,
        jz: 65,
        sA: 66,
        uA: 67,
        DC: 68,
        xC: 69,
        ny: 71,
        HA: 72,
        xz: 73,
        zC: 74,
        AC: 75,
        yB: 76,
        fC: 77,
        Oz: 78,
        XB: 79,
        Vs: 80,
        Ss: 81,
        Ky: 82,
        ZA: 83,
        xA: 84,
        wz: 85,
        yy: 96,
        Ay: 97,
        Dy: 98,
        zy: 99,
        By: 100,
        Cy: 101,
        lC: 102,
        GREATER: 103,
        pC: 104,
        Az: 105,
        Tz: 129,
        jC: 135,
        Sy: 136,
        Vz: 140,
        hz: 142,
        tk: 143,
        GC: 148,
        Ws: 153,
        Rz: 154,
        gz: 155,
        Yz: 157,
        ne: 158,
        Uz: 159,
        CB: 303,
        xB: 304,
        EB: 305,
        DB: 306,
        BB: 307,
        AB: 308,
        zB: 309,
        Zy: 1E3,
        vA: 1001,
        tA: 1002,
        wA: 1003,
        Nz: 1004,
        Ey: 1005,
        Ny: 1006
    }, function(a, b) {
        var c = I[a];
        c.action = b;
        ym.prototype[b] = c
    });
    vk.as2 = ym;
    var Qm = function(a) {
        this.eo = a;
        this.zj = 0
    };
    g = Qm.prototype;
    g.Cv = function() {
        return this.zj < this.eo.length
    };
    g.he = function() {
        return this.eo.charCodeAt(this.zj++)
    };
    g.hr = function() {
        return this.he() << 24 >> 24
    };
    g.lg = function() {
        var a = 0,
            b = 0;
        do var c = this.he(),
            b = b + ((c & 127) << a),
            a = a + 7; while (c & 128);
        return b
    };
    g.gr = function() {
        var a = this.he(),
            a = a | this.he() << 8;
        return a |= this.hr() << 16
    };
    var Rm = function(a) {
            return [a.lg()]
        },
        Sm = function(a) {
            return [a.lg(), a.lg()]
        },
        Tm = function(a, b, c) {
            a = a.gr() + a.zj;
            c[a] = !0;
            return [a]
        };
    var Um = function(a) {
            Object.defineProperty(this, "__swiffy_vm", {
                value: a
            });
            for (var b in Um.prototype) Object.defineProperty(this, b, {
                value: ma(Um.prototype[b], this)
            })
        },
        Vm = function(a, b) {
            Object.defineProperty(Um.prototype, a, {
                value: b
            })
        };
    var Wm = function(a, b) {
            return a ? a + "." + b : String(b)
        },
        Xm = function(a, b) {
            return !(a && a.__swiffy_disable_search && ja(b.localName))
        },
        Zm = function(a, b, c) {
            Ym && b instanceof Ym && (b = x(b), c = c || b.pa, a ? b = b.Ja() : (a = b.uri, b = b.localName));
            this.uri = a;
            this.localName = b;
            this.pa = c;
            this.We = void 0
        };
    g = Zm.prototype;
    g.complete = function() {
        return this
    };
    g.compile = function() {
        return ""
    };
    g.ge = function() {
        l(this.We) || (this.We = Wm(this.uri, this.localName));
        return this.We
    };
    g.fb = function(a) {
        if (!this.pa && Xm(a, this)) {
            var b = this.ge();
            if (b in Object(a)) return b
        }
    };
    g.cd = function() {
        return this
    };
    g.Mo = function(a) {
        var b = null != this.uri ? this.uri : "*";
        return (b && "|" != b[0] ? b + a : "") + this.localName
    };
    g.Ja = function() {
        return this.Mo("::")
    };
    g.Df = function() {
        return this.Mo(".")
    };
    g.toString = function() {
        return (this.pa ? "@" : "") + this.ge()
    };
    g.normalize = function() {
        var a = String(this.localName);
        return a === this.localName ? this : new Zm(this.uri, a, this.pa)
    };
    g.Ac = function() {
        if (!this.pa && !this.uri) {
            var a = this.localName;
            return ha(a) ? !isFinite(a) || 0 > a || 0 != a % 1 ? void 0 : a : (a = String(a), /^[0-9]+$/.test(a) ? parseInt(a, 10) : void 0)
        }
    };
    g.Rg = function(a, b) {
        var c = this.Ac();
        if (!l(c)) throw J(a, this.Ja(), $m(b).Df());
        return c
    };
    var an = function(a, b) {
        this.name = a;
        this.pa = b
    };
    an.prototype.complete = function(a) {
        return new Zm(String(a), this.name, this.pa)
    };
    an.prototype.compile = function(a) {
        return "," + a.pop()
    };
    an.prototype.toString = function() {
        return (this.pa ? "@" : "") + Wm("?", this.name)
    };
    var bn = function(a) {
        this.pa = a
    };
    bn.prototype.complete = function(a, b) {
        return new Zm(String(b), a, this.pa)
    };
    bn.prototype.compile = function(a) {
        return "," + a.pop() + "," + a.pop()
    };
    bn.prototype.toString = function() {
        return (this.pa ? "@" : "") + Wm("?", "?")
    };
    var cn = function(a, b, c) {
        this.namespaces = a;
        this.localName = b;
        this.pa = c
    };
    g = cn.prototype;
    g.complete = function() {
        return this
    };
    g.compile = function() {
        return ""
    };
    g.ge = function() {
        return Wm("", this.localName)
    };
    g.fb = function(a) {
        if (!this.pa && Xm(a, this)) {
            var b = this.namespaces,
                c = this.localName;
            a = Object(a);
            for (var d = 0; d < b.length; ++d) {
                var e = Wm(b[d], c);
                if (e in a) return e
            }
        }
    };
    g.cd = function() {
        return new Zm("", this.localName, this.pa)
    };
    g.Ja = function() {
        return String(this.localName)
    };
    g.Df = function() {
        return String(this.localName)
    };
    g.toString = function() {
        return (this.pa ? "@" : "") + Wm("[" + this.namespaces.join(", ") + "]", this.localName)
    };
    var dn = function(a, b) {
        this.namespaces = a;
        this.pa = b
    };
    dn.prototype.complete = function(a) {
        return new cn(this.namespaces, a, this.pa)
    };
    dn.prototype.compile = function(a) {
        return "," + a.pop()
    };
    dn.prototype.toString = function() {
        return (this.pa ? "@" : "") + Wm("[" + this.namespaces.join(", ") + "]", "?")
    };
    var en = function(a) {
        this.qp = a;
        this.hg = ""
    };
    en.prototype.Ln = function(a) {
        this.hg && (this.hg += ",");
        this.hg += a ? a.Ja() : "*";
        return this
    };
    en.prototype.ao = function() {
        return new Zm(this.qp.uri, this.qp.localName + ".<" + this.hg + ">", !1)
    };
    var fn = function(a, b, c, d, e) {
        switch (a.kind) {
            case 9:
                return new cn(d[a.ns], b[a.name], !1);
            case 14:
                return new cn(d[a.ns], b[a.name], !0);
            case 27:
                return new dn(d[a.ns], !1);
            case 28:
                return new dn(d[a.ns], !0);
            case 15:
                return new an(b[a.name], !1);
            case 16:
                return new an(b[a.name], !0);
            case 17:
                return new bn(!1);
            case 18:
                return new bn(!0);
            case 7:
                return new Zm(c[a.ns], b[a.name], !1);
            case 13:
                return new Zm(c[a.ns], b[a.name], !0);
            case 29:
                b = new en(e[a.name]);
                for (c = 0; c < a.params.length; c++) b.Ln(e[a.params[c]]);
                return b.ao();
            default:
                return null
        }
    };
    var jn = function(a, b, c, d) {
            a = gn(a);
            var e = b.fb(a);
            if (l(e)) return hn(d || a, a[e], c, e);
            if ((d = a.__swiffy_proxy) && d.wf) return d.wf.call(a, b.cd(), c);
            throw J(1069, b.Ja(), $m(a).Df());
        },
        kn = function(a, b) {
            a = gn(a);
            if (b.fb(a)) return !0;
            var c = a.__swiffy_proxy;
            return c && c.Se ? c.Se.call(a, b.cd()) : !1
        },
        ln = function(a, b) {
            a = gn(a);
            var c = b.fb(a);
            if (l(c)) return a[c];
            if ((c = a.__swiffy_proxy) && c.Me) return c.Me.call(a, b.cd())
        },
        mn = function(a, b, c) {
            a = gn(a);
            var d = b.fb(a);
            l(d) ? a[d] = c : (d = a.__swiffy_proxy) && d.setProperty ? d.setProperty.call(a,
                b.cd(), c) : a[b.ge()] = c
        };
    var nn = /^(?:(\{\d+(?:,(?:\d+)?)?\})|(\\u\d{4})|(\\x\d{2})|(\\[0-7]{1,3})|(\\b|\\B|\\d|\\D|\\f|\\n|\\r|\\s|\\S|\\t|\\v|\\w|\\W)|(\(\?#[^)]*\))|(\(\?P<\w+>)|(\(\?:)|(\(\?=)|(\(\?!)|(\()|(\[\^)|(\[)|([\^$.*+?|])|(\)))/,
        on = /^(?:(\\u\d{4})|(\\x\d{2})|(\\[0-7]{1,3})|(\\b|\\B|\\d|\\D|\\f|\\n|\\r|\\s|\\S|\\t|\\v|\\w|\\W)|([\-])|(\]))/,
        pn = /<(\w+)>/,
        rn = function(a, b) {
            this.lp = b || "";
            this.Lr = new qn(a);
            this.kk = [];
            this.lh = 0;
            this.If = !1
        };
    rn.prototype.translate = function() {
        for (var a = "", b = "", c = !1, d = !1, e = 0; e < this.lp.length; ++e) {
            var f = this.lp[e];
            "s" === f ? c = !0 : "x" === f ? d = !0 : -1 !== "gim".indexOf(f) && (b += f)
        }
        var h = 0,
            k = [],
            n = this;
        this.Lr.Rt(function(b, e) {
            var f;
            if (0 === n.lh) switch (f = 0, e) {
                case 1:
                case 2:
                case 3:
                case 4:
                case 5:
                    a += b;
                    break;
                case 14:
                    a = c && "." === b ? a + "[\\s\\S]" : a + b;
                    break;
                case 8:
                case 9:
                case 10:
                    a += b;
                    n.aj(0);
                    break;
                case 7:
                    ++h;
                    var t = pn.exec(b);
                    k.push({
                        name: t[1],
                        index: h
                    });
                    a += "(";
                    n.aj(0);
                    break;
                case 11:
                    ++h;
                    a += b;
                    n.aj(0);
                    break;
                case 12:
                case 13:
                    a += b;
                    n.aj(1);
                    f = 1;
                    break;
                case 15:
                    a += b;
                    n.gp();
                    break;
                case -2:
                    a += "\\" + b;
                    break;
                case -1:
                    d && " " === b || (a += b)
            } else if (1 === n.lh) switch (f = 1, e) {
                case 1:
                case 2:
                case 3:
                case 4:
                case 5:
                    a += b;
                    break;
                case 6:
                    a += b;
                    n.gp();
                    f = 0;
                    break;
                case -2:
                    a += "\\" + b;
                    break;
                case -1:
                    d && " " === b || (a += b)
            } else f = -1;
            return f
        });
        0 !== this.kk.length && (this.If = !0);
        if (this.If || this.Lr.If) return RegExp(".^", b);
        if (0 === k.length) return new RegExp(a, b);
        b = new RegExp(a, b);
        b.exec = function(a) {
            var b = RegExp.prototype.exec.call(this, a);
            k.forEach(function(a) {
                b[a.name] = b[a.index]
            });
            return b
        };
        return b
    };
    rn.prototype.aj = function(a) {
        this.kk.push(this.lh);
        this.lh = a
    };
    rn.prototype.gp = function() {
        0 !== this.kk.length ? this.lh = this.kk.pop() : this.If = !0
    };
    var qn = function(a) {
        this.Ec = a;
        this.D = 0;
        this.If = !1
    };
    qn.prototype.Rt = function(a) {
        for (;
            "" !== this.Ec;) {
            var b;
            0 === this.D ? b = nn : 1 === this.D && (b = on);
            var c = b.exec(this.Ec);
            if (null !== c) {
                var d = 0,
                    e = this;
                c.forEach(function(b, f) {
                    0 !== f && void 0 !== b && (e.D = a(c[0], f), ++d)
                });
                this.Ec = this.Ec.slice(c[0].length)
            } else {
                var f = this.Ec[0];
                "\\" === f ? (this.Ec = this.Ec.slice(1), "" !== this.Ec ? f = this.Ec[0] : this.If = !0, this.D = a(f, -2)) : this.D = a(f, -1);
                this.Ec = this.Ec.slice(1)
            }
        }
    };
    var sn = function(a, b, c) {
            this.ma = a;
            this.Nh = b;
            this.Zv = c;
            this.rj = a ? a.rj : b
        },
        tn = new sn(null, {}, !1);
    g = sn.prototype;
    g.cr = function(a) {
        return new sn(this === tn ? null : this, a, !1)
    };
    g.Zw = function(a) {
        return new sn(this === tn ? null : this, a, !0)
    };
    g.Yp = function(a) {
        return this.Zv ? kn(this.Nh, a) : l(a.fb(this.Nh))
    };
    g.find = function(a) {
        for (var b = this; b.ma && !b.Yp(a);) b = b.ma;
        return b.Nh
    };
    g.jp = function(a) {
        for (var b = this; b; b = b.ma)
            if (b.Yp(a)) return b.Nh;
        throw J(1065, a.Df());
    };
    g.av = function(a) {
        var b = this.jp(a);
        return ln(b, a)
    };
    g.yt = function(a, b, c) {
        return jn(a, b, c, this.rj)
    };
    g.rv = function() {
        return this.Nh
    };
    g.Zu = function() {
        return this.rj
    };
    g.Jt = function(a) {
        return null != a && a !== aa ? a : this.rj
    };
    var un = function(a, b, c) {
            throw J(a, b, $m(c).Df());
        },
        vn = function(a, b) {
            return function() {
                un(a, b, this)
            }
        },
        wn = function(a) {
            this.traits = a ? Object.create(a.traits) : {};
            this.lk = a ? a.lk.slice() : [];
            this.Xi = a ? a.Xi.slice() : []
        };
    g = wn.prototype;
    g.re = function(a, b) {
        this.traits[a] = b.wm(this.traits[a])
    };
    g.au = function(a) {
        for (var b in a.traits) this.re(b, a.traits[b])
    };
    g.Ni = function(a) {
        (this.lk.length || this.Xi.length) && Object.defineProperty(a, "__swiffy_slots", {
            value: this.lk.concat(this.Xi)
        });
        for (var b in this.traits) a.hasOwnProperty(b) || this.traits[b].Yk(a, b);
        return a
    };
    g.nx = function(a, b, c, d, e, f) {
        a = this.iu(a, b, c, d, e, f);
        b && this.re(b.ge(), a)
    };
    g.iu = function(a, b, c, d, e, f) {
        if (a.slot) return d && (c = d.__swiffy_coerce(c)), this.lk[a.slot] = c, new xn(a.slot, d, !a.writable);
        b = String(b.localName);
        switch (a.kind) {
            case "methods":
                return new yn((c ? c(e, f) : void 0) || zn(b));
            case "setters":
                return new An(void 0, (c ? c(e, f) : void 0) || Bn(b));
            case "getters":
                return new An((c ? c(e, f) : void 0) || Cn(b), void 0);
            default:
                return d && (c = d.__swiffy_coerce(c)), new xn(-this.Xi.unshift(c), d, !a.writable)
        }
    };
    var xn = function(a, b, c) {
        this.Nt = c;
        this.pu = Dn(a, b)
    };
    g = xn.prototype;
    g.Yk = function(a, b) {
        Object.defineProperty(a, b, this.pu)
    };
    g.get = function(a, b) {
        return a[b]
    };
    g.set = function(a, b, c) {
        a[b] = c
    };
    g.callee = function(a, b) {
        return a[b]
    };
    g.wm = function() {
        return this
    };
    var Dn = function(a, b) {
            var c, d;
            0 > a ? (c = function() {
                var b = this.__swiffy_slots;
                return b[b.length + a]
            }, d = b ? function(c) {
                var d = this.__swiffy_slots;
                d[d.length + a] = b.__swiffy_coerce(c)
            } : function(b) {
                var c = this.__swiffy_slots;
                c[c.length + a] = b
            }) : (c = function() {
                return this.__swiffy_slots[a]
            }, d = b ? function(c) {
                this.__swiffy_slots[a] = b.__swiffy_coerce(c)
            } : function(b) {
                this.__swiffy_slots[a] = b
            });
            return {
                get: c,
                set: d
            }
        },
        yn = function(a) {
            this.method = a
        };
    g = yn.prototype;
    g.Yk = function(a, b) {
        Object.defineProperty(a, b, {
            value: ma(this.method, a)
        })
    };
    g.get = function(a) {
        return ma(this.method, a)
    };
    g.set = function(a, b) {
        un(1037, b, a)
    };
    g.callee = function() {
        return this.method
    };
    g.wm = function() {
        return this
    };
    var An = function(a, b) {
        this.Pe = a;
        this.bf = b
    };
    g = An.prototype;
    g.Yk = function(a, b) {
        var c = wg(a, b) || {};
        c.get = this.Pe || c.get || vn(1077, b);
        c.set = this.bf || c.set || vn(1074, b);
        Object.defineProperty(a, b, c)
    };
    g.get = function(a, b) {
        var c = this.Pe;
        c || (c = (c = wg(a, b)) && c.get);
        if (c) return c.call(a);
        un(1077, b, a)
    };
    g.set = function(a, b, c) {
        var d = this.bf;
        d || (d = (d = wg(a, b)) && d.set);
        d ? d.call(a, c) : un(1074, b, a)
    };
    g.callee = function(a, b) {
        return this.get(a, b)
    };
    g.wm = function(a) {
        if (a instanceof An) {
            var b = this.Pe || a.Pe;
            a = this.bf || a.bf;
            if (b != this.Pe || a != this.bf) return new An(b, a)
        }
        return this
    };
    var zn = function(a) {
            return function() {
                return this[a].apply(this, arguments)
            }
        },
        Cn = function(a) {
            return function() {
                return this[a]
            }
        },
        Bn = function(a) {
            return function(b) {
                this[a] = b
            }
        },
        L = function(a, b, c) {
            En(a).re(b, new yn(c));
            Fn(a, b, "value", c)
        },
        M = function(a, b, c) {
            En(a).re(b, new An(c, void 0));
            Fn(a, b, "get", c)
        },
        N = function(a, b, c) {
            En(a).re(b, new An(void 0, c));
            Fn(a, b, "set", c)
        },
        Gn = function(a, b, c, d) {
            En(a).re(b, new An(c, d));
            Object.defineProperty(a.prototype, b, {
                get: c,
                set: d,
                configurable: !0
            })
        },
        Hn = function(a) {
            var b = En(a),
                c =
                $m(a),
                c = (c.uri ? c.uri + ":" : "") + c.localName + ".",
                d;
            for (d in a.prototype) b.re(c + d, new yn(zn(d)))
        },
        Fn = function(a, b, c, d) {
            a = a.prototype;
            var e = wg(a, b) || {};
            e.configurable = !0;
            e[c] = d;
            Object.defineProperty(a, b, e)
        };
    var In = function() {
            return "[class " + this.__swiffy_name.localName + "]"
        },
        Jn = 1,
        Mn = function(a, b, c, d, e, f, h, k, n) {
            var q = Jn++;
            if (!k) k = new Zm("", "unnamed#" + q, !1);
            else if (!(k instanceof Zm)) {
                var u = k.lastIndexOf(".");
                k = new Zm(0 < u ? k.substring(0, u) : "", 0 < u ? k.substring(u + 1) : k, !1)
            }(n = z(n, Um.prototype)) && O(n, k.ge(), a);
            Object.defineProperty(a.prototype, "__swiffy_classdef", {
                value: a
            });
            Object.defineProperty(a.prototype, "constructor", {
                value: a,
                writable: !0
            });
            Object.defineProperty(a, "__swiffy_classdef", {
                value: Kn
            });
            Object.defineProperty(a,
                "__swiffy_coerce", {
                    value: b
                });
            Object.defineProperty(a, "__swiffy_istype", {
                value: c
            });
            Object.defineProperty(a, "__swiffy_constructor", {
                value: d
            });
            Object.defineProperty(a, "__swiffy_new", {
                value: e
            });
            Object.defineProperty(a, "__swiffy_baseclass", {
                value: f
            });
            b = new wn(f && f.__swiffy_traits);
            Object.defineProperty(a, "__swiffy_traits", {
                value: b
            });
            f = f ? f.__swiffy_if.slice() : [];
            if (h)
                for (c = 0; c < h.length; ++c)
                    for (d = Ln(h[c]), b.au(d.__swiffy_traits), d = d.__swiffy_if, e = 0; e < d.length; ++e) d[e] && (f[e] = d[e]);
            f[q] = a;
            Object.defineProperty(a,
                "__swiffy_if", {
                    value: f
                });
            Object.defineProperty(a, "__swiffy_name", {
                value: k
            });
            Object.defineProperty(a, "__swiffy_typeid", {
                value: q
            });
            Object.defineProperty(a, "toString", {
                value: In
            });
            return a
        },
        Pn = function(a, b, c, d) {
            return Mn(b, c || b, Nn, b, d || b, On, null, a)
        },
        Rn = function(a, b) {
            return null != a && Qn(b, a.__swiffy_classdef)
        },
        Xn = function() {
            return function b(c) {
                return Sn.call(b, c)
            }
        },
        Sn = function(a) {
            if (null != a) {
                if (Rn(a, this)) return a;
                throw J(1034, $m(a), this.__swiffy_name);
            }
            return null
        },
        Yn = function(a) {
            return Rn(a, this)
        },
        Nn =
        function(a) {
            return this(a) === a
        },
        Zn = function(a) {
            return a.__swiffy_typeid ? a : a.__swiffy_classdef
        },
        $m = function(a) {
            return null != a ? Zn(a).__swiffy_name : new Zm("", String(a), !1)
        },
        $n = function(a) {
            a = Object.create(a.prototype);
            En(a.__swiffy_classdef).Ni(a);
            return a
        },
        bo = function(a) {
            var b = $n(this);
            ao(b).apply(b, arguments);
            return b
        },
        co = function() {
            var a = this.__swiffy_singleton;
            l(a) || (a = bo.call(this), Object.defineProperty(this, "__swiffy_singleton", {
                value: a
            }));
            return a
        },
        P = function(a, b, c, d, e) {
            return eo(a, b, {
                    Sg: c,
                    interfaces: d
                },
                e)
        },
        eo = function(a, b, c, d) {
            var e = c.ye || Xn(),
                f = c.Sg || On;
            e.prototype = Object.create(f.prototype);
            a.prototype = e.prototype;
            return Mn(e, c.Kt || c.ye || Sn, Yn, a, c.Sd || bo, Ln(f), c.interfaces, b, d)
        },
        fo = function(a) {
            return function() {
                throw J(a, $m(this).localName + "$");
            }
        },
        go = fo(2012),
        Qn = function(a, b) {
            if (!b) return !1;
            if (!a) return !0;
            var c = Ln(a),
                d = Ln(b).__swiffy_if;
            return !(!d || !d[c.__swiffy_typeid])
        },
        ho = function(a, b) {
            a.prototype.hasOwnProperty("__swiffy_buildsym") || Object.defineProperty(a.prototype, "__swiffy_buildsym", {
                value: b
            })
        },
        io = function(a, b) {
            ho(a, function(a, d) {
                return b.ub(a, null, d)
            })
        },
        En = function(a) {
            return a.__swiffy_traits
        },
        ao = function(a) {
            return a.__swiffy_classdef.__swiffy_constructor
        },
        jo = function(a, b) {
            if (!b || !b.__swiffy_typeid) throw J(1041);
            return b.__swiffy_istype(a) ? a : null
        },
        ko = function(a, b) {
            if (!b || !b.__swiffy_typeid) throw J(1041);
            return b.__swiffy_istype(a)
        },
        Q = function(a, b) {
            if (!b || !b.__swiffy_typeid) throw J(1041);
            return b.__swiffy_coerce(a)
        },
        lo = function(a) {
            if (this.__swiffy_new) return this.__swiffy_new.apply(this,
                arguments);
            var b = Object.create(this.prototype),
                c = this.apply(b, arguments);
            return c instanceof Object ? c : b
        },
        Ln = function(a) {
            return a.prototype.__swiffy_classdef
        },
        R = function(a, b, c, d, e) {
            var f = d;
            Object.defineProperty(a, b, {
                get: function() {
                    return f
                },
                set: function(a) {
                    f = e && null == a ? null : Q(a, Um.prototype[c])
                }
            })
        },
        O = function(a, b, c) {
            Object.defineProperty(a, b, {
                value: c
            })
        },
        S = function(a) {
            $m(a).ge()
        },
        mo = function(a, b, c) {
            for (var d = 0; d < b.length; ++d) {
                for (var e = b[d], f = e, h = [], k = !1, n = 0; n < f.length; ++n) {
                    var q = f.charCodeAt(n),
                        u =
                        97 <= q && 122 >= q;
                    if (u) q &= 223;
                    else if (65 <= q && 90 >= q) {
                        var p = f.charCodeAt(n + 1);
                        (k || 0 != n && 97 <= p && 122 >= p) && h.push(95)
                    }
                    h.push(q);
                    k = u
                }
                O(a, String.fromCharCode.apply(String, h), e)
            }
            if (c)
                for (var t in c) O(a, t, c[t])
        },
        no = function(a) {
            return null != a ? a : null
        },
        On = function(a) {
            return null != a ? a : {}
        },
        Kn = Xn(),
        oo = Xn();
    Um.prototype = Object.create(On.prototype);
    oo.prototype = Um.prototype;
    Mn(On, no, function(a) {
        return null != a
    }, function() {}, function() {
        return {}
    }, null, null, "Object");
    Mn(Kn, Sn, Yn, function() {}, fo(1115), On, null, "Class");
    Object.defineProperty(On.prototype, "toString", {
        value: function() {
            return "[object " + this.__swiffy_classdef.__swiffy_name.localName + "]"
        },
        writable: !0
    });
    Object.defineProperty(Object.prototype, "__swiffy_classdef", {
        value: On
    });
    Mn(oo, Sn, Yn, fo(1115), bo, On, null, "global", null);
    var po = function(a) {
            return null != a ? String(a) : null
        },
        qo = function(a, b) {
            return void 0 === a ? b : null === a ? null : String(a)
        };
    Pn("Boolean", Boolean, function(a) {
        return !!a
    });
    Pn("Number", Number, function(a) {
        return +a
    });
    Pn("String", String, po);
    var ro = Pn("int", function(a) {
        return a | 0
    });
    O(ro, "MIN_VALUE", -2147483648);
    O(ro, "MAX_VALUE", 2147483647);
    var so = Pn("uint", function(a) {
        return a >>> 0
    });
    O(so, "MIN_VALUE", 0);
    O(so, "MAX_VALUE", 4294967295);
    Pn("void", function() {});
    var to = function(a, b) {
            Vd(this, {
                id: b | 0,
                message: z(a, ""),
                name: "Error",
                stack: jg.slice()
            })
        },
        uo = P(to, "Error");
    M(uo, "errorID", function() {
        return x(this).id
    });
    Gn(uo, "message", function() {
        return x(this).message
    }, function(a) {
        x(this).message = a
    });
    Gn(uo, "name", function() {
        return x(this).name
    }, function(a) {
        x(this).name = String(a)
    });
    L(uo, "getStackTrace", function() {
        for (var a = x(this).stack, b = this.toString(), c = a.length - 1; 0 <= c; --c) {
            var d = a[c];
            d && (b += "\n\tat " + d + "()")
        }
        return b
    });
    to.prototype.toString = function() {
        var a = x(this);
        return a.message ? a.name + ": " + a.message : a.name
    };
    var vo = function(a, b) {
            var c = !b,
                d = b || to,
                e = function(b, e) {
                    d.call(this, b, e);
                    c && (x(this).name = a)
                };
            P(e, a, d);
            return e
        },
        wo = vo("ReferenceError"),
        xo = vo("TypeError"),
        yo = vo("VerifyError"),
        zo = vo("ArgumentError"),
        Ao = vo("RangeError"),
        Bo = vo("URIError"),
        Co = vo("SecurityError"),
        Do = vo("flash.errors.IOError", to),
        Eo = vo("flash.errors.EOFError", Do),
        Fo = vo("flash.errors.StackOverflowError", to),
        Go = vo("flash.errors.IllegalOperationError", to),
        Ho = function(a) {
            if (null === a) throw J(1009);
            if (void 0 === a) throw J(1010);
        },
        gn = function(a) {
            Ho(a);
            return Object(a)
        },
        hn = function(a, b, c, d) {
            if (ia(b)) return b.apply(a, c);
            throw J(1006, d || "value");
        },
        Io = function(a, b) {
            if (null == a) throw J(2007, b);
        },
        J = function(a, b) {
            var c = Jo[a] || to,
                d = Ko[a],
                e = "Error #" + a;
            if (d) var f = arguments,
                e = e + (": " + d.replace(/%(\d+)/g, function(a, b) {
                    return b < f.length ? f[b] : ""
                }));
            return new hg(new c(e, a))
        },
        Ko = {
            1001: "The method %1 is not implemented.",
            1006: "%1 is not a function.",
            1007: "Instantiation attempted on a non-constructor.",
            1009: "Cannot access a property or method of a null object reference.",
            1010: "A term is undefined and has no properties.",
            1014: "Class %1 could not be found.",
            1016: "Descendants operator (..) not supported on type",
            1023: "Stack overflow occurred",
            1034: "Type Coercion failed: cannot convert %1 to %2.",
            1037: "Cannot assign to a method %1 on %2.",
            1040: "The right-hand side of instanceof must be a class or function.",
            1041: "The right-hand side of operator must be a class.",
            1052: "Invalid URI passed to %1 function.",
            1056: "Cannot create property %1 on %2.",
            1065: "Variable %1 is not defined.",
            1069: "Property %1 not found on %2 and there is no default value.",
            1074: "Illegal write to read-only property %1 on %2.",
            1077: "Illegal read of write-only property %1 on %2.",
            1083: 'The prefix "%1" for element "%2" is not bound.',
            1085: 'The element type "%1" must be terminated by the matching end-tag "</%2>".',
            1086: "The %1 method only works on lists containing one item.",
            1087: "Assignment to indexed XML is not allowed.",
            1088: "The markup in the document following the root element must be well-formed.",
            1090: "XML parser failure: element is malformed.",
            1091: "XML parser failure: Unterminated CDATA section.",
            1094: "XML parser failure: Unterminated comment.",
            1095: "XML parser failure: Unterminated attribute.",
            1097: "XML parser failure: Unterminated processing instruction.",
            1100: "Cannot supply flags when constructing one RegExp from another.",
            1115: "%1 is not a constructor.",
            1123: "Filter operator not supported on type %1.",
            1125: "The index %1 is out of range %2.",
            1126: "Cannot change the length of a fixed Vector.",
            1127: "Type application attempted on a non-parameterized type.",
            1504: "End of file.",
            1506: "The specified range is invalid.",
            1508: "The value specified for argument %1 is invalid.",
            2004: "One of the parameters is invalid.",
            2005: "Parameter %1 is of the incorrect type. Should be type %2.",
            2006: "The supplied index is out of bounds.",
            2007: "Parameter %1 must be non-null.",
            2008: "Parameter %1 must be one of the accepted values.",
            2012: "%1 class cannot be instantiated.",
            2015: "Invalid %1.",
            2024: "An object cannot be added as a child of itself.",
            2025: "The supplied DisplayObject must be a child of the caller.",
            2030: "End of file was encountered.",
            2035: "URL Not Found. URL: %1",
            2058: "There was an error decompressing the data.",
            2067: "The ExternalInterface is not available in this container.",
            2071: "The Stage class does not implement this property or method.",
            2088: "The Proxy class does not implement %1. It must be overridden by a subclass.",
            2089: "The Proxy class does not implement %1. It must be overridden by a subclass.",
            2090: "The Proxy class does not implement %1. It must be overridden by a subclass.",
            2091: "The Proxy class does not implement %1. It must be overridden by a subclass.",
            2092: "The Proxy class does not implement %1. It must be overridden by a subclass.",
            2093: "The Proxy class does not implement %1. It must be overridden by a subclass.",
            2098: "The loading object is not a .swf file, you cannot request SWF properties from it.",
            2099: "The loading object is not sufficiently loaded to provide this information.",
            2101: "The String passed to URLVariables.decode() must be a URL-encoded query string containing name/value pairs.",
            2105: "The Proxy class does not implement %1. It must be overridden by a subclass.",
            2106: "The Proxy class does not implement %1. It must be overridden by a subclass.",
            2107: "The Proxy class does not implement %1. It must be overridden by a subclass.",
            2108: "Scene %1 was not found.",
            2109: "Frame label %1 not found in scene %2.",
            2124: "Loaded file is an unknown type. URL: %1",
            2150: "An object cannot be added as a child to one of it's children (or children's children, etc.).",
            2152: "Full screen mode is not allowed."
        },
        Jo = {
            1001: yo,
            1006: xo,
            1007: xo,
            1009: xo,
            1010: xo,
            1014: wo,
            1016: xo,
            1023: Fo,
            1034: xo,
            1037: wo,
            1040: xo,
            1041: xo,
            1052: Bo,
            1056: wo,
            1065: wo,
            1069: wo,
            1074: wo,
            1077: wo,
            1083: xo,
            1085: xo,
            1086: xo,
            1087: xo,
            1088: xo,
            1090: xo,
            1091: xo,
            1094: xo,
            1095: xo,
            1097: xo,
            1100: xo,
            1115: xo,
            1123: xo,
            1125: Ao,
            1126: Ao,
            1127: xo,
            1504: to,
            1506: Ao,
            1508: zo,
            2004: xo,
            2005: zo,
            2006: Ao,
            2007: xo,
            2008: zo,
            2012: zo,
            2015: zo,
            2024: zo,
            2025: zo,
            2030: Eo,
            2035: Do,
            2058: Do,
            2067: to,
            2071: Go,
            2088: to,
            2089: to,
            2090: to,
            2091: to,
            2092: to,
            2093: to,
            2098: to,
            2099: to,
            2101: to,
            2105: to,
            2106: to,
            2107: to,
            2108: zo,
            2109: zo,
            2124: Do,
            2150: zo,
            2152: Co
        };
    var Ym = function(a) {
            Vd(this, a.normalize())
        },
        Lo = function(a, b, c) {
            return new Ym(new Zm(a, b, c))
        };
    eo(Ym, "QName", {
        ye: function(a) {
            return a instanceof Ym ? a : Lo("", a, !1)
        },
        Sd: function(a, b) {
            var c, d;
            if (l(b)) c = l(a) ? a instanceof Ym ? a.uri : null !== a ? String(a) : null : b instanceof Ym ? b.uri : "", d = b instanceof Ym ? b.localName : String(b);
            else if (c = "", l(a)) {
                if (a instanceof Ym) return a;
                d = String(a)
            } else d = "";
            return Lo(c, d, !1)
        }
    });
    Object.defineProperty(Ym.prototype, "uri", {
        get: function() {
            return x(this).uri
        }
    });
    Object.defineProperty(Ym.prototype, "localName", {
        get: function() {
            return x(this).localName
        }
    });
    Ym.prototype.toString = function() {
        return x(this).Ja()
    };
    var Mo = function(a, b) {
            var c, d;
            l(b) ? (c = xd(a), d = b instanceof Ym ? b.uri : String(b)) : l(a) ? a instanceof Mo ? (c = a.prefix, d = a.uri) : (d = a instanceof Ym ? a.uri : String(a), c = void 0) : d = c = "";
            O(this, "prefix", c);
            O(this, "uri", d)
        },
        No = function(a) {
            return a instanceof Mo ? a : new Mo(void 0, String(a))
        };
    eo(Mo, "Namespace", {
        ye: No
    });
    Mo.prototype.valueOf = function() {
        return this.uri
    };
    Mo.prototype.toString = function() {
        return this.uri
    };
    var Po = function(a, b) {
            this.Rl = a;
            this.strings = a.strings;
            this.ints = a.ints;
            this.uints = a.uints;
            this.doubles = [Number.NaN];
            if (a.doubles)
                for (var c = 0; c < a.doubles.length; ++c) this.doubles.push(Number(a.doubles[c]));
            this.Kc = b;
            for (var d = [""], c = 0; c < a.namespaces.length; ++c) d.push(Oo(a, a.namespaces[c]));
            this.Bw = d;
            this.namespaces = [];
            for (var e = [
                    [""]
                ], c = 0; c < a.namespacesets.length; ++c) {
                for (var f = a.namespacesets[c], h = [], k = 0; k < f.length; ++k) h.push(d[f[k]]);
                e.push(h)
            }
            this.multinames = [null];
            for (c = 0; c < a.multinames.length; ++c) this.multinames.push(fn(a.multinames[c],
                this.strings, d, e, this.multinames));
            this.om = [];
            this.classes = []
        },
        Qo = 0,
        Oo = function(a, b) {
            return "PROTECTED" == b.kind ? "|PROTECTED|" : b.name ? a.strings[b.name] : "|" + b.kind + Qo++ + "|"
        };
    Po.prototype.ji = "pool";
    Po.prototype.Je = function(a, b) {
        var c;
        if (a in this.om) c = this.om[a];
        else {
            c = this.om;
            var d;
            d = this.Rl.methods[a];
            var e = this.Kc;
            if (d.code) {
                var f = d.exceptions || [],
                    h = d.code,
                    k;
                if (jc) k = aa.atob(h);
                else {
                    kc();
                    var n = ic;
                    k = [];
                    for (var q = 0; q < h.length;) {
                        var u = n[h.charAt(q++)],
                            p = q < h.length ? n[h.charAt(q)] : 0;
                        ++q;
                        var t = q < h.length ? n[h.charAt(q)] : 64;
                        ++q;
                        var v = q < h.length ? n[h.charAt(q)] : 64;
                        ++q;
                        if (null == u || null == p || null == t || null == v) throw Error();
                        k.push(u << 2 | p >> 4);
                        64 != t && (k.push(p << 4 & 240 | t >> 2), 64 != v && k.push(t << 6 & 192 | v))
                    }
                    if (8192 >=
                        k.length) k = String.fromCharCode.apply(null, k);
                    else {
                        h = "";
                        for (n = 0; n < k.length; n += 8192) q = Ga(k, n, n + 8192), h += String.fromCharCode.apply(null, q);
                        k = h
                    }
                }
                h = [!0];
                n = [];
                for (t = 0; t < f.length; ++t) q = f[t], h[q.target] = !0, n[q.from] = !0, n[q.to + 1] = !0;
                for (var t = new Qm(k), q = [], w; t.Cv();)
                    if (u = t.zj, p = t.he(), v = T[p]) q[u] = p = {
                        wj: v,
                        args: v.decode && v.decode(t, u, h),
                        yi: void 0,
                        next: void 0,
                        sj: void 0
                    }, w && (w.next = p), w = 2 != v.Na ? p : void 0;
                w = 0;
                v = !1;
                for (u = 0; u < k.length; ++u)
                    if (v = v || !!n[u], t = h[u], (p = q[u]) && (v || t) && (t && (p.yi = w++), v = !1, f.length))
                        for (p.sj = [], t = 0; t < f.length; ++t) u >= f[t].from && u <= f[t].to && p.sj.push(t);
                w = this.Vh(d.traits, b);
                k = new Ro(q, d.type, this);
                k.kt(f);
                k.append("return function(base,scope){return ");
                k.Bk(T.Hn).append("(");
                k.jt(d);
                k.it(f);
                k.append("},methodInfo);};");
                d = Function(So.prototype.ji, Po.prototype.ji, "traits", "methodInfo", k.source)(e, this, w, b)
            } else d = null;
            c = c[a] = d
        }
        return c
    };
    var To = [void 0, !1, !0, null];
    g = Po.prototype;
    g.Er = function(a, b, c, d) {
        switch (a) {
            case "methods":
                return this.Je(b, c + "/" + d);
            case "getters":
                return this.Je(b, c + "/get " + d);
            case "setters":
                return this.Je(b, c + "/set " + d);
            case "classes":
                return this.classes[b];
            case "specials":
                return To[b];
            case "doubles":
                return b ? this.doubles[b] : void 0;
            case "namespaces":
                return this.Gp(b);
            default:
                return b ? this.Rl[a][b] : void 0
        }
    };
    g.Ke = function(a, b, c) {
        return this.multinames[a].complete(b, c)
    };
    g.Gp = function(a) {
        var b = this.namespaces[a];
        b || (this.namespaces[a] = b = new Mo(void 0, this.Bw[a]));
        return b
    };
    g.Vh = function(a, b, c, d, e) {
        c = c || null;
        d = d || tn;
        e = e || new wn;
        for (var f = 0; f < a.length; ++f) {
            var h = a[f],
                k = null;
            h.type && h.writable && (k = this.Ke(h.type).ge(), k = Um.prototype[k] || On);
            var n = h.name ? this.Ke(h.name).cd() : null,
                q = this.Er(h.kind, h.value, b, b && n.Ja());
            e.nx(h, n, q, k, c, d)
        }
        return e
    };
    g.Rp = function(a) {
        a = this.Ke(a);
        return this.Kc.xp(a)
    };
    g.ko = function(a, b) {
        if (!b) return a;
        var c = this.Rp(b);
        return c || null !== a ? Q(a, c) : null
    };
    var Vo = function(a) {
        this.be = Object.create(Uo.prototype);
        Vd(this.be, this);
        this.parent = a
    };
    g = Vo.prototype;
    g.name = null;
    g.namespaces = null;
    g.attributes = null;
    g.children = null;
    g.value = null;
    g.ti = function(a, b) {
        b.push(this.dd(a));
        return a
    };
    g.Eh = function() {
        return !1
    };
    g.tj = function() {
        return !this.Eh()
    };
    g.Mf = function() {
        if (this.parent)
            for (var a = 0; a < this.parent.children.length; a++)
                if (this.parent.children[a] == this) return a;
        return -1
    };
    g.ag = function(a, b) {
        return !b && !a.pa && "*" == a.localName
    };
    g.Ml = function() {
        return !1
    };
    g.te = function(a) {
        return a
    };
    g.rf = function(a) {
        return a
    };
    g.yk = function(a) {
        return a
    };
    g.zk = function(a) {
        return a
    };
    g.Ak = function(a) {
        return a
    };
    var Wo = function(a, b, c) {
        Vo.call(this, a);
        this.name = b;
        this.namespaces = c || [];
        this.attributes = [];
        this.children = []
    };
    m(Wo, Vo);
    g = Wo.prototype;
    g.$d = "element";
    g.dd = function(a) {
        var b = [];
        a = this.ti(a, b);
        return Xo(b, a)
    };
    g.ti = function(a, b, c) {
        a = a || this.Eh();
        if (!a) {
            for (a = 0; a < this.children.length; a++) this.children[a].ti(!1, b);
            return !1
        }
        c = new Yo(c);
        for (a = 0; a < this.namespaces.length; a++) c.mr(this.namespaces[a]);
        var d = c.Dr(this.name),
            e = "<" + d;
        for (a = 0; a < this.attributes.length; a++) var f = this.attributes[a],
            e = e + (" " + c.Dr(f.name) + '="' + Bd(f.value) + '"');
        e += c.du();
        if (0 == this.children.length) b.push(e + "/>");
        else if (1 == this.children.length && "text" == this.children[0].$d) b.push(e + ">" + this.children[0].dd(!0) + "</" + d + ">");
        else {
            f = [];
            for (a =
                0; a < this.children.length; a++) this.children[a].ti(!0, f, c);
            b.push(e + ">");
            b.push(f);
            b.push("</" + d + ">")
        }
        return !0
    };
    g.Eh = function() {
        for (var a = 0; a < this.children.length; a++)
            if (this.children[a] instanceof Wo) return !0;
        return !1
    };
    g.vb = function(a) {
        a = new Wo(a, this.name, this.namespaces.slice());
        for (var b = 0; b < this.attributes.length; b++) a.attributes.push(this.attributes[b].vb(a));
        for (b = 0; b < this.children.length; b++) a.children.push(this.children[b].vb(a));
        return a
    };
    g.ag = function(a) {
        if (a.pa) return !1;
        if ("*" == a.localName) return !0;
        var b = x(this.name);
        return a.localName == b.localName && a.uri == b.uri
    };
    g.Ml = function(a) {
        for (var b = a.pa ? this.attributes : this.children, c = 0; c < b.length; c++)
            if (b[c].ag(a, !1)) return !0;
        return !1
    };
    g.te = function(a, b, c) {
        var d = l(c);
        c = (c = d ? c : b.pa) ? this.attributes : this.children;
        for (var e = 0; e < c.length; e++) {
            var f = c[e];
            f.ag(b, d) && a.push(f)
        }
        return a
    };
    g.rf = function(a, b, c) {
        if (b.pa)
            for (var d = 0; d < this.attributes.length; d++) {
                var e = this.attributes[d];
                e.ag(b, c) && a.push(e)
            }
        for (d = 0; d < this.children.length; d++) e = this.children[d], e.ag(b, c) && a.push(e), e.rf(a, b, c);
        return a
    };
    g.yk = function(a) {
        for (var b = 0; b < this.attributes.length; b++) a.push(this.attributes[b]);
        return a
    };
    g.zk = function(a) {
        for (var b = 0; b < this.children.length; b++) a.push(this.children[b]);
        return a
    };
    g.Ak = function(a, b) {
        for (var c = 0; c < this.children.length; c++) {
            var d = this.children[c];
            d.$d == b && a.push(d)
        }
        return a
    };
    g.ic = function(a, b) {
        this.attributes.push(new Zo(this, a, b));
        return this
    };
    g.qe = function(a) {
        a = new Wo(this, a, []);
        this.children.push(a);
        return a
    };
    var Zo = function(a, b, c) {
        Vo.call(this, a);
        this.name = b;
        this.value = c
    };
    m(Zo, Vo);
    g = Zo.prototype;
    g.$d = "attribute";
    g.dd = function(a) {
        return a ? Bd(this.value) : this.value
    };
    g.vb = function(a) {
        return new Zo(a, this.name, this.value)
    };
    g.Mf = function() {
        return -1
    };
    g.ag = function(a, b) {
        if ("*" == a.localName) return !0;
        var c = x(this.name);
        return a.localName == c.localName && (b && !c.uri || a.uri == c.uri)
    };
    var $o = function(a, b) {
        Vo.call(this, a);
        this.value = b
    };
    m($o, Vo);
    $o.prototype.$d = "text";
    $o.prototype.dd = function(a) {
        return a ? Ad(this.value) : this.value
    };
    $o.prototype.vb = function(a) {
        return new $o(a, this.value)
    };
    var ap = function(a, b) {
        Vo.call(this, a);
        this.value = b
    };
    m(ap, Vo);
    ap.prototype.$d = "text";
    ap.prototype.dd = function(a) {
        return a ? "<![CDATA[" + this.value + "]]\x3e" : this.value
    };
    ap.prototype.vb = function(a) {
        return new ap(a, this.value)
    };
    var bp = function(a, b) {
            if (a instanceof Ym) return x(a);
            !l(a) && l(b) && (a = b);
            a = String(a);
            var c = "@" == a.charAt(0);
            c && (a = a.substring(1));
            return new Zm("", a, c)
        },
        cp = function(a) {
            try {
                return a.next()
            } catch (b) {
                switch (b.type) {
                    case "tag":
                    case "close":
                        throw J(1090);
                    case "cdata":
                        throw J(1091);
                    case "comment":
                        throw J(1094);
                    case "processing_instruction":
                        throw J(1097);
                    case "attribute":
                        throw J(1095);
                    default:
                        throw b;
                }
            }
        },
        dp = function(a, b) {
            for (var c = {}, d = 0; d < a.length;) {
                var e = a[d],
                    f = e.name.match(/^xmlns(?::(.*))?$/);
                f ? (c[f[1] ||
                    ""] = e.value, a.splice(d, 1)) : d++
            }
            b || !ig || l(c[""]) || (c[""] = ig);
            this.Ms = c;
            this.ma = b
        };
    dp.prototype.resolve = function(a, b, c) {
        if (!l(c)) {
            var d = b.indexOf(":");
            c = 0 <= d ? b.substring(0, d) : "";
            b = 0 <= d ? b.substring(d + 1) : b
        }
        if (a && !c) return Lo("", b, !0);
        d = this.Ms[c];
        if (l(d)) return Lo(d, b, a);
        if (this.ma) return this.ma.resolve(a, b, c);
        if (c) throw J(1083, c, b);
        return Lo("", b, !1)
    };
    dp.prototype.iv = function() {
        var a = this.Ms;
        return Object.keys(a).map(function(b) {
            return new Mo(b, a[b])
        })
    };
    var ep = function(a, b, c, d) {
            for (var e = c || null, f; f = cp(a);) switch (f.type) {
                case "tag":
                    c = f.attributes;
                    b = new dp(c, b);
                    e = new Wo(e, b.resolve(!1, f.value), b.iv());
                    for (d = 0; d < c.length; d++) {
                        var h = c[d];
                        e.attributes.push(new Zo(e, b.resolve(!0, h.name), h.value))
                    }
                    for (;;) {
                        c = ep(a, b, e, f.value);
                        if (!c) return e;
                        e.children.push(c)
                    }
                case "close":
                    if (e) {
                        if (d != f.value) throw a = e.name.localName, J(1085, a, a);
                        return null
                    }
                    throw J(1088);
                case "text":
                    return new $o(e || null, f.value);
                case "cdata":
                    return new ap(e || null, f.value)
            }
            if (!c) return null;
            a = e.name.localName;
            throw J(1085, a, a);
        },
        Yo = function(a) {
            this.Sj = [];
            this.fe = (this.xm = !l(a)) ? {} : a.fe
        };
    Yo.prototype.Eu = function() {
        if (!this.xm) {
            var a = {},
                b;
            for (b in this.fe) a[b] = this.fe[b];
            this.fe = a;
            this.xm = !0
        }
    };
    Yo.prototype.mr = function(a) {
        var b = a.prefix || "",
            c = a.uri,
            d = this.fe[c];
        d != b && (void 0 === d && (this.Eu(), this.fe[c] = b), this.Sj.push(a))
    };
    Yo.prototype.Dr = function(a) {
        var b = a.uri;
        a = a.localName;
        if (!b) return a;
        var c = this.fe[b];
        if (!c) {
            for (var c = "", d = 0; c in this.fe; d++) c = String.fromCharCode(97 + d / 17576) + String.fromCharCode(97 + d / 17576 % 26) + String.fromCharCode(97 + d / 676 % 26) + String.fromCharCode(97 + d / 26 % 26);
            this.mr(new Mo(c, b))
        }
        return c ? c + ":" + a : a
    };
    Yo.prototype.du = function() {
        for (var a = "", b = 0; b < this.Sj.length; b++) {
            var a = a + " xmlns",
                c = this.Sj[b],
                d = c.prefix;
            d && (a += ":" + d);
            a += '="' + Bd(c.uri) + '"'
        }
        this.Sj = [];
        return a
    };
    var Xo = function(a, b) {
        b = b && fp.prettyPrinting;
        var c = "";
        if (b)
            for (var d = fp.prettyIndent; 0 < d; d--) c += " ";
        var e = [],
            f = function(a, d) {
                for (var n = 0; n < a.length; n++)
                    if (da(a[n])) f(a[n], d + c);
                    else if (b)
                    for (var q = a[n].trim().split(/\n/), u = 0; u < q.length; u++) e.push(d + q[u]);
                else e.push(a[n])
            };
        f(a, "");
        return e.join(b ? "\n" : "")
    };
    var gp = function(a) {
            if (a instanceof Uo) a = [x(a)];
            else if (a instanceof gp) a = x(a).slice();
            else if (null != a && "" != a) {
                a = String(a);
                a = new Id(a, fp.ignoreWhitespace, !1);
                for (var b, c = []; b = ep(a);) c.push(b);
                a = c
            } else a = [];
            return hp(a)
        },
        ip = function(a) {
            return a instanceof gp ? a : new gp(a)
        };
    eo(gp, "XMLList", {
        ye: ip,
        Sd: gp
    });
    var jp = function(a) {
        for (var b = x(this), c = a.Ac() < b.length, d = 0; !c && d < b.length; d++) c = b[d].Ml(a);
        return c
    };
    Object.defineProperty(gp.prototype, "__swiffy_proxy", {
        value: {
            wf: function(a, b) {
                var c = kp[a];
                if (ia(c)) return c.apply(this, b);
                c = lp[a];
                if (ia(c)) {
                    var d = mp.call(this, 1086, a);
                    return c.apply(d, b)
                }
                c = String.prototype[a];
                if (ia(c) && (d = mp.call(this, 1086, a), x(d).tj())) return c.apply(d.toString(), b);
                throw J(1006, "value");
            },
            Bf: function() {
                return !1
            },
            nj: function(a) {
                for (var b = x(this), c = [], d = 0; d < b.length; d++) b[d].rf(c, a, !1);
                return hp(c)
            },
            Me: function(a) {
                var b = x(this),
                    c = a.Ac();
                if (l(c)) return np(b[c]);
                for (var c = [], d = 0; d < b.length; d++) b[d].te(c,
                    a);
                return hp(c)
            },
            setProperty: function(a, b) {
                var c = x(this),
                    d = a.Ac();
                l(d) && (d > c.length && (d = c.length), b instanceof Uo && (c[d] = x(b)))
            },
            Se: jp,
            eg: function(a) {
                return String(a - 1)
            },
            Xe: function(a) {
                return ++a > x(this).length ? 0 : a
            },
            fg: function(a) {
                return np(x(this)[a - 1])
            }
        }
    });
    gp.prototype.hasOwnProperty = function(a) {
        return jp.call(this, bp(a))
    };
    gp.prototype.toString = function() {
        if (kp.hasComplexContent.call(this)) return kp.toXMLString.call(this);
        for (var a = x(this), b = [], c = 0; c < a.length; c++) b.push(a[c].dd(!1));
        return b.join("")
    };
    gp.prototype.valueOf = function() {
        return this
    };
    gp.prototype.toJSON = function() {
        return "XMLList"
    };
    var kp = {
            attribute: function(a) {
                a = bp(a);
                for (var b = x(this), c = 0; c < b.length; c++) b[c].te([], a, !0);
                return hp([])
            },
            attributes: function() {
                for (var a = [], b = x(this), c = 0; c < b.length; c++) b[c].yk(a);
                return hp(a)
            },
            child: function() {
                S(this, "child");
                return hp([])
            },
            children: function() {
                for (var a = x(this), b = [], c = 0; c < a.length; c++) a[c].zk(b);
                return hp(b)
            },
            comments: function() {
                S(this, "comments");
                return hp([])
            },
            contains: function(a) {
                Q(a, fp);
                S(this, "contains");
                return !1
            },
            copy: function() {
                S(this, "copy");
                return hp([])
            },
            descendants: function(a) {
                a =
                    bp(a, "*");
                for (var b = x(this), c = [], d = 0; d < b.length; d++) b[d].rf(c, a, !0);
                return hp(c)
            },
            elements: function(a) {
                a = bp(a, "*");
                for (var b = x(this), c = [], d = 0; d < b.length; d++) b[d].te(c, a, !1);
                return hp(c)
            },
            hasComplexContent: function() {
                var a = x(this);
                if (0 == a.length) return !1;
                if (1 == a.length) return a[0].Eh();
                for (var b = 0; b < a.length; b++)
                    if ("element" == a[b].$d) return !0;
                return !1
            },
            hasSimpleContent: function() {
                var a = x(this);
                if (0 == a.length) return !0;
                if (1 == a.length) return a[0].tj();
                for (var b = 0; b < a.length; b++)
                    if ("element" == a[b].$d) return !1;
                return !0
            },
            length: function() {
                return x(this).length
            },
            normalize: function() {
                S(this, "normalize");
                return hp([])
            },
            parent: function() {
                var a = x(this);
                if (a.length) {
                    for (var b = a[0].parent, c = 1; b && c < a.length; c++)
                        if (a[c].parent != b) return;
                    return np(b)
                }
            },
            processingInstructions: function() {
                S(this, "processingInstructions");
                return hp([])
            },
            propertyIsEnumerable: function(a) {
                return bp(a).Ac() < x(this).length
            },
            text: function() {
                for (var a = x(this), b = [], c = 0; c < a.length; c++) a[c].Ak(b, "text");
                return hp(b)
            },
            toXMLString: function() {
                for (var a =
                        x(this), b = [], c = 0; c < a.length; c++) b.push(a[c].dd(!0));
                return b.join("\n")
            }
        },
        hp = function(a) {
            var b = Object.create(gp.prototype);
            Vd(b, a);
            return b
        },
        mp = function(a, b) {
            var c = x(this);
            if (1 == c.length) return c[0].be;
            throw J.apply(null, arguments);
        },
        np = function(a) {
            return a ? a.be : void 0
        };
    var Uo = function(a) {
            if (a instanceof gp) return a = mp.call(a, 1088), lp.copy.call(a);
            if (a instanceof Uo) return lp.copy.call(a);
            if (null != a) {
                a = String(a);
                a = new Id(a, fp.ignoreWhitespace, !1);
                var b = ep(a);
                b || (b = new $o(null, ""));
                if (cp(a)) throw J(1088);
                return b.be
            }
            return (new $o(null, "")).be
        },
        fp = function(a) {
            return a instanceof Uo ? a : a instanceof gp ? mp.call(a, 1088) : new Uo(a)
        };
    eo(Uo, "XML", {
        ye: fp,
        Sd: Uo
    });
    R(fp, "ignoreComments", "Boolean", !0);
    R(fp, "ignoreProcessingInstructions", "Boolean", !0);
    R(fp, "ignoreWhitespace", "Boolean", !0);
    R(fp, "prettyIndent", "int", 2);
    R(fp, "prettyPrinting", "Boolean", !0);
    var op = function(a) {
        return 0 == a.Ac() || x(this).Ml(a)
    };
    Object.defineProperty(Uo.prototype, "__swiffy_proxy", {
        value: {
            wf: function(a, b) {
                var c = lp[a];
                if (ia(c)) return c.apply(this, b);
                c = String.prototype[a];
                if (ia(c) && x(this).tj()) return c.apply(this.toString(), b);
                throw J(1006, "value");
            },
            Bf: function() {
                return !1
            },
            nj: function(a) {
                a = x(this).rf([], a, !1);
                return hp(a)
            },
            Me: function(a) {
                if (0 == a.Ac()) return this;
                a = x(this).te([], a);
                return hp(a)
            },
            setProperty: function(a) {
                if (l(a.Ac())) throw J(1087);
            },
            Se: op,
            eg: function() {
                return "0"
            },
            Xe: function(a) {
                return 0 == a ? 1 : 0
            },
            fg: function() {
                return this
            }
        }
    });
    Uo.prototype.hasOwnProperty = function(a) {
        return op.call(this, bp(a))
    };
    Uo.prototype.toString = function() {
        return x(this).dd(!1)
    };
    Uo.prototype.valueOf = function() {
        return this
    };
    Uo.prototype.toJSON = function() {
        return "XML"
    };
    var lp = {
        addNamespace: function() {
            S(this, "addNamespace");
            return this
        },
        appendChild: function() {
            S(this, "appendChild");
            return this
        },
        attribute: function(a) {
            a = x(this).te([], bp(a), !0);
            return hp(a)
        },
        attributes: function() {
            var a = x(this).yk([]);
            return hp(a)
        },
        child: function() {
            S(this, "child");
            return hp([])
        },
        childIndex: function() {
            return x(this).Mf()
        },
        children: function() {
            var a = x(this).zk([]);
            return hp(a)
        },
        comments: function() {
            S(this, "comments");
            return hp([])
        },
        contains: function(a) {
            Q(a, fp);
            S(this, "contains");
            return !1
        },
        copy: function() {
            return x(this).vb(null).be
        }
    };
    fp.defaultSettings = function() {
        return {
            ignoreComments: !0,
            ignoreProcessingInstructions: !0,
            ignoreWhitespace: !0,
            prettyIndent: 2,
            prettyPrinting: !0
        }
    };
    lp.descendants = function(a) {
        a = bp(a, "*");
        a = x(this).rf([], a, !0);
        return hp(a)
    };
    lp.elements = function(a) {
        a = x(this).te([], bp(a, "*"), !1);
        return hp(a)
    };
    lp.hasComplexContent = function() {
        return x(this).Eh()
    };
    lp.hasSimpleContent = function() {
        return x(this).tj()
    };
    lp.inScopeNamespaces = function() {
        S(this, "inScopeNamespaces");
        return []
    };
    lp.insertChildAfter = function() {
        S(this, "insertChildAfter")
    };
    lp.insertChildBefore = function() {
        S(this, "insertChildBefore")
    };
    lp.length = function() {
        return 1
    };
    lp.localName = function() {
        var a = x(this).name;
        return a ? a.localName : null
    };
    lp.name = function() {
        return x(this).name
    };
    lp.namespace = function() {
        S(this, "namespace");
        return null
    };
    lp.namespaceDeclarations = function() {
        S(this, "namespaceDeclarations");
        return []
    };
    lp.nodeKind = function() {
        return x(this).$d
    };
    lp.normalize = function() {
        S(this, "normalize");
        return this
    };
    lp.parent = function() {
        var a = x(this);
        if (a.parent) return a.parent.be
    };
    lp.prependChild = function() {
        S(this, "prependChild");
        return this
    };
    lp.processingInstructions = function() {
        S(this, "processingInstructions");
        return hp([])
    };
    lp.propertyIsEnumerable = function(a) {
        return "0" == bp(a).Ac()
    };
    lp.removeNamespace = function(a) {
        Q(a, No);
        S(this, "removeNamespace");
        return this
    };
    lp.replace = function() {
        S(this, "replace");
        return this
    };
    lp.setChildren = function() {
        S(this, "setChildren");
        return this
    };
    lp.setLocalName = function() {
        S(this, "setLocalName")
    };
    lp.setName = function() {
        S(this, "setName")
    };
    lp.setNamespace = function(a) {
        Q(a, No);
        S(this, "setNamespace")
    };
    fp.setSettings = function(a) {
        ja(a) || (a = Uo.defaultSettings());
        ga(a.ignoreComments) && (fp.ignoreComments = a.ignoreComments);
        ga(a.ignoreProcessingInstructions) && (fp.ignoreProcessingInstructions = a.ignoreProcessingInstructions);
        ga(a.ignoreWhitespace) && (fp.ignoreWhitespace = a.ignoreWhitespace);
        ha(a.prettyIndent) && (fp.prettyIndent = a.prettyIndent);
        ga(a.prettyPrinting) && (fp.prettyPrinting = a.prettyPrinting)
    };
    fp.settings = function() {
        return {
            ignoreComments: Uo.ignoreComments,
            ignoreProcessingInstructions: fp.ignoreProcessingInstructions,
            ignoreWhitespace: Uo.ignoreWhitespace,
            prettyIndent: Uo.prettyIndent,
            prettyPrinting: Uo.prettyPrinting
        }
    };
    lp.text = function() {
        var a = x(this).Ak([], "text");
        return hp(a)
    };
    lp.toXMLString = function() {
        return x(this).dd(!0)
    };
    var T = {
            tt: function(a) {
                La(wc, function(b, c) {
                    var d = T[b];
                    if (d.implementation) {
                        var e = (d.oc || a).prototype;
                        d.Kw = (e.ji || "") + "." + c;
                        e[c] = d.implementation
                    }
                })
            }
        },
        pp = function(a, b, c, d) {
            this.Kc = a.Kc;
            this.target = d;
            this.typeName = 0 == b ? null : a.Ke(b);
            this.traits = a.Vh([{
                slot: 1,
                kind: "specials",
                value: 0,
                type: b,
                name: c
            }])
        };
    pp.prototype.Ct = function(a) {
        return !this.typeName || Rn(a, this.Kc.xp(this.typeName))
    };
    var qp = function(a, b) {
        var c;
        if (b && a instanceof hg) c = a.value;
        else if (b && a instanceof RangeError) c = J(1023).value;
        else throw a;
        for (var d = 0; d < b.length; d++) {
            var e = b[d];
            if (e.Ct(c)) return e.target
        }
        throw a;
    };
    T[36] = function(a) {
        this.ea(a)
    };
    T[36].decode = function(a) {
        return [a.hr()]
    };
    T[47] = function(a) {
        this.ea(this.nd.doubles[a])
    };
    T[47].decode = Rm;
    T[39] = function() {
        this.ea("!1")
    };
    T[45] = function(a) {
        this.ea(this.nd.ints[a])
    };
    T[45].decode = Rm;
    T.pf = function(a) {
        this.za().O(T.pf, a)
    };
    T.pf.implementation = Po.prototype.Gp;
    T.pf.decode = Rm;
    T.pf.oc = Po;
    T[49] = T.pf;
    T[40] = function() {
        this.ea("Number.NaN")
    };
    T[32] = function() {
        this.ea(null)
    };
    T[37] = function(a) {
        this.ea(a)
    };
    T[37].decode = Rm;
    T[44] = function(a) {
        this.ea(za(this.nd.strings[a]))
    };
    T[44].decode = Rm;
    T[38] = function() {
        this.ea("!0")
    };
    T[46] = function(a) {
        this.ea(this.nd.uints[a])
    };
    T[46].decode = Rm;
    T[33] = function() {
        this.ea(void 0)
    };
    T[42] = function() {
        this.ea(this.stack(0))
    };
    T[43] = function() {
        var a = this.stack(0),
            b = this.stack(1);
        this.dk("t");
        this.append("t=" + a + ",");
        this.append(a + "=" + b + ",");
        this.append(b + "=t,");
        this.append("t=undefined;")
    };
    T[41] = function() {
        this.pop()
    };
    T[71] = function() {
        this.append("return;")
    };
    T[71].Na = 2;
    T[72] = function() {
        var a = this.pop();
        this.append("return ");
        this.Gr ? this.O(T.ud, a, this.Gr) : this.append(a + ";")
    };
    T[72].Na = 2;
    T[85] = function(a) {
        for (var b = [], c = []; 0 < a--;) c[a] = this.pop(), b[a] = this.pop();
        this.dk("t");
        this.append("t={},");
        for (a = 0; a < b.length; ++a) this.append("t[" + b[a] + "]=" + c[a] + ",");
        this.za().append("t,t=undefined;")
    };
    T[85].decode = Rm;
    T[86] = function(a) {
        this.ea(this.ce(a))
    };
    T[86].decode = Rm;
    T.$a = function(a) {
        return function() {
            var b = this.pop(),
                c = this.pop();
            this.ea(c + a + b)
        }
    };
    T.jh = function(a) {
        return function() {
            this.ea(a + this.pop())
        }
    };
    T[160] = T.$a("+");
    T[161] = T.$a("-");
    T[162] = T.$a("*");
    T[163] = T.$a("/");
    T[164] = T.$a("%");
    T[144] = T.jh("-");
    T[150] = T.jh("!");
    T[145] = function() {
        this.append("++" + this.stack(0) + ";")
    };
    T[147] = function() {
        this.append("--" + this.stack(0) + ";")
    };
    T.Zk = function(a) {
        return function() {
            var b = this.pop(),
                c = this.pop();
            this.ea("(" + c + "|0)" + a + "(" + b + "|0)|0")
        }
    };
    T[197] = T.Zk("+");
    T[198] = T.Zk("-");
    T[199] = T.Zk("*");
    T[196] = function() {
        this.ea("(-(" + this.pop() + "|0))|0")
    };
    T[192] = function() {
        this.ea("((" + this.pop() + "|0)+1)|0")
    };
    T[193] = function() {
        this.ea("((" + this.pop() + "|0)-1)|0")
    };
    T[151] = T.jh("~");
    T[169] = T.$a("|");
    T[170] = T.$a("^");
    T[168] = T.$a("&");
    T[165] = T.$a("<<");
    T[166] = T.$a(">>");
    T[167] = T.$a(">>>");
    T[118] = T.jh("!!");
    T[117] = T.jh("+");
    T[115] = function() {
        this.ea(this.pop() + "|0")
    };
    T[116] = function() {
        this.ea(this.pop() + ">>>0")
    };
    T[112] = function() {
        this.ea("String(" + this.pop() + ")")
    };
    T.Ki = function(a) {
        return function() {
            this.ea(this.register(a))
        }
    };
    T[208] = T.Ki(0);
    T[209] = T.Ki(1);
    T[210] = T.Ki(2);
    T[211] = T.Ki(3);
    T.Mi = function(a) {
        return function() {
            this.append(this.register(a) + "=" + this.pop() + ";")
        }
    };
    T[212] = T.Mi(0);
    T[213] = T.Mi(1);
    T[214] = T.Mi(2);
    T[215] = T.Mi(3);
    T.Be = function(a) {
        var b = function(b) {
            a.call(this, this.register(b))
        };
        b.decode = Rm;
        return b
    };
    T[98] = T.Be(function(a) {
        this.ea(a)
    });
    T[99] = T.Be(function(a) {
        this.append(a + "=" + this.pop() + ";")
    });
    T[146] = T.Be(function(a) {
        this.append("++" + a + ";")
    });
    T[148] = T.Be(function(a) {
        this.append("--" + a + ";")
    });
    T[194] = T.Be(function(a) {
        this.append(a + "=((" + a + "|0)+1)|0;")
    });
    T[195] = T.Be(function(a) {
        this.append(a + "=((" + a + "|0)-1)|0;")
    });
    T[8] = T.Be(function(a) {
        this.append(a + "=undefined;")
    });
    T[130] = function() {};
    T[133] = function() {
        var a = this.pop();
        this.ea(a + "==null?null:String(" + a + ")")
    };
    T[137] = function() {
        var a = this.pop();
        this.ea(a + "==null?null:" + a)
    };
    T[149] = function() {
        this.ea("typeof " + this.pop())
    };
    T[171] = T.$a("==");
    T[172] = T.$a("===");
    T[173] = T.$a("<");
    T[174] = T.$a("<=");
    T[175] = T.$a(">");
    T[176] = T.$a(">=");
    T[16] = function(a) {
        a = this.mg(a);
        0 > a ? this.append("return;") : this.append("j=" + a + ";break;")
    };
    T[16].Na = 2;
    T[16].decode = Tm;
    T.Hb = function(a) {
        var b = function(b) {
            this.append("if(").append(a.call(this)).append(")");
            b = this.mg(b);
            0 > b ? this.append("return;") : this.append("{j=" + b + ";break;}")
        };
        b.Na = 1;
        b.decode = Tm;
        return b
    };
    T[14] = T.Hb(function() {
        var a = this.pop(),
            b = this.pop();
        return "!(" + a + "<" + b + ")"
    });
    T[12] = T.Hb(function() {
        var a = this.pop();
        return "!(" + this.pop() + "<" + a + ")"
    });
    T[15] = T.Hb(function() {
        var a = this.pop(),
            b = this.pop();
        return "!(" + a + "<=" + b + ")"
    });
    T[19] = T.Hb(function() {
        var a = this.pop();
        return this.pop() + "==" + a
    });
    T[20] = T.Hb(function() {
        var a = this.pop();
        return this.pop() + "!=" + a
    });
    T[25] = T.Hb(function() {
        var a = this.pop();
        return this.pop() + "===" + a
    });
    T[26] = T.Hb(function() {
        var a = this.pop();
        return this.pop() + "!==" + a
    });
    T[13] = T.Hb(function() {
        var a = this.pop();
        return "!(" + this.pop() + "<=" + a + ")"
    });
    T[18] = T.Hb(function() {
        return "!" + this.pop()
    });
    T[23] = T.Hb(function() {
        var a = this.pop(),
            b = this.pop();
        return a + "<" + b
    });
    T[21] = T.Hb(function() {
        var a = this.pop();
        return this.pop() + "<" + a
    });
    T[24] = T.Hb(function() {
        var a = this.pop(),
            b = this.pop();
        return a + "<=" + b
    });
    T[22] = T.Hb(function() {
        var a = this.pop();
        return this.pop() + "<=" + a
    });
    T[17] = T.Hb(function() {
        return this.pop()
    });
    T[27] = function(a, b) {
        var c = this.pop(),
            d = this.mg(a);
        if (2 == arguments.length) {
            var e = this.mg(b);
            this.append("j=" + c + "?" + d + ":" + e)
        } else {
            this.append("j=[");
            for (e = 1; e < arguments.length; ++e) 1 < e && this.append(","), this.append(String(this.mg(arguments[e])));
            this.append("][" + c + "],j=j===undefined?" + d + ":j")
        }
        this.append(";break;")
    };
    T[27].decode = function(a, b, c) {
        var d = [],
            e = function() {
                var e = a.gr() + b;
                c[e] = !0;
                d.push(e)
            };
        e();
        for (var f = a.lg() + 1; 0 < f--;) e();
        return d
    };
    T[27].Na = 2;
    T[29] = function() {
        this.Sw()
    };
    T.Ao = function(a) {
        var b = function() {
            var a = this.pop(),
                d = this.scope();
            this.mt().append(d).O(b, a)
        };
        b.implementation = a;
        b.oc = sn;
        return b
    };
    T[48] = T.Ao(sn.prototype.cr);
    T[28] = T.Ao(sn.prototype.Zw);
    T.kf = function(a) {
        this.za().append(this.scope(a)).O(T.kf)
    };
    T.kf.implementation = sn.prototype.rv;
    T.kf.oc = sn;
    T.kf.decode = function(a) {
        return [a.he()]
    };
    T[101] = T.kf;
    T.Jg = function() {
        this.za().append(this.scope()).O(T.Jg)
    };
    T.Jg.implementation = sn.prototype.Zu;
    T.Jg.oc = sn;
    T[100] = T.Jg;
    T.ne = function(a) {
        a = this.ce(a);
        var b = this.pop(),
            c = this.pop();
        this.za();
        this.O(T.ne, b, c, a)
    };
    T.ne.implementation = hn;
    T.ne.decode = Rm;
    T.ne.Na = 1;
    T[65] = T.ne;
    T.oe = function(a, b) {
        var c = this.ce(b),
            d = this.ee(a),
            e = this.pop();
        this.za().append(this.scope()).O(T.oe, e, d, c)
    };
    T.oe.implementation = sn.prototype.yt;
    T.oe.Na = 1;
    T.oe.decode = Sm;
    T.oe.oc = sn;
    T[76] = T.oe;
    T.Tk = function(a, b) {
        var c = function(a, e) {
            var f = this.ce(e),
                h = this.ee(a),
                k = this.pop();
            b && this.za();
            this.O(c, k, h, f)
        };
        c.Na = 1;
        c.decode = Sm;
        c.implementation = a;
        return c
    };
    T[70] = T.Tk(jn, !0);
    T[79] = T.Tk(jn, !1);
    T.Wk = function(a) {
        var b = function(a) {
            a = this.ee(a);
            this.za().append(this.scope());
            this.O(b, a)
        };
        b.decode = Rm;
        b.implementation = a;
        b.oc = sn;
        return b
    };
    T[94] = T.Wk(sn.prototype.find);
    T[93] = T.Wk(sn.prototype.jp);
    T[96] = T.Wk(sn.prototype.av);
    T.Bo = function(a) {
        var b = function(a) {
            var d = this.pop();
            a = this.ee(a);
            var e = this.pop();
            this.O(b, e, a, d)
        };
        b.decode = Rm;
        b.implementation = a;
        return b
    };
    T[97] = T.Bo(mn);
    T[104] = T.Bo(mn);
    T.Xk = function(a) {
        var b = function(a) {
            a = this.ee(a);
            var d = this.pop();
            this.za().O(b, d, a)
        };
        b.decode = Rm;
        b.implementation = a;
        return b
    };
    T[102] = T.Xk(ln);
    T[89] = T.Xk(function(a, b) {
        a = gn(a);
        var c = a.__swiffy_proxy;
        if (c && c.nj) return c.nj.call(a, b.cd());
        throw J(1016);
    });
    T[106] = T.Xk(function(a, b) {
        a = gn(a);
        var c = a.__swiffy_proxy;
        if (c && c.Bf) return c.Bf.call(a, b.cd());
        c = b.fb(a);
        return l(c) ? delete a[c] : !1
    });
    T.qf = function() {
        this.O(T.qf, this.pop())
    };
    T.qf.implementation = function(a) {
        throw new hg(a);
    };
    T.qf.Na = 2;
    T[3] = T.qf;
    T.mf = function(a) {
        this.za().append("handler" + a);
        this.O(T.mf)
    };
    T.mf.implementation = function() {
        return this.traits.Ni({})
    };
    T.mf.oc = pp;
    T.mf.decode = Rm;
    T[90] = T.mf;
    T.mi = function() {
        this.O(T.mi, this.stack(0))
    };
    T.mi.implementation = function(a) {
        Ho(a);
        if (!Rn(a, fp) && !Rn(a, ip)) throw J(1123, $m(a).Df());
    };
    T[120] = T.mi;
    T.jf = function(a) {
        this.O(T.jf, za(this.nd.strings[a]))
    };
    T.jf.implementation = function(a) {
        ig = String(a)
    };
    T.jf.decode = Rm;
    T[6] = T.jf;
    T[7] = function() {
        this.O(T.jf, this.pop())
    };
    T.Co = function(a) {
        var b = function() {
            var a = this.stack(0);
            this.append(a + "=").O(b, a)
        };
        b.implementation = a;
        return b
    };
    T[114] = T.Co(Bd);
    T[113] = T.Co(Ad);
    T.lf = function(a) {
        var b = this.stack(0);
        this.append(b + "=");
        this.Pg(T.lf, b);
        this.append("[" + a + "];")
    };
    T.lf.implementation = function(a) {
        gn(a);
        return a.__swiffy_slots
    };
    T.lf.decode = Rm;
    T[108] = T.lf;
    T[109] = function(a) {
        var b = this.pop(),
            c = this.pop();
        this.Pg(T.lf, c);
        this.append("[" + a + "]=" + b + ";")
    };
    T[109].decode = Rm;
    T.pi = function() {
        var a = this.pop(),
            b = this.pop();
        this.za().O(T.pi, b, a)
    };
    T.pi.implementation = function(a, b) {
        if (b == On) return null != a;
        if (!ia(b)) throw J(1040);
        return Object(a) instanceof b
    };
    T[177] = T.pi;
    T.oi = function() {
        var a = this.pop(),
            b = this.pop();
        this.za().O(T.oi, b, a)
    };
    T.oi.implementation = function(a, b) {
        b = gn(b);
        return kn(b, new Zm("", a, !1))
    };
    T[180] = T.oi;
    T.nf = function(a) {
        var b = this.pop(),
            c = this.scope();
        this.za().O(T.nf, "pool", c, a, b)
    };
    T.nf.implementation = function(a, b, c, d) {
        return this.cu(a, b, c, d)
    };
    T.nf.decode = Rm;
    T.nf.oc = So;
    T[88] = T.nf;
    T.of = function(a) {
        this.za().O(T.of, this.scope(), a)
    };
    T.of.implementation = function(a, b) {
        return this.Je(b, "MethodInfo-" + b)(null, a)
    };
    T.of.decode = Rm;
    T.of.oc = Po;
    T[64] = T.of;
    T.pe = function(a) {
        a = this.ce(a);
        var b = this.pop();
        this.za().O(T.pe, b, a)
    };
    T.pe.implementation = function(a, b) {
        return this.hq(a, b)
    };
    T.pe.decode = Rm;
    T.pe.Na = 1;
    T[66] = T.pe;
    T[74] = T.Tk(function(a, b, c) {
        a = gn(a);
        b = b.fb(a);
        return this.hq(a[b], c)
    }, !0);
    T.zt = function(a, b, c, d) {
        b = gn(b);
        var e = En(a).traits,
            f = c.fb(e);
        if (l(f)) return a = e[f].callee(b, f), hn(b, a, d, f);
        f = c.fb(a.prototype);
        if (l(f)) return a = a.prototype[f], hn(b, a, d, f);
        throw J(1069, c.Ja(), $m(a).localName);
    };
    T.yo = function(a) {
        var b = function(c, d) {
            var e = this.ce(d),
                f = this.ee(c),
                h = this.pop();
            a && this.za();
            this.O(b, "base", h, f, e)
        };
        b.Na = 1;
        b.decode = Sm;
        b.implementation = T.zt;
        return b
    };
    T[69] = T.yo(!0);
    T[78] = T.yo(!1);
    T.Mg = function(a) {
        var b = this.pop();
        a = this.ee(a);
        var c = this.pop();
        this.O(T.Mg, "base", c, a, b)
    };
    T.Mg.decode = Rm;
    T.Mg.implementation = function(a, b, c, d) {
        b = gn(b);
        var e = En(a).traits,
            f = c.fb(e);
        if (l(f)) e[f].set(b, f, d);
        else {
            f = c.fb(a.prototype);
            if (l(f) && (e = wg(a.prototype, f)) && e.set) {
                e.set.call(b, d);
                return
            }
            throw J(1056, c.Ja(), $m(a).localName);
        }
    };
    T[5] = T.Mg;
    T.Kg = function(a) {
        a = this.ee(a);
        var b = this.pop();
        this.za().O(T.Kg, "base", b, a)
    };
    T.Kg.decode = Rm;
    T.Kg.implementation = function(a, b, c) {
        b = gn(b);
        var d = En(a).traits,
            e = c.fb(d);
        if (l(e)) return d[e].get(b, e);
        e = c.fb(a.prototype);
        if (l(e) && (d = wg(a.prototype, e)) && d.get) return d.get.call(b);
        throw J(1069, c.Ja(), $m(a).localName);
    };
    T[4] = T.Kg;
    T.hf = function(a) {
        a = this.ce(a);
        var b = this.pop();
        this.O(T.hf, "base", b, a)
    };
    T.hf.implementation = function(a, b, c) {
        b = gn(b);
		//console.log('RQ CHECK >>>> '+(b instanceof Ht));
        a.__swiffy_constructor.apply(b, c)
		if(b instanceof Ht){
            //console.log('<<<< RQ FOUND >>>> ');
            //window.swiffyAPI = b;
            wk.prototype.api = b;
        }
    };
    T.hf.decode = Rm;
    T.hf.Na = 1;
    T[73] = T.hf;
    T.Ig = function(a) {
        a = this.ce(a);
        var b = this.pop();
        this.za();
        this.O(T.Ig, b, a)
    };
    T.Ig.implementation = function(a, b) {
        var c = a && a.__swiffy_type_apply;
        if (!c) throw J(1127);
        return c.call(a, this.wb, b)
    };
    T.Ig.decode = Rm;
    T[83] = T.Ig;
    T.ri = function() {
        this.za();
        this.O(T.ri, "traits")
    };
    T.ri.implementation = function(a) {
        return a.Ni({})
    };
    T[87] = T.ri;
    T.ud = function(a) {
        var b = this.stack(0);
        this.append(b + "=");
        this.O(T.ud, b, a)
    };
    T.ud.implementation = function(a, b) {
        return this.ko(a, b)
    };
    T.ud.decode = Rm;
    T.ud.oc = Po;
    T[128] = T.ud;
    T.ni = function() {
        this.O(T.ni, this.stack(0))
    };
    T.ni.implementation = Ho;
    T[119] = T.ni;
    T.Do = function(a) {
        var b = function(a) {
            var d = this.stack(0);
            this.append(d + "=");
            this.O(b, d, a)
        };
        b.decode = Rm;
        b.implementation = function(b, d) {
            return a(b, this.Rp(d))
        };
        b.oc = Po;
        return b
    };
    T[134] = T.Do(jo);
    T[178] = T.Do(ko);
    T.Eo = function(a) {
        var b = function() {
            var a = this.pop(),
                d = this.pop();
            this.za();
            this.O(b, d, a)
        };
        b.implementation = a;
        return b
    };
    T[135] = T.Eo(jo);
    T[179] = T.Eo(ko);
    T.Vk = function(a) {
        var b = function() {
            var a = this.pop(),
                d = this.pop();
            this.za().O(b, d, a)
        };
        b.implementation = a;
        return b
    };
    T.sk = T.Vk(function(a, b) {
        a = gn(a);
        var c = a.__swiffy_proxy;
        if (c && c.Xe) b = c.Xe.call(a, b);
        else {
            c = Object.keys(a);
            do
                if (++b > c.length) return 0;
            while (cd(c[b - 1]))
        }
        return b
    });
    T[31] = T.sk;
    T[30] = T.Vk(function(a, b) {
        a = gn(a);
        var c = a.__swiffy_proxy;
        return c && c.eg ? c.eg.call(a, b) : Object.keys(a)[b - 1]
    });
    T[35] = T.Vk(function(a, b) {
        a = gn(a);
        var c = a.__swiffy_proxy;
        return c && c.fg ? c.fg.call(a, b) : a[Object.keys(a)[b - 1]]
    });
    T.Lg = function(a, b) {
        this.append("while(" + this.register(a) + "&&!(" + this.register(b) + "=");
        this.Pg(T.sk, this.register(a), this.register(b)).append("))");
        this.append(this.register(a) + "=").O(T.Lg, this.register(a));
        this.ea("!!" + this.register(b))
    };
    T.Lg.implementation = function(a) {
        var b = a.__swiffy_proxy;
        return b && b.Xe ? null : Object.getPrototypeOf(a)
    };
    T.Lg.decode = Sm;
    T[50] = T.Lg;
    T.gh = function(a) {
        var b = function() {
            var a = this.pop();
            this.za().O(b, a)
        };
        b.implementation = a;
        return b
    };
    T.hh = function(a) {
        var b = function() {
            var a = this.pop(),
                d = this.pop();
            this.za().O(b, a, d)
        };
        b.implementation = a;
        return b
    };
    T[53] = T.gh(function(a) {
        return this.Nc(a, 1).getUint8(a)
    });
    T[54] = T.gh(function(a) {
        return this.Nc(a, 2).getUint16(a, !0)
    });
    T[55] = T.gh(function(a) {
        return this.Nc(a, 4).getInt32(a, !0)
    });
    T[56] = T.gh(function(a) {
        return this.Nc(a, 4).getFloat32(a, !0)
    });
    T[57] = T.gh(function(a) {
        return this.Nc(a, 8).getFloat64(a, !0)
    });
    T[58] = T.hh(function(a, b) {
        this.Nc(a, 1).setUint8(a, b)
    });
    T[59] = T.hh(function(a, b) {
        this.Nc(a, 2).setUint16(a, b, !0)
    });
    T[60] = T.hh(function(a, b) {
        this.Nc(a, 4).setUint32(a, b, !0)
    });
    T[61] = T.hh(function(a, b) {
        this.Nc(a, 4).setFloat32(a, b, !0)
    });
    T[62] = T.hh(function(a, b) {
        this.Nc(a, 8).setFloat64(a, b, !0)
    });
    T[80] = function() {
        this.ea(this.pop() + "<<31>>31")
    };
    T[81] = function() {
        this.ea(this.pop() + "<<24>>24")
    };
    T[82] = function() {
        this.ea(this.pop() + "<<16>>16")
    };
    T.ih = function(a) {
        var b = function() {};
        b.decode = a;
        return b
    };
    T[2] = T.ih();
    T[9] = T.ih();
    T[239] = T.ih(function(a) {
        return [a.he(), a.lg(), a.he(), a.lg()]
    });
    T[241] = T.ih(Rm);
    T[240] = T.ih(Rm);
    T.Dd = function(a, b, c) {
        var d = function() {};
        d.implementation = a;
        d.oc = c;
        return T[b] = d
    };
    T.Fn = T.Dd(Po.prototype.Ke, 256, Po);
    T.Gn = T.Dd(function(a, b, c) {
        return new pp(this, a, b, c)
    }, 258, Po);
    T.Hn = T.Dd(function(a, b) {
        var c = this;
        return function() {
            kg(55, b);
            var d = ig;
            ig = "";
            var e = r;
            r = c.ha;
            try {
                var f = a.apply(this, arguments);
                lg();
                return f
            } catch (h) {
                mg(h, !!lg())
            } finally {
                ig = d, r = e
            }
        }
    }, 257);
    T.tk = T.Dd(function(a) {
        for (var b, c = function() {
                b = arguments
            }, d, e = 0;;) try {
            return a(c, e, d)
        } catch (f) {
            e = qp(f, b), d = f.value
        }
    }, 259);
    T.Dn = T.Dd(function(a, b, c, d, e) {
        return a.length > b ? this.ko(a[b], c) : this.Er(d, e)
    }, 260, Po);
    T.En = T.Dd(sn.prototype.Jt, 261, sn);
    T.Cn = T.Dd(function() {
        ++ng
    }, 262);
    T.Rs = T.Dd(function() {}, 263);
    var Ro = function(a, b, c) {
        this.source = "";
        this.lq = a;
        this.Gr = b;
        this.nd = c;
        this.qk = {};
        this.bp = [];
        this.tg = this.Ma = 0
    };
    m(Ro, Vi);
    g = Ro.prototype;
    g.mg = function(a, b) {
        var c = this.lq[a];
        return this.Cm(c, b) ? c.yi : -1
    };
    g.Cm = function(a, b) {
        return a && l(a.yi) ? (this.bp.push({
            kq: a,
            stack: l(b) ? b : this.Ma,
            ox: this.tg
        }), !0) : !1
    };
    g.Aw = function(a) {
        return String(a)
    };
    g.Qe = function(a) {
        return "handler" + a
    };
    g.register = function(a) {
        return "r" + a
    };
    g.stack = function(a) {
        return "s" + (this.Ma - a - 1)
    };
    g.push = function() {
        return this.dk("s" + this.Ma++)
    };
    g.pop = function() {
        return "s" + --this.Ma
    };
    g.ce = function(a) {
        for (var b = "[", c = this.Ma -= a; 0 < a; ++c, --a) b += "s" + c, 1 < a && (b += ",");
        return b + "]"
    };
    g.ee = function(a) {
        var b = this.nd.multinames[a];
        return this.wj(T.Fn) + "(" + this.Aw(a) + b.compile(this) + ")"
    };
    g.za = function() {
        this.append(this.push() + "=");
        return this
    };
    g.ea = function(a) {
        this.append(this.push() + "=" + a + ";");
        return this
    };
    g.scope = function(a) {
        return l(a) ? "scope" + a : this.tg ? "scope" + (this.tg - 1) : "scope"
    };
    g.Sw = function() {
        this.tg--
    };
    g.mt = function() {
        this.append(this.dk("scope" + this.tg++) + "=");
        return this
    };
    g.kt = function(a) {
        for (var b = 0; b < a.length; ++b) {
            var c = a[b],
                d = this.mg(c.target, 1);
            this.append("var " + this.Qe(b) + "=");
            this.O(T.Gn, c.excType, c.varName, d)
        }
    };
    g.jt = function(a) {
        var b = a.params || [],
            c = a.optionals || [],
            d = b.length - c.length;
        this.append("function(");
        for (var e = 0; e < b.length;) 0 < e && this.append(","), this.append(this.register(++e));
        this.append("){");
        for (e = 0; e < b.length; ++e) {
            var f = b[e];
            if (e >= d) {
                var h = c[e - d];
                this.append(this.register(e + 1) + "=");
                this.O(T.Dn, "arguments", e, f, this.Gu(h.kind), h.value)
            } else f && (this.append(this.register(e + 1) + "="), this.O(T.ud, this.register(e + 1), f))
        }
        this.append("var " + this.register(0) + "=scope").Pg(T.En, "this");
        for (null != a.arguments &&
            this.append("," + this.register(++e) + "=Array.prototype.slice.call(arguments," + a.arguments + ")"); ++e < a.locals;) this.append("," + this.register(e));
        this.append(";")
    };
    g.dk = function(a) {
        this.qk[a] = !0;
        return a
    };
    g.Xw = function(a) {
        this.qk[a] = !1
    };
    g.nt = function() {
        var a = !1,
            b;
        for (b in this.qk) this.qk[b] && (this.append((a ? ", " : "var ") + b), a = !0);
        a && this.append(";")
    };
    g.px = function(a) {
        this.append("katch(");
        for (var b = 0; b < a.length; ++b) 0 < b && this.append(","), this.append(this.Qe(a[b]));
        this.append(");")
    };
    g.Lt = function(a) {
        this.Ma = a.stack;
        this.tg = a.ox;
        var b = 0;
        for (a = a.kq; a;) {
            b++;
            a.sj && this.px(a.sj);
            var c = a.wj;
            c.Na && (b = 0);
            c.apply(this, a.args);
            a = a.next;
            if (this.Cm(a)) break
        }
        return this.Es()
    };
    g.it = function(a) {
        var b = [],
            c = this.Es();
        this.Cm(this.lq[0]);
        for (var d, e = 0; d = this.bp.pop(); e++) {
            var f = d.kq.yi;
            b[f] || (b[f] = this.Lt(d))
        }
        this.append(c);
        c = 1 < e;
        if (a = !!a.length) this.append("return ").Bk(T.tk), this.append("(function(katch,j,s0){"), this.Xw("s0");
        this.nt();
        c && (this.append(a ? "for(;;){" : "for(var j=0;;){"), this.O(T.Cn), this.append("switch(j){"));
        for (d = 0; d < b.length; ++d) b[d] && (c && this.append("case " + d + ":"), this.append(b[d]));
        c && this.append("default:return;}}");
        a && this.append("});")
    };
    P(function() {
        R(this, "description", "String", "");
        R(this, "forceSimple", "Boolean", !1);
        R(this, "name", "String", "");
        R(this, "noAutoLabeling", "Boolean", !1);
        R(this, "shortcut", "String", "");
        R(this, "silent", "Boolean", !1)
    }, "flash.accessibility.AccessibilityProperties");
    var rp = P(function() {}, "flash.display.BitmapDataChannel");
    Object.defineProperties(rp, {
        ALPHA: {
            value: 8
        },
        BLUE: {
            value: 4
        },
        GREEN: {
            value: 2
        },
        RED: {
            value: 1
        }
    });
    var sp = P(function() {}, "flash.display.BlendMode");
    mo(sp, uc);
    var tp = P(function() {}, "flash.display.CapsStyle");
    O(tp, "NONE", "none");
    O(tp, "ROUND", "round");
    O(tp, "SQUARE", "square");
    var up = P(function() {}, "flash.display.GradientType");
    O(up, "LINEAR", "linear");
    O(up, "RADIAL", "radial");
    var vp = P(fo(1001), "flash.display.IBitmapDrawable");
    vp.m = vp;
    Hn(vp.m);
    var wp = P(function() {}, "flash.display.InterpolationMethod");
    O(wp, "RGB", "rgb");
    O(wp, "LINEAR_RGB", "linearRGB");
    var xp = P(function() {}, "flash.display.JointStyle");
    O(xp, "BEVEL", "bevel");
    O(xp, "MITER", "miter");
    O(xp, "ROUND", "round");
    var yp = P(function() {}, "flash.display.LineScaleMode");
    O(yp, "HORIZONTAL", "horizontal");
    O(yp, "NONE", "none");
    O(yp, "NORMAL", "normal");
    O(yp, "VERTICAL", "vertical");
    var zp = P(function() {}, "flash.display.PixelSnapping");
    mo(zp, ["always", "auto", "never"]);
    var Ap = function(a, b, c) {
            Vd(this, {
                name: String(a),
                numFrames: b | 0,
                labels: Q(c, Array)
            })
        },
        Bp = P(Ap, "flash.display.Scene");
    M(Bp, "name", function() {
        return x(this).name
    });
    M(Bp, "numFrames", function() {
        return x(this).numFrames
    });
    M(Bp, "labels", function() {
        return x(this).labels
    });
    var Cp = P(function() {}, "flash.display.SpreadMethod");
    O(Cp, "PAD", "pad");
    O(Cp, "REFLECT", "reflect");
    O(Cp, "REPEAT", "repeat");
    var Dp = P(function() {}, "flash.display.StageAlign");
    O(Dp, "BOTTOM", "B");
    O(Dp, "BOTTOM_LEFT", "BL");
    O(Dp, "BOTTOM_RIGHT", "BR");
    O(Dp, "LEFT", "L");
    O(Dp, "RIGHT", "R");
    O(Dp, "TOP", "T");
    O(Dp, "TOP_LEFT", "TL");
    O(Dp, "TOP_RIGHT", "TR");
    var Ep = P(function() {}, "flash.display.StageDisplayState");
    mo(Ep, ["fullScreen", "fullScreenInteractive", "normal"]);
    var Fp = P(function() {}, "flash.display.StageQuality");
    mo(Fp, ["best", "high", "low", "medium"], {
        HIGH_16X16: "16x16",
        HIGH_16X16_LINEAR: "16x16linear",
        HIGH_8X8: "8x8",
        HIGH_8X8_LINEAR: "8x8linear"
    });
    var Gp = P(function() {}, "flash.display.StageScaleMode");
    O(Gp, "EXACT_FIT", "exactFit");
    O(Gp, "NO_BORDER", "noBorder");
    O(Gp, "NO_SCALE", "noScale");
    O(Gp, "SHOW_ALL", "showAll");
    var Hp = function(a, b, c) {
            a = String(a);
            Vd(this, {
                type: a,
                bubbles: !!b,
                cancelable: !!c,
                Ei: !1,
                target: null,
                currentTarget: null,
                stopPropagation: !1,
                ys: !1,
                defaultPrevented: !1,
                en: !1
            })
        },
        Ip = P(Hp, "flash.events.Event");
    M(Ip, "bubbles", function() {
        return x(this).bubbles
    });
    M(Ip, "cancelable", function() {
        return x(this).cancelable
    });
    M(Ip, "currentTarget", function() {
        return x(this).currentTarget
    });
    M(Ip, "eventPhase", function() {
        var a = x(this);
        return a.currentTarget == a.target ? 2 : a.Ei ? 1 : 3
    });
    M(Ip, "target", function() {
        return x(this).target
    });
    M(Ip, "type", function() {
        return x(this).type
    });
    L(Ip, "isDefaultPrevented", function() {
        return x(this).defaultPrevented
    });
    L(Ip, "preventDefault", function() {
        var a = x(this);
        a.cancelable && (a.defaultPrevented = !0)
    });
    L(Ip, "stopPropagation", function() {
        x(this).stopPropagation = !0
    });
    L(Ip, "stopImmediatePropagation", function() {
        var a = x(this);
        a.ys = !0;
        a.stopPropagation = !0
    });
    L(Ip, "formatToString", function() {
        for (var a = "[" + $m(this).localName, b = 0; b < arguments.length; b++) {
            var c = this[arguments[b]];
            ha(c) ? c = Math.round(100 * c) / 100 : fa(c) && (c = '"' + c + '"');
            a += " " + arguments[b] + "=" + c
        }
        return a + "]"
    });
    L(Ip, "clone", function() {
        return bo.call(Ip, this.type, this.bubbles, this.cancelable)
    });
    L(Ip, "toString", function() {
        return this.formatToString("type", "bubbles", "cancelable", "eventPhase")
    });
    mo(Ip, "activate added addedToStage cancel change channelMessage channelState clear close closing complete connect context3DCreate copy cut deactivate displaying enterFrame exitFrame exiting frameConstructed frameLabel htmlBoundsChange htmlDOMInitialize htmlRender id3 init locationChange mouseLeave networkChange open paste preparing removed removedFromStage render resize scroll select selectAll soundComplete standardErrorClose standardInputClose standardOutputClose suspend tabChildrenChange tabEnabledChange tabIndexChange textInteractionModeChange textureReady unload userIdle userPresent videoFrame workerState".split(" "), {
        FULLSCREEN: "fullScreen"
    });
    var Jp = function(a, b, c, d) {
            Hp.call(this, a, b, c);
            this.activating = d
        },
        Kp = P(Jp, "flash.events.ActivityEvent", Hp);
    M(Kp, "activating", function() {
        return x(this).dt
    });
    N(Kp, "activating", function(a) {
        x(this).dt = !!a
    });
    L(Kp, "clone", function() {
        return bo.call(Ip, this.type, this.bubbles, this.cancelable, this.activating)
    });
    L(Kp, "toString", function() {
        return this.formatToString("type", "bubbles", "cancelable", "eventPhase", "status", "activating")
    });
    Object.defineProperty(Kp, "ACTIVITY", {
        value: "activity"
    });
    var Lp = function(a, b, c, d, e) {
            Hp.call(this, a, b, c);
            this.contextMenuOwner = e;
            this.isMouseTargetInaccessible = !1;
            this.mouseTarget = d
        },
        Mp = P(Lp, "flash.events.ContextMenuEvent", Hp);
    M(Ip, "contextMenuOwner", function() {
        return x(this).Xt
    });
    N(Ip, "contextMenuOwner", function(a) {
        x(this).Xt = Q(a, Np)
    });
    M(Ip, "isMouseTargetInaccessible", function() {
        return x(this).Rv
    });
    N(Ip, "isMouseTargetInaccessible", function(a) {
        x(this).Rv = !!a
    });
    M(Ip, "mouseTarget", function() {
        return x(this).tw
    });
    N(Ip, "mouseTarget", function(a) {
        x(this).tw = Q(a, Np)
    });
    L(Mp, "clone", function() {
        return bo.call(Lp, this.type, this.bubbles, this.cancelable, this.mouseTarget, this.contextMenuOwner)
    });
    Object.defineProperty(Mp, "MENU_ITEM_SELECT", {
        value: "menuItemSelect"
    });
    Object.defineProperty(Mp, "MENU_SELECT", {
        value: "menuSelect"
    });
    var Op = P(function(a, b, c, d, e, f) {
        Hp.call(this, a, b, c);
        this.relatedObject = l(d) ? d : null;
        this.shiftKey = l(e) ? e : !1;
        this.keyCode = l(f) ? f : 0;
        this.isRelatedObjectInaccessible = !1
    }, "flash.events.FocusEvent", Hp);
    M(Op, "isRelatedObjectInaccessible", function() {
        return x(this).Yv
    });
    M(Op, "keyCode", function() {
        return x(this).keyCode
    });
    M(Op, "relatedObject", function() {
        return x(this).ng
    });
    M(Op, "shiftKey", function() {
        return x(this).shiftKey
    });
    N(Op, "isRelatedObjectInaccessible", function(a) {
        x(this).Yv = !!a
    });
    N(Op, "keyCode", function(a) {
        x(this).keyCode = a >>> 0
    });
    N(Op, "relatedObject", function(a) {
        x(this).ng = Q(a, Np)
    });
    N(Op, "shiftKey", function(a) {
        x(this).shiftKey = !!a
    });
    mo(Op, ["focusIn", "focusOut", "mouseFocusChange"]);
    var Pp = P(function(a, b, c, d, e) {
        Jp.call(this, a, b, c);
        a = x(this);
        a.fullScreen = !!d;
        a.Jv = !!e
    }, "flash.events.FullScreenEvent", Jp);
    M(Pp, "fullScreen", function() {
        return x(this).fullScreen
    });
    M(Pp, "interactive", function() {
        return x(this).Jv
    });
    L(Pp, "clone", function() {
        return bo.call(Pp, this.type, this.bubbles, this.cancelable, this.activating, this.fullScreen, this.interactive)
    });
    L(Pp, "toString", function() {
        return this.formatToString("type", "bubbles", "cancelable", "eventPhase", "activating", "fullScreen", "interactive")
    });
    Object.defineProperty(Pp, "FULL_SCREEN", {
        value: "fullScreen"
    });
    Object.defineProperty(Pp, "FULL_SCREEN_INTERACTIVE_ACCEPTED", {
        value: "fullScreenInteractiveAccepted"
    });
    var Qp = function(a, b, c, d) {
            Hp.call(this, a, b, c);
            x(this).status = +z(d, 0);
            this.responseURL = null
        },
        Rp = P(Qp, "flash.events.HTTPStatusEvent", Hp);
    M(Rp, "status", function() {
        return x(this).status
    });
    L(Rp, "clone", function() {
        return bo.call(Rp, this.type, this.bubbles, this.cancelable, this.status)
    });
    L(Rp, "toString", function() {
        return this.formatToString("type", "bubbles", "cancelable", "eventPhase", "status", "responseURL")
    });
    mo(Rp, ["httpResponseStatus", "httpStatus"]);
    var Sp = P(fo(1001), "flash.events.IEventDispatcher");
    Sp.m = Sp;
    Sp.prototype.addEventListener = function() {};
    Sp.prototype.dispatchEvent = function() {};
    Sp.prototype.hasEventListener = function() {};
    Sp.prototype.removeEventListener = function() {};
    Sp.prototype.willTrigger = function() {};
    Hn(Sp.m);
    var Tp = function(a, b, c) {
            this.listener = a;
            this.rn = b;
            this.Vw = c
        },
        U = function(a) {
            a = Q(a, Sp.m);
            Vd(this, {
                target: a || this
            })
        };
    P(U, "flash.events.EventDispatcher", void 0, [Sp]);
    var Up = {},
        Vp = function(a, b) {
            for (var c = 1; c < arguments.length; ++c) Up[arguments[c]] = a
        };
    Vp(U, "activate", "deactivate");
    var Wp = function(a, b) {
            var c = Up[a];
            return !!c && b instanceof c
        },
        Yp = function(a) {
            a = new Hp(a, !1, !1);
            x(a).en = !0;
            Xp(this, a)
        };
    U.prototype.addEventListener = function(a, b, c, d) {
        this.__swiffy_listeners || Object.defineProperty(this, "__swiffy_listeners", {
            value: {}
        });
        var e = this.__swiffy_listeners,
            f = e[a];
        f || (e[a] = f = []);
        d |= 0;
        c = !!c;
        for (e = 0; e < f.length; ++e)
            if (f[e].listener == b && f[e].rn == c) return;
        0 == f.length && Wp(a, this) && r.cx(a, this);
        for (e = f.length; 0 < e && d > f[e - 1].Vw; --e);
        f.splice(e, 0, new Tp(b, c, d))
    };
    var Xp = function(a, b) {
        var c = a.__swiffy_d;
        if ((c = c instanceof Wh ? c : null) && c.Ud()) return !1;
        var d = x(b),
            e = x(a);
        d.target = e && e.target || a;
        e = [];
        if (c && !d.en) {
            for (; c = c.getParent();) e.push(c.o);
            d.Ei = !0;
            for (c = e.length - 1; 0 <= c && !d.stopPropagation; --c) {
                var f = e[c];
                d.currentTarget = f;
                Zp(f, b)
            }
        }
        d.Ei = !1;
        d.currentTarget = d.target;
        Zp(a, b);
        if (d.bubbles)
            for (c = 0; c < e.length && !d.stopPropagation; ++c) f = e[c], d.currentTarget = f, Zp(f, b);
        return !d.defaultPrevented
    };
    U.prototype.dispatchEvent = function(a) {
        a = Q(a, Ip);
        gn(a);
        a.target && (a = a.clone());
        return Xp(this, a)
    };
    var Zp = function(a, b) {
        var c = a.__swiffy_listeners,
            d = x(b);
        if (c && c[d.type]){
            for (var c = c[d.type], e = 0; e < c.length && !d.ys; e++){
                if (c[e].rn == d.Ei) try {
                    c[e].listener.call(null, b)
                } catch (f) {
                    mg(f, !1)
                }
			}
			/* Start - Vincent */
			if(a.hasOwnProperty('aFrameMap') && d.type === 'addedToStage'){a.addedToStage = true;}
			/* End - Vincent */
		}
    };
    U.prototype.removeEventListener = function(a, b, c) {
        var d = this.__swiffy_listeners;
        if (d && d[a] && d[a].length) {
            d = d[a];
            c = !!c;
            for (var e = 0; e < d.length; e++) d[e].listener == b && d[e].rn == c && d.splice(e--, 1);
            0 == d.length && Wp(a, this) && r.Hs(a, this)
        }
    };
    U.prototype.hasEventListener = function(a) {
        var b = this.__swiffy_listeners;
        return !!b && !!b[a] && b[a].length
    };
    U.prototype.willTrigger = function(a) {
        var b = this;
        do
            if (b.hasEventListener(a)) return !0;
        while (b = b.parent);
        return !1
    };
    var $p = function(a, b) {
            U.call(this);
            var c = x(this);
            c.name = b;
            c.frame = a
        },
        aq = P($p, "flash.display.FrameLabel", U);
    M(aq, "frame", function() {
        return x(this).frame
    });
    M(aq, "name", function() {
        return x(this).name
    });
    var bq = function(a) {
            U.call(this, a);
            Object.defineProperty(this, "__swiffy_d", {
                value: new Ud(this)
            });
            O(this, "bytes", null);
            O(this, "childAllowsParent", !0);
            R(this, "childSandboxBridge", "Object", null);
            R(this, "isURLInaccessible", "Boolean", !1);
            O(this, "parentAllowsChild", !0);
            R(this, "parentSandboxBridge", "Object", null);
            O(this, "sameDomain", !1);
            O(this, "sharedEvents", new U);
            O(this, "uncaughtErrorEvents", null)
        },
        cq = eo(bq, "flash.display.LoaderInfo", {
            Sg: U,
            Sd: go
        }),
        dq = function(a) {
            a = a.__swiffy_d;
            a = a.content && a.content.__swiffy_d;
            if (!a) throw J(2099);
            return a
        },
        eq = function(a) {
            var b = a.__swiffy_d;
            a = dq(a);
            if ("application/x-shockwave-flash" != b.contentType) throw J(2098);
            return a
        };
    M(cq, "actionScriptVersion", function() {
        return eq(this).definition.as3 ? 3 : 2
    });
    Object.defineProperty(bq.prototype, "applicationDomain", {
        get: function() {
            var a = this.__swiffy_d;
            return a.Kc ? fq(a.Kc) : null
        }
    });
    Object.defineProperty(bq.prototype, "bytesLoaded", {
        get: function() {
            return this.__swiffy_d.fd
        }
    });
    Object.defineProperty(bq.prototype, "bytesTotal", {
        get: function() {
            return this.__swiffy_d.gd
        }
    });
    Object.defineProperty(bq.prototype, "content", {
        get: function() {
            return this.__swiffy_d.content
        }
    });
    Object.defineProperty(bq.prototype, "contentType", {
        get: function() {
            return this.__swiffy_d.contentType
        }
    });
    M(cq, "frameRate", function() {
        return eq(this).definition.frameRate
    });
    M(cq, "height", function() {
        return dq(this).S()
    });
    Object.defineProperty(bq.prototype, "loader", {
        get: function() {
            return this.__swiffy_d.yq
        }
    });
    Object.defineProperty(bq.prototype, "loaderURL", {
        get: function() {
            return this.__swiffy_d.gv()
        }
    });
    Object.defineProperty(bq.prototype, "parameters", {
        get: function() {
            return this.__swiffy_d.ym
        }
    });
    M(cq, "swfVersion", function() {
        return eq(this).definition.vc
    });
    Object.defineProperty(bq.prototype, "url", {
        get: function() {
            return this.__swiffy_d.Zc
        }
    });
    M(cq, "width", function() {
        return dq(this).I()
    });
    cq.getLoaderInfoByDefinition = function() {
        S(bq, "getLoaderInfoByDefinition");
        return null
    };
    var gq = function() {
        U.call(this)
    };
    P(gq, "flash.display.NativeMenu", U);
    gq.prototype.clone = function() {
        return new gq
    };
    var hq = function() {
        U.call(this)
    };
    P(hq, "flash.display.NativeMenuItem", U);
    hq.prototype.clone = function() {
        return new hq
    };
    var iq = P(function(a, b, c, d, e, f, h, k, n) {
        Hp.call(this, a, !l(b) || !!b, c);
        a = x(this);
        a.charCode = d >>> 0;
        a.keyCode = e >>> 0;
        a.rq = f >>> 0;
        a.ctrlKey = !!h;
        a.altKey = !!k;
        a.shiftKey = !!n
    }, "flash.events.KeyboardEvent", Hp);
    M(iq, "charCode", function() {
        return x(this).charCode
    });
    M(iq, "keyCode", function() {
        return x(this).keyCode
    });
    M(iq, "keyLocation", function() {
        return x(this).rq
    });
    M(iq, "ctrlKey", function() {
        return x(this).ctrlKey
    });
    M(iq, "altKey", function() {
        return x(this).altKey
    });
    M(iq, "shiftKey", function() {
        return x(this).shiftKey
    });
    N(iq, "charCode", function(a) {
        x(this).charCode = a >>> 0
    });
    N(iq, "keyCode", function(a) {
        x(this).keyCode = a >>> 0
    });
    N(iq, "keyLocation", function(a) {
        x(this).rq = a >>> 0
    });
    N(iq, "ctrlKey", function(a) {
        x(this).ctrlKey = !!a
    });
    N(iq, "altKey", function(a) {
        x(this).altKey = !!a
    });
    N(iq, "shiftKey", function(a) {
        x(this).shiftKey = !!a
    });
    L(iq, "clone", function() {
        return bo.call(iq, this.type, this.bubbles, this.cancelable, this.charCode, this.keyCode, this.keyLocation, this.ctrlKey, this.altKey, this.shiftKey)
    });
    L(iq, "updateAfterEvent", function() {
        r.i.pd()
    });
    mo(iq, ["keyDown", "keyUp"]);
    var jq = function(a, b, c, d, e, f, h, k, n, q, u) {
            Hp.call(this, a, b, c);
            this.localX = d;
            this.localY = e;
            this.relatedObject = f;
            this.ctrlKey = h;
            this.altKey = k;
            this.shiftKey = n;
            this.buttonDown = q;
            this.delta = u
        },
        kq = P(jq, "flash.events.MouseEvent", Hp);
    M(kq, "localX", function() {
        return x(this).Kj
    });
    N(kq, "localX", function(a) {
        x(this).Kj = +a
    });
    M(kq, "localY", function() {
        return x(this).Lj
    });
    N(kq, "localY", function(a) {
        x(this).Lj = +a
    });
    var lq = function(a) {
        a = a.target && a.target.__swiffy_d;
        return a instanceof Wh ? a.ca() : Cc
    };
    M(kq, "stageX", function() {
        var a = x(this),
            b = lq(a);
        return b.F * a.Kj + b.C * a.Lj + b.Y / 20
    });
    M(kq, "stageY", function() {
        var a = x(this),
            b = lq(a);
        return b.J * a.Kj + b.u * a.Lj + b.Z / 20
    });
    M(kq, "relatedObject", function() {
        return x(this).ng
    });
    N(kq, "relatedObject", function(a) {
        x(this).ng = Q(a, Np)
    });
    M(kq, "ctrlKey", function() {
        return x(this).ctrlKey
    });
    N(kq, "ctrlKey", function(a) {
        x(this).ctrlKey = !!a
    });
    M(kq, "altKey", function() {
        return x(this).altKey
    });
    N(kq, "altKey", function(a) {
        x(this).altKey = !!a
    });
    M(kq, "shiftKey", function() {
        return x(this).shiftKey
    });
    N(kq, "shiftKey", function(a) {
        x(this).shiftKey = !!a
    });
    M(kq, "buttonDown", function() {
        return x(this).co
    });
    N(kq, "buttonDown", function(a) {
        x(this).co = !!a
    });
    M(kq, "delta", function() {
        return x(this).nu
    });
    N(kq, "delta", function(a) {
        x(this).nu = a | 0
    });
    L(kq, "clone", function() {
        return bo.call(kq, this.type, this.bubbles, this.cancelable, this.localX, this.localY, this.relatedObject, this.ctrlKey, this.altKey, this.shiftKey, this.buttonDown, this.delta)
    });
    L(kq, "toString", function() {
        return this.formatToString("type", "bubbles", "cancelable", "eventPhase", "localX", "localY", "stageX", "stageY", "relatedObject", "ctrlKey", "altKey", "shiftKey", "buttonDown", "delta")
    });
    L(kq, "updateAfterEvent", function() {
        r.i.pd()
    });
    mo(kq, "click contextMenu doubleClick middleClick middleMouseDown middleMouseUp mouseDown mouseMove mouseOut mouseOver mouseUp mouseWheel rightClick rightMouseDown rightMouseUp rollOut rollOver".split(" "));
    var mq = function(a, b, c, d) {
            Hp.call(this, a, b, c);
            this.info = d
        },
        nq = P(mq, "flash.events.NetStatusEvent", Hp);
    M(nq, "info", function() {
        return x(this).info
    });
    N(nq, "info", function(a) {
        x(this).info = no(a)
    });
    L(nq, "clone", function() {
        return bo.call(nq, this.type, this.bubbles, this.cancelable, this.info)
    });
    Object.defineProperty(nq, "NET_STATUS", {
        value: "netStatus"
    });
    var oq = function(a, b, c, d, e) {
            Hp.call(this, a, b, c);
            this.bytesLoaded = d;
            this.bytesTotal = e
        },
        pq = P(oq, "flash.events.ProgressEvent", Hp);
    M(pq, "bytesLoaded", function() {
        return x(this).fd
    });
    N(pq, "bytesLoaded", function(a) {
        x(this).fd = +z(a, 0)
    });
    M(pq, "bytesTotal", function() {
        return x(this).gd
    });
    N(pq, "bytesTotal", function(a) {
        x(this).gd = +z(a, 0)
    });
    L(pq, "clone", function() {
        return bo.call(pq, this.type, this.bubbles, this.cancelable, this.bytesLoaded, this.bytesTotal)
    });
    L(pq, "toString", function() {
        return this.formatToString("type", "bubbles", "cancelable", "bytesLoaded", "bytesTotal")
    });
    mo(pq, ["progress", "socketData", "standardErrorData", "standardInputProgress", "standardOutputData"]);
    var qq = P(function(a, b, c, d, e) {
        Hp.call(this, a, b, c);
        this.code = d;
        this.level = e
    }, "flash.events.StatusEvent", Hp);
    M(qq, "code", function() {
        return x(this).code
    });
    N(qq, "code", function(a) {
        x(this).code = String(a)
    });
    M(qq, "level", function() {
        return x(this).level
    });
    N(qq, "level", function(a) {
        x(this).level = String(a)
    });
    L(qq, "clone", function() {
        return bo.call(qq, this.type, this.bubbles, this.cancelable, this.code, this.level)
    });
    Object.defineProperty(qq, "STATUS", {
        value: "status"
    });
    var sq = function(a, b, c, d) {
            Hp.call(this, a, b, c);
            rq.call(this, z(d, ""))
        },
        rq = function(a) {
            x(this).text = po(a)
        },
        tq = P(sq, "flash.events.TextEvent", Hp);
    M(tq, "text", function() {
        return x(this).text
    });
    N(tq, "text", rq);
    L(tq, "clone", function() {
        return bo.call(tq, this.type, this.bubbles, this.cancelable, this.text)
    });
    L(tq, "toString", function() {
        return this.formatToString("type", "bubbles", "cancelable", "text")
    });
    Object.defineProperty(tq, "LINK", {
        value: "link"
    });
    Object.defineProperty(tq, "TEXT_INPUT", {
        value: "textInput"
    });
    var uq = function(a, b, c, d) {
            sq.call(this, a, b, c, d)
        },
        vq = P(uq, "flash.events.ErrorEvent", sq);
    L(vq, "clone", function() {
        return bo.call(vq, this.type, this.bubbles, this.cancelable, this.text)
    });
    Object.defineProperty(vq, "ERROR", {
        value: "error"
    });
    var wq = P(function(a, b, c, d, e) {
        sq.call(this, a, b, c, d);
        this.error = e
    }, "flash.events.AsyncErrorEvent", uq);
    M(wq, "error", function() {
        return x(this).error
    });
    N(wq, "error", function(a) {
        x(this).error = Q(a, uo)
    });
    L(wq, "clone", function() {
        return bo.call(wq, this.type, this.bubbles, this.cancelable, this.text, this.error)
    });
    Object.defineProperty(wq, "ASYNC_ERROR", {
        value: "asyncError"
    });
    var xq = function(a, b, c, d) {
            sq.call(this, a, b, c, d)
        },
        yq = function(a, b) {
            var c = J.apply(null, arguments);
            return bo.call(xq, "ioError", !1, !1, c.value.message)
        },
        zq = P(xq, "flash.events.IOErrorEvent", uq);
    L(zq, "clone", function() {
        return bo.call(zq, this.type, this.bubbles, this.cancelable, this.text)
    });
    mo(zq, ["ioError", "standardErrorIoError", "standardInputIoError", "standardOutputIoError"]);
    var Aq = P(function(a, b, c, d) {
        sq.call(this, a, b, c, d)
    }, "flash.events.SecurityErrorEvent", uq);
    L(Aq, "clone", function() {
        return bo.call(Aq, this.type, this.bubbles, this.cancelable, this.text)
    });
    Object.defineProperty(Aq, "SECURITY_ERROR", {
        value: "securityError"
    });
    var Bq = function(a, b, c) {
            Hp.call(this, a, b, c)
        },
        Cq = P(Bq, "flash.events.TimerEvent", Hp);
    L(Cq, "clone", function() {
        return bo.call(Cq, this.type, this.bubbles, this.cancelable, this.activating)
    });
    L(Cq, "updateAfterEvent", function() {
        r.i.pd()
    });
    mo(Cq, ["timer", "timerComplete"]);
    var Dq = fo(2012);
    Dq.m = P(Dq, "flash.external.ExternalInterface");
    Object.defineProperty(Dq.m, "available", {
        get: Od
    });
    R(Dq.m, "marshallExceptions", "Boolean", !1);
    Object.defineProperty(Dq.m, "objectID", {
        get: function() {
            return r.i.getName()
        }
    });
    Dq.m.addCallback = function(a, b) {
        Qd(String(a), null, Q(b, Function), Dq.At)
    };
    Dq.At = function() {
        if (Dq.m.marshallExceptions) throw Error("Error in ActionScript");
        return null
    };
    Dq.m.call = function(a, b) {
        return Rd(r.i, String(a), Array.prototype.slice.call(arguments, 1), Dq.wt)
    };
    Dq.wt = function(a) {
        if (Dq.m.marshallExceptions) throw new hg(new to(String(a)));
        return null
    };
    var Eq = function() {},
        Fq = eo(Eq, "flash.filters.BitmapFilter", {
            Sd: go
        });
    Eq.prototype.clone = function() {
        return null
    };
    var Gq = P(function() {}, "flash.filters.BitmapFilterQuality");
    Object.defineProperties(Gq, {
        HIGH: {
            value: 3
        },
        LOW: {
            value: 1
        },
        MEDIUM: {
            value: 2
        }
    });
    var Hq = P(function() {}, "flash.filters.BitmapFilterType");
    mo(Hq, ["full", "inner", "outer"]);
    var Iq = function(a) {
            return Math.max(0, Math.min(a | 0, 255))
        },
        Jq = function(a, b, c) {
            for (; a.length < b;) a.push(c);
            a.length = b
        };
    var Kq = function(a, b, c, d, e, f, h, k, n, q, u, p) {
        a = +z(a, 4);
        b = +z(b, 45);
        c = z(c, 16777215) >>> 0;
        d = +z(d, 1);
        e >>>= 0;
        f = +z(f, 1);
        h = +z(h, 4);
        k = +z(k, 4);
        n = +z(n, 1);
        q = z(q, 1) | 0;
        u = qo(u, "inner");
        p = !!p;
        R(this, "angle", "Number", b);
        R(this, "blurX", "Number", h);
        R(this, "blurY", "Number", k);
        R(this, "distance", "Number", a);
        R(this, "highlightAlpha", "Number", d);
        R(this, "highlightColor", "uint", c);
        R(this, "knockout", "Boolean", p);
        R(this, "quality", "int", q);
        R(this, "shadowAlpha", "Number", f);
        R(this, "shadowColor", "uint", e);
        R(this, "strength", "Number",
            n);
        R(this, "type", "String", u)
    };
    P(Kq, "flash.filters.BevelFilter", Eq);
    be(Kq, function() {
        return new le(this.angle * Math.PI / 180, Lc(this.highlightColor, this.highlightAlpha), Lc(this.shadowColor, this.shadowAlpha), this.distance, this.strength, this.quality, this.blurX, this.blurY, je(this.type, this.knockout))
    });
    Kq.prototype.clone = function() {
        return new Kq(this.distance, this.angle, this.highlightColor, this.highlightAlpha, this.shadowColor, this.shadowAlpha, this.blurX, this.blurY, this.strength, this.quality, this.type, this.knockout)
    };
    var Lq = function(a, b, c) {
        a = +z(a, 4);
        b = +z(b, 4);
        c = z(c, 1) | 0;
        R(this, "blurX", "Number", a);
        R(this, "blurY", "Number", b);
        R(this, "quality", "int", c)
    };
    P(Lq, "flash.filters.BlurFilter", Eq);
    be(Lq, function() {
        return new de(this.quality, this.blurX, this.blurY)
    });
    Lq.prototype.clone = function() {
        return new Lq(this.blurX, this.blurY, this.quality)
    };
    var Mq = function(a) {
        var b;
        Object.defineProperty(this, "matrix", {
            get: function() {
                return b
            },
            set: function(a) {
                b = Q(a, Array) || [1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0];
                Jq(b, 20, 0)
            }
        });
        this.matrix = l(a) ? a.slice() : null
    };
    P(Mq, "flash.filters.ColorMatrixFilter", Eq);
    be(Mq, function() {
        return new ee(this.matrix)
    });
    Mq.prototype.clone = function() {
        return new Mq(this.matrix)
    };
    var Nq = function(a, b, c, d, e, f, h, k, n) {
        a = +z(a, 0);
        b = +z(b, 0);
        d = +z(d, 1);
        e = +z(e, 0);
        f = !l(f) || !!f;
        h = !l(h) || !!h;
        var q;
        Object.defineProperty(this, "alpha", {
            get: function() {
                return q
            },
            set: function(a) {
                q = Iq(255 * z(a, 0)) / 255
            }
        });
        this.alpha = n;
        R(this, "bias", "Number", e);
        R(this, "clamp", "Boolean", h);
        var u;
        Object.defineProperty(this, "color", {
            get: function() {
                return u
            },
            set: function(a) {
                u = a & 16777215
            }
        });
        this.color = k;
        R(this, "divisor", "Number", d);
        R(this, "matrixX", "Number", a);
        R(this, "matrixY", "Number", b);
        var p = [];
        Object.defineProperty(this,
            "matrix", {
                get: function() {
                    return p
                },
                set: function(a) {
                    p = Q(a, Array) || [];
                    Jq(p, this.matrixY * this.matrixX, 0)
                }
            });
        this.matrix = c;
        R(this, "preserveAlpha", "Boolean", f)
    };
    P(Nq, "flash.filters.ConvolutionFilter", Eq);
    be(Nq, function() {
        return new me(this.bias, this.clamp, Lc(this.color, this.alpha), this.divisor, this.matrix, this.matrixX, this.matrixY, this.preserveAlpha)
    });
    Nq.prototype.clone = function() {
        return new Nq(this.matrixX, this.matrixY, this.matrix, this.divisor, this.bias, this.preserveAlpha, this.clamp, this.color, this.alpha)
    };
    var Oq = function(a, b, c, d, e, f, h, k, n, q, u) {
        a = +z(a, 4);
        b = +z(b, 45);
        c >>>= 0;
        d = +z(d, 1);
        e = +z(e, 4);
        f = +z(f, 4);
        h = +z(h, 1);
        k = z(k, 1) | 0;
        n = !!n;
        q = !!q;
        u = !!u;
        var p;
        Object.defineProperty(this, "alpha", {
            get: function() {
                return p
            },
            set: function(a) {
                p = Iq(255 * z(a, 0)) / 255
            }
        });
        this.alpha = d;
        R(this, "angle", "Number", b);
        R(this, "blurX", "Number", e);
        R(this, "blurY", "Number", f);
        var t;
        Object.defineProperty(this, "color", {
            get: function() {
                return t
            },
            set: function(a) {
                t = a >>> 0 & 16777215
            }
        });
        this.color = c;
        R(this, "distance", "Number", a);
        R(this, "hideObject",
            "Boolean", u);
        R(this, "inner", "Boolean", n);
        R(this, "knockout", "Boolean", q);
        R(this, "quality", "int", k);
        R(this, "strength", "Number", h)
    };
    P(Oq, "flash.filters.DropShadowFilter", Eq);
    be(Oq, function() {
        return new ne(this.angle * Math.PI / 180, Lc(this.color, this.alpha), this.distance, this.strength, this.quality, this.blurX, this.blurY, oe(this.hideObject, this.inner, this.knockout))
    });
    Oq.prototype.clone = function() {
        return new Oq(this.distance, this.angle, this.color, this.alpha, this.blurX, this.blurY, this.strength, this.quality, this.inner, this.knockout, this.hideObject)
    };
    var Pq = function(a, b, c, d, e, f, h, k) {
        c = +z(c, 6);
        d = +z(d, 6);
        e = +z(e, 2);
        f = z(f, 1) | 0;
        h = !!h;
        k = !!k;
        var n;
        Object.defineProperty(this, "alpha", {
            get: function() {
                return n
            },
            set: function(a) {
                n = Iq(255 * z(a, 1)) / 255
            }
        });
        this.alpha = b;
        R(this, "blurX", "Number", c);
        R(this, "blurY", "Number", d);
        var q;
        Object.defineProperty(this, "color", {
            get: function() {
                return q
            },
            set: function(a) {
                q = z(a, 16711680) >>> 0 & 16777215
            }
        });
        this.color = a;
        R(this, "inner", "Boolean", h);
        R(this, "knockout", "Boolean", k);
        R(this, "quality", "int", f);
        R(this, "strength", "Number", e)
    };
    P(Pq, "flash.filters.GlowFilter", Eq);
    be(Pq, function() {
        return new ne(0, Lc(this.color, this.alpha), 0, this.strength, this.quality, this.blurX, this.blurY, oe(!1, this.inner, this.knockout))
    });
    Pq.prototype.clone = function() {
        return new Pq(this.color, this.alpha, this.blurX, this.blurY, this.strength, this.quality, this.inner, this.knockout)
    };
    var Qq = function(a, b, c, d, e, f, h, k, n, q, u) {
        a = +z(a, 4);
        b = +z(b, 45);
        f = +z(f, 4);
        h = +z(h, 4);
        k = +z(k, 1);
        n = z(n, 1) | 0;
        q = qo(q, "inner");
        u = !!u;
        var p = [],
            t = [],
            v = [],
            w = 0;
        Object.defineProperty(this, "colors", {
            get: function() {
                return p
            },
            set: function(a) {
                a = Q(a, Array) || [];
                w = a.length;
                for (var b = 0; b < w; b++) p[b] = z(a[b], 16711680) >>> 0 & 16777215;
                Jq(t, w, 1);
                Jq(v, w, 0)
            }
        });
        this.colors = c;
        Object.defineProperty(this, "alphas", {
            get: function() {
                return t
            },
            set: function(a) {
                a = Q(a, Array) || [];
                for (var b = 0; b < w; b++) t[b] = Iq(255 * z(a[b], 1)) / 255;
                t.length = w
            }
        });
        this.alphas =
            d;
        Object.defineProperty(this, "ratios", {
            get: function() {
                return v
            },
            set: function(a) {
                a = Q(a, Array) || [];
                for (var b = 0; b < w; b++) v[b] = Iq(a[b]);
                v.length = w
            }
        });
        this.ratios = e;
        R(this, "angle", "Number", b);
        R(this, "blurX", "Number", f);
        R(this, "blurY", "Number", h);
        R(this, "distance", "Number", a);
        R(this, "knockout", "Boolean", u);
        R(this, "quality", "int", n);
        R(this, "strength", "Number", k);
        R(this, "type", "String", q)
    };
    var Rq = function(a, b, c, d, e, f, h, k, n, q, u) {
        Qq.call(this, a, b, c, d, e, f, h, k, n, q, u)
    };
    P(Rq, "flash.filters.GradientBevelFilter", Eq);
    be(Rq, function() {
        return new pe(this.angle * Math.PI / 180, this.colors, this.alphas, this.ratios, this.distance, this.strength, this.quality, this.blurX, this.blurY, je(this.type, this.knockout))
    });
    Rq.prototype.clone = function() {
        return new Rq(this.distance, this.angle, this.colors, this.alphas, this.ratios, this.blurX, this.blurY, this.strength, this.quality, this.type, this.knockout)
    };
    var Sq = function(a, b, c, d, e, f, h, k, n, q, u) {
        Qq.call(this, a, b, c, d, e, f, h, k, n, q, u)
    };
    P(Sq, "flash.filters.GradientGlowFilter", Eq);
    be(Sq, function() {
        return new re(this.angle * Math.PI / 180, this.colors, this.alphas, this.ratios, this.distance, this.strength, this.quality, this.blurX, this.blurY, je(this.type, this.knockout))
    });
    Sq.prototype.clone = function() {
        return new Sq(this.distance, this.angle, this.colors, this.alphas, this.ratios, this.blurX, this.blurY, this.strength, this.quality, this.type, this.knockout)
    };
    var Tq = function() {
        this.filters = []
    };
    g = Tq.prototype;
    g.tn = function(a) {
        this.filters.push(new Kq(a.distance, 180 * a.angle / Math.PI, a.highlight & 16777215, (a.highlight >>> 24) / 255, a.shadow & 16777215, (a.shadow >>> 24) / 255, a.x, a.y, a.strength, a.quality, a.fa.type, a.fa.knockout))
    };
    g.un = function(a) {
        this.filters.push(new Lq(a.x, a.y, a.quality))
    };
    g.vn = function(a) {
        this.filters.push(new Mq(a.matrix))
    };
    g.wn = function(a) {
        this.filters.push(new Nq(a.matrixX, a.matrixY, a.matrix, a.divisor, a.bias, a.preserveAlpha, a.clamp, a.color & 16777215, (a.color >>> 24) / 255))
    };
    g.xn = function(a) {
        this.filters.push(new Oq(a.distance, 180 * a.angle / Math.PI, a.color & 16777215, (a.color >>> 24) / 255, a.x, a.y, a.strength, a.quality, "inner" == a.fa.type, a.fa.knockout && "outer" == a.fa.type, a.fa.knockout))
    };
    g.yn = function(a) {
        this.filters.push(new Rq(a.distance, 180 * a.angle / Math.PI, a.Yb, a.Xb, a.Zb, a.x, a.y, a.strength, a.quality, a.fa.type, a.fa.knockout))
    };
    g.zn = function(a) {
        this.filters.push(new Sq(a.distance, 180 * a.angle / Math.PI, a.Yb, a.Xb, a.Zb, a.x, a.y, a.strength, a.quality, a.fa.type, a.fa.knockout))
    };
    var Uq = function(a, b, c, d, e, f, h, k) {
            for (var n = [1, 1, 1, 1, 0, 0, 0, 0], q = 0; q < arguments.length && 8 > q; ++q) n[q] = +arguments[q];
            Vd(this, n)
        },
        Vq = P(Uq, "flash.geom.ColorTransform");
    dk.forEach(function(a, b) {
        Object.defineProperty(Uq.prototype, a, {
            get: function() {
                return x(this)[b]
            },
            set: function(a) {
                x(this)[b] = +a
            }
        })
    });
    Object.defineProperty(Uq.prototype, "color", {
        get: fk,
        set: gk
    });
    Uq.prototype.concat = function(a) {
        a = Q(a, Vq);
        Ho(a);
        ek.call(this, a)
    };
    Uq.prototype.toString = function() {
        return ak(this, dk)
    };
    var Wq = function(a, b) {
            a = +z(a, 0);
            b = +z(b, 0);
            R(this, "x", "Number", a);
            R(this, "y", "Number", b)
        },
        Xq = P(Wq, "flash.geom.Point");
    Object.defineProperty(Wq.prototype, "length", {
        get: function() {
            return zc(this.x, this.y)
        }
    });
    Wq.prototype.add = function(a) {
        return new Wq(this.x + a.x, this.y + a.y)
    };
    Wq.prototype.clone = function() {
        return new Wq(this.x, this.y)
    };
    Wq.prototype.copyFrom = function(a) {
        this.x = a.x;
        this.y = a.y
    };
    Xq.distance = function(a, b) {
        return zc(a.x - b.x, a.y - b.y)
    };
    Wq.prototype.equals = function(a) {
        return this.x == a.x && this.y == a.y
    };
    Xq.interpolate = function(a, b, c) {
        return new Wq(a.x * c + b.x * (1 - c), a.y * c + b.y * (1 - c))
    };
    Wq.prototype.normalize = function(a) {
        a /= this.length;
        this.x *= a;
        this.y *= a
    };
    Wq.prototype.offset = function(a, b) {
        this.x += a;
        this.y += b
    };
    Xq.polar = function(a, b) {
        return new Wq(a * Math.cos(b), a * Math.sin(b))
    };
    Wq.prototype.setTo = function(a, b) {
        this.x = a;
        this.y = b
    };
    Wq.prototype.subtract = function(a) {
        return new Wq(this.x - a.x, this.y - a.y)
    };
    Wq.prototype.toString = function() {
        return "(x=" + this.x + ", y=" + this.y + ")"
    };
    var Yq = function(a, b, c, d, e, f, h, k, n) {
        c >>>= 0;
        d >>>= 0;
        e = +z(e, 0);
        f = +z(f, 0);
        h = qo(h, "wrap");
        var q;
        Object.defineProperty(this, "alpha", {
            get: function() {
                return q
            },
            set: function(a) {
                q = Iq(255 * z(a, 0)) / 255
            }
        });
        this.alpha = n;
        var u;
        Object.defineProperty(this, "color", {
            get: function() {
                return u
            },
            set: function(a) {
                u = a >>> 0 & 16777215
            }
        });
        this.color = k;
        R(this, "componentX", "uint", c);
        R(this, "componentY", "uint", d);
        R(this, "mapBitmap", "flash.display.BitmapData", a);
        var p;
        Object.defineProperty(this, "mapPoint", {
            get: function() {
                return p
            },
            set: function(a) {
                a =
                    Q(a, Xq);
                p = null != a ? new Wq(a.x, a.y) : new Wq(0, 0)
            }
        });
        this.mapPoint = b;
        R(this, "mode", "String", h);
        R(this, "scaleX", "Number", e);
        R(this, "scaleY", "Number", f)
    };
    P(Yq, "flash.filters.DisplacementMapFilter", Eq);
    Yq.prototype.clone = function() {
        return new Yq(this.mapBitmap, this.mapPoint, this.componentX, this.componentY, this.scaleX, this.scaleY, this.mode, this.color, this.alpha)
    };
    var Zq = function() {};
    Zq.m = P(Zq, "flash.filters.DisplacementMapFilterMode");
    mo(Zq.m, ["clamp", "color", "ignore", "wrap"]);
    var $q = function(a, b, c, d) {
            a = +z(a, 0);
            b = +z(b, 0);
            c = +z(c, 0);
            d = +z(d, 0);
            R(this, "x", "Number", a);
            R(this, "y", "Number", b);
            R(this, "width", "Number", c);
            R(this, "height", "Number", d)
        },
        ar = P($q, "flash.geom.Rectangle");
    Object.defineProperty($q.prototype, "top", {
        get: function() {
            return this.y
        },
        set: function(a) {
            this.y = +a
        }
    });
    Object.defineProperty($q.prototype, "left", {
        get: function() {
            return this.x
        },
        set: function(a) {
            this.x = +a
        }
    });
    Object.defineProperty($q.prototype, "bottom", {
        get: function() {
            return this.y + this.height
        },
        set: function(a) {
            this.height = +a - this.y
        }
    });
    Object.defineProperty($q.prototype, "right", {
        get: function() {
            return this.x + this.width
        },
        set: function(a) {
            this.width = +a - this.x
        }
    });
    Object.defineProperty($q.prototype, "topLeft", {
        get: function() {
            return new Wq(this.left, this.top)
        },
        set: function(a) {
            a = Q(a, Xq);
            this.left = a.x;
            this.top = a.y
        }
    });
    Object.defineProperty($q.prototype, "bottomRight", {
        get: function() {
            return new Wq(this.right, this.bottom)
        },
        set: function(a) {
            a = Q(a, Xq);
            this.right = a.x;
            this.bottom = a.y
        }
    });
    Object.defineProperty($q.prototype, "size", {
        get: function() {
            return new Wq(this.width, this.height)
        },
        set: function(a) {
            a = Q(a, Xq);
            this.width = a.x;
            this.height = a.y
        }
    });
    $q.prototype.clone = function() {
        return new $q(this.x, this.y, this.width, this.height)
    };
    $q.prototype.contains = function(a, b) {
        return this.x <= a && this.y <= b && a < this.right && b < this.bottom
    };
    $q.prototype.containsPoint = function(a) {
        return this.contains(a.x, a.y)
    };
    $q.prototype.containsRect = function(a) {
        var b = this.right,
            c = this.bottom,
            d = a.right,
            e = a.bottom;
        return this.x <= a.x && this.y <= a.y && a.x < b && a.y < c && this.x < d && this.y < e && d <= b && e <= c
    };
    $q.prototype.copyFrom = function(a) {
        this.x = a.x;
        this.y = a.y;
        this.width = a.width;
        this.height = a.height
    };
    $q.prototype.equals = function(a) {
        return this.x == a.x && this.y == a.y && this.width == a.width && this.height == a.height
    };
    $q.prototype.inflate = function(a, b) {
        this.x -= a;
        this.y -= b;
        this.width += 2 * a;
        this.height += 2 * b
    };
    $q.prototype.inflatePoint = function(a) {
        this.inflate(a.x, a.y)
    };
    $q.prototype.intersection = function(a) {
        if (this.intersects(a)) {
            var b = Math.max(this.x, a.x),
                c = Math.max(this.y, a.y),
                d = Math.min(this.right, a.right);
            a = Math.min(this.bottom, a.bottom);
            return new $q(b, c, d - b, a - c)
        }
        return new $q
    };
    $q.prototype.intersects = function(a) {
        return 0 < a.width && 0 < a.height && 0 < this.width && 0 < this.height && a.x < this.right && a.y < this.bottom && a.right > this.x && a.bottom > this.y
    };
    $q.prototype.isEmpty = function() {
        return 0 >= this.width || 0 >= this.height
    };
    $q.prototype.offset = function(a, b) {
        this.x += a;
        this.y += b
    };
    $q.prototype.offsetPoint = function(a) {
        this.offset(a.x, a.y)
    };
    $q.prototype.setEmpty = function() {
        this.height = this.width = this.y = this.x = 0
    };
    $q.prototype.setTo = function(a, b, c, d) {
        this.x = a;
        this.y = b;
        this.width = c;
        this.height = d
    };
    $q.prototype.union = function(a) {
        if (this.isEmpty()) return a.clone();
        if (a.isEmpty()) return this.clone();
        var b = Math.min(this.x, a.x),
            c = Math.min(this.y, a.y),
            d = Math.max(this.right, a.right);
        a = Math.max(this.bottom, a.bottom);
        return new $q(b, c, d - b, a - c)
    };
    $q.prototype.toString = function() {
        return "(x=" + this.x + ", y=" + this.y + ", w=" + this.width + ", h=" + this.height + ")"
    };
    var br = function(a, b) {
        return new $q(a.j * b, a.l * b, a.width() * b, a.height() * b)
    };
    var cr = function(a, b, c, d) {
            this.w = l(d) ? Number(d) : 0;
            this.x = l(a) ? Number(a) : 0;
            this.y = l(b) ? Number(b) : 0;
            this.z = l(c) ? Number(c) : 0
        },
        dr = P(cr, "flash.geom.Vector3D");
    Object.defineProperty(cr.prototype, "lengthSquared", {
        get: function() {
            return this.x * this.x + this.y * this.y + this.z * this.z
        }
    });
    Object.defineProperty(cr.prototype, "length", {
        get: function() {
            return Math.sqrt(this.lengthSquared)
        }
    });
    Object.defineProperty(dr, "X_AXIS", {
        value: new cr(1, 0, 0, 0)
    });
    Object.defineProperty(dr, "Y_AXIS", {
        value: new cr(0, 1, 0, 0)
    });
    Object.defineProperty(dr, "Z_AXIS", {
        value: new cr(0, 0, 1, 0)
    });
    cr.prototype.add = function(a) {
        return new cr(this.x + a.x, this.y + a.y, this.z + a.z)
    };
    dr.angleBetween = function() {
        return 0
    };
    cr.prototype.clone = function() {
        return new cr(this.x, this.y, this.z, this.w)
    };
    cr.prototype.copyFrom = function(a) {
        this.x = a.x;
        this.y = a.y;
        this.z = a.z;
        this.w = a.w
    };
    cr.prototype.crossProduct = function() {
        return new cr
    };
    cr.prototype.decrementBy = function() {};
    dr.distance = function(a, b) {
        return a.subtract(b).length
    };
    cr.prototype.dotProduct = function() {
        return 0
    };
    cr.prototype.equals = function(a, b) {
        return this.x == a.x && this.y == a.y && this.z == a.z && (!b || this.w == a.w)
    };
    cr.prototype.incrementBy = function() {};
    cr.prototype.nearEquals = function() {
        return !1
    };
    cr.prototype.negate = function() {};
    cr.prototype.normalize = function() {
        return 0
    };
    cr.prototype.project = function() {};
    cr.prototype.scaleBy = function() {};
    cr.prototype.setTo = function(a, b, c) {
        this.x = Number(a);
        this.y = Number(b);
        this.z = Number(c)
    };
    cr.prototype.subtract = function(a) {
        return new cr(this.x - a.x, this.y - a.y, this.z - a.z)
    };
    cr.prototype.toString = function() {
        return "Vector3D(" + this.x + ", " + this.y + ", " + this.z + ")"
    };
    var er = function(a, b, c, d, e, f) {
            for (var h = [1, 0, 0, 1, 0, 0], k = 0; k < arguments.length && 6 > k; ++k) h[k] = +arguments[k];
            Vd(this, h)
        },
        fr = P(er, "flash.geom.Matrix");
    hk.forEach(function(a, b) {
        Object.defineProperty(er.prototype, a, {
            get: function() {
                return x(this)[b]
            },
            set: function(a) {
                x(this)[b] = +a
            }
        })
    });
    er.prototype.clone = function() {
        var a = x(this);
        return new er(a[0], a[1], a[2], a[3], a[4], a[5])
    };
    er.prototype.concat = function(a) {
        a = Q(a, fr);
        kk.call(this, a)
    };
    er.prototype.copyColumnFrom = function(a, b) {
        a >>>= 0;
        b = Q(b, dr);
        if (3 > a) {
            Ho(b);
            var c = x(this);
            c[2 * a] = b.x;
            c[2 * a + 1] = b.y
        }
    };
    er.prototype.copyColumnTo = function(a, b) {
        a >>>= 0;
        b = Q(b, dr);
        if (3 > a) {
            Ho(b);
            var c = x(this);
            b.x = c[2 * a];
            b.y = c[2 * a + 1];
            b.z = 2 == a ? 1 : 0
        }
    };
    er.prototype.copyFrom = function(a) {
        a = Q(a, fr);
        Ho(a);
        lk.call(this, a)
    };
    er.prototype.copyRowFrom = function(a, b) {
        a >>>= 0;
        b = Q(b, dr);
        if (2 > a) {
            Ho(b);
            var c = x(this);
            c[a] = b.x;
            c[a + 2] = b.y;
            c[a + 4] = b.z
        }
    };
    er.prototype.copyRowTo = function(a, b) {
        a >>>= 0;
        b = Q(b, dr);
        if (3 > a) {
            Ho(b);
            var c = x(this);
            b.x = 2 == a ? 0 : c[a];
            b.y = 2 == a ? 0 : c[a + 2];
            b.z = 2 == a ? 1 : c[a + 4]
        }
    };
    er.prototype.createBox = function(a, b, c, d, e) {
        mk.call(this, +a, +b, +z(c, 0), +z(d, 0), +z(e, 0))
    };
    er.prototype.createGradientBox = function(a, b, c, d, e) {
        a = +a;
        b = +b;
        mk.call(this, a * Hc, b * Hc, +z(c, 0), a / 2 + +z(d, 0), b / 2 + +z(e, 0))
    };
    er.prototype.deltaTransformPoint = function(a) {
        a = Q(a, Xq);
        return nk.call(this, a.x, a.y, Wq)
    };
    er.prototype.identity = function() {
        ok.call(this)
    };
    er.prototype.invert = function() {
        pk.call(this)
    };
    er.prototype.rotate = function(a) {
        qk.call(this, +a)
    };
    er.prototype.scale = function(a, b) {
        rk.call(this, +a, +b)
    };
    er.prototype.setTo = function(a, b, c, d, e, f) {
        var h = x(this);
        h[0] = +a;
        h[1] = +b;
        h[2] = +c;
        h[3] = +d;
        h[4] = +e;
        h[5] = +f
    };
    er.prototype.transformPoint = function(a) {
        a = Q(a, Xq);
        return sk.call(this, a.x, a.y, Wq)
    };
    er.prototype.translate = function(a, b) {
        var c = x(this);
        c[4] += +a;
        c[5] += +b
    };
    er.prototype.toString = function() {
        return ak(this, hk)
    };
    var hr = function(a) {
            a = Q(a, gr);
            Object.defineProperty(this, "__swiffy_d", {
                value: a.__swiffy_d
            })
        },
        ir = P(hr, "flash.geom.Transform");
    Object.defineProperty(hr.prototype, "colorTransform", {
        get: function() {
            return ck(Uq, this.__swiffy_d.mb)
        },
        set: function(a) {
            a = Q(a, Vq);
            var b = this.__swiffy_d;
            b.Nb(bk(a));
            b.Fa()
        }
    });
    Object.defineProperty(hr.prototype, "concatenatedColorTransform", {
        get: function() {
            var a = this.__swiffy_d.Rc();
            return ck(Uq, a)
        }
    });
    Object.defineProperty(hr.prototype, "concatenatedMatrix", {
        get: function() {
            var a = this.__swiffy_d.ca();
            return jk(er, a)
        }
    });
    Object.defineProperty(hr.prototype, "matrix", {
        get: function() {
            return jk(er, this.__swiffy_d.ya())
        },
        set: function(a) {
            a = Q(a, fr);
            var b = this.__swiffy_d;
            b.setTransform(ik(a));
            b.Fa()
        }
    });
    Object.defineProperty(hr.prototype, "pixelBounds", {
        get: function() {
            return br(this.__swiffy_d.Lp(), 1)
        }
    });
    var jr = function() {
            if (!this.__swiffy_d) throw J(2012, $m(this).localName + "$");
            U.call(this)
        },
        gr = P(jr, "flash.display.DisplayObject", U, [vp]);
    Vp(jr, "enterFrame", "exitFrame", "render");
    L(gr, "localToGlobal", function(a) {
        a = Q(a, Xq);
        a = new yc(20 * a.x, 20 * a.y);
        a.pb(this.__swiffy_d.ca());
        return new Wq(a.x / 20, a.y / 20)
    });
    L(gr, "globalToLocal", function(a) {
        a = Q(a, Xq);
        a = new yc(20 * a.x, 20 * a.y);
        a.Sc(this.__swiffy_d.ca());
        return new Wq(a.x / 20, a.y / 20)
    });
    var kr = function(a, b, c) {
        b = Q(b, gr);
        a = a.__swiffy_d;
        c = c(a);
        b && (a = a.ca(), b = b.__swiffy_d.ca(), c = c.pb(a.multiply(b.jq())));
        return br(c, .05)
    };
    L(gr, "getBounds", function(a) {
        return kr(this, a, Yh)
    });
    L(gr, "getRect", function(a) {
        return kr(this, a, $h)
    });
    Object.defineProperty(jr.prototype, "x", {
        get: function() {
            return this.__swiffy_d.ya().Y / 20
        },
        set: function(a) {
            var b = this.__swiffy_d,
                c = b.ya();
            b.setTransform(c.$j((20 * a | 0) - c.Y, 0));
            b.Fa()
        }
    });
    Object.defineProperty(jr.prototype, "y", {
        get: function() {
            return this.__swiffy_d.ya().Z / 20
        },
        set: function(a) {
            var b = this.__swiffy_d,
                c = b.ya();
            b.setTransform(c.$j(0, (20 * a | 0) - c.Z));
            b.Fa()
        }
    });
    Object.defineProperty(jr.prototype, "alpha", {
        get: function() {
            return this.__swiffy_d.mb.Ta / 256
        },
        set: function(a) {
            var b = this.__swiffy_d;
            b.Nb(b.mb.Os(256 * a | 0));
            b.Fa()
        }
    });
    Object.defineProperty(jr.prototype, "visible", {
        get: function() {
            return this.__swiffy_d.$c
        },
        set: function(a) {
            this.__swiffy_d.ik(Boolean(a))
        }
    });
    Object.defineProperty(jr.prototype, "rotation", {
        get: function() {
            return -180 * this.__swiffy_d.mc().angle / Math.PI
        },
        set: function(a) {
            var b = this.__swiffy_d;
            b.mc().angle = -a * Math.PI / 180;
            b.sf();
            b.Fa()
        }
    });
    Object.defineProperty(jr.prototype, "width", {
        get: function() {
            return this.__swiffy_d.I()
        },
        set: function(a) {
            var b = this.__swiffy_d;
            b.Sm(Number(a));
            b.Fa()
        }
    });
    Object.defineProperty(jr.prototype, "height", {
        get: function() {
            return this.__swiffy_d.S()
        },
        set: function(a) {
            var b = this.__swiffy_d;
            b.Pm(Number(a));
            b.Fa()
        }
    });
    Object.defineProperty(jr.prototype, "scaleX", {
        get: function() {
            return this.__swiffy_d.mc().td
        },
        set: function(a) {
            var b = this.__swiffy_d;
            b.mc().td = a;
            b.sf();
            b.Fa()
        }
    });
    Object.defineProperty(jr.prototype, "scaleY", {
        get: function() {
            return this.__swiffy_d.mc().gf
        },
        set: function(a) {
            var b = this.__swiffy_d;
            b.mc().gf = a;
            b.sf();
            b.Fa()
        }
    });
    Object.defineProperty(jr.prototype, "mouseX", {
        get: function() {
            var a = this.__swiffy_d;
            return a.i.va.ln(a.ca()) / 20
        }
    });
    Object.defineProperty(jr.prototype, "mouseY", {
        get: function() {
            var a = this.__swiffy_d;
            return a.i.va.mn(a.ca()) / 20
        }
    });
    Object.defineProperty(jr.prototype, "root", {
        get: function() {
            for (var a = this.__swiffy_d; a && !a.Mj && a != a.i.X;)
                if (a.getParent())
                    if (a == a.i.Ka) break;
                    else a = a.getParent();
            else a = null;
            return a ? a.o : null
        }
    });
    Object.defineProperty(jr.prototype, "parent", {
        get: function() {
            var a = this.__swiffy_d.getParent();
            return a ? a.o : null
        }
    });
    Object.defineProperty(jr.prototype, "name", {
        get: function() {
            return this.__swiffy_d.getName()
        },
        set: function(a) {
            this.__swiffy_d.Ob(a)
        }
    });
    Object.defineProperty(jr.prototype, "loaderInfo", {
        get: function() {
            return this.__swiffy_d.Dl().Nr
        }
    });
    Object.defineProperty(jr.prototype, "stage", {
        get: function() {
            var a = this.__swiffy_d;
            return this.root ? a.i.X.o : null
        }
    });
    Object.defineProperty(jr.prototype, "transform", {
        get: function() {
            return new hr(this)
        },
        set: function(a) {
            a = Q(a, ir);
            a = a.__swiffy_d;
            var b = this.__swiffy_d;
            b.setTransform(a.ya());
            b.Nb(a.mb);
            b.Fa()
        }
    });
    Object.defineProperty(jr.prototype, "filters", {
        get: function() {
            var a = new Tq;
            this.__swiffy_d.Ns(a);
            return a.filters
        },
        set: function(a) {
            a = Q(a, Array);
            a = ce(a, !0);
            if (!a) throw J(2005, 0, "Filter");
            this.__swiffy_d.wg(a)
        }
    });
    Object.defineProperty(jr.prototype, "mask", {
        get: function() {
            var a = this.__swiffy_d.Id;
            return a ? a.o : null
        },
        set: function(a) {
            a = Q(a, gr);
            this.__swiffy_d.af(a.__swiffy_d)
        }
    });
    Object.defineProperty(jr.prototype, "blendMode", {
        get: function() {
            return uc[this.__swiffy_d.wd]
        },
        set: function(a) {
            a = String(a);
            var b = this.__swiffy_d;
            a = uc.indexOf(a);
            if (0 > a) throw J(2008, "blendMode");
            b.vg(a)
        }
    });
    Object.defineProperty(jr.prototype, "cacheAsBitmap", {
        get: function() {
            return this.__swiffy_d.Ul()
        },
        set: function(a) {
            this.__swiffy_d.Mm(!!a)
        }
    });
    var lr = function(a, b, c) {
            jr.call(this);
            a && (this.bitmapData = a);
            this.pixelSnapping = b;
            this.smoothing = c
        },
        mr = P(lr, "flash.display.Bitmap", jr);
    Object.defineProperty(lr.prototype, "bitmapData", {
        get: function() {
            var a = this.__swiffy_d.Rb;
            return a ? a.o : null
        },
        set: function(a) {
            a = Q(a, nr);
            this.__swiffy_d.qx(a ? a.__swiffy_d : null)
        }
    });
    Object.defineProperty(lr.prototype, "pixelSnapping", {
        get: function() {
            return this.__swiffy_d.Zq
        },
        set: function(a) {
            this.__swiffy_d.Zq = String(a)
        }
    });
    Object.defineProperty(lr.prototype, "smoothing", {
        get: function() {
            return this.__swiffy_d.smoothing
        },
        set: function(a) {
            this.__swiffy_d.smoothing = !!a
        }
    });
    ho(lr, function(a, b) {
        return new ki(null, a, b)
    });
    var or = function() {
            jr.call(this);
            var a = this.__swiffy_d;
            a.xc |= 127;
            a.$i();
            R(this, "contextMenu", "flash.ui.ContextMenu", null);
            R(this, "focusRect", "Boolean", null)
        },
        Np = P(or, "flash.display.InteractiveObject", jr);
    Object.defineProperty(or.prototype, "tabIndex", {
        get: function() {
            return this.__swiffy_d.tabIndex
        },
        set: function(a) {
            this.__swiffy_d.tabIndex = a | 0
        }
    });
    Object.defineProperty(or.prototype, "tabEnabled", {
        get: function() {
            return this.__swiffy_d.Zl()
        },
        set: function(a) {
            this.__swiffy_d.cf = !!a
        }
    });
    Object.defineProperty(or.prototype, "mouseEnabled", {
        get: function() {
            return this.__swiffy_d.cg
        },
        set: function(a) {
            return this.__swiffy_d.bs(!!a)
        }
    });
    Object.defineProperty(or.prototype, "doubleClickEnabled", {
        get: function() {
            return this.__swiffy_d.jl
        },
        set: function(a) {
            return this.__swiffy_d.rx(!!a)
        }
    });
    var pr = function(a, b, c, d) {
            a = new jq(a, b, !1);
            b = x(a);
            d && (b.ng = d.o);
            d = c.i.va;
            c = c.ca();
            b.Kj = d.ln(c) / 20;
            b.Lj = d.mn(c) / 20;
            b.co = d.Mv();
            return a
        },
        qr = function(a, b) {
            return function(c, d) {
                return pr(a, b, c, d.ng)
            }
        },
        rr = function(a) {
            return function() {
                var b = new Hp(a, !1, !1);
                x(b).en = !0;
                return b
            }
        },
        sr = function(a) {
            return function() {
                return new Hp(a, !0, !1)
            }
        },
        tr = {};
    tr[24] = sr("added");
    tr[21] = rr("addedToStage");
    tr[25] = sr("removed");
    tr[23] = rr("removedFromStage");
    tr[11] = qr("click", !0);
    tr[22] = qr("doubleClick", !0);
    tr[2] = qr("mouseUp", !0);
    tr[3] = qr("mouseDown", !0);
    tr[8] = qr("rollOut", !1);
    tr[9] = qr("rollOver", !1);
    var ur = function() {
        or.call(this)
    };
    P(ur, "flash.display.DisplayObjectContainer", or);
    Object.defineProperty(ur.prototype, "tabChildren", {
        value: !0,
        writable: !0
    });
    Object.defineProperty(ur.prototype, "numChildren", {
        get: function() {
            return this.__swiffy_d.He()
        }
    });
    Object.defineProperty(or.prototype, "mouseChildren", {
        get: function() {
            return this.__swiffy_d.Qj
        },
        set: function(a) {
            return this.__swiffy_d.zx(!!a)
        }
    });
    var vr = function(a) {
            Io(a, "child");
            a = Q(a, gr);
            return a.__swiffy_d
        },
        wr = function(a, b, c) {
            b = vr(b);
            a = a.__swiffy_d;
            if (b === a) throw J(2024);
            if (b.contains(a)) throw J(2150);
            if (!l(c)) c = a.He();
            else if (0 > c || c > a.He()) throw J(2006);
            a.Te(b, c)
        };
    ur.prototype.addChild = function(a) {
        wr(this, a);
        return a
    };
    ur.prototype.addChildAt = function(a, b) {
        wr(this, a, b | 0);
        return a
    };
    ur.prototype.contains = function(a) {
        a = vr(a);
        return this.__swiffy_d.contains(a)
    };
    ur.prototype.getChildAt = function(a) {
        if (a = this.__swiffy_d.Ge(a | 0)) return a.o;
        throw J(2006);
    };
    ur.prototype.getChildByName = function(a) {
        return (a = this.__swiffy_d.Su(a)) ? a.o : a
    };
    ur.prototype.getChildIndex = function(a) {
        a = vr(a);
        a = this.__swiffy_d.Mf(a);
        if (-1 == a) throw J(2025);
        return a
    };
    ur.prototype.removeChild = function(a) {
        a = vr(a);
        var b = this.__swiffy_d;
        if (!b.Wp(a)) throw J(2025);
        b.Uh(a)
    };
    ur.prototype.removeChildAt = function(a) {
        var b = this.__swiffy_d;
        if (a = b.Ge(a | 0)) return b.Uh(a), a.o;
        throw J(2006);
    };
    ur.prototype.setChildIndex = function(a, b) {
        var c = vr(a);
        b |= 0;
        var d = this.__swiffy_d;
        if (!d.Wp(c)) throw J(2025);
        d.Te(c, b)
    };
    ur.prototype.swapChildren = function(a, b) {
        this.swapChildrenAt(this.getChildIndex(a), this.getChildIndex(b))
    };
    ur.prototype.swapChildrenAt = function(a, b) {
        a |= 0;
        b |= 0;
        var c = this.__swiffy_d,
            d = c.Ge(a),
            e = c.Ge(b);
        if (!d || !e) throw J(2006);
        c.Te(d, b);
        c.Te(e, a)
    };
    var xr = function() {
            or.call(this);
            this.__swiffy_d.cf = !0
        },
        yr = P(xr, "flash.display.SimpleButton", or);
    ho(xr, function(a, b) {
        var c = new vi(0, !1, [], [], []);
        return new ri(c, a, null, b)
    });
    Gn(yr, "enabled", function() {
        return this.__swiffy_d.enabled
    }, function(a) {
        this.__swiffy_d.enabled = !!a
    });
    xr.prototype.useHandCursor = !0;
    var zr = function(a, b) {
        M(yr, a, function() {
            var a = this.__swiffy_d.tv(b);
            return a ? a.o : null
        });
        N(yr, a, function(a) {
            a = Q(a, gr);
            this.__swiffy_d.Hx(b, a ? a.__swiffy_d : null)
        })
    };
    zr("upState", 1);
    zr("overState", 2);
    zr("downState", 4);
    zr("hitTestState", 8);
    var Ar = function() {
            or.call(this);
            O(this, "allowsFullScreen", !1);
            O(this, "allowsFullScreenInteractive", !1);
            R(this, "color", "uint", 0);
            R(this, "colorCorrection", "String", "default");
            O(this, "colorCorrectionSupport", "unsupported");
            O(this, "contentsScaleFactor", 1);
            R(this, "focus", "flash.display.InteractiveObject", null);
            R(this, "fullScreenSourceRect", "flash.geom.Rectangle", null);
            R(this, "mouseLock", "Boolean", !1);
            O(this, "nativeWindow", null);
            R(this, "quality", "String", Fp.HIGH);
            R(this, "showDefaultContextMenu", "Boolean", !0);
            O(this, "softKeyboardRect", new $q(0, 0, 0, 0));
            O(this, "stage3Ds", null);
            R(this, "stageFocusRect", "Boolean", !0);
            O(this, "stageVideos", null);
            O(this, "wmodeGPU", !1)
        },
        Br = P(Ar, "flash.display.Stage", ur);
    O(Br, "supportsOrientationChange", !1);
    Ar.prototype.assignFocus = function(a) {
        Q(a, Np);
        S(this, "assignFocus")
    };
    Ar.prototype.invalidate = function() {
        this.__swiffy_d.i.Kv()
    };
    Ar.prototype.isFocusInaccessible = function() {
        S(this, "isFocusInaccessible");
        return !1
    };
    Ar.prototype.setAspectRatio = function() {
        S(this, "setAspectRatio")
    };
    Ar.prototype.setOrientation = function() {
        S(this, "setOrientation")
    };
    Object.defineProperty(Ar.prototype, "displayState", {
        get: function() {
            return "normal"
        },
        set: function(a) {
            a = String(a);
            a: {
                for (var b in Dj)
                    if (a == Dj[b]) {
                        a = Dj[b];
                        break a
                    }
                a = null
            }
            if (null === a) throw J(2008, "displayState");
            if ("normal" != a) throw J(2152);
        }
    });
    Object.defineProperty(Ar.prototype, "stageWidth", {
        get: function() {
            var a = this.__swiffy_d;
            return "noScale" == a.Xc ? a.Bd : a.Xm
        },
        set: function() {}
    });
    Object.defineProperty(Ar.prototype, "stageHeight", {
        get: function() {
            var a = this.__swiffy_d;
            return "noScale" == a.Xc ? a.Ad : a.Vm
        },
        set: function() {}
    });
    Object.defineProperty(Ar.prototype, "fullScreenWidth", {
        get: function() {
            S(this, "fullScreenWidth");
            return this.stageWidth
        }
    });
    Object.defineProperty(Ar.prototype, "fullScreenHeight", {
        get: function() {
            S(this, "fullScreenHeight");
            return this.stageHeight
        }
    });
    Object.defineProperty(Ar.prototype, "frameRate", {
        get: function() {
            return this.__swiffy_d.i.mj().jj
        },
        set: function(a) {
            a = +a;
            a = 0 >= a ? .01 : Math.min(1E3, a);
            this.__swiffy_d.i.mj().vx(a)
        }
    });
    Object.defineProperty(Ar.prototype, "scaleMode", {
        get: function() {
            return this.__swiffy_d.Xc
        },
        set: function(a) {
            a = String(a);
            var b = this.__swiffy_d;
            switch (a) {
                case "showAll":
                case "exactFit":
                case "noBorder":
                case "noScale":
                    break;
                default:
                    throw J(2008, "scaleMode");
            }
            b.gs(a)
        }
    });
    Object.defineProperty(Ar.prototype, "align", {
        get: function() {
            return this.__swiffy_d.sp("TBLR")
        },
        set: function(a) {
            a = String(a);
            this.__swiffy_d.Or(a)
        }
    });
    var Cr = P(function() {}, "flash.media.AudioDecoder");
    Object.defineProperties(Cr, {
        DOLBY_DIGITAL: {
            value: "DolbyDigital"
        },
        DOLBY_DIGITAL_PLUS: {
            value: "DolbyDigitalPlus"
        },
        DTS: {
            value: "DTS"
        },
        DTS_EXPRESS: {
            value: "DTSExpress"
        },
        DTS_HD_HIGH_RESOLUTION_AUDIO: {
            value: "DTSHDHighResolutionAudio"
        },
        DTS_HD_MASTER_AUDIO: {
            value: "DTSHDMasterAudio"
        }
    });
    var Dr = P(function(a, b) {
        a = +z(a, 1E3);
        b = !!b;
        R(this, "bufferTime", "Number", a);
        R(this, "checkPolicyFile", "Boolean", b)
    }, "flash.media.SoundLoaderContext");
    var Er = function(a, b) {
            a = +z(a, 1);
            b = +z(b, 0);
            var c = new se;
            c.volume = a;
            c.Gc = Math.sqrt(1 - b);
            c.Wc = Math.sqrt(1 + b);
            Vd(this, c)
        },
        Fr = P(Er, "flash.media.SoundTransform");
    M(Fr, "leftToLeft", function() {
        return x(this).Gc
    });
    N(Fr, "leftToLeft", function(a) {
        x(this).Gc = +a
    });
    M(Fr, "leftToRight", function() {
        return x(this).Zd
    });
    N(Fr, "leftToRight", function(a) {
        x(this).Zd = +a
    });
    M(Fr, "rightToLeft", function() {
        return x(this).je
    });
    N(Fr, "rightToLeft", function(a) {
        x(this).je = +a
    });
    M(Fr, "rightToRight", function() {
        return x(this).Wc
    });
    N(Fr, "rightToRight", function(a) {
        x(this).Wc = +a
    });
    M(Fr, "pan", function() {
        var a = x(this).Gc;
        return 1 - a * a
    });
    N(Fr, "pan", function(a) {
        a = +a;
        var b = x(this);
        b.Gc = Math.sqrt(1 - a);
        b.Zd = 0;
        b.je = 0;
        b.Wc = Math.sqrt(1 + a)
    });
    M(Fr, "volume", function() {
        return x(this).volume
    });
    N(Fr, "volume", function(a) {
        x(this).volume = +a
    });
    var Gr = function() {
            Vd(this, {
                lb: new se,
                audio: null
            })
        },
        Hr = P(Gr, "flash.media.SoundChannel");
    M(Hr, "leftPeak", function() {
        return 0
    });
    M(Hr, "position", function() {
        return 0
    });
    M(Hr, "rightPeak", function() {
        return 0
    });
    M(Hr, "soundTransform", function() {
        var a = new Er;
        x(a).Cd(x(this).lb);
        return a
    });
    N(Hr, "soundTransform", function(a) {
        Io(a, "soundChannel");
        a = Q(a, Fr);
        var b = x(this);
        b.lb.Cd(x(a));
        b.audio && b.audio.ai()
    });
    Gr.prototype.stop = function() {
        var a = x(this).audio;
        a && a.remove()
    };
    var Jr = function(a, b) {
        Q(a, Ir);
        Q(b, Dr);
        R(this, "bytesLoaded", "uint", 0);
        R(this, "bytesTotal", "Number", 0);
        R(this, "isBuffering", "Boolean", !1);
        R(this, "isURLInaccessible", "Boolean", !0);
        R(this, "length", "Number", 0);
        R(this, "url", "String", "")
    };
    P(Jr, "flash.media.Sound");
    Jr.prototype.play = function(a, b, c) {
        c = Q(c, Fr);
        a |= 0;
        b |= 0;
        var d = this.__swiffy_d,
            d = d && d.definition;
        if (!(d instanceof Uf)) return null;
        var e = new Gr;
        c && (e.soundTransform = c);
        c = x(e);
        c.audio = r.i.nc().Sk(d, c.lb, null, a, b);
        return e
    };
    Jr.prototype.close = function() {
        S(this, "close")
    };
    Jr.prototype.connect = function() {
        S(this, "connect")
    };
    Um.prototype["flash.net.navigateToURL"] = function(a, b) {
        Io(a, "request");
        Io(a.url, "url");
        var c = l(b) ? b : "_blank",
            d = 0;
        a.data && (d = a.method == Kr.POST ? 2 : 1);
        var e = r;
        e.i.Rh(new oj(e, a.data ? a.data.toString() : null, a.url, c, d))
    };
    var Lr = {};
    Um.prototype["flash.net.registerClassAlias"] = function(a, b) {
        Io(a, "aliasName");
        Io(b, "classObject");
        a = String(a);
        b = Q(b, Kn);
        S(this, "flash.net.registerClassAlias");
        Lr[a] = b
    };
    Um.prototype["flash.net.getClassByAlias"] = function(a) {
        Io(a, "aliasName");
        a = String(a);
        S(this, "flash.net.getClassByAlias");
        var b = Lr[a];
        if (!b) throw J(1014, a);
        return b
    };
    var Mr = function() {
            U.call(this);
            R(this, "client", "Object", null);
            O(this, "domain", "");
            R(this, "isPerUser", "Boolean", !1)
        },
        Nr = P(Mr, "flash.net.LocalConnection", U);
    Object.defineProperty(Nr, "isSupported", {
        value: !1
    });
    Mr.prototype.allowDomain = function() {
        S(this, "allowDomain")
    };
    Mr.prototype.allowInsecureDomain = function() {
        S(this, "allowInsecureDomain")
    };
    Mr.prototype.close = function() {
        S(this, "close")
    };
    Mr.prototype.connect = function() {
        S(this, "connect")
    };
    Mr.prototype.send = function() {
        S(this, "send")
    };
    var Or = function() {
            U.call(this);
            R(this, "client", "Object", null);
            O(this, "connectedProxyType", "");
            O(this, "farID", "");
            O(this, "farNonce", "");
            R(this, "httpIdleTimeout", "Number", 0);
            R(this, "maxPeerConnections", "uint", 0);
            O(this, "nearID", "");
            O(this, "nearNonce", "");
            R(this, "objectEncoding", "uint", 0);
            O(this, "protocol", "");
            R(this, "proxyType", "String", "");
            O(this, "unconnectedPeerStreams", null);
            O(this, "uri", "");
            O(this, "usingTLS", !1);
            x(this).Mt = !1
        },
        Pr = P(Or, "flash.net.NetConnection", U);
    M(Pr, "connected", function() {
        return x(this).Mt
    });
    Object.defineProperty(Pr, "defaultObjectEncoding", {
        value: 0
    });
    Or.prototype.addHeader = function() {
        S(this, "addHeader")
    };
    Or.prototype.call = function(a, b) {
        Q(b, Qr);
        S(this, "call")
    };
    Or.prototype.close = function() {
        S(this, "close")
    };
    Or.prototype.connect = function() {
        S(this, "connect")
    };
    var Rr = P(function() {
        U.call(this);
        R(this, "len", "Number", 0);
        R(this, "offset", "Number", 0);
        R(this, "oldStreamName", "String", "");
        R(this, "start", "Number", 0);
        R(this, "streamName", "String", "");
        R(this, "transition", "String", "")
    }, "flash.net.NetStreamPlayOptions", U);
    var Sr = fo(2012);
    Sr.m = P(Sr, "flash.net.ObjectEncoding");
    Object.defineProperty(Sr.m, "dynamicPropertyWriter", {
        value: null
    });
    Object.defineProperty(Sr.m, "AMF0", {
        value: 0
    });
    Object.defineProperty(Sr.m, "AMF3", {
        value: 3
    });
    Object.defineProperty(Sr.m, "DEFAULT", {
        value: 3
    });
    var Qr = P(function(a, b) {
        Q(a, Function);
        Q(b, Function)
    }, "flash.net.Responder");
    var Tr = function(a) {
            U.call(this);
            Q(a, Pr);
            R(this, "audioReliable", "Boolean", !1);
            R(this, "audioSampleAccess", "Boolean", !1);
            O(this, "backBufferLength", 0);
            R(this, "backBufferTime", "Number", 0);
            R(this, "bufferTimeMax", "Number", 0);
            R(this, "checkPolicyFile", "Boolean", !1);
            R(this, "dataReliable", "Boolean", !1);
            O(this, "farID", "");
            O(this, "farNonce", "");
            R(this, "inBufferSeek", "Boolean", !1);
            O(this, "info", null);
            O(this, "liveDelay", 0);
            R(this, "maxPauseBufferTime", "Number", 0);
            R(this, "multicastAvailabilitySendToAll", "Boolean", !1);
            R(this, "multicastAvailabilityUpdatePeriod", "Number", 0);
            R(this, "multicastFetchPeriod", "Number", 0);
            O(this, "multicastInfo", null);
            R(this, "multicastPushNeighborLimit", "Number", 0);
            R(this, "multicastRelayMarginDuration", "Number", 0);
            R(this, "multicastWindowDuration", "Number", 0);
            O(this, "nearNonce", "");
            O(this, "objectEncoding", 0);
            O(this, "peerStreams", null);
            R(this, "soundTransform", "flash.media.SoundTransform", null);
            R(this, "useHardwareDecoder", "Boolean", !1);
            R(this, "useJitterBuffer", "Boolean", !1);
            R(this, "videoReliable",
                "Boolean", !1);
            R(this, "videoSampleAccess", "Boolean", !1);
            R(this, "videoStreamSettings", "flash.media.VideoStreamSettings", null);
            a = x(this);
            a.Dk = 0;
            a.Tg = .1;
            a.fd = 0;
            a.gd = 0;
            a.bl = 0;
            a.time = 0;
            a.client = null
        },
        Ur = P(Tr, "flash.net.NetStream", U);
    M(Ur, "bufferTime", function() {
        return x(this).Tg
    });
    N(Ur, "bufferTime", function(a) {
        x(this).Tg = +a
    });
    M(Ur, "bufferLength", function() {
        return x(this).Dk
    });
    M(Ur, "bytesLoaded", function() {
        return x(this).fd
    });
    M(Ur, "bytesTotal", function() {
        return x(this).gd
    });
    M(Ur, "currentFPS", function() {
        return x(this).bl
    });
    M(Ur, "time", function() {
        return x(this).time
    });
    M(Ur, "client", function() {
        return x(this).client
    });
    N(Ur, "client", function(a) {
        x(this).client = a
    });
    Object.defineProperty(Ur, "CONNECT_TO_FMS", {
        value: "connectToFMS"
    });
    Object.defineProperty(Ur, "DIRECT_CONNECTIONS", {
        value: "directConnections"
    });
    Tr.prototype.appendBytes = function(a) {
        Q(a, Vr);
        S(this, "appendBytes")
    };
    Tr.prototype.appendBytesAction = function() {
        S(this, "appendBytesAction")
    };
    Tr.prototype.attach = function(a) {
        Q(a, Pr);
        S(this, "attach")
    };
    Tr.prototype.attachAudio = function() {
        S(this, "attachAudio")
    };
    Tr.prototype.attachCamera = function() {
        S(this, "attachCamera")
    };
    Tr.prototype.close = function() {
        S(this, "close")
    };
    Tr.prototype.dispose = function() {
        S(this, "dispose")
    };
    Tr.prototype.onPeerConnect = function(a) {
        Q(a, Ur);
        S(this, "onPeerConnect");
        return !1
    };
    Tr.prototype.pause = function() {
        S(this, "pause")
    };
    Tr.prototype.play = function() {
        S(this, "play")
    };
    Tr.prototype.play2 = function(a) {
        Q(a, Rr);
        S(this, "play2")
    };
    Tr.prototype.preloadEmbeddedData = function(a) {
        Q(a, Rr);
        S(this, "preloadEmbeddedData")
    };
    Tr.prototype.publish = function() {
        S(this, "publish")
    };
    Tr.prototype.receiveAudio = function() {
        S(this, "receiveAudio")
    };
    Tr.prototype.receiveVideo = function() {
        S(this, "receiveVideo")
    };
    Tr.prototype.receiveVideoFPS = function() {
        S(this, "receiveVideoFPS")
    };
    Ur.resetDRMVouchers = function() {
        S(this, "resetDRMVouchers")
    };
    Tr.prototype.resume = function() {
        S(this, "resume")
    };
    Tr.prototype.seek = function() {
        S(this, "seek");
        Xp(this, new mq("netStatus", !1, !1, {
            code: "NetStream.SeekStart.Notify",
            level: "status"
        }))
    };
    Tr.prototype.send = function() {
        S(this, "send")
    };
    Tr.prototype.step = function() {
        S(this, "step")
    };
    Tr.prototype.togglePause = function() {
        S(this, "togglePause")
    };
    var Wr = function() {
            jr.call(this);
            this.deblocking = 0;
            this.smoothing = !1
        },
        Xr = P(Wr, "flash.media.Video", jr);
    ho(Wr, function(a, b) {
        return new ti(ui, a, b)
    });
    M(Xr, "deblocking", function() {
        return x(this).deblocking
    });
    N(Xr, "deblocking", function(a) {
        x(this).deblocking = a | 0
    });
    M(Xr, "smoothing", function() {
        return x(this).smoothing
    });
    N(Xr, "smoothing", function(a) {
        x(this).smoothing = !!a
    });
    M(Xr, "videoHeight", function() {
        return 0
    });
    M(Xr, "videoWidth", function() {
        return 0
    });
    Wr.prototype.attachCamera = function() {
        S(this, "attachCamera")
    };
    Wr.prototype.attachNetStream = function(a) {
        Q(a, Ur);
        S(this, "attachNetStream")
    };
    Wr.prototype.clear = function() {
        S(this, "clear")
    };
    var V = fo(2012);
    V.Ne = function(a) {
        return x(a)
    };
    V.Fo = function() {
        var a = $n(V.m);
        U.call(a);
        var b = V.Ne(a);
        b.client = a;
        b.Lq = V.cl;
        b.data = {};
        return a
    };
    V.Aq = {};
    V.cl = Sr.m.AMF3;
    V.m = P(V, "flash.net.SharedObject", U);
    M(V.m, "client", function() {
        return V.Ne(this).client
    });
    N(V.m, "client", function(a) {
        if (null == a) throw J(2004);
        V.Ne(this).client = a
    });
    L(V.m, "clear", function() {
        S(this, "clear");
        V.Ne(this).data = {}
    });
    L(V.m, "close", function() {
        S(this, "close")
    });
    L(V.m, "connect", function(a) {
        Q(a, Pr);
        S(this, "connect")
    });
    M(V.m, "data", function() {
        return V.Ne(this).data
    });
    Object.defineProperty(V.m, "defaultObjectEncoding", {
        get: function() {
            return V.cl
        },
        set: function(a) {
            V.cl = a >>> 0
        }
    });
    L(V.m, "flush", function() {
        S(this, "flush");
        return Yr.m.FLUSHED
    });
    N(V.m, "fps", function() {
        S(this, "fps")
    });
    V.m.getLocal = function(a) {
        Io(a, "name");
        a = String(a);
        S(this, "getLocal");
        var b = V.Aq[a];
        b || (V.Aq[a] = b = V.Fo());
        return b
    };
    V.m.getRemote = function(a) {
        Io(a, "name");
        S(this, "getRemote");
        return V.Fo()
    };
    M(V.m, "objectEncoding", function() {
        return V.Ne(this).Lq
    });
    N(V.m, "objectEncoding", function(a) {
        a >>>= 0;
        S(this, "objectEncoding");
        if (a != Sr.m.AMF0 && a != Sr.m.AMF3) throw J(2008, "objectEncoding");
        V.Ne(this).Lq = a
    });
    L(V.m, "send", function() {
        S(this, "send")
    });
    L(V.m, "setDirty", function(a) {
        Io(a, "propertyName");
        S(this, "setDirty")
    });
    L(V.m, "setProperty", function() {
        S(this, "setProperty")
    });
    M(V.m, "size", function() {
        S(this, "size");
        return 0
    });
    var Yr = fo(2012);
    Yr.m = P(Yr, "flash.net.SharedObjectFlushStatus");
    Object.defineProperty(Yr.m, "FLUSHED", {
        value: "flushed"
    });
    Object.defineProperty(Yr.m, "PENDING", {
        value: "pending"
    });
    var Zr = function() {
        U.call(this);
        O(this, "bytesAvailable", 0);
        O(this, "bytesPending", 0);
        O(this, "connected", !1);
        R(this, "endian", "String", "bigEndian");
        R(this, "objectEncoding", "uint", 0);
        R(this, "timeout", "uint", 0)
    };
    P(Zr, "flash.net.Socket", U);
    Zr.prototype.close = function() {
        S(this, "close")
    };
    Zr.prototype.connect = function() {
        S(this, "connect")
    };
    Zr.prototype.flush = function() {
        S(this, "flush")
    };
    Zr.prototype.readBoolean = function() {
        S(this, "readBoolean");
        return !1
    };
    Zr.prototype.readByte = function() {
        S(this, "readByte");
        return 0
    };
    Zr.prototype.readBytes = function(a) {
        Q(a, Vr);
        S(this, "readBytes")
    };
    Zr.prototype.readDouble = function() {
        S(this, "readDouble");
        return 0
    };
    Zr.prototype.readFloat = function() {
        S(this, "readFloat");
        return 0
    };
    Zr.prototype.readInt = function() {
        S(this, "readInt");
        return 0
    };
    Zr.prototype.readMultiByte = function() {
        S(this, "readMultiByte");
        return ""
    };
    Zr.prototype.readObject = function() {
        S(this, "readObject");
        return null
    };
    Zr.prototype.readShort = function() {
        S(this, "readShort");
        return 0
    };
    Zr.prototype.readUnsignedByte = function() {
        S(this, "readUnsignedByte");
        return 0
    };
    Zr.prototype.readUnsignedInt = function() {
        S(this, "readUnsignedInt");
        return 0
    };
    Zr.prototype.readUnsignedShort = function() {
        S(this, "readUnsignedShort");
        return 0
    };
    Zr.prototype.readUTF = function() {
        S(this, "readUTF");
        return ""
    };
    Zr.prototype.readUTFBytes = function() {
        S(this, "readUTFBytes");
        return ""
    };
    Zr.prototype.writeBoolean = function() {
        S(this, "writeBoolean")
    };
    Zr.prototype.writeByte = function() {
        S(this, "writeByte")
    };
    Zr.prototype.writeBytes = function(a) {
        Q(a, Vr);
        S(this, "writeBytes")
    };
    Zr.prototype.writeDouble = function() {
        S(this, "writeDouble")
    };
    Zr.prototype.writeFloat = function() {
        S(this, "writeFloat")
    };
    Zr.prototype.writeInt = function() {
        S(this, "writeInt")
    };
    Zr.prototype.writeMultiByte = function() {
        S(this, "writeMultiByte")
    };
    Zr.prototype.writeObject = function() {
        S(this, "writeObject")
    };
    Zr.prototype.writeShort = function() {
        S(this, "writeShort")
    };
    Zr.prototype.writeUnsignedInt = function() {
        S(this, "writeUnsignedInt")
    };
    Zr.prototype.writeUTF = function() {
        S(this, "writeUTF")
    };
    Zr.prototype.writeUTFBytes = function() {
        S(this, "writeUTFBytes")
    };
    var as = function(a) {
        U.call(this);
        a = Q(a, Ir);
        R(this, "bytesLoaded", "uint", 0);
        R(this, "bytesTotal", "uint", 0);
        this.data = void 0;
        R(this, "dataFormat", "String", $r.TEXT);
        a && this.load(a)
    };
    P(as, "flash.net.URLLoader", U);
    as.prototype.close = function() {
        S(this, "close")
    };
    as.prototype.load = function(a) {
        a = Q(a, Ir);
        S(this, "load");
        Xp(this, new Hp("open"));
        var b = this;
        ej(a.url, null, a.method, a.data ? a.data.toString() : null, {
            Lb: function() {},
            jb: function() {},
            ib: function() {},
            zb: function(a) {
                b.bytesLoaded = 1024;
                b.bytesTotal = 1024;
                Xp(b, new oq("progress", !1, !1, 1024, 1024));
                Xp(b, new Qp("httpStatus", !1, !1, 400));
                b.data = a;
                Xp(b, new Hp("complete"))
            }
        }, bs(a))
    };
    var $r = P(function() {}, "flash.net.URLLoaderDataFormat");
    O($r, "BINARY", "binary");
    O($r, "TEXT", "text");
    O($r, "VARIABLES", "variables");
    var cs = P(function(a, b) {
        Vd(this, {
            name: qo(a, ""),
            value: qo(b, "")
        })
    }, "flash.net.URLRequestHeader");
    M(cs, "name", function() {
        return x(this).name
    });
    N(cs, "name", function(a) {
        x(this).name = po(a)
    });
    M(cs, "value", function() {
        return x(this).value
    });
    N(cs, "value", function(a) {
        x(this).value = po(a)
    });
    var bs = function(a) {
            return a.requestHeaders.map(function(a) {
                a = Q(a, cs);
                return x(a)
            })
        },
        Ir = P(function(a) {
            a = po(a);
            R(this, "contentType", "String", null);
            R(this, "data", "Object", null);
            R(this, "digest", "String", "");
            R(this, "method", "String", Kr.GET);
            O(this, "requestHeaders", []);
            R(this, "url", "String", a)
        }, "flash.net.URLRequest");
    var ds = function() {},
        Kr = P(ds, "flash.net.URLRequestMethod");
    O(Kr, "DELETE", "DELETE");
    O(Kr, "GET", "GET");
    O(Kr, "HEAD", "HEAD");
    O(Kr, "OPTIONS", "OPTIONS");
    O(Kr, "POST", "POST");
    O(ds, "PUT", "PUT");
    var es = function(a) {
        a = po(a);
        null != a && this.decode(a)
    };
    P(es, "flash.net.URLVariables");
    Object.defineProperty(es.prototype, "decode", {
        value: function(a) {
            a = String(a);
            var b = this;
            hi(a, function(a, d) {
                if (!l(d)) throw J(2101);
                var e = b[a];
                da(e) ? e.push(d) : b[a] = null != e ? [e, d] : d
            })
        }
    });
    Object.defineProperty(es.prototype, "toString", {
        value: function() {
            return fi(this)
        }
    });
    var fs = P(function() {}, "flash.system.Capabilities");
    Object.defineProperty(fs, "avHardwareDisable", {
        value: !1
    });
    Object.defineProperty(fs, "cpuArchitecture", {
        value: ""
    });
    Object.defineProperty(fs, "hasAccessibility", {
        value: !1
    });
    Object.defineProperty(fs, "hasAudio", {
        value: !1
    });
    Object.defineProperty(fs, "hasAudioEncoder", {
        value: !1
    });
    Object.defineProperty(fs, "hasEmbeddedVideo", {
        value: !1
    });
    Object.defineProperty(fs, "hasIME", {
        value: !1
    });
    Object.defineProperty(fs, "hasMP3", {
        value: !1
    });
    Object.defineProperty(fs, "hasPrinting", {
        value: !1
    });
    Object.defineProperty(fs, "hasScreenBroadcast", {
        value: !1
    });
    Object.defineProperty(fs, "hasScreenPlayback", {
        value: !1
    });
    Object.defineProperty(fs, "hasStreamingAudio", {
        value: !0
    });
    Object.defineProperty(fs, "hasStreamingVideo", {
        value: !0
    });
    Object.defineProperty(fs, "hasTLS", {
        value: !1
    });
    Object.defineProperty(fs, "hasVideoEncoder", {
        value: !1
    });
    Object.defineProperty(fs, "isDebugger", {
        value: !1
    });
    Object.defineProperty(fs, "isEmbeddedInAcrobat", {
        value: !1
    });
    Object.defineProperty(fs, "language", {
        value: ""
    });
    Object.defineProperty(fs, "localFileReadDisable", {
        value: !0
    });
    Object.defineProperty(fs, "manufacturer", {
        value: ""
    });
    Object.defineProperty(fs, "maxLevelIDC", {
        value: "5.1"
    });
    Object.defineProperty(fs, "os", {
        get: function() {
            return "Windows 7"
        }
    });
    Object.defineProperty(fs, "pixelAspectRatio", {
        value: 1
    });
    Object.defineProperty(fs, "playerType", {
        value: "PlugIn"
    });
    Object.defineProperty(fs, "screenColor", {
        value: "color"
    });
    Object.defineProperty(fs, "screenDPI", {
        value: 72
    });
    Object.defineProperty(fs, "screenResolutionX", {
        get: function() {
            return screen.width
        }
    });
    Object.defineProperty(fs, "screenResolutionY", {
        get: function() {
            return screen.height
        }
    });
    Object.defineProperty(fs, "serverString", {
        get: function() {
            var a = [],
                b;
            for (b in gs) {
                var c = gs[b],
                    c = ia(c) ? c(this) : this[c],
                    c = !0 === c ? "t" : !1 === c ? "f" : encodeURIComponent(c);
                a.push(b + "=" + c)
            }
            return a.join("&")
        }
    });
    Object.defineProperty(fs, "supports32BitProcesses", {
        value: !1
    });
    Object.defineProperty(fs, "supports64BitProcesses", {
        value: !1
    });
    Object.defineProperty(fs, "touchscreenType", {
        value: ""
    });
    Object.defineProperty(fs, "version", {
        get: function() {
            return "HTML 11,0,0,0"
        }
    });
    fs.hasMultiChannelAudio = function() {
        S(this, "hasMultiChannelAudio");
        return !1
    };
    var hs = function(a) {
            return function(b) {
                return b.hasMultiChannelAudio(a)
            }
        },
        gs = {
            A: "hasAudio",
            SA: "hasStreamingAudio",
            SV: "hasStreamingVideo",
            EV: "hasEmbeddedVideo",
            MP3: "hasMP3",
            AE: "hasAudioEncoder",
            VE: "hasVideoEncoder",
            ACC: "hasAccessibility",
            PR: "hasPrinting",
            SP: "hasScreenPlayback",
            SB: "hasScreenBroadcast",
            DEB: "isDebugger",
            V: "version",
            M: "manufacturer",
            R: function(a) {
                return a.screenResolutionX + "x" + a.screenResolutionY
            },
            COL: "screenColor",
            AR: "pixelAspectRatio",
            OS: "os",
            ARCH: "cpuArchitecture",
            L: "language",
            PR32: "supports32BitProcesses",
            PR64: "supports64BitProcesses",
            PT: "playerType",
            AVD: "avHardwareDisable",
            LFD: "localFileReadDisable",
            WD: function() {
                return !1
            },
            TLS: "hasTLS",
            ML: "maxLevelIDC",
            DP: "screenDPI",
            IME: "hasIME",
            DD: hs("DolbyDigital"),
            DDP: hs("DolbyDigitalPlus"),
            DTS: hs("DTS"),
            DTE: hs("DTSExpress"),
            DTH: hs("DTSHDHighResolutionAudio"),
            DTM: hs("DTSHDMasterAudio")
        };
    var ks = function(a, b, c) {
            a = !!a;
            b = Q(b, is);
            c = Q(c, js);
            R(this, "allowCodeImport", "Boolean", !0);
            R(this, "applicationDomain", "flash.system.ApplicationDomain", b);
            R(this, "checkPolicyFile", "Boolean", a);
            R(this, "imageDecodingPolicy", "String", "onDemand");
            R(this, "parameters", "Object", null);
            R(this, "requestedContentParent", "flash.display.DisplayObjectContainer", null);
            R(this, "securityDomain", "flash.system.SecurityDomain", c)
        },
        ls = P(ks, "flash.system.LoaderContext");
    var ms = function() {
            or.call(this);
            var a = new bq;
            O(this, "contentLoaderInfo", a);
            a = a.__swiffy_d;
            a.yx(r.Of().Zc);
            a.yq = this;
            O(this, "uncaughtErrorEvents", null)
        },
        ns = P(ms, "flash.display.Loader", ur);
    ho(ns, function(a, b) {
        return a.X.definition.Ji().ub(a, null, b)
    });
    Object.defineProperty(ms.prototype, "content", {
        get: function() {
            return this.contentLoaderInfo.content
        }
    });
    ms.prototype.close = function() {
        S(this, "close")
    };
    ms.prototype.load = function(a, b) {
        a = Q(a, Ir);
        b = Q(b, ls);
        S(this, "load");
        var c = b || new ks,
            d = c.applicationDomain ? x(c.applicationDomain) : r.Ed.Uk(),
            e = a.url,
            f = this.contentLoaderInfo,
            h = f.__swiffy_d;
        ii(e, ji(h.ym));
        var k = this,
            n = this.__swiffy_d;
        nj(e, n.i, d, a.method, a.data ? a.data.toString() : null, {
            Lb: function() {
                k.unload();
                f.dispatchEvent(new Hp("open"))
            },
            jb: function(a, b) {
                h.fd = a;
                h.gd = b;
                f.dispatchEvent(new oq("progress", !1, !1, a, b))
            },
            zb: function(a, b) {
                var f = a.ub(n.i, null);
                f.$r(!0);
                f.ac = !0;
                f.Ob(n.i.Bh());
                f.Zr(h);
                f.na();
                h.Kc = d;
                h.Ag(e);
                h.content = f.o;
                var k = hj(e);
                h.contentType = ij[k] || null;
                k = c.requestedContentParent ? c.requestedContentParent.__swiffy_d : n;
                k.Te(f, k.He());
                k.i.eb();
                n.i.da().im(h, b);
                n.i.eb()
            },
            ib: function(a) {
                f.dispatchEvent(new Qp("httpStatus", !1, !1, a));
                200 == a ? f.dispatchEvent(yq(2124, e)) : f.dispatchEvent(yq(2035, e))
            }
        }, bs(a))
    };
    ms.prototype.loadBytes = function(a, b) {
        Q(a, Vr);
        Q(b, ls);
        S(this, "loadBytes")
    };
    ms.prototype.loadFilePromise = function(a, b) {
        Q(b, ls);
        S(this, "loadFilePromise")
    };
    ms.prototype.unload = function() {
        var a = this.__swiffy_d;
        a.He() && (a.pr(), a = this.contentLoaderInfo, a.__swiffy_d.reset(), a.dispatchEvent(new Hp("unload")))
    };
    ms.prototype.unloadAndStop = function() {
        S(this, "unloadAndStop");
        this.unload()
    };
    var os = fo(2012);
    os.m = P(os, "flash.system.Security");
    R(os.m, "exactSettings", "Boolean", !1);
    O(os.m, "pageDomain", void 0);
    O(os.m, "sandboxType", "remote");
    O(os.m, "LOCAL_TRUSTED", "localTrusted");
    O(os.m, "LOCAL_WITH_FILE", "localWithFile");
    O(os.m, "LOCAL_WITH_NETWORK", "localWithNetwork");
    O(os.m, "REMOTE", "remote");
    os.m.allowDomain = function() {
        S(os, "allowDomain")
    };
    os.m.allowInsecureDomain = function() {
        S(os, "allowInsecureDomain")
    };
    os.m.loadPolicyFile = function() {
        S(os, "loadPolicyFile")
    };
    os.m.showSettings = function() {
        S(os, "showSettings")
    };
    var ps = function() {},
        js = eo(ps, "flash.system.SecurityDomain", {
            Sd: function() {
                throw J(2012, "SecurityDomain");
            }
        });
    O(js, "currentDomain", new ps);
    var qs = P(function() {}, "flash.text.AntiAliasType");
    O(qs, "ADVANCED", "advanced");
    O(qs, "NORMAL", "normal");
    var rs = function(a, b, c, d, e, f) {
            a = qo(a, "_serif");
            b = qo(b, "normal");
            c = qo(c, "normal");
            d = qo(d, "device");
            e = qo(e, "cff");
            f = qo(f, "horizontalStem");
            R(this, "cffHinting", "String", f);
            R(this, "fontLookup", "String", d);
            R(this, "fontName", "String", a);
            R(this, "fontPosture", "String", c);
            R(this, "fontWeight", "String", b);
            R(this, "locked", "Boolean", !1);
            R(this, "renderingMode", "String", e)
        },
        ss = P(rs, "flash.text.engine.FontDescription");
    rs.prototype.clone = function() {
        return new rs(this.fontName, this.fontWeight, this.fontPosture, this.fontLookup, this.renderingMode, this.ccfHinting)
    };
    ss.isDeviceFontCompatible = function() {
        S(this, "isDeviceFontCompatible");
        return !1
    };
    ss.isFontCompatible = function() {
        S(this, "isFontCompatible");
        return !1
    };
    var ts = P(function() {}, "flash.text.engine.FontPosture");
    Object.defineProperty(ts, "ITALIC", {
        value: "italic"
    });
    Object.defineProperty(ts, "NORMAL", {
        value: "normal"
    });
    var us = P(function() {}, "flash.text.engine.FontWeight");
    Object.defineProperty(us, "BOLD", {
        value: "bold"
    });
    Object.defineProperty(us, "NORMAL", {
        value: "normal"
    });
    var vs = P(function() {}, "flash.text.FontStyle");
    O(vs, "BOLD", "bold");
    O(vs, "BOLD_ITALIC", "boldItalic");
    O(vs, "ITALIC", "italic");
    O(vs, "REGULAR", "regular");
    var ws = P(function() {}, "flash.text.FontType");
    O(ws, "DEVICE", "device");
    O(ws, "EMBEDDED", "embedded");
    O(ws, "EMBEDDED_CFF", "embeddedCFF");
    var xs = function() {},
        ys = P(xs, "flash.text.Font");
    Object.defineProperty(xs.prototype, "fontName", {
        get: function() {
            var a = x(this);
            return a ? a.name : null
        }
    });
    Object.defineProperty(xs.prototype, "fontStyle", {
        get: function() {
            var a = x(this);
            return a ? a.bold ? a.italic ? vs.BOLD_ITALIC : vs.BOLD : a.italic ? vs.ITALIC : vs.REGULAR : null
        }
    });
    Object.defineProperty(xs.prototype, "fontType", {
        get: function() {
            return x(this) ? ws.EMBEDDED : null
        }
    });
    ys.enumerateFonts = function() {
        var a = [],
            b = r.i.Md,
            c;
        for (c in b)
            for (var d = b[c], e = 0; e < d.length; e++) {
                var f = new xs;
                Vd(f, d[e]);
                a.push(f)
            }
        return a
    };
    xs.prototype.hasGlyphs = function(a) {
        a = String(a);
        var b = x(this);
        if (!b) return !1;
        for (var c = 0; c < a.length; c++)
            if (!b.zl(a.charAt(c))) return !1;
        return !0
    };
    ys.registerFont = function(a) {
        Q(a, Kn);
        throw J(1508, "font");
    };
    var zs = P(function() {}, "flash.text.TextFieldAutoSize");
    O(zs, "CENTER", "center");
    O(zs, "LEFT", "left");
    O(zs, "NONE", "none");
    O(zs, "RIGHT", "right");
    var As = P(function() {}, "flash.text.TextFieldType");
    O(As, "DYNAMIC", "dynamic");
    O(As, "INPUT", "input");
    var Cs = function(a, b, c, d, e, f, h, k, n, q, u, p, t) {
            Vd(this, new xe);
            Se.call(this, a);
            hf.call(this, b);
            Qe.call(this, c);
            Me.call(this, d);
            We.call(this, e);
            of.call(this, f);
            qf.call(this, h);
            kf.call(this, k);
            Bs.call(this, n);
            bf.call(this, q);
            ff.call(this, u);
            Ue.call(this, p);
            $e.call(this, t)
        },
        Ds = P(Cs, "flash.text.TextFormat"),
        Es = function(a) {
            var b = $n(Cs);
            Vd(b, a);
            return b
        },
        Bs = function(a) {
            if (!Ie.call(this, a)) throw J(2008, "align");
        };
    Object.defineProperties(Cs.prototype, {
        align: {
            get: He,
            set: Bs
        },
        blockIndent: {
            get: Je,
            set: Ke
        },
        bold: {
            get: Le,
            set: Me
        },
        bullet: {
            get: Ne,
            set: Oe
        },
        color: {
            get: Pe,
            set: Qe
        },
        font: {
            get: Re,
            set: Se
        },
        indent: {
            get: Te,
            set: Ue
        },
        italic: {
            get: Ve,
            set: We
        },
        kerning: {
            get: Xe,
            set: Ye
        },
        leading: {
            get: Ze,
            set: $e
        },
        leftMargin: {
            get: af,
            set: bf
        },
        letterSpacing: {
            get: cf,
            set: df
        },
        rightMargin: {
            get: ef,
            set: ff
        },
        size: {
            get: gf,
            set: hf
        },
        tabStops: {
            get: lf,
            set: function(a) {
                a = Q(a, Array);
                mf.call(this, a)
            }
        },
        target: {
            get: jf,
            set: kf
        },
        underline: {
            get: nf,
            set: of
        },
        url: {
            get: pf,
            set: qf
        }
    });
    var Fs = P(function() {}, "flash.text.TextFormatAlign");
    O(Fs, "CENTER", "center");
    O(Fs, "END", "end");
    O(Fs, "JUSTIFY", "justify");
    O(Fs, "LEFT", "left");
    O(Fs, "RIGHT", "right");
    O(Fs, "START", "start");
    var Gs = function(a, b, c, d, e, f) {
        R(this, "ascent", "Number", d);
        R(this, "descent", "Number", e);
        R(this, "height", "Number", c);
        R(this, "leading", "Number", f);
        R(this, "width", "Number", b);
        R(this, "x", "Number", a)
    };
    P(Gs, "flash.text.TextLineMetrics");
    var Hs = function() {
            or.call(this)
        },
        Is = P(Hs, "flash.text.TextField", or);
    ho(Hs, function(a, b) {
        return (new Zj({
            id: 0,
            height: 240,
            html: !0,
            selectable: !0,
            leftMargin: 0,
            rightMargin: 0
        }, new Oc(0, 0, 2E3, 2E3), a.vc)).ub(a, null, b)
    });
    M(Is, "textHeight", function() {
        return y(this).Jl() / 20
    });
    M(Is, "textWidth", function() {
        return y(this).Kl() / 20
    });
    Hs.prototype.appendText = function(a) {
        if (null != a) {
            var b = y(this);
            b.Yc(b.sa + rj(String(a)))
        } else throw J(2007, "text");
    };
    Hs.prototype.getTextFormat = function(a, b) {
        var c = y(this).Qp(a, b);
        return Es(c)
    };
    Hs.prototype.setTextFormat = function(a, b, c) {
        a = Q(a, Ds);
        Io(a, "format");
        y(this).gk(x(a), b, c)
    };
    Hs.prototype.getLineMetrics = function(a) {
        a = y(this).cv(a | 0);
        if (!a) throw J(2006, "lineIndex");
        return new Gs(a.x / 20, a.width / 20, a.height / 20, a.ascent / 20, a.descent / 20, a.leading / 20)
    };
    Object.defineProperty(Hs.prototype, "text", {
        get: function() {
            return y(this).pj()
        },
        set: function(a) {
            a = String(a);
            y(this).hs(a)
        }
    });
    Object.defineProperty(Hs.prototype, "condenseWhite", {
        get: function() {
            return y(this).Gi
        },
        set: function(a) {
            y(this).Wr(!!a)
        }
    });
    Object.defineProperty(Hs.prototype, "htmlText", {
        get: function() {
            return y(this).Cp()
        },
        set: function(a) {
            var b = y(this),
                c = ye();
            c.color = 4278190080;
            b.gk(c);
            b.Yc(String(a))
        }
    });
    Object.defineProperty(Hs.prototype, "length", {
        get: function() {
            return y(this).pj().length
        }
    });
    Object.defineProperty(Hs.prototype, "textColor", {
        get: function() {
            return y(this).Pp()
        },
        set: function(a) {
            y(this).ms(a)
        }
    });
    Object.defineProperty(Hs.prototype, "autoSize", {
        get: function() {
            return y(this).ed
        },
        set: function(a) {
            switch (a) {
                case "center":
                case "left":
                case "none":
                case "right":
                    break;
                default:
                    throw J(2008, "autoSize");
            }
            y(this).Qr(a)
        }
    });
    Object.defineProperty(Hs.prototype, "selectable", {
        get: function() {
            return y(this).Xh
        },
        set: function(a) {
            y(this).js(!!a)
        }
    });
    Object.defineProperty(Hs.prototype, "border", {
        get: function() {
            return y(this).Ai
        },
        set: function(a) {
            y(this).Sr(!!a)
        }
    });
    Object.defineProperty(Hs.prototype, "borderColor", {
        get: function() {
            return y(this).zi
        },
        set: function(a) {
            y(this).Tr(Number(a))
        }
    });
    Object.defineProperty(Hs.prototype, "background", {
        get: function() {
            return y(this).wi
        },
        set: function(a) {
            y(this).ug(!!a)
        }
    });
    Object.defineProperty(Hs.prototype, "backgroundColor", {
        get: function() {
            return y(this).vi
        },
        set: function(a) {
            y(this).Rr(Number(a))
        }
    });
    Object.defineProperty(Hs.prototype, "type", {
        get: function() {
            return y(this).Zi ? As.INPUT : As.DYNAMIC
        },
        set: function(a) {
            switch (a) {
                case As.DYNAMIC:
                    a = !1;
                    break;
                case As.INPUT:
                    a = !0;
                    break;
                default:
                    throw J(2008, "type");
            }
            y(this).Om(a)
        }
    });
    Object.defineProperty(Hs.prototype, "antiAliasType", {
        get: function() {
            return "advanced" == y(this).xk ? qs.ADVANCED : qs.NORMAL
        },
        set: function(a) {
            y(this).Pr(a == qs.ADVANCED ? "advanced" : "normal")
        }
    });
    Object.defineProperty(Hs.prototype, "numLines", {
        get: function() {
            return y(this).gc.length
        }
    });
    Hs.prototype.getLineText = function(a) {
        a = y(this).ev(a);
        if (null === a) throw new RangeError;
        return a
    };
    Object.defineProperty(Hs.prototype, "multiline", {
        get: function() {
            return y(this).Ve
        },
        set: function(a) {
            y(this).cs(!!a)
        }
    });
    Object.defineProperty(Hs.prototype, "wordWrap", {
        get: function() {
            return y(this).Gg
        },
        set: function(a) {
            y(this).os(!!a)
        }
    });
    Object.defineProperty(Hs.prototype, "embedFonts", {
        get: function() {
            return y(this).Ff
        },
        set: function(a) {
            y(this).Xr(!!a)
        }
    });
    Object.defineProperty(Hs.prototype, "defaultTextFormat", {
        get: function() {
            return Es(y(this).Hp())
        },
        set: function(a) {
            a = Q(a, Ds);
            Io(a, "format");
            y(this).es(x(a))
        }
    });
    Object.defineProperty(Hs.prototype, "restrict", {
        get: function() {
            return y(this).Km
        },
        set: function(a) {
            a = po(a);
            y(this).fs(a)
        }
    });
    Object.defineProperty(Hs.prototype, "maxChars", {
        get: function() {
            return y(this).nm
        },
        set: function(a) {
            y(this).as(a | 0)
        }
    });
    Hs.prototype.getLineOffset = function(a) {
        a = y(this).dv(a | 0);
        if (-1 === a) throw J(2006);
        return a
    };
    Hs.prototype.getLineIndexOfChar = function(a) {
        a = y(this).bv(a | 0);
        if (-1 === a) throw J(2006);
        return a
    };
    var Ks = function() {
        for (var a = Js, b = 0; b < a.length; ++b) R(this, a[b], "Boolean", !0)
    };
    P(Ks, "flash.ui.ContextMenuBuiltInItems");
    var Js = "forwardAndBack loop play print quality rewind save zoom".split(" ");
    Ks.prototype.clone = function() {
        for (var a = new Ks, b = Js, c = 0; c < b.length; ++c) a[b[c]] = this[b[c]];
        return a
    };
    var Ms = function() {
        for (var a = Ls, b = 0; b < a.length; ++b) R(this, a[b], "Boolean", !0)
    };
    P(Ms, "flash.ui.ContextMenuClipboardItems");
    var Ls = ["clear", "copy", "cut", "paste", "selectAll"];
    Ms.prototype.clone = function() {
        for (var a = new Ms, b = Ls, c = 0; c < b.length; ++c) a[b[c]] = this[b[c]];
        return a
    };
    var Ns = function() {
            U.call(this);
            R(this, "builtInItems", "flash.ui.ContextMenuBuiltInItems", new Ks);
            R(this, "clipboardItems", "flash.ui.ContextMenuClipboardItems", new Ms);
            R(this, "clipboardMenu", "Boolean", !1);
            R(this, "customItems", "Array", []);
            R(this, "link", "flash.net.URLRequest", null)
        },
        Os = P(Ns, "flash.ui.ContextMenu", gq);
    Object.defineProperty(Os, "isSupported", {
        value: !1
    });
    Ns.prototype.clone = function() {
        Io(this.builtInItems, "builtInItems");
        Io(this.clipboardItems, "clipboardItems");
        Io(this.customItems, "customItems");
        var a = new Ns;
        a.builtInItems = this.builtInItems.clone();
        a.clipboardItems = this.clipboardItems.clone();
        a.customItems = this.customItems.map(function(a) {
            return hn(a, a.clone, [], "clone")
        });
        a.clipboardMenu = this.clipboardMenu;
        a.isSupported = this.isSupported;
        a.link = this.link;
        return a
    };
    Ns.prototype.hideBuiltInItems = function() {
        for (var a = Js, b = 0; b < a.length; ++b) this.builtInItems[a[b]] = !1
    };
    var Ps = function(a, b, c, d) {
            U.call(this);
            a = String(a);
            b = !!b;
            d = !l(d) || !!d;
            R(this, "caption", "String", a);
            R(this, "separatorBefore", "Boolean", b);
            R(this, "visible", "Boolean", d)
        },
        Qs = P(Ps, "flash.ui.ContextMenuItem", hq);
    Ps.prototype.clone = function() {
        return new Ps(this.caption, this.separatorBefore, this.enabled, this.visible)
    };
    Qs.systemClearMenuItem = function() {
        S(this, "systemClearMenuItem");
        return null
    };
    Qs.systemCopyLinkMenuItem = function() {
        S(this, "systemCopyLinkMenuItem");
        return null
    };
    Qs.systemCopyMenuItem = function() {
        S(this, "systemCopyMenuItem");
        return null
    };
    Qs.systemCutMenuItem = function() {
        S(this, "systemCutMenuItem");
        return null
    };
    Qs.systemOpenLinkMenuItem = function() {
        S(this, "systemOpenLinkMenuItem");
        return null
    };
    Qs.systemPasteMenuItem = function() {
        S(this, "systemPasteMenuItem");
        return null
    };
    Qs.systemSelectAllMenuItem = function() {
        S(this, "systemSelectAllMenuItem");
        return null
    };
    var Rs = P(function() {}, "flash.ui.Keyboard");
    O(Rs, "capsLock", !1);
    O(Rs, "hasVirtualKeyboard", !1);
    O(Rs, "numLock", !1);
    O(Rs, "physicalKeyboardType", "alphanumeric");
    Rs.isAccessible = function() {
        S(this, "isAccessible");
        return !1
    };
    var Ss = ["Up", "Down", "Left", "Right"],
        Ts = "Insert Delete Home Begin End PgUp PgDn PrntScrn ScrlLck Pause SysReq Break Reset Stop Menu User Sys Print ClrLn ClrDsp InsLn DelLn InsChr DelChr Prev Next Select Exec Undo Redo Find Help ModeSw".split(" "),
        Us = {
            PgUp: "PAGEUP",
            PgDn: "PAGEDOWN",
            PrntScrn: "PRINTSCREEN",
            ScrlLck: "SCROLLLOCK",
            Sys: "SYSTEM",
            ClrLn: "CLEARLINE",
            ClrDsp: "CLEARDISPLAY",
            InsLn: "INSERTLINE",
            DelLn: "DELETELINE",
            InsChr: "INSERTCHAR",
            DelChr: "DELETECHAR",
            Exec: "EXECUTE",
            ModeSw: "MODESWITCH"
        },
        Vs = "RED GREEN YELLOW BLUE CHANNEL_UP CHANNEL_DOWN RECORD PLAY PAUSE STOP FAST_FORWARD REWIND SKIP_FORWARD SKIP_BACKWARD NEXT PREVIOUS LIVE LAST MENU INFO GUIDE EXIT BACK AUDIO SUBTITLE DVR VOD INPUT SETUP HELP MASTER_SHELL SEARCH".split(" "),
        Ws = {
            BACKSPACE: 8,
            TAB: 9,
            ENTER: 13,
            COMMAND: 15,
            SHIFT: 16,
            CONTROL: 17,
            ALTERNATE: 18,
            CAPS_LOCK: 20,
            NUMPAD: 21,
            ESCAPE: 27,
            SPACE: 32,
            PAGE_UP: 33,
            PAGE_DOWN: 34,
            END: 35,
            HOME: 36,
            LEFT: 37,
            UP: 38,
            RIGHT: 39,
            DOWN: 40,
            INSERT: 45,
            DELETE: 46,
            NUMPAD_MULTIPLY: 106,
            NUMPAD_ADD: 107,
            NUMPAD_ENTER: 108,
            NUMPAD_SUBTRACT: 109,
            NUMPAD_DECIMAL: 110,
            NUMPAD_DIVIDE: 111,
            SEMICOLON: 186,
            EQUAL: 187,
            COMMA: 188,
            MINUS: 189,
            PERIOD: 190,
            SLASH: 191,
            BACKQUOTE: 192,
            LEFTBRACKET: 219,
            BACKSLASH: 220,
            RIGHTBRACKET: 221,
            QUOTE: 222
        },
        Xs = [];
    O(Rs, "CharCodeStrings", Xs);
    var Ys = function(a, b, c) {
            Xs.push(b);
            O(Rs, "KEYNAME_" + a, b);
            O(Rs, "STRING_" + a, String.fromCharCode(c))
        },
        Zs;
    for (Zs = 65; 90 >= Zs; ++Zs) O(Rs, String.fromCharCode(Zs), Zs);
    for (Zs = 0; 9 >= Zs; ++Zs) O(Rs, "NUMBER_" + Zs, 48 + Zs), O(Rs, "NUMPAD_" + Zs, 96 + Zs);
    for (Zs = 0; Zs < Vs.length; ++Zs) O(Rs, Vs[Zs], 16777216 + Zs);
    for (var $s in Ws) O(Rs, $s, Ws[$s]);
    for (Zs = 0; Zs < Ss.length; ++Zs) {
        var at = Ss[Zs];
        Ys(at.toUpperCase() + "ARROW", at, 63232 + Zs)
    }
    for (Zs = 1; 35 >= Zs; ++Zs) {
        var bt = "F" + Zs;
        Ys(bt, bt, 63235 + Zs);
        15 >= Zs && O(Rs, bt, 111 + Zs)
    }
    for (Zs = 0; Zs < Ts.length; ++Zs) {
        var ct = Ts[Zs];
        Ys(Us[ct] || ct.toUpperCase(), ct, 63271 + Zs)
    };
    var dt = eo(function() {}, "flash.ui.Mouse", {
        Sd: go
    });
    Object.defineProperties(dt, {
        supportsCursor: {
            value: !0
        },
        cursor: {
            get: function() {
                return r.i.va.Nf()
            },
            set: function(a) {
                Io(a, "cursor");
                a = String(a);
                if (!r.i.va.Xx(a)) throw J(2008, "cursor");
            }
        },
        hide: {
            value: function() {
                r.i.va.lj(!1)
            }
        },
        show: {
            value: function() {
                r.i.va.lj(!0)
            }
        }
    });
    var et = P(function() {}, "flash.ui.MouseCursor");
    mo(et, ["arrow", "auto", "button", "hand", "ibeam"]);
    var ft = P(function() {}, "flash.utils.CompressionAlgorithm");
    Object.defineProperties(ft, {
        DEFLATE: {
            value: "deflate"
        },
        ZLIB: {
            value: "zlib"
        }
    });
    var gt = {};
    var ht = function() {
            this.er = {}
        },
        it = null;
    ht.prototype.Qa = function(a) {
        var b = this.er[a];
        b || ((b = "@" === a.charAt(0)) && (a = a.substring(1)), b = this.er[a] = Lo("", a, b));
        return b
    };
    ht.prototype.Po = function(a, b, c) {
        var d = c ? Kn : b.__swiffy_baseclass;
        if (!d) return null;
        for (var e = [], f = d; f; f = f.__swiffy_baseclass) a.qe(this.Qa("extendsClass")).ic(this.Qa("@type"), f.__swiffy_name.Ja()), e[f.__swiffy_typeid] = !0;
        if (!c) {
            e[b.__swiffy_typeid] = !0;
            b = b.__swiffy_if;
            for (var h in b) e[h] || (c = b[h], a.qe(this.Qa("implementsInterface")).ic(this.Qa("@type"), c.__swiffy_name.Ja()))
        }
        return d
    };
    ht.prototype.ou = function(a, b) {
        for (var c in b.traits)
            if (!(0 <= c.indexOf("."))) {
                var d = b.traits[c],
                    e;
                d instanceof An ? (e = a.qe(this.Qa("accessor")), d.Pe && d.bf ? e.ic(this.Qa("@access"), "readwrite") : d.Pe ? e.ic(this.Qa("@access"), "readonly") : d.bf && e.ic(this.Qa("@access"), "writeonly")) : e = d instanceof yn ? a.qe(this.Qa("method")) : d.Nt ? a.qe(this.Qa("constant")) : a.qe(this.Qa("variable"));
                e.ic(this.Qa("@name"), c)
            }
    };
    Um.prototype.trace = function(a) {
        var b = Array.prototype.map.call(arguments, String).join(" ");
        this.__swiffy_vm.trace(b)
    };
    Um.prototype.parseInt = function(a, b) {
        !l(b) && tg(a) && (b = 10);
        return parseInt(a, b)
    };
    Um.prototype.parseFloat = parseFloat;
    Um.prototype.isNaN = isNaN;
    Um.prototype.isFinite = isFinite;
    Um.prototype["flash.utils.setTimeout"] = function(a, b) {
        for (var c = this, d = [], e = 2; e < arguments.length; ++e) d.push(arguments[e]);
        return Zf(function() {
            a.apply(c, d)
        }, b)
    };
    Um.prototype["flash.utils.clearTimeout"] = function(a) {
        bg(a)
    };
    Um.prototype["flash.utils.setInterval"] = function(a, b) {
        for (var c = this, d = [], e = 2; e < arguments.length; ++e) d.push(arguments[e]);
        return $f(function() {
            a.apply(c, d)
        }, b)
    };
    Um.prototype["flash.utils.clearInterval"] = function(a) {
        bg(a)
    };
    Um.prototype["flash.utils.getTimer"] = function() {
        return r.i.Sp()
    };
    Um.prototype["flash.utils.getDefinitionByName"] = function(a) {
        Io(a, "name");
        a = String(a);
        var b = this.__swiffy_vm.Ed;
        if (b.Nl(a)) return b.tl(a);
        throw J(1065, a);
    };
    Um.prototype["flash.utils.getQualifiedClassName"] = function(a) {
        switch (typeof a) {
            case "undefined":
                return "void";
            case "number":
                if ((a | 0) == a) return "int"
        }
        return $m(a).Ja()
    };
    Um.prototype["flash.utils.getQualifiedSuperclassName"] = function(a) {
        a: {
            if (null != a && (a = Zn(a).__swiffy_baseclass, null != a)) {
                a = a.__swiffy_name;
                break a
            }
            a = null
        }
        return a ? a.Ja() : a
    };
    Um.prototype["flash.utils.describeType"] = function(a) {
        var b;
        if (!l(a)) throw J(1010);
        it || (it = new ht);
        b = it;
        var c = new Wo(null, b.Qa("type"));
        if (null === a) c.ic(b.Qa("@name"), "null"), c.ic(b.Qa("@isStatic"), "false");
        else {
            var d = !!a.__swiffy_typeid;
            a = d ? a : a.__swiffy_classdef;
            var e = b.Po(c, a, d),
                f = a.__swiffy_name.Ja();
            c.ic(b.Qa("@name"), f);
            c.ic(b.Qa("@isStatic"), String(d));
            e && c.ic(b.Qa("@base"), e.__swiffy_name.Ja());
            e = c;
            d && (e = c.qe(b.Qa("factory")), e.ic(b.Qa("@type"), f), b.Po(e, a, !1));
            b.ou(e, a.__swiffy_traits)
        }
        b = c.be;
        return b
    };
    Um.prototype["flash.system.fscommand"] = function(a, b) {
        Io(a, "command");
        Sd(r.i, String(a), 2 > arguments.length ? "" : po(b))
    };
    Um.prototype.isXMLName = function(a) {
        return l(xd(a))
    };
    var jt = function(a, b) {
        Vm(a, function(c) {
            try {
                return null != c ? b(String(c)) : "null"
            } catch (d) {
                throw J(1052, a);
            }
        })
    };
    jt("escape", escape);
    jt("unescape", unescape);
    jt("encodeURI", encodeURI);
    jt("encodeURIComponent", encodeURIComponent);
    jt("decodeURI", decodeURI);
    jt("decodeURIComponent", decodeURIComponent);
    Vm("Math", Math);
    Pn("Date", function(a) {
        return a instanceof Date ? a : (new Date(Date.now())).toString()
    }, function(a) {
        if (a instanceof Date) return a;
        if (null == a) return null;
        throw J(1034, $m(a), "Date");
    }, eg);
    Um.prototype.Date.prototype = Date.prototype;
    Um.prototype.Date.UTC = Date.UTC;
    Mn(Function, Sn, Yn, Function, Function, On, null, "Function");
    Mn(Array, Sn, Yn, Array, Array, On, null, "Array");
    var kt = aa.RegExp;
    Mn(kt, Sn, Yn, kt, function(a, b) {
        if (a instanceof RegExp) {
            if (l(b)) throw J(1100);
            return new RegExp(a)
        }
        a = String(a);
        null != b && (b = String(b));
        return (new rn(a, b)).translate()
    }, On, null, "RegExp");
    Vm("undefined", void 0);
    Vm("null", null);
    Vm("Infinity", Infinity);
    Vm("NaN", NaN);
    Vm("AS3", No("http://adobe.com/AS3/2006/builtin"));
    Object.defineProperty(Object.prototype, "setPropertyIsEnumerable", {
        value: function(a, b) {
            a = String(a);
            b = !!b;
            var c = Object.getOwnPropertyDescriptor(this, a);
            c && c.configurable && c.enumerable != b && (c.enumerable = b, Object.defineProperty(this, a, c))
        }
    });
    var lt = function(a, b) {
        Object.defineProperty(a, Wm("http://adobe.com/AS3/2006/builtin", b), {
            value: function() {
                return this[b].apply(this, arguments)
            }
        })
    };
    lt(Object.prototype, "toLocaleString");
    lt(Object.prototype, "toString");
    lt(Object.prototype, "valueOf");
    var W = function(a, b) {
        Object.defineProperty(a, Wm("http://adobe.com/AS3/2006/builtin", b), {
            value: a[b]
        })
    };
    W(Object.prototype, "hasOwnProperty");
    W(Object.prototype, "isPrototypeOf");
    W(Object.prototype, "propertyIsEnumerable");
    W(Function.prototype, "apply");
    W(Function.prototype, "call");
    W(String, "fromCharCode");
    W(String.prototype, "charAt");
    W(String.prototype, "charCodeAt");
    W(String.prototype, "concat");
    W(String.prototype, "indexOf");
    W(String.prototype, "lastIndexOf");
    W(String.prototype, "localeCompare");
    W(String.prototype, "match");
    W(String.prototype, "replace");
    W(String.prototype, "search");
    W(String.prototype, "slice");
    W(String.prototype, "split");
    W(String.prototype, "substr");
    W(String.prototype, "substring");
    W(String.prototype, "toLocaleLowerCase");
    W(String.prototype, "toLocaleUpperCase");
    W(String.prototype, "toLowerCase");
    W(String.prototype, "toUpperCase");
    W(String.prototype, "toString");
    W(String.prototype, "valueOf");
    W(Array.prototype, "concat");
    W(Array.prototype, "every");
    W(Array.prototype, "filter");
    W(Array.prototype, "forEach");
    W(Array.prototype, "indexOf");
    W(Array.prototype, "join");
    W(Array.prototype, "lastIndexOf");
    W(Array.prototype, "map");
    W(Array.prototype, "pop");
    W(Array.prototype, "push");
    W(Array.prototype, "reverse");
    W(Array.prototype, "shift");
    W(Array.prototype, "slice");
    W(Array.prototype, "some");
    W(Array.prototype, "sort");
    W(Array.prototype, "sortOn");
    W(Array.prototype, "splice");
    W(Array.prototype, "unshift");
    W(Date.prototype, "getDate");
    W(Date.prototype, "getDay");
    W(Date.prototype, "getFullYear");
    W(Date.prototype, "getHours");
    W(Date.prototype, "getMilliseconds");
    W(Date.prototype, "getMinutes");
    W(Date.prototype, "getMonth");
    W(Date.prototype, "getSeconds");
    W(Date.prototype, "getTime");
    W(Date.prototype, "getTimezoneOffset");
    W(Date.prototype, "getUTCDate");
    W(Date.prototype, "getUTCDay");
    W(Date.prototype, "getUTCFullYear");
    W(Date.prototype, "getUTCHours");
    W(Date.prototype, "getUTCMilliseconds");
    W(Date.prototype, "getUTCMinutes");
    W(Date.prototype, "getUTCMonth");
    W(Date.prototype, "getUTCSeconds");
    W(Date.prototype, "setDate");
    W(Date.prototype, "setFullYear");
    W(Date.prototype, "setHours");
    W(Date.prototype, "setMilliseconds");
    W(Date.prototype, "setMinutes");
    W(Date.prototype, "setMonth");
    W(Date.prototype, "setSeconds");
    W(Date.prototype, "setTime");
    W(Date.prototype, "setUTCDate");
    W(Date.prototype, "setUTCFullYear");
    W(Date.prototype, "setUTCHours");
    W(Date.prototype, "setUTCMilliseconds");
    W(Date.prototype, "setUTCMinutes");
    W(Date.prototype, "setUTCMonth");
    W(Date.prototype, "setUTCSeconds");
    W(Date.prototype, "toDateString");
    W(Date.prototype, "toJSON");
    W(Date.prototype, "toLocaleDateString");
    W(Date.prototype, "toLocaleString");
    W(Date.prototype, "toLocaleTimeString");
    W(Date.prototype, "toTimeString");
    W(Date.prototype, "toUTCString");
    lt(RegExp.prototype, "exec");
    lt(RegExp.prototype, "test");
    var X = function(a, b, c) {
            Vd(this, a);
            c && mt(this, 0);
            R(this, "fixed", "Boolean", !!b);
            Object.defineProperty(this, "length", {
                get: function() {
                    return x(this).length
                },
                set: function(a) {
                    a >>>= 0;
                    if (this.fixed) throw J(1126);
                    var b = x(this).length;
                    x(this).length = a;
                    mt(this, b)
                }
            })
        },
        nt = function(a) {
            return x(a.__swiffy_classdef)
        },
        mt = function(a, b) {
            for (var c = x(a), d = nt(a).Xf ? 0 : null; b < c.length; b++) c[b] = d
        },
        ot = function(a, b, c) {
            if (null == b) return nt(a).Xf ? 0 : null;
            a = nt(a);
            return !a.type || c && !a.Xf ? b : Q(b, a.type)
        },
        pt = function(a, b) {
            var c = Object.create(a.prototype);
            X.call(c, b || []);
            return c
        };
    X.prototype = Object.create(On.prototype);
    var qt = function(a, b) {
            var c = function(a) {
                if (Rn(a, c)) return a;
                if (null == a || Object(a) !== a) throw J(1034, $m(a), c.__swiffy_name);
                var b = pt(c);
                a instanceof X && (a = x(a));
                if (da(a))
                    for (var f = x(b), h = 0; h < a.length; h++) f[h] = ot(b, a[h]);
                return b
            };
            Vd(c, {
                type: a,
                Xf: b
            });
            return c
        },
        rt = function() {
            return function(a, b) {
                X.call(this, Array(a >>> 0), !!b, !0)
            }
        },
        st = new Zm("__AS3__.vec", "Vector", !1),
        ut = function(a, b, c, d) {
            d = d || Um.prototype;
            var e = (new en(st)).Ln(a && a.__swiffy_name).ao(),
                f = d[e];
            f || (f = eo(rt(), e, {
                    ye: qt(a, b),
                    Kt: Sn,
                    Sg: c ? X : tt
                }),
                d[e] = f);
            return f
        },
        vt = function(a, b, c) {
            a = ut(a && Um.prototype[a], b, !0);
            Vm(st + "$" + c, a);
            return a
        },
        tt = vt(null, !1, "object"),
        wt = vt("int", !0, "int"),
        xt = vt("uint", !0, "uint"),
        yt = vt("Number", !0, "double"),
        zt = P(function() {
            throw J(1007);
        }, st);
    Object.defineProperty(zt, "__swiffy_type_apply", {
        value: function(a, b) {
            if (1 != b.length) throw "PANIC! Wrong number of vector type parameters";
            return ut(b[0], !1, !1, a)
        }
    });
    Object.defineProperty(X.prototype, "__swiffy_proxy", {
        value: {
            wf: function(a, b) {
                var c = a.Rg(1069, this),
                    d = x(this);
                if (c >= d.length) throw J(1125, c, d.length);
                c = d[c];
                if (!ia(c)) throw J(1006);
                return c.apply(this, b)
            },
            Bf: function(a) {
                return !a.fb(this)
            },
            Me: function(a) {
                a = a.Rg(1069, this);
                var b = x(this);
                if (a >= b.length) throw J(1125, a, b.length);
                return b[a]
            },
            Se: function(a) {
                return a.Ac() < x(this).length
            },
            eg: function(a) {
                return a - 1
            },
            Xe: function(a) {
                return ++a > x(this).length ? 0 : a
            },
            fg: function(a) {
                return x(this)[a - 1]
            },
            setProperty: function(a,
                b) {
                var c = a.Rg(1056, this),
                    d = x(this);
                if (c > d.length || c == d.length && this.fixed) throw J(1125, c, d.length);
                d[c] = ot(this, b)
            }
        }
    });
    var At = function(a, b, c) {
            if (!Rn(c, a)) throw J(1034, $m(c), a.__swiffy_name);
            b.push.apply(b, x(c))
        },
        Bt = function(a, b, c, d) {
            if (null != b) {
                b = Q(b, Function);
                for (var e = x(a), f = 0; f < e.length; f++) {
                    var h = e[f],
                        k = b.call(c, h, f, a);
                    if (d && d.call(a, k, h)) return !1
                }
            }
            return !0
        },
        Ct = function(a, b, c, d) {
            if (a.fixed) throw J(1126);
            var e = x(a),
                f = d.length;
            c = [b, c];
            c.length += f;
            c = e.splice.apply(e, c);
            var h = 0;
            try {
                for (; 0 < f; h++, b++, f--) e[b] = ot(a, d[h])
            } finally {
                for (a = nt(a).Xf ? 0 : null; 0 < f; b++, f--) e[b] = a
            }
            return c
        };
    X.prototype.concat = function(a) {
        var b = this.__swiffy_classdef,
            c = x(this).slice();
        if (10 < r.i.vc)
            for (var d = 0; d < arguments.length; d++) At(b, c, arguments[d]);
        else
            for (d = arguments.length - 1; 0 <= d; d--) At(b, c, arguments[d]);
        return pt(b, c)
    };
    W(X.prototype, "concat");
    X.prototype.every = function(a, b) {
        return Bt(this, a, b, function(a) {
            return !a
        })
    };
    W(X.prototype, "every");
    X.prototype.filter = function(a, b) {
        var c = [];
        Bt(this, a, b, function(a, b) {
            a && c.push(b)
        });
        return pt(this.__swiffy_classdef, c)
    };
    W(X.prototype, "filter");
    X.prototype.forEach = function(a, b) {
        Bt(this, a, b)
    };
    W(X.prototype, "forEach");
    X.prototype.indexOf = function(a, b) {
        a = ot(this, a, !0);
        return x(this).indexOf(a, b | 0)
    };
    W(X.prototype, "indexOf");
    X.prototype.join = function(a) {
        a = qo(a, ",");
        return x(this).join(a)
    };
    W(X.prototype, "join");
    X.prototype.lastIndexOf = function(a, b) {
        a = ot(this, a, !0);
        b = z(b, 2147483647) | 0;
        return x(this).lastIndexOf(a, b)
    };
    W(X.prototype, "lastIndexOf");
    X.prototype.map = function(a, b) {
        var c = [];
        Bt(this, a, b, function(a) {
            c.push(ot(this, a))
        });
        return pt(this.__swiffy_classdef, c)
    };
    W(X.prototype, "map");
    X.prototype.pop = function() {
        if (this.fixed) throw J(1126);
        var a = x(this);
        return a.length ? a.pop() : nt(this).Xf ? 0 : void 0
    };
    W(X.prototype, "pop");
    X.prototype.push = function(a) {
        var b = x(this);
        Ct(this, b.length, 0, arguments);
        return b.length
    };
    W(X.prototype, "push");
    X.prototype.reverse = function() {
        x(this).reverse();
        return this
    };
    W(X.prototype, "reverse");
    X.prototype.shift = function() {
        if (this.fixed) throw J(1126);
        var a = x(this);
        return a.length ? a.shift() : nt(this).Xf ? 0 : void 0
    };
    W(X.prototype, "shift");
    X.prototype.slice = function(a, b) {
        b = z(b, 16777215) | 0;
        return pt(this.__swiffy_classdef, x(this).slice(a | 0, b))
    };
    W(X.prototype, "slice");
    X.prototype.some = function(a, b) {
        return !Bt(this, a, b, function(a) {
            return a
        })
    };
    W(X.prototype, "some");
    X.prototype.sort = function(a) {
        x(this).sort(a);
        return this
    };
    W(X.prototype, "sort");
    X.prototype.splice = function(a, b, c) {
        a |= 0;
        b >>>= 0;
        c = Array.prototype.slice.call(arguments, 2);
        return pt(this.__swiffy_classdef, Ct(this, a, b, c))
    };
    W(X.prototype, "splice");
    X.prototype.toLocaleString = function() {
        return this.toString()
    };
    X.prototype.unshift = function(a) {
        Ct(this, 0, 0, arguments);
        return x(this).length
    };
    W(X.prototype, "unshift");
    X.prototype.toString = function() {
        return x(this).join(",")
    };
    var Dt = fo(2012);
    Dt.m = P(Dt, "flash.display.Graphics");
    Dt.create = function(a) {
        var b = Object.create(Dt.prototype);
        Object.defineProperty(b, "__swiffy_d", {
            value: a
        });
        return b
    };
    Dt.prototype.beginBitmapFill = function(a, b) {
        Q(a, nr);
        Q(b, fr);
        S(this, "beginBitmapFill")
    };
    Dt.prototype.beginFill = function(a, b) {
        a >>>= 0;
        b = 100 * +z(b, 1);
        this.__swiffy_d.Ia().Un(a, b)
    };
    Dt.prototype.beginGradientFill = function(a, b, c, d, e, f, h, k) {
        a = String(a);
        b = Q(b, Array);
        c = Q(c, Array);
        d = Q(d, Array);
        e = Q(e, fr);
        f = qo(f, "pad");
        h = qo(h, "rgb");
        k = +z(k, 0);
        this.__swiffy_d.Ia().Vn(a, b, c, d, ik(e), f, h, k)
    };
    Dt.prototype.beginShaderFill = function(a, b) {
        Q(b, fr);
        S(this, "beginShaderFill")
    };
    Dt.prototype.clear = function() {
        this.__swiffy_d.Ia().clear()
    };
    Dt.prototype.copyFrom = function(a) {
        Q(a, Dt.m);
        S(this, "copyFrom")
    };
    Dt.prototype.cubicCurveTo = function() {
        S(this, "cubicCurveTo")
    };
    Dt.prototype.curveTo = function(a, b, c, d) {
        a = +a;
        b = +b;
        c = +c;
        d = +d;
        this.__swiffy_d.Ia().nb(a, b, c, d)
    };
    Dt.prototype.drawCircle = function(a, b, c) {
        a = +a;
        b = +b;
        c = +c;
        this.__swiffy_d.Ia().Uo(a, b, c, c)
    };
    Dt.prototype.drawEllipse = function(a, b, c, d) {
        c = +c / 2;
        d = +d / 2;
        a = +a + c;
        b = +b + d;
        this.__swiffy_d.Ia().Uo(a, b, c, d)
    };
    Dt.prototype.drawGraphicsData = function() {
        S(this, "drawGraphicsData")
    };
    Dt.prototype.drawPath = function(a, b) {
        Q(a, wt);
        Q(b, yt);
        S(this, "drawPath")
    };
    Dt.prototype.drawRect = function(a, b, c, d) {
        a = +a;
        b = +b;
        c = +c;
        d = +d;
        this.__swiffy_d.Ia().Au(a, b, c, d)
    };
    Dt.prototype.drawRoundRect = function(a, b, c, d, e, f) {
        a = +a;
        b = +b;
        c = +c;
        d = +d;
        e = +e;
        f = +z(f, e);
        this.__swiffy_d.Ia().Bu(a, b, c, d, e, f)
    };
    Dt.prototype.drawTriangles = function(a, b, c) {
        Q(a, yt);
        Q(b, wt);
        Q(c, yt);
        S(this, "drawTriangles")
    };
    Dt.prototype.endFill = function() {
        this.__swiffy_d.Ia().$o()
    };
    Dt.prototype.lineBitmapStyle = function(a, b) {
        Q(a, nr);
        Q(b, fr);
        S(this, "lineBitmapStyle")
    };
    Dt.prototype.lineGradientStyle = function(a, b, c, d, e) {
        Q(b, Array);
        Q(c, Array);
        Q(d, Array);
        Q(e, fr);
        S(this, "lineGradientStyle")
    };
    Dt.prototype.lineShaderStyle = function(a, b) {
        Q(b, fr);
        S(this, "lineShaderStyle")
    };
    Dt.prototype.lineStyle = function(a, b, c, d, e, f, h, k) {
        l(a) && (a = +a);
        b >>>= 0;
        c = 100 * +z(c, 1);
        d = !!d;
        e = qo(e, "normal");
        f = po(f);
        h = po(h);
        k = +z(k, 3);
        this.__swiffy_d.Ia().tq(a, b, c, d, e, f, h, k)
    };
    Dt.prototype.lineTo = function(a, b) {
        a = +a;
        b = +b;
        this.__swiffy_d.Ia().lineTo(a, b)
    };
    Dt.prototype.moveTo = function(a, b) {
        a = +a;
        b = +b;
        this.__swiffy_d.Ia().moveTo(a, b)
    };
    var Et = function() {
        jr.call(this);
        O(this, "graphics", Dt.create(this.__swiffy_d))
    };
    P(Et, "flash.display.Shape", jr);
    ho(Et, function(a, b) {
        return new Fi(a, b)
    });
    var Ft = function() {
            or.call(this);
            var a = this.__swiffy_d;
            a.Ur(!1);
            a.ah();
            O(this, "graphics", Dt.create(a))
        },
        Gt = P(Ft, "flash.display.Sprite", ur);
    ho(Gt, function(a, b) {
        return a.X.definition.Ji().ub(a, null, b)
    });
    Object.defineProperty(Ft.prototype, "buttonMode", {
        set: function(a) {
            this.__swiffy_d.Ur(Boolean(a))
        },
        get: function() {
            return this.__swiffy_d.Ug
        }
    });
    Object.defineProperty(Ft.prototype, "soundTransform", {
        set: function(a) {
            Q(a, Fr);
            S(this, "soundTransform")
        },
        get: function() {
            S(this, "soundTransform");
            return new Er
        }
    });
    Ft.prototype.useHandCursor = !0;
    var Ht = function() {
        Ft.call(this)
    };
    P(Ht, "flash.display.MovieClip", Ft);
    var It = function(a) {
        return a.__swiffy_d
    };
    Ht.prototype.addFrameScript = function(a) {
        for (var b = It(this).op, c = 1; c < arguments.length; c += 2) {
            var d = arguments[c - 1] | 0;
            if (0 <= d) {
                var e = arguments[c];
                b[d] = ia(e) ? e : null
            }
        }
    };
    Ht.prototype.stop = function() {
        It(this).stop()
    };
    Ht.prototype.play = function() {
        It(this).play()
    };
    Ht.prototype.prevScene = function() {
        It(this).Uw()
    };
    Ht.prototype.nextScene = function() {
        It(this).Ew()
    };
    Ht.prototype.prevFrame = function() {
        var a = It(this);
        a.Wb(a.ka - 1, !1)
    };
    Ht.prototype.nextFrame = function() {
        var a = It(this);
        a.Wb(a.ka + 1, !1)
    };
    var Jt = function(a, b, c, d) {
        a = It(a);
        var e = a.$f(b, c);
        if (l(e)) a.dl(e, d);
        else if (0 != b) throw J(2109, b, c);
    };
    Ht.prototype.gotoAndStop = function(a, b) {
        Jt(this, a, b, !1)
    };
    Ht.prototype.gotoAndPlay = function(a, b) {
        Jt(this, a, b, !0)
    };
    Object.defineProperty(Ht.prototype, "currentFrame", {
        get: function() {
            return It(this).ka + 1
        }
    });
    Object.defineProperty(Ht.prototype, "framesLoaded", {
        get: function() {
            return It(this).definition.frameCount
        }
    });
    Object.defineProperty(Ht.prototype, "totalFrames", {
        get: function() {
            return It(this).definition.frameCount
        }
    });
    Object.defineProperty(Ht.prototype, "isPlaying", {
        get: function() {
            return It(this).Ph
        }
    });
    Object.defineProperty(Ht.prototype, "currentFrameLabel", {
        get: function() {
            var a = It(this),
                b = a.Ho();
            return b && b.offset === a.ka ? b.name : null
        }
    });
    Object.defineProperty(Ht.prototype, "currentLabel", {
        get: function() {
            var a = It(this).Ho();
            return a ? a.name : null
        }
    });
    var Kt = function(a, b) {
        var c = a.definition.fc,
            d = c.tc[b],
            c = c.Lm[b],
            e = [];
        if (!d || !c) return e;
        for (var f = 0; f < c.Lf.length; f++) {
            var h = c.Lf[f];
            e.push(new $p(h.offset - d.offset + 1, h.name))
        }
        return e
    };
    Object.defineProperty(Ht.prototype, "currentLabels", {
        get: function() {
            var a = It(this);
            return Kt(a, a.definition.fc.Ch(a.ka))
        }
    });
    var Lt = function(a, b) {
        var c = a.definition.fc.tc[b],
            d = a.definition.fc.Lm[b];
        return c && d ? new Ap(c.name, d.numFrames, Kt(a, b)) : null
    };
    Object.defineProperty(Ht.prototype, "currentScene", {
        get: function() {
            var a = It(this);
            return Lt(a, a.definition.fc.Ch(a.ka))
        }
    });
    Object.defineProperty(Ht.prototype, "scenes", {
        get: function() {
            for (var a = It(this), b = a.definition.fc.tc, c = [], d = 0; d < b.length; d++) c.push(Lt(a, d));
            return c
        }
    });
    var fq = function(a) {
            return bo.call(is, a)
        },
        is = eo(function(a) {
            Vd(this, a || r.Ed)
        }, "flash.system.ApplicationDomain", {
            Sd: function(a) {
                a = Q(a, is);
                return fq((a ? x(a) : r.Cs).Uk())
            }
        });
    O(is, "MIN_DOMAIN_MEMORY_LENGTH", 1024);
    Object.defineProperty(is, "currentDomain", {
        get: function() {
            return fq()
        }
    });
    M(is, "parentDomain", function() {
        var a = x(this).parent;
        return a ? a.parent ? fq(a) : null : null
    });
    M(is, "domainMemory", function() {
        S(this, "domainMemory");
        return x(this).Vi
    });
    N(is, "domainMemory", function(a) {
        S(this, "domainMemory");
        if ((a = Q(a, Vr)) && 1024 > a.length) throw J(1504);
        x(this).Vi = a
    });
    L(is, "getDefinition", function(a) {
        a = String(a);
        var b = x(this);
        if (b.Nl(a)) return b.tl(a);
        throw J(1065, a);
    });
    L(is, "getQualifiedDefinitionNames", function() {
        S(this, "getQualifiedDefinitionNames");
        return pt(String, [])
    });
    L(is, "hasDefinition", function(a) {
        a = String(a);
        return x(this).Nl(a)
    });
    var Mt = function() {
        Object.defineProperty(this, "__swiffy_disable_search", {
            value: !0,
            enumerable: !1
        });
        Vd(this, {})
    };
    P(Mt, "flash.utils.Dictionary");
    var Nt = 0,
        Ot = function(a, b) {
            this.key = fa(a) && /^[0-9]+$/.test(a) ? parseInt(a, 10) : a;
            this.value = b
        },
        Pt = function(a) {
            if (!a.pa && !a.uri) switch (a = a.localName, typeof a) {
                case "object":
                    if (null === a) return "_null";
                case "function":
                    var b = a.__swiffy_dic_key;
                    b || (a.__swiffy_dic_key = b = ++Nt);
                    return b;
                default:
                    return "_" + a
            }
        };
    Object.defineProperty(Mt.prototype, "toJSON", {
        value: function(a) {
            return a = String(a)
        },
        writable: !0,
        configurable: !0
    });
    Object.defineProperty(Mt.prototype, "__swiffy_proxy", {
        value: {
            wf: function(a, b) {
                var c = Pt(a);
                if (c) return c = (c = x(this)[c]) && c.value, hn(this, c, b, a);
                throw J(1069, a.Ja(), "flash.utils.Dictionary");
            },
            Bf: function(a) {
                return (a = Pt(a)) ? delete x(this)[a] : !1
            },
            Me: function(a) {
                var b = Pt(a);
                if (b) return (a = x(this)[b]) && a.value;
                throw J(1069, a.Ja(), "flash.utils.Dictionary");
            },
            Se: function(a) {
                return (a = Pt(a)) ? a in x(this) : !1
            },
            eg: function(a) {
                var b = x(this);
                return b[Object.keys(b)[a - 1]].key
            },
            Xe: function(a) {
                var b = x(this);
                return a++ <
                    Object.keys(b).length ? a : 0
            },
            fg: function(a) {
                var b = x(this);
                return b[Object.keys(b)[a - 1]].value
            },
            setProperty: function(a, b) {
                var c = Pt(a);
                if (c) x(this)[c] = new Ot(a.localName, b);
                else throw J(1056, a.Ja(), "flash.utils.Dictionary");
            }
        }
    });
    var Qt = P(function() {}, "flash.utils.Endian");
    Object.defineProperty(Qt, "BIG_ENDIAN", {
        value: "bigEndian"
    });
    Object.defineProperty(Qt, "LITTLE_ENDIAN", {
        value: "littleEndian"
    });
    var Y = function() {
            Vd(this, {
                H: new DataView(new ArrayBuffer(0)),
                position: 0,
                ob: !1
            });
            R(this, "objectEncoding", "uint", 0);
            R(this, "shareable", "Boolean", !1)
        },
        Vr = P(Y, "flash.utils.ByteArray");
    M(Vr, "bytesAvailable", function() {
        var a = x(this);
        return Math.max(0, a.H.byteLength - a.position)
    });
    M(Vr, "endian", function() {
        return x(this).ob ? "littleEndian" : "bigEndian"
    });
    N(Vr, "endian", function(a) {
        Io(a, "endian");
        a = String(a);
        var b = x(this);
        if ("littleEndian" === a) b.ob = !0;
        else if ("bigEndian" === a) b.ob = !1;
        else throw J(2008, "type");
    });
    M(Vr, "position", function() {
        return x(this).position
    });
    N(Vr, "position", function(a) {
        x(this).position = a >>> 0
    });
    M(Vr, "length", function() {
        return x(this).H.byteLength
    });
    N(Vr, "length", function(a) {
        a >>>= 0;
        var b = x(this);
        Rt(b, a);
        b.position > a && (b.position = a)
    });
    var Rt = function(a, b) {
            var c = a.H;
            if (b > c.buffer.byteLength) {
                var d = new Uint8Array(b + (b >> 3) + (9 > b ? 3 : 6));
                d.set(new Uint8Array(c.buffer));
                a.H = new DataView(d.buffer, 0, b)
            } else b !== c.byteLength && (a.H = new DataView(c.buffer, 0, b))
        },
        St = function(a, b) {
            var c = a.position;
            if (c + b > a.H.byteLength) throw J(2030);
            a.position = c + b;
            return c
        },
        Tt = function(a, b) {
            var c = a.position,
                d = c + b;
            d > a.H.byteLength && Rt(a, d);
            a.position = c + b;
            return c
        },
        Ut = function(a, b) {
            var c = x(a),
                d = St(c, b);
            return new Uint8Array(c.H.buffer, d, b)
        },
        Vt = function(a, b) {
            var c =
                x(a),
                d = Tt(c, b);
            return new Uint8Array(c.H.buffer, d, b)
        };
    Object.defineProperty(Vr, "defaultObjectEncoding", {
        value: 0
    });
    Object.defineProperty(Y.prototype, "__swiffy_proxy", {
        value: {
            Me: function(a) {
                a = a.Rg(1069, this);
                var b = x(this).H;
                return a < b.byteLength ? b.getUint8(a) : void 0
            },
            Se: function(a) {
                return a.Ac() < x(this).H.byteLength
            },
            setProperty: function(a, b) {
                var c = a.Rg(1056, this);
                b |= 0;
                var d = x(this),
                    e = c + 1;
                e > d.H.byteLength && Rt(d, e);
                d.H.setUint8(c, b)
            }
        }
    });
    Y.prototype.atomicCompareAndSwapIntAt = function(a, b, c) {
        a |= 0;
        b |= 0;
        c |= 0;
        var d = this.position;
        try {
            this.position = a;
            var e = this.readInt();
            e == b && (this.position = a, this.writeInt(c));
            return e
        } finally {
            this.position = d
        }
    };
    Y.prototype.atomicCompareAndSwapLength = function(a, b) {
        var c = this.length;
        c == (a | 0) && (this.length = b | 0);
        return c
    };
    Y.prototype.clear = function() {
        var a = x(this);
        a.H = new DataView(new ArrayBuffer(0));
        a.position = 0
    };
    Y.prototype.compress = function() {
        S(this, "compress")
    };
    Y.prototype.deflate = function() {
        S(this, "deflate")
    };
    Y.prototype.inflate = function() {
        this.uncompress("deflate")
    };
    Y.prototype.readBoolean = function() {
        var a = x(this),
            b = St(a, 1);
        return !!a.H.getUint8(b)
    };
    Y.prototype.readByte = function() {
        var a = x(this),
            b = St(a, 1);
        return a.H.getInt8(b)
    };
    Y.prototype.readBytes = function(a, b, c) {
        a = Q(a, Vr);
        b >>>= 0;
        c >>>= 0;
        if (0 == c) {
            var d = x(this),
                d = d.H.byteLength - d.position;
            0 < d && (c = d)
        }
        d = Ut(this, c);
        a = x(a);
        var e = b + c;
        e > a.H.byteLength && Rt(a, e);
        (new Uint8Array(a.H.buffer, b, c)).set(d)
    };
    Y.prototype.readDouble = function() {
        var a = x(this),
            b = St(a, 8);
        return a.H.getFloat64(b, a.ob)
    };
    Y.prototype.readFloat = function() {
        var a = x(this),
            b = St(a, 4);
        return a.H.getFloat32(b, a.ob)
    };
    Y.prototype.readInt = function() {
        var a = x(this),
            b = St(a, 4);
        return a.H.getInt32(b, a.ob)
    };
    Y.prototype.readMultiByte = function() {
        S(this, "readMultiByte");
        return ""
    };
    Y.prototype.readObject = function() {
        S(this, "readObject")
    };
    Y.prototype.readShort = function() {
        var a = x(this),
            b = St(a, 2);
        return a.H.getInt16(b, a.ob)
    };
    Y.prototype.readUnsignedByte = function() {
        var a = x(this),
            b = St(a, 1);
        return a.H.getUint8(b)
    };
    Y.prototype.readUnsignedInt = function() {
        var a = x(this),
            b = St(a, 4);
        return a.H.getUint32(b, a.ob)
    };
    Y.prototype.readUnsignedShort = function() {
        var a = x(this),
            b = St(a, 2);
        return a.H.getUint16(b, a.ob)
    };
    var Wt = function(a, b) {
        if (0 == b) return "";
        var c = Ut(a, b);
        return qc(c, rc, 0)
    };
    Y.prototype.readUTF = function() {
        var a = x(this),
            b = St(a, 2),
            a = a.H.getUint16(b, a.ob);
        return Wt(this, a)
    };
    Y.prototype.readUTFBytes = function(a) {
        return Wt(this, a >>> 0)
    };
    Y.prototype.toJSON = function() {
        return "ByteArray"
    };
    Y.prototype.toString = function() {
        var a = x(this).H,
            a = new Uint8Array(a.buffer, 0, a.byteLength),
            b = rc,
            c = 0;
        239 == a[0] && 187 == a[1] && 191 == a[2] ? c = 3 : 255 == a[0] && 254 == a[1] ? (b = sc, c = 2) : 254 == a[0] && 255 == a[1] && (b = tc, c = 2);
        return qc(a, b, c)
    };
    Y.prototype.uncompress = function(a) {
        a = qo(a, "zlib");
        Io(a, "algorithm");
        a = gt[a];
        if (!a) throw J(2058);
        var b = x(this);
        if (b.H.byteLength) {
            var c = new Uint8Array(b.H.byteLength + 1);
            c.set(new Uint8Array(b.H.buffer, 0, b.H.byteLength));
            try {
                var d = a(c);
                b.H = new DataView(d.buffer, 0, d.length);
                b.position = 0
            } catch (e) {
                throw J(2058);
            }
        }
    };
    Y.prototype.writeBoolean = function(a) {
        a = !!a;
        var b = x(this),
            c = Tt(b, 1);
        b.H.setUint8(c, a ? 1 : 0)
    };
    Y.prototype.writeByte = function(a) {
        a |= 0;
        var b = x(this),
            c = Tt(b, 1);
        b.H.setInt8(c, a)
    };
    Y.prototype.writeBytes = function(a, b, c) {
        a = Q(a, Vr);
        b >>>= 0;
        c >>>= 0;
        a = x(a).H;
        var d = a.byteLength;
        if (b > d || b + c > d) throw J(2006);
        0 == c && (c = d - b);
        Vt(this, c).set(new Uint8Array(a.buffer, b, c))
    };
    Y.prototype.writeDouble = function(a) {
        a = +a;
        var b = x(this),
            c = Tt(b, 8);
        b.H.setFloat64(c, a, b.ob)
    };
    Y.prototype.writeFloat = function(a) {
        a = +a;
        var b = x(this),
            c = Tt(b, 4);
        b.H.setFloat32(c, a, b.ob)
    };
    Y.prototype.writeInt = function(a) {
        a |= 0;
        var b = x(this),
            c = Tt(b, 4);
        b.H.setInt32(c, a, b.ob)
    };
    Y.prototype.writeMultiByte = function() {
        S(this, "writeMultiByte")
    };
    Y.prototype.writeObject = function() {
        S(this, "writeObject")
    };
    Y.prototype.writeShort = function(a) {
        a |= 0;
        var b = x(this),
            c = Tt(b, 2);
        b.H.setInt16(c, a, b.ob)
    };
    Y.prototype.writeUnsignedInt = function(a) {
        a >>>= 0;
        var b = x(this),
            c = Tt(b, 4);
        b.H.setUint32(c, a, b.ob)
    };
    Y.prototype.writeUTF = function(a) {
        a = String(a);
        a = unescape(encodeURIComponent(a));
        var b = a.length;
        if (65535 < b) throw J(2006);
        var c = x(this),
            d = Tt(c, b + 2);
        c.H.setUint16(d, b, c.ob);
        for (var d = d + 2, e = 0; e < b; ++e, ++d) c.H.setUint8(d, a.charCodeAt(e))
    };
    Y.prototype.writeUTFBytes = function(a) {
        a = String(a);
        a = unescape(encodeURIComponent(a));
        for (var b = a.length, c = x(this), d = Tt(c, b), e = 0; e < b; ++e, ++d) c.H.setUint8(d, a.charCodeAt(e))
    };
    var Z = function(a, b, c, d) {
            a |= 0;
            b |= 0;
            c = !l(c) || !!c;
            d = z(d, 4294967295) >>> 0;
            if (!(8191 >= a && 8191 >= b && 16777215 >= a * b)) throw J(2015, "BitmapData");
            this.__swiffy_d.pc(a, b, c, d)
        },
        nr = P(Z, "flash.display.BitmapData", On, [vp]);
    Object.defineProperty(Z.prototype, "width", {
        get: function() {
            return this.__swiffy_d.I()
        }
    });
    Object.defineProperty(Z.prototype, "height", {
        get: function() {
            return this.__swiffy_d.S()
        }
    });
    Object.defineProperty(Z.prototype, "rect", {
        get: function() {
            return new $q(0, 0, this.__swiffy_d.I(), this.__swiffy_d.S())
        }
    });
    Object.defineProperty(Z.prototype, "transparent", {
        get: function() {
            return this.__swiffy_d.Jc
        }
    });
    Z.prototype.applyFilter = function() {
        S(this, "applyFilter")
    };
    Z.prototype.clone = function() {
        S(this, "clone");
        return null
    };
    Z.prototype.colorTransform = function(a, b) {
        Q(a, ar);
        Q(b, Vq);
        S(this, "colorTransform")
    };
    Z.prototype.compare = function(a) {
        Q(a, nr);
        S(this, "compare");
        return 0
    };
    Z.prototype.copyChannel = function(a, b, c) {
        Q(a, nr);
        Q(b, ar);
        Q(c, Xq);
        S(this, "copyChannel")
    };
    Z.prototype.copyPixels = function(a, b, c, d, e, f) {
        a = Q(a, nr);
        b = Q(b, ar);
        c = Q(c, Xq);
        d = Q(d, nr);
        e = Q(e, Xq);
        this.__swiffy_d.wo(a.__swiffy_d, b.x, b.y, b.width, b.height, c.x, c.y, d ? d.__swiffy_d : null, (e || b).x, (e || b).y, !!f)
    };
    Z.prototype.copyPixelsToByteArray = function(a, b) {
        a = Q(a, ar);
        b = Q(b, Vr);
        var c = this.__swiffy_d.mv(a.x, a.y, a.width, a.height, b.endian == Qt.LITTLE_ENDIAN),
            d = c.byteLength,
            e = void 0 === d;
        e && (d = c.length);
        if (0 != d) {
            var f = Vt(b, d);
            if (e)
                for (e = 0; e < d; ++e) f[e] = c[e];
            else f.set(new Uint8Array(c.buffer, c.byteOffset, c.byteLength))
        }
    };
    Z.prototype.dispose = function() {
        this.__swiffy_d.il()
    };
    Z.prototype.draw = function(a, b, c, d, e) {
        a = Q(a, vp.m);
        b = Q(b, fr);
        c = Q(c, Vq);
        Q(e, ar);
        a = a && a.__swiffy_d;
        if (!a || !a.Wi) throw J(2005, 0, "IBitmapDrawable");
        this.__swiffy_d.jc(a, b && ik(b), c && bk(c))
    };
    Z.prototype.drawWithQuality = function(a, b, c, d, e) {
        Q(a, vp.m);
        Q(b, fr);
        Q(c, Vq);
        Q(e, ar);
        S(this, "drawWithQuality")
    };
    Z.prototype.encode = function(a, b, c) {
        Io(a, "rectangle");
        Q(a, ar);
        Io(b, "compressor");
        Q(c, Vr);
        S(this, "encode");
        return new Y
    };
    Z.prototype.fillRect = function(a, b) {
        a = Q(a, ar);
        this.__swiffy_d.fillRect(a.x, a.y, a.width, a.height, b >>> 0)
    };
    Z.prototype.floodFill = function() {
        S(this, "floodFill")
    };
    Z.prototype.generateFilterRect = function(a, b) {
        Q(a, ar);
        Q(b, Fq);
        S(this, "generateFilterRect");
        return new $q
    };
    Z.prototype.getColorBoundsRect = function() {
        S(this, "getColorBoundsRect");
        return new $q
    };
    Z.prototype.getPixel = function(a, b) {
        return this.__swiffy_d.lv(a | 0, b | 0)
    };
    Z.prototype.getPixel32 = function(a, b) {
        return this.__swiffy_d.Hl(a | 0, b | 0)
    };
    Z.prototype.getPixels = function(a) {
        var b = new Y;
        this.copyPixelsToByteArray(a, b);
        return b
    };
    Z.prototype.getVector = function(a) {
        a = Q(a, ar);
        a = this.__swiffy_d.ov(a.x, a.y, a.width, a.height);
        return pt(xt, a)
    };
    Z.prototype.histogram = function(a) {
        Q(a, ar);
        S(this, "histogram");
        return pt(ut(yt, !1, !1))
    };
    Z.prototype.hitTest = function(a, b, c, d) {
        Io(a, "firstPoint");
        Q(a, Xq);
        Q(d, Xq);
        S(this, "hitTest");
        return !1
    };
    Z.prototype.lock = function() {
        S(this, "lock");
        this.__swiffy_d.iw()
    };
    Z.prototype.merge = function(a, b, c) {
        Q(a, nr);
        Q(b, ar);
        Q(c, Xq);
        S(this, "merge")
    };
    Z.prototype.noise = function() {
        S(this, "noise")
    };
    Z.prototype.paletteMap = function(a, b, c, d, e, f, h) {
        Q(a, nr);
        Q(b, ar);
        Q(c, Xq);
        Q(d, Array);
        Q(e, Array);
        Q(f, Array);
        Q(h, Array);
        S(this, "paletteMap")
    };
    Z.prototype.perlinNoise = function(a, b, c, d, e, f, h, k, n) {
        a = +a;
        b = +b;
        c >>>= 0;
        d |= 0;
        e = !!e;
        f = !!f;
        h = z(h, 7) >>> 0;
        k = !!k;
        n = Q(n, Array) || [];
        this.__swiffy_d.Yq(a, b, c, d, e, f, h, k, n)
    };
    Z.prototype.pixelDissolve = function(a, b, c) {
        Q(a, nr);
        Q(b, ar);
        Q(c, Xq);
        S(this, "pixelDissolve");
        return 0
    };
    Z.prototype.scroll = function(a, b) {
        this.__swiffy_d.scroll(a | 0, b | 0)
    };
    Z.prototype.setPixel = function(a, b, c) {
        this.__swiffy_d.Bx(a | 0, b | 0, c >>> 0)
    };
    Z.prototype.setPixel32 = function(a, b, c) {
        this.__swiffy_d.Rm(a | 0, b | 0, c >>> 0)
    };
    Z.prototype.setPixels = function(a, b) {
        a = Q(a, ar);
        b = Q(b, Vr);
        var c = a.width,
            d = a.height,
            e = c * d * 4,
            f = x(b),
            h = f.position;
        e + h > f.H.byteLength && (e = f.H.byteLength - h, 0 >= e && (h = 0));
        h = new Uint8Array(f.H.buffer, h, e);
        f.position += e;
        this.__swiffy_d.Cx(a.x, a.y, c, d, h, b.endian == Qt.LITTLE_ENDIAN)
    };
    Z.prototype.setVector = function(a, b) {
        a = Q(a, ar);
        b = Q(b, xt);
        this.__swiffy_d.Dx(a.x, a.y, a.width, a.height, x(b))
    };
    Z.prototype.threshold = function(a, b, c) {
        Q(a, nr);
        Q(b, ar);
        Q(c, Xq);
        S(this, "threshold");
        return 0
    };
    Z.prototype.unlock = function(a) {
        Q(a, ar);
        this.__swiffy_d.by()
    };
    ho(Z, function(a, b) {
        return new ih(gh, a, b)
    });
    var So = function(a, b) {
        this.ha = a;
        this.wb = (this.parent = b || null) ? Object.create(this.parent.wb) : new Um(this.ha);
        this.Vi = null
    };
    g = So.prototype;
    g.ql = function() {
        return 3
    };
    g.Dh = function() {
        return this.ha.i
    };
    g.eh = function() {
        return ba
    };
    g.Gq = function(a) {
        a = a.replace("::", ".");
        "." == a[0] && (a = a.substring(1));
        return a
    };
    g.Nl = function(a) {
        a = this.Gq(a);
        return a in this.wb
    };
    g.tl = function(a) {
        a = this.Gq(a);
        return this.wb[a]
    };
    g.xp = function(a) {
        a = a.fb(this.wb);
        return this.wb[a]
    };
    g.ji = "$";
    g.Uk = function() {
        return new So(this.ha, this)
    };
    g.ex = function(a, b, c) {
        var d = Xn();
        d.prototype = Object.create(this.wb);
        Mn(d, Sn, Yn, b.Je(a.init, c)(null, tn), co, On, null, "global", null);
        var e = En(d);
        b.Vh(a.traits, c, null, tn, e);
        var f = this;
        a = function(a) {
            Object.defineProperty(f.wb, a, {
                get: function() {
                    return lo.call(d)[a]
                },
                set: function(b) {
                    lo.call(d)[a] = b
                },
                configurable: !0
            })
        };
        for (var h in e.traits) h in this.wb || a(h)
    };
    g.jr = function(a) {
        for (var b = new Po(a, this), c = 0; c < a.scripts.length; ++c) this.ex(a.scripts[c], b, "global$init")
    };
    g.cu = function(a, b, c, d) {
        var e = a.Rl.classes[c],
            f = Xn(),
            h = b.cr(f),
            k = a.Ke(e.name).cd(),
            n = [];
        if (e.interfaces)
            for (var q = 0; q < e.interfaces.length; ++q) {
                var u = a.Ke(e.interfaces[q]).fb(this.wb);
                u && n.push(this.wb[u])
            }
        q = k.Ja();
        u = (u = a.Je(e.init, q)) ? u(d, h) : fo(1001);
        eo(u, k, {
            ye: f,
            Sg: d,
            interfaces: n
        }, this.wb);
        a.Vh(e.traits, q, d, h, En(f));
        d = q + "$";
        a.Vh(e.ctraits, d, null, h, void 0).Ni(f);
        a.classes[c] = f;
        a.Je(e.cinit, d + "cinit")(null, b).call(f);
        return f
    };
    g.hq = function(a, b) {
        if (null == a) throw J(1007);
        var c = a.prototype.__swiffy_buildsym;
        if (c) {
            var d = $n(a),
                c = c(this.ha.i, d);
            c instanceof Wh && (c.Ob(this.ha.i.Bh()), c.ac = !0);
            c && c.na(!1, b);
            return d
        }
        return lo.apply(a, b)
    };
    g.Nc = function(a, b) {
        var c;
        this.Vi ? c = x(this.Vi).H : (Xt || (Xt = new DataView(new ArrayBuffer(1024))), c = Xt);
        if (0 > a || a + b > c.byteLength) throw J(1506);
        return c
    };
    g.ls = function(a, b) {
        var c = a.Ie(b.id).get(),
            d = this.tl(b.name);
        if (c && d && ia(d)) {
            c.nk = d;
            var e;
            c instanceof yi ? e = Qn(mr, d) ? function(a, b) {
                return new ki(new ih(c, a), a, b)
            } : function(a, b) {
                return new ih(c, a, b)
            } : c instanceof Uf && (e = function(a, b) {
                return new we(c, a, b)
            });
            e ? ho(d, e) : io(d, c)
        }
    };
    var Yt = function(a) {
        this.Cs = new So(this);
        this.Ed = this.Cs.Uk();
        this.i = a;
        this.Yd = new bq;
        this.pk = {};
        this.fm()
    };
    Yt.prototype.ji = "vm";
    T.tt(So);
    g = Yt.prototype;
    g.Xo = !0;
    g.trace = function(a) {
        gg(a)
    };
    g.Of = function() {
        return this.Yd.__swiffy_d
    };
    g.bg = function() {};
    g.Dq = function(a) {
        Zt("mouseMove", !0, a, null)
    };
    g.Rj = function() {};
    g.Gj = function() {};
    g.$n = function() {};
    g.Fj = function() {};
    g.Zn = function() {};
    g.Tq = function() {
        var a = new Hp("resize", !1, !1);
        $t.call(this.i.X, a)
    };
    g.zo = function(a, b, c) {
        a[b] = c
    };
    g.vr = function(a, b) {
        a[b] = null
    };
    g.Em = function() {};
    g.on = function() {};
    g.kr = function() {};
    var $t = function(a) {
            return Xp(this.o, a)
        },
        Zt = function(a, b, c, d) {
            c && c.Vl() && !c.i.Jh() && (a = pr(a, b, c, d), c.i.Cb.add($t.bind(c, a)))
        };
    g = Yt.prototype;
    g.fireEvent = function(a, b, c, d) {
        if (b = tr[c.type]) {
            c = b(a, c);
            if (d) return $t.call(a, c);
            this.i.Cb.add($t.bind(a, c))
        }
        return !1
    };
    g.cx = function(a, b) {
        var c = this.pk[a];
        c || (this.pk[a] = c = []);
        c.push(b)
    };
    g.Hs = function(a, b) {
        var c = this.pk[a];
        c && Da(c, b)
    };
    g.Mq = function(a) {
        a = a.o;
        if (a instanceof U) {
            var b = a.__swiffy_listeners;
            if (b)
                for (var c in b) b[c].length && Wp(c, a) && this.Hs(c, a)
        }
    };
    g.Dm = function(a) {
        var b = this.pk[a];
        if (b)
            for (var c = 0; c < b.length; ++c) this.i.Cb.add(Yp.bind(b[c], a))
    };
    g.ol = function() {
        this.Dm("enterFrame")
    };
    g.fp = function() {
        this.Dm("exitFrame")
    };
    g.bk = function() {
        this.Dm("render")
    };
    g.im = function(a, b) {
        var c = a && a.Nr;
        c && (Xp(c, new Hp("init")), l(b) && Xp(c, new Qp("httpStatus", !1, !1, b)), Xp(c, new Hp("complete")))
    };
    g.na = function(a, b, c) {
        try {
            var d = a.o;
            ao(d).apply(d, c);
            a.Kf(bi, !0)
        } catch (e) {
            mg(e, !b)
        }
    };
    g.oa = function(a, b) {
        var c = a.definition.nk,
            c = $n(Qn(b, c) ? c : b),
            d;
        for (d in c) ia(c[d]) && (c[d] = ma(c[d], c));
        return c
    };
    g.fm = function() {
        var a = this;
        Wh.prototype.oa = function() {
            return a.oa(this, jr)
        };
        Mi.prototype.oa = function() {
            return a.oa(this, this.definition.nk && Qn(Gt, this.definition.nk) ? Ft : Ht)
        };
        Bj.prototype.oa = function() {
            return a.oa(this, Ar)
        };
        oi.prototype.oa = function() {
            return a.oa(this, Hs)
        };
        pi.prototype.oa = function() {
            return a.oa(this, xr)
        };
        ki.prototype.oa = function() {
            return a.oa(this, lr)
        };
        ih.prototype.oa = function() {
            return a.oa(this, Z)
        };
        ti.prototype.oa = function() {
            return a.oa(this, Wr)
        };
        qi.prototype.oa = function() {
            return a.oa(this,
                Et)
        }
    };
    g.Yr = function(a, b) {
        Object.defineProperty(this.Yd.parameters, a, {
            value: b,
            configurable: !0,
            enumerable: !0
        })
    };
    g.si = function(a) {
        return a instanceof Mi && a.Qj || a instanceof Bj
    };
    g.Pq = function(a, b) {
        var c;
        c = a ? a.tp() : [];
        var d;
        d = b ? b.tp() : [];
        var e = c.length - 1,
            f = d.length - 1;
        if (0 < e && 0 < f)
            for (; c[e] == d[f];) e--, f--;
        Zt("mouseOut", !0, a, b);
        for (var h = 0; h <= e; h++) c[h].Jr(b);
        for (h = 0; h <= f; h++) d[h].Kr(a);
        Zt("mouseOver", !0, b, a)
    };
    g.Cf = function(a) {
        var b = this.i.Qb;
        b && !b.Ud() && b.fireEvent(a)
    };
    g.ap = function(a, b) {
        b.Ob(a.Bh())
    };
    g.mo = function(a, b) {
        a = String(a);
        b = String(b);
        return a < b ? -1 : a > b ? 1 : 0
    };
    g.lo = function(a, b) {
        a = String(a).toLowerCase();
        b = String(b).toLowerCase();
        return a < b ? -1 : a > b ? 1 : 0
    };
    g.no = function(a, b) {
        a = null !== a ? Number(a) : null;
        b = null !== b ? Number(b) : null;
        if (a !== a) throw J(1034, a, "Number");
        if (b !== b) throw J(1034, b, "Number");
        return a < b ? -1 : a > b ? 1 : 0
    };
    var Xt = null;
    vk.as3 = Yt;
    var au = function() {};
    P(au, "flash.utils.Proxy");
    Vm("flash.utils.flash_proxy", new Mo(void 0, "http://www.adobe.com/2006/actionscript/flash/proxy"));
    Vm(Wm("http://www.adobe.com/2006/actionscript/flash/proxy", "isAttribute"), function(a) {
        return a instanceof Ym && x(a).pa
    });
    var bu = function(a) {
        var b = a.localName;
        return a.pa || a.uri || !ha(b) ? new Ym(a) : String(b)
    };
    Object.defineProperty(au.prototype, "__swiffy_proxy", {
        value: {
            wf: function(a, b) {
                a = bu(a);
                return this[Wm("http://www.adobe.com/2006/actionscript/flash/proxy", "callProperty")].apply(this, [a].concat(b))
            },
            Bf: function(a) {
                a = bu(a);
                return this[Wm("http://www.adobe.com/2006/actionscript/flash/proxy", "deleteProperty")].call(this, a)
            },
            nj: function(a) {
                a = bu(a);
                return this[Wm("http://www.adobe.com/2006/actionscript/flash/proxy", "getDescendants")].call(this, a)
            },
            Me: function(a) {
                a = bu(a);
                return this[Wm("http://www.adobe.com/2006/actionscript/flash/proxy",
                    "getProperty")].call(this, a)
            },
            Se: function(a) {
                a = a.Ja();
                return this[Wm("http://www.adobe.com/2006/actionscript/flash/proxy", "hasProperty")].call(this, a)
            },
            eg: function(a) {
                return this[Wm("http://www.adobe.com/2006/actionscript/flash/proxy", "nextName")].call(this, a | 0)
            },
            Xe: function(a) {
                return this[Wm("http://www.adobe.com/2006/actionscript/flash/proxy", "nextNameIndex")].call(this, a | 0)
            },
            fg: function(a) {
                return this[Wm("http://www.adobe.com/2006/actionscript/flash/proxy", "nextValue")].call(this, a | 0)
            },
            setProperty: function(a,
                b) {
                a = bu(a);
                this[Wm("http://www.adobe.com/2006/actionscript/flash/proxy", "setProperty")].call(this, a, b)
            }
        }
    });
    var cu = function(a, b) {
        Object.defineProperty(au.prototype, Wm("http://www.adobe.com/2006/actionscript/flash/proxy", a), {
            value: function() {
                throw J(b, a);
            }
        })
    };
    cu("callProperty", 2090);
    cu("deleteProperty", 2092);
    cu("getDescendants", 2093);
    cu("getProperty", 2088);
    cu("hasProperty", 2091);
    cu("setProperty", 2089);
    cu("nextNameIndex", 2105);
    cu("nextName", 2106);
    cu("nextValue", 2107);
    var du = P(function(a, b) {
        U.call(this);
        var c = x(this);
        c.jn = null;
        c.ek = !1;
        c.fl = +a;
        c.Im = b | 0;
        c.Pi = 0
    }, "flash.utils.Timer", U);
    M(du, "delay", function() {
        return x(this).fl
    });
    N(du, "delay", function(a) {
        x(this).fl = +a
    });
    M(du, "repeatCount", function() {
        return x(this).Im
    });
    N(du, "repeatCount", function(a) {
        x(this).Im = a | 0
    });
    M(du, "running", function() {
        return x(this).ek
    });
    M(du, "currentCount", function() {
        return x(this).Pi
    });
    L(du, "start", function() {
        var a = x(this);
        if (!a.ek) {
            var b = this;
            a.jn = $f(function() {
                a.Pi++;
                Xp(b, lo.call(Bq, "timer", !1, !1));
                var c = a.Im;
                c && a.Pi >= c && (b.stop(), b.dispatchEvent(lo.call(Bq, "timerComplete", !1, !1)))
            }, a.fl);
            a.ek = !0
        }
    });
    L(du, "stop", function() {
        var a = x(this);
        bg(a.jn);
        a.ek = !1;
        a.jn = null
    });
    L(du, "reset", function() {
        this.stop();
        x(this).Pi = 0
    });
})()