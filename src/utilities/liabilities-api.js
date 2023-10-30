import sendRequest from "./send-request";
const BASE_URL = "/api/liabilities";

export const getAllLiabilities = (userId) => {
	return sendRequest(`${BASE_URL}/${userId}`);
}

export const createLiability = (liability) => {
	return sendRequest(BASE_URL, "POST", liability);
};

export const editLiability = (liability, liabilityId) => {
	return sendRequest(`${BASE_URL}/${liabilityId}`, "PATCH", liability);
};

export const deleteLiability = (liabilityId) => {
	return sendRequest(`${BASE_URL}/${liabilityId}`, "DELETE")
}