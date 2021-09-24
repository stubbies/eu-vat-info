import { Status } from "./types";

export const validateVatNumber = (vat: string) => {
  const patt = /^([a-zA-Z0-9_-]){8,12}$/g;
  return patt.test(vat.replace(/[^A-Z0-9]/ig, ""));
};

export const ErrorResponse = <N, M>(n: N, m: M) => {
  return {
    status: Status.ERROR,
    error: {
      name: n,
      message: m
    }
  };
};

export const parseResponse = (json: any) => {
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
    status: Status.SUCCESS,
    info: obj
  };
};