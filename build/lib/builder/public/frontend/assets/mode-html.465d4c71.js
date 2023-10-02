function T(y, _) {
  for (var c = 0; c < _.length; c++) {
    const p = _[c];
    if (typeof p != "string" && !Array.isArray(p)) {
      for (const v in p)
        if (v !== "default" && !(v in y)) {
          const h = Object.getOwnPropertyDescriptor(p, v);
          h &&
            Object.defineProperty(
              y,
              v,
              h.get ? h : { enumerable: !0, get: () => p[v] }
            );
        }
    }
  }
  return Object.freeze(
    Object.defineProperty(y, Symbol.toStringTag, { value: "Module" })
  );
}
var C = { exports: {} };
(function (y, _) {
  ace.define(
    "ace/mode/jsdoc_comment_highlight_rules",
    [
      "require",
      "exports",
      "module",
      "ace/lib/oop",
      "ace/mode/text_highlight_rules",
    ],
    function (c, p, v) {
      var h = c("../lib/oop"),
        f = c("./text_highlight_rules").TextHighlightRules,
        g = function () {
          (this.$rules = {
            start: [
              {
                token: ["comment.doc.tag", "comment.doc.text", "lparen.doc"],
                regex:
                  "(@(?:param|member|typedef|property|namespace|var|const|callback))(\\s*)({)",
                push: [
                  {
                    token: "lparen.doc",
                    regex: "{",
                    push: [
                      { include: "doc-syntax" },
                      { token: "rparen.doc", regex: "}|(?=$)", next: "pop" },
                    ],
                  },
                  {
                    token: [
                      "rparen.doc",
                      "text.doc",
                      "variable.parameter.doc",
                      "lparen.doc",
                      "variable.parameter.doc",
                      "rparen.doc",
                    ],
                    regex:
                      /(})(\s*)(?:([\w=:\/\.]+)|(?:(\[)([\w=:\/\.]+)(\])))/,
                    next: "pop",
                  },
                  { token: "rparen.doc", regex: "}|(?=$)", next: "pop" },
                  { include: "doc-syntax" },
                  { defaultToken: "text.doc" },
                ],
              },
              {
                token: ["comment.doc.tag", "text.doc", "lparen.doc"],
                regex:
                  "(@(?:returns?|yields|type|this|suppress|public|protected|private|package|modifies|implements|external|exception|throws|enum|define|extends))(\\s*)({)",
                push: [
                  {
                    token: "lparen.doc",
                    regex: "{",
                    push: [
                      { include: "doc-syntax" },
                      { token: "rparen.doc", regex: "}|(?=$)", next: "pop" },
                    ],
                  },
                  { token: "rparen.doc", regex: "}|(?=$)", next: "pop" },
                  { include: "doc-syntax" },
                  { defaultToken: "text.doc" },
                ],
              },
              {
                token: [
                  "comment.doc.tag",
                  "text.doc",
                  "variable.parameter.doc",
                ],
                regex:
                  '(@(?:alias|memberof|instance|module|name|lends|namespace|external|this|template|requires|param|implements|function|extends|typedef|mixes|constructor|var|memberof\\!|event|listens|exports|class|constructs|interface|emits|fires|throws|const|callback|borrows|augments))(\\s+)(\\w[\\w#.:/~"\\-]*)?',
              },
              {
                token: [
                  "comment.doc.tag",
                  "text.doc",
                  "variable.parameter.doc",
                ],
                regex: "(@method)(\\s+)(\\w[\\w.\\(\\)]*)",
              },
              {
                token: "comment.doc.tag",
                regex: "@access\\s+(?:private|public|protected)",
              },
              {
                token: "comment.doc.tag",
                regex:
                  "@kind\\s+(?:class|constant|event|external|file|function|member|mixin|module|namespace|typedef)",
              },
              { token: "comment.doc.tag", regex: "@\\w+(?=\\s|$)" },
              g.getTagRule(),
              { defaultToken: "comment.doc", caseInsensitive: !0 },
            ],
            "doc-syntax": [
              { token: "operator.doc", regex: /[|:]/ },
              { token: "paren.doc", regex: /[\[\]]/ },
            ],
          }),
            this.normalizeRules();
        };
      h.inherits(g, f),
        (g.getTagRule = function (o) {
          return {
            token: "comment.doc.tag.storage.type",
            regex: "\\b(?:TODO|FIXME|XXX|HACK)\\b",
          };
        }),
        (g.getStartRule = function (o) {
          return { token: "comment.doc", regex: "\\/\\*(?=\\*)", next: o };
        }),
        (g.getEndRule = function (o) {
          return { token: "comment.doc", regex: "\\*\\/", next: o };
        }),
        (p.JsDocCommentHighlightRules = g);
    }
  ),
    ace.define(
      "ace/mode/javascript_highlight_rules",
      [
        "require",
        "exports",
        "module",
        "ace/lib/oop",
        "ace/mode/jsdoc_comment_highlight_rules",
        "ace/mode/text_highlight_rules",
      ],
      function (c, p, v) {
        var h = c("../lib/oop"),
          f = c("./jsdoc_comment_highlight_rules").JsDocCommentHighlightRules,
          g = c("./text_highlight_rules").TextHighlightRules,
          o = "[a-zA-Z\\$_\xA1-\uFFFF][a-zA-Z\\d\\$_\xA1-\uFFFF]*",
          l = function (s) {
            var i = this.createKeywordMapper(
                {
                  "variable.language":
                    "Array|Boolean|Date|Function|Iterator|Number|Object|RegExp|String|Proxy|Symbol|Namespace|QName|XML|XMLList|ArrayBuffer|Float32Array|Float64Array|Int16Array|Int32Array|Int8Array|Uint16Array|Uint32Array|Uint8Array|Uint8ClampedArray|Error|EvalError|InternalError|RangeError|ReferenceError|StopIteration|SyntaxError|TypeError|URIError|decodeURI|decodeURIComponent|encodeURI|encodeURIComponent|eval|isFinite|isNaN|parseFloat|parseInt|JSON|Math|this|arguments|prototype|window|document",
                  keyword:
                    "const|yield|import|get|set|async|await|break|case|catch|continue|default|delete|do|else|finally|for|function|if|in|of|instanceof|new|return|switch|throw|try|typeof|let|var|while|with|debugger|__parent__|__count__|escape|unescape|with|__proto__|class|enum|extends|super|export|implements|private|public|interface|package|protected|static|constructor",
                  "storage.type": "const|let|var|function",
                  "constant.language": "null|Infinity|NaN|undefined",
                  "support.function": "alert",
                  "constant.language.boolean": "true|false",
                },
                "identifier"
              ),
              t =
                "case|do|else|finally|in|instanceof|return|throw|try|typeof|yield|void",
              n =
                "\\\\(?:x[0-9a-fA-F]{2}|u[0-9a-fA-F]{4}|u{[0-9a-fA-F]{1,6}}|[0-2][0-7]{0,2}|3[0-7][0-7]?|[4-7][0-7]?|.)";
            (this.$rules = {
              no_regex: [
                f.getStartRule("doc-start"),
                r("no_regex"),
                { token: "string", regex: "'(?=.)", next: "qstring" },
                { token: "string", regex: '"(?=.)', next: "qqstring" },
                {
                  token: "constant.numeric",
                  regex: /0(?:[xX][0-9a-fA-F]+|[oO][0-7]+|[bB][01]+)\b/,
                },
                {
                  token: "constant.numeric",
                  regex: /(?:\d\d*(?:\.\d*)?|\.\d+)(?:[eE][+-]?\d+\b)?/,
                },
                {
                  token: [
                    "storage.type",
                    "punctuation.operator",
                    "support.function",
                    "punctuation.operator",
                    "entity.name.function",
                    "text",
                    "keyword.operator",
                  ],
                  regex: "(" + o + ")(\\.)(prototype)(\\.)(" + o + ")(\\s*)(=)",
                  next: "function_arguments",
                },
                {
                  token: [
                    "storage.type",
                    "punctuation.operator",
                    "entity.name.function",
                    "text",
                    "keyword.operator",
                    "text",
                    "storage.type",
                    "text",
                    "paren.lparen",
                  ],
                  regex:
                    "(" +
                    o +
                    ")(\\.)(" +
                    o +
                    ")(\\s*)(=)(\\s*)(function\\*?)(\\s*)(\\()",
                  next: "function_arguments",
                },
                {
                  token: [
                    "entity.name.function",
                    "text",
                    "keyword.operator",
                    "text",
                    "storage.type",
                    "text",
                    "paren.lparen",
                  ],
                  regex: "(" + o + ")(\\s*)(=)(\\s*)(function\\*?)(\\s*)(\\()",
                  next: "function_arguments",
                },
                {
                  token: [
                    "storage.type",
                    "punctuation.operator",
                    "entity.name.function",
                    "text",
                    "keyword.operator",
                    "text",
                    "storage.type",
                    "text",
                    "entity.name.function",
                    "text",
                    "paren.lparen",
                  ],
                  regex:
                    "(" +
                    o +
                    ")(\\.)(" +
                    o +
                    ")(\\s*)(=)(\\s*)(function\\*?)(\\s+)(\\w+)(\\s*)(\\()",
                  next: "function_arguments",
                },
                {
                  token: [
                    "storage.type",
                    "text",
                    "entity.name.function",
                    "text",
                    "paren.lparen",
                  ],
                  regex: "(function\\*?)(\\s+)(" + o + ")(\\s*)(\\()",
                  next: "function_arguments",
                },
                {
                  token: [
                    "entity.name.function",
                    "text",
                    "punctuation.operator",
                    "text",
                    "storage.type",
                    "text",
                    "paren.lparen",
                  ],
                  regex: "(" + o + ")(\\s*)(:)(\\s*)(function\\*?)(\\s*)(\\()",
                  next: "function_arguments",
                },
                {
                  token: [
                    "text",
                    "text",
                    "storage.type",
                    "text",
                    "paren.lparen",
                  ],
                  regex: "(:)(\\s*)(function\\*?)(\\s*)(\\()",
                  next: "function_arguments",
                },
                { token: "keyword", regex: `from(?=\\s*('|"))` },
                { token: "keyword", regex: "(?:" + t + ")\\b", next: "start" },
                { token: "support.constant", regex: /that\b/ },
                {
                  token: [
                    "storage.type",
                    "punctuation.operator",
                    "support.function.firebug",
                  ],
                  regex:
                    /(console)(\.)(warn|info|log|error|time|trace|timeEnd|assert)\b/,
                },
                { token: i, regex: o },
                {
                  token: "punctuation.operator",
                  regex: /[.](?![.])/,
                  next: "property",
                },
                { token: "storage.type", regex: /=>/, next: "start" },
                {
                  token: "keyword.operator",
                  regex:
                    /--|\+\+|\.{3}|===|==|=|!=|!==|<+=?|>+=?|!|&&|\|\||\?:|[!$%&*+\-~\/^]=?/,
                  next: "start",
                },
                {
                  token: "punctuation.operator",
                  regex: /[?:,;.]/,
                  next: "start",
                },
                { token: "paren.lparen", regex: /[\[({]/, next: "start" },
                { token: "paren.rparen", regex: /[\])}]/ },
                { token: "comment", regex: /^#!.*$/ },
              ],
              property: [
                { token: "text", regex: "\\s+" },
                {
                  token: [
                    "storage.type",
                    "punctuation.operator",
                    "entity.name.function",
                    "text",
                    "keyword.operator",
                    "text",
                    "storage.type",
                    "text",
                    "entity.name.function",
                    "text",
                    "paren.lparen",
                  ],
                  regex:
                    "(" +
                    o +
                    ")(\\.)(" +
                    o +
                    ")(\\s*)(=)(\\s*)(function\\*?)(?:(\\s+)(\\w+))?(\\s*)(\\()",
                  next: "function_arguments",
                },
                { token: "punctuation.operator", regex: /[.](?![.])/ },
                {
                  token: "support.function",
                  regex:
                    /(s(?:h(?:ift|ow(?:Mod(?:elessDialog|alDialog)|Help))|croll(?:X|By(?:Pages|Lines)?|Y|To)?|t(?:op|rike)|i(?:n|zeToContent|debar|gnText)|ort|u(?:p|b(?:str(?:ing)?)?)|pli(?:ce|t)|e(?:nd|t(?:Re(?:sizable|questHeader)|M(?:i(?:nutes|lliseconds)|onth)|Seconds|Ho(?:tKeys|urs)|Year|Cursor|Time(?:out)?|Interval|ZOptions|Date|UTC(?:M(?:i(?:nutes|lliseconds)|onth)|Seconds|Hours|Date|FullYear)|FullYear|Active)|arch)|qrt|lice|avePreferences|mall)|h(?:ome|andleEvent)|navigate|c(?:har(?:CodeAt|At)|o(?:s|n(?:cat|textual|firm)|mpile)|eil|lear(?:Timeout|Interval)?|a(?:ptureEvents|ll)|reate(?:StyleSheet|Popup|EventObject))|t(?:o(?:GMTString|S(?:tring|ource)|U(?:TCString|pperCase)|Lo(?:caleString|werCase))|est|a(?:n|int(?:Enabled)?))|i(?:s(?:NaN|Finite)|ndexOf|talics)|d(?:isableExternalCapture|ump|etachEvent)|u(?:n(?:shift|taint|escape|watch)|pdateCommands)|j(?:oin|avaEnabled)|p(?:o(?:p|w)|ush|lugins.refresh|a(?:ddings|rse(?:Int|Float)?)|r(?:int|ompt|eference))|e(?:scape|nableExternalCapture|val|lementFromPoint|x(?:p|ec(?:Script|Command)?))|valueOf|UTC|queryCommand(?:State|Indeterm|Enabled|Value)|f(?:i(?:nd|lter|le(?:ModifiedDate|Size|CreatedDate|UpdatedDate)|xed)|o(?:nt(?:size|color)|rward|rEach)|loor|romCharCode)|watch|l(?:ink|o(?:ad|g)|astIndexOf)|a(?:sin|nchor|cos|t(?:tachEvent|ob|an(?:2)?)|pply|lert|b(?:s|ort))|r(?:ou(?:nd|teEvents)|e(?:size(?:By|To)|calc|turnValue|place|verse|l(?:oad|ease(?:Capture|Events)))|andom)|g(?:o|et(?:ResponseHeader|M(?:i(?:nutes|lliseconds)|onth)|Se(?:conds|lection)|Hours|Year|Time(?:zoneOffset)?|Da(?:y|te)|UTC(?:M(?:i(?:nutes|lliseconds)|onth)|Seconds|Hours|Da(?:y|te)|FullYear)|FullYear|A(?:ttention|llResponseHeaders)))|m(?:in|ove(?:B(?:y|elow)|To(?:Absolute)?|Above)|ergeAttributes|a(?:tch|rgins|x))|b(?:toa|ig|o(?:ld|rderWidths)|link|ack))\b(?=\()/,
                },
                {
                  token: "support.function.dom",
                  regex:
                    /(s(?:ub(?:stringData|mit)|plitText|e(?:t(?:NamedItem|Attribute(?:Node)?)|lect))|has(?:ChildNodes|Feature)|namedItem|c(?:l(?:ick|o(?:se|neNode))|reate(?:C(?:omment|DATASection|aption)|T(?:Head|extNode|Foot)|DocumentFragment|ProcessingInstruction|E(?:ntityReference|lement)|Attribute))|tabIndex|i(?:nsert(?:Row|Before|Cell|Data)|tem)|open|delete(?:Row|C(?:ell|aption)|T(?:Head|Foot)|Data)|focus|write(?:ln)?|a(?:dd|ppend(?:Child|Data))|re(?:set|place(?:Child|Data)|move(?:NamedItem|Child|Attribute(?:Node)?)?)|get(?:NamedItem|Element(?:sBy(?:Name|TagName|ClassName)|ById)|Attribute(?:Node)?)|blur)\b(?=\()/,
                },
                {
                  token: "support.constant",
                  regex:
                    /(s(?:ystemLanguage|cr(?:ipts|ollbars|een(?:X|Y|Top|Left))|t(?:yle(?:Sheets)?|atus(?:Text|bar)?)|ibling(?:Below|Above)|ource|uffixes|e(?:curity(?:Policy)?|l(?:ection|f)))|h(?:istory|ost(?:name)?|as(?:h|Focus))|y|X(?:MLDocument|SLDocument)|n(?:ext|ame(?:space(?:s|URI)|Prop))|M(?:IN_VALUE|AX_VALUE)|c(?:haracterSet|o(?:n(?:structor|trollers)|okieEnabled|lorDepth|mp(?:onents|lete))|urrent|puClass|l(?:i(?:p(?:boardData)?|entInformation)|osed|asses)|alle(?:e|r)|rypto)|t(?:o(?:olbar|p)|ext(?:Transform|Indent|Decoration|Align)|ags)|SQRT(?:1_2|2)|i(?:n(?:ner(?:Height|Width)|put)|ds|gnoreCase)|zIndex|o(?:scpu|n(?:readystatechange|Line)|uter(?:Height|Width)|p(?:sProfile|ener)|ffscreenBuffering)|NEGATIVE_INFINITY|d(?:i(?:splay|alog(?:Height|Top|Width|Left|Arguments)|rectories)|e(?:scription|fault(?:Status|Ch(?:ecked|arset)|View)))|u(?:ser(?:Profile|Language|Agent)|n(?:iqueID|defined)|pdateInterval)|_content|p(?:ixelDepth|ort|ersonalbar|kcs11|l(?:ugins|atform)|a(?:thname|dding(?:Right|Bottom|Top|Left)|rent(?:Window|Layer)?|ge(?:X(?:Offset)?|Y(?:Offset)?))|r(?:o(?:to(?:col|type)|duct(?:Sub)?|mpter)|e(?:vious|fix)))|e(?:n(?:coding|abledPlugin)|x(?:ternal|pando)|mbeds)|v(?:isibility|endor(?:Sub)?|Linkcolor)|URLUnencoded|P(?:I|OSITIVE_INFINITY)|f(?:ilename|o(?:nt(?:Size|Family|Weight)|rmName)|rame(?:s|Element)|gColor)|E|whiteSpace|l(?:i(?:stStyleType|n(?:eHeight|kColor))|o(?:ca(?:tion(?:bar)?|lName)|wsrc)|e(?:ngth|ft(?:Context)?)|a(?:st(?:M(?:odified|atch)|Index|Paren)|yer(?:s|X)|nguage))|a(?:pp(?:MinorVersion|Name|Co(?:deName|re)|Version)|vail(?:Height|Top|Width|Left)|ll|r(?:ity|guments)|Linkcolor|bove)|r(?:ight(?:Context)?|e(?:sponse(?:XML|Text)|adyState))|global|x|m(?:imeTypes|ultiline|enubar|argin(?:Right|Bottom|Top|Left))|L(?:N(?:10|2)|OG(?:10E|2E))|b(?:o(?:ttom|rder(?:Width|RightWidth|BottomWidth|Style|Color|TopWidth|LeftWidth))|ufferDepth|elow|ackground(?:Color|Image)))\b/,
                },
                { token: "identifier", regex: o },
                { regex: "", token: "empty", next: "no_regex" },
              ],
              start: [
                f.getStartRule("doc-start"),
                r("start"),
                { token: "string.regexp", regex: "\\/", next: "regex" },
                { token: "text", regex: "\\s+|^$", next: "start" },
                { token: "empty", regex: "", next: "no_regex" },
              ],
              regex: [
                {
                  token: "regexp.keyword.operator",
                  regex: "\\\\(?:u[\\da-fA-F]{4}|x[\\da-fA-F]{2}|.)",
                },
                {
                  token: "string.regexp",
                  regex: "/[sxngimy]*",
                  next: "no_regex",
                },
                {
                  token: "invalid",
                  regex: /\{\d+\b,?\d*\}[+*]|[+*$^?][+*]|[$^][?]|\?{3,}/,
                },
                {
                  token: "constant.language.escape",
                  regex: /\(\?[:=!]|\)|\{\d+\b,?\d*\}|[+*]\?|[()$^+*?.]/,
                },
                { token: "constant.language.delimiter", regex: /\|/ },
                {
                  token: "constant.language.escape",
                  regex: /\[\^?/,
                  next: "regex_character_class",
                },
                { token: "empty", regex: "$", next: "no_regex" },
                { defaultToken: "string.regexp" },
              ],
              regex_character_class: [
                {
                  token: "regexp.charclass.keyword.operator",
                  regex: "\\\\(?:u[\\da-fA-F]{4}|x[\\da-fA-F]{2}|.)",
                },
                {
                  token: "constant.language.escape",
                  regex: "]",
                  next: "regex",
                },
                { token: "constant.language.escape", regex: "-" },
                { token: "empty", regex: "$", next: "no_regex" },
                { defaultToken: "string.regexp.charachterclass" },
              ],
              default_parameter: [
                {
                  token: "string",
                  regex: "'(?=.)",
                  push: [
                    { token: "string", regex: "'|$", next: "pop" },
                    { include: "qstring" },
                  ],
                },
                {
                  token: "string",
                  regex: '"(?=.)',
                  push: [
                    { token: "string", regex: '"|$', next: "pop" },
                    { include: "qqstring" },
                  ],
                },
                {
                  token: "constant.language",
                  regex: "null|Infinity|NaN|undefined",
                },
                {
                  token: "constant.numeric",
                  regex: /0(?:[xX][0-9a-fA-F]+|[oO][0-7]+|[bB][01]+)\b/,
                },
                {
                  token: "constant.numeric",
                  regex: /(?:\d\d*(?:\.\d*)?|\.\d+)(?:[eE][+-]?\d+\b)?/,
                },
                {
                  token: "punctuation.operator",
                  regex: ",",
                  next: "function_arguments",
                },
                { token: "text", regex: "\\s+" },
                { token: "punctuation.operator", regex: "$" },
                { token: "empty", regex: "", next: "no_regex" },
              ],
              function_arguments: [
                r("function_arguments"),
                { token: "variable.parameter", regex: o },
                { token: "punctuation.operator", regex: "," },
                { token: "text", regex: "\\s+" },
                { token: "punctuation.operator", regex: "$" },
                { token: "empty", regex: "", next: "no_regex" },
              ],
              qqstring: [
                { token: "constant.language.escape", regex: n },
                { token: "string", regex: "\\\\$", consumeLineEnd: !0 },
                { token: "string", regex: '"|$', next: "no_regex" },
                { defaultToken: "string" },
              ],
              qstring: [
                { token: "constant.language.escape", regex: n },
                { token: "string", regex: "\\\\$", consumeLineEnd: !0 },
                { token: "string", regex: "'|$", next: "no_regex" },
                { defaultToken: "string" },
              ],
            }),
              (!s || !s.noES6) &&
                (this.$rules.no_regex.unshift(
                  {
                    regex: "[{}]",
                    onMatch: function (e, a, u) {
                      if (
                        ((this.next = e == "{" ? this.nextState : ""),
                        e == "{" && u.length)
                      )
                        u.unshift("start", a);
                      else if (
                        e == "}" &&
                        u.length &&
                        (u.shift(),
                        (this.next = u.shift()),
                        this.next.indexOf("string") != -1 ||
                          this.next.indexOf("jsx") != -1)
                      )
                        return "paren.quasi.end";
                      return e == "{" ? "paren.lparen" : "paren.rparen";
                    },
                    nextState: "start",
                  },
                  {
                    token: "string.quasi.start",
                    regex: /`/,
                    push: [
                      { token: "constant.language.escape", regex: n },
                      {
                        token: "paren.quasi.start",
                        regex: /\${/,
                        push: "start",
                      },
                      { token: "string.quasi.end", regex: /`/, next: "pop" },
                      { defaultToken: "string.quasi" },
                    ],
                  },
                  {
                    token: ["variable.parameter", "text"],
                    regex: "(" + o + ")(\\s*)(?=\\=>)",
                  },
                  {
                    token: "paren.lparen",
                    regex: "(\\()(?=.+\\s*=>)",
                    next: "function_arguments",
                  },
                  {
                    token: "variable.language",
                    regex: "(?:(?:(?:Weak)?(?:Set|Map))|Promise)\\b",
                  }
                ),
                this.$rules.function_arguments.unshift(
                  {
                    token: "keyword.operator",
                    regex: "=",
                    next: "default_parameter",
                  },
                  { token: "keyword.operator", regex: "\\.{3}" }
                ),
                this.$rules.property.unshift(
                  {
                    token: "support.function",
                    regex:
                      "(findIndex|repeat|startsWith|endsWith|includes|isSafeInteger|trunc|cbrt|log2|log10|sign|then|catch|finally|resolve|reject|race|any|all|allSettled|keys|entries|isInteger)\\b(?=\\()",
                  },
                  {
                    token: "constant.language",
                    regex: "(?:MAX_SAFE_INTEGER|MIN_SAFE_INTEGER|EPSILON)\\b",
                  }
                ),
                (!s || s.jsx != !1) && d.call(this)),
              this.embedRules(f, "doc-", [f.getEndRule("no_regex")]),
              this.normalizeRules();
          };
        h.inherits(l, g);
        function d() {
          var s = o.replace("\\d", "\\d\\-"),
            i = {
              onMatch: function (n, e, a) {
                var u = n.charAt(1) == "/" ? 2 : 1;
                return (
                  u == 1
                    ? (e != this.nextState
                        ? a.unshift(this.next, this.nextState, 0)
                        : a.unshift(this.next),
                      a[2]++)
                    : u == 2 &&
                      e == this.nextState &&
                      (a[1]--, (!a[1] || a[1] < 0) && (a.shift(), a.shift())),
                  [
                    {
                      type:
                        "meta.tag.punctuation." +
                        (u == 1 ? "" : "end-") +
                        "tag-open.xml",
                      value: n.slice(0, u),
                    },
                    { type: "meta.tag.tag-name.xml", value: n.substr(u) },
                  ]
                );
              },
              regex: "</?" + s,
              next: "jsxAttributes",
              nextState: "jsx",
            };
          this.$rules.start.unshift(i);
          var t = { regex: "{", token: "paren.quasi.start", push: "start" };
          (this.$rules.jsx = [
            t,
            i,
            { include: "reference" },
            { defaultToken: "string" },
          ]),
            (this.$rules.jsxAttributes = [
              {
                token: "meta.tag.punctuation.tag-close.xml",
                regex: "/?>",
                onMatch: function (n, e, a) {
                  return (
                    e == a[0] && a.shift(),
                    n.length == 2 &&
                      (a[0] == this.nextState && a[1]--,
                      (!a[1] || a[1] < 0) && a.splice(0, 2)),
                    (this.next = a[0] || "start"),
                    [{ type: this.token, value: n }]
                  );
                },
                nextState: "jsx",
              },
              t,
              r("jsxAttributes"),
              { token: "entity.other.attribute-name.xml", regex: s },
              { token: "keyword.operator.attribute-equals.xml", regex: "=" },
              { token: "text.tag-whitespace.xml", regex: "\\s+" },
              {
                token: "string.attribute-value.xml",
                regex: "'",
                stateName: "jsx_attr_q",
                push: [
                  {
                    token: "string.attribute-value.xml",
                    regex: "'",
                    next: "pop",
                  },
                  { include: "reference" },
                  { defaultToken: "string.attribute-value.xml" },
                ],
              },
              {
                token: "string.attribute-value.xml",
                regex: '"',
                stateName: "jsx_attr_qq",
                push: [
                  {
                    token: "string.attribute-value.xml",
                    regex: '"',
                    next: "pop",
                  },
                  { include: "reference" },
                  { defaultToken: "string.attribute-value.xml" },
                ],
              },
              i,
            ]),
            (this.$rules.reference = [
              {
                token: "constant.language.escape.reference.xml",
                regex:
                  "(?:&#[0-9]+;)|(?:&#x[0-9a-fA-F]+;)|(?:&[a-zA-Z0-9_:\\.-]+;)",
              },
            ]);
        }
        function r(s) {
          return [
            {
              token: "comment",
              regex: /\/\*/,
              next: [
                f.getTagRule(),
                { token: "comment", regex: "\\*\\/", next: s || "pop" },
                { defaultToken: "comment", caseInsensitive: !0 },
              ],
            },
            {
              token: "comment",
              regex: "\\/\\/",
              next: [
                f.getTagRule(),
                { token: "comment", regex: "$|^", next: s || "pop" },
                { defaultToken: "comment", caseInsensitive: !0 },
              ],
            },
          ];
        }
        p.JavaScriptHighlightRules = l;
      }
    ),
    ace.define(
      "ace/mode/matching_brace_outdent",
      ["require", "exports", "module", "ace/range"],
      function (c, p, v) {
        var h = c("../range").Range,
          f = function () {};
        (function () {
          (this.checkOutdent = function (g, o) {
            return /^\s+$/.test(g) ? /^\s*\}/.test(o) : !1;
          }),
            (this.autoOutdent = function (g, o) {
              var l = g.getLine(o),
                d = l.match(/^(\s*\})/);
              if (!d) return 0;
              var r = d[1].length,
                s = g.findMatchingBracket({ row: o, column: r });
              if (!s || s.row == o) return 0;
              var i = this.$getIndent(g.getLine(s.row));
              g.replace(new h(o, 0, o, r - 1), i);
            }),
            (this.$getIndent = function (g) {
              return g.match(/^\s*/)[0];
            });
        }).call(f.prototype),
          (p.MatchingBraceOutdent = f);
      }
    ),
    ace.define(
      "ace/mode/folding/cstyle",
      [
        "require",
        "exports",
        "module",
        "ace/lib/oop",
        "ace/range",
        "ace/mode/folding/fold_mode",
      ],
      function (c, p, v) {
        var h = c("../../lib/oop"),
          f = c("../../range").Range,
          g = c("./fold_mode").FoldMode,
          o = (p.FoldMode = function (l) {
            l &&
              ((this.foldingStartMarker = new RegExp(
                this.foldingStartMarker.source.replace(
                  /\|[^|]*?$/,
                  "|" + l.start
                )
              )),
              (this.foldingStopMarker = new RegExp(
                this.foldingStopMarker.source.replace(/\|[^|]*?$/, "|" + l.end)
              )));
          });
        h.inherits(o, g),
          function () {
            (this.foldingStartMarker = /([\{\[\(])[^\}\]\)]*$|^\s*(\/\*)/),
              (this.foldingStopMarker = /^[^\[\{\(]*([\}\]\)])|^[\s\*]*(\*\/)/),
              (this.singleLineBlockCommentRe = /^\s*(\/\*).*\*\/\s*$/),
              (this.tripleStarBlockCommentRe = /^\s*(\/\*\*\*).*\*\/\s*$/),
              (this.startRegionRe = /^\s*(\/\*|\/\/)#?region\b/),
              (this._getFoldWidgetBase = this.getFoldWidget),
              (this.getFoldWidget = function (l, d, r) {
                var s = l.getLine(r);
                if (
                  this.singleLineBlockCommentRe.test(s) &&
                  !this.startRegionRe.test(s) &&
                  !this.tripleStarBlockCommentRe.test(s)
                )
                  return "";
                var i = this._getFoldWidgetBase(l, d, r);
                return !i && this.startRegionRe.test(s) ? "start" : i;
              }),
              (this.getFoldWidgetRange = function (l, d, r, s) {
                var i = l.getLine(r);
                if (this.startRegionRe.test(i))
                  return this.getCommentRegionBlock(l, i, r);
                var e = i.match(this.foldingStartMarker);
                if (e) {
                  var t = e.index;
                  if (e[1]) return this.openingBracketBlock(l, e[1], r, t);
                  var n = l.getCommentFoldRange(r, t + e[0].length, 1);
                  return (
                    n &&
                      !n.isMultiLine() &&
                      (s
                        ? (n = this.getSectionRange(l, r))
                        : d != "all" && (n = null)),
                    n
                  );
                }
                if (d !== "markbegin") {
                  var e = i.match(this.foldingStopMarker);
                  if (e) {
                    var t = e.index + e[0].length;
                    return e[1]
                      ? this.closingBracketBlock(l, e[1], r, t)
                      : l.getCommentFoldRange(r, t, -1);
                  }
                }
              }),
              (this.getSectionRange = function (l, d) {
                var r = l.getLine(d),
                  s = r.search(/\S/),
                  i = d,
                  t = r.length;
                d = d + 1;
                for (var n = d, e = l.getLength(); ++d < e; ) {
                  r = l.getLine(d);
                  var a = r.search(/\S/);
                  if (a !== -1) {
                    if (s > a) break;
                    var u = this.getFoldWidgetRange(l, "all", d);
                    if (u) {
                      if (u.start.row <= i) break;
                      if (u.isMultiLine()) d = u.end.row;
                      else if (s == a) break;
                    }
                    n = d;
                  }
                }
                return new f(i, t, n, l.getLine(n).length);
              }),
              (this.getCommentRegionBlock = function (l, d, r) {
                for (
                  var s = d.search(/\s*$/),
                    i = l.getLength(),
                    t = r,
                    n = /^\s*(?:\/\*|\/\/|--)#?(end)?region\b/,
                    e = 1;
                  ++r < i;

                ) {
                  d = l.getLine(r);
                  var a = n.exec(d);
                  if (!!a && (a[1] ? e-- : e++, !e)) break;
                }
                var u = r;
                if (u > t) return new f(t, s, u, d.length);
              });
          }.call(o.prototype);
      }
    ),
    ace.define(
      "ace/mode/javascript",
      [
        "require",
        "exports",
        "module",
        "ace/lib/oop",
        "ace/mode/text",
        "ace/mode/javascript_highlight_rules",
        "ace/mode/matching_brace_outdent",
        "ace/worker/worker_client",
        "ace/mode/behaviour/cstyle",
        "ace/mode/folding/cstyle",
      ],
      function (c, p, v) {
        var h = c("../lib/oop"),
          f = c("./text").Mode,
          g = c("./javascript_highlight_rules").JavaScriptHighlightRules,
          o = c("./matching_brace_outdent").MatchingBraceOutdent,
          l = c("../worker/worker_client").WorkerClient,
          d = c("./behaviour/cstyle").CstyleBehaviour,
          r = c("./folding/cstyle").FoldMode,
          s = function () {
            (this.HighlightRules = g),
              (this.$outdent = new o()),
              (this.$behaviour = new d()),
              (this.foldingRules = new r());
          };
        h.inherits(s, f),
          function () {
            (this.lineCommentStart = "//"),
              (this.blockComment = { start: "/*", end: "*/" }),
              (this.$quotes = { '"': '"', "'": "'", "`": "`" }),
              (this.$pairQuotesAfter = { "`": /\w/ }),
              (this.getNextLineIndent = function (i, t, n) {
                var e = this.$getIndent(t),
                  a = this.getTokenizer().getLineTokens(t, i),
                  u = a.tokens,
                  m = a.state;
                if (u.length && u[u.length - 1].type == "comment") return e;
                if (i == "start" || i == "no_regex") {
                  var x = t.match(/^.*(?:\bcase\b.*:|[\{\(\[])\s*$/);
                  x && (e += n);
                } else if (i == "doc-start") {
                  if (m == "start" || m == "no_regex") return "";
                  var x = t.match(/^\s*(\/?)\*/);
                  x && (x[1] && (e += " "), (e += "* "));
                }
                return e;
              }),
              (this.checkOutdent = function (i, t, n) {
                return this.$outdent.checkOutdent(t, n);
              }),
              (this.autoOutdent = function (i, t, n) {
                this.$outdent.autoOutdent(t, n);
              }),
              (this.createWorker = function (i) {
                var t = new l(
                  ["ace"],
                  "ace/mode/javascript_worker",
                  "JavaScriptWorker"
                );
                return (
                  t.attachToDocument(i.getDocument()),
                  t.on("annotate", function (n) {
                    i.setAnnotations(n.data);
                  }),
                  t.on("terminate", function () {
                    i.clearAnnotations();
                  }),
                  t
                );
              }),
              (this.$id = "ace/mode/javascript"),
              (this.snippetFileId = "ace/snippets/javascript");
          }.call(s.prototype),
          (p.Mode = s);
      }
    ),
    ace.define(
      "ace/mode/css_highlight_rules",
      [
        "require",
        "exports",
        "module",
        "ace/lib/oop",
        "ace/lib/lang",
        "ace/mode/text_highlight_rules",
      ],
      function (c, p, v) {
        var h = c("../lib/oop");
        c("../lib/lang");
        var f = c("./text_highlight_rules").TextHighlightRules,
          g = (p.supportType =
            "align-content|align-items|align-self|all|animation|animation-delay|animation-direction|animation-duration|animation-fill-mode|animation-iteration-count|animation-name|animation-play-state|animation-timing-function|backface-visibility|background|background-attachment|background-blend-mode|background-clip|background-color|background-image|background-origin|background-position|background-repeat|background-size|border|border-bottom|border-bottom-color|border-bottom-left-radius|border-bottom-right-radius|border-bottom-style|border-bottom-width|border-collapse|border-color|border-image|border-image-outset|border-image-repeat|border-image-slice|border-image-source|border-image-width|border-left|border-left-color|border-left-style|border-left-width|border-radius|border-right|border-right-color|border-right-style|border-right-width|border-spacing|border-style|border-top|border-top-color|border-top-left-radius|border-top-right-radius|border-top-style|border-top-width|border-width|bottom|box-shadow|box-sizing|caption-side|clear|clip|color|column-count|column-fill|column-gap|column-rule|column-rule-color|column-rule-style|column-rule-width|column-span|column-width|columns|content|counter-increment|counter-reset|cursor|direction|display|empty-cells|filter|flex|flex-basis|flex-direction|flex-flow|flex-grow|flex-shrink|flex-wrap|float|font|font-family|font-size|font-size-adjust|font-stretch|font-style|font-variant|font-weight|hanging-punctuation|height|justify-content|left|letter-spacing|line-height|list-style|list-style-image|list-style-position|list-style-type|margin|margin-bottom|margin-left|margin-right|margin-top|max-height|max-width|max-zoom|min-height|min-width|min-zoom|nav-down|nav-index|nav-left|nav-right|nav-up|opacity|order|outline|outline-color|outline-offset|outline-style|outline-width|overflow|overflow-x|overflow-y|padding|padding-bottom|padding-left|padding-right|padding-top|page-break-after|page-break-before|page-break-inside|perspective|perspective-origin|position|quotes|resize|right|tab-size|table-layout|text-align|text-align-last|text-decoration|text-decoration-color|text-decoration-line|text-decoration-style|text-indent|text-justify|text-overflow|text-shadow|text-transform|top|transform|transform-origin|transform-style|transition|transition-delay|transition-duration|transition-property|transition-timing-function|unicode-bidi|user-select|user-zoom|vertical-align|visibility|white-space|width|word-break|word-spacing|word-wrap|z-index"),
          o = (p.supportFunction = "rgb|rgba|url|attr|counter|counters"),
          l = (p.supportConstant =
            "absolute|after-edge|after|all-scroll|all|alphabetic|always|antialiased|armenian|auto|avoid-column|avoid-page|avoid|balance|baseline|before-edge|before|below|bidi-override|block-line-height|block|bold|bolder|border-box|both|bottom|box|break-all|break-word|capitalize|caps-height|caption|center|central|char|circle|cjk-ideographic|clone|close-quote|col-resize|collapse|column|consider-shifts|contain|content-box|cover|crosshair|cubic-bezier|dashed|decimal-leading-zero|decimal|default|disabled|disc|disregard-shifts|distribute-all-lines|distribute-letter|distribute-space|distribute|dotted|double|e-resize|ease-in|ease-in-out|ease-out|ease|ellipsis|end|exclude-ruby|flex-end|flex-start|fill|fixed|georgian|glyphs|grid-height|groove|hand|hanging|hebrew|help|hidden|hiragana-iroha|hiragana|horizontal|icon|ideograph-alpha|ideograph-numeric|ideograph-parenthesis|ideograph-space|ideographic|inactive|include-ruby|inherit|initial|inline-block|inline-box|inline-line-height|inline-table|inline|inset|inside|inter-ideograph|inter-word|invert|italic|justify|katakana-iroha|katakana|keep-all|last|left|lighter|line-edge|line-through|line|linear|list-item|local|loose|lower-alpha|lower-greek|lower-latin|lower-roman|lowercase|lr-tb|ltr|mathematical|max-height|max-size|medium|menu|message-box|middle|move|n-resize|ne-resize|newspaper|no-change|no-close-quote|no-drop|no-open-quote|no-repeat|none|normal|not-allowed|nowrap|nw-resize|oblique|open-quote|outset|outside|overline|padding-box|page|pointer|pre-line|pre-wrap|pre|preserve-3d|progress|relative|repeat-x|repeat-y|repeat|replaced|reset-size|ridge|right|round|row-resize|rtl|s-resize|scroll|se-resize|separate|slice|small-caps|small-caption|solid|space|square|start|static|status-bar|step-end|step-start|steps|stretch|strict|sub|super|sw-resize|table-caption|table-cell|table-column-group|table-column|table-footer-group|table-header-group|table-row-group|table-row|table|tb-rl|text-after-edge|text-before-edge|text-bottom|text-size|text-top|text|thick|thin|transparent|underline|upper-alpha|upper-latin|upper-roman|uppercase|use-script|vertical-ideographic|vertical-text|visible|w-resize|wait|whitespace|z-index|zero|zoom"),
          d = (p.supportConstantColor =
            "aliceblue|antiquewhite|aqua|aquamarine|azure|beige|bisque|black|blanchedalmond|blue|blueviolet|brown|burlywood|cadetblue|chartreuse|chocolate|coral|cornflowerblue|cornsilk|crimson|cyan|darkblue|darkcyan|darkgoldenrod|darkgray|darkgreen|darkgrey|darkkhaki|darkmagenta|darkolivegreen|darkorange|darkorchid|darkred|darksalmon|darkseagreen|darkslateblue|darkslategray|darkslategrey|darkturquoise|darkviolet|deeppink|deepskyblue|dimgray|dimgrey|dodgerblue|firebrick|floralwhite|forestgreen|fuchsia|gainsboro|ghostwhite|gold|goldenrod|gray|green|greenyellow|grey|honeydew|hotpink|indianred|indigo|ivory|khaki|lavender|lavenderblush|lawngreen|lemonchiffon|lightblue|lightcoral|lightcyan|lightgoldenrodyellow|lightgray|lightgreen|lightgrey|lightpink|lightsalmon|lightseagreen|lightskyblue|lightslategray|lightslategrey|lightsteelblue|lightyellow|lime|limegreen|linen|magenta|maroon|mediumaquamarine|mediumblue|mediumorchid|mediumpurple|mediumseagreen|mediumslateblue|mediumspringgreen|mediumturquoise|mediumvioletred|midnightblue|mintcream|mistyrose|moccasin|navajowhite|navy|oldlace|olive|olivedrab|orange|orangered|orchid|palegoldenrod|palegreen|paleturquoise|palevioletred|papayawhip|peachpuff|peru|pink|plum|powderblue|purple|rebeccapurple|red|rosybrown|royalblue|saddlebrown|salmon|sandybrown|seagreen|seashell|sienna|silver|skyblue|slateblue|slategray|slategrey|snow|springgreen|steelblue|tan|teal|thistle|tomato|turquoise|violet|wheat|white|whitesmoke|yellow|yellowgreen"),
          r = (p.supportConstantFonts =
            "arial|century|comic|courier|cursive|fantasy|garamond|georgia|helvetica|impact|lucida|symbol|system|tahoma|times|trebuchet|utopia|verdana|webdings|sans-serif|serif|monospace"),
          s = (p.numRe = "\\-?(?:(?:[0-9]+(?:\\.[0-9]+)?)|(?:\\.[0-9]+))"),
          i = (p.pseudoElements =
            "(\\:+)\\b(after|before|first-letter|first-line|moz-selection|selection)\\b"),
          t = (p.pseudoClasses =
            "(:)\\b(active|checked|disabled|empty|enabled|first-child|first-of-type|focus|hover|indeterminate|invalid|last-child|last-of-type|link|not|nth-child|nth-last-child|nth-last-of-type|nth-of-type|only-child|only-of-type|required|root|target|valid|visited)\\b"),
          n = function () {
            var e = this.createKeywordMapper(
              {
                "support.function": o,
                "support.constant": l,
                "support.type": g,
                "support.constant.color": d,
                "support.constant.fonts": r,
              },
              "text",
              !0
            );
            (this.$rules = {
              start: [
                { include: ["strings", "url", "comments"] },
                { token: "paren.lparen", regex: "\\{", next: "ruleset" },
                { token: "paren.rparen", regex: "\\}" },
                { token: "string", regex: "@(?!viewport)", next: "media" },
                { token: "keyword", regex: "#[a-z0-9-_]+" },
                { token: "keyword", regex: "%" },
                { token: "variable", regex: "\\.[a-z0-9-_]+" },
                { token: "string", regex: ":[a-z0-9-_]+" },
                { token: "constant.numeric", regex: s },
                { token: "constant", regex: "[a-z0-9-_]+" },
                { caseInsensitive: !0 },
              ],
              media: [
                { include: ["strings", "url", "comments"] },
                { token: "paren.lparen", regex: "\\{", next: "start" },
                { token: "paren.rparen", regex: "\\}", next: "start" },
                { token: "string", regex: ";", next: "start" },
                {
                  token: "keyword",
                  regex:
                    "(?:media|supports|document|charset|import|namespace|media|supports|document|page|font|keyframes|viewport|counter-style|font-feature-values|swash|ornaments|annotation|stylistic|styleset|character-variant)",
                },
              ],
              comments: [
                {
                  token: "comment",
                  regex: "\\/\\*",
                  push: [
                    { token: "comment", regex: "\\*\\/", next: "pop" },
                    { defaultToken: "comment" },
                  ],
                },
              ],
              ruleset: [
                { regex: "-(webkit|ms|moz|o)-", token: "text" },
                { token: "punctuation.operator", regex: "[:;]" },
                { token: "paren.rparen", regex: "\\}", next: "start" },
                { include: ["strings", "url", "comments"] },
                {
                  token: ["constant.numeric", "keyword"],
                  regex:
                    "(" +
                    s +
                    ")(ch|cm|deg|em|ex|fr|gd|grad|Hz|in|kHz|mm|ms|pc|pt|px|rad|rem|s|turn|vh|vmax|vmin|vm|vw|%)",
                },
                { token: "constant.numeric", regex: s },
                { token: "constant.numeric", regex: "#[a-f0-9]{6}" },
                { token: "constant.numeric", regex: "#[a-f0-9]{3}" },
                {
                  token: [
                    "punctuation",
                    "entity.other.attribute-name.pseudo-element.css",
                  ],
                  regex: i,
                },
                {
                  token: [
                    "punctuation",
                    "entity.other.attribute-name.pseudo-class.css",
                  ],
                  regex: t,
                },
                { include: "url" },
                { token: e, regex: "\\-?[a-zA-Z_][a-zA-Z0-9_\\-]*" },
                { caseInsensitive: !0 },
              ],
              url: [
                {
                  token: "support.function",
                  regex: "(?:url(:?-prefix)?|domain|regexp)\\(",
                  push: [
                    { token: "support.function", regex: "\\)", next: "pop" },
                    { defaultToken: "string" },
                  ],
                },
              ],
              strings: [
                {
                  token: "string.start",
                  regex: "'",
                  push: [
                    { token: "string.end", regex: "'|$", next: "pop" },
                    { include: "escapes" },
                    {
                      token: "constant.language.escape",
                      regex: /\\$/,
                      consumeLineEnd: !0,
                    },
                    { defaultToken: "string" },
                  ],
                },
                {
                  token: "string.start",
                  regex: '"',
                  push: [
                    { token: "string.end", regex: '"|$', next: "pop" },
                    { include: "escapes" },
                    {
                      token: "constant.language.escape",
                      regex: /\\$/,
                      consumeLineEnd: !0,
                    },
                    { defaultToken: "string" },
                  ],
                },
              ],
              escapes: [
                {
                  token: "constant.language.escape",
                  regex: /\\([a-fA-F\d]{1,6}|[^a-fA-F\d])/,
                },
              ],
            }),
              this.normalizeRules();
          };
        h.inherits(n, f), (p.CssHighlightRules = n);
      }
    ),
    ace.define(
      "ace/mode/css_completions",
      ["require", "exports", "module"],
      function (c, p, v) {
        var h = {
            background: { "#$0": 1 },
            "background-color": { "#$0": 1, transparent: 1, fixed: 1 },
            "background-image": { "url('/$0')": 1 },
            "background-repeat": {
              repeat: 1,
              "repeat-x": 1,
              "repeat-y": 1,
              "no-repeat": 1,
              inherit: 1,
            },
            "background-position": {
              bottom: 2,
              center: 2,
              left: 2,
              right: 2,
              top: 2,
              inherit: 2,
            },
            "background-attachment": { scroll: 1, fixed: 1 },
            "background-size": { cover: 1, contain: 1 },
            "background-clip": {
              "border-box": 1,
              "padding-box": 1,
              "content-box": 1,
            },
            "background-origin": {
              "border-box": 1,
              "padding-box": 1,
              "content-box": 1,
            },
            border: { "solid $0": 1, "dashed $0": 1, "dotted $0": 1, "#$0": 1 },
            "border-color": { "#$0": 1 },
            "border-style": {
              solid: 2,
              dashed: 2,
              dotted: 2,
              double: 2,
              groove: 2,
              hidden: 2,
              inherit: 2,
              inset: 2,
              none: 2,
              outset: 2,
              ridged: 2,
            },
            "border-collapse": { collapse: 1, separate: 1 },
            bottom: { px: 1, em: 1, "%": 1 },
            clear: { left: 1, right: 1, both: 1, none: 1 },
            color: { "#$0": 1, "rgb(#$00,0,0)": 1 },
            cursor: {
              default: 1,
              pointer: 1,
              move: 1,
              text: 1,
              wait: 1,
              help: 1,
              progress: 1,
              "n-resize": 1,
              "ne-resize": 1,
              "e-resize": 1,
              "se-resize": 1,
              "s-resize": 1,
              "sw-resize": 1,
              "w-resize": 1,
              "nw-resize": 1,
            },
            display: {
              none: 1,
              block: 1,
              inline: 1,
              "inline-block": 1,
              "table-cell": 1,
            },
            "empty-cells": { show: 1, hide: 1 },
            float: { left: 1, right: 1, none: 1 },
            "font-family": {
              Arial: 2,
              "Comic Sans MS": 2,
              Consolas: 2,
              "Courier New": 2,
              Courier: 2,
              Georgia: 2,
              Monospace: 2,
              "Sans-Serif": 2,
              "Segoe UI": 2,
              Tahoma: 2,
              "Times New Roman": 2,
              "Trebuchet MS": 2,
              Verdana: 1,
            },
            "font-size": { px: 1, em: 1, "%": 1 },
            "font-weight": { bold: 1, normal: 1 },
            "font-style": { italic: 1, normal: 1 },
            "font-variant": { normal: 1, "small-caps": 1 },
            height: { px: 1, em: 1, "%": 1 },
            left: { px: 1, em: 1, "%": 1 },
            "letter-spacing": { normal: 1 },
            "line-height": { normal: 1 },
            "list-style-type": {
              none: 1,
              disc: 1,
              circle: 1,
              square: 1,
              decimal: 1,
              "decimal-leading-zero": 1,
              "lower-roman": 1,
              "upper-roman": 1,
              "lower-greek": 1,
              "lower-latin": 1,
              "upper-latin": 1,
              georgian: 1,
              "lower-alpha": 1,
              "upper-alpha": 1,
            },
            margin: { px: 1, em: 1, "%": 1 },
            "margin-right": { px: 1, em: 1, "%": 1 },
            "margin-left": { px: 1, em: 1, "%": 1 },
            "margin-top": { px: 1, em: 1, "%": 1 },
            "margin-bottom": { px: 1, em: 1, "%": 1 },
            "max-height": { px: 1, em: 1, "%": 1 },
            "max-width": { px: 1, em: 1, "%": 1 },
            "min-height": { px: 1, em: 1, "%": 1 },
            "min-width": { px: 1, em: 1, "%": 1 },
            overflow: { hidden: 1, visible: 1, auto: 1, scroll: 1 },
            "overflow-x": { hidden: 1, visible: 1, auto: 1, scroll: 1 },
            "overflow-y": { hidden: 1, visible: 1, auto: 1, scroll: 1 },
            padding: { px: 1, em: 1, "%": 1 },
            "padding-top": { px: 1, em: 1, "%": 1 },
            "padding-right": { px: 1, em: 1, "%": 1 },
            "padding-bottom": { px: 1, em: 1, "%": 1 },
            "padding-left": { px: 1, em: 1, "%": 1 },
            "page-break-after": {
              auto: 1,
              always: 1,
              avoid: 1,
              left: 1,
              right: 1,
            },
            "page-break-before": {
              auto: 1,
              always: 1,
              avoid: 1,
              left: 1,
              right: 1,
            },
            position: { absolute: 1, relative: 1, fixed: 1, static: 1 },
            right: { px: 1, em: 1, "%": 1 },
            "table-layout": { fixed: 1, auto: 1 },
            "text-decoration": {
              none: 1,
              underline: 1,
              "line-through": 1,
              blink: 1,
            },
            "text-align": { left: 1, right: 1, center: 1, justify: 1 },
            "text-transform": {
              capitalize: 1,
              uppercase: 1,
              lowercase: 1,
              none: 1,
            },
            top: { px: 1, em: 1, "%": 1 },
            "vertical-align": { top: 1, bottom: 1 },
            visibility: { hidden: 1, visible: 1 },
            "white-space": {
              nowrap: 1,
              normal: 1,
              pre: 1,
              "pre-line": 1,
              "pre-wrap": 1,
            },
            width: { px: 1, em: 1, "%": 1 },
            "word-spacing": { normal: 1 },
            filter: { "alpha(opacity=$0100)": 1 },
            "text-shadow": { "$02px 2px 2px #777": 1 },
            "text-overflow": { "ellipsis-word": 1, clip: 1, ellipsis: 1 },
            "-moz-border-radius": 1,
            "-moz-border-radius-topright": 1,
            "-moz-border-radius-bottomright": 1,
            "-moz-border-radius-topleft": 1,
            "-moz-border-radius-bottomleft": 1,
            "-webkit-border-radius": 1,
            "-webkit-border-top-right-radius": 1,
            "-webkit-border-top-left-radius": 1,
            "-webkit-border-bottom-right-radius": 1,
            "-webkit-border-bottom-left-radius": 1,
            "-moz-box-shadow": 1,
            "-webkit-box-shadow": 1,
            transform: { "rotate($00deg)": 1, "skew($00deg)": 1 },
            "-moz-transform": { "rotate($00deg)": 1, "skew($00deg)": 1 },
            "-webkit-transform": { "rotate($00deg)": 1, "skew($00deg)": 1 },
          },
          f = function () {};
        (function () {
          (this.completionsDefined = !1),
            (this.defineCompletions = function () {
              if (document) {
                var g = document.createElement("c").style;
                for (var o in g)
                  if (typeof g[o] == "string") {
                    var l = o.replace(/[A-Z]/g, function (d) {
                      return "-" + d.toLowerCase();
                    });
                    h.hasOwnProperty(l) || (h[l] = 1);
                  }
              }
              this.completionsDefined = !0;
            }),
            (this.getCompletions = function (g, o, l, d) {
              if (
                (this.completionsDefined || this.defineCompletions(),
                g === "ruleset" || o.$mode.$id == "ace/mode/scss")
              ) {
                var r = o.getLine(l.row).substr(0, l.column),
                  s = /\([^)]*$/.test(r);
                return (
                  s && (r = r.substr(r.lastIndexOf("(") + 1)),
                  /:[^;]+$/.test(r)
                    ? (/([\w\-]+):[^:]*$/.test(r),
                      this.getPropertyValueCompletions(g, o, l, d))
                    : this.getPropertyCompletions(g, o, l, d, s)
                );
              }
              return [];
            }),
            (this.getPropertyCompletions = function (g, o, l, d, r) {
              r = r || !1;
              var s = Object.keys(h);
              return s.map(function (i) {
                return {
                  caption: i,
                  snippet: i + ": $0" + (r ? "" : ";"),
                  meta: "property",
                  score: 1e6,
                };
              });
            }),
            (this.getPropertyValueCompletions = function (g, o, l, d) {
              var r = o.getLine(l.row).substr(0, l.column),
                s = (/([\w\-]+):[^:]*$/.exec(r) || {})[1];
              if (!s) return [];
              var i = [];
              return (
                s in h && typeof h[s] == "object" && (i = Object.keys(h[s])),
                i.map(function (t) {
                  return {
                    caption: t,
                    snippet: t,
                    meta: "property value",
                    score: 1e6,
                  };
                })
              );
            });
        }).call(f.prototype),
          (p.CssCompletions = f);
      }
    ),
    ace.define(
      "ace/mode/behaviour/css",
      [
        "require",
        "exports",
        "module",
        "ace/lib/oop",
        "ace/mode/behaviour",
        "ace/mode/behaviour/cstyle",
        "ace/token_iterator",
      ],
      function (c, p, v) {
        var h = c("../../lib/oop");
        c("../behaviour").Behaviour;
        var f = c("./cstyle").CstyleBehaviour,
          g = c("../../token_iterator").TokenIterator,
          o = function () {
            this.inherit(f),
              this.add("colon", "insertion", function (l, d, r, s, i) {
                if (i === ":" && r.selection.isEmpty()) {
                  var t = r.getCursorPosition(),
                    n = new g(s, t.row, t.column),
                    e = n.getCurrentToken();
                  if (
                    (e && e.value.match(/\s+/) && (e = n.stepBackward()),
                    e && e.type === "support.type")
                  ) {
                    var a = s.doc.getLine(t.row),
                      u = a.substring(t.column, t.column + 1);
                    if (u === ":") return { text: "", selection: [1, 1] };
                    if (/^(\s+[^;]|\s*$)/.test(a.substring(t.column)))
                      return { text: ":;", selection: [1, 1] };
                  }
                }
              }),
              this.add("colon", "deletion", function (l, d, r, s, i) {
                var t = s.doc.getTextRange(i);
                if (!i.isMultiLine() && t === ":") {
                  var n = r.getCursorPosition(),
                    e = new g(s, n.row, n.column),
                    a = e.getCurrentToken();
                  if (
                    (a && a.value.match(/\s+/) && (a = e.stepBackward()),
                    a && a.type === "support.type")
                  ) {
                    var u = s.doc.getLine(i.start.row),
                      m = u.substring(i.end.column, i.end.column + 1);
                    if (m === ";") return i.end.column++, i;
                  }
                }
              }),
              this.add("semicolon", "insertion", function (l, d, r, s, i) {
                if (i === ";" && r.selection.isEmpty()) {
                  var t = r.getCursorPosition(),
                    n = s.doc.getLine(t.row),
                    e = n.substring(t.column, t.column + 1);
                  if (e === ";") return { text: "", selection: [1, 1] };
                }
              }),
              this.add("!important", "insertion", function (l, d, r, s, i) {
                if (i === "!" && r.selection.isEmpty()) {
                  var t = r.getCursorPosition(),
                    n = s.doc.getLine(t.row);
                  if (/^\s*(;|}|$)/.test(n.substring(t.column)))
                    return { text: "!important", selection: [10, 10] };
                }
              });
          };
        h.inherits(o, f), (p.CssBehaviour = o);
      }
    ),
    ace.define(
      "ace/mode/css",
      [
        "require",
        "exports",
        "module",
        "ace/lib/oop",
        "ace/mode/text",
        "ace/mode/css_highlight_rules",
        "ace/mode/matching_brace_outdent",
        "ace/worker/worker_client",
        "ace/mode/css_completions",
        "ace/mode/behaviour/css",
        "ace/mode/folding/cstyle",
      ],
      function (c, p, v) {
        var h = c("../lib/oop"),
          f = c("./text").Mode,
          g = c("./css_highlight_rules").CssHighlightRules,
          o = c("./matching_brace_outdent").MatchingBraceOutdent,
          l = c("../worker/worker_client").WorkerClient,
          d = c("./css_completions").CssCompletions,
          r = c("./behaviour/css").CssBehaviour,
          s = c("./folding/cstyle").FoldMode,
          i = function () {
            (this.HighlightRules = g),
              (this.$outdent = new o()),
              (this.$behaviour = new r()),
              (this.$completer = new d()),
              (this.foldingRules = new s());
          };
        h.inherits(i, f),
          function () {
            (this.foldingRules = "cStyle"),
              (this.blockComment = { start: "/*", end: "*/" }),
              (this.getNextLineIndent = function (t, n, e) {
                var a = this.$getIndent(n),
                  u = this.getTokenizer().getLineTokens(n, t).tokens;
                if (u.length && u[u.length - 1].type == "comment") return a;
                var m = n.match(/^.*\{\s*$/);
                return m && (a += e), a;
              }),
              (this.checkOutdent = function (t, n, e) {
                return this.$outdent.checkOutdent(n, e);
              }),
              (this.autoOutdent = function (t, n, e) {
                this.$outdent.autoOutdent(n, e);
              }),
              (this.getCompletions = function (t, n, e, a) {
                return this.$completer.getCompletions(t, n, e, a);
              }),
              (this.createWorker = function (t) {
                var n = new l(["ace"], "ace/mode/css_worker", "Worker");
                return (
                  n.attachToDocument(t.getDocument()),
                  n.on("annotate", function (e) {
                    t.setAnnotations(e.data);
                  }),
                  n.on("terminate", function () {
                    t.clearAnnotations();
                  }),
                  n
                );
              }),
              (this.$id = "ace/mode/css"),
              (this.snippetFileId = "ace/snippets/css");
          }.call(i.prototype),
          (p.Mode = i);
      }
    ),
    ace.define(
      "ace/mode/xml_highlight_rules",
      [
        "require",
        "exports",
        "module",
        "ace/lib/oop",
        "ace/mode/text_highlight_rules",
      ],
      function (c, p, v) {
        var h = c("../lib/oop"),
          f = c("./text_highlight_rules").TextHighlightRules,
          g = function (o) {
            var l = "[_:a-zA-Z\xC0-\uFFFF][-_:.a-zA-Z0-9\xC0-\uFFFF]*";
            (this.$rules = {
              start: [
                {
                  token: "string.cdata.xml",
                  regex: "<\\!\\[CDATA\\[",
                  next: "cdata",
                },
                {
                  token: [
                    "punctuation.instruction.xml",
                    "keyword.instruction.xml",
                  ],
                  regex: "(<\\?)(" + l + ")",
                  next: "processing_instruction",
                },
                {
                  token: "comment.start.xml",
                  regex: "<\\!--",
                  next: "comment",
                },
                {
                  token: ["xml-pe.doctype.xml", "xml-pe.doctype.xml"],
                  regex: "(<\\!)(DOCTYPE)(?=[\\s])",
                  next: "doctype",
                  caseInsensitive: !0,
                },
                { include: "tag" },
                { token: "text.end-tag-open.xml", regex: "</" },
                { token: "text.tag-open.xml", regex: "<" },
                { include: "reference" },
                { defaultToken: "text.xml" },
              ],
              processing_instruction: [
                {
                  token: "entity.other.attribute-name.decl-attribute-name.xml",
                  regex: l,
                },
                {
                  token: "keyword.operator.decl-attribute-equals.xml",
                  regex: "=",
                },
                { include: "whitespace" },
                { include: "string" },
                {
                  token: "punctuation.xml-decl.xml",
                  regex: "\\?>",
                  next: "start",
                },
              ],
              doctype: [
                { include: "whitespace" },
                { include: "string" },
                { token: "xml-pe.doctype.xml", regex: ">", next: "start" },
                { token: "xml-pe.xml", regex: "[-_a-zA-Z0-9:]+" },
                {
                  token: "punctuation.int-subset",
                  regex: "\\[",
                  push: "int_subset",
                },
              ],
              int_subset: [
                { token: "text.xml", regex: "\\s+" },
                {
                  token: "punctuation.int-subset.xml",
                  regex: "]",
                  next: "pop",
                },
                {
                  token: [
                    "punctuation.markup-decl.xml",
                    "keyword.markup-decl.xml",
                  ],
                  regex: "(<\\!)(" + l + ")",
                  push: [
                    { token: "text", regex: "\\s+" },
                    {
                      token: "punctuation.markup-decl.xml",
                      regex: ">",
                      next: "pop",
                    },
                    { include: "string" },
                  ],
                },
              ],
              cdata: [
                { token: "string.cdata.xml", regex: "\\]\\]>", next: "start" },
                { token: "text.xml", regex: "\\s+" },
                { token: "text.xml", regex: "(?:[^\\]]|\\](?!\\]>))+" },
              ],
              comment: [
                { token: "comment.end.xml", regex: "-->", next: "start" },
                { defaultToken: "comment.xml" },
              ],
              reference: [
                {
                  token: "constant.language.escape.reference.xml",
                  regex:
                    "(?:&#[0-9]+;)|(?:&#x[0-9a-fA-F]+;)|(?:&[a-zA-Z0-9_:\\.-]+;)",
                },
              ],
              attr_reference: [
                {
                  token:
                    "constant.language.escape.reference.attribute-value.xml",
                  regex:
                    "(?:&#[0-9]+;)|(?:&#x[0-9a-fA-F]+;)|(?:&[a-zA-Z0-9_:\\.-]+;)",
                },
              ],
              tag: [
                {
                  token: [
                    "meta.tag.punctuation.tag-open.xml",
                    "meta.tag.punctuation.end-tag-open.xml",
                    "meta.tag.tag-name.xml",
                  ],
                  regex: "(?:(<)|(</))((?:" + l + ":)?" + l + ")",
                  next: [
                    { include: "attributes" },
                    {
                      token: "meta.tag.punctuation.tag-close.xml",
                      regex: "/?>",
                      next: "start",
                    },
                  ],
                },
              ],
              tag_whitespace: [
                { token: "text.tag-whitespace.xml", regex: "\\s+" },
              ],
              whitespace: [{ token: "text.whitespace.xml", regex: "\\s+" }],
              string: [
                {
                  token: "string.xml",
                  regex: "'",
                  push: [
                    { token: "string.xml", regex: "'", next: "pop" },
                    { defaultToken: "string.xml" },
                  ],
                },
                {
                  token: "string.xml",
                  regex: '"',
                  push: [
                    { token: "string.xml", regex: '"', next: "pop" },
                    { defaultToken: "string.xml" },
                  ],
                },
              ],
              attributes: [
                { token: "entity.other.attribute-name.xml", regex: l },
                { token: "keyword.operator.attribute-equals.xml", regex: "=" },
                { include: "tag_whitespace" },
                { include: "attribute_value" },
              ],
              attribute_value: [
                {
                  token: "string.attribute-value.xml",
                  regex: "'",
                  push: [
                    {
                      token: "string.attribute-value.xml",
                      regex: "'",
                      next: "pop",
                    },
                    { include: "attr_reference" },
                    { defaultToken: "string.attribute-value.xml" },
                  ],
                },
                {
                  token: "string.attribute-value.xml",
                  regex: '"',
                  push: [
                    {
                      token: "string.attribute-value.xml",
                      regex: '"',
                      next: "pop",
                    },
                    { include: "attr_reference" },
                    { defaultToken: "string.attribute-value.xml" },
                  ],
                },
              ],
            }),
              this.constructor === g && this.normalizeRules();
          };
        (function () {
          this.embedTagRules = function (o, l, d) {
            this.$rules.tag.unshift({
              token: [
                "meta.tag.punctuation.tag-open.xml",
                "meta.tag." + d + ".tag-name.xml",
              ],
              regex: "(<)(" + d + "(?=\\s|>|$))",
              next: [
                { include: "attributes" },
                {
                  token: "meta.tag.punctuation.tag-close.xml",
                  regex: "/?>",
                  next: l + "start",
                },
              ],
            }),
              (this.$rules[d + "-end"] = [
                { include: "attributes" },
                {
                  token: "meta.tag.punctuation.tag-close.xml",
                  regex: "/?>",
                  next: "start",
                  onMatch: function (r, s, i) {
                    return i.splice(0), this.token;
                  },
                },
              ]),
              this.embedRules(o, l, [
                {
                  token: [
                    "meta.tag.punctuation.end-tag-open.xml",
                    "meta.tag." + d + ".tag-name.xml",
                  ],
                  regex: "(</)(" + d + "(?=\\s|>|$))",
                  next: d + "-end",
                },
                { token: "string.cdata.xml", regex: "<\\!\\[CDATA\\[" },
                { token: "string.cdata.xml", regex: "\\]\\]>" },
              ]);
          };
        }).call(f.prototype),
          h.inherits(g, f),
          (p.XmlHighlightRules = g);
      }
    ),
    ace.define(
      "ace/mode/html_highlight_rules",
      [
        "require",
        "exports",
        "module",
        "ace/lib/oop",
        "ace/lib/lang",
        "ace/mode/css_highlight_rules",
        "ace/mode/javascript_highlight_rules",
        "ace/mode/xml_highlight_rules",
      ],
      function (c, p, v) {
        var h = c("../lib/oop"),
          f = c("../lib/lang"),
          g = c("./css_highlight_rules").CssHighlightRules,
          o = c("./javascript_highlight_rules").JavaScriptHighlightRules,
          l = c("./xml_highlight_rules").XmlHighlightRules,
          d = f.createMap({
            a: "anchor",
            button: "form",
            form: "form",
            img: "image",
            input: "form",
            label: "form",
            option: "form",
            script: "script",
            select: "form",
            textarea: "form",
            style: "style",
            table: "table",
            tbody: "table",
            td: "table",
            tfoot: "table",
            th: "table",
            tr: "table",
          }),
          r = function () {
            l.call(this),
              this.addRules({
                attributes: [
                  { include: "tag_whitespace" },
                  {
                    token: "entity.other.attribute-name.xml",
                    regex: "[-_a-zA-Z0-9:.]+",
                  },
                  {
                    token: "keyword.operator.attribute-equals.xml",
                    regex: "=",
                    push: [
                      { include: "tag_whitespace" },
                      {
                        token: "string.unquoted.attribute-value.html",
                        regex: "[^<>='\"`\\s]+",
                        next: "pop",
                      },
                      { token: "empty", regex: "", next: "pop" },
                    ],
                  },
                  { include: "attribute_value" },
                ],
                tag: [
                  {
                    token: function (s, i) {
                      var t = d[i];
                      return [
                        "meta.tag.punctuation." +
                          (s == "<" ? "" : "end-") +
                          "tag-open.xml",
                        "meta.tag" + (t ? "." + t : "") + ".tag-name.xml",
                      ];
                    },
                    regex: "(</?)([-_a-zA-Z0-9:.]+)",
                    next: "tag_stuff",
                  },
                ],
                tag_stuff: [
                  { include: "attributes" },
                  {
                    token: "meta.tag.punctuation.tag-close.xml",
                    regex: "/?>",
                    next: "start",
                  },
                ],
              }),
              this.embedTagRules(g, "css-", "style"),
              this.embedTagRules(
                new o({ jsx: !1 }).getRules(),
                "js-",
                "script"
              ),
              this.constructor === r && this.normalizeRules();
          };
        h.inherits(r, l), (p.HtmlHighlightRules = r);
      }
    ),
    ace.define(
      "ace/mode/behaviour/xml",
      [
        "require",
        "exports",
        "module",
        "ace/lib/oop",
        "ace/mode/behaviour",
        "ace/token_iterator",
        "ace/lib/lang",
      ],
      function (c, p, v) {
        var h = c("../../lib/oop"),
          f = c("../behaviour").Behaviour,
          g = c("../../token_iterator").TokenIterator;
        c("../../lib/lang");
        function o(d, r) {
          return d && d.type.lastIndexOf(r + ".xml") > -1;
        }
        var l = function () {
          this.add("string_dquotes", "insertion", function (d, r, s, i, t) {
            if (t == '"' || t == "'") {
              var n = t,
                e = i.doc.getTextRange(s.getSelectionRange());
              if (
                e !== "" &&
                e !== "'" &&
                e != '"' &&
                s.getWrapBehavioursEnabled()
              )
                return { text: n + e + n, selection: !1 };
              var a = s.getCursorPosition(),
                u = i.doc.getLine(a.row),
                m = u.substring(a.column, a.column + 1),
                x = new g(i, a.row, a.column),
                b = x.getCurrentToken();
              if (m == n && (o(b, "attribute-value") || o(b, "string")))
                return { text: "", selection: [1, 1] };
              if ((b || (b = x.stepBackward()), !b)) return;
              for (; o(b, "tag-whitespace") || o(b, "whitespace"); )
                b = x.stepBackward();
              var k = !m || m.match(/\s/);
              if (
                (o(b, "attribute-equals") && (k || m == ">")) ||
                (o(b, "decl-attribute-equals") && (k || m == "?"))
              )
                return { text: n + n, selection: [1, 1] };
            }
          }),
            this.add("string_dquotes", "deletion", function (d, r, s, i, t) {
              var n = i.doc.getTextRange(t);
              if (!t.isMultiLine() && (n == '"' || n == "'")) {
                var e = i.doc.getLine(t.start.row),
                  a = e.substring(t.start.column + 1, t.start.column + 2);
                if (a == n) return t.end.column++, t;
              }
            }),
            this.add("autoclosing", "insertion", function (d, r, s, i, t) {
              if (t == ">") {
                var n = s.getSelectionRange().start,
                  e = new g(i, n.row, n.column),
                  a = e.getCurrentToken() || e.stepBackward();
                if (
                  !a ||
                  !(
                    o(a, "tag-name") ||
                    o(a, "tag-whitespace") ||
                    o(a, "attribute-name") ||
                    o(a, "attribute-equals") ||
                    o(a, "attribute-value")
                  ) ||
                  o(a, "reference.attribute-value")
                )
                  return;
                if (o(a, "attribute-value")) {
                  var u = e.getCurrentTokenColumn() + a.value.length;
                  if (n.column < u) return;
                  if (n.column == u) {
                    var m = e.stepForward();
                    if (m && o(m, "attribute-value")) return;
                    e.stepBackward();
                  }
                }
                if (/^\s*>/.test(i.getLine(n.row).slice(n.column))) return;
                for (; !o(a, "tag-name"); )
                  if (((a = e.stepBackward()), a.value == "<")) {
                    a = e.stepForward();
                    break;
                  }
                var x = e.getCurrentTokenRow(),
                  b = e.getCurrentTokenColumn();
                if (o(e.stepBackward(), "end-tag-open")) return;
                var k = a.value;
                return (
                  x == n.row && (k = k.substring(0, n.column - b)),
                  this.voidElements.hasOwnProperty(k.toLowerCase())
                    ? void 0
                    : { text: "></" + k + ">", selection: [1, 1] }
                );
              }
            }),
            this.add("autoindent", "insertion", function (d, r, s, i, t) {
              if (
                t ==
                `
`
              ) {
                var n = s.getCursorPosition(),
                  e = i.getLine(n.row),
                  a = new g(i, n.row, n.column),
                  u = a.getCurrentToken();
                if (u && u.type.indexOf("tag-close") !== -1) {
                  if (u.value == "/>") return;
                  for (; u && u.type.indexOf("tag-name") === -1; )
                    u = a.stepBackward();
                  if (!u) return;
                  var m = u.value,
                    x = a.getCurrentTokenRow();
                  if (
                    ((u = a.stepBackward()),
                    !u || u.type.indexOf("end-tag") !== -1)
                  )
                    return;
                  if (this.voidElements && !this.voidElements[m]) {
                    var b = i.getTokenAt(n.row, n.column + 1),
                      e = i.getLine(x),
                      k = this.$getIndent(e),
                      w = k + i.getTabString();
                    return b && b.value === "</"
                      ? {
                          text:
                            `
` +
                            w +
                            `
` +
                            k,
                          selection: [1, w.length, 1, w.length],
                        }
                      : {
                          text:
                            `
` + w,
                        };
                  }
                }
              }
            });
        };
        h.inherits(l, f), (p.XmlBehaviour = l);
      }
    ),
    ace.define(
      "ace/mode/folding/mixed",
      [
        "require",
        "exports",
        "module",
        "ace/lib/oop",
        "ace/mode/folding/fold_mode",
      ],
      function (c, p, v) {
        var h = c("../../lib/oop"),
          f = c("./fold_mode").FoldMode,
          g = (p.FoldMode = function (o, l) {
            (this.defaultMode = o), (this.subModes = l);
          });
        h.inherits(g, f),
          function () {
            (this.$getMode = function (o) {
              typeof o != "string" && (o = o[0]);
              for (var l in this.subModes)
                if (o.indexOf(l) === 0) return this.subModes[l];
              return null;
            }),
              (this.$tryMode = function (o, l, d, r) {
                var s = this.$getMode(o);
                return s ? s.getFoldWidget(l, d, r) : "";
              }),
              (this.getFoldWidget = function (o, l, d) {
                return (
                  this.$tryMode(o.getState(d - 1), o, l, d) ||
                  this.$tryMode(o.getState(d), o, l, d) ||
                  this.defaultMode.getFoldWidget(o, l, d)
                );
              }),
              (this.getFoldWidgetRange = function (o, l, d) {
                var r = this.$getMode(o.getState(d - 1));
                return (
                  (!r || !r.getFoldWidget(o, l, d)) &&
                    (r = this.$getMode(o.getState(d))),
                  (!r || !r.getFoldWidget(o, l, d)) && (r = this.defaultMode),
                  r.getFoldWidgetRange(o, l, d)
                );
              });
          }.call(g.prototype);
      }
    ),
    ace.define(
      "ace/mode/folding/xml",
      [
        "require",
        "exports",
        "module",
        "ace/lib/oop",
        "ace/range",
        "ace/mode/folding/fold_mode",
      ],
      function (c, p, v) {
        var h = c("../../lib/oop"),
          f = c("../../range").Range,
          g = c("./fold_mode").FoldMode,
          o = (p.FoldMode = function (r, s) {
            g.call(this),
              (this.voidElements = r || {}),
              (this.optionalEndTags = h.mixin({}, this.voidElements)),
              s && h.mixin(this.optionalEndTags, s);
          });
        h.inherits(o, g);
        var l = function () {
          (this.tagName = ""),
            (this.closing = !1),
            (this.selfClosing = !1),
            (this.start = { row: 0, column: 0 }),
            (this.end = { row: 0, column: 0 });
        };
        function d(r, s) {
          return r.type.lastIndexOf(s + ".xml") > -1;
        }
        (function () {
          (this.getFoldWidget = function (r, s, i) {
            var t = this._getFirstTagInLine(r, i);
            return t
              ? t.closing || (!t.tagName && t.selfClosing)
                ? s === "markbeginend"
                  ? "end"
                  : ""
                : !t.tagName ||
                  t.selfClosing ||
                  this.voidElements.hasOwnProperty(t.tagName.toLowerCase()) ||
                  this._findEndTagInLine(r, i, t.tagName, t.end.column)
                ? ""
                : "start"
              : this.getCommentFoldWidget(r, i);
          }),
            (this.getCommentFoldWidget = function (r, s) {
              return /comment/.test(r.getState(s)) && /<!-/.test(r.getLine(s))
                ? "start"
                : "";
            }),
            (this._getFirstTagInLine = function (r, s) {
              for (
                var i = r.getTokens(s), t = new l(), n = 0;
                n < i.length;
                n++
              ) {
                var e = i[n];
                if (d(e, "tag-open")) {
                  if (
                    ((t.end.column = t.start.column + e.value.length),
                    (t.closing = d(e, "end-tag-open")),
                    (e = i[++n]),
                    !e)
                  )
                    return null;
                  for (
                    t.tagName = e.value, t.end.column += e.value.length, n++;
                    n < i.length;
                    n++
                  )
                    if (
                      ((e = i[n]),
                      (t.end.column += e.value.length),
                      d(e, "tag-close"))
                    ) {
                      t.selfClosing = e.value == "/>";
                      break;
                    }
                  return t;
                } else if (d(e, "tag-close"))
                  return (t.selfClosing = e.value == "/>"), t;
                t.start.column += e.value.length;
              }
              return null;
            }),
            (this._findEndTagInLine = function (r, s, i, t) {
              for (var n = r.getTokens(s), e = 0, a = 0; a < n.length; a++) {
                var u = n[a];
                if (
                  ((e += u.value.length),
                  !(e < t) &&
                    d(u, "end-tag-open") &&
                    ((u = n[a + 1]), u && u.value == i))
                )
                  return !0;
              }
              return !1;
            }),
            (this.getFoldWidgetRange = function (r, s, i) {
              var t = r.getMatchingTags({ row: i, column: 0 });
              return t
                ? new f(
                    t.openTag.end.row,
                    t.openTag.end.column,
                    t.closeTag.start.row,
                    t.closeTag.start.column
                  )
                : this.getCommentFoldWidget(r, i) &&
                    r.getCommentFoldRange(i, r.getLine(i).length);
            });
        }).call(o.prototype);
      }
    ),
    ace.define(
      "ace/mode/folding/html",
      [
        "require",
        "exports",
        "module",
        "ace/lib/oop",
        "ace/mode/folding/mixed",
        "ace/mode/folding/xml",
        "ace/mode/folding/cstyle",
      ],
      function (c, p, v) {
        var h = c("../../lib/oop"),
          f = c("./mixed").FoldMode,
          g = c("./xml").FoldMode,
          o = c("./cstyle").FoldMode,
          l = (p.FoldMode = function (d, r) {
            f.call(this, new g(d, r), { "js-": new o(), "css-": new o() });
          });
        h.inherits(l, f);
      }
    ),
    ace.define(
      "ace/mode/html_completions",
      ["require", "exports", "module", "ace/token_iterator"],
      function (c, p, v) {
        var h = c("../token_iterator").TokenIterator,
          f = [
            "accesskey",
            "class",
            "contenteditable",
            "contextmenu",
            "dir",
            "draggable",
            "dropzone",
            "hidden",
            "id",
            "inert",
            "itemid",
            "itemprop",
            "itemref",
            "itemscope",
            "itemtype",
            "lang",
            "spellcheck",
            "style",
            "tabindex",
            "title",
            "translate",
          ],
          g = [
            "onabort",
            "onblur",
            "oncancel",
            "oncanplay",
            "oncanplaythrough",
            "onchange",
            "onclick",
            "onclose",
            "oncontextmenu",
            "oncuechange",
            "ondblclick",
            "ondrag",
            "ondragend",
            "ondragenter",
            "ondragleave",
            "ondragover",
            "ondragstart",
            "ondrop",
            "ondurationchange",
            "onemptied",
            "onended",
            "onerror",
            "onfocus",
            "oninput",
            "oninvalid",
            "onkeydown",
            "onkeypress",
            "onkeyup",
            "onload",
            "onloadeddata",
            "onloadedmetadata",
            "onloadstart",
            "onmousedown",
            "onmousemove",
            "onmouseout",
            "onmouseover",
            "onmouseup",
            "onmousewheel",
            "onpause",
            "onplay",
            "onplaying",
            "onprogress",
            "onratechange",
            "onreset",
            "onscroll",
            "onseeked",
            "onseeking",
            "onselect",
            "onshow",
            "onstalled",
            "onsubmit",
            "onsuspend",
            "ontimeupdate",
            "onvolumechange",
            "onwaiting",
          ],
          o = f.concat(g),
          l = {
            a: {
              href: 1,
              target: { _blank: 1, top: 1 },
              ping: 1,
              rel: {
                nofollow: 1,
                alternate: 1,
                author: 1,
                bookmark: 1,
                help: 1,
                license: 1,
                next: 1,
                noreferrer: 1,
                prefetch: 1,
                prev: 1,
                search: 1,
                tag: 1,
              },
              media: 1,
              hreflang: 1,
              type: 1,
            },
            abbr: {},
            address: {},
            area: {
              shape: 1,
              coords: 1,
              href: 1,
              hreflang: 1,
              alt: 1,
              target: 1,
              media: 1,
              rel: 1,
              ping: 1,
              type: 1,
            },
            article: { pubdate: 1 },
            aside: {},
            audio: {
              src: 1,
              autobuffer: 1,
              autoplay: { autoplay: 1 },
              loop: { loop: 1 },
              controls: { controls: 1 },
              muted: { muted: 1 },
              preload: { auto: 1, metadata: 1, none: 1 },
            },
            b: {},
            base: { href: 1, target: 1 },
            bdi: {},
            bdo: {},
            blockquote: { cite: 1 },
            body: {
              onafterprint: 1,
              onbeforeprint: 1,
              onbeforeunload: 1,
              onhashchange: 1,
              onmessage: 1,
              onoffline: 1,
              onpopstate: 1,
              onredo: 1,
              onresize: 1,
              onstorage: 1,
              onundo: 1,
              onunload: 1,
            },
            br: {},
            button: {
              autofocus: 1,
              disabled: { disabled: 1 },
              form: 1,
              formaction: 1,
              formenctype: 1,
              formmethod: 1,
              formnovalidate: 1,
              formtarget: 1,
              name: 1,
              value: 1,
              type: { button: 1, submit: 1 },
            },
            canvas: { width: 1, height: 1 },
            caption: {},
            cite: {},
            code: {},
            col: { span: 1 },
            colgroup: { span: 1 },
            command: {
              type: 1,
              label: 1,
              icon: 1,
              disabled: 1,
              checked: 1,
              radiogroup: 1,
              command: 1,
            },
            data: {},
            datalist: {},
            dd: {},
            del: { cite: 1, datetime: 1 },
            details: { open: 1 },
            dfn: {},
            dialog: { open: 1 },
            div: {},
            dl: {},
            dt: {},
            em: {},
            embed: { src: 1, height: 1, width: 1, type: 1 },
            fieldset: { disabled: 1, form: 1, name: 1 },
            figcaption: {},
            figure: {},
            footer: {},
            form: {
              "accept-charset": 1,
              action: 1,
              autocomplete: 1,
              enctype: {
                "multipart/form-data": 1,
                "application/x-www-form-urlencoded": 1,
              },
              method: { get: 1, post: 1 },
              name: 1,
              novalidate: 1,
              target: { _blank: 1, top: 1 },
            },
            h1: {},
            h2: {},
            h3: {},
            h4: {},
            h5: {},
            h6: {},
            head: {},
            header: {},
            hr: {},
            html: { manifest: 1 },
            i: {},
            iframe: {
              name: 1,
              src: 1,
              height: 1,
              width: 1,
              sandbox: {
                "allow-same-origin": 1,
                "allow-top-navigation": 1,
                "allow-forms": 1,
                "allow-scripts": 1,
              },
              seamless: { seamless: 1 },
            },
            img: { alt: 1, src: 1, height: 1, width: 1, usemap: 1, ismap: 1 },
            input: {
              type: {
                text: 1,
                password: 1,
                hidden: 1,
                checkbox: 1,
                submit: 1,
                radio: 1,
                file: 1,
                button: 1,
                reset: 1,
                image: 31,
                color: 1,
                date: 1,
                datetime: 1,
                "datetime-local": 1,
                email: 1,
                month: 1,
                number: 1,
                range: 1,
                search: 1,
                tel: 1,
                time: 1,
                url: 1,
                week: 1,
              },
              accept: 1,
              alt: 1,
              autocomplete: { on: 1, off: 1 },
              autofocus: { autofocus: 1 },
              checked: { checked: 1 },
              disabled: { disabled: 1 },
              form: 1,
              formaction: 1,
              formenctype: {
                "application/x-www-form-urlencoded": 1,
                "multipart/form-data": 1,
                "text/plain": 1,
              },
              formmethod: { get: 1, post: 1 },
              formnovalidate: { formnovalidate: 1 },
              formtarget: { _blank: 1, _self: 1, _parent: 1, _top: 1 },
              height: 1,
              list: 1,
              max: 1,
              maxlength: 1,
              min: 1,
              multiple: { multiple: 1 },
              name: 1,
              pattern: 1,
              placeholder: 1,
              readonly: { readonly: 1 },
              required: { required: 1 },
              size: 1,
              src: 1,
              step: 1,
              width: 1,
              files: 1,
              value: 1,
            },
            ins: { cite: 1, datetime: 1 },
            kbd: {},
            keygen: {
              autofocus: 1,
              challenge: { challenge: 1 },
              disabled: { disabled: 1 },
              form: 1,
              keytype: { rsa: 1, dsa: 1, ec: 1 },
              name: 1,
            },
            label: { form: 1, for: 1 },
            legend: {},
            li: { value: 1 },
            link: {
              href: 1,
              hreflang: 1,
              rel: { stylesheet: 1, icon: 1 },
              media: { all: 1, screen: 1, print: 1 },
              type: {
                "text/css": 1,
                "image/png": 1,
                "image/jpeg": 1,
                "image/gif": 1,
              },
              sizes: 1,
            },
            main: {},
            map: { name: 1 },
            mark: {},
            math: {},
            menu: { type: 1, label: 1 },
            meta: {
              "http-equiv": { "content-type": 1 },
              name: { description: 1, keywords: 1 },
              content: { "text/html; charset=UTF-8": 1 },
              charset: 1,
            },
            meter: { value: 1, min: 1, max: 1, low: 1, high: 1, optimum: 1 },
            nav: {},
            noscript: { href: 1 },
            object: {
              param: 1,
              data: 1,
              type: 1,
              height: 1,
              width: 1,
              usemap: 1,
              name: 1,
              form: 1,
              classid: 1,
            },
            ol: { start: 1, reversed: 1 },
            optgroup: { disabled: 1, label: 1 },
            option: { disabled: 1, selected: 1, label: 1, value: 1 },
            output: { for: 1, form: 1, name: 1 },
            p: {},
            param: { name: 1, value: 1 },
            pre: {},
            progress: { value: 1, max: 1 },
            q: { cite: 1 },
            rp: {},
            rt: {},
            ruby: {},
            s: {},
            samp: {},
            script: {
              charset: 1,
              type: { "text/javascript": 1 },
              src: 1,
              defer: 1,
              async: 1,
            },
            select: {
              autofocus: 1,
              disabled: 1,
              form: 1,
              multiple: { multiple: 1 },
              name: 1,
              size: 1,
              readonly: { readonly: 1 },
            },
            small: {},
            source: { src: 1, type: 1, media: 1 },
            span: {},
            strong: {},
            style: {
              type: 1,
              media: { all: 1, screen: 1, print: 1 },
              scoped: 1,
            },
            sub: {},
            sup: {},
            svg: {},
            table: { summary: 1 },
            tbody: {},
            td: { headers: 1, rowspan: 1, colspan: 1 },
            textarea: {
              autofocus: { autofocus: 1 },
              disabled: { disabled: 1 },
              form: 1,
              maxlength: 1,
              name: 1,
              placeholder: 1,
              readonly: { readonly: 1 },
              required: { required: 1 },
              rows: 1,
              cols: 1,
              wrap: { on: 1, off: 1, hard: 1, soft: 1 },
            },
            tfoot: {},
            th: { headers: 1, rowspan: 1, colspan: 1, scope: 1 },
            thead: {},
            time: { datetime: 1 },
            title: {},
            tr: {},
            track: { kind: 1, src: 1, srclang: 1, label: 1, default: 1 },
            section: {},
            summary: {},
            u: {},
            ul: {},
            var: {},
            video: {
              src: 1,
              autobuffer: 1,
              autoplay: { autoplay: 1 },
              loop: { loop: 1 },
              controls: { controls: 1 },
              width: 1,
              height: 1,
              poster: 1,
              muted: { muted: 1 },
              preload: { auto: 1, metadata: 1, none: 1 },
            },
            wbr: {},
          },
          d = Object.keys(l);
        function r(n, e) {
          return n.type.lastIndexOf(e + ".xml") > -1;
        }
        function s(n, e) {
          for (
            var a = new h(n, e.row, e.column), u = a.getCurrentToken();
            u && !r(u, "tag-name");

          )
            u = a.stepBackward();
          if (u) return u.value;
        }
        function i(n, e) {
          for (
            var a = new h(n, e.row, e.column), u = a.getCurrentToken();
            u && !r(u, "attribute-name");

          )
            u = a.stepBackward();
          if (u) return u.value;
        }
        var t = function () {};
        (function () {
          (this.getCompletions = function (n, e, a, u) {
            var m = e.getTokenAt(a.row, a.column);
            if (!m) return [];
            if (r(m, "tag-name") || r(m, "tag-open") || r(m, "end-tag-open"))
              return this.getTagCompletions(n, e, a, u);
            if (r(m, "tag-whitespace") || r(m, "attribute-name"))
              return this.getAttributeCompletions(n, e, a, u);
            if (r(m, "attribute-value"))
              return this.getAttributeValueCompletions(n, e, a, u);
            var x = e.getLine(a.row).substr(0, a.column);
            return /&[a-z]*$/i.test(x)
              ? this.getHTMLEntityCompletions(n, e, a, u)
              : [];
          }),
            (this.getTagCompletions = function (n, e, a, u) {
              return d.map(function (m) {
                return { value: m, meta: "tag", score: 1e6 };
              });
            }),
            (this.getAttributeCompletions = function (n, e, a, u) {
              var m = s(e, a);
              if (!m) return [];
              var x = o;
              return (
                m in l && (x = x.concat(Object.keys(l[m]))),
                x.map(function (b) {
                  return {
                    caption: b,
                    snippet: b + '="$0"',
                    meta: "attribute",
                    score: 1e6,
                  };
                })
              );
            }),
            (this.getAttributeValueCompletions = function (n, e, a, u) {
              var m = s(e, a),
                x = i(e, a);
              if (!m) return [];
              var b = [];
              return (
                m in l &&
                  x in l[m] &&
                  typeof l[m][x] == "object" &&
                  (b = Object.keys(l[m][x])),
                b.map(function (k) {
                  return {
                    caption: k,
                    snippet: k,
                    meta: "attribute value",
                    score: 1e6,
                  };
                })
              );
            }),
            (this.getHTMLEntityCompletions = function (n, e, a, u) {
              var m = [
                "Aacute;",
                "aacute;",
                "Acirc;",
                "acirc;",
                "acute;",
                "AElig;",
                "aelig;",
                "Agrave;",
                "agrave;",
                "alefsym;",
                "Alpha;",
                "alpha;",
                "amp;",
                "and;",
                "ang;",
                "Aring;",
                "aring;",
                "asymp;",
                "Atilde;",
                "atilde;",
                "Auml;",
                "auml;",
                "bdquo;",
                "Beta;",
                "beta;",
                "brvbar;",
                "bull;",
                "cap;",
                "Ccedil;",
                "ccedil;",
                "cedil;",
                "cent;",
                "Chi;",
                "chi;",
                "circ;",
                "clubs;",
                "cong;",
                "copy;",
                "crarr;",
                "cup;",
                "curren;",
                "Dagger;",
                "dagger;",
                "dArr;",
                "darr;",
                "deg;",
                "Delta;",
                "delta;",
                "diams;",
                "divide;",
                "Eacute;",
                "eacute;",
                "Ecirc;",
                "ecirc;",
                "Egrave;",
                "egrave;",
                "empty;",
                "emsp;",
                "ensp;",
                "Epsilon;",
                "epsilon;",
                "equiv;",
                "Eta;",
                "eta;",
                "ETH;",
                "eth;",
                "Euml;",
                "euml;",
                "euro;",
                "exist;",
                "fnof;",
                "forall;",
                "frac12;",
                "frac14;",
                "frac34;",
                "frasl;",
                "Gamma;",
                "gamma;",
                "ge;",
                "gt;",
                "hArr;",
                "harr;",
                "hearts;",
                "hellip;",
                "Iacute;",
                "iacute;",
                "Icirc;",
                "icirc;",
                "iexcl;",
                "Igrave;",
                "igrave;",
                "image;",
                "infin;",
                "int;",
                "Iota;",
                "iota;",
                "iquest;",
                "isin;",
                "Iuml;",
                "iuml;",
                "Kappa;",
                "kappa;",
                "Lambda;",
                "lambda;",
                "lang;",
                "laquo;",
                "lArr;",
                "larr;",
                "lceil;",
                "ldquo;",
                "le;",
                "lfloor;",
                "lowast;",
                "loz;",
                "lrm;",
                "lsaquo;",
                "lsquo;",
                "lt;",
                "macr;",
                "mdash;",
                "micro;",
                "middot;",
                "minus;",
                "Mu;",
                "mu;",
                "nabla;",
                "nbsp;",
                "ndash;",
                "ne;",
                "ni;",
                "not;",
                "notin;",
                "nsub;",
                "Ntilde;",
                "ntilde;",
                "Nu;",
                "nu;",
                "Oacute;",
                "oacute;",
                "Ocirc;",
                "ocirc;",
                "OElig;",
                "oelig;",
                "Ograve;",
                "ograve;",
                "oline;",
                "Omega;",
                "omega;",
                "Omicron;",
                "omicron;",
                "oplus;",
                "or;",
                "ordf;",
                "ordm;",
                "Oslash;",
                "oslash;",
                "Otilde;",
                "otilde;",
                "otimes;",
                "Ouml;",
                "ouml;",
                "para;",
                "part;",
                "permil;",
                "perp;",
                "Phi;",
                "phi;",
                "Pi;",
                "pi;",
                "piv;",
                "plusmn;",
                "pound;",
                "Prime;",
                "prime;",
                "prod;",
                "prop;",
                "Psi;",
                "psi;",
                "quot;",
                "radic;",
                "rang;",
                "raquo;",
                "rArr;",
                "rarr;",
                "rceil;",
                "rdquo;",
                "real;",
                "reg;",
                "rfloor;",
                "Rho;",
                "rho;",
                "rlm;",
                "rsaquo;",
                "rsquo;",
                "sbquo;",
                "Scaron;",
                "scaron;",
                "sdot;",
                "sect;",
                "shy;",
                "Sigma;",
                "sigma;",
                "sigmaf;",
                "sim;",
                "spades;",
                "sub;",
                "sube;",
                "sum;",
                "sup;",
                "sup1;",
                "sup2;",
                "sup3;",
                "supe;",
                "szlig;",
                "Tau;",
                "tau;",
                "there4;",
                "Theta;",
                "theta;",
                "thetasym;",
                "thinsp;",
                "THORN;",
                "thorn;",
                "tilde;",
                "times;",
                "trade;",
                "Uacute;",
                "uacute;",
                "uArr;",
                "uarr;",
                "Ucirc;",
                "ucirc;",
                "Ugrave;",
                "ugrave;",
                "uml;",
                "upsih;",
                "Upsilon;",
                "upsilon;",
                "Uuml;",
                "uuml;",
                "weierp;",
                "Xi;",
                "xi;",
                "Yacute;",
                "yacute;",
                "yen;",
                "Yuml;",
                "yuml;",
                "Zeta;",
                "zeta;",
                "zwj;",
                "zwnj;",
              ];
              return m.map(function (x) {
                return {
                  caption: x,
                  snippet: x,
                  meta: "html entity",
                  score: 1e6,
                };
              });
            });
        }).call(t.prototype),
          (p.HtmlCompletions = t);
      }
    ),
    ace.define(
      "ace/mode/html",
      [
        "require",
        "exports",
        "module",
        "ace/lib/oop",
        "ace/lib/lang",
        "ace/mode/text",
        "ace/mode/javascript",
        "ace/mode/css",
        "ace/mode/html_highlight_rules",
        "ace/mode/behaviour/xml",
        "ace/mode/folding/html",
        "ace/mode/html_completions",
        "ace/worker/worker_client",
      ],
      function (c, p, v) {
        var h = c("../lib/oop"),
          f = c("../lib/lang"),
          g = c("./text").Mode,
          o = c("./javascript").Mode,
          l = c("./css").Mode,
          d = c("./html_highlight_rules").HtmlHighlightRules,
          r = c("./behaviour/xml").XmlBehaviour,
          s = c("./folding/html").FoldMode,
          i = c("./html_completions").HtmlCompletions,
          t = c("../worker/worker_client").WorkerClient,
          n = [
            "area",
            "base",
            "br",
            "col",
            "embed",
            "hr",
            "img",
            "input",
            "keygen",
            "link",
            "meta",
            "menuitem",
            "param",
            "source",
            "track",
            "wbr",
          ],
          e = [
            "li",
            "dt",
            "dd",
            "p",
            "rt",
            "rp",
            "optgroup",
            "option",
            "colgroup",
            "td",
            "th",
          ],
          a = function (u) {
            (this.fragmentContext = u && u.fragmentContext),
              (this.HighlightRules = d),
              (this.$behaviour = new r()),
              (this.$completer = new i()),
              this.createModeDelegates({ "js-": o, "css-": l }),
              (this.foldingRules = new s(this.voidElements, f.arrayToMap(e)));
          };
        h.inherits(a, g),
          function () {
            (this.blockComment = { start: "<!--", end: "-->" }),
              (this.voidElements = f.arrayToMap(n)),
              (this.getNextLineIndent = function (u, m, x) {
                return this.$getIndent(m);
              }),
              (this.checkOutdent = function (u, m, x) {
                return !1;
              }),
              (this.getCompletions = function (u, m, x, b) {
                return this.$completer.getCompletions(u, m, x, b);
              }),
              (this.createWorker = function (u) {
                if (this.constructor == a) {
                  var m = new t(["ace"], "ace/mode/html_worker", "Worker");
                  return (
                    m.attachToDocument(u.getDocument()),
                    this.fragmentContext &&
                      m.call("setOptions", [{ context: this.fragmentContext }]),
                    m.on("error", function (x) {
                      u.setAnnotations(x.data);
                    }),
                    m.on("terminate", function () {
                      u.clearAnnotations();
                    }),
                    m
                  );
                }
              }),
              (this.$id = "ace/mode/html"),
              (this.snippetFileId = "ace/snippets/html");
          }.call(a.prototype),
          (p.Mode = a);
      }
    ),
    (function () {
      ace.require(["ace/mode/html"], function (c) {
        y && (y.exports = c);
      });
    })();
})(C);
const R = C.exports,
  M = T({ __proto__: null, default: R }, [C.exports]);
export { M as m };
//# sourceMappingURL=mode-html.465d4c71.js.map
