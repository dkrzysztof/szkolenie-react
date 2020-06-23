import { requests } from "../agent";
import {
    ISalesRepStatisticsPaintsResponse,
    GET_SALES_REP_STATISTICS_PAINTS,
    ISalesRepHistoryOfPaintsResponse,
    GET_SALES_REP_HISTORY_OF_PAINTS,
} from "./salesRepInterfaces";

export const SalesRepEndpoints = {
    getSalesRepPaintsStatistics: (): Promise<ISalesRepStatisticsPaintsResponse> =>
        requests.get(GET_SALES_REP_STATISTICS_PAINTS, {}, {}),

    getSalesRepHistoryOfPaints: (salesRepId: number): Promise<ISalesRepHistoryOfPaintsResponse> =>
        requests.get(GET_SALES_REP_HISTORY_OF_PAINTS.replace("<sales_rep_id>", salesRepId.toString()), {}, {}),
};
