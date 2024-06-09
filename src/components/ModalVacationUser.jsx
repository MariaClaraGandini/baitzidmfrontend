import { useState, useEffect } from 'react';
import { Button, Label, Modal, TextInput,Checkbox } from 'flowbite-react';
import { HiOutlineCalendar  } from "react-icons/hi";
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';



function ModalVacationUser(user) {
    const [openModal, setOpenModal] = useState(false);
    const [dataInicioFerias, setDataInicioFerias] = useState('');
    const [dataRetornoFerias, setDataRetornoFerias] = useState('');
    const [horarioInicioFerias, setHorarioInicioFerias] = useState('');
    const [horarioRetornoFerias, setHorarioRetornoFerias] = useState('');
    
    useEffect(() => {
        if (openModal && user) {

        async function fetchUserData() {
            try {
                const response = await axios.get(`http://localhost:3000/usuarios/exibirferias/${user.samaccountname}`);
                setDataInicioFerias(response.data.dataInicioFerias);
                setDataRetornoFerias(response.data.dataRetornoFerias);
                setHorarioInicioFerias(response.data.horarioInicioFerias);
                setHorarioRetornoFerias(response.data.horarioRetornoFerias);

            } catch (error) {
                toast.error(error.response.data.msg)

                }
                }
                
                    fetchUserData();
                }
            }, [openModal, user]);
            
            async function onCloseModal() {
                setOpenModal(false);
            }
            


            async function onSave() {
                try {
                    const dataInicioFormatted = dataInicioFerias ? formatData(dataInicioFerias) : '';
        const dataRetornoFormatted = dataRetornoFerias ? formatData(dataRetornoFerias) : '';
        const horarioInicioFormatted = horarioInicioFerias ? formatHorario(horarioInicioFerias) : '';
        const horarioRetornoFormatted = horarioRetornoFerias ? formatHorario(horarioRetornoFerias) : '';

                    const response = await axios.post(`http://localhost:3000/usuarios/agendarferias/${user.samaccountname}`, {
                         dataInicioFerias: dataInicioFormatted,
            horarioInicioFerias: horarioInicioFormatted,
            dataRetornoFerias: dataRetornoFormatted,
            horarioRetornoFerias: horarioRetornoFormatted
                        
                    });
                    console.log('Usuário editado com sucesso:', response.data);
                    console.log('Data de Início das Férias:', dataInicioFerias);
                    console.log('Data de Retorno das Férias:', dataRetornoFerias);
                    console.log('Horário de Início das Férias:', horarioInicioFerias);
                    console.log('Horário de Retorno das Férias:', horarioRetornoFerias);
                    
                    setOpenModal(false);
                    setDataInicioFerias('');
                    setDataRetornoFerias('');
                    setHorarioInicioFerias('');
                    setHorarioRetornoFerias('');
                    
                    toast.success("Usuário atualizado com sucesso!");
                    

                } catch (error) {
                    console.error('Erro ao editar usuário:', error);
                    console.log(dataInicioFerias)
                    console.log(horarioInicioFerias)
                    console.log(dataRetornoFerias)
                    console.log(horarioRetornoFerias)
                    toast.error(error.response.data.msg)

                }
            }
            function formatData(date) {
                if (!date) return ''; // Verifica se a data é undefined ou vazia
            
                const [year, month, day] = date.split('-');
                return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
            }
            
            // Função para formatar o horário no formato 'HH:mm'
            function formatHorario(time) {
                if (!time) return ''; // Verifica se o horário é undefined ou vazio
            
                const [hour, minute] = time.split(':');
                return `${hour.padStart(2, '0')}:${minute.padStart(2, '0')}`;
            }
            return (
                <div>
                        <ToastContainer />

                    <Button className='mr-2 text-blue-500 bg-gray-50 houver:bg-gray-100 focus:outline-none' onClick={() => setOpenModal(true)}>
                        <HiOutlineCalendar  style={{ fontSize: '1rem' }} />
                    </Button>
            
                    <Modal show={openModal} size="2xl" onClose={onCloseModal} popup>
                        <Modal.Header />
                        <Modal.Body>
                            <div className="space-y-6">
                                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Agendar Férias - {user.samaccountname} </h3>
                                <form>
                               
                                    <div className='grid md:grid-cols-2 sm:grid-cols-1 py-2'>
                                   
                                        <div className='mx-1'>
                                            <Label htmlFor="Data das Férias" value="Data da Férias" />
                                            <TextInput
                                                type="date"
                                                value={dataInicioFerias}
                                                onChange={(event) => setDataInicioFerias(event.target.value)}
                                                required
                                            />
                                        </div>
                                        <div className='mx-1'>
                                            <Label htmlFor="Horário Início" value="Horário Início" />
                                            <TextInput
                                                type="time"
                                                value={horarioInicioFerias}
                                                onChange={(event) => setHorarioInicioFerias(event.target.value)}
                                                required
                                            />
                                        </div>
                                    </div>
            
                                        
            
                                    <div className='grid md:grid-cols-2 sm:grid-cols-1 py-2'>
                                    <div className='mx-1'>
                                            <Label htmlFor="Data de Retorno" value="Data de Retorno" />
                                            <TextInput
                                                type="date"
                                                value={dataRetornoFerias}
                                                onChange={(event) => setDataRetornoFerias(event.target.value)}
                                                required
                                            />
                                        </div>
                                        <div className='mx-1'>
                                            
                                            <Label htmlFor="Horário Retorno" value="Horário Retorno" />
                                            <TextInput
                                                type="time"
                                                value={horarioRetornoFerias}
                                                onChange={(event) => setHorarioRetornoFerias(event.target.value)}
                                                required
                                            />
                                        </div>
                                    </div>
  


                                    <div className='grid md:grid-cols-6 sm:grid-cols-1 py-2'>

                                    <div className="w-full mt-4">
                                        <Button  onClick={onSave} className='bg-blue-500 mb-2 rounded text-white font-semibold hover:bg-blue-600'>
                                            Salvar
                                        </Button>
                                    </div>
                                    <div className="w-full mt-4">
                                        <Button  onClick={onSave} className='bg-red-500 mb-2 rounded text-white font-semibold hover:bg-blue-600'>
                                            Excluir
                                        </Button>
                                    </div>
                                    </div>
                                </form>
                            </div>
                        </Modal.Body>
                    </Modal>
                </div>
            );
        }

        export default ModalVacationUser;

