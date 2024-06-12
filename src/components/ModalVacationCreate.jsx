// ModalVacationCreate.jsx

import React, { useState, useEffect } from 'react';
import { Button, Label, Modal, TextInput, Select } from 'flowbite-react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useAuthToken } from '../api/AuthToken';

function ModalVacationCreate({ openModal, onClose, user }) {
  const { token } = useAuthToken(); 
  const [username, setUsername] = useState('');
  const [usernames, setUsernames] = useState([]);
  const [dataInicioFerias, setDataInicioFerias] = useState('');
  const [dataRetornoFerias, setDataRetornoFerias] = useState('');
  const [horarioInicioFerias, setHorarioInicioFerias] = useState('');
  const [horarioRetornoFerias, setHorarioRetornoFerias] = useState('');

  useEffect(() => {
    if (openModal) {
      getAllUsername();
    }
  }, [openModal]);

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
      toast.success('Usuário atualizado com sucesso!');
      window.location.reload();

    } catch (error) {
      console.error('Erro ao editar usuário:', error);
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
              <div className="w-full mt-4">
                <Button onClick={onSave} className="bg-blue-500 mb-2 rounded text-white font-semibold hover:bg-blue-600">
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

export default ModalVacationCreate;