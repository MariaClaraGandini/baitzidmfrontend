import { useState, useEffect } from 'react';
import axios from 'axios';
import ModalNewUser from  '../components/ModalNewUser';
import { Table } from 'flowbite-react';
import { useAuthToken } from '../api/AuthToken'; // Importe o hook useAuthToken
import ModalEditUser from  '../components/ModalEditUser';
import { useNavigate } from 'react-router-dom'; // Use useNavigate para Vite
import ModalLogonUser from '../components/ModalLogonUser';
// import ModalVacationUser from '../components/ModalVacationUser';
// import { HiOutlinePencil  } from 'react-icons/hi';

export default function Users() {
  const { token } = useAuthToken(); 

  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [permissionChecked, setPermissionChecked] = useState(false); // Estado para indicar se a permissão foi verificada


  const navigate = useNavigate(); // Use useNavigate para Vite

  useEffect(() => {
    async function fetchUsers() {
      try {
        const response = await axios.get('http://localhost:3000/usuarios/groups', {
          headers: {
            Authorization: `Bearer ${token}` // Passa o token no cabeçalho Authorization
          }
        });
        setUsers(response.data);
        setSearchResults(response.data);
        setPermissionChecked(true); // Define como verdadeiro quando a verificação da permissão for bem-sucedida
      } catch (error) {
        console.error('Erro ao buscar usuários:', error);
        if (error.response && error.response.status === 401) {
          navigate('/alterarsenha');
      }
    }
    }

    fetchUsers();
  }, [token,navigate]); 

  
  useEffect(() => {
    const search = async () => {
      try {
        if (searchTerm.trim() === '') {
          setSearchResults(users);
        } else {
          const response = await axios.get(`http://localhost:3000/usuarios/pesquisar/${searchTerm}`, {
            headers: {
              Authorization: `Bearer ${token}`
            }
          });
          setSearchResults(response.data);
        }
      } catch (error) {
        console.error('Erro ao buscar usuários:', error);
      }
    };
  
    search();
  }, [searchTerm, users, token]); 

  if (!permissionChecked) {
    return null; 
  }
  return (
    <div className="h-95vh p-2 mt-8 bg-gray-100"> {/* Alteração aqui */}
      <div className="p-4  bg-white rounded-lg dark:border-gray-700 mt-14">
        <h1 className="text-3xl font-medium mb-1">Usuários</h1>
        <div className="grid grid-cols-3 gap-2 mb-8">
          <form className='col-span-2'>   
            <label className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Pesquise</label>
            <div className="relative w-full">
              <input
                id="search-dropdown"
                className="block p-2.5 w-full z-20 text-sm text-gray-900 bg-gray-50 rounded-lg border-2 border border-gray-100 focus:border-blue-500 focus:border-blue-500"
                placeholder="Pesquisar cliente..."
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                required
              />
              <div className="absolute top-1 end-0 p-2.5  h-full text-white ">
                <svg
                  className="w-4 h-4 text-black"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 20"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                  />
                </svg>
                <span className="sr-only">Pesquisar</span>
              </div>
            </div>
          </form>
          <div className='grid flex items-center justify-items-end'>
            <ModalNewUser />
          </div>
        </div>

        <div className="overflow-x-auto mt-5">
          <Table hoverable>
            <Table.Head className="bg-blue-50">
              <Table.HeadCell className="bg-blue-50">Nome</Table.HeadCell>
              <Table.HeadCell className="bg-blue-50">Usuário</Table.HeadCell>
              <Table.HeadCell className="bg-blue-50">Ações</Table.HeadCell>
            </Table.Head>
            <Table.Body className="divide-y">
              {searchResults.map(user => (
                <Table.Row key={user.samaccountname} className="bg-white dark:border-gray-700 dark:bg-gray-800">
                  <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                    {user.givename} {user.sn}
                  </Table.Cell>
                  <Table.Cell>{user.displayname}</Table.Cell>
                 
                  <Table.Cell>
       <div className="flex space-x-2 ">
      <ModalEditUser {...user} />
      <ModalLogonUser {...user} />
      {/* <ModalVacationUser {...user} /> */}
      </div>
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
        </div>
      </div>
    </div> 
  );
}