// import { useState, useEffect } from 'react';
// import { Button, Label, Modal, TextInput } from 'flowbite-react';
// import { HiOutlineCalendar } from 'react-icons/hi';
// import axios from 'axios';
// import { ToastContainer, toast } from 'react-toastify';

// function ModalVacationUser({ openModal, onClose, user }) {
//   const [dataInicioFerias, setDataInicioFerias] = useState('');
//   const [dataRetornoFerias, setDataRetornoFerias] = useState('');
//   const [horarioInicioFerias, setHorarioInicioFerias] = useState('');
//   const [horarioRetornoFerias, setHorarioRetornoFerias] = useState('');

//   useEffect(() => {
//     if (openModal && user) {
//       async function fetchUserData() {
//         try {
//           const response = await axios.get(`http://localhost:3000/usuarios/exibirferias/${user.samaccountname}`);
//           setDataInicioFerias(response.data.dataInicioFerias);
//           setDataRetornoFerias(response.data.dataRetornoFerias);
//           setHorarioInicioFerias(response.data.horarioInicioFerias);
//           setHorarioRetornoFerias(response.data.horarioRetornoFerias);
//         } catch (error) {
//           toast.error(error.response.data.msg);
//         }
//       }

//       fetchUserData();
//     }
//   }, [openModal, user]);

