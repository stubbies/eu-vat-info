import srj from 'soap-req-json';
import { EUVatError, EUVatOptions, EUVatResponse } from './types';
import countries from './countries';
import { ErrorResponse, parseResponse, validateVatNumber } from './utils';

const getEUVatInfo = async (options: EUVatOptions): Promise<EUVatResponse> => {
  if (!countries.has(options.countryCode.toUpperCase()))
    return ErrorResponse(EUVatError.INVALID_EU_CODE, `Invalid EU country code \`${options.countryCode}\` provided`);


  if (!validateVatNumber(options.vatNumber))
    return ErrorResponse(EUVatError.INVALID_VAT_NUMBER, `Invalid VAT number \`${options.vatNumber}\` provided`);

  const envelope = `<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:urn="urn:ec.europa.eu:taxud:vies:services:checkVat:types">\
  <soapenv:Header/>\
  <soapenv:Body>\
    <urn:checkVatApprox>\
      <urn:countryCode>${options.countryCode.toUpperCase()}</urn:countryCode>\
      <urn:vatNumber>${options.vatNumber}</urn:vatNumber>\
    </urn:checkVatApprox>\
  </soapenv:Body>\
  </soapenv:Envelope>`;

  return srj({
    envelope,
    url: 'https://ec.europa.eu/taxation_customs/vies/services/checkVatService',
    SOAPAction: ''//'urn:ec.europa.eu:taxud:vies:services:checkVat:types'
  })
    .then(res => {
      if (res instanceof Error)
        return ErrorResponse(EUVatError.SERVER_ERROR, res.message);
      try {
        return parseResponse(JSON.parse(res));
      } catch (err) {
        return ErrorResponse(EUVatError.PARSE_ERROR, err instanceof Error ? err.message : 'Error parsing.');
      }
    })
    .catch(e => ErrorResponse(EUVatError.SERVER_ERROR, e.message));
};

export default getEUVatInfo;