import axios from 'axios';
import { getToken } from './token/tokenManager';
import { clearToken } from './token/tokenManager';
import { logoutAsyncAction } from './storeRoutine/actions'

const api = axios.create();

export const setupAxiosInterceptors = (dispatch, history) => {
	api.interceptors.request.use(config => {
		const token = getToken();
		if(token) {
			config.headers['SessionToken'] = token;
		}
		return config;
	}, error => {
		return Promise.reject(error);
	});

	const forceLogout = () => {
		clearToken();
		dispatch(logoutAsyncAction(history));
	};

	api.interceptors.response.use(response => {
		return response;
	}, async (error) => {
		if(!error.response) {
			throw new Error(error);
		}
		if(error.response.status !== 401) {
			throw new Error(error);
		}
		
		forceLogout();
	});
}

export default api;
