/* CodeMirror - Minified & Bundled
   Generated on 6/8/2015 with http://codemirror.net/doc/compress.html
   Version: HEAD

   CodeMirror Library:
   - codemirror.js
   Add-ons:
   - matchbrackets.js
   Keymaps:
   - sublime.js
 */
! function(a) {
    if ("object" == typeof exports && "object" == typeof module) module.exports = a();
    else {
        if ("function" == typeof define && define.amd) return define([], a);
        this.CodeMirror = a()
    }
}(function() {
    "use strict";

    function v(a, b) {
        if (!(this instanceof v)) return new v(a, b);
        this.options = b = b ? eh(b) : {}, eh(xe, b, !1), I(b);
        var c = b.value;
        "string" == typeof c && (c = new $f(c, b.mode)), this.doc = c;
        var g = new v.inputStyles[b.inputStyle](this),
            h = this.display = new w(a, c, g);
        h.wrapper.CodeMirror = this, E(this), C(this), b.lineWrapping && (this.display.wrapper.className += " CodeMirror-wrap"), b.autofocus && !n && h.input.focus(), M(this), this.state = {
            keyMaps: [],
            overlays: [],
            modeGen: 0,
            overwrite: !1,
            delayingBlurEvent: !1,
            focused: !1,
            suppressEdits: !1,
            pasteIncoming: !1,
            cutIncoming: !1,
            draggingText: !1,
            highlight: new Vg,
            keySeq: null,
            specialChars: null
        };
        var i = this;
        d && 11 > e && setTimeout(function() {
            i.display.input.reset(!0)
        }, 20), od(this), yh(), Uc(this), this.curOp.forceUpdate = !0, cg(this, c), b.autofocus && !n || i.hasFocus() ? setTimeout(fh(Wd, this), 20) : Xd(this);
        for (var j in ye) ye.hasOwnProperty(j) && ye[j](this, b[j], Ae);
        R(this), b.finishInit && b.finishInit(this);
        for (var k = 0; k < Ee.length; ++k) Ee[k](this);
        Wc(this), f && b.lineWrapping && "optimizelegibility" == getComputedStyle(h.lineDiv).textRendering && (h.lineDiv.style.textRendering = "auto")
    }

    function w(b, c, g) {
        var h = this;
        this.input = g, h.scrollbarFiller = mh("div", null, "CodeMirror-scrollbar-filler"), h.scrollbarFiller.setAttribute("cm-not-content", "true"), h.gutterFiller = mh("div", null, "CodeMirror-gutter-filler"), h.gutterFiller.setAttribute("cm-not-content", "true"), h.lineDiv = mh("div", null, "CodeMirror-code"), h.selectionDiv = mh("div", null, null, "position: relative; z-index: 1"), h.cursorDiv = mh("div", null, "CodeMirror-cursors"), h.measure = mh("div", null, "CodeMirror-measure"), h.lineMeasure = mh("div", null, "CodeMirror-measure"), h.lineSpace = mh("div", [h.measure, h.lineMeasure, h.selectionDiv, h.cursorDiv, h.lineDiv], null, "position: relative; outline: none"), h.mover = mh("div", [mh("div", [h.lineSpace], "CodeMirror-lines")], null, "position: relative"), h.sizer = mh("div", [h.mover], "CodeMirror-sizer"), h.sizerWidth = null, h.heightForcer = mh("div", null, null, "position: absolute; height: " + Qg + "px; width: 1px;"), h.gutters = mh("div", null, "CodeMirror-gutters"), h.lineGutter = null, h.scroller = mh("div", [h.sizer, h.heightForcer, h.gutters], "CodeMirror-scroll"), h.scroller.setAttribute("tabIndex", "-1"), h.wrapper = mh("div", [h.scrollbarFiller, h.gutterFiller, h.scroller], "CodeMirror"), d && 8 > e && (h.gutters.style.zIndex = -1, h.scroller.style.paddingRight = 0), f || a && n || (h.scroller.draggable = !0), b && (b.appendChild ? b.appendChild(h.wrapper) : b(h.wrapper)), h.viewFrom = h.viewTo = c.first, h.reportedViewFrom = h.reportedViewTo = c.first, h.view = [], h.renderedView = null, h.externalMeasured = null, h.viewOffset = 0, h.lastWrapHeight = h.lastWrapWidth = 0, h.updateLineNumbers = null, h.nativeBarWidth = h.barHeight = h.barWidth = 0, h.scrollbarsClipped = !1, h.lineNumWidth = h.lineNumInnerWidth = h.lineNumChars = null, h.alignWidgets = !1, h.cachedCharWidth = h.cachedTextHeight = h.cachedPaddingH = null, h.maxLine = null, h.maxLineLength = 0, h.maxLineChanged = !1, h.wheelDX = h.wheelDY = h.wheelStartX = h.wheelStartY = null, h.shift = !1, h.selForContextMenu = null, h.activeTouch = null, g.init(h)
    }

    function x(a) {
        a.doc.mode = v.getMode(a.options, a.doc.modeOption), y(a)
    }

    function y(a) {
        a.doc.iter(function(a) {
            a.stateAfter && (a.stateAfter = null), a.styles && (a.styles = null)
        }), a.doc.frontier = a.doc.first, hc(a, 100), a.state.modeGen++, a.curOp && hd(a)
    }

    function z(a) {
        a.options.lineWrapping ? (uh(a.display.wrapper, "CodeMirror-wrap"), a.display.sizer.style.minWidth = "", a.display.sizerWidth = null) : (th(a.display.wrapper, "CodeMirror-wrap"), H(a)), B(a), hd(a), Ec(a), setTimeout(function() {
            N(a)
        }, 100)
    }

    function A(a) {
        var b = Qc(a.display),
            c = a.options.lineWrapping,
            d = c && Math.max(5, a.display.scroller.clientWidth / Rc(a.display) - 3);
        return function(e) {
            if (uf(a.doc, e)) return 0;
            var f = 0;
            if (e.widgets)
                for (var g = 0; g < e.widgets.length; g++) e.widgets[g].height && (f += e.widgets[g].height);
            return c ? f + (Math.ceil(e.text.length / d) || 1) * b : f + b
        }
    }

    function B(a) {
        var b = a.doc,
            c = A(a);
        b.iter(function(a) {
            var b = c(a);
            b != a.height && gg(a, b)
        })
    }

    function C(a) {
        a.display.wrapper.className = a.display.wrapper.className.replace(/\s*cm-s-\S+/g, "") + a.options.theme.replace(/(^|\s)\s*/g, " cm-s-"), Ec(a)
    }

    function D(a) {
        E(a), hd(a), setTimeout(function() {
            Q(a)
        }, 20)
    }

    function E(a) {
        var b = a.display.gutters,
            c = a.options.gutters;
        oh(b);
        for (var d = 0; d < c.length; ++d) {
            var e = c[d],
                f = b.appendChild(mh("div", null, "CodeMirror-gutter " + e));
            "CodeMirror-linenumbers" == e && (a.display.lineGutter = f, f.style.width = (a.display.lineNumWidth || 1) + "px")
        }
        b.style.display = d ? "" : "none", F(a)
    }

    function F(a) {
        var b = a.display.gutters.offsetWidth;
        a.display.sizer.style.marginLeft = b + "px"
    }

    function G(a) {
        if (0 == a.height) return 0;
        for (var c, b = a.text.length, d = a; c = nf(d);) {
            var e = c.find(0, !0);
            d = e.from.line, b += e.from.ch - e.to.ch
        }
        for (d = a; c = of (d);) {
            var e = c.find(0, !0);
            b -= d.text.length - e.from.ch, d = e.to.line, b += d.text.length - e.to.ch
        }
        return b
    }

    function H(a) {
        var b = a.display,
            c = a.doc;
        b.maxLine = dg(c, c.first), b.maxLineLength = G(b.maxLine), b.maxLineChanged = !0, c.iter(function(a) {
            var c = G(a);
            c > b.maxLineLength && (b.maxLineLength = c, b.maxLine = a)
        })
    }

    function I(a) {
        var b = ah(a.gutters, "CodeMirror-linenumbers"); - 1 == b && a.lineNumbers ? a.gutters = a.gutters.concat(["CodeMirror-linenumbers"]) : b > -1 && !a.lineNumbers && (a.gutters = a.gutters.slice(0), a.gutters.splice(b, 1))
    }

    function J(a) {
        var b = a.display,
            c = b.gutters.offsetWidth,
            d = Math.round(a.doc.height + mc(a.display));
        return {
            clientHeight: b.scroller.clientHeight,
            viewHeight: b.wrapper.clientHeight,
            scrollWidth: b.scroller.scrollWidth,
            clientWidth: b.scroller.clientWidth,
            viewWidth: b.wrapper.clientWidth,
            barLeft: a.options.fixedGutter ? c : 0,
            docHeight: d,
            scrollHeight: d + oc(a) + b.barHeight,
            nativeBarWidth: b.nativeBarWidth,
            gutterWidth: c
        }
    }

    function K(a, b, c) {
        this.cm = c;
        var f = this.vert = mh("div", [mh("div", null, null, "min-width: 1px")], "CodeMirror-vscrollbar"),
            g = this.horiz = mh("div", [mh("div", null, null, "height: 100%; min-height: 1px")], "CodeMirror-hscrollbar");
        a(f), a(g), Gg(f, "scroll", function() {
            f.clientHeight && b(f.scrollTop, "vertical")
        }), Gg(g, "scroll", function() {
            g.clientWidth && b(g.scrollLeft, "horizontal")
        }), this.checkedOverlay = !1, d && 8 > e && (this.horiz.style.minHeight = this.vert.style.minWidth = "18px")
    }

    function L() {}

    function M(a) {
        a.display.scrollbars && (a.display.scrollbars.clear(), a.display.scrollbars.addClass && th(a.display.wrapper, a.display.scrollbars.addClass)), a.display.scrollbars = new v.scrollbarModel[a.options.scrollbarStyle](function(b) {
            a.display.wrapper.insertBefore(b, a.display.scrollbarFiller), Gg(b, "mousedown", function() {
                a.state.focused && setTimeout(function() {
                    a.display.input.focus()
                }, 0)
            }), b.setAttribute("cm-not-content", "true")
        }, function(b, c) {
            "horizontal" == c ? Fd(a, b) : Ed(a, b)
        }, a), a.display.scrollbars.addClass && uh(a.display.wrapper, a.display.scrollbars.addClass)
    }

    function N(a, b) {
        b || (b = J(a));
        var c = a.display.barWidth,
            d = a.display.barHeight;
        O(a, b);
        for (var e = 0; 4 > e && c != a.display.barWidth || d != a.display.barHeight; e++) c != a.display.barWidth && a.options.lineWrapping && $(a), O(a, J(a)), c = a.display.barWidth, d = a.display.barHeight
    }

    function O(a, b) {
        var c = a.display,
            d = c.scrollbars.update(b);
        c.sizer.style.paddingRight = (c.barWidth = d.right) + "px", c.sizer.style.paddingBottom = (c.barHeight = d.bottom) + "px", d.right && d.bottom ? (c.scrollbarFiller.style.display = "block", c.scrollbarFiller.style.height = d.bottom + "px", c.scrollbarFiller.style.width = d.right + "px") : c.scrollbarFiller.style.display = "", d.bottom && a.options.coverGutterNextToScrollbar && a.options.fixedGutter ? (c.gutterFiller.style.display = "block", c.gutterFiller.style.height = d.bottom + "px", c.gutterFiller.style.width = b.gutterWidth + "px") : c.gutterFiller.style.display = ""
    }

    function P(a, b, c) {
        var d = c && null != c.top ? Math.max(0, c.top) : a.scroller.scrollTop;
        d = Math.floor(d - lc(a));
        var e = c && null != c.bottom ? c.bottom : d + a.wrapper.clientHeight,
            f = ig(b, d),
            g = ig(b, e);
        if (c && c.ensure) {
            var h = c.ensure.from.line,
                i = c.ensure.to.line;
            f > h ? (f = h, g = ig(b, jg(dg(b, h)) + a.wrapper.clientHeight)) : Math.min(i, b.lastLine()) >= g && (f = ig(b, jg(dg(b, i)) - a.wrapper.clientHeight), g = i)
        }
        return {
            from: f,
            to: Math.max(g, f + 1)
        }
    }

    function Q(a) {
        var b = a.display,
            c = b.view;
        if (b.alignWidgets || b.gutters.firstChild && a.options.fixedGutter) {
            for (var d = T(b) - b.scroller.scrollLeft + a.doc.scrollLeft, e = b.gutters.offsetWidth, f = d + "px", g = 0; g < c.length; g++)
                if (!c[g].hidden) {
                    a.options.fixedGutter && c[g].gutter && (c[g].gutter.style.left = f);
                    var h = c[g].alignable;
                    if (h)
                        for (var i = 0; i < h.length; i++) h[i].style.left = f
                } a.options.fixedGutter && (b.gutters.style.left = d + e + "px")
        }
    }

    function R(a) {
        if (!a.options.lineNumbers) return !1;
        var b = a.doc,
            c = S(a.options, b.first + b.size - 1),
            d = a.display;
        if (c.length != d.lineNumChars) {
            var e = d.measure.appendChild(mh("div", [mh("div", c)], "CodeMirror-linenumber CodeMirror-gutter-elt")),
                f = e.firstChild.offsetWidth,
                g = e.offsetWidth - f;
            return d.lineGutter.style.width = "", d.lineNumInnerWidth = Math.max(f, d.lineGutter.offsetWidth - g) + 1, d.lineNumWidth = d.lineNumInnerWidth + g, d.lineNumChars = d.lineNumInnerWidth ? c.length : -1, d.lineGutter.style.width = d.lineNumWidth + "px", F(a), !0
        }
        return !1
    }

    function S(a, b) {
        return String(a.lineNumberFormatter(b + a.firstLineNumber))
    }

    function T(a) {
        return a.scroller.getBoundingClientRect().left - a.sizer.getBoundingClientRect().left
    }

    function U(a, b, c) {
        var d = a.display;
        this.viewport = b, this.visible = P(d, a.doc, b), this.editorIsHidden = !d.wrapper.offsetWidth, this.wrapperHeight = d.wrapper.clientHeight, this.wrapperWidth = d.wrapper.clientWidth, this.oldDisplayWidth = pc(a), this.force = c, this.dims = ab(a), this.events = []
    }

    function V(a) {
        var b = a.display;
        !b.scrollbarsClipped && b.scroller.offsetWidth && (b.nativeBarWidth = b.scroller.offsetWidth - b.scroller.clientWidth, b.heightForcer.style.height = oc(a) + "px", b.sizer.style.marginBottom = -b.nativeBarWidth + "px", b.sizer.style.borderRightWidth = oc(a) + "px", b.scrollbarsClipped = !0)
    }

    function W(a, b) {
        var c = a.display,
            d = a.doc;
        if (b.editorIsHidden) return jd(a), !1;
        if (!b.force && b.visible.from >= c.viewFrom && b.visible.to <= c.viewTo && (null == c.updateLineNumbers || c.updateLineNumbers >= c.viewTo) && c.renderedView == c.view && 0 == nd(a)) return !1;
        R(a) && (jd(a), b.dims = ab(a));
        var e = d.first + d.size,
            f = Math.max(b.visible.from - a.options.viewportMargin, d.first),
            g = Math.min(e, b.visible.to + a.options.viewportMargin);
        c.viewFrom < f && f - c.viewFrom < 20 && (f = Math.max(d.first, c.viewFrom)), c.viewTo > g && c.viewTo - g < 20 && (g = Math.min(e, c.viewTo)), u && (f = sf(a.doc, f), g = tf(a.doc, g));
        var h = f != c.viewFrom || g != c.viewTo || c.lastWrapHeight != b.wrapperHeight || c.lastWrapWidth != b.wrapperWidth;
        md(a, f, g), c.viewOffset = jg(dg(a.doc, c.viewFrom)), a.display.mover.style.top = c.viewOffset + "px";
        var i = nd(a);
        if (!h && 0 == i && !b.force && c.renderedView == c.view && (null == c.updateLineNumbers || c.updateLineNumbers >= c.viewTo)) return !1;
        var j = rh();
        return i > 4 && (c.lineDiv.style.display = "none"), bb(a, c.updateLineNumbers, b.dims), i > 4 && (c.lineDiv.style.display = ""), c.renderedView = c.view, j && rh() != j && j.offsetHeight && j.focus(), oh(c.cursorDiv), oh(c.selectionDiv), c.gutters.style.height = 0, h && (c.lastWrapHeight = b.wrapperHeight, c.lastWrapWidth = b.wrapperWidth, hc(a, 400)), c.updateLineNumbers = null, !0
    }

    function X(a, b) {
        for (var c = b.viewport, d = !0;
            (d && a.options.lineWrapping && b.oldDisplayWidth != pc(a) || (c && null != c.top && (c = {
                top: Math.min(a.doc.height + mc(a.display) - qc(a), c.top)
            }), b.visible = P(a.display, a.doc, c), !(b.visible.from >= a.display.viewFrom && b.visible.to <= a.display.viewTo))) && W(a, b); d = !1) {
            $(a);
            var e = J(a);
            cc(a), Z(a, e), N(a, e)
        }
        b.signal(a, "update", a), (a.display.viewFrom != a.display.reportedViewFrom || a.display.viewTo != a.display.reportedViewTo) && (b.signal(a, "viewportChange", a, a.display.viewFrom, a.display.viewTo), a.display.reportedViewFrom = a.display.viewFrom, a.display.reportedViewTo = a.display.viewTo)
    }

    function Y(a, b) {
        var c = new U(a, b);
        if (W(a, c)) {
            $(a), X(a, c);
            var d = J(a);
            cc(a), Z(a, d), N(a, d), c.finish()
        }
    }

    function Z(a, b) {
        a.display.sizer.style.minHeight = b.docHeight + "px";
        var c = b.docHeight + a.display.barHeight;
        a.display.heightForcer.style.top = c + "px", a.display.gutters.style.height = Math.max(c + oc(a), b.clientHeight) + "px"
    }

    function $(a) {
        for (var b = a.display, c = b.lineDiv.offsetTop, f = 0; f < b.view.length; f++) {
            var h, g = b.view[f];
            if (!g.hidden) {
                if (d && 8 > e) {
                    var i = g.node.offsetTop + g.node.offsetHeight;
                    h = i - c, c = i
                } else {
                    var j = g.node.getBoundingClientRect();
                    h = j.bottom - j.top
                }
                var k = g.line.height - h;
                if (2 > h && (h = Qc(b)), (k > .001 || -.001 > k) && (gg(g.line, h), _(g.line), g.rest))
                    for (var l = 0; l < g.rest.length; l++) _(g.rest[l])
            }
        }
    }

    function _(a) {
        if (a.widgets)
            for (var b = 0; b < a.widgets.length; ++b) a.widgets[b].height = a.widgets[b].node.offsetHeight
    }

    function ab(a) {
        for (var b = a.display, c = {}, d = {}, e = b.gutters.clientLeft, f = b.gutters.firstChild, g = 0; f; f = f.nextSibling, ++g) c[a.options.gutters[g]] = f.offsetLeft + f.clientLeft + e, d[a.options.gutters[g]] = f.clientWidth;
        return {
            fixedPos: T(b),
            gutterTotalWidth: b.gutters.offsetWidth,
            gutterLeft: c,
            gutterWidth: d,
            wrapperWidth: b.wrapper.clientWidth
        }
    }

    function bb(a, b, c) {
        function i(b) {
            var c = b.nextSibling;
            return f && o && a.display.currentWheelTarget == b ? b.style.display = "none" : b.parentNode.removeChild(b), c
        }
        for (var d = a.display, e = a.options.lineNumbers, g = d.lineDiv, h = g.firstChild, j = d.view, k = d.viewFrom, l = 0; l < j.length; l++) {
            var m = j[l];
            if (m.hidden);
            else if (m.node && m.node.parentNode == g) {
                for (; h != m.node;) h = i(h);
                var p = e && null != b && k >= b && m.lineNumber;
                m.changes && (ah(m.changes, "gutter") > -1 && (p = !1), cb(a, m, k, c)), p && (oh(m.lineNumber), m.lineNumber.appendChild(document.createTextNode(S(a.options, k)))), h = m.node.nextSibling
            } else {
                var n = kb(a, m, k, c);
                g.insertBefore(n, h)
            }
            k += m.size
        }
        for (; h;) h = i(h)
    }

    function cb(a, b, c, d) {
        for (var e = 0; e < b.changes.length; e++) {
            var f = b.changes[e];
            "text" == f ? gb(a, b) : "gutter" == f ? ib(a, b, c, d) : "class" == f ? hb(b) : "widget" == f && jb(a, b, d)
        }
        b.changes = null
    }

    function db(a) {
        return a.node == a.text && (a.node = mh("div", null, null, "position: relative"), a.text.parentNode && a.text.parentNode.replaceChild(a.node, a.text), a.node.appendChild(a.text), d && 8 > e && (a.node.style.zIndex = 2)), a.node
    }

    function eb(a) {
        var b = a.bgClass ? a.bgClass + " " + (a.line.bgClass || "") : a.line.bgClass;
        if (b && (b += " CodeMirror-linebackground"), a.background) b ? a.background.className = b : (a.background.parentNode.removeChild(a.background), a.background = null);
        else if (b) {
            var c = db(a);
            a.background = c.insertBefore(mh("div", null, b), c.firstChild)
        }
    }

    function fb(a, b) {
        var c = a.display.externalMeasured;
        return c && c.line == b.line ? (a.display.externalMeasured = null, b.measure = c.measure, c.built) : Of(a, b)
    }

    function gb(a, b) {
        var c = b.text.className,
            d = fb(a, b);
        b.text == b.node && (b.node = d.pre), b.text.parentNode.replaceChild(d.pre, b.text), b.text = d.pre, d.bgClass != b.bgClass || d.textClass != b.textClass ? (b.bgClass = d.bgClass, b.textClass = d.textClass, hb(b)) : c && (b.text.className = c)
    }

    function hb(a) {
        eb(a), a.line.wrapClass ? db(a).className = a.line.wrapClass : a.node != a.text && (a.node.className = "");
        var b = a.textClass ? a.textClass + " " + (a.line.textClass || "") : a.line.textClass;
        a.text.className = b || ""
    }

    function ib(a, b, c, d) {
        b.gutter && (b.node.removeChild(b.gutter), b.gutter = null);
        var e = b.line.gutterMarkers;
        if (a.options.lineNumbers || e) {
            var f = db(b),
                g = b.gutter = mh("div", null, "CodeMirror-gutter-wrapper", "left: " + (a.options.fixedGutter ? d.fixedPos : -d.gutterTotalWidth) + "px; width: " + d.gutterTotalWidth + "px");
            if (a.display.input.setUneditable(g), f.insertBefore(g, b.text), b.line.gutterClass && (g.className += " " + b.line.gutterClass), !a.options.lineNumbers || e && e["CodeMirror-linenumbers"] || (b.lineNumber = g.appendChild(mh("div", S(a.options, c), "CodeMirror-linenumber CodeMirror-gutter-elt", "left: " + d.gutterLeft["CodeMirror-linenumbers"] + "px; width: " + a.display.lineNumInnerWidth + "px"))), e)
                for (var h = 0; h < a.options.gutters.length; ++h) {
                    var i = a.options.gutters[h],
                        j = e.hasOwnProperty(i) && e[i];
                    j && g.appendChild(mh("div", [j], "CodeMirror-gutter-elt", "left: " + d.gutterLeft[i] + "px; width: " + d.gutterWidth[i] + "px"))
                }
        }
    }

    function jb(a, b, c) {
        b.alignable && (b.alignable = null);
        for (var e, d = b.node.firstChild; d; d = e) {
            var e = d.nextSibling;
            "CodeMirror-linewidget" == d.className && b.node.removeChild(d)
        }
        lb(a, b, c)
    }

    function kb(a, b, c, d) {
        var e = fb(a, b);
        return b.text = b.node = e.pre, e.bgClass && (b.bgClass = e.bgClass), e.textClass && (b.textClass = e.textClass), hb(b), ib(a, b, c, d), lb(a, b, d), b.node
    }

    function lb(a, b, c) {
        if (mb(a, b.line, b, c, !0), b.rest)
            for (var d = 0; d < b.rest.length; d++) mb(a, b.rest[d], b, c, !1)
    }

    function mb(a, b, c, d, e) {
        if (b.widgets)
            for (var f = db(c), g = 0, h = b.widgets; g < h.length; ++g) {
                var i = h[g],
                    j = mh("div", [i.node], "CodeMirror-linewidget");
                i.handleMouseEvents || j.setAttribute("cm-ignore-events", "true"), nb(i, j, c, d), a.display.input.setUneditable(j), e && i.above ? f.insertBefore(j, c.gutter || c.text) : f.appendChild(j), Kg(i, "redraw")
            }
    }

    function nb(a, b, c, d) {
        if (a.noHScroll) {
            (c.alignable || (c.alignable = [])).push(b);
            var e = d.wrapperWidth;
            b.style.left = d.fixedPos + "px", a.coverGutter || (e -= d.gutterTotalWidth, b.style.paddingLeft = d.gutterTotalWidth + "px"), b.style.width = e + "px"
        }
        a.coverGutter && (b.style.zIndex = 5, b.style.position = "relative", a.noHScroll || (b.style.marginLeft = -d.gutterTotalWidth + "px"))
    }

    function qb(a) {
        return ob(a.line, a.ch)
    }

    function rb(a, b) {
        return pb(a, b) < 0 ? b : a
    }

    function sb(a, b) {
        return pb(a, b) < 0 ? a : b
    }

    function tb(a) {
        a.state.focused || (a.display.input.focus(), Wd(a))
    }

    function ub(a) {
        return a.options.readOnly || a.doc.cantEdit
    }

    function wb(a, b, c, d, e) {
        var f = a.doc;
        a.display.shift = !1, d || (d = f.sel);
        var g = Fh(b),
            h = null;
        a.state.pasteIncoming && d.ranges.length > 1 && (vb && vb.join("\n") == b ? h = 0 == d.ranges.length % vb.length && bh(vb, Fh) : g.length == d.ranges.length && (h = bh(g, function(a) {
            return [a]
        })));
        for (var i = d.ranges.length - 1; i >= 0; i--) {
            var j = d.ranges[i],
                k = j.from(),
                l = j.to();
            j.empty() && (c && c > 0 ? k = ob(k.line, k.ch - c) : a.state.overwrite && !a.state.pasteIncoming && (l = ob(l.line, Math.min(dg(f, l.line).text.length, l.ch + $g(g).length))));
            var m = a.curOp.updateInput,
                n = {
                    from: k,
                    to: l,
                    text: h ? h[i % h.length] : g,
                    origin: e || (a.state.pasteIncoming ? "paste" : a.state.cutIncoming ? "cut" : "+input")
                };
            ee(a.doc, n), Kg(a, "inputRead", a, n)
        }
        b && !a.state.pasteIncoming && xb(a, b), qe(a), a.curOp.updateInput = m, a.curOp.typing = !0, a.state.pasteIncoming = a.state.cutIncoming = !1
    }

    function xb(a, b) {
        if (a.options.electricChars && a.options.smartIndent)
            for (var c = a.doc.sel, d = c.ranges.length - 1; d >= 0; d--) {
                var e = c.ranges[d];
                if (!(e.head.ch > 100 || d && c.ranges[d - 1].head.line == e.head.line)) {
                    var f = a.getModeAt(e.head),
                        g = !1;
                    if (f.electricChars) {
                        for (var h = 0; h < f.electricChars.length; h++)
                            if (b.indexOf(f.electricChars.charAt(h)) > -1) {
                                g = se(a, e.head.line, "smart");
                                break
                            }
                    } else f.electricInput && f.electricInput.test(dg(a.doc, e.head.line).text.slice(0, e.head.ch)) && (g = se(a, e.head.line, "smart"));
                    g && Kg(a, "electricInput", a, e.head.line)
                }
            }
    }

    function yb(a) {
        for (var b = [], c = [], d = 0; d < a.doc.sel.ranges.length; d++) {
            var e = a.doc.sel.ranges[d].head.line,
                f = {
                    anchor: ob(e, 0),
                    head: ob(e + 1, 0)
                };
            c.push(f), b.push(a.getRange(f.anchor, f.head))
        }
        return {
            text: b,
            ranges: c
        }
    }

    function zb(a) {
        a.setAttribute("autocorrect", "off"), a.setAttribute("autocapitalize", "off"), a.setAttribute("spellcheck", "false")
    }

    function Ab(a) {
        this.cm = a, this.prevInput = "", this.pollingFast = !1, this.polling = new Vg, this.inaccurateSelection = !1, this.hasSelection = !1, this.composing = null
    }

    function Bb() {
        var a = mh("textarea", null, null, "position: absolute; padding: 0; width: 1px; height: 1em; outline: none"),
            b = mh("div", [a], null, "overflow: hidden; position: relative; width: 3px; height: 0px;");
        return f ? a.style.width = "1000px" : a.setAttribute("wrap", "off"), m && (a.style.border = "1px solid black"), zb(a), b
    }

    function Cb(a) {
        this.cm = a, this.lastAnchorNode = this.lastAnchorOffset = this.lastFocusNode = this.lastFocusOffset = null, this.polling = new Vg, this.gracePeriod = !1
    }

    function Db(a, b) {
        var c = vc(a, b.line);
        if (!c || c.hidden) return null;
        var d = dg(a.doc, b.line),
            e = sc(c, d, b.line),
            f = kg(d),
            g = "left";
        if (f) {
            var h = Vh(f, b.ch);
            g = h % 2 ? "right" : "left"
        }
        var i = zc(e.map, b.ch, g);
        return i.offset = "right" == i.collapse ? i.end : i.start, i
    }

    function Eb(a, b) {
        return b && (a.bad = !0), a
    }

    function Fb(a, b, c) {
        var d;
        if (b == a.display.lineDiv) {
            if (d = a.display.lineDiv.childNodes[c], !d) return Eb(a.clipPos(ob(a.display.viewTo - 1)), !0);
            b = null, c = 0
        } else
            for (d = b;; d = d.parentNode) {
                if (!d || d == a.display.lineDiv) return null;
                if (d.parentNode && d.parentNode == a.display.lineDiv) break
            }
        for (var e = 0; e < a.display.view.length; e++) {
            var f = a.display.view[e];
            if (f.node == d) return Gb(f, b, c)
        }
    }

    function Gb(a, b, c) {
        function k(b, c, d) {
            for (var e = -1; e < (j ? j.length : 0); e++)
                for (var f = 0 > e ? i.map : j[e], g = 0; g < f.length; g += 3) {
                    var h = f[g + 2];
                    if (h == b || h == c) {
                        var k = hg(0 > e ? a.line : a.rest[e]),
                            l = f[g] + d;
                        return (0 > d || h != b) && (l = f[g + (d ? 1 : 0)]), ob(k, l)
                    }
                }
        }
        var d = a.text.firstChild,
            e = !1;
        if (!b || !qh(d, b)) return Eb(ob(hg(a.line), 0), !0);
        if (b == d && (e = !0, b = d.childNodes[c], c = 0, !b)) {
            var f = a.rest ? $g(a.rest) : a.line;
            return Eb(ob(hg(f), f.text.length), e)
        }
        var g = 3 == b.nodeType ? b : null,
            h = b;
        for (g || 1 != b.childNodes.length || 3 != b.firstChild.nodeType || (g = b.firstChild, c && (c = g.nodeValue.length)); h.parentNode != d;) h = h.parentNode;
        var i = a.measure,
            j = i.maps,
            l = k(g, h, c);
        if (l) return Eb(l, e);
        for (var m = h.nextSibling, n = g ? g.nodeValue.length - c : 0; m; m = m.nextSibling) {
            if (l = k(m, m.firstChild, 0)) return Eb(ob(l.line, l.ch - n), e);
            n += m.textContent.length
        }
        for (var o = h.previousSibling, n = c; o; o = o.previousSibling) {
            if (l = k(o, o.firstChild, -1)) return Eb(ob(l.line, l.ch + n), e);
            n += m.textContent.length
        }
    }

    function Hb(a, b, c, d, e) {
        function h(a) {
            return function(b) {
                return b.id == a
            }
        }

        function i(b) {
            if (1 == b.nodeType) {
                var c = b.getAttribute("cm-text");
                if (null != c) return "" == c && (c = b.textContent.replace(/\u200b/g, "")), f += c, void 0;
                var k, j = b.getAttribute("cm-marker");
                if (j) {
                    var l = a.findMarks(ob(d, 0), ob(e + 1, 0), h(+j));
                    return l.length && (k = l[0].find()) && (f += eg(a.doc, k.from, k.to).join("\n")), void 0
                }
                if ("false" == b.getAttribute("contenteditable")) return;
                for (var m = 0; m < b.childNodes.length; m++) i(b.childNodes[m]);
                /^(pre|div|p)$/i.test(b.nodeName) && (g = !0)
            } else if (3 == b.nodeType) {
                var n = b.nodeValue;
                if (!n) return;
                g && (f += "\n", g = !1), f += n
            }
        }
        for (var f = "", g = !1; i(b), b != c;) b = b.nextSibling;
        return f
    }

    function Ib(a, b) {
        this.ranges = a, this.primIndex = b
    }

    function Jb(a, b) {
        this.anchor = a, this.head = b
    }

    function Kb(a, b) {
        var c = a[b];
        a.sort(function(a, b) {
            return pb(a.from(), b.from())
        }), b = ah(a, c);
        for (var d = 1; d < a.length; d++) {
            var e = a[d],
                f = a[d - 1];
            if (pb(f.to(), e.from()) >= 0) {
                var g = sb(f.from(), e.from()),
                    h = rb(f.to(), e.to()),
                    i = f.empty() ? e.from() == e.head : f.from() == f.head;
                b >= d && --b, a.splice(--d, 2, new Jb(i ? h : g, i ? g : h))
            }
        }
        return new Ib(a, b)
    }

    function Lb(a, b) {
        return new Ib([new Jb(a, b || a)], 0)
    }

    function Mb(a, b) {
        return Math.max(a.first, Math.min(b, a.first + a.size - 1))
    }

    function Nb(a, b) {
        if (b.line < a.first) return ob(a.first, 0);
        var c = a.first + a.size - 1;
        return b.line > c ? ob(c, dg(a, c).text.length) : Ob(b, dg(a, b.line).text.length)
    }

    function Ob(a, b) {
        var c = a.ch;
        return null == c || c > b ? ob(a.line, b) : 0 > c ? ob(a.line, 0) : a
    }

    function Pb(a, b) {
        return b >= a.first && b < a.first + a.size
    }

    function Qb(a, b) {
        for (var c = [], d = 0; d < b.length; d++) c[d] = Nb(a, b[d]);
        return c
    }

    function Rb(a, b, c, d) {
        if (a.cm && a.cm.display.shift || a.extend) {
            var e = b.anchor;
            if (d) {
                var f = pb(c, e) < 0;
                f != pb(d, e) < 0 ? (e = c, c = d) : f != pb(c, d) < 0 && (c = d)
            }
            return new Jb(e, c)
        }
        return new Jb(d || c, c)
    }

    function Sb(a, b, c, d) {
        Yb(a, new Ib([Rb(a, a.sel.primary(), b, c)], 0), d)
    }

    function Tb(a, b, c) {
        for (var d = [], e = 0; e < a.sel.ranges.length; e++) d[e] = Rb(a, a.sel.ranges[e], b[e], null);
        var f = Kb(d, a.sel.primIndex);
        Yb(a, f, c)
    }

    function Ub(a, b, c, d) {
        var e = a.sel.ranges.slice(0);
        e[b] = c, Yb(a, Kb(e, a.sel.primIndex), d)
    }

    function Vb(a, b, c, d) {
        Yb(a, Lb(b, c), d)
    }

    function Wb(a, b) {
        var c = {
            ranges: b.ranges,
            update: function(b) {
                this.ranges = [];
                for (var c = 0; c < b.length; c++) this.ranges[c] = new Jb(Nb(a, b[c].anchor), Nb(a, b[c].head))
            }
        };
        return Ig(a, "beforeSelectionChange", a, c), a.cm && Ig(a.cm, "beforeSelectionChange", a.cm, c), c.ranges != b.ranges ? Kb(c.ranges, c.ranges.length - 1) : b
    }

    function Xb(a, b, c) {
        var d = a.history.done,
            e = $g(d);
        e && e.ranges ? (d[d.length - 1] = b, Zb(a, b, c)) : Yb(a, b, c)
    }

    function Yb(a, b, c) {
        Zb(a, b, c), rg(a, a.sel, a.cm ? a.cm.curOp.id : 0 / 0, c)
    }

    function Zb(a, b, c) {
        (Og(a, "beforeSelectionChange") || a.cm && Og(a.cm, "beforeSelectionChange")) && (b = Wb(a, b));
        var d = c && c.bias || (pb(b.primary().head, a.sel.primary().head) < 0 ? -1 : 1);
        $b(a, ac(a, b, d, !0)), c && c.scroll === !1 || !a.cm || qe(a.cm)
    }

    function $b(a, b) {
        b.equals(a.sel) || (a.sel = b, a.cm && (a.cm.curOp.updateInput = a.cm.curOp.selectionChanged = !0, Ng(a.cm)), Kg(a, "cursorActivity", a))
    }

    function _b(a) {
        $b(a, ac(a, a.sel, null, !1), Sg)
    }

    function ac(a, b, c, d) {
        for (var e, f = 0; f < b.ranges.length; f++) {
            var g = b.ranges[f],
                h = bc(a, g.anchor, c, d),
                i = bc(a, g.head, c, d);
            (e || h != g.anchor || i != g.head) && (e || (e = b.ranges.slice(0, f)), e[f] = new Jb(h, i))
        }
        return e ? Kb(e, b.primIndex) : b
    }

    function bc(a, b, c, d) {
        var e = !1,
            f = b,
            g = c || 1;
        a.cantEdit = !1;
        a: for (;;) {
            var h = dg(a, f.line);
            if (h.markedSpans)
                for (var i = 0; i < h.markedSpans.length; ++i) {
                    var j = h.markedSpans[i],
                        k = j.marker;
                    if ((null == j.from || (k.inclusiveLeft ? j.from <= f.ch : j.from < f.ch)) && (null == j.to || (k.inclusiveRight ? j.to >= f.ch : j.to > f.ch))) {
                        if (d && (Ig(k, "beforeCursorEnter"), k.explicitlyCleared)) {
                            if (h.markedSpans) {
                                --i;
                                continue
                            }
                            break
                        }
                        if (!k.atomic) continue;
                        var l = k.find(0 > g ? -1 : 1);
                        if (0 == pb(l, f) && (l.ch += g, l.ch < 0 ? l = l.line > a.first ? Nb(a, ob(l.line - 1)) : null : l.ch > h.text.length && (l = l.line < a.first + a.size - 1 ? ob(l.line + 1, 0) : null), !l)) {
                            if (e) return d ? (a.cantEdit = !0, ob(a.first, 0)) : bc(a, b, c, !0);
                            e = !0, l = b, g = -g
                        }
                        f = l;
                        continue a
                    }
                }
            return f
        }
    }

    function cc(a) {
        a.display.input.showSelection(a.display.input.prepareSelection())
    }

    function dc(a, b) {
        for (var c = a.doc, d = {}, e = d.cursors = document.createDocumentFragment(), f = d.selection = document.createDocumentFragment(), g = 0; g < c.sel.ranges.length; g++)
            if (b !== !1 || g != c.sel.primIndex) {
                var h = c.sel.ranges[g],
                    i = h.empty();
                (i || a.options.showCursorWhenSelecting) && ec(a, h, e), i || fc(a, h, f)
            } return d
    }

    function ec(a, b, c) {
        var d = Kc(a, b.head, "div", null, null, !a.options.singleCursorHeightPerLine),
            e = c.appendChild(mh("div", "\xa0", "CodeMirror-cursor"));
        if (e.style.left = d.left + "px", e.style.top = d.top + "px", e.style.height = Math.max(0, d.bottom - d.top) * a.options.cursorHeight + "px", d.other) {
            var f = c.appendChild(mh("div", "\xa0", "CodeMirror-cursor CodeMirror-secondarycursor"));
            f.style.display = "", f.style.left = d.other.left + "px", f.style.top = d.other.top + "px", f.style.height = .85 * (d.other.bottom - d.other.top) + "px"
        }
    }

    function fc(a, b, c) {
        function j(a, b, c, d) {
            0 > b && (b = 0), b = Math.round(b), d = Math.round(d), f.appendChild(mh("div", null, "CodeMirror-selected", "position: absolute; left: " + a + "px; top: " + b + "px; width: " + (null == c ? i - a : c) + "px; height: " + (d - b) + "px"))
        }

        function k(b, c, d) {
            function m(c, d) {
                return Jc(a, ob(b, c), "div", f, d)
            }
            var k, l, f = dg(e, b),
                g = f.text.length;
            return Lh(kg(f), c || 0, null == d ? g : d, function(a, b, e) {
                var n, o, p, f = m(a, "left");
                if (a == b) n = f, o = p = f.left;
                else {
                    if (n = m(b - 1, "right"), "rtl" == e) {
                        var q = f;
                        f = n, n = q
                    }
                    o = f.left, p = n.right
                }
                null == c && 0 == a && (o = h), n.top - f.top > 3 && (j(o, f.top, null, f.bottom), o = h, f.bottom < n.top && j(o, f.bottom, null, n.top)), null == d && b == g && (p = i), (!k || f.top < k.top || f.top == k.top && f.left < k.left) && (k = f), (!l || n.bottom > l.bottom || n.bottom == l.bottom && n.right > l.right) && (l = n), h + 1 > o && (o = h), j(o, n.top, p - o, n.bottom)
            }), {
                start: k,
                end: l
            }
        }
        var d = a.display,
            e = a.doc,
            f = document.createDocumentFragment(),
            g = nc(a.display),
            h = g.left,
            i = Math.max(d.sizerWidth, pc(a) - d.sizer.offsetLeft) - g.right,
            l = b.from(),
            m = b.to();
        if (l.line == m.line) k(l.line, l.ch, m.ch);
        else {
            var n = dg(e, l.line),
                o = dg(e, m.line),
                p = qf(n) == qf(o),
                q = k(l.line, l.ch, p ? n.text.length + 1 : null).end,
                r = k(m.line, p ? 0 : null, m.ch).start;
            p && (q.top < r.top - 2 ? (j(q.right, q.top, null, q.bottom), j(h, r.top, r.left, r.bottom)) : j(q.right, q.top, r.left - q.right, q.bottom)), q.bottom < r.top && j(h, q.bottom, null, r.top)
        }
        c.appendChild(f)
    }

    function gc(a) {
        if (a.state.focused) {
            var b = a.display;
            clearInterval(b.blinker);
            var c = !0;
            b.cursorDiv.style.visibility = "", a.options.cursorBlinkRate > 0 ? b.blinker = setInterval(function() {
                b.cursorDiv.style.visibility = (c = !c) ? "" : "hidden"
            }, a.options.cursorBlinkRate) : a.options.cursorBlinkRate < 0 && (b.cursorDiv.style.visibility = "hidden")
        }
    }

    function hc(a, b) {
        a.doc.mode.startState && a.doc.frontier < a.display.viewTo && a.state.highlight.set(b, fh(ic, a))
    }

    function ic(a) {
        var b = a.doc;
        if (b.frontier < b.first && (b.frontier = b.first), !(b.frontier >= a.display.viewTo)) {
            var c = +new Date + a.options.workTime,
                d = Ge(b.mode, kc(a, b.frontier)),
                e = [];
            b.iter(b.frontier, Math.min(b.first + b.size, a.display.viewTo + 500), function(f) {
                if (b.frontier >= a.display.viewFrom) {
                    var g = f.styles,
                        h = If(a, f, d, !0);
                    f.styles = h.styles;
                    var i = f.styleClasses,
                        j = h.classes;
                    j ? f.styleClasses = j : i && (f.styleClasses = null);
                    for (var k = !g || g.length != f.styles.length || i != j && (!i || !j || i.bgClass != j.bgClass || i.textClass != j.textClass), l = 0; !k && l < g.length; ++l) k = g[l] != f.styles[l];
                    k && e.push(b.frontier), f.stateAfter = Ge(b.mode, d)
                } else Kf(a, f.text, d), f.stateAfter = 0 == b.frontier % 5 ? Ge(b.mode, d) : null;
                return ++b.frontier, +new Date > c ? (hc(a, a.options.workDelay), !0) : void 0
            }), e.length && bd(a, function() {
                for (var b = 0; b < e.length; b++) id(a, e[b], "text")
            })
        }
    }

    function jc(a, b, c) {
        for (var d, e, f = a.doc, g = c ? -1 : b - (a.doc.mode.innerMode ? 1e3 : 100), h = b; h > g; --h) {
            if (h <= f.first) return f.first;
            var i = dg(f, h - 1);
            if (i.stateAfter && (!c || h <= f.frontier)) return h;
            var j = Wg(i.text, null, a.options.tabSize);
            (null == e || d > j) && (e = h - 1, d = j)
        }
        return e
    }

    function kc(a, b, c) {
        var d = a.doc,
            e = a.display;
        if (!d.mode.startState) return !0;
        var f = jc(a, b, c),
            g = f > d.first && dg(d, f - 1).stateAfter;
        return g = g ? Ge(d.mode, g) : He(d.mode), d.iter(f, b, function(c) {
            Kf(a, c.text, g);
            var h = f == b - 1 || 0 == f % 5 || f >= e.viewFrom && f < e.viewTo;
            c.stateAfter = h ? Ge(d.mode, g) : null, ++f
        }), c && (d.frontier = f), g
    }

    function lc(a) {
        return a.lineSpace.offsetTop
    }

    function mc(a) {
        return a.mover.offsetHeight - a.lineSpace.offsetHeight
    }

    function nc(a) {
        if (a.cachedPaddingH) return a.cachedPaddingH;
        var b = ph(a.measure, mh("pre", "x")),
            c = window.getComputedStyle ? window.getComputedStyle(b) : b.currentStyle,
            d = {
                left: parseInt(c.paddingLeft),
                right: parseInt(c.paddingRight)
            };
        return isNaN(d.left) || isNaN(d.right) || (a.cachedPaddingH = d), d
    }

    function oc(a) {
        return Qg - a.display.nativeBarWidth
    }

    function pc(a) {
        return a.display.scroller.clientWidth - oc(a) - a.display.barWidth
    }

    function qc(a) {
        return a.display.scroller.clientHeight - oc(a) - a.display.barHeight
    }

    function rc(a, b, c) {
        var d = a.options.lineWrapping,
            e = d && pc(a);
        if (!b.measure.heights || d && b.measure.width != e) {
            var f = b.measure.heights = [];
            if (d) {
                b.measure.width = e;
                for (var g = b.text.firstChild.getClientRects(), h = 0; h < g.length - 1; h++) {
                    var i = g[h],
                        j = g[h + 1];
                    Math.abs(i.bottom - j.bottom) > 2 && f.push((i.bottom + j.top) / 2 - c.top)
                }
            }
            f.push(c.bottom - c.top)
        }
    }

    function sc(a, b, c) {
        if (a.line == b) return {
            map: a.measure.map,
            cache: a.measure.cache
        };
        for (var d = 0; d < a.rest.length; d++)
            if (a.rest[d] == b) return {
                map: a.measure.maps[d],
                cache: a.measure.caches[d]
            };
        for (var d = 0; d < a.rest.length; d++)
            if (hg(a.rest[d]) > c) return {
                map: a.measure.maps[d],
                cache: a.measure.caches[d],
                before: !0
            }
    }

    function tc(a, b) {
        b = qf(b);
        var c = hg(b),
            d = a.display.externalMeasured = new fd(a.doc, b, c);
        d.lineN = c;
        var e = d.built = Of(a, d);
        return d.text = e.pre, ph(a.display.lineMeasure, e.pre), d
    }

    function uc(a, b, c, d) {
        return xc(a, wc(a, b), c, d)
    }

    function vc(a, b) {
        if (b >= a.display.viewFrom && b < a.display.viewTo) return a.display.view[kd(a, b)];
        var c = a.display.externalMeasured;
        return c && b >= c.lineN && b < c.lineN + c.size ? c : void 0
    }

    function wc(a, b) {
        var c = hg(b),
            d = vc(a, c);
        d && !d.text ? d = null : d && d.changes && cb(a, d, c, ab(a)), d || (d = tc(a, b));
        var e = sc(d, b, c);
        return {
            line: b,
            view: d,
            rect: null,
            map: e.map,
            cache: e.cache,
            before: e.before,
            hasHeights: !1
        }
    }

    function xc(a, b, c, d, e) {
        b.before && (c = -1);
        var g, f = c + (d || "");
        return b.cache.hasOwnProperty(f) ? g = b.cache[f] : (b.rect || (b.rect = b.view.text.getBoundingClientRect()), b.hasHeights || (rc(a, b.view, b.rect), b.hasHeights = !0), g = Ac(a, b, c, d), g.bogus || (b.cache[f] = g)), {
            left: g.left,
            right: g.right,
            top: e ? g.rtop : g.top,
            bottom: e ? g.rbottom : g.bottom
        }
    }

    function zc(a, b, c) {
        for (var d, e, f, g, h = 0; h < a.length; h += 3) {
            var i = a[h],
                j = a[h + 1];
            if (i > b ? (e = 0, f = 1, g = "left") : j > b ? (e = b - i, f = e + 1) : (h == a.length - 3 || b == j && a[h + 3] > b) && (f = j - i, e = f - 1, b >= j && (g = "right")), null != e) {
                if (d = a[h + 2], i == j && c == (d.insertLeft ? "left" : "right") && (g = c), "left" == c && 0 == e)
                    for (; h && a[h - 2] == a[h - 3] && a[h - 1].insertLeft;) d = a[(h -= 3) + 2], g = "left";
                if ("right" == c && e == j - i)
                    for (; h < a.length - 3 && a[h + 3] == a[h + 4] && !a[h + 5].insertLeft;) d = a[(h += 3) + 2], g = "right";
                break
            }
        }
        return {
            node: d,
            start: e,
            end: f,
            collapse: g,
            coverStart: i,
            coverEnd: j
        }
    }

    function Ac(a, b, c, f) {
        var l, g = zc(b.map, c, f),
            h = g.node,
            i = g.start,
            j = g.end,
            k = g.collapse;
        if (3 == h.nodeType) {
            for (var m = 0; 4 > m; m++) {
                for (; i && lh(b.line.text.charAt(g.coverStart + i));) --i;
                for (; g.coverStart + j < g.coverEnd && lh(b.line.text.charAt(g.coverStart + j));) ++j;
                if (d && 9 > e && 0 == i && j == g.coverEnd - g.coverStart) l = h.parentNode.getBoundingClientRect();
                else if (d && a.options.lineWrapping) {
                    var n = nh(h, i, j).getClientRects();
                    l = n.length ? n["right" == f ? n.length - 1 : 0] : yc
                } else l = nh(h, i, j).getBoundingClientRect() || yc;
                if (l.left || l.right || 0 == i) break;
                j = i, i -= 1, k = "right"
            }
            d && 11 > e && (l = Bc(a.display.measure, l))
        } else {
            i > 0 && (k = f = "right");
            var n;
            l = a.options.lineWrapping && (n = h.getClientRects()).length > 1 ? n["right" == f ? n.length - 1 : 0] : h.getBoundingClientRect()
        }
        if (d && 9 > e && !i && (!l || !l.left && !l.right)) {
            var o = h.parentNode.getClientRects()[0];
            l = o ? {
                left: o.left,
                right: o.left + Rc(a.display),
                top: o.top,
                bottom: o.bottom
            } : yc
        }
        for (var p = l.top - b.rect.top, q = l.bottom - b.rect.top, r = (p + q) / 2, s = b.view.measure.heights, m = 0; m < s.length - 1 && !(r < s[m]); m++);
        var t = m ? s[m - 1] : 0,
            u = s[m],
            v = {
                left: ("right" == k ? l.right : l.left) - b.rect.left,
                right: ("left" == k ? l.left : l.right) - b.rect.left,
                top: t,
                bottom: u
            };
        return l.left || l.right || (v.bogus = !0), a.options.singleCursorHeightPerLine || (v.rtop = p, v.rbottom = q), v
    }

    function Bc(a, b) {
        if (!window.screen || null == screen.logicalXDPI || screen.logicalXDPI == screen.deviceXDPI || !Jh(a)) return b;
        var c = screen.logicalXDPI / screen.deviceXDPI,
            d = screen.logicalYDPI / screen.deviceYDPI;
        return {
            left: b.left * c,
            right: b.right * c,
            top: b.top * d,
            bottom: b.bottom * d
        }
    }

    function Cc(a) {
        if (a.measure && (a.measure.cache = {}, a.measure.heights = null, a.rest))
            for (var b = 0; b < a.rest.length; b++) a.measure.caches[b] = {}
    }

    function Dc(a) {
        a.display.externalMeasure = null, oh(a.display.lineMeasure);
        for (var b = 0; b < a.display.view.length; b++) Cc(a.display.view[b])
    }

    function Ec(a) {
        Dc(a), a.display.cachedCharWidth = a.display.cachedTextHeight = a.display.cachedPaddingH = null, a.options.lineWrapping || (a.display.maxLineChanged = !0), a.display.lineNumChars = null
    }

    function Fc() {
        return window.pageXOffset || (document.documentElement || document.body).scrollLeft
    }

    function Gc() {
        return window.pageYOffset || (document.documentElement || document.body).scrollTop
    }

    function Hc(a, b, c, d) {
        if (b.widgets)
            for (var e = 0; e < b.widgets.length; ++e)
                if (b.widgets[e].above) {
                    var f = yf(b.widgets[e]);
                    c.top += f, c.bottom += f
                } if ("line" == d) return c;
        d || (d = "local");
        var g = jg(b);
        if ("local" == d ? g += lc(a.display) : g -= a.display.viewOffset, "page" == d || "window" == d) {
            var h = a.display.lineSpace.getBoundingClientRect();
            g += h.top + ("window" == d ? 0 : Gc());
            var i = h.left + ("window" == d ? 0 : Fc());
            c.left += i, c.right += i
        }
        return c.top += g, c.bottom += g, c
    }

    function Ic(a, b, c) {
        if ("div" == c) return b;
        var d = b.left,
            e = b.top;
        if ("page" == c) d -= Fc(), e -= Gc();
        else if ("local" == c || !c) {
            var f = a.display.sizer.getBoundingClientRect();
            d += f.left, e += f.top
        }
        var g = a.display.lineSpace.getBoundingClientRect();
        return {
            left: d - g.left,
            top: e - g.top
        }
    }

    function Jc(a, b, c, d, e) {
        return d || (d = dg(a.doc, b.line)), Hc(a, d, uc(a, d, b.ch, e), c)
    }

    function Kc(a, b, c, d, e, f) {
        function g(b, g) {
            var h = xc(a, e, b, g ? "right" : "left", f);
            return g ? h.left = h.right : h.right = h.left, Hc(a, d, h, c)
        }

        function h(a, b) {
            var c = i[b],
                d = c.level % 2;
            return a == Mh(c) && b && c.level < i[b - 1].level ? (c = i[--b], a = Nh(c) - (c.level % 2 ? 0 : 1), d = !0) : a == Nh(c) && b < i.length - 1 && c.level < i[b + 1].level && (c = i[++b], a = Mh(c) - c.level % 2, d = !1), d && a == c.to && a > c.from ? g(a - 1) : g(a, d)
        }
        d = d || dg(a.doc, b.line), e || (e = wc(a, d));
        var i = kg(d),
            j = b.ch;
        if (!i) return g(j);
        var k = Vh(i, j),
            l = h(j, k);
        return null != Uh && (l.other = h(j, Uh)), l
    }

    function Lc(a, b) {
        var c = 0,
            b = Nb(a.doc, b);
        a.options.lineWrapping || (c = Rc(a.display) * b.ch);
        var d = dg(a.doc, b.line),
            e = jg(d) + lc(a.display);
        return {
            left: c,
            right: c,
            top: e,
            bottom: e + d.height
        }
    }

    function Mc(a, b, c, d) {
        var e = ob(a, b);
        return e.xRel = d, c && (e.outside = !0), e
    }

    function Nc(a, b, c) {
        var d = a.doc;
        if (c += a.display.viewOffset, 0 > c) return Mc(d.first, 0, !0, -1);
        var e = ig(d, c),
            f = d.first + d.size - 1;
        if (e > f) return Mc(d.first + d.size - 1, dg(d, f).text.length, !0, 1);
        0 > b && (b = 0);
        for (var g = dg(d, e);;) {
            var h = Oc(a, g, e, b, c),
                i = of (g),
                j = i && i.find(0, !0);
            if (!i || !(h.ch > j.from.ch || h.ch == j.from.ch && h.xRel > 0)) return h;
            e = hg(g = j.to.line)
        }
    }

    function Oc(a, b, c, d, e) {
        function j(d) {
            var e = Kc(a, ob(c, d), "line", b, i);
            return g = !0, f > e.bottom ? e.left - h : f < e.top ? e.left + h : (g = !1, e.left)
        }
        var f = e - jg(b),
            g = !1,
            h = 2 * a.display.wrapper.clientWidth,
            i = wc(a, b),
            k = kg(b),
            l = b.text.length,
            m = Oh(b),
            n = Ph(b),
            o = j(m),
            p = g,
            q = j(n),
            r = g;
        if (d > q) return Mc(c, n, r, 1);
        for (;;) {
            if (k ? n == m || n == Xh(b, m, 1) : 1 >= n - m) {
                for (var s = o > d || q - d >= d - o ? m : n, t = d - (s == m ? o : q); lh(b.text.charAt(s));) ++s;
                var u = Mc(c, s, s == m ? p : r, -1 > t ? -1 : t > 1 ? 1 : 0);
                return u
            }
            var v = Math.ceil(l / 2),
                w = m + v;
            if (k) {
                w = m;
                for (var x = 0; v > x; ++x) w = Xh(b, w, 1)
            }
            var y = j(w);
            y > d ? (n = w, q = y, (r = g) && (q += 1e3), l = v) : (m = w, o = y, p = g, l -= v)
        }
    }

    function Qc(a) {
        if (null != a.cachedTextHeight) return a.cachedTextHeight;
        if (null == Pc) {
            Pc = mh("pre");
            for (var b = 0; 49 > b; ++b) Pc.appendChild(document.createTextNode("x")), Pc.appendChild(mh("br"));
            Pc.appendChild(document.createTextNode("x"))
        }
        ph(a.measure, Pc);
        var c = Pc.offsetHeight / 50;
        return c > 3 && (a.cachedTextHeight = c), oh(a.measure), c || 1
    }

    function Rc(a) {
        if (null != a.cachedCharWidth) return a.cachedCharWidth;
        var b = mh("span", "xxxxxxxxxx"),
            c = mh("pre", [b]);
        ph(a.measure, c);
        var d = b.getBoundingClientRect(),
            e = (d.right - d.left) / 10;
        return e > 2 && (a.cachedCharWidth = e), e || 10
    }

    function Uc(a) {
        a.curOp = {
            cm: a,
            viewChanged: !1,
            startHeight: a.doc.height,
            forceUpdate: !1,
            updateInput: null,
            typing: !1,
            changeObjs: null,
            cursorActivityHandlers: null,
            cursorActivityCalled: 0,
            selectionChanged: !1,
            updateMaxLine: !1,
            scrollLeft: null,
            scrollTop: null,
            scrollToPos: null,
            focus: !1,
            id: ++Tc
        }, Sc ? Sc.ops.push(a.curOp) : a.curOp.ownsGroup = Sc = {
            ops: [a.curOp],
            delayedCallbacks: []
        }
    }

    function Vc(a) {
        var b = a.delayedCallbacks,
            c = 0;
        do {
            for (; c < b.length; c++) b[c]();
            for (var d = 0; d < a.ops.length; d++) {
                var e = a.ops[d];
                if (e.cursorActivityHandlers)
                    for (; e.cursorActivityCalled < e.cursorActivityHandlers.length;) e.cursorActivityHandlers[e.cursorActivityCalled++](e.cm)
            }
        } while (c < b.length)
    }

    function Wc(a) {
        var b = a.curOp,
            c = b.ownsGroup;
        if (c) try {
            Vc(c)
        } finally {
            Sc = null;
            for (var d = 0; d < c.ops.length; d++) c.ops[d].cm.curOp = null;
            Xc(c)
        }
    }

    function Xc(a) {
        for (var b = a.ops, c = 0; c < b.length; c++) Yc(b[c]);
        for (var c = 0; c < b.length; c++) Zc(b[c]);
        for (var c = 0; c < b.length; c++) $c(b[c]);
        for (var c = 0; c < b.length; c++) _c(b[c]);
        for (var c = 0; c < b.length; c++) ad(b[c])
    }

    function Yc(a) {
        var b = a.cm,
            c = b.display;
        V(b), a.updateMaxLine && H(b), a.mustUpdate = a.viewChanged || a.forceUpdate || null != a.scrollTop || a.scrollToPos && (a.scrollToPos.from.line < c.viewFrom || a.scrollToPos.to.line >= c.viewTo) || c.maxLineChanged && b.options.lineWrapping, a.update = a.mustUpdate && new U(b, a.mustUpdate && {
            top: a.scrollTop,
            ensure: a.scrollToPos
        }, a.forceUpdate)
    }

    function Zc(a) {
        a.updatedDisplay = a.mustUpdate && W(a.cm, a.update)
    }

    function $c(a) {
        var b = a.cm,
            c = b.display;
        a.updatedDisplay && $(b), a.barMeasure = J(b), c.maxLineChanged && !b.options.lineWrapping && (a.adjustWidthTo = uc(b, c.maxLine, c.maxLine.text.length).left + 3, b.display.sizerWidth = a.adjustWidthTo, a.barMeasure.scrollWidth = Math.max(c.scroller.clientWidth, c.sizer.offsetLeft + a.adjustWidthTo + oc(b) + b.display.barWidth), a.maxScrollLeft = Math.max(0, c.sizer.offsetLeft + a.adjustWidthTo - pc(b))), (a.updatedDisplay || a.selectionChanged) && (a.preparedSelection = c.input.prepareSelection())
    }

    function _c(a) {
        var b = a.cm;
        null != a.adjustWidthTo && (b.display.sizer.style.minWidth = a.adjustWidthTo + "px", a.maxScrollLeft < b.doc.scrollLeft && Fd(b, Math.min(b.display.scroller.scrollLeft, a.maxScrollLeft), !0), b.display.maxLineChanged = !1), a.preparedSelection && b.display.input.showSelection(a.preparedSelection), a.updatedDisplay && Z(b, a.barMeasure), (a.updatedDisplay || a.startHeight != b.doc.height) && N(b, a.barMeasure), a.selectionChanged && gc(b), b.state.focused && a.updateInput && b.display.input.reset(a.typing), a.focus && a.focus == rh() && tb(a.cm)
    }

    function ad(a) {
        var b = a.cm,
            c = b.display,
            d = b.doc;
        if (a.updatedDisplay && X(b, a.update), null == c.wheelStartX || null == a.scrollTop && null == a.scrollLeft && !a.scrollToPos || (c.wheelStartX = c.wheelStartY = null), null == a.scrollTop || c.scroller.scrollTop == a.scrollTop && !a.forceScroll || (d.scrollTop = Math.max(0, Math.min(c.scroller.scrollHeight - c.scroller.clientHeight, a.scrollTop)), c.scrollbars.setScrollTop(d.scrollTop), c.scroller.scrollTop = d.scrollTop), null == a.scrollLeft || c.scroller.scrollLeft == a.scrollLeft && !a.forceScroll || (d.scrollLeft = Math.max(0, Math.min(c.scroller.scrollWidth - pc(b), a.scrollLeft)), c.scrollbars.setScrollLeft(d.scrollLeft), c.scroller.scrollLeft = d.scrollLeft, Q(b)), a.scrollToPos) {
            var e = me(b, Nb(d, a.scrollToPos.from), Nb(d, a.scrollToPos.to), a.scrollToPos.margin);
            a.scrollToPos.isCursor && b.state.focused && le(b, e)
        }
        var f = a.maybeHiddenMarkers,
            g = a.maybeUnhiddenMarkers;
        if (f)
            for (var h = 0; h < f.length; ++h) f[h].lines.length || Ig(f[h], "hide");
        if (g)
            for (var h = 0; h < g.length; ++h) g[h].lines.length && Ig(g[h], "unhide");
        c.wrapper.offsetHeight && (d.scrollTop = b.display.scroller.scrollTop), a.changeObjs && Ig(b, "changes", b, a.changeObjs), a.update && a.update.finish()
    }

    function bd(a, b) {
        if (a.curOp) return b();
        Uc(a);
        try {
            return b()
        } finally {
            Wc(a)
        }
    }

    function cd(a, b) {
        return function() {
            if (a.curOp) return b.apply(a, arguments);
            Uc(a);
            try {
                return b.apply(a, arguments)
            } finally {
                Wc(a)
            }
        }
    }

    function dd(a) {
        return function() {
            if (this.curOp) return a.apply(this, arguments);
            Uc(this);
            try {
                return a.apply(this, arguments)
            } finally {
                Wc(this)
            }
        }
    }

    function ed(a) {
        return function() {
            var b = this.cm;
            if (!b || b.curOp) return a.apply(this, arguments);
            Uc(b);
            try {
                return a.apply(this, arguments)
            } finally {
                Wc(b)
            }
        }
    }

    function fd(a, b, c) {
        this.line = b, this.rest = rf(b), this.size = this.rest ? hg($g(this.rest)) - c + 1 : 1, this.node = this.text = null, this.hidden = uf(a, b)
    }

    function gd(a, b, c) {
        for (var e, d = [], f = b; c > f; f = e) {
            var g = new fd(a.doc, dg(a.doc, f), f);
            e = f + g.size, d.push(g)
        }
        return d
    }

    function hd(a, b, c, d) {
        null == b && (b = a.doc.first), null == c && (c = a.doc.first + a.doc.size), d || (d = 0);
        var e = a.display;
        if (d && c < e.viewTo && (null == e.updateLineNumbers || e.updateLineNumbers > b) && (e.updateLineNumbers = b), a.curOp.viewChanged = !0, b >= e.viewTo) u && sf(a.doc, b) < e.viewTo && jd(a);
        else if (c <= e.viewFrom) u && tf(a.doc, c + d) > e.viewFrom ? jd(a) : (e.viewFrom += d, e.viewTo += d);
        else if (b <= e.viewFrom && c >= e.viewTo) jd(a);
        else if (b <= e.viewFrom) {
            var f = ld(a, c, c + d, 1);
            f ? (e.view = e.view.slice(f.index), e.viewFrom = f.lineN, e.viewTo += d) : jd(a)
        } else if (c >= e.viewTo) {
            var f = ld(a, b, b, -1);
            f ? (e.view = e.view.slice(0, f.index), e.viewTo = f.lineN) : jd(a)
        } else {
            var g = ld(a, b, b, -1),
                h = ld(a, c, c + d, 1);
            g && h ? (e.view = e.view.slice(0, g.index).concat(gd(a, g.lineN, h.lineN)).concat(e.view.slice(h.index)), e.viewTo += d) : jd(a)
        }
        var i = e.externalMeasured;
        i && (c < i.lineN ? i.lineN += d : b < i.lineN + i.size && (e.externalMeasured = null))
    }

    function id(a, b, c) {
        a.curOp.viewChanged = !0;
        var d = a.display,
            e = a.display.externalMeasured;
        if (e && b >= e.lineN && b < e.lineN + e.size && (d.externalMeasured = null), !(b < d.viewFrom || b >= d.viewTo)) {
            var f = d.view[kd(a, b)];
            if (null != f.node) {
                var g = f.changes || (f.changes = []); - 1 == ah(g, c) && g.push(c)
            }
        }
    }

    function jd(a) {
        a.display.viewFrom = a.display.viewTo = a.doc.first, a.display.view = [], a.display.viewOffset = 0
    }

    function kd(a, b) {
        if (b >= a.display.viewTo) return null;
        if (b -= a.display.viewFrom, 0 > b) return null;
        for (var c = a.display.view, d = 0; d < c.length; d++)
            if (b -= c[d].size, 0 > b) return d
    }

    function ld(a, b, c, d) {
        var f, e = kd(a, b),
            g = a.display.view;
        if (!u || c == a.doc.first + a.doc.size) return {
            index: e,
            lineN: c
        };
        for (var h = 0, i = a.display.viewFrom; e > h; h++) i += g[h].size;
        if (i != b) {
            if (d > 0) {
                if (e == g.length - 1) return null;
                f = i + g[e].size - b, e++
            } else f = i - b;
            b += f, c += f
        }
        for (; sf(a.doc, c) != c;) {
            if (e == (0 > d ? 0 : g.length - 1)) return null;
            c += d * g[e - (0 > d ? 1 : 0)].size, e += d
        }
        return {
            index: e,
            lineN: c
        }
    }

    function md(a, b, c) {
        var d = a.display,
            e = d.view;
        0 == e.length || b >= d.viewTo || c <= d.viewFrom ? (d.view = gd(a, b, c), d.viewFrom = b) : (d.viewFrom > b ? d.view = gd(a, b, d.viewFrom).concat(d.view) : d.viewFrom < b && (d.view = d.view.slice(kd(a, b))), d.viewFrom = b, d.viewTo < c ? d.view = d.view.concat(gd(a, d.viewTo, c)) : d.viewTo > c && (d.view = d.view.slice(0, kd(a, c)))), d.viewTo = c
    }

    function nd(a) {
        for (var b = a.display.view, c = 0, d = 0; d < b.length; d++) {
            var e = b[d];
            e.hidden || e.node && !e.changes || ++c
        }
        return c
    }

    function od(a) {
        function g() {
            b.activeTouch && (c = setTimeout(function() {
                b.activeTouch = null
            }, 1e3), f = b.activeTouch, f.end = +new Date)
        }

        function h(a) {
            if (1 != a.touches.length) return !1;
            var b = a.touches[0];
            return b.radiusX <= 1 && b.radiusY <= 1
        }

        function i(a, b) {
            if (null == b.left) return !0;
            var c = b.left - a.left,
                d = b.top - a.top;
            return c * c + d * d > 400
        }
        var b = a.display;
        Gg(b.scroller, "mousedown", cd(a, td)), d && 11 > e ? Gg(b.scroller, "dblclick", cd(a, function(b) {
            if (!Mg(a, b)) {
                var c = sd(a, b);
                if (c && !Ad(a, b) && !rd(a.display, b)) {
                    Ag(b);
                    var d = a.findWordAt(c);
                    Sb(a.doc, d.anchor, d.head)
                }
            }
        })) : Gg(b.scroller, "dblclick", function(b) {
            Mg(a, b) || Ag(b)
        }), s || Gg(b.scroller, "contextmenu", function(b) {
            Yd(a, b)
        });
        var c, f = {
            end: 0
        };
        Gg(b.scroller, "touchstart", function(a) {
            if (!h(a)) {
                clearTimeout(c);
                var d = +new Date;
                b.activeTouch = {
                    start: d,
                    moved: !1,
                    prev: d - f.end <= 300 ? f : null
                }, 1 == a.touches.length && (b.activeTouch.left = a.touches[0].pageX, b.activeTouch.top = a.touches[0].pageY)
            }
        }), Gg(b.scroller, "touchmove", function() {
            b.activeTouch && (b.activeTouch.moved = !0)
        }), Gg(b.scroller, "touchend", function(c) {
            var d = b.activeTouch;
            if (d && !rd(b, c) && null != d.left && !d.moved && new Date - d.start < 300) {
                var f, e = a.coordsChar(b.activeTouch, "page");
                f = !d.prev || i(d, d.prev) ? new Jb(e, e) : !d.prev.prev || i(d, d.prev.prev) ? a.findWordAt(e) : new Jb(ob(e.line, 0), Nb(a.doc, ob(e.line + 1, 0))), a.setSelection(f.anchor, f.head), a.focus(), Ag(c)
            }
            g()
        }), Gg(b.scroller, "touchcancel", g), Gg(b.scroller, "scroll", function() {
            b.scroller.clientHeight && (Ed(a, b.scroller.scrollTop), Fd(a, b.scroller.scrollLeft, !0), Ig(a, "scroll", a))
        }), Gg(b.scroller, "mousewheel", function(b) {
            Jd(a, b)
        }), Gg(b.scroller, "DOMMouseScroll", function(b) {
            Jd(a, b)
        }), Gg(b.wrapper, "scroll", function() {
            b.wrapper.scrollTop = b.wrapper.scrollLeft = 0
        }), b.dragFunctions = {
            simple: function(b) {
                Mg(a, b) || Dg(b)
            },
            start: function(b) {
                Dd(a, b)
            },
            drop: cd(a, Cd)
        };
        var j = b.input.getField();
        Gg(j, "keyup", function(b) {
            Td.call(a, b)
        }), Gg(j, "keydown", cd(a, Rd)), Gg(j, "keypress", cd(a, Ud)), Gg(j, "focus", fh(Wd, a)), Gg(j, "blur", fh(Xd, a))
    }

    function pd(a, b, c) {
        var d = c && c != v.Init;
        if (!b != !d) {
            var e = a.display.dragFunctions,
                f = b ? Gg : Hg;
            f(a.display.scroller, "dragstart", e.start), f(a.display.scroller, "dragenter", e.simple), f(a.display.scroller, "dragover", e.simple), f(a.display.scroller, "drop", e.drop)
        }
    }

    function qd(a) {
        var b = a.display;
        (b.lastWrapHeight != b.wrapper.clientHeight || b.lastWrapWidth != b.wrapper.clientWidth) && (b.cachedCharWidth = b.cachedTextHeight = b.cachedPaddingH = null, b.scrollbarsClipped = !1, a.setSize())
    }

    function rd(a, b) {
        for (var c = Eg(b); c != a.wrapper; c = c.parentNode)
            if (!c || 1 == c.nodeType && "true" == c.getAttribute("cm-ignore-events") || c.parentNode == a.sizer && c != a.mover) return !0
    }

    function sd(a, b, c, d) {
        var e = a.display;
        if (!c && "true" == Eg(b).getAttribute("cm-not-content")) return null;
        var f, g, h = e.lineSpace.getBoundingClientRect();
        try {
            f = b.clientX - h.left, g = b.clientY - h.top
        } catch (b) {
            return null
        }
        var j, i = Nc(a, f, g);
        if (d && 1 == i.xRel && (j = dg(a.doc, i.line).text).length == i.ch) {
            var k = Wg(j, j.length, a.options.tabSize) - j.length;
            i = ob(i.line, Math.max(0, Math.round((f - nc(a.display).left) / Rc(a.display)) - k))
        }
        return i
    }

    function td(a) {
        var b = this,
            c = b.display;
        if (!(c.activeTouch && c.input.supportsTouch() || Mg(b, a))) {
            if (c.shift = a.shiftKey, rd(c, a)) return f || (c.scroller.draggable = !1, setTimeout(function() {
                c.scroller.draggable = !0
            }, 100)), void 0;
            if (!Ad(b, a)) {
                var d = sd(b, a);
                switch (window.focus(), Fg(a)) {
                    case 1:
                        d ? wd(b, a, d) : Eg(a) == c.scroller && Ag(a);
                        break;
                    case 2:
                        f && (b.state.lastMiddleDown = +new Date), d && Sb(b.doc, d), setTimeout(function() {
                            c.input.focus()
                        }, 20), Ag(a);
                        break;
                    case 3:
                        s ? Yd(b, a) : Vd(b)
                }
            }
        }
    }

    function wd(a, b, c) {
        d ? setTimeout(fh(tb, a), 0) : a.curOp.focus = rh();
        var f, e = +new Date;
        vd && vd.time > e - 400 && 0 == pb(vd.pos, c) ? f = "triple" : ud && ud.time > e - 400 && 0 == pb(ud.pos, c) ? (f = "double", vd = {
            time: e,
            pos: c
        }) : (f = "single", ud = {
            time: e,
            pos: c
        });
        var i, g = a.doc.sel,
            h = o ? b.metaKey : b.ctrlKey;
        a.options.dragDrop && Ah && !ub(a) && "single" == f && (i = g.contains(c)) > -1 && !g.ranges[i].empty() ? xd(a, b, c, h) : yd(a, b, c, f, h)
    }

    function xd(a, b, c, g) {
        var h = a.display,
            i = +new Date,
            j = cd(a, function(k) {
                f && (h.scroller.draggable = !1), a.state.draggingText = !1, Hg(document, "mouseup", j), Hg(h.scroller, "drop", j), Math.abs(b.clientX - k.clientX) + Math.abs(b.clientY - k.clientY) < 10 && (Ag(k), !g && +new Date - 200 < i && Sb(a.doc, c), f || d && 9 == e ? setTimeout(function() {
                    document.body.focus(), h.input.focus()
                }, 20) : h.input.focus())
            });
        f && (h.scroller.draggable = !0), a.state.draggingText = j, h.scroller.dragDrop && h.scroller.dragDrop(), Gg(document, "mouseup", j), Gg(h.scroller, "drop", j)
    }

    function yd(a, b, c, d, e) {
        function o(b) {
            if (0 != pb(n, b))
                if (n = b, "rect" == d) {
                    for (var e = [], f = a.options.tabSize, k = Wg(dg(g, c.line).text, c.ch, f), l = Wg(dg(g, b.line).text, b.ch, f), m = Math.min(k, l), o = Math.max(k, l), p = Math.min(c.line, b.line), q = Math.min(a.lastLine(), Math.max(c.line, b.line)); q >= p; p++) {
                        var r = dg(g, p).text,
                            s = Xg(r, m, f);
                        m == o ? e.push(new Jb(ob(p, s), ob(p, s))) : r.length > s && e.push(new Jb(ob(p, s), ob(p, Xg(r, o, f))))
                    }
                    e.length || e.push(new Jb(c, c)), Yb(g, Kb(j.ranges.slice(0, i).concat(e), i), {
                        origin: "*mouse",
                        scroll: !1
                    }), a.scrollIntoView(b)
                } else {
                    var t = h,
                        u = t.anchor,
                        v = b;
                    if ("single" != d) {
                        if ("double" == d) var w = a.findWordAt(b);
                        else var w = new Jb(ob(b.line, 0), Nb(g, ob(b.line + 1, 0)));
                        pb(w.anchor, u) > 0 ? (v = w.head, u = sb(t.from(), w.anchor)) : (v = w.anchor, u = rb(t.to(), w.head))
                    }
                    var e = j.ranges.slice(0);
                    e[i] = new Jb(Nb(g, u), v), Yb(g, Kb(e, i), Tg)
                }
        }

        function r(b) {
            var c = ++q,
                e = sd(a, b, !0, "rect" == d);
            if (e)
                if (0 != pb(e, n)) {
                    a.curOp.focus = rh(), o(e);
                    var h = P(f, g);
                    (e.line >= h.to || e.line < h.from) && setTimeout(cd(a, function() {
                        q == c && r(b)
                    }), 150)
                } else {
                    var i = b.clientY < p.top ? -20 : b.clientY > p.bottom ? 20 : 0;
                    i && setTimeout(cd(a, function() {
                        q == c && (f.scroller.scrollTop += i, r(b))
                    }), 50)
                }
        }

        function s(a) {
            q = 1 / 0, Ag(a), f.input.focus(), Hg(document, "mousemove", t), Hg(document, "mouseup", u), g.history.lastSelOrigin = null
        }
        var f = a.display,
            g = a.doc;
        Ag(b);
        var h, i, j = g.sel,
            k = j.ranges;
        if (e && !b.shiftKey ? (i = g.sel.contains(c), h = i > -1 ? k[i] : new Jb(c, c)) : (h = g.sel.primary(), i = g.sel.primIndex), b.altKey) d = "rect", e || (h = new Jb(c, c)), c = sd(a, b, !0, !0), i = -1;
        else if ("double" == d) {
            var l = a.findWordAt(c);
            h = a.display.shift || g.extend ? Rb(g, h, l.anchor, l.head) : l
        } else if ("triple" == d) {
            var m = new Jb(ob(c.line, 0), Nb(g, ob(c.line + 1, 0)));
            h = a.display.shift || g.extend ? Rb(g, h, m.anchor, m.head) : m
        } else h = Rb(g, h, c);
        e ? -1 == i ? (i = k.length, Yb(g, Kb(k.concat([h]), i), {
            scroll: !1,
            origin: "*mouse"
        })) : k.length > 1 && k[i].empty() && "single" == d && !b.shiftKey ? (Yb(g, Kb(k.slice(0, i).concat(k.slice(i + 1)), 0)), j = g.sel) : Ub(g, i, h, Tg) : (i = 0, Yb(g, new Ib([h], 0), Tg), j = g.sel);
        var n = c,
            p = f.wrapper.getBoundingClientRect(),
            q = 0,
            t = cd(a, function(a) {
                Fg(a) ? r(a) : s(a)
            }),
            u = cd(a, s);
        Gg(document, "mousemove", t), Gg(document, "mouseup", u)
    }

    function zd(a, b, c, d, e) {
        try {
            var f = b.clientX,
                g = b.clientY
        } catch (b) {
            return !1
        }
        if (f >= Math.floor(a.display.gutters.getBoundingClientRect().right)) return !1;
        d && Ag(b);
        var h = a.display,
            i = h.lineDiv.getBoundingClientRect();
        if (g > i.bottom || !Og(a, c)) return Cg(b);
        g -= i.top - h.viewOffset;
        for (var j = 0; j < a.options.gutters.length; ++j) {
            var k = h.gutters.childNodes[j];
            if (k && k.getBoundingClientRect().right >= f) {
                var l = ig(a.doc, g),
                    m = a.options.gutters[j];
                return e(a, c, a, l, m, b), Cg(b)
            }
        }
    }

    function Ad(a, b) {
        return zd(a, b, "gutterClick", !0, Kg)
    }

    function Cd(a) {
        var b = this;
        if (!Mg(b, a) && !rd(b.display, a)) {
            Ag(a), d && (Bd = +new Date);
            var c = sd(b, a, !0),
                e = a.dataTransfer.files;
            if (c && !ub(b))
                if (e && e.length && window.FileReader && window.File)
                    for (var f = e.length, g = Array(f), h = 0, i = function(a, d) {
                            var e = new FileReader;
                            e.onload = cd(b, function() {
                                if (g[d] = e.result, ++h == f) {
                                    c = Nb(b.doc, c);
                                    var a = {
                                        from: c,
                                        to: c,
                                        text: Fh(g.join("\n")),
                                        origin: "paste"
                                    };
                                    ee(b.doc, a), Xb(b.doc, Lb(c, $d(a)))
                                }
                            }), e.readAsText(a)
                        }, j = 0; f > j; ++j) i(e[j], j);
                else {
                    if (b.state.draggingText && b.doc.sel.contains(c) > -1) return b.state.draggingText(a), setTimeout(function() {
                        b.display.input.focus()
                    }, 20), void 0;
                    try {
                        var g = a.dataTransfer.getData("Text");
                        if (g) {
                            if (b.state.draggingText && !(o ? a.altKey : a.ctrlKey)) var k = b.listSelections();
                            if (Zb(b.doc, Lb(c, c)), k)
                                for (var j = 0; j < k.length; ++j) ke(b.doc, "", k[j].anchor, k[j].head, "drag");
                            b.replaceSelection(g, "around", "paste"), b.display.input.focus()
                        }
                    } catch (a) {}
                }
        }
    }

    function Dd(a, b) {
        if (d && (!a.state.draggingText || +new Date - Bd < 100)) return Dg(b), void 0;
        if (!Mg(a, b) && !rd(a.display, b) && (b.dataTransfer.setData("Text", a.getSelection()), b.dataTransfer.setDragImage && !j)) {
            var c = mh("img", null, null, "position: fixed; left: 0; top: 0;");
            c.src = "data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==", i && (c.width = c.height = 1, a.display.wrapper.appendChild(c), c._top = c.offsetTop), b.dataTransfer.setDragImage(c, 0, 0), i && c.parentNode.removeChild(c)
        }
    }

    function Ed(b, c) {
        Math.abs(b.doc.scrollTop - c) < 2 || (b.doc.scrollTop = c, a || Y(b, {
            top: c
        }), b.display.scroller.scrollTop != c && (b.display.scroller.scrollTop = c), b.display.scrollbars.setScrollTop(c), a && Y(b), hc(b, 100))
    }

    function Fd(a, b, c) {
        (c ? b == a.doc.scrollLeft : Math.abs(a.doc.scrollLeft - b) < 2) || (b = Math.min(b, a.display.scroller.scrollWidth - a.display.scroller.clientWidth), a.doc.scrollLeft = b, Q(a), a.display.scroller.scrollLeft != b && (a.display.scroller.scrollLeft = b), a.display.scrollbars.setScrollLeft(b))
    }

    function Jd(b, c) {
        var d = Id(c),
            e = d.x,
            g = d.y,
            h = b.display,
            j = h.scroller;
        if (e && j.scrollWidth > j.clientWidth || g && j.scrollHeight > j.clientHeight) {
            if (g && o && f) a: for (var k = c.target, l = h.view; k != j; k = k.parentNode)
                for (var m = 0; m < l.length; m++)
                    if (l[m].node == k) {
                        b.display.currentWheelTarget = k;
                        break a
                    } if (e && !a && !i && null != Hd) return g && Ed(b, Math.max(0, Math.min(j.scrollTop + g * Hd, j.scrollHeight - j.clientHeight))), Fd(b, Math.max(0, Math.min(j.scrollLeft + e * Hd, j.scrollWidth - j.clientWidth))), Ag(c), h.wheelStartX = null, void 0;
            if (g && null != Hd) {
                var n = g * Hd,
                    p = b.doc.scrollTop,
                    q = p + h.wrapper.clientHeight;
                0 > n ? p = Math.max(0, p + n - 50) : q = Math.min(b.doc.height, q + n + 50), Y(b, {
                    top: p,
                    bottom: q
                })
            }
            20 > Gd && (null == h.wheelStartX ? (h.wheelStartX = j.scrollLeft, h.wheelStartY = j.scrollTop, h.wheelDX = e, h.wheelDY = g, setTimeout(function() {
                if (null != h.wheelStartX) {
                    var a = j.scrollLeft - h.wheelStartX,
                        b = j.scrollTop - h.wheelStartY,
                        c = b && h.wheelDY && b / h.wheelDY || a && h.wheelDX && a / h.wheelDX;
                    h.wheelStartX = h.wheelStartY = null, c && (Hd = (Hd * Gd + c) / (Gd + 1), ++Gd)
                }
            }, 200)) : (h.wheelDX += e, h.wheelDY += g))
        }
    }

    function Kd(a, b, c) {
        if ("string" == typeof b && (b = Ie[b], !b)) return !1;
        a.display.input.ensurePolled();
        var d = a.display.shift,
            e = !1;
        try {
            ub(a) && (a.state.suppressEdits = !0), c && (a.display.shift = !1), e = b(a) != Rg
        } finally {
            a.display.shift = d, a.state.suppressEdits = !1
        }
        return e
    }

    function Ld(a, b, c) {
        for (var d = 0; d < a.state.keyMaps.length; d++) {
            var e = Le(b, a.state.keyMaps[d], c, a);
            if (e) return e
        }
        return a.options.extraKeys && Le(b, a.options.extraKeys, c, a) || Le(b, a.options.keyMap, c, a)
    }

    function Nd(a, b, c, d) {
        var e = a.state.keySeq;
        if (e) {
            if (Me(b)) return "handled";
            Md.set(50, function() {
                a.state.keySeq == e && (a.state.keySeq = null, a.display.input.reset())
            }), b = e + " " + b
        }
        var f = Ld(a, b, d);
        return "multi" == f && (a.state.keySeq = b), "handled" == f && Kg(a, "keyHandled", a, b, c), ("handled" == f || "multi" == f) && (Ag(c), gc(a)), e && !f && /\'$/.test(b) ? (Ag(c), !0) : !!f
    }

    function Od(a, b) {
        var c = Ne(b, !0);
        return c ? b.shiftKey && !a.state.keySeq ? Nd(a, "Shift-" + c, b, function(b) {
            return Kd(a, b, !0)
        }) || Nd(a, c, b, function(b) {
            return ("string" == typeof b ? /^go[A-Z]/.test(b) : b.motion) ? Kd(a, b) : void 0
        }) : Nd(a, c, b, function(b) {
            return Kd(a, b)
        }) : !1
    }

    function Pd(a, b, c) {
        return Nd(a, "'" + c + "'", b, function(b) {
            return Kd(a, b, !0)
        })
    }

    function Rd(a) {
        var b = this;
        if (b.curOp.focus = rh(), !Mg(b, a)) {
            d && 11 > e && 27 == a.keyCode && (a.returnValue = !1);
            var c = a.keyCode;
            b.display.shift = 16 == c || a.shiftKey;
            var f = Od(b, a);
            i && (Qd = f ? c : null, !f && 88 == c && !Hh && (o ? a.metaKey : a.ctrlKey) && b.replaceSelection("", null, "cut")), 18 != c || /\bCodeMirror-crosshair\b/.test(b.display.lineDiv.className) || Sd(b)
        }
    }

    function Sd(a) {
        function c(a) {
            18 != a.keyCode && a.altKey || (th(b, "CodeMirror-crosshair"), Hg(document, "keyup", c), Hg(document, "mouseover", c))
        }
        var b = a.display.lineDiv;
        uh(b, "CodeMirror-crosshair"), Gg(document, "keyup", c), Gg(document, "mouseover", c)
    }

    function Td(a) {
        16 == a.keyCode && (this.doc.sel.shift = !1), Mg(this, a)
    }

    function Ud(a) {
        var b = this;
        if (!(rd(b.display, a) || Mg(b, a) || a.ctrlKey && !a.altKey || o && a.metaKey)) {
            var c = a.keyCode,
                d = a.charCode;
            if (i && c == Qd) return Qd = null, Ag(a), void 0;
            if (!i || a.which && !(a.which < 10) || !Od(b, a)) {
                var e = String.fromCharCode(null == d ? c : d);
                Pd(b, a, e) || b.display.input.onKeyPress(a)
            }
        }
    }

    function Vd(a) {
        a.state.delayingBlurEvent = !0, setTimeout(function() {
            a.state.delayingBlurEvent && (a.state.delayingBlurEvent = !1, Xd(a))
        }, 100)
    }

    function Wd(a) {
        a.state.delayingBlurEvent && (a.state.delayingBlurEvent = !1), "nocursor" != a.options.readOnly && (a.state.focused || (Ig(a, "focus", a), a.state.focused = !0, uh(a.display.wrapper, "CodeMirror-focused"), a.curOp || a.display.selForContextMenu == a.doc.sel || (a.display.input.reset(), f && setTimeout(function() {
            a.display.input.reset(!0)
        }, 20)), a.display.input.receivedFocus()), gc(a))
    }

    function Xd(a) {
        a.state.delayingBlurEvent || (a.state.focused && (Ig(a, "blur", a), a.state.focused = !1, th(a.display.wrapper, "CodeMirror-focused")), clearInterval(a.display.blinker), setTimeout(function() {
            a.state.focused || (a.display.shift = !1)
        }, 150))
    }

    function Yd(a, b) {
        rd(a.display, b) || Zd(a, b) || a.display.input.onContextMenu(b)
    }

    function Zd(a, b) {
        return Og(a, "gutterContextMenu") ? zd(a, b, "gutterContextMenu", !1, Ig) : !1
    }

    function _d(a, b) {
        if (pb(a, b.from) < 0) return a;
        if (pb(a, b.to) <= 0) return $d(b);
        var c = a.line + b.text.length - (b.to.line - b.from.line) - 1,
            d = a.ch;
        return a.line == b.to.line && (d += $d(b).ch - b.to.ch), ob(c, d)
    }

    function ae(a, b) {
        for (var c = [], d = 0; d < a.sel.ranges.length; d++) {
            var e = a.sel.ranges[d];
            c.push(new Jb(_d(e.anchor, b), _d(e.head, b)))
        }
        return Kb(c, a.sel.primIndex)
    }

    function be(a, b, c) {
        return a.line == b.line ? ob(c.line, a.ch - b.ch + c.ch) : ob(c.line + (a.line - b.line), a.ch)
    }

    function ce(a, b, c) {
        for (var d = [], e = ob(a.first, 0), f = e, g = 0; g < b.length; g++) {
            var h = b[g],
                i = be(h.from, e, f),
                j = be($d(h), e, f);
            if (e = h.to, f = j, "around" == c) {
                var k = a.sel.ranges[g],
                    l = pb(k.head, k.anchor) < 0;
                d[g] = new Jb(l ? j : i, l ? i : j)
            } else d[g] = new Jb(i, i)
        }
        return new Ib(d, a.sel.primIndex)
    }

    function de(a, b, c) {
        var d = {
            canceled: !1,
            from: b.from,
            to: b.to,
            text: b.text,
            origin: b.origin,
            cancel: function() {
                this.canceled = !0
            }
        };
        return c && (d.update = function(b, c, d, e) {
            b && (this.from = Nb(a, b)), c && (this.to = Nb(a, c)), d && (this.text = d), void 0 !== e && (this.origin = e)
        }), Ig(a, "beforeChange", a, d), a.cm && Ig(a.cm, "beforeChange", a.cm, d), d.canceled ? null : {
            from: d.from,
            to: d.to,
            text: d.text,
            origin: d.origin
        }
    }

    function ee(a, b, c) {
        if (a.cm) {
            if (!a.cm.curOp) return cd(a.cm, ee)(a, b, c);
            if (a.cm.state.suppressEdits) return
        }
        if (!(Og(a, "beforeChange") || a.cm && Og(a.cm, "beforeChange")) || (b = de(a, b, !0))) {
            var d = t && !c && ff(a, b.from, b.to);
            if (d)
                for (var e = d.length - 1; e >= 0; --e) fe(a, {
                    from: d[e].from,
                    to: d[e].to,
                    text: e ? [""] : b.text
                });
            else fe(a, b)
        }
    }

    function fe(a, b) {
        if (1 != b.text.length || "" != b.text[0] || 0 != pb(b.from, b.to)) {
            var c = ae(a, b);
            pg(a, b, c, a.cm ? a.cm.curOp.id : 0 / 0), ie(a, b, c, cf(a, b));
            var d = [];
            bg(a, function(a, c) {
                c || -1 != ah(d, a.history) || (zg(a.history, b), d.push(a.history)), ie(a, b, null, cf(a, b))
            })
        }
    }

    function ge(a, b, c) {
        if (!a.cm || !a.cm.state.suppressEdits) {
            for (var e, d = a.history, f = a.sel, g = "undo" == b ? d.done : d.undone, h = "undo" == b ? d.undone : d.done, i = 0; i < g.length && (e = g[i], c ? !e.ranges || e.equals(a.sel) : e.ranges); i++);
            if (i != g.length) {
                for (d.lastOrigin = d.lastSelOrigin = null; e = g.pop(), e.ranges;) {
                    if (sg(e, h), c && !e.equals(a.sel)) return Yb(a, e, {
                        clearRedo: !1
                    }), void 0;
                    f = e
                }
                var j = [];
                sg(f, h), h.push({
                    changes: j,
                    generation: d.generation
                }), d.generation = e.generation || ++d.maxGeneration;
                for (var k = Og(a, "beforeChange") || a.cm && Og(a.cm, "beforeChange"), i = e.changes.length - 1; i >= 0; --i) {
                    var l = e.changes[i];
                    if (l.origin = b, k && !de(a, l, !1)) return g.length = 0, void 0;
                    j.push(mg(a, l));
                    var m = i ? ae(a, l) : $g(g);
                    ie(a, l, m, ef(a, l)), !i && a.cm && a.cm.scrollIntoView({
                        from: l.from,
                        to: $d(l)
                    });
                    var n = [];
                    bg(a, function(a, b) {
                        b || -1 != ah(n, a.history) || (zg(a.history, l), n.push(a.history)), ie(a, l, null, ef(a, l))
                    })
                }
            }
        }
    }

    function he(a, b) {
        if (0 != b && (a.first += b, a.sel = new Ib(bh(a.sel.ranges, function(a) {
                return new Jb(ob(a.anchor.line + b, a.anchor.ch), ob(a.head.line + b, a.head.ch))
            }), a.sel.primIndex), a.cm)) {
            hd(a.cm, a.first, a.first - b, b);
            for (var c = a.cm.display, d = c.viewFrom; d < c.viewTo; d++) id(a.cm, d, "gutter")
        }
    }

    function ie(a, b, c, d) {
        if (a.cm && !a.cm.curOp) return cd(a.cm, ie)(a, b, c, d);
        if (b.to.line < a.first) return he(a, b.text.length - 1 - (b.to.line - b.from.line)), void 0;
        if (!(b.from.line > a.lastLine())) {
            if (b.from.line < a.first) {
                var e = b.text.length - 1 - (a.first - b.from.line);
                he(a, e), b = {
                    from: ob(a.first, 0),
                    to: ob(b.to.line + e, b.to.ch),
                    text: [$g(b.text)],
                    origin: b.origin
                }
            }
            var f = a.lastLine();
            b.to.line > f && (b = {
                from: b.from,
                to: ob(f, dg(a, f).text.length),
                text: [b.text[0]],
                origin: b.origin
            }), b.removed = eg(a, b.from, b.to), c || (c = ae(a, b)), a.cm ? je(a.cm, b, d) : Wf(a, b, d), Zb(a, c, Sg)
        }
    }

    function je(a, b, c) {
        var d = a.doc,
            e = a.display,
            f = b.from,
            g = b.to,
            h = !1,
            i = f.line;
        a.options.lineWrapping || (i = hg(qf(dg(d, f.line))), d.iter(i, g.line + 1, function(a) {
            return a == e.maxLine ? (h = !0, !0) : void 0
        })), d.sel.contains(b.from, b.to) > -1 && Ng(a), Wf(d, b, c, A(a)), a.options.lineWrapping || (d.iter(i, f.line + b.text.length, function(a) {
            var b = G(a);
            b > e.maxLineLength && (e.maxLine = a, e.maxLineLength = b, e.maxLineChanged = !0, h = !1)
        }), h && (a.curOp.updateMaxLine = !0)), d.frontier = Math.min(d.frontier, f.line), hc(a, 400);
        var j = b.text.length - (g.line - f.line) - 1;
        b.full ? hd(a) : f.line != g.line || 1 != b.text.length || Vf(a.doc, b) ? hd(a, f.line, g.line + 1, j) : id(a, f.line, "text");
        var k = Og(a, "changes"),
            l = Og(a, "change");
        if (l || k) {
            var m = {
                from: f,
                to: g,
                text: b.text,
                removed: b.removed,
                origin: b.origin
            };
            l && Kg(a, "change", a, m), k && (a.curOp.changeObjs || (a.curOp.changeObjs = [])).push(m)
        }
        a.display.selForContextMenu = null
    }

    function ke(a, b, c, d, e) {
        if (d || (d = c), pb(d, c) < 0) {
            var f = d;
            d = c, c = f
        }
        "string" == typeof b && (b = Fh(b)), ee(a, {
            from: c,
            to: d,
            text: b,
            origin: e
        })
    }

    function le(a, b) {
        if (!Mg(a, "scrollCursorIntoView")) {
            var c = a.display,
                d = c.sizer.getBoundingClientRect(),
                e = null;
            if (b.top + d.top < 0 ? e = !0 : b.bottom + d.top > (window.innerHeight || document.documentElement.clientHeight) && (e = !1), null != e && !l) {
                var f = mh("div", "\u200b", null, "position: absolute; top: " + (b.top - c.viewOffset - lc(a.display)) + "px; height: " + (b.bottom - b.top + oc(a) + c.barHeight) + "px; left: " + b.left + "px; width: 2px;");
                a.display.lineSpace.appendChild(f), f.scrollIntoView(e), a.display.lineSpace.removeChild(f)
            }
        }
    }

    function me(a, b, c, d) {
        null == d && (d = 0);
        for (var e = 0; 5 > e; e++) {
            var f = !1,
                g = Kc(a, b),
                h = c && c != b ? Kc(a, c) : g,
                i = oe(a, Math.min(g.left, h.left), Math.min(g.top, h.top) - d, Math.max(g.left, h.left), Math.max(g.bottom, h.bottom) + d),
                j = a.doc.scrollTop,
                k = a.doc.scrollLeft;
            if (null != i.scrollTop && (Ed(a, i.scrollTop), Math.abs(a.doc.scrollTop - j) > 1 && (f = !0)), null != i.scrollLeft && (Fd(a, i.scrollLeft), Math.abs(a.doc.scrollLeft - k) > 1 && (f = !0)), !f) break
        }
        return g
    }

    function ne(a, b, c, d, e) {
        var f = oe(a, b, c, d, e);
        null != f.scrollTop && Ed(a, f.scrollTop), null != f.scrollLeft && Fd(a, f.scrollLeft)
    }

    function oe(a, b, c, d, e) {
        var f = a.display,
            g = Qc(a.display);
        0 > c && (c = 0);
        var h = a.curOp && null != a.curOp.scrollTop ? a.curOp.scrollTop : f.scroller.scrollTop,
            i = qc(a),
            j = {};
        e - c > i && (e = c + i);
        var k = a.doc.height + mc(f),
            l = g > c,
            m = e > k - g;
        if (h > c) j.scrollTop = l ? 0 : c;
        else if (e > h + i) {
            var n = Math.min(c, (m ? k : e) - i);
            n != h && (j.scrollTop = n)
        }
        var o = a.curOp && null != a.curOp.scrollLeft ? a.curOp.scrollLeft : f.scroller.scrollLeft,
            p = pc(a) - (a.options.fixedGutter ? f.gutters.offsetWidth : 0),
            q = d - b > p;
        return q && (d = b + p), 10 > b ? j.scrollLeft = 0 : o > b ? j.scrollLeft = Math.max(0, b - (q ? 0 : 10)) : d > p + o - 3 && (j.scrollLeft = d + (q ? 0 : 10) - p), j
    }

    function pe(a, b, c) {
        (null != b || null != c) && re(a), null != b && (a.curOp.scrollLeft = (null == a.curOp.scrollLeft ? a.doc.scrollLeft : a.curOp.scrollLeft) + b), null != c && (a.curOp.scrollTop = (null == a.curOp.scrollTop ? a.doc.scrollTop : a.curOp.scrollTop) + c)
    }

    function qe(a) {
        re(a);
        var b = a.getCursor(),
            c = b,
            d = b;
        a.options.lineWrapping || (c = b.ch ? ob(b.line, b.ch - 1) : b, d = ob(b.line, b.ch + 1)), a.curOp.scrollToPos = {
            from: c,
            to: d,
            margin: a.options.cursorScrollMargin,
            isCursor: !0
        }
    }

    function re(a) {
        var b = a.curOp.scrollToPos;
        if (b) {
            a.curOp.scrollToPos = null;
            var c = Lc(a, b.from),
                d = Lc(a, b.to),
                e = oe(a, Math.min(c.left, d.left), Math.min(c.top, d.top) - b.margin, Math.max(c.right, d.right), Math.max(c.bottom, d.bottom) + b.margin);
            a.scrollTo(e.scrollLeft, e.scrollTop)
        }
    }

    function se(a, b, c, d) {
        var f, e = a.doc;
        null == c && (c = "add"), "smart" == c && (e.mode.indent ? f = kc(a, b) : c = "prev");
        var g = a.options.tabSize,
            h = dg(e, b),
            i = Wg(h.text, null, g);
        h.stateAfter && (h.stateAfter = null);
        var k, j = h.text.match(/^\s*/)[0];
        if (d || /\S/.test(h.text)) {
            if ("smart" == c && (k = e.mode.indent(f, h.text.slice(j.length), h.text), k == Rg || k > 150)) {
                if (!d) return;
                c = "prev"
            }
        } else k = 0, c = "not";
        "prev" == c ? k = b > e.first ? Wg(dg(e, b - 1).text, null, g) : 0 : "add" == c ? k = i + a.options.indentUnit : "subtract" == c ? k = i - a.options.indentUnit : "number" == typeof c && (k = i + c), k = Math.max(0, k);
        var l = "",
            m = 0;
        if (a.options.indentWithTabs)
            for (var n = Math.floor(k / g); n; --n) m += g, l += "	";
        if (k > m && (l += Zg(k - m)), l != j) return ke(e, l, ob(b, 0), ob(b, j.length), "+input"), h.stateAfter = null, !0;
        for (var n = 0; n < e.sel.ranges.length; n++) {
            var o = e.sel.ranges[n];
            if (o.head.line == b && o.head.ch < j.length) {
                var m = ob(b, j.length);
                Ub(e, n, new Jb(m, m));
                break
            }
        }
    }

    function te(a, b, c, d) {
        var e = b,
            f = b;
        return "number" == typeof b ? f = dg(a, Mb(a, b)) : e = hg(b), null == e ? null : (d(f, e) && a.cm && id(a.cm, e, c), f)
    }

    function ue(a, b) {
        for (var c = a.doc.sel.ranges, d = [], e = 0; e < c.length; e++) {
            for (var f = b(c[e]); d.length && pb(f.from, $g(d).to) <= 0;) {
                var g = d.pop();
                if (pb(g.from, f.from) < 0) {
                    f.from = g.from;
                    break
                }
            }
            d.push(f)
        }
        bd(a, function() {
            for (var b = d.length - 1; b >= 0; b--) ke(a.doc, "", d[b].from, d[b].to, "+delete");
            qe(a)
        })
    }

    function ve(a, b, c, d, e) {
        function k() {
            var b = f + c;
            return b < a.first || b >= a.first + a.size ? j = !1 : (f = b, i = dg(a, b))
        }

        function l(a) {
            var b = (e ? Xh : Yh)(i, g, c, !0);
            if (null == b) {
                if (a || !k()) return j = !1;
                g = e ? (0 > c ? Ph : Oh)(i) : 0 > c ? i.text.length : 0
            } else g = b;
            return !0
        }
        var f = b.line,
            g = b.ch,
            h = c,
            i = dg(a, f),
            j = !0;
        if ("char" == d) l();
        else if ("column" == d) l(!0);
        else if ("word" == d || "group" == d)
            for (var m = null, n = "group" == d, o = a.cm && a.cm.getHelper(b, "wordChars"), p = !0; !(0 > c) || l(!p); p = !1) {
                var q = i.text.charAt(g) || "\n",
                    r = ih(q, o) ? "w" : n && "\n" == q ? "n" : !n || /\s/.test(q) ? null : "p";
                if (!n || p || r || (r = "s"), m && m != r) {
                    0 > c && (c = 1, l());
                    break
                }
                if (r && (m = r), c > 0 && !l(!p)) break
            }
        var s = bc(a, ob(f, g), h, !0);
        return j || (s.hitSide = !0), s
    }

    function we(a, b, c, d) {
        var g, e = a.doc,
            f = b.left;
        if ("page" == d) {
            var h = Math.min(a.display.wrapper.clientHeight, window.innerHeight || document.documentElement.clientHeight);
            g = b.top + c * (h - (0 > c ? 1.5 : .5) * Qc(a.display))
        } else "line" == d && (g = c > 0 ? b.bottom + 3 : b.top - 3);
        for (;;) {
            var i = Nc(a, f, g);
            if (!i.outside) break;
            if (0 > c ? 0 >= g : g >= e.height) {
                i.hitSide = !0;
                break
            }
            g += 5 * c
        }
        return i
    }

    function ze(a, b, c, d) {
        v.defaults[a] = b, c && (ye[a] = d ? function(a, b, d) {
            d != Ae && c(a, b, d)
        } : c)
    }

    function Ke(a) {
        for (var c, d, e, f, b = a.split(/-(?!$)/), a = b[b.length - 1], g = 0; g < b.length - 1; g++) {
            var h = b[g];
            if (/^(cmd|meta|m)$/i.test(h)) f = !0;
            else if (/^a(lt)?$/i.test(h)) c = !0;
            else if (/^(c|ctrl|control)$/i.test(h)) d = !0;
            else {
                if (!/^s(hift)$/i.test(h)) throw new Error("Unrecognized modifier name: " + h);
                e = !0
            }
        }
        return c && (a = "Alt-" + a), d && (a = "Ctrl-" + a), f && (a = "Cmd-" + a), e && (a = "Shift-" + a), a
    }

    function Oe(a) {
        return "string" == typeof a ? Je[a] : a
    }

    function Se(a, b, c, d, e) {
        if (d && d.shared) return Ue(a, b, c, d, e);
        if (a.cm && !a.cm.curOp) return cd(a.cm, Se)(a, b, c, d, e);
        var f = new Re(a, e),
            g = pb(b, c);
        if (d && eh(d, f, !1), g > 0 || 0 == g && f.clearWhenEmpty !== !1) return f;
        if (f.replacedWith && (f.collapsed = !0, f.widgetNode = mh("span", [f.replacedWith], "CodeMirror-widget"), d.handleMouseEvents || f.widgetNode.setAttribute("cm-ignore-events", "true"), d.insertLeft && (f.widgetNode.insertLeft = !0)), f.collapsed) {
            if (pf(a, b.line, b, c, f) || b.line != c.line && pf(a, c.line, b, c, f)) throw new Error("Inserting collapsed marker partially overlapping an existing one");
            u = !0
        }
        f.addToHistory && pg(a, {
            from: b,
            to: c,
            origin: "markText"
        }, a.sel, 0 / 0);
        var j, h = b.line,
            i = a.cm;
        if (a.iter(h, c.line + 1, function(a) {
                i && f.collapsed && !i.options.lineWrapping && qf(a) == i.display.maxLine && (j = !0), f.collapsed && h != b.line && gg(a, 0), _e(a, new Ye(f, h == b.line ? b.ch : null, h == c.line ? c.ch : null)), ++h
            }), f.collapsed && a.iter(b.line, c.line + 1, function(b) {
                uf(a, b) && gg(b, 0)
            }), f.clearOnEnter && Gg(f, "beforeCursorEnter", function() {
                f.clear()
            }), f.readOnly && (t = !0, (a.history.done.length || a.history.undone.length) && a.clearHistory()), f.collapsed && (f.id = ++Qe, f.atomic = !0), i) {
            if (j && (i.curOp.updateMaxLine = !0), f.collapsed) hd(i, b.line, c.line + 1);
            else if (f.className || f.title || f.startStyle || f.endStyle || f.css)
                for (var k = b.line; k <= c.line; k++) id(i, k, "text");
            f.atomic && _b(i.doc), Kg(i, "markerAdded", i, f)
        }
        return f
    }

    function Ue(a, b, c, d, e) {
        d = eh(d), d.shared = !1;
        var f = [Se(a, b, c, d, e)],
            g = f[0],
            h = d.widgetNode;
        return bg(a, function(a) {
            h && (d.widgetNode = h.cloneNode(!0)), f.push(Se(a, Nb(a, b), Nb(a, c), d, e));
            for (var i = 0; i < a.linked.length; ++i)
                if (a.linked[i].isParent) return;
            g = $g(f)
        }), new Te(f, g)
    }

    function Ve(a) {
        return a.findMarks(ob(a.first, 0), a.clipPos(ob(a.lastLine())), function(a) {
            return a.parent
        })
    }

    function We(a, b) {
        for (var c = 0; c < b.length; c++) {
            var d = b[c],
                e = d.find(),
                f = a.clipPos(e.from),
                g = a.clipPos(e.to);
            if (pb(f, g)) {
                var h = Se(a, f, g, d.primary, d.primary.type);
                d.markers.push(h), h.parent = d
            }
        }
    }

    function Xe(a) {
        for (var b = 0; b < a.length; b++) {
            var c = a[b],
                d = [c.primary.doc];
            bg(c.primary.doc, function(a) {
                d.push(a)
            });
            for (var e = 0; e < c.markers.length; e++) {
                var f = c.markers[e]; - 1 == ah(d, f.doc) && (f.parent = null, c.markers.splice(e--, 1))
            }
        }
    }

    function Ye(a, b, c) {
        this.marker = a, this.from = b, this.to = c
    }

    function Ze(a, b) {
        if (a)
            for (var c = 0; c < a.length; ++c) {
                var d = a[c];
                if (d.marker == b) return d
            }
    }

    function $e(a, b) {
        for (var c, d = 0; d < a.length; ++d) a[d] != b && (c || (c = [])).push(a[d]);
        return c
    }

    function _e(a, b) {
        a.markedSpans = a.markedSpans ? a.markedSpans.concat([b]) : [b], b.marker.attachLine(a)
    }

    function af(a, b, c) {
        if (a)
            for (var e, d = 0; d < a.length; ++d) {
                var f = a[d],
                    g = f.marker,
                    h = null == f.from || (g.inclusiveLeft ? f.from <= b : f.from < b);
                if (h || f.from == b && "bookmark" == g.type && (!c || !f.marker.insertLeft)) {
                    var i = null == f.to || (g.inclusiveRight ? f.to >= b : f.to > b);
                    (e || (e = [])).push(new Ye(g, f.from, i ? null : f.to))
                }
            }
        return e
    }

    function bf(a, b, c) {
        if (a)
            for (var e, d = 0; d < a.length; ++d) {
                var f = a[d],
                    g = f.marker,
                    h = null == f.to || (g.inclusiveRight ? f.to >= b : f.to > b);
                if (h || f.from == b && "bookmark" == g.type && (!c || f.marker.insertLeft)) {
                    var i = null == f.from || (g.inclusiveLeft ? f.from <= b : f.from < b);
                    (e || (e = [])).push(new Ye(g, i ? null : f.from - b, null == f.to ? null : f.to - b))
                }
            }
        return e
    }

    function cf(a, b) {
        if (b.full) return null;
        var c = Pb(a, b.from.line) && dg(a, b.from.line).markedSpans,
            d = Pb(a, b.to.line) && dg(a, b.to.line).markedSpans;
        if (!c && !d) return null;
        var e = b.from.ch,
            f = b.to.ch,
            g = 0 == pb(b.from, b.to),
            h = af(c, e, g),
            i = bf(d, f, g),
            j = 1 == b.text.length,
            k = $g(b.text).length + (j ? e : 0);
        if (h)
            for (var l = 0; l < h.length; ++l) {
                var m = h[l];
                if (null == m.to) {
                    var n = Ze(i, m.marker);
                    n ? j && (m.to = null == n.to ? null : n.to + k) : m.to = e
                }
            }
        if (i)
            for (var l = 0; l < i.length; ++l) {
                var m = i[l];
                if (null != m.to && (m.to += k), null == m.from) {
                    var n = Ze(h, m.marker);
                    n || (m.from = k, j && (h || (h = [])).push(m))
                } else m.from += k, j && (h || (h = [])).push(m)
            }
        h && (h = df(h)), i && i != h && (i = df(i));
        var o = [h];
        if (!j) {
            var q, p = b.text.length - 2;
            if (p > 0 && h)
                for (var l = 0; l < h.length; ++l) null == h[l].to && (q || (q = [])).push(new Ye(h[l].marker, null, null));
            for (var l = 0; p > l; ++l) o.push(q);
            o.push(i)
        }
        return o
    }

    function df(a) {
        for (var b = 0; b < a.length; ++b) {
            var c = a[b];
            null != c.from && c.from == c.to && c.marker.clearWhenEmpty !== !1 && a.splice(b--, 1)
        }
        return a.length ? a : null
    }

    function ef(a, b) {
        var c = vg(a, b),
            d = cf(a, b);
        if (!c) return d;
        if (!d) return c;
        for (var e = 0; e < c.length; ++e) {
            var f = c[e],
                g = d[e];
            if (f && g) a: for (var h = 0; h < g.length; ++h) {
                for (var i = g[h], j = 0; j < f.length; ++j)
                    if (f[j].marker == i.marker) continue a;
                f.push(i)
            } else g && (c[e] = g)
        }
        return c
    }

    function ff(a, b, c) {
        var d = null;
        if (a.iter(b.line, c.line + 1, function(a) {
                if (a.markedSpans)
                    for (var b = 0; b < a.markedSpans.length; ++b) {
                        var c = a.markedSpans[b].marker;
                        !c.readOnly || d && -1 != ah(d, c) || (d || (d = [])).push(c)
                    }
            }), !d) return null;
        for (var e = [{
                from: b,
                to: c
            }], f = 0; f < d.length; ++f)
            for (var g = d[f], h = g.find(0), i = 0; i < e.length; ++i) {
                var j = e[i];
                if (!(pb(j.to, h.from) < 0 || pb(j.from, h.to) > 0)) {
                    var k = [i, 1],
                        l = pb(j.from, h.from),
                        m = pb(j.to, h.to);
                    (0 > l || !g.inclusiveLeft && !l) && k.push({
                        from: j.from,
                        to: h.from
                    }), (m > 0 || !g.inclusiveRight && !m) && k.push({
                        from: h.to,
                        to: j.to
                    }), e.splice.apply(e, k), i += k.length - 1
                }
            }
        return e
    }

    function gf(a) {
        var b = a.markedSpans;
        if (b) {
            for (var c = 0; c < b.length; ++c) b[c].marker.detachLine(a);
            a.markedSpans = null
        }
    }

    function hf(a, b) {
        if (b) {
            for (var c = 0; c < b.length; ++c) b[c].marker.attachLine(a);
            a.markedSpans = b
        }
    }

    function jf(a) {
        return a.inclusiveLeft ? -1 : 0
    }

    function kf(a) {
        return a.inclusiveRight ? 1 : 0
    }

    function lf(a, b) {
        var c = a.lines.length - b.lines.length;
        if (0 != c) return c;
        var d = a.find(),
            e = b.find(),
            f = pb(d.from, e.from) || jf(a) - jf(b);
        if (f) return -f;
        var g = pb(d.to, e.to) || kf(a) - kf(b);
        return g ? g : b.id - a.id
    }

    function mf(a, b) {
        var d, c = u && a.markedSpans;
        if (c)
            for (var e, f = 0; f < c.length; ++f) e = c[f], e.marker.collapsed && null == (b ? e.from : e.to) && (!d || lf(d, e.marker) < 0) && (d = e.marker);
        return d
    }

    function nf(a) {
        return mf(a, !0)
    }

    function of (a) {
        return mf(a, !1)
    }

    function pf(a, b, c, d, e) {
        var f = dg(a, b),
            g = u && f.markedSpans;
        if (g)
            for (var h = 0; h < g.length; ++h) {
                var i = g[h];
                if (i.marker.collapsed) {
                    var j = i.marker.find(0),
                        k = pb(j.from, c) || jf(i.marker) - jf(e),
                        l = pb(j.to, d) || kf(i.marker) - kf(e);
                    if (!(k >= 0 && 0 >= l || 0 >= k && l >= 0) && (0 >= k && (pb(j.to, c) > 0 || i.marker.inclusiveRight && e.inclusiveLeft) || k >= 0 && (pb(j.from, d) < 0 || i.marker.inclusiveLeft && e.inclusiveRight))) return !0
                }
            }
    }

    function qf(a) {
        for (var b; b = nf(a);) a = b.find(-1, !0).line;
        return a
    }

    function rf(a) {
        for (var b, c; b = of (a);) a = b.find(1, !0).line, (c || (c = [])).push(a);
        return c
    }

    function sf(a, b) {
        var c = dg(a, b),
            d = qf(c);
        return c == d ? b : hg(d)
    }

    function tf(a, b) {
        if (b > a.lastLine()) return b;
        var d, c = dg(a, b);
        if (!uf(a, c)) return b;
        for (; d = of (c);) c = d.find(1, !0).line;
        return hg(c) + 1
    }

    function uf(a, b) {
        var c = u && b.markedSpans;
        if (c)
            for (var d, e = 0; e < c.length; ++e)
                if (d = c[e], d.marker.collapsed) {
                    if (null == d.from) return !0;
                    if (!d.marker.widgetNode && 0 == d.from && d.marker.inclusiveLeft && vf(a, b, d)) return !0
                }
    }

    function vf(a, b, c) {
        if (null == c.to) {
            var d = c.marker.find(1, !0);
            return vf(a, d.line, Ze(d.line.markedSpans, c.marker))
        }
        if (c.marker.inclusiveRight && c.to == b.text.length) return !0;
        for (var e, f = 0; f < b.markedSpans.length; ++f)
            if (e = b.markedSpans[f], e.marker.collapsed && !e.marker.widgetNode && e.from == c.to && (null == e.to || e.to != c.from) && (e.marker.inclusiveLeft || c.marker.inclusiveRight) && vf(a, b, e)) return !0
    }

    function xf(a, b, c) {
        jg(b) < (a.curOp && a.curOp.scrollTop || a.doc.scrollTop) && pe(a, null, c)
    }

    function yf(a) {
        if (null != a.height) return a.height;
        var b = a.doc.cm;
        if (!b) return 0;
        if (!qh(document.body, a.node)) {
            var c = "position: relative;";
            a.coverGutter && (c += "margin-left: -" + b.display.gutters.offsetWidth + "px;"), a.noHScroll && (c += "width: " + b.display.wrapper.clientWidth + "px;"), ph(b.display.measure, mh("div", [a.node], null, c))
        }
        return a.height = a.node.offsetHeight
    }

    function zf(a, b, c, d) {
        var e = new wf(a, c, d),
            f = a.cm;
        return f && e.noHScroll && (f.display.alignWidgets = !0), te(a, b, "widget", function(b) {
            var c = b.widgets || (b.widgets = []);
            if (null == e.insertAt ? c.push(e) : c.splice(Math.min(c.length - 1, Math.max(0, e.insertAt)), 0, e), e.line = b, f && !uf(a, b)) {
                var d = jg(b) < a.scrollTop;
                gg(b, b.height + yf(e)), d && pe(f, null, e.height), f.curOp.forceUpdate = !0
            }
            return !0
        }), e
    }

    function Bf(a, b, c, d) {
        a.text = b, a.stateAfter && (a.stateAfter = null), a.styles && (a.styles = null), null != a.order && (a.order = null), gf(a), hf(a, c);
        var e = d ? d(a) : 1;
        e != a.height && gg(a, e)
    }

    function Cf(a) {
        a.parent = null, gf(a)
    }

    function Df(a, b) {
        if (a)
            for (;;) {
                var c = a.match(/(?:^|\s+)line-(background-)?(\S+)/);
                if (!c) break;
                a = a.slice(0, c.index) + a.slice(c.index + c[0].length);
                var d = c[1] ? "bgClass" : "textClass";
                null == b[d] ? b[d] = c[2] : new RegExp("(?:^|s)" + c[2] + "(?:$|s)").test(b[d]) || (b[d] += " " + c[2])
            }
        return a
    }

    function Ef(a, b) {
        if (a.blankLine) return a.blankLine(b);
        if (a.innerMode) {
            var c = v.innerMode(a, b);
            return c.mode.blankLine ? c.mode.blankLine(c.state) : void 0
        }
    }

    function Ff(a, b, c, d) {
        for (var e = 0; 10 > e; e++) {
            d && (d[0] = v.innerMode(a, c).mode);
            var f = a.token(b, c);
            if (b.pos > b.start) return f
        }
        throw new Error("Mode " + a.name + " failed to advance stream.")
    }

    function Gf(a, b, c, d) {
        function e(a) {
            return {
                start: k.start,
                end: k.pos,
                string: k.current(),
                type: h || null,
                state: a ? Ge(f.mode, j) : j
            }
        }
        var h, f = a.doc,
            g = f.mode;
        b = Nb(f, b);
        var l, i = dg(f, b.line),
            j = kc(a, b.line, c),
            k = new Pe(i.text, a.options.tabSize);
        for (d && (l = []);
            (d || k.pos < b.ch) && !k.eol();) k.start = k.pos, h = Ff(g, k, j), d && l.push(e(!0));
        return d ? l : e()
    }

    function Hf(a, b, c, d, e, f, g) {
        var h = c.flattenSpans;
        null == h && (h = a.options.flattenSpans);
        var l, i = 0,
            j = null,
            k = new Pe(b, a.options.tabSize),
            m = a.options.addModeClass && [null];
        for ("" == b && Df(Ef(c, d), f); !k.eol();) {
            if (k.pos > a.options.maxHighlightLength ? (h = !1, g && Kf(a, b, d, k.pos), k.pos = b.length, l = null) : l = Df(Ff(c, k, d, m), f), m) {
                var n = m[0].name;
                n && (l = "m-" + (l ? n + " " + l : n))
            }
            if (!h || j != l) {
                for (; i < k.start;) i = Math.min(k.start, i + 5e4), e(i, j);
                j = l
            }
            k.start = k.pos
        }
        for (; i < k.pos;) {
            var o = Math.min(k.pos, i + 5e4);
            e(o, j), i = o
        }
    }

    function If(a, b, c, d) {
        var e = [a.state.modeGen],
            f = {};
        Hf(a, b.text, a.doc.mode, c, function(a, b) {
            e.push(a, b)
        }, f, d);
        for (var g = 0; g < a.state.overlays.length; ++g) {
            var h = a.state.overlays[g],
                i = 1,
                j = 0;
            Hf(a, b.text, h.mode, !0, function(a, b) {
                for (var c = i; a > j;) {
                    var d = e[i];
                    d > a && e.splice(i, 1, a, e[i + 1], d), i += 2, j = Math.min(a, d)
                }
                if (b)
                    if (h.opaque) e.splice(c, i - c, a, "cm-overlay " + b), i = c + 2;
                    else
                        for (; i > c; c += 2) {
                            var f = e[c + 1];
                            e[c + 1] = (f ? f + " " : "") + "cm-overlay " + b
                        }
            }, f)
        }
        return {
            styles: e,
            classes: f.bgClass || f.textClass ? f : null
        }
    }

    function Jf(a, b, c) {
        if (!b.styles || b.styles[0] != a.state.modeGen) {
            var d = If(a, b, b.stateAfter = kc(a, hg(b)));
            b.styles = d.styles, d.classes ? b.styleClasses = d.classes : b.styleClasses && (b.styleClasses = null), c === a.doc.frontier && a.doc.frontier++
        }
        return b.styles
    }

    function Kf(a, b, c, d) {
        var e = a.doc.mode,
            f = new Pe(b, a.options.tabSize);
        for (f.start = f.pos = d || 0, "" == b && Ef(e, c); !f.eol() && f.pos <= a.options.maxHighlightLength;) Ff(e, f, c), f.start = f.pos
    }

    function Nf(a, b) {
        if (!a || /^\s*$/.test(a)) return null;
        var c = b.addModeClass ? Mf : Lf;
        return c[a] || (c[a] = a.replace(/\S+/g, "cm-$&"))
    }

    function Of(a, b) {
        var c = mh("span", null, null, f ? "padding-right: .1px" : null),
            e = {
                pre: mh("pre", [c]),
                content: c,
                col: 0,
                pos: 0,
                cm: a,
                splitSpaces: (d || f) && a.getOption("lineWrapping")
            };
        b.measure = {};
        for (var g = 0; g <= (b.rest ? b.rest.length : 0); g++) {
            var i, h = g ? b.rest[g - 1] : b.line;
            e.pos = 0, e.addToken = Qf, Eh(a.display.measure) && (i = kg(h)) && (e.addToken = Sf(e.addToken, i)), e.map = [];
            var j = b != a.display.externalMeasured && hg(h);
            Uf(h, e, Jf(a, h, j)), h.styleClasses && (h.styleClasses.bgClass && (e.bgClass = vh(h.styleClasses.bgClass, e.bgClass || "")), h.styleClasses.textClass && (e.textClass = vh(h.styleClasses.textClass, e.textClass || ""))), 0 == e.map.length && e.map.push(0, 0, e.content.appendChild(Ch(a.display.measure))), 0 == g ? (b.measure.map = e.map, b.measure.cache = {}) : ((b.measure.maps || (b.measure.maps = [])).push(e.map), (b.measure.caches || (b.measure.caches = [])).push({}))
        }
        return f && /\bcm-tab\b/.test(e.content.lastChild.className) && (e.content.className = "cm-tab-wrap-hack"), Ig(a, "renderLine", a, b.line, e.pre), e.pre.className && (e.textClass = vh(e.pre.className, e.textClass || "")), e
    }

    function Pf(a) {
        var b = mh("span", "\u2022", "cm-invalidchar");
        return b.title = "\\u" + a.charCodeAt(0).toString(16), b.setAttribute("aria-label", b.title), b
    }

    function Qf(a, b, c, f, g, h, i) {
        if (b) {
            var j = a.splitSpaces ? b.replace(/ {3,}/g, Rf) : b,
                k = a.cm.state.specialChars,
                l = !1;
            if (k.test(b))
                for (var m = document.createDocumentFragment(), n = 0;;) {
                    k.lastIndex = n;
                    var o = k.exec(b),
                        p = o ? o.index - n : b.length - n;
                    if (p) {
                        var q = document.createTextNode(j.slice(n, n + p));
                        d && 9 > e ? m.appendChild(mh("span", [q])) : m.appendChild(q), a.map.push(a.pos, a.pos + p, q), a.col += p, a.pos += p
                    }
                    if (!o) break;
                    if (n += p + 1, "	" == o[0]) {
                        var r = a.cm.options.tabSize,
                            s = r - a.col % r,
                            q = m.appendChild(mh("span", Zg(s), "cm-tab"));
                        q.setAttribute("role", "presentation"), q.setAttribute("cm-text", "	"), a.col += s
                    } else {
                        var q = a.cm.options.specialCharPlaceholder(o[0]);
                        q.setAttribute("cm-text", o[0]), d && 9 > e ? m.appendChild(mh("span", [q])) : m.appendChild(q), a.col += 1
                    }
                    a.map.push(a.pos, a.pos + 1, q), a.pos++
                } else {
                    a.col += b.length;
                    var m = document.createTextNode(j);
                    a.map.push(a.pos, a.pos + b.length, m), d && 9 > e && (l = !0), a.pos += b.length
                }
            if (c || f || g || l || i) {
                var t = c || "";
                f && (t += f), g && (t += g);
                var u = mh("span", [m], t, i);
                return h && (u.title = h), a.content.appendChild(u)
            }
            a.content.appendChild(m)
        }
    }

    function Rf(a) {
        for (var b = " ", c = 0; c < a.length - 2; ++c) b += c % 2 ? " " : "\xa0";
        return b += " "
    }

    function Sf(a, b) {
        return function(c, d, e, f, g, h, i) {
            e = e ? e + " cm-force-border" : "cm-force-border";
            for (var j = c.pos, k = j + d.length;;) {
                for (var l = 0; l < b.length; l++) {
                    var m = b[l];
                    if (m.to > j && m.from <= j) break
                }
                if (m.to >= k) return a(c, d, e, f, g, h, i);
                a(c, d.slice(0, m.to - j), e, f, null, h, i), f = null, d = d.slice(m.to - j), j = m.to
            }
        }
    }

    function Tf(a, b, c, d) {
        var e = !d && c.widgetNode;
        e && a.map.push(a.pos, a.pos + b, e), !d && a.cm.display.input.needsContentAttribute && (e || (e = a.content.appendChild(document.createElement("span"))), e.setAttribute("cm-marker", c.id)), e && (a.cm.display.input.setUneditable(e), a.content.appendChild(e)), a.pos += b
    }

    function Uf(a, b, c) {
        var d = a.markedSpans,
            e = a.text,
            f = 0;
        if (d)
            for (var k, l, n, o, p, q, r, h = e.length, i = 0, g = 1, j = "", m = 0;;) {
                if (m == i) {
                    n = o = p = q = l = "", r = null, m = 1 / 0;
                    for (var s = [], t = 0; t < d.length; ++t) {
                        var u = d[t],
                            v = u.marker;
                        "bookmark" == v.type && u.from == i && v.widgetNode ? s.push(v) : u.from <= i && (null == u.to || u.to > i || v.collapsed && u.to == i && u.from == i) ? (null != u.to && u.to != i && m > u.to && (m = u.to, o = ""), v.className && (n += " " + v.className), v.css && (l = v.css), v.startStyle && u.from == i && (p += " " + v.startStyle), v.endStyle && u.to == m && (o += " " + v.endStyle), v.title && !q && (q = v.title), v.collapsed && (!r || lf(r.marker, v) < 0) && (r = u)) : u.from > i && m > u.from && (m = u.from)
                    }
                    if (r && (r.from || 0) == i) {
                        if (Tf(b, (null == r.to ? h + 1 : r.to) - i, r.marker, null == r.from), null == r.to) return;
                        r.to == i && (r = !1)
                    }
                    if (!r && s.length)
                        for (var t = 0; t < s.length; ++t) Tf(b, 0, s[t])
                }
                if (i >= h) break;
                for (var w = Math.min(h, m);;) {
                    if (j) {
                        var x = i + j.length;
                        if (!r) {
                            var y = x > w ? j.slice(0, w - i) : j;
                            b.addToken(b, y, k ? k + n : n, p, i + y.length == m ? o : "", q, l)
                        }
                        if (x >= w) {
                            j = j.slice(w - i), i = w;
                            break
                        }
                        i = x, p = ""
                    }
                    j = e.slice(f, f = c[g++]), k = Nf(c[g++], b.cm.options)
                }
            } else
                for (var g = 1; g < c.length; g += 2) b.addToken(b, e.slice(f, f = c[g]), Nf(c[g + 1], b.cm.options))
    }

    function Vf(a, b) {
        return 0 == b.from.ch && 0 == b.to.ch && "" == $g(b.text) && (!a.cm || a.cm.options.wholeLineUpdateBefore)
    }

    function Wf(a, b, c, d) {
        function e(a) {
            return c ? c[a] : null
        }

        function f(a, c, e) {
            Bf(a, c, e, d), Kg(a, "change", a, b)
        }

        function g(a, b) {
            for (var c = a, f = []; b > c; ++c) f.push(new Af(j[c], e(c), d));
            return f
        }
        var h = b.from,
            i = b.to,
            j = b.text,
            k = dg(a, h.line),
            l = dg(a, i.line),
            m = $g(j),
            n = e(j.length - 1),
            o = i.line - h.line;
        if (b.full) a.insert(0, g(0, j.length)), a.remove(j.length, a.size - j.length);
        else if (Vf(a, b)) {
            var p = g(0, j.length - 1);
            f(l, l.text, n), o && a.remove(h.line, o), p.length && a.insert(h.line, p)
        } else if (k == l)
            if (1 == j.length) f(k, k.text.slice(0, h.ch) + m + k.text.slice(i.ch), n);
            else {
                var p = g(1, j.length - 1);
                p.push(new Af(m + k.text.slice(i.ch), n, d)), f(k, k.text.slice(0, h.ch) + j[0], e(0)), a.insert(h.line + 1, p)
            }
        else if (1 == j.length) f(k, k.text.slice(0, h.ch) + j[0] + l.text.slice(i.ch), e(0)), a.remove(h.line + 1, o);
        else {
            f(k, k.text.slice(0, h.ch) + j[0], e(0)), f(l, m + l.text.slice(i.ch), n);
            var p = g(1, j.length - 1);
            o > 1 && a.remove(h.line + 1, o - 1), a.insert(h.line + 1, p)
        }
        Kg(a, "change", a, b)
    }

    function Xf(a) {
        this.lines = a, this.parent = null;
        for (var b = 0, c = 0; b < a.length; ++b) a[b].parent = this, c += a[b].height;
        this.height = c
    }

    function Yf(a) {
        this.children = a;
        for (var b = 0, c = 0, d = 0; d < a.length; ++d) {
            var e = a[d];
            b += e.chunkSize(), c += e.height, e.parent = this
        }
        this.size = b, this.height = c, this.parent = null
    }

    function bg(a, b, c) {
        function d(a, e, f) {
            if (a.linked)
                for (var g = 0; g < a.linked.length; ++g) {
                    var h = a.linked[g];
                    if (h.doc != e) {
                        var i = f && h.sharedHist;
                        (!c || i) && (b(h.doc, i), d(h.doc, a, i))
                    }
                }
        }
        d(a, null, !0)
    }

    function cg(a, b) {
        if (b.cm) throw new Error("This document is already in use.");
        a.doc = b, b.cm = a, B(a), x(a), a.options.lineWrapping || H(a), a.options.mode = b.modeOption, hd(a)
    }

    function dg(a, b) {
        if (b -= a.first, 0 > b || b >= a.size) throw new Error("There is no line " + (b + a.first) + " in the document.");
        for (var c = a; !c.lines;)
            for (var d = 0;; ++d) {
                var e = c.children[d],
                    f = e.chunkSize();
                if (f > b) {
                    c = e;
                    break
                }
                b -= f
            }
        return c.lines[b]
    }

    function eg(a, b, c) {
        var d = [],
            e = b.line;
        return a.iter(b.line, c.line + 1, function(a) {
            var f = a.text;
            e == c.line && (f = f.slice(0, c.ch)), e == b.line && (f = f.slice(b.ch)), d.push(f), ++e
        }), d
    }

    function fg(a, b, c) {
        var d = [];
        return a.iter(b, c, function(a) {
            d.push(a.text)
        }), d
    }

    function gg(a, b) {
        var c = b - a.height;
        if (c)
            for (var d = a; d; d = d.parent) d.height += c
    }

    function hg(a) {
        if (null == a.parent) return null;
        for (var b = a.parent, c = ah(b.lines, a), d = b.parent; d; b = d, d = d.parent)
            for (var e = 0; d.children[e] != b; ++e) c += d.children[e].chunkSize();
        return c + b.first
    }

    function ig(a, b) {
        var c = a.first;
        a: do {
            for (var d = 0; d < a.children.length; ++d) {
                var e = a.children[d],
                    f = e.height;
                if (f > b) {
                    a = e;
                    continue a
                }
                b -= f, c += e.chunkSize()
            }
            return c
        } while (!a.lines);
        for (var d = 0; d < a.lines.length; ++d) {
            var g = a.lines[d],
                h = g.height;
            if (h > b) break;
            b -= h
        }
        return c + d
    }

    function jg(a) {
        a = qf(a);
        for (var b = 0, c = a.parent, d = 0; d < c.lines.length; ++d) {
            var e = c.lines[d];
            if (e == a) break;
            b += e.height
        }
        for (var f = c.parent; f; c = f, f = c.parent)
            for (var d = 0; d < f.children.length; ++d) {
                var g = f.children[d];
                if (g == c) break;
                b += g.height
            }
        return b
    }

    function kg(a) {
        var b = a.order;
        return null == b && (b = a.order = Zh(a.text)), b
    }

    function lg(a) {
        this.done = [], this.undone = [], this.undoDepth = 1 / 0, this.lastModTime = this.lastSelTime = 0, this.lastOp = this.lastSelOp = null, this.lastOrigin = this.lastSelOrigin = null, this.generation = this.maxGeneration = a || 1
    }

    function mg(a, b) {
        var c = {
            from: qb(b.from),
            to: $d(b),
            text: eg(a, b.from, b.to)
        };
        return tg(a, c, b.from.line, b.to.line + 1), bg(a, function(a) {
            tg(a, c, b.from.line, b.to.line + 1)
        }, !0), c
    }

    function ng(a) {
        for (; a.length;) {
            var b = $g(a);
            if (!b.ranges) break;
            a.pop()
        }
    }

    function og(a, b) {
        return b ? (ng(a.done), $g(a.done)) : a.done.length && !$g(a.done).ranges ? $g(a.done) : a.done.length > 1 && !a.done[a.done.length - 2].ranges ? (a.done.pop(), $g(a.done)) : void 0
    }

    function pg(a, b, c, d) {
        var e = a.history;
        e.undone.length = 0;
        var g, f = +new Date;
        if ((e.lastOp == d || e.lastOrigin == b.origin && b.origin && ("+" == b.origin.charAt(0) && a.cm && e.lastModTime > f - a.cm.options.historyEventDelay || "*" == b.origin.charAt(0))) && (g = og(e, e.lastOp == d))) {
            var h = $g(g.changes);
            0 == pb(b.from, b.to) && 0 == pb(b.from, h.to) ? h.to = $d(b) : g.changes.push(mg(a, b))
        } else {
            var i = $g(e.done);
            for (i && i.ranges || sg(a.sel, e.done), g = {
                    changes: [mg(a, b)],
                    generation: e.generation
                }, e.done.push(g); e.done.length > e.undoDepth;) e.done.shift(), e.done[0].ranges || e.done.shift()
        }
        e.done.push(c), e.generation = ++e.maxGeneration, e.lastModTime = e.lastSelTime = f, e.lastOp = e.lastSelOp = d, e.lastOrigin = e.lastSelOrigin = b.origin, h || Ig(a, "historyAdded")
    }

    function qg(a, b, c, d) {
        var e = b.charAt(0);
        return "*" == e || "+" == e && c.ranges.length == d.ranges.length && c.somethingSelected() == d.somethingSelected() && new Date - a.history.lastSelTime <= (a.cm ? a.cm.options.historyEventDelay : 500)
    }

    function rg(a, b, c, d) {
        var e = a.history,
            f = d && d.origin;
        c == e.lastSelOp || f && e.lastSelOrigin == f && (e.lastModTime == e.lastSelTime && e.lastOrigin == f || qg(a, f, $g(e.done), b)) ? e.done[e.done.length - 1] = b : sg(b, e.done), e.lastSelTime = +new Date, e.lastSelOrigin = f, e.lastSelOp = c, d && d.clearRedo !== !1 && ng(e.undone)
    }

    function sg(a, b) {
        var c = $g(b);
        c && c.ranges && c.equals(a) || b.push(a)
    }

    function tg(a, b, c, d) {
        var e = b["spans_" + a.id],
            f = 0;
        a.iter(Math.max(a.first, c), Math.min(a.first + a.size, d), function(c) {
            c.markedSpans && ((e || (e = b["spans_" + a.id] = {}))[f] = c.markedSpans), ++f
        })
    }

    function ug(a) {
        if (!a) return null;
        for (var c, b = 0; b < a.length; ++b) a[b].marker.explicitlyCleared ? c || (c = a.slice(0, b)) : c && c.push(a[b]);
        return c ? c.length ? c : null : a
    }

    function vg(a, b) {
        var c = b["spans_" + a.id];
        if (!c) return null;
        for (var d = 0, e = []; d < b.text.length; ++d) e.push(ug(c[d]));
        return e
    }

    function wg(a, b, c) {
        for (var d = 0, e = []; d < a.length; ++d) {
            var f = a[d];
            if (f.ranges) e.push(c ? Ib.prototype.deepCopy.call(f) : f);
            else {
                var g = f.changes,
                    h = [];
                e.push({
                    changes: h
                });
                for (var i = 0; i < g.length; ++i) {
                    var k, j = g[i];
                    if (h.push({
                            from: j.from,
                            to: j.to,
                            text: j.text
                        }), b)
                        for (var l in j)(k = l.match(/^spans_(\d+)$/)) && ah(b, Number(k[1])) > -1 && ($g(h)[l] = j[l], delete j[l])
                }
            }
        }
        return e
    }

    function xg(a, b, c, d) {
        c < a.line ? a.line += d : b < a.line && (a.line = b, a.ch = 0)
    }

    function yg(a, b, c, d) {
        for (var e = 0; e < a.length; ++e) {
            var f = a[e],
                g = !0;
            if (f.ranges) {
                f.copied || (f = a[e] = f.deepCopy(), f.copied = !0);
                for (var h = 0; h < f.ranges.length; h++) xg(f.ranges[h].anchor, b, c, d), xg(f.ranges[h].head, b, c, d)
            } else {
                for (var h = 0; h < f.changes.length; ++h) {
                    var i = f.changes[h];
                    if (c < i.from.line) i.from = ob(i.from.line + d, i.from.ch), i.to = ob(i.to.line + d, i.to.ch);
                    else if (b <= i.to.line) {
                        g = !1;
                        break
                    }
                }
                g || (a.splice(0, e + 1), e = 0)
            }
        }
    }

    function zg(a, b) {
        var c = b.from.line,
            d = b.to.line,
            e = b.text.length - (d - c) - 1;
        yg(a.done, c, d, e), yg(a.undone, c, d, e)
    }

    function Cg(a) {
        return null != a.defaultPrevented ? a.defaultPrevented : 0 == a.returnValue
    }

    function Eg(a) {
        return a.target || a.srcElement
    }

    function Fg(a) {
        var b = a.which;
        return null == b && (1 & a.button ? b = 1 : 2 & a.button ? b = 3 : 4 & a.button && (b = 2)), o && a.ctrlKey && 1 == b && (b = 3), b
    }

    function Kg(a, b) {
        function f(a) {
            return function() {
                a.apply(null, d)
            }
        }
        var c = a._handlers && a._handlers[b];
        if (c) {
            var e, d = Array.prototype.slice.call(arguments, 2);
            Sc ? e = Sc.delayedCallbacks : Jg ? e = Jg : (e = Jg = [], setTimeout(Lg, 0));
            for (var g = 0; g < c.length; ++g) e.push(f(c[g]))
        }
    }

    function Lg() {
        var a = Jg;
        Jg = null;
        for (var b = 0; b < a.length; ++b) a[b]()
    }

    function Mg(a, b, c) {
        return "string" == typeof b && (b = {
            type: b,
            preventDefault: function() {
                this.defaultPrevented = !0
            }
        }), Ig(a, c || b.type, a, b), Cg(b) || b.codemirrorIgnore
    }

    function Ng(a) {
        var b = a._handlers && a._handlers.cursorActivity;
        if (b)
            for (var c = a.curOp.cursorActivityHandlers || (a.curOp.cursorActivityHandlers = []), d = 0; d < b.length; ++d) - 1 == ah(c, b[d]) && c.push(b[d])
    }

    function Og(a, b) {
        var c = a._handlers && a._handlers[b];
        return c && c.length > 0
    }

    function Pg(a) {
        a.prototype.on = function(a, b) {
            Gg(this, a, b)
        }, a.prototype.off = function(a, b) {
            Hg(this, a, b)
        }
    }

    function Vg() {
        this.id = null
    }

    function Xg(a, b, c) {
        for (var d = 0, e = 0;;) {
            var f = a.indexOf("	", d); - 1 == f && (f = a.length);
            var g = f - d;
            if (f == a.length || e + g >= b) return d + Math.min(g, b - e);
            if (e += f - d, e += c - e % c, d = f + 1, e >= b) return d
        }
    }

    function Zg(a) {
        for (; Yg.length <= a;) Yg.push($g(Yg) + " ");
        return Yg[a]
    }

    function $g(a) {
        return a[a.length - 1]
    }

    function ah(a, b) {
        for (var c = 0; c < a.length; ++c)
            if (a[c] == b) return c;
        return -1
    }

    function bh(a, b) {
        for (var c = [], d = 0; d < a.length; d++) c[d] = b(a[d], d);
        return c
    }

    function ch() {}

    function dh(a, b) {
        var c;
        return Object.create ? c = Object.create(a) : (ch.prototype = a, c = new ch), b && eh(b, c), c
    }

    function eh(a, b, c) {
        b || (b = {});
        for (var d in a) !a.hasOwnProperty(d) || c === !1 && b.hasOwnProperty(d) || (b[d] = a[d]);
        return b
    }

    function fh(a) {
        var b = Array.prototype.slice.call(arguments, 1);
        return function() {
            return a.apply(null, b)
        }
    }

    function ih(a, b) {
        return b ? b.source.indexOf("\\w") > -1 && hh(a) ? !0 : b.test(a) : hh(a)
    }

    function jh(a) {
        for (var b in a)
            if (a.hasOwnProperty(b) && a[b]) return !1;
        return !0
    }

    function lh(a) {
        return a.charCodeAt(0) >= 768 && kh.test(a)
    }

    function mh(a, b, c, d) {
        var e = document.createElement(a);
        if (c && (e.className = c), d && (e.style.cssText = d), "string" == typeof b) e.appendChild(document.createTextNode(b));
        else if (b)
            for (var f = 0; f < b.length; ++f) e.appendChild(b[f]);
        return e
    }

    function oh(a) {
        for (var b = a.childNodes.length; b > 0; --b) a.removeChild(a.firstChild);
        return a
    }

    function ph(a, b) {
        return oh(a).appendChild(b)
    }

    function rh() {
        return document.activeElement
    }

    function sh(a) {
        return new RegExp("(^|\\s)" + a + "(?:$|\\s)\\s*")
    }

    function vh(a, b) {
        for (var c = a.split(" "), d = 0; d < c.length; d++) c[d] && !sh(c[d]).test(b) && (b += " " + c[d]);
        return b
    }

    function wh(a) {
        if (document.body.getElementsByClassName)
            for (var b = document.body.getElementsByClassName("CodeMirror"), c = 0; c < b.length; c++) {
                var d = b[c].CodeMirror;
                d && a(d)
            }
    }

    function yh() {
        xh || (zh(), xh = !0)
    }

    function zh() {
        var a;
        Gg(window, "resize", function() {
            null == a && (a = setTimeout(function() {
                a = null, wh(qd)
            }, 100))
        }), Gg(window, "blur", function() {
            wh(Xd)
        })
    }

    function Ch(a) {
        if (null == Bh) {
            var b = mh("span", "\u200b");
            ph(a, mh("span", [b, document.createTextNode("x")])), 0 != a.firstChild.offsetHeight && (Bh = b.offsetWidth <= 1 && b.offsetHeight > 2 && !(d && 8 > e))
        }
        var c = Bh ? mh("span", "\u200b") : mh("span", "\xa0", null, "display: inline-block; width: 1px; margin-right: -1px");
        return c.setAttribute("cm-text", ""), c
    }

    function Eh(a) {
        if (null != Dh) return Dh;
        var b = ph(a, document.createTextNode("A\u062eA")),
            c = nh(b, 0, 1).getBoundingClientRect();
        if (!c || c.left == c.right) return !1;
        var d = nh(b, 1, 2).getBoundingClientRect();
        return Dh = d.right - c.right < 3
    }

    function Jh(a) {
        if (null != Ih) return Ih;
        var b = ph(a, mh("span", "x")),
            c = b.getBoundingClientRect(),
            d = nh(b, 0, 1).getBoundingClientRect();
        return Ih = Math.abs(c.left - d.left) > 1
    }

    function Lh(a, b, c, d) {
        if (!a) return d(b, c, "ltr");
        for (var e = !1, f = 0; f < a.length; ++f) {
            var g = a[f];
            (g.from < c && g.to > b || b == c && g.to == b) && (d(Math.max(g.from, b), Math.min(g.to, c), 1 == g.level ? "rtl" : "ltr"), e = !0)
        }
        e || d(b, c, "ltr")
    }

    function Mh(a) {
        return a.level % 2 ? a.to : a.from
    }

    function Nh(a) {
        return a.level % 2 ? a.from : a.to
    }

    function Oh(a) {
        var b = kg(a);
        return b ? Mh(b[0]) : 0
    }

    function Ph(a) {
        var b = kg(a);
        return b ? Nh($g(b)) : a.text.length
    }

    function Qh(a, b) {
        var c = dg(a.doc, b),
            d = qf(c);
        d != c && (b = hg(d));
        var e = kg(d),
            f = e ? e[0].level % 2 ? Ph(d) : Oh(d) : 0;
        return ob(b, f)
    }

    function Rh(a, b) {
        for (var c, d = dg(a.doc, b); c = of (d);) d = c.find(1, !0).line, b = null;
        var e = kg(d),
            f = e ? e[0].level % 2 ? Oh(d) : Ph(d) : d.text.length;
        return ob(null == b ? hg(d) : b, f)
    }

    function Sh(a, b) {
        var c = Qh(a, b.line),
            d = dg(a.doc, c.line),
            e = kg(d);
        if (!e || 0 == e[0].level) {
            var f = Math.max(0, d.text.search(/\S/)),
                g = b.line == c.line && b.ch <= f && b.ch;
            return ob(c.line, g ? 0 : f)
        }
        return c
    }

    function Th(a, b, c) {
        var d = a[0].level;
        return b == d ? !0 : c == d ? !1 : c > b
    }

    function Vh(a, b) {
        Uh = null;
        for (var d, c = 0; c < a.length; ++c) {
            var e = a[c];
            if (e.from < b && e.to > b) return c;
            if (e.from == b || e.to == b) {
                if (null != d) return Th(a, e.level, a[d].level) ? (e.from != e.to && (Uh = d), c) : (e.from != e.to && (Uh = c), d);
                d = c
            }
        }
        return d
    }

    function Wh(a, b, c, d) {
        if (!d) return b + c;
        do b += c; while (b > 0 && lh(a.text.charAt(b)));
        return b
    }

    function Xh(a, b, c, d) {
        var e = kg(a);
        if (!e) return Yh(a, b, c, d);
        for (var f = Vh(e, b), g = e[f], h = Wh(a, b, g.level % 2 ? -c : c, d);;) {
            if (h > g.from && h < g.to) return h;
            if (h == g.from || h == g.to) return Vh(e, h) == f ? h : (g = e[f += c], c > 0 == g.level % 2 ? g.to : g.from);
            if (g = e[f += c], !g) return null;
            h = c > 0 == g.level % 2 ? Wh(a, g.to, -1, d) : Wh(a, g.from, 1, d)
        }
    }

    function Yh(a, b, c, d) {
        var e = b + c;
        if (d)
            for (; e > 0 && lh(a.text.charAt(e));) e += c;
        return 0 > e || e > a.text.length ? null : e
    }
    var a = /gecko\/\d/i.test(navigator.userAgent),
        b = /MSIE \d/.test(navigator.userAgent),
        c = /Trident\/(?:[7-9]|\d{2,})\..*rv:(\d+)/.exec(navigator.userAgent),
        d = b || c,
        e = d && (b ? document.documentMode || 6 : c[1]),
        f = /WebKit\//.test(navigator.userAgent),
        g = f && /Qt\/\d+\.\d+/.test(navigator.userAgent),
        h = /Chrome\//.test(navigator.userAgent),
        i = /Opera\//.test(navigator.userAgent),
        j = /Apple Computer/.test(navigator.vendor),
        k = /Mac OS X 1\d\D([8-9]|\d\d)\D/.test(navigator.userAgent),
        l = /PhantomJS/.test(navigator.userAgent),
        m = /AppleWebKit/.test(navigator.userAgent) && /Mobile\/\w+/.test(navigator.userAgent),
        n = m || /Android|webOS|BlackBerry|Opera Mini|Opera Mobi|IEMobile/i.test(navigator.userAgent),
        o = m || /Mac/.test(navigator.platform),
        p = /win/i.test(navigator.platform),
        q = i && navigator.userAgent.match(/Version\/(\d*\.\d*)/);
    q && (q = Number(q[1])), q && q >= 15 && (i = !1, f = !0);
    var r = o && (g || i && (null == q || 12.11 > q)),
        s = a || d && e >= 9,
        t = !1,
        u = !1;
    K.prototype = eh({
        update: function(a) {
            var b = a.scrollWidth > a.clientWidth + 1,
                c = a.scrollHeight > a.clientHeight + 1,
                d = a.nativeBarWidth;
            if (c) {
                this.vert.style.display = "block", this.vert.style.bottom = b ? d + "px" : "0";
                var e = a.viewHeight - (b ? d : 0);
                this.vert.firstChild.style.height = Math.max(0, a.scrollHeight - a.clientHeight + e) + "px"
            } else this.vert.style.display = "", this.vert.firstChild.style.height = "0";
            if (b) {
                this.horiz.style.display = "block", this.horiz.style.right = c ? d + "px" : "0", this.horiz.style.left = a.barLeft + "px";
                var f = a.viewWidth - a.barLeft - (c ? d : 0);
                this.horiz.firstChild.style.width = a.scrollWidth - a.clientWidth + f + "px"
            } else this.horiz.style.display = "", this.horiz.firstChild.style.width = "0";
            return !this.checkedOverlay && a.clientHeight > 0 && (0 == d && this.overlayHack(), this.checkedOverlay = !0), {
                right: c ? d : 0,
                bottom: b ? d : 0
            }
        },
        setScrollLeft: function(a) {
            this.horiz.scrollLeft != a && (this.horiz.scrollLeft = a)
        },
        setScrollTop: function(a) {
            this.vert.scrollTop != a && (this.vert.scrollTop = a)
        },
        overlayHack: function() {
            var a = o && !k ? "12px" : "18px";
            this.horiz.style.minHeight = this.vert.style.minWidth = a;
            var b = this,
                c = function(a) {
                    Eg(a) != b.vert && Eg(a) != b.horiz && cd(b.cm, td)(a)
                };
            Gg(this.vert, "mousedown", c), Gg(this.horiz, "mousedown", c)
        },
        clear: function() {
            var a = this.horiz.parentNode;
            a.removeChild(this.horiz), a.removeChild(this.vert)
        }
    }, K.prototype), L.prototype = eh({
        update: function() {
            return {
                bottom: 0,
                right: 0
            }
        },
        setScrollLeft: function() {},
        setScrollTop: function() {},
        clear: function() {}
    }, L.prototype), v.scrollbarModel = {
        "native": K,
        "null": L
    }, U.prototype.signal = function(a, b) {
        Og(a, b) && this.events.push(arguments)
    }, U.prototype.finish = function() {
        for (var a = 0; a < this.events.length; a++) Ig.apply(null, this.events[a])
    };
    var ob = v.Pos = function(a, b) {
            return this instanceof ob ? (this.line = a, this.ch = b, void 0) : new ob(a, b)
        },
        pb = v.cmpPos = function(a, b) {
            return a.line - b.line || a.ch - b.ch
        },
        vb = null;
    Ab.prototype = eh({
        init: function(a) {
            function i(a) {
                if (c.somethingSelected()) vb = c.getSelections(), b.inaccurateSelection && (b.prevInput = "", b.inaccurateSelection = !1, h.value = vb.join("\n"), _g(h));
                else {
                    if (!c.options.lineWiseCopyCut) return;
                    var d = yb(c);
                    vb = d.text, "cut" == a.type ? c.setSelections(d.ranges, null, Sg) : (b.prevInput = "", h.value = d.text.join("\n"), _g(h))
                }
                "cut" == a.type && (c.state.cutIncoming = !0)
            }
            var b = this,
                c = this.cm,
                g = this.wrapper = Bb(),
                h = this.textarea = g.firstChild;
            a.wrapper.insertBefore(g, a.wrapper.firstChild), m && (h.style.width = "0px"), Gg(h, "input", function() {
                d && e >= 9 && b.hasSelection && (b.hasSelection = null), b.poll()
            }), Gg(h, "paste", function() {
                if (f && !c.state.fakedLastChar && !(new Date - c.state.lastMiddleDown < 200)) {
                    var a = h.selectionStart,
                        d = h.selectionEnd;
                    h.value += "$", h.selectionEnd = d, h.selectionStart = a, c.state.fakedLastChar = !0
                }
                c.state.pasteIncoming = !0, b.fastPoll()
            }), Gg(h, "cut", i), Gg(h, "copy", i), Gg(a.scroller, "paste", function(d) {
                rd(a, d) || (c.state.pasteIncoming = !0, b.focus())
            }), Gg(a.lineSpace, "selectstart", function(b) {
                rd(a, b) || Ag(b)
            }), Gg(h, "compositionstart", function() {
                var a = c.getCursor("from");
                b.composing = {
                    start: a,
                    range: c.markText(a, c.getCursor("to"), {
                        className: "CodeMirror-composing"
                    })
                }
            }), Gg(h, "compositionend", function() {
                b.composing && (b.poll(), b.composing.range.clear(), b.composing = null)
            })
        },
        prepareSelection: function() {
            var a = this.cm,
                b = a.display,
                c = a.doc,
                d = dc(a);
            if (a.options.moveInputWithCursor) {
                var e = Kc(a, c.sel.primary().head, "div"),
                    f = b.wrapper.getBoundingClientRect(),
                    g = b.lineDiv.getBoundingClientRect();
                d.teTop = Math.max(0, Math.min(b.wrapper.clientHeight - 10, e.top + g.top - f.top)), d.teLeft = Math.max(0, Math.min(b.wrapper.clientWidth - 10, e.left + g.left - f.left))
            }
            return d
        },
        showSelection: function(a) {
            var b = this.cm,
                c = b.display;
            ph(c.cursorDiv, a.cursors), ph(c.selectionDiv, a.selection), null != a.teTop && (this.wrapper.style.top = a.teTop + "px", this.wrapper.style.left = a.teLeft + "px")
        },
        reset: function(a) {
            if (!this.contextMenuPending) {
                var b, c, f = this.cm,
                    g = f.doc;
                if (f.somethingSelected()) {
                    this.prevInput = "";
                    var h = g.sel.primary();
                    b = Hh && (h.to().line - h.from().line > 100 || (c = f.getSelection()).length > 1e3);
                    var i = b ? "-" : c || f.getSelection();
                    this.textarea.value = i, f.state.focused && _g(this.textarea), d && e >= 9 && (this.hasSelection = i)
                } else a || (this.prevInput = this.textarea.value = "", d && e >= 9 && (this.hasSelection = null));
                this.inaccurateSelection = b
            }
        },
        getField: function() {
            return this.textarea
        },
        supportsTouch: function() {
            return !1
        },
        focus: function() {
            if ("nocursor" != this.cm.options.readOnly && (!n || rh() != this.textarea)) try {
                this.textarea.focus()
            } catch (a) {}
        },
        blur: function() {
            this.textarea.blur()
        },
        resetPosition: function() {
            this.wrapper.style.top = this.wrapper.style.left = 0
        },
        receivedFocus: function() {
            this.slowPoll()
        },
        slowPoll: function() {
            var a = this;
            a.pollingFast || a.polling.set(this.cm.options.pollInterval, function() {
                a.poll(), a.cm.state.focused && a.slowPoll()
            })
        },
        fastPoll: function() {
            function c() {
                var d = b.poll();
                d || a ? (b.pollingFast = !1, b.slowPoll()) : (a = !0, b.polling.set(60, c))
            }
            var a = !1,
                b = this;
            b.pollingFast = !0, b.polling.set(20, c)
        },
        poll: function() {
            var a = this.cm,
                b = this.textarea,
                c = this.prevInput;
            if (this.contextMenuPending || !a.state.focused || Gh(b) && !c || ub(a) || a.options.disableInput || a.state.keySeq) return !1;
            a.state.pasteIncoming && a.state.fakedLastChar && (b.value = b.value.substring(0, b.value.length - 1), a.state.fakedLastChar = !1);
            var f = b.value;
            if (f == c && !a.somethingSelected()) return !1;
            if (d && e >= 9 && this.hasSelection === f || o && /[\uf700-\uf7ff]/.test(f)) return a.display.input.reset(), !1;
            if (a.doc.sel == a.display.selForContextMenu) {
                var g = f.charCodeAt(0);
                if (8203 != g || c || (c = "\u200b"), 8666 == g) return this.reset(), this.cm.execCommand("undo")
            }
            for (var h = 0, i = Math.min(c.length, f.length); i > h && c.charCodeAt(h) == f.charCodeAt(h);) ++h;
            var j = this;
            return bd(a, function() {
                wb(a, f.slice(h), c.length - h, null, j.composing ? "*compose" : null), f.length > 1e3 || f.indexOf("\n") > -1 ? b.value = j.prevInput = "" : j.prevInput = f, j.composing && (j.composing.range.clear(), j.composing.range = a.markText(j.composing.start, a.getCursor("to"), {
                    className: "CodeMirror-composing"
                }))
            }), !0
        },
        ensurePolled: function() {
            this.pollingFast && this.poll() && (this.pollingFast = !1)
        },
        onKeyPress: function() {
            d && e >= 9 && (this.hasSelection = null), this.fastPoll()
        },
        onContextMenu: function(a) {
            function o() {
                if (null != h.selectionStart) {
                    var a = c.somethingSelected(),
                        d = "\u200b" + (a ? h.value : "");
                    h.value = "\u21da", h.value = d, b.prevInput = a ? "" : "\u200b", h.selectionStart = 1, h.selectionEnd = d.length, g.selForContextMenu = c.doc.sel
                }
            }

            function p() {
                if (b.contextMenuPending = !1, b.wrapper.style.position = "relative", h.style.cssText = m, d && 9 > e && g.scrollbars.setScrollTop(g.scroller.scrollTop = k), null != h.selectionStart) {
                    (!d || d && 9 > e) && o();
                    var a = 0,
                        f = function() {
                            g.selForContextMenu == c.doc.sel && 0 == h.selectionStart && h.selectionEnd > 0 && "\u200b" == b.prevInput ? cd(c, Ie.selectAll)(c) : a++ < 10 ? g.detectingSelectAll = setTimeout(f, 500) : g.input.reset()
                        };
                    g.detectingSelectAll = setTimeout(f, 200)
                }
            }
            var b = this,
                c = b.cm,
                g = c.display,
                h = b.textarea,
                j = sd(c, a),
                k = g.scroller.scrollTop;
            if (j && !i) {
                var l = c.options.resetSelectionOnContextMenu;
                l && -1 == c.doc.sel.contains(j) && cd(c, Yb)(c.doc, Lb(j), Sg);
                var m = h.style.cssText;
                if (b.wrapper.style.position = "absolute", h.style.cssText = "position: fixed; width: 30px; height: 30px; top: " + (a.clientY - 5) + "px; left: " + (a.clientX - 5) + "px; z-index: 1000; background: " + (d ? "rgba(255, 255, 255, .05)" : "transparent") + "; outline: none; border-width: 0; outline: none; overflow: hidden; opacity: .05; filter: alpha(opacity=5);", f) var n = window.scrollY;
                if (g.input.focus(), f && window.scrollTo(null, n), g.input.reset(), c.somethingSelected() || (h.value = b.prevInput = " "), b.contextMenuPending = !0, g.selForContextMenu = c.doc.sel, clearTimeout(g.detectingSelectAll), d && e >= 9 && o(), s) {
                    Dg(a);
                    var q = function() {
                        Hg(window, "mouseup", q), setTimeout(p, 20)
                    };
                    Gg(window, "mouseup", q)
                } else setTimeout(p, 50)
            }
        },
        setUneditable: ch,
        needsContentAttribute: !1
    }, Ab.prototype), Cb.prototype = eh({
        init: function(a) {
            function e(a) {
                if (c.somethingSelected()) vb = c.getSelections(), "cut" == a.type && c.replaceSelection("", null, "cut");
                else {
                    if (!c.options.lineWiseCopyCut) return;
                    var b = yb(c);
                    vb = b.text, "cut" == a.type && c.operation(function() {
                        c.setSelections(b.ranges, 0, Sg), c.replaceSelection("", null, "cut")
                    })
                }
                if (a.clipboardData && !m) a.preventDefault(), a.clipboardData.clearData(), a.clipboardData.setData("text/plain", vb.join("\n"));
                else {
                    var d = Bb(),
                        e = d.firstChild;
                    c.display.lineSpace.insertBefore(d, c.display.lineSpace.firstChild), e.value = vb.join("\n");
                    var f = document.activeElement;
                    _g(e), setTimeout(function() {
                        c.display.lineSpace.removeChild(d), f.focus()
                    }, 50)
                }
            }
            var b = this,
                c = b.cm,
                d = b.div = a.lineDiv;
            d.contentEditable = "true", zb(d), Gg(d, "paste", function(a) {
                var b = a.clipboardData && a.clipboardData.getData("text/plain");
                b && (a.preventDefault(), c.replaceSelection(b, null, "paste"))
            }), Gg(d, "compositionstart", function(a) {
                var d = a.data;
                if (b.composing = {
                        sel: c.doc.sel,
                        data: d,
                        startData: d
                    }, d) {
                    var e = c.doc.sel.primary(),
                        f = c.getLine(e.head.line),
                        g = f.indexOf(d, Math.max(0, e.head.ch - d.length));
                    g > -1 && g <= e.head.ch && (b.composing.sel = Lb(ob(e.head.line, g), ob(e.head.line, g + d.length)))
                }
            }), Gg(d, "compositionupdate", function(a) {
                b.composing.data = a.data
            }), Gg(d, "compositionend", function(a) {
                var c = b.composing;
                c && (a.data == c.startData || /\u200b/.test(a.data) || (c.data = a.data), setTimeout(function() {
                    c.handled || b.applyComposition(c), b.composing == c && (b.composing = null)
                }, 50))
            }), Gg(d, "touchstart", function() {
                b.forceCompositionEnd()
            }), Gg(d, "input", function() {
                b.composing || b.pollContent() || bd(b.cm, function() {
                    hd(c)
                })
            }), Gg(d, "copy", e), Gg(d, "cut", e)
        },
        prepareSelection: function() {
            var a = dc(this.cm, !1);
            return a.focus = this.cm.state.focused, a
        },
        showSelection: function(a) {
            a && this.cm.display.view.length && (a.focus && this.showPrimarySelection(), this.showMultipleSelections(a))
        },
        showPrimarySelection: function() {
            var b = window.getSelection(),
                c = this.cm.doc.sel.primary(),
                d = Fb(this.cm, b.anchorNode, b.anchorOffset),
                e = Fb(this.cm, b.focusNode, b.focusOffset);
            if (!d || d.bad || !e || e.bad || 0 != pb(sb(d, e), c.from()) || 0 != pb(rb(d, e), c.to())) {
                var f = Db(this.cm, c.from()),
                    g = Db(this.cm, c.to());
                if (f || g) {
                    var h = this.cm.display.view,
                        i = b.rangeCount && b.getRangeAt(0);
                    if (f) {
                        if (!g) {
                            var j = h[h.length - 1].measure,
                                k = j.maps ? j.maps[j.maps.length - 1] : j.map;
                            g = {
                                node: k[k.length - 1],
                                offset: k[k.length - 2] - k[k.length - 3]
                            }
                        }
                    } else f = {
                        node: h[0].measure.map[2],
                        offset: 0
                    };
                    try {
                        var l = nh(f.node, f.offset, g.offset, g.node)
                    } catch (m) {}
                    l && (b.removeAllRanges(), b.addRange(l), i && null == b.anchorNode ? b.addRange(i) : a && this.startGracePeriod()), this.rememberSelection()
                }
            }
        },
        startGracePeriod: function() {
            var a = this;
            clearTimeout(this.gracePeriod), this.gracePeriod = setTimeout(function() {
                a.gracePeriod = !1, a.selectionChanged() && a.cm.operation(function() {
                    a.cm.curOp.selectionChanged = !0
                })
            }, 20)
        },
        showMultipleSelections: function(a) {
            ph(this.cm.display.cursorDiv, a.cursors), ph(this.cm.display.selectionDiv, a.selection)
        },
        rememberSelection: function() {
            var a = window.getSelection();
            this.lastAnchorNode = a.anchorNode, this.lastAnchorOffset = a.anchorOffset, this.lastFocusNode = a.focusNode, this.lastFocusOffset = a.focusOffset
        },
        selectionInEditor: function() {
            var a = window.getSelection();
            if (!a.rangeCount) return !1;
            var b = a.getRangeAt(0).commonAncestorContainer;
            return qh(this.div, b)
        },
        focus: function() {
            "nocursor" != this.cm.options.readOnly && this.div.focus()
        },
        blur: function() {
            this.div.blur()
        },
        getField: function() {
            return this.div
        },
        supportsTouch: function() {
            return !0
        },
        receivedFocus: function() {
            function b() {
                a.cm.state.focused && (a.pollSelection(), a.polling.set(a.cm.options.pollInterval, b))
            }
            var a = this;
            this.selectionInEditor() ? this.pollSelection() : bd(this.cm, function() {
                a.cm.curOp.selectionChanged = !0
            }), this.polling.set(this.cm.options.pollInterval, b)
        },
        selectionChanged: function() {
            var a = window.getSelection();
            return a.anchorNode != this.lastAnchorNode || a.anchorOffset != this.lastAnchorOffset || a.focusNode != this.lastFocusNode || a.focusOffset != this.lastFocusOffset
        },
        pollSelection: function() {
            if (!this.composing && !this.gracePeriod && this.selectionChanged()) {
                var a = window.getSelection(),
                    b = this.cm;
                this.rememberSelection();
                var c = Fb(b, a.anchorNode, a.anchorOffset),
                    d = Fb(b, a.focusNode, a.focusOffset);
                c && d && bd(b, function() {
                    Yb(b.doc, Lb(c, d), Sg), (c.bad || d.bad) && (b.curOp.selectionChanged = !0)
                })
            }
        },
        pollContent: function() {
            var a = this.cm,
                b = a.display,
                c = a.doc.sel.primary(),
                d = c.from(),
                e = c.to();
            if (d.line < b.viewFrom || e.line > b.viewTo - 1) return !1;
            var f;
            if (d.line == b.viewFrom || 0 == (f = kd(a, d.line))) var g = hg(b.view[0].line),
                h = b.view[0].node;
            else var g = hg(b.view[f].line),
                h = b.view[f - 1].node.nextSibling;
            var i = kd(a, e.line);
            if (i == b.view.length - 1) var j = b.viewTo - 1,
                k = b.view[i].node;
            else var j = hg(b.view[i + 1].line) - 1,
                k = b.view[i + 1].node.previousSibling;
            for (var l = Fh(Hb(a, h, k, g, j)), m = eg(a.doc, ob(g, 0), ob(j, dg(a.doc, j).text.length)); l.length > 1 && m.length > 1;)
                if ($g(l) == $g(m)) l.pop(), m.pop(), j--;
                else {
                    if (l[0] != m[0]) break;
                    l.shift(), m.shift(), g++
                } for (var n = 0, o = 0, p = l[0], q = m[0], r = Math.min(p.length, q.length); r > n && p.charCodeAt(n) == q.charCodeAt(n);) ++n;
            for (var s = $g(l), t = $g(m), u = Math.min(s.length - (1 == l.length ? n : 0), t.length - (1 == m.length ? n : 0)); u > o && s.charCodeAt(s.length - o - 1) == t.charCodeAt(t.length - o - 1);) ++o;
            l[l.length - 1] = s.slice(0, s.length - o), l[0] = l[0].slice(n);
            var v = ob(g, n),
                w = ob(j, m.length ? $g(m).length - o : 0);
            return l.length > 1 || l[0] || pb(v, w) ? (ke(a.doc, l, v, w, "+input"), !0) : void 0
        },
        ensurePolled: function() {
            this.forceCompositionEnd()
        },
        reset: function() {
            this.forceCompositionEnd()
        },
        forceCompositionEnd: function() {
            this.composing && !this.composing.handled && (this.applyComposition(this.composing), this.composing.handled = !0, this.div.blur(), this.div.focus())
        },
        applyComposition: function(a) {
            a.data && a.data != a.startData && cd(this.cm, wb)(this.cm, a.data, 0, a.sel)
        },
        setUneditable: function(a) {
            a.setAttribute("contenteditable", "false")
        },
        onKeyPress: function(a) {
            a.preventDefault(), cd(this.cm, wb)(this.cm, String.fromCharCode(null == a.charCode ? a.keyCode : a.charCode), 0)
        },
        onContextMenu: ch,
        resetPosition: ch,
        needsContentAttribute: !0
    }, Cb.prototype), v.inputStyles = {
        textarea: Ab,
        contenteditable: Cb
    }, Ib.prototype = {
        primary: function() {
            return this.ranges[this.primIndex]
        },
        equals: function(a) {
            if (a == this) return !0;
            if (a.primIndex != this.primIndex || a.ranges.length != this.ranges.length) return !1;
            for (var b = 0; b < this.ranges.length; b++) {
                var c = this.ranges[b],
                    d = a.ranges[b];
                if (0 != pb(c.anchor, d.anchor) || 0 != pb(c.head, d.head)) return !1
            }
            return !0
        },
        deepCopy: function() {
            for (var a = [], b = 0; b < this.ranges.length; b++) a[b] = new Jb(qb(this.ranges[b].anchor), qb(this.ranges[b].head));
            return new Ib(a, this.primIndex)
        },
        somethingSelected: function() {
            for (var a = 0; a < this.ranges.length; a++)
                if (!this.ranges[a].empty()) return !0;
            return !1
        },
        contains: function(a, b) {
            b || (b = a);
            for (var c = 0; c < this.ranges.length; c++) {
                var d = this.ranges[c];
                if (pb(b, d.from()) >= 0 && pb(a, d.to()) <= 0) return c
            }
            return -1
        }
    }, Jb.prototype = {
        from: function() {
            return sb(this.anchor, this.head)
        },
        to: function() {
            return rb(this.anchor, this.head)
        },
        empty: function() {
            return this.head.line == this.anchor.line && this.head.ch == this.anchor.ch
        }
    };
    var Pc, ud, vd, yc = {
            left: 0,
            right: 0,
            top: 0,
            bottom: 0
        },
        Sc = null,
        Tc = 0,
        Bd = 0,
        Gd = 0,
        Hd = null;
    d ? Hd = -.53 : a ? Hd = 15 : h ? Hd = -.7 : j && (Hd = -1 / 3);
    var Id = function(a) {
        var b = a.wheelDeltaX,
            c = a.wheelDeltaY;
        return null == b && a.detail && a.axis == a.HORIZONTAL_AXIS && (b = a.detail), null == c && a.detail && a.axis == a.VERTICAL_AXIS ? c = a.detail : null == c && (c = a.wheelDelta), {
            x: b,
            y: c
        }
    };
    v.wheelEventPixels = function(a) {
        var b = Id(a);
        return b.x *= Hd, b.y *= Hd, b
    };
    var Md = new Vg,
        Qd = null,
        $d = v.changeEnd = function(a) {
            return a.text ? ob(a.from.line + a.text.length - 1, $g(a.text).length + (1 == a.text.length ? a.from.ch : 0)) : a.to
        };
    v.prototype = {
        constructor: v,
        focus: function() {
            window.focus(), this.display.input.focus()
        },
        setOption: function(a, b) {
            var c = this.options,
                d = c[a];
            (c[a] != b || "mode" == a) && (c[a] = b, ye.hasOwnProperty(a) && cd(this, ye[a])(this, b, d))
        },
        getOption: function(a) {
            return this.options[a]
        },
        getDoc: function() {
            return this.doc
        },
        addKeyMap: function(a, b) {
            this.state.keyMaps[b ? "push" : "unshift"](Oe(a))
        },
        removeKeyMap: function(a) {
            for (var b = this.state.keyMaps, c = 0; c < b.length; ++c)
                if (b[c] == a || b[c].name == a) return b.splice(c, 1), !0
        },
        addOverlay: dd(function(a, b) {
            var c = a.token ? a : v.getMode(this.options, a);
            if (c.startState) throw new Error("Overlays may not be stateful.");
            this.state.overlays.push({
                mode: c,
                modeSpec: a,
                opaque: b && b.opaque
            }), this.state.modeGen++, hd(this)
        }),
        removeOverlay: dd(function(a) {
            for (var b = this.state.overlays, c = 0; c < b.length; ++c) {
                var d = b[c].modeSpec;
                if (d == a || "string" == typeof a && d.name == a) return b.splice(c, 1), this.state.modeGen++, hd(this), void 0
            }
        }),
        indentLine: dd(function(a, b, c) {
            "string" != typeof b && "number" != typeof b && (b = null == b ? this.options.smartIndent ? "smart" : "prev" : b ? "add" : "subtract"), Pb(this.doc, a) && se(this, a, b, c)
        }),
        indentSelection: dd(function(a) {
            for (var b = this.doc.sel.ranges, c = -1, d = 0; d < b.length; d++) {
                var e = b[d];
                if (e.empty()) e.head.line > c && (se(this, e.head.line, a, !0), c = e.head.line, d == this.doc.sel.primIndex && qe(this));
                else {
                    var f = e.from(),
                        g = e.to(),
                        h = Math.max(c, f.line);
                    c = Math.min(this.lastLine(), g.line - (g.ch ? 0 : 1)) + 1;
                    for (var i = h; c > i; ++i) se(this, i, a);
                    var j = this.doc.sel.ranges;
                    0 == f.ch && b.length == j.length && j[d].from().ch > 0 && Ub(this.doc, d, new Jb(f, j[d].to()), Sg)
                }
            }
        }),
        getTokenAt: function(a, b) {
            return Gf(this, a, b)
        },
        getLineTokens: function(a, b) {
            return Gf(this, ob(a), b, !0)
        },
        getTokenTypeAt: function(a) {
            a = Nb(this.doc, a);
            var f, b = Jf(this, dg(this.doc, a.line)),
                c = 0,
                d = (b.length - 1) / 2,
                e = a.ch;
            if (0 == e) f = b[2];
            else
                for (;;) {
                    var g = c + d >> 1;
                    if ((g ? b[2 * g - 1] : 0) >= e) d = g;
                    else {
                        if (!(b[2 * g + 1] < e)) {
                            f = b[2 * g + 2];
                            break
                        }
                        c = g + 1
                    }
                }
            var h = f ? f.indexOf("cm-overlay ") : -1;
            return 0 > h ? f : 0 == h ? null : f.slice(0, h - 1)
        },
        getModeAt: function(a) {
            var b = this.doc.mode;
            return b.innerMode ? v.innerMode(b, this.getTokenAt(a).state).mode : b
        },
        getHelper: function(a, b) {
            return this.getHelpers(a, b)[0]
        },
        getHelpers: function(a, b) {
            var c = [];
            if (!Fe.hasOwnProperty(b)) return c;
            var d = Fe[b],
                e = this.getModeAt(a);
            if ("string" == typeof e[b]) d[e[b]] && c.push(d[e[b]]);
            else if (e[b])
                for (var f = 0; f < e[b].length; f++) {
                    var g = d[e[b][f]];
                    g && c.push(g)
                } else e.helperType && d[e.helperType] ? c.push(d[e.helperType]) : d[e.name] && c.push(d[e.name]);
            for (var f = 0; f < d._global.length; f++) {
                var h = d._global[f];
                h.pred(e, this) && -1 == ah(c, h.val) && c.push(h.val)
            }
            return c
        },
        getStateAfter: function(a, b) {
            var c = this.doc;
            return a = Mb(c, null == a ? c.first + c.size - 1 : a), kc(this, a + 1, b)
        },
        cursorCoords: function(a, b) {
            var c, d = this.doc.sel.primary();
            return c = null == a ? d.head : "object" == typeof a ? Nb(this.doc, a) : a ? d.from() : d.to(), Kc(this, c, b || "page")
        },
        charCoords: function(a, b) {
            return Jc(this, Nb(this.doc, a), b || "page")
        },
        coordsChar: function(a, b) {
            return a = Ic(this, a, b || "page"), Nc(this, a.left, a.top)
        },
        lineAtHeight: function(a, b) {
            return a = Ic(this, {
                top: a,
                left: 0
            }, b || "page").top, ig(this.doc, a + this.display.viewOffset)
        },
        heightAtLine: function(a, b) {
            var d, c = !1;
            if ("number" == typeof a) {
                var e = this.doc.first + this.doc.size - 1;
                a < this.doc.first ? a = this.doc.first : a > e && (a = e, c = !0), d = dg(this.doc, a)
            } else d = a;
            return Hc(this, d, {
                top: 0,
                left: 0
            }, b || "page").top + (c ? this.doc.height - jg(d) : 0)
        },
        defaultTextHeight: function() {
            return Qc(this.display)
        },
        defaultCharWidth: function() {
            return Rc(this.display)
        },
        setGutterMarker: dd(function(a, b, c) {
            return te(this.doc, a, "gutter", function(a) {
                var d = a.gutterMarkers || (a.gutterMarkers = {});
                return d[b] = c, !c && jh(d) && (a.gutterMarkers = null), !0
            })
        }),
        clearGutter: dd(function(a) {
            var b = this,
                c = b.doc,
                d = c.first;
            c.iter(function(c) {
                c.gutterMarkers && c.gutterMarkers[a] && (c.gutterMarkers[a] = null, id(b, d, "gutter"), jh(c.gutterMarkers) && (c.gutterMarkers = null)), ++d
            })
        }),
        lineInfo: function(a) {
            if ("number" == typeof a) {
                if (!Pb(this.doc, a)) return null;
                var b = a;
                if (a = dg(this.doc, a), !a) return null
            } else {
                var b = hg(a);
                if (null == b) return null
            }
            return {
                line: b,
                handle: a,
                text: a.text,
                gutterMarkers: a.gutterMarkers,
                textClass: a.textClass,
                bgClass: a.bgClass,
                wrapClass: a.wrapClass,
                widgets: a.widgets
            }
        },
        getViewport: function() {
            return {
                from: this.display.viewFrom,
                to: this.display.viewTo
            }
        },
        addWidget: function(a, b, c, d, e) {
            var f = this.display;
            a = Kc(this, Nb(this.doc, a));
            var g = a.bottom,
                h = a.left;
            if (b.style.position = "absolute", b.setAttribute("cm-ignore-events", "true"), this.display.input.setUneditable(b), f.sizer.appendChild(b), "over" == d) g = a.top;
            else if ("above" == d || "near" == d) {
                var i = Math.max(f.wrapper.clientHeight, this.doc.height),
                    j = Math.max(f.sizer.clientWidth, f.lineSpace.clientWidth);
                ("above" == d || a.bottom + b.offsetHeight > i) && a.top > b.offsetHeight ? g = a.top - b.offsetHeight : a.bottom + b.offsetHeight <= i && (g = a.bottom), h + b.offsetWidth > j && (h = j - b.offsetWidth)
            }
            b.style.top = g + "px", b.style.left = b.style.right = "", "right" == e ? (h = f.sizer.clientWidth - b.offsetWidth, b.style.right = "0px") : ("left" == e ? h = 0 : "middle" == e && (h = (f.sizer.clientWidth - b.offsetWidth) / 2), b.style.left = h + "px"), c && ne(this, h, g, h + b.offsetWidth, g + b.offsetHeight)
        },
        triggerOnKeyDown: dd(Rd),
        triggerOnKeyPress: dd(Ud),
        triggerOnKeyUp: Td,
        execCommand: function(a) {
            return Ie.hasOwnProperty(a) ? Ie[a](this) : void 0
        },
        triggerElectric: dd(function(a) {
            xb(this, a)
        }),
        findPosH: function(a, b, c, d) {
            var e = 1;
            0 > b && (e = -1, b = -b);
            for (var f = 0, g = Nb(this.doc, a); b > f && (g = ve(this.doc, g, e, c, d), !g.hitSide); ++f);
            return g
        },
        moveH: dd(function(a, b) {
            var c = this;
            c.extendSelectionsBy(function(d) {
                return c.display.shift || c.doc.extend || d.empty() ? ve(c.doc, d.head, a, b, c.options.rtlMoveVisually) : 0 > a ? d.from() : d.to()
            }, Ug)
        }),
        deleteH: dd(function(a, b) {
            var c = this.doc.sel,
                d = this.doc;
            c.somethingSelected() ? d.replaceSelection("", null, "+delete") : ue(this, function(c) {
                var e = ve(d, c.head, a, b, !1);
                return 0 > a ? {
                    from: e,
                    to: c.head
                } : {
                    from: c.head,
                    to: e
                }
            })
        }),
        findPosV: function(a, b, c, d) {
            var e = 1,
                f = d;
            0 > b && (e = -1, b = -b);
            for (var g = 0, h = Nb(this.doc, a); b > g; ++g) {
                var i = Kc(this, h, "div");
                if (null == f ? f = i.left : i.left = f, h = we(this, i, e, c), h.hitSide) break
            }
            return h
        },
        moveV: dd(function(a, b) {
            var c = this,
                d = this.doc,
                e = [],
                f = !c.display.shift && !d.extend && d.sel.somethingSelected();
            if (d.extendSelectionsBy(function(g) {
                    if (f) return 0 > a ? g.from() : g.to();
                    var h = Kc(c, g.head, "div");
                    null != g.goalColumn && (h.left = g.goalColumn), e.push(h.left);
                    var i = we(c, h, a, b);
                    return "page" == b && g == d.sel.primary() && pe(c, null, Jc(c, i, "div").top - h.top), i
                }, Ug), e.length)
                for (var g = 0; g < d.sel.ranges.length; g++) d.sel.ranges[g].goalColumn = e[g]
        }),
        findWordAt: function(a) {
            var b = this.doc,
                c = dg(b, a.line).text,
                d = a.ch,
                e = a.ch;
            if (c) {
                var f = this.getHelper(a, "wordChars");
                (a.xRel < 0 || e == c.length) && d ? --d : ++e;
                for (var g = c.charAt(d), h = ih(g, f) ? function(a) {
                        return ih(a, f)
                    } : /\s/.test(g) ? function(a) {
                        return /\s/.test(a)
                    } : function(a) {
                        return !/\s/.test(a) && !ih(a)
                    }; d > 0 && h(c.charAt(d - 1));) --d;
                for (; e < c.length && h(c.charAt(e));) ++e
            }
            return new Jb(ob(a.line, d), ob(a.line, e))
        },
        toggleOverwrite: function(a) {
            (null == a || a != this.state.overwrite) && ((this.state.overwrite = !this.state.overwrite) ? uh(this.display.cursorDiv, "CodeMirror-overwrite") : th(this.display.cursorDiv, "CodeMirror-overwrite"), Ig(this, "overwriteToggle", this, this.state.overwrite))
        },
        hasFocus: function() {
            return this.display.input.getField() == rh()
        },
        scrollTo: dd(function(a, b) {
            (null != a || null != b) && re(this), null != a && (this.curOp.scrollLeft = a), null != b && (this.curOp.scrollTop = b)
        }),
        getScrollInfo: function() {
            var a = this.display.scroller;
            return {
                left: a.scrollLeft,
                top: a.scrollTop,
                height: a.scrollHeight - oc(this) - this.display.barHeight,
                width: a.scrollWidth - oc(this) - this.display.barWidth,
                clientHeight: qc(this),
                clientWidth: pc(this)
            }
        },
        scrollIntoView: dd(function(a, b) {
            if (null == a ? (a = {
                    from: this.doc.sel.primary().head,
                    to: null
                }, null == b && (b = this.options.cursorScrollMargin)) : "number" == typeof a ? a = {
                    from: ob(a, 0),
                    to: null
                } : null == a.from && (a = {
                    from: a,
                    to: null
                }), a.to || (a.to = a.from), a.margin = b || 0, null != a.from.line) re(this), this.curOp.scrollToPos = a;
            else {
                var c = oe(this, Math.min(a.from.left, a.to.left), Math.min(a.from.top, a.to.top) - a.margin, Math.max(a.from.right, a.to.right), Math.max(a.from.bottom, a.to.bottom) + a.margin);
                this.scrollTo(c.scrollLeft, c.scrollTop)
            }
        }),
        setSize: dd(function(a, b) {
            function d(a) {
                return "number" == typeof a || /^\d+$/.test(String(a)) ? a + "px" : a
            }
            var c = this;
            null != a && (c.display.wrapper.style.width = d(a)), null != b && (c.display.wrapper.style.height = d(b)), c.options.lineWrapping && Dc(this);
            var e = c.display.viewFrom;
            c.doc.iter(e, c.display.viewTo, function(a) {
                if (a.widgets)
                    for (var b = 0; b < a.widgets.length; b++)
                        if (a.widgets[b].noHScroll) {
                            id(c, e, "widget");
                            break
                        }++ e
            }), c.curOp.forceUpdate = !0, Ig(c, "refresh", this)
        }),
        operation: function(a) {
            return bd(this, a)
        },
        refresh: dd(function() {
            var a = this.display.cachedTextHeight;
            hd(this), this.curOp.forceUpdate = !0, Ec(this), this.scrollTo(this.doc.scrollLeft, this.doc.scrollTop), F(this), (null == a || Math.abs(a - Qc(this.display)) > .5) && B(this), Ig(this, "refresh", this)
        }),
        swapDoc: dd(function(a) {
            var b = this.doc;
            return b.cm = null, cg(this, a), Ec(this), this.display.input.reset(), this.scrollTo(a.scrollLeft, a.scrollTop), this.curOp.forceScroll = !0, Kg(this, "swapDoc", this, b), b
        }),
        getInputField: function() {
            return this.display.input.getField()
        },
        getWrapperElement: function() {
            return this.display.wrapper
        },
        getScrollerElement: function() {
            return this.display.scroller
        },
        getGutterElement: function() {
            return this.display.gutters
        }
    }, Pg(v);
    var xe = v.defaults = {},
        ye = v.optionHandlers = {},
        Ae = v.Init = {
            toString: function() {
                return "CodeMirror.Init"
            }
        };
    ze("value", "", function(a, b) {
        a.setValue(b)
    }, !0), ze("mode", null, function(a, b) {
        a.doc.modeOption = b, x(a)
    }, !0), ze("indentUnit", 2, x, !0), ze("indentWithTabs", !1), ze("smartIndent", !0), ze("tabSize", 4, function(a) {
        y(a), Ec(a), hd(a)
    }, !0), ze("specialChars", /[\t\u0000-\u0019\u00ad\u200b-\u200f\u2028\u2029\ufeff]/g, function(a, b, c) {
        a.state.specialChars = new RegExp(b.source + (b.test("	") ? "" : "|	"), "g"), c != v.Init && a.refresh()
    }), ze("specialCharPlaceholder", Pf, function(a) {
        a.refresh()
    }, !0), ze("electricChars", !0), ze("inputStyle", n ? "contenteditable" : "textarea", function() {
        throw new Error("inputStyle can not (yet) be changed in a running editor")
    }, !0), ze("rtlMoveVisually", !p), ze("wholeLineUpdateBefore", !0), ze("theme", "default", function(a) {
        C(a), D(a)
    }, !0), ze("keyMap", "default", function(a, b, c) {
        var d = Oe(b),
            e = c != v.Init && Oe(c);
        e && e.detach && e.detach(a, d), d.attach && d.attach(a, e || null)
    }), ze("extraKeys", null), ze("lineWrapping", !1, z, !0), ze("gutters", [], function(a) {
        I(a.options), D(a)
    }, !0), ze("fixedGutter", !0, function(a, b) {
        a.display.gutters.style.left = b ? T(a.display) + "px" : "0", a.refresh()
    }, !0), ze("coverGutterNextToScrollbar", !1, function(a) {
        N(a)
    }, !0), ze("scrollbarStyle", "native", function(a) {
        M(a), N(a), a.display.scrollbars.setScrollTop(a.doc.scrollTop), a.display.scrollbars.setScrollLeft(a.doc.scrollLeft)
    }, !0), ze("lineNumbers", !1, function(a) {
        I(a.options), D(a)
    }, !0), ze("firstLineNumber", 1, D, !0), ze("lineNumberFormatter", function(a) {
        return a
    }, D, !0), ze("showCursorWhenSelecting", !1, cc, !0), ze("resetSelectionOnContextMenu", !0), ze("lineWiseCopyCut", !0), ze("readOnly", !1, function(a, b) {
        "nocursor" == b ? (Xd(a), a.display.input.blur(), a.display.disabled = !0) : (a.display.disabled = !1, b || a.display.input.reset())
    }), ze("disableInput", !1, function(a, b) {
        b || a.display.input.reset()
    }, !0), ze("dragDrop", !0, pd), ze("cursorBlinkRate", 530), ze("cursorScrollMargin", 0), ze("cursorHeight", 1, cc, !0), ze("singleCursorHeightPerLine", !0, cc, !0), ze("workTime", 100), ze("workDelay", 100), ze("flattenSpans", !0, y, !0), ze("addModeClass", !1, y, !0), ze("pollInterval", 100), ze("undoDepth", 200, function(a, b) {
        a.doc.history.undoDepth = b
    }), ze("historyEventDelay", 1250), ze("viewportMargin", 10, function(a) {
        a.refresh()
    }, !0), ze("maxHighlightLength", 1e4, y, !0), ze("moveInputWithCursor", !0, function(a, b) {
        b || a.display.input.resetPosition()
    }), ze("tabindex", null, function(a, b) {
        a.display.input.getField().tabIndex = b || ""
    }), ze("autofocus", null);
    var Be = v.modes = {},
        Ce = v.mimeModes = {};
    v.defineMode = function(a, b) {
        v.defaults.mode || "null" == a || (v.defaults.mode = a), arguments.length > 2 && (b.dependencies = Array.prototype.slice.call(arguments, 2)), Be[a] = b
    }, v.defineMIME = function(a, b) {
        Ce[a] = b
    }, v.resolveMode = function(a) {
        if ("string" == typeof a && Ce.hasOwnProperty(a)) a = Ce[a];
        else if (a && "string" == typeof a.name && Ce.hasOwnProperty(a.name)) {
            var b = Ce[a.name];
            "string" == typeof b && (b = {
                name: b
            }), a = dh(b, a), a.name = b.name
        } else if ("string" == typeof a && /^[\w\-]+\/[\w\-]+\+xml$/.test(a)) return v.resolveMode("application/xml");
        return "string" == typeof a ? {
            name: a
        } : a || {
            name: "null"
        }
    }, v.getMode = function(a, b) {
        var b = v.resolveMode(b),
            c = Be[b.name];
        if (!c) return v.getMode(a, "text/plain");
        var d = c(a, b);
        if (De.hasOwnProperty(b.name)) {
            var e = De[b.name];
            for (var f in e) e.hasOwnProperty(f) && (d.hasOwnProperty(f) && (d["_" + f] = d[f]), d[f] = e[f])
        }
        if (d.name = b.name, b.helperType && (d.helperType = b.helperType), b.modeProps)
            for (var f in b.modeProps) d[f] = b.modeProps[f];
        return d
    }, v.defineMode("null", function() {
        return {
            token: function(a) {
                a.skipToEnd()
            }
        }
    }), v.defineMIME("text/plain", "null");
    var De = v.modeExtensions = {};
    v.extendMode = function(a, b) {
        var c = De.hasOwnProperty(a) ? De[a] : De[a] = {};
        eh(b, c)
    }, v.defineExtension = function(a, b) {
        v.prototype[a] = b
    }, v.defineDocExtension = function(a, b) {
        $f.prototype[a] = b
    }, v.defineOption = ze;
    var Ee = [];
    v.defineInitHook = function(a) {
        Ee.push(a)
    };
    var Fe = v.helpers = {};
    v.registerHelper = function(a, b, c) {
        Fe.hasOwnProperty(a) || (Fe[a] = v[a] = {
            _global: []
        }), Fe[a][b] = c
    }, v.registerGlobalHelper = function(a, b, c, d) {
        v.registerHelper(a, b, d), Fe[a]._global.push({
            pred: c,
            val: d
        })
    };
    var Ge = v.copyState = function(a, b) {
            if (b === !0) return b;
            if (a.copyState) return a.copyState(b);
            var c = {};
            for (var d in b) {
                var e = b[d];
                e instanceof Array && (e = e.concat([])), c[d] = e
            }
            return c
        },
        He = v.startState = function(a, b, c) {
            return a.startState ? a.startState(b, c) : !0
        };
    v.innerMode = function(a, b) {
        for (; a.innerMode;) {
            var c = a.innerMode(b);
            if (!c || c.mode == a) break;
            b = c.state, a = c.mode
        }
        return c || {
            mode: a,
            state: b
        }
    };
    var Ie = v.commands = {
            selectAll: function(a) {
                a.setSelection(ob(a.firstLine(), 0), ob(a.lastLine()), Sg)
            },
            singleSelection: function(a) {
                a.setSelection(a.getCursor("anchor"), a.getCursor("head"), Sg)
            },
            killLine: function(a) {
                ue(a, function(b) {
                    if (b.empty()) {
                        var c = dg(a.doc, b.head.line).text.length;
                        return b.head.ch == c && b.head.line < a.lastLine() ? {
                            from: b.head,
                            to: ob(b.head.line + 1, 0)
                        } : {
                            from: b.head,
                            to: ob(b.head.line, c)
                        }
                    }
                    return {
                        from: b.from(),
                        to: b.to()
                    }
                })
            },
            deleteLine: function(a) {
                ue(a, function(b) {
                    return {
                        from: ob(b.from().line, 0),
                        to: Nb(a.doc, ob(b.to().line + 1, 0))
                    }
                })
            },
            delLineLeft: function(a) {
                ue(a, function(a) {
                    return {
                        from: ob(a.from().line, 0),
                        to: a.from()
                    }
                })
            },
            delWrappedLineLeft: function(a) {
                ue(a, function(b) {
                    var c = a.charCoords(b.head, "div").top + 5,
                        d = a.coordsChar({
                            left: 0,
                            top: c
                        }, "div");
                    return {
                        from: d,
                        to: b.from()
                    }
                })
            },
            delWrappedLineRight: function(a) {
                ue(a, function(b) {
                    var c = a.charCoords(b.head, "div").top + 5,
                        d = a.coordsChar({
                            left: a.display.lineDiv.offsetWidth + 100,
                            top: c
                        }, "div");
                    return {
                        from: b.from(),
                        to: d
                    }
                })
            },
            undo: function(a) {
                a.undo()
            },
            redo: function(a) {
                a.redo()
            },
            undoSelection: function(a) {
                a.undoSelection()
            },
            redoSelection: function(a) {
                a.redoSelection()
            },
            goDocStart: function(a) {
                a.extendSelection(ob(a.firstLine(), 0))
            },
            goDocEnd: function(a) {
                a.extendSelection(ob(a.lastLine()))
            },
            goLineStart: function(a) {
                a.extendSelectionsBy(function(b) {
                    return Qh(a, b.head.line)
                }, {
                    origin: "+move",
                    bias: 1
                })
            },
            goLineStartSmart: function(a) {
                a.extendSelectionsBy(function(b) {
                    return Sh(a, b.head)
                }, {
                    origin: "+move",
                    bias: 1
                })
            },
            goLineEnd: function(a) {
                a.extendSelectionsBy(function(b) {
                    return Rh(a, b.head.line)
                }, {
                    origin: "+move",
                    bias: -1
                })
            },
            goLineRight: function(a) {
                a.extendSelectionsBy(function(b) {
                    var c = a.charCoords(b.head, "div").top + 5;
                    return a.coordsChar({
                        left: a.display.lineDiv.offsetWidth + 100,
                        top: c
                    }, "div")
                }, Ug)
            },
            goLineLeft: function(a) {
                a.extendSelectionsBy(function(b) {
                    var c = a.charCoords(b.head, "div").top + 5;
                    return a.coordsChar({
                        left: 0,
                        top: c
                    }, "div")
                }, Ug)
            },
            goLineLeftSmart: function(a) {
                a.extendSelectionsBy(function(b) {
                    var c = a.charCoords(b.head, "div").top + 5,
                        d = a.coordsChar({
                            left: 0,
                            top: c
                        }, "div");
                    return d.ch < a.getLine(d.line).search(/\S/) ? Sh(a, b.head) : d
                }, Ug)
            },
            goLineUp: function(a) {
                a.moveV(-1, "line")
            },
            goLineDown: function(a) {
                a.moveV(1, "line")
            },
            goPageUp: function(a) {
                a.moveV(-1, "page")
            },
            goPageDown: function(a) {
                a.moveV(1, "page")
            },
            goCharLeft: function(a) {
                a.moveH(-1, "char")
            },
            goCharRight: function(a) {
                a.moveH(1, "char")
            },
            goColumnLeft: function(a) {
                a.moveH(-1, "column")
            },
            goColumnRight: function(a) {
                a.moveH(1, "column")
            },
            goWordLeft: function(a) {
                a.moveH(-1, "word")
            },
            goGroupRight: function(a) {
                a.moveH(1, "group")
            },
            goGroupLeft: function(a) {
                a.moveH(-1, "group")
            },
            goWordRight: function(a) {
                a.moveH(1, "word")
            },
            delCharBefore: function(a) {
                a.deleteH(-1, "char")
            },
            delCharAfter: function(a) {
                a.deleteH(1, "char")
            },
            delWordBefore: function(a) {
                a.deleteH(-1, "word")
            },
            delWordAfter: function(a) {
                a.deleteH(1, "word")
            },
            delGroupBefore: function(a) {
                a.deleteH(-1, "group")
            },
            delGroupAfter: function(a) {
                a.deleteH(1, "group")
            },
            indentAuto: function(a) {
                a.indentSelection("smart")
            },
            indentMore: function(a) {
                a.indentSelection("add")
            },
            indentLess: function(a) {
                a.indentSelection("subtract")
            },
            insertTab: function(a) {
                a.replaceSelection("	")
            },
            insertSoftTab: function(a) {
                for (var b = [], c = a.listSelections(), d = a.options.tabSize, e = 0; e < c.length; e++) {
                    var f = c[e].from(),
                        g = Wg(a.getLine(f.line), f.ch, d);
                    b.push(new Array(d - g % d + 1).join(" "))
                }
                a.replaceSelections(b)
            },
            defaultTab: function(a) {
                a.somethingSelected() ? a.indentSelection("add") : a.execCommand("insertTab")
            },
            transposeChars: function(a) {
                bd(a, function() {
                    for (var b = a.listSelections(), c = [], d = 0; d < b.length; d++) {
                        var e = b[d].head,
                            f = dg(a.doc, e.line).text;
                        if (f)
                            if (e.ch == f.length && (e = new ob(e.line, e.ch - 1)), e.ch > 0) e = new ob(e.line, e.ch + 1), a.replaceRange(f.charAt(e.ch - 1) + f.charAt(e.ch - 2), ob(e.line, e.ch - 2), e, "+transpose");
                            else if (e.line > a.doc.first) {
                            var g = dg(a.doc, e.line - 1).text;
                            g && a.replaceRange(f.charAt(0) + "\n" + g.charAt(g.length - 1), ob(e.line - 1, g.length - 1), ob(e.line, 1), "+transpose")
                        }
                        c.push(new Jb(e, e))
                    }
                    a.setSelections(c)
                })
            },
            newlineAndIndent: function(a) {
                bd(a, function() {
                    for (var b = a.listSelections().length, c = 0; b > c; c++) {
                        var d = a.listSelections()[c];
                        a.replaceRange("\n", d.anchor, d.head, "+input"), a.indentLine(d.from().line + 1, null, !0), qe(a)
                    }
                })
            },
            toggleOverwrite: function(a) {
                a.toggleOverwrite()
            }
        },
        Je = v.keyMap = {};
    Je.basic = {
        Left: "goCharLeft",
        Right: "goCharRight",
        Up: "goLineUp",
        Down: "goLineDown",
        End: "goLineEnd",
        Home: "goLineStartSmart",
        PageUp: "goPageUp",
        PageDown: "goPageDown",
        Delete: "delCharAfter",
        Backspace: "delCharBefore",
        "Shift-Backspace": "delCharBefore",
        Tab: "defaultTab",
        "Shift-Tab": "indentAuto",
        Enter: "newlineAndIndent",
        Insert: "toggleOverwrite",
        Esc: "singleSelection"
    }, Je.pcDefault = {
        "Ctrl-A": "selectAll",
        "Ctrl-D": "deleteLine",
        "Ctrl-Z": "undo",
        "Shift-Ctrl-Z": "redo",
        "Ctrl-Y": "redo",
        "Ctrl-Home": "goDocStart",
        "Ctrl-End": "goDocEnd",
        "Ctrl-Up": "goLineUp",
        "Ctrl-Down": "goLineDown",
        "Ctrl-Left": "goGroupLeft",
        "Ctrl-Right": "goGroupRight",
        "Alt-Left": "goLineStart",
        "Alt-Right": "goLineEnd",
        "Ctrl-Backspace": "delGroupBefore",
        "Ctrl-Delete": "delGroupAfter",
        "Ctrl-S": "save",
        "Ctrl-F": "find",
        "Ctrl-G": "findNext",
        "Shift-Ctrl-G": "findPrev",
        "Shift-Ctrl-F": "replace",
        "Shift-Ctrl-R": "replaceAll",
        "Ctrl-[": "indentLess",
        "Ctrl-]": "indentMore",
        "Ctrl-U": "undoSelection",
        "Shift-Ctrl-U": "redoSelection",
        "Alt-U": "redoSelection",
        fallthrough: "basic"
    }, Je.emacsy = {
        "Ctrl-F": "goCharRight",
        "Ctrl-B": "goCharLeft",
        "Ctrl-P": "goLineUp",
        "Ctrl-N": "goLineDown",
        "Alt-F": "goWordRight",
        "Alt-B": "goWordLeft",
        "Ctrl-A": "goLineStart",
        "Ctrl-E": "goLineEnd",
        "Ctrl-V": "goPageDown",
        "Shift-Ctrl-V": "goPageUp",
        "Ctrl-D": "delCharAfter",
        "Ctrl-H": "delCharBefore",
        "Alt-D": "delWordAfter",
        "Alt-Backspace": "delWordBefore",
        "Ctrl-K": "killLine",
        "Ctrl-T": "transposeChars"
    }, Je.macDefault = {
        "Cmd-A": "selectAll",
        "Cmd-D": "deleteLine",
        "Cmd-Z": "undo",
        "Shift-Cmd-Z": "redo",
        "Cmd-Y": "redo",
        "Cmd-Home": "goDocStart",
        "Cmd-Up": "goDocStart",
        "Cmd-End": "goDocEnd",
        "Cmd-Down": "goDocEnd",
        "Alt-Left": "goGroupLeft",
        "Alt-Right": "goGroupRight",
        "Cmd-Left": "goLineLeft",
        "Cmd-Right": "goLineRight",
        "Alt-Backspace": "delGroupBefore",
        "Ctrl-Alt-Backspace": "delGroupAfter",
        "Alt-Delete": "delGroupAfter",
        "Cmd-S": "save",
        "Cmd-F": "find",
        "Cmd-G": "findNext",
        "Shift-Cmd-G": "findPrev",
        "Cmd-Alt-F": "replace",
        "Shift-Cmd-Alt-F": "replaceAll",
        "Cmd-[": "indentLess",
        "Cmd-]": "indentMore",
        "Cmd-Backspace": "delWrappedLineLeft",
        "Cmd-Delete": "delWrappedLineRight",
        "Cmd-U": "undoSelection",
        "Shift-Cmd-U": "redoSelection",
        "Ctrl-Up": "goDocStart",
        "Ctrl-Down": "goDocEnd",
        fallthrough: ["basic", "emacsy"]
    }, Je["default"] = o ? Je.macDefault : Je.pcDefault, v.normalizeKeyMap = function(a) {
        var b = {};
        for (var c in a)
            if (a.hasOwnProperty(c)) {
                var d = a[c];
                if (/^(name|fallthrough|(de|at)tach)$/.test(c)) continue;
                if ("..." == d) {
                    delete a[c];
                    continue
                }
                for (var e = bh(c.split(" "), Ke), f = 0; f < e.length; f++) {
                    var g, h;
                    f == e.length - 1 ? (h = e.join(" "), g = d) : (h = e.slice(0, f + 1).join(" "), g = "...");
                    var i = b[h];
                    if (i) {
                        if (i != g) throw new Error("Inconsistent bindings for " + h)
                    } else b[h] = g
                }
                delete a[c]
            } for (var j in b) a[j] = b[j];
        return a
    };
    var Le = v.lookupKey = function(a, b, c, d) {
            b = Oe(b);
            var e = b.call ? b.call(a, d) : b[a];
            if (e === !1) return "nothing";
            if ("..." === e) return "multi";
            if (null != e && c(e)) return "handled";
            if (b.fallthrough) {
                if ("[object Array]" != Object.prototype.toString.call(b.fallthrough)) return Le(a, b.fallthrough, c, d);
                for (var f = 0; f < b.fallthrough.length; f++) {
                    var g = Le(a, b.fallthrough[f], c, d);
                    if (g) return g
                }
            }
        },
        Me = v.isModifierKey = function(a) {
            var b = "string" == typeof a ? a : Kh[a.keyCode];
            return "Ctrl" == b || "Alt" == b || "Shift" == b || "Mod" == b
        },
        Ne = v.keyName = function(a, b) {
            if (i && 34 == a.keyCode && a["char"]) return !1;
            var c = Kh[a.keyCode],
                d = c;
            return null == d || a.altGraphKey ? !1 : (a.altKey && "Alt" != c && (d = "Alt-" + d), (r ? a.metaKey : a.ctrlKey) && "Ctrl" != c && (d = "Ctrl-" + d), (r ? a.ctrlKey : a.metaKey) && "Cmd" != c && (d = "Cmd-" + d), !b && a.shiftKey && "Shift" != c && (d = "Shift-" + d), d)
        };
    v.fromTextArea = function(a, b) {
        function d() {
            a.value = i.getValue()
        }
        if (b = b ? eh(b) : {}, b.value = a.value, !b.tabindex && a.tabIndex && (b.tabindex = a.tabIndex), !b.placeholder && a.placeholder && (b.placeholder = a.placeholder), null == b.autofocus) {
            var c = rh();
            b.autofocus = c == a || null != a.getAttribute("autofocus") && c == document.body
        }
        if (a.form && (Gg(a.form, "submit", d), !b.leaveSubmitMethodAlone)) {
            var e = a.form,
                f = e.submit;
            try {
                var g = e.submit = function() {
                    d(), e.submit = f, e.submit(), e.submit = g
                }
            } catch (h) {}
        }
        b.finishInit = function(b) {
            b.save = d, b.getTextArea = function() {
                return a
            }, b.toTextArea = function() {
                b.toTextArea = isNaN, d(), a.parentNode.removeChild(b.getWrapperElement()), a.style.display = "", a.form && (Hg(a.form, "submit", d), "function" == typeof a.form.submit && (a.form.submit = f))
            }
        }, a.style.display = "none";
        var i = v(function(b) {
            a.parentNode.insertBefore(b, a.nextSibling)
        }, b);
        return i
    };
    var Pe = v.StringStream = function(a, b) {
        this.pos = this.start = 0, this.string = a, this.tabSize = b || 8, this.lastColumnPos = this.lastColumnValue = 0, this.lineStart = 0
    };
    Pe.prototype = {
        eol: function() {
            return this.pos >= this.string.length
        },
        sol: function() {
            return this.pos == this.lineStart
        },
        peek: function() {
            return this.string.charAt(this.pos) || void 0
        },
        next: function() {
            return this.pos < this.string.length ? this.string.charAt(this.pos++) : void 0
        },
        eat: function(a) {
            var b = this.string.charAt(this.pos);
            if ("string" == typeof a) var c = b == a;
            else var c = b && (a.test ? a.test(b) : a(b));
            return c ? (++this.pos, b) : void 0
        },
        eatWhile: function(a) {
            for (var b = this.pos; this.eat(a););
            return this.pos > b
        },
        eatSpace: function() {
            for (var a = this.pos;
                /[\s\u00a0]/.test(this.string.charAt(this.pos));) ++this.pos;
            return this.pos > a
        },
        skipToEnd: function() {
            this.pos = this.string.length
        },
        skipTo: function(a) {
            var b = this.string.indexOf(a, this.pos);
            return b > -1 ? (this.pos = b, !0) : void 0
        },
        backUp: function(a) {
            this.pos -= a
        },
        column: function() {
            return this.lastColumnPos < this.start && (this.lastColumnValue = Wg(this.string, this.start, this.tabSize, this.lastColumnPos, this.lastColumnValue), this.lastColumnPos = this.start), this.lastColumnValue - (this.lineStart ? Wg(this.string, this.lineStart, this.tabSize) : 0)
        },
        indentation: function() {
            return Wg(this.string, null, this.tabSize) - (this.lineStart ? Wg(this.string, this.lineStart, this.tabSize) : 0)
        },
        match: function(a, b, c) {
            if ("string" != typeof a) {
                var f = this.string.slice(this.pos).match(a);
                return f && f.index > 0 ? null : (f && b !== !1 && (this.pos += f[0].length), f)
            }
            var d = function(a) {
                    return c ? a.toLowerCase() : a
                },
                e = this.string.substr(this.pos, a.length);
            return d(e) == d(a) ? (b !== !1 && (this.pos += a.length), !0) : void 0
        },
        current: function() {
            return this.string.slice(this.start, this.pos)
        },
        hideFirstChars: function(a, b) {
            this.lineStart += a;
            try {
                return b()
            } finally {
                this.lineStart -= a
            }
        }
    };
    var Qe = 0,
        Re = v.TextMarker = function(a, b) {
            this.lines = [], this.type = b, this.doc = a, this.id = ++Qe
        };
    Pg(Re), Re.prototype.clear = function() {
        if (!this.explicitlyCleared) {
            var a = this.doc.cm,
                b = a && !a.curOp;
            if (b && Uc(a), Og(this, "clear")) {
                var c = this.find();
                c && Kg(this, "clear", c.from, c.to)
            }
            for (var d = null, e = null, f = 0; f < this.lines.length; ++f) {
                var g = this.lines[f],
                    h = Ze(g.markedSpans, this);
                a && !this.collapsed ? id(a, hg(g), "text") : a && (null != h.to && (e = hg(g)), null != h.from && (d = hg(g))), g.markedSpans = $e(g.markedSpans, h), null == h.from && this.collapsed && !uf(this.doc, g) && a && gg(g, Qc(a.display))
            }
            if (a && this.collapsed && !a.options.lineWrapping)
                for (var f = 0; f < this.lines.length; ++f) {
                    var i = qf(this.lines[f]),
                        j = G(i);
                    j > a.display.maxLineLength && (a.display.maxLine = i, a.display.maxLineLength = j, a.display.maxLineChanged = !0)
                }
            null != d && a && this.collapsed && hd(a, d, e + 1), this.lines.length = 0, this.explicitlyCleared = !0, this.atomic && this.doc.cantEdit && (this.doc.cantEdit = !1, a && _b(a.doc)), a && Kg(a, "markerCleared", a, this), b && Wc(a), this.parent && this.parent.clear()
        }
    }, Re.prototype.find = function(a, b) {
        null == a && "bookmark" == this.type && (a = 1);
        for (var c, d, e = 0; e < this.lines.length; ++e) {
            var f = this.lines[e],
                g = Ze(f.markedSpans, this);
            if (null != g.from && (c = ob(b ? f : hg(f), g.from), -1 == a)) return c;
            if (null != g.to && (d = ob(b ? f : hg(f), g.to), 1 == a)) return d
        }
        return c && {
            from: c,
            to: d
        }
    }, Re.prototype.changed = function() {
        var a = this.find(-1, !0),
            b = this,
            c = this.doc.cm;
        a && c && bd(c, function() {
            var d = a.line,
                e = hg(a.line),
                f = vc(c, e);
            if (f && (Cc(f), c.curOp.selectionChanged = c.curOp.forceUpdate = !0), c.curOp.updateMaxLine = !0, !uf(b.doc, d) && null != b.height) {
                var g = b.height;
                b.height = null;
                var h = yf(b) - g;
                h && gg(d, d.height + h)
            }
        })
    }, Re.prototype.attachLine = function(a) {
        if (!this.lines.length && this.doc.cm) {
            var b = this.doc.cm.curOp;
            b.maybeHiddenMarkers && -1 != ah(b.maybeHiddenMarkers, this) || (b.maybeUnhiddenMarkers || (b.maybeUnhiddenMarkers = [])).push(this)
        }
        this.lines.push(a)
    }, Re.prototype.detachLine = function(a) {
        if (this.lines.splice(ah(this.lines, a), 1), !this.lines.length && this.doc.cm) {
            var b = this.doc.cm.curOp;
            (b.maybeHiddenMarkers || (b.maybeHiddenMarkers = [])).push(this)
        }
    };
    var Qe = 0,
        Te = v.SharedTextMarker = function(a, b) {
            this.markers = a, this.primary = b;
            for (var c = 0; c < a.length; ++c) a[c].parent = this
        };
    Pg(Te), Te.prototype.clear = function() {
        if (!this.explicitlyCleared) {
            this.explicitlyCleared = !0;
            for (var a = 0; a < this.markers.length; ++a) this.markers[a].clear();
            Kg(this, "clear")
        }
    }, Te.prototype.find = function(a, b) {
        return this.primary.find(a, b)
    };
    var wf = v.LineWidget = function(a, b, c) {
        if (c)
            for (var d in c) c.hasOwnProperty(d) && (this[d] = c[d]);
        this.doc = a, this.node = b
    };
    Pg(wf), wf.prototype.clear = function() {
        var a = this.doc.cm,
            b = this.line.widgets,
            c = this.line,
            d = hg(c);
        if (null != d && b) {
            for (var e = 0; e < b.length; ++e) b[e] == this && b.splice(e--, 1);
            b.length || (c.widgets = null);
            var f = yf(this);
            gg(c, Math.max(0, c.height - f)), a && bd(a, function() {
                xf(a, c, -f), id(a, d, "widget")
            })
        }
    }, wf.prototype.changed = function() {
        var a = this.height,
            b = this.doc.cm,
            c = this.line;
        this.height = null;
        var d = yf(this) - a;
        d && (gg(c, c.height + d), b && bd(b, function() {
            b.curOp.forceUpdate = !0, xf(b, c, d)
        }))
    };
    var Af = v.Line = function(a, b, c) {
        this.text = a, hf(this, b), this.height = c ? c(this) : 1
    };
    Pg(Af), Af.prototype.lineNo = function() {
        return hg(this)
    };
    var Lf = {},
        Mf = {};
    Xf.prototype = {
        chunkSize: function() {
            return this.lines.length
        },
        removeInner: function(a, b) {
            for (var c = a, d = a + b; d > c; ++c) {
                var e = this.lines[c];
                this.height -= e.height, Cf(e), Kg(e, "delete")
            }
            this.lines.splice(a, b)
        },
        collapse: function(a) {
            a.push.apply(a, this.lines)
        },
        insertInner: function(a, b, c) {
            this.height += c, this.lines = this.lines.slice(0, a).concat(b).concat(this.lines.slice(a));
            for (var d = 0; d < b.length; ++d) b[d].parent = this
        },
        iterN: function(a, b, c) {
            for (var d = a + b; d > a; ++a)
                if (c(this.lines[a])) return !0
        }
    }, Yf.prototype = {
        chunkSize: function() {
            return this.size
        },
        removeInner: function(a, b) {
            this.size -= b;
            for (var c = 0; c < this.children.length; ++c) {
                var d = this.children[c],
                    e = d.chunkSize();
                if (e > a) {
                    var f = Math.min(b, e - a),
                        g = d.height;
                    if (d.removeInner(a, f), this.height -= g - d.height, e == f && (this.children.splice(c--, 1), d.parent = null), 0 == (b -= f)) break;
                    a = 0
                } else a -= e
            }
            if (this.size - b < 25 && (this.children.length > 1 || !(this.children[0] instanceof Xf))) {
                var h = [];
                this.collapse(h), this.children = [new Xf(h)], this.children[0].parent = this
            }
        },
        collapse: function(a) {
            for (var b = 0; b < this.children.length; ++b) this.children[b].collapse(a)
        },
        insertInner: function(a, b, c) {
            this.size += b.length, this.height += c;
            for (var d = 0; d < this.children.length; ++d) {
                var e = this.children[d],
                    f = e.chunkSize();
                if (f >= a) {
                    if (e.insertInner(a, b, c), e.lines && e.lines.length > 50) {
                        for (; e.lines.length > 50;) {
                            var g = e.lines.splice(e.lines.length - 25, 25),
                                h = new Xf(g);
                            e.height -= h.height, this.children.splice(d + 1, 0, h), h.parent = this
                        }
                        this.maybeSpill()
                    }
                    break
                }
                a -= f
            }
        },
        maybeSpill: function() {
            if (!(this.children.length <= 10)) {
                var a = this;
                do {
                    var b = a.children.splice(a.children.length - 5, 5),
                        c = new Yf(b);
                    if (a.parent) {
                        a.size -= c.size, a.height -= c.height;
                        var e = ah(a.parent.children, a);
                        a.parent.children.splice(e + 1, 0, c)
                    } else {
                        var d = new Yf(a.children);
                        d.parent = a, a.children = [d, c], a = d
                    }
                    c.parent = a.parent
                } while (a.children.length > 10);
                a.parent.maybeSpill()
            }
        },
        iterN: function(a, b, c) {
            for (var d = 0; d < this.children.length; ++d) {
                var e = this.children[d],
                    f = e.chunkSize();
                if (f > a) {
                    var g = Math.min(b, f - a);
                    if (e.iterN(a, g, c)) return !0;
                    if (0 == (b -= g)) break;
                    a = 0
                } else a -= f
            }
        }
    };
    var Zf = 0,
        $f = v.Doc = function(a, b, c) {
            if (!(this instanceof $f)) return new $f(a, b, c);
            null == c && (c = 0), Yf.call(this, [new Xf([new Af("", null)])]), this.first = c, this.scrollTop = this.scrollLeft = 0, this.cantEdit = !1, this.cleanGeneration = 1, this.frontier = c;
            var d = ob(c, 0);
            this.sel = Lb(d), this.history = new lg(null), this.id = ++Zf, this.modeOption = b, "string" == typeof a && (a = Fh(a)), Wf(this, {
                from: d,
                to: d,
                text: a
            }), Yb(this, Lb(d), Sg)
        };
    $f.prototype = dh(Yf.prototype, {
        constructor: $f,
        iter: function(a, b, c) {
            c ? this.iterN(a - this.first, b - a, c) : this.iterN(this.first, this.first + this.size, a)
        },
        insert: function(a, b) {
            for (var c = 0, d = 0; d < b.length; ++d) c += b[d].height;
            this.insertInner(a - this.first, b, c)
        },
        remove: function(a, b) {
            this.removeInner(a - this.first, b)
        },
        getValue: function(a) {
            var b = fg(this, this.first, this.first + this.size);
            return a === !1 ? b : b.join(a || "\n")
        },
        setValue: ed(function(a) {
            var b = ob(this.first, 0),
                c = this.first + this.size - 1;
            ee(this, {
                from: b,
                to: ob(c, dg(this, c).text.length),
                text: Fh(a),
                origin: "setValue",
                full: !0
            }, !0), Yb(this, Lb(b))
        }),
        replaceRange: function(a, b, c, d) {
            b = Nb(this, b), c = c ? Nb(this, c) : b, ke(this, a, b, c, d)
        },
        getRange: function(a, b, c) {
            var d = eg(this, Nb(this, a), Nb(this, b));
            return c === !1 ? d : d.join(c || "\n")
        },
        getLine: function(a) {
            var b = this.getLineHandle(a);
            return b && b.text
        },
        getLineHandle: function(a) {
            return Pb(this, a) ? dg(this, a) : void 0
        },
        getLineNumber: function(a) {
            return hg(a)
        },
        getLineHandleVisualStart: function(a) {
            return "number" == typeof a && (a = dg(this, a)), qf(a)
        },
        lineCount: function() {
            return this.size
        },
        firstLine: function() {
            return this.first
        },
        lastLine: function() {
            return this.first + this.size - 1
        },
        clipPos: function(a) {
            return Nb(this, a)
        },
        getCursor: function(a) {
            var c, b = this.sel.primary();
            return c = null == a || "head" == a ? b.head : "anchor" == a ? b.anchor : "end" == a || "to" == a || a === !1 ? b.to() : b.from()
        },
        listSelections: function() {
            return this.sel.ranges
        },
        somethingSelected: function() {
            return this.sel.somethingSelected()
        },
        setCursor: ed(function(a, b, c) {
            Vb(this, Nb(this, "number" == typeof a ? ob(a, b || 0) : a), null, c)
        }),
        setSelection: ed(function(a, b, c) {
            Vb(this, Nb(this, a), Nb(this, b || a), c)
        }),
        extendSelection: ed(function(a, b, c) {
            Sb(this, Nb(this, a), b && Nb(this, b), c)
        }),
        extendSelections: ed(function(a, b) {
            Tb(this, Qb(this, a, b))
        }),
        extendSelectionsBy: ed(function(a, b) {
            Tb(this, bh(this.sel.ranges, a), b)
        }),
        setSelections: ed(function(a, b, c) {
            if (a.length) {
                for (var d = 0, e = []; d < a.length; d++) e[d] = new Jb(Nb(this, a[d].anchor), Nb(this, a[d].head));
                null == b && (b = Math.min(a.length - 1, this.sel.primIndex)), Yb(this, Kb(e, b), c)
            }
        }),
        addSelection: ed(function(a, b, c) {
            var d = this.sel.ranges.slice(0);
            d.push(new Jb(Nb(this, a), Nb(this, b || a))), Yb(this, Kb(d, d.length - 1), c)
        }),
        getSelection: function(a) {
            for (var c, b = this.sel.ranges, d = 0; d < b.length; d++) {
                var e = eg(this, b[d].from(), b[d].to());
                c = c ? c.concat(e) : e
            }
            return a === !1 ? c : c.join(a || "\n")
        },
        getSelections: function(a) {
            for (var b = [], c = this.sel.ranges, d = 0; d < c.length; d++) {
                var e = eg(this, c[d].from(), c[d].to());
                a !== !1 && (e = e.join(a || "\n")), b[d] = e
            }
            return b
        },
        replaceSelection: function(a, b, c) {
            for (var d = [], e = 0; e < this.sel.ranges.length; e++) d[e] = a;
            this.replaceSelections(d, b, c || "+input")
        },
        replaceSelections: ed(function(a, b, c) {
            for (var d = [], e = this.sel, f = 0; f < e.ranges.length; f++) {
                var g = e.ranges[f];
                d[f] = {
                    from: g.from(),
                    to: g.to(),
                    text: Fh(a[f]),
                    origin: c
                }
            }
            for (var h = b && "end" != b && ce(this, d, b), f = d.length - 1; f >= 0; f--) ee(this, d[f]);
            h ? Xb(this, h) : this.cm && qe(this.cm)
        }),
        undo: ed(function() {
            ge(this, "undo")
        }),
        redo: ed(function() {
            ge(this, "redo")
        }),
        undoSelection: ed(function() {
            ge(this, "undo", !0)
        }),
        redoSelection: ed(function() {
            ge(this, "redo", !0)
        }),
        setExtending: function(a) {
            this.extend = a
        },
        getExtending: function() {
            return this.extend
        },
        historySize: function() {
            for (var a = this.history, b = 0, c = 0, d = 0; d < a.done.length; d++) a.done[d].ranges || ++b;
            for (var d = 0; d < a.undone.length; d++) a.undone[d].ranges || ++c;
            return {
                undo: b,
                redo: c
            }
        },
        clearHistory: function() {
            this.history = new lg(this.history.maxGeneration)
        },
        markClean: function() {
            this.cleanGeneration = this.changeGeneration(!0)
        },
        changeGeneration: function(a) {
            return a && (this.history.lastOp = this.history.lastSelOp = this.history.lastOrigin = null), this.history.generation
        },
        isClean: function(a) {
            return this.history.generation == (a || this.cleanGeneration)
        },
        getHistory: function() {
            return {
                done: wg(this.history.done),
                undone: wg(this.history.undone)
            }
        },
        setHistory: function(a) {
            var b = this.history = new lg(this.history.maxGeneration);
            b.done = wg(a.done.slice(0), null, !0), b.undone = wg(a.undone.slice(0), null, !0)
        },
        addLineClass: ed(function(a, b, c) {
            return te(this, a, "gutter" == b ? "gutter" : "class", function(a) {
                var d = "text" == b ? "textClass" : "background" == b ? "bgClass" : "gutter" == b ? "gutterClass" : "wrapClass";
                if (a[d]) {
                    if (sh(c).test(a[d])) return !1;
                    a[d] += " " + c
                } else a[d] = c;
                return !0
            })
        }),
        removeLineClass: ed(function(a, b, c) {
            return te(this, a, "gutter" == b ? "gutter" : "class", function(a) {
                var d = "text" == b ? "textClass" : "background" == b ? "bgClass" : "gutter" == b ? "gutterClass" : "wrapClass",
                    e = a[d];
                if (!e) return !1;
                if (null == c) a[d] = null;
                else {
                    var f = e.match(sh(c));
                    if (!f) return !1;
                    var g = f.index + f[0].length;
                    a[d] = e.slice(0, f.index) + (f.index && g != e.length ? " " : "") + e.slice(g) || null
                }
                return !0
            })
        }),
        addLineWidget: ed(function(a, b, c) {
            return zf(this, a, b, c)
        }),
        removeLineWidget: function(a) {
            a.clear()
        },
        markText: function(a, b, c) {
            return Se(this, Nb(this, a), Nb(this, b), c, "range")
        },
        setBookmark: function(a, b) {
            var c = {
                replacedWith: b && (null == b.nodeType ? b.widget : b),
                insertLeft: b && b.insertLeft,
                clearWhenEmpty: !1,
                shared: b && b.shared,
                handleMouseEvents: b && b.handleMouseEvents
            };
            return a = Nb(this, a), Se(this, a, a, c, "bookmark")
        },
        findMarksAt: function(a) {
            a = Nb(this, a);
            var b = [],
                c = dg(this, a.line).markedSpans;
            if (c)
                for (var d = 0; d < c.length; ++d) {
                    var e = c[d];
                    (null == e.from || e.from <= a.ch) && (null == e.to || e.to >= a.ch) && b.push(e.marker.parent || e.marker)
                }
            return b
        },
        findMarks: function(a, b, c) {
            a = Nb(this, a), b = Nb(this, b);
            var d = [],
                e = a.line;
            return this.iter(a.line, b.line + 1, function(f) {
                var g = f.markedSpans;
                if (g)
                    for (var h = 0; h < g.length; h++) {
                        var i = g[h];
                        e == a.line && a.ch > i.to || null == i.from && e != a.line || e == b.line && i.from > b.ch || c && !c(i.marker) || d.push(i.marker.parent || i.marker)
                    }++e
            }), d
        },
        getAllMarks: function() {
            var a = [];
            return this.iter(function(b) {
                var c = b.markedSpans;
                if (c)
                    for (var d = 0; d < c.length; ++d) null != c[d].from && a.push(c[d].marker)
            }), a
        },
        posFromIndex: function(a) {
            var b, c = this.first;
            return this.iter(function(d) {
                var e = d.text.length + 1;
                return e > a ? (b = a, !0) : (a -= e, ++c, void 0)
            }), Nb(this, ob(c, b))
        },
        indexFromPos: function(a) {
            a = Nb(this, a);
            var b = a.ch;
            return a.line < this.first || a.ch < 0 ? 0 : (this.iter(this.first, a.line, function(a) {
                b += a.text.length + 1
            }), b)
        },
        copy: function(a) {
            var b = new $f(fg(this, this.first, this.first + this.size), this.modeOption, this.first);
            return b.scrollTop = this.scrollTop, b.scrollLeft = this.scrollLeft, b.sel = this.sel, b.extend = !1, a && (b.history.undoDepth = this.history.undoDepth, b.setHistory(this.getHistory())), b
        },
        linkedDoc: function(a) {
            a || (a = {});
            var b = this.first,
                c = this.first + this.size;
            null != a.from && a.from > b && (b = a.from), null != a.to && a.to < c && (c = a.to);
            var d = new $f(fg(this, b, c), a.mode || this.modeOption, b);
            return a.sharedHist && (d.history = this.history), (this.linked || (this.linked = [])).push({
                doc: d,
                sharedHist: a.sharedHist
            }), d.linked = [{
                doc: this,
                isParent: !0,
                sharedHist: a.sharedHist
            }], We(d, Ve(this)), d
        },
        unlinkDoc: function(a) {
            if (a instanceof v && (a = a.doc), this.linked)
                for (var b = 0; b < this.linked.length; ++b) {
                    var c = this.linked[b];
                    if (c.doc == a) {
                        this.linked.splice(b, 1), a.unlinkDoc(this), Xe(Ve(this));
                        break
                    }
                }
            if (a.history == this.history) {
                var d = [a.id];
                bg(a, function(a) {
                    d.push(a.id)
                }, !0), a.history = new lg(null), a.history.done = wg(this.history.done, d), a.history.undone = wg(this.history.undone, d)
            }
        },
        iterLinkedDocs: function(a) {
            bg(this, a)
        },
        getMode: function() {
            return this.mode
        },
        getEditor: function() {
            return this.cm
        }
    }), $f.prototype.eachLine = $f.prototype.iter;
    var _f = "iter insert remove copy getEditor".split(" ");
    for (var ag in $f.prototype) $f.prototype.hasOwnProperty(ag) && ah(_f, ag) < 0 && (v.prototype[ag] = function(a) {
        return function() {
            return a.apply(this.doc, arguments)
        }
    }($f.prototype[ag]));
    Pg($f);
    var Ag = v.e_preventDefault = function(a) {
            a.preventDefault ? a.preventDefault() : a.returnValue = !1
        },
        Bg = v.e_stopPropagation = function(a) {
            a.stopPropagation ? a.stopPropagation() : a.cancelBubble = !0
        },
        Dg = v.e_stop = function(a) {
            Ag(a), Bg(a)
        },
        Gg = v.on = function(a, b, c) {
            if (a.addEventListener) a.addEventListener(b, c, !1);
            else if (a.attachEvent) a.attachEvent("on" + b, c);
            else {
                var d = a._handlers || (a._handlers = {}),
                    e = d[b] || (d[b] = []);
                e.push(c)
            }
        },
        Hg = v.off = function(a, b, c) {
            if (a.removeEventListener) a.removeEventListener(b, c, !1);
            else if (a.detachEvent) a.detachEvent("on" + b, c);
            else {
                var d = a._handlers && a._handlers[b];
                if (!d) return;
                for (var e = 0; e < d.length; ++e)
                    if (d[e] == c) {
                        d.splice(e, 1);
                        break
                    }
            }
        },
        Ig = v.signal = function(a, b) {
            var c = a._handlers && a._handlers[b];
            if (c)
                for (var d = Array.prototype.slice.call(arguments, 2), e = 0; e < c.length; ++e) c[e].apply(null, d)
        },
        Jg = null,
        Qg = 30,
        Rg = v.Pass = {
            toString: function() {
                return "CodeMirror.Pass"
            }
        },
        Sg = {
            scroll: !1
        },
        Tg = {
            origin: "*mouse"
        },
        Ug = {
            origin: "+move"
        };
    Vg.prototype.set = function(a, b) {
        clearTimeout(this.id), this.id = setTimeout(b, a)
    };
    var Wg = v.countColumn = function(a, b, c, d, e) {
            null == b && (b = a.search(/[^\s\u00a0]/), -1 == b && (b = a.length));
            for (var f = d || 0, g = e || 0;;) {
                var h = a.indexOf("	", f);
                if (0 > h || h >= b) return g + (b - f);
                g += h - f, g += c - g % c, f = h + 1
            }
        },
        Yg = [""],
        _g = function(a) {
            a.select()
        };
    m ? _g = function(a) {
        a.selectionStart = 0, a.selectionEnd = a.value.length
    } : d && (_g = function(a) {
        try {
            a.select()
        } catch (b) {}
    });
    var nh, gh = /[\u00df\u0587\u0590-\u05f4\u0600-\u06ff\u3040-\u309f\u30a0-\u30ff\u3400-\u4db5\u4e00-\u9fcc\uac00-\ud7af]/,
        hh = v.isWordChar = function(a) {
            return /\w/.test(a) || a > "\x80" && (a.toUpperCase() != a.toLowerCase() || gh.test(a))
        },
        kh = /[\u0300-\u036f\u0483-\u0489\u0591-\u05bd\u05bf\u05c1\u05c2\u05c4\u05c5\u05c7\u0610-\u061a\u064b-\u065e\u0670\u06d6-\u06dc\u06de-\u06e4\u06e7\u06e8\u06ea-\u06ed\u0711\u0730-\u074a\u07a6-\u07b0\u07eb-\u07f3\u0816-\u0819\u081b-\u0823\u0825-\u0827\u0829-\u082d\u0900-\u0902\u093c\u0941-\u0948\u094d\u0951-\u0955\u0962\u0963\u0981\u09bc\u09be\u09c1-\u09c4\u09cd\u09d7\u09e2\u09e3\u0a01\u0a02\u0a3c\u0a41\u0a42\u0a47\u0a48\u0a4b-\u0a4d\u0a51\u0a70\u0a71\u0a75\u0a81\u0a82\u0abc\u0ac1-\u0ac5\u0ac7\u0ac8\u0acd\u0ae2\u0ae3\u0b01\u0b3c\u0b3e\u0b3f\u0b41-\u0b44\u0b4d\u0b56\u0b57\u0b62\u0b63\u0b82\u0bbe\u0bc0\u0bcd\u0bd7\u0c3e-\u0c40\u0c46-\u0c48\u0c4a-\u0c4d\u0c55\u0c56\u0c62\u0c63\u0cbc\u0cbf\u0cc2\u0cc6\u0ccc\u0ccd\u0cd5\u0cd6\u0ce2\u0ce3\u0d3e\u0d41-\u0d44\u0d4d\u0d57\u0d62\u0d63\u0dca\u0dcf\u0dd2-\u0dd4\u0dd6\u0ddf\u0e31\u0e34-\u0e3a\u0e47-\u0e4e\u0eb1\u0eb4-\u0eb9\u0ebb\u0ebc\u0ec8-\u0ecd\u0f18\u0f19\u0f35\u0f37\u0f39\u0f71-\u0f7e\u0f80-\u0f84\u0f86\u0f87\u0f90-\u0f97\u0f99-\u0fbc\u0fc6\u102d-\u1030\u1032-\u1037\u1039\u103a\u103d\u103e\u1058\u1059\u105e-\u1060\u1071-\u1074\u1082\u1085\u1086\u108d\u109d\u135f\u1712-\u1714\u1732-\u1734\u1752\u1753\u1772\u1773\u17b7-\u17bd\u17c6\u17c9-\u17d3\u17dd\u180b-\u180d\u18a9\u1920-\u1922\u1927\u1928\u1932\u1939-\u193b\u1a17\u1a18\u1a56\u1a58-\u1a5e\u1a60\u1a62\u1a65-\u1a6c\u1a73-\u1a7c\u1a7f\u1b00-\u1b03\u1b34\u1b36-\u1b3a\u1b3c\u1b42\u1b6b-\u1b73\u1b80\u1b81\u1ba2-\u1ba5\u1ba8\u1ba9\u1c2c-\u1c33\u1c36\u1c37\u1cd0-\u1cd2\u1cd4-\u1ce0\u1ce2-\u1ce8\u1ced\u1dc0-\u1de6\u1dfd-\u1dff\u200c\u200d\u20d0-\u20f0\u2cef-\u2cf1\u2de0-\u2dff\u302a-\u302f\u3099\u309a\ua66f-\ua672\ua67c\ua67d\ua6f0\ua6f1\ua802\ua806\ua80b\ua825\ua826\ua8c4\ua8e0-\ua8f1\ua926-\ua92d\ua947-\ua951\ua980-\ua982\ua9b3\ua9b6-\ua9b9\ua9bc\uaa29-\uaa2e\uaa31\uaa32\uaa35\uaa36\uaa43\uaa4c\uaab0\uaab2-\uaab4\uaab7\uaab8\uaabe\uaabf\uaac1\uabe5\uabe8\uabed\udc00-\udfff\ufb1e\ufe00-\ufe0f\ufe20-\ufe26\uff9e\uff9f]/;
    nh = document.createRange ? function(a, b, c, d) {
        var e = document.createRange();
        return e.setEnd(d || a, c), e.setStart(a, b), e
    } : function(a, b, c) {
        var d = document.body.createTextRange();
        try {
            d.moveToElementText(a.parentNode)
        } catch (e) {
            return d
        }
        return d.collapse(!0), d.moveEnd("character", c), d.moveStart("character", b), d
    };
    var qh = v.contains = function(a, b) {
        if (3 == b.nodeType && (b = b.parentNode), a.contains) return a.contains(b);
        do
            if (11 == b.nodeType && (b = b.host), b == a) return !0; while (b = b.parentNode)
    };
    d && 11 > e && (rh = function() {
        try {
            return document.activeElement
        } catch (a) {
            return document.body
        }
    });
    var Bh, Dh, th = v.rmClass = function(a, b) {
            var c = a.className,
                d = sh(b).exec(c);
            if (d) {
                var e = c.slice(d.index + d[0].length);
                a.className = c.slice(0, d.index) + (e ? d[1] + e : "")
            }
        },
        uh = v.addClass = function(a, b) {
            var c = a.className;
            sh(b).test(c) || (a.className += (c ? " " : "") + b)
        },
        xh = !1,
        Ah = function() {
            if (d && 9 > e) return !1;
            var a = mh("div");
            return "draggable" in a || "dragDrop" in a
        }(),
        Fh = v.splitLines = 3 != "\n\nb".split(/\n/).length ? function(a) {
            for (var b = 0, c = [], d = a.length; d >= b;) {
                var e = a.indexOf("\n", b); - 1 == e && (e = a.length);
                var f = a.slice(b, "\r" == a.charAt(e - 1) ? e - 1 : e),
                    g = f.indexOf("\r"); - 1 != g ? (c.push(f.slice(0, g)), b += g + 1) : (c.push(f), b = e + 1)
            }
            return c
        } : function(a) {
            return a.split(/\r\n?|\n/)
        },
        Gh = window.getSelection ? function(a) {
            try {
                return a.selectionStart != a.selectionEnd
            } catch (b) {
                return !1
            }
        } : function(a) {
            try {
                var b = a.ownerDocument.selection.createRange()
            } catch (c) {}
            return b && b.parentElement() == a ? 0 != b.compareEndPoints("StartToEnd", b) : !1
        },
        Hh = function() {
            var a = mh("div");
            return "oncopy" in a ? !0 : (a.setAttribute("oncopy", "return;"), "function" == typeof a.oncopy)
        }(),
        Ih = null,
        Kh = {
            3: "Enter",
            8: "Backspace",
            9: "Tab",
            13: "Enter",
            16: "Shift",
            17: "Ctrl",
            18: "Alt",
            19: "Pause",
            20: "CapsLock",
            27: "Esc",
            32: "Space",
            33: "PageUp",
            34: "PageDown",
            35: "End",
            36: "Home",
            37: "Left",
            38: "Up",
            39: "Right",
            40: "Down",
            44: "PrintScrn",
            45: "Insert",
            46: "Delete",
            59: ";",
            61: "=",
            91: "Mod",
            92: "Mod",
            93: "Mod",
            107: "=",
            109: "-",
            127: "Delete",
            173: "-",
            186: ";",
            187: "=",
            188: ",",
            189: "-",
            190: ".",
            191: "/",
            192: "`",
            219: "[",
            220: "\\",
            221: "]",
            222: "'",
            63232: "Up",
            63233: "Down",
            63234: "Left",
            63235: "Right",
            63272: "Delete",
            63273: "Home",
            63275: "End",
            63276: "PageUp",
            63277: "PageDown",
            63302: "Insert"
        };
    v.keyNames = Kh,
        function() {
            for (var a = 0; 10 > a; a++) Kh[a + 48] = Kh[a + 96] = String(a);
            for (var a = 65; 90 >= a; a++) Kh[a] = String.fromCharCode(a);
            for (var a = 1; 12 >= a; a++) Kh[a + 111] = Kh[a + 63235] = "F" + a
        }();
    var Uh, Zh = function() {
        function c(c) {
            return 247 >= c ? a.charAt(c) : c >= 1424 && 1524 >= c ? "R" : c >= 1536 && 1773 >= c ? b.charAt(c - 1536) : c >= 1774 && 2220 >= c ? "r" : c >= 8192 && 8203 >= c ? "w" : 8204 == c ? "b" : "L"
        }

        function j(a, b, c) {
            this.level = a, this.from = b, this.to = c
        }
        var a = "bbbbbbbbbtstwsbbbbbbbbbbbbbbssstwNN%%%NNNNNN,N,N1111111111NNNNNNNLLLLLLLLLLLLLLLLLLLLLLLLLLNNNNNNLLLLLLLLLLLLLLLLLLLLLLLLLLNNNNbbbbbbsbbbbbbbbbbbbbbbbbbbbbbbbbb,N%%%%NNNNLNNNNN%%11NLNNN1LNNNNNLLLLLLLLLLLLLLLLLLLLLLLNLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLN",
            b = "rrrrrrrrrrrr,rNNmmmmmmrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrmmmmmmmmmmmmmmrrrrrrrnnnnnnnnnn%nnrrrmrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrmmmmmmmmmmmmmmmmmmmNmmmm",
            d = /[\u0590-\u05f4\u0600-\u06ff\u0700-\u08ac]/,
            e = /[stwN]/,
            f = /[LRr]/,
            g = /[Lb1n]/,
            h = /[1n]/,
            i = "L";
        return function(a) {
            if (!d.test(a)) return !1;
            for (var m, b = a.length, k = [], l = 0; b > l; ++l) k.push(m = c(a.charCodeAt(l)));
            for (var l = 0, n = i; b > l; ++l) {
                var m = k[l];
                "m" == m ? k[l] = n : n = m
            }
            for (var l = 0, o = i; b > l; ++l) {
                var m = k[l];
                "1" == m && "r" == o ? k[l] = "n" : f.test(m) && (o = m, "r" == m && (k[l] = "R"))
            }
            for (var l = 1, n = k[0]; b - 1 > l; ++l) {
                var m = k[l];
                "+" == m && "1" == n && "1" == k[l + 1] ? k[l] = "1" : "," != m || n != k[l + 1] || "1" != n && "n" != n || (k[l] = n), n = m
            }
            for (var l = 0; b > l; ++l) {
                var m = k[l];
                if ("," == m) k[l] = "N";
                else if ("%" == m) {
                    for (var p = l + 1; b > p && "%" == k[p]; ++p);
                    for (var q = l && "!" == k[l - 1] || b > p && "1" == k[p] ? "1" : "N", r = l; p > r; ++r) k[r] = q;
                    l = p - 1
                }
            }
            for (var l = 0, o = i; b > l; ++l) {
                var m = k[l];
                "L" == o && "1" == m ? k[l] = "L" : f.test(m) && (o = m)
            }
            for (var l = 0; b > l; ++l)
                if (e.test(k[l])) {
                    for (var p = l + 1; b > p && e.test(k[p]); ++p);
                    for (var s = "L" == (l ? k[l - 1] : i), t = "L" == (b > p ? k[p] : i), q = s || t ? "L" : "R", r = l; p > r; ++r) k[r] = q;
                    l = p - 1
                } for (var v, u = [], l = 0; b > l;)
                if (g.test(k[l])) {
                    var w = l;
                    for (++l; b > l && g.test(k[l]); ++l);
                    u.push(new j(0, w, l))
                } else {
                    var x = l,
                        y = u.length;
                    for (++l; b > l && "L" != k[l]; ++l);
                    for (var r = x; l > r;)
                        if (h.test(k[r])) {
                            r > x && u.splice(y, 0, new j(1, x, r));
                            var z = r;
                            for (++r; l > r && h.test(k[r]); ++r);
                            u.splice(y, 0, new j(2, z, r)), x = r
                        } else ++r;
                    l > x && u.splice(y, 0, new j(1, x, l))
                } return 1 == u[0].level && (v = a.match(/^\s+/)) && (u[0].from = v[0].length, u.unshift(new j(0, 0, v[0].length))), 1 == $g(u).level && (v = a.match(/\s+$/)) && ($g(u).to -= v[0].length, u.push(new j(0, b - v[0].length, b))), 2 == u[0].level && u.unshift(new j(1, u[0].to, u[0].to)), u[0].level != $g(u).level && u.push(new j(u[0].level, b, b)), u
        }
    }();
    return v.version = "5.3.1", v
}),
function(a) {
    "object" == typeof exports && "object" == typeof module ? a(require("../lib/codemirror")) : "function" == typeof define && define.amd ? define(["../lib/codemirror"], a) : a(CodeMirror)
}(function(a) {
    function e(a, b, e, g) {
        var h = a.getLineHandle(b.line),
            i = b.ch - 1,
            j = i >= 0 && d[h.text.charAt(i)] || d[h.text.charAt(++i)];
        if (!j) return null;
        var k = ">" == j.charAt(1) ? 1 : -1;
        if (e && k > 0 != (i == b.ch)) return null;
        var l = a.getTokenTypeAt(c(b.line, i + 1)),
            m = f(a, c(b.line, i + (k > 0 ? 1 : 0)), k, l || null, g);
        return null == m ? null : {
            from: c(b.line, i),
            to: m && m.pos,
            match: m && m.ch == j.charAt(0),
            forward: k > 0
        }
    }

    function f(a, b, e, f, g) {
        for (var h = g && g.maxScanLineLength || 1e4, i = g && g.maxScanLines || 1e3, j = [], k = g && g.bracketRegex ? g.bracketRegex : /[(){}[\]]/, l = e > 0 ? Math.min(b.line + i, a.lastLine() + 1) : Math.max(a.firstLine() - 1, b.line - i), m = b.line; m != l; m += e) {
            var n = a.getLine(m);
            if (n) {
                var o = e > 0 ? 0 : n.length - 1,
                    p = e > 0 ? n.length : -1;
                if (!(n.length > h))
                    for (m == b.line && (o = b.ch - (0 > e ? 1 : 0)); o != p; o += e) {
                        var q = n.charAt(o);
                        if (k.test(q) && (void 0 === f || a.getTokenTypeAt(c(m, o + 1)) == f)) {
                            var r = d[q];
                            if (">" == r.charAt(1) == e > 0) j.push(q);
                            else {
                                if (!j.length) return {
                                    pos: c(m, o),
                                    ch: q
                                };
                                j.pop()
                            }
                        }
                    }
            }
        }
        return m - e == (e > 0 ? a.lastLine() : a.firstLine()) ? !1 : null
    }

    function g(a, d, f) {
        for (var g = a.state.matchBrackets.maxHighlightLineLength || 1e3, h = [], i = a.listSelections(), j = 0; j < i.length; j++) {
            var k = i[j].empty() && e(a, i[j].head, !1, f);
            if (k && a.getLine(k.from.line).length <= g) {
                var l = k.match ? "CodeMirror-matchingbracket" : "CodeMirror-nonmatchingbracket";
                h.push(a.markText(k.from, c(k.from.line, k.from.ch + 1), {
                    className: l
                })), k.to && a.getLine(k.to.line).length <= g && h.push(a.markText(k.to, c(k.to.line, k.to.ch + 1), {
                    className: l
                }))
            }
        }
        if (h.length) {
            b && a.state.focused && a.focus();
            var m = function() {
                a.operation(function() {
                    for (var a = 0; a < h.length; a++) h[a].clear()
                })
            };
            if (!d) return m;
            setTimeout(m, 800)
        }
    }

    function i(a) {
        a.operation(function() {
            h && (h(), h = null), h = g(a, !1, a.state.matchBrackets)
        })
    }
    var b = /MSIE \d/.test(navigator.userAgent) && (null == document.documentMode || document.documentMode < 8),
        c = a.Pos,
        d = {
            "(": ")>",
            ")": "(<",
            "[": "]>",
            "]": "[<",
            "{": "}>",
            "}": "{<"
        },
        h = null;
    a.defineOption("matchBrackets", !1, function(b, c, d) {
        d && d != a.Init && b.off("cursorActivity", i), c && (b.state.matchBrackets = "object" == typeof c ? c : {}, b.on("cursorActivity", i))
    }), a.defineExtension("matchBrackets", function() {
        g(this, !0)
    }), a.defineExtension("findMatchingBracket", function(a, b, c) {
        return e(this, a, b, c)
    }), a.defineExtension("scanForBracket", function(a, b, c, d) {
        return f(this, a, b, c, d)
    })
}),
function(a) {
    "object" == typeof exports && "object" == typeof module ? a(require("../lib/codemirror"),require("../addon/search/searchcursor"), require("../addon/edit/matchbrackets")) : "function" == typeof define && define.amd ? define(["../lib/codemirror", "../addon/search/searchcursor", "../addon/edit/matchbrackets"], a) : a(CodeMirror)
}(function(a) {
    "use strict";

    function g(b, c, e) {
        if (0 > e && 0 == c.ch) return b.clipPos(d(c.line - 1));
        var f = b.getLine(c.line);
        if (e > 0 && c.ch >= f.length) return b.clipPos(d(c.line + 1, 0));
        for (var h, g = "start", i = c.ch, j = 0 > e ? 0 : f.length, k = 0; i != j; i += e, k++) {
            var l = f.charAt(0 > e ? i - 1 : i),
                m = "_" != l && a.isWordChar(l) ? "w" : "o";
            if ("w" == m && l.toUpperCase() == l && (m = "W"), "start" == g) "o" != m && (g = "in", h = m);
            else if ("in" == g && h != m) {
                if ("w" == h && "W" == m && 0 > e && i--, "W" == h && "w" == m && e > 0) {
                    h = "w";
                    continue
                }
                break
            }
        }
        return d(c.line, i)
    }

    function h(a, b) {
        a.extendSelectionsBy(function(c) {
            return a.display.shift || a.doc.extend || c.empty() ? g(a.doc, c.head, b) : 0 > b ? c.from() : c.to()
        })
    }

    function i(a, b) {
        a.operation(function() {
            for (var c = a.listSelections().length, e = [], f = -1, g = 0; c > g; g++) {
                var h = a.listSelections()[g].head;
                if (!(h.line <= f)) {
                    var i = d(h.line + (b ? 0 : 1), 0);
                    a.replaceRange("\n", i, null, "+insertLine"), a.indentLine(i.line, null, !0), e.push({
                        head: i,
                        anchor: i
                    }), f = h.line + 1
                }
            }
            a.setSelections(e)
        })
    }

    function j(b, c) {
        for (var e = c.ch, f = e, g = b.getLine(c.line); e && a.isWordChar(g.charAt(e - 1));) --e;
        for (; f < g.length && a.isWordChar(g.charAt(f));) ++f;
        return {
            from: d(c.line, e),
            to: d(c.line, f),
            word: g.slice(e, f)
        }
    }

    function l(a) {
        var b = a.getCursor(),
            c = a.scanForBracket(b, -1);
        if (c)
            for (;;) {
                var e = a.scanForBracket(b, 1);
                if (!e) return;
                if (e.ch == k.charAt(k.indexOf(c.ch) + 1)) return a.setSelection(d(c.pos.line, c.pos.ch + 1), e.pos, !1), !0;
                b = d(e.pos.line, e.pos.ch + 1)
            }
    }

    function n(a, b) {
        for (var f, c = a.listSelections(), e = [], g = 0; g < c.length; g++) {
            var h = c[g];
            if (!h.empty()) {
                for (var i = h.from().line, j = h.to().line; g < c.length - 1 && c[g + 1].from().line == j;) j = h[++g].to().line;
                e.push(i, j)
            }
        }
        e.length ? f = !0 : e.push(a.firstLine(), a.lastLine()), a.operation(function() {
            for (var c = [], g = 0; g < e.length; g += 2) {
                var h = e[g],
                    i = e[g + 1],
                    j = d(h, 0),
                    k = d(i),
                    l = a.getRange(j, k, !1);
                b ? l.sort() : l.sort(function(a, b) {
                    var c = a.toUpperCase(),
                        d = b.toUpperCase();
                    return c != d && (a = c, b = d), b > a ? -1 : a == b ? 0 : 1
                }), a.replaceRange(l, j, k), f && c.push({
                    anchor: j,
                    head: k
                })
            }
            f && a.setSelections(c, 0)
        })
    }

    function p(b, c) {
        b.operation(function() {
            for (var d = b.listSelections(), e = [], f = [], g = 0; g < d.length; g++) {
                var h = d[g];
                h.empty() ? (e.push(g), f.push("")) : f.push(c(b.getRange(h.from(), h.to())))
            }
            b.replaceSelections(f, "around", "case");
            for (var i, g = e.length - 1; g >= 0; g--) {
                var h = d[e[g]];
                if (!(i && a.cmpPos(h.head, i) > 0)) {
                    var k = j(b, h.head);
                    i = k.from, b.replaceRange(c(k.word), k.from, k.to)
                }
            }
        })
    }

    function q(b) {
        var c = b.getCursor("from"),
            d = b.getCursor("to");
        if (0 == a.cmpPos(c, d)) {
            var e = j(b, c);
            if (!e.word) return;
            c = e.from, d = e.to
        }
        return {
            from: c,
            to: d,
            query: b.getRange(c, d),
            word: e
        }
    }

    function r(a, b) {
        var c = q(a);
        if (c) {
            var e = c.query,
                f = a.getSearchCursor(e, b ? c.to : c.from);
            (b ? f.findNext() : f.findPrevious()) ? a.setSelection(f.from(), f.to()): (f = a.getSearchCursor(e, b ? d(a.firstLine(), 0) : a.clipPos(d(a.lastLine()))), (b ? f.findNext() : f.findPrevious()) ? a.setSelection(f.from(), f.to()) : c.word && a.setSelection(c.from, c.to))
        }
    }
    var b = a.keyMap.sublime = {
            fallthrough: "default"
        },
        c = a.commands,
        d = a.Pos,
        e = a.keyMap["default"] == a.keyMap.macDefault,
        f = e ? "Cmd-" : "Ctrl-";
    c[b["Alt-Left"] = "goSubwordLeft"] = function(a) {
        h(a, -1)
    }, c[b["Alt-Right"] = "goSubwordRight"] = function(a) {
        h(a, 1)
    }, c[b[f + "Up"] = "scrollLineUp"] = function(a) {
        var b = a.getScrollInfo();
        if (!a.somethingSelected()) {
            var c = a.lineAtHeight(b.top + b.clientHeight, "local");
            a.getCursor().line >= c && a.execCommand("goLineUp")
        }
        a.scrollTo(null, b.top - a.defaultTextHeight())
    }, c[b[f + "Down"] = "scrollLineDown"] = function(a) {
        var b = a.getScrollInfo();
        if (!a.somethingSelected()) {
            var c = a.lineAtHeight(b.top, "local") + 1;
            a.getCursor().line <= c && a.execCommand("goLineDown")
        }
        a.scrollTo(null, b.top + a.defaultTextHeight())
    }, c[b["Shift-" + f + "L"] = "splitSelectionByLine"] = function(a) {
        for (var b = a.listSelections(), c = [], e = 0; e < b.length; e++)
            for (var f = b[e].from(), g = b[e].to(), h = f.line; h <= g.line; ++h) g.line > f.line && h == g.line && 0 == g.ch || c.push({
                anchor: h == f.line ? f : d(h, 0),
                head: h == g.line ? g : d(h)
            });
        a.setSelections(c, 0)
    }, b["Shift-Tab"] = "indentLess", c[b.Esc = "singleSelectionTop"] = function(a) {
        var b = a.listSelections()[0];
        a.setSelection(b.anchor, b.head, {
            scroll: !1
        })
    }, c[b[f + "L"] = "selectLine"] = function(a) {
        for (var b = a.listSelections(), c = [], e = 0; e < b.length; e++) {
            var f = b[e];
            c.push({
                anchor: d(f.from().line, 0),
                head: d(f.to().line + 1, 0)
            })
        }
        a.setSelections(c)
    }, b["Shift-" + f + "K"] = "deleteLine", c[b[f + "Enter"] = "insertLineAfter"] = function(a) {
        i(a, !1)
    }, c[b["Shift-" + f + "Enter"] = "insertLineBefore"] = function(a) {
        i(a, !0)
    }, c[b[f + "D"] = "selectNextOccurrence"] = function(b) {
        var c = b.getCursor("from"),
            e = b.getCursor("to"),
            f = b.state.sublimeFindFullWord == b.doc.sel;
        if (0 == a.cmpPos(c, e)) {
            var g = j(b, c);
            if (!g.word) return;
            b.setSelection(g.from, g.to), f = !0
        } else {
            var h = b.getRange(c, e),
                i = f ? new RegExp("\\b" + h + "\\b") : h,
                k = b.getSearchCursor(i, e);
            k.findNext() ? b.addSelection(k.from(), k.to()) : (k = b.getSearchCursor(i, d(b.firstLine(), 0)), k.findNext() && b.addSelection(k.from(), k.to()))
        }
        f && (b.state.sublimeFindFullWord = b.doc.sel)
    };
    var k = "(){}[]";
    c[b["Shift-" + f + "Space"] = "selectScope"] = function(a) {
        l(a) || a.execCommand("selectAll")
    }, c[b["Shift-" + f + "M"] = "selectBetweenBrackets"] = function(b) {
        return l(b) ? void 0 : a.Pass
    }, c[b[f + "M"] = "goToBracket"] = function(b) {
        b.extendSelectionsBy(function(c) {
            var e = b.scanForBracket(c.head, 1);
            if (e && 0 != a.cmpPos(e.pos, c.head)) return e.pos;
            var f = b.scanForBracket(c.head, -1);
            return f && d(f.pos.line, f.pos.ch + 1) || c.head
        })
    };
    var m = e ? "Cmd-Ctrl-" : "Shift-Ctrl-";
    c[b[m + "Up"] = "swapLineUp"] = function(a) {
        for (var b = a.listSelections(), c = [], e = a.firstLine() - 1, f = [], g = 0; g < b.length; g++) {
            var h = b[g],
                i = h.from().line - 1,
                j = h.to().line;
            f.push({
                anchor: d(h.anchor.line - 1, h.anchor.ch),
                head: d(h.head.line - 1, h.head.ch)
            }), 0 != h.to().ch || h.empty() || --j, i > e ? c.push(i, j) : c.length && (c[c.length - 1] = j), e = j
        }
        a.operation(function() {
            for (var b = 0; b < c.length; b += 2) {
                var e = c[b],
                    g = c[b + 1],
                    h = a.getLine(e);
                a.replaceRange("", d(e, 0), d(e + 1, 0), "+swapLine"), g > a.lastLine() ? a.replaceRange("\n" + h, d(a.lastLine()), null, "+swapLine") : a.replaceRange(h + "\n", d(g, 0), null, "+swapLine")
            }
            a.setSelections(f), a.scrollIntoView()
        })
    }, c[b[m + "Down"] = "swapLineDown"] = function(a) {
        for (var b = a.listSelections(), c = [], e = a.lastLine() + 1, f = b.length - 1; f >= 0; f--) {
            var g = b[f],
                h = g.to().line + 1,
                i = g.from().line;
            0 != g.to().ch || g.empty() || h--, e > h ? c.push(h, i) : c.length && (c[c.length - 1] = i), e = i
        }
        a.operation(function() {
            for (var b = c.length - 2; b >= 0; b -= 2) {
                var e = c[b],
                    f = c[b + 1],
                    g = a.getLine(e);
                e == a.lastLine() ? a.replaceRange("", d(e - 1), d(e), "+swapLine") : a.replaceRange("", d(e, 0), d(e + 1, 0), "+swapLine"), a.replaceRange(g + "\n", d(f, 0), null, "+swapLine")
            }
            a.scrollIntoView()
        })
    }, b[f + "/"] = "toggleComment", c[b[f + "J"] = "joinLines"] = function(a) {
        for (var b = a.listSelections(), c = [], e = 0; e < b.length; e++) {
            for (var f = b[e], g = f.from(), h = g.line, i = f.to().line; e < b.length - 1 && b[e + 1].from().line == i;) i = b[++e].to().line;
            c.push({
                start: h,
                end: i,
                anchor: !f.empty() && g
            })
        }
        a.operation(function() {
            for (var b = 0, e = [], f = 0; f < c.length; f++) {
                for (var i, g = c[f], h = g.anchor && d(g.anchor.line - b, g.anchor.ch), j = g.start; j <= g.end; j++) {
                    var k = j - b;
                    j == g.end && (i = d(k, a.getLine(k).length + 1)), k < a.lastLine() && (a.replaceRange(" ", d(k), d(k + 1, /^\s*/.exec(a.getLine(k + 1))[0].length)), ++b)
                }
                e.push({
                    anchor: h || i,
                    head: i
                })
            }
            a.setSelections(e, 0)
        })
    }, c[b["Shift-" + f + "D"] = "duplicateLine"] = function(a) {
        a.operation(function() {
            for (var b = a.listSelections().length, c = 0; b > c; c++) {
                var e = a.listSelections()[c];
                e.empty() ? a.replaceRange(a.getLine(e.head.line) + "\n", d(e.head.line, 0)) : a.replaceRange(a.getRange(e.from(), e.to()), e.from())
            }
            a.scrollIntoView()
        })
    }, b[f + "T"] = "transposeChars", c[b.F9 = "sortLines"] = function(a) {
        n(a, !0)
    }, c[b[f + "F9"] = "sortLinesInsensitive"] = function(a) {
        n(a, !1)
    }, c[b.F2 = "nextBookmark"] = function(a) {
        var b = a.state.sublimeBookmarks;
        if (b)
            for (; b.length;) {
                var c = b.shift(),
                    d = c.find();
                if (d) return b.push(c), a.setSelection(d.from, d.to)
            }
    }, c[b["Shift-F2"] = "prevBookmark"] = function(a) {
        var b = a.state.sublimeBookmarks;
        if (b)
            for (; b.length;) {
                b.unshift(b.pop());
                var c = b[b.length - 1].find();
                if (c) return a.setSelection(c.from, c.to);
                b.pop()
            }
    }, c[b[f + "F2"] = "toggleBookmark"] = function(a) {
        for (var b = a.listSelections(), c = a.state.sublimeBookmarks || (a.state.sublimeBookmarks = []), d = 0; d < b.length; d++) {
            for (var e = b[d].from(), f = b[d].to(), g = a.findMarks(e, f), h = 0; h < g.length; h++)
                if (g[h].sublimeBookmark) {
                    g[h].clear();
                    for (var i = 0; i < c.length; i++) c[i] == g[h] && c.splice(i--, 1);
                    break
                } h == g.length && c.push(a.markText(e, f, {
                sublimeBookmark: !0,
                clearWhenEmpty: !1
            }))
        }
    }, c[b["Shift-" + f + "F2"] = "clearBookmarks"] = function(a) {
        var b = a.state.sublimeBookmarks;
        if (b)
            for (var c = 0; c < b.length; c++) b[c].clear();
        b.length = 0
    }, c[b["Alt-F2"] = "selectBookmarks"] = function(a) {
        var b = a.state.sublimeBookmarks,
            c = [];
        if (b)
            for (var d = 0; d < b.length; d++) {
                var e = b[d].find();
                e ? c.push({
                    anchor: e.from,
                    head: e.to
                }) : b.splice(d--, 0)
            }
        c.length && a.setSelections(c, 0)
    }, b["Alt-Q"] = "wrapLines";
    var o = f + "K ";
    b[o + f + "Backspace"] = "delLineLeft", c[b.Backspace = "smartBackspace"] = function(b) {
        if (b.somethingSelected()) return a.Pass;
        var c = b.getCursor(),
            d = b.getRange({
                line: c.line,
                ch: 0
            }, c),
            e = a.countColumn(d, null, b.getOption("tabSize"));
        return d && !/\S/.test(d) && 0 == e % b.getOption("indentUnit") ? b.indentSelection("subtract") : a.Pass
    }, c[b[o + f + "K"] = "delLineRight"] = function(a) {
        a.operation(function() {
            for (var b = a.listSelections(), c = b.length - 1; c >= 0; c--) a.replaceRange("", b[c].anchor, d(b[c].to().line), "+delete");
            a.scrollIntoView()
        })
    }, c[b[o + f + "U"] = "upcaseAtCursor"] = function(a) {
        p(a, function(a) {
            return a.toUpperCase()
        })
    }, c[b[o + f + "L"] = "downcaseAtCursor"] = function(a) {
        p(a, function(a) {
            return a.toLowerCase()
        })
    }, c[b[o + f + "Space"] = "setSublimeMark"] = function(a) {
        a.state.sublimeMark && a.state.sublimeMark.clear(), a.state.sublimeMark = a.setBookmark(a.getCursor())
    }, c[b[o + f + "A"] = "selectToSublimeMark"] = function(a) {
        var b = a.state.sublimeMark && a.state.sublimeMark.find();
        b && a.setSelection(a.getCursor(), b)
    }, c[b[o + f + "W"] = "deleteToSublimeMark"] = function(b) {
        var c = b.state.sublimeMark && b.state.sublimeMark.find();
        if (c) {
            var d = b.getCursor(),
                e = c;
            if (a.cmpPos(d, e) > 0) {
                var f = e;
                e = d, d = f
            }
            b.state.sublimeKilled = b.getRange(d, e), b.replaceRange("", d, e)
        }
    }, c[b[o + f + "X"] = "swapWithSublimeMark"] = function(a) {
        var b = a.state.sublimeMark && a.state.sublimeMark.find();
        b && (a.state.sublimeMark.clear(), a.state.sublimeMark = a.setBookmark(a.getCursor()), a.setCursor(b))
    }, c[b[o + f + "Y"] = "sublimeYank"] = function(a) {
        null != a.state.sublimeKilled && a.replaceSelection(a.state.sublimeKilled, null, "paste")
    }, b[o + f + "G"] = "clearBookmarks", c[b[o + f + "C"] = "showInCenter"] = function(a) {
        var b = a.cursorCoords(null, "local");
        a.scrollTo(null, (b.top + b.bottom) / 2 - a.getScrollInfo().clientHeight / 2)
    }, c[b["Shift-Alt-Up"] = "selectLinesUpward"] = function(a) {
        a.operation(function() {
            for (var b = a.listSelections(), c = 0; c < b.length; c++) {
                var e = b[c];
                e.head.line > a.firstLine() && a.addSelection(d(e.head.line - 1, e.head.ch))
            }
        })
    }, c[b["Shift-Alt-Down"] = "selectLinesDownward"] = function(a) {
        a.operation(function() {
            for (var b = a.listSelections(), c = 0; c < b.length; c++) {
                var e = b[c];
                e.head.line < a.lastLine() && a.addSelection(d(e.head.line + 1, e.head.ch))
            }
        })
    }, c[b[f + "F3"] = "findUnder"] = function(a) {
        r(a, !0)
    }, c[b["Shift-" + f + "F3"] = "findUnderPrevious"] = function(a) {
        r(a, !1)
    }, c[b["Alt-F3"] = "findAllUnder"] = function(a) {
        var b = q(a);
        if (b) {
            for (var c = a.getSearchCursor(b.query), d = [], e = -1; c.findNext();) d.push({
                anchor: c.from(),
                head: c.to()
            }), c.from().line <= b.from.line && c.from().ch <= b.from.ch && e++;
            a.setSelections(d, e)
        }
    }, b["Shift-" + f + "["] = "fold", b["Shift-" + f + "]"] = "unfold", b[o + f + "0"] = b[o + f + "j"] = "unfoldAll", b[f + "I"] = "findIncremental", b["Shift-" + f + "I"] = "findIncrementalReverse", b[f + "H"] = "replace", b.F3 = "findNext", b["Shift-F3"] = "findPrev", a.normalizeKeyMap(b)
});