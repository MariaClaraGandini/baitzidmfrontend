import { useState, useEffect } from 'react';
import { Button, Modal, Table, TextInput, Select } from 'flowbite-react';
import { HiClock } from "react-icons/hi";
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';



function ModalLogonUser(user) {
    const [openModal, setOpenModal] = useState(false);
    const [horarioiniciodomingo, setHorarioInicioDomingo] = useState('--:--')
    const [horariofimdomingo, setHorarioFimDomingo] = useState('--:--')
    const [horarioiniciosegunda, setHorarioInicioSegunda] = useState('--:--')
    const [horariofimsegunda, setHorarioFimSegunda] = useState('--:--')
    const [horarioinicioterca, setHorarioInicioTerca] = useState('--:--')
    const [horariofimterca, setHorarioFimTerca] = useState('--:--')
    const [horarioinicioquarta, setHorarioInicioQuarta] = useState('--:--')
    const [horariofimquarta, setHorarioFimQuarta] = useState('--:--')
    const [horarioinicioquinta, setHorarioInicioQuinta] = useState('--:--')
    const [horariofimquinta, setHorarioFimQuinta] = useState('--:--')
    const [horarioiniciosexta, setHorarioInicioSexta] = useState('--:--')
    const [horariofimsexta, setHorarioFimSexta] = useState('--:--')
    const [horarioiniciosabado, setHorarioInicioSabado] = useState('--:--')
    const [horariofimsabado, setHorarioFimSabado] = useState('--:--')

    async function onCloseModal() {
        setOpenModal(false);

    }


    useEffect(() => {
        if (openModal && user) {
            async function fetchUserData() {
                try {
                    const response = await axios.get(`http://localhost:3000/usuarios/getlogonhours/${user.samaccountname}`);
                    const data = response.data;
                    console.log(user.samaccountname)
                    setHorarioInicioDomingo(data.horarioiniciodomingo);
                    setHorarioFimDomingo(data.horariofimdomingo);
                    setHorarioInicioSegunda(data.horarioiniciosegunda);
                    setHorarioFimSegunda(data.horariofimsegunda);
                    setHorarioInicioTerca(data.horarioinicioterca);
                    setHorarioFimTerca(data.horariofimterca);
                    setHorarioInicioQuarta(data.horarioinicioquarta);
                    setHorarioFimQuarta(data.horariofimquarta);
                    setHorarioInicioQuinta(data.horarioinicioquinta);
                    setHorarioFimQuinta(data.horariofimquinta);
                    setHorarioInicioSexta(data.horarioiniciosexta);
                    setHorarioFimSexta(data.horariofimsexta);
                    setHorarioInicioSabado(data.horarioiniciosabado);
                    setHorarioFimSabado(data.horariofimsabado);
                } catch (error) {
                    toast.error(error.response.data.msg);
                }
            }
            fetchUserData();

        }
    }, [openModal, user]);

    async function onSave() {
        try {
            const response = await axios.post(`http://localhost:3000/usuarios/setlogonhours/${user.samaccountname}`, {
                horarioiniciodomingo,
                horariofimdomingo,
                horarioiniciosegunda,
                horariofimsegunda,
                horarioinicioterca,
                horariofimterca,
                horarioinicioquarta,
                horariofimquarta,
                horarioinicioquinta,
                horariofimquinta,
                horarioiniciosexta,
                horariofimsexta,
                horarioiniciosabado,
                horariofimsabado
            });
            setHorarioInicioDomingo('');
            setHorarioFimDomingo('');
            setHorarioInicioSegunda('');
            setHorarioFimSegunda('');
            setHorarioInicioTerca('');
            setHorarioInicioQuarta('');
            setHorarioInicioQuinta('');
            setHorarioFimQuinta('');
            setHorarioInicioSexta('');
            setHorarioFimSexta('');
            setHorarioInicioSabado('');
            setHorarioFimSabado('');


            console.log(horarioiniciodomingo)
            console.log('Usuário editado com sucesso:', response.data);
            setOpenModal(false);

            toast.success("Usuário atualizado com sucesso!");


        } catch (error) {
            console.error('Erro ao editar usuário:', error);
            toast.error(error.response.data.msg)

        }
    }


    return (
        <div>
            <ToastContainer />

            <Button className='mr-2 text-blue-500 bg-gray-50 houver:bg-gray-100 focus:outline-none' onClick={() => setOpenModal(true)}>
                <HiClock style={{ fontSize: '1rem' }} />
            </Button>
            <Modal show={openModal} size="2xl" onClose={onCloseModal} popup className='flex items-center justify-center'>
                <Modal.Header />
                <Modal.Body>
                    <div className="space-y-6 ">
                        <h3 className="text-xl  font-semibold text-gray-900 dark:text-white">Horário de Login - {user.samaccountname} </h3>
                        <form>
                            <div className="overflow-x-auto ">
                                <Table className=' '>
                                    <Table.Head className='p-0 m-0'>
                                        <Table.HeadCell className="  text-center font-medium">Dia da Semana</Table.HeadCell>
                                        <Table.HeadCell className="text-center font-medium">Horário Inicial</Table.HeadCell>
                                        <Table.HeadCell className="text-center  font-medium">Horário Final</Table.HeadCell>

                                    </Table.Head>
                                    <Table.Body className="divide-y border-b border-gray-50		">
                                        <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800 py-0 px-0 m-0">
                                            <Table.Cell className=" font-medium text-gray-900  text-center py-0 px-0 m-0">Domingo: </Table.Cell>
                                            <Table.Cell className='px-1.5'>
                                                <div className="select-wrapper">

                                                    <Select value={horarioiniciodomingo} onChange={(event) => setHorarioInicioDomingo(event.target.value)} id="hours" required>
                                                        <option>--:--</option>

                                                        <option>00:00</option>
                                                        <option>01:00</option>
                                                        <option>02:00</option>
                                                        <option>03:00</option>
                                                        <option>04:00</option>
                                                        <option>05:00</option>
                                                        <option>06:00</option>
                                                        <option>07:00</option>
                                                        <option>08:00</option>
                                                        <option value="09:00">09:00</option>
                                                        <option>10:00</option>
                                                        <option>11:00</option>
                                                        <option>12:00</option>
                                                        <option>13:00</option>
                                                        <option>14:00</option>
                                                        <option>15:00</option>
                                                        <option>16:00</option>
                                                        <option>17:00</option>
                                                        <option>18:00</option>
                                                        <option>19:00</option>
                                                        <option>20:00</option>
                                                        <option>21:00</option>
                                                        <option>22:00</option>
                                                        <option>23:00</option>

                                                    </Select>
                                                    <span className="custom-icon">
                                                        {/* Ícone personalizado (por exemplo, um ícone de relógio) */}
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24">
                                                            <path d="M12 2c-5.52 0-10 4.48-10 10s4.48 10 10 10 10-4.48 10-10-4.48-10-10-10zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-9v6h2v-7h-2z" />
                                                        </svg>
                                                    </span>
                                                </div>
                                            </Table.Cell>
                                            <Table.Cell className='px-1.5'>
                                                <div className="select-wrapper">

                                                    <Select value={horariofimdomingo} onChange={(event) => setHorarioFimDomingo(event.target.value)} id="hours" required>
                                                        <option>--:--</option>
                                                        <option>01:00</option>
                                                        <option>02:00</option>
                                                        <option>03:00</option>
                                                        <option>04:00</option>
                                                        <option>05:00</option>
                                                        <option>06:00</option>
                                                        <option>07:00</option>
                                                        <option>08:00</option>
                                                        <option>09:00</option>
                                                        <option>10:00</option>
                                                        <option>11:00</option>
                                                        <option>12:00</option>
                                                        <option>13:00</option>
                                                        <option>14:00</option>
                                                        <option>15:00</option>
                                                        <option>16:00</option>
                                                        <option>17:00</option>
                                                        <option>18:00</option>
                                                        <option>19:00</option>
                                                        <option>20:00</option>
                                                        <option>21:00</option>
                                                        <option>22:00</option>
                                                        <option>23:00</option>

                                                    </Select>
                                                    <span className="custom-icon">
                                                        {/* Ícone personalizado (por exemplo, um ícone de relógio) */}
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24">
                                                            <path d="M12 2c-5.52 0-10 4.48-10 10s4.48 10 10 10 10-4.48 10-10-4.48-10-10-10zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-9v6h2v-7h-2z" />
                                                        </svg>
                                                    </span>
                                                </div>
                                            </Table.Cell>
                                        </Table.Row>
                                    </Table.Body>
                                    <Table.Body className="divide-y border-b border-gray-50	">
                                        <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800 py-0 px-0 m-0">
                                            <Table.Cell className=" font-medium text-gray-900  text-center py-0 px-0 m-0">Segunda-Feira: </Table.Cell>

                                            <Table.Cell className='px-1.5'>

                                                <div className="select-wrapper">

                                                    <Select value={horarioiniciosegunda} onChange={(event) => setHorarioInicioSegunda(event.target.value)} id="hours" required>
                                                        <option>--:--</option>
                                                        <option>00:00</option>
                                                        <option>01:00</option>
                                                        <option>02:00</option>
                                                        <option>03:00</option>
                                                        <option>04:00</option>
                                                        <option>05:00</option>
                                                        <option>06:00</option>
                                                        <option>07:00</option>
                                                        <option>08:00</option>
                                                        <option>09:00</option>
                                                        <option>10:00</option>
                                                        <option>11:00</option>
                                                        <option>12:00</option>
                                                        <option>13:00</option>
                                                        <option>14:00</option>
                                                        <option>15:00</option>
                                                        <option>16:00</option>
                                                        <option>17:00</option>
                                                        <option>18:00</option>
                                                        <option>19:00</option>
                                                        <option>20:00</option>
                                                        <option>21:00</option>
                                                        <option>22:00</option>
                                                        <option>23:00</option>

                                                    </Select>
                                                    <span className="custom-icon">
                                                        {/* Ícone personalizado (por exemplo, um ícone de relógio) */}
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24">
                                                            <path d="M12 2c-5.52 0-10 4.48-10 10s4.48 10 10 10 10-4.48 10-10-4.48-10-10-10zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-9v6h2v-7h-2z" />
                                                        </svg>
                                                    </span>
                                                </div>
                                            </Table.Cell>
                                            <Table.Cell className='px-1.5'>
                                                <div className="select-wrapper">

                                                    <Select value={horariofimsegunda} onChange={(event) => setHorarioFimSegunda(event.target.value)} id="hours" required>
                                                        <option>--:--</option>
                                                        <option>01:00</option>
                                                        <option>02:00</option>
                                                        <option>03:00</option>
                                                        <option>04:00</option>
                                                        <option>05:00</option>
                                                        <option>06:00</option>
                                                        <option>07:00</option>
                                                        <option>08:00</option>
                                                        <option>09:00</option>
                                                        <option>10:00</option>
                                                        <option>11:00</option>
                                                        <option>12:00</option>
                                                        <option>13:00</option>
                                                        <option>14:00</option>
                                                        <option>15:00</option>
                                                        <option>16:00</option>
                                                        <option>17:00</option>
                                                        <option>18:00</option>
                                                        <option>19:00</option>
                                                        <option>20:00</option>
                                                        <option>21:00</option>
                                                        <option>22:00</option>
                                                        <option>23:00</option>

                                                    </Select>
                                                    <span className="custom-icon">
                                                        {/* Ícone personalizado (por exemplo, um ícone de relógio) */}
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24">
                                                            <path d="M12 2c-5.52 0-10 4.48-10 10s4.48 10 10 10 10-4.48 10-10-4.48-10-10-10zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-9v6h2v-7h-2z" />
                                                        </svg>
                                                    </span>
                                                </div>
                                            </Table.Cell>
                                        </Table.Row>
                                    </Table.Body>
                                    <Table.Body className="divide-y border-b	 border-gray-50">
                                        <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800 py-0 px-0 m-0">
                                            <Table.Cell className=" font-medium text-gray-900  text-center py-0 px-0 m-0">Terça-Feira: </Table.Cell>

                                            <Table.Cell className='px-1.5'>
                                                <div className="select-wrapper">

                                                    <Select value={horarioinicioterca} onChange={(event) => setHorarioInicioTerca(event.target.value)} id="hours" required>
                                                        <option>--:--</option>
                                                        <option>00:00</option>
                                                        <option>01:00</option>
                                                        <option>02:00</option>
                                                        <option>03:00</option>
                                                        <option>04:00</option>
                                                        <option>05:00</option>
                                                        <option>06:00</option>
                                                        <option>07:00</option>
                                                        <option>08:00</option>
                                                        <option>09:00</option>
                                                        <option>10:00</option>
                                                        <option>11:00</option>
                                                        <option>12:00</option>
                                                        <option>13:00</option>
                                                        <option>14:00</option>
                                                        <option>15:00</option>
                                                        <option>16:00</option>
                                                        <option>17:00</option>
                                                        <option>18:00</option>
                                                        <option>19:00</option>
                                                        <option>20:00</option>
                                                        <option>21:00</option>
                                                        <option>22:00</option>
                                                        <option>23:00</option>

                                                    </Select>
                                                    <span className="custom-icon">
                                                        {/* Ícone personalizado (por exemplo, um ícone de relógio) */}
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24">
                                                            <path d="M12 2c-5.52 0-10 4.48-10 10s4.48 10 10 10 10-4.48 10-10-4.48-10-10-10zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-9v6h2v-7h-2z" />
                                                        </svg>
                                                    </span>
                                                </div>

                                            </Table.Cell>

                                            <Table.Cell className='px-1.5'>
                                                <div className="select-wrapper">

                                                    <Select value={horariofimterca} onChange={(event) => setHorarioFimTerca(event.target.value)} id="hours" required>
                                                         <option>--:--</option>
                                                        <option>01:00</option>
                                                        <option>02:00</option>
                                                        <option>03:00</option>
                                                        <option>04:00</option>
                                                        <option>05:00</option>
                                                        <option>06:00</option>
                                                        <option>07:00</option>
                                                        <option>08:00</option>
                                                        <option>09:00</option>
                                                        <option>10:00</option>
                                                        <option>11:00</option>
                                                        <option>12:00</option>
                                                        <option>13:00</option>
                                                        <option>14:00</option>
                                                        <option>15:00</option>
                                                        <option>16:00</option>
                                                        <option>17:00</option>
                                                        <option>18:00</option>
                                                        <option>19:00</option>
                                                        <option>20:00</option>
                                                        <option>21:00</option>
                                                        <option>22:00</option>
                                                        <option>23:00</option>

                                                    </Select>
                                                    <span className="custom-icon">
                                                        {/* Ícone personalizado (por exemplo, um ícone de relógio) */}
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24">
                                                            <path d="M12 2c-5.52 0-10 4.48-10 10s4.48 10 10 10 10-4.48 10-10-4.48-10-10-10zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-9v6h2v-7h-2z" />
                                                        </svg>
                                                    </span>
                                                </div>
                                            </Table.Cell>
                                        </Table.Row>
                                    </Table.Body>
                                    <Table.Body className="divide-y border-b border-gray-50	">
                                        <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800 py-0 px-0 m-0">
                                            <Table.Cell className=" font-medium text-gray-900  text-center py-0 px-0 m-0">Quarta-Feira: </Table.Cell>

                                            <Table.Cell className='px-1.5'>
                                                <div className="select-wrapper">

                                                    <Select value={horarioinicioquarta} onChange={(event) => setHorarioInicioQuarta(event.target.value)} id="hours" required>
                                                    <option>--:--</option>
                                                        <option>00:00</option>
                                                        <option>01:00</option>
                                                        <option>02:00</option>
                                                        <option>03:00</option>
                                                        <option>04:00</option>
                                                        <option>05:00</option>
                                                        <option>06:00</option>
                                                        <option>07:00</option>
                                                        <option>08:00</option>
                                                        <option>09:00</option>
                                                        <option>10:00</option>
                                                        <option>11:00</option>
                                                        <option>12:00</option>
                                                        <option>13:00</option>
                                                        <option>14:00</option>
                                                        <option>15:00</option>
                                                        <option>16:00</option>
                                                        <option>17:00</option>
                                                        <option>18:00</option>
                                                        <option>19:00</option>
                                                        <option>20:00</option>
                                                        <option>21:00</option>
                                                        <option>22:00</option>
                                                        <option>23:00</option>

                                                    </Select>
                                                    <span className="custom-icon">
                                                        {/* Ícone personalizado (por exemplo, um ícone de relógio) */}
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24">
                                                            <path d="M12 2c-5.52 0-10 4.48-10 10s4.48 10 10 10 10-4.48 10-10-4.48-10-10-10zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-9v6h2v-7h-2z" />
                                                        </svg>
                                                    </span>
                                                </div>
                                            </Table.Cell>
                                            <Table.Cell className='px-1.5'>
                                                <div className="select-wrapper">

                                                    <Select value={horariofimquarta} onChange={(event) => setHorarioFimQuarta(event.target.value)} id="hours" required>
                                                    <option>--:--</option>
                                                        <option>01:00</option>
                                                        <option>02:00</option>
                                                        <option>03:00</option>
                                                        <option>04:00</option>
                                                        <option>05:00</option>
                                                        <option>06:00</option>
                                                        <option>07:00</option>
                                                        <option>08:00</option>
                                                        <option>09:00</option>
                                                        <option>10:00</option>
                                                        <option>11:00</option>
                                                        <option>12:00</option>
                                                        <option>13:00</option>
                                                        <option>14:00</option>
                                                        <option>15:00</option>
                                                        <option>16:00</option>
                                                        <option>17:00</option>
                                                        <option>18:00</option>
                                                        <option>19:00</option>
                                                        <option>20:00</option>
                                                        <option>21:00</option>
                                                        <option>22:00</option>
                                                        <option>23:00</option>

                                                    </Select>
                                                    <span className="custom-icon">
                                                        {/* Ícone personalizado (por exemplo, um ícone de relógio) */}
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24">
                                                            <path d="M12 2c-5.52 0-10 4.48-10 10s4.48 10 10 10 10-4.48 10-10-4.48-10-10-10zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-9v6h2v-7h-2z" />
                                                        </svg>
                                                    </span>
                                                </div>
                                            </Table.Cell>
                                        </Table.Row>
                                    </Table.Body>
                                    <Table.Body className="divide-y border-b border-gray-50	">
                                        <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800 py-0 px-0 m-0">
                                            <Table.Cell className=" font-medium text-gray-900  text-center py-0 px-0 m-0">Quinta-Feira: </Table.Cell>

                                            <Table.Cell className='px-1.5'>
                                                <div className="select-wrapper">

                                                    <Select value={horarioinicioquinta} onChange={(event) => setHorarioInicioQuinta(event.target.value)} id="hours" required>
                                                    <option>--:--</option>
                                                        <option>00:00</option>
                                                        <option>01:00</option>
                                                        <option>02:00</option>
                                                        <option>03:00</option>
                                                        <option>04:00</option>
                                                        <option>05:00</option>
                                                        <option>06:00</option>
                                                        <option>07:00</option>
                                                        <option>08:00</option>
                                                        <option>09:00</option>
                                                        <option>10:00</option>
                                                        <option>11:00</option>
                                                        <option>12:00</option>
                                                        <option>13:00</option>
                                                        <option>14:00</option>
                                                        <option>15:00</option>
                                                        <option>16:00</option>
                                                        <option>17:00</option>
                                                        <option>18:00</option>
                                                        <option>19:00</option>
                                                        <option>20:00</option>
                                                        <option>21:00</option>
                                                        <option>22:00</option>
                                                        <option>23:00</option>

                                                    </Select>
                                                    <span className="custom-icon">
                                                        {/* Ícone personalizado (por exemplo, um ícone de relógio) */}
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24">
                                                            <path d="M12 2c-5.52 0-10 4.48-10 10s4.48 10 10 10 10-4.48 10-10-4.48-10-10-10zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-9v6h2v-7h-2z" />
                                                        </svg>
                                                    </span>
                                                </div>
                                            </Table.Cell>
                                            <Table.Cell className='px-1.5'>
                                                <div className="select-wrapper">

                                                    <Select value={horariofimquinta} onChange={(event) => setHorarioFimQuinta(event.target.value)} id="hours" required>
                                                    <option>--:--</option>
                                                        <option>01:00</option>
                                                        <option>02:00</option>
                                                        <option>03:00</option>
                                                        <option>04:00</option>
                                                        <option>05:00</option>
                                                        <option>06:00</option>
                                                        <option>07:00</option>
                                                        <option>08:00</option>
                                                        <option>09:00</option>
                                                        <option>10:00</option>
                                                        <option>11:00</option>
                                                        <option>12:00</option>
                                                        <option>13:00</option>
                                                        <option>14:00</option>
                                                        <option>15:00</option>
                                                        <option>16:00</option>
                                                        <option>17:00</option>
                                                        <option>18:00</option>
                                                        <option>19:00</option>
                                                        <option>20:00</option>
                                                        <option>21:00</option>
                                                        <option>22:00</option>
                                                        <option>23:00</option>

                                                    </Select>
                                                    <span className="custom-icon">
                                                        {/* Ícone personalizado (por exemplo, um ícone de relógio) */}
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24">
                                                            <path d="M12 2c-5.52 0-10 4.48-10 10s4.48 10 10 10 10-4.48 10-10-4.48-10-10-10zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-9v6h2v-7h-2z" />
                                                        </svg>
                                                    </span>
                                                </div>
                                            </Table.Cell>
                                        </Table.Row>
                                    </Table.Body>
                                    <Table.Body className="divide-y py-0  border-b border-gray-50	">
                                        <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800 py-0 px-0 m-0">
                                            <Table.Cell className=" font-medium text-gray-900  text-center py-0 px-0 m-0">Sexta-Feira: </Table.Cell>

                                            <Table.Cell className='px-1.5'>
                                                <div className="select-wrapper">

                                                    <Select value={horarioiniciosexta} onChange={(event) => setHorarioInicioSexta(event.target.value)} id="hours" required>
                                                    <option>--:--</option>
                                                        <option>00:00</option>
                                                        <option>01:00</option>
                                                        <option>02:00</option>
                                                        <option>03:00</option>
                                                        <option>04:00</option>
                                                        <option>05:00</option>
                                                        <option>06:00</option>
                                                        <option>07:00</option>
                                                        <option>08:00</option>
                                                        <option>09:00</option>
                                                        <option>10:00</option>
                                                        <option>11:00</option>
                                                        <option>12:00</option>
                                                        <option>13:00</option>
                                                        <option>14:00</option>
                                                        <option>15:00</option>
                                                        <option>16:00</option>
                                                        <option>17:00</option>
                                                        <option>18:00</option>
                                                        <option>19:00</option>
                                                        <option>20:00</option>
                                                        <option>21:00</option>
                                                        <option>22:00</option>
                                                        <option>23:00</option>

                                                    </Select>
                                                    <span className="custom-icon">
                                                        {/* Ícone personalizado (por exemplo, um ícone de relógio) */}
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24">
                                                            <path d="M12 2c-5.52 0-10 4.48-10 10s4.48 10 10 10 10-4.48 10-10-4.48-10-10-10zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-9v6h2v-7h-2z" />
                                                        </svg>
                                                    </span>
                                                </div>
                                            </Table.Cell>
                                            <Table.Cell className='px-1.5'>
                                                <div className="select-wrapper">

                                                    <Select value={horariofimsexta} onChange={(event) => setHorarioFimSexta(event.target.value)} id="hours" required>
                                                    <option>--:--</option>
                                                        <option>01:00</option>
                                                        <option>02:00</option>
                                                        <option>03:00</option>
                                                        <option>04:00</option>
                                                        <option>05:00</option>
                                                        <option>06:00</option>
                                                        <option>07:00</option>
                                                        <option>08:00</option>
                                                        <option>09:00</option>
                                                        <option>10:00</option>
                                                        <option>11:00</option>
                                                        <option>12:00</option>
                                                        <option>13:00</option>
                                                        <option>14:00</option>
                                                        <option>15:00</option>
                                                        <option>16:00</option>
                                                        <option>17:00</option>
                                                        <option>18:00</option>
                                                        <option>19:00</option>
                                                        <option>20:00</option>
                                                        <option>21:00</option>
                                                        <option>22:00</option>
                                                        <option>23:00</option>

                                                    </Select>
                                                    <span className="custom-icon">
                                                        {/* Ícone personalizado (por exemplo, um ícone de relógio) */}
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24">
                                                            <path d="M12 2c-5.52 0-10 4.48-10 10s4.48 10 10 10 10-4.48 10-10-4.48-10-10-10zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-9v6h2v-7h-2z" />
                                                        </svg>
                                                    </span>
                                                </div>
                                            </Table.Cell>
                                        </Table.Row>
                                    </Table.Body>
                                    <Table.Body className="divide-y border-b border-gray-50">
                                        <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800 py-0 px-0 m-0">
                                            <Table.Cell className=" font-medium text-gray-900  text-center py-0 px-0 m-0">Sábado: </Table.Cell>

                                            <Table.Cell className='px-1.5'>
                                                <div className="select-wrapper">

                                                    <Select value={horarioiniciosabado} onChange={(event) => setHorarioInicioSabado(event.target.value)} id="hours" required>
                                                    <option>--:--</option>
                                                        <option>00:00</option>
                                                        <option>01:00</option>
                                                        <option>02:00</option>
                                                        <option>03:00</option>
                                                        <option>04:00</option>
                                                        <option>05:00</option>
                                                        <option>06:00</option>
                                                        <option>07:00</option>
                                                        <option>08:00</option>
                                                        <option>09:00</option>
                                                        <option>10:00</option>
                                                        <option>11:00</option>
                                                        <option>12:00</option>
                                                        <option>13:00</option>
                                                        <option>14:00</option>
                                                        <option>15:00</option>
                                                        <option>16:00</option>
                                                        <option>17:00</option>
                                                        <option>18:00</option>
                                                        <option>19:00</option>
                                                        <option>20:00</option>
                                                        <option>21:00</option>
                                                        <option>22:00</option>
                                                        <option>23:00</option>

                                                    </Select>
                                                    <span className="custom-icon">
                                                        {/* Ícone personalizado (por exemplo, um ícone de relógio) */}
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24">
                                                            <path d="M12 2c-5.52 0-10 4.48-10 10s4.48 10 10 10 10-4.48 10-10-4.48-10-10-10zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-9v6h2v-7h-2z" />
                                                        </svg>
                                                    </span>
                                                </div>
                                            </Table.Cell>
                                            <Table.Cell className='px-1.5'>
                                                <div className="select-wrapper">

                                                    <Select value={horariofimsabado} onChange={(event) => setHorarioFimSabado(event.target.value)} id="hours" required>
                                                    <option>--:--</option>
                                                        <option>01:00</option>
                                                        <option>02:00</option>
                                                        <option>03:00</option>
                                                        <option>04:00</option>
                                                        <option>05:00</option>
                                                        <option>06:00</option>
                                                        <option>07:00</option>
                                                        <option>08:00</option>
                                                        <option>09:00</option>
                                                        <option>10:00</option>
                                                        <option>11:00</option>
                                                        <option>12:00</option>
                                                        <option>13:00</option>
                                                        <option>14:00</option>
                                                        <option>15:00</option>
                                                        <option>16:00</option>
                                                        <option>17:00</option>
                                                        <option>18:00</option>
                                                        <option>19:00</option>
                                                        <option>20:00</option>
                                                        <option>21:00</option>
                                                        <option>22:00</option>
                                                        <option>23:00</option>

                                                    </Select>
                                                    <span className="custom-icon">
                                                        {/* Ícone personalizado (por exemplo, um ícone de relógio) */}
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24">
                                                            <path d="M12 2c-5.52 0-10 4.48-10 10s4.48 10 10 10 10-4.48 10-10-4.48-10-10-10zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-9v6h2v-7h-2z" />
                                                        </svg>
                                                    </span>
                                                </div>
                                            </Table.Cell>
                                        </Table.Row>
                                    </Table.Body>
                                </Table>
                            </div>





                            <div className="w-full m-4 ml-2">
                                <Button onClick={onSave} className='bg-blue-500 mb-2 rounded text-white font-semibold hover:bg-blue-600'>
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

export default ModalLogonUser;