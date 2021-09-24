import { Status } from "./types";
export declare const validateVatNumber: (vat: string) => boolean;
export declare const ErrorResponse: <N, M>(n: N, m: M) => {
    status: Status;
    error: {
        name: N;
        message: M;
    };
};
export declare const parseResponse: (json: any) => {
    status: Status;
    info: any;
};
