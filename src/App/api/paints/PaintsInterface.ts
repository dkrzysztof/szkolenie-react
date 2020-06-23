export const GET_PAINTS_STATISTICS_MOST_USED = "/api/paints/statistics/most-used";

export type IMostUsedPaintsResponse = [
    {
        product: string;
        quantity: number;
    }
];

export type IMostUsedPaintsError = {
    description: "Request does not contain an access token";
    error: "Authorization Required";
    status_code: 401;
};
