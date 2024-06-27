
import URL from '../api/config'
import axios from 'axios';



  export const Logout = async (deleteToken) => {

    try {
      const response = await axios.get(`${URL}/sair`);
      deleteToken();
  
      if (response.status !== 200) {
        throw new Error('Erro ao fazer logout');
      }
  
      console.log(response.data.msg); // 'Logout realizado com sucesso'
    } catch (error) {
      console.error(error.response);
    }
  };
