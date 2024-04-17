import { useState, useEffect } from 'react';
import { Button, Label, Modal, TextInput } from 'flowbite-react';
import { HiOutlinePencil } from "react-icons/hi";
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';


function ModalEditUser(user) {
    const [openModal, setOpenModal] = useState(false);
    const [displayname, setDisplayname] = useState('');
    const [givename, setGivename] = useState('');
    const [sn, setSn] = useState('');
    const [password, setPassword] = useState('');
    const [periodoacesso, setPeriodoacesso] = useState('');
    const [confirmpassword, setConfirmPassword] = useState('');

    useEffect(() => {
        console.log(user.samaccountname);
        if (user) {
            setDisplayname(user.displayname);
            setGivename(user.givename);
            setSn(user.sn);
            setPeriodoacesso(user.periodoacesso);
        }

        async function fetchUserData() {
            try {
                const response = await axios.get(`http://localhost:3000/usuarios/exibir/${user.samaccountname}`);
                setDisplayname(response.data.displayname);
                setGivename(response.data.givename);
                setSn(response.data.sn);
                setPeriodoacesso(response.data.periodoacesso);

            } catch (error) {
                console.error('Erro ao buscar informações do usuário:', error);
                toast.error(error.response.data.msg)

                }
                }
                
                if (user) {
                    fetchUserData();
                }
            }, [user]);
            
            async function onCloseModal() {
                setOpenModal(false);
            }
            

            async function onSave() {
                try {
                    const response = await axios.post(`http://localhost:3000/usuarios/editar/${user.samaccountname}`, {
                        displayname,
                        givename,
                        sn,
                        periodoacesso,
                        password,
                        confirmpassword
                    });
                    console.log('Usuário editado com sucesso:', response.data);

                    setOpenModal(false);
                    setPeriodoacesso('');
                    setPassword('');
                    setConfirmPassword('');
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
                        <HiOutlinePencil style={{ fontSize: '1rem' }} />
                    </Button>
            
                    <Modal show={openModal} size="2xl" onClose={onCloseModal} popup>
                        <Modal.Header />
                        <Modal.Body>
                            <div className="space-y-6">
                                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Editar Usuário</h3>
                                <form>
                                    <div className='grid md:grid-cols-2 sm:grid-cols-1 py-2'>
                                        <div className='mx-1'>
                                            <Label htmlFor="Nome" value="Nome" />
                                            <TextInput
                                                id="givename"
                                                placeholder="Fulano"
                                                value={givename}
                                                onChange={(event) => setGivename(event.target.value)}
                                                required
                                            />
                                        </div>
                                        <div className='mx-1'>
                                            <Label htmlFor="Sobrenome" value="Sobrenome" />
                                            <TextInput
                                                id="sn"
                                                placeholder="Silva"
                                                value={sn}
                                                onChange={(event) => setSn(event.target.value)}
                                                required
                                            />
                                        </div>
                                    </div>
            
                                    <div className='grid md:grid-cols-2 sm:grid-cols-1 py-2'>
                                        <div className='mx-1'>
                                            <Label htmlFor="Login" value="Login" />
                                            <TextInput
                                                id="userlogon"
                                                placeholder="fulano.silva"
                                                value={displayname}
                                                onChange={(event) => setDisplayname(event.target.value)}
                                                required
                                            />
                                        </div>
                                        <div className='mx-1'>
                                            <Label htmlFor="Período de Acesso" value="Período de Acesso" />
                                            <select
                                                id="periodoacesso"
                                                value={periodoacesso}
                                                onChange={(event) => setPeriodoacesso(event.target.value)}
                                                className="border border-gray-300 bg-gray-50 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                                required
                                            >
                                                <option value="" selected>Selecione o período</option>

                                                <option value="7to19">7:00 às 19:00 horas</option>
                                                <option value="14to23">14:00 às 23:00 horas</option>
                                                <option value="7to23">7:00 às 23:00 horas</option>
                                                <option value="fulltime">Sem restrição de horário - Full Time</option>

                                            </select>
                                        </div>
                                    </div>
            
                                    <div className='grid md:grid-cols-2 sm:grid-cols-1 py-2'>
                                        <div className='mx-1'>
                                            <Label htmlFor="Senha" value="Senha" />
                                            <TextInput
                                                id="password"
                                                type="password"
                                                placeholder="**********"
                                                value={password}
                                                onChange={(event) => setPassword(event.target.value)}
                                                required
                                            />
                                        </div>
                                        <div className='mx-1'>
                                            <Label htmlFor="Confirme a Senha" value="Confirme a senha" />
                                            <TextInput
                                                id="confirmpassword"
                                                type="password"
                                                placeholder="**********"
                                                value={confirmpassword}
                                                onChange={(event) => setConfirmPassword(event.target.value)}
                                                required
                                            />
                                        </div>
                                    </div>
            
                                    <div className="w-full">
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

        export default ModalEditUser;