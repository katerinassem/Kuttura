import axios from 'axios';
import { getToken, clearToken, storeToken } from './../token/tokenManager';

export const logout = async () => {
  let token = getToken();

  if(!token) {
    return;
  }

  await axios.delete(`/Api/Session/Logout/${token}`);    
  clearToken();
};

export const logon = async (company, account, password) => {
  const result = await axios.post('/Api/Session/Logon', {
      Company: company,
      User: account,
      Password: password
  });
  storeToken(result.data.Token);
}
