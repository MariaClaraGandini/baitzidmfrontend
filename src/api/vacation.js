// const BASE_URL = "http://localhost:5000";


// export const getAllEvents = async () => {
//     try {
//       const response = await fetch(`${BASE_URL}/event/getAll`);
//       if (response.ok) {
//         return response.json();
//       } else {
//         throw new Error("Error fetching events");
//       }
//     } catch (error) {
//       console.error(error);
//       throw new Error("Error fetching events");
//     }
//   };
  
//   export const createEvent = async (eventData) => {
//     try {
//       const response = await fetch(`${BASE_URL}/event/create`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(eventData),
//       });
  
//       if (response.ok) {
//         return true;
//       } else {
//         throw new Error("Error creating event");
//       }
//     } catch (error) {
//       console.error(error);
//       throw new Error("Error creating event");
//     }
//   };