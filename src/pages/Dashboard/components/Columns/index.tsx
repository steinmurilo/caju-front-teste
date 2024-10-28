import * as S from "./styles";
import RegistrationCard from "../RegistrationCard";
import { ChangeStatus, Register } from "../../../../models/register";
import { APPROVED, REPROVED, REVIEW } from "../../../../constants";

const allColumns = [
  { status: REVIEW, title: "Pronto para revisar" },
  { status: APPROVED, title: "Aprovado" },
  { status: REPROVED, title: "Reprovado" },
];

type Props = {
  registrations?: Register[];
  onChangeStatus: (data: ChangeStatus) => void;
  onDeleteRegister: (id: string) => void;
};
const Columns = (props: Props) => {
  const { registrations, onChangeStatus, onDeleteRegister } = props

  const handleChangeStatus = (data: ChangeStatus) => {
    onChangeStatus(data)
  }

  const handleDelete = (id: string) => {
    onDeleteRegister(id)
  }

  return (
    <S.Container>
      {allColumns.map((column) => {
        return (
          <S.Column status={column.status} key={column.title}>
            <>
              <S.TitleColumn status={column.status}>
                {column.title}
              </S.TitleColumn>
              <S.ColumnContent>
                {registrations?.map((registration) => {
                  const inRightColumn = registration.status === column.status
                  return (
                    <div key={registration.id}>
                      {inRightColumn && 
                        <RegistrationCard
                          onDeleteCard={handleDelete}
                          onChangeStatus={handleChangeStatus}
                          data={registration}
                          key={registration.id}
                        />
                      }
                    </div>
                  );
                })}
              </S.ColumnContent>
            </>
          </S.Column>
        );
      })}
    </S.Container>
  );
};
export default Columns;
