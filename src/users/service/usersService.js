import api from './../../api';

export const getUsers = async () => await api.get('/Api/Data/ListUsers');
