import * as usersAPI from "./users-api";

export async function signUp(userData) {
  const token = await usersAPI.signUp(userData);
  return token;
}

export async function login(credentials) {
  const token = await usersAPI.login(credentials);
  return token;
}

export function getToken() {
  const token = localStorage.getItem("token");
  if (!token) return null;
  const payload = JSON.parse(atob(token.split(".")[1]));
  if (payload.exp < Date.now() / 1000) {
    localStorage.removeItem("token");
    return null;
  }
  return token;
}

export function getUser() {
  const token = getToken();
  return token ? JSON.parse(atob(token.split(".")[1])).user : null;
}

export function logOut() {
  localStorage.removeItem("token");
}

export async function checkToken() {
  const data = await usersAPI.checkToken();
  const date = new Date(data);
  return date;
}

export async function updateTier(updatedUser, userId) {
  const token = await usersAPI.updateTier(updatedUser, userId);
  return token;
}
