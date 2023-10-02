var p = (s, e, l) =>
  new Promise((n, i) => {
    var t = (a) => {
        try {
          r(l.next(a));
        } catch (d) {
          i(d);
        }
      },
      o = (a) => {
        try {
          r(l.throw(a));
        } catch (d) {
          i(d);
        }
      },
      r = (a) => (a.done ? n(a.value) : Promise.resolve(a.value).then(t, o));
    r((l = l.apply(s, e)).next());
  });
import { F as u } from "./fileUploadHandler.147d8a7e.js";
import {
  _ as h,
  o as c,
  b as f,
  d as g,
  a as m,
  n as F,
  g as _,
} from "./index.e448aea1.js";
const v = {
    name: "FileUploader",
    props: ["fileTypes", "uploadArgs", "validateFile"],
    data() {
      return {
        uploader: null,
        uploading: !1,
        uploaded: 0,
        error: null,
        message: "",
        total: 0,
        file: null,
        finishedUploading: !1,
      };
    },
    computed: {
      progress() {
        let s = Math.floor((this.uploaded / this.total) * 100);
        return isNaN(s) ? 0 : s;
      },
      success() {
        return this.finishedUploading && !this.error;
      },
    },
    methods: {
      openFileSelector() {
        this.$refs.input.click();
      },
      onFileAdd(s) {
        return p(this, null, function* () {
          if (
            ((this.error = null),
            (this.file = s.target.files[0]),
            this.file && this.validateFile)
          )
            try {
              let e = yield this.validateFile(this.file);
              e && (this.error = e);
            } catch (e) {
              this.error = e;
            }
          this.error || this.uploadFile(this.file);
        });
      },
      uploadFile(s) {
        return p(this, null, function* () {
          (this.error = null),
            (this.uploaded = 0),
            (this.total = 0),
            (this.uploader = new u()),
            this.uploader.on("start", () => {
              this.uploading = !0;
            }),
            this.uploader.on("progress", (e) => {
              (this.uploaded = e.uploaded), (this.total = e.total);
            }),
            this.uploader.on("error", () => {
              (this.uploading = !1), (this.error = "Error Uploading File");
            }),
            this.uploader.on("finish", () => {
              (this.uploading = !1), (this.finishedUploading = !0);
            }),
            this.uploader
              .upload(s, this.uploadArgs || {})
              .then((e) => {
                this.$emit("success", e);
              })
              .catch((e) => {
                this.uploading = !1;
                let l = "Error Uploading File";
                e != null && e._server_messages
                  ? (l = JSON.parse(JSON.parse(e._server_messages)[0]).message)
                  : e != null &&
                    e.exc &&
                    (l = JSON.parse(e.exc)[0]
                      .split(
                        `
`
                      )
                      .slice(-2, -1)[0]),
                  (this.error = l),
                  this.$emit("failure", e);
              });
        });
      },
    },
  },
  U = ["accept"];
function S(s, e, l, n, i, t) {
  return (
    c(),
    f("div", null, [
      g(
        "input",
        {
          ref: "input",
          type: "file",
          accept: l.fileTypes,
          class: "hidden",
          onChange: e[0] || (e[0] = (...o) => t.onFileAdd && t.onFileAdd(...o)),
        },
        null,
        40,
        U
      ),
      m(
        s.$slots,
        "default",
        F(
          _({
            file: i.file,
            uploading: i.uploading,
            progress: t.progress,
            uploaded: i.uploaded,
            message: i.message,
            error: i.error,
            total: i.total,
            success: t.success,
            openFileSelector: t.openFileSelector,
          })
        )
      ),
    ])
  );
}
const x = h(v, [["render", S]]);
export { x as F };
//# sourceMappingURL=FileUploader.8b3e0f39.js.map
