(function(a) {
  if (typeof exports == "object" && typeof module == "object") {
    a(require("../../lib/codemirror"))
  } else {
    if (typeof define == "function" && define.amd) {
      define(["../../lib/codemirror"], a)
    } else {
      a(CodeMirror)
    }
  }
})(function(r) {
  r.defineMode("css", function(Y, J) {
    var D = J.inline;
    if (!J.propertyKeywords) {
      J = r.resolveMode("text/css")
    }
    var Q = Y.indentUnit,
      A = J.tokenHooks,
      y = J.documentTypes || {},
      X = J.mediaTypes || {},
      L = J.mediaFeatures || {},
      P = J.mediaValueKeywords || {},
      I = J.propertyKeywords || {},
      B = J.nonStandardPropertyKeywords || {},
      E = J.fontProperties || {},
      W = J.counterDescriptors || {},
      O = J.colorKeywords || {},
      S = J.valueKeywords || {},
      M = J.allowNested,
      U = J.supportsAtComponent === true;
    var C, N;

    function Z(ac, ad) {
      C = ad;
      return ac
    }

    function ab(af, ae) {
      var ad = af.next();
      if (A[ad]) {
        var ac = A[ad](af, ae);
        if (ac !== false) {
          return ac
        }
      }
      if (ad == "@") {
        af.eatWhile(/[\w\\\-]/);
        return Z("def", af.current())
      } else {
        if (ad == "=" || (ad == "~" || ad == "|") && af.eat("=")) {
          return Z(null, "compare")
        } else {
          if (ad == '"' || ad == "'") {
            ae.tokenize = K(ad);
            return ae.tokenize(af, ae)
          } else {
            if (ad == "#") {
              af.eatWhile(/[\w\\\-]/);
              return Z("atom", "hash")
            } else {
              if (ad == "!") {
                af.match(/^\s*\w*/);
                return Z("keyword", "important")
              } else {
                if (/\d/.test(ad) || ad == "." && af.eat(/\d/)) {
                  af.eatWhile(/[\w.%]/);
                  return Z("number", "unit")
                } else {
                  if (ad === "-") {
                    if (/[\d.]/.test(af.peek())) {
                      af.eatWhile(/[\w.%]/);
                      return Z("number", "unit")
                    } else {
                      if (af.match(/^-[\w\\\-]+/)) {
                        af.eatWhile(/[\w\\\-]/);
                        if (af.match(/^\s*:/, false)) {
                          return Z("variable-2", "variable-definition")
                        }
                        return Z("variable-2", "variable")
                      } else {
                        if (af.match(/^\w+-/)) {
                          return Z("meta", "meta")
                        }
                      }
                    }
                  } else {
                    if (/[,+>*\/]/.test(ad)) {
                      return Z(null, "select-op")
                    } else {
                      if (ad == "." && af.match(/^-?[_a-z][_a-z0-9-]*/i)) {
                        return Z("qualifier", "qualifier")
                      } else {
                        if (/[:;{}\[\]\(\)]/.test(ad)) {
                          return Z(null, ad)
                        } else {
                          if ((ad == "u" && af.match(/rl(-prefix)?\(/)) || (ad == "d" && af.match("omain(")) || (ad == "r" && af.match("egexp("))) {
                            af.backUp(1);
                            ae.tokenize = aa;
                            return Z("property", "word")
                          } else {
                            if (/[\w\\\-]/.test(ad)) {
                              af.eatWhile(/[\w\\\-]/);
                              return Z("property", "word")
                            } else {
                              return Z(null, null)
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }

    function K(ac) {
      return function(ag, ae) {
        var af = false,
          ad;
        while ((ad = ag.next()) != null) {
          if (ad == ac && !af) {
            if (ac == ")") {
              ag.backUp(1)
            }
            break
          }
          af = !af && ad == "\\"
        }
        if (ad == ac || !af && ac != ")") {
          ae.tokenize = null
        }
        return Z("string", "string")
      }
    }

    function aa(ad, ac) {
      ad.next();
      if (!ad.match(/\s*[\"\')]/, false)) {
        ac.tokenize = K(")")
      } else {
        ac.tokenize = null
      }
      return Z(null, "(")
    }

    function R(ad, ac, ae) {
      this.type = ad;
      this.indent = ac;
      this.prev = ae
    }

    function G(ae, af, ad, ac) {
      ae.context = new R(ad, af.indentation() + (ac === false ? 0 : Q), ae.context);
      return ad
    }

    function T(ac) {
      if (ac.context.prev) {
        ac.context = ac.context.prev
      }
      return ac.context.type
    }

    function z(ac, ae, ad) {
      return F[ad.context.type](ac, ae, ad)
    }

    function V(ad, af, ae, ag) {
      for (var ac = ag || 1; ac > 0; ac--) {
        ae.context = ae.context.prev
      }
      return z(ad, af, ae)
    }

    function H(ad) {
      var ac = ad.current().toLowerCase();
      if (S.hasOwnProperty(ac)) {
        N = "atom"
      } else {
        if (O.hasOwnProperty(ac)) {
          N = "keyword"
        } else {
          N = "variable"
        }
      }
    }
    var F = {};
    F.top = function(ac, ae, ad) {
      if (ac == "{") {
        return G(ad, ae, "block")
      } else {
        if (ac == "}" && ad.context.prev) {
          return T(ad)
        } else {
          if (U && /@component/.test(ac)) {
            return G(ad, ae, "atComponentBlock")
          } else {
            if (/^@(-moz-)?document$/.test(ac)) {
              return G(ad, ae, "documentTypes")
            } else {
              if (/^@(media|supports|(-moz-)?document|import)$/.test(ac)) {
                return G(ad, ae, "atBlock")
              } else {
                if (/^@(font-face|counter-style)/.test(ac)) {
                  ad.stateArg = ac;
                  return "restricted_atBlock_before"
                } else {
                  if (/^@(-(moz|ms|o|webkit)-)?keyframes$/.test(ac)) {
                    return "keyframes"
                  } else {
                    if (ac && ac.charAt(0) == "@") {
                      return G(ad, ae, "at")
                    } else {
                      if (ac == "hash") {
                        N = "builtin"
                      } else {
                        if (ac == "word") {
                          N = "tag"
                        } else {
                          if (ac == "variable-definition") {
                            return "maybeprop"
                          } else {
                            if (ac == "interpolation") {
                              return G(ad, ae, "interpolation")
                            } else {
                              if (ac == ":") {
                                return "pseudo"
                              } else {
                                if (M && ac == "(") {
                                  return G(ad, ae, "parens")
                                }
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
      return ad.context.type
    };
    F.block = function(ac, af, ad) {
      if (ac == "word") {
        var ae = af.current().toLowerCase();
        if (I.hasOwnProperty(ae)) {
          N = "property";
          return "maybeprop"
        } else {
          if (B.hasOwnProperty(ae)) {
            N = "string-2";
            return "maybeprop"
          } else {
            if (M) {
              N = af.match(/^\s*:(?:\s|$)/, false) ? "property" : "tag";
              return "block"
            } else {
              N += " error";
              return "maybeprop"
            }
          }
        }
      } else {
        if (ac == "meta") {
          return "block"
        } else {
          if (!M && (ac == "hash" || ac == "qualifier")) {
            N = "error";
            return "block"
          } else {
            return F.top(ac, af, ad)
          }
        }
      }
    };
    F.maybeprop = function(ac, ae, ad) {
      if (ac == ":") {
        return G(ad, ae, "prop")
      }
      return z(ac, ae, ad)
    };
    F.prop = function(ac, ae, ad) {
      if (ac == ";") {
        return T(ad)
      }
      if (ac == "{" && M) {
        return G(ad, ae, "propBlock")
      }
      if (ac == "}" || ac == "{") {
        return V(ac, ae, ad)
      }
      if (ac == "(") {
        return G(ad, ae, "parens")
      }
      if (ac == "hash" && !/^#([0-9a-fA-f]{3,4}|[0-9a-fA-f]{6}|[0-9a-fA-f]{8})$/.test(ae.current())) {
        N += " error"
      } else {
        if (ac == "word") {
          H(ae)
        } else {
          if (ac == "interpolation") {
            return G(ad, ae, "interpolation")
          }
        }
      }
      return "prop"
    };
    F.propBlock = function(ad, ac, ae) {
      if (ad == "}") {
        return T(ae)
      }
      if (ad == "word") {
        N = "property";
        return "maybeprop"
      }
      return ae.context.type
    };
    F.parens = function(ac, ae, ad) {
      if (ac == "{" || ac == "}") {
        return V(ac, ae, ad)
      }
      if (ac == ")") {
        return T(ad)
      }
      if (ac == "(") {
        return G(ad, ae, "parens")
      }
      if (ac == "interpolation") {
        return G(ad, ae, "interpolation")
      }
      if (ac == "word") {
        H(ae)
      }
      return "parens"
    };
    F.pseudo = function(ac, ae, ad) {
      if (ac == "word") {
        N = "variable-3";
        return ad.context.type
      }
      return z(ac, ae, ad)
    };
    F.documentTypes = function(ac, ae, ad) {
      if (ac == "word" && y.hasOwnProperty(ae.current())) {
        N = "tag";
        return ad.context.type
      } else {
        return F.atBlock(ac, ae, ad)
      }
    };
    F.atBlock = function(ac, af, ad) {
      if (ac == "(") {
        return G(ad, af, "atBlock_parens")
      }
      if (ac == "}" || ac == ";") {
        return V(ac, af, ad)
      }
      if (ac == "{") {
        return T(ad) && G(ad, af, M ? "block" : "top")
      }
      if (ac == "interpolation") {
        return G(ad, af, "interpolation")
      }
      if (ac == "word") {
        var ae = af.current().toLowerCase();
        if (ae == "only" || ae == "not" || ae == "and" || ae == "or") {
          N = "keyword"
        } else {
          if (X.hasOwnProperty(ae)) {
            N = "attribute"
          } else {
            if (L.hasOwnProperty(ae)) {
              N = "property"
            } else {
              if (P.hasOwnProperty(ae)) {
                N = "keyword"
              } else {
                if (I.hasOwnProperty(ae)) {
                  N = "property"
                } else {
                  if (B.hasOwnProperty(ae)) {
                    N = "string-2"
                  } else {
                    if (S.hasOwnProperty(ae)) {
                      N = "atom"
                    } else {
                      if (O.hasOwnProperty(ae)) {
                        N = "keyword"
                      } else {
                        N = "error"
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
      return ad.context.type
    };
    F.atComponentBlock = function(ac, ae, ad) {
      if (ac == "}") {
        return V(ac, ae, ad)
      }
      if (ac == "{") {
        return T(ad) && G(ad, ae, M ? "block" : "top", false)
      }
      if (ac == "word") {
        N = "error"
      }
      return ad.context.type
    };
    F.atBlock_parens = function(ac, ae, ad) {
      if (ac == ")") {
        return T(ad)
      }
      if (ac == "{" || ac == "}") {
        return V(ac, ae, ad, 2)
      }
      return F.atBlock(ac, ae, ad)
    };
    F.restricted_atBlock_before = function(ac, ae, ad) {
      if (ac == "{") {
        return G(ad, ae, "restricted_atBlock")
      }
      if (ac == "word" && ad.stateArg == "@counter-style") {
        N = "variable";
        return "restricted_atBlock_before"
      }
      return z(ac, ae, ad)
    };
    F.restricted_atBlock = function(ac, ae, ad) {
      if (ac == "}") {
        ad.stateArg = null;
        return T(ad)
      }
      if (ac == "word") {
        if ((ad.stateArg == "@font-face" && !E.hasOwnProperty(ae.current().toLowerCase())) || (ad.stateArg == "@counter-style" && !W.hasOwnProperty(ae.current().toLowerCase()))) {
          N = "error"
        } else {
          N = "property"
        }
        return "maybeprop"
      }
      return "restricted_atBlock"
    };
    F.keyframes = function(ac, ae, ad) {
      if (ac == "word") {
        N = "variable";
        return "keyframes"
      }
      if (ac == "{") {
        return G(ad, ae, "top")
      }
      return z(ac, ae, ad)
    };
    F.at = function(ac, ae, ad) {
      if (ac == ";") {
        return T(ad)
      }
      if (ac == "{" || ac == "}") {
        return V(ac, ae, ad)
      }
      if (ac == "word") {
        N = "tag"
      } else {
        if (ac == "hash") {
          N = "builtin"
        }
      }
      return "at"
    };
    F.interpolation = function(ac, ae, ad) {
      if (ac == "}") {
        return T(ad)
      }
      if (ac == "{" || ac == ";") {
        return V(ac, ae, ad)
      }
      if (ac == "word") {
        N = "variable"
      } else {
        if (ac != "variable" && ac != "(" && ac != ")") {
          N = "error"
        }
      }
      return "interpolation"
    };
    return {
      startState: function(ac) {
        return {
          tokenize: null,
          state: D ? "block" : "top",
          stateArg: null,
          context: new R(D ? "block" : "top", ac || 0, null)
        }
      },
      token: function(ae, ad) {
        if (!ad.tokenize && ae.eatSpace()) {
          return null
        }
        var ac = (ad.tokenize || ab)(ae, ad);
        if (ac && typeof ac == "object") {
          C = ac[1];
          ac = ac[0]
        }
        N = ac;
        ad.state = F[ad.state](C, ae, ad);
        return N
      },
      indent: function(ag, ae) {
        var ad = ag.context,
          af = ae && ae.charAt(0);
        var ac = ad.indent;
        if (ad.type == "prop" && (af == "}" || af == ")")) {
          ad = ad.prev
        }
        if (ad.prev) {
          if (af == "}" && (ad.type == "block" || ad.type == "top" || ad.type == "interpolation" || ad.type == "restricted_atBlock")) {
            ad = ad.prev;
            ac = ad.indent
          } else {
            if (af == ")" && (ad.type == "parens" || ad.type == "atBlock_parens") || af == "{" && (ad.type == "at" || ad.type == "atBlock")) {
              ac = Math.max(0, ad.indent - Q);
              ad = ad.prev
            }
          }
        }
        return ac
      },
      electricChars: "}",
      blockCommentStart: "/*",
      blockCommentEnd: "*/",
      fold: "brace"
    }
  });

  function g(A) {
    var z = {};
    for (var y = 0; y < A.length; ++y) {
      z[A[y]] = true
    }
    return z
  }
  var k = ["domain", "regexp", "url", "url-prefix"],
    a = g(k);
  var b = ["all", "aural", "braille", "handheld", "print", "projection", "screen", "tty", "tv", "embossed"],
    v = g(b);
  var x = ["width", "min-width", "max-width", "height", "min-height", "max-height", "device-width", "min-device-width", "max-device-width", "device-height", "min-device-height", "max-device-height", "aspect-ratio", "min-aspect-ratio", "max-aspect-ratio", "device-aspect-ratio", "min-device-aspect-ratio", "max-device-aspect-ratio", "color", "min-color", "max-color", "color-index", "min-color-index", "max-color-index", "monochrome", "min-monochrome", "max-monochrome", "resolution", "min-resolution", "max-resolution", "scan", "grid", "orientation", "device-pixel-ratio", "min-device-pixel-ratio", "max-device-pixel-ratio", "pointer", "any-pointer", "hover", "any-hover"],
    i = g(x);
  var l = ["landscape", "portrait", "none", "coarse", "fine", "on-demand", "hover", "interlace", "progressive"],
    p = g(l);
  var d = ["align-content", "align-items", "align-self", "alignment-adjust", "alignment-baseline", "anchor-point", "animation", "animation-delay", "animation-direction", "animation-duration", "animation-fill-mode", "animation-iteration-count", "animation-name", "animation-play-state", "animation-timing-function", "appearance", "azimuth", "backface-visibility", "background", "background-attachment", "background-blend-mode", "background-clip", "background-color", "background-image", "background-origin", "background-position", "background-repeat", "background-size", "baseline-shift", "binding", "bleed", "bookmark-label", "bookmark-level", "bookmark-state", "bookmark-target", "border", "border-bottom", "border-bottom-color", "border-bottom-left-radius", "border-bottom-right-radius", "border-bottom-style", "border-bottom-width", "border-collapse", "border-color", "border-image", "border-image-outset", "border-image-repeat", "border-image-slice", "border-image-source", "border-image-width", "border-left", "border-left-color", "border-left-style", "border-left-width", "border-radius", "border-right", "border-right-color", "border-right-style", "border-right-width", "border-spacing", "border-style", "border-top", "border-top-color", "border-top-left-radius", "border-top-right-radius", "border-top-style", "border-top-width", "border-width", "bottom", "box-decoration-break", "box-shadow", "box-sizing", "break-after", "break-before", "break-inside", "caption-side", "clear", "clip", "color", "color-profile", "column-count", "column-fill", "column-gap", "column-rule", "column-rule-color", "column-rule-style", "column-rule-width", "column-span", "column-width", "columns", "content", "counter-increment", "counter-reset", "crop", "cue", "cue-after", "cue-before", "cursor", "direction", "display", "dominant-baseline", "drop-initial-after-adjust", "drop-initial-after-align", "drop-initial-before-adjust", "drop-initial-before-align", "drop-initial-size", "drop-initial-value", "elevation", "empty-cells", "fit", "fit-position", "flex", "flex-basis", "flex-direction", "flex-flow", "flex-grow", "flex-shrink", "flex-wrap", "float", "float-offset", "flow-from", "flow-into", "font", "font-feature-settings", "font-family", "font-kerning", "font-language-override", "font-size", "font-size-adjust", "font-stretch", "font-style", "font-synthesis", "font-variant", "font-variant-alternates", "font-variant-caps", "font-variant-east-asian", "font-variant-ligatures", "font-variant-numeric", "font-variant-position", "font-weight", "grid", "grid-area", "grid-auto-columns", "grid-auto-flow", "grid-auto-rows", "grid-column", "grid-column-end", "grid-column-gap", "grid-column-start", "grid-gap", "grid-row", "grid-row-end", "grid-row-gap", "grid-row-start", "grid-template", "grid-template-areas", "grid-template-columns", "grid-template-rows", "hanging-punctuation", "height", "hyphens", "icon", "image-orientation", "image-rendering", "image-resolution", "inline-box-align", "justify-content", "left", "letter-spacing", "line-break", "line-height", "line-stacking", "line-stacking-ruby", "line-stacking-shift", "line-stacking-strategy", "list-style", "list-style-image", "list-style-position", "list-style-type", "margin", "margin-bottom", "margin-left", "margin-right", "margin-top", "marker-offset", "marks", "marquee-direction", "marquee-loop", "marquee-play-count", "marquee-speed", "marquee-style", "max-height", "max-width", "min-height", "min-width", "move-to", "nav-down", "nav-index", "nav-left", "nav-right", "nav-up", "object-fit", "object-position", "opacity", "order", "orphans", "outline", "outline-color", "outline-offset", "outline-style", "outline-width", "overflow", "overflow-style", "overflow-wrap", "overflow-x", "overflow-y", "padding", "padding-bottom", "padding-left", "padding-right", "padding-top", "page", "page-break-after", "page-break-before", "page-break-inside", "page-policy", "pause", "pause-after", "pause-before", "perspective", "perspective-origin", "pitch", "pitch-range", "play-during", "position", "presentation-level", "punctuation-trim", "quotes", "region-break-after", "region-break-before", "region-break-inside", "region-fragment", "rendering-intent", "resize", "rest", "rest-after", "rest-before", "richness", "right", "rotation", "rotation-point", "ruby-align", "ruby-overhang", "ruby-position", "ruby-span", "shape-image-threshold", "shape-inside", "shape-margin", "shape-outside", "size", "speak", "speak-as", "speak-header", "speak-numeral", "speak-punctuation", "speech-rate", "stress", "string-set", "tab-size", "table-layout", "target", "target-name", "target-new", "target-position", "text-align", "text-align-last", "text-decoration", "text-decoration-color", "text-decoration-line", "text-decoration-skip", "text-decoration-style", "text-emphasis", "text-emphasis-color", "text-emphasis-position", "text-emphasis-style", "text-height", "text-indent", "text-justify", "text-outline", "text-overflow", "text-shadow", "text-size-adjust", "text-space-collapse", "text-transform", "text-underline-position", "text-wrap", "top", "transform", "transform-origin", "transform-style", "transition", "transition-delay", "transition-duration", "transition-property", "transition-timing-function", "unicode-bidi", "vertical-align", "visibility", "voice-balance", "voice-duration", "voice-family", "voice-pitch", "voice-range", "voice-rate", "voice-stress", "voice-volume", "volume", "white-space", "widows", "width", "word-break", "word-spacing", "word-wrap", "z-index", "clip-path", "clip-rule", "mask", "enable-background", "filter", "flood-color", "flood-opacity", "lighting-color", "stop-color", "stop-opacity", "pointer-events", "color-interpolation", "color-interpolation-filters", "color-rendering", "fill", "fill-opacity", "fill-rule", "image-rendering", "marker", "marker-end", "marker-mid", "marker-start", "shape-rendering", "stroke", "stroke-dasharray", "stroke-dashoffset", "stroke-linecap", "stroke-linejoin", "stroke-miterlimit", "stroke-opacity", "stroke-width", "text-rendering", "baseline-shift", "dominant-baseline", "glyph-orientation-horizontal", "glyph-orientation-vertical", "text-anchor", "writing-mode"],
    h = g(d);
  var n = ["scrollbar-arrow-color", "scrollbar-base-color", "scrollbar-dark-shadow-color", "scrollbar-face-color", "scrollbar-highlight-color", "scrollbar-shadow-color", "scrollbar-3d-light-color", "scrollbar-track-color", "shape-inside", "searchfield-cancel-button", "searchfield-decoration", "searchfield-results-button", "searchfield-results-decoration", "zoom"],
    e = g(n);
  var t = ["font-family", "src", "unicode-range", "font-variant", "font-feature-settings", "font-stretch", "font-weight", "font-style"],
    f = g(t);
  var q = ["additive-symbols", "fallback", "negative", "pad", "prefix", "range", "speak-as", "suffix", "symbols", "system"],
    u = g(q);
  var c = ["aliceblue", "antiquewhite", "aqua", "aquamarine", "azure", "beige", "bisque", "black", "blanchedalmond", "blue", "blueviolet", "brown", "burlywood", "cadetblue", "chartreuse", "chocolate", "coral", "cornflowerblue", "cornsilk", "crimson", "cyan", "darkblue", "darkcyan", "darkgoldenrod", "darkgray", "darkgreen", "darkkhaki", "darkmagenta", "darkolivegreen", "darkorange", "darkorchid", "darkred", "darksalmon", "darkseagreen", "darkslateblue", "darkslategray", "darkturquoise", "darkviolet", "deeppink", "deepskyblue", "dimgray", "dodgerblue", "firebrick", "floralwhite", "forestgreen", "fuchsia", "gainsboro", "ghostwhite", "gold", "goldenrod", "gray", "grey", "green", "greenyellow", "honeydew", "hotpink", "indianred", "indigo", "ivory", "khaki", "lavender", "lavenderblush", "lawngreen", "lemonchiffon", "lightblue", "lightcoral", "lightcyan", "lightgoldenrodyellow", "lightgray", "lightgreen", "lightpink", "lightsalmon", "lightseagreen", "lightskyblue", "lightslategray", "lightsteelblue", "lightyellow", "lime", "limegreen", "linen", "magenta", "maroon", "mediumaquamarine", "mediumblue", "mediumorchid", "mediumpurple", "mediumseagreen", "mediumslateblue", "mediumspringgreen", "mediumturquoise", "mediumvioletred", "midnightblue", "mintcream", "mistyrose", "moccasin", "navajowhite", "navy", "oldlace", "olive", "olivedrab", "orange", "orangered", "orchid", "palegoldenrod", "palegreen", "paleturquoise", "palevioletred", "papayawhip", "peachpuff", "peru", "pink", "plum", "powderblue", "purple", "rebeccapurple", "red", "rosybrown", "royalblue", "saddlebrown", "salmon", "sandybrown", "seagreen", "seashell", "sienna", "silver", "skyblue", "slateblue", "slategray", "snow", "springgreen", "steelblue", "tan", "teal", "thistle", "tomato", "turquoise", "violet", "wheat", "white", "whitesmoke", "yellow", "yellowgreen"],
    m = g(c);
  var j = ["above", "absolute", "activeborder", "additive", "activecaption", "afar", "after-white-space", "ahead", "alias", "all", "all-scroll", "alphabetic", "alternate", "always", "amharic", "amharic-abegede", "antialiased", "appworkspace", "arabic-indic", "armenian", "asterisks", "attr", "auto", "avoid", "avoid-column", "avoid-page", "avoid-region", "background", "backwards", "baseline", "below", "bidi-override", "binary", "bengali", "blink", "block", "block-axis", "bold", "bolder", "border", "border-box", "both", "bottom", "break", "break-all", "break-word", "bullets", "button", "button-bevel", "buttonface", "buttonhighlight", "buttonshadow", "buttontext", "calc", "cambodian", "capitalize", "caps-lock-indicator", "caption", "captiontext", "caret", "cell", "center", "checkbox", "circle", "cjk-decimal", "cjk-earthly-branch", "cjk-heavenly-stem", "cjk-ideographic", "clear", "clip", "close-quote", "col-resize", "collapse", "color", "color-burn", "color-dodge", "column", "column-reverse", "compact", "condensed", "contain", "content", "content-box", "context-menu", "continuous", "copy", "counter", "counters", "cover", "crop", "cross", "crosshair", "currentcolor", "cursive", "cyclic", "darken", "dashed", "decimal", "decimal-leading-zero", "default", "default-button", "dense", "destination-atop", "destination-in", "destination-out", "destination-over", "devanagari", "difference", "disc", "discard", "disclosure-closed", "disclosure-open", "document", "dot-dash", "dot-dot-dash", "dotted", "double", "down", "e-resize", "ease", "ease-in", "ease-in-out", "ease-out", "element", "ellipse", "ellipsis", "embed", "end", "ethiopic", "ethiopic-abegede", "ethiopic-abegede-am-et", "ethiopic-abegede-gez", "ethiopic-abegede-ti-er", "ethiopic-abegede-ti-et", "ethiopic-halehame-aa-er", "ethiopic-halehame-aa-et", "ethiopic-halehame-am-et", "ethiopic-halehame-gez", "ethiopic-halehame-om-et", "ethiopic-halehame-sid-et", "ethiopic-halehame-so-et", "ethiopic-halehame-ti-er", "ethiopic-halehame-ti-et", "ethiopic-halehame-tig", "ethiopic-numeric", "ew-resize", "exclusion", "expanded", "extends", "extra-condensed", "extra-expanded", "fantasy", "fast", "fill", "fixed", "flat", "flex", "flex-end", "flex-start", "footnotes", "forwards", "from", "geometricPrecision", "georgian", "graytext", "grid", "groove", "gujarati", "gurmukhi", "hand", "hangul", "hangul-consonant", "hard-light", "hebrew", "help", "hidden", "hide", "higher", "highlight", "highlighttext", "hiragana", "hiragana-iroha", "horizontal", "hsl", "hsla", "hue", "icon", "ignore", "inactiveborder", "inactivecaption", "inactivecaptiontext", "infinite", "infobackground", "infotext", "inherit", "initial", "inline", "inline-axis", "inline-block", "inline-flex", "inline-grid", "inline-table", "inset", "inside", "intrinsic", "invert", "italic", "japanese-formal", "japanese-informal", "justify", "kannada", "katakana", "katakana-iroha", "keep-all", "khmer", "korean-hangul-formal", "korean-hanja-formal", "korean-hanja-informal", "landscape", "lao", "large", "larger", "left", "level", "lighter", "lighten", "line-through", "linear", "linear-gradient", "lines", "list-item", "listbox", "listitem", "local", "logical", "loud", "lower", "lower-alpha", "lower-armenian", "lower-greek", "lower-hexadecimal", "lower-latin", "lower-norwegian", "lower-roman", "lowercase", "ltr", "luminosity", "malayalam", "match", "matrix", "matrix3d", "media-controls-background", "media-current-time-display", "media-fullscreen-button", "media-mute-button", "media-play-button", "media-return-to-realtime-button", "media-rewind-button", "media-seek-back-button", "media-seek-forward-button", "media-slider", "media-sliderthumb", "media-time-remaining-display", "media-volume-slider", "media-volume-slider-container", "media-volume-sliderthumb", "medium", "menu", "menulist", "menulist-button", "menulist-text", "menulist-textfield", "menutext", "message-box", "middle", "min-intrinsic", "mix", "mongolian", "monospace", "move", "multiple", "multiply", "myanmar", "n-resize", "narrower", "ne-resize", "nesw-resize", "no-close-quote", "no-drop", "no-open-quote", "no-repeat", "none", "normal", "not-allowed", "nowrap", "ns-resize", "numbers", "numeric", "nw-resize", "nwse-resize", "oblique", "octal", "open-quote", "optimizeLegibility", "optimizeSpeed", "oriya", "oromo", "outset", "outside", "outside-shape", "overlay", "overline", "padding", "padding-box", "painted", "page", "paused", "persian", "perspective", "plus-darker", "plus-lighter", "pointer", "polygon", "portrait", "pre", "pre-line", "pre-wrap", "preserve-3d", "progress", "push-button", "radial-gradient", "radio", "read-only", "read-write", "read-write-plaintext-only", "rectangle", "region", "relative", "repeat", "repeating-linear-gradient", "repeating-radial-gradient", "repeat-x", "repeat-y", "reset", "reverse", "rgb", "rgba", "ridge", "right", "rotate", "rotate3d", "rotateX", "rotateY", "rotateZ", "round", "row", "row-resize", "row-reverse", "rtl", "run-in", "running", "s-resize", "sans-serif", "saturation", "scale", "scale3d", "scaleX", "scaleY", "scaleZ", "screen", "scroll", "scrollbar", "se-resize", "searchfield", "searchfield-cancel-button", "searchfield-decoration", "searchfield-results-button", "searchfield-results-decoration", "semi-condensed", "semi-expanded", "separate", "serif", "show", "sidama", "simp-chinese-formal", "simp-chinese-informal", "single", "skew", "skewX", "skewY", "skip-white-space", "slide", "slider-horizontal", "slider-vertical", "sliderthumb-horizontal", "sliderthumb-vertical", "slow", "small", "small-caps", "small-caption", "smaller", "soft-light", "solid", "somali", "source-atop", "source-in", "source-out", "source-over", "space", "space-around", "space-between", "spell-out", "square", "square-button", "start", "static", "status-bar", "stretch", "stroke", "sub", "subpixel-antialiased", "super", "sw-resize", "symbolic", "symbols", "table", "table-caption", "table-cell", "table-column", "table-column-group", "table-footer-group", "table-header-group", "table-row", "table-row-group", "tamil", "telugu", "text", "text-bottom", "text-top", "textarea", "textfield", "thai", "thick", "thin", "threeddarkshadow", "threedface", "threedhighlight", "threedlightshadow", "threedshadow", "tibetan", "tigre", "tigrinya-er", "tigrinya-er-abegede", "tigrinya-et", "tigrinya-et-abegede", "to", "top", "trad-chinese-formal", "trad-chinese-informal", "translate", "translate3d", "translateX", "translateY", "translateZ", "transparent", "ultra-condensed", "ultra-expanded", "underline", "up", "upper-alpha", "upper-armenian", "upper-greek", "upper-hexadecimal", "upper-latin", "upper-norwegian", "upper-roman", "uppercase", "urdu", "url", "var", "vertical", "vertical-text", "visible", "visibleFill", "visiblePainted", "visibleStroke", "visual", "w-resize", "wait", "wave", "wider", "window", "windowframe", "windowtext", "words", "wrap", "wrap-reverse", "x-large", "x-small", "xor", "xx-large", "xx-small"],
    s = g(j);
  var o = k.concat(b).concat(x).concat(l).concat(d).concat(n).concat(c).concat(j);
  r.registerHelper("hintWords", "css", o);

  function w(B, A) {
    var y = false,
      z;
    while ((z = B.next()) != null) {
      if (y && z == "/") {
        A.tokenize = null;
        break
      }
      y = (z == "*")
    }
    return ["comment", "comment"]
  }
  r.defineMIME("text/css", {
    documentTypes: a,
    mediaTypes: v,
    mediaFeatures: i,
    mediaValueKeywords: p,
    propertyKeywords: h,
    nonStandardPropertyKeywords: e,
    fontProperties: f,
    counterDescriptors: u,
    colorKeywords: m,
    valueKeywords: s,
    tokenHooks: {
      "/": function(z, y) {
        if (!z.eat("*")) {
          return false
        }
        y.tokenize = w;
        return w(z, y)
      }
    },
    name: "css"
  });
  r.defineMIME("text/x-scss", {
    mediaTypes: v,
    mediaFeatures: i,
    mediaValueKeywords: p,
    propertyKeywords: h,
    nonStandardPropertyKeywords: e,
    colorKeywords: m,
    valueKeywords: s,
    fontProperties: f,
    allowNested: true,
    tokenHooks: {
      "/": function(z, y) {
        if (z.eat("/")) {
          z.skipToEnd();
          return ["comment", "comment"]
        } else {
          if (z.eat("*")) {
            y.tokenize = w;
            return w(z, y)
          } else {
            return ["operator", "operator"]
          }
        }
      },
      ":": function(y) {
        if (y.match(/\s*\{/)) {
          return [null, "{"]
        }
        return false
      },
      "$": function(y) {
        y.match(/^[\w-]+/);
        if (y.match(/^\s*:/, false)) {
          return ["variable-2", "variable-definition"]
        }
        return ["variable-2", "variable"]
      },
      "#": function(y) {
        if (!y.eat("{")) {
          return false
        }
        return [null, "interpolation"]
      }
    },
    name: "css",
    helperType: "scss"
  });
  r.defineMIME("text/x-less", {
    mediaTypes: v,
    mediaFeatures: i,
    mediaValueKeywords: p,
    propertyKeywords: h,
    nonStandardPropertyKeywords: e,
    colorKeywords: m,
    valueKeywords: s,
    fontProperties: f,
    allowNested: true,
    tokenHooks: {
      "/": function(z, y) {
        if (z.eat("/")) {
          z.skipToEnd();
          return ["comment", "comment"]
        } else {
          if (z.eat("*")) {
            y.tokenize = w;
            return w(z, y)
          } else {
            return ["operator", "operator"]
          }
        }
      },
      "@": function(y) {
        if (y.eat("{")) {
          return [null, "interpolation"]
        }
        if (y.match(/^(charset|document|font-face|import|(-(moz|ms|o|webkit)-)?keyframes|media|namespace|page|supports)\b/, false)) {
          return false
        }
        y.eatWhile(/[\w\\\-]/);
        if (y.match(/^\s*:/, false)) {
          return ["variable-2", "variable-definition"]
        }
        return ["variable-2", "variable"]
      },
      "&": function() {
        return ["atom", "atom"]
      }
    },
    name: "css",
    helperType: "less"
  });
  r.defineMIME("text/x-gss", {
    documentTypes: a,
    mediaTypes: v,
    mediaFeatures: i,
    propertyKeywords: h,
    nonStandardPropertyKeywords: e,
    fontProperties: f,
    counterDescriptors: u,
    colorKeywords: m,
    valueKeywords: s,
    supportsAtComponent: true,
    tokenHooks: {
      "/": function(z, y) {
        if (!z.eat("*")) {
          return false
        }
        y.tokenize = w;
        return w(z, y)
      }
    },
    name: "css",
    helperType: "gss"
  })
});
