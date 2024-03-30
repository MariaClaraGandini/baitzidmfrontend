const BASE_URL = "http://localhost:3000";
import axios from 'axios';


export const SignUp = async () => {
    try {
      const response = await fetch(`${BASE_URL}/event/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(eventData),
      });
  
      if (response.ok) {
        return true;
      } else {
        throw new Error("Error creating event");
      }
    } catch (error) {
      console.error(error);
      throw new Error("Error creating event");
    }
  };


  export const Logout = async (deleteToken) => {

    try {
      const response = await axios.get(`${BASE_URL}/sair`);
      deleteToken();
  
      if (response.status !== 200) {
        throw new Error('Erro ao fazer logout');
      }
  
      console.log(response.data.msg); // 'Logout realizado com sucesso'
    } catch (error) {
      console.error(error.response);
    }
  };
