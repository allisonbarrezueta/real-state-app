import axios from "axios";

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

const url = "https://real-state-be-production.up.railway.app";

export const getOptionsFields = (field: OptionsFields) => {
    return axios
        .get(`${url}/options/${field}`)
        .then((response) => response.data)
        .catch((error) => {
            console.error("Error fetching options:", error);
            throw error;
        });
};

export const getPredictiveData = (formData: Record<string, string>) => {
    return axios
        .post(`${url}/predict`, formData)
        .then((response) => response.data)
        .catch((error) => {
            console.error("Error fetching predictive data:", error);
            throw error;
        });
};
