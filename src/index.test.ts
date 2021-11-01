require('dotenv').config()

import getEUVatInfo from ".";
import { EUVatError, Status } from "./types";

const validVatNumber = Number(process.env.VAT_NUMBER);

describe('tests', () => {
  test('Successful response', async () => {
    const data = await getEUVatInfo({ countryCode: 'EL', vatNumber: validVatNumber })
    expect(data.status).toBe(Status.SUCCESS);
  })

  test('Invalid VAT number given', async () => {
    const { status, error } = await getEUVatInfo({ countryCode: 'EL', vatNumber: 864234 })
    expect(status).toBe(Status.ERROR);
    expect(error?.name).toBe(EUVatError.INVALID_VAT_NUMBER);
  })

  test('Invalid country code given', async () => {
    const { status, error } = await getEUVatInfo({ countryCode: 'UK', vatNumber: 106864234 })
    expect(status).toBe(Status.ERROR);
    expect(error?.name).toBe(EUVatError.INVALID_EU_CODE);
  })

  test('Non valid number', async () => {
    const { status, error } = await getEUVatInfo({ countryCode: 'UK', vatNumber: 106864234 })
    expect(status).toBe(Status.ERROR);
    expect(error?.name).toBe(EUVatError.INVALID_EU_CODE);
  })
})