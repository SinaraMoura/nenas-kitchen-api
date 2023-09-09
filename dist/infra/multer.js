"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/infra/multer.ts
var multer_exports = {};
__export(multer_exports, {
  upload: () => upload
});
module.exports = __toCommonJS(multer_exports);
var import_multer = __toESM(require("multer"));
var import_node_crypto = __toESM(require("crypto"));
var import_path = __toESM(require("path"));
var import_fs = __toESM(require("fs"));
var pathName = import_path.default.resolve(__dirname, "tmp", "uploads");
if (!import_fs.default.existsSync(pathName)) {
  import_fs.default.mkdirSync(pathName, { recursive: true });
}
var upload = (0, import_multer.default)({
  dest: pathName,
  limits: { fileSize: 1024 * 1024 * 20 },
  storage: import_multer.default.diskStorage({
    destination(req, file, callback) {
      callback(null, pathName);
    },
    filename(req, file, callback) {
      const fileName = `${import_node_crypto.default.randomBytes(20).toString("hex")}${file.originalname}`;
      callback(null, fileName);
    }
  })
});
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  upload
});
