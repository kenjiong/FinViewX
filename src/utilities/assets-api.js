import sendRequest from "./send-request";
const BASE_URL = "/api/assets";

export const createAsset = async (asset) => {
	return await sendRequest(BASE_URL, "POST", asset);
};

export const editAsset = async (asset) => {
	return await sendRequest(BASE_URL, "PATCH", asset);
};