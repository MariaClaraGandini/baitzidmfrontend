export const getAllEvents = async (userlogon) => {
    try {
      const response = await fetch(`localhost:3000/usuarios/exibir/${userlogon}`);
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("Error fetching events");
      }
    } catch (error) {
      console.error(error);
      throw new Error("Error fetching events");
    }
  };