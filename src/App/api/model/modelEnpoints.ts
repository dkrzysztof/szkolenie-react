import { IModelPredictionResponse, POST_MODEL_PREDICTION, IModelPredictionRequest } from "./modelInterface";
import { requests } from "../agent";

export const ModelEndpoints = {
    postModelPrediction: (modelValues: IModelPredictionRequest): Promise<IModelPredictionResponse> => {
        console.log(modelValues);
        return requests.post(
            POST_MODEL_PREDICTION,
            {
                lastPaintingDate: modelValues.lastPaintingDate,
                ppgmcTechnicalmanager: modelValues.ppgmcTechnicalmanager || "Gozo Channel Co Ltd",
                salesRep: modelValues.salesRep || "#PPGMarine",
                shipBuilder: modelValues.shipBuilder || "PURDON & FEATHERSTONE",
                shipType: modelValues.shipType || null,
                shipyardCountry: modelValues.shipyardCountry || "Netherlands",
                shipyardRegion: modelValues.shipyardRegion || "None",
                status: modelValues.status || "IN SERVICE/COMMISSION",
                techmngCountry: modelValues.techmngCountry || "Malta",
                techmngRegion: modelValues.techmngRegion || "USCA",
                vesselAge: modelValues.vesselAge || 108.1,
            },
            {
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );
    },
};
