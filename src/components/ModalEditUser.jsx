// import { useState, useEffect } from 'react';
// import { Button, Label, Modal, TextInput,Checkbox } from 'flowbite-react';
// import { HiOutlinePencil } from "react-icons/hi";
// import axios from 'axios';
// import { ToastContainer, toast } from 'react-toastify';



// function ModalEditUser(user) {
//     const [openModal, setOpenModal] = useState(false);

//     const [errors, setErrors] = useState({});
//     const [displayname, setDisplayname] = useState('');
//     const [givename, setGivename] = useState('');
//     const [sn, setSn] = useState('');
//     const [password, setPassword] = useState('');
//     const [confirmpassword, setConfirmPassword] = useState('');
//     const [status, setStatus] =useState('')

//     useEffect(() => {
//         async function fetchUserData() {
//             try {
//                 const response = await axios.get(`http://192.168.123.91:3000/usuarios/exibir/${user.samaccountname}`);
//                 setDisplayname(response.data.displayname);
//                 setGivename(response.data.givename);
//                 setSn(response.data.sn);
//                 // setPeriodoacesso(response.data.periodoacesso);
//                 setStatus(response.data.status)

//             } catch (error) {
//                 toast.error(error.response.data.msg)

//                 }
//                 }
                
//                 if (user) {
//                     fetchUserData();
//                 }
//             }, [user]);
            
//             async function onCloseModal() {
//                 setOpenModal(false);
//             }
            

//             async function onSave() {
//                 try {
//                     const response = await axios.post(`http://192.168.123.91:3000/usuarios/editar/${user.samaccountname}`, {
//                         displayname,
//                         givename,
//                         sn,
//                         // periodoacesso,
//                         password,
//                         confirmpassword,
//                         status
//                     });
//                     console.log('Usuário editado com sucesso:', response.data);
//                     const errors = {};

//                     if (!displayname) {
//                         errors.displayname = "O login é obrigatório.";
//                     }
            
//                     if (!givename) {
//                         errors.givename = "O nome é obrigatório.";
//                     }
            
//                     if (!sn) {
//                         errors.sn = "O login é obrigatório.";
//                     }
            
            
//                     if (Object.keys(errors).length > 0) {
//                         setErrors(errors);
//                         return;
//                     }
            
//                     setOpenModal(false);
//                     // setPeriodoacesso('');
//                     setPassword('');
//                     setConfirmPassword('');
//                     toast.success("Usuário atualizado com sucesso!", {
//                         autoClose: 3500 // 5000 milissegundos = 5 segundos
//                     });                   
//                      setTimeout(() => {
//                         window.location.reload();
//                     }, 3800);

//                 } catch (error) {
//                     console.error('Erro ao editar usuário:', error);
//                     toast.error(error.response.data.msg)

//                 }
//             }

//             return (
//                 <div>
//                         <ToastContainer />

//                     <Button className='mr-2 text-blue-500 bg-gray-50 hover:bg-gray-100 focus:outline-none disabled:opacity-50 active:bg-gray-700' onClick={() => setOpenModal(true)}>
//                         <HiOutlinePencil style={{ fontSize: '1rem' }} />
//                     </Button>
            
//                     <Modal show={openModal} size="2xl" onClose={onCloseModal} popup>
//                         <Modal.Header />
//                         <Modal.Body>
//                             <div className="space-y-6">
//                                 <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Editar Usuário - {user.samaccountname}</h3>
//                                 <form>
//                                 <div className='m-1'>
//                                         <div className="flex items-center gap-2">
//                                             <Checkbox checked={status} onChange={() => setStatus(!status)} /> {/* checkbox */}
//                                             <Label htmlFor="accept" className="flex">
//                                                 Habilitado
//                                             </Label>
//                                         </div>

// </div>
//                                     <div className='grid md:grid-cols-2 sm:grid-cols-1 py-2'>
                                   
