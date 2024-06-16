import React, { useState, useEffect } from 'react';
import { Button, Label, Modal, TextInput, Checkbox } from 'flowbite-react';
import { HiOutlinePencil } from "react-icons/hi";
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import { Oval } from 'react-loader-spinner';

function ModalEditUser({ user, fetchUsers }) {
    const [openModal, setOpenModal] = useState(false);
    const [displayname, setDisplayname] = useState('');
    const [givename, setGivename] = useState('');
    const [sn, setSn] = useState('');
    const [password, setPassword] = useState('');
    const [confirmpassword, setConfirmPassword] = useState('');
    const [status, setStatus] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        async function fetchUserData() {
            try {
                const response = await axios.get(`http://localhost:3000/usuarios/exibir/${user.samaccountname}`);
                setDisplayname(response.data.displayname);
                setGivename(response.data.givename);
                setSn(response.data.sn);
                setStatus(response.data.status);
            } catch (error) {
                toast.error(error.response.data.msg);
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
        setIsLoading(true);
        try {
            const response = await axios.post(`http://localhost:3000/usuarios/editar/${user.samaccountname}`, {
                displayname,
                givename,
                sn,
                password,
                confirmpassword,
                status
            });
            console.log('Usuário editado com sucesso:', response.data);

            setOpenModal(false);
            setPassword('');
            setConfirmPassword('');
            toast.success("Usuário atualizado com sucesso!", {
                autoClose: 13000 // 5000 milissegundos = 5 segundos
            });
            setTimeout(() => {

                window.location.reload();
            }, 13000);

            // Chama a função fetchUsers passada por propriedade para atualizar a lista de usuários

        } catch (error) {
            console.error('Erro ao editar usuário:', error);
            toast.error(error.response.data.msg);
        } finally {
            setIsLoading(false);

        }
    }

    return (
        <div>
            <ToastContainer />
            <Button className='mr-2 text-blue-500 bg-gray-50 hover:bg-gray-100 focus:outline-none disabled:opacity-50 active:bg-gray-700' onClick={() => setOpenModal(true)}>
                <HiOutlinePencil style={{ fontSize: '1rem' }} />
            </Button>
            <Modal show={openModal} size="2xl" onClose={onCloseModal} popup>
                <Modal.Header />
                <Modal.Body>
                    <div className="space-y-6">
                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Editar Usuário - {user.samaccountname}</h3>
                        {isLoading ? (
                            <div className="flex justify-center items-center h-64">
                                <Oval color="#1658f2" height={50} width={50} />
                            </div>
                        ) : (
                            <form>
                                <div className='m-1'>
                                    <div className="flex items-center gap-2">
                                        <Checkbox checked={status} onChange={() => setStatus(!status)} /> {/* checkbox */}
                                        <Label htmlFor="accept" className="flex">
                                            Habilitado
                                        </Label>
                                    </div>
                                </div>
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
                                <div className="w-full mt-4">
                                    <Button onClick={onSave} className='bg-blue-500 mb-2 rounded text-white font-semibold hover:bg-blue-600'>
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

export default ModalEditUser;
