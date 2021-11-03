# Check EU VAT info

This module does a request to `https://ec.europa.eu` to fetch trader information for a given VAT number and country code.

# Usage

## `Installation`

```
npm install eu-vat-info
// or
yarn add eu-vat-info
```

## `Quick Start`

```
const EuVatInfo = require('eu-vat-info');

const response = await EuVatInfo({ 
  countryCode: 'EL', 
  vatNumber: '123456789' 
})
```

### `Options`

| Option        | Type                        | Required |
|---------------|-----------------------------|----------|
| `countryCode` | `string` ex. DE, IT, SE     | `true`   |
| `vatNumber`   | `string`                    | `true`   |

## `Response`

| Field    | Type                                    | Optional |
|----------|-----------------------------------------|----------|
| `status` | `"success" or "error"`                  | `false`  |
| `error`  | `{ name: EUVatError, message: string }` | `true`   |
| `info`   | `EUVatInfo`                             | `true`   |


### `Example response`

```
{
  status: 'success',
  info: {
    countryCode: 'EL',
    vatNumber: '12345678',
    requestDate: '2021-09-24+02:00',
    valid: true,
    traderName: 'TRADER NAME',
    traderCompanyType: 'COMPANY TYPE',
    traderAddress: 'ADDRESS, ZIP, ATHENS'      
  }
}

```
### `EUVatInfo`

```
countryCode: string;
vatNumber: string;
requestDate: string;
valid: boolean;
traderName: string;
traderCompanyType: string;
traderAddress: string;
```

### `EUVatError`

```
INVALID_EU_CODE
INVALID_VAT_NUMBER
SERVER_ERROR
PARSE_ERROR
```
