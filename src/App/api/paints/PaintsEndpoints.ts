import { requests } from "../agent";
import { GET_PAINTS_STATISTICS_MOST_USED, IMostUsedPaintsResponse } from "./PaintsInterface";

export const PaintsEndpoints = {
    getMostUsedPaints: (): Promise<IMostUsedPaintsResponse> => requests.get(GET_PAINTS_STATISTICS_MOST_USED, {}, {}),
};
