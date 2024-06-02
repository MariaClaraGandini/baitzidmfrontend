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
    
    // useEffect(() => {
    //     if (openModal && user) {

    //     async function fetchUserData() {
    //         try {
    //             const response = await axios.get(`http://localhost:3000/usuarios/exibirferias/${user.samaccountname}`);
    //             setDataInicioFerias(response.data.dataInicioFerias);
    //             setDataRetornoFerias(response.data.dataRetornoFerias);
    //             setHorarioInicioFerias(response.data.horarioInicioFerias);
    //             setHorarioRetornoFerias(response.data.horarioRetornoFerias);

    //         } catch (error) {
    //             toast.error(error.response.data.msg)

    //             }
    //             }
                
    //                 fetchUserData();
    //             }
    //         }, [openModal, user]);
            
            async function onCloseModal() {
                setOpenModal(false);
            }
            

            async function onSave() {
                try {
                    const response = await axios.post(`http://localhost:3000/usuarios/agendarferias/${user.samaccountname}`, {
                        dataInicioFerias,
                        horarioInicioFerias,
                        dataRetornoFerias,
                        horarioRetornoFerias
                        
                    });
                    console.log('Usuário editado com sucesso:', response.data);

                    setOpenModal(false);
                    setPeriodoacesso('');
                    setDataInicioFerias('');
                    setDataRetornoFerias('');
                    setHorarioInicioFerias('');
                    setHorarioRetornoFerias('');
                    console.log(dataInicioFerias)
                    console.log(horarioInicioFerias)
                    console.log(dataRetornoFerias)
                    console.log(horarioRetornoFerias)
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
            
                                        <div className='mx-1'>
                                            <Label htmlFor="Data de Retorno" value="Data de Retorno" />
                                            <TextInput
                                                type="date"
                                                value={dataRetornoFerias}
                                                onChange={(event) => setDataRetornoFerias(event.target.value)}
                                                required
                                            />
                                        </div>
            
                                    <div className='grid md:grid-cols-2 sm:grid-cols-1 py-2'>
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
  



                                    <div className="w-full mt-4">
                                        <Button  onClick={onSave} className='bg-blue-500 mb-2 rounded text-white font-semibold hover:bg-blue-600'>
                                            Salvar
                                        </Button>
                                    </div>
                                </form>
                            </div>
                        </Modal.Body>
                    </Modal>
                </div>
            );
        }

        export default ModalVacationUser;