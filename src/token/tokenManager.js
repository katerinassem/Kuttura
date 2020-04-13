const AUTHORIZATION_TOKEN = 'AUTHORIZATION_TOKEN';

export const storeToken = token => localStorage.setItem(AUTHORIZATION_TOKEN, token);

export const getToken = () => localStorage.getItem(AUTHORIZATION_TOKEN);

export const clearToken = () => localStorage.removeItem(AUTHORIZATION_TOKEN);
