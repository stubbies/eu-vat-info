"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseResponse = exports.ErrorResponse = exports.validateVatNumber = void 0;
const types_1 = require("./types");
const validateVatNumber = (vat) => {
    const patt = /^([a-zA-Z0-9_-]){8,12}$/g;
    return patt.test(vat.replace(/[^A-Z0-9]/ig, ""));
};
exports.validateVatNumber = validateVatNumber;
const ErrorResponse = (n, m) => {
    return {
        status: types_1.Status.ERROR,
        error: {
            name: n,
            message: m
        }
    };
};
exports.ErrorResponse = ErrorResponse;
const parseResponse = (json) => {
    let obj = json['soap:Envelope']['soap:Body']['checkVatApproxResponse'];
    let _r = new Set(['_attributes', 'requestIdentifier']);
    Object.keys(obj)
        .forEach((k) => {
        if (_r.has(k))
            delete obj[k];
        else
            obj[k] = k === 'valid' ? obj[k]._text === 'true' : obj[k]._text;
    });
    return {
        status: types_1.Status.SUCCESS,
        info: obj
    };
};
exports.parseResponse = parseResponse;
