import { useState, useEffect, useMemo } from 'react';
import axios from 'axios';
import { Table } from 'flowbite-react';
import { useAuthToken } from '../api/AuthToken';
import ModalEditUser from '../components/ModalEditUser';
import ModalLogonUser from '../components/ModalLogonUser';
import { Oval } from 'react-loader-spinner';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useDebounce } from 'use-debounce';
import URL from '../api/config';

export default function Users() {
    const { token } = useAuthToken();
    const [users, setUsers] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [permissionChecked, setPermissionChecked] = useState(false);
    const [isLoadingUsers, setIsLoadingUsers] = useState(false);
    const [usersLoaded, setUsersLoaded] = useState(false);
    const [needsUpdate, setNeedsUpdate] = useState(false);
    const navigate = useNavigate();
    const [debouncedSearchTerm] = useDebounce(searchTerm, 300);

    const fetchUsers = async () => {
        if (token) {
            setIsLoadingUsers(true);
            try {
                const response = await axios.get(`${URL}/usuarios/groups`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                console.log(typeof response.data); // Deve ser 'object'
                if (Array.isArray(response.data)) {
                    setUsers(response.data);
                    setSearchResults(response.data);
                    setPermissionChecked(true);
                    setUsersLoaded(true);
                    setNeedsUpdate(false);
                 } else {
                    console.error('A resposta não é um array:', response.data);
                    toast.error('Erro ao buscar usuários: resposta inválida da API');
                 }
            } catch (error) {
                console.error('Erro ao buscar usuários:', error);
                toast.error('Erro ao buscar usuários: ' + error.message);
                if (error.response && error.response.status === 440) {
                    navigate('/');
                }
                if (error.response && error.response.status === 402) {
                    navigate('/alterarsenha');
                }
            } finally {
                setIsLoadingUsers(false);
            }
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            if (!usersLoaded || needsUpdate) {
                await fetchUsers();
            }
        };
        fetchData();
    }, [token, navigate, usersLoaded, needsUpdate]);

    const filteredResults = useMemo(() => {
        if (debouncedSearchTerm.trim() === '') {
            return users;
        }
        return users.filter(user => 
            user.displayname.toLowerCase().includes(debouncedSearchTerm.toLowerCase())
        );
    }, [debouncedSearchTerm, users]);

    // Atualiza searchResults diretamente quando filteredResults mudar
    useEffect(() => {
        setSearchResults(filteredResults);
    }, [filteredResults]);

    if (!permissionChecked) {
        return null;
    }

    return (
        <div className="h-95vh p-2 mt-8 bg-gray-100">
            <div className="p-4 bg-white rounded-lg dark:border-gray-700 mt-14">
                <h1 className="text-3xl font-medium mb-1">Usuários</h1>
                <div className="grid grid-cols-3 gap-2 mb-8">
                    <form className='col-span-2'>
                        <label className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Pesquisar</label>
                        <div className="relative w-full">
                            <input
                                id="search-dropdown"
                                className="block p-2.5 w-full z-20 text-sm text-gray-900 bg-gray-50 rounded-lg border-2 border border-gray-100 focus:border-blue-500 focus:border-blue-500"
                                placeholder="Pesquisar cliente..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                required
                            />
                            <div className="absolute top-1 end-0 p-2.5 h-full text-white ">
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
                </div>

                <div className="overflow-x-auto mt-5">
                    {isLoadingUsers ? (
                        <div className="flex justify-center items-center h-64">
                            <Oval color="#1658f2" height={50} width={50} />
                        </div>
                    ) : (
                        <Table hoverable>
                            <Table.Head className="bg-blue-50">
                                <Table.HeadCell className="bg-blue-50">Nome</Table.HeadCell>
                                <Table.HeadCell className="bg-blue-50">Usuário</Table.HeadCell>
                                <Table.HeadCell className="bg-blue-50">Ações</Table.HeadCell>
                            </Table.Head>
                            <Table.Body className="divide-y">
                                {Array.isArray(searchResults) && searchResults.map((user) => (
                                    <Table.Row key={user.samaccountname} className="bg-white dark:border-gray-700 dark:bg-gray-800">
                                        <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                                            {user.givename} {user.sn}
                                        </Table.Cell>
                                        <Table.Cell>{user.displayname}</Table.Cell>
                                        <Table.Cell>
                                            <div className="flex space-x-2">
                                                <ModalEditUser user={user} onUserUpdated={() => setNeedsUpdate(true)} />
                                                <ModalLogonUser {...user} />
                                            </div>
                                        </Table.Cell>
                                    </Table.Row>
                                ))}
                            </Table.Body>
                        </Table>
                    )}
                </div>
            </div>
        </div>
    );
}
