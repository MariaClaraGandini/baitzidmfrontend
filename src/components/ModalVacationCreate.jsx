import React, { useState, useEffect } from 'react';
import { Button, Label, Modal, TextInput, Select } from 'flowbite-react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useAuthToken } from '../api/AuthToken';
import { Oval } from 'react-loader-spinner';
import URL from '../api/config'

function ModalVacationCreate({ openModal, onClose, user }) {
  const { token } = useAuthToken();
  const [username, setUsername] = useState('');
  const [usernames, setUsernames] = useState([]);
  const [dataInicioFerias, setDataInicioFerias] = useState('');
  const [dataRetornoFerias, setDataRetornoFerias] = useState('');
  const [horarioInicioFerias, setHorarioInicioFerias] = useState('');
  const [horarioRetornoFerias, setHorarioRetornoFerias] = useState('');
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (openModal) {
      getAllUsername();
    }
  }, [openModal]);

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
      toast.error(error.response.data.msg);
    } finally {
      setLoading(false);
    }
  }

  function generateUniqueId() {
    const generatedIds = new Set();
    let id;
    do {
      id = Math.floor(Math.random() * 9000) + 1000;
    } while (generatedIds.has(id));
    generatedIds.add(id);
    return id;
  }

  const formatData = (data) => data;
  const formatHorario = (horario) => horario;

  const resetForm = () => {
    setDataInicioFerias('');
    setDataRetornoFerias('');
    setHorarioInicioFerias('');
    setHorarioRetornoFerias('');
    setErrors({});
  };

  const onSave = async (e) => {
    e.preventDefault(); // Previne o comportamento padrão do formulário

    setLoading(true);
    const newErrors = {};

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

      const uniqueId = generateUniqueId();

      const response = await axios.post(`${URL}/usuarios/agendarferias/${username}`, {
        id: uniqueId,
        dataInicioFerias: dataInicioFormatted,
        horarioInicioFerias: horarioInicioFormatted,
        dataRetornoFerias: dataRetornoFormatted,
        horarioRetornoFerias: horarioRetornoFormatted,
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      if (response.data && response.data.msg) {
        toast.success('Férias agendadas com sucesso!', {
          autoClose: 4000,
          onClose: () => {
            setTimeout(() => {
              window.location.reload();
            }, 4000);
          }
        });
      } else {
        toast.error('Erro inesperado ao agendar férias.');
      }

      resetForm();
      setLoading(false);

    } catch (error) {
      console.error('Erro ao agendar férias:', error);
      const errorMessage = error.response?.data?.msg || 'Erro desconhecido.';
      toast.error(errorMessage);
      setLoading(false);
    }
  };

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
            {loading ? (
              <div className="flex justify-center">
                <Oval color="#1658f2" height={50} width={50} />
              </div>
            ) : (
              <form onSubmit={onSave}>
                <Label htmlFor="usuario" value="Usuário:" />
                <Select
                  id="usuario"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className={errors.username && 'border-red-600'}
                >
                  <option value="">Selecione um usuário</option>
                  {usernames.map((user) => (
                    <option key={user.samaccountname} value={user.samaccountname}>
                      {user.samaccountname}
                    </option>
                  ))}
                </Select>
                {errors.username && <p className="text-red-600 text-xs font-medium">{errors.username}</p>}
                <div className="grid md:grid-cols-2 sm:grid-cols-1 py-2">
                  <div className="mx-1">
                    <Label htmlFor="dataInicioFerias" value="Data da Férias" />
                    <TextInput
                      id="dataInicioFerias"
                      type="date"
                      value={dataInicioFerias}
                      onChange={(event) => setDataInicioFerias(event.target.value)}
                      required
                      className={errors.dataInicioFerias && 'border-red-600'}
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
                      className={errors.horarioInicioFerias && 'border-red-600'}
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
                      className={errors.dataRetornoFerias && 'border-red-600'}
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
                      className={errors.horarioRetornoFerias && 'border-red-600'}
                    />
                    {errors.horarioRetornoFerias && <p className="text-red-600 text-xs font-medium">{errors.horarioRetornoFerias}</p>}
                  </div>
                </div>
                <Modal.Footer className='px-0 mx-0'>

          <Button color="gray" onClick={onClose}>
            Cancelar
          </Button>

          <Button color="blue" onClick={onSave}>
            Salvar
          </Button>
          </Modal.Footer>

              </form>
            )}
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default ModalVacationCreate;
