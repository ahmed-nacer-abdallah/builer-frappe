var c = Object.defineProperty;
var h = (d, t, e) =>
  t in d
    ? c(d, t, { enumerable: !0, configurable: !0, writable: !0, value: e })
    : (d[t] = e);
var i = (d, t, e) => (h(d, typeof t != "symbol" ? t + "" : t, e), e);
class g {
  constructor() {
    i(this, "listeners");
    i(this, "failed");
    (this.listeners = {}), (this.failed = !1);
  }
  on(t, e) {
    (this.listeners[t] = this.listeners[t] || []), this.listeners[t].push(e);
  }
  trigger(t, e) {
    (this.listeners[t] || []).forEach((n) => {
      n.call(this, e);
    });
  }
  upload(t, e) {
    return new Promise((p, n) => {
      let r = new XMLHttpRequest();
      r.upload.addEventListener("loadstart", () => {
        this.trigger("start");
      }),
        r.upload.addEventListener("progress", (s) => {
          s.lengthComputable &&
            this.trigger("progress", { uploaded: s.loaded, total: s.total });
        }),
        r.upload.addEventListener("load", () => {
          this.trigger("finish");
        }),
        r.addEventListener("error", () => {
          this.trigger("error"), n();
        }),
        (r.onreadystatechange = () => {
          if (r.readyState == XMLHttpRequest.DONE) {
            let s;
            if (r.status === 200) {
              let l = null;
              try {
                l = JSON.parse(r.responseText);
              } catch (u) {
                l = r.responseText;
              }
              let f = l.message || l;
              p(f);
            } else if (r.status === 403) s = JSON.parse(r.responseText);
            else {
              this.failed = !0;
              try {
                s = JSON.parse(r.responseText);
              } catch (l) {}
            }
            s && s.exc && console.error(JSON.parse(s.exc)[0]), n(s);
          }
        });
      const o = e.upload_endpoint || "/api/method/upload_file";
      r.open("POST", o, !0),
        r.setRequestHeader("Accept", "application/json"),
        window.csrf_token &&
          window.csrf_token !== "{{ csrf_token }}" &&
          r.setRequestHeader("X-Frappe-CSRF-Token", window.csrf_token);
      let a = new FormData();
      t && a.append("file", t, t.name),
        a.append("is_private", e.private ? "1" : "0"),
        a.append("folder", e.folder || "Home"),
        e.file_url && a.append("file_url", e.file_url),
        e.doctype &&
          e.docname &&
          (a.append("doctype", e.doctype),
          a.append("docname", e.docname),
          e.fieldname && a.append("fieldname", e.fieldname)),
        e.method && a.append("method", e.method),
        e.type && a.append("type", e.type),
        r.send(a);
    });
  }
}
export { g as F };
//# sourceMappingURL=fileUploadHandler.147d8a7e.js.map
