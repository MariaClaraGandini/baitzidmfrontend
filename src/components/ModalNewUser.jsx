import {useState} from 'react';
import { Button, Label, Modal, TextInput } from 'flowbite-react';
import { HiOutlinePlusSm  } from "react-icons/hi";


function ModalNewClient() {
    const [openModal, setOpenModal] = useState(false);
    const [username, setUserName] = useState('');
    const [userlogon, setUserLogon] = useState('');
    const [password, setPassword] = useState('');
    const [confirmpassword, setConfirmPassword] = useState('');

    // const [loginname, setLoginName] = useState('');
  
    function onCloseModal() {
      setOpenModal(false);
    }
  
  
  return (
    <div>
      <Button className='bg-blue-500  rounded hover:bg-blue-600' onClick={() => setOpenModal(true)}>
    <div className='flex items-center'>
  <HiOutlinePlusSm className="text-white font-semibold w-100" />
  <p className='mx-1 text-white font-semibold'> Novo</p>
  </div>
  </Button>

      <Modal show={openModal} size="2xl" onClose={onCloseModal} popup>
        <Modal.Header />
        <Modal.Body>
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Novo Usuário</h3>
            <div className='grid md:grid-cols-2 sm:grid-cols-1'>

            <div className='mx-1'>
            <Label htmlFor="Nome" value="Nome" />
              <TextInput
                id="name"
                placeholder="Fulano da Silva"
                value={username}
                onChange={(event) => setUserName(event.target.value)}
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
            <div className='grid md:grid-cols-2 sm:grid-cols-1'>

            <div className='mx-1'>
            <Label htmlFor="Login" value="Login" />
              <TextInput
                id="userlogon"
                placeholder="fulano.silva"
                value={userlogon}
                onChange={(event) => setUserLogon(event.target.value)}
                required
              />

            </div>
           
            <div className='mx-1'>
            <Label htmlFor="Período de Acesso" value="Período de Acesso" />

        <select   className=" border border-gray-300 bg-gray-50 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 ">
  <option selected>Selecione a BASEDN do usuário </option>
  <option value="7to23">DC=gotcha,DC=local</option>
  <option value="7to19">OU=DTI,DC=gotcha,DC=local</option>
  <option value="14to23">OU=Datacenter,OU=DTI,DC=gotcha,DC=local</option>
  <option value="14to23">OU=Suporte,OU=DTI,DC=gotcha,DC=local</option>
  <option value="14to23">OU=DCM,DC=gotcha,DC=local</option>

</select>

            </div>
    </div>

            <div className='grid md:grid-cols-2 sm:grid-cols-1'>
                
                <div className='mx-1'>
                <Label htmlFor="Senha" value="Senha" />
                <TextInput
                  id="password"
                  type="password" // Definindo o tipo como "password"
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
                  type="password" // Definindo o tipo como "password"
                  placeholder="**********"
                  value={confirmpassword}
                  onChange={(event) => setConfirmPassword(event.target.value)}
                  required
                />
    
                </div>
                </div>
          

            <div className="w-full">
      <Button className='bg-blue-500 mb-2  rounded  text-white font-semibold hover:bg-blue-600'>
Cadastrar  </Button>            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  )
}

export default ModalNewClient
