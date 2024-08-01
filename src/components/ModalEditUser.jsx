import React, { useState, useEffect } from 'react';
import { Button, Label, Modal, TextInput, Checkbox } from 'flowbite-react';
import { HiOutlinePencil } from "react-icons/hi";
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import { Oval } from 'react-loader-spinner';
import URL from '../api/config'

function ModalEditUser({ user }) {
    const [openModal, setOpenModal] = useState(false);
    // const [displayname, setDisplayname] = useState('');
    const [givename, setGivename] = useState('');
    const [sn, setSn] = useState('');
    const [password, setPassword] = useState('');
    const [confirmpassword, setConfirmPassword] = useState('');
    const [status, setStatus] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState({});
    
    useEffect(() => {
        if (openModal && user) {
            setIsLoading(true);
            async function fetchUserData() {
                try {
                    const response = await axios.get(`${URL}/usuarios/exibir/${user.samaccountname}`);
                    setGivename(response.data.givename);
                    setSn(response.data.sn);
                    setStatus(response.data.status);
                    setIsLoading(false);
                } catch (error) {
                    toast.error(error.response.data.msg);
                    setIsLoading(false);
                }
            }
            fetchUserData();
        }
    }, [openModal, user]);
    async function onCloseModal() {
        setOpenModal(false);
    }

    async function onSave() {
        const newErrors = {};
        if (!givename) newErrors.givename = '*Preencha esse campo';
        if (!sn) newErrors.sn = '*Preencha esse campo';
        if (password && !confirmpassword) newErrors.confirmpassword = '*Preencha esse campo';
        if (!password && confirmpassword) newErrors.password = '*Preencha esse campo';
        if (password !== confirmpassword) newErrors.senhasdiferentes = 'As senhas não coincidem!';

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        setIsLoading(true);
        try {
            const response = await axios.post(`${URL}/usuarios/editar/${user.samaccountname}`, {
                givename,
                sn,
                password,
                confirmpassword,
                status
            });
            console.log('Usuário editado com sucesso:', response.data);

            setTimeout(() => {
                setIsLoading(false);
            }, 8000);
            // Atrasar a exibição do toast
            setTimeout(() => {
                toast.success('Usuário atualizado com sucesso! Fazendo Replicação...', {
                    autoClose: 4000, // 12 segundos para o toast
                    onClose: () => {
                        setTimeout(() => {
                            setOpenModal(false);
                            window.location.reload();
                        }, 4000); // 19 segundos adicionais após o toast fechar
                    }
                });
            }, 8000); // Atraso de 2 segundos antes de exibir o toast

        } catch (error) {
            console.error('Erro ao editar usuário:', error);
            toast.error("Erro ao editar o usuário!");
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
                                            className={errors.givename ? 'input-error' : ''}
                                        />
                                       {errors.givename && <p className="text-red-600 text-xs font-medium">{errors.givename}</p>}

                                    </div>
                                    <div className='mx-1'>
                                        <Label htmlFor="Sobrenome" value="Sobrenome" />
                                        <TextInput
                                            id="sn"
                                            placeholder="Silva"
                                            value={sn}
                                            onChange={(event) => setSn(event.target.value)}
                                            required
                                            className={errors.sn ? 'input-error' : ''}
                                        />
                                        {errors.sn && <p className="text-red-600 text-xs font-medium">{errors.sn}</p>}
                                    </div>
                                </div>
                                {/* <div className='mx-1'>
                                    <Label htmlFor="Login" value="Login" />
                                    <TextInput
                                        id="userlogon"
                                        placeholder="fulano.silva"
                                        value={displayname}
                                        onChange={(event) => setDisplayname(event.target.value)}
                                        required
                                        className={errors.displayname ? 'input-error' : ''}
                                    />
                                    {errors.displayname && <p className="text-red-600 text-xs font-medium">{errors.displayname}</p>}
                                </div> */}
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
                                            className={errors.password ? 'input-error' : ''}
                                        />
                                        {errors.password && <p className="text-red-600 text-xs font-medium">{errors.password}</p>}
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
                                            className={errors.confirmpassword ? 'input-error' : ''}
                                        />
                                        {errors.confirmpassword && <p className="text-red-600 text-xs font-medium">{errors.confirmpassword}</p>}
                                    </div>
                                </div>
                                {errors.senhasdiferentes && <p className="text-red-600 text-xs font-medium mt-3">{errors.senhasdiferentes}</p>}

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
