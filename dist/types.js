"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EUVatError = exports.Status = void 0;
var Status;
(function (Status) {
    Status["SUCCESS"] = "success";
    Status["ERROR"] = "error";
})(Status = exports.Status || (exports.Status = {}));
var EUVatError;
(function (EUVatError) {
    EUVatError["INVALID_EU_CODE"] = "INVALID_EU_CODE";
    EUVatError["INVALID_VAT_NUMBER"] = "INVALID_VAT_NUMBER";
    EUVatError["SERVER_ERROR"] = "SERVER_ERROR";
    EUVatError["PARSE_ERROR"] = "PARSE_ERROR";
})(EUVatError = exports.EUVatError || (exports.EUVatError = {}));
