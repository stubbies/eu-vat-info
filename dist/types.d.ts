export declare type EUVatOptions = {
    countryCode: string;
    vatNumber: number;
};
export declare enum Status {
    SUCCESS = "success",
    ERROR = "error"
}
export declare enum EUVatError {
    INVALID_EU_CODE = "INVALID_EU_CODE",
    INVALID_VAT_NUMBER = "INVALID_VAT_NUMBER",
    SERVER_ERROR = "SERVER_ERROR",
    PARSE_ERROR = "PARSE_ERROR"
}
export declare type EUVatResponse = {
    status: Status;
    error?: {
        name: EUVatError;
        message: string;
    };
    info?: EUVatInfo;
};
export declare type EUVatInfo = {
    countryCode: string;
    vatNumber: string;
    requestDate: string;
    valid: boolean;
    traderName: string;
    traderCompanyType: string;
    traderAddress: string;
};
