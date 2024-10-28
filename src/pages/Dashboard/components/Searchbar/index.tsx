import { HiRefresh } from "react-icons/hi";
import { useHistory } from "react-router-dom";
import Button from "../../../../components/Buttons";
import { IconButton } from "../../../../components/Buttons/IconButton";
import TextField from "../../../../components/TextField";
import routes from "../../../../router/routes";
import * as S from "./styles";
import { applyCpfMask, validateCPF } from "../../../../services/utils";
import { useState } from "react";

type SearchBarProps = {
  onSearchingRegister: (search: string) => void
  onRefreshing: () => void
}

export const SearchBar = (props: SearchBarProps) => {
  const [cpf, setCpf] = useState('');
  const { onSearchingRegister, onRefreshing } = props;
  const history = useHistory();

  const goToNewAdmissionPage = () => {
    history.push(routes.newUser);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = applyCpfMask(e.target.value);
    const cpfInvalid = validateCPF(value);
    setCpf(value)
    if(!cpfInvalid) {
      onSearchingRegister(value)
    }
  }

  const handleRefresh = () => {
    setCpf('')
    onRefreshing()
  }
  
  return (
    <S.Container>
      <TextField onChange={handleChange} value={cpf} maxLength={14}  placeholder="Digite um CPF válido" />
      <S.Actions>
        <IconButton data-testid="refresh-icon" onClick={handleRefresh} aria-label="refetch">
          <HiRefresh />
        </IconButton>
        <Button onClick={() => goToNewAdmissionPage()}>Nova Admissão</Button>
      </S.Actions>
    </S.Container>
  );
};
