export interface Register {
  admissionDate: string,
	email: string,
	employeeName: string,
	status: string,
	cpf: string,
	id: string
}

export interface ChangeStatus {
  id: string;
  status: 'REVIEW' | 'APPROVED' | 'REPROVED';
}