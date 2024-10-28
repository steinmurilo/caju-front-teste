import { ChangeStatus, Register } from "../../../../models/register";
import { ButtonSmall } from "../../../../components/Buttons";
import * as S from "./styles";
import {
  HiOutlineMail,
  HiOutlineUser,
  HiOutlineCalendar,
  HiOutlineTrash,
} from "react-icons/hi";
import { APPROVED, REPROVED, REVIEW } from "../../../../constants";

type Props = {
  data: Register;
  onChangeStatus: (data: ChangeStatus) => void
  onDeleteCard: (id: string) => void
};

const RegistrationCard = (props: Props) => {
  const { data, onChangeStatus, onDeleteCard } = props
  const inStatusReview = data.status === REVIEW

  const handleChangeStatus = (status: 'REVIEW' | 'APPROVED' | 'REPROVED') => {
    const event = { id: data.id, status }
    onChangeStatus(event)
  }

  return (
    <S.Card>
      <S.IconAndText>
        <HiOutlineUser />
        <h3>{data.employeeName}</h3>
      </S.IconAndText>
      <S.IconAndText>
        <HiOutlineMail />
        <p>{data.email}</p>
      </S.IconAndText>
      <S.IconAndText>
        <HiOutlineCalendar />
        <span>{data.admissionDate}</span>
      </S.IconAndText>
      <S.Actions>
        <ButtonSmall display={inStatusReview? 'block' : 'none'} bgcolor="rgb(255, 145, 154)" onClick={() => handleChangeStatus(REPROVED)} >Reprovar</ButtonSmall>
        <ButtonSmall display={inStatusReview? 'block' : 'none'} bgcolor="rgb(155, 229, 155)" onClick={() => handleChangeStatus(APPROVED)}>Aprovar</ButtonSmall>
        <ButtonSmall display={inStatusReview? 'none' : 'block'} bgcolor="#ff8858" onClick={() => handleChangeStatus(REVIEW)}>Revisar novamente</ButtonSmall>
        <HiOutlineTrash data-testid="delete-icon" onClick={() => onDeleteCard(data.id)}/>
      </S.Actions>
    </S.Card>
  );
};

export default RegistrationCard;
