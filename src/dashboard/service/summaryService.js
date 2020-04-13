import api from './../../api';

export const getSummary = async () => await api.get('/Api/Data/GetSummary');