//                                     <div className='mx-1'>
//                                 <Label htmlFor="Nome" value="Nome" />
//                                 <TextInput
//                                     id="givename"
//                                     placeholder="Fulano"
//                                     value={givename}
//                                     onChange={(event) => setGivename(event.target.value)}
//                                     error={errors.givename}
//                                 />
//                                 {errors.givename && <span className=" text-sm text-red-500">{errors.givename}</span>}
//                             </div>
//                                         <div className='mx-1'>
//                                             <Label htmlFor="Sobrenome" value="Sobrenome" />
//                                             <TextInput
//                                                 id="sn"
//                                                 placeholder="Silva"
//                                                 value={sn}
//                                                 onChange={(event) => setSn(event.target.value)}
//                                                 required
//                                             />
//                                         </div>
//                                     </div>
            
//                                         <div className='mx-1'>
//                                             <Label htmlFor="Login" value="Login" />
//                                             <TextInput
//                                                 id="userlogon"
//                                                 placeholder="fulano.silva"
//                                                 value={displayname}
//                                                 onChange={(event) => setDisplayname(event.target.value)}
//                                                 required
//                                             />
//                                         </div>
            
//                                     <div className='grid md:grid-cols-2 sm:grid-cols-1 py-2'>
//                                         <div className='mx-1'>
//                                             <Label htmlFor="Senha" value="Senha" />
//                                             <TextInput
//                                                 id="password"
//                                                 type="password"
//                                                 placeholder="**********"
//                                                 value={password}
//                                                 onChange={(event) => setPassword(event.target.value)}
//                                                 required
//                                             />
//                                         </div>
//                                         <div className='mx-1'>
//                                             <Label htmlFor="Confirme a Senha" value="Confirme a senha" />
//                                             <TextInput
//                                                 id="confirmpassword"
//                                                 type="password"
//                                                 placeholder="**********"
//                                                 value={confirmpassword}
//                                                 onChange={(event) => setConfirmPassword(event.target.value)}
//                                                 required
//                                             />
//                                         </div>
//                                     </div>
  



//                                     <div className="w-full mt-4">
//                                         <Button  onClick={onSave} className='bg-blue-500 mb-2 rounded text-white font-semibold hover:bg-blue-600'>
//                                             Salvar
//                                         </Button>
//                                     </div>
//                                 </form>
//                             </div>
//                         </Modal.Body>
//                     </Modal>
//                 </div>
//             );
//         }

//         export default ModalEditUser;


import { useState, useEffect } from 'react';
import { Button, Label, Modal, TextInput,Checkbox } from 'flowbite-react';
import { HiOutlinePencil } from "react-icons/hi";
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';



function ModalEditUser(user) {
    const [openModal, setOpenModal] = useState(false);
    const [displayname, setDisplayname] = useState('');
    const [givename, setGivename] = useState('');
    const [sn, setSn] = useState('');
    const [password, setPassword] = useState('');
    // const [periodoacesso, setPeriodoacesso] = useState('');
    const [confirmpassword, setConfirmPassword] = useState('');
    const [status, setStatus] =useState()

    useEffect(() => {
        async function fetchUserData() {
            try {
                const response = await axios.get(`http://localhost:3000/usuarios/exibir/${user.samaccountname}`);
                setDisplayname(response.data.displayname);
                setGivename(response.data.givename);
                setSn(response.data.sn);
                // setPeriodoacesso(response.data.periodoacesso);
                setStatus(response.data.status)

            } catch (error) {
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
                        // periodoacesso,
                        password,
                        confirmpassword,
                        status
                    });
                    console.log('Usuário editado com sucesso:', response.data);

                    setOpenModal(false);
                    // setPeriodoacesso('');
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

                    <Button className='mr-2 text-blue-500 bg-gray-50 hover:bg-gray-100 focus:outline-none disabled:opacity-50 active:bg-gray-700' onClick={() => setOpenModal(true)}>
                        <HiOutlinePencil style={{ fontSize: '1rem' }} />
                    </Button>
            
                    <Modal show={openModal} size="2xl" onClose={onCloseModal} popup>
                        <Modal.Header />
                        <Modal.Body>
                            <div className="space-y-6">
                                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Editar Usuário - {user.samaccountname}</h3>
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