import { useState, useEffect } from 'react';
import { Button, Modal, Table, TextInput, Select } from 'flowbite-react';
import { HiClock } from "react-icons/hi";
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import { Oval } from 'react-loader-spinner';
import URL from '../api/config'
import { useDarkMode } from '../DarkModeContext'; 



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
    const [errors, setErrors] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const { isDarkMode } = useDarkMode();

    async function onCloseModal() {
        setOpenModal(false);
    }

    useEffect(() => {
        if (openModal && user) {
            setIsLoading(true)
            async function fetchUserData() {
                try {
                    const response = await axios.get(`${URL}/usuarios/getlogonhours/${user.samaccountname}`);
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
                    setIsLoading(false);
                } catch (error) {
                    toast.error(error.response.data.msg);
                    setIsLoading(false);
                }
            }
            fetchUserData();
        }
    }, [openModal, user]);

    async function onSave() {
        const newErrors = {};
        if (horarioiniciodomingo > horariofimdomingo) newErrors.horariodomingo = '*Horário de fim não pode ser menor que horário de início';
        if (horarioiniciosegunda > horariofimsegunda) newErrors.horariosegunda = '*Horário de fim não pode ser menor que horário de início';
        if (horarioinicioterca > horariofimterca) newErrors.horarioterca = '*Horário de fim não pode ser menor que horário de início';
        if (horarioinicioquarta > horariofimquarta) newErrors.horarioquarta = '*Horário de fim não pode ser menor que horário de início';
        if (horarioinicioquinta > horariofimquinta) newErrors.horarioquinta = '*Horário de fim não pode ser menor que horário de início';
        if (horarioiniciosexta > horariofimsexta) newErrors.horariosexta = '*Horário de fim não pode ser menor que horário de início';
        if (horarioiniciosabado > horariofimsabado) newErrors.horariosabado = '*Horário de fim não pode ser menor que horário de início';

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        setIsLoading(true);

        try {
            const response = await axios.post(`${URL}/usuarios/setlogonhours/${user.samaccountname}`, {
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

            setTimeout(() => {
                setIsLoading(false);
                toast.success('Horário de logon atualizado com sucesso!', {
                    autoClose: 4000,
                    onClose: () => {
                        setTimeout(() => {
                            setOpenModal(false);
                            window.location.reload();
                        });
                    }
                });
            });
        } catch (error) {
            setIsLoading(false);
            console.error('Erro ao editar usuário:', error);
            toast.error(error.response.data.msg);
        }
    }




    return (
        <div>
            <ToastContainer />

            <Button color="blue" className={`mr-2 ${isDarkMode ? 'bg-zinc-600  dark:bg-zinc-600 border-0 m-0 buttonhover text-blue-500 ' : 'bg-gray-100 dark:bg-gray-100  border-0 m-0 text-blue-400 '} focus:outline-none focus:ring-0 disabled:opacity-50`}
 onClick={() => setOpenModal(true)}>
                <HiClock style={{ fontSize: '1rem' }} />
            </Button>
            <Modal show={openModal} size="2xl" onClose={onCloseModal}  style={{ zIndex: 9999 }} popup className=' flex items-center justify-center'>
                <Modal.Header className={`${isDarkMode ? 'bg-zinc-800': 'dark:bg-white '}`}  />
                <Modal.Body className={`${isDarkMode ? 'bg-zinc-800': 'dark:bg-white '}`} >
                    <div className={`space-y-4 ${isDarkMode ? 'bg-zinc-800' :  'dark:bg-white'} `}>
                        <h3 className={`text-xl  font-semibold   ${isDarkMode ? 'text-gray-100' : 'text-gray-900 dark:text-gray-900'}`}>Horário de Login - {user.samaccountname} </h3>
                        {isLoading ? (
                            <div className="flex justify-center items-center h-64">
                                <Oval color="#1658f2" height={50} width={50} />
                            </div>
                        ) : (
                        <form>
                            <div className="overflow-x-auto max-h-[60vh] ">
                                <Table className={`${isDarkMode ? 'bg-zinc-800': 'dark:bg-white '}`}>
                                    <Table.Head className={`p-0 m-0 ${isDarkMode && 'bgdark1 text-gray-100'}`}>
                                        <Table.HeadCell className={` ${isDarkMode ?'bgdark1 dark:bgdark1 text-gray-100': 'dark:bg-gray-100 dark:text-gray-900'} text-center font-medium"`}>Dia da Semana</Table.HeadCell>
                                        <Table.HeadCell className={` ${isDarkMode ?'bgdark1 dark:bgdark1 text-gray-100': 'dark:bg-gray-100 dark:text-gray-900'} text-center font-medium"`}>Horário Inicial</Table.HeadCell>
                                        <Table.HeadCell className={` ${isDarkMode ?'bgdark1 dark:bgdark1 text-gray-100': 'dark:bg-gray-100 dark:text-gray-900'} text-center font-medium"`}>Horário Final</Table.HeadCell>

                                    </Table.Head>
                                    <Table.Body className={`divide-y border-b ${isDarkMode ? 'border-zinc-700 ' : 'border-gray-50'}`}>
                                        <Table.Row className={` ${isDarkMode ? 'bg-zinc-800 ' : 'bg-white '}  py-0 px-0 m-0`}>
                                            <Table.Cell className={` ${isDarkMode ? 'text-gray-100' : 'text-gray-900'} font-medium   text-center py-0 px-0 m-0`}>Domingo: </Table.Cell>
                                            <Table.Cell className='px-1.5'>
                                                <div className="select-wrapper ">

<div className='darkbgselect'>
                                                    <Select value={horarioiniciodomingo}   className={`${isDarkMode ? 'darkbgselect dark:darkbgselect': 'lightbgselect dark:lightbgselect'}`} onChange={(event) => setHorarioInicioDomingo(event.target.value)} id="hours" required>
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
                                                        <option >09:00</option>
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
                                                    </div>
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

                                                    <Select value={horariofimdomingo} className={`${isDarkMode ? 'darkbgselect dark:darkbgselect': 'lightbgselect dark:lightbgselect'}`} onChange={(event) => setHorarioFimDomingo(event.target.value)} id="hours" required>
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
                                                {errors.horariodomingo && <p className="text-red-600 text-xs font-medium">{errors.horariodomingo}</p>}
                                            </Table.Cell>
                                        </Table.Row>
                                    </Table.Body>
                                    <Table.Body className={`divide-y border-b ${isDarkMode ? 'border-zinc-700 ' : 'border-gray-50'}`}>
                                        <Table.Row className={` ${isDarkMode ? 'bg-zinc-800 ' : 'bg-white '}  py-0 px-0 m-0`}>
                                            <Table.Cell className={` ${isDarkMode ? 'text-gray-100' : 'text-gray-900'} font-medium text-center py-0 px-0 m-0`}>Segunda-Feira: </Table.Cell>

                                            <Table.Cell className='px-1.5'>

                                                <div className="select-wrapper">

                                                    <Select value={horarioiniciosegunda} className={`${isDarkMode ? 'darkbgselect dark:darkbgselect': 'lightbgselect dark:lightbgselect'}`} onChange={(event) => setHorarioInicioSegunda(event.target.value)} id="hours" required>
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

                                                    <Select value={horariofimsegunda}  className={`${isDarkMode ? 'darkbgselect dark:darkbgselect': 'lightbgselect dark:lightbgselect'}`} onChange={(event) => setHorarioFimSegunda(event.target.value)} id="hours" required>
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
                                                {errors.horariosegunda && <p className="text-red-600 text-xs font-medium">{errors.horariosegunda}</p>}
                                            </Table.Cell>
                                        </Table.Row>
                                    </Table.Body>
                                    <Table.Body className={`divide-y border-b ${isDarkMode ? 'border-zinc-700 ' : 'border-gray-50'}`}>
                                        <Table.Row className={` ${isDarkMode ? 'bg-zinc-800 ' : 'bg-white '}  py-0 px-0 m-0`}>
                                            <Table.Cell className={` ${isDarkMode ? 'text-gray-100' : 'text-gray-900'} font-medium text-center py-0 px-0 m-0`}>Terça-Feira: </Table.Cell>

                                            <Table.Cell className='px-1.5'>
                                                <div className="select-wrapper">

                                                    <Select value={horarioinicioterca}  className={`${isDarkMode ? 'darkbgselect dark:darkbgselect': 'lightbgselect dark:lightbgselect'}`} onChange={(event) => setHorarioInicioTerca(event.target.value)} id="hours" required>
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

                                                    <Select value={horariofimterca} className={`${isDarkMode ? 'darkbgselect dark:darkbgselect': 'lightbgselect dark:lightbgselect'}`}  onChange={(event) => setHorarioFimTerca(event.target.value)} id="hours" required>
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
                                                {errors.horarioterca && <p className="text-red-600 text-xs font-medium">{errors.horarioterca}</p>}

                                            </Table.Cell>
                                        </Table.Row>
                                    </Table.Body>
                                    <Table.Body className={`divide-y border-b ${isDarkMode ? 'border-zinc-700 ' : 'border-gray-50'}`}>
                                        <Table.Row className={` ${isDarkMode ? 'bg-zinc-800 ' : 'bg-white '}  py-0 px-0 m-0`}>
                                            <Table.Cell className={` ${isDarkMode ? 'text-gray-100' : 'text-gray-900'} font-medium text-center py-0 px-0 m-0`}>Quarta-Feira: </Table.Cell>

                                            <Table.Cell className='px-1.5'>
                                                <div className="select-wrapper">

                                                    <Select value={horarioinicioquarta} className={`${isDarkMode ? 'darkbgselect dark:darkbgselect': 'lightbgselect dark:lightbgselect'}`}  onChange={(event) => setHorarioInicioQuarta(event.target.value)} id="hours" required>
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

                                                    <Select value={horariofimquarta} className={`${isDarkMode ? 'darkbgselect dark:darkbgselect': 'lightbgselect dark:lightbgselect'}`}  onChange={(event) => setHorarioFimQuarta(event.target.value)} id="hours" required>
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
                                                {errors.horarioquarta && <p className="text-red-600 text-xs font-medium">{errors.horarioquarta}</p>}

                                            </Table.Cell>
                                        </Table.Row>
                                    </Table.Body>
                                    <Table.Body className={`divide-y border-b ${isDarkMode ? 'border-zinc-700 ' : 'border-gray-50'}`}>
                                        <Table.Row className={` ${isDarkMode ? 'bg-zinc-800 ' : 'bg-white '}  py-0 px-0 m-0`}>
                                            <Table.Cell className={` ${isDarkMode ? 'text-gray-100' : 'text-gray-900'} font-medium text-center py-0 px-0 m-0`}>Quinta-Feira: </Table.Cell>

                                            <Table.Cell className='px-1.5'>
                                                <div className="select-wrapper">

                                                    <Select value={horarioinicioquinta} className={`${isDarkMode ? 'darkbgselect dark:darkbgselect': 'lightbgselect dark:lightbgselect'}`} onChange={(event) => setHorarioInicioQuinta(event.target.value)} id="hours" required>
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

                                                    <Select value={horariofimquinta} className={`${isDarkMode ? 'darkbgselect dark:darkbgselect': 'lightbgselect dark:lightbgselect'}`} onChange={(event) => setHorarioFimQuinta(event.target.value)} id="hours" required>
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
                                                {errors.horarioquinta && <p className="text-red-600 text-xs font-medium">{errors.horarioquinta}</p>}

                                            </Table.Cell>
                                        </Table.Row>
                                    </Table.Body>
                                    <Table.Body className={`divide-y border-b ${isDarkMode ? 'border-zinc-700 ' : 'border-gray-50'}`}>
                                        <Table.Row className={` ${isDarkMode ? 'bg-zinc-800 ' : 'bg-white '}  py-0 px-0 m-0`}>
                                            <Table.Cell className={` ${isDarkMode ? 'text-gray-100' : 'text-gray-900'} font-medium text-center py-0 px-0 m-0`}>Sexta-Feira: </Table.Cell>

                                            <Table.Cell className='px-1.5'>
                                                <div className="select-wrapper">

                                                    <Select value={horarioiniciosexta} className={`${isDarkMode ? 'darkbgselect dark:darkbgselect': 'lightbgselect dark:lightbgselect'}`}  onChange={(event) => setHorarioInicioSexta(event.target.value)} id="hours" required>
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

                                                    <Select value={horariofimsexta} className={`${isDarkMode ? 'darkbgselect dark:darkbgselect': 'lightbgselect dark:lightbgselect'}`} onChange={(event) => setHorarioFimSexta(event.target.value)} id="hours" required>
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
                                                {errors.horariosexta && <p className="text-red-600 text-xs font-medium">{errors.horariosexta}</p>}

                                            </Table.Cell>
                                        </Table.Row>
                                    </Table.Body>
                                    <Table.Body className={`divide-y border-b ${isDarkMode ? 'border-zinc-700 ' : 'border-gray-50'}`}>
                                        <Table.Row className={` ${isDarkMode ? 'bg-zinc-800 ' : 'bg-white '}  py-0 px-0 m-0`}>
                                            <Table.Cell className={` ${isDarkMode ? 'text-gray-100' : 'text-gray-900'} font-medium text-center py-0 px-0 m-0`}>Sábado: </Table.Cell>

                                            <Table.Cell className='px-1.5'>
                                                <div className="select-wrapper">

                                                    <Select value={horarioiniciosabado} className={`${isDarkMode ? 'darkbgselect dark:darkbgselect': 'lightbgselect dark:lightbgselect'}`}  onChange={(event) => setHorarioInicioSabado(event.target.value)} id="hours" required>
                                                    <option className={` ${isDarkMode && 'bg-gray-900 text-gray-100'}`}>--:--</option>
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

                                                    <Select value={horariofimsabado}  className={`${isDarkMode ? 'darkbgselect dark:darkbgselect': 'lightbgselect dark:lightbgselect'}`} onChange={(event) => setHorarioFimSabado(event.target.value)} id="hours" required>
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
                                                {errors.horariosabado && <p className="text-red-600 text-xs font-medium">{errors.horariosabado}</p>}

                                            </Table.Cell>
                                        </Table.Row>
                                    </Table.Body>
                                </Table>
                            </div>





                            <div className="w-full mt-4">
                                    <Button color="blue" onClick={onSave} className='bg-blue-500 mb-2 rounded text-white font-semibold hover:bg-blue-600'>
                                        Salvar
                                    </Button>
                                </div>
                        </form>
                       )}

                    </div>
                </Modal.Body>
            </Modal>
        </div>
    );
}

export default ModalLogonUser;