import TextField from "../../components/TextField";
import * as S from "./styles";
import Button from "../../components/Buttons";
import { HiOutlineArrowLeft } from "react-icons/hi";
import { IconButton } from "../../components/Buttons/IconButton";
import { useHistory } from "react-router-dom";
import routes from "../../router/routes";
import { useState } from "react";
import { applyCpfMask, delay, formatAdmissionDate, removeCpfMask, validateAdmissionDate, validateCPF, validateEmail, validateName } from "../../services/utils";
import api from "../../services/api";
import { useLoading } from "../../contexts/LoadingContext";
import { useConfirmation } from "../../contexts/ConfirmationContext";

const NewUserPage = () => {
  const [employeeName, setEmployeeName] = useState('');
  const [email, setEmail] = useState('');
  const [cpf, setCpf] = useState('');
  const [admissionDate, setAdmissionDate] = useState('');
  const [errors, setErrors] = useState({ employeeName: '', email: '', cpf: '', admissionDate: '' });

  const { setIsLoading } = useLoading();
  const { openModal } = useConfirmation();

  const history = useHistory();
  const goToHome = () => {
    history.push(routes.dashboard);
  };

  const validateForm = () => {
    const newErrors = {
      employeeName: validateName(employeeName) || '',
      email: validateEmail(email) || '',
      cpf: validateCPF(cpf) || '',
      admissionDate: validateAdmissionDate(admissionDate) || ''
    };

    setErrors(newErrors);

    return !newErrors.employeeName && !newErrors.email && !newErrors.cpf && !newErrors.admissionDate;
  };

  const handleRegister = async() => {
    if (validateForm()) {
      const formattedDate = formatAdmissionDate(admissionDate)
      const cleanedCpf = removeCpfMask(cpf)
      const formattedData = {
        employeeName,
        email,
        cpf: cleanedCpf,
        admissionDate: formattedDate,
        status: 'REVIEW'
      };

      openModal({
        title: 'Confirmação de Cadastro',
        message: 'Você tem certeza que deseja cadastrar este item?',
        onConfirm: async() => {
          try {
            setIsLoading(true);
            const response = await api.post('/registrations', formattedData);
            await delay(1000)
            if (response.status === 201) {
              goToHome()
            }
          } catch (error) {
            console.error('Erro ao enviar dados:', error);
          } finally {
            setIsLoading(false)
          }
        },
      });
    }
  }

  const handleCpfChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = applyCpfMask(e.target.value);
    setCpf(value);
  };

  return (
    <S.Container>
      <S.Card>
        <IconButton onClick={() => goToHome()} aria-label="back">
          <HiOutlineArrowLeft size={24} />
        </IconButton>
        <TextField onChange={e => setEmployeeName(e.target.value)} placeholder="Nome" label="Nome" /> 
          {errors.employeeName && <S.ErrorMessage>{errors.employeeName}</S.ErrorMessage>}
        <TextField onChange={e => setEmail(e.target.value)} placeholder="Email" label="Email" type="email" /> 
          {errors.email && <S.ErrorMessage>{errors.email}</S.ErrorMessage>}
        <TextField onChange={handleCpfChange} value={cpf} maxLength={14} placeholder="CPF" label="CPF" /> 
          {errors.cpf && <S.ErrorMessage>{errors.cpf}</S.ErrorMessage>}
        <TextField onChange={e => setAdmissionDate(e.target.value)} label="Data de admissão" type="date" /> 
          {errors.admissionDate && <S.ErrorMessage>{errors.admissionDate}</S.ErrorMessage>}
        <Button onClick={handleRegister}>Cadastrar</Button>
      </S.Card>
    </S.Container>
  );
};

export default NewUserPage;
