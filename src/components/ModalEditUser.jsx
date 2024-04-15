// import {useState, useEffect} from 'react';
// import { Button, Label, Modal, TextInput } from 'flowbite-react';
// import { HiOutlinePencil  } from "react-icons/hi";
// import axios from 'axios';


// function ModalEditUser(user) {
//     const [openModal, setOpenModal] = useState(false);
//     const [userData, setUserData] = useState(null);
//     const [displayname, setDisplayName]= useState('');
//     const [givenname, setGiveName] = useState('');
//     const [sn, setSn] = useState('');
//     const [password, setPassword] = useState('');
//     const [confirmpassword, setConfirmPassword] = useState('');


//     const usercn= user.username;
//     useEffect(() => {
//         async function fetchUserData() {
//             try {
//                 const response = await axios.get(`http://localhost:3000/usuarios/exibir/${usercn}`);
//                 setUserData(response.data);
//             } catch (error) {
//                 console.error('Erro ao buscar informações do usuário:', error);
//             }
//         }

//         if (usercn) {
//             fetchUserData();
//         }
//     }, [usercn]);

//     async function onCloseModal() {
//         setOpenModal(false);
//     }


  
  
//   return (
//     <div>
//       <Button className='mr-2 text-blue-500 focus:outline-none' onClick={() => setOpenModal(true)}>
//                       <HiOutlinePencil  style={{ fontSize: '1rem' }} />

//   </Button>

//       <Modal show={openModal} size="2xl" onClose={onCloseModal} popup>
//         <Modal.Header />
//         <Modal.Body>
//           <div className="space-y-6">
//             <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Novo Usuário</h3>
//             {userData && (

//             <div>
//             <div className='grid md:grid-cols-2 sm:grid-cols-1 py-2'>

//             <div className='mx-1'>
//             <Label htmlFor="Nome" value="Nome" />
//               <TextInput
//                 id="givename"
//                 placeholder="Fulano"
//                 value={user.givename}
//                 onChange={(event) => setGiveName(event.target.value)}
//                 required
//               />

//             </div>
//             <div className='mx-1'>
//             <Label htmlFor="Login" value="Login" />
//               <TextInput
//                 id="sn"
//                 placeholder="Silva"
//                 value={user.sn}
//                 onChange={(event) => setSn(event.target.value)}
//                 required
//               />

//             </div>
//             </div>
           
//             <div className='grid md:grid-cols-2 sm:grid-cols-1 py-2'>

//             <div className='mx-1'>
//             <Label htmlFor="Login" value="Login" />
//               <TextInput
//                 id="userlogon"
//                 placeholder="fulano.silva"
//                 value={user.displayname}
//                 onChange={(event) => setDisplayName(event.target.value)}
//                 required
//               />

//             </div>
           
//             <div className='mx-1'>
//             <Label htmlFor="Período de Acesso" value="Período de Acesso" />

//         <select   className=" border border-gray-300 bg-gray-50 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 ">
//   <option selected value="7to19">7:00 às 19:00 horas</option>
//   <option value="14to23">14:00 às 23:00</option>
//   <option value="7to23">7:00 às 23:00 </option>
// </select>

//             </div>
    
// </div>

//             <div className='grid md:grid-cols-2 sm:grid-cols-1 py-2'>
                
//                 <div className='mx-1'>
//                 <Label htmlFor="Senha" value="Senha" />
//                 <TextInput
//                   id="password"
//                   type="password" // Definindo o tipo como "password"
//                   placeholder="**********"
//                   value={password}
//                   onChange={(event) => setPassword(event.target.value)}
//                   required
//                 />
              
    
//                 </div>
//                 <div className='mx-1'>
//                 <Label htmlFor="Confirme a Senha" value="Confirme a senha" />
//                 <TextInput
//                   id="confirmpassword"
//                   type="password" // Definindo o tipo como "password"
//                   placeholder="**********"
//                   value={confirmpassword}
//                   onChange={(event) => setConfirmPassword(event.target.value)}
//                   required
//                 />
    
//                 </div>
//                 </div>
//                 </div>
//             )}

//             <div className="w-full">
//       <Button className='bg-blue-500 mb-2  rounded  text-white font-semibold hover:bg-blue-600'>
// Cadastrar  </Button>            </div>
//           </div>
//         </Modal.Body>
//       </Modal>
//     </div>
//   )
// }

// export default ModalEditUser