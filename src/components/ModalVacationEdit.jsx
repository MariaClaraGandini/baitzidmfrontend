import React, { useState, useEffect } from 'react';
import { Button, Label, Modal, TextInput, Select } from 'flowbite-react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useAuthToken } from '../api/AuthToken';
import { Oval } from 'react-loader-spinner';

function ModalVacationEdit({ openModal, onClose, user, event }) {
  const { token } = useAuthToken();
  const [username, setUsername] = useState(event ? event.extendedProps.username : '');
  const [usernames, setUsernames] = useState([]);
  const [dataInicioFerias, setDataInicioFerias] = useState('');
  const [dataRetornoFerias, setDataRetornoFerias] = useState('');
  const [horarioInicioFerias, setHorarioInicioFerias] = useState('');
  const [horarioRetornoFerias, setHorarioRetornoFerias] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({}); // Estado para armazenar erros

  function resetForm() {
    setUsername('');
    setDataInicioFerias('');
    setDataRetornoFerias('');
    setHorarioInicioFerias('');
    setHorarioRetornoFerias('');
  }

  useEffect(() => {
    if (openModal) {
      resetForm();

      if (event) {
        setIsEditing(true);
        fetchUserData(event.extendedProps.username);
      } else {
        setIsEditing(false);
        setUsername('');
      }

      getAllUsername();
    }
  }, [openModal, event]);

  async function getAllUsername() {
    setLoading(true);
    try {
      const response = await axios.get('http://192.168.123.91:3000/usuarios/username', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setUsernames(response.data);
      console.log(response.data)
    } catch (error) {
      toast.error(error.response.data.msg);
    } finally {
      setLoading(false);
    }
  }

  async function fetchUserData(username) {
    setLoading(true);
    try {
      const response = await axios.get(`http://localhost:3000/usuarios/exibirferias/${username}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setDataInicioFerias(response.data.dataInicioFerias);
      setDataRetornoFerias(response.data.dataRetornoFerias);
      setHorarioInicioFerias(response.data.horarioInicioFerias);
      setHorarioRetornoFerias(response.data.horarioRetornoFerias);
      setUsername(username);
    } catch (error) {
      toast.error(error.response.data.msg);
    } finally {
      setLoading(false);
    }
  }

  async function onSave() {
    setLoading(true);
    const newErrors = {};

    if (!username) newErrors.username = '*Preencha esse campo';
    if (!dataInicioFerias) newErrors.dataInicioFerias = '*Preencha esse campo';
    if (!dataRetornoFerias) newErrors.dataRetornoFerias = '*Preencha esse campo';
    if (!horarioInicioFerias) newErrors.horarioInicioFerias = '*Preencha esse campo';
    if (!horarioRetornoFerias) newErrors.horarioRetornoFerias = '*Preencha esse campo';

    const inicioFerias = new Date(`${dataInicioFerias}T${horarioInicioFerias}`);
    const retornoFerias = new Date(`${dataRetornoFerias}T${horarioRetornoFerias}`);
    const now = new Date();

    if (dataInicioFerias && horarioInicioFerias && inicioFerias < now) {
      newErrors.dataInicioFerias = 'A data e horário de início das férias não podem ser menores que a data e horário atual.';
    }

    if (dataRetornoFerias && retornoFerias < inicioFerias) {
      newErrors.dataRetornoFerias = 'A data de retorno não pode ser menor que a data de início.';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setLoading(false);
      return;
    }
    try {
      const dataInicioFormatted = dataInicioFerias ? formatData(dataInicioFerias) : '';
      const dataRetornoFormatted = dataRetornoFerias ? formatData(dataRetornoFerias) : '';
      const horarioInicioFormatted = horarioInicioFerias ? formatHorario(horarioInicioFerias) : '';
      const horarioRetornoFormatted = horarioRetornoFerias ? formatHorario(horarioRetornoFerias) : '';


      const selectedUser = usernames.find(user => user.cn === username);
      const samaccountnameToSend = selectedUser ? selectedUser.samaccountname : '';
      await axios.post(`http://localhost:3000/usuarios/agendarferias/${username}`, {
        dataInicioFerias: dataInicioFormatted,
        horarioInicioFerias: horarioInicioFormatted,
        dataRetornoFerias: dataRetornoFormatted,
        horarioRetornoFerias: horarioRetornoFormatted,
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      localStorage.removeItem('vacationEvents'); // Clear cache
      onClose();
      resetForm();
      toast.success('Férias reagendada com sucesso!', {
        onClose: () => {
          setTimeout(() => {
            window.location.reload();
          }, 7000);
        }
      });
    } catch (error) {
      console.log(username)
      toast.error(error.response.data.msg);
    } finally {
      setLoading(false);
    }
  }

  async function onRemove() {
    setLoading(true);
    try {
      const selectedUser = usernames.find(user => user.cn === username);
      const samaccountnameToSend = selectedUser ? selectedUser.samaccountname : '';
      await axios.delete(`http://localhost:3000/usuarios/removerferias/${username}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      

      localStorage.removeItem('vacationEvents'); // Clear cache
      onClose();
      toast.success('Agendamento excluído com sucesso!', {
        onClose: () => {
          setTimeout(() => {
            window.location.reload();
          }, 5000);
        }
      });
    } catch (error) {
      toast.error(error.response.data.msg);
    } finally {
      setLoading(false);
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

  return (
    <div>
      <ToastContainer />
      <Modal show={openModal} size="2xl" onClose={onClose} popup>
        <Modal.Header />
        <Modal.Body>
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
              Férias Agendada - {username}
            </h3>
            {loading ? (
              <div className="flex justify-center">
                <Oval color="#1658f2" height={50} width={50} />
              </div>
            ) : (
              <form>
                <Select
                  id="usuario"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                >
                  <option value="">Selecione um usuário</option>
                  {usernames.map((user) => (
                    <option  key={user.cn} value={user.cn}>
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
                    {errors.dataInicioFerias && <p className="text-red-600 text-xs font-medium">{errors.dataInicioFerias}</p>}

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
                 {errors.horarioInicioFerias && <p className="text-red-600 text-xs font-medium">{errors.horarioInicioFerias}</p>}

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
                  {errors.dataRetornoFerias && <p className="text-red-600 text-xs font-medium">{errors.dataRetornoFerias}</p>}

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
                    {errors.horarioRetornoFerias && <p className="text-red-600 text-xs font-medium">{errors.horarioRetornoFerias}</p>}

                  </div>
                </div>
                <div className="grid grid-cols-4 mt-4">
                  <div className="mr-1.5">
                    <Button onClick={onRemove} className="bg-red-500 w-full mb-2 rounded text-white font-semibold removebutton">
                      Excluir
                    </Button>
                  </div>
                  <div className='ml-1.5'>
                    <Button onClick={onSave} className="bg-blue-500 w-full mb-2 rounded text-white font-semibold hover:bg-blue-600">
                      Salvar
                    </Button>
                  </div>
                </div>
              </form>
            )}
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default ModalVacationEdit;
