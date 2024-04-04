import { useState, useEffect } from 'react';
import axios from 'axios';
import { Table } from 'flowbite-react';

export default function Users() {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    async function fetchUsers() {
      try {
        const response = await axios.get('http://localhost:3000/usuarios');
        setUsers(response.data);
        setSearchResults(response.data); // Exibe todos os usuários inicialmente
      } catch (error) {
        console.error('Erro ao buscar usuários:', error);
      }
    }

    fetchUsers();
  }, []);

  useEffect(() => {
    const search = async () => {
      try {
        if (searchTerm.trim() === '') {
          setSearchResults(users); // Se o campo de pesquisa estiver vazio, exibir todos os usuários
        } else {
          const response = await axios.get(`http://localhost:3000/usuarios/pesquisar/${searchTerm}`);
          setSearchResults(response.data);
        }
      } catch (error) {
        console.error('Erro ao buscar usuários:', error);
      }
    };
  
    search(); // Chama a função de pesquisa sempre que o estado searchTerm for atualizado
  }, [searchTerm, users]);
  return (
    <div className="p-2 mt-8 bg-gray-100">
      <div className="p-4 bg-white rounded-lg dark:border-gray-700 mt-14">
        <h1 className="text-2xl font-medium mb-1">Clientes</h1>
        <div className="grid grid-cols-3 gap-2 mb-8">
          <form className='col-span-2'>   
            <label className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
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
            {/* <ModalNewClient /> */}
          </div>
        </div>

        <div className="overflow-x-auto mt-5">
          <Table hoverable>
            <Table.Head className="bg-blue-50">
              <Table.HeadCell className="bg-blue-50">Nome</Table.HeadCell>
              <Table.HeadCell className="bg-blue-50">Usuário</Table.HeadCell>
              <Table.HeadCell className="bg-blue-50">E-mail</Table.HeadCell>
              <Table.HeadCell className="bg-blue-50"></Table.HeadCell>
              <Table.HeadCell className="bg-blue-50">Ações</Table.HeadCell>
            </Table.Head>
            <Table.Body className="divide-y">
              {searchResults.map(user => (
                <Table.Row key={user.username} className="bg-white dark:border-gray-700 dark:bg-gray-800">
                  <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                    {user.name}
                  </Table.Cell>
                  <Table.Cell>{user.username}</Table.Cell>
                  <Table.Cell>{user.email}</Table.Cell>
                  <Table.Cell></Table.Cell>
                  <Table.Cell>
                    <button className="mr-2 text-blue-500 focus:outline-none">
                      {/* <HiPencilAlt style={{ fontSize: '1rem' }} /> */}
                    </button>
                    <button className="text-red-500 focus:outline-none">
                      {/* <HiTrash style={{ fontSize: '1rem' }} /> */}
                    </button>
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
