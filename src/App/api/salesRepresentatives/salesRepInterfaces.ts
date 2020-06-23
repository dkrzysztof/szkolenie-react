export const GET_SALES_REP_STATISTICS_PAINTS = "/api/sales-representatives/statistics/paints";
export type ISalesRepStatisticsPaintsResponse = [
    {
        count: number;
        sales_rep: string;
    }
];

export interface ISalesRepStatisticsPaintsError {
    description: string;
    error: string;
    status_code: number;
}

export const GET_SALES_REP_HISTORY_OF_PAINTS = "/api/sales-representatives/<sales_rep_id>/history/paints";
export interface ISalesRepHistoryOfPaintsResponse {
    data: ISalesRepHistoryOfPaintsDataObject[];
    name: string;
}

export interface ISalesRepHistoryOfPaintsDataObject {
    count: number;
    date: string;
}
