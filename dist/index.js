"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const soap_req_json_1 = require("soap-req-json");
const types_1 = require("./types");
const countries_1 = require("./countries");
const utils_1 = require("./utils");
const getEUVatInfo = async (options) => {
    if (!countries_1.default.has(options.countryCode.toUpperCase()))
        return (0, utils_1.ErrorResponse)(types_1.EUVatError.INVALID_EU_CODE, `Invalid EU country code \`${options.countryCode}\` provided`);
    if (!(0, utils_1.validateVatNumber)(options.vatNumber.toString()))
        return (0, utils_1.ErrorResponse)(types_1.EUVatError.INVALID_VAT_NUMBER, `Invalid VAT number \`${options.vatNumber}\` provided`);
    const envelope = `<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:urn="urn:ec.europa.eu:taxud:vies:services:checkVat:types">\
  <soapenv:Header/>\
  <soapenv:Body>\
    <urn:checkVatApprox>\
      <urn:countryCode>${options.countryCode.toUpperCase()}</urn:countryCode>\
      <urn:vatNumber>${options.vatNumber}</urn:vatNumber>\
    </urn:checkVatApprox>\
  </soapenv:Body>\
  </soapenv:Envelope>`;
    return (0, soap_req_json_1.default)({
        envelope,
        url: 'https://ec.europa.eu/taxation_customs/vies/services/checkVatService',
        SOAPAction: 'urn:ec.europa.eu:taxud:vies:services:checkVat:types'
    })
        .then(res => {
        if (res instanceof Error)
            return (0, utils_1.ErrorResponse)(types_1.EUVatError.SERVER_ERROR, res.message);
        try {
            return (0, utils_1.parseResponse)(JSON.parse(res));
        }
        catch (err) {
            return (0, utils_1.ErrorResponse)(types_1.EUVatError.PARSE_ERROR, err instanceof Error ? err.message : 'Error parsing.');
        }
    })
        .catch(e => (0, utils_1.ErrorResponse)(types_1.EUVatError.SERVER_ERROR, e.message));
};
exports.default = getEUVatInfo;
