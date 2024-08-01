import React, { useState, useEffect } from 'react';
import { Button, Label, Modal, TextInput, Select } from 'flowbite-react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useAuthToken } from '../api/AuthToken';
import { Oval } from 'react-loader-spinner';
import URL from '../api/config';

function ModalVacationEdit({ openModal, onClose, event }) {
  const { token } = useAuthToken();
  const [username, setUsername] = useState('');
  const [usernames, setUsernames] = useState([]);
  const [dataInicioFerias, setDataInicioFerias] = useState('');
  const [dataRetornoFerias, setDataRetornoFerias] = useState('');
  const [horarioInicioFerias, setHorarioInicioFerias] = useState('');
  const [horarioRetornoFerias, setHorarioRetornoFerias] = useState('');
  const [taskNameAtivar, setTaskNameAtivar] = useState('');
  const [taskNameDesativar, setTaskNameDesativar] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (openModal && event) {
      const { extendedProps } = event;
      setUsername(extendedProps.username);
      setDataInicioFerias(extendedProps.vacationDetails.dataInicioFerias);
      setDataRetornoFerias(extendedProps.vacationDetails.dataRetornoFerias);
      setHorarioInicioFerias(extendedProps.vacationDetails.horarioInicioFerias);
      setHorarioRetornoFerias(extendedProps.vacationDetails.horarioRetornoFerias);
      setTaskNameDesativar(extendedProps.vacationDetails.taskNameDesativar);
      setTaskNameAtivar(extendedProps.vacationDetails.taskNameAtivar);
      setIsEditing(true);
      getAllUsername();
    }
    console.log(taskNameDesativar,taskNameAtivar)
  }, [openModal, event]);

  async function getAllUsername() {
    setLoading(true);
    try {
      const response = await axios.get(`${URL}/usuarios/username`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setUsernames(response.data);
    } catch (error) {
      toast.error(error.response?.data?.msg || 'Erro ao carregar usuários.');
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

    if (inicioFerias < now) {
      newErrors.dataInicioFerias = 'A data e horário de início das férias não podem ser menores que a data e horário atual.';
    }

    if (retornoFerias < inicioFerias) {
      newErrors.dataRetornoFerias = 'A data de retorno não pode ser menor que a data de início.';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setLoading(false);
      return;
    }

    try {
      const dataInicioFormatted = formatData(dataInicioFerias);
      const dataRetornoFormatted = formatData(dataRetornoFerias);
      const horarioInicioFormatted = formatHorario(horarioInicioFerias);
      const horarioRetornoFormatted = formatHorario(horarioRetornoFerias);

      const selectedUser = usernames.find(user => user.samaccountname === username);
      if (!selectedUser) {
        throw new Error('Usuário não encontrado.');
      }

      const endpoint = `${URL}/usuarios/editarferias/${username}`;
      const requestData = {
        dataInicioFerias: dataInicioFormatted,
        horarioInicioFerias: horarioInicioFormatted,
        dataRetornoFerias: dataRetornoFormatted,
        horarioRetornoFerias: horarioRetornoFormatted,
        taskNameDesativar,
        taskNameAtivar
      };

      const response = await axios.post(endpoint, requestData, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      localStorage.removeItem('vacationEvents');
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
      toast.error(error.response?.data?.msg || 'Erro ao salvar férias.');
    } finally {
      setLoading(false);
    }
  }

  async function onRemove() {
    setLoading(true);
    try {
      await axios.delete(`${URL}/usuarios/removerferias/${username}`, {
        headers: {
          Authorization: `Bearer ${token}`
        },
        data: {
         taskNameDesativar,
          taskNameAtivar
        }
      });
  
      // toast.success('Agendamento excluído com sucesso!');
   
        setTimeout(() => {
          toast.success('Agendamento excluído com sucesso!', {
              autoClose: 3000, // 12 segundos para o toast
              onClose: () => {
                  setTimeout(() => {
                      onClose();
                      localStorage.removeItem('vacationEvents');
                      window.location.reload();
                  }, 3000); // 19 segundos adicionais após o toast fechar
              }
          });
      });



        
    } catch (error) {
      console.log(event?.id);
      toast.error(error.response?.data?.msg || 'Erro ao excluir férias.');
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

  function resetForm() {
    setUsername('');
    setDataInicioFerias('');
    setDataRetornoFerias('');
    setHorarioInicioFerias('');
    setHorarioRetornoFerias('');
    setErrors({});
  }

  return (
    <div>
      <ToastContainer />
      <Modal show={openModal} size="2xl" onClose={onClose} popup>
        <Modal.Header />
        <Modal.Body>
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
              Editar Férias - {username}
            </h3>
            {loading ? (
              <div className="flex justify-center">
                <Oval color="#1658f2" height={50} width={50} />
              </div>
            ) : (
              <form>
                {/* <Select
                  id="usuario"
                  required
                  disabled={true}
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                >
                  <option value="">Selecione um usuário</option>
                  {usernames.map((user) => (
                    <option key={user.samaccountname} value={user.samaccountname}>
                      {user.samaccountname}
                    </option>
                  ))}
                </Select> */}
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
                    {errors.dataInicioFerias && <p className="text-red-600">{errors.dataInicioFerias}</p>}
                  </div>
                  <div className="mx-1">
                    <Label htmlFor="dataRetornoFerias" value="Data do Retorno" />
                    <TextInput
                      id="dataRetornoFerias"
                      type="date"
                      value={dataRetornoFerias}
                      onChange={(event) => setDataRetornoFerias(event.target.value)}
                      required
                    />
                    {errors.dataRetornoFerias && <p className="text-red-600">{errors.dataRetornoFerias}</p>}
                  </div>
                </div>
                <div className="grid md:grid-cols-2 sm:grid-cols-1 py-2">
                  <div className="mx-1">
                    <Label htmlFor="horarioInicioFerias" value="Horário de Início" />
                    <TextInput
                      id="horarioInicioFerias"
                      type="time"
                      value={horarioInicioFerias}
                      onChange={(event) => setHorarioInicioFerias(event.target.value)}
                      required
                    />
                    {errors.horarioInicioFerias && <p className="text-red-600">{errors.horarioInicioFerias}</p>}
                  </div>
                  <div className="mx-1">
                    <Label htmlFor="horarioRetornoFerias" value="Horário do Retorno" />
                    <TextInput
                      id="horarioRetornoFerias"
                      type="time"
                      value={horarioRetornoFerias}
                      onChange={(event) => setHorarioRetornoFerias(event.target.value)}
                      required
                    />
                    {errors.horarioRetornoFerias && <p className="text-red-600">{errors.horarioRetornoFerias}</p>}
                  </div>
                </div>
                <div className="py-2">
                  <Label htmlFor="taskNameDesativar" value="Agendamento para Desativar Usuário" />
                  <TextInput
                    id="taskNameDesativar"
                    type="text"
                    value={taskNameDesativar}
                    onChange={(event) => setTaskNameDesativar(event.target.value)}
                    required
                    disabled={true}
                  />
                </div>
                <div className="py-2">
                  <Label htmlFor="taskNameAtivar" value="Agendamento para Ativar Usuário" />
                  <TextInput
                    id="taskNameAtivar"
                    type="text"
                    value={taskNameAtivar}
                    onChange={(event) => setTaskNameAtivar(event.target.value)}
                    required
                     disabled={true}
                  />
                </div>
              </form>
            )}
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button color="gray" onClick={onClose}>
            Cancelar
          </Button>
          <Button color="red" onClick={onRemove}>
            Excluir
          </Button>
          <Button color="blue" onClick={onSave}>
            Salvar
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default ModalVacationEdit;
