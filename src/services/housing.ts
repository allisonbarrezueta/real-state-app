import axios, { AxiosError } from "axios";

export enum OptionsFields {
    PROPERTY_TYPE = "propertyType",
    OPERATION = "operation",
    EXTERIOR = "exterior",
    PROVINCE = "province",
    MUNICIPALITY = "municipality",
    DISTRICT = "district",
    NEIGHBORHOOD = "neighborhood",
    STATUS = "status",
    NEW_DEVELOPMENT = "newDevelopment",
    HAS_LIFT = "hasLift",
}

export interface Options {
    label: string;
    value: number;
}

const url = "https://real-state-be-production.up.railway.app";

export const getOptionsFields = async (field: OptionsFields) => {
    try {
        const response = await axios.get<Options[]>(`${url}/options/${field}`);
        return response.data;
    } catch (err) {
        const e = err as AxiosError<{ detail?: string }>;
        console.error("Error fetching options:", e.response?.data ?? e.message);
        throw e;
    }
};

export interface PriceRecommendationRequest {
    propertyType: number;
    operation: number;
    size: number;
    exterior: number | undefined;
    rooms: number;
    bathrooms: number;
    province: number;
    municipality: number;
    district: number;
    neighborhood: number;
    status: number;
    hasLift: number | undefined;
    priceByArea: number;
    newDevelopment: number | undefined;
}

export interface PriceRecommendationResponse {
    price: number;
}

export const getPriceRecomendation = (data: PriceRecommendationRequest) => {
    return axios
        .post<PriceRecommendationResponse>(`${url}/predict`, data)
        .then((response) => response.data)
        .catch((error) => {
            console.error("Error fetching predictive data:", error);
            throw error;
        });
};