//   async function onSave() {
//     try {
//       const dataInicioFormatted = dataInicioFerias ? formatData(dataInicioFerias) : '';
//       const dataRetornoFormatted = dataRetornoFerias ? formatData(dataRetornoFerias) : '';
//       const horarioInicioFormatted = horarioInicioFerias ? formatHorario(horarioInicioFerias) : '';
//       const horarioRetornoFormatted = horarioRetornoFerias ? formatHorario(horarioRetornoFerias) : '';

//       const response = await axios.post(`http://localhost:3000/usuarios/agendarferias/${user.samaccountname}`, {
//         dataInicioFerias: dataInicioFormatted,
//         horarioInicioFerias: horarioInicioFormatted,
//         dataRetornoFerias: dataRetornoFormatted,
//         horarioRetornoFerias: horarioRetornoFormatted,
//       });

//       console.log('Usuário editado com sucesso:', response.data);
//       console.log('Data de Início das Férias:', dataInicioFerias);
//       console.log('Data de Retorno das Férias:', dataRetornoFerias);
//       console.log('Horário de Início das Férias:', horarioInicioFerias);
//       console.log('Horário de Retorno das Férias:', horarioRetornoFerias);

//       onClose();
//       setDataInicioFerias('');
//       setDataRetornoFerias('');
//       setHorarioInicioFerias('');
//       setHorarioRetornoFerias('');

//       toast.success('Usuário atualizado com sucesso!');
//     } catch (error) {
//       console.error('Erro ao editar usuário:', error);
//       console.log(dataInicioFerias);
//       console.log(horarioInicioFerias);
//       console.log(dataRetornoFerias);
//       console.log(horarioRetornoFerias);
//       toast.error(error.response.data.msg);
//     }
//   }

//   function formatData(date) {
//     if (!date) return '';
//     const [year, month, day] = date.split('-');
//     return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
//   }

//   function formatHorario(time) {
//     if (!time) return '';
//     const [hour, minute] = time.split(':');
//     return `${hour.padStart(2, '0')}:${minute.padStart(2, '0')}`;
//   }

//   return (
//     <div>
//       <ToastContainer />
//       <Modal show={openModal} size="2xl" onClose={onClose} popup>
//         <Modal.Header />
//         <Modal.Body>
//           <div className="space-y-6">
//             <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
//               Agendar Férias - {user?.samaccountname}
//             </h3>
//             <form>
//               <div className="grid md:grid-cols-2 sm:grid-cols-1 py-2">
//                 <div className="mx-1">
//                   <Label htmlFor="Data das Férias" value="Data da Férias" />
//                   <TextInput
//                     type="date"
//                     value={dataInicioFerias}
//                     onChange={(event) => setDataInicioFerias(event.target.value)}
//                     required
//                   />
//                 </div>
//                 <div className="mx-1">
//                   <Label htmlFor="Horário Início" value="Horário Início" />
//                   <TextInput
//                     type="time"
//                     value={horarioInicioFerias}
//                     onChange={(event) => setHorarioInicioFerias(event.target.value)}
//                     required
//                   />
//                 </div>
//               </div>

        
//               <div className="grid md:grid-cols-2 sm:grid-cols-1 py-2">
//               <div className="mx-1">
//                 <Label htmlFor="Data de Retorno" value="Data de Retorno" />
//                 <TextInput
//                   type="date"
//                   value={dataRetornoFerias}
//                   onChange={(event) => setDataRetornoFerias(event.target.value)}
//                   required
//                 />
//               </div>

//                 <div className="mx-1">
//                   <Label htmlFor="Horário Retorno" value="Horário Retorno" />
//                   <TextInput
//                     type="time"
//                     value={horarioRetornoFerias}
//                     onChange={(event) => setHorarioRetornoFerias(event.target.value)}
//                     required
//                   />
//                 </div>
//               </div>

//               <div className="w-full mt-4">
//                 <Button onClick={onSave} className="bg-blue-500 mb-2 rounded text-white font-semibold hover:bg-blue-600">
//                   Salvar
//                 </Button>
//               </div>
//             </form>
//           </div>
//         </Modal.Body>
//       </Modal>
//     </div>
//   );
// }

// export default ModalVacationUser;
