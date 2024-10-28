import { useCallback, useEffect, useState } from "react";
import api from "../../services/api";

import Columns from "./components/Columns";
import { SearchBar } from "./components/Searchbar";
import { Alert } from "../../components/Modal/Alert";

import { useLoading } from "../../contexts/LoadingContext";
import { useConfirmation } from "../../contexts/ConfirmationContext";

import { AlertProps } from "../../models/components";
import { ChangeStatus, Register } from "../../models/register";

import { ReviewStatus } from "../../enums";
import { delay, removeCpfMask } from "../../services/utils";

import * as S from "./styles";


const DashboardPage = () => {
  const [registrations, setRegistrations] = useState<Register[] | []>([])
  const [alert, setAlert] = useState<AlertProps>({
    isVisible: false,
    message: '',
    variant: 'default',
  })

  const { setIsLoading } = useLoading();
  const { openModal } = useConfirmation();

  const showAlert = useCallback((message :string, variant: 'default' | 'success' | 'alert' | 'error') => {
    setAlert({
      isVisible: true,
      message,
      variant,
    })
    setTimeout(() => {
      handleClose();
    }, 2000);
  }, []);

  function handleClose() {
    setAlert({
      isVisible: false,
      message: ``,
      variant: 'default',
    });
  }

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await api.get('registrations');
      setRegistrations(response.data)
      await delay(1000)
      if(!response.data[0]) {
        showAlert(`Nenhum registro encontrado`, 'alert')
      }
    } catch (error) {
      showAlert(`Erro: ${error}`, 'error')
    } finally {
      setIsLoading(false);
    }
  }, [setIsLoading, showAlert]);

  useEffect(() => {
    fetchData();
  }, [fetchData])

  const handleRefresh = () => {
    fetchData()
  }

  const handleSearch = async(data: string) => {
    setIsLoading(true)
    try{
      const cpfString = removeCpfMask(data);
      const response = await api.get(`registrations?cpf=${cpfString}`);
      await delay(1000)
      setRegistrations(response.data)
      if(!response.data[0]) {
        showAlert(`Nenhum registro encontrado`, 'alert')
      }
    } catch(error) {
      showAlert(`Erro: ${error}`, 'error')
    } finally {
      setIsLoading(false)
    } 
  }

  const handleUpdateStatus = async(data: ChangeStatus) => {
    openModal({
      title: 'Confirmação de Atualização',
      message: `Você tem certeza que deseja atualizar o status para ${ReviewStatus[data.status]}?`,
      onConfirm: async() => {
        const registerToUpdate: Register = registrations.filter(element => element.id === data.id)[0]
        registerToUpdate.status = data.status
        const response = await api.put(`registrations/${data.id}`, registerToUpdate)
        if (response.status === 200){
          showAlert(`Sucesso ao alerar o status`, 'success')
          fetchData()
        }
      },
    });
  }

  const handleDelete = async(id: string) => {
    openModal({
      title: 'Confirmação de Exclusão',
      message: 'Você tem certeza que deseja excluir este item?',
      onConfirm: async() => {
        const response = await api.delete(`registrations/${id}`)
        if (response.status === 200){
          showAlert(`Registro deletado com sucesso`, 'success')
          fetchData()
        }
      },
    });
  }

  return (
    <S.Container>
      {alert.isVisible && <Alert message={alert.message} variant={alert.variant} onClose={() => handleClose()} />}
      <SearchBar onRefreshing={handleRefresh} onSearchingRegister={handleSearch}/>
      <Columns onDeleteRegister={handleDelete} onChangeStatus={handleUpdateStatus} registrations={registrations} />
    </S.Container>
  );
};
export default DashboardPage;
