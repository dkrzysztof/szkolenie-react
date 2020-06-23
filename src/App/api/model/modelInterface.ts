export const POST_MODEL_PREDICTION = "/api/model/predict";

export interface IModelPredictionRequest {
    lastPaintingDate: number;
    ppgmcTechnicalmanager: string;
    salesRep: string;
    shipBuilder: string;
    shipType: string;
    shipyardCountry: string;
    shipyardRegion: string;
    status: string;
    techmngCountry: string;
    techmngRegion: string;
    vesselAge: number;
}

export interface IModelPredictionResponse {
    nextPaintingDate: number;
}
