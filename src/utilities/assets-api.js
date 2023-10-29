import sendRequest from "./send-request";
const BASE_URL = "/api/assets";

export const getAllAssets = (userId) => {
	return sendRequest(`${BASE_URL}/${userId}`);
}

export const createAsset = (asset) => {
	return sendRequest(BASE_URL, "POST", asset);
};

export const editAsset = (asset) => {
	return sendRequest(BASE_URL, "PATCH", asset);
};

export const deleteAsset = (assetId) => {
	return sendRequest(`${BASE_URL}/${assetId}`, "DELETE")
}