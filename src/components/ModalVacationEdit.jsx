import React, { useState, useEffect } from 'react';
import { Button, Label, Modal, TextInput, Select } from 'flowbite-react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useAuthToken } from '../api/AuthToken';
function ModalVacationEdit({ openModal, onClose, user, event }) {
  const { token } = useAuthToken(); 
  const [username, setUsername] = useState('');
  const [usernames, setUsernames] = useState([]);
  const [dataInicioFerias, setDataInicioFerias] = useState('');
  const [dataRetornoFerias, setDataRetornoFerias] = useState('');
  const [horarioInicioFerias, setHorarioInicioFerias] = useState('');
  const [horarioRetornoFerias, setHorarioRetornoFerias] = useState('');
  const [isEditing, setIsEditing] = useState(false); // Novo estado para controlar se estamos editando

  function resetForm() {
    setUsername('');
    setDataInicioFerias('');
    setDataRetornoFerias('');
    setHorarioInicioFerias('');
    setHorarioRetornoFerias('');
  }

  useEffect(() => {
    if (openModal) {
      // Limpar os campos quando o modal for aberto para criar uma nova entrada de férias
      resetForm();

      if (event) {
        // Se houver um evento, preencher os campos com os dados da entrada existente
        setIsEditing(true);
        fetchUserData(event.extendedProps.username);
      } else {
        // Caso contrário, estamos criando uma nova entrada, então não precisamos preencher os campos
        setIsEditing(false);
        setUsername('');
      }

      getAllUsername();
    }
  }, [openModal, event]);

  async function getAllUsername() {
    try {
      const response = await axios.get('http://192.168.123.91:3000/usuarios/username', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setUsernames(response.data);
    } catch (error) {
      toast.error(error.response.data.msg);
    }
  }

  async function fetchUserData(username) {
    try {
      const response = await axios.get(`http://localhost:3000/usuarios/exibirferias/${username}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });;
      setDataInicioFerias(response.data.dataInicioFerias);
      setDataRetornoFerias(response.data.dataRetornoFerias);
      setHorarioInicioFerias(response.data.horarioInicioFerias);
      setHorarioRetornoFerias(response.data.horarioRetornoFerias);
      setUsername(username);
    } catch (error) {
      toast.error(error.response.data.msg);
    }
  }

  async function onSave() {
    try {
      const dataInicioFormatted = dataInicioFerias ? formatData(dataInicioFerias) : '';
      const dataRetornoFormatted = dataRetornoFerias ? formatData(dataRetornoFerias) : '';
      const horarioInicioFormatted = horarioInicioFerias ? formatHorario(horarioInicioFerias) : '';
      const horarioRetornoFormatted = horarioRetornoFerias ? formatHorario(horarioRetornoFerias) : '';

      await axios.post(`http://localhost:3000/usuarios/agendarferias/${username}`, {
        dataInicioFerias: dataInicioFormatted,
        horarioInicioFerias: horarioInicioFormatted,
        dataRetornoFerias: dataRetornoFormatted,
        horarioRetornoFerias: horarioRetornoFormatted,
      }, {
        headers: {
          Authorization: `Bearer ${token}` // Passando o token no cabeçalho da requisição POST
        }
      });

      onClose();
      resetForm();
      toast.success('Usuário atualizado com sucesso!', {
        onClose: () => {
          // Reiniciar a página após 5 segundos
          setTimeout(() => {
            window.location.reload();
          }, 5000);
        }
      });
    } catch (error) {
      console.error('Erro ao editar usuário:', error);
      toast.error(error.response.data.msg);
    }
  }

  async function onRemove() {
    try {
  
      await axios.delete(`http://localhost:3000/usuarios/removerferias/${username}`, {
        headers: {
          Authorization: `Bearer ${token}` // Passando o token no cabeçalho da requisição POST
        }
      });

      onClose();
      toast.success('Agendamento excluído com sucesso!', {
        onClose: () => {
          // Reiniciar a página após 5 segundos
          setTimeout(() => {
            window.location.reload();
          }, 5000);
        }
      });
    } catch (error) {
      console.error('Erro ao excluir agendamento:', error);
      toast.error(error.response.data.msg);
    }
  }

  function formatData(date) {
    if (!date) return '';
    const [year, month, day] = date.split('-');
    return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
  }

  function formatHorario(time) {
    if (!time) return '';
    const [hour, minute] = time.split(':');
    return `${hour.padStart(2, '0')}:${minute.padStart(2, '0')}`;
  }

  function resetForm() {
    setUsername('');
    setDataInicioFerias('');
    setDataRetornoFerias('');
    setHorarioInicioFerias('');
    setHorarioRetornoFerias('');
  }

  return (
    <div>
      <ToastContainer />
      <Modal show={openModal} size="2xl" onClose={onClose} popup>
        <Modal.Header />
        <Modal.Body>
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
              Agendar Férias - {user?.samaccountname}
            </h3>
            <form>
              <Select
                id="usuario"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              >
                <option value="">Selecione um usuário</option>
                {usernames.map((user) => (
                  <option key={user.samaccountname} value={user.samaccountname}>
                    {user.samaccountname}
                  </option>
                ))}
              </Select>
              <div className="grid md:grid-cols-2 sm:grid-cols-1 py-2">
                <div className="mx-1">
                  <Label htmlFor="dataInicioFerias" value="Data da Férias" />
                  <TextInput
                    id="dataInicioFerias"
                    type="date"
                    value={dataInicioFerias}
                    onChange={(event) => setDataInicioFerias(event.target.value)}
                    required
                  />
                </div>
                <div className="mx-1">
                  <Label htmlFor="horarioInicioFerias" value="Horário Início" />
                  <TextInput
                    id="horarioInicioFerias"
                    type="time"
                    value={horarioInicioFerias}
                    onChange={(event) => setHorarioInicioFerias(event.target.value)}
                    required
                  />
                </div>
              </div>
              <div className="grid md:grid-cols-2 sm:grid-cols-1 py-2">
                <div className="mx-1">
                  <Label htmlFor="dataRetornoFerias" value="Data de Retorno" />
                  <TextInput
                    id="dataRetornoFerias"
                    type="date"
                    value={dataRetornoFerias}
                    onChange={(event) => setDataRetornoFerias(event.target.value)}
                    required
                  />
                </div>
                <div className="mx-1">
                  <Label htmlFor="horarioRetornoFerias" value="Horário Retorno" />
                  <TextInput
                    id="horarioRetornoFerias"
                    type="time"
                    value={horarioRetornoFerias}
                    onChange={(event) => setHorarioRetornoFerias(event.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-4  mt-4">
                <div className="mr-1.5">
                <Button onClick={onRemove} className="bg-red-500  w-full mb-2 rounded text-white font-semibold hover:bg-red-600">
                  Excluir
                </Button>
                </div>
                <div className='ml-1.5'>
                <Button onClick={onSave} className="bg-blue-500 w-full  mb-2 rounded text-white font-semibold hover:bg-blue-600">
                  Salvar
                </Button>
                </div>
              </div>
             
            </form>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default ModalVacationEdit;

